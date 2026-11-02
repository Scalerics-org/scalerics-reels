export const css = `
P .s11-tag { left: 680px; top: 900px; font-size: 34px; }`;
export const html = `<div class="fx-tag s11-tag">LA FÁBRICA</div>`;
export const svg = (F) => {
  const I = F.INK;
  const pollo = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="62" ry="44" fill="#b8742e" stroke="${I}" stroke-width="7"/><path d="M${x - 30} ${y - 18} Q${x} ${y - 34} ${x + 30} ${y - 18}" fill="none" stroke="#e0a25a" stroke-width="7" stroke-linecap="round"/>`;
  const fondo = `<g class="s11-rot">
    <rect x="300" y="630" width="480" height="120" rx="12" fill="${F.HUE}" stroke="${I}" stroke-width="8"/>
    <text x="540" y="712" text-anchor="middle" font-family="Black Ops One" font-size="70" fill="${F.ROJ}">ROTISERÍA</text></g>
    <g class="s11-spiedo"><rect x="800" y="820" width="220" height="440" rx="14" fill="${F.ACE}" stroke="${I}" stroke-width="8"/>
      <path d="M820 900 L1000 900 M820 1040 L1000 1040 M820 1180 L1000 1180" stroke="${F.ACE3}" stroke-width="8"/>
      ${pollo(910, 900)}${pollo(910, 1040)}${pollo(910, 1180)}
      <rect x="800" y="1240" width="220" height="40" fill="#e5484d" opacity="0.5"/></g>
    <g class="s11-menu"><rect x="60" y="840" width="220" height="300" rx="10" fill="${I}" stroke="${F.ACE3}" stroke-width="7"/>
      <text x="170" y="900" text-anchor="middle" font-family="Black Ops One" font-size="34" fill="${F.AMA}">MENÚ</text>
      <text x="90" y="960" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${F.HUE}">POLLO</text>
      <text x="90" y="1010" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${F.HUE}">MILANESA</text>
      <text x="90" y="1060" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${F.HUE}">PAPAS</text></g>`;
  const flat = (x, cls, gx, gy) => `<g class="${cls}"><rect x="${x}" y="620" width="300" height="850" fill="${F.ACE2}" stroke="${I}" stroke-width="8"/>
    <path d="M${x} 1050 L${x + 300} 1050" stroke="${F.ACE}" stroke-width="10"/>
    ${F.engranaje(gx, gy, 95, 10, { fill: F.AMA })}${F.engranaje(gx + 60, gy + 190, 60, 8)}
    <path d="M${x + 20} 1200 L${x + 280} 1200 L${x + 280} 1260 L${x + 20} 1260 Z" fill="${F.ACE}" stroke="${I}" stroke-width="6"/>
    <path d="M${x + 20} 1300 L${x + 280} 1300" stroke="${F.AMA}" stroke-width="14" stroke-dasharray="26 18"/></g>`;
  // el parche "OPERARIO" que tapa "GUSTAVO" (operario en 540,1480 escala 1.05)
  const tapa = `<g class="s11-tapa"><rect x="454" y="1370" width="172" height="53" rx="8" fill="${F.HUE}" stroke="${I}" stroke-width="5"/>
    <text x="540" y="1407" text-anchor="middle" font-family="Black Ops One" font-size="29" fill="${F.AZU}">OPERARIO</text></g>`;
  return fondo + flat(10, "s11-fl", 150, 820) + flat(770, "s11-fr", 920, 800) +
    `<g class="s11-op">${F.operario(540, 1480, 1.05, { cara: "cansado", parche: "GUSTAVO" })}${tapa}</g>` +
    `<path class="s11-fl2" d="M800 975 C800 1030 760 1060 700 1080" fill="none" stroke="${F.AMA}" stroke-width="10" stroke-linecap="round"/>
     <path class="s11-fl3" d="M730 1056 L698 1082 L738 1094" fill="none" stroke="${F.AMA}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
};
export const js = `
const GUSTAVO = 0.17, ROTISERIA = 1.21, FABRICA = 2.34, YO = 2.95;
tl.fromTo(q(".s11-op"), { y: 30 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
// "Gustavo": el parche de OPERARIO se da vuelta
K.origen(q(".s11-tapa"), "540 1396");
tl.to(q(".s11-tapa"), { scaleY: 0, duration: 0.2, ease: "power2.in" }, GUSTAVO + 0.1);
K.hablar(".fx-op-boca", 0.0, 5, 0.12);
// "rotisería": asoma el cartel de verdad
gsap.set(q(".s11-rot"), { opacity: 0 });
K.popSvg(q(".s11-rot"), ROTISERIA - 0.1, "540 690", 0.35, 0.4);
// "La fábrica soy yo": el decorado de fábrica se cae
K.origen(q(".s11-fl"), "10 1470");
K.origen(q(".s11-fr"), "1070 1470");
tl.to(q(".s11-fl"), { rotation: -88, duration: 0.5, ease: "power3.in" }, FABRICA);
tl.to(q(".s11-fr"), { rotation: 88, duration: 0.5, ease: "power3.in" }, FABRICA + 0.08);
tl.to(qa(".s11-fl, .s11-fr"), { opacity: 0, duration: 0.15 }, FABRICA + 0.5);
K.sacudon(q(".s11-escenario"), FABRICA + 0.55, 1);
K.hablar(".fx-op-boca", FABRICA, 4, 0.1);
K.pop(q(".s11-tag"), YO - 0.05);
K.dibujar(q(".s11-fl2"), YO + 0.05, 0.25);
K.dibujar(q(".s11-fl3"), YO + 0.28, 0.12);`;
export const sfx = [{ t: 0.25, sfx: "click", vol: 0.3 }, { t: 1.15, sfx: "pop", vol: 0.3 }, { t: 2.75, sfx: "golpe", vol: 0.45, max: 0.8 }, { t: 2.95, sfx: "impact-bass-2", vol: 0.35, max: 0.8 }];
