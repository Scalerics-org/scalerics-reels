// Genera compositions/ambiente.html: la interfaz de la app de meditación por encima de las escenas.
// Barra de estado (23:00), cabecera "Meditación nocturna" con el medidor de CALMA que baja con cada
// interrupción del dueño, estrellas, ondas suaves abajo, barra de progreso de la sesión y un
// destello rojo en los bordes en cada alarma. Cuando entra Scalerics, la calma sube a 100 % en verde.
// Correr desde reels/respira-hondo: node partes/ambiente.mjs && node armar.mjs
import fs from "node:fs";
import { C } from "./lib.mjs";

const P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([\d.]+)/)[1]);
const t = (i) => Math.round(P[i].start * 100) / 100;
const N = C.noche;
// [palabra donde cambia, valor de calma]
const CALMA = [[null, 92], [5, 71], [26, 48], [57, 36], [61, 27], [78, 18], [87, 9], [94, 3], [101, 0], [136, 64], [146, 100]];
const ALARMAS = [5, 9, 26, 61, 66, 87, 94, 97, 107].map(t);
const SC = t(127); // entra Scalerics

const valores = CALMA.map(([, v], k) => `<span class="am-v am-v${k}${v === 0 ? " am-cero" : ""}${k >= 9 ? " am-ok" : ""}">${v === 0 ? "ERROR" : v + "%"}</span>`).join("");
const estrellas = [[60, 260], [1010, 300], [40, 520], [1040, 560], [70, 900], [1030, 980], [50, 1300], [1035, 1380], [140, 220], [560, 210]]
  .map(([x, y], i) => `<circle class="am-est" cx="${x}" cy="${y}" r="${i % 3 ? 3 : 5}" fill="${C.crema}"/>`).join("");
const onda = (y, k, col, op) => `<path class="am-onda am-o${k}" d="M-300 ${y} q 90 -26 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0" fill="none" stroke="${col}" stroke-width="5" opacity="${op}"/>`;

const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .am-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg.am-svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    /* barra de estado */
    [data-composition-id="ambiente"] .am-estado { position: absolute; left: 60px; right: 60px; top: 34px; height: 44px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; color: ${C.crema}; }
    [data-composition-id="ambiente"] .am-reloj { position: absolute; left: 0; top: 0; }
    [data-composition-id="ambiente"] .am-bat { position: absolute; right: 0; top: 6px; width: 64px; height: 30px; border: 4px solid ${C.crema}; border-radius: 9px; }
    [data-composition-id="ambiente"] .am-bat i { position: absolute; left: 3px; top: 3px; bottom: 3px; width: 14px; border-radius: 3px; background: ${C.rojo}; }
    [data-composition-id="ambiente"] .am-senal { position: absolute; right: 90px; top: 4px; width: 50px; height: 34px; }
    /* cabecera de la app */
    [data-composition-id="ambiente"] .am-cab { position: absolute; left: 60px; right: 60px; top: 112px; height: 90px; }
    [data-composition-id="ambiente"] .am-titulo { position: absolute; left: 0; top: 14px; font-family: "Lexend", sans-serif; font-weight: 500; font-size: 36px; color: ${C.crema}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-titulo svg { width: 52px; height: 40px; vertical-align: -8px; margin-right: 12px; }
    [data-composition-id="ambiente"] .am-calma { position: absolute; right: 0; top: 0; width: 300px; height: 90px; }
    [data-composition-id="ambiente"] .am-calma b { position: absolute; left: 0; top: 4px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.16em; color: ${C.lavc}; }
    [data-composition-id="ambiente"] .am-v { position: absolute; right: 0; top: -4px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: ${C.men}; opacity: 0; }
    [data-composition-id="ambiente"] .am-v.am-cero { color: ${C.rojo}; }
    [data-composition-id="ambiente"] .am-v.am-ok { color: ${C.verde}; }
    [data-composition-id="ambiente"] .am-pista { position: absolute; left: 0; right: 0; top: 56px; height: 14px; border-radius: 7px; background: rgba(201, 184, 255, 0.25); overflow: hidden; }
    [data-composition-id="ambiente"] .am-medidor { position: absolute; left: 0; top: 0; width: 300px; height: 14px; border-radius: 7px; background: ${C.men}; }
    /* barra de la sesión */
    [data-composition-id="ambiente"] .am-ses { position: absolute; left: 90px; right: 90px; top: 1580px; height: 120px; }
    [data-composition-id="ambiente"] .am-ses .am-nom { position: absolute; left: 0; right: 0; top: 0; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.18em; color: ${C.crema}; opacity: 0.85; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-ses .am-barra { position: absolute; left: 0; right: 0; top: 54px; height: 10px; border-radius: 5px; background: rgba(255, 247, 238, 0.3); }
    [data-composition-id="ambiente"] .am-ses .am-prog { position: absolute; left: 0; top: 0; width: 900px; height: 10px; border-radius: 5px; background: ${C.crema}; }
    [data-composition-id="ambiente"] .am-ses .am-t { position: absolute; top: 76px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: ${N}; }
    [data-composition-id="ambiente"] .am-alarma { position: absolute; inset: 0; box-shadow: inset 0 0 160px 40px rgba(255, 71, 87, 0.75); opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg class="am-svg" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="am-estrellas">${estrellas}</g>
        <g class="am-ondas">${onda(1520, 1, C.men, 0.35)}${onda(1548, 2, C.lavc, 0.3)}${onda(1576, 3, C.crema, 0.22)}</g>
      </svg>
      <div class="am-estado"><span class="am-reloj">23:00</span>
        <svg class="am-senal" viewBox="0 0 50 34"><rect x="2" y="24" width="8" height="10" rx="2" fill="${C.crema}"/><rect x="14" y="16" width="8" height="18" rx="2" fill="${C.crema}"/><rect x="26" y="8" width="8" height="26" rx="2" fill="${C.crema}"/><rect x="38" y="0" width="8" height="34" rx="2" fill="${C.crema}" opacity="0.4"/></svg>
        <div class="am-bat"><i></i></div></div>
      <div class="am-cab">
        <div class="am-titulo"><svg viewBox="0 0 52 40"><path d="M26 38 Q14 26 26 4 Q38 26 26 38 Z M26 38 Q6 34 2 16 Q18 18 26 38 Z M26 38 Q46 34 50 16 Q34 18 26 38 Z" fill="${C.lav}" stroke="${C.crema}" stroke-width="2.5" stroke-linejoin="round"/></svg>Meditación nocturna</div>
        <div class="am-calma"><b>CALMA</b>${valores}<div class="am-pista"><div class="am-medidor"></div></div></div>
      </div>
      <div class="am-ses"><div class="am-nom">SESIÓN · DORMIR SIN PENDIENTES</div><div class="am-barra"><div class="am-prog"></div></div>
        <div class="am-t" style="left:0">00:00</div><div class="am-t" style="right:0">10:00</div></div>
      <div class="am-alarma"></div>
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

      // estrellas que titilan, ondas que corren, progreso de la sesión
      qa(".am-est").forEach((e, i) => tl.fromTo(e, { opacity: 0.9 }, { opacity: 0.2, duration: 0.9 + (i % 4) * 0.3, yoyo: true, repeat: Math.floor(DUR / (0.9 + (i % 4) * 0.3)) - 1, ease: "sine.inOut", immediateRender: false }, (i % 5) * 0.2));
      tl.fromTo(q(".am-o1"), { x: 0 }, { x: -180 * 10, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".am-o2"), { x: -180 * 10 }, { x: 0, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".am-o3"), { x: 0 }, { x: -180 * 6, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".am-ondas"), { y: 0 }, { y: -10, duration: 2, yoyo: true, repeat: Math.floor(DUR / 2) - 1, ease: "sine.inOut", immediateRender: false }, 0);
      gsap.set(q(".am-prog"), { scaleX: 0.02, transformOrigin: "0% 50%" });
      tl.to(q(".am-prog"), { scaleX: 0.3, duration: ${t(108)}, ease: "none" }, 0);
      tl.to(q(".am-prog"), { scaleX: 1, background: "${C.verde}", duration: 1.2, ease: "power2.inOut" }, ${t(146)});
      tl.fromTo(q(".am-bat i"), { opacity: 1 }, { opacity: 0.2, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: Math.floor(${SC} / 0.5) - 1, immediateRender: false }, 0);

      // el medidor de calma
      const CALMA = ${JSON.stringify(CALMA.map(([i, v]) => [i === null ? 0 : t(i), v]))};
      CALMA.forEach(([a, v], k) => {
        const el = q(".am-v" + k);
        const fin = k + 1 < CALMA.length ? CALMA[k + 1][0] : DUR;
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, scale: k ? 1.6 : 1 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, a);
        tl.to(el, { opacity: 0, duration: 0.01 }, fin - 0.01);
      });
      gsap.set(q(".am-medidor"), { scaleX: 0.92, transformOrigin: "0% 50%" });
      CALMA.slice(1).forEach(([a, v], k) => tl.to(q(".am-medidor"), { scaleX: Math.max(0.02, v / 100), backgroundColor: v >= 60 && a > ${SC} ? "${C.verde}" : v < 30 ? "${C.rojo}" : v < 60 ? "${C.dur}" : "${C.men}", duration: 0.35, ease: "power2.out" }, a));

      // alarmas: los bordes se ponen rojos
      [${ALARMAS.join(", ")}].forEach((a) => { tl.to(q(".am-alarma"), { opacity: 1, duration: 0.06 }, a); tl.to(q(".am-alarma"), { opacity: 0, duration: 0.7, ease: "power2.out" }, a + 0.1); });

      // entra Scalerics: la sesión se calma
      tl.to(q(".am-nom"), { opacity: 0, duration: 0.3 }, ${SC});
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente listo", DUR);
