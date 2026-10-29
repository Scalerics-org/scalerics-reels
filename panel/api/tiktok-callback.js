// Vuelta de la autorización de TikTok: cambia el code por el acceso y lo guarda donde lo lee la rutina.
import { TIKTOK_CLIENT_KEY, exigirSesion, guardarEstado } from "./_lib.js";
import { REDIRECT, firmarState } from "./tiktok-conectar.js";

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  const { code, state, error } = req.query;
  const t = String(state || "").split(".")[0];
  if (error || !code) return res.redirect(302, "/?tiktok=cancelado");
  if (!state || firmarState(t) !== state || Date.now() - Number(t) > 15 * 60e3) return res.redirect(302, "/?tiktok=invalido");
  const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: TIKTOK_CLIENT_KEY, client_secret: process.env.TIKTOK_CLIENT_SECRET || "", code: String(code), grant_type: "authorization_code", redirect_uri: REDIRECT }),
  });
  const j = await r.json();
  if (!j.access_token) return res.redirect(302, "/?tiktok=error");
  await guardarEstado("tiktok.json", { access: j.access_token, refresh: j.refresh_token, vence: Date.now() + (j.expires_in - 300) * 1000 });
  res.redirect(302, "/?tiktok=conectado");
}
