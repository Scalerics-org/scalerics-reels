// s14-paloma: todo en un solo lugar; el celeste veterano se jubila: «me voy a La Paloma».
import { escena, duracion, postit, anteojos, bigote, COL } from "./comun.mjs";
const id = "s14-paloma", dur = duracion(id);
const svg = `
  <g class="s14-sol"><circle cx="860" cy="700" r="70" fill="${COL.y}" stroke="${COL.ink}" stroke-width="6" />
    <path d="M860 600 V570 M860 800 V830 M760 700 H730 M960 700 H990 M790 630 L770 610 M930 630 L950 610 M790 770 L770 790 M930 770 L950 790" stroke="${COL.y}" stroke-width="9" stroke-linecap="round" /></g>
  <g class="s14-mar"><path d="M60 1400 Q170 1370 280 1400 T500 1400 T720 1400 T940 1400 T1060 1400" fill="none" stroke="${COL.c}" stroke-width="9" stroke-linecap="round" /><path d="M60 1450 Q170 1420 280 1450 T500 1450 T720 1450 T940 1450 T1060 1450" fill="none" stroke="${COL.c}" stroke-width="7" stroke-linecap="round" opacity="0.6" /></g>
  <g class="s14-cartel"><rect x="696" y="1000" width="20" height="350" fill="${COL.cartons}" stroke="${COL.ink}" stroke-width="6" />
    <path d="M560 920 H900 L950 980 L900 1040 H560 Z" fill="${COL.verde}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" />
    <text x="740" y="1002" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="68" fill="${COL.ink}">LA PALOMA</text></g>
  <g class="s14-vas">
    ${postit({ id: "s14-cel", x: 330, y: 1080, s: 1.0, col: "c", rot: 0, cara: "feliz", brazos: "abajo", piernas: true, extra: anteojos(6) + bigote(6) + `
      <g class="s14-somb"><path d="M-170 -150 Q0 -190 170 -150 Q0 -120 -170 -150 Z" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" /><path d="M-90 -152 Q-80 -250 0 -250 Q80 -250 90 -152" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" /><path d="M-88 -170 Q0 -186 88 -170" fill="none" stroke="${COL.rojo}" stroke-width="12" /></g>
      <g transform="translate(250 150)"><rect x="-70" y="-60" width="140" height="110" rx="14" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" /><path d="M-30 -60 V-90 H30 V-60" fill="none" stroke="${COL.ink}" stroke-width="7" /></g>` })}
  </g>
  <g class="s14-ficha"><rect x="390" y="700" width="300" height="200" rx="20" fill="${COL.ink}" stroke="${COL.papel}" stroke-width="7" /><rect x="390" y="700" width="300" height="46" rx="20" fill="${COL.verde}" /><path d="M430 800 H640 M430 850 H580" stroke="${COL.papel}" stroke-width="12" stroke-linecap="round" /></g>
  ${[[160, 640, "y"], [920, 640, "r"], [140, 1000, "r"], [940, 1020, "y"], [540, 1120, "c"]].map(([x, y, col], i) => postit({ id: "s14-v s14-v" + i, x, y, s: 0.28, col, rot: i * 9 - 16, cara: "feliz" })).join("")}
`;
const html = `<div class="mk s14-fin">¡por fin!</div>`;
const css = `P .s14-fin { left: 80px; top: 620px; font-size: 120px; color: ${COL.c}; transform: rotate(-6deg); }`;
const js = `
      const TODO = 0, LUGAR = 1.04, POR = 1.86, FIN = 2.05, ME = 3.03, LA = 3.39, PAL = 3.48;
      // todo en un solo lugar: los post-its entran a la ficha
      pop(".s14-ficha", 0, { o: "540 800" });
      pop(".s14-v", 0.05, { d: 0.22 });
      [[380, 160], [-380, 160], [400, -200], [-400, -220], [0, -320]].forEach(([dx, dy], i) => {
        tl.to(q(".s14-v" + i), { x: dx, y: dy, scale: 0.15, svgOrigin: "0 0", duration: 0.4, ease: "power3.in" }, 0.35 + i * 0.09);
        tl.to(q(".s14-v" + i), { opacity: 0, duration: 0.05 }, 0.75 + i * 0.09);
      });
      tl.to(q(".s14-ficha"), { scale: 1.12, svgOrigin: "540 800", duration: 0.12, yoyo: true, repeat: 1 }, LUGAR);
      tl.to(q(".s14-ficha"), { opacity: 0, scale: 0.5, svgOrigin: "540 800", duration: 0.25, ease: "power2.in" }, POR - 0.3);
      // por fin: el veterano de vacaciones
      gsap.set(qa(".s14-vas, .s14-sol, .s14-mar, .s14-cartel"), { opacity: 0 });
      entra(".s14-vas", POR - 0.1, { y: 500 }, 0.35);
      tl.to(q(".s14-sol"), { opacity: 1, duration: 0.3 }, POR);
      tl.to(q(".s14-sol"), { rotation: 30, svgOrigin: "860 700", duration: 2.8, ease: "none" }, POR);
      tl.to(q(".s14-mar"), { opacity: 1, duration: 0.3 }, POR);
      tl.fromTo(q(".s14-mar"), { x: 0 }, { x: -40, duration: 0.6, yoyo: true, repeat: 4, ease: "sine.inOut", immediateRender: false }, POR);
      habla(".s14-cel-boca", POR, 0.5, 0.12, 0.5);
      habla(".s14-cel-boca", ME, 0.8, 0.12, 0.5);
      gsap.set(q(".s14-fin"), { opacity: 0 });
      tl.fromTo(q(".s14-fin"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, FIN);
      pop(".s14-cartel", LA - 0.1, { o: "706 1350" });
      // se va caminando
      tl.to(q(".s14-vas"), { x: 120, duration: 1.0, ease: "power1.in" }, PAL + 0.2);
      tl.fromTo(q(".s14-vas"), { y: 0 }, { y: -14, duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, PAL + 0.2);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "pop", vol: 0.25 },
  { t: 0.4, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.04, sfx: "chime", vol: 0.3 },
  { t: 1.8, sfx: "whoosh", vol: 0.25 },
  { t: 2.05, sfx: "sparkle", vol: 0.25 },
  { t: 3.35, sfx: "pop", vol: 0.28 },
] });
