// Genera las escenas de reels/tres-veces (tipografía cinética). Uso (desde reels/tres-veces): node generar-escenas.mjs .
import fs from "node:fs";
import path from "node:path";
const DIR = process.argv[2];
const T = fs.readFileSync(path.join(DIR, "tiempos.md"), "utf8");
const durDe = (id) => Number(T.match(new RegExp(`### ${id} — dura ([0-9.]+)`))[1]);

const W = "#ffffff", C = "#efeee5", G = "#5ce611", P = "#7c8698";

// regla (la de medir) de fondo: x 150-930, y 1440-1510
const RX0 = 150, RX1 = 930, RY = 1440, RH = 70;
const MARCAS = [[290, "1 vez"], [470, "2 veces"], [800, "todos los días"]];
function reglaSVG(p) {
  let ticks = "";
  for (let x = RX0 + 26; x < RX1 - 10; x += 26) {
    const larga = (x - RX0) % 130 === 0;
    ticks += `<line class="${p}-tick" x1="${x}" y1="${RY}" x2="${x}" y2="${RY + (larga ? 30 : 16)}" />`;
  }
  const marcas = MARCAS.map(([x], i) => `<line class="${p}-marca ${p}-marca${i}" x1="${x}" y1="${RY - 4}" x2="${x}" y2="${RY + 46}" />`).join("");
  return `<g class="${p}-regla">
        <rect class="${p}-reglabox" x="${RX0}" y="${RY}" width="${RX1 - RX0}" height="${RH}" rx="10" />
        ${ticks}${marcas}
        <g class="${p}-cursor"><line x1="0" y1="${RY - 70}" x2="0" y2="${RY - 14}" /><path d="M -16 ${RY - 34} L 0 ${RY - 12} L 16 ${RY - 34}" /></g>
      </g>`;
}
const reglaLabels = (p) => MARCAS.map(([x, t], i) => `<div class="${p}-rlab ${p}-rlab${i}" style="left:${x - 200}px">${t}</div>`).join("");
const reglaCSS = (S) => `
    ${S} .P-regla line, ${S} .P-regla rect, ${S} .P-regla path { fill: none; stroke: ${C}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .P-regla .P-tick { stroke-width: 4; opacity: 0.55; }
    ${S} .P-regla .P-marca { stroke: ${C}; stroke-width: 6; }
    ${S} .P-regla .P-cursor line, ${S} .P-regla .P-cursor path { stroke: ${G}; stroke-width: 7; }
    ${S} .P-rlab { position: absolute; top: 1530px; width: 400px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; text-transform: uppercase; color: ${C}; opacity: 0.45; white-space: nowrap; }
    ${S} .P-rlab.on { color: ${G}; }`;

function escena({ id, css = "", html = "", svg = "", js = "", etiqueta = "", regla = false }) {
  const p = id.slice(0, 3);
  const dur = durDe(id);
  const S = `[data-composition-id="${id}"]`;
  const fix = (s) => s.replaceAll("P-", `${p}-`);
  return `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${p}-capa, ${S} .${p}-escenario { position: absolute; inset: 0; }
    ${S} .${p}-svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .${p}-w { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; color: ${W}; }
    ${S} .${p}-w span { display: inline-block; }
    ${S} .${p}-etiqueta { position: absolute; left: 0; right: 0; top: 400px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.34em; color: ${G}; text-transform: uppercase; }
    ${S} .${p}-trazo { fill: none; stroke: ${C}; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .${p}-trazo.v { stroke: ${G}; }
${regla ? fix(reglaCSS(S)) : ""}
${fix(css)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${p}-escenario">
        ${etiqueta ? fix(etiqueta) : ""}
        <svg class="${p}-svg" viewBox="0 0 1080 1920">
      ${regla ? reglaSVG(p) : ""}
      ${fix(svg)}
        </svg>
        ${regla ? reglaLabels(p) : ""}
${fix(html)}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      // golpe: entra grande y se asienta EN la palabra
      const golpe = (el, t, k = 1.45) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: k }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out", immediateRender: false }, t - 0.05);
      };
      // sube: entra desde abajo
      const sube = (el, t, d = 110) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: d, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.26, ease: "back.out(1.8)", immediateRender: false }, t - 0.06);
      };
      // desliza: entra de costado
      const desliza = (el, t, d = 140) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, x: d, filter: "blur(6px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.26, ease: "power3.out", immediateRender: false }, t - 0.06);
      };
      // sale: se va para arriba con blur
      const sale = (els, t, d = -120) => tl.to(els, { y: d, opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in", stagger: 0.04 }, t);
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
          gsap.set(el, { opacity: t <= 0 ? 1 : 0 });
          if (t > 0) tl.to(el, { opacity: 1, duration: 0.04 }, t + i * 0.04);
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t + i * 0.04);
        });
      };
      const pop = (el, t, origen) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.85, svgOrigin: origen }, { opacity: 1, scale: 1, svgOrigin: origen, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
      };
      const popDiv = (el, t) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
      };
${fix(js)}
      // salida
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power3.in" }, DUR - 0.2);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
}

const ESC = [];

// ---------- s01: el gancho ----------
ESC.push({
  id: "s01-regla",
  etiqueta: `<div class="P-etiqueta">Consejo de colega</div>`,
  css: `
    .P-una { top: 505px; font-size: 150px; }
    .P-para { top: 760px; font-size: 80px; font-weight: 700; color: ${C}; }
    .P-sacarte { top: 870px; font-size: 200px; font-weight: 900; }
    .P-encima { top: 1080px; font-size: 150px; font-weight: 900; color: ${G}; }
    .P-semana { position: absolute; left: 290px; width: 500px; top: 1300px; height: 104px; border: 5px solid ${G}; border-radius: 52px; text-align: center; line-height: 94px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 50px; letter-spacing: 0.08em; color: ${G}; text-transform: uppercase; }`,
  svg: `<g class="P-subr"><line class="P-trazo v P-sr" x1="200" y1="690" x2="880" y2="690" />
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<line class="P-trazo v P-sr" x1="${200 + i * 68}" y1="690" x2="${200 + i * 68}" y2="${i % 5 === 0 ? 726 : 712}" />`).join("")}</g>`,
  html: `
        <div class="P-w P-una">Una regla</div>
        <div class="P-w P-para">para saber qué</div>
        <div class="P-w P-sacarte">sacarte</div>
        <div class="P-w P-encima">de encima</div>
        <div class="P-semana">esta semana</div>`,
  js: `
      tl.fromTo(q(".P-una"), { scale: 1.05, opacity: 0.75 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.out" }, 0);
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.1);
      // "una regla" con subrayado que es una regla de medir
      dibujar(qa(".P-sr").slice(0, 1), 0.05, 0.45, 0.6);
      gsap.set(qa(".P-sr").slice(1), { opacity: 0 });
      qa(".P-sr").slice(1).forEach((el, i) => tl.to(el, { opacity: 1, duration: 0.05 }, 0.25 + i * 0.03));
      sube(q(".P-para"), 0.7, 70);
      golpe(q(".P-sacarte"), 1.6, 1.6);
      desliza(q(".P-encima"), 2.0, 220);
      // sacarte de encima: un empujón seco
      [[-14, 0], [10, 0], [0, 0]].forEach(([x], i) => tl.to(q(".P-sacarte"), { x, duration: 0.05, ease: "none" }, 2.08 + i * 0.05));
      popDiv(q(".P-semana"), 2.28);
      tl.to(q(".P-semana"), { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.0);
      tl.to(q(".P-encima"), { x: 10, duration: 0.6, ease: "sine.inOut" }, 2.4);
`,
});

// ---------- s02: la regla de las tres veces ----------
ESC.push({
  id: "s02-tres",
  regla: true,
  etiqueta: `<div class="P-etiqueta">La regla</div>`,
  css: `
    .P-la { top: 470px; font-size: 104px; color: ${C}; font-weight: 700; }
    .P-tres { top: 560px; font-size: 640px; font-weight: 900; color: ${G}; letter-spacing: -0.04em; }
    .P-veces { top: 1160px; font-size: 180px; font-weight: 900; }`,
  html: `
        <div class="P-w P-la"><span class="P-la1">La regla</span> <span class="P-la2">de las</span></div>
        <div class="P-w P-tres">3</div>
        <div class="P-w P-veces">veces.</div>`,
  js: `
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      golpe(q(".P-la1"), 0.1, 1.3);
      sube(q(".P-la2"), 0.52, 50);
      // la regla de medir se dibuja abajo
      dibujar(qa(".P-reglabox"), 0.05, 0.6);
      gsap.set(qa(".P-tick"), { opacity: 0 });
      qa(".P-tick").forEach((el, i) => tl.to(el, { opacity: 0.55, duration: 0.05 }, 0.25 + i * 0.015));
      gsap.set(qa(".P-marca"), { opacity: 0 });
      gsap.set(qa(".P-rlab"), { opacity: 0 });
      [0, 1, 2].forEach((i) => {
        tl.to(q(".P-marca" + i), { opacity: 1, duration: 0.05 }, 0.92 + i * 0.12);
        tl.fromTo(q(".P-rlab" + i), { opacity: 0, y: 10 }, { opacity: 0.45, y: 0, duration: 0.2 }, 0.92 + i * 0.12);
      });
      gsap.set(q(".P-cursor"), { opacity: 0, x: ${RX0} });
      gsap.set(q(".P-tres"), { opacity: 0 });
      tl.fromTo(q(".P-tres"), { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out", immediateRender: false }, 0.88);
      [[-10, 6], [8, -4], [0, 0]].forEach(([x, y], i) => tl.to(q(".P-escenario"), { x, y, duration: 0.04, ease: "none" }, 1.08 + i * 0.045));
      tl.to(q(".P-la"), { opacity: 0.35, duration: 0.15 }, 0.95);
      sube(q(".P-veces"), 1.22, 120);
      tl.to(q(".P-tres"), { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.4);
`,
});

// ---------- s03: una vez, a mano ----------
const reglaFija = (marcaOn) => `
      gsap.set(qa(".P-marca"), { opacity: 1 });
      gsap.set(qa(".P-rlab"), { opacity: 0.45 });
`;
ESC.push({
  id: "s03-una",
  regla: true,
  etiqueta: `<div class="P-etiqueta P-et1">Una vez</div>`,
  css: `
    .P-lo { top: 560px; font-size: 100px; color: ${C}; font-weight: 700; }
    .P-unavez { top: 690px; font-size: 190px; font-weight: 900; }
    .P-hacelo { top: 640px; font-size: 190px; font-weight: 900; }
    .P-mano { top: 860px; font-size: 220px; font-weight: 900; color: ${C}; }`,
  svg: `<path class="P-trazo v P-onda" d="M 210 1135 C 270 1105, 320 1165, 380 1135 S 490 1105, 550 1135 S 660 1165, 720 1135 S 830 1105, 870 1130" />`,
  html: `
        <div class="P-w P-lo">¿Lo hiciste</div>
        <div class="P-w P-unavez">una vez?</div>
        <div class="P-w P-hacelo">Hacelo</div>
        <div class="P-w P-mano">a mano.</div>`,
  js: `${reglaFija()}
      gsap.set(q(".P-cursor"), { x: ${RX0}, opacity: 0 });
      golpe(q(".P-lo"), 0.02, 1.25);
      golpe(q(".P-unavez"), 0.45, 1.5);
      tl.to(q(".P-cursor"), { opacity: 1, duration: 0.1 }, 0.3);
      tl.to(q(".P-cursor"), { x: ${MARCAS[0][0]}, duration: 0.4, ease: "back.out(1.6)" }, 0.4);
      tl.add(() => {}, 0.6);
      tl.to(q(".P-rlab0"), { opacity: 1, color: "${G}", duration: 0.15 }, 0.75);
      tl.to(q(".P-marca0"), { stroke: "${G}", duration: 0.15 }, 0.75);
      sale([q(".P-lo"), q(".P-unavez")], 1.18);
      sube(q(".P-hacelo"), 1.34, 120);
      golpe(q(".P-mano"), 1.7, 1.4);
      dibujar(qa(".P-onda"), 1.8, 0.45);
      tl.to(q(".P-mano"), { rotation: -2, duration: 0.4, ease: "sine.inOut" }, 1.85);
`,
});

// ---------- s04: dos veces, anotá cómo ----------
ESC.push({
  id: "s04-dos",
  regla: true,
  etiqueta: `<div class="P-etiqueta">Dos veces</div>`,
  css: `
    .P-dos { top: 540px; font-size: 200px; font-weight: 900; }
    .P-veces { top: 750px; font-size: 200px; font-weight: 900; }
    .P-anota { top: 560px; font-size: 200px; font-weight: 900; }
    .P-como { top: 770px; font-size: 200px; font-weight: 900; color: ${G}; }
    .P-paso { position: absolute; left: 380px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; color: ${G}; }`,
  svg: `<rect class="P-trazo P-nota" x="330" y="1040" width="420" height="320" rx="22" />
        <line class="P-trazo P-ln" x1="440" y1="1120" x2="690" y2="1120" />
        <line class="P-trazo P-ln" x1="440" y1="1200" x2="660" y2="1200" />
        <line class="P-trazo P-ln" x1="440" y1="1280" x2="700" y2="1280" />`,
  html: `
        <div class="P-w P-dos">¿Dos</div>
        <div class="P-w P-veces">veces?</div>
        <div class="P-w P-anota">Anotá</div>
        <div class="P-w P-como">cómo.</div>
        <div class="P-paso P-p1" style="top:1098px">1</div>
        <div class="P-paso P-p2" style="top:1178px">2</div>
        <div class="P-paso P-p3" style="top:1258px">3</div>`,
  js: `${reglaFija()}
      tl.set(q(".P-rlab0"), { opacity: 0.8 }, 0);
      gsap.set(q(".P-marca0"), { stroke: "${G}" });
      gsap.set(q(".P-cursor"), { x: ${MARCAS[0][0]} });
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      golpe(q(".P-dos"), 0.02, 1.5);
      golpe(q(".P-veces"), 0.19, 1.4);
      tl.to(q(".P-cursor"), { x: ${MARCAS[1][0]}, duration: 0.4, ease: "back.out(1.6)" }, 0.1);
      tl.to(q(".P-rlab1"), { opacity: 1, color: "${G}", duration: 0.15 }, 0.4);
      tl.to(q(".P-marca1"), { stroke: "${G}", duration: 0.15 }, 0.4);
      sale([q(".P-dos"), q(".P-veces")], 0.82);
      sube(q(".P-anota"), 0.98, 120);
      golpe(q(".P-como"), 1.29, 1.4);
      dibujar(qa(".P-nota"), 1.0, 0.5);
      dibujar(qa(".P-ln"), 1.3, 0.3);
      ["1", "2", "3"].forEach((n, i) => popDiv(q(".P-p" + n), 1.3 + i * 0.12));
      tl.to(q(".P-como"), { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.6);
`,
});

// ---------- s05: todos los días, que se haga solo ----------
ESC.push({
  id: "s05-todos",
  regla: true,
  etiqueta: `<div class="P-etiqueta">Todos los días</div>`,
  css: `
    .P-todos { top: 540px; font-size: 200px; font-weight: 900; }
    .P-dias { top: 750px; font-size: 150px; font-weight: 900; }
    .P-semana { position: absolute; left: 0; right: 0; top: 960px; display: flex; justify-content: center; gap: 26px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 44px; letter-spacing: 0.06em; color: ${P}; }
    .P-semana span { display: inline-block; }
    .P-que { top: 560px; font-size: 120px; font-weight: 800; color: ${C}; }
    .P-solo { top: 700px; font-size: 330px; font-weight: 900; color: ${G}; }`,
  svg: `<g class="P-loop"><path class="P-trazo v P-lp" d="M 640 1210 A 100 100 0 1 1 540 1110" /><path class="P-trazo v P-lp" d="M 512 1086 L 544 1110 L 516 1140" /></g>`,
  html: `
        <div class="P-w P-todos">¿Todos</div>
        <div class="P-w P-dias">los días?</div>
        <div class="P-semana"><span>LUN</span><span>MAR</span><span>MIÉ</span><span>JUE</span><span>VIE</span><span>SÁB</span></div>
        <div class="P-w P-que">Que se haga</div>
        <div class="P-w P-solo">solo.</div>`,
  js: `${reglaFija()}
      gsap.set([q(".P-rlab0"), q(".P-rlab1")], { opacity: 0.8 });
      gsap.set([q(".P-marca0"), q(".P-marca1")], { stroke: "${G}" });
      gsap.set(q(".P-cursor"), { x: ${MARCAS[1][0]} });
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      golpe(q(".P-todos"), 0.02, 1.5);
      sube(q(".P-dias"), 0.3, 90);
      tl.to(q(".P-cursor"), { x: ${MARCAS[2][0]}, duration: 0.5, ease: "power3.inOut" }, 0.1);
      tl.to(q(".P-rlab2"), { opacity: 1, color: "${G}", duration: 0.15 }, 0.55);
      tl.to(q(".P-marca2"), { stroke: "${G}", duration: 0.15 }, 0.55);
      // los días se prenden uno atrás del otro
      const dias = qa(".P-semana span");
      gsap.set(dias, { opacity: 0 });
      dias.forEach((d, i) => {
        tl.fromTo(d, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.12, immediateRender: false }, 0.3 + i * 0.08);
      });
      sale([q(".P-todos"), q(".P-dias"), q(".P-semana")], 0.84);
      sube(q(".P-que"), 0.97, 90);
      golpe(q(".P-solo"), 1.48, 1.7);
      [[-10, 6], [8, -4], [0, 0]].forEach(([x, y], i) => tl.to(q(".P-escenario"), { x, y, duration: 0.04, ease: "none" }, 1.66 + i * 0.045));
      dibujar(qa(".P-lp"), 1.55, 0.35);
      tl.to(q(".P-loop"), { rotation: 300, svgOrigin: "540 1210", duration: 0.7, ease: "power2.out" }, 1.75);
`,
});

// ---------- s06: los tres ejemplos ----------
const EJ = [
  ["Pasar el pedido", "a la planilla", 0.0, 0.85],
  ["Avisar que", "está listo", 1.57, 2.32],
  ["Mandar el resumen", "del día", 2.92, 3.84],
];
ESC.push({
  id: "s06-ejemplos",
  etiqueta: `<div class="P-etiqueta">Lo de todos los días</div>`,
  css: `
    .P-fila { position: absolute; left: 110px; width: 900px; height: 210px; }
    .P-txt { position: absolute; left: 140px; top: 0; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 62px; line-height: 1.06; text-transform: uppercase; letter-spacing: -0.015em; white-space: nowrap; }
    .P-txt.gris { color: ${P}; }
    .P-txt.blanco { color: ${W}; opacity: 0; }
    .P-tag { position: absolute; left: 140px; top: 148px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.24em; color: ${G}; text-transform: uppercase; }`,
  svg: EJ.map((_, i) => {
    const cy = 672 + i * 260 + 36;
    return `<circle class="P-trazo P-circ P-circ${i}" cx="160" cy="${cy}" r="42" style="stroke:${P}" />
        <path class="P-trazo v P-tilde P-tilde${i}" d="M 140 ${cy + 2} L 156 ${cy + 18} L 184 ${cy - 16}" />`;
  }).join("\n        "),
  html: EJ.map(([a, b], i) => `
        <div class="P-fila P-fila${i}" style="top:${640 + i * 260}px">
          <div class="P-txt gris">${a}<br>${b}</div>
          <div class="P-txt blanco">${a}<br>${b}</div>
          <div class="P-tag">Se hace solo</div>
        </div>`).join(""),
  js: `
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      const EJ = ${JSON.stringify(EJ.map((e) => [e[2], e[3]]))};
      EJ.forEach(([t, ok], i) => {
        const f = q(".P-fila" + i);
        desliza(f, t + 0.02, 160);
        pop(q(".P-circ" + i), t + 0.05, "160 " + (672 + i * 260 + 36));
        // se resuelve: tilde verde, el texto pasa de gris a blanco
        dibujar([q(".P-tilde" + i)], ok, 0.25);
        tl.to(q(".P-circ" + i), { stroke: "${G}", duration: 0.15 }, ok);
        tl.to(f.querySelector(".gris"), { opacity: 0, duration: 0.2 }, ok);
        tl.to(f.querySelector(".blanco"), { opacity: 1, duration: 0.2 }, ok);
        gsap.set(f.querySelector(".P-tag"), { opacity: 0 });
        tl.fromTo(f.querySelector(".P-tag"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.22, immediateRender: false }, ok + 0.1);
      });
      // al final los tres laten juntos
      tl.to(qa(".P-tilde"), { scale: 1.2, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, 4.12);
`,
});

// ---------- s07: tu tiempo + Scalerics ----------
ESC.push({
  id: "s07-tiempo",
  etiqueta: `<div class="P-etiqueta P-et1">Tu tiempo</div><div class="P-etiqueta P-et2">Automatizaciones</div>`,
  css: `
    .P-tu { top: 560px; font-size: 200px; font-weight: 900; }
    .P-para { top: 820px; font-size: 90px; font-weight: 700; color: ${C}; }
    .P-solovos { top: 930px; font-size: 200px; font-weight: 900; color: ${G}; }
    .P-saber { top: 1150px; font-size: 110px; font-weight: 800; }
    .P-esas { top: 560px; font-size: 104px; font-weight: 700; color: ${C}; }
    .P-auto { top: 690px; font-size: 88px; font-weight: 900; }
    .P-hacemos { top: 900px; font-size: 92px; font-weight: 700; color: ${C}; }
    .P-scal { top: 1020px; font-size: 150px; font-weight: 900; color: ${G}; letter-spacing: -0.03em; }`,
  svg: `<line class="P-trazo v P-sub" x1="190" y1="1210" x2="890" y2="1210" />`,
  html: `
        <div class="P-w P-tu"><span class="P-tu1">Tu</span> <span class="P-tu2">tiempo,</span></div>
        <div class="P-w P-para">para lo que</div>
        <div class="P-w P-solovos"><span class="P-solo">solo</span> <span class="P-vos">vos</span></div>
        <div class="P-w P-saber">sabés hacer.</div>
        <div class="P-w P-esas">Esas</div>
        <div class="P-w P-auto">automatizaciones</div>
        <div class="P-w P-hacemos">las hacemos en</div>
        <div class="P-w P-scal">Scalerics.</div>`,
  js: `
      tl.fromTo(q(".P-et1"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      golpe(q(".P-tu1"), 0.04, 1.5);
      golpe(q(".P-tu2"), 0.2, 1.4);
      tl.to(q(".P-tu"), { scale: 0.62, y: -40, transformOrigin: "50% 0%", duration: 0.3, ease: "power3.inOut" }, 0.82);
      sube(q(".P-para"), 0.94, 70);
      golpe(q(".P-solo"), 1.25, 1.25);
      golpe(q(".P-vos"), 1.65, 1.3);
      sube(q(".P-saber"), 1.95, 90);
      tl.to(q(".P-solovos"), { scale: 1.05, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.25);
      // cambio: entra Scalerics
      sale([q(".P-tu"), q(".P-para"), q(".P-solovos"), q(".P-saber")], 2.9);
      tl.to(q(".P-et1"), { opacity: 0, y: -10, duration: 0.15 }, 2.95);
      gsap.set(q(".P-et2"), { opacity: 0 });
      tl.fromTo(q(".P-et2"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, 3.12);
      sube(q(".P-esas"), 3.12, 70);
      golpe(q(".P-auto"), 3.38, 1.35);
      sube(q(".P-hacemos"), 4.59, 70);
      golpe(q(".P-scal"), 5.35, 1.5);
      dibujar(qa(".P-sub"), 5.55, 0.4);
      tl.to(q(".P-auto"), { scale: 1.03, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.65);
      tl.to(q(".P-scal"), { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 5.85);
`,
});

// ---------- s08: CTA, la regla para guardar ----------
const FILAS = [["1 vez", "a mano", C], ["2 veces", "anotá cómo", C], ["todos los días", "que se haga solo", G]];
ESC.push({
  id: "s08-cta",
  etiqueta: `<div class="P-etiqueta">Guardalo</div>`,
  css: `
    .P-guarda { top: 500px; font-size: 172px; font-weight: 900; }
    .P-lista { top: 700px; font-size: 86px; font-weight: 700; color: ${C}; }
    .P-lunes { top: 810px; font-size: 150px; font-weight: 900; color: ${G}; }
    .P-tit { position: absolute; left: 150px; top: 1052px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.24em; color: ${G}; text-transform: uppercase; }
    .P-k { position: absolute; left: 150px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.04em; color: ${C}; opacity: 0.7; text-transform: uppercase; }
    .P-v { position: absolute; right: 150px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 40px; text-transform: uppercase; letter-spacing: -0.01em; white-space: nowrap; }`,
  svg: `<rect class="P-trazo P-card" x="110" y="1020" width="860" height="420" rx="30" />
        <line class="P-trazo P-sep" x1="150" y1="1206" x2="930" y2="1206" style="opacity:0.35" />
        <line class="P-trazo P-sep" x1="150" y1="1306" x2="930" y2="1306" style="opacity:0.35" />
        <path class="P-trazo v P-marcador" d="M 886 1020 L 886 1096 L 908 1078 L 930 1096 L 930 1020" />`,
  html: `
        <div class="P-w P-guarda">Guardalo</div>
        <div class="P-w P-lista">y hacé tu lista</div>
        <div class="P-w P-lunes">el lunes.</div>
        <div class="P-tit">La regla de las 3 veces</div>
${FILAS.map(([k, v, c], i) => `        <div class="P-k P-k${i}" style="top:${1136 + i * 100}px">${k}</div>
        <div class="P-v P-v${i}" style="top:${1122 + i * 100}px; color:${c}">${v}</div>`).join("\n")}`,
  js: `
      tl.fromTo(q(".P-etiqueta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      golpe(q(".P-guarda"), 0.03, 1.5);
      sube(q(".P-lista"), 0.62, 70);
      golpe(q(".P-lunes"), 1.42, 1.5);
      // la tarjeta para guardar: la regla entera
      dibujar(qa(".P-card"), 1.0, 0.6);
      dibujar(qa(".P-sep"), 1.4, 0.4);
      popDiv(q(".P-tit"), 1.3);
      [0, 1, 2].forEach((i) => { desliza(q(".P-k" + i), 1.7 + i * 0.25, -60); desliza(q(".P-v" + i), 1.78 + i * 0.25, 60); });
      // el marcador de "guardado" se dibuja y se llena
      dibujar(qa(".P-marcador"), 2.7, 0.4);
      tl.to(q(".P-marcador"), { fill: "${G}", duration: 0.2 }, 3.1);
      tl.to(q(".P-marcador"), { y: 6, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.1);
      tl.to(q(".P-lunes"), { scale: 1.05, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.6);
      tl.to(q(".P-v2"), { scale: 1.05, transformOrigin: "100% 50%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 4.3);
`,
});

for (const e of ESC) fs.writeFileSync(path.join(DIR, "compositions", e.id + ".html"), escena(e));
console.log("escenas:", ESC.map((e) => e.id).join(", "));
