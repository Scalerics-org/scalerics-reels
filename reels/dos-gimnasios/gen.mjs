// Generador de escenas de reels/dos-gimnasios (correr desde la carpeta del reel: `node armar.mjs &&
// node gen.mjs && node armar.mjs`). Serie "Dos negocios": dos gimnasios en la misma cuadra, Sofía se
// anota en los dos y deja de ir; el de la izquierda (planilla, gris y rojo apagado) no se entera, el
// de la derecha (CRM, verde de marca) le escribe y vuelve. Fondo navy claro #16243d liso.
// Forma copiada de reels/dos-restaurantes/gen.mjs (que a su vez viene de por-que-la-tarjeta).
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 34.04;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

// fondo #16243d: los paneles van más oscuros (DK) o más claros (MID)
const BG = "#16243d", DK = "#0b1220", DK2 = "#0f1a2e", MID = "#22365a", MID2 = "#2e4672";
const CR = "#efeee5", G = "#5ce611", RED = "#c7655b", GRIS = "#8a96ab", GRIS2 = "#4a5873";
const ST = 7; // grosor de trazo

// ---------- piezas ----------
const tick = (r = 22, fondo = G, marca = DK) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, kind = "") => `<div class="selbox ${kind} ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
// cara de socio: círculo crema con silueta navy (pelo largo atado si cola = true)
const avatar = (r, cola = false, fondo = CR, sil = MID) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/>${cola ? `<path d="M92 40 Q118 52 112 92 Q104 80 96 74 Z" fill="${sil}"/>` : ""}<circle cx="70" cy="56" r="26" fill="${sil}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${sil}"/></svg>`;
const campana = (s = 44, c = DK) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 44 44" aria-hidden="true"><path d="M22 5 C14 5 10 11 10 18 V26 L6 32 H38 L34 26 V18 C34 11 30 5 22 5 Z" fill="${c}"/><circle cx="22" cy="37" r="5" fill="${c}"/></svg>`;

// ---------- fachada de gimnasio (svg, coordenadas de pantalla) ----------
const pesa = (x1, x2, y, c) =>
  `<path d="M${x1} ${y} H${x2}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
   <rect x="${x1 + 4}" y="${y - 40}" width="22" height="80" rx="6" fill="${c}"/><rect x="${x1 + 30}" y="${y - 28}" width="16" height="56" rx="5" fill="${c}"/>
   <rect x="${x2 - 26}" y="${y - 40}" width="22" height="80" rx="6" fill="${c}"/><rect x="${x2 - 46}" y="${y - 28}" width="16" height="56" rx="5" fill="${c}"/>`;
const fachada = (cls, cx, B, nombre, bien) => {
  const c = bien ? CR : GRIS, vid = bien ? "#1d3a24" : DK2;
  return `<g class="${cls}">
    <rect x="${cx - 215}" y="${B - 580}" width="430" height="580" fill="${DK2}" stroke="${c}" stroke-width="${ST}" stroke-linejoin="round"/>
    <rect x="${cx - 200}" y="${B - 730}" width="400" height="104" rx="18" fill="${bien ? CR : MID}" stroke="${c}" stroke-width="${ST}"/>
    <text x="${cx}" y="${B - 659}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="56" fill="${bien ? DK : GRIS}" letter-spacing="3">${nombre}</text>
    <path d="M${cx - 120} ${B - 626} V${B - 580} M${cx + 120} ${B - 626} V${B - 580}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
    <rect x="${cx - 215}" y="${B - 580}" width="430" height="44" fill="${bien ? G : GRIS2}" stroke="${c}" stroke-width="${ST}"/>
    <rect class="vid" x="${cx - 190}" y="${B - 480}" width="250" height="330" rx="12" fill="${vid}" stroke="${c}" stroke-width="${ST}"/>
    ${bien ? `<rect class="luzv" x="${cx - 186}" y="${B - 476}" width="242" height="322" rx="10" fill="${G}" opacity="0.14"/>` : ""}
    <g class="pesas">${pesa(cx - 160, cx + 30, B - 390, c)}${pesa(cx - 160, cx + 30, B - 250, bien ? G : c)}</g>
    <rect x="${cx + 80}" y="${B - 440}" width="118" height="440" rx="8" fill="${MID}" stroke="${c}" stroke-width="${ST}"/>
    <rect x="${cx + 100}" y="${B - 410}" width="78" height="170" rx="6" fill="${vid}" stroke="${c}" stroke-width="5"/>
    <circle cx="${cx + 176}" cy="${B - 200}" r="9" fill="${c}"/>
  </g>`;
};
const PISO = (B) => `<path class="piso" d="M20 ${B} H1060" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round" opacity="0.5"/>`;
const DIV = (y1, y2) => `<path class="div" d="M540 ${y1} V${y2}" stroke="${CR}" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round" opacity="0.4"/>`;

// ---------- celular (div) ----------
const tel = (cls, x, y, w, h, pantalla) => `
<div class="telw ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="tel-lado"></div>
  <div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>
</div>`;

// ---------- calendario de asistencia (s02) ----------
// card 940 x 600; columnas: etiqueta 150, 7 días de 92, conteo 146
const DIAS = ["L", "M", "M", "J", "V", "S", "D"];
const SEMANAS = [[0, 2, 4], [0, 3], []];
const CAL_W = 940, CAL_H = 600;
const cx_d = (d) => 150 + 46 + d * 92;
const cy_s = (s) => 230 + s * 136;
const CALENDARIO = () => {
  let svg = "";
  DIAS.forEach((d, i) => (svg += `<text x="${cx_d(i)}" y="140" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${GRIS}">${d}</text>`));
  SEMANAS.forEach((dias, s) => {
    svg += `<text x="40" y="${cy_s(s) + 11}" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${GRIS}">SEM ${s + 1}</text>`;
    for (let d = 0; d < 7; d++) {
      svg += `<circle class="vacio s${s}" cx="${cx_d(d)}" cy="${cy_s(s)}" r="34" fill="none" stroke="${GRIS2}" stroke-width="6"/>`;
      if (dias.includes(d)) svg += `<g class="fue w${s}"><circle cx="${cx_d(d)}" cy="${cy_s(s)}" r="38" fill="${G}"/><path d="M${cx_d(d) - 15} ${cy_s(s) + 1} L${cx_d(d) - 4} ${cy_s(s) + 12} L${cx_d(d) + 16} ${cy_s(s) - 10}" fill="none" stroke="${DK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    }
    const n = dias.length;
    svg += `<text class="cnt c${s}" x="${CAL_W - 74}" y="${cy_s(s) + 30}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="88" fill="${n === 3 ? G : n ? CR : RED}">${n}</text>`;
  });
  svg += `<path class="baja" d="M${CAL_W - 74} ${cy_s(0) + 44} L${CAL_W - 74} ${cy_s(2) - 60}" stroke="${RED}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  svg += `<path class="baja" d="M${CAL_W - 96} ${cy_s(2) - 84} L${CAL_W - 74} ${cy_s(2) - 58} L${CAL_W - 52} ${cy_s(2) - 84}" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  return `<div class="cal"><div class="cal-tit">ASISTENCIA DE SOFÍA</div><div class="cal-x">POR SEMANA</div>
    <svg class="cal-svg" width="${CAL_W}" height="${CAL_H}" viewBox="0 0 ${CAL_W} ${CAL_H}" aria-hidden="true">${svg}</svg></div>`;
};

// ---------- planilla (s03) ----------
const SOCIOS = [
  ["Martín R.", "marzo", "al día"], ["Lucía P.", "febrero", "al día"], ["Diego S.", "enero", "al día"],
  ["Sofía M.", "enero", "vencida"], ["Ana G.", "abril", "al día"], ["Pablo T.", "marzo", "al día"],
  ["Carla V.", "enero", "al día"], ["Nicolás B.", "mayo", "al día"], ["Valentina C.", "febrero", "al día"],
  ["Jorge L.", "abril", "al día"], ["Inés F.", "junio", "al día"], ["Rodrigo A.", "marzo", "al día"],
  ["Paula D.", "mayo", "al día"], ["Gonzalo E.", "junio", "al día"], ["Florencia H.", "abril", "al día"],
];
const PLANILLA = () => `
  <div class="pl">
    <div class="pl-bar"><i></i><i></i><i></i><span>socios.xlsx</span></div>
    <div class="pl-head"><span class="c0"></span><span class="c1">SOCIO</span><span class="c2">ALTA</span><span class="c3">CUOTA</span></div>
    <div class="pl-vent"><div class="pl-filas">
      ${SOCIOS.map(([n, a, c], i) => `<div class="pl-f ${n.startsWith("Sofía") ? "sofia" : ""}"><span class="c0">${i + 2}</span><span class="c1">${n}</span><span class="c2">${a}</span><span class="c3 ${c === "vencida" ? "venc" : ""}">${c}</span></div>`).join("")}
    </div></div>
  </div>`;

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
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .lado { position: absolute; top: 528px; left: 0; width: 1080px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; }
    ${P} .lado.izq { color: ${RED}; } ${P} .lado.der { color: ${G}; }
    ${P} .telw { position: absolute; }
    ${P} .tel-lado { position: absolute; left: 16px; top: 16px; right: -16px; bottom: -16px; border-radius: 70px; background: #0a1120; }
    ${P} .tel { position: absolute; inset: 0; border-radius: 70px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 50%; top: 26px; width: 120px; height: 28px; margin-left: -60px; border-radius: 14px; background: ${CR}; }
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
      const toque = (s, t) => tl.fromTo(q(s), { opacity: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.9, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const temblor = (s, t) => tl.fromTo(typeof s === "string" ? q(s) : s, { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
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
// cuadro 0: el gancho entero en grande + los dos gimnasios ya dibujados
const B1 = 1520;
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 92px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .tit .g2 { font-size: 110px; margin-top: 14px; }
    P .tit .g3 { font-size: 104px; color: ${G}; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(800, B1)}${PISO(B1)}
        ${fachada("fzL", 270, B1, "FUERZA", false)}
        ${fachada("fzR", 810, B1, "IMPULSO", true)}
      </svg>
      ${pill(1, 810, 1610, "Te escribe", "lleno")}
      ${pill(2, 270, 1610, "Ni se entera", "r")}
      <div class="tit"><div>Dos gimnasios,</div><div>misma cuadra.</div><div class="g2">Uno se da cuenta</div><div class="g3">cuando dejás de ir.</div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzL"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0.08);
      dibujar(".div", 0.2, 0.6);
      tl.fromTo(qa(".pesas"), { y: 0 }, { y: -16, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      // "Uno se da cuenta": se enciende la derecha, se apaga la izquierda
      tl.fromTo(q(".fzR .luzv"), { opacity: 0.14 }, { opacity: 0.5, duration: 0.18, yoyo: true, repeat: 3, immediateRender: false }, 2.3);
      tl.to(q(".fzL"), { opacity: 0.45, duration: 0.4 }, 2.5);
      latido(".fzR", 2.7, 1.04);
      tl.fromTo(q(".tit .g2"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, 2.3);
      pop(".n1", 3.2);
      pop(".n2", 3.6);
      tl.fromTo(q(".tit .g3"), { scale: 1 }, { scale: 1.07, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 3.25);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 4.1);
      salida(4.25);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.3, sfx: "ping", vol: 0.25 }, { t: 3.2, sfx: "pop", vol: 0.28 }, { t: 3.6, sfx: "click-soft", vol: 0.25 }],
});

// ================= s02 · Sofía (5.18) =================
escena("s02-sofia", {
  css: `
    P .ficha { position: absolute; left: 70px; top: 590px; width: 940px; height: 210px; border-radius: 36px; background: ${DK}; border: 6px solid ${CR}; }
    P .ficha .av { position: absolute; left: 30px; top: 29px; }
    P .ficha .nm { position: absolute; left: 210px; top: 40px; font: 800 70px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; }
    P .ficha .dd { position: absolute; left: 214px; top: 132px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${GRIS}; }
    P .chip { position: absolute; left: 640px; width: 260px; height: 64px; border-radius: 32px; font: 700 30px/64px "Lexend", sans-serif; text-align: center; letter-spacing: 0.06em; opacity: 0; }
    P .chip.a { top: 30px; border: 5px solid ${GRIS}; color: ${GRIS}; line-height: 54px; }
    P .chip.b { top: 112px; background: ${G}; color: ${DK}; }
    P .cal { position: absolute; left: 70px; top: 840px; width: ${CAL_W}px; height: ${CAL_H + 20}px; border-radius: 36px; background: ${DK}; border: 6px solid ${CR}; overflow: hidden; }
    P .cal-tit { position: absolute; left: 40px; top: 36px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; }
    P .cal-x { position: absolute; right: 40px; top: 36px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${GRIS}; }
    P .cal-svg { position: absolute; left: -6px; top: -6px; overflow: visible; }`,
  html: `
      <div class="ficha"><div class="av">${avatar(70, true)}</div><div class="nm">Sofía</div><div class="dd">SOCIA DESDE ENERO</div>
        <div class="chip a">FUERZA</div><div class="chip b">IMPULSO</div></div>
      ${CALENDARIO()}
      ${pill(1, 540, 1560, "Ninguna", "rl")}`,
  js: `
      gsap.set(qa(".fue, .cnt"), { opacity: 0 });
      tl.fromTo(q(".ficha"), { x: -900 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".ficha .av"), { scale: 0.4, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.2);
      tl.fromTo(q(".cal"), { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.25);
      // "se anota en los dos"
      pop(".chip.a", 0.75, 0.3); pop(".chip.b", 0.95, 0.3);
      // "Tres veces por semana"
      qa(".fue.w0").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 1.67 + i * 0.16));
      pop(".cnt.c0", 2.2, 0.35, 0.4);
      // "Después, dos"
      qa(".fue.w1").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 3.0 + i * 0.3));
      pop(".cnt.c1", 3.3, 0.35, 0.4);
      // "Después, ninguna": la tercera semana vacía, en rojo
      tl.to(qa(".vacio.s2"), { stroke: "${RED}", duration: 0.25, stagger: 0.04 }, 3.94);
      pop(".cnt.c2", 4.1, 0.35, 0.4);
      dibujar(".baja", 4.15, 0.35);
      temblor(".cal", 4.2);
      pop(".n1", 4.3);
      tl.to(q(".ficha .av"), { opacity: 0.45, duration: 0.4 }, 4.2);
      salida(4.95);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.75, sfx: "pop", vol: 0.24 }, { t: 1.67, sfx: "click-soft", vol: 0.26 }, { t: 1.83, sfx: "click-soft", vol: 0.26 }, { t: 1.99, sfx: "click-soft", vol: 0.26 }, { t: 3.0, sfx: "click-soft", vol: 0.26 }, { t: 4.1, sfx: "glitch-1", vol: 0.2, max: 0.4 }],
});

// ================= s03 · la planilla (3.69) =================
const FH = 84; // alto de fila
escena("s03-planilla", {
  css: `
    P .pl { position: absolute; left: 50px; top: 600px; width: 980px; height: 880px; border-radius: 30px; background: ${DK}; border: 6px solid ${GRIS}; overflow: hidden; }
    P .pl-bar { position: absolute; left: 0; top: 0; right: 0; height: 76px; background: ${MID}; display: flex; align-items: center; gap: 14px; padding-left: 30px; }
    P .pl-bar i { width: 20px; height: 20px; border-radius: 50%; background: ${GRIS2}; }
    P .pl-bar span { margin-left: 16px; font: 500 30px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    P .pl-head, P .pl-f { position: absolute; left: 0; width: 980px; display: flex; align-items: center; }
    P .pl-head { top: 76px; height: 70px; background: ${DK2}; border-bottom: 5px solid ${GRIS2}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${GRIS}; }
    P .pl-vent { position: absolute; left: 0; top: 151px; width: 980px; height: 723px; overflow: hidden; }
    P .pl-filas { position: absolute; left: 0; top: 0; width: 980px; }
    P .pl-f { position: relative; height: ${FH}px; border-bottom: 4px solid #1c2a44; font: 500 34px/1 "Lexend", sans-serif; color: ${GRIS}; }
    P .c0 { width: 80px; text-align: center; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${GRIS2}; border-right: 4px solid #1c2a44; align-self: stretch; display: flex; align-items: center; justify-content: center; }
    P .c1 { width: 430px; padding-left: 28px; } P .c2 { width: 230px; padding-left: 24px; } P .c3 { width: 240px; padding-left: 24px; }
    P .pl-f .c1 { color: ${CR}; }
    P .pl-f.sofia .c1 { color: #fff; font-weight: 700; }
    P .venc { color: ${RED}; font-weight: 700; }
    P .pl-f.sofia .venc { color: ${GRIS}; }
    P .sbF { left: 62px; }`,
  html: `
      <div class="lado izq">FUERZA · SIN CRM</div>
      ${PLANILLA()}
      ${selbox("sbF", 62, 600 + 151 + 3 * FH - 2, 956, FH + 4, "r")}
      ${pill(1, 540, 1590, "Una fila más", "r")}
      ${pill(2, 540, 1590, "Nadie lo nota", "rl")}`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(q(".pl"), { x: -1000, rotation: -3 }, { x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.3);
      qa(".pl-f").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 0.25 + i * 0.03));
      // "su ficha"
      caja(".sbF", 1.1);
      tl.to(q(".pl-f.sofia .venc"), { color: "${RED}", duration: 0.2 }, 1.5);
      latido(".pl-f.sofia .venc", 1.55, 1.15);
      // "en una planilla": una fila más entre muchas
      pop(".n1", 1.85);
      // "Nadie lo nota": la lista sigue, Sofía se va para arriba y se pierde
      tl.to(q(".sbF"), { opacity: 0, duration: 0.15 }, 2.5);
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, 2.55);
      tl.to(q(".pl-filas"), { y: -${6 * FH}, duration: 0.9, ease: "power2.inOut" }, 2.55);
      tl.to(q(".pl-f.sofia"), { opacity: 0.35, duration: 0.5 }, 2.6);
      pop(".n2", 2.7);
      salida(3.45);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 1.1, sfx: "click", vol: 0.25 }, { t: 1.85, sfx: "click-soft", vol: 0.22 }, { t: 2.55, sfx: "whoosh-short", vol: 0.18 }, { t: 2.7, sfx: "glitch-1", vol: 0.18, max: 0.4 }],
});

// ================= s04 · el CRM (3.90) =================
const BARRAS = [3, 3, 3, 2, 2, 0];
const CRM_SOCIA = () => {
  const base = 380, alto = 92, bw = 96, gap = 46, x0 = 70;
  let svg = `<path d="M40 ${base} H860" stroke="${GRIS2}" stroke-width="5" stroke-linecap="round"/>`;
  BARRAS.forEach((v, i) => {
    const x = x0 + i * (bw + gap);
    const col = i < 3 ? G : i < 5 ? CR : RED;
    if (v) svg += `<rect class="bar b${i}" x="${x}" y="${base - v * alto}" width="${bw}" height="${v * alto}" rx="14" fill="${col}"/>`;
    else svg += `<rect class="bar b${i}" x="${x + 3}" y="${base - 60}" width="${bw - 6}" height="57" rx="12" fill="none" stroke="${RED}" stroke-width="6" stroke-dasharray="12 10"/>`;
    svg += `<text x="${x + bw / 2}" y="${base + 46}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${GRIS}">S${i + 1}</text>`;
  });
  svg += `<path class="trend" d="M${x0 + bw / 2} ${base - 3 * alto - 34} L${x0 + 2 * (bw + gap) + bw / 2} ${base - 3 * alto - 34} L${x0 + 4 * (bw + gap) + bw / 2} ${base - 2 * alto - 34} L${x0 + 5 * (bw + gap) + bw / 2} ${base - 100}" fill="none" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
  return svg;
};
escena("s04-crm", {
  css: `
    P .crm { position: absolute; left: 50px; top: 590px; width: 980px; height: 990px; border-radius: 40px; background: ${DK}; border: 6px solid ${CR}; overflow: hidden; }
    P .crm-h { position: absolute; left: 0; top: 0; right: 0; height: 96px; background: ${MID}; display: flex; align-items: center; padding-left: 36px; gap: 18px; font: 700 38px/1 "Lexend", sans-serif; color: ${CR}; }
    P .crm-h i { width: 22px; height: 22px; border-radius: 50%; background: ${G}; }
    P .crm-h b { margin-left: auto; margin-right: 36px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${G}; }
    P .so { position: absolute; left: 36px; top: 126px; }
    P .so-n { position: absolute; left: 196px; top: 140px; font: 800 56px/1 "Lexend", sans-serif; color: #fff; }
    P .so-d { position: absolute; left: 198px; top: 212px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${GRIS}; }
    P .ch-t { position: absolute; left: 40px; top: 300px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${G}; }
    P .ch { position: absolute; left: 40px; top: 330px; width: 900px; height: 440px; overflow: visible; }
    P .alerta { position: absolute; left: 36px; top: 806px; width: 908px; height: 140px; border-radius: 30px; background: ${G}; display: flex; align-items: center; gap: 24px; padding-left: 34px; opacity: 0; }
    P .alerta .ic { width: 84px; height: 84px; border-radius: 50%; background: ${DK}; display: flex; align-items: center; justify-content: center; }
    P .alerta .tx { font: 800 48px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.01em; }
    P .alerta .tx small { display: block; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; margin-bottom: 10px; }`,
  html: `
      <div class="lado der">IMPULSO · CON CRM</div>
      <div class="crm">
        <div class="crm-h"><i></i>CRM · Socios<b>IMPULSO</b></div>
        <div class="so">${avatar(70, true)}</div><div class="so-n">Sofía M.</div><div class="so-d">SOCIA DESDE ENERO</div>
        <div class="ch-t">VISITAS POR SEMANA</div>
        <svg class="ch" viewBox="0 0 900 440" aria-hidden="true">${CRM_SOCIA()}</svg>
        <div class="alerta"><div class="ic">${campana(48, G)}</div><div class="tx"><small>AVISO</small>Sofía viene menos</div></div>
      </div>
      ${selbox("sbU", 50 + 40 + 70 + 3 * 142 - 22, 590 + 330 + 380 - 2 * 92 - 22, 2 * 142 + 44 - 2, 2 * 92 + 64)}`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(q(".crm"), { x: 1000, rotation: 3 }, { x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.3);
      // "el CRM": se arma la ficha con las barras
      qa(".bar").forEach((b, i) => tl.fromTo(b, { scaleY: 0, opacity: 0, svgOrigin: "0 380" }, { scaleY: 1, opacity: 1, duration: 0.3, ease: "power3.out" }, 0.75 + i * 0.1));
      // "avisa": cae la alerta
      tl.fromTo(q(".alerta"), { opacity: 0, y: -60, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, 1.6);
      tl.fromTo(q(".alerta .ic svg"), { rotation: 0 }, { rotation: 16, transformOrigin: "50% 10%", duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 1.95);
      // "Sofía viene menos": la tendencia baja
      dibujar(".trend", 2.4, 0.55);
      caja(".sbU", 2.85);
      latido(".alerta", 3.05, 1.04);
      tl.fromTo(q(".crm"), { scale: 1 }, { scale: 1.025, transformOrigin: "50% 50%", duration: 3.2, ease: "sine.inOut" }, 0.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.75, sfx: "typing", vol: 0.18, max: 0.6 }, { t: 1.6, sfx: "notification", vol: 0.34 }, { t: 2.4, sfx: "whoosh-short", vol: 0.14 }, { t: 2.85, sfx: "click-soft", vol: 0.26 }],
});

// ================= s05 · el mensaje (4.54) =================
const MSG = "Sofía, ¿todo bien? Te guardamos lugar el jueves.".split(" ");
const MSG_T = [1.52, 1.83, 2.13, 2.43, 2.73, 3.13, 3.43, 3.53];
const TM = { x: 210, y: 580, w: 660, h: 1040 };
const PAN_CHAT = `
  <div class="ch-head"><div class="ch-av">IM</div><div class="ch-nom">Gimnasio Impulso</div><div class="ch-sub">en línea</div></div>
  <div class="esc-dots"><i></i><i></i><i></i></div>
  <div class="bur ellos">${MSG.map((w) => `<span class="mw">${w === "Sofía," ? `<b>${w}</b>` : w}</span>`).join(" ")}</div>
  <div class="clase"><div class="cl-t">CLASE FUNCIONAL</div><div class="cl-d">Jueves · 19:00</div><div class="cl-b">${tick(20)}Tu lugar</div></div>
  <div class="bur yo">¡Ahí voy!</div>`;
escena("s05-mensaje", {
  css: `
    P .ch-head { position: absolute; left: 0; top: 0; width: 632px; height: 170px; background: ${MID}; }
    P .ch-av { position: absolute; left: 34px; top: 70px; width: 80px; height: 80px; border-radius: 50%; background: ${G}; font: 800 32px/80px "Lexend", sans-serif; text-align: center; color: ${DK}; }
    P .ch-nom { position: absolute; left: 134px; top: 76px; font: 700 38px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ch-sub { position: absolute; left: 136px; top: 122px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${G}; }
    P .esc-dots { position: absolute; left: 30px; top: 210px; width: 130px; height: 72px; border-radius: 30px; background: ${MID2}; display: flex; align-items: center; justify-content: center; gap: 12px; }
    P .esc-dots i { width: 16px; height: 16px; border-radius: 50%; background: ${CR}; }
    P .bur { position: absolute; padding: 28px 34px; border-radius: 34px; font: 600 46px/1.24 "Lexend", sans-serif; }
    P .bur.ellos { left: 30px; top: 210px; width: 560px; background: ${MID2}; color: ${CR}; border-bottom-left-radius: 8px; }
    P .bur.ellos b { color: ${G}; font-weight: 800; }
    P .mw { display: inline-block; }
    P .clase { position: absolute; left: 30px; top: 560px; width: 480px; height: 210px; border-radius: 30px; background: ${DK2}; border: 6px solid ${G}; padding: 26px 30px; }
    P .cl-t { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${G}; }
    P .cl-d { margin-top: 18px; font: 800 48px/1 "Lexend", sans-serif; color: #fff; }
    P .cl-b { margin-top: 18px; display: flex; align-items: center; gap: 12px; font: 700 32px/1 "Lexend", sans-serif; color: ${G}; }
    P .bur.yo { right: 30px; top: 820px; background: ${CR}; color: ${DK}; font-weight: 800; border-bottom-right-radius: 8px; }`,
  html: `
      ${tel("tm", TM.x, TM.y, TM.w, TM.h, PAN_CHAT)}
      ${pill(1, 540, 1690, "Con su nombre", "lleno")}`,
  js: `
      const T = q(".tm");
      gsap.set(qa(".mw"), { opacity: 0 });
      gsap.set(qa(".bur, .clase"), { opacity: 0 });
      tl.fromTo(T, { y: 1100, rotation: 4 }, { y: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, 0);
      // "un mensaje": escribiendo...
      qa(".esc-dots i").forEach((d, i) => tl.fromTo(d, { y: 0 }, { y: -12, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.5 + i * 0.1));
      tl.to(q(".esc-dots"), { opacity: 0, duration: 0.12 }, 1.4);
      tl.fromTo(q(".bur.ellos"), { opacity: 0, scale: 0.8, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.8)" }, 1.42);
      const TT = ${JSON.stringify(MSG_T)};
      qa(".mw").forEach((w, i) => tl.fromTo(w, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, TT[i]));
      pop(".n1", 1.6);
      // "lugar el jueves"
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, 3.0);
      tl.fromTo(q(".clase"), { opacity: 0, y: 40, scale: 0.85, transformOrigin: "0% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 3.15);
      tl.fromTo(q(".bur.yo"), { opacity: 0, y: 40, scale: 0.8, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "back.out(1.8)" }, 3.85);
      tl.fromTo(T, { scale: 1 }, { scale: 1.035, transformOrigin: "50% 40%", duration: 3.6, ease: "sine.inOut" }, 0.6);
      salida(4.34);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.5, sfx: "typing", vol: 0.16, max: 0.8 }, { t: 1.42, sfx: "notification", vol: 0.34 }, { t: 3.15, sfx: "pop", vol: 0.26 }, { t: 3.85, sfx: "click-soft", vol: 0.3 }],
});

// ================= s06 · el jueves vuelve (1.60) =================
escena("s06-vuelve", {
  css: `
    P .hoja { position: absolute; left: 150px; top: 610px; width: 780px; height: 860px; border-radius: 44px; background: ${CR}; overflow: hidden; }
    P .hoja-l { position: absolute; left: 166px; top: 626px; width: 780px; height: 860px; border-radius: 44px; background: ${DK}; }
    P .hoja .tope { position: absolute; left: 0; top: 0; right: 0; height: 220px; background: ${G}; text-align: center; font: 900 120px/220px "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .hoja .aros { position: absolute; top: -30px; left: 0; right: 0; }
    P .hoja svg.ok { position: absolute; left: 230px; top: 270px; }
    P .hoja .pie { position: absolute; left: 0; right: 0; top: 650px; display: flex; justify-content: center; align-items: center; gap: 22px; font: 800 60px/1 "Lexend", sans-serif; color: ${DK}; }
    P .hoja .pie small { font: 500 34px/1 "IBM Plex Mono", monospace; color: ${MID}; letter-spacing: 0.08em; }`,
  html: `
      <div class="hoja-l"></div>
      <div class="hoja"><div class="tope">JUEVES</div>
        <svg class="ok" width="320" height="320" viewBox="0 0 320 320" aria-hidden="true"><circle class="okc" cx="160" cy="160" r="140" fill="none" stroke="${G}" stroke-width="18"/><path class="okp" d="M92 164 L140 212 L232 116" fill="none" stroke="${DK}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="pie">${avatar(48, true, DK, CR)}<span>Sofía</span><small>19:00</small></div></div>
      ${pill(1, 540, 1580, "Volvió", "lleno")}`,
  js: `
      tl.fromTo(qa(".hoja, .hoja-l"), { y: 260, opacity: 0, rotation: -4 }, { y: 0, opacity: 1, rotation: 0, duration: 0.35, ease: "back.out(1.5)" }, 0);
      dibujar(".okc", 0.2, 0.45);
      dibujar(".okp", 0.62, 0.25);
      pop(".hoja .pie", 0.7, 0.3, 0.6);
      pop(".n1", 0.85);
      latido(".hoja", 0.9, 1.04);
      salida(1.45);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.69, sfx: "chime", vol: 0.3 }, { t: 0.85, sfx: "pop", vol: 0.26 }],
});

// ================= s07 · los dos son buenos (2.09) =================
const B7 = 1400;
escena("s07-iguales", {
  css: `
    P .igual { position: absolute; left: 470px; top: 980px; width: 140px; height: 140px; border-radius: 50%; background: ${G}; font: 900 110px/128px "Lexend", sans-serif; text-align: center; color: ${DK}; opacity: 0; }
    P .ok { position: absolute; width: 540px; display: flex; justify-content: center; opacity: 0; }
    P .ok span { display: inline-flex; align-items: center; gap: 14px; font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ok.a { left: 0; } P .ok.b { left: 540px; }
    P .ok.m { top: 1450px; } P .ok.p { top: 1530px; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(700, B7)}${PISO(B7)}
        ${fachada("fzL", 270, B7, "FUERZA", true)}
        ${fachada("fzR", 810, B7, "IMPULSO", true)}
      </svg>
      <div class="igual">=</div>
      <div class="ok a m"><span>${tick(22)}Máquinas</span></div><div class="ok b m"><span>${tick(22)}Máquinas</span></div>
      <div class="ok a p"><span>${tick(22)}Profes</span></div><div class="ok b p"><span>${tick(22)}Profes</span></div>`,
  js: `
      tl.fromTo(q(".fzL"), { x: -560 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { x: 560 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0.05);
      dibujar(".div", 0.3, 0.4);
      // "buenas máquinas"
      tl.fromTo(qa(".pesas"), { y: 0 }, { y: -18, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.95);
      pop(".ok.m", 0.99, 0.3);
      // "y buenos profes"
      tl.fromTo(q(".igual"), { opacity: 0, scale: 0.3, rotation: -90, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2)" }, 1.3);
      pop(".ok.p", 1.79, 0.3);
      salida(1.95);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.99, sfx: "ping", vol: 0.22 }, { t: 1.3, sfx: "impact-bass-1", vol: 0.24, max: 0.6 }, { t: 1.79, sfx: "ping", vol: 0.22 }],
});

// ================= s08 · se acuerda de cada socio (2.90) =================
const NOMBRES = ["Martín", "Lucía", "Diego", "Ana", "Sofía", "Pablo", "Carla", "Nico", "Vale", "Jorge", "Inés", "Rodrigo"];
const ESTADO = ["VIENE SEGUIDO", "CUMPLE EL 12", "QUIERE PILATES", "VOLVIÓ", "VOLVIÓ", "VIENE SEGUIDO", "LESIÓN, OJO", "NUEVO", "VIENE SEGUIDO", "CUOTA AL DÍA", "VIENE SEGUIDO", "NUEVO"];
const CW = 300, CH = 186, GX = 20, GY = 20, GX0 = 60, GY0 = 600;
const GRILLA = NOMBRES.map((n, i) => {
  const c = i % 3, r = Math.floor(i / 3);
  return `<div class="so-c ${n === "Sofía" ? "yo" : ""}" style="left:${GX0 + c * (CW + GX)}px;top:${GY0 + r * (CH + GY)}px">
    <div class="sc-av">${avatar(38, i % 2 === 0, CR, MID)}</div><div class="sc-n">${n}</div>
    <div class="sc-e">${ESTADO[i]}</div><div class="sc-t">${tick(20)}</div></div>`;
}).join("");
escena("s08-se-acuerda", {
  css: `
    P .so-c { position: absolute; width: ${CW}px; height: ${CH}px; border-radius: 28px; background: ${DK}; border: 6px solid ${GRIS2}; }
    P .so-c.yo { border-color: ${G}; }
    P .sc-av { position: absolute; left: 22px; top: 22px; }
    P .sc-n { position: absolute; left: 112px; top: 42px; font: 700 38px/1 "Lexend", sans-serif; color: #fff; }
    P .sc-e { position: absolute; left: 24px; top: 124px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${G}; white-space: nowrap; }
    P .sc-t { position: absolute; right: 16px; top: 16px; opacity: 0; }`,
  html: `
      ${GRILLA}
      ${pill(1, 540, 1530, "Se acuerda de cada uno", "lleno")}`,
  js: `
      const cards = qa(".so-c");
      // "Uno, además": la ficha de Sofía primero, después todos
      const orden = [4, 1, 3, 5, 7, 0, 2, 6, 8, 10, 9, 11];
      orden.forEach((k, i) => tl.fromTo(cards[k], { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, (i === 0 ? 0 : 0.35 + i * 0.05)));
      tl.fromTo(qa(".sc-e"), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.04 }, 0.8);
      // "se acuerda de cada socio": tilde en cada ficha
      orden.forEach((k, i) => tl.fromTo(cards[k].querySelector(".sc-t"), { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2.4)" }, 1.3 + i * 0.06));
      pop(".n1", 1.75);
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 55%", duration: 2.6, ease: "sine.inOut" }, 0);
      salida(2.7);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.24 }, { t: 0.4, sfx: "whoosh-short", vol: 0.14 }, { t: 1.3, sfx: "sparkle", vol: 0.22, max: 0.9 }, { t: 1.75, sfx: "pop", vol: 0.26 }],
});

// ================= s09 · a tu medida (2.72) =================
const FILAS9 = [["Sofía", "VOLVIÓ", G], ["Martín", "VIENE SEGUIDO", G], ["Carla", "VIENE MENOS", RED], ["Nico", "NUEVO", CR]];
const LAPTOP = (cls) => `
  <div class="lap ${cls}">
    <div class="lap-s"><div class="lap-p">
      <div class="lp-h">TU GIMNASIO · CRM</div>
      ${FILAS9.map(([n, e, c], i) => `<div class="lp-f" style="top:${120 + i * 100}px"><span class="lp-n">${n}</span><span class="lp-e" style="color:${c};border-color:${c}">${e}</span></div>`).join("")}
    </div></div>
    <div class="lap-b"></div>
  </div>`;
const CSS_LAP = `
    P .lap { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .lap-s { position: absolute; left: 90px; top: 620px; width: 900px; height: 580px; border-radius: 34px; background: ${CR}; }
    P .lap-p { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; border-radius: 20px; background: ${DK}; overflow: hidden; }
    P .lp-h { position: absolute; left: 0; top: 0; right: 0; height: 96px; background: ${G}; padding-left: 36px; font: 800 44px/96px "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.01em; }
    P .lp-f { position: absolute; left: 30px; right: 30px; height: 84px; border-bottom: 4px solid #1c2a44; display: flex; align-items: center; justify-content: space-between; }
    P .lp-n { font: 700 40px/1 "Lexend", sans-serif; color: #fff; }
    P .lp-e { padding: 10px 18px; border: 4px solid; border-radius: 16px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; }
    P .lap-b { position: absolute; left: 30px; top: 1200px; width: 1020px; height: 54px; border-radius: 0 0 30px 30px; background: ${CR}; }
    P .lap-b::after { content: ""; position: absolute; left: 430px; top: 0; width: 160px; height: 14px; border-radius: 0 0 10px 10px; background: #b9b7a8; }`;
let regla = "";
for (let i = 0; i <= 30; i++) {
  const x = 90 + i * 30;
  regla += `<path class="mk" d="M${x} 1330 V${1330 + (i % 5 === 0 ? 50 : 28)}" stroke="${DK}" stroke-width="6" stroke-linecap="round"/>`;
}
escena("s09-medida", {
  css: CSS_LAP + `
    P .cinta { position: absolute; left: 70px; top: 1316px; width: 940px; height: 110px; border-radius: 16px; background: ${G}; transform-origin: 0 50%; }
    P svg.reg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }`,
  html: `
      ${LAPTOP("l9")}
      <div class="cinta"></div>
      <svg class="reg" viewBox="0 0 1080 1920" aria-hidden="true">${regla}<path class="flecha" d="M120 1470 H960 M120 1470 l26 -20 M120 1470 l26 20 M960 1470 l-26 -20 M960 1470 l-26 20" fill="none" stroke="${G}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${pill(1, 540, 1560, "A tu medida", "lleno")}`,
  js: `
      gsap.set(qa(".lp-f"), { opacity: 0 });
      tl.fromTo(qa(".lap-s, .lap-b"), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", stagger: 0.05 }, 0);
      tl.fromTo(q(".lp-h"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.35, ease: "power3.out" }, 0.25);
      qa(".lp-f").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }, 0.55 + i * 0.12));
      // "lo armamos a tu medida": la cinta de medir
      tl.fromTo(q(".cinta"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.out" }, 1.2);
      qa(".mk").forEach((m, i) => { gsap.set(m, { opacity: 0 }); tl.set(m, { opacity: 1 }, 1.25 + i * 0.013); });
      dibujar(".flecha", 1.7, 0.35);
      pop(".n1", 1.85);
      latido(".lap-s", 1.85, 1.02);
      salida(2.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.55, sfx: "typing", vol: 0.16, max: 0.5 }, { t: 1.2, sfx: "whoosh-short", vol: 0.18 }, { t: 1.85, sfx: "pop", vol: 0.28 }],
});

// ================= s10 · CTA =================
escena("s10-cta", {
  css: CSS_LAP + `
    P .vc { position: absolute; left: 79px; top: 590px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 606px; width: 922px; height: 460px; border-radius: 70px; background: ${DK}; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${MID}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.8); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1120px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1262px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t3 { top: 1450px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="capa lapg">${LAPTOP("l10")}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(80, false, CR, MID2)}<div class="lbl">TU GIMNASIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${DK}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${DK}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><span class="selbox sb" style="left:0;top:0;right:0;bottom:0">${esquinas}</span><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const LG = q(".lapg");
      // la laptop se achica y se vuelve la videollamada
      tl.to(LG, { scale: 0.8, y: -120, transformOrigin: "540px 900px", duration: 0.35, ease: "power3.in" }, 0);
      tl.to(LG, { opacity: 0, duration: 0.12 }, 0.3);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.3);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.4);
      // Agendá una videollamada gratis en scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.45);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.68);
      caja(".sb", 0.8);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 1.68);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 2.3);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.3);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.4, sfx: "pop", vol: 0.22 }, { t: 0.8, sfx: "click-soft", vol: 0.28 }, { t: 1.68, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
