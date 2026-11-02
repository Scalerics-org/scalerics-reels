// Escribe compositions/campo.html (el campo de entrenamiento, DETRÁS de las escenas) y
// compositions/ambiente.html (barra del programa con el puntaje de obediencia y la noche, ENCIMA).
// Correr desde reels/el-adiestrador después de `node armar.mjs` (toma la duración de tiempos.md).
import fs from "node:fs";
import { C, cono, valla } from "./lib.mjs";
const { tinta, nar, tiza } = C;
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([\d.]+)/)[1]);
// tiempos globales (de la locución)
const CERO = 24.43, NOCHE = 26.2, DIA = 34.1, DIEZ = 64.27;

const fuentes = `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }`;
const cierre = (id) => `
      window.__timelines = window.__timelines || {};
      window.__timelines["${id}"] = tl;
    })();
  </script>
</template>
`;

// ---------------------------------------------------------------- campo
// franjas de pasto cortado en perspectiva (fuga en 540, 1150)
const franjas = Array.from({ length: 9 }, (_, i) => {
  const a = -1400 + i * 400, b = a + 200;
  return `<path d="M540 1152 L${a} 1920 L${b} 1920 Z" fill="${tiza}" opacity="0.05" />`;
}).join("");
const nubes = [[170, 520, 1], [760, 470, 0.8], [1180, 560, 0.9]].map(([x, y, s], i) =>
  `<g class="cam-nube cam-n${i}" transform="translate(${x} ${y}) scale(${s})"><path d="M-90 20 C-110 20 -110 -14 -80 -14 C-76 -44 -30 -50 -14 -30 C0 -60 56 -56 60 -20 C96 -24 104 20 74 20 Z" fill="${tiza}" opacity="0.35" /></g>`).join("");
const campo = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${fuentes}
    [data-composition-id="campo"] .cam-capa { position: absolute; inset: 0; }
    [data-composition-id="campo"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
  </style>
  <div id="root" data-composition-id="campo" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="cam-escena" class="cam-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
        ${nubes}
        <!-- árboles lejanos y la valla del fondo -->
        <path d="M-20 1152 C20 1100 60 1110 90 1090 C130 1060 170 1090 200 1100 C240 1070 290 1080 320 1110 L320 1152 Z M700 1152 L700 1110 C740 1080 780 1070 820 1095 C860 1060 920 1070 950 1100 C990 1080 1040 1090 1100 1120 L1100 1152 Z" fill="${C.pasto2}" opacity="0.9" />
        <path d="M0 1132 H1080 M0 1150 H1080" stroke="${tiza}" stroke-width="4" opacity="0.55" />
        ${Array.from({ length: 28 }, (_, i) => `<path d="M${i * 40} 1124 V1152" stroke="${tiza}" stroke-width="4" opacity="0.55" />`).join("")}
        ${franjas}
        <!-- líneas de tiza del campo -->
        <path d="M540 1152 L540 1920" stroke="${tiza}" stroke-width="8" opacity="0.4" />
        <ellipse cx="540" cy="1420" rx="460" ry="120" fill="none" stroke="${tiza}" stroke-width="7" opacity="0.32" />
        <path d="M120 1260 L960 1260" stroke="${tiza}" stroke-width="5" opacity="0.25" />
        <!-- conos y vallas del circuito, en los bordes de abajo -->
        <g class="cam-cosas">
          ${cono(80, 1640, 0.8)}${cono(1000, 1640, 0.8)}
          ${cono(210, 1560, 0.5)}${cono(870, 1560, 0.5)}
          ${valla(250, 1700, 170, 0.75)}${valla(700, 1700, 170, 0.75)}
          ${cono(330, 1180, 0.3)}${cono(430, 1180, 0.3)}${cono(650, 1180, 0.3)}${cono(750, 1180, 0.3)}
        </g>
        <!-- el plato del perro -->
        <g transform="translate(540 1600)"><ellipse cx="0" cy="0" rx="60" ry="16" fill="${nar}" stroke="${tinta}" stroke-width="4" /><path d="M-60 0 L-48 26 H48 L60 0" fill="${nar}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" /></g>
      </svg>
    </div>
  </div>
  <script>
    (function () {
      const ID = "campo";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      // las nubes cruzan lento
      tl.fromTo(q(".cam-n0"), { x: 0 }, { x: 260, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".cam-n1"), { x: 0 }, { x: 180, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".cam-n2"), { x: 0 }, { x: -300, duration: DUR, ease: "none" }, 0);
${cierre("campo")}`;

// ---------------------------------------------------------------- ambiente
const estrellas = [[610, 470], [700, 540], [820, 455], [1010, 610], [560, 600], [960, 470], [880, 640]]
  .map(([x, y], i) => `<path class="amb-est" d="M${x} ${y - 12} L${x + 4} ${y - 4} L${x + 12} ${y} L${x + 4} ${y + 4} L${x} ${y + 12} L${x - 4} ${y + 4} L${x - 12} ${y} L${x - 4} ${y - 4} Z" fill="${tiza}" opacity="${0.6 + (i % 3) * 0.13}" />`).join("");
const ambiente = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${fuentes}
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="ambiente"] .amb-noche { position: absolute; inset: 0; opacity: 0; background: linear-gradient(180deg, rgba(8, 22, 48, 0.82) 0%, rgba(8, 22, 48, 0.55) 55%, rgba(8, 22, 48, 0.62) 100%); }
    /* barra del programa */
    [data-composition-id="ambiente"] .amb-barra { position: absolute; left: 50px; top: 116px; height: 76px; display: flex; white-space: nowrap; border-radius: 12px; overflow: hidden; border: 3px solid ${tinta}; box-shadow: 6px 6px 0 rgba(13, 44, 84, 0.55); }
    [data-composition-id="ambiente"] .amb-barra > div { display: flex; align-items: center; padding: 0 18px; font-family: "Lexend", sans-serif; font-weight: 800; text-transform: uppercase; font-size: 27px; letter-spacing: 0.03em; }
    [data-composition-id="ambiente"] .amb-vivo { background: ${tinta}; color: ${tiza}; gap: 10px; }
    [data-composition-id="ambiente"] .amb-punto { width: 14px; height: 14px; border-radius: 50%; background: ${nar}; }
    [data-composition-id="ambiente"] .amb-prog { background: ${nar}; color: ${tinta}; }
    [data-composition-id="ambiente"] .amb-con { background: ${tiza}; color: ${tinta}; }
    [data-composition-id="ambiente"] .amb-pts { background: ${tinta}; color: ${tiza}; gap: 10px; position: relative; }
    [data-composition-id="ambiente"] .amb-pts small { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; letter-spacing: 0.1em; opacity: 0.85; }
    [data-composition-id="ambiente"] .amb-n { display: inline-block; min-width: 56px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; }
    [data-composition-id="ambiente"] .amb-n2, [data-composition-id="ambiente"] .amb-n3 { position: absolute; right: 18px; top: 19px; opacity: 0; }
    [data-composition-id="ambiente"] .amb-n2 { color: ${nar}; }
    [data-composition-id="ambiente"] .amb-n3 { color: ${C.verde}; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-noche"></div>
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="amb-cielo" opacity="0">
          <g class="amb-luna"><circle cx="930" cy="530" r="62" fill="${tiza}" /><circle cx="958" cy="512" r="58" fill="#1a3a6a" /></g>
          ${estrellas}
        </g>
      </svg>
      <div class="amb-barra">
        <div class="amb-vivo"><span class="amb-punto"></span><span>En vivo</span></div>
        <div class="amb-prog"><span>¡Sentado, dueño!</span></div>
        <div class="amb-con"><span>con Tito</span></div>
        <div class="amb-pts"><small>OBEDIENCIA</small><span class="amb-n amb-n1">?</span><span class="amb-n amb-n2">0</span><span class="amb-n amb-n3">10</span></div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const CERO = ${CERO}, NOCHE = ${NOCHE}, DIA = ${DIA}, DIEZ = ${DIEZ};
      // la barra entra en el primer segundo
      tl.fromTo(q(".amb-barra"), { x: -1100 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      tl.to(q(".amb-punto"), { opacity: 0.2, duration: 0.5, yoyo: true, repeat: Math.floor(DUR / 0.5) - 1, ease: "steps(1)" }, 0);
      // el puntaje de obediencia: ? -> 0 -> 10
      tl.to(q(".amb-n1"), { opacity: 0, duration: 0.1 }, CERO);
      tl.fromTo(q(".amb-n2"), { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in" }, CERO);
      tl.to(q(".amb-barra"), { x: 10, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, CERO + 0.15);
      tl.to(q(".amb-n2"), { opacity: 0, duration: 0.1 }, DIEZ);
      tl.fromTo(q(".amb-n3"), { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in" }, DIEZ);
      tl.to(q(".amb-pts"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 3 }, DIEZ + 0.2);
      // la noche: se oscurece el campo, sale la luna; vuelve el día en el giro
      tl.to(q(".amb-noche"), { opacity: 1, duration: 0.6, ease: "power2.inOut" }, NOCHE);
      tl.to(q(".amb-cielo"), { opacity: 1, duration: 0.6 }, NOCHE + 0.2);
      tl.fromTo(q(".amb-luna"), { y: 120 }, { y: 0, duration: 1.2, ease: "power2.out" }, NOCHE + 0.2);
      qa(".amb-est").forEach((e, i) => tl.to(e, { opacity: 0.25, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut" }, NOCHE + 0.6 + i * 0.17));
      tl.to(q(".amb-noche"), { opacity: 0, duration: 0.5, ease: "power2.inOut" }, DIA);
      tl.to(q(".amb-cielo"), { opacity: 0, duration: 0.4 }, DIA);
${cierre("ambiente")}`;

fs.writeFileSync("compositions/campo.html", campo);
fs.writeFileSync("compositions/ambiente.html", ambiente);
console.log("campo y ambiente escritos, DUR", DUR);
