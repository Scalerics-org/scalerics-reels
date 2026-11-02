import { escena, sfx, duraciones, C, loro } from "./comun.mjs";
const id = "s05-depende", dur = duraciones()[id];
escena({ id, dur,
  css: `
    & .XX-tabla { position: absolute; left: 150px; top: 690px; width: 640px; height: 360px; background: ${C.sepia}; border: 8px solid ${C.tinta}; border-radius: 18px; transform: rotate(-3deg); box-shadow: 10px 12px 0 ${C.tinta}; }
    & .XX-tabla::before { content: ""; position: absolute; inset: 18px; border: 4px solid ${C.oro}; border-radius: 10px; opacity: 0.6; }
    & .XX-hor { position: absolute; left: 0; right: 0; top: 34px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 74px; color: ${C.oro}; }
    & .XX-ab { position: absolute; left: 56px; top: 140px; font-size: 92px; color: ${C.perg}; }
    & .XX-dep { position: absolute; left: 70px; top: 230px; font-size: 104px; color: ${C.oro}; transform: rotate(-4deg); }
    & .XX-d1 { top: 1120px; font-size: 128px; color: ${C.oro}; }
    & .XX-d2 { top: 1260px; font-size: 104px; color: ${C.rojo}; }
    & .XX-tel { position: absolute; left: 360px; top: 640px; width: 360px; height: 640px; background: ${C.tinta}; border-radius: 52px; border: 6px solid ${C.tinta}; }
    & .XX-pant { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; background: ${C.perg}; border-radius: 38px; text-align: center; font-family: "Lexend", sans-serif; color: ${C.tinta}; }
    & .XX-llam { margin-top: 110px; font-size: 34px; font-weight: 500; }
    & .XX-quien { margin-top: 14px; font-size: 44px; font-weight: 800; }
    & .XX-av { margin: 40px auto 0; width: 150px; height: 150px; border-radius: 50%; background: ${C.oro}; border: 6px solid ${C.tinta}; font-family: "Cinzel", serif; font-weight: 900; font-size: 60px; line-height: 140px; }
    & .XX-colgar { position: absolute; left: 50%; bottom: 60px; width: 110px; height: 110px; margin-left: -55px; border-radius: 50%; background: ${C.rojo}; border: 6px solid ${C.tinta}; }
    & .XX-nadie { left: 150px; top: 860px; font-size: 92px; transform: rotate(-9deg); }
  `,
  body: `
        <div class="XX-tabla">
          <div class="XX-hor">HORARIO</div>
          <div class="XX-ab mano">Abierto:</div>
          <div class="XX-dep mano">depende</div>
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="trazo XX-soga" d="M300 690 L540 560 L640 690" />
          <g transform="translate(860 1080) scale(0.95)"><g class="XX-loro-g">${loro("XX")}</g></g>
        </svg>
        <div class="grande XX-d1">¡DEPENDE!</div>
        <div class="grande XX-d2">¡DEPENDE!</div>
        <div class="XX-tel"><div class="XX-pant"><div class="XX-llam">Llamando...</div><div class="XX-quien">Doña Rosa</div><div class="XX-av">DR</div><div class="XX-colgar"></div></div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-ondas" fill="none" stroke="${C.oro}" stroke-width="10" stroke-linecap="round">
            <path d="M320 860 q-40 60 0 120" /><path d="M280 830 q-60 90 0 180" /><path d="M240 800 q-80 120 0 240" />
            <path d="M760 860 q40 60 0 120" /><path d="M800 830 q60 90 0 180" /><path d="M840 800 q80 120 0 240" />
          </g>
        </svg>
        <div class="sello XX-nadie" data-layout-allow-overlap>NADIE ATIENDE</div>
  `,
  js: `
const HORARIO = 0.48, ABIERTO = 1.63, DEPENDE = 2.57, D1 = 3.45, D2 = 4.51, LLAME = 5.66, NADIE = 6.76;
// cuadro 0: el cartel colgado se balancea
tl.fromTo(q(".XX-tabla"), { y: -120, rotation: -10, opacity: 0.7 }, { y: 0, rotation: -3, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }, 0);
tl.fromTo(q(".XX-soga"), { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.to(q(".XX-tabla"), { rotation: 0, duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.45);
tl.fromTo(q(".XX-hor"), { scale: 0.7, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, HORARIO - 0.1);
gsap.set([q(".XX-ab"), q(".XX-dep")], { clipPath: "inset(0 100% 0 0)" });
tl.to(q(".XX-ab"), { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "none" }, ABIERTO - 0.1);
tl.to(q(".XX-dep"), { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "none" }, DEPENDE - 0.1);
tl.to(q(".XX-dep"), { scale: 1.15, transformOrigin: "0% 50%", duration: 0.15, yoyo: true, repeat: 1 }, DEPENDE + 0.5);
// el loro repite
tl.fromTo(q(".XX-loro-g"), { x: 400 }, { x: 0, duration: 0.3, ease: "back.out(1.6)" }, D1 - 0.4);
[D1, D2].forEach((t) => {
  tl.to(q(".XX-loro-pico"), { rotation: 28, transformOrigin: "0% 0%", duration: 0.09, yoyo: true, repeat: 5 }, t);
  tl.to(q(".XX-loro-ala"), { rotation: -45, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 5 }, t);
  tl.to(q(".XX-loro-g"), { y: -40, duration: 0.12, yoyo: true, repeat: 1 }, t);
  golpe(t + 0.03, 12);
});
slam(q(".XX-d1"), D1 + 0.02);
gsap.set(q(".XX-d2"), { rotation: 5 });
slam(q(".XX-d2"), D2 + 0.02);
// "llamé al número": todo se va y aparece el celular llamando
tl.to([q(".XX-tabla"), q(".XX-soga"), q(".XX-d1"), q(".XX-d2"), q(".XX-loro-g")], { opacity: 0, y: 80, duration: 0.25, ease: "power2.in" }, LLAME - 0.35);
gsap.set(q(".XX-tel"), { opacity: 0 });
tl.fromTo(q(".XX-tel"), { opacity: 0, y: 300, rotation: 6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, LLAME - 0.15);
tl.to(q(".XX-tel"), { rotation: 3, duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, LLAME + 0.25);
qa(".XX-ondas path").forEach((p, i) => {
  gsap.set(p, { opacity: 0 });
  [0, 0.5].forEach((d) => tl.fromTo(p, { opacity: 1 }, { opacity: 0, duration: 0.35, immediateRender: false }, LLAME + 0.25 + d + (i % 3) * 0.1));
});
// "nadie atiende": sello
tl.to(q(".XX-pant"), { opacity: 0.5, duration: 0.2 }, NADIE - 0.1);
slam(q(".XX-nadie"), NADIE);
golpe(NADIE + 0.04, 16);
`,
});
sfx(id, [
  { t: 0.05, sfx: "whoosh-short", vol: 0.25 }, { t: 1.6, sfx: "tiza", vol: 0.3 }, { t: 2.55, sfx: "tiza", vol: 0.3 },
  { t: 3.45, sfx: "golpe", vol: 0.3 }, { t: 4.5, sfx: "golpe", vol: 0.3 }, { t: 5.85, sfx: "ring", vol: 0.3, max: 0.9 }, { t: 6.7, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
]);
