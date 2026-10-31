import { malo } from "./pj.mjs";
export const ID = "s01-donde-estabas";
export const CSS = `
  $ .s01-hora { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1150px; font-size: 76px; background: #111815; color: #ffd23f; border-color: #ffd23f; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(290 630) scale(1.4)"><g class="s01-pj">${malo("s01")}</g></g>
        </svg>
        <div class="sello s01-hora">SÁB · 21:14</div>
        <div class="etiqueta s01-et">Caso: la reserva perdida</div>
`;
export const JS = `
      // cuadro 0 ya lleno: el malo se inclina hacia la luz
      tl.fromTo(q(".s01-pj"), { opacity: 0.6, y: 70, scale: 0.94, svgOrigin: "180 540" }, { opacity: 1, y: 0, scale: 1, svgOrigin: "180 540", duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".s01-pj"), { scale: 1.05, svgOrigin: "180 540", duration: 2.0, ease: "none" }, 0.5);
      hablar(".s01-malo-boca", 0.05, 2.6, 0.3);
      // "estabas": se acerca de golpe
      tl.to(q(".s01-pj"), { y: -20, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, 0.25);
      tl.to(q(".s01-malo-cejas"), { y: 6, duration: 0.15 }, 0.2);
      // "nueve y catorce": la hora cae como sello
      golpe(".s01-hora", 1.15, 2.4);
      tl.set(q(".s01-hora"), { rotation: -4 }, 0);
      sacudon(1.2, 0.8);
      pop(".s01-et", 0.4, 0.3);
      parpadeo(".s01-malo-ojos", 2.2);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.35, max: 0.8 },
  { t: 0.25, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.1, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
  { t: 1.12, sfx: "click", vol: 0.3 },
];
