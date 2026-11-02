// s04-corten: "¡Corten!" de la directora con megáfono; claqueta 14 tachado -> 15; "celular en silencio"; clac.
import { escena, duracion, directora, megafono, claqueta, celular, COL } from "./comun.mjs";
const id = "s04-corten", dur = duracion(id);
const pant = `<g transform="translate(0 -6)"><path d="M-30 20 Q-30 -30 0 -34 Q30 -30 30 20 L40 30 L-40 30 Z" fill="none" stroke="${COL.ink}" stroke-width="8" stroke-linejoin="round" /><circle cx="0" cy="42" r="8" fill="${COL.ink}" /><path class="s04-tacha" d="M-46 -40 L46 52" stroke="${COL.rojo}" stroke-width="10" stroke-linecap="round" /></g>`;
const svg = `
  ${claqueta({ cls: "s04-cla", x: 690, y: 1000, s: 0.95, rot: 4, toma: "15", viejo: "14" })}
  ${directora({ id: "s04-dir", x: 290, y: 1580, s: 0.95, cara: "grita", extra: megafono("s04-mega") })}
  ${celular({ cls: "s04-cel", x: 820, y: 1400, s: 0.8, rot: 8, pantalla: pant })}
`;
const html = `
  <div class="barra s04-cor">¡CORTEN!</div>
  <div class="tag s04-tag">EN SILENCIO</div>`;
const css = `
  P .s04-cor { left: 60px; top: 590px; font-size: 140px; color: ${COL.blanco}; background: ${COL.rojo}; transform: rotate(-4deg); }
  P .s04-tag { left: 700px; top: 1560px; font-size: 28px; }
`;
const js = `
      const COR = 0, TOMA = 0.87, QUI = 1.03, CEL = 2.15, SIL = 2.76, ACC = 4.37;
      golpe(".s04-cor", 0.1, { desde: 2.4 });
      sacudon(0.1, 1.5);
      tiembla(".s04-cor", 0.3, 1.0, 5, 0.05);
      entra(".s04-dir", 0, { y: 300 }, 0.3);
      habla(".s04-dir-boca", 0, 0.6, 0.08, 0.5);
      habla(".s04-dir-boca", TOMA, 2.4, 0.1, 0.5);
      habla(".s04-dir-boca", ACC - 0.05, 0.5, 0.08, 0.5);
      tiembla(".s04-mega", 0, 0.7, 4, 0.04);
      pop(".s04-cla", 0.3, { desde: 0.6 });
      dibujar(".s04-cla-tacha", TOMA, 0.25);
      tl.fromTo(q(".s04-cla-num"), { opacity: 0, scale: 1.8, svgOrigin: "150 110" }, { opacity: 1, scale: 1, svgOrigin: "150 110", duration: 0.2, ease: "power4.in", immediateRender: false }, QUI);
      gsap.set(q(".s04-cla-num"), { opacity: 0 });
      pop(".s04-cel", CEL, { desde: 0.4, o: "0 0" });
      dibujar(".s04-tacha", SIL, 0.3);
      pop(".s04-tag", SIL + 0.1, { desde: 0.6 });
      clac(".s04-cla-barra", ACC + 0.05, 24);
      flash(ACC + 0.05, 0.6);
      sacudon(ACC + 0.06, 1.1);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
  { t: 0.87, sfx: "tiza", vol: 0.3 },
  { t: 2.76, sfx: "click", vol: 0.35 },
  { t: 4.42, sfx: "claqueta", vol: 0.6 },
] });
