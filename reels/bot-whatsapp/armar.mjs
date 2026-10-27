// Arma index.html y compositions/subtitulos.html desde la locución.
// Correr de nuevo después de cambiar escenas, grupos de subtítulos o los .sfx.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const largo = {};
const durArchivo = (n) => (largo[n] ??= Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/sfx/${n}.mp3`).toString()));

const palabras = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const DUR = 62.5;

// Escenas: [id, inicio, fin]
const TODAS = [
  ["s01-domingo", 0, 5.55],
  ["s02-no-es", 5.55, 9.8],
  ["s03-primero", 9.8, 14.02],
  ["s04-billetera", 14.02, 22.24],
  ["s05-se-enfrio", 22.24, 26.84],
  ["s06-cuando-puede", 26.84, 30.07],
  ["s07-en-visto", 30.07, 34.4],
  ["s08-sistema", 34.4, 39.38],
  ["s09-marca", 39.38, 42.22],
  ["s10-como-anda", 42.22, 52.44],
  ["s11-grandes", 52.44, 57.32],
  ["s12-cta", 57.32, DUR],
];

export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));

// Grupos de subtítulos: índice de la primera palabra de cada grupo.
const CORTES = [0, 8, 18, 24, 31, 35, 44, 50, 57, 64, 69, 76, 80, 88, 95, 104, 113, 117, 125, 131, 137, 141, 151, 159, 166];

// Palabras de acento (verde), por índice.
const ACENTO = new Set([
  6, 7, 11, 12, 14, // marcas grandes, dos minutos, domingo
  23, 28, 30, // empleados, noche, suerte
  36, 40, 43, // cliente, primero, contesta
  48, 49, 53, // cuánto sale, billetera
  57, 58, 63, 68, // diez minutos, pasó, otro
  76, 78, // Estaba, enfrió
  84, 86, 87, // chico, cuando puede
  94, 97, 103, // visto, venta, ruido
  110, 116, // pegado, sistema
  120, 122, // bots, WhatsApp
  127, 129, 130, // instante, cualquier hora
  133, 136, 138, 140, // precios, horarios, turnos, pedidos
  147, // vos
  157, 158, 164, 165, // equipos enteros, tu local
  167, // BOT
]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const r2 = (n) => Math.round(n * 100) / 100;

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
      return `<span class="w${ACENTO.has(i) ? " ac" : ""}" data-t="${r2(w.start - ini)}">${esc(w.text)}</span>`;
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
    [data-composition-id="subtitulos"] .w.ac { color: #5ce611; }
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #050a12; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #050a12; }
      #fondo { position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 520px 560px at 540px 900px, rgba(92, 230, 17, 0.085) 0%, rgba(92, 230, 17, 0.03) 45%, rgba(92, 230, 17, 0) 75%),
          radial-gradient(ellipse 900px 1100px at 540px 900px, #0b1d35 0%, #07111f 45%, #050a12 80%); }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1746px; height: 40px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${hosts}
      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="59.69" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed.mp3" data-start="0" data-duration="${DUR}" data-track-index="31" data-volume="0.3"></audio>\n` : ""}${sfxTags}
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
