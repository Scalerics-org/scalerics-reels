// Piezas comunes de las escenas de "toma-catorce" (detrás de cámaras del rodaje de la publicidad
// de una pizzería de barrio): personas de busto (directora, Beto, Vicky), claqueta, monitor de
// cámara con REC, cámara de cine, luz de set, celular con notificaciones y globos de chat, pizza.
// Cada sNN.mjs arma su escena con escena({...}).
// Uso (desde reels/toma-catorce): node partes/escenas/gen.mjs
import fs from "node:fs";

export const COL = {
  ink: "#111014", // negro del set y contornos
  blanco: "#f4f1ea", // claqueta, textos grandes, flash
  ama: "#ffcc1a", // cinta amarilla, acentos de la directora
  rojo: "#ff3b30", // REC, ¡CORTEN!, Beto
  rojoc: "#ff6b5e",
  ambar: "#ff9a3c", // luz de tungsteno, notificaciones de clientas
  acero: "#5b6170", // equipos, trípodes, monitor
  aceroc: "#8a91a3",
  pared: "#24212a", // interior de la pizzería en el monitor
  piel: "#f2c6a0",
  verde: "#5ce611", // solo con Scalerics
};
const K = COL.ink;

// ---------- persona de busto ----------
// Coordenadas locales: cabeza en (0,-230), hombros en y -130, corte abajo en y 160.
// o: { id, x, y, s, rot, ropa, pelo: "rodete"|"rulos"|"pelado"|"jopo", cara: "habla"|"sonrisa"|"sorpresa"|"harta"|"triste"|"grita"|"guiño"|"seria",
//      bigote, gorro (de pizzero), auris (headset), delantal, remera: texto en el pecho, extra, atras }
export function persona(o) {
  const id = o.id ?? "";
  const n = id.split(" ").at(-1);
  const cp = o.colPelo ?? { rodete: "#2a1c18", rulos: "#3b2418", pelado: "#7a6a60", jopo: "#3a2a22" }[o.pelo ?? "jopo"];
  const atras = {
    rodete: `<circle cx="0" cy="-332" r="44" fill="${cp}" stroke="${K}" stroke-width="7" /><path d="M-90 -230 C-100 -330 100 -330 90 -230 Z" fill="${cp}" stroke="${K}" stroke-width="7" stroke-linejoin="round" />`,
    rulos: [[-96, -280], [-110, -220], [-104, -160], [96, -280], [110, -220], [104, -160], [-60, -320], [0, -336], [60, -320]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="38" fill="${cp}" stroke="${K}" stroke-width="6" />`).join(""),
  }[o.pelo] ?? "";
  const frente = {
    rodete: `<path d="M-84 -246 C-76 -320 76 -324 84 -246 C50 -292 -20 -296 -84 -246 Z" fill="${cp}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    jopo: `<path d="M-80 -248 C-90 -300 -50 -350 20 -352 C80 -350 96 -300 80 -248 C60 -284 -50 -290 -80 -248 Z" fill="${cp}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    pelado: `<path d="M-82 -236 C-92 -210 -86 -190 -78 -186 M82 -236 C92 -210 86 -190 78 -186" fill="none" stroke="${cp}" stroke-width="14" stroke-linecap="round" /><path d="M-30 -300 Q0 -312 30 -300" fill="none" stroke="${COL.blanco}" stroke-width="6" stroke-linecap="round" opacity="0.5" />`,
    rulos: [[-56, -300], [-14, -316], [30, -312], [66, -290]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="${cp}" stroke="${K}" stroke-width="6" />`).join(""),
  }[o.pelo ?? "jopo"];
  const gorro = o.gorro ? `<g class="${n}-gorro"><path d="M-70 -280 C-120 -330 -90 -400 -40 -380 C-30 -430 30 -430 40 -380 C90 -400 120 -330 70 -280 Z" fill="${COL.blanco}" stroke="${K}" stroke-width="6" stroke-linejoin="round" /><rect x="-74" y="-300" width="148" height="34" rx="8" fill="${COL.blanco}" stroke="${K}" stroke-width="6" /></g>` : "";
  const my = -186; // boca
  const k = o.cara ?? "habla";
  const boca = {
    habla: `<g class="boca ${n}-boca" data-o="0 ${my}"><ellipse cx="0" cy="${my}" rx="22" ry="15" fill="${K}" /><ellipse cx="0" cy="${my + 7}" rx="11" ry="5" fill="${COL.rojoc}" /></g>`,
    grita: `<g class="boca ${n}-boca" data-o="0 ${my - 4}"><path d="M-32 ${my - 16} Q0 ${my - 24} 32 ${my - 16} Q28 ${my + 26} 0 ${my + 28} Q-28 ${my + 26} -32 ${my - 16} Z" fill="${K}" /><path d="M-14 ${my + 16} Q0 ${my + 4} 14 ${my + 16} Q0 ${my + 24} -14 ${my + 16} Z" fill="${COL.rojo}" /></g>`,
    sorpresa: `<ellipse class="boca ${n}-boca" data-o="0 ${my}" cx="0" cy="${my}" rx="16" ry="22" fill="${K}" />`,
    sonrisa: `<g class="boca ${n}-boca" data-o="0 ${my - 8}"><path d="M-34 ${my - 10} Q0 ${my + 30} 34 ${my - 10} Z" fill="${K}" stroke="${K}" stroke-width="5" stroke-linejoin="round" /><path d="M-22 ${my - 6} L22 ${my - 6} L18 ${my + 2} L-18 ${my + 2} Z" fill="${COL.blanco}" /></g>`,
    guiño: `<g class="boca ${n}-boca" data-o="0 ${my - 8}"><path d="M-34 ${my - 10} Q0 ${my + 30} 34 ${my - 10} Z" fill="${K}" stroke="${K}" stroke-width="5" stroke-linejoin="round" /><path d="M-22 ${my - 6} L22 ${my - 6} L18 ${my + 2} L-18 ${my + 2} Z" fill="${COL.blanco}" /></g>`,
    harta: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-26 ${my + 4} L26 ${my - 2}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />`,
    seria: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-22 ${my} Q0 ${my + 4} 22 ${my}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />`,
    triste: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-24 ${my + 8} Q0 ${my - 10} 24 ${my + 8}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />`,
  }[k];
  const cejas = {
    sorpresa: `M-58 -284 Q-38 -300 -18 -284 M58 -284 Q38 -300 18 -284`,
    grita: `M-58 -262 L-20 -274 M58 -262 L20 -274`,
    harta: `M-58 -262 L-18 -258 M58 -262 L18 -258`,
    triste: `M-56 -262 L-20 -274 M56 -262 L20 -274`,
    seria: `M-56 -266 L-20 -266 M56 -266 L20 -266`,
  }[k] ?? `M-56 -272 Q-38 -284 -20 -272 M56 -272 Q38 -284 20 -272`;
  const ry = k === "sorpresa" || k === "grita" ? 17 : 14;
  const ojos = k === "harta"
    ? `<g class="${n}-ojos" data-o="0 -236"><path d="M-52 -238 L-20 -238 M20 -238 L52 -238" stroke="${K}" stroke-width="5" stroke-linecap="round" /><path d="M-50 -238 Q-36 -224 -22 -238 Z M50 -238 Q36 -224 22 -238 Z" fill="${K}" /></g>`
    : k === "guiño"
      ? `<g class="${n}-ojos" data-o="0 -236"><path d="M-50 -236 Q-36 -248 -22 -236" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" /><ellipse cx="36" cy="-236" rx="11" ry="14" fill="${K}" /><circle cx="40" cy="-242" r="4" fill="${COL.blanco}" /></g>`
      : `<g class="${n}-ojos" data-o="0 -236"><ellipse cx="-36" cy="-236" rx="11" ry="${ry}" fill="${K}" /><ellipse cx="36" cy="-236" rx="11" ry="${ry}" fill="${K}" /><circle cx="-32" cy="-242" r="4" fill="${COL.blanco}" /><circle cx="40" cy="-242" r="4" fill="${COL.blanco}" /></g>`;
  const bigote = o.bigote ? `<path d="M0 -206 Q-30 -218 -58 -194 Q-26 -184 0 -196 Q26 -184 58 -194 Q30 -218 0 -206 Z" fill="#4a3228" stroke="${K}" stroke-width="5" stroke-linejoin="round" />` : "";
  const auris = o.auris ? `<path d="M-86 -240 C-86 -350 86 -350 86 -240" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round" /><rect x="-102" y="-256" width="30" height="52" rx="12" fill="${COL.acero}" stroke="${K}" stroke-width="6" /><rect x="72" y="-256" width="30" height="52" rx="12" fill="${COL.acero}" stroke="${K}" stroke-width="6" /><path d="M-86 -212 Q-80 -176 -36 -176" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round" /><circle cx="-32" cy="-176" r="8" fill="${K}" />` : "";
  const ropa = o.ropa ?? COL.acero;
  const delantal = o.delantal ? `<path d="M-100 -60 L-100 160 L100 160 L100 -60 Q60 -84 0 -84 Q-60 -84 -100 -60 Z" fill="${COL.blanco}" stroke="${K}" stroke-width="6" stroke-linejoin="round" /><path d="M-100 -60 L-60 -128 M100 -60 L60 -128" stroke="${COL.blanco}" stroke-width="10" /><path d="M-100 -60 L-60 -128 M100 -60 L60 -128" fill="none" stroke="${K}" stroke-width="3" /><rect x="-46" y="40" width="92" height="60" rx="8" fill="none" stroke="${K}" stroke-width="5" />` : "";
  const remera = o.remera ? `<text x="0" y="40" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" letter-spacing="2" fill="${K}">${o.remera}</text>` : "";
  return `<g transform="translate(${o.x} ${o.y}) rotate(${o.rot ?? 0}) scale(${o.s ?? 1})"><g class="${id}">
    ${o.atras ?? ""}${atras}
    <path d="M-190 160 C-190 -40 -150 -110 -60 -130 L60 -130 C150 -110 190 -40 190 160 Z" fill="${ropa}" stroke="${K}" stroke-width="7" stroke-linejoin="round" />
    ${delantal}${remera}
    <rect x="-28" y="-160" width="56" height="40" fill="${COL.piel}" stroke="${K}" stroke-width="6" />
    <path d="M-40 -128 L0 -84 L40 -128" fill="${COL.piel}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />
    <ellipse cx="-82" cy="-226" rx="14" ry="22" fill="${COL.piel}" stroke="${K}" stroke-width="6" /><ellipse cx="82" cy="-226" rx="14" ry="22" fill="${COL.piel}" stroke="${K}" stroke-width="6" />
    <ellipse cx="0" cy="-230" rx="80" ry="92" fill="${COL.piel}" stroke="${K}" stroke-width="7" />
    ${frente}${gorro}
    <path d="${cejas}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />
    ${ojos}
    <ellipse cx="-56" cy="-200" rx="16" ry="9" fill="${COL.rojo}" opacity="0.28" /><ellipse cx="56" cy="-200" rx="16" ry="9" fill="${COL.rojo}" opacity="0.28" />
    <path d="M0 -226 Q-12 -206 4 -202" fill="none" stroke="${K}" stroke-width="5" stroke-linecap="round" />
    ${bigote}${boca}${auris}
    ${o.extra ?? ""}
  </g></g>`;
}
// los tres personajes, con sus rasgos fijos
export const directora = (o) => persona({ pelo: "rodete", auris: true, ropa: "#2e2b36", ...o });
// megáfono para la directora (en coords de la persona; va en extra)
export const megafono = (cls) => `<g class="${cls}"><path d="M40 -196 L210 -270 L210 -110 L40 -170 Z" fill="${COL.ama}" stroke="${K}" stroke-width="7" stroke-linejoin="round" /><ellipse cx="210" cy="-190" rx="22" ry="80" fill="${K}" stroke="${K}" stroke-width="6" /><rect x="70" y="-160" width="34" height="70" rx="10" fill="${COL.acero}" stroke="${K}" stroke-width="6" /></g>`;
export const beto = (o) => persona({ pelo: "pelado", bigote: true, gorro: true, delantal: true, ropa: COL.rojo, ...o });
export const vicky = (o) => persona({ pelo: "rulos", auris: true, ropa: COL.ama, remera: "STAFF", ...o });

// mano/puño (local, puño en 0,0)
export const mano = (x, y, s = 1, rot = 0, cls = "") => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${cls}"><path d="M-34 -10 Q-40 30 -10 40 L24 40 Q40 30 36 -6 Q30 -26 0 -24 Q-30 -26 -34 -10 Z" fill="${COL.piel}" stroke="${K}" stroke-width="6" stroke-linejoin="round" /><path d="M-30 4 L30 4 M-28 18 L30 18" stroke="${K}" stroke-width="4" stroke-linecap="round" /></g></g>`;

// ---------- claqueta ----------
// Centro del cuerpo en (x,y). Local: cuerpo -200..200 x -90..150; barra de arriba -200..200 x -150..-96,
// con bisagra en (-196,-96). La barra lleva la clase <cls>-barra (para el "clac"). Los textos: toma, escena.
// numero: clase <cls>-num para animar el número; tachado: número viejo tachado al lado.
export function claqueta({ cls = "", x, y, s = 1, rot = 0, toma = "14", viejo = "", titulo = "LO DE BETO", abierta = 24 }) {
  const n = cls.split(" ").at(-1);
  let rayas = "";
  for (let i = -200; i < 200; i += 56) rayas += `<path d="M${i} -96 L${i + 28} -150 L${i + 56} -150 L${i + 28} -96 Z" fill="${COL.blanco}" />`;
  let rayas2 = "";
  for (let i = -200; i < 200; i += 56) rayas2 += `<path d="M${i} -90 L${i + 28} -40 L${i + 56} -40 L${i + 28} -90 Z" fill="${COL.blanco}" />`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" data-layout-allow-overlap><g class="${cls}" data-layout-allow-overlap>
    <rect x="-200" y="-90" width="400" height="240" rx="10" fill="${K}" stroke="${COL.blanco}" stroke-width="6" />
    <clipPath id="${n}-c2"><rect x="-200" y="-90" width="400" height="50" /></clipPath><g clip-path="url(#${n}-c2)">${rayas2}</g>
    <path d="M-200 -40 L200 -40 M-200 40 L200 40 M0 40 L0 150" stroke="${COL.blanco}" stroke-width="4" />
    <text x="-184" y="18" font-family="Lexend" font-weight="800" font-size="42" letter-spacing="2" fill="${COL.blanco}">${titulo}</text>
    <text data-layout-ignore x="-184" y="74" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${COL.aceroc}">ESCENA</text>
    <text x="-130" y="134" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="58" fill="${COL.blanco}">1</text>
    <text data-layout-ignore x="16" y="74" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${COL.aceroc}">TOMA</text>
    ${viejo ? `<g class="${n}-viejo"><text x="64" y="136" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="70" fill="${COL.aceroc}">${viejo}</text><path class="${n}-tacha" d="M24 104 L106 128" stroke="${COL.rojo}" stroke-width="8" stroke-linecap="round" /></g>` : ""}
    <text class="${n}-num" x="${viejo ? 150 : 100}" y="140" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${viejo ? 84 : 96}" fill="${COL.ama}">${toma}</text>
    <g class="${n}-barra" transform="rotate(${-abierta} -196 -96)">
      <rect x="-200" y="-150" width="400" height="54" rx="6" fill="${K}" stroke="${COL.blanco}" stroke-width="6" />
      <clipPath id="${n}-c1"><rect x="-200" y="-150" width="400" height="54" /></clipPath><g clip-path="url(#${n}-c1)">${rayas}</g>
      <rect x="-200" y="-150" width="400" height="54" rx="6" fill="none" stroke="${COL.blanco}" stroke-width="6" />
    </g>
    <circle cx="-196" cy="-96" r="10" fill="${COL.acero}" stroke="${COL.blanco}" stroke-width="4" />
  </g></g>`;
}

// ---------- monitor de cámara (centro x,y; w,h de pantalla) ----------
// contenido: svg en coords locales 0..w, 0..h. Lleva REC, marco de visor y batería.
export function monitor({ cls = "", x, y, w = 840, h = 560, contenido = "", toma = "14" }) {
  const n = cls.split(" ").at(-1);
  const b = 26, L = 46;
  const esq = [[b, b, 1, 1], [w - b, b, -1, 1], [b, h - b, 1, -1], [w - b, h - b, -1, -1]]
    .map(([px, py, sx, sy]) => `<path d="M${px} ${py + sy * L} L${px} ${py} L${px + sx * L} ${py}" fill="none" stroke="${COL.blanco}" stroke-width="5" opacity="0.85" />`).join("");
  return `<g transform="translate(${x - w / 2} ${y - h / 2})"><g class="${cls}">
    <rect x="-26" y="-26" width="${w + 52}" height="${h + 52}" rx="22" fill="${COL.acero}" stroke="${K}" stroke-width="7" />
    <rect x="-12" y="-12" width="${w + 24}" height="${h + 24}" rx="12" fill="${K}" />
    <clipPath id="${n}-clip"><rect width="${w}" height="${h}" /></clipPath>
    <g clip-path="url(#${n}-clip)">
      <rect width="${w}" height="${h}" fill="${COL.pared}" />
      <g class="${n}-cont">${contenido}</g>
      <rect class="${n}-fl" width="${w}" height="${h}" fill="${COL.blanco}" opacity="0" />
    </g>
    ${esq}
    <path d="M${w / 2 - 22} ${h / 2} L${w / 2 + 22} ${h / 2} M${w / 2} ${h / 2 - 22} L${w / 2} ${h / 2 + 22}" stroke="${COL.blanco}" stroke-width="3" opacity="0.5" />
    <circle class="${n}-rec" cx="${b + 36}" cy="${b + 40}" r="13" fill="${COL.rojo}" />
    <text x="${b + 58}" y="${b + 51}" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${COL.blanco}">REC</text>
    <text x="${w - b - 20}" y="${b + 51}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${COL.blanco}">TOMA ${toma}</text>
    <g transform="translate(${w - b - 90} ${h - b - 56})"><rect width="64" height="30" rx="4" fill="none" stroke="${COL.blanco}" stroke-width="4" /><rect x="64" y="9" width="7" height="12" fill="${COL.blanco}" /><rect x="6" y="6" width="34" height="18" fill="${COL.blanco}" /></g>
  </g></g>`;
}

// ---------- el interior de la pizzería que ve la cámara (para adentro del monitor) ----------
// w,h del monitor; Beto en (bx, by) con escala bs
export const pizzeria = (w, h, extra = "") => `
  <rect width="${w}" height="${h}" fill="${COL.pared}" />
  <path d="M${w / 2 - 210} ${h * 0.62} L${w / 2 - 210} ${h * 0.34} Q${w / 2} ${h * 0.06} ${w / 2 + 210} ${h * 0.34} L${w / 2 + 210} ${h * 0.62} Z" fill="#3a2a26" stroke="${K}" stroke-width="6" />
  <path d="M${w / 2 - 150} ${h * 0.62} L${w / 2 - 150} ${h * 0.4} Q${w / 2} ${h * 0.2} ${w / 2 + 150} ${h * 0.4} L${w / 2 + 150} ${h * 0.62} Z" fill="${COL.ambar}" opacity="0.55" />
  <path d="M${w / 2 - 110} ${h * 0.6} Q${w / 2 - 60} ${h * 0.46} ${w / 2 - 20} ${h * 0.6} Q${w / 2 + 30} ${h * 0.44} ${w / 2 + 80} ${h * 0.6}" fill="${COL.ama}" opacity="0.6" />
  <g transform="translate(40 120)"><rect width="230" height="88" rx="10" fill="${COL.blanco}" stroke="${K}" stroke-width="5" /><text x="115" y="58" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="54" fill="${COL.rojo}">Lo de Beto</text></g>
  <rect x="0" y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="#3a2a26" stroke="${K}" stroke-width="6" />
  <rect x="0" y="${h * 0.78}" width="${w}" height="16" fill="${COL.ambar}" opacity="0.5" />
  ${extra}`;

// pizza (centro x,y; radio r)
export const pizza = (x, y, r = 80, cls = "") => {
  let pep = "";
  [[-0.4, -0.3], [0.35, -0.4], [0.1, 0.1], [-0.35, 0.35], [0.45, 0.3], [-0.05, -0.6]].forEach(([a, b]) => { pep += `<circle cx="${a * r}" cy="${b * r}" r="${r * 0.13}" fill="${COL.rojo}" stroke="${K}" stroke-width="3" />`; });
  return `<g transform="translate(${x} ${y})"><g class="${cls}"><circle r="${r}" fill="${COL.ambar}" stroke="${K}" stroke-width="6" /><circle r="${r * 0.82}" fill="${COL.ama}" stroke="${K}" stroke-width="3" />${pep}<path d="M${-r * 0.8} 0 L${r * 0.8} 0 M0 ${-r * 0.8} L0 ${r * 0.8}" stroke="${K}" stroke-width="3" opacity="0.5" /></g></g>`;
};

// ---------- cámara de cine en trípode (centro del cuerpo x,y) ----------
export const camara = (x, y, s = 1, cls = "", dir = 1) => `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})"><g class="${cls}">
  <path d="M0 80 L-90 360 M0 80 L90 360 M0 80 L0 370" stroke="${COL.acero}" stroke-width="12" stroke-linecap="round" />
  <circle cx="-60" cy="-120" r="62" fill="${K}" stroke="${COL.aceroc}" stroke-width="7" /><circle cx="-60" cy="-120" r="16" fill="${COL.aceroc}" />
  <circle cx="60" cy="-120" r="62" fill="${K}" stroke="${COL.aceroc}" stroke-width="7" /><circle cx="60" cy="-120" r="16" fill="${COL.aceroc}" />
  <rect x="-110" y="-60" width="220" height="140" rx="14" fill="${K}" stroke="${COL.aceroc}" stroke-width="7" />
  <path d="M110 -30 L190 -60 L190 70 L110 40 Z" fill="${K}" stroke="${COL.aceroc}" stroke-width="7" stroke-linejoin="round" />
  <circle class="${cls.split(" ").at(-1)}-tally" cx="-80" cy="-34" r="10" fill="${COL.rojo}" />
</g></g>`;

// ---------- luz de set (cabeza en x,y, apuntando con rot; con cono de luz) ----------
export const luz = (x, y, s = 1, rot = 0, cls = "", cono = true) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${cls}">
  ${cono ? `<path class="${cls.split(" ").at(-1)}-cono" d="M40 -50 L900 -330 L900 330 L40 50 Z" fill="${COL.ambar}" opacity="0.10" />` : ""}
  <path d="M-40 -60 L-90 -110 M-40 60 L-90 110" stroke="${COL.acero}" stroke-width="10" stroke-linecap="round" />
  <rect x="-60" y="-62" width="100" height="124" rx="14" fill="${K}" stroke="${COL.aceroc}" stroke-width="6" />
  <ellipse cx="44" cy="0" rx="16" ry="58" fill="${COL.ama}" stroke="${K}" stroke-width="5" />
</g></g>`;

// ---------- celular grande (centro x,y; local -190..190 x -360..360) ----------
// pantalla: svg local (pantalla -168..168 x -320..330); titulo: barra de chat arriba
export const celu = ({ cls = "", x, y, s = 1, rot = 0, pantalla = "", titulo = "", sub = "", avatar = COL.ambar }) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${cls}">
  <rect x="-190" y="-360" width="380" height="720" rx="52" fill="${K}" stroke="${COL.aceroc}" stroke-width="6" />
  <rect x="-168" y="-330" width="336" height="660" rx="30" fill="${COL.blanco}" />
  ${titulo ? `<rect x="-168" y="-330" width="336" height="104" rx="30" fill="${COL.pared}" /><rect x="-168" y="-260" width="336" height="34" fill="${COL.pared}" />
  <circle cx="-118" cy="-278" r="30" fill="${avatar}" stroke="${K}" stroke-width="4" />
  <text x="-76" y="-282" font-family="Lexend" font-weight="700" font-size="28" fill="${COL.blanco}">${titulo}</text>
  <text x="-76" y="-248" font-family="Lexend" font-weight="500" font-size="20" fill="${COL.aceroc}">${sub}</text>` : ""}
  ${pantalla}
  <rect x="-50" y="-348" width="100" height="12" rx="6" fill="${COL.acero}" />
</g></g>`;
// celular chico (centro x,y; local -70..70 x -130..130), con brillo de pantalla
export const celular = ({ cls = "", x, y, s = 1, rot = 0, pantalla = "" }) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${cls}">
  <circle class="${cls.split(" ").at(-1)}-brillo" r="150" fill="${COL.blanco}" opacity="0.10" />
  <rect x="-70" y="-130" width="140" height="260" rx="22" fill="${K}" stroke="${COL.aceroc}" stroke-width="6" />
  <rect x="-58" y="-112" width="116" height="220" rx="10" fill="${COL.blanco}" />
  ${pantalla}
</g></g>`;
// líneas de vibración alrededor de algo (centro x,y)
export const vibra = (x, y, s = 1, cls = "") => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}" fill="none" stroke="${COL.ama}" stroke-width="8" stroke-linecap="round">
  <path d="M-110 -50 Q-130 0 -110 50" /><path d="M-140 -80 Q-170 0 -140 80" /><path d="M110 -50 Q130 0 110 50" /><path d="M140 -80 Q170 0 140 80" /></g></g>`;

// notificación HTML (tarjeta que baja): quien, texto
export const noti = (cls, quien, txt, { x = 90, y = 600, w = 900, tam = 44 } = {}) =>
  `<div class="noti ${cls}" style="left:${x}px;top:${y}px;width:${w}px"><div class="noti-ic"></div><div><b>${quien}</b><span style="font-size:${tam}px">${txt}</span></div><i>ahora</i></div>`;
// globo de chat HTML: lado "der" (enviado) o "izq" (recibido)
export const globo = (cls, txt, { x, y, w, lado = "der", tam = 38, check = true, col } = {}) =>
  `<div class="globo ${lado} ${cls}" style="left:${x}px;top:${y}px;${w ? `width:${w}px;` : ""}font-size:${tam}px;${col ? `background:${col};` : ""}">${txt}${check && lado === "der" ? `<i class="chk">✓✓</i>` : ""}</div>`;

// estrellita de brillo
export const brillito = (x, y, s = 1, col = COL.ama, cls = "") => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 -30 Q4 -4 30 0 Q4 4 0 30 Q-4 4 -30 0 Q-4 -4 0 -30 Z" fill="${col}" /></g>`;
// cono de luz de arriba (x centro arriba, ancho abajo)
export const cono = (x, ytop, ybot, wtop, wbot, cls = "", op = 0.12) => `<path class="${cls}" d="M${x - wtop / 2} ${ytop} L${x + wtop / 2} ${ytop} L${x + wbot / 2} ${ybot} L${x - wbot / 2} ${ybot} Z" fill="${COL.ambar}" opacity="${op}" />`;

// ---------- escena ----------
const HELPERS = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const ESC = q(".esc");
      const org = (el, o) => (el instanceof SVGElement ? { svgOrigin: o ?? "0 0" } : { transformOrigin: o ?? "50% 50%" });
      const sacudon = (t, f = 1) => [[-16, 9], [12, -7], [-6, 3], [0, 0]].forEach(([x, y], i) => tl.to(ESC, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // flash a pantalla completa
      const flash = (t, a = 0.85) => { tl.fromTo(q(".fl"), { opacity: a }, { opacity: 0, duration: 0.28, ease: "power2.out", immediateRender: false }, t); };
      const tiembla = (sel, t, d, a = 5, per = 0.05) => qa(sel).forEach((el) => tl.fromTo(el, { x: -a, rotation: -0.6 }, { x: a, rotation: 0.6, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "none", immediateRender: false }, t));
      // vibración de celular (x rápido)
      const vibrar = (sel, t, d, a = 8) => qa(sel).forEach((el) => tl.fromTo(el, { x: -a }, { x: a, duration: 0.035, yoyo: true, repeat: Math.max(1, Math.round(d / 0.035)) | 1, ease: "none", immediateRender: false }, t));
      const pop = (sel, t, { d = 0.32, desde = 0.6, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: d, ease: "back.out(2)", immediateRender: false }, t);
      });
      const golpe = (sel, t, { desde = 2.2, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      });
      const entra = (sel, t, desde = { x: -700 }, d = 0.32) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, ...desde }, { opacity: 1, x: 0, y: 0, duration: d, ease: "back.out(1.3)", immediateRender: false }, t);
      });
      const sale = (sel, t, d = 0.2) => qa(sel).forEach((el) => tl.to(el, { opacity: 0, duration: d }, t));
      const dibujar = (sel, t, d = 0.5) => qa(sel).forEach((p) => {
        const L = p.getTotalLength();
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.to(p, { opacity: 1, duration: 0.01 }, t);
        tl.to(p, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      const habla = (sel, t, d, per = 0.1, min = 0.45) => qa(sel).forEach((el) => {
        const o = el.dataset.o ?? "0 0";
        const n = Math.max(1, Math.round(d / per)) | 1;
        tl.fromTo(el, { scaleY: 1, svgOrigin: o }, { scaleY: min, svgOrigin: o, duration: per, yoyo: true, repeat: n, ease: "sine.inOut", immediateRender: false }, t);
      });
      const respira = (sel, t, d, dy = 8, per = 0.5) => qa(sel).forEach((el) => tl.fromTo(el, { y: 0 }, { y: dy, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      const balancea = (sel, t, d, deg = 4, per = 0.25, o) => qa(sel).forEach((el) => tl.fromTo(el, { rotation: -deg, ...org(el, o) }, { rotation: deg, ...org(el, o), duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      const pestanea = (sel, t) => qa(sel).forEach((el) => tl.to(el, { scaleY: 0.1, ...org(el, el.dataset?.o), duration: 0.06, yoyo: true, repeat: 1 }, t));
      const acerca = (sel, t, d, a = 1, b = 1.08, o) => qa(sel).forEach((el) => tl.fromTo(el, { scale: a, ...org(el, o) }, { scale: b, ...org(el, o), duration: d, ease: "none", immediateRender: false }, t));
      // la claqueta: barra abierta (grados) que se cierra de golpe en t ("clac") y rebota
      const clac = (sel, t, abierta = 24) => qa(sel).forEach((el) => {
        tl.fromTo(el, { rotation: -abierta, svgOrigin: "-196 -96" }, { rotation: 0, svgOrigin: "-196 -96", duration: 0.09, ease: "power4.in", immediateRender: false }, t - 0.09);
        tl.to(el, { rotation: -3, svgOrigin: "-196 -96", duration: 0.06, yoyo: true, repeat: 1, ease: "power1.out" }, t);
      });
      // la claqueta se abre (antes del clac)
      const abre = (sel, t, abierta = 24, d = 0.3) => qa(sel).forEach((el) => tl.fromTo(el, { rotation: 0, svgOrigin: "-196 -96" }, { rotation: -abierta, svgOrigin: "-196 -96", duration: d, ease: "back.out(2)", immediateRender: false }, t));
`;

export function escena({ id, dur, css = "", svg = "", html = "", js = "", sfx = [] }) {
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .capa, ${P} .esc { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .fl { position: absolute; inset: 0; background: ${COL.blanco}; opacity: 0; }
    ${P} .tit { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-style: normal; text-transform: uppercase; line-height: 0.92; letter-spacing: -0.03em; white-space: nowrap; }
    ${P} .sello { position: absolute; padding: 10px 28px 6px; border: 9px solid ${COL.rojo}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: 0.04em; color: ${COL.rojo}; white-space: nowrap; background: rgba(17, 16, 20, 0.6); }
    ${P} .barra { position: absolute; padding: 12px 30px 10px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; white-space: nowrap; border: 6px solid ${COL.ink}; box-shadow: 10px 10px 0 ${COL.ink}; }
    ${P} .tag { position: absolute; padding: 8px 20px 6px; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; white-space: nowrap; color: ${COL.ink}; background: ${COL.ama}; border: 4px solid ${COL.ink}; }
    ${P} .globo { position: absolute; padding: 18px 26px 16px; border: 5px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 600; line-height: 1.12; color: ${COL.ink}; box-shadow: 8px 8px 0 rgba(17, 16, 20, 0.6); }
    ${P} .globo.der { background: #d9f7c4; border-radius: 34px 34px 8px 34px; }
    ${P} .globo.izq { background: ${COL.blanco}; border-radius: 34px 34px 34px 8px; }
    ${P} .globo .chk { font-style: normal; margin-left: 12px; font-size: 0.6em; color: ${COL.acero}; letter-spacing: -0.2em; }
    ${P} .noti { position: absolute; display: flex; align-items: center; gap: 22px; padding: 22px 26px; background: ${COL.blanco}; border: 6px solid ${COL.ink}; border-radius: 30px; box-shadow: 10px 10px 0 rgba(17, 16, 20, 0.7); font-family: "Lexend", sans-serif; color: ${COL.ink}; }
    ${P} .noti .noti-ic { flex: none; width: 74px; height: 74px; border-radius: 20px; background: ${COL.ambar}; border: 5px solid ${COL.ink}; }
    ${P} .noti b { display: block; font-weight: 800; font-size: 30px; color: ${COL.acero}; letter-spacing: 0.02em; }
    ${P} .noti span { display: block; font-weight: 700; line-height: 1.1; }
    ${P} .noti i { position: absolute; right: 26px; top: 18px; font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: ${COL.acero}; }
${css.replace(/\bP\b(?=\s)/g, P)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-capa" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="esc">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
        </svg>
${html}
      </div>
      <div class="fl"></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELPERS}
${js}
      tl.to(q(".capa"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power3.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx, null, 1));
}

export function duracion(id) {
  const m = fs.readFileSync("tiempos.md", "utf8").match(new RegExp(`### ${id} — dura ([0-9.]+) s`));
  return Number(m[1]);
}
