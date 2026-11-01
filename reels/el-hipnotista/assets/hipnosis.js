// Piezas del reel "el-hipnotista": El Gran Mesmerino, Osvaldo (el dueño en trance), la vecina del
// público, la espiral hipnótica, el reloj péndulo dorado, teclas, cartel de varieté y helpers.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = HP.mesmerino(x, y, s) + ...
// y en el script: const K = HP.kit(tl, root).
window.HP = window.HP || (function () {
  const INK = "#120a0e", ROJO = "#a3122a", ROJOC = "#d6243a", ORO = "#e6b143", OROC = "#ffd36b", OROD = "#a87a1e",
    CREMA = "#f6ecd6", VIO = "#7a4fd8", VIOC = "#c7a4ff", PIEL = "#f0c39c", PIELD = "#d9a27a", VERDE = "#5ce611", VERDED = "#3f9e0b";
  if (!document.getElementById("hp-css")) {
    const st = document.createElement("style");
    st.id = "hp-css";
    st.textContent = `
@font-face { font-family: "Luckiest Guy"; font-display: block; src: url("assets/fonts/LuckiestGuy.woff2") format("woff2"); }
@font-face { font-family: "Cormorant"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.hp-cartel { position: absolute; box-sizing: border-box; font-family: "Luckiest Guy", sans-serif; color: ${OROC}; line-height: 0.95; letter-spacing: 0.03em;
  text-align: center; white-space: nowrap; -webkit-text-stroke: 3px ${INK}; paint-order: stroke fill;
  text-shadow: 0 7px 0 ${OROD}, 0 9px 0 ${INK}, 6px 6px 0 ${INK}, -3px 3px 0 ${INK}; }
.hp-cartel.rojo { color: ${ROJOC}; text-shadow: 0 7px 0 #6e0a1b, 0 9px 0 ${INK}, 6px 6px 0 ${INK}, -3px 3px 0 ${INK}; }
.hp-cartel.crema { color: ${CREMA}; text-shadow: 0 7px 0 #b9a77e, 0 9px 0 ${INK}, 6px 6px 0 ${INK}, -3px 3px 0 ${INK}; }
.hp-cartel.verde { color: ${VERDE}; text-shadow: 0 7px 0 ${VERDED}, 0 9px 0 ${INK}, 6px 6px 0 ${INK}, -3px 3px 0 ${INK}; }
.hp-cartel.vio { color: ${VIOC}; text-shadow: 0 7px 0 #4b2c94, 0 9px 0 ${INK}, 6px 6px 0 ${INK}, -3px 3px 0 ${INK}; }
.hp-sello { position: absolute; box-sizing: border-box; padding: 16px 30px 6px; border: 8px solid ${ROJOC}; border-radius: 16px; color: ${ROJOC};
  font-family: "Luckiest Guy", sans-serif; letter-spacing: 0.04em; white-space: nowrap; text-align: center; line-height: 1; background: ${CREMA};
  box-shadow: 8px 8px 0 ${INK}; }
.hp-sello.oro { border-color: ${OROD}; color: ${OROD}; }
.hp-sello.vio { border-color: ${VIO}; color: ${VIO}; }
.hp-sello.verde { border-color: ${VERDED}; color: ${VERDED}; }
.hp-tag { position: absolute; box-sizing: border-box; padding: 11px 24px 9px; background: ${ROJO}; border: 4px solid ${ORO}; border-radius: 10px; box-shadow: 6px 6px 0 ${INK};
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.16em; color: ${CREMA}; white-space: nowrap; text-align: center; }
.hp-tag.vio { background: #4b2c94; border-color: ${VIOC}; }
.hp-tag.verde { background: ${VERDED}; border-color: ${VERDE}; }
.hp-tag.negro { background: ${INK}; }
.hp-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${CREMA}; border: 6px solid ${INK}; border-radius: 34px; box-shadow: 7px 7px 0 rgba(18,10,14,0.6);
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
.hp-globo.trance { font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 52px; color: #4b2c94; border-style: dashed; border-color: ${VIO}; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  const brazo = (d, ropa, w) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${(w || 52) + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${ropa}" stroke-width="${w || 52}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // ESPIRAL: disco crema con espiral negra (Arquímedes, dos brazos). cls para girarla con svgOrigin cx cy.
  function espiral(cx, cy, r, cls, o) {
    o = o || {};
    const vueltas = o.vueltas || 4, fondo = o.fondo || CREMA, tinta = o.tinta || INK;
    let d = "";
    for (const fase of [0, Math.PI]) {
      const pts = [];
      for (let k = 0; k <= 160; k++) {
        const t = (k / 160) * vueltas * Math.PI * 2;
        const rr = (r * 0.98 * k) / 160;
        pts.push(`${(cx + rr * Math.cos(t + fase)).toFixed(1)} ${(cy + rr * Math.sin(t + fase)).toFixed(1)}`);
      }
      d += `M${pts.join(" L")} `;
    }
    return `<g class="${cls || ""}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fondo}"/>
      <path d="${d}" fill="none" stroke="${tinta}" stroke-width="${(r / vueltas / 2.2).toFixed(1)}" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${Math.max(4, r / 14).toFixed(1)}"/></g>`;
  }

  // RELOJ DE BOLSILLO dorado colgando: punto de cuelgue (x, y), largo de cadena l, radio r. clase .hp-pend
  function pendulo(x, y, l, r, cls) {
    let marcas = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      marcas += `<path d="M${(x + Math.cos(a) * r * 0.68).toFixed(1)} ${(y + l + Math.sin(a) * r * 0.68).toFixed(1)} L${(x + Math.cos(a) * r * 0.8).toFixed(1)} ${(y + l + Math.sin(a) * r * 0.8).toFixed(1)}" stroke="${INK}" stroke-width="${(r / 18).toFixed(1)}" stroke-linecap="round"/>`;
    }
    const cy = y + l;
    return `<g class="${cls || "hp-pend"}">
      <path d="M${x} ${y} L${x} ${cy - r - 16}" stroke="${OROD}" stroke-width="${Math.max(4, r / 9)}" stroke-dasharray="${r / 6} ${r / 10}" stroke-linecap="round"/>
      <rect x="${x - r * 0.16}" y="${cy - r - 22}" width="${r * 0.32}" height="${r * 0.3}" rx="${r * 0.06}" fill="${ORO}" stroke="${INK}" stroke-width="${Math.max(4, r / 14)}"/>
      <circle cx="${x}" cy="${cy}" r="${r}" fill="${ORO}" stroke="${INK}" stroke-width="${Math.max(5, r / 11)}"/>
      <circle cx="${x}" cy="${cy}" r="${r * 0.84}" fill="${CREMA}" stroke="${OROD}" stroke-width="${Math.max(3, r / 16)}"/>
      ${marcas}
      <path class="hp-pend-agujas" d="M${x} ${cy} L${x} ${cy - r * 0.55} M${x} ${cy} L${x + r * 0.38} ${cy + r * 0.1}" stroke="${INK}" stroke-width="${Math.max(4, r / 12)}" stroke-linecap="round"/>
      <circle cx="${x}" cy="${cy}" r="${r * 0.08}" fill="${ROJO}"/>
      <path d="M${x - r * 0.55} ${cy - r * 0.45} Q${x - r * 0.3} ${cy - r * 0.72} ${x} ${cy - r * 0.76}" fill="none" stroke="#fff" stroke-width="${Math.max(3, r / 14)}" stroke-linecap="round" opacity="0.8"/>
    </g>`;
  }

  // EL GRAN MESMERINO: origen = centro de la base del torso. Cabeza en (0,-370).
  // clases: .hp-h (todo) .hp-h-capa .hp-h-cabeza .hp-h-cejas .hp-h-boca .hp-h-bigote
  //         .hp-h-brazo (derecho, hombro 140 -200, mano en 300 -330, con el reloj colgando: .hp-h-pend cuelga en 300 -330)
  //         .hp-h-mano (izquierdo, hombro -140 -200, mano arriba en -300 -420 para chasquear; o.chas: dedos en pose de chasquido)
  function mesmerino(x, y, s, o) {
    o = o || {};
    const COAT = "#2b1d3a";
    const brazoDer = o.sinReloj ? `<g class="hp-h-brazo">${brazo("M140 -200 C210 -150 190 -80 100 -70", COAT)}<circle cx="88" cy="-70" r="32" fill="${CREMA}" stroke="${INK}" stroke-width="7"/></g>` : `<g class="hp-h-brazo">
        ${brazo("M140 -200 C220 -200 270 -260 300 -330", COAT)}
        <circle cx="300" cy="-338" r="30" fill="${CREMA}" stroke="${INK}" stroke-width="7"/>
        <g class="hp-h-pendg">${pendulo(300, -330, 230, 62, "hp-h-pend")}</g>
      </g>`;
    const brazoIzq = o.manoAbajo ? `<g class="hp-h-mano">${brazo("M-140 -200 C-200 -160 -230 -80 -230 10", COAT)}<circle cx="-230" cy="22" r="32" fill="${CREMA}" stroke="${INK}" stroke-width="7"/></g>`
      : `<g class="hp-h-mano">
        ${brazo("M-140 -200 C-220 -230 -280 -320 -300 -400", COAT)}
        <g class="hp-h-dedos">
          <path d="M-336 -420 C-345 -470 -320 -500 -300 -480 L-290 -470 C-282 -500 -250 -500 -252 -462 L-262 -400 C-290 -380 -330 -390 -336 -420 Z" fill="${CREMA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M-300 -480 L-296 -540 C-295 -560 -272 -560 -272 -540 L-276 -470" fill="${CREMA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        </g>
      </g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="hp-h">
      <g class="hp-h-capa">
        <path d="M-150 -235 C-270 -150 -320 -20 -340 70 L340 70 C320 -20 270 -150 150 -235 Z" fill="${ROJOC}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-140 -225 C-245 -145 -290 -20 -300 70 L300 70 C290 -20 245 -145 140 -225 Z" fill="${INK}"/>
      </g>
      <!-- cuello alto de la capa -->
      <path d="M-95 -250 L-215 -455 L-60 -330 Z" fill="${ROJOC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M95 -250 L215 -455 L60 -330 Z" fill="${ROJOC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <!-- frac -->
      <path d="M-215 70 C-212 -100 -170 -190 -80 -218 L80 -218 C170 -190 212 -100 215 70 Z" fill="${COAT}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-62 -218 L0 -60 L62 -218 Z" fill="${CREMA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-80 -218 L-10 -40 L-70 70 M80 -218 L10 -40 L70 70" fill="none" stroke="#4a3560" stroke-width="10" stroke-linejoin="round"/>
      <path d="M-44 -196 L0 -178 L44 -196 L44 -150 L0 -168 L-44 -150 Z" fill="${ROJOC}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="0" cy="-172" r="10" fill="${ROJO}" stroke="${INK}" stroke-width="4"/>
      <circle cx="-34" cy="-10" r="10" fill="${ORO}" stroke="${INK}" stroke-width="4"/><circle cx="34" cy="-10" r="10" fill="${ORO}" stroke="${INK}" stroke-width="4"/>
      ${brazoIzq}
      ${brazoDer}
      <path d="M-42 -285 L-48 -214 L48 -214 L42 -285 Z" fill="${PIELD}" stroke="${INK}" stroke-width="7"/>
      <g class="hp-h-cabeza">
        <ellipse cx="-112" cy="-370" rx="22" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-370" rx="22" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-108 -410 C-110 -520 110 -520 108 -410 L104 -330 C96 -262 55 -236 0 -236 C-55 -236 -96 -262 -104 -330 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelo engominado con pico de viuda -->
        <path d="M-114 -392 C-128 -500 -60 -540 0 -538 C60 -540 128 -500 114 -392 C104 -430 80 -462 40 -470 L0 -430 L-40 -470 C-80 -462 -104 -430 -114 -392 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-60 -505 C-30 -520 30 -520 60 -505" fill="none" stroke="#4a3560" stroke-width="6" stroke-linecap="round"/>
        <g class="hp-h-cejas"><path d="M-82 -418 L-26 -398 M82 -418 L26 -398" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g>
        <g class="hp-h-ojos">
          <ellipse cx="-50" cy="-378" rx="22" ry="17" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-46" cy="-378" r="10" fill="${INK}"/><circle cx="-43" cy="-382" r="3" fill="#fff"/>
          <ellipse cx="50" cy="-378" rx="22" ry="17" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="-378" r="10" fill="${INK}"/><circle cx="49" cy="-382" r="3" fill="#fff"/>
        </g>
        <path d="M0 -370 C-6 -340 -14 -326 -4 -318" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <ellipse class="hp-h-boca" cx="0" cy="-268" rx="22" ry="8" fill="${INK}"/>
        <!-- bigote manubrio -->
        <path class="hp-h-bigote" d="M0 -300 C-30 -316 -60 -312 -82 -296 C-102 -282 -122 -290 -126 -312 C-132 -290 -118 -264 -88 -270 C-60 -276 -30 -282 0 -286 C30 -282 60 -276 88 -270 C118 -264 132 -290 126 -312 C122 -290 102 -282 82 -296 C60 -312 30 -316 0 -300 Z" fill="${INK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-14 -250 L0 -222 L14 -250 Z" fill="${INK}"/>
      </g>
    </g></g>`;
  }

  // OSVALDO (dueño de la veterinaria): origen = centro de la base del torso. Cabeza en (0,-360).
  // o.trance: ojos con espirales (.hp-o-esp, cada una gira en su centro: -48 -372 / 48 -372, r 30)
  // o.brazos: "sonambulo" (brazos adelante, manos colgando), "tipea" (manos abajo sobre un teclado), "estira" (brazos arriba)
  // clases: .hp-o .hp-o-cabeza .hp-o-boca .hp-o-manos .hp-o-mi .hp-o-md .hp-o-normales .hp-o-espirales .hp-o-zzz
  function osvaldo(x, y, s, o) {
    o = o || {};
    const CAM = "#e9dcc0", CHA = "#5b3a9e";
    let brazos;
    if (o.brazos === "estira") {
      brazos = `<g class="hp-o-manos"><g class="hp-o-mi">${brazo("M-140 -200 C-210 -280 -230 -400 -210 -520", CAM, 48)}<circle cx="-208" cy="-535" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/></g>
        <g class="hp-o-md">${brazo("M140 -200 C210 -280 230 -400 210 -520", CAM, 48)}<circle cx="208" cy="-535" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/></g></g>`;
    } else if (o.brazos === "tipea") {
      brazos = `<g class="hp-o-manos"><g class="hp-o-mi">${brazo("M-140 -200 C-200 -150 -190 -40 -120 10", CAM, 48)}<ellipse cx="-110" cy="22" rx="36" ry="24" fill="${PIEL}" stroke="${INK}" stroke-width="7"/></g>
        <g class="hp-o-md">${brazo("M140 -200 C200 -150 190 -40 120 10", CAM, 48)}<ellipse cx="110" cy="22" rx="36" ry="24" fill="${PIEL}" stroke="${INK}" stroke-width="7"/></g></g>`;
    } else if (o.brazos === "sonambulo") {
      brazos = `<g class="hp-o-manos"><g class="hp-o-mi">${brazo("M-140 -200 C-210 -230 -250 -260 -270 -300", CAM, 48)}<path d="M-300 -300 C-310 -330 -250 -340 -240 -310 L-236 -260 C-250 -250 -272 -250 -282 -262 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g>
        <g class="hp-o-md">${brazo("M140 -200 C210 -230 250 -260 270 -300", CAM, 48)}<path d="M300 -300 C310 -330 250 -340 240 -310 L236 -260 C250 -250 272 -250 282 -262 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g></g>`;
    } else {
      brazos = `<g class="hp-o-manos"><g class="hp-o-mi">${brazo("M-140 -200 C-190 -150 -205 -60 -200 30", CAM, 48)}</g><g class="hp-o-md">${brazo("M140 -200 C190 -150 205 -60 200 30", CAM, 48)}</g></g>`;
    }
    const esp = (cx) => espiral(cx, -372, 30, "hp-o-esp", { vueltas: 3, fondo: "#fff", tinta: VIO });
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="hp-o">
      <path d="M-210 60 C-208 -100 -168 -185 -80 -212 L80 -212 C168 -185 208 -100 210 60 Z" fill="${CAM}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 60 C-196 -90 -160 -170 -92 -200 L-40 -60 L-40 60 Z M200 60 C196 -90 160 -170 92 -200 L40 -60 L40 60 Z" fill="${CHA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-48 -212 L0 -150 L48 -212" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <!-- escudito de pata en el chaleco -->
      <g transform="translate(-118 -110)"><circle r="26" fill="${ORO}" stroke="${INK}" stroke-width="5"/><ellipse cx="0" cy="6" rx="9" ry="7" fill="${INK}"/><circle cx="-10" cy="-6" r="4" fill="${INK}"/><circle cx="-3" cy="-11" r="4" fill="${INK}"/><circle cx="5" cy="-11" r="4" fill="${INK}"/><circle cx="11" cy="-5" r="4" fill="${INK}"/></g>
      ${brazos}
      <path d="M-42 -278 L-46 -208 L46 -208 L42 -278 Z" fill="${PIELD}" stroke="${INK}" stroke-width="7"/>
      <g class="hp-o-cabeza">
        <ellipse cx="-118" cy="-362" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="118" cy="-362" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-114 -400 C-118 -500 118 -500 114 -400 L110 -330 C104 -256 60 -228 0 -228 C-60 -228 -104 -256 -110 -330 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelo castaño con canas a los costados -->
        <path d="M-118 -380 C-130 -470 -80 -520 0 -518 C80 -520 130 -470 118 -380 C108 -420 90 -440 60 -446 C30 -430 -30 -430 -60 -446 C-90 -440 -108 -420 -118 -380 Z" fill="#6b4a32" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-118 -380 C-120 -405 -116 -425 -106 -440 M118 -380 C120 -405 116 -425 106 -440" fill="none" stroke="#cfc6b8" stroke-width="12" stroke-linecap="round"/>
        <path d="M-80 -414 L-22 -410 M80 -414 L22 -410" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
        <g class="hp-o-normales" ${o.trance ? 'opacity="0"' : ""}>
          <ellipse cx="-48" cy="-372" rx="22" ry="18" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-48" cy="-370" r="10" fill="${INK}"/>
          <ellipse cx="48" cy="-372" rx="22" ry="18" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="48" cy="-370" r="10" fill="${INK}"/>
        </g>
        <g class="hp-o-espirales" ${o.trance ? "" : 'opacity="0"'}>${esp(-48)}${esp(48)}</g>
        <path d="M0 -360 C-8 -330 -16 -316 -4 -308" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-50 -290 C-30 -304 30 -304 50 -290 C40 -280 20 -282 0 -286 C-20 -282 -40 -280 -50 -290 Z" fill="#6b4a32" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <ellipse class="hp-o-boca" cx="0" cy="-262" rx="${o.trance ? 14 : 20}" ry="${o.trance ? 12 : 7}" fill="${INK}"/>
      </g>
    </g></g>`;
  }

  // LA VECINA DEL PÚBLICO: cabeza y hombros sobre una butaca roja. origen = base. Cabeza en (0,-300).
  // clases: .hp-s .hp-s-cabeza .hp-s-boca .hp-s-mano (o.mano: brazo levantado señalando, hombro 110 -150)
  function vecina(x, y, s, o) {
    o = o || {};
    const SACO = "#b8305a";
    const mano = o.mano ? `<g class="hp-s-mano">${brazo("M110 -150 C170 -170 200 -240 210 -320", SACO, 46)}
        <path d="M190 -330 C185 -370 230 -372 232 -336 L232 -320 L196 -316 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M214 -366 L222 -430" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M214 -366 L222 -430" stroke="${PIEL}" stroke-width="18" stroke-linecap="round"/></g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="hp-s">
      <path d="M-200 40 L-200 -150 C-200 -230 200 -230 200 -150 L200 40 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-160 40 C-158 -80 -120 -140 -60 -160 L60 -160 C120 -140 158 -80 160 40 Z" fill="${SACO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-40 -160 L0 -110 L40 -160" fill="${CREMA}" stroke="${INK}" stroke-width="5"/>
      <circle cx="-14" cy="-120" r="7" fill="${ORO}"/><circle cx="14" cy="-120" r="7" fill="${ORO}"/><circle cx="0" cy="-108" r="7" fill="${ORO}"/>
      ${mano}
      <path d="M-30 -214 L-34 -158 L34 -158 L30 -214 Z" fill="${PIELD}" stroke="${INK}" stroke-width="6"/>
      <g class="hp-s-cabeza">
        <!-- rulos -->
        <g fill="#3a2230" stroke="${INK}" stroke-width="6">
          <circle cx="-96" cy="-330" r="44"/><circle cx="96" cy="-330" r="44"/><circle cx="-80" cy="-390" r="46"/><circle cx="80" cy="-390" r="46"/>
          <circle cx="-30" cy="-420" r="48"/><circle cx="30" cy="-420" r="48"/><circle cx="-104" cy="-270" r="34"/><circle cx="104" cy="-270" r="34"/>
        </g>
        <path d="M-86 -330 C-90 -410 90 -410 86 -330 L82 -270 C76 -222 40 -206 0 -206 C-40 -206 -76 -222 -82 -270 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-80 -350 C-50 -390 40 -392 82 -350 C50 -366 -40 -368 -80 -350 Z" fill="#3a2230"/>
        <circle cx="-88" cy="-262" r="14" fill="none" stroke="${ORO}" stroke-width="7"/><circle cx="88" cy="-262" r="14" fill="none" stroke="${ORO}" stroke-width="7"/>
        <!-- ojos cerrados de risa -->
        <path d="M-58 -312 Q-40 -330 -22 -312 M22 -312 Q40 -330 58 -312" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="-56" cy="-282" r="13" fill="${ROJOC}" opacity="0.35"/><circle cx="56" cy="-282" r="13" fill="${ROJOC}" opacity="0.35"/>
        <path class="hp-s-boca" d="M-36 -266 C-30 -222 30 -222 36 -266 Z" fill="#5a0f1e" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-30 -264 L30 -264" stroke="#fff" stroke-width="7"/>
      </g>
    </g></g>`;
  }

  // Siluetas de cabezas del público (fila de platea), de x0 a x1 a la altura y.
  function platea(x0, x1, y, cls) {
    let g = "";
    for (let x = x0, k = 0; x <= x1; x += 120, k++) {
      const yy = y + (k % 2) * 16;
      g += `<g class="hp-cab"><path d="M${x - 70} ${yy + 120} C${x - 66} ${yy + 40} ${x - 40} ${yy + 20} ${x} ${yy + 20} C${x + 40} ${yy + 20} ${x + 66} ${yy + 40} ${x + 70} ${yy + 120} Z" fill="#1e1118"/><circle cx="${x}" cy="${yy - 18}" r="44" fill="#1e1118"/></g>`;
    }
    return `<g class="${cls || "hp-platea"}">${g}</g>`;
  }

  // TECLA de teclado gigante (x, y = esquina sup-izq). clase cls
  function tecla(x, y, w, h, txt, cls, fs) {
    return `<g class="${cls || ""}"><rect x="${x}" y="${y + 14}" width="${w}" height="${h}" rx="22" fill="#8a7a5c" stroke="${INK}" stroke-width="7"/>
      <g class="${cls ? cls + "-top" : ""}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${CREMA}" stroke="${INK}" stroke-width="7"/>
      <text x="${x + w / 2}" y="${y + h / 2 + (fs || 60) * 0.36}" text-anchor="middle" font-family="Luckiest Guy" font-size="${fs || 60}" fill="${INK}">${txt}</text></g></g>`;
  }

  // PLANILLA: grilla de x,y w x h con filas; devuelve también rectángulos de celdas .hp-celda-N (para llenar)
  function planilla(x, y, w, h, filas, cls) {
    const fh = h / (filas + 1);
    let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fbf6ea" stroke="${INK}" stroke-width="7"/>
      <rect x="${x}" y="${y}" width="${w}" height="${fh}" rx="12" fill="${VIO}" stroke="${INK}" stroke-width="7"/>`;
    for (let k = 1; k <= filas; k++) g += `<path d="M${x} ${y + fh * (k + 1)} H${x + w}" stroke="#c9bb98" stroke-width="3"/>`;
    g += `<path d="M${x + w * 0.38} ${y} V${y + h} M${x + w * 0.72} ${y} V${y + h}" stroke="#c9bb98" stroke-width="3"/>`;
    for (let k = 0; k < filas; k++) {
      g += `<g class="hp-celda hp-celda-${k}"><rect x="${x + 18}" y="${y + fh * (k + 1) + fh * 0.32}" width="${w * 0.3}" height="${fh * 0.36}" rx="6" fill="${INK}" opacity="0.75"/>
        <rect x="${x + w * 0.38 + 16}" y="${y + fh * (k + 1) + fh * 0.32}" width="${w * 0.26}" height="${fh * 0.36}" rx="6" fill="${VIO}" opacity="0.75"/>
        <rect x="${x + w * 0.72 + 16}" y="${y + fh * (k + 1) + fh * 0.32}" width="${w * 0.2}" height="${fh * 0.36}" rx="6" fill="${ORO}"/></g>`;
    }
    return `<g class="${cls || "hp-planilla"}">${g}</g>`;
  }

  // CELULAR: marco negro, pantalla crema. clipId para recortar contenido.
  function celular(x, y, w, h, clipId) {
    return `<defs><clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.12}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.12}" fill="#fbf6ea"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.12}" fill="none" stroke="${INK}" stroke-width="16"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 16}" width="${w * 0.26}" height="14" rx="7" fill="${INK}"/>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    // pop para un <g> de SVG alrededor de (cx, cy)
    function popSvg(el, t, cx, cy, d) {
      gsap.set(el, { opacity: 0, svgOrigin: `${cx} ${cy}`, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: 0.5, svgOrigin: `${cx} ${cy}` }, { opacity: 1, scale: 1, svgOrigin: `${cx} ${cy}`, duration: d || 0.35, ease: "back.out(2)", immediateRender: false }, t);
    }
    function golpe(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 2.2, rotation: rot || 0 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08);
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
    // giro suave y continuo (grados por segundo) alrededor de (cx, cy) en coordenadas locales
    function girar(el, cx, cy, t0, dur, gps) {
      gsap.set(el, { svgOrigin: `${cx} ${cy}`, smoothOrigin: false });
      tl.fromTo(el, { rotation: 0, svgOrigin: `${cx} ${cy}` }, { rotation: (gps || 120) * dur, svgOrigin: `${cx} ${cy}`, duration: dur, ease: "none", immediateRender: false }, t0);
    }
    // gira todas las espirales de los ojos de Osvaldo
    function ojosTrance(t0, dur, gps) {
      qa(".hp-o-esp").forEach((e, i) => girar(e, i % 2 ? 48 : -48, -372, t0, dur, gps || 200));
    }
    // vaivén del péndulo alrededor de (ox, oy): amp grados, periodo p (ida y vuelta)
    function vaiven(el, ox, oy, t0, dur, amp, p) {
      gsap.set(el, { svgOrigin: `${ox} ${oy}`, smoothOrigin: false, rotation: -(amp || 18) });
      const n = Math.max(1, Math.floor(dur / ((p || 1.4) / 2)));
      tl.fromTo(el, { rotation: -(amp || 18) }, { rotation: amp || 18, duration: (p || 1.4) / 2, ease: "sine.inOut", yoyo: true, repeat: n - 1, svgOrigin: `${ox} ${oy}`, immediateRender: false }, t0);
    }
    function trance(on, t) {
      tl.to(q(".hp-o-normales"), { opacity: on ? 0 : 1, duration: 0.1 }, t);
      tl.to(q(".hp-o-espirales"), { opacity: on ? 1 : 0, duration: 0.1 }, t);
    }
    function hablar(sel, t, veces, d) {
      tl.fromTo(q(sel), { scaleY: 1 }, { scaleY: 1.9, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, t);
    }
    // balanceo de sonámbulo (todo el cuerpo), suave
    function balanceo(el, cx, cy, t0, dur, amp) {
      gsap.set(el, { svgOrigin: `${cx} ${cy}`, smoothOrigin: false });
      const n = Math.max(1, Math.floor(dur / 0.9));
      tl.fromTo(el, { rotation: -(amp || 2.5) }, { rotation: amp || 2.5, duration: 0.9, yoyo: true, repeat: n - 1, ease: "sine.inOut", svgOrigin: `${cx} ${cy}`, immediateRender: false }, t0);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, golpe, sello, sacudon, dibujar, girar, ojosTrance, vaiven, trance, hablar, balanceo, salida };
  }
  return { INK, ROJO, ROJOC, ORO, OROC, OROD, CREMA, VIO, VIOC, PIEL, VERDE, VERDED, espiral, pendulo, mesmerino, osvaldo, vecina, platea, tecla, planilla, celular, celularBorde, kit };
})();
