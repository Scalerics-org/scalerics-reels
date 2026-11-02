import { bomba, CRONO_VALS, tickJS } from "./pj.mjs";
export const ID = "s01-nadie";
const V = CRONO_VALS(0, 3.7);
export const CSS = `
  $ .s01-nadie { top: 586px; font-size: 104px; color: #ecebe4; }
  $ .s01-nadie span { color: #ff2d2d; }
  $ .s01-oscuro { position: absolute; left: -1000px; top: -1000px; width: 3080px; height: 3920px; background: radial-gradient(circle at 50% 50%, rgba(7,8,7,0) 0, rgba(7,8,7,0) 230px, rgba(7,8,7,0.93) 360px); }
  $ .s01-sello { left: 50%; top: 1340px; transform: translateX(-50%) rotate(-4deg); font-size: 38px; background: rgba(7,8,7,0.8); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(155 712) scale(1.1)"><g class="s01-bomba">${bomba("s01", { crono: V })}</g></g>
          <rect class="s01-marco" x="298" y="758" width="108" height="58" rx="6" fill="none" stroke="#ff2d2d" stroke-width="6" />
          <path class="rl s01-flecha" d="M200 706 C230 730 260 750 290 770 M290 770 L264 766 M290 770 L282 746" stroke-width="8" />
        </svg>
        <div class="s01-oscuro"></div>
        <div class="txt ops s01-nadie">¡Nadie se <span>mueve!</span></div>
        <div class="sello s01-sello">planilla del local</div>
`;
export const JS = `
      const ALGUIEN = 1.02, FORMULA = 1.6, PLANILLA = 2.2;
      ${tickJS("s01", V)}
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      // la linterna busca en la oscuridad y encuentra la bomba
      tl.fromTo(q(".s01-oscuro"), { x: -260, y: 240 }, { x: 160, y: -140, duration: 0.7, ease: "sine.inOut" }, 0);
      tl.to(q(".s01-oscuro"), { x: 0, y: 0, duration: 0.35, ease: "power2.out" }, 0.7);
      tl.to(q(".s01-oscuro"), { scale: 3.2, opacity: 0, duration: 0.5, ease: "power2.in" }, ALGUIEN - 0.05);
      golpe(".s01-nadie", 0.1, 2.2);
      sacudon(0.12, 1);
      // "fórmula": la celda tocada se marca en rojo
      dibujar(".s01-marco", FORMULA, 0.3);
      dibujar(".s01-flecha", FORMULA + 0.1, 0.3);
      tl.fromTo(q(".s01-marco"), { opacity: 1 }, { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, FORMULA + 0.4);
      tl.to(q(".s01-nadie"), { y: -10, opacity: 0.85, duration: 0.3 }, FORMULA);
      // "planilla del local"
      tl.set(q(".s01-sello"), { xPercent: 0 }, 0);
      pop(".s01-sello", PLANILLA + 0.1, 0.3);
      tl.fromTo(q(".s01-bomba"), { x: 0 }, { x: 4, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, PLANILLA + 0.1);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.15, sfx: "whoosh", vol: 0.22 },
  { t: 1.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.6, sfx: "glitch-1", vol: 0.3, max: 0.4 },
  { t: 2.3, sfx: "click", vol: 0.3 },
];
