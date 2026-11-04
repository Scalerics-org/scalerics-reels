// Generador de escenas de reels/caso-spotify (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" (copiado de por-que-la-tarjeta): un objeto grande relleno por escena, que
// se transforma: regalo → celular con "tu año" → auriculares → fichas de datos → regalo → celular
// compartido → cliente y su cortado → celular con Scalerics Puntos → resumen del cliente → premio
// → videollamada. Spotify se NOMBRA, pero no se dibuja su logo, su verde ni su tipografía.
// Los tiempos de las animaciones salen de las palabras: w(i) = segundo de la palabra i relativo a
// la escena, así si la voz cambia alcanza con volver a correr gen + armar.
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
const w = (i) => r2(pal[i].start - T0);
const desde = (id) => { T0 = START[id]; };

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", CRD = "#b9b7a8", G = "#5ce611", GD = "#3fa60a", GL = "#9df26a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
const sombra = (cls, x, y, ww, h) => `<div class="sombra ${cls}" style="left:${x - ww / 2}px;top:${y - h / 2}px;width:${ww}px;height:${h}px"></div>`;
const avatar = (s = 140, piel = CR, ropa = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${piel}"/><circle cx="70" cy="56" r="26" fill="${ropa}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${ropa}"/></svg>`;

// regalo en 3/4 (viewBox 700 x 700): caja verde con cinta navy, tapa aparte (clase .tapa)
const REGALO = `
<svg class="rg-svg" viewBox="0 0 700 700" aria-hidden="true">
  <ellipse class="rg-sh" cx="355" cy="640" rx="300" ry="30" fill="rgba(3,6,12,0.55)"/>
  <g class="rg-cuerpo">
    <polygon points="510,330 600,282 600,582 510,630" fill="${GD}"/>
    <polygon points="510,442 600,394 600,446 510,494" fill="${NAVY}"/>
    <rect x="110" y="330" width="400" height="300" fill="${G}"/>
    <polygon points="110,330 300,330 110,520" fill="rgba(255,255,255,0.13)"/>
    <rect x="280" y="330" width="60" height="300" fill="${NAVY}"/>
    <rect x="110" y="330" width="400" height="22" fill="rgba(11,18,32,0.22)"/>
  </g>
  <g class="tapa">
    <polygon points="90,270 180,222 620,222 530,270" fill="${GL}"/>
    <polygon points="280,270 370,222 430,222 340,270" fill="${NAVY2}"/>
    <polygon points="530,270 620,222 620,300 530,348" fill="${GD}"/>
    <rect x="90" y="270" width="440" height="78" fill="${G}"/>
    <rect x="280" y="270" width="60" height="78" fill="${NAVY}"/>
    <g class="mono">
      <path d="M352 236 C 290 150, 200 170, 222 214 C 236 244, 300 248, 352 236 Z" fill="${NAVY}"/>
      <path d="M352 236 C 300 186, 252 192, 262 214 C 270 230, 310 236, 352 236 Z" fill="${NAVY3}"/>
      <path d="M362 236 C 410 140, 520 150, 504 200 C 492 238, 420 248, 362 236 Z" fill="${NAVY}"/>
      <path d="M362 236 C 404 182, 462 182, 462 206 C 460 226, 410 236, 362 236 Z" fill="${NAVY3}"/>
      <ellipse cx="357" cy="238" rx="34" ry="24" fill="${NAVY}"/>
    </g>
  </g>
</svg>`;
const regalo = (cls) => `<div class="rgw ${cls}">${REGALO}</div>`;

// auriculares (viewBox 800 x 700)
const auris = (band = CR, cup = G, lado = GD, coj = NAVY3, ondas = true) => `
<svg class="au-svg" viewBox="0 0 800 700" aria-hidden="true">
  <path d="M168 440 A 232 232 0 0 1 632 440" fill="none" stroke="${band}" stroke-width="64" stroke-linecap="round"/>
  <path d="M206 420 A 194 194 0 0 1 594 420" fill="none" stroke="rgba(11,18,32,0.18)" stroke-width="14" stroke-linecap="round"/>
  <rect x="96" y="388" width="150" height="250" rx="62" fill="${lado}"/>
  <rect x="116" y="388" width="130" height="250" rx="58" fill="${cup}"/>
  <rect x="234" y="410" width="44" height="206" rx="20" fill="${coj}"/>
  <rect x="554" y="388" width="150" height="250" rx="62" fill="${lado}"/>
  <rect x="554" y="388" width="130" height="250" rx="58" fill="${cup}"/>
  <rect x="522" y="410" width="44" height="206" rx="20" fill="${coj}"/>
  ${ondas ? `<path class="onda o1" d="M738 450 Q 772 513 738 576" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round"/>
  <path class="onda o2" d="M772 418 Q 830 513 772 608" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round"/>
  <path class="onda o3" d="M62 450 Q 28 513 62 576" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round"/>
  <path class="onda o4" d="M28 418 Q -30 513 28 608" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round"/>` : ""}
</svg>`;

// taza de cortado (viewBox 420 x 420)
const taza = (cuerpo = CR, banda = G, plato = NAVY3, borde = BORDE, vapor = CR) => `
<svg class="tz-svg" viewBox="0 0 420 420" aria-hidden="true">
  <path class="vap v1" d="M160 120 C 140 90, 180 70, 160 36" fill="none" stroke="${vapor}" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
  <path class="vap v2" d="M214 112 C 194 80, 234 60, 214 22" fill="none" stroke="${vapor}" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
  <path class="vap v3" d="M268 120 C 248 90, 288 70, 268 36" fill="none" stroke="${vapor}" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
  <ellipse cx="210" cy="352" rx="186" ry="40" fill="${borde}"/>
  <ellipse cx="210" cy="340" rx="186" ry="40" fill="${plato}"/>
  <path d="M318 196 C 384 196, 384 290, 308 290" fill="none" stroke="${cuerpo}" stroke-width="22" stroke-linecap="round"/>
  <path d="M96 160 L324 160 L300 318 Q210 350 120 318 Z" fill="${cuerpo}"/>
  <path d="M262 160 L324 160 L300 318 Q282 326 256 332 Z" fill="rgba(11,18,32,0.14)"/>
  <path d="M103 206 L317 206 L311 246 L109 246 Z" fill="${banda}"/>
  <ellipse cx="210" cy="160" rx="114" ry="26" fill="${borde}"/>
  <ellipse cx="210" cy="164" rx="98" ry="18" fill="${plato}"/>
</svg>`;

// celular vertical: 540 x 1060 en (270, 570); pantalla 508 x 1028
const celular = (cls, pantalla = "") => `
<div class="telw ${cls}" data-layout-allow-overlap><div class="tel-lado"></div>
<div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div></div>`;

const filas = (n = 3) => [0.82, 0.64, 0.5].slice(0, n).map((f, i) => `<div class="m-row" style="top:${716 + i * 70}px"><b>${i + 1}</b><i style="width:${Math.round(f * 330)}px"></i></div>`).join("");
const pantallaMusica = () => `
  <div class="m-lbl">TU AÑO EN MÚSICA</div>
  <div class="m-art">${auris(NAVY, NAVY, NAVY3, CR, false)}<div class="m-luz"></div></div>
  <div class="m-tit">Tu año</div>
  ${filas()}
  <div class="m-btn"><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4 V22 M9 11 L17 3 L25 11 M5 18 V30 H29 V18" fill="none" stroke="${NAVY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Compartir</span></div>`;

const sellosSvg = (llenos, total = 8) => `<svg class="p-sellos" viewBox="0 0 400 60" aria-hidden="true">${Array.from({ length: total }, (_, i) => `<circle cx="${25 + i * 50}" cy="30" r="20" fill="${i < llenos ? NAVY : "none"}" stroke="${NAVY}" stroke-width="5"/>`).join("")}</svg>`;
const pantallaPuntos = () => `
  <div class="p-card"><div class="p-top">Scalerics</div><div class="p-sub">PUNTOS</div>${sellosSvg(6)}<div class="p-num">7 / 10</div><div class="m-luz"></div></div>
  <div class="p-lbl">CAFÉ DE LA ESQUINA</div>
  <div class="p-nom">Hola, Laura</div>
  <div class="p-fila" style="top:620px">${tick(22)}<span>+1 por compra</span></div>
  <div class="p-fila" style="top:700px">${tick(22)}<span>Premio a los 10</span></div>
  <div class="p-fila" style="top:780px">${tick(22)}<span>Tu historial</span></div>`;

const DOTS = Array.from({ length: 35 }, (_, i) => `<circle class="${i < 31 ? "dt dt" + i : "dv"}" cx="${30 + (i % 7) * 60}" cy="${30 + Math.floor(i / 7) * 60}" r="22"/>`).join("");
const pantallaResumen = () => `
  <div class="r-a">
    <div class="m-lbl">TU AÑO EN EL CAFÉ</div>
    <div class="r-num">31</div>
    <div class="r-sub">visitas</div>
    <svg class="r-dots" viewBox="0 0 420 300" aria-hidden="true">${DOTS}</svg>
  </div>
  <div class="r-b">
    <div class="m-lbl">TU FAVORITO</div>
    <div class="f-art">${taza(NAVY, CR, NAVY3, "#0d1628", NAVY)}<div class="m-luz"></div></div>
    <div class="f-tit"><span>Cortado</span></div>
    <div class="f-sub">Tu pedido de siempre</div>
  </div>`;

const notiHtml = (cls, t0, t1, t2) => `<div class="noti ${cls}" data-layout-allow-overlap><div class="ic"><svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true"><rect x="12" y="34" width="56" height="38" rx="5" fill="${NAVY}"/><rect x="8" y="22" width="64" height="16" rx="4" fill="${NAVY}"/><rect x="34" y="22" width="12" height="50" fill="${G}"/><path d="M40 22 C 30 6, 16 12, 24 20 Z M40 22 C 50 6, 64 12, 56 20 Z" fill="${NAVY}"/></svg></div>
  <div class="t0">${t0}</div><div class="t1">${t1}</div><div class="t2">${t2}</div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.55); }
    ${P} .rgw { position: absolute; left: 40px; top: 560px; width: 1000px; height: 1000px; }
    ${P} .rg-svg { position: absolute; inset: 0; width: 1000px; height: 1000px; overflow: visible; }
    ${P} .auw { position: absolute; left: 100px; top: 560px; width: 880px; height: 770px; }
    ${P} .au-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    ${P} .telw { position: absolute; inset: 0; }
    ${P} .tel-lado { position: absolute; left: 288px; top: 588px; width: 540px; height: 1060px; border-radius: 80px; background: #a9a798; }
    ${P} .tel { position: absolute; left: 270px; top: 570px; width: 540px; height: 1060px; border-radius: 80px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 16px; top: 16px; width: 508px; height: 1028px; border-radius: 64px; background: ${NAVY2}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 205px; top: 30px; width: 130px; height: 30px; border-radius: 15px; background: ${CR}; }
    ${P} .m-lbl { position: absolute; left: 0; right: 0; top: 88px; text-align: center; font: 500 31px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.72); }
    ${P} .m-art { position: absolute; left: 44px; top: 146px; width: 420px; height: 420px; border-radius: 40px; background: ${G}; overflow: hidden; }
    ${P} .m-art .au-svg { position: absolute; left: 30px; top: 40px; width: 360px; height: 315px; }
    ${P} .m-luz { position: absolute; inset: 0; background: linear-gradient(128deg, rgba(11,18,32,0) 60%, rgba(11,18,32,0.1) 60%); }
    ${P} .m-tit { position: absolute; left: 0; right: 0; top: 596px; text-align: center; font: 800 84px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; }
    ${P} .m-row { position: absolute; left: 70px; height: 44px; display: flex; align-items: center; gap: 24px; }
    ${P} .m-row b { font: 500 34px/1 "IBM Plex Mono", monospace; color: ${G}; width: 30px; }
    ${P} .m-row i { display: block; height: 26px; border-radius: 13px; background: rgba(239,238,229,0.34); }
    ${P} .m-btn { position: absolute; left: 84px; top: 920px; width: 340px; height: 80px; border-radius: 40px; background: ${G}; display: flex; align-items: center; justify-content: center; gap: 14px; font: 700 34px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .p-card { position: absolute; left: 34px; top: 120px; width: 440px; height: 290px; border-radius: 34px; background: ${G}; overflow: hidden; }
    ${P} .p-top { position: absolute; left: 32px; top: 30px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    ${P} .p-sub { position: absolute; left: 34px; top: 94px; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.3em; color: ${NAVY}; }
    ${P} .p-sellos { position: absolute; left: 20px; top: 150px; width: 400px; height: 60px; }
    ${P} .p-num { position: absolute; left: 34px; top: 228px; font: 700 36px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .p-lbl { position: absolute; left: 0; right: 0; top: 460px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.72); }
    ${P} .p-nom { position: absolute; left: 0; right: 0; top: 508px; text-align: center; font: 800 64px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .p-fila { position: absolute; left: 60px; display: flex; align-items: center; gap: 22px; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .r-a, ${P} .r-b { position: absolute; inset: 0; }
    ${P} .r-num { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font: 800 300px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; }
    ${P} .r-sub { position: absolute; left: 0; right: 0; top: 446px; text-align: center; font: 700 64px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .r-dots { position: absolute; left: 44px; top: 570px; width: 420px; height: 300px; }
    ${P} .r-dots .dt { fill: ${G}; } ${P} .r-dots .dv { fill: none; stroke: rgba(239,238,229,0.3); stroke-width: 5; }
    ${P} .f-art { position: absolute; left: 44px; top: 146px; width: 420px; height: 420px; border-radius: 40px; background: ${G}; overflow: hidden; }
    ${P} .f-art .tz-svg { position: absolute; left: 20px; top: 30px; width: 380px; height: 380px; }
    ${P} .f-tit { position: absolute; left: 0; right: 0; top: 600px; text-align: center; }
    ${P} .f-tit span { display: inline-block; position: relative; padding: 4px 22px 10px; font: 800 92px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; }
    ${P} .f-sub { position: absolute; left: 0; right: 0; top: 730px; text-align: center; font: 500 36px/1 "Lexend", sans-serif; color: rgba(239,238,229,0.72); }
    ${P} .noti { position: absolute; left: 90px; top: 610px; width: 900px; height: 216px; border-radius: 42px; background: #ffffff; box-shadow: 0 16px 0 rgba(3,6,12,0.45); opacity: 0; }
    ${P} .noti .ic { position: absolute; left: 32px; top: 46px; width: 124px; height: 124px; border-radius: 30px; background: ${G}; }
    ${P} .noti .ic svg { position: absolute; left: 22px; top: 22px; }
    ${P} .noti .t0 { position: absolute; left: 186px; top: 36px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    ${P} .noti .t1 { position: absolute; left: 186px; top: 80px; font: 700 50px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .noti .t2 { position: absolute; left: 186px; top: 146px; font: 500 34px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.72); }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
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
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const ondas = (t, n) => { for (let k = 0; k < n; k++) qa(".onda").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: k === 0 }, t + k * 0.5 + (i % 2) * 0.12)); };
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

// poses compartidas (match cuts)
const TAPA_ABIERTA = `{ y: -150, x: 40, rotation: 14, svgOrigin: "560 300" }`;

// notas musicales que salen del regalo
const nota8 = (x, y, s, cls) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="nm ${cls}"><ellipse cx="0" cy="0" rx="30" ry="22" transform="rotate(-20)" fill="${G}"/><rect x="20" y="-110" width="12" height="110" fill="${G}"/><path d="M26 -110 C 60 -96, 74 -70, 56 -40 C 60 -66, 48 -78, 26 -84 Z" fill="${G}"/></g></g>`;

// ================= s01 · gancho =================
desde("s01-gancho");
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 800 112px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 156px; line-height: 1.0; }
    P .tit .v { color: ${G}; }
    P .brilla { position: absolute; left: 290px; top: 760px; width: 500px; height: 260px; border-radius: 50%; background: rgba(92,230,17,0.22); opacity: 0; }`,
  html: `
      ${regalo("rg")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${nota8(400, 960, 1.2, "nm1")}${nota8(640, 930, 1.4, "nm2")}${nota8(830, 990, 1.0, "nm3")}</svg>
      <div class="tit"><div>¿Por qué Spotify</div><div class="gr">te <span class="v">regala</span></div><div class="gr">tu año?</div></div>`,
  js: `
      const R = q(".rg"), TP = q(".tapa");
      // cuadro 0: el gancho entero y el regalo ya grande
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(R, { y: 50, scale: 0.95, transformOrigin: "50% 80%" }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      // la tapa tiembla: hay algo adentro
      tl.to(TP, { rotation: -4, svgOrigin: "560 300", duration: 0.09, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${w(4)});
      tl.to(TP, { rotation: 4, svgOrigin: "120 300", duration: 0.09, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${r2(w(6) + 0.1)});
      tl.to(R, { y: -22, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${w(6)});
      // "lo que escuchaste": se asoman notas
      tl.to(TP, { y: -46, rotation: 6, svgOrigin: "560 300", duration: 0.3, ease: "back.out(2)" }, ${w(10)});
      qa(".nm").forEach((n, i) => tl.fromTo(n, { opacity: 0, y: 60 }, { opacity: 1, y: -150 - i * 40, duration: 0.6, ease: "power3.out" }, ${w(10)} + 0.08 + i * 0.1));
      tl.to(TP, { y: 0, rotation: 0, duration: 0.25, ease: "power2.in" }, ${r2(w(13) - 0.15)});
      tl.to(qa(".nm"), { opacity: 0, y: "+=80", duration: 0.25, ease: "power2.in" }, ${r2(w(13) - 0.15)});
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, ${w(4)});
      tl.fromTo(q(".tit .gr:last-child"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, ${w(13)});
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, ${r2(DUR_S("s01-gancho") - 0.45)});
      // se abre la tapa (match con s02)
      tl.to(TP, { ...${TAPA_ABIERTA}, duration: 0.35, ease: "back.out(1.6)" }, ${r2(DUR_S("s01-gancho") - 0.35)});`,
  sfx: [{ t: 0.2, sfx: "sparkle", vol: 0.2 }, { t: w(4), sfx: "click-soft", vol: 0.25 }, { t: w(10), sfx: "pop", vol: 0.25 }, { t: r2(ESC["s01-gancho"] - 0.35), sfx: "whoosh-short", vol: 0.22 }],
});
function DUR_S(id) { return ESC[id]; }

// ================= s02 · cada diciembre, lo comparte =================
desde("s02-comparte");
const RING = [[150, 720], [930, 760], [130, 1060], [950, 1110], [160, 1420], [920, 1450]];
const ring = (k, x, y) => `<div class="ring rr${k}" style="left:${x - 90}px;top:${y - 90}px"><svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true"><circle class="rc" cx="90" cy="90" r="82" fill="none" stroke="${G}" stroke-width="10"/><g transform="translate(20 20)">${avatar(140, k % 2 ? CR : "#d6d4c6", k % 3 ? NAVY3 : BORDE)}</g></svg><div class="mini"><div class="mini-art"></div><i></i><i style="width:46px"></i></div></div>`;
escena("s02-comparte", {
  css: `
    P .cal { position: absolute; left: 300px; top: 486px; width: 480px; height: 108px; border-radius: 28px; background: ${CR}; overflow: hidden; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .cal b { position: absolute; left: 0; top: 0; width: 110px; height: 108px; background: ${G}; }
    P .cal b svg { position: absolute; left: 26px; top: 24px; }
    P .cal span { position: absolute; left: 128px; top: 0; font: 800 50px/108px "Lexend", sans-serif; color: ${NAVY}; letter-spacing: 0.02em; }
    P .ring { position: absolute; width: 180px; height: 180px; opacity: 0; }
    P .mini { position: absolute; left: 112px; top: -26px; width: 90px; height: 120px; border-radius: 16px; background: ${NAVY2}; border: 5px solid ${CR}; }
    P .mini-art { position: absolute; left: 10px; top: 10px; width: 60px; height: 50px; border-radius: 8px; background: ${G}; }
    P .mini i { position: absolute; left: 10px; top: 72px; width: 60px; height: 10px; border-radius: 5px; background: rgba(239,238,229,0.5); }
    P .mini i + i { top: 90px; }
    P .rr1 .mini, P .rr3 .mini, P .rr5 .mini { left: -22px; }`,
  html: `
      ${regalo("rg")}
      ${celular("tm", pantallaMusica())}
      ${RING.map(([x, y], k) => ring(k, x, y)).join("")}
      <div class="cal"><b><svg width="58" height="60" viewBox="0 0 58 60" aria-hidden="true"><rect x="3" y="9" width="52" height="48" rx="8" fill="none" stroke="${NAVY}" stroke-width="6"/><path d="M3 24 H55 M16 3 V14 M42 3 V14" stroke="${NAVY}" stroke-width="6" stroke-linecap="round"/></svg></b><span>DICIEMBRE</span></div>`,
  js: `
      const R = q(".rg"), TM = q(".tm");
      gsap.set(q(".rg .tapa"), ${TAPA_ABIERTA});
      // la tapa vuela y del regalo sale el celular
      tl.to(q(".rg .tapa"), { y: -900, x: 500, rotation: 50, svgOrigin: "560 300", duration: 0.5, ease: "power2.in" }, 0);
      tl.fromTo(TM, { y: 420, scale: 0.42, transformOrigin: "540px 1100px" }, { y: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)" }, 0.08);
      tl.to(R, { y: 700, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.06);
      pop(".cal", ${w(15)}, 0.35, 0.6);
      // la gente lo comparte: se encienden las historias alrededor
      qa(".ring").forEach((r, i) => pop(r, ${w(17)} + i * 0.13, 0.32, 0.4));
      qa(".ring .mini").forEach((m, i) => tl.fromTo(m, { opacity: 0, x: 0 }, { opacity: 1, duration: 0.2 }, ${w(19)} + i * 0.1));
      qa(".rc").forEach((c, i) => tl.fromTo(c, { rotation: -90, svgOrigin: "90 90" }, { rotation: 270, svgOrigin: "90 90", duration: 1.4, ease: "power1.inOut" }, ${w(17)} + i * 0.13));
      tl.fromTo(q(".tm .m-btn"), { scale: 1 }, { scale: 0.9, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, ${w(19)});
      tl.to(TM, { scale: 1.03, transformOrigin: "540px 1100px", duration: 1.0, ease: "sine.inOut" }, ${w(17)});
      salida(${r2(ESC["s02-comparte"] - 0.25)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(15), sfx: "pop", vol: 0.25 }, { t: w(17), sfx: "ping", vol: 0.2 }, { t: w(19), sfx: "click-soft", vol: 0.28 }, { t: r2(w(19) + 0.3), sfx: "ping", vol: 0.2 }],
});

// ================= s03 · ya tenía tus datos =================
desde("s03-datos");
const CHIPS = [["MIN", 300, 1010], ["#1", 780, 1010], ["TOP 5", 290, 1170], ["♫", 0, 0]].slice(0, 3);
escena("s03-datos", {
  css: `
    P .chip { position: absolute; padding: 12px 26px 14px; border-radius: 22px; background: ${CR}; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; box-shadow: 0 8px 0 rgba(3,6,12,0.45); }
    P .ficha { position: absolute; left: 190px; top: 1330px; width: 700px; height: 200px; border-radius: 36px; background: ${NAVY2}; border: 7px solid ${G}; opacity: 0; }
    P .ficha .fl { position: absolute; left: 40px; top: 36px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; }
    P .ficha i { position: absolute; left: 40px; height: 24px; border-radius: 12px; background: rgba(239,238,229,0.4); }`,
  html: `
      ${sombra("sh", 540, 1260, 640, 50)}
      <div class="auw">${auris()}</div>
      ${CHIPS.map(([t, x, y], k) => `<div class="chip c${k}" style="left:${x}px;top:${y}px">${t}</div>`).join("")}
      <div class="ficha"><div class="fl">TUS DATOS</div><i style="top:94px;width:520px"></i><i style="top:140px;width:380px"></i></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 900, 640, 790, 780, "g")}</svg>
      ${pill(1, 820, 600, "Lo que escuchaste", "g")}`,
  js: `
      const A = q(".auw");
      tl.fromTo(A, { scale: 0.55, y: 300, opacity: 0, transformOrigin: "50% 60%" }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5 }, 0);
      ondas(0.3, 3);
      tl.to(A, { y: -16, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.5);
      nota(1, ${w(22)});
      // "tus datos": salen fichas y caen a la ficha de abajo
      qa(".chip").forEach((c, i) => pop(c, ${w(24)} - 0.1 + i * 0.1, 0.28, 0.4));
      pop(".ficha", ${w(25)}, 0.3, 0.7);
      qa(".chip").forEach((c, i) => tl.to(c, { x: 540 - [300, 780, 290][i] - 70, y: 1420 - [1010, 1010, 1170][i], scale: 0.4, opacity: 0, duration: 0.4, ease: "power2.in" }, ${w(25)} + 0.2 + i * 0.07));
      tl.fromTo(q(".ficha"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(25) + 0.6)});
      sinNota(1, ${r2(ESC["s03-datos"] - 0.3)});
      tl.to(A, { y: -200, opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" }, ${r2(ESC["s03-datos"] - 0.3)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: w(22), sfx: "pop", vol: 0.22 }, { t: r2(w(24) - 0.1), sfx: "click-soft", vol: 0.25 }, { t: w(25), sfx: "ping", vol: 0.25 }],
});

// ================= s04 · minutos, canciones, artista =================
desde("s04-lista");
escena("s04-lista", {
  css: `
    P .tile { position: absolute; left: 80px; width: 920px; height: 300px; border-radius: 42px; overflow: hidden; opacity: 0; }
    P .t1 { top: 580px; background: ${G}; box-shadow: 0 14px 0 ${GD}; }
    P .t2 { top: 910px; background: ${CR}; box-shadow: 0 14px 0 ${CRD}; }
    P .t3 { top: 1240px; background: ${NAVY3}; box-shadow: 0 14px 0 #0d1628; border: 7px solid ${BORDE}; }
    P .tl { position: absolute; left: 50px; top: 40px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; }
    P .t1 .tl, P .t2 .tl { color: rgba(11,18,32,0.7); } P .t3 .tl { color: ${G}; }
    P .tn { position: absolute; left: 44px; top: 100px; font: 800 150px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .reloj { position: absolute; right: 50px; top: 60px; width: 180px; height: 180px; }
    P .cn { position: absolute; left: 50px; display: flex; align-items: center; gap: 22px; }
    P .cn b { font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; width: 30px; }
    P .cn i { display: block; height: 30px; border-radius: 15px; background: ${NAVY}; }
    P .disco { position: absolute; right: 50px; top: 60px; width: 180px; height: 180px; }
    P .t3 .av { position: absolute; left: 44px; top: 100px; width: 150px; height: 150px; }
    P .t3 .an { position: absolute; left: 226px; top: 116px; font: 800 84px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; }
    P .t3 .an2 { position: absolute; left: 230px; top: 216px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.65); }
    P .estrella { position: absolute; right: 60px; top: 74px; width: 150px; height: 150px; }`,
  html: `
      <div class="tile t1"><div class="tl">MINUTOS ESCUCHADOS</div><div class="tn">0</div>
        <svg class="reloj" viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="84" fill="${NAVY}"/><circle cx="90" cy="90" r="62" fill="${GD}"/><path class="aguja" d="M90 90 V44" stroke="${CR}" stroke-width="12" stroke-linecap="round"/><path d="M90 90 L120 106" stroke="${CR}" stroke-width="12" stroke-linecap="round"/><circle cx="90" cy="90" r="11" fill="${CR}"/></svg></div>
      <div class="tile t2"><div class="tl">CANCIONES</div>
        ${[0.86, 0.66, 0.5].map((f, i) => `<div class="cn cn${i}" style="top:${104 + i * 60}px"><b>${i + 1}</b><i style="width:${Math.round(f * 520)}px"></i></div>`).join("")}
        <svg class="disco" viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="86" fill="${NAVY}"/><circle cx="90" cy="90" r="60" fill="none" stroke="${NAVY3}" stroke-width="6"/><circle cx="90" cy="90" r="40" fill="none" stroke="${NAVY3}" stroke-width="6"/><circle cx="90" cy="90" r="24" fill="${G}"/><circle cx="90" cy="90" r="6" fill="${NAVY}"/></svg></div>
      <div class="tile t3"><div class="tl">ARTISTA</div><div class="av">${avatar(150, CR, BORDE)}</div><div class="an">Tu nº 1</div><div class="an2">EL QUE MÁS SONÓ</div>
        <svg class="estrella" viewBox="0 0 104 104" aria-hidden="true"><path d="M52 4 L64 38 L100 39 L71 61 L82 96 L52 75 L22 96 L33 61 L4 39 L40 38 Z" fill="${G}"/></svg></div>`,
  js: `
      const fmt = (v) => v.toLocaleString("es-UY");
      // cada ficha cae en la palabra que la nombra
      tl.fromTo(q(".t1"), { opacity: 0, y: 260, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.5)" }, 0);
      contar(".tn", 0, 18240, 0.12, 0.85, (v) => fmt(v));
      tl.fromTo(q(".aguja"), { rotation: 0, svgOrigin: "90 90" }, { rotation: 720, svgOrigin: "90 90", duration: 0.9, ease: "power2.out" }, 0.12);
      tl.fromTo(q(".t2"), { opacity: 0, y: 260, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.5)" }, ${w(28)});
      qa(".cn i").forEach((b, i) => tl.fromTo(b, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.35, ease: "power3.out" }, ${w(28)} + 0.2 + i * 0.1));
      tl.fromTo(q(".disco"), { rotation: 0 }, { rotation: 360, transformOrigin: "50% 50%", duration: 2.2, ease: "none" }, ${w(28)});
      tl.fromTo(q(".t3"), { opacity: 0, y: 260, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.5)" }, ${w(30)});
      pop(".estrella", ${w(32)}, 0.4, 0.2);
      tl.fromTo(q(".t3 .av"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${w(32)});
      tl.to(qa(".tile"), { y: "-=14", duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: 0.1 }, ${r2(w(32) + 0.3)});`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.25 }, { t: 0.12, sfx: "typing", vol: 0.16, max: 0.8 }, { t: w(28), sfx: "pop", vol: 0.25 }, { t: w(30), sfx: "pop", vol: 0.25 }, { t: w(32), sfx: "sparkle", vol: 0.22 }],
});

// ================= s05 · te los devolvió como un regalo =================
desde("s05-regalo");
escena("s05-regalo", {
  css: `
    P .tile { position: absolute; left: 80px; width: 920px; height: 300px; border-radius: 42px; }
    P .t1 { top: 580px; background: ${G}; } P .t2 { top: 910px; background: ${CR}; } P .t3 { top: 1240px; background: ${NAVY3}; border: 7px solid ${BORDE}; }
    P .tile i { position: absolute; left: 50px; top: 50px; width: 300px; height: 40px; border-radius: 20px; background: rgba(11,18,32,0.35); }
    P .t3 i { background: rgba(239,238,229,0.35); }
    P .flecha { position: absolute; left: 0; top: 0; }`,
  html: `
      ${regalo("rg")}
      <div class="tile t1"><i></i></div><div class="tile t2"><i></i></div><div class="tile t3"><i></i></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 860, 700, 730, 860, "g")}</svg>
      ${pill(1, 820, 640, "Para vos", "lleno")}`,
  js: `
      const R = q(".rg"), TP = q(".rg .tapa");
      gsap.set(TP, ${TAPA_ABIERTA});
      tl.fromTo(R, { y: 600, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      // las fichas se achican y entran en la caja
      qa(".tile").forEach((t, i) => tl.to(t, { x: 0, y: 1180 - [730, 1060, 1390][i], scale: 0.3, opacity: 0, transformOrigin: "50% 50%", duration: 0.32, ease: "power2.in" }, 0.04 + i * 0.09));
      // se cierra la tapa y salta el moño
      tl.to(TP, { y: 0, x: 0, rotation: 0, svgOrigin: "560 300", duration: 0.24, ease: "power3.in" }, ${r2(Math.min(w(36), 0.75))});
      tl.fromTo(R, { scaleY: 1 }, { scaleY: 0.93, transformOrigin: "50% 90%", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, ${r2(Math.min(w(36), 0.75) + 0.24)});
      tl.fromTo(q(".rg .mono"), { scale: 0.4, svgOrigin: "357 238" }, { scale: 1, svgOrigin: "357 238", duration: 0.4, ease: "back.out(3)" }, ${r2(Math.min(w(36), 0.75) + 0.2)});
      nota(1, ${r2(w(36) - 0.1)});
      tl.to(R, { y: -30, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, ${w(38)});`,
  sfx: [{ t: 0.12, sfx: "whoosh-short", vol: 0.2 }, { t: r2(Math.min(w(36), 0.75) + 0.24), sfx: "click", vol: 0.3 }, { t: w(38), sfx: "chime", vol: 0.25 }],
});

// ================= s06 · un regalo así se muestra =================
desde("s06-muestra");
const AMIGOS = [[150, 760, -10], [930, 820, 9], [140, 1340, 8], [940, 1400, -8]];
escena("s06-muestra", {
  css: `
    P .copia { position: absolute; left: 0; top: 0; width: 200px; height: 270px; border-radius: 26px; background: ${NAVY2}; border: 7px solid ${CR}; opacity: 0; }
    P .copia .ca { position: absolute; left: 16px; top: 16px; width: 154px; height: 130px; border-radius: 14px; background: ${G}; }
    P .copia i { position: absolute; left: 16px; height: 16px; border-radius: 8px; background: rgba(239,238,229,0.5); }
    P .corazon { position: absolute; width: 84px; height: 84px; opacity: 0; }
    P .dedo { position: absolute; left: 470px; top: 1540px; width: 90px; height: 90px; border-radius: 50%; background: rgba(239,238,229,0.85); border: 7px solid ${NAVY}; opacity: 0; }`,
  html: `
      ${celular("tm", pantallaMusica())}
      ${regalo("rg")}
      ${AMIGOS.map(([x, y, r], k) => `<div class="copia cp${k}" style="left:${x - 100}px;top:${y - 135}px;transform:rotate(${r}deg)"><div class="ca"></div><i style="top:166px;width:150px"></i><i style="top:196px;width:110px"></i><i style="top:226px;width:130px"></i></div>
      <svg class="corazon co${k}" style="left:${x + 40}px;top:${y - 175}px" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="42" fill="${G}"/><path d="M42 64 C 18 48, 14 32, 24 24 C 32 18, 40 22, 42 30 C 44 22, 52 18, 60 24 C 70 32, 66 48, 42 64 Z" fill="${NAVY}"/></svg>`).join("")}
      <div class="dedo"></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 780, 1730, 700, 1560, "g")}</svg>
      ${pill(1, 780, 1700, "Compartir", "lleno")}`,
  js: `
      const R = q(".rg"), TM = q(".tm");
      // el regalo se abre en el celular: la caja se vuelve la tapa del disco de la pantalla
      tl.to(q(".rg .tapa"), { y: -500, rotation: 30, svgOrigin: "560 300", opacity: 0, duration: 0.35, ease: "power2.in" }, 0);
      tl.to(R, { scale: 0.45, y: -260, transformOrigin: "50% 50%", duration: 0.3, ease: "power3.in" }, 0.0);
      tl.to(R, { opacity: 0, duration: 0.12 }, 0.2);
      tl.fromTo(TM, { scale: 0.7, opacity: 0, transformOrigin: "540px 1100px" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.3)" }, 0.22);
      // se muestra: el botón se aprieta y sale a los amigos
      tl.fromTo(q(".dedo"), { opacity: 0, x: 120, y: 120 }, { opacity: 1, x: -150, y: -10, duration: 0.4, ease: "power3.out" }, ${r2(w(43) - 0.45)});
      tl.fromTo(q(".tm .m-btn"), { scale: 1 }, { scale: 0.88, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, ${w(43)});
      tl.fromTo(q(".dedo"), { scale: 1 }, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, ${w(43)});
      nota(1, ${r2(w(43) - 0.3)});
      qa(".copia").forEach((c, i) => tl.fromTo(c, { opacity: 0, x: 540 - [150, 930, 140, 940][i], y: 1000 - [760, 820, 1340, 1400][i], scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, ${w(44)} + i * 0.1));
      qa(".corazon").forEach((c, i) => pop(c, ${w(44)} + 0.45 + i * 0.1, 0.3, 0.3));
      tl.to(TM, { scale: 0.96, transformOrigin: "540px 1100px", duration: 0.5, ease: "power2.out" }, ${w(44)});
      salida(${r2(ESC["s06-muestra"] - 0.25)});`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(43), sfx: "click", vol: 0.3 }, { t: w(44), sfx: "whoosh-short", vol: 0.22 }, { t: r2(w(44) + 0.45), sfx: "ping", vol: 0.22 }, { t: r2(w(44) + 0.65), sfx: "ping", vol: 0.2 }],
});

// ================= s07 · vos también sabés cosas =================
desde("s07-giro");
escena("s07-giro", {
  css: `
    P .tzw { position: absolute; left: 580px; top: 930px; width: 440px; height: 440px; }
    P .tzw .tz-svg { width: 440px; height: 440px; }
    P .mostrador { position: absolute; left: 40px; top: 1340px; width: 1000px; height: 56px; border-radius: 18px; background: ${NAVY3}; }
    P .mostrador2 { position: absolute; left: 70px; top: 1396px; width: 940px; height: 210px; background: ${NAVY2}; border-radius: 0 0 24px 24px; }
    P .mostrador2 i { position: absolute; top: 40px; width: 8px; height: 130px; background: rgba(239,238,229,0.12); }
    P .cli { position: absolute; left: 60px; top: 640px; width: 460px; height: 760px; }`,
  html: `
      <svg class="cli" viewBox="0 0 460 760" aria-hidden="true">
        <path d="M30 760 Q30 470 230 460 Q430 470 430 760 Z" fill="${CR}"/>
        <path d="M290 470 Q430 500 430 760 L330 760 Q350 600 290 470 Z" fill="rgba(11,18,32,0.12)"/>
        <path d="M190 470 L230 560 L270 470 Z" fill="${G}"/>
        <circle cx="230" cy="290" r="140" fill="${CR}"/>
        <path d="M100 250 Q120 140 230 140 Q350 140 362 260 Q320 196 230 200 Q150 200 100 250 Z" fill="${NAVY3}"/>
      </svg>
      <div class="mostrador"></div><div class="mostrador2"><i style="left:140px"></i><i style="left:460px"></i><i style="left:780px"></i></div>
      <div class="tzw">${taza()}</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 560, 700, 400, 820)}${lead(2, 800, 860, 800, 960, "g")}</svg>
      ${pill(1, 700, 660, "Cuántas veces vino")}
      ${pill(2, 790, 830, "Qué lleva siempre", "g")}`,
  js: `
      tl.fromTo(q(".cli"), { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(qa(".mostrador, .mostrador2"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".tzw"), { opacity: 0, y: -200, scale: 0.7, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.12);
      qa(".vap").forEach((v, i) => tl.fromTo(v, { y: 20, opacity: 0 }, { y: -20, opacity: 0.8, duration: 0.7, ease: "sine.out", yoyo: true, repeat: 1 }, 0.3 + i * 0.15));
      nota(1, ${r2(w(46) + 0.1)});
      nota(2, ${r2(w(48))});
      tl.to(q(".cli"), { y: -10, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${w(47)});
      salida(${r2(ESC["s07-giro"] - 0.22)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.15, sfx: "click-soft", vol: 0.25 }, { t: r2(w(46) + 0.1), sfx: "pop", vol: 0.25 }, { t: w(48), sfx: "pop", vol: 0.25 }],
});

// ================= s08 · con Scalerics Puntos, en diciembre =================
desde("s08-puntos");
escena("s08-puntos", {
  css: `
    P .cal { position: absolute; left: 700px; top: 560px; width: 320px; height: 330px; border-radius: 36px; background: ${CR}; overflow: hidden; box-shadow: 0 14px 0 rgba(3,6,12,0.5); opacity: 0; }
    P .cal .ch { position: absolute; left: 0; top: 0; width: 320px; height: 100px; background: ${G}; font: 800 52px/100px "Lexend", sans-serif; text-align: center; color: ${NAVY}; letter-spacing: 0.04em; }
    P .cal .cd { position: absolute; left: 0; right: 0; top: 110px; text-align: center; font: 800 170px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.04em; }
    P .anillo { position: absolute; top: -14px; width: 26px; height: 54px; border-radius: 13px; background: ${NAVY3}; }
    P .calw { position: absolute; left: 0; top: 0; }`,
  html: `
      ${celular("tp", pantallaPuntos())}
      <div class="cal"><div class="ch">DIC</div><div class="cd">15</div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 840, 640, 740, 720, "g")}</svg>
      ${pill(1, 760, 590, "Scalerics Puntos", "lleno")}`,
  js: `
      const TP = q(".tp");
      tl.fromTo(TP, { y: 700, rotation: 8, transformOrigin: "540px 1100px" }, { y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.2)" }, 0);
      tl.fromTo(q(".tp .p-card"), { rotationY: -70, transformPerspective: 1400, transformOrigin: "50% 50%" }, { rotationY: 0, duration: 0.6, ease: "power3.out" }, 0.3);
      nota(1, ${w(53)});
      qa(".p-sellos circle").forEach((c, i) => i < 6 && tl.fromTo(c, { scale: 0.3, svgOrigin: (25 + i * 50) + " 30" }, { scale: 1, svgOrigin: (25 + i * 50) + " 30", duration: 0.25, ease: "back.out(3)" }, ${w(53)} + i * 0.07));
      qa(".p-fila").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, ${w(54)} + i * 0.12));
      sinNota(1, ${r2(w(56) - 0.25)});
      // en diciembre: cae la hoja del calendario
      tl.fromTo(q(".cal"), { opacity: 0, y: -400, rotation: -20 }, { opacity: 1, y: 0, rotation: 6, duration: 0.45, ease: "back.out(1.5)" }, ${r2(w(56) - 0.1)});
      tl.to(TP, { x: -60, duration: 0.45, ease: "power2.out" }, ${r2(w(56) - 0.1)});
      tl.fromTo(q(".cal .cd"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(56) + 0.4)});`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(53), sfx: "pop", vol: 0.25 }, { t: r2(w(53) + 0.2), sfx: "ping", vol: 0.18 }, { t: r2(w(56) - 0.1), sfx: "whoosh-short", vol: 0.22 }, { t: r2(w(56) + 0.35), sfx: "click", vol: 0.28 }],
});

// ================= s09 · cada uno recibe su resumen =================
desde("s09-llega");
escena("s09-llega", {
  css: `
    P .lado .tel-pan > * { opacity: 0.3; }
    P .noti.chica { top: 1000px; width: 300px; height: 120px; border-radius: 28px; }
    P .noti.nc1 { left: -40px; } P .noti.nc2 { left: 820px; }
    P .noti.chica .ic { left: 20px; top: 20px; width: 80px; height: 80px; border-radius: 20px; }
    P .noti.chica .ic svg { left: 6px; top: 6px; transform: scale(0.85); }
    P .noti.chica .t1 { left: 116px; top: 38px; font-size: 36px; }
    P .noti.chica .t0, P .noti.chica .t2 { display: none; }`,
  html: `
      <div class="capa izq">${celular("lado", pantallaPuntos())}</div>
      <div class="capa der">${celular("lado", pantallaPuntos())}</div>
      <div class="capa cen">${celular("tp", pantallaPuntos())}</div>
      ${notiHtml("chica nc1", "", "Tu año", "")}
      ${notiHtml("chica nc2", "", "Tu año", "")}
      ${notiHtml("grande", "CAFÉ DE LA ESQUINA · AHORA", "Tu año con nosotros", "Tocá para ver tu resumen")}`,
  js: `
      const C = q(".cen .tp");
      gsap.set(C, { x: -60 });
      tl.fromTo(q(".izq"), { x: 0, scale: 1, opacity: 0 }, { x: -430, scale: 0.8, opacity: 1, transformOrigin: "540px 1100px", duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".der"), { x: 0, scale: 1, opacity: 0 }, { x: 430, scale: 0.8, opacity: 1, transformOrigin: "540px 1100px", duration: 0.45, ease: "power3.out" }, 0);
      tl.to(C, { x: 0, duration: 0.4, ease: "power2.out" }, 0);
      // a cada uno le llega el aviso
      tl.fromTo(q(".noti.grande"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, ${w(59)});
      qa(".noti.chica").forEach((n, i) => tl.fromTo(n, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, ${w(59)} + 0.15 + i * 0.1));
      tl.to(q(".noti.grande"), { y: 12, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(61))});
      // push-in al del medio
      tl.to(qa(".izq, .der"), { opacity: 0, duration: 0.25 }, ${r2(ESC["s09-llega"] - 0.35)});
      tl.to(qa(".noti"), { opacity: 0, y: -60, duration: 0.25 }, ${r2(ESC["s09-llega"] - 0.3)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: w(59), sfx: "notification", vol: 0.38 }, { t: r2(w(59) + 0.2), sfx: "ping", vol: 0.18 }, { t: r2(w(59) + 0.35), sfx: "ping", vol: 0.18 }],
});

// ================= s10 · viniste 31 veces =================
desde("s10-visitas");
escena("s10-visitas", {
  css: `P .r-b { opacity: 0; }`,
  html: `
      ${celular("tr", pantallaResumen())}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 150, 1240, 300, 1180, "g")}</svg>
      ${pill(1, 160, 1290, "Visitas", "g")}`,
  js: `
      const TR = q(".tr");
      tl.fromTo(q(".tr .tel-pan"), { opacity: 0.2 }, { opacity: 1, duration: 0.25 }, 0);
      tl.fromTo(TR, { scale: 0.94, transformOrigin: "540px 1000px" }, { scale: 1.06, duration: ${ESC["s10-visitas"]}, ease: "power1.inOut" }, 0);
      gsap.set(qa(".dt"), { opacity: 0 });
      contar(".r-num", 0, 31, ${w(63)}, ${r2(w(66) - w(63))}, (v) => String(v));
      qa(".dt").forEach((d, i) => tl.to(d, { opacity: 1, duration: 0.05 }, ${w(63)} + i * ${r2((w(66) - w(63)) / 31)}));
      tl.fromTo(q(".r-num"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, ${w(66)});
      nota(1, ${r2(w(66) - 0.2)});`,
  sfx: [{ t: w(63), sfx: "typing", vol: 0.16, max: 0.6 }, { t: w(66), sfx: "ping", vol: 0.3 }],
});

// ================= s11 · tu favorito: el cortado · y un premio =================
desde("s11-favorito");
escena("s11-favorito", {
  css: `
    P .cupon { position: absolute; left: 90px; top: 1320px; width: 900px; height: 250px; border-radius: 34px; background: ${G}; box-shadow: 0 14px 0 ${GD}; opacity: 0; }
    P .cupon .hu { position: absolute; top: 95px; width: 60px; height: 60px; border-radius: 50%; background: ${NAVY}; }
    P .cupon .div { position: absolute; left: 250px; top: 30px; height: 190px; border-left: 7px dashed rgba(11,18,32,0.4); }
    P .cupon svg { position: absolute; left: 50px; top: 45px; }
    P .cupon .c0 { position: absolute; left: 290px; top: 50px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: rgba(11,18,32,0.7); }
    P .cupon .c1 { position: absolute; left: 288px; top: 100px; font: 800 60px/1.05 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .ray { position: absolute; left: 0; top: 0; }`,
  html: `
      ${celular("tr", pantallaResumen())}
      <div class="cupon"><div class="hu" style="left:-30px"></div><div class="hu" style="right:-30px"></div>
        <svg width="160" height="160" viewBox="0 0 700 700" aria-hidden="true"><use href="#nada"/></svg>
        <div class="div"></div><div class="c0">PREMIO</div><div class="c1">Un cortado<br>de regalo</div></div>`,
  js: `
      const TR = q(".tr");
      // el cupón lleva un regalo chico (el mismo de la caja)
      q(".cupon svg").outerHTML = ${JSON.stringify(`<svg width="160" height="160" viewBox="80 140 560 520" aria-hidden="true" style="position:absolute;left:46px;top:45px">${REGALO.replace(/<svg[^>]*>|<\/svg>/g, "").replace(/fill="#5ce611"/g, `fill="${NAVY}"`).replace(/fill="#3fa60a"/g, `fill="${NAVY3}"`).replace(/fill="#9df26a"/g, `fill="${BORDE}"`).replace(/<g class="mono">[\s\S]*?<\/g>/, "").replace(/<ellipse class="rg-sh"[^>]*>/, "")}</svg>`)};
      gsap.set(TR, { scale: 1.06, transformOrigin: "540px 1000px" });
      // la pantalla cambia: sube el contador y entra el favorito
      tl.to(q(".tr .r-a"), { y: -300, opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
      tl.fromTo(q(".tr .r-b"), { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.12);
      tl.fromTo(q(".tr .f-art"), { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.12);
      tl.fromTo(q(".tr .f-tit span"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ${w(70)});
      tl.fromTo(q(".tr .f-tit span"), { backgroundColor: "rgba(92,230,17,0)", boxShadow: "inset 0 0 0 0px ${G}" }, { backgroundColor: "rgba(92,230,17,0.16)", boxShadow: "inset 0 0 0 6px ${G}", duration: 0.25 }, ${r2(w(70) + 0.15)});
      qa(".tr .vap").forEach((v, i) => tl.fromTo(v, { y: 16, opacity: 0 }, { y: -16, opacity: 0.8, duration: 0.6, ease: "sine.out", yoyo: true, repeat: 1 }, 0.5 + i * 0.15));
      // y un premio: sale el cupón
      tl.to(TR, { scale: 0.98, y: -60, duration: 0.4, ease: "power2.out" }, ${r2(w(71) - 0.1)});
      tl.fromTo(q(".cupon"), { opacity: 0, y: 260, scale: 0.7, rotation: -6, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, rotation: -3, duration: 0.45, ease: "back.out(1.6)" }, ${w(71)});
      tl.fromTo(q(".cupon svg"), { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 10, duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, ${r2(w(73) + 0.15)});
      tl.to(q(".cupon"), { y: -12, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(73) + 0.4)});`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: w(70), sfx: "pop", vol: 0.25 }, { t: w(71), sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(73), sfx: "chime", vol: 0.28 }],
});

// ================= s12 · CTA =================
desde("s12-cta");
escena("s12-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 590px; width: 922px; height: 470px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 606px; width: 922px; height: 470px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 390px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 266px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1130px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1272px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1460px; color: ${G}; font-size: 112px; }
    P .r-b { opacity: 0; }`,
  html: `
      <div class="capa telg">${celular("tr", pantallaResumen())}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(160)}<div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const TG = q(".telg");
      // el celular del resumen (con el cortado) gira y se vuelve la videollamada
      gsap.set(q(".tr .r-a"), { opacity: 0 }); gsap.set(q(".tr .r-b"), { opacity: 1 });
      tl.fromTo(TG, { scale: 0.98, y: -60, transformOrigin: "540px 1100px" }, { scale: 1.0, y: -40, duration: 0.6, ease: "sine.inOut" }, 0);
      tl.to(TG, { rotation: -90, scale: 0.87, y: -300, duration: 0.6, ease: "power3.inOut" }, 0.6);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.17);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.13);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.25);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(83) - 0.1)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(84) - 0.05)});
      caja(".sb", ${r2(w(84) + 0.2)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(86) - 0.05)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(86) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(86) + 0.4)});`,
  sfx: [{ t: 0.6, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.25, sfx: "pop", vol: 0.22 }, { t: r2(w(83) - 0.1), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(84) + 0.2), sfx: "click-soft", vol: 0.28 }, { t: r2(w(86) - 0.05), sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
