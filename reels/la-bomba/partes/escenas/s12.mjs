import { experto } from "./pj.mjs";
export const ID = "s12-tiznado";
const humo = [[200, 1250, 120], [880, 1200, 140], [540, 1330, 160], [160, 760, 90], [940, 700, 100]];
export const CSS = `
  $ .s12-no { left: 250px; top: 600px; font-size: 46px; background: rgba(7,8,7,0.85); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${humo.map(([x, y, r]) => `<circle class="s12-humo" cx="${x}" cy="${y}" r="${r}" fill="#3b3d38" opacity="0.8" />`).join("")}
          <g transform="translate(306 700) scale(1.3)"><g class="s12-exp">${experto("s12", { tiznado: true })}</g></g>
          <path class="l s12-hilo" d="M440 680 C430 640 460 620 450 580 M640 690 C660 650 630 630 650 590" stroke-width="5" opacity="0.6" />
        </svg>
        <div class="sello s12-no">no era la fórmula</div>
`;
export const JS = `
      const ERA = 0.9, FORMULA = 1.3;
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1.0, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(qa(".s12-humo"), { opacity: 0.95, scale: 1.4 }, { opacity: 0.25, scale: 1.0, transformOrigin: "50% 50%", duration: DUR, ease: "power1.out" }, 0);
      tl.fromTo(q(".s12-exp"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      hablar(".s12-exp-boca", 0.0, 1.6, 0.35);
      parpadeo(".s12-exp-ojos", 0.25);
      parpadeo(".s12-exp-ojos", 0.45);
      tl.fromTo(q(".s12-hilo"), { y: 0, opacity: 0.6 }, { y: -60, opacity: 0, duration: 1.4, ease: "none" }, 0);
      tl.set(q(".s12-no"), { rotation: -4 }, 0);
      pop(".s12-no", ERA, 0.25);
`;
export const SFX = [
  { t: 0.3, sfx: "click-soft", vol: 0.25 },
  { t: 0.9, sfx: "pop", vol: 0.25 },
];
