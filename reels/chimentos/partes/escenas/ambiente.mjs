// compositions/ambiente.html y assets/set.svg: set de chimentos (haces de luz rosa, marquesina de
// lamparitas doradas a los costados, mosca del programa arriba, zócalo EN VIVO con titulares abajo).
// Uso (desde reels/chimentos): node partes/escenas/ambiente.mjs
import fs from "node:fs";
import { COL } from "./comun.mjs";
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([0-9.]+)/)[1]);
let s = 11;
const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
// fondo fijo: haces de luz, piso con brillo, puntitos de purpurina
let set = "";
[[180, -40], [540, -80], [900, -40]].forEach(([x, y], i) => {
  set += `<path d="M${x - 40} ${y} L${x + 40} ${y} L${x + 260 - i * 260 + 220} 1920 L${x - 260 - i * 260 + 300} 1920 Z" fill="${COL.rosa}" opacity="0.07" />`;
});
set += `<ellipse cx="540" cy="1560" rx="620" ry="120" fill="${COL.rosa}" opacity="0.10" />`;
for (let i = 0; i < 160; i++) {
  const x = Math.round(rnd() * 1080), y = Math.round(rnd() * 1920), r = (1 + rnd() * 2.6).toFixed(1);
  set += `<circle cx="${x}" cy="${y}" r="${r}" fill="${rnd() < 0.5 ? COL.oro : COL.rosac}" opacity="${(0.12 + rnd() * 0.3).toFixed(2)}" />`;
}
fs.writeFileSync("assets/set.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">${set}</svg>`);
// lamparitas de camarín a los costados
let lamp = "";
for (let k = 0; k < 13; k++) {
  const y = 520 + k * 82;
  lamp += `<circle class="am-l am-l${k % 3}" cx="22" cy="${y}" r="11" fill="${COL.oro}" /><circle class="am-l am-l${(k + 1) % 3}" cx="1058" cy="${y}" r="11" fill="${COL.oro}" />`;
}
const TIT = [
  [5.0, "MIRTA, PESCADA A LAS 23 H"],
  [12.0, "LAS FOTOS DEL CAMISÓN"],
  [22.6, "ESCÁNDALO EN LOS RAVIOLES"],
  [28.6, "EXCLUSIVO: HABLA EL MARIDO"],
  [42.4, "LA DE ENFRENTE DUERME A LAS 21"],
  [50.6, "¿QUIÉN LE MANDA LOS MENSAJES?"],
];
const FIN_Z = 55.9;
const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .am-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="ambiente"] .am-mosca { position: absolute; left: 50%; top: 92px; transform: translateX(-50%) rotate(-2deg); display: flex; align-items: center; gap: 14px; padding: 10px 30px 10px 26px; background: ${COL.ink}; border: 5px solid ${COL.rosa}; border-radius: 40px; box-shadow: 6px 6px 0 ${COL.rosa}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-mosca b { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; letter-spacing: -0.02em; color: ${COL.rosa}; }
    [data-composition-id="ambiente"] .am-mosca i { font-style: normal; font-family: "Caveat", cursive; font-weight: 700; font-size: 46px; color: ${COL.oro}; }
    [data-composition-id="ambiente"] .am-zocalo { position: absolute; left: 40px; top: 1580px; display: flex; align-items: stretch; height: 70px; }
    [data-composition-id="ambiente"] .am-vivo { display: flex; align-items: center; gap: 12px; padding: 0 20px 0 16px; background: ${COL.rojo}; border: 5px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 28px; color: ${COL.blanco}; white-space: nowrap; }
    [data-composition-id="ambiente"] .am-punto { width: 16px; height: 16px; border-radius: 50%; background: ${COL.blanco}; }
    [data-composition-id="ambiente"] .am-tira { position: relative; width: 790px; background: ${COL.oro}; border: 5px solid ${COL.ink}; border-left: 0; overflow: hidden; }
    [data-composition-id="ambiente"] .am-tira span { position: absolute; left: 20px; top: 15px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 31px; letter-spacing: 0.01em; color: ${COL.ink}; white-space: nowrap; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true" data-layout-ignore>${lamp}</svg>
      <div class="am-mosca"><b>PICANTE</b><i>a las cinco</i></div>
      <div class="am-zocalo">
        <div class="am-vivo"><span class="am-punto"></span>EN VIVO</div>
        <div class="am-tira">${TIT.map(([, t], i) => `<span class="am-t${i}">${t}</span>`).join("")}</div>
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
      // lamparitas de camarín que titilan en tres grupos
      [0, 1, 2].forEach((g) => tl.fromTo(qa(".am-l" + g), { opacity: 1 }, { opacity: 0.3, duration: 0.3, yoyo: true, repeat: Math.round(DUR / 0.3), ease: "steps(1)", immediateRender: false }, g * 0.1));
      // la mosca del programa respira
      tl.fromTo(q(".am-mosca"), { scale: 1 }, { scale: 1.04, duration: 0.8, yoyo: true, repeat: Math.round(DUR / 0.8), ease: "sine.inOut", immediateRender: false }, 0);
      // zócalo EN VIVO con titulares; se va cuando entra Scalerics y vuelve para el cierre
      const Z = q(".am-zocalo");
      gsap.set(Z, { opacity: 0 });
      tl.fromTo(Z, { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, 4.9);
      tl.to(Z, { x: -1100, duration: 0.3, ease: "power3.in" }, ${FIN_Z});
      tl.fromTo(q(".am-punto"), { opacity: 1 }, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 101, ease: "steps(1)", immediateRender: false }, 5.0);
      const T = ${JSON.stringify(TIT.map(([a], i) => [".am-t" + i, a, i + 1 < TIT.length ? TIT[i + 1][0] : FIN_Z + 0.4]))};
      for (const [sel, a, b] of T) {
        tl.fromTo(q(sel), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, a + 0.1);
        tl.to(q(sel), { opacity: 0, y: -30, duration: 0.2 }, b - 0.1);
      }
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR);
