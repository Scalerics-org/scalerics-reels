import { inspectora, libreta } from "./pj.mjs";
import { filas } from "./acta.mjs";
export const ID = "s06-libreta";
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(10 790) scale(0.86)"><g class="s06-pj">${inspectora("s06")}</g></g>
          <g transform="translate(470 640) scale(1.18)"><g class="s06-acta">${libreta("s06")}${filas("s06")}</g></g>
        </svg>
        <div class="etiqueta s06-et">Control de documentos</div>
`;
export const JS = `
      tl.fromTo(q(".s06-acta"), { opacity: 0.6, y: 60, rotation: 4, svgOrigin: "230 300" }, { opacity: 1, y: 0, rotation: -2, svgOrigin: "230 300", duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s06-pj"), { x: -40 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      hablar(".s06-ins-boca", 0.0, 1.2, 0.3);
      hablar(".s06-ins-boca", 2.3, 4.2, 0.3);
      pop(".s06-et", 0.3);
      gsap.set(qa(".s06-f3, .s06-f4, .s06-nofig, .s06-desp, .s06-preg"), { opacity: 0 });
      // "Libreta" ✓, "papeles" ✓
      dibujar(".s06-ok1", 0.3, 0.25);
      dibujar(".s06-ok2", 1.0, 0.25);
      // "¿Horarios?": la fila; "No figuran": cruz y texto rojo
      tl.to(q(".s06-f3"), { opacity: 1, duration: 0.2 }, 2.3);
      tl.to(q(".s06-pj"), { y: -10, duration: 0.2, yoyo: true, repeat: 1 }, 2.3);
      dibujar(".s06-x3", 3.5, 0.2);
      gsap.set(qa(".s06-circ"), { opacity: 0 });
      tl.fromTo(q(".s06-nofig"), { opacity: 0, scale: 1.8, svgOrigin: "360 316" }, { opacity: 1, scale: 1, svgOrigin: "360 316", duration: 0.18, ease: "power4.in", immediateRender: false }, 3.55);
      sacudon(3.7, 0.5);
      parpadeo(".s06-ins-ojos", 1.6);
      tl.to(q(".s06-acta"), { rotation: 0, svgOrigin: "230 300", duration: 3, ease: "none" }, 0.5);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 0.3, sfx: "click-soft", vol: 0.3 },
  { t: 1.0, sfx: "click-soft", vol: 0.3 },
  { t: 3.5, sfx: "glitch-1", vol: 0.22, max: 0.4 },
];
