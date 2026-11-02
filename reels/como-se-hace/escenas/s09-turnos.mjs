export const css = `
P .s09-tag { left: 90px; top: 640px; font-size: 44px; }
P .s09-q { left: 300px; top: 820px; font-size: 150px; }`;
export const html = `
<div class="fx-tag s09-tag">TURNOS: 1</div>
<div class="fx-titulo s09-q">?</div>`;
export const svg = (F) => `${F.reloj(820, 790, 120, 8, 0, { cls: "s09-rj" })}
  <g class="s09-op">${F.operario(370, 1480, 0.98, { cara: "cansado", celular: true })}</g>
  <g class="s09-mic">${F.microfono(690, 1110, -18)}</g>`;
export const js = `
const UNO = 2.18, OCHO = 3.13, TERMINA = 3.83, QUE = 4.63;
tl.fromTo(q(".s09-op"), { y: 40 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
// el micrófono del documentalista entra desde la derecha
tl.fromTo(q(".s09-mic"), { x: 520 }, { x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0.0);
tl.to(q(".s09-mic"), { x: -30, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, UNO - 0.3);
K.hablar(".fx-op-boca", UNO, 2, 0.1);
K.sello(q(".s09-tag"), UNO, -3);
K.pop(q(".s09-rj"), OCHO - 0.35);
// termina... las agujas corren de 8 a 23
gsap.set(q(".fx-rj-h"), { rotation: 240, svgOrigin: "820 790" });
gsap.set(q(".fx-rj-m"), { rotation: 0, svgOrigin: "820 790" });
tl.fromTo(q(".fx-rj-h"), { rotation: 240 }, { rotation: 690, duration: 0.9, ease: "power2.inOut", immediateRender: false }, TERMINA - 0.1);
tl.fromTo(q(".fx-rj-m"), { rotation: 0 }, { rotation: 5400, duration: 0.9, ease: "power2.inOut", immediateRender: false }, TERMINA - 0.1);
K.hablar(".fx-op-boca", OCHO - 0.4, 4, 0.1);
K.sello(q(".s09-q"), QUE, 8);
tl.fromTo(q(".s09-q"), { rotation: 8 }, { rotation: -8, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, QUE + 0.15);`;
export const sfx = [{ t: 0.0, sfx: "whoosh", vol: 0.25, max: 0.5 }, { t: 2.18, sfx: "tic", vol: 0.35 }, { t: 3.73, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 4.63, sfx: "pop", vol: 0.35 }];
