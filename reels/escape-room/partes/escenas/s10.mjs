import { seg7, pillo } from "./pj.mjs";
export const ID = "s10-diez";
export const CSS = `
  $ .s10-cartel { left: 0; right: 0; margin: 0 auto; width: max-content; top: 815px; background: #ff4fd8; font-size: 52px; transform: rotate(-3deg); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-rel">${seg7("s10-r", { x: 271, y: 615, w: 100, h: 170, t: 20, gap: 26 })}</g>
          <g transform="translate(378 850) scale(0.9)"><g class="s10-pj">
            <path d="M50 470 C10 380 40 230 100 170 M310 470 C350 380 320 230 260 170" fill="none" stroke="#efe9ff" stroke-width="56" stroke-linecap="round" /><path d="M50 470 C10 380 40 230 100 170 M310 470 C350 380 320 230 260 170" fill="none" stroke="#9b5cff" stroke-width="42" stroke-linecap="round" />
            ${pillo("s10")}
            <circle class="cara" cx="100" cy="166" r="22" /><circle class="cara" cx="260" cy="166" r="22" />
          </g></g>
        </svg>
        <div class="cartel s10-cartel">¡Llamen al dueño!</div>
`;
export const JS = `
      reloj("s10-r", (t) => mmss(600 - t * 2));
      tl.fromTo(q(".s10-rel"), { scale: 1.4, svgOrigin: "540 700" }, { scale: 1, svgOrigin: "540 700", duration: 0.25, ease: "power4.out" }, 0);
      sacudon(0.05, 1.2);
      tl.to(q(".s10-rel"), { opacity: 0.3, duration: 0.1, yoyo: true, repeat: 7, ease: "steps(1)" }, 0.4);
      tl.fromTo(q(".s10-pj"), { opacity: 0.5, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s10-pj"), { x: 6, duration: 0.05, yoyo: true, repeat: 21, ease: "none" }, 0.3);
      hablar(".s10-pillo-boca", 1.55, 2.6, 0.2, 0.1);
      tl.to(q(".s10-pillo-cejas"), { y: -12, duration: 0.1 }, 1.55);
      golpe(".s10-cartel", 1.75, 2);
      sacudon(1.8, 1);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.3, sfx: "error", vol: 0.15 },
  { t: 1.7, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
