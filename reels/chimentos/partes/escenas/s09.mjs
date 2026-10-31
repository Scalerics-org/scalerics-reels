// s09-escandalo: las dos panelistas a los gritos: "¡Escándalo!" "¡Se separan!" y el corazón partido.
import { escena, duracion, persona, COL } from "./comun.mjs";
const id = "s09-escandalo", dur = duracion(id);
const svg = `
  <g transform="translate(540 900) scale(2)">
    <path class="s09-ci" d="M0 40 L-70 -30 Q-100 -70 -60 -96 Q-26 -112 0 -70 L-14 -40 L10 -14 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" stroke-linejoin="round" />
    <path class="s09-cd" d="M0 40 L70 -30 Q100 -70 60 -96 Q26 -112 0 -70 L-14 -40 L10 -14 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" stroke-linejoin="round" />
  </g>
  ${persona({ id: "s09-aoe", x: 280, y: 1450, s: 0.92, pelo: "morocha", anteojos: true, pestanas: true, aros: true, cara: "grita", ropa: COL.oro })}
  ${persona({ id: "s09-puc", x: 800, y: 1450, s: 0.92, pelo: "jopo", cara: "grita", cuello: "saco", ropa: COL.ink })}
`;
const html = `
  <div class="barra s09-esc">¡ESCÁNDALO!</div>
  <div class="barra s09-sep">¡SE SEPARAN!</div>`;
const css = `
  P .s09-esc { left: 70px; top: 580px; font-size: 118px; color: ${COL.blanco}; background: ${COL.rojo}; transform: rotate(-4deg); }
  P .s09-sep { left: 200px; top: 1000px; font-size: 84px; color: ${COL.ink}; background: ${COL.oro}; transform: rotate(3deg); }
`;
const js = `
      const ESCA = 0, SE = 1.14, SEP = 1.33;
      golpe(".s09-esc", 0.1, { desde: 2.6 });
      sacudon(0.12, 1.5);
      habla(".s09-aoe-boca", 0, 0.8, 0.08, 0.5);
      tl.fromTo(q(".s09-aoe"), { y: 0 }, { y: -50, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, 0.05);
      habla(".s09-puc-boca", SE, 0.8, 0.08, 0.5);
      tl.fromTo(q(".s09-puc"), { y: 0 }, { y: -50, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, SE);
      golpe(".s09-sep", SEP, { desde: 2.4 });
      tl.to(q(".s09-ci"), { x: -40, rotation: -20, svgOrigin: "0 40", duration: 0.3, ease: "power3.out" }, SEP);
      tl.to(q(".s09-cd"), { x: 40, rotation: 20, svgOrigin: "0 40", duration: 0.3, ease: "power3.out" }, SEP);
      sacudon(SEP + 0.03, 1.2);
      tiembla(".s09-esc", 0.3, DUR - 0.6, 4, 0.05);
      tl.fromTo(qa(".s09-ci, .s09-cd"), { scale: 0.9, svgOrigin: "0 40" }, { scale: 1.05, svgOrigin: "0 40", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 1.3, sfx: "glitch-1", vol: 0.25, max: 0.4 },
  { t: 1.35, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
] });
