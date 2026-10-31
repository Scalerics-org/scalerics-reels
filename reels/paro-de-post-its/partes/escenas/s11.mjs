// s11-papelitos: el giro. «Vos no tenés mala memoria. Tenés el negocio pegado con papelitos.»
import { escena, duracion, postit, vincha, COL } from "./comun.mjs";
const id = "s11-papelitos", dur = duracion(id);
// el local (fachada) en líneas, sostenido por post-its
const parches = [
  [300, 930, "y", -12], [520, 905, "r", 8], [760, 930, "c", -6], [250, 1110, "c", 10], [820, 1100, "y", -9],
  [420, 1290, "r", -7], [660, 1300, "y", 11], [880, 1280, "r", 5], [540, 1130, "c", -4], [200, 1290, "y", 6],
];
const svg = `
  <g class="s11-local">
    <path class="s11-l" d="M170 1420 V890 H910 V1420" fill="none" stroke="${COL.papel}" stroke-width="9" stroke-linejoin="round" />
    <path class="s11-l" d="M140 890 L190 800 H890 L940 890 Z" fill="none" stroke="${COL.papel}" stroke-width="9" stroke-linejoin="round" />
    <path class="s11-l" d="M190 800 L240 890 M300 800 L340 890 M410 800 L440 890 M520 800 L540 890 M630 800 L640 890 M740 800 L740 890 M850 800 L840 890" fill="none" stroke="${COL.papel}" stroke-width="6" />
    <path class="s11-l" d="M230 1420 V1000 H520 V1420 M600 1420 V1000 H850 V1250 H600" fill="none" stroke="${COL.papel}" stroke-width="7" stroke-linejoin="round" />
    <path class="s11-l" d="M120 1420 H960" fill="none" stroke="${COL.papel}" stroke-width="9" stroke-linecap="round" />
    <path class="s11-l" d="M260 1050 L330 1120 M700 1050 L640 1130 M560 950 L600 1010" fill="none" stroke="${COL.rojo}" stroke-width="7" stroke-linecap="round" />
    ${parches.map(([x, y, col, rot], i) => postit({ id: "s11-p s11-p" + i, x, y, s: 0.3, col, rot, cara: "ninguna" })).join("")}
  </g>
  ${postit({ id: "s11-del", x: 170, y: 1330, s: 0.55, col: "y", rot: 4, cara: "triste", brazos: "abajo", extra: vincha() })}
`;
const html = `<div class="mk s11-mem">mala memoria</div><div class="s11-tacha"></div><div class="mk s11-pap">papelitos</div>`;
const css = `
  P .s11-mem { left: 0; right: 0; text-align: center; top: 600px; font-size: 136px; color: ${COL.papel}; }
  P .s11-tacha { position: absolute; left: 180px; top: 680px; width: 720px; height: 16px; border-radius: 8px; background: ${COL.rojo}; transform-origin: 0 50%; }
  P .s11-pap { left: 0; right: 0; text-align: center; top: 600px; font-size: 150px; color: ${COL.y}; }
`;
const js = `
      const JEFE = 0, VOS = 0.75, MALA = 1.21, MEM = 1.46, TENES = 2.5, NEG = 2.73, PEG = 3.16, PAP = 3.67;
      pop(".s11-del", 0, { d: 0.3 });
      habla(".s11-del-boca", 0, 1.9, 0.12, 0.5);
      habla(".s11-del-boca", TENES, 1.8, 0.12, 0.5);
      gsap.set(q(".s11-mem"), { opacity: 0 });
      tl.fromTo(q(".s11-mem"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, VOS);
      gsap.set(q(".s11-tacha"), { scaleX: 0 });
      tl.to(q(".s11-tacha"), { scaleX: 1, duration: 0.3, ease: "power2.out" }, MEM + 0.45);
      tl.to(qa(".s11-mem, .s11-tacha"), { opacity: 0, y: -30, duration: 0.2 }, TENES - 0.05);
      // el negocio: se dibuja la fachada
      dibujar(".s11-l", NEG - 0.25, 0.45);
      // pegado con papelitos
      qa(".s11-p").forEach((el, i) => pega(".s11-p" + i, PEG + i * 0.06, { rot: i % 2 ? 14 : -14 }));
      golpe(".s11-pap", PAP, { desde: 2 });
      sacudon(PAP + 0.05, 1.2);
      // todo se tambalea
      tl.to(q(".s11-local"), { rotation: 2.5, svgOrigin: "540 1420", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, PAP + 0.1);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 1.2, sfx: "click-soft", vol: 0.25 },
  { t: 1.95, sfx: "whoosh-short", vol: 0.3 },
  { t: 2.5, sfx: "typing", vol: 0.2, max: 0.5 },
  { t: 3.2, sfx: "pop", vol: 0.25 }, { t: 3.45, sfx: "pop", vol: 0.25 },
  { t: 3.65, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
] });
