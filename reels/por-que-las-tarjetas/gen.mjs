// Generador de las escenas HTML de reels/por-que-las-tarjetas (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-devolver-gratis, sobre fondo NAVY OSCURO #0b1220 liso: placas crema con texto navy y borde verde,
// líneas guía crema. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena Three.js); estas escenas
// son SOLO la capa plana de arriba: el gancho en grande, 1-2 rótulos con línea guía, los créditos de los estudios y la
// tarjeta de cierre. Los tiempos de las acciones 3D se calculan con las mismas fórmulas que tres.js (ver T.*).
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
const Wg = (i) => r2(pal[i].start); // tiempo global de la palabra i
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);
const rel = (id, tg) => r2(tg - INI[id]);
const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";

// ---------- los mismos tiempos clave que tres.js ----------
const T = {
  mejor: Wg(3), autos: Wg(6), s02: INI["s02-tarjetas"], mandaba: Wg(8), tarjetas: Wg(9), compraron: Wg(15),
  s03: INI["s03-volvian"], volvian: Wg(17), joe: Wg(20),
  s04: INI["s04-record"], guinness: Wg(23), anio: Wg(29),
  s05: INI["s05-por-que"], que: r2(Wg(31) + 0.05),
  s06: INI["s06-nada"], tarjeta: Wg(33), vendia: Wg(35), nada: Wg(36),
  s07: INI["s07-me-caes"], decia: Wg(37), cada: Wg(38), bien: Wg(42),
  s08: INI["s08-convencer"], compro: Wg(47), convencerlo: Wg(51),
  s09: INI["s09-acordarse"], acordarse: Wg(54),
  s10: INI["s10-ruben"], walter: Wg(55), hace: Wg(56), viene: Wg(60),
  s11: INI["s11-sistema"], sistema: Wg(62), semanas: Wg(65),
  s12: INI["s12-escribe"], escribe: Wg(68), sin: Wg(70), vender: Wg(71),
  s13: INI["s13-volvio"], sabado: Wg(74), walter2: Wg(75), volvio: Wg(76),
  s14: INI["s14-ninguno"], ninguno: Wg(82), agenda: Wg(83),
  fin: INI["s15-llamada"], scalerics: Wg(88),
};
T.sobres = [T.mandaba, T.tarjetas + 0.05, T.tarjetas + 0.4];
T.q0 = T.s05 - 0.25; T.corte = T.s09 + 0.42; T.aterriza = T.corte + 0.42; T.contra = T.s11 - 0.5;
T.vuelaW = T.escribe + 0.02; T.corteW = T.vuelaW + 0.36; T.llegaW = T.corteW + 0.34; T.caraW = T.vender + 0.32;
T.mateR = T.s13 - 0.55; T.hoy = T.volvio - 0.05;

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;

// ---------- CSS común (sobre navy oscuro: placas crema con texto navy y borde verde; líneas guía crema) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${CR}; font: 700 48px/1.05 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.35); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.malo { border-color: ${RED}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .dot { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; opacity: 0; }
`;

// ---------- JS común ----------
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
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 16px; bottom: 0px; background: ${G}; border-radius: 16px; border: 6px solid ${NAVY}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; -webkit-text-stroke: 0; }`;
const cred = (k, x, y, txt, sub = "") => `<div class="cred n${k}" style="left:${x}px;top:${y}px">${txt}${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const CSS_CRED = `P .cred { position: absolute; transform: translate(-50%, -50%); padding: 14px 34px 16px; border-radius: 22px; background: ${NAVY}; border: 5px solid ${G}; font: 600 44px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; }
    P .cred .sub { display: block; margin-top: 8px; font: 500 40px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${G}; }`;
// tramos sin logo (insertos del celular; la tarjeta abierta abajo): los lee armar.mjs (assets/firma.json)
const FIRMA = [[INI["s06-nada"], INI["s07-me-caes"]], [r2(T.s11), r2(T.caraW)], [r2(T.hoy), INI["s15-llamada"]]];

// posiciones en pantalla de los rótulos y créditos (medidas sobre los cuadros del 3D)
const POS = {
  credMejor: [540, 1640], comprado: [330, 1480], compradoLead: [400, 1420, 820, 990],
  credVolvian: [540, 1640],
  credRecord: [540, 1660], anio: [540, 555], anioLead: [540, 0, 0, 0],
  credFecha: [540, 1690], niPrecio: [540, 1700], niPrecioLead: [540, 1645, 540, 1545],
  credMes: [540, 1690],
  cliente: [690, 1560], clienteLead: [690, 1505, 820, 1200],
  papelito: [420, 1640], papelitoLead: [330, 1585, 230, 920],
  avisa: [540, 1690], avisaLead: [540, 1635, 540, 1500],
  sinOferta: [540, 1690], sinOfertaLead: [540, 1635, 540, 1480],
};
const L = (k, P, Q, kind = "") => leads(lead(k, Q[0], Q[1], Q[2], Q[3], kind));

// ---------- el gancho (cuadro 0 = portada en movimiento): se queda en s01 y s02 ----------
const CSS_GANCHO = `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 112px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; -webkit-text-stroke: 18px ${NAVY}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 96px; font-size: 118px; } P .h2 { top: 222px; font-size: 112px; } P .h3 { top: 372px; font-size: 88px; } P .h4 { top: 478px; font-size: 104px; } P .h5 { top: 594px; font-size: 104px; }
    P .verde { color: ${G}; }`;
const GANCHO = `
      <div class="h h1">¿Por qué el</div>
      <div class="h h2">${marca("mejor vendedor")}</div>
      <div class="h h3">de autos les mandaba</div>
      <div class="h h4"><span class="verde">tarjetas</span> a los que</div>
      <div class="h h5">ya le compraron?</div>`;

// ================= s01 · gancho: el auto VENDIDO de noche y el buzón =================
{
  const id = "s01-gancho";
  escena(id, {
    css: CSS_GANCHO,
    html: GANCHO,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h2 .mk", ${w(id, 3)}, 1.08);`,
    sfx: [
      { t: w(id, 3) - 0.02, sfx: "pop", vol: 0.1 },
      { t: w(id, 6) + 0.42, sfx: "tic-real", vol: 0.05 }, { t: w(id, 6) + 0.64, sfx: "tic-real", vol: 0.045 },
    ],
  });
}

// ================= s02 · los sobres entran al buzón; el auto ya vendido atrás =================
{
  const id = "s02-tarjetas";
  const [x, y] = POS.comprado;
  escena(id, {
    css: CSS_GANCHO + CSS_CRED,
    html: `${GANCHO}${cred(1, POS.credMejor[0], POS.credMejor[1], "El mejor vendedor:", "así lo nombró Guinness")}${L(2, POS.comprado, POS.compradoLead)}${pill(2, x, y, "Ya le había comprado")}`,
    js: `
      late(".h4 .verde", ${w(id, 9)}, 1.12);
      nota(1, 0.15); fuera([1], ${rel(id, T.compraron - 0.45)});
      nota(2, ${rel(id, T.compraron - 0.35)});
      tl.to(qa(".h"), { opacity: 0, duration: 0.18, ease: "power1.in" }, ${r2(ESC[id] - 0.22)});
      fuera([2], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-short", vol: 0.008 },
      ...T.sobres.map((ts, j) => ({ t: rel(id, ts - 0.25), sfx: "whoosh-short", vol: 0.018 + j * 0.004 })),
      ...T.sobres.map((ts) => ({ t: rel(id, ts + 0.14), sfx: "tac-real", vol: 0.04 })),
      { t: rel(id, T.sobres[0] + 0.3), sfx: "pop", vol: 0.07 },
      { t: rel(id, T.compraron - 0.15), sfx: "whoosh-short", vol: 0.04 },
    ],
  });
}

// ================= s03 · porque volvían: la calle, los autos vuelven a la concesionaria =================
{
  const id = "s03-volvian";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credVolvian[0], POS.credVolvian[1], "Según él:", "gran parte de sus ventas,<br>clientes que volvían")}`,
    js: `nota(1, ${rel(id, T.volvian + 0.35)}); fuera([1], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cinematic", vol: 0.05, max: 0.7 },
      { t: rel(id, T.volvian + 0.75), sfx: "whoosh-short", vol: 0.03 },
      { t: rel(id, T.volvian + 0.75), sfx: "tic", vol: 0.15 },
      // los autos arrancan y salen en fila (motor real CC0, ver fuentes.md)
      { t: rel(id, pal[17].end + 0.4), sfx: "motor", vol: 0.2, max: r2(INI["s04-record"] - 0.08 - pal[17].end - 0.4) },
      { t: rel(id, pal[17].end + 0.8), sfx: "motor", vol: 0.1, max: r2(INI["s04-record"] - 0.08 - pal[17].end - 0.8) },
    ],
  });
}

// ================= s04 · récord Guinness: el estacionamiento, "1.425" y "1973" =================
{
  const id = "s04-record";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credRecord[0], POS.credRecord[1], "Récord Guinness: autos en un año", "la categoría se retiró en 2018")}`,
    js: `nota(1, ${rel(id, T.guinness + 0.35)}); fuera([1], ${rel(id, T.anio + 0.12)});`,
    sfx: [
      { t: -0.2, sfx: "whoosh", vol: 0.02, max: 0.35 },
      ...[0, 1, 2, 3, 4, 5].map((j) => ({ t: 0.3 + j * 0.12, sfx: "pop", vol: 0.03 + j * 0.004 })),
      { t: rel(id, T.guinness - 0.05), sfx: "impact-bass-1", vol: 0.2, max: 0.6 },
      { t: rel(id, T.anio - 0.03), sfx: "ding", vol: 0.035, max: 0.6 },
      { t: rel(id, T.anio + 0.3), sfx: "whoosh-cine-corto", vol: 0.2, max: 0.6 },
    ],
  });
}

// ================= s05 · ¿Por qué? (el sobre solo suelta el "?") =================
vacia("s05-por-que", [
  { t: rel("s05-por-que", T.que) - 0.06, sfx: "papel", vol: 0.04, max: 0.4 },
  { t: rel("s05-por-que", T.que) - 0.04, sfx: "impact-bass-1", vol: 0.045, max: 0.6 },
  { t: rel("s05-por-que", T.que) + 0.05, sfx: "pop", vol: 0.05 },
]);

// ================= s06 · la tarjeta no vendía nada ($ y OFERTA se caen) =================
{
  const id = "s06-nada";
  const [x, y] = POS.niPrecio;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credFecha[0], POS.credFecha[1], "Cambiaba el dibujo según la fecha.", "El texto, nunca.")}${L(2, POS.niPrecio, POS.niPrecioLead)}${pill(2, x, y, "Ni un precio", "lleno")}`,
    js: `nota(1, 0.05); fuera([1], ${rel(id, T.nada - 0.2)}); nota(2, ${rel(id, T.nada - 0.05)}); fuera([2], ${r2(ESC[id] - 0.06)});`,
    sfx: [
      { t: 0.02, sfx: "hoja", vol: 0.3, max: 0.5 },
      { t: rel(id, T.vendia - 0.1), sfx: "pop", vol: 0.12 }, { t: rel(id, T.vendia), sfx: "pop", vol: 0.12 },
      { t: rel(id, T.nada + 0.05), sfx: "whoosh-short", vol: 0.05 },
      { t: rel(id, T.nada + 0.38), sfx: "golpe", vol: 0.08, max: 0.3 },
    ],
  });
}

// ================= s07 · decía, cada mes: «Me caés bien» (se abre; el abanico) =================
{
  const id = "s07-me-caes";
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credMes[0], POS.credMes[1], "Una por mes, a cada cliente", "según contaba, unas 13.000 por mes")}`,
    js: `nota(1, ${rel(id, T.cada + 0.3)}); fuera([1], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: rel(id, T.decia), sfx: "hoja", vol: 0.2, max: 0.5 },
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.cada + j * 0.12), sfx: "hoja", vol: 0.18, max: 0.3 })),
      // el almanaque que pasa los meses
      ...[0.4, 0.8].map((d) => ({ t: rel(id, T.cada + d), sfx: "hoja", vol: 0.1, max: 0.25 })),
      { t: rel(id, T.bien + 0.1), sfx: "cierra", vol: 0.2, max: 0.4 },
      { t: rel(id, T.bien + 0.15), sfx: "sparkle", vol: 0.04, max: 0.6 },
    ],
  });
}

// ================= s08 · al que ya te compró no hay que convencerlo (el megáfono se apaga) =================
{
  const id = "s08-convencer";
  const [x, y] = POS.cliente;
  escena(id, {
    html: `${L(1, POS.cliente, POS.clienteLead)}${pill(1, x, y, "Ya es tu cliente", "lleno")}`,
    js: `nota(1, ${rel(id, T.compro + 0.25)}); fuera([1], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: 0.05, sfx: "pop", vol: 0.2 },
      { t: rel(id, T.compro), sfx: "ping", vol: 0.08, max: 0.5 },
      { t: rel(id, T.convencerlo - 0.05), sfx: "glitch-1", vol: 0.05, max: 0.3 },
      { t: rel(id, T.convencerlo + 0.7), sfx: "golpe", vol: 0.15, max: 0.35 },
    ],
  });
}

// ================= s09 · hay que acordarse (la tarjeta vuela al mostrador de Rubén) =================
vacia("s09-acordarse", [
  { t: rel("s09-acordarse", T.s09 + 0.05), sfx: "whoosh-cinematic", vol: 0.1, max: 0.8 },
  { t: rel("s09-acordarse", Math.max(T.aterriza, pal[54].end + 0.04)), sfx: "tac-real", vol: 0.2 },
]);

// ================= s10 · Rubén: "¿Walter? ¿Hace cuánto que no viene?" =================
{
  const id = "s10-ruben";
  const [x, y] = POS.papelito;
  escena(id, {
    css: `P .quien { position: absolute; left: 70px; top: 168px; padding: 6px 20px 8px; border-radius: 14px; background: ${NAVY}; font: 600 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${G}; opacity: 0; }`,
    html: `<div class="quien">RUBÉN</div>${L(1, POS.papelito, POS.papelitoLead)}${pill(1, x, y, "Lo que lleva Walter: yerba")}`,
    js: `pop(".quien", 0.0, 0.2); tl.to(q(".quien"), { opacity: 0, duration: 0.12 }, ${rel(id, T.viene + 0.45)}); nota(1, ${rel(id, T.walter + 0.08)}); fuera([1], ${rel(id, T.hace + 0.0)});`,
    sfx: [
      { t: rel(id, T.hace - 0.05), sfx: "burbuja", vol: 0.04 },
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.hace + 0.3 + j * 0.25), sfx: "hoja", vol: 0.06, max: 0.25 })),
      { t: rel(id, T.contra - 0.08), sfx: "whoosh-short", vol: 0.03 },
    ],
  });
}

// ================= s11 · el sistema sabe: tres semanas (la ficha de Walter) =================
{
  const id = "s11-sistema";
  const [x, y] = POS.avisa;
  escena(id, {
    html: `${pill(1, x, y, "Avisa quién dejó de venir", "malo")}`,
    js: `nota(1, ${rel(id, T.semanas - 0.35)}); fuera([1], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.025 },
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.sistema + 0.25 + j * 0.35), sfx: "tic", vol: 0.05 })),
      { t: rel(id, T.semanas + 0.1), sfx: "notification", vol: 0.05, max: 0.45 },
    ],
  });
}

// ================= s12 · y le escribe solo, sin vender nada (el mensaje-tarjeta vuela a Walter) =================
{
  const id = "s12-escribe";
  const [x, y] = POS.sinOferta;
  escena(id, {
    html: `${pill(1, x, y, "Sin oferta. Como la tarjeta", "lleno")}`,
    js: `nota(1, ${rel(id, T.llegaW + 0.05)}); fuera([1], ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: rel(id, T.vuelaW - 0.05), sfx: "whoosh-short", vol: 0.06 },
      { t: rel(id, T.llegaW - 0.02), sfx: "vibra", vol: 0.15, max: 0.5 },
      { t: rel(id, T.llegaW + 0.05), sfx: "notification", vol: 0.1, max: 0.6 },
      // corte al almacén: Rubén con el mate
      { t: rel(id, T.mateR - 0.08), sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.mateR + 0.05), sfx: "pop", vol: 0.04 },
    ],
  });
}

// ================= s13 · el sábado, Walter volvió (campanita; "hoy") =================
vacia("s13-volvio", [
  { t: 0.0, sfx: "campanita", vol: 0.15, max: 1.0 },
  { t: rel("s13-volvio", T.walter2 + 0.1), sfx: "papel", vol: 0.12, max: 0.35 },
  { t: rel("s13-volvio", T.hoy + 0.31), sfx: "ping", vol: 0.15, max: 0.6 },
]);

// ================= s14 · ¿que no se te olvide ninguno? (la lista se pone verde) =================
vacia("s14-ninguno", [
  { t: -0.05, sfx: "whoosh-short", vol: 0.04 },
  ...[0, 1, 2, 3, 4].map((j) => ({ t: 0.35 + j * 0.22, sfx: "pop", vol: 0.04 + j * 0.004 })),
]);

// ================= s15 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s15-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 446px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 646px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; font: 900 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 86) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 88) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.3 },
      { t: 0.3, sfx: "chime", vol: 0.1, max: 0.8 },
      { t: rel(id, pal[88].end + 0.02), sfx: "ding", vol: 0.04, max: r2(Math.max(0.2, ESC[id] - rel(id, pal[88].end + 0.02) - 0.03)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
