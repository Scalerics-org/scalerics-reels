import { pillo, cuaderno } from "./pj.mjs";
export const ID = "s08-proveedor";
export const CSS = `
  $ .s08-burb { position: absolute; left: 440px; top: 640px; padding: 22px 34px; border-radius: 34px; background: #39ffd2; color: #0c0718; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 52px; white-space: nowrap; box-shadow: 0 0 30px rgba(57, 255, 210, 0.45); }
  $ .s08-burb small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.14em; margin-bottom: 6px; }
  $ .s08-debe { left: 690px; top: 1070px; font-size: 60px; color: #efe9ff; background: #ff2d3d; }
  $ .s08-dist { position: absolute; left: 720px; top: 800px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; color: #ff2d3d; text-shadow: 0 0 26px rgba(255, 45, 61, 0.7); line-height: 1; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 790) scale(0.95)"><g class="s08-pj">${pillo("s08")}
            <path class="u" d="M300 460 C350 420 330 340 290 300" stroke-width="7" />
            <rect class="k" x="262" y="200" width="44" height="100" rx="10" stroke-width="6" />
            <path class="cl s08-gota" d="M100 170 C90 190 88 204 100 210 C112 204 110 190 100 170 Z" stroke-width="5" />
          </g></g>
          <path class="l fino s08-linea" d="M330 990 C380 900 400 800 440 760" stroke-dasharray="10 12" />
          <g transform="translate(600 900) scale(0.82)"><g class="s08-cuad">${cuaderno("s08")}</g></g>
        </svg>
        <div class="s08-burb"><small>EL PROVEEDOR</small>Ya me pagaron.</div>
        <div class="s08-dist">≠</div>
        <div class="sello s08-debe">Debe</div>
`;
export const JS = `
      tl.fromTo(q(".s08-pj"), { opacity: 0.5, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s08-pj"), { rotation: -2, svgOrigin: "180 540", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.3);
      dibujar(".s08-linea", 0.9, 0.3);
      pop(".s08-burb", 1.1);
      tl.to(q(".s08-burb"), { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1 }, 1.8);
      gsap.set(q(".s08-cuad"), { opacity: 0 });
      tl.fromTo(q(".s08-cuad"), { opacity: 0, y: 160, rotation: 10, svgOrigin: "230 160" }, { opacity: 1, y: 0, rotation: 4, svgOrigin: "230 160", duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, 2.65);
      dibujar(".s08-garabato", 2.8, 0.4);
      tl.to(q(".s08-pillo-cejas"), { y: -10, rotation: 0, duration: 0.15 }, 2.9);
      gsap.set(q(".s08-gota"), { opacity: 0 });
      tl.fromTo(q(".s08-gota"), { opacity: 0, y: 0 }, { opacity: 1, y: 40, duration: 0.6, ease: "power1.in", immediateRender: false }, 3.0);
      golpe(".s08-debe", 3.5, 2.4);
      tl.set(q(".s08-debe"), { rotation: -8 }, 0);
      golpe(".s08-dist", 3.6, 2);
      sacudon(3.55, 1);
`;
export const SFX = [
  { t: 0.0, sfx: "click-soft", vol: 0.3 },
  { t: 1.1, sfx: "notification", vol: 0.3 },
  { t: 2.65, sfx: "whoosh-short", vol: 0.25 },
  { t: 3.45, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
];
