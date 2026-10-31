// s04-senora: la rosa lee su papel: «llamar a la señora del pedido». ¿Qué señora? ¿Qué pedido? Desde el invierno.
import { escena, duracion, postit, mono, COL } from "./comun.mjs";
const id = "s04-senora", dur = duracion(id);
const senora = (x, y, cls) => `<g transform="translate(${x} ${y})"><g class="${cls}">
  <path d="M-70 120 C-70 30 -40 0 0 0 C40 0 70 30 70 120 Z" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
  <circle cx="0" cy="-40" r="42" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" />
  <circle cx="0" cy="-92" r="22" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" />
  <text x="0" y="-18" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="70" fill="${COL.rojo}">?</text></g></g>`;
const paquete = (x, y, cls) => `<g transform="translate(${x} ${y})"><g class="${cls}">
  <path d="M-80 -60 L80 -60 L80 70 L-80 70 Z" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
  <path d="M-80 -60 L-50 -96 L110 -96 L80 -60 M80 70 L110 34 L110 -96" fill="${COL.cartons}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
  <path d="M0 -60 V70" stroke="${COL.papel}" stroke-width="12" opacity="0.7" />
  <text x="0" y="36" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="90" fill="${COL.rojo}">?</text></g></g>`;
let copos = "";
for (let i = 0; i < 16; i++) {
  const x = 80 + ((i * 263) % 920), y = 560 + ((i * 137) % 260);
  copos += `<g transform="translate(${x} ${y})"><path class="s04-copo" d="M-16 0 H16 M0 -16 V16 M-11 -11 L11 11 M11 -11 L-11 11" stroke="${COL.papel}" stroke-width="5" stroke-linecap="round" /></g>`;
}
const svg = `
  ${postit({ id: "s04-rosa", x: 350, y: 1060, s: 1.25, col: "r", rot: -3, texto: ["llamar a la señora", "del pedido"], tam: 36, cara: "enojado", brazos: "cintura", extra: mono(110, -150) })}
  <g class="s04-buf"><path d="M175 1205 Q350 1260 525 1205 L530 1250 Q350 1305 170 1250 Z" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
    <path d="M440 1250 L470 1380 L520 1370 L500 1240" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
    <path d="M250 1222 L262 1270 M330 1232 L338 1282 M410 1230 L414 1280" stroke="${COL.papel}" stroke-width="8" /></g>
  ${senora(720, 760, "s04-s1")}${senora(900, 800, "s04-s2")}
  ${paquete(720, 1110, "s04-q1")}${paquete(910, 1150, "s04-q2")}
  <g class="s04-nieve">${copos}</g>
`;
const html = `<div class="mk s04-inv">desde el invierno</div>`;
const css = `P .s04-inv { left: 520px; top: 1290px; font-size: 84px; color: ${COL.c}; transform: rotate(-5deg); }`;
const js = `
      const LLAMAR = 0.25, SEN = 1.09, PED = 1.67, Q1 = 2.09, Q1B = 2.67, Q2 = 3.25, Q2B = 3.68, ESTOY = 4.63, INV = 5.34;
      tl.fromTo(q(".s04-rosa"), { scale: 0.85, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.35, ease: "back.out(2)" }, 0);
      habla(".s04-rosa-boca", 0, 2.0, 0.1, 0.5);
      habla(".s04-rosa-boca", Q1, 1.9, 0.1, 0.5);
      habla(".s04-rosa-boca", ESTOY, 1.4, 0.1, 0.5);
      // lee su propio papel: los ojos miran arriba
      tl.to(q(".s04-rosa-ojos"), { y: -10, duration: 0.2 }, LLAMAR);
      tl.to(q(".s04-rosa-ojos"), { y: 0, duration: 0.2 }, Q1 - 0.1);
      // ¿qué señora?
      pop(".s04-s1", Q1, { o: "0 120" }); pop(".s04-s2", Q1B - 0.1, { o: "0 120" });
      balancea(".s04-s1, .s04-s2", Q1B, 0.8, 5, 0.2, "0 120");
      // ¿qué pedido?
      pop(".s04-q1", Q2, { o: "0 70" }); pop(".s04-q2", Q2B - 0.1, { o: "0 70" });
      sacudon(Q2B, 0.6);
      tl.to(qa(".s04-s1, .s04-s2, .s04-q1, .s04-q2"), { opacity: 0, y: 40, duration: 0.2, stagger: 0.04 }, ESTOY - 0.15);
      // desde el invierno: nieva y la rosa tirita con bufanda
      gsap.set(q(".s04-nieve"), { opacity: 0 });
      tl.fromTo(q(".s04-nieve"), { opacity: 1, y: -60 }, { opacity: 1, y: 260, duration: 2.2, ease: "none", immediateRender: false }, ESTOY);
      tl.fromTo(qa(".s04-copo"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 180, svgOrigin: "0 0", duration: 2.2, ease: "none", immediateRender: false }, ESTOY);
      gsap.set(q(".s04-buf"), { opacity: 0 });
      tl.fromTo(q(".s04-buf"), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, INV - 0.3);
      tl.fromTo(q(".s04-rosa"), { x: -5 }, { x: 5, duration: 0.05, yoyo: true, repeat: 17, ease: "none", immediateRender: false }, INV);
      gsap.set(q(".s04-inv"), { opacity: 0 });
      tl.fromTo(q(".s04-inv"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, INV);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "pop", vol: 0.3 },
  { t: 2.1, sfx: "pop", vol: 0.3 }, { t: 2.6, sfx: "pop", vol: 0.3 },
  { t: 3.25, sfx: "click", vol: 0.3 }, { t: 3.6, sfx: "click", vol: 0.3 },
  { t: 4.6, sfx: "whoosh", vol: 0.25 },
  { t: 5.35, sfx: "sparkle", vol: 0.25 },
] });
