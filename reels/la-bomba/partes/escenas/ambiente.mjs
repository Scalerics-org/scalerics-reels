// Arma compositions/ambiente.html (correr desde reels/la-bomba, después de node armar.mjs).
// Capa fija arriba de las escenas: linterna que barre el búnker, viñeta, cinta de peligro abajo,
// rótulo "OPERATIVO PLANILLA" y el cronómetro chico arriba a la derecha (en tiempo real).
import fs from "node:fs";
import { seg7, seg7ancho, CRONO_VALS } from "./pj.mjs";

const tiempos = fs.readFileSync("tiempos.md", "utf8");
const DUR = Number(tiempos.match(/Duración total ([0-9.]+)/)[1]);
const g = (id) => Number(tiempos.match(new RegExp(`### ${id} . dura [0-9.]+ s \\(inicio global ([0-9.]+)\\)`))[1]);
const ROJO = g("s06-rojo"), DIEZ = g("s09-diez"), BOOM = g("s11-boom") + 2.2, ORUS = g("s14-medida"), EXPLOTA = g("s15-no-explota") + 4.1;

const H = 46, X = 1008 - seg7ancho("00:00", H), Y = 128;
const vals = CRONO_VALS(0, BOOM);
const grupos = vals.map(([t, txt], i) => seg7(txt, X, Y, H, "#ff2d2d", `amb-cv amb-cv${i}`, 0.12)).join("\n");
const verde = seg7("--:--", X, Y, H, "#5ce611", "amb-cverde", 0.12);

const html = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] .amb-haz { position: absolute; left: 0; top: 0; width: 1400px; height: 1400px; margin: -700px 0 0 -700px; border-radius: 50%; background: radial-gradient(circle, rgba(255, 176, 32, 0.13) 0%, rgba(255, 176, 32, 0.05) 40%, rgba(255, 176, 32, 0) 70%); }
    [data-composition-id="ambiente"] .amb-rojo { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 900px 1200px at 50% 50%, rgba(255, 45, 45, 0) 30%, rgba(255, 45, 45, 0.38) 100%); }
    [data-composition-id="ambiente"] .amb-verde { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 900px 1000px at 50% 52%, rgba(92, 230, 17, 0.14), rgba(92, 230, 17, 0) 72%); }
    [data-composition-id="ambiente"] .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 720px 1080px at 540px 930px, rgba(7, 8, 7, 0) 50%, rgba(7, 8, 7, 0.9) 100%); }
    [data-composition-id="ambiente"] .amb-cinta { position: absolute; left: -40px; top: 1606px; width: 1160px; height: 38px; transform: rotate(-2deg); background: repeating-linear-gradient(-45deg, #ffb020 0 34px, #070807 34px 68px); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6); }
    [data-composition-id="ambiente"] .amb-rot { position: absolute; left: 72px; top: 150px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #ecebe4; white-space: nowrap; }
    [data-composition-id="ambiente"] .amb-punto { display: inline-block; width: 18px; height: 18px; border-radius: 50%; background: #ff2d2d; margin-right: 14px; vertical-align: 1px; }
    [data-composition-id="ambiente"] .amb-ok { position: absolute; left: 72px; top: 150px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #5ce611; white-space: nowrap; opacity: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="ambiente"] .amb-flash { position: absolute; inset: 0; background: #fff4d6; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-haz"></div>
      <div class="amb-rojo"></div>
      <div class="amb-verde"></div>
      <div class="amb-vineta"></div>
      <div class="amb-cinta"></div>
      <div class="amb-rot" data-layout-ignore><span class="amb-punto"></span>OPERATIVO PLANILLA</div>
      <div class="amb-ok" data-layout-ignore>BOMBA DESACTIVADA</div>
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
${grupos}
${verde}
      </svg>
      <div class="amb-flash"></div>
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
      const VALS = ${JSON.stringify(vals.map(([t]) => t))};
      const ROJO = ${ROJO}, DIEZ = ${DIEZ}, BOOM = ${BOOM}, ORUS = ${ORUS}, EXPLOTA = ${EXPLOTA};

      // la linterna barre el búnker (ida y vuelta lenta, determinística)
      const ruta = [[300, 760], [760, 900], [420, 1180], [700, 700], [360, 980], [620, 1120], [540, 900]];
      gsap.set(q(".amb-haz"), { x: ruta[0][0], y: ruta[0][1] });
      let t = 0;
      for (let i = 1; t < DUR; i++) {
        const [x, y] = ruta[i % ruta.length];
        tl.to(q(".amb-haz"), { x, y, duration: 4.5, ease: "sine.inOut" }, t);
        t += 4.5;
      }
      // cronómetro: un grupo por segundo
      gsap.set(qa(".amb-cv"), { opacity: 0 });
      gsap.set(q(".amb-cverde"), { opacity: 0 });
      VALS.forEach((v, i) => {
        tl.set(q(".amb-cv" + i), { opacity: 1 }, v);
        if (i + 1 < VALS.length) tl.set(q(".amb-cv" + i), { opacity: 0 }, VALS[i + 1]);
      });
      tl.set(q(".amb-cv" + (VALS.length - 1)), { opacity: 0 }, BOOM + 0.05);
      tl.to(q(".amb-cverde"), { opacity: 1, duration: 0.3 }, ORUS);
      // el punto rojo titila
      tl.to(q(".amb-punto"), { opacity: 0.2, duration: 0.5, yoyo: true, repeat: Math.floor(BOOM / 0.5) - 1, ease: "steps(1)" }, 0);
      // alarma roja: "se puso todo en rojo" y desde "quedan diez segundos" (cada vez más rápido)
      for (let t = ROJO; t < ROJO + 6; t += 0.8) {
        tl.fromTo(q(".amb-rojo"), { opacity: 0.15 }, { opacity: 0.9, duration: 0.1, ease: "none", immediateRender: false }, t);
        tl.to(q(".amb-rojo"), { opacity: 0, duration: 0.6, ease: "power2.out" }, t + 0.12);
      }
      for (let t = DIEZ, p = 0.7; t < BOOM - 0.2; t += p, p = Math.max(0.3, p * 0.95)) {
        tl.fromTo(q(".amb-rojo"), { opacity: 0.2 }, { opacity: 1, duration: 0.08, ease: "none", immediateRender: false }, t);
        tl.to(q(".amb-rojo"), { opacity: 0, duration: p * 0.8, ease: "power2.out" }, t + 0.1);
      }
      // BOOM: flash blanco, la cinta se cae, el rótulo se apaga
      tl.to(q(".amb-flash"), { opacity: 1, duration: 0.04 }, BOOM);
      tl.to(q(".amb-flash"), { opacity: 0, duration: 1.2, ease: "power2.out" }, BOOM + 0.15);
      tl.to(q(".amb-cinta"), { y: 120, rotation: 8, opacity: 0, duration: 0.8, ease: "power2.in" }, BOOM);
      tl.to(q(".amb-rot"), { opacity: 0, duration: 0.1 }, BOOM);
      tl.to(q(".amb-haz"), { opacity: 0, duration: 0.2 }, BOOM);
      // entra Scalerics: luz verde
      tl.to(q(".amb-verde"), { opacity: 1, duration: 0.5 }, ORUS);
      tl.to(q(".amb-haz"), { opacity: 0.6, duration: 0.5 }, ORUS);
      tl.to(q(".amb-ok"), { opacity: 1, duration: 0.3 }, EXPLOTA);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR, "boom", BOOM, vals.length, "valores");
