import { escena, sfx, duraciones, C, pergamino } from "./comun.mjs";
import { telCss } from "./tel.mjs";
const id = "s10-sitio", dur = duraciones()[id];
escena({ id, dur,
  css: telCss + `
    & .XX-ese { top: 585px; font-size: 104px; color: ${C.perg}; }
    & .XX-web { top: 585px; font-size: 104px; }
    & .XX-scal { left: 0; right: 0; top: 1330px; text-align: center; color: ${C.oro}; font-size: 44px; }
    & .XX-hero { position: absolute; left: 30px; top: 146px; font-weight: 700; font-size: 30px; }
    & .XX-mini { position: absolute; left: 30px; top: 210px; width: 386px; height: 380px; background: ${C.perg}; border: 4px solid ${C.tinta}; border-radius: 20px; overflow: hidden; }
    & .XX-aca { position: absolute; left: 30px; top: 610px; width: 386px; text-align: center; font-size: 56px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1010) rotate(-5)"><g class="XX-viejo"><g transform="translate(-540 -1010)">
            ${pergamino("XX-vp", 250, 800, 580, 420, C.perg2)}
            <path fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" opacity="0.7" d="M310 860 q60 40 30 90 q-40 60 40 100 M500 840 q-30 60 40 80 q80 20 30 90 M640 860 l80 120 M720 860 l-90 130" />
            <g font-family="Cinzel" font-weight="900" font-size="80" fill="${C.tinta}" opacity="0.75"><text x="420" y="990">?</text><text x="640" y="1150">?</text></g>
          </g></g></g>
        </svg>
        <div class="grande XX-ese">ESE MAPA</div>
        <div class="grande XX-web">UN SITIO WEB</div>
        <div class="rotulo XX-scal">Scalerics</div>
        <div class="XX-tel"><div class="XX-pant">
          <div class="XX-barra">Pizzería Doña Rosa<small>La fugazzeta legendaria</small></div>
          <div class="XX-hero">Dónde estamos</div>
          <div class="XX-mini">
            <svg viewBox="0 0 386 380" style="width:386px;height:380px" aria-hidden="true">
              <path fill="none" stroke="${C.perg2}" stroke-width="40" d="M0 190 H386 M200 0 V380 M0 60 H386" />
              <path class="XX-ruta" fill="none" stroke="${C.mar}" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 16" d="M40 340 C80 260 200 280 200 190 C200 140 260 120 290 120" />
              <g class="XX-xg"><path fill="none" stroke="${C.rojo}" stroke-width="22" stroke-linecap="round" d="M250 80 L330 160 M330 80 L250 160" /></g>
              <circle class="XX-circ" fill="none" stroke="${C.rojo}" stroke-width="8" cx="290" cy="120" r="72" />
            </svg>
          </div>
          <div class="XX-aca mano">¡Acá estamos!</div>
        </div></div>
  `,
  js: `
const SCAL = 0.16, HACEMOS = 0.67, ESE = 1.27, MAPA = 1.52, UN = 2.17, SITIO = 2.28, X = 3.22, MARCADA = 3.72;
// cuadro 0: el mapa viejo flota
tl.fromTo(q(".XX-viejo"), { scale: 0.85, opacity: 0.6, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(1.6)" }, 0);
tl.to(q(".XX-viejo"), { rotation: 4, transformOrigin: "50% 50%", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3);
pop(q(".XX-scal"), SCAL, 0.6);
slam(q(".XX-ese"), HACEMOS + 0.3);
golpe(HACEMOS + 0.34, 10);
// "un sitio web": el mapa gira y se convierte en el celular
tl.to(q(".XX-viejo"), { scaleX: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.2, ease: "power2.in" }, UN - 0.25);
tl.to(q(".XX-scal"), { opacity: 0, duration: 0.15 }, UN - 0.25);
tl.to(q(".XX-ese"), { opacity: 0, y: -30, duration: 0.15 }, SITIO - 0.15);
gsap.set(q(".XX-tel"), { opacity: 0 });
tl.fromTo(q(".XX-tel"), { opacity: 1, scaleX: 0, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, transformOrigin: "50% 50%", duration: 0.28, ease: "back.out(1.6)", immediateRender: false }, UN - 0.05);
slam(q(".XX-web"), SITIO);
gsap.set(q(".XX-ruta"), { opacity: 0 });
tl.fromTo(q(".XX-ruta"), { opacity: 0, strokeDashoffset: 80 }, { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "none", immediateRender: false }, SITIO + 0.2);
// "con la X bien marcada"
slam(q(".XX-xg"), X, 3);
golpe(X + 0.04, 14);
dibujar(q(".XX-circ"), MARCADA - 0.1, 0.35);
pop(q(".XX-aca"), MARCADA, 0.5);
tl.to(q(".XX-xg"), { scale: 1.15, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, MARCADA + 0.2);
`,
});
sfx(id, [{ t: 0.1, sfx: "chime", vol: 0.3 }, { t: 1.25, sfx: "golpe", vol: 0.3 }, { t: 2.1, sfx: "whoosh", vol: 0.3 }, { t: 3.15, sfx: "impact-bass-1", vol: 0.42, max: 0.6 }, { t: 3.7, sfx: "sparkle", vol: 0.3 }]);
