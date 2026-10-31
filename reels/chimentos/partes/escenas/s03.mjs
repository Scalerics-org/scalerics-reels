// s03-panel: las dos panelistas en el sillón: "¿y con quién se escribe?" "¡con todas!".
import { escena, duracion, persona, sillon, COL } from "./comun.mjs";
const id = "s03-panel", dur = duracion(id);
const svg = `
  ${sillon(540, 1540, 900, COL.rosa, "s03-sillon")}
  ${persona({ id: "s03-aoe", x: 300, y: 1330, s: 1.0, rot: 2, pelo: "morocha", anteojos: true, pestanas: true, aros: true, cara: "sorpresa", ropa: COL.oro })}
  ${persona({ id: "s03-puc", x: 790, y: 1330, s: 1.0, rot: -4, pelo: "jopo", cara: "sonrisa", cuello: "saco", ropa: COL.ink })}
`;
const html = `
  <div class="mk s03-quien">¿con quién?</div>
  <div class="barra s03-todas">¡CON TODAS!</div>`;
const css = `
  P .s03-quien { left: 110px; top: 690px; font-size: 110px; color: ${COL.oro}; transform: rotate(-6deg); }
  P .s03-todas { left: 330px; top: 640px; font-size: 104px; color: ${COL.ink}; background: ${COL.oro}; transform: rotate(4deg); }
`;
const js = `
      const NO = 0, QUIEN = 0.70, ESCRIBE = 1.04, CON = 1.80, TODAS = 1.98;
      tl.fromTo(qa(".s03-aoe, .s03-puc"), { y: 40 }, { y: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.06 }, 0);
      habla(".s03-aoe-boca", 0, 1.5, 0.09, 0.6);
      // se inclina hacia la cámara, chusma
      tl.to(q(".s03-aoe"), { rotation: 4, svgOrigin: "0 160", duration: 0.3, ease: "power2.out" }, 0.1);
      gsap.set(q(".s03-quien"), { opacity: 0 });
      tl.fromTo(q(".s03-quien"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, QUIEN);
      tl.to(q(".s03-quien"), { opacity: 0, duration: 0.15 }, CON - 0.1);
      // el panelista la pisa
      habla(".s03-puc-boca", CON - 0.05, 0.6, 0.08, 0.5);
      tl.fromTo(q(".s03-puc"), { y: 0 }, { y: -40, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, CON);
      golpe(".s03-todas", TODAS, { desde: 2.4 });
      sacudon(TODAS + 0.03, 1.2);
      tl.to(q(".s03-aoe"), { rotation: -6, svgOrigin: "0 160", duration: 0.2 }, TODAS);
      balancea(".s03-todas", TODAS + 0.25, DUR - TODAS - 0.5, 2, 0.25);
      pestanea(".s03-puc-ojos", 0.9);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.7, sfx: "pop", vol: 0.25 },
  { t: 1.9, sfx: "impact-bass-1", vol: 0.38, max: 0.7 },
  { t: 2.0, sfx: "sparkle", vol: 0.22 },
] });
