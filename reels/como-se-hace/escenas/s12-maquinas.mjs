export const css = `
P .s12-q1 { left: 210px; top: 700px; font-size: 150px; }
P .s12-q2 { left: 760px; top: 700px; font-size: 150px; }
P .s12-v1 { left: 130px; top: 1330px; }
P .s12-v2 { left: 700px; top: 1330px; }`;
export const html = `
<div class="fx-titulo hueso s12-q1">?</div>
<div class="fx-titulo hueso s12-q2">?</div>
<div class="fx-tag hueso s12-v1">VACÍO</div>
<div class="fx-tag hueso s12-v2">VACÍO</div>`;
export const svg = (F) => `${F.brazo(260, 1300, 0.95, { fantasma: true, cls: "s12-b1" })}${F.brazo(820, 1300, 0.95, { fantasma: true, espejo: true, cls: "s12-b2" })}
  <rect x="80" y="1270" width="380" height="40" fill="none" stroke="${F.ACE3}" stroke-width="5" stroke-dasharray="14 12"/>
  <rect x="620" y="1270" width="380" height="40" fill="none" stroke="${F.ACE3}" stroke-width="5" stroke-dasharray="14 12"/>
  <g class="s12-op">${F.operario(540, 1500, 0.72, { cara: "sorpresa", parche: "GUSTAVO" })}</g>`;
export const js = `
const MAQ = 0.26, QUE = 1.04;
tl.fromTo(qa(".s12-b1, .s12-b2"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo(qa(".s12-b1, .s12-b2"), { opacity: 1 }, { opacity: 0.4, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.4);
K.pop(q(".s12-v1"), 0.1);
K.pop(q(".s12-v2"), 0.2);
K.sello(q(".s12-q1"), MAQ + 0.05, -10);
K.sello(q(".s12-q2"), MAQ + 0.2, 10);
gsap.set(q(".s12-op"), { opacity: 0 });
tl.fromTo(q(".s12-op"), { opacity: 1, y: 520 }, { y: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, QUE - 0.2);
K.hablar(".fx-op-boca", QUE, 2, 0.12);
tl.to(q(".s12-q1"), { x: 120, y: 60, duration: 0.3 }, QUE + 0.2);
tl.to(q(".s12-q2"), { x: -120, y: 60, duration: 0.3 }, QUE + 0.2);`;
export const sfx = [{ t: 0.0, sfx: "viento", vol: 0.2, max: 2 }, { t: 0.3, sfx: "pop", vol: 0.3 }, { t: 0.45, sfx: "pop", vol: 0.3 }, { t: 0.9, sfx: "whoosh-short", vol: 0.3 }];
