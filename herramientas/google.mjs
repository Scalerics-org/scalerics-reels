// Autenticación contra las APIs de Google del proyecto scalerics-videos.
// En la nube: variable de entorno GOOGLE_SA_JSON = la clave JSON de la cuenta de servicio
// rutina-reels@scalerics-videos (en base64). Gemini TTS no acepta claves de API: pide un token
// OAuth, que acá se saca firmando un JWT con la cuenta de servicio.
// En la compu de Juan: el login de gcloud (gcloud auth print-access-token).
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const PROYECTO = "scalerics-videos";
let token;

async function tokenDeCuentaDeServicio() {
  const sa = JSON.parse(Buffer.from(process.env.GOOGLE_SA_JSON, "base64").toString("utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const ahora = Math.floor(Date.now() / 1000);
  const sinFirma =
    b64({ alg: "RS256", typ: "JWT" }) + "." +
    b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/cloud-platform", aud: sa.token_uri, iat: ahora, exp: ahora + 3600 });
  const firma = crypto.createSign("RSA-SHA256").update(sinFirma).sign(sa.private_key, "base64url");
  const r = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: sinFirma + "." + firma }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("no se pudo sacar el token de la cuenta de servicio: " + JSON.stringify(j).slice(0, 300));
  return j.access_token;
}

export async function llamar(url, cuerpo) {
  token ??= process.env.GOOGLE_SA_JSON
    ? await tokenDeCuentaDeServicio()
    : execSync("gcloud auth print-access-token", { encoding: "utf8", shell: true }).trim();
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, "x-goog-user-project": PROYECTO },
    body: JSON.stringify(cuerpo),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`${url} → ${r.status}: ${JSON.stringify(j).slice(0, 400)}`);
  return j;
}
