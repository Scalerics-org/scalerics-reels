export default {
  css: `.s17-cartel { left: 130px; top: 600px; width: 820px; font-size: 54px; white-space: normal; }
.s17-tag { left: 210px; top: 880px; font-size: 32px; }`,
  html: `<div class="or-cartel s17-cartel">¿QUÉ INSTRUMENTO DESAFINA EN TU LOCAL?</div>
<div class="or-tag verde s17-tag">TE LEEMOS EN LOS COMENTARIOS</div>`,
  pre: `let notas = "";
[[220, 1120], [360, 1060], [700, 1080], [860, 1120], [540, 1010]].forEach(([x, y], i) => { notas += OR.nota(x, y, 0.6, i % 2 ? OR.VERDE : OR.BRON2, "s17-n"); });`,
  svg: "OR.director(540, 1355, 0.5) + OR.planilla(210, 1505, 0.5, { celda: 'OK' }) + OR.cuaderno(420, 1530, 0.44, { num: 'OK' }) + OR.silla(640, 1520, 0.4) + OR.caja(810, 1515, 0.44, { txt: 'A MEDIDA' }) + notas",
  anim: `const QUE = 0.0, DESAFINA = 0.58, LOCAL = 1.25, LEEMOS = 1.77;
// cuadro 0: la orquesta tocando junta
K.pop(q(".s17-cartel"), QUE);
tl.fromTo(q(".s17-cartel"), { rotation: -3 }, { rotation: 0, duration: 0.4, ease: "back.out(3)", immediateRender: false }, QUE);
K.vaiven(q(".or-d-brazo"), "-125 -330", 0.1, 20, 8, 0.25);
K.vaiven(q(".or-p-arco"), "150 -210", 0.1, 10, 10, 0.2);
K.vaiven(q(".or-c-baq1"), "-130 -330", 0.1, -14, 10, 0.2);
K.vaiven(q(".or-c-baq2"), "130 -330", 0.3, 14, 10, 0.2);
K.vaiven(q(".or-t-trompeta"), "130 -330", 0.2, -5, 8, 0.25);
K.notasVuelan(".s17-n", DESAFINA, 40, -100);
tl.fromTo(q(".s17-cartel"), { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, DESAFINA);
K.pop(q(".s17-tag"), LEEMOS - 0.2);
// reverencia final
tl.to(q(".or-d-cuerpo"), { rotation: 12, svgOrigin: "0 -170", duration: 0.4, yoyo: true, repeat: 1, ease: "power2.inOut" }, 3.2);
tl.fromTo(q(".s17-tag"), { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 3, immediateRender: false }, 2.4);`,
  sfx: [{ t: 0.0, sfx: "acorde", vol: 0.3 }, { t: 0.55, sfx: "pop", vol: 0.25 }, { t: 1.6, sfx: "sparkle", vol: 0.25 }, { t: 2.2, sfx: "aplausos", vol: 0.35 }],
};
