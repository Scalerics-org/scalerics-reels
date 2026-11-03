// Generador de las escenas HTML de reels/netflix-blockbuster (correr desde la carpeta del reel,
// después de `node armar.mjs`). Base: reels/caso-dominos. Los objetos son 3D de verdad y viven en
// assets/tres.js (una sola escena Three.js para todo el reel, con la cámara que se mueve y los
// objetos que se transforman); estas escenas son SOLO la capa plana de arriba: el gancho en
// grande, etiquetas con línea guía, contadores, sellos y la tarjeta de cierre. Nada de esto se
// inclina. Netflix y Blockbuster se nombran en texto: no se dibuja ningún logo ni sus colores.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${RED}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const mono = (k, x, y, txt, kind = "") => `<div class="mono ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 46px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${CR}; white-space: nowrap; opacity: 0; text-shadow: 0 3px 0 rgba(3,6,12,0.6); }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${RED}; border-radius: 22px; font: 900 92px/1 "Lexend", sans-serif; letter-spacing: 0.02em; color: ${RED}; background: rgba(11,18,32,0.78); opacity: 0; white-space: nowrap; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)", immediateRender: true }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.16 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const sello = (s, t, rot) => tl.fromTo(q(s), { opacity: 0, scale: 1.8, rotation: rot ?? -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: rot ?? -8, duration: 0.28, ease: "power4.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const finTodo = () => tl.to(q(".esc"), { opacity: 0, duration: 0.2, ease: "power2.in" }, DUR - 0.22);
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

// ================= s01 · gancho =================
// cuadro 0: el gancho entero en grande, con el año 2000 en 3D debajo
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .tit { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 104px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55); }
    P .tit .v { color: ${G}; }
    P .tit .s1 { font-size: 84px; color: ${CR}; }
    P .no { position: absolute; left: 0; right: 0; top: 230px; text-align: center; font: 800 128px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; opacity: 0; text-shadow: 0 6px 0 rgba(3,6,12,0.55); }
    P .no .bx { position: relative; display: inline-block; padding: 0 22px 8px; }
    P .no .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .sello { left: 540px; top: 1250px; transform: translate(-50%, -50%); }`,
    html: `
      <div class="tit"><div class="s1">En el año 2000,</div><div>Netflix se ofreció</div><div>a Blockbuster por</div><div class="v">US$ 50 millones</div></div>
      <div class="no"><div>Blockbuster</div><div>dijo <span class="bx"><div class="selbox r sb">${esquinas}</div><em style="position:relative;font-style:normal">que no</em></span></div></div>
      <div class="sello s1x">NO</div>`,
    js: `
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      late(".tit .v", ${w(id, 11)}, 1.08);
      tl.to(q(".tit"), { opacity: 0, y: -50, duration: 0.25, ease: "power2.in" }, ${w(id, 15) - 0.25});
      tl.fromTo(q(".no"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${w(id, 15) - 0.05});
      caja(".sb", ${w(id, 17)});
      tl.set(q(".s1x"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".s1x", ${w(id, 18)}, -10);
      finTodo();`,
    sfx: [{ t: w(id, 11), sfx: "click-soft", vol: 0.25 }, { t: w(id, 15), sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 18), sfx: "impact-bass-1", vol: 0.3 }],
  });
}

// ================= s02 · 1998, DVD por internet =================
{
  const id = "s02-dvd";
  escena(id, {
    html: `
      ${leads(lead(1, 300, 1500, 420, 1300), lead(2, 780, 1500, 680, 1330, "g"))}
      ${pill(1, 260, 1560, "DVD")}
      ${pill(2, 780, 1560, "pedido online", "g")}`,
    js: `
      nota(1, ${w(id, 23)});
      nota(2, ${w(id, 25)});
      finTodo();`,
    sfx: [{ t: 0.12, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 21), sfx: "sparkle", vol: 0.14 }, { t: w(id, 23), sfx: "pop", vol: 0.22 }, { t: w(id, 25), sfx: "pop", vol: 0.22 }],
  });
}

// ================= s03 · te llegaba por correo =================
{
  const id = "s03-correo";
  escena(id, {
    css: `
    P .pasos { position: absolute; left: 0; right: 0; top: 1500px; display: flex; justify-content: center; gap: 22px; }
    P .paso { display: flex; align-items: center; gap: 14px; padding: 16px 28px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 42px/1 "Lexend", sans-serif; color: ${CR}; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .paso b { display: inline-flex; width: 50px; height: 50px; border-radius: 50%; background: ${G}; color: ${NAVY}; align-items: center; justify-content: center; font-size: 32px; }`,
    html: `
      <div class="pasos"><div class="paso p1"><b>1</b>Elegís</div><div class="paso p2"><b>2</b>Llega</div><div class="paso p3"><b>3</b>Mirás</div></div>`,
    js: `
      pop(".p1", ${w(id, 26)});
      pop(".p2", ${w(id, 31)});
      pop(".p3", ${w(id, 34)});
      finTodo();`,
    sfx: [{ t: w(id, 26), sfx: "click-soft", vol: 0.25 }, { t: w(id, 29) + 0.3, sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 31), sfx: "click-soft", vol: 0.25 }, { t: w(id, 33), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(id, 34), sfx: "click-soft", vol: 0.25 }],
  });
}

// ================= s04 · 1999, sin multas =================
{
  const id = "s04-multas";
  escena(id, {
    css: `P .tachado { position: absolute; left: 230px; top: 1500px; width: 620px; height: 12px; border-radius: 6px; background: ${G}; transform-origin: 0% 50%; opacity: 0; }`,
    html: `
      ${pill(1, 540, 1530, "Multa por devolver tarde", "r")}
      <div class="tachado"></div>
      ${pill(2, 540, 1530, `${tick(26)}Sin multas`, "lleno grande")}`,
    js: `
      nota(1, ${w(id, 39) - 0.15});
      tl.fromTo(q(".tachado"), { opacity: 1, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.inOut" }, ${w(id, 43)});
      tl.set(q(".tachado"), { left: 230, top: 1524 }, 0);
      fuera(qa(".n1, .tachado"), ${w(id, 44) + 0.05}, 0.18);
      nota(2, ${w(id, 44) + 0.15});
      finTodo();`,
    sfx: [{ t: 0.18, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(id, 39) - 0.2, sfx: "pop", vol: 0.22 }, { t: w(id, 41) - 0.1, sfx: "glitch-1", vol: 0.14 }, { t: w(id, 43), sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 44) + 0.15, sfx: "ping", vol: 0.25 }],
  });
}

// ================= s05 · casi 9.000 locales =================
{
  const id = "s05-locales";
  escena(id, {
    css: `
    P .cont { position: absolute; left: 80px; right: 80px; top: 1160px; padding: 26px 0 30px; border-radius: 44px; background: rgba(11,18,32,0.9); border: 6px solid ${CR}; text-align: center; opacity: 0; box-shadow: 0 14px 0 rgba(3,6,12,0.5); }
    P .cont .num { font: 900 168px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; font-variant-numeric: tabular-nums; }
    P .cont .lbl { margin-top: 10px; white-space: nowrap; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${CR}; }`,
    html: `<div class="cont"><div class="num">0</div><div class="lbl">CASI · LOCALES DE BLOCKBUSTER</div></div>`,
    js: `
      pop(".cont", 0.25, 0.4, 0.8);
      const el = q(".num"); const o = { v: 0 };
      const fmt = (n) => (n >= 1000 ? Math.floor(n / 1000) + "." + String(n % 1000).padStart(3, "0") : String(n));
      tl.to(o, { v: 9000, duration: ${r2(w(id, 50) - 0.3)}, ease: "power2.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v / 50) * 50); } }, 0.3);
      late(".cont", ${w(id, 50) + 0.05}, 1.06);
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "riser", vol: 0.16, max: 1.6 }, { t: 0.25, sfx: "pop", vol: 0.22 }, { t: w(id, 50) + 0.05, sfx: "impact-bass-2", vol: 0.22 }],
  });
}

// ================= s06 · Dallas, 50 millones, no compró =================
{
  const id = "s06-dallas";
  escena(id, {
    css: `P .sello { left: 540px; top: 1060px; }`,
    html: `
      ${pill(1, 540, 1490, "Dallas · 2000")}
      ${mono(2, 540, 1580, "según Hastings y Randolph")}
      <div class="sello s2x">NO COMPRÓ</div>`,
    js: `
      nota(1, ${w(id, 55)});
      pop(".n2", ${w(id, 57)}, 0.3, 0.9);
      tl.set(q(".s2x"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".s2x", ${w(id, 63)}, -8);
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 55), sfx: "click-soft", vol: 0.25 }, { t: w(id, 57), sfx: "key-press", vol: 0.2 }, { t: w(id, 63), sfx: "impact-bass-1", vol: 0.3 }],
  });
}

// ================= s07 · 2007, streaming =================
{
  const id = "s07-streaming";
  escena(id, {
    html: `
      ${leads(lead(1, 820, 1560, 720, 1250, "g"))}
      ${pill(1, 800, 1600, "Streaming", "lleno")}
      ${mono(2, 360, 1590, "sin ir a ningún lado", "g")}`,
    js: `
      nota(1, ${w(id, 70)});
      pop(".n2", ${w(id, 70) + 0.35}, 0.3, 0.9);
      fuera(qa(".n1, .l1, .d1, .n2"), ${w(id, 73) + 0.35}, 0.25);
      finTodo();`,
    sfx: [{ t: 0.18, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.5, sfx: "pop", vol: 0.2 }, { t: w(id, 70), sfx: "ping", vol: 0.25 }, { t: w(id, 73), sfx: "whoosh-cinematic", vol: 0.24, max: 1.2 }],
  });
}

// ================= s08 · 2010, quiebra =================
{
  const id = "s08-quiebra";
  escena(id, {
    css: `P .sello { left: 540px; top: 1530px; font-size: 104px; }`,
    html: `
      ${pill(1, 540, 1555, "Blockbuster")}
      <div class="sello s3x">QUIEBRA</div>
      ${mono(2, 540, 1690, "Chapter 11 · septiembre de 2010")}`,
    js: `
      nota(1, ${w(id, 79)});
      pop(".n2", ${w(id, 79) + 0.3}, 0.3, 0.9);
      fuera(".n1", ${w(id, 83) - 0.2}, 0.15);
      tl.set(q(".s3x"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".s3x", ${w(id, 83)}, -6);
      finTodo();`,
    sfx: [{ t: 0.0, sfx: "whoosh-cinematic", vol: 0.2, max: 1.0 }, { t: w(id, 79), sfx: "click-soft", vol: 0.25 }, { t: w(id, 80), sfx: "riser", vol: 0.12, max: 1.0 }, { t: w(id, 83), sfx: "impact-bass-2", vol: 0.32 }],
  });
}

// ================= s09 · las películas eran las mismas =================
{
  const id = "s09-mismas";
  escena(id, {
    css: `P .igual { position: absolute; left: 540px; top: 1010px; transform: translate(-50%, -50%); font: 900 200px/1 "Lexend", sans-serif; color: ${G}; opacity: 0; text-shadow: 0 8px 0 rgba(3,6,12,0.55); }`,
    html: `
      ${pill(1, 300, 1440, "Netflix")}
      ${pill(2, 780, 1440, "Blockbuster")}
      <div class="igual">=</div>`,
    js: `
      nota(1, ${w(id, 89) + 0.2});
      nota(2, ${w(id, 89) + 0.35});
      pop(".igual", ${w(id, 94)}, 0.35, 0.4);
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(id, 89), sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 89) + 0.2, sfx: "pop", vol: 0.2 }, { t: w(id, 89) + 0.35, sfx: "pop", vol: 0.2 }, { t: w(id, 94), sfx: "ping", vol: 0.25 }],
  });
}

// ================= s10 · otra forma de comprar =================
{
  const id = "s10-forma";
  escena(id, {
    css: `
    P .ruta { position: absolute; left: 0; top: 0; }
    P .xx { position: absolute; left: 540px; top: 1225px; transform: translate(-50%, -50%); opacity: 0; }`,
    html: `
      ${pill(1, 540, 1530, "Otra forma de comprar", "g")}
      ${pill(2, 300, 1560, `${tick(24)}Desde su casa`, "g")}
      ${pill(3, 790, 1560, "Ir al local", "r")}
      <div class="xx">${cruz(40)}</div>`,
    js: `
      nota(1, ${w(id, 100)});
      fuera(".n1", ${w(id, 104) - 0.25}, 0.18);
      nota(2, ${w(id, 106) - 0.1});
      nota(3, ${w(id, 108)});
      pop(".xx", ${w(id, 114)}, 0.3, 0.3);
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 100), sfx: "click-soft", vol: 0.25 }, { t: w(id, 106) - 0.1, sfx: "ping", vol: 0.24 }, { t: w(id, 108), sfx: "pop", vol: 0.22 }, { t: w(id, 114), sfx: "glitch-1", vol: 0.16 }],
  });
}

// ================= s11 · hoy compran desde el celular =================
{
  const id = "s11-celular";
  escena(id, {
    html: `
      ${pill(1, 250, 1650, `<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><path d="M30 6 A18 18 0 1 0 38 30 A14 14 0 0 1 30 6 Z" fill="${CR}"/></svg>23:40`)}
      ${pill(2, 820, 1650, "sin moverse", "g")}
      ${pill(3, 300, 1610, "Online", "lleno")}
      ${pill(4, 790, 1610, "Mostrador", "r")}`,
    js: `
      nota(1, ${w(id, 122)});
      nota(2, ${w(id, 124)});
      fuera(qa(".n1, .n2"), ${w(id, 126) - 0.1}, 0.2);
      nota(3, ${w(id, 128)});
      nota(4, ${w(id, 132)});
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 118), sfx: "notification", vol: 0.22, max: 1.2 }, { t: w(id, 122), sfx: "pop", vol: 0.22 }, { t: w(id, 124), sfx: "pop", vol: 0.2 }, { t: w(id, 128), sfx: "click-soft", vol: 0.25 }, { t: w(id, 132), sfx: "pop", vol: 0.22 }],
  });
}

// ================= s12 · tu tienda online =================
{
  const id = "s12-tienda";
  escena(id, {
    html: `
      ${pill(1, 540, 1620, `${tick(24)}Tienda online`, "lleno grande")}
      ${pill(2, 830, 1200, `${tick(22)}Envíos`, "g")}
      ${pill(3, 290, 1240, `${tick(22)}Mercado Pago`, "g")}
`,
    js: `
      nota(1, ${w(id, 140)});
      nota(2, ${w(id, 143)});
      nota(3, ${w(id, 145)});
      finTodo();`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 140), sfx: "ping", vol: 0.25 }, { t: w(id, 143), sfx: "pop", vol: 0.22 }, { t: w(id, 145), sfx: "pop", vol: 0.22 }],
  });
}

// ================= s13 · cierre: videollamada =================
{
  const id = "s13-cta";
  escena(id, {
    css: `
    P .t0 { position: absolute; left: 0; right: 0; top: 190px; text-align: center; font: 700 64px/1.15 "Lexend", sans-serif; color: ${CR}; opacity: 0; }
    P .t1 { position: absolute; left: 0; right: 0; top: 400px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; opacity: 0; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }
    P .t2w { position: absolute; left: 0; right: 0; top: 548px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 750px; text-align: center; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; opacity: 0; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }`,
    html: `
      <div class="t0">¿Querés ver cómo quedaría<br>en tu local?</div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
    js: `
      tl.fromTo(q(".t0"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.05);
      tl.to(q(".t0"), { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" }, ${w(id, 154) + 0.3});
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${w(id, 154) + 0.45});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${w(id, 156)});
      caja(".sb", ${w(id, 157)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${w(id, 159)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, ${w(id, 159) + 0.6});`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.24, max: 0.7 }, { t: w(id, 154), sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 157), sfx: "click-soft", vol: 0.28 }, { t: w(id, 159), sfx: "chime", vol: 0.3 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
