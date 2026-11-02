import { bomba, CRONO_VALS, tickJS } from "./pj.mjs";
export const ID = "s06-rojo";
const G0 = 22.56, V = CRONO_VALS(G0, G0 + 6.2);
// pantalla en coordenadas globales: bomba en translate(155 640) scale(1.1); pantalla local x 135..565, y 16..366
const SX = 155 + 135 * 1.1, SY = 640 + 16 * 1.1, SW = 430 * 1.1, SH = 350 * 1.1;
let refs = "";
for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) refs += `<text class="s06-ref" x="${SX + 24 + c * 116}" y="${SY + 82 + r * 52}" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="#ecebe4" data-layout-ignore>#¡REF!</text>`;
export const CSS = `
  $ .s06-stock { position: absolute; left: 140px; width: 800px; top: 760px; height: 300px; background: #070807; border: 8px solid #ff2d2d; border-radius: 22px; text-align: center; box-shadow: 0 0 80px rgba(255,45,45,0.6); }
  $ .s06-stock b { display: block; margin-top: 26px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 48px; letter-spacing: 0.3em; color: #ecebe4; }
  $ .s06-stock span { display: block; font-family: "Black Ops One", sans-serif; font-size: 190px; line-height: 1; color: #ff2d2d; }
  $ .s06-error { left: 50%; top: 600px; transform: translateX(-50%); font-size: 54px; background: rgba(7,8,7,0.85); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(155 640) scale(1.1)"><g class="s06-bomba">${bomba("s06", { crono: V })}</g></g>
          <rect class="s06-velo" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="6" fill="#ff2d2d" />
          ${refs}
        </svg>
        <div class="sello s06-error">ERROR EN TODAS LAS CELDAS</div>
        <div class="s06-stock"><b>STOCK</b><span>-40</span></div>
`;
export const JS = `
      const ROJO = 0.89, ERROR = 1.57, CELDAS = 2.7, STOCK = 3.7, MENOS = 4.39, CUARENTA = 5.0;
      ${tickJS("s06", V)}
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.07, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      // "se puso todo en rojo": la pantalla se tiñe
      gsap.set(q(".s06-velo"), { opacity: 0 });
      tl.to(q(".s06-velo"), { opacity: 0.55, duration: 0.08, ease: "steps(1)" }, 0.2);
      tl.to(q(".s06-velo"), { opacity: 0.1, duration: 0.08, ease: "steps(1)" }, 0.45);
      tl.to(q(".s06-velo"), { opacity: 0.85, duration: 0.15 }, ROJO - 0.05);
      sacudon(ROJO, 1);
      // "error en todas las celdas"
      const R = qa(".s06-ref");
      gsap.set(R, { opacity: 0 });
      R.forEach((el, i) => tl.to(el, { opacity: 1, duration: 0.01 }, ERROR + ((i * 7) % R.length) * 0.045));
      pop(".s06-error", ERROR, 0.25);
      tl.set(q(".s06-error"), { rotation: -3 }, 0);
      tl.to(qa(".s06-ref"), { opacity: 0.4, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)" }, CELDAS);
      // "el stock da menos cuarenta"
      sale(".s06-error", STOCK - 0.3, 0.15);
      gsap.set(q(".s06-stock span"), { opacity: 0 });
      entra(".s06-stock", STOCK - 0.2, 0, 80, 0.3);
      golpe(".s06-stock span", CUARENTA, 2.6);
      sacudon(CUARENTA + 0.05, 1.4);
      tl.fromTo(q(".s06-stock"), { borderColor: "#ff2d2d" }, { borderColor: "#ecebe4", duration: 0.15, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, CUARENTA + 0.1);
`;
export const SFX = [
  { t: 0.2, sfx: "glitch-2", vol: 0.3, max: 0.5 },
  { t: 0.85, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 1.55, sfx: "error", vol: 0.3, max: 1.0 },
  { t: 1.6, sfx: "glitch-1", vol: 0.25, max: 0.4 },
  { t: 3.5, sfx: "whoosh-short", vol: 0.22 },
  { t: 4.95, sfx: "impact-bass-1", vol: 0.45, max: 0.7 },
];
