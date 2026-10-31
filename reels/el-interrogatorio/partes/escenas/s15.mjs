import { reloj, agente, dueno } from "./pj.mjs";
export const ID = "s15-cualquier-hora";
export const CSS = `
  $ .s15-hora { position: absolute; left: 0; right: 0; text-align: center; top: 1160px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 72px; letter-spacing: 0.08em; color: #ffd23f; }
  $ .s15-h2 { color: #5ce611; opacity: 0; }
  $ .s15-globo { position: absolute; left: 330px; top: 700px; padding: 14px 24px; background: #5ce611; color: #111815; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-a">
            <g transform="translate(540 900)"><g class="s15-reloj">${reloj("s15", { r: 200, h: 9, m: 14 })}</g></g>
            <g class="s15-luna"><path class="y" d="M840 650 C800 670 790 740 840 770 C780 780 740 730 750 680 C760 640 810 620 840 650 Z" stroke-width="5" /></g>
          </g>
          <g class="s15-b">
            <g transform="translate(90 860) scale(0.8)"><g class="s15-ag">${agente("s15")}</g></g>
            <g transform="translate(690 940) scale(0.75)"><g class="s15-pj">${dueno("s15", { b: "sonrisa" })}</g></g>
            <path class="sl s15-flecha" d="M360 1000 C450 940 560 940 650 1000 M650 1000 L604 1000 M650 1000 L634 958" stroke-width="9" />
          </g>
        </svg>
        <div class="s15-hora s15-h1">21:14</div>
        <div class="s15-hora s15-h2">03:00</div>
        <div class="s15-globo">Te paso con el dueño</div>
        <div class="etiqueta s15-et">A cualquier hora</div>
        <div class="etiqueta s15-et2">Y si es para vos, te avisa</div>
`;
export const JS = `
      tl.fromTo(q(".s15-reloj"), { scale: 0.8, opacity: 0.5, svgOrigin: "0 0" }, { scale: 1, opacity: 1, svgOrigin: "0 0", duration: 0.3, ease: "back.out(1.6)" }, 0);
      pop(".s15-h1", 0.3);
      pop(".s15-et", 0.2);
      // "tres de la mañana": las agujas giran
      tl.fromTo(q(".s15-am"), { rotation: 84, svgOrigin: "0 0" }, { rotation: 360 * 5, svgOrigin: "0 0", duration: 0.7, ease: "power2.inOut", immediateRender: false }, 1.2);
      tl.fromTo(q(".s15-ah"), { rotation: 277, svgOrigin: "0 0" }, { rotation: 450, svgOrigin: "0 0", duration: 0.7, ease: "power2.inOut", immediateRender: false }, 1.2);
      tl.to(q(".s15-h1"), { opacity: 0, duration: 0.15 }, 1.75);
      tl.fromTo(q(".s15-h2"), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.2, immediateRender: false }, 1.85);
      pop(".s15-luna", 1.9, 0.35);
      // "Y si es para vos": el agente le pasa la charla al dueño
      tl.to(qa(".s15-a, .s15-h2"), { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" }, 2.5);
      sale(".s15-et", 2.5);
      gsap.set(q(".s15-b"), { opacity: 0 });
      tl.to(q(".s15-b"), { opacity: 1, duration: 0.01 }, 2.65);
      gsap.set(q(".s15-flecha"), { opacity: 0 });
      entra(".s15-ag", 2.65, -150, 0, 0.3);
      entra(".s15-pj", 2.75, 150, 0, 0.3);
      pop(".s15-et2", 2.65);
      pop(".s15-globo", 3.3, 0.3);
      dibujar(".s15-flecha", 3.6, 0.35);
      tl.to(q(".s15-globo"), { x: 220, y: 60, scale: 0.8, duration: 0.45, ease: "power2.inOut" }, 3.95);
      tl.to(q(".s15-pj"), { y: -16, duration: 0.18, yoyo: true, repeat: 1 }, 4.3);
`;
export const SFX = [
  { t: 0.3, sfx: "click", vol: 0.25 },
  { t: 1.2, sfx: "whoosh", vol: 0.25 },
  { t: 1.85, sfx: "chime", vol: 0.25, max: 0.7 },
  { t: 3.3, sfx: "pop", vol: 0.28 },
  { t: 4.0, sfx: "whoosh-short", vol: 0.25 },
];
