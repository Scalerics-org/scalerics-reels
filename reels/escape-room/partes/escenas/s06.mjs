import { hoja } from "./pj.mjs";
export const ID = "s06-planillas";
export const CSS = `
  $ .s06-dist { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; color: #ff2d3d; text-shadow: 0 0 26px rgba(255, 45, 61, 0.7); line-height: 1; }
  $ .s06-d1 { left: 330px; top: 800px; }
  $ .s06-d2 { left: 670px; top: 800px; }
  $ .s06-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1170px; font-size: 48px; }
`;
const C = [[50, -5], [390, 0], [730, 5]];
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${[
            hoja("s06", 1, "STOCK FINAL", "48"),
            hoja("s06", 2, "STOCK FINAL 2", "112"),
            hoja("s06", 3, ["STOCK FINAL", "AHORA SÍ"], "7", { tcolor: "#0c0718" }),
          ].map((h, i) => `<g transform="translate(${C[i][0]} 690) rotate(${C[i][1]} 150 200)"><g class="s06-c s06-c${i + 1}">${h}</g></g>`).join("")}
        </svg>
        <div class="s06-dist s06-d1">≠</div>
        <div class="s06-dist s06-d2">≠</div>
        <div class="sello s06-sello">No coinciden</div>
`;
export const JS = `
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      // la primera planilla, centrada y medio entrando en el cuadro 0
      tl.fromTo(q(".s06-c2"), { opacity: 0.5, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      // "Bueno, tres": entran las otras dos
      [".s06-c1", ".s06-c3"].forEach((s, i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, x: i ? 300 : -300, rotation: i ? 20 : -20, svgOrigin: "150 200" }, { opacity: 1, x: 0, rotation: 0, svgOrigin: "150 200", duration: 0.35, ease: "power3.out", immediateRender: false }, 1.4 + i * 0.12);
      });
      // los números arrancan tapados
      qa(".s06-c text[class*=num]").forEach((n) => gsap.set(n, { opacity: 0 }));
      // cada título se nombra
      [[".s06-c1", 1.8], [".s06-c2", 2.9], [".s06-c3", 4.5]].forEach(([s, t]) => {
        tl.to(q(s), { y: -30, duration: 0.15, ease: "power2.out" }, t);
        tl.to(q(s), { y: 0, duration: 0.3, ease: "power2.in" }, t + 0.5);
      });
      tl.to(q(".s06-c3"), { rotation: 6, svgOrigin: "150 200", duration: 0.07, yoyo: true, repeat: 5 }, 5.4);
      // "las tres dicen distinto": números
      [[".s06-p1-num", 6.3], [".s06-p2-num", 6.5], [".s06-p3-num", 6.7]].forEach(([s, t]) => {
        tl.fromTo(q(s), { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: false }, t);
        tl.fromTo(q(s), { scale: 1.6, svgOrigin: "150 260" }, { scale: 1, svgOrigin: "150 260", duration: 0.25, ease: "back.out(2)", immediateRender: false }, t);
      });
      golpe(".s06-d1", 6.95, 2); golpe(".s06-d2", 7.05, 2);
      golpe(".s06-sello", 7.15, 2);
      tl.set(q(".s06-sello"), { rotation: -4 }, 0);
      sacudon(7.0, 1);
`;
export const SFX = [
  { t: 0.0, sfx: "pop", vol: 0.3 },
  { t: 1.4, sfx: "whoosh-short", vol: 0.3 },
  { t: 1.8, sfx: "click", vol: 0.25 },
  { t: 2.9, sfx: "click", vol: 0.25 },
  { t: 4.5, sfx: "click", vol: 0.25 },
  { t: 6.3, sfx: "key-press", vol: 0.3 },
  { t: 6.5, sfx: "key-press", vol: 0.3 },
  { t: 6.7, sfx: "key-press", vol: 0.3 },
  { t: 6.95, sfx: "glitch-1", vol: 0.25, max: 0.35 },
  { t: 7.1, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
