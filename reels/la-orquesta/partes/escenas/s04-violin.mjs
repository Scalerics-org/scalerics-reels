export default {
  css: `.s04-tag { left: 600px; top: 760px; font-size: 34px; }`,
  html: `<div class="or-tag s04-tag">PRIMER VIOLÍN</div>`,
  svg: "OR.planilla(560, 1530, 1.25, { celda: '' }) + OR.nota(860, 950, 0.7, OR.BRON2, 's04-n') + OR.nota(930, 1060, 0.6, OR.BRON2, 's04-n')",
  anim: `const VIOLIN = 0.31, PLANILLA = 0.96, EXCEL = 1.6;
// cuadro 0: la planilla entra con su violín
tl.fromTo(q(".or-p"), { x: -120, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
K.pop(q(".s04-tag"), VIOLIN);
K.vaiven(q(".or-p-arco"), "150 -210", VIOLIN, 12, 4, 0.14);
K.notasVuelan(".s04-n", VIOLIN + 0.2, 40, -100);
// "planilla": reverencia snob
tl.to(q(".or-p"), { rotation: -8, svgOrigin: "560 1530", duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" }, PLANILLA);
tl.to(q(".or-p-cejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, EXCEL);
tl.fromTo(q(".s04-tag"), { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, EXCEL);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.5 }, { t: 0.3, sfx: "pop", vol: 0.25 }, { t: 0.5, sfx: "chirrido", vol: 0.15 }, { t: 1.55, sfx: "campanita", vol: 0.2 }],
};
