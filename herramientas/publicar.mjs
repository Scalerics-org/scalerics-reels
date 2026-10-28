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
import { execFileSync } from "node:child_process";
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
async function estadoJson(nombre, valor) {
  const base = `https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO_TT}/o`;
  if (valor === undefined) {
    try { return await pedir(`${base}/${nombre}?alt=media`, { headers: conG }); } catch { return null; }
  }
  await pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ESTADO_TT}/o?uploadType=media&name=${nombre}`, { method: "POST", headers: { ...conG, "Content-Type": "application/json" }, body: JSON.stringify(valor) });
}
const estadoTikTok = {
  leer: async () => { try { return await pedir(`https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO_TT}/o/tiktok.json?alt=media`, { headers: conG }); } catch { return null; } },
  guardar: (o) => pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ESTADO_TT}/o?uploadType=media&name=tiktok.json`, { method: "POST", headers: { ...conG, "Content-Type": "application/json" }, body: JSON.stringify(o) }),
};
const accesoTT = process.env.TIKTOK_CLIENT_SECRET ? await accesoTikTok(estadoTikTok, TIKTOK_CODE) : null;
console.log(accesoTT ? "tiktok: autorizado" : "tiktok: sin autorizar todavía");


// Lo publicado, por red: { tiktok: [slugs], instagram: [slugs] }
let pub = (await estadoJson("publicados.json")) || {};
if (Array.isArray(pub)) pub = { tiktok: pub, instagram: pub };
const igOn = !!process.env.IG_TOKEN || !!(await estadoJson("ig.json"));
const redes = [...(accesoTT ? ["tiktok"] : []), ...(igOn ? ["instagram"] : [])];
const falta = (sl) => redes.filter((r) => !(pub[r] || []).includes(sl));

// 1. El aprobado más viejo
const q = encodeURIComponent(`'${APROBADOS}' in parents and trashed = false`);
const { files } = await pedir(
  `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=createdTime&pageSize=100&fields=files(id,name,mimeType,description,createdTime)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
  { headers: conG },
);
const videos = files.filter((f) => f.mimeType.startsWith("video/"));
// Si la carpeta de Drive está vacía, sale el reel MÁS NUEVO del repo que todavía no se publicó
// (orden de "Hechos" en ideas.md), salvo los que estén en no-publicar.txt.
const video = videos[0] || null;
let base, slug, bytesRepo;
if (video) {
  base = video.name.replace(/\.[^.]+$/, "");
  slug = base.replace(/-(final|halloween)$/, "");
  console.log(`toca (Drive): ${video.name} (quedan ${videos.length - 1} más en la carpeta)`);
} else {
  const veto = fs.existsSync("no-publicar.txt") ? fs.readFileSync("no-publicar.txt", "utf8").split(/\s+/).filter(Boolean) : [];
  const hechos = [...fs.readFileSync("ideas.md", "utf8").matchAll(/^- \d\d-\d\d · `([a-z0-9-]+)`/gm)].map((m) => m[1]);
  const pendientes = hechos.filter((h) => falta(h).length && !veto.includes(h)).reverse();
  for (const s2 of pendientes) {
    try {
      bytesRepo = execFileSync("git", ["show", `origin/reel/${s2}:reels/${s2}/renders/${s2}-final.mp4`], { maxBuffer: 200e6 });
    } catch {
      continue; // sin render en su rama
    }
    slug = base = s2;
    break;
  }
  if (!slug) {
    console.log("nada para publicar: ni la carpeta de Drive ni el repo tienen reels pendientes");
    process.exit(0);
  }
  console.log(`toca (repo): ${slug} (quedan ${pendientes.length - 1} pendientes)`);
}

// 2. La descripción
let caption = ((video && video.description) || "").trim();
const txt = video ? files.find((f) => f.name === base + ".txt") : null;
if (!caption && txt) caption = (await pedir(`https://www.googleapis.com/drive/v3/files/${txt.id}?alt=media`, { headers: conG }, "texto")).trim();
for (const p of [`reels/${base}/descripcion.txt`, `reels/${slug}/descripcion.txt`]) {
  if (!caption && fs.existsSync(p)) caption = fs.readFileSync(p, "utf8").trim();
}
if (!caption) throw new Error(`no encontré la descripción de ${base}: ponela en Drive, en ${base}.txt o en reels/${slug}/descripcion.txt`);
console.log("descripción:\n" + caption.split("\n").map((l) => "  " + l).join("\n"));

// 3. Al bucket público
const bytes = video ? await pedir(`https://www.googleapis.com/drive/v3/files/${video.id}?alt=media&supportsAllDrives=true`, { headers: conG }, "bytes") : bytesRepo;
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
const hayIG = !!estado?.token && falta(slug).includes("instagram");
const hacerTT = !!accesoTT && falta(slug).includes("tiktok");
const hechoEn = [];
if (!hayIG) console.log("instagram: sin IG_TOKEN todavía, se saltea");
if (!hayIG && !hacerTT) throw new Error(`no hay a dónde publicar ${slug}`);
let tk, base, uid;
if (hayIG) {
  tk = estado.token;
  if (tk.startsWith("IG")) {
    // token de "inicio de sesión con Instagram": graph.instagram.com, vence a los 60 días y se renueva
    base = IG;
    if (Date.now() - (estado.renovado || 0) > 7 * 864e5) {
      const r = await pedir(`${IG}/refresh_access_token?grant_type=ig_refresh_token&access_token=${tk}`);
      estado = { token: r.access_token, renovado: Date.now() };
      await guardarEstado(estado);
      tk = estado.token;
      console.log(`token de Instagram renovado (vence en ${Math.round(r.expires_in / 86400)} días)`);
    }
    uid = (await pedir(`${IG}/me?fields=user_id&access_token=${tk}`)).user_id;
  } else {
    // token de usuario del sistema del porfolio (no vence): graph.facebook.com + el id de la cuenta de Instagram
    base = "https://graph.facebook.com/v21.0";
    uid = process.env.IG_USER_ID;
    if (!uid) {
      const pags = await pedir(`${base}/me/accounts?fields=instagram_business_account&access_token=${tk}`);
      uid = pags.data?.map((p) => p.instagram_business_account?.id).find(Boolean);
    }
    if (!uid) throw new Error("no encontré el id de la cuenta de Instagram: cargalo como IG_USER_ID en el workflow");
  }
  const cuenta = await pedir(`${base}/${uid}?fields=username&access_token=${tk}`);
  console.log(`instagram: @${cuenta.username}`);
}
if (hacerTT && PRUEBA) await publicarTikTok(accesoTT, bytes, caption, true);
console.log(`redes para ${slug}: ${[hayIG && "instagram", hacerTT && "tiktok"].filter(Boolean).join(", ")}`);
if (PRUEBA) {
  console.log("PRUEBA: no publico ni muevo nada.");
  process.exit(0);
}

if (hayIG) {
// 5. Publicar: crear el contenedor, esperar a que Instagram procese el video, publicar
const form = (o) => new URLSearchParams({ ...o, access_token: tk });
const cont = await pedir(`${base}/${uid}/media`, {
  method: "POST",
  body: form({ media_type: "REELS", video_url: videoUrl, caption, share_to_feed: "true" }),
});
let st;
for (let i = 0; i < 60; i++) {
  await espera(10000);
  st = await pedir(`${base}/${cont.id}?fields=status_code,status&access_token=${tk}`);
  if (st.status_code === "FINISHED") break;
  if (st.status_code === "ERROR" || st.status_code === "EXPIRED") throw new Error("Instagram no pudo procesar el video: " + JSON.stringify(st));
}
if (st.status_code !== "FINISHED") throw new Error("Instagram tardó más de 10 minutos en procesar el video");
const pub = await pedir(`${base}/${uid}/media_publish`, { method: "POST", body: form({ creation_id: cont.id }) });
const info = await pedir(`${base}/${pub.id}?fields=permalink&access_token=${tk}`);
console.log("PUBLICADO: " + info.permalink);
hechoEn.push("instagram");
}
if (hacerTT) {
  try {
    console.log("TIKTOK: " + (await publicarTikTok(accesoTT, bytes, caption, false)));
    hechoEn.push("tiktok");
  } catch (e) {
    console.log("TIKTOK FALLÓ: " + e.message);
    if (!hayIG) throw e;
  }
}

// 6. Registrar y, si vino de Drive, pasarlo a "publicados"
for (const r of hechoEn) pub[r] = [...(pub[r] || []), slug];
await estadoJson("publicados.json", pub);
if (video) await pedir(`https://www.googleapis.com/drive/v3/files/${video.id}?addParents=${PUBLICADOS}&removeParents=${APROBADOS}&supportsAllDrives=true`, {
  method: "PATCH",
  headers: conG,
});
if (txt) {
  await pedir(`https://www.googleapis.com/drive/v3/files/${txt.id}?addParents=${PUBLICADOS}&removeParents=${APROBADOS}&supportsAllDrives=true`, {
    method: "PATCH",
    headers: conG,
  });
}
console.log(video ? `movido a "Reels: publicados"` : `anotado como publicado: ${slug}`);
