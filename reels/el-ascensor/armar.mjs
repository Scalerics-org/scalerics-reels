// Arma index.html, compositions/subtitulos.html y tiempos.md desde reel.json y la locución.
// Correr de nuevo después de cambiar reel.json, la voz o los .sfx.json.
//
// reel.json:
//   escenas: [["s01-algo", 0], ["s02-otra", 15], ...]  id y ÍNDICE de la palabra donde arranca
//   cortes:  [0, 7, 15, ...]                           primera palabra de cada grupo de subtítulos
//   acento:  [2, 5, 6, ...]                            palabras en verde
// Las duraciones salen solas de assets/voice/palabras.json: si la voz cambia, las escenas se
// recalculan (las animaciones internas de cada escena no: ver "Si la voz cambia" en ../CLAUDE.md).
import fs from "node:fs";
import { execSync } from "node:child_process";
const largo = {};
const durArchivo = (n) => (largo[n] ??= Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/sfx/${n}.mp3`).toString()));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const r2 = (n) => Math.round(n * 100) / 100;

const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const palabras = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
// el CTA queda ~3 s quieto después de la última palabra
const DUR = r2(Math.max(VOZ, palabras.at(-1).end) + 3.2);

const inicio = (i) => (i === 0 ? 0 : r2(palabras[i].start));
const TODAS = reel.escenas.map(([id, i], k) => [id, inicio(i), k + 1 < reel.escenas.length ? inicio(reel.escenas[k + 1][1]) : DUR]);
export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));
const CORTES = reel.cortes;
// el-ascensor: el acento de los subtítulos tiene el color de quien habla
// (reel.voces: [[índice de palabra, clase]]; r Rubén · v Valeria · k intercomunicador · o Scalerics)
const vozDe = (i) => (reel.voces ?? [[0, "r"]]).filter(([d]) => d <= i).at(-1)[1];
const P = (i) => r2(palabras[i].start);
// momentos globales (índices de palabra de reel.json / guion.txt)
const M = { TRANCA: P(2), FIN1: r2(palabras[11].end), ABRIL: P(15), MUY: P(118), GIRO: P(119), SCALERICS: P(144), AHORA: P(171), LLAMA: P(175), CTA: P(181) };
const ACENTO = new Set(reel.acento);

// tiempos.md: lo que leen los que construyen escenas
fs.writeFileSync(
  "tiempos.md",
  TODAS.map(([id, a, b]) =>
    `### ${id} — dura ${(b - a).toFixed(2)} s (inicio global ${a.toFixed(2)})\nPalabras (segundos relativos a la escena): ` +
    palabras.filter((w) => w.start >= a - 0.01 && w.start < b).map((w) => `${w.text} ${(w.start - a).toFixed(2)}`).join(" · "),
  ).join("\n\n") + `\n\nDuración total ${DUR} (la voz termina en ${VOZ}).\n`,
);

// el-ascensor: ambiente.html toma los tiempos globales de la locución
if (fs.existsSync("compositions/ambiente.html")) {
  let am = fs.readFileSync("compositions/ambiente.html", "utf8");
  am = am.replace(/data-duration="[\d.]+"/g, `data-duration="${DUR}"`).replace(/const DUR = [\d.]+;/, `const DUR = ${DUR};`)
    .replace(/const TURNOS = .*;/, `const TURNOS = ${JSON.stringify(reel.voces.map(([i, v]) => [i === 0 ? 0 : P(i), v]))};`)
    .replace(/const M = .*;/, `const M = ${JSON.stringify(M)};`);
  fs.writeFileSync("compositions/ambiente.html", am);
}

// ---------- subtítulos ----------
let grupos = "";
let anim = "";
CORTES.forEach((desde, g) => {
  const hasta = g + 1 < CORTES.length ? CORTES[g + 1] : palabras.length;
  const ws = palabras.slice(desde, hasta);
  const ini = r2(Math.max(0, ws[0].start - 0.12));
  const proximo = g + 1 < CORTES.length ? palabras[CORTES[g + 1]].start - 0.12 : DUR;
  const fin = r2(Math.min(proximo, DUR));
  const id = `sub-g${String(g + 1).padStart(2, "0")}`;
  const spans = ws
    .map((w, k) => {
      const i = desde + k;
      return `<span class="w${ACENTO.has(i) ? " ac ac-" + vozDe(i) : ""}" data-t="${r2(w.start - ini)}">${esc(w.text)}</span>`;
    })
    .join(" ");
  grupos += `    <div id="${id}" class="grupo clip" data-start="${ini}" data-duration="${r2(fin - ini)}" data-track-index="0"><p>${spans}</p></div>\n`;
  anim += `      ["${id}", ${ini}, ${r2(fin - ini)}],\n`;
});

const subtitulos = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; pointer-events: none; }
    [data-composition-id="subtitulos"] .grupo { position: absolute; left: 72px; top: 236px; width: 936px; }
    [data-composition-id="subtitulos"] p { margin: 0; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 52px; line-height: 1.24; letter-spacing: -0.005em; color: #efeee5; }
    [data-composition-id="subtitulos"] .w { display: inline-block; opacity: 0; }
    [data-composition-id="subtitulos"] p { color: #fff6e3; text-shadow: 0 5px 0 #14181d, 3px 3px 0 #14181d, -3px -3px 0 #14181d, 3px -3px 0 #14181d, -3px 3px 0 #14181d, 0 -3px 0 #14181d; }
    [data-composition-id="subtitulos"] .w.ac { color: #ff9a3c; }
    [data-composition-id="subtitulos"] .w.ac-v { color: #ff7a80; }
    [data-composition-id="subtitulos"] .w.ac-k { color: #ffd166; }
    [data-composition-id="subtitulos"] .w.ac-o { color: #5ce611; }
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
        for (const w of el.querySelectorAll(".w")) {
          const t = ini + Number(w.dataset.t);
          tl.fromTo(w, { opacity: 0, y: 10, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22, ease: "power3.out" }, t);
        }
        tl.to(el.querySelector("p"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, ini + dur - 0.2);
      }
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/subtitulos.html", subtitulos);

// ---------- música ----------
// el-ascensor: la música de ascensor (sintetizada por partes/musica.mjs, 17.14 s) suena desde el silencio del
// gancho hasta que entra Scalerics; desde ahí, la cama de siempre.
const LARGO_MUS = 17.1;
let musica = "";
for (let t = M.FIN1 + 0.1, k = 0; t < M.GIRO - 0.3; t += LARGO_MUS, k++)
  musica += `      <audio id="mus-${k}" src="assets/sfx/ascensor.mp3" data-start="${r2(t)}" data-duration="${r2(Math.min(LARGO_MUS, M.GIRO - 0.2 - t))}" data-track-index="${32 + (k % 2)}" data-volume="${k === 0 ? 0.32 : 0.2}"></audio>\n`;
if (fs.existsSync("assets/bgm/bed.mp3")) musica += `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="${M.GIRO}" data-duration="${r2(Math.min(DUR - M.GIRO, 63.9))}" data-track-index="31" data-volume="0.28"></audio>\n`;

// ---------- index ----------
const hosts = ESCENAS.map(
  ([id, a, b], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${r2(b - a)}" data-track-index="${1 + (i % 2)}" data-track-kind="graphics"></div>`,
).join("\n");

const sfx = [];
for (const [id, a] of ESCENAS) {
  const f = `compositions/${id}.sfx.json`;
  if (!fs.existsSync(f)) continue;
  for (const s of JSON.parse(fs.readFileSync(f, "utf8"))) {
    sfx.push({ t: r2(a + s.t), name: s.sfx, vol: s.vol ?? 0.35, max: s.max });
  }
}
// un whoosh suave en cada cambio de escena
for (const [, a] of ESCENAS.slice(1)) sfx.push({ t: r2(a - 0.15), name: "whoosh-short", vol: 0.22 });
sfx.sort((x, y) => x.t - y.t);
const sfxTags = sfx
  .map((s, i) => `      <audio id="sfx-${String(i).padStart(2, "0")}" src="assets/sfx/${s.name}.mp3" data-start="${s.t}" data-duration="${r2(Math.min(s.max ?? 99, durArchivo(s.name)) - 0.01)}" data-track-index="${40 + (i % 8)}" data-volume="${s.vol}"></audio>`)
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #8e979f; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #8e979f; }
      /* interior de ascensor: techo con luz, paredes de acero cepillado en perspectiva, espejo en el fondo, pasamanos, piso de goma */
      #fondo { position: absolute; inset: 0; }
      #fondo svg { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"><svg viewBox="0 0 1080 1920" aria-hidden="true"><defs><pattern id="fo-cep" width="6" height="40" patternUnits="userSpaceOnUse"><rect width="6" height="40" fill="#aab2ba"/><rect x="0" width="2" height="40" fill="#b9c1c8"/><rect x="4" width="1" height="40" fill="#9aa2aa"/></pattern><pattern id="fo-cep2" width="6" height="40" patternUnits="userSpaceOnUse"><rect width="6" height="40" fill="#7f8891"/><rect x="0" width="2" height="40" fill="#8b949c"/><rect x="4" width="1" height="40" fill="#717a83"/></pattern><pattern id="fo-piso" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#2d3238"/><circle cx="15" cy="15" r="6" fill="#383e45"/><circle cx="45" cy="45" r="6" fill="#383e45"/></pattern></defs><rect width="1080" height="1920" fill="url(#fo-cep)"/><polygon points="0,0 1080,0 930,200 150,200" fill="#22272d"/><rect x="300" y="70" width="480" height="70" rx="10" fill="#fff6e3" opacity="0.9"/><rect x="300" y="70" width="480" height="70" rx="10" fill="none" stroke="#14181d" stroke-width="6"/><polygon points="0,0 150,200 150,1500 0,1920" fill="url(#fo-cep2)"/><polygon points="1080,0 930,200 930,1500 1080,1920" fill="url(#fo-cep2)"/><path d="M150 200 L150 1500 M930 200 L930 1500" stroke="#14181d" stroke-width="6"/><path d="M540 200 L540 1500" stroke="#8e979f" stroke-width="4"/><rect x="210" y="280" width="660" height="900" rx="14" fill="#c4d0d8" stroke="#6b7580" stroke-width="10"/><path d="M260 520 L480 300 M300 700 L620 380 M640 1100 L860 880" stroke="#e6eef2" stroke-width="22" opacity="0.6"/><rect x="160" y="1210" width="760" height="26" rx="13" fill="#dfe4e8" stroke="#14181d" stroke-width="6"/><path d="M200 1236 L200 1270 M880 1236 L880 1270" stroke="#14181d" stroke-width="10"/><polygon points="150,1500 930,1500 1080,1920 0,1920" fill="url(#fo-piso)"/><path d="M150 1500 L930 1500" stroke="#14181d" stroke-width="6"/><g transform="translate(985 820) skewY(-12)"><rect x="-38" y="-170" width="76" height="320" rx="10" fill="#b8c0c8" stroke="#14181d" stroke-width="5"/><circle cx="0" cy="-130" r="16" fill="#dfe4e8" stroke="#14181d" stroke-width="4"/><circle cx="0" cy="-86" r="16" fill="#dfe4e8" stroke="#14181d" stroke-width="4"/><circle cx="0" cy="-42" r="16" fill="#dfe4e8" stroke="#14181d" stroke-width="4"/><circle cx="0" cy="2" r="16" fill="#dfe4e8" stroke="#14181d" stroke-width="4"/><circle cx="0" cy="46" r="16" fill="#dfe4e8" stroke="#14181d" stroke-width="4"/><circle cx="0" cy="110" r="18" fill="#e5303a" stroke="#14181d" stroke-width="4"/></g></svg></div>
${hosts}
${fs.existsSync("compositions/ambiente.html") ? `      <div id="el-ambiente" class="scene" data-composition-id="ambiente" data-composition-src="compositions/ambiente.html" data-start="0" data-duration="${DUR}" data-track-index="4" data-track-kind="graphics"></div>
` : ""}      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${musica}${sfxTags}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", index);
console.log(`index: ${ESCENAS.length} escenas, ${sfx.length} efectos; subtítulos: ${CORTES.length} grupos`);
