// Personajes y utilería de "Escape room" (iguales en todas las escenas). SVG en coordenadas locales;
// la escena los ubica con <g transform="translate(..) scale(..)">. P = prefijo de la escena.

// CRONÓMETRO de 7 segmentos (4 dígitos MM:SS). cls = clase del grupo (la usa pinta()/reloj() del JS).
// Los dígitos arrancan apagados (opacity 0.07) y el JS los prende.
export function seg7(cls, { x = 0, y = 0, w = 120, h = 210, t = 24, gap = 30, color = "#ff2d3d", glow = "led" } = {}) {
  const r = (a, b, c, d, s) => `<rect data-s="${s}" x="${a}" y="${b}" width="${c}" height="${d}" rx="${t / 2}" fill="${color}" opacity="0.07" />`;
  const dig = (ox) =>
    `<g class="dig">` +
    r(ox + t * 0.6, y, w - t * 1.2, t, "a") +
    r(ox + w - t, y + t * 0.6, t, h / 2 - t * 0.9, "b") +
    r(ox + w - t, y + h / 2 + t * 0.3, t, h / 2 - t * 0.9, "c") +
    r(ox + t * 0.6, y + h - t, w - t * 1.2, t, "d") +
    r(ox, y + h / 2 + t * 0.3, t, h / 2 - t * 0.9, "e") +
    r(ox, y + t * 0.6, t, h / 2 - t * 0.9, "f") +
    r(ox + t * 0.6, y + h / 2 - t / 2, w - t * 1.2, t, "g") +
    `</g>`;
  const colon = x + 2 * w + gap + gap * 0.5;
  const cw = t;
  return `<g class="${cls} ${glow}">
      ${dig(x)}${dig(x + w + gap)}
      <rect class="${cls}-dos" x="${colon}" y="${y + h * 0.28}" width="${cw}" height="${cw}" rx="4" fill="${color}" />
      <rect class="${cls}-dos" x="${colon}" y="${y + h * 0.66}" width="${cw}" height="${cw}" rx="4" fill="${color}" />
      ${dig(colon + cw + gap * 1.5)}${dig(colon + cw + gap * 2.5 + w)}
    </g>`;
}
// ancho total de seg7 con esos parámetros
export const seg7w = ({ w = 120, gap = 30, t = 24 } = {}) => 4 * w + 4 * gap + t + gap * 0.5;

// Cuerpo y cara comunes, 360 x 540. color = clase del buzo. Ojos: P-tipo-ojos; boca: P-tipo-boca (data-o).
const cuerpo = (cls) => `<path class="${cls}" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />`;
const cara = (P, tipo, { boca = "abierta", ry = 94 } = {}) => `
      <ellipse class="cara" cx="180" cy="250" rx="80" ry="${ry}" />
      <circle class="${P}-${tipo}-ojos" cx="150" cy="244" r="9" fill="#0c0718" />
      <circle class="${P}-${tipo}-ojos" cx="212" cy="244" r="9" fill="#0c0718" />
      ${boca === "sonrisa"
        ? `<path class="d ${P}-${tipo}-boca" data-o="180 300" d="M146 292 C160 314 204 314 220 290" stroke-width="7" />`
        : `<ellipse class="${P}-${tipo}-boca" data-o="180 304" cx="180" cy="304" rx="18" ry="12" fill="#0c0718" />`}`;

// EL PILLO (Fenrir): buzo violeta, gorra al revés color tinta UV, cejas de sobrador.
export function pillo(P, { boca = "sonrisa" } = {}) {
  return `
      ${cuerpo("u")}
      <path class="l" d="M140 372 L180 430 L220 372" stroke-width="6" />
      ${cara(P, "pillo", { boca })}
      <path class="d ${P}-pillo-cejas" d="M128 216 L170 222 M192 222 L232 210" stroke-width="7" />
      <path class="c" d="M96 200 C92 134 150 118 184 118 C226 118 268 140 266 200 Z" />
      <path class="c" d="M96 196 C70 192 52 182 50 170 C70 160 92 168 104 178 Z" stroke-width="6" />
      <path class="d" d="M130 140 C150 132 200 130 230 142" stroke-width="5" opacity="0.5" />`;
}

// LA JOVEN (Leda): buzo rosa UV, pelo largo con colita alta.
export function joven(P, { boca = "abierta" } = {}) {
  return `
      <path class="k ${P}-joven-cola" d="M246 150 C330 120 360 220 320 300 C306 250 290 210 250 196 Z" />
      ${cuerpo("p")}
      <path class="l" d="M140 384 C150 420 210 420 220 384" stroke-width="6" />
      <path class="k" d="M96 240 C80 150 130 116 182 116 C238 116 284 150 266 240 C252 190 220 170 182 172 C140 172 110 190 96 240 Z" />
      ${cara(P, "joven", { boca })}
      <path class="k" d="M100 210 C112 160 150 140 186 140 C222 140 254 160 262 206 C230 176 200 176 182 186 C160 176 130 182 100 210 Z" />
      <path class="d ${P}-joven-cejas" d="M132 218 L166 214 M196 214 L230 218" stroke-width="6" />`;
}

// LA ENCARGADA (Kore): buzo oscuro con delantal tinta UV, rodete y anteojos.
export function encargada(P, { boca = "abierta" } = {}) {
  return `
      <circle class="k" cx="180" cy="128" r="40" />
      ${cuerpo("b")}
      <path class="c" d="M110 420 C140 400 220 400 250 420 L262 540 H98 Z" stroke-width="6" />
      <path class="d" d="M150 470 H210" stroke-width="5" opacity="0.6" />
      ${cara(P, "encargada", { boca })}
      <path class="k" d="M100 220 C100 162 140 148 182 148 C226 148 262 166 262 222 C240 190 210 182 182 182 C150 182 120 192 100 220 Z" />
      <circle cx="150" cy="244" r="26" fill="none" stroke="#0c0718" stroke-width="6" />
      <circle cx="212" cy="244" r="26" fill="none" stroke="#0c0718" stroke-width="6" />
      <path d="M176 244 H186" stroke="#0c0718" stroke-width="6" />
      <path class="d ${P}-encargada-cejas" d="M126 206 L168 204 M194 204 L236 206" stroke-width="6" />`;
}

// EL DUEÑO (Charon): pelado, bigote, barba gris larga de años de encierro, ojeras, telarañas.
export function dueno(P) {
  return `
      ${cuerpo("g")}
      <ellipse class="cara" cx="180" cy="250" rx="80" ry="94" />
      <path class="g" d="M104 210 C90 230 92 260 106 276 L112 240 Z M256 210 C270 230 268 260 254 276 L248 240 Z" stroke-width="5" />
      <path class="g" d="M110 286 C110 380 150 470 180 520 C210 470 250 380 250 286 C230 320 130 320 110 286 Z" stroke-width="6" />
      <path class="d" d="M150 360 C160 400 170 430 180 470 M210 360 C200 400 190 430 180 470" stroke-width="4" opacity="0.5" />
      <circle class="${P}-dueno-ojos" cx="150" cy="240" r="8" fill="#0c0718" />
      <circle class="${P}-dueno-ojos" cx="212" cy="240" r="8" fill="#0c0718" />
      <path class="d" d="M134 258 C142 266 158 266 166 258 M196 258 C204 266 220 266 228 258" stroke-width="4" opacity="0.6" />
      <path class="d" d="M130 216 L168 226 M194 226 L232 216" stroke-width="6" />
      <path class="g" d="M130 290 C150 274 210 274 230 290 C214 302 146 302 130 290 Z" stroke-width="5" />
      <ellipse class="${P}-dueno-boca" data-o="180 310" cx="180" cy="310" rx="14" ry="8" fill="#0c0718" />`;
}

// EL GAME MASTER: parlante de pared con un ojo LED rojo y rejilla. 300 x 300.
// Clases: P-gm-ojo (el LED), P-gm-onda (ondas a la derecha), P-gm-rejilla.
export function gm(P) {
  return `
      <rect class="k" x="0" y="0" width="300" height="300" rx="34" />
      <rect class="b" x="24" y="24" width="252" height="252" rx="24" stroke-width="5" />
      <circle cx="150" cy="104" r="48" fill="#1a0f2e" stroke="#efe9ff" stroke-width="6" />
      <circle class="${P}-gm-ojo led" cx="150" cy="104" r="28" fill="#ff2d3d" />
      <circle cx="140" cy="94" r="8" fill="#efe9ff" opacity="0.8" />
      <g class="${P}-gm-rejilla">
        <path class="l" d="M70 184 H230 M70 210 H230 M70 236 H230" stroke-width="8" />
      </g>
      <g class="${P}-gm-ondas">
        <path class="rl ${P}-gm-onda" d="M320 110 C340 130 340 170 320 190" stroke-width="7" />
        <path class="rl ${P}-gm-onda" d="M350 80 C384 120 384 180 350 220" stroke-width="7" />
        <path class="rl ${P}-gm-onda" d="M380 50 C428 110 428 190 380 250" stroke-width="7" />
      </g>`;
}

// CANDADO 200 x 250. Clases: P-arco (el arco, para abrirlo con svgOrigin), P-cuerpo.
export function candado(P, { color = "r" } = {}) {
  return `
      <path class="l ${P}-arco" d="M50 110 V70 C50 14 150 14 150 70 V110" stroke-width="18" />
      <rect class="${color} ${P}-cuerpo" x="10" y="100" width="180" height="150" rx="22" />
      <circle cx="100" cy="160" r="18" fill="#0c0718" />
      <path d="M100 168 V210" stroke="#0c0718" stroke-width="16" stroke-linecap="round" />`;
}

// CUADERNO abierto 460 x 320 con garabatos. Clase P-garabato (líneas para dibujar).
export function cuaderno(P, { oscuro = false } = {}) {
  const hoja = oscuro ? "b" : "w", tinta = oscuro ? "l" : "d";
  const g = `
      <path class="d fino ${P}-garabato" d="M40 80 C60 70 80 90 100 76 C120 64 140 92 170 78 C186 70 196 82 206 78" />
      <path class="d fino ${P}-garabato" d="M40 130 C70 120 90 146 120 128 C140 118 160 140 200 126" />
      <path class="d fino ${P}-garabato" d="M40 180 C56 170 76 196 96 176 C116 160 130 190 160 176" />
      <path class="d fino ${P}-garabato" d="M40 230 C80 220 100 246 140 226 C160 216 180 236 200 228" />
      <path class="d fino ${P}-garabato" d="M260 80 C290 70 310 96 340 78 C360 66 390 90 420 76" />
      <path class="d fino ${P}-garabato" d="M260 130 C280 146 300 116 330 132 C350 142 370 120 400 130" />
      <path class="d fino ${P}-garabato" d="M260 180 C300 170 320 196 360 178 C380 170 400 188 420 180" />`;
  return `
      <path class="${hoja}" d="M230 30 C170 10 70 10 10 30 V300 C70 280 170 280 230 300 Z" />
      <path class="${hoja}" d="M230 30 C290 10 390 10 450 30 V300 C390 280 290 280 230 300 Z" />
      <path class="${oscuro ? "l" : "d"}" d="M230 30 V300" stroke-width="5" />
      ${oscuro ? "" : g}`;
}
function _viejo(P) {
  return `
      <path class="d fino ${P}-garabato" d="M40 80 C60 70 80 90 100 76 C120 64 140 92 170 78 C186 70 196 82 206 78" />
      <path class="d fino ${P}-garabato" d="M40 130 C70 120 90 146 120 128 C140 118 160 140 200 126" />
      <path class="d fino ${P}-garabato" d="M40 180 C56 170 76 196 96 176 C116 160 130 190 160 176" />
      <path class="d fino ${P}-garabato" d="M40 230 C80 220 100 246 140 226 C160 216 180 236 200 228" />
      <path class="d fino ${P}-garabato" d="M260 80 C290 70 310 96 340 78 C360 66 390 90 420 76" />
      <path class="d fino ${P}-garabato" d="M260 130 C280 146 300 116 330 132 C350 142 370 120 400 130" />
      <path class="d fino ${P}-garabato" d="M260 180 C300 170 320 196 360 178 C380 170 400 188 420 180" />`;
}

// PLANILLA (hoja de cálculo) 300 x 400 con título y número grande. Clases: P-pN, P-pN-tit, P-pN-num.
export function hoja(P, n, titulo, numero, { tcolor = "#0c0718" } = {}) {
  let grilla = "";
  for (let r = 0; r < 6; r++) grilla += `<path class="d fino" d="M20 ${120 + r * 46} H280" opacity="0.35" />`;
  for (let c = 0; c < 4; c++) grilla += `<path class="d fino" d="M${20 + c * 87} 120 V350" opacity="0.35" />`;
  return `
      <rect class="w" x="0" y="0" width="300" height="400" rx="16" />
      <rect x="0" y="0" width="300" height="96" rx="16" fill="#9b5cff" />
      <rect x="0" y="60" width="300" height="36" fill="#9b5cff" />
      ${grilla}
      ${[].concat(titulo).map((t, i, a) => `<text class="${P}-p${n}-tit slex" x="150" y="${a.length > 1 ? 40 + i * 34 : 60}" text-anchor="middle" font-size="${a.length > 1 ? 27 : 30}" fill="${tcolor}">${t}</text>`).join("")}
      <text class="${P}-p${n}-num slex" x="150" y="300" text-anchor="middle" font-size="130" fill="#0c0718">${numero}</text>`;
}

// CAJA de cartón 140 x 120.
export function caja(P, { q = false } = {}) {
  return `
      <path class="u" d="M10 30 H130 V120 H10 Z" stroke-width="6" />
      <path class="l" d="M10 30 L30 6 H150 L130 30 M130 120 L150 96 V6" stroke-width="6" />
      <path class="d" d="M50 30 V60 H90 V30" stroke-width="5" opacity="0.6" />
      ${q ? `<text x="70" y="108" text-anchor="middle" class="slex brilla" font-size="44" fill="#39ffd2">?</text>` : ""}`;
}

// PUERTA de depósito 380 x 640 con marco y manija. Clase P-hoja (la hoja, para abrirla).
export function puerta(P, { afuera = false } = {}) {
  return `
      <rect class="k" x="0" y="0" width="380" height="640" rx="8" />
      ${afuera ? `<rect class="${P}-afuera" x="20" y="20" width="340" height="620" fill="#5ce611" opacity="0" />` : ""}
      <g class="${P}-hoja">
        <rect class="b" x="20" y="20" width="340" height="620" rx="6" />
        <path class="l fino" d="M60 70 H320 V300 H60 Z M60 360 H320 V590 H60 Z" opacity="0.5" />
        <circle class="w" cx="318" cy="340" r="14" stroke-width="5" />
        <text x="190" y="190" text-anchor="middle" class="mono" font-size="34" letter-spacing="6" fill="#ff2d3d">DEPÓSITO</text>
      </g>`;
}

// CELULAR 380 x 720 (marco). Pantalla: x 24..356, y 70..680.
export function celular(P) {
  return `
      <rect class="k" x="0" y="0" width="380" height="720" rx="52" />
      <path class="l" d="M150 36 H230" stroke-width="8" />`;
}

// LOCAL (fachada) 300 x 300. Clase P-cartel.
export function local(P, nombre, cls = "u") {
  return `
      <path class="${cls}" d="M20 300 V110 H280 V300" />
      <path class="w" d="M0 110 L30 40 H270 L300 110 Z" stroke-width="6" />
      <path class="d" d="M60 40 L46 110 M110 40 L104 110 M150 40 V110 M190 40 L196 110 M240 40 L254 110" stroke-width="5" opacity="0.5" />
      <rect class="k" x="50" y="160" width="90" height="140" rx="6" stroke-width="6" />
      <rect class="k" x="170" y="160" width="90" height="80" rx="6" stroke-width="6" />
      <text x="150" y="30" text-anchor="middle" class="mono" font-size="30" letter-spacing="4" fill="#efe9ff">${nombre}</text>`;
}
