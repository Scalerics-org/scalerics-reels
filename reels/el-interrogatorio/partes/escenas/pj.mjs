// Personajes y utilería de "El interrogatorio" (iguales en todas las escenas). SVG en coordenadas
// locales; la escena los ubica con <g transform="translate(..) scale(..)">. P = prefijo de la escena.
// Personajes: 360 x 540 (el cuerpo termina en y 540, la cabeza centrada en x 180, y 250).

const cuerpo = (cls) => `<path class="${cls}" d="M24 540 C24 404 92 362 180 362 C268 362 336 404 336 540 Z" />`;
const orejas = `<ellipse class="piel" cx="100" cy="258" rx="16" ry="24" stroke-width="5" /><ellipse class="piel" cx="260" cy="258" rx="16" ry="24" stroke-width="5" />`;
const boca = (P, t, tipo) =>
  tipo === "sonrisa"
    ? `<path class="d ${P}-${t}-boca" data-o="180 304" d="M150 300 C162 318 200 318 212 298" stroke-width="7" />`
    : tipo === "mueca"
      ? `<path class="d ${P}-${t}-boca" data-o="180 312" d="M150 318 C164 304 198 304 212 318" stroke-width="7" />`
      : `<ellipse class="${P}-${t}-boca" data-o="180 312" cx="180" cy="312" rx="18" ry="12" fill="#111815" />`;

// EL POLICÍA MALO (Algenib): camisa blanca arremangada, corbata roja floja, cartuchera,
// pelo cepillo, cejas en V y bigote grueso.
export function malo(P, { b = "abierta" } = {}) {
  return `
      ${cuerpo("w")}
      <path class="d" d="M70 430 C110 470 120 520 124 540 M290 430 C250 470 240 520 236 540" stroke-width="9" />
      <path class="r" d="M162 372 L198 372 L190 400 L206 500 L180 528 L154 500 L170 400 Z" stroke-width="5" />
      ${orejas}
      <ellipse class="piel" cx="180" cy="252" rx="82" ry="98" stroke-width="5" />
      <path class="k" stroke-width="5" d="M98 214 V150 C98 136 108 128 122 128 H238 C252 128 262 136 262 150 V214 C252 186 236 176 222 176 H138 C124 176 108 186 98 214 Z" />
      <path class="d ${P}-malo-cejas" d="M122 210 L168 230 M192 230 L238 210" stroke-width="11" />
      <circle class="${P}-malo-ojos" cx="148" cy="248" r="8" fill="#111815" />
      <circle class="${P}-malo-ojos" cx="212" cy="248" r="8" fill="#111815" />
      <path class="d" d="M180 254 L172 284 H188" stroke-width="5" opacity="0.6" />
      <path class="dk" d="M128 298 C148 280 212 280 232 298 C214 306 146 306 128 298 Z" />
      ${boca(P, "malo", b)}`;
}

// LA POLICÍA BUENA (Kore): saco verde gris, camisa blanca, placa dorada, rodete y sonrisa.
export function buena(P, { b = "sonrisa" } = {}) {
  return `
      <circle class="dk" cx="180" cy="128" r="44" />
      ${cuerpo("g")}
      <path class="w" d="M138 366 L180 450 L222 366 Z" stroke-width="5" />
      <path class="d" d="M138 366 L160 470 M222 366 L200 470" stroke-width="5" opacity="0.6" />
      <path class="y" d="M262 440 L272 460 L294 462 L278 476 L284 498 L262 486 L240 498 L246 476 L230 462 L252 460 Z" stroke-width="4" />
      ${orejas}
      <ellipse class="piel" cx="180" cy="252" rx="80" ry="96" stroke-width="5" />
      <path class="dk" d="M98 250 C90 170 130 150 180 150 C232 150 272 170 262 250 C250 206 226 188 196 186 C170 198 130 206 98 250 Z" />
      <path class="d ${P}-buena-cejas" d="M128 220 C140 210 158 210 168 216 M192 216 C202 210 220 210 232 220" stroke-width="6" />
      <circle class="${P}-buena-ojos" cx="150" cy="248" r="8" fill="#111815" />
      <circle class="${P}-buena-ojos" cx="210" cy="248" r="8" fill="#111815" />
      <circle cx="122" cy="282" r="12" fill="#e5484d" opacity="0.35" />
      <circle cx="238" cy="282" r="12" fill="#e5484d" opacity="0.35" />
      ${boca(P, "buena", b)}`;
}

// EL DUEÑO (Charon): cocinero con chaqueta blanca, pañuelo rojo, gorro de chef, bigote,
// cejas de preocupado y gotas de sudor (P-gota).
export function dueno(P, { b = "abierta", gorro = true } = {}) {
  return `
      ${cuerpo("w")}
      <path class="r" d="M140 368 L220 368 L180 420 Z" stroke-width="5" />
      <circle cx="150" cy="450" r="7" fill="#111815" /><circle cx="210" cy="450" r="7" fill="#111815" />
      <circle cx="146" cy="500" r="7" fill="#111815" /><circle cx="214" cy="500" r="7" fill="#111815" />
      ${orejas}
      <ellipse class="piel" cx="180" cy="256" rx="80" ry="94" stroke-width="5" />
      ${gorro ? `<g class="${P}-gorro">
        <path class="w" d="M112 196 V150 C76 140 82 84 122 90 C128 50 174 44 186 72 C206 44 254 54 248 94 C288 96 286 146 250 150 V196 Z" />
        <path class="d" d="M112 168 H250" stroke-width="5" opacity="0.5" />
        <path class="d" d="M150 150 C150 130 156 118 164 110 M210 150 C210 130 206 118 198 110" stroke-width="4" opacity="0.4" />
      </g>` : `<path class="dk" d="M104 210 C104 170 140 160 180 160 C220 160 256 170 256 210 C230 190 130 190 104 210 Z" />`}
      <path class="d ${P}-dueno-cejas" d="M128 228 L168 214 M192 214 L232 228" stroke-width="7" />
      <circle class="${P}-dueno-ojos" cx="150" cy="250" r="9" fill="#111815" />
      <circle class="${P}-dueno-ojos" cx="210" cy="250" r="9" fill="#111815" />
      <path class="dk" d="M140 290 C156 280 204 280 220 290 C204 298 156 298 140 290 Z" stroke-width="4" />
      ${boca(P, "dueno", b)}
      <path class="w ${P}-gota" d="M86 196 C76 214 76 226 86 230 C96 226 96 214 86 196 Z" stroke-width="3" opacity="0.85" />
      <path class="w ${P}-gota" d="M276 214 C266 232 266 244 276 248 C286 244 286 232 276 214 Z" stroke-width="3" opacity="0.85" />`;
}

// EL AGENTE DE IA (verde Scalerics): un celular con cara y vincha de auriculares. 300 x 480.
export function agente(P, { b = "sonrisa" } = {}) {
  return `
      <rect class="k" x="20" y="20" width="260" height="460" rx="46" />
      <rect class="s" x="40" y="70" width="220" height="370" rx="20" stroke-width="5" />
      <path class="l" d="M120 44 H180" stroke-width="7" />
      <path class="sl ${P}-vincha" d="M10 230 C10 60 290 60 290 230" stroke="#efeadf" stroke-width="12" />
      <rect class="w" x="-8" y="200" width="36" height="74" rx="14" stroke-width="5" />
      <rect class="w" x="272" y="200" width="36" height="74" rx="14" stroke-width="5" />
      <path class="l" d="M272 262 C250 320 210 330 180 330" stroke-width="6" />
      <circle cx="176" cy="330" r="10" fill="#efeadf" />
      <ellipse class="${P}-agente-ojos" cx="112" cy="200" rx="16" ry="20" fill="#111815" />
      <ellipse class="${P}-agente-ojos" cx="188" cy="200" rx="16" ry="20" fill="#111815" />
      ${b === "sonrisa"
        ? `<path class="d ${P}-agente-boca" data-o="150 260" d="M108 252 C126 290 174 290 192 252" stroke-width="8" />`
        : `<ellipse class="${P}-agente-boca" data-o="150 264" cx="150" cy="264" rx="22" ry="14" fill="#111815" />`}`;
}

// FOTO de prueba con clip, 420 x 360 por defecto: marco hueso, adentro k. El contenido va aparte
// (coordenadas de la foto). Clase P-clip para el clip.
export function foto(P, { w = 420, h = 360, rot = 0, contenido = "" } = {}) {
  return `
      <g transform="rotate(${rot} ${w / 2} ${h / 2})">
        <rect class="w" x="0" y="0" width="${w}" height="${h}" rx="6" stroke-width="4" />
        <rect x="22" y="22" width="${w - 44}" height="${h - 92}" fill="#111815" />
        ${contenido}
        <path class="${P}-clip" d="M${w / 2 - 20} 40 V-30 C${w / 2 - 20} -56 ${w / 2 + 24} -56 ${w / 2 + 24} -30 V50 C${w / 2 + 24} 66 ${w / 2 - 4} 66 ${w / 2 - 4} 50 V-20" fill="none" stroke="#9aa8a0" stroke-width="7" stroke-linecap="round" />
      </g>`;
}

// CARPETA de expediente manila 520 x 380 (cerrada), con solapa y etiqueta.
export function carpeta(P, texto = "CASO 21:14") {
  return `
      <path class="m" d="M0 40 H170 L196 0 H330 L356 40 H520 V380 H0 Z" />
      <path class="d" d="M0 80 H520" stroke-width="4" opacity="0.35" />
      <rect x="150" y="170" width="220" height="70" fill="#efeadf" stroke="#111815" stroke-width="4" />
      <text x="260" y="216" text-anchor="middle" class="mono" font-size="28" letter-spacing="3" fill="#111815">${texto}</text>`;
}

// TAZA de café 160 x 150 con humo (P-humo).
export function taza(P) {
  return `
      <path class="l fino ${P}-humo" d="M50 30 C34 10 66 -10 50 -36 M90 30 C74 10 106 -10 90 -36" stroke-width="5" opacity="0.7" />
      <path class="w" d="M14 46 H126 V120 C126 140 110 150 90 150 H50 C30 150 14 140 14 120 Z" />
      <path class="l" d="M126 66 C162 66 162 116 126 116" stroke-width="8" />
      <path class="d" d="M24 70 H116" stroke-width="5" opacity="0.4" />`;
}

// TELÉFONO de escritorio viejo 300 x 220 (rojo). Clase P-tubo (el tubo, para que salte).
export function telefono(P) {
  return `
      <path class="r" d="M30 220 L60 90 H240 L270 220 Z" />
      <circle cx="150" cy="160" r="40" fill="#111815" stroke="#efeadf" stroke-width="5" />
      <circle cx="150" cy="160" r="12" fill="#efeadf" />
      <g class="${P}-tubo">
        <path class="r" d="M10 70 C10 30 40 20 70 20 H230 C260 20 290 30 290 70 L250 80 C240 60 230 56 210 56 H90 C70 56 60 60 50 80 Z" />
      </g>`;
}

// SARTÉN con milanesa 380 x 120. Clase P-mila (la milanesa, para que salte).
export function sarten(P) {
  return `
      <path class="k" d="M0 40 H260 C260 100 220 120 130 120 C40 120 0 100 0 40 Z" />
      <path class="l" d="M260 60 H380" stroke-width="20" />
      <path class="m ${P}-mila" d="M40 34 C40 10 90 0 130 6 C180 0 226 10 222 34 C224 50 180 56 130 52 C80 56 40 52 40 34 Z" stroke-width="5" />`;
}

// CELULAR 300 x 560 con pantalla. Pantalla x 20..280, y 60..520.
export function celular(P, { pantalla = "#111815" } = {}) {
  return `
      <rect class="k" x="0" y="0" width="300" height="560" rx="42" />
      <rect x="20" y="60" width="260" height="460" rx="14" fill="${pantalla}" stroke="#efeadf" stroke-width="3" opacity="1" />
      <path class="l" d="M120 32 H180" stroke-width="7" />`;
}

// RELOJ de pared, radio r, centrado en 0,0. Agujas P-ah (hora) y P-am (minutos) apuntando a 12:
// la escena las rota con svgOrigin "0 0".
export function reloj(P, { r = 120, h = 9, m = 14 } = {}) {
  let marcas = "";
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    marcas += `<path d="M${(Math.sin(a) * r * 0.78).toFixed(1)} ${(-Math.cos(a) * r * 0.78).toFixed(1)} L${(Math.sin(a) * r * 0.9).toFixed(1)} ${(-Math.cos(a) * r * 0.9).toFixed(1)}" stroke="#111815" stroke-width="${i % 3 ? 4 : 8}" stroke-linecap="round" />`;
  }
  return `
      <circle class="w" cx="0" cy="0" r="${r}" />
      <circle cx="0" cy="0" r="${r}" fill="none" stroke="#111815" stroke-width="8" />
      ${marcas}
      <g class="${P}-ah" transform="rotate(${h * 30 + m * 0.5})"><path d="M0 10 V${-r * 0.48}" stroke="#111815" stroke-width="12" stroke-linecap="round" /></g>
      <g class="${P}-am" transform="rotate(${m * 6})"><path d="M0 14 V${-r * 0.72}" stroke="#111815" stroke-width="7" stroke-linecap="round" /></g>
      <circle cx="0" cy="0" r="10" fill="#e5484d" />`;
}

// FACHADA de restaurante 340 x 300 con toldo a rayas (color del toldo: clase).
export function resto(P, nombre, cls = "r") {
  return `
      <path class="b" d="M20 300 V100 H320 V300" />
      <path class="${cls}" d="M0 100 L30 30 H310 L340 100 Z" stroke-width="6" />
      <path class="d" d="M70 30 L58 100 M120 30 L114 100 M170 30 V100 M220 30 L226 100 M270 30 L282 100" stroke-width="5" opacity="0.4" />
      <rect class="k" x="50" y="150" width="100" height="150" rx="6" stroke-width="6" />
      <rect class="y" x="190" y="150" width="100" height="80" rx="6" stroke-width="6" opacity="0.9" />
      <text x="170" y="82" text-anchor="middle" class="mono" font-size="26" letter-spacing="3" fill="#111815">${nombre}</text>`;
}

// LA CLIENTA (Leda): pelo largo suelto, buzo rojo, celular en la mano.
export function clienta(P, { b = "sonrisa" } = {}) {
  return `
      <path fill="#5a3d26" stroke="#5a3d26" stroke-width="5" d="M92 250 C80 160 126 140 180 140 C236 140 282 160 268 250 L286 420 H74 Z" />
      ${cuerpo("r")}
      ${orejas}
      <ellipse class="piel" cx="180" cy="252" rx="78" ry="94" stroke-width="5" />
      <path fill="#5a3d26" stroke="#5a3d26" stroke-width="5" d="M100 236 C104 176 140 156 182 156 C226 156 258 178 262 236 C236 200 200 190 170 196 C140 202 116 214 100 236 Z" />
      <path class="d ${P}-clienta-cejas" d="M130 222 C142 214 158 214 166 220 M194 220 C204 214 220 214 232 222" stroke-width="5" />
      <circle class="${P}-clienta-ojos" cx="150" cy="250" r="8" fill="#111815" />
      <circle class="${P}-clienta-ojos" cx="210" cy="250" r="8" fill="#111815" />
      ${boca(P, "clienta", b)}
      <g class="${P}-clienta-cel">
        <rect class="k" x="236" y="384" width="74" height="130" rx="14" stroke-width="5" />
        <rect x="248" y="400" width="50" height="94" rx="4" fill="#ffd23f" opacity="0.85" />
        <ellipse class="piel" cx="262" cy="500" rx="34" ry="24" stroke-width="5" />
      </g>`;
}

// SILUETA del próximo sospechoso (sin cara) con un signo de pregunta.
export function silueta(P) {
  return `
      ${cuerpo("k")}
      <ellipse class="k" cx="180" cy="250" rx="80" ry="96" />
      <text class="${P}-q slex" x="180" y="292" text-anchor="middle" font-size="130" fill="#ffd23f">?</text>`;
}

// FICHA policial: pared con rayas de altura 480 x 600 (el personaje va encima, aparte) y la placa.
export function rayas(P, { w = 480, h = 600 } = {}) {
  let r = "";
  for (let i = 0; i <= 10; i++) {
    const y = 40 + i * 52;
    r += `<path d="M20 ${y} H${w - 20}" stroke="#efeadf" stroke-width="${i % 2 ? 2 : 4}" opacity="${i % 2 ? 0.25 : 0.5}" />`;
    if (i % 2 === 0) r += `<text x="${w - 30}" y="${y - 8}" text-anchor="end" class="mono" font-size="20" fill="#efeadf" opacity="0.6">${(2 - i * 0.1).toFixed(1)}</text>`;
  }
  return `<rect class="b" x="0" y="0" width="${w}" height="${h}" rx="8" stroke-width="5" />${r}`;
}
export function placa(P, lineas, { w = 380 } = {}) {
  return `
      <rect class="k" x="0" y="0" width="${w}" height="${54 + lineas.length * 40}" rx="6" stroke-width="5" />
      ${lineas.map((t, i) => `<text x="${w / 2}" y="${46 + i * 40}" text-anchor="middle" class="mono" font-size="30" letter-spacing="2" fill="#efeadf">${t}</text>`).join("")}`;
}
