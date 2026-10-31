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
// el-late-night: el acento de los subtítulos tiene el color de quien habla
// (reel.voces: [[índice de palabra, clase]]; n Nico el conductor, a agente de IA, o Scalerics)
const vozDe = (i) => (reel.voces ?? [[0, "n"]]).filter(([d]) => d <= i).at(-1)[1];

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
    [data-composition-id="subtitulos"] p { color: #fff1dc; text-shadow: 0 3px 0 rgba(4, 8, 26, 0.8); }
    [data-composition-id="subtitulos"] .w.ac { color: #ffb547; }
    [data-composition-id="subtitulos"] .w.ac-n { color: #ffb547; }
    [data-composition-id="subtitulos"] .w.ac-a { color: #5ce611; }
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

// ---------- fondo: skyline nocturno del set (ciudad genérica, determinista) ----------
const SKYLINE = (() => {
  let semilla = 7, out = "";
  const rnd = () => ((semilla = (semilla * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  // estrellas
  for (let i = 0; i < 46; i++) out += `<circle cx="${Math.round(rnd() * 1080)}" cy="${Math.round(480 + rnd() * 520)}" r="${(1.5 + rnd() * 2).toFixed(1)}" fill="#fff1dc" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}" />`;
  // luna
  out += `<circle cx="860" cy="640" r="62" fill="#fff1dc" opacity="0.16" /><circle cx="860" cy="640" r="46" fill="#fff1dc" opacity="0.22" />`;
  // dos filas de edificios: atrás más oscuros, adelante con ventanas ámbar
  for (const [fila, base, minH, maxH, fill, op] of [[0, 1500, 260, 560, "#0c1840", 0.9], [1, 1500, 120, 380, "#101e4c", 1]]) {
    let x = -20 + fila * 30;
    while (x < 1100) {
      const w = 70 + Math.round(rnd() * 90), h = minH + Math.round(rnd() * (maxH - minH)), y = base - h;
      out += `<rect x="${x}" y="${y}" width="${w}" height="${h + 10}" fill="${fill}" stroke="#1f3170" stroke-width="3" opacity="${op}" />`;
      if (fila === 0 && rnd() > 0.6) out += `<path d="M${x + w / 2} ${y} V${y - 40}" stroke="#1f3170" stroke-width="4" /><circle cx="${x + w / 2}" cy="${y - 44}" r="5" fill="#ff3d6e" opacity="0.8" />`;
      for (let wy = y + 24; wy < base - 20; wy += 34) for (let wx = x + 14; wx < x + w - 18; wx += 26)
        if (rnd() > (fila ? 0.55 : 0.75)) out += `<rect x="${wx}" y="${wy}" width="12" height="16" fill="#ffb547" opacity="${(fila ? 0.22 : 0.12) + rnd() * 0.25}" />`;
      x += w + 6 + Math.round(rnd() * 14);
    }
  }
  // marco del ventanal del set y piso de madera
  out += `<path d="M0 1500 H1080" stroke="#ffb547" stroke-width="6" opacity="0.5" />`;
  for (let k = 0; k < 9; k++) out += `<path d="M${-200 + k * 180} 1920 L${140 + k * 100} 1506" stroke="#3a2216" stroke-width="4" opacity="0.8" />`;
  return `<svg viewBox="0 0 1080 1920" aria-hidden="true">${out}</svg>`;
})();

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
for (const [, a] of ESCENAS.slice(1)) sfx.push({ t: r2(a - 0.15), name: "whoosh-short", vol: 0.16 });
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #050a1f; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #050a1f; }
      #fondo { position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 700px 260px at 540px 1500px, rgba(255, 181, 71, 0.20) 0%, rgba(255, 181, 71, 0) 75%),
          linear-gradient(180deg, #050a1f 0%, #0a1434 45%, #13214f 72%, #0a1434 78%, #22140e 79%, #170d0a 100%); }
      #fondo svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0">${SKYLINE}</div>
${hosts}
${fs.existsSync("compositions/ambiente.html") ? `      <div id="el-ambiente" class="scene" data-composition-id="ambiente" data-composition-src="compositions/ambiente.html" data-start="0" data-duration="${DUR}" data-track-index="4" data-track-kind="graphics"></div>
` : ""}      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/escenario.mp3") ? `      <audio id="bgm" src="assets/bgm/escenario.mp3" data-start="0" data-duration="${DUR}" data-track-index="31" data-volume="0.5"></audio>\n` : ""}${sfxTags}
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
