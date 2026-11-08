// Arma index.html, compositions/subtitulos.html y tiempos.md desde reel.json y la locución.
// Versión corta de netflix-blockbuster (03-11, ~30 s; reel.json acepta sinSub) (copiada de caso-dominos; capa 3D real con Three.js en assets/tres.js debajo de las escenas HTML): subtítulos arriba al centro, de 1 a 3
// palabras, Lexend 700 grande, y la palabra clave dentro de un recuadro verde de selección.
// dos-repuestos (copiado de dos-bicicleterias): el fondo lo pinta el canvas 3D (noche navy, mañana crema, cierre verde),
// subtítulos crema con contorno navy (se leen en los tres fondos), clave en recuadro verde con letra navy. Sin firma
// flotante: el logo va en la tarjeta de cierre. Escribe en tiempos3d.js la envolvente de la voz de Rubén (su boca).
//
// reel.json:
//   escenas:  [["s01-algo", 0], ...]   id y ÍNDICE de la palabra donde arranca
//   cortes:   "auto" (grupos de 1 a 3 palabras cortando en puntuación) o la lista de índices
//   subDesde / subHasta: primera palabra con subtítulo y primera sin (el gancho y el CTA ya
//             tienen texto grande en la escena)
//   acento:   palabras con recuadro verde · malo: con recuadro rojo apagado
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";
const largo = {};
const durArchivo = (n) => (largo[n] ??= Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/sfx/${n}.mp3`).toString()));
// techo por efecto: cada SFX queda como mucho en TECHO LUFS (la voz anda en -15), así nunca tapa la voz
const TECHO = -33.3; // la voz anda en -17 LUFS en este reel: el techo baja igual
const lufs = {};
// el render pone un efecto mono en los dos canales a nivel pleno (+3 LU): se mide igual que como va a sonar
const canales = {};
const mono = (n) => (canales[n] ??= Number(execSync(`ffprobe -v error -select_streams a:0 -show_entries stream=channels -of csv=p=0 assets/sfx/${n}.mp3`).toString())) === 1;
// se mide el TRAMO que suena (atrim hasta max) con apad, así un efecto corto o recortado se mide de verdad
const lufsArchivo = (n, max) => {
  const k = n + "@" + (max ?? "todo");
  if (lufs[k] === undefined) {
    const corte = max ? `atrim=0:${max},` : "";
    const txt = execSync(`ffmpeg -hide_banner -i assets/sfx/${n}.mp3 -af "${corte}apad=pad_dur=1,${mono(n) ? "pan=stereo|c0=c0|c1=c0," : ""}ebur128" -f null - 2>&1`).toString();
    const m = [...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
    lufs[k] = m && Number(m[1]) > -69 ? Number(m[1]) : -30;
  }
  return lufs[k];
};
const conTecho = (n, v, max) => Math.round(Math.min(v, Math.pow(10, (TECHO - lufsArchivo(n, max)) / 20)) * 1000) / 1000;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const r2 = (n) => Math.round(n * 100) / 100;

const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const palabras = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, palabras.at(-1).end) + 0.15);

const inicio = (i) => (i === 0 ? 0 : r2(palabras[i].start));
const TODAS = reel.escenas.map(([id, i], k) => [id, inicio(i), k + 1 < reel.escenas.length ? inicio(reel.escenas[k + 1][1]) : DUR]);
export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));
// envolvente de la voz a 30 cuadros por segundo en el tramo de Rubén (mueve su boca)
const RT0 = r2(palabras[reel.rubenDesde].start - 0.35), RT1 = r2(palabras[reel.rubenHasta].start - 0.2);
const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-ss", String(RT0), "-t", String(r2(RT1 - RT0)), "-i", "assets/voice/locucion.wav", "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
const env = [];
for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
  let s = 0, c = 0;
  for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
  env.push(Math.sqrt(s / Math.max(1, c)));
}
const mx = Math.max(...env);
const ENV = env.map((v) => { const k = v / mx; return r2(k < 0.12 ? 0 : Math.pow(k, 0.8)); });
fs.writeFileSync(
  "assets/tiempos3d.js",
  `// lo genera armar.mjs\nexport const DUR = ${DUR};\nexport const E = ${JSON.stringify(Object.fromEntries(TODAS.map(([id, a]) => [id, a])))};\nexport const W = ${JSON.stringify(palabras.map((w) => r2(w.start)))};\nexport const WF = ${JSON.stringify(palabras.map((w) => r2(w.end)))};\nexport const VOZ_T = ${RT0};\nexport const VOZ_ENV = ${JSON.stringify(ENV)};\n`,
);
const ACENTO = new Set(reel.acento);
const MALO = new Set(reel.malo ?? []);
const DESDE = reel.subDesde ?? 0;
const HASTA = reel.subHasta ?? palabras.length;

// grupos automáticos: hasta 3 palabras, o 2 si ya son largas; cortan después de puntuación
let CORTES = reel.cortes;
if (CORTES === "auto") {
  CORTES = [];
  let n = 0, chars = 0;
  // sinSub: [[desde, hasta), ...] frases que ya tienen texto grande en la escena
  const SIN = reel.sinSub ?? [];
  const fuera = (i) => SIN.some(([a, b]) => i >= a && i < b);
  for (let i = DESDE; i < HASTA; i++) {
    if (fuera(i)) { n = 0; chars = 0; continue; }
    if (n === 0) CORTES.push(i);
    n++; chars += palabras[i].text.length + 1;
    const sig = palabras[i + 1]?.text ?? "";
    if (/[.,?!:]$/.test(palabras[i].text) || n === 3 || (n === 2 && chars + sig.length > 17)) { n = 0; chars = 0; }
  }
}

fs.writeFileSync(
  "tiempos.md",
  TODAS.map(([id, a, b]) =>
    `### ${id} — dura ${(b - a).toFixed(2)} s (inicio global ${a.toFixed(2)})\nPalabras (segundos relativos a la escena): ` +
    palabras.filter((w) => w.start >= a - 0.01 && w.start < b).map((w) => `${w.text} ${(w.start - a).toFixed(2)}`).join(" · "),
  ).join("\n\n") + `\n\nDuración total ${DUR} (la voz termina en ${VOZ}).\n`,
);

// ---------- subtítulos ----------
let grupos = "";
let anim = "";
const SINS = reel.sinSub ?? [];
CORTES.forEach((desde, g) => {
  let hasta = g + 1 < CORTES.length ? CORTES[g + 1] : HASTA;
  for (const [a, b] of SINS) if (a > desde && a < hasta) hasta = a;
  const ws = palabras.slice(desde, hasta);
  const ini = r2(Math.max(0, ws[0].start - 0.08));
  const proximo = g + 1 < CORTES.length && CORTES[g + 1] === hasta ? palabras[CORTES[g + 1]].start - 0.08 : Math.min(DUR, ws.at(-1).end + 0.35, hasta < palabras.length && SINS.some(([x]) => x === hasta) ? palabras[hasta].start - 0.1 : DUR);
  let fin = r2(Math.min(proximo, DUR, hasta === HASTA && HASTA < palabras.length ? palabras[HASTA].start - 0.05 : DUR));
  // si después viene una pausa larga (el remate en silencio), el subtítulo se va al terminar la frase
  if (fin - ws.at(-1).end > 0.5) fin = r2(ws.at(-1).end + 0.3);
  const id = `sub-g${String(g + 1).padStart(2, "0")}`;
  const spans = ws
    .map((w, k) => {
      const i = desde + k;
      const cls = ACENTO.has(i) ? " ac" : MALO.has(i) ? " ac malo" : "";
      const caja = cls ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : "";
      return `<span class="w${cls}" data-t="${r2(w.start - ini)}">${caja}<em>${esc(w.text)}</em></span>`;
    })
    .join(" ");
  const largoTxt = ws.map((w) => w.text).join(" ").length;
  grupos += `    <div id="${id}" class="grupo clip" data-start="${ini}" data-duration="${r2(fin - ini)}" data-track-index="0"><p${largoTxt > 17 ? ' style="font-size: 76px"' : ""}>${spans}</p></div>\n`;
  anim += `      ["${id}", ${ini}, ${r2(fin - ini)}],\n`;
});

const C = '[data-composition-id="subtitulos"]';
const subtitulos = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; pointer-events: none; }
    ${C} .grupo { position: absolute; left: 50px; top: 200px; width: 980px; height: 260px; display: flex; align-items: center; justify-content: center; }
    ${C} p { margin: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 86px; line-height: 1.22; letter-spacing: -0.015em; color: #ffffff; text-shadow: -5px -5px 0 #0b1220, 5px -5px 0 #0b1220, -5px 5px 0 #0b1220, 5px 5px 0 #0b1220, 0 -7px 0 #0b1220, 0 7px 0 #0b1220, -7px 0 0 #0b1220, 7px 0 0 #0b1220, 0 12px 0 rgba(11, 18, 32, 0.45); }
    ${C} .w.ac em { text-shadow: none; color: #0b1220; }
    ${C} .w { display: inline-block; position: relative; opacity: 0; }
    ${C} .w em { font-style: normal; position: relative; }
    ${C} .w.ac { margin: 0 6px; }
    ${C} .caja { position: absolute; left: -16px; right: -16px; top: 4px; bottom: 0px; border: 5px solid #0b1220; background: #5ce611; border-radius: 6px; }
    ${C} .malo .caja { border-color: #0b1220; background: #d9877e; }
    ${C} .caja i { position: absolute; width: 18px; height: 18px; background: #ffffff; border: 4px solid #0b1220; }
    
    ${C} .caja .c1 { left: -12px; top: -12px; } ${C} .caja .c2 { right: -12px; top: -12px; }
    ${C} .caja .c3 { left: -12px; bottom: -12px; } ${C} .caja .c4 { right: -12px; bottom: -12px; }
  </style>
  <div id="root" data-composition-id="subtitulos" data-width="1080" data-height="1920" data-duration="${DUR}">
${grupos}  </div>
  <script>
    (function () {
      const ID = "subtitulos";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const tl = gsap.timeline({ paused: true });
      const GRUPOS = [
${anim}      ];
      for (const [id, ini, dur] of GRUPOS) {
        const el = root.querySelector("#" + id);
        tl.fromTo(el.querySelector("p"), { scale: 0.94, opacity: 1, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ini);
        for (const w of el.querySelectorAll(".w")) {
          const t = ini + Number(w.dataset.t);
          const caja = w.querySelector(".caja");
          // entra entera (sin fundido gris): aparece y rebota un poco en escala
          // las palabras con recuadro entran recién cuando se dicen (junto con su recuadro): nunca navy sin fondo
          const tw = caja ? t : ini;
          tl.set(w, { opacity: 1 }, tw);
          tl.fromTo(w, { y: 14, scale: 0.9 }, { y: 0, scale: 1, duration: 0.14, ease: "back.out(2)", immediateRender: false }, tw);
          if (caja) { tl.set(caja, { opacity: 1 }, t); tl.fromTo(caja, { scaleX: 1.2, scaleY: 1.3, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.16, ease: "power3.out", immediateRender: false }, t); }
        }
        tl.set(el.querySelector("p"), { opacity: 0 }, ini + dur - 0.001);
      }
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/subtitulos.html", subtitulos);

// ---------- fondo: estrellitas deterministas ----------
let semilla = 7;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
let estrellas = "";
for (let i = 0; i < 0; i++) {
  const x = Math.round(azar() * 1080), y = Math.round(azar() * 1920);
  const r = r2(1.6 + azar() * 1.8), o = r2(0.18 + azar() * 0.22);
  estrellas += `<circle class="estr" cx="${x}" cy="${y}" r="${r}" fill="#efeee5" opacity="${o}" />`;
}

const hosts = ESCENAS.map(
  ([id, a, b], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${r2(b - a)}" data-track-index="${2 + (i % 2)}" data-track-kind="graphics"></div>`,
).join("\n");

const sfx = [];
for (const [id, a] of ESCENAS) {
  const f = `compositions/${id}.sfx.json`;
  if (!fs.existsSync(f)) continue;
  for (const s of JSON.parse(fs.readFileSync(f, "utf8"))) sfx.push({ t: r2(a + s.t), name: s.sfx, vol: s.vol ?? 0.3, max: s.max });
}
for (const [, a] of ESCENAS.slice(1)) if (!sfx.some((s) => /whoosh/.test(s.name) && Math.abs(s.t - (a - 0.15)) < 0.45)) sfx.push({ t: r2(a - 0.15), name: "whoosh-short", vol: 0.16 });
sfx.sort((x, y) => x.t - y.t);
const sfxTags = sfx
  .map((s, i) => `      <audio id="sfx-${String(i).padStart(2, "0")}" src="assets/sfx/${s.name}.mp3" data-start="${s.t}" data-duration="${r2(Math.min(s.max ?? 99, durArchivo(s.name)) - 0.01)}" data-track-index="${40 + (i % 24)}" data-volume="${conTecho(s.name, s.vol, Math.min(s.max ?? 99, durArchivo(s.name)) - 0.01)}"${s.max && s.max < durArchivo(s.name) ? ` data-fade-out="${r2(Math.min(0.15, s.max / 3))}"` : ""}></audio>`)
  .join("\n");

const index = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #fondo { position: absolute; inset: 0; background: #0b1220; }
      #estrellas { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1760px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.9; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${hosts}
      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="0" data-duration="${Math.min(DUR, 63.9)}" data-track-index="31" data-volume="${reel.bgmVol ?? 0.12}" data-fade-out="0.35"></audio>\n` : ""}${sfxTags}
    </div>
    <script>
      window.__hf = window.__hf || {};
      window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["tres"] = new Promise((ok) => { window.__tresListo = ok; });${process.env.LIMPIO ? "\n      window.__limpio = true; // fondo de la portada: sin el reloj 3D" : ""}
    </script>
    <script type="module" src="assets/tres.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      document.querySelectorAll("#estrellas .estr").forEach((s, i) => {
        tl.to(s, { opacity: 0.08, duration: 1.4 + (i % 5) * 0.3, ease: "sine.inOut", yoyo: true, repeat: Math.ceil(${DUR} / 2.6) }, (i % 7) * 0.4);
      });
      tl.to("#fondo", { opacity: 1, duration: ${DUR} }, 0);

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", index);
console.log(`index: ${ESCENAS.length} escenas, ${sfx.length} efectos; subtítulos: ${CORTES.length} grupos`);
console.log(CORTES.map((c, g) => palabras.slice(c, Math.min(g + 1 < CORTES.length ? CORTES[g + 1] : HASTA, ...SINS.map(([a]) => (a > c ? a : 1e9)))).map((w) => w.text).join(" ")).join(" | "));
