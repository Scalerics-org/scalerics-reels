// s08-marido: el marido (con franja de testimonio) con el micrófono: "le dije te quiero y me contestó...".
import { escena, duracion, persona, globo, COL } from "./comun.mjs";
const id = "s08-marido", dur = duracion(id);
const svg = `
  ${persona({ id: "s08-mar", x: 620, y: 1440, s: 1.15, pelo: "pelado", bigote: true, censura: true, cara: "triste", ropa: "#6a3a5a",
    extra: `<path class="s08-lag" d="M-40 -206 Q-48 -190 -40 -180 Q-32 -190 -40 -206 Z" fill="${COL.rosac}" stroke="${COL.ink}" stroke-width="3" />` })}
  <g class="s08-mic"><path d="M170 1560 L330 1260" stroke="${COL.ink}" stroke-width="26" stroke-linecap="round" />
    <circle cx="340" cy="1236" r="44" fill="${COL.ink}" /><circle cx="340" cy="1236" r="36" fill="none" stroke="${COL.blanco}" stroke-width="3" opacity="0.4" />
    <rect x="236" y="1300" width="94" height="58" rx="8" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" transform="rotate(-28 283 1329)" />
    <text x="283" y="1342" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="${COL.ink}" transform="rotate(-28 283 1329)">P5</text>
    <path d="M150 1580 Q140 1520 190 1500 L230 1520 Q240 1570 200 1590 Z" fill="${COL.piel}" stroke="${COL.ink}" stroke-width="6" /></g>
  <g class="s08-cor" transform="translate(860 1010)">
    <path class="s08-ci" d="M0 40 L-70 -30 Q-100 -70 -60 -96 Q-26 -112 0 -70 L-14 -40 L10 -14 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
    <path class="s08-cd" d="M0 40 L70 -30 Q100 -70 60 -96 Q26 -112 0 -70 L-14 -40 L10 -14 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
  </g>
`;
const html = `
  <div class="mk s08-ya">"ya no me mira"</div>
  ${globo("s08-g1", "Te quiero", { x: 560, y: 640, tam: 50 })}
  ${globo("s08-g2", "Te recuerdo tu pago pendiente", { x: 80, y: 790, w: 600, lado: "izq", tam: 44 })}`;
const css = `
  P .s08-ya { left: 90px; top: 640px; font-size: 100px; color: ${COL.rosac}; transform: rotate(-5deg); }
`;
const js = `
      const YA = 0, MIRA = 1.03, CEL = 1.27, ANOCHE = 2.28, TE = 3.13, CONT = 3.82, TE2 = 4.27, PAGO = 5.55, PEND = 5.91;
      entra(".s08-mic", 0, { x: -400, y: 300 }, 0.35);
      tl.fromTo(q(".s08-mar"), { scale: 0.94, svgOrigin: "0 160" }, { scale: 1, svgOrigin: "0 160", duration: 0.35, ease: "back.out(2)" }, 0);
      habla(".s08-mar-boca", 0.05, 1.8, 0.11, 0.3);
      habla(".s08-mar-boca", ANOCHE, 3.9, 0.11, 0.3);
      gsap.set(q(".s08-ya"), { opacity: 0 });
      tl.fromTo(q(".s08-ya"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, immediateRender: false }, 0.2);
      tl.to(q(".s08-ya"), { opacity: 0, duration: 0.2 }, ANOCHE + 0.6);
      pop(".s08-g1", TE, { desde: 0.4 });
      pop(".s08-g2", TE2, { desde: 0.4 });
      // el corazón se parte en "pendiente"
      gsap.set(q(".s08-cor"), { opacity: 0 });
      tl.to(q(".s08-cor"), { opacity: 1, duration: 0.01 }, TE);
      tl.fromTo(qa(".s08-ci, .s08-cd"), { scale: 0, svgOrigin: "0 40" }, { scale: 1, svgOrigin: "0 40", duration: 0.3, ease: "back.out(2)", immediateRender: false }, TE);
      tl.to(q(".s08-ci"), { x: -30, rotation: -16, svgOrigin: "0 40", duration: 0.3, ease: "power3.out" }, PEND);
      tl.to(q(".s08-cd"), { x: 30, rotation: 16, svgOrigin: "0 40", duration: 0.3, ease: "power3.out" }, PEND);
      tl.to(q(".s08-cor"), { y: 60, duration: 0.8, ease: "power2.in" }, PEND + 0.4);
      sacudon(PEND + 0.03, 0.8);
      gsap.set(q(".s08-lag"), { opacity: 0 });
      tl.fromTo(q(".s08-lag"), { opacity: 1, y: 0 }, { opacity: 0, y: 60, duration: 0.9, repeat: 1, ease: "power1.in", immediateRender: false }, PEND + 0.1);
      tl.to(q(".s08-mic"), { rotation: 4, svgOrigin: "170 1560", duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.5);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.1, sfx: "whoosh-short", vol: 0.2 },
  { t: 3.13, sfx: "notification", vol: 0.3 },
  { t: 4.27, sfx: "notification", vol: 0.3 },
  { t: 5.91, sfx: "glitch-1", vol: 0.25, max: 0.4 },
  { t: 5.95, sfx: "impact-bass-1", vol: 0.3, max: 0.6 },
] });
