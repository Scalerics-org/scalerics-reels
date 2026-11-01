export default {
  css: `.s09-hoja { left: 110px; top: 610px; font-size: 44px; transform: rotate(-3deg); }
.s09-no { left: 560px; top: 760px; font-size: 40px; }
.s09-sello { left: 140px; top: 1000px; font-size: 58px; }`,
  html: `<div class="or-cartel s09-hoja">PEDIDOS<small>por mayor</small></div>
<div class="or-globo robot s09-no">ESO NO LO HAGO</div>
<div class="or-sello s09-sello">NO VIENE EN<br>MI VERSIÓN</div>`,
  svg: "OR.caja(560, 1540, 1.0, { txt: 'ERROR 404' })",
  anim: `const PEDIDOS = 0.0, HAGO = 1.49, VIENE = 2.79, VERSION = 3.66;
// cuadro 0: la caja, el director le pasa la partitura de pedidos por mayor
tl.fromTo(q(".s09-hoja"), { x: -300, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: -3, duration: 0.45, ease: "back.out(1.6)" }, 0);
tl.fromTo(q(".or-t"), { y: 10 }, { y: 0, duration: 0.3 }, 0);
// la caja mira la hoja... y no
tl.to(q(".or-t-ojos"), { x: -20, duration: 0.2 }, 0.6);
K.pop(q(".s09-no"), HAGO);
tl.to(q(".or-t-ojos"), { x: 0, scaleY: 0.3, svgOrigin: "0 -508", duration: 0.15 }, HAGO);
tl.to(q(".s09-hoja"), { y: 40, rotation: -14, opacity: 0.5, duration: 0.4, ease: "power2.in" }, HAGO + 0.3);
// "no viene en mi versión": la trompeta se cae y sello
K.origen(q(".or-t-trompeta"), "130 -330");
tl.to(q(".or-t-trompeta"), { rotation: 28, duration: 0.6, ease: "bounce.out" }, VIENE);
K.sello(q(".s09-sello"), VERSION, -4);
K.sacudon(q(".or-t"), VERSION, 0.8);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.5 }, { t: 1.45, sfx: "buzzer", vol: 0.25, max: 0.5 }, { t: 2.8, sfx: "trompeta", vol: 0.35 }, { t: 3.6, sfx: "golpe", vol: 0.35 }],
};
