// Generador de escenas de reels/dos-inmobiliarias (correr desde la carpeta del reel:
// `node armar.mjs && node gen.mjs && node armar.mjs`). Serie "Dos negocios": dos inmobiliarias en
// la misma calle, domingo 21:30 entran consultas por un apartamento. Rodríguez (izquierda, gris y
// rojo apagado) contesta el lunes y dos ya vieron otro; Costa (derecha, verde de marca) tiene un
// agente de IA que contesta al toque y agenda las visitas. Fondo navy claro #16243d liso.
// Forma copiada de reels/dos-gimnasios/gen.mjs (que viene de por-que-la-tarjeta).
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 33.72;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

// fondo #16243d: los paneles van más oscuros (DK) o más claros (MID)
const DK = "#0b1220", DK2 = "#0f1a2e", MID = "#22365a", MID2 = "#2e4672";
const CR = "#efeee5", G = "#5ce611", RED = "#c7655b", GRIS = "#8a96ab", GRIS2 = "#4a5873";
const ST = 7; // grosor de trazo

// ---------- piezas ----------
const tick = (r = 22, fondo = G, marca = DK) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22, fondo = RED, marca = "#fff") =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const reloj = (r = 22, c = GRIS) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" fill="none" stroke="${c}" stroke-width="5"/><path d="M22 12 V22 L29 27" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, kind = "") => `<div class="selbox ${kind} ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
// persona: círculo de color con silueta
const avatar = (r, fondo = CR, sil = MID) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${sil}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${sil}"/></svg>`;
// casita (ícono de apartamento) en svg suelto
const casa = (s, c = CR, ac = G) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><path d="M12 48 L50 14 L88 48" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 42 V88 H78 V42" fill="none" stroke="${c}" stroke-width="8" stroke-linejoin="round"/><rect x="42" y="60" width="16" height="28" fill="${ac}"/></svg>`;

// ---------- fachada de inmobiliaria (svg, coordenadas de pantalla) ----------
// 440 de ancho, 600 de alto + cartel; vidriera con 4 avisos de alquiler y puerta a la derecha
const aviso = (x, y, c, ac) => `
    <rect x="${x}" y="${y}" width="112" height="146" rx="8" fill="${DK}" stroke="${c}" stroke-width="5"/>
    <rect x="${x}" y="${y}" width="112" height="30" rx="8" fill="${ac}"/>
    <path d="M${x + 22} ${y + 86} L${x + 56} ${y + 56} L${x + 90} ${y + 86}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${x + 32} ${y + 80} V${y + 124} H${x + 80} V${y + 80}" fill="none" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`;
const fachada = (cls, cx, B, nombre, bien) => {
  const c = bien ? CR : GRIS, ac = bien ? G : GRIS2;
  return `<g class="${cls}">
    <rect class="cuerpo" x="${cx - 220}" y="${B - 600}" width="440" height="600" fill="${DK2}" stroke="${c}" stroke-width="${ST}" stroke-linejoin="round"/>
    <rect x="${cx - 205}" y="${B - 770}" width="410" height="134" rx="18" fill="${bien ? CR : MID}" stroke="${c}" stroke-width="${ST}"/>
    <text x="${cx}" y="${B - 704}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${nombre.length > 7 ? 50 : 60}" fill="${bien ? DK : GRIS}" letter-spacing="2">${nombre}</text>
    <text x="${cx}" y="${B - 659}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${bien ? MID : GRIS}" letter-spacing="6">PROPIEDADES</text>
    <path d="M${cx - 120} ${B - 636} V${B - 600} M${cx + 120} ${B - 636} V${B - 600}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
    <rect x="${cx - 220}" y="${B - 600}" width="440" height="44" fill="${ac}" stroke="${c}" stroke-width="${ST}"/>
    <rect class="vid" x="${cx - 200}" y="${B - 520}" width="272" height="380" rx="12" fill="${DK}" stroke="${c}" stroke-width="${ST}"/>
    <rect class="luzv" x="${cx - 196}" y="${B - 516}" width="264" height="372" rx="10" fill="${G}" opacity="${bien ? 0.12 : 0}"/>
    <g class="avisos">${aviso(cx - 188, B - 504, c, ac)}${aviso(cx - 60, B - 504, c, ac)}${aviso(cx - 188, B - 344, c, ac)}${aviso(cx - 60, B - 344, c, ac)}</g>
    <rect x="${cx + 92}" y="${B - 460}" width="112" height="460" rx="8" fill="${MID}" stroke="${c}" stroke-width="${ST}"/>
    <rect x="${cx + 110}" y="${B - 430}" width="76" height="170" rx="6" fill="${DK}" stroke="${c}" stroke-width="5"/>
    <circle cx="${cx + 182}" cy="${B - 220}" r="9" fill="${c}"/>
  </g>`;
};
const PISO = (B) => `<path class="piso" d="M20 ${B} H1060" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round" opacity="0.5"/>`;
const DIV = (y1, y2) => `<path class="div" d="M540 ${y1} V${y2}" stroke="${CR}" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round" opacity="0.4"/>`;
const luna = (cls, x, y, r = 46) => `<path class="${cls}" d="M${x + r * 0.35} ${y - r} A${r} ${r} 0 1 0 ${x + r * 0.35} ${y + r} A${r * 0.78} ${r * 0.78} 0 1 1 ${x + r * 0.35} ${y - r} Z" fill="${CR}" stroke="${CR}" stroke-width="4" stroke-linejoin="round"/>`;
// globito de chat con número (notificación) en la vidriera de Costa
const notif = (cls, x, y) => `<g class="${cls}"><rect x="${x - 70}" y="${y - 50}" width="140" height="100" rx="30" fill="${G}"/><path d="M${x - 34} ${y + 44} L${x - 50} ${y + 76} L${x - 6} ${y + 46} Z" fill="${G}"/><circle cx="${x - 32}" cy="${y}" r="10" fill="${DK}"/><circle cx="${x}" cy="${y}" r="10" fill="${DK}"/><circle cx="${x + 32}" cy="${y}" r="10" fill="${DK}"/></g>`;

// ---------- celular (div) ----------
const tel = (cls, x, y, w, h, pantalla) => `
<div class="telw ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="tel-lado"></div>
  <div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>
</div>`;
// cabecera del chat
const head = (nom, sub, bien) => `<div class="ch-head ${bien ? "" : "gr"}"><div class="ch-av">${bien ? casa(54, DK, DK) : casa(54, CR, GRIS2)}</div><div class="ch-nom">${nom}</div><div class="ch-sub">${sub}</div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 6px solid ${CR}; border-radius: 999px; background: ${DK}; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${DK}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .lado { position: absolute; top: 520px; left: 0; width: 1080px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; }
    ${P} .lado.izq { color: ${RED}; } ${P} .lado.der { color: ${G}; }
    ${P} .telw { position: absolute; }
    ${P} .tel-lado { position: absolute; left: 16px; top: 16px; right: -16px; bottom: -16px; border-radius: 70px; background: #0a1120; }
    ${P} .tel { position: absolute; inset: 0; border-radius: 70px; background: ${CR}; }
    ${P} .telw.gr .tel { background: ${GRIS}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 50%; top: 26px; width: 120px; height: 28px; margin-left: -60px; border-radius: 14px; background: ${CR}; }
    ${P} .telw.gr .tel-notch { background: ${GRIS}; }
    ${P} .ch-head { position: absolute; left: 0; top: 0; right: 0; height: 176px; background: ${G}; }
    ${P} .ch-head.gr { background: ${MID}; }
    ${P} .ch-av { position: absolute; left: 30px; top: 72px; width: 84px; height: 84px; border-radius: 50%; background: ${CR}; display: flex; align-items: center; justify-content: center; }
    ${P} .ch-head.gr .ch-av { background: ${DK2}; }
    ${P} .ch-nom { position: absolute; left: 134px; top: 78px; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    ${P} .ch-sub { position: absolute; left: 136px; top: 126px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${DK}; letter-spacing: 0.04em; }
    ${P} .ch-head.gr .ch-nom { color: ${CR}; } ${P} .ch-head.gr .ch-sub { color: ${GRIS}; }
    ${P} .bur { position: absolute; padding: 24px 30px 26px; border-radius: 34px; font: 600 42px/1.22 "Lexend", sans-serif; white-space: nowrap; }
    ${P} .bur.in { left: 28px; background: ${MID2}; color: ${CR}; border-bottom-left-radius: 8px; }
    ${P} .bur.out { right: 28px; background: ${CR}; color: ${DK}; border-bottom-right-radius: 8px; }
    ${P} .bur.ia { right: 28px; background: ${G}; color: ${DK}; border-bottom-right-radius: 8px; font-weight: 700; }
    ${P} .bur small { display: block; margin-top: 10px; font: 500 28px/1 "IBM Plex Mono", monospace; opacity: 0.75; text-align: right; }
    ${P} .bur.gr { background: ${GRIS2}; color: ${GRIS}; }
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
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const temblor = (s, t) => tl.fromTo(typeof s === "string" ? q(s) : s, { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
      const burbuja = (s, t, origen) => tl.fromTo(q(s), { opacity: 0, scale: 0.7, y: 30, transformOrigin: origen ?? "0% 100%" }, { opacity: 1, scale: 1, y: 0, duration: 0.26, ease: "back.out(1.8)" }, t);
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

// ================= s01 · gancho (4.50) =================
// cuadro 0: el gancho entero en grande + las dos inmobiliarias ya dibujadas
const B1 = 1560;
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 800 88px/1.08 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .tit .k { font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${CR}; margin: 18px 0 26px; }
    P .tit .g2 { font-size: 118px; }
    P .tit .g3 { font-size: 118px; color: ${G}; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(820, B1)}${PISO(B1)}
        ${luna("luna", 540, 760, 40)}
        ${fachada("fzL", 270, B1, "RODRÍGUEZ", false)}
        ${fachada("fzR", 810, B1, "COSTA", true)}
        ${notif("ntR", 746, 1240)}
      </svg>
      ${pill(1, 810, 1650, "3 visitas", "lleno")}
      ${pill(2, 270, 1650, "En espera", "r")}
      <div class="tit"><div>Dos inmobiliarias</div><div class="k">MISMA CALLE · DOMINGO 21:30</div><div class="g2">Una ya agendó</div><div class="g3">tres visitas.</div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzL"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0.08);
      dibujar(".div", 0.2, 0.6);
      // "El domingo a la noche": sale la luna, Rodríguez se apaga
      tl.fromTo(q(".luna"), { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.1);
      tl.to(q(".fzL"), { opacity: 0.5, duration: 0.4 }, 2.4);
      // "una ya agendó": en la vidriera de Costa entra un chat
      tl.fromTo(q(".fzR .luzv"), { opacity: 0.12 }, { opacity: 0.45, duration: 0.18, yoyo: true, repeat: 3, immediateRender: false }, 2.8);
      tl.fromTo(q(".ntR"), { opacity: 0, scale: 0.4, svgOrigin: "746 1240" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 2.85);
      qa(".ntR circle").forEach((c, i) => tl.fromTo(c, { y: 0 }, { y: -10, duration: 0.16, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 3.0 + i * 0.08));
      tl.fromTo(q(".tit .g2"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, 3.3);
      pop(".n1", 3.8);
      tl.fromTo(q(".tit .g3"), { scale: 1 }, { scale: 1.07, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 3.85);
      pop(".n2", 4.05);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.22, ease: "power2.in" }, 4.25);
      salida(4.3);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.85, sfx: "notification", vol: 0.3 }, { t: 3.8, sfx: "pop", vol: 0.28 }, { t: 4.05, sfx: "click-soft", vol: 0.25 }],
});

// ================= s02 · domingo 21:30 (2.57) =================
// Nueve 0 · y .5 · media .99 · entran 1.49 · consultas 1.70
const NOTIS = ["Consulta · Apto 2 dorm.", "Consulta · Apto 2 dorm.", "Consulta · Apto 2 dorm."];
escena("s02-domingo", {
  css: `
    P .dia { position: absolute; left: 0; right: 0; top: 590px; text-align: center; font: 800 120px/1 "Lexend", sans-serif; color: #fff; letter-spacing: 0.04em; }
    P .hora { position: absolute; left: 0; right: 0; top: 720px; text-align: center; font: 900 300px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; }
    P .hora span { display: inline-block; }
    P .nt { position: absolute; left: 90px; width: 900px; height: 150px; border-radius: 34px; background: ${DK}; border: 6px solid ${CR}; display: flex; align-items: center; gap: 28px; padding-left: 28px; opacity: 0; }
    P .nt .ic { width: 96px; height: 96px; border-radius: 26px; background: ${G}; display: flex; align-items: center; justify-content: center; flex: none; }
    P .nt .tx { font: 700 42px/1.15 "Lexend", sans-serif; color: #fff; }
    P .nt .tx small { display: block; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${GRIS}; margin-top: 8px; letter-spacing: 0.06em; }
    P .badge { position: absolute; left: 930px; top: 1090px; width: 110px; height: 110px; border-radius: 50%; background: ${RED}; font: 900 64px/110px "Lexend", sans-serif; color: #fff; text-align: center; opacity: 0; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${luna("luna", 975, 560, 40)}</svg>
      <div class="dia">DOMINGO</div>
      <div class="hora"><span class="h1">21</span><span class="h2">:</span><span class="h3">30</span></div>
      ${NOTIS.map((t, i) => `<div class="nt t${i}" style="top:${1110 + i * 180}px"><div class="ic">${casa(64, DK, DK)}</div><div class="tx">${t}<small>AHORA · ¿SIGUE DISPONIBLE?</small></div></div>`).join("")}
      <div class="badge">3</div>`,
  js: `
      tl.fromTo(q(".dia"), { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".hora"), { scale: 0.7, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.08);
      tl.fromTo(q(".luna"), { opacity: 0, rotation: -30, svgOrigin: "920 640" }, { opacity: 1, rotation: 0, duration: 0.5, ease: "power2.out" }, 0.2);
      tl.fromTo(q(".h2"), { opacity: 1 }, { opacity: 0.2, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 0.5);
      // "entran consultas": caen tres avisos
      qa(".nt").forEach((n, i) => tl.fromTo(n, { opacity: 0, y: 120, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "back.out(1.6)" }, 1.45 + i * 0.22));
      tl.fromTo(q(".badge"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 2.0);
      latido(".badge", 2.25, 1.15);
      salida(2.42);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.1, sfx: "impact-bass-1", vol: 0.2 }, { t: 1.45, sfx: "notification", vol: 0.28 }, { t: 1.67, sfx: "notification", vol: 0.22 }, { t: 1.89, sfx: "notification", vol: 0.2 }],
});

// ================= s03 · las consultas (3.13) =================
// ¿Sigue 0 · disponible .23 · ¿Aceptan 1.14 · mascotas 1.53 · ¿Puedo 2.39 · martes 2.83
const T3 = { x: 160, y: 590, w: 760, h: 1090 };
const PAN3 = `
  ${head("Apto 2 dormitorios", "3 CONSULTAS · 21:30", true)}
  <div class="who w0" style="top:226px">${avatar(34, "#f0b26a", DK)}<span>Laura</span></div>
  <div class="bur in b0" style="top:290px">¿Sigue disponible?</div>
  <div class="who w1" style="top:520px">${avatar(34, CR, MID2)}<span>Martín</span></div>
  <div class="bur in b1" style="top:584px">¿Aceptan mascotas?</div>
  <div class="who w2" style="top:814px">${avatar(34, "#9fd3f0", DK)}<span>Paula</span></div>
  <div class="bur in b2" style="top:878px;font-size:47px">¿Puedo verlo el martes?</div>`;
escena("s03-consultas", {
  css: `
    P .who { position: absolute; left: 30px; display: flex; align-items: center; gap: 14px; font: 600 30px/1 "Lexend", sans-serif; color: ${GRIS}; opacity: 0; }
    P .bur { font-size: 54px; padding: 28px 34px 30px; }
    P .who { font-size: 34px; }`,
  html: `
      ${tel("t3", T3.x, T3.y, T3.w, T3.h, PAN3)}`,
  js: `
      const T = q(".t3");
      tl.fromTo(T, { y: 1100, rotation: -4 }, { y: 0, rotation: 0, duration: 0.4, ease: "power3.out" }, 0);
      [0, 1.14, 2.39].forEach((t, i) => {
        pop(".w" + i, Math.max(0.12, t - 0.05), 0.22, 0.8);
        burbuja(".b" + i, Math.max(0.18, t));
      });
      tl.fromTo(T, { scale: 1 }, { scale: 1.04, transformOrigin: "50% 60%", duration: 2.6, ease: "sine.inOut" }, 0.4);
      salida(2.98);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.18, sfx: "pop", vol: 0.26 }, { t: 1.14, sfx: "pop", vol: 0.26 }, { t: 2.39, sfx: "pop", vol: 0.26 }],
});

// ================= s04 · a la izquierda, esperan al lunes (2.10) =================
// A 0 · la .56 · izquierda .7 · esperan 1.1 · al 1.7 · lunes 1.8
const B4 = 1520;
escena("s04-izquierda", {
  css: `
    P .zz { position: absolute; font: 800 60px/1 "Lexend", sans-serif; color: ${GRIS}; opacity: 0; }
    P .cola { position: absolute; left: 530px; top: 640px; width: 510px; }
    P .msg { position: relative; height: 170px; margin-bottom: 26px; border-radius: 30px; background: ${DK}; border: 6px solid ${GRIS2}; display: flex; align-items: center; gap: 20px; padding-left: 24px; opacity: 0; }
    P .msg .t { font: 600 34px/1.2 "Lexend", sans-serif; color: ${GRIS}; }
    P .msg .t small { display: block; margin-top: 8px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${GRIS2}; letter-spacing: 0.04em; }
    P .lun { position: absolute; left: 530px; top: 1230px; width: 510px; height: 230px; border-radius: 30px; background: ${RED}; text-align: center; opacity: 0; }
    P .lun .a { margin-top: 36px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: #fff; }
    P .lun .b { margin-top: 16px; font: 900 100px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; }`,
  html: `
      <div class="lado izq">RODRÍGUEZ · SIN AGENTE</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${PISO(B4)}
        ${fachada("fz", 270, B4, "RODRÍGUEZ", false)}
      </svg>
      <div class="zz z1" style="left:400px;top:690px">z</div><div class="zz z2" style="left:444px;top:640px;font-size:76px">z</div><div class="zz z3" style="left:496px;top:580px;font-size:92px">Z</div>
      <div class="cola">
        <div class="msg m0">${reloj(30)}<div class="t">¿Sigue disponible?<small>SIN RESPUESTA</small></div></div>
        <div class="msg m1">${reloj(30)}<div class="t">¿Aceptan mascotas?<small>SIN RESPUESTA</small></div></div>
        <div class="msg m2">${reloj(30)}<div class="t">¿El martes?<small>SIN RESPUESTA</small></div></div>
      </div>
      <div class="lun"><div class="a">CONTESTA EL</div><div class="b">LUNES</div></div>`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(q(".fz"), { x: -600 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.25 }, 0.3);
      // "esperan": los mensajes quedan en fila, en gris
      qa(".msg").forEach((m, i) => tl.fromTo(m, { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, 0.55 + i * 0.16));
      qa(".zz").forEach((z, i) => tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.8 + i * 0.18));
      // "al lunes"
      tl.fromTo(q(".lun"), { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 1.7);
      temblor(".lun", 1.95);
      salida(1.98);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.55, sfx: "click-soft", vol: 0.22 }, { t: 1.7, sfx: "impact-bass-2", vol: 0.2 }],
});

// ================= s05 · el lunes a las diez (2.96) =================
// A 0 · las .6 · diez .8 · contestan 1.0 · dos 1.83 · ya 2.0 · vieron 2.1 · otro 2.4
const FILAS5 = [["Laura", "#f0b26a", DK, true], ["Martín", CR, MID2, false], ["Paula", "#9fd3f0", DK, true]];
escena("s05-lunes", {
  css: `
    P .hd { position: absolute; left: 70px; top: 590px; width: 940px; height: 210px; border-radius: 36px; background: ${DK}; border: 6px solid ${GRIS}; display: flex; align-items: center; justify-content: center; gap: 36px; }
    P .hd .a { font: 800 90px/1 "Lexend", sans-serif; color: ${GRIS}; letter-spacing: 0.02em; }
    P .hd .b { font: 900 120px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .lst { position: absolute; left: 70px; top: 840px; width: 940px; height: 780px; border-radius: 36px; background: ${DK}; border: 6px solid ${GRIS2}; overflow: hidden; }
    P .fila { position: absolute; left: 0; width: 928px; height: 250px; border-bottom: 5px solid ${GRIS2}; }
    P .fila .av { position: absolute; left: 36px; top: 46px; }
    P .fila .nm { position: absolute; left: 190px; top: 46px; font: 700 44px/1 "Lexend", sans-serif; color: ${CR}; }
    P .fila .yo { position: absolute; left: 190px; top: 112px; font: 600 34px/1 "Lexend", sans-serif; color: ${GRIS}; white-space: nowrap; }
    P .fila .yo b { color: ${G}; font-weight: 600; }
    P .fila .ellos { position: absolute; left: 172px; top: 160px; padding: 14px 22px; border-radius: 20px; background: rgba(199,101,91,0.18); border: 5px solid ${RED}; font: 700 34px/1 "Lexend", sans-serif; color: #fff; opacity: 0; white-space: nowrap; }
    P .fila .x { position: absolute; right: 40px; top: 88px; opacity: 0; }`,
  html: `
      <div class="lado izq">RODRÍGUEZ · LUNES</div>
      <div class="hd"><span class="a">LUNES</span><span class="b">10:00</span></div>
      <div class="lst">
        ${FILAS5.map(([n, f, s, perdio], i) => `<div class="fila f${i}" style="top:${i * 258}px"><div class="av">${avatar(60, f, s)}</div><div class="nm">${n}</div><div class="yo">Vos: <b>¡Hola! Sí, sigue.</b></div>${perdio ? `<div class="ellos">Gracias, ya vimos otro.</div><div class="x">${cruz(36)}</div>` : ""}</div>`).join("")}
      </div>
      ${pill(1, 540, 1700, "Dos ya vieron otro", "rl")}`,
  js: `
      gsap.set(qa(".lado, .yo"), { opacity: 0 });
      tl.to(q(".lado"), { opacity: 1, duration: 0.25 }, 0.1);
      tl.fromTo(q(".hd"), { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".lst"), { y: 900 }, { y: 0, duration: 0.45, ease: "power3.out" }, 0.1);
      latido(".hd .b", 0.8, 1.08);
      // "contestan": las respuestas salen recién ahora
      qa(".yo").forEach((y, i) => tl.fromTo(y, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 1.0 + i * 0.14));
      // "dos ya vieron otro"
      tl.fromTo(qa(".ellos"), { opacity: 0, y: 20, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.8)", stagger: 0.18 }, 1.85);
      tl.fromTo(qa(".x"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.2)", stagger: 0.18 }, 2.0);
      tl.to(qa(".f0 .av, .f2 .av"), { opacity: 0.4, duration: 0.3 }, 2.1);
      pop(".n1", 2.35);
      salida(2.82);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.0, sfx: "typing", vol: 0.14, max: 0.6 }, { t: 1.85, sfx: "glitch-1", vol: 0.18, max: 0.4 }, { t: 2.35, sfx: "click-soft", vol: 0.25 }],
});

// ================= s06 · a la derecha, el agente de IA contesta (2.80) =================
// A 0 · la .24 · derecha .44 · un .54 · agente .99 · de 1.44 · IA 1.54 · contesta 1.54 · al 2.04 · toque 2.14
const T6 = { x: 170, y: 590, w: 740, h: 1040 };
const PAN6 = `
  ${head("Costa Propiedades", "AGENTE DE IA · EN LÍNEA", true)}
  <div class="bur in b0" style="top:220px">¿Sigue disponible?<small>21:30</small></div>
  <div class="esc-dots"><i></i><i></i><i></i></div>
  <div class="bur ia b1" style="top:410px">¡Sí, sigue! Hola, Laura.<small>21:30</small></div>
  <div class="ficha">
    <div class="fi-ic">${casa(110, CR, G)}</div>
    <div class="fi-t">Apto 2 dormitorios</div>
    <div class="fi-r r0">${tick(18)}<span>Con patio</span></div>
    <div class="fi-r r1">${tick(18)}<span>Acepta mascotas</span></div>
    <div class="fi-r r2">${tick(18)}<span>Visitas mar y mié</span></div>
  </div>`;
escena("s06-derecha", {
  css: `
    P .esc-dots { position: absolute; right: 28px; top: 410px; width: 140px; height: 80px; border-radius: 30px; background: ${G}; display: flex; align-items: center; justify-content: center; gap: 14px; opacity: 0; }
    P .esc-dots i { width: 16px; height: 16px; border-radius: 50%; background: ${DK}; }
    P .ficha { position: absolute; left: 28px; right: 28px; top: 596px; height: 384px; border-radius: 34px; background: ${DK2}; border: 6px solid ${G}; opacity: 0; }
    P .fi-ic { position: absolute; left: 34px; top: 30px; width: 150px; height: 150px; border-radius: 26px; background: ${MID}; display: flex; align-items: center; justify-content: center; }
    P .fi-t { position: absolute; left: 210px; top: 66px; font: 800 44px/1.1 "Lexend", sans-serif; color: #fff; width: 420px; }
    P .fi-r { position: absolute; left: 40px; display: flex; align-items: center; gap: 20px; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; opacity: 0; }
    P .fi-r.r0 { top: 200px; } P .fi-r.r1 { top: 258px; } P .fi-r.r2 { top: 316px; }`,
  html: `
      <div class="lado der">COSTA · CON AGENTE DE IA</div>
      ${tel("t6", T6.x, T6.y, T6.w, T6.h, PAN6)}
      ${pill(1, 540, 1700, "Al toque", "lleno")}`,
  js: `
      const T = q(".t6");
      gsap.set(qa(".lado, .bur, .esc-dots"), { opacity: 0 });
      tl.fromTo(T, { x: 900, rotation: 5 }, { x: 0, rotation: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.25 }, 0.3);
      burbuja(".b0", 0.4);
      // "agente de IA": escribiendo...
      tl.to(q(".esc-dots"), { opacity: 1, duration: 0.12 }, 0.95);
      qa(".esc-dots i").forEach((d, i) => tl.fromTo(d, { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.98 + i * 0.08));
      tl.to(q(".esc-dots"), { opacity: 0, duration: 0.1 }, 1.5);
      // "contesta": la respuesta con los datos del apartamento
      burbuja(".b1", 1.52, "100% 100%");
      tl.fromTo(q(".ficha"), { opacity: 0, y: 60, scale: 0.9, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 1.75);
      tl.fromTo(qa(".fi-r"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out", stagger: 0.12 }, 1.95);
      // "al toque"
      pop(".n1", 2.12);
      latido(".n1", 2.4, 1.08);
      salida(2.66);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.4, sfx: "pop", vol: 0.22 }, { t: 0.98, sfx: "typing", vol: 0.14, max: 0.5 }, { t: 1.52, sfx: "notification", vol: 0.3 }, { t: 1.95, sfx: "click-soft", vol: 0.22 }, { t: 2.12, sfx: "ping", vol: 0.24 }],
});

// ================= s07 · pregunta y agenda (1.91) =================
// pregunta 0 · cuándo .24 · y .74 · agenda .74 · la 1.24 · visita 1.34
escena("s07-agenda", {
  css: `
    P .bur { font-size: 46px; }
    P .bur.ia { top: 600px; right: 70px; }
    P .bur.in { top: 780px; left: 70px; }
    P .cal { position: absolute; left: 70px; top: 980px; width: 940px; height: 640px; border-radius: 36px; background: ${DK}; border: 6px solid ${CR}; overflow: hidden; opacity: 0; }
    P .cal-top { position: absolute; left: 0; top: 0; right: 0; height: 110px; background: ${MID}; display: flex; align-items: center; padding-left: 40px; gap: 22px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${CR}; }
    P .cal-top .av { display: flex; }
    P .hr { position: absolute; left: 40px; width: 860px; height: 128px; border-bottom: 4px solid ${GRIS2}; }
    P .hr .h { position: absolute; left: 0; top: 44px; font: 500 34px/1 "IBM Plex Mono", monospace; color: ${GRIS}; }
    P .slot { position: absolute; left: 170px; top: 14px; width: 690px; height: 100px; border-radius: 22px; background: ${G}; display: flex; align-items: center; gap: 22px; padding-left: 26px; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; opacity: 0; }
    P .slot small { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; }
    P .slot .ok { margin-left: auto; margin-right: 20px; }`,
  html: `
      <div class="lado der">COSTA · AGENDA</div>
      <div class="bur ia b0">¿Qué día? ¿Cuántos son?</div>
      <div class="bur in b1">Martes 18:30, somos dos.</div>
      <div class="cal">
        <div class="cal-top"><span class="av">${avatar(34, CR, MID2)}</span>MARTES · AGENDA DEL CORREDOR</div>
        ${["17:00", "17:30", "18:00", "18:30"].map((h, i) => `<div class="hr" style="top:${120 + i * 128}px"><span class="h">${h}</span>${h === "18:30" ? `<div class="slot">Visita · Laura<small>2 PERSONAS</small><span class="ok">${tick(26, DK, G)}</span></div>` : ""}</div>`).join("")}
      </div>`,
  js: `
      gsap.set(q(".lado"), { opacity: 1 });
      burbuja(".b0", 0.0, "100% 100%");
      burbuja(".b1", 0.42);
      // "agenda la visita": el horario se llena en el calendario
      tl.fromTo(q(".cal"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }, 0.62);
      tl.fromTo(q(".slot"), { opacity: 0, scaleX: 0.3, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "back.out(1.6)" }, 1.0);
      tl.fromTo(q(".slot .ok"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2.6)" }, 1.3);
      latido(".slot", 1.45, 1.04);
      salida(1.78);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.24 }, { t: 0.42, sfx: "pop", vol: 0.22 }, { t: 1.0, sfx: "click", vol: 0.26 }, { t: 1.3, sfx: "chime", vol: 0.28 }],
});

// ================= s08 · el lunes, tres visitas listas (2.81) =================
// El 0 · lunes .33 · el .63 · corredor .93 · tiene 1.23 · tres 1.33 · visitas 1.73 · listas 2.13
const VIS = [["MAR", "11:00", "Martín"], ["MAR", "18:30", "Laura"], ["MIÉ", "10:00", "Paula"]];
escena("s08-tres-visitas", {
  css: `
    P .hd { position: absolute; left: 70px; top: 590px; width: 940px; height: 200px; border-radius: 36px; background: ${G}; display: flex; align-items: center; gap: 30px; padding-left: 40px; }
    P .hd .tx { font: 900 92px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .hd .tx small { display: block; margin-top: 10px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; }
    P .vi { position: absolute; left: 70px; width: 940px; height: 190px; border-radius: 34px; background: ${DK}; border: 6px solid ${CR}; opacity: 0; }
    P .vi .d { position: absolute; left: 30px; top: 30px; width: 150px; height: 118px; border-radius: 22px; background: ${MID}; text-align: center; }
    P .vi .d b { display: block; margin-top: 16px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${G}; }
    P .vi .d span { display: block; margin-top: 12px; font: 800 40px/1 "Lexend", sans-serif; color: #fff; }
    P .vi .t { position: absolute; left: 216px; top: 42px; font: 800 48px/1 "Lexend", sans-serif; color: #fff; }
    P .vi .s { position: absolute; left: 218px; top: 110px; font: 500 30px/1 "IBM Plex Mono", monospace; color: ${GRIS}; letter-spacing: 0.04em; }
    P .vi .ok { position: absolute; right: 34px; top: 49px; }
    P .conv { position: absolute; left: 70px; top: 1500px; width: 940px; height: 140px; border-radius: 34px; border: 6px dashed ${G}; display: flex; align-items: center; justify-content: center; gap: 22px; font: 700 42px/1 "Lexend", sans-serif; color: ${G}; opacity: 0; }`,
  html: `
      <div class="lado der">COSTA · LUNES</div>
      <div class="hd">${avatar(66, DK, G)}<div class="tx">Tu agenda<small>CORREDOR · LUNES 9:00</small></div></div>
      ${VIS.map(([d, h, n], i) => `<div class="vi v${i}" style="top:${830 + i * 220}px"><div class="d"><b>${d}</b><span>${h}</span></div><div class="t">Visita · ${n}</div><div class="s">APTO 2 DORM. · CONFIRMADA</div><div class="ok">${tick(44)}</div></div>`).join("")}
      <div class="conv">${casa(56, G, G)}La conversación, para vos</div>`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.to(q(".lado"), { opacity: 1, duration: 0.25 }, 0.1);
      tl.fromTo(q(".hd"), { y: -220, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".hd svg"), { scale: 0.3, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0.8);
      // "tres visitas listas"
      [1.3, 1.6, 1.9].forEach((t, i) => {
        tl.fromTo(q(".v" + i), { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 0.26, ease: "power3.out" }, t);
        tl.fromTo(q(".v" + i + " .ok"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2.6)" }, 2.1 + i * 0.1);
      });
      tl.fromTo(q(".conv"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 2.25);
      salida(2.67);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.3, sfx: "click-soft", vol: 0.24 }, { t: 1.6, sfx: "click-soft", vol: 0.24 }, { t: 1.9, sfx: "click-soft", vol: 0.24 }, { t: 2.1, sfx: "chime", vol: 0.28 }],
});

// ================= s09 · el giro: mismos apartamentos, y descansar está bien (3.52) =================
// Los 0 · dos .22 · tienen .42 · los .72 · mismos .82 · apartamentos 1.02 · y 2.13 · descansar 2.22 · está 2.62 · bien 2.82
const B9 = 1500;
escena("s09-giro", {
  css: `
    P .igual { position: absolute; left: 470px; top: 1010px; width: 140px; height: 140px; border-radius: 50%; background: ${G}; font: 900 110px/130px "Lexend", sans-serif; color: ${DK}; text-align: center; opacity: 0; }
    P .bien { position: absolute; left: 60px; top: 1622px; width: 420px; display: flex; align-items: center; justify-content: center; gap: 14px; white-space: nowrap; font: 700 36px/1 "Lexend", sans-serif; color: ${G}; opacity: 0; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(760, B9)}${PISO(B9)}
        ${luna("luna", 270, 640, 44)}
        <g class="gL">${fachada("fzL", 270, B9, "RODRÍGUEZ", false)}</g>
        <g class="gLc" opacity="0">${fachada("fzLc", 270, B9, "RODRÍGUEZ", true)}</g>
        ${fachada("fzR", 810, B9, "COSTA", true)}
      </svg>
      <div class="igual">=</div>
      ${pill(1, 540, 640, "Mismos apartamentos", "lleno")}
      <div class="bien">${tick(26)}Descansar está bien</div>
      ${pill(2, 810, 1640, "Contestó", "g")}`,
  js: `
      tl.fromTo(q(".gL"), { x: -560 }, { x: 0, duration: 0.42, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { x: 560 }, { x: 0, duration: 0.42, ease: "power3.out" }, 0.05);
      dibujar(".div", 0.3, 0.5);
      // "los mismos apartamentos": los avisos de las dos vidrieras laten juntos
      latido(".gL .avisos, .fzR .avisos", 0.85, 1.06);
      tl.fromTo(q(".igual"), { opacity: 0, scale: 0.3, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, 0.95);
      pop(".n1", 1.05);
      // "y descansar está bien": Rodríguez se enciende en crema, con su tilde
      tl.fromTo(q(".luna"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 2.1);
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, 2.1);
      tl.to(q(".gLc"), { opacity: 1, duration: 0.4 }, 2.3);
      tl.to(q(".gL"), { opacity: 0, duration: 0.4 }, 2.3);
      tl.fromTo(q(".bien"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }, 2.75);
      pop(".n2", 2.9);
      salida(3.38);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.95, sfx: "pop", vol: 0.28 }, { t: 2.3, sfx: "sparkle", vol: 0.2 }, { t: 2.75, sfx: "chime", vol: 0.26 }],
});

// ================= s10 · la diferencia: quién contestó mientras tanto (3.12) =================
// La 0 · diferencia .1 · es .3 · quién 1.15 · contestó 1.4 · mientras 1.8 · tanto 2.2
const P10 = (bien) => `
  ${head(bien ? "Costa" : "Rodríguez", bien ? "EN LÍNEA" : "VISTO EL LUNES", bien)}
  <div class="bur in" style="top:210px">¿Sigue?<small>21:30</small></div>
  ${bien ? `<div class="bur ia rr" style="top:390px">¡Sí! ¿Qué día?<small>21:30</small></div>` : `<div class="esp">${reloj(44, GRIS)}<span>Sin respuesta</span></div>`}`;
escena("s10-diferencia", {
  css: `
    P .reloj { position: absolute; left: 0; right: 0; top: 580px; text-align: center; font: 900 150px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .reloj small { display: block; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: ${CR}; margin-bottom: 14px; }
    P .tel-pan .ch-nom { font-size: 34px; } P .tel-pan .ch-sub { font-size: 28px; }
    P .tel-pan .ch-av { width: 70px; height: 70px; left: 24px; top: 82px; }
    P .tel-pan .ch-nom, P .tel-pan .ch-sub { left: 112px; }
    P .bur { font-size: 38px; padding: 20px 24px 22px; }
    P .bur.in { left: 22px; } P .bur.ia { right: 22px; }
    P .esp { position: absolute; left: 22px; right: 22px; top: 400px; height: 150px; border-radius: 28px; border: 5px dashed ${GRIS2}; display: flex; align-items: center; justify-content: center; gap: 16px; font: 600 34px/1 "Lexend", sans-serif; color: ${GRIS}; opacity: 0; }
    P .selbox.sb { left: 554px; top: 806px; width: 476px; height: 812px; }`,
  html: `
      <div class="reloj"><small>DOMINGO</small>21:30</div>
      ${tel("tL gr", 60, 820, 440, 780, P10(false))}
      ${tel("tR", 570, 820, 440, 780, P10(true))}
      ${selbox("sb", 554, 806, 476, 812)}
      ${pill(1, 540, 1690, "¿Quién contestó?", "g")}`,
  js: `
      gsap.set(qa(".rr"), { opacity: 0 });
      tl.fromTo(q(".reloj"), { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".tL"), { x: -600 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      tl.fromTo(q(".tR"), { x: 600 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.1);
      tl.fromTo(q(".esp"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.6);
      // "quién contestó"
      burbuja(".rr", 1.15, "100% 100%");
      caja(".sb", 1.4);
      tl.to(q(".tL"), { opacity: 0.45, duration: 0.35 }, 1.45);
      pop(".n1", 1.5);
      // "mientras tanto": el reloj corre
      latido(".reloj", 1.85, 1.06);
      tl.fromTo(q(".tR"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 50%", duration: 1.2, ease: "sine.inOut" }, 1.6);
      salida(2.98);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.15, sfx: "notification", vol: 0.28 }, { t: 1.4, sfx: "click", vol: 0.24 }, { t: 1.85, sfx: "key-press", vol: 0.2 }],
});

// ================= s11 · CTA (7.50) =================
// ¿Querés 0 · verlo .19 · en .39 · tu .49 · inmobiliaria .59 · Agendá 1.43 · una 1.69 · videollamada 1.89 · gratis 2.09 · en 2.59 · scalerics.com 2.99
escena("s11-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 590px; width: 922px; height: 500px; border-radius: 70px; background: ${CR}; }
    P .vc-lado { position: absolute; left: 95px; top: 606px; width: 922px; height: 500px; border-radius: 70px; background: ${DK}; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 420px; border-radius: 34px; background: ${MID}; overflow: hidden; }
    P .vc-a svg.fac { position: absolute; left: 0; top: 0; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.85); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 230px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 76px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .vc-btn { position: absolute; left: 676px; top: 300px; width: 124px; height: 124px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 28px; top: 36px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1160px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t3 { top: 1490px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg class="fac" width="560" height="420" viewBox="-130 520 800 600" aria-hidden="true">${fachada("mini", 270, 1310, "TU LOCAL", true)}</svg><div class="lbl">TU INMOBILIARIA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${DK}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${DK}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><span class="selbox sb" style="left:0;top:0;right:0;bottom:0">${esquinas}</span><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.12 }, 0.15);
      // "en tu inmobiliaria": se enciende la vidriera
      tl.fromTo(q(".mini .luzv"), { opacity: 0.12 }, { opacity: 0.5, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 0.6);
      // "Agendá una videollamada gratis en scalerics.com"
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.45);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.95);
      caja(".sb", 2.08);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 2.95);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.5);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.15, sfx: "pop", vol: 0.22 }, { t: 2.12, sfx: "click-soft", vol: 0.28 }, { t: 2.95, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
