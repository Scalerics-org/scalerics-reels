export const css = `
P .s07-fas { left: 0; right: 0; top: 900px; font-size: 112px; }
P .s07-ni { left: 150px; top: 690px; font-size: 54px; }`;
export const html = `
<div class="fx-sello s07-ni">NI ESTA</div>
<div class="fx-titulo s07-fas">¡FASCINANTE!</div>`;
export const svg = (F) => {
  const I = F.INK;
  let cuadros = "";
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) cuadros += `<rect x="${150 + i * 64}" y="${650 + j * 62}" width="54" height="52" rx="6" fill="#7a4a2a" stroke="#4a2a14" stroke-width="5"/>`;
  const choco = `<g class="s07-choco"><rect x="136" y="636" width="290" height="148" rx="12" fill="#5c3418" stroke="${I}" stroke-width="8"/>${cuadros}
    <path d="M330 630 L436 630 L436 790 L360 790 Z" fill="${F.AMA}" stroke="${I}" stroke-width="7" stroke-linejoin="round"/></g>`;
  const gl = (k) => `<g class="s07-gl"><rect x="${-150 + k * 230}" y="1150" width="170" height="70" rx="20" fill="#d9f5c4" stroke="${I}" stroke-width="5"/>
    <text x="${-65 + k * 230}" y="1197" text-anchor="middle" font-family="Black Ops One" font-size="30" fill="${I}">LISTO</text></g>`;
  return choco + F.cinta(40, 1236, 1000, { patas: 140 }) + [0, 1, 2, 3, 4, 5].map(gl).join("") +
    F.engranaje(890, 720, 100, 11, { cls: "s07-e1", fill: F.AMA }) + F.engranaje(760, 640, 60, 8, { cls: "s07-e2" });
};
export const js = `
const CHOCOLATE = 0.87, ASI = 1.95;
K.correr(0, DUR, 520);
tl.fromTo(qa(".s07-gl"), { x: 0 }, { x: 230 * 6, duration: DUR, ease: "none" }, 0);
K.girar(".s07-e1", 0, DUR, 400);
K.girar(".s07-e2", 0, DUR, -640);
K.pop(q(".s07-choco"), CHOCOLATE - 0.3);
K.sello(q(".s07-ni"), CHOCOLATE + 0.25, -10);
K.sello(q(".s07-fas"), ASI, -3);
K.sacudon(q(".s07-escenario"), ASI + 0.05, 0.6);`;
export const sfx = [{ t: 0.0, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 0.6, sfx: "pop", vol: 0.3 }, { t: 1.1, sfx: "golpe", vol: 0.3, max: 0.5 }, { t: 1.95, sfx: "impact-bass-1", vol: 0.35, max: 0.8 }];
