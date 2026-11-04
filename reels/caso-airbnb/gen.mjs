// Generador de escenas de reels/caso-airbnb (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" (copiado de caso-mcdonalds y por-que-la-tarjeta): un objeto grande relleno
// por escena, que se transforma: cámara (flash) → tablero de reservas que no despega → el tablero
// se vuelve la ficha de un anuncio con la foto oscura y borrosa → la foto en un celular apaisado
// (oscura, sacada con el celular) → la cámara buena y tres casas, una por una → la misma foto con
// un slider: a la izquierda la mala, a la derecha la buena (no cambiaron la casa, cambiaron cómo se
// veía) → contador de facturación por semana x2 ("según contaron") → un ojo que mira → en la
// pupila, la web del comercio en el celular (fotos claras, precios, botón a WhatsApp) →
// videollamada.
// Airbnb se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: cámara, cuarto,
// ficha y celular genéricos con los colores de Scalerics.
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

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", CRD = "#b9b7a8", G = "#5ce611", GD = "#3fa60a", GL = "#9df26a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const tickG = (cls, cx, cy, r = 30) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 22})"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
// etiqueta chica con línea guía (svg de pantalla completa): punto en (x1,y1), texto en (x2,y2)
const guia = (cls, x1, y1, x2, y2) => `<g class="${cls}"><circle class="gp" cx="${x1}" cy="${y1}" r="14" fill="${G}"/><path class="gl" d="M${x1} ${y1} L${x2} ${y2}" stroke="${G}" stroke-width="7" stroke-linecap="round" fill="none"/></g>`;

// cámara genérica (viewBox 800 x 580)
const CAMARA = `
  <ellipse cx="400" cy="556" rx="330" ry="22" fill="rgba(3,6,12,0.55)"/>
  <rect x="76" y="176" width="40" height="46" rx="10" fill="${NAVY3}"/><rect x="684" y="176" width="40" height="46" rx="10" fill="${NAVY3}"/>
  <rect class="cm-btn" x="566" y="104" width="110" height="64" rx="18" fill="${G}"/><rect x="566" y="146" width="110" height="22" fill="${GD}"/>
  <path d="M250 200 L280 96 Q286 80 304 80 H496 Q514 80 520 96 L550 200 Z" fill="${CR}"/><path d="M440 80 H496 Q514 80 520 96 L550 200 H470 Z" fill="${CRD}"/>
  <rect x="318" y="108" width="164" height="62" rx="12" fill="${NAVY3}"/><rect class="cm-flash" x="328" y="116" width="144" height="46" rx="8" fill="#ffffff"/>
  <rect x="60" y="190" width="680" height="350" rx="64" fill="${CR}"/>
  <path d="M560 190 H676 Q740 190 740 254 V476 Q740 540 676 540 H520 Z" fill="${CRD}"/>
  <rect x="60" y="262" width="680" height="64" fill="${NAVY3}"/><rect x="60" y="262" width="680" height="12" fill="${BORDE}"/>
  <circle cx="400" cy="365" r="168" fill="${NAVY}"/><circle cx="400" cy="365" r="150" fill="none" stroke="${G}" stroke-width="12"/>
  <circle cx="400" cy="365" r="128" fill="${NAVY3}"/><circle cx="400" cy="365" r="96" fill="#0d1626"/><circle cx="400" cy="365" r="62" fill="${NAVY2}"/>
  <circle cx="400" cy="365" r="30" fill="#060a12"/>
  <ellipse cx="352" cy="318" rx="34" ry="17" transform="rotate(-32 352 318)" fill="rgba(255,255,255,0.75)"/><circle cx="452" cy="420" r="10" fill="rgba(255,255,255,0.35)"/>
  <circle cx="650" cy="230" r="16" fill="${G}"/>`;
const camaraSvg = (cls = "") => `<svg class="cam-svg ${cls}" viewBox="0 0 800 580" aria-hidden="true">${CAMARA}</svg>`;

// el cuarto del anuncio (viewBox 800 x 560): la versión buena; la mala le suma tilt, blur y sombra
const CUARTO = `
  <rect x="0" y="0" width="800" height="400" fill="${CR}"/>
  <rect x="0" y="400" width="800" height="160" fill="${CRD}"/>
  <rect x="472" y="54" width="250" height="230" rx="10" fill="#dff6cf" stroke="${NAVY3}" stroke-width="12"/>
  <path d="M597 54 V284 M472 168 H722" stroke="${NAVY3}" stroke-width="10"/>
  <path d="M490 270 L520 200 L548 270 Z M560 270 L600 170 L640 270 Z M650 270 L680 214 L708 270 Z" fill="${GL}"/>
  <path d="M478 400 L720 400 L800 560 L560 560 Z" fill="rgba(255,255,255,0.45)"/>
  <rect x="132" y="70" width="200" height="120" rx="8" fill="${G}" stroke="${NAVY3}" stroke-width="10"/><path d="M146 176 L206 120 L250 160 L280 136 L318 176 Z" fill="${GD}"/>
  <rect x="70" y="214" width="380" height="130" rx="26" fill="${NAVY3}"/>
  <rect x="50" y="316" width="420" height="120" rx="22" fill="#ffffff"/>
  <ellipse cx="150" cy="318" rx="70" ry="30" fill="#ffffff" stroke="${CRD}" stroke-width="6"/><ellipse cx="318" cy="318" rx="70" ry="30" fill="#ffffff" stroke="${CRD}" stroke-width="6"/>
  <path d="M50 356 H470 V420 Q470 446 444 446 H76 Q50 446 50 420 Z" fill="${G}"/><path d="M50 356 H470 V376 H50 Z" fill="${GD}"/>
  <rect x="510" y="340" width="120" height="104" rx="10" fill="${NAVY3}"/><rect x="510" y="384" width="120" height="8" fill="${BORDE}"/>
  <rect x="560" y="262" width="16" height="80" fill="${NAVY}"/><path d="M528 266 L544 210 H592 L608 266 Z" fill="#ffffff"/>
  <path d="M690 444 L700 376 H760 L770 444 Z" fill="${NAVY3}"/>
  <path d="M730 380 Q690 320 700 280 Q736 312 732 376 M730 380 Q760 310 790 300 Q786 350 736 380 M730 380 Q720 330 744 262 Q762 320 734 380" fill="${G}"/>
  <ellipse cx="300" cy="500" rx="230" ry="34" fill="${GL}" opacity="0.55"/>`;
let FID = 0;
const cuarto = (malo = false) => {
  if (!malo) return `<svg class="cu-svg" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${CUARTO}</svg>`;
  const id = "bl" + FID++;
  return `<svg class="cu-svg" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter></defs>
    <g filter="url(#${id})"><g transform="rotate(-6 400 280) translate(-40 -30) scale(1.12)">${CUARTO}</g></g>
    <rect x="0" y="0" width="800" height="560" fill="#04070d" opacity="0.8"/>
    <rect x="0" y="0" width="800" height="560" fill="#2a2410" opacity="0.18"/></svg>`;
};

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .camw { position: absolute; left: 60px; top: 640px; width: 960px; height: 696px; }
    ${P} .cam-svg, ${P} .cu-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    ${P} .cu-svg { overflow: hidden; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 42px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .pill.mono { font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.10); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.12); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .card { position: absolute; left: 90px; top: 600px; width: 900px; height: 730px; }
    ${P} .card-lado { position: absolute; left: 18px; top: 18px; width: 900px; height: 730px; border-radius: 48px; background: #a9a798; }
    ${P} .card-cuerpo { position: absolute; left: 0; top: 0; width: 900px; height: 730px; border-radius: 48px; background: ${CR}; overflow: hidden; }
    ${P} .card-foto { position: absolute; left: 26px; top: 26px; width: 848px; height: 500px; border-radius: 30px; overflow: hidden; background: #060a12; }
    ${P} .card-tit { position: absolute; left: 44px; top: 558px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }
    ${P} .card-l1 { position: absolute; left: 44px; top: 630px; width: 380px; height: 26px; border-radius: 13px; background: rgba(11,18,32,0.2); }
    ${P} .card-l2 { position: absolute; left: 44px; top: 676px; width: 250px; height: 26px; border-radius: 13px; background: rgba(11,18,32,0.14); }
    ${P} .card-chip { position: absolute; right: 40px; top: 628px; padding: 14px 22px; border-radius: 16px; background: ${NAVY3}; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
`;
// ficha del anuncio (HTML); foto mala o buena
const ficha = (cls, malo, extra = "") => `<div class="card ${cls}" data-layout-allow-overlap><div class="card-lado"></div><div class="card-cuerpo">
  <div class="card-foto">${cuarto(malo)}</div>
  <div class="card-tit">Cuarto · Nueva York</div><div class="card-l1"></div><div class="card-l2"></div><div class="card-chip">ANUNCIO</div>${extra}
</div></div>`;

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
      const etiqueta = (g, lbl, t) => {
        tl.fromTo(q(g + " .gp"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, svgOrigin: q(g + " .gp").getAttribute("cx") + " " + q(g + " .gp").getAttribute("cy"), duration: 0.2, ease: "back.out(2)" }, t);
        dibujar(g + " .gl", t + 0.08, 0.22);
        pop(lbl, t + 0.22, 0.28, 0.6);
      };
      const flash = (t) => { tl.fromTo(q(".blanco"), { opacity: 0 }, { opacity: 0.85, duration: 0.05, ease: "none" }, t); tl.to(q(".blanco"), { opacity: 0, duration: 0.3, ease: "power2.out" }, t + 0.05); };
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: Math.max(0.12, DUR - t), ease: "power2.in" }, t);
`;
const BLANCO = `<div class="blanco" style="position:absolute;inset:0;background:#ffffff;opacity:0"></div>`;

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
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map((s) => ({ ...s, t: r2(Math.max(0, s.t)) }))));
}
const D = (id) => ESC[id];

// ================= s01 · gancho =================
desde("s01-gancho");
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 84px; text-align: center; font: 800 112px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 156px; line-height: 1.0; }
    P .tit .v { color: ${G}; }
    P .camw { top: 690px; }`,
  html: `
      <div class="camw cam">${camaraSvg()}</div>
      <div class="tit"><div>¿Por qué Airbnb</div><div>salió a sacar</div><div class="gr v">fotos</div><div>casa por casa?</div></div>
      ${BLANCO}`,
  js: `
      const CAM = q(".cam");
      // cuadro 0: el gancho entero y la cámara ya grande
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(CAM, { y: 50, scale: 0.94, rotation: -3, transformOrigin: "50% 60%" }, { y: 0, scale: 1, rotation: 0, duration: 0.7, ease: "power3.out" }, 0);
      // "fotos": click y flash
      tl.to(q(".cm-btn"), { y: 12, duration: 0.08, yoyo: true, repeat: 1, ease: "none" }, ${r2(w(9) - 0.08)});
      flash(${w(9)});
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, ${w(9)});
      // "casa por casa": la cámara gira a un lado y al otro, flash en cada "casa"
      tl.to(CAM, { rotation: -5, x: -30, duration: 0.25, ease: "power2.inOut" }, ${r2(w(10) - 0.15)});
      flash(${w(10)});
      tl.to(CAM, { rotation: 5, x: 30, duration: 0.25, ease: "power2.inOut" }, ${r2(w(12) - 0.2)});
      flash(${w(12)});
      // sale: la cámara se aleja y el título sube
      const V = ${r2(D("s01-gancho") - 0.4)};
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, V);
      tl.to(CAM, { scale: 0.5, y: -60, opacity: 0, rotation: 0, x: 0, duration: 0.4, ease: "power2.in" }, V);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.2 }, { t: w(9) - 0.05, sfx: "click", vol: 0.32 }, { t: w(10) - 0.05, sfx: "click", vol: 0.28 }, { t: w(12) - 0.05, sfx: "click", vol: 0.28 }],
});

// ================= s02 · en Nueva York, las reservas no despegaban =================
desde("s02-reservas");
// línea del gráfico (coordenadas de pantalla): plana, con un intento de subir que se cae
const LIN = "M170 1150 L300 1140 L430 1146 L560 1132 L690 1140 L800 1080 L870 1150";
escena("s02-reservas", {
  css: `
    P .tab { position: absolute; left: 90px; top: 610px; width: 900px; height: 700px; }
    P .tab-lado { position: absolute; left: 18px; top: 18px; width: 900px; height: 700px; border-radius: 48px; background: #a9a798; }
    P .tab-cuerpo { position: absolute; left: 0; top: 0; width: 900px; height: 700px; border-radius: 48px; background: ${CR}; }
    P .tab-tit { position: absolute; left: 50px; top: 46px; font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .tab-chip { position: absolute; right: 44px; top: 50px; padding: 12px 22px; border-radius: 16px; background: ${NAVY3}; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .gfx { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }`,
  html: `
      <div class="tab" data-layout-allow-overlap><div class="tab-lado"></div><div class="tab-cuerpo"><div class="tab-tit">Reservas</div><div class="tab-chip">NUEVA YORK</div></div></div>
      <svg class="gfx" viewBox="0 0 1080 1920" aria-hidden="true">
        <path d="M170 1180 H870" stroke="rgba(11,18,32,0.25)" stroke-width="6" stroke-linecap="round"/>
        <path d="M170 900 V1180" stroke="rgba(11,18,32,0.25)" stroke-width="6" stroke-linecap="round"/>
        <path class="lin" d="${LIN}" fill="none" stroke="${RED}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <circle class="pt" cx="870" cy="1150" r="22" fill="${RED}"/>
      </svg>
      ${pill(1, 540, 1400, "No despegan", "rl")}`,
  js: `
      // la cámara se vuelve el tablero: entra desde abajo
      tl.fromTo(q(".tab"), { opacity: 0, scale: 0.7, y: 100, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".tab-chip"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(15))});
      // "reservas": se dibuja la línea, plana
      dibujar(".lin", ${r2(w(17) - 0.1)}, 0.8);
      pop(".pt", ${r2(w(17) + 0.65)}, 0.2, 0.3);
      // "no despegaban": el punto intenta subir y se cae
      tl.to(q(".pt"), { y: -70, duration: 0.2, ease: "power2.out" }, ${r2(w(19) + 0.15)});
      tl.to(q(".pt"), { y: 0, duration: 0.3, ease: "bounce.out" }, ${r2(w(19) + 0.35)});
      pop(".n1", ${r2(w(19) + 0.35)});
      salida(${r2(D("s02-reservas") - 0.2)});`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.22 }, { t: w(17), sfx: "whoosh", vol: 0.14, max: 0.6 }, { t: w(19) + 0.35, sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s03 · miraron los anuncios: las fotos eran malas =================
desde("s03-anuncio");
escena("s03-anuncio", {
  css: `
    P .card.b1, P .card.b2 { opacity: 0; }`,
  html: `
      ${ficha("b2", true)}${ficha("b1", true)}${ficha("c0", true)}
      ${selbox("sb r", 110, 620, 860, 510)}
      ${pill(1, 540, 1440, "Fotos malas", "rl")}`,
  js: `
      const C0 = q(".c0");
      tl.fromTo(C0, { opacity: 0, scale: 0.6, rotation: -8, y: 120, transformOrigin: "50% 50%" }, { opacity: 1, scale: 0.92, rotation: 0, y: 0, duration: 0.42, ease: "back.out(1.4)" }, 0);
      // "anuncios": aparecen otros detrás, en abanico
      tl.fromTo(q(".b1"), { opacity: 0, rotation: 0, scale: 0.92, transformOrigin: "50% 100%" }, { opacity: 1, rotation: -7, x: -40, scale: 0.88, duration: 0.3, ease: "back.out(1.6)" }, ${r2(w(22) - 0.05)});
      tl.fromTo(q(".b2"), { opacity: 0, rotation: 0, scale: 0.92, transformOrigin: "50% 100%" }, { opacity: 1, rotation: 7, x: 40, scale: 0.88, duration: 0.3, ease: "back.out(1.6)" }, ${r2(w(22) + 0.08)});
      tl.to(C0, { scale: 1, duration: 0.5, ease: "power3.inOut" }, ${r2(w(23) - 0.25)});
      // "las fotos": selección en la foto · "malas": se sacude
      caja(".sb", ${r2(w(24))});
      tl.to(C0, { x: -12, duration: 0.05, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${r2(w(26))});
      pop(".n1", ${r2(w(26))});
      salida(${r2(D("s03-anuncio") - 0.18)});`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: w(22), sfx: "click-soft", vol: 0.24 }, { t: w(24), sfx: "click-soft", vol: 0.24 }, { t: w(26), sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s04 · oscuras, sacadas con el celular =================
desde("s04-oscuras");
escena("s04-oscuras", {
  css: `
    P .tel { position: absolute; left: 50px; top: 690px; width: 980px; height: 540px; }
    P .tel-lado { position: absolute; left: 16px; top: 18px; width: 980px; height: 540px; border-radius: 80px; background: #0a1220; }
    P .tel-cuerpo { position: absolute; left: 0; top: 0; width: 980px; height: 540px; border-radius: 80px; background: ${NAVY3}; border: 8px solid ${BORDE}; box-sizing: border-box; }
    P .tel-pan { position: absolute; left: 34px; top: 30px; width: 790px; height: 480px; border-radius: 40px; overflow: hidden; background: #060a12; }
    P .tel-pan .cu-svg { position: absolute; inset: 0; }
    P .tel-btn { position: absolute; left: 852px; top: 210px; width: 104px; height: 104px; border-radius: 50%; background: #fff; border: 10px solid ${CRD}; box-sizing: border-box; }
    P .tel-foco { position: absolute; left: 290px; top: 150px; width: 210px; height: 180px; border: 6px solid #fff; border-radius: 10px; opacity: 0.8; }
    P .lbl { position: absolute; padding: 12px 22px; border-radius: 14px; background: ${RED}; font: 700 40px/1 "Lexend", sans-serif; color: #fff; white-space: nowrap; opacity: 0; }`,
  html: `
      <div class="tel" data-layout-allow-overlap><div class="tel-lado"></div><div class="tel-cuerpo"></div>
        <div class="tel-pan">${cuarto(true)}<div class="tel-foco"></div></div><div class="tel-btn"></div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${guia("g1", 230, 820, 230, 640)}${guia("g2", 930, 960, 840, 1340)}</svg>
      <div class="lbl l1" style="left:120px;top:576px">Oscura</div>
      <div class="lbl l2" style="left:640px;top:1320px">Con el celular</div>
      ${BLANCO}`,
  js: `
      const TEL = q(".tel");
      // la foto de la ficha cae adentro de un celular apaisado
      tl.fromTo(TEL, { opacity: 0, scale: 1.25, rotation: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -4, duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".tel-pan .cu-svg"), { scale: 1.06, transformOrigin: "50% 50%", duration: DUR, ease: "sine.inOut" }, 0);
      // "oscuras"
      etiqueta(".g1", ".l1", 0.25);
      // "sacadas con el celular": temblor de mano y click
      tl.to(TEL, { x: 8, y: -5, rotation: -3, duration: 0.09, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${r2(w(28))});
      etiqueta(".g2", ".l2", ${r2(w(30) - 0.1)});
      tl.to(q(".tel-btn"), { scale: 0.85, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(31) + 0.1)});
      flash(${r2(w(31) + 0.18)});
      salida(${r2(D("s04-oscuras") - 0.2)});`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: 0.3, sfx: "pop", vol: 0.2 }, { t: w(30), sfx: "pop", vol: 0.2 }, { t: w(31) + 0.12, sfx: "click", vol: 0.3 }],
});

// ================= s05 · alquilaron una buena cámara y fueron ellos, casa por casa =================
desde("s05-camara");
const CASAX = [200, 540, 880];
const casa = (k, cx) => `<g class="ca ca${k}">
  <ellipse cx="${cx}" cy="1318" rx="150" ry="14" fill="rgba(3,6,12,0.5)"/>
  <rect x="${cx - 130}" y="1040" width="260" height="276" fill="${k === 1 ? NAVY3 : NAVY2}" stroke="${CR}" stroke-width="7"/>
  <path d="M${cx - 156} 1046 L${cx} 940 L${cx + 156} 1046 Z" fill="${CR}"/><path d="M${cx} 940 L${cx + 156} 1046 H${cx + 40} Z" fill="${CRD}"/>
  <rect x="${cx - 96}" y="1080" width="72" height="70" rx="6" fill="${CRD}"/><rect x="${cx + 24}" y="1080" width="72" height="70" rx="6" fill="${CRD}"/>
  <rect x="${cx - 40}" y="1196" width="80" height="120" rx="8" fill="${G}"/><circle cx="${cx + 22}" cy="1258" r="7" fill="${NAVY}"/>
  <rect class="lz" x="${cx - 96}" y="1080" width="72" height="70" rx="6" fill="#fff" opacity="0"/><rect class="lz" x="${cx + 24}" y="1080" width="72" height="70" rx="6" fill="#fff" opacity="0"/>
</g>`;
escena("s05-camara", {
  css: `
    P .camw { left: 90px; top: 610px; width: 900px; height: 652px; }`,
  html: `
      <svg class="full casas" viewBox="0 0 1080 1920" aria-hidden="true">${CASAX.map((x, k) => casa(k, x)).join("")}${CASAX.map((x, k) => tickG("tk tk" + k, x + 110, 970, 34)).join("")}</svg>
      <div class="camw cam">${camaraSvg()}</div>
      ${pill(1, 540, 1400, "Cámara buena", "lleno")}
      ${BLANCO}`,
  js: `
      const CAM = q(".cam");
      gsap.set(qa(".ca, .tk"), { opacity: 0 });
      // vuelve la cámara, grande
      tl.fromTo(CAM, { opacity: 0, scale: 0.6, y: 120, rotation: 8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      // "buena cámara"
      tl.fromTo(q(".cm-flash"), { fill: "#ffffff" }, { fill: "${GL}", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(35))});
      pop(".n1", ${r2(w(35))});
      // "fueron ellos": la cámara sube y se achica, entran tres casas
      tl.to(q(".n1"), { opacity: 0, duration: 0.2 }, ${r2(w(37) - 0.1)});
      tl.to(CAM, { scale: 0.42, y: -200, duration: 0.45, ease: "power3.inOut" }, ${r2(w(37) - 0.1)});
      qa(".ca").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.32, ease: "back.out(1.5)" }, ${r2(w(37) + 0.1)} + i * 0.08));
      // "casa por casa": la cámara va de una a otra; flash y tilde en cada una
      const T = [${w(39)}, ${w(40)}, ${w(41)}], X = [${CASAX.map((x) => x - 540).join(",")}];
      T.forEach((t, k) => {
        tl.to(CAM, { x: X[k] * 0.95, duration: 0.2, ease: "power3.inOut" }, t - 0.2);
        tl.to(qa(".ca" + k + " .lz"), { opacity: 0.9, duration: 0.05, yoyo: true, repeat: 1 }, t);
        tl.to(q(".blanco"), { opacity: 0.35, duration: 0.04, yoyo: true, repeat: 1 }, t);
        tl.fromTo(q(".tk" + k), { opacity: 0, scale: 0.3, svgOrigin: (${JSON.stringify(CASAX)}[k] + 110) + " 970" }, { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2)" }, t + 0.06);
      });
      tl.to(CAM, { x: 0, duration: 0.3, ease: "power3.inOut" }, ${r2(w(41) + 0.3)});
      salida(${r2(D("s05-camara") - 0.22)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(35), sfx: "ping", vol: 0.2 }, { t: w(37), sfx: "whoosh-short", vol: 0.2 }, { t: w(39), sfx: "click", vol: 0.28 }, { t: w(40), sfx: "click", vol: 0.26 }, { t: w(41), sfx: "click", vol: 0.28 }],
});

// ================= s06 · no cambiaron las casas. cambiaron cómo se veían =================
desde("s06-giro");
escena("s06-giro", {
  css: `
    P .fr { position: absolute; left: 60px; top: 640px; width: 960px; height: 672px; }
    P .fr-lado { position: absolute; left: 18px; top: 18px; width: 960px; height: 672px; border-radius: 44px; background: #0a1220; }
    P .fr-cuerpo { position: absolute; left: 0; top: 0; width: 960px; height: 672px; border-radius: 44px; background: ${CR}; }
    P .ph { position: absolute; left: 22px; top: 22px; width: 916px; height: 628px; border-radius: 28px; overflow: hidden; }
    P .ph .cu-svg { position: absolute; inset: 0; }
    P .ph.buena { clip-path: inset(0% 0% 0% 100%); }
    P .barra { position: absolute; left: 0; top: 620px; width: 12px; height: 732px; margin-left: -6px; background: #fff; opacity: 0; }
    P .perilla { position: absolute; left: -44px; top: 322px; width: 100px; height: 100px; border-radius: 50%; background: #fff; border: 8px solid ${G}; box-sizing: border-box; }
    P .perilla:before, P .perilla:after { content: ""; position: absolute; top: 30px; border: 18px solid transparent; }
    P .perilla:before { left: -6px; border-right: 18px solid ${NAVY}; border-left: 0; }
    P .perilla:after { right: -6px; border-left: 18px solid ${NAVY}; border-right: 0; }
    P .tag { position: absolute; top: 676px; padding: 10px 20px; border-radius: 12px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; opacity: 0; }
    P .tag.a { left: 110px; background: ${RED}; color: #fff; }
    P .tag.d { right: 110px; background: ${G}; color: ${NAVY}; }`,
  html: `
      <div class="fr" data-layout-allow-overlap><div class="fr-lado"></div><div class="fr-cuerpo"></div>
        <div class="ph mala">${cuarto(true)}</div><div class="ph buena">${cuarto(false)}</div></div>
      <div class="tag a">ANTES</div><div class="tag d">DESPUÉS</div>
      <div class="barra"><div class="perilla"></div></div>
      ${pill(1, 540, 1420, "Misma casa", "")}${pill(2, 540, 1420, "Otra foto", "lleno")}`,
  js: `
      const FR = q(".fr"), BU = q(".buena"), BA = q(".barra");
      tl.fromTo(FR, { opacity: 0, scale: 0.86, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      pop(".tag.a", 0.25, 0.25, 0.6);
      // "las casas": misma casa
      pop(".n1", ${r2(w(44))});
      tl.to(q(".n1"), { opacity: 0, duration: 0.18 }, ${r2(w(46) - 0.2)});
      // "cambiaron cómo se veían": el slider barre de izquierda a derecha y aparece la foto buena
      const X0 = 82, X1 = 998, TA = ${r2(w(46) - 0.05)}, TB = ${r2(w(49) + 0.3)};
      tl.fromTo(BA, { opacity: 0, x: X1 }, { opacity: 1, duration: 0.2 }, TA - 0.2);
      tl.fromTo(BU, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: TB - TA, ease: "power2.inOut" }, TA);
      tl.to(BA, { x: X0, duration: TB - TA, ease: "power2.inOut" }, TA);
      tl.to(q(".tag.a"), { opacity: 0, duration: 0.15 }, TA + 0.2);
      pop(".tag.d", TA + 0.2, 0.25, 0.6);
      tl.to(BA, { opacity: 0, duration: 0.2 }, TB);
      pop(".n2", ${r2(w(49))});
      tl.to(FR, { scale: 1.04, duration: 0.6, ease: "sine.out" }, TB);
      salida(${r2(D("s06-giro") - 0.2)});`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: w(44), sfx: "pop", vol: 0.2 }, { t: w(46), sfx: "whoosh", vol: 0.22, max: 0.8 }, { t: w(49), sfx: "sparkle", vol: 0.22 }],
});

// ================= s07 · según contaron, lo que facturaban por semana se duplicó =================
desde("s07-duplico");
escena("s07-duplico", {
  css: `
    P .base { position: absolute; left: 120px; top: 1290px; width: 840px; height: 14px; border-radius: 7px; background: ${CRD}; opacity: 0; }
    P .bar { position: absolute; bottom: 630px; width: 300px; border-radius: 30px 30px 0 0; transform-origin: 50% 100%; }
    P .bar.b0 { left: 170px; height: 260px; background: #5d6676; }
    P .bar.b1 { left: 610px; height: 520px; background: ${G}; }
    P .bar.b1:after { content: ""; position: absolute; right: 0; top: 0; width: 70px; height: 100%; border-radius: 0 30px 0 0; background: ${GD}; }
    P .bar.b0:after { content: ""; position: absolute; right: 0; top: 0; width: 70px; height: 100%; border-radius: 0 30px 0 0; background: #4a5262; }
    P .bl { position: absolute; top: 1320px; width: 300px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; opacity: 0; }
    P .x2 { position: absolute; left: 610px; top: 615px; width: 300px; text-align: center; font: 900 150px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; opacity: 0; }
    P .x1 { position: absolute; left: 170px; top: 920px; width: 300px; text-align: center; font: 800 96px/1 "Lexend", sans-serif; color: ${CR}; opacity: 0; }
    P .sem { position: absolute; left: 0; right: 0; top: 1408px; text-align: center; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; opacity: 0; }`,
  html: `
      <div class="bar b0"></div><div class="bar b1"></div><div class="base"></div>
      <div class="x1">x1</div><div class="x2">x2</div>
      <div class="bl" style="left:170px">ANTES</div><div class="bl" style="left:610px">DESPUÉS</div>
      ${pill(1, 540, 1490, "SEGÚN SUS FUNDADORES", "mono")}
      <div class="sem">Facturación por semana</div>`,
  js: `
      pop(".n1", 0.05, 0.3, 0.6);
      tl.fromTo(q(".base"), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "power3.out" }, 0.1);
      // "lo que facturaban": la barra de antes
      tl.fromTo(q(".b0"), { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "power3.out" }, 0.3);
      tl.fromTo(qa(".bl")[0], { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.4);
      pop(".x1", 0.6, 0.25, 0.5);
      // "por semana"
      tl.fromTo(q(".sem"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, ${r2(w(55))});
      // "se duplicó": crece la de después hasta el doble, x2
      tl.fromTo(q(".b1"), { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "power3.out" }, ${r2(w(57))});
      tl.fromTo(qa(".bl")[1], { opacity: 0 }, { opacity: 1, duration: 0.2 }, ${r2(w(57) + 0.2)});
      pop(".x2", ${r2(w(58))}, 0.35, 0.4);
      tl.to(q(".x2"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r2(w(58) + 0.4)});
      salida(${r2(D("s07-duplico") - 0.2)});`,
  sfx: [{ t: 0.05, sfx: "click-soft", vol: 0.22 }, { t: w(53), sfx: "pop", vol: 0.2 }, { t: w(57), sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: w(58), sfx: "chime", vol: 0.25 }],
});

// ================= s08 · tu cliente también compra con los ojos =================
desde("s08-ojos");
const OJO = "M110 1000 Q540 620 970 1000 Q540 1380 110 1000 Z";
escena("s08-ojos", {
  css: `
    P .pu-tel { position: absolute; left: 491px; top: 920px; width: 98px; height: 160px; border-radius: 16px; background: ${CR}; opacity: 0; }
    P .pu-tel i { position: absolute; left: 10px; top: 12px; width: 78px; height: 56px; border-radius: 8px; background: ${G}; }
    P .pu-tel b { position: absolute; left: 10px; top: 80px; width: 56px; height: 14px; border-radius: 7px; background: ${NAVY3}; }
    P .pu-tel em { position: absolute; left: 10px; top: 120px; width: 78px; height: 26px; border-radius: 8px; background: ${GD}; }`,
  html: `
      <svg class="full ojo" viewBox="0 0 1080 1920" aria-hidden="true">
        <defs><clipPath id="ojo-clip"><path d="${OJO}"/></clipPath></defs>
        <ellipse cx="540" cy="1340" rx="380" ry="18" fill="rgba(3,6,12,0.5)"/>
        <path d="${OJO}" fill="#ffffff"/>
        <g clip-path="url(#ojo-clip)">
          <path d="M110 1000 Q540 620 970 1000 L970 860 L110 860 Z" fill="${CRD}" opacity="0.5"/>
          <g class="iris"><circle cx="540" cy="1000" r="230" fill="${G}"/><circle cx="540" cy="1000" r="230" fill="none" stroke="${GD}" stroke-width="22"/>
            <path d="M540 1000 m-170 0 a170 170 0 0 1 340 0" fill="none" stroke="${GL}" stroke-width="14" opacity="0.6"/>
            <circle class="pupila" cx="540" cy="1000" r="118" fill="${NAVY}"/>
            <ellipse cx="468" cy="926" rx="40" ry="24" transform="rotate(-30 468 926)" fill="rgba(255,255,255,0.8)"/></g>
          <rect class="parp" x="100" y="560" width="880" height="460" fill="${NAVY}"/>
          <rect class="parp2" x="100" y="1000" width="880" height="460" fill="${NAVY}"/>
        </g>
        <path d="${OJO}" fill="none" stroke="${CR}" stroke-width="10" stroke-linejoin="round"/>
        ${[[200, 830, 150, 740], [330, 760, 300, 660], [540, 730, 540, 620], [750, 760, 780, 660], [880, 830, 930, 740]].map(([x1, y1, x2, y2]) => `<path class="pest" d="M${x1} ${y1} L${x2} ${y2}" stroke="${CR}" stroke-width="12" stroke-linecap="round"/>`).join("")}
      </svg>
      <div class="pu-tel"><i></i><b></b><em></em></div>
      ${pill(1, 540, 1420, "Antes de llegar", "lleno")}`,
  js: `
      const OJ = q(".ojo");
      // parpadeo al entrar: los párpados se abren
      tl.fromTo(OJ, { opacity: 0, scale: 0.85, transformOrigin: "540px 1000px" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".parp"), { y: 0 }, { y: -440, duration: 0.3, ease: "power3.out" }, 0.12);
      tl.fromTo(q(".parp2"), { y: 0 }, { y: 440, duration: 0.3, ease: "power3.out" }, 0.12);
      // "también compra": el iris mira a los lados y en la pupila aparece una pantalla
      tl.to(q(".iris"), { x: -80, duration: 0.25, ease: "power2.inOut" }, ${r2(w(61) - 0.1)});
      tl.to(q(".iris"), { x: 60, duration: 0.3, ease: "power2.inOut" }, ${r2(w(61) + 0.25)});
      tl.to(q(".iris"), { x: 0, duration: 0.25, ease: "power2.inOut" }, ${r2(w(62) + 0.15)});
      tl.fromTo(q(".pu-tel"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ${r2(w(62) + 0.35)});
      // "compra con los ojos"
      pop(".n1", ${r2(w(61) + 0.2)});
      // match cut: zoom a la pupila (la pantalla se vuelve el celular de la escena siguiente)
      const Z = ${r2(D("s08-ojos") - 0.4)};
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, Z);
      tl.to(OJ, { scale: 4, opacity: 0, transformOrigin: "540px 1000px", duration: 0.4, ease: "power3.in" }, Z);
      tl.to(q(".pu-tel"), { scale: 4.6, duration: 0.4, ease: "power3.in" }, Z);
      tl.to(q(".pu-tel"), { opacity: 0, duration: 0.12 }, ${r2(D("s08-ojos") - 0.12)});`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.18 }, { t: w(62) + 0.35, sfx: "pop", vol: 0.22 }, { t: w(65), sfx: "click-soft", vol: 0.24 }, { t: D("s08-ojos") - 0.4, sfx: "whoosh", vol: 0.2, max: 0.5 }],
});

// ================= s09 · hacemos tu sitio web: fotos claras, precios y un botón a WhatsApp =================
desde("s09-web");
escena("s09-web", {
  css: `
    P .cel { position: absolute; left: 290px; top: 580px; width: 500px; height: 770px; }
    P .cel-lado { position: absolute; left: 14px; top: 16px; width: 500px; height: 770px; border-radius: 70px; background: #a9a798; }
    P .cel-cuerpo { position: absolute; left: 0; top: 0; width: 500px; height: 770px; border-radius: 70px; background: ${CR}; }
    P .cel-pan { position: absolute; left: 20px; top: 20px; width: 460px; height: 730px; border-radius: 52px; background: #ffffff; overflow: hidden; }
    P .w-top { position: absolute; left: 0; top: 0; width: 460px; height: 110px; background: ${NAVY}; }
    P .w-top b { position: absolute; left: 34px; top: 40px; width: 36px; height: 36px; border-radius: 50%; background: ${G}; }
    P .w-top span { position: absolute; left: 86px; top: 38px; font: 700 38px/1 "Lexend", sans-serif; color: #fff; }
    P .w-foto { position: absolute; left: 24px; top: 132px; width: 412px; height: 330px; border-radius: 26px; background: #dff6cf; overflow: hidden; }
    P .w-foto svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    P .w-nom { position: absolute; left: 30px; top: 488px; font: 700 36px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .w-pre { position: absolute; left: 30px; top: 540px; font: 900 58px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .w-btn { position: absolute; left: 24px; top: 628px; width: 412px; height: 82px; border-radius: 41px; background: ${G}; font: 700 34px/82px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .w-tap { position: absolute; left: 300px; top: 640px; width: 60px; height: 60px; border-radius: 50%; border: 7px solid ${NAVY}; box-sizing: border-box; opacity: 0; }
    P .lb { position: absolute; padding: 12px 22px; border-radius: 14px; background: ${G}; font: 700 38px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    P .chip { position: absolute; left: 540px; top: 1450px; padding: 12px 24px; border-radius: 16px; background: ${NAVY3}; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; white-space: nowrap; opacity: 0; transform: translateX(-50%); }`,
  html: `
      <div class="cel" data-layout-allow-overlap><div class="cel-lado"></div><div class="cel-cuerpo"></div><div class="cel-pan">
        <div class="w-top"><b></b><span>Tu negocio</span></div>
        <div class="w-foto"><svg viewBox="0 0 412 330" aria-hidden="true">
          <path d="M0 230 H412 V330 H0 Z" fill="${CRD}"/>
          <path d="M120 80 L330 40 L330 120 L120 160 Z" fill="rgba(255,255,255,0.55)"/>
          <ellipse cx="206" cy="268" rx="160" ry="30" fill="#ffffff"/><ellipse cx="206" cy="262" rx="150" ry="24" fill="${CR}"/>
          <rect x="76" y="140" width="260" height="122" rx="16" fill="${NAVY3}"/>
          <rect x="76" y="186" width="260" height="22" fill="${CR}"/>
          <path d="M76 140 H336 V156 Q316 176 296 156 Q276 176 256 156 Q236 176 216 156 Q196 176 176 156 Q156 176 136 156 Q116 176 96 156 Q86 166 76 156 Z" fill="#ffffff"/>
          <rect x="236" y="140" width="100" height="122" fill="rgba(3,6,12,0.18)"/>
          <circle cx="160" cy="118" r="22" fill="${G}"/><circle cx="206" cy="110" r="22" fill="${GD}"/><circle cx="252" cy="118" r="22" fill="${G}"/>
          <path d="M206 88 Q210 64 226 56" stroke="${GD}" stroke-width="8" fill="none" stroke-linecap="round"/>
        </svg></div>
        <div class="w-nom">Torta de la casa</div>
        <div class="w-pre">$ 690</div>
        <div class="w-btn">Pedir por WhatsApp</div><div class="w-tap"></div>
      </div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${guia("g1", 360, 820, 150, 720)}${guia("g2", 560, 1150, 900, 1050)}${guia("g3", 360, 1250, 150, 1330)}</svg>
      <div class="lb l1" style="left:60px;top:640px">Fotos claras</div>
      <div class="lb l2" style="left:770px;top:970px">Precios</div>
      <div class="lb l3" style="left:50px;top:1350px">WhatsApp</div>
      <div class="chip">SITIO WEB · LO HACEMOS</div>`,
  js: `
      const CEL = q(".cel");
      // la pantallita de la pupila llega como el celular grande
      tl.fromTo(CEL, { opacity: 0, scale: 0.55, y: 60, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      qa(".w-top, .w-foto, .w-nom, .w-pre, .w-btn").forEach((e, i) => tl.fromTo(e, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.out" }, 0.25 + i * 0.07));
      tl.fromTo(q(".chip"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25 }, ${r2(w(68))});
      // "fotos claras"
      etiqueta(".g1", ".l1", ${r2(w(70) - 0.1)});
      tl.fromTo(q(".w-foto svg"), { scale: 1.15, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, ${r2(w(70))});
      // "precios"
      etiqueta(".g2", ".l2", ${r2(w(72) - 0.1)});
      tl.fromTo(q(".w-pre"), { scale: 1 }, { scale: 1.12, transformOrigin: "0% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(72) + 0.1)});
      // "botón a WhatsApp": etiqueta, toque y pulso
      etiqueta(".g3", ".l3", ${r2(w(75) - 0.1)});
      tl.fromTo(q(".w-tap"), { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" }, ${r2(w(77))});
      tl.to(q(".w-btn"), { scale: 0.95, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, ${r2(w(77) + 0.18)});
      tl.to(q(".w-tap"), { opacity: 0, scale: 1.8, duration: 0.3 }, ${r2(w(77) + 0.3)});
      tl.to(CEL, { y: -10, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(77) + 0.2)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: w(68), sfx: "click-soft", vol: 0.22 }, { t: w(70), sfx: "pop", vol: 0.22 }, { t: w(72), sfx: "pop", vol: 0.22 }, { t: w(75), sfx: "pop", vol: 0.22 }, { t: w(77) + 0.18, sfx: "click", vol: 0.28 }],
});

// ================= s10 · CTA =================
desde("s10-cta");
escena("s10-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 600px; width: 922px; height: 470px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 616px; width: 922px; height: 470px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 390px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg.av { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 266px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1130px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1272px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1460px; color: ${G}; font-size: 112px; }
    P .mini { position: absolute; left: 415px; top: 640px; width: 250px; height: 385px; border-radius: 40px; background: ${CR}; }
    P .mini i { position: absolute; left: 14px; top: 14px; right: 14px; height: 170px; border-radius: 28px; background: #dff6cf; }
    P .mini b { position: absolute; left: 14px; right: 14px; bottom: 18px; height: 44px; border-radius: 22px; background: ${G}; }`,
  html: `
      <div class="mini"><i></i><b></b></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg class="av" width="160" height="160" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg><div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      // "¿lo vemos para tu negocio?": el celular se achica y entra la videollamada
      tl.fromTo(q(".mini"), { opacity: 1, scale: 1.9, transformOrigin: "50% 30%" }, { scale: 1, duration: 0.4, ease: "power3.out" }, 0);
      tl.to(q(".mini"), { opacity: 0, scale: 0.7, duration: 0.2 }, 0.5);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }, 0.5);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.65);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(85) - 0.05)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(86) - 0.1)});
      caja(".sb", ${r2(w(86) + 0.1)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(88) - 0.1)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(88) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(88) + 0.4)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.65, sfx: "pop", vol: 0.22 }, { t: w(85) - 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: w(86) + 0.1, sfx: "click-soft", vol: 0.28 }, { t: w(88) - 0.1, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
