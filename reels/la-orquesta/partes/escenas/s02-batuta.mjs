export default {
  css: `.s02-cartel { left: 290px; top: 600px; font-size: 64px; }
.s02-tag { left: 700px; top: 1010px; }`,
  html: `<div class="or-cartel s02-cartel">SILENCIO<small>en la sala, por favor</small></div>
<div class="or-tag s02-tag">EL DIRECTOR</div>`,
  svg: "OR.director(540, 1560, 1.15, { podio: 'EL DUEÑO' }) + `<g class=\"s02-brillo\" stroke=\"${OR.CREMA}\" stroke-width=\"8\" stroke-linecap=\"round\"><path d=\"M118 812 l-34 -10 M126 790 l-20 -30 M148 786 l2 -36 M100 836 l-36 8\"/></g>`",
  anim: `const SALA = 0.64, DIRECTOR = 1.44, BATUTA = 2.56;
K.pop(q(".s02-cartel"), 0.0);
tl.to(q(".s02-cartel"), { opacity: 0, y: -20, duration: 0.25 }, DIRECTOR - 0.1);
// cuadro 0: el director ya está, con la batuta baja
K.origen(q(".or-d-brazo"), "-125 -330");
tl.fromTo(q(".or-d-brazo"), { rotation: -62 }, { rotation: -55, duration: 1.2, ease: "sine.inOut" }, 0);
tl.fromTo(q(".or-d"), { y: 30 }, { y: 0, duration: 0.6, ease: "power2.out" }, 0);
// mira a los costados, nervioso
tl.to(qa(".or-d .or-pupila"), { x: -6, duration: 0.15 }, SALA);
tl.to(qa(".or-d .or-pupila"), { x: 6, duration: 0.15 }, SALA + 0.4);
tl.to(qa(".or-d .or-pupila"), { x: 0, duration: 0.15 }, DIRECTOR);
K.pop(q(".s02-tag"), DIRECTOR);
tl.fromTo(q(".or-d-cuerpo"), { scaleY: 1 }, { scaleY: 1.04, svgOrigin: "0 -170", duration: 0.2, yoyo: true, repeat: 1 }, DIRECTOR);
// "batuta": la levanta despacio y brilla la punta
tl.to(q(".or-d-brazo"), { rotation: 0, duration: 0.8, ease: "power3.inOut" }, BATUTA - 0.7);
qa(".s02-brillo path").forEach((p, i) => K.dibujar(p, BATUTA + 0.1 + i * 0.04, 0.2));
tl.to(q(".or-d-cejas"), { y: -10, duration: 0.2 }, BATUTA);`,
  sfx: [{ t: 0.05, sfx: "murmullo", vol: 0.25, max: 0.7 }, { t: 1.4, sfx: "pop", vol: 0.25 }, { t: 2.3, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 2.7, sfx: "sparkle", vol: 0.3 }],
};
