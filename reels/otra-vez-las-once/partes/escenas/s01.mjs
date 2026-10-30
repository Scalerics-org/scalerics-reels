import { radio } from "./pj.mjs";
export const ID = "s01-once";
export const CSS = `
  $ .s01-todas { top: 600px; font-size: 64px; letter-spacing: 0.02em; }
  $ .s01-mismo { top: 1200px; font-size: 92px; }
  $ .s01-salir { top: 1200px; font-size: 104px; color: #ff2d2d; text-shadow: 0 0 36px rgba(255,45,45,0.5); }
`;
export const HTML = `
        <div class="txt s01-todas">Todas las noches</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-lazo">
            <path class="rl s01-arco" d="M540 640 A 470 330 0 1 1 120 840" stroke-width="9" opacity="0.85" />
            <path class="r s01-punta" d="M96 800 L120 860 L168 812 Z" stroke-width="4" />
          </g>
          <g transform="translate(130 720)"><g class="s01-radio">${radio("s01", ["22:59", "23:00"])}</g></g>
        </svg>
        <div class="txt s01-mismo">El mismo día</div>
        <div class="txt s01-salir">No puedo salir</div>
`;
export const JS = `
      const ONCE = 1.1, REVIVO = 1.47, MISMO = 2.2, NO = 3.75, SALIR = 4.1;
      tl.fromTo(ESC, { scale: 1.1 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 48%" }, 0);
      // cuadro 0 lleno: el radio-reloj ya está, el título entra
      tl.fromTo(q(".s01-radio"), { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s01-todas"), { opacity: 0.4, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 0);
      // los dos puntos titilan
      tl.to(q(".s01-seg0-dots"), { opacity: 0.15, duration: 0.25, yoyo: true, repeat: 3, ease: "steps(1)" }, 0);
      // a las once: 22:59 -> 23:00, flash
      tl.set(q(".s01-h0"), { opacity: 0 }, ONCE);
      tl.set(q(".s01-h1"), { opacity: 1 }, ONCE);
      tl.fromTo(q(".s01-disp"), { scale: 1.12, svgOrigin: "520 190" }, { scale: 1, svgOrigin: "520 190", duration: 0.25, ease: "power3.out", immediateRender: false }, ONCE);
      sacudon(ONCE + 0.02, 0.8);
      tl.to(q(".s01-h1"), { opacity: 0.2, duration: 0.18, yoyo: true, repeat: 7, ease: "steps(1)" }, ONCE + 0.3);
      tl.to(q(".s01-todas"), { opacity: 0, y: -20, duration: 0.2 }, REVIVO + 0.5);
      // revivo: el lazo se dibuja alrededor del radio y gira
      dibujar(".s01-arco", REVIVO - 0.05, 0.6);
      pop(".s01-punta", REVIVO + 0.5, 0.2);
      tl.to(q(".s01-lazo"), { rotation: 360, svgOrigin: "540 920", duration: 3.2, ease: "power1.in" }, REVIVO + 0.6);
      golpe(".s01-mismo", MISMO, 2.2);
      // no puedo salir: rojo, sacudón
      tl.to(q(".s01-mismo"), { opacity: 0, duration: 0.12 }, NO - 0.15);
      golpe(".s01-salir", SALIR, 2.4);
      sacudon(SALIR + 0.05, 1.3);
      tl.to(q(".s01-lazo"), { scale: 0.86, svgOrigin: "540 920", duration: 0.5, ease: "power2.in" }, SALIR);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.4, max: 0.8 },
  { t: 1.1, sfx: "glitch-1", vol: 0.32, max: 0.4 },
  { t: 1.45, sfx: "riser", vol: 0.25, max: 1.2 },
  { t: 2.15, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 4.05, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
];
