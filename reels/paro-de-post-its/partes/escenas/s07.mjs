// s07-cae: ¡atención, se cae uno! El post-it de Martina se despega y cae al piso.
import { escena, duracion, postit, COL } from "./comun.mjs";
const id = "s07-cae", dur = duracion(id);
const svg = `
  <path d="M60 1470 H1020" stroke="${COL.ink}" stroke-width="8" stroke-linecap="round" opacity="0.6" />
  ${postit({ id: "s07-y1", x: 230, y: 760, s: 0.55, col: "c", rot: -6, cara: "sorpresa" })}
  ${postit({ id: "s07-y2", x: 850, y: 770, s: 0.55, col: "r", rot: 7, cara: "sorpresa" })}
  <g class="s07-cae">${postit({ id: "s07-m", x: 540, y: 820, s: 0.95, col: "y", rot: 2, texto: ["seña de Martina,", "el lunes"], tam: 38, cara: "sorpresa", ignorar: true })}</g>
`;
const html = `<div class="s07-alerta">¡ATENCIÓN!</div>`;
const css = `P .s07-alerta { position: absolute; left: 0; right: 0; top: 1110px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; color: ${COL.rojo}; letter-spacing: 0.02em; }`;
const js = `
      const AT = 0, SE = 0.54, CAE = 0.86, UNO = 1.18;
      golpe(".s07-alerta", 0.12, { desde: 2.2 });
      tl.fromTo(q(".s07-alerta"), { opacity: 1 }, { opacity: 0.3, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, 0.3);
      tl.to(q(".s07-alerta"), { opacity: 0, duration: 0.1 }, CAE + 0.2);
      // se despega: tiembla y cae balanceándose
      tl.fromTo(q(".s07-m"), { rotation: -3, svgOrigin: "0 -150" }, { rotation: 4, svgOrigin: "0 -150", duration: 0.06, yoyo: true, repeat: 9, ease: "none", immediateRender: false }, 0);
      tl.to(q(".s07-m"), { rotation: 25, svgOrigin: "0 -150", duration: 0.2, ease: "power2.in" }, CAE - 0.25);
      tl.to(q(".s07-cae"), { y: 560, duration: 0.7, ease: "power2.in" }, CAE - 0.05);
      tl.to(q(".s07-cae"), { x: 120, duration: 0.24, yoyo: true, repeat: 2, ease: "sine.inOut" }, CAE - 0.05);
      tl.to(q(".s07-m"), { rotation: -30, svgOrigin: "0 0", duration: 0.24, yoyo: true, repeat: 2, ease: "sine.inOut" }, CAE + 0.0);
      // los otros miran abajo
      tl.to(qa(".s07-y1-ojos, .s07-y2-ojos"), { y: 14, duration: 0.2 }, CAE);
      tl.to(qa(".s07-y1, .s07-y2"), { rotation: 8, svgOrigin: "0 0", duration: 0.2 }, CAE);
      sacudon(CAE + 0.68, 1);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "glitch-1", vol: 0.25, max: 0.4 },
  { t: 0.6, sfx: "whoosh", vol: 0.3 },
  { t: 1.52, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
] });
