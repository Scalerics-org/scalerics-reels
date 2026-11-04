// Generador de escenas de reels/por-que-concurrido (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Estilo "resultaaquee" (forma de por-que-la-tarjeta y
// por-que-el-precio) con el cuadro entero como pantalla de celular (el marco lo pone armar.mjs).
// Protagonista: UNA tarjeta grande (x 60-1020, y 540-1680) que cambia de pantalla:
// mapa genérico + horarios concurridos → gente que comparte ubicación → barras por hora →
// (se da vuelta) caja con las ventas de hoy → ventas por hora y día → equipo en caja →
// martes 15 h → panel a medida (mapa de calor) → turnos → videollamada.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#9aa1ad", MAPA = "#d9d7ca";
const HEAT = ["#dcdbd0", "#c3e8a9", "#8fdc5c", G];

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h) => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const avatar = (s = 140, fondo = CR, fig = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;
// persona de pie (viewBox 60 x 70)
const persona = (c = NAVY) => `<svg width="76" height="88" viewBox="0 0 60 70" aria-hidden="true"><circle cx="30" cy="16" r="14" fill="${c}"/><path d="M6 70 Q6 34 30 34 Q54 34 54 70 Z" fill="${c}"/></svg>`;

// tarjeta grande: global (60, 540), 960 x 1140
const CX = 60, CY = 540, CWID = 960, CH = 1140;

// ---- mapa genérico (viewBox 960 x 1140), el local en (480, 560) ----
const PIN = { x: 480, y: 560 };
const MAPA_SVG = `
  <svg class="mapa-svg" width="960" height="1140" viewBox="0 0 960 1140" aria-hidden="true">
    <rect width="960" height="1140" fill="${MAPA}"/>
    <rect x="290" y="360" width="390" height="400" rx="18" fill="#cfccbd"/>
    <rect x="-20" y="-20" width="240" height="310" rx="18" fill="#cfccbd"/>
    <rect x="290" y="-20" width="390" height="310" rx="18" fill="#cfccbd"/>
    <rect x="-20" y="360" width="240" height="400" rx="18" fill="#cfccbd"/>
    <rect x="770" y="360" width="210" height="400" rx="18" fill="#c9e7b2"/>
    <rect x="-20" y="850" width="240" height="320" rx="18" fill="#cfccbd"/>
    <rect x="290" y="850" width="390" height="320" rx="18" fill="#cfccbd"/>
    <rect x="770" y="850" width="210" height="320" rx="18" fill="#cfccbd"/>
    <rect x="770" y="-20" width="210" height="310" rx="18" fill="#cfccbd"/>
    <path d="M-20 325 H980 M-20 805 H980 M255 -20 V1160 M725 -20 V1160" stroke="#ffffff" stroke-width="58" fill="none"/>
    <g transform="translate(${PIN.x} ${PIN.y + 70})">
      <rect x="-110" y="-60" width="220" height="130" rx="12" fill="${NAVY3}"/>
      <path d="M-124 -60 H124 L110 -22 H-110 Z" fill="${G}"/>
      <rect x="-30" y="0" width="60" height="70" rx="6" fill="${CR}"/>
    </g>
  </svg>`;
const PINSVG = `<svg class="pin" width="140" height="170" viewBox="-70 -170 140 170" aria-hidden="true"><path d="M0 0 Q-62 -76 -62 -110 Q-62 -166 0 -166 Q62 -166 62 -110 Q62 -76 0 0 Z" fill="${G}" stroke="${NAVY}" stroke-width="8"/><circle cx="0" cy="-110" r="22" fill="${NAVY}"/></svg>`;

// barras de "horarios concurridos" (13 horas, 8 a 20 h)
const POP = [18, 28, 42, 60, 88, 100, 82, 55, 48, 62, 74, 58, 30];
const PICO = 5;
const barrasPop = (x0, base, maxH, bw, gap, cls = "bp", vals = POP) =>
  vals.map((v, i) => `<div class="${cls} ${cls}${i}${i === PICO ? " pk" : ""}" style="left:${x0 + i * (bw + gap)}px;top:${base - (maxH * v) / 100}px;width:${bw}px;height:${(maxH * v) / 100}px"></div>`).join("") +
  [0, 4, 8, 12].map((i) => `<div class="hl" style="left:${i === 12 ? x0 + i * (bw + gap) + bw - 120 : x0 + i * (bw + gap) - 30}px;top:${base + 18}px;width:${i === 12 ? 120 : bw + 60}px${i === 12 ? ";text-align:right" : ""}">${8 + i} h</div>`).join("");

// ---- panel de ventas por bloque de 2 horas (6 bloques) ----
const HORAS = ["9 h", "11 h", "13 h", "15 h", "17 h", "19 h"];
const SAB = [30, 62, 100, 74, 52, 40];
const MAR = [36, 46, 58, 20, 30, 34];
const DIAS = ["L", "M", "M", "J", "V", "S", "D"];
const PX0 = 60, PBW = 110, PGAP = 36, PBASE = 700, PMAX = 440; // relativos a la tarjeta
const colX = (i) => PX0 + i * (PBW + PGAP);
const chips = (sel) => DIAS.map((d, i) => `<div class="chip ch${i}${i === sel ? " on" : ""}" style="left:${48 + i * 126}px">${d}</div>`).join("");
const barrasV = (vals) =>
  vals.map((v, i) => `<div class="bv bv${i}" style="left:${colX(i)}px;top:${PBASE - PMAX}px;width:${PBW}px;height:${PMAX}px"></div>`).join("") +
  HORAS.map((h, i) => `<div class="hl" style="left:${colX(i) - 20}px;top:${PBASE + 16}px;width:${PBW + 40}px">${h}</div>`).join("");
// personas en caja: columna i, fila k
const gente = (i, k, cls, c = NAVY) => `<div class="pe ${cls}" style="left:${colX(i) + 17}px;top:${818 + k * 96}px">${persona(c)}</div>`;
const PANEL = (sel, vals, extra = "") => `
      <div class="p-tit">Ventas por hora</div>
      ${chips(sel)}
      <div class="p-linea"></div>
      ${barrasV(vals)}
      <div class="p-eq">EQUIPO EN CAJA</div>
      ${[0, 1, 2, 3, 4, 5].map((i) => gente(i, 0, "base b" + i)).join("")}
      ${extra}`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} * { box-sizing: border-box; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .card-sh { position: absolute; left: ${CX + 18}px; top: ${CY + 22}px; width: ${CWID}px; height: ${CH}px; border-radius: 52px; background: #070c16; }
    ${P} .card { position: absolute; left: ${CX}px; top: ${CY}px; width: ${CWID}px; height: ${CH}px; border-radius: 52px; background: ${CR}; border: 8px solid ${NAVY}; overflow: hidden; }
    ${P} .cin { position: absolute; left: -8px; top: -8px; width: ${CWID}px; height: ${CH}px; }
    ${P} .mapa-svg { position: absolute; left: 0; top: 0; }
    ${P} .pin { position: absolute; left: ${PIN.x - 70}px; top: ${PIN.y - 170}px; transform-origin: 50% 100%; }
    ${P} .hl { position: absolute; text-align: center; font: 600 32px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.7); }
    ${P} .bp { position: absolute; border-radius: 14px 14px 6px 6px; background: ${NAVY3}; transform-origin: 50% 100%; }
    ${P} .bp.pk { background: ${G}; border: 6px solid ${NAVY}; }
    ${P} .bv { position: absolute; border-radius: 18px 18px 8px 8px; background: ${NAVY3}; transform-origin: 50% 100%; }
    ${P} .p-tit { position: absolute; left: 44px; top: 40px; font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .chip { position: absolute; top: 130px; width: 108px; height: 84px; border-radius: 26px; background: #ffffff; border: 6px solid ${GRIS}; font: 800 40px/72px "Lexend", sans-serif; text-align: center; color: rgba(11,18,32,0.55); }
    ${P} .chip.on { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .p-linea { position: absolute; left: 44px; top: ${PBASE}px; width: 872px; height: 6px; border-radius: 3px; background: ${NAVY}; }
    ${P} .p-eq { position: absolute; left: 46px; top: 774px; font: 600 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    ${P} .pe { position: absolute; width: 76px; height: 88px; }
    ${P} .pe svg { display: block; }
    /* notas */
    ${P} .pill { position: absolute; padding: 16px 34px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 44px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.5); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${NAVY}; color: #fff; font-weight: 800; }
    ${P} .pill.cr { background: ${CR}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill svg { vertical-align: -6px; margin-left: 10px; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; } ${P} .lead.n { stroke: ${NAVY}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; } ${P} .dot.n { fill: ${NAVY}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.14); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
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
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.3); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.18 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.08, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const CARD = q(".card"), SH = q(".card-sh");
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
      // barras: alturas como fracción (scaleY) de su alto completo
      const alto = (s, v, t, d) => tl.to(q(s), { scaleY: v, duration: d ?? 0.4, ease: "back.out(1.4)" }, t);
`;

function escena(id, build) {
  const dur = ESC[id];
  const T = (i) => r2(pal[i].start - INI[id]); // segundo de la palabra i, relativo a la escena
  const { css = "", html, js, sfx } = build(T, dur);
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
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map((s) => ({ ...s, t: r2(Math.max(0, s.t)) }))));
}
const TARJ = (contenido, extraCls = "") => `<div class="card-sh"></div><div class="card ${extraCls}"><div class="cin">${contenido}</div></div>`;

// hoja de lugar (s01-s02): global (60, 1080), 960 x 600
const HOJA = `
      <div class="hoja">
        <div class="h-n">Café de la esquina</div>
        <div class="h-s">HORARIOS CONCURRIDOS</div>
        <div class="h-chip">Lleno</div>
        ${barrasPop(42, 500, 300, 50, 20)}
      </div>`;
const HOJA_CSS = `
    P .hoja { position: absolute; left: ${CX}px; top: 1080px; width: ${CWID}px; height: 600px; border-radius: 52px; background: #ffffff; border: 8px solid ${NAVY}; box-shadow: 0 -14px 0 rgba(11,18,32,0.25); }
    P .h-n { position: absolute; left: 40px; top: 36px; font: 800 56px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .h-s { position: absolute; left: 42px; top: 112px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.62); }
    P .h-chip { position: absolute; right: 34px; top: 26px; height: 80px; padding: 0 30px; border-radius: 40px; background: ${RED}; border: 6px solid ${NAVY}; font: 800 42px/68px "Lexend", sans-serif; color: #fff; }
    P .hoja .hl { font-size: 30px; }`;

// ================= s01 · gancho =================
escena("s01-gancho", (T) => ({
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 116px; text-align: center; font: 800 104px/1.02 "Lexend", sans-serif; color: #fff; letter-spacing: -0.045em; text-shadow: 0 6px 0 rgba(3,6,12,0.6); }
    P .tit .v { color: ${G}; }
    ${HOJA_CSS}`,
  html: `${TARJ(MAPA_SVG + PINSVG)}
      ${HOJA}
      <div class="tit"><div>¿Por qué Google</div><div>Maps sabe a qué</div><div><span class="v">hora</span> está <span class="v">lleno?</span></div></div>`,
  js: `
      gsap.set(q(".cin"), { y: -250 });
      // cuadro 0: el gancho entero, el mapa y las barras a medio crecer
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      qa(".bp").forEach((b, i) => tl.fromTo(b, { scaleY: 0.45 }, { scaleY: 1, duration: 0.7, ease: "back.out(1.5)" }, 0.05 + i * 0.05));
      tl.fromTo(q(".pin"), { y: -40, scaleY: 1 }, { y: 0, duration: 0.5, ease: "bounce.out" }, 0);
      tl.fromTo(q(".cin"), { scale: 1 }, { scale: 1.06, transformOrigin: "480px 560px", duration: 3.4, ease: "sine.inOut" }, 0);
      latido(".tit .v", ${T(7)}, 1.07);
      // "lleno": la barra pico y el chip laten
      latido(".bp.pk", ${T(9)}, 1.12);
      tl.fromTo(q(".h-chip"), { scale: 1 }, { scale: 1.15, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${T(9)});
      tl.to(q(".pin"), { scaleY: 0.86, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 1 }, ${T(9) + 0.1});
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, ${T(12) - 0.32});`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.25 }, { t: T(9), sfx: "ping", vol: 0.28 }],
}));

// ================= s02 · ubicación =================
// gente que comparte la ubicación: [x0, y0] en la calle → [x1, y1] en el local (coordenadas de la tarjeta)
const GENTE = [[255, 1140, 330, 640], [-30, 325, 360, 470], [990, 325, 610, 460], [725, -30, 640, 560], [255, -30, 330, 520], [990, 805, 620, 680], [-30, 805, 380, 700], [725, 1170, 520, 720]];
escena("s02-ubicacion", (T) => ({
  css: `
    ${HOJA_CSS}
    P .pp { position: absolute; width: 76px; height: 76px; margin: -38px 0 0 -38px; border-radius: 50%; background: ${NAVY}; border: 9px solid #ffffff; }
    P .pp i { position: absolute; left: 13px; top: 13px; width: 32px; height: 32px; border-radius: 50%; background: ${G}; }
    P .ub { position: absolute; left: 110px; top: 1430px; width: 860px; height: 200px; border-radius: 44px; background: #ffffff; border: 8px solid ${NAVY}; box-shadow: 0 14px 0 rgba(3,6,12,0.45); opacity: 0; }
    P .ub-t { position: absolute; left: 40px; top: 38px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ub-s { position: absolute; left: 42px; top: 112px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: rgba(11,18,32,0.62); }
    P .sw { position: absolute; left: 640px; top: 52px; width: 172px; height: 92px; border-radius: 46px; background: ${GRIS}; border: 6px solid ${NAVY}; }
    P .sw-on { position: absolute; inset: -6px; border-radius: 46px; background: ${G}; border: 6px solid ${NAVY}; opacity: 0; }
    P .sw-k { position: absolute; left: 6px; top: 6px; width: 68px; height: 68px; border-radius: 34px; background: #ffffff; border: 6px solid ${NAVY}; }`,
  html: `${TARJ(MAPA_SVG + GENTE.map((_, k) => `<div class="pp p${k}" style="left:${GENTE[k][0]}px;top:${GENTE[k][1]}px"><i></i></div>`).join("") + PINSVG)}
      ${HOJA}
      <div class="ub"><div class="ub-t">Ubicación</div><div class="ub-s">SOLO SI LA PERSONA QUIERE</div><div class="sw"><div class="sw-on"></div><div class="sw-k"></div></div></div>
      ${pill(1, 540, 1400, "Si lo permite", "lleno")}`,
  js: `
      gsap.set(q(".cin"), { y: -250, scale: 1.06, transformOrigin: "480px 560px" });
      // la hoja baja y el mapa ocupa toda la tarjeta (push-in al local)
      tl.to(q(".hoja"), { y: 900, opacity: 0, duration: 0.5, ease: "power2.in" }, 0);
      tl.to(q(".cin"), { y: 0, scale: 1, duration: 0.7, ease: "power3.inOut" }, 0.05);
      // "ubicación": la gente camina por las calles hacia el local
      ${JSON.stringify(GENTE)}.forEach(([x0, y0, x1, y1], k) => {
        const el = q(".p" + k);
        tl.to(el, { x: x1 - x0, y: y1 - y0, duration: 1.5, ease: "power1.inOut" }, ${T(14)} - 0.1 + k * 0.08);
      });
      // "la gente que lo permite": el interruptor
      tl.fromTo(q(".ub"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, ${T(16) - 0.25});
      tl.to(q(".sw-k"), { x: 80, duration: 0.22, ease: "power2.out" }, ${T(19)});
      tl.to(q(".sw-on"), { opacity: 1, duration: 0.15 }, ${T(19)});
      tl.fromTo(qa(".pp i"), { scale: 1 }, { scale: 1.3, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, ${T(19)});
      nota(1, ${T(20)});
`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(14), sfx: "typing", vol: 0.15, max: 0.8 }, { t: T(16) - 0.25, sfx: "pop", vol: 0.25 }, { t: T(19), sfx: "click", vol: 0.35 }, { t: T(20), sfx: "pop", vol: 0.25 }],
}));

// ================= s03 · juntos, anónimos, patrones =================
// los puntos del mapa (posiciones finales de s02) se vuelven círculos sin nombre y caen en las barras
const BX0 = 34, BBW = 52, BGAP = 18, BBASE = 1010, BMAX = 640;
const semanas = [[0.85, 1.08, 0.9, 1.1, 0.95, 1.0, 0.9, 1.1, 0.85, 1.05, 0.92, 1.1, 0.9], [1.12, 0.9, 1.1, 0.92, 1.06, 0.96, 1.1, 0.9, 1.12, 0.94, 1.08, 0.9, 1.1]];
escena("s03-patrones", (T) => ({
  css: `
    P .pp { position: absolute; width: 76px; height: 76px; margin: -38px 0 0 -38px; border-radius: 50%; background: ${NAVY}; border: 9px solid #ffffff; }
    P .pp i { position: absolute; left: 13px; top: 13px; width: 32px; height: 32px; border-radius: 50%; background: ${G}; }
    P .av { position: absolute; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; opacity: 0; }
    P .av .cara, P .av .anon { position: absolute; inset: 0; }
    P .av .anon { opacity: 0; border-radius: 50%; background: ${GRIS}; border: 7px solid ${NAVY}; }
    P .graf { position: absolute; left: 0; top: 0; width: 960px; height: 1140px; background: ${CR}; opacity: 0; }
    P .g-tit { position: absolute; left: 36px; top: 40px; font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .g-s { position: absolute; left: 38px; top: 120px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.62); }
    P .g-linea { position: absolute; left: 30px; top: ${BBASE}px; width: 900px; height: 6px; border-radius: 3px; background: ${NAVY}; }
    P .sem { position: absolute; left: 0; top: 0; width: 960px; height: 1140px; overflow: visible; }
    P .sem rect { fill: none; stroke: ${NAVY}; stroke-width: 6; stroke-dasharray: 14 10; opacity: 0; }
    P .adiv { position: absolute; left: 680px; top: 590px; width: 260px; height: 260px; border-radius: 50%; background: #ffffff; border: 9px solid ${NAVY}; font: 800 170px/240px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }
    P .adiv svg { position: absolute; left: -8px; top: -8px; }`,
  html: `${TARJ(
    MAPA_SVG + PINSVG +
      GENTE.map(([, , x, y], k) => `<div class="pp p${k}" style="left:${x}px;top:${y}px"><i></i></div>`).join("") +
      `<div class="graf">
        <div class="g-tit">Horarios concurridos</div>
        <div class="g-s">SÁBADO · PROMEDIO DE SEMANAS</div>
        <svg class="sem" viewBox="0 0 960 1140" aria-hidden="true">${semanas.map((f, s) => POP.map((v, i) => { const h = Math.min(BMAX, (BMAX * v * f[i]) / 100); return `<rect class="s${s}" x="${BX0 + i * (BBW + BGAP)}" y="${BBASE - h}" width="${BBW}" height="${h}" rx="10"/>`; }).join("")).join("")}</svg>
        ${barrasPop(BX0, BBASE, BMAX, BBW, BGAP, "bp")}
        <div class="g-linea"></div>
      </div>` +
      GENTE.map(([, , x, y], k) => `<div class="av a${k}" style="left:${x}px;top:${y}px"><div class="cara">${avatar(120)}</div><div class="anon"></div></div>`).join(""),
  )}
      <div class="adiv">?<svg width="260" height="260" viewBox="0 0 260 260" aria-hidden="true"><path class="tacha" d="M44 216 L216 44" stroke="${RED}" stroke-width="16" stroke-linecap="round" fill="none"/></svg></div>
      ${pill(1, 300, 1450, "Juntos", "cr")}
      ${pill(2, 720, 1450, "Anónimos", "lleno")}
      ${pill(3, 540, 800, "Mira patrones", "lleno")}`,
  js: `
      // los puntos se vuelven personas
      qa(".pp").forEach((p, k) => { tl.to(p, { scale: 0.3, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.02 + k * 0.03); });
      qa(".av").forEach((a, k) => pop(a, 0.08 + k * 0.03, 0.3, 0.4));
      // "Juntos": se juntan en el local
      const G0 = ${JSON.stringify(GENTE.map(([, , x, y]) => [x, y]))};
      qa(".av").forEach((a, k) => {
        const tx = 300 + (k % 4) * 120, ty = 520 + Math.floor(k / 4) * 130;
        tl.to(a, { x: tx - G0[k][0], y: ty - G0[k][1], duration: 0.4, ease: "power3.inOut" }, 0.15 + k * 0.02);
      });
      nota(1, 0.2);
      // "anónimos": las caras se apagan
      qa(".av .anon").forEach((a, k) => tl.to(a, { opacity: 1, duration: 0.14 }, ${T(23)} + k * 0.03));
      qa(".av .cara").forEach((a, k) => tl.to(a, { opacity: 0, duration: 0.14 }, ${T(23)} + k * 0.03));
      nota(2, ${T(23)});
      // "No adivina": el signo de pregunta tachado
      pop(".adiv", ${T(24)} - 0.05, 0.3);
      dibujar(".tacha", ${T(25)} + 0.15, 0.25);
      sinNota(1, ${T(24)}); sinNota(2, ${T(24)});
      fuera(".adiv", ${T(26)});
      // "mira patrones": entra el gráfico, las semanas punteadas y el promedio
      tl.to(q(".graf"), { opacity: 1, duration: 0.25 }, ${T(26)} - 0.2);
      qa(".av").forEach((a, k) => {
        const i = [2, 4, 5, 6, 9, 10, 3, 11][k];
        tl.to(a, { x: "+=0", y: "+=0", scale: 0.4, opacity: 0, duration: 0.28, ease: "power2.in" }, ${T(26)} - 0.2 + k * 0.02);
      });
      tl.to(qa(".sem .s0"), { opacity: 0.45, duration: 0.15, stagger: 0.012 }, ${T(26)});
      tl.to(qa(".sem .s1"), { opacity: 0.45, duration: 0.15, stagger: 0.012 }, ${T(26)} + 0.18);
      qa(".graf .bp").forEach((b, i) => tl.fromTo(b, { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: "back.out(1.4)" }, ${T(26)} + 0.35 + i * 0.03));
      nota(3, ${T(27)} + 0.1);
      latido(".graf .bp.pk", ${T(27)} + 0.75, 1.1);`,
  sfx: [{ t: 0.15, sfx: "whoosh-short", vol: 0.2 }, { t: T(23), sfx: "click-soft", vol: 0.3 }, { t: T(24), sfx: "pop", vol: 0.25 }, { t: T(25) + 0.15, sfx: "glitch-1", vol: 0.2, max: 0.4 }, { t: T(26) + 0.35, sfx: "typing", vol: 0.15, max: 0.6 }, { t: T(27) + 0.1, sfx: "pop", vol: 0.28 }],
}));

// ================= s04 · giro: la tarjeta se da vuelta y es la caja de tu local =================
const GRAF_CSS = `
    P .graf { position: absolute; left: 0; top: 0; width: 960px; height: 1140px; background: ${CR}; }
    P .g-tit { position: absolute; left: 36px; top: 40px; font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .g-s { position: absolute; left: 38px; top: 120px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.62); }
    P .g-linea { position: absolute; left: 30px; top: ${BBASE}px; width: 900px; height: 6px; border-radius: 3px; background: ${NAVY}; }`;
const GRAF = `<div class="graf"><div class="g-tit">Horarios concurridos</div><div class="g-s">SÁBADO · PROMEDIO DE SEMANAS</div>${barrasPop(BX0, BBASE, BMAX, BBW, BGAP, "bp")}<div class="g-linea"></div></div>`;
const VENTAS = [["09:40", "Café con leche"], ["11:15", "Medialunas x 6"], ["12:05", "Tostado y jugo"], ["12:20", "Dos cafés"], ["12:48", "Almuerzo"], ["13:10", "Torta en porción"], ["13:35", "Café y medialuna"]];
const CAJA_CSS = `
    P .caja { position: absolute; left: 0; top: 0; width: 960px; height: 1140px; background: ${CR}; }
    P .c-tit { position: absolute; left: 40px; top: 40px; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .c-s { position: absolute; left: 42px; top: 124px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.62); }
    P .vf { position: absolute; left: 36px; width: 888px; height: 96px; border-radius: 28px; background: #ffffff; border: 6px solid ${NAVY}; }
    P .vf b { position: absolute; left: 28px; top: 0; font: 600 44px/84px "IBM Plex Mono", monospace; color: ${NAVY}; }
    P .vf span { position: absolute; left: 220px; top: 0; font: 600 42px/84px "Lexend", sans-serif; color: ${NAVY}; }
    P .vf .ok { position: absolute; right: 22px; top: 18px; }`;
const CAJA = `<div class="caja"><div class="c-tit">Tu local</div><div class="c-s">CAJA · VENTAS DE HOY</div>${VENTAS.map(([h, n], i) => `<div class="vf v${i}" style="top:${200 + i * 112}px"><b>${h}</b><span>${n}</span><div class="ok">${tick(24)}</div></div>`).join("")}</div>`;
escena("s04-giro", (T) => ({
  css: GRAF_CSS + CAJA_CSS,
  html: `${TARJ(GRAF + CAJA)}
      ${selbox("sb-h", 92, 734, 200, 800)}
      ${pill(1, 540, 1630, "Un dato mejor", "lleno")}
      ${pill(2, 650, 1630, "Cada venta, con su hora", "cr")}`,
  js: `
      gsap.set(q(".caja"), { opacity: 0 });
      // "Pero": la tarjeta se da vuelta
      const t0 = ${T(28)} + 0.05;
      tl.to([CARD, SH], { scaleX: 0, duration: 0.2, ease: "power2.in", transformOrigin: "50% 50%" }, t0);
      tl.set(q(".caja"), { opacity: 1 }, t0 + 0.2);
      tl.set(q(".graf"), { opacity: 0 }, t0 + 0.2);
      tl.to([CARD, SH], { scaleX: 1, duration: 0.3, ease: "back.out(1.6)" }, t0 + 0.2);
      qa(".vf").forEach((v, i) => tl.fromTo(v, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.8)" }, t0 + 0.35 + i * 0.09));
      // "un dato mejor"
      nota(1, ${T(32)});
      latido(".c-tit", ${T(32)} + 0.1, 1.1);
      // "Tus ventas": cada venta tiene su hora
      sinNota(1, ${T(34)} - 0.15);
      caja(".sb-h", ${T(35)});
      qa(".vf b").forEach((b, i) => tl.to(b, { color: "${GD}", duration: 0.1 }, ${T(35)} + 0.05 + i * 0.04));
      nota(2, ${T(35)} + 0.3);`,
  sfx: [{ t: T(28) + 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: T(28) + 0.4, sfx: "typing", vol: 0.15, max: 0.6 }, { t: T(32), sfx: "pop", vol: 0.28 }, { t: T(35), sfx: "click-soft", vol: 0.3 }, { t: T(35) + 0.3, sfx: "pop", vol: 0.25 }],
}));

// ================= s05 · qué día y a qué hora =================
const PANEL_CSS = (extra = "") => `P .pan { position: absolute; left: 0; top: 0; width: 960px; height: 1140px; background: ${CR}; } ${extra}`;
escena("s05-diahora", (T) => ({
  css: CAJA_CSS + PANEL_CSS(),
  html: `${TARJ(`<div class="pan">${PANEL(-1, SAB)}</div>` + VENTAS.map(([h, n], i) => `<div class="vf v${i}" style="top:${200 + i * 112}px"><b style="color:${GD}">${h}</b><span>${n}</span><div class="ok">${tick(24)}</div></div>`).join(""))}
      ${selbox("sb-d", 60 + 48 + 5 * 126 - 14, 540 + 116, 136, 112)}
      ${pill(1, 410, 760, "Sábado", "lleno")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(2, 760, 930, 590, 930, "n")}</svg>
      ${pill(2, 840, 930, "Hora pico", "lleno")}`,
  js: `
      gsap.set(qa(".bv"), { scaleY: 0 });
      gsap.set(qa(".pe, .p-eq"), { opacity: 0 });
      // las ventas caen en las barras
      qa(".vf").forEach((v, i) => {
        const col = [0, 1, 2, 2, 2, 3, 3][i];
        tl.to(v, { x: ${colX(0)} + col * ${PBW + PGAP} - 36 - 380, y: ${PBASE - 60} - (200 + i * 112), scale: 0.22, opacity: 0, duration: 0.4, ease: "power2.in" }, 0.02 + i * 0.04);
      });
      // "Qué día": el sábado
      qa(".chip").forEach((c, i) => pop(c, 0.05 + i * 0.03, 0.25));
      tl.to(q(".ch5"), { backgroundColor: "${G}", borderColor: "${NAVY}", color: "${NAVY}", duration: 0.12 }, ${T(36)} + 0.05);
      caja(".sb-d", ${T(36)} + 0.05);
      nota(1, ${T(37)});
      // "a qué hora": crecen las barras
      sinNota(1, ${T(41)} - 0.2);
      ${JSON.stringify(SAB)}.forEach((v, i) => alto(".bv" + i, v / 100, ${T(39)} + i * 0.06, 0.45));
      // "vendés más": la barra pico en verde
      tl.to(q(".bv2"), { backgroundColor: "${G}", duration: 0.15 }, ${T(42)});
      latido(".bv2", ${T(42)}, 1.06);
      nota(2, ${T(43)} - 0.1);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(36) + 0.05, sfx: "click", vol: 0.3 }, { t: T(37), sfx: "pop", vol: 0.25 }, { t: T(39), sfx: "sparkle", vol: 0.18 }, { t: T(42), sfx: "ping", vol: 0.28 }],
}));

// ================= s06 · más gente en la hora pico =================
const PICO_CSS = `P .bv2 { background: ${G}; border: 6px solid ${NAVY}; }`;
escena("s06-pico", (T) => ({
  css: PANEL_CSS(PICO_CSS),
  html: `${TARJ(`<div class="pan">${PANEL(5, SAB, gente(2, 1, "ex e1", GD) + gente(2, 2, "ex e2", GD))}</div>`)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 720, 1560, 580, 1560, "n")}</svg>
      ${pill(1, 860, 1560, "+2 en caja", "lleno")}`,
  js: `
      ${JSON.stringify(SAB)}.forEach((v, i) => gsap.set(q(".bv" + i), { scaleY: v / 100 }));
      gsap.set(qa(".ex"), { opacity: 0 });
      // el equipo en caja
      tl.fromTo(q(".p-eq"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.05);
      qa(".base").forEach((p, i) => pop(p, 0.1 + i * 0.05, 0.3, 0.4));
      // "ponés más gente en la hora pico"
      pop(".e1", ${T(46)}, 0.35, 0.3);
      pop(".e2", ${T(47)}, 0.35, 0.3);
      nota(1, ${T(48)});
      latido(".bv2", ${T(51)}, 1.06);
      latido(".ex", ${T(52)}, 1.15);`,
  sfx: [{ t: 0.1, sfx: "pop", vol: 0.2 }, { t: T(46), sfx: "pop", vol: 0.3 }, { t: T(47), sfx: "pop", vol: 0.3 }, { t: T(48), sfx: "chime", vol: 0.22, max: 0.8 }],
}));

// ================= s07 · tres parados un martes a las tres =================
escena("s07-martes", (T) => ({
  css: PANEL_CSS(PICO_CSS),
  html: `${TARJ(`<div class="pan">${PANEL(5, SAB, gente(2, 1, "ex e1", GD) + gente(2, 2, "ex e2", GD) + gente(3, 0, "rj r0", RED) + gente(3, 1, "rj r1", RED) + gente(3, 2, "rj r2", RED))}</div>`)}
      ${selbox("sb-m", 60 + 48 + 1 * 126 - 14, 540 + 116, 136, 112)}
      ${selbox("r sb-t", 60 + colX(3) - 18, 540 + PBASE - 130, PBW + 36, 130 + 118 + 192 + 88 + 14)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 840, 1040, 720, 1160, "r")}</svg>
      ${pill(1, 840, 1000, "Martes 15 h", "rl")}`,
  js: `
      ${JSON.stringify(SAB)}.forEach((v, i) => gsap.set(q(".bv" + i), { scaleY: v / 100 }));
      gsap.set(qa(".rj"), { opacity: 0 });
      // cambia a martes
      tl.to(q(".ch5"), { backgroundColor: "#ffffff", borderColor: "${GRIS}", color: "rgba(11,18,32,0.55)", duration: 0.15 }, 0.05);
      tl.to(q(".ch1"), { backgroundColor: "${G}", borderColor: "${NAVY}", color: "${NAVY}", duration: 0.15 }, 0.1);
      caja(".sb-m", 0.1);
      tl.to(q(".sb-m"), { opacity: 0, duration: 0.2 }, 0.9);
      ${JSON.stringify(MAR)}.forEach((v, i) => alto(".bv" + i, v / 100, 0.15 + i * 0.04, 0.4));
      tl.to(q(".bv2"), { backgroundColor: "${NAVY3}", borderColor: "${NAVY3}", duration: 0.2 }, 0.15);
      fuera(".ex", 0.15);
      tl.to(q(".bv3"), { backgroundColor: "${GRIS}", duration: 0.2 }, 0.4);
      // "tres parados": tres en caja a las 15 h, sin ventas
      pop(".r0", ${T(55)}, 0.3, 0.4); pop(".r1", ${T(55)} + 0.1, 0.3, 0.4); pop(".r2", ${T(55)} + 0.2, 0.3, 0.4);
      tl.to(q(".b3"), { opacity: 0, duration: 0.1 }, ${T(55)});
      qa(".rj").forEach((p, k) => tl.fromTo(p, { rotation: 0 }, { rotation: k % 2 ? 6 : -6, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ${T(56)} + k * 0.08));
      // "un martes a las tres"
      caja(".sb-t", ${T(58)});
      nota(1, ${T(59)});
      latido(".n1", ${T(61)}, 1.08);`,
  sfx: [{ t: 0.1, sfx: "click", vol: 0.3 }, { t: T(55), sfx: "pop", vol: 0.28 }, { t: T(58), sfx: "click-soft", vol: 0.3 }, { t: T(59), sfx: "glitch-1", vol: 0.18, max: 0.4 }],
}));

// ================= s08 · el panel a medida =================
const MATRIZ = [[1, 1, 2, 1, 1, 0], [1, 1, 2, 0, 1, 0], [1, 2, 2, 1, 1, 1], [1, 1, 2, 1, 2, 1], [1, 2, 3, 2, 2, 2], [2, 2, 3, 3, 2, 1], [1, 2, 3, 1, 0, 0]];
const HX0 = 126, HW = 124, HG = 14, HY0 = 180, HH = 100, HGY = 14;
escena("s08-panel", (T) => ({
  css: PANEL_CSS(`
    P .h-tit { position: absolute; left: 40px; top: 44px; font: 800 58px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .h-med { position: absolute; right: 34px; top: 34px; height: 80px; padding: 0 26px; border-radius: 40px; background: ${G}; border: 6px solid ${NAVY}; font: 600 30px/68px "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${NAVY}; opacity: 0; }
    P .hd { position: absolute; left: 40px; width: 70px; text-align: center; font: 800 40px/${HH}px "Lexend", sans-serif; color: ${NAVY}; }
    P .hc { position: absolute; width: ${HW}px; height: ${HH}px; border-radius: 20px; }
    P .hc.lv3 { border: 6px solid ${NAVY}; }
    P .hh { position: absolute; text-align: center; font: 600 30px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.7); }
    P .ley { position: absolute; left: 0; right: 0; top: 1050px; display: flex; justify-content: center; align-items: center; gap: 14px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.65); }
    P .ley i { display: inline-block; width: 56px; height: 44px; border-radius: 12px; }`),
  html: `${TARJ(`<div class="pan">
        <div class="h-tit">Panel de tu local</div><div class="h-med">A MEDIDA</div>
        ${DIAS.map((d, r) => `<div class="hd hr${r}" style="top:${HY0 + r * (HH + HGY)}px">${d}</div>`).join("")}
        ${MATRIZ.map((fila, r) => fila.map((v, c) => `<div class="hc r${r} c${c} lv${v}" style="left:${HX0 + c * (HW + HG)}px;top:${HY0 + r * (HH + HGY)}px;background:${HEAT[v]}"></div>`).join("")).join("")}
        ${HORAS.map((h, c) => `<div class="hh" style="left:${HX0 + c * (HW + HG) - 10}px;top:${HY0 + 7 * (HH + HGY) + 6}px;width:${HW + 20}px">${h}</div>`).join("")}
        <div class="ley"><span>MENOS</span>${HEAT.map((c) => `<i style="background:${c}"></i>`).join("")}<span>MÁS VENTAS</span></div>
      </div>`)}
      ${selbox("sb-s", 60 + 30, 540 + HY0 + 5 * (HH + HGY) - 14, 900, HH + 28)}
      ${pill(1, 540, 1650, "Tus horas pico", "lleno")}`,
  js: `
      // las celdas se llenan columna por columna
      qa(".hd").forEach((d, r) => pop(d, 0.02 + r * 0.03, 0.25));
      for (let c = 0; c < 6; c++) qa(".hc.c" + c).forEach((el, r) => pop(el, 0.08 + c * 0.1 + r * 0.025, 0.3, 0.3));
      tl.fromTo(qa(".hh, .ley"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.5);
      // "a medida"
      pop(".h-med", ${T(65)} - 0.05, 0.35, 0.5);
      latido(".h-med", ${T(65)} + 0.5, 1.1);
      // "un panel": las horas pico
      latido(".hc.lv3", ${T(69)}, 1.12);
      tl.to(q(".ley"), { opacity: 0, duration: 0.15 }, ${T(70)} - 0.1);
      nota(1, ${T(70)});
      // el sábado queda (match con s09)
      caja(".sb-s", ${T(71)} + 0.2);
      tl.to(qa(".hc:not(.r5), .hd:not(.hr5)"), { opacity: 0.25, duration: 0.3 }, ${T(71)} + 0.3);`,
  sfx: [{ t: 0.08, sfx: "typing", vol: 0.16, max: 0.7 }, { t: T(65) - 0.05, sfx: "pop", vol: 0.28 }, { t: T(69), sfx: "sparkle", vol: 0.2 }, { t: T(70), sfx: "pop", vol: 0.25 }, { t: T(71) + 0.2, sfx: "click-soft", vol: 0.3 }],
}));

// ================= s09 · los turnos al lado =================
const TX0 = 250, TW = 106, TG = 8;
const tcol = (c) => TX0 + c * (TW + TG);
const TURNOS = [["Ana", 0, 2, "9 a 15"], ["Bruno", 1, 3, "11 a 17"], ["Caro", 2, 5, "13 a 21"], ["Diego", 3, 5, "15 a 21"]];
const TRY = (k) => 380 + k * 150;
escena("s09-turnos", (T) => ({
  css: PANEL_CSS(`
    P .t-tit { position: absolute; left: 40px; top: 44px; font: 800 58px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .tc { position: absolute; top: 140px; width: ${TW}px; height: 90px; border-radius: 18px; }
    P .tc.lv3 { border: 6px solid ${NAVY}; }
    P .th { position: absolute; top: 246px; width: ${TW + 20}px; text-align: center; font: 600 30px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.7); }
    P .tS { position: absolute; left: 40px; top: 140px; width: 160px; font: 800 40px/90px "Lexend", sans-serif; color: ${NAVY}; }
    P .t-eq { position: absolute; left: 42px; top: 316px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    P .tav { position: absolute; left: 34px; width: 84px; height: 84px; }
    P .tn { position: absolute; left: 128px; font: 700 38px/100px "Lexend", sans-serif; color: ${NAVY}; }
    P .tb { position: absolute; height: 92px; border-radius: 46px; background: ${NAVY3}; border: 6px solid ${NAVY}; font: 600 32px/80px "IBM Plex Mono", monospace; color: ${CR}; text-align: center; transform-origin: 0 50%; }
    P .tbtn { position: absolute; left: 60px; top: 990px; width: 840px; height: 112px; border-radius: 56px; background: ${G}; border: 7px solid ${NAVY}; font: 800 44px/98px "Lexend", sans-serif; color: ${NAVY}; text-align: center; opacity: 0; }
    P .dedo { position: absolute; left: 640px; top: 1050px; opacity: 0; }`),
  html: `${TARJ(`<div class="pan">
        <div class="t-tit">Turnos del sábado</div>
        <div class="tS">SÁB</div>
        ${MATRIZ[5].map((v, c) => `<div class="tc lv${v}" style="left:${tcol(c)}px;background:${HEAT[v]}"></div>`).join("")}
        ${HORAS.map((h, c) => `<div class="th" style="left:${tcol(c) - 10}px">${h}</div>`).join("")}
        <div class="t-eq">EQUIPO</div>
        ${TURNOS.map(([n, a, b, txt], k) => `<div class="tav ta${k}" style="top:${TRY(k) + 8}px">${avatar(84)}</div><div class="tn tn${k}" style="top:${TRY(k)}px">${n}</div><div class="tb tb${k}" style="left:${tcol(a)}px;top:${TRY(k) + 4}px;width:${tcol(b) + TW - tcol(a)}px">${txt}</div>`).join("")}
        <div class="tbtn">Ver con mis ventas</div>
        <svg class="dedo" width="150" height="190" viewBox="0 0 150 190" aria-hidden="true"><path d="M52 92 V22 Q52 6 68 6 Q84 6 84 22 V78 L118 84 Q140 88 138 112 L130 160 Q126 184 102 184 H70 Q54 184 44 170 L12 124 Q4 110 16 102 Q28 96 38 106 L52 120 Z" fill="${CR}" stroke="${NAVY}" stroke-width="7" stroke-linejoin="round"/></svg>
      </div>`)}
      ${selbox("sb-c", 60 + tcol(2) - 22, 540 + 120, TW + 44, TRY(3) + 120 - 100)}
      ${pill(1, 60 + tcol(2) + TW / 2, 540 + TRY(3) + 196, "3 en la hora pico", "lleno")}`,
  js: `
      // la fila del sábado sube a la cabecera y aparecen los turnos
      tl.fromTo(qa(".tc, .tS"), { y: 440 }, { y: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(qa(".th, .t-eq"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.3);
      qa(".tav").forEach((a, k) => pop(a, ${T(73)} + k * 0.1, 0.3, 0.4));
      qa(".tn").forEach((a, k) => pop(a, ${T(73)} + 0.05 + k * 0.1, 0.3, 0.6));
      qa(".tb").forEach((b, k) => tl.fromTo(b, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.4, ease: "power3.out" }, ${T(74)} + k * 0.12));
      // "de tu equipo"
      latido(".tav", ${T(77)}, 1.12);
      // "al lado": la columna de la hora pico, cubierta
      caja(".sb-c", ${T(78)});
      [0, 1, 2].forEach((k) => tl.to(q(".tb" + k), { backgroundColor: "${GD}", duration: 0.15 }, ${T(78)} + 0.1 + k * 0.06));
      nota(1, ${T(79)});
      // "¿Querés verlo con tus ventas?"
      sinNota(1, ${T(81)} - 0.2); tl.to(q(".sb-c"), { opacity: 0, duration: 0.2 }, ${T(81)} - 0.2);
      pop(".tbtn", ${T(81)} - 0.1, 0.35, 0.6);
      tl.fromTo(q(".dedo"), { opacity: 0, x: 120, y: 160 }, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power2.out" }, ${T(82)});
      tl.to(q(".dedo"), { scale: 0.9, transformOrigin: "40% 10%", duration: 0.1, yoyo: true, repeat: 1 }, ${T(84)});
      tl.to(q(".tbtn"), { backgroundColor: "${GD}", duration: 0.1, yoyo: true, repeat: 1 }, ${T(84)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(74), sfx: "typing", vol: 0.15, max: 0.6 }, { t: T(78), sfx: "click-soft", vol: 0.3 }, { t: T(79), sfx: "pop", vol: 0.26 }, { t: T(81) - 0.1, sfx: "pop", vol: 0.25 }, { t: T(84), sfx: "click", vol: 0.35 }],
}));

// ================= s10 · cierre: videollamada =================
escena("s10-cta", (T, dur) => ({
  css: `
    P .vt { position: absolute; left: 0; right: 0; text-align: center; font: 800 124px/1 "Lexend", sans-serif; color: #ffffff; letter-spacing: -0.04em; text-shadow: 0 6px 0 rgba(3,6,12,0.6); }
    P .vt1 { top: 150px; }
    P .vt2w { position: absolute; left: 340px; top: 300px; width: 400px; height: 150px; }
    P .vt2 { position: absolute; left: 0; right: 0; top: 14px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; }
    P .tile { position: absolute; left: 60px; top: 520px; width: 960px; height: 720px; border-radius: 52px; background: ${NAVY3}; border: 8px solid ${CR}; overflow: hidden; }
    P .tile .av { position: absolute; left: 290px; top: 150px; }
    P .tile .tag { position: absolute; left: 36px; bottom: 34px; height: 70px; padding: 0 26px; border-radius: 35px; background: rgba(11,18,32,0.85); font: 600 30px/70px "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; }
    P .tile .tag i { display: inline-block; width: 22px; height: 22px; border-radius: 11px; background: ${G}; margin-right: 14px; }
    P .yo { position: absolute; left: 730px; top: 1010px; width: 250px; height: 200px; border-radius: 34px; background: ${NAVY2}; border: 6px solid ${CR}; }
    P .yo .av { position: absolute; left: 70px; top: 26px; }
    P .yo span { position: absolute; left: 0; right: 0; bottom: 14px; text-align: center; font: 600 28px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    P .url { position: absolute; left: 0; right: 0; top: 1290px; text-align: center; font: 800 116px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; }
    P .ctl { position: absolute; top: 1470px; width: 140px; height: 140px; border-radius: 70px; border: 7px solid ${NAVY}; }
    P .ctl svg { position: absolute; left: 30px; top: 30px; }`,
  html: `
      <div class="tile"><div class="av">${avatar(380, CR, NAVY3)}</div><div class="tag"><i></i>SCALERICS</div></div>
      <div class="yo"><div class="av">${avatar(110, GRIS, NAVY)}</div><span>VOS</span></div>
      <div class="vt vt1">Videollamada</div>
      <div class="vt2w">${selbox("sb-g", 0, 0, 400, 150)}<div class="vt2">gratis</div></div>
      <div class="url">scalerics.com</div>
      <div class="ctl c1" style="left:290px;background:${CR}"><svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"><rect x="20" y="4" width="26" height="40" rx="13" fill="${NAVY}"/><path d="M10 32 Q10 54 33 54 Q56 54 56 32 M33 54 V64" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linecap="round"/></svg></div>
      <div class="ctl c2" style="left:470px;background:${CR}"><svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"><rect x="2" y="16" width="44" height="34" rx="8" fill="${NAVY}"/><path d="M46 28 L64 18 V48 L46 38 Z" fill="${NAVY}"/></svg></div>
      <div class="ctl c3" style="left:650px;background:${G}"><svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"><path d="M14 6 L24 6 L30 20 L23 26 Q28 38 40 43 L46 36 L60 42 L60 52 Q60 60 52 60 Q8 56 6 14 Q6 6 14 6 Z" fill="${NAVY}"/></svg></div>`,
  js: `
      tl.fromTo(q(".tile"), { scale: 0.86, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      pop(".yo", 0.3, 0.35, 0.5);
      qa(".ctl").forEach((c, i) => pop(c, 0.4 + i * 0.08, 0.3, 0.5));
      tl.fromTo(q(".tile .av"), { y: 0 }, { y: -12, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.5);
      // "videollamada gratis en scalerics.com"
      tl.fromTo(q(".vt1"), { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, ${T(87)} - 0.15);
      tl.fromTo(q(".vt2"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ${T(88)} - 0.05);
      caja(".sb-g", ${T(88)} + 0.05);
      tl.fromTo(q(".url"), { opacity: 0, y: 40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, ${T(90)} - 0.1);
      latido(".url", ${T(90)} + 1.1, 1.06);
      latido(".c3", ${T(90)} + 1.8, 1.12);`,
  sfx: [{ t: 0.05, sfx: "notification", vol: 0.25 }, { t: T(87) - 0.15, sfx: "pop", vol: 0.26 }, { t: T(88), sfx: "click-soft", vol: 0.3 }, { t: T(90) - 0.1, sfx: "chime", vol: 0.25, max: 1.2 }],
}));
