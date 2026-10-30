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

// el-podcast: ambiente.html lee la duración total y los momentos clave de assets/momentos.js
fs.writeFileSync("assets/momentos.js", `window.PODM = ${JSON.stringify({ DUR, ...(reel.momentos ? Object.fromEntries(Object.entries(reel.momentos).map(([k, i]) => [k, r2(palabras[i].start)])) : {}), voces: (reel.voces ?? []).map(([i, v]) => [i === 0 ? 0 : r2(palabras[i].start - 0.12), v]) })};\n`);
if (fs.existsSync("compositions/ambiente.html")) fs.writeFileSync("compositions/ambiente.html", fs.readFileSync("compositions/ambiente.html", "utf8").replace(/data-duration="[\d.]+"/g, `data-duration="${DUR}"`));
// el-podcast: arriba de cada grupo de subtítulos va el nombre de quien habla, como en el chat de
// un stream (reel.voces: [[índice de palabra, clase]]; s Sofi, n Nacho, d el dueño, o Scalerics)
const vozDe = (i) => (reel.voces ?? [[0, "s"]]).filter(([d]) => d <= i).at(-1)[1];
const QUIEN = { s: "SOFI", n: "NACHO", d: "AUDIO DE UN OYENTE · DON", o: "SCALERICS" };

const inicio = (i) => (i === 0 ? 0 : r2(palabras[i].start));
const TODAS = reel.escenas.map(([id, i], k) => [id, inicio(i), k + 1 < reel.escenas.length ? inicio(reel.escenas[k + 1][1]) : DUR]);
export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));
const CORTES = reel.cortes;
const ACENTO = new Set(reel.acento);

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
  grupos += `    <div id="${id}" class="grupo clip" data-start="${ini}" data-duration="${r2(fin - ini)}" data-track-index="0"><div class="quien q-${v}"><span class="q-pt"></span>${QUIEN[v]}</div><p>${spans}</p></div>\n`;
  anim += `      ["${id}", ${ini}, ${r2(fin - ini)}],\n`;
});

const subtitulos = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; pointer-events: none; }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    [data-composition-id="subtitulos"] .grupo { position: absolute; left: 72px; top: 262px; width: 936px; }
    [data-composition-id="subtitulos"] p { margin: 0; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 52px; line-height: 1.22; letter-spacing: -0.005em; color: #f4ead6; text-shadow: 0 4px 0 #0e0d10; }
    [data-composition-id="subtitulos"] .quien { position: absolute; left: 0; top: -58px; display: flex; align-items: center; gap: 12px; padding: 7px 18px 6px 14px; border-radius: 22px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.16em; color: #0e0d10; white-space: nowrap; }
    [data-composition-id="subtitulos"] .q-pt { width: 14px; height: 14px; border-radius: 50%; background: #0e0d10; }
    [data-composition-id="subtitulos"] .q-s { background: #ff6a13; }
    [data-composition-id="subtitulos"] .q-n { background: #ffc53d; }
    [data-composition-id="subtitulos"] .q-d { background: #ff2d55; color: #f4ead6; }
    [data-composition-id="subtitulos"] .q-d .q-pt { background: #f4ead6; }
    [data-composition-id="subtitulos"] .q-o { background: #f4ead6; }
    [data-composition-id="subtitulos"] .w { display: inline-block; opacity: 0; }
    [data-composition-id="subtitulos"] .w.ac { color: #ff6a13; }
    [data-composition-id="subtitulos"] .w.ac-s { color: #ff6a13; }
    [data-composition-id="subtitulos"] .w.ac-n { color: #ffc53d; }
    [data-composition-id="subtitulos"] .w.ac-d { color: #ff5a78; }
    [data-composition-id="subtitulos"] .w.ac-o { color: #ff6a13; }
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0e0d10; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0e0d10; }
      /* el-podcast: estudio a oscuras con paneles de espuma acústica y el brillo naranja del cartel */
      #fondo { position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 640px 620px at 540px 900px, rgba(255, 106, 19, 0.16) 0%, rgba(255, 106, 19, 0.05) 50%, rgba(255, 106, 19, 0) 78%),
          radial-gradient(ellipse 520px 300px at 540px 1480px, rgba(255, 197, 61, 0.06) 0%, rgba(255, 197, 61, 0) 75%),
          repeating-linear-gradient(90deg, rgba(244, 234, 214, 0.028) 0px, rgba(244, 234, 214, 0.028) 4px, rgba(0, 0, 0, 0) 4px, rgba(0, 0, 0, 0) 60px),
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0px, rgba(0, 0, 0, 0.18) 30px, rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0) 60px),
          radial-gradient(ellipse 900px 1100px at 540px 900px, #221d22 0%, #161317 50%, #0e0d10 85%); }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
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
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="0" data-duration="${Math.min(DUR, 79.9)}" data-track-index="31" data-volume="0.18"></audio>\n` : ""}${sfxTags}
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
