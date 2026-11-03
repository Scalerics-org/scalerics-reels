// Generador de escenas de reels/lo-de-siempre (correr desde la carpeta del reel, después de
// `node armar.mjs`, y otra vez `node armar.mjs` para el index).
// Cada escena usa los tiempos reales por palabra: W(i) = segundo relativo de la palabra i.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(
  reel.escenas.map(([id, i], k) => [id, { a: ini(i), b: k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR }]),
);
const GL = (i) => r2(pal[i].start); // tiempo global de la palabra i

// ---------- formas (origen en los pies o en la esquina, según cada una) ----------
// Hugo: origen en los pies, ~380 px de alto. `p` = prefijo de clases para animar partes.
const hugo = (p, chapa = true) => `
  <g class="${p}-hugo-in">
    <circle class="ln" cx="0" cy="-292" r="44" />
    <path class="ln" d="M-46 -300 Q-44 -346 0 -346 Q44 -346 46 -300 Z" />
    <path class="ln" d="M40 -304 Q74 -304 86 -292" />
    <circle class="crema" cx="-15" cy="-282" r="4.5" /><circle class="crema" cx="15" cy="-282" r="4.5" />
    <path class="ln4 ${p}-boca" d="M-14 -262 Q0 -252 14 -262" />
    <path class="ln" d="M-72 -110 V-196 Q-72 -234 -32 -234 H32 Q72 -234 72 -196 V-110" />
    <path class="ln" d="M-60 -206 H60 V-74 Q0 -64 -60 -74 Z" />
    <path class="ln" d="M-30 -70 V0 M30 -70 V0 M-30 0 H-50 M30 0 H50" />
    <g class="${p}-bi"><path class="ln" d="M-72 -210 Q-108 -166 -112 -116" /></g>
    <g class="${p}-bd"><path class="ln" d="M72 -210 Q108 -166 112 -116" /></g>
    ${chapa ? `<rect class="ln-ac" x="-50" y="-176" width="100" height="40" rx="9" style="stroke-width:4" />
    <text class="chapa" x="0" y="-147" text-anchor="middle">HUGO</text>` : ""}
  </g>`;

// el agente de IA (el de lo-pienso): origen en los pies, ~350 px
const agente = (p) => `
  <g class="${p}-ag-in">
    <path class="ln" d="M0 -300 V-326" /><circle class="verde ${p}-antena" cx="0" cy="-336" r="10" />
    <rect class="ln" x="-85" y="-300" width="170" height="140" rx="44" />
    <g class="${p}-ojos"><rect class="verde" x="-42" y="-258" width="18" height="34" rx="9" /><rect class="verde" x="24" y="-258" width="18" height="34" rx="9" /></g>
    <path class="ln4" d="M-20 -200 Q0 -188 20 -200" />
    <path class="ln" d="M0 -160 V-148" /><rect class="ln" x="-66" y="-148" width="132" height="118" rx="30" />
    <text class="ia" x="0" y="-74" text-anchor="middle">IA</text>
    <path class="ln" d="M-28 -30 V0 M28 -30 V0 M-28 0 H-46 M28 0 H46" />
    <g class="${p}-abi"><path class="ln" d="M-66 -130 Q-100 -100 -104 -64" /></g>
    <g class="${p}-abd"><path class="ln" d="M66 -130 Q100 -100 104 -64" /></g>
  </g>`;

// fachada de comercio: esquina arriba-izquierda (x, y), w x h. `cls` del trazo.
const fachada = (x, y, w, h, nombre, cls = "ln", extra = "") => {
  const t = y + 46; // toldo
  const ondas = [];
  const n = 5;
  const paso = w / n;
  let d = `M${x} ${t}`;
  for (let k = 0; k < n; k++) d += ` q${paso / 2} 26 ${paso} 0`;
  ondas.push(d);
  const pw = 64, ph = Math.min(110, h - 96);
  return `<g class="${extra}">
    <path class="${cls}" d="M${x} ${y + h} V${y} H${x + w} V${y + h}" />
    <path class="${cls}" d="${ondas[0]}" />
    <path class="${cls}" d="M${x} ${y + 46} H${x + w}" />
    <rect class="${cls}" x="${x + 22}" y="${y + h - ph}" width="${pw}" height="${ph}" rx="6" />
    <rect class="${cls}" x="${x + 112}" y="${y + h - ph}" width="${w - 134}" height="${ph - 40}" rx="6" />
    <text class="lex t-cr" x="${x + w / 2}" y="${y + 34}" font-size="26" text-anchor="middle">${nombre}</text>
  </g>`;
};

// cajón de bebidas: esquina arriba-izquierda, 100 x 64
const cajon = (x, y, cls = "ln4", letra = "") => `
  <g>
    <circle class="${cls}" cx="${x + 22}" cy="${y - 8}" r="9" /><circle class="${cls}" cx="${x + 50}" cy="${y - 8}" r="9" /><circle class="${cls}" cx="${x + 78}" cy="${y - 8}" r="9" />
    <rect class="${cls}" x="${x}" y="${y}" width="100" height="64" rx="8" />
    <path class="${cls}" d="M${x + 8} ${y + 22} H${x + 92}" />
    ${letra ? `<text class="lex t-ac" x="${x + 50}" y="${y + 54}" font-size="26" text-anchor="middle">${letra}</text>` : ""}
  </g>`;

// la tira de la semana: y = arriba; clases p-dia-0..6 (rect) y p-dl-0..6 (letra)
const semana = (p, y) => {
  const L = ["L", "M", "M", "J", "V", "S", "D"];
  return L.map((l, k) => {
    const x = 150 + k * 112;
    return `<g class="${p}-dia ${p}-d${k}"><rect class="ln4 ${p}-dr${k}" x="${x}" y="${y}" width="92" height="84" rx="18" />
      <text class="lex t-cr ${p}-dl${k}" x="${x + 46}" y="${y + 56}" font-size="36" text-anchor="middle">${l}</text></g>`;
  }).join("\n");
};

const tilde = (cx, cy, cls = "ln-ac", r = 20, extra = "") =>
  `<g class="${extra}"><circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}" style="stroke-width:4" /><path class="${cls}" style="stroke-width:5" d="M${cx - r * 0.45} ${cy} l${r * 0.32} ${r * 0.32} l${r * 0.6} ${-r * 0.62}" /></g>`;

// ---------- plantilla ----------
const css = (id) => {
  const P = `[data-composition-id="${id}"]`;
  return `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .ln { fill: none; stroke: #efeee5; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .ln4 { fill: none; stroke: #efeee5; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .ln-ac { fill: none; stroke: #5ce611; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .ln-ro { fill: none; stroke: #b8574e; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .ln-gr { fill: none; stroke: #7c8698; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .pt { stroke-dasharray: 2 14; }
    ${P} .ap { opacity: 0.45; }
    ${P} .verde { fill: #5ce611; }
    ${P} .crema { fill: #efeee5; }
    ${P} .rojo { fill: #b8574e; }
    ${P} .osc { fill: #07111f; }
    ${P} .t-cr { fill: #efeee5; }
    ${P} .t-ac { fill: #5ce611; }
    ${P} .t-ro { fill: #d27a6e; }
    ${P} .t-gr { fill: #8f99aa; }
    ${P} .t-osc { fill: #07111f; }
    ${P} .lex { font-family: "Lexend", sans-serif; font-weight: 600; }
    ${P} .lex3 { font-family: "Lexend", sans-serif; font-weight: 300; }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.12em; }
    ${P} .chapa { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.1em; fill: #5ce611; }
    ${P} .ia { font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; fill: #5ce611; }
    ${P} .etiqueta { position: absolute; left: 0; right: 0; top: 1268px; height: 40px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; text-transform: uppercase; color: #5ce611; }
    ${P} .etiqueta span { position: absolute; left: 0; right: 0; opacity: 0; }
    ${P} .etiqueta span.mal { color: #d27a6e; }`;
};

const HELPERS = `
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: t <= 0 ? 1 : 0 });
          if (t > 0) tl.to(el, { opacity: 1, duration: 0.04 }, t + i * 0.04);
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, Math.max(0, t) + i * 0.04);
        });
      };
      const pop = (el, t, s0, d) => tl.fromTo(el, { opacity: 0, scale: s0 ?? 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: d ?? 0.35, ease: "back.out(1.6)" }, t);
      const punch = (el, t, s) => tl.to(el, { scale: s ?? 1.08, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1 }, t);
      const aparecer = (el, t, d) => tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: d ?? 0.3 }, t);
      const sube = (el, t, dy) => tl.fromTo(el, { opacity: 0, y: dy ?? 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, t);
      const latir = (el, t, n, s) => tl.to(el, { scale: s ?? 1.06, transformOrigin: "50% 50%", duration: 0.32, ease: "sine.inOut", yoyo: true, repeat: (n ?? 2) * 2 - 1 }, t);
      let etqN = 0;
      const etq = (k, t) => {
        if (etqN) tl.to(q(".e" + etqN), { opacity: 0, y: -10, duration: 0.18 }, t - 0.12);
        tl.fromTo(q(".e" + k), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, t);
        etqN = k;
      };`;

const escribir = (id, { svg, etiquetas = [], js, sfx }) => {
  const { a, b } = ESC[id];
  const dur = r2(b - a);
  const W = (i) => r2(pal[i].start - a);
  const etqHtml = etiquetas
    .map((e, k) => {
      const [txt, mal] = Array.isArray(e) ? e : [e, false];
      return `<span class="e${k + 1}${mal ? " mal" : ""}">${txt}</span>`;
    })
    .join("");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${css(id)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-escena" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
      </svg>
      <div class="etiqueta">${etqHtml}</div>
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
${HELPERS}
${js(W, dur)}
      tl.to(q("#${id}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx(W, dur)));
};

const SOLO = process.argv[2];
const ESCENAS = {};
const escena = (id, f) => (ESCENAS[id] = f);

// =====================================================================================
// s01-gancho: cuatro pedidos iguales, uno por semana; se juntan y el globo verde llega antes
escena("s01-gancho", () => {
  const filas = [0, 1, 2, 3].map((k) => {
    const y = 610 + k * 122;
    return `<g class="s01-card s01-c${k}"><g class="s01-cin">
      <rect class="ln4 s01-borde" x="200" y="${y}" width="680" height="100" rx="24" />
      <text class="mono t-gr" x="232" y="${y + 60}" font-size="24">SEM ${k + 1}</text>
      <path class="ln-gr" d="M352 ${y + 24} V${y + 76}" />
      <text class="lex t-cr" x="380" y="${y + 63}" font-size="34">2 agua · 3 refresco</text>
    </g></g>`;
  }).join("\n");
  return {
    svg: `${filas}
        <g class="s01-glob">
          <path class="verde" d="M240 1000 H820 Q856 1000 856 1036 V1092 Q856 1128 820 1128 H300 L250 1160 L262 1124 Q240 1116 240 1092 Z" />
          <text class="lex t-osc" x="548" y="1080" font-size="38" text-anchor="middle">¿Te mando lo de siempre?</text>
        </g>
        <g class="s01-antes">
          <text class="lex t-ac" x="330" y="1196" font-size="40" text-anchor="middle">MIÉ</text>
          <path class="ln-ac" d="M660 1182 H420 M452 1160 L420 1182 L452 1204" />
          <text class="lex t-gr" x="740" y="1196" font-size="40" text-anchor="middle">JUE</text>
        </g>`,
    etiquetas: ["Cada semana", "Un día antes"],
    js: (W) => `
      const PIDEN = ${W(3)}, MISMO = ${W(5)}, SEMANAS = ${W(8)}, YSI = ${W(9)}, OFRE = ${W(13)}, ANTES = ${W(14)};
      // la primera arranca medio dibujada (el cuadro 0 no puede estar negro)
      dibujar([q(".s01-c0 .s01-borde")], 0, 0.5, 0.45);
      gsap.set(q(".s01-c0 .s01-cin"), { opacity: 1 });
      tl.fromTo(qa(".s01-c0 text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0);
      const ts = [PIDEN, MISMO, SEMANAS];
      [1, 2, 3].forEach((k, i) => {
        tl.fromTo(q(".s01-c" + k), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, ts[i] - 0.05);
      });
      // las que ya están se apagan un poco: siempre lo mismo
      tl.to(qa(".s01-c0, .s01-c1"), { opacity: 0.55, duration: 0.4 }, SEMANAS + 0.1);
      tl.to(qa(".s01-c2"), { opacity: 0.7, duration: 0.4 }, SEMANAS + 0.3);
      tl.to(q(".s01-c3"), { y: 6, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, SEMANAS + 0.4);
      // "¿Y si...": se juntan en una y se pone verde
      [1, 2, 3].forEach((k) => tl.to(q(".s01-c" + k), { y: -122 * k, opacity: 0, duration: 0.4, ease: "power3.inOut" }, YSI - 0.1));
      tl.to(q(".s01-c0"), { opacity: 1, duration: 0.2 }, YSI);
      tl.to(q(".s01-c0 .s01-borde"), { stroke: "#5ce611", duration: 0.25 }, YSI + 0.15);
      tl.to(q(".s01-c0 .t-gr"), { fill: "#5ce611", duration: 0.25 }, YSI + 0.15);
      punch(q(".s01-c0 .s01-cin"), YSI + 0.2, 1.05);
      gsap.set(qa(".s01-glob, .s01-antes"), { opacity: 0 });
      tl.fromTo(q(".s01-glob"), { opacity: 0, y: -260, scale: 0.6, transformOrigin: "50% 0%" }, { opacity: 1, y: -240, scale: 1, transformOrigin: "50% 0%", duration: 0.4, ease: "back.out(1.6)" }, OFRE - 0.1);
      tl.to(q(".s01-glob"), { y: -232, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, OFRE + 0.4);
      tl.fromTo(q(".s01-antes"), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, ANTES - 0.1);
      tl.to(q(".s01-antes path"), { x: -14, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, ANTES + 0.4);
      etq(1, 0.1);
      etq(2, ANTES);`,
    sfx: (W) => [
      { t: W(3), sfx: "pop", vol: 0.22 }, { t: W(5), sfx: "pop", vol: 0.22 }, { t: W(8), sfx: "pop", vol: 0.25 },
      { t: W(9), sfx: "whoosh-short", vol: 0.25 }, { t: W(13), sfx: "notification", vol: 0.32, max: 0.7 }, { t: W(14), sfx: "click-soft", vol: 0.25 },
    ],
  };
});

// s02-hugo: el depósito, Hugo y el reparto a tres comercios
escena("s02-hugo", () => ({
  svg: `
        <g class="s02-dep">
          <path class="ln s02-dd" d="M110 1230 V760 L320 640 L530 760 V1230" />
          <path class="ln s02-dd" d="M90 1230 H550" />
          <rect class="ln4 s02-dd" x="170" y="740" width="300" height="64" rx="12" />
          <text class="mono t-cr s02-cartel" x="320" y="783" font-size="24" text-anchor="middle">DISTRIBUIDORA</text>
        </g>
        <g class="s02-cajones">
          <g class="s02-cj0">${cajon(130, 1160)}</g>
          <g class="s02-cj1">${cajon(130, 1080)}</g>
          <g class="s02-cj2">${cajon(130, 1000)}</g>
        </g>
        <g class="s02-hugo" transform="translate(380 1230)">${hugo("s02")}</g>
        <g class="s02-f0">${fachada(650, 640, 300, 170, "ALMACÉN")}</g>
        <g class="s02-f1">${fachada(650, 850, 300, 170, "KIOSCO")}</g>
        <g class="s02-f2">${fachada(650, 1060, 300, 170, "BAR")}</g>
        <path class="ln-ac pt s02-r0" d="M530 800 C580 780 600 730 640 724" />
        <path class="ln-ac pt s02-r1" d="M530 960 C580 950 600 936 640 934" />
        <path class="ln-ac pt s02-r2" d="M530 1120 C580 1130 600 1144 640 1146" />`,
  etiquetas: ["Distribuidora", "Reparto del barrio"],
  js: (W) => `
      const CHICA = ${W(19)}, ALM = ${W(20)}, KIO = ${W(21)}, BAR = ${W(23)};
      dibujar(qa(".s02-dd"), 0, 0.55, 0.4);
      tl.fromTo(q(".s02-cartel"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.25);
      [0, 1, 2].forEach((k) => pop(q(".s02-cj" + k), 0.2 + k * 0.15, 0.7));
      pop(q(".s02-hugo-in"), 0.05, 0.8, 0.45);
      tl.to(q(".s02-bd"), { rotation: -40, svgOrigin: "72 -210", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      punch(q(".s02-cartel"), CHICA, 1.12);
      [[ALM, 0], [KIO, 1], [BAR, 2]].forEach(([t, k]) => {
        dibujar(qa(".s02-f" + k + " path, .s02-f" + k + " rect"), t - 0.1, 0.45, 0.5);
        tl.fromTo(q(".s02-f" + k + " text"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, t + 0.1);
        const r = q(".s02-r" + k);
        tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
        tl.fromTo(r, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, t);
      });
      tl.to(qa(".s02-r0, .s02-r1, .s02-r2"), { strokeDashoffset: -48, duration: 1.4, ease: "none" }, BAR + 1.2);
      etq(1, 0.1);
      etq(2, ALM);`,
  sfx: (W) => [{ t: 0.1, sfx: "pop", vol: 0.25 }, { t: W(20), sfx: "click-soft", vol: 0.25 }, { t: W(21), sfx: "click-soft", vol: 0.25 }, { t: W(23), sfx: "click-soft", vol: 0.25 }],
}));

// s03-jueves: el jueves, Hugo espera; Graciela escribe a las 23:04
escena("s03-jueves", () => ({
  svg: `
        ${semana("s03", 600)}
        <g class="s03-hugo" transform="translate(250 1230)">${hugo("s03")}</g>
        <g class="s03-reloj"><circle class="ln4" cx="250" cy="770" r="46" /><path class="ln4 s03-aguja" d="M250 770 V740" /><path class="ln4" d="M250 770 H272" /></g>
        <g class="s03-cel">
          <rect class="ln s03-cd" x="470" y="740" width="440" height="500" rx="52" />
          <path class="ln4 s03-cd" d="M650 768 H730" />
          <text class="mono t-gr s03-ct" x="510" y="830" font-size="22">PEDIDOS · JUEVES</text>
          <path class="ln-gr s03-cd" d="M510 856 H870" />
        </g>
        <g class="s03-pts"><circle class="s03-p" cx="640" cy="960" r="12" fill="#7c8698" /><circle class="s03-p" cx="690" cy="960" r="12" fill="#7c8698" /><circle class="s03-p" cx="740" cy="960" r="12" fill="#7c8698" /></g>
        <g class="s03-msg">
          <circle class="ln-gr" cx="530" cy="924" r="24" /><text class="lex t-gr" x="530" y="933" font-size="24" text-anchor="middle">G</text>
          <text class="lex t-cr" x="566" y="920" font-size="26">Graciela</text>
          <text class="mono t-gr" x="566" y="946" font-size="18" data-layout-ignore>ALMACÉN</text>
          <rect class="ln-gr" x="506" y="970" width="370" height="124" rx="24" />
          <text class="lex t-cr" x="530" y="1020" font-size="29">Hugo, ¿me traés</text>
          <text class="lex t-cr" x="530" y="1062" font-size="29">lo de siempre?</text>
        </g>
        <g class="s03-hora">
          <rect class="ln-ro" x="660" y="1120" width="210" height="70" rx="20" />
          <text class="lex t-ro" x="765" y="1168" font-size="38" text-anchor="middle">23:04</text>
        </g>`,
  etiquetas: ["Jueves", ["Esperando", true], ["A las 23:04", true]],
  js: (W) => `
      const JUE = ${W(27)}, ESPERAR = ${W(31)}, GRACIELA = ${W(35)}, ONCE = ${W(43)}, NOCHE = ${W(46)};
      dibujar(qa(".s03-dia rect"), 0, 0.45, 0.4);
      tl.fromTo(qa(".s03-dia text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0.05);
      // el jueves se marca
      tl.to(q(".s03-dr3"), { stroke: "#b8574e", duration: 0.2 }, JUE);
      tl.to(q(".s03-dl3"), { fill: "#d27a6e", duration: 0.2 }, JUE);
      punch(q(".s03-d3"), JUE, 1.15);
      tl.to(qa(".s03-d0, .s03-d1, .s03-d2, .s03-d4, .s03-d5, .s03-d6"), { opacity: 0.4, duration: 0.3 }, JUE + 0.1);
      pop(q(".s03-hugo-in"), 0.15, 0.85, 0.4);
      dibujar(qa(".s03-cd"), 0.3, 0.5);
      aparecer(q(".s03-ct"), 0.6);
      // esperar: el reloj, los puntitos
      gsap.set(q(".s03-reloj"), { opacity: 0 });
      pop(q(".s03-reloj"), ESPERAR - 0.1, 0.6);
      tl.fromTo(q(".s03-aguja"), { rotation: 0, svgOrigin: "250 770" }, { rotation: 720, svgOrigin: "250 770", duration: GRACIELA - ESPERAR + 2, ease: "none" }, ESPERAR);
      gsap.set(qa(".s03-p"), { opacity: 0 });
      qa(".s03-p").forEach((p, i) => tl.fromTo(p, { opacity: 0.2, y: 0 }, { opacity: 1, y: -10, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, ESPERAR + i * 0.15));
      tl.to(q(".s03-hugo-in"), { y: -6, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, ESPERAR);
      tl.to(q(".s03-bd"), { rotation: -50, svgOrigin: "72 -210", duration: 0.3 }, ESPERAR + 0.3);
      tl.to(qa(".s03-p"), { opacity: 0, duration: 0.15 }, GRACIELA - 0.1);
      // llega el mensaje, tarde
      gsap.set(qa(".s03-msg, .s03-hora"), { opacity: 0 });
      tl.fromTo(q(".s03-msg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, GRACIELA - 0.05);
      pop(q(".s03-hora"), ONCE - 0.05, 0.6);
      tl.to(q(".s03-hora"), { x: -4, duration: 0.05, yoyo: true, repeat: 5 }, ONCE + 0.35);
      // Hugo ya está cansado: bosteza
      tl.to(q(".s03-boca"), { scaleY: 2.4, scaleX: 0.7, svgOrigin: "0 -257", duration: 0.3, yoyo: true, repeat: 1 }, NOCHE);
      tl.to(q(".s03-bd"), { rotation: 0, svgOrigin: "72 -210", duration: 0.3 }, NOCHE);
      tl.to(qa(".s03-dia"), { opacity: 0.25, duration: 0.4 }, NOCHE);
      etq(1, JUE);
      etq(2, ESPERAR);
      etq(3, ONCE - 0.25);`,
  sfx: (W) => [{ t: W(27), sfx: "click", vol: 0.25 }, { t: W(31), sfx: "typing", vol: 0.15, max: 1.2 }, { t: W(35), sfx: "notification", vol: 0.3, max: 0.7 }, { t: W(43), sfx: "glitch-1", vol: 0.2, max: 0.4 }],
}));

// s04-otros: el kiosco le compró a otro; el bar pidió de menos y se quedó sin agua
escena("s04-otros", () => {
  const botellas = [0, 1, 2, 3].map((k) => {
    const x = 640 + k * 76;
    return `<path class="ln4 s04-bot s04-b${k}" d="M${x + 14} 1012 V994 H${x + 30} V1012 Q${x + 44} 1024 ${x + 44} 1044 V1116 Q${x + 44} 1124 ${x + 36} 1124 H${x + 8} Q${x} 1124 ${x} 1116 V1044 Q${x} 1024 ${x + 14} 1012 Z" />`;
  }).join("");
  return {
    svg: `
        <path class="ln4 ap s04-div" d="M540 640 V1230" />
        <g class="s04-kio">${fachada(110, 700, 340, 240, "KIOSCO")}</g>
        <path class="ln s04-piso" d="M80 1150 H500" />
        <g class="s04-cam"><g class="s04-cam-in">
          <rect class="ln-gr" x="0" y="-130" width="170" height="110" rx="10" />
          <path class="ln-gr" d="M170 -100 H226 L256 -64 V-20 H170 Z" />
          <circle class="ln-gr" cx="44" cy="-14" r="20" /><circle class="ln-gr" cx="210" cy="-14" r="20" />
          <text class="mono t-gr" x="85" y="-66" font-size="18" text-anchor="middle" data-layout-ignore>OTRO</text>
        </g></g>
        <g class="s04-cj">${cajon(300, 1086, "ln-gr")}</g>
        <g class="s04-chip1"><rect class="ln-ro" x="110" y="1176" width="340" height="56" rx="16" style="stroke-width:4" />
          <text class="mono t-ro" x="280" y="1213" font-size="22" text-anchor="middle">LE COMPRÓ A OTRO</text></g>
        <g class="s04-bar">${fachada(610, 640, 340, 200, "BAR")}</g>
        <path class="ln s04-gon" d="M610 1130 H950 M610 980 H950 M622 980 V1130 M938 980 V1130" />
        ${botellas}
        <g class="s04-chip2"><rect class="ln-gr" x="660" y="870" width="240" height="56" rx="16" />
          <text class="mono t-gr" x="780" y="907" font-size="22" text-anchor="middle">PIDIÓ 1 AGUA</text></g>
        <g class="s04-chip3"><rect class="ln-ro" x="610" y="1176" width="340" height="56" rx="16" style="stroke-width:4" />
          <text class="mono t-ro" x="780" y="1213" font-size="22" text-anchor="middle">SÁB · SIN AGUA</text></g>`,
    etiquetas: [["Pasó otro primero", true], ["Pidió de menos", true], ["Sin agua", true]],
    js: (W) => `
      const PASO = ${W(53)}, PRIMERO = ${W(54)}, BAR = ${W(57)}, MENOS = ${W(60)}, SABADO = ${W(62)}, SIN = ${W(65)};
      dibujar(qa(".s04-kio path, .s04-kio rect, .s04-piso"), 0, 0.5, 0.4);
      aparecer(q(".s04-kio text"), 0.2);
      tl.fromTo(q(".s04-div"), { scaleY: 0, svgOrigin: "540 640" }, { scaleY: 1, svgOrigin: "540 640", duration: 0.6, ease: "power3.out" }, 0);
      // el camión de otro pasa primero y deja un cajón
      gsap.set(q(".s04-cam"), { x: -320, y: 1150 });
      tl.to(q(".s04-cam"), { x: 60, duration: 0.7, ease: "power2.out" }, PASO - 0.45);
      tl.to(q(".s04-cam-in"), { y: -4, duration: 0.1, yoyo: true, repeat: 5 }, PASO - 0.4);
      gsap.set(q(".s04-cj"), { opacity: 0 });
      tl.fromTo(q(".s04-cj"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out" }, PRIMERO);
      tl.to(q(".s04-cam"), { x: 620, opacity: 0, duration: 0.9, ease: "power2.in" }, PRIMERO + 0.4);
      gsap.set(qa(".s04-chip1, .s04-chip2, .s04-chip3"), { opacity: 0 });
      pop(q(".s04-chip1"), PRIMERO + 0.15, 0.7);
      // el bar
      dibujar(qa(".s04-bar path, .s04-bar rect, .s04-gon"), BAR - 0.6, 0.5);
      tl.fromTo(q(".s04-bar text"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, BAR - 0.3);
      qa(".s04-bot").forEach((b, i) => tl.fromTo(b, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)" }, BAR - 0.2 + i * 0.07));
      pop(q(".s04-chip2"), MENOS - 0.1, 0.7);
      // el sábado se van vaciando
      [3, 2, 1, 0].forEach((k, i) => tl.to(q(".s04-b" + k), { opacity: 0.15, y: 8, duration: 0.2 }, SABADO + i * 0.15));
      tl.to(q(".s04-gon"), { stroke: "#7c8698", duration: 0.3 }, SABADO);
      pop(q(".s04-chip3"), SIN - 0.05, 0.7);
      tl.to(q(".s04-chip3"), { x: -4, duration: 0.05, yoyo: true, repeat: 5 }, SIN + 0.35);
      etq(1, PRIMERO);
      etq(2, MENOS);
      etq(3, SIN);`,
    sfx: (W) => [{ t: W(53) - 0.45, sfx: "whoosh", vol: 0.2, max: 0.8 }, { t: W(54), sfx: "click", vol: 0.25 }, { t: W(60), sfx: "pop", vol: 0.2 }, { t: W(62), sfx: "click-soft", vol: 0.2 }, { t: W(65), sfx: "glitch-1", vol: 0.2, max: 0.4 }],
  };
});

// s05-a-tiempo: querían comprar; nadie les preguntó a tiempo
escena("s05-a-tiempo", () => {
  const C = [["G", "Graciela", "ALMACÉN"], ["K", "Kiosco", "DE LA ESQUINA"], ["B", "Bar", "DEL BARRIO"]];
  const filas = C.map(([l, n, s], k) => {
    const y = 620 + k * 150;
    return `<g class="s05-f s05-f${k}">
      <rect class="ln4" x="150" y="${y}" width="480" height="120" rx="26" />
      <circle class="ln4" cx="214" cy="${y + 60}" r="34" /><text class="lex t-cr" x="214" y="${y + 71}" font-size="30" text-anchor="middle">${l}</text>
      <text class="lex t-cr" x="266" y="${y + 56}" font-size="32">${n}</text>
      <text class="mono t-gr" x="266" y="${y + 90}" font-size="20" data-layout-ignore>${s}</text>
      <g class="s05-cart s05-ca${k}"><path class="ln-ac" d="M540 ${y + 40} H556 L568 ${y + 78} H604 L614 ${y + 50} H562" /><circle class="verde" cx="574" cy="${y + 92}" r="6" /><circle class="verde" cx="600" cy="${y + 92}" r="6" /></g>
      <g class="s05-vacio s05-v${k}"><path class="ln-ro pt" style="stroke-dasharray: 4 14" d="M690 ${y + 10} H900 Q930 ${y + 10} 930 ${y + 40} V${y + 80} Q930 ${y + 110} 900 ${y + 110} H700 L668 ${y + 124} L676 ${y + 100} Q660 ${y + 92} 660 ${y + 70} V${y + 40} Q660 ${y + 10} 690 ${y + 10} Z" />
        <text class="lex t-ro" x="795" y="${y + 74}" font-size="36" text-anchor="middle">¿...?</text></g>
    </g>`;
  }).join("\n");
  return {
    svg: `${filas}
        <g class="s05-reloj"><circle class="ln-ro" cx="540" cy="1150" r="62" /><path class="ln-ro s05-ag" d="M540 1150 V1106" /><path class="ln-ro" d="M540 1150 H572" />
          <path class="ln-ro" d="M500 1084 L484 1068 M580 1084 L596 1068" /></g>`,
    etiquetas: ["Querían comprar", ["Nadie preguntó", true]],
    js: (W) => `
      const COMPRAR = ${W(68)}, NADIE = ${W(69)}, TIEMPO = ${W(73)};
      [0, 1, 2].forEach((k) => {
        const f = q(".s05-f" + k);
        if (k === 0) { dibujar(qa(".s05-f0 > rect, .s05-f0 > circle"), 0, 0.4, 0.4); tl.fromTo(qa(".s05-f0 > text"), { opacity: 0.3 }, { opacity: 1, duration: 0.25 }, 0); }
        else tl.fromTo(f, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0.08 * k);
      });
      gsap.set(qa(".s05-cart, .s05-vacio, .s05-reloj"), { opacity: 0 });
      [0, 1, 2].forEach((k) => pop(q(".s05-ca" + k), COMPRAR + k * 0.1, 0.5));
      [0, 1, 2].forEach((k) => {
        pop(q(".s05-v" + k), NADIE + k * 0.12, 0.7);
        tl.to(q(".s05-v" + k), { opacity: 0.55, duration: 0.25, yoyo: true, repeat: 1 }, NADIE + 0.5 + k * 0.1);
      });
      pop(q(".s05-reloj"), TIEMPO - 0.1, 0.6);
      tl.fromTo(q(".s05-ag"), { rotation: 0, svgOrigin: "540 1150" }, { rotation: 300, svgOrigin: "540 1150", duration: 0.9, ease: "power2.out" }, TIEMPO);
      tl.to(qa(".s05-f > rect"), { stroke: "#7c8698", duration: 0.3 }, TIEMPO);
      etq(1, 0.1);
      etq(2, NADIE);`,
    sfx: (W) => [{ t: W(68), sfx: "pop", vol: 0.22 }, { t: W(69), sfx: "click-soft", vol: 0.22 }, { t: W(73), sfx: "key-press", vol: 0.3 }],
  };
});

// s06-memoria: Hugo sabe de memoria lo que lleva cada uno; esa memoria trabaja sola
escena("s06-memoria", () => {
  const N = [["GRACIELA", "2 agua · 3 refresco"], ["KIOSCO", "4 gaseosa"], ["BAR", "6 agua · 2 soda"]];
  const notas = N.map(([q1, t], k) => {
    const y = 640 + k * 160;
    return `<g class="s06-n s06-n${k}"><g class="s06-nin">
      <rect class="ln4 s06-nb" x="470" y="${y}" width="470" height="126" rx="24" />
      <text class="mono t-gr s06-nq" x="502" y="${y + 44}" font-size="22">${q1}</text>
      <text class="lex t-cr" x="502" y="${y + 94}" font-size="34">${t}</text>
      ${tilde(890, y + 44, "ln-ac", 20, "s06-ok")}
    </g></g>`;
  }).join("\n");
  return {
    svg: `
        <g class="s06-hugo" transform="translate(270 1230)">${hugo("s06")}</g>
        <circle class="ln4 s06-burb" cx="372" cy="900" r="10" /><circle class="ln4 s06-burb" cx="410" cy="860" r="15" />
        ${notas}
        <g class="s06-lista"><rect class="ln-ac" x="450" y="1128" width="510" height="70" rx="20" />
          <text class="mono t-ac" x="705" y="1173" font-size="26" text-anchor="middle">LO DE SIEMPRE · AUTO</text></g>`,
    etiquetas: ["De memoria", "Trabaja sola"],
    js: (W) => `
      const MEMORIA = ${W(78)}, LLEVA = ${W(81)}, UNO = ${W(83)}, AHORA = ${W(84)}, TRABAJA = ${W(87)};
      dibujar(qa(".s06-hugo-in .ln, .s06-hugo-in .ln4"), 0, 0.5, 0.45);
      tl.fromTo(qa(".s06-hugo-in .crema, .s06-hugo-in text"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
      // se toca la sien: se acuerda
      tl.to(q(".s06-bd"), { rotation: -120, svgOrigin: "72 -210", duration: 0.35, ease: "power2.out" }, 0.3);
      gsap.set(qa(".s06-burb, .s06-n, .s06-ok, .s06-lista"), { opacity: 0 });
      qa(".s06-burb").forEach((b, i) => pop(b, MEMORIA - 0.3 + i * 0.1, 0.4));
      [[MEMORIA, 0], [LLEVA, 1], [UNO, 2]].forEach(([t, k]) => tl.fromTo(q(".s06-n" + k), { opacity: 0, x: -60, scale: 0.8, transformOrigin: "0% 50%" }, { opacity: 1, x: 0, scale: 1, transformOrigin: "0% 50%", duration: 0.35, ease: "back.out(1.6)" }, t));
      tl.to(q(".s06-hugo-in"), { y: -8, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, LLEVA);
      // Ahora: se ponen verdes y se ordenan solas
      tl.to(q(".s06-bd"), { rotation: 0, svgOrigin: "72 -210", duration: 0.3 }, AHORA);
      tl.to(qa(".s06-nb"), { stroke: "#5ce611", duration: 0.3, stagger: 0.08 }, AHORA);
      tl.to(qa(".s06-nq"), { fill: "#5ce611", duration: 0.3, stagger: 0.08 }, AHORA);
      tl.to(qa(".s06-burb"), { opacity: 0, duration: 0.2 }, AHORA);
      [0, 1, 2].forEach((k) => { tl.to(q(".s06-n" + k), { x: -10, y: -14, duration: 0.4, ease: "power3.inOut" }, TRABAJA - 0.1 + k * 0.08); pop(qa(".s06-ok")[k], TRABAJA + 0.1 + k * 0.15, 0.4); });
      tl.to(q(".s06-hugo"), { opacity: 0.5, duration: 0.4 }, TRABAJA);
      tl.fromTo(q(".s06-lista"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, TRABAJA - 0.1);
      etq(1, MEMORIA);
      etq(2, TRABAJA);`,
    sfx: (W) => [{ t: W(78), sfx: "pop", vol: 0.22 }, { t: W(81), sfx: "pop", vol: 0.22 }, { t: W(83), sfx: "pop", vol: 0.22 }, { t: W(84), sfx: "whoosh-short", vol: 0.22 }, { t: W(87) + 0.1, sfx: "sparkle", vol: 0.3, max: 0.9 }],
  };
});

// s07-miercoles: el miércoles, el agente le escribe a cada cliente
escena("s07-miercoles", () => {
  const C = ["G", "K", "B"];
  const cli = C.map((l, k) => {
    const y = 790 + k * 150;
    return `<g class="s07-c s07-c${k}">
      <circle class="ln4" cx="860" cy="${y + 50}" r="40" /><text class="lex t-cr" x="860" y="${y + 62}" font-size="34" text-anchor="middle">${l}</text>
      <g class="s07-g s07-g${k}"><path class="verde" d="M500 ${y + 14} H770 Q790 ${y + 14} 790 ${y + 34} V${y + 66} Q790 ${y + 86} 770 ${y + 86} H520 Q500 ${y + 86} 500 ${y + 66} V${y + 34} Q500 ${y + 14} 520 ${y + 14} Z" />
        <text class="lex t-osc" x="645" y="${y + 61}" font-size="27" text-anchor="middle">¿Lo de siempre?</text></g>
      <path class="ln-ac s07-l s07-l${k}" d="M400 1000 C440 ${y + 50} 470 ${y + 50} 496 ${y + 50}" />
    </g>`;
  }).join("\n");
  return {
    svg: `
        ${semana("s07", 600)}
        <g class="s07-ag" transform="translate(270 1230)">${agente("s07")}</g>
        ${cli}`,
    etiquetas: ["Miércoles", "Agente de IA", "A cada cliente"],
    js: (W) => `
      const MIE = ${W(90)}, AGENTE = ${W(92)}, ESCRIBE = ${W(96)}, CADA = ${W(98)}, CLIENTE = ${W(99)};
      dibujar(qa(".s07-dia rect"), 0, 0.45, 0.4);
      tl.fromTo(qa(".s07-dia text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0.05);
      tl.to(q(".s07-dr2"), { stroke: "#5ce611", duration: 0.2 }, MIE);
      tl.to(q(".s07-dl2"), { fill: "#5ce611", duration: 0.2 }, MIE);
      punch(q(".s07-d2"), MIE, 1.18);
      tl.to(qa(".s07-d0, .s07-d1, .s07-d3, .s07-d4, .s07-d5, .s07-d6"), { opacity: 0.4, duration: 0.3 }, MIE + 0.1);
      gsap.set(qa(".s07-c, .s07-g"), { opacity: 0 });
      tl.fromTo(q(".s07-ag-in"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, AGENTE - 0.25);
      tl.fromTo(q(".s07-antena"), { opacity: 0.3 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, AGENTE + 0.2);
      tl.to(q(".s07-ojos"), { scaleY: 0.15, svgOrigin: "0 -241", duration: 0.08, yoyo: true, repeat: 1 }, AGENTE + 0.6);
      [0, 1, 2].forEach((k) => tl.fromTo(q(".s07-c" + k), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, AGENTE + k * 0.1));
      [ESCRIBE, CADA, CLIENTE].forEach((t, k) => {
        dibujar([q(".s07-l" + k)], t - 0.2, 0.35);
        pop(q(".s07-g" + k), t + 0.1, 0.7);
      });
      tl.to(q(".s07-abd"), { rotation: -60, svgOrigin: "66 -130", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, ESCRIBE - 0.1);
      etq(1, MIE);
      etq(2, AGENTE - 0.3);
      etq(3, ESCRIBE + 0.1);`,
    sfx: (W) => [{ t: W(90), sfx: "click", vol: 0.25 }, { t: W(92) - 0.2, sfx: "pop", vol: 0.25 }, { t: W(96) + 0.1, sfx: "notification", vol: 0.22, max: 0.5 }, { t: W(98) + 0.1, sfx: "notification", vol: 0.22, max: 0.5 }, { t: W(99) + 0.1, sfx: "notification", vol: 0.22, max: 0.5 }],
  };
});

// s08-chat: el chat con Graciela (agente con borde verde, ella en crema)
escena("s08-chat", () => ({
  svg: `
        <g class="s08-cel">
          <rect class="ln s08-cd" x="170" y="590" width="740" height="660" rx="52" />
          <path class="ln4 s08-cd" d="M500 616 H580" />
          <circle class="ln4 s08-cd" cx="240" cy="672" r="30" />
          <text class="lex t-cr s08-h" x="240" y="682" font-size="28" text-anchor="middle">G</text>
          <text class="lex t-cr s08-h" x="286" y="668" font-size="30">Graciela</text>
          <text class="mono t-gr s08-h" x="286" y="698" font-size="20" data-layout-ignore>ALMACÉN · MIÉ 10:02</text>
          <path class="ln4 ap s08-cd" d="M200 724 H880" />
        </g>
        <g class="s08-b1">
          <text class="mono t-ac" x="880" y="752" font-size="18" text-anchor="end" data-layout-ignore>AGENTE DE IA</text>
          <rect class="ln-ac" x="330" y="762" width="550" height="106" rx="26" />
          <text class="lex t-cr s08-l1" x="358" y="808" font-size="31">Hola Graciela, ¿te mando</text>
          <text class="lex t-cr s08-l2" x="358" y="850" font-size="31">lo de siempre?</text>
        </g>
        <g class="s08-rows">
          <rect class="ln-ac" x="330" y="882" width="550" height="124" rx="26" />
          <g class="s08-r1">${tilde(372, 919, "ln-gr", 18, "s08-t1g")}${tilde(372, 919, "ln-ac", 18, "s08-t1")}<text class="lex t-cr" x="406" y="930" font-size="30">2 cajones de agua</text></g>
          <g class="s08-r2">${tilde(372, 971, "ln-gr", 18, "s08-t2g")}${tilde(372, 971, "ln-ac", 18, "s08-t2")}<text class="lex t-cr" x="406" y="982" font-size="30">3 cajones de refresco</text></g>
        </g>
        <g class="s08-b2"><rect class="ln-ac" x="630" y="1018" width="250" height="58" rx="22" />
          <text class="lex t-cr" x="755" y="1058" font-size="30" text-anchor="middle">¿Agrego algo?</text></g>
        <g class="s08-b3"><rect class="ln" x="200" y="1092" width="540" height="62" rx="22" />
          <text class="lex t-cr" x="224" y="1134" font-size="30">Sí, y sumale una caja de yerba.</text></g>
        <g class="s08-yerba"><rect class="verde" x="590" y="1170" width="290" height="50" rx="18" />
          <text class="mono t-osc" x="735" y="1204" font-size="22" text-anchor="middle">+ 1 CAJA DE YERBA</text></g>`,
  etiquetas: ["Lo de siempre", "¡Sí!"],
  js: (W) => `
      const TE = ${W(102)}, DOS = ${W(107)}, AGUA = ${W(110)}, TRES = ${W(112)}, REF = ${W(114)}, AGREGO = ${W(115)}, SI = ${W(117)}, SUMALE = ${W(119)}, YERBA = ${W(123)};
      dibujar(qa(".s08-cd"), 0, 0.45, 0.4);
      tl.fromTo(qa(".s08-h"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0.05);
      gsap.set(qa(".s08-rows, .s08-r1, .s08-r2, .s08-t1, .s08-t2, .s08-b2, .s08-b3, .s08-yerba"), { opacity: 0 });
      tl.fromTo(q(".s08-b1"), { opacity: 0, y: 30, scale: 0.9, transformOrigin: "100% 0%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "100% 0%", duration: 0.35, ease: "back.out(1.6)" }, 0.05);
      tl.fromTo(q(".s08-l1"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.25 }, 0.1);
      tl.fromTo(q(".s08-l2"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.25 }, TE + 0.3);
      tl.fromTo(q(".s08-rows"), { opacity: 0, y: 20, scale: 0.92, transformOrigin: "100% 0%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "100% 0%", duration: 0.3, ease: "back.out(1.6)" }, DOS - 0.2);
      sube(q(".s08-r1"), DOS - 0.05, 14);
      pop(q(".s08-t1"), AGUA, 0.5);
      sube(q(".s08-r2"), TRES - 0.05, 14);
      pop(q(".s08-t2"), REF + 0.1, 0.5);
      tl.fromTo(q(".s08-b2"), { opacity: 0, y: 20, scale: 0.85, transformOrigin: "100% 0%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "100% 0%", duration: 0.3, ease: "back.out(1.6)" }, AGREGO - 0.05);
      punch(q(".s08-b2"), AGREGO + 0.4, 1.04);
      // la respuesta de Graciela
      tl.fromTo(q(".s08-b3"), { opacity: 0, y: 30, scale: 0.85, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, transformOrigin: "0% 100%", duration: 0.35, ease: "back.out(2)" }, SI - 0.08);
      tl.to(q(".s08-b3"), { y: -10, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, SI + 0.35);
      // en "yerba": todo sube un poco y aparece el chip verde abajo
            tl.fromTo(q(".s08-yerba"), { opacity: 0, scale: 0.6, transformOrigin: "100% 50%" }, { opacity: 1, scale: 1, transformOrigin: "100% 50%", duration: 0.35, ease: "back.out(1.8)" }, SUMALE);
      etq(1, 0.1);
      etq(2, SI);`,
  sfx: (W) => [{ t: 0.05, sfx: "notification", vol: 0.28, max: 0.7 }, { t: W(110), sfx: "click-soft", vol: 0.22 }, { t: W(114) + 0.1, sfx: "click-soft", vol: 0.22 }, { t: W(115), sfx: "pop", vol: 0.2 }, { t: W(117) - 0.08, sfx: "notification", vol: 0.3, max: 0.7 }, { t: W(119), sfx: "sparkle", vol: 0.28, max: 0.8 }],
}));

// s09-pedido: el pedido armado con precios y stock; lo que no sabe se lo pasa a Hugo
escena("s09-pedido", () => {
  const F = ["2 cajones de agua", "3 cajones de refresco", "1 caja de yerba"];
  const filas = F.map((t, k) => {
    const y = 760 + k * 74;
    return `<text class="lex t-cr" x="210" y="${y}" font-size="30">${t}</text>
      ${tilde(705, y - 10, "ln-ac", 18, "s09-p s09-p" + k)}${tilde(835, y - 10, "ln-ac", 18, "s09-s s09-s" + k)}`;
  }).join("\n");
  return {
    svg: `
        <g class="s09-card"><g class="s09-cin">
          <rect class="ln s09-borde" x="170" y="600" width="740" height="420" rx="32" />
          <text class="mono t-gr s09-tit" x="210" y="662" font-size="24">PEDIDO · ALMACÉN GRACIELA</text>
          <text class="mono t-gr" x="705" y="706" font-size="20" text-anchor="middle" data-layout-ignore>PRECIO</text>
          <text class="mono t-gr" x="835" y="706" font-size="20" text-anchor="middle" data-layout-ignore>STOCK</text>
          <path class="ln4 ap" d="M210 684 H870" />
          ${filas}
          <g class="s09-sello"><rect class="ln-ac" x="620" y="936" width="250" height="56" rx="14" style="stroke-width:4" /><text class="mono t-ac" x="745" y="973" font-size="26" text-anchor="middle">ARMADO</text></g>
        </g></g>
        <g class="s09-ag" transform="translate(270 1236) scale(0.62)">${agente("s09")}</g>
        <g class="s09-preg"><g class="s09-pin">
          <text class="mono t-gr" x="380" y="1036" font-size="20" data-layout-ignore>BAR DEL BARRIO</text>
          <rect class="ln-gr" x="380" y="1050" width="520" height="70" rx="22" />
          <text class="lex t-cr" x="404" y="1095" font-size="27">¿Me conseguís hielo el domingo?</text>
        </g></g>
        <g class="s09-duda"><circle class="ln4" cx="330" cy="984" r="26" /><text class="lex t-cr" x="330" y="996" font-size="34" text-anchor="middle">?</text></g>
        <path class="ln-ac s09-fl" d="M650 1136 C660 1180 720 1196 770 1196 M748 1176 L772 1196 L748 1216" />
        <g class="s09-hugo"><circle class="ln-ac" cx="840" cy="1190" r="46" /><text class="lex t-ac" x="840" y="1202" font-size="34" text-anchor="middle">H</text></g>
        <g class="s09-chip"><rect class="verde" x="560" y="1218" width="200" height="40" rx="14" /><text class="mono t-osc" x="660" y="1246" font-size="20" text-anchor="middle">PARA HUGO</text></g>`,
    etiquetas: ["Precios y stock", "Armado", "Para Hugo"],
    js: (W) => `
      const PRECIOS = ${W(129)}, STOCK = ${W(132)}, ARMADO = ${W(137)}, SI = ${W(138)}, PREGUNTAN = ${W(140)}, SABE = ${W(144)}, PASA = ${W(146)}, HUGO = ${W(150)};
      dibujar([q(".s09-borde")], 0, 0.5, 0.45);
      tl.fromTo(qa(".s09-cin text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.03 }, 0.05);
      gsap.set(qa(".s09-p, .s09-s, .s09-sello, .s09-preg, .s09-duda, .s09-hugo, .s09-chip"), { opacity: 0 });
      [0, 1, 2].forEach((k) => pop(q(".s09-p" + k), PRECIOS + k * 0.1, 0.4));
      [0, 1, 2].forEach((k) => pop(q(".s09-s" + k), STOCK + k * 0.1, 0.4));
      tl.to(q(".s09-borde"), { stroke: "#5ce611", duration: 0.3 }, ARMADO);
      tl.to(q(".s09-tit"), { fill: "#5ce611", duration: 0.3 }, ARMADO);
      tl.fromTo(q(".s09-sello"), { opacity: 0, scale: 1.6, rotation: -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -4, transformOrigin: "50% 50%", duration: 0.3, ease: "power3.in" }, ARMADO);
      punch(q(".s09-cin"), ARMADO + 0.3, 1.02);
      // "Si le preguntan algo...": la tarjeta se achica arriba
      tl.to(q(".s09-card"), { scale: 0.78, y: -110, svgOrigin: "540 600", duration: 0.45, ease: "power3.inOut" }, SI - 0.15);
      tl.fromTo(q(".s09-ag-in"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, SI);
      tl.fromTo(q(".s09-preg"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.6)" }, PREGUNTAN - 0.05);
      pop(q(".s09-duda"), SABE - 0.05, 0.5);
      tl.to(q(".s09-duda"), { rotation: 12, svgOrigin: "330 984", duration: 0.15, yoyo: true, repeat: 3 }, SABE + 0.3);
      // se la pasa a Hugo
      dibujar([q(".s09-fl")], PASA - 0.1, 0.4);
      pop(q(".s09-hugo"), PASA + 0.2, 0.6);
      tl.to(q(".s09-pin"), { x: 120, y: 60, scale: 0.4, opacity: 0, svgOrigin: "640 1085", duration: 0.5, ease: "power2.in" }, PASA + 0.15);
      punch(q(".s09-hugo"), HUGO, 1.15);
      pop(q(".s09-chip"), HUGO - 0.05, 0.6);
      etq(1, 0.3);
      etq(2, ARMADO);
      etq(3, PASA);`,
    sfx: (W) => [{ t: W(129), sfx: "click-soft", vol: 0.22 }, { t: W(132), sfx: "click-soft", vol: 0.22 }, { t: W(137), sfx: "impact-bass-1", vol: 0.25, max: 0.6 }, { t: W(140), sfx: "notification", vol: 0.22, max: 0.6 }, { t: W(146), sfx: "whoosh-short", vol: 0.25 }, { t: W(150), sfx: "ping", vol: 0.25 }],
  };
});

// s10-camion: el jueves Hugo ya no espera: carga el camión
escena("s10-camion", () => ({
  svg: `
        ${semana("s10", 600)}
        <g class="s10-cam"><g class="s10-cin">
          <rect class="ln" x="120" y="870" width="470" height="290" rx="14" />
          <path class="ln" d="M590 960 H700 L770 1050 V1160 H590 Z" />
          <path class="ln4" d="M610 980 H690 L736 1046 H610 Z" />
          <circle class="ln" cx="230" cy="1180" r="40" /><circle class="ln" cx="660" cy="1180" r="40" />
          <path class="ln4 ap" d="M60 1230 H980" />
        </g></g>
        <g class="s10-cj0">${cajon(160, 1072, "ln4", "G")}</g>
        <g class="s10-cj1">${cajon(300, 1072, "ln4", "K")}</g>
        <g class="s10-cj2">${cajon(440, 1072, "ln4", "B")}</g>
        <g class="s10-cj3">${cajon(230, 980, "ln4")}</g>
        <g class="s10-cj4">${cajon(370, 980, "ln4")}</g>
        <g class="s10-hugo" transform="translate(880 1230) scale(0.72)">${hugo("s10", false)}</g>`,
  etiquetas: ["Jueves", "A cargar"],
  js: (W) => `
      const JUE = ${W(152)}, HUGO = ${W(153)}, CARGA = ${W(157)}, CAMION = ${W(159)};
      dibujar(qa(".s10-dia rect"), 0, 0.4, 0.4);
      tl.fromTo(qa(".s10-dia text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0.05);
      tl.to(q(".s10-dr3"), { stroke: "#5ce611", duration: 0.2 }, JUE);
      tl.to(q(".s10-dl3"), { fill: "#5ce611", duration: 0.2 }, JUE);
      punch(q(".s10-d3"), JUE, 1.18);
      tl.to(qa(".s10-d0, .s10-d1, .s10-d2, .s10-d4, .s10-d5, .s10-d6"), { opacity: 0.4, duration: 0.3 }, JUE + 0.1);
      dibujar(qa(".s10-cin .ln, .s10-cin .ln4"), 0.1, 0.55);
      gsap.set(qa(".s10-cj0, .s10-cj1, .s10-cj2, .s10-cj3, .s10-cj4"), { opacity: 0 });
      pop(q(".s10-hugo-in"), HUGO - 0.2, 0.8);
      tl.to(q(".s10-bd"), { rotation: -70, svgOrigin: "72 -210", duration: 0.2, yoyo: true, repeat: 3 }, CARGA - 0.2);
      [0, 1, 2, 3, 4].forEach((k) => tl.fromTo(q(".s10-cj" + k), { opacity: 0, x: 300 - k * 40, y: -120 }, { opacity: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" }, CARGA - 0.35 + k * 0.1));
      tl.to(qa(".s10-cam, .s10-cj0, .s10-cj1, .s10-cj2, .s10-cj3, .s10-cj4"), { y: -6, duration: 0.08, yoyo: true, repeat: 3 }, CAMION + 0.1);
      tl.to(qa(".s10-cam, .s10-cj0, .s10-cj1, .s10-cj2, .s10-cj3, .s10-cj4"), { x: "-=40", duration: 0.5, ease: "power2.in" }, CAMION + 0.4);
      etq(1, JUE);
      etq(2, CARGA);`,
  sfx: (W) => [{ t: W(152), sfx: "click", vol: 0.25 }, { t: W(157) - 0.3, sfx: "pop", vol: 0.2 }, { t: W(157), sfx: "pop", vol: 0.2 }, { t: W(159) + 0.1, sfx: "impact-bass-1", vol: 0.22, max: 0.5 }],
}));

// s11-scalerics: Hugo y su agente de IA, el mismo equipo
escena("s11-scalerics", () => ({
  svg: `
        <g class="s11-marca"><text class="lex t-cr" x="540" y="690" font-size="64" text-anchor="middle" letter-spacing="2">Scalerics</text></g>
        <g class="s11-hugo" transform="translate(370 1150)">${hugo("s11")}</g>
        <g class="s11-ag" transform="translate(710 1150)">${agente("s11")}</g>
        <path class="ln-ac s11-llave" d="M240 1180 Q240 1206 266 1206 H514 Q540 1206 540 1230 Q540 1206 566 1206 H814 Q840 1206 840 1180" />`,
  etiquetas: ["Agentes de IA", "Uno más del equipo"],
  js: (W) => `
      const SCAL = ${W(161)}, AGENTES = ${W(163)}, TRABAJAN = ${W(167)}, EQUIPO = ${W(173)};
      pop(q(".s11-hugo-in"), 0, 0.85, 0.35);
      gsap.set(qa(".s11-marca"), { opacity: 0 });
      sube(q(".s11-marca"), SCAL - 0.05, 20);
      tl.fromTo(q(".s11-ag-in"), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, AGENTES - 0.2);
      tl.to(q(".s11-abd"), { rotation: -110, svgOrigin: "66 -130", duration: 0.25, ease: "power2.out" }, AGENTES + 0.3);
      tl.to(q(".s11-abd"), { rotation: -80, svgOrigin: "66 -130", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, AGENTES + 0.55);
      tl.to(q(".s11-abd"), { rotation: 0, svgOrigin: "66 -130", duration: 0.25 }, TRABAJAN + 0.3);
      tl.to(q(".s11-bd"), { rotation: -30, svgOrigin: "72 -210", duration: 0.3 }, TRABAJAN);
      tl.to(q(".s11-hugo-in"), { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, TRABAJAN + 0.4);
      tl.to(q(".s11-ojos"), { scaleY: 0.15, svgOrigin: "0 -241", duration: 0.08, yoyo: true, repeat: 1 }, TRABAJAN + 0.8);
      dibujar([q(".s11-llave")], EQUIPO - 0.25, 0.5);
      punch(q(".s11-marca"), EQUIPO + 0.3, 1.05);
      etq(1, AGENTES);
      etq(2, TRABAJAN);`,
  sfx: (W) => [{ t: W(161), sfx: "chime", vol: 0.25, max: 1 }, { t: W(163) - 0.2, sfx: "pop", vol: 0.22 }, { t: W(173) - 0.2, sfx: "sparkle", vol: 0.25, max: 0.8 }],
}));

// s12-cta: lo de siempre (en verde) y la caja de comentarios
escena("s12-cta", () => ({
  svg: `
        <g class="s12-card"><g class="s12-cin">
          <rect class="ln-ac" x="200" y="610" width="680" height="100" rx="24" />
          <text class="mono t-ac" x="236" y="670" font-size="24">MIÉ</text>
          <path class="ln-ac" d="M330 634 V686" style="stroke-width:4" />
          <text class="lex t-cr" x="358" y="673" font-size="34">2 agua · 3 refresco</text>
          ${tilde(840, 660, "ln-ac", 20, "s12-ok")}
        </g></g>
        <g class="s12-preg">
          <text class="lex t-cr" x="540" y="836" font-size="58" text-anchor="middle">¿Qué te piden</text>
          <text class="lex t-ac" x="540" y="910" font-size="58" text-anchor="middle">todas las semanas?</text>
        </g>
        <g class="s12-box"><rect class="ln" x="150" y="1010" width="780" height="180" rx="34" />
          <text class="mono t-ac" x="190" y="1062" font-size="24">COMENTARIOS</text>
          <path class="ln4 ap" d="M190 1084 H890" />
          <text class="lex t-gr" x="190" y="1146" font-size="34">Lo de siempre es...</text>
          <rect class="crema s12-cur" x="518" y="1112" width="4" height="44" />
        </g>`,
  etiquetas: ["Contanos"],
  js: (W, dur) => `
      const PIDEN = ${W(176)}, SEMANAS = ${W(181)}, CONTANOS = ${W(182)}, COMENT = ${W(185)};
      dibujar(qa(".s12-cin .ln-ac"), 0, 0.45, 0.4);
      tl.fromTo(qa(".s12-cin text"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0.05);
      gsap.set(qa(".s12-ok, .s12-preg, .s12-box"), { opacity: 0 });
      pop(q(".s12-ok"), 0.3, 0.5);
      sube(q(".s12-preg text"), PIDEN - 0.1, 20);
      sube(qa(".s12-preg text")[1], SEMANAS - 0.6, 20);
      tl.to(q(".s12-preg"), { opacity: 1, duration: 0.01 }, PIDEN - 0.1);
      gsap.set(qa(".s12-preg text"), { opacity: 0 });
      tl.fromTo(q(".s12-box"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, CONTANOS - 0.1);
      punch(q(".s12-box"), COMENT + 0.1, 1.03);
      for (let t = CONTANOS + 0.4; t < DUR - 0.6; t += 0.9) tl.to(q(".s12-cur"), { opacity: 0, duration: 0.05, yoyo: true, repeat: 1, repeatDelay: 0.4 }, t);
      tl.to(q(".s12-card"), { y: -8, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, CONTANOS + 0.6);
      tl.to(qa(".s12-preg text")[1], { scale: 1.04, transformOrigin: "50% 50%", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, COMENT + 1.2);
      etq(1, CONTANOS);`,
  sfx: (W) => [{ t: 0.3, sfx: "chime", vol: 0.22, max: 1 }, { t: W(182) - 0.1, sfx: "pop", vol: 0.25 }, { t: W(185) + 0.6, sfx: "key-press", vol: 0.2 }],
}));

// ---------- ambiente: encabezado del modo y del día ----------
const ambiente = () => {
  const AHORA = GL(84);
  const DIAS = [
    [0, "CADA SEMANA", "cr"], [ESC["s03-jueves"].a, "JUE · 18:00", "cr"], [GL(43), "JUE · 23:04", "ro"],
    [ESC["s04-otros"].a, "VIE · REPARTO", "cr"], [GL(62), "SÁB", "ro"], [ESC["s06-memoria"].a, "CADA SEMANA", "cr"],
    [GL(90), "MIÉ · 10:00", "ac"], [GL(152), "JUE · CARGA", "ac"], [ESC["s11-scalerics"].a, "CADA SEMANA", "ac"],
  ];
  const spans = DIAS.map(([, t, c], k) => `<span class="amb-d amb-d${k} amb-${c}">${t}</span>`).join("");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] .amb-mono { position: absolute; top: 128px; height: 34px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.22em; white-space: nowrap; }
    [data-composition-id="ambiente"] .amb-modo { left: 104px; width: 440px; }
    [data-composition-id="ambiente"] .amb-modo span { position: absolute; left: 0; top: 0; }
    [data-composition-id="ambiente"] .amb-sin { color: rgba(239, 238, 229, 0.5); }
    [data-composition-id="ambiente"] .amb-con { color: #5ce611; opacity: 0; }
    [data-composition-id="ambiente"] .amb-punto { position: absolute; left: 72px; top: 137px; width: 14px; height: 14px; border-radius: 50%; }
    [data-composition-id="ambiente"] .amb-p-sin { background: #b8574e; opacity: 0.9; }
    [data-composition-id="ambiente"] .amb-p-con { background: #5ce611; opacity: 0; }
    [data-composition-id="ambiente"] .amb-dia { right: 72px; width: 400px; }
    [data-composition-id="ambiente"] .amb-d { position: absolute; right: 0; top: 0; opacity: 0; }
    [data-composition-id="ambiente"] .amb-cr { color: #efeee5; }
    [data-composition-id="ambiente"] .amb-ro { color: #d27a6e; }
    [data-composition-id="ambiente"] .amb-ac { color: #5ce611; }
    [data-composition-id="ambiente"] .amb-linea { position: absolute; left: 72px; right: 72px; top: 186px; height: 2px; background: rgba(239, 238, 229, 0.12); transform-origin: 0 50%; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-punto amb-p-sin"></div>
      <div class="amb-punto amb-p-con"></div>
      <div class="amb-mono amb-modo"><span class="amb-sin">ESPERANDO PEDIDOS</span><span class="amb-con">CON AGENTE DE IA</span></div>
      <div class="amb-mono amb-dia">${spans}</div>
      <div class="amb-linea"></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      const DIAS = ${JSON.stringify(DIAS.map(([t]) => t))};
      DIAS.forEach((t, k) => {
        const el = q(".amb-d" + k);
        if (k === 0) gsap.set(el, { opacity: 1 });
        else tl.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, t);
        if (k + 1 < DIAS.length) tl.to(el, { opacity: 0, y: -8, duration: 0.18 }, DIAS[k + 1] - 0.12);
      });
      tl.fromTo(q(".amb-linea"), { scaleX: 0.3, opacity: 0.6 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(root.querySelectorAll(".amb-modo, .amb-p-sin"), { opacity: 0.5, y: -4 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      const AHORA = ${AHORA};
      tl.to(q(".amb-sin"), { opacity: 0, y: -10, duration: 0.25 }, AHORA);
      tl.to(q(".amb-p-sin"), { opacity: 0, duration: 0.2 }, AHORA);
      tl.fromTo(q(".amb-con"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, AHORA + 0.28);
      tl.fromTo(q(".amb-p-con"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, AHORA + 0.1);
      tl.to(q(".amb-linea"), { backgroundColor: "rgba(92, 230, 17, 0.35)", duration: 0.4 }, AHORA + 0.1);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync("compositions/ambiente.html", html);
};

ambiente();
for (const [id, f] of Object.entries(ESCENAS)) {
  if (SOLO && !id.startsWith(SOLO)) continue;
  escribir(id, f());
}
console.log("escenas:", Object.keys(ESCENAS).filter((id) => !SOLO || id.startsWith(SOLO)).join(", "));
