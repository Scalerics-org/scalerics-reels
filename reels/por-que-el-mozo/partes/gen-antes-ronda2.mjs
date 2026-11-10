// Generador de las escenas HTML de reels/por-que-el-mozo (correr desde la carpeta del reel, después de `node armar.mjs`).
// Base: reels/por-que-el-caramelo, con fondo crema #efeee5 en este reel. Los objetos son 3D de verdad y viven en
// assets/tres.js (una sola escena Three.js); estas escenas son SOLO la capa plana de arriba: el gancho en grande, 1-2
// rótulos con línea guía, los créditos de los estudios, los sellos, la burbuja de Rubén y la tarjeta de cierre.
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
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);
const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const tickSvg = (r = 26) => `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------- CSS común (sobre crema: placas navy con texto crema y borde verde; líneas guía navy) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${NAVY2}; font: 600 48px/1.05 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.2); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.grande { font-size: 60px; padding: 18px 40px 21px; }
    ${P} .pill .sub { display: block; margin-top: 6px; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; text-transform: uppercase; color: ${G}; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; stroke-width: 8; }
    ${P} .dot { fill: ${NAVY}; opacity: 0; } ${P} .dot.g { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${NAVY}; border-radius: 22px; font: 900 80px/1 "Lexend", sans-serif; letter-spacing: 0.01em; color: ${NAVY}; background: ${G}; opacity: 0; white-space: nowrap; display: flex; align-items: center; gap: 18px; box-shadow: 0 10px 0 rgba(11,18,32,0.22); }
    ${P} .sello.navy { background: ${NAVY2}; color: ${CR}; border-color: ${G}; }
    ${P} .sello.chico { font-size: 70px; }
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
      const sinNota = (k, t) => tl.to(qa(".n" + k + ", .l" + k + ", .d" + k), { opacity: 0, duration: 0.08, ease: "power1.in" }, t);
      const sello = (s, t, rot) => { tl.set(q(s), { opacity: 1 }, t); tl.fromTo(q(s), { scale: 1.18, rotation: (rot ?? -8) - 14, transformOrigin: "50% 50%" }, { scale: 1, rotation: rot ?? -8, duration: 0.18, ease: "power3.in", immediateRender: false }, t); };
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
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx));
}
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });
const marca = (txt) => `<span class="mk"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 22px; margin: 0 4px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 14px; bottom: 2px; background: ${G}; border-radius: 14px; border: 5px solid ${NAVY}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; }`;
// tic-tac del despertador (de noche): uno cada 0,5 s entre a y b (relativos)
const tictac = (a, b, vol = 0.35) => { const o = []; for (let t = a, i = 0; t < b - 0.1; t += 0.5, i++) o.push({ t: r2(t), sfx: i % 2 ? "tac-real" : "tic-real", vol }); return o; };

// posiciones en pantalla de los rótulos (medidas sobre los cuadros del 3D)
const POS = {
  berlin: [210, 1580], berlinLead: [230, 1515, 280, 1330],
  sinAnotar: [560, 1420],
  cobrado: [540, 1615],
  cred1: [540, 1660],
  doble: [300, 560], dobleLead: [420, 610, 600, 600],
  abierto: [540, 1560], abiertoLead: [470, 1500, 470, 1110],
  cred2: [270, 560],
  calma: [330, 1430], calmaLead: [360, 1370, 470, 1040],
  ruben: [300, 1450], rubenLead: [330, 1390, 470, 1180],
  resp: [250, 1660], respLead: [270, 1600, 330, 1150],
  aviso: [820, 1660], avisoLead: [800, 1600, 640, 1150],
  burbuja: [800, 560], colita: 24,
};

// ================= s01 · gancho (cuadro 0 = portada): el mozo con la bandeja y la nube de pedidos =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 118px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; -webkit-text-stroke: 16px #efeee5; paint-order: stroke fill; white-space: nowrap; }
    P .h .mk { -webkit-text-stroke: 0; }
    P .h1 { top: 150px; font-size: 100px; font-weight: 800; letter-spacing: -0.03em; } P .h2 { top: 268px; font-size: 128px; } P .h3 { top: 410px; font-size: 124px; } P .h4 { top: 560px; font-size: 100px; font-weight: 800; letter-spacing: -0.03em; }`,
    html: `
      <div class="h h1">¿Por qué el mozo</div>
      <div class="h h2">se acuerda</div>
      <div class="h h3">de tu ${marca("pedido")}…</div>
      <div class="h h4">hasta que pagás?</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${w(id, 8)}, 1.1);
      late(".h4", ${w(id, 11)}, 1.06);
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      ...[0, 1, 2, 3].map((k) => ({ t: r2(w(id, 8) - 0.03 + k * 0.08), sfx: "pop", vol: 0.28 })),
      { t: w(id, 11) - 0.05, sfx: "papel-fuerte", vol: 0.5, max: 0.35, full: 1 },
      { t: w(id, 11) + 0.25, sfx: "burbuja", vol: 0.3 },
    ],
  });
}

// ================= s02 · se cuenta que un mozo recordaba todo sin anotar (grúa: la mesa de 4) =================
{
  const id = "s02-mozo";
  const [bx, by] = POS.berlin, [a, b, c, d] = POS.berlinLead, [sx, sy] = POS.sinAnotar;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, bx, by, `Berlín<span class="sub">se cuenta</span>`, "grande")}
      <div class="sello s1 chico" style="left:${sx}px;top:${sy}px">${tickSvg(28)}Sin anotar</div>`,
    css: `P .pill.grande { flex-direction: column; gap: 0; }`,
    js: `nota(1, 0.6); sinNota(1, ${r2(w(id, 20) - 0.24)}); gsap.set(q(".s1"), { xPercent: -50, yPercent: -50 }); sello(".s1", ${r2(w(id, 20) - 0.02)}, -6); tl.set(q(".s1"), { opacity: 0 }, ${r2(ESC[id] - 0.06)});`,
    sfx: [
      { t: -0.12, sfx: "whoosh", vol: 0.22 },
      { t: 0.6, sfx: "click-soft", vol: 0.25 },
      ...[0, 1, 2].map((k) => ({ t: r2(w(id, 18) - 0.05 + k * 0.08), sfx: "pop", vol: 0.26 })),
      { t: w(id, 18) + 0.05, sfx: "burbuja", vol: 0.25 },
      { t: w(id, 20) - 0.08, sfx: "whoosh-short", vol: 0.3 },
      { t: w(id, 20) + 0.2, sfx: "sello", vol: 0.2, max: 0.35 },
    ],
  });
}

// ================= s03 · Pagaron… y se olvidó (monedas al platito; la nube se desinfla) =================
{
  const id = "s03-olvido";
  const [cx, cy] = POS.cobrado;
  const pg = w(id, 21), ol = w(id, 24) - 0.05;
  escena(id, {
    html: `<div class="sello navy s1" style="left:${cx}px;top:${cy}px">${tickSvg(28)}Cobrado</div>`,
    js: `gsap.set(q(".s1"), { xPercent: -50, yPercent: -50 }); sello(".s1", ${r2(pg + 0.45)}, -5); tl.to(q(".s1"), { scale: 0.6, opacity: 0, duration: 0.16, ease: "power2.in" }, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh-short", vol: 0.12 },
      ...[0, 1, 2].map((k) => ({ t: r2(pg + 0.55 + k * 0.14), sfx: "ping", vol: 0.5, max: 0.22 })),
      ...[0, 1].map((k) => ({ t: r2(pg + 0.57 + k * 0.14), sfx: "tic-real", vol: 0.4 })),
      { t: pg + 0.45, sfx: "sello", vol: 0.3 },
      { t: ol, sfx: "whoosh-short", vol: 0.45 }, { t: ol + 0.05, sfx: "burbuja", vol: 0.4 },
      { t: ol + 0.45, sfx: "pop", vol: 0.3 },
      { t: r2(ESC[id] - 0.4), sfx: "whoosh-short", vol: 0.15 },
    ],
  });
}

// ================= s04 · en un estudio, las interrumpidas se recordaban casi el doble (el laboratorio y las pilas) =================
{
  const id = "s04-estudio";
  const [cx, cy] = POS.cred1, [dx, dy] = POS.doble, [a, b, c, d] = POS.dobleLead;
  const tI = w(id, 30) - 0.05, tR = w(id, 32) - 0.05, tD = w(id, 35) - 0.05;
  escena(id, {
    css: `P .cred { position: absolute; left: ${cx}px; top: ${cy}px; transform: translate(-50%, -50%); padding: 16px 34px 18px; border-radius: 22px; background: ${NAVY2}; border: 6px solid ${G}; font: 600 46px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; }
    P .cred .sub { display: block; margin-top: 8px; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${G}; }`,
    html: `${leads(lead(2, a, b, c, d))}<div class="cred n1">Estudio clásico · 1927<span class="sub">no siempre se repitió</span></div>${pill(2, dx, dy, "casi el doble", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 27) + 0.05)}); sinNota(1, ${r2(tR + 0.2)}); nota(2, ${r2(tD - 0.2)}); sinNota(2, ${r2(ESC[id] - 0.08)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh", vol: 0.3 }, { t: 0.0, sfx: "papel", vol: 0.22, max: 0.5 },
      ...[0, 1, 2, 3, 4, 5].map((k) => ({ t: r2(0.15 + Math.floor(k / 2) * 0.14 + (k % 2) * 0.32), sfx: "pop", vol: 0.22 })),
      { t: w(id, 27) + 0.05, sfx: "click-soft", vol: 0.3 },
      ...[0, 1, 2, 3].map((k) => ({ t: r2(tI + k * 0.09), sfx: "pop", vol: 0.25 })),
      { t: tR, sfx: "whoosh-short", vol: 0.3 },
      ...Array.from({ length: 8 }, (_, k) => ({ t: r2(tR + 0.3 + k * ((tD - tR - 0.3) / 8)), sfx: "tic-real", vol: 0.35, full: 1 })),
      { t: tD, sfx: "ding", vol: 0.35, max: 0.9 }, { t: tD + 0.1, sfx: "pop", vol: 0.25 },
      { t: r2(tD + 0.45), sfx: "whoosh-short", vol: 0.3 }, { t: r2(tD + 0.72), sfx: "pop", vol: 0.32 },
    ],
  });
}

// ================= s05 · ¿Por qué? (las fichas verdes se juntan en el "?") =================
vacia("s05-por-que", [
  { t: -0.12, sfx: "whoosh-cine-corto", vol: 0.15, max: 0.6 },
  { t: w("s05-por-que", 37), sfx: "impact-bass-1", vol: 0.3, max: 0.6 },
]);

// ================= s06 · lo pendiente queda abierto en la cabeza (el busto con la "C" que gira) =================
{
  const id = "s06-abierto";
  const [ax, ay] = POS.abierto, [a, b, c, d] = POS.abiertoLead;
  const tA = w(id, 41) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, ax, ay, "Pendiente: sigue dando vueltas")}`,
    js: `nota(1, ${r2(tA - 0.35)}); sinNota(1, ${r2(ESC[id] - 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.35 },
      { t: 0.35, sfx: "pop", vol: 0.25 },
      { t: tA, sfx: "pop", vol: 0.25 }, { t: tA + 0.05, sfx: "click-soft", vol: 0.25 },
      ...tictac(tA + 0.25, ESC[id], 0.25),
    ],
  });
}

// ================= s07 · otro estudio: hacer un plan concreto la calma (la tarjeta del plan; la "C" se cierra) =================
{
  const id = "s07-plan";
  const [cx, cy] = POS.cred2, [px, py] = POS.calma, [a, b, c, d] = POS.calmaLead;
  const tP = w(id, 51) - 0.05, tC = w(id, 54) - 0.05;
  escena(id, {
    css: `P .cred { position: absolute; left: ${cx}px; top: ${cy}px; transform: translate(-50%, -50%); padding: 16px 34px 18px; border-radius: 22px; background: ${NAVY2}; border: 6px solid ${G}; font: 600 46px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }`,
    html: `${leads(lead(2, a, b, c, d))}<div class="cred n1">Estudio · 2011</div>${pill(2, px, py, "Plan concreto", "lleno grande")}`,
    js: `nota(1, 0.3); sinNota(1, ${r2(tC - 0.1)}); nota(2, ${r2(tC + 0.1)}); sinNota(2, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      ...tictac(0.15, tC - 0.05, 0.25),
      { t: 0.05, sfx: "papel-fuerte", vol: 0.25, max: 0.4 }, { t: 0.1, sfx: "pop", vol: 0.2 },
      { t: 0.3, sfx: "click-soft", vol: 0.25 },
      { t: 0.47, sfx: "typing", vol: 0.25, max: r2(tC - 0.2 - 0.47) },
      ...[0, 1, 2].map((k) => ({ t: r2(0.45 + (k + 1) * ((tC - 0.2 - 0.45) / 3)), sfx: "pop", vol: 0.22 })),
      { t: tC + 0.32, sfx: "chime", vol: 0.45, max: 1.2 }, { t: tC + 0.32, sfx: "pop", vol: 0.3 },
    ],
  });
}

// ================= s08 · Rubén, de noche: la seña, el presupuesto, el proveedor (la misma nube) =================
{
  const id = "s08-noche";
  const [rx, ry] = POS.ruben, [a, b, c, d] = POS.rubenLead;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, rx, ry, "Rubén", "grande")}`,
    js: `nota(1, 0.95); sinNota(1, ${r2(w(id, 59) - 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh", vol: 0.45 },
      { t: 0.72, sfx: "click", vol: 0.45 },
      { t: 0.9, sfx: "pop", vol: 0.25 },
      ...tictac(0.6, ESC[id], 0.2),
      ...[59, 61, 63].map((i) => ({ t: r2(w(id, i) - 0.05), sfx: "pop", vol: 0.24 })),
      
    ],
  });
}

// ================= s09 · ahora cada pendiente va a su sistema, con responsable y aviso (la tablet) =================
{
  const id = "s09-sistema";
  const [x1, y1] = POS.resp, l1 = POS.respLead, [x2, y2] = POS.aviso, l2 = POS.avisoLead;
  const tS = w(id, 69) - 0.05, tR = w(id, 71) - 0.05, tA = w(id, 73) - 0.05;
  escena(id, {
    html: `${leads(lead(1, ...l1, "g"), lead(2, ...l2, "g"))}${pill(1, x1, y1, "Responsable")}${pill(2, x2, y2, "Aviso", "lleno")}`,
    js: `nota(1, ${r2(tR + 0.05)}); nota(2, ${r2(tA + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.12)}); sinNota(2, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      ...tictac(0.0, tS, 0.25),
      { t: 0.05, sfx: "whoosh-short", vol: 0.25 }, { t: 0.4, sfx: "click-soft", vol: 0.3 },
      ...[0, 1, 2].map((k) => ({ t: r2(tS + k * 0.25), sfx: "whoosh-short", vol: 0.14 })),
      ...[0, 1, 2].map((k) => ({ t: r2(tS + 0.4 + k * 0.25), sfx: "click", vol: 0.16 })),
      { t: tR + 0.05, sfx: "pop", vol: 0.3 },
      { t: tA, sfx: "notification", vol: 0.3, max: 0.9 }, { t: tA + 0.05, sfx: "pop", vol: 0.3 }, { t: tA + 0.15, sfx: "pop", vol: 0.2 }, { t: tA + 0.25, sfx: "pop", vol: 0.18 },
    ],
  });
}

// ================= s10 · RUBÉN: "Anotado. Ya me olvidé." (la nube se desinfla igual que la del mozo) =================
{
  const id = "s10-olvide";
  const [bx, by] = POS.burbuja;
  const tO = w(id, 77) - 0.05;
  escena(id, {
    css: `
    P .burb { position: absolute; left: ${bx}px; top: ${by}px; transform: translate(-50%, -50%); padding: 24px 46px 30px; border-radius: 48px; background: #ffffff; border: 7px solid ${NAVY}; font: 700 64px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; white-space: nowrap; text-align: center; opacity: 0; box-shadow: 0 10px 0 rgba(11,18,32,0.2); }
    P .burb::after { content: ""; position: absolute; left: ${POS.colita}%; bottom: -46px; width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 48px solid ${NAVY}; transform: translateX(-50%); }
    P .burb::before { content: ""; position: absolute; left: ${POS.colita}%; bottom: -32px; width: 0; height: 0; border-left: 21px solid transparent; border-right: 21px solid transparent; border-top: 34px solid #ffffff; z-index: 1; transform: translateX(-50%); }`,
    html: `<div class="burb">Anotado.<br><span class="r2">Ya me olvidé.</span></div>`,
    js: `gsap.set(q(".r2"), { opacity: 0 }); tl.set(q(".burb"), { opacity: 1 }, 0.08); tl.fromTo(q(".burb"), { scale: 0.6, transformOrigin: "${POS.colita}% 100%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.08); tl.set(q(".r2"), { opacity: 1 }, ${r2(w(id, 75) - 0.04)}); late(".burb", ${r2(w(id, 75) - 0.04)}, 1.06); tl.set(q(".burb"), { opacity: 0 }, ${r2(ESC[id] - 0.1)});`,
    sfx: [
      ...tictac(0.0, tO + 0.6, 0.22),
      { t: 0.35, sfx: "tac-real", vol: 0.6, full: 1 }, { t: 0.08, sfx: "pop", vol: 0.25 }, { t: w(id, 75) - 0.04, sfx: "pop", vol: 0.22 },
      { t: tO, sfx: "whoosh-short", vol: 0.45 }, { t: tO + 0.05, sfx: "burbuja", vol: 0.4 },
      { t: tO + 0.55, sfx: "click", vol: 0.45 },
    ],
  });
}

// ================= s11 · ¿querés dormir sin pendientes? (a la mañana, la tablet con las tildes) =================
{
  const id = "s11-dormir";
  vacia(id, [
    { t: -0.05, sfx: "whoosh", vol: 0.35 }, { t: 0.2, sfx: "sparkle", vol: 0.25, max: 0.8 },
    ...[0, 1, 2].map((k) => ({ t: r2(0.9 + k * 0.3), sfx: "pop", vol: 0.3 })),
    { t: 0.9, sfx: "ding", vol: 0.28, max: 0.7 },
  ]);
}

// ================= s12 · cierre: videollamada gratis en scalerics.com (fondo verde, letras navy, la nubecita 3D) =================
{
  const id = "s12-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 330px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 476px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 676px; text-align: center; }
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
      { t: -0.14, sfx: "whoosh-cine-corto", vol: 0.2, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.3 },
      { t: w(id, 87) - 0.03, sfx: "chime", vol: 0.5, max: 1.2 },
    ],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
