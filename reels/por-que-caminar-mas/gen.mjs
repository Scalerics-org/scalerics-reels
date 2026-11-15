// Generador de las escenas HTML de reels/por-que-caminar-mas (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs` para que index.html tome los SFX).
// Base: reels/por-que-te-llaman, sobre fondo CREMA #efeee5 liso: placas navy con texto crema y borde verde, líneas guía
// navy de 7 px, créditos mono navy. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena Three.js);
// estas escenas son SOLO la capa plana de arriba: el gancho en grande, 1-2 rótulos con línea guía, los créditos y la
// tarjeta de cierre. Los tiempos de las acciones 3D se calculan con las mismas fórmulas que tres.js (T.*).
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const Wg = (i) => r2(pal[i].start);
const w = (id, i) => r2(pal[i].start - INI[id]);
const rel = (id, tg) => r2(tg - INI[id]);
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="14"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const L = (k, Q, kind = "") => leads(lead(k, Q[0], Q[1], Q[2], Q[3], kind));

// ---------- CSS común (sobre crema: placas navy con texto crema y borde verde; líneas guía navy) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${NAVY}; font: 800 52px/1.05 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.25); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.malo { border-color: ${NAVY}; background: ${RED}; color: ${CR}; }
    ${P} .pill.chica { font-size: 44px; padding: 12px 26px 15px; }
    ${P} .pill.tag { font: 600 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; padding: 12px 24px 14px; border-width: 5px; border-radius: 16px; }
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
const marca = (txt) => `<span class="mk"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 22px; margin: 0 2px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 14px; bottom: 0px; background: ${G}; border-radius: 18px; border: 7px solid ${NAVY}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; -webkit-text-stroke: 0; }`;
const CSS_CREDM = `P .credm { position: absolute; transform: translate(-50%, -50%); padding: 12px 26px 14px; border-radius: 18px; background: ${CR}; border: 4px solid ${NAVY}; font: 500 42px/1.1 "IBM Plex Mono", monospace; color: ${NAVY}; white-space: nowrap; opacity: 0; }`; // ronda 1: 36 → 42 px
const credm = (k, x, y, txt) => `<div class="credm n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;

// ---------- los mismos tiempos clave que tres.js ----------
const T = {
  s02: INI["s02-seis-veces"], veces: Wg(13), quejas: Wg(16), desap: Wg(18),
  s03: INI["s03-por-que"], espera: Wg(21), ocho: Wg(22), uno: Wg(24), siete: Wg(27), cinta: Wg(30),
  s04: INI["s04-alejaron"], alejaron: Wg(32), puertas: Wg(34), llegada: Wg(36),
  s05: INI["s05-maister"], profesor: Wg(38), n1985: Wg(44),
  s06: INI["s06-espera"], vacia: Wg(47), mas: Wg(50), laQue: Wg(52), sabes: Wg(55), cuanto: Wg(56), todavia: Wg(58),
  s07: INI["s07-ruben-tel"], te: Wg(62), hora: Wg(67),
  s08: INI["s08-frente-cinta"], noticias: Wg(71), frente: Wg(73), cinta8: Wg(76),
  s09: INI["s09-avisos"], automat: Wg(78), avisa: Wg(80), sola: Wg(81), paso: Wg(83),
  s10: INI["s10-ruben-nadie"], llamo: Wg(85), se: Wg(86), telefono: Wg(89), agenda: Wg(94),
  fin: INI["s11-cierre"],
};
T.estira = 1.6; T.tramo1 = r2(T.s02 + 0.15); T.tramos = [0, 1, 2, 3, 4].map((i) => r2(T.veces + 0.05 + i * 0.09)); T.x6 = r2(T.veces + 0.1);
T.globos = [0, 1, 2, 3, 4, 5].map((i) => r2(T.quejas - 0.05 + i * 0.07)); T.desinfla = r2(T.desap + 0.15); T.casi0 = Wg(17);
T.cae = r2(T.s03 - 0.08); T.b1 = r2(T.uno + 0.05); T.b7 = r2(T.siete + 0.05); T.n8 = T.ocho; T.sale = r2(T.cinta + 0.1);
T.desliza = r2(T.alejaron + 0.05); T.saltan = r2(T.llegada - 0.1);
T.pliega = r2(T.s05 + 0.15); T.paginas = [0.35, 0.65, 0.95].map((d) => r2(T.s05 + d));
T.arena = r2(T.s06 - 0.05); T.estiraA = T.mas; T.gira = r2(T.laQue - 0.1);
T.llamadas = [r2(T.s07 + 0.2), r2(T.te - 0.1), r2(T.hora - 0.15)]; T.push = r2(T.s08 - 0.45);
T.avisos = [r2(T.s09 - 0.05), r2(T.avisa - 0.08), r2(T.sola + 0.3), r2(T.paso + 0.5)]; T.camion = r2(T.avisos[2] + 0.02);
T.levanta = r2(T.llamo + 0.35); T.toca = [r2(T.telefono + 0.35), r2(T.telefono + 0.6)]; T.cuelga = r2(Wg(93) + 0.3); T.sopla = r2(Wg(89) + 0.75);

// tramos sin logo (assets/firma.json): el chat gigante (el pie del celular y el camión)
const FIRMA = [[T.s04, T.s05], [T.s09, T.s10]]; // ronda 1: + la maqueta (la cinta lejana quedaba bajo el logo)

// posiciones en pantalla de los rótulos y créditos (medidas sobre los cuadros del 3D)
const POS = {
  min1: [420, 1580], min1Lead: [420, 1520, 430, 1460], quejas: [860, 985],
  antes: [170, 540], despues: [200, 540],
  normal: [700, 935], normalLead: [720, 880, 720, 790], seguian: [700, 935], // ronda 2: más abajo y a la derecha (no pisa a Rubén)
  nyt: [540, 1640],
  lejos: [760, 1080], lejosLead: [700, 1025, 560, 820],
  maister: [540, 1640],
  vacia: [800, 1530], vaciaLead: [790, 1470, 700, 1260],
  nosabe: [540, 1630], nosabeLead: [540, 1570, 540, 1560],
  llamadas: [640, 600],
  pedido: [330, 1560], pedidoLead: [380, 1500, 470, 1210],
  aviso: [540, 1795], sabe: [540, 1795],
};

// ---------- el gancho (cuadro 0 = portada en movimiento) ----------
const CSS_GANCHO = `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 122px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; -webkit-text-stroke: 14px ${CR}; paint-order: stroke fill; white-space: nowrap; }
    P .h1 { top: 70px; } P .h2 { top: 196px; } P .h3 { top: 322px; }
    P .banda { position: absolute; left: 0; top: 0; width: 1080px; height: 540px; background: ${CR}; }
    P .sub0 { position: absolute; left: 50%; top: 462px; transform: translateX(-50%); padding: 10px 26px 12px; border-radius: 16px; background: ${NAVY}; font: 500 44px/1 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${CR}; white-space: nowrap; }`;
const GANCHO = `
      <div class="banda"></div>
      <div class="h h1">¿Por qué los</div>
      <div class="h h2">hicieron</div>
      <div class="h h3">caminar ${marca("más")}?</div>
      <div class="sub0">Un aeropuerto de Houston</div>`;

// ================= s01 · gancho =================
{
  const id = "s01-gancho";
  escena(id, {
    css: CSS_GANCHO,
    html: GANCHO,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".h3 .mk"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${w(id, 8)});
      tl.to(qa(".h, .sub0"), { opacity: 0, y: -30, duration: 0.2, ease: "power1.in" }, ${r2(ESC[id] - 0.24)}); tl.to(q(".banda"), { opacity: 0, duration: 0.2, ease: "power1.in" }, ${r2(ESC[id] - 0.2)});`,
    sfx: [
      ...Array.from({ length: 7 }, (_, i) => ({ t: 0.12 + i * 0.42, sfx: "tac-real", vol: 0.25 })),
      { t: 1.4, sfx: "whoosh-cine-corto", vol: 0.06, max: 1.0 }, // ronda 1: el cinematic arrancaba mudo
    ],
  });
}

// ================= s02 · seis veces más; las quejas casi desaparecieron =================
{
  const id = "s02-seis-veces";
  escena(id, {
    html: `${L(1, POS.min1Lead)}${pill(1, POS.min1[0], POS.min1[1], "antes: 1 min caminando")}${pill(2, POS.quejas[0], POS.quejas[1], "QUEJAS", "tag malo")}`,
    js: `nota(1, ${rel(id, T.s02 + 0.6)}); fuera([1], ${rel(id, T.desap - 0.02)}); pop(".n2", ${rel(id, T.quejas)}); fuera([2], ${rel(id, T.casi0 + 0.55)});`,
    sfx: [
      { t: 0.04, sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.tramo1), sfx: "pop", vol: 0.05 },
      ...T.tramos.map((tt) => ({ t: rel(id, tt), sfx: "tic", vol: 0.12, max: 0.12 })),
      { t: rel(id, T.x6), sfx: "pop", vol: 0.09 },
      ...T.globos.map((tg, i) => ({ t: rel(id, tg), sfx: "pop", vol: 0.015 + (i % 2) * 0.005 })),
      { t: rel(id, T.desinfla), sfx: "whoosh-short", vol: 0.04 },
      { t: rel(id, T.desap + 0.35), sfx: "ding", vol: 0.03, max: 0.5 },
    ],
  });
}

// ================= s03 · ¿por qué? esperaban ocho minutos: uno caminando y siete mirando la cinta =================
{
  const id = "s03-por-que";
  escena(id, {
    css: CSS_CREDM,
    html: `${pill(1, POS.antes[0], POS.antes[1], "ANTES", "tag")}${L(2, POS.normalLead)}${pill(2, POS.normal[0], POS.normal[1], "ya la habían bajado a 8 min", "lleno chica")}${pill(4, POS.seguian[0], POS.seguian[1], "y las quejas seguían", "malo")}${credm(3, POS.nyt[0], POS.nyt[1], "The New York Times · 2012")}`,
    js: `pop(".n1", ${rel(id, T.espera)}); pop(".n3", ${rel(id, T.espera + 0.1)}); nota(2, ${rel(id, T.ocho - 0.05)}); fuera([2], ${rel(id, T.siete - 0.12)}); pop(".n4", ${rel(id, T.siete - 0.08)}); fuera([1, 3, 4], ${r2(ESC[id] - 0.2)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-short", vol: 0.05 },
      { t: rel(id, T.cae + 0.37), sfx: "golpe", vol: 0.06, max: 0.3 },
      { t: rel(id, T.cae + 0.39), sfx: "pop", vol: 0.05 },
      { t: rel(id, T.n8), sfx: "pop", vol: 0.06 },
      { t: rel(id, T.uno - 0.05), sfx: "tac-real", vol: 0.2 },
      { t: rel(id, T.siete + 0.15), sfx: "pop", vol: 0.05 },
      { t: rel(id, T.b7), sfx: "golpe", vol: 0.1, max: 0.3 },
      { t: rel(id, T.sale + 0.44), sfx: "golpe", vol: 0.06, max: 0.25 },
      { t: rel(id, T.sale + 0.62), sfx: "golpe", vol: 0.04, max: 0.25 },
    ],
  });
}

// ================= s04 · entonces alejaron las puertas de llegada =================
{
  const id = "s04-alejaron";
  escena(id, {
    html: `${pill(1, POS.despues[0], POS.despues[1], "DESPUÉS", "tag")}${L(2, POS.lejosLead)}${pill(2, POS.lejos[0], POS.lejos[1], "puertas más lejos", "lleno")}`,
    js: `pop(".n1", 0.1); nota(2, ${rel(id, T.desliza + 0.3)}); fuera([1, 2], ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh", vol: 0.05, max: 0.6 }, // ronda 1: grúa (el cinematic arrancaba mudo)
      { t: rel(id, T.desliza), sfx: "whoosh-short", vol: 0.05 },
      ...[0, 1, 2].map((i) => ({ t: rel(id, T.saltan + i * 0.12 + 0.3), sfx: "pop", vol: 0.04 })),
      { t: rel(id, T.puertas), sfx: "sparkle", vol: 0.03, max: 0.6 },
    ],
  });
}

// ================= s05 · lo explicó un profesor en 1985 =================
{
  const id = "s05-maister";
  escena(id, {
    css: CSS_CREDM,
    html: credm(1, POS.maister[0], POS.maister[1], "David Maister · Harvard · 1985"),
    js: `pop(".n1", ${rel(id, T.pliega + 0.5)}); fuera([1], ${r2(ESC[id] - 0.15)});`, // ronda 2: después de que se pliega la maqueta
    sfx: [
      { t: rel(id, T.pliega), sfx: "papel", vol: 0.36, max: 0.6 },
      ...T.paginas.map((tp) => ({ t: rel(id, tp), sfx: "hoja", vol: 0.1, max: 0.7 })),
      { t: rel(id, T.n1985), sfx: "pop", vol: 0.07 },
    ],
  });
}

// ================= s06 · la espera vacía se siente más larga; la que no sabés cuánto dura, más todavía =================
{
  const id = "s06-espera";
  escena(id, {
    html: `${L(1, POS.vaciaLead)}${pill(1, POS.vacia[0], POS.vacia[1], "espera vacía")}${L(2, POS.nosabeLead, "malo")}${pill(2, POS.nosabe[0], POS.nosabe[1], "sin saber cuánto falta", "malo")}`,
    js: `nota(1, ${rel(id, T.vacia)}); fuera([1], ${rel(id, T.gira - 0.05)}); nota(2, ${rel(id, T.sabes)}); fuera([2], ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: rel(id, T.arena + 0.03), sfx: "pop", vol: 0.025 },
      { t: rel(id, T.arena), sfx: "whoosh-short", vol: 0.012 },
            { t: rel(id, T.gira + 0.05), sfx: "whoosh", vol: 0.02, max: 0.45 },
      { t: rel(id, T.gira + 0.2), sfx: "pop", vol: 0.03 },
      ...Array.from({ length: 16 }, (_, i) => { const tt = T.gira + 0.45 + 2.6 * (1 - Math.pow(1 - i / 16, 1.6)); return { t: rel(id, tt), sfx: "tic-real", vol: 0.16 + i * 0.01 }; }).filter((s) => s.t < rel(id, pal[58].start - 0.05)),
    ],
  });
}

// ================= s07 · Rubén: "Sale hoy. Te lo dije hace una hora." =================
{
  const id = "s07-ruben-tel";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.25, sfx: "ring", vol: 0.04, max: 0.22 },
      { t: -0.3, sfx: "whoosh-short", vol: 0.015, max: 0.2 },
      ...T.llamadas.map((tl2) => ({ t: rel(id, tl2), sfx: "pop", vol: 0.03 })),
      { t: rel(id, T.push + 0.16), sfx: "whoosh-short", vol: 0.035, max: 0.28 },
    ],
  });
}

// ================= s08 · tu cliente sin noticias está frente a la cinta =================
{
  const id = "s08-frente-cinta";
  escena(id, {
    html: `${L(1, POS.pedidoLead, "malo")}${pill(1, POS.pedido[0], POS.pedido[1], "Pedido #418 · ¿?", "malo")}`,
    js: `nota(1, ${rel(id, T.noticias)}); fuera([1], ${r2(ESC[id] - 0.35)});`,
    sfx: [
      { t: -0.26, sfx: "whoosh", vol: 0.05, max: 0.3 },
      { t: rel(id, T.noticias), sfx: "pop", vol: 0.04 },
    ],
  });
}

// ================= s09 · una automatización le avisa sola cada paso =================
{
  const id = "s09-avisos";
  escena(id, {
    html: `${pill(2, POS.sabe[0], POS.sabe[1], "ya sabe cuánto falta", "lleno")}`,
    js: `pop(".n2", ${rel(id, T.avisa)}); fuera([2], ${r2(ESC[id] - 0.15)});`, // ronda 1: un solo rótulo (dos no llegaban a leerse)
    sfx: [
      { t: -0.15, sfx: "whoosh-short", vol: 0.05 },
      ...T.avisos.map((ta, i) => ({ t: rel(id, ta), sfx: i === 3 ? "chime" : "notification", vol: i === 3 ? 0.1 : 0.025, max: i === 3 ? 0.8 : 0.4 })),
      ...T.avisos.filter((_, i) => i !== 2).map((ta) => ({ t: rel(id, ta + 0.12), sfx: "click-soft", vol: 0.1 })),
      { t: rel(id, T.camion), sfx: "motor", vol: 0.03, max: 0.85 },
    ],
  });
}

// ================= s10 · Rubén: "Nadie llamó. ¿Se cortó el teléfono?" =================
{
  const id = "s10-ruben-nadie";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.32, sfx: "whoosh-short", vol: 0.03, max: 0.3 },
      { t: rel(id, T.levanta + 0.17), sfx: "click", vol: 0.12 },
      // ronda 2: el soplido va sin efecto (no hay uno limpio en el repo y pisaba la cola de "teléfono?")
      ...T.toca.map((tt) => ({ t: rel(id, tt), sfx: "tac-real", vol: 0.11 })),
      { t: rel(id, T.cuelga + 0.33), sfx: "click", vol: 0.1 },
    ],
  });
}

// ================= s10b · "¿Sin esperas a ciegas? Agendá una…" (Rubén mira a cámara, cuelga y sonríe) =================
escena("s10b-ciegas", { html: `<i></i>`, js: ``, sfx: [{ t: -0.05, sfx: "whoosh-short", vol: 0.025, max: 0.3 }] });

// ================= s11 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s11-cierre";
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
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 97) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 99) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.04, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.55, sfx: "whoosh", vol: 0.08, max: 0.5 }, { t: 0.04, sfx: "pop", vol: 0.07 },
      { t: 0.3, sfx: "chime", vol: 0.04, max: 0.8 },
      { t: r2(pal[99].end - INI[id] + 0.05), sfx: "ding", vol: 0.03, max: 0.5 },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
