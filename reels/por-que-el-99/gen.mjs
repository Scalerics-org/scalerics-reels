// Generador de las escenas HTML de reels/por-que-el-99 (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-sacar-numero, sobre fondo NAVY3 #1f3254 liso (el piso 3D es una planilla navy con líneas crema):
// placas crema con texto navy y borde verde, líneas guía crema de 7 px, créditos en placa navy con texto crema. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena
// Three.js); estas escenas son SOLO la capa plana de arriba: el gancho en grande, 1-2 rótulos con línea guía, los
// créditos y la tarjeta de cierre. Los tiempos de las acciones 3D se calculan con las mismas fórmulas que tres.js (T.*).
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.12);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const Wg = (i) => r2(pal[i].start);
const w = (id, i) => r2(pal[i].start - INI[id]);
const rel = (id, tg) => r2(tg - INI[id]);
const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const L = (k, Q, kind = "") => leads(lead(k, Q[0], Q[1], Q[2], Q[3], kind));

// ---------- CSS común (sobre navy: placas crema con texto navy y borde verde; líneas guía crema) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${CR}; font: 800 52px/1.05 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.45); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.malo { border-color: ${RED}; background: ${RED}; color: ${CR}; font-weight: 800; }
    ${P} .pill.gris { border-color: #8e8c80; background: #d9d7c9; color: ${NAVY}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .dot { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; opacity: 0; }
    ${P} .dot.malo { fill: ${RED}; }
`;
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => { const el = typeof s === "string" ? qa(s) : s; tl.set(el, { opacity: 1 }, t); tl.fromTo(el, { scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { scale: 1, duration: d ?? 0.3, ease: "back.out(1.8)", immediateRender: false }, t); };
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t + 0.2, 0.2); } pop(".n" + k, t); };
      const fuera = (ks, t) => tl.to(qa(ks.map((k) => ".n" + k + ", .l" + k + ", .d" + k).join(", ")), { opacity: 0, duration: 0.1, ease: "power1.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
`;
function escena(id, { css = "", html, js, sfx }) {
  const dur = ESC[id];
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELP}
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map((s) => ({ ...s, t: r2(s.t) }))));
}
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });
const marca = (txt) => `<span class="mk"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 24px; margin: 0 4px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 18px; bottom: 2px; background: ${G}; border-radius: 18px; border: 7px solid ${NAVY}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; -webkit-text-stroke: 0; }`;
const cred = (k, x, y, txt, sub = "") => `<div class="cred n${k}" style="left:${x}px;top:${y}px">${txt}${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const CSS_CRED = `P .cred { position: absolute; transform: translate(-50%, -50%); padding: 14px 34px 16px; border-radius: 22px; background: ${NAVY}; border: 5px solid ${CR}; font: 700 46px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; box-shadow: 0 8px 0 rgba(11,18,32,0.35); }
    P .cred .sub { display: block; margin-top: 8px; font: 500 40px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.01em; color: ${G}; }`;
// ---------- los mismos tiempos clave que tres.js ----------
const T = {
  noventa: Wg(6), nueve: Wg(8), s02: INI["s02-primer-numero"], primer: Wg(11), numero: Wg(12), pesa: Wg(13),
  s03: INI["s03-cien"], parece: Wg(18), menos: Wg(19), cien: Wg(21),
  s04: INI["s04-cajero"], cajero: Wg(24), vuelto: Wg(27), no: Wg(28), probado: Wg(30),
  s05: INI["s05-catalogo"], midio: Wg(35), mismo: Wg(37), vestido: Wg(38),
  s06: INI["s06-tres-precios"], t34: Wg(40), t39: Wg(45),
  s07: INI["s07-vendio-mas"], caro: Wg(49), yv: Wg(50), vendio: Wg(51),
  s08: INI["s08-oferta"], nueve8: Wg(54), oferta: Wg(57),
  s09: INI["s09-redondo"], gana: Wg(60), redondo: Wg(62),
  s10: INI["s10-ruben"], vendio10: Wg(68),
  s11: INI["s11-reporte"], automatico: Wg(72), precio: Wg(76),
  s12: INI["s12-medimos"], tuyos: Wg(81), agenda: Wg(82),
  fin: INI["s13-cierre"],
};
T.teclas = [0.95, 1.3, 1.65]; T.enter = 2.0; T.sale999 = 2.2;
T.cae100 = T.menos; T.abreCajon = r2(T.cajero + 0.05); T.monedas = r2(T.vuelto - 0.05); T.sella = r2(Wg(31) - 0.42);
T.abreLib = r2(T.s05 - 0.3); T.vestido1 = r2(T.midio - 0.1); T.triple = T.mismo;
T.etq = [T.t34, T.t39, r2(T.t39 + 0.45)]; T.cajas = [r2(T.s06 + 0.15), r2(T.s06 + 0.55), r2(T.s06 + 0.95)];
T.cuarta = r2(T.vendio + 0.05); T.gira = r2(T.oferta + 0.1); T.ofertaVuela = r2(T.s09 + 0.05); T.choque = r2(T.gana + 0.05);
T.subeCam = r2(pal[62].start + 0.33); T.corteO = r2(pal[62].start + 0.62);
T.levanta = r2(T.s11 + 0.15); T.filas = [r2(T.automatico + 0.05), T.precio]; T.baja = r2(T.s12 + 0.1); T.brinda = r2(T.s12 + 0.55);

// tramos sin logo (insertos del celular y primeros planos): los lee armar.mjs (assets/firma.json)
const FIRMA = [[r2(T.s11 + 0.3), r2(T.s12 + 0.3)]];

// posiciones en pantalla de los rótulos y créditos (medidas sobre los cuadros del 3D)
const POS = {
  primero: [300, 1520], primeroLead: [300, 1460, 330, 1290],
  peso: [540, 1600],
  credTM: [540, 540],
  cajero: [540, 1620],
  credAS: [540, 1660],
  vendio: [540, 1300],
  tres: [340, 560], tresLead1: [262, 602, 180, 738], tresLead2: [418, 602, 500, 738],
  credWZ: [540, 1640],
};

// ---------- el gancho (cuadro 0 = portada en movimiento) ----------
const CSS_GANCHO = `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 128px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; -webkit-text-stroke: 16px ${NAVY}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 96px; font-size: 132px; } P .h2 { top: 236px; font-size: 118px; } P .h3 { top: 366px; font-size: 150px; }
    P .mk .fondo { top: 14px; bottom: 0px; }`;
const GANCHO = `
      <div class="h h1">¿Por qué los</div>
      <div class="h h2">precios terminan</div>
      <div class="h h3">en ${marca("99")}?</div>`;

// ================= s01 · gancho: Rubén cambia el aceite de $ 1.000 a $ 999 =================
{
  const id = "s01-gancho";
  escena(id, {
    css: CSS_GANCHO,
    html: GANCHO,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${w(id, 6)}, 1.1);
      tl.to(qa(".h"), { opacity: 0, y: -30, duration: 0.2, ease: "power1.in" }, ${r2(ESC[id] - 0.24)});`,
    sfx: [
      { t: 0.0, sfx: "click-soft", vol: 0.06 },
      ...T.teclas.map((tk) => ({ t: tk - 0.02, sfx: "key-press", vol: 0.12, max: 0.25 })),
      { t: T.enter, sfx: "click", vol: 0.08 },
      { t: T.sale999, sfx: "whoosh-cinematic", vol: 0.05, max: 0.8 },
    ],
  });
}

// ================= s02 · porque el primer número pesa más =================
{
  const id = "s02-primer-numero";
  escena(id, {
    html: `${L(1, POS.primeroLead)}${pill(1, POS.primero[0], POS.primero[1], "no llega a mil", "lleno")}`,
    js: `nota(1, ${rel(id, T.primer + 0.02)}); fuera([1], ${r2(ESC[id] - 0.14)});`, // ronda 1: más tiempo en pantalla (piso de lectura de 4 palabras)
    sfx: [
      { t: 0.0, sfx: "tac-real", vol: 0.1 },
      { t: rel(id, T.primer + 0.05), sfx: "pop", vol: 0.06 },
      { t: rel(id, T.pesa), sfx: "golpe", vol: 0.08, max: 0.3 },
    ],
  });
}

// ================= s03 · 99 parece menos que 100 =================
{
  const id = "s03-cien";
  escena(id, {
    css: CSS_CRED,
    html: `${pill(1, POS.peso[0], POS.peso[1], "1 peso de diferencia")}${cred(2, POS.credTM[0], POS.credTM[1], "Thomas y Morwitz · 2005")}`,
    js: `nota(2, 0.12); fuera([2], ${r2(ESC[id] - 0.12)}); nota(1, ${rel(id, T.parece)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.05 }, { t: 0.1, sfx: "pop", vol: 0.04 },
      { t: rel(id, T.cae100 + 0.2), sfx: "golpe", vol: 0.12, max: 0.35 },
      { t: rel(id, T.cae100 + 0.05), sfx: "tic", vol: 0.06 },
    ],
  });
}

// ================= s04 · ¿lo del cajero y el vuelto? No está probado =================
{
  const id = "s04-cajero";
  escena(id, {
    html: `${pill(1, POS.cajero[0], POS.cajero[1], "la historia del cajero")}`,
    js: `nota(1, 0.25); fuera([1], ${rel(id, T.no - 0.05)});`,
    sfx: [
      { t: 0.05, sfx: "pop", vol: 0.06 },
      { t: rel(id, T.abreCajon - 0.15), sfx: "ding", vol: 0.12, max: 0.6 },
      { t: rel(id, T.abreCajon + 0.12), sfx: "tac-real", vol: 0.14 },
      { t: rel(id, T.monedas + 0.03), sfx: "tic-real", vol: 0.04 },
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.monedas + 0.4 + j * 0.07), sfx: "tic-real", vol: 0.05 })),
      { t: rel(id, T.sella - 0.02), sfx: "sello", vol: 0.05, max: 0.4 },
    ],
  });
}

// ================= s05 · lo que sí se midió: el mismo vestido =================
{
  const id = "s05-catalogo";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credAS[0], POS.credAS[1], "Anderson y Simester · 2003", "catálogo de ropa")}`,
    js: `nota(1, ${rel(id, T.midio)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: rel(id, T.abreLib), sfx: "papel-fuerte", vol: 0.12, max: 0.5 },
      { t: rel(id, T.vestido1), sfx: "pop", vol: 0.06 },
      { t: rel(id, T.triple), sfx: "pop", vol: 0.05 }, { t: rel(id, T.triple + 0.12), sfx: "pop", vol: 0.05 },
    ],
  });
}

// ================= s06 · a 34 y a 39 =================
vacia("s06-tres-precios", [
  ...T.etq.map((te) => ({ t: rel("s06-tres-precios", te), sfx: "pop", vol: 0.06 })),
  ...T.cajas.map((tc) => ({ t: rel("s06-tres-precios", tc + 0.18), sfx: "tac-real", vol: 0.06 })),
]);

// ================= s07 · más caro… y vendió más =================
{
  const id = "s07-vendio-mas";
  escena(id, {
    html: `${pill(1, POS.vendio[0], POS.vendio[1], "vendió más", "lleno")}`,
    js: `nota(1, ${rel(id, T.vendio + 0.1)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.caro + 0.05), sfx: "whoosh-short", vol: 0.07, max: 0.4 },
      { t: rel(id, T.cuarta + 0.15), sfx: "tac-real", vol: 0.14 },
      { t: rel(id, T.cuarta + 0.12), sfx: "impact-bass-1", vol: 0.016, max: 0.45 },
      { t: rel(id, T.cuarta + 0.2), sfx: "ding", vol: 0.02, max: 0.35 },
    ],
  });
}

// ================= s08 · el nueve suena a oferta =================
{
  const id = "s08-oferta";
  escena(id, {
    html: `${leads(lead(1, ...POS.tresLead1), lead(2, ...POS.tresLead2))}${pill(1, POS.tres[0], POS.tres[1], "mismo 3")}`,
    js: `dibujar(".l1, .l2", 0.04, 0.24); pop(".d1, .d2", 0.2, 0.2); pop(".n1", 0.16); fuera([1, 2], ${rel(id, T.gira - 0.05)});`,
    sfx: [
      { t: 0.1, sfx: "pop", vol: 0.05 },
      { t: rel(id, T.gira), sfx: "whoosh-short", vol: 0.035 },
      { t: rel(id, T.gira + 0.3), sfx: "sparkle", vol: 0.05, max: 0.6 },
    ],
  });
}

// ================= s09 · a veces gana el redondo =================
{
  const id = "s09-redondo";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credWZ[0], POS.credWZ[1], "Wadhwa y Zhang · 2015", "compras por gusto")}`,
    js: `nota(1, 0.06); fuera([1], ${rel(id, T.subeCam + 0.12)});`,
    sfx: [
      { t: rel(id, T.ofertaVuela + 0.1), sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.choque), sfx: "tic-real", vol: 0.1 },
      { t: rel(id, T.redondo + 0.05), sfx: "pop", vol: 0.06 },
      { t: rel(id, pal[62].end + 0.03), sfx: "whoosh-cine-corto", vol: 0.06, max: 0.5 },
    ],
  });
}

// ================= s10 · Rubén: "¿Y mi noventa y nueve vendió más?" =================
vacia("s10-ruben", [
  { t: 0.05, sfx: "click-soft", vol: 0.05 },
]);

// ================= s11 · un reporte automático le dice qué precio vende más =================
vacia("s11-reporte", [
  { t: -0.08, sfx: "vibra", vol: 0.1, max: 0.4 },
  { t: rel("s11-reporte", T.levanta + 0.05), sfx: "whoosh-short", vol: 0.03 },
  { t: rel("s11-reporte", T.filas[0]), sfx: "notification", vol: 0.06, max: 0.6 },
  { t: rel("s11-reporte", T.filas[1] + 0.05), sfx: "pop", vol: 0.05 },
  { t: rel("s11-reporte", T.filas[1] + 0.25), sfx: "chime", vol: 0.015, max: 0.4 },
]);

// ================= s12 · ¿medimos los tuyos? =================
vacia("s12-medimos", [
  { t: -0.2, sfx: "whoosh-short", vol: 0.03 },
  { t: rel("s12-medimos", T.baja + 0.02), sfx: "whoosh-short", vol: 0.03, max: 0.35 },
  { t: rel("s12-medimos", T.baja + 0.36), sfx: "click-soft", vol: 0.04 },
  { t: rel("s12-medimos", pal[81].end + 0.02), sfx: "tic-real", vol: 0.03 },
]);

// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-cierre";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 250px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 396px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 596px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; font: 900 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 85) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 87) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh", vol: 0.08, max: 0.5 }, { t: 0.04, sfx: "pop", vol: 0.07 },
      { t: 0.3, sfx: "chime", vol: 0.04, max: 0.8 },
      { t: rel(id, pal[87].end + 0.06), sfx: "ding", vol: 0.03, max: r2(Math.max(0.2, ESC[id] - rel(id, pal[87].end + 0.02) - 0.03)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
