// El mp4 de un reel, de su rama reel/<slug> del repo (privado). Vercel no deja devolver más de
// 4.5 MB, así que se redirige al link de descarga temporal que da GitHub (vence en minutos).
import { REPO, exigirSesion, gh } from "./_lib.js";

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  const slug = String(req.query.slug || "");
  if (!/^[a-z0-9-]+$/.test(slug)) return res.status(400).end();
  try {
    const ruta = `reels/${slug}/renders/${slug}-final.mp4`;
    const j = await (await gh(`/repos/${REPO}/contents/${ruta}?ref=${encodeURIComponent("reel/" + slug)}`)).json();
    if (!j.download_url) return res.status(404).end();
    res.setHeader("Cache-Control", "no-store");
    res.redirect(302, j.download_url);
  } catch {
    res.status(404).end();
  }
}
