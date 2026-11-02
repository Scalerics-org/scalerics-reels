import { dueno } from "./pj.mjs";
export const ID = "s08-caja";
export const CSS = `
  $ .s08-no { top: 600px; font-size: 128px; color: #ff2d2d; text-shadow: 0 0 40px rgba(255,45,45,0.45); }
  $ .s08-et { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: 0.16em; color: #ecebe4; white-space: nowrap; text-align: center; width: 320px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- la caja registradora -->
          <g class="s08-caja">
            <path class="b" d="M110 960 H370 L350 1060 H130 Z" />
            <rect class="b" x="150" y="860" width="180" height="100" rx="10" />
            <rect x="172" y="880" width="136" height="44" rx="4" fill="#21a366" />
            <path class="l fino" d="M160 990 H320 M170 1020 H310" />
            <rect class="k" x="180" y="800" width="120" height="60" rx="8" />
          </g>
          <!-- el otro local -->
          <g class="s08-local">
            <rect class="b" x="720" y="860" width="250" height="200" />
            <path class="w" d="M700 860 H990 L975 812 H715 Z" stroke-width="5" />
            <path d="M752 812 L746 860 M810 812 L806 860 M868 812 V860 M926 812 L930 860" stroke="#ff2d2d" stroke-width="22" />
            <rect class="k" x="750" y="900" width="100" height="160" stroke-width="6" />
            <rect class="y" x="870" y="900" width="70" height="70" stroke-width="5" />
          </g>
          <path class="l s08-cable" d="M330 930 C460 1100 640 1100 740 960" style="stroke:#ff2d2d; stroke-width:16px" />
          <g transform="translate(420 1090) scale(0.62)"><g class="s08-due">${dueno("s08")}</g></g>
        </svg>
        <div class="txt ops s08-no">¡El rojo NO!</div>
        <div class="s08-et s08-e1" style="left:80px; top:1088px">CAJA</div>
        <div class="s08-et s08-e2" style="left:685px; top:1088px">OTRO LOCAL</div>
`;
export const JS = `
      const UNE = 1.3, CAJA = 1.6, LOCAL = 2.2;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1.0, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      golpe(".s08-no", 0.05, 2.4);
      sacudon(0.1, 1.5);
      entra(".s08-due", 0.0, 0, 200, 0.25);
      hablar(".s08-due-boca", 0.0, 2.8, 0.3, 0.1);
      tl.to(q(".s08-due-cejas"), { y: -12, duration: 0.15 }, 0);
      pop(".s08-caja", CAJA - 0.2, 0.3);
      pop(".s08-e1", CAJA, 0.25);
      pop(".s08-local", LOCAL - 0.3, 0.3);
      pop(".s08-e2", LOCAL, 0.25);
      dibujar(".s08-cable", UNE, 1.0);
      tl.fromTo(q(".s08-cable"), { opacity: 1 }, { opacity: 0.4, duration: 0.12, yoyo: true, repeat: 3, ease: "steps(1)", immediateRender: false }, LOCAL + 0.4);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 1.4, sfx: "pop", vol: 0.25 },
  { t: 1.9, sfx: "pop", vol: 0.25 },
];
