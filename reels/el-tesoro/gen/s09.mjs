import { escena, sfx, duraciones, C, capitan, porcion, pergamino } from "./comun.mjs";
const id = "s09-giro", dur = duraciones()[id];
const rayos = Array.from({ length: 14 }, (_, i) => `<path d="M0 -170 L0 -260" transform="rotate(${i * 25.7})" />`).join("");
const monedas = [[-150, 40], [-110, 10], [130, 30], [160, 5], [-60, -10], [80, -14], [0, 20]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse class="tinta" fill="${C.oro}" rx="30" ry="22" /><path fill="none" stroke="${C.tinta}" stroke-width="3" d="M-10 -6 h20" /></g>`).join("");
escena({ id, dur,
  css: `
    & .XX-existe { top: 585px; font-size: 84px; }
    & .XX-buen { left: 640px; top: 1010px; font-size: 54px; transform: rotate(10deg); }
    & .XX-prob { top: 585px; font-size: 84px; color: ${C.perg}; }
    & .XX-mapa-t { top: 700px; font-size: 120px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 900)">
            <g class="XX-rayos" fill="none" stroke="${C.oro}" stroke-width="14" stroke-linecap="round">${rayos}</g>
            <g class="XX-cofre">
              <g transform="translate(0 -90) scale(0.85)"><g class="XX-porc-g">${porcion("XX")}</g></g>
              <g class="XX-monedas">${monedas}</g>
              <path class="tinta" fill="${C.sepia}" d="M-200 30 H200 V180 H-200 Z" />
              <path fill="none" stroke="${C.oro}" stroke-width="16" d="M-130 30 V180 M130 30 V180" />
              <path class="tinta" fill="${C.oro}" d="M-26 60 h52 v56 h-52 Z" />
              <g class="XX-tapa"><path class="tinta" fill="${C.sepia}" d="M-206 30 C-200 -70 200 -70 206 30 Z" /><path fill="none" stroke="${C.oro}" stroke-width="16" d="M-130 -26 V30 M130 -26 V30" /></g>
            </g>
          </g>
          <g transform="translate(540 990) rotate(-6) scale(0.9)"><g class="XX-viejo">
            <g transform="translate(-540 -930)">
              ${pergamino("XX-vp", 260, 760, 560, 360, C.perg2)}
              <path fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" opacity="0.7" d="M320 820 q60 40 30 90 q-40 60 40 100 M500 800 q-30 60 40 80 q80 20 30 90 M620 820 l80 120 M700 820 l-90 130 M330 1060 q100 -30 160 20" />
              <g font-family="Cinzel" font-weight="900" font-size="70" fill="${C.tinta}" opacity="0.75"><text x="420" y="930">?</text><text x="600" y="1060">?</text><text x="720" y="880">?</text></g>
            </g>
          </g></g>
          <ellipse class="XX-circulo" fill="none" stroke="${C.rojo}" stroke-width="14" stroke-linecap="round" cx="540" cy="1000" rx="310" ry="210" transform="rotate(-6 540 1000)" />
          <g transform="translate(540 1330) scale(0.62)"><g class="XX-cap-g">${capitan("XX")}</g></g>
        </svg>
        <div class="grande XX-existe">EL TESORO EXISTE</div>
        <div class="sello XX-buen">¡BUENÍSIMO!</div>
        <div class="grande XX-prob">EL PROBLEMA ES</div>
        <div class="grande XX-mapa-t">EL MAPA</div>
  `,
  js: `
const GRUMETE = 0.73, TESORO = 1.84, EXISTE = 2.96, BUEN = 3.61, PROBLEMA = 4.77, MAPA = 5.54;
// cuadro 0: el capitán serio y el cofre cerrado
tl.fromTo(q(".XX-cap-g"), { y: 200 }, { y: 0, duration: 0.35, ease: "back.out(1.5)" }, 0);
pop(q(".XX-cofre"), 0, 0.85);
hablar(q(".XX-cap-boca"), 0.05, 1.2, 0.13);
hablar(q(".XX-cap-boca"), 1.78, 4.4, 0.12);
hablar(q(".XX-cap-boca"), 4.71, 6.1, 0.13);
tl.to(q(".XX-cofre"), { rotation: 2, transformOrigin: "50% 100%", duration: 0.1, yoyo: true, repeat: 5 }, GRUMETE);
// "el tesoro existe": se abre el cofre
gsap.set([q(".XX-porc-g"), q(".XX-monedas"), q(".XX-rayos")], { opacity: 0 });
tl.to(q(".XX-tapa"), { rotation: -100, svgOrigin: "-206 30", y: -20, duration: 0.3, ease: "back.out(1.6)" }, TESORO - 0.05);
tl.fromTo(q(".XX-monedas"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, TESORO + 0.05);
tl.fromTo(q(".XX-porc-g"), { opacity: 0, y: 120, scale: 0.5, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "50% 100%", duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, TESORO + 0.15);
tl.fromTo(q(".XX-rayos"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.35, immediateRender: false }, TESORO + 0.1);
tl.fromTo(q(".XX-rayos"), { rotation: 0 }, { rotation: 40, svgOrigin: "0 0", duration: 3, ease: "none", immediateRender: false }, TESORO);
slam(q(".XX-existe"), EXISTE - 0.1);
golpe(EXISTE, 12);
// "buenísimo"
slam(q(".XX-buen"), BUEN + 0.05, 1.8);
tl.to(q(".XX-porc-g"), { scale: 1.1, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 3 }, BUEN);
// "el problema es el mapa": el cofre se apaga y cae el mapa viejo arrugado
tl.to([q(".XX-cofre"), q(".XX-rayos")], { opacity: 0.2, duration: 0.25 }, PROBLEMA - 0.15);
tl.to([q(".XX-existe"), q(".XX-buen")], { opacity: 0, duration: 0.2 }, PROBLEMA - 0.15);
slam(q(".XX-prob"), PROBLEMA);
gsap.set(q(".XX-viejo"), { opacity: 0 });
tl.fromTo(q(".XX-viejo"), { opacity: 1, y: -700, rotation: -20 }, { opacity: 1, y: 0, rotation: 0, duration: 0.35, ease: "power3.in", immediateRender: false }, MAPA - 0.4);
slam(q(".XX-mapa-t"), MAPA);
golpe(MAPA + 0.05, 18);
dibujar(q(".XX-circulo"), MAPA + 0.1, 0.45);
tl.to(q(".XX-cap-ceja"), { rotation: 15, transformOrigin: "100% 50%", duration: 0.15 }, MAPA);
`,
});
sfx(id, [{ t: 0.1, sfx: "drama", vol: 0.25, max: 1.5 }, { t: 1.8, sfx: "chime", vol: 0.35 }, { t: 1.95, sfx: "moneda", vol: 0.35 }, { t: 2.9, sfx: "impact-bass-1", vol: 0.38, max: 0.6 }, { t: 3.6, sfx: "sparkle", vol: 0.3 }, { t: 5.2, sfx: "whoosh", vol: 0.3 }, { t: 5.5, sfx: "impact-bass-2", vol: 0.45, max: 0.7 }]);
