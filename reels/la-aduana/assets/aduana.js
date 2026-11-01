// Piezas del reel "la-aduana": la oficial de aduana, Óscar (dueño del bazar), el de enfrente, la valija,
// el mostrador, la cinta, el escáner de rayos X, el pasaporte, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = AD.oficial(x, y, s) + ...
// y en el script: const K = AD.kit(tl, root).
window.AD = window.AD || (function () {
  const INK = "#1b1f24", GRIS = "#d9dde0", GRIS2 = "#aab2b8", GRIS3 = "#5d6870", BLA = "#f4f5f2",
    AMA = "#ffcc00", ROJO = "#e0242f", VERDE = "#1fbf5a", AZUL = "#2f7dff", NAR = "#ff8a1f", XV = "#38d66b",
    PANT = "#0b1622", PIEL = "#f0c8a0", PIEL2 = "#e2ad85", UNI = "#2b3a4f", SCA = "#5ce611";
  if (!document.getElementById("ad-css")) {
    const st = document.createElement("style");
    st.id = "ad-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
.ad-sello { position: absolute; box-sizing: border-box; padding: 12px 34px 4px; border: 10px solid ${ROJO}; border-radius: 16px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(244, 245, 242, 0.88); }
.ad-sello.verde { border-color: ${VERDE}; color: #128a3e; }
.ad-sello.ama { border-color: ${INK}; color: ${INK}; background: ${AMA}; }
.ad-cartel { position: absolute; box-sizing: border-box; padding: 14px 28px 12px; background: ${INK}; border-radius: 10px; color: ${AMA};
  font-family: "Lexend", sans-serif; font-weight: 800; letter-spacing: 0.04em; white-space: nowrap; text-align: center; line-height: 1.05; box-shadow: 7px 7px 0 rgba(27, 31, 36, 0.28); }
.ad-cartel.ama { background: ${AMA}; color: ${INK}; }
.ad-tag { position: absolute; box-sizing: border-box; padding: 10px 24px 8px; background: ${INK}; border-radius: 8px; box-shadow: 6px 6px 0 rgba(27, 31, 36, 0.28);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.14em; color: ${BLA}; white-space: nowrap; text-align: center; }
.ad-tag.rojo { background: ${ROJO}; }
.ad-tag.ama { background: ${AMA}; color: ${INK}; }
.ad-tag.verde { background: ${VERDE}; color: ${INK}; }
.ad-tag.azul { background: ${AZUL}; }
.ad-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${BLA}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
.ad-alerta { position: absolute; box-sizing: border-box; padding: 12px 26px 10px 20px; background: ${ROJO}; border: 5px solid ${INK}; border-radius: 10px;
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: 0.08em; color: ${BLA}; white-space: nowrap; display: flex; align-items: center; gap: 16px; }
.ad-alerta i { display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: ${BLA}; color: ${ROJO}; font-style: normal; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; line-height: 40px; text-align: center; }
.ad-alerta.verde { background: ${VERDE}; color: ${INK}; }
.ad-alerta.verde i { background: ${INK}; color: ${VERDE}; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  const brazoP = (d, col, w) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 14}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;

  // LA OFICIAL: busto, origen = centro de la base del torso. Cabeza en (0,-370).
  // o.brazo: "arriba" (mano derecha levantada en 250,-330) | "frente" (mano en 260,-40) | sin brazo.
  // o.izq: mano izquierda levantada en (-250,-330).
  // clases: .ad-o .ad-o-cabeza .ad-o-lentes .ad-o-cejas .ad-o-boca .ad-o-brazo (hombro 150 -200) .ad-o-izq (hombro -150 -200)
  function oficial(x, y, s, o) {
    o = o || {};
    const mano = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>`;
    const der = o.brazo === "arriba" ? `<g class="ad-o-brazo">${brazoP("M150 -200 C220 -210 250 -260 250 -320", UNI, 54)}${mano(250, -330)}</g>`
      : o.brazo === "frente" ? `<g class="ad-o-brazo">${brazoP("M150 -200 C210 -170 250 -110 260 -50", UNI, 54)}${mano(262, -44)}</g>` : "";
    const izq = o.izq ? `<g class="ad-o-izq">${brazoP("M-150 -200 C-220 -210 -250 -260 -250 -320", UNI, 54)}${mano(-250, -330)}</g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ad-o">
      <path d="M-235 40 C-230 -110 -175 -195 -80 -218 L80 -218 C175 -195 230 -110 235 40 Z" fill="${UNI}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -218 L0 -120 L60 -218 Z" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-12 -190 L12 -190 L18 -95 L0 -78 L-18 -95 Z" fill="${INK}"/>
      <path d="M-80 -218 L-25 -90 M80 -218 L25 -90" fill="none" stroke="${INK}" stroke-width="6"/>
      <!-- charreteras y escudo amarillo -->
      <rect x="-215" y="-198" width="90" height="26" rx="8" fill="${AMA}" stroke="${INK}" stroke-width="5" transform="rotate(14 -170 -185)"/>
      <rect x="125" y="-198" width="90" height="26" rx="8" fill="${AMA}" stroke="${INK}" stroke-width="5" transform="rotate(-14 170 -185)"/>
      <path d="M-150 -130 L-100 -130 L-100 -90 C-100 -70 -125 -60 -125 -60 C-125 -60 -150 -70 -150 -90 Z" fill="${AMA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <rect x="85" y="-140" width="90" height="34" rx="5" fill="${BLA}" stroke="${INK}" stroke-width="5"/>
      <path d="M97 -123 H163" stroke="${INK}" stroke-width="6"/>
      ${der}${izq}
      <path d="M-42 -290 L-46 -210 L46 -210 L42 -290 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="ad-o-cabeza">
        <!-- rodete atrás -->
        <circle cx="0" cy="-470" r="58" fill="#3a2a22" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="-110" cy="-365" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="110" cy="-365" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-106 -400 C-110 -510 110 -510 106 -400 L102 -320 C95 -255 52 -232 0 -232 C-52 -232 -95 -255 -102 -320 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelo tirante -->
        <path d="M-108 -380 C-118 -470 -60 -500 0 -498 C60 -500 118 -470 108 -380 C95 -430 50 -448 0 -448 C-50 -448 -95 -430 -108 -380 Z" fill="#3a2a22" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <!-- gorra de plato -->
        <g class="ad-o-gorra">
          <path d="M-140 -470 C-150 -540 150 -540 140 -470 Z" fill="${UNI}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
          <rect x="-122" y="-478" width="244" height="32" rx="6" fill="${AMA}" stroke="${INK}" stroke-width="6"/>
          <path d="M-125 -448 C-60 -420 60 -420 125 -448 L118 -436 C60 -410 -60 -410 -118 -436 Z" fill="${INK}"/>
          <circle cx="0" cy="-500" r="18" fill="${AMA}" stroke="${INK}" stroke-width="5"/>
        </g>
        <path class="ad-o-cejas" d="M-82 -392 L-28 -380 M82 -392 L28 -380" stroke="#3a2a22" stroke-width="12" stroke-linecap="round"/>
        <g class="ad-o-ojos"><path d="M-70 -358 L-30 -358 M70 -358 L30 -358" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="-48" cy="-356" r="8" fill="${INK}"/><circle cx="48" cy="-356" r="8" fill="${INK}"/></g>
        <g class="ad-o-lentes">
          <rect x="-92" y="-385" width="78" height="52" rx="10" fill="${BLA}" fill-opacity="0.25" stroke="${INK}" stroke-width="7"/>
          <rect x="14" y="-385" width="78" height="52" rx="10" fill="${BLA}" fill-opacity="0.25" stroke="${INK}" stroke-width="7"/>
          <path d="M-14 -364 H14 M-92 -368 L-108 -372 M92 -368 L108 -372" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <path d="M0 -345 C-8 -318 -14 -305 2 -300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path class="ad-o-boca" d="M-30 -268 H30" fill="none" stroke="${ROJO}" stroke-width="9" stroke-linecap="round"/>
      </g>
    </g></g>`;
  }

  // ÓSCAR: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.manos: las dos manos arriba (inocente) · o.cel: celular en la mano derecha (pantalla en 70,-390 a 190,-170 local)
  // clases: .ad-d .ad-d-cabeza .ad-d-cejas .ad-d-sonrisa (risita) .ad-d-grito (boca abierta) .ad-d-seria .ad-d-gotas .ad-d-manos .ad-d-cel
  function oscar(x, y, s, o) {
    o = o || {};
    const boca = o.boca || "sonrisa";
    const manos = o.manos ? `<g class="ad-d-manos">
        ${brazoP("M-150 -190 C-230 -200 -260 -260 -255 -330", "#c8443c", 56)}
        ${brazoP("M150 -190 C230 -200 260 -260 255 -330", "#c8443c", 56)}
        <path d="M-290 -340 C-298 -410 -210 -415 -218 -340 L-218 -320 L-290 -320 Z M218 -340 C210 -415 298 -410 290 -340 L290 -320 L218 -320 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      </g>` : "";
    const cel = o.cel ? `<g class="ad-d-cel">
        ${brazoP("M150 -190 C200 -170 225 -140 235 -170", "#c8443c", 56)}
        <rect x="140" y="-480" width="190" height="340" rx="26" fill="${INK}"/>
        <rect x="152" y="-466" width="166" height="300" rx="16" fill="${BLA}"/>
        <circle cx="236" cy="-182" r="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ad-d">
      <path d="M-215 40 C-210 -115 -150 -195 -65 -215 L65 -215 C150 -195 210 -115 215 40 Z" fill="#c8443c" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-62 -215 L-30 -150 L0 -200 L30 -150 L62 -215" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="0" cy="-130" r="7" fill="${INK}"/><circle cx="0" cy="-90" r="7" fill="${INK}"/>
      <!-- mancha de transpiración -->
      <ellipse class="ad-d-mancha" cx="-150" cy="-90" rx="34" ry="40" fill="#a3362f" opacity="0"/>
      ${manos}
      <path d="M-42 -275 L-46 -205 L46 -205 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="ad-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -500 114 -500 110 -390 L105 -305 C98 -245 52 -222 0 -222 C-52 -222 -98 -245 -105 -305 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelado con costados grises y tres pelos peinados -->
        <path d="M-112 -405 C-132 -390 -130 -335 -110 -318 L-98 -318 L-98 -410 Z M112 -405 C132 -390 130 -335 110 -318 L98 -318 L98 -410 Z" fill="#c9cfd3" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-80 -440 C-30 -475 40 -470 85 -430 M-70 -425 C-20 -458 40 -452 80 -418" fill="none" stroke="#7d868c" stroke-width="7" stroke-linecap="round"/>
        <path class="ad-d-cejas" d="M-78 -378 L-30 -392 M78 -378 L30 -392" stroke="#7d868c" stroke-width="12" stroke-linecap="round"/>
        <g class="ad-d-ojos">
          <ellipse cx="-48" cy="-350" rx="19" ry="23" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="-44" cy="-348" r="9" fill="${INK}"/>
          <ellipse cx="48" cy="-350" rx="19" ry="23" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="52" cy="-348" r="9" fill="${INK}"/>
        </g>
        <path d="M0 -340 C-10 -312 -16 -300 2 -295" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- bigotito -->
        <path d="M-46 -282 C-30 -298 -10 -294 0 -286 C10 -294 30 -298 46 -282 C30 -276 12 -278 0 -282 C-12 -278 -30 -276 -46 -282 Z" fill="#7d868c" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <g class="ad-d-sonrisa" ${boca === "sonrisa" ? "" : 'opacity="0"'}><path d="M-40 -262 Q0 -232 40 -262 Z" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-20 -258 V-247 M0 -256 V-242 M20 -258 V-247" stroke="${INK}" stroke-width="4"/></g>
        <g class="ad-d-grito" ${boca === "grito" ? "" : 'opacity="0"'}><ellipse cx="0" cy="-250" rx="30" ry="24" fill="${INK}"/><ellipse cx="0" cy="-240" rx="16" ry="9" fill="${ROJO}"/></g>
        <g class="ad-d-seria" ${boca === "seria" ? "" : 'opacity="0"'}><path d="M-28 -252 Q0 -266 28 -252" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>
        <g class="ad-d-gotas" opacity="${o.gotas ? 1 : 0}">
          <path d="M-135 -440 C-150 -412 -150 -398 -135 -396 C-120 -398 -120 -412 -135 -440 Z" fill="#7ec8ff" stroke="${INK}" stroke-width="5"/>
          <path d="M128 -420 C113 -392 113 -378 128 -376 C143 -378 143 -392 128 -420 Z" fill="#7ec8ff" stroke="${INK}" stroke-width="5"/>
          <path d="M100 -470 C90 -452 90 -442 100 -440 C110 -442 110 -452 100 -470 Z" fill="#7ec8ff" stroke="${INK}" stroke-width="4"/>
        </g>
      </g>
      ${cel}
    </g></g>`;
  }

  // EL DE ENFRENTE: busto canchero con lentes de sol. Origen = base del torso, cabeza en (0,-350).
  // o.pulgar: pulgar arriba a la derecha. clases: .ad-e .ad-e-cabeza .ad-e-pulgar .ad-e-lentes
  function enfrente(x, y, s, o) {
    o = o || {};
    const pulgar = o.pulgar ? `<g class="ad-e-pulgar">${brazoP("M150 -190 C220 -200 250 -250 250 -300", AZUL, 56)}
        <rect x="215" y="-345" width="72" height="62" rx="18" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <rect x="230" y="-405" width="28" height="70" rx="14" fill="${PIEL}" stroke="${INK}" stroke-width="7"/></g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ad-e">
      <path d="M-215 40 C-210 -115 -150 -195 -65 -215 L65 -215 C150 -195 210 -115 215 40 Z" fill="${AZUL}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -215 L-60 40 L60 40 L70 -215 Q0 -170 -70 -215 Z" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-70 -215 L-95 -60 L-60 40 M70 -215 L95 -60 L60 40" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      ${pulgar}
      <path d="M-42 -275 L-46 -205 L46 -205 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="ad-e-cabeza">
        <ellipse cx="-108" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="108" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-105 -390 C-108 -490 108 -490 105 -390 L100 -305 C94 -245 50 -222 0 -222 C-50 -222 -94 -245 -100 -305 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- jopo -->
        <path d="M-108 -380 C-130 -470 -60 -540 20 -530 C90 -540 140 -480 108 -380 C100 -420 80 -440 50 -446 C10 -440 -40 -445 -70 -430 C-90 -420 -100 -400 -108 -380 Z" fill="#2a1d16" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <g class="ad-e-lentes">
          <path d="M-98 -372 H-10 L-18 -330 C-24 -312 -80 -312 -90 -330 Z M98 -372 H10 L18 -330 C24 -312 80 -312 90 -330 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M-10 -366 H10" stroke="${INK}" stroke-width="7"/>
          <path d="M-78 -360 L-56 -360 M30 -360 L52 -360" stroke="${AZUL}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <path d="M0 -320 C-8 -298 -14 -288 2 -284" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path class="ad-e-boca" d="M-40 -262 C-15 -238 25 -238 46 -270" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      </g>
    </g></g>`;
  }

  // VALIJA: rectángulo con manija y rueditas. (x,y) = esquina sup izq del cuerpo.
  // o.abierta: tapa levantada (.ad-v-tapa, gira con svgOrigin en la bisagra x, y). o.etiqueta: texto de la etiqueta amarilla. o.color.
  function valija(x, y, w, h, o) {
    o = o || {};
    const col = o.color || GRIS3;
    const tapa = o.abierta
      ? `<g class="ad-v-tapa"><path d="M${x} ${y} L${x + 30} ${y - h * 0.7} L${x + w - 30} ${y - h * 0.7} L${x + w} ${y} Z" fill="${col}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
         <path d="M${x + 40} ${y - h * 0.35} H${x + w - 40}" stroke="${INK}" stroke-width="5" opacity="0.5"/></g>`
      : "";
    return `<g class="ad-v">
      ${tapa}
      <path d="M${x + w / 2 - 70} ${y + 4} V${y - 40} Q${x + w / 2 - 70} ${y - 60} ${x + w / 2 - 50} ${y - 60} H${x + w / 2 + 50} Q${x + w / 2 + 70} ${y - 60} ${x + w / 2 + 70} ${y - 40} V${y + 4}" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round" ${o.abierta ? 'opacity="0"' : ""}/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${col}" stroke="${INK}" stroke-width="8"/>
      ${o.abierta ? `<rect x="${x + 16}" y="${y + 6}" width="${w - 32}" height="${h * 0.4}" rx="12" fill="#3d454d"/>` : `<path d="M${x + 10} ${y + h * 0.18} H${x + w - 10}" stroke="${INK}" stroke-width="6"/>`}
      <path d="M${x + w * 0.25} ${y + h * 0.25} V${y + h - 16} M${x + w * 0.75} ${y + h * 0.25} V${y + h - 16}" stroke="${INK}" stroke-width="6" opacity="0.45"/>
      <circle cx="${x + 50}" cy="${y + h + 20}" r="20" fill="${INK}"/><circle cx="${x + w - 50}" cy="${y + h + 20}" r="20" fill="${INK}"/>
      ${o.etiqueta ? `<g class="ad-v-etiqueta"><path d="M${x + w - 70} ${y + 20} L${x + w - 40} ${y + 70}" stroke="${INK}" stroke-width="5"/>
        <rect x="${x + w - 150}" y="${y + 66}" width="210" height="64" rx="8" fill="${AMA}" stroke="${INK}" stroke-width="6" transform="rotate(8 ${x + w - 45} ${y + 98})"/>
        <text x="${x + w - 45}" y="${y + 110}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="24" fill="${INK}" transform="rotate(8 ${x + w - 45} ${y + 98})">${o.etiqueta}</text></g>` : ""}
    </g>`;
  }

  // MOSTRADOR de aduana: frente gris con banda amarilla y negra. Tapa en y, de x1 a x2, alto hasta yb.
  function mostrador(x1, x2, y, yb, o) {
    o = o || {};
    let rayas = "";
    for (let xx = x1 - 40; xx < x2; xx += 56) rayas += `<path d="M${xx} ${y + 70} L${xx + 28} ${y + 40} L${xx + 56} ${y + 40} L${xx + 28} ${y + 70} Z" fill="${INK}"/>`;
    return `<g class="ad-mostrador">
      <defs><clipPath id="ad-mclip-${x1}-${y}"><rect x="${x1}" y="${y + 40}" width="${x2 - x1}" height="30"/></clipPath></defs>
      <rect x="${x1}" y="${y + 20}" width="${x2 - x1}" height="${yb - y - 20}" fill="${GRIS2}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x1}" y="${y + 40}" width="${x2 - x1}" height="30" fill="${AMA}"/>
      <g clip-path="url(#ad-mclip-${x1}-${y})">${rayas}</g>
      <path d="M${x1} ${y + 40} H${x2} M${x1} ${y + 70} H${x2}" stroke="${INK}" stroke-width="6"/>
      ${o.texto ? `<text x="${(x1 + x2) / 2}" y="${y + 150}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="46" letter-spacing="6" fill="${INK}">${o.texto}</text>` : ""}
      <rect x="${x1 - 20}" y="${y}" width="${x2 - x1 + 40}" height="30" rx="8" fill="${GRIS}" stroke="${INK}" stroke-width="8"/>
    </g>`;
  }

  // CINTA transportadora: rodillos en y, de x1 a x2. .ad-c-rod (rayitas que corren)
  function cinta(x1, x2, y) {
    let rod = "";
    for (let xx = x1 + 30; xx < x2 - 10; xx += 60) rod += `<path d="M${xx} ${y + 8} V${y + 34}" stroke="${GRIS3}" stroke-width="6" stroke-linecap="round"/>`;
    return `<g class="ad-cinta">
      <rect x="${x1}" y="${y}" width="${x2 - x1}" height="42" rx="21" fill="#2e353c" stroke="${INK}" stroke-width="7"/>
      <g class="ad-c-rod">${rod}</g>
      <rect x="${x1 + 30}" y="${y + 42}" width="24" height="120" fill="${GRIS3}" stroke="${INK}" stroke-width="6"/>
      <rect x="${x2 - 54}" y="${y + 42}" width="24" height="120" fill="${GRIS3}" stroke="${INK}" stroke-width="6"/>
    </g>`;
  }

  // PANTALLA de rayos X: marco y fondo; contenido aparte con clipPath id.
  function pantalla(x, y, w, h, id, titulo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath></defs>
      <g class="ad-pant">
        <rect x="${x - 26}" y="${y - 60}" width="${w + 52}" height="${h + 86}" rx="22" fill="#38414a" stroke="${INK}" stroke-width="8"/>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PANT}"/>
        <text x="${x + 6}" y="${y - 18}" font-family="IBM Plex Mono" font-weight="600" font-size="28" letter-spacing="4" fill="${AMA}">${titulo || "RAYOS X · LÍNEA 3"}</text>
        <circle class="ad-pant-led" cx="${x + w - 14}" cy="${y - 28}" r="11" fill="${ROJO}"/>
      </g>`;
  }

  // PASAPORTE: tapa (x,y,w,h). o.color, o.titulo (arriba), o.sub (abajo)
  function pasaporte(x, y, w, h, o) {
    o = o || {};
    const col = o.color || "#7a1f2b";
    const cx = x + w / 2, cy = y + h * 0.47;
    return `<g class="ad-pas">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${col}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" rx="10" fill="none" stroke="${AMA}" stroke-width="3" opacity="0.7"/>
      <text x="${cx}" y="${y + h * 0.17}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${w * 0.1}" letter-spacing="${w * 0.02}" fill="${AMA}">${o.titulo || "PASAPORTE"}</text>
      <circle cx="${cx}" cy="${cy}" r="${w * 0.2}" fill="none" stroke="${AMA}" stroke-width="6"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${w * 0.09}" ry="${w * 0.2}" fill="none" stroke="${AMA}" stroke-width="5"/>
      <path d="M${cx - w * 0.2} ${cy} H${cx + w * 0.2} M${cx - w * 0.17} ${cy - w * 0.1} H${cx + w * 0.17} M${cx - w * 0.17} ${cy + w * 0.1} H${cx + w * 0.17}" stroke="${AMA}" stroke-width="4"/>
      ${o.sub ? `<text x="${cx}" y="${y + h * 0.84}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${w * 0.07}" letter-spacing="${w * 0.012}" fill="${AMA}">${o.sub}</text>` : ""}
    </g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    // pop para grupos SVG (con svgOrigin)
    function popS(el, t, o, d) {
      gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: 0.6, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: d || 0.35, ease: "back.out(1.8)", immediateRender: false }, t);
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
    // gotas de transpiración que caen y vuelven (Óscar)
    function transpira(t, veces) {
      const g = q(".ad-d-gotas");
      if (!g) return;
      tl.set(g, { opacity: 1 }, t);
      tl.fromTo(g, { y: -10 }, { y: 18, duration: 0.45, ease: "power1.in", repeat: (veces || 2) - 1, immediateRender: false }, t);
    }
    function boca(t, cual) {
      ["sonrisa", "grito", "seria"].forEach((b) => { const el = q(".ad-d-" + b); if (el) tl.set(el, { opacity: b === cual ? 1 : 0 }, t); });
    }
    function hablar(sel, t, veces, d) {
      tl.fromTo(q(sel), { scaleY: 1 }, { scaleY: 1.8, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popS, sello, sacudon, dibujar, transpira, boca, hablar, salida };
  }
  return { INK, GRIS, GRIS2, GRIS3, BLA, AMA, ROJO, VERDE, AZUL, NAR, XV, PANT, PIEL, PIEL2, UNI, SCA, oficial, oscar, enfrente, valija, mostrador, cinta, pantalla, pasaporte, kit };
})();
