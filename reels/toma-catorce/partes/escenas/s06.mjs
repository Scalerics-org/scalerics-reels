// s06-dieciseis: "¡Corten! Toma dieciséis." claqueta 15 -> 16; tira de película con las 16 tomas y
// sello "PARTE 16" a toda velocidad ("más partes que Rápido y Furioso").
import { escena, duracion, claqueta, COL } from "./comun.mjs";
const id = "s06-dieciseis", dur = duracion(id);
let tira = "";
for (let i = 0; i < 18; i++) {
  const x = i * 170;
  tira += `<rect x="${x + 12}" y="22" width="146" height="116" rx="6" fill="${COL.pared}" stroke="${COL.blanco}" stroke-width="3" />
  <text x="${x + 85}" y="100" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="58" fill="${i === 15 ? COL.ama : COL.aceroc}">${i + 1}</text>`;
  for (let k = 0; k < 4; k++) tira += `<rect x="${x + 14 + k * 42}" y="4" width="22" height="12" rx="3" fill="${COL.blanco}" opacity="0.8" /><rect x="${x + 14 + k * 42}" y="144" width="22" height="12" rx="3" fill="${COL.blanco}" opacity="0.8" />`;
}
let vel = "";
[[80, 1460, 260], [140, 1500, 340], [60, 1540, 200], [700, 1470, 300], [760, 1520, 240]].forEach(([x, y, l]) => { vel += `<path class="s06-v" d="M${x} ${y} L${x + l} ${y}" stroke="${COL.ama}" stroke-width="8" stroke-linecap="round" />`; });
const svg = `
  ${claqueta({ cls: "s06-cla", x: 540, y: 930, s: 1.05, rot: -3, toma: "16", viejo: "15" })}
  <g transform="translate(0 1180) rotate(-3 540 80)"><rect x="-40" y="0" width="1200" height="160" fill="${COL.ink}" />
    <g class="s06-tira">${tira}</g></g>
  ${vel}
`;
const html = `
  <div class="barra s06-cor">¡CORTEN!</div>
  <div class="sello s06-parte">PARTE 16</div>`;
const css = `
  P .s06-cor { left: 330px; top: 590px; font-size: 120px; color: ${COL.blanco}; background: ${COL.rojo}; transform: rotate(4deg); }
  P .s06-parte { left: 310px; top: 1400px; font-size: 80px; color: ${COL.ama}; border-color: ${COL.ama}; transform: rotate(-6deg) skewX(-12deg); }
`;
const js = `
      const COR = 0, DIE = 0.95, ESTO = 1.90, PART = 3.07, RAP = 3.45, FUR = 3.97;
      golpe(".s06-cor", 0.1, { desde: 2.6 });
      sacudon(0.1, 1.8);
      tiembla(".s06-cor", 0.3, 1.2, 6, 0.04);
      pop(".s06-cla", 0.2, { desde: 0.6 });
      dibujar(".s06-cla-tacha", 0.8, 0.2);
      gsap.set(q(".s06-cla-num"), { opacity: 0 });
      tl.fromTo(q(".s06-cla-num"), { opacity: 0, scale: 1.8, svgOrigin: "150 110" }, { opacity: 1, scale: 1, svgOrigin: "150 110", duration: 0.2, ease: "power4.in", immediateRender: false }, DIE);
      // la tira de película pasa: tomas 1 a 16
      tl.fromTo(q(".s06-tira"), { x: 0 }, { x: -1680, duration: FUR - ESTO + 0.2, ease: "power2.in", immediateRender: false }, ESTO);
      tl.to(q(".s06-tira"), { x: -2160, duration: 0.6, ease: "power3.out" }, FUR + 0.2);
      // a toda velocidad
      qa(".s06-v").forEach((el, i) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 1, x: 300 }, { opacity: 0, x: -300, duration: 0.35, repeat: 3, ease: "none", immediateRender: false }, RAP + i * 0.07); });
      golpe(".s06-parte", FUR, { desde: 2.6 });
      tiembla(".s06-parte", FUR + 0.1, 0.9, 5, 0.04);
      sacudon(FUR, 1.2);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 0.8, sfx: "tiza", vol: 0.3 },
  { t: 1.9, sfx: "whoosh-cinematic", vol: 0.3, max: 1.5 },
  { t: 3.95, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
] });
