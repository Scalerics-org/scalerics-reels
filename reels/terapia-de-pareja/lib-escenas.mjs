// Piezas compartidas de las escenas de "Terapia de pareja": paleta, personajes, muebles y el
// esqueleto de cada composición (helpers dibujar/pop/golpe/...). Cada escena se arma en
// escenas.mjs y queda escrita, autocontenida, en compositions/<id>.html (+ .sfx.json).
// Correr `node escenas.mjs` y después `node armar.mjs`.
import fs from "node:fs";

// ---------- paleta (SOLO estos) ----------
export const C = "#f4e8d4"; // crema: líneas, papel, textos grandes
export const B = "#2a1a13"; // marrón profundo: rellenos de caras y cuerpos, tinta sobre papel
export const W = "#3d271c"; // marrón pared (sombra de muebles)
export const T = "#c8643e"; // terracota: sofá, pelo de la clienta, sellos
export const S = "#8faa86"; // verde salvia: sillón, cardigan, planta, pantalla del agente
export const M = "#e6a93a"; // mostaza: lámpara, lentes, acentos

const ln = (sw = 6) => `fill="none" stroke="${C}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;

// ---------- personajes (bustos; origen = centro de abajo; miden ~340 de alto) ----------
// La clienta: pelo terracota con cola de caballo, blusa mostaza, aritos.
export function clienta(cls, x, y, s = 1, cara = "c-normal") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-cli">
    <path d="M44 -318 Q132 -322 126 -236 Q122 -180 82 -164 Q104 -236 48 -276 Z" fill="${T}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-118 0 L-110 -100 Q-102 -156 -44 -164 L44 -164 Q102 -156 110 -100 L118 0 Z" fill="${M}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-44 -164 Q0 -126 44 -164" ${ln(5)} />
    <rect x="-20" y="-198" width="40" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-262" rx="64" ry="72" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-67 -254 Q-76 -340 0 -340 Q76 -340 67 -254 Q58 -300 22 -302 Q-6 -286 -30 -302 Q-58 -294 -67 -254 Z" fill="${T}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <circle cx="-64" cy="-232" r="8" fill="${M}" /><circle cx="64" cy="-232" r="8" fill="${M}" />
    <path d="M2 -256 Q-8 -238 5 -234" ${ln(4)} />
    <g class="c-normal" opacity="${v("c-normal")}"><circle cx="-24" cy="-264" r="7" fill="${C}" /><circle cx="24" cy="-264" r="7" fill="${C}" /><path d="M-16 -214 Q0 -220 16 -214" ${ln(5)} /></g>
    <g class="c-triste" opacity="${v("c-triste")}"><path d="M-42 -280 L-12 -292 M42 -280 L12 -292" ${ln(5)} /><circle cx="-24" cy="-262" r="7" fill="${C}" /><circle cx="24" cy="-262" r="7" fill="${C}" /><path d="M-18 -210 Q0 -228 18 -210" ${ln(5)} /><path class="c-lagrima" d="M-30 -248 Q-38 -232 -30 -226 Q-22 -232 -30 -248 Z" fill="${S}" /></g>
    <g class="c-enojo" opacity="${v("c-enojo")}"><path d="M-44 -294 L-12 -280 M44 -294 L12 -280" ${ln(6)} /><circle cx="-24" cy="-262" r="7" fill="${C}" /><circle cx="24" cy="-262" r="7" fill="${C}" /><path d="M-16 -214 H16" ${ln(5)} /></g>
    <g class="c-ruedo" opacity="${v("c-ruedo")}"><circle cx="-24" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="24" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="-24" cy="-272" r="5" fill="${C}" /><circle cx="24" cy="-272" r="5" fill="${C}" /><path d="M-16 -214 Q0 -208 16 -216" ${ln(5)} /></g>
    <g class="c-feliz" opacity="${v("c-feliz")}"><path d="M-36 -258 Q-24 -274 -12 -258 M12 -258 Q24 -274 36 -258" ${ln(5)} /><circle cx="-42" cy="-234" r="11" fill="${T}" /><circle cx="42" cy="-234" r="11" fill="${T}" /><path d="M-22 -224 Q0 -198 22 -224" ${ln(5)} /></g>
    <g class="c-sorpresa" opacity="${v("c-sorpresa")}"><path d="M-42 -296 Q-26 -306 -10 -298 M42 -296 Q26 -306 10 -298" ${ln(5)} /><circle cx="-24" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="24" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="-24" cy="-264" r="5" fill="${C}" /><circle cx="24" cy="-264" r="5" fill="${C}" /><ellipse cx="0" cy="-214" rx="11" ry="15" fill="${B}" stroke="${C}" stroke-width="5" /></g>
  </g></g>`;
}

// El dueño: pelado con costados, bigote, ojeras, delantal salvia con lápiz en el bolsillo.
export function duenio(cls, x, y, s = 1, cara = "d-cansado") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-due">
    <path d="M-130 0 L-122 -104 Q-112 -158 -50 -166 L50 -166 Q112 -158 122 -104 L130 0 Z" fill="${B}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-74 0 V-112 Q-74 -128 -58 -128 H58 Q74 -128 74 -112 V0 Z" fill="${S}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M-56 -128 L-34 -166 M56 -128 L34 -166" fill="none" stroke="${S}" stroke-width="11" stroke-linecap="round" />
    <rect x="-40" y="-92" width="80" height="44" rx="6" fill="none" stroke="${B}" stroke-width="5" />
    <path d="M20 -104 L30 -66" stroke="${M}" stroke-width="9" stroke-linecap="round" />
    <rect x="-24" y="-200" width="48" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="-74" cy="-256" rx="14" ry="22" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="74" cy="-256" rx="14" ry="22" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-262" rx="72" ry="80" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-70 -246 Q-80 -294 -54 -318 M70 -246 Q80 -294 54 -318" ${ln(11)} />
    <path d="M-24 -324 Q0 -334 24 -324" ${ln(4)} opacity="0.5" />
    <path d="M-42 -242 Q-28 -233 -14 -242 M14 -242 Q28 -233 42 -242" ${ln(3)} opacity="0.6" />
    <path d="M0 -252 Q-13 -232 4 -228" ${ln(5)} />
    <g class="d-cansado" opacity="${v("d-cansado")}"><path d="M-42 -264 H-14 M14 -264 H42" ${ln(6)} /><path d="M-38 -263 Q-28 -252 -18 -263 Z M18 -263 Q28 -252 38 -263 Z" fill="${C}" /><path d="M-16 -194 Q0 -198 16 -194" ${ln(5)} /></g>
    <g class="d-grita" opacity="${v("d-grita")}"><path d="M-48 -298 L-14 -282 M48 -298 L14 -282" ${ln(7)} /><circle cx="-28" cy="-264" r="8" fill="${C}" /><circle cx="28" cy="-264" r="8" fill="${C}" /><ellipse cx="0" cy="-192" rx="24" ry="20" fill="#140b07" stroke="${C}" stroke-width="5" /><path d="M92 -306 Q82 -288 92 -280 Q102 -288 92 -306 Z" fill="${S}" /></g>
    <g class="d-feliz" opacity="${v("d-feliz")}"><path d="M-40 -260 Q-28 -276 -16 -260 M16 -260 Q28 -276 40 -260" ${ln(5)} /><path d="M-22 -198 Q0 -180 22 -198" ${ln(5)} /></g>
    <g class="d-sorpresa" opacity="${v("d-sorpresa")}"><circle cx="-28" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="28" cy="-264" r="13" fill="none" stroke="${C}" stroke-width="4" /><circle cx="-28" cy="-264" r="5" fill="${C}" /><circle cx="28" cy="-264" r="5" fill="${C}" /><ellipse cx="0" cy="-194" rx="10" ry="12" fill="#140b07" stroke="${C}" stroke-width="5" /></g>
    <path d="M-46 -214 Q-22 -234 0 -222 Q22 -234 46 -214 Q22 -204 0 -213 Q-22 -204 -46 -214 Z" fill="${C}" />
  </g></g>`;
}

// La terapeuta: rodete crema, lentes redondos mostaza, cardigan salvia.
export function terapeuta(cls, x, y, s = 1, cara = "t-calma") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-ter">
    <circle cx="0" cy="-350" r="36" fill="${C}" />
    <path d="M-118 0 L-110 -100 Q-102 -156 -44 -164 L44 -164 Q102 -156 110 -100 L118 0 Z" fill="${S}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-44 -164 L0 -100 L44 -164 Z" fill="${C}" />
    <path d="M0 -100 V0" stroke="${B}" stroke-width="4" opacity="0.5" />
    <circle cx="-14" cy="-60" r="6" fill="${B}" /><circle cx="-14" cy="-24" r="6" fill="${B}" />
    <rect x="-20" y="-198" width="40" height="40" rx="6" fill="${B}" stroke="${C}" stroke-width="5" />
    <ellipse cx="0" cy="-262" rx="62" ry="72" fill="${B}" stroke="${C}" stroke-width="6" />
    <path d="M-65 -250 Q-72 -338 0 -338 Q72 -338 65 -250 Q60 -300 0 -308 Q-60 -300 -65 -250 Z" fill="${C}" />
    <path d="M2 -254 Q-8 -236 5 -232" ${ln(4)} />
    <g class="t-calma" opacity="${v("t-calma")}"><circle cx="-26" cy="-262" r="6" fill="${C}" /><circle cx="26" cy="-262" r="6" fill="${C}" /><path d="M-14 -220 Q0 -212 14 -220" ${ln(5)} /></g>
    <g class="t-ceja" opacity="${v("t-ceja")}"><path d="M-44 -292 H-12 M12 -300 Q28 -314 44 -302" ${ln(5)} /><circle cx="-26" cy="-262" r="6" fill="${C}" /><circle cx="26" cy="-264" r="7" fill="${C}" /><path d="M-12 -218 H14" ${ln(5)} /></g>
    <g class="t-seria" opacity="${v("t-seria")}"><path d="M-38 -264 H-14 M14 -264 H38" ${ln(6)} /><path d="M-14 -218 H14" ${ln(5)} /></g>
    <g class="t-feliz" opacity="${v("t-feliz")}"><path d="M-36 -258 Q-26 -272 -16 -258 M16 -258 Q26 -272 36 -258" ${ln(5)} /><path d="M-18 -224 Q0 -206 18 -224" ${ln(5)} /></g>
    <g class="t-lentes"><circle cx="-26" cy="-262" r="21" fill="none" stroke="${M}" stroke-width="5" /><circle cx="26" cy="-262" r="21" fill="none" stroke="${M}" stroke-width="5" /><path d="M-5 -264 H5 M-47 -266 L-62 -272 M47 -266 L62 -272" stroke="${M}" stroke-width="4" stroke-linecap="round" /></g>
  </g></g>`;
}

// El agente de IA: un celular con cara en la pantalla salvia y auriculares con micrófono (escucha).
export function agente(cls, x, y, s = 1, cara = "a-ok") {
  const v = (k) => (k === cara ? 1 : 0);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls} pj-age">
    <path class="a-brazo-i" d="M-88 -120 Q-130 -96 -142 -44" ${ln(8)} />
    <path class="a-brazo-d" d="M88 -120 Q132 -150 150 -204" ${ln(8)} />
    <rect x="-90" y="-300" width="180" height="290" rx="36" fill="${B}" stroke="${M}" stroke-width="8" />
    <rect x="-72" y="-276" width="144" height="226" rx="22" fill="${S}" />
    <path d="M-20 -30 H20" stroke="${M}" stroke-width="6" stroke-linecap="round" />
    <g class="a-ok" opacity="${v("a-ok")}"><rect class="a-ojos" x="-44" y="-226" width="22" height="42" rx="11" fill="${B}" /><rect class="a-ojos" x="22" y="-226" width="22" height="42" rx="11" fill="${B}" /><path d="M-30 -146 Q0 -118 30 -146" fill="none" stroke="${B}" stroke-width="8" stroke-linecap="round" /></g>
    <g class="a-feliz" opacity="${v("a-feliz")}"><path d="M-46 -196 Q-33 -220 -20 -196 M20 -196 Q33 -220 46 -196" fill="none" stroke="${B}" stroke-width="9" stroke-linecap="round" /><path d="M-36 -150 Q0 -104 36 -150 Z" fill="${B}" /></g>
    <path d="M-106 -196 Q-106 -336 0 -336 Q106 -336 106 -196" fill="none" stroke="${C}" stroke-width="10" stroke-linecap="round" />
    <rect x="-120" y="-226" width="32" height="60" rx="13" fill="${M}" stroke="${C}" stroke-width="4" />
    <rect x="88" y="-226" width="32" height="60" rx="13" fill="${M}" stroke="${C}" stroke-width="4" />
    <path d="M-104 -168 Q-100 -118 -46 -110" ${ln(6)} /><circle cx="-40" cy="-110" r="10" fill="${M}" />
  </g></g>`;
}

// ---------- muebles (coordenadas globales) ----------
// sofá terracota: la parte de atrás (va antes que los personajes) y el frente (después)
export const sofaAtras = (x, y, w) => `<g class="m-sofa-a">
    <rect x="${x}" y="${y - 210}" width="${w}" height="230" rx="44" fill="${T}" stroke="${C}" stroke-width="6" />
    <path d="M${x + w / 2} ${y - 196} V${y}" stroke="${C}" stroke-width="4" opacity="0.4" />
  </g>`;
export const sofaFrente = (x, y, w) => `<g class="m-sofa-f">
    <rect x="${x - 6}" y="${y}" width="${w + 12}" height="110" rx="26" fill="${T}" stroke="${C}" stroke-width="6" />
    <path d="M${x + w / 2} ${y + 8} V${y + 100}" stroke="${C}" stroke-width="4" opacity="0.4" />
    <rect x="${x - 56}" y="${y - 120}" width="84" height="250" rx="38" fill="${T}" stroke="${C}" stroke-width="6" />
    <rect x="${x + w - 28}" y="${y - 120}" width="84" height="250" rx="38" fill="${T}" stroke="${C}" stroke-width="6" />
    <path d="M${x - 10} ${y + 130} L${x - 18} ${y + 168} M${x + w + 10} ${y + 130} L${x + w + 18} ${y + 168}" ${ln(8)} />
  </g>`;
// sillón salvia de la terapeuta (cx = centro, y = asiento)
export const sillonAtras = (cx, y) => `<g class="m-sillon-a"><rect x="${cx - 140}" y="${y - 250}" width="280" height="270" rx="70" fill="${S}" stroke="${C}" stroke-width="6" /></g>`;
export const sillonFrente = (cx, y) => `<g class="m-sillon-f">
    <rect x="${cx - 150}" y="${y}" width="300" height="104" rx="26" fill="${S}" stroke="${C}" stroke-width="6" />
    <rect x="${cx - 186}" y="${y - 110}" width="74" height="236" rx="34" fill="${S}" stroke="${C}" stroke-width="6" />
    <rect x="${cx + 112}" y="${y - 110}" width="74" height="236" rx="34" fill="${S}" stroke="${C}" stroke-width="6" />
    <path d="M${cx - 140} ${y + 126} L${cx - 150} ${y + 166} M${cx + 140} ${y + 126} L${cx + 150} ${y + 166}" ${ln(8)} />
  </g>`;
// lámpara de pie (x = poste, y = piso); la luz es un triángulo mostaza transparente
export const lampara = (x, y, cls = "m-lampara") => `<g class="${cls}">
    <path class="m-luz" d="M${x - 64} ${y - 440} L${x - 200} ${y - 20} L${x + 200} ${y - 20} L${x + 64} ${y - 440} Z" fill="${M}" opacity="0.1" />
    <path d="M${x} ${y} V${y - 450}" ${ln(6)} />
    <path d="M${x - 50} ${y} H${x + 50}" ${ln(8)} />
    <path d="M${x - 46} ${y - 540} H${x + 46} L${x + 76} ${y - 440} H${x - 76} Z" fill="${M}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
  </g>`;
// planta en maceta terracota (x centro, y piso)
export const planta = (x, y, cls = "m-planta") => `<g class="${cls}">
    <path d="M${x} ${y - 96} Q${x - 70} ${y - 190} ${x - 100} ${y - 300} Q${x - 30} ${y - 230} ${x} ${y - 96} Z" fill="${S}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M${x} ${y - 96} Q${x + 80} ${y - 200} ${x + 90} ${y - 330} Q${x + 20} ${y - 250} ${x} ${y - 96} Z" fill="${S}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M${x} ${y - 96} Q${x - 10} ${y - 260} ${x + 10} ${y - 380} Q${x + 40} ${y - 250} ${x} ${y - 96} Z" fill="${S}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
    <path d="M${x - 62} ${y - 104} H${x + 62} L${x + 46} ${y} H${x - 46} Z" fill="${T}" stroke="${C}" stroke-width="6" stroke-linejoin="round" />
  </g>`;
// cuadro con marco mostaza (x,y esquina; adentro sierras salvia y un sol)
export const cuadro = (x, y, w, h, cls = "m-cuadro") => `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${W}" stroke="${M}" stroke-width="9" />
    <path d="M${x + 12} ${y + h - 14} L${x + w * 0.35} ${y + h * 0.45} L${x + w * 0.55} ${y + h * 0.7} L${x + w * 0.72} ${y + h * 0.38} L${x + w - 12} ${y + h - 14} Z" fill="${S}" />
    <circle cx="${x + w * 0.24}" cy="${y + h * 0.3}" r="${h * 0.12}" fill="${C}" />
  </g>`;
// reloj de pared (cx, cy, r): las agujas tienen clase para girarlas con svgOrigin
export const reloj = (cx, cy, r, pre) => `<g class="${pre}-reloj">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${W}" stroke="${C}" stroke-width="7" />
    <path d="M${cx} ${cy - r + 10} V${cy - r + 22} M${cx} ${cy + r - 10} V${cy + r - 22} M${cx - r + 10} ${cy} H${cx - r + 22} M${cx + r - 10} ${cy} H${cx + r - 22}" ${ln(5)} />
    <path class="${pre}-hora" d="M${cx} ${cy} V${cy - r * 0.5}" stroke="${C}" stroke-width="8" stroke-linecap="round" />
    <path class="${pre}-min" d="M${cx} ${cy} V${cy - r * 0.78}" stroke="${M}" stroke-width="5" stroke-linecap="round" />
    <circle cx="${cx}" cy="${cy}" r="7" fill="${C}" />
  </g>`;
// corazón (centrado en 0,0, ~100 de ancho)
export const corazon = (fill = T) => `<path d="M0 34 C-60 -6 -56 -54 -26 -56 C-10 -57 0 -44 0 -32 C0 -44 10 -57 26 -56 C56 -54 60 -6 0 34 Z" fill="${fill}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />`;

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
    [data-composition-id="${id}"] .papel { background: ${C}; border-radius: 12px; box-shadow: 0 16px 0 rgba(20, 10, 6, 0.4); }
    [data-composition-id="${id}"] .grande { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.98; white-space: nowrap; letter-spacing: -0.02em; color: ${C}; }
    [data-composition-id="${id}"] .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.12em; }
    [data-composition-id="${id}"] .mano { font-family: "Caveat", cursive; font-weight: 700; white-space: nowrap; line-height: 1; }
    [data-composition-id="${id}"] .sello { position: absolute; padding: 12px 26px 10px; border: 7px solid ${T}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; color: ${T}; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.03em; line-height: 1; }
    [data-composition-id="${id}"] .sello.mos { border-color: ${M}; color: ${M}; }
    [data-composition-id="${id}"] .etiqueta { position: absolute; left: 0; right: 0; top: 1420px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: ${M}; text-transform: uppercase; white-space: nowrap; }
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
        tl.fromTo(el, Object.assign({ opacity: 0, scale: 0.8 }, desde), { opacity: 1, scale: 1, x: 0, y: 0, rotation: rot || 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, t);
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
