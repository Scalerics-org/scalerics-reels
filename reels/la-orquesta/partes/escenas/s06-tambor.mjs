export default {
  css: `.s06-tag { left: 600px; top: 700px; font-size: 34px; }`,
  html: `<div class="or-tag s06-tag">PERCUSIÓN</div>`,
  svg: "OR.cuaderno(500, 1540, 1.12, { num: '' }) + `<g class=\"s06-golpes\" stroke=\"${OR.BRON2}\" stroke-width=\"8\" stroke-linecap=\"round\"><path d=\"M250 1300 l-60 -30\"/><path d=\"M250 1340 l-70 0\"/><path d=\"M750 1300 l60 -30\"/><path d=\"M750 1340 l70 0\"/></g>`",
  anim: `const PERC = 0.16, CUADERNO = 1.2, CAJA = 2.24;
// cuadro 0: el cuaderno sube al escenario con su tambor
tl.fromTo(q(".or-c"), { y: 80, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
K.pop(q(".s06-tag"), PERC);
K.vaiven(q(".or-c-baq1"), "-130 -330", PERC, -20, 5, 0.07);
K.vaiven(q(".or-c-baq2"), "130 -330", PERC + 0.07, 20, 5, 0.07);
qa(".s06-golpes path").forEach((p, i) => K.dibujar(p, PERC + 0.1 + i * 0.05, 0.15));
tl.fromTo(q(".or-c-tambor"), { y: 0 }, { y: 6, duration: 0.07, yoyo: true, repeat: 9, immediateRender: false }, PERC);
// "cuaderno": se le abren los ojos, salta
tl.fromTo(q(".or-c-cuerpo"), { y: 0 }, { y: -40, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, CUADERNO);
tl.fromTo(qa(".or-c .or-pupila"), { scale: 1 }, { scale: 1.5, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, CUADERNO);
// "caja": un golpe seco
K.vaiven(q(".or-c-baq2"), "130 -330", CAJA, 26, 1, 0.08);
K.sacudon(q(".or-c"), CAJA + 0.1, 0.6);`,
  sfx: [{ t: 0.1, sfx: "redoble", vol: 0.35 }, { t: 1.15, sfx: "pop", vol: 0.25 }, { t: 2.3, sfx: "bombo", vol: 0.35, max: 0.6 }],
};
