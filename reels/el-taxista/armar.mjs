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
const BGM = fs.existsSync("assets/bgm/bed.mp3") ? r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/bgm/bed.mp3").toString()) - 0.05) : 0;

const inicio = (i) => (i === 0 ? 0 : r2(palabras[i].start));
const TODAS = reel.escenas.map(([id, i], k) => [id, inicio(i), k + 1 < reel.escenas.length ? inicio(reel.escenas[k + 1][1]) : DUR]);
export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));
const CORTES = reel.cortes;
const ACENTO = new Set(reel.acento);
// el-taxista: el acento de los subtítulos tiene el color de quien habla
// (reel.voces: [[índice de palabra, clase]]; t taxista, p pasajera, o Scalerics)
const vozDe = (i) => (reel.voces ?? [[0, "c"]]).filter(([d]) => d <= i).at(-1)[1];

// tiempos.md: lo que leen los que construyen escenas
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
    [data-composition-id="subtitulos"] p { color: #f4ecd8; text-shadow: 0 4px 0 #0b0f1a, 0 0 18px rgba(11, 15, 26, 0.95); }
    [data-composition-id="subtitulos"] .w.ac { color: #ffc81a; }
    [data-composition-id="subtitulos"] .w.ac-p { color: #7fd3ff; }
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

// bokeh determinista: luces de la ciudad (ámbar, rojo, amarillo, crema, celeste), duplicadas a +1080 para el loop
const COL = ["255,154,60", "255,59,48", "255,200,26", "244,236,216", "127,211,255", "255,154,60"];
const capa = (id, n, semilla, rmin, rmax, blur, op) => {
  let s = "";
  for (let k = 0; k < n; k++) {
    const x = (k * 1080 / n + (k * semilla * 37) % 140) % 1080, y = 120 + ((k * semilla * 211) % 1700), r = rmin + ((k * 53 + semilla) % (rmax - rmin));
    const c = COL[(k + semilla) % COL.length], o = (op * (0.55 + ((k * 7) % 5) * 0.11)).toFixed(2);
    for (const dx of [0, 1080]) s += `<i style="left:${Math.round(x + dx - r)}px;top:${Math.round(y - r)}px;width:${2 * r}px;height:${2 * r}px;background:radial-gradient(circle, rgba(${c},${o}) 0%, rgba(${c},${(o * 0.55).toFixed(2)}) 45%, rgba(${c},0) 72%);filter:blur(${blur}px)"></i>`;
  }
  return `<div id="${id}" class="bk">${s}</div>`;
};
const BOKEH = capa("bk1", 16, 3, 40, 110, 6, 0.5) + capa("bk2", 12, 7, 70, 170, 12, 0.38) + `<div class="farola"></div>`;
const FAROLA_FIN = reel.escenas.find(([id]) => id === "s14-scalerics") ? r2(palabras[reel.escenas.find(([id]) => id === "s14-scalerics")[1]].start) : DUR;

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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0b0f1a; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0b0f1a; }
      /* interior de taxi de noche: azul noche, luces de la ciudad en bokeh que pasan por la ventanilla (main timeline) */
      #fondo { position: absolute; inset: 0; overflow: hidden;
        background:
          radial-gradient(ellipse 760px 900px at 540px 980px, rgba(127, 211, 255, 0.07) 0%, rgba(127, 211, 255, 0) 70%),
          radial-gradient(ellipse 900px 1150px at 540px 900px, #1a2a4a 0%, #121c33 50%, #0b0f1a 88%); }
      #fondo .bk { position: absolute; left: 0; top: 0; width: 2160px; height: 1920px; }
      #fondo .bk i { position: absolute; border-radius: 50%; }
      #fondo .farola { position: absolute; left: -700px; top: -200px; width: 700px; height: 2400px; transform: rotate(14deg);
        background: linear-gradient(90deg, rgba(255, 154, 60, 0) 0%, rgba(255, 154, 60, 0.13) 50%, rgba(255, 154, 60, 0) 100%); }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0">${BOKEH}</div>
${hosts}
${fs.existsSync("compositions/ambiente.html") ? `      <div id="el-ambiente" class="scene" data-composition-id="ambiente" data-composition-src="compositions/ambiente.html" data-start="0" data-duration="${DUR}" data-track-index="4" data-track-kind="graphics"></div>
` : ""}      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="0" data-duration="${Math.min(DUR, BGM)}" data-track-index="31" data-volume="0.22"></audio>\n` : ""}${sfxTags}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      (function () {
        const tl = gsap.timeline({ paused: true });
        const DUR = ${DUR};
        // la ciudad pasa: dos capas de bokeh a distinta velocidad, en loop de 1080 px
        [["#bk1", 7.0], ["#bk2", 3.6]].forEach(([s, per]) =>
          tl.fromTo(s, { x: 0 }, { x: -1080, duration: per, ease: "none", repeat: Math.ceil(DUR / per) }, 0));
        // farolas: una franja ámbar que barre cada ~3.2 s (se apaga cuando entra Scalerics)
        tl.fromTo("#fondo .farola", { x: 0 }, { x: 2200, duration: 3.2, ease: "power1.in", repeat: Math.floor(${FAROLA_FIN} / 3.2) }, 0.4);
        tl.to("#fondo .bk, #fondo .farola", { opacity: 0.25, duration: 0.6 }, ${FAROLA_FIN});
        window.__timelines["main"] = tl;
      })();
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", index);
console.log(`index: ${ESCENAS.length} escenas, ${sfx.length} efectos; subtítulos: ${CORTES.length} grupos`);
