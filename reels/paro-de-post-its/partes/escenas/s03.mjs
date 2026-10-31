// s03-reclamos: el pliego de reclamos; punto uno: nadie nos lee.
import { escena, duracion, postit, megafono, vincha, letras, COL } from "./comun.mjs";
const id = "s03-reclamos", dur = duracion(id);
const pila = [[0, 0, "y", -6], [14, -24, "r", 5], [-10, -48, "c", -3], [18, -72, "y", 7], [-6, -96, "r", -8], [10, -120, "c", 4], [-14, -144, "y", -4]];
const svg = `
  <g class="s03-pliego"><path d="M110 590 L970 600 L960 960 L120 950 Z" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" />
    <text x="540" y="680" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="62" fill="${COL.rojo}">PLATAFORMA DE RECLAMOS</text>
    <path d="M200 706 L880 712" stroke="${COL.rojo}" stroke-width="5" stroke-linecap="round" />
    <text class="s03-uno" x="170" y="810" font-family="Caveat" font-weight="700" font-size="88" fill="${COL.ink}">1.</text>
    <path class="s03-sub" d="M290 900 Q560 880 900 900" fill="none" stroke="${COL.rojo}" stroke-width="8" stroke-linecap="round" />
  </g>
  <g class="s03-pila">${pila.map(([dx, dy, col, rot], i) => postit({ id: "s03-k s03-k" + i, x: 790 + dx, y: 1330 + dy, s: 0.5, col, rot, cara: i === pila.length - 1 ? "triste" : "ninguna" })).join("")}</g>
  ${postit({ id: "s03-del", x: 300, y: 1210, s: 0.9, col: "y", cara: "grita", brazos: "puno", piernas: true, extra: vincha() + megafono(150, -40, -20) })}
  ${postit({ id: "s03-rosa", x: 1010, y: 1200, s: 0.6, col: "r", cara: "enojado", rot: -8 })}
`;
const html = `<div class="mk s03-txt">${letras("Nadie nos lee")}</div><div class="mk s03-mon">un montón</div>`;
const css = `
  P .s03-txt { left: 290px; top: 760px; font-size: 104px; color: ${COL.ink}; text-shadow: none; }
  P .s03-mon { left: 640px; top: 1000px; font-size: 76px; color: ${COL.y}; transform: rotate(-6deg); }
`;
const js = `
      const PUNTO = 0, UNO = 0.25, MONTON = 1.25, NADIE = 2.09, LEE = 2.5, COMP = 3.38;
      tl.fromTo(q(".s03-pliego"), { y: -60, rotation: -2, svgOrigin: "540 600" }, { y: 0, rotation: 0, svgOrigin: "540 600", duration: 0.35, ease: "back.out(1.6)" }, 0);
      entra(".s03-del", 0, { x: -500 }, 0.3);
      habla(".s03-del-boca", 0.05, 0.6, 0.09);
      habla(".s03-del-boca", 0.9, 1.0, 0.09);
      habla(".s03-del-boca", NADIE, 0.7, 0.09);
      habla(".s03-del-boca", COMP, 0.5, 0.09);
      pop(".s03-uno", UNO, { o: "190 790" });
      // un montón: la pila crece
      qa(".s03-k").forEach((el, i) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.14, ease: "power3.in", immediateRender: false }, MONTON - 0.3 + i * 0.07); });
      gsap.set(q(".s03-mon"), { opacity: 0 });
      tl.fromTo(q(".s03-mon"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, MONTON + 0.2);
      tl.to(q(".s03-mon"), { opacity: 0, duration: 0.2 }, NADIE + 0.4);
      // nadie nos lee: se escribe y se subraya
      escribe(".s03-txt", NADIE, 0.6);
      dibujar(".s03-sub", LEE + 0.1, 0.4);
      sacudon(LEE + 0.1, 0.7);
      balancea(".s03-pila", LEE, 0.9, 2, 0.15, "790 1400");
      // compañera: entra la rosa
      tl.fromTo(q(".s03-rosa"), { x: 300 }, { x: 0, duration: 0.3, ease: "back.out(1.5)", immediateRender: false }, COMP - 0.1);
      tl.to(q(".s03-del-bd"), { rotation: 30, svgOrigin: "150 20", duration: 0.25 }, COMP);
`;
escena({ id, dur, css, svg, html, js: js, sfx: [
  { t: 0.05, sfx: "whoosh", vol: 0.25 },
  { t: 0.3, sfx: "pop", vol: 0.3 },
  { t: 1.0, sfx: "click-soft", vol: 0.3 }, { t: 1.3, sfx: "click-soft", vol: 0.3 },
  { t: 2.1, sfx: "typing", vol: 0.25, max: 0.6 },
  { t: 2.6, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 3.3, sfx: "whoosh-short", vol: 0.25 },
] });
