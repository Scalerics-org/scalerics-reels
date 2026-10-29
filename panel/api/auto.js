// Aprobación permanente: con qué configuración salen solos en TikTok los reels nuevos que hace la
// rutina (la eligió y la aceptó una persona en el panel). Se guarda en el bucket de estado.
import { exigirSesion, guardarEstado, leerEstado } from "./_lib.js";

const PRIVACIDADES = ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "FOLLOWER_OF_CREATOR", "SELF_ONLY"];

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  try {
    if (req.method === "GET") return res.json((await leerEstado("tiktok-auto.json")) || { activo: false });
    if (req.method !== "POST") return res.status(405).end();
    const b = req.body || {};
    if (!b.activo) {
      await guardarEstado("tiktok-auto.json", { activo: false, apagado: new Date().toISOString() });
      return res.json({ ok: true, activo: false });
    }
    if (!PRIVACIDADES.includes(b.privacidad)) return res.status(400).json({ error: "Elegí quién puede ver los videos" });
    if (!b.acepto) return res.status(400).json({ error: "Falta aceptar las condiciones de TikTok" });
    const auto = {
      activo: true,
      privacidad: b.privacidad,
      comentarios: !!b.comentarios,
      duo: !!b.duo,
      stitch: !!b.stitch,
      marcaPropia: !!b.marcaPropia,
      marcaAjena: false,
      aceptado: new Date().toISOString(),
    };
    await guardarEstado("tiktok-auto.json", auto);
    res.json({ ok: true, ...auto });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
