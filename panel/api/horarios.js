// A qué horas (de Uruguay) sale un reel de la cola, por red. El workflow corre cada hora y le pregunta
// a esta ruta si le toca: por eso el GET es público (son solo horas). Cambiarlas pide sesión o el CRM.
import { esCrm, conSesion, guardarEstado, leerEstado } from "./_lib.js";

export const POR_DEFECTO = { instagram: [12, 18, 21], tiktok: [12, 18, 21] };

function limpiar(lista) {
  if (!Array.isArray(lista)) return null;
  const horas = [...new Set(lista.map(Number))].filter((h) => Number.isInteger(h) && h >= 0 && h <= 23).sort((a, b) => a - b);
  return horas.length === lista.length && horas.length <= 12 ? horas : null;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "no-store");
      return res.json({ ...POR_DEFECTO, ...((await leerEstado("horarios.json")) || {}) });
    }
    if (req.method !== "POST") return res.status(405).end();
    if (!conSesion(req) && !esCrm(req)) return res.status(401).json({ error: "sin sesión" });
    const instagram = limpiar(req.body?.instagram), tiktok = limpiar(req.body?.tiktok);
    if (!instagram || !tiktok) return res.status(400).json({ error: "Las horas van de 0 a 23, sin repetir, hasta 12 por red." });
    const horarios = { instagram, tiktok, cambiado: new Date().toISOString(), quien: String(req.body?.quien || "").slice(0, 80) };
    await guardarEstado("horarios.json", horarios);
    res.json({ ok: true, ...horarios });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
