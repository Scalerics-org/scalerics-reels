// Generador de las escenas HTML de reels/por-que-devolver-gratis (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-el-recordatorio, sobre fondo NAVY CLARO #16243d liso: placas crema con texto navy y borde verde,
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
  devolver: Wg(6), gratisG: Wg(7), s02: INI["s02-vuelve"], vuelve: Wg(13),
  s03: INI["s03-estudio"], siguio: Wg(18), dos: Wg(22),
  s04: INI["s04-pagaron"], pagaron: Wg(27), mucho: Wg(31), menos: Wg(32),
  s05: INI["s05-gratis"], mas: Wg(36), antes: Wg(38),
  s06: INI["s06-por-que"], que: Wg(40),
  s07: INI["s07-riesgo"], probar: Wg(43), riesgo: Wg(46), devolver2: Wg(47), achica: Wg(50),
  s08: INI["s08-giro"], masQ: Wg(52), algo: Wg(53), compran: Wg(55),
  s09: INI["s09-ruben"], championes: Wg(60), ysi: Wg(62),
  s10: INI["s10-cambio"], devolucion: Wg(73), gratis10: Wg(74),
  s11: INI["s11-quedaron"], quedaron: Wg(77),
  s12: INI["s12-tu-tienda"], tienda12: Wg(82),
  fin: INI["s13-llamada"],
};
T.v0 = T.s07 + 0.45; T.toque = T.probar + 0.05; T.sella = T.devolver2 + 0.25;
T.pies = T.championes - 0.1; T.nubeR = T.ysi - 0.08;
T.compra = T.devolucion + 0.45; T.pago = T.compra + 0.17; T.paga = T.pago + 0.2;
T.llega = T.s11 - 0.5; T.abre = T.llega + 0.3; T.piesN = T.quedaron - 0.03; T.talon = T.quedaron + 0.5;

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;

// ---------- CSS común (sobre navy claro: placas crema con texto navy y borde verde; líneas guía crema) ----------
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
    P .cred .sub { display: block; margin-top: 8px; font: 500 38px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${G}; }`;
// tramos sin logo (primeros planos de celulares; tarimas de s03-s05; la pila en s08): los lee armar.mjs
const FIRMA = [[r2(T.vuelve), INI["s06-por-que"]], [INI["s07-riesgo"], r2(INI["s08-giro"] + 0.6)]]; // s02 (rótulo abajo) a s05 (tarimas); s07 (créditos abajo) y el inicio de s08

// posiciones en pantalla de los rótulos (medidas sobre los cuadros del 3D)
const POS = {
  adentro: [540, 1700], adentroLead: [540, 1640, 560, 1250],
  vuelve: [540, 1690], vuelveLead: [560, 1635, 640, 1000],
  credEst: [540, 1680], reales: [540, 1690], realesLead: [700, 1635, 760, 1250],
  credPag: [540, 1690], antes: [560, 540], antesLead: [345, 560, 262, 606],
  masAntes: [222, 1120], masAntesLead: [640, 1635, 560, 760],
  credRiesgo: [540, 1830], riesgo: [540, 1830], riesgoLead: [0, 0, 0, 0],
  credRev: [540, 545], algo: [230, 1560], suben: [690, 1640], subenLead: [740, 1585, 740, 1100],
  duda: [372, 1500], dudaLead: [400, 1445, 400, 1300],
  vista: [540, 1790], vistaLead: [540, 1675, 540, 1500],
  sinUsar: [540, 1690], sinUsarLead: [540, 1635, 540, 1150],
};

// ================= s01 · gancho (cuadro 0 = portada): la caja abierta con la etiqueta =================
{
  const id = "s01-gancho";
  const [x, y] = POS.adentro, [a, b, c, d] = POS.adentroLead;
  const tCierra = T.gratisG + 0.42; // las solapas se cierran después de "gratis?" (mismo valor que tres.js)
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 118px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; -webkit-text-stroke: 18px ${NAVY}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 100px; font-size: 122px; } P .h2 { top: 236px; font-size: 100px; } P .h3 { top: 364px; font-size: 136px; } P .h4 { top: 530px; font-size: 136px; }`,
    html: `
      <div class="h h1">¿Por qué las</div>
      <div class="h h2">tiendas te dejan</div>
      <div class="h h3">${marca("devolver")}</div>
      <div class="h h4">${marca("gratis")}?</div>
      ${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Viene adentro de la caja")}`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${w(id, 6)}, 1.1);
      late(".h4 .mk", ${w(id, 7)}, 1.1);
      nota(1, 0.75);
      fuera([1], ${r2(T.gratisG - 0.08)});
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: 0.05, sfx: "papel", vol: 0.25, max: 0.5 },
      { t: 0.75, sfx: "click-soft", vol: 0.15 },
      { t: w(id, 6), sfx: "pop", vol: 0.3 },
      { t: T.gratisG + 0.2, sfx: "papel", vol: 0.12, max: 0.4 },
      // cartón: las solapas (golpecitos sordos) y la cinta, todo en el silencio después de "gratis?" y con el grupo bajo
      ...[0, 1, 2, 3].map((k) => ({ t: tCierra + 0.08 + k * 0.076, sfx: "golpe", vol: 0.05, max: 0.18 })),
      { t: tCierra + 0.4, sfx: "papel-fuerte", vol: 0.07, max: 0.25 },
    ],
  });
}

// ================= s02 · el que devuelve gratis vuelve a comprar (la cinta en U: sale una, vuelven dos) =================
{
  const id = "s02-vuelve";
  const [x, y] = POS.vuelve, [a, b, c, d] = POS.vuelveLead;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Y vuelve a comprar", "lleno")}`,
    js: `nota(1, ${rel(id, T.vuelve + 0.55)}); fuera([1], ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.022, max: 0.6 },
      ...[0, 1, 2].map((k) => ({ t: 0.3 + k * 0.22, sfx: k % 2 ? "tac-real" : "tic-real", vol: 0.08 })),
      { t: rel(id, T.vuelve) - 0.1, sfx: "whoosh-short", vol: 0.022 },
      { t: rel(id, T.vuelve), sfx: "pop", vol: 0.045 }, { t: rel(id, T.vuelve + 0.2), sfx: "pop", vol: 0.04 },
    ],
  });
}

// ================= s03 · un estudio siguió a clientes de dos tiendas online (las columnas, "4 años") =================
{
  const id = "s03-estudio";
  const [x, y] = POS.reales, [a, b, c, d] = POS.realesLead;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credEst[0], POS.credEst[1], "Estudio en dos tiendas online", "publicado en 2012")}${leads(lead(2, a, b, c, d))}${pill(2, x, y, "Compras reales, cliente por cliente")}`,
    js: `nota(1, 0.25); fuera([1], ${rel(id, T.dos + 0.05)}); nota(2, ${rel(id, T.dos + 0.15)}); fuera([2], ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cinematic", vol: 0.07, max: 0.9 },
      // las cajas que todavía caen después del corte (la 5 y la 6 de cada columna): pops bajos, siguiendo la caída
      ...[4, 5].flatMap((kk) => [0, 1].map((i) => ({ t: -0.3 + kk * 0.07 + i * 0.03 + 0.16, sfx: "pop", vol: 0.025 }))),
      { t: 0.62, sfx: "pop", vol: 0.06 },
      { t: rel(id, T.dos), sfx: "click-soft", vol: 0.2 },
    ],
  });
}

// ================= s04 · los que pagaron la devolución compraron mucho menos =================
{
  const id = "s04-pagaron";
  const [x, y] = POS.antes, [a, b, c, d] = POS.antesLead;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credPag[0], POS.credPag[1], "A los 2 años:", "entre 75 % y 100 % menos")}${leads(lead(2, a, b, c, d))}${pill(2, x, y, "Lo que compraban antes")}`,
    js: `nota(2, ${rel(id, Wg(30))}); fuera([2], ${rel(id, T.mucho - 0.12)}); nota(1, ${rel(id, T.mucho - 0.05)}); fuera([1], ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.12, sfx: "pop", vol: 0.3 },
      // monedas: un ping metálico corto y bajo por cada una
      ...[0, 1, 2].map((j) => ({ t: rel(id, T.pagaron + j * 0.15 + 0.3), sfx: "ping", vol: 0.06, max: 0.22 })),
      ...[0, 1, 2, 3, 4].map((k) => ({ t: rel(id, T.mucho + k * 0.12 + 0.05), sfx: "pop", vol: 0.03 })),
      // la columna termina de desarmarse: golpe sordo después de "menos."
      { t: rel(id, Wg(32) + 0.56), sfx: "golpe", vol: 0.22, max: 0.4 },
    ],
  });
}

// ================= s05 · los que no, más que antes =================
{
  const id = "s05-gratis";
  const [x, y] = POS.masAntes, [a, b, c, d] = POS.masAntesLead;
  escena(id, {
    css: `P .n1 { white-space: nowrap; text-align: center; font-size: 40px; line-height: 1.12; padding: 12px 24px 14px; justify-content: center; }`,
    html: `${pill(1, x, y, "Más que antes<br>de devolver", "lleno")}`,
    js: `nota(1, ${rel(id, T.mas - 0.15)}); fuera([1], ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.35 },
      { t: 0.12, sfx: "pop", vol: 0.25 },
      ...[0, 1, 2].map((k) => ({ t: rel(id, T.mas + k * 0.14), sfx: "pop", vol: 0.04 + k * 0.006 })),
      { t: rel(id, T.antes + 0.05), sfx: "ding", vol: 0.05, max: 0.8 },
    ],
  });
}

// ================= s06 · ¿Por qué? (la caja sola suelta el "?") =================
vacia("s06-por-que", [
  { t: -0.18, sfx: "whoosh-cine-corto", vol: 0.35, max: 0.5 },
  { t: w("s06-por-que", 40) - 0.04, sfx: "impact-bass-1", vol: 0.3, max: 0.6 },
  { t: w("s06-por-que", 40), sfx: "pop", vol: 0.35 },
]);

// ================= s07 · comprar sin probar es un riesgo; devolver gratis lo achica (la vitrina) =================
{
  const id = "s07-riesgo";
  const [x, y] = POS.riesgo, [a, b, c, d] = POS.riesgoLead;
  escena(id, {
    css: CSS_CRED + `P .pill.malo { font-size: 50px; }`,
    html: `${cred(1, POS.credRiesgo[0], POS.credRiesgo[1], "Comprar a distancia:", "lo sabés recién cuando llega")}${pill(2, x, y, "Riesgo de comprar", "malo")}`,
    js: `nota(1, ${rel(id, T.v0 + 0.25)}); fuera([1], ${rel(id, T.riesgo + 0.2)}); nota(2, ${rel(id, T.riesgo + 0.3)}); fuera([2], ${rel(id, T.achica - 0.3)});`,
    sfx: [
      { t: rel(id, T.v0) - 0.12, sfx: "whoosh", vol: 0.3, max: 0.5 },
      { t: rel(id, T.toque), sfx: "tic", vol: 0.4 }, { t: rel(id, T.toque + 0.2), sfx: "tic", vol: 0.4 },
      { t: rel(id, T.riesgo), sfx: "glitch-1", vol: 0.08, max: 0.25 },
      { t: rel(id, T.devolver2 - 0.05), sfx: "whoosh-short", vol: 0.3 },
      { t: rel(id, T.sella), sfx: "sello", vol: 0.5 },
      { t: rel(id, T.achica - 0.14), sfx: "click", vol: 0.1 },
      { t: rel(id, T.achica - 0.16), sfx: "whoosh-short", vol: 0.02 },
      { t: rel(id, Wg(50) + 0.62), sfx: "pop", vol: 0.04 },
    ],
  });
}

// ================= s08 · ¿devuelven más? algo. pero compran más todavía (las dos pilas) =================
{
  const id = "s08-giro";
  const [x, y] = POS.suben, [a, b, c, d] = POS.subenLead;
  const tc = T.masQ + 0.4; // las solapas se cierran después de "¿Devuelven más?" (mismo valor que tres.js)
  escena(id, {
    css: CSS_CRED + `P .pill.chico { font-size: 44px; }`,
    html: `${cred(1, POS.credRev[0], POS.credRev[1], "Revisión de estudios", "sobre devoluciones · 2016")}${pill(2, POS.algo[0], POS.algo[1], "Algo, sí", "chico")}${leads(lead(3, a, b, c, d))}${pill(3, x, y, "Suben más las compras", "lleno")}`,
    js: `nota(1, ${rel(id, T.masQ)}); fuera([1], ${rel(id, T.compran - 0.05)}); nota(2, ${rel(id, T.algo + 0.05)}); nota(3, ${rel(id, T.compran + 0.6)}); fuera([2, 3], ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh", vol: 0.025, max: 0.5 },
      { t: 0.14, sfx: "papel", vol: 0.06, max: 0.35 },
      ...[0, 1, 2, 3].map((k) => ({ t: rel(id, tc + 0.05 + k * 0.06), sfx: "golpe", vol: 0.03, max: 0.15 })),
      { t: rel(id, tc + 0.32), sfx: "papel-fuerte", vol: 0.177, max: 0.2 },
      { t: rel(id, T.masQ + 0.32), sfx: "pop", vol: 0.06 },
      { t: rel(id, T.algo + 0.05), sfx: "tic", vol: 0.3 },
      ...[0, 1].map((k) => ({ t: rel(id, T.compran + k * 0.2 + 0.16), sfx: "pop", vol: 0.055 + k * 0.01 })),
      { t: rel(id, T.compran + 0.75), sfx: "ding", vol: 0.12, max: 0.8 },
    ],
  });
}

// ================= s09 · Rubén dudaba: championes online, ¿y si no le quedan? =================
{
  const id = "s09-ruben";
  const [x, y] = POS.duda, [a, b, c, d] = POS.dudaLead;
  const a0 = T.ysi + 0.25;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Le gustan, pero duda")}`,
    js: `nota(1, 0.12); fuera([1], ${rel(id, T.pies - 0.16)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cinematic", vol: 0.25, max: 0.8 },
      { t: rel(id, T.pies) - 0.05, sfx: "whoosh-short", vol: 0.2 },
      { t: rel(id, T.pies + 0.02), sfx: "whoosh-short", vol: 0.1 },
      ...[0, 1, 2].map((k) => ({ t: rel(id, T.pies + 0.28 + 0.233 * k + 0.1), sfx: "tac-real", vol: 0.177 })),
      { t: rel(id, T.nubeR) - 0.05, sfx: "whoosh-short", vol: 0.15 },
      { t: rel(id, T.nubeR + 0.05), sfx: "burbuja", vol: 0.0455 },
      { t: rel(id, T.ysi + 0.15), sfx: "pop", vol: 0.05 }, // el "?" de la nube
    ],
  });
}

// ================= s10 · la tienda decía, junto al precio: devolución gratis (el celular) =================
{
  const id = "s10-cambio";
  const [x, y] = POS.vista, [a, b, c, d] = POS.vistaLead;
  FIRMA.push([INI[id], r2(T.llega)]);
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.08, sfx: "whoosh-short", vol: 0.03 },
      { t: rel(id, T.devolucion - 0.05), sfx: "ping", vol: 0.3, max: 0.6 },
      { t: rel(id, T.compra), sfx: "click-soft", vol: 0.12 },
      { t: rel(id, T.paga), sfx: "click-soft", vol: 0.12 },
    ],
  });
}

// ================= s11 · y le quedaron (llega la caja; los pies con los nuevos) =================
{
  const id = "s11-quedaron";
  FIRMA.push([r2(T.piesN), INI["s12-tu-tienda"]]); // el champión viejo del piso queda donde va el logo
  vacia(id, [
    { t: rel(id, T.llega - 0.04), sfx: "timbre", vol: 0.2, max: 0.6 },
    { t: rel(id, T.llega + 0.22), sfx: "golpe", vol: 0.35, max: 0.4 },
    { t: rel(id, T.abre), sfx: "papel", vol: 0.17, max: 0.35 },
    { t: rel(id, T.abre + 0.04), sfx: "pop", vol: 0.045 },
    { t: rel(id, T.piesN) - 0.05, sfx: "whoosh-short", vol: 0.02 },
    // después de "quedaron": el viejo del piso cierra la boca
    { t: rel(id, T.talon + 0.1), sfx: "tac-real", vol: 0.177 },
    { t: rel(id, T.talon + 0.14), sfx: "sparkle", vol: 0.05, max: 0.45 },
  ]);
}

// ================= s12 · ¿lo ponemos en tu tienda? (el celular "Tu tienda") =================
{
  const id = "s12-tu-tienda";
  FIRMA.push([INI[id], r2(INI[id] + ESC[id])]);
  vacia(id, [
    { t: -0.1, sfx: "whoosh", vol: 0.3, max: 0.5 },
    { t: rel(id, T.tienda12 + 0.02), sfx: "ping", vol: 0.25, max: 0.6 },
  ]);
}

// ================= s13 · cierre: videollamada gratis en scalerics.com (fondo verde, la caja con el tilde) =================
{
  const id = "s13-llamada";
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
      { t: 0.28, sfx: "pop", vol: 0.04 },
      { t: w(id, 88) - 0.03, sfx: "ding", vol: 0.08, max: r2(Math.min(1.2, ESC[id] - w(id, 88) - 0.3)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
