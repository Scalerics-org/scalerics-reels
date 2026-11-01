export default {
  css: `.s14-bien { left: 560px; top: 600px; font-size: 42px; }
.s14-dist { left: 230px; top: 1290px; font-size: 44px; }`,
  html: `<div class="or-sello bronce s14-bien">DIRIGE BIEN</div>
<div class="or-sello s14-dist">CADA UNO LA SUYA</div>`,
  svg: "OR.director(540, 1095, 0.6) + OR.atril(210, 1600, 0.95, { tipo: 'planilla', titulo: 'EXCEL', cls: 's14-a1' }) + OR.atril(540, 1600, 0.95, { tipo: 'cuaderno', titulo: 'CUADERNO', cls: 's14-a2' }) + OR.atril(870, 1600, 0.95, { tipo: 'ticket', titulo: 'CAJA', tituloSize: 22, cls: 's14-a3' }) + `<g class=\"s14-neq\" stroke=\"${OR.ROJO}\" stroke-width=\"10\" stroke-linecap=\"round\"><path d=\"M355 1110 L395 1110 M355 1130 L395 1130 M395 1090 L355 1150\"/><path d=\"M685 1110 L725 1110 M685 1130 L725 1130 M725 1090 L685 1150\"/></g>`",
  anim: `const DIRIGE = 0.0, BIEN = 0.4, PERO = 1.32, CADA = 1.84, PARTITURA = 3.28, DISTINTA = 3.76;
// cuadro 0: el director, tranquilo por primera vez
K.origen(q(".or-d-brazo"), "-125 -330");
tl.fromTo(q(".or-d-brazo"), { rotation: 10 }, { rotation: -5, duration: 1.2, ease: "sine.inOut" }, 0);
K.sello(q(".s14-bien"), BIEN, 5);
tl.to(q(".s14-bien"), { opacity: 0, duration: 0.2 }, PERO);
// "a cada músico": aparecen las tres partituras, una por una
[".s14-a1", ".s14-a2", ".s14-a3"].forEach((s, i) => {
  gsap.set(q(s), { opacity: 0 });
  tl.fromTo(q(s), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, CADA - 0.3 + i * 0.25);
});
// "una partitura distinta": signos distinto en rojo y sello
qa(".s14-neq path").forEach((p, i) => K.dibujar(p, PARTITURA + i * 0.15, 0.3));
K.sello(q(".s14-dist"), DISTINTA, -3);
tl.to(q(".or-d-cejas"), { y: -8, duration: 0.2 }, DISTINTA);
tl.fromTo([q(".s14-a1"), q(".s14-a3")], { rotation: 0 }, { rotation: 4, svgOrigin: "540 1600", duration: 0.1, yoyo: true, repeat: 3, immediateRender: false }, DISTINTA);`,
  sfx: [{ t: 0.4, sfx: "campanita", vol: 0.25 }, { t: 1.6, sfx: "pop", vol: 0.2 }, { t: 1.85, sfx: "pop", vol: 0.2 }, { t: 2.1, sfx: "pop", vol: 0.2 }, { t: 3.3, sfx: "chirrido", vol: 0.25 }, { t: 3.75, sfx: "golpe", vol: 0.35 }],
};
