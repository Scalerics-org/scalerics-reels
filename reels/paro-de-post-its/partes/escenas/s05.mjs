// s05-gomez: el celeste veterano: «Gómez, 2 cajas». Nadie sabe quién es Gómez. Ni Gómez.
import { escena, duracion, postit, anteojos, bigote, COL } from "./comun.mjs";
const id = "s05-gomez", dur = duracion(id);
const svg = `
  ${postit({ id: "s05-cel", x: 320, y: 1010, s: 1.2, col: "c", rot: 2, texto: ["Gómez,", "2 cajas"], tam: 50, cara: "serio", brazos: "abajo", extra: anteojos(52) + bigote(52) })}
  <g transform="translate(800 1080)"><g class="s05-gomez">
    <path d="M-110 300 C-110 140 -70 90 0 90 C70 90 110 140 110 300 Z" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" />
    <circle cx="0" cy="0" r="76" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" />
    <text x="0" y="34" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="120" fill="${COL.rojo}">?</text>
    <g class="s05-bi"><path d="M-100 160 Q-170 120 -150 40" fill="none" stroke="${COL.ink}" stroke-width="8" stroke-linecap="round" /><circle cx="-150" cy="34" r="16" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" /></g>
    <g class="s05-bd"><path d="M100 160 Q170 120 150 40" fill="none" stroke="${COL.ink}" stroke-width="8" stroke-linecap="round" /><circle cx="150" cy="34" r="16" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="6" /></g>
  </g></g>
  <g class="s05-cajas"><path d="M640 1400 h120 v-90 h-120 Z M780 1400 h120 v-90 h-120 Z" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" /><text x="700" y="1374" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="56" fill="${COL.ink}">1</text><text x="840" y="1374" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="56" fill="${COL.ink}">2</text></g>
`;
const html = `<div class="mk s05-quien">¿Gómez?</div><div class="mk s05-ni">ni Gómez</div>`;
const css = `
  P .s05-quien { left: 590px; top: 690px; font-size: 104px; color: ${COL.c}; transform: rotate(-6deg); }
  P .s05-ni { left: 600px; top: 1430px; font-size: 92px; color: ${COL.y}; transform: rotate(-4deg); }
`;
const js = `
      const GOMEZ = 0.39, DOS = 0.72, CAJAS = 1.05, NADIE = 1.85, QUIEN = 2.55, G2 = 2.8, NI = 3.54, G3 = 3.64;
      tl.fromTo(q(".s05-cel"), { y: 40, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      habla(".s05-cel-boca", 0, 1.4, 0.12, 0.3);
      habla(".s05-cel-boca", NADIE, 1.4, 0.12, 0.3);
      habla(".s05-cel-boca", NI, 0.5, 0.12, 0.3);
      // se acomoda los anteojos para leer
      tl.fromTo(q(".s05-cel"), { rotation: 2 }, { rotation: -2, svgOrigin: "0 0", duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0.3);
      pop(".s05-cajas", CAJAS - 0.1, { o: "770 1400" });
      // ¿quién es Gómez?
      pop(".s05-gomez", NADIE, { o: "0 300" });
      gsap.set(q(".s05-quien"), { opacity: 0 });
      tl.fromTo(q(".s05-quien"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, QUIEN);
      sacudon(G2, 0.6);
      // ni Gómez: se encoge de hombros
      tl.to(q(".s05-bi"), { rotation: 25, svgOrigin: "-100 160", duration: 0.15, yoyo: true, repeat: 3 }, G3);
      tl.to(q(".s05-bd"), { rotation: -25, svgOrigin: "100 160", duration: 0.15, yoyo: true, repeat: 3 }, G3);
      tl.to(q(".s05-gomez"), { y: -20, duration: 0.15, yoyo: true, repeat: 3 }, G3);
      golpe(".s05-ni", G3 + 0.05, { desde: 1.8 });
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.1, sfx: "click-soft", vol: 0.25 },
  { t: 1.0, sfx: "pop", vol: 0.25 },
  { t: 1.85, sfx: "pop", vol: 0.3 },
  { t: 2.55, sfx: "glitch-1", vol: 0.15, max: 0.3 },
  { t: 3.62, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
] });
