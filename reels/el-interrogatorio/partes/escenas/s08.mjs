import { celular } from "./pj.mjs";
export const ID = "s08-un-minuto";
export const CSS = `
  $ .s08-sello { left: 560px; top: 1090px; font-size: 70px; background: rgba(17, 24, 21, 0.9); color: #ffd23f; border-color: #ffd23f; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(250 640) scale(0.98)"><g class="s08-cel">
            ${celular("s08")}
            <text x="150" y="104" text-anchor="middle" class="lex6" font-size="24" fill="#efeadf">El de enfrente</text>
            <path d="M30 124 H270" stroke="#efeadf" stroke-width="2" opacity="0.3" />
            <g class="s08-in">
              <rect x="34" y="146" width="210" height="96" rx="18" fill="#efeadf" />
              <text x="52" y="184" class="lex6" font-size="21" fill="#111815">¿Tienen mesa</text>
              <text x="52" y="214" class="lex6" font-size="21" fill="#111815">para cuatro?</text>
              <text x="232" y="234" text-anchor="end" class="mono" font-size="15" fill="#5b6b62">21:14</text>
            </g>
            <g class="s08-out">
              <rect x="56" y="266" width="214" height="128" rx="18" fill="#ffd23f" />
              <text x="74" y="304" class="lex6" font-size="21" fill="#111815">¡Sí! Mesa para</text>
              <text x="74" y="334" class="lex6" font-size="21" fill="#111815">4, a las 21:30.</text>
              <text x="74" y="364" class="lex6" font-size="21" fill="#111815">¡Feliz cumple!</text>
              <text x="258" y="386" text-anchor="end" class="mono" font-size="15" fill="#111815">21:15</text>
            </g>
          </g></g>
          <g class="s08-flecha"><path class="yl s08-f" d="M640 820 C720 840 760 900 760 990" stroke-width="8" /><path class="yl s08-f" d="M740 960 L760 995 L785 962" stroke-width="8" /></g>
        </svg>
        <div class="sello s08-sello">1 minuto</div>
        <div class="etiqueta s08-et">Respuesta del de enfrente</div>
`;
export const JS = `
      tl.fromTo(q(".s08-cel"), { opacity: 0.5, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s08-in"), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0);
      pop(".s08-out", 0.3, 0.35, { transformOrigin: "100% 0%" });
      pop(".s08-et", 0.4);
      dibujar(".s08-f", 0.7, 0.35);
      golpe(".s08-sello", 1.16, 2.2);
      tl.set(q(".s08-sello"), { rotation: 6 }, 0);
      sacudon(1.2, 0.6);
`;
export const SFX = [
  { t: 0.3, sfx: "notification", vol: 0.35 },
  { t: 1.12, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
