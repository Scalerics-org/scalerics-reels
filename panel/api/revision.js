// La revisión de cada reel: sin entrada está "por revisar"; "en_cola" lo toma el publicador en los
// horarios de cada red (horarios.json), en el orden de `orden`; "descartado" no sale nunca.
// Lo usan este panel y el CRM. Con { orden: [slug, ...] } se reordena la cola entera.
import { exigirSesion, guardarEstado, leerEstado } from "./_lib.js";

const ESTADOS = ["por_revisar", "en_cola", "descartado"];
const SLUG = /^[a-z0-9-]+$/;

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();
  const { slug, estado, quien, orden } = req.body || {};
  try {
    const rev = (await leerEstado("revision.json")) || {};
    if (Array.isArray(orden)) {
      if (!orden.every((s) => SLUG.test(String(s)))) return res.status(400).json({ error: "orden inválido" });
      orden.forEach((s, i) => { if (rev[s]?.estado === "en_cola") rev[s].orden = i; });
      await guardarEstado("revision.json", rev);
      return res.json({ ok: true });
    }
    if (!SLUG.test(String(slug || "")) || !ESTADOS.includes(estado)) {
      return res.status(400).json({ error: "slug o estado inválido" });
    }
    if (estado === "por_revisar") delete rev[slug];
    else {
      const entrada = { estado, fecha: new Date().toISOString(), quien: String(quien || "").slice(0, 80) };
      // Lo que se aprueba va al final de la cola
      if (estado === "en_cola") {
        const ordenes = Object.values(rev).filter((r) => r.estado === "en_cola" && Number.isFinite(r.orden)).map((r) => r.orden);
        entrada.orden = rev[slug]?.estado === "en_cola" && Number.isFinite(rev[slug].orden) ? rev[slug].orden : (ordenes.length ? Math.max(...ordenes) + 1 : 0);
      }
      rev[slug] = entrada;
    }
    await guardarEstado("revision.json", rev);
    res.json({ ok: true, slug, estado });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
