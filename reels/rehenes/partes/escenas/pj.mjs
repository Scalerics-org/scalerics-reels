// Personajes y utilería de "Rehenes" (iguales en todas las escenas). SVG en coordenadas locales;
// la escena los ubica con <g transform="translate(..) scale(..)">. P = prefijo de la escena.

// LA PLANILLA: pantalla monstruo, 640 x 520. Ojos = dos celdas rojas; boca = fila de celdas con dientes.
// Clases animables: P-pl-ojo (los dos), P-pl-pupila, P-pl-ceja, P-pl-boca (data-o = centro para svgOrigin),
// P-pl-celda (celdas de datos que se pueden llenar), P-pl-dato (textos chicos de celdas).
export function planilla(P, { ojos = "rojos", tx = 0, ty = 0 } = {}) {
  const cols = ["A", "B", "C", "D", "E"];
  let grilla = "";
  for (let c = 0; c <= 5; c++) grilla += `<path class="vl fino" d="M${64 + c * 115} 56 V518" />`;
  for (let r = 0; r <= 6; r++) grilla += `<path class="vl fino" d="M0 ${56 + r * 77} H640" />`;
  const letras = cols.map((l, i) => `<text x="${64 + i * 115 + 57}" y="40" text-anchor="middle" class="smono" fill="#21a366" data-layout-ignore>${l}</text>`).join("");
  const nums = [1, 2, 3, 4, 5, 6].map((n, i) => `<text x="32" y="${56 + i * 77 + 50}" text-anchor="middle" class="smono" fill="#21a366" data-layout-ignore>${n}</text>`).join("");
  const ojoFill = ojos === "rojos" ? "#ff3b3b" : "#f2f2f2";
  const ax = tx + 320, ay = ty + 325;
  return `
      <rect class="vd" x="0" y="0" width="640" height="518" rx="22" />
      <rect x="0" y="0" width="640" height="56" rx="22" fill="#21a366" opacity="0.25" />
      ${grilla}${letras}${nums}
      <text class="${P}-pl-dato smono" x="70" y="${133 + 48}" fill="#21a366" data-layout-ignore>PEDIDO</text>
      <text class="${P}-pl-dato smono" x="540" y="${210 + 48}" fill="#21a366" data-layout-ignore>#REF!</text>
      <text class="${P}-pl-dato smono" x="70" y="${364 + 48}" fill="#21a366" data-layout-ignore>STOCK</text>
      <text class="${P}-pl-dato smono" x="545" y="${441 + 48}" fill="#21a366" data-layout-ignore>???</text>
      <!-- ojos: celdas B2 y D2 -->
      <rect class="${P}-pl-ojo" x="186" y="140" width="101" height="63" rx="6" fill="${ojoFill}" style="filter: drop-shadow(0 0 18px rgba(255,59,59,0.8))" />
      <rect class="${P}-pl-ojo" x="416" y="140" width="101" height="63" rx="6" fill="${ojoFill}" style="filter: drop-shadow(0 0 18px rgba(255,59,59,0.8))" />
      <rect class="${P}-pl-pupila" x="226" y="154" width="26" height="36" rx="4" fill="#0a0d14" />
      <rect class="${P}-pl-pupila" x="456" y="154" width="26" height="36" rx="4" fill="#0a0d14" />
      <path class="l ${P}-pl-ceja" d="M176 112 L296 138 M526 112 L406 138" stroke-width="12" />
      <!-- boca: B4:D4 -->
      <g class="${P}-pl-boca" data-o="${ax} ${ay}">
        <rect x="186" y="296" width="331" height="58" rx="8" fill="#0a0d14" stroke="#f2f2f2" stroke-width="6" />
        <path d="M200 298 L216 318 L232 298 L248 318 L264 298 L280 318 L296 298 L312 318 L328 298 L344 318 L360 298 L376 318 L392 298 L408 318 L424 298 L440 318 L456 298 L472 318 L488 298 L504 318" fill="none" stroke="#f2f2f2" stroke-width="5" stroke-linejoin="round" />
        <path d="M200 352 L216 334 L232 352 L248 334 L264 352 L280 334 L296 352 L312 334 L328 352 L344 334 L360 352 L376 334 L392 352 L408 334 L424 352 L440 334 L456 352 L472 334 L488 352 L504 334" fill="none" stroke="#f2f2f2" stroke-width="5" stroke-linejoin="round" />
      </g>`;
}

// EL DUEÑO de rehén, de perfil frente a la compu, 300 x 300 (silueta oscura recortada por la luz verde)
export function duenoCompu(P) {
  return `
      <rect x="170" y="70" width="120" height="96" rx="8" fill="#21a366" stroke="#f2f2f2" stroke-width="6" style="filter: drop-shadow(0 0 22px rgba(33,163,102,0.9))" />
      <path class="vl" d="M188 98 H272 M188 122 H272 M188 146 H272 M216 80 V160 M244 80 V160" stroke="#0e2a1e" stroke-width="4" />
      <path class="l" d="M230 166 V196 M200 198 H262" stroke-width="6" />
      <path class="l" d="M20 200 H290" stroke-width="7" />
      <path class="k ${P}-dueno" d="M60 300 C50 240 66 186 104 160 C118 150 134 150 140 160 C150 176 150 196 158 196 L186 196 L186 208 L130 214 C118 240 114 270 116 300 Z" stroke-width="6" />
      <circle class="k ${P}-dueno-cabeza" cx="132" cy="122" r="34" stroke-width="6" />
      <path class="l" d="M96 300 V250" stroke-width="5" opacity="0.5" />`;
}

// EL NEGOCIADOR (policía), 360 x 540: torso azul, gorra, bigote, megáfono a la derecha.
// Clases: P-poli-boca (data-o), P-poli-brazo (con el megáfono), P-poli-ojos
export function poli(P, { megafono = true } = {}) {
  return `
      <path class="a" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />
      <path class="l" d="M150 372 L180 420 L210 372" stroke-width="6" />
      <path class="y" d="M226 430 l14 -8 l14 8 v18 c0 10 -14 16 -14 16 c0 0 -14 -6 -14 -16 Z" stroke-width="4" />
      <path class="l" d="M180 430 V530" stroke-width="5" opacity="0.6" />
      <ellipse class="cara" cx="180" cy="250" rx="80" ry="94" />
      <circle class="${P}-poli-ojos" cx="150" cy="242" r="9" fill="#0a0d14" />
      <circle class="${P}-poli-ojos" cx="212" cy="242" r="9" fill="#0a0d14" />
      <path class="d" d="M132 222 L166 216 M196 216 L230 222" stroke-width="7" />
      <path d="M138 286 C156 274 204 274 222 286 C206 296 154 296 138 286 Z" fill="#0a0d14" />
      <ellipse class="${P}-poli-boca" data-o="180 306" cx="180" cy="306" rx="20" ry="11" fill="#0a0d14" />
      <path class="a" d="M92 196 C88 132 150 108 180 108 C210 108 272 132 268 196 Z" />
      <path class="k" d="M84 196 H290 C290 214 270 218 250 216 H84 Z" stroke-width="6" />
      <path class="y" d="M168 132 h24 v26 l-12 8 l-12 -8 Z" stroke-width="4" />
      ${megafono ? `<g class="${P}-poli-brazo">
        <path class="a" d="M290 450 C330 420 330 360 300 320" stroke-width="7" />
        <path class="w" d="M262 286 L292 278 L392 220 L410 330 L304 320 L270 318 Z" stroke-width="6" />
        <path class="k" d="M392 220 C412 236 420 300 410 330" stroke-width="6" />
        <path class="rl" d="M300 282 L304 318" stroke-width="6" />
        <rect class="k" x="296" y="322" width="26" height="46" rx="8" stroke-width="5" />
      </g>` : ""}`;
}

// LA HIJA, 360 x 540: buzo rojo, cola de caballo, boca que grita. Clases: P-hija-boca (data-o), P-hija-cola
export function hija(P) {
  return `
      <path class="b ${P}-hija-cola" d="M250 180 C330 170 340 260 300 330 C290 280 280 240 246 220 Z" />
      <path class="r" d="M40 540 C40 420 96 380 180 380 C264 380 320 420 320 540 Z" />
      <path class="l" d="M140 384 C150 420 210 420 220 384" stroke-width="6" />
      <ellipse class="cara" cx="180" cy="262" rx="76" ry="90" />
      <path class="k" d="M100 250 C92 170 150 150 186 152 C232 154 268 186 258 236 C230 210 170 196 100 250 Z" />
      <path class="d" d="M134 238 L166 248 M226 238 L194 248" stroke-width="7" />
      <circle cx="152" cy="264" r="9" fill="#0a0d14" />
      <circle cx="208" cy="264" r="9" fill="#0a0d14" />
      <ellipse class="${P}-hija-boca" fill="#0a0d14" data-o="180 312" cx="180" cy="312" rx="24" ry="20" />`;
}

// EL DUEÑO de frente, libre (para la cena), 360 x 540. Clase P-dueno-boca
export function dueno(P) {
  return `
      <path class="v" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />
      <path class="l" d="M150 372 L180 420 L210 372" stroke-width="6" />
      <ellipse class="cara" cx="180" cy="250" rx="80" ry="94" />
      <path class="k" d="M98 220 C94 160 140 150 180 150 C226 150 268 168 262 222 C236 196 130 196 98 220 Z" />
      <path class="d" d="M136 248 C146 236 160 236 168 248 M194 248 C202 236 216 236 226 248" stroke-width="6" />
      <path class="d ${P}-dueno-boca" d="M146 292 C166 316 196 316 214 292" stroke-width="7" />`;
}

// cinta policial horizontal (ancho w), con el texto repetido
export function cinta(P, w = 1300, txt = "NO PASAR · ESCENA DE REHENES · ") {
  return `
      <rect x="0" y="0" width="${w}" height="64" fill="#ffd60a" />
      <text x="20" y="44" font-family="Lexend" font-weight="900" font-size="34" fill="#0a0d14" letter-spacing="2" data-layout-ignore>${txt.repeat(Math.ceil(w / 560))}</text>`;
}

// EL LOCAL de noche, 700 x 620: toldo a rayas, cartel, vidriera con la silueta del dueño, puerta.
export function local(P) {
  return `
      <rect class="b" x="0" y="80" width="700" height="540" />
      <rect class="k" x="40" y="10" width="620" height="70" rx="8" />
      <text x="350" y="58" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" fill="#f2f2f2" letter-spacing="4">TU LOCAL</text>
      <path class="w" d="M0 80 H700 L680 150 H20 Z" stroke-width="6" />
      <path d="M70 80 L64 150 M210 80 L200 150 M350 80 V150 M490 80 L500 150 M630 80 L636 150" stroke="#ff3b3b" stroke-width="44" />
      <path class="l" d="M0 80 H700 L680 150 H20 Z" stroke-width="6" />
      <rect class="${P}-vidriera" x="50" y="200" width="420" height="330" fill="#0e2a1e" stroke="#f2f2f2" stroke-width="7" />
      <g transform="translate(110 225)">${duenoCompu(P)}</g>
      <rect class="k" x="520" y="200" width="140" height="420" stroke-width="7" />
      <circle class="w" cx="540" cy="420" r="8" stroke-width="2" />
      <rect x="532" y="250" width="116" height="60" rx="6" fill="#f2f2f2" />
      <text x="590" y="290" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="28" fill="#0a0d14">CERRADO</text>`;
}

// chat genérico: burbuja con texto
export function burbuja(cls, x, y, w, txt, fill = "#f2f2f2", color = "#0a0d14") {
  return `<g class="${cls}"><rect x="${x}" y="${y}" width="${w}" height="70" rx="22" fill="${fill}" /><path d="M${x + 10} ${y + 70} l-8 18 l26 -18 Z" fill="${fill}" /><text x="${x + 24}" y="${y + 46}" font-family="Lexend" font-weight="700" font-size="30" fill="${color}">${txt}</text></g>`;
}
