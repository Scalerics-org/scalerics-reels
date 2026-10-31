// Generador de las escenas de el-sommelier: correr desde reels/el-sommelier, ej. `node partes/generador/s05-07.mjs`, y después `node armar.mjs`.
// Piezas compartidas de las escenas de el-sommelier (genera HTML plano en compositions/).
import fs from "node:fs";
export const C = {
  tinta: "#1a0a0c", bordo: "#7a1a2c", bordoOsc: "#4f0f1c", vino: "#a3263d", dorado: "#d9ad52", doradoOsc: "#a8822f",
  crema: "#efe4cc", cremaS: "#d9c9a6", roble: "#5a3a22", robleC: "#7a5232", piel: "#d9a77c", pielS: "#c48a5e", vidrio: "#3a0f18",
};
const T = `class="tinta"`;

// ---------- sommelier (cara en 0,0; cuerpo hasta y 290) ----------
export function somm(p, { x, y, s = 1, copa = true, extra = "" }) {
  const brazo = copa
    ? `<g class="${p}-som-brazo">
        <path d="M118 150 Q190 120 205 40" fill="none" stroke="${C.tinta}" stroke-width="58" stroke-linecap="round" />
        <path d="M118 150 Q190 120 205 40" fill="none" stroke="${C.bordo}" stroke-width="48" stroke-linecap="round" />
        ${copaSvg(p, "som-copa", 205, -40, 0.95, 0.42)}
        <circle cx="205" cy="18" r="24" fill="${C.piel}" ${T} stroke-width="4" />
      </g>`
    : "";
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-som">
    <!-- saco bordó, camisa crema, moño negro, catavinos dorado -->
    <path d="M-170 290 Q-160 140 -50 112 L50 112 Q160 140 170 290 Z" fill="${C.bordo}" ${T} />
    <path d="M-40 112 L0 220 L40 112 Z" fill="${C.crema}" ${T} stroke-width="4" />
    <path d="M-50 112 L-6 230 L-70 290 M50 112 L6 230 L70 290" fill="none" stroke="${C.bordoOsc}" stroke-width="8" stroke-linecap="round" />
    <path d="M-28 118 L0 130 L-28 142 Z M28 118 L0 130 L28 142 Z" fill="${C.tinta}" />
    <circle cx="0" cy="130" r="7" fill="${C.tinta}" />
    <path d="M-40 140 Q0 230 40 140" fill="none" stroke="${C.dorado}" stroke-width="3" />
    <ellipse cx="0" cy="206" rx="22" ry="10" fill="${C.dorado}" stroke="${C.doradoOsc}" stroke-width="3" />
    <rect x="-22" y="80" width="44" height="40" fill="${C.pielS}" />
    <g class="${p}-som-cabeza">
      <circle cx="-72" cy="4" r="14" fill="${C.piel}" ${T} stroke-width="4" />
      <circle cx="72" cy="4" r="14" fill="${C.piel}" ${T} stroke-width="4" />
      <ellipse cx="0" cy="0" rx="70" ry="90" fill="${C.piel}" ${T} />
      <!-- pelo engominado para atrás, canas en las sienes -->
      <path d="M-72 -6 Q-82 -104 0 -108 Q82 -104 72 -6 Q66 -60 20 -70 Q-30 -72 -60 -50 Z" fill="#2b1418" ${T} stroke-width="4" />
      <path d="M-66 -36 Q-60 -54 -46 -62 M66 -36 Q60 -54 46 -62" fill="none" stroke="#b9ae9c" stroke-width="7" stroke-linecap="round" />
      <path d="M-40 -84 Q0 -98 44 -82" fill="none" stroke="#5a2a30" stroke-width="5" stroke-linecap="round" />
      <path class="${p}-som-ceja-i" d="M-48 -30 Q-30 -36 -12 -30" fill="none" stroke="${C.tinta}" stroke-width="8" stroke-linecap="round" />
      <path class="${p}-som-ceja-d" d="M12 -40 Q30 -60 50 -44" fill="none" stroke="${C.tinta}" stroke-width="8" stroke-linecap="round" />
      <g class="${p}-som-ojos-snob"><path d="M-42 -12 Q-29 -4 -16 -12 M16 -14 Q29 -6 42 -14" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" /></g>
      <g class="${p}-som-ojos-ab" opacity="0"><circle cx="-29" cy="-12" r="9" fill="${C.tinta}" /><circle cx="29" cy="-14" r="9" fill="${C.tinta}" /><circle cx="-26" cy="-15" r="3" fill="${C.crema}" /><circle cx="32" cy="-17" r="3" fill="${C.crema}" /></g>
      <path d="M2 -16 Q-2 22 -16 30 Q-4 38 8 32" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />
      <!-- bigotito con rulos -->
      <path d="M0 46 Q-22 34 -44 46 Q-56 40 -52 28 M0 46 Q22 34 44 46 Q56 40 52 28" fill="none" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" />
      <path class="${p}-som-boca" d="M-14 64 Q0 58 14 64" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />
      <path class="${p}-som-asco" opacity="0" d="M-24 70 Q-10 58 0 66 Q10 58 24 70" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />
      <path class="${p}-som-sonrisa" opacity="0" d="M-24 60 Q0 82 24 60 Z" fill="${C.bordoOsc}" ${T} stroke-width="4" />
      <ellipse class="${p}-som-cachete" opacity="0" cx="0" cy="66" rx="40" ry="22" fill="${C.piel}" ${T} stroke-width="4" />
      ${extra}
    </g>
    ${brazo}
  </g></g>`;
}

// ---------- copa (base del cáliz en 0,0) ----------
let nCopa = 0;
export function copaSvg(p, cls, x, y, s, nivel = 0.45, vinoColor = C.vino) {
  const id = `${p}-cc${nCopa++}`;
  const h = Math.round(120 * nivel);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-${cls}">
    <clipPath id="${id}"><path d="M-50 -120 Q-66 -22 0 0 Q66 -22 50 -120 Z" /></clipPath>
    <path d="M-50 -120 Q-66 -22 0 0 Q66 -22 50 -120 Z" fill="${C.crema}" fill-opacity="0.12" />
    <g clip-path="url(#${id})"><g class="${p}-${cls}-vino"><rect x="-80" y="${-h}" width="160" height="${h + 130}" fill="${vinoColor}" /><ellipse cx="0" cy="${-h}" rx="60" ry="6" fill="#c2384f" /></g></g>
    <path d="M-50 -120 Q-66 -22 0 0 Q66 -22 50 -120" fill="none" stroke="${C.crema}" stroke-width="5" stroke-linecap="round" />
    <path d="M-36 -96 Q-44 -50 -26 -26" fill="none" stroke="${C.crema}" stroke-width="4" stroke-linecap="round" opacity="0.55" />
    <path d="M0 0 V92" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="0" cy="94" rx="44" ry="9" fill="${C.crema}" fill-opacity="0.15" stroke="${C.crema}" stroke-width="5" />
  </g></g>`;
}

// ---------- botella (pie en 0,0; 440 de alto) ----------
export function botella(p, cls, x, y, s, etiqueta = ["TU LOCAL"], extra = "") {
  const lineas = etiqueta.map((l, i) => `<text class="serif" x="0" y="${-166 + i * 38}" font-size="${l.length > 7 ? 21 : i === 0 ? 26 : 24}" fill="${C.tinta}" text-anchor="middle">${l}</text>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-${cls}">
    <path d="M-68 -250 Q-68 -310 -24 -330 L-24 -410 L24 -410 L24 -330 Q68 -310 68 -250 L68 -14 Q68 0 54 0 L-54 0 Q-68 0 -68 -14 Z" fill="${C.vidrio}" stroke="${C.crema}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-48 -240 Q-50 -120 -46 -30" fill="none" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" opacity="0.35" />
    <rect x="-27" y="-440" width="54" height="72" rx="6" fill="${C.dorado}" stroke="${C.doradoOsc}" stroke-width="4" />
    <rect x="-66" y="-220" width="132" height="${48 + etiqueta.length * 38}" rx="6" fill="${C.crema}" stroke="${C.cremaS}" stroke-width="4" />
    <path d="M-48 -206 H48" stroke="${C.bordo}" stroke-width="4" />
    ${lineas}
    ${extra}
  </g></g>`;
}

// ---------- escupidera (base en 0,0) ----------
export function escupidera(p, cls, x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-${cls}">
    <path d="M-96 -150 L-66 0 L66 0 L96 -150 Z" fill="${C.doradoOsc}" ${T} />
    <path d="M-80 -120 L-58 -20" stroke="${C.dorado}" stroke-width="10" stroke-linecap="round" opacity="0.8" />
    <ellipse cx="0" cy="-150" rx="96" ry="22" fill="${C.dorado}" ${T} />
    <ellipse cx="0" cy="-150" rx="74" ry="13" fill="#2a0d12" />
    <path d="M-60 -76 H60" stroke="${C.tinta}" stroke-width="4" opacity="0.5" />
  </g></g>`;
}

// ---------- barrica (centro en 0,0) ----------
export function barrica(p, cls, x, y, s, tiza = "") {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-${cls}">
    <path d="M-120 -150 Q-150 0 -120 150 L120 150 Q150 0 120 -150 Z" fill="${C.roble}" ${T} />
    <path d="M-60 -150 Q-74 0 -60 150 M0 -150 V150 M60 -150 Q74 0 60 150" fill="none" stroke="#3e2615" stroke-width="5" />
    <path d="M-128 -96 Q0 -86 128 -96 M-138 -40 Q0 -30 138 -40 M-138 40 Q0 50 138 40 M-128 96 Q0 106 128 96" fill="none" stroke="#2a160c" stroke-width="14" />
    ${tiza ? `<rect x="-110" y="-30" width="220" height="68" rx="4" fill="#211012" stroke="#3e2615" stroke-width="4" /><text class="mano" x="0" y="16" font-size="40" fill="${C.crema}" text-anchor="middle">${tiza}</text>` : ""}
  </g></g>`;
}

// ---------- clienta (cara en 0,0) ----------
export function clienta(p, { x, y, s = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-cli">
    <path d="M-160 280 Q-150 130 -40 108 L40 108 Q150 130 160 280 Z" fill="${C.dorado}" ${T} />
    <path d="M-40 108 Q0 150 40 108" fill="none" stroke="${C.doradoOsc}" stroke-width="8" />
    <rect x="-20" y="76" width="40" height="40" fill="${C.pielS}" />
    <g class="${p}-cli-cabeza">
      <circle cx="0" cy="-118" r="44" fill="#3a1a12" ${T} stroke-width="4" />
      <path d="M-74 10 Q-84 -98 0 -100 Q84 -98 74 10 Q76 50 60 70 L-60 70 Q-76 50 -74 10 Z" fill="#3a1a12" ${T} stroke-width="4" />
      <ellipse cx="0" cy="0" rx="62" ry="80" fill="${C.piel}" ${T} />
      <path d="M-62 -20 Q-56 -80 0 -82 Q56 -80 62 -20 Q40 -60 0 -62 Q-30 -60 -62 -20 Z" fill="#3a1a12" />
      <circle cx="-66" cy="34" r="14" fill="none" stroke="${C.dorado}" stroke-width="5" />
      <circle cx="66" cy="34" r="14" fill="none" stroke="${C.dorado}" stroke-width="5" />
      <path class="${p}-cli-cejas" d="M-44 -34 Q-28 -30 -12 -22 M44 -34 Q28 -30 12 -22" fill="none" stroke="#3a1a12" stroke-width="8" stroke-linecap="round" />
      <ellipse class="${p}-cli-ojo" cx="-26" cy="-6" rx="8" ry="10" fill="${C.tinta}" />
      <ellipse class="${p}-cli-ojo" cx="26" cy="-6" rx="8" ry="10" fill="${C.tinta}" />
      <path d="M0 0 Q-6 16 4 20" fill="none" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" />
      <ellipse class="${p}-cli-boca" cx="0" cy="46" rx="18" ry="14" fill="${C.bordoOsc}" ${T} stroke-width="4" />
    </g>
  </g></g>`;
}

// ---------- dueño (cara en 0,0) ----------
export function dueno(p, { x, y, s = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}-due">
    <path d="M-176 290 Q-166 136 -50 112 L50 112 Q166 136 176 290 Z" fill="${C.crema}" ${T} />
    <path d="M-96 290 L-86 150 L86 150 L96 290 Z" fill="${C.robleC}" ${T} />
    <path d="M-86 150 L-50 112 M86 150 L50 112" fill="none" stroke="${C.tinta}" stroke-width="5" />
    <rect x="-24" y="80" width="48" height="40" fill="${C.pielS}" />
    <g class="${p}-due-cabeza">
      <circle cx="-76" cy="4" r="15" fill="${C.piel}" ${T} stroke-width="4" />
      <circle cx="76" cy="4" r="15" fill="${C.piel}" ${T} stroke-width="4" />
      <ellipse cx="0" cy="0" rx="76" ry="88" fill="${C.piel}" ${T} />
      <path d="M-76 -6 Q-80 -50 -54 -66 M76 -6 Q80 -50 54 -66" fill="none" stroke="#b9ae9c" stroke-width="16" stroke-linecap="round" />
      <path class="${p}-due-cejas" d="M-50 -38 Q-32 -30 -12 -24 M50 -38 Q32 -30 12 -24" fill="none" stroke="#8a8070" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="-28" cy="-6" rx="9" ry="11" fill="${C.tinta}" />
      <ellipse cx="28" cy="-6" rx="9" ry="11" fill="${C.tinta}" />
      <path d="M0 -2 Q-8 22 6 26" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />
      <path d="M-54 44 Q-30 26 0 36 Q30 26 54 44 Q44 58 20 52 Q0 60 -20 52 Q-44 58 -54 44 Z" fill="#b9ae9c" ${T} stroke-width="4" />
      <ellipse class="${p}-due-boca" cx="0" cy="68" rx="20" ry="12" fill="${C.bordoOsc}" ${T} stroke-width="4" />
    </g>
  </g></g>`;
}

// ---------- la escena ----------
export function escena({ id, dur, svg, etiquetas = [], js, css = "" }) {
  const p = id.split("-")[0];
  const S = `[data-composition-id="${id}"]`;
  const et = etiquetas.map((e, i) => `<span class="${p}-e${i + 1}">${e}</span>`).join("");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
    @font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${p}-capa { position: absolute; inset: 0; }
    ${S} .${p}-escenario { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .tinta { stroke: #1a0a0c; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .serif { font-family: "Cormorant Garamond", serif; font-weight: 600; }
    ${S} .cursiva { font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; }
    ${S} .mano { font-family: "Caveat", cursive; font-weight: 700; }
    ${S} .ui { font-family: "Lexend", sans-serif; font-weight: 600; }
    ${S} .${p}-etiqueta { position: absolute; left: 0; right: 0; top: 1372px; height: 44px; text-align: center; font-family: "Cormorant Garamond", serif; font-weight: 600; font-size: 34px; letter-spacing: 0.22em; color: #d9ad52; text-transform: uppercase; white-space: nowrap; }
    ${S} .${p}-etiqueta span { position: absolute; left: 0; right: 0; }
    ${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${p}-escenario">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
        </svg>
      </div>
      <div class="${p}-etiqueta">${et}</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => root.querySelectorAll(s);
      const tl = gsap.timeline({ paused: true });
      const pop = (el, t, s) => tl.fromTo(el, { opacity: 0, scale: s ?? 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, t);
      const dibujar = (sel, t, d) => (typeof sel === "string" ? qa(sel) : [sel]).forEach((el) => {
        const L = el.getTotalLength();
        tl.fromTo(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: d ?? 0.6, ease: "power2.inOut" }, t);
      });
      const temblor = (el, t, f) => [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045));
      const etiq = (de, a, t) => {
        if (de) tl.to(q(".${p}-e" + de), { opacity: 0, y: -12, duration: 0.2 }, t - 0.1);
        tl.fromTo(q(".${p}-e" + a), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, t);
      };
      qa(".${p}-etiqueta span").forEach((e) => gsap.set(e, { opacity: 0 }));
${js}
      // salida
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
}
export function sfx(id, arr) {
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(arr));
}
