// Estadísticas de los reels en Instagram → stats.md (lo lee la rutina antes de elegir temas).
// Uso: node herramientas/stats.mjs            (escribe stats.md en la raíz del repo)
// Lo corre cada lunes el Action .github/workflows/stats.yml; a mano también anda en la compu de Juan
// (sin GOOGLE_SA_JSON usa el login de gcloud).
//
// El token de Instagram es el de la página (no vence) que guarda el publicador en
// gs://scalerics-reels-estado/ig.json. Cada reel de la API se empareja con su carpeta comparando la
// descripción contra reels/<slug>/descripcion.txt.
import fs from "node:fs";
import { execSync } from "node:child_process";
import { tokenGoogle } from "./google.mjs";

const G = "https://graph.facebook.com/v21.0";
const BUCKET_ESTADO = "scalerics-reels-estado";
const DIAS = 30; // ventana de la tabla

async function pedir(url, opciones = {}) {
  const r = await fetch(url, opciones);
  const j = await r.json().catch(() => ({}));
  // nunca imprimir la URL entera: lleva el token
  if (!r.ok) throw new Error(`${url.split("?")[0]} → ${r.status}: ${JSON.stringify(j).slice(0, 300)}`);
  return j;
}

const g = process.env.GOOGLE_SA_JSON
  ? await tokenGoogle(["https://www.googleapis.com/auth/devstorage.read_only"])
  : execSync("gcloud auth print-access-token", { encoding: "utf8", shell: true }).trim();
const estado = await pedir(`https://storage.googleapis.com/storage/v1/b/${BUCKET_ESTADO}/o/ig.json?alt=media`, {
  headers: { Authorization: "Bearer " + g },
});
const tk = estado.token;
if (!tk) throw new Error("ig.json no tiene token");

// La página tiene el Instagram: de ahí sale el id de la cuenta
const pagina = await pedir(`${G}/me?fields=instagram_business_account&access_token=${tk}`);
const uid = pagina.instagram_business_account?.id;
if (!uid) throw new Error("el token no es de la página con el Instagram");
const cuenta = await pedir(`${G}/${uid}?fields=username,followers_count&access_token=${tk}`);

// ---- reels y sus métricas ----
const medias = [];
for (let u = `${G}/${uid}/media?fields=id,caption,media_product_type,timestamp,permalink&limit=100&access_token=${tk}`; u; ) {
  const d = await pedir(u);
  medias.push(...(d.data || []));
  u = d.paging?.next;
  if (medias.length && medias.at(-1).timestamp < new Date(Date.now() - 120 * 864e5).toISOString()) break;
}
const METRICAS = "reach,views,saved,shares,likes,comments,ig_reels_avg_watch_time";
const reels = [];
for (const m of medias) {
  if (m.media_product_type !== "REELS") continue;
  if (Date.now() - Date.parse(m.timestamp) > DIAS * 864e5) continue;
  let ins = {};
  try {
    const d = await pedir(`${G}/${m.id}/insights?metric=${METRICAS}&access_token=${tk}`);
    for (const x of d.data || []) ins[x.name] = x.values?.[0]?.value ?? 0;
  } catch (e) {
    console.log(`sin métricas para ${m.permalink}: ${e.message}`);
  }
  reels.push({ ...m, ins });
}

// ---- emparejar con las carpetas del repo ----
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const carpetas = fs.existsSync("reels") ? fs.readdirSync("reels") : [];
const desc = carpetas
  .filter((s) => fs.existsSync(`reels/${s}/descripcion.txt`))
  .map((s) => ({ s, d: norm(fs.readFileSync(`reels/${s}/descripcion.txt`, "utf8")).slice(0, 160) }));
function slugDe(caption) {
  const c = norm(caption).slice(0, 160);
  if (!c) return null;
  // la primera línea de la descripción es propia de cada reel; si coinciden los primeros 60
  // caracteres es ese
  const exacto = desc.find((x) => x.d.slice(0, 60) === c.slice(0, 60));
  return exacto ? exacto.s : null;
}
function duracion(s) {
  // fin del último elemento con tiempo en la composición raíz (las armadas por partes no lo tienen)
  const p = `reels/${s}/index.html`;
  if (!fs.existsSync(p)) return null;
  const html = fs.readFileSync(p, "utf8");
  let fin = 0;
  for (const m of html.matchAll(/data-start="([\d.]+)"[^>]*?data-duration="([\d.]+)"/g)) fin = Math.max(fin, +m[1] + +m[2]);
  return fin > 5 ? fin : null;
}
function gancho(s) {
  const p = `reels/${s}/guion.txt`;
  if (!fs.existsSync(p)) return "";
  const l = fs.readFileSync(p, "utf8").split("\n").map((x) => x.trim()).find((x) => x && !x.startsWith("["));
  return (l || "").replace(/\|/g, "/").slice(0, 90);
}

const filas = reels.map((m) => {
  const s = slugDe(m.caption);
  const dur = s ? duracion(s) : null;
  const avg = (m.ins.ig_reels_avg_watch_time || 0) / 1000;
  return {
    fecha: m.timestamp,
    slug: s,
    nombre: s || "(sin carpeta) " + (m.caption || "").split("\n")[0].slice(0, 40),
    link: m.permalink,
    vistas: m.ins.views ?? 0,
    alcance: m.ins.reach ?? 0,
    avg,
    ret: dur ? Math.round((avg / dur) * 100) : null,
    likes: m.ins.likes ?? 0,
    com: m.ins.comments ?? 0,
    comp: m.ins.shares ?? 0,
    guard: m.ins.saved ?? 0,
    gancho: s ? gancho(s) : "",
  };
});

// ---- cuenta: últimos 7 días contra los 7 anteriores ----
async function totales(desde, hasta) {
  const out = {};
  const d = await pedir(`${G}/${uid}/insights?metric=profile_views,website_clicks,accounts_engaged&metric_type=total_value&period=day&since=${desde}&until=${hasta}&access_token=${tk}`);
  for (const x of d.data || []) out[x.name] = x.total_value?.value ?? 0;
  // seguidores nuevos: la serie diaria (solo existe para los últimos 30 días)
  const f = await pedir(`${G}/${uid}/insights?metric=follower_count&period=day&since=${desde}&until=${hasta}&access_token=${tk}`).catch(() => ({}));
  out.siguen = (f.data?.[0]?.values || []).reduce((t, v) => t + (v.value || 0), 0);
  return out;
}
const ahora = Math.floor(Date.now() / 1000);
const sem = await totales(ahora - 7 * 86400, ahora);
const ant = await totales(ahora - 14 * 86400, ahora - 7 * 86400);

// ---- stats.md ----
const UMBRAL = 600; // vistas: por arriba, Instagram lo mostró fuera de los seguidores
const n = (x) => x.toLocaleString("es-UY");
const linea = (f) =>
  `| ${f.fecha.slice(5, 10)} | ${f.slug ? "`" + f.slug + "`" : f.nombre} | ${n(f.vistas)} | ${f.avg.toFixed(1)} s | ${f.ret ?? "-"}${f.ret != null ? " %" : ""} | ${f.likes} | ${f.com} | ${f.comp} | ${f.guard} | ${f.gancho} |`;
const cab = "| Fecha | Reel | Vistas | Visionado medio | % del video | Likes | Coment. | Compart. | Guard. | Primera línea del guion |\n|---|---|---|---|---|---|---|---|---|---|";
const orden = [...filas].sort((a, b) => b.vistas - a.vistas);
const salieron = filas.filter((f) => f.vistas >= UMBRAL);
const med = (xs) => (xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : 0);
const avgArriba = med(salieron.map((f) => f.avg));
const avgAbajo = med(filas.filter((f) => f.vistas < UMBRAL).map((f) => f.avg));
const comp = (k) => `${n(sem[k] ?? 0)} (semana anterior: ${n(ant[k] ?? 0)})`;

const md = `# Estadísticas de los reels (Instagram @${cuenta.username})

Actualizado: ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC, por \`herramientas/stats.mjs\` (Action
"Estadísticas", cada lunes). No editar a mano: se pisa.

**Cómo usarlo (la rutina, antes de elegir temas):** mirá qué tienen en común los de arriba (formato,
personaje, primera línea, duración) y hacé más de eso; lo de abajo, no lo repitas. Lo que decide si un
reel sale de los seguidores es el **visionado medio**: los que pasan ${UMBRAL} vistas tienen una mediana de
**${avgArriba.toFixed(1)} s**; los que no, **${avgAbajo.toFixed(1)} s**.

## La cuenta, últimos 7 días

- Seguidores: ${n(cuenta.followers_count)}
- Seguidores nuevos: ${comp("siguen")}
- Visitas al perfil: ${comp("profile_views")}
- Clics a la web: ${comp("website_clicks")}
- Cuentas que interactuaron: ${comp("accounts_engaged")}

## Últimos ${DIAS} días: ${salieron.length} de ${filas.length} reels salieron de los seguidores (≥ ${UMBRAL} vistas)

### Los 10 mejores
${cab}
${orden.slice(0, 10).map(linea).join("\n")}

### Los 10 peores
${cab}
${orden.slice(-10).reverse().map(linea).join("\n")}

## Todos, por fecha
${cab}
${[...filas].sort((a, b) => b.fecha.localeCompare(a.fecha)).map(linea).join("\n")}
`;
fs.writeFileSync("stats.md", md);
console.log(`stats.md: ${filas.length} reels (${salieron.length} con ≥ ${UMBRAL} vistas), ${filas.filter((f) => !f.slug).length} sin carpeta`);
