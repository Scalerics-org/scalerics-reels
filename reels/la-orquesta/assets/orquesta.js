// Piezas del reel "la-orquesta": el director (dueño), la planilla con violín, el cuaderno con tambor,
// la caja registradora con trompeta, atriles, silla, público de espaldas, pentagramas, notas,
// carteles y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = OR.director(x, y, s) + ...
// y en el script: const K = OR.kit(tl, root).
window.OR = window.OR || (function () {
  const INK = "#0d0f14", ESM = "#1a1d26", ESM2 = "#2b3040", AZUL = "#13233f", AZUL2 = "#2a4470", AZUL3 = "#7fb2ff",
    CREMA = "#f3ead6", PAPEL = "#e6dbc2", BRON = "#c08a3e", BRON2 = "#e0ab5c", ROJO = "#ff3b47", ROJO2 = "#d02a35",
    MADERA = "#d8b27c", MADERA2 = "#b98c55", PIEL = "#f0c8a0", PIEL2 = "#d9a77c", VERDE = "#5ce611", CAFE = "#7a4a22";
  if (!document.getElementById("or-css")) {
    const st = document.createElement("style");
    st.id = "or-css";
    st.textContent = `
@font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.or-cartel { position: absolute; box-sizing: border-box; padding: 18px 34px 14px; background: ${CREMA}; border: 5px solid ${BRON}; outline: 3px solid ${CREMA}; outline-offset: 5px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.5); font-family: "Cinzel", serif; font-weight: 800; color: ${INK}; white-space: nowrap; text-align: center; line-height: 1.05; letter-spacing: 0.04em; }
.or-cartel small { display: block; margin-top: 6px; font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; font-size: 0.55em; letter-spacing: 0.02em; color: ${AZUL2}; }
.or-sello { position: absolute; box-sizing: border-box; padding: 10px 28px 6px; border: 9px solid ${ROJO}; border-radius: 12px; color: ${ROJO};
  font-family: "Cinzel", serif; font-weight: 900; letter-spacing: 0.04em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(13, 15, 20, 0.82); }
.or-sello.bronce { border-color: ${BRON2}; color: ${BRON2}; }
.or-sello.verde { border-color: ${VERDE}; color: ${VERDE}; }
.or-tag { position: absolute; box-sizing: border-box; padding: 10px 24px 8px; background: ${INK}; border: 3px solid ${BRON}; border-radius: 6px;
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.16em; color: ${CREMA}; white-space: nowrap; text-align: center; }
.or-tag.rojo { background: ${ROJO2}; border-color: ${ROJO}; }
.or-tag.verde { background: #2f6e0a; border-color: ${VERDE}; }
.or-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CREMA}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 0 10px 30px rgba(0,0,0,0.45); }
.or-globo.robot { font-family: "IBM Plex Mono", monospace; font-weight: 600; background: ${AZUL}; color: ${BRON2}; border-color: ${BRON2}; border-radius: 8px; }
.or-nota-papel { position: absolute; box-sizing: border-box; padding: 14px 22px; background: #f6e27a; font-family: "Caveat", cursive; font-weight: 700; color: ${INK};
  white-space: nowrap; text-align: center; line-height: 1; box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  const ojo = (cx, cy, r, cls) => `<g class="or-ojo ${cls || ""}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="5"/><circle class="or-pupila" cx="${cx}" cy="${cy + 2}" r="${r * 0.45}" fill="${INK}"/><rect class="or-parpado" x="${cx - r - 3}" y="${cy - r - 3}" width="${2 * r + 6}" height="${r + 3}" fill="currentColor" opacity="0"/></g>`;

  // EL DIRECTOR (el dueño): de frente, detrás de un podio. Origen = centro de la base del podio.
  // Cabeza en (0,-470). Clases: .or-d (todo) .or-d-cuerpo (todo lo de arriba del podio, para que salte)
  // .or-d-cabeza .or-d-cejas .or-d-boca .or-d-gotas (gotas de sudor, opacity 0) .or-d-brazo (hombro -125 -330, con la batuta)
  // .or-d-brazo2 (hombro 125 -330) .or-d-batuta-punta (punto en la punta de la batuta) .or-d-podio
  function director(x, y, s, o) {
    o = o || {};
    const podio = o.sinPodio ? "" : `<g class="or-d-podio">
        <path d="M-170 -170 L170 -170 L150 0 L-150 0 Z" fill="${MADERA2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <rect x="-190" y="-196" width="380" height="34" rx="8" fill="${MADERA}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -140 L110 -140 M-100 -40 L100 -40" stroke="${BRON}" stroke-width="5" opacity="0.7"/>
        <text x="0" y="-78" text-anchor="middle" font-family="Cinzel" font-weight="800" font-size="34" fill="${INK}" opacity="0.75" data-layout-ignore>${o.podio || "EL DUEÑO"}</text>
      </g>`;
    return `<g class="or-d"><g transform="${T(x, y, s)}" color="${PIEL}">
      <g class="or-d-cuerpo">
        <g class="or-d-brazo2">
          <path d="M125 -330 C200 -320 240 -280 262 -230" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
          <path d="M125 -330 C200 -320 240 -280 262 -230" fill="none" stroke="${ESM}" stroke-width="50" stroke-linecap="round"/>
          <circle cx="268" cy="-214" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
          <path d="M258 -244 l-6 -26 M274 -244 l2 -28 M288 -236 l10 -22" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <path d="M-160 -170 C-165 -260 -150 -330 -110 -350 L110 -350 C150 -330 165 -260 160 -170 Z" fill="${ESM}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-52 -350 L0 -190 L52 -350 Z" fill="${CREMA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-52 -350 L-8 -210 L-60 -170 L-110 -350 Z M52 -350 L8 -210 L60 -170 L110 -350 Z" fill="${ESM2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-36 -350 L0 -334 L36 -350 L36 -312 L0 -328 L-36 -312 Z" fill="${INK}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="0" cy="-260" r="6" fill="${INK}"/><circle cx="0" cy="-228" r="6" fill="${INK}"/>
        <rect x="-22" y="-372" width="44" height="30" fill="${PIEL2}" stroke="${INK}" stroke-width="5"/>
        <g class="or-d-cabeza">
          <path d="M-96 -490 C-130 -520 -124 -560 -100 -570 C-118 -540 -96 -520 -84 -512 Z M96 -490 C130 -520 124 -560 100 -570 C118 -540 96 -520 84 -512 Z" fill="#c9cdd6" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
          <ellipse cx="0" cy="-470" rx="92" ry="106" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
          <ellipse cx="-94" cy="-462" rx="14" ry="24" fill="${PIEL2}" stroke="${INK}" stroke-width="5"/>
          <ellipse cx="94" cy="-462" rx="14" ry="24" fill="${PIEL2}" stroke="${INK}" stroke-width="5"/>
          <path d="M-92 -500 C-96 -540 -80 -566 -60 -572 M92 -500 C96 -540 80 -566 60 -572" fill="none" stroke="#c9cdd6" stroke-width="16" stroke-linecap="round"/>
          <path d="M-30 -560 C-10 -572 14 -570 26 -560" fill="none" stroke="#c9cdd6" stroke-width="7" stroke-linecap="round"/>
          <g class="or-d-cejas"><path d="M-58 -508 L-18 -500 M58 -508 L18 -500" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g>
          ${ojo(-38, -476, 16, "or-d-ojo")}${ojo(38, -476, 16, "or-d-ojo")}
          <path d="M-8 -470 C-14 -450 -14 -440 0 -436 C10 -436 12 -444 8 -450" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
          <path d="M-62 -418 C-40 -440 -12 -432 0 -424 C12 -432 40 -440 62 -418 C40 -414 20 -416 0 -414 C-20 -416 -40 -414 -62 -418 Z" fill="#c9cdd6" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
          <ellipse class="or-d-boca" cx="0" cy="-394" rx="20" ry="9" fill="${INK}"/>
          <g class="or-d-gotas" opacity="0">
            <path d="M-110 -540 C-118 -524 -122 -514 -112 -508 C-102 -514 -104 -524 -110 -540 Z" fill="${AZUL3}" stroke="${INK}" stroke-width="4"/>
            <path d="M112 -520 C104 -504 100 -494 110 -488 C120 -494 118 -504 112 -520 Z" fill="${AZUL3}" stroke="${INK}" stroke-width="4"/>
            <path d="M60 -566 C54 -554 52 -546 60 -542 C68 -546 66 -554 60 -566 Z" fill="${AZUL3}" stroke="${INK}" stroke-width="4"/>
          </g>
        </g>
        <g class="or-d-brazo">
          <path d="M-125 -330 C-200 -340 -240 -400 -250 -460" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
          <path d="M-125 -330 C-200 -340 -240 -400 -250 -460" fill="none" stroke="${ESM}" stroke-width="50" stroke-linecap="round"/>
          <path d="M-262 -490 L-370 -640" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
          <path d="M-262 -490 L-370 -640" stroke="${CREMA}" stroke-width="6" stroke-linecap="round"/>
          <circle class="or-d-batuta-punta" cx="-370" cy="-640" r="4" fill="${CREMA}"/>
          <circle cx="-254" cy="-478" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        </g>
      </g>
      ${podio}
    </g></g>`;
  }

  // LA PLANILLA DE EXCEL con violín. Origen = entre los pies. Cara en (0,-300).
  // Clases: .or-p .or-p-cuerpo .or-p-boca .or-p-cejas .or-p-arco (gira en la mano, origen 150 -210) .or-p-violin .or-p-celda (texto de la celda C3)
  function planilla(x, y, s, o) {
    o = o || {};
    let grilla = "";
    for (let k = 1; k < 8; k++) grilla += `<path d="M-130 ${-460 + k * 52} L130 ${-460 + k * 52}" stroke="#c9bb98" stroke-width="3"/>`;
    for (let k = 1; k < 4; k++) grilla += `<path d="M${-130 + k * 65} -460 L${-130 + k * 65} -40" stroke="#c9bb98" stroke-width="3"/>`;
    return `<g class="or-p"><g transform="${T(x, y, s)}" color="${CREMA}">
      <path d="M-50 -40 L-56 -4 M50 -40 L56 -4" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <ellipse cx="-66" cy="-2" rx="30" ry="12" fill="${INK}"/><ellipse cx="66" cy="-2" rx="30" ry="12" fill="${INK}"/>
      <g class="or-p-cuerpo">
        <rect x="-130" y="-460" width="260" height="420" rx="12" fill="${CREMA}" stroke="${INK}" stroke-width="7"/>
        ${grilla}
        <rect x="-130" y="-460" width="260" height="52" rx="12" fill="${BRON}" stroke="${INK}" stroke-width="7"/>
        <text x="-97" y="-423" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${INK}" data-layout-ignore>A</text>
        <text x="-32" y="-423" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${INK}" data-layout-ignore>B</text>
        <text x="33" y="-423" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${INK}" data-layout-ignore>C</text>
        <text x="98" y="-423" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${INK}" data-layout-ignore>D</text>
        <text class="or-p-celda" x="33" y="-80" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="34" fill="${ROJO2}" data-layout-ignore>${o.celda || "#¡REF!"}</text>
        <g class="or-p-cejas"><path d="M-74 -350 L-30 -362 M74 -350 L30 -362" stroke="${INK}" stroke-width="9" stroke-linecap="round"/></g>
        <path d="M-74 -322 C-60 -334 -36 -334 -24 -322" fill="${INK}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M74 -322 C60 -334 36 -334 24 -322" fill="${INK}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M-70 -322 C-56 -312 -38 -312 -28 -322 M70 -322 C56 -312 38 -312 28 -322" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M0 -316 L12 -270 L-4 -268" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="or-p-boca" d="M-22 -236 C-8 -244 8 -244 22 -236" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M-100 -200 L-60 -180" stroke="${INK}" stroke-width="0"/>
      </g>
      <g class="or-p-violin" transform="translate(-96 -210) rotate(-38)">
        <path d="M0 -70 C40 -70 46 -40 34 -24 C48 -10 52 30 40 52 C26 76 -26 76 -40 52 C-52 30 -48 -10 -34 -24 C-46 -40 -40 -70 0 -70 Z" fill="${MADERA2}" stroke="${INK}" stroke-width="6"/>
        <path d="M-12 -10 C-18 4 -18 14 -12 24 M12 -10 C18 4 18 14 12 24" fill="none" stroke="${INK}" stroke-width="4"/>
        <rect x="-8" y="-200" width="16" height="132" fill="${ESM}" stroke="${INK}" stroke-width="4"/>
        <circle cx="0" cy="-206" r="14" fill="${MADERA2}" stroke="${INK}" stroke-width="5"/>
        <path d="M-4 -196 L-4 60 M4 -196 L4 60" stroke="${CREMA}" stroke-width="2"/>
      </g>
      <path d="M-128 -260 C-170 -240 -170 -170 -150 -150" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <g class="or-p-arco">
        <path d="M128 -260 C170 -250 176 -220 150 -210" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <path d="M150 -210 L-110 -330" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
        <path d="M150 -210 L-110 -330" stroke="${MADERA}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="150" cy="-210" r="16" fill="${CREMA}" stroke="${INK}" stroke-width="5"/>
      </g>
    </g></g>`;
  }

  // EL CUADERNO DE LA CAJA con tambor. Origen = base del tambor. Cara en (0,-380).
  // Clases: .or-c .or-c-cuerpo .or-c-boca .or-c-baq1 (hombro -130 -330) .or-c-baq2 (hombro 130 -330) .or-c-tambor .or-c-num (texto de la página)
  function cuaderno(x, y, s, o) {
    o = o || {};
    let renglones = "", espiral = "";
    for (let k = 0; k < 8; k++) renglones += `<path d="M-120 ${-450 + k * 46} L120 ${-450 + k * 46}" stroke="#9bb3d6" stroke-width="3"/>`;
    for (let k = 0; k < 7; k++) espiral += `<ellipse cx="${-105 + k * 35}" cy="-500" rx="9" ry="20" fill="none" stroke="${BRON2}" stroke-width="6"/>`;
    const baq = (lado) => {
      const sx = lado * 130;
      return `<path d="M${sx} -330 C${sx + lado * 60} -300 ${sx + lado * 70} -250 ${sx + lado * 40} -210" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
        <path d="M${sx + lado * 40} -210 L${sx - lado * 60} -140" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <path d="M${sx + lado * 40} -210 L${sx - lado * 60} -140" stroke="${MADERA}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="${sx - lado * 62}" cy="-138" r="10" fill="${MADERA}" stroke="${INK}" stroke-width="4"/>
        <circle cx="${sx + lado * 40}" cy="-210" r="18" fill="${CREMA}" stroke="${INK}" stroke-width="5"/>`;
    };
    return `<g class="or-c"><g transform="${T(x, y, s)}" color="${CREMA}">
      <g class="or-c-cuerpo">
        <rect x="-140" y="-500" width="280" height="420" rx="10" fill="${AZUL2}" stroke="${INK}" stroke-width="7"/>
        <rect x="-128" y="-490" width="256" height="400" rx="6" fill="${CREMA}" stroke="${INK}" stroke-width="5"/>
        ${renglones}
        <path d="M-90 -490 L-90 -90" stroke="${ROJO}" stroke-width="3" opacity="0.6"/>
        ${espiral}
        <circle cx="72" cy="-440" r="40" fill="none" stroke="${CAFE}" stroke-width="12" opacity="0.55"/>
        <circle cx="60" cy="-430" r="26" fill="${CAFE}" opacity="0.25"/>
        <text class="or-c-num" x="-60" y="-120" font-family="Caveat" font-weight="700" font-size="44" fill="${AZUL2}" data-layout-ignore>${o.num || "20?"}</text>
        <g class="or-c-cejas"><path d="M-70 -430 L-28 -420 M70 -430 L28 -420" stroke="${INK}" stroke-width="9" stroke-linecap="round"/></g>
        ${ojo(-46, -380, 24, "or-c-ojo")}${ojo(46, -380, 24, "or-c-ojo")}
        <path class="or-c-boca" d="M-60 -310 C-40 -270 40 -270 60 -310 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -306 L40 -306" stroke="#fff" stroke-width="8"/>
      </g>
      <g class="or-c-tambor">
        <path d="M-170 -130 L-170 -20 C-170 10 170 10 170 -20 L170 -130 Z" fill="${AZUL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-170 -100 L-120 -20 L-60 -100 L0 -20 L60 -100 L120 -20 L170 -100" fill="none" stroke="${BRON2}" stroke-width="5"/>
        <path d="M-170 -24 C-170 6 170 6 170 -24" fill="none" stroke="${BRON}" stroke-width="14"/>
        <ellipse cx="0" cy="-130" rx="170" ry="34" fill="${CREMA}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="0" cy="-130" rx="170" ry="34" fill="none" stroke="${BRON}" stroke-width="8"/>
        <path d="M-30 0 L-40 40 M30 0 L40 40" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      </g>
      <g class="or-c-baq1">${baq(-1)}</g>
      <g class="or-c-baq2">${baq(1)}</g>
    </g></g>`;
  }

  // LA CAJA REGISTRADORA enlatada con trompeta. Origen = base de la mesita. Pantalla con ojos en (0,-470).
  // Clases: .or-t .or-t-cuerpo .or-t-ojos .or-t-txt (texto de la pantalla) .or-t-trompeta (origen 130 -330) .or-t-cajon
  function caja(x, y, s, o) {
    o = o || {};
    let teclas = "";
    for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) teclas += `<rect x="${-110 + c * 50 + f * 6}" y="${-330 + f * 40}" width="40" height="28" rx="6" fill="${CREMA}" stroke="${INK}" stroke-width="4"/>`;
    return `<g class="or-t"><g transform="${T(x, y, s)}" color="${AZUL}">
      <path d="M-120 -120 L-140 0 M120 -120 L140 0" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <rect x="-170" y="-140" width="340" height="30" rx="6" fill="${MADERA2}" stroke="${INK}" stroke-width="6"/>
      <g class="or-t-cuerpo">
        <path d="M-150 -140 L-130 -360 L130 -360 L150 -140 Z" fill="${ESM}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-150 -140 L-130 -360" stroke="${BRON}" stroke-width="5"/>
        <rect class="or-t-cajon" x="-150" y="-200" width="300" height="56" rx="6" fill="${ESM2}" stroke="${INK}" stroke-width="6"/>
        <circle cx="0" cy="-172" r="9" fill="${BRON2}"/>
        ${teclas}
        <rect x="-36" y="-420" width="72" height="66" fill="${ESM2}" stroke="${INK}" stroke-width="6"/>
        <rect x="-150" y="-560" width="300" height="150" rx="14" fill="${ESM}" stroke="${INK}" stroke-width="7"/>
        <rect x="-132" y="-544" width="264" height="118" rx="8" fill="${AZUL}" stroke="${BRON}" stroke-width="5"/>
        <g class="or-t-ojos"><rect x="-80" y="-530" width="34" height="44" fill="${BRON2}"/><rect x="46" y="-530" width="34" height="44" fill="${BRON2}"/></g>
        <text class="or-t-txt" x="0" y="-448" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${BRON2}" data-layout-ignore>${o.txt || "V 1.0"}</text>
        <rect x="-160" y="-582" width="320" height="26" rx="8" fill="${BRON}" stroke="${INK}" stroke-width="5"/>
      </g>
      <path d="M-150 -290 C-200 -280 -220 -250 -214 -220" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <g class="or-t-trompeta"><g transform="translate(0 110)">
        <path d="M150 -330 C190 -340 200 -380 170 -420" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <path d="M110 -440 L250 -440" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
        <path d="M110 -440 L250 -440" stroke="${BRON2}" stroke-width="12" stroke-linecap="round"/>
        <path d="M120 -440 C120 -390 200 -390 200 -440" fill="none" stroke="${INK}" stroke-width="18"/>
        <path d="M120 -440 C120 -390 200 -390 200 -440" fill="none" stroke="${BRON}" stroke-width="9"/>
        <rect x="140" y="-474" width="10" height="26" fill="${BRON2}" stroke="${INK}" stroke-width="3"/>
        <rect x="160" y="-474" width="10" height="26" fill="${BRON2}" stroke="${INK}" stroke-width="3"/>
        <rect x="180" y="-474" width="10" height="26" fill="${BRON2}" stroke="${INK}" stroke-width="3"/>
        <path d="M240 -452 L320 -500 L320 -380 L240 -428 Z" fill="${BRON2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <ellipse cx="320" cy="-440" rx="16" ry="60" fill="${BRON}" stroke="${INK}" stroke-width="6"/>
      </g></g>
    </g></g>`;
  }

  // ATRIL con partitura. Origen = base. La hoja va de (-130,-560) a (130,-360).
  // o.titulo: texto arriba de la hoja; o.tipo: "pentagrama" | "planilla" | "cuaderno" | "ticket" | "vacia"
  // Clases: .or-atril .or-atril-hoja .or-atril-lineas path (para dibujar)
  function atril(x, y, s, o) {
    o = o || {};
    const tipo = o.tipo || "pentagrama";
    let lineas = "";
    if (tipo === "pentagrama") {
      for (let p = 0; p < 2; p++) for (let k = 0; k < 5; k++) lineas += `<path d="M-110 ${-500 + p * 70 + k * 10} L110 ${-500 + p * 70 + k * 10}" stroke="${INK}" stroke-width="2.5"/>`;
    } else if (tipo === "planilla") {
      for (let k = 0; k < 6; k++) lineas += `<path d="M-110 ${-520 + k * 28} L110 ${-520 + k * 28}" stroke="${BRON}" stroke-width="3"/>`;
      for (let k = 0; k < 4; k++) lineas += `<path d="M${-110 + k * 73} -520 L${-110 + k * 73} -380" stroke="${BRON}" stroke-width="3"/>`;
    } else if (tipo === "cuaderno") {
      for (let k = 0; k < 5; k++) lineas += `<path d="M-110 ${-510 + k * 30} C-60 ${-516 + k * 30} 0 ${-500 + k * 30} ${60 - k * 12} ${-512 + k * 30}" fill="none" stroke="${AZUL2}" stroke-width="4" stroke-linecap="round"/>`;
    } else if (tipo === "ticket") {
      for (let k = 0; k < 5; k++) lineas += `<path d="M-60 ${-510 + k * 28} L${60 - (k % 2) * 30} ${-510 + k * 28}" stroke="${INK}" stroke-width="5" stroke-dasharray="10 6"/>`;
    }
    const hoja = tipo === "ticket"
      ? `<path d="M-80 -560 L80 -560 L80 -370 L70 -360 L60 -370 L50 -360 L40 -370 L30 -360 L20 -370 L10 -360 L0 -370 L-10 -360 L-20 -370 L-30 -360 L-40 -370 L-50 -360 L-60 -370 L-70 -360 L-80 -370 Z" fill="#fbf7ee" stroke="${INK}" stroke-width="5"/>`
      : `<rect x="-130" y="-560" width="260" height="200" rx="4" fill="${tipo === "vacia" ? PAPEL : CREMA}" stroke="${INK}" stroke-width="5"/>`;
    return `<g class="or-atril ${o.cls || ""}"><g transform="${T(x, y, s)}">
      <path d="M0 -360 L0 -20 M0 -20 L-70 0 M0 -20 L70 0 M0 -20 L0 6" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <path d="M0 -360 L0 -20 M0 -20 L-70 0 M0 -20 L70 0" stroke="${ESM2}" stroke-width="8" stroke-linecap="round"/>
      <path d="M-150 -360 L150 -360" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <path d="M-150 -360 L150 -360" stroke="${ESM2}" stroke-width="8" stroke-linecap="round"/>
      <g class="or-atril-hoja">${hoja}<g class="or-atril-lineas">${lineas}</g>
      ${o.titulo ? `<text x="0" y="-532" text-anchor="middle" font-family="Cinzel" font-weight="800" font-size="${o.tituloSize || 26}" fill="${INK}" data-layout-ignore>${o.titulo}</text>` : ""}</g>
    </g></g>`;
  }

  // SILLA vacía de la orquesta. Origen = base.
  function silla(x, y, s) {
    return `<g class="or-silla"><g transform="${T(x, y, s)}">
      <path d="M-70 -160 L-70 -380 C-70 -400 70 -400 70 -380 L70 -160" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
      <path d="M-70 -160 L-70 -380 C-70 -400 70 -400 70 -380 L70 -160" fill="none" stroke="${ESM2}" stroke-width="10" stroke-linecap="round"/>
      <rect x="-60" y="-370" width="120" height="110" rx="12" fill="${AZUL2}" stroke="${INK}" stroke-width="6"/>
      <rect x="-90" y="-180" width="180" height="40" rx="10" fill="${AZUL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-76 -140 L-86 0 M76 -140 L86 0" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
    </g></g>`;
  }

  // PÚBLICO de espaldas: una fila de cabezas y hombros. y = base. Clases .or-pub-k (cada cabeza, k = 0..n-1)
  function publico(y, n, o) {
    o = o || {};
    let g = "";
    const paso = 1080 / (n - 0.6);
    for (let k = 0; k < n; k++) {
      const cx = Math.round(-20 + k * paso + ((k * 37) % 23)), h = 150 + ((k * 53) % 40), col = o.col || "#0a1426";
      const pelo = k % 3 === 0 ? `<path d="M${cx - 50} ${y - h - 10} C${cx - 60} ${y - h - 90} ${cx + 60} ${y - h - 90} ${cx + 50} ${y - h - 10} Z" fill="${col}"/>` : "";
      g += `<g class="or-pub-${k}">
        <path d="M${cx - 110} ${y} C${cx - 110} ${y - h + 50} ${cx - 70} ${y - h + 20} ${cx} ${y - h + 20} C${cx + 70} ${y - h + 20} ${cx + 110} ${y - h + 50} ${cx + 110} ${y} Z" fill="${col}" stroke="${o.borde || "#1e3150"}" stroke-width="4"/>
        <ellipse cx="${cx}" cy="${y - h - 30}" rx="56" ry="64" fill="${col}" stroke="${o.borde || "#1e3150"}" stroke-width="4"/>${pelo}
      </g>`;
    }
    return `<g class="or-publico">${g}</g>`;
  }

  // PENTAGRAMA: 5 líneas onduladas de x0 a x1 en y. o.enredo (0..1) las retuerce. Clase .or-pent path.
  function pentagrama(x0, x1, y, o) {
    o = o || {};
    const en = o.enredo || 0, col = o.col || CREMA, sw = o.sw || 4;
    let p = "";
    for (let k = 0; k < 5; k++) {
      const yy = y + k * (o.sep || 18), pasos = 8, w = (x1 - x0) / pasos;
      let d = `M${x0} ${yy}`;
      for (let i = 1; i <= pasos; i++) {
        const amp = en * (40 + k * 18) * (i % 2 ? 1 : -1) * (k % 2 ? -1 : 1);
        d += ` Q${x0 + w * (i - 0.5)} ${yy + amp} ${x0 + w * i} ${yy + (en ? amp * 0.3 * ((k + i) % 3 - 1) : 0)}`;
      }
      p += `<path class="or-pent-l" d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
    }
    return `<g class="or-pent ${o.cls || ""}">${p}</g>`;
  }

  // NOTA musical (corchea). Clase .or-nota. col: color.
  function nota(x, y, s, col, cls) {
    col = col || CREMA;
    return `<g class="or-nota ${cls || ""}"><g transform="${T(x, y, s)}">
      <ellipse cx="0" cy="0" rx="26" ry="19" transform="rotate(-24)" fill="${col}" stroke="${INK}" stroke-width="5"/>
      <path d="M22 -8 L22 -110 C40 -96 64 -86 60 -56" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
      <path d="M22 -8 L22 -110 C40 -96 64 -86 60 -56" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round"/>
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
    // pop para grupos SVG: escala desde un svgOrigin
    function popSvg(el, t, o, d) {
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
    // gira un grupo SVG alrededor de un punto, ida y vuelta n veces
    function vaiven(el, o, t, rot, veces, d) {
      gsap.set(el, { svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { rotation: 0 }, { rotation: rot, svgOrigin: o, duration: d || 0.2, yoyo: true, repeat: (veces || 2) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    function hablar(el, t, veces, d) {
      tl.fromTo(el, { scaleY: 1 }, { scaleY: 1.9, duration: d || 0.11, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, t);
    }
    function sudar(t) {
      const g = q(".or-d-gotas");
      tl.to(g, { opacity: 1, duration: 0.15 }, t);
      tl.fromTo(g, { y: 0 }, { y: 26, duration: 0.6, ease: "power1.in", repeat: 2, immediateRender: false }, t);
    }
    // notas que salen volando de un punto y se ponen rojas (desafinadas)
    function notasVuelan(sel, t, dx, dy) {
      qa(sel).forEach((n, i) => {
        gsap.set(n, { opacity: 0 });
        tl.fromTo(n, { opacity: 0, x: 0, y: 0, rotation: 0 }, { opacity: 1, x: (dx || 0) * (i % 2 ? 1 : -0.6) + i * 14, y: (dy || -160) - i * 30, rotation: (i % 2 ? 25 : -25), duration: 0.7, ease: "power2.out", immediateRender: false }, t + i * 0.12);
      });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, vaiven, hablar, sudar, notasVuelan, salida };
  }
  return { INK, ESM, ESM2, AZUL, AZUL2, AZUL3, CREMA, PAPEL, BRON, BRON2, ROJO, ROJO2, MADERA, MADERA2, PIEL, VERDE, CAFE,
    director, planilla, cuaderno, caja, atril, silla, publico, pentagrama, nota, kit };
})();
