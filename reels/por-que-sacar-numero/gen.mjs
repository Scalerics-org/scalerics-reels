// Generador de las escenas HTML de reels/por-que-sacar-numero (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-las-tarjetas, sobre fondo CREMA #efeee5 liso: placas navy con texto crema y borde verde, líneas
// guía navy de 7 px, créditos en mono navy. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena
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

// ---------- los mismos tiempos clave que tres.js ----------
const T = {
  sacar: Wg(7), numero: Wg(8), s02: INI["s02-nadie-te-pase"], despues: Wg(14), pase: Wg(16),
  s03: INI["s03-por-que"], que: Wg(18), s04: INI["s04-bici"], mit: Wg(22), bici: Wg(27),
  s05: INI["s05-se-la-llevaban"], llegaron: Wg(30), llevaban: Wg(33), antes: Wg(36),
  s06: INI["s06-anos"], anios: Wg(38), filas: Wg(40), escribio: r2(Wg(40) + 0.1),
  s07: INI["s07-balanza"], pasen: Wg(43), muchas: Wg(44), pesa: Wg(46), esperar: Wg(49),
  s08: INI["s08-almacen"], fila: Wg(55), nosv: Wg(56),
  s09: INI["s09-graciela"], pidio: Wg(60), wapp: Wg(62),
  s10: INI["s10-walter"], vino: Wg(64), despues2: Wg(65), fue: Wg(68),
  s11: INI["s11-ruben"], vos: Wg(71), antes2: Wg(73),
  s12: INI["s12-sistema"], sistema: Wg(76), cada: Wg(77), saca: Wg(79), solo: Wg(81),
  s13: INI["s13-primera"], primera: Wg(83), ordenamos: Wg(84), agenda: Wg(89),
  fin: INI["s14-cierre"], scalerics: Wg(94),
};
T.tira = T.sacar + 0.05; T.vuela = T.s02 - 0.35; T.llega = T.s02 + 0.35; T.cuela = T.despues - 0.1; T.choca = T.cuela + 0.38;
T.tapaQ = T.s04 - 0.22; T.bicis = [T.llegaron - 0.15, T.llegaron + 0.45, T.llevaban + 0.15];
T.revAbre = T.escribio + 0.05; T.corteRev = T.s07 - 0.12; T.burbV = T.wapp + 0.2; T.vibra = T.s10 + 0.25;
T.daVuelta = T.s11 + 0.05; T.tablet = T.s12 + 0.35; T.tickets = [T.cada - 0.05, T.cada + 0.35, T.saca + 0.1]; T.entrega = T.primera + 0.35;

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const L = (k, Q, kind = "") => leads(lead(k, Q[0], Q[1], Q[2], Q[3], kind));

// ---------- CSS común (sobre crema: placas navy con texto crema y borde verde; líneas guía navy) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${NAVY}; font: 700 50px/1.05 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.25); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.malo { border-color: ${RED}; background: ${RED}; color: ${CR}; font-weight: 800; }
    ${P} .pill.gris { border-color: #8e8c80; background: #d9d7c9; color: ${NAVY}; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
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
const CSS_CRED = `P .cred { position: absolute; transform: translate(-50%, -50%); padding: 14px 34px 16px; border-radius: 22px; background: #ffffff; border: 5px solid ${NAVY}; font: 700 48px/1.1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; text-align: center; box-shadow: 0 8px 0 rgba(11,18,32,0.2); }
    P .cred .sub { display: block; margin-top: 8px; font: 500 44px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${NAVY2}; }`;
// tramos sin logo (insertos de celular/tablet y primeros planos): los lee armar.mjs (assets/firma.json)
const FIRMA = [[r2(T.s04), r2(T.s06)], [r2(T.s08), r2(T.s10)], [r2(T.s11), r2(T.primera + 0.45)]];

// posiciones en pantalla de los rótulos y créditos (medidas sobre los cuadros del 3D)
const POS = {
  colado: [760, 1520], coladoLead: [800, 1460, 880, 1270],
  credLarson: [540, 1010],
  llegaron: [790, 1330], llegaronLead: [700, 1500, 640, 1250],
  drQueue: [540, 1600],
  esperar: [180, 1125], esperarLead: [180, 1070, 255, 905],
  pasen: [850, 1125], pasenLead: [850, 1070, 845, 1010],
  credPaper: [540, 1660],
  filas: [540, 1330],
  hora: [540, 1780],
  walter: [330, 600], walterLead: [330, 650, 330, 760],
  sinNumero: [540, 1620],
  unaFila: [540, 1250],
};

// ---------- el gancho (cuadro 0 = portada en movimiento) ----------
const CSS_GANCHO = `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 128px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; -webkit-text-stroke: 16px ${CR}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 92px; font-size: 118px; } P .h2 { top: 222px; font-size: 140px; } P .h3 { top: 384px; font-size: 112px; } P .h4 { top: 506px; font-size: 132px; }
    P .verde { color: ${G}; -webkit-text-stroke: 16px ${NAVY}; }`;
const GANCHO = `
      <div class="h h1">¿Por qué en la</div>
      <div class="h h2"><span class="verde">fiambrería</span></div>
      <div class="h h3">te hacen sacar</div>
      <div class="h h4">${marca("número?")}</div>`;

// ================= s01 · gancho: el numerador con el 23; la mano tira del ticket =================
{
  const id = "s01-gancho";
  escena(id, {
    css: CSS_GANCHO,
    html: GANCHO,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h2 .verde", ${w(id, 4)}, 1.08); late(".h4 .mk", ${w(id, 8)}, 1.1);
      tl.to(qa(".h"), { opacity: 0, y: -30, duration: 0.2, ease: "power1.in" }, ${r2(ESC[id] - 0.24)});`,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.05 },
      { t: rel(id, T.tira), sfx: "papel", vol: 0.25, max: 0.35 },
      { t: rel(id, T.tira + 0.1), sfx: "tic-real", vol: 0.06 },
      { t: rel(id, pal[8].end + 0.05), sfx: "whoosh-short", vol: 0.04 },
    ],
  });
}

// ================= s02 · para que nadie que llegó después te pase: la fila y el 31 que rebota =================
{
  const id = "s02-nadie-te-pase";
  const [x, y] = POS.colado;
  escena(id, {
    html: `${L(1, POS.coladoLead, "malo")}${pill(1, x, y, "Llegó después", "malo")}`,
    js: `nota(1, ${rel(id, T.cuela + 0.1)}); fuera([1], ${rel(id, T.pase + 0.1)});`,
    sfx: [
      ...[0, 1, 2, 3].map((j) => ({ t: 0.05 + j * 0.07, sfx: "pop", vol: 0.04 })),
      { t: rel(id, T.llega - 0.05), sfx: "tac-real", vol: 0.12 },
      { t: rel(id, T.cuela - 0.25), sfx: "click-soft", vol: 0.1 },
      { t: rel(id, T.cuela), sfx: "whoosh-short", vol: 0.05 },
      { t: rel(id, T.choca), sfx: "golpe", vol: 0.14, max: 0.35 },
      { t: rel(id, T.pase + 0.0), sfx: "ding", vol: 0.06, max: 0.6 },
    ],
  });
}

// ================= s03 · ¿Por qué? (los dígitos del display se vuelven un "?") =================
vacia("s03-por-que", [
  { t: rel("s03-por-que", pal[18].end + 0.03), sfx: "impact-bass-1", vol: 0.03, max: 0.5 },
  { t: rel("s03-por-que", pal[18].end + 0.05), sfx: "pop", vol: 0.04 },
  { t: rel("s03-por-que", T.tapaQ), sfx: "whoosh-cine-corto", vol: 0.12, max: 0.5 },
]);

// ================= s04 · un profesor del MIT hacía fila por una bici =================
{
  const id = "s04-bici";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credLarson[0], POS.credLarson[1], "Richard Larson · MIT", "le dicen “Dr. Queue”")}`,
    js: `nota(1, ${rel(id, T.mit + 0.1)}); fuera([1], ${r2(ESC[id] - 0.15)});`,
    sfx: [
      { t: rel(id, T.s04 + 0.45), sfx: "pop", vol: 0.08 },
      { t: rel(id, pal[27].end + 0.03), sfx: "ring", vol: 0.02, max: 0.45 },
    ],
  });
}

// ================= s05 · los que llegaron después se la llevaban antes =================
{
  const id = "s05-se-la-llevaban";
  const [x, y] = POS.llegaron;
  escena(id, {
    html: `${pill(1, x, y, "Llegaron después", "malo")}`,
    js: `nota(1, ${rel(id, T.bicis[1] + 0.2)}); fuera([1], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      ...T.bicis.map((tb) => ({ t: rel(id, tb + 0.25), sfx: "whoosh-short", vol: 0.02 })),
      ...T.bicis.map((tb) => ({ t: rel(id, tb + 0.75), sfx: "pop", vol: 0.035 })),
      { t: rel(id, pal[36].end + 0.04), sfx: "golpe", vol: 0.07, max: 0.3 },
    ],
  });
}

// ================= s06 · pasó años estudiando filas. Y escribió: =================
{
  const id = "s06-anos";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.drQueue[0], POS.drQueue[1], "Fila única:", "primero el que llega primero")}`,
    js: `nota(1, ${rel(id, T.anios + 0.1)}); fuera([1], ${rel(id, T.escribio - 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cinematic", vol: 0.05, max: 0.7 },
      ...[0, 1, 2, 3].map((j) => ({ t: 0.4 + j * 0.3, sfx: "tic", vol: 0.04 })),
      { t: rel(id, T.revAbre), sfx: "hoja", vol: 0.25, max: 0.5 },
      { t: rel(id, T.corteRev - 0.15), sfx: "whoosh-short", vol: 0.05 },
    ],
  });
}

// ================= s07 · que te pasen, muchas veces, pesa más que esperar (la balanza) =================
{
  const id = "s07-balanza";
  escena(id, {
    css: CSS_CRED,
    html: `${L(1, POS.esperarLead)}${pill(1, POS.esperar[0], POS.esperar[1], "esperar")}${L(2, POS.pasenLead, "malo")}${pill(2, POS.pasen[0], POS.pasen[1], "que te pasen", "malo")}${cred(3, POS.credPaper[0], POS.credPaper[1], "Larson, 1987", "Operations Research")}`,
    js: `nota(1, 0.2); nota(2, ${rel(id, T.pasen)}); nota(3, ${rel(id, T.muchas)}); fuera([1, 2, 3], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: 0.12, sfx: "pop", vol: 0.08 },
      { t: rel(id, T.pasen - 0.08), sfx: "click", vol: 0.06 },
      { t: rel(id, T.pesa), sfx: "impact-bass-2", vol: 0.12, max: 0.6 },
      { t: rel(id, T.pesa + 0.02), sfx: "tac-real", vol: 0.15 },
    ],
  });
}

// ================= s08 · en lo de Rubén, la fila no se ve =================
{
  const id = "s08-almacen";
  escena(id, {
    html: `${pill(1, POS.filas[0], POS.filas[1], "Tres filas. Ningún número.")}`,
    js: `nota(1, ${rel(id, T.fila + 0.1)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh-short", vol: 0.04 },
      { t: 0.5, sfx: "campanita", vol: 0.06, max: 0.8 },
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.fila + j * 0.12 + 0.1), sfx: "pop", vol: 0.05 })),
    ],
  });
}

// ================= s09 · Graciela pidió por WhatsApp (9:02) =================
{
  const id = "s09-graciela";
  escena(id, {
    html: `${pill(1, POS.hora[0], POS.hora[1], "Graciela · 9:02", "lleno")}`,
    js: `nota(1, ${rel(id, T.pidio)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.1, sfx: "typing", vol: 0.035, max: 0.5 },
      { t: rel(id, pal[62].end + 0.03), sfx: "respuesta", vol: 0.05, max: 0.5 },
      { t: rel(id, pal[62].end + 0.1), sfx: "whoosh-short", vol: 0.03 },
    ],
  });
}

// ================= s10 · Walter vino después y se fue antes =================
{
  const id = "s10-walter";
  const [x, y] = POS.walter;
  escena(id, {
    css: `P .n2 { opacity: 0; }`,
    html: `${L(1, POS.walterLead)}${pill(1, x, y, "Walter · 9:10")}${pill(2, 540, 1630, "Graciela · 9:02 · esperando", "gris")}`,
    js: `nota(1, 0.05); fuera([1], ${rel(id, T.fue + 0.35)}); nota(2, ${rel(id, T.vibra + 0.1)}); fuera([2], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.0, sfx: "campanita", vol: 0.03, max: 0.7 },
      { t: rel(id, T.vibra), sfx: "vibra", vol: 0.12, max: 0.6 },
      { t: rel(id, T.despues2 + 0.25), sfx: "papel", vol: 0.2, max: 0.4 },
      { t: rel(id, T.fue + 0.5), sfx: "puerta", vol: 0.05, max: 0.5 },
    ],
  });
}

// ================= s11 · Rubén: "¿Graciela? ¿Vos estabas antes?" =================
{
  const id = "s11-ruben";
  escena(id, {
    css: `P .quien { position: absolute; left: 70px; top: 470px; padding: 6px 20px 8px; border-radius: 14px; background: ${NAVY}; font: 600 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${G}; opacity: 0; }`,
    html: `<div class="quien">RUBÉN</div>${pill(1, POS.sinNumero[0], POS.sinNumero[1], "Sin número", "malo")}`,
    js: `pop(".quien", 0.0, 0.2); tl.to(q(".quien"), { opacity: 0, duration: 0.12 }, ${r2(ESC[id] - 0.15)}); nota(1, ${rel(id, T.daVuelta + 0.5)}); fuera([1], ${r2(ESC[id] - 0.15)});`,
    sfx: [
      { t: rel(id, T.daVuelta), sfx: "click-soft", vol: 0.1 },
      { t: rel(id, T.daVuelta + 0.5), sfx: "pop", vol: 0.05 },
    ],
  });
}

// ================= s12 · con un sistema, cada pedido saca número solo =================
{
  const id = "s12-sistema";
  escena(id, {
    html: `${pill(1, POS.unaFila[0], POS.unaFila[1], "Una sola fila", "lleno")}`,
    js: `nota(1, ${rel(id, T.tickets[1] + 0.45)}); fuera([1], ${r2(ESC[id] - 0.08)});`,
    sfx: [
      { t: rel(id, T.s12 - 0.15), sfx: "whoosh-short", vol: 0.02 },
      { t: rel(id, T.tablet - 0.1), sfx: "pop", vol: 0.03 },
      { t: rel(id, pal[76].end + 0.02), sfx: "click", vol: 0.08 },
      ...T.tickets.map((tt) => ({ t: rel(id, tt), sfx: "scan", vol: 0.04, max: 0.3 })),
      ...T.tickets.map((tt) => ({ t: rel(id, tt + 0.42), sfx: "pop", vol: 0.05 })),
    ],
  });
}

// ================= s13 · Graciela, primera. ¿Ordenamos la tuya? =================
vacia("s13-primera", [
  { t: rel("s13-primera", T.primera), sfx: "sparkle", vol: 0.06, max: 0.6 },
  { t: rel("s13-primera", T.primera + 0.05), sfx: "ping", vol: 0.12, max: 0.6 },
  { t: rel("s13-primera", T.primera + 0.3), sfx: "whoosh-short", vol: 0.07 },
  { t: rel("s13-primera", T.entrega + 0.3), sfx: "papel", vol: 0.15, max: 0.4 },
]);

// ================= s14 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s14-cierre";
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
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 92) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 94) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh", vol: 0.08, max: 0.5 }, { t: 0.04, sfx: "pop", vol: 0.15 },
      { t: 0.3, sfx: "chime", vol: 0.04, max: 0.8 },
      { t: rel(id, pal[94].end + 0.02), sfx: "ding", vol: 0.04, max: r2(Math.max(0.2, ESC[id] - rel(id, pal[94].end + 0.02) - 0.03)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
