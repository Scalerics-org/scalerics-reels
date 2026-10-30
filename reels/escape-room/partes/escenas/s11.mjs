import { dueno } from "./pj.mjs";
export const ID = "s11-dueno";
export const CSS = `
  $ .s11-tag { left: 600px; top: 760px; font-size: 32px; color: #39ffd2; border-color: #39ffd2; background: #0c0718; }
  $ .s11-q { position: absolute; left: 0; right: 0; text-align: center; top: 560px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 160px; color: #ff4fd8; text-shadow: 0 0 30px rgba(255, 79, 216, 0.7); line-height: 1; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-esq">
            <path class="l fino s11-tela" d="M60 600 L300 760 M60 600 L200 820 M60 600 L330 640 M60 600 L120 860 M110 640 C150 640 160 690 150 710 M160 680 C220 690 230 740 220 780 M90 700 C110 720 120 760 110 790" />
            <path class="l fino s11-tela" d="M1020 1320 L800 1180 M1020 1320 L860 1130 M1020 1320 L760 1290 M900 1240 C870 1230 860 1200 870 1180 M960 1270 C920 1250 900 1220 900 1190" />
          </g>
          <g transform="translate(333 660) scale(1.15)"><g class="s11-pj">${dueno("s11")}</g></g>
        </svg>
        <div class="sello s11-tag">Recluso: el dueño</div>
        <div class="s11-q">?</div>
`;
export const JS = `
      // sale de la oscuridad
      tl.fromTo(q(".s11-pj"), { opacity: 0.15, scale: 0.9, svgOrigin: "180 540" }, { opacity: 1, scale: 1, svgOrigin: "180 540", duration: 0.7, ease: "power2.out" }, 0);
      tl.fromTo(q(".s11-esq"), { opacity: 0.3 }, { opacity: 1, duration: 0.6 }, 0);
      hablar(".s11-dueno-boca", 0, 0.6, 0.3);
      parpadeo(".s11-dueno-ojos", 0.7);
      golpe(".s11-tag", 0.95, 2);
      tl.set(q(".s11-tag"), { rotation: 4 }, 0);
      hablar(".s11-dueno-boca", 0.9, 2.0, 0.3);
      dibujar(".s11-tela", 1.5, 0.6);
      tl.to(q(".s11-pj"), { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 2.6);
      hablar(".s11-dueno-boca", 2.55, 3.1, 0.3);
      pop(".s11-q", 2.6, 0.4);
      tl.to(q(".s11-q"), { rotation: 10, duration: 0.2, yoyo: true, repeat: 2 }, 3.0);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-cinematic", vol: 0.25, max: 1.2 },
  { t: 0.95, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 2.6, sfx: "pop", vol: 0.3 },
];
