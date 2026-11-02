// compositions/ambiente.html y assets/set.svg: set de filmación (luces de set a los costados, piso
// con marcas de cinta amarilla, cables), cinta "SILENCIO · RODANDO" arriba, REC + número de toma,
// esquinas de visor. Con Scalerics (45.99 a 58.45) el REC pasa a PAUSA.
// Uso (desde reels/toma-catorce): node partes/escenas/ambiente.mjs
import fs from "node:fs";
import { COL } from "./comun.mjs";
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([0-9.]+)/)[1]);
// fondo fijo
let set = "";
// pared del estudio: paneles verticales
for (let x = 0; x < 1080; x += 135) set += `<rect x="${x}" y="0" width="135" height="1500" fill="none" stroke="#ffffff" stroke-opacity="0.025" stroke-width="3" />`;
// piso
set += `<path d="M0 1500 L1080 1500 L1080 1920 L0 1920 Z" fill="#000" opacity="0.28" />`;
set += `<path d="M0 1500 L1080 1500" stroke="${COL.ambar}" stroke-opacity="0.15" stroke-width="4" />`;
// marcas de cinta en el piso (X y T)
[[180, 1600], [900, 1620]].forEach(([x, y]) => { set += `<path d="M${x - 40} ${y - 18} L${x + 40} ${y + 18} M${x - 40} ${y + 18} L${x + 40} ${y - 18}" stroke="${COL.ama}" stroke-opacity="0.35" stroke-width="12" />`; });
// cables
set += `<path d="M-20 1700 C200 1640 300 1760 520 1700 S860 1660 1100 1720" fill="none" stroke="#000" stroke-opacity="0.5" stroke-width="10" />`;
// luces de pie a los costados con su haz
const pie = (x, dir) => `<g transform="translate(${x} 560) scale(${dir} 1)">
  <path d="M60 0 L700 -120 L700 520 L60 70 Z" fill="${COL.ambar}" opacity="0.05" />
  <path d="M0 40 L0 1460 M0 1460 L-60 1520 M0 1460 L60 1520" stroke="${COL.acero}" stroke-opacity="0.55" stroke-width="10" />
  <rect x="-50" y="-30" width="90" height="100" rx="12" fill="${COL.ink}" stroke="${COL.acero}" stroke-width="6" />
  <ellipse cx="44" cy="20" rx="12" ry="44" fill="${COL.ama}" opacity="0.7" /></g>`;
set += pie(40, 1) + pie(1040, -1);
fs.writeFileSync("assets/set.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">${set}</svg>`);

const TOMAS = [[0, "14"], [15.55, "15"], [26.8, "16"], [58.45, "17"]];
const PAUSA = [45.99, 58.45];
const cinta = Array(8).fill("SILENCIO · RODANDO ·").join(" ");
const L = 46;
const esq = [[44, 470, 1, 1], [1036, 470, -1, 1], [44, 1690, 1, -1], [1036, 1690, -1, -1]]
  .map(([x, y, sx, sy]) => `<path d="M${x} ${y + sy * L} L${x} ${y} L${x + sx * L} ${y}" fill="none" stroke="${COL.blanco}" stroke-width="4" opacity="0.45" />`).join("");
const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .am-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="ambiente"] .am-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 720px 1100px at 540px 980px, rgba(11, 11, 14, 0) 55%, rgba(11, 11, 14, 0.8) 100%); }
    [data-composition-id="ambiente"] .am-cinta { position: absolute; left: -40px; top: 34px; width: 1180px; height: 58px; background: ${COL.ama}; border-top: 4px solid ${COL.ink}; border-bottom: 4px solid ${COL.ink}; transform: rotate(-2deg); overflow: hidden; box-shadow: 0 8px 0 rgba(0,0,0,0.35); }
    [data-composition-id="ambiente"] .am-cinta span { position: absolute; left: 0; top: 9px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; letter-spacing: 0.08em; color: ${COL.ink}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-rec { position: absolute; right: 60px; top: 132px; display: flex; align-items: center; gap: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.08em; color: ${COL.blanco}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-punto { width: 24px; height: 24px; border-radius: 50%; background: ${COL.rojo}; }
    [data-composition-id="ambiente"] .am-pausa { position: absolute; right: 60px; top: 132px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.08em; color: ${COL.verde}; white-space: nowrap; opacity: 0; }
    [data-composition-id="ambiente"] .am-toma { position: relative; display: inline-block; width: 150px; height: 40px; }
    [data-composition-id="ambiente"] .am-toma b { position: absolute; left: 0; top: 0; font-weight: 600; color: ${COL.ama}; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="am-vineta"></div>
      <svg viewBox="0 0 1080 1920" aria-hidden="true" data-layout-ignore>${esq}</svg>
      <div class="am-cinta" data-layout-ignore><span data-layout-ignore>${cinta}</span></div>
      <div class="am-rec"><span class="am-punto"></span>REC<span class="am-toma">${TOMAS.map(([, t], i) => `<b class="am-t${i}">TOMA ${t}</b>`).join("")}</span></div>
      <div class="am-pausa">II PAUSA</div>
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
      // la cinta se desliza despacio
      tl.fromTo(q(".am-cinta span"), { x: 0 }, { x: -380, duration: DUR, ease: "none" }, 0);
      // REC titila
      tl.fromTo(q(".am-punto"), { opacity: 1 }, { opacity: 0.15, duration: 0.5, yoyo: true, repeat: Math.round(DUR / 0.5), ease: "steps(1)", immediateRender: false }, 0);
      // número de toma
      const T = ${JSON.stringify(TOMAS.map(([t]) => t))};
      T.forEach((t, i) => {
        if (i > 0) tl.fromTo(q(".am-t" + i), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, t);
        if (i + 1 < T.length) tl.to(q(".am-t" + i), { opacity: 0, y: 20, duration: 0.15 }, T[i + 1] - 0.05);
      });
      gsap.set(q(".am-t0"), { opacity: 1 });
      // con Scalerics: REC en pausa
      tl.to(q(".am-rec"), { opacity: 0, duration: 0.2 }, ${PAUSA[0]});
      tl.to(q(".am-pausa"), { opacity: 1, duration: 0.2 }, ${PAUSA[0]});
      tl.to(q(".am-pausa"), { opacity: 0, duration: 0.2 }, ${PAUSA[1]});
      tl.to(q(".am-rec"), { opacity: 1, duration: 0.2 }, ${PAUSA[1]});
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR);
