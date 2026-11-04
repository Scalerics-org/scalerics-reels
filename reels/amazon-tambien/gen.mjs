// Generador de escenas de reels/amazon-tambien (correr desde la carpeta del reel, después
// `node armar.mjs`). Estilo "resultaaquee" sobre fondo CREMA: un objeto grande relleno por escena
// (navy y verde, con lado oscuro y sombra plana), que se transforma en el siguiente.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", CR2 = "#dcdacb", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", W = "#ffffff";
const SOMBRA = "rgba(11,18,32,0.16)";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const mas = (r = 26) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="26" fill="${NAVY}"/><path d="M26 14 V38 M14 26 H38" stroke="${CR}" stroke-width="6" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;

// íconos de producto, viewBox 0 0 240 200 (genéricos, sin marcas)
const ICO = {
  carpa: `<polygon points="20,176 120,24 220,176" fill="${G}"/><polygon points="120,24 220,176 120,176" fill="${GD}"/><polygon points="92,176 120,92 148,176" fill="${NAVY}"/><path d="M120 24 L120 8" stroke="${NAVY}" stroke-width="8" stroke-linecap="round"/><rect x="8" y="172" width="224" height="12" rx="6" fill="${NAVY}"/>`,
  linterna: `<polygon points="160,62 236,30 236,170 160,138" fill="rgba(92,230,17,0.35)"/><rect x="16" y="76" width="112" height="48" rx="14" fill="${NAVY2}"/><rect x="16" y="104" width="112" height="20" rx="10" fill="${NAVY}"/><polygon points="122,70 166,52 166,148 122,130" fill="${G}"/><polygon points="122,104 166,104 166,148 122,130" fill="${GD}"/><rect x="58" y="66" width="30" height="14" rx="6" fill="${G}"/>`,
  bolsa: `<rect x="20" y="58" width="168" height="104" rx="22" fill="${G}"/><rect x="20" y="118" width="168" height="44" rx="20" fill="${GD}"/><ellipse cx="188" cy="110" rx="34" ry="52" fill="${GD}"/><ellipse cx="188" cy="110" rx="20" ry="32" fill="${NAVY2}"/><ellipse cx="188" cy="110" rx="8" ry="13" fill="${G}"/><rect x="62" y="52" width="16" height="116" rx="6" fill="${NAVY}"/><rect x="128" y="52" width="16" height="116" rx="6" fill="${NAVY}"/>`,
  cafe: `<path d="M64 30 H176 L188 186 H52 Z" fill="${NAVY2}"/><path d="M150 30 H176 L188 186 H160 Z" fill="${NAVY}"/><path d="M64 30 L80 14 H160 L176 30 Z" fill="${NAVY3}"/><rect x="72" y="82" width="96" height="62" rx="8" fill="${G}"/><text x="120" y="124" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="30" fill="${NAVY}">CAFÉ</text>`,
  filtro: `<polygon points="44,40 196,40 146,170 94,170" fill="${W}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/><path d="M70 74 H170 M84 110 H156 M100 144 H140" stroke="${CR2}" stroke-width="8" stroke-linecap="round"/>`,
  taza: `<path d="M48 54 H164 V140 Q164 178 126 178 H86 Q48 178 48 140 Z" fill="${NAVY2}"/><path d="M130 54 H164 V140 Q164 178 126 178 H120 Q142 170 142 140 V54 Z" fill="${NAVY}"/><path d="M164 78 Q206 78 206 112 Q206 146 164 146" fill="none" stroke="${NAVY}" stroke-width="16"/><rect x="48" y="90" width="116" height="22" fill="${G}"/>`,
  alfajor: `<ellipse cx="120" cy="150" rx="96" ry="30" fill="${NAVY}"/><rect x="24" y="112" width="192" height="38" fill="${NAVY}"/><rect x="28" y="96" width="184" height="22" rx="10" fill="${CR}"/><ellipse cx="120" cy="96" rx="96" ry="30" fill="${NAVY3}"/><rect x="24" y="66" width="192" height="30" fill="${NAVY3}"/><ellipse cx="120" cy="66" rx="96" ry="30" fill="${NAVY2}"/><path d="M60 58 Q90 44 120 52" stroke="rgba(239,238,229,0.35)" stroke-width="8" fill="none" stroke-linecap="round"/>`,
  gris1: `<rect x="40" y="50" width="160" height="110" rx="20" fill="#c9c7b8"/><rect x="170" y="88" width="40" height="34" rx="8" fill="#b4b2a3"/>`,
  gris2: `<rect x="60" y="30" width="56" height="150" rx="20" fill="#c9c7b8"/><rect x="124" y="30" width="56" height="150" rx="20" fill="#b4b2a3"/>`,
  gris3: `<path d="M50 120 Q50 30 120 30 Q190 30 190 120" fill="none" stroke="#c9c7b8" stroke-width="18"/><rect x="34" y="110" width="44" height="70" rx="16" fill="#b4b2a3"/><rect x="162" y="110" width="44" height="70" rx="16" fill="#b4b2a3"/>`,
};
const ico = (n) => `<svg class="ico" viewBox="0 0 240 200" aria-hidden="true">${ICO[n]}</svg>`;
const tile = (cls, n, nombre) => `<div class="tile ${cls}"><div class="tile-lado"></div><div class="tile-cara">${ico(n)}<div class="tn">${nombre}</div></div></div>`;

// carrito grande, viewBox 0 0 800 720 (posicionado por .carr)
const carrito = (dentro = "") => `
<div class="carr"><svg viewBox="0 0 800 720" aria-hidden="true">
  <ellipse cx="440" cy="690" rx="340" ry="26" fill="${SOMBRA}"/>
  <g class="dentro">${dentro}</g>
  <path d="M120 70 L212 476 L238 560 L700 560" fill="none" stroke="${NAVY}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <polygon points="150,150 780,150 712,476 212,476" fill="${NAVY2}"/>
  <polygon points="560,150 780,150 712,476 520,476" fill="${NAVY}"/>
  ${[0, 1, 2, 3, 4].map((i) => { const t = (i + 1) / 6; return `<path d="M${150 + t * 630} 166 L${212 + t * 500} 462" stroke="rgba(239,238,229,0.55)" stroke-width="8" stroke-linecap="round"/>`; }).join("")}
  <path d="M176 262 L752 262 M200 370 L730 370" stroke="rgba(239,238,229,0.55)" stroke-width="8" stroke-linecap="round"/>
  <rect x="134" y="128" width="664" height="40" rx="20" fill="${NAVY3}"/>
  <rect x="22" y="44" width="124" height="52" rx="26" fill="${G}"/>
  <rect x="22" y="70" width="124" height="26" rx="13" fill="${GD}"/>
  <circle cx="290" cy="626" r="48" fill="${NAVY}"/><circle cx="290" cy="626" r="18" fill="${CR}"/>
  <circle cx="650" cy="626" r="48" fill="${NAVY}"/><circle cx="650" cy="626" r="18" fill="${CR}"/>
</svg><div class="badge">0</div></div>`;
// la carpa adentro del carrito (coordenadas del carrito)
const CARPA_EN_CARRITO = `<g class="carpa-in"><g transform="translate(172 -92) scale(2.4)">${ICO.carpa}</g></g>`;

// celular (navy), 640 x 1080 en (220, 560)
const celular = (pantalla = "", cls = "") => `
<div class="telw ${cls}"><div class="tel-lado"></div><div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div></div>`;
const avatar = (s, fondo = NAVY2, fig = CR) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;

// pantalla de la tienda online (coordenadas de la pantalla: 604 x 1044)
const TIENDA = `
  <div class="ti-top"><span>TU TIENDA</span><div class="ti-cart"><svg width="56" height="50" viewBox="0 0 56 50"><path d="M2 6 H12 L20 36 H48 L54 14 H16" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="24" cy="44" r="5" fill="${NAVY}"/><circle cx="44" cy="44" r="5" fill="${NAVY}"/></svg><b class="ti-badge">1</b></div></div>
  <div class="ti-img">${ico("cafe")}</div>
  <div class="ti-nom">Café en grano 1 kg</div>
  <div class="ti-btn">${tick(20)}<span>En el carrito</span></div>
  <div class="ti-sec">LLEVÁ TAMBIÉN</div>
  ${[["filtro", "Filtros"], ["taza", "Taza"], ["alfajor", "Alfajores"]].map(([n, t], i) => `<div class="ti-t tt${i}" style="left:${24 + i * 192}px">${ico(n)}<div class="ti-tn">${t}</div><div class="ti-mas">${mas(26)}</div><div class="ti-ok">${tick(26)}</div></div>`).join("")}`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: ${SOMBRA}; }
    ${P} .carr { position: absolute; left: 120px; top: 640px; width: 800px; height: 720px; }
    ${P} .carr svg { width: 800px; height: 720px; overflow: visible; }
    ${P} .badge { position: absolute; left: 700px; top: 70px; width: 110px; height: 110px; border-radius: 50%; background: ${G}; border: 8px solid ${NAVY}; font: 800 58px/94px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }
    ${P} .tile { position: absolute; width: 300px; height: 300px; }
    ${P} .tile-lado { position: absolute; left: 14px; top: 16px; width: 100%; height: 100%; border-radius: 40px; background: ${CR2}; }
    ${P} .tile-cara { position: absolute; inset: 0; border-radius: 40px; background: ${W}; border: 7px solid ${NAVY}; overflow: hidden; }
    ${P} .tile .ico { position: absolute; left: 10%; top: 8%; width: 80%; height: 60%; }
    ${P} .tile .tn { position: absolute; left: 0; right: 0; bottom: 9%; text-align: center; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .pill { position: absolute; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${W}; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.navy { background: ${NAVY}; border-color: ${NAVY}; color: ${CR}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${GD}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${NAVY}; opacity: 0; } ${P} .dot.g { fill: ${GD}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.2); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .telw { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    ${P} .tel-lado { position: absolute; left: 240px; top: 580px; width: 640px; height: 1080px; border-radius: 84px; background: ${CR2}; }
    ${P} .tel { position: absolute; left: 220px; top: 560px; width: 640px; height: 1080px; border-radius: 84px; background: ${NAVY}; }
    ${P} .tel-pan { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; border-radius: 66px; background: ${W}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 250px; top: 32px; width: 140px; height: 32px; border-radius: 16px; background: ${NAVY}; }
    ${P} .ti-top { position: absolute; left: 36px; right: 36px; top: 76px; height: 60px; display: flex; justify-content: space-between; align-items: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(11,18,32,0.6); }
    ${P} .ti-cart { position: relative; width: 56px; height: 50px; }
    ${P} .ti-badge { position: absolute; right: -20px; top: -18px; width: 40px; height: 40px; border-radius: 50%; background: ${G}; border: 4px solid ${NAVY}; font: 800 22px/32px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }
    ${P} .ti-img { position: absolute; left: 24px; top: 156px; width: 556px; height: 330px; border-radius: 34px; background: ${CR}; }
    ${P} .ti-img .ico { position: absolute; left: 118px; top: 20px; width: 320px; height: 290px; }
    ${P} .ti-nom { position: absolute; left: 30px; top: 512px; font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ti-btn { position: absolute; left: 24px; top: 586px; width: 556px; height: 94px; border-radius: 47px; background: ${G}; display: flex; justify-content: center; align-items: center; gap: 16px; font: 700 36px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ti-btn svg circle { fill: ${NAVY}; } ${P} .ti-btn svg path { stroke: ${G}; }
    ${P} .ti-sec { position: absolute; left: 30px; top: 718px; padding: 6px 10px; font: 600 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${NAVY}; }
    ${P} .ti-t { position: absolute; top: 786px; width: 172px; height: 226px; border-radius: 28px; background: ${CR}; }
    ${P} .ti-t .ico { position: absolute; left: 14px; top: 14px; width: 144px; height: 120px; }
    ${P} .ti-tn { position: absolute; left: 0; right: 0; top: 146px; text-align: center; font: 700 30px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ti-mas, ${P} .ti-ok { position: absolute; left: 60px; top: 184px; width: 52px; height: 52px; }
    ${P} .ti-ok { opacity: 0; }
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
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const contar = (s, a, b, t) => { const el = q(s); el.textContent = a; tl.set(el, { textContent: b }, t); tl.fromTo(el, { scale: 1 }, { scale: 1.25, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, t); };
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
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
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 118px; text-align: center; font: 800 112px/1.06 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.035em; }
    P .tit .v { display: inline-block; background: ${G}; padding: 0 22px 8px; border-radius: 18px; }
    P .carr { top: 700px; }
    P .tile { width: 270px; height: 270px; }
    P .tile .tn { font-size: 36px; }`,
  html: `
      ${carrito(CARPA_EN_CARRITO)}
      ${tile("ta", "linterna", "Linterna")}
      ${tile("tb", "bolsa", "Bolsa")}
      <div class="tit"><div>¿Por qué <span class="v">Amazon</span></div><div>te muestra</div><div>lo que compraron</div><div>los demás?</div></div>`,
  js: `
      const C = q(".carr");
      gsap.set(q(".ta"), { left: 40, top: 1250, rotation: -6 });
      gsap.set(q(".tb"), { left: 770, top: 1250, rotation: 6 });
      // cuadro 0: el gancho entero, el carrito ya grande con la carpa
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(C, { y: 30, scale: 0.97, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".carpa-in"), { y: -40 }, { y: 0, duration: 0.5, ease: "bounce.out" }, 0);
      // "lo que compraron los demás": entran las tarjetitas de al lado
      tl.fromTo(q(".ta"), { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, 1.4);
      tl.fromTo(q(".tb"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, 1.62);
      tl.fromTo(q(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.4);
      tl.to(C, { y: -14, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.7);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, ${r2(ESC["s01-gancho"] - 0.32)});
      tl.to(qa(".ta, .tb"), { opacity: 0, y: 80, duration: 0.3, ease: "power2.in" }, ${r2(ESC["s01-gancho"] - 0.32)});`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.25 }, { t: 1.4, sfx: "whoosh-short", vol: 0.2 }, { t: 1.62, sfx: "pop", vol: 0.22 }],
});

// ================= s02 · el mejor momento =================
escena("s02-momento", {
  css: `
    P .carr { top: 600px; }
    P .btn { position: absolute; left: 140px; top: 1400px; width: 800px; height: 150px; border-radius: 75px; background: ${G}; font: 800 56px/150px "Lexend", sans-serif; text-align: center; color: ${NAVY}; box-shadow: 0 14px 0 ${GD}; opacity: 0; }
    P .cursor { position: absolute; left: 0; top: 0; width: 120px; height: 140px; opacity: 0; }`,
  html: `
      ${carrito(CARPA_EN_CARRITO)}
      <div class="btn">Agregar al carrito</div>
      <svg class="cursor" viewBox="0 0 120 140" aria-hidden="true"><path d="M14 8 L14 112 L40 88 L60 132 L82 122 L62 80 L100 80 Z" fill="${NAVY}" stroke="${W}" stroke-width="8" stroke-linejoin="round"/></svg>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 300, 600, 330, 760)}</svg>
      ${pill(1, 300, 570, "El mejor momento", "navy")}
      ${pill(2, 540, 1640, "Ya está comprando", "lleno")}`,
  js: `
      const C = q(".carr");
      gsap.set(C, { y: 100 });
      tl.to(C, { y: -20, duration: 0.6, ease: "power3.inOut" }, 0);
      tl.fromTo(q(".btn"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0.2);
      nota(1, 0.4);
      // el cursor va al botón y hace clic en "comprando"
      tl.fromTo(q(".cursor"), { opacity: 0, x: 900, y: 1780 }, { opacity: 1, x: 640, y: 1450, duration: 0.7, ease: "power2.out" }, 1.4);
      tl.to(q(".cursor"), { scale: 0.85, transformOrigin: "14px 8px", duration: 0.1, yoyo: true, repeat: 1 }, 2.6);
      tl.to(q(".btn"), { y: 10, boxShadow: "0 4px 0 ${GD}", duration: 0.1, yoyo: true, repeat: 1 }, 2.6);
      pop(".carr .badge", 2.7, 0.3, 0.3);
      contar(".carr .badge", 0, 1, 2.72);
      tl.to(q(".dentro"), { y: -24, duration: 0.15, yoyo: true, repeat: 1 }, 2.7);
      pop(".n2", 2.85);
      sinNota(1, ${r2(ESC["s02-momento"] - 0.3)});
      fuera(".n2, .btn, .cursor", ${r2(ESC["s02-momento"] - 0.3)});
      tl.to(C, { scale: 0.7, y: 40, opacity: 0, duration: 0.3, ease: "power2.in", transformOrigin: "50% 50%" }, ${r2(ESC["s02-momento"] - 0.3)});`,
  sfx: [{ t: 0.2, sfx: "whoosh-short", vol: 0.18 }, { t: 0.45, sfx: "pop", vol: 0.22 }, { t: 1.4, sfx: "whoosh-short", vol: 0.15 }, { t: 2.6, sfx: "click", vol: 0.32 }, { t: 2.72, sfx: "ping", vol: 0.28 }],
});

// ================= s03 · clientes no, productos sí =================
escena("s03-compara", {
  css: `
    P .av { position: absolute; top: 700px; width: 380px; height: 380px; }
    P .av.a { left: 70px; } P .av.b { left: 630px; }
    P .igual { position: absolute; left: 450px; top: 790px; width: 180px; height: 180px; font: 800 170px/180px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }
    P .tile { top: 740px; width: 380px; height: 380px; }
    P .tile.ta { left: 50px; } P .tile.tb { left: 650px; }
    P .tile .tn { font-size: 46px; }
    P .link { fill: none; stroke: ${GD}; stroke-width: 12; stroke-linecap: round; }
    P .tach { fill: none; stroke: ${RED}; stroke-width: 14; stroke-linecap: round; }`,
  html: `
      ${sombra("sh1", 260, 1200, 340, 40)}${sombra("sh2", 820, 1200, 340, 40)}
      <div class="av a">${avatar(380)}</div><div class="av b">${avatar(380, NAVY3)}</div>
      <div class="igual">=</div>
      ${tile("ta", "carpa", "Carpa")}${tile("tb", "linterna", "Linterna")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="tach" d="M90 1300 L990 640"/>
        <path class="link" d="M440 930 C 500 860, 580 860, 640 930"/>
      </svg>
      ${pill(1, 540, 1340, "Cliente con cliente", "r")}
      ${pill(2, 540, 1340, "Producto con producto", "lleno")}`,
  js: `
      const [A, B] = qa(".av");
      tl.fromTo([A, B], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)", stagger: 0.1 }, 0);
      pop(".igual", 0.35, 0.3, 0.3);
      nota(1, 0.6);
      dibujar(".tach", 1.0, 0.3);
      tl.to(qa(".av, .igual"), { opacity: 0.35, duration: 0.2 }, 1.2);
      // los clientes se dan vuelta y son productos
      fuera(".n1, .tach, .igual", 1.95, 0.18);
      tl.to([A, B], { scaleX: 0, opacity: 1, duration: 0.18, ease: "power2.in" }, 1.95);
      tl.fromTo(qa(".tile"), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.24, ease: "back.out(1.6)", stagger: 0.06 }, 2.13);
      dibujar(".link", 2.5, 0.35);
      nota(2, 2.6);
      tl.fromTo(qa(".tile"), { y: 0 }, { y: -14, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.1, immediateRender: false }, 2.9);
      salida(${r2(ESC["s03-compara"] - 0.28)});`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.22 }, { t: 0.6, sfx: "pop", vol: 0.2 }, { t: 1.0, sfx: "glitch-1", vol: 0.14, max: 0.35 }, { t: 1.95, sfx: "whoosh-short", vol: 0.2 }, { t: 2.6, sfx: "click-soft", vol: 0.3 }],
});

// ================= s04 · carpa en el carrito, aparece la linterna =================
escena("s04-carrito", {
  css: `
    P .carr { left: 20px; top: 640px; transform-origin: 400px 600px; }
    P .tile { left: 650px; top: 1180px; width: 380px; height: 380px; }
    P .tile .tn { font-size: 46px; }
    P .sup { position: absolute; left: 0; right: 0; top: 20px; text-align: center; font: 600 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }`,
  html: `
      ${carrito(CARPA_EN_CARRITO)}
      ${tile("ta", "linterna", "Linterna")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 840, 1110, 700, 940, "g")}</svg>
      ${pill(1, 840, 1110, "También la llevaron", "lleno")}`,
  js: `
      const C = q(".carr");
      q(".ta .tile-cara").insertAdjacentHTML("afterbegin", '<div class="sup">TAMBIÉN COMPRARON</div>');
      gsap.set(C, { scale: 0.86 });
      tl.fromTo(C, { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      // cae la carpa
      tl.fromTo(q(".carpa-in"), { y: -520, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, 0.2);
      pop(".carr .badge", 0.7, 0.25, 0.3);
      contar(".carr .badge", 0, 1, 0.72);
      // aparece la linterna
      tl.fromTo(q(".ta"), { opacity: 0, scale: 0.4, x: -160, y: -200, rotation: -12 }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 4, duration: 0.5, ease: "back.out(1.5)" }, 1.3);
      tl.fromTo(q(".ta .ico polygon"), { opacity: 0.35 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, 1.9);
      nota(1, 1.75);
      tl.to(q(".ta"), { y: -10, rotation: 2, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.0);
      sinNota(1, ${r2(ESC["s04-carrito"] - 0.25)});
      tl.to(C, { opacity: 0, x: -200, duration: 0.25, ease: "power2.in" }, ${r2(ESC["s04-carrito"] - 0.25)});`,
  sfx: [{ t: 0.2, sfx: "whoosh-short", vol: 0.2 }, { t: 0.62, sfx: "pop", vol: 0.28 }, { t: 1.3, sfx: "sparkle", vol: 0.25 }, { t: 1.8, sfx: "pop", vol: 0.2 }],
});

// ================= s05 · pero ojo: no lo más vendido =================
const FILAS = [["gris1", "Cargador"], ["gris2", "Pilas"], ["gris3", "Auriculares"]];
escena("s05-ojo", {
  css: `
    P .rk-lado { position: absolute; left: 134px; top: 616px; width: 840px; height: 900px; border-radius: 48px; background: ${CR2}; }
    P .rk { position: absolute; left: 120px; top: 600px; width: 840px; height: 900px; border-radius: 48px; background: ${W}; border: 7px solid ${NAVY}; overflow: hidden; }
    P .rk-h { position: absolute; left: 0; right: 0; top: 0; height: 150px; background: ${NAVY}; font: 800 60px/150px "Lexend", sans-serif; text-align: center; color: ${CR}; letter-spacing: 0.01em; }
    P .rk-f { position: absolute; left: 40px; right: 40px; height: 210px; display: flex; align-items: center; gap: 30px; border-bottom: 6px solid ${CR2}; }
    P .rk-n { width: 90px; font: 800 96px/1 "Lexend", sans-serif; color: #b4b2a3; text-align: center; }
    P .rk-f .ico { width: 210px; height: 175px; }
    P .rk-t { font: 700 52px/1 "Lexend", sans-serif; color: #8f8d80; }
    P .tach { fill: none; stroke: ${RED}; stroke-width: 18; stroke-linecap: round; }
    P .tile { left: 650px; top: 1180px; width: 380px; height: 380px; }
    P .tile .tn { font-size: 46px; }`,
  html: `
      ${tile("ta", "linterna", "Linterna")}
      <div class="rkw"><div class="rk-lado"></div><div class="rk"><div class="rk-h">MÁS VENDIDOS</div>
        ${FILAS.map(([n, t], i) => `<div class="rk-f f${i}" style="top:${170 + i * 230}px"><div class="rk-n">${i + 1}</div>${ico(n)}<div class="rk-t">${t}</div></div>`).join("")}
      </div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="tach x1" d="M170 680 L910 1420"/><path class="tach x2" d="M910 680 L170 1420"/></svg>
      ${pill(1, 540, 1620, "No es lo que te muestra", "rl")}`,
  js: `
      const R = q(".rkw");
      gsap.set(q(".ta"), { rotation: 4 });
      // "Pero ojo": la linterna se da vuelta y es el ranking
      tl.to(q(".ta"), { x: -300, y: -320, scale: 2.3, rotation: 0, opacity: 0, duration: 0.4, ease: "power3.inOut" }, 0.0);
      tl.fromTo(R, { opacity: 0, scale: 0.6, transformOrigin: "540px 1050px" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, 0.22);
      qa(".rk-f").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, 0.55 + i * 0.12));
      // no te muestra lo más vendido
      dibujar(".x1", 1.45, 0.22); dibujar(".x2", 1.62, 0.22);
      tl.to(R, { opacity: 0.55, duration: 0.25 }, 1.6);
      pop(".n1", 1.75);
      tl.fromTo(R, { x: 0 }, { x: 14, duration: 0.05, yoyo: true, repeat: 5, immediateRender: false }, 1.62);
      salida(${r2(ESC["s05-ojo"] - 0.26)});`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.55, sfx: "click-soft", vol: 0.22 }, { t: 1.5, sfx: "glitch-1", vol: 0.18, max: 0.4 }, { t: 1.75, sfx: "pop", vol: 0.22 }],
});

// ================= s06 · lo que va con lo tuyo =================
escena("s06-va-con", {
  css: `
    P .tile.tc { left: 260px; top: 590px; width: 560px; height: 520px; }
    P .tile.tc .tn { font-size: 60px; }
    P .tile.tc .tile-cara { border-color: ${GD}; border-width: 10px; }
    P .tile.ta { left: 40px; top: 1230px; width: 400px; height: 360px; }
    P .tile.tb { left: 640px; top: 1230px; width: 400px; height: 360px; }
    P .tile .tn { font-size: 44px; }
    P .link { fill: none; stroke: ${GD}; stroke-width: 12; stroke-linecap: round; }
    P .lab { position: absolute; left: 290px; top: 616px; padding: 8px 18px; border-radius: 14px; background: ${NAVY}; font: 600 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; opacity: 0; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="link lk1" d="M420 1110 L260 1236"/><path class="link lk2" d="M660 1110 L820 1236"/></svg>
      ${tile("tc", "carpa", "Tu carpa")}
      ${tile("ta", "linterna", "Linterna")}${tile("tb", "bolsa", "Bolsa de dormir")}
      <div class="lab">LO TUYO</div>
      ${selbox("sb", 238, 568, 604, 564)}
      ${pill(1, 540, 1180, "Va con lo tuyo", "lleno")}`,
  js: `
      tl.fromTo(q(".tc"), { opacity: 0, scale: 0.7, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0);
      pop(".lab", 0.3, 0.25);
      caja(".sb", 0.45);
      dibujar(".lk1", 0.65, 0.25); dibujar(".lk2", 0.75, 0.25);
      tl.fromTo(q(".ta"), { opacity: 0, scale: 0.5, x: 120, y: -120 }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: -4, duration: 0.4, ease: "back.out(1.5)" }, 0.75);
      tl.fromTo(q(".tb"), { opacity: 0, scale: 0.5, x: -120, y: -120 }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 4, duration: 0.4, ease: "back.out(1.5)" }, 0.9);
      pop(".n1", 1.15);
      tl.fromTo(qa(".tile"), { y: 0 }, { y: -12, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.08, immediateRender: false }, 1.4);
      salida(${r2(ESC["s06-va-con"] - 0.26)});`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.22 }, { t: 0.45, sfx: "click-soft", vol: 0.25 }, { t: 0.75, sfx: "pop", vol: 0.2 }, { t: 0.9, sfx: "pop", vol: 0.2 }, { t: 1.15, sfx: "ping", vol: 0.22 }],
});

// ================= s07 · ¿y vos qué le ofrecés? =================
escena("s07-vos", {
  css: `
    P .bag { position: absolute; left: 70px; top: 600px; width: 560px; height: 860px; overflow: visible; }
    P .slot { position: absolute; left: 680px; top: 860px; width: 320px; height: 420px; border-radius: 40px; border: 9px dashed ${NAVY}; background: rgba(11,18,32,0.05); font: 800 230px/400px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }`,
  html: `
      <svg class="bag" viewBox="0 0 560 860" aria-hidden="true">
        <ellipse cx="300" cy="830" rx="290" ry="26" fill="${SOMBRA}"/>
        <path d="M150 300 Q150 170 260 170 Q370 170 370 300" fill="none" stroke="${NAVY}" stroke-width="22"/>
        <g class="cafe"><g transform="translate(70 30) scale(1.75)">${ICO.cafe}</g></g>
        <polygon points="40,280 450,280 470,810 20,810" fill="${G}"/>
        <polygon points="450,280 530,250 550,770 470,810" fill="${GD}"/>
        <rect x="40" y="280" width="410" height="36" fill="rgba(11,18,32,0.12)"/>
        <rect x="120" y="470" width="250" height="150" rx="20" fill="${CR}"/>
        <text x="245" y="565" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="60" fill="${NAVY}">TU LOCAL</text>
      </svg>
      <div class="slot">?</div>
      ${pill(1, 840, 700, "¿Filtros?")}
      ${pill(2, 840, 1380, "¿Una taza?")}
      ${pill(3, 330, 1560, "Ya está pagando", "lleno")}`,
  js: `
      tl.fromTo(q(".bag"), { opacity: 0, y: 120, scale: 0.85, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".cafe"), { y: 160 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, 0.15);
      tl.fromTo(q(".slot"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" }, 0.45);
      tl.fromTo(q(".slot"), { rotation: 0 }, { rotation: 4, duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, 0.85);
      pop(".n1", 0.95); pop(".n2", 1.15);
      pop(".n3", 1.55);
      salida(${r2(ESC["s07-vos"] - 0.26)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.45, sfx: "pop", vol: 0.22 }, { t: 0.95, sfx: "click-soft", vol: 0.22 }, { t: 1.15, sfx: "click-soft", vol: 0.22 }, { t: 1.55, sfx: "pop", vol: 0.25 }],
});

// ================= s08 · a tu escala =================
escena("s08-escala", {
  css: `
    P .box { position: absolute; left: 140px; top: 640px; width: 800px; height: 760px; overflow: visible; }`,
  html: `
      <svg class="box" viewBox="0 0 800 760" aria-hidden="true">
        <ellipse class="sh" cx="400" cy="730" rx="380" ry="28" fill="${SOMBRA}"/>
        <g class="caja">
          <polygon points="60,200 560,200 560,700 60,700" fill="${NAVY2}"/>
          <polygon points="560,200 740,110 740,600 560,700" fill="${NAVY}"/>
          <polygon points="60,200 240,110 740,110 560,200" fill="${NAVY3}"/>
          <polygon points="270,200 350,200 530,110 450,110" fill="${G}"/>
          <rect x="270" y="200" width="80" height="500" fill="${G}"/>
          <rect x="270" y="200" width="80" height="500" fill="rgba(11,18,32,0.0)"/>
          <rect x="100" y="560" width="140" height="90" rx="10" fill="${CR}"/>
          <path d="M120 590 H220 M120 620 H190" stroke="${NAVY}" stroke-width="8" stroke-linecap="round"/>
        </g>
      </svg>
      ${pill(1, 540, 1530, "A tu escala", "lleno")}`,
  js: `
      tl.fromTo(q(".box"), { opacity: 0, scale: 1.25, transformOrigin: "50% 90%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, 0);
      // a tu escala: la caja se achica
      tl.to(q(".box"), { scale: 0.55, y: 120, duration: 0.45, ease: "back.out(1.4)" }, 1.05);
      pop(".n1", 1.25);
      tl.to(q(".box"), { scale: 0.3, y: 260, opacity: 0, duration: 0.25, ease: "power2.in" }, ${r2(ESC["s08-escala"] - 0.25)});
      fuera(".n1", ${r2(ESC["s08-escala"] - 0.25)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.05, sfx: "whoosh-short", vol: 0.2 }, { t: 1.25, sfx: "pop", vol: 0.25 }],
});

// ================= s09 · tu tienda online con "llevá también" =================
escena("s09-tienda", {
  css: `
    P .cursor { position: absolute; left: 0; top: 0; width: 110px; height: 128px; opacity: 0; }`,
  html: `
      ${celular(TIENDA)}
      ${selbox("sb", 254, 1290, 344, 68)}
      <svg class="cursor" viewBox="0 0 120 140" aria-hidden="true"><path d="M14 8 L14 112 L40 88 L60 132 L82 122 L62 80 L100 80 Z" fill="${NAVY}" stroke="${W}" stroke-width="8" stroke-linejoin="round"/></svg>
      `,
  js: `
      const T = q(".telw");
      tl.fromTo(T, { opacity: 0, scale: 0.6, y: 200, transformOrigin: "540px 1100px" }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".ti-img .ico"), { scale: 0.6, transformOrigin: "50% 80%" }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0.3);
      tl.fromTo(q(".ti-btn"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.75);
      tl.fromTo(q(".ti-badge"), { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.95);
      // llevá también
      tl.fromTo(q(".ti-sec"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.25 }, 1.6);
      caja(".sb", 1.75);
      qa(".ti-t").forEach((t, i) => tl.fromTo(t, { opacity: 0, y: 60, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }, 1.85 + i * 0.12));
      // en cada producto: un clic al alfajor y suma al carrito
      tl.fromTo(q(".cursor"), { opacity: 0, x: 900, y: 1750 }, { opacity: 1, x: 735, y: 1560, duration: 0.45, ease: "power2.out" }, 2.4);
      tl.to(q(".cursor"), { scale: 0.85, transformOrigin: "14px 8px", duration: 0.1, yoyo: true, repeat: 1 }, 2.9);
      tl.to(q(".tt2 .ti-mas"), { opacity: 0, duration: 0.1 }, 2.95);
      pop(".tt2 .ti-ok", 2.95, 0.25, 0.4);
      tl.set(q(".ti-badge"), { textContent: "2" }, 3.0);
      tl.fromTo(q(".ti-badge"), { scale: 1 }, { scale: 1.5, duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, 3.0);
      tl.to(qa(".sb, .cursor"), { opacity: 0, duration: 0.2 }, ${r2(ESC["s09-tienda"] - 0.22)});`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.95, sfx: "pop", vol: 0.2 }, { t: 1.75, sfx: "click-soft", vol: 0.28 }, { t: 1.85, sfx: "pop", vol: 0.18 }, { t: 2.9, sfx: "click", vol: 0.3 }, { t: 3.0, sfx: "ping", vol: 0.28 }],
});

// ================= s10 · CTA =================
escena("s10-cta", {
  css: `
    P .preg { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font: 800 92px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; opacity: 0; }
    P .preg .v { display: inline-block; background: ${G}; padding: 0 18px 6px; border-radius: 16px; }
    P .vc { position: absolute; left: 79px; top: 560px; width: 922px; height: 480px; border-radius: 70px; background: ${NAVY}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 578px; width: 922px; height: 480px; border-radius: 70px; background: ${CR2}; opacity: 0; }
    P .vc-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 56px; background: ${NAVY2}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 396px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 190px; top: 80px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: ${NAVY}; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 268px; height: 220px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 680px; top: 272px; width: 124px; height: 124px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 28px; top: 36px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1110px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1256px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 80px; right: 80px; top: 1452px; height: 170px; border-radius: 85px; background: ${G}; border: 8px solid ${NAVY}; text-align: center; font: 800 104px/150px "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; opacity: 0; }`,
  html: `
      <div class="preg"><div>¿Querés verlo</div><div>con <span class="v">tus productos?</span></div></div>
      ${celular(TIENDA, "telg")}
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(200)}<div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const TG = q(".telg");
      gsap.set(q(".ti-badge"), { textContent: "2" });
      gsap.set(q(".tt2 .ti-mas"), { opacity: 0 }); gsap.set(q(".tt2 .ti-ok"), { opacity: 1 });
      gsap.set(q(".ti-sec"), { opacity: 1 });
      tl.fromTo(q(".preg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.0);
      tl.to(TG, { scale: 1.03, transformOrigin: "540px 1100px", duration: 0.5, ease: "sine.inOut" }, 0);
      // gira a horizontal y se vuelve la videollamada
      tl.to(TG, { rotation: -90, scale: 0.8, y: -300, duration: 0.6, ease: "power3.inOut" }, 0.9);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.46);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.42);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.5);
      tl.to(q(".preg"), { opacity: 0, y: -30, duration: 0.25 }, 1.4);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.25);
      caja(".sb", 2.45);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.1);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.6);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.6);`,
  sfx: [{ t: 0.9, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.5, sfx: "pop", vol: 0.22 }, { t: 2.0, sfx: "whoosh-short", vol: 0.2 }, { t: 2.45, sfx: "click-soft", vol: 0.28 }, { t: 3.1, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
