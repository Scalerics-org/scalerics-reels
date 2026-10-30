import { seg7, gm } from "./pj.mjs";
export const ID = "s07-cuarenta";
export const CSS = `
  $ .s07-q { top: 920px; font-size: 64px; color: #ff2d3d; letter-spacing: 0.1em; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-rel">${seg7("s07-r", { x: 144, y: 630, w: 150, h: 260, t: 30, gap: 36 })}</g>
          <g transform="translate(450 1060) scale(0.7)"><g class="s07-gm">${gm("s07")}</g></g>
        </svg>
        <div class="txt s07-q">Quedan</div>
`;
export const JS = `
      reloj("s07-r", (t) => mmss(2400 - t * 2));
      tl.fromTo(q(".s07-rel"), { scale: 1.3, svgOrigin: "540 760" }, { scale: 1, svgOrigin: "540 760", duration: 0.25, ease: "power4.out" }, 0);
      sacudon(0.05, 1.2);
      tl.fromTo(q(".s07-gm"), { opacity: 0.4, y: 60 }, { opacity: 1, y: 0, duration: 0.3 }, 0);
      tl.fromTo(q(".s07-gm-ojo"), { opacity: 0.4 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 9, ease: "steps(1)" }, 0);
      qa(".s07-gm-onda").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 5, delay: i * 0.06 }, 0));
      pop(".s07-q", 0.1);
      tl.to(q(".s07-rel"), { opacity: 0.4, duration: 0.08, yoyo: true, repeat: 5, ease: "steps(1)" }, 0.8);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.6, sfx: "error", vol: 0.15 },
];
