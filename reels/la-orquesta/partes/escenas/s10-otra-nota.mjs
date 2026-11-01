export default {
  css: `.s10-ruego { left: 90px; top: 620px; font-size: 44px; }
.s10-error { left: 470px; top: 760px; font-size: 38px; border-color: #ff3b47; color: #ff3b47; }
.s10-premium { left: 520px; top: 900px; font-size: 54px; border-color: #e0ab5c; }`,
  html: `<div class="or-globo s10-ruego">¡OTRA NOTA!</div>
<div class="or-globo robot s10-error">NOTA NO RECONOCIDA</div>
<div class="or-cartel s10-premium">PREMIUM<small>actualice y pague</small></div>`,
  svg: "OR.director(280, 1560, 0.78, { podio: 'EL DUEÑO' }) + OR.caja(790, 1530, 0.78, { txt: 'V1.0' })",
  anim: `const TROMPETA = 0.27, TOCA = 1.06, NOTA = 2.31, RECONOCIDA = 3.05, PREMIUM = 4.75;
K.origen(q(".or-d-brazo"), "-125 -330");
gsap.set(q(".or-d-brazo"), { rotation: 40 });
K.origen(q(".or-d-brazo2"), "125 -330");
// cuadro 0: el director le reclama a la caja
tl.fromTo(q(".or-d"), { x: -40 }, { x: 0, duration: 0.3, ease: "power2.out" }, 0);
tl.to(q(".or-d-brazo2"), { rotation: -50, duration: 0.25, ease: "back.out(2)" }, TROMPETA - 0.1);
K.hablar(q(".or-d-boca"), 0.05, 6, 0.1);
tl.to(q(".or-d-cejas"), { y: 8, rotation: 0, duration: 0.15 }, TROMPETA);
// "¡tocá otra nota!": ruega
K.pop(q(".s10-ruego"), TOCA);
tl.fromTo(q(".or-d-brazo"), { rotation: 40 }, { rotation: 60, duration: 0.1, yoyo: true, repeat: 5, immediateRender: false }, TOCA);
K.sudar(TOCA + 0.2);
// "nota no reconocida": pantalla roja
K.pop(q(".s10-error"), NOTA);
tl.to(q(".s10-ruego"), { opacity: 0.3, duration: 0.2 }, NOTA);
tl.to(qa(".or-t-ojos rect"), { fill: OR.ROJO, duration: 0.05 }, NOTA);
tl.fromTo(q(".or-t-ojos"), { opacity: 1 }, { opacity: 0.2, duration: 0.07, yoyo: true, repeat: 5, immediateRender: false }, RECONOCIDA);
K.sacudon(q(".or-t"), RECONOCIDA, 0.6);
// "actualice a premium": cartel dorado, el director se agarra la cabeza
K.pop(q(".s10-premium"), PREMIUM - 0.35);
tl.fromTo(q(".s10-premium"), { rotation: -6 }, { rotation: 3, duration: 0.4, ease: "back.out(3)", immediateRender: false }, PREMIUM - 0.35);
tl.to(q(".or-d-brazo2"), { rotation: -150, duration: 0.3, ease: "power2.out" }, PREMIUM);
tl.to(q(".or-d-cabeza"), { y: 16, rotation: -6, svgOrigin: "0 -380", duration: 0.3 }, PREMIUM);
tl.to(q(".s10-error"), { opacity: 0.3, duration: 0.2 }, PREMIUM - 0.35);`,
  sfx: [{ t: 0.25, sfx: "golpe", vol: 0.25 }, { t: 1.05, sfx: "pop", vol: 0.25 }, { t: 2.3, sfx: "buzzer", vol: 0.3, max: 0.6 }, { t: 3.0, sfx: "glitch-1", vol: 0.25 }, { t: 4.4, sfx: "moneda", vol: 0.3 }, { t: 4.8, sfx: "uuh", vol: 0.25, max: 1.2 }],
};
