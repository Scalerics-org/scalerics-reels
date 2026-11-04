// Generador de escenas de reels/caso-duolingo (correr desde la carpeta del reel, después
// `node armar.mjs`). Estilo "resultaaquee" sobre fondo CREMA (copiado de caso-starbucks): un objeto
// grande relleno por escena (navy y verde, con lado oscuro y sombra plana), que se transforma en el
// siguiente. Duolingo se NOMBRA pero no se dibuja: ni búho, ni logo, ni su verde, ni su tipografía.
// Objetos genéricos: celular con notificación, llama de racha verde Scalerics, campana, ficha del
// cliente, tarjetas de recordatorio, chat del local, agenda.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", CR2 = "#dcdacb", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", W = "#ffffff", GRIS = "#b4b2a3";
const SOMBRA = "rgba(11,18,32,0.16)";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22, fondo = RED) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;
const avatar = (s, fondo = NAVY2, fig = CR) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;

// ícono genérico de "app de idiomas": cuadrado verde Scalerics con globo navy "Aa"
const icoApp = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="26" fill="${G}"/><path d="M20 28 Q20 18 30 18 H70 Q80 18 80 28 V60 Q80 70 70 70 H44 L28 84 L31 70 H30 Q20 70 20 60 Z" fill="${NAVY}"/><text x="50" y="56" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="30" fill="${CR}">Aa</text></svg>`;

// llama de racha genérica (viewBox 0 0 300 380), verde de marca con lado oscuro y centro crema
const LLAMA = `
  <path d="M150 10 C190 90 280 140 280 250 C280 330 220 375 150 375 C80 375 20 330 20 250 C20 190 60 150 90 110 C100 160 120 180 140 185 C130 120 140 60 150 10 Z" fill="${G}"/>
  <path d="M150 10 C190 90 280 140 280 250 C280 330 220 375 150 375 C200 340 226 300 220 240 C214 170 170 120 150 10 Z" fill="${GD}"/>
  <path d="M150 196 C176 238 212 262 212 304 C212 344 184 362 150 362 C116 362 88 344 88 304 C88 272 110 250 126 228 C131 258 141 266 152 268 C146 244 145 222 150 196 Z" fill="${CR}"/>`;
const llama = (cls = "") => `<svg class="llama ${cls}" viewBox="0 0 300 380" aria-hidden="true" data-layout-allow-overflow>${LLAMA}</svg>`;

// campana (viewBox 0 0 400 440)
const CAMPANA = `
  <path class="onda" d="M70 80 Q30 130 40 200" fill="none" stroke="${NAVY}" stroke-width="16" stroke-linecap="round"/>
  <path class="onda" d="M330 80 Q370 130 360 200" fill="none" stroke="${NAVY}" stroke-width="16" stroke-linecap="round"/>
  <g class="cuerpo">
  <circle cx="200" cy="44" r="24" fill="${NAVY}"/>
  <path d="M200 56 C120 56 92 120 92 196 V278 L52 336 H348 L308 278 V196 C308 120 280 56 200 56 Z" fill="${G}"/>
  <path d="M200 56 C280 56 308 120 308 196 V278 L348 336 H262 L250 278 V196 C250 126 232 74 200 56 Z" fill="${GD}"/>
  <rect x="36" y="324" width="328" height="40" rx="20" fill="${NAVY}"/>
  <circle cx="200" cy="398" r="34" fill="${NAVY}"/>
  </g>`;
// candado (viewBox 0 0 400 440)
const CANDADO = `
  <path d="M120 210 V140 Q120 52 200 52 Q280 52 280 140 V210" fill="none" stroke="${NAVY3}" stroke-width="36" stroke-linecap="round"/>
  <rect x="60" y="196" width="280" height="230" rx="40" fill="${NAVY2}"/>
  <rect x="250" y="196" width="90" height="230" rx="40" fill="${NAVY}"/>
  <rect x="250" y="196" width="40" height="230" fill="${NAVY}"/>
  <circle cx="190" cy="292" r="30" fill="${CR}"/><rect x="177" y="300" width="26" height="66" rx="10" fill="${CR}"/>`;

// celular (navy), 640 x 1080 en (220, 560). Pantalla 604 x 1044.
const celular = (pantalla = "", cls = "") => `
<div class="telw ${cls}"><div class="tel-lado"></div><div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div></div>`;
// notificación (en pantalla: 568 x 176)
const notif = (cls, top, titulo, cuerpo, app = "APP DE IDIOMAS · AHORA") => `<div class="nt ${cls}" style="top:${top}px"><div class="nt-ic">${icoApp(96)}</div><div class="nt-app">${app}</div><div class="nt-t">${titulo}</div><div class="nt-b">${cuerpo}</div></div>`;
// pantalla bloqueada
const BLOQ = (extra = "") => `<div class="bl"><div class="bl-h">19:30</div><div class="bl-d">martes</div>${extra}</div>`;
// pantalla de la racha
const DIAS = ["L", "M", "M", "J", "V", "S", "D"];
const RACHA = `<div class="ra">${llama("ra-ll")}<div class="ra-n"><span class="ra-num">11</span></div><div class="ra-s">días seguidos</div>
  <div class="ra-sem">${DIAS.map((d, i) => `<div class="ra-d d${i}"><div class="ra-c"></div><div class="ra-ok">${tick(34)}</div><b>${d}</b></div>`).join("")}</div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: ${SOMBRA}; }
    ${P} svg.llama, ${P} svg.campana, ${P} svg.candado { position: absolute; overflow: visible; }
    ${P} .pill { position: absolute; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${W}; font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; display: flex; align-items: center; gap: 14px; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.navy { background: ${NAVY}; border-color: ${NAVY}; color: ${CR}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .tag { position: absolute; left: 0; right: 0; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${NAVY}; opacity: 0; }
    ${P} .tag b { display: inline-block; padding: 10px 20px; background: ${NAVY}; color: ${CR}; border-radius: 10px; font-weight: 500; }
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
    ${P} .bl { position: absolute; inset: 0; background: ${NAVY3}; }
    ${P} .bl-h { position: absolute; left: 0; right: 0; top: 110px; text-align: center; font: 700 150px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    ${P} .bl-d { position: absolute; left: 0; right: 0; top: 280px; text-align: center; font: 500 38px/1 "Lexend", sans-serif; color: rgba(239,238,229,0.75); }
    ${P} .nt { position: absolute; left: 18px; width: 568px; height: 186px; border-radius: 40px; background: ${W}; box-shadow: 0 14px 0 rgba(11,18,32,0.35); }
    ${P} .nt-ic { position: absolute; left: 24px; top: 45px; width: 96px; height: 96px; }
    ${P} .nt-app { position: absolute; left: 140px; top: 30px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: rgba(11,18,32,0.55); }
    ${P} .nt-t { position: absolute; left: 140px; top: 74px; font: 800 42px/1 "Lexend", sans-serif; letter-spacing: -0.015em; color: ${NAVY}; white-space: nowrap; }
    ${P} .nt-b { position: absolute; left: 140px; top: 128px; font: 500 32px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); white-space: nowrap; }
    ${P} .ra { position: absolute; inset: 0; background: ${W}; }
    ${P} svg.ra-ll { left: 162px; top: 110px; width: 280px; height: 355px; }
    ${P} .ra-n { position: absolute; left: 0; right: 0; top: 490px; text-align: center; font: 900 190px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    ${P} .ra-s { position: absolute; left: 0; right: 0; top: 690px; text-align: center; font: 700 48px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ra-sem { position: absolute; left: 26px; right: 26px; top: 800px; display: flex; justify-content: space-between; }
    ${P} .ra-d { position: relative; width: 72px; height: 130px; }
    ${P} .ra-c { position: absolute; left: 2px; top: 0; width: 68px; height: 68px; border-radius: 50%; border: 7px solid ${CR2}; background: ${CR}; }
    ${P} .ra-ok { position: absolute; left: 2px; top: 0; opacity: 0; }
    ${P} .ra-d b { position: absolute; left: 0; right: 0; top: 88px; text-align: center; font: 700 32px/1 "Lexend", sans-serif; color: ${NAVY}; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const late = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const vibra = (s, t, n) => tl.fromTo(q(s), { x: 0 }, { x: 10, duration: 0.05, ease: "none", yoyo: true, repeat: n ?? 7, immediateRender: false }, t);
      const cuenta = (s, desde, hasta, t, d) => { const el = q(s); const o = { v: desde }; tl.to(o, { v: hasta, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = Math.round(o.v); } }, t); };
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
// cuadro 0: la pregunta entera en grande + el celular bloqueado con la notificación ya puesta.
// Palabras: Duolingo 0.81 · recuerda 1.44 · todos 1.89 · días 2.42 · practiques 2.90 (dura 3.84)
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 112px/1.08 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.035em; }
    P .tit .v { display: inline-block; background: ${G}; padding: 0 22px 8px; border-radius: 18px; }
    P .tit .s1 { font-size: 100px; }
    P .telw { transform: translate(0px, 40px) scale(0.86); transform-origin: 540px 1640px; }
    P .nt-app { font-size: 35px; letter-spacing: 0.02em; }
    P .nt-b { font-size: 35px; }`,
  html: `
      ${sombra("sh", 560, 1690, 600, 44)}
      ${celular(BLOQ(notif("a", 380, "¿Practicamos hoy?", "Tu lección te espera", "IDIOMAS · AHORA") + notif("b", 590, "Seguí con tu racha", "Son solo unos minutos", "IDIOMAS · AHORA")))}
      <div class="tit"><div class="s1">¿Por qué Duolingo</div><div>te recuerda</div><div>todos los días</div><div><span class="v">que practiques?</span></div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".telw"), { y: 70 }, { y: 40, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".nt.a"), { y: -20, scale: 0.97, transformOrigin: "50% 0%" }, { y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" }, 0);
      // "todos los días": llega otra notificación
      tl.fromTo(q(".nt.b"), { opacity: 0, y: -120, scale: 0.9, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, 1.85);
      vibra(".tel", 1.85, 5);
      // "practiques": el celular vibra y la palabra late
      vibra(".tel", 2.9, 7);
      late(".tit .v", 2.95, 1.06);
      late(".nt.a", 3.0, 1.04);
      // salida: el título sube, el celular se agranda (pasa a la escena siguiente)
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 3.56);
      tl.to(q(".telw"), { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in" }, 3.56);`,
  sfx: [{ t: 0.0, sfx: "notification", vol: 0.22 }, { t: 1.85, sfx: "notification", vol: 0.2 }, { t: 2.9, sfx: "ping", vol: 0.26 }],
});


// ================= s02 · querer no alcanza: te olvidás =================
// Palabras: Porque 0 · querer 0.51 · no 1.02 · alcanza 1.25 · te 2.15 · olvidás 2.35 (dura 3.22)
escena("s02-olvidas", {
  css: `
    P .gn { position: absolute; left: 70px; top: 590px; width: 940px; height: 400px; }
    P .gn-lado { position: absolute; left: 16px; top: 18px; width: 100%; height: 100%; border-radius: 50px; background: ${CR2}; }
    P .gn-cara { position: absolute; inset: 0; border-radius: 50px; background: ${W}; border: 8px solid ${NAVY}; }
    P .gn-k { position: absolute; left: 60px; top: 56px; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(11,18,32,0.6); }
    P .gn-t { position: absolute; left: 60px; top: 112px; font: 800 76px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .gn-bar { position: absolute; left: 60px; top: 252px; width: 580px; height: 64px; border-radius: 32px; background: ${CR}; border: 7px solid ${NAVY}; overflow: hidden; }
    P .gn-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; background: ${G}; transform-origin: 0% 50%; }
    P .gn-p { position: absolute; left: 670px; top: 248px; font: 900 72px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .sem { position: absolute; left: 70px; top: 1190px; width: 940px; display: flex; justify-content: space-between; }
    P .sd { position: relative; width: 120px; height: 190px; }
    P .sd-c { position: absolute; left: 0; top: 0; width: 120px; height: 120px; border-radius: 30px; border: 8px dashed ${GRIS}; background: transparent; }
    P .sd b { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .tag { top: 1060px; }`,
  html: `
      <div class="gn"><div class="gn-lado"></div><div class="gn-cara"><div class="gn-k">GANAS DE APRENDER</div><div class="gn-t">Este año, inglés</div><div class="gn-bar"><div class="gn-fill"></div></div><div class="gn-p"><span class="pc">100</span>%</div></div></div>
      <div class="sem">${DIAS.map((d, i) => `<div class="sd s${i}"><div class="sd-c"></div><b>${d}</b></div>`).join("")}</div>
      ${pill(1, 540, 1090, "No alcanza", "navy")}
      ${pill(2, 540, 1540, "Me olvidé", "rl")}`,
  js: `
      tl.fromTo(q(".gn"), { opacity: 0, scale: 0.6, y: 300, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(1.4)" }, 0);
      // "querer": las ganas se llenan
      tl.fromTo(q(".gn-fill"), { scaleX: 0.15 }, { scaleX: 1, duration: 0.55, ease: "power2.out" }, 0.45);
      cuenta(".pc", 15, 100, 0.45, 0.55);
      // "no alcanza"
      pop(".n1", 1.05);
      // pasan los días, vacíos
      qa(".sd").forEach((d, i) => tl.fromTo(d, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.out" }, 1.4 + i * 0.1));
      fuera(".n1", 2.2, 0.14);
      // las ganas se apagan con los días
      tl.to(q(".gn-fill"), { scaleX: 0.12, backgroundColor: "${GRIS}", duration: 0.9, ease: "power1.in" }, 1.5);
      cuenta(".pc", 100, 12, 1.5, 0.9);
      // "olvidás"
      pop(".n2", 2.35);
      tl.to(qa(".sd-c"), { borderColor: "${RED}", duration: 0.2 }, 2.35);
      // salida: todo se achica al centro (entra el celular)
      tl.to(qa(".gn, .sem, .n2"), { opacity: 0, scale: 0.5, duration: 0.24, ease: "power2.in" }, 2.98);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.2 }, { t: 0.45, sfx: "whoosh-short", vol: 0.16 }, { t: 1.05, sfx: "click-soft", vol: 0.24 }, { t: 2.35, sfx: "glitch-1", vol: 0.14, max: 0.4 }],
});

// ================= s03 · te avisa cada día y te muestra la racha =================
// Palabras: Por 0 · avisa 0.59 · cada 0.89 · día 1.15 · muestra 1.65 · racha 2.21 (dura 3.02)
escena("s03-racha", {
  css: `
    P .scr { position: absolute; inset: 0; }
    P .ra { opacity: 0; }`,
  html: `
      ${sombra("sh", 560, 1660, 640, 40)}
      ${celular(`<div class="scr">${BLOQ(notif("a", 380, "¿Practicamos hoy?", "Tu lección te espera"))}</div>${RACHA}`)}`,
  js: `
      tl.fromTo(q(".telw"), { opacity: 0, scale: 0.5, y: 80, transformOrigin: "540px 1100px" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      // "avisa": cae la notificación
      tl.fromTo(q(".nt.a"), { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.36, ease: "back.out(1.6)" }, 0.55);
      vibra(".tel", 0.6, 5);
      late(".nt.a", 1.15, 1.06);
      // "muestra": se abre la pantalla de la racha
      tl.fromTo(q(".ra"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 1.55);
      tl.to(q(".scr"), { opacity: 0, duration: 0.2 }, 1.75);
      tl.fromTo(q(".ra-ll"), { scale: 0.4, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.4, ease: "back.out(1.8)" }, 1.6);
      qa(".ra-ok").forEach((o, i) => { if (i < 6) tl.fromTo(o, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.16, ease: "back.out(2)" }, 1.7 + i * 0.06); });
      // "racha": el día de hoy se tilda, la llama late y el número sube
      tl.fromTo(q(".d6 .ra-ok"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.2, duration: 0.24, ease: "back.out(2.5)" }, 2.21);
      cuenta(".ra-num", 11, 12, 2.21, 0.05);
      late(".ra-n", 2.26, 1.15);
      late(".ra-ll", 2.21, 1.1);
      tl.to(q(".ra-ll"), { scaleY: 1.06, svgOrigin: "150 375", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.6);
      tl.to(q(".telw"), { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.in" }, 2.82);`,
  sfx: [{ t: 0.55, sfx: "notification", vol: 0.24 }, { t: 1.6, sfx: "whoosh-short", vol: 0.18 }, { t: 2.21, sfx: "sparkle", vol: 0.24 }],
});

// ================= s04 · midió millones de avisos =================
// Palabras: Y 0 · midió 0.12 · millones 0.42 · avisos 1.02 · ver 1.62 · cuál 1.83 · volver 2.50 (dura 3.24)
const AV = [["¿Practicamos hoy?", 0.42], ["Seguí con tu racha", 0.86], ["Son solo unos minutos", 0.3]];
escena("s04-midio", {
  css: `
    P .av { position: absolute; left: 60px; width: 960px; height: 250px; }
    P .av-lado { position: absolute; left: 14px; top: 16px; width: 100%; height: 100%; border-radius: 46px; background: ${CR2}; }
    P .av-cara { position: absolute; inset: 0; border-radius: 46px; background: ${W}; border: 8px solid ${NAVY}; }
    P .av.on .av-cara { background: ${G}; }
    P .av-ic { position: absolute; left: 36px; top: 40px; }
    P .av-l { position: absolute; left: 190px; top: 40px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }
    P .av-t { position: absolute; left: 190px; top: 86px; font: 800 52px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; white-space: nowrap; }
    P .av-bar { position: absolute; left: 190px; top: 170px; width: 560px; height: 34px; border-radius: 17px; background: ${CR}; border: 5px solid ${NAVY}; overflow: hidden; }
    P .av-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; background: ${NAVY2}; transform-origin: 0% 50%; transform: scaleX(0); }
    P .av-ok { position: absolute; right: 40px; top: 70px; opacity: 0; }
    P .lluvia { position: absolute; width: 300px; height: 84px; border-radius: 24px; background: ${W}; border: 6px solid ${NAVY}; opacity: 0; }
    P .lluvia i { position: absolute; left: 16px; top: 16px; width: 40px; height: 40px; border-radius: 12px; background: ${G}; }
    P .lluvia u { position: absolute; left: 72px; top: 28px; width: 190px; height: 18px; border-radius: 9px; background: ${CR2}; }
    P .tag { top: 1520px; }`,
  html: `
      ${Array.from({ length: 14 }, (_, i) => `<div class="lluvia l${i}" style="left:${[30, 390, 750, 160, 560, 860, 40, 420, 760, 220, 600, 40, 480, 800][i]}px;top:${[560, 590, 620, 760, 800, 840, 990, 1030, 1060, 1190, 1230, 1380, 1420, 1450][i]}px"><i></i><u></u></div>`).join("")}
      ${AV.map(([t], i) => `<div class="av a${i}" style="top:${600 + i * 300}px"><div class="av-lado"></div><div class="av-cara"><div class="av-ic">${icoApp(120)}</div><div class="av-l">AVISO ${"ABC"[i]}</div><div class="av-t">${t}</div><div class="av-bar"><div class="av-fill"></div></div><div class="av-ok">${tick(52, NAVY, G)}</div></div></div>`).join("")}
      <div class="tag"><b>LO PUBLICÓ EN UN ESTUDIO</b></div>
      ${pill(1, 540, 1610, "Este te hace volver", "lleno")}`,
  js: `
      // "millones": una lluvia de avisos
      qa(".lluvia").forEach((l, i) => tl.fromTo(l, { opacity: 0, y: -80, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }, 0.05 + i * 0.05));
      tl.to(qa(".lluvia"), { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in", stagger: 0.02 }, 0.9);
      // "avisos": quedan tres grandes
      qa(".av").forEach((a, i) => tl.fromTo(a, { opacity: 0, x: 700, rotation: 5 }, { opacity: 1, x: 0, rotation: 0, duration: 0.34, ease: "back.out(1.3)" }, 0.95 + i * 0.1));
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 1.2);
      // "ver cuál": las barras se miden
      ${JSON.stringify(AV.map((a) => a[1]))}.forEach((k, i) => tl.to(q(".a" + i + " .av-fill"), { scaleX: k, duration: 0.6, ease: "power2.out" }, 1.55));
      // "te hace volver": gana el B
      tl.to(qa(".a0, .a2"), { opacity: 0.4, scale: 0.95, duration: 0.25 }, 2.3);
      tl.set(q(".a1"), { className: "av a1 on" }, 2.4);
      tl.to(q(".a1 .av-fill"), { backgroundColor: "${NAVY}", duration: 0.1 }, 2.4);
      late(".a1", 2.4, 1.05);
      pop(".a1 .av-ok", 2.45, 0.3, 0.3);
      fuera(".tag", 2.4, 0.15);
      pop(".n1", 2.45);
      tl.to(qa(".av, .n1"), { opacity: 0, y: -40, duration: 0.2, ease: "power2.in" }, 3.04);`,
  sfx: [{ t: 0.05, sfx: "typing", vol: 0.14, max: 0.8 }, { t: 0.95, sfx: "whoosh-short", vol: 0.2 }, { t: 1.55, sfx: "whoosh-short", vol: 0.16 }, { t: 2.42, sfx: "ping", vol: 0.26 }],
});

// ================= s05 · el giro: no te obliga, te acuerda =================
// Palabras: No 0 · obliga 0.33 · Te 1.08 · acuerda 1.25 (dura 2.27)
escena("s05-giro", {
  css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 580px; text-align: center; font: 900 136px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t1 .raya { position: absolute; left: 100px; right: 100px; top: 70px; height: 18px; border-radius: 9px; background: ${RED}; transform: scaleX(0); transform-origin: 0% 50%; }
    P .t2 { position: absolute; left: 0; right: 0; top: 1470px; text-align: center; font: 900 136px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; opacity: 0; }
    P .t2 .v { display: inline-block; background: ${G}; padding: 0 24px 12px; border-radius: 20px; }
    P svg.candado, P svg.campana { left: 210px; top: 640px; width: 660px; height: 726px; }
    P .xx { position: absolute; left: 700px; top: 620px; opacity: 0; }`,
  html: `
      ${sombra("sh", 540, 1390, 640, 50)}
      <svg class="candado" viewBox="0 0 400 440" aria-hidden="true" data-layout-allow-overflow>${CANDADO}</svg>
      <svg class="campana" viewBox="0 0 400 440" aria-hidden="true" data-layout-allow-overflow>${CAMPANA}</svg>
      ${selbox("sb r", 170, 600, 740, 830)}
      <div class="xx">${cruz(70)}</div>
      ${pill(1, 540, 1530, "Obligar", "rl")}
      ${pill(2, 540, 1530, `${tick(26, NAVY, G)}Acordar`, "lleno")}`,
  js: `
      gsap.set(q("svg.campana"), { opacity: 0 });
      tl.fromTo(q("svg.candado"), { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(1.6)" }, 0.05);
      // "obliga": el candado sacude y se tacha
      tl.to(q("svg.candado"), { rotation: 6, svgOrigin: "200 430", duration: 0.06, yoyo: true, repeat: 5, ease: "none" }, 0.36);
      caja(".sb", 0.33);
      pop(".xx", 0.4, 0.3, 0.3);
      pop(".n1", 0.45);
      tl.to(qa(".sb, .xx, .n1"), { opacity: 0, duration: 0.18 }, 0.95);
      // "Te acuerda": el candado se vuelve campana
      tl.to(q("svg.candado"), { opacity: 0, scale: 0.3, rotation: -40, transformOrigin: "50% 50%", duration: 0.22, ease: "power2.in" }, 0.95);
      tl.fromTo(q("svg.campana"), { opacity: 0, scale: 0.3, rotation: 30, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.8)" }, 1.08);
      pop(".n2", 1.25);
      tl.fromTo(q(".campana .cuerpo"), { rotation: 0 }, { rotation: 12, svgOrigin: "200 44", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 1.3);
      tl.fromTo(qa(".campana .onda"), { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 1.35);
      tl.to(q("svg.campana"), { x: 260, y: -320, scale: 0.4, opacity: 0, duration: 0.25, ease: "power2.in" }, 2.04);
      tl.to(qa(".n2, .sh"), { opacity: 0, duration: 0.2 }, 2.04);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.22 }, { t: 0.6, sfx: "glitch-1", vol: 0.12, max: 0.3 }, { t: 1.08, sfx: "chime", vol: 0.28 }],
});

// ================= s06 · tu cliente también: se olvida =================
// Palabras: Tu 0 · cliente 0.16 · también 0.56 · no 1.36 · falta 1.51 · quiere 2.29 · Se 2.82 · olvida 3.02 (dura 3.87)
escena("s06-cliente", {
  css: `
    P .fi { position: absolute; left: 60px; top: 620px; width: 960px; height: 680px; }
    P .fi-lado { position: absolute; left: 16px; top: 18px; width: 100%; height: 100%; border-radius: 56px; background: ${CR2}; }
    P .fi-cara { position: absolute; inset: 0; border-radius: 56px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    P .fi-top { position: absolute; left: 0; right: 0; top: 0; height: 250px; background: ${NAVY2}; }
    P .fi-av { position: absolute; left: 56px; top: 50px; }
    P .fi-k { position: absolute; left: 290px; top: 70px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.7); }
    P .fi-n { position: absolute; left: 290px; top: 118px; font: 800 86px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    P .fi-r { position: absolute; left: 56px; right: 56px; height: 150px; border-bottom: 6px solid ${CR2}; }
    P .fi-r .k { position: absolute; left: 0; top: 34px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .fi-r .v { position: absolute; left: 0; top: 78px; font: 800 50px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .chip { position: absolute; right: 0; top: 44px; padding: 16px 26px; border-radius: 999px; font: 800 38px/1 "Lexend", sans-serif; display: flex; align-items: center; gap: 12px; opacity: 0; }
    P .chip.r { background: ${RED}; color: #fff; }
    P .chip.g { background: ${CR}; color: ${NAVY}; border: 5px solid ${NAVY}; }
    P .glob { position: absolute; left: 150px; top: 1380px; width: 780px; height: 230px; opacity: 0; }
    P .glob svg { position: absolute; inset: 0; width: 780px; height: 230px; overflow: visible; }
    P .glob b { position: absolute; left: 0; right: 0; top: 54px; text-align: center; font: 800 80px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }`,
  html: `
      <div class="fi"><div class="fi-lado"></div><div class="fi-cara">
        <div class="fi-top"><div class="fi-av">${avatar(170, G, NAVY)}</div><div class="fi-k">TU CLIENTE</div><div class="fi-n">Laura</div></div>
        <div class="fi-r" style="top:280px"><div class="k">TURNO</div><div class="v">Martes 10:00</div><div class="chip r c1">${cruz(20, "rgba(255,255,255,0.25)")}Faltó</div></div>
        <div class="fi-r" style="top:450px"><div class="k">¿NO QUERÍA VENIR?</div><div class="v">Sí quería</div><div class="chip g c2">${tick(20)}Quería</div></div>
      </div></div>
      <div class="glob"><svg viewBox="0 0 780 230" aria-hidden="true"><path d="M60 20 H720 Q760 20 760 60 V170 Q760 210 720 210 H200 L120 250 L140 210 H60 Q20 210 20 170 V60 Q20 20 60 20 Z" fill="${W}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round" transform="translate(0,-10) scale(1,1) rotate(180 390 120)"/></svg><b>¡Uy, me olvidé!</b></div>`,
  js: `
      // la campana de la escena anterior se vuelve la ficha
      tl.fromTo(q(".fi"), { opacity: 0, scale: 0.5, y: -200, transformOrigin: "80% 0%" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".fi-av"), { scale: 0.5, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0.16);
      late(".fi-n", 0.56, 1.08);
      // "no falta": faltó
      pop(".c1", 1.36);
      // "porque no quiere": sí quería
      tl.fromTo(qa(".fi-r")[1], { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 1.8);
      pop(".c2", 2.25);
      // "Se olvida": el globo
      tl.to(q(".fi"), { y: -40, duration: 0.3, ease: "power2.out" }, 2.75);
      tl.fromTo(q(".glob"), { opacity: 0, scale: 0.5, transformOrigin: "20% 0%" }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(1.9)" }, 2.82);
      late(".glob", 3.1, 1.05);
      tl.to(qa(".fi, .glob"), { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" }, 3.66);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.36, sfx: "glitch-1", vol: 0.14, max: 0.4 }, { t: 2.25, sfx: "click-soft", vol: 0.24 }, { t: 2.82, sfx: "pop", vol: 0.26 }],
});

// ================= s07 · el turno, la cuota, la seña =================
// Palabras: turno 0.24 · cuota 0.91 · seña 1.58 (dura 2.31)
const IC7 = [
  `<rect x="22" y="36" width="136" height="124" rx="18" fill="${W}" stroke="${NAVY2}" stroke-width="12"/><rect x="22" y="36" width="136" height="40" rx="14" fill="${NAVY2}"/><rect x="52" y="18" width="14" height="36" rx="7" fill="${NAVY}"/><rect x="114" y="18" width="14" height="36" rx="7" fill="${NAVY}"/><rect x="56" y="96" width="30" height="26" rx="6" fill="${G}"/><rect x="96" y="96" width="30" height="26" rx="6" fill="${CR2}"/><rect x="56" y="128" width="30" height="20" rx="6" fill="${CR2}"/>`,
  `<path d="M40 18 H140 V162 L124 150 L108 162 L90 150 L72 162 L56 150 L40 162 Z" fill="${W}" stroke="${NAVY2}" stroke-width="10" stroke-linejoin="round"/><rect x="60" y="48" width="60" height="12" rx="6" fill="${NAVY2}"/><rect x="60" y="74" width="40" height="12" rx="6" fill="${CR2}"/><text x="90" y="134" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${GD}">$</text>`,
  `<rect x="14" y="48" width="152" height="92" rx="16" fill="${G}"/><rect x="116" y="48" width="50" height="92" rx="16" fill="${GD}"/><rect x="116" y="48" width="20" height="92" fill="${GD}"/><circle cx="80" cy="94" r="28" fill="${NAVY}"/><text x="80" y="108" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" fill="${CR}">$</text>`,
];
const L7 = [["El turno", "Mañana, 10:00"], ["La cuota", "Vence el viernes"], ["La seña", "Falta confirmar"]];
escena("s07-lista", {
  css: `
    P .c7 { position: absolute; left: 60px; width: 960px; height: 290px; }
    P .c7-lado { position: absolute; left: 14px; top: 16px; width: 100%; height: 100%; border-radius: 46px; background: ${CR2}; }
    P .c7-cara { position: absolute; inset: 0; border-radius: 46px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    P .c7-raya { position: absolute; left: 0; top: 0; bottom: 0; width: 26px; background: ${G}; }
    P .c7-ic { position: absolute; left: 60px; top: 46px; width: 180px; height: 180px; border-radius: 40px; background: ${CR}; }
    P .c7-ic svg { width: 180px; height: 180px; }
    P .c7-t { position: absolute; left: 280px; top: 62px; font: 800 92px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .c7-s { position: absolute; left: 282px; top: 178px; font: 500 40px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.65); }`,
  html: `
      ${L7.map(([t, s], i) => `<div class="c7 k${i}" style="top:${600 + i * 330}px"><div class="c7-lado"></div><div class="c7-cara"><div class="c7-raya"></div><div class="c7-ic"><svg viewBox="0 0 180 180" aria-hidden="true">${IC7[i]}</svg></div><div class="c7-t">${t}</div><div class="c7-s">${s}</div></div></div>`).join("")}`,
  js: `
      [0.1, 0.8, 1.46].forEach((t, i) => tl.fromTo(q(".k" + i), { opacity: 0, x: 900, rotation: 6 }, { opacity: 1, x: 0, rotation: 0, duration: 0.34, ease: "back.out(1.3)" }, t));
      [0.36, 1.02, 1.66].forEach((t, i) => late(".k" + i + " .c7-ic", t, 1.15));
      // las tres se meten en el celular de la escena siguiente
      tl.to(qa(".c7"), { scale: 0.35, opacity: 0, y: (i) => 330 - i * 330, transformOrigin: "50% 50%", duration: 0.26, ease: "power3.in", stagger: 0.03 }, 2.02);`,
  sfx: [{ t: 0.1, sfx: "pop", vol: 0.22 }, { t: 0.8, sfx: "pop", vol: 0.22 }, { t: 1.46, sfx: "pop", vol: 0.22 }],
});

// ================= s08 · un aviso amable, justo a tiempo, sin mandarlo vos =================
// Palabras: aviso 0.20 · amable 0.58 · justo 1.01 · tiempo 1.52 · sin 1.96 · mandarlo 2.21 · vos 2.76 (dura 3.43)
const CHAT = `
  <div class="ch-top"><div class="ch-av">${avatar(96, G, NAVY)}</div><div class="ch-n">Tu local</div><div class="ch-e">en línea</div></div>
  <div class="ch-hoy">HOY · UN DÍA ANTES</div>
  <div class="bu out"><span>Hola, Laura. Te esperamos mañana a las 10:00. ¿Confirmás?</span><i>18:00</i></div>
  <div class="bu in"><span>¡Sí, ahí estoy! Gracias</span><i>18:02</i></div>`;
escena("s08-aviso", {
  css: `
    P .tel-pan { background: ${CR}; }
    P .ch-top { position: absolute; left: 0; right: 0; top: 0; height: 190px; background: ${NAVY2}; }
    P .ch-av { position: absolute; left: 36px; top: 70px; }
    P .ch-n { position: absolute; left: 152px; top: 84px; font: 800 46px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ch-e { position: absolute; left: 152px; top: 140px; font: 500 28px/1 "Lexend", sans-serif; color: ${G}; }
    P .ch-hoy { position: absolute; left: 0; right: 0; top: 236px; text-align: center; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${NAVY}; opacity: 0; }
    P .ch-hoy { width: 420px; margin: 0 auto; padding: 14px 0; border-radius: 999px; background: ${W}; }
    P .bu { position: absolute; padding: 28px 30px 54px; border-radius: 36px; font: 600 40px/1.25 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }
    P .bu i { position: absolute; right: 26px; bottom: 16px; font: 500 28px/1 "IBM Plex Mono", monospace; font-style: normal; color: rgba(11,18,32,0.6); }
    P .bu.out { right: 26px; top: 330px; width: 470px; background: ${G}; border-bottom-right-radius: 8px; }
    P .bu.in { left: 26px; top: 720px; width: 420px; background: ${W}; border-bottom-left-radius: 8px; }
    P .reloj { position: absolute; left: 30px; top: 700px; width: 240px; height: 240px; opacity: 0; }
    P .reloj svg { width: 240px; height: 240px; overflow: visible; }`,
  html: `
      ${sombra("sh", 560, 1660, 640, 40)}
      ${celular(CHAT)}
      <div class="reloj"><svg viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="124" r="106" fill="${NAVY2}"/><circle cx="120" cy="120" r="106" fill="${W}" stroke="${NAVY}" stroke-width="12"/><path class="hm" d="M120 120 V56" stroke="${NAVY}" stroke-width="14" stroke-linecap="round"/><path class="hh" d="M120 120 H168" stroke="${GD}" stroke-width="14" stroke-linecap="round"/><circle cx="120" cy="120" r="14" fill="${NAVY}"/></svg></div>
      ${pill(1, 760, 1520, `${tick(24)}Automático`, "lleno")}`,
  js: `
      tl.fromTo(q(".telw"), { opacity: 0, scale: 0.5, y: 60, transformOrigin: "540px 1100px" }, { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(1.3)" }, 0);
      // "aviso amable": el mensaje del local
      tl.fromTo(q(".bu.out"), { opacity: 0, scale: 0.6, transformOrigin: "100% 100%" }, { opacity: 1, scale: 1, duration: 0.34, ease: "back.out(1.8)" }, 0.3);
      late(".bu.out", 0.62, 1.04);
      // "justo a tiempo": un día antes, con el reloj
      pop(".ch-hoy", 1.0);
      tl.fromTo(q(".reloj"), { opacity: 0, scale: 0.4, rotation: -30, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -8, duration: 0.36, ease: "back.out(1.8)" }, 1.05);
      tl.fromTo(q(".reloj .hm"), { rotation: 0 }, { rotation: 360, svgOrigin: "120 120", duration: 0.7, ease: "power2.inOut" }, 1.15);
      // "sin mandarlo vos": automático
      pop(".n1", 2.05);
      tl.to(q(".reloj"), { opacity: 0, scale: 0.6, duration: 0.2 }, 2.05);
      // y el cliente contesta
      tl.fromTo(q(".bu.in"), { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(1.8)" }, 2.45);
      tl.to(qa(".telw, .n1"), { opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.in" }, 3.22);`,
  sfx: [{ t: 0.3, sfx: "notification", vol: 0.22 }, { t: 1.05, sfx: "click-soft", vol: 0.22 }, { t: 2.05, sfx: "ping", vol: 0.24 }, { t: 2.45, sfx: "pop", vol: 0.22 }],
});

// ================= s09 · lo automatizamos en Scalerics =================
// Palabras: Lo 0 · automatizamos 0.17 · en 0.88 · Scalerics 1.05 (dura 1.91)
const AG = [["10:00", "Turno · Laura"], ["12:30", "Cuota · Martín"], ["16:00", "Seña · Ana"]];
const AGENDA = `<div class="ag"><div class="ag-lado"></div><div class="ag-cara">
  <div class="ag-top"><span>AGENDA DE HOY</span><b>Tu local</b></div>
  ${AG.map(([h, t], i) => `<div class="ag-r r${i}" style="top:${250 + i * 190}px"><div class="h">${h}</div><div class="t">${t}</div><div class="ok">${tick(30)}<span>Avisado</span></div></div>`).join("")}
</div></div>`;
const AG_CSS = `
    P .ag { position: absolute; left: 60px; top: 600px; width: 960px; height: 860px; }
    P .ag-lado { position: absolute; left: 16px; top: 18px; width: 100%; height: 100%; border-radius: 56px; background: ${CR2}; }
    P .ag-cara { position: absolute; inset: 0; border-radius: 56px; background: ${W}; border: 8px solid ${NAVY}; overflow: hidden; }
    P .ag-top { position: absolute; left: 0; right: 0; top: 0; height: 200px; background: ${NAVY2}; }
    P .ag-top span { position: absolute; left: 56px; top: 50px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.7); }
    P .ag-top b { position: absolute; left: 56px; top: 96px; font: 800 74px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    P .ag-r { position: absolute; left: 40px; right: 40px; height: 160px; border-radius: 34px; background: ${CR}; }
    P .ag-r .h { position: absolute; left: 32px; top: 56px; font: 800 48px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ag-r .t { position: absolute; left: 200px; top: 56px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ag-r .ok { position: absolute; right: 26px; top: 44px; padding: 10px 22px 10px 12px; border-radius: 999px; background: ${G}; display: flex; align-items: center; gap: 10px; font: 800 32px/1 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }`;
escena("s09-scalerics", {
  css: AG_CSS + `
    P .etq { position: absolute; left: 250px; top: 1430px; width: 580px; height: 190px; border-radius: 34px; background: ${W}; border: 8px solid ${NAVY}; opacity: 0; }
    P .etq img { position: absolute; left: 44px; top: 52px; width: 476px; height: auto; }`,
  html: `
      ${AGENDA}
      <div class="etq"><img src="assets/logo-oscuro.png" alt="Scalerics"></div>`,
  js: `
      tl.fromTo(q(".ag"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(1.4)" }, 0);
      qa(".ag-r").forEach((r, i) => tl.fromTo(r, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.24, ease: "power3.out" }, 0.12 + i * 0.08));
      [0.3, 0.5, 0.7].forEach((t, i) => pop(".r" + i + " .ok", t, 0.26, 0.4));
      // "Scalerics": la etiqueta con el logo se pega
      tl.fromTo(q(".etq"), { opacity: 0, scale: 1.6, rotation: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -4, duration: 0.3, ease: "back.out(2)" }, 1.02);`,
  sfx: [{ t: 0.3, sfx: "click-soft", vol: 0.22 }, { t: 0.5, sfx: "click-soft", vol: 0.22 }, { t: 0.7, sfx: "click-soft", vol: 0.22 }, { t: 1.02, sfx: "impact-bass-2", vol: 0.2 }],
});

// ================= s10 · CTA: videollamada gratis =================
// Palabras: ¿Querés 0 · local 0.73 · Agendá 1.26 · videollamada 2.05 · gratis 2.93 · scalerics.com 3.65 (dura 7.88)
escena("s10-cta", {
  css: AG_CSS + `
    P .preg { position: absolute; left: 0; right: 0; top: 190px; text-align: center; font: 800 104px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; opacity: 0; }
    P .preg .v { display: inline-block; background: ${G}; padding: 0 18px 6px; border-radius: 16px; }
    P .vc { position: absolute; left: 79px; top: 560px; width: 922px; height: 480px; border-radius: 70px; background: ${NAVY}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 578px; width: 922px; height: 480px; border-radius: 70px; background: ${CR2}; opacity: 0; }
    P .vc-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 56px; background: ${NAVY2}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 396px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 180px; top: 70px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: ${NAVY}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 268px; height: 220px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 680px; top: 272px; width: 124px; height: 124px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 28px; top: 36px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1110px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1256px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 80px; right: 80px; top: 1452px; height: 170px; border-radius: 85px; background: ${G}; border: 8px solid ${NAVY}; text-align: center; font: 800 104px/150px "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; opacity: 0; }
    P .ag-r .ok { opacity: 1; }`,
  html: `
      <div class="preg"><div>¿Querés verlo</div><div>en tu <span class="v">local?</span></div></div>
      <div class="capa az">${AGENDA}</div>
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
      const A = q(".az");
      tl.fromTo(q(".preg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.05);
      late(".preg .v", 0.75, 1.08);
      tl.fromTo(A, { opacity: 0, scale: 0.9, transformOrigin: "540px 1030px" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      // la agenda se va y aparece la videollamada
      tl.to(A, { scale: 0.5, y: -320, opacity: 0, duration: 0.45, ease: "power3.inOut" }, 1.1);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, 1.4);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.5);
      tl.to(q(".preg"), { opacity: 0, y: -30, duration: 0.25 }, 1.7);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.95);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.6);
      caja(".sb", 2.9);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.6);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 4.1);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 4.1);`,
  sfx: [{ t: 1.1, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.5, sfx: "pop", vol: 0.22 }, { t: 1.95, sfx: "whoosh-short", vol: 0.2 }, { t: 2.9, sfx: "click-soft", vol: 0.28 }, { t: 3.6, sfx: "chime", vol: 0.3 }],
});

console.log("escenas escritas:", Object.keys(ESC).filter((id) => fs.existsSync(`compositions/${id}.html`)).join(", "));
