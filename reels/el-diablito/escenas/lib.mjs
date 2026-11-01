// Biblioteca de personajes y plantilla de escena para reels/el-diablito (dibujo animado de los años 30).
import fs from "node:fs";

export const INK = "#1d1610", PAPEL = "#fbf3dc", SKIN = "#f6e0b8", RED = "#c8312b", CEL = "#8ec5e0", HALO = "#f2c230", SEPIA = "#d9c79c";
export const BEAT = 60 / 132;
const K = (w = 7) => `stroke="${INK}" stroke-width="${w}"`;

// ---------- piezas ----------
// ojo de pastel: blanco + pupila negra con la cuña blanca
export function ojo(p, cx, cy, rx = 18, ry = 26, extra = "") {
  return `<g class="${p}-ojo ${extra}">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${PAPEL}" ${K(5)} />
    <g class="${p}-pupila"><ellipse cx="${cx + rx * 0.22}" cy="${cy + ry * 0.2}" rx="${rx * 0.5}" ry="${ry * 0.58}" fill="${INK}" />
    <path d="M${cx + rx * 0.22} ${cy + ry * 0.2} l${rx * 0.36} ${-ry * 0.5} l${-rx * 0.5} ${-ry * 0.12} Z" fill="${PAPEL}" /></g>
  </g>`;
}
// párpado: tapa el ojo desde arriba; se cierra con scaleY 0 -> 1 (svgOrigin en la parte de arriba del ojo)
export function parpado(p, cx, cy, rx, ry, fill, cls) {
  return `<ellipse class="${p}-${cls}" cx="${cx}" cy="${cy}" rx="${rx + 1}" ry="${ry + 1}" fill="${fill}" ${K(5)} />`;
}
export function guante(cx, cy, r = 18, rot = 0) {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})"><path d="M${-r * 0.7} ${r * 0.5} L${-r * 0.9} ${r * 1.15} H${r * 0.9} L${r * 0.7} ${r * 0.5}" fill="${PAPEL}" ${K(5)} />
    <circle cx="0" cy="0" r="${r}" fill="${PAPEL}" ${K(5)} /><path d="M${-r * 0.35} ${-r * 0.75} V${-r * 0.1} M${r * 0.15} ${-r * 0.85} V${-r * 0.1}" ${K(3)} fill="none" /></g>`;
}
const hose = (d, w = 11) => `<path d="${d}" fill="none" ${K(w)} />`;

// ---------- DIABLITO (origen: entre los pies) ----------
export function diablito(p, { tridente = true, cara = "malo" } = {}) {
  return `<g class="${p}-dia">
    <g class="${p}-dia-cola"><path d="M24 -96 C96 -92 118 -150 86 -196" fill="none" ${K(8)} /><path d="M86 -196 l-22 -2 l14 -30 l20 26 Z" fill="${RED}" ${K(5)} /></g>
    ${hose("M-22 -84 C-26 -52 -30 -34 -36 -16", 12)}${hose("M22 -84 C26 -52 30 -34 36 -16", 12)}
    <ellipse cx="-46" cy="-10" rx="32" ry="15" fill="${INK}" /><ellipse cx="46" cy="-10" rx="32" ry="15" fill="${INK}" />
    <path d="M-52 -84 C-62 -142 -40 -178 0 -178 C40 -178 62 -142 52 -84 C40 -62 -40 -62 -52 -84 Z" fill="${RED}" ${K(7)} />
    <g class="${p}-dia-bi">${hose("M-44 -150 C-82 -140 -96 -120 -100 -96")}${guante(-102, -86, 19, -20)}</g>
    <g class="${p}-dia-bd">${hose("M44 -150 C82 -160 94 -186 98 -210")}
      ${tridente ? `<path d="M100 -110 V-306" fill="none" ${K(8)} /><path d="M76 -304 V-276 M100 -318 V-274 M124 -304 V-276 M76 -284 Q100 -258 124 -284" fill="none" ${K(7)} />` : ""}
      ${guante(100, -216, 19, 0)}</g>
    <g class="${p}-dia-cab">
      <path d="M-46 -288 Q-74 -330 -60 -356 Q-40 -322 -24 -304 Z" fill="${INK}" ${K(4)} /><path d="M46 -288 Q74 -330 60 -356 Q40 -322 24 -304 Z" fill="${INK}" ${K(4)} />
      <circle cx="0" cy="-242" r="68" fill="${RED}" ${K(7)} />
      ${ojo(p, -23, -252, 18, 26, `${p}-dia-oi`)}${ojo(p, 23, -252, 18, 26, `${p}-dia-od`)}
      <path class="${p}-dia-cejas" d="M-46 -290 L-8 -272 M46 -290 L8 -272" fill="none" ${K(8)} />
      <g class="${p}-dia-boca-mala" ${cara === "malo" ? "" : 'opacity="0"'}><path d="M-42 -214 Q0 -170 42 -214 Q0 -194 -42 -214 Z" fill="${INK}" ${K(4)} /><path d="M-14 -199 Q0 -186 14 -199 Z" fill="${RED}" /></g>
      <g class="${p}-dia-boca-triste" ${cara === "triste" ? "" : 'opacity="0"'}><path d="M-26 -196 Q0 -218 26 -196" fill="none" ${K(7)} /></g>
      <path d="M-9 -176 L0 -156 L9 -176 Z" fill="${INK}" />
    </g>
  </g>`;
}

// ---------- ANGELITO ----------
export function angelito(p) {
  return `<g class="${p}-ang">
    <g class="${p}-ang-alas">
      <path d="M-34 -150 C-110 -200 -150 -130 -108 -104 C-134 -88 -110 -56 -46 -92 Z" fill="${CEL}" ${K(6)} />
      <path d="M-70 -150 q-10 16 -4 30 M-96 -124 q4 10 22 12" fill="none" ${K(4)} />
      <path d="M34 -150 C110 -200 150 -130 108 -104 C134 -88 110 -56 46 -92 Z" fill="${CEL}" ${K(6)} />
      <path d="M70 -150 q10 16 4 30 M96 -124 q-4 10 -22 12" fill="none" ${K(4)} />
    </g>
    <ellipse cx="-24" cy="-12" rx="20" ry="11" fill="${SKIN}" ${K(5)} /><ellipse cx="24" cy="-12" rx="20" ry="11" fill="${SKIN}" ${K(5)} />
    <path d="M-40 -172 C-48 -120 -64 -62 -70 -24 Q0 -8 70 -24 C64 -62 48 -120 40 -172 Z" fill="${PAPEL}" ${K(7)} />
    <path d="M-20 -110 q20 10 40 0" fill="none" ${K(4)} />
    <g class="${p}-ang-bi">${hose("M-38 -150 C-70 -136 -84 -114 -86 -92", 10)}${guante(-88, -84, 17, -15)}</g>
    <g class="${p}-ang-bd">${hose("M38 -150 C70 -136 84 -114 86 -92", 10)}${guante(88, -84, 17, 15)}</g>
    <g class="${p}-ang-cab">
      <circle cx="0" cy="-236" r="64" fill="${SKIN}" ${K(7)} />
      <path d="M-14 -298 q8 -30 30 -10 q-16 -6 -16 8" fill="none" ${K(6)} />
      <circle cx="-38" cy="-212" r="11" fill="${RED}" opacity="0.35" /><circle cx="38" cy="-212" r="11" fill="${RED}" opacity="0.35" />
      ${ojo(p, -21, -244, 16, 23, `${p}-ang-oi`)}${ojo(p, 21, -244, 16, 23, `${p}-ang-od`)}
      ${parpado(p, -21, -244, 16, 23, SKIN, "ang-pi")}${parpado(p, 21, -244, 16, 23, SKIN, "ang-pd")}
      <path d="M-40 -280 q12 -8 26 -2 M40 -280 q-12 -8 -26 -2" fill="none" ${K(5)} />
      <path class="${p}-ang-sonrisa" d="M-16 -206 q16 14 32 0" fill="none" ${K(6)} />
      <g class="${p}-ang-bostezo" opacity="0"><ellipse cx="0" cy="-200" rx="20" ry="26" fill="${INK}" /><ellipse cx="0" cy="-186" rx="11" ry="8" fill="${RED}" /></g>
    </g>
    <g class="${p}-ang-halo"><ellipse cx="0" cy="-326" rx="46" ry="12" fill="none" stroke="${INK}" stroke-width="16" /><ellipse cx="0" cy="-326" rx="46" ry="12" fill="none" stroke="${HALO}" stroke-width="9" /></g>
  </g>`;
}

// ---------- DUEÑO (busto; origen: centro de la línea de hombros) ----------
export function dueno(p, { celular = false } = {}) {
  return `<g class="${p}-due">
    <path d="M-300 170 C-300 50 -240 6 -150 -6 L150 -6 C240 6 300 50 300 170 Z" fill="${SEPIA}" ${K(8)} />
    <path d="M-200 30 V170 M-120 8 V170 M120 8 V170 M200 30 V170" fill="none" stroke="${CEL}" stroke-width="16" />
    <path d="M-300 170 C-300 50 -240 6 -150 -6 L150 -6 C240 6 300 50 300 170" fill="none" ${K(8)} />
    <path d="M-60 -10 L0 60 L60 -10" fill="${PAPEL}" ${K(7)} />
    <path d="M-48 -40 V-6 M48 -40 V-6" fill="none" ${K(7)} />
    <g class="${p}-due-cab">
      <ellipse cx="-138" cy="-180" rx="26" ry="34" fill="${SKIN}" ${K(7)} /><ellipse cx="138" cy="-180" rx="26" ry="34" fill="${SKIN}" ${K(7)} />
      <ellipse cx="0" cy="-190" rx="135" ry="152" fill="${SKIN}" ${K(8)} />
      <path d="M-134 -210 q-8 -60 22 -84 q-6 30 10 40 M134 -210 q8 -60 -22 -84 q6 30 -10 40" fill="${INK}" ${K(5)} />
      <path d="M-30 -330 q10 -16 24 -4 M10 -334 q12 -14 22 0" fill="none" ${K(5)} />
      ${ojo(p, -48, -218, 30, 34, `${p}-due-oi`)}${ojo(p, 48, -218, 30, 34, `${p}-due-od`)}
      ${parpado(p, -48, -218, 30, 34, SKIN, "due-pi")}${parpado(p, 48, -218, 30, 34, SKIN, "due-pd")}
      <path d="M-84 -176 q32 14 62 0 M84 -176 q-32 14 -62 0" fill="none" ${K(5)} />
      <path class="${p}-due-cejas" d="M-86 -270 q36 -12 70 6 M86 -270 q-36 -12 -70 6" fill="none" ${K(9)} />
      <ellipse cx="0" cy="-150" rx="34" ry="30" fill="${SKIN}" ${K(7)} />
      <path d="M-4 -118 C-40 -126 -80 -112 -96 -86 C-60 -94 -30 -96 0 -100 C30 -96 60 -94 96 -86 C80 -112 40 -126 4 -118 Z" fill="${INK}" ${K(4)} />
      <path class="${p}-due-boca" d="M-26 -66 q26 -12 52 0" fill="none" ${K(7)} />
      <g class="${p}-due-bostezo" opacity="0"><ellipse cx="0" cy="-62" rx="30" ry="34" fill="${INK}" /><ellipse cx="0" cy="-42" rx="16" ry="10" fill="${RED}" /></g>
    </g>
    ${celular ? `<g class="${p}-due-cel"><rect x="-66" y="14" width="132" height="196" rx="22" fill="${INK}" ${K(6)} /><rect class="${p}-due-pantalla" x="-53" y="32" width="106" height="150" rx="10" fill="#dff0f7" /><g transform="translate(-66 170)">${guante(-6, 0, 30, -30)}</g><g transform="translate(66 170)">${guante(6, 0, 30, 30)}</g></g>` : ""}
  </g>`;
}

// ---------- AGENTE DE IA ----------
export function agente(p, { celular = false } = {}) {
  return `<g class="${p}-age">
    ${hose("M-20 -70 C-22 -46 -26 -30 -32 -16", 12)}${hose("M20 -70 C22 -46 26 -30 32 -16", 12)}
    <ellipse cx="-42" cy="-10" rx="30" ry="14" fill="${INK}" /><ellipse cx="42" cy="-10" rx="30" ry="14" fill="${INK}" />
    <ellipse cx="0" cy="-116" rx="50" ry="58" fill="${INK}" />
    <ellipse cx="0" cy="-100" rx="26" ry="30" fill="${PAPEL}" opacity="0.9" />
    <g class="${p}-age-bi">${hose("M-44 -140 C-78 -128 -92 -108 -96 -86")}${guante(-98, -78, 19, -20)}</g>
    <g class="${p}-age-bd">${hose("M44 -140 C78 -150 92 -170 96 -192")}${guante(98, -198, 19, 10)}
      ${celular ? `<g class="${p}-age-cel"><rect x="104" y="-260" width="58" height="96" rx="10" fill="${INK}" ${K(4)} /><rect x="111" y="-250" width="44" height="72" rx="4" fill="${HALO}" /></g>` : ""}</g>
    <path d="M-26 -186 L0 -172 L-26 -158 Z M26 -186 L0 -172 L26 -158 Z" fill="${RED}" ${K(4)} />
    <g class="${p}-age-cab">
      <path d="M0 -296 V-336" fill="none" ${K(6)} />
      <circle class="${p}-age-luz" cx="0" cy="-344" r="13" fill="${HALO}" ${K(5)} />
      <rect x="-70" y="-300" width="140" height="118" rx="34" fill="${PAPEL}" ${K(7)} />
      <rect x="-54" y="-284" width="108" height="86" rx="22" fill="#dff0f7" ${K(4)} />
      ${ojo(p, -22, -246, 14, 21, `${p}-age-oi`)}${ojo(p, 22, -246, 14, 21, `${p}-age-od`)}
      <path class="${p}-age-sonrisa" d="M-18 -218 q18 14 36 0" fill="none" ${K(5)} />
      <path d="M-78 -232 C-82 -326 82 -326 78 -232" fill="none" ${K(7)} />
      <rect x="-90" y="-262" width="22" height="46" rx="8" fill="${INK}" /><rect x="68" y="-262" width="22" height="46" rx="8" fill="${INK}" />
      <path d="M-80 -220 q8 34 40 38" fill="none" ${K(5)} /><circle cx="-38" cy="-182" r="8" fill="${INK}" />
    </g>
  </g>`;
}

// ---------- SEÑORA DE LOS SÁBADOS ----------
export function senora(p) {
  return `<g class="${p}-sen">
    ${hose("M-18 -60 V-14", 10)}${hose("M18 -60 V-14", 10)}
    <ellipse cx="-26" cy="-10" rx="22" ry="11" fill="${INK}" /><ellipse cx="26" cy="-10" rx="22" ry="11" fill="${INK}" />
    <path d="M-36 -176 C-50 -130 -70 -80 -76 -54 Q0 -40 76 -54 C70 -80 50 -130 36 -176 Z" fill="${CEL}" ${K(7)} />
    <circle cx="-30" cy="-110" r="6" fill="${INK}" /><circle cx="14" cy="-136" r="6" fill="${INK}" /><circle cx="34" cy="-86" r="6" fill="${INK}" /><circle cx="-6" cy="-76" r="6" fill="${INK}" />
    <g class="${p}-sen-bi">${hose("M-34 -160 C-64 -140 -74 -116 -76 -96", 10)}${guante(-78, -88, 16, -15)}</g>
    <g class="${p}-sen-bd">${hose("M34 -160 C64 -140 74 -116 76 -96", 10)}${guante(78, -88, 16, 15)}
      <path d="M62 -92 q16 -30 32 0" fill="none" ${K(5)} /><rect x="56" y="-94" width="46" height="40" rx="8" fill="${RED}" ${K(5)} /></g>
    <g class="${p}-sen-cab">
      <circle cx="0" cy="-292" r="26" fill="#ece5d6" ${K(6)} />
      <circle cx="0" cy="-232" r="60" fill="${SKIN}" ${K(7)} />
      <path d="M-58 -244 q4 -50 58 -54 q54 4 58 54 q-30 -26 -58 -28 q-28 2 -58 28 Z" fill="#ece5d6" ${K(6)} />
      ${ojo(p, -21, -236, 12, 17, `${p}-sen-oi`)}${ojo(p, 21, -236, 12, 17, `${p}-sen-od`)}
      <circle cx="-21" cy="-236" r="22" fill="none" ${K(5)} /><circle cx="21" cy="-236" r="22" fill="none" ${K(5)} /><path d="M-1 -238 h2" ${K(5)} />
      <circle cx="-38" cy="-206" r="9" fill="${RED}" opacity="0.35" /><circle cx="38" cy="-206" r="9" fill="${RED}" opacity="0.35" />
      <path class="${p}-sen-sonrisa" d="M-14 -196 q14 12 28 0" fill="none" ${K(5)} />
      <path d="M-76 -286 Q0 -300 76 -286 L60 -300 Q50 -350 0 -352 Q-50 -350 -60 -300 Z" fill="${RED}" ${K(6)} />
      <circle cx="44" cy="-318" r="12" fill="${HALO}" ${K(4)} />
    </g>
  </g>`;
}

// ---------- utilitarios de dibujo ----------
// globo de diálogo (cuadrado redondeado con colita). cola: "bi" abajo izq, "bd" abajo der
export function globo(cls, x, y, w, h, cola = "bi", fill = PAPEL) {
  const r = 30;
  const c = cola === "bd" ? `L${x + w - 60} ${y + h} L${x + w - 30} ${y + h + 40} L${x + w - 110} ${y + h}` : cola === "bi" ? `L${x + 110} ${y + h} L${x + 30} ${y + h + 40} L${x + 60} ${y + h}` : "";
  return `<path class="${cls}" d="M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} ${c} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z" fill="${fill}" ${K(6)} />`;
}
// nubecita de humo / puf
export function nube(cls, cx, cy, s = 1) {
  return `<g class="${cls}" transform="translate(${cx} ${cy}) scale(${s})"><path d="M-60 20 C-90 20 -90 -20 -60 -20 C-60 -50 -20 -56 -6 -34 C10 -60 54 -50 50 -18 C84 -18 84 22 52 22 Z" fill="${PAPEL}" ${K(6)} /></g>`;
}
// estrellita de 4 puntas
export function chispa(cls, cx, cy, r = 22, fill = HALO) {
  return `<path class="${cls}" d="M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r} Z" fill="${fill}" ${K(4)} />`;
}

// ---------- plantilla de escena ----------
const tiempos = fs.readFileSync("tiempos.md", "utf8");
export function duracion(id) {
  const m = tiempos.match(new RegExp(`### ${id} — dura ([0-9.]+) s \\(inicio global ([0-9.]+)\\)`));
  return { dur: Number(m[1]), ini: Number(m[2]) };
}
export function escena(id, { css = "", svg = "", html = "", js = "", sfx = [] }) {
  const { dur, ini } = duracion(id);
  const p = id.split("-")[0];
  // fase del rebote al compás de la música (la música arranca en 0 global)
  const fase = Math.round(((BEAT - (ini % BEAT)) % BEAT) * 1000) / 1000;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Fredoka"; font-weight: 300 700; font-display: block; src: url("assets/fonts/Fredoka-var.woff2") format("woff2"); }
    @font-face { font-family: "Luckiest Guy"; font-weight: 400; font-display: block; src: url("assets/fonts/LuckiestGuy.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="${id}"] .${p}-capa { position: absolute; inset: 0; }
    [data-composition-id="${id}"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="${id}"] .${p}-txt { font-family: "Fredoka", sans-serif; font-weight: 600; fill: ${INK}; }
    [data-composition-id="${id}"] .${p}-tit { font-family: "Luckiest Guy", sans-serif; fill: ${INK}; }
    [data-composition-id="${id}"] .etiqueta { position: absolute; left: 0; right: 0; top: 1262px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 46px; letter-spacing: 0.06em; color: ${INK}; }
    [data-composition-id="${id}"] .etiqueta span { position: absolute; left: 0; right: 0; opacity: 0; width: fit-content; margin: 0 auto; padding: 8px 28px 2px; background: ${PAPEL}; border: 5px solid ${INK}; border-radius: 16px; white-space: nowrap; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur.toFixed(2)}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${dur.toFixed(2)}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true"><g stroke-linecap="round" stroke-linejoin="round">
${svg}
      </g></svg>
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur.toFixed(2)};
      const FASE = ${fase};
      const BEAT = ${BEAT.toFixed(4)};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: desde ? 1 : 0 });
          if (!desde) tl.to(el, { opacity: 1, duration: 0.04 }, t + i * 0.04);
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t + i * 0.04);
        });
      };
      // aparece con estirón de goma (squash and stretch)
      const pop = (el, t, o, d = 0.45) => {
        gsap.set(el, { opacity: 0 });
        tl.to(el, { opacity: 1, duration: 0.05 }, t);
        tl.fromTo(el, { scaleX: 0.3, scaleY: 1.5, svgOrigin: o }, { scaleX: 1, scaleY: 1, svgOrigin: o, duration: d, ease: "elastic.out(1, 0.45)" }, t);
      };
      const popTxt = (el, t, d = 0.35) => tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2.2)" }, t);
      const fuera = (el, t, d = 0.2) => tl.to(el, { opacity: 0, duration: d }, t);
      // rebote al compás (dibujo animado: todo baila con la música)
      const rebote = (el, o, desde = 0, hasta = DUR, amp = 0.05) => {
        let t = desde + ((FASE - desde) % BEAT + BEAT) % BEAT;
        for (; t + BEAT <= hasta; t += BEAT) {
          tl.to(el, { scaleY: 1 - amp, scaleX: 1 + amp * 0.6, svgOrigin: o, duration: 0.09, ease: "power2.out" }, t);
          tl.to(el, { scaleY: 1, scaleX: 1, svgOrigin: o, duration: BEAT - 0.12, ease: "power1.inOut" }, t + 0.09);
        }
      };
      // parpadeo de párpados (pares de elementos) en los tiempos dados
      const parpadeo = (els, o, ts, base = 0) => ts.forEach((t) => {
        tl.to(els, { scaleY: 1, svgOrigin: o, duration: 0.06 }, t);
        tl.to(els, { scaleY: base, svgOrigin: o, duration: 0.08 }, t + 0.1);
      });
      // etiqueta
      const etq = (sel, t, sale) => { tl.fromTo(q(sel), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t); if (sale) tl.to(q(sel), { opacity: 0, duration: 0.12 }, sale); };
${js}
      // salida
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, "[\n" + sfx.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");
  return { dur, ini, p };
}
// posiciona un personaje y da sus orígenes globales
export function pon(markup, x, y, s = 1, cls = "") {
  return { svg: `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})">${markup}</g>`, o: (lx = 0, ly = 0) => `${Math.round((x + s * lx) * 10) / 10} ${Math.round((y + s * ly) * 10) / 10}` };
}
