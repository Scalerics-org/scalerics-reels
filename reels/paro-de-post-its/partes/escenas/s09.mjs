// s09-negocia: el dueño, nervioso, quiere negociar: ¿más cinta? Les consigo más cinta.
import { escena, duracion, postit, persona, rollo, vincha, COL } from "./comun.mjs";
const id = "s09-negocia", dur = duracion(id);
const svg = `
  ${persona({ id: "s09-due", x: 700, y: 1360, s: 1.15, pelo: "pelado", ropa: COL.c, bigote: true, delantal: true, cara: "nervioso", extra: `<path class="s09-gota" d="M86 -300 C100 -276 104 -262 96 -254 C88 -248 76 -254 78 -268 C80 -280 84 -290 86 -300 Z" fill="${COL.c}" stroke="${COL.ink}" stroke-width="4" />` })}
  <g class="s09-mano"><circle cx="440" cy="1140" r="34" fill="#f3c9a0" stroke="${COL.ink}" stroke-width="6" /><path d="M520 1260 Q470 1210 450 1170" fill="none" stroke="${COL.c}" stroke-width="40" stroke-linecap="round" /></g>
  ${rollo(440, 1060, 0.95, "s09-r0")}
  ${rollo(800, 700, 0.75, "s09-r1")}${rollo(940, 780, 0.75, "s09-r2")}${rollo(860, 860, 0.75, "s09-r3")}
  ${postit({ id: "s09-del", x: 200, y: 760, s: 0.6, col: "y", rot: -4, cara: "enojado", brazos: "cintura", extra: vincha() })}
  ${postit({ id: "s09-ros", x: 400, y: 720, s: 0.5, col: "r", rot: 6, cara: "enojado", brazos: "cintura" })}
`;
const html = `<div class="mk s09-neg">mesa de negociación</div>`;
const css = `P .s09-neg { left: 60px; top: 920px; font-size: 64px; color: ${COL.y}; transform: rotate(-4deg); }`;
const js = `
      const MUCH = 0, TRANQ = 0.79, NEG = 1.33, QUE = 1.91, QUIEREN = 2.91, MAS = 3.64, CINTA = 3.75, LES = 4.52, CONS = 4.66, MAS2 = 5.0, C2 = 5.16;
      entra(".s09-due", 0, { x: 500 }, 0.35);
      habla(".s09-due-boca", 0.05, 5.6, 0.12, 0.6);
      pop(".s09-del, .s09-ros", 0.15, { d: 0.3 });
      tl.fromTo(qa(".s09-del, .s09-ros"), { rotation: -3 }, { rotation: 3, svgOrigin: "0 150", duration: 0.3, yoyo: true, repeat: 17, ease: "sine.inOut", immediateRender: false }, 0.4);
      // gota de sudor
      tl.fromTo(q(".s09-gota"), { y: 0, opacity: 1 }, { y: 60, opacity: 0, duration: 0.7, repeat: 2, ease: "power1.in", immediateRender: false }, TRANQ);
      gsap.set(q(".s09-neg"), { opacity: 0 });
      tl.fromTo(q(".s09-neg"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, NEG);
      tl.to(q(".s09-neg"), { opacity: 0, duration: 0.2 }, MAS - 0.3);
      // ¿más cinta?: levanta un rollo
      gsap.set(qa(".s09-mano, .s09-r0"), { opacity: 0 });
      tl.fromTo(qa(".s09-mano, .s09-r0"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, MAS - 0.15);
      tl.to(q(".s09-r0"), { rotation: 360, svgOrigin: "0 0", duration: 0.8, ease: "power2.out" }, CINTA);
      // les consigo más: llueven rollos
      pop(".s09-r1", CONS, { o: "0 0" }); pop(".s09-r2", MAS2, { o: "0 0" }); pop(".s09-r3", C2, { o: "0 0" });
      tl.to(q(".s09-due"), { y: -16, duration: 0.12, yoyo: true, repeat: 3 }, LES);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.35, sfx: "click-soft", vol: 0.3 },
  { t: 3.55, sfx: "pop", vol: 0.3 },
  { t: 3.8, sfx: "sparkle", vol: 0.2 },
  { t: 4.66, sfx: "pop", vol: 0.25 }, { t: 5.0, sfx: "pop", vol: 0.25 }, { t: 5.16, sfx: "pop", vol: 0.28 },
] });
