// s07-exclusivo: "Tenemos al marido. Habló con nosotros." Sello EXCLUSIVO, silueta que se revela.
import { escena, duracion, persona, brillito, COL } from "./comun.mjs";
const id = "s07-exclusivo", dur = duracion(id);
const svg = `
  <path class="s07-cono" d="M440 520 L640 520 L900 1560 L180 1560 Z" fill="${COL.blanco}" opacity="0.08" />
  <g class="s07-sil">${persona({ id: "s07-mar", x: 540, y: 1460, s: 1.2, pelo: "pelado", bigote: true, censura: true, cara: "triste", ropa: "#6a3a5a" })}</g>
  ${brillito(230, 1000, 1.3, COL.oro, "s07-b")}${brillito(860, 1060, 1.0, COL.rosa, "s07-b")}
`;
const html = `
  <div class="sello s07-ex">EXCLUSIVO</div>
  <div class="barra s07-hab">HABLA EL MARIDO</div>`;
const css = `
  P .s07-ex { left: 130px; top: 600px; font-size: 120px; transform: rotate(-6deg); }
  P .s07-hab { left: 120px; top: 800px; font-size: 76px; color: ${COL.blanco}; background: ${COL.rosa}; transform: rotate(2deg); }
`;
const js = `
      const TEN = 0, MAR = 0.86, HAB = 1.39, NOS = 2.17;
      golpe(".s07-ex", 0.12, { desde: 2.6 });
      sacudon(0.15, 1.2);
      tl.fromTo(q(".s07-sil"), { filter: "brightness(0)" }, { filter: "brightness(0)", duration: 0.01 }, 0);
      tl.to(q(".s07-sil"), { filter: "brightness(1)", duration: 0.25 }, MAR);
      flash(MAR, 0.6);
      entra(".s07-hab", HAB - 0.1, { x: -900 }, 0.3);
      tl.to(q(".s07-hab"), { scale: 1.06, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, NOS);
      balancea(".s07-b", 0, DUR, 20, 0.3);
      respira(".s07-sil", 0, DUR, 6, 0.6);
      tl.fromTo(q(".s07-cono"), { opacity: 0.04 }, { opacity: 0.12, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.1, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 0.86, sfx: "click", vol: 0.4 },
  { t: 1.3, sfx: "whoosh-short", vol: 0.25 },
] });
