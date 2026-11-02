// Piezas comunes de las escenas de "El adiestrador": el molde de cada composición, los personajes
// dibujados (Tito el adiestrador, el dueño, Sofía la clienta, el perro, el agente de IA) y los
// objetos del campo (conos, valla, caja registradora, celular, galletita, luna).
// Los usa escenas/hacer.mjs para escribir compositions/sNN-*.html.

export const C = {
  tinta: "#0d2c54", cielo: "#2f7fd0", pasto: "#3a9a48", pasto2: "#23703a",
  nar: "#ff7a1a", tiza: "#fbf9f1", verde: "#5ce611",
};
const { tinta, cielo, pasto, nar, tiza, verde } = C;

// ---------- personajes (cabeza centrada en 0,0; el cuerpo baja hasta y ~330) ----------
// Cada uno tiene .<p>-boca y piezas con clase para animar.

// Tito, el adiestrador: gorra naranja, campera azul tinta con chaleco naranja, silbato colgado,
// riñonera de premios. .<p>-brazo es el brazo derecho que señala (gira con svgOrigin "96 130").
export const tito = (p = "tit") => `
<g class="${p}">
  <path d="M-150 340 L-156 170 Q-152 112 -100 104 L-30 96 L0 130 L30 96 L100 104 Q152 112 156 170 L150 340 Z" fill="${tinta}" stroke="${tiza}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-112 112 L-58 104 L-44 340 L-118 340 Z M112 112 L58 104 L44 340 L118 340 Z" fill="${nar}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-114 230 L-46 230 M114 230 L46 230" stroke="${tiza}" stroke-width="10" />
  <rect x="-96" y="276" width="192" height="50" rx="16" fill="${tinta}" stroke="${tiza}" stroke-width="4" />
  <rect x="-40" y="270" width="80" height="58" rx="12" fill="${nar}" stroke="${tinta}" stroke-width="4" />
  <path d="M-16 290 h32 M-22 302 a8 8 0 1 0 0 -14 M22 302 a8 8 0 1 1 0 -14" stroke="${tinta}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path d="M-24 96 Q0 210 24 96" stroke="${tiza}" stroke-width="4" fill="none" />
  <g class="${p}-silbato"><rect x="-18" y="196" width="40" height="24" rx="10" fill="${tiza}" stroke="${tinta}" stroke-width="4" /><circle cx="-14" cy="208" r="13" fill="${tiza}" stroke="${tinta}" stroke-width="4" /></g>
  <rect x="-22" y="52" width="44" height="50" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="62" ry="72" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <path d="M-66 -26 C-66 -96 66 -96 66 -26 Z" fill="${nar}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-10 -30 C30 -40 92 -36 112 -20 C80 -14 30 -18 -10 -22 Z" fill="${nar}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" />
  <text x="0" y="-48" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="28" fill="${tinta}" data-layout-ignore>T</text>
  <path class="${p}-cejas" d="M-42 -12 L-14 -16 M14 -20 L42 -26" stroke="${tinta}" stroke-width="7" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-26" cy="4" r="7" fill="${tinta}" /><circle cx="26" cy="2" r="7" fill="${tinta}" /></g>
  <path d="M-6 14 Q2 30 -8 34" stroke="${tinta}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path class="${p}-boca" d="M-26 48 Q6 66 34 42" stroke="${tinta}" stroke-width="6" fill="${tiza}" stroke-linecap="round" />
  <path d="M-46 54 Q0 92 46 54" stroke="${tinta}" stroke-width="3" fill="none" opacity="0.35" stroke-dasharray="2 9" stroke-linecap="round" />
  <g class="${p}-brazo">
    <path d="M96 130 L236 40" stroke="${tinta}" stroke-width="44" stroke-linecap="round" />
    <circle cx="250" cy="30" r="26" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
    <path d="M262 18 L304 -8" stroke="${tiza}" stroke-width="16" stroke-linecap="round" />
  </g>
</g>`;

// El dueño: pelado con costados canosos, ojeras, bigote, camisa celeste, collar naranja con chapita.
export const dueno = (p = "due") => `
<g class="${p}">
  <path d="M-150 340 Q-160 170 -106 116 Q-54 98 0 100 Q54 98 106 116 Q160 170 150 340 Z" fill="${cielo}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-40 104 L0 150 L40 104" stroke="${tinta}" stroke-width="5" fill="${tiza}" stroke-linejoin="round" />
  <path d="M0 150 V330" stroke="${tinta}" stroke-width="4" stroke-dasharray="3 26" stroke-linecap="round" />
  <rect x="-24" y="56" width="48" height="50" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <rect x="-40" y="80" width="80" height="22" rx="8" fill="${nar}" stroke="${tinta}" stroke-width="4" />
  <g class="${p}-chapa"><circle cx="0" cy="124" r="18" fill="${tiza}" stroke="${tinta}" stroke-width="4" /><path d="M-8 120 h16 M-8 128 h16" stroke="${tinta}" stroke-width="3" /></g>
  <ellipse cx="-66" cy="6" rx="12" ry="18" fill="${tiza}" stroke="${tinta}" stroke-width="4" /><ellipse cx="66" cy="6" rx="12" ry="18" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="66" ry="76" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <path d="M-66 -6 C-74 -38 -62 -54 -44 -54 M66 -6 C74 -38 62 -54 44 -54" stroke="${tinta}" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.35" />
  <path d="M-10 -66 Q0 -82 12 -66" stroke="${tinta}" stroke-width="3" fill="none" opacity="0.6" />
  <path class="${p}-cejas" d="M-46 -30 L-12 -22 M12 -22 L46 -30" stroke="${tinta}" stroke-width="7" stroke-linecap="round" />
  <g class="${p}-ojos">
    <circle cx="-26" cy="-4" r="6" fill="${tinta}" /><circle cx="26" cy="-4" r="6" fill="${tinta}" />
    <path class="${p}-parp" d="M-40 -8 Q-26 -16 -12 -8 M12 -8 Q26 -16 40 -8" stroke="${tinta}" stroke-width="5" fill="none" stroke-linecap="round" />
  </g>
  <path d="M-40 12 Q-26 20 -12 12 M12 12 Q26 20 40 12" stroke="${tinta}" stroke-width="3" fill="none" opacity="0.5" />
  <ellipse cx="0" cy="22" rx="14" ry="16" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <path class="${p}-boca" d="M-18 56 Q0 48 18 56" stroke="${tinta}" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M-42 46 C-32 30 -8 32 0 38 C8 32 32 30 42 46 C26 42 12 48 0 44 C-12 48 -26 42 -42 46 Z" fill="${tinta}" stroke="${tinta}" stroke-width="3" stroke-linejoin="round" />
  <g class="${p}-zzz" opacity="0"><text x="70" y="-70" font-family="Lexend" font-weight="900" font-size="54" fill="${tiza}" stroke="${tinta}" stroke-width="3">Z</text><text x="116" y="-118" font-family="Lexend" font-weight="900" font-size="40" fill="${tiza}" stroke="${tinta}" stroke-width="3">z</text></g>
</g>`;

// Sofía, la clienta: pelo largo, remera naranja, aros.
export const sofia = (p = "sof") => `
<g class="${p}">
  <path d="M-70 -30 C-120 40 -110 150 -84 200 L84 200 C110 150 120 40 70 -30 Z" fill="${tinta}" stroke="${tiza}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-124 340 L-130 172 Q-126 114 -86 106 L-26 98 Q0 124 26 98 L86 106 Q126 114 130 172 L124 340 Z" fill="${nar}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-20" y="52" width="40" height="50" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="58" ry="70" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <path d="M-62 10 C-74 -64 -30 -96 8 -92 C52 -88 74 -52 62 6 C46 -36 24 -48 -2 -50 C-16 -26 -40 -18 -62 10 Z" fill="${tinta}" stroke="${tiza}" stroke-width="4" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-36 -24 L-12 -20 M12 -20 L36 -24" stroke="${tinta}" stroke-width="5" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-22" cy="-2" r="7" fill="${tinta}" /><circle cx="22" cy="-2" r="7" fill="${tinta}" /></g>
  <circle cx="-58" cy="24" r="8" fill="${nar}" stroke="${tinta}" stroke-width="3" /><circle cx="58" cy="24" r="8" fill="${nar}" stroke="${tinta}" stroke-width="3" />
  <ellipse class="${p}-boca" cx="0" cy="38" rx="13" ry="8" fill="${tinta}" />
</g>`;

// El perro: sentado, blanco con manchas, oreja caída, collar naranja. Centro de la cabeza en 0,0;
// apoya en y ~230. .<p>-cola se mueve (svgOrigin "70 190").
export const perro = (p = "per") => `
<g class="${p}">
  <path class="${p}-cola" d="M70 190 C120 180 140 140 132 104" stroke="${tinta}" stroke-width="22" stroke-linecap="round" fill="none" />
  <path class="${p}-cola" d="M70 190 C120 180 140 140 132 104" stroke="${tiza}" stroke-width="12" stroke-linecap="round" fill="none" />
  <path d="M-70 230 C-90 150 -60 60 0 50 C60 60 96 150 76 230 Z" fill="${tiza}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <ellipse cx="34" cy="140" rx="26" ry="20" fill="${tinta}" opacity="0.85" />
  <path d="M-44 230 V170 M-14 230 V176" stroke="${tinta}" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="-44" cy="232" rx="22" ry="10" fill="${tiza}" stroke="${tinta}" stroke-width="4" /><ellipse cx="-12" cy="232" rx="22" ry="10" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <rect x="-44" y="44" width="88" height="20" rx="8" fill="${nar}" stroke="${tinta}" stroke-width="4" />
  <circle cx="0" cy="76" r="11" fill="${tiza}" stroke="${tinta}" stroke-width="3" />
  <ellipse cx="0" cy="0" rx="56" ry="52" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
  <path d="M-46 -30 C-90 -26 -88 40 -60 50 C-50 30 -46 0 -46 -30 Z" fill="${tinta}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" />
  <path d="M40 -36 C70 -60 92 -30 74 6 C62 -6 50 -18 40 -36 Z" fill="${tiza}" stroke="${tinta}" stroke-width="4" stroke-linejoin="round" />
  <ellipse cx="18" cy="-14" rx="16" ry="14" fill="${tinta}" opacity="0.85" />
  <g class="${p}-ojos"><circle cx="-18" cy="-8" r="7" fill="${tinta}" /><circle cx="20" cy="-10" r="6" fill="${tiza}" /><circle cx="20" cy="-10" r="4" fill="${tinta}" /></g>
  <ellipse cx="0" cy="24" rx="40" ry="26" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <ellipse cx="4" cy="12" rx="12" ry="9" fill="${tinta}" />
  <path class="${p}-boca" d="M-14 34 Q4 44 22 32" stroke="${tinta}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path class="${p}-lengua" d="M6 38 C4 60 22 62 22 40" fill="${nar}" stroke="${tinta}" stroke-width="3" />
</g>`;

// el agente de IA: una cara amable verde con auriculares, sobre un cuerpito de pantalla
export const agente = (p = "age") => `
<g class="${p}">
  <path d="M-70 -10 C-70 -90 70 -90 70 -10" stroke="${tinta}" stroke-width="10" fill="none" stroke-linecap="round" />
  <rect x="-64" y="-64" width="128" height="120" rx="40" fill="${verde}" stroke="${tinta}" stroke-width="5" />
  <rect x="-88" y="-24" width="30" height="50" rx="12" fill="${tinta}" stroke="${tiza}" stroke-width="4" />
  <rect x="58" y="-24" width="30" height="50" rx="12" fill="${tinta}" stroke="${tiza}" stroke-width="4" />
  <path d="M74 26 Q74 70 24 70" stroke="${tinta}" stroke-width="5" fill="none" /><circle cx="20" cy="70" r="8" fill="${tinta}" />
  <g class="${p}-ojos"><rect x="-32" y="-26" width="16" height="26" rx="8" fill="${tinta}" /><rect x="16" y="-26" width="16" height="26" rx="8" fill="${tinta}" /></g>
  <path class="${p}-boca" d="M-22 22 Q0 40 22 22" stroke="${tinta}" stroke-width="6" fill="none" stroke-linecap="round" />
</g>`;

// ---------- objetos ----------
export const cono = (x, y, s = 1) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-44 0 L-12 -120 Q0 -130 12 -120 L44 0 Z" fill="${nar}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-30 -52 L30 -52 L24 -76 L-24 -76 Z" fill="${tiza}" />
  <rect x="-62" y="-8" width="124" height="18" rx="6" fill="${nar}" stroke="${tinta}" stroke-width="5" />
</g>`;

export const valla = (x, y, w = 260, s = 1) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 0 V-130 M${w} 0 V-130" stroke="${tiza}" stroke-width="12" stroke-linecap="round" />
  <path d="M0 0 V-130 M${w} 0 V-130" stroke="${tinta}" stroke-width="3" stroke-linecap="round" opacity="0.4" />
  <rect x="-8" y="-118" width="${w + 16}" height="30" rx="8" fill="${nar}" stroke="${tinta}" stroke-width="4" />
  ${Array.from({ length: Math.floor(w / 60) }, (_, i) => `<rect x="${20 + i * 60}" y="-118" width="26" height="30" fill="${tiza}" />`).join("")}
  <path d="M-22 0 H22 M${w - 22} 0 H${w + 22}" stroke="${tiza}" stroke-width="10" stroke-linecap="round" />
</g>`;

// caja registradora (centro abajo en 0,0; .<p>-cajon sale)
export const caja = (p = "caj") => `
<g class="${p}">
  <rect class="${p}-cajon" x="-150" y="-70" width="300" height="56" rx="8" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
  <path class="${p}-cajon" d="M-30 -42 H30" stroke="${tinta}" stroke-width="6" stroke-linecap="round" />
  <path d="M-170 -60 L-150 -210 H150 L170 -60 Z" fill="${nar}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-120" y="-196" width="240" height="70" rx="8" fill="${tinta}" />
  ${[0, 1].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${-110 + c * 46}" y="${-114 + r * 26}" width="36" height="18" rx="4" fill="${tiza}" stroke="${tinta}" stroke-width="2" />`).join("")).join("")}
  <rect x="-60" y="-280" width="120" height="70" rx="10" fill="${tinta}" stroke="${tiza}" stroke-width="4" />
  <text x="0" y="-232" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${verde}" data-layout-ignore>$ 0</text>
  <rect x="-200" y="-14" width="400" height="20" rx="6" fill="${tinta}" />
</g>`;

// celular grande (marco en x 290-790, y 560-1350) con encabezado de chat
export const celular = (titulo, sub = "en línea", colorAvatar = nar) => `
  <rect x="290" y="560" width="500" height="790" rx="56" fill="${tinta}" stroke="${tiza}" stroke-width="6" />
  <rect x="310" y="580" width="460" height="750" rx="40" fill="${tiza}" />
  <rect x="490" y="592" width="100" height="18" rx="9" fill="${tinta}" />
  <rect x="310" y="622" width="460" height="96" fill="${cielo}" />
  <circle cx="368" cy="670" r="28" fill="${colorAvatar}" stroke="${tiza}" stroke-width="3" />
  <text x="412" y="664" font-family="Lexend" font-weight="700" font-size="30" fill="${tiza}">${titulo}</text>
  <text x="412" y="698" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${tiza}" opacity="0.85" data-layout-ignore>${sub}</text>`;

// globo de chat (x, y = esquina superior izquierda). "|" corta línea.
export const globo = (cls, x, y, w, texto, { mio = false, hora = "", tildes = "", color } = {}) => {
  const fill = color || (mio ? "#dfeefc" : "#ffffff");
  const lineas = texto.split("|");
  const h = 30 + lineas.length * 42 + (hora ? 30 : 0);
  const tc = tildes === "azul" ? cielo : tinta;
  return `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${tinta}" stroke-width="4" />
    ${lineas.map((l, i) => `<text x="${x + 24}" y="${y + 50 + i * 42}" font-family="Lexend" font-weight="600" font-size="32" fill="${tinta}">${l}</text>`).join("")}
    ${hora ? `<text x="${x + w - (tildes ? 70 : 24)}" y="${y + h - 16}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${tinta}" opacity="0.7" data-layout-ignore>${hora}</text>` : ""}
    ${tildes ? `<path class="${cls}-t" d="M${x + w - 60} ${y + h - 26} l8 8 l14 -16 M${x + w - 44} ${y + h - 18} l14 -16" stroke="${tc}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />` : ""}
  </g>`;
};

// galletita con forma de hueso (centro 0,0)
export const galletita = (p = "gal") => `
<g class="${p}">
  <path d="M-60 -14 C-70 -40 -40 -50 -34 -26 L34 -26 C40 -50 70 -40 60 -14 C76 -6 76 6 60 14 C70 40 40 50 34 26 L-34 26 C-40 50 -70 40 -60 14 C-76 6 -76 -6 -60 -14 Z" fill="#e8b86a" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <circle cx="-18" cy="-4" r="4" fill="${tinta}" opacity="0.5" /><circle cx="6" cy="6" r="4" fill="${tinta}" opacity="0.5" /><circle cx="22" cy="-8" r="4" fill="${tinta}" opacity="0.5" />
</g>`;

// tablero de obediencia (centro arriba en 0,0)
export const tablero = (p, num, ancho = 520) => `
<g class="${p}">
  <rect x="${-ancho / 2}" y="0" width="${ancho}" height="330" rx="26" fill="${tinta}" stroke="${tiza}" stroke-width="6" />
  <rect x="${-ancho / 2}" y="0" width="${ancho}" height="70" rx="26" fill="${nar}" stroke="${tiza}" stroke-width="6" />
  <text x="0" y="48" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="32" fill="${tinta}" letter-spacing="5">OBEDIENCIA</text>
  <text class="${p}-num" x="-30" y="270" text-anchor="end" font-family="Lexend" font-weight="900" font-size="190" fill="${tiza}">${num}</text>
  <text x="-10" y="270" font-family="Lexend" font-weight="800" font-size="80" fill="${tiza}" opacity="0.55">/10</text>
</g>`;

// ---------- el molde de una escena ----------
export function escena({ id, dur, css = "", html, js }) {
  const S = `[data-composition-id="${id}"]`;
  const pre = id.split("-")[0];
  return `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${pre}-capa { position: absolute; inset: 0; }
    ${S} .${pre}-esc { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; }
    ${S} .grito { font-weight: 900; color: ${tiza}; -webkit-text-stroke: 4px ${tinta}; paint-order: stroke fill; text-shadow: 8px 8px 0 ${tinta}; }
    ${S} .grito.nar { color: ${nar}; }
    ${S} .zoc { position: absolute; left: 50px; top: 1386px; display: flex; height: 100px; border: 4px solid ${tinta}; border-radius: 10px; overflow: hidden; box-shadow: 8px 8px 0 rgba(13, 44, 84, 0.6); }
    ${S} .zoc .tab { display: flex; align-items: center; padding: 0 18px; background: ${nar}; color: ${tinta}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
    ${S} .zoc .tab.verde { background: ${verde}; color: ${tinta}; }
    ${S} .zoc .tit { display: flex; align-items: center; padding: 0 26px; background: ${tiza}; color: ${tinta}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; letter-spacing: -0.01em; text-transform: uppercase; white-space: nowrap; }
    ${S} .sello b { display: inline-block; padding: 10px 28px; border: 7px solid ${nar}; border-radius: 14px; color: ${nar}; background: rgba(13, 44, 84, 0.9); font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${pre}-escena" class="${pre}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${pre}-esc">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const lista = (x) => (typeof x === "string" ? qa(x) : Array.isArray(x) ? x : [x]);
      // trazo que se dibuja solo (opacity 0 hasta que arranca: sin puntitos de los caps)
      const dibujar = (sel, t, d = 0.6) => lista(sel).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L + 1, strokeDashoffset: L + 1, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      // aparece entero con rebote
      const pop = (sel, t, d = 0.35, s = 0.8) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: s, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.8)", immediateRender: false }, t);
      });
      // cae de golpe, como un sello
      const golpe = (sel, t, s = 2.2) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: s, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      });
      const fuera = (sel, t, d = 0.25) => tl.to(lista(sel), { opacity: 0, duration: d }, t);
      const sacudon = (t, f = 1, sel = ".${pre}-esc") => [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(sel), { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // la boca se mueve mientras habla
      const hablar = (sel, t0, t1) => {
        const n = Math.max(1, Math.floor((t1 - t0) / 0.12));
        tl.fromTo(q(sel), { scaleY: 0.45, transformOrigin: "50% 50%" }, { scaleY: 1.3, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0);
      };
      // la cola del perro
      const cola = (sel, t, veces = 5) => tl.fromTo(qa(sel), { rotation: -12, svgOrigin: "70 190" }, { rotation: 14, svgOrigin: "70 190", duration: 0.16, yoyo: true, repeat: veces * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      // zócalos: cada uno entra desde la izquierda y saca al anterior
      const zocalos = (pares) => pares.forEach(([sel, t], i) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out", immediateRender: false }, t);
        if (i > 0) tl.to(q(pares[i - 1][0]), { opacity: 0, y: 30, duration: 0.18 }, t);
      });

${js}

      // salida: blur
      tl.to(q("#${pre}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
}
