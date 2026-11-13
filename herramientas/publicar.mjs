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
import { accesoTikTok, mandarAlInboxTikTok, publicarTikTok, publicarTikTokPanel } from "./tiktok.mjs";

const PRUEBA = process.argv.includes("--prueba");
// PANEL (variable de entorno) = base64url de un JSON: lo eligió una persona en el panel de aprobación
const PANEL_ARG = process.env.PANEL || "";
const PANEL = PANEL_ARG ? JSON.parse(Buffer.from(PANEL_ARG, "base64url").toString("utf8")) : null;
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

// --tiktok-estado=<publish_id>: solo consulta en qué quedó un envío a TikTok y termina
const ESTADO_TT = (process.argv.find((a) => a.startsWith("--tiktok-estado=")) || "").split("=")[1] || "";
if (ESTADO_TT && accesoTT) {
  const r = await fetch("https://open.tiktokapis.com/v2/post/publish/status/fetch/", {
    method: "POST",
    headers: { Authorization: "Bearer " + accesoTT, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ publish_id: ESTADO_TT }),
  });
  console.log("tiktok estado:", JSON.stringify(await r.json()));
  const u = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,username", { headers: { Authorization: "Bearer " + accesoTT } });
  console.log("tiktok cuenta:", JSON.stringify(await u.json()));
  process.exit(0);
}


// --tiktok-inbox=<slug>: prueba la bandeja de TikTok con ese reel (no anota nada) y termina
const INBOX_PRUEBA = (process.argv.find((a) => a.startsWith("--tiktok-inbox=")) || "").split("=")[1] || "";
if (INBOX_PRUEBA && accesoTT) {
  const b = execFileSync("git", ["show", `origin/reel/${INBOX_PRUEBA}:reels/${INBOX_PRUEBA}/renders/${INBOX_PRUEBA}-final.mp4`], { maxBuffer: 200e6 });
  console.log("TIKTOK (prueba de bandeja): " + (await mandarAlInboxTikTok(accesoTT, b)));
  process.exit(0);
}

// Lo publicado, por red: { tiktok: [slugs], instagram: [slugs] }
let pub = (await estadoJson("publicados.json")) || {};
if (Array.isArray(pub)) pub = { tiktok: pub, instagram: pub };
// Desde el panel: publica en TikTok exactamente lo que se eligió ahí, y nada más
if (PANEL) {
  if (!accesoTT) throw new Error("TikTok no está autorizado");
  if (!/^[a-z0-9-]+$/.test(PANEL.slug || "")) throw new Error("slug inválido");
  const bytesPanel = execFileSync("git", ["show", `origin/reel/${PANEL.slug}:reels/${PANEL.slug}/renders/${PANEL.slug}-final.mp4`], { maxBuffer: 200e6 });
  console.log(`panel: ${PANEL.slug} · ${PANEL.privacidad}`);
  if (PRUEBA) { console.log("PRUEBA: no publico"); process.exit(0); }
  console.log("TIKTOK: " + (await publicarTikTokPanel(accesoTT, bytesPanel, PANEL)));
  pub.tiktok = [...new Set([...(pub.tiktok || []), PANEL.slug])];
  await estadoJson("publicados.json", pub);
  process.exit(0);
}
const igOn = !!process.env.IG_TOKEN || !!(await estadoJson("ig.json"));
// TikTok en pausa (TIKTOK_PAUSADO=1) mientras la app no esté auditada: sin auditoría los envíos no le
// llegan a la cuenta. Al reactivar, sacar ojala-te-fundas de publicados.json (tiktok): no salió.
// Además, solo con la aprobación permanente encendida en el panel (tiktok-auto.json): la configuración
// (privacidad, interacciones) la eligió y la aceptó una persona ahí.
const autoTT = (await estadoJson("tiktok-auto.json")) || {};
const ttOn = !!accesoTT && process.env.TIKTOK_PAUSADO !== "1" && !!autoTT.activo;
// Con TikTok en pausa igual tiene sus horarios: en cada uno manda un reel a la bandeja de la app, para
// publicarlo a mano desde el celular (Juan, 03-11: 10 por día en TikTok, 3 en Instagram).
const ttInbox = !!accesoTT && !ttOn;
// En la corrida de cada hora, el workflow manda en REDES_HORA a qué redes les toca ahora (según
// horarios.json, que se edita en el CRM). A mano, sin REDES_HORA, van todas.
const deHora = (process.env.REDES_HORA || "").split(",").filter(Boolean);
const toca = (r) => !deHora.length || deHora.includes(r);
const redes = [...((ttOn || ttInbox) && toca("tiktok") ? ["tiktok"] : []), ...(igOn && toca("instagram") ? ["instagram"] : [])];
// El horario se anota como atendido ANTES de publicar: si algo falla se pierde ese turno, pero
// nunca sale dos veces el mismo (la próxima corrida de la hora vería el turno pendiente).
if (deHora.length && !PRUEBA) {
  const turnos = JSON.parse(process.env.TURNOS || "{}");
  const hechos = (await estadoJson("turnos.json")) || {};
  for (const r of deHora) if (turnos[r]) hechos[r] = turnos[r];
  await estadoJson("turnos.json", hechos);
}
if (!redes.length) {
  console.log(`a esta hora no le toca a ninguna red activa (${deHora.join(", ") || "ninguna"})`);
  process.exit(0);
}
// Lo que ya se mandó a la bandeja de TikTok cuenta como hecho en TikTok (lo publicó una persona desde ahí)
const falta = (sl) => redes.filter((r) => !(pub[r] || []).includes(sl) && !(r === "tiktok" && (pub.tiktok_inbox || []).includes(sl)));

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
  // Solo los que alguien aprobó en el panel de Reels del CRM (o en reels.scalerics.com):
  // revision.json = { slug: { estado: "en_cola" | "descartado", fecha } }. Sin entrada = por revisar.
  // Sale en el orden de la cola (`orden`, que se edita en el CRM); si falta, el que se aprobó antes.
  const revision = (await estadoJson("revision.json")) || {};
  const veto = fs.existsSync("no-publicar.txt") ? fs.readFileSync("no-publicar.txt", "utf8").split(/\s+/).filter(Boolean) : [];
  const filas = [...fs.readFileSync("ideas.md", "utf8").matchAll(/^- (\d\d)-(\d\d) · `([a-z0-9-]+)`/gm)];
  const hechos = filas.map((m) => m[3]);
  // Lo de antes del 03-11 es de la línea vieja (piratas, lucha libre, cómic...: "llega a un público muy
  // infantil", Juan 03-11). Eso sale solo si alguien lo aprueba a mano; sin revisar, no.
  // "Hechos" está en orden de llegada: la línea nueva arranca en el primer reel del 03-11.
  const desde = filas.findIndex((m) => m[1] === "03" && m[2] === "11");
  const lineaNueva = new Set(desde < 0 ? [] : filas.slice(desde).map((m) => m[3]));
  const lugar = (s) => (Number.isFinite(revision[s].orden) ? revision[s].orden : Infinity);
  const aprobados = hechos
    .filter((h) => revision[h]?.estado === "en_cola" && falta(h).length && !veto.includes(h))
    .sort((a, b) => lugar(a) - lugar(b) || String(revision[a].fecha || "").localeCompare(String(revision[b].fecha || "")));
  // Sin aprobados, sale solo el más nuevo que nadie revisó (Juan, 02-11: "no esperes a que yo te
  // los apruebe"). Los descartados en el panel no salen nunca.
  const sinRevisar = hechos.filter((h) => !revision[h] && lineaNueva.has(h) && falta(h).length && !veto.includes(h)).reverse();
  const pendientes = [...aprobados, ...sinRevisar];
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
    console.log("nada para publicar: ni la carpeta de Drive, ni la cola de aprobados, ni los reels sin revisar tienen pendientes");
    process.exit(0);
  }
  console.log(`toca (repo): ${slug}${aprobados.includes(slug) ? "" : " (sin revisar: sale solo)"} (quedan ${pendientes.length - 1} pendientes)`);
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
// La portada (herramientas/portada.mjs), si el reel tiene: Instagram la usa en vez del primer cuadro
let portadaUrl = "";
const portada = `reels/${slug}/portada.png`;
if (fs.existsSync(portada)) {
  const nombre = `${base}-${Date.now()}-portada.png`;
  await pedir(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_VIDEOS}/o?uploadType=media&name=${encodeURIComponent(nombre)}`, {
    method: "POST",
    headers: { ...conG, "Content-Type": "image/png" },
    body: fs.readFileSync(portada),
  });
  portadaUrl = `https://storage.googleapis.com/${BUCKET_VIDEOS}/${encodeURIComponent(nombre)}`;
  console.log("portada:", portadaUrl);
}

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
const hacerTT = ttOn && falta(slug).includes("tiktok");
const inboxTT = ttInbox && falta(slug).includes("tiktok");
const hechoEn = [];
if (!estado?.token) console.log("instagram: sin IG_TOKEN todavía, se saltea");
if (!hayIG && !hacerTT && !inboxTT) { console.log(`nada que hacer: ninguna red activa para ${slug}`); process.exit(0); }
let tk, igBase, uid;
if (hayIG) {
  tk = estado.token;
  if (tk.startsWith("IG")) {
    // token de "inicio de sesión con Instagram": graph.instagram.com, vence a los 60 días y se renueva
    igBase = IG;
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
    igBase = "https://graph.facebook.com/v21.0";
    uid = process.env.IG_USER_ID;
    // Si IG_TOKEN es un token de USUARIO (dura 60 días), la primera vez se cambia por el token de la
    // página que tiene el Instagram, que no vence, y se guarda en ig.json: de ahí en más se usa ese.
    if (!estado.pagina) {
      const pags = await pedir(`${igBase}/me/accounts?fields=access_token,instagram_business_account&access_token=${tk}`).catch(() => ({}));
      const p = pags.data?.find((x) => x.instagram_business_account?.id && x.access_token);
      if (p) {
        estado = { token: p.access_token, pagina: true, renovado: Date.now() };
        await guardarEstado(estado);
        tk = estado.token;
        uid ||= p.instagram_business_account.id;
        console.log("instagram: guardado el token de la página (no vence)");
      }
    }
    if (!uid) {
      const pags = await pedir(`${igBase}/me/accounts?fields=instagram_business_account&access_token=${tk}`);
      uid = pags.data?.map((p) => p.instagram_business_account?.id).find(Boolean);
      // token de página (no vence): "me" es la página misma
      if (!uid) uid = (await pedir(`${igBase}/me?fields=instagram_business_account&access_token=${tk}`).catch(() => ({}))).instagram_business_account?.id;
    }
    if (!uid) throw new Error("no encontré el id de la cuenta de Instagram: cargalo como IG_USER_ID en el workflow");
  }
  const cuenta = await pedir(`${igBase}/${uid}?fields=username&access_token=${tk}`);
  console.log(`instagram: @${cuenta.username}`);
}
if (hacerTT && PRUEBA) await publicarTikTok(accesoTT, bytes, caption, true);
console.log(`redes para ${slug}: ${[hayIG && "instagram", hacerTT && "tiktok", inboxTT && "bandeja de tiktok"].filter(Boolean).join(", ")}`);
if (PRUEBA) {
  console.log("PRUEBA: no publico ni muevo nada.");
  process.exit(0);
}

if (hayIG) {
// 5. Publicar: crear el contenedor, esperar a que Instagram procese el video, publicar
const form = (o) => new URLSearchParams({ ...o, access_token: tk });
const cont = await pedir(`${igBase}/${uid}/media`, {
  method: "POST",
  body: form({ media_type: "REELS", video_url: videoUrl, caption, share_to_feed: "true", is_ai_generated: "true", ...(portadaUrl ? { cover_url: portadaUrl } : {}) }),
});
let st;
for (let i = 0; i < 60; i++) {
  await espera(10000);
  st = await pedir(`${igBase}/${cont.id}?fields=status_code,status&access_token=${tk}`);
  if (st.status_code === "FINISHED") break;
  if (st.status_code === "ERROR" || st.status_code === "EXPIRED") throw new Error("Instagram no pudo procesar el video: " + JSON.stringify(st));
}
if (st.status_code !== "FINISHED") throw new Error("Instagram tardó más de 10 minutos en procesar el video");
const pub = await pedir(`${igBase}/${uid}/media_publish`, { method: "POST", body: form({ creation_id: cont.id }) });
const info = await pedir(`${igBase}/${pub.id}?fields=permalink&access_token=${tk}`);
console.log("PUBLICADO: " + info.permalink);
hechoEn.push("instagram");
}

// 5b. El mismo reel en la página de Facebook (Juan, 13-11: muchos dueños de pymes están más en Facebook).
// Va atado a Instagram: sale cuando sale ahí, con el token de la página. Necesita el permiso
// pages_manage_posts en ese token; sin él se anota en el log y sigue (no frena Instagram).
if (hechoEn.includes("instagram") && estado?.pagina && !(pub.facebook || []).includes(slug)) {
  try {
    const G = "https://graph.facebook.com/v21.0";
    const pagina = (await pedir(`${G}/me?fields=id&access_token=${tk}`)).id;
    const ini = await pedir(`${G}/${pagina}/video_reels`, { method: "POST", body: new URLSearchParams({ upload_phase: "start", access_token: tk }) });
    const sub = await pedir(`https://rupload.facebook.com/video-upload/v21.0/${ini.video_id}`, {
      method: "POST",
      headers: { Authorization: "OAuth " + tk, file_url: videoUrl },
    });
    if (!sub.success) throw new Error("la subida no terminó: " + JSON.stringify(sub).slice(0, 200));
    await pedir(`${G}/${pagina}/video_reels`, {
      method: "POST",
      body: new URLSearchParams({ upload_phase: "finish", video_id: ini.video_id, video_state: "PUBLISHED", description: caption, access_token: tk }),
    });
    console.log(`FACEBOOK: publicado (video ${ini.video_id})`);
    hechoEn.push("facebook");
  } catch (e) {
    console.log("FACEBOOK FALLÓ (¿falta pages_manage_posts en el token?): " + e.message);
  }
}
if (hacerTT) {
  try {
    console.log("TIKTOK: " + (await publicarTikTokPanel(accesoTT, bytes, { ...autoTT, titulo: caption })));
    hechoEn.push("tiktok");
  } catch (e) {
    console.log("TIKTOK FALLÓ: " + e.message);
    if (!hayIG) throw e;
  }
}

// Mientras TikTok está en pausa (la app sin auditar), lo que sale en Instagram va también a la bandeja
// de la app de TikTok, para publicarlo a mano desde el celular. Se anota en tiktok_inbox.
// En una hora solo de TikTok va igual (sin Instagram de por medio).
if (inboxTT && (hechoEn.includes("instagram") || !hayIG)) {
  try {
    console.log("TIKTOK: " + (await mandarAlInboxTikTok(accesoTT, bytes)));
    pub.tiktok_inbox = [...(pub.tiktok_inbox || []), slug];
  } catch (e) {
    console.log("TIKTOK (bandeja) FALLÓ: " + e.message);
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
