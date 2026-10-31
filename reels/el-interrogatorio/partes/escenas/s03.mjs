import { dueno, sarten } from "./pj.mjs";
export const ID = "s03-cocinando";
export const CSS = `
  $ .s03-cartel { left: 0; right: 0; margin: 0 auto; width: max-content; top: 640px; transform: rotate(-3deg); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(330 740) scale(1.2)"><g class="s03-pj">${dueno("s03")}</g></g>
          <g transform="translate(640 1170) rotate(-10) scale(0.9)"><g class="s03-sarten">${sarten("s03")}</g></g>
          <g class="s03-humo"><path class="l fino s03-h" d="M720 1140 C700 1100 740 1070 720 1030 M780 1130 C760 1090 800 1060 780 1020" stroke-width="5" opacity="0.6" /></g>
        </svg>
        <div class="cartel s03-cartel">¡Estaba cocinando!</div>
        <div class="etiqueta s03-et">Sospechoso: el dueño</div>
`;
export const JS = `
      tl.fromTo(q(".s03-pj"), { y: 80, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      golpe(".s03-cartel", 0.1, 2);
      hablar(".s03-dueno-boca", 0.05, 2.6, 0.3);
      entra(".s03-sarten", 0.15, 200, 0, 0.3);
      tl.to(q(".s03-mila"), { y: -90, rotation: 180, svgOrigin: "130 30", duration: 0.35, ease: "power2.out" }, 0.6);
      tl.to(q(".s03-mila"), { y: 0, duration: 0.3, ease: "bounce.out" }, 0.95);
      dibujar(".s03-h", 0.5, 0.6);
      // gotas de sudor
      qa(".s03-gota").forEach((g, i) => tl.fromTo(g, { y: 0, opacity: 0.9 }, { y: 50, opacity: 0, duration: 0.7, ease: "power1.in" }, 0.8 + i * 0.4));
      qa(".s03-gota").forEach((g, i) => tl.fromTo(g, { y: -10, opacity: 0 }, { y: 50, opacity: 0.9, duration: 0.7, ease: "power1.in", immediateRender: false }, 1.8 + i * 0.3));
      // "oficial": se inclina rogando
      tl.to(q(".s03-pj"), { rotation: -4, svgOrigin: "180 540", duration: 0.2, yoyo: true, repeat: 1 }, 1.9);
      pop(".s03-et", 1.2);
      tl.to(q(".s03-dueno-cejas"), { y: -6, duration: 0.15 }, 1.5);
`;
export const SFX = [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.3, max: 0.5 },
  { t: 0.6, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.0, sfx: "pop", vol: 0.3 },
];
