export default {
  css: `.s08-tag { left: 120px; top: 640px; font-size: 34px; }
.s08-fab { left: 120px; top: 730px; font-size: 30px; }`,
  html: `<div class="or-tag s08-tag">TROMPETA</div>
<div class="or-tag rojo s08-fab">DE FÁBRICA</div>`,
  svg: "OR.caja(400, 1530, 1.1, { txt: 'SISTEMA V1.0' }) + OR.nota(840, 880, 0.7, OR.BRON2, 's08-n') + OR.nota(900, 980, 0.6, OR.BRON2, 's08-n')",
  anim: `const TROMPETA = 0.16, SISTEMA = 0.96, VINO = 1.52, CAJA = 1.92;
// cuadro 0: la caja registradora entra con su trompeta
tl.fromTo(q(".or-t"), { x: 140, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
K.pop(q(".s08-tag"), TROMPETA);
K.vaiven(q(".or-t-trompeta"), "130 -330", TROMPETA + 0.1, -6, 2, 0.12);
K.notasVuelan(".s08-n", TROMPETA + 0.2, 40, -90);
// "sistema": la pantalla parpadea
tl.fromTo(q(".or-t-ojos"), { opacity: 1 }, { opacity: 0.2, duration: 0.08, yoyo: true, repeat: 3, immediateRender: false }, SISTEMA);
tl.fromTo(q(".or-t-txt"), { scale: 1 }, { scale: 1.3, svgOrigin: "0 -456", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, SISTEMA);
// "vino con la caja": etiqueta de fábrica
K.sello(q(".s08-fab"), VINO + 0.1, -4);
tl.fromTo(q(".or-t-cajon"), { x: 0 }, { x: 40, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, CAJA);`,
  sfx: [{ t: 0.1, sfx: "whoosh", vol: 0.2, max: 0.4 }, { t: 0.3, sfx: "trompeta", vol: 0.25, max: 0.35 }, { t: 0.95, sfx: "blip", vol: 0.3 }, { t: 1.55, sfx: "golpe", vol: 0.3 }, { t: 1.95, sfx: "ficha", vol: 0.3 }],
};
