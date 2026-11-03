// Generador de escenas de reels/por-que-la-tarjeta (correr desde la carpeta del reel, después
// `node armar.mjs`). Estilo "resultaaquee": un objeto grande relleno por escena, que se transforma.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 41.53;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;

const FRENTE_SUPER = `
  <div class="fs-top">SÚPER</div>
  <svg class="fs-emb" viewBox="0 0 104 104" aria-hidden="true"><circle cx="52" cy="52" r="52" fill="${G}"/><path d="M52 20 L61 42 L85 43 L66 58 L73 82 L52 68 L31 82 L38 58 L19 43 L43 42 Z" fill="${NAVY}"/></svg>
  <svg class="fs-onda" viewBox="0 0 760 480" aria-hidden="true"><path d="M0 200 C 200 150, 430 262, 760 182 L760 258 C 430 334, 210 226, 0 282 Z" fill="${G}"/><path d="M0 282 C 210 226, 430 334, 760 258 L760 276 C 430 352, 210 244, 0 300 Z" fill="${GD}"/></svg>
  <div class="fs-lbl">TARJETA DE PUNTOS</div>
  <div class="fs-num">•••• 0417</div>
  <svg class="fs-bar" viewBox="0 0 212 90" aria-hidden="true">${[0, 10, 16, 30, 38, 52, 58, 64, 80, 92, 98, 112, 124, 130, 146, 154, 168, 176, 188, 200].map((x, i) => `<rect x="${x}" y="0" width="${i % 3 === 0 ? 7 : 4}" height="90" fill="${NAVY}"/>`).join("")}</svg>`;
const FRENTE_PUNTOS = `
  <div class="fp-top">Scalerics</div>
  <div class="fp-sub">PUNTOS</div>
  <svg class="fp-sellos" viewBox="0 0 664 80" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${40 + i * 83}" cy="40" r="30" fill="${i < 5 ? NAVY : "none"}" stroke="${NAVY}" stroke-width="6"/>`).join("")}</svg>
  <div class="fp-num">Cliente 0417</div>`;
const avatar = (s = 140) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg>`;
const DORSO = `
  <div class="ds-av">${avatar()}</div>
  <div class="ds-nom">Cliente 0417</div>
  <div class="ds-sub">CLIENTE DESDE 2024</div>
  <div class="ds-fila f1">${tick(20)}<span>Viene cada 15 días</span></div>
  <div class="ds-fila f2">${tick(20)}<span>Lleva yerba y leche</span></div>
  <div class="ds-fila f3">${tick(20)}<span>Última vez: 16/10</span></div>`;

const tarjeta = (cls, tipo, conDorso = false) => `
<div class="tw ${cls}"><div class="tarj" data-layout-allow-overlap>
  <div class="canto ${tipo} c2"></div><div class="canto ${tipo} c1"></div>
  ${conDorso ? `<div class="cara dorso">${DORSO}</div>` : ""}
  <div class="cara frente ${tipo}">${tipo === "super" ? FRENTE_SUPER : FRENTE_PUNTOS}<div class="luz"></div><div class="brillo"></div></div>
</div></div>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;

// calendario: página con encabezado, días, en coordenadas de la página (860 x 980)
const CW = 860 / 7;
const celda = (idx, rowH) => ({ x: (idx % 7) * CW, y: 220 + Math.floor(idx / 7) * rowH, w: CW, h: rowH });
const yerba = (cx, cy, s = 1, cls = "", dashed = false) =>
  `<g class="${cls}" transform="translate(${cx} ${cy}) scale(${s})">` +
  (dashed
    ? `<rect x="-36" y="-46" width="72" height="92" rx="10" fill="none" stroke="${G}" stroke-width="6" stroke-dasharray="12 10"/>`
    : `<rect x="-36" y="-46" width="72" height="92" rx="10" fill="${G}"/><rect x="18" y="-46" width="18" height="92" rx="6" fill="${GD}"/><rect x="-36" y="-6" width="72" height="26" fill="${NAVY}"/><text x="0" y="13" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="17" fill="${CR}" data-layout-ignore>YERBA</text>`) +
  `</g>`;
const pagina = (cls, mes, primero, dias, rowH, extra = "") => {
  let nums = "";
  for (let d = 1; d <= dias; d++) {
    const c = celda(primero + d - 1, rowH);
    nums += `<text x="${r2(c.x + 16)}" y="${c.y + 38}" class="num">${d}</text>`;
  }
  let lineas = "";
  const filas = Math.ceil((primero + dias) / 7);
  for (let f = 1; f < filas; f++) lineas += `<path d="M24 ${220 + f * rowH} H836" class="grilla"/>`;
  return `<div class="pg ${cls}"><div class="pg-head">${mes}</div>
    <div class="pg-dias">${["L", "M", "M", "J", "V", "S", "D"].map((d) => `<span>${d}</span>`).join("")}</div>
    <svg class="pg-svg" viewBox="0 0 860 980" aria-hidden="true">${lineas}${nums}${extra}</svg><div class="pg-luz"></div></div>`;
};
const anillos = `<div class="anillo" style="left:190px"></div><div class="anillo" style="left:630px"></div>`;

// local (fachada) en un svg de pantalla completa
const fachada = (extra = "") => `
<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
  <ellipse cx="560" cy="1352" rx="470" ry="34" fill="rgba(3,6,12,0.55)"/>
  <polygon points="930,700 1000,740 1000,1336 930,1336" fill="#101b2f"/>
  <rect x="150" y="700" width="780" height="636" fill="${NAVY2}"/>
  <rect x="130" y="680" width="820" height="40" rx="8" fill="${NAVY3}"/>
  <polygon points="950,680 1012,716 1012,740 950,720" fill="#152238"/>
  <g class="aw">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${150 + i * 97.5} 720 h97.5 v110 q-48.75 34 -97.5 0 z" fill="${i % 2 ? CR : G}"/>`).join("")}
  <rect x="150" y="720" width="780" height="18" fill="rgba(11,18,32,0.22)"/></g>
  <rect class="cartel" x="290" y="588" width="500" height="96" rx="14" fill="${CR}"/>
  <rect x="290" y="668" width="500" height="16" rx="6" fill="rgba(11,18,32,0.16)"/>
  <text class="cartel-txt" x="540" y="653" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="54" fill="${NAVY}">TU LOCAL</text>
  <rect x="200" y="890" width="370" height="360" rx="10" fill="${NAVY3}" stroke="${CR}" stroke-width="10"/>
  <polygon points="250,1240 330,900 400,900 320,1240" fill="rgba(239,238,229,0.13)"/>
  <polygon points="350,1240 430,900 455,900 375,1240" fill="rgba(239,238,229,0.09)"/>
  <rect x="620" y="890" width="250" height="446" rx="10" fill="#0d1628" stroke="${CR}" stroke-width="10"/>
  <rect x="826" y="1100" width="14" height="70" rx="7" fill="${G}"/>
  ${extra}
</svg>`;
const persona = (x, cls) =>
  `<g class="${cls}"><circle cx="${x}" cy="1446" r="38" fill="${CR}"/><path d="M${x - 74} 1604 Q${x - 74} 1496 ${x} 1494 Q${x + 74} 1496 ${x + 74} 1604 Z" fill="${CR}"/><path d="M${x + 20} 1604 Q${x + 62} 1520 ${x + 74} 1580 L${x + 74} 1604 Z" fill="rgba(11,18,32,0.14)"/></g>`;

// celular vertical (centro 540,1040; 480 x 960)
const celular = (pantalla = "") => `
<div class="tel-lado"></div>
<div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>`;
const sellos = (llenos) => {
  let h = "";
  for (let i = 0; i < 10; i++) {
    const x = 380 + (i % 5) * 80, y = i < 5 ? 980 : 1064;
    h += `<div class="sello s${i}" style="left:${x - 32}px;top:${y - 32}px"></div><div class="sello-ok ok${i}" style="left:${x - 32}px;top:${y - 32}px${i < llenos ? "" : ";opacity:0"}">${tick(32)}</div>`;
  }
  return h;
};
const pantallaSellos = (n) => `${sellos(n)}<div class="cont">${n} / 10</div><div class="cont-sub">Premio al llegar a 10</div><div class="tel-btn">Ver mis premios</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.55); }
    ${P} .tw { position: absolute; left: 160px; top: 870px; width: 760px; height: 480px; perspective: 2200px; }
    ${P} .tarj { position: absolute; inset: 0; transform-style: preserve-3d; }
    ${P} .cara { position: absolute; inset: 0; border-radius: 40px; overflow: hidden; backface-visibility: hidden; }
    ${P} .canto { position: absolute; inset: 0; border-radius: 40px; background: #b9b7a8; }
    ${P} .canto.c1 { transform: translateZ(-8px); } ${P} .canto.c2 { transform: translateZ(-16px); background: #9d9b8d; }
    ${P} .canto.puntos.c1 { background: ${GD}; } ${P} .canto.puntos.c2 { background: #2f7f07; }
    ${P} .frente { background: ${CR}; transform: translateZ(0.1px); }
    ${P} .frente.puntos { background: ${G}; }
    ${P} .dorso { background: ${NAVY2}; border: 6px solid #2c4268; transform: translateZ(-20px) rotateY(180deg); }
    ${P} .luz { position: absolute; inset: 0; background: linear-gradient(128deg, rgba(11,18,32,0) 58%, rgba(11,18,32,0.09) 58%); }
    ${P} .brillo { position: absolute; left: -320px; top: -200px; width: 120px; height: 900px; background: rgba(255,255,255,0.42); transform: rotate(22deg); box-shadow: 70px 0 0 -28px rgba(255,255,255,0.3); }
    ${P} .fs-top { position: absolute; left: 48px; top: 30px; font: 800 74px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    ${P} .fs-emb { position: absolute; right: 44px; top: 30px; width: 104px; height: 104px; }
    ${P} .fs-onda { position: absolute; left: 0; top: 0; width: 760px; height: 480px; }
    ${P} .fs-lbl { position: absolute; left: 48px; top: 330px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${NAVY}; }
    ${P} .fs-num { position: absolute; left: 48px; top: 376px; font: 600 48px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .fs-bar { position: absolute; left: 500px; top: 334px; width: 212px; height: 90px; }
    ${P} .fp-top { position: absolute; left: 48px; top: 40px; font: 800 70px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    ${P} .fp-sub { position: absolute; right: 48px; top: 66px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.3em; color: ${NAVY}; }
    ${P} .fp-sellos { position: absolute; left: 48px; top: 196px; width: 664px; height: 80px; }
    ${P} .fp-num { position: absolute; left: 48px; top: 376px; font: 600 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ds-av { position: absolute; left: 44px; top: 40px; width: 140px; height: 140px; }
    ${P} .ds-nom { position: absolute; left: 214px; top: 62px; font: 700 50px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .ds-sub { position: absolute; left: 216px; top: 128px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(239,238,229,0.6); }
    ${P} .ds-fila { position: absolute; left: 48px; display: flex; align-items: center; gap: 22px; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .ds-fila.f1 { top: 222px; } ${P} .ds-fila.f2 { top: 300px; } ${P} .ds-fila.f3 { top: 378px; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 36px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
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
    ${P} .pg { position: absolute; left: 0; top: 0; width: 860px; height: 980px; background: ${CR}; border-radius: 36px; overflow: hidden; }
    ${P} .pg-head { position: absolute; left: 0; top: 0; width: 860px; height: 150px; background: ${G}; font: 800 72px/150px "Lexend", sans-serif; text-align: center; color: ${NAVY}; letter-spacing: 0.02em; }
    ${P} .pg-dias { position: absolute; left: 0; top: 162px; width: 860px; height: 50px; display: flex; }
    ${P} .pg-dias span { flex: 1; text-align: center; font: 500 32px/50px "IBM Plex Mono", monospace; color: rgba(11,18,32,0.5); }
    ${P} .pg-svg { position: absolute; left: 0; top: 0; width: 860px; height: 980px; overflow: visible; }
    ${P} .pg-svg .num { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; fill: rgba(11,18,32,0.55); }
    ${P} .pg-svg .grilla { stroke: rgba(11,18,32,0.1); stroke-width: 3; }
    ${P} .pg-luz { position: absolute; inset: 0; background: linear-gradient(118deg, rgba(11,18,32,0) 62%, rgba(11,18,32,0.06) 62%); }
    ${P} .hoja { position: absolute; left: 0; width: 860px; height: 980px; border-radius: 36px; }
    ${P} .anillo { position: absolute; top: -40px; width: 40px; height: 92px; border-radius: 20px; background: ${NAVY3}; border: 6px solid #2c4268; }
    ${P} .tel-lado { position: absolute; left: 316px; top: 574px; width: 480px; height: 960px; border-radius: 72px; background: #a9a798; }
    ${P} .tel { position: absolute; left: 300px; top: 560px; width: 480px; height: 960px; border-radius: 72px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 58px; background: #111c30; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 180px; top: 26px; width: 120px; height: 28px; border-radius: 14px; background: ${CR}; }
    ${P} .sello, ${P} .sello-ok { position: absolute; width: 64px; height: 64px; border-radius: 50%; }
    ${P} .sello { border: 5px solid rgba(239,238,229,0.45); }
    ${P} .sello-ok svg { width: 64px; height: 64px; }
    ${P} .cont { position: absolute; left: 0; right: 0; top: 1118px; text-align: center; font: 800 84px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .cont-sub { position: absolute; left: 0; right: 0; top: 1222px; text-align: center; font: 500 28px/1 "Lexend", sans-serif; color: rgba(239,238,229,0.62); }
    ${P} .tel-btn { position: absolute; left: 360px; top: 1300px; width: 360px; height: 84px; border-radius: 42px; background: ${G}; font: 700 32px/84px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }
    ${P} .tel-lbl { position: absolute; left: 0; right: 0; top: 890px; text-align: center; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: rgba(239,238,229,0.6); }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)", immediateRender: t <= 0 ? true : true }, t);
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
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const brillo = (s, t) => tl.fromTo(q(s), { x: 0 }, { x: 1400, duration: 0.9, ease: "power2.inOut", immediateRender: false }, t);
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

// poses compartidas entre escenas (match cuts)
const POSE0 = `{ rotationY: -12, rotationX: 10, rotationZ: -5 }`;

// ================= s01 · gancho =================
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 132px/1.02 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .tit .v { color: ${G}; display: inline-block; }
    P .tachar { stroke: ${RED}; stroke-width: 8; stroke-linecap: round; fill: none; }`,
  html: `
      ${sombra("sh", 540, 1450, 640, 70)}
      ${tarjeta("card", "super")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 790, 760, 700, 900)}<path class="tachar tx" d="M640 712 L940 712"/></svg>
      ${pill(1, 790, 712, "¿Un regalo?")}
      <div class="tit"><div>¿Por qué</div><div>la <span class="v">tarjeta</span></div><div class="v">de puntos?</div></div>`,
  js: `
      const T = q(".tarj"), W = q(".card");
      // cuadro 0: el gancho entero y la tarjeta ya grande
      gsap.set(T, { rotationY: -30, rotationX: 16, rotationZ: -8 });
      tl.fromTo(q(".tit"), { scale: 1.06, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(W, { y: 40, scale: 0.96 }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.to(T, { rotationY: -18, rotationX: 12, rotationZ: -6, duration: 3.3, ease: "sine.inOut" }, 0);
      tl.to(W, { y: -26, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.7);
      tl.to(q(".sh"), { scale: 0.9, opacity: 0.8, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.7);
      brillo(".card .brillo", 0.35);
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 2.0);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, 3.12);
      // "No es para regalarte nada."
      tl.to(T, { ...${POSE0}, duration: 1.3, ease: "power2.inOut" }, 3.4);
      nota(1, 3.78);
      dibujar(".tx", 4.3, 0.25);
      tl.to(q(".n1"), { borderColor: "${RED}", color: "${RED}", duration: 0.15 }, 4.3);
      brillo(".card .brillo", 3.9);
      sinNota(1, 4.62); tl.to(q(".tx"), { opacity: 0, duration: 0.2 }, 4.62);
      tl.to(W, { y: 0, duration: 0.6, ease: "power2.inOut" }, 4.2);`,
  sfx: [{ t: 0.35, sfx: "sparkle", vol: 0.22 }, { t: 2.0, sfx: "pop", vol: 0.25 }, { t: 3.8, sfx: "pop", vol: 0.28 }, { t: 4.3, sfx: "click", vol: 0.3 }],
});

// ================= s02 · ticket =================
const ITEMS = [["YERBA 1 KG", "x1"], ["LECHE ENTERA", "x2"], ["PAN FLAUTA", "x1"], ["FIDEOS", "x1"], ["MANZANAS", "x1"]];
let zig = "0 0, 600 0, 600 1040";
for (let x = 600; x > 0; x -= 30) zig += `, ${x - 15} 1060, ${x - 30} 1040`;
const ticket = (cls, fecha, hora, conItems = true) => `
  <div class="tk ${cls}">
    <div class="tk-r0">SÚPER · CAJA 3</div>
    <div class="tk-fila tk-r1"><span>${fecha}</span><span>${hora}</span></div>
    <div class="tk-div" style="top:192px"></div>
    ${conItems ? ITEMS.map(([n, c], i) => `<div class="tk-fila tk-it" style="top:${222 + i * 76}px"><span>${n}</span><span>${c}</span></div>`).join("") : ""}
    <div class="tk-div" style="top:612px"></div>
    <div class="tk-fila tk-r7" style="top:640px"><span>TARJETA</span><span>•••• 0417</span></div>
    <svg class="tk-bar" viewBox="0 0 520 130" aria-hidden="true">${Array.from({ length: 34 }, (_, i) => `<rect x="${i * 15.3}" y="0" width="${i % 4 === 0 ? 8 : i % 3 === 0 ? 3 : 5}" height="130" fill="${NAVY}"/>`).join("")}</svg>
    <div class="tk-luz"></div>
  </div>`;
escena("s02-ticket", {
  css: `
    P .haz { position: absolute; left: 110px; top: 1420px; width: 860px; height: 18px; border-radius: 9px; background: ${G}; opacity: 0; }
    P .slot { position: absolute; left: 190px; top: 566px; width: 700px; height: 48px; border-radius: 24px; background: ${NAVY3}; border: 6px solid #2c4268; opacity: 0; }
    P .slot::after { content: ""; position: absolute; left: 40px; right: 40px; top: 14px; height: 8px; border-radius: 4px; background: #070c16; }
    P .mask { position: absolute; left: 0; top: 594px; width: 1080px; height: 1130px; overflow: hidden; }
    P .grupo { position: absolute; left: 0; top: 0; width: 1080px; height: 1130px; }
    P .tk { position: absolute; left: 240px; top: 0; width: 600px; height: 1060px; background: ${CR}; clip-path: polygon(${zig}); }
    P .tk.atras { background: #d6d4c6; }
    P .tk-r0 { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .tk-fila { position: absolute; left: 44px; right: 44px; height: 56px; display: flex; justify-content: space-between; align-items: center; font: 500 34px/1 "IBM Plex Mono", monospace; color: ${NAVY}; }
    P .tk-r1 { top: 112px; }
    P .tk-div { position: absolute; left: 40px; right: 40px; border-top: 5px dashed rgba(11,18,32,0.3); }
    P .tk-bar { position: absolute; left: 40px; top: 740px; width: 520px; height: 130px; }
    P .tk-luz { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,18,32,0) 86%, rgba(11,18,32,0.07) 86%); }
    P .tk-ok { position: absolute; left: 864px; width: 48px; height: 48px; opacity: 0; }
    P .tk-ok svg { width: 48px; height: 48px; }`,
  html: `
      ${tarjeta("card", "super")}
      <div class="haz"></div>
      <div class="mask"><div class="grupo" data-layout-allow-overlap>
        ${ticket("atras a2", "16/09/2026", "19:05")}
        ${ticket("atras a1", "01/10/2026", "18:20")}
        ${ticket("main", "16/10/2026", "18:42")}
        ${selbox("sb-items", 264, 206, 552, 392)}
        ${selbox("sb-fecha", 264, 104, 552, 72)}
        ${ITEMS.map((_, i) => `<div class="tk-ok o${i}" style="top:${226 + i * 76}px">${tick(24)}</div>`).join("")}
      </div></div>
      <div class="slot"></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 190, 1300, 268, 1196, "g")}${lead(2, 905, 800, 816, 740, "g")}</svg>
      ${pill(1, 190, 1352, "Qué compró", "g")}
      ${pill(2, 905, 852, "Cuándo", "g")}
      ${pill(4, 130, 690, "01/10")}
      ${pill(5, 950, 690, "16/09")}
      ${pill(3, 540, 1600, "Cada cuánto vuelve", "lleno")}`,
  js: `
      const T = q(".card .tarj"), W = q(".card");
      gsap.set(T, ${POSE0});
      // la pasás: baja y cruza el haz
      tl.to(q(".haz"), { opacity: 1, duration: 0.15 }, 0.25);
      tl.to(T, { rotationX: 58, rotationZ: 0, rotationY: 0, duration: 0.55, ease: "power2.in" }, 0.05);
      tl.to(W, { y: 760, duration: 0.75, ease: "power2.in" }, 0.15);
      tl.to(W, { opacity: 0, duration: 0.15 }, 0.75);
      tl.fromTo(q(".haz"), { scaleY: 1 }, { scaleY: 2.4, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, 0.7);
      // el haz sube y se vuelve la ranura de la impresora
      tl.to(q(".haz"), { y: -834, duration: 0.3, ease: "power3.inOut" }, 0.88);
      tl.to(q(".haz"), { opacity: 0, duration: 0.1 }, 1.12);
      tl.fromTo(q(".slot"), { opacity: 0, scaleX: 0.8 }, { opacity: 1, scaleX: 1, duration: 0.2, ease: "back.out(2)" }, 1.08);
      tl.fromTo(q(".grupo"), { y: -1070 }, { y: 0, duration: 0.85, ease: "power2.out" }, 1.15);
      // anota qué compraste
      caja(".sb-items", 1.6);
      qa(".tk-ok").forEach((el, i) => pop(el, 1.7 + i * 0.09, 0.25));
      nota(1, 2.1);
      // cuándo
      caja(".sb-fecha", 2.95);
      nota(2, 3.05);
      // y cada cuánto: los tickets de antes se abren
      sinNota(1, 3.7); sinNota(2, 3.7);
      tl.to(qa(".sb-items, .sb-fecha, .tk-ok"), { opacity: 0, duration: 0.2 }, 3.7);
      tl.to(q(".a1"), { x: -250, rotation: -7, y: 30, duration: 0.45, ease: "back.out(1.4)" }, 3.8);
      tl.to(q(".a2"), { x: 250, rotation: 7, y: 30, duration: 0.45, ease: "back.out(1.4)" }, 3.92);
      pop(".n4", 4.05); pop(".n5", 4.15);
      nota(3, 4.3);
      // push-in a la yerba (match con el calendario)
      sinNota(3, 4.7); fuera(".n4, .n5", 4.7);
      tl.to(q(".grupo"), { scale: 1.6, transformOrigin: "540px 250px", duration: 0.67, ease: "power2.in" }, 4.7);
      tl.to(q(".slot"), { opacity: 0, y: -40, duration: 0.3 }, 4.75);
      salida(5.12);`,
  sfx: [{ t: 0.7, sfx: "ping", vol: 0.3 }, { t: 1.15, sfx: "typing", vol: 0.2, max: 0.8 }, { t: 1.6, sfx: "click-soft", vol: 0.3 }, { t: 2.1, sfx: "pop", vol: 0.25 }, { t: 2.95, sfx: "click-soft", vol: 0.3 }, { t: 3.8, sfx: "whoosh-short", vol: 0.2 }, { t: 4.3, sfx: "pop", vol: 0.28 }],
});

// ================= s03 · calendario =================
const RH = 148;
const cc = (d, primero = 3, rh = RH) => { const c = celda(primero + d - 1, rh); return { x: r2(c.x + c.w / 2), y: r2(c.y + c.h / 2 + 12) }; };
const d1 = cc(1), d16 = cc(16), d31 = cc(31), d29 = cc(29);
const arco = (a, b, cx, cy, cls) => `<path class="arco ${cls}" d="M${a.x} ${a.y - 50} Q${cx} ${cy} ${b.x} ${b.y - 56}"/>`;
const OCT_EXTRA =
  yerba(d1.x, d1.y, 1, "y1") + yerba(d16.x, d16.y, 1, "y16") + yerba(d31.x, d31.y, 1, "y31", true) +
  arco(d1, d16, 700, 300, "a1") + arco(d16, d31, 830, 600, "a2") +
  `<circle class="c29" cx="${d29.x}" cy="${d29.y - 6}" r="64" fill="rgba(92,230,17,0.16)" stroke="${G}" stroke-width="7" stroke-dasharray="16 10"/>`;
const calendario = (paginas) => `
      ${sombra("sh", 540, 1606, 820, 64)}
      <div class="calw">
        <div class="hoja" style="top:26px;background:#bab8a9"></div>
        <div class="hoja" style="top:13px;background:#d6d4c6"></div>
        ${paginas}
        ${anillos}
      </div>`;
escena("s03-calendario", {
  css: `
    P .calw { position: absolute; left: 110px; top: 590px; width: 860px; height: 980px; }
    P .arco { fill: none; stroke: ${G}; stroke-width: 9; stroke-linecap: round; }
    P .noti { position: absolute; left: 110px; top: 1436px; width: 860px; height: 200px; border-radius: 40px; background: #ffffff; box-shadow: 0 16px 0 rgba(3,6,12,0.4); opacity: 0; }
    P .noti .ic { position: absolute; left: 30px; top: 40px; width: 120px; height: 120px; border-radius: 30px; background: ${G}; }
    P .noti .ic svg { position: absolute; left: 22px; top: 18px; }
    P .noti .t0 { position: absolute; left: 180px; top: 34px; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .noti .t1 { position: absolute; left: 180px; top: 78px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .noti .t2 { position: absolute; left: 180px; top: 138px; font: 500 30px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }`,
  html: `
      ${calendario(pagina("oct", "OCTUBRE", 3, 31, RH, OCT_EXTRA))}
      <div class="pills-cal">${pill(1, 706, 945, "15 días", "lleno")}${pill(2, 832, 1238, "15 días", "lleno")}</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(3, 270, 1210, 470, 1286, "g")}</svg>
      ${pill(3, 245, 1180, "Justo antes", "g")}
      <div class="noti"><div class="ic"><svg width="76" height="84" viewBox="0 0 76 84"><rect x="6" y="6" width="64" height="72" rx="10" fill="${NAVY}"/><rect x="6" y="34" width="64" height="18" fill="${CR}"/><rect x="50" y="6" width="20" height="72" rx="8" fill="#0d1628" opacity="0.6"/></svg></div>
        <div class="t0">SÚPER · AHORA</div><div class="t1">Yerba 1 kg en oferta</div><div class="t2">Para vos, esta semana</div></div>`,
  js: `
      const C = q(".calw");
      tl.fromTo(C, { scale: 1.35, rotationX: 0, y: -60, opacity: 0.4, transformOrigin: "50% 30%" }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.1);
      pop(".y1", 1.3, 0.35, 0.3); pop(".y16", 1.52, 0.35, 0.3); pop(".y31", 1.74, 0.35, 0.3);
      dibujar(".a1", 2.0, 0.4); dibujar(".a2", 2.25, 0.4);
      pop(".n1", 2.2); pop(".n2", 2.45);
      contar(".n1", 1, 15, 2.2, 0.5, (v) => v + (v === 1 ? " día" : " días"));
      // te manda la oferta: el calendario sube y entra el aviso
      fuera(".pills-cal .pill", 2.95);
      tl.to(qa(".a1, .a2"), { opacity: 0.35, duration: 0.2 }, 2.95);
      tl.to(C, { scale: 0.84, y: -30, transformOrigin: "50% 0%", duration: 0.45, ease: "power3.inOut" }, 2.9);
      tl.to(q(".sh"), { y: -200, scale: 0.85, duration: 0.45, ease: "power3.inOut" }, 2.9);
      tl.fromTo(q(".noti"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 3.12);
      pop(".c29", 3.42, 0.3, 0.4);
      nota(3, 4.1);
      tl.fromTo(q(".y31"), { opacity: 1 }, { opacity: 0.25, duration: 0.18, yoyo: true, repeat: 3, immediateRender: false }, 4.5);
      // salen el aviso y las notas: queda el calendario igual que al empezar s04
      fuera(".noti", 4.78); sinNota(3, 4.78);
      tl.to(qa(".a1, .a2, .c29"), { opacity: 0, duration: 0.2 }, 4.78);`,
  sfx: [{ t: 1.3, sfx: "pop", vol: 0.25 }, { t: 1.52, sfx: "pop", vol: 0.25 }, { t: 2.0, sfx: "whoosh-short", vol: 0.18 }, { t: 2.2, sfx: "click-soft", vol: 0.25 }, { t: 3.12, sfx: "notification", vol: 0.35 }, { t: 4.1, sfx: "pop", vol: 0.25 }],
});

// ================= s04 · dejó de venir =================
const RHN = 123;
const n15 = cc(15, 6, RHN), n30 = cc(30, 6, RHN);
const marcaRoja = (c, cls) =>
  `<g class="${cls}"><rect x="${c.x - 52}" y="${c.y - 62}" width="104" height="104" rx="16" fill="rgba(199,101,91,0.1)" stroke="${RED}" stroke-width="6" stroke-dasharray="14 10"/>${yerba(c.x, c.y - 10, 0.82, "", false).replace(/fill="#5ce611"|fill="#3fa60a"/g, 'fill="rgba(199,101,91,0.35)"')}</g>`;
const NOV_EXTRA = marcaRoja(n15, "m15") + marcaRoja(n30, "m30") +
  `<path class="cruz x15" d="M${n15.x - 40} ${n15.y - 50} L${n15.x + 40} ${n15.y + 30} M${n15.x + 40} ${n15.y - 50} L${n15.x - 40} ${n15.y + 30}"/>` +
  `<path class="cruz x30" d="M${n30.x - 40} ${n30.y - 50} L${n30.x + 40} ${n30.y + 30} M${n30.x + 40} ${n30.y - 50} L${n30.x - 40} ${n30.y + 30}"/>`;
const OCT_QUIETO = yerba(d1.x, d1.y, 1, "") + yerba(d16.x, d16.y, 1, "") + yerba(d31.x, d31.y, 1, "", true);
escena("s04-dejo", {
  css: `
    P .calw { position: absolute; left: 110px; top: 590px; width: 860px; height: 980px; perspective: 2400px; }
    P .cruz { fill: none; stroke: ${RED}; stroke-width: 10; stroke-linecap: round; }
    P .sl-l { position: absolute; top: 1432px; font: 600 34px/1 "Lexend", sans-serif; }
    P .sl-l.a { left: 120px; color: ${G}; } P .sl-l.b { right: 120px; color: ${RED}; }
    P .sl-track { position: absolute; left: 120px; top: 1508px; width: 840px; height: 30px; border-radius: 15px; background: ${NAVY3}; }
    P .sl-fill { position: absolute; left: 120px; top: 1508px; width: 840px; height: 30px; border-radius: 15px; background: ${G}; }
    P .sl-knob { position: absolute; left: 172px; top: 1483px; width: 80px; height: 80px; border-radius: 50%; background: ${CR}; border: 8px solid ${NAVY}; box-shadow: 0 8px 0 rgba(3,6,12,0.45); }
    P .slider { opacity: 0; }`,
  html: `
      ${calendario(pagina("nov", "NOVIEMBRE", 6, 30, RHN, NOV_EXTRA) + pagina("oct", "OCTUBRE", 3, 31, RH, OCT_QUIETO))}
      <div class="slider"><div class="sl-l a">Viene seguido</div><div class="sl-l b">Dejó de venir</div><div class="sl-track"></div><div class="sl-fill"></div><div class="sl-knob"></div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 880, 1110, r2(540 + (n15.x - 430) * 0.84), r2(560 + (n15.y + 44) * 0.84), "r")}</svg>
      ${pill(1, 890, 1150, "No vino", "rl")}`,
  js: `
      const C = q(".calw");
      gsap.set(C, { scale: 0.84, y: -30, transformOrigin: "50% 0%" });
      gsap.set(q(".sh"), { y: -200, scale: 0.85 });
      // se da vuelta la hoja
      tl.to(q(".pg.oct"), { rotationX: 100, transformOrigin: "50% 0%", duration: 0.5, ease: "power2.in" }, 0.12);
      tl.to(q(".pg.oct"), { opacity: 0, duration: 0.1 }, 0.55);
      tl.fromTo(qa(".m15, .m30"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.62);
      tl.fromTo(q(".slider"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.7);
      gsap.set(q(".sl-fill"), { scaleX: 0.12, transformOrigin: "0% 50%" });
      dibujar(".x15", 1.08, 0.3);
      nota(1, 1.2);
      tl.fromTo(q(".m30"), { scale: 1 }, { scale: 1.08, svgOrigin: "${n30.x} ${n30.y}", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 1.78);
      dibujar(".x30", 1.85, 0.3);
      // el deslizador pasa de "viene seguido" a "dejó de venir"
      tl.to(q(".sl-knob"), { x: 656, duration: 0.7, ease: "power2.inOut" }, 2.05);
      tl.to(q(".sl-fill"), { scaleX: 0.9, backgroundColor: "${RED}", duration: 0.7, ease: "power2.inOut" }, 2.05);
      tl.to(q(".sl-knob"), { borderColor: "${RED}", duration: 0.2 }, 2.5);
      tl.fromTo(q(".sl-l.b"), { scale: 1 }, { scale: 1.15, transformOrigin: "100% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 2.5);
      salida(2.98);`,
  sfx: [{ t: 0.12, sfx: "whoosh-short", vol: 0.22 }, { t: 1.08, sfx: "click", vol: 0.28 }, { t: 1.85, sfx: "click", vol: 0.28 }, { t: 2.05, sfx: "whoosh-short", vol: 0.18 }, { t: 2.5, sfx: "glitch-1", vol: 0.16, max: 0.4 }],
});

// ================= s05 · la ficha =================
const miniFicha = (cls) => `<div class="mini ${cls}"><div class="mi-av">${avatar(110)}</div><i style="top:46px;width:260px"></i><i style="top:96px;width:190px"></i><i style="top:190px;width:420px;left:40px"></i><i style="top:244px;width:340px;left:40px"></i><i style="top:298px;width:380px;left:40px"></i></div>`;
escena("s05-ficha", {
  css: `
    P .tw { top: 800px; }
    P .mini { position: absolute; left: 240px; top: 840px; width: 600px; height: 380px; border-radius: 36px; background: ${NAVY2}; border: 6px solid #2c4268; opacity: 0; }
    P .mini .mi-av { position: absolute; left: 34px; top: 30px; width: 110px; height: 110px; }
    P .mini i { position: absolute; left: 176px; height: 26px; border-radius: 13px; background: rgba(239,238,229,0.3); }
    P .gris { position: absolute; inset: 0; border-radius: 40px; background: rgba(11,18,32,0.5); opacity: 0; }`,
  html: `
      ${sombra("sh", 540, 1420, 640, 70)}
      ${miniFicha("m1")}${miniFicha("m2")}
      ${tarjeta("card", "super", true)}
      ${pill(1, 540, 1560, "Cada cliente", "lleno")}
      ${pill(2, 540, 1560, "Lo de menos")}`,
  js: `
      const T = q(".tarj"), W = q(".card");
      q(".frente").insertAdjacentHTML("beforeend", '<div class="gris"></div>');
      tl.fromTo(W, { opacity: 0, scale: 0.7, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, 0);
      tl.fromTo(T, { rotationY: -40, rotationX: 18, rotationZ: -8 }, { rotationY: -18, rotationX: 10, rotationZ: -4, duration: 0.8, ease: "power3.out" }, 0);
      brillo(".card .brillo", 0.2);
      // lo de menos
      tl.to(W, { scale: 0.84, duration: 0.4, ease: "power2.out" }, 0.66);
      tl.to(q(".gris"), { opacity: 1, duration: 0.3 }, 0.66);
      pop(".n2", 0.7);
      fuera(".n2", 1.4);
      // lo que vale: da vuelta y es la ficha del cliente
      tl.to(T, { rotationY: 164, rotationX: 8, rotationZ: 3, duration: 0.6, ease: "power3.inOut" }, 1.5);
      tl.to(W, { scale: 1.06, y: -20, duration: 0.6, ease: "power3.inOut" }, 1.5);
      gsap.set(qa(".ds-fila"), { opacity: 0 });
      qa(".ds-fila").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 2.05 + i * 0.25));
      tl.fromTo(q(".ds-av"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 2.7);
      tl.fromTo(q(".ds-nom"), { color: "${CR}" }, { color: "${G}", duration: 0.2 }, 2.72);
      // cada cliente: aparecen más fichas atrás
      tl.fromTo(q(".m1"), { opacity: 0, x: 0, rotation: 0 }, { opacity: 0.9, x: -230, y: -150, rotation: -9, duration: 0.45, ease: "back.out(1.4)" }, 3.3);
      tl.fromTo(q(".m2"), { opacity: 0, x: 0, rotation: 0 }, { opacity: 0.9, x: 230, y: -150, rotation: 9, duration: 0.45, ease: "back.out(1.4)" }, 3.42);
      nota(1, 3.5);
      salida(4.25);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.66, sfx: "click-soft", vol: 0.25 }, { t: 1.5, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 2.05, sfx: "pop", vol: 0.2 }, { t: 2.3, sfx: "pop", vol: 0.2 }, { t: 2.55, sfx: "pop", vol: 0.2 }, { t: 3.3, sfx: "whoosh-short", vol: 0.2 }],
});

// ================= s06 · ¿y vos? =================
const XS = [230, 385, 540, 695, 850];
escena("s06-giro", {
  css: `P .preg { padding: 10px 26px 12px; font-size: 44px; font-weight: 800; }`,
  html: `
      <div class="capa local">${fachada(XS.map((x, i) => persona(x, "p p" + i)).join(""))}</div>
      ${XS.map((x, i) => pill("q" + i, x, 1356, "?", "preg")).join("")}
      ${pill(1, 760, 1356, "¿Dejó de venir?", "rl")}`,
  js: `
      const L = q(".local");
      tl.fromTo(L, { opacity: 0, scale: 0.9, transformOrigin: "540px 1340px" }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".cartel"), { scale: 1 }, { scale: 1.08, svgOrigin: "540 636", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.12);
      tl.fromTo(q(".cartel-txt"), { scale: 1 }, { scale: 1.08, svgOrigin: "540 636", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.12);
      qa(".p").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.85 + i * 0.08));
      ${XS.map((_, i) => `pop(".nq${i}", ${r2(1.45 + i * 0.07)});`).join(" ")}
      // ¿quién dejó de venir?
      fuera(".preg", 2.4, 0.18);
      tl.to(q(".p3"), { fill: "${RED}", duration: 0.01 }, 2.55);
      tl.to(qa(".p3 circle, .p3 path:not(:last-child)"), { fill: "${RED}", duration: 0.2 }, 2.55);
      tl.to(q(".p3"), { y: 30, opacity: 0.4, duration: 0.8, ease: "power2.inOut" }, 2.75);
      nota(1, 2.6);
      tl.to(qa(".p0, .p1, .p2, .p4"), { opacity: 0.5, duration: 0.3 }, 2.6);
      tl.to(L, { scale: 1.06, transformOrigin: "540px 1100px", duration: 1.2, ease: "power1.inOut" }, 2.85);
      // salen las personas: queda el local para s07
      fuera(".n1", 3.82); tl.to(qa(".p"), { opacity: 0, duration: 0.22 }, 3.82);`,
  sfx: [{ t: 0.12, sfx: "pop", vol: 0.22 }, { t: 0.85, sfx: "whoosh-short", vol: 0.18 }, { t: 1.45, sfx: "click-soft", vol: 0.25 }, { t: 2.6, sfx: "glitch-1", vol: 0.16, max: 0.4 }],
});

// ================= s07 · en tu local, en el celular =================
escena("s07-celular", {
  css: `P .tel-g { opacity: 0; } P .ok-cartel { position: absolute; left: 744px; top: 556px; width: 88px; height: 88px; opacity: 0; } P .ok-cartel svg { width: 88px; height: 88px; }`,
  html: `
      <div class="capa local">${fachada()}<div class="ok-cartel">${tick(44)}</div></div>
      <div class="capa tel-g">${sombra("sh", 560, 1556, 520, 50)}${celular()}<div class="capa pan-s">${pantallaSellos(5)}</div></div>
      ${tarjeta("card", "puntos")}
      ${pill(1, 540, 1610, "En el celular", "lleno")}`,
  js: `
      const L = q(".local"), T = q(".tarj"), W = q(".card");
      gsap.set(L, { scale: 1.06, transformOrigin: "540px 1100px" });
      gsap.set(W, { opacity: 0 });
      pop(".ok-cartel", 0.8, 0.35, 0.4);
      tl.to(q(".cartel"), { fill: "${G}", duration: 0.25 }, 1.2);
      // el local se va y entra la tarjeta de Scalerics Puntos
      tl.to(L, { scale: 0.7, y: 260, opacity: 0, duration: 0.5, ease: "power3.in" }, 1.45);
      tl.fromTo(W, { opacity: 0, y: -300, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.3)" }, 1.6);
      tl.fromTo(T, { rotationY: -50, rotationX: 24, rotationZ: -14 }, { rotationY: -16, rotationX: 10, rotationZ: -5, duration: 0.9, ease: "power3.out" }, 1.6);
      brillo(".card .brillo", 2.4);
      tl.to(T, { rotationY: -8, rotationX: 6, rotationZ: -3, duration: 1.0, ease: "sine.inOut" }, 2.5);
      // la tarjeta se mete en el celular
      tl.fromTo(q(".tel-g"), { opacity: 0, scale: 0.7, transformOrigin: "540px 1040px" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, 3.4);
      tl.to(W, { scale: 0.53, y: -390, duration: 0.8, ease: "power3.inOut" }, 3.75);
      tl.to(T, { rotationY: 0, rotationX: 0, rotationZ: 0, duration: 0.8, ease: "power3.inOut" }, 3.75);
      tl.fromTo(q(".pan-s"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 4.3);
      nota(1, 4.6);`,
  sfx: [{ t: 0.8, sfx: "pop", vol: 0.25 }, { t: 1.6, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 2.4, sfx: "sparkle", vol: 0.22 }, { t: 3.4, sfx: "pop", vol: 0.25 }, { t: 4.5, sfx: "click-soft", vol: 0.3 }],
});

// ================= s08 · suma y aviso =================
const CARD_EN_TEL = `{ scale: 0.53, y: -390 }`;
escena("s08-aviso", {
  css: `
    P .dim { position: absolute; left: 314px; top: 574px; width: 452px; height: 932px; border-radius: 58px; background: rgba(11,18,32,0.66); opacity: 0; }
    P .noti { position: absolute; left: 100px; top: 600px; width: 880px; height: 214px; border-radius: 42px; background: #ffffff; box-shadow: 0 16px 0 rgba(3,6,12,0.45); opacity: 0; }
    P .noti .ic { position: absolute; left: 32px; top: 46px; width: 122px; height: 122px; border-radius: 30px; background: ${G}; }
    P .noti .ic svg { position: absolute; left: 21px; top: 21px; }
    P .noti .t0 { position: absolute; left: 186px; top: 36px; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .noti .t1 { position: absolute; left: 186px; top: 80px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .noti .t2 { position: absolute; left: 186px; top: 142px; font: 500 32px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.72); }`,
  html: `
      ${sombra("sh", 560, 1556, 520, 50)}${celular()}
      <div class="capa">${pantallaSellos(5)}</div>
      ${tarjeta("card", "puntos")}
      <div class="dim"></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 880, 1130, 742, 1070, "g")}</svg>
      ${pill(1, 890, 1180, "+1 por compra", "g")}
      ${pill(2, 540, 1610, "Hace un mes que no viene", "r")}
      <div class="noti"><div class="ic"><svg width="80" height="80" viewBox="0 0 80 80"><rect x="8" y="30" width="64" height="44" rx="6" fill="${NAVY}"/><path d="M4 30 L14 8 H66 L76 30 Z" fill="${NAVY}"/><rect x="32" y="48" width="16" height="26" fill="${G}"/></svg></div>
        <div class="t0">TU LOCAL · AHORA</div><div class="t1">Te extrañamos por acá</div><div class="t2">Tu premio te está esperando</div></div>
      ${pill(3, 540, 880, "Sale solo", "lleno")}`,
  js: `
      gsap.set(q(".card"), ${CARD_EN_TEL});
      const fmt = (v) => v + " / 10";
      [5, 6, 7].forEach((i, k) => pop(".ok" + i, [0.05, 0.85, 1.38][k], 0.3, 0.3));
      contar(".cont", 5, 6, 0.05, 0.01, fmt);
      const c = q(".cont"); const o = { v: 6 };
      tl.to(o, { v: 8, duration: 0.6, ease: "steps(2)", onUpdate: () => { c.textContent = fmt(Math.round(o.v)); } }, 0.84);
      tl.fromTo(c, { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, 0.05);
      tl.fromTo(c, { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, 1.38);
      nota(1, 0.3);
      // si deja de venir
      sinNota(1, 1.9);
      tl.to(q(".dim"), { opacity: 1, duration: 0.35 }, 2.2);
      pop(".n2", 2.5);
      // le llega un aviso solo
      tl.fromTo(q(".noti"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, 3.32);
      pop(".n3", 3.85);
      tl.to(q(".noti"), { y: 10, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.85);
      // queda el celular limpio para s09
      fuera(".noti, .n2, .n3", 4.06);
      tl.to(q(".dim"), { opacity: 0, duration: 0.22 }, 4.06);`,
  sfx: [{ t: 0.05, sfx: "ping", vol: 0.25 }, { t: 0.85, sfx: "ping", vol: 0.22 }, { t: 1.38, sfx: "ping", vol: 0.25 }, { t: 2.5, sfx: "click-soft", vol: 0.25 }, { t: 3.32, sfx: "notification", vol: 0.38 }, { t: 3.85, sfx: "pop", vol: 0.25 }],
});

// ================= s09 · CTA =================
escena("s09-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 570px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 586px; width: 922px; height: 460px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 24px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
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
      <div class="capa telg">${sombra("sh", 560, 1556, 520, 50)}${celular()}
        <div class="capa">${pantallaSellos(8)}</div>
        ${tarjeta("card", "puntos")}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(160)}<div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      gsap.set(q(".card"), ${CARD_EN_TEL});
      const TG = q(".telg");
      tl.to(TG, { scale: 1.03, transformOrigin: "540px 1040px", duration: 0.65, ease: "sine.inOut" }, 0);
      // gira a horizontal y se vuelve la videollamada
      tl.to(TG, { rotation: -90, scale: 0.96, y: -240, duration: 0.6, ease: "power3.inOut" }, 0.65);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.22);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.18);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.3);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.5);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.85);
      caja(".sb", 3.1);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.95);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 4.4);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 4.4);`,
  sfx: [{ t: 0.65, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.3, sfx: "pop", vol: 0.22 }, { t: 2.5, sfx: "whoosh-short", vol: 0.2 }, { t: 3.1, sfx: "click-soft", vol: 0.28 }, { t: 3.95, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
