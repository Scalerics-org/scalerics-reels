import { experto, HAZDEF } from "./pj.mjs";
export const ID = "s07-cables";
export const CSS = `
  $ .s07-tranq { top: 600px; font-size: 100px; color: #ecebe4; }
  $ .s07-peli { left: 60px; top: 1300px; font-size: 34px; border-color: #ffb020; color: #ffb020; background: rgba(7,8,7,0.85); }
  $ .s07-rojo { position: absolute; left: 600px; top: 640px; font-family: "Black Ops One", sans-serif; font-size: 96px; color: #ff2d2d; white-space: nowrap; }
  $ .s07-azul { position: absolute; left: 640px; top: 1150px; font-family: "Black Ops One", sans-serif; font-size: 96px; color: #2f7bff; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">${HAZDEF}
          <circle cx="760" cy="980" r="440" fill="url(#hazgrad)" />
          <path class="l s07-cr" d="M1120 780 C900 760 760 860 720 960 C690 1040 820 1080 1120 1000" style="stroke:#ff2d2d; stroke-width:30px" />
          <path class="l s07-ca" d="M1120 1120 C920 1140 800 1080 740 1000 C700 940 860 900 1120 900" style="stroke:#2f7bff; stroke-width:30px" />
          <g transform="translate(20 690) scale(1.2)"><g class="s07-exp">${experto("s07", { alicate: true })}</g></g>
          <circle class="rl s07-cir" cx="740" cy="960" r="70" stroke-width="7" />
        </svg>
        <div class="txt ops s07-tranq">Tranquilos.</div>
        <div class="sello s07-peli">como en las películas</div>
        <div class="s07-rojo">¿ROJO</div>
        <div class="s07-azul">o AZUL?</div>
`;
export const JS = `
      const ESTO = 1.21, PELIS = 1.89, CORTO = 2.92, ROJO = 3.59, AZUL = 4.4;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.08, duration: DUR, ease: "none", transformOrigin: "60% 55%" }, 0);
      tl.fromTo(q(".s07-exp"), { opacity: 0.3, x: -60 }, { opacity: 1, x: 0, duration: 0.3 }, 0);
      dibujar(".s07-cr", 0.0, 0.6);
      dibujar(".s07-ca", 0.15, 0.6);
      hablar(".s07-exp-boca", 0.0, 0.8, 0.35);
      hablar(".s07-exp-boca", ESTO, 2.5, 0.35);
      hablar(".s07-exp-boca", CORTO, 4.9, 0.35);
      golpe(".s07-tranq", 0.1, 1.6);
      sale(".s07-tranq", CORTO - 0.3, 0.2);
      pop(".s07-peli", PELIS, 0.3);
      tl.set(q(".s07-peli"), { rotation: -4 }, 0);
      // el alicate se acerca y duda entre los dos cables
      tl.to(q(".s07-exp-brazo"), { x: 30, y: 10, duration: 0.5, ease: "sine.inOut" }, CORTO);
      tl.to(q(".s07-exp-brazo"), { x: 40, y: -30, duration: 0.3, ease: "sine.inOut" }, ROJO);
      tl.to(q(".s07-exp-brazo"), { x: 40, y: 40, duration: 0.3, ease: "sine.inOut" }, AZUL);
      golpe(".s07-rojo", ROJO, 2.0);
      tl.fromTo(q(".s07-cr"), { strokeWidth: 30 }, { strokeWidth: 42, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, ROJO);
      golpe(".s07-azul", AZUL, 2.0);
      tl.fromTo(q(".s07-ca"), { strokeWidth: 30 }, { strokeWidth: 42, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, AZUL);
      dibujar(".s07-cir", CORTO + 0.1, 0.4);
      tl.to(qa(".s07-gota"), { y: 8, duration: 0.25, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
`;
export const SFX = [
  { t: 0.1, sfx: "whoosh-short", vol: 0.22 },
  { t: 1.9, sfx: "pop", vol: 0.25 },
  { t: 2.9, sfx: "riser", vol: 0.2, max: 2.0 },
  { t: 3.55, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 4.36, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
];
