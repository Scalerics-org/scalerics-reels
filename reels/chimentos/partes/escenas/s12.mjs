// s12-automaticos: la conductora "¿Solos? ¿Quién se los manda?"; el panelista: "Nadie, mi amor. Son automáticos."
import { escena, duracion, persona, COL } from "./comun.mjs";
const id = "s12-automaticos", dur = duracion(id);
const svg = `
  ${persona({ id: "s12-con", x: 290, y: 1450, s: 0.95, pelo: "rubia", pestanas: true, aros: true, cara: "sorpresa", ropa: COL.rosa })}
  ${persona({ id: "s12-puc", x: 800, y: 1450, s: 0.95, pelo: "jopo", cara: "chusma", cuello: "saco", ropa: COL.ink })}
`;
const html = `
  <div class="mk s12-quien">¿quién se los manda?</div>
  <div class="mk s12-nadie">nadie, mi amor</div>
  <div class="barra s12-auto">¡AUTOMÁTICOS!</div>`;
const css = `
  P .s12-quien { left: 0; right: 0; text-align: center; top: 680px; font-size: 104px; color: ${COL.rosac}; transform: rotate(-4deg); }
  P .s12-nadie { left: 0; right: 0; text-align: center; top: 640px; font-size: 104px; color: ${COL.oro}; transform: rotate(3deg); }
  P .s12-auto { left: 90px; top: 830px; font-size: 104px; color: ${COL.blanco}; background: ${COL.rosa}; transform: rotate(-3deg); }
`;
const js = `
      const SOLOS = 0, QUIEN = 1.39, MANDA = 1.91, NADIE = 3.14, AMOR = 3.59, AUTO = 4.03;
      tl.fromTo(qa(".s12-con, .s12-puc"), { y: 40 }, { y: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.05 }, 0);
      habla(".s12-con-boca", 0, 0.7, 0.1, 0.5);
      habla(".s12-con-boca", QUIEN, 1.0, 0.1, 0.5);
      tl.fromTo(q(".s12-con"), { rotation: 0 }, { rotation: -5, svgOrigin: "0 160", duration: 0.25, yoyo: true, repeat: 1, immediateRender: false }, 0.1);
      gsap.set(q(".s12-quien"), { opacity: 0 });
      tl.fromTo(q(".s12-quien"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, QUIEN);
      tl.to(q(".s12-quien"), { opacity: 0, duration: 0.15 }, NADIE - 0.15);
      pestanea(".s12-con-ojos", 2.5);
      habla(".s12-puc-boca", NADIE, 1.5, 0.11, 0.5);
      tl.to(q(".s12-puc"), { rotation: -6, svgOrigin: "0 160", duration: 0.3, ease: "power2.out" }, NADIE);
      gsap.set(q(".s12-nadie"), { opacity: 0 });
      tl.fromTo(q(".s12-nadie"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, NADIE);
      golpe(".s12-auto", AUTO, { desde: 2.6 });
      sacudon(AUTO + 0.03, 1.3);
      flash(AUTO, 0.4);
      tl.to(q(".s12-con"), { y: -30, duration: 0.12, yoyo: true, repeat: 1 }, AUTO);
      balancea(".s12-auto", AUTO + 0.3, DUR - AUTO - 0.5, 2, 0.25);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 1.39, sfx: "pop", vol: 0.25 },
  { t: 3.14, sfx: "click-soft", vol: 0.25 },
  { t: 3.9, sfx: "whoosh-short", vol: 0.25 },
  { t: 4.03, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 4.1, sfx: "sparkle", vol: 0.25 },
] });
