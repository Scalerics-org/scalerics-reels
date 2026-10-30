import { nestor } from "./pj.mjs";
export const ID = "s03-nestor";
export const CSS = `
  $ .s03-nombre { position: absolute; left: 0; right: 0; top: 1230px; text-align: center; }
  $ .s03-nombre span { display: inline-block; padding: 12px 26px 10px; background: #f4efe4; color: #050b18; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.16em; }
  $ .s03-atrapado { top: 600px; font-size: 120px; color: #ff2d2d; text-shadow: 0 0 36px rgba(255,45,45,0.5); }
  $ .s03-sello { left: 560px; top: 1080px; transform: rotate(-8deg); border-color: #ffb84d; color: #ffb84d; background: rgba(5,11,24,0.85); font-size: 32px; line-height: 1.2; text-align: center; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-reloj">
            <circle class="rl s03-aro" cx="540" cy="900" r="330" stroke-width="8" opacity="0.7" />
            <path class="r s03-flecha" d="M520 548 L572 570 L520 594 Z" stroke-width="4" />
          </g>
          <g transform="translate(342 660) scale(1.1)"><g class="s03-nes">${nestor("s03", { pijama: true })}</g></g>
        </svg>
        <div class="s03-nombre"><span>NÉSTOR · DUEÑO DE LOCAL</span></div>
        <div class="txt s03-atrapado">Atrapado</div>
        <div class="sello s03-sello">Como en la película<br/>de la marmota</div>
`;
export const JS = `
      const NESTOR = 0.2, ATRAPADO = 1.3, PELICULA = 2.4;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s03-nes"), { opacity: 0.4, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      entra(".s03-nombre", NESTOR, 0, 40, 0.3);
      dibujar(".s03-aro", 0.05, 0.8);
      pop(".s03-flecha", 0.7, 0.2);
      // el reloj gira alrededor de Néstor
      tl.fromTo(q(".s03-reloj"), { rotation: 0 }, { rotation: 300, svgOrigin: "540 900", duration: DUR - 0.6, ease: "power1.in", immediateRender: false }, 0.8);
      golpe(".s03-atrapado", ATRAPADO + 0.05, 2.4);
      sacudon(ATRAPADO + 0.1, 1);
      tl.to(q(".s03-nes"), { x: -16, duration: 0.07, yoyo: true, repeat: 5, ease: "none" }, ATRAPADO + 0.1);
      pop(".s03-sello", PELICULA, 0.3);
      hablar(".s03-boca", 0.05, 0.9); hablar(".s03-boca", 1.1, 3.6);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh", vol: 0.25 },
  { t: 1.25, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
  { t: 2.4, sfx: "pop", vol: 0.3 },
  { t: 2.9, sfx: "click", vol: 0.25 },
];
