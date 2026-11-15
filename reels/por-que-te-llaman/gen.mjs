// Generador de las escenas HTML de reels/por-que-te-llaman (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-el-99, sobre fondo NAVY CLARO #16243d liso (el piso 3D es un reloj gigante con líneas crema):
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
    P .cred .sub { display: block; margin-top: 8px; font: 600 50px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.01em; color: ${G}; }`;
// ---------- los mismos tiempos clave que tres.js ----------
const T = {
  s02: INI["s02-se-enfria"], enfria: Wg(13), rapido: Wg(14),
  s03: INI["s03-que-tan"], rapido2: Wg(17),
  s04: INI["s04-estudio"], estudio: Wg(19), escribio: Wg(21), dos: Wg(25), mil: Wg(26), empresas: Wg(27),
  s05: INI["s05-nunca"], una: Wg(29), cuatro: Wg(32), nunca: Wg(33), contesto: Wg(34),
  s06: INI["s06-dos-dias"], tardaron: Wg(37), promedio: Wg(39), casi: Wg(40), dias: Wg(42),
  s07: INI["s07-primera-hora"], primera: Wg(46), hora: Wg(47),
  s08: INI["s08-el-que-decide"], chances: Wg(50), llegar: Wg(52), decide: Wg(55),
  s09: INI["s09-ruben-compro"], compre: Wg(58), primero: Wg(62),
  s10: INI["s10-ruben-ayer"], consulta10: Wg(65), ayer: Wg(67),
  s11: INI["s11-crm"], anota: Wg(70), avisa: Wg(75), instante: Wg(77),
  s12: INI["s12-escribe-solo"], enfria12: Wg(82), escribe: Wg(84), solo: Wg(85),
  s13: INI["s13-llegar"], primero13: Wg(88), agenda: Wg(89),
  fin: INI["s14-cierre"],
};
T.click = 0.42; T.vibra = r2(Wg(7) - 0.12); T.morph = r2(T.s02 + 0.08); T.frio = T.enfria; T.cae = r2(T.s03 - 0.3); T.pliega = r2(T.s04 - 0.02);
T.bandada = T.dos; T.cartas = [0.05, 0.17, 0.29, 0.41].map((d) => r2(T.s05 + d)); T.banderas = [0.05, 0.2, 0.35].map((d) => r2(T.una + d)); T.rojo = T.nunca;
T.reloj = r2(T.s06 - 0.15); T.gira = [r2(T.tardaron - 0.1), r2(T.casi - 0.15)]; T.doce = r2(T.s07 - 0.05); T.cuna = T.primera;
T.cable = [r2(T.s08 + 0.02), r2(T.s08 + 1.05)]; T.tildes = [0, 0.18, 0.32, 0.44, 0.54, 0.62, 0.7].map((d) => r2(T.chances + d));
T.corta = r2(T.s09 + 0.35); T.insert = r2(T.ayer - 0.08); T.fila1 = T.anota; T.fila2 = T.avisa;
T.termo = r2(T.s12 + 0.1); T.burbuja = r2(T.escribe - 0.05); T.ceba = r2(T.escribe + 0.05); T.resp = r2(T.s13 + 0.5);

// tramos sin logo: los primeros planos de Rubén y de la pantalla (s09-s11) (los lee armar.mjs, assets/firma.json)
const FIRMA = [[T.s09, T.fin]];

// posiciones en pantalla de los rótulos y créditos (medidas sobre los cuadros del 3D)
const POS = {
  mate: [380, 1560], mateLead: [380, 1500, 480, 1250],
  cred: [540, 1640],
  nunca: [700, 1520], nuncaLead: [760, 1460, 860, 1200],
  contestaron: [540, 1560],
  despues: [300, 1650], despuesLead: [330, 1590, 400, 1400],
  decide: [740, 1480], decideLead: [720, 1420, 600, 1240],
  solo: [760, 1500],
};

// ---------- el gancho (cuadro 0 = portada en movimiento) ----------
const CSS_GANCHO = `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 140px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; -webkit-text-stroke: 16px ${NAVY}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 96px; } P .h2 { top: 238px; } P .h3 { top: 380px; font-size: 136px; }
    P .mk .fondo { top: 14px; bottom: 0px; }`;
const GANCHO = `
      <div class="h h1">¿Por qué</div>
      <div class="h h2">te llaman</div>
      <div class="h h3">${marca("enseguida")}?</div>`;

// ================= s01 · gancho: Rubén pide un presupuesto y el celular ya vibra =================
{
  const id = "s01-gancho";
  escena(id, {
    css: CSS_GANCHO,
    html: GANCHO,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${w(id, 8)}, 1.1);
      tl.to(qa(".h"), { opacity: 0, y: -30, duration: 0.2, ease: "power1.in" }, ${r2(ESC[id] - 0.24)});`,
    sfx: [
      { t: T.click, sfx: "click", vol: 0.09 },
      { t: T.vibra, sfx: "vibra", vol: 0.06, max: 1.0 },
      { t: r2(T.vibra + 0.15), sfx: "ring", vol: 0.018, max: 0.8 },
    ],
  });
}

// ================= s02 · porque el interés se enfría rápido =================
{
  const id = "s02-se-enfria";
  escena(id, {
    html: `${L(1, POS.mateLead)}${pill(1, POS.mate[0], POS.mate[1], "pedido de presupuesto")}`,
    js: `nota(1, ${rel(id, T.morph + 0.3)}); fuera([1], ${r2(ESC[id] - 0.24)});`,
    sfx: [
      { t: rel(id, T.morph - 0.05), sfx: "whoosh-cinematic", vol: 0.06, max: 0.7 },
      { t: rel(id, T.morph + 0.3), sfx: "pop", vol: 0.06 },
      ...[0, 0.12, 0.24, 0.36].map((d) => ({ t: rel(id, T.frio + 0.05 + d), sfx: "tic-real", vol: 0.04 })),
    ],
  });
}

// ================= s03 · ¿qué tan rápido? =================
vacia("s03-que-tan", [
  { t: 0.0, sfx: "whoosh-short", vol: 0.04 },
  { t: rel("s03-que-tan", T.cae + 0.3), sfx: "golpe", vol: 0.07, max: 0.35 },
  { t: rel("s03-que-tan", T.cae + 0.34), sfx: "pop", vol: 0.05 },
]);

// ================= s04 · un estudio les escribió a más de dos mil empresas =================
{
  const id = "s04-estudio";
  escena(id, {
    css: `P .credm { position: absolute; transform: translate(-50%, -50%); padding: 12px 30px 14px; border-radius: 18px; background: ${NAVY}; border: 4px solid ${CR}; font: 500 40px/1.1 "IBM Plex Mono", monospace; color: ${CR}; white-space: nowrap; opacity: 0; }`,
    html: `<div class="credm n1" style="left:${POS.cred[0]}px;top:${POS.cred[1]}px">Harvard Business Review · 2011</div>`,
    js: `pop(".n1", 0.1); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: rel(id, T.pliega), sfx: "papel", vol: 0.08, max: 0.4 },
      { t: rel(id, T.pliega + 0.2), sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.estudio + 0.1), sfx: "tac-real", vol: 0.04 },
      { t: rel(id, T.bandada), sfx: "whoosh-short", vol: 0.035 },
      { t: rel(id, T.bandada + 0.1), sfx: "sparkle", vol: 0.04, max: 0.6 },
      { t: rel(id, T.mil + 0.02), sfx: "pop", vol: 0.06 },
    ],
  });
}

// ================= s05 · casi una de cada cuatro nunca contestó =================
{
  const id = "s05-nunca";
  escena(id, {
    html: `${L(1, POS.nuncaLead, "malo")}${pill(1, POS.nunca[0], POS.nunca[1], "23 % · nunca contestó", "malo")}`,
    js: `nota(1, ${rel(id, T.nunca + 0.05)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      ...T.cartas.map((tc) => ({ t: rel(id, tc + 0.3), sfx: "papel", vol: 0.035, max: 0.25 })),
      ...T.banderas.map((tb) => ({ t: rel(id, tb), sfx: "tac-real", vol: 0.08 })),
      { t: rel(id, T.rojo + 0.02), sfx: "tic", vol: 0.025 },
      { t: rel(id, Wg(34) + 0.58), sfx: "golpe", vol: 0.05, max: 0.25 },
    ],
  });
}

// ================= s06 · las demás tardaron, en promedio, casi dos días =================
{
  const id = "s06-dos-dias";
  escena(id, {
    html: `${pill(1, POS.contestaron[0], POS.contestaron[1], "las que contestaron")}`,
    js: `nota(1, ${rel(id, T.promedio)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: rel(id, T.reloj + 0.1), sfx: "pop", vol: 0.05 },
      ...Array.from({ length: 10 }, (_, i) => ({ t: rel(id, T.gira[0] + 0.05 + i * 0.13), sfx: "tic-real", vol: 0.03, max: 0.12 })),
      { t: rel(id, T.casi + 0.02), sfx: "pop", vol: 0.05 },
      { t: rel(id, T.gira[1]), sfx: "ding", vol: 0.03, max: 0.45 },
    ],
  });
}

// ================= s07 · llamar en la primera hora =================
vacia("s07-primera-hora", [
  { t: 0.0, sfx: "tac-real", vol: 0.03 },
  { t: rel("s07-primera-hora", T.cuna), sfx: "pop", vol: 0.06 },
  { t: rel("s07-primera-hora", T.cuna + 0.1), sfx: "chime", vol: 0.025, max: 0.5 },
]);

// ================= s08 · multiplicaba las chances de llegar al que decide =================
{
  const id = "s08-el-que-decide";
  escena(id, {
    html: `${pill(1, POS.despues[0], POS.despues[1], "1 hora después", "gris")}${L(2, POS.decideLead)}${pill(2, POS.decide[0], POS.decide[1], "el que decide", "lleno")}`,
    js: `nota(1, ${rel(id, T.cable[0] + 0.15)}); fuera([1], ${rel(id, T.llegar)}); nota(2, ${rel(id, T.llegar)}); fuera([2], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh", vol: 0.045, max: 0.6 },
      ...T.tildes.map((tt, i) => ({ t: rel(id, tt), sfx: "pop", vol: 0.03 + i * 0.004 })),
      { t: rel(id, T.llegar + 0.05), sfx: "pop", vol: 0.04 },
    ],
  });
}

// ================= s09 · Rubén: "Yo le compré al que llamó primero." =================
vacia("s09-ruben-compro", [
  { t: -0.12, sfx: "whoosh-cine-corto", vol: 0.05, max: 0.5 },
  { t: rel("s09-ruben-compro", T.corta), sfx: "ping", vol: 0.04, max: 0.4 },
]);

// ================= s10 · Rubén: "¿Y esta consulta de ayer?" =================
vacia("s10-ruben-ayer", [
  { t: 0.0, sfx: "whoosh-short", vol: 0.03 },
  { t: rel("s10-ruben-ayer", T.insert - 0.1), sfx: "whoosh-short", vol: 0.035 },
  { t: rel("s10-ruben-ayer", T.ayer + 0.05), sfx: "tic", vol: 0.05 },
]);

// ================= s11 · un CRM anota cada consulta y te avisa al instante =================
vacia("s11-crm", [
  { t: -0.3, sfx: "whoosh-cinematic", vol: 0.05, max: 0.6 },
  { t: rel("s11-crm", T.fila1), sfx: "pop", vol: 0.06 },
  { t: rel("s11-crm", T.fila2), sfx: "pop", vol: 0.05 },
  { t: rel("s11-crm", T.fila2 + 0.08), sfx: "notification", vol: 0.04, max: 0.6 },
]);

// ================= s12 · si el cliente se enfría, le escribe solo =================
{
  const id = "s12-escribe-solo";
  escena(id, {
    html: `${pill(1, POS.solo[0], POS.solo[1], "sale solo", "lleno")}`,
    js: `nota(1, ${rel(id, T.solo)}); fuera([1], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh-short", vol: 0.022 },
      { t: rel(id, T.termo + 0.05), sfx: "pop", vol: 0.04 },
      { t: rel(id, T.burbuja + 0.05), sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.burbuja + 0.5), sfx: "notification", vol: 0.04, max: 0.6 },
      { t: rel(id, T.ceba + 0.15), sfx: "burbuja", vol: 0.05, max: 0.6 },
    ],
  });
}

// ================= s13 · ¿querés llegar primero? =================
vacia("s13-llegar", [
  { t: rel("s13-llegar", T.resp), sfx: "pop", vol: 0.05 },
  { t: rel("s13-llegar", T.resp + 0.05), sfx: "notification", vol: 0.03, max: 0.5 },
  { t: rel("s13-llegar", T.fin - 0.5), sfx: "whoosh-short", vol: 0.03 },
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
      { t: -0.14, sfx: "whoosh", vol: 0.08, max: 0.5 }, { t: 0.04, sfx: "pop", vol: 0.07 },
      { t: 0.3, sfx: "chime", vol: 0.04, max: 0.8 },
      { t: rel(id, pal[94].end + 0.06), sfx: "ding", vol: 0.03, max: r2(Math.max(0.2, ESC[id] - rel(id, pal[94].end + 0.02) - 0.03)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
