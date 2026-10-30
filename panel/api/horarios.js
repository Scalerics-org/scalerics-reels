// A qué horas (de Uruguay) sale un reel de la cola, por red. Lo edita el CRM (panel Reels).
// El workflow corre cada hora y pregunta GET ?turno=1: qué redes tienen un horario que ya pasó y
// todavía no se atendió (turnos.json lo anota el publicador). Así, si GitHub arranca tarde, sale
// tarde en vez de saltearse, y nunca dos veces por el mismo horario. El GET es público: son horas.
import { esCrm, conSesion, guardarEstado, leerEstado } from "./_lib.js";

export const POR_DEFECTO = { instagram: [12, 18, 21], tiktok: [12, 18, 21] };
const REDES = ["instagram", "tiktok"];

function limpiar(lista) {
  if (!Array.isArray(lista)) return null;
  const horas = [...new Set(lista.map(Number))].filter((h) => Number.isInteger(h) && h >= 0 && h <= 23).sort((a, b) => a - b);
  return horas.length === lista.length && horas.length <= 12 ? horas : null;
}

// El último horario de la red que ya pasó (en las últimas 24 h), como "AAAA-MM-DDTHH" de Montevideo (UTC-3)
export function ultimoTurno(horas, ahora = Date.now()) {
  let mejor = null;
  for (const dia of [0, -1]) {
    const mvd = new Date(ahora - 3 * 3600e3);
    for (const h of horas) {
      const t = Date.UTC(mvd.getUTCFullYear(), mvd.getUTCMonth(), mvd.getUTCDate() + dia, h + 3);
      if (t <= ahora && (!mejor || t > mejor)) mejor = t;
    }
  }
  return mejor ? new Date(mejor - 3 * 3600e3).toISOString().slice(0, 13) : null;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "no-store");
      const horarios = { ...POR_DEFECTO, ...((await leerEstado("horarios.json")) || {}) };
      if (req.query.turno !== "1") return res.json(horarios);
      const hechos = (await leerEstado("turnos.json")) || {};
      const turnos = {};
      for (const red of REDES) {
        const t = ultimoTurno(horarios[red] || []);
        if (t && (!hechos[red] || t > hechos[red])) turnos[red] = t;
      }
      return res.json({ redes: Object.keys(turnos), turnos });
    }
    if (req.method !== "POST") return res.status(405).end();
    if (!conSesion(req) && !esCrm(req)) return res.status(401).json({ error: "sin sesión" });
    const instagram = limpiar(req.body?.instagram), tiktok = limpiar(req.body?.tiktok);
    if (!instagram || !tiktok) return res.status(400).json({ error: "Las horas van de 0 a 23, sin repetir, hasta 12 por red." });
    const antes = { ...POR_DEFECTO, ...((await leerEstado("horarios.json")) || {}) };
    const horarios = { instagram, tiktok, cambiado: new Date().toISOString(), quien: String(req.body?.quien || "").slice(0, 80) };
    await guardarEstado("horarios.json", horarios);
    // Un horario RECIÉN AGREGADO que ya pasó hoy no tiene que disparar una publicación ya mismo
    const hechos = (await leerEstado("turnos.json")) || {};
    for (const red of REDES) {
      const t = ultimoTurno(horarios[red]);
      const nuevo = t && !(antes[red] || []).includes(Number(t.slice(11, 13)));
      if (nuevo && (!hechos[red] || t > hechos[red])) hechos[red] = t;
    }
    await guardarEstado("turnos.json", hechos);
    res.json({ ok: true, ...horarios });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
