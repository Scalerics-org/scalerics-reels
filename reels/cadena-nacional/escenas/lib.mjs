// Piezas comunes de las escenas de "Cadena nacional": el molde de cada composición, los
// personajes dibujados (el Presidente del Local, el periodista, la vecina, la gente de la calle,
// el agente de IA) y la utilería oficial (atril, escudo, bandera de fantasía, cortinado, celular).
// Los usa escenas/hacer.mjs para escribir compositions/sNN-*.html.

export const C = {
  noche: "#071640", azul2: "#0e2766", azul: "#163a8c",
  oro: "#e0b13a", blanco: "#f7f4ea", rojo: "#d7262e", verde: "#5ce611",
};
const { noche, azul2, azul, oro, blanco, rojo, verde } = C;

// ---------- utilería oficial ----------
// escudo del local: taza humeante entre laureles, cinta con el lema (centro 0,0; ~300 x 340)
export const escudo = (p = "esc", k = 1) => `
<g class="${p}" transform="scale(${k})">
  <g class="${p}-laurel" fill="${oro}" stroke="${noche}" stroke-width="3">
    ${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${-150 + i * 4}" cy="${100 - i * 44}" rx="14" ry="30" transform="rotate(${-30 + i * 8} ${-150 + i * 4} ${100 - i * 44})" />
    <ellipse cx="${150 - i * 4}" cy="${100 - i * 44}" rx="14" ry="30" transform="rotate(${30 - i * 8} ${150 - i * 4} ${100 - i * 44})" />`).join("")}
  </g>
  <path d="M-110 -130 H110 V20 C110 100 50 140 0 160 C-50 140 -110 100 -110 20 Z" fill="${azul}" stroke="${oro}" stroke-width="10" stroke-linejoin="round" />
  <path d="M-110 -60 H110" stroke="${oro}" stroke-width="6" />
  ${[-70, -35, 0, 35, 70].map((x) => `<circle cx="${x}" cy="-95" r="9" fill="${oro}" />`).join("")}
  <g class="${p}-taza">
    <path class="${p}-humo" d="M-26 -38 c-12 -14 12 -22 0 -36 M4 -38 c-12 -14 12 -22 0 -36 M34 -38 c-12 -14 12 -22 0 -36" stroke="${blanco}" stroke-width="6" fill="none" stroke-linecap="round" />
    <path d="M-50 -20 H58 L50 50 Q46 74 22 74 H-14 Q-38 74 -42 50 Z" fill="${blanco}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
    <path d="M54 -6 C86 -6 86 40 50 40" stroke="${blanco}" stroke-width="10" fill="none" stroke-linecap="round" />
    <path d="M-66 84 H76" stroke="${blanco}" stroke-width="8" stroke-linecap="round" />
  </g>
  <path d="M-170 150 L-130 130 H130 L170 150 L130 172 H-130 Z" fill="${rojo}" stroke="${oro}" stroke-width="4" stroke-linejoin="round" />
  <text x="0" y="162" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="26" fill="${blanco}" letter-spacing="3" data-layout-ignore>CUANDO PUEDO</text>
</g>`;

// bandera de fantasía del local (asta en x=0, paño a la derecha; ~220 x 150)
export const bandera = (p = "ban", espejo = false) => `
<g class="${p}" ${espejo ? 'transform="scale(-1 1)"' : ""}>
  <path d="M0 -40 V420" stroke="${oro}" stroke-width="10" stroke-linecap="round" />
  <circle cx="0" cy="-48" r="14" fill="${oro}" />
  <g class="${p}-pano">
    <path d="M6 -24 C80 -40 150 -8 226 -24 V130 C150 146 80 114 6 130 Z" fill="${azul}" stroke="${oro}" stroke-width="6" />
    <path d="M6 112 L226 -10" stroke="${oro}" stroke-width="14" opacity="0.5" />
    <circle cx="116" cy="52" r="44" fill="${blanco}" stroke="${oro}" stroke-width="5" />
    <g transform="translate(${espejo ? "116 54) scale(-1 1)" : "116 54)"}"><path d="M-22 -14 H24 L20 14 Q18 22 8 22 H-8 Q-18 22 -20 14 Z" fill="${rojo}" /><path d="M22 -6 C36 -6 36 12 20 12" stroke="${rojo}" stroke-width="5" fill="none" /></g>
  </g>
</g>`;

// atril con micrófonos (arriba del atril en y=0; centro x=0; ~380 x 420)
export const atril = (p = "atr") => `
<g class="${p}">
  <g class="${p}-mics" stroke="${blanco}" stroke-width="5" stroke-linecap="round">
    <path d="M-60 0 L-80 -90 M-20 0 L-30 -110 M20 0 L34 -104 M60 0 L86 -84" fill="none" />
    <rect x="-100" y="-130" width="40" height="52" rx="18" fill="${noche}" transform="rotate(-12 -80 -104)" />
    <rect x="-50" y="-148" width="40" height="52" rx="18" fill="${rojo}" transform="rotate(-5 -30 -122)" />
    <rect x="14" y="-142" width="40" height="52" rx="18" fill="${azul}" transform="rotate(7 34 -116)" />
    <rect x="66" y="-122" width="40" height="52" rx="18" fill="${oro}" transform="rotate(14 86 -96)" />
  </g>
  <path d="M-210 0 H210 L180 420 H-180 Z" fill="${azul2}" stroke="${oro}" stroke-width="7" stroke-linejoin="round" />
  <path d="M-230 -14 H230 V12 H-230 Z" fill="${azul}" stroke="${oro}" stroke-width="6" stroke-linejoin="round" />
  <path d="M-170 40 H170 L148 390 H-148 Z" fill="none" stroke="${oro}" stroke-width="3" opacity="0.6" />
  <g transform="translate(0 200)">${escudo(p + "-e", 0.62)}</g>
</g>`;

// cortinado: paño con pliegues y borlas (lado izquierdo; con espejo para el derecho)
export const cortina = (p = "cor", espejo = false) => `
<g class="${p}" ${espejo ? 'transform="translate(1080 0) scale(-1 1)"' : ""}>
  <path d="M-20 520 H200 C170 760 150 1000 230 1360 H-20 Z" fill="${azul}" stroke="${oro}" stroke-width="5" />
  <path d="M40 540 C40 800 60 1100 70 1360 M100 540 C100 800 120 1100 140 1360 M160 540 C150 760 150 1020 190 1360" stroke="${noche}" stroke-width="6" fill="none" opacity="0.5" />
  <path d="M200 900 C150 930 60 930 -20 900" stroke="${oro}" stroke-width="12" fill="none" stroke-linecap="round" />
  <circle cx="190" cy="905" r="16" fill="${oro}" /><path d="M182 920 L174 970 H206 L198 920 Z" fill="${oro}" />
</g>`;

// cenefa de arriba del cortinado
export const cenefa = (y = 520) => `
<path d="M-20 ${y} H1100 V${y + 60} ${[...Array(12)].map((_, i) => `Q${1100 - i * 93 - 46} ${y + 110} ${1100 - (i + 1) * 93} ${y + 60}`).join(" ")} Z" fill="${rojo}" stroke="${oro}" stroke-width="5" />
<path d="M-20 ${y + 14} H1100" stroke="${oro}" stroke-width="4" opacity="0.8" />`;

// ---------- personajes (cabeza centrada en 0,0; el cuerpo baja hasta y ~330) ----------
export const presidente = (p = "pre") => `
<g class="${p}">
  <path d="M-170 360 L-176 170 Q-170 110 -112 102 L-36 96 L0 150 L36 96 L112 102 Q170 110 176 170 L170 360 Z" fill="${noche}" stroke="${blanco}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-36 96 L0 150 L36 96 Z" fill="${blanco}" />
  <path d="M-12 112 L12 112 L18 250 L0 272 L-18 250 Z" fill="${rojo}" stroke="${noche}" stroke-width="3" />
  <g class="${p}-banda">
    <path d="M-120 104 L-82 100 L140 330 L100 350 Z" fill="${oro}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
    <path d="M-104 102 L-96 101 L124 338 L116 342 Z" fill="${rojo}" />
    <circle cx="78" cy="300" r="22" fill="${oro}" stroke="${noche}" stroke-width="4" /><circle cx="78" cy="300" r="10" fill="${rojo}" />
  </g>
  <rect x="-24" y="54" width="48" height="50" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="-68" cy="2" rx="13" ry="19" fill="${blanco}" stroke="${noche}" stroke-width="4" /><ellipse cx="68" cy="2" rx="13" ry="19" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="68" ry="80" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <path d="M-70 -14 C-78 -84 -30 -104 10 -100 C54 -98 80 -70 70 -14 C62 -46 50 -56 30 -60 C10 -50 -14 -70 -40 -60 C-56 -52 -64 -36 -70 -14 Z" fill="${noche}" stroke="${blanco}" stroke-width="3" stroke-linejoin="round" />
  <path d="M-30 -94 C-24 -78 -22 -68 -26 -58" stroke="${blanco}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path d="M-70 -14 C-74 -30 -72 -40 -66 -48 M70 -14 C74 -30 72 -40 66 -48" stroke="${blanco}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.6" />
  <g class="${p}-cejas"><path class="${p}-ci" d="M-48 -34 L-12 -30" stroke="${noche}" stroke-width="10" stroke-linecap="round" /><path class="${p}-cd" d="M12 -30 L48 -34" stroke="${noche}" stroke-width="10" stroke-linecap="round" /></g>
  <g class="${p}-ojos"><circle cx="-28" cy="-10" r="6.5" fill="${noche}" /><circle cx="28" cy="-10" r="6.5" fill="${noche}" /></g>
  <path d="M-6 0 Q-10 22 0 26 Q10 22 6 0" stroke="${noche}" stroke-width="4" fill="${blanco}" stroke-linejoin="round" />
  <ellipse class="${p}-boca" cx="0" cy="56" rx="16" ry="9" fill="${noche}" />
  <path d="M-54 44 C-40 24 -10 26 0 36 C10 26 40 24 54 44 C34 40 14 48 0 42 C-14 48 -34 40 -54 44 Z" fill="${noche}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
  <g class="${p}-gotas" opacity="0"><path d="M-74 -40 c-8 14 -8 24 0 26 c8 -2 8 -12 0 -26 Z M76 -30 c-8 14 -8 24 0 26 c8 -2 8 -12 0 -26 Z" fill="${blanco}" stroke="${azul}" stroke-width="3" /></g>
</g>`;

export const periodista = (p = "per") => `
<g class="${p}">
  <path d="M-150 360 L-156 170 Q-150 112 -100 104 L-30 98 L0 140 L30 98 L100 104 Q150 112 156 170 L150 360 Z" fill="${azul}" stroke="${blanco}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-30 98 L0 140 L30 98" fill="none" stroke="${blanco}" stroke-width="5" />
  <path d="M-60 120 V360 M60 120 V360" stroke="${noche}" stroke-width="4" opacity="0.6" />
  <rect x="-22" y="52" width="44" height="52" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="60" ry="72" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <path d="M-62 -6 C-70 -70 -20 -94 18 -86 C56 -80 70 -50 62 -6 C54 -36 30 -44 4 -40 C-24 -36 -46 -30 -62 -6 Z" fill="${noche}" stroke="${blanco}" stroke-width="3" />
  <path d="M-66 -10 C-66 -64 66 -64 66 -10" stroke="${blanco}" stroke-width="6" fill="none" />
  <rect x="58" y="-18" width="18" height="32" rx="8" fill="${noche}" stroke="${blanco}" stroke-width="3" />
  <path d="M66 14 C66 34 44 44 30 44" stroke="${blanco}" stroke-width="3" fill="none" />
  <g class="${p}-ojos"><circle cx="-22" cy="-6" r="6" fill="${noche}" /><circle cx="22" cy="-6" r="6" fill="${noche}" /></g>
  <path d="M-36 -24 L-12 -22 M12 -22 L36 -24" stroke="${noche}" stroke-width="5" stroke-linecap="round" />
  <ellipse class="${p}-boca" cx="0" cy="38" rx="14" ry="9" fill="${noche}" />
  <g class="${p}-mic" transform="translate(-110 120) rotate(-20)">
    <rect x="-10" y="0" width="20" height="120" rx="8" fill="${noche}" stroke="${blanco}" stroke-width="3" />
    <rect x="-26" y="10" width="52" height="40" rx="6" fill="${oro}" stroke="${noche}" stroke-width="3" />
    <text x="0" y="40" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="24" fill="${noche}" data-layout-ignore>CN</text>
    <circle cx="0" cy="-10" r="26" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  </g>
</g>`;

// vecina (Leda): colita, blusa roja
export const vecina = (p = "vec") => `
<g class="${p}">
  <path d="M56 -50 C126 -40 146 40 116 130 C106 160 86 170 76 160 C106 90 96 10 46 -20 Z" fill="${noche}" stroke="${blanco}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-120 360 L-128 170 Q-124 112 -84 104 L-26 96 Q0 120 26 96 L84 104 Q124 112 128 170 L120 360 Z" fill="${rojo}" stroke="${blanco}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-20" y="52" width="40" height="50" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="58" ry="70" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <path d="M-62 10 C-74 -62 -30 -96 10 -90 C52 -86 72 -52 62 4 C50 -26 30 -40 4 -42 C-12 -24 -40 -18 -62 10 Z" fill="${noche}" stroke="${blanco}" stroke-width="4" stroke-linejoin="round" />
  <circle cx="50" cy="-58" r="12" fill="${oro}" />
  <path class="${p}-cejas" d="M-38 -30 L-12 -20 M12 -20 L38 -30" stroke="${noche}" stroke-width="6" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-22" cy="-4" r="7" fill="${noche}" /><circle cx="22" cy="-4" r="7" fill="${noche}" /></g>
  <circle cx="-56" cy="24" r="7" fill="${oro}" /><circle cx="56" cy="24" r="7" fill="${oro}" />
  <ellipse class="${p}-boca" cx="0" cy="38" rx="15" ry="10" fill="${noche}" />
</g>`;

// cacerola con cuchara (centro 0,0; ~200 x 120)
export const cacerola = (p = "cac") => `
<g class="${p}">
  <path d="M-80 -30 H80 V30 Q80 60 50 60 H-50 Q-80 60 -80 30 Z" fill="${azul}" stroke="${blanco}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-92 -34 H92" stroke="${blanco}" stroke-width="8" stroke-linecap="round" />
  <path d="M-80 -10 H-120 M80 -10 H120" stroke="${blanco}" stroke-width="12" stroke-linecap="round" />
  <path d="M-60 0 Q0 12 60 0" stroke="${blanco}" stroke-width="3" fill="none" opacity="0.4" />
  <g class="${p}-cuch"><path d="M30 -60 L110 -150" stroke="${oro}" stroke-width="10" stroke-linecap="round" /><ellipse cx="20" cy="-48" rx="18" ry="12" fill="${oro}" transform="rotate(-48 20 -48)" /></g>
</g>`;

// persona de la calle (silueta simple; cabeza en 0,0)
export const gente = (p, ropa = azul, pelo = noche) => `
<g class="${p}">
  <path d="M-80 260 L-84 120 Q-80 76 -46 70 L46 70 Q80 76 84 120 L80 260 Z" fill="${ropa}" stroke="${blanco}" stroke-width="4" stroke-linejoin="round" />
  <ellipse cx="0" cy="0" rx="42" ry="50" fill="${blanco}" stroke="${noche}" stroke-width="4" />
  <path d="M-44 -4 C-50 -50 -16 -64 6 -60 C36 -56 50 -36 44 -4 C34 -26 -20 -30 -44 -4 Z" fill="${pelo}" stroke="${blanco}" stroke-width="3" />
  <circle cx="-15" cy="2" r="5" fill="${noche}" /><circle cx="15" cy="2" r="5" fill="${noche}" />
  <path d="M-26 -14 L-6 -8 M6 -8 L26 -14" stroke="${noche}" stroke-width="4" stroke-linecap="round" />
  <ellipse class="${p}-boca" cx="0" cy="26" rx="11" ry="9" fill="${noche}" />
</g>`;

// cartel de protesta (palo + cartón; centro del cartón en 0,0)
export const cartel = (p, lineas, w = 300, color = rojo, fondo = blanco) => {
  const L = lineas.split("|");
  const h = 40 + L.length * 52;
  return `<g class="${p}">
  <path d="M0 ${h / 2} V${h / 2 + 200}" stroke="${oro}" stroke-width="12" stroke-linecap="round" />
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="${fondo}" stroke="${noche}" stroke-width="5" />
  ${L.map((l, i) => `<text x="0" y="${-h / 2 + 62 + i * 52}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${color}">${l}</text>`).join("")}
</g>`;
};

// agente de IA: pantalla con cara amable verde, auriculares y banda de ministro (centro 0,0)
export const agente = (p = "age", banda = true) => `
<g class="${p}">
  ${banda ? `<path d="M-150 360 L-156 190 Q-150 140 -100 132 L100 132 Q150 140 156 190 L150 360 Z" fill="${noche}" stroke="${verde}" stroke-width="5" stroke-linejoin="round" />
  <g class="${p}-banda"><path d="M-110 134 L-70 132 L140 336 L100 356 Z" fill="${oro}" stroke="${noche}" stroke-width="3" /><path d="M-94 133 L-86 133 L124 344 L116 348 Z" fill="${rojo}" />
  <circle cx="70" cy="300" r="22" fill="${oro}" stroke="${noche}" stroke-width="4" /><circle cx="70" cy="300" r="10" fill="${verde}" /></g>
  <rect x="-22" y="100" width="44" height="36" fill="${verde}" opacity="0.6" />` : ""}
  <path d="M-128 -10 C-128 -150 128 -150 128 -10" stroke="${verde}" stroke-width="12" fill="none" stroke-linecap="round" />
  <rect x="-110" y="-100" width="220" height="200" rx="56" fill="${noche}" stroke="${verde}" stroke-width="7" />
  <rect x="-150" y="-36" width="34" height="76" rx="14" fill="${verde}" /><rect x="116" y="-36" width="34" height="76" rx="14" fill="${verde}" />
  <path d="M-150 30 C-150 90 -100 110 -50 110" stroke="${verde}" stroke-width="6" fill="none" stroke-linecap="round" /><circle cx="-46" cy="110" r="10" fill="${verde}" />
  <g class="${p}-ojos"><path d="M-62 -16 Q-42 -42 -22 -16 M22 -16 Q42 -42 62 -16" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" /></g>
  <path class="${p}-boca" d="M-42 30 Q0 66 42 30" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" />
</g>`;

// celular (x, y = esquina superior izquierda; w x h)
export const celular = (x, y, w, h, titulo, color = blanco) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="50" fill="${noche}" stroke="${blanco}" stroke-width="6" />
  <rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" rx="36" fill="${azul2}" />
  <rect x="${x + w / 2 - 50}" y="${y + 30}" width="100" height="16" rx="8" fill="${noche}" />
  <path d="M${x + 18} ${y + 128} H${x + w - 18}" stroke="${blanco}" stroke-width="3" opacity="0.3" />
  <circle cx="${x + 70}" cy="${y + 90}" r="26" fill="${color}" stroke="${blanco}" stroke-width="3" />
  <text x="${x + 110}" y="${y + 101}" font-family="Lexend" font-weight="700" font-size="30" fill="${blanco}">${titulo}</text>`;

// globo de chat (x, y = esquina superior izquierda)
export const globo = (cls, x, y, w, texto, { mio = false, hora = "", color, tinta = noche } = {}) => {
  const fill = color || (mio ? oro : blanco);
  const lineas = texto.split("|");
  const h = 28 + lineas.length * 40 + (hora ? 28 : 0);
  return `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${fill}" stroke="${noche}" stroke-width="4" />
    ${lineas.map((l, i) => `<text x="${x + 22}" y="${y + 48 + i * 40}" font-family="Lexend" font-weight="600" font-size="29" fill="${tinta}">${l}</text>`).join("")}
    ${hora ? `<text x="${x + w - 22}" y="${y + h - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${tinta}" opacity="0.75">${hora}</text>` : ""}
  </g>`;
};

// confeti determinista (clase .<p>-k)
export const confeti = (p, y0 = 520) =>
  [[110, oro], [210, rojo], [320, blanco], [440, oro], [550, azul], [660, rojo], [770, oro], [880, blanco], [980, rojo], [160, blanco], [600, oro], [930, oro], [380, rojo], [720, blanco]]
    .map(([x, c], i) => `<rect class="${p}-k" x="${x}" y="${y0 - (i % 4) * 40}" width="18" height="30" rx="4" fill="${c}" />`).join("");

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
    ${S} .lin { fill: none; stroke: ${blanco}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; }
    ${S} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.12em; }
    ${S} .art { top: 586px; font-weight: 900; font-size: 92px; color: ${oro}; text-shadow: 6px 6px 0 ${rojo}; }
    ${S} .art small { font-size: 0.62em; color: ${blanco}; text-shadow: none; letter-spacing: 0.08em; margin-right: 18px; vertical-align: 0.14em; }
    ${S} .zoc { position: absolute; left: 50px; top: 1376px; display: flex; height: 104px; border: 4px solid ${oro}; border-radius: 6px; overflow: hidden; box-shadow: 8px 8px 0 rgba(7, 22, 64, 0.8); }
    ${S} .zoc .tab { display: flex; align-items: center; padding: 0 18px; background: ${oro}; color: ${noche}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
    ${S} .zoc .tab.verde { background: ${verde}; color: ${noche}; }
    ${S} .zoc .tit { display: flex; align-items: center; padding: 0 26px; background: ${rojo}; color: ${blanco}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; letter-spacing: -0.01em; text-transform: uppercase; white-space: nowrap; }
    ${S} .zoc .tit.azul { background: ${azul}; }
    ${S} .sello b { display: inline-block; padding: 10px 28px; border: 7px solid ${rojo}; border-radius: 14px; color: ${rojo}; background: rgba(7, 22, 64, 0.9); font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; }
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
        tl.fromTo(q(sel), { scaleY: 0.45, transformOrigin: "50% 50%" }, { scaleY: 1.25, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0);
      };
      // zócalos: cada uno entra desde la izquierda y saca al anterior
      const zocalos = (pares) => pares.forEach(([sel, t], i) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out", immediateRender: false }, t);
        if (i > 0) tl.to(q(pares[i - 1][0]), { opacity: 0, y: 30, duration: 0.18 }, t);
      });
      // la bandera flamea
      const flamear = (sel, t0, t1) => lista(sel).forEach((el, i) => {
        const n = Math.max(1, Math.floor((t1 - t0) / 0.6));
        tl.fromTo(el, { skewY: -3 }, { skewY: 3, duration: 0.6, yoyo: true, repeat: n, ease: "sine.inOut", svgOrigin: "0 50" }, t0 + i * 0.15);
      });
      // confeti que cae
      const llover = (sel, t) => qa(sel).forEach((k, i) => tl.fromTo(k, { y: 0, rotation: 0, opacity: 0 }, { opacity: 1, y: 900 + (i % 3) * 80, rotation: 360 + i * 40, transformOrigin: "50% 50%", duration: 2.2 + (i % 4) * 0.2, ease: "none", immediateRender: false }, t + (i % 5) * 0.08));

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
