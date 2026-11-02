import { dueno, celular } from "./pj.mjs";
export const ID = "s05-mensajito";
export const CSS = `
  $ .s05-cartel { left: 90px; top: 1160px; font-size: 46px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 640) scale(1.0)"><g class="s05-pj">${dueno("s05", { b: "abierta" })}</g></g>
          <g transform="translate(590 600) scale(1.1)"><g class="s05-cel">${celular("s05")}
            <text x="40" y="110" class="lex6" font-size="28" fill="#efeadf">Clienta</text>
            <text x="150" y="420" text-anchor="middle" class="mono" font-size="22" fill="#9aa3b8">hace 2 días</text>
            <g class="s05-burb">
              <rect x="40" y="140" width="200" height="70" rx="20" fill="#efeadf" />
              <text x="58" y="186" class="lex6" font-size="34" fill="#0b1020">¿Precio?</text>
            </g>
            <text x="230" y="230" text-anchor="end" class="mono" font-size="22" fill="#3d7bff">visto</text>
            <path class="azl" d="M200 250 L212 262 L236 236 M218 250 L230 262 L254 236" stroke-width="5" />
            <g class="s05-lupa">
              <circle cx="140" cy="176" r="88" fill="none" stroke="#ffc23a" stroke-width="10" />
              <path d="M204 238 L262 300" stroke="#ffc23a" stroke-width="18" stroke-linecap="round" />
            </g>
          </g></g>
        </svg>
        <div class="cartel s05-cartel">¡Era un mensajito!</div>
        <div class="etiqueta s05-et">La defensa</div>
`;
export const JS = `
      tl.fromTo(q(".s05-pj"), { y: 40, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s05-dueno-boca", 0.0, 2.1, 0.4);
      tl.to(q(".s05-dueno-cejas"), { y: -10, duration: 0.15 }, 0.05);
      entra(".s05-cel", 0.15, 160, 0, 0.3);
      pop(".s05-et", 0.3);
      // "mensajito": la lupa sobre el mensaje chiquito
      pop(".s05-lupa", 0.6, 0.3, { transformOrigin: "50% 50%" });
      tl.fromTo(q(".s05-burb"), { scale: 1, svgOrigin: "135 172" }, { scale: 1.25, svgOrigin: "135 172", duration: 0.25, immediateRender: false }, 0.7);
      // "nomás": cartel, brazos
      pop(".s05-cartel", 0.95, 0.35);
      tl.set(q(".s05-cartel"), { rotation: -3 }, 0);
      tl.to(q(".s05-pj"), { rotation: 4, svgOrigin: "180 540", duration: 0.15, yoyo: true, repeat: 3 }, 1.4);
`;
export const SFX = [
  { t: 0.15, sfx: "notification", vol: 0.3 },
  { t: 0.6, sfx: "pop", vol: 0.25 },
  { t: 1.4, sfx: "click-soft", vol: 0.3 },
];
