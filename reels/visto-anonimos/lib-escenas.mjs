// Piezas compartidas de las escenas de "Visto Anónimos": paleta, personajes, muebles del salón
// parroquial y el esqueleto de cada composición (helpers dibujar/pop/golpe/...). Cada escena se arma
// en escenas.mjs y queda escrita, autocontenida, en compositions/<id>.html (+ .sfx.json).
// Correr `node escenas.mjs` y después `node armar.mjs`.
import fs from "node:fs";

// ---------- paleta (SOLO estos) ----------
export const C = "#ece2c6"; // beige: líneas, papel, textos grandes
export const B = "#141c19"; // verde casi negro: rellenos de caras y cuerpos, tinta sobre papel
export const W = "#22302a"; // pared en sombra
export const V = "#8fb39b"; // verde hospital: pared, cárdigan, pantalla del agente
export const M = "#9a6438"; // madera: sillas, mesita, camisa de Gustavo
export const A = "#f2a541"; // ámbar: café, medallas, lentes, acentos
export const R = "#d65a3a"; // ladrillo: sellos, etiquetas "HOLA, SOY", aros y labios de Mirta

const ln = (sw = 6, col = C) => `fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;

// etiqueta autoadhesiva de nombre "HOLA, SOY" (centro x,y; coordenadas locales del personaje)
export const nombre = (x, y, txt, w = 132, fs = 40) => `<g class="pj-nombre">
    <rect x="${x - w / 2}" y="${y - 40}" width="${w}" height="80" rx="8" fill="${C}" />
    <path d="M${x - w / 2} ${y - 32} Q${x - w / 2} ${y - 40} ${x - w / 2 + 8} ${y - 40} H${x + w / 2 - 8} Q${x + w / 2} ${y - 40} ${x + w / 2} ${y - 32} V${y - 14} H${x - w / 2} Z" fill="${R}" />
    <text x="${x}" y="${y - 20}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="15" letter-spacing="2" fill="${C}">HOLA, SOY</text>
    <text x="${x}" y="${y + 30}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${fs}" fill="${B}">${txt}</text>
  </g>`;

// ---------- personajes (bustos; origen = centro de abajo; miden ~340 de alto) ----------
// Gustavo: pelo oscuro con entradas, barba de tres días, camisa a cuadros madera, etiqueta de nombre.
export function gustavo(cls, x, y, s = 1, cara = "g-triste") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-gus">
    <path d="M-134 0 L-126 -102 Q-116 -158 -52 -166 L52 -166 Q116 -158 126 -102 L134 0 Z" fill="${M}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-92 -150 V0 M-46 -164 V0 M46 -164 V0 M92 -150 V0 M-128 -60 H128 M-122 -110 H122" stroke="${B}" stroke-width="7" opacity="0.35" />
    <path d="M-48 -166 L0 -118 L48 -166" fill="${B}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-48 -166 L-22 -128 L-6 -150 M48 -166 L22 -128 L6 -150" ${ln(5)} />
    ${nombre(-66, -70, "Gustavo", 132, 38)}
    <rect x="-24" y="-200" width="48" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="-72" cy="-256" rx="14" ry="22" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="72" cy="-256" rx="14" ry="22" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-262" rx="70" ry="80" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-70 -270 Q-74 -334 -20 -342 Q-4 -316 0 -330 Q30 -350 62 -326 Q78 -300 70 -270 Q58 -300 34 -306 Q14 -296 -4 -310 Q-30 -296 -50 -304 Q-64 -292 -70 -270 Z" fill="${M}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <g opacity="0.45" fill="${C}"><circle cx="-40" cy="-212" r="3" /><circle cx="-28" cy="-200" r="3" /><circle cx="-12" cy="-196" r="3" /><circle cx="12" cy="-196" r="3" /><circle cx="28" cy="-200" r="3" /><circle cx="40" cy="-212" r="3" /><circle cx="-50" cy="-226" r="3" /><circle cx="50" cy="-226" r="3" /><circle cx="0" cy="-192" r="3" /></g>
    <path d="M0 -254 Q-12 -234 4 -230" ${ln(5)} />
    <g class="g-triste" opacity="${v("g-triste")}"><path d="M-44 -282 L-14 -292 M44 -282 L14 -292" ${ln(5)} /><circle cx="-28" cy="-262" r="7" fill="${C}" /><circle cx="28" cy="-262" r="7" fill="${C}" /><path d="M-18 -208 Q0 -222 18 -208" ${ln(5)} /></g>
    <g class="g-verguenza" opacity="${v("g-verguenza")}"><path d="M-44 -286 L-14 -290 M44 -286 L14 -290" ${ln(5)} /><circle cx="-36" cy="-262" r="7" fill="${C}" /><circle cx="20" cy="-262" r="7" fill="${C}" /><circle cx="-44" cy="-232" r="12" fill="${R}" opacity="0.8" /><circle cx="44" cy="-232" r="12" fill="${R}" opacity="0.8" /><path d="M-14 -212 Q-4 -218 6 -212 Q14 -206 20 -212" ${ln(5)} /></g>
    <g class="g-sorpresa" opacity="${v("g-sorpresa")}"><path d="M-44 -298 Q-28 -308 -12 -300 M44 -298 Q28 -308 12 -300" ${ln(5)} /><circle cx="-28" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="28" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="-28" cy="-264" r="5" fill="${C}" /><circle cx="28" cy="-264" r="5" fill="${C}" /><ellipse cx="0" cy="-210" rx="11" ry="15" fill="${B}" stroke="${C}" stroke-width="5" /></g>
    <g class="g-grita" opacity="${v("g-grita")}"><path d="M-46 -296 L-14 -282 M46 -296 L14 -282" ${ln(6)} /><circle cx="-28" cy="-264" r="8" fill="${C}" /><circle cx="28" cy="-264" r="8" fill="${C}" /><ellipse cx="0" cy="-208" rx="24" ry="18" fill="#0b100e" stroke="${C}" stroke-width="5" /><path d="M90 -300 Q80 -282 90 -274 Q100 -282 90 -300 Z" fill="${V}" /></g>
    <g class="g-feliz" opacity="${v("g-feliz")}"><path d="M-40 -260 Q-28 -276 -16 -260 M16 -260 Q28 -276 40 -260" ${ln(5)} /><path d="M-24 -216 Q0 -194 24 -216" ${ln(5)} /></g>
  </g></g>`;
}

// La coordinadora: melena canosa, lentes ámbar con cadenita, cárdigan verde hospital.
export function coordinadora(cls, x, y, s = 1, cara = "k-calma") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-coo">
    <path d="M-80 -250 Q-96 -150 -70 -120 L70 -120 Q96 -150 80 -250 Z" fill="${C}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-120 0 L-112 -96 Q-104 -152 -46 -160 L46 -160 Q104 -152 112 -96 L120 0 Z" fill="${V}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-40 -160 L-16 0 M40 -160 L16 0" stroke="${B}" stroke-width="6" />
    <path d="M-16 0 L0 -96 L16 0 Z" fill="${B}" />
    <circle cx="-32" cy="-60" r="6" fill="${C}" /><circle cx="-36" cy="-24" r="6" fill="${C}" />
    <rect x="-20" y="-196" width="40" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-262" rx="64" ry="74" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-72 -238 Q-84 -344 0 -344 Q84 -344 72 -238 Q60 -290 30 -306 Q0 -280 -46 -300 Q-62 -282 -72 -238 Z" fill="${C}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-40 -330 Q-10 -300 30 -324" fill="none" stroke="${B}" stroke-width="3" opacity="0.4" />
    <path d="M-50 -258 Q-60 -200 -40 -150 M50 -258 Q60 -200 40 -150" fill="none" stroke="${A}" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round" />
    <circle cx="-26" cy="-258" r="19" fill="none" stroke="${A}" stroke-width="5" /><circle cx="26" cy="-258" r="19" fill="none" stroke="${A}" stroke-width="5" /><path d="M-7 -260 H7" stroke="${A}" stroke-width="5" />
    <path d="M2 -246 Q-8 -230 5 -226" ${ln(4)} />
    <g class="k-calma" opacity="${v("k-calma")}"><circle cx="-26" cy="-258" r="6" fill="${C}" /><circle cx="26" cy="-258" r="6" fill="${C}" /><path d="M-16 -208 Q0 -198 16 -208" ${ln(5)} /></g>
    <g class="k-ceja" opacity="${v("k-ceja")}"><path d="M-44 -290 L-12 -286 M14 -296 Q28 -306 44 -294" ${ln(5)} /><path d="M-32 -258 H-20" ${ln(5)} /><circle cx="26" cy="-258" r="6" fill="${C}" /><path d="M-16 -206 Q4 -202 18 -212" ${ln(5)} /></g>
    <g class="k-tierna" opacity="${v("k-tierna")}"><path d="M-36 -256 Q-26 -266 -16 -256 M16 -256 Q26 -266 36 -256" ${ln(5)} /><path d="M-20 -214 Q0 -194 20 -214" ${ln(5)} /><circle cx="-44" cy="-226" r="10" fill="${R}" opacity="0.6" /><circle cx="44" cy="-226" r="10" fill="${R}" opacity="0.6" /></g>
  </g></g>`;
}

// Mirta: pelo batido ámbar, aros grandes ladrillo, labios ladrillo, blusa beige con lunares.
export function mirta(cls, x, y, s = 1, cara = "m-canchera") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-mir">
    <path d="M-118 0 L-110 -98 Q-102 -154 -44 -162 L44 -162 Q102 -154 110 -98 L118 0 Z" fill="${R}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <g fill="${C}" opacity="0.55"><circle cx="-80" cy="-100" r="7" /><circle cx="-40" cy="-60" r="7" /><circle cx="70" cy="-120" r="7" /><circle cx="84" cy="-50" r="7" /><circle cx="-90" cy="-30" r="7" /></g>
    ${nombre(52, -64, "Mirta", 120, 40)}
    <rect x="-20" y="-196" width="40" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <path d="M-26 -166 Q0 -140 26 -166" fill="none" stroke="${A}" stroke-width="6" stroke-dasharray="1 12" stroke-linecap="round" />
    <path d="M-104 -236 Q-138 -330 -60 -372 Q0 -402 60 -372 Q138 -330 104 -236 Q96 -200 74 -190 L-74 -190 Q-96 -200 -104 -236 Z" fill="${A}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <ellipse cx="0" cy="-258" rx="62" ry="72" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-66 -262 Q-60 -330 0 -332 Q50 -330 66 -262 Q40 -312 -10 -300 Q-44 -296 -66 -262 Z" fill="${A}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <circle cx="-66" cy="-206" r="16" fill="none" stroke="${R}" stroke-width="6" /><circle cx="66" cy="-206" r="16" fill="none" stroke="${R}" stroke-width="6" />
    <path d="M2 -252 Q-8 -236 5 -232" ${ln(4)} />
    <g class="m-canchera" opacity="${v("m-canchera")}"><path d="M-38 -262 H-12 M12 -262 H38" ${ln(6)} /><path d="M-36 -276 L-14 -282 M36 -276 L14 -282" ${ln(4)} /><path d="M-18 -212 Q0 -200 18 -212 Q0 -196 -18 -212 Z" fill="${R}" stroke="${R}" stroke-width="6" stroke-linejoin="round" /></g>
    <g class="m-normal" opacity="${v("m-normal")}"><circle cx="-24" cy="-260" r="7" fill="${C}" /><circle cx="24" cy="-260" r="7" fill="${C}" /><path d="M-40 -270 L-30 -282 M-28 -272 L-20 -284 M40 -270 L30 -282 M28 -272 L20 -284" ${ln(3)} /><ellipse cx="0" cy="-208" rx="16" ry="9" fill="${R}" /></g>
  </g></g>`;
}

// Rosa: peluquera, pelo corto madera con un mechón ámbar, delantal oscuro con tijera, medalla ámbar.
export function rosa(cls, x, y, s = 1, cara = "r-serena") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-ros">
    <path d="M-118 0 L-110 -98 Q-102 -154 -44 -162 L44 -162 Q102 -154 110 -98 L118 0 Z" fill="${V}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-70 0 V-118 Q-70 -132 -56 -132 H56 Q70 -132 70 -118 V0 Z" fill="${B}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <g transform="translate(36 -78) rotate(-30)"><circle cx="-8" cy="22" r="9" fill="none" stroke="${C}" stroke-width="4" /><circle cx="10" cy="22" r="9" fill="none" stroke="${C}" stroke-width="4" /><path d="M-4 14 L6 -34 M6 14 L-4 -34" ${ln(4)} /></g>
    <path class="r-cinta" d="M-30 -162 L-6 -96 M30 -162 L6 -96" stroke="${R}" stroke-width="10" stroke-linecap="round" />
    <g class="r-medalla"><circle cx="0" cy="-74" r="30" fill="${A}" stroke="${C}" stroke-width="5" /><path d="M-12 -74 L-3 -64 L14 -86" ${ln(5, B)} /></g>
    <rect x="-20" y="-196" width="40" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-260" rx="64" ry="74" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-70 -236 Q-84 -340 0 -340 Q84 -340 70 -236 Q66 -280 40 -296 Q10 -276 -20 -296 Q-56 -282 -70 -236 Z" fill="${M}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M18 -334 Q40 -310 46 -290" stroke="${A}" stroke-width="10" stroke-linecap="round" fill="none" />
    <path d="M2 -250 Q-8 -234 5 -230" ${ln(4)} />
    <g class="r-serena" opacity="${v("r-serena")}"><path d="M-38 -258 Q-26 -270 -14 -258 M14 -258 Q26 -270 38 -258" ${ln(5)} /><path d="M-22 -216 Q0 -194 22 -216" ${ln(5)} /></g>
    <g class="r-normal" opacity="${v("r-normal")}"><circle cx="-24" cy="-260" r="7" fill="${C}" /><circle cx="24" cy="-260" r="7" fill="${C}" /><path d="M-18 -212 Q0 -198 18 -212" ${ln(5)} /></g>
    <g class="r-duerme" opacity="${v("r-duerme")}"><path d="M-62 -266 Q0 -286 62 -266 L58 -240 Q0 -256 -58 -240 Z" fill="${V}" stroke="${C}" stroke-width="5" stroke-linejoin="round" /><path d="M-34 -252 Q-24 -244 -14 -252 M14 -252 Q24 -244 34 -252" ${ln(4, B)} /><path d="M-10 -212 Q0 -204 10 -212" ${ln(5)} /></g>
  </g></g>`;
}

// alguien del grupo, genérico (busto simple). col = color del buzo, pelo = color del pelo
export function persona(cls, x, y, s = 1, col = V, pelo = M) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
    <path d="M-104 0 L-98 -86 Q-90 -136 -40 -142 L40 -142 Q90 -136 98 -86 L104 0 Z" fill="${col}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <ellipse cx="0" cy="-220" rx="56" ry="64" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-58 -226 Q-64 -296 0 -296 Q64 -296 58 -226 Q46 -262 0 -266 Q-46 -262 -58 -226 Z" fill="${pelo}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <circle cx="-20" cy="-220" r="6" fill="${C}" /><circle cx="20" cy="-220" r="6" fill="${C}" /><path d="M-12 -184 H12" ${ln(5)} />
  </g></g>`;
}

// El agente de IA: un celular con cara en la pantalla verde y su etiqueta de nombre.
export function agente(cls, x, y, s = 1, cara = "a-ok") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-age">
    <path class="a-brazo-i" d="M-88 -120 Q-130 -96 -142 -44" ${ln(8)} />
    <path class="a-brazo-d" d="M88 -120 Q132 -150 150 -204" ${ln(8)} />
    <rect x="-90" y="-300" width="180" height="290" rx="36" fill="${B}" stroke="${A}" stroke-width="8" />
    <rect x="-72" y="-276" width="144" height="226" rx="22" fill="${V}" />
    <path d="M-20 -30 H20" stroke="${A}" stroke-width="6" stroke-linecap="round" />
    <g class="a-ok" opacity="${v("a-ok")}"><rect x="-44" y="-236" width="22" height="42" rx="11" fill="${B}" /><rect x="22" y="-236" width="22" height="42" rx="11" fill="${B}" /><path d="M-30 -166 Q0 -138 30 -166" fill="none" stroke="${B}" stroke-width="8" stroke-linecap="round" /></g>
    <g class="a-feliz" opacity="${v("a-feliz")}"><path d="M-46 -206 Q-33 -230 -20 -206 M20 -206 Q33 -230 46 -206" fill="none" stroke="${B}" stroke-width="9" stroke-linecap="round" /><path d="M-36 -168 Q0 -122 36 -168 Z" fill="${B}" /></g>
    ${nombre(0, -96, "Agente de IA", 132, 28)}
  </g></g>`;
}

// ---------- muebles (coordenadas globales) ----------
// silla plegable de costado (x = centro del asiento, y = piso, mira a la derecha si dir = 1)
export const silla = (x, y, cls = "m-silla", dir = 1, s = 1) => `<g class="${cls}" transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-70 0 L40 -190 M60 0 L-50 -190" ${ln(8)} />
    <rect x="-80" y="-206" width="160" height="26" rx="8" fill="${M}" stroke="${C}" stroke-width="5" />
    <path d="M-66 -196 L-90 -400" ${ln(8)} />
    <rect x="-112" y="-410" width="44" height="120" rx="10" fill="${M}" stroke="${C}" stroke-width="5" transform="rotate(-7 -90 -350)" />
  </g>`;
// silla plegable de frente (cx centro, y piso), vacía
export const sillaFrente = (cx, y, cls = "m-sillaf", s = 1) => `<g class="${cls}" transform="translate(${cx} ${y}) scale(${s})">
    <path d="M-80 0 L-70 -400 M80 0 L70 -400" ${ln(8)} />
    <rect x="-90" y="-420" width="180" height="110" rx="14" fill="${M}" stroke="${C}" stroke-width="6" />
    <path d="M-100 -190 H100 L86 -230 H-86 Z" fill="${M}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-80 0 L66 -190 M80 0 L-66 -190" ${ln(5)} opacity="0.55" />
  </g>`;
// silla vista desde arriba (cx, cy, rot: hacia dónde mira el respaldo)
export const sillaArriba = (cx, cy, rot, cls = "m-sillaa") => `<g class="${cls}" transform="translate(${cx} ${cy}) rotate(${rot})">
    <rect x="-56" y="-50" width="112" height="100" rx="14" fill="${M}" stroke="${C}" stroke-width="5" />
    <rect x="-60" y="38" width="120" height="22" rx="8" fill="${M}" stroke="${C}" stroke-width="5" />
  </g>`;
// termo (x centro, y base) y vasitos de plástico
export const termo = (x, y, cls = "m-termo") => `<g class="${cls}">
    <rect x="${x - 34}" y="${y - 190}" width="68" height="190" rx="18" fill="${B}" stroke="${C}" stroke-width="6" />
    <rect x="${x - 38}" y="${y - 230}" width="76" height="46" rx="12" fill="${A}" stroke="${C}" stroke-width="6" />
    <path d="M${x + 34} ${y - 150} Q${x + 70} ${y - 120} ${x + 34} ${y - 70}" ${ln(7)} />
    <path d="M${x - 20} ${y - 150} V${y - 40}" ${ln(4)} opacity="0.4" />
  </g>`;
export const vasito = (x, y, cls = "m-vaso", cafe = true) => `<g class="${cls}">
    <path d="M${x - 30} ${y - 76} L${x + 30} ${y - 76} L${x + 22} ${y} L${x - 22} ${y} Z" fill="${C}" stroke="${C}" stroke-width="4" stroke-linejoin="round" />
    ${cafe ? `<path d="M${x - 26} ${y - 66} H${x + 26}" stroke="${M}" stroke-width="8" />` : ""}
    <path d="M${x - 24} ${y - 50} H${x + 24}" stroke="${B}" stroke-width="2" opacity="0.3" />
  </g>`;
export const humo = (x, y, cls = "m-humo") => `<path class="${cls}" d="M${x} ${y} Q${x - 16} ${y - 24} ${x} ${y - 48} Q${x + 16} ${y - 72} ${x} ${y - 96}" ${ln(5)} opacity="0.6" />`;
// mesita de madera (x izquierda, y tapa, w ancho)
export const mesita = (x, y, w, cls = "m-mesa") => `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="26" rx="6" fill="${M}" stroke="${C}" stroke-width="6" />
    <path d="M${x + 24} ${y + 26} V${y + 230} M${x + w - 24} ${y + 26} V${y + 230}" ${ln(8)} />
  </g>`;
// cartel escrito a mano pegado con cinta (centro cx, arriba y)
export const cartel = (cx, y, w, h, lineas, fs = 64, cls = "m-cartel", rot = -2) => `<g class="${cls}" transform="rotate(${rot} ${cx} ${y + h / 2})">
    <rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" fill="${C}" stroke="${C}" stroke-width="4" />
    ${lineas.map((t, i) => `<text x="${cx}" y="${y + h / 2 + (i - (lineas.length - 1) / 2) * fs * 1.02 + fs * 0.34}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${fs}" fill="${B}">${t}</text>`).join("")}
    <rect x="${cx - w / 2 - 20}" y="${y - 14}" width="70" height="26" fill="${A}" opacity="0.75" transform="rotate(-24 ${cx - w / 2 + 15} ${y})" />
    <rect x="${cx + w / 2 - 50}" y="${y - 14}" width="70" height="26" fill="${A}" opacity="0.75" transform="rotate(24 ${cx + w / 2 - 15} ${y})" />
  </g>`;
// celular (x,y esquina; w,h)
export const celu = (x, y, w, h, cls = "m-celu") => `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="48" fill="${B}" stroke="${C}" stroke-width="7" />
    <path d="M${x + w / 2 - 40} ${y + 28} H${x + w / 2 + 40}" ${ln(7)} />
  </g>`;
// medalla / ficha (centro)
export const ficha = (cx, cy, r, txt1, txt2, cls = "m-ficha") => `<g class="${cls}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${A}" stroke="${C}" stroke-width="7" />
    <circle cx="${cx}" cy="${cy}" r="${r - 22}" fill="none" stroke="${B}" stroke-width="4" stroke-dasharray="6 10" />
    <text x="${cx}" y="${cy - r * 0.12}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${r * 0.5}" fill="${B}">${txt1}</text>
    <text x="${cx}" y="${cy + r * 0.34}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="${r * 0.16}" letter-spacing="3" fill="${B}">${txt2}</text>
  </g>`;
// doble tilde de "visto" (x,y = izquierda abajo)
export const tildes = (x, y, col = A, s = 1, cls = "m-tildes") => `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"><path d="M0 -14 L12 0 L36 -30 M22 -6 L28 0 L52 -30" ${ln(7, col)} /></g>`;

// ---------- esqueleto de una escena ----------
const HEAD = (id) => `  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="${id}"] .capa { position: absolute; inset: 0; }
    [data-composition-id="${id}"] .escenario { position: absolute; inset: 0; }
    [data-composition-id="${id}"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="${id}"] .ab { position: absolute; }
    [data-composition-id="${id}"] .papel { background: ${C}; border-radius: 12px; box-shadow: 0 16px 0 rgba(8, 12, 10, 0.45); }
    [data-composition-id="${id}"] .grande { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.98; white-space: nowrap; letter-spacing: -0.02em; color: ${C}; }
    [data-composition-id="${id}"] .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.12em; }
    [data-composition-id="${id}"] .mano { font-family: "Caveat", cursive; font-weight: 700; white-space: nowrap; line-height: 1; }
    [data-composition-id="${id}"] .sello { position: absolute; padding: 12px 26px 10px; border: 7px solid ${R}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; color: ${R}; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.03em; line-height: 1; }
    [data-composition-id="${id}"] .sello.mos { border-color: ${A}; color: ${A}; }
    [data-composition-id="${id}"] .etiqueta { position: absolute; left: 0; right: 0; top: 1420px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: ${A}; text-transform: uppercase; white-space: nowrap; }
    [data-composition-id="${id}"] .globo { position: absolute; padding: 18px 26px 16px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 38px; line-height: 1.15; white-space: nowrap; }
`;

const HELPERS = `      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const els = (s) => (typeof s === "string" ? qa(s) : [].concat(s));
      const tl = gsap.timeline({ paused: true });
      // un trazo que se dibuja (opacity 0 hasta que arranca: nada de puntitos de los caps)
      const dibujar = (s, t, d, desde) => els(s).forEach((el) => {
        const L = el.getTotalLength() + 2;
        const f = desde || 0;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L * (1 - f), opacity: f > 0 ? 1 : 0 });
        if (!f) tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: "power2.inOut" }, t);
      });
      // aparece entero con rebote
      const pop = (s, t, de) => els(s).forEach((el) => {
        const { rot, ...desde } = de || {};
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, Object.assign({ opacity: 0, scale: 0.8 }, el instanceof SVGElement && !desde.svgOrigin ? { transformOrigin: "50% 50%" } : {}, desde), { opacity: 1, scale: 1, x: 0, y: 0, rotation: rot || 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, t);
      });
      // cae de golpe como un sello o una palabra gigante
      const golpe = (s, t, esc, rot) => els(s).forEach((el) => {
        gsap.set(el, { opacity: 0, rotation: rot || 0 });
        tl.fromTo(el, { opacity: 0, scale: esc || 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08);
      });
      const sacudon = (t, f) => {
        f = f || 1;
        [[-16 * f, 9 * f], [12 * f, -7 * f], [-6 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(q(".escenario"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      };
      // se escribe de izquierda a derecha (letra a mano, tipeo)
      const escribir = (s, t, d) => els(s).forEach((el) => {
        gsap.set(el, { clipPath: "inset(-30% 100% -30% 0%)" });
        tl.to(el, { clipPath: "inset(-30% 0% -30% 0%)", duration: d || 0.5, ease: "none" }, t);
      });
      // cambia la cara de un personaje
      const cara = (raiz, de, a, t) => {
        tl.to(qa(raiz + " ." + de), { opacity: 0, duration: 0.06 }, t);
        tl.to(qa(raiz + " ." + a), { opacity: 1, duration: 0.06 }, t);
      };
      // respira o se hamaca (finito y determinista)
      const vaiven = (s, prop, amp, per, t0) => els(s).forEach((el) => {
        const n = Math.max(1, Math.floor((DUR - (t0 || 0)) / per) - 1);
        tl.fromTo(el, { [prop]: 0 }, { [prop]: amp, duration: per, yoyo: true, repeat: n, ease: "sine.inOut", immediateRender: false }, t0 || 0);
      });
      const fuera = (s, t, d) => tl.to(els(s), { opacity: 0, duration: d || 0.18, ease: "power2.in" }, t);
      const salida = () => tl.to(q(".escena"), { y: -60, opacity: 0, filter: "blur(8px)", duration: 0.22, ease: "power3.in" }, DUR - 0.22);
`;

// Escribe compositions/<id>.html y su .sfx.json.
// esc = { id, dur, css, html, js, sfx, sinSalida, entrada }  (html va dentro de .escenario)
export function escribirEscena(esc) {
  const { id, dur } = esc;
  const html = `<template>
${HEAD(id)}${(esc.css || "").split("\n").map((l) => (l.trim() ? "    " + l.trim().replace(/(^|\}\s*)&/g, (m, p1) => p1 + `[data-composition-id="${id}"]`) : "")).filter(Boolean).join("\n")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id.slice(0, 3)}-escena" class="capa escena clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="escenario">
${esc.html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
${HELPERS}
${esc.entrada === false ? "" : `      tl.fromTo(q(".escenario"), { scale: 1.05, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out", transformOrigin: "50% 55%" }, 0);\n`}
${esc.js}
${esc.sinSalida ? "" : "      salida();\n"}      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
  fs.writeFileSync(`compositions/${id}.sfx.json`, "[\n" + esc.sfx.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");
}

// duración de cada escena según tiempos.md (la escribe armar.mjs)
export function duraciones() {
  const md = fs.readFileSync("tiempos.md", "utf8");
  const d = {};
  for (const m of md.matchAll(/### (\S+) — dura ([\d.]+) s/g)) d[m[1]] = Number(m[2]);
  return d;
}
