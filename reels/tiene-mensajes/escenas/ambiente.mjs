// Escribe compositions/ambiente.html: el mostrador, el cable del teléfono, la lámpara y la barra
// del contestador con el número del mensaje. Correr desde reels/tiene-mensajes después de armar.mjs.
import fs from "node:fs";
import { C, postit } from "./lib.mjs";
const { noche, madera, beige, crema, rojo, am, verde, lcd } = C;
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([\d.]+)/)[1]);
// [texto del display, t]
const NUM = [["14", 0], ["01", 5.18], ["02", 19.12], ["03", 28.47], ["04", 40.73],
  ["05", 47.64], ["06", 47.7], ["07", 47.76], ["08", 47.82], ["09", 47.88], ["10", 47.94], ["11", 48.0], ["12", 48.06], ["13", 48.12], ["14", 48.2],
  ["--", 57.05], ["00", 68.9]];
const VERDE = 60.91;
const unicos = [...new Set(NUM.map((n) => n[0]))];
const vetas = Array.from({ length: 7 }, (_, i) => `<path d="M-20 ${1620 + i * 46} C 300 ${1606 + i * 46 + (i % 2 ? 14 : -10)}, 700 ${1640 + i * 46 + (i % 3 ? -12 : 10)}, 1100 ${1618 + i * 46}" stroke="${noche}" stroke-width="${i % 2 ? 3 : 2}" fill="none" opacity="0.35" />`).join("");
// cable en espiral: rulos a lo largo de una curva
let cable = "M560 1930";
for (let i = 0; i < 24; i++) { cable += ` c 10 -26 26 -26 22 0 c -3 14 -10 14 -8 -9`; }
const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="ambiente"] .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 760px 1100px at 540px 900px, rgba(23, 17, 12, 0) 55%, rgba(23, 17, 12, 0.8) 100%); }
    [data-composition-id="ambiente"] .amb-barra { position: absolute; left: 60px; top: 116px; height: 76px; display: flex; align-items: center; gap: 16px; padding: 0 16px 0 22px; white-space: nowrap; border-radius: 14px; background: ${beige}; border: 4px solid ${noche}; box-shadow: 6px 6px 0 rgba(23, 17, 12, 0.6); }
    [data-composition-id="ambiente"] .amb-et { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.18em; color: ${noche}; text-transform: uppercase; }
    [data-composition-id="ambiente"] .amb-luz { width: 18px; height: 18px; border-radius: 50%; background: ${rojo}; border: 3px solid ${noche}; }
    [data-composition-id="ambiente"] .amb-num { position: relative; width: 96px; height: 54px; border-radius: 8px; background: ${lcd}; border: 3px solid ${noche}; }
    [data-composition-id="ambiente"] .amb-num span, [data-composition-id="ambiente"] .amb-hora { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; color: ${rojo}; text-shadow: 0 0 10px rgba(255, 59, 42, 0.6); }
    [data-composition-id="ambiente"] .amb-hbox { position: relative; width: 132px; height: 54px; border-radius: 8px; background: ${lcd}; border: 3px solid ${noche}; }
    [data-composition-id="ambiente"] .amb-hora { font-size: 32px; }
    [data-composition-id="ambiente"] .amb-crm { position: absolute; left: 60px; top: 116px; height: 76px; display: flex; align-items: center; gap: 14px; padding: 0 24px; border-radius: 14px; background: ${verde}; border: 4px solid ${noche}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 30px; letter-spacing: 0.04em; color: ${noche}; text-transform: uppercase; white-space: nowrap; opacity: 0; box-shadow: 6px 6px 0 rgba(23, 17, 12, 0.6); }
    [data-composition-id="ambiente"] .amb-crm i { width: 18px; height: 18px; border-radius: 50%; background: ${noche}; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="amb-cono" d="M300 0 L-160 1580 H860 Z" fill="${am}" opacity="0.045" />
        <!-- el mostrador -->
        <rect x="-20" y="1560" width="1120" height="400" fill="${madera}" />
        <rect x="-20" y="1560" width="1120" height="22" fill="${beige}" opacity="0.35" />
        ${vetas}
        <path d="M-20 1582 H1100" stroke="${noche}" stroke-width="5" />
        <!-- teléfono y cable -->
        <path d="${cable}" stroke="${beige}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9" />
        <g transform="translate(980 1690) rotate(-24)">
          <path d="M-120 -20 C-120 -50 -80 -56 -60 -40 L60 -40 C80 -56 120 -50 120 -20 L110 10 C90 20 70 14 60 -4 L-60 -4 C-70 14 -90 20 -110 10 Z" fill="${beige}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
        </g>
        ${postit("amb-p1", 110, 1640, -8, "llamar!!", { w: 170, size: 34 })}
      </svg>
      <div class="amb-vineta"></div>
      <div class="amb-barra">
        <span class="amb-luz"></span>
        <span class="amb-et">Mensajes</span>
        <div class="amb-num">${unicos.map((u, i) => `<span class="amb-n${i}" style="opacity:${i === 0 ? 1 : 0}">${u}</span>`).join("")}</div>
        <div class="amb-hbox"><span class="amb-hora">23:47</span></div>
      </div>
      <div class="amb-crm"><i></i><span>CRM · al día</span></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      const UNICOS = ${JSON.stringify(unicos)};
      const NUM = ${JSON.stringify(NUM)};
      NUM.forEach(([v, t]) => {
        const k = UNICOS.indexOf(v);
        UNICOS.forEach((_, i) => tl.set(q(".amb-n" + i), { opacity: i === k ? 1 : 0 }, t));
        if (t > 0) tl.fromTo(q(".amb-num"), { scale: 1.18 }, { scale: 1, duration: 0.18, ease: "power2.out", immediateRender: false }, t);
      });
      // la luz titila hasta que entra Scalerics
      tl.fromTo(q(".amb-luz"), { opacity: 1 }, { opacity: 0.15, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: ${Math.floor(VERDE / 0.25) % 2 ? Math.floor(VERDE / 0.25) : Math.floor(VERDE / 0.25) + 1} }, 0);
      tl.fromTo(q(".amb-crm"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ${VERDE});
      tl.to(q(".amb-barra"), { opacity: 0, y: 20, duration: 0.2 }, ${VERDE});
      // la lámpara titila apenas
      tl.fromTo(q(".amb-cono"), { opacity: 0.045 }, { opacity: 0.07, duration: 1.7, yoyo: true, repeat: ${Math.floor(DUR / 1.7) - 1}, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".amb-p1"), { rotation: 0 }, { rotation: 3, svgOrigin: "0 -80", duration: 2.3, yoyo: true, repeat: ${Math.floor(DUR / 2.3) - 1}, ease: "sine.inOut" }, 0);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR);
