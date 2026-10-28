// Publica en TikTok lo que la persona eligió en el panel: dispara el workflow "Publicar reel" del
// repo con todo empaquetado (el workflow sube el video y espera a que TikTok lo procese).
import { REPO, exigirSesion, gh } from "./_lib.js";

const PRIVACIDADES = ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "FOLLOWER_OF_CREATOR", "SELF_ONLY"];

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();
  const b = req.body || {};
  if (!/^[a-z0-9-]+$/.test(b.slug || "")) return res.status(400).json({ error: "reel inválido" });
  if (!PRIVACIDADES.includes(b.privacidad)) return res.status(400).json({ error: "Elegí quién puede ver el video" });
  if (!b.acepto) return res.status(400).json({ error: "Falta aceptar las condiciones de TikTok" });
  if (b.marcaAjena && b.privacidad === "SELF_ONLY") return res.status(400).json({ error: "El contenido de marca no puede ser privado" });
  const datos = {
    slug: b.slug,
    titulo: String(b.titulo || "").slice(0, 2200),
    privacidad: b.privacidad,
    comentarios: !!b.comentarios,
    duo: !!b.duo,
    stitch: !!b.stitch,
    marcaPropia: !!b.marcaPropia,
    marcaAjena: !!b.marcaAjena,
  };
  try {
    await gh(`/repos/${REPO}/actions/workflows/publicar.yml/dispatches`, {
      method: "POST",
      body: JSON.stringify({ ref: "main", inputs: { prueba: false, panel: Buffer.from(JSON.stringify(datos)).toString("base64url") } }),
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
