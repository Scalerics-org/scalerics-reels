// Piezas del reel "la-medium": la médium, la clienta, el espíritu del local, la mesa con el tablero de
// espiritismo, las velas, el celular, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = SS.medium(x, y, s) + ...
// y en el script: const K = SS.kit(tl, root).
window.SS = window.SS || (function () {
  const INK = "#150f0b", VB = "#12382a", VB0 = "#0b2219", VB2 = "#1d5440", VB3 = "#3f7a5e",
    AMB = "#f2a93b", AMB2 = "#ffd27a", AMB3 = "#b86e14", HUE = "#ece0c4", HUE2 = "#cdbf9e",
    BOR = "#6e1f2a", BOR2 = "#a3343f", BOR3 = "#e0697a", ECTO = "#bfe3cf", PIEL = "#f0c8a0", PIEL2 = "#d9a47c",
    VERDE = "#5ce611", VERDE2 = "#3f9e0b";
  if (!document.getElementById("ss-css")) {
    const st = document.createElement("style");
    st.id = "ss-css";
    st.textContent = `
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: normal; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.ss-sello { position: absolute; box-sizing: border-box; padding: 14px 30px 8px; border: 8px double ${BOR2}; border-radius: 12px; color: ${BOR2};
  font-family: "Cinzel", serif; font-weight: 900; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(236, 224, 196, 0.95); }
.ss-sello.amb { border-color: ${AMB3}; color: ${AMB3}; }
.ss-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.ss-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 3px solid ${AMB}; border-radius: 8px; box-shadow: 0 0 0 6px ${INK}, 0 0 0 8px ${AMB3};
  font-family: "Cinzel", serif; font-weight: 700; font-size: 34px; letter-spacing: 0.12em; color: ${AMB2}; white-space: nowrap; text-align: center; }
.ss-tag.bor { border-color: ${BOR3}; color: ${HUE}; background: ${BOR}; box-shadow: 0 0 0 6px ${INK}, 0 0 0 8px ${BOR3}; }
.ss-tag.verde { border-color: ${VERDE}; color: ${HUE}; background: ${VERDE2}; box-shadow: 0 0 0 6px ${INK}, 0 0 0 8px ${VERDE}; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; }
.ss-titulo { position: absolute; font-family: "Cinzel", serif; font-weight: 900; color: ${AMB2}; white-space: nowrap; text-align: center; line-height: 1;
  text-shadow: 0 5px 0 ${AMB3}, 0 10px 22px rgba(0, 0, 0, 0.6); letter-spacing: 0.02em; }
.ss-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${HUE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // VELA: base en (x, y), alto h. Clases: .ss-vela .ss-llama (titilar con svgOrigin "x y-h") .ss-halo
  function vela(x, y, h, o) {
    o = o || {};
    const w = o.w || 46;
    const top = y - h;
    return `<g class="ss-vela ${o.cls || ""}">
      <circle class="ss-halo" cx="${x}" cy="${top - 34}" r="${o.halo || 120}" fill="${AMB2}" opacity="0.13"/>
      <circle class="ss-halo" cx="${x}" cy="${top - 34}" r="${(o.halo || 120) * 0.55}" fill="${AMB2}" opacity="0.14"/>
      <ellipse cx="${x}" cy="${y}" rx="${w * 1.3}" ry="${w * 0.32}" fill="${AMB3}" stroke="${INK}" stroke-width="6"/>
      <path d="M${x - w / 2} ${y} L${x - w / 2} ${top + 6} Q${x} ${top - 6} ${x + w / 2} ${top + 6} L${x + w / 2} ${y} Z" fill="${HUE}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M${x - w / 2} ${top + 10} Q${x - w / 2 + 6} ${top + 40} ${x - w / 2 + 10} ${top + 22} Q${x - 4} ${top + 58} ${x + 2} ${top + 20} Q${x + w / 2 - 6} ${top + 34} ${x + w / 2} ${top + 10}" fill="${HUE}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M${x + w / 2 - 12} ${top + 30} L${x + w / 2 - 12} ${y - 10}" stroke="${HUE2}" stroke-width="8" stroke-linecap="round"/>
      <path d="M${x} ${top} L${x} ${top - 14}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <g class="ss-llama">
        <path d="M${x} ${top - 72} C${x + 22} ${top - 44} ${x + 20} ${top - 14} ${x} ${top - 10} C${x - 20} ${top - 14} ${x - 22} ${top - 44} ${x} ${top - 72} Z" fill="${AMB}" stroke="${INK}" stroke-width="4"/>
        <path d="M${x} ${top - 50} C${x + 10} ${top - 34} ${x + 9} ${top - 18} ${x} ${top - 16} C${x - 9} ${top - 18} ${x - 10} ${top - 34} ${x} ${top - 50} Z" fill="${AMB2}"/>
      </g>
    </g>`;
  }

  // TABLERO de espiritismo (genérico), frontal: esquina (x, y), ancho w (alto 0.62 w).
  // Clases .ss-tb y cada signo .ss-tb-<código> (A..Z, 0..9, SI, NO, ADIOS) para encenderlos.
  function tablero(x, y, w, o) {
    o = o || {};
    const h = w * 0.62, cx = x + w / 2;
    const L1 = "ABCDEFGHIJKLM".split(""), L2 = "NOPQRSTUVWXYZ".split(""), N = "1234567890".split("");
    const arco = (letras, r, cy, fs) => letras.map((l, i) => {
      const a = (-58 + (116 * i) / (letras.length - 1)) * Math.PI / 180;
      const lx = cx + Math.sin(a) * r, ly = cy - Math.cos(a) * r * 0.62;
      const rot = (a * 180) / Math.PI;
      return `<text class="ss-tb-${l}" data-layout-ignore x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="${fs}" fill="${INK}" transform="rotate(${rot.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)})">${l}</text>`;
    }).join("");
    const nums = N.map((n, i) => {
      const nx = x + w * 0.2 + (i * w * 0.6) / 9;
      return `<text class="ss-tb-${n}" data-layout-ignore x="${nx.toFixed(1)}" y="${(y + h * 0.8).toFixed(1)}" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="${w * 0.05}" fill="${INK}">${n}</text>`;
    }).join("");
    return `<g class="ss-tb">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.06}" fill="${AMB3}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="${w * 0.045}" fill="${HUE}" stroke="${INK}" stroke-width="4"/>
      <rect x="${x + 26}" y="${y + 26}" width="${w - 52}" height="${h - 52}" rx="${w * 0.035}" fill="none" stroke="${AMB3}" stroke-width="3"/>
      <circle cx="${x + w * 0.12}" cy="${y + h * 0.17}" r="${w * 0.045}" fill="${AMB2}" stroke="${INK}" stroke-width="4"/>
      <path d="M${x + w * 0.88 - w * 0.04} ${y + h * 0.13} A${w * 0.045} ${w * 0.045} 0 1 0 ${x + w * 0.88 + w * 0.02} ${y + h * 0.22} A${w * 0.035} ${w * 0.035} 0 1 1 ${x + w * 0.88 - w * 0.04} ${y + h * 0.13} Z" fill="${INK}" opacity="0.8"/>
      <text class="ss-tb-SI" data-layout-ignore x="${x + w * 0.22}" y="${y + h * 0.2}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="${w * 0.06}" fill="${INK}">SÍ</text>
      <text class="ss-tb-NO" data-layout-ignore x="${x + w * 0.78}" y="${y + h * 0.2}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="${w * 0.06}" fill="${INK}">NO</text>
      ${arco(L1, w * 0.36, y + h * 0.62, w * 0.052)}
      ${arco(L2, w * 0.27, y + h * 0.66, w * 0.046)}
      ${nums}
      <text class="ss-tb-ADIOS" data-layout-ignore x="${cx}" y="${y + h * 0.93}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="${w * 0.048}" fill="${INK}" letter-spacing="${w * 0.01}">ADIÓS</text>
    </g>`;
  }
  // posición (centro) de un signo del tablero, para mover la tablilla
  function signo(x, y, w, c) {
    const h = w * 0.62, cx = x + w / 2;
    const L1 = "ABCDEFGHIJKLM", L2 = "NOPQRSTUVWXYZ", N = "1234567890";
    const enArco = (i, n, r, cy) => { const a = (-58 + (116 * i) / (n - 1)) * Math.PI / 180; return [cx + Math.sin(a) * r, cy - Math.cos(a) * r * 0.62]; };
    if (L1.includes(c)) return enArco(L1.indexOf(c), 13, w * 0.36, y + h * 0.62);
    if (L2.includes(c)) return enArco(L2.indexOf(c), 13, w * 0.27, y + h * 0.66);
    if (N.includes(c)) return [x + w * 0.2 + (N.indexOf(c) * w * 0.6) / 9, y + h * 0.8 - w * 0.018];
    if (c === "SI") return [x + w * 0.22, y + h * 0.2 - w * 0.02];
    if (c === "NO") return [x + w * 0.78, y + h * 0.2 - w * 0.02];
    return [cx, y + h * 0.93 - w * 0.016];
  }
  // TABLILLA (planchette) con ventanita: centro de la ventanita en (x, y), tamaño s. Clase .ss-tablilla
  function tablilla(x, y, s, o) {
    s = s || 1;
    return `<g class="ss-tablilla ${(o && o.cls) || ""}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -58 C40 -58 74 -20 64 22 C56 60 20 84 0 104 C-20 84 -56 60 -64 22 C-74 -20 -40 -58 0 -58 Z" fill="${BOR}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M0 -44 C30 -44 56 -16 50 16" fill="none" stroke="${BOR2}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="27" fill="${HUE}" fill-opacity="0.25" stroke="${INK}" stroke-width="7"/>
      <circle cx="0" cy="0" r="27" fill="none" stroke="${AMB}" stroke-width="3"/>
      <circle cx="-38" cy="62" r="7" fill="${AMB2}" stroke="${INK}" stroke-width="3"/><circle cx="38" cy="62" r="7" fill="${AMB2}" stroke="${INK}" stroke-width="3"/>
    </g></g>`;
  }

  // MESA redonda con mantel bordó: centro de la tapa (x, y), ancho w. o.tablero: dibuja el tablero
  // achatado encima. Clases .ss-mesa .ss-mesa-tapa (lo que salta con el golpe)
  function mesa(x, y, w, o) {
    o = o || {};
    const rx = w / 2, ry = w * 0.16;
    let flecos = "";
    for (let k = 0; k <= 22; k++) {
      const fx = x - rx * 1.02 + (k * rx * 2.04) / 22;
      const fy = y + w * 0.36 + Math.sin((k / 22) * Math.PI) * ry * 0.9;
      flecos += `<path d="M${fx.toFixed(1)} ${fy.toFixed(1)} l0 26" stroke="${AMB}" stroke-width="5" stroke-linecap="round"/>`;
    }
    const tb = o.tablero ? `<g transform="translate(${x} ${y}) scale(1 0.42) translate(${-x} ${-y})">${tablero(x - w * 0.34, y - w * 0.21, w * 0.68)}</g>` : "";
    return `<g class="ss-mesa">
      <path d="M${x - rx * 0.16} ${y + w * 0.3} L${x - rx * 0.24} ${y + w * 0.58} L${x + rx * 0.24} ${y + w * 0.58} L${x + rx * 0.16} ${y + w * 0.3} Z" fill="${INK}"/>
      <g class="ss-mesa-tapa">
        <path d="M${x - rx} ${y} L${x - rx * 1.04} ${y + w * 0.34} Q${x} ${y + w * 0.36 + ry * 1.8} ${x + rx * 1.04} ${y + w * 0.34} L${x + rx} ${y} Z" fill="${BOR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M${x - rx * 0.6} ${y + ry * 0.8} L${x - rx * 0.66} ${y + w * 0.38} M${x - rx * 0.1} ${y + ry} L${x - rx * 0.1} ${y + w * 0.42} M${x + rx * 0.45} ${y + ry * 0.9} L${x + rx * 0.5} ${y + w * 0.4}" stroke="${BOR2}" stroke-width="6" opacity="0.7"/>
        ${flecos}
        <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${BOR2}" stroke="${INK}" stroke-width="8"/>
        <ellipse cx="${x}" cy="${y}" rx="${rx * 0.92}" ry="${ry * 0.86}" fill="none" stroke="${AMB}" stroke-width="3" stroke-dasharray="14 10"/>
        ${tb}
      </g>
    </g>`;
  }

  // LA MÉDIUM: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.ojos: "abiertos" | "trance" (en blanco) | "cerrados"; o.manos: "arriba" | "pecho" | "mesa" | "sien" | ninguna;
  // o.cara: "seria" | "sonrisa" | "triste". Clases: .ss-m .ss-m-cabeza .ss-m-boca .ss-m-ojos .ss-m-brazos .ss-m-joya
  function medium(x, y, s, o) {
    o = o || {};
    const ojos = o.ojos || "abiertos", cara = o.cara || "seria";
    const ojoS = ojos === "trance"
      ? `<ellipse cx="-46" cy="-345" rx="22" ry="15" fill="${HUE}" stroke="${INK}" stroke-width="6"/><ellipse cx="46" cy="-345" rx="22" ry="15" fill="${HUE}" stroke="${INK}" stroke-width="6"/>
         <ellipse cx="-46" cy="-358" rx="12" ry="4" fill="${INK}" opacity="0.5"/><ellipse cx="46" cy="-358" rx="12" ry="4" fill="${INK}" opacity="0.5"/>`
      : ojos === "cerrados"
        ? `<path d="M-68 -344 Q-46 -330 -24 -344 M68 -344 Q46 -330 24 -344" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
        : `<ellipse cx="-46" cy="-345" rx="21" ry="15" fill="${HUE}" stroke="${INK}" stroke-width="6"/><ellipse cx="46" cy="-345" rx="21" ry="15" fill="${HUE}" stroke="${INK}" stroke-width="6"/>
           <circle cx="-42" cy="-344" r="10" fill="${INK}"/><circle cx="50" cy="-344" r="10" fill="${INK}"/><circle cx="-38" cy="-348" r="3.5" fill="#fff"/><circle cx="54" cy="-348" r="3.5" fill="#fff"/>`;
    const delineado = `<path d="M-72 -350 Q-46 -372 -18 -352 L-10 -360 M72 -350 Q46 -372 18 -352 L10 -360" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-70 -368 Q-46 -386 -20 -372 M70 -368 Q46 -386 20 -372" fill="none" stroke="${VB3}" stroke-width="10" stroke-linecap="round" opacity="0.8"/>`;
    const cejas = cara === "triste" ? "M-74 -392 L-26 -404 M74 -392 L26 -404" : "M-76 -398 Q-50 -420 -22 -404 M76 -398 Q50 -420 22 -404";
    const boca = cara === "sonrisa"
      ? `<path class="ss-m-boca" d="M-38 -276 Q0 -238 38 -276 Z" fill="${BOR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "triste"
        ? `<path class="ss-m-boca" d="M-30 -258 Q0 -282 30 -258" fill="none" stroke="${BOR}" stroke-width="10" stroke-linecap="round"/>`
        : `<ellipse class="ss-m-boca" cx="0" cy="-268" rx="24" ry="12" fill="${BOR}" stroke="${INK}" stroke-width="6"/>`;
    const anillos = (hx, hy) => `<circle cx="${hx - 10}" cy="${hy - 22}" r="7" fill="${AMB2}" stroke="${INK}" stroke-width="3"/><circle cx="${hx + 12}" cy="${hy - 18}" r="6" fill="${BOR3}" stroke="${INK}" stroke-width="3"/>`;
    const brazo = (d, hx, hy) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="${BOR}" stroke-width="52" stroke-linecap="round"/>
        <circle cx="${hx}" cy="${hy}" r="32" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M${hx - 18} ${hy - 26} l-6 -26 M${hx - 4} ${hy - 30} l0 -30 M${hx + 10} ${hy - 28} l6 -26" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
        <path d="M${hx - 18} ${hy - 26} l-6 -26 M${hx - 4} ${hy - 30} l0 -30 M${hx + 10} ${hy - 28} l6 -26" stroke="${PIEL}" stroke-width="9" stroke-linecap="round"/>
        ${anillos(hx, hy)}`;
    let brazos = "";
    if (o.manos === "arriba") brazos = brazo("M-170 -180 C-260 -230 -290 -330 -260 -440", -260, -450) + brazo("M170 -180 C260 -230 290 -330 260 -440", 260, -450);
    else if (o.manos === "pecho") brazos = brazo("M170 -180 C220 -120 160 -60 60 -110", 50, -120);
    else if (o.manos === "mesa") brazos = brazo("M-170 -180 C-230 -100 -240 -20 -200 40", -200, 50) + brazo("M170 -180 C230 -100 240 -20 200 40", 200, 50);
    else if (o.manos === "sien") brazos = brazo("M-170 -180 C-250 -220 -190 -320 -128 -360", -122, -366) + brazo("M170 -180 C250 -220 190 -320 128 -360", 122, -366);
    let flecos = "";
    for (let k = 0; k < 15; k++) flecos += `<path d="M${-190 + k * 27} ${-60 + Math.abs(k - 7) * 8} l${(k % 3) - 1} 34" stroke="${HUE2}" stroke-width="6" stroke-linecap="round"/>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ss-m">
      <!-- vestido bordó y chal hueso con flecos -->
      <path d="M-235 40 C-238 -110 -200 -195 -100 -218 L100 -218 C200 -195 238 -110 235 40 Z" fill="${BOR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-215 -120 C-180 -205 -110 -222 -60 -218 L0 -120 L60 -218 C110 -222 180 -205 215 -120 C150 -60 60 -50 0 -40 C-60 -50 -150 -60 -215 -120 Z" fill="${HUE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-150 -110 Q-80 -80 -20 -70 M150 -110 Q80 -80 20 -70" fill="none" stroke="${HUE2}" stroke-width="5"/>
      ${flecos}
      <path d="M-38 -268 L-42 -212 L42 -212 L38 -268 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <!-- collar de cuentas -->
      <path d="M-46 -214 Q0 -160 46 -214" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <path d="M-46 -214 Q0 -160 46 -214" fill="none" stroke="${AMB}" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 14"/>
      <circle cx="0" cy="-172" r="15" fill="${VB2}" stroke="${INK}" stroke-width="5"/>
      <g class="ss-m-cabeza">
        <!-- pelo canoso que asoma -->
        <path d="M-112 -330 C-140 -300 -138 -250 -110 -230 L-96 -300 Z M112 -330 C140 -300 138 -250 110 -230 L96 -300 Z" fill="${HUE2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-100 -380 C-104 -470 104 -470 100 -380 L96 -310 C90 -250 48 -228 0 -228 C-48 -228 -90 -250 -96 -310 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- aros grandes -->
        <circle cx="-106" cy="-282" r="24" fill="none" stroke="${INK}" stroke-width="13"/><circle cx="-106" cy="-282" r="24" fill="none" stroke="${AMB}" stroke-width="7"/>
        <circle cx="106" cy="-282" r="24" fill="none" stroke="${INK}" stroke-width="13"/><circle cx="106" cy="-282" r="24" fill="none" stroke="${AMB}" stroke-width="7"/>
        <path class="ss-m-cejas" d="${cejas}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
        <g class="ss-m-ojos">${ojoS}${ojos === "cerrados" ? "" : delineado}</g>
        <path d="M0 -340 C-10 -312 -16 -300 2 -294" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="34" cy="-306" r="5" fill="${INK}"/>
        <path d="M-74 -306 Q-60 -300 -48 -306 M74 -306 Q60 -300 48 -306" fill="none" stroke="${BOR3}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
        ${boca}
        <!-- turbante bordó con joya ámbar y pluma -->
        <path d="M-118 -372 C-150 -470 -90 -560 0 -566 C90 -560 150 -470 118 -372 C70 -404 -70 -404 -118 -372 Z" fill="${BOR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-112 -400 C-60 -470 40 -500 110 -440 M-100 -450 C-40 -510 50 -520 96 -480 M-118 -380 C-50 -430 60 -440 116 -390" fill="none" stroke="${BOR2}" stroke-width="7" stroke-linecap="round"/>
        <g class="ss-m-pluma"><path d="M10 -470 C-10 -560 30 -640 70 -660 C80 -600 60 -520 22 -470 Z" fill="${HUE}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M20 -470 C30 -540 46 -600 68 -650" fill="none" stroke="${HUE2}" stroke-width="4"/></g>
        <g class="ss-m-joya"><path d="M0 -500 L26 -466 L0 -432 L-26 -466 Z" fill="${AMB}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M0 -488 L12 -470 L0 -456" fill="none" stroke="${AMB2}" stroke-width="5" stroke-linecap="round"/></g>
      </g>
      <g class="ss-m-brazos">${brazos}</g>
    </g></g>`;
  }

  // LA CLIENTA: busto, origen = centro de la base del torso. Cabeza en (0,-340).
  // o.cara: "neutra" | "asustada" | "suplica" | "feliz" | "enojada"; o.celular: celular en la mano (derecha);
  // o.pelo: "parado" (del susto). Clases: .ss-c .ss-c-cabeza .ss-c-boca .ss-c-cel .ss-c-pantalla .ss-c-pelo
  function clienta(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const cejas = cara === "enojada" ? "M-72 -394 L-26 -378 M72 -394 L26 -378"
      : cara === "asustada" ? "M-74 -404 Q-50 -424 -26 -408 M74 -404 Q50 -424 26 -408"
      : cara === "suplica" ? "M-72 -382 L-28 -398 M72 -382 L28 -398"
      : cara === "feliz" ? "M-72 -390 Q-50 -408 -28 -394 M72 -390 Q50 -408 28 -394" : "M-72 -386 L-28 -390 M72 -386 L28 -390";
    const ojos = cara === "asustada"
      ? `<circle cx="-46" cy="-346" r="20" fill="${HUE}" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="-346" r="20" fill="${HUE}" stroke="${INK}" stroke-width="5"/><circle cx="-46" cy="-346" r="7" fill="${INK}"/><circle cx="46" cy="-346" r="7" fill="${INK}"/>`
      : cara === "feliz" ? `<path d="M-66 -342 Q-46 -364 -26 -342 M66 -342 Q46 -364 26 -342" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<ellipse cx="-46" cy="-346" rx="11" ry="14" fill="${INK}"/><ellipse cx="46" cy="-346" rx="11" ry="14" fill="${INK}"/><circle cx="-42" cy="-351" r="4" fill="#fff"/><circle cx="50" cy="-351" r="4" fill="#fff"/>`;
    const lagrima = cara === "suplica" ? `<path class="ss-c-lagrima" d="M-56 -322 C-64 -304 -64 -294 -56 -290 C-48 -294 -48 -304 -56 -322 Z" fill="${ECTO}" stroke="${INK}" stroke-width="3"/>` : "";
    const boca = cara === "asustada" ? `<ellipse class="ss-c-boca" cx="0" cy="-264" rx="22" ry="30" fill="${BOR}" stroke="${INK}" stroke-width="6"/>`
      : cara === "feliz" ? `<path class="ss-c-boca" d="M-38 -276 Q0 -230 38 -276 Z" fill="${BOR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "enojada" ? `<path class="ss-c-boca" d="M-28 -256 Q0 -276 28 -256" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "suplica" ? `<path class="ss-c-boca" d="M-26 -258 Q0 -274 26 -258 Q0 -262 -26 -258 Z" fill="${BOR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : `<ellipse class="ss-c-boca" cx="0" cy="-264" rx="16" ry="9" fill="${BOR}" stroke="${INK}" stroke-width="5"/>`;
    const cel = o.celular ? `<g class="ss-c-cel">
        <path d="M150 20 C190 -60 180 -120 150 -170" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M150 20 C190 -60 180 -120 150 -170" fill="none" stroke="${AMB3}" stroke-width="48" stroke-linecap="round"/>
        <rect x="88" y="-330" width="96" height="170" rx="16" fill="${INK}"/>
        <rect class="ss-c-pantalla" x="97" y="-318" width="78" height="146" rx="9" fill="${HUE}"/>
        <rect x="106" y="-300" width="58" height="12" rx="6" fill="${VB3}" opacity="0.7"/>
        <rect x="106" y="-280" width="40" height="12" rx="6" fill="${HUE2}"/>
        <circle cx="150" cy="-172" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    const pelo = o.pelo === "parado"
      ? `<path class="ss-c-pelo" d="M-108 -370 L-150 -470 L-90 -440 L-80 -540 L-30 -460 L0 -560 L30 -460 L80 -540 L90 -440 L150 -470 L108 -370 Z" fill="#3a2418" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`
      : `<path class="ss-c-pelo" d="M-118 -250 C-150 -360 -120 -480 0 -486 C120 -480 150 -360 118 -250 L96 -250 C104 -320 92 -380 60 -410 C20 -380 -40 -372 -92 -380 C-104 -340 -104 -290 -96 -250 Z" fill="#3a2418" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ss-c">
      <!-- saco ámbar y blusa hueso -->
      <path d="M-200 30 C-195 -120 -135 -200 -62 -215 L62 -215 C135 -200 195 -120 200 30 Z" fill="${AMB}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-62 -215 L0 -110 L62 -215 Z" fill="${HUE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-62 -215 L-30 -40 M62 -215 L30 -40" stroke="${AMB3}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="-22" cy="-70" r="7" fill="${INK}"/><circle cx="-22" cy="-20" r="7" fill="${INK}"/>
      <path d="M-38 -265 L-42 -205 L42 -205 L38 -265 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="ss-c-cabeza">
        ${o.pelo === "parado" ? "" : `<path d="M-118 -250 C-150 -360 -120 -480 0 -486 C120 -480 150 -360 118 -250 Z" fill="#3a2418" stroke="${INK}" stroke-width="7"/>`}
        <path d="M-100 -380 C-104 -470 104 -470 100 -380 L96 -305 C90 -245 48 -222 0 -222 C-48 -222 -90 -245 -96 -305 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        ${pelo}
        <path class="ss-c-cejas" d="${cejas}" fill="none" stroke="#3a2418" stroke-width="11" stroke-linecap="round"/>
        <g class="ss-c-ojos">${ojos}</g>
        <path d="M0 -338 C-8 -312 -14 -302 2 -297" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-74 -306 Q-60 -300 -48 -306 M74 -306 Q60 -300 48 -306" fill="none" stroke="${BOR3}" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
        ${lagrima}
        ${boca}
      </g>
      ${cel}
    </g></g>`;
  }

  // EL ESPÍRITU DEL LOCAL: fantasma de sábana con un toldo de local de sombrero.
  // origen = centro de la base; alto ~520. Clases .ss-e .ss-e-boca .ss-e-ojos .ss-e-brazos
  function espiritu(x, y, s, o) {
    o = o || {};
    let rayas = "";
    for (let k = 0; k < 7; k++) rayas += `<path d="M${-150 + k * 50} -470 L${-130 + k * 50} -400 L${-110 + k * 50} -400 L${-125 + k * 50} -470 Z" fill="${k % 2 ? HUE : VB2}"/>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ss-e">
      <path d="M-170 0 C-180 -200 -170 -380 0 -400 C170 -380 180 -200 170 0 L135 -30 L100 0 L62 -34 L25 0 L-14 -34 L-52 0 L-92 -34 L-130 0 Z" fill="${ECTO}" fill-opacity="${o.alfa ?? 0.92}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M120 -330 C150 -250 152 -150 140 -60" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
      <g class="ss-e-brazos">
        <path d="M-160 -200 C-230 -230 -250 -280 -240 -320" fill="none" stroke="${INK}" stroke-width="44" stroke-linecap="round"/>
        <path d="M-160 -200 C-230 -230 -250 -280 -240 -320" fill="none" stroke="${ECTO}" stroke-width="30" stroke-linecap="round"/>
        <path d="M160 -200 C230 -230 250 -280 240 -320" fill="none" stroke="${INK}" stroke-width="44" stroke-linecap="round"/>
        <path d="M160 -200 C230 -230 250 -280 240 -320" fill="none" stroke="${ECTO}" stroke-width="30" stroke-linecap="round"/>
      </g>
      <g class="ss-e-ojos"><ellipse cx="-52" cy="-260" rx="22" ry="34" fill="${INK}"/><ellipse cx="52" cy="-260" rx="22" ry="34" fill="${INK}"/></g>
      <ellipse class="ss-e-boca" cx="0" cy="-170" rx="30" ry="40" fill="${INK}"/>
      <!-- el toldo del local, de sombrero -->
      <g class="ss-e-toldo">
        <path d="M-150 -470 L150 -470 L170 -400 L-170 -400 Z" fill="${HUE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        ${rayas}
        <path d="M-150 -470 L150 -470 L170 -400 L-170 -400 Z" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-170 -400 Q-145 -372 -120 -400 Q-95 -372 -70 -400 Q-45 -372 -20 -400 Q5 -372 30 -400 Q55 -372 80 -400 Q105 -372 130 -400 Q150 -376 170 -400" fill="${VB2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <rect x="-110" y="-530" width="220" height="62" rx="8" fill="${INK}" stroke="${AMB}" stroke-width="4"/>
        <text x="0" y="-488" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="34" fill="${AMB2}" letter-spacing="3">TU LOCAL</text>
      </g>
    </g></g>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || HUE}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  // TELARAÑA en una esquina: (x, y) = la esquina, r = tamaño, cuadrante: 1 arriba-izq, 2 arriba-der. Clase .ss-tela (dibujar)
  function telarana(x, y, r, cuad, o) {
    const sx = cuad === 2 ? -1 : 1;
    let d = "";
    for (let k = 0; k <= 4; k++) { const a = (k / 4) * Math.PI / 2; d += `M${x} ${y} L${x + sx * Math.cos(a) * r} ${y + Math.sin(a) * r} `; }
    for (let j = 1; j <= 3; j++) {
      const rr = (r * j) / 3.4;
      d += `M${x + sx * rr} ${y} `;
      for (let k = 1; k <= 4; k++) { const a = (k / 4) * Math.PI / 2, a0 = ((k - 0.5) / 4) * Math.PI / 2; d += `Q${x + sx * Math.cos(a0) * rr * 0.8} ${y + Math.sin(a0) * rr * 0.8} ${x + sx * Math.cos(a) * rr} ${y + Math.sin(a) * rr} `; }
    }
    return `<path class="ss-tela ${(o && o.cls) || ""}" d="${d}" fill="none" stroke="${(o && o.color) || HUE}" stroke-width="${(o && o.sw) || 3}" stroke-linecap="round" opacity="0.85"/>`;
  }
  // HUMO / ectoplasma: voluta (x, y) ancho w. Clase .ss-humo
  function humo(x, y, w, o) {
    return `<path class="ss-humo ${(o && o.cls) || ""}" d="M${x} ${y} C${x - w * 0.3} ${y - w * 0.3} ${x + w * 0.4} ${y - w * 0.5} ${x} ${y - w * 0.8} C${x - w * 0.4} ${y - w * 1.1} ${x + w * 0.3} ${y - w * 1.3} ${x + w * 0.05} ${y - w * 1.6}" fill="none" stroke="${ECTO}" stroke-width="${(o && o.sw) || 10}" stroke-linecap="round" opacity="${(o && o.op) || 0.55}"/>`;
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
    // aparece como un fantasma: de transparente y borroso a nítido, subiendo
    function aparecer(el, t, d, dy) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, y: dy ?? 40, filter: "blur(14px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: d || 0.6, ease: "power2.out", immediateRender: false }, t);
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
    // temblor largo (la mesa que tiembla): d segundos
    function temblar(el, t, d, f) {
      f = f || 1;
      const n = Math.max(2, Math.round(d / 0.05));
      const rnd = azar(Math.round(t * 100) + 5);
      // relativo (+=): no pisa la posición que ya tenga el elemento
      let px = 0, py = 0;
      for (let i = 0; i < n; i++) {
        const nx = (rnd() - 0.5) * 16 * f, ny = (rnd() - 0.5) * 10 * f;
        tl.to(el, { x: "+=" + (nx - px), y: "+=" + (ny - py), duration: 0.05, ease: "none" }, t + i * 0.05);
        px = nx; py = ny;
      }
      tl.to(el, { x: "+=" + -px, y: "+=" + -py, duration: 0.05, ease: "none" }, t + n * 0.05);
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    // las llamas de las velas titilan entre t y t+d (determinista)
    function titilar(sel, t, d) {
      qa(sel).forEach((ll, i) => {
        const bb = ll.getBBox();
        origen(ll, `${bb.x + bb.width / 2} ${bb.y + bb.height}`);
        const n = Math.max(1, Math.floor(d / 0.32));
        tl.fromTo(ll, { scaleY: 1, scaleX: 1, rotation: -3 }, { scaleY: 1.18, scaleX: 0.88, rotation: 4, duration: 0.16 + (i % 3) * 0.02, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t + (i % 4) * 0.05);
      });
      qa(".ss-halo").forEach((h, i) => tl.fromTo(h, { opacity: 0.13 }, { opacity: 0.2, duration: 0.21 + (i % 2) * 0.04, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.42)) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t));
    }
    // el humo sube y se desvanece
    function humear(sel, t, d) {
      qa(sel).forEach((h, i) => {
        const L = h.getTotalLength() + 2;
        gsap.set(h, { strokeDasharray: `${L * 0.45} ${L}`, strokeDashoffset: L * 0.45, opacity: 0 });
        tl.fromTo(h, { strokeDashoffset: L * 0.45, opacity: 0 }, { strokeDashoffset: -L, opacity: 0.6, duration: d || 2.2, ease: "none", immediateRender: false }, t + i * 0.35);
        tl.to(h, { opacity: 0, duration: 0.5 }, t + i * 0.35 + (d || 2.2) - 0.5);
      });
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // flotar suave (fantasmas): sube y baja entre t y t+d
    function flotar(el, t, d, amp) {
      const n = Math.max(1, Math.floor(d / 1.2));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 18), duration: 0.6, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, aparecer, sello, sacudon, temblar, dibujar, titilar, humear, hablar, flotar, salida };
  }
  return { INK, VB, VB0, VB2, VB3, AMB, AMB2, AMB3, HUE, HUE2, BOR, BOR2, BOR3, ECTO, PIEL, PIEL2, VERDE, VERDE2, azar, vela, tablero, signo, tablilla, mesa, medium, clienta, espiritu, celular, celularBorde, telarana, humo, kit };
})();
