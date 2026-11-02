export const css = `
P .s02-cartel { left: 230px; top: 640px; width: 620px; }
P .s02-tag { left: 90px; top: 960px; }`;
export const html = `
<div data-layout-allow-overlap class="fx-cartel s02-cartel"><span class="fx-cadena" style="left:70px"></span><span class="fx-cadena" style="right:70px"></span><small>ESTACIÓN 1</small><b>RECEPCIÓN</b></div>
<div class="fx-tag s02-tag">MATERIA PRIMA</div>`;
export const svg = (F) => {
  const I = F.INK;
  const tubo = "M1120 700 C980 700 900 760 880 860 C860 960 800 1010 720 1010";
  const [gl] = F.globo(400, 975, "Mensaje nuevo", "i", { fs: 30, cls: "s02-gl" });
  return `<path d="${tubo}" fill="none" stroke="${I}" stroke-width="118" stroke-linecap="butt"/>
    <path d="${tubo}" fill="none" stroke="${F.ACE2}" stroke-width="96"/>
    <path d="${tubo}" fill="none" stroke="${F.ACE3}" stroke-width="10" opacity="0.5" transform="translate(0 -26)"/>
    ${gl}
    <rect x="690" y="940" width="40" height="140" rx="8" fill="${F.AMA}" stroke="${I}" stroke-width="7"/>
    ${F.cinta(90, 1330, 900, { patas: 110, cls: "s02-c" })}
    <g class="s02-cajon">${F.caja(470, 1180, 260, 150, { texto: "RECEPCIÓN", fs: 28 })}</g>
    <path class="s02-fl" d="M330 1050 C360 1120 400 1170 456 1200" fill="none" stroke="${F.AMA}" stroke-width="9" stroke-linecap="round"/>
    <path class="s02-fl2" d="M428 1176 L458 1202 L420 1214" fill="none" stroke="${F.AMA}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
};
export const js = `
const LLEGA = 1.42, MATERIA = 2.33;
K.bajar(q(".s02-cartel"), 0.0);
K.correr(0, DUR, 90);
// el mensaje asoma en la boca del tubo y cae al cajón
gsap.set(q(".s02-gl"), { opacity: 0 });
tl.fromTo(q(".s02-gl"), { opacity: 1, x: 200, y: -40 }, { x: 0, y: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, LLEGA - 0.25);
tl.to(q(".s02-gl"), { x: -20, y: 230, rotation: -8, duration: 0.35, ease: "power2.in", svgOrigin: "533 1010" }, LLEGA + 0.15);
K.sacudon(q(".s02-cajon"), LLEGA + 0.5, 0.6);
K.pop(q(".s02-tag"), MATERIA - 0.1);
K.dibujar(q(".s02-fl"), MATERIA + 0.05, 0.3);
K.dibujar(q(".s02-fl2"), MATERIA + 0.3, 0.15);`;
export const sfx = [{ t: 0.05, sfx: "golpe", vol: 0.3, max: 0.6 }, { t: 1.2, sfx: "whoosh-short", vol: 0.3 }, { t: 1.95, sfx: "pop", vol: 0.35 }, { t: 2.25, sfx: "click", vol: 0.3 }];
