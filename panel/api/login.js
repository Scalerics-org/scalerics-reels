import { abrirSesion, claveCorrecta, conSesion } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const sesion = conSesion(req);
    if (sesion) abrirSesion(res); // renueva la cookie (y su SameSite)
    return res.json({ sesion });
  }
  if (req.method !== "POST") return res.status(405).end();
  await new Promise((r) => setTimeout(r, 400)); // frena a quien pruebe claves en serie
  if (!claveCorrecta(req.body?.clave)) return res.status(401).json({ error: "Clave incorrecta" });
  abrirSesion(res);
  res.json({ ok: true });
}
