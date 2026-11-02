import { escena, sfx, duraciones, C, grumete } from "./comun.mjs";
const id = "s07-cerrado", dur = duraciones()[id];
const listones = Array.from({ length: 12 }, (_, i) => `<path d="M330 ${880 + i * 26} H750" />`).join("");
escena({ id, dur,
  css: `
    & .XX-cartel { position: absolute; left: 270px; top: 640px; width: 540px; padding: 18px 0 10px; text-align: center; background: ${C.oro}; border: 7px solid ${C.tinta}; border-radius: 14px; font-family: "Cinzel", serif; font-weight: 900; font-size: 50px; line-height: 1.05; color: ${C.tinta}; }
    & .XX-cerrado { position: absolute; left: 380px; top: 1080px; width: 320px; padding: 16px 0 8px; text-align: center; background: ${C.rojo}; border: 7px solid ${C.tinta}; border-radius: 12px; font-family: "Cinzel", serif; font-weight: 900; font-size: 64px; color: ${C.perg}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="tinta" fill="${C.perg2}" d="M230 760 H850 V1240 H230 Z" />
          <path class="tinta" fill="${C.rojo}" d="M210 870 L250 800 H830 L870 870 Z" />
          <path fill="none" stroke="${C.perg}" stroke-width="16" d="M330 810 l-20 54 M440 810 l-10 54 M540 810 v54 M640 810 l10 54 M750 810 l20 54" />
          <path class="tinta" fill="${C.noche}" d="M330 880 H750 V1240 H330 Z" />
          <g class="XX-persiana">
            <path class="tinta" fill="${C.sepia}" d="M330 880 H750 V1240 H330 Z" />
            <g fill="none" stroke="${C.tinta}" stroke-width="4">${listones}</g>
            <path class="tinta" fill="${C.tinta}" d="M520 1226 h40 v10 h-40 Z" />
          </g>
          <path class="trazo XX-hilo" d="M540 1010 L420 1086 M540 1010 L660 1086" />
          <circle class="tinta" fill="${C.oro}" cx="540" cy="1010" r="10" />
          <g transform="translate(160 1400) scale(0.55)"><g class="XX-gru-g">${grumete("XX")}</g></g>
        </svg>
        <div class="XX-cartel">PIZZERÍA<br />DOÑA ROSA</div>
        <div class="XX-cerrado">CERRADO</div>
  `,
  js: `
const LLEGAMOS = 0.8, ESTA = 1.76, CERRADO = 1.92;
// cuadro 0: el local aparece, la persiana arriba
tl.fromTo(q(".XX-escenario"), { scale: 1.12, y: 40 }, { scale: 1, y: 0, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, 0);
tl.fromTo(q(".XX-gru-g"), { y: 300 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.1);
hablar(q(".XX-gru-boca"), 0.05, 2.5);
tl.fromTo(q(".XX-persiana"), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 0.25, transformOrigin: "50% 0%", duration: 0.2 }, 0);
// "llegamos": la persiana baja de golpe
tl.to(q(".XX-persiana"), { scaleY: 1, transformOrigin: "50% 0%", duration: 0.35, ease: "bounce.out" }, LLEGAMOS);
golpe(LLEGAMOS + 0.3, 10);
// "cerrado": cae el cartelito y se hamaca
gsap.set([q(".XX-cerrado"), q(".XX-hilo")], { opacity: 0 });
tl.set(q(".XX-hilo"), { opacity: 1 }, CERRADO - 0.05);
tl.fromTo(q(".XX-cerrado"), { opacity: 1, y: -200, rotation: 0 }, { opacity: 1, y: 0, rotation: -12, duration: 0.2, ease: "power3.in", immediateRender: false }, CERRADO - 0.15);
tl.to(q(".XX-cerrado"), { rotation: 8, transformOrigin: "50% -60px", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, CERRADO + 0.05);
golpe(CERRADO + 0.05, 16);
tl.to(qa(".XX-gru-pupila"), { y: 6, duration: 0.2 }, CERRADO);
tl.to(q(".XX-gru-g"), { y: 20, duration: 0.4 }, CERRADO + 0.2);
`,
});
sfx(id, [{ t: 0.82, sfx: "golpe", vol: 0.4 }, { t: 1.1, sfx: "click", vol: 0.25 }, { t: 1.85, sfx: "impact-bass-2", vol: 0.42, max: 0.7 }, { t: 2.2, sfx: "uuh", vol: 0.22, max: 1.0 }]);
