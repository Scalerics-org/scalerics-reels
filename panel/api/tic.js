// El reloj: un Worker de Cloudflare (reloj/ en este repo) llama acá cada hora, porque GitHub se saltea
// las corridas programadas. Si alguna red tiene un horario que ya pasó y no se atendió, dispara el
// workflow como la corrida de la hora (turno=true), que lo marca y publica. Si no, no hace nada.
import crypto from "node:crypto";
import { REPO, gh, leerEstado } from "./_lib.js";
import { POR_DEFECTO, ultimoTurno } from "./horarios.js";

function relojValido(req) {
  const a = Buffer.from(String(req.headers["x-reloj"] || "")), b = Buffer.from(process.env.RELOJ_TOKEN || "");
  return b.length >= 32 && a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!relojValido(req)) return res.status(401).json({ error: "sin permiso" });
  try {
    const horarios = { ...POR_DEFECTO, ...((await leerEstado("horarios.json")) || {}) };
    const hechos = (await leerEstado("turnos.json")) || {};
    const pendientes = ["instagram", "tiktok"].filter((red) => {
      const t = ultimoTurno(horarios[red] || []);
      return t && (!hechos[red] || t > hechos[red]);
    });
    if (!pendientes.length) return res.json({ ok: true, disparado: false });
    await gh(`/repos/${REPO}/actions/workflows/publicar.yml/dispatches`, {
      method: "POST",
      body: JSON.stringify({ ref: "main", inputs: { prueba: false, turno: true } }),
    });
    res.json({ ok: true, disparado: true, pendientes });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
