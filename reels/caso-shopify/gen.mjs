// Generador de escenas de reels/caso-shopify (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" sobre fondo CREMA liso (copiado de caso-toyota y caso-starbucks): un objeto
// grande relleno por escena, navy y verde con lado oscuro y sombra plana, que se transforma:
// tabla de snowboard gigante → la tabla en una tienda online → tres programas donde no entra →
// su propio programa con el hueco a la medida de la tabla → cuatro tiendas → "</>" con tiendas
// alrededor y "Shopify" en letras de marca de Scalerics → el encastre: hueco cuadrado genérico
// contra la tabla, el hueco cambia de forma → tu negocio (un local) contra el hueco cuadrado →
// el hueco toma la forma del local y aparecen los módulos → videollamada.
// Shopify se NOMBRA pero no se dibuja su logo, sus colores ni su tipografía.
// Los tiempos salen de las palabras: w(i) = segundo de la palabra i relativo a la escena.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const START = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
let T0 = 0;
const w = (i) => r2(Math.max(0, pal[i].start - T0));
const desde = (id) => { T0 = START[id]; };
const D = (id) => ESC[id];

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", CR2 = "#dcdacb", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", W = "#ffffff", GRIS = "#b4b2a3";
const SOMBRA = "rgba(11,18,32,0.16)";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 60) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="60" fill="${RED}"/><path d="M38 38 L82 82 M82 38 L38 82" stroke="#fff" stroke-width="14" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const sombra = (cls, x, y, ww, h) => `<div class="sombra ${cls}" style="left:${x - ww / 2}px;top:${y - h / 2}px;width:${ww}px;height:${h}px"></div>`;
const avatar = (s, fondo = NAVY2, fig = CR) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;

// La tabla de snowboard (viewBox -430 -130 860 280; la cara mide 820 x 220, centrada en 0,0)
const TABLA_IN = `
  <rect x="-410" y="-92" width="820" height="220" rx="110" fill="${NAVY}"/>
  <rect x="-410" y="-110" width="820" height="220" rx="110" fill="${NAVY2}"/>
  <rect x="-262" y="-110" width="62" height="220" fill="${G}"/>
  <rect x="200" y="-110" width="62" height="220" fill="${G}"/>
  <rect x="-330" y="-90" width="660" height="18" rx="9" fill="rgba(255,255,255,0.16)"/>
  <rect x="-160" y="-78" width="112" height="156" rx="34" fill="${CR}" stroke="${NAVY}" stroke-width="8"/>
  <rect x="48" y="-78" width="112" height="156" rx="34" fill="${CR}" stroke="${NAVY}" stroke-width="8"/>
  <rect x="-168" y="-30" width="128" height="22" rx="8" fill="${NAVY}"/><rect x="-168" y="16" width="128" height="22" rx="8" fill="${NAVY}"/>
  <rect x="40" y="-30" width="128" height="22" rx="8" fill="${NAVY}"/><rect x="40" y="16" width="128" height="22" rx="8" fill="${NAVY}"/>`;
const TABLA_VB = "-430 -130 860 280";
// div de la tabla: centro (cx, cy), ancho ww (860 = escala 1), rotación fija rot
const tabla = (cls, cx, cy, ww = 860, rot = 0) => {
  const h = r2((ww * 280) / 860);
  return `<div class="obj ${cls}" style="left:${r2(cx - ww / 2)}px;top:${r2(cy - h / 2)}px;width:${ww}px;height:${h}px"><svg viewBox="${TABLA_VB}" style="transform:rotate(${rot}deg)" aria-hidden="true">${TABLA_IN}</svg></div>`;
};

// El local (tu negocio) (viewBox -290 -270 580 540)
const LOCAL_PATH = "M-250 -110 L-210 -220 H210 L250 -110 V240 H-250 Z";
const LOCAL_IN = `
  <path d="${LOCAL_PATH}" transform="translate(14 18)" fill="${NAVY}"/>
  <path d="${LOCAL_PATH}" fill="${NAVY2}"/>
  <path d="M-250 -110 L-210 -220 H210 L250 -110 Z" fill="${G}"/>
  ${[-225, -175, -125, -75, -25, 25, 75, 125, 175, 225].map((x) => `<circle cx="${x}" cy="-110" r="25" fill="${G}"/>`).join("")}
  <text x="0" y="-146" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="40" letter-spacing="5" fill="${NAVY}">TU NEGOCIO</text>
  <rect x="-200" y="10" width="200" height="140" rx="16" fill="${W}"/>
  <rect x="-200" y="10" width="200" height="34" rx="10" fill="${CR2}"/>
  <rect x="50" y="30" width="140" height="210" rx="14" fill="${CR}"/>
  <circle cx="166" cy="140" r="10" fill="${NAVY}"/>`;
const LOCAL_VB = "-290 -270 580 540";
const local = (cls, cx, cy, ww = 580) => {
  const h = r2((ww * 540) / 580);
  return `<div class="obj ${cls}" style="left:${r2(cx - ww / 2)}px;top:${r2(cy - h / 2)}px;width:${ww}px;height:${h}px"><svg viewBox="${LOCAL_VB}" aria-hidden="true">${LOCAL_IN}</svg></div>`;
};

// íconos de productos para las tiendas (viewBox 0 0 200 200)
const PROD = {
  tabla: `<g transform="translate(100 100) rotate(-35) scale(0.27)">${TABLA_IN}</g>`,
  taza: `<rect x="44" y="62" width="96" height="104" rx="18" fill="${G}"/><rect x="104" y="62" width="36" height="104" rx="14" fill="${GD}"/><path d="M140 88 Q178 88 178 116 Q178 144 140 144" fill="none" stroke="${NAVY2}" stroke-width="14"/><rect x="36" y="52" width="112" height="22" rx="10" fill="${NAVY2}"/>`,
  remera: `<path d="M62 40 L88 30 Q100 50 112 30 L138 40 L176 76 L150 100 L140 90 V172 H60 V90 L50 100 L24 76 Z" fill="${NAVY2}"/><path d="M118 34 L138 40 L176 76 L150 100 L140 90 V172 H118 Z" fill="${NAVY}"/><rect x="70" y="110" width="60" height="16" rx="8" fill="${G}"/>`,
  maceta: `<path d="M100 104 Q60 60 70 30 Q100 50 100 104 Z" fill="${G}"/><path d="M100 104 Q140 60 136 34 Q104 52 100 104 Z" fill="${GD}"/><path d="M100 104 Q90 70 100 40" stroke="${GD}" stroke-width="8" fill="none"/><path d="M52 104 H148 L134 176 H66 Z" fill="${NAVY2}"/><path d="M116 104 H148 L134 176 H112 Z" fill="${NAVY}"/><rect x="44" y="96" width="112" height="24" rx="10" fill="${NAVY3}"/>`,
};
const tienda = (cls, x, y, prod, s = 450) => `
  <div class="tn ${cls}" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px">
    <div class="tn-lado"></div>
    <div class="tn-cara"><div class="tn-bar"><i></i><i></i><i></i></div>
      <div class="tn-img"><svg viewBox="0 0 200 200" aria-hidden="true">${PROD[prod]}</svg></div>
      <div class="tn-btn" data-layout-allow-overlap><span class="a">Comprar</span><span class="b">${tick(20, NAVY, G)}Vendido</span></div>
    </div>
  </div>`;

// el tablero de encastre (programa) con el hueco: 940 x 780 en (70, 580)
const PAN = { x: 70, y: 580, w: 940, h: 780 };
const HC = [540, 1090]; // centro del hueco
const panel = (rot = "PROGRAMA GENÉRICO", arriba = false) => `
  <div class="pan"><div class="pan-lado"></div><div class="pan-cara"></div>
  <div class="pan-rot ${arriba ? "arriba" : ""}"><span class="r1">${rot}</span><span class="r2">A SU MEDIDA</span></div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .obj { position: absolute; }
    ${P} .obj svg { width: 100%; height: 100%; display: block; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: ${SOMBRA}; }
    ${P} .pill { position: absolute; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${W}; font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.navy { background: ${NAVY}; border-color: ${NAVY}; color: ${CR}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .tag { position: absolute; left: 0; right: 0; text-align: center; font: 600 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${NAVY}; opacity: 0; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.2); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .tn { position: absolute; }
    ${P} .tn-lado { position: absolute; left: 16px; top: 18px; width: 100%; height: 100%; border-radius: 44px; background: ${CR2}; }
    ${P} .tn-cara { position: absolute; inset: 0; border-radius: 44px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    ${P} .tn-bar { position: absolute; left: 0; top: 0; right: 0; height: 64px; background: ${NAVY}; }
    ${P} .tn-bar i { position: absolute; top: 20px; width: 22px; height: 22px; border-radius: 50%; background: ${CR}; }
    ${P} .tn-bar i:nth-child(1) { left: 26px; } ${P} .tn-bar i:nth-child(2) { left: 60px; } ${P} .tn-bar i:nth-child(3) { left: 94px; background: ${G}; }
    ${P} .tn-img { position: absolute; left: 22px; right: 22px; top: 84px; bottom: 112px; border-radius: 28px; background: ${CR}; }
    ${P} .tn-img svg { position: absolute; left: 50%; top: 50%; width: 92%; height: 92%; transform: translate(-50%, -50%); overflow: visible; }
    ${P} .tn-btn { position: absolute; left: 22px; right: 22px; bottom: 20px; height: 76px; border-radius: 38px; background: ${NAVY}; overflow: hidden; }
    ${P} .tn-btn span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 12px; font: 700 36px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .tn-btn .b { background: ${G}; color: ${NAVY}; opacity: 0; }
    ${P} .pan { position: absolute; left: ${PAN.x}px; top: ${PAN.y}px; width: ${PAN.w}px; height: ${PAN.h}px; }
    ${P} .pan-lado { position: absolute; left: 18px; top: 20px; width: 100%; height: 100%; border-radius: 60px; background: ${CR2}; }
    ${P} .pan-cara { position: absolute; inset: 0; border-radius: 60px; background: ${W}; border: 8px solid ${NAVY}; }
    ${P} .pan-rot { position: absolute; left: 0; right: 0; bottom: 34px; height: 60px; text-align: center; }
    ${P} .pan-rot.arriba { bottom: auto; top: 34px; }
    ${P} .pan-rot span { position: absolute; left: 50%; top: 0; transform: translateX(-50%); padding: 12px 26px; border-radius: 16px; white-space: nowrap; font: 600 36px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; }
    ${P} .pan-rot .r1 { background: ${CR2}; color: rgba(11,18,32,0.7); }
    ${P} .pan-rot .r2 { background: ${G}; color: ${NAVY}; opacity: 0; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const late = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const sacude = (s, t) => tl.to(typeof s === "string" ? qa(s) : s, { keyframes: { x: [0, -22, 20, -14, 10, 0] }, duration: 0.36, ease: "none" }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: Math.max(0.12, DUR - t), ease: "power2.in" }, t);
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
// cuadro 0: la pregunta entera en grande + la tabla gigante en diagonal
desde("s01-gancho");
const T1 = { cx: 540, cy: 1110, w: 1000, rot: -16 };
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 100px; text-align: center; font: 800 100px/1.08 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 132px; line-height: 1.05; }
    P .tit .v { display: inline-block; background: ${G}; padding: 0 24px 10px; border-radius: 20px; margin-top: 10px; }
    P .bolsa { position: absolute; left: 800px; top: 680px; width: 200px; height: 200px; opacity: 0; }`,
  html: `
      ${sombra("sh", 540, 1430, 880, 56)}
      ${tabla("t0", T1.cx, T1.cy, T1.w, T1.rot)}
      <svg class="bolsa" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="96" fill="${NAVY}"/><path d="M40 62 H62 L80 128 H146 L160 78 H70" fill="none" stroke="${G}" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/><circle cx="88" cy="150" r="11" fill="${G}"/><circle cx="138" cy="150" r="11" fill="${G}"/></svg>
      <div class="tit"><div>¿Por qué una tienda</div><div class="gr">de snowboard</div><div>terminó siendo</div><div class="gr"><span class="v">Shopify?</span></div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".t0"), { x: 60, y: 30, scale: 0.97, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      // "snowboard": la tabla salta
      tl.to(q(".t0"), { y: -40, rotation: -4, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, ${r2(w(5) - 0.05)});
      tl.to(q(".sh"), { scaleX: 0.85, opacity: 0.6, duration: 0.22, yoyo: true, repeat: 1 }, ${r2(w(5) - 0.05)});
      // "tienda" / "Shopify": la bolsa de compras
      pop(".bolsa", ${r2(w(3))}, 0.32, 0.3);
      late(".tit .v", ${r2(w(8))}, 1.08);
      tl.to(q(".bolsa"), { rotation: 10, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${r2(w(8))});
      // salida: el título sube, la bolsa se va
      const V = ${r2(D("s01-gancho") - 0.3)};
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, V);
      tl.to(q(".bolsa"), { opacity: 0, scale: 0.5, duration: 0.2 }, V);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.2 }, { t: r2(w(5) - 0.05), sfx: "whoosh-short", vol: 0.22 }, { t: w(3), sfx: "click-soft", vol: 0.22 }, { t: w(8), sfx: "ping", vol: 0.26 }],
});

// ================= s02 · querían vender tablas por internet =================
desde("s02-tablas");
const T2 = { cx: 540, cy: 900, w: 720, rot: -8 };
escena("s02-tablas", {
  css: `
    P .win { position: absolute; left: 70px; top: 600px; width: 940px; height: 800px; }
    P .win-lado { position: absolute; left: 18px; top: 20px; width: 100%; height: 100%; border-radius: 56px; background: ${CR2}; }
    P .win-cara { position: absolute; inset: 0; border-radius: 56px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    P .win-bar { position: absolute; left: 0; top: 0; right: 0; height: 96px; background: ${NAVY}; }
    P .win-bar i { position: absolute; top: 34px; width: 28px; height: 28px; border-radius: 50%; background: ${CR}; }
    P .win-url { position: absolute; left: 170px; right: 40px; top: 24px; height: 48px; border-radius: 24px; background: ${NAVY3}; }
    P .win-img { position: absolute; left: 36px; right: 36px; top: 124px; height: 380px; border-radius: 36px; background: ${CR}; }
    P .win-nom { position: absolute; left: 50px; top: 536px; font: 800 58px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; opacity: 0; }
    P .win-btn { position: absolute; left: 36px; right: 36px; top: 640px; height: 120px; border-radius: 60px; background: ${NAVY}; overflow: hidden; opacity: 0; }
    P .win-btn span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 16px; font: 800 52px/1 "Lexend", sans-serif; color: ${CR}; }
    P .win-btn .b { background: ${G}; color: ${NAVY}; opacity: 0; }
    P .cur { position: absolute; left: 640px; top: 1300px; width: 110px; height: 110px; opacity: 0; }`,
  html: `
      <div class="win"><div class="win-lado"></div><div class="win-cara">
        <div class="win-bar"><i style="left:34px"></i><i style="left:76px"></i><i style="left:118px;background:${G}"></i><div class="win-url"></div></div>
        <div class="win-img"></div>
        <div class="win-nom">Tabla de snowboard</div>
        <div class="win-btn" data-layout-allow-overlap><span class="a">Comprar</span><span class="b">${tick(30, NAVY, G)}Comprado</span></div>
      </div></div>
      ${tabla("t0", T2.cx, T2.cy, T2.w, T2.rot)}
      <svg class="cur" viewBox="0 0 110 110" aria-hidden="true"><path d="M20 10 L20 92 L42 72 L58 104 L74 96 L58 66 L88 64 Z" fill="${NAVY}" stroke="${W}" stroke-width="6" stroke-linejoin="round"/></svg>`,
  js: `
      // la tabla gigante de s01 entra a la tienda online
      tl.fromTo(q(".t0"), { x: ${T1.cx - T2.cx}, y: ${T1.cy - T2.cy}, scale: ${r2(T1.w / T2.w)}, rotation: ${T1.rot - T2.rot}, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.55, ease: "power3.inOut" }, 0);
      tl.fromTo(q(".win"), { opacity: 0, scale: 0.85, y: 80, transformOrigin: "50% 40%" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0.15);
      // "vender": nombre y botón
      tl.fromTo(q(".win-nom"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, ${r2(w(12) - 0.1)});
      tl.fromTo(q(".win-btn"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }, ${r2(w(13) - 0.1)});
      // "internet": el cursor toca Comprar
      tl.fromTo(q(".cur"), { opacity: 0, x: 140, y: 120 }, { opacity: 1, x: 0, y: 0, duration: 0.35, ease: "power3.out" }, ${r2(w(14) - 0.2)});
      tl.to(q(".cur"), { scale: 0.85, transformOrigin: "20% 10%", duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(15) + 0.1)});
      tl.to(q(".win-btn .b"), { opacity: 1, duration: 0.12 }, ${r2(w(15) + 0.16)});
      late(".win-btn", ${r2(w(15) + 0.16)}, 1.04);
      tl.to(q(".t0"), { y: -16, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r2(w(15) + 0.2)});
      // salida: la ventana se va, la tabla sube a su lugar de s03
      const V = ${r2(D("s02-tablas") - 0.3)};
      tl.to(qa(".win, .cur"), { opacity: 0, y: 120, duration: 0.28, ease: "power2.in" }, V);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(w(13) - 0.1), sfx: "pop", vol: 0.2 }, { t: r2(w(15) + 0.12), sfx: "click", vol: 0.26 }, { t: r2(w(15) + 0.2), sfx: "ping", vol: 0.22 }],
});

// ================= s03 · ningún programa de tienda les servía =================
desde("s03-ninguno");
const T3 = { cx: 540, cy: 760, w: 820, rot: 0 };
const PZ = [210, 540, 870]; // centros x de los tres programas
const HUECOS = [
  `<circle cx="150" cy="210" r="78" fill="${NAVY}"/>`,
  `<rect x="72" y="132" width="156" height="156" rx="22" fill="${NAVY}"/>`,
  `<path d="M150 124 L236 290 H64 Z" fill="${NAVY}" stroke="${NAVY}" stroke-width="16" stroke-linejoin="round"/>`,
];
escena("s03-ninguno", {
  css: `
    P .pg { position: absolute; top: 980px; width: 300px; height: 380px; }
    P .pg-lado { position: absolute; left: 12px; top: 14px; width: 100%; height: 100%; border-radius: 40px; background: ${CR2}; }
    P .pg-cara { position: absolute; inset: 0; border-radius: 40px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    P .pg-cara svg { position: absolute; left: 0; top: 0; width: 300px; height: 380px; }
    P .pg-t { position: absolute; left: 0; right: 0; top: 36px; text-align: center; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.65); }
    P .x { position: absolute; top: 1120px; width: 120px; height: 120px; opacity: 0; }`,
  html: `
      ${PZ.map((x, i) => `<div class="pg p${i}" style="left:${x - 150}px"><div class="pg-lado"></div><div class="pg-cara"><div class="pg-t">PROGRAMA ${i + 1}</div><svg viewBox="0 0 300 380" aria-hidden="true">${HUECOS[i]}</svg></div></div>`).join("")}
      ${PZ.map((x, i) => `<div class="x x${i}" style="left:${x - 60}px">${cruz(60)}</div>`).join("")}
      ${tabla("t0", T3.cx, T3.cy, T3.w, T3.rot)}
      ${pill(1, 540, 1480, "No les servía", "rl")}`,
  js: `
      tl.fromTo(q(".t0"), { x: ${T2.cx - T3.cx}, y: ${T2.cy - T3.cy}, scale: ${r2(T2.w / T3.w)}, rotation: ${T2.rot}, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.4, ease: "power3.inOut" }, 0);
      qa(".pg").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, 0.05 + i * 0.07));
      // la tabla prueba cada programa: baja, no entra, vuelve
      const T = [0.42, 0.98, 1.5];
      [${PZ.join(",")}].forEach((x, i) => {
        tl.to(q(".t0"), { x: x - 540, y: 300, scale: 0.42, duration: 0.2, ease: "power2.in" }, T[i]);
        tl.to(q(".t0"), { x: 0, y: 0, scale: 1, duration: 0.24, ease: "power2.out" }, T[i] + 0.22);
        sacude(".p" + i, T[i] + 0.2);
        pop(".x" + i, T[i] + 0.2, 0.26, 0.4);
      });
      pop(".n1", ${r2(Math.max(1.75, w(21) + 0.2))});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.62, sfx: "glitch-1", vol: 0.12, max: 0.3 }, { t: 1.18, sfx: "glitch-1", vol: 0.12, max: 0.3 }, { t: 1.7, sfx: "glitch-1", vol: 0.12, max: 0.3 }],
});

// ================= s04 · así que hicieron el suyo, a su medida =================
desde("s04-suyo");
const T4 = { cx: HC[0], cy: HC[1], w: 860 };
const HUECO_TABLA = { x: HC[0] - 422, y: HC[1] - 122, w: 844, h: 244, rx: 122 };
escena("s04-suyo", {
  css: `
    P .cod { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .chip { position: absolute; left: 540px; top: 770px; padding: 14px 30px; border-radius: 20px; background: ${NAVY}; font: 800 64px/1 "IBM Plex Mono", monospace; color: ${G}; transform: translate(-50%, -50%); opacity: 0; }
    P .ok { position: absolute; left: 870px; top: 900px; opacity: 0; }`,
  html: `
      ${panel("SU PROPIO PROGRAMA")}
      <svg class="cod" viewBox="0 0 1080 1920" aria-hidden="true">
        ${[[150, 880, 380, G], [190, 940, 520, NAVY2], [190, 1000, 300, NAVY3], [150, 1060, 460, G], [190, 1120, 560, NAVY2], [190, 1180, 340, NAVY3], [150, 1240, 260, G]].map(([x, y, l, c], i) => `<rect class="cl c${i}" x="${x}" y="${y}" width="${l}" height="30" rx="15" fill="${c}"/>`).join("")}
        <rect class="hq" x="${HUECO_TABLA.x}" y="${HUECO_TABLA.y}" width="${HUECO_TABLA.w}" height="${HUECO_TABLA.h}" rx="${HUECO_TABLA.rx}" fill="${NAVY}" opacity="0"/>
        <rect class="hl" x="${HUECO_TABLA.x}" y="${HUECO_TABLA.y}" width="${HUECO_TABLA.w}" height="${HUECO_TABLA.h}" rx="${HUECO_TABLA.rx}" fill="none" stroke="${NAVY}" stroke-width="8" stroke-dasharray="26 18"/>
        <g class="reg"><path class="rl" d="M${HUECO_TABLA.x} 1240 H${HUECO_TABLA.x + HUECO_TABLA.w}" stroke="${G}" stroke-width="10" stroke-linecap="round"/>
        <path class="rt" d="M${HUECO_TABLA.x} 1218 V1262 M${HUECO_TABLA.x + HUECO_TABLA.w} 1218 V1262" stroke="${G}" stroke-width="10" stroke-linecap="round"/></g>
      </svg>
      <div class="chip">&lt;/&gt;</div>
      ${tabla("t0", T4.cx, T4.cy, T4.w)}
      <div class="ok">${tick(56)}</div>
      ${pill(1, 540, 1480, "A su medida", "lleno")}`,
  js: `
      // la tabla queda arriba (donde estaba en s03) y aparece su propio programa
      gsap.set(q(".t0"), { y: ${T3.cy - T4.cy}, scale: ${r2(T3.w / T4.w)}, transformOrigin: "50% 50%" });
      tl.to(q(".t0"), { y: ${T3.cy - T4.cy - 120}, duration: 0.35, ease: "power2.out" }, 0);
      tl.fromTo(q(".pan"), { opacity: 0, scale: 0.85, y: 80, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, 0.02);
      // "hicieron": se escribe código
      tl.fromTo(q(".chip"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)" }, ${r2(w(24) - 0.08)});
      qa(".cl").forEach((c, i) => tl.fromTo(c, { attr: { width: 0 } }, { attr: { width: c.getAttribute("width") }, duration: 0.18, ease: "power2.out" }, ${r2(w(24))} + i * 0.06));
      // "el suyo": el código se vuelve el hueco con la forma de la tabla
      dibujar(".hl", ${r2(w(25))}, 0.4);
      tl.to(qa(".cl"), { opacity: 0, duration: 0.2 }, ${r2(w(26) - 0.05)});
      tl.to(q(".hq"), { opacity: 1, duration: 0.2 }, ${r2(w(26) + 0.2)});
      tl.to(q(".chip"), { opacity: 0, y: -30, duration: 0.2 }, ${r2(w(27) - 0.1)});
      // "a su medida": regla y la tabla entra justo
      dibujar(".rl", ${r2(w(27))}, 0.3); dibujar(".rt", ${r2(w(27))}, 0.2);
      tl.to(q(".t0"), { y: 0, scale: 1, duration: 0.32, ease: "power3.in" }, ${r2(w(28) - 0.1)});
      tl.to(q(".pan"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(28) + 0.22)});
      tl.to(q(".pan-cara"), { borderColor: "${G}", duration: 0.15 }, ${r2(w(28) + 0.22)});
      pop(".ok", ${r2(w(29) + 0.1)}, 0.3, 0.3);
      pop(".n1", ${r2(w(29) + 0.15)});`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: w(24), sfx: "typing", vol: 0.16, max: 0.6 }, { t: w(26), sfx: "click-soft", vol: 0.22 }, { t: r2(w(28) + 0.22), sfx: "impact-bass-1", vol: 0.26, max: 0.6 }, { t: r2(w(29) + 0.1), sfx: "ping", vol: 0.24 }],
});

// ================= s05 · otros comerciantes lo quisieron usar =================
desde("s05-otros");
const GRID = [[70, 620, "tabla"], [560, 620, "taza"], [70, 1100, "remera"], [560, 1100, "maceta"]];
escena("s05-otros", {
  css: `
    P .av { position: absolute; width: 112px; height: 112px; opacity: 0; }`,
  html: `
      ${GRID.map(([x, y, p], i) => tienda("g" + i, x, y, p)).join("")}
      ${GRID.slice(1).map(([x, y], i) => `<div class="av a${i}" style="left:${x + 360}px;top:${y - 30}px">${avatar(112, NAVY, G)}</div>`).join("")}`,
  js: `
      // el programa con la tabla se achica y queda como la primera tienda
      tl.fromTo(q(".g0"), { x: 245, y: 245, scale: 1.9, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.inOut" }, 0);
      // "comerciantes": aparecen las otras tiendas, cada una con su dueño
      qa(".g1, .g2, .g3").forEach((g, i) => tl.fromTo(g, { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, ${r2(w(31) - 0.05)} + i * 0.12));
      qa(".av").forEach((a, i) => pop(a, ${r2(w(33) - 0.15)} + i * 0.1, 0.3, 0.3));
      // "usar": todas venden
      qa(".tn-btn .b").forEach((b, i) => tl.to(b, { opacity: 1, duration: 0.12 }, ${r2(w(34))} + i * 0.1));
      qa(".tn").forEach((t, i) => late(t, ${r2(w(34))} + i * 0.1, 1.04));`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(31) - 0.05), sfx: "pop", vol: 0.2 }, { t: r2(w(31) + 0.2), sfx: "pop", vol: 0.18 }, { t: w(34), sfx: "notification", vol: 0.2, max: 0.7 }],
});

// ================= s06 · y ese programa se volvió Shopify =================
desde("s06-shopify");
const RING = Array.from({ length: 8 }, (_, k) => {
  const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
  return [r2(540 + 370 * Math.cos(a)), r2(900 + 340 * Math.sin(a))];
});
escena("s06-shopify", {
  css: `
    P .cubo { position: absolute; left: 330px; top: 690px; width: 420px; height: 420px; }
    P .cubo-lado { position: absolute; left: 20px; top: 24px; width: 100%; height: 100%; border-radius: 70px; background: ${NAVY}; }
    P .cubo-cara { position: absolute; inset: 0; border-radius: 70px; background: ${NAVY2}; text-align: center; font: 800 150px/420px "IBM Plex Mono", monospace; color: ${G}; letter-spacing: -0.06em; }
    P .mini { position: absolute; width: 130px; height: 130px; margin: -65px 0 0 -65px; border-radius: 28px; background: ${W}; border: 7px solid ${NAVY}; opacity: 0; }
    P .mini i { position: absolute; left: 0; right: 0; top: 0; height: 26px; background: ${NAVY}; }
    P .mini b { position: absolute; left: 16px; right: 16px; bottom: 16px; height: 30px; border-radius: 15px; background: ${G}; }
    P .mini u { position: absolute; left: 30px; right: 30px; top: 40px; height: 32px; border-radius: 10px; background: ${CR2}; }
    P .nom { position: absolute; left: 0; right: 0; top: 1350px; text-align: center; opacity: 0; }
    P .nom span { position: relative; display: inline-block; padding: 6px 34px 18px; font: 900 150px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .nom .selbox { left: 0; top: 0; right: 0; bottom: 0; }`,
  html: `
      ${GRID.map(([x, y, p], i) => tienda("g" + i, x, y, p)).join("")}
      ${RING.map(([x, y], k) => `<div class="mini m${k}" style="left:${x}px;top:${y}px"><i></i><u></u><b></b></div>`).join("")}
      <div class="cubo"><div class="cubo-lado"></div><div class="cubo-cara">&lt;/&gt;</div></div>
      <div class="nom"><span>${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">Shopify</em></span></div>`,
  js: `
      gsap.set(qa(".tn-btn .b"), { opacity: 1 });
      // "ese programa": las cuatro tiendas se juntan en el programa
      qa(".tn").forEach((t, i) => tl.to(t, { x: [245, -245, 245, -245][i], y: [245, 245, -235, -235][i], scale: 0.3, opacity: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "power3.in" }, 0.05 + i * 0.04));
      tl.fromTo(q(".cubo"), { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, ${r2(Math.max(0.35, w(37)))});
      // "se volvió": salen tiendas para todos lados
      qa(".mini").forEach((m, i) => tl.fromTo(m, { opacity: 0, x: 540 - [${RING.map((p) => p[0]).join(",")}][i], y: 900 - [${RING.map((p) => p[1]).join(",")}][i], scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, ${r2(w(38))} + i * 0.04));
      // "Shopify"
      tl.fromTo(q(".nom"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${r2(w(40) - 0.1)});
      caja(".sb", ${r2(w(40) + 0.1)});
      late(".cubo", ${r2(w(40) + 0.1)}, 1.06);
      salida(${r2(D("s06-shopify") - 0.22)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(Math.max(0.35, w(37))), sfx: "pop", vol: 0.24 }, { t: w(38), sfx: "sparkle", vol: 0.2, max: 0.8 }, { t: r2(w(40) + 0.1), sfx: "impact-bass-1", vol: 0.28, max: 0.7 }],
});

// ================= s07 · fijate: no se adaptaron al software =================
// el encastre: un hueco cuadrado (programa genérico) y la tabla arriba
desde("s07-giro");
const SQ = { x: HC[0] - 160, y: HC[1] - 160, w: 320, h: 320, rx: 40 };
const holeRect = (cls, h, fill = NAVY) => `<rect class="${cls}" x="${h.x}" y="${h.y}" width="${h.w}" height="${h.h}" rx="${h.rx}" fill="${fill}"/>`;
const TARRIBA = 740; // centro de la tabla flotando arriba del tablero
escena("s07-giro", {
  css: `
    P .xg { position: absolute; left: 400px; top: 950px; width: 280px; height: 280px; opacity: 0; }`,
  html: `
      ${panel("PROGRAMA GENÉRICO")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${holeRect("hq", SQ)}</svg>
      ${tabla("t0", HC[0], HC[1], 860)}
      <div class="xg">${cruz(140)}</div>
      ${pill(1, 540, 1480, "A la fuerza", "rl")}`,
  js: `
      gsap.set(q(".t0"), { y: ${TARRIBA - HC[1]}, scale: 0.92, transformOrigin: "50% 50%" });
      tl.fromTo(q(".t0"), { opacity: 0, y: ${TARRIBA - HC[1] - 140}, rotation: -10 }, { opacity: 1, y: ${TARRIBA - HC[1]}, rotation: 0, duration: 0.4, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".pan"), { opacity: 0, scale: 0.85, y: 80, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, 0.05);
      tl.fromTo(q(".hq"), { opacity: 0, scale: 0.5, svgOrigin: "${HC[0]} ${HC[1]}" }, { opacity: 1, scale: 1, svgOrigin: "${HC[0]} ${HC[1]}", duration: 0.3, ease: "back.out(1.6)" }, 0.25);
      // "se adaptaron": la tabla se aprieta para entrar en el cuadrado
      tl.to(q(".t0"), { y: 0, scaleX: 0.36, scaleY: 1.25, duration: 0.4, ease: "power2.in" }, ${r2(w(44) - 0.15)});
      pop(".n1", ${r2(w(44))});
      // "software": no. Cruz y la tabla vuelve a su forma
      pop(".xg", ${r2(w(46) - 0.05)}, 0.3, 1.6);
      tl.to(q(".t0"), { y: ${TARRIBA - HC[1]}, scaleX: 0.92, scaleY: 0.92, duration: 0.35, ease: "back.out(2)" }, ${r2(w(46) + 0.15)});
      fuera(".xg, .n1", ${r2(D("s07-giro") - 0.22)}, 0.18);`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(44) - 0.15), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(46) - 0.05), sfx: "glitch-1", vol: 0.16, max: 0.4 }, { t: r2(w(46) + 0.15), sfx: "pop", vol: 0.2 }],
});

// ================= s08 · hicieron un software que se adaptara a ellos =================
desde("s08-adapta");
escena("s08-adapta", {
  css: `
    P .ok { position: absolute; left: 860px; top: 900px; opacity: 0; }`,
  html: `
      ${panel("PROGRAMA GENÉRICO")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${holeRect("hq", SQ)}</svg>
      ${tabla("t0", HC[0], HC[1], 860)}
      <div class="ok">${tick(56)}</div>
      ${pill(1, 540, 1480, "Se adapta a ellos", "lleno")}`,
  js: `
      gsap.set(q(".t0"), { y: ${TARRIBA - HC[1]}, scale: 0.92, transformOrigin: "50% 50%" });
      // "software": el hueco cambia de forma hasta ser la tabla
      tl.to(q(".hq"), { attr: ${JSON.stringify({ x: HUECO_TABLA.x, y: HUECO_TABLA.y, width: HUECO_TABLA.w, height: HUECO_TABLA.h, rx: HUECO_TABLA.rx })}, duration: 0.55, ease: "back.inOut(1.4)" }, ${r2(w(49) - 0.05)});
      tl.to(q(".pan-rot .r1"), { opacity: 0, duration: 0.1 }, ${r2(w(49) + 0.2)});
      tl.fromTo(q(".pan-rot .r2"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)" }, ${r2(w(49) + 0.3)});
      // "adaptara": la tabla entra justo
      tl.to(q(".t0"), { y: 0, scale: 1, duration: 0.32, ease: "power3.in" }, ${r2(w(52) - 0.15)});
      tl.to(q(".pan"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(52) + 0.17)});
      tl.to(q(".pan-cara"), { borderColor: "${G}", duration: 0.15 }, ${r2(w(52) + 0.17)});
      pop(".ok", ${r2(w(52) + 0.25)}, 0.3, 0.3);
      pop(".n1", ${r2(w(54) + 0.05)});
      // la tabla se va: entra tu negocio
      tl.to(q(".t0"), { opacity: 0, y: -200, scale: 0.6, duration: 0.3, ease: "power2.in" }, ${r2(D("s08-adapta") - 0.32)});
      fuera(".ok, .n1", ${r2(D("s08-adapta") - 0.3)}, 0.2);`,
  sfx: [{ t: r2(w(49) - 0.05), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(w(52) + 0.17), sfx: "impact-bass-1", vol: 0.26, max: 0.6 }, { t: r2(w(52) + 0.25), sfx: "ping", vol: 0.24 }],
});

// ================= s09 · ¿tu negocio no entra en un programa genérico? =================
desde("s09-tu-negocio");
const LW = 470, LARRIBA = 860; // ancho del local y su centro arriba del tablero
const LOCAL_HUECO_S = r2((LW / 580) * 1.04);
escena("s09-tu-negocio", {
  css: `
    P .xg { position: absolute; left: 830px; top: 950px; width: 150px; height: 150px; opacity: 0; }`,
  html: `
      ${panel("PROGRAMA GENÉRICO", true)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${holeRect("hq", SQ)}</svg>
      ${local("l0", HC[0], HC[1], LW)}
      <div class="xg">${cruz(75)}</div>
      ${pill(1, 540, 1480, "No entra", "rl")}`,
  js: `
      // el hueco vuelve a ser cuadrado (otro programa genérico), entra tu negocio
      tl.fromTo(q(".hq"), { attr: ${JSON.stringify({ x: HUECO_TABLA.x, y: HUECO_TABLA.y, width: HUECO_TABLA.w, height: HUECO_TABLA.h, rx: HUECO_TABLA.rx })} }, { attr: ${JSON.stringify({ x: SQ.x, y: SQ.y, width: SQ.w, height: SQ.h, rx: SQ.rx })}, duration: 0.4, ease: "power3.inOut" }, 0);
      tl.fromTo(q(".l0"), { opacity: 0, y: ${LARRIBA - HC[1] - 200}, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, y: ${LARRIBA - HC[1]}, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, ${r2(Math.max(0.05, w(56) - 0.1))});
      // "no entra": baja, choca y rebota
      tl.to(q(".l0"), { y: ${LARRIBA - HC[1] + 110}, duration: 0.16, ease: "power2.in" }, ${r2(w(58) - 0.12)});
      tl.to(q(".l0"), { y: ${LARRIBA - HC[1]}, duration: 0.3, ease: "back.out(2.5)" }, ${r2(w(58) + 0.04)});
      sacude(".pan, .hq", ${r2(w(58) + 0.04)});
      pop(".n1", ${r2(w(58))});
      // "genérico"
      pop(".xg", ${r2(w(62) - 0.05)}, 0.3, 1.6);
      late(".pan-rot .r1", ${r2(w(62))}, 1.1);`,
  sfx: [{ t: r2(Math.max(0.05, w(56) - 0.1)), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(58) + 0.04), sfx: "impact-bass-2", vol: 0.24, max: 0.5 }, { t: r2(w(62) - 0.05), sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s10 · hacemos el sistema a la medida de cómo trabajás =================
desde("s10-medida");
const MODS = [[290, 1470, "Stock"], [790, 1470, "Pedidos"], [290, 1590, "Proveedores"], [790, 1590, "Caja"]];
escena("s10-medida", {
  css: `
    P .ok { position: absolute; left: 850px; top: 860px; opacity: 0; }
    P .mod { position: absolute; display: flex; align-items: center; gap: 14px; padding: 12px 30px 12px 14px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${W}; font: 700 42px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; transform: translate(-50%, -50%); }`,
  html: `
      ${panel("PROGRAMA GENÉRICO", true)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${holeRect("hq", SQ)}
        <g class="hl" opacity="0"><path d="${LOCAL_PATH}" transform="translate(${HC[0]} ${HC[1]}) scale(${LOCAL_HUECO_S})" fill="${NAVY}"/></g>
      </svg>
      ${local("l0", HC[0], HC[1], LW)}
      <div class="ok">${tick(56)}</div>
      ${MODS.map(([x, y, t], i) => `<div class="mod m${i}" style="left:${x}px;top:${y}px">${tick(24)}${t}</div>`).join("")}`,
  js: `
      gsap.set(q(".l0"), { y: ${LARRIBA - HC[1]}, transformOrigin: "50% 50%" });
      tl.to(q(".l0"), { y: ${LARRIBA - HC[1] - 30}, duration: 0.4, ease: "sine.inOut" }, 0);
      // "sistema": el hueco cuadrado toma la forma del local
      tl.to(q(".hq"), { scale: 1.5, opacity: 0, svgOrigin: "${HC[0]} ${HC[1]}", duration: 0.35, ease: "power2.in" }, ${r2(w(65) - 0.1)});
      tl.fromTo(q(".hl"), { opacity: 0, scale: 0.4, svgOrigin: "${HC[0]} ${HC[1]}" }, { opacity: 1, scale: 1, svgOrigin: "${HC[0]} ${HC[1]}", duration: 0.4, ease: "back.out(1.6)" }, ${r2(w(65) + 0.05)});
      tl.to(q(".pan-rot .r1"), { opacity: 0, duration: 0.1 }, ${r2(w(65) + 0.1)});
      tl.fromTo(q(".pan-rot .r2"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)" }, ${r2(w(65) + 0.2)});
      // "medida": el local entra justo
      tl.to(q(".l0"), { y: 0, duration: 0.3, ease: "power3.in" }, ${r2(w(68) - 0.1)});
      tl.to(q(".pan"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(68) + 0.2)});
      tl.to(q(".pan-cara"), { borderColor: "${G}", duration: 0.15 }, ${r2(w(68) + 0.2)});
      pop(".ok", ${r2(w(68) + 0.25)}, 0.3, 0.3);
      // "cómo trabajás": los módulos del sistema
      qa(".mod").forEach((m, i) => tl.fromTo(m, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ${r2(w(70) - 0.15)} + i * 0.1));`,
  sfx: [{ t: r2(w(65) - 0.1), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(w(68) + 0.2), sfx: "impact-bass-1", vol: 0.26, max: 0.6 }, { t: r2(w(68) + 0.25), sfx: "ping", vol: 0.22 }, { t: r2(w(70) - 0.15), sfx: "pop", vol: 0.2 }, { t: r2(w(70) + 0.15), sfx: "pop", vol: 0.18 }],
});

// ================= s11 · CTA =================
desde("s11-cta");
escena("s11-cta", {
  css: `
    P .preg { position: absolute; left: 0; right: 0; top: 210px; text-align: center; font: 800 104px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; opacity: 0; }
    P .preg .v { display: inline-block; background: ${G}; padding: 0 18px 6px; border-radius: 16px; }
    P .vc { position: absolute; left: 79px; top: 580px; width: 922px; height: 480px; border-radius: 70px; background: ${NAVY}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 598px; width: 922px; height: 480px; border-radius: 70px; background: ${CR2}; opacity: 0; }
    P .vc-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 56px; background: ${NAVY2}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 396px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .vc-a .lc { position: absolute; left: 150px; top: 40px; width: 260px; height: 242px; }
    P .vc-a .lc svg { width: 100%; height: 100%; display: block; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: ${NAVY}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 268px; height: 220px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 680px; top: 272px; width: 124px; height: 124px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 28px; top: 36px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1130px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1276px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 80px; right: 80px; top: 1472px; height: 170px; border-radius: 85px; background: ${G}; border: 8px solid ${NAVY}; text-align: center; font: 800 104px/150px "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; opacity: 0; }`,
  html: `
      <div class="capa bz">${panel("A SU MEDIDA", true)}${local("l0", HC[0], HC[1], LW)}</div>
      <div class="preg"><div>¿Lo vemos</div><div>con tu <span class="v">caso?</span></div></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><div class="lc" data-layout-ignore><svg viewBox="${LOCAL_VB}" aria-hidden="true">${LOCAL_IN}</svg></div><div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      gsap.set(q(".pan-rot .r1"), { opacity: 0 }); gsap.set(q(".pan-rot .r2"), { opacity: 1 });
      gsap.set(q(".pan-cara"), { borderColor: "${G}" });
      const B = q(".bz");
      tl.fromTo(q(".preg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.05);
      late(".preg .v", ${r2(w(76))}, 1.08);
      // el tablero con tu local se achica y se vuelve la videollamada
      tl.to(B, { scale: 0.5, y: -160, opacity: 0, transformOrigin: "540px 1000px", duration: 0.5, ease: "power3.inOut" }, ${r2(w(76) + 0.2)});
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, ${r2(w(76) + 0.5)});
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, ${r2(w(76) + 0.65)});
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(79) - 0.1)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(80) - 0.1)});
      caja(".sb", ${r2(w(80) + 0.1)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(82) - 0.15)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(82) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(82) + 0.4)});`,
  sfx: [{ t: r2(w(76) + 0.2), sfx: "whoosh", vol: 0.24, max: 0.7 }, { t: r2(w(76) + 0.65), sfx: "pop", vol: 0.22 }, { t: r2(w(79) - 0.1), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(80) + 0.1), sfx: "click-soft", vol: 0.28 }, { t: r2(w(82) - 0.15), sfx: "chime", vol: 0.3 }],
});

console.log("escenas escritas:", Object.keys(ESC).filter((id) => fs.existsSync(`compositions/${id}.html`)).join(", "));
