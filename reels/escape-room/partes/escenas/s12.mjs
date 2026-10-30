import { seg7, candado } from "./pj.mjs";
export const ID = "s12-nadie-sale";
export const CSS = `
  $ .s12-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1190px; font-size: 76px; color: #efe9ff; background: #ff2d3d; border-color: #ff2d3d; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-rel">${seg7("s12-r", { x: 144, y: 620, w: 150, h: 260, t: 30, gap: 36 })}</g>
          ${[170, 470, 770].map((x, i) => `<g transform="translate(${x} 950) scale(0.7)"><g class="s12-cand s12-cand${i}">${candado("s12" + i)}</g></g>`).join("")}
        </svg>
        <div class="sello s12-sello">Nadie sale</div>
`;
export const JS = `
      reloj("s12-r", (t) => (t < 0.9 ? mmss(2 - t * 2.2) : Math.floor((t - 0.9) / 0.3) % 2 ? "    " : "0000"));
      tl.fromTo(q(".s12-rel"), { scale: 1.15, svgOrigin: "540 750" }, { scale: 1, svgOrigin: "540 750", duration: 0.3, ease: "power4.out" }, 0);
      sacudon(1.0, 1.4);
      // los candados se cierran: "Nadie"
      qa(".s12-cand").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.2, ease: "power4.in", immediateRender: false }, 2.0 + i * 0.12);
        const arco = c.querySelector("[class*=arco]");
        tl.fromTo(arco, { y: -40 }, { y: 0, duration: 0.08, ease: "power4.in", immediateRender: false }, 2.25 + i * 0.12);
      });
      sacudon(2.3, 1);
      golpe(".s12-sello", 2.6, 2.6);
      tl.set(q(".s12-sello"), { rotation: -4 }, 0);
      sacudon(2.65, 1.6);
`;
export const SFX = [
  { t: 0.9, sfx: "error", vol: 0.2 },
  { t: 2.25, sfx: "click", vol: 0.4 },
  { t: 2.37, sfx: "click", vol: 0.4 },
  { t: 2.49, sfx: "click", vol: 0.4 },
  { t: 2.55, sfx: "impact-bass-2", vol: 0.5, max: 0.9 },
];
