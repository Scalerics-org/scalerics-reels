import { escena, sfx, duraciones, C, barco, ola } from "./comun.mjs";
const id = "s06-velas", dur = duraciones()[id];
escena({ id, dur,
  css: `
    & .XX-izad { top: 585px; font-size: 128px; }
    & .XX-velast { top: 715px; font-size: 128px; color: ${C.perg}; }
    & .XX-igual { position: absolute; left: 0; right: 0; top: 1440px; text-align: center; font-size: 80px; color: ${C.perg}; -webkit-text-stroke: 8px ${C.tinta}; paint-order: stroke fill; transform: rotate(-3deg); }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1300) scale(1.2)"><g class="XX-barco-g">${barco("XX")}</g></g>
          <g class="XX-olas">
            <path class="XX-o1" fill="none" stroke="${C.mar}" stroke-width="8" d="${ola(-400, 1330, 2000, 30, 120)}" />
            <path class="XX-o3" fill="none" stroke="${C.mar}" stroke-width="5" opacity="0.4" d="${ola(-400, 1470, 2000, 20, 90)}" />
            <path class="XX-o2" fill="none" stroke="${C.mar}" stroke-width="6" opacity="0.6" d="${ola(-400, 1400, 2000, 24, 100)}" />
          </g>
          <g class="XX-espuma" fill="${C.perg}"><circle cx="260" cy="1300" r="12" /><circle cx="230" cy="1270" r="9" /><circle cx="290" cy="1260" r="7" /><circle cx="840" cy="1290" r="10" /></g>
        </svg>
        <div class="grande XX-izad">¡IZAD</div>
        <div class="grande XX-velast">LAS VELAS!</div>
        <div class="XX-igual mano">vamos igual</div>
  `,
  js: `
const LAS = 0.3, VELAS = 0.38, VAMOS = 0.69, IGUAL = 1.15;
// cuadro 0: el barco ya está y la ola se mueve
tl.fromTo(q(".XX-o1"), { x: 0 }, { x: -240, duration: DUR, ease: "none" }, 0);
tl.fromTo(q(".XX-o2"), { x: -100 }, { x: 100, duration: DUR, ease: "none" }, 0);
tl.fromTo(q(".XX-barco-g"), { rotation: -4, transformOrigin: "50% 100%" }, { rotation: 4, transformOrigin: "50% 100%", duration: 0.5, yoyo: true, repeat: 4, ease: "sine.inOut" }, 0);
slam(q(".XX-izad"), 0.08);
golpe(0.1, 12);
// "velas": se izan
gsap.set(q(".XX-velas"), { scaleY: 0.1, transformOrigin: "50% 100%" });
tl.to(q(".XX-velas"), { scaleY: 1, transformOrigin: "50% 100%", duration: 0.3, ease: "back.out(2)" }, VELAS - 0.1);
slam(q(".XX-velast"), VELAS);
// "vamos igual": el barco arranca
pop(q(".XX-igual"), VAMOS, 0.5);
tl.to(q(".XX-barco-g"), { x: 900, duration: 1.3, ease: "power2.in" }, IGUAL - 0.1);
qa(".XX-espuma circle").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 0 }, { opacity: 1, y: -60, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }, 0.2 + i * 0.25));
`,
});
sfx(id, [{ t: 0.05, sfx: "braaam", vol: 0.3, max: 1.2 }, { t: 0.35, sfx: "whoosh", vol: 0.3 }, { t: 1.1, sfx: "olas", vol: 0.35, max: 1.4 }]);
