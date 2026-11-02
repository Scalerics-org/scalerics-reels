export const ID = "s13-archivo";
export const CSS = `
  $ .s13-negocio { position: absolute; left: 0; right: 0; top: 1290px; text-align: center; font-family: "Black Ops One", sans-serif; font-size: 52px; color: #ecebe4; white-space: nowrap; }
  $ .s13-q { position: absolute; font-family: "Black Ops One", sans-serif; font-size: 80px; color: #ff2d2d; }
`;
// el local entero, colgando de un hilo de un archivo
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- el archivo -->
          <g class="s13-arch">
            <path class="b" d="M440 600 H600 L650 650 V800 H440 Z" style="stroke:#21a366" />
            <path class="l" d="M600 600 V650 H650" style="stroke:#21a366" />
            <rect x="460" y="700" width="170" height="52" rx="6" fill="#21a366" />
            <text x="545" y="736" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="#070807">.XLSX</text>
            <rect x="452" y="766" width="120" height="26" rx="4" fill="#ff2d2d" />
            <text x="512" y="786" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="17" fill="#070807">NO TOCAR</text>
          </g>
          <!-- el hilo -->
          <path class="l s13-hilo" d="M545 800 C548 840 540 870 545 930" stroke-width="4" />
          <path class="l s13-v" d="M545 930 L330 990 M545 930 L760 990" stroke-width="4" />
          <!-- el local -->
          <g class="s13-local">
            <rect class="b" x="300" y="1030" width="490" height="230" />
            <path class="w" d="M280 1030 H810 L790 980 H300 Z" stroke-width="5" />
            <path d="M345 980 L338 1030 M420 980 L416 1030 M495 980 V1030 M570 980 V1030 M645 980 L649 1030 M720 980 L726 1030" stroke="#ffb020" stroke-width="30" />
            <path class="l" d="M280 1030 H810 L790 980 H300 Z" stroke-width="5" />
            <rect class="k" x="330" y="1070" width="230" height="150" stroke-width="5" />
            <path class="l fino" d="M340 1110 H550 M340 1150 H550 M340 1190 H550" />
            <rect class="y fino" x="350" y="1086" width="30" height="24" /><rect class="v fino" x="400" y="1086" width="30" height="24" /><rect class="r fino" x="460" y="1126" width="30" height="24" /><rect class="a fino" x="370" y="1166" width="30" height="24" /><rect class="y fino" x="500" y="1166" width="30" height="24" />
            <rect class="k" x="600" y="1070" width="150" height="190" stroke-width="5" />
            <circle class="w" cx="620" cy="1170" r="7" stroke-width="2" />
          </g>
        </svg>
        <div class="s13-negocio">tu negocio entero</div>
        <div class="s13-q s13-q1" style="left:330px; top:600px">?</div>
        <div class="s13-q s13-q2" style="left:690px; top:610px">?</div>
        <div class="s13-q s13-q3" style="left:380px; top:740px">?</div>
        <div class="s13-q s13-q4" style="left:670px; top:760px">?</div>
`;
export const JS = `
      const BOMBA = 0.61, NEGOCIO = 1.3, DEPENDE = 2.0, ARCHIVO = 2.5, NADIE = 3.4;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.06, duration: DUR, ease: "none", transformOrigin: "50% 40%" }, 0);
      // el local aparece entero, colgado
      tl.fromTo(q(".s13-local"), { opacity: 0.3, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      golpe(".s13-negocio", NEGOCIO, 1.6);
      // se balancea
      tl.to(qa(".s13-local, .s13-v"), { rotation: 3, svgOrigin: "545 930", duration: 0.8, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.2);
      // "depende de un archivo"
      dibujar(".s13-hilo", DEPENDE - 0.2, 0.4);
      dibujar(".s13-v", DEPENDE - 0.1, 0.4);
      pop(".s13-arch", ARCHIVO - 0.1, 0.35);
      // "que no entiende nadie"
      ["1", "2", "3", "4"].forEach((n, i) => pop(".s13-q" + n, 2.95 + i * 0.12, 0.25));
      tl.to(qa(".s13-q"), { rotation: 12, duration: 0.15, yoyo: true, repeat: 5, ease: "none" }, NADIE);
      // el hilo se tensa
      tl.fromTo(q(".s13-hilo"), { strokeWidth: 4 }, { strokeWidth: 2, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, NADIE + 0.2);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.22 },
  { t: 1.3, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 2.4, sfx: "pop", vol: 0.28 },
  { t: 2.95, sfx: "click-soft", vol: 0.25 },
  { t: 3.2, sfx: "click-soft", vol: 0.25 },
];
