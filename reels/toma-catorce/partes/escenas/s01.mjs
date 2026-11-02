// s01-toma14: la claqueta TOMA 14 gigante, la directora harta con el megáfono, 14 rayitas de tiza,
// el celular prohibido y el "clac" en "¡Acción!".
import { escena, duracion, directora, megafono, claqueta, celular, COL } from "./comun.mjs";
const id = "s01-toma14", dur = duracion(id);
const mega = megafono("s01-mega");
// 14 rayitas de tiza: 2 grupos de 5 tachados + 4
let rayas = "";
let x = 0;
for (let g = 0; g < 3; g++) {
  const n = g < 2 ? 5 : 4;
  for (let i = 0; i < Math.min(4, n); i++) rayas += `<path class="s01-r" d="M${x + i * 22} 0 L${x + i * 22 + 4} 74" />`;
  if (n === 5) rayas += `<path class="s01-r" d="M${x - 12} 58 L${x + 80} 14" />`;
  x += 124;
}
const svg = `
  ${claqueta({ cls: "s01-cla", x: 540, y: 850, s: 1.35, rot: -4, toma: "14" })}
  <g transform="translate(560 1150) rotate(-3)" fill="none" stroke="${COL.blanco}" stroke-width="9" stroke-linecap="round">${rayas}</g>
  ${directora({ id: "s01-dir", x: 300, y: 1560, s: 0.95, cara: "harta", extra: mega })}
  <g class="s01-prohib">
    ${celular({ cls: "s01-cel", x: 860, y: 1370, s: 0.8, rot: 10 })}
    <circle cx="860" cy="1370" r="120" fill="none" stroke="${COL.rojo}" stroke-width="16" />
    <path d="M775 1285 L945 1455" stroke="${COL.rojo}" stroke-width="16" stroke-linecap="round" />
  </g>
`;
const html = `<div class="tag s01-tag">MAKING OF · DÍA 1</div>`;
const css = `P .s01-tag { left: 70px; top: 590px; font-size: 28px; transform: rotate(-3deg); }`;
const js = `
      const CAT = 0.26, CAT2 = 1.36, TOMAS = 2.21, COM = 2.96, FRASE = 4.43, CEL = 5.39, ACC = 6.13;
      // cuadro 0: la claqueta ya está, abierta
      tl.fromTo(q(".s01-cla"), { scale: 0.92, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.35, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s01-cla-num"), { scale: 1.8, opacity: 0.2, svgOrigin: "100 110" }, { scale: 1, opacity: 1, svgOrigin: "100 110", duration: 0.2, ease: "power4.in" }, CAT);
      sacudon(CAT + 0.2, 0.7);
      tl.to(q(".s01-cla-num"), { scale: 1.25, svgOrigin: "100 110", duration: 0.12, yoyo: true, repeat: 1 }, CAT2);
      // la directora sube harta
      entra(".s01-dir", 0.05, { y: 300 }, 0.4);
      habla(".s01-dir-boca", 0.05, 1.2, 0.12, 0.5);
      habla(".s01-dir-boca", TOMAS - 0.1, 3.4, 0.1, 0.5);
      tl.fromTo(q(".s01-mega"), { rotation: -8, svgOrigin: "40 -180" }, { rotation: 4, svgOrigin: "40 -180", duration: 0.25, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, 0.3);
      // 14 rayitas de tiza
      qa(".s01-r").forEach((p, i) => dibujar([p].length && ".s01-r:nth-of-type(" + (i + 1) + ")", TOMAS + i * 0.06, 0.12));
      pop(".s01-tag", COM, { desde: 0.7 });
      // sin agarrar el celular
      pop(".s01-prohib", CEL - 0.1, { desde: 0.4, o: "860 1370" });
      vibrar(".s01-cel", CEL + 0.2, 0.5, 6);
      // ¡Acción!: clac
      clac(".s01-cla-barra", ACC + 0.05, 24);
      flash(ACC + 0.05, 0.7);
      sacudon(ACC + 0.06, 1.3);
      pestanea(".s01-dir-ojos", 1.0);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.25, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 2.2, sfx: "typing", vol: 0.2, max: 0.9 },
  { t: 5.3, sfx: "vibra", vol: 0.35, max: 0.6 },
  { t: 6.18, sfx: "claqueta", vol: 0.6 },
] });
