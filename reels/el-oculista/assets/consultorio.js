// Piezas del reel "el-oculista": el oculista, Martín, Don Carmelo, la carta de agudeza visual,
// el celular, el foróptero, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = OC.oculista(x, y, s) + ...
// y en el script: const K = OC.kit(tl, root).
window.OC = window.OC || (function () {
  const INK = "#16324a", ROJO = "#e63946", CEL = "#bfe0ec", BLA = "#f6fafc", MOS = "#f2b134", PIEL = "#f0c8a0", VERDE = "#5ce611";
  if (!document.getElementById("oc-css")) {
    const st = document.createElement("style");
    st.id = "oc-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.oc-sello { position: absolute; box-sizing: border-box; padding: 10px 30px 4px; border: 9px solid ${ROJO}; border-radius: 14px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(246, 250, 252, 0.9); }
.oc-sello.celeste { border-color: #2c5a7a; color: #2c5a7a; }
.oc-sello.verde { border-color: #3f9e0b; color: #3f9e0b; }
.oc-sello.mostaza { border-color: #c98a12; color: #c98a12; }
.oc-tag { position: absolute; box-sizing: border-box; padding: 10px 24px 8px; background: ${INK}; border-radius: 8px; box-shadow: 6px 6px 0 rgba(22, 50, 74, 0.3);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.16em; color: ${BLA}; white-space: nowrap; text-align: center; }
.oc-tag.rojo { background: ${ROJO}; }
.oc-tag.verde { background: #3f9e0b; }
.oc-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${BLA}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;

  // EL OCULISTA: origen = centro de la base del torso. Cabeza en (0,-360).
  // clases: .oc-o (todo) .oc-o-cabeza .oc-o-lentes .oc-o-espejo .oc-o-brillo .oc-o-brazo (hombro 150 -200) .oc-o-mano (mano izq levantada)
  function oculista(x, y, s, o) {
    o = o || {};
    const brazo = o.sinPuntero ? "" : `<g class="oc-o-brazo">
        <path d="M150 -200 C210 -170 250 -120 270 -60" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M150 -200 C210 -170 250 -120 270 -60" fill="none" stroke="${BLA}" stroke-width="52" stroke-linecap="round"/>
        <circle cx="272" cy="-56" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M280 -70 L420 -330" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="420" cy="-330" r="11" fill="${ROJO}" stroke="${INK}" stroke-width="5"/>
      </g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="oc-o">
      <!-- guardapolvo -->
      <path d="M-230 40 C-225 -110 -170 -190 -80 -215 L80 -215 C170 -190 225 -110 230 40 Z" fill="${BLA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-55 -215 L0 -120 L55 -215 Z" fill="${CEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-14 -180 L14 -180 L22 -60 L0 -36 L-22 -60 Z" fill="${INK}"/>
      <path d="M-80 -215 L-20 -60 L-60 40 M80 -215 L20 -60 L60 40" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <rect x="95" y="-150" width="70" height="56" rx="6" fill="${BLA}" stroke="${INK}" stroke-width="5"/>
      <path d="M112 -168 V-120 M132 -172 V-122" stroke="${ROJO}" stroke-width="7" stroke-linecap="round"/>
      <path d="M140 -168 V-122" stroke="#2c5a7a" stroke-width="7" stroke-linecap="round"/>
      ${o.mano ? `<g class="oc-o-mano"><path d="M-150 -200 C-210 -230 -240 -300 -240 -380" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/><path d="M-150 -200 C-210 -230 -240 -300 -240 -380" fill="none" stroke="${BLA}" stroke-width="52" stroke-linecap="round"/><path d="M-275 -390 C-280 -450 -200 -455 -205 -390 L-205 -370 L-275 -370 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M-258 -440 V-400 M-240 -446 V-402 M-222 -440 V-400" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>` : ""}
      ${brazo}
      <!-- cuello -->
      <path d="M-45 -280 L-50 -205 L50 -205 L45 -280 Z" fill="#e8b48c" stroke="${INK}" stroke-width="7"/>
      <g class="oc-o-cabeza">
        <!-- orejas -->
        <ellipse cx="-118" cy="-360" rx="24" ry="36" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="118" cy="-360" rx="24" ry="36" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <!-- cara: pelado -->
        <path d="M-112 -400 C-115 -520 115 -520 112 -400 L108 -320 C100 -250 55 -225 0 -225 C-55 -225 -100 -250 -108 -320 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- costados grises -->
        <path d="M-114 -420 C-135 -400 -132 -350 -112 -330 L-100 -330 L-100 -420 Z M114 -420 C135 -400 132 -350 112 -330 L100 -330 L100 -420 Z" fill="#c9d3d8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <!-- brillo de la pelada -->
        <path d="M-50 -485 Q-10 -500 30 -490" fill="none" stroke="${BLA}" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
        <!-- cejas -->
        <path class="oc-o-cejas" d="M-80 -398 L-30 -392 M80 -398 L30 -392" stroke="#8c979e" stroke-width="12" stroke-linecap="round"/>
        <!-- ojos -->
        <g class="oc-o-ojos"><circle cx="-52" cy="-365" r="9" fill="${INK}"/><circle cx="52" cy="-365" r="9" fill="${INK}"/></g>
        <!-- nariz -->
        <path d="M0 -360 C-10 -330 -18 -315 -2 -308" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- bigote gris -->
        <path d="M-62 -290 C-40 -315 -12 -308 0 -298 C12 -308 40 -315 62 -290 C40 -280 15 -282 0 -288 C-15 -282 -40 -280 -62 -290 Z" fill="#c9d3d8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path class="oc-o-boca" d="M-22 -262 Q0 -258 22 -262" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- anteojos redondos -->
        <g class="oc-o-lentes">
          <circle cx="-52" cy="-365" r="36" fill="${CEL}" fill-opacity="0.35" stroke="${INK}" stroke-width="7"/>
          <circle cx="52" cy="-365" r="36" fill="${CEL}" fill-opacity="0.35" stroke="${INK}" stroke-width="7"/>
          <path d="M-16 -368 Q0 -378 16 -368 M-88 -370 L-114 -380 M88 -370 L114 -380" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
          <path d="M-70 -385 L-56 -395 M34 -385 L48 -395" stroke="${BLA}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <!-- vincha y espejo frontal -->
        <path d="M-112 -440 Q0 -470 112 -440" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <g class="oc-o-espejo">
          <circle cx="0" cy="-470" r="50" fill="#dceef5" stroke="${INK}" stroke-width="8"/>
          <circle cx="0" cy="-470" r="12" fill="${INK}"/>
          <path class="oc-o-brillo" d="M-28 -492 Q-10 -508 10 -505" fill="none" stroke="${BLA}" stroke-width="9" stroke-linecap="round"/>
        </g>
      </g>
    </g></g>`;
  }

  // MARTÍN: busto, origen = centro de la base del torso. Cabeza en (0,-340).
  // clases: .oc-m .oc-m-cabeza .oc-m-abiertos .oc-m-squint .oc-m-cejas .oc-m-boca .oc-m-barba
  function martin(x, y, s, o) {
    o = o || {};
    const cel = o.celular ? `<g class="oc-m-cel">
        <path d="M120 -40 C150 -120 140 -200 110 -260" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M120 -40 C150 -120 140 -200 110 -260" fill="none" stroke="${ROJO}" stroke-width="48" stroke-linecap="round"/>
        <rect x="40" y="-380" width="76" height="130" rx="14" fill="${INK}"/>
        <rect x="48" y="-370" width="60" height="108" rx="8" fill="${BLA}"/>
        <circle cx="104" cy="-262" r="28" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s)}"><g class="oc-m">
      <path d="M-200 30 C-195 -120 -130 -200 -60 -215 L60 -215 C130 -200 195 -120 200 30 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -215 Q0 -170 60 -215" fill="none" stroke="${INK}" stroke-width="7"/>
      <path d="M-30 -195 L-36 -120 M30 -195 L36 -120" stroke="${BLA}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-40 -265 L-44 -205 L44 -205 L40 -265 Z" fill="#e8b48c" stroke="${INK}" stroke-width="7"/>
      <g class="oc-m-cabeza">
        <ellipse cx="-108" cy="-340" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="108" cy="-340" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-105 -380 C-108 -480 108 -480 105 -380 L100 -300 C95 -240 50 -215 0 -215 C-50 -215 -95 -240 -100 -300 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <g class="oc-m-barba" opacity="0">
          <path d="M-100 -320 C-95 -240 -50 -212 0 -212 C50 -212 95 -240 100 -320 C80 -280 50 -270 0 -272 C-50 -270 -80 -280 -100 -320 Z" fill="#5a3a28" stroke="${INK}" stroke-width="6"/>
        </g>
        <!-- pelo despeinado -->
        <path d="M-112 -360 C-140 -440 -90 -500 -30 -490 C-10 -530 60 -520 70 -490 C120 -500 150 -440 112 -360 C100 -400 70 -420 40 -430 C10 -410 -30 -420 -50 -440 C-70 -420 -95 -400 -112 -360 Z" fill="#5a3a28" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path class="oc-m-cejas" d="M-75 -378 L-28 -388 M75 -378 L28 -388" stroke="#5a3a28" stroke-width="12" stroke-linecap="round"/>
        <g class="oc-m-abiertos" ${o.squint ? 'opacity="0"' : ""}>
          <ellipse cx="-48" cy="-345" rx="20" ry="24" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="-46" cy="-343" r="10" fill="${INK}"/>
          <ellipse cx="48" cy="-345" rx="20" ry="24" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="-343" r="10" fill="${INK}"/>
        </g>
        <g class="oc-m-squint" ${o.squint ? "" : 'opacity="0"'}>
          <path d="M-72 -342 L-26 -348 M-70 -356 L-30 -344 M72 -342 L26 -348 M70 -356 L30 -344" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
        </g>
        <path d="M0 -335 C-8 -310 -14 -300 2 -295" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path class="oc-m-boca" d="M-30 -258 Q0 -278 30 -258" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      </g>
      ${cel}
    </g></g>`;
  }

  // DON CARMELO: origen = centro de la base del torso. Cabeza en (0,-370).
  // clases: .oc-c .oc-c-cabeza .oc-c-cejas .oc-c-brazo (hombro -160 -200) .oc-c-boca
  function carmelo(x, y, s) {
    return `<g transform="${T(x, y, s)}"><g class="oc-c">
      <path d="M-260 40 C-260 -120 -190 -210 -80 -225 L80 -225 C190 -210 260 -120 260 40 Z" fill="${MOS}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-150 40 L-140 -150 Q0 -120 140 -150 L150 40 Z" fill="${BLA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-140 -150 L-80 -225 M140 -150 L80 -225" stroke="${INK}" stroke-width="7"/>
      <path d="M40 -70 C60 -90 90 -80 85 -55 C100 -40 80 -15 60 -25 C45 -5 20 -20 30 -40 C10 -50 25 -75 40 -70 Z" fill="${ROJO}" opacity="0.85"/>
      <g class="oc-c-brazo">
        <path d="M-180 -190 C-250 -230 -280 -300 -280 -400" fill="none" stroke="${INK}" stroke-width="76" stroke-linecap="round"/>
        <path d="M-180 -190 C-250 -230 -280 -300 -280 -400" fill="none" stroke="${MOS}" stroke-width="62" stroke-linecap="round"/>
        <path d="M-322 -410 C-330 -480 -230 -485 -238 -410 L-238 -385 L-322 -385 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-302 -462 V-418 M-280 -468 V-420 M-258 -462 V-418" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      </g>
      <path d="M-50 -295 L-55 -215 L55 -215 L50 -295 Z" fill="#e8b48c" stroke="${INK}" stroke-width="7"/>
      <g class="oc-c-cabeza">
        <ellipse cx="-128" cy="-370" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="128" cy="-370" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-125 -410 C-128 -520 128 -520 125 -410 L120 -330 C112 -260 60 -235 0 -235 C-60 -235 -112 -260 -120 -330 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- mejillas -->
        <circle cx="-75" cy="-320" r="22" fill="${ROJO}" opacity="0.3"/><circle cx="75" cy="-320" r="22" fill="${ROJO}" opacity="0.3"/>
        <!-- gorro de pizzero -->
        <path d="M-120 -440 C-170 -470 -160 -560 -90 -555 C-70 -610 70 -610 90 -555 C160 -560 170 -470 120 -440 Z" fill="${BLA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <rect x="-122" y="-455" width="244" height="44" rx="10" fill="${BLA}" stroke="${INK}" stroke-width="7"/>
        <path class="oc-c-cejas" d="M-90 -400 L-35 -385 M90 -400 L35 -385" stroke="#222" stroke-width="15" stroke-linecap="round"/>
        <circle cx="-55" cy="-360" r="11" fill="${INK}"/><circle cx="55" cy="-360" r="11" fill="${INK}"/>
        <path d="M0 -355 C-14 -320 -20 -310 0 -302" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <!-- bigote negro enorme -->
        <path d="M-110 -268 C-80 -320 -25 -312 0 -295 C25 -312 80 -320 110 -268 C80 -282 40 -275 0 -280 C-40 -275 -80 -282 -110 -268 Z" fill="#222" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <ellipse class="oc-c-boca" cx="0" cy="-258" rx="26" ry="16" fill="${INK}"/>
      </g>
    </g></g>`;
  }

  // CARTA DE AGUDEZA: tablero blanco con filas. filas = [[texto, tamaño, clase?], ...]; rojaTras = índice tras el que va la línea roja
  function carta(x, y, w, h, filas, rojaTras) {
    let yy = y + 30, out = "";
    filas.forEach(([t, sz, cl], i) => {
      yy += sz * 1.0 + 16;
      out += `<text class="oc-fila oc-fila${i} ${cl || ""}" x="${x + w / 2}" y="${yy}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${sz}" letter-spacing="${Math.max(2, sz * 0.12)}" fill="${INK}">${t}</text>`;
      if (i === rojaTras) { yy += 18; out += `<path class="oc-roja" d="M${x + 50} ${yy} H${x + w - 50}" stroke="${ROJO}" stroke-width="7" stroke-linecap="round"/>`; yy += 6; }
    });
    return `<g class="oc-carta">
      <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="14" fill="${INK}"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${BLA}"/>
      ${out}
    </g>`;
  }

  // CELULAR: marco azul tinta, pantalla blanca. Devuelve el marco; el contenido va aparte (clipPath id)
  function celular(x, y, w, h, id) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34"/></clipPath></defs>
      <g class="oc-cel">
        <rect x="${x - 20}" y="${y - 20}" width="${w + 40}" height="${h + 40}" rx="54" fill="${INK}"/>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${BLA}"/>
      </g>`;
  }
  function celularBorde(x, y, w, h) {
    return `<g class="oc-cel-borde"><rect x="${x - 13}" y="${y - 13}" width="${w + 26}" height="${h + 26}" rx="46" fill="none" stroke="${INK}" stroke-width="14"/>
      <rect x="${x + w / 2 - 60}" y="${y + 10}" width="120" height="28" rx="14" fill="${INK}"/></g>`;
  }

  // FORÓPTERO: cuerpo de antifaz con dos ventanas, perillas con muescas. Ventanas en (±dx, 0).
  // clases: .oc-f-dial (cada perilla, girar con svgOrigin en su centro, data-cx/cy) .oc-f-lente
  function foroptero(x, y, s) {
    const dial = (cx, cy, r, i) => `<g class="oc-f-dial oc-f-dial${i}" data-cx="${cx}" data-cy="${cy}">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2c5a7a" stroke="${INK}" stroke-width="7"/>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const rad = a * Math.PI / 180; return `<path d="M${cx + Math.cos(rad) * r * 0.55} ${cy + Math.sin(rad) * r * 0.55} L${cx + Math.cos(rad) * r * 0.85} ${cy + Math.sin(rad) * r * 0.85}" stroke="${BLA}" stroke-width="5" stroke-linecap="round"/>`; }).join("")}
        <circle cx="${cx}" cy="${cy - r * 0.7}" r="7" fill="${ROJO}"/>
      </g>`;
    return `<g transform="${T(x, y, s)}"><g class="oc-f">
      <path d="M-420 -150 C-420 -230 -300 -240 -180 -230 L-60 -220 C-30 -260 30 -260 60 -220 L180 -230 C300 -240 420 -230 420 -150 L420 150 C420 220 300 230 180 220 L60 200 C30 160 -30 160 -60 200 L-180 220 C-300 230 -420 220 -420 150 Z" fill="#dceef5" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M-380 -170 H380" stroke="#8cc4d8" stroke-width="8" stroke-linecap="round"/>
      <circle cx="-210" cy="0" r="135" fill="${INK}"/>
      <circle cx="210" cy="0" r="135" fill="${INK}"/>
      <circle class="oc-f-lente oc-f-li" cx="-210" cy="0" r="100" fill="${CEL}" fill-opacity="0.5" stroke="${BLA}" stroke-width="6"/>
      <circle class="oc-f-lente oc-f-ld" cx="210" cy="0" r="100" fill="${CEL}" fill-opacity="0.5" stroke="${BLA}" stroke-width="6"/>
      ${dial(-210, -175, 40, 0)}${dial(210, -175, 40, 1)}${dial(-360, 120, 34, 2)}${dial(360, 120, 34, 3)}${dial(0, -150, 30, 4)}
      <rect x="-30" y="-120" width="60" height="230" rx="18" fill="#8cc4d8" stroke="${INK}" stroke-width="7"/>
    </g></g>`;
  }

  // ojo suelto (para detrás del foróptero o íconos): .oc-ojo-parpado baja con scaleY
  function ojo(cx, cy, r, cls) {
    return `<g class="oc-ojo ${cls || ""}">
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.62}" fill="${BLA}" stroke="${INK}" stroke-width="6"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="#2c5a7a"/><circle cx="${cx}" cy="${cy}" r="${r * 0.18}" fill="${INK}"/>
      <circle cx="${cx + r * 0.12}" cy="${cy - r * 0.14}" r="${r * 0.08}" fill="${BLA}"/>
      <path class="oc-ojo-parpado" d="M${cx - r - 4} ${cy} C${cx - r} ${cy - r * 0.9} ${cx + r} ${cy - r * 0.9} ${cx + r + 4} ${cy} Z" fill="${PIEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" transform="translate(0 0)"/>
    </g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    // fija el svgOrigin antes de animar (sin smoothOrigin, que corre el elemento)
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
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
    // ojos de Martín: entrecerrar / abrir
    function squint(t, on) {
      tl.to(q(".oc-m-abiertos"), { opacity: on ? 0 : 1, duration: 0.08 }, t);
      tl.to(q(".oc-m-squint"), { opacity: on ? 1 : 0, duration: 0.08 }, t);
    }
    // parpadeo de un .oc-ojo
    function parpadeo(el, t) {
      const p = el.querySelector(".oc-ojo-parpado");
      const bb = p.getBBox();
      gsap.set(p, { svgOrigin: `${bb.x + bb.width / 2} ${bb.y}`, smoothOrigin: false, scaleY: 0.05 });
      tl.fromTo(p, { scaleY: 0.05 }, { scaleY: 2.1, duration: 0.09, ease: "power2.in", yoyo: true, repeat: 1, immediateRender: false }, t);
    }
    // el oculista apunta: el brazo con el puntero gira alrededor del hombro
    function apuntar(t, rot, d) {
      gsap.set(q(".oc-o-brazo"), { svgOrigin: "150 -200", smoothOrigin: false });
      tl.to(q(".oc-o-brazo"), { rotation: rot, duration: d || 0.35, ease: "power2.inOut" }, t);
    }
    // hablar: la boca se abre y cierra
    function hablar(sel, t, veces, d) {
      tl.fromTo(q(sel), { scaleY: 1 }, { scaleY: 1.8, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, golpe, sello, sacudon, dibujar, squint, parpadeo, apuntar, hablar, salida };
  }
  return { INK, ROJO, CEL, BLA, MOS, PIEL, VERDE, oculista, martin, carmelo, carta, celular, celularBorde, foroptero, ojo, kit };
})();
