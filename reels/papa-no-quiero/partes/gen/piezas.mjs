import { C } from "./base.mjs";
// Cosas del local que se repiten.
export const CARTEL = (p) => `<g class="${p}cartel">
      <path d="M220 560 L170 640 M220 560 L270 640" stroke="${C.crema}" stroke-width="4" opacity="0.6" />
      <rect x="96" y="636" width="250" height="96" rx="10" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" />
      <text x="221" y="700" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="42" fill="${C.crema}">EL HORNO</text>
    </g>`;
export const RELOJ = (p) => `<g class="${p}reloj">
      <circle cx="905" cy="700" r="66" fill="${C.som}" stroke="${C.crema}" stroke-width="6" />
      <path class="${p}aguja" d="M905 700 L905 652" stroke="${C.ama}" stroke-width="6" stroke-linecap="round" />
      <path d="M905 700 L940 712" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
      <circle cx="905" cy="700" r="7" fill="${C.crema}" />
    </g>`;
export const MOSTRADOR = (p, y = 1262) => `<g class="${p}mostrador">
      <rect x="40" y="${y}" width="1000" height="${1500 - y}" fill="${C.tom}" stroke="${C.som}" stroke-width="6" />
      <rect x="40" y="${y - 22}" width="1000" height="30" rx="6" fill="${C.crema}" stroke="${C.som}" stroke-width="5" />
      <path d="M140 ${y + 40} V1480 M340 ${y + 40} V1480 M540 ${y + 40} V1480 M740 ${y + 40} V1480 M940 ${y + 40} V1480" stroke="${C.som}" stroke-width="5" opacity="0.35" />
    </g>`;
// Frente del local (toldo + vidriera + puerta), en coordenadas propias: ancho 840, de y 0 a 860.
export const FRENTE = (p, { x, y, s = 1, tel = true }) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}frente">
      <rect x="0" y="120" width="840" height="740" fill="${C.som}" stroke="${C.crema}" stroke-width="7" />
      <g class="${p}toldo">
        <path d="M-20 0 H860 L860 170 H-20 Z" fill="${C.crema}" />
        <path d="M60 0 V170 H140 V0 Z M220 0 V170 H300 V0 Z M380 0 V170 H460 V0 Z M540 0 V170 H620 V0 Z M700 0 V170 H780 V0 Z" fill="${C.tom}" />
        <path class="${p}faldon" d="M-20 170 H860 V250 Q840 274 818 250 Q796 274 774 250 Q752 274 730 250 Q708 274 686 250 Q664 274 642 250 Q620 274 598 250 Q576 274 554 250 Q532 274 510 250 Q488 274 466 250 Q444 274 422 250 Q400 274 378 250 Q356 274 334 250 Q312 274 290 250 Q268 274 246 250 Q224 274 202 250 Q180 274 158 250 Q136 274 114 250 Q92 274 70 250 Q48 274 26 250 Q4 274 -20 250 Z" fill="${C.crema}" stroke="${C.som}" stroke-width="5" />
        <path d="M-20 0 H860 L860 170 H-20 Z" fill="none" stroke="${C.som}" stroke-width="6" />
        ${tel ? `<text class="${p}tel" x="420" y="232" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="52" fill="${C.som}" letter-spacing="2">TEL. 409 27 13</text>` : ""}
      </g>
      <rect x="60" y="340" width="430" height="400" rx="6" fill="${C.ama}" opacity="0.22" stroke="${C.crema}" stroke-width="6" />
      <text x="275" y="470" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="70" fill="${C.ama}">EL HORNO</text>
      <text x="275" y="530" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="34" fill="${C.crema}" opacity="0.8" data-layout-ignore>PIZZA · FAINÁ</text>
      <rect x="570" y="340" width="210" height="520" rx="6" fill="${C.tom}" opacity="0.8" stroke="${C.crema}" stroke-width="6" />
      <circle cx="750" cy="610" r="10" fill="${C.ama}" />
    </g></g>`;
