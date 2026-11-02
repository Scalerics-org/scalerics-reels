import { escena, sfx, duraciones, C, capitan, grumete, pergamino } from "./comun.mjs";
const id = "s04-kiosco", dur = duraciones()[id];
escena({ id, dur,
  css: `
    & .XX-nota { position: absolute; left: 110px; top: 600px; width: 860px; text-align: center; font-size: 66px; line-height: 1; }
    & .XX-etq { position: absolute; font-size: 48px; }
    & .XX-yano { top: 840px; font-size: 128px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-mapa">
            ${pergamino("XX-papel", 90, 580, 900, 640)}
            <path fill="none" stroke="${C.perg2}" stroke-width="80" d="M90 960 H990 M560 720 V1220" />
            <path class="trazo" d="M90 920 H520 M600 920 H990 M90 1000 H520 M600 1000 H990 M520 720 V920 M600 720 V920 M520 1000 V1220 M600 1000 V1220" />
            <g class="XX-local">
              <path class="tinta" fill="${C.perg}" d="M220 1180 h190 v-120 h-190 Z" />
              <path class="tinta" fill="${C.rojo}" d="M206 1060 l14 -34 h190 l14 34 Z" />
              <path class="tinta" fill="${C.sepia}" d="M290 1180 v-70 h40 v70" />
            </g>
            <g class="XX-kiosco" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-dasharray="16 14" stroke-linecap="round">
              <path d="M700 890 h150 v-120 h-150 Z M686 770 l14 -30 h150 l14 30 M740 890 v-60 h70 v60" />
            </g>
            <path class="XX-flecha trazo" d="M770 1000 C760 1060 560 1080 430 1110 M450 1086 l-24 26 l34 6" />
          </g>
          <g class="XX-puff" fill="${C.perg}" stroke="${C.tinta}" stroke-width="5">
            <circle cx="740" cy="820" r="40" /><circle cx="800" cy="790" r="48" /><circle cx="860" cy="830" r="38" /><circle cx="780" cy="860" r="36" />
          </g>
          <g transform="translate(220 1390) scale(0.62)"><g class="XX-gru-g">${grumete("XX", { brazo: true })}</g></g>
          <g transform="translate(820 1330) scale(0.7)"><g class="XX-cap-g">${capitan("XX")}</g></g>
        </svg>
        <div class="XX-nota mano">"frente a donde estaba el kiosco"</div>
        <div class="XX-etq mano" style="left:690px; top:660px">el kiosco</div>
        <div class="XX-etq mano" style="left:210px; top:940px; color:${C.rojo}">¿acá?</div>
        <div class="grande XX-yano">¡YA NO ESTÁ!</div>
  `,
  js: `
const FRENTE = 0.92, DONDE = 1.76, KIOSCO = 2.8, QUE = 3.96, SI = 4.65, NO = 5.65;
// cuadro 0: el mapa del barrio y el grumete leyendo
tl.fromTo(q(".XX-mapa"), { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
tl.fromTo(q(".XX-gru-g"), { y: 300 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
hablar(q(".XX-gru-boca"), 0.05, 3.3);
tl.to(qa(".XX-gru-pupila"), { x: 8, y: -8, duration: 0.2 }, 0.3);
gsap.set(q(".XX-nota"), { clipPath: "inset(0 100% 0 0)" });
tl.to(q(".XX-nota"), { clipPath: "inset(0 0% 0 0)", duration: 2.4, ease: "none" }, 0.1);
// "frente a": flecha, local con "¿acá?"
pop(q(".XX-local"), FRENTE - 0.1, 0.4);
dibujar(q(".XX-flecha"), FRENTE + 0.1, 0.6);
pop(q(".XX-etq:nth-of-type(3)"), FRENTE + 0.6, 0.4);
// "estaba el kiosco": el fantasma del kiosco, punteado
gsap.set(q(".XX-kiosco"), { opacity: 0 });
tl.fromTo(q(".XX-kiosco"), { opacity: 0 }, { opacity: 0.85, duration: 0.3, immediateRender: false }, DONDE);
tl.to(q(".XX-kiosco"), { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, KIOSCO);
pop(q(".XX-etq:nth-of-type(2)"), KIOSCO - 0.1, 0.4);
// "¿Qué kiosco?": entra el capitán furioso
tl.fromTo(q(".XX-cap-g"), { x: 700 }, { x: 0, duration: 0.25, ease: "back.out(1.6)" }, QUE - 0.25);
tl.to(q(".XX-cap-ceja"), { rotation: 18, transformOrigin: "100% 50%", duration: 0.12 }, QUE);
hablar(q(".XX-cap-boca"), QUE, DUR - 0.4, 0.09);
golpe(QUE + 0.05, 12);
tl.to(q(".XX-cap-g"), { y: -30, duration: 0.1, yoyo: true, repeat: 3 }, SI);
// "¡ya no está!": el kiosco se desvanece en una nube
tl.to(q(".XX-kiosco"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.25 }, NO - 0.1);
tl.to(q(".XX-etq:nth-of-type(2)"), { opacity: 0, duration: 0.2 }, NO);
qa(".XX-puff circle").forEach((c, i) => {
  gsap.set(c, { opacity: 0 });
  tl.fromTo(c, { opacity: 1, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.6, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out", immediateRender: false }, NO - 0.1 + i * 0.05);
});
tl.to(q(".XX-mapa"), { opacity: 0.45, duration: 0.2 }, NO - 0.05);
tl.to(q(".XX-nota"), { opacity: 0.4, duration: 0.2 }, NO - 0.05);
slam(q(".XX-yano"), NO + 0.02);
golpe(NO + 0.06, 16);
`,
});
sfx(id, [
  { t: 0.1, sfx: "tiza", vol: 0.25 }, { t: 1.0, sfx: "whoosh-short", vol: 0.25 }, { t: 2.8, sfx: "sparkle", vol: 0.25 },
  { t: 3.8, sfx: "golpe", vol: 0.35 }, { t: 5.55, sfx: "impact-bass-2", vol: 0.42, max: 0.7 }, { t: 5.7, sfx: "glitch-1", vol: 0.2 },
]);
