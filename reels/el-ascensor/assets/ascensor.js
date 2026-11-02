// Piezas dibujadas del reel "El ascensor" (personajes planos con contorno tinta). Se cargan con
// <script src="assets/ascensor.js"></script> en cada escena; devuelven strings SVG para meter en un
// <svg viewBox="0 0 1080 1920">. Y en el script: const K = AS.kit(tl, root).
window.AS = window.AS || (function () {
  const INK = "#14181d", ACE = "#b8c0c8", ACE2 = "#dfe4e8", ACE3 = "#6b7580", NAR = "#ff8a1f", NAR2 = "#3a2410",
    ROJO = "#e5303a", ROJO2 = "#ff7a80", ROJO3 = "#a81c25", CRE = "#fff6e3", MAD = "#c98a4b", MAD2 = "#8f5a2b",
    POST = "#ffd84a", POST2 = "#e0b520", PIEL = "#f0c09a", PIEL2 = "#d9996c", PELO = "#3b2a24", CANA = "#c9ccd1",
    VERDE = "#5ce611", VERDE2 = "#3f9e0b", BOCA = "#7a1420", AMBAR = "#ffd166";
  if (!document.getElementById("as-css")) {
    const st = document.createElement("style");
    st.id = "as-css";
    st.textContent = `
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.as-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${CRE}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 7px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}; letter-spacing: -0.01em; }
.as-titulo.nar { color: ${NAR}; } .as-titulo.rojo { color: ${ROJO2}; } .as-titulo.verde { color: ${VERDE}; } .as-titulo.ambar { color: ${AMBAR}; }
.as-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${NAR}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${NAR}; white-space: nowrap; text-align: center; }
.as-tag.rojo { background: ${ROJO}; border-color: ${CRE}; color: ${CRE}; }
.as-tag.verde { background: ${INK}; border-color: ${VERDE}; color: ${VERDE}; }
.as-tag.ambar { border-color: ${AMBAR}; color: ${AMBAR}; }
.as-sello { position: absolute; box-sizing: border-box; padding: 10px 28px 8px; border: 9px solid ${ROJO}; border-radius: 14px; color: ${ROJO};
  font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: 0.04em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(255, 246, 227, 0.95); }
.as-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.as-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.25);
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
.as-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: ${INK}; white-space: nowrap; line-height: 1; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  const brazo = (d, color, ancho) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${(ancho || 64) + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho || 64}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const manito = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 30}" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`;

  // gotas de sudor (clase .as-gota): en coords de la cabeza
  const gotas = (lista) => lista.map(([x, y, s]) => `<path class="as-gota" d="M${x} ${y - 26 * s} Q${x + 15 * s} ${y - 2 * s} ${x + 12 * s} ${y + 8 * s} Q${x} ${y + 22 * s} ${x - 12 * s} ${y + 8 * s} Q${x - 15 * s} ${y - 2 * s} ${x} ${y - 26 * s} Z" fill="#bfe6ff" stroke="${INK}" stroke-width="4"/>`).join("");

  // CELULAR chico en la mano: centro (x, y), rot. clase .as-cel
  function celu(x, y, rot, s, pantalla) {
    return `<g class="as-cel"><g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})"><rect x="-44" y="-80" width="88" height="160" rx="16" fill="${INK}"/><rect x="-36" y="-66" width="72" height="128" rx="8" fill="${pantalla || "#2a3440"}"/><rect x="-30" y="-56" width="44" height="10" rx="5" fill="${ACE2}" opacity="0.8"/><rect x="-30" y="-38" width="56" height="10" rx="5" fill="${ACE2}" opacity="0.5"/><rect x="-30" y="-20" width="36" height="10" rx="5" fill="${ACE2}" opacity="0.5"/></g></g>`;
  }

  // POST-IT: centro (x, y), rot, texto (1-3 líneas), o.w, o.fs. clase .as-post
  function postit(x, y, rot, lineas, o) {
    o = o || {};
    const w = o.w || 200, fs = o.fs || 40;
    lineas = Array.isArray(lineas) ? lineas : [lineas];
    const txt = lineas.map((l, i) => `<text x="0" y="${-((lineas.length - 1) * fs * 0.95) / 2 + i * fs * 0.95 + fs * 0.32}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    return `<g class="as-post ${o.cls || ""}" data-layout-allow-overlap><g transform="translate(${x} ${y}) rotate(${rot || 0})"><path d="M${-w / 2} ${-w / 2} L${w / 2} ${-w / 2} L${w / 2} ${w / 2 - 26} L${w / 2 - 26} ${w / 2} L${-w / 2} ${w / 2} Z" fill="${o.color || POST}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${w / 2} ${w / 2 - 26} L${w / 2 - 26} ${w / 2 - 26} L${w / 2 - 26} ${w / 2}" fill="${POST2}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><rect x="${-w / 2}" y="${-w / 2}" width="${w}" height="22" fill="${POST2}" opacity="0.5"/>${txt}</g></g>`;
  }

  // RUBÉN, el carpintero: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.cara: "nervioso" (default, sonrisa forzada) | "culpa" | "sorpresa" | "triste" | "orgullo" | "indignado" | "duda"
  // o.brazo: "" | "postit" (levanta un post-it en la derecha) | "celular" | "senala" (señala a la derecha) | "hombros" (manos arriba)
  // o.sudor: true. clases: .as-r .as-r-cabeza .as-r-boca .as-r-brazo .as-gota .as-r-ojos
  function ruben(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "nervioso";
    const cejas = {
      nervioso: "M-80 -402 Q-56 -420 -28 -400 M80 -402 Q56 -420 28 -400",
      culpa: "M-80 -394 L-28 -410 M80 -394 L28 -410",
      sorpresa: "M-80 -420 Q-54 -440 -28 -420 M80 -420 Q54 -440 28 -420",
      triste: "M-80 -390 L-28 -408 M80 -390 L28 -408",
      orgullo: "M-80 -404 Q-54 -418 -28 -406 M80 -404 Q54 -418 28 -406",
      indignado: "M-80 -414 L-28 -394 M80 -414 L28 -394",
      duda: "M-80 -398 L-28 -398 M80 -414 Q54 -428 28 -410",
    }[cara] || "M-80 -402 Q-56 -420 -28 -400 M80 -402 Q56 -420 28 -400";
    const ojoBola = (cx, cy, r, dx) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="5"/><circle cx="${cx + (dx || 0)}" cy="${cy + 2}" r="${r * 0.42}" fill="${INK}"/>`;
    const ojos = cara === "orgullo" ? `<path d="M-74 -360 Q-52 -382 -30 -360 M74 -360 Q52 -382 30 -360" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "sorpresa" || cara === "nervioso" ? ojoBola(-52, -364, 22, 0) + ojoBola(52, -364, 22, 0)
      : cara === "culpa" ? ojoBola(-52, -362, 19, 9) + ojoBola(52, -362, 19, 9)
      : cara === "triste" ? `<path d="M-72 -356 Q-52 -342 -32 -356 M72 -356 Q52 -342 32 -356" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<ellipse cx="-52" cy="-362" rx="11" ry="14" fill="${INK}"/><ellipse cx="52" cy="-362" rx="11" ry="14" fill="${INK}"/><circle cx="-48" cy="-367" r="4" fill="#ffffff"/><circle cx="56" cy="-367" r="4" fill="#ffffff"/>`;
    const boca = {
      nervioso: `<path class="as-r-boca" d="M-52 -268 Q0 -240 52 -268 L48 -250 Q0 -214 -48 -250 Z" fill="#ffffff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-34 -256 L-34 -236 M-12 -250 L-12 -228 M12 -250 L12 -228 M34 -256 L34 -236" stroke="${INK}" stroke-width="4"/>`,
      culpa: `<path class="as-r-boca" d="M-38 -248 Q-20 -262 0 -248 Q20 -234 38 -250" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`,
      sorpresa: `<ellipse class="as-r-boca" cx="0" cy="-246" rx="22" ry="28" fill="${BOCA}" stroke="${INK}" stroke-width="6"/>`,
      triste: `<path class="as-r-boca" d="M-34 -236 Q0 -266 34 -236" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`,
      orgullo: `<path class="as-r-boca" d="M-44 -266 Q0 -218 44 -266 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-38 -264 L38 -264" stroke="#ffffff" stroke-width="7"/>`,
      indignado: `<path class="as-r-boca" d="M-38 -236 Q0 -274 38 -236 Q0 -224 -38 -236 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`,
      duda: `<path class="as-r-boca" d="M-30 -250 L30 -258" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`,
    }[cara];
    let br = "";
    if (o.brazo === "postit") br = `<g class="as-r-brazo">${brazo("M170 -150 C230 -230 250 -330 240 -420", CRE)}${manito(240, -440, 34)}${postit(250, -560, 6, o.postit || ["Llamar a", "la del", "placard"], { w: 210, fs: 40, cls: "as-r-post" })}</g>`;
    else if (o.brazo === "celular") br = `<g class="as-r-brazo">${brazo("M-170 -60 C-150 -160 -80 -200 -20 -200", CRE)}${celu(10, -250, -8, 1)}${manito(-10, -200, 32)}</g>`;
    else if (o.brazo === "senala") br = `<g class="as-r-brazo">${brazo("M170 -150 C250 -190 320 -240 390 -280", CRE)}${manito(404, -288, 32)}<path d="M420 -300 L476 -326" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M420 -300 L476 -326" stroke="${PIEL}" stroke-width="16" stroke-linecap="round"/></g>`;
    else if (o.brazo === "hombros") br = `<g class="as-r-brazo">${brazo("M-180 -120 C-260 -170 -300 -250 -290 -330", CRE)}${brazo("M180 -120 C260 -170 300 -250 290 -330", CRE)}
        <path d="M-320 -380 L-310 -340 L-268 -340 L-258 -380" fill="${PIEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${manito(-290, -350, 32)}${manito(290, -350, 32)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="as-r">
      <!-- camisa crema, delantal de carpintero de madera con bolsillo y lápiz -->
      <path d="M-250 40 C-252 -110 -200 -205 -90 -222 L90 -222 C200 -205 252 -110 250 40 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -222 L0 -150 L60 -222" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-150 40 L-140 -120 L140 -120 L150 40 Z" fill="${MAD}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-140 -120 L-90 -222 M140 -120 L90 -222" stroke="${MAD2}" stroke-width="16" stroke-linecap="round"/>
      <rect x="-70" y="-70" width="140" height="70" rx="8" fill="${MAD2}" stroke="${INK}" stroke-width="6"/>
      <path d="M-40 -70 L-46 -116 L-30 -116 L-34 -70" fill="${NAR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <rect x="10" y="-112" width="18" height="44" rx="4" fill="${ACE}" stroke="${INK}" stroke-width="4"/>
      <path d="M-44 -282 L-48 -212 L48 -212 L44 -282 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="as-r-cabeza">
        <ellipse cx="-110" cy="-346" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="110" cy="-346" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-108 -390 C-112 -490 112 -490 108 -390 L104 -318 C98 -250 56 -224 0 -224 C-56 -224 -98 -250 -104 -318 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelado con canas a los costados -->
        <path d="M-112 -330 C-130 -380 -124 -420 -96 -436 C-90 -410 -96 -380 -100 -340 Z M112 -330 C130 -380 124 -420 96 -436 C90 -410 96 -380 100 -340 Z" fill="${CANA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -470 Q0 -480 40 -470" fill="none" stroke="${PIEL2}" stroke-width="7" stroke-linecap="round" opacity="0.8"/>
        <!-- lápiz atrás de la oreja -->
        <path d="M108 -400 L150 -300" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M108 -400 L150 -300" stroke="${NAR}" stroke-width="10" stroke-linecap="round"/>
        <path class="as-r-cejas" d="${cejas}" fill="none" stroke="${ACE3}" stroke-width="13" stroke-linecap="round"/>
        <g class="as-r-ojos">${ojos}</g>
        <path d="M0 -350 C-16 -316 -24 -300 -2 -294" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- bigote -->
        <path d="M-70 -270 C-56 -300 -14 -298 0 -284 C14 -298 56 -300 70 -270 C46 -280 14 -274 0 -268 C-14 -274 -46 -280 -70 -270 Z" fill="${CANA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        ${o.sudor ? gotas([[-118, -410, 1], [126, -300, 0.8], [-96, -460, 0.7]]) : ""}
      </g>
      ${br}
    </g></g>`;
  }

  // VALERIA, la clienta: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.cara: "seria" (default, párpados a media asta) | "ceja" | "sonrisa" (sonrisita) | "feliz" | "mira" (de reojo a la izquierda)
  // o.brazo: "cruzados" (default) | "celular" (muestra el celular) | "chau" (saluda) | "senala" (señala a la izquierda)
  // clases: .as-v .as-v-cabeza .as-v-boca .as-v-brazo .as-v-cejas
  function valeria(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "seria";
    const cejas = cara === "ceja" ? "M-74 -398 L-28 -394 M74 -428 Q52 -444 28 -420" : cara === "feliz" || cara === "sonrisa" ? "M-74 -404 Q-50 -418 -28 -404 M74 -404 Q50 -418 28 -404" : "M-74 -398 L-28 -396 M74 -398 L28 -396";
    const dx = cara === "mira" ? -10 : 0;
    const ojo = (cx) => cara === "feliz" ? `<path d="M${cx - 22} -360 Q${cx} -382 ${cx + 22} -360" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<ellipse cx="${cx}" cy="-362" rx="22" ry="20" fill="#ffffff" stroke="${INK}" stroke-width="5"/><circle cx="${cx + dx}" cy="-358" r="10" fill="${INK}"/>` +
        (cara === "seria" || cara === "mira" || (cara === "ceja" && cx < 0) || cara === "sonrisa" ? `<path d="M${cx - 25} -366 Q${cx} -390 ${cx + 25} -366 Z" fill="${PIEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>` : "") +
        `<path d="M${cx + 18} -378 L${cx + 30} -388" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    const boca = cara === "feliz" ? `<path class="as-v-boca" d="M-40 -276 Q0 -228 40 -276 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-34 -274 L34 -274" stroke="#ffffff" stroke-width="7"/>`
      : cara === "sonrisa" ? `<path class="as-v-boca" d="M-30 -268 Q4 -248 34 -278" fill="none" stroke="${ROJO3}" stroke-width="9" stroke-linecap="round"/>`
      : cara === "ceja" ? `<path class="as-v-boca" d="M-26 -262 L28 -268" fill="none" stroke="${ROJO3}" stroke-width="9" stroke-linecap="round"/>`
      : `<path class="as-v-boca" d="M-28 -264 L28 -264" fill="none" stroke="${ROJO3}" stroke-width="9" stroke-linecap="round"/>`;
    let br;
    if (o.brazo === "celular") br = `<g class="as-v-brazo">${brazo("M-150 -40 C-150 -100 -140 -150 -110 -190", ROJO, 60)}${brazo("M150 -40 C220 -150 230 -260 205 -330", ROJO, 60)}
      ${celu(215, -420, 10, 1.15, "#2a3440")}${manito(205, -345, 30)}${manito(-108, -196, 28)}</g>`;
    else if (o.brazo === "chau") br = `<g class="as-v-brazo">${brazo("M-150 -40 C-150 -100 -140 -150 -110 -190", ROJO, 60)}${manito(-108, -196, 28)}${brazo("M170 -150 C230 -230 250 -330 240 -420", ROJO, 60)}
      <path d="M210 -480 L214 -430 L270 -430 L274 -480" fill="${PIEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${manito(242, -440, 32)}</g>`;
    else if (o.brazo === "senala") br = `<g class="as-v-brazo">${brazo("M150 -40 C150 -100 140 -150 110 -190", ROJO, 60)}${manito(108, -196, 28)}${brazo("M-170 -150 C-250 -190 -320 -240 -390 -280", ROJO, 60)}${manito(-404, -288, 30)}<path d="M-420 -300 L-476 -326" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M-420 -300 L-476 -326" stroke="${PIEL}" stroke-width="16" stroke-linecap="round"/></g>`;
    else br = `<g class="as-v-brazo"><path d="M-200 -50 C-120 -120 120 -120 200 -50 L190 -10 C110 -70 -110 -70 -190 -10 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>${manito(-150, -70, 28)}${manito(150, -70, 28)}</g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="as-v">
      <!-- pelo de atrás (melena carré) -->
      <path d="M-130 -360 C-150 -480 150 -480 130 -360 L140 -230 Q100 -210 70 -230 L-70 -230 Q-100 -210 -140 -230 Z" fill="${PELO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <!-- tapado rojo con solapas y blusa crema -->
      <path d="M-240 40 C-244 -110 -190 -200 -86 -218 L86 -218 C190 -200 244 -110 240 40 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -218 L0 -120 L60 -218 Z" fill="${CRE}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-86 -218 L-30 -90 L-90 -130 L-120 -200 Z M86 -218 L30 -90 L90 -130 L120 -200 Z" fill="${ROJO3}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="0" cy="-40" r="10" fill="${INK}"/><circle cx="0" cy="10" r="10" fill="${INK}"/>
      <path d="M-40 -282 L-44 -214 L44 -214 L40 -282 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="as-v-cabeza">
        <path d="M-100 -380 C-104 -480 104 -480 100 -380 L96 -320 C90 -256 50 -230 0 -230 C-50 -230 -90 -256 -96 -320 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- flequillo -->
        <path d="M-110 -340 C-130 -470 120 -500 112 -360 C90 -400 40 -420 -10 -412 C-50 -406 -90 -380 -110 -340 Z" fill="${PELO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="-104" cy="-300" r="12" fill="${NAR}" stroke="${INK}" stroke-width="4"/><circle cx="104" cy="-300" r="12" fill="${NAR}" stroke="${INK}" stroke-width="4"/>
        <path class="as-v-cejas" d="${cejas}" fill="none" stroke="${PELO}" stroke-width="10" stroke-linecap="round"/>
        <g class="as-v-ojos">${ojo(-48)}${ojo(48)}</g>
        <path d="M0 -346 C-12 -318 -18 -306 -2 -300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
      </g>
      ${br}
    </g></g>`;
  }

  // DISPLAY DE PISOS de 7 segmentos naranja: (x, y) arriba a la izquierda de cada dígito, alto h.
  // seg7("4", x, y, h, {cls}). Segmentos apagados en marrón oscuro.
  const SEG = { "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcfgd", "-": "g", "P": "abfge", "b": "fgedc", "E": "afged", "r": "eg", " ": "" };
  function seg7(ch, x, y, h, o) {
    o = o || {};
    const w = h * 0.55, t = h * 0.12, on = SEG[ch] || "";
    const S = {
      a: [x + t, y, x + w - t, y], b: [x + w, y + t, x + w, y + h / 2 - t / 2], c: [x + w, y + h / 2 + t / 2, x + w, y + h - t],
      d: [x + t, y + h, x + w - t, y + h], e: [x, y + h / 2 + t / 2, x, y + h - t], f: [x, y + t, x, y + h / 2 - t / 2], g: [x + t, y + h / 2, x + w - t, y + h / 2],
    };
    return `<g class="${o.cls || ""}">` + Object.entries(S).map(([k, [x1, y1, x2, y2]]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${on.includes(k) ? (o.color || NAR) : (o.off || NAR2)}" stroke-width="${t}" stroke-linecap="round"/>`).join("") + "</g>";
  }

  // PLACARD de madera: base al centro (x, y), escala s. clases .as-pl .as-pl-pd (puerta derecha)
  function placard(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s)}"><g class="as-pl ${o.cls || ""}">
      <rect x="-170" y="-520" width="340" height="510" rx="10" fill="${MAD}" stroke="${INK}" stroke-width="8"/>
      <rect x="-190" y="-540" width="380" height="34" rx="8" fill="${MAD2}" stroke="${INK}" stroke-width="7"/>
      <path d="M0 -506 L0 -10" stroke="${INK}" stroke-width="7"/>
      <rect x="-150" y="-486" width="130" height="200" rx="8" fill="none" stroke="${MAD2}" stroke-width="7"/>
      <rect x="20" y="-486" width="130" height="200" rx="8" fill="none" stroke="${MAD2}" stroke-width="7"/>
      <rect x="-150" y="-260" width="130" height="200" rx="8" fill="none" stroke="${MAD2}" stroke-width="7"/>
      <rect x="20" y="-260" width="130" height="200" rx="8" fill="none" stroke="${MAD2}" stroke-width="7"/>
      <rect x="-30" y="-300" width="12" height="60" rx="6" fill="${ACE}" stroke="${INK}" stroke-width="4"/><rect x="18" y="-300" width="12" height="60" rx="6" fill="${ACE}" stroke="${INK}" stroke-width="4"/>
      <path d="M-150 -10 L-150 10 M150 -10 L150 10" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
    </g></g>`;
  }

  // COCINA (bajo mesada con hornallas), base al centro (x, y), escala s.
  function cocina(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s)}"><g class="${o.cls || ""}">
      <rect x="-190" y="-300" width="380" height="290" rx="10" fill="${CRE}" stroke="${INK}" stroke-width="8"/>
      <rect x="-210" y="-330" width="420" height="40" rx="8" fill="${ACE}" stroke="${INK}" stroke-width="7"/>
      <circle cx="-90" cy="-310" r="0" />
      <path d="M-130 -332 Q-90 -356 -50 -332 M50 -332 Q90 -356 130 -332" fill="none" stroke="${INK}" stroke-width="7"/>
      <rect x="-160" y="-260" width="150" height="220" rx="8" fill="none" stroke="${ACE3}" stroke-width="7"/>
      <rect x="10" y="-260" width="150" height="220" rx="8" fill="none" stroke="${ACE3}" stroke-width="7"/>
      <rect x="-40" y="-170" width="12" height="50" rx="6" fill="${ACE3}"/><rect x="28" y="-170" width="12" height="50" rx="6" fill="${ACE3}"/>
    </g></g>`;
  }

  // PARLANTE del intercomunicador (rejilla), centro (x, y), escala s. clases .as-int .as-int-led
  function parlante(x, y, s) {
    let rej = "";
    for (let i = -3; i <= 3; i++) rej += `<path d="M${-70} ${i * 20} L${70} ${i * 20}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    return `<g transform="${T(x, y, s)}"><g class="as-int">
      <rect x="-120" y="-130" width="240" height="300" rx="22" fill="${ACE2}" stroke="${INK}" stroke-width="8"/>
      <circle cx="0" cy="0" r="92" fill="${ACE}" stroke="${INK}" stroke-width="7"/>${rej}
      <circle class="as-int-led" cx="-70" cy="128" r="14" fill="${AMBAR}" stroke="${INK}" stroke-width="5"/>
      <text x="10" y="138" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="24" fill="${INK}" letter-spacing="2">SOS</text>
      <path d="M50 116 L90 116 L90 140 L50 140 Z" fill="${ROJO}" stroke="${INK}" stroke-width="5"/>
    </g></g>`;
  }

  // CALENDARIO de pared: hoja con mes, centro (x, y), escala s. clases .as-cal .as-cal-hoja
  function calendario(x, y, s, mes, o) {
    o = o || {};
    return `<g transform="${T(x, y, s)}"><g class="as-cal ${o.cls || ""}" data-layout-allow-overlap>
      <rect x="-150" y="-170" width="300" height="340" rx="16" fill="${CRE}" stroke="${INK}" stroke-width="8"/>
      <rect x="-150" y="-170" width="300" height="90" rx="16" fill="${o.color || ROJO}" stroke="${INK}" stroke-width="8"/>
      <circle cx="-80" cy="-176" r="12" fill="${ACE3}" stroke="${INK}" stroke-width="5"/><circle cx="80" cy="-176" r="12" fill="${ACE3}" stroke="${INK}" stroke-width="5"/>
      <text x="0" y="-108" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${o.fsMes || 44}" fill="${CRE}" letter-spacing="2">${mes}</text>
      ${o.grilla === false ? "" : Array.from({ length: 20 }, (_, i) => `<rect x="${-120 + (i % 5) * 50}" y="${-50 + Math.floor(i / 5) * 50}" width="36" height="34" rx="5" fill="${ACE2}"/>`).join("")}
    </g></g>`;
  }

  // NOTA MUSICAL dibujada (corchea), centro (x, y), escala s, color
  function nota(x, y, s, color, cls) {
    return `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><ellipse cx="-14" cy="30" rx="22" ry="16" transform="rotate(-20 -14 30)" fill="${color || NAR}" stroke="${INK}" stroke-width="5"/><path d="M6 24 L6 -46 Q30 -30 34 -6" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
  }

  // BOTONERA del ascensor: placa de acero con botones redondos (pisos) y el de alarma. centro (x, y), s.
  // clases .as-bot-<piso> en cada botón (para prenderlos), .as-bot-alarma
  function botonera(x, y, s) {
    const pisos = ["8", "7", "6", "5", "4", "3", "2", "1", "PB"];
    let b = "";
    pisos.forEach((p, i) => {
      const cx = i % 2 ? 50 : -50, cy = -250 + Math.floor(i / 2) * 110;
      const px = p === "PB" ? 0 : cx, py = p === "PB" ? 200 : cy;
      b += `<g class="as-bot-${p}"><circle cx="${px}" cy="${py}" r="40" fill="${ACE2}" stroke="${INK}" stroke-width="6"/><circle class="as-bot-luz" cx="${px}" cy="${py}" r="30" fill="none" stroke="${NAR}" stroke-width="6" opacity="0"/><text x="${px}" y="${py + 12}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${p === "PB" ? 28 : 34}" fill="${INK}">${p}</text></g>`;
    });
    return `<g transform="${T(x, y, s)}"><g class="as-bot">
      <rect x="-120" y="-330" width="240" height="680" rx="20" fill="${ACE}" stroke="${INK}" stroke-width="8"/>
      ${b}
      <g class="as-bot-alarma"><circle cx="0" cy="300" r="34" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><path d="M-12 296 Q0 270 12 296 L16 308 L-16 308 Z" fill="${CRE}" stroke="${INK}" stroke-width="3"/></g>
    </g></g>`;
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
    function centro(el) { const b = el.getBBox(); return `${b.x + b.width / 2} ${b.y + b.height / 2}`; }
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
    // la boca se mueve mientras habla
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.5, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // respira: el busto sube y baja apenas (para que nunca quede quieto)
    function respirar(el, t, d, amp) {
      const n = Math.max(1, Math.round(d / 0.9));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 6), duration: d / n / 2, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    // gotas de sudor que caen y vuelven
    function sudar(t, d) {
      qa(".as-gota").forEach((g, i) => {
        const n = Math.max(1, Math.round(d / 0.8));
        tl.fromTo(g, { y: 0, opacity: 1 }, { y: 30, opacity: 0, duration: 0.8, repeat: n - 1, ease: "power1.in", immediateRender: false }, t + i * 0.25);
      });
    }
    // parpadeo (scaleY de los ojos)
    function parpadear(sel, ts) {
      qa(sel).forEach((o) => {
        const bb = o.getBBox();
        origen(o, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        ts.forEach((t) => tl.fromTo(o, { scaleY: 1 }, { scaleY: 0.1, duration: 0.06, yoyo: true, repeat: 1, ease: "none", immediateRender: false }, t));
      });
    }
    // notas musicales que suben flotando (sel = grupos con transform propio: se animan en un <g> padre)
    function flotarNotas(sel, t, d) {
      qa(sel).forEach((el, i) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: 40, x: 0 }, { opacity: 1, y: -10, duration: 0.5, ease: "power2.out", immediateRender: false }, t + i * 0.3);
        tl.to(el, { y: -110, x: i % 2 ? 24 : -24, duration: d - i * 0.3 - 0.5, ease: "sine.inOut" }, t + i * 0.3 + 0.5);
        tl.to(el, { opacity: 0, duration: 0.3 }, t + d - 0.3);
      });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, centro, sello, sacudon, dibujar, hablar, respirar, sudar, parpadear, flotarNotas, salida };
  }
  return { INK, ACE, ACE2, ACE3, NAR, NAR2, ROJO, ROJO2, ROJO3, CRE, MAD, MAD2, POST, POST2, PIEL, PIEL2, PELO, CANA, VERDE, VERDE2, BOCA, AMBAR,
    ruben, valeria, celu, postit, seg7, placard, cocina, parlante, calendario, nota, botonera, gotas, kit };
})();
