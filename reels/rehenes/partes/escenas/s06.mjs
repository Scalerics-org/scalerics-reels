import { hija } from "./pj.mjs";
export const ID = "s06-hija";
export const CSS = `
  $ .s06-tres { top: 590px; font-size: 140px; color: #ffd60a; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
  $ .s06-noches { top: 740px; font-size: 76px; }
  $ .s06-fria { position: absolute; left: 640px; top: 1190px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.12em; color: #2f6bff; }
  $ .s06-sello { left: 560px; top: 1290px; font-size: 34px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(30 860) scale(1.15)"><g class="s06-hija">${hija("s06")}</g></g>
          <g transform="translate(-40 1400) rotate(-6)"><rect width="560" height="60" fill="#ffd60a" /><text x="20" y="42" font-family="Lexend" font-weight="900" font-size="32" fill="#0a0d14" letter-spacing="2" data-layout-ignore>NO PASAR · NO PASAR</text></g>
          <g class="s06-plato">
            <ellipse class="w" cx="790" cy="1100" rx="200" ry="70" />
            <ellipse class="l" cx="790" cy="1100" rx="150" ry="48" stroke="#141a28" stroke-width="5" />
            <path class="y" d="M700 1095 C700 1060 790 1050 850 1066 C890 1078 880 1120 830 1126 C770 1134 700 1124 700 1095 Z" stroke="#0a0d14" stroke-width="5" />
            <path class="l" d="M1010 1030 V1150 M995 1030 V1070 M1025 1030 V1070 M995 1070 H1025" stroke-width="6" />
          </g>
          <path class="al s06-frio" d="M730 1010 L750 990 M790 1000 L790 970 M850 1010 L830 990" stroke-width="6" />
          <g class="s06-compu">
            <rect class="v" x="620" y="820" width="170" height="120" rx="8" stroke-width="6" />
            <path d="M650 850 H760 M650 880 H760 M650 910 H760 M690 830 V930 M730 830 V930" stroke="#0e2a1e" stroke-width="4" />
            <path class="l" d="M705 940 V962 M670 966 H740" stroke-width="6" />
          </g>
        </svg>
        <div class="txt s06-tres">3 noches</div>
        <div class="s06-fria">CENA: FRÍA</div>
        <div class="sello s06-sello">Frente a la compu</div>
`;
export const JS = `
      const TRES = 0.3, CENA = 1.2, COMPU = 2.0;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "30% 60%" }, 0);
      tl.fromTo(q(".s06-hija"), { opacity: 0.5, y: 80 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)" }, 0);
      hablar(".s06-hija-boca", 0, 2.6, 0.45, 0.1);
      tl.to(q(".s06-hija"), { x: 14, duration: 0.08, yoyo: true, repeat: 9, ease: "none" }, 0.1);
      golpe(".s06-tres", TRES, 2.4);
      sacudon(TRES + 0.05, 1);
      pop(".s06-plato", CENA - 0.15);
      pop(".s06-fria", CENA + 0.2);
      dibujar(".s06-frio", CENA + 0.1, 0.3);
      tl.to(q(".s06-frio"), { opacity: 0, y: -30, duration: 0.6 }, CENA + 0.5);
      pop(".s06-compu", COMPU - 0.1);
      golpe(".s06-sello", COMPU + 0.1, 2);
      tl.set(q(".s06-sello"), { rotation: -6 }, 0);
      sacudon(COMPU + 0.15, 0.6);
`;
export const SFX = [
  { t: 0.25, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
  { t: 1.05, sfx: "pop", vol: 0.3 },
  { t: 1.9, sfx: "pop", vol: 0.28 },
  { t: 2.05, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
];
