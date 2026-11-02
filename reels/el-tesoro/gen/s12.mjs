import { escena, sfx, duraciones, C, grumete, loro, porcion } from "./comun.mjs";
const id = "s12-llegan", dur = duraciones()[id];
const monedas = [[120, 0], [300, 0.15], [470, 0.05], [640, 0.25], [820, 0.1], [960, 0.3], [210, 0.4], [560, 0.45], [900, 0.55]]
  .map(([x], i) => `<g transform="translate(${x} 0)"><g class="XX-moneda"><ellipse class="tinta" fill="${C.oro}" rx="26" ry="26" /><path fill="none" stroke="${C.tinta}" stroke-width="4" d="M-8 -10 v20 M8 -10 v20" /></g></g>`).join("");
escena({ id, dur,
  css: `
    & .XX-siete { top: 585px; font-size: 104px; }
    & .XX-cuadras { top: 710px; font-size: 92px; color: ${C.perg}; }
    & .XX-fuga { top: 1410px; font-size: 104px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-lluvia">${monedas}</g>
          <g transform="translate(330 1060) scale(1.0)"><g class="XX-gru-g">${grumete("XX", { brazo: true })}
            <g class="XX-cel"><path class="tinta" fill="${C.tinta}" d="M140 -70 h70 v120 h-70 Z" transform="rotate(10 175 -10)" /><path fill="${C.oro}" d="M150 -58 h50 v90 h-50 Z" transform="rotate(10 175 -10)" /></g>
          </g></g>
          <g transform="translate(830 1060) scale(0.8)"><g class="XX-loro-g">${loro("XX")}</g></g>
          <g transform="translate(720 1080) scale(0.5)"><g class="XX-porc-g">${porcion("XX")}</g></g>
        </svg>
        <div class="grande XX-siete">¡ABRE A LAS 7!</div>
        <div class="grande XX-cuadras">¡A DOS CUADRAS!</div>
        <div class="grande XX-fuga">¡FUGAZZETA!</div>
  `,
  js: `
const ABRE = 0.78, SIETE = 1.12, QUEDA = 1.84, CUADRAS = 2.24, F1 = 3.2, F2 = 3.84;
// cuadro 0: el grumete salta con el celular en alto
tl.fromTo(q(".XX-gru-g"), { y: 200 }, { y: 0, duration: 0.3, ease: "back.out(1.8)" }, 0);
hablar(q(".XX-gru-boca"), 0.0, 2.8, 0.1);
tl.to(q(".XX-gru-g"), { y: -40, duration: 0.18, yoyo: true, repeat: 5, ease: "power1.out" }, 0.35);
tl.to(q(".XX-cel"), { rotation: 10, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 9 }, 0.3);
slam(q(".XX-siete"), SIETE);
golpe(SIETE + 0.04, 12);
slam(q(".XX-cuadras"), CUADRAS);
golpe(CUADRAS + 0.04, 12);
// el loro entra con la porción
tl.fromTo(q(".XX-loro-g"), { x: 500, y: -300 }, { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, F1 - 0.5);
gsap.set(q(".XX-porc-g"), { opacity: 0 });
pop(q(".XX-porc-g"), F1 - 0.1, 0.3);
tl.to(q(".XX-porc-g"), { rotation: 10, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 7 }, F1 + 0.2);
[F1, F2].forEach((t) => {
  tl.to(q(".XX-loro-pico"), { rotation: 28, transformOrigin: "0% 0%", duration: 0.09, yoyo: true, repeat: 5 }, t);
  tl.to(q(".XX-loro-ala"), { rotation: -50, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 5 }, t);
  golpe(t + 0.03, 10);
});
slam(q(".XX-fuga"), F1 + 0.02);
tl.to(q(".XX-fuga"), { scale: 1.12, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, F2);
// lluvia de monedas
qa(".XX-moneda").forEach((m, i) => {
  gsap.set(m, { opacity: 0 });
  tl.fromTo(m, { opacity: 1, y: 480, rotation: 0 }, { opacity: 1, y: 1600, rotation: 360, transformOrigin: "50% 50%", duration: 1.6, ease: "power1.in", immediateRender: false }, F1 - 0.2 + (i % 5) * 0.15);
});
`,
});
sfx(id, [{ t: 0.1, sfx: "salto", vol: 0.3 }, { t: 1.05, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 2.18, sfx: "golpe", vol: 0.3 }, { t: 2.9, sfx: "fanfarria", vol: 0.25, max: 1.6 }, { t: 3.2, sfx: "moneda", vol: 0.35 }, { t: 3.9, sfx: "moneda", vol: 0.3 }]);
