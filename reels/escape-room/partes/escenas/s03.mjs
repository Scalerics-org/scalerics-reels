import { seg7, gm } from "./pj.mjs";
export const ID = "s03-una-hora";
export const CSS = `
  $ .s03-cal { top: 935px; font-size: 50px; font-weight: 800; text-transform: none; }
  $ .s03-peor { top: 1010px; font-size: 130px; color: #ff2d3d; text-shadow: 0 0 34px rgba(255, 45, 61, 0.6); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-rel">${seg7("s03-r", { x: 144, y: 630, w: 150, h: 260, t: 30, gap: 36 })}</g>
          <g transform="translate(450 1150) scale(0.6)"><g class="s03-gm">${gm("s03")}</g></g>
        </svg>
        <div class="txt s03-cal">Esto no es El juego del calamar.</div>
        <div class="txt s03-peor">Es peor.</div>
`;
export const JS = `
      reloj("s03-r", (t) => (t < 0.31 ? "6000" : mmss(3600 - (t - 0.31) * 3)));
      tl.fromTo(q(".s03-rel"), { scale: 1.25, svgOrigin: "540 760" }, { scale: 1, svgOrigin: "540 760", duration: 0.3, ease: "power4.out" }, 0);
      sacudon(0.05, 1);
      tl.fromTo(q(".s03-gm"), { opacity: 0.4, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s03-gm-ojo"), { opacity: 0.5 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 15, ease: "steps(1)" }, 0);
      qa(".s03-gm-onda").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 9, delay: i * 0.08 }, 0));
      pop(".s03-cal", 1.31);
      tl.to(q(".s03-cal"), { opacity: 0.45, duration: 0.2 }, 2.6);
      golpe(".s03-peor", 2.71, 2.4);
      sacudon(2.75, 1.4);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.3, sfx: "click", vol: 0.25 },
  { t: 1.3, sfx: "whoosh-short", vol: 0.25 },
  { t: 2.65, sfx: "impact-bass-1", vol: 0.5, max: 0.7 },
];
