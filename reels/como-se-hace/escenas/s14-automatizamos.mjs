export const css = `
P .s14-cartel { left: 120px; top: 610px; width: 840px; }
P .s14-cartel b { font-size: 64px; }`;
export const html = `
<div data-layout-allow-overlap class="fx-cartel verde s14-cartel"><span class="fx-cadena" style="left:90px"></span><span class="fx-cadena" style="right:90px"></span><small>SCALERICS</small><b>AUTOMATIZACIONES</b></div>`;
export const svg = (F) => {
  const I = F.INK;
  return `<g class="s14-rot"><rect x="300" y="640" width="480" height="120" rx="12" fill="${F.HUE}" stroke="${I}" stroke-width="8"/>
    <text x="540" y="722" text-anchor="middle" font-family="Black Ops One" font-size="70" fill="${F.ROJ}">ROTISERÍA</text></g>
    ${F.engranaje(540, 1060, 190, 14, { cls: "s14-g", fill: F.VER, linea: "#2f7a0a", w: 9 })}
    ${F.engranaje(250, 900, 90, 10, { cls: "s14-g2", fill: F.ACE2 })}
    ${F.engranaje(830, 1230, 100, 10, { cls: "s14-g3", fill: F.ACE2 })}
    <g class="s14-mano"><path d="M480 1460 L470 1360 C468 1340 494 1338 496 1358 L500 1310 C502 1290 528 1290 528 1310 L530 1300 C532 1280 558 1280 558 1300 L560 1314 C562 1296 588 1296 588 1316 L590 1380 C600 1360 626 1366 618 1390 L600 1460 Z" fill="${F.PIEL}" stroke="${I}" stroke-width="8" stroke-linejoin="round"/></g>
    <path class="s14-tacha" d="M420 1290 L660 1470" stroke="${F.VER}" stroke-width="16" stroke-linecap="round"/>`;
};
export const js = `
const TAMBIEN = 1.15, SCALERICS = 2.03, AUTO = 2.84, MANO = 4.17;
// "Y en tu negocio": la rotisería, y el engranaje verde que arranca solo
K.pop(q(".s14-rot"), 0.0);
K.popSvg(q(".s14-g"), 0.15, "540 1060", 0.45, 0.4);
K.girar(".s14-g", 0.4, DUR - 0.4, 260, "power2.in");
K.girar(".s14-g2", 0.6, DUR - 0.6, -420, "power2.in");
K.girar(".s14-g3", 0.6, DUR - 0.6, -380, "power2.in");
K.sacudon(q(".s14-g"), TAMBIEN, 0.5);
// "Scalerics": baja el cartel verde
tl.to(q(".s14-rot"), { opacity: 0, y: -40, duration: 0.2 }, SCALERICS - 0.25);
gsap.set(q(".s14-cartel"), { opacity: 0 });
K.bajar(q(".s14-cartel"), SCALERICS - 0.1);
tl.fromTo(q(".s14-g"), { scale: 1, svgOrigin: "540 1060" }, { scale: 1.08, svgOrigin: "540 1060", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, AUTO);
// "a mano": la mano se tacha
K.pop(q(".s14-mano"), MANO - 0.45);
K.dibujar(q(".s14-tacha"), MANO, 0.3);`;
export const sfx = [{ t: 0.1, sfx: "powerup", vol: 0.25, max: 1.2 }, { t: 1.95, sfx: "golpe", vol: 0.3, max: 0.6 }, { t: 2.84, sfx: "sparkle", vol: 0.25 }, { t: 4.17, sfx: "glitch-1", vol: 0.25, max: 0.4 }];
