import { escena, sfx, duraciones, C } from "./comun.mjs";
const id = "s08-brujula", dur = duraciones()[id];
const marcas = Array.from({ length: 16 }, (_, i) => `<path d="M0 -205 L0 ${i % 4 ? -185 : -170}" transform="rotate(${i * 22.5})" />`).join("");
escena({ id, dur,
  css: `
    & .XX-ni { top: 585px; font-size: 92px; color: ${C.perg}; }
    & .XX-peli { position: absolute; left: 0; right: 0; top: 1260px; text-align: center; font-size: 62px; color: ${C.perg}; -webkit-text-stroke: 7px ${C.tinta}; paint-order: stroke fill; }
    & .XX-sin { left: 300px; top: 1110px; font-size: 80px; transform: rotate(-8deg); }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 940)">
            <g class="XX-caja">
              <circle class="tinta" fill="${C.oro}" r="250" />
              <circle class="tinta" fill="${C.perg}" r="220" />
              <g fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round">${marcas}</g>
              <g font-family="Cinzel" font-weight="900" font-size="46" fill="${C.tinta}" text-anchor="middle"><text y="-118">N</text><text y="150">S</text><text x="135" y="16">E</text><text x="-135" y="16">O</text></g>
              <g class="XX-aguja"><path class="tinta" fill="${C.rojo}" d="M0 -150 L22 0 L-22 0 Z" /><path class="tinta" fill="${C.sepia}" d="M0 150 L22 0 L-22 0 Z" /><circle class="tinta" fill="${C.oro}" r="16" /></g>
            </g>
          </g>
          <g class="XX-preg" font-family="Cinzel" font-weight="900" font-size="110" fill="${C.oro}" stroke="${C.tinta}" stroke-width="8" paint-order="stroke"><text x="150" y="820">?</text><text x="870" y="900">?</text><text x="200" y="1180">?</text></g>
        </svg>
        <div class="grande XX-ni">NI CON LA BRÚJULA</div>
        <div class="XX-peli mano">(la de la película)</div>
        <div class="sello XX-sin">SIN RUMBO</div>
  `,
  js: `
const BRUJULA = 0.4, JACK = 1.12, ENCONTRAS = 1.92, CAPITAN = 2.32;
// cuadro 0: la brújula ya está y la aguja tiembla
tl.fromTo(q(".XX-caja"), { scale: 0.8, rotation: -20, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, transformOrigin: "50% 50%", duration: 0.35, ease: "back.out(1.6)" }, 0);
slam(q(".XX-ni"), BRUJULA);
golpe(BRUJULA + 0.04, 10);
// la aguja gira como loca
tl.fromTo(q(".XX-aguja"), { rotation: 0 }, { rotation: 1440, svgOrigin: "0 0", duration: ENCONTRAS - 0.1, ease: "power1.in" }, 0.1);
pop(q(".XX-peli"), JACK, 0.5);
// "no la encontrás": se clava apuntando a cualquier lado y tiembla
tl.to(q(".XX-aguja"), { rotation: 1440 + 200, svgOrigin: "0 0", duration: 0.25, ease: "back.out(3)" }, ENCONTRAS);
tl.to(q(".XX-aguja"), { rotation: 1440 + 170, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, ENCONTRAS + 0.25);
tl.to(q(".XX-caja"), { rotation: -6, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 5 }, ENCONTRAS);
slam(q(".XX-sin"), ENCONTRAS + 0.1);
qa(".XX-preg text").forEach((p, i) => { pop(p, ENCONTRAS + 0.15 + i * 0.12, 0.2); tl.to(p, { y: -16, duration: 0.25, yoyo: true, repeat: 3 }, CAPITAN + i * 0.1); });
`,
});
sfx(id, [{ t: 0.35, sfx: "golpe", vol: 0.3 }, { t: 0.5, sfx: "riser", vol: 0.25, max: 1.4 }, { t: 1.95, sfx: "glitch-1", vol: 0.3 }, { t: 2.05, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }]);
