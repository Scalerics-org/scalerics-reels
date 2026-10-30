import { planilla } from "./pj.mjs";
export const ID = "s14-rindo";
// celdas que se llenan solas (col, fila) en coordenadas de la planilla; global = 156 + 1.2x, 700 + 1.2y
const celdas = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 2], [4, 2], [0, 3], [4, 3]];
const celda = ([c, r], i) => {
  const x = 156 + 1.2 * (64 + 115 * c) + 4, y = 700 + 1.2 * (56 + 77 * r) + 4, w = 1.2 * 115 - 8, h = 1.2 * 77 - 8;
  return `<g class="s14-c"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#21a366" /><path d="M${x + w / 2 - 22} ${y + h / 2} l14 14 l28 -28" fill="none" stroke="#f2f2f2" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></g>`;
};
export const CSS = `
  $ .s14-sola { top: 1380px; font-size: 92px; color: #5ce611; }
  $ .s14-rindo { top: 1380px; font-size: 112px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-bandera">
            <path class="l" d="M880 760 V560" stroke-width="8" />
            <path class="w" d="M884 566 C930 548 960 590 1010 572 V650 C960 668 930 626 884 644 Z" stroke-width="5" />
          </g>
          <g transform="translate(156 700) scale(1.2)"><g class="s14-pl">${planilla("s14")}</g></g>
          ${celdas.map(celda).join("")}
        </svg>
        <div class="txt s14-sola">¿Me lleno sola?</div>
        <div class="txt s14-rindo">Me rindo.</div>
`;
export const JS = `
      const QUE = 0.0, LLENO = 0.8, SOLA = 1.1, ESTA = 1.89, RINDO = 2.8;
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s14-pl"), { opacity: 0.6, scale: 0.95, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2 }, 0);
      // "¿qué?": sorpresa, los ojos rojos se ponen blancos y redondos
      tl.to(qa(".s14-pl-ojo"), { fill: "#f2f2f2", scale: 1.15, transformOrigin: "50% 50%", duration: 0.1 }, QUE + 0.05);
      tl.to(qa(".s14-pl-ceja"), { y: -26, duration: 0.15, ease: "back.out(3)" }, QUE + 0.05);
      tl.to(qa(".s14-pl-pupila"), { scale: 0.6, transformOrigin: "50% 50%", duration: 0.1 }, QUE + 0.05);
      hablar(".s14-pl-boca", 0.05, 1.5, 0.3);
      // las celdas se llenan solas
      gsap.set(qa(".s14-c"), { opacity: 0 });
      qa(".s14-c").forEach((c, i) => tl.fromTo(c, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.14, ease: "back.out(2)", immediateRender: false }, LLENO - 0.2 + i * 0.05));
      tl.to(qa(".s14-pl-pupila"), { x: -24, duration: 0.15, yoyo: true, repeat: 3 }, LLENO);
      golpe(".s14-sola", SOLA, 1.8);
      // "está bien. me rindo.": baja la mirada y sube la bandera blanca
      tl.to(qa(".s14-pl-ceja"), { y: 0, rotation: 0, duration: 0.2 }, ESTA);
      tl.to(qa(".s14-pl-ojo"), { scaleY: 0.45, duration: 0.2 }, ESTA);
      hablar(".s14-pl-boca", ESTA, 3.4, 0.3);
      sale(".s14-sola", RINDO - 0.15, 0.1);
      gsap.set(q(".s14-bandera"), { opacity: 0 });
      tl.fromTo(q(".s14-bandera"), { opacity: 1, y: 220 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, RINDO - 0.3);
      tl.to(q(".s14-bandera"), { rotation: -6, svgOrigin: "880 760", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, RINDO + 0.1);
      golpe(".s14-rindo", RINDO + 0.05, 1.8);
`;
export const SFX = [
  { t: 0.0, sfx: "glitch-2", vol: 0.25, max: 0.4 },
  { t: 0.6, sfx: "sparkle", vol: 0.32 },
  { t: 1.0, sfx: "typing", vol: 0.25, max: 0.8 },
  { t: 2.5, sfx: "whoosh", vol: 0.25 },
  { t: 2.85, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 3.0, sfx: "chime", vol: 0.25 },
];
