// s08-silencio: en el piso, «seña de Martina, el lunes». Se va una clienta. Minuto de silencio.
import { escena, duracion, postit, COL } from "./comun.mjs";
const id = "s08-silencio", dur = duracion(id);
const svg = `
  <path d="M60 1470 H1020" stroke="${COL.ink}" stroke-width="8" stroke-linecap="round" opacity="0.6" />
  ${postit({ id: "s08-o1", x: 210, y: 740, s: 0.55, col: "c", rot: -6, cara: "triste" })}
  ${postit({ id: "s08-o2", x: 540, y: 710, s: 0.55, col: "y", rot: 3, cara: "triste", extra: '' })}
  ${postit({ id: "s08-o3", x: 870, y: 740, s: 0.55, col: "r", rot: 7, cara: "triste" })}
  ${postit({ id: "s08-m", x: 400, y: 1310, s: 0.95, col: "y", rot: -6, texto: ["seña de Martina,", "el lunes"], tam: 38, cara: "triste", ignorar: true })}
  <g transform="translate(800 1160)"><g class="s08-cli">
    <path d="M-80 300 L-56 120 C-50 70 50 70 56 120 L80 300 Z" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" />
    <circle cx="0" cy="30" r="56" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" />
    <path d="M-56 20 C-60 -40 60 -40 56 20 L64 80 L40 70 L40 20 C20 0 -20 0 -40 20 L-40 70 L-64 80 Z" fill="${COL.ink}" />
    <path d="M60 150 L96 220 L120 210" fill="none" stroke="${COL.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="96" y="200" width="56" height="60" rx="8" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" />
  </g></g>
  <g transform="translate(540 1020)"><g class="s08-vela"><rect x="-22" y="0" width="44" height="110" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" /><path class="s08-llama" d="M0 -60 C24 -30 18 -6 0 -4 C-18 -6 -24 -30 0 -60 Z" fill="${COL.y}" stroke="${COL.ink}" stroke-width="5" /></g></g>
`;
const html = `<div class="mk s08-adios">chau, clienta</div><div class="mk s08-min">minuto de silencio</div>`;
const css = `
  P .s08-adios { left: 600px; top: 1000px; font-size: 70px; color: ${COL.r}; transform: rotate(-6deg); }
  P .s08-min { left: 0; right: 0; text-align: center; top: 880px; font-size: 104px; color: ${COL.papel}; }
`;
const js = `
      const SENA = 0.52, MART = 1.2, LUNES = 1.97, Y = 2.31, CLI = 3.59, MIN = 4.6, SIL = 5.13;
      tl.fromTo(q(".s08-m"), { y: -40 }, { y: 0, duration: 0.25, ease: "bounce.out" }, 0);
      pop(".s08-o1, .s08-o2, .s08-o3", 0.1, { d: 0.3 });
      tl.fromTo(qa(".s08-o1, .s08-o2, .s08-o3"), { y: 0 }, { y: 10, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.4);
      // la clienta se va
      gsap.set(q(".s08-cli"), { opacity: 0 });
      tl.fromTo(q(".s08-cli"), { opacity: 1, x: -260 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, Y - 0.2);
      tl.to(q(".s08-cli"), { x: 420, opacity: 0.0, duration: 1.0, ease: "power2.in" }, CLI - 0.1);
      tl.fromTo(q(".s08-cli"), { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, CLI - 0.1);
      gsap.set(q(".s08-adios"), { opacity: 0 });
      tl.fromTo(q(".s08-adios"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, CLI);
      tl.to(q(".s08-adios"), { opacity: 0, duration: 0.2 }, MIN - 0.2);
      // minuto de silencio: todos agachan la cabeza, una vela
      tl.to(q(".s08-o1"), { rotation: 18, svgOrigin: "0 150", duration: 0.5, ease: "power2.inOut" }, MIN);
      tl.to(q(".s08-o2"), { rotation: 14, svgOrigin: "0 150", duration: 0.5, ease: "power2.inOut" }, MIN + 0.1);
      tl.to(q(".s08-o3"), { rotation: 18, svgOrigin: "0 150", duration: 0.5, ease: "power2.inOut" }, MIN + 0.2);
      pop(".s08-vela", MIN + 0.1, { o: "0 110" });
      tl.fromTo(q(".s08-llama"), { scaleX: 1, svgOrigin: "0 -4" }, { scaleX: 0.75, svgOrigin: "0 -4", duration: 0.18, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, MIN + 0.3);
      gsap.set(q(".s08-min"), { opacity: 0 });
      tl.fromTo(q(".s08-min"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, SIL - 0.2);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "pop", vol: 0.25 },
  { t: 2.15, sfx: "whoosh-short", vol: 0.2 },
  { t: 3.5, sfx: "whoosh", vol: 0.25 },
  { t: 4.7, sfx: "chime", vol: 0.25 },
] });
