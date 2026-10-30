import { seg7, puerta, candado } from "./pj.mjs";
export const ID = "s16-cta";
const RESP = "Nunca. Seguimos adentro.";
export const CSS = `
  $ .s16-burb { position: absolute; left: 430px; top: 880px; width: 590px; padding: 24px 30px; border-radius: 30px; background: #efe9ff; color: #0c0718; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.2; }
  $ .s16-burb small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.14em; color: #9b5cff; margin-bottom: 10px; }
  $ .s16-burb .ch { opacity: 0; }
  $ .s16-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1220px; font-size: 52px; color: #0c0718; background: #39ffd2; border-color: #39ffd2; box-shadow: 0 0 30px rgba(57, 255, 210, 0.5); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s16-rel">${seg7("s16-r", { x: 271, y: 610, w: 100, h: 170, t: 20, gap: 26 })}</g>
          <g transform="translate(80 830) scale(0.58)"><g class="s16-puerta">${puerta("s16")}</g></g>
          <g transform="translate(200 1000) scale(0.4)"><g class="s16-cand">${candado("s16")}</g></g>
        </svg>
        <div class="s16-burb"><small>TU TIEMPO</small>${[...RESP].map((c) => (c === " " ? " " : `<span class="ch">${c}</span>`)).join("")}</div>
        <div class="sello s16-sello">Comentá tu tiempo</div>
`;
export const JS = `
      reloj("s16-r", (t) => (Math.floor(t / 0.45) % 2 ? "    " : "----"));
      tl.fromTo(q(".s16-rel"), { scale: 1.2, svgOrigin: "540 700" }, { scale: 1, svgOrigin: "540 700", duration: 0.3, ease: "power4.out" }, 0);
      tl.fromTo(q(".s16-puerta"), { opacity: 0.5, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s16-cand"), { opacity: 0.5, y: -60 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out" }, 0);
      tl.to(q(".s16-cand"), { rotation: 8, svgOrigin: "300 1050", duration: 0.12, yoyo: true, repeat: 5 }, 1.0);
      pop(".s16-burb", 1.9);
      qa(".s16-burb .ch").forEach((c, i) => tl.set(c, { opacity: 1 }, 2.3 + i * 0.06));
      golpe(".s16-sello", 2.67, 2);
      tl.set(q(".s16-sello"), { rotation: -3 }, 0);
      sacudon(2.7, 0.8);
      tl.to(q(".s16-sello"), { scale: 1.06, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 3.4);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 1.9, sfx: "pop", vol: 0.3 },
  { t: 2.3, sfx: "typing", vol: 0.25, max: 1.4 },
  { t: 2.65, sfx: "impact-bass-2", vol: 0.4, max: 0.8 },
];
