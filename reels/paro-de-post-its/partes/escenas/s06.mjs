// s06-cinta: el chiquito indignado: ¡me pegaron con cinta!
import { escena, duracion, postit, cinta, COL } from "./comun.mjs";
const id = "s06-cinta", dur = duracion(id);
const svg = `
  ${postit({ id: "s06-chi", x: 540, y: 1060, s: 1.05, col: "y", rot: 3, cara: "grita", brazos: "arriba", piernas: true })}
  ${cinta(540, 1060, 470, -32, "s06-c1")}
  ${cinta(540, 1060, 470, 32, "s06-c2")}
  ${postit({ id: "s06-a", x: 150, y: 1320, s: 0.5, col: "r", rot: -10, cara: "sorpresa" })}
  ${postit({ id: "s06-b", x: 930, y: 1330, s: 0.5, col: "c", rot: 9, cara: "sorpresa" })}
`;
const html = `<div class="mk s06-con">¡CON CINTA!</div>`;
const css = `P .s06-con { left: 0; right: 0; text-align: center; top: 640px; font-size: 150px; color: ${COL.rojo}; transform: rotate(-4deg); }`;
const js = `
      const PEGARON = 0.42, CINTA = 1.0, CON = 2.04, C2 = 2.17, COMP = 2.59;
      tl.fromTo(q(".s06-chi"), { scale: 0.8, svgOrigin: "0 200" }, { scale: 1, svgOrigin: "0 200", duration: 0.3, ease: "back.out(2.4)" }, 0);
      habla(".s06-chi-boca", 0, 1.5, 0.08);
      habla(".s06-chi-boca", CON, 1.6, 0.08);
      tl.fromTo(q(".s06-chi-bi"), { rotation: -10, svgOrigin: "-150 30" }, { rotation: 12, svgOrigin: "-150 30", duration: 0.14, yoyo: true, repeat: 25, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(q(".s06-chi-bd"), { rotation: 10, svgOrigin: "150 30" }, { rotation: -12, svgOrigin: "150 30", duration: 0.14, yoyo: true, repeat: 25, ease: "sine.inOut", immediateRender: false }, 0);
      // la cinta se estampa encima
      pega(".s06-c1", PEGARON + 0.1, { rot: -10, o: "0 0" });
      pega(".s06-c2", CINTA, { rot: 10, o: "0 0" });
      sacudon(PEGARON + 0.12, 0.8); sacudon(CINTA + 0.02, 1.1);
      golpe(".s06-con", C2, { desde: 2.4 });
      sacudon(C2 + 0.05, 1.4);
      tl.to(q(".s06-con"), { scale: 1.08, duration: 0.12, yoyo: true, repeat: 5 }, C2 + 0.3);
      // compañeros: los demás se asoman
      entra(".s06-a", COMP, { x: -400 }, 0.3);
      entra(".s06-b", COMP + 0.1, { x: 400 }, 0.3);
      respira(".s06-chi", CINTA + 0.2, 3, -14, 0.18);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "pop", vol: 0.3 },
  { t: 0.5, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
  { t: 1.0, sfx: "impact-bass-1", vol: 0.35, max: 0.4 },
  { t: 2.12, sfx: "impact-bass-2", vol: 0.42, max: 0.6 },
  { t: 2.6, sfx: "whoosh-short", vol: 0.25 },
] });
