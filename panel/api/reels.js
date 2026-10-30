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
    const [pub, rev, veto] = await Promise.all([
      leerEstado("publicados.json").then((x) => x || {}),
      leerEstado("revision.json").then((x) => x || {}),
      ghTexto("no-publicar.txt").then((t) => t.split(/\s+/).filter(Boolean)).catch(() => []),
    ]);
    const todos = req.query.todos === "1";
    const lista = hechos.filter((h) => conVideo.has(h.slug)).reverse().slice(0, todos ? 300 : 30);
    await Promise.all(lista.map(async (h) => {
      try { h.descripcion = (await ghTexto(`reels/${h.slug}/descripcion.txt`)).trim(); } catch { h.descripcion = ""; }
      // Mientras TikTok no está auditada, lo que va a la bandeja de la app cuenta como TikTok
      h.enTikTokBandeja = (pub.tiktok_inbox || []).includes(h.slug);
      h.enTikTok = (pub.tiktok || []).includes(h.slug) || h.enTikTokBandeja;
      h.enInstagram = (pub.instagram || []).includes(h.slug);
      // Estado de revisión: publicado (en las dos), en_cola, descartado o por_revisar
      const r = rev[h.slug];
      h.revisado = r ? { fecha: r.fecha, quien: r.quien || "", orden: Number.isFinite(r.orden) ? r.orden : null } : null;
      // Lo que ya salió figura como publicado aunque después lo hayan descartado
      if (h.enInstagram && h.enTikTok) h.estado = "publicado";
      // Ya salió en alguna red: sale de la cola aunque falte la otra
      else if (h.enInstagram || h.enTikTok) h.estado = "publicado_parcial";
      else if (veto.includes(h.slug) || r?.estado === "descartado") h.estado = "descartado";
      else if (r?.estado === "en_cola") h.estado = "en_cola";
      else h.estado = "por_revisar";
    }));
    res.json({ reels: lista });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
