export default {
  css: `.s05-globo { left: 560px; top: 620px; width: 420px; font-size: 64px; }
.s05-tacha { left: 560px; top: 620px; font-size: 64px; }
.s05-cal { position: absolute; left: 650px; top: 930px; width: 300px; height: 300px; background: #f3ead6; border: 6px solid #0d0f14; border-radius: 12px; box-shadow: 0 14px 40px rgba(0,0,0,0.5); text-align: center; overflow: hidden; }
.s05-cal b { display: block; height: 80px; background: #ff3b47; font-family: "Cinzel", serif; font-weight: 900; font-size: 52px; line-height: 84px; color: #f3ead6; letter-spacing: 0.06em; }
.s05-cal span { display: block; margin-top: 12px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 130px; line-height: 1; color: #0d0f14; }
.s05-tela { left: 600px; top: 890px; width: 400px; height: 400px; }`,
  html: `<div class="or-globo s05-globo">TENGO 15</div>
<div class="s05-cal"><b>MARZO</b><span>1</span></div>
<svg class="s05-tela" viewBox="0 0 400 400" aria-hidden="true"><g stroke="#f3ead6" stroke-width="3" fill="none" opacity="0.85"><path class="s05-t" d="M380 20 L230 170"/><path class="s05-t" d="M380 20 L260 40"/><path class="s05-t" d="M380 20 L370 160"/><path class="s05-t" d="M300 30 C290 60 330 80 375 90"/><path class="s05-t" d="M280 60 C270 100 320 130 372 130"/><path class="s05-t" d="M250 120 C260 150 300 160 330 120"/></g></svg>`,
  svg: "OR.planilla(300, 1520, 1.05, { celda: '15' }) + `<g class=\"s05-x\" stroke=\"${OR.ROJO}\" stroke-width=\"14\" stroke-linecap=\"round\"><path d=\"M580 640 L990 730\"/><path d=\"M580 730 L990 640\"/></g><text class=\"s05-q\" x=\"335\" y=\"1440\" text-anchor=\"middle\" font-family=\"Lexend\" font-weight=\"800\" font-size=\"80\" fill=\"${OR.ROJO}\">¿?</text>`",
  anim: `const QUINCE = 0.34, TENIA = 1.47, MARZO = 3.21;
// cuadro 0: la planilla habla, orgullosa
tl.fromTo(q(".or-p"), { y: 20 }, { y: 0, duration: 0.4, ease: "power2.out" }, 0);
K.hablar(q(".or-p-boca"), 0.0, 4, 0.1);
K.pop(q(".s05-globo"), QUINCE - 0.1);
// la celda C se agranda
tl.fromTo(q(".or-p-celda"), { scale: 1 }, { scale: 1.6, svgOrigin: "33 -90", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, QUINCE);
// "tenía": tachado rojo, celda que se vacía
qa(".s05-x path").forEach((p, i) => K.dibujar(p, TENIA - 0.05 + i * 0.1, 0.18));
tl.to(q(".or-p-celda"), { opacity: 0, duration: 0.1 }, TENIA);
gsap.set(q(".s05-q"), { opacity: 0 });
K.popSvg(q(".s05-q"), TENIA + 0.1, "335 1410");
tl.to(q(".or-p-cejas"), { y: 12, duration: 0.15 }, TENIA);
K.sacudon(q(".or-p"), TENIA, 0.8);
// "marzo": el almanaque viejo con telaraña
K.pop(q(".s05-cal"), 2.5);
tl.fromTo(q(".s05-cal"), { rotation: -8 }, { rotation: 4, duration: 0.5, ease: "back.out(3)", immediateRender: false }, 2.5);
qa(".s05-t").forEach((p, i) => K.dibujar(p, MARZO - 0.1 + i * 0.08, 0.3));
tl.to(q(".s05-globo"), { opacity: 0.35, duration: 0.2 }, 2.5);
K.hablar(q(".or-p-boca"), 2.5, 4, 0.1);`,
  sfx: [{ t: 0.3, sfx: "pop", vol: 0.3 }, { t: 1.45, sfx: "chirrido", vol: 0.35 }, { t: 1.5, sfx: "buzzer", vol: 0.2, max: 0.4 }, { t: 2.5, sfx: "whoosh", vol: 0.2, max: 0.4 }, { t: 3.2, sfx: "tic", vol: 0.3 }],
};
