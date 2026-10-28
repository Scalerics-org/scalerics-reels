// Publica en el Instagram de Scalerics (@scalerics_) el reel aprobado más viejo.
// Uso: node herramientas/publicar.mjs [--prueba]
//
// Aprobar = arrastrar el mp4 a la carpeta de Drive "Reels: para publicar". Este script (lo corre el
// GitHub Action .github/workflows/publicar.yml dos veces por día) toma el más viejo, lo sube a un
// bucket público (Instagram pide una URL), lo publica como reel con su descripción y lo mueve a
// "Reels: publicados". Con --prueba hace todo menos publicar y mover.
//
// La descripción sale, en este orden, de: la descripción del archivo en Drive, un .txt con el mismo
// nombre en la carpeta, o reels/<nombre>/descripcion.txt del repo.
//
// Variables: GOOGLE_SA_JSON (cuenta de servicio rutina-reels), IG_TOKEN (token de Instagram, solo
// para arrancar: después se renueva solo y vive en gs://scalerics-reels-estado/ig.json),
// DRIVE_APROBADOS y DRIVE_PUBLICADOS (ids de las carpetas).
import fs from "node:fs";
import { tokenGoogle } from "./google.mjs";
import { accesoTikTok, publicarTikTok } from "./tiktok.mjs";

const PRUEBA = process.argv.includes("--prueba");
const TIKTOK_CODE = (process.argv.find((a) => a.startsWith("--tiktok-code=")) || "").split("=")[1] || "";
const APROBADOS = process.env.DRIVE_APROBADOS;
const PUBLICADOS = process.env.DRIVE_PUBLICADOS;
const BUCKET_VIDEOS = "scalerics-reels-publicar";
const BUCKET_ESTADO = "scalerics-reels-estado";
const IG = "https://graph.instagram.com";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const g = await tokenGoogle([
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/devstorage.read_write",
]);
const conG = { Authorization: "Bearer " + g };

async function pedir(url, opciones = {}, como = "json") {
  const r = await fetch(url, opciones);
  if (!r.ok) {
    // nunca imprimir la URL entera: puede llevar el token de Instagram
    const texto = (await r.text()).slice(0, 400);
    throw new Error(`${url.split("?")[0]} → ${r.status}: ${texto}`);
  }
  return como === "json" ? r.json() : como === "texto" ? r.text() : Buffer.from(await r.arrayBuffer());
}

const BUCKET_ESTADO_TT = "scalerics-reels-estado";
const estadoTikTok = {
  leer: async () => { try { return await pedir(`https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO_TT}/o/tiktok.json?alt=media`, { headers: conG }); } catch { return null; } },
  guardar: (o) => pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ESTADO_TT}/o?uploadType=media&name=tiktok.json`, { method: "POST", headers: { ...conG, "Content-Type": "application/json" }, body: JSON.stringify(o) }),
};
const accesoTT = process.env.TIKTOK_CLIENT_SECRET ? await accesoTikTok(estadoTikTok, TIKTOK_CODE) : null;
console.log(accesoTT ? "tiktok: autorizado" : "tiktok: sin autorizar todavía");


// 1. El aprobado más viejo
const q = encodeURIComponent(`'${APROBADOS}' in parents and trashed = false`);
const { files } = await pedir(
  `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=createdTime&pageSize=100&fields=files(id,name,mimeType,description,createdTime)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
  { headers: conG },
);
const videos = files.filter((f) => f.mimeType.startsWith("video/"));
if (!videos.length) {
  console.log("nada para publicar: la carpeta de aprobados no tiene videos");
  process.exit(0);
}
const video = videos[0];
const base = video.name.replace(/\.[^.]+$/, "");
const slug = base.replace(/-(final|halloween)$/, "");
console.log(`toca: ${video.name} (quedan ${videos.length - 1} más en la cola)`);

// 2. La descripción
let caption = (video.description || "").trim();
const txt = files.find((f) => f.name === base + ".txt");
if (!caption && txt) caption = (await pedir(`https://www.googleapis.com/drive/v3/files/${txt.id}?alt=media`, { headers: conG }, "texto")).trim();
for (const p of [`reels/${base}/descripcion.txt`, `reels/${slug}/descripcion.txt`]) {
  if (!caption && fs.existsSync(p)) caption = fs.readFileSync(p, "utf8").trim();
}
if (!caption) throw new Error(`no encontré la descripción de ${video.name}: ponela en Drive, en ${base}.txt o en reels/${slug}/descripcion.txt`);
console.log("descripción:\n" + caption.split("\n").map((l) => "  " + l).join("\n"));

// 3. Al bucket público
const bytes = await pedir(`https://www.googleapis.com/drive/v3/files/${video.id}?alt=media&supportsAllDrives=true`, { headers: conG }, "bytes");
const objeto = `${base}-${Date.now()}.mp4`;
await pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_VIDEOS}/o?uploadType=media&name=${encodeURIComponent(objeto)}`, {
  method: "POST",
  headers: { ...conG, "Content-Type": "video/mp4" },
  body: bytes,
});
const videoUrl = `https://storage.googleapis.com/${BUCKET_VIDEOS}/${encodeURIComponent(objeto)}`;
console.log(`subido (${(bytes.length / 1e6).toFixed(1)} MB): ${videoUrl}`);

// 4. El token de Instagram: el guardado si hay, si no el de la variable; se renueva cada 7 días
async function leerEstado() {
  try {
    return await pedir(`https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO}/o/ig.json?alt=media`, { headers: conG });
  } catch {
    return null;
  }
}
async function guardarEstado(estado) {
  await pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ESTADO}/o?uploadType=media&name=ig.json`, {
    method: "POST",
    headers: { ...conG, "Content-Type": "application/json" },
    body: JSON.stringify(estado),
  });
}
let estado = await leerEstado();
if (!estado?.token && process.env.IG_TOKEN) estado = { token: process.env.IG_TOKEN, renovado: 0 };
const hayIG = !!estado?.token;
if (!hayIG) console.log("instagram: sin IG_TOKEN todavía, se saltea");
if (!hayIG && !accesoTT) throw new Error("no hay ni Instagram ni TikTok configurados");
let tk, yo;
if (hayIG) {
if (Date.now() - (estado.renovado || 0) > 7 * 864e5) {
  const r = await pedir(`${IG}/refresh_access_token?grant_type=ig_refresh_token&access_token=${estado.token}`);
  estado = { token: r.access_token, renovado: Date.now() };
  await guardarEstado(estado);
  console.log(`token de Instagram renovado (vence en ${Math.round(r.expires_in / 86400)} días)`);
}
tk = estado.token;
yo = await pedir(`${IG}/me?fields=user_id,username&access_token=${tk}`);
console.log(`cuenta: @${yo.username}`);
}

if (accesoTT && PRUEBA) await publicarTikTok(accesoTT, bytes, caption, true);
if (PRUEBA) {
  console.log("PRUEBA: no publico ni muevo nada.");
  process.exit(0);
}

if (hayIG) {
// 5. Publicar: crear el contenedor, esperar a que Instagram procese el video, publicar
const form = (o) => new URLSearchParams({ ...o, access_token: tk });
const cont = await pedir(`${IG}/${yo.user_id}/media`, {
  method: "POST",
  body: form({ media_type: "REELS", video_url: videoUrl, caption, share_to_feed: "true" }),
});
let st;
for (let i = 0; i < 60; i++) {
  await espera(10000);
  st = await pedir(`${IG}/${cont.id}?fields=status_code,status&access_token=${tk}`);
  if (st.status_code === "FINISHED") break;
  if (st.status_code === "ERROR" || st.status_code === "EXPIRED") throw new Error("Instagram no pudo procesar el video: " + JSON.stringify(st));
}
if (st.status_code !== "FINISHED") throw new Error("Instagram tardó más de 10 minutos en procesar el video");
const pub = await pedir(`${IG}/${yo.user_id}/media_publish`, { method: "POST", body: form({ creation_id: cont.id }) });
const info = await pedir(`${IG}/${pub.id}?fields=permalink&access_token=${tk}`);
console.log("PUBLICADO: " + info.permalink);
}
if (accesoTT) {
  try {
    console.log("TIKTOK: " + (await publicarTikTok(accesoTT, bytes, caption, false)));
  } catch (e) {
    console.log("TIKTOK FALLÓ: " + e.message);
    if (!hayIG) throw e;
  }
}

// 6. A "publicados"
await pedir(`https://www.googleapis.com/drive/v3/files/${video.id}?addParents=${PUBLICADOS}&removeParents=${APROBADOS}&supportsAllDrives=true`, {
  method: "PATCH",
  headers: conG,
});
if (txt) {
  await pedir(`https://www.googleapis.com/drive/v3/files/${txt.id}?addParents=${PUBLICADOS}&removeParents=${APROBADOS}&supportsAllDrives=true`, {
    method: "PATCH",
    headers: conG,
  });
}
console.log(`movido a "Reels: publicados"`);
