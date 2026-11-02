export const css = `
P .s13-h1 { left: 130px; top: 610px; }
P .s13-h2 { left: 720px; top: 610px; }`;
export const html = `
<div class="fx-tag hueso s13-h1">DE VERDAD</div>
<div class="fx-tag rojo s13-h2">ACÁ</div>`;
export const svg = (F) => {
  const I = F.INK;
  const cajas = [0, 1, 2, 3].map((k) => F.caja(70 + k * 150, 1218, 90, 70, { cls: "s13-cj" })).join("");
  return `<rect x="40" y="680" width="490" height="790" rx="16" fill="${F.ACE}" stroke="${F.HUE}" stroke-width="6"/>
    <rect x="550" y="680" width="490" height="790" rx="16" fill="${F.ACE}" stroke="${F.ROJ}" stroke-width="6"/>
    <defs><clipPath id="s13-cl"><rect x="44" y="684" width="482" height="782" rx="14"/></clipPath><clipPath id="s13-cr"><rect x="554" y="684" width="482" height="782" rx="14"/></clipPath></defs>
    <g clip-path="url(#s13-cl)">
      ${F.engranaje(110, 760, 60, 8, { cls: "s13-e1", fill: F.AMA })}${F.engranaje(460, 800, 46, 7, { cls: "s13-e2" })}
      <g class="s13-cajas">${cajas}</g>
      ${F.cinta(50, 1290, 470, { patas: 90, cls: "s13-cin" })}
      ${F.brazo(380, 1460, 0.75, { cls: "s13-br", espejo: true })}
    </g>
    <g clip-path="url(#s13-cr)">
      ${F.reloj(960, 790, 56, 23, 0)}
      <g class="s13-op">${F.operario(780, 1470, 0.72, { cara: "cansado", celular: true })}</g>
    </g>`;
};
export const js = `
const FABRICAS = 1.08, ESTO = 1.91, MAQUINAS = 3.83;
K.pop(q(".s13-h2"), 0.0);
K.pop(q(".s13-h1"), FABRICAS - 0.15);
// la fábrica de verdad trabaja sola
K.correr(FABRICAS, DUR - FABRICAS, 140, "s13-cin");
tl.fromTo(q(".s13-cajas"), { x: 0 }, { x: 150 * 3, duration: DUR - FABRICAS, ease: "none", immediateRender: false }, FABRICAS);
K.girar(".s13-e1", 0, DUR, 300);
K.girar(".s13-e2", 0, DUR, -380);
const a = q(".s13-br .fx-br-a");
gsap.set(a, { svgOrigin: "0 -56" });
[FABRICAS, ESTO + 0.3, MAQUINAS - 0.2].forEach((t) => tl.fromTo(a, { rotation: 0 }, { rotation: -22, duration: 0.35, yoyo: true, repeat: 1, ease: "power2.inOut", immediateRender: false }, t));
// acá: Gustavo suspira
K.flotar(q(".s13-op"), 0.2, DUR - 0.5, 6, 1.4);
tl.to(q(".s13-op"), { y: 16, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, MAQUINAS + 0.1);`;
export const sfx = [{ t: 1.0, sfx: "powerup", vol: 0.2, max: 0.8 }, { t: 2.2, sfx: "click", vol: 0.25 }, { t: 3.7, sfx: "click", vol: 0.25 }, { t: 4.0, sfx: "uuh", vol: 0.2, max: 1.0 }];
