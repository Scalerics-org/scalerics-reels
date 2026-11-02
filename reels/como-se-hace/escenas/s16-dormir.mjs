export const css = `
P .s16-z { font-size: 70px; }
P .s16-z1 { left: 700px; top: 860px; }
P .s16-z2 { left: 770px; top: 780px; font-size: 90px; }
P .s16-z3 { left: 850px; top: 680px; font-size: 110px; }`;
export const html = `
<div class="fx-titulo hueso s16-z s16-z1">z</div>
<div class="fx-titulo hueso s16-z s16-z2">Z</div>
<div class="fx-titulo hueso s16-z s16-z3">Z</div>`;
export const svg = (F) => {
  const cajas = [0, 1, 2, 3, 4].map((k) => `<g class="s16-cj">${F.caja(-80 + k * 240, 1220, 120, 90, { texto: "LISTO", fs: 24 })}</g>`).join("");
  return `${F.engranaje(170, 720, 100, 11, { cls: "s16-e1", fill: F.VER, linea: "#2f7a0a" })}${F.engranaje(330, 640, 60, 8, { cls: "s16-e2" })}
    <g class="s16-dor"><rect x="330" y="860" width="420" height="200" rx="80" fill="${F.HUE}" stroke="${F.INK}" stroke-width="8" transform="rotate(-10 540 960)"/>
      <g transform="rotate(-10 540 1320)">${F.operario(540, 1330, 0.9, { cara: "dormido", parche: "GUSTAVO" })}</g></g>
    ${F.cinta(40, 1310, 1000, { patas: 110 })}${cajas}`;
};
export const js = `
const ANDANDO = 1.13, GUSTAVO = 1.99, DORMIR = 2.95;
K.correr(0, DUR, 220);
tl.fromTo(qa(".s16-cj"), { x: 0 }, { x: 240 * 3, duration: DUR, ease: "none" }, 0);
K.girar(".s16-e1", 0, DUR, 220);
K.girar(".s16-e2", 0, DUR, -360);
K.sacudon(q(".s16-e1"), ANDANDO, 0.4);
gsap.set(q(".s16-dor"), { opacity: 0 });
tl.fromTo(q(".s16-dor"), { opacity: 1, y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.2)", immediateRender: false }, GUSTAVO - 0.2);
K.flotar(q(".s16-dor"), GUSTAVO + 0.4, DUR - GUSTAVO - 0.5, 8, 1.2);
[".s16-z1", ".s16-z2", ".s16-z3"].forEach((s, i) => {
  K.pop(q(s), DORMIR - 0.3 + i * 0.25);
  tl.to(q(s), { y: -40, duration: 1.2, ease: "sine.out" }, DORMIR + i * 0.25);
});`;
export const sfx = [{ t: 0.1, sfx: "chime", vol: 0.2 }, { t: 1.9, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 2.9, sfx: "ronquido", vol: 0.3, max: 1.2 }];
