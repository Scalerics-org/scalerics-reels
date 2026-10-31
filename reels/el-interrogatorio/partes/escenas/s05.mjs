import { malo, taza, carpeta } from "./pj.mjs";
export const ID = "s05-golpe";
export const CSS = `
  $ .s05-pum { position: absolute; left: 0; right: 0; top: 650px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; color: #ffd23f; transform: rotate(-6deg); letter-spacing: -0.02em; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-a">
            <g transform="translate(300 800) scale(1.1)"><g class="s05-pj">${malo("s05", { b: "abierta" })}</g></g>
            <g transform="translate(250 1140)"><g class="s05-puno">
              <path class="piel" d="M0 40 C0 10 20 0 50 0 H150 C180 0 200 20 200 50 V140 C200 170 180 190 150 190 H50 C20 190 0 170 0 140 Z" stroke-width="6" />
              <path class="d" d="M50 0 V70 M100 0 V70 M150 0 V70" stroke-width="5" opacity="0.4" />
              <path class="w" d="M40 -30 H160 V10 H40 Z" stroke-width="5" />
            </g></g>
            <g class="s05-rayas"><path class="yl s05-r" d="M200 1180 L130 1130 M200 1250 L110 1260 M470 1180 L540 1120 M470 1250 L560 1260" /></g>
            <g transform="translate(720 1200)"><g class="s05-taza">${taza("s05")}</g></g>
          </g>
          <g transform="translate(280 880)"><g class="s05-carpeta">${carpeta("s05", "PRUEBA Nº 1")}</g></g>
        </svg>
        <div class="s05-pum">¡PUM!</div>
        <div class="etiqueta s05-et">El policía malo</div>
`;
export const JS = `
      tl.fromTo(q(".s05-pj"), { y: 40, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.2 }, 0);
      hablar(".s05-malo-boca", 0, 1.0, 0.3);
      // el puño baja de golpe
      gsap.set(q(".s05-puno"), { opacity: 0 });
      tl.fromTo(q(".s05-puno"), { opacity: 1, y: -420 }, { opacity: 1, y: 0, duration: 0.16, ease: "power4.in", immediateRender: false }, 0.0);
      dibujar(".s05-r", 0.16, 0.15);
      golpe(".s05-pum", 0.22, 2);
      sacudon(0.17, 1.6);
      // la taza salta y vuelca
      tl.to(q(".s05-taza"), { y: -200, rotation: 160, svgOrigin: "70 100", duration: 0.4, ease: "power2.out" }, 0.18);
      tl.to(q(".s05-taza"), { y: 40, x: 200, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.58);
      sale(".s05-pum", 1.2);
      pop(".s05-et", 0.5);
      // "Prueba número uno": la carpeta cae sobre la mesa
      tl.to(qa(".s05-a"), { opacity: 0.25, duration: 0.3 }, 1.6);
      gsap.set(q(".s05-carpeta"), { opacity: 0 });
      tl.fromTo(q(".s05-carpeta"), { opacity: 1, y: -700, rotation: -12, svgOrigin: "260 190" }, { opacity: 1, y: 0, rotation: -3, svgOrigin: "260 190", duration: 0.3, ease: "power3.in", immediateRender: false }, 1.65);
      sacudon(1.96, 0.7);
      hablar(".s05-malo-boca", 1.74, 2.6, 0.3);
`;
export const SFX = [
  { t: 0.14, sfx: "impact-bass-2", vol: 0.45, max: 0.9 },
  { t: 0.16, sfx: "glitch-1", vol: 0.2, max: 0.25 },
  { t: 0.5, sfx: "click", vol: 0.3 },
  { t: 1.94, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
];
