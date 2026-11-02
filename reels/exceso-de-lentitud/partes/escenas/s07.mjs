import { dueno, libreta } from "./pj.mjs";
import { filas } from "./acta.mjs";
export const ID = "s07-despues";
export const CSS = `
  $ .s07-cartel { left: 610px; top: 1215px; font-size: 46px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 640) scale(1.1)"><g class="s07-acta">${libreta("s07")}${filas("s07")}</g></g>
          <g transform="translate(640 770) scale(0.95)"><g class="s07-pj">${dueno("s07", { b: "mueca" })}</g></g>
        </svg>
        <div class="cartel s07-cartel">Y... después.</div>
        <div class="etiqueta s07-et">Control de documentos</div>
`;
export const JS = `
      // cuadro 0: el acta de la escena anterior, ya con horarios tachados
      tl.fromTo(q(".s07-acta"), { x: 380, rotation: 0, svgOrigin: "230 300" }, { x: 0, rotation: -2, svgOrigin: "230 300", duration: 0.35, ease: "power3.out" }, 0);
      pop(".s07-et", 0.2);
      gsap.set(qa(".s07-desp, .s07-preg, .s07-circ"), { opacity: 0 });
      // "¿Precio?" fila (ya está) que late
      tl.fromTo(q(".s07-f4"), { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, 0.05);
      // "después te paso": manuscrito
      tl.fromTo(q(".s07-desp"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, 1.4);
      // "¿Cuándo es después?": círculo rojo y signo
      tl.set(q(".s07-circ"), { opacity: 1 }, 3.0);
      dibujar(".s07-circ", 3.0, 0.45);
      pop(".s07-preg", 3.45, 0.3, { transformOrigin: "50% 50%" });
      tl.to(q(".s07-preg"), { rotation: 14, svgOrigin: "425 545", duration: 0.2, yoyo: true, repeat: 3 }, 3.8);
      // "Y... después.": el dueño asoma, encogido
      entra(".s07-pj", 4.35, 220, 0, 0.3);
      hablar(".s07-dueno-boca", 4.5, 5.4, 0.5);
      tl.to(q(".s07-dueno-cejas"), { y: -8, duration: 0.15 }, 4.5);
      pop(".s07-cartel", 4.75, 0.3);
      tl.set(q(".s07-cartel"), { rotation: 3 }, 0);
      tl.to(qa(".s07-gota"), { opacity: 0.85, duration: 0.15 }, 4.8);
      tl.to(qa(".s07-gota"), { y: 30, duration: 0.7, ease: "power1.in" }, 4.9);
`;
export const SFX = [
  { t: 1.4, sfx: "typing", vol: 0.15, max: 0.6 },
  { t: 3.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 3.45, sfx: "pop", vol: 0.3 },
  { t: 4.35, sfx: "whoosh-short", vol: 0.2 },
  { t: 4.75, sfx: "click-soft", vol: 0.3 },
];
