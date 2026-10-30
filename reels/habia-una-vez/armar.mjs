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
const ACENTO = new Set(reel.acento);
// habia-una-vez: libro de cuentos. El acento de los subtítulos tiene el color de quien habla y arriba
// de cada grupo va la cinta con su nombre (reel.voces: [[índice de palabra, clase]];
// n cuentacuentos, c Caperucita, l tu local, w el lobo, o Scalerics)
const vozDe = (i) => (reel.voces ?? [[0, "n"]]).filter(([d]) => d <= i).at(-1)[1];
const QUIEN = { n: "LA CUENTACUENTOS", c: "CAPERUCITA", l: "TU LOCAL", w: "EL LOBO · EL DE ENFRENTE", o: "SCALERICS" };

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
  const v = vozDe(desde);
  grupos += `    <div id="${id}" class="grupo clip" data-start="${ini}" data-duration="${r2(fin - ini)}" data-track-index="0"><div class="quien q-${v}">${QUIEN[v]}</div><p>${spans}</p></div>\n`;
  anim += `      ["${id}", ${ini}, ${r2(fin - ini)}],\n`;
});

const subtitulos = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
    @font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; pointer-events: none; }
    [data-composition-id="subtitulos"] .grupo { position: absolute; left: 80px; top: 250px; width: 920px; }
    [data-composition-id="subtitulos"] p { margin: 0; font-family: "Cormorant Garamond", serif; font-weight: 600; font-size: 66px; line-height: 1.08; letter-spacing: 0; color: #2e2a3b; }
    [data-composition-id="subtitulos"] .w { display: inline-block; opacity: 0; }
    [data-composition-id="subtitulos"] .quien { position: absolute; left: 0; top: -60px; padding: 7px 18px 5px; font-family: "Cinzel", serif; font-weight: 700; font-size: 24px; letter-spacing: 0.18em; color: #f6ecd6; white-space: nowrap; clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%); padding-right: 34px; }
    [data-composition-id="subtitulos"] .q-n { background: #2e2a3b; }
    [data-composition-id="subtitulos"] .q-c { background: #c0392b; }
    [data-composition-id="subtitulos"] .q-l { background: #8a7a5c; }
    [data-composition-id="subtitulos"] .q-w { background: #5d6577; }
    [data-composition-id="subtitulos"] .q-o { background: #4f7a4a; }
    [data-composition-id="subtitulos"] .w.ac { color: #b4521f; }
    [data-composition-id="subtitulos"] .w.ac-c { color: #c0392b; }
    [data-composition-id="subtitulos"] .w.ac-l { color: #8a6a2e; }
    [data-composition-id="subtitulos"] .w.ac-w { color: #4a5568; }
    [data-composition-id="subtitulos"] .w.ac-o { color: #3f6b3a; }
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
        const qn = el.querySelector(".quien");
        tl.fromTo(qn, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, ini);
        tl.to(qn, { opacity: 0, duration: 0.2 }, ini + dur - 0.2);
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

const BGM = fs.existsSync("assets/bgm/bed.mp3") ? Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/bgm/bed.mp3").toString()) : 0;
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #f1e3c4; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #f1e3c4; }
      #fondo { position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 560px 420px at 300px 1500px, rgba(79, 122, 74, 0.08) 0%, rgba(79, 122, 74, 0) 75%),
          radial-gradient(ellipse 520px 380px at 820px 640px, rgba(212, 154, 42, 0.08) 0%, rgba(212, 154, 42, 0) 75%),
          radial-gradient(ellipse 900px 1150px at 540px 900px, #f8efdb 0%, #f3e6c9 55%, #e2cc9f 92%, #d4b985 100%); }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.78; z-index: 50; filter: brightness(0.18) sepia(0.6); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${hosts}
${fs.existsSync("compositions/ambiente.html") ? `      <div id="el-ambiente" class="scene" data-composition-id="ambiente" data-composition-src="compositions/ambiente.html" data-start="0" data-duration="${DUR}" data-track-index="4" data-track-kind="graphics"></div>
` : ""}      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="0" data-duration="${Math.min(DUR, BGM - 0.1)}" data-track-index="31" data-volume="0.2"></audio>\n` : ""}${sfxTags}
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
