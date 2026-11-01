export default {
  css: `.s13-papel { left: 440px; top: 1010px; font-size: 26px; }`,
  html: `<div class="or-tag rojo s13-papel">PEDIDO</div>`,
  svg: "OR.director(540, 1090, 0.58) + OR.atril(220, 1540, 0.78, { tipo: 'planilla', titulo: 'EXCEL', cls: 's13-a1' }) + OR.atril(540, 1540, 0.78, { tipo: 'cuaderno', titulo: 'CUADERNO', cls: 's13-a2' }) + OR.atril(860, 1540, 0.78, { tipo: 'ticket', titulo: 'CAJA', tituloSize: 22, cls: 's13-a3' }) + OR.pentagrama(100, 980, 610, { cls: 's13-enredo', col: OR.ROJO, sw: 4, enredo: 0.7, sep: 14 })",
  anim: `const ARREGLO = 0.26, PASO = 0.88, EXCEL = 1.42, CUADERNO = 2.05, CAJA = 3.12;
// cuadro 0: el director agitado arriba, tres atriles abajo
K.vaiven(q(".or-d-brazo"), "-125 -330", 0, 30, 10, 0.1);
K.vaiven(q(".or-d-brazo2"), "125 -330", 0.05, -30, 10, 0.1);
K.sudar(ARREGLO);
tl.to(q(".or-d-boca"), { scaleY: 2.4, transformOrigin: "50% 50%", duration: 0.1 }, ARREGLO);
qa(".s13-enredo path").forEach((p, i) => K.dibujar(p, 0.1 + i * 0.1, 1.6, "none"));
// el papel salta de atril en atril, cada vez más rápido
K.pop(q(".s13-papel"), PASO - 0.2);
const salto = (x, y, t, d) => {
  tl.to(q(".s13-papel"), { x: x, duration: d, ease: "none" }, t - d);
  tl.to(q(".s13-papel"), { y: y - 160, duration: d / 2, ease: "power2.out" }, t - d);
  tl.to(q(".s13-papel"), { y: y, duration: d / 2, ease: "power2.in" }, t - d / 2);
};
salto(-300, 220, EXCEL, 0.45);
salto(20, 220, CUADERNO, 0.45);
salto(340, 220, CAJA, 0.5);
[[".s13-a1", EXCEL, "220 1540"], [".s13-a2", CUADERNO, "540 1540"], [".s13-a3", CAJA, "860 1540"]].forEach(([s, t, o]) => {
  tl.fromTo(q(s), { rotation: 0 }, { rotation: 5, svgOrigin: o, duration: 0.07, yoyo: true, repeat: 3, immediateRender: false }, t);
});`,
  sfx: [{ t: 0.25, sfx: "golpe", vol: 0.25 }, { t: 1.4, sfx: "whoosh-short", vol: 0.3 }, { t: 2.0, sfx: "whoosh-short", vol: 0.3 }, { t: 3.1, sfx: "whoosh-short", vol: 0.3 }, { t: 3.3, sfx: "chirrido", vol: 0.25 }],
};
