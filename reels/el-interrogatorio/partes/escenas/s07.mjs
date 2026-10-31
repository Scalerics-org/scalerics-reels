import { foto } from "./pj.mjs";
export const ID = "s07-prueba-dos";
let franjas = "";
for (let i = 0; i < 8; i++) franjas += `<rect x="${22 + i * 74.5}" y="22" width="37" height="96" fill="#efeadf" />`;
const cabeza = (x, y, i) => `<g class="s07-cab s07-c${i}"><circle cx="${x}" cy="${y}" r="38" class="piel" stroke-width="5" /><path d="M${x - 14} ${y + 8} C${x - 6} ${y + 18} ${x + 6} ${y + 18} ${x + 14} ${y + 8}" class="d" stroke-width="5" /><circle cx="${x - 12}" cy="${y - 6}" r="5" fill="#111815" /><circle cx="${x + 12}" cy="${y - 6}" r="5" fill="#111815" /></g>`;
const mesa = `
      <rect x="22" y="22" width="556" height="96" fill="#e5484d" />${franjas}
      <rect x="160" y="128" width="280" height="50" rx="6" fill="#111815" stroke="#efeadf" stroke-width="4" class="s07-cartel" />
      <text x="300" y="163" text-anchor="middle" class="mono s07-cartel" font-size="28" letter-spacing="2" fill="#ffd23f">EL DE ENFRENTE</text>
      ${cabeza(150, 300, 1)}${cabeza(450, 300, 2)}${cabeza(110, 410, 3)}${cabeza(490, 410, 4)}
      <ellipse cx="300" cy="420" rx="200" ry="56" class="m" stroke-width="5" />
      <g class="s07-torta">
        <rect x="236" y="340" width="128" height="70" rx="10" class="w" stroke-width="4" />
        <path d="M236 366 H364" stroke="#e5484d" stroke-width="8" />
        <path d="M270 340 V310 M300 340 V304 M330 340 V310" stroke="#efeadf" stroke-width="6" stroke-linecap="round" />
        <circle cx="270" cy="300" r="7" fill="#ffd23f" /><circle cx="300" cy="294" r="7" fill="#ffd23f" /><circle cx="330" cy="300" r="7" fill="#ffd23f" />
      </g>
      <text x="300" y="562" text-anchor="middle" class="mano" font-size="44" fill="#111815">Prueba 2 · sáb 21:15</text>
      <ellipse class="rl s07-circ" cx="300" cy="153" rx="186" ry="48" stroke-width="8" />
      <path class="rl s07-flecha" d="M-170 20 C-80 60 0 110 96 146 M96 146 L46 154 M96 146 L76 100" stroke-width="9" />`;
export const CSS = ``;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 760) scale(0.55)"><g class="s07-f1">${foto("s07a", { w: 640, h: 610, rot: -8 })}</g></g>
          <g transform="translate(300 650)"><g class="s07-foto">${foto("s07", { w: 600, h: 600, rot: 3, contenido: mesa })}</g></g>
        </svg>
        <div class="etiqueta s07-et">Prueba Nº 2</div>
`;
export const JS = `
      tl.fromTo(q(".s07-f1"), { opacity: 1 }, { opacity: 0.35, duration: 0.3 }, 0);
      tl.fromTo(q(".s07-foto"), { opacity: 0, x: 500, rotation: 14, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, rotation: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "power3.out" }, 0);
      pop(".s07-et", 0.3);
      tl.to(q(".s07-foto"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, 1.0);
      // "mesa": la torta; "cuatro": las cuatro caras felices
      pop(".s07-torta", 2.05, 0.35);
      qa(".s07-cab").forEach((c, i) => pop(c, 2.6 + i * 0.12, 0.3));
      tl.to(qa(".s07-cab"), { y: -10, duration: 0.18, yoyo: true, repeat: 3, stagger: 0.08 }, 3.2);
      // "enfrente": círculo rojo y flecha
      dibujar(".s07-circ", 3.65, 0.4);
      dibujar(".s07-flecha", 3.75, 0.35);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh", vol: 0.28 },
  { t: 0.4, sfx: "click", vol: 0.3 },
  { t: 2.05, sfx: "pop", vol: 0.3 },
  { t: 2.6, sfx: "sparkle", vol: 0.25, max: 0.8 },
  { t: 3.65, sfx: "whoosh-short", vol: 0.25 },
];
