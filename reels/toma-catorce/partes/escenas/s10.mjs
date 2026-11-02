// s10-solo: Beto sentado en un cajón, solo, con el celular que le ilumina la cara. "¿Y quién les contesta?"
import { escena, duracion, beto, celular, mano, cono, COL } from "./comun.mjs";
const id = "s10-solo", dur = duracion(id);
const svg = `
  ${cono(540, 560, 1600, 120, 700, "s10-cono", 0.14)}
  <ellipse cx="540" cy="1600" rx="340" ry="44" fill="${COL.ambar}" opacity="0.12" />
  <g class="s10-todo">
  <rect x="360" y="1440" width="360" height="170" rx="10" fill="#6b4a32" stroke="${COL.ink}" stroke-width="7" />
  <path d="M360 1500 L720 1500 M360 1560 L720 1560" stroke="${COL.ink}" stroke-width="5" opacity="0.5" />
  <text x="540" y="1546" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="60" fill="${COL.blanco}" opacity="0.8">BETO</text>
  ${beto({ id: "s10-beto", x: 540, y: 1430, s: 1.0, cara: "triste" })}
  <g class="s10-celg">${celular({ cls: "s10-cel", x: 540, y: 1300, s: 0.6, rot: 0 })}${mano(500, 1360, 0.9, 30)}${mano(580, 1360, 0.9, -30)}</g>
  </g>
`;
const html = `<div class="tag s10-tag">YO SOLO</div>`;
const css = `P .s10-tag { left: 420px; top: 680px; font-size: 40px; background: ${COL.rojo}; color: ${COL.blanco}; }`;
const js = `
      const Y = 0, LES = 0.35, SI = 0.89, SOLO = 1.33;
      tl.fromTo(q(".s10-todo"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      habla(".s10-beto-boca", 0.0, 1.8, 0.1, 0.6);
      tl.fromTo(q(".s10-cel-brillo"), { opacity: 0.08 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      pop(".s10-tag", SOLO, { desde: 1.8 });
      tl.fromTo(q(".s10-cono"), { scaleX: 1, svgOrigin: "540 560" }, { scaleX: 0.7, svgOrigin: "540 560", duration: 1.6, ease: "none", immediateRender: false }, 0.2);
      acerca(".s10-todo", 0, DUR, 1, 1.06, "540 1400");
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 1.33, sfx: "impact-bass-1", vol: 0.25, max: 0.6 },
] });
