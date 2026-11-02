import { escena, sfx, duraciones, C, capitan, grumete, porcion } from "./comun.mjs";
const rayos = Array.from({ length: 12 }, (_, i) => `<path d="M0 -150 L0 -230" transform="rotate(${i * 30})" />`).join("");
for (const [id, cfg] of Object.entries({
  "s02-capitan": 1,
})) {
  const dur = duraciones()[id];
  escena({ id, dur,
    css: `
      & .XX-leyenda { top: 590px; font-size: 92px; color: ${C.perg}; }
      & .XX-dona { position: absolute; left: 0; right: 0; top: 1010px; text-align: center; font-size: 76px; color: ${C.perg}; -webkit-text-stroke: 8px ${C.tinta}; paint-order: stroke fill; transform: rotate(-3deg); }
      & .XX-cinta { position: absolute; left: 140px; width: 800px; top: 1000px; padding: 18px 0 12px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 50px; color: ${C.perg}; background: ${C.rojo}; border: 6px solid ${C.tinta}; transform: rotate(-3deg); box-shadow: 8px 10px 0 ${C.tinta}; }
    `,
    body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 850)"><g class="XX-rayos" fill="none" stroke="${C.oro}" stroke-width="12" stroke-linecap="round">${rayos}</g></g>
          <g transform="translate(540 850) scale(1.15)"><g class="XX-porc-g">${porcion("XX")}</g></g>
          <g class="XX-brillos" fill="${C.perg}">
            <path d="M380 700 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 l22 -8 Z" />
            <path d="M720 760 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 l22 -8 Z" />
            <path d="M690 960 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 l16 -6 Z" />
          </g>
          <g class="XX-corona" transform="translate(540 680)"><path class="tinta" fill="${C.oro}" d="M-70 30 L-80 -40 L-40 -6 L0 -56 L40 -6 L80 -40 L70 30 Z" /><circle fill="${C.rojo}" cx="0" cy="6" r="10" /></g>
          <g transform="translate(300 1270) scale(0.82)"><g class="XX-cap-g">${capitan("XX", { brazo: true })}</g></g>
          <g transform="translate(870 1350) scale(0.62)"><g class="XX-gru-g">${grumete("XX")}</g></g>
        </svg>
        <div class="grande XX-leyenda">LA LEGENDARIA</div>
        <div class="XX-dona mano">la fugazzeta de Doña Rosa</div>
        <div class="XX-cinta">LA MEJOR DE MONTEVIDEO</div>
    `,
    js: `
const BUSCAMOS = 0.98, LEGENDARIA = 1.54, FUGAZZETA = 2.0, DONA = 2.92, DICEN = 4.19, MEJOR = 4.85, MONTEVIDEO = 5.54;
// cuadro 0: el capitán entra señalando
tl.fromTo(q(".XX-cap-g"), { x: -260, rotation: -8, transformOrigin: "50% 100%" }, { x: 0, rotation: 0, transformOrigin: "50% 100%", duration: 0.35, ease: "back.out(1.6)" }, 0);
tl.fromTo(q(".XX-cap-brazo"), { rotation: 30, transformOrigin: "0% 100%" }, { rotation: 0, transformOrigin: "0% 100%", duration: 0.3, ease: "back.out(2)" }, 0.1);
hablar(q(".XX-cap-boca"), 0.02, 0.6);
hablar(q(".XX-cap-boca"), BUSCAMOS, 3.6);
hablar(q(".XX-cap-boca"), DICEN, 6.4);
// el grumete se asoma asustado
tl.fromTo(q(".XX-gru-g"), { y: 320 }, { y: 0, duration: 0.3, ease: "back.out(1.8)" }, 0.35);
tl.to(qa(".XX-gru-pupila"), { x: -8, duration: 0.2 }, 0.7);
tl.to(qa(".XX-gru-pupila"), { y: -8, x: -4, duration: 0.2 }, FUGAZZETA);
flotar(q(".XX-gru-g"), 1.0, 6.5, 6, 0.45);
// "la legendaria"
slam(q(".XX-leyenda"), LEGENDARIA);
golpe(LEGENDARIA + 0.04, 10);
// "fugazzeta": la porción sube brillando como un tesoro
gsap.set([q(".XX-porc-g"), q(".XX-rayos")], { opacity: 0 });
tl.fromTo(q(".XX-porc-g"), { opacity: 0, y: 200, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(1.7)", immediateRender: false }, FUGAZZETA - 0.15);
tl.fromTo(q(".XX-rayos"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 0.9, scale: 1, transformOrigin: "50% 50%", duration: 0.3, immediateRender: false }, FUGAZZETA);
tl.fromTo(q(".XX-rayos"), { rotation: 0 }, { rotation: 60, svgOrigin: "0 0", duration: DUR - FUGAZZETA, ease: "none", immediateRender: false }, FUGAZZETA);
tl.to(q(".XX-porc-g"), { rotation: 4, transformOrigin: "50% 50%", duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, FUGAZZETA + 0.4);
qa(".XX-brillos path").forEach((b, i) => {
  gsap.set(b, { opacity: 0 });
  tl.fromTo(b, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, FUGAZZETA + 0.2 + i * 0.25);
});
// "de Doña Rosa"
pop(q(".XX-dona"), DONA - 0.05, 0.5);
// "la mejor de Montevideo": corona y cinta roja
tl.to(q(".XX-dona"), { opacity: 0, y: -20, duration: 0.2 }, DICEN + 0.3);
tl.to(q(".XX-leyenda"), { scale: 0.85, y: -10, transformOrigin: "50% 50%", duration: 0.25 }, DICEN);
pop(q(".XX-corona"), MEJOR - 0.05, 0.3);
slam(q(".XX-cinta"), MONTEVIDEO - 0.1, 1.8);
golpe(MONTEVIDEO, 10);
tl.to(q(".XX-cap-ojo"), { scale: 1.6, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, MONTEVIDEO + 0.3);
`,
  });
  sfx(id, [
    { t: 0.05, sfx: "whoosh-short", vol: 0.3 }, { t: 1.5, sfx: "impact-bass-2", vol: 0.38, max: 0.6 }, { t: 1.95, sfx: "sparkle", vol: 0.4 },
    { t: 2.95, sfx: "pop", vol: 0.25 }, { t: 4.85, sfx: "campanita", vol: 0.3 }, { t: 5.45, sfx: "golpe", vol: 0.3 },
  ]);
}
