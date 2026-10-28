// Lo común del panel: sesión por cookie firmada, GitHub (repo de reels) y Google Cloud Storage
// (donde la rutina guarda el token de TikTok y la lista de publicados).
// Variables en Vercel: PANEL_CLAVE, GH_TOKEN, GOOGLE_SA_JSON (base64) y TIKTOK_CLIENT_SECRET.
import crypto from "node:crypto";

export const REPO = "Scalerics-org/scalerics-reels";
export const BUCKET_ESTADO = "scalerics-reels-estado";
export const TIKTOK_CLIENT_KEY = "sbaw5hfo5gyagmulgu";
const COOKIE = "panel_sesion";

const firmar = (v) => crypto.createHmac("sha256", process.env.PANEL_CLAVE || "").update(v).digest("base64url");

export function abrirSesion(res) {
  const vence = Date.now() + 30 * 24 * 3600e3;
  const v = `${vence}.${firmar(String(vence))}`;
  res.setHeader("Set-Cookie", `${COOKIE}=${v}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 3600}`);
}

export function conSesion(req) {
  const c = (req.headers.cookie || "").split(/;\s*/).find((x) => x.startsWith(COOKIE + "="));
  if (!c || !process.env.PANEL_CLAVE) return false;
  const [vence, firma] = c.slice(COOKIE.length + 1).split(".");
  if (!vence || !firma || Number(vence) < Date.now()) return false;
  const a = Buffer.from(firma), b = Buffer.from(firmar(vence));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function claveCorrecta(clave) {
  const a = Buffer.from(String(clave || "")), b = Buffer.from(process.env.PANEL_CLAVE || "");
  return b.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function exigirSesion(req, res) {
  if (conSesion(req)) return true;
  res.status(401).json({ error: "sin sesión" });
  return false;
}

export async function gh(ruta, opciones = {}) {
  const r = await fetch("https://api.github.com" + ruta, {
    ...opciones,
    headers: { Authorization: "Bearer " + process.env.GH_TOKEN, Accept: "application/vnd.github+json", ...(opciones.headers || {}) },
  });
  if (!r.ok) throw new Error(`GitHub ${ruta}: ${r.status}`);
  return r;
}

export async function ghTexto(ruta, ref = "main") {
  const r = await gh(`/repos/${REPO}/contents/${ruta}?ref=${encodeURIComponent(ref)}`, { headers: { Accept: "application/vnd.github.raw" } });
  return r.text();
}

let tokenG = null;
async function tokenGoogle() {
  if (tokenG && tokenG.vence > Date.now()) return tokenG.valor;
  const sa = JSON.parse(Buffer.from(process.env.GOOGLE_SA_JSON || "", "base64").toString("utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const ahora = Math.floor(Date.now() / 1000);
  const sinFirma = b64({ alg: "RS256", typ: "JWT" }) + "." +
    b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/devstorage.read_write", aud: sa.token_uri, iat: ahora, exp: ahora + 3600 });
  const firma = crypto.createSign("RSA-SHA256").update(sinFirma).sign(sa.private_key, "base64url");
  const r = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: sinFirma + "." + firma }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("Google no dio token");
  tokenG = { valor: j.access_token, vence: Date.now() + 50 * 60e3 };
  return tokenG.valor;
}

export async function leerEstado(nombre) {
  const r = await fetch(`https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO}/o/${encodeURIComponent(nombre)}?alt=media`, {
    headers: { Authorization: "Bearer " + (await tokenGoogle()) },
  });
  return r.ok ? r.json() : null;
}

export async function guardarEstado(nombre, valor) {
  await fetch(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ESTADO}/o?uploadType=media&name=${encodeURIComponent(nombre)}`, {
    method: "POST",
    headers: { Authorization: "Bearer " + (await tokenGoogle()), "Content-Type": "application/json" },
    body: JSON.stringify(valor),
  });
}

// El acceso a TikTok que guarda la rutina; si venció, se renueva acá y se vuelve a guardar
export async function accesoTikTok() {
  let t = await leerEstado("tiktok.json");
  if (!t?.refresh) throw new Error("TikTok no está autorizado");
  if (Date.now() > t.vence) {
    const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_key: TIKTOK_CLIENT_KEY, client_secret: process.env.TIKTOK_CLIENT_SECRET || "", grant_type: "refresh_token", refresh_token: t.refresh }),
    });
    const j = await r.json();
    if (!j.access_token) throw new Error("no se pudo renovar el acceso a TikTok");
    t = { access: j.access_token, refresh: j.refresh_token, vence: Date.now() + (j.expires_in - 300) * 1000 };
    await guardarEstado("tiktok.json", t);
  }
  return t.access;
}
