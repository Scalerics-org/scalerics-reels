// s02-beto: por el monitor de la cámara (REC, TOMA 14): Beto con la pizza en su pizzería dice su frase.
import { escena, duracion, monitor, pizzeria, beto, pizza, mano, camara, luz, COL } from "./comun.mjs";
const id = "s02-beto", dur = duracion(id);
const W = 900, H = 600;
const cont = pizzeria(W, H, `
  ${beto({ id: "s02-beto", x: 450, y: 600, s: 1.0, cara: "sonrisa" })}
  <g class="s02-pz">${pizza(640, 430, 86)}${mano(600, 500, 1.1, -20)}</g>`);
const svg = `
  ${luz(930, 1420, 0.9, 200, "s02-luz")}
  ${monitor({ cls: "s02-mon", x: 540, y: 960, w: W, h: H, contenido: cont, toma: "14" })}
  ${camara(210, 1400, 0.6, "s02-cam")}
`;
const html = `<div class="tag s02-tag">PUBLICIDAD · LO DE BETO</div>`;
const css = `P .s02-tag { left: 360px; top: 1310px; font-size: 28px; }`;
const js = `
      const HOLA = 0, BETO = 0.77, PIZ = 1.55, ATE = 2.15, EN = 3.10;
      tl.fromTo(q(".s02-mon"), { scale: 0.9, opacity: 0, svgOrigin: "450 300" }, { scale: 1, opacity: 1, svgOrigin: "450 300", duration: 0.3, ease: "back.out(1.6)" }, 0);
      acerca(".s02-mon-cont", 0, DUR, 1, 1.08, "450 300");
      habla(".s02-beto-boca", 0.05, EN - 0.05, 0.1, 0.5);
      respira(".s02-beto", 0, DUR, 6, 0.35);
      pop(".s02-pz", PIZ, { desde: 0.4, o: "640 430" });
      tl.to(q(".s02-pz"), { y: -30, rotation: 8, svgOrigin: "640 430", duration: 0.2, yoyo: true, repeat: 3 }, ATE);
      pop(".s02-tag", BETO, { desde: 0.7 });
      tl.fromTo(q(".s02-mon-rec"), { opacity: 1 }, { opacity: 0.2, duration: 0.4, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, 0);
      pestanea(".s02-beto-ojos", 1.2);
      // "como en..." se congela
      tl.to(q(".s02-mon-cont"), { x: 6, duration: 0.04, yoyo: true, repeat: 5 }, EN + 0.3);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "click", vol: 0.3 },
  { t: 1.55, sfx: "pop", vol: 0.3 },
  { t: 2.15, sfx: "sparkle", vol: 0.2 },
] });
