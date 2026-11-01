// Piezas del reel "la-duquesa" (drama de época pastel): la señorita Clara, Don Ernesto, la cronista
// (camafeo de perfil), marcos dorados, la carta lacrada, pluma y tintero, botas, celular, araña,
// parejas bailando, paquete, y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = EP.clara(x, y, s) + ...
// y en el script: const K = EP.kit(tl, root).
window.EP = window.EP || (function () {
  const TINTA = "#3b2f3a", CREMA = "#f6efe1", CREMA2 = "#e9dcc2", CELESTE = "#a9cfe0", CELESTE2 = "#6f9fb8",
    ROSA = "#e7b7b4", ROSA2 = "#c98b8a", SALVIA = "#a7b99a", SALVIA2 = "#6f8a66", ORO = "#c9a046", ORO2 = "#9a7a2e",
    ORO3 = "#ecd38a", LACRE = "#b3262e", LACRE2 = "#7f1a20", PIEL = "#f3d3bd", PIEL2 = "#e4b49a", PELO = "#7a5236",
    CANA = "#d9d4cc", SCA = "#5ce611", SCA2 = "#3d9e0a", BLA = "#fffaf0";
  if (!document.getElementById("ep-css")) {
    const st = document.createElement("style");
    st.id = "ep-css";
    st.textContent = `
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
.ep-titulo { position: absolute; left: 0; right: 0; text-align: center; font-family: "Cinzel", serif; font-weight: 800; color: ${TINTA}; line-height: 1; white-space: nowrap; letter-spacing: 0.02em; }
.ep-titulo.oro { color: ${ORO2}; text-shadow: 0 3px 0 ${ORO3}; }
.ep-titulo.lacre { color: ${LACRE}; }
.ep-cursiva { position: absolute; font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; color: ${TINTA}; line-height: 1.05; white-space: nowrap; }
.ep-rotulo { position: absolute; box-sizing: border-box; padding: 10px 26px 8px; background: ${TINTA}; border: 3px solid ${ORO}; border-radius: 6px; box-shadow: 0 0 0 5px ${CREMA}, 0 0 0 8px ${ORO};
  font-family: "Cinzel", serif; font-weight: 700; font-size: 30px; letter-spacing: 0.14em; color: ${ORO3}; white-space: nowrap; text-align: center; }
.ep-rotulo.rosa { background: ${ROSA2}; color: ${BLA}; }
.ep-rotulo.lacre { background: ${LACRE}; color: ${BLA}; }
.ep-rotulo.salvia { background: ${SALVIA2}; color: ${BLA}; }
.ep-rotulo.verde { background: ${SCA}; color: ${TINTA}; border-color: ${TINTA}; box-shadow: 0 0 0 5px ${CREMA}, 0 0 0 8px ${TINTA}; }
.ep-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${BLA}; border: 5px solid ${TINTA}; border-radius: 34px;
  font-family: "Lexend", sans-serif; font-weight: 700; font-size: 42px; line-height: 1.12; color: ${TINTA}; text-align: center; white-space: nowrap; box-shadow: 7px 7px 0 rgba(59, 47, 58, 0.18); }
.ep-sello { position: absolute; box-sizing: border-box; padding: 14px 34px 8px; border: 8px double ${LACRE}; border-radius: 12px; color: ${LACRE};
  font-family: "Cinzel", serif; font-weight: 900; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(255, 250, 240, 0.9); }
.ep-sello.verde { border-color: ${SCA2}; color: ${SCA2}; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  const brazo = (d, col, w) => `<path d="${d}" fill="none" stroke="${TINTA}" stroke-width="${w + 12}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const mano = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r || 26}" fill="${PIEL}" stroke="${TINTA}" stroke-width="6"/>`;

  // CELULAR moderno (el anacronismo): rect con pantalla. (x, y) = esquina sup. izq.; contenido = svg extra dentro.
  // clases: .ep-cel .ep-cel-pant
  function celular(x, y, w, h, contenido, o) {
    o = o || {};
    return `<g class="ep-cel ${o.clase || ""}" transform="translate(${x} ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="${w * 0.12}" fill="${TINTA}" stroke="${TINTA}" stroke-width="6"/>
      <rect class="ep-cel-pant" x="${w * 0.06}" y="${w * 0.1}" width="${w * 0.88}" height="${h - w * 0.2}" rx="${w * 0.06}" fill="${o.pant || BLA}"/>
      <rect x="${w * 0.38}" y="${w * 0.04}" width="${w * 0.24}" height="${w * 0.03}" rx="${w * 0.015}" fill="#5a4a58"/>
      ${contenido || ""}
    </g>`;
  }

  // BOTA victoriana con cordones (de perfil, punta a la derecha). (x, y) = talón en el piso. clases: .ep-bota
  function bota(x, y, s, o) {
    o = o || {};
    const c = o.color || ROSA, c2 = o.color2 || ROSA2;
    return `<g class="ep-bota ${o.clase || ""}" transform="${T(x, y, s, o.espejo)}">
      <path d="M0 0 L0 -40 L-6 -230 C-6 -246 6 -252 20 -252 L96 -252 C108 -252 112 -244 110 -232 L104 -110 C104 -84 120 -70 150 -60 C196 -46 226 -34 232 -14 C236 0 226 6 210 6 L30 6 Z" fill="${c}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-2 -36 L28 -36 L30 6 L0 6 Z" fill="${TINTA}"/>
      <path d="M12 -252 L96 -252 L94 -226 L10 -226 Z" fill="${c2}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M70 -220 L86 -110" fill="none" stroke="${c2}" stroke-width="5"/>
      ${[-205, -180, -155, -130].map((yy, i) => `<path d="M${62 + i * 2} ${yy} L${94 + i * 1} ${yy + 18} M${94 + i} ${yy} L${62 + i * 2} ${yy + 18}" stroke="${BLA}" stroke-width="5" stroke-linecap="round"/>`).join("")}
      <path d="M118 -66 C150 -40 190 -36 222 -20" fill="none" stroke="${BLA}" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
    </g>`;
  }

  // MARCO DORADO ornamentado (rectángulo con volutas en las esquinas). (x, y, w, h). clases: .ep-marco
  function marco(x, y, w, h, o) {
    o = o || {};
    const vol = (cx, cy, sx, sy) => `<g transform="translate(${cx} ${cy}) scale(${sx} ${sy})">
      <path d="M-8 -8 C30 -30 60 -10 52 14 C46 32 22 28 24 12 C26 0 40 2 38 12" fill="none" stroke="${ORO2}" stroke-width="5" stroke-linecap="round"/>
      <path d="M-8 -8 C-30 30 -10 60 14 52 C32 46 28 22 12 24 C0 26 2 40 12 38" fill="none" stroke="${ORO2}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="-8" cy="-8" r="13" fill="${ORO3}" stroke="${ORO2}" stroke-width="5"/></g>`;
    return `<g class="ep-marco ${o.clase || ""}">
      ${o.fondo !== false ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fondo || CREMA}"/>` : ""}
      <rect class="ep-marco-borde" x="${x - 18}" y="${y - 18}" width="${w + 36}" height="${h + 36}" fill="none" stroke="${ORO}" stroke-width="22"/>
      <rect x="${x - 30}" y="${y - 30}" width="${w + 60}" height="${h + 60}" fill="none" stroke="${ORO2}" stroke-width="4"/>
      <rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="none" stroke="${ORO2}" stroke-width="3"/>
      <rect x="${x - 18}" y="${y - 18}" width="${w + 36}" height="${h + 36}" fill="none" stroke="${ORO3}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
      ${vol(x - 18, y - 18, 1, 1)}${vol(x + w + 18, y - 18, -1, 1)}${vol(x - 18, y + h + 18, 1, -1)}${vol(x + w + 18, y + h + 18, -1, -1)}
      ${o.cresta ? `<path d="M${x + w / 2 - 70} ${y - 26} C${x + w / 2 - 50} ${y - 80} ${x + w / 2 - 14} ${y - 70} ${x + w / 2} ${y - 104} C${x + w / 2 + 14} ${y - 70} ${x + w / 2 + 50} ${y - 80} ${x + w / 2 + 70} ${y - 26} Z" fill="${ORO}" stroke="${ORO2}" stroke-width="5" stroke-linejoin="round"/><circle cx="${x + w / 2}" cy="${y - 56}" r="12" fill="${ORO3}" stroke="${ORO2}" stroke-width="4"/>` : ""}
    </g>`;
  }

  // MARCO OVAL (camafeo / retrato). (cx, cy, rx, ry). clases: .ep-oval
  function oval(cx, cy, rx, ry, o) {
    o = o || {};
    return `<g class="ep-oval ${o.clase || ""}">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fondo || CELESTE}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx + 16}" ry="${ry + 16}" fill="none" stroke="${ORO}" stroke-width="22"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx + 16}" ry="${ry + 16}" fill="none" stroke="${ORO3}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx + 29}" ry="${ry + 29}" fill="none" stroke="${ORO2}" stroke-width="4"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx + 3}" ry="${ry + 3}" fill="none" stroke="${ORO2}" stroke-width="3"/>
      <path d="M${cx - 44} ${cy - ry - 22} C${cx - 30} ${cy - ry - 62} ${cx - 8} ${cy - ry - 56} ${cx} ${cy - ry - 80} C${cx + 8} ${cy - ry - 56} ${cx + 30} ${cy - ry - 62} ${cx + 44} ${cy - ry - 22} Z" fill="${ORO}" stroke="${ORO2}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M${cx - 60} ${cy + ry + 26} C${cx - 20} ${cy + ry + 50} ${cx + 20} ${cy + ry + 50} ${cx + 60} ${cy + ry + 26}" fill="none" stroke="${ORO2}" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  }

  // LA SEÑORITA CLARA: busto, origen = centro de la base. Cabeza en (0,-370).
  // o.brazo: "cel" (mano derecha con un celular frente al pecho; contenido = o.cel) | "frente" (mano en 250,-120) | "abanico" (abanico abierto en la mano derecha, 230,-250) | "frente-izq"
  // o.izq: "frente" (mano izq en -230,-160) | "frente-alta" (mano en la frente, desmayo) | "arriba" (mano arriba)
  // clases: .ep-c .ep-c-cabeza .ep-c-ojos .ep-c-cejas .ep-c-sonrisa .ep-c-o .ep-c-enojo .ep-c-corazones .ep-c-brazo .ep-c-izq .ep-c-mejillas
  function clara(x, y, s, o) {
    o = o || {};
    let der = "";
    if (o.brazo === "cel") der = `<g class="ep-c-brazo">${brazo("M140 -190 C200 -150 170 -110 110 -110", ROSA, 46)}${celular(20, -260, 120, 210, o.cel || "")}${mano(108, -112, 26)}</g>`;
    else if (o.brazo === "frente") der = `<g class="ep-c-brazo">${brazo("M140 -190 C200 -170 240 -150 250 -120", ROSA, 46)}${mano(254, -116)}</g>`;
    else if (o.brazo === "abanico") der = `<g class="ep-c-brazo">${brazo("M140 -190 C200 -200 220 -230 228 -258", ROSA, 46)}
      <g class="ep-c-abanico">${[-70, -45, -20, 5, 30, 55, 80].map((a) => `<path d="M228 -262 L${228 + 150 * Math.cos((a - 90) * Math.PI / 180)} ${-262 + 150 * Math.sin((a - 90) * Math.PI / 180)}" stroke="${ORO2}" stroke-width="4"/>`).join("")}
      <path d="M228 -262 L${228 + 150 * Math.cos(-160 * Math.PI / 180)} ${-262 + 150 * Math.sin(-160 * Math.PI / 180)} A150 150 0 0 1 ${228 + 150 * Math.cos(-10 * Math.PI / 180)} ${-262 + 150 * Math.sin(-10 * Math.PI / 180)} Z" fill="${CELESTE}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round" opacity="0.95"/>
      <path d="M${228 + 120 * Math.cos(-150 * Math.PI / 180)} ${-262 + 120 * Math.sin(-150 * Math.PI / 180)} A120 120 0 0 1 ${228 + 120 * Math.cos(-20 * Math.PI / 180)} ${-262 + 120 * Math.sin(-20 * Math.PI / 180)}" fill="none" stroke="${BLA}" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
      </g>${mano(228, -262, 24)}</g>`;
    let izq = "";
    if (o.izq === "frente") izq = `<g class="ep-c-izq">${brazo("M-140 -190 C-200 -170 -225 -150 -232 -150", ROSA, 46)}${mano(-236, -152)}</g>`;
    else if (o.izq === "frente-alta") izq = `<g class="ep-c-izq">${brazo("M-140 -190 C-230 -240 -190 -400 -120 -430", ROSA, 46)}${mano(-112, -432)}</g>`;
    else if (o.izq === "arriba") izq = `<g class="ep-c-izq">${brazo("M-140 -190 C-210 -220 -230 -300 -228 -360", ROSA, 46)}${mano(-228, -368)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ep-c">
      <!-- vestido: escote, mangas abullonadas -->
      <path d="M-230 40 C-226 -90 -190 -170 -120 -200 C-60 -170 60 -170 120 -200 C190 -170 226 -90 230 40 Z" fill="${o.vestido || ROSA}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/>
      <ellipse cx="-150" cy="-190" rx="62" ry="48" fill="${o.vestido || ROSA}" stroke="${TINTA}" stroke-width="7"/>
      <ellipse cx="150" cy="-190" rx="62" ry="48" fill="${o.vestido || ROSA}" stroke="${TINTA}" stroke-width="7"/>
      <path d="M-120 -200 C-60 -120 60 -120 120 -200" fill="${PIEL}" stroke="${TINTA}" stroke-width="6"/>
      <path d="M-160 -60 C-80 -40 80 -40 160 -60" fill="none" stroke="${BLA}" stroke-width="10" stroke-linecap="round" opacity="0.7"/>
      <path d="M-120 -200 C-60 -120 60 -120 120 -200" fill="none" stroke="${BLA}" stroke-width="8" stroke-dasharray="1 14" stroke-linecap="round"/>
      <!-- cuello y collar de perlas -->
      <path d="M-34 -250 L-34 -180 C-20 -168 20 -168 34 -180 L34 -250 Z" fill="${PIEL}" stroke="${TINTA}" stroke-width="6"/>
      ${[-40, -27, -13, 0, 13, 27, 40].map((px) => `<circle cx="${px}" cy="${-172 + Math.abs(px) * -0.35 + 10}" r="7" fill="${BLA}" stroke="${TINTA}" stroke-width="2.5"/>`).join("")}
      <g class="ep-c-cabeza">
        <!-- rodete alto y bucles -->
        <ellipse cx="0" cy="-520" rx="78" ry="56" fill="${PELO}" stroke="${TINTA}" stroke-width="7"/>
        <path d="M-118 -380 C-130 -470 -70 -500 0 -500 C70 -500 130 -470 118 -380 Z" fill="${PELO}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/>
        <ellipse cx="0" cy="-360" rx="100" ry="118" fill="${PIEL}" stroke="${TINTA}" stroke-width="7"/>
        <path d="M-102 -390 C-80 -460 -20 -470 0 -440 C20 -470 80 -460 102 -390 C90 -430 40 -446 0 -420 C-40 -446 -90 -430 -102 -390 Z" fill="${PELO}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-112 -380 C-136 -340 -110 -300 -128 -270" fill="none" stroke="${PELO}" stroke-width="16" stroke-linecap="round"/>
        <path d="M112 -380 C136 -340 110 -300 128 -270" fill="none" stroke="${PELO}" stroke-width="16" stroke-linecap="round"/>
        <!-- moño celeste en el rodete -->
        <path d="M40 -560 L96 -590 L92 -540 Z M40 -560 L100 -548 L74 -510 Z" fill="${CELESTE}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="40" cy="-560" r="12" fill="${CELESTE2}" stroke="${TINTA}" stroke-width="4"/>
        <g class="ep-c-mejillas"><ellipse cx="-58" cy="-318" rx="22" ry="13" fill="${ROSA}" opacity="0.9"/><ellipse cx="58" cy="-318" rx="22" ry="13" fill="${ROSA}" opacity="0.9"/></g>
        <g class="ep-c-ojos"><ellipse cx="-38" cy="-366" rx="10" ry="15" fill="${TINTA}"/><ellipse cx="38" cy="-366" rx="10" ry="15" fill="${TINTA}"/>
          <path d="M-56 -380 L-64 -392 M-48 -384 L-52 -397 M56 -380 L64 -392 M48 -384 L52 -397" stroke="${TINTA}" stroke-width="4" stroke-linecap="round"/></g>
        <g class="ep-c-corazones" opacity="0">${[-38, 38].map((cx) => `<path d="M${cx} -352 C${cx - 34} -376 ${cx - 22} -402 ${cx} -386 C${cx + 22} -402 ${cx + 34} -376 ${cx} -352 Z" fill="${LACRE}" stroke="${TINTA}" stroke-width="4"/>`).join("")}</g>
        <g class="ep-c-cejas"><path d="M-62 -404 C-46 -414 -26 -414 -14 -406" fill="none" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/><path d="M62 -404 C46 -414 26 -414 14 -406" fill="none" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/></g>
        <path class="ep-c-sonrisa" d="M-30 -298 C-14 -280 14 -280 30 -298" fill="${LACRE}" stroke="${TINTA}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse class="ep-c-o" cx="0" cy="-292" rx="16" ry="22" fill="${LACRE2}" stroke="${TINTA}" stroke-width="5" opacity="0"/>
        <path class="ep-c-enojo" d="M-26 -284 C-12 -298 12 -298 26 -284" fill="none" stroke="${TINTA}" stroke-width="7" stroke-linecap="round" opacity="0"/>
      </g>
      ${izq}${der}
    </g></g>`;
  }

  // DON ERNESTO: busto, origen = centro de la base. Cabeza en (0,-360).
  // o.brazo: "pluma" (mano derecha con pluma, 240,-130) | "bota" (sostiene una bota, 250,-200) | "arriba" | "frente"
  // o.izq: "pecho" (mano en el pecho, ofendido) | "arriba"
  // clases: .ep-e .ep-e-cabeza .ep-e-monoculo .ep-e-cejas .ep-e-seria .ep-e-grito .ep-e-sonrisa .ep-e-brazo .ep-e-izq .ep-e-sombrero .ep-e-gotas
  function ernesto(x, y, s, o) {
    o = o || {};
    let der = "";
    if (o.brazo === "pluma") der = `<g class="ep-e-brazo">${brazo("M150 -190 C210 -170 240 -150 244 -120", SALVIA2, 54)}
      <g class="ep-e-pluma">${pluma(244, -124, 0.9, { rot: 25 })}</g>${mano(244, -120, 28)}</g>`;
    else if (o.brazo === "bota") der = `<g class="ep-e-brazo">${brazo("M150 -190 C220 -190 250 -230 254 -280", SALVIA2, 54)}<g class="ep-e-bota">${bota(200, -250, 0.85, { color: o.botaColor })}</g>${mano(254, -286, 28)}</g>`;
    else if (o.brazo === "arriba") der = `<g class="ep-e-brazo">${brazo("M150 -190 C220 -210 250 -280 250 -340", SALVIA2, 54)}${mano(250, -350, 28)}</g>`;
    else if (o.brazo === "frente") der = `<g class="ep-e-brazo">${brazo("M150 -190 C210 -170 250 -130 256 -80", SALVIA2, 54)}${mano(258, -76, 28)}</g>`;
    let izq = "";
    if (o.izq === "pecho") izq = `<g class="ep-e-izq">${brazo("M-150 -190 C-160 -120 -110 -100 -60 -110", SALVIA2, 54)}${mano(-56, -112, 28)}</g>`;
    else if (o.izq === "arriba") izq = `<g class="ep-e-izq">${brazo("M-150 -190 C-220 -210 -250 -280 -250 -340", SALVIA2, 54)}${mano(-250, -350, 28)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ep-e">
      <!-- levita salvia con solapas, chaleco crema, corbata ancha -->
      <path d="M-240 40 C-236 -110 -180 -196 -84 -216 L84 -216 C180 -196 236 -110 240 40 Z" fill="${SALVIA2}" stroke="${TINTA}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -214 L0 -40 L70 -214 Z" fill="${CREMA}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>
      ${[-120, -90, -60].map((yy) => `<circle cx="0" cy="${yy}" r="7" fill="${ORO}" stroke="${TINTA}" stroke-width="3"/>`).join("")}
      <path d="M-84 -216 L-20 -60 L-60 -60 L-130 -190 Z M84 -216 L20 -60 L60 -60 L130 -190 Z" fill="${SALVIA}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-40 -226 C-20 -200 20 -200 40 -226 L30 -170 C10 -160 -10 -160 -30 -170 Z" fill="${BLA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M0 -190 L-40 -212 L-40 -168 Z M0 -190 L40 -212 L40 -168 Z" fill="${LACRE}" stroke="${TINTA}" stroke-width="4" stroke-linejoin="round"/>
      <!-- cadena del reloj -->
      <path d="M-150 -40 C-110 -10 -70 -20 -40 -50" fill="none" stroke="${ORO}" stroke-width="5" stroke-dasharray="6 5"/>
      <g class="ep-e-cabeza">
        <path d="M-30 -240 L-30 -190 L30 -190 L30 -240 Z" fill="${PIEL}" stroke="${TINTA}" stroke-width="6"/>
        <ellipse cx="0" cy="-350" rx="104" ry="120" fill="${PIEL}" stroke="${TINTA}" stroke-width="7"/>
        <!-- pelado con costados canosos y patillas -->
        <path d="M-104 -360 C-120 -420 -96 -450 -80 -440 C-90 -400 -84 -340 -60 -290 C-80 -280 -100 -300 -104 -360 Z" fill="${CANA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M104 -360 C120 -420 96 -450 80 -440 C90 -400 84 -340 60 -290 C80 -280 100 -300 104 -360 Z" fill="${CANA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
        <ellipse cx="-104" cy="-352" rx="16" ry="24" fill="${PIEL2}" stroke="${TINTA}" stroke-width="5"/>
        <ellipse cx="104" cy="-352" rx="16" ry="24" fill="${PIEL2}" stroke="${TINTA}" stroke-width="5"/>
        <g class="ep-e-cejas"><path d="M-64 -400 L-16 -392" stroke="${CANA}" stroke-width="12" stroke-linecap="round"/><path d="M-64 -400 L-16 -392" stroke="${TINTA}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
          <path d="M64 -400 L16 -392" stroke="${CANA}" stroke-width="12" stroke-linecap="round"/><path d="M64 -400 L16 -392" stroke="${TINTA}" stroke-width="3" stroke-linecap="round" opacity="0.6"/></g>
        <circle cx="-38" cy="-364" r="9" fill="${TINTA}"/><circle cx="38" cy="-364" r="9" fill="${TINTA}"/>
        <g class="ep-e-monoculo"><circle cx="38" cy="-364" r="28" fill="${BLA}" fill-opacity="0.35" stroke="${ORO2}" stroke-width="6"/><path d="M62 -350 C80 -300 70 -250 92 -210" fill="none" stroke="${ORO2}" stroke-width="3"/></g>
        <path d="M0 -360 C-10 -330 -12 -318 0 -314 C10 -312 14 -322 10 -330" fill="${PIEL2}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
        <!-- bigote de manubrio -->
        <path d="M0 -300 C-30 -316 -70 -310 -92 -326 C-84 -296 -40 -284 0 -292 C40 -284 84 -296 92 -326 C70 -310 30 -316 0 -300 Z" fill="${CANA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
        <path class="ep-e-seria" d="M-26 -272 L26 -272" stroke="${TINTA}" stroke-width="7" stroke-linecap="round"/>
        <path class="ep-e-sonrisa" d="M-28 -276 C-12 -260 12 -260 28 -276" fill="none" stroke="${TINTA}" stroke-width="7" stroke-linecap="round" opacity="0"/>
        <ellipse class="ep-e-grito" cx="0" cy="-268" rx="30" ry="26" fill="${LACRE2}" stroke="${TINTA}" stroke-width="6" opacity="0"/>
        <g class="ep-e-gotas" opacity="0"><path d="M-120 -420 C-128 -404 -128 -394 -120 -392 C-112 -394 -112 -404 -120 -420 Z" fill="${CELESTE}" stroke="${TINTA}" stroke-width="3"/><path d="M128 -436 C120 -420 120 -410 128 -408 C136 -410 136 -420 128 -436 Z" fill="${CELESTE}" stroke="${TINTA}" stroke-width="3"/></g>
        ${o.sombrero ? `<g class="ep-e-sombrero"><rect x="-80" y="-620" width="160" height="160" rx="8" fill="${TINTA}" stroke="${TINTA}" stroke-width="6"/><rect x="-80" y="-500" width="160" height="26" fill="${LACRE}"/><ellipse cx="0" cy="-462" rx="140" ry="22" fill="${TINTA}"/></g>` : ""}
      </g>
      ${izq}${der}
    </g></g>`;
  }

  // PLUMA de escribir (pluma de ave). (x, y) = punta. o.rot: grados. clases: .ep-pluma
  function pluma(x, y, s, o) {
    o = o || {};
    return `<g class="ep-pluma ${o.clase || ""}" transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s || 1})">
      <path d="M0 0 L8 -30" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/>
      <path d="M6 -24 C-30 -110 -10 -230 60 -300 C70 -220 60 -110 6 -24 Z" fill="${BLA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M8 -30 C20 -120 40 -210 60 -296" fill="none" stroke="${TINTA}" stroke-width="3"/>
      ${[-80, -120, -160, -200, -240].map((yy, i) => `<path d="M${14 + i * 9} ${yy} L${-6 + i * 6} ${yy - 30}" stroke="${CELESTE2}" stroke-width="3" stroke-linecap="round"/>`).join("")}
    </g>`;
  }

  // TINTERO. (x, y) = base al centro. clases: .ep-tintero
  function tintero(x, y, s) {
    return `<g class="ep-tintero" transform="${T(x, y, s)}">
      <path d="M-60 0 L-70 -60 C-70 -90 70 -90 70 -60 L60 0 Z" fill="${CELESTE2}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>
      <rect x="-30" y="-110" width="60" height="30" rx="6" fill="${ORO}" stroke="${TINTA}" stroke-width="5"/>
      <path d="M-40 -50 C-20 -40 20 -40 40 -50" fill="none" stroke="${BLA}" stroke-width="5" opacity="0.6" stroke-linecap="round"/>
    </g>`;
  }

  // LACRE (sello de cera). (cx, cy, r). clases: .ep-lacre
  function lacre(cx, cy, r, o) {
    o = o || {};
    const pts = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2, rr = r * (i % 2 ? 0.9 : 1.05); return `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; });
    return `<g class="ep-lacre ${o.clase || ""}">
      <path d="M${pts.join(" L")} Z" fill="${LACRE}" stroke="${LACRE2}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="${LACRE2}" stroke-width="5"/>
      <text x="${cx}" y="${cy + r * 0.28}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="${r * 0.8}" fill="${LACRE2}">${o.letra || "E"}</text>
      <path d="M${cx - r * 0.5} ${cy - r * 0.55} C${cx - r * 0.2} ${cy - r * 0.75} ${cx + r * 0.2} ${cy - r * 0.75} ${cx + r * 0.4} ${cy - r * 0.6}" fill="none" stroke="#e0646a" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
    </g>`;
  }

  // SOBRE cerrado con lacre. (x, y, w, h). clases: .ep-sobre .ep-sobre-lacre
  function sobre(x, y, w, h, o) {
    o = o || {};
    return `<g class="ep-sobre ${o.clase || ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${CREMA2}" stroke="${TINTA}" stroke-width="7"/>
      <path d="M${x} ${y + h} L${x + w / 2} ${y + h * 0.5} L${x + w} ${y + h}" fill="none" stroke="${TINTA}" stroke-width="4" opacity="0.45"/>
      <path d="M${x} ${y} L${x + w / 2} ${y + h * 0.58} L${x + w} ${y}" fill="${CREMA}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>
      ${o.texto ? `<text x="${x + w * 0.5}" y="${y + h * 0.86}" text-anchor="middle" font-family="Cormorant Garamond" font-style="italic" font-weight="500" font-size="${h * 0.12}" fill="${TINTA}">${o.texto}</text>` : ""}
      <g class="ep-sobre-lacre">${lacre(x + w / 2, y + h * 0.56, Math.min(w, h) * 0.16, { letra: o.letra })}</g>
    </g>`;
  }

  // ARAÑA de cristal (candelabro). (x, y) = enganche arriba; cuerda = largo de la cadena hacia arriba (400). clases: .ep-arana
  function arana(x, y, s, cuerda) {
    const brazos = [-150, -90, -30, 30, 90, 150].map((dx) => `<path d="M0 120 C${dx * 0.4} 150 ${dx} 150 ${dx} 110" fill="none" stroke="${ORO2}" stroke-width="7" stroke-linecap="round"/>
      <rect x="${dx - 9}" y="70" width="18" height="40" rx="4" fill="${BLA}" stroke="${TINTA}" stroke-width="3"/>
      <path class="ep-llama" d="M${dx} 70 C${dx - 9} 56 ${dx - 4} 44 ${dx} 36 C${dx + 4} 44 ${dx + 9} 56 ${dx} 70 Z" fill="${ORO3}" stroke="${ORO}" stroke-width="2"/>
      <path d="M${dx} 150 L${dx} 186" stroke="${CELESTE}" stroke-width="4"/><path d="M${dx - 8} 186 L${dx} 206 L${dx + 8} 186 Z" fill="${CELESTE}" stroke="${CELESTE2}" stroke-width="2"/>`).join("");
    return `<g class="ep-arana" transform="${T(x, y, s)}">
      <path d="M0 ${-(cuerda ?? 400)} L0 80" stroke="${ORO2}" stroke-width="6"/>
      <ellipse cx="0" cy="120" rx="44" ry="22" fill="${ORO}" stroke="${ORO2}" stroke-width="5"/>
      ${brazos}
      <path d="M-8 150 L0 190 L8 150 Z" fill="${ORO}" stroke="${ORO2}" stroke-width="3"/>
    </g>`;
  }

  // PAREJA BAILANDO (silueta). (x, y) = pies al centro. clases: .ep-pareja
  function pareja(x, y, s, o) {
    o = o || {};
    const c = o.color || TINTA;
    return `<g class="ep-pareja ${o.clase || ""}" transform="${T(x, y, s, o.espejo)}">
      <!-- dama con falda amplia -->
      <circle cx="-34" cy="-250" r="26" fill="${c}"/><ellipse cx="-34" cy="-286" rx="20" ry="14" fill="${c}"/>
      <path d="M-50 -224 L-18 -224 L-10 -150 L-34 -140 L-58 -150 Z" fill="${c}"/>
      <path d="M-58 -150 C-110 -90 -120 -30 -130 0 L60 0 C40 -40 20 -100 -10 -150 Z" fill="${o.falda || c}"/>
      <!-- caballero de frac -->
      <circle cx="40" cy="-290" r="26" fill="${c}"/>
      <path d="M20 -262 L60 -262 L70 -120 L56 0 L40 0 L40 -110 L30 0 L14 0 L12 -120 Z" fill="${c}"/>
      <path d="M60 -250 C30 -230 0 -220 -20 -210" stroke="${c}" stroke-width="16" stroke-linecap="round" fill="none"/>
      <path d="M22 -250 C0 -260 -30 -270 -50 -290" stroke="${c}" stroke-width="14" stroke-linecap="round" fill="none"/>
    </g>`;
  }

  // PAQUETE con moño (el envío). (x, y, w, h). clases: .ep-paquete
  function paquete(x, y, w, h, o) {
    o = o || {};
    return `<g class="ep-paquete ${o.clase || ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${o.color || CELESTE}" stroke="${TINTA}" stroke-width="7"/>
      <rect x="${x + w / 2 - 16}" y="${y}" width="32" height="${h}" fill="${ROSA}" stroke="${TINTA}" stroke-width="4"/>
      <rect x="${x}" y="${y + h / 2 - 16}" width="${w}" height="32" fill="${ROSA}" stroke="${TINTA}" stroke-width="4"/>
      <path d="M${x + w / 2} ${y} C${x + w / 2 - 80} ${y - 70} ${x + w / 2 - 90} ${y - 10} ${x + w / 2} ${y} C${x + w / 2 + 90} ${y - 10} ${x + w / 2 + 80} ${y - 70} ${x + w / 2} ${y} Z" fill="${ROSA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>
    </g>`;
  }

  // CAMAFEO de la cronista: perfil de dama con abanico, dentro del oval. clases: .ep-cron
  function cronista(cx, cy, s) {
    return `<g class="ep-cron" transform="${T(cx, cy, s)}">
      <path d="M40 140 C40 90 20 70 10 50 C4 36 -6 30 -4 18 C0 8 -14 4 -10 -6 C-6 -12 -16 -18 -10 -26 C-2 -34 -6 -50 -10 -64 C-20 -110 20 -150 70 -146 C110 -142 130 -100 126 -60 C150 -80 160 -40 140 -20 C130 0 120 30 110 60 C100 90 120 120 140 140 Z" fill="${CREMA}"/>
      <ellipse cx="70" cy="-160" rx="58" ry="40" fill="${CREMA}"/>
      <circle cx="16" cy="-170" r="20" fill="${CREMA}"/>
      <path d="M-100 140 C-80 60 -20 40 30 60 C60 74 90 100 100 140 Z" fill="${CREMA}"/>
    </g>`;
  }

  // CHAT: un globo de mensaje dentro de un celular. (x, y) esquina; w ancho. clases opcionales.
  function msj(x, y, w, texto, o) {
    o = o || {};
    const h = o.h || 64, der = o.der;
    return `<g class="ep-msj ${o.clase || ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${der ? (o.color || ROSA) : CREMA2}" stroke="${TINTA}" stroke-width="3"/>
      <text x="${x + 22}" y="${y + h / 2 + (o.fs || 30) * 0.36}" font-family="Lexend" font-weight="600" font-size="${o.fs || 30}" fill="${TINTA}">${texto}</text>
      ${o.hora ? `<text x="${x + w - 14}" y="${y + h + 26}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="20" fill="${TINTA}" opacity="0.7">${o.hora}</text>` : ""}
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
    // cara de Clara: "sonrisa" | "o" | "enojo"
    function caraC(t, cual) {
      ["sonrisa", "o", "enojo"].forEach((b) => { const el = q(".ep-c-" + b); if (el) tl.set(el, { opacity: b === cual ? 1 : 0 }, t); });
    }
    // cara de Ernesto: "seria" | "sonrisa" | "grito"
    function caraE(t, cual) {
      ["seria", "sonrisa", "grito"].forEach((b) => { const el = q(".ep-e-" + b); if (el) tl.set(el, { opacity: b === cual ? 1 : 0 }, t); });
    }
    // boca que habla (escala vertical), sel = ".ep-e-grito" etc.
    function hablar(sel, t, veces, d) {
      const el = q(sel);
      if (!el) return;
      tl.fromTo(el, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popS, sello, sacudon, dibujar, caraC, caraE, hablar, salida };
  }
  return { TINTA, CREMA, CREMA2, CELESTE, CELESTE2, ROSA, ROSA2, SALVIA, SALVIA2, ORO, ORO2, ORO3, LACRE, LACRE2, PIEL, PIEL2, PELO, CANA, SCA, SCA2, BLA,
    celular, bota, marco, oval, clara, ernesto, pluma, tintero, lacre, sobre, arana, pareja, paquete, cronista, msj, kit };
})();
