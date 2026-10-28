// Los datos de la cuenta de TikTok a la que se va a publicar, en vivo (lo pide TikTok: el panel tiene
// que mostrar la cuenta, las privacidades que ofrece y qué interacciones tiene apagadas).
import { accesoTikTok, exigirSesion } from "./_lib.js";

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  try {
    const acceso = await accesoTikTok();
    const r = await fetch("https://open.tiktokapis.com/v2/post/publish/creator_info/query/", {
      method: "POST",
      headers: { Authorization: "Bearer " + acceso, "Content-Type": "application/json; charset=UTF-8" },
      body: "{}",
    });
    const j = await r.json();
    if (j.error?.code !== "ok") return res.status(502).json({ error: j.error?.message || "TikTok no respondió" });
    res.json(j.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
