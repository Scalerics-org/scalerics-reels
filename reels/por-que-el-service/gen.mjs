// Generador de escenas de reels/por-que-el-service (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Estilo "resultaaquee" copiado de por-que-la-tarjeta: un objeto
// grande relleno por escena que se transforma: auto → ficha → odómetro y calendario → celular con
// el aviso → tu negocio → tijera, lentes, bolsa → clientes → ficha del CRM → videollamada.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const BG = "#16243d", NAVY = "#0b1220", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;
const avatar = (s = 140, fondo = CR, fig = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;

// auto genérico de costado (viewBox 900 x 400), relleno verde con canto oscuro, sin marca
const AUTO = `
<svg class="auto-svg" viewBox="0 0 900 400" aria-hidden="true">
  <path d="M40 300 L40 214 Q40 182 82 176 L214 164 L300 82 Q312 68 332 68 L586 68 Q606 68 620 82 L716 164 L828 178 Q868 184 868 222 L868 300 Q868 318 850 318 L58 318 Q40 318 40 300 Z" fill="${G}"/>
  <path d="M40 258 L868 258 L868 300 Q868 318 850 318 L58 318 Q40 318 40 300 Z" fill="${GD}"/>
  <path d="M236 162 L310 92 Q318 86 328 86 L442 86 L442 162 Z" fill="${NAVY}"/>
  <path d="M462 86 L584 86 Q596 86 604 94 L684 162 L462 162 Z" fill="${NAVY}"/>
  <path d="M300 162 L376 86 L408 86 L332 162 Z" fill="rgba(239,238,229,0.2)"/>
  <path d="M528 162 L604 92 L620 106 L556 162 Z" fill="rgba(239,238,229,0.16)"/>
  <path d="M452 172 L452 300" stroke="${GD}" stroke-width="7" stroke-linecap="round"/>
  <rect x="366" y="190" width="56" height="14" rx="7" fill="${NAVY}"/>
  <rect x="566" y="190" width="56" height="14" rx="7" fill="${NAVY}"/>
  <rect x="832" y="196" width="34" height="30" rx="10" fill="${CR}"/>
  <rect x="40" y="196" width="22" height="34" rx="8" fill="${RED}"/>
  <circle cx="214" cy="318" r="84" fill="${BG}"/>
  <circle cx="700" cy="318" r="84" fill="${BG}"/>
  <g class="rueda r1"><circle cx="214" cy="318" r="70" fill="${NAVY}"/><circle cx="214" cy="318" r="34" fill="${CR}"/><rect x="208" y="288" width="12" height="60" rx="5" fill="${NAVY3}"/><rect x="184" y="312" width="60" height="12" rx="5" fill="${NAVY3}"/><circle cx="214" cy="318" r="10" fill="${G}"/></g>
  <g class="rueda r2"><circle cx="700" cy="318" r="70" fill="${NAVY}"/><circle cx="700" cy="318" r="34" fill="${CR}"/><rect x="694" y="288" width="12" height="60" rx="5" fill="${NAVY3}"/><rect x="670" y="312" width="60" height="12" rx="5" fill="${NAVY3}"/><circle cx="700" cy="318" r="10" fill="${G}"/></g>
</svg>`;

// ficha del cliente (cartón crema 900 x H, encabezado verde)
const fila = (k, y, lbl, val, extra = "") => `<div class="fi-fila f${k}" style="top:${y}px"><div class="fi-lbl">${lbl}</div><div class="fi-val"${extra}>${val}</div><div class="fi-ok">${tick(26)}</div></div>`;
const ficha = (cls, h, foto, filas) => `
<div class="fi ${cls}" style="height:${h}px">
  <div class="fi-head"><span>Ficha del cliente</span><i></i></div>
  <div class="fi-foto">${foto}</div>
  ${filas}
  <div class="fi-luz"></div>
</div>`;

// fachada del negocio (svg de pantalla completa)
const fachada = (extra = "") => `
<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
  <ellipse cx="560" cy="1352" rx="470" ry="34" fill="rgba(3,6,12,0.45)"/>
  <polygon points="930,700 1000,740 1000,1336 930,1336" fill="${NAVY}"/>
  <rect x="150" y="700" width="780" height="636" fill="${NAVY3}"/>
  <rect x="130" y="680" width="820" height="40" rx="8" fill="${NAVY}"/>
  <g class="aw">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${150 + i * 97.5} 720 h97.5 v110 q-48.75 34 -97.5 0 z" fill="${i % 2 ? CR : G}"/>`).join("")}
  <rect x="150" y="720" width="780" height="18" fill="rgba(11,18,32,0.22)"/></g>
  <rect class="cartel" x="250" y="588" width="580" height="96" rx="14" fill="${CR}"/>
  <text class="cartel-txt" x="540" y="653" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="54" fill="${NAVY}">TU NEGOCIO</text>
  <rect x="200" y="890" width="370" height="360" rx="10" fill="${NAVY}" stroke="${CR}" stroke-width="10"/>
  <polygon points="250,1240 330,900 400,900 320,1240" fill="rgba(239,238,229,0.13)"/>
  <rect x="620" y="890" width="250" height="446" rx="10" fill="${NAVY}" stroke="${CR}" stroke-width="10"/>
  <rect x="826" y="1100" width="14" height="70" rx="7" fill="${G}"/>
  ${extra}
</svg>`;
const persona = (x, cls) =>
  `<g class="${cls}"><circle cx="${x}" cy="1446" r="38" fill="${CR}"/><path d="M${x - 74} 1604 Q${x - 74} 1496 ${x} 1494 Q${x + 74} 1496 ${x + 74} 1604 Z" fill="${CR}"/><path d="M${x + 20} 1604 Q${x + 62} 1520 ${x + 74} 1580 L${x + 74} 1604 Z" fill="rgba(11,18,32,0.14)"/></g>`;
const reloj = (x, y, cls) =>
  `<g class="${cls}"><circle cx="${x}" cy="${y}" r="40" fill="${G}"/><circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${NAVY}" stroke-width="7"/><path d="M${x} ${y - 14} L${x} ${y} L${x + 11} ${y + 7}" fill="none" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;

// celular vertical grande (540 x 1000, centro 540, 1060)
const celular = (pantalla = "") => `
<div class="tel-lado"></div>
<div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.5); }
    ${P} .autow { position: absolute; left: 90px; top: 800px; width: 900px; height: 400px; }
    ${P} .auto-svg { position: absolute; left: 0; top: 0; width: 900px; height: 400px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .fi { position: absolute; left: 90px; top: 590px; width: 900px; border-radius: 44px; background: ${CR}; overflow: hidden; box-shadow: 18px 18px 0 ${NAVY}; }
    ${P} .fi-head { position: absolute; left: 0; top: 0; right: 0; height: 128px; background: ${G}; }
    ${P} .fi-head span { position: absolute; left: 48px; top: 0; font: 800 54px/128px "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    ${P} .fi-head i { position: absolute; right: 48px; top: 40px; width: 48px; height: 48px; border-radius: 50%; background: ${NAVY}; }
    ${P} .fi-foto { position: absolute; left: 40px; top: 160px; width: 820px; height: 320px; border-radius: 30px; background: ${BG}; overflow: hidden; }
    ${P} .fi-fila { position: absolute; left: 48px; right: 48px; height: 104px; border-bottom: 4px solid rgba(11,18,32,0.12); }
    ${P} .fi-lbl { position: absolute; left: 0; top: 14px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    ${P} .fi-val { position: absolute; left: 0; top: 50px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    ${P} .fi-ok { position: absolute; right: 0; top: 26px; width: 52px; height: 52px; opacity: 0; }
    ${P} .fi-ok svg { width: 52px; height: 52px; }
    ${P} .fi-luz { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(11,18,32,0) 64%, rgba(11,18,32,0.05) 64%); pointer-events: none; }
    ${P} .tel-lado { position: absolute; left: 288px; top: 578px; width: 540px; height: 1000px; border-radius: 80px; background: ${NAVY}; }
    ${P} .tel { position: absolute; left: 270px; top: 560px; width: 540px; height: 1000px; border-radius: 80px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 64px; background: ${NAVY}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 200px; top: 30px; width: 140px; height: 32px; border-radius: 16px; background: ${CR}; }
    ${P} .noti { position: absolute; left: 70px; width: 940px; height: 230px; border-radius: 44px; background: #ffffff; box-shadow: 0 18px 0 rgba(3,6,12,0.45); opacity: 0; }
    ${P} .noti .ic { position: absolute; left: 34px; top: 50px; width: 130px; height: 130px; border-radius: 32px; background: ${G}; }
    ${P} .noti .ic svg { position: absolute; left: 20px; top: 20px; }
    ${P} .noti .t0 { position: absolute; left: 196px; top: 40px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    ${P} .noti .t1 { position: absolute; left: 196px; top: 86px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .noti .t2 { position: absolute; left: 196px; top: 156px; font: 500 36px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.72); }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
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
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const miles = (v) => String(v).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
      const ruedas = (t, d, vueltas) => qa(".rueda").forEach((r) => { const b = r.getBBox(); tl.to(r, { rotation: 360 * vueltas, svgOrigin: (b.x + b.width / 2) + " " + (b.y + b.height / 2), duration: d, ease: "none" }, t); });
      const fila = (k, t) => { const f = q(".f" + k); tl.fromTo(f, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t); pop(".f" + k + " .fi-ok", t + 0.2, 0.28, 0.3); };
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
    P .tit { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 112px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .v { color: ${G}; display: inline-block; }
    P .autow { top: 840px; }
    P .tachar { stroke: ${RED}; stroke-width: 9; stroke-linecap: round; fill: none; }
    P .llave { position: absolute; left: 760px; top: 700px; width: 150px; height: 150px; opacity: 0; }`,
  html: `
      ${sombra("sh", 545, 1262, 860, 60)}
      <div class="autow">${AUTO}</div>
      <div class="tit"><div>¿Por qué la</div><div>concesionaria</div><div>sabe cuándo</div><div>te toca</div><div>el <span class="v">service?</span></div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 540, 770, 540, 880)}<path class="tachar tx" d="M300 704 L780 704"/></svg>
      ${pill(1, 540, 704, "¿Se acuerda de vos?")}`,
  js: `
      const A = q(".autow");
      // cuadro 0: el gancho entero y el auto ya grande
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(A, { x: -120 }, { x: 0, duration: 0.9, ease: "power3.out" }, 0);
      ruedas(0, 0.9, 0.6);
      tl.to(A, { y: -10, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 }, 0.9);
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 2.5);
      tl.to(A, { y: -6, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.2);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, 3.1);
      // "No se acuerda": la pregunta tachada
      tl.to(A, { scale: 1.06, y: 20, transformOrigin: "50% 50%", duration: 1.0, ease: "power2.inOut" }, 3.2);
      nota(1, 3.42);
      dibujar(".tx", 3.85, 0.25);
      tl.to(q(".n1"), { borderColor: "${RED}", color: "${RED}", duration: 0.15 }, 3.85);
      sinNota(1, 4.25); tl.to(q(".tx"), { opacity: 0, duration: 0.2 }, 4.25);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.5, sfx: "pop", vol: 0.25 }, { t: 3.45, sfx: "pop", vol: 0.28 }, { t: 3.85, sfx: "click", vol: 0.3 }],
});

// ================= s02 · la ficha =================
// el auto (s01: left 90, top 840 +20, escala 1.06) se mete en la foto de la ficha
const FILAS_AUTO =
  fila(1, 500, "AUTO", "Sedán 1.6") +
  fila(2, 610, "COMPRADO", "14/03/2025") +
  fila(3, 720, "KILÓMETROS", "18.200 km", ' data-km="1"') +
  fila(4, 830, "ÚLTIMO SERVICE", "12/03/2026");
escena("s02-ficha", {
  css: `
    P .fi { height: 960px; }
    P .autow { top: 840px; }`,
  html: `
      ${sombra("sh", 545, 1262, 860, 60)}
      ${ficha("ficha", 960, "", FILAS_AUTO)}
      <div class="autow">${AUTO}</div>
      ${selbox("sb", 116, 1300, 848, 116)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 300, 1640, 300, 1556, "g")}</svg>
      ${pill(1, 300, 1660, "Tu historial", "lleno")}`,
  js: `
      const A = q(".autow"), F = q(".ficha");
      gsap.set(A, { scale: 1.06, y: 20, transformOrigin: "50% 50%" });
      gsap.set(qa(".fi-fila"), { opacity: 0 });
      // "tiene tu ficha": el auto se achica y sube a la foto, la ficha aparece detrás
      tl.to(A, { scale: 0.74, y: -110, duration: 0.6, ease: "power3.inOut" }, 0.05);
      tl.to(q(".sh"), { opacity: 0, duration: 0.3 }, 0.05);
      tl.fromTo(F, { opacity: 0, scale: 0.7, y: 120, transformOrigin: "50% 30%" }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.3)" }, 0.18);
      ruedas(0.05, 0.6, 0.4);
      // qué auto, qué día, cuántos kilómetros, último service
      fila(1, 0.85);
      fila(2, 1.6);
      fila(3, 2.5);
      contar("[data-km]", 0, 18200, 2.5, 0.6, (v) => miles(v) + " km");
      fila(4, 3.2);
      caja(".sb", 3.3);
      nota(1, 3.5);
      // push-in a los kilómetros (match con el odómetro)
      sinNota(1, 4.15);
      tl.to(qa(".sb"), { opacity: 0, duration: 0.15 }, 4.15);
      tl.to([F, A], { scale: 1.7, y: -60, transformOrigin: "540px 1360px", duration: 0.46, ease: "power2.in" }, 4.16);
      salida(4.3);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.85, sfx: "pop", vol: 0.22 }, { t: 1.6, sfx: "pop", vol: 0.22 }, { t: 2.5, sfx: "typing", vol: 0.18, max: 0.6 }, { t: 3.2, sfx: "pop", vol: 0.22 }, { t: 3.3, sfx: "click-soft", vol: 0.28 }],
});

// ================= s03 · el próximo: km o tiempo =================
const MESES = ["MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC", "ENE", "FEB", "MAR"];
escena("s03-proximo", {
  css: `
    P .odo { position: absolute; left: 90px; top: 590px; width: 900px; height: 400px; border-radius: 44px; background: ${NAVY}; border: 8px solid ${CR}; box-shadow: 18px 18px 0 rgba(3,6,12,0.45); }
    P .odo-lbl { position: absolute; left: 50px; top: 38px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.18em; color: rgba(239,238,229,0.65); }
    P .odo-num { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 150px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
    P .odo-km { color: ${G}; font-size: 80px; letter-spacing: 0; }
    P .bar { position: absolute; left: 50px; top: 300px; width: 784px; height: 40px; border-radius: 20px; background: ${NAVY3}; }
    P .bar-f { position: absolute; left: 50px; top: 300px; width: 784px; height: 40px; border-radius: 20px; background: ${G}; }
    P .bar-m { position: absolute; left: 812px; top: 280px; width: 14px; height: 80px; border-radius: 7px; background: ${CR}; }
    P .cal { position: absolute; left: 90px; top: 1060px; width: 900px; height: 330px; border-radius: 44px; background: ${CR}; box-shadow: 18px 18px 0 rgba(3,6,12,0.45); overflow: hidden; }
    P .cal-head { position: absolute; left: 0; right: 0; top: 0; height: 96px; background: ${G}; font: 800 50px/96px "Lexend", sans-serif; color: ${NAVY}; padding-left: 48px; }
    P .mes { position: absolute; top: 150px; width: 66px; text-align: center; font: 500 28px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.6); }
    P .mes-p { position: absolute; top: 196px; width: 26px; height: 26px; border-radius: 50%; background: rgba(11,18,32,0.18); }
    P .cal-f { position: absolute; left: 60px; top: 250px; width: 780px; height: 24px; border-radius: 12px; background: ${G}; }
    P .cal-t { position: absolute; left: 60px; top: 250px; width: 780px; height: 24px; border-radius: 12px; background: rgba(11,18,32,0.12); }
    P .o { position: absolute; left: 540px; top: 970px; width: 110px; height: 110px; margin-left: -55px; border-radius: 55px; background: ${G}; border: 6px solid ${BG}; font: 800 60px/92px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }`,
  html: `
      <div class="odo"><div class="odo-lbl">KILÓMETROS</div><div class="odo-num"><span class="v">18.200</span> <span class="odo-km">km</span></div>
        <div class="bar"></div><div class="bar-f"></div><div class="bar-m"></div></div>
      <div class="cal"><div class="cal-head">Tiempo</div>
        ${MESES.map((m, i) => `<div class="mes" style="left:${r2(60 + i * 60 - 20)}px">${m}</div><div class="mes-p" style="left:${r2(60 + i * 60 - 13)}px"></div>`).join("")}
        <div class="cal-t"></div><div class="cal-f"></div></div>
      <div class="o">o</div>
      ${pill(1, 760, 600, "Próximo: 20.000", "lleno")}
      ${pill(2, 780, 1070, "Próximo: 03/2027", "lleno")}
      ${pill(3, 540, 1500, "Lo que llegue primero", "g")}`,
  js: `
      gsap.set(q(".bar-f"), { scaleX: 0.55, transformOrigin: "0% 50%" });
      gsap.set(q(".cal-f"), { scaleX: 0.05, transformOrigin: "0% 50%" });
      // sale de la fila de kilómetros: entra el odómetro con push-in inverso
      tl.fromTo(q(".odo"), { opacity: 0, scale: 1.4, y: 160 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.fromTo(q(".cal"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.25);
      // por kilómetros: cuenta hacia el próximo
      nota(1, 0.9);
      contar(".odo-num .v", 18200, 19650, 1.3, 1.0, (v) => miles(v));
      tl.to(q(".bar-f"), { scaleX: 0.92, duration: 1.0, ease: "power1.out" }, 1.3);
      // o por tiempo
      pop(".o", 1.95, 0.3, 0.4);
      nota(2, 2.3);
      tl.to(q(".cal-f"), { scaleX: 0.86, duration: 0.8, ease: "power1.out" }, 2.4);
      nota(3, 2.5);
      fuera(".n1, .n2, .n3, .o", 3.22, 0.2);
      // los dos se juntan hacia el centro: se vuelven el celular
      tl.to(q(".odo"), { y: 260, scale: 0.6, opacity: 0, duration: 0.3, ease: "power2.in" }, 3.14);
      tl.to(q(".cal"), { y: -260, scale: 0.6, opacity: 0, duration: 0.3, ease: "power2.in" }, 3.14);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.9, sfx: "pop", vol: 0.24 }, { t: 1.3, sfx: "typing", vol: 0.16, max: 0.8 }, { t: 1.95, sfx: "click-soft", vol: 0.25 }, { t: 2.3, sfx: "pop", vol: 0.24 }, { t: 2.5, sfx: "pop", vol: 0.24 }],
});

// ================= s04 · avisa solo =================
const ICONO_LLAVE = `<svg width="90" height="90" viewBox="0 0 90 90"><path d="M62 10 a22 22 0 0 0 -20 30 L12 70 a8 8 0 0 0 11 11 L53 51 a22 22 0 0 0 30 -20 L70 44 L56 38 L50 22 Z" fill="${NAVY}"/></svg>`;
escena("s04-aviso", {
  css: `
    P .anillo { position: absolute; left: 340px; top: 760px; width: 400px; height: 400px; }
    P .an-t { fill: none; stroke: ${NAVY3}; stroke-width: 34; }
    P .an-f { fill: none; stroke: ${G}; stroke-width: 34; stroke-linecap: round; }
    P .an-n { position: absolute; left: 0; right: 0; top: 1180px; text-align: center; font: 800 60px/1 "Lexend", sans-serif; color: ${CR}; }
    P .an-s { position: absolute; left: 0; right: 0; top: 1260px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(239,238,229,0.6); }
    P .an-ic { position: absolute; left: 495px; top: 915px; }
    P .noti { top: 640px; }`,
  html: `
      ${sombra("sh", 560, 1600, 560, 50)}
      ${celular()}
      <svg class="anillo" viewBox="0 0 400 400" aria-hidden="true"><circle class="an-t" cx="200" cy="200" r="160"/><circle class="an-f" cx="200" cy="200" r="160" transform="rotate(-90 200 200)"/></svg>
      <div class="an-ic">${ICONO_LLAVE.replace(NAVY, CR)}</div>
      <div class="an-n"><span class="pc">0</span> %</div>
      <div class="an-s">PRÓXIMO SERVICE</div>
      <div class="noti"><div class="ic">${ICONO_LLAVE}</div><div class="t0">CONCESIONARIA · AHORA</div><div class="t1">Te toca el service</div><div class="t2">Elegí día y hora</div></div>
      ${pill(1, 540, 1440, "Sale solo, a tiempo", "lleno")}`,
  js: `
      tl.fromTo(qa(".tel, .tel-lado"), { opacity: 0, scale: 0.6, transformOrigin: "540px 1060px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
      tl.fromTo(qa(".anillo, .an-ic, .an-n, .an-s"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.25);
      // hace la cuenta
      const C = q(".an-f"); const L = 2 * Math.PI * 160;
      gsap.set(C, { strokeDasharray: L, strokeDashoffset: L * 0.92 });
      tl.to(C, { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" }, 0.3);
      contar(".pc", 8, 100, 0.3, 0.85, (v) => v);
      tl.fromTo(q(".anillo"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, 1.15);
      // avisa solo
      tl.fromTo(q(".noti"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 1.12);
      nota(1, 1.6);
      tl.to(q(".noti"), { y: 10, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.6);
      fuera(".n1", 2.2, 0.18);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.22 }, { t: 0.3, sfx: "typing", vol: 0.14, max: 0.8 }, { t: 1.12, sfx: "notification", vol: 0.38 }, { t: 1.6, sfx: "pop", vol: 0.24 }],
});

// ================= s05 · el giro: tu negocio =================
const XS = [250, 540, 830];
escena("s05-giro", {
  css: `P .mini-noti { position: absolute; left: 70px; top: 640px; width: 940px; height: 230px; border-radius: 44px; background: #fff; }`,
  html: `
      <div class="mini-noti"></div>
      <div class="capa local">${fachada(XS.map((x, i) => persona(x, "p p" + i) + reloj(x + 84, 1470, "rl rl" + i)).join(""))}</div>
      ${pill(1, 540, 1690, "Clientes con service", "lleno")}`,
  js: `
      const L = q(".local");
      // la notificación se aplana y es el cartel del negocio
      tl.to(q(".mini-noti"), { scaleX: 0.617, scaleY: 0.417, y: -119, transformOrigin: "50% 50%", backgroundColor: "${CR}", duration: 0.35, ease: "power3.inOut" }, 0);
      tl.to(q(".mini-noti"), { opacity: 0, duration: 0.05 }, 0.34);
      tl.fromTo(L, { opacity: 0, scale: 0.92, transformOrigin: "540px 640px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, 0.25);
      tl.fromTo(q(".cartel"), { scale: 1 }, { scale: 1.08, svgOrigin: "540 636", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.5);
      tl.fromTo(q(".cartel-txt"), { scale: 1 }, { scale: 1.08, svgOrigin: "540 636", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.5);
      // clientes
      qa(".p").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 1.15 + i * 0.1));
      // con service: el relojito arriba de cada uno
      ${XS.map((x, i) => `tl.fromTo(q(".rl${i}"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, svgOrigin: "${x + 84} 1470", duration: 0.3, ease: "back.out(2)" }, ${r2(1.85 + i * 0.1)});`).join("\n      ")}
      nota(1, 1.5);
      tl.to(L, { scale: 1.05, transformOrigin: "540px 1100px", duration: 0.6, ease: "power1.inOut" }, 1.85);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: 0.5, sfx: "pop", vol: 0.22 }, { t: 1.15, sfx: "whoosh-short", vol: 0.16 }, { t: 1.85, sfx: "ping", vol: 0.22 }, { t: 1.5, sfx: "pop", vol: 0.24 }],
});

// ================= s06 · ejemplos: tijera, lentes, bolsa =================
const TIJERA = `
<svg class="obj tij" viewBox="0 0 700 700" aria-hidden="true">
  <g class="h1"><path d="M350 360 L640 110 Q660 96 668 116 Q672 130 656 144 L372 392 Z" fill="${CR}"/><path d="M350 360 L640 110 Q660 96 668 116 L380 372 Z" fill="#ffffff"/></g>
  <g class="h2"><path d="M350 360 L640 610 Q660 624 668 604 Q672 590 656 576 L372 328 Z" fill="${CR}"/><path d="M372 328 L656 576 Q672 590 668 604 L360 340 Z" fill="#c9c7b9"/></g>
  <circle cx="190" cy="220" r="118" fill="${G}"/><circle cx="190" cy="220" r="66" fill="${BG}"/>
  <circle cx="190" cy="500" r="118" fill="${G}"/><circle cx="190" cy="500" r="66" fill="${BG}"/>
  <path d="M270 300 L360 360 L270 420" fill="none" stroke="${G}" stroke-width="64" stroke-linejoin="round"/>
  <path d="M110 160 A100 100 0 0 1 160 118" fill="none" stroke="${GD}" stroke-width="0"/>
  <circle cx="352" cy="360" r="26" fill="${NAVY}"/><circle cx="352" cy="360" r="10" fill="${CR}"/>
</svg>`;
const LENTES = `
<svg class="obj len" viewBox="0 0 860 400" aria-hidden="true">
  <path d="M40 120 L0 90" stroke="${G}" stroke-width="30" stroke-linecap="round"/>
  <path d="M820 120 L860 90" stroke="${G}" stroke-width="30" stroke-linecap="round"/>
  <circle cx="230" cy="210" r="180" fill="${G}"/><circle cx="630" cy="210" r="180" fill="${G}"/>
  <circle cx="230" cy="210" r="146" fill="${NAVY}"/><circle cx="630" cy="210" r="146" fill="${NAVY}"/>
  <path d="M150 140 L250 90 L270 120 L170 172 Z" fill="rgba(239,238,229,0.28)"/>
  <path d="M550 140 L650 90 L670 120 L570 172 Z" fill="rgba(239,238,229,0.28)"/>
  <path d="M396 170 Q430 130 464 170" fill="none" stroke="${G}" stroke-width="34" stroke-linecap="round"/>
  <path d="M60 250 Q100 360 230 376" fill="none" stroke="${GD}" stroke-width="14" stroke-linecap="round"/>
  <path d="M460 250 Q500 360 630 376" fill="none" stroke="${GD}" stroke-width="14" stroke-linecap="round"/>
</svg>`;
const BOLSA = `
<svg class="obj bol" viewBox="0 0 560 720" aria-hidden="true">
  <path d="M60 60 L500 60 L530 690 Q530 712 506 712 L54 712 Q30 712 30 690 Z" fill="${CR}"/>
  <path d="M430 60 L500 60 L530 690 Q530 712 506 712 L460 712 Z" fill="#cfcdbf"/>
  <rect x="44" y="20" width="472" height="70" rx="14" fill="${GD}"/>
  <path d="M34 300 L526 300 L530 460 L30 460 Z" fill="${G}"/>
  <g fill="${NAVY}"><ellipse cx="280" cy="400" rx="44" ry="36"/><circle cx="214" cy="338" r="20"/><circle cx="256" cy="316" r="20"/><circle cx="304" cy="316" r="20"/><circle cx="346" cy="338" r="20"/></g>
  <text x="280" y="210" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="76" fill="${NAVY}">ALIMENTO</text>
  <text x="280" y="590" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="48" fill="rgba(11,18,32,0.6)">15 KG</text>
</svg>`;
escena("s06-ejemplos", {
  css: `
    P .obj { position: absolute; overflow: visible; opacity: 0; }
    P .tij { left: 190px; top: 610px; width: 700px; height: 700px; }
    P .len { left: 110px; top: 760px; width: 860px; height: 400px; }
    P .bol { left: 260px; top: 590px; width: 560px; height: 720px; }`,
  html: `
      ${sombra("sh", 540, 1380, 700, 56)}
      ${TIJERA}${LENTES}${BOLSA}
      ${pill(1, 540, 1490, "Le toca el 28/11", "lleno")}
      ${pill(2, 540, 1490, "Le toca en marzo", "lleno")}
      ${pill(3, 540, 1490, "Le toca el 15/11", "lleno")}`,
  js: `
      // tijera
      tl.fromTo(q(".tij"), { opacity: 0, scale: 0.5, rotation: -40, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".tij .h1"), { rotation: 0 }, { rotation: 12, svgOrigin: "352 360", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.45);
      tl.fromTo(q(".tij .h2"), { rotation: 0 }, { rotation: -12, svgOrigin: "352 360", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.45);
      pop(".n1", 0.75);
      // se vuelve lentes
      fuera(".n1", 1.45, 0.15);
      tl.to(q(".tij"), { opacity: 0, scale: 0.4, rotation: 90, duration: 0.25, ease: "power2.in" }, 1.45);
      tl.fromTo(q(".len"), { opacity: 0, scale: 0.4, rotation: -20, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.6)" }, 1.62);
      pop(".n2", 1.95);
      // se vuelve la bolsa de alimento
      fuera(".n2", 2.55, 0.15);
      tl.to(q(".len"), { opacity: 0, scale: 0.4, rotation: 30, duration: 0.25, ease: "power2.in" }, 2.55);
      tl.fromTo(q(".bol"), { opacity: 0, scale: 0.4, y: 200, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(1.6)" }, 2.72);
      tl.fromTo(q(".bol"), { rotation: 0 }, { rotation: 3, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 3.2);
      pop(".n3", 3.1);
      salida(3.95);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.45, sfx: "click", vol: 0.24 }, { t: 0.75, sfx: "pop", vol: 0.22 }, { t: 1.62, sfx: "whoosh-short", vol: 0.18 }, { t: 1.95, sfx: "pop", vol: 0.22 }, { t: 2.72, sfx: "whoosh-short", vol: 0.18 }, { t: 3.1, sfx: "pop", vol: 0.22 }],
});

// ================= s07 · ¿sabés cuándo? =================
const CARDS = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 90 + (i % 2) * 460, y: 590 + Math.floor(i / 2) * 330 }));
escena("s07-pregunta", {
  css: `
    P .cl { position: absolute; width: 440px; height: 300px; border-radius: 36px; background: ${NAVY}; border: 6px solid ${NAVY3}; opacity: 0; }
    P .cl .av { position: absolute; left: 36px; top: 40px; }
    P .cl i { position: absolute; left: 36px; height: 24px; border-radius: 12px; background: rgba(239,238,229,0.3); }
    P .cl .qq { position: absolute; right: 30px; top: 30px; width: 120px; height: 120px; border-radius: 50%; background: ${RED}; font: 800 84px/120px "Lexend", sans-serif; text-align: center; color: #fff; opacity: 0; }`,
  html: CARDS.map((c, i) => `<div class="cl c${i}" style="left:${c.x}px;top:${c.y}px"><div class="av">${avatar(120)}</div><i style="top:196px;width:300px"></i><i style="top:240px;width:200px"></i><div class="qq">?</div></div>`).join(""),
  js: `
      qa(".cl").forEach((c, i) => tl.fromTo(c, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, i * 0.06));
      qa(".qq").forEach((c, i) => pop(c, 0.55 + i * 0.08, 0.26, 0.3));
      // se juntan en una sola ficha (s08)
      tl.to(qa(".cl"), { x: (i, el) => 315 - el.offsetLeft, y: (i, el) => 790 - el.offsetTop, opacity: 0, scale: 0.7, duration: 0.3, ease: "power2.in", stagger: 0.02 }, 1.42);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.55, sfx: "glitch-1", vol: 0.14, max: 0.4 }, { t: 1.42, sfx: "whoosh-short", vol: 0.18 }],
});

// ================= s08 · con un CRM, sí =================
const FOTO_LUCIA = `<div class="lu-av">${avatar(220)}</div><div class="lu-nom">Lucía</div><div class="lu-sub">CLIENTA DESDE 2024</div>`;
const FILAS_CRM =
  fila(1, 500, "QUIÉN ES", "Lucía · tiene 2 perros") +
  fila(2, 610, "QUÉ COMPRÓ", "Alimento 15 kg · 12/10") +
  fila(3, 720, "CUÁNDO ESCRIBIRLE", "Esta semana");
escena("s08-crm", {
  css: `
    P .fi { height: 850px; }
    P .lu-av { position: absolute; left: 50px; top: 50px; }
    P .lu-nom { position: absolute; left: 310px; top: 92px; font: 800 84px/1 "Lexend", sans-serif; color: #fff; }
    P .lu-sub { position: absolute; left: 314px; top: 196px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.6); }
    P .f3 .fi-val { color: ${GD}; }
    P .msg { position: absolute; left: 150px; top: 1460px; width: 780px; padding: 26px 34px; border-radius: 34px 34px 34px 8px; background: #fff; font: 600 40px/1.25 "Lexend", sans-serif; color: ${NAVY}; box-shadow: 0 12px 0 rgba(3,6,12,0.4); opacity: 0; }
    P .msg b { color: ${GD}; }`,
  html: `
      ${ficha("ficha", 850, FOTO_LUCIA, FILAS_CRM)}
      ${selbox("sb", 116, 1300, 848, 116)}
      <div class="msg">Hola Lucía, ¿te separo <b>la bolsa</b> de siempre?</div>`,
  js: `
      const F = q(".ficha");
      gsap.set(qa(".fi-fila"), { opacity: 0 });
      tl.fromTo(F, { opacity: 0, scale: 0.5, transformOrigin: "50% 40%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.05);
      tl.fromTo(q(".lu-av"), { scale: 0.6 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(2)" }, 0.3);
      fila(1, 0.95);
      fila(2, 2.2);
      fila(3, 3.0);
      caja(".sb", 3.2);
      tl.fromTo(q(".msg"), { opacity: 0, y: 60, scale: 0.9, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 3.3);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.95, sfx: "pop", vol: 0.22 }, { t: 2.2, sfx: "pop", vol: 0.22 }, { t: 3.0, sfx: "pop", vol: 0.22 }, { t: 3.2, sfx: "click-soft", vol: 0.28 }, { t: 3.3, sfx: "notification", vol: 0.3 }],
});

// ================= s09 · CTA =================
escena("s09-cta", {
  css: `
    P .fi { height: 850px; }
    P .lu-av { position: absolute; left: 50px; top: 50px; }
    P .lu-nom { position: absolute; left: 310px; top: 92px; font: 800 84px/1 "Lexend", sans-serif; color: #fff; }
    P .lu-sub { position: absolute; left: 314px; top: 196px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.6); }
    P .f3 .fi-val { color: ${GD}; }
    P .fi-ok { opacity: 1; }
    P .vc { position: absolute; left: 79px; top: 570px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 97px; top: 588px; width: 922px; height: 460px; border-radius: 70px; background: ${NAVY}; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${NAVY}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1110px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1252px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1440px; color: ${G}; font-size: 112px; }`,
  html: `
      ${ficha("ficha", 850, FOTO_LUCIA, FILAS_CRM)}
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(160)}<div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const F = q(".ficha");
      // "¿Lo vemos en tu negocio?": la ficha se achica y entra a la pantalla de la videollamada
      tl.to(F, { scale: 0.42, x: -141, y: 24, transformOrigin: "50% 0%", duration: 0.6, ease: "power3.inOut" }, 0.45);
      tl.to(F, { opacity: 0, duration: 0.2 }, 1.05);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" }, 0.85);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.0);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.85);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.15);
      caja(".sb", 2.4);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.25);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.8);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.8);`,
  sfx: [{ t: 0.45, sfx: "whoosh", vol: 0.24, max: 0.7 }, { t: 1.0, sfx: "pop", vol: 0.22 }, { t: 1.85, sfx: "whoosh-short", vol: 0.2 }, { t: 2.4, sfx: "click-soft", vol: 0.28 }, { t: 3.25, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· total", DUR);
