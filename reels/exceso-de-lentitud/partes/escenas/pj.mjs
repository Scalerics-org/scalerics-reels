// Personajes y utilería de "Exceso de lentitud" (iguales en todas las escenas). SVG en coordenadas
// locales; la escena los ubica con <g transform="translate(..) scale(..)">. P = prefijo de la escena.
// Personajes: 360 x 540 (el cuerpo termina en y 540, la cabeza centrada en x 180, y 250).

const cuerpo = (cls, extra = "") => `<path class="${cls}" ${extra} d="M24 540 C24 404 92 362 180 362 C268 362 336 404 336 540 Z" />`;
const orejas = `<ellipse class="piel" cx="100" cy="258" rx="16" ry="24" stroke-width="5" /><ellipse class="piel" cx="260" cy="258" rx="16" ry="24" stroke-width="5" />`;
const boca = (P, t, tipo) =>
  tipo === "sonrisa"
    ? `<path class="d ${P}-${t}-boca" data-o="180 304" d="M150 300 C162 318 200 318 212 298" stroke-width="7" />`
    : tipo === "mueca"
      ? `<path class="d ${P}-${t}-boca" data-o="180 312" d="M150 318 C164 304 198 304 212 318" stroke-width="7" />`
      : tipo === "seca"
        ? `<path class="d ${P}-${t}-boca" data-o="180 308" d="M154 308 H206" stroke-width="7" />`
        : `<ellipse class="${P}-${t}-boca" data-o="180 312" cx="180" cy="312" rx="18" ry="12" fill="#0b1020" />`;

// LA INSPECTORA (Kore): gorra azul de visera con escudo dorado, cola de caballo, camisa azul,
// chaleco reflectivo naranja con dos franjas hueso, radio al hombro. Cejas rectas, cara de trámite.
export function inspectora(P, { b = "seca" } = {}) {
  return `
      <path fill="#3a2414" stroke="#3a2414" stroke-width="5" d="M246 214 C300 230 306 300 282 352 C270 330 262 290 244 262 Z" />
      ${cuerpo("az")}
      <path class="m" d="M60 430 C70 396 110 374 146 368 L172 470 L172 540 H44 C44 500 50 460 60 430 Z" stroke-width="6" />
      <path class="m" d="M300 430 C290 396 250 374 214 368 L188 470 L188 540 H316 C316 500 310 460 300 430 Z" stroke-width="6" />
      <path d="M50 478 H172 M188 478 H310 M46 512 H172 M188 512 H314" stroke="#efeadf" stroke-width="12" />
      <rect class="k" x="226" y="392" width="34" height="56" rx="6" stroke-width="4" />
      <path class="l" d="M252 392 V364" stroke-width="5" />
      ${orejas}
      <ellipse class="piel" cx="180" cy="256" rx="80" ry="94" stroke-width="5" />
      <path fill="#3a2414" stroke="#3a2414" stroke-width="5" d="M102 236 C104 214 112 204 124 200 H236 C248 204 256 214 258 236 C240 222 220 218 180 218 C140 218 120 222 102 236 Z" />
      <g class="${P}-gorra">
        <path class="az" d="M98 204 C96 160 112 116 180 112 C248 116 264 160 262 204 Z" stroke-width="6" />
        <path d="M100 194 H260" stroke="#efeadf" stroke-width="8" stroke-dasharray="14 10" opacity="0.8" />
        <path class="dk" d="M90 204 C130 190 230 190 270 204 C252 222 108 222 90 204 Z" />
        <path class="y" d="M180 132 L198 140 V160 C198 172 190 178 180 182 C170 178 162 172 162 160 V140 Z" stroke-width="4" />
      </g>
      <path class="d ${P}-ins-cejas" d="M126 232 H166 M194 232 H234" stroke-width="7" />
      <circle class="${P}-ins-ojos" cx="148" cy="256" r="8" fill="#0b1020" />
      <circle class="${P}-ins-ojos" cx="212" cy="256" r="8" fill="#0b1020" />
      <path class="d" d="M180 262 L174 286 H186" stroke-width="5" opacity="0.5" />
      ${boca(P, "ins", b)}`;
}

// EL DUEÑO (Charon): unos 50, pelado con costados grises, bigote gris, ojeras, camisa celeste
// arremangada. Gotas de sudor (P-gota) para cuando se pone nervioso.
export function dueno(P, { b = "abierta" } = {}) {
  return `
      ${cuerpo("", 'fill="#7fa6d6" stroke="#efeadf" stroke-width="7" stroke-linejoin="round"')}
      <path class="w" d="M140 366 L180 420 L220 366 L206 362 L180 396 L154 362 Z" stroke-width="5" />
      <circle cx="180" cy="452" r="6" fill="#0b1020" /><circle cx="180" cy="500" r="6" fill="#0b1020" />
      ${orejas}
      <ellipse class="piel" cx="180" cy="256" rx="82" ry="96" stroke-width="5" />
      <path fill="#a8a8b0" stroke="#a8a8b0" stroke-width="5" d="M98 250 C92 214 98 196 112 188 C114 206 112 222 118 238 Z M262 250 C268 214 262 196 248 188 C246 206 248 222 242 238 Z" />
      <path class="d" d="M150 176 C160 170 174 170 182 174" stroke-width="4" opacity="0.35" />
      <path class="d ${P}-dueno-cejas" d="M128 226 L168 216 M192 216 L232 226" stroke-width="7" />
      <circle class="${P}-dueno-ojos" cx="150" cy="250" r="9" fill="#0b1020" />
      <circle class="${P}-dueno-ojos" cx="210" cy="250" r="9" fill="#0b1020" />
      <path d="M132 270 C142 278 158 278 166 270 M194 270 C202 278 218 278 228 270" fill="none" stroke="#8a6f9e" stroke-width="5" stroke-linecap="round" opacity="0.8" />
      <path fill="#a8a8b0" stroke="#efeadf" stroke-width="3" d="M138 292 C154 278 206 278 222 292 C206 302 154 302 138 292 Z" />
      ${boca(P, "dueno", b)}
      <path class="w ${P}-gota" d="M86 196 C76 214 76 226 86 230 C96 226 96 214 86 196 Z" stroke-width="3" opacity="0" />
      <path class="w ${P}-gota" d="M276 214 C266 232 266 244 276 248 C286 244 286 232 276 214 Z" stroke-width="3" opacity="0" />`;
}

// AUTO del dueño visto desde afuera, del lado del conductor. 760 x 640. La ventanilla (hueco) va de
// x 70..600, y 60..340; el dueño se pone ATRÁS (antes en el SVG) con autoAtras() y adelante va autoFrente().
// P-vidrio: el vidrio (baja con translate y). Bordó con manija y espejo.
export function autoAtras(P) {
  return `
      <rect x="70" y="60" width="530" height="290" fill="#05080f" />
      <path d="M430 340 V150 C430 120 450 100 480 100 H560 V340 Z" fill="#141a2e" stroke="#2a3352" stroke-width="5" />`;
}
export function autoFrente(P) {
  return `
      <defs><clipPath id="${P}-vent"><path d="M70 340 V120 C70 86 96 60 130 60 H540 C570 60 600 90 600 120 V340 Z" /></clipPath></defs>
      <g clip-path="url(#${P}-vent)">
        <g class="${P}-vidrio">
          <rect x="60" y="50" width="560" height="300" fill="#6d8bd6" opacity="0.32" />
          <path d="M150 60 L90 340 M230 60 L170 340" stroke="#efeadf" stroke-width="14" opacity="0.18" />
        </g>
      </g>
      <path fill="#8c2433" stroke="#efeadf" stroke-width="7" stroke-linejoin="round" fill-rule="evenodd"
        d="M20 640 V110 C20 50 70 10 130 10 H560 C640 10 700 70 720 150 L740 340 V640 Z M70 340 V120 C70 86 96 60 130 60 H540 C570 60 600 90 600 120 V340 Z" />
      <path class="l" d="M70 340 H600" stroke-width="8" />
      <path d="M20 440 H740" stroke="#efeadf" stroke-width="4" opacity="0.35" />
      <rect class="k" x="520" y="400" width="130" height="34" rx="16" stroke-width="5" />
      <path class="k" d="M610 160 L700 150 C730 150 740 180 730 210 L620 220 Z" stroke-width="6" />`;
}
// VOLANTE (adelante del dueño, abajo de la ventanilla), 300 x 300 centrado en 150,150.
export function volante(P) {
  return `
      <circle cx="150" cy="150" r="130" fill="none" stroke="#0b1020" stroke-width="30" />
      <circle cx="150" cy="150" r="130" fill="none" stroke="#efeadf" stroke-width="4" opacity="0.5" />
      <path d="M20 150 H280 M150 150 V280" stroke="#0b1020" stroke-width="22" />`;
}

// LINTERNA 220 x 60, encendida hacia la izquierda (el haz va aparte: P-haz).
export function linterna(P) {
  return `
      <path class="${P}-haz" d="M0 30 L-520 -120 L-520 180 Z" fill="#fff3c4" opacity="0.16" />
      <rect class="k" x="0" y="8" width="170" height="44" rx="10" stroke-width="5" />
      <path class="k" d="M-30 -4 H10 V64 H-30 Z" stroke-width="5" />
      <ellipse cx="-30" cy="30" rx="8" ry="32" fill="#fff3c4" />`;
}

// DÍGITO de 7 segmentos en (x, y), w x h. Usar dentro de un <g class="CLS"> y prender con pinta().
export function dig(x, y, w = 70, h = 130, t = 14, col = "#ffc23a") {
  const hh = h / 2;
  const S = {
    a: [x + t, y, w - 2 * t, t], d: [x + t, y + h - t, w - 2 * t, t], g: [x + t, y + hh - t / 2, w - 2 * t, t],
    f: [x, y + t, t, hh - 1.5 * t], b: [x + w - t, y + t, t, hh - 1.5 * t],
    e: [x, y + hh + t / 2, t, hh - 1.5 * t], c: [x + w - t, y + hh + t / 2, t, hh - 1.5 * t],
  };
  return `<g class="dig">${Object.entries(S).map(([k, [a, b, c, d]]) => `<rect data-s="${k}" x="${a}" y="${b}" width="${c}" height="${d}" rx="${t / 3}" fill="${col}" style="opacity:0.07" />`).join("")}</g>`;
}

// RADAR de mano: pistola gris oscura con display de 3 dígitos (clase P-rd) y antena. 420 x 300.
export function radar(P) {
  return `
      <path class="k" d="M120 150 L150 150 L170 300 H90 Z" stroke-width="6" />
      <rect class="b" x="0" y="20" width="360" height="150" rx="22" stroke-width="6" />
      <path class="k" d="M360 40 H420 V150 H360 Z" stroke-width="6" />
      <ellipse cx="420" cy="95" rx="14" ry="55" fill="#3d7bff" stroke="#efeadf" stroke-width="5" />
      <rect x="30" y="44" width="250" height="102" rx="8" fill="#05080f" stroke="#efeadf" stroke-width="4" />
      <g class="${P}-rd">${dig(48, 58, 50, 74, 10)}${dig(108, 58, 50, 74, 10)}${dig(168, 58, 50, 74, 10)}</g>
      <circle class="${P}-led" cx="310" cy="70" r="12" fill="#ff3b4a" />`;
}

// CONO naranja con dos franjas reflectivas. 140 x 200 (base en y 200).
export function cono(P) {
  return `
      <path class="k" d="M0 186 H140 V200 H0 Z" stroke-width="5" />
      <path class="m" d="M30 186 L62 10 H78 L110 186 Z" stroke-width="5" />
      <path d="M50 74 H90 M42 128 H98" stroke="#efeadf" stroke-width="16" />`;
}

// SEÑAL de límite de velocidad: círculo blanco con borde rojo, r 150, centrada en 0,0. El texto va aparte.
export function senal(P, { r = 150 } = {}) {
  return `
      <path d="M-10 ${r} V${r + 420} H10 V${r} Z" fill="#9aa3b8" stroke="#efeadf" stroke-width="4" />
      <circle cx="0" cy="0" r="${r}" fill="#efeadf" />
      <circle cx="0" cy="0" r="${r - 18}" fill="none" stroke="#ff3b4a" stroke-width="34" />`;
}

// ALCOHOLÍMETRO 200 x 360: cuerpo oscuro, boquilla blanca arriba, pantalla (texto aparte, x 30..170, y 120..230).
export function alcoholimetro(P) {
  return `
      <path class="w" d="M80 0 H120 V70 H80 Z" stroke-width="5" />
      <rect class="b" x="0" y="60" width="200" height="300" rx="34" stroke-width="6" />
      <rect class="${P}-pant" x="24" y="110" width="152" height="130" rx="10" fill="#05080f" stroke="#efeadf" stroke-width="4" />
      <circle cx="70" cy="290" r="18" fill="#ff3b4a" stroke="#efeadf" stroke-width="4" />
      <circle cx="130" cy="290" r="18" fill="#3d7bff" stroke="#efeadf" stroke-width="4" />`;
}

// LIBRETA de actas (multas) 460 x 600, espiral arriba. Las líneas (renglones) van de x 40 a 420.
export function libreta(P) {
  let espiral = "";
  for (let i = 0; i < 9; i++) espiral += `<circle cx="${60 + i * 43}" cy="18" r="12" fill="none" stroke="#9aa3b8" stroke-width="6" />`;
  return `
      <rect class="w" x="0" y="20" width="460" height="580" rx="14" stroke-width="6" />
      <rect x="0" y="20" width="460" height="90" rx="14" fill="#ff8a1f" />
      <text x="230" y="78" text-anchor="middle" class="mono" font-size="30" letter-spacing="3" fill="#0b1020">ACTA Nº 2347</text>
      ${espiral}`;
}

// CELULAR 300 x 560 con pantalla. Pantalla x 20..280, y 60..520.
export function celular(P, { pantalla = "#0b1020" } = {}) {
  return `
      <rect class="k" x="0" y="0" width="300" height="560" rx="42" />
      <rect x="20" y="60" width="260" height="460" rx="14" fill="${pantalla}" stroke="#efeadf" stroke-width="3" />
      <path class="l" d="M120 32 H180" stroke-width="7" />`;
}

// AUTO visto desde arriba (para el mapa), 90 x 150, apuntando hacia arriba. Clase de color.
export function autito(P, cls = "w") {
  return `
      <path d="M8 12 L-30 -60 M82 12 L120 -60" stroke="#fff3c4" stroke-width="30" opacity="0.15" />
      <rect class="${cls}" x="0" y="0" width="90" height="150" rx="26" stroke-width="5" />
      <rect class="k" x="12" y="30" width="66" height="34" rx="8" stroke-width="4" />
      <rect class="k" x="12" y="104" width="66" height="26" rx="8" stroke-width="4" />
      <circle cx="16" cy="8" r="7" fill="#fff3c4" /><circle cx="74" cy="8" r="7" fill="#fff3c4" />`;
}

// FACHADA de local 340 x 300 con toldo (clase del toldo) y nombre.
export function local(P, nombre, cls = "r", luz = true) {
  return `
      <path class="b" d="M20 300 V100 H320 V300" />
      <path class="${cls}" d="M0 100 L30 30 H310 L340 100 Z" stroke-width="6" />
      <path class="d" d="M70 30 L58 100 M120 30 L114 100 M170 30 V100 M220 30 L226 100 M270 30 L282 100" stroke-width="5" opacity="0.4" />
      <rect class="k" x="50" y="150" width="100" height="150" rx="6" stroke-width="6" />
      <rect x="190" y="150" width="100" height="80" rx="6" fill="${luz ? "#ffc23a" : "#0b1020"}" stroke="#efeadf" stroke-width="6" />
      <text x="170" y="82" text-anchor="middle" class="mono" font-size="26" letter-spacing="3" fill="#0b1020">${nombre}</text>`;
}

// EL AGENTE DE IA (verde Scalerics): un celular con cara, gorra de inspector verde y auriculares. 300 x 480.
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
      <ellipse class="${P}-agente-ojos" cx="112" cy="200" rx="16" ry="20" fill="#0b1020" />
      <ellipse class="${P}-agente-ojos" cx="188" cy="200" rx="16" ry="20" fill="#0b1020" />
      ${b === "sonrisa"
        ? `<path class="d ${P}-agente-boca" data-o="150 260" d="M108 252 C126 290 174 290 192 252" stroke-width="8" />`
        : `<ellipse class="${P}-agente-boca" data-o="150 264" cx="150" cy="264" rx="22" ry="14" fill="#0b1020" />`}`;
}

// LA CLIENTA (de lejos, en el mapa no; en s11 en el auto): pelo castaño, buzo rojo.
export function clienta(P, { b = "sonrisa" } = {}) {
  return `
      <path fill="#5a3d26" stroke="#5a3d26" stroke-width="5" d="M92 250 C80 160 126 140 180 140 C236 140 282 160 268 250 L286 420 H74 Z" />
      ${cuerpo("r")}
      ${orejas}
      <ellipse class="piel" cx="180" cy="252" rx="78" ry="94" stroke-width="5" />
      <path fill="#5a3d26" stroke="#5a3d26" stroke-width="5" d="M100 236 C104 176 140 156 182 156 C226 156 258 178 262 236 C236 200 200 190 170 196 C140 202 116 214 100 236 Z" />
      <path class="d ${P}-clienta-cejas" d="M130 222 C142 214 158 214 166 220 M194 220 C204 214 220 214 232 222" stroke-width="5" />
      <circle class="${P}-clienta-ojos" cx="150" cy="250" r="8" fill="#0b1020" />
      <circle class="${P}-clienta-ojos" cx="210" cy="250" r="8" fill="#0b1020" />
      ${boca(P, "clienta", b)}`;
}
