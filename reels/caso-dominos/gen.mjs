// Generador de escenas de reels/caso-dominos (correr desde la carpeta del reel, después
// `node armar.mjs`). Serie "Caso de éxito", estilo de reels/por-que-la-tarjeta: un objeto grande
// relleno por escena, que se transforma en el siguiente. Domino's se NOMBRA pero no se dibuja:
// caja de pizza genérica crema con detalles verdes, pizza, horno, moto, celular.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", EDGE = "#2c4268", CR = "#efeee5", CR2 = "#d9d7c9", CR3 = "#b4b2a3", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;

// caja de pizza en perspectiva oblicua (viewBox 640 x 400). Genérica: crema con franja verde.
const CAJA = (cls = "", extra = "") => `<svg class="caja ${cls}" viewBox="0 0 640 400" aria-hidden="true" data-layout-allow-overflow>
  <polygon points="40,170 510,170 510,262 40,262" fill="${CR2}"/>
  <rect x="40" y="198" width="470" height="24" fill="${G}"/>
  <rect x="40" y="170" width="470" height="8" fill="rgba(11,18,32,0.14)"/>
  <polygon points="510,170 620,40 620,132 510,262" fill="${CR3}"/>
  <polygon points="510,198 620,68 620,92 510,222" fill="${GD}"/>
  <polygon points="40,170 150,40 620,40 510,170" fill="${CR}"/>
  <polygon points="330,170 440,40 480,40 370,170" fill="rgba(255,255,255,0.45)"/>
  <g transform="matrix(1 0 -0.465 0.55 330 105)"><circle r="86" fill="${G}"/><polygon points="-44,-38 44,-38 0,52" fill="${NAVY}"/><circle cx="-14" cy="-16" r="9" fill="${CR}"/><circle cx="14" cy="-10" r="9" fill="${CR}"/><circle cx="0" cy="16" r="9" fill="${CR}"/></g>
  ${extra}
</svg>`;

// pizza vista de arriba (viewBox -320 -320 640 640)
const TOP = [[-120, -110, "p"], [90, -150, "p"], [150, 40, "p"], [-40, 120, "p"], [-160, 60, "o"], [20, -40, "o"], [60, 170, "o"], [-60, -190, "h"], [170, -60, "h"], [-150, -10, "h"], [110, 110, "h"], [-90, 190, "o"]];
const pizza = (cls = "") => `<svg class="pizza ${cls}" viewBox="-320 -320 640 640" aria-hidden="true" data-layout-allow-overflow>
  <circle r="302" fill="#d9ab62"/><circle r="302" fill="none" stroke="#c18d45" stroke-width="16"/>
  <circle r="258" fill="#b85a4e"/><circle r="236" fill="#f1e2b4"/>
  <path d="M-236 0 H236 M0 -236 V236 M-167 -167 L167 167 M167 -167 L-167 167" stroke="rgba(11,18,32,0.12)" stroke-width="6"/>
  ${TOP.map(([x, y, k], i) => `<g class="tp tp${i}" transform="translate(${x} ${y})">${k === "p" ? `<circle r="36" fill="#b85a4e"/><circle r="36" fill="none" stroke="#9c4a40" stroke-width="6"/>` : k === "o" ? `<circle r="19" fill="none" stroke="${NAVY}" stroke-width="11"/>` : `<ellipse rx="34" ry="17" fill="${G}" transform="rotate(${(i * 47) % 180})"/>`}</g>`).join("")}
</svg>`;

// horno (viewBox 0 0 760 560): cuerpo + marco con vidrio (en dos capas para meter la pizza en el medio)
const HORNO_CUERPO = `<svg class="horno-c" viewBox="0 0 760 560" aria-hidden="true">
  <rect x="0" y="20" width="760" height="540" rx="44" fill="${NAVY}" stroke="${EDGE}" stroke-width="10"/>
  <rect x="30" y="50" width="700" height="100" rx="22" fill="${NAVY3}"/>
  <circle cx="96" cy="100" r="28" fill="${CR}"/><path d="M96 100 L96 78" stroke="${NAVY}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="180" cy="100" r="28" fill="${CR}"/><path d="M180 100 L198 86" stroke="${NAVY}" stroke-width="8" stroke-linecap="round"/>
  <circle class="led" cx="262" cy="100" r="14" fill="${G}"/>
  <text x="690" y="114" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="40" letter-spacing="6" fill="${CR}">HORNO</text>
  <rect x="60" y="180" width="640" height="350" rx="30" fill="${NAVY3}"/>
  <rect x="110" y="215" width="540" height="240" rx="22" fill="#0a111e"/>
</svg>`;
const HORNO_MARCO = `<svg class="horno-m" viewBox="0 0 760 560" aria-hidden="true">
  <rect class="vidrio" x="110" y="215" width="540" height="240" rx="22" fill="${CR}" opacity="0"/>
  <polygon points="420,215 480,215 380,455 320,455" fill="rgba(255,255,255,0.12)"/>
  <rect x="110" y="215" width="540" height="240" rx="22" fill="none" stroke="${CR}" stroke-width="10"/>
  <rect x="250" y="480" width="260" height="22" rx="11" fill="${CR}"/>
</svg>`;

// moto de delivery de costado (viewBox 0 0 860 520), con la caja atrás
const MOTO = `<svg class="moto-s" viewBox="0 0 860 520" aria-hidden="true">
  <path class="vel" d="M-40 250 H-200" stroke="${CR}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
  <path class="vel" d="M-20 320 H-260" stroke="${CR}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
  <path class="vel" d="M-60 390 H-180" stroke="${CR}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
  <circle cx="190" cy="420" r="88" fill="#070c16"/><circle cx="190" cy="420" r="36" fill="${CR}"/>
  <circle cx="660" cy="420" r="88" fill="#070c16"/><circle cx="660" cy="420" r="36" fill="${CR}"/>
  <path d="M100 330 Q110 250 230 250 L440 250 L460 340 L100 340 Z" fill="${G}"/>
  <path d="M100 340 L460 340 L450 370 L120 370 Z" fill="${GD}"/>
  <rect x="440" y="320" width="170" height="34" rx="12" fill="${GD}"/>
  <path d="M570 350 L612 150 L664 150 L672 350 Z" fill="${G}"/>
  <path d="M612 350 Q680 300 748 372" fill="none" stroke="${G}" stroke-width="28" stroke-linecap="round"/>
  <circle cx="680" cy="178" r="22" fill="${CR}"/>
  <path d="M624 150 L596 104 M596 104 H560" stroke="${CR}" stroke-width="16" stroke-linecap="round"/>
  <rect x="300" y="222" width="150" height="36" rx="18" fill="${NAVY}"/>
  <g><rect x="34" y="66" width="270" height="170" rx="16" fill="${CR}"/><rect x="34" y="66" width="270" height="22" rx="10" fill="${CR2}"/><rect x="34" y="140" width="270" height="28" fill="${G}"/></g>
  <path d="M400 240 L452 130" stroke="${CR2}" stroke-width="64" stroke-linecap="round"/>
  <path d="M440 150 L580 112" stroke="${CR2}" stroke-width="30" stroke-linecap="round"/>
  <path d="M400 250 L500 330 L548 330" fill="none" stroke="${CR3}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="468" cy="74" r="58" fill="${CR}"/><path d="M478 52 Q530 56 524 92 L486 92 Z" fill="${NAVY}"/>
</svg>`;

// iconos de los 4 pasos (viewBox 0 0 90 90, trazo navy)
const IC = [
  `<path d="M18 24 L72 24 L45 76 Z" fill="none" stroke="${NAVY}" stroke-width="7" stroke-linejoin="round"/><circle cx="38" cy="36" r="5" fill="${NAVY}"/><circle cx="52" cy="40" r="5" fill="${NAVY}"/><circle cx="45" cy="54" r="5" fill="${NAVY}"/>`,
  `<rect x="12" y="20" width="66" height="52" rx="9" fill="none" stroke="${NAVY}" stroke-width="7"/><rect x="22" y="38" width="46" height="24" rx="5" fill="${NAVY}"/><circle cx="26" cy="29" r="3.5" fill="${NAVY}"/><circle cx="38" cy="29" r="3.5" fill="${NAVY}"/>`,
  `<path d="M20 47 L37 63 L70 28" fill="none" stroke="${NAVY}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  `<circle cx="24" cy="64" r="11" fill="none" stroke="${NAVY}" stroke-width="7"/><circle cx="68" cy="64" r="11" fill="none" stroke="${NAVY}" stroke-width="7"/><path d="M30 62 L46 62 L56 38 L66 38 M60 40 L70 62" fill="none" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="10" y="30" width="28" height="22" rx="4" fill="${NAVY}"/>`,
];
const icono = (i, s) => `<svg width="${s}" height="${s}" viewBox="0 0 90 90" aria-hidden="true">${IC[i]}</svg>`;
const LB = ["Preparando", "Al horno", "Control", "En camino"];

// la barrita (tarjeta 900 x 440)
const NX = [130, 343, 557, 770];
const tracker = (cls = "") => `
<div class="trk ${cls}">
  <div class="trk-h">Tu pedido</div><div class="trk-s"><b></b>EN VIVO</div>
  <div class="trk-track"></div><div class="trk-fill"></div>
  ${NX.map((x, i) => `<div class="nd nd${i}" style="left:${x - 66}px"><div class="nd-on"></div>${icono(i, 84)}</div><div class="lb lb${i}" style="left:${x - 110}px">${LB[i]}</div>`).join("")}
  <div class="mk" style="left:${NX[0] - 60}px">${CAJA("mk-caja")}</div>
</div>`;
// la barrita chica, dentro del chat (408 x 214, coordenadas de la pantalla del celular)
const MX = [60, 156, 252, 348];
const miniTracker = (cls = "") => `
<div class="mt ${cls}">
  <div class="mt-h">Tu pedido</div><div class="mt-s">${tick(13)}</div>
  <div class="mt-track"></div><div class="mt-fill"></div>
  ${MX.map((x, i) => `<div class="mn mn${i}" style="left:${x - 38}px"><div class="mn-on"></div>${icono(i, 50)}</div>`).join("")}
</div>`;

// celular vertical (centro 540,1040; 480 x 960), agrandado 1.25 desde el JS
const celular = (pantalla = "") => `
<div class="tel-lado"></div>
<div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>`;
const avatarLocal = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="40" fill="${G}"/><path d="M18 36 L24 22 H56 L62 36 Z" fill="${NAVY}"/><rect x="22" y="36" width="36" height="24" fill="${NAVY}"/><rect x="35" y="44" width="10" height="16" fill="${G}"/></svg>`;
const chatHead = `<div class="ch-h"><div class="ch-av">${avatarLocal(76)}</div><div class="ch-n">Tu local</div><div class="ch-e">en línea</div></div>`;
const burbuja = (cls, top, txt, de = "in", tag = "") => `<div class="bb ${de} ${cls}" style="top:${top}px">${tag ? `<span class="bb-tag">${tag}</span>` : ""}${txt}<span class="bb-ok">✓✓</span></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.5); }
    ${P} svg.caja, ${P} svg.pizza, ${P} svg.moto-s, ${P} svg.horno-c, ${P} svg.horno-m { position: absolute; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 42px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .pill.preg { padding: 10px 30px 14px; font-size: 110px; font-weight: 800; border-color: ${RED}; color: ${RED}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .trk { position: absolute; width: 900px; height: 440px; border-radius: 44px; background: ${CR}; box-shadow: 0 18px 0 rgba(3,6,12,0.45); }
    ${P} .trk-h { position: absolute; left: 50px; top: 36px; font: 700 48px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .trk-s { position: absolute; right: 50px; top: 44px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${GD}; }
    ${P} .trk-s b { display: inline-block; width: 18px; height: 18px; border-radius: 50%; background: ${G}; margin-right: 12px; }
    ${P} .trk-track, ${P} .trk-fill { position: absolute; left: ${NX[0]}px; top: 248px; width: ${NX[3] - NX[0]}px; height: 16px; border-radius: 8px; background: rgba(11,18,32,0.16); }
    ${P} .trk-fill { background: ${G}; }
    ${P} .nd { position: absolute; top: 190px; width: 132px; height: 132px; border-radius: 50%; background: #cfcdbf; border: 8px solid ${CR}; }
    ${P} .nd-on { position: absolute; inset: -8px; border-radius: 50%; background: ${G}; border: 8px solid ${CR}; opacity: 0; }
    ${P} .nd svg { position: absolute; left: 16px; top: 16px; }
    ${P} .lb { position: absolute; top: 346px; width: 220px; text-align: center; font: 600 34px/1 "Lexend", sans-serif; color: ${NAVY}; opacity: 0.4; }
    ${P} .mk { position: absolute; top: 96px; width: 120px; height: 75px; }
    ${P} .mk svg.caja { left: 0; top: 0; width: 120px; height: 75px; }
    ${P} .mt { position: absolute; left: 22px; width: 408px; height: 214px; border-radius: 30px; background: ${CR}; }
    ${P} .mt-h { position: absolute; left: 28px; top: 24px; font: 700 32px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .mt-s { position: absolute; right: 24px; top: 18px; opacity: 0; }
    ${P} .mt-track, ${P} .mt-fill { position: absolute; left: ${MX[0]}px; top: 133px; width: ${MX[3] - MX[0]}px; height: 12px; border-radius: 6px; background: rgba(11,18,32,0.16); }
    ${P} .mt-fill { background: ${G}; }
    ${P} .mn { position: absolute; top: 101px; width: 76px; height: 76px; border-radius: 50%; background: #cfcdbf; border: 6px solid ${CR}; }
    ${P} .mn-on { position: absolute; inset: -6px; border-radius: 50%; background: ${G}; border: 6px solid ${CR}; opacity: 0; }
    ${P} .mn svg { position: absolute; left: 7px; top: 7px; }
    ${P} .tel-lado { position: absolute; left: 316px; top: 574px; width: 480px; height: 960px; border-radius: 72px; background: #a9a798; }
    ${P} .tel { position: absolute; left: 300px; top: 560px; width: 480px; height: 960px; border-radius: 72px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 58px; background: #111c30; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 180px; top: 26px; width: 120px; height: 28px; border-radius: 14px; background: ${CR}; }
    ${P} .ch-h { position: absolute; left: 0; top: 0; width: 452px; height: 150px; background: ${NAVY3}; }
    ${P} .ch-av { position: absolute; left: 24px; top: 58px; width: 76px; height: 76px; }
    ${P} .ch-n { position: absolute; left: 118px; top: 66px; font: 700 34px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .ch-e { position: absolute; left: 118px; top: 108px; font: 500 24px/1 "Lexend", sans-serif; color: ${G}; }
    ${P} .bb { position: absolute; max-width: 360px; padding: 18px 24px 20px; border-radius: 28px; font: 600 32px/1.2 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }
    ${P} .bb.in { left: 22px; background: ${CR}; border-top-left-radius: 8px; }
    ${P} .bb.out { right: 22px; background: ${G}; border-top-right-radius: 8px; }
    ${P} .bb-tag { display: block; margin-bottom: 8px; font: 500 24px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${GD}; }
    ${P} .bb-ok { margin-left: 10px; font: 700 22px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.45); }
    ${P} .bb.in .bb-ok { color: ${GD}; }
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
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.3); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.18 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "steps(" + (b - a) + ")", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      // la barrita grande
      const NXJ = [0, 213, 427, 640];
      if (q(".trk-fill")) gsap.set(q(".trk-fill"), { scaleX: 0, transformOrigin: "0% 50%" });
      const pasoSet = (i) => { gsap.set(q(".trk-fill"), { scaleX: i / 3 }); for (let k = 0; k <= i; k++) { gsap.set(q(".nd" + k + " .nd-on"), { opacity: 1 }); gsap.set(q(".lb" + k), { opacity: 1 }); } gsap.set(q(".mk"), { x: NXJ[i] }); };
      const paso = (i, t) => {
        tl.to(q(".trk-fill"), { scaleX: i / 3, duration: 0.35, ease: "power2.inOut" }, t);
        tl.to(q(".mk"), { x: NXJ[i], duration: 0.4, ease: "power2.inOut" }, t);
        tl.to(q(".nd" + i + " .nd-on"), { opacity: 1, duration: 0.15 }, t + 0.22);
        late(".nd" + i, t + 0.22, 1.16);
        tl.to(q(".lb" + i), { opacity: 1, duration: 0.2 }, t + 0.22);
      };
      // la barrita chica
      const MXJ = [0, 96, 192, 288];
      if (q(".mt-fill")) gsap.set(q(".mt-fill"), { scaleX: 0, transformOrigin: "0% 50%" });
      const miniSet = (i) => { gsap.set(q(".mt-fill"), { scaleX: i / 3 }); for (let k = 0; k <= i; k++) gsap.set(q(".mn" + k + " .mn-on"), { opacity: 1 }); if (i === 3) gsap.set(q(".mt-s"), { opacity: 1 }); };
      const mini = (i, t) => {
        tl.to(q(".mt-fill"), { scaleX: i / 3, duration: 0.35, ease: "power2.inOut" }, t);
        tl.to(q(".mn" + i + " .mn-on"), { opacity: 1, duration: 0.15 }, t + 0.22);
        late(".mn" + i, t + 0.22, 1.2);
        if (i === 3) pop(".mt-s", t + 0.35, 0.3, 0.3);
      };
      const telw = q(".telw");
      if (telw) gsap.set(telw, { scale: 1.25, y: 20, transformOrigin: "540px 1040px" });
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
// cuadro 0: la pregunta entera en grande + la caja gigante con la barrita adelante
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 800 112px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .v { color: ${G}; }
    P .tit .s1 { font-size: 92px; }
    P svg.caja { left: 150px; top: 690px; width: 800px; height: 500px; }
    P .trk { left: 90px; top: 1230px; }`,
  html: `
      ${sombra("sh", 550, 1072, 600, 46)}
      ${CAJA("c0")}
      ${tracker()}
      <div class="tit"><div class="s1">¿Por qué Domino's</div><div>te muestra</div><div>en qué <span class="v">paso</span></div><div>está tu pizza?</div></div>`,
  js: `
      const C = q(".c0"), T = q(".trk");
      gsap.set(T, { scale: 0.86, transformOrigin: "50% 0%" });
      pasoSet(0);
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(C, { y: 30, scale: 0.95, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.to(C, { y: -22, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.6);
      tl.to(q(".sh"), { scale: 0.9, opacity: 0.75, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.6);
      paso(1, 0.75); paso(2, 1.45); paso(3, 2.05);
      late(".tit .v", 1.5, 1.1);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, 2.5);
      tl.to(T, { opacity: 0, y: 60, duration: 0.3, ease: "power2.in" }, 2.5);`,
  sfx: [{ t: 0.75, sfx: "click-soft", vol: 0.25 }, { t: 1.45, sfx: "click-soft", vol: 0.25 }, { t: 2.05, sfx: "ping", vol: 0.25 }],
});

// ================= s02 · a ciegas =================
escena("s02-ciegas", {
  css: `
    P svg.caja { left: 150px; top: 690px; width: 800px; height: 500px; }
    P .oscuro { position: absolute; inset: 0; background: rgba(8,13,24,0.72); opacity: 0; }`,
  html: `
      ${sombra("sh", 550, 1072, 600, 46)}
      ${CAJA("c0")}
      <div class="oscuro"></div>
      ${pill("q0", 230, 760, "?", "preg")}${pill("q1", 860, 700, "?", "preg")}${pill("q2", 540, 600, "?", "preg")}
      ${pill(1, 540, 1420, "Sin saber nada", "rl")}`,
  js: `
      const C = q(".c0");
      // la caja baja al centro y se queda quieta: no sabés nada de ella
      tl.to(C, { y: 140, duration: 0.6, ease: "power2.inOut" }, 0);
      tl.to(q(".sh"), { y: 140, duration: 0.6, ease: "power2.inOut" }, 0);
      late(".c0", 1.06, 1.06);
      pop(".nq2", 1.46); pop(".nq0", 1.58); pop(".nq1", 1.7);
      tl.to(q(".oscuro"), { opacity: 1, duration: 0.3 }, 1.86);
      nota(1, 1.9);
      tl.to(qa(".preg"), { y: -12, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.9);`,
  sfx: [{ t: 1.46, sfx: "pop", vol: 0.22 }, { t: 1.58, sfx: "pop", vol: 0.22 }, { t: 1.7, sfx: "pop", vol: 0.22 }, { t: 1.9, sfx: "glitch-1", vol: 0.14, max: 0.4 }],
});

// ================= s03 · llamabas =================
escena("s03-llamas", {
  css: `
    P .ll-m { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: rgba(239,238,229,0.65); }
    P .ll-n { position: absolute; left: 0; right: 0; top: 168px; text-align: center; font: 800 58px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ll-av { position: absolute; left: 116px; top: 290px; width: 220px; height: 220px; border-radius: 50%; background: ${NAVY3}; border: 8px solid ${EDGE}; }
    P .ll-av svg { position: absolute; left: 50px; top: 50px; }
    P .ll-c { position: absolute; left: 0; right: 0; top: 580px; text-align: center; font: 700 40px/1 "Lexend", sans-serif; color: ${RED}; }
    P .ll-btn { position: absolute; left: 170px; top: 760px; width: 112px; height: 112px; border-radius: 50%; background: ${RED}; }
    P .ll-btn svg { position: absolute; left: 24px; top: 30px; }
    P .onda { fill: none; stroke: ${CR}; stroke-width: 10; stroke-linecap: round; opacity: 0; }
    P .globo { position: absolute; left: 80px; top: 1390px; width: 920px; height: 190px; border-radius: 48px; background: #fff; box-shadow: 0 16px 0 rgba(3,6,12,0.45); opacity: 0; }
    P .globo::before { content: ""; position: absolute; left: 600px; top: -40px; border-left: 34px solid transparent; border-right: 34px solid transparent; border-bottom: 44px solid #fff; }
    P .globo span { position: absolute; left: 0; right: 0; top: 56px; text-align: center; font: 800 72px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }`,
  html: `
      <div class="capa telw">${celular(`
        <div class="ll-m">LLAMANDO…</div><div class="ll-n">Pizzería</div>
        <div class="ll-av">${icono(0, 104).replaceAll(NAVY, CR)}</div>
        <div class="ll-c">Llamada 1</div>
        <div class="ll-btn"><svg width="64" height="52" viewBox="0 0 64 52"><path d="M4 30 Q32 6 60 30 L52 42 L40 34 L40 24 Q32 20 24 24 L24 34 L12 42 Z" fill="#fff"/></svg></div>`)}</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="onda o1" d="M200 820 Q160 980 200 1140"/><path class="onda o2" d="M140 760 Q80 980 140 1200"/>
        <path class="onda o3" d="M880 820 Q920 980 880 1140"/><path class="onda o4" d="M940 760 Q1000 980 940 1200"/>
      </svg>
      <div class="globo"><span>¿Dónde está mi pedido?</span></div>`,
  js: `
      const W = q(".telw");
      tl.fromTo(W, { opacity: 0, y: 260, scale: 0.9 }, { opacity: 1, y: 20, scale: 1.25, duration: 0.5, ease: "power3.out" }, 0);
      // suena y suena
      [0.2, 0.9, 1.6, 2.3].forEach((t) => {
        tl.fromTo(qa(".o1, .o3"), { opacity: 0 }, { opacity: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: "none", immediateRender: false }, t);
        tl.fromTo(qa(".o2, .o4"), { opacity: 0 }, { opacity: 0.6, duration: 0.14, yoyo: true, repeat: 1, ease: "none", immediateRender: false }, t + 0.12);
        tl.fromTo(W, { rotation: 0 }, { rotation: 2.4, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
      });
      contar(".ll-c", 1, 3, 0.6, 1.4, (v) => "Llamada " + v);
      tl.fromTo(q(".ll-c"), { scale: 1 }, { scale: 1.18, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, 1.1);
      tl.fromTo(q(".globo"), { opacity: 0, y: 60, scale: 0.85, transformOrigin: "66% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 1.32);
      late(".globo span", 2.1, 1.06);
      // del otro lado: el celular gira
      tl.to(q(".globo"), { opacity: 0, y: 40, duration: 0.2, ease: "power2.in" }, 2.62);
      tl.to(W, { rotationY: 90, scale: 1.4, duration: 0.3, ease: "power2.in" }, 2.62);`,
  sfx: [{ t: 0.2, sfx: "notification", vol: 0.3 }, { t: 1.6, sfx: "notification", vol: 0.28 }, { t: 1.32, sfx: "pop", vol: 0.28 }, { t: 2.62, sfx: "whoosh-short", vol: 0.2 }],
});

// ================= s04 · del otro lado, la cocina =================
escena("s04-cocina", {
  css: `
    P .pala { position: absolute; left: 200px; top: 790px; width: 680px; height: 680px; border-radius: 50%; background: ${NAVY3}; border: 10px solid ${EDGE}; }
    P .mango { position: absolute; left: 495px; top: 1440px; width: 90px; height: 210px; border-radius: 0 0 30px 30px; background: ${NAVY3}; border: 10px solid ${EDGE}; border-top: none; }
    P svg.pizza { left: 220px; top: 810px; width: 640px; height: 640px; }
    P .pausa { position: absolute; inset: 0; border-radius: 50%; }
    P .tlf { position: absolute; left: 760px; top: 560px; width: 220px; height: 340px; }
    P .tlf-b { position: absolute; inset: 0; border-radius: 40px; background: ${CR}; box-shadow: 14px 14px 0 #a9a798; }
    P .tlf-p { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 28px; background: #111c30; }
    P .tlf-i { position: absolute; left: 62px; top: 120px; width: 96px; height: 96px; border-radius: 50%; background: ${G}; }
    P .tlf-i svg { position: absolute; left: 18px; top: 24px; }
    P .tlf-t { position: absolute; left: 0; right: 0; top: 240px; text-align: center; font: 700 30px/1 "Lexend", sans-serif; color: ${CR}; }
    P .onda { fill: none; stroke: ${G}; stroke-width: 10; stroke-linecap: round; opacity: 0; }
    P .velo { position: absolute; left: 200px; top: 790px; width: 680px; height: 680px; border-radius: 50%; background: rgba(8,13,24,0.55); opacity: 0; }`,
  html: `
      <div class="capa coc">
        <div class="pala"></div><div class="mango"></div>
        ${pizza("pz")}
        <div class="velo"></div>
      </div>
      <div class="tlf"><div class="tlf-b"></div><div class="tlf-p"></div><div class="tlf-i"><svg width="60" height="50" viewBox="0 0 64 52"><path d="M4 30 Q32 6 60 30 L52 42 L40 34 L40 24 Q32 20 24 24 L24 34 L12 42 Z" fill="${NAVY}"/></svg></div><div class="tlf-t">Cliente</div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="onda o1" d="M730 600 Q700 730 730 860"/><path class="onda o2" d="M690 560 Q645 730 690 900"/></svg>
      ${pill(1, 300, 640, "Cocinando", "lleno")}
      ${pill(2, 300, 640, "En pausa", "rl")}
      ${pill(3, 540, 1600, "Deja de cocinar", "r")}`,
  js: `
      // el celular que giraba vuelve a aparecer del otro lado: la cocina
      tl.fromTo(q(".coc"), { opacity: 0, scale: 1.25, transformOrigin: "540px 1130px" }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      gsap.set(qa(".tp"), { opacity: 0 });
      qa(".tp").forEach((el, i) => { if (i < 7) pop(el, 0.25 + i * 0.1, 0.26, 0.2); });
      pop(".n1", 0.3);
      tl.fromTo(q(".pz"), { rotation: 0 }, { rotation: 14, duration: 1.1, ease: "power1.inOut" }, 0.2);
      // suena el teléfono
      tl.fromTo(q(".tlf"), { opacity: 0, x: 120, rotation: 10 }, { opacity: 1, x: 0, rotation: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.75);
      [0.95, 1.55, 2.15].forEach((t) => {
        tl.fromTo(q(".tlf"), { rotation: 0 }, { rotation: 5, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
        tl.fromTo(qa(".onda"), { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.08, ease: "none", immediateRender: false }, t);
      });
      // deja de cocinar
      fuera(".n1", 1.1, 0.12); pop(".n2", 1.16);
      tl.to(q(".velo"), { opacity: 1, duration: 0.35 }, 1.58);
      pop(".n3", 1.6);
      // para atender: el teléfono se agranda al centro
      fuera(".n2, .n3", 2.3);
      tl.to(q(".coc"), { scale: 0.9, opacity: 0.45, transformOrigin: "540px 1130px", duration: 0.4, ease: "power2.inOut" }, 2.3);
      tl.to(q(".tlf"), { x: -430, y: 380, scale: 1.7, rotation: 0, duration: 0.45, ease: "power3.inOut" }, 2.38);
      salida(3.05);`,
  sfx: [{ t: 0.25, sfx: "pop", vol: 0.18 }, { t: 0.55, sfx: "pop", vol: 0.18 }, { t: 0.95, sfx: "notification", vol: 0.28 }, { t: 1.55, sfx: "notification", vol: 0.24 }, { t: 1.6, sfx: "click", vol: 0.25 }, { t: 2.38, sfx: "whoosh-short", vol: 0.2 }],
});

// ================= s05 · la barrita =================
escena("s05-barrita", {
  css: `
    P svg.caja { left: 220px; top: 560px; width: 640px; height: 400px; }
    P .trk { left: 90px; top: 1020px; }
    P .tag { position: absolute; left: 0; right: 0; top: 1520px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: ${G}; opacity: 0; }`,
  html: `
      ${sombra("sh", 545, 956, 560, 50)}
      ${CAJA("grande")}
      ${tracker()}
      ${selbox("sb", 138, 1196, 804, 160)}
      <div class="tag">DOMINO'S · HACE UNOS AÑOS</div>
      ${pill(1, 540, 1620, "Cada paso, a la vista", "lleno")}`,
  js: `
      const C = q(".grande"), T = q(".trk");
      tl.fromTo(C, { opacity: 0, y: -260, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.1);
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.58);
      // empezó a mostrarte: la tarjeta sale de la caja
      gsap.set(qa(".nd, .lb, .mk, .trk-track"), { opacity: 0 });
      tl.fromTo(T, { opacity: 0, scale: 0.4, y: -300, transformOrigin: "50% 0%" }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.3)" }, 1.08);
      tl.to(q(".trk-track"), { opacity: 1, duration: 0.2 }, 1.4);
      // cada paso
      qa(".nd").forEach((n, i) => { pop(n, 1.58 + i * 0.16, 0.3, 0.3); tl.to(q(".lb" + i), { opacity: 0.4, duration: 0.2 }, 1.66 + i * 0.16); });
      caja(".sb", 2.28);
      // del pedido: la caja grande se mete en el primer paso
      tl.to(q(".sb"), { opacity: 0, duration: 0.2 }, 2.75);
      tl.to(C, { x: -320, y: 450, scale: 0.19, duration: 0.5, ease: "power3.inOut" }, 2.78);
      tl.to(q(".sh"), { opacity: 0, duration: 0.2 }, 2.78);
      tl.set(q(".mk"), { opacity: 1 }, 3.26);
      tl.set(C, { opacity: 0 }, 3.26);
      // en una barrita
      paso(0, 3.3);
      pop(".n1", 3.4);
      // la tarjeta sube para dejar lugar a cada paso (queda como empieza s06)
      fuera(".n1, .tag", 3.85, 0.18);
      tl.to(T, { y: -460, duration: 0.4, ease: "power3.inOut" }, 3.85);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.5, sfx: "pop", vol: 0.2 }, { t: 1.08, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 1.58, sfx: "pop", vol: 0.18 }, { t: 1.74, sfx: "pop", vol: 0.18 }, { t: 1.9, sfx: "pop", vol: 0.18 }, { t: 2.06, sfx: "pop", vol: 0.18 }, { t: 2.28, sfx: "click-soft", vol: 0.25 }, { t: 3.3, sfx: "ping", vol: 0.25 }],
});

// ================= s06 · los cuatro pasos =================
escena("s06-pasos", {
  css: `
    P .trk { left: 90px; top: 560px; }
    P svg.pizza { left: 250px; top: 1050px; width: 580px; height: 580px; }
    P svg.horno-c, P svg.horno-m { left: 160px; top: 1060px; width: 760px; height: 560px; }
    P .calor { fill: none; stroke: ${G}; stroke-width: 10; stroke-linecap: round; }
    P svg.caja.cc { left: 170px; top: 1110px; width: 740px; height: 462px; }
    P .sello { position: absolute; left: 600px; top: 1090px; width: 200px; height: 200px; opacity: 0; }
    P svg.moto-s { left: 140px; top: 1100px; width: 860px; height: 520px; }`,
  html: `
      ${tracker()}
      ${sombra("sh", 540, 1620, 640, 50)}
      <div class="capa hz">${HORNO_CUERPO}</div>
      ${pizza("pz")}
      <div class="capa hz2">${HORNO_MARCO}
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="calor c1" d="M400 1040 q-20 -30 0 -60 q20 -30 0 -60"/><path class="calor c2" d="M540 1040 q-20 -30 0 -60 q20 -30 0 -60"/><path class="calor c3" d="M680 1040 q-20 -30 0 -60 q20 -30 0 -60"/></svg></div>
      ${CAJA("cc")}
      <div class="sello">${tick(100)}</div>
      ${selbox("sb", 190, 1100, 720, 420)}
      <div class="capa mt-moto">${MOTO}</div>`,
  js: `
      gsap.set(q(".trk"), { y: 0 });
      pasoSet(0);
      // lo están preparando
      tl.fromTo(q(".pz"), { scale: 0.5, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
      gsap.set(qa(".tp"), { opacity: 0 });
      qa(".tp").forEach((el, i) => pop(el, 0.3 + i * 0.05, 0.22, 0.2));
      // al horno: aparece el horno y la pizza entra por la puerta
      gsap.set(qa(".hz, .hz2"), { opacity: 0 });
      tl.fromTo(q(".hz"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 1.0);
      tl.to(q(".pz"), { scaleX: 0.66, scaleY: 0.28, y: 70, rotation: 0, duration: 0.4, ease: "power3.inOut" }, 1.12);
      tl.fromTo(q(".hz2"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.35);
      paso(1, 1.18);
      tl.to(q(".vidrio"), { opacity: 0.32, duration: 0.3 }, 1.45);
      tl.fromTo(q(".vidrio"), { opacity: 0.32 }, { opacity: 0.12, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 1.75);
      dibujar(".calor", 1.5, 0.45);
      // control de calidad: la pizza sale en la caja, sello verde
      tl.to(qa(".hz, .hz2, .pz"), { opacity: 0, y: 80, duration: 0.25, ease: "power2.in" }, 1.88);
      tl.fromTo(q(".cc"), { opacity: 0, y: -200, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, 2.0);
      paso(2, 1.98);
      caja(".sb", 2.25);
      pop(".sello", 2.42, 0.35, 0.3);
      // salió para tu casa: la caja va a la moto
      tl.to(qa(".sb, .sello"), { opacity: 0, duration: 0.2 }, 2.95);
      tl.to(q(".cc"), { x: -330, y: -60, scale: 0.36, duration: 0.4, ease: "power3.inOut" }, 3.0);
      tl.set(q(".cc"), { opacity: 0 }, 3.4);
      tl.fromTo(q(".mt-moto"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 3.05);
      paso(3, 3.14);
      tl.fromTo(qa(".vel"), { x: 60, opacity: 0 }, { x: 0, opacity: 0.5, duration: 0.3, stagger: 0.06 }, 3.45);
      tl.to(q(".mt-moto"), { y: -8, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, 3.4);
      tl.to(q(".mt-moto"), { x: 1100, duration: 0.5, ease: "power3.in" }, 3.98);
      tl.to(q(".sh"), { opacity: 0, duration: 0.3 }, 3.98);
      tl.to(q(".trk"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 0.25, ease: "power2.in" }, 4.22);`,
  sfx: [{ t: 0.3, sfx: "pop", vol: 0.18 }, { t: 0.6, sfx: "pop", vol: 0.18 }, { t: 1.18, sfx: "ping", vol: 0.22 }, { t: 1.5, sfx: "whoosh-short", vol: 0.18 }, { t: 1.98, sfx: "ping", vol: 0.22 }, { t: 2.42, sfx: "click", vol: 0.28 }, { t: 3.14, sfx: "ping", vol: 0.25 }, { t: 3.98, sfx: "whoosh", vol: 0.25, max: 0.6 }],
});

// ================= s07 · el giro =================
const ANG = [-90, 0, 90, 180];
escena("s07-giro", {
  css: `
    P svg.reloj { position: absolute; left: 190px; top: 690px; width: 700px; height: 760px; overflow: visible; }
    P .anillo { fill: none; stroke: ${G}; stroke-width: 30; stroke-linecap: round; }`,
  html: `
      <svg class="reloj" viewBox="0 0 700 760" aria-hidden="true">
        <rect x="305" y="10" width="90" height="56" rx="14" fill="${CR}"/><rect x="332" y="60" width="36" height="40" fill="${CR3}"/>
        <circle cx="350" cy="410" r="335" fill="none" stroke="rgba(239,238,229,0.1)" stroke-width="30"/>
        <path class="anillo" d="M350 75 A335 335 0 1 1 349.9 75"/>
        <circle cx="350" cy="410" r="296" fill="${CR3}"/><circle cx="342" cy="402" r="296" fill="${CR}"/>
        <circle cx="342" cy="402" r="250" fill="#ffffff"/>
        ${Array.from({ length: 12 }, (_, i) => `<path d="M342 172 V${i % 3 === 0 ? 212 : 196}" stroke="${NAVY}" stroke-width="${i % 3 === 0 ? 12 : 8}" stroke-linecap="round" transform="rotate(${i * 30} 342 402)"/>`).join("")}
        <path class="aguja" d="M342 402 L342 210" stroke="${NAVY}" stroke-width="16" stroke-linecap="round"/>
        <circle cx="342" cy="402" r="26" fill="${NAVY}"/>
        ${ANG.map((a, i) => { const x = r2(350 + 335 * Math.cos((a * Math.PI) / 180)), y = r2(410 + 335 * Math.sin((a * Math.PI) / 180)); return `<g class="pt pt${i}"><circle cx="${x}" cy="${y}" r="58" fill="${G}" stroke="${NAVY2}" stroke-width="10"/><g transform="translate(${x - 34} ${y - 34}) scale(0.76)">${IC[i]}</g></g>`; }).join("")}
      </svg>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="tacha" d="M330 1560 L750 1560" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></svg>
      ${pill(1, 540, 1560, "¿Más rápido?", "r")}
      ${pill(2, 540, 1560, "La espera, a la vista", "lleno")}`,
  js: `
      const R = q(".reloj");
      tl.fromTo(R, { opacity: 0, scale: 0.7, transformOrigin: "50% 54%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".aguja"), { rotation: 0 }, { rotation: 360, svgOrigin: "342 402", duration: 1.3, ease: "steps(12)" }, 0.1);
      gsap.set(qa(".pt"), { opacity: 0 });
      pop(".n1", 0.4);
      dibujar(".tacha", 0.9, 0.25);
      // hizo que la espera se viera: el anillo de 4 pasos
      fuera(".n1, .tacha", 1.45, 0.15);
      dibujar(".anillo", 1.58, 0.9);
      qa(".pt").forEach((p, i) => pop(p, 1.58 + i * 0.22, 0.3, 0.3));
      tl.fromTo(q(".aguja"), { rotation: 360 }, { rotation: 720, svgOrigin: "342 402", duration: 0.9, ease: "power2.inOut", immediateRender: false }, 1.58);
      pop(".n2", 2.05);
      late(".reloj", 2.4, 1.04);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.1, sfx: "key-press", vol: 0.2 }, { t: 0.9, sfx: "click", vol: 0.28 }, { t: 1.58, sfx: "whoosh", vol: 0.2, max: 0.7 }, { t: 2.05, sfx: "pop", vol: 0.25 }],
});

// ================= s08 · tranquilo =================
escena("s08-tranquilo", {
  css: `
    P .ap-t { position: absolute; left: 0; right: 0; top: 100px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: rgba(239,238,229,0.65); }
    P .ap-e { position: absolute; left: 0; right: 0; top: 146px; text-align: center; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; }
    P .mt { top: 250px; }
    P .ap-moto { position: absolute; left: 96px; top: 500px; width: 260px; height: 157px; }
    P .ap-moto svg.moto-s { left: 0; top: 0; width: 260px; height: 157px; }
    P .call { position: absolute; left: 170px; top: 740px; width: 112px; height: 112px; border-radius: 50%; background: ${G}; }
    P .call svg { position: absolute; left: 24px; top: 30px; }
    P .slash { stroke: ${RED}; stroke-width: 12; stroke-linecap: round; }
    P svg.pizza { left: 470px; top: 820px; width: 560px; height: 560px; }`,
  html: `
      <div class="capa telw">${celular(`
        <div class="ap-t">TU PEDIDO</div><div class="ap-e">En camino</div>
        ${miniTracker()}
        <div class="ap-moto">${MOTO}</div>
        <div class="call"><svg width="64" height="52" viewBox="0 0 64 52"><path d="M4 30 Q32 6 60 30 L52 42 L40 34 L40 24 Q32 20 24 24 L24 34 L12 42 Z" fill="${NAVY}"/></svg></div>`)}
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="slash" d="M470 1290 L610 1410"/></svg></div>
      ${pizza("pz")}
      ${pill(1, 540, 1610, "Ya no llama", "lleno")}
      ${pill(2, 750, 1460, "Cocinando", "lleno")}`,
  js: `
      const W = q(".telw");
      miniSet(3);
      gsap.set(qa(".ap-moto .vel"), { opacity: 0 });
      tl.fromTo(W, { opacity: 0, scale: 1.1, y: 120 }, { opacity: 1, scale: 1.25, y: 20, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".ap-moto"), { x: -40 }, { x: 20, duration: 1.6, ease: "sine.inOut" }, 0.2);
      tl.fromTo(q(".ap-e"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.55);
      // deja de llamar
      tl.to(q(".call"), { backgroundColor: "${EDGE}", duration: 0.2 }, 1.3);
      dibujar(".slash", 1.32, 0.25);
      pop(".n1", 1.5);
      // y el local trabaja
      fuera(".n1", 1.95, 0.15);
      tl.to(W, { x: -250, scale: 1.0, duration: 0.5, ease: "power3.inOut" }, 2.0);
      gsap.set(qa(".tp"), { opacity: 0 });
      tl.fromTo(q(".pz"), { opacity: 0, x: 300, rotation: 40 }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, 2.1);
      pop(".n2", 2.5);
      qa(".tp").forEach((el, i) => pop(el, 2.6 + i * 0.04, 0.2, 0.2));
      tl.to(q(".pz"), { rotation: 20, duration: 0.6, ease: "sine.inOut" }, 2.6);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 1.32, sfx: "click", vol: 0.28 }, { t: 1.5, sfx: "pop", vol: 0.22 }, { t: 2.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.5, sfx: "pop", vol: 0.22 }, { t: 2.65, sfx: "sparkle", vol: 0.16 }],
});

// ================= chat del celular (s09 a s12) =================
const CHAT = (estado) => `${chatHead}
  ${burbuja("o1", 186, "¿Y mi pedido?", "out")}
  ${burbuja("o2", 290, "¿Hola?", "out")}
  ${miniTracker()}
  ${burbuja("i1", 412, "Tu pedido está en el horno", "in", "AVISO AUTOMÁTICO")}
  ${burbuja("i2", 576, "Tu pedido está listo", "in", "AVISO AUTOMÁTICO")}
  ${burbuja("i3", 740, "Salió para tu casa", "in", "AVISO AUTOMÁTICO")}`;
const CSS_CHAT = `P .mt { top: 178px; }`;

// ================= s09 · ¿y mi pedido? =================
escena("s09-chat", {
  css: CSS_CHAT + `
    P .barra { position: absolute; left: 90px; top: 560px; }
    P .tag { position: absolute; left: 0; right: 0; top: 1690px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: ${G}; opacity: 0; }`,
  html: `
      <div class="capa telw">${celular(CHAT(0))}</div>
      ${tracker("barra")}
      ${pill(1, 860, 1240, "Otra vez", "r")}`,
  js: `
      const W = q(".telw");
      gsap.set(qa(".mt"), { opacity: 0 });
      gsap.set(q(".barra"), { opacity: 0 });
      tl.fromTo(W, { opacity: 0, y: 300, rotation: -6 }, { opacity: 1, y: 20, rotation: 0, duration: 0.55, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".ch-av"), { scale: 0.6 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(2)" }, 1.3);
      // ¿y mi pedido? ... ¿hola?
      tl.fromTo(q(".o1"), { opacity: 0, y: 30, scale: 0.8, transformOrigin: "100% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, 1.42);
      tl.fromTo(q(".o2"), { opacity: 0, y: 30, scale: 0.8, transformOrigin: "100% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, 2.45);
      pop(".n1", 2.6);
      // eso mismo lo podés tener: la barrita baja y entra al chat
      fuera(".n1", 3.0, 0.15);
      tl.to(qa(".o1, .o2"), { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 3.1);
      pasoSet(0);
      tl.fromTo(q(".barra"), { opacity: 0, y: -120, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.4)" }, 3.14);
      // encoge hasta la medida de la barrita del chat (408 x 214 → escala 0.57 dentro del celular 1.25)
      tl.to(q(".barra"), { scale: 0.566, x: -122, y: 168, transformOrigin: "0% 0%", duration: 0.5, ease: "power3.inOut" }, 3.65);
      tl.to(q(".barra"), { opacity: 0, duration: 0.12 }, 4.12);
      miniSet(0);
      tl.fromTo(q(".mt"), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 4.08);
      late(".mt", 4.22, 1.05);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.42, sfx: "notification", vol: 0.3 }, { t: 2.45, sfx: "notification", vol: 0.26 }, { t: 3.14, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 4.1, sfx: "click-soft", vol: 0.28 }],
});

// ================= s10 · cambia de estado → aviso =================
escena("s10-estado", {
  css: CSS_CHAT,
  html: `
      <div class="capa telw">${celular(CHAT(1))}</div>
      ${selbox("sb", 386, 808, 132, 132)}
      ${pill(1, 820, 1380, "Sale solo", "lleno")}
      ${pill(2, 790, 520, "Cambia de estado", "g")}`,
  js: `
      gsap.set(qa(".o1, .o2"), { opacity: 0 });
      miniSet(0);
      tl.fromTo(q(".telw"), { scale: 1.25 }, { scale: 1.3, duration: 3.4, ease: "sine.inOut" }, 0);
      // cambia de estado: pasa al horno
      mini(1, 0.5);
      caja(".sb", 0.75);
      pop(".n2", 1.28);
      // le llega un aviso solo
      fuera(".n2, .sb", 1.85, 0.18);
      tl.fromTo(q(".i1"), { opacity: 0, x: -40, scale: 0.85, transformOrigin: "0% 0%" }, { opacity: 1, x: 0, scale: 1, duration: 0.32, ease: "back.out(2)" }, 1.98);
      pop(".n1", 2.48);
      late(".i1", 3.18, 1.05);`,
  sfx: [{ t: 0.72, sfx: "ping", vol: 0.25 }, { t: 0.75, sfx: "click-soft", vol: 0.25 }, { t: 1.98, sfx: "notification", vol: 0.32 }, { t: 2.48, sfx: "pop", vol: 0.25 }],
});

// ================= s11 · listo, salió, Scalerics =================
escena("s11-avisos", {
  css: CSS_CHAT + `
    P .firma { position: absolute; left: 0; right: 0; top: 1585px; text-align: center; opacity: 0; }
    P .firma span { display: inline-block; padding: 20px 44px 24px; border-radius: 999px; background: ${G}; font: 800 56px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }`,
  html: `
      <div class="capa telw">${celular(CHAT(2))}</div>
      <div class="firma"><span>Lo armamos en Scalerics</span></div>`,
  js: `
      gsap.set(qa(".o1, .o2"), { opacity: 0 });
      gsap.set(q(".i1"), { opacity: 1 });
      miniSet(1);
      gsap.set(q(".telw"), { scale: 1.3 });
      // tu pedido está listo
      mini(2, 0.2);
      tl.fromTo(q(".i2"), { opacity: 0, x: -40, scale: 0.85, transformOrigin: "0% 0%" }, { opacity: 1, x: 0, scale: 1, duration: 0.32, ease: "back.out(2)" }, 0.5);
      late(".i2", 1.0, 1.06);
      // salió para tu casa
      mini(3, 1.5);
      tl.fromTo(q(".i3"), { opacity: 0, x: -40, scale: 0.85, transformOrigin: "0% 0%" }, { opacity: 1, x: 0, scale: 1, duration: 0.32, ease: "back.out(2)" }, 1.63);
      // lo armamos en Scalerics: el celular sube un poco y aparece la firma
      tl.to(q(".telw"), { scale: 1.16, y: -30, duration: 0.5, ease: "power3.inOut" }, 2.8);
      tl.fromTo(q(".firma"), { opacity: 0, y: 40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(1.7)" }, 2.95);
      late(".firma span", 3.6, 1.06);
      fuera(".firma", 4.3, 0.2);`,
  sfx: [{ t: 0.4, sfx: "ping", vol: 0.24 }, { t: 0.5, sfx: "notification", vol: 0.3 }, { t: 1.63, sfx: "notification", vol: 0.3 }, { t: 1.85, sfx: "ping", vol: 0.24 }, { t: 2.95, sfx: "sparkle", vol: 0.22 }],
});

// ================= s12 · CTA =================
const avatarPersona = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg>`;
escena("s12-cta", {
  css: CSS_CHAT + `
    P .vc { position: absolute; left: 79px; top: 570px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 586px; width: 922px; height: 460px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
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
      <div class="capa telw">${celular(CHAT(3))}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatarPersona(160)}<div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      gsap.set(qa(".o1, .o2"), { opacity: 0 });
      gsap.set(qa(".i1, .i2, .i3"), { opacity: 1 });
      miniSet(3);
      const TG = q(".telw");
      gsap.set(TG, { scale: 1.16, y: -30 });
      tl.to(TG, { scale: 1.2, duration: 0.65, ease: "sine.inOut" }, 0);
      // gira a horizontal y se vuelve la videollamada
      tl.to(TG, { rotation: -90, scale: 0.96, y: -240, duration: 0.6, ease: "power3.inOut" }, 0.65);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.22);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.18);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.3);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.7);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.0);
      caja(".sb", 2.4);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.2);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.7);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.7);`,
  sfx: [{ t: 0.65, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.3, sfx: "pop", vol: 0.22 }, { t: 1.7, sfx: "whoosh-short", vol: 0.2 }, { t: 2.4, sfx: "click-soft", vol: 0.28 }, { t: 3.2, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
