// Piezas del reel "asmr": la ASMRtista, Beto el panadero, el micrófono binaural con orejas, la planilla,
// el celular con chat, globos, bizcocho, disquete, ruedita de carga, cama, luna, zzz y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = AS.beto(x, y, s) + ...
// y en el script: const K = AS.kit(tl, root).
window.AS = window.AS || (function () {
  // paleta (SPEC): noche violeta, lavanda, ámbar de velador, azul de pantalla, rosa de alerta (+ verde Scalerics al final)
  const INK = "#120c22", NOCHE = "#1b1430", NOCHE2 = "#2c2250", NOCHE3 = "#3d3070",
    LAV = "#b9a6ff", LAV2 = "#e4dcff", LAV3 = "#7a68c4",
    AMB = "#ffbf69", AMB2 = "#ffe0b0", AMB3 = "#c98a3c",
    AZ = "#6cc4ff", AZ2 = "#16305a", AZ3 = "#bfe6ff",
    ROSA = "#ff6f91", VERDE = "#5ce611", VERDE2 = "#3f9e0b",
    PIEL = "#f3c99a", PIEL2 = "#d9a272";
  if (!document.getElementById("as-css")) {
    const st = document.createElement("style");
    st.id = "as-css";
    st.textContent = `
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
.as-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${NOCHE}; border: 4px solid ${LAV}; border-radius: 999px;
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.16em; color: ${LAV2}; white-space: nowrap; text-align: center; }
.as-tag.amb { border-color: ${AMB}; color: ${AMB2}; }
.as-tag.az { border-color: ${AZ}; color: ${AZ3}; }
.as-tag.rosa { border-color: ${ROSA}; color: ${ROSA}; }
.as-tag.verde { border-color: ${VERDE}; color: ${VERDE}; }
.as-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${LAV2}; white-space: nowrap; text-align: center; line-height: 0.95;
  -webkit-text-stroke: 4px ${INK}; paint-order: stroke fill; text-shadow: 0 7px 0 ${INK}, 0 0 40px rgba(185, 166, 255, 0.45); letter-spacing: -0.01em; }
.as-titulo.amb { color: ${AMB}; text-shadow: 0 7px 0 ${INK}, 0 0 40px rgba(255, 191, 105, 0.45); }
.as-titulo.rosa { color: ${ROSA}; text-shadow: 0 7px 0 ${INK}, 0 0 40px rgba(255, 111, 145, 0.45); }
.as-titulo.verde { color: ${VERDE}; text-shadow: 0 7px 0 ${INK}, 0 0 40px rgba(92, 230, 17, 0.4); }
.as-susurro { position: absolute; font-family: "Lexend", sans-serif; font-weight: 300; color: ${LAV2}; white-space: nowrap; text-align: center; letter-spacing: 0.12em;
  text-shadow: 0 0 30px rgba(185, 166, 255, 0.7), 0 0 8px rgba(185, 166, 255, 0.5); }
.as-sello { position: absolute; box-sizing: border-box; padding: 10px 28px 6px; border: 8px solid ${ROSA}; border-radius: 14px; color: ${ROSA};
  font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: 0.04em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(18, 12, 34, 0.85); }
.as-sello.amb { border-color: ${AMB}; color: ${AMB}; }
.as-sello.verde { border-color: ${VERDE}; color: ${VERDE}; }
.as-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: ${AMB2}; white-space: nowrap; line-height: 0.9; }
.as-reloj { position: absolute; box-sizing: border-box; padding: 18px 40px 14px; background: ${INK}; border: 6px solid ${AMB3}; border-radius: 28px;
  font-family: "IBM Plex Mono", monospace; font-weight: 600; color: ${AMB}; white-space: nowrap; text-align: center; line-height: 1;
  text-shadow: 0 0 28px rgba(255, 191, 105, 0.8); box-shadow: 0 0 60px rgba(255, 191, 105, 0.18); }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;

  // ZZZ: tres Z crecientes desde (x, y). Cada Z con clase .as-z
  function zzz(x, y, s, color) {
    s = s || 1;
    return `<g class="as-zzz">${[0, 1, 2].map((i) => `<text class="as-z as-z${i + 1}" x="${x + i * 46 * s}" y="${y - i * 56 * s}" font-family="Lexend" font-weight="900" font-size="${(54 + i * 22) * s}" fill="${color || LAV2}" stroke="${INK}" stroke-width="${6 * s}" paint-order="stroke" data-layout-ignore>Z</text>`).join("")}</g>`;
  }
  // ARCOS de sonido que salen de (x, y) hacia la derecha (dir 1) o la izquierda (dir -1). Clase .as-arco
  function arcos(x, y, dir, color, cls, n) {
    n = n || 3; dir = dir || 1;
    let s = "";
    for (let i = 0; i < n; i++) {
      const r = 34 + i * 30;
      s += `<path class="as-arco ${cls || ""}" d="M${x + dir * r * 0.5} ${y - r} Q${x + dir * r * 1.15} ${y} ${x + dir * r * 0.5} ${y + r}" fill="none" stroke="${color || LAV}" stroke-width="7" stroke-linecap="round"/>`;
    }
    return s;
  }
  function luna(x, y, r, cls) {
    return `<g class="${cls || ""}"><circle cx="${x}" cy="${y}" r="${r}" fill="${AMB2}" stroke="${INK}" stroke-width="6"/><circle cx="${x + r * 0.42}" cy="${y - r * 0.22}" r="${r * 0.86}" fill="${NOCHE}" stroke="none"/></g>`;
  }
  function estrella(x, y, r, color, cls) {
    const k = r * 0.25;
    return `<path class="as-est ${cls || ""}" data-o="${x} ${y}" d="M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r} Z" fill="${color || LAV2}"/>`;
  }
  function estrellas(lista, color, cls) { return lista.map(([x, y, r]) => estrella(x, y, r, color, cls)).join(""); }

  // MICRÓFONO BINAURAL: cuerpo con rejilla, dos orejas a los costados, pie. (x, y) = centro del cuerpo.
  // Clases: .as-m-oi / .as-m-od (orejas, origen en data-o), .as-m-led, .as-m-cuerpo
  function oreja(cx, cy, esp) {
    const k = esp ? -1 : 1; // la oreja izquierda mira a la izquierda
    const X = (v) => cx + k * v;
    return `<path d="M${X(10)} ${cy - 92} C${X(-60)} ${cy - 104} ${X(-92)} ${cy - 40} ${X(-82)} ${cy + 8} C${X(-74)} ${cy + 48} ${X(-48)} ${cy + 64} ${X(-34)} ${cy + 92} C${X(-24)} ${cy + 112} ${X(4)} ${cy + 114} ${X(10)} ${cy + 92} C${X(16)} ${cy + 70} ${X(6)} ${cy + 56} ${X(4)} ${cy + 36} L${X(12)} ${cy - 92} Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M${X(2)} ${cy - 66} C${X(-46)} ${cy - 70} ${X(-60)} ${cy - 24} ${X(-52)} ${cy + 6} C${X(-46)} ${cy + 28} ${X(-26)} ${cy + 30} ${X(-22)} ${cy + 12} C${X(-18)} ${cy - 8} ${X(-38)} ${cy - 14} ${X(-30)} ${cy - 34}" fill="none" stroke="${PIEL2}" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="${X(-14)}" cy="${cy + 18}" rx="12" ry="16" fill="${PIEL2}"/>`;
  }
  function mic(x, y, s, o) {
    o = o || {};
    let rej = "";
    for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) rej += `<circle cx="${i * 22}" cy="${j * 22 + 4}" r="5" fill="${LAV3}"/>`;
    return `<g transform="${T(x, y, s)}"><g class="as-mic">
      ${o.sinPie ? "" : `<path d="M0 70 L0 330" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="M0 70 L0 330" stroke="${LAV3}" stroke-width="12" stroke-linecap="round"/>
      <ellipse cx="0" cy="340" rx="110" ry="24" fill="${NOCHE2}" stroke="${INK}" stroke-width="7"/>`}
      <g class="as-m-oi" data-o="-110 0">${oreja(-118, 0, true)}</g>
      <g class="as-m-od" data-o="110 0">${oreja(118, 0, false)}</g>
      <g class="as-m-cuerpo"><rect x="-100" y="-76" width="200" height="160" rx="46" fill="${NOCHE2}" stroke="${INK}" stroke-width="8"/>${rej}
      <rect x="-70" y="-64" width="70" height="12" rx="6" fill="${LAV2}" opacity="0.35"/></g>
      <circle class="as-m-led" cx="0" cy="-96" r="12" fill="${ROSA}" stroke="${INK}" stroke-width="5"/>
    </g></g>`;
  }

  // ASMRtista: busto con pelo largo, ojos cerrados, sonrisa suave. (x, y) = abajo al centro. o.dedo: dedo en los labios.
  // Clases: .as-a-cabeza, .as-a-boca, .as-a-brazo
  function asmrtista(x, y, s, o) {
    o = o || {};
    const dedo = o.dedo ? `<g class="as-a-brazo">
        <path d="M150 40 C170 -60 120 -170 40 -232" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 40 C170 -60 120 -170 40 -232" fill="none" stroke="${LAV3}" stroke-width="50" stroke-linecap="round"/>
        <ellipse cx="22" cy="-246" rx="32" ry="28" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M6 -262 L4 -330" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M6 -262 L4 -330" stroke="${PIEL}" stroke-width="16" stroke-linecap="round"/>
      </g>` : "";
    const ojos = o.abiertos
      ? `<ellipse cx="-44" cy="-352" rx="15" ry="17" fill="${INK}"/><ellipse cx="44" cy="-352" rx="15" ry="17" fill="${INK}"/><circle cx="-39" cy="-358" r="5" fill="${LAV2}"/><circle cx="49" cy="-358" r="5" fill="${LAV2}"/>`
      : `<path d="M-66 -352 Q-44 -334 -22 -352 M66 -352 Q44 -334 22 -352" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
         <path d="M-64 -350 l-10 6 M-56 -344 l-6 9 M64 -350 l10 6 M56 -344 l6 9" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="as-a">
      <!-- pelo largo, atrás -->
      <path d="M-150 -330 C-170 -470 -80 -540 0 -540 C80 -540 170 -470 150 -330 C160 -230 175 -150 200 -80 C130 -60 -130 -60 -200 -80 C-175 -150 -160 -230 -150 -330 Z" fill="${NOCHE3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <!-- buzo -->
      <path d="M-250 40 C-245 -80 -200 -170 -90 -205 L90 -205 C200 -170 245 -80 250 40 Z" fill="${LAV3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -205 Q0 -150 70 -205" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-36 -270 L-40 -200 L40 -200 L36 -270 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="as-a-cabeza">
        <path d="M-100 -380 C-104 -490 104 -490 100 -380 L96 -320 C88 -262 50 -240 0 -240 C-50 -240 -88 -262 -96 -320 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        ${ojos}
        <ellipse cx="-62" cy="-308" rx="22" ry="12" fill="${ROSA}" opacity="0.45"/><ellipse cx="62" cy="-308" rx="22" ry="12" fill="${ROSA}" opacity="0.45"/>
        <path d="M0 -330 Q-8 -310 4 -302" fill="none" stroke="${PIEL2}" stroke-width="6" stroke-linecap="round"/>
        <path class="as-a-boca" d="M-20 -276 Q0 -264 20 -276" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <!-- flequillo -->
        <path d="M-104 -372 C-110 -470 -40 -500 10 -494 C70 -490 112 -450 104 -372 C90 -420 50 -440 20 -436 C0 -410 -50 -400 -104 -372 Z" fill="${NOCHE3}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-40 -480 Q10 -496 60 -470" fill="none" stroke="${LAV}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
      </g>
      ${dedo}
    </g></g>`;
  }

  // BETO, el panadero: busto con gorro de panadero, bigote y ojeras. (x, y) = abajo al centro.
  // o.cara: cansado | enojado | panico | dormido | feliz. o.dedo (shh), o.manos (pánico, en la cara), o.cel (graba un audio)
  // Clases: .as-b-cabeza, .as-b-boca, .as-b-luz (luz azul de la pantalla en la cara), .as-b-gota, .as-b-brazo
  function beto(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "cansado";
    let ojos;
    const parpado = (cx, baja) => `<ellipse cx="${cx}" cy="-350" rx="21" ry="19" fill="#fff8f0" stroke="${INK}" stroke-width="6"/><circle cx="${cx}" cy="-344" r="9" fill="${INK}"/>
        <path d="M${cx - 23} -352 Q${cx} -${370 - baja} ${cx + 23} -352 L${cx + 23} -372 L${cx - 23} -372 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    if (cara === "dormido" || cara === "feliz") ojos = `<path d="M-72 -350 Q-50 -334 -28 -350 M72 -350 Q50 -334 28 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    else if (cara === "panico") ojos = `<circle cx="-50" cy="-354" r="28" fill="#fff8f0" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="-354" r="28" fill="#fff8f0" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-352" r="7" fill="${INK}"/><circle cx="48" cy="-352" r="7" fill="${INK}"/>`;
    else if (cara === "enojado") ojos = parpado(-50, 18) + parpado(50, 18);
    else ojos = parpado(-50, 4) + parpado(50, 4);
    const cejas = cara === "panico" ? "M-82 -404 L-26 -414 M82 -404 L26 -414" : cara === "enojado" ? "M-82 -396 L-28 -380 M82 -396 L28 -380" : cara === "dormido" || cara === "feliz" ? "M-80 -386 L-30 -392 M80 -386 L30 -392" : "M-80 -380 L-28 -392 M80 -380 L28 -392";
    const boca = cara === "panico" ? `<ellipse class="as-b-boca" cx="0" cy="-258" rx="24" ry="22" fill="#5a1730" stroke="${INK}" stroke-width="6"/>`
      : cara === "dormido" ? `<ellipse class="as-b-boca" cx="0" cy="-262" rx="12" ry="9" fill="#5a1730" stroke="${INK}" stroke-width="5"/>`
      : cara === "feliz" ? `<path class="as-b-boca" d="M-28 -266 Q0 -244 28 -266" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="as-b-boca" d="M-24 -258 Q0 -266 24 -258" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const ojera = (cx) => `<path d="M${cx - 36} -334 C${cx - 40} -298 ${cx + 40} -298 ${cx + 36} -334 C${cx + 20} -318 ${cx - 20} -318 ${cx - 36} -334 Z" fill="${LAV3}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M${cx - 28} -300 C${cx - 12} -288 ${cx + 12} -288 ${cx + 28} -300" fill="none" stroke="${LAV3}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>`;
    const brazo = (d, mano) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${AMB3}" stroke-width="50" stroke-linecap="round"/>${mano}`;
    const dedo = o.dedo ? `<g class="as-b-brazo">${brazo("M180 40 C200 -60 150 -170 60 -226", `<ellipse cx="40" cy="-240" rx="34" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M22 -258 L20 -322" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M22 -258 L20 -322" stroke="${PIEL}" stroke-width="17" stroke-linecap="round"/>`)}</g>` : "";
    const manos = o.manos ? `<g class="as-b-brazo">${brazo("M-200 40 C-230 -60 -200 -200 -150 -270", `<ellipse cx="-138" cy="-296" rx="40" ry="50" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`)}
        ${brazo("M200 40 C230 -60 200 -200 150 -270", `<ellipse cx="138" cy="-296" rx="40" ry="50" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`)}</g>` : "";
    const cel = o.cel ? `<g class="as-b-brazo">${brazo("M190 40 C220 -60 190 -170 120 -220", `<rect x="58" y="-330" width="92" height="160" rx="16" fill="${INK}"/><rect x="66" y="-318" width="76" height="136" rx="9" fill="${LAV2}"/>
        <circle cx="104" cy="-250" r="20" fill="${ROSA}"/><circle cx="118" cy="-200" r="32" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`)}</g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="as-b">
      <!-- camisa y delantal -->
      <path d="M-260 40 C-250 -90 -200 -190 -90 -222 L90 -222 C200 -190 250 -90 260 40 Z" fill="${AMB3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-150 40 L-130 -150 L-60 -205 L60 -205 L130 -150 L150 40 Z" fill="${LAV2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-60 -205 L-90 -228 M60 -205 L90 -228" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-60" cy="-100" r="6" fill="${LAV3}"/><circle cx="40" cy="-60" r="5" fill="${LAV3}"/><circle cx="-20" cy="-20" r="4" fill="${LAV3}"/>
      <path d="M-42 -275 L-46 -210 L46 -210 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="as-b-cabeza">
        <ellipse cx="-112" cy="-340" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-340" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -490 114 -490 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path class="as-b-luz" d="M-110 -390 C-114 -490 114 -490 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${AZ}" opacity="0"/>
        ${ojera(-50)}${ojera(50)}
        ${ojos}
        <path d="${cejas}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <path d="M-6 -340 Q-20 -300 4 -294" fill="none" stroke="${PIEL2}" stroke-width="7" stroke-linecap="round"/>
        <!-- bigote -->
        <path d="M-70 -270 C-60 -300 -20 -298 0 -284 C20 -298 60 -300 70 -270 C50 -282 20 -278 0 -270 C-20 -278 -50 -282 -70 -270 Z" fill="${NOCHE3}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        <!-- gorro de panadero -->
        <path d="M-108 -420 C-170 -440 -170 -540 -100 -550 C-90 -610 -10 -630 20 -590 C60 -630 140 -600 120 -540 C180 -520 170 -440 108 -420 Z" fill="${LAV2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-40 -560 Q-30 -500 -50 -450 M40 -570 Q50 -500 30 -450" fill="none" stroke="${LAV}" stroke-width="6" stroke-linecap="round"/>
        <rect x="-112" y="-440" width="224" height="50" rx="12" fill="${LAV2}" stroke="${INK}" stroke-width="8"/>
        <path class="as-b-gota" d="M128 -420 C140 -396 150 -380 140 -368 C130 -358 116 -366 118 -380 C120 -392 124 -404 128 -420 Z" fill="${AZ3}" stroke="${INK}" stroke-width="5" opacity="0"/>
      </g>
      ${dedo}${manos}${cel}
    </g></g>`;
  }

  // PLANILLA: ventana azulada con grilla. (x, y) arriba a la izquierda, ancho w. filas: [[n, cliente, pedido, retira], ...]
  // o.titulo, o.fs, o.rh (alto de fila), o.cols (anchos relativos). Cada fila: .as-fila .as-fila-<i>; cada celda de texto: .as-celda
  function planilla(x, y, w, filas, o) {
    o = o || {};
    const fs = o.fs || 30, rh = o.rh || 62, cols = o.cols || [0.12, 0.28, 0.4, 0.2];
    const h = 64 + rh * (filas.length + 1) + 20;
    const xs = []; let acc = x;
    cols.forEach((c) => { xs.push(acc); acc += c * w; });
    const enc = (o.encabezado || ["N°", "CLIENTE", "PEDIDO", "RETIRA"]).map((t, i) => `<text x="${xs[i] + 16}" y="${y + 64 + rh * 0.66}" font-family="IBM Plex Mono" font-weight="600" font-size="${fs * 0.8}" fill="${AZ}" letter-spacing="2" data-layout-ignore>${t}</text>`).join("");
    let lineas = "";
    for (let i = 0; i <= filas.length + 1; i++) lineas += `<path d="M${x} ${y + 64 + rh * i} H${x + w}" stroke="${AZ}" stroke-width="2" opacity="0.35"/>`;
    xs.slice(1).forEach((cx) => (lineas += `<path d="M${cx} ${y + 64} V${y + h - 20}" stroke="${AZ}" stroke-width="2" opacity="0.35"/>`));
    const rows = filas.map((f, i) => {
      const fy = y + 64 + rh * (i + 1);
      const celdas = f.map((t, j) => (t === "~" ? `<rect class="as-celda" x="${xs[j] + 16}" y="${fy + rh * 0.36}" width="${cols[j] * w * 0.62}" height="${rh * 0.28}" rx="${rh * 0.14}" fill="${AZ3}" opacity="0.3"/>`
        : `<text class="as-celda" x="${xs[j] + 16}" y="${fy + rh * 0.68}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${AZ3}">${t}</text>`)).join("");
      return `<g class="as-fila as-fila-${i}"><rect class="as-fila-fondo" x="${x + 4}" y="${fy + 3}" width="${w - 8}" height="${rh - 6}" rx="8" fill="${AZ}" opacity="0"/>${celdas}</g>`;
    }).join("");
    return `<g class="${o.cls || ""}">
      <rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="30" fill="${AZ}" opacity="0.12"/>
      <rect class="as-pl-marco" x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${AZ2}" stroke="${INK}" stroke-width="8"/>
      <path d="M${x + 4} ${y + 60} V${y + 26} Q${x + 4} ${y + 4} ${x + 26} ${y + 4} H${x + w - 26} Q${x + w - 4} ${y + 4} ${x + w - 4} ${y + 26} V${y + 60} Z" fill="${AZ}" opacity="0.9"/>
      <circle cx="${x + 34}" cy="${y + 32}" r="9" fill="${AZ2}"/><circle cx="${x + 62}" cy="${y + 32}" r="9" fill="${AZ2}"/><circle cx="${x + 90}" cy="${y + 32}" r="9" fill="${AZ2}"/>
      <text class="as-pl-titulo" x="${x + w / 2}" y="${y + 43}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${AZ2}" letter-spacing="3" data-layout-ignore>${o.titulo || "PEDIDOS · PLANILLA"}</text>
      ${lineas}${enc}${rows}
    </g>`;
  }

  // CELULAR: marco, pantalla y cabecera de chat. (x, y) arriba a la izquierda. Clase .as-cel-pantalla
  function celular(x, y, w, h, o) {
    o = o || {};
    return `<g class="${o.cls || ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="56" fill="${INK}" stroke="${LAV3}" stroke-width="6"/>
      <rect class="as-cel-pantalla" x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" rx="42" fill="${o.fondo || NOCHE}"/>
      <rect x="${x + w / 2 - 50}" y="${y + 26}" width="100" height="22" rx="11" fill="${INK}"/>
      ${o.nombre ? `<path d="M${x + 16} ${y + 150} V${y + 58} Q${x + 16} ${y + 16} ${x + 58} ${y + 16} H${x + w - 58} Q${x + w - 16} ${y + 16} ${x + w - 16} ${y + 58} V${y + 150} Z" fill="${NOCHE2}"/>
        <circle cx="${x + 80}" cy="${y + 104}" r="30" fill="${o.colorAvatar || LAV}" stroke="${INK}" stroke-width="4"/>
        <text x="${x + 128}" y="${y + 116}" font-family="Lexend" font-weight="600" font-size="34" fill="${LAV2}">${o.nombre}</text>` : ""}
    </g>`;
  }
  // GLOBO de chat. lado "d" = mío (sale a la derecha, ámbar), "i" = del otro (lavanda). Devuelve [svg, alto, ancho]
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 32, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = o.ancho || Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48 + (o.hora ? 70 : 0);
    const alto = lineas.length * fs * 1.25 + 30 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? AMB2 : LAV2);
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 14 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hora = o.hora ? `<text x="${gx + ancho - (o.ticks ? 56 : 18)}" y="${y + alto - 12}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${NOCHE3}" data-layout-ignore>${o.hora}</text>` : "";
    const ticks = o.ticks ? `<path d="M${gx + ancho - 48} ${y + alto - 24} l7 7 l12 -14 M${gx + ancho - 34} ${y + alto - 24} l7 7 l12 -14" fill="none" stroke="${o.ticks === "verde" ? VERDE2 : o.ticks === "azul" ? "#2f7fd0" : NOCHE3}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="5"/>${txt}${hora}${ticks}</g>`, alto, ancho];
  }
  // BIZCOCHO (medialuna) centrado en (x, y)
  function bizcocho(x, y, s, cls) {
    return `<g class="${cls || ""}"><g transform="${T(x, y, s)}">
      <path d="M-120 20 C-110 -40 -60 -70 0 -70 C60 -70 110 -40 120 20 C90 0 70 -4 50 6 C30 -20 -30 -20 -50 6 C-70 -4 -90 0 -120 20 Z" fill="${AMB}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-50 6 C-40 -30 -20 -50 0 -52 C20 -50 40 -30 50 6" fill="none" stroke="${AMB3}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-86 -2 C-80 -30 -60 -46 -36 -54 M86 -2 C80 -30 60 -46 36 -54" fill="none" stroke="${AMB3}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-20 -58 Q0 -64 22 -58" fill="none" stroke="${AMB2}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-104 4 Q-96 -16 -84 -24 M104 4 Q96 -16 84 -24 M-60 -40 Q-50 -20 -52 0 M60 -40 Q50 -20 52 0" fill="none" stroke="${AMB3}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="-30" cy="-36" rx="6" ry="3" fill="${AMB2}"/><ellipse cx="34" cy="-30" rx="5" ry="3" fill="${AMB2}"/>
    </g></g>`;
  }
  // DISQUETE (guardar) centrado en (x, y)
  function disquete(x, y, s, cls) {
    return `<g class="${cls || ""}"><g transform="${T(x, y, s)}">
      <path d="M-110 -120 H80 L120 -80 V110 Q120 120 110 120 H-110 Q-120 120 -120 110 V-110 Q-120 -120 -110 -120 Z" fill="${AZ}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <rect x="-70" y="-120" width="130" height="80" rx="6" fill="${AZ3}" stroke="${INK}" stroke-width="6"/><rect x="20" y="-108" width="24" height="56" rx="4" fill="${AZ2}"/>
      <rect x="-80" y="10" width="160" height="110" rx="10" fill="${LAV2}" stroke="${INK}" stroke-width="6"/>
      <path d="M-56 46 H56 M-56 80 H30" stroke="${LAV3}" stroke-width="7" stroke-linecap="round"/>
    </g></g>`;
  }
  // RUEDITA de carga (planilla trancada). Clase .as-rueda (girar con svgOrigin "x y")
  function rueda(x, y, r, color) {
    let s = "";
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      s += `<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="${(r * 0.16).toFixed(1)}" fill="${color || LAV2}" opacity="${(0.25 + (i / 8) * 0.75).toFixed(2)}"/>`;
    }
    return `<g class="as-rueda" data-o="${x} ${y}">${s}</g>`;
  }
  // CAMA vista de frente con almohada; (x, y) = centro de la almohada. Clase .as-cama
  function cama(x, y, s) {
    return `<g class="as-cama"><g transform="${T(x, y, s)}">
      <rect x="-300" y="-40" width="600" height="300" rx="40" fill="${NOCHE2}" stroke="${INK}" stroke-width="8"/>
      <path d="M-200 -70 C-210 -20 -190 50 -160 60 L160 60 C190 50 210 -20 200 -70 C120 -90 -120 -90 -200 -70 Z" fill="${LAV2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-320 120 C-200 100 200 100 320 120 L320 270 Q320 290 300 290 H-300 Q-320 290 -320 270 Z" fill="${LAV3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-260 170 Q0 150 260 170" fill="none" stroke="${LAV}" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
    </g></g>`;
  }
  // MANO que toca (índice apuntando hacia arriba); (x, y) = punta del dedo. Clase en o
  function mano(x, y, s, cls) {
    return `<g class="${cls || ""}"><g transform="${T(x, y, s)}">
      <path d="M-14 0 C-14 -10 14 -10 14 0 L14 70 L40 64 C56 62 64 72 64 86 L62 150 C60 180 40 200 10 200 L-30 200 C-56 200 -70 180 -74 150 L-80 100 C-82 86 -66 80 -56 88 L-14 116 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M14 100 L40 98 M14 130 L44 130" stroke="${PIEL2}" stroke-width="6" stroke-linecap="round"/>
    </g></g>`;
  }
  // VELADOR: pantalla ámbar que brilla. (x, y) = base
  function velador(x, y, s, cls) {
    return `<g class="${cls || ""}"><g transform="${T(x, y, s)}">
      <ellipse class="as-vel-luz" cx="0" cy="-200" rx="240" ry="200" fill="${AMB}" opacity="0.16"/>
      <path d="M0 -150 L0 -10" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M0 -150 L0 -10" stroke="${AMB3}" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="0" cy="0" rx="70" ry="16" fill="${NOCHE2}" stroke="${INK}" stroke-width="6"/>
      <path d="M-60 -290 L60 -290 L100 -150 L-100 -150 Z" fill="${AMB}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-40 -270 L-62 -170" stroke="${AMB2}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
    </g></g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function centro(el) { const b = el.getBBox(); return `${b.x + b.width / 2} ${b.y + b.height / 2}`; }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    function popSvg(el, t, o, d, desde) {
      o = o || centro(el);
      gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 0.3, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: d || 0.4, ease: "back.out(2)", immediateRender: false }, t);
    }
    // aparece suave (susurro): fade + sube un poco + desenfoque
    function suave(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, y: 18, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: d || 0.6, ease: "power2.out", immediateRender: false }, t);
    }
    function fuera(el, t, d) { tl.to(el, { opacity: 0, duration: d || 0.2, ease: "power2.in" }, t); }
    function sello(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 1.9, rotation: (rot || 0) - 6 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.12, ease: "power4.in", immediateRender: false }, t - 0.1);
      tl.fromTo(el, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t + 0.02);
    }
    function sacudon(el, t, f) {
      f = f || 1;
      [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    function vibrar(el, t, d, amp) {
      const n = Math.round((d || 0.6) / 0.05);
      for (let i = 0; i < n; i++) tl.to(el, { x: i % 2 ? -(amp || 7) : amp || 7, duration: 0.05, ease: "none" }, t + i * 0.05);
      tl.to(el, { x: 0, duration: 0.05 }, t + n * 0.05);
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    // vaivén suave (flotar), d segundos desde t
    function flotar(el, t, d, amp, per) {
      per = per || 1.6;
      const n = Math.max(1, Math.floor(d / per));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 10), duration: per / 2, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    // arcos de sonido que laten hacia afuera (los de un selector), desde t por d segundos
    function latir(sel, t, d) {
      const els = qa(sel);
      const n = Math.max(1, Math.floor(d / 0.9));
      els.forEach((el, i) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t + i * 0.15);
      });
    }
    function titilar(sel, t, d) {
      qa(sel).forEach((el, i) => {
        const o = el.dataset.o || centro(el);
        gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
        const t0 = t + (i % 5) * 0.14;
        tl.fromTo(el, { opacity: 0, scale: 0, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: 0.35, ease: "back.out(2.5)", immediateRender: false }, t0);
        const veces = Math.max(1, Math.floor(((d || 1.5) - 0.35) / 0.6));
        tl.to(el, { scale: 0.5, svgOrigin: o, duration: 0.3, yoyo: true, repeat: veces * 2 - 1, ease: "sine.inOut" }, t0 + 0.35);
      });
    }
    function roncar(sel, t, d) {
      qa(sel + " .as-z").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        const veces = Math.max(1, Math.floor((d || 2) / 1.2));
        tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -10, duration: 0.6, ease: "sine.out", yoyo: true, repeat: veces * 2 - 1, immediateRender: false }, t + i * 0.2);
      });
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        origen(b, centro(b));
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.7, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // texto HTML que se tipea (se destapa de izquierda a derecha)
    function tipear(el, t, d) {
      gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      tl.to(el, { clipPath: "inset(0 0% 0 0)", duration: d || 0.5, ease: "steps(" + Math.max(3, Math.round((d || 0.5) / 0.05)) + ")" }, t);
    }
    // texto SVG que se tipea: escala x desde la izquierda en pasos
    function tipearSvg(el, t, d) {
      const b = el.getBBox();
      gsap.set(el, { opacity: 0, svgOrigin: `${b.x} ${b.y + b.height / 2}`, smoothOrigin: false });
      tl.set(el, { opacity: 1 }, t);
      tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: d || 0.5, ease: "steps(" + Math.max(3, Math.round((d || 0.5) / 0.06)) + ")", immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
    }
    return { q, qa, origen, centro, pop, popSvg, suave, fuera, sello, sacudon, vibrar, dibujar, flotar, latir, titilar, roncar, hablar, tipear, tipearSvg, salida };
  }
  return { INK, NOCHE, NOCHE2, NOCHE3, LAV, LAV2, LAV3, AMB, AMB2, AMB3, AZ, AZ2, AZ3, ROSA, VERDE, VERDE2, PIEL, PIEL2, T,
    zzz, arcos, luna, estrella, estrellas, mic, oreja, asmrtista, beto, planilla, celular, globo, bizcocho, disquete, rueda, cama, mano, velador, kit };
})();
