// Piezas del reel "jaque-mate": el tablero en perspectiva, las piezas de ajedrez (con cara cuando son
// personajes), el gran maestro, el ayudante, el dueño de la zapatería, el reloj de ajedrez con dígitos
// de segmentos, el celular con chat, sellos y helpers de animación.
// Uso en una escena (después de GSAP): svg.innerHTML = AJ.tablero(...) + AJ.pieza(...) + ...
// y en el script: const K = AJ.kit(tl, root).
window.AJ = window.AJ || (function () {
  const INK = "#1c1612", EBA = "#2a211b", EBA2 = "#4a3a30", MAR = "#f3e6c8", MAR2 = "#d9c7a0",
    MAD = "#4a2c17", MAD2 = "#7a4a26", MAD3 = "#b07a45", LAT = "#d4a73a", LAT2 = "#a67c1f",
    ROJO = "#d7263d", ROJO2 = "#ff8a8a", BOR = "#7a1f2b", PIEL = "#eab88e", PIEL2 = "#c98c62",
    GRIS = "#d8d0c0", GRIS2 = "#a39a8a", VERDE = "#5ce611", VERDE2 = "#3f9e0b", BOCA = "#6e1420";
  if (!document.getElementById("aj-css")) {
    const st = document.createElement("style");
    st.id = "aj-css";
    st.textContent = `
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.aj-sello { position: absolute; box-sizing: border-box; padding: 14px 34px 8px; border: 9px solid ${ROJO}; border-radius: 12px; color: ${ROJO};
  font-family: "Cinzel", serif; font-weight: 900; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(243, 230, 200, 0.96);
  box-shadow: 8px 10px 0 rgba(0, 0, 0, 0.35); }
.aj-sello.lat { border-color: ${LAT}; color: ${MAR}; background: ${EBA}; }
.aj-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.aj-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${EBA}; border: 4px solid ${LAT}; border-radius: 8px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.35);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${LAT}; white-space: nowrap; text-align: center; }
.aj-tag.rojo { background: ${ROJO}; border-color: ${MAR}; color: ${MAR}; }
.aj-tag.mar { background: ${MAR}; border-color: ${INK}; color: ${INK}; }
.aj-tag.verde { background: ${INK}; border-color: ${VERDE}; color: ${VERDE}; }
.aj-titulo { position: absolute; font-family: "Cinzel", serif; font-weight: 900; color: ${MAR}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 7px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}; letter-spacing: 0.02em; }
.aj-nota { position: absolute; box-sizing: border-box; padding: 10px 26px 12px; background: ${MAR}; border: 5px solid ${INK}; border-radius: 6px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.35);
  font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; font-size: 46px; line-height: 1.05; color: ${INK}; white-space: nowrap; }
.aj-nota b { font-family: "IBM Plex Mono", monospace; font-style: normal; font-weight: 600; font-size: 34px; color: ${BOR}; margin-right: 14px; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;

  // ---------- TABLERO en perspectiva ----------
  // o = { cx, yN (borde de adelante), yF (borde de atrás), W (ancho de adelante), k (profundidad, 0.4-0.9) }
  // fila 0 = la de adelante (blancas), columna 0 = izquierda.
  function proy(o, u, v) {
    const yH = o.yN - (o.yN - o.yF) * (1 + o.k) / o.k;
    const p = 1 / (1 + v * o.k);
    return [o.cx + u * (o.W / 2) * p, yH + (o.yN - yH) * p, p];
  }
  function casilla(o, c, r) {
    const [x, y, p] = proy(o, -1 + (2 * c + 1) / 8, (r + 0.5) / 8);
    return { x, y, p };
  }
  function tablero(o) {
    const P = (u, v) => proy(o, u, v).slice(0, 2).map((n) => n.toFixed(1)).join(" ");
    const m = 0.09;
    let sq = "";
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const u0 = -1 + c / 4, u1 = -1 + (c + 1) / 4, v0 = r / 8, v1 = (r + 1) / 8;
      const osc = (r + c) % 2 === 0;
      const id = o.marcar && o.marcar[`${c},${r}`];
      sq += `<path class="aj-sq aj-sq-${c}-${r}" d="M${P(u0, v0)} L${P(u1, v0)} L${P(u1, v1)} L${P(u0, v1)} Z" fill="${id || (osc ? EBA2 : MAR)}"/>`;
    }
    const [fx0, fy0] = proy(o, -1 - m, -m), [fx1] = proy(o, 1 + m, -m);
    return `<g class="aj-tab ${o.cls || ""}">
      <path d="M${fx0} ${fy0} L${fx1} ${fy0} L${fx1 - 8} ${fy0 + 46} L${fx0 + 8} ${fy0 + 46} Z" fill="${MAD}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M${P(-1 - m, -m)} L${P(1 + m, -m)} L${P(1 + m, 1 + m)} L${P(-1 - m, 1 + m)} Z" fill="${MAD2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M${P(-1 - m * 0.6, -m * 0.6)} L${P(1 + m * 0.6, -m * 0.6)} M${P(-1 - m * 0.4, 1 + m * 0.5)} L${P(1 + m * 0.4, 1 + m * 0.5)}" stroke="${MAD3}" stroke-width="4" opacity="0.6"/>
      ${sq}
      <path d="M${P(-1, 0)} L${P(1, 0)} L${P(1, 1)} L${P(-1, 1)} Z" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    </g>`;
  }

  // ---------- PIEZAS ----------
  // pieza(tipo, x, y, s, color, o): base al centro (x, y). tipo: peon | torre | alfil | caballo | dama | rey.
  // color: "b" | "n" | "v" (verde: el agente). o.cara: feliz | duda | triste | susto | canchero | seria;
  // o.extra: colita | gorra; o.cls. Clases: .aj-p .aj-p-cara .aj-p-boca
  const CUERPO = {
    peon: { d: "M-34 -40 Q-30 -88 -18 -108 L18 -108 Q30 -88 34 -40 Z", cuello: [0, -110, 30], cabeza: `<circle cx="0" cy="-142" r="34"/>`, cara: [0, -142, 1] },
    torre: { d: "M-40 -40 L-32 -152 L32 -152 L40 -40 Z", cuello: [0, -154, 40], cabeza: `<path d="M-48 -156 L48 -156 L48 -206 L28 -206 L28 -186 L10 -186 L10 -206 L-10 -206 L-10 -186 L-28 -186 L-28 -206 L-48 -206 Z"/>`, cara: [0, -102, 1] },
    alfil: { d: "M-34 -40 Q-26 -108 -16 -128 L16 -128 Q26 -108 34 -40 Z", cuello: [0, -130, 30], cabeza: `<path d="M0 -236 Q-44 -196 -34 -164 Q-26 -138 0 -138 Q26 -138 34 -164 Q42 -190 14 -218 Z"/><circle cx="0" cy="-244" r="11"/>`, cara: [0, -170, 0.9] },
    caballo: { d: "", cuello: null, cabeza: `<path d="M-42 -40 L44 -40 Q50 -112 30 -152 Q20 -204 -8 -226 L-12 -250 L-26 -228 Q-62 -206 -72 -164 Q-78 -142 -62 -132 Q-46 -126 -32 -140 Q-22 -126 -36 -96 Q-48 -70 -42 -40 Z"/>`, cara: [-26, -178, 0.9] },
    dama: { d: "M-38 -40 Q-28 -118 -20 -150 L20 -150 Q28 -118 38 -40 Z", cuello: [0, -152, 34], cabeza: `<path d="M-34 -160 L-48 -216 L-22 -186 L0 -230 L22 -186 L48 -216 L34 -160 Z"/><circle cx="-48" cy="-220" r="9"/><circle cx="0" cy="-238" r="10"/><circle cx="48" cy="-220" r="9"/>`, cara: [0, -104, 1] },
    rey: { d: "M-40 -40 Q-30 -122 -22 -158 L22 -158 Q30 -122 40 -40 Z", cuello: [0, -160, 36], cabeza: `<path d="M-34 -166 Q-46 -210 -24 -224 L24 -224 Q46 -210 34 -166 Z"/><path d="M-8 -224 L-8 -240 L-24 -240 L-24 -256 L-8 -256 L-8 -272 L8 -272 L8 -256 L24 -256 L24 -240 L8 -240 L8 -224 Z"/>`, cara: [0, -108, 1] },
  };
  function cara(tipo, cx, cy, k, col) {
    const tin = col === "b" ? INK : MAR;
    const g = (s) => `<g class="aj-p-cara" transform="translate(${cx} ${cy}) scale(${k})">${s}</g>`;
    const ojo = (x) => `<ellipse cx="${x}" cy="-6" rx="6" ry="8" fill="${tin}"/>`;
    if (tipo === "feliz") return g(`<path d="M-20 -6 Q-13 -16 -6 -6 M6 -6 Q13 -16 20 -6" fill="none" stroke="${tin}" stroke-width="5" stroke-linecap="round"/><path class="aj-p-boca" d="M-14 10 Q0 26 14 10 Z" fill="${BOCA}" stroke="${tin}" stroke-width="4" stroke-linejoin="round"/>`);
    if (tipo === "susto") return g(`<circle cx="-13" cy="-6" r="10" fill="${MAR}" stroke="${INK}" stroke-width="4"/><circle cx="13" cy="-6" r="10" fill="${MAR}" stroke="${INK}" stroke-width="4"/><circle cx="-13" cy="-5" r="4" fill="${INK}"/><circle cx="13" cy="-5" r="4" fill="${INK}"/><ellipse class="aj-p-boca" cx="0" cy="18" rx="7" ry="9" fill="${BOCA}" stroke="${tin}" stroke-width="4"/>`);
    if (tipo === "triste") return g(`${ojo(-13)}${ojo(13)}<path d="M-24 -22 L-6 -16 M24 -22 L6 -16" stroke="${tin}" stroke-width="4" stroke-linecap="round"/><path class="aj-p-boca" d="M-12 20 Q0 10 12 20" fill="none" stroke="${tin}" stroke-width="5" stroke-linecap="round"/>`);
    if (tipo === "duda") return g(`${ojo(-13)}${ojo(13)}<path d="M-24 -24 Q-14 -30 -4 -22 M6 -18 L24 -20" stroke="${tin}" stroke-width="4" stroke-linecap="round" fill="none"/><path class="aj-p-boca" d="M-12 16 Q-4 10 2 16 Q8 22 14 14" fill="none" stroke="${tin}" stroke-width="5" stroke-linecap="round"/>`);
    if (tipo === "canchero") return g(`<path d="M-24 -10 L-4 -10 M4 -10 L24 -10" stroke="${tin}" stroke-width="5" stroke-linecap="round"/><path d="M-20 -9 Q-14 0 -6 -9 Z M6 -9 Q12 0 20 -9 Z" fill="${tin}" stroke="${tin}" stroke-width="3"/><path class="aj-p-boca" d="M-14 12 Q4 20 18 6" fill="none" stroke="${tin}" stroke-width="5" stroke-linecap="round"/>`);
    if (tipo === "pantalla") return g(`<rect x="-30" y="-26" width="60" height="50" rx="10" fill="${INK}" stroke="${VERDE2}" stroke-width="3"/><ellipse cx="-12" cy="-6" rx="5" ry="7" fill="${VERDE}"/><ellipse cx="12" cy="-6" rx="5" ry="7" fill="${VERDE}"/><path class="aj-p-boca" d="M-12 8 Q0 18 12 8" fill="none" stroke="${VERDE}" stroke-width="4" stroke-linecap="round"/>`);
    return g(`${ojo(-13)}${ojo(13)}<path class="aj-p-boca" d="M-10 14 L10 14" stroke="${tin}" stroke-width="5" stroke-linecap="round"/>`);
  }
  function pieza(tipo, x, y, s, col, o) {
    o = o || {};
    const B = CUERPO[tipo];
    const fill = col === "n" ? EBA : col === "v" ? VERDE : MAR;
    const sombra = col === "n" ? "#0e0b09" : col === "v" ? VERDE2 : MAR2;
    const brillo = col === "n" ? EBA2 : col === "v" ? "#b4ff7a" : "#fffaf0";
    const st = `fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"`;
    const base = `<path d="M-62 0 L62 0 L56 -24 L-56 -24 Z" ${st}/><path d="M-46 -24 L46 -24 L40 -42 L-40 -42 Z" ${st}/>`;
    const cuello = B.cuello ? `<ellipse cx="${B.cuello[0]}" cy="${B.cuello[1]}" rx="${B.cuello[2]}" ry="9" ${st}/>` : "";
    const cuerpo = B.d ? `<path d="${B.d}" ${st}/>` : "";
    const cab = `<g ${st}>${B.cabeza}</g>`;
    const luz = tipo === "caballo" ? `<path d="M-30 -60 Q-26 -90 -16 -110" stroke="${brillo}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.7"/><path d="M28 -60 Q40 -120 18 -170" stroke="${sombra}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/><path d="M6 -214 Q24 -180 32 -150 M14 -200 L24 -206 M22 -180 L32 -186 M28 -160 L38 -164" stroke="${col === "n" ? EBA2 : MAR2}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-58" cy="-150" r="4" fill="${col === "b" ? INK : MAR2}"/>`
      : `<path d="M-22 -50 Q-20 -80 -12 -96" stroke="${brillo}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.7"/><path d="M-52 -6 L52 -6" stroke="${sombra}" stroke-width="6" opacity="0.8"/>`;
    let extra = "";
    if (o.extra === "colita") extra = `<path d="M24 -168 Q70 -176 66 -136 Q60 -112 46 -120 Q54 -146 22 -152 Z" fill="${MAD2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="28" cy="-162" r="8" fill="${ROJO}" stroke="${INK}" stroke-width="4"/>`;
    if (o.extra === "gorra") extra = `<path d="M-34 -150 Q-34 -186 0 -186 Q34 -186 34 -150 Z" fill="${BOR}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-36 -152 L-74 -150 Q-70 -142 -34 -144 Z" fill="${BOR}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    if (o.extra === "delantal") extra = `<path d="M-24 -138 L24 -138 L32 -48 L-32 -48 Z" fill="${MAD3}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-12 -110 L12 -110 L12 -90 L-12 -90 Z" fill="none" stroke="${INK}" stroke-width="3"/>`;
    const [fx, fy, fk] = B.cara;
    const caraSvg = o.cara ? cara(o.cara, fx, fy, fk, col === "v" ? "n" : col) : "";
    return `<g class="aj-p ${o.cls || ""}" transform="${T(x, y, s, o.espejo)}">${o.halo ? `<ellipse cx="0" cy="-4" rx="${o.halo}" ry="${o.halo * 0.26}" fill="${o.haloColor || VERDE}" opacity="0.45"/>` : ""}${base}${cuerpo}${cuello}${cab}${luz}${extra}${caraSvg}</g>`;
  }

  // ---------- PERSONAJES (bustos; origen = centro de la base del torso; cabeza en (0, -350)) ----------
  const brazo = (d, c, w) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${(w || 56) + 14}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w || 56}" stroke-linecap="round"/>`;
  const mano = (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="${r || 32}" ry="${(r || 32) * 0.88}" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`;
  function cabezaBase() {
    return `<ellipse cx="-104" cy="-346" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      <ellipse cx="104" cy="-346" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      <path d="M-102 -396 C-106 -486 106 -486 102 -396 L98 -318 C92 -254 52 -228 0 -228 C-52 -228 -92 -254 -98 -318 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>`;
  }
  // EL GRAN MAESTRO: pelado arriba, canas a los costados, cejas grises enormes, lentes redondos, barba
  // gris, saco de tweed, moño bordó. o.cara: seria | sorna | triste | enfatico. o.brazo: dedo | pieza | "".
  function maestro(x, y, s, o) {
    o = o || {};
    const c = o.cara || "seria";
    const cejas = c === "sorna" ? "M-90 -404 Q-56 -398 -24 -392 M24 -414 Q56 -440 92 -420" : c === "triste" ? "M-92 -396 Q-60 -404 -26 -420 M26 -420 Q60 -404 92 -396"
      : c === "enfatico" ? "M-92 -414 Q-58 -432 -24 -414 M24 -414 Q58 -432 92 -414" : "M-92 -402 Q-58 -410 -24 -400 M24 -400 Q58 -410 92 -402";
    const ojos = c === "sorna" ? `<path d="M-64 -352 Q-48 -344 -32 -352" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="-354" r="9" fill="${INK}"/>`
      : c === "enfatico" ? `<circle cx="-48" cy="-354" r="10" fill="${INK}"/><circle cx="48" cy="-354" r="10" fill="${INK}"/>`
      : `<path d="M-66 -356 L-30 -356 M30 -356 L66 -356" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M-62 -354 Q-48 -342 -34 -354 Z M34 -354 Q48 -342 62 -354 Z" fill="${INK}" stroke="${INK}" stroke-width="4"/>`;
    const boca = c === "enfatico" ? `<path class="aj-m-boca" d="M-26 -282 Q0 -290 26 -282 Q22 -250 0 -248 Q-22 -250 -26 -282 Z" fill="${BOCA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
      : c === "sorna" ? `<path class="aj-m-boca" d="M-24 -272 Q4 -262 28 -282" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : c === "triste" ? `<path class="aj-m-boca" d="M-22 -266 Q0 -280 22 -266" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="aj-m-boca" d="M-22 -272 L22 -272" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    let br = "";
    if (o.brazo === "dedo") br = `<g class="aj-m-brazo">${brazo("M170 -120 C230 -170 250 -250 236 -330", MAD3, 60)}${mano(234, -350, 34)}<path d="M228 -376 L226 -440" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M228 -376 L226 -440" stroke="${PIEL}" stroke-width="18" stroke-linecap="round"/></g>`;
    if (o.brazo === "pieza") br = `<g class="aj-m-brazo">${brazo("M170 -120 C240 -170 270 -250 262 -330", MAD3, 60)}${pieza("rey", 262, -350, 0.62, "b")}${mano(262, -356, 36)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="aj-m">
      <path d="M-250 40 C-252 -110 -200 -205 -90 -222 L90 -222 C200 -205 252 -110 250 40 Z" fill="${MAD3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 -120 l14 10 M-170 -40 l14 10 M-210 -10 l14 10 M180 -110 l14 10 M200 -30 l14 10 M150 -60 l14 10 M-150 -170 l14 10 M140 -160 l14 10" stroke="${MAD2}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-74 -220 L0 -60 L74 -220 Z" fill="${MAR}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-90 -222 L-10 -40 L-70 40 L-120 40 L-140 -150 Z M90 -222 L10 -40 L70 40 L120 40 L140 -150 Z" fill="${MAD2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-46 -214 L-6 -196 L-46 -176 Z M46 -214 L6 -196 L46 -176 Z" fill="${BOR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="-196" r="11" fill="${BOR}" stroke="${INK}" stroke-width="5"/>
      <path d="M-44 -282 L-48 -212 L48 -212 L44 -282 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="aj-m-cabeza">
        ${cabezaBase()}
        <path d="M-102 -330 C-130 -360 -130 -420 -96 -440 C-98 -410 -94 -380 -86 -360 Z M102 -330 C130 -360 130 -420 96 -440 C98 -410 94 -380 86 -360 Z" fill="${GRIS}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -470 Q-10 -480 20 -470" fill="none" stroke="${PIEL2}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-98 -320 C-96 -250 -60 -200 0 -196 C60 -200 96 -250 98 -320 C80 -290 60 -300 40 -296 C20 -306 -20 -306 -40 -296 C-60 -300 -80 -290 -98 -320 Z" fill="${GRIS}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-50 -300 C-30 -316 -10 -312 0 -304 C10 -312 30 -316 50 -300 C30 -294 10 -296 0 -300 C-10 -296 -30 -294 -50 -300 Z" fill="${GRIS2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M0 -344 C-12 -316 -16 -306 -2 -302" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path class="aj-m-cejas" d="${cejas}" fill="none" stroke="${GRIS}" stroke-width="20" stroke-linecap="round"/>
        <path d="${cejas}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <g class="aj-m-ojos">${ojos}</g>
        <circle cx="-48" cy="-354" r="32" fill="none" stroke="${LAT2}" stroke-width="7"/><circle cx="48" cy="-354" r="32" fill="none" stroke="${LAT2}" stroke-width="7"/>
        <path d="M-16 -358 Q0 -368 16 -358 M-80 -360 L-100 -366 M80 -360 L100 -366" fill="none" stroke="${LAT2}" stroke-width="6"/>
        ${boca}
      </g>
      ${br}
    </g></g>`;
  }
  // EL AYUDANTE: pibe con jopo revuelto, auriculares con micrófono, saco bordó grande, corbata finita.
  // o.cara: feliz | grito | duda | triste. o.brazo: arriba (festeja) | cabeza (manos en la cabeza) | "".
  function ayudante(x, y, s, o) {
    o = o || {};
    const c = o.cara || "feliz";
    const ojos = c === "feliz" ? `<path d="M-64 -350 Q-48 -370 -32 -350 M32 -350 Q48 -370 64 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : c === "grito" ? `<circle cx="-48" cy="-354" r="20" fill="${MAR}" stroke="${INK}" stroke-width="6"/><circle cx="48" cy="-354" r="20" fill="${MAR}" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-352" r="8" fill="${INK}"/><circle cx="48" cy="-352" r="8" fill="${INK}"/>`
      : `<ellipse cx="-48" cy="-354" rx="11" ry="14" fill="${INK}"/><ellipse cx="48" cy="-354" rx="11" ry="14" fill="${INK}"/><circle cx="-44" cy="-359" r="4" fill="#ffffff"/><circle cx="52" cy="-359" r="4" fill="#ffffff"/>`;
    const cejas = c === "duda" ? "M-74 -392 Q-50 -410 -26 -394 M26 -384 L74 -388" : c === "triste" ? "M-74 -380 L-28 -396 M74 -380 L28 -396" : "M-74 -396 Q-50 -414 -26 -398 M26 -398 Q50 -414 74 -396";
    const boca = c === "grito" ? `<path class="aj-a-boca" d="M-40 -294 Q0 -306 40 -294 Q36 -236 0 -232 Q-36 -236 -40 -294 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-32 -292 L32 -292" stroke="${MAR}" stroke-width="8"/>`
      : c === "feliz" ? `<path class="aj-a-boca" d="M-46 -292 Q0 -230 46 -292 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-40 -290 L40 -290" stroke="${MAR}" stroke-width="7"/>`
      : c === "duda" ? `<path class="aj-a-boca" d="M-28 -276 Q-10 -290 4 -276 Q18 -262 30 -280" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="aj-a-boca" d="M-26 -268 Q0 -286 26 -268" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    let br = "";
    if (o.brazo === "arriba") br = `<g class="aj-a-brazo">${brazo("M-180 -140 C-240 -230 -250 -330 -230 -430", BOR, 58)}${mano(-230, -452, 36)}${brazo("M180 -140 C240 -230 250 -330 230 -430", BOR, 58)}${mano(230, -452, 36)}</g>`;
    if (o.brazo === "cabeza") br = `<g class="aj-a-brazo">${brazo("M-180 -140 C-250 -230 -200 -380 -120 -420", BOR, 58)}${mano(-110, -424, 36)}${brazo("M180 -140 C250 -230 200 -380 120 -420", BOR, 58)}${mano(110, -424, 36)}</g>`;
    const gota = c === "duda" ? `<path d="M118 -420 Q104 -396 118 -388 Q132 -396 118 -420 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="4"/>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="aj-a">
      <path d="M-240 40 C-244 -110 -196 -205 -88 -222 L88 -222 C196 -205 244 -110 240 40 Z" fill="${BOR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-64 -220 L0 -110 L64 -220 Z" fill="${MAR}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-10 -200 L10 -200 L16 -60 L0 -40 L-16 -60 Z" fill="${LAT}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-88 -222 L-14 -60 L-50 40 M88 -222 L14 -60 L50 40" fill="none" stroke="${INK}" stroke-width="7"/>
      <path d="M-44 -282 L-48 -212 L48 -212 L44 -282 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="aj-a-cabeza">
        ${cabezaBase()}
        <path d="M-108 -390 C-130 -470 -60 -520 -10 -500 C10 -540 70 -536 80 -500 C130 -500 140 -440 108 -392 C96 -430 60 -440 30 -426 C10 -446 -40 -446 -60 -424 C-80 -430 -96 -416 -108 -390 Z" fill="${MAD}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-10 -500 L-30 -546 L10 -514 M80 -500 L110 -530 L100 -490" fill="${MAD}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-124 -360 C-130 -500 130 -500 124 -360" fill="none" stroke="${INK}" stroke-width="18"/>
        <rect x="-150" y="-392" width="44" height="84" rx="16" fill="${EBA}" stroke="${INK}" stroke-width="6"/><rect x="106" y="-392" width="44" height="84" rx="16" fill="${EBA}" stroke="${INK}" stroke-width="6"/>
        <path d="M-128 -312 C-120 -260 -80 -250 -48 -262" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="-44" cy="-262" r="11" fill="${EBA}" stroke="${INK}" stroke-width="4"/>
        <path class="aj-a-cejas" d="${cejas}" fill="none" stroke="${MAD}" stroke-width="11" stroke-linecap="round"/>
        <g class="aj-a-ojos">${ojos}</g>
        <path d="M0 -344 C-12 -316 -16 -306 -2 -300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}${gota}
      </g>
      ${br}
    </g></g>`;
  }
  // EL DUEÑO de la zapatería: bigote, entradas, lápiz en la oreja, camisa marfil arremangada, delantal de cuero.
  // o.cara: desganado | grito | susto | triste | feliz. o.brazo: celular | caja | "". clases .aj-d .aj-d-boca .aj-d-brazo
  function dueno(x, y, s, o) {
    o = o || {};
    const c = o.cara || "desganado";
    const ojos = c === "desganado" ? `<path d="M-66 -362 L-30 -362 M30 -362 L66 -362" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M-62 -360 Q-48 -346 -34 -360 Z M34 -360 Q48 -346 62 -360 Z" fill="${INK}" stroke="${INK}" stroke-width="5"/>`
      : c === "susto" || c === "grito" ? `<circle cx="-48" cy="-356" r="20" fill="${MAR}" stroke="${INK}" stroke-width="6"/><circle cx="48" cy="-356" r="20" fill="${MAR}" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-354" r="8" fill="${INK}"/><circle cx="48" cy="-354" r="8" fill="${INK}"/>`
      : c === "feliz" ? `<path d="M-64 -350 Q-48 -370 -32 -350 M32 -350 Q48 -370 64 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<ellipse cx="-48" cy="-354" rx="11" ry="13" fill="${INK}"/><ellipse cx="48" cy="-354" rx="11" ry="13" fill="${INK}"/>`;
    const cejas = c === "triste" ? "M-74 -384 L-28 -398 M74 -384 L28 -398" : c === "grito" ? "M-74 -404 L-28 -388 M74 -404 L28 -388" : c === "susto" ? "M-74 -404 Q-50 -420 -26 -404 M26 -404 Q50 -420 74 -404" : "M-74 -388 L-28 -386 M74 -388 L28 -386";
    const boca = c === "grito" || c === "susto" ? `<path class="aj-d-boca" d="M-34 -270 Q0 -280 34 -270 Q30 -226 0 -222 Q-30 -226 -34 -270 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : c === "feliz" ? `<path class="aj-d-boca" d="M-40 -272 Q0 -226 40 -272 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : c === "triste" ? `<path class="aj-d-boca" d="M-22 -256 Q0 -272 22 -256" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="aj-d-boca" d="M-20 -262 Q0 -256 22 -264" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    let br = "";
    if (o.brazo === "celular") br = `<g class="aj-d-brazo">${brazo("M150 -150 C200 -110 150 -60 80 -90", PIEL, 50)}<g transform="rotate(-14 60 -130)"><rect x="24" y="-190" width="80" height="140" rx="14" fill="${INK}"/><rect x="32" y="-180" width="64" height="112" rx="8" fill="#9fc3d6"/></g>${mano(70, -100, 30)}</g>`;
    if (o.brazo === "caja") br = `<g class="aj-d-brazo"><g transform="rotate(-6 0 -80)"><rect x="-150" y="-150" width="300" height="120" rx="8" fill="${MAD3}" stroke="${INK}" stroke-width="7"/><rect x="-160" y="-170" width="320" height="34" rx="6" fill="${MAD2}" stroke="${INK}" stroke-width="7"/><text data-layout-ignore x="0" y="-74" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${INK}">N° 38</text></g>${mano(-150, -90, 30)}${mano(150, -100, 30)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="aj-d">
      <path d="M-240 40 C-244 -110 -196 -205 -88 -222 L88 -222 C196 -205 244 -110 240 40 Z" fill="${MAR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-140 40 L-130 -150 L-80 -150 L-60 -222 M140 40 L130 -150 L80 -150 L60 -222" fill="none" stroke="${MAD}" stroke-width="16" stroke-linejoin="round"/>
      <path d="M-130 40 L-120 -150 L120 -150 L130 40 Z" fill="${MAD2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-70 -90 L70 -90 L64 -20 L-64 -20 Z" fill="none" stroke="${MAD}" stroke-width="6"/>
      <path d="M-44 -282 L-48 -212 L48 -212 L44 -282 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-60 -224 L0 -180 L60 -224" fill="none" stroke="${INK}" stroke-width="6"/>
      <g class="aj-d-cabeza">
        ${cabezaBase()}
        <path d="M-102 -380 C-120 -440 -96 -480 -50 -486 C-60 -460 -70 -430 -86 -400 Z M102 -380 C120 -440 96 -480 50 -486 C60 -460 70 -430 86 -400 Z" fill="${EBA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-50 -486 C-20 -470 20 -470 50 -486 C30 -500 -30 -500 -50 -486 Z" fill="${EBA}" stroke="${INK}" stroke-width="5"/>
        <g transform="rotate(-62 116 -390)"><rect x="60" y="-402" width="120" height="16" rx="4" fill="${LAT}" stroke="${INK}" stroke-width="4"/><path d="M180 -402 L200 -394 L180 -386 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="4"/></g>
        <path class="aj-d-cejas" d="${cejas}" fill="none" stroke="${EBA}" stroke-width="12" stroke-linecap="round"/>
        <g class="aj-d-ojos">${ojos}</g>
        <path d="M0 -344 C-12 -316 -16 -306 -2 -302" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-60 -292 C-34 -314 -10 -306 0 -296 C10 -306 34 -314 60 -292 C40 -282 14 -286 0 -290 C-14 -286 -40 -282 -60 -292 Z" fill="${EBA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        ${boca}
        ${c === "susto" || c === "grito" ? `<path d="M118 -430 Q102 -404 118 -396 Q134 -404 118 -430 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="4"/>` : ""}
      </g>
      ${br}
    </g></g>`;
  }

  // ---------- RELOJ DE AJEDREZ con dígitos de segmentos ----------
  const SEGS = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "" };
  // seg(str, x, y, h, color): texto "72:00:00" en segmentos; (x, y) = arriba a la izquierda. Devuelve svg.
  function seg(str, x, y, h, color, apagado) {
    const w = h * 0.52, t = h * 0.13, gap = h * 0.18;
    let out = "", cx = x;
    for (const ch of String(str)) {
      if (ch === ":") { out += `<rect x="${cx + t * 0.2}" y="${y + h * 0.26}" width="${t}" height="${t}" fill="${color}"/><rect x="${cx + t * 0.2}" y="${y + h * 0.66}" width="${t}" height="${t}" fill="${color}"/>`; cx += t * 1.6 + gap * 0.4; continue; }
      const on = SEGS[ch] ?? "";
      const R = {
        a: [cx + t * 0.6, y, w - t * 1.2, t], g: [cx + t * 0.6, y + h / 2 - t / 2, w - t * 1.2, t], d: [cx + t * 0.6, y + h - t, w - t * 1.2, t],
        f: [cx, y + t * 0.6, t, h / 2 - t * 0.9], b: [cx + w - t, y + t * 0.6, t, h / 2 - t * 0.9],
        e: [cx, y + h / 2 + t * 0.3, t, h / 2 - t * 0.9], c: [cx + w - t, y + h / 2 + t * 0.3, t, h / 2 - t * 0.9],
      };
      for (const k of "abcdefg") {
        const [rx, ry, rw, rh] = R[k];
        const prendido = on.includes(k);
        if (!prendido && !apagado) continue;
        out += `<rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" rx="${(t * 0.45).toFixed(1)}" fill="${color}" opacity="${prendido ? 1 : 0.1}"/>`;
      }
      cx += w + gap;
    }
    return out;
  }
  // reloj(x, y, s, o): caja de madera con dos caras; origen = base al centro. o.izq/o.der: textos;
  // o.cls. Clases: .aj-r-izq .aj-r-der (grupos de dígitos), .aj-r-bi .aj-r-bd (botones), .aj-r-flag
  function reloj(x, y, s, o) {
    o = o || {};
    const dig = (str, cx, col) => seg(str, cx - 3.8 * 62 * 0.52 / 2 - 22, -186, 62, col, true);
    return `<g class="aj-r ${o.cls || ""}" transform="${T(x, y, s)}">
      <path d="M-300 0 L300 0 L280 -250 L-280 -250 Z" fill="${MAD2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-300 0 L300 0 L300 -24 L-300 -24 Z" fill="${MAD}" stroke="${INK}" stroke-width="6"/>
      <path d="M-270 -60 Q0 -70 270 -60" stroke="${MAD3}" stroke-width="5" fill="none" opacity="0.6"/>
      <rect class="aj-r-bi" x="-200" y="-292" width="120" height="42" rx="10" fill="${MAR}" stroke="${INK}" stroke-width="6"/>
      <rect class="aj-r-bd" x="80" y="-276" width="120" height="26" rx="8" fill="${EBA}" stroke="${INK}" stroke-width="6"/>
      <rect x="-262" y="-214" width="246" height="128" rx="14" fill="#14100d" stroke="${INK}" stroke-width="6"/>
      <rect x="16" y="-214" width="246" height="128" rx="14" fill="#14100d" stroke="${INK}" stroke-width="6"/>
      <g class="aj-r-izq">${o.izqSvg ?? seg(o.izq ?? "00:00", -240, -186, 62, ROJO2, true)}</g>
      <g class="aj-r-der">${o.derSvg ?? seg(o.der ?? "00:00", 38, -186, 62, MAR, true)}</g>
      <text data-layout-ignore x="-139" y="-48" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" letter-spacing="3" fill="${MAR}">TU LOCAL</text>
      <text data-layout-ignore x="139" y="-48" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" letter-spacing="3" fill="${MAR}">ENFRENTE</text>
      <g class="aj-r-flag"><path d="M-30 -214 L-30 -150" stroke="${INK}" stroke-width="5"/><path d="M-30 -212 L-6 -204 L-30 -194 Z" fill="${ROJO}" stroke="${INK}" stroke-width="3"/></g>
    </g>`;
  }

  // ---------- CHAT ----------
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || "#efe6d0"}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || MAD}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${MAR}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${MAR}">${nombre}</text>
      <text class="aj-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${MAR}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho]. o.visto: doble tilde
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48 + (o.hora ? 30 : 0);
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#e4f0cf" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hx = gx + ancho - 18 - (o.visto ? 40 : 0);
    const hora = o.hora ? `<text x="${hx}" y="${y + alto - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#6b6259">${o.hora}</text>` : "";
    const visto = o.visto ? `<path d="M${gx + ancho - 52} ${y + alto - 24} l7 7 l14 -16 M${gx + ancho - 40} ${y + alto - 17} l14 -16" fill="none" stroke="${o.visto === "azul" ? "#2b8be6" : "#8a8a8a"}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}${hora}${visto}</g>`, alto, ancho];
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    function popSvg(el, t, o, d, desde) {
      gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 0.3, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: d || 0.4, ease: "back.out(2)", immediateRender: false }, t);
    }
    function sello(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 1.9, rotation: (rot || 0) - 6 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.12, ease: "power4.in", immediateRender: false }, t - 0.1);
      tl.fromTo(el, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t + 0.02);
    }
    function sacudon(el, t, f) {
      f = f || 1;
      [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.5, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // una pieza salta de casilla: dx, dy en px, alto del arco
    function saltar(el, t, dx, dy, d, alto) {
      d = d || 0.45; alto = alto ?? 120;
      tl.to(el, { x: `+=${dx}`, duration: d, ease: "power1.inOut" }, t);
      tl.to(el, { y: `+=${dy / 2 - alto}`, duration: d / 2, ease: "power2.out" }, t);
      tl.to(el, { y: `+=${dy / 2 + alto}`, duration: d / 2, ease: "power2.in" }, t + d / 2);
    }
    // el rey cae: gira sobre su base (ori = "x y" de la base)
    function tumbar(el, t, ori, ang) {
      origen(el, ori);
      tl.to(el, { rotation: ang ?? 84, svgOrigin: ori, duration: 0.55, ease: "bounce.out" }, t);
    }
    function respirar(el, t, d, amp, ori) {
      const n = Math.max(1, Math.round(d / 0.9));
      if (ori) origen(el, ori);
      tl.fromTo(el, { scale: 1 }, { scale: 1 + (amp || 0.015), duration: d / n / 2, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false, ...(ori ? { svgOrigin: ori } : {}) }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, hablar, saltar, tumbar, respirar, salida };
  }
  return { INK, EBA, EBA2, MAR, MAR2, MAD, MAD2, MAD3, LAT, LAT2, ROJO, ROJO2, BOR, PIEL, PIEL2, GRIS, GRIS2, VERDE, VERDE2, BOCA,
    proy, casilla, tablero, pieza, maestro, ayudante, dueno, seg, reloj, celular, celularBorde, chatCabecera, globo, kit };
})();
