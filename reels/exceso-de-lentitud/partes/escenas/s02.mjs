import { dueno } from "./pj.mjs";
import { velo } from "./velo.mjs";
export const ID = "s02-tranquilo";
export const CSS = `
  $ .s02-cartel { left: 470px; top: 1170px; font-size: 44px; transform-origin: 50% 50%; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 700) scale(1.15)"><g class="s02-pj">${dueno("s02", { b: "sonrisa" })}</g></g>
          <g transform="translate(770 940)"><g class="s02-velo">${velo("s02", { r: 190 })}</g></g>
        </svg>
        <div class="cartel s02-cartel">¡Venía tranquilo!</div>
        <div class="etiqueta s02-et">El conductor</div>
`;
export const JS = `
      tl.fromTo(q(".s02-pj"), { x: -60, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      hablar(".s02-dueno-boca", 0.0, 0.9, 0.5);
      hablar(".s02-dueno-boca", 1.1, 2.2, 0.5);
      pop(".s02-velo", 0.2, 0.4, { transformOrigin: "50% 50%" });
      pop(".s02-et", 0.3);
      // la aguja pegada en LENTO, temblando
      gsap.set(q(".s02-aguja"), { rotation: -78, svgOrigin: "0 0" });
      tl.fromTo(q(".s02-aguja"), { rotation: -78, svgOrigin: "0 0" }, { rotation: -70, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0.6);
      // "tranquilo": cartel y sonrisa forzada
      pop(".s02-cartel", 1.3, 0.35);
      tl.set(q(".s02-cartel"), { rotation: -4 }, 0);
      tl.to(qa(".s02-gota"), { opacity: 0.85, duration: 0.15 }, 1.8);
      tl.to(qa(".s02-gota"), { y: 40, duration: 0.8, ease: "power1.in" }, 1.9);
      tl.to(q(".s02-pj"), { rotation: -3, svgOrigin: "180 540", duration: 0.3, yoyo: true, repeat: 1 }, 1.8);
      parpadeo(".s02-dueno-ojos", 1.0);
`;
export const SFX = [
  { t: 0.2, sfx: "pop", vol: 0.25 },
  { t: 1.3, sfx: "click-soft", vol: 0.3 },
  { t: 1.8, sfx: "glitch-1", vol: 0.15, max: 0.3 },
];
