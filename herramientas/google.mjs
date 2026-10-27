// Autenticación contra las APIs de Google del proyecto scalerics-videos.
// En la nube: variable de entorno GOOGLE_API_KEY (clave restringida a Text-to-Speech y Speech-to-Text).
// En la compu de Juan: el login de gcloud (gcloud auth print-access-token).
import { execSync } from "node:child_process";

const PROYECTO = "scalerics-videos";

export async function llamar(url, cuerpo) {
  const headers = { "Content-Type": "application/json" };
  let destino = url;
  if (process.env.GOOGLE_API_KEY) {
    destino += (url.includes("?") ? "&" : "?") + "key=" + process.env.GOOGLE_API_KEY;
  } else {
    const token = execSync("gcloud auth print-access-token", { encoding: "utf8", shell: true }).trim();
    headers.Authorization = "Bearer " + token;
    headers["x-goog-user-project"] = PROYECTO;
  }
  const r = await fetch(destino, { method: "POST", headers, body: JSON.stringify(cuerpo) });
  const j = await r.json();
  if (!r.ok) throw new Error(`${url} → ${r.status}: ${JSON.stringify(j).slice(0, 400)}`);
  return j;
}
