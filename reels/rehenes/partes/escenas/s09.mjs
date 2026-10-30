import { poli } from "./pj.mjs";
export const ID = "s09-pizzas";
const caja = (i) => `<g class="s09-caja"><rect class="w" x="120" y="${1360 - i * 92}" width="400" height="80" rx="6" stroke="#0a0d14" stroke-width="5" /><text x="320" y="${1360 - i * 92 + 54}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="#ff3b3b" letter-spacing="6">PIZZA</text></g>`;
export const CSS = `
  $ .s09-traigan { top: 590px; font-size: 100px; color: #ffd60a; text-shadow: 0 0 30px rgba(255,214,10,0.4); }
  $ .s09-tiempo { left: 560px; top: 760px; font-size: 38px; background: #0a0d14; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(1060 900) scale(-1.1 1.1)"><g class="s09-poli">${poli("s09")}</g></g>
          ${[0, 1, 2, 3].map(caja).join("")}
          <g class="s09-reloj">
            <circle class="b" cx="320" cy="900" r="80" />
            <path class="l" d="M300 812 H340 M320 812 V820" stroke-width="7" />
            <path class="rl s09-aguja" d="M320 900 V846" stroke-width="8" />
            <circle cx="320" cy="900" r="9" fill="#ff3b3b" />
          </g>
        </svg>
        <div class="txt s09-traigan">¡Traigan pizzas!</div>
        <div class="sello s09-tiempo">Ganemos tiempo</div>
`;
export const JS = `
      const PIZZAS = 0.32, GANEMOS = 0.82, TIEMPO = 1.32;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.fromTo(q(".s09-poli"), { opacity: 0.4, x: -160 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, 0);
      hablar(".s09-poli-boca", 0, 1.8, 0.3, 0.1);
      tl.fromTo(q(".s09-traigan"), { opacity: 0.5, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.out" }, 0);
      // las cajas de pizza caen y se apilan
      qa(".s09-caja").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 1, y: -700 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.in", immediateRender: false }, PIZZAS + i * 0.14);
      });
      sacudon(PIZZAS + 0.25, 0.5); sacudon(PIZZAS + 0.67, 0.7);
      // ganemos tiempo: cronómetro
      pop(".s09-reloj", GANEMOS, 0.3);
      golpe(".s09-tiempo", TIEMPO, 2);
      tl.set(q(".s09-tiempo"), { rotation: -4 }, 0);
      tl.fromTo(q(".s09-aguja"), { rotation: 0, svgOrigin: "320 900" }, { rotation: 720, svgOrigin: "320 900", duration: 1.5, ease: "none", immediateRender: false }, GANEMOS);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh", vol: 0.25 },
  { t: 0.52, sfx: "pop", vol: 0.3 },
  { t: 0.66, sfx: "pop", vol: 0.3 },
  { t: 0.8, sfx: "pop", vol: 0.3 },
  { t: 0.94, sfx: "pop", vol: 0.3 },
  { t: 1.28, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 1.5, sfx: "typing", vol: 0.2, max: 0.6 },
];
