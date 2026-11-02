import { escena, sfx, duraciones, C, grumete, porcion } from "./comun.mjs";
const id = "s03-pista", dur = duraciones()[id];
escena({ id, dur,
  css: `
    & .XX-preg { position: absolute; font-family: "Cinzel", serif; font-weight: 900; font-size: 130px; color: ${C.oro}; -webkit-text-stroke: 10px ${C.tinta}; paint-order: stroke fill; }
    & .XX-pista { top: 590px; font-size: 96px; color: ${C.perg}; }
    & .XX-post { position: absolute; left: 270px; top: 720px; width: 540px; height: 600px; background: ${C.perg}; border: 6px solid ${C.tinta}; border-radius: 26px; transform: rotate(-3deg); box-shadow: 10px 12px 0 ${C.tinta}; overflow: hidden; }
    & .XX-cab { position: absolute; left: 24px; top: 20px; display: flex; align-items: center; gap: 16px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; color: ${C.tinta}; }
    & .XX-avatar { width: 58px; height: 58px; border-radius: 50%; background: ${C.rojo}; border: 4px solid ${C.tinta}; }
    & .XX-foto { position: absolute; left: 24px; top: 96px; width: 480px; height: 330px; background: ${C.perg2}; border: 4px solid ${C.tinta}; border-radius: 12px; }
    & .XX-texto { position: absolute; left: 26px; top: 446px; width: 490px; font-size: 38px; line-height: 1.02; }
    & .XX-viejo { position: absolute; inset: 0; background: rgba(107, 68, 35, 0.22); }
    & .XX-sello { left: 600px; top: 1180px; font-size: 104px; transform: rotate(-10deg); }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1110) scale(1.25)"><g class="XX-gru-g">${grumete("XX")}</g></g>
        </svg>
        <div class="XX-preg" style="left:170px; top:760px">?</div>
        <div class="XX-preg" style="left:820px; top:700px">?</div>
        <div class="XX-preg" style="left:860px; top:930px; font-size:90px">?</div>
        <div class="grande XX-pista">UNA SOLA PISTA</div>
        <div class="XX-post">
          <div class="XX-cab"><div class="XX-avatar"></div>pizzeria.donarosa</div>
          <div class="XX-foto"></div>
          <svg viewBox="0 0 540 600" style="width:540px;height:600px" aria-hidden="true">
            <g transform="translate(270 262) scale(0.95)">${porcion("XX")}</g>
            <path class="XX-tela" fill="none" stroke="${C.tinta}" stroke-width="3" opacity="0.7" d="M540 0 L420 0 M540 0 L540 120 M540 0 L450 90 M540 0 L490 110 M540 0 L430 50 M470 0 Q500 30 540 30 M440 0 Q490 60 540 70 M540 100 Q480 80 470 0" />
            <path class="XX-tela" fill="none" stroke="${C.tinta}" stroke-width="3" opacity="0.7" d="M0 600 L0 500 M0 600 L110 600 M0 600 L80 520 M0 520 Q40 540 50 600 M0 550 Q20 570 25 600" />
          </svg>
          <div class="XX-texto mano">¡Vengan a probarla! Estamos frente a donde estaba el kiosco.</div>
          <div class="XX-viejo"></div>
        </div>
        <div class="sello XX-sello">2019</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-polvo" fill="${C.perg2}">
            <circle cx="300" cy="760" r="10" /><circle cx="820" cy="800" r="8" /><circle cx="260" cy="1100" r="12" /><circle cx="840" cy="1200" r="9" /><circle cx="540" cy="700" r="7" /><circle cx="790" cy="1000" r="11" />
          </g>
        </svg>
  `,
  js: `
const QUEDA = 0.32, CAPITAN = 0.64, TENEMOS = 1.6, PISTA = 2.45, POSTEO = 3.37, DOS = 4.29, DIECINUEVE = 4.83;
// cuadro 0: el grumete pregunta
tl.fromTo(q(".XX-gru-g"), { scale: 0.85, transformOrigin: "50% 50%" }, { scale: 1, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(2)" }, 0);
hablar(q(".XX-gru-boca"), 0.0, 1.2);
qa(".XX-preg").forEach((p, i) => { pop(p, 0.1 + i * 0.22, 0.2); tl.to(p, { rotation: 12, y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5 + i * 0.22); });
tl.to(qa(".XX-gru-pupila"), { x: 6, y: -6, duration: 0.2 }, CAPITAN);
// "una sola pista": el grumete se achica abajo y aparece el cartel
tl.to(qa(".XX-preg"), { opacity: 0, scale: 0.4, duration: 0.2 }, TENEMOS - 0.2);
tl.to(q(".XX-gru-g"), { x: -330, y: 200, scale: 0.55, transformOrigin: "50% 50%", duration: 0.4, ease: "power3.inOut" }, TENEMOS - 0.25);
slam(q(".XX-pista"), PISTA - 0.25);
golpe(PISTA - 0.15, 10);
// "un posteo": la reliquia, con telarañas y polvo
gsap.set(q(".XX-post"), { opacity: 0 });
tl.fromTo(q(".XX-post"), { opacity: 0, y: 400, rotation: 8 }, { opacity: 1, y: 0, rotation: -3, duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, POSTEO - 0.3);
dibujar(qa(".XX-tela"), POSTEO + 0.2, 0.5, 0.1);
qa(".XX-polvo circle").forEach((c, i) => {
  gsap.set(c, { opacity: 0 });
  tl.fromTo(c, { opacity: 0.9, x: 0, y: 0 }, { opacity: 0, x: (i % 2 ? 60 : -60), y: -80 - i * 10, duration: 1.0, ease: "power1.out", immediateRender: false }, POSTEO + 0.1 + i * 0.06);
});
tl.to(q(".XX-post"), { rotation: -1, duration: 0.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, POSTEO + 0.4);
// "dos mil diecinueve": sello rojo
slam(q(".XX-sello"), DOS);
golpe(DOS + 0.04, 16);
tl.to(q(".XX-sello"), { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, DIECINUEVE);
tl.to(qa(".XX-gru-ojos"), { scaleY: 1.3, transformOrigin: "50% 50%", duration: 0.12 }, DIECINUEVE);
`,
});
sfx(id, [
  { t: 0.1, sfx: "pop", vol: 0.25 }, { t: 2.25, sfx: "impact-bass-1", vol: 0.38, max: 0.6 }, { t: 3.1, sfx: "whoosh", vol: 0.3 },
  { t: 3.5, sfx: "viento", vol: 0.25, max: 1.2 }, { t: 4.2, sfx: "golpe", vol: 0.4 },
]);
