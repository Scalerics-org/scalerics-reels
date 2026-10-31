// compositions/ambiente.html: corcho, banderines de PARO arriba, chinches y zócalo de noticiero.
// Uso (desde reels/paro-de-post-its): node partes/escenas/ambiente.mjs
import fs from "node:fs";
import { COL } from "./comun.mjs";
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([0-9.]+)/)[1]);
let s = 7;
const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
// motas del corcho
let motas = "";
for (let i = 0; i < 520; i++) {
  const x = Math.round(rnd() * 1080), y = Math.round(rnd() * 1920), r = (1.5 + rnd() * 4).toFixed(1);
  const c = rnd() < 0.55 ? "#2a190c" : "#c9935e";
  motas += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${(0.18 + rnd() * 0.3).toFixed(2)}" />`;
}
// banderines
const letras = "PARO·EN·LA·CAJA".split("");
const cols = [COL.y, COL.r, COL.c, COL.carton];
let band = "";
const n = letras.length, paso = 1080 / n;
letras.forEach((l, i) => {
  const x = paso * i + paso / 2, y = 64 + Math.sin((i / (n - 1)) * Math.PI) * 26;
  band += `<g class="am-b" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><path d="M-32 0 L32 0 L0 92 Z" fill="${cols[i % 4]}" stroke="${COL.ink}" stroke-width="4" stroke-linejoin="round" />${l === "·" ? "" : `<text x="0" y="46" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="44" fill="${COL.ink}">${l}</text>`}</g>`;
});
const chinche = (x, y, c) => `<g transform="translate(${x} ${y})"><ellipse cx="4" cy="8" rx="16" ry="10" fill="#000" opacity="0.3" /><circle r="15" fill="${c}" stroke="${COL.ink}" stroke-width="4" /><circle cx="-5" cy="-5" r="4" fill="${COL.papel}" opacity="0.7" /></g>`;
fs.writeFileSync("assets/corcho.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">${motas}</svg>`);
const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .am-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="ambiente"] .am-zocalo { position: absolute; left: 48px; top: 1588px; display: flex; align-items: stretch; height: 64px; }
    [data-composition-id="ambiente"] .am-vivo { display: flex; align-items: center; gap: 12px; padding: 0 20px 0 16px; background: ${COL.rojo}; border: 4px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 28px; color: ${COL.papel}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-punto { width: 16px; height: 16px; border-radius: 50%; background: ${COL.papel}; }
    [data-composition-id="ambiente"] .am-tira { position: relative; width: 680px; background: ${COL.papel}; border: 4px solid ${COL.ink}; border-left: 0; overflow: hidden; }
    [data-composition-id="ambiente"] .am-tira span { position: absolute; left: 20px; top: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.06em; color: ${COL.ink}; white-space: nowrap; opacity: 0; }
    [data-composition-id="ambiente"] .am-oscuro { position: absolute; inset: 0; background: #0d0704; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true" data-layout-ignore>
        <path d="M0 60 Q540 120 1080 60" fill="none" stroke="${COL.ink}" stroke-width="4" />
        <g class="am-band">${band}</g>
        ${chinche(40, 250, COL.rojo)}${chinche(1040, 262, COL.c)}${chinche(36, 1540, COL.y)}${chinche(1046, 1560, COL.r)}
      </svg>
      <div class="am-oscuro"></div>
      <div class="am-zocalo">
        <div class="am-vivo"><span class="am-punto"></span>EN VIVO</div>
        <div class="am-tira">
          <span class="am-t0">TOMA DE LA CAJA REGISTRADORA</span>
          <span class="am-t1">PLATAFORMA DE RECLAMOS</span>
          <span class="am-t2">ÚLTIMO MOMENTO: SE CAYÓ UNO</span>
          <span class="am-t3">EL DUEÑO QUIERE NEGOCIAR</span>
          <span class="am-t4">LOS POST-ITS PIDEN JUBILARSE</span>
        </div>
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
      // banderines que se mecen
      qa(".am-b").forEach((b, i) => tl.fromTo(b, { rotation: -5 }, { rotation: 5, transformOrigin: "50% 0%", duration: 0.9 + (i % 3) * 0.15, yoyo: true, repeat: Math.round(DUR / 0.9), ease: "sine.inOut", immediateRender: false }, (i % 4) * 0.2));
      // zócalo de noticiero: entra con la periodista y se va cuando entra Scalerics
      const Z = q(".am-zocalo");
      gsap.set(Z, { opacity: 0 });
      tl.fromTo(Z, { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, 5.05);
      tl.to(Z, { x: -1100, duration: 0.3, ease: "power3.in" }, 54.4);
      tl.fromTo(q(".am-punto"), { opacity: 1 }, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 97, ease: "steps(1)", immediateRender: false }, 5.1);
      const T = [[".am-t0", 5.05, 11.3], [".am-t1", 11.3, 31.4], [".am-t2", 31.4, 39.9], [".am-t3", 39.9, 45.9], [".am-t4", 45.9, 54.7]];
      for (const [sel, a, b] of T) {
        tl.fromTo(q(sel), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, a + 0.1);
        tl.to(q(sel), { opacity: 0, y: -30, duration: 0.2 }, b - 0.1);
      }
      // minuto de silencio: se apaga la luz
      tl.to(q(".am-oscuro"), { opacity: 0.45, duration: 0.4 }, 37.9);
      tl.to(q(".am-oscuro"), { opacity: 0, duration: 0.3 }, 39.7);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR);
