// La revisión de cada reel: sin entrada está "por revisar"; "en_cola" lo toma el publicador
// (12, 18 y 21) en Instagram y TikTok; "descartado" no sale nunca. Lo usan este panel y el CRM.
import { exigirSesion, guardarEstado, leerEstado } from "./_lib.js";

const ESTADOS = ["por_revisar", "en_cola", "descartado"];

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();
  const { slug, estado, quien } = req.body || {};
  if (!/^[a-z0-9-]+$/.test(String(slug || "")) || !ESTADOS.includes(estado)) {
    return res.status(400).json({ error: "slug o estado inválido" });
  }
  try {
    const rev = (await leerEstado("revision.json")) || {};
    if (estado === "por_revisar") delete rev[slug];
    else rev[slug] = { estado, fecha: new Date().toISOString(), quien: String(quien || "").slice(0, 80) };
    await guardarEstado("revision.json", rev);
    res.json({ ok: true, slug, estado });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
