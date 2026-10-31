// s14-dormir: Mirta duerme tranquila; el celular manda el aviso solo, a la hora justa.
import { escena, duracion, persona, celular, globo, COL } from "./comun.mjs";
const id = "s14-dormir", dur = duracion(id);
const antifaz = `<path d="M-74 -258 Q0 -272 74 -258 L70 -222 Q0 -210 -70 -222 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" />`;
const svg = `
  <circle class="s14-luna" cx="860" cy="700" r="70" fill="${COL.oro}" /><circle cx="890" cy="680" r="62" fill="#2a0b22" />
  <rect x="80" y="1180" width="660" height="360" rx="40" fill="#4a2350" stroke="${COL.ink}" stroke-width="7" />
  <ellipse cx="380" cy="1200" rx="200" ry="70" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
  <g class="s14-mirta">${persona({ id: "s14-m", x: 380, y: 1400, s: 1.05, pelo: "rulos", ruleros: true, cara: "dormida", cuello: "camison", ropa: COL.rosac, aros: true, extra: antifaz })}</g>
  <path d="M80 1380 Q300 1340 500 1390 Q640 1420 740 1380 L740 1560 L80 1560 Z" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
  <rect x="780" y="1360" width="240" height="200" rx="14" fill="#5a2a48" stroke="${COL.ink}" stroke-width="7" />
  ${celular({ id: "s14-cel", x: 900, y: 1270, s: 0.6, rot: 8, pantalla: `<path d="M-30 -10 L-6 14 L34 -30" fill="none" stroke="${COL.verde}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" class="s14-tick" />` })}
`;
const html = `
  ${globo("s14-g", "Turno confirmado", { x: 520, y: 1010, tam: 40 })}
  <div class="mk s14-hora">a la hora justa</div>
  <div class="mk s14-z">zzz</div>`;
const css = `
  P .s14-hora { left: 90px; top: 640px; font-size: 104px; color: ${COL.verde}; transform: rotate(-4deg); }
  P .s14-z { left: 420px; top: 960px; font-size: 110px; color: ${COL.blanco}; }
  P .s14-g { border-color: ${COL.verde}; }
`;
const js = `
      const SALE = 0, SOLO = 0.21, HORA = 0.92, JUSTA = 1.10, Y = 1.75, DORMIR = 2.26;
      respira(".s14-mirta", 0, DUR, 8, 0.7);
      dibujar(".s14-tick", SOLO, 0.3);
      pop(".s14-g", SOLO + 0.05, { desde: 0.4 });
      tl.to(q(".s14-cel"), { rotation: 4, svgOrigin: "0 0", duration: 0.06, yoyo: true, repeat: 3 }, SOLO);
      gsap.set(q(".s14-hora"), { opacity: 0 });
      tl.fromTo(q(".s14-hora"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, HORA - 0.1);
      gsap.set(q(".s14-z"), { opacity: 0 });
      tl.fromTo(q(".s14-z"), { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: -30, scale: 1.1, duration: 0.8, ease: "sine.out", immediateRender: false }, DORMIR - 0.2);
      tl.fromTo(q(".s14-luna"), { scale: 1 }, { scale: 1.08, svgOrigin: "860 700", duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.21, sfx: "notification", vol: 0.28 },
  { t: 1.1, sfx: "chime", vol: 0.22 },
  { t: 2.1, sfx: "sparkle", vol: 0.2 },
] });
