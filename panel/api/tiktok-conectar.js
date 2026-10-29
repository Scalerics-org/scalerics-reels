// "Conectar TikTok": manda a la pantalla de autorización de TikTok (Login Kit). El state va firmado
// para que la vuelta (tiktok-callback) solo acepte autorizaciones pedidas desde este panel.
import crypto from "node:crypto";
import { TIKTOK_CLIENT_KEY, exigirSesion } from "./_lib.js";

export const REDIRECT = "https://reels.scalerics.com/api/tiktok-callback";
export const firmarState = (t) => t + "." + crypto.createHmac("sha256", process.env.PANEL_CLAVE || "").update("tiktok" + t).digest("base64url");

export default function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  const state = firmarState(String(Date.now()));
  const url = "https://www.tiktok.com/v2/auth/authorize/?" + new URLSearchParams({
    client_key: TIKTOK_CLIENT_KEY,
    scope: "user.info.basic,video.publish",
    response_type: "code",
    redirect_uri: REDIRECT,
    state,
  });
  res.redirect(302, url);
}
