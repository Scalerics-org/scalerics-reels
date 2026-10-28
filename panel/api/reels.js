// Los reels terminados (los que tienen su mp4 en una rama reel/*), del más nuevo al más viejo,
// con su descripción y en qué redes ya salieron.
import { REPO, exigirSesion, gh, ghTexto, leerEstado } from "./_lib.js";

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  try {
    const ideas = await ghTexto("ideas.md");
    const hechos = [...ideas.matchAll(/^- (\d\d-\d\d) · `([a-z0-9-]+)` · ([^·]+)· (.+)$/gm)].map((m) => ({
      fecha: m[1], slug: m[2], producto: m[3].trim(), gancho: m[4].replace(/\s*\[[^\]]*\]\s*$/, "").trim(),
    }));
    const ramas = [];
    for (let pag = 1; pag <= 3; pag++) {
      const r = await (await gh(`/repos/${REPO}/branches?per_page=100&page=${pag}`)).json();
      ramas.push(...r.map((b) => b.name));
      if (r.length < 100) break;
    }
    const conVideo = new Set(ramas.filter((n) => n.startsWith("reel/")).map((n) => n.slice(5)));
    const pub = (await leerEstado("publicados.json")) || {};
    const lista = hechos.filter((h) => conVideo.has(h.slug)).reverse().slice(0, 30);
    await Promise.all(lista.map(async (h) => {
      try { h.descripcion = (await ghTexto(`reels/${h.slug}/descripcion.txt`)).trim(); } catch { h.descripcion = ""; }
      h.enTikTok = (pub.tiktok || []).includes(h.slug);
      h.enInstagram = (pub.instagram || []).includes(h.slug);
    }));
    res.json({ reels: lista });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
