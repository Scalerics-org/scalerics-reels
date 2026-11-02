import { companera, cronoGrupos, CRONO_VALS, tickJS } from "./pj.mjs";
export const ID = "s09-diez";
const G0 = 37.26, V = CRONO_VALS(G0, G0 + 3.9);
export const CSS = `
  $ .s09-cel { position: absolute; left: 520px; top: 880px; width: 400px; height: 440px; border-radius: 48px; background: #1f231d; border: 7px solid #ecebe4; text-align: center; overflow: hidden; }
  $ .s09-cel .lla { margin-top: 44px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; color: #ecebe4; opacity: 0.7; }
  $ .s09-cel .nom { margin-top: 18px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; color: #ecebe4; }
  $ .s09-cel .pais { margin-top: 6px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #ffb020; }
  $ .s09-nc { position: absolute; left: 520px; top: 1180px; width: 400px; text-align: center; font-family: "Black Ops One", sans-serif; font-size: 50px; color: #ff2d2d; white-space: nowrap; }
  $ .s09-diez { position: absolute; left: 60px; top: 600px; font-family: "Black Ops One", sans-serif; font-size: 44px; color: #ecebe4; letter-spacing: 0.1em; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-crono">
            <rect class="k" x="200" y="650" width="680" height="200" rx="20" style="stroke:#ff2d2d" />
            ${cronoGrupos("s09", V, 540, 676, 148)}
            <circle class="s09-luz" cx="852" cy="676" r="10" fill="#ff2d2d" />
          </g>
          <g transform="translate(40 900) scale(0.82)"><g class="s09-comp">${companera("s09", { linterna: false })}</g></g>
          <g class="s09-ondas">
            <path class="yl s09-o1" d="M940 980 C970 1010 970 1050 940 1080" stroke-width="7" />
            <path class="yl s09-o2" d="M975 950 C1020 1000 1020 1060 975 1110" stroke-width="7" />
          </g>
        </svg>
        <div class="s09-cel">
          <div class="lla">LLAMANDO...</div>
          <div class="nom">Cuñado</div>
          <div class="pais">+34 · España</div>
        </div>
        <div class="s09-nc">NO CONTESTA</div>
`;
export const JS = `
      const DIEZ = 0.3, Y = 1.3, CUNADO = 1.9, CONTESTA = 2.5;
      ${tickJS("s09", V)}
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.06, duration: DUR, ease: "none", transformOrigin: "50% 40%" }, 0);
      tl.fromTo(q(".s09-crono"), { opacity: 0.4, scale: 1.3 }, { opacity: 1, scale: 1, svgOrigin: "540 750", duration: 0.25, ease: "power3.out" }, 0);
      sacudon(DIEZ, 1.3);
      tl.fromTo(q(".s09-crono"), { scale: 1 }, { scale: 1.06, svgOrigin: "540 750", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, 0.74);
      tl.fromTo(q(".s09-crono"), { scale: 1 }, { scale: 1.06, svgOrigin: "540 750", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, 1.74);
      tl.fromTo(q(".s09-crono"), { scale: 1 }, { scale: 1.06, svgOrigin: "540 750", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, 2.74);
      // la compañera llama al cuñado
      entra(".s09-comp", Y - 0.25, -150, 0, 0.25);
      hablar(".s09-comp-boca", 0, 0.9, 0.3);
      hablar(".s09-comp-boca", Y, 2.9, 0.3);
      entra(".s09-cel", Y - 0.2, 150, 0, 0.3);
      gsap.set(qa(".s09-o1, .s09-o2"), { opacity: 0 });
      tl.fromTo(qa(".s09-o1, .s09-o2"), { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.1, yoyo: true, repeat: 5, immediateRender: false }, CUNADO - 0.4);
      tl.to(q(".s09-cel"), { x: 6, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, CUNADO - 0.4);
      golpe(".s09-nc", CONTESTA, 2.0);
      tl.to(q(".s09-cel"), { borderColor: "#ff2d2d", duration: 0.1 }, CONTESTA);
      tl.set(q(".s09-nc"), { rotation: -5 }, 0);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-1", vol: 0.38, max: 0.5 },
  { t: 0.74, sfx: "click", vol: 0.3 },
  { t: 1.74, sfx: "click", vol: 0.3 },
  { t: 1.5, sfx: "notification", vol: 0.22 },
  { t: 2.45, sfx: "error", vol: 0.3, max: 1.0 },
  { t: 2.74, sfx: "click", vol: 0.3 },
];
