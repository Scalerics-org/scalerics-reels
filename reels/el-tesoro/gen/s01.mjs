import { escena, sfx, duraciones, C, loro, rosa, barco, pergamino, ola } from "./comun.mjs";
const id = "s01-mapa", dur = duraciones()[id];
escena({ id, dur,
  css: `
    & .XX-titulo { position: absolute; left: 0; right: 0; top: 650px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 70px; color: ${C.tinta}; letter-spacing: 0.04em; }
    & .XX-local { position: absolute; left: 560px; top: 1085px; width: 260px; text-align: center; font-size: 58px; transform: rotate(-4deg); }
    & .XX-unloro { top: 585px; font-size: 150px; color: ${C.oro}; }
    & .XX-unloro2 { top: 1350px; font-size: 120px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-mapa">
            ${pergamino("XX-papel", 80, 610, 920, 730)}
            <path class="mar" opacity="0.45" d="${ola(150, 1120, 200, 12, 50)} ${ola(130, 900, 160, 12, 50)} ${ola(380, 1270, 200, 12, 50)} ${ola(820, 1250, 130, 12, 50)}" />
            <path class="XX-costa trazo" fill="none" d="M520 800 C600 760 700 780 780 760 C860 750 930 820 910 900 C895 960 940 1020 900 1090 C860 1170 760 1190 680 1170 C600 1150 560 1200 500 1160 C440 1120 470 1060 440 1000 C410 930 440 840 520 800 Z" />
            <path class="XX-costa2" fill="none" stroke="${C.perg2}" stroke-width="12" opacity="0.8" d="M520 800 C600 760 700 780 780 760 C860 750 930 820 910 900 C895 960 940 1020 900 1090 C860 1170 760 1190 680 1170 C600 1150 560 1200 500 1160 C440 1120 470 1060 440 1000 C410 930 440 840 520 800 Z" />
            <path class="XX-monte trazo" d="M560 900 l30 -50 l30 50 M610 900 l26 -40 l26 40" />
            <path class="XX-palma trazo" d="M840 980 q-6 -40 4 -70 M844 910 q-30 -10 -48 6 M844 910 q30 -14 46 4 M844 910 q-10 -26 -30 -30 M844 910 q14 -24 34 -26" />
            <path class="XX-camino" fill="none" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 22" d="M330 1210 C380 1120 300 1040 380 980 C450 930 520 1060 600 1040 C660 1020 680 1000 760 1010" />
            <g transform="translate(250 1250) scale(0.32)">${barco("XX")}</g>
            <g transform="translate(215 850) scale(0.62)"><g class="XX-rosa-g">${rosa("XX")}</g></g>
            <g class="XX-tienda">
              <path class="tinta" fill="${C.perg}" d="M720 990 h90 v-56 h-90 Z" />
              <path class="tinta" fill="${C.rojo}" d="M710 936 l10 -30 h90 l10 30 Z" />
              <path fill="none" stroke="${C.perg}" stroke-width="6" d="M738 908 l-6 26 M766 908 v26 M794 908 l6 26" />
              <path class="tinta" fill="${C.sepia}" d="M752 990 v-34 h26 v34" />
            </g>
            <g class="XX-x"><path fill="none" stroke="${C.rojo}" stroke-width="22" stroke-linecap="round" d="M726 970 L806 1050 M806 970 L726 1050" /></g>
          </g>
          <g transform="translate(870 1150) scale(0.85)"><g class="XX-loro-g">${loro("XX")}</g></g>
          <g class="XX-plumas" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="4">
            <g transform="translate(700 1000)"><path d="M0 0 c10 -20 30 -24 40 -20 c-10 10 -24 18 -40 20 Z" /></g>
            <g transform="translate(960 980) rotate(80)"><path d="M0 0 c10 -20 30 -24 40 -20 c-10 10 -24 18 -40 20 Z" /></g>
            <g transform="translate(760 1260) rotate(200)"><path d="M0 0 c10 -20 30 -24 40 -20 c-10 10 -24 18 -40 20 Z" fill="${C.mar}" /></g>
            <g transform="translate(990 1240) rotate(140)"><path d="M0 0 c10 -20 30 -24 40 -20 c-10 10 -24 18 -40 20 Z" fill="${C.oro}" /></g>
          </g>
        </svg>
        <div class="XX-titulo">MAPA DEL TESORO</div>
        <div class="XX-local mano">tu local</div>
        <div class="grande XX-unloro">¡UN LORO!</div>
        <div class="grande XX-unloro2">¡UN LORO!</div>
  `,
  js: `
const LOCAL = 1.0, HACE = 1.78, MAPA = 2.62, TESORO = 3.38, Y = 4.41, LORO = 4.54, UN1 = 5.24, UN2 = 5.88;
// cuadro 0: el pergamino ya se está desenrollando
tl.fromTo(q(".XX-mapa"), { scaleX: 0.6, opacity: 0.85, transformOrigin: "50% 50%" }, { scaleX: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.5, ease: "power3.out" }, 0);
tl.fromTo(q(".XX-escenario"), { scale: 1.06 }, { scale: 1, duration: 4.3, ease: "none", transformOrigin: "50% 55%" }, 0);
dibujar([q(".XX-costa"), q(".XX-costa2")], 0.05, 0.9, 0);
dibujar(qa(".XX-monte, .XX-palma"), 0.6, 0.5);
tl.fromTo(q(".XX-rosa-g"), { rotation: -90, scale: 0.4, opacity: 0, transformOrigin: "50% 50%" }, { rotation: 0, scale: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.7, ease: "back.out(1.4)" }, 0.2);
pop(q(".XX-barco"), 0.45);
tl.to(q(".XX-barco"), { rotation: 4, transformOrigin: "50% 100%", duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.8);
// "tu local": aparece la tiendita
pop(q(".XX-tienda"), LOCAL - 0.1, 0.3);
pop(q(".XX-local"), LOCAL + 0.1, 0.5);
// "mapa del tesoro": el título y el camino punteado del barco al local
pop(q(".XX-titulo"), MAPA - 0.15, 0.7);
gsap.set(q(".XX-camino"), { strokeDashoffset: 0, opacity: 0 });
tl.fromTo(q(".XX-camino"), { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power1.inOut", immediateRender: false }, HACE);
// X roja en "tesoro"
slam(q(".XX-x"), TESORO);
golpe(TESORO + 0.05, 14);
tl.to(q(".XX-x"), { scale: 1.12, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, TESORO + 0.3);
// "y un loro": cae el loro sobre la esquina del mapa
gsap.set(q(".XX-loro-g"), { opacity: 0 });
tl.fromTo(q(".XX-loro-g"), { y: -900, opacity: 1 }, { y: 0, opacity: 1, duration: 0.32, ease: "power2.in", immediateRender: false }, Y - 0.15);
tl.to(q(".XX-loro-g"), { scaleY: 0.85, scaleX: 1.1, transformOrigin: "50% 100%", duration: 0.08, yoyo: true, repeat: 1 }, Y + 0.17);
golpe(Y + 0.18, 10);
tl.to(q(".XX-loro-ala"), { rotation: -35, transformOrigin: "50% 0%", duration: 0.1, yoyo: true, repeat: 3 }, LORO);
// "¡Un loro! ¡Un loro!": el mapa se apaga, el loro al frente graznando
tl.to(q(".XX-mapa"), { opacity: 0.3, duration: 0.25 }, UN1 - 0.25);
tl.to(q(".XX-local"), { opacity: 0.3, duration: 0.25 }, UN1 - 0.25);
tl.to(q(".XX-titulo"), { opacity: 0, duration: 0.2 }, UN1 - 0.25);
tl.to(q(".XX-loro-g"), { x: -330, y: -170, scale: 1.75, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(1.5)" }, UN1 - 0.25);
[UN1, UN2].forEach((t) => {
  tl.to(q(".XX-loro-pico"), { rotation: 28, transformOrigin: "0% 0%", duration: 0.09, yoyo: true, repeat: 3 }, t);
  tl.to(q(".XX-loro-ala"), { rotation: -50, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 3 }, t);
  tl.to(q(".XX-loro-g"), { rotation: -6, transformOrigin: "50% 100%", duration: 0.08, yoyo: true, repeat: 3 }, t);
  golpe(t + 0.02, 12);
});
slam(q(".XX-unloro"), UN1 + 0.02);
slam(q(".XX-unloro2"), UN2 + 0.02);
tl.set(q(".XX-unloro2"), { rotation: 4 }, 0);
gsap.set(qa(".XX-plumas path"), { opacity: 0 });
qa(".XX-plumas path").forEach((p, i) => {
  tl.fromTo(p, { opacity: 1, y: 0 }, { opacity: 0, y: 160 + i * 30, rotation: 90 + i * 40, transformOrigin: "50% 50%", duration: 1.1, ease: "power1.in", immediateRender: false }, UN1 + 0.05 + i * 0.08);
});
`,
});
sfx(id, [
  { t: 0.05, sfx: "whoosh", vol: 0.3 }, { t: 1.0, sfx: "pop", vol: 0.3 }, { t: 1.8, sfx: "tiza", vol: 0.25 },
  { t: 3.3, sfx: "impact-bass-1", vol: 0.42, max: 0.6 }, { t: 4.3, sfx: "salto", vol: 0.3 }, { t: 5.24, sfx: "golpe", vol: 0.3 }, { t: 5.9, sfx: "golpe", vol: 0.25 },
]);
