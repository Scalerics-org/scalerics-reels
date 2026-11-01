// Piezas del reel "la-pesca": el conductor del programa de pesca, el dueño en la lancha, el pez (la clienta),
// la lancha, la caña con línea y boya, el carrete, la sonda (fish finder), el celular con chat, el agente de IA,
// burbujas, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = PE.conductor(x, y, s) + ...
// y en el script: const K = PE.kit(tl, root).
window.PE = window.PE || (function () {
  const INK = "#0d1b24", NAR = "#ff8a3d", NAR2 = "#ffb35c", NAR3 = "#c95a1c", TUR = "#1fb5ac", TUR2 = "#7fe8e0", TUR3 = "#0b6e74", TUR4 = "#06404a",
    CRE = "#fff1d6", CRE2 = "#f0d9ae", ROJO = "#e5484d", ROJO2 = "#ff7a7a", PIEL = "#f0c8a0", PIEL2 = "#e0ad86", VERDE = "#5ce611", VERDE2 = "#3f9e0b";
  if (!document.getElementById("pe-css")) {
    const st = document.createElement("style");
    st.id = "pe-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.pe-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROJO}; border-radius: 14px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(255, 241, 214, 0.95); }
.pe-sello.tur { border-color: ${TUR3}; color: ${TUR3}; }
.pe-sello.nar { border-color: ${NAR3}; color: ${NAR3}; }
.pe-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.pe-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${NAR}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${NAR2}; white-space: nowrap; text-align: center; }
.pe-tag.rojo { background: ${ROJO}; border-color: ${CRE}; color: ${CRE}; }
.pe-tag.tur { background: ${TUR4}; border-color: ${TUR2}; color: ${TUR2}; }
.pe-tag.verde { background: ${VERDE2}; border-color: ${CRE}; color: ${CRE}; }
.pe-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${CRE}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 7px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}; letter-spacing: -0.01em; }
.pe-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // EL CONDUCTOR del programa: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.cara: "susurro" (default) | "sorpresa" | "enojado" | "feliz" | "serio"; o.dedo: dedo en los labios (silencio);
  // o.brazo: "arriba" (puño en alto). clases: .pe-f .pe-f-cabeza .pe-f-boca .pe-f-cejas .pe-f-ojos .pe-f-mano
  function conductor(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "susurro";
    const cejas = cara === "enojado" ? "M-74 -398 L-28 -380 M74 -398 L28 -380" : cara === "sorpresa" ? "M-74 -408 Q-50 -426 -26 -410 M74 -408 Q50 -426 26 -410" : cara === "serio" ? "M-74 -390 L-28 -390 M74 -390 L28 -390" : "M-74 -394 Q-50 -404 -26 -394 M74 -394 Q50 -404 26 -394";
    const ojos = cara === "feliz" ? `<path d="M-68 -350 Q-48 -372 -28 -350 M68 -350 Q48 -372 28 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "sorpresa" ? `<circle cx="-48" cy="-352" r="17" fill="${CRE}" stroke="${INK}" stroke-width="6"/><circle cx="48" cy="-352" r="17" fill="${CRE}" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-352" r="7" fill="${INK}"/><circle cx="48" cy="-352" r="7" fill="${INK}"/>`
      : `<ellipse cx="-48" cy="-352" rx="11" ry="13" fill="${INK}"/><ellipse cx="48" cy="-352" rx="11" ry="13" fill="${INK}"/><circle cx="-44" cy="-357" r="4" fill="#ffffff"/><circle cx="52" cy="-357" r="4" fill="#ffffff"/>`;
    const boca = cara === "sorpresa" ? `<ellipse class="pe-f-boca" cx="0" cy="-262" rx="20" ry="26" fill="#7a1420" stroke="${INK}" stroke-width="6"/>`
      : cara === "feliz" ? `<path class="pe-f-boca" d="M-40 -276 Q0 -226 40 -276 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "enojado" ? `<path class="pe-f-boca" d="M-34 -258 Q0 -284 34 -258 L30 -252 Q0 -268 -30 -252 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "serio" ? `<path class="pe-f-boca" d="M-26 -264 L26 -264" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<ellipse class="pe-f-boca" cx="0" cy="-264" rx="14" ry="9" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`;
    const mano = o.dedo ? `<g class="pe-f-mano">
        <path d="M150 30 C170 -60 130 -170 60 -220" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 30 C170 -60 130 -170 60 -220" fill="none" stroke="${NAR}" stroke-width="50" stroke-linecap="round"/>
        <ellipse cx="34" cy="-232" rx="34" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <rect x="-10" y="-320" width="22" height="84" rx="11" fill="${PIEL}" stroke="${INK}" stroke-width="6" transform="rotate(-8 0 -280)"/>
      </g>` : o.brazo === "arriba" ? `<g class="pe-f-mano">
        <path d="M170 -180 C240 -250 250 -340 230 -440" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M170 -180 C240 -250 250 -340 230 -440" fill="none" stroke="${NAR}" stroke-width="50" stroke-linecap="round"/>
        <circle cx="230" cy="-470" r="40" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M206 -486 L254 -486 M206 -466 L254 -466" stroke="${INK}" stroke-width="4" opacity="0.5"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pe-f">
      <!-- remera turquesa y chaleco de pesca naranja con bolsillos -->
      <path d="M-235 40 C-235 -110 -180 -200 -80 -220 L80 -220 C180 -200 235 -110 235 40 Z" fill="${TUR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-235 40 C-235 -110 -180 -200 -80 -220 L-40 -150 L-60 40 Z M235 40 C235 -110 180 -200 80 -220 L40 -150 L60 40 Z" fill="${NAR}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="-190" y="-110" width="80" height="62" rx="8" fill="${NAR3}" stroke="${INK}" stroke-width="5"/><rect x="-190" y="-110" width="80" height="20" rx="6" fill="${NAR2}" stroke="${INK}" stroke-width="5"/>
      <rect x="110" y="-110" width="80" height="62" rx="8" fill="${NAR3}" stroke="${INK}" stroke-width="5"/><rect x="110" y="-110" width="80" height="20" rx="6" fill="${NAR2}" stroke="${INK}" stroke-width="5"/>
      <rect x="-176" y="-20" width="56" height="46" rx="6" fill="${NAR3}" stroke="${INK}" stroke-width="5"/>
      <!-- anzuelo de adorno en el chaleco -->
      <path d="M150 -10 L150 22 Q150 40 134 40 Q120 40 120 26" fill="none" stroke="${CRE}" stroke-width="5" stroke-linecap="round"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="pe-f-cabeza">
        <ellipse cx="-106" cy="-340" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="106" cy="-340" rx="20" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-104 -390 C-108 -480 108 -480 104 -390 L100 -312 C94 -250 52 -226 0 -226 C-52 -226 -94 -250 -100 -312 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- barba candado -->
        <path d="M-62 -290 C-60 -240 -30 -222 0 -222 C30 -222 60 -240 62 -290 C40 -270 20 -262 0 -262 C-20 -262 -40 -270 -62 -290 Z" fill="#4a2e1c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-56 -294 C-30 -308 -10 -300 0 -292 C10 -300 30 -308 56 -294 C36 -284 14 -284 0 -288 C-14 -284 -36 -284 -56 -294 Z" fill="#4a2e1c" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <!-- gorro de pescador (piluso) con anzuelos -->
        <path d="M-150 -408 C-150 -430 -120 -440 -96 -444 L96 -444 C120 -440 150 -430 150 -408 C150 -396 110 -392 0 -394 C-110 -392 -150 -396 -150 -408 Z" fill="${CRE2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-96 -440 C-100 -520 -50 -540 0 -540 C50 -540 100 -520 96 -440 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-96 -462 L96 -462" stroke="${TUR3}" stroke-width="14"/>
        <path d="M-96 -462 L96 -462" stroke="${INK}" stroke-width="3" opacity="0.4"/>
        <path d="M40 -500 L40 -478 Q40 -466 30 -466 Q22 -466 22 -474" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="40" cy="-504" r="7" fill="${ROJO}" stroke="${INK}" stroke-width="3"/>
        <!-- lentes de sol arriba del gorro -->
        <g transform="translate(-50 -520) rotate(-6)"><rect x="-34" y="-14" width="56" height="30" rx="12" fill="${INK}"/><rect x="34" y="-14" width="56" height="30" rx="12" fill="${INK}"/><path d="M22 -2 L34 -2" stroke="${INK}" stroke-width="6"/></g>
        <path class="pe-f-cejas" d="${cejas}" fill="none" stroke="#4a2e1c" stroke-width="12" stroke-linecap="round"/>
        <g class="pe-f-ojos">${ojos}</g>
        <path d="M0 -346 C-12 -314 -18 -302 -2 -296" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
      </g>
      ${mano}
    </g></g>`;
  }

  // EL DUEÑO de la mueblería, en la lancha: busto, origen = centro de la base del torso. Cabeza en (0,-360).
  // o.cara: "desganado" (default) | "tranquilo" | "orgulloso" | "apurado"; o.celular: celular en la mano.
  // clases: .pe-d .pe-d-cabeza .pe-d-boca .pe-d-ojos .pe-d-cel .pe-d-gota
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "desganado";
    const ojos = cara === "tranquilo" ? `<path d="M-70 -350 Q-50 -338 -30 -350 M70 -350 Q50 -338 30 -350" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "orgulloso" ? `<path d="M-70 -346 Q-50 -368 -30 -346 M70 -346 Q50 -368 30 -346" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "apurado" ? `<circle cx="-50" cy="-350" r="13" fill="${INK}"/><circle cx="50" cy="-350" r="13" fill="${INK}"/>`
      : `<path d="M-72 -356 L-28 -356" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M72 -356 L28 -356" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M-64 -352 Q-50 -340 -34 -352 M64 -352 Q50 -340 34 -352" fill="${INK}" stroke="${INK}" stroke-width="5"/><path d="M-68 -334 Q-50 -326 -32 -334 M68 -334 Q50 -326 32 -334" fill="none" stroke="${PIEL2}" stroke-width="6" stroke-linecap="round"/>`;
    const cejas = cara === "apurado" ? "M-76 -380 L-30 -394 M76 -380 L30 -394" : cara === "orgulloso" ? "M-76 -392 Q-52 -404 -30 -394 M76 -392 Q52 -404 30 -394" : "M-76 -380 L-30 -384 M76 -380 L30 -384";
    const boca = cara === "orgulloso" ? `<path class="pe-d-boca" d="M-44 -282 Q0 -226 44 -282 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "tranquilo" ? `<path class="pe-d-boca" d="M-30 -272 Q0 -250 30 -272" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "apurado" ? `<ellipse class="pe-d-boca" cx="0" cy="-266" rx="18" ry="14" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`
      : `<path class="pe-d-boca" d="M-26 -266 Q0 -272 26 -264" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const cel = o.celular ? `<g class="pe-d-cel">
        <path d="M-150 30 C-190 -40 -170 -110 -120 -150" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M-150 30 C-190 -40 -170 -110 -120 -150" fill="none" stroke="${CRE}" stroke-width="48" stroke-linecap="round"/>
        <rect x="-150" y="-300" width="96" height="170" rx="16" fill="${INK}" transform="rotate(10 -100 -215)"/>
        <rect x="-141" y="-288" width="78" height="146" rx="9" fill="${TUR2}" transform="rotate(10 -100 -215)"/>
        <circle cx="-114" cy="-150" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pe-d">
      <!-- remera crema, salvavidas rojo cruzado -->
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-160 40 L-150 -150 Q-110 -205 -70 -215 L-60 40 Z M160 40 L150 -150 Q110 -205 70 -215 L60 40 Z" fill="${ROJO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-150 -60 L-62 -60 M150 -60 L62 -60" stroke="${CRE}" stroke-width="12"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="pe-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -415 C-132 -390 -130 -355 -110 -335 L-100 -335 L-98 -415 Z M112 -415 C132 -390 130 -355 110 -335 L100 -335 L98 -415 Z" fill="#6b6259" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <!-- gorra con visera -->
        <path d="M-112 -420 C-120 -520 120 -520 112 -420 Z" fill="${TUR3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-112 -420 C-60 -432 60 -432 112 -420 C150 -418 200 -412 210 -400 C180 -392 140 -404 112 -404 C60 -412 -60 -412 -112 -404 Z" fill="${TUR3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <text data-layout-ignore x="0" y="-448" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="${CRE}">M</text>
        <path class="pe-d-cejas" d="${cejas}" stroke="#3b332c" stroke-width="13" stroke-linecap="round" fill="none"/>
        <g class="pe-d-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="#3b332c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        <path class="pe-d-gota" d="M108 -430 C98 -410 96 -396 108 -392 C120 -396 118 -410 108 -430 Z" fill="${TUR2}" stroke="${INK}" stroke-width="4" opacity="${o.gota ? 1 : 0}"/>
      </g>
      ${cel}
    </g></g>`;
  }

  // EL PEZ (la clienta): centro (x, y), mira a la derecha (o.espejo: a la izquierda). Largo ~ 360*s.
  // o.cara: "feliz" (default) | "duda" | "neutra" | "chau"; o.color: "nar" | "tur".
  // clases: .pe-p .pe-p-cola (rotar con svgOrigin "x-150*s y") .pe-p-boca .pe-p-aleta
  function pez(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "feliz";
    const C1 = o.color === "tur" ? TUR2 : NAR, C2 = o.color === "tur" ? TUR : NAR3, C3 = o.color === "tur" ? TUR3 : ROJO;
    const boca = cara === "duda" ? `<path class="pe-p-boca" d="M150 22 Q138 30 128 24" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : cara === "neutra" ? `<path class="pe-p-boca" d="M152 20 L128 22" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : cara === "chau" ? `<path class="pe-p-boca" d="M150 14 Q136 30 124 16" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : `<path class="pe-p-boca" d="M154 12 Q140 40 122 18" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    const parpado = cara === "duda" ? `<path d="M64 -48 Q90 -66 116 -48 L116 -40 Q90 -52 64 -40 Z" fill="${C2}" stroke="${INK}" stroke-width="4"/>` : cara === "chau" ? `<path d="M62 -46 Q90 -70 118 -46 L118 -26 Q90 -40 62 -26 Z" fill="${C2}" stroke="${INK}" stroke-width="4"/>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pe-p">
      <g class="pe-p-cola"><path d="M-140 0 L-235 -82 Q-222 0 -235 82 Z" fill="${C3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-200 -40 L-160 -6 M-200 40 L-160 6" stroke="${INK}" stroke-width="4" opacity="0.4"/></g>
      <path d="M-30 -88 Q20 -150 70 -92 Z" fill="${C3}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-20 86 Q10 130 40 88 Z" fill="${C3}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-150 0 C-120 -90 -20 -110 60 -95 C130 -82 175 -40 175 5 C175 50 130 85 60 95 C-20 110 -120 90 -150 0 Z" fill="${C1}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -70 Q-40 0 -56 40 M-20 -82 Q-2 -20 -16 50" fill="none" stroke="${C2}" stroke-width="8" stroke-linecap="round"/>
      <path d="M-120 22 C-80 70 20 88 90 70 C130 60 160 40 168 24 C120 40 20 50 -120 22 Z" fill="${CRE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path class="pe-p-aleta" d="M30 20 Q-10 50 -40 40 Q-20 10 30 20 Z" fill="${C3}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="90" cy="-36" r="30" fill="${CRE}" stroke="${INK}" stroke-width="6"/>
      <circle cx="98" cy="-34" r="15" fill="${INK}"/><circle cx="103" cy="-40" r="5" fill="#ffffff"/>
      <path d="M66 -60 L58 -76 M80 -66 L76 -84 M96 -68 L98 -86" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      ${parpado}
      <circle cx="72" cy="10" r="12" fill="${ROJO2}" opacity="0.6"/>
      ${boca}
    </g></g>`;
  }

  // LA LANCHA de costado: centro de la línea de flotación (x, y), escala s. Largo ~ 760*s. Proa a la derecha.
  // clases: .pe-la
  function lancha(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pe-la">
      <path d="M-380 -110 L380 -130 Q330 -10 250 30 L-330 30 Q-370 -30 -380 -110 Z" fill="${CRE}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M-372 -60 L362 -76 Q350 -50 334 -30 L-358 -16 Z" fill="${ROJO}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-380 -110 L380 -130" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
      <text data-layout-ignore x="-120" y="${o.nombreY || -24}" font-family="Black Ops One" font-size="34" fill="${CRE}" letter-spacing="3">${o.nombre || "LA PICADA"}</text>
      <circle cx="210" cy="-36" r="18" fill="${CRE2}" stroke="${INK}" stroke-width="5"/>
      <!-- motor fuera de borda -->
      <rect x="-430" y="-170" width="70" height="120" rx="14" fill="${TUR3}" stroke="${INK}" stroke-width="8"/>
      <path d="M-395 -50 L-395 40" stroke="${INK}" stroke-width="18"/>
    </g></g>`;
  }

  // BOYA roja y crema: centro (x, y), radio r. clase .pe-boya
  function boya(x, y, r, o) {
    o = o || {};
    return `<g class="pe-boya ${o.cls || ""}" transform="translate(${x} ${y})">
      <path d="M0 ${-r * 2.1} L0 ${-r * 0.9}" stroke="${INK}" stroke-width="${r * 0.28}" stroke-linecap="round"/>
      <circle r="${r}" fill="${CRE}" stroke="${INK}" stroke-width="${r * 0.2}"/>
      <path d="M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z" fill="${ROJO}" stroke="${INK}" stroke-width="${r * 0.2}" stroke-linejoin="round"/>
      <path d="M${-r * 0.5} ${-r * 0.55} A${r * 0.7} ${r * 0.7} 0 0 1 ${-r * 0.05} ${-r * 0.75}" fill="none" stroke="#ffffff" stroke-width="${r * 0.14}" stroke-linecap="round" opacity="0.8"/>
    </g>`;
  }

  // CAÑA: de la mano (x0, y0) a la punta (x1, y1) con curva "comba" (px); carrete cerca de la mano.
  // clases: .pe-cana (todo) .pe-cana-vara
  function cana(x0, y0, x1, y1, o) {
    o = o || {};
    const comba = o.comba ?? 0;
    const mx = (x0 + x1) / 2 + comba * 0.4, my = (y0 + y1) / 2 - comba;
    const ang = Math.atan2(y1 - y0, x1 - x0);
    const cx = x0 + Math.cos(ang) * 70, cy = y0 + Math.sin(ang) * 70;
    return `<g class="pe-cana ${o.cls || ""}">
      <path class="pe-cana-vara" d="M${x0} ${y0} Q${mx} ${my} ${x1} ${y1}" fill="none" stroke="${INK}" stroke-width="${o.grosor || 18}" stroke-linecap="round"/>
      <path d="M${x0} ${y0} Q${mx} ${my} ${x1} ${y1}" fill="none" stroke="${NAR3}" stroke-width="${(o.grosor || 18) * 0.45}" stroke-linecap="round"/>
      <path d="M${x0} ${y0} L${x0 + Math.cos(ang) * 120} ${y0 + Math.sin(ang) * 120}" stroke="${INK}" stroke-width="${(o.grosor || 18) * 1.9}" stroke-linecap="round"/>
      <circle cx="${cx + Math.sin(ang) * 30}" cy="${cy - Math.cos(ang) * 30}" r="${o.carrete || 30}" fill="${CRE2}" stroke="${INK}" stroke-width="7"/>
      <circle cx="${cx + Math.sin(ang) * 30}" cy="${cy - Math.cos(ang) * 30}" r="${(o.carrete || 30) * 0.4}" fill="${INK}"/>
    </g>`;
  }

  // CARRETE grande (primer plano): centro (x, y), radio r. clases .pe-cr (todo) .pe-cr-giro (rotar con svgOrigin "x y")
  function carrete(x, y, r) {
    let rayos = "";
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; rayos += `<path d="M${x} ${y} L${x + Math.cos(a) * r * 0.78} ${y + Math.sin(a) * r * 0.78}" stroke="${INK}" stroke-width="${r * 0.07}" stroke-linecap="round"/>`; }
    return `<g class="pe-cr">
      <rect x="${x - r * 0.2}" y="${y - r * 1.5}" width="${r * 0.4}" height="${r * 0.6}" rx="${r * 0.08}" fill="${TUR3}" stroke="${INK}" stroke-width="8"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${CRE2}" stroke="${INK}" stroke-width="12"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.82}" fill="${TUR2}" stroke="${INK}" stroke-width="5"/>
      <g class="pe-cr-giro">
        ${rayos}
        <circle cx="${x}" cy="${y}" r="${r * 0.18}" fill="${NAR}" stroke="${INK}" stroke-width="7"/>
        <path d="M${x} ${y} L${x + r * 1.25} ${y}" stroke="${INK}" stroke-width="${r * 0.16}" stroke-linecap="round"/>
        <path d="M${x} ${y} L${x + r * 1.25} ${y}" stroke="${NAR}" stroke-width="${r * 0.08}" stroke-linecap="round"/>
        <rect x="${x + r * 1.15}" y="${y - r * 0.32}" width="${r * 0.26}" height="${r * 0.64}" rx="${r * 0.12}" fill="${ROJO}" stroke="${INK}" stroke-width="7"/>
      </g>
    </g>`;
  }

  // SONDA (fish finder): marco (x, y, w, h). Pantalla azul profunda con escala de profundidad, fondo marino
  // y ecos. o.pez: [px, py] donde va el eco grande del cliente (clase .pe-sn-pez), o.titulo.
  // clases: .pe-sn .pe-sn-scan (ecos y fondo, mover en x) .pe-sn-pez .pe-sn-barrido (línea vertical)
  function sonda(x, y, w, h, o) {
    o = o || {};
    const sx = x + 30, sy = y + 96, sw = w - 60, sh = h - 150;
    const id = o.id || "pe-sn-clip";
    let fondo = `M${sx} ${sy + sh}`;
    const rnd = azar(o.seed || 5);
    for (let k = 0; k <= 24; k++) fondo += ` L${sx + (k / 12) * sw} ${sy + sh * (0.8 + rnd() * 0.1)}`;
    fondo += ` L${sx + sw * 2} ${sy + sh} Z`;
    let ecos = "";
    for (let k = 0; k < 9; k++) {
      const ex = sx + 40 + rnd() * sw * 1.8, ey = sy + 70 + rnd() * sh * 0.55, er = 14 + rnd() * 12;
      ecos += `<path d="M${ex - er} ${ey + er * 0.4} Q${ex} ${ey - er * 0.6} ${ex + er} ${ey + er * 0.4}" fill="none" stroke="${k % 3 ? TUR2 : NAR2}" stroke-width="7" stroke-linecap="round" opacity="0.75"/>`;
    }
    let escala = "";
    for (let k = 0; k <= 4; k++) {
      const yy = sy + 20 + (k / 4) * (sh - 40);
      escala += `<path d="M${sx + sw - 46} ${yy} L${sx + sw} ${yy}" stroke="${CRE}" stroke-width="3" opacity="0.5"/><text data-layout-ignore x="${sx + sw - 52}" y="${yy + 8}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="${CRE}" opacity="0.6">${k * 5}</text>`;
    }
    const [px, py] = o.pez || [sx + sw * 0.55, sy + sh * 0.45];
    return `<g class="pe-sn">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${INK}" stroke="${INK}" stroke-width="10"/>
      <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="28" fill="none" stroke="${NAR}" stroke-width="5"/>
      <text data-layout-ignore x="${x + 40}" y="${y + 62}" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${NAR2}" letter-spacing="4">${o.titulo || "SONDA"}</text>
      <circle cx="${x + w - 50}" cy="${y + 52}" r="11" fill="${ROJO}"/>
      <text data-layout-ignore x="${x + w - 72}" y="${y + 62}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="${CRE}">${o.prof || "PROF 12 m"}</text>
      <defs><clipPath id="${id}"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12"/></clipPath></defs>
      <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" fill="#04222b"/>
      <g clip-path="url(#${id})">
        <g class="pe-sn-scan">
          <path d="M${sx} ${sy + 24} L${sx + sw * 2} ${sy + 24}" stroke="${TUR2}" stroke-width="10" opacity="0.6"/>
          <path d="${fondo}" fill="${NAR3}" opacity="0.9"/>
          <path d="${fondo}" fill="none" stroke="${NAR2}" stroke-width="6"/>
          ${ecos}
        </g>
        ${escala}
        <g class="pe-sn-pez">
          <path d="M${px - 70} ${py + 26} Q${px} ${py - 44} ${px + 70} ${py + 26}" fill="none" stroke="${ROJO}" stroke-width="22" stroke-linecap="round"/>
          <path d="M${px - 70} ${py + 26} Q${px} ${py - 44} ${px + 70} ${py + 26}" fill="none" stroke="${NAR2}" stroke-width="10" stroke-linecap="round"/>
          <g transform="translate(${px} ${py - 66}) scale(0.32)">${pezIcono()}</g>
        </g>
        <path class="pe-sn-barrido" d="M${sx + sw - 4} ${sy} L${sx + sw - 4} ${sy + sh}" stroke="${CRE}" stroke-width="4" opacity="0.5"/>
      </g>
      <rect x="${x + 30}" y="${y + h - 46}" width="${w - 60}" height="22" rx="11" fill="${TUR4}"/>
      <text data-layout-ignore x="${x + w / 2}" y="${y + h - 28}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="${TUR2}" letter-spacing="3">FRECUENCIA 200 kHz · AGUAS DE WHATSAPP</text>
    </g>`;
  }
  // ícono de pez simple (para la sonda): centro (0,0), largo ~ 300
  function pezIcono() {
    return `<path d="M-130 0 L-190 -60 L-190 60 Z" fill="${NAR}" stroke="${CRE}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M-140 0 C-100 -80 60 -90 140 0 C60 90 -100 80 -140 0 Z" fill="${NAR}" stroke="${CRE}" stroke-width="10"/>
      <circle cx="80" cy="-14" r="14" fill="${CRE}"/>`;
  }

  // EL AGENTE DE IA: un celular con cara y gorro de pescador, de cuerpo entero. Origen = pies (x, y). Alto ~ 620*s.
  // o.cana: true sostiene la caña firme hacia la derecha. clases: .pe-k .pe-k-ojos .pe-k-boca .pe-k-brazo
  function agente(x, y, s, o) {
    o = o || {};
    const cana2 = o.cana ? `<g class="pe-k-cana">${cana(120, -300, 420, -620, { comba: -40, grosor: 14, carrete: 24 })}</g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pe-k">
      <path d="M-60 -80 L-70 0 M60 -80 L70 0" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
      <path d="M-100 0 L-50 0 M50 0 L100 0" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
      <g class="pe-k-brazo-i"><path d="M-130 -330 C-200 -290 -210 -220 -180 -180" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="-180" cy="-176" r="26" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>
      ${cana2}
      <g class="pe-k-brazo"><path d="M130 -330 C170 -330 160 -300 130 -300" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="130" cy="-300" r="26" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>
      <rect x="-140" y="-520" width="280" height="450" rx="46" fill="${INK}"/>
      <rect x="-122" y="-500" width="244" height="400" rx="32" fill="#0f2a1a" stroke="${VERDE}" stroke-width="5"/>
      <g class="pe-k-ojos"><rect x="-74" y="-400" width="40" height="58" rx="20" fill="${VERDE}"/><rect x="34" y="-400" width="40" height="58" rx="20" fill="${VERDE}"/></g>
      <path class="pe-k-boca" d="M-50 -290 Q0 -246 50 -290" fill="none" stroke="${VERDE}" stroke-width="12" stroke-linecap="round"/>
      <text data-layout-ignore x="0" y="-130" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${VERDE}" letter-spacing="4">IA</text>
      <!-- gorro de pescador -->
      <path d="M-170 -520 C-170 -540 -140 -550 -110 -552 L110 -552 C140 -550 170 -540 170 -520 C170 -508 120 -504 0 -506 C-120 -504 -170 -508 -170 -520 Z" fill="${CRE2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-110 -548 C-114 -630 -60 -650 0 -650 C60 -650 114 -630 110 -548 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-110 -572 L110 -572" stroke="${VERDE2}" stroke-width="14"/>
    </g></g>`;
  }

  // BURBUJAS que suben: n burbujas alrededor de (x, y). clase .pe-bu (cada una .pe-b)
  function burbujas(x, y, n, seed, o) {
    o = o || {};
    const rnd = azar(seed || 3);
    let s = "";
    for (let k = 0; k < n; k++) {
      const bx = Math.round(x + (rnd() - 0.5) * (o.w || 80)), by = Math.round(y + rnd() * (o.h || 60)), r = Math.round(8 + rnd() * (o.r || 14));
      s += `<circle class="pe-b" cx="${bx}" cy="${by}" r="${r}" fill="${CRE}" fill-opacity="0.18" stroke="${CRE}" stroke-width="4" stroke-opacity="0.8"/>`;
    }
    return `<g class="pe-bu ${o.cls || ""}">${s}</g>`;
  }

  // AGUA de una cámara submarina: rectángulo (x, y, w, h) con rayos de luz y fondo de arena. Devuelve defs + fondo;
  // aguaMarco() el marco encima (REC). clipPath id.
  function agua(x, y, w, h, id) {
    let rayos = "";
    for (let k = 0; k < 5; k++) rayos += `<path d="M${x + 80 + k * w / 5} ${y} L${x + 20 + k * w / 5} ${y + h} L${x + 110 + k * w / 5} ${y + h} L${x + 140 + k * w / 5} ${y} Z" fill="${CRE}" opacity="0.06"/>`;
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36"/></clipPath>
      <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${TUR}"/><stop offset="0.55" stop-color="${TUR3}"/><stop offset="1" stop-color="${TUR4}"/></linearGradient></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="url(#${id}-g)"/>
      <g clip-path="url(#${id})">${rayos}
        <path d="M${x} ${y + h - 70} Q${x + w * 0.25} ${y + h - 110} ${x + w * 0.5} ${y + h - 80} T${x + w} ${y + h - 90} L${x + w} ${y + h} L${x} ${y + h} Z" fill="${CRE2}" opacity="0.85"/>
        <path d="M${x + 90} ${y + h - 80} q-20 -90 10 -170 M${x + 110} ${y + h - 80} q30 -70 0 -140 M${x + w - 120} ${y + h - 90} q-25 -110 15 -200" fill="none" stroke="${TUR3}" stroke-width="16" stroke-linecap="round"/>
      </g>`;
  }
  function aguaMarco(x, y, w, h, etiqueta) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="none" stroke="${INK}" stroke-width="12"/>
      <path d="M${x + 30} ${y + 80} L${x + 30} ${y + 30} L${x + 80} ${y + 30} M${x + w - 80} ${y + 30} L${x + w - 30} ${y + 30} L${x + w - 30} ${y + 80} M${x + 30} ${y + h - 80} L${x + 30} ${y + h - 30} L${x + 80} ${y + h - 30} M${x + w - 80} ${y + h - 30} L${x + w - 30} ${y + h - 30} L${x + w - 30} ${y + h - 80}" fill="none" stroke="${CRE}" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
      <circle class="pe-rec" cx="${x + 70}" cy="${y + 72}" r="13" fill="${ROJO}"/>
      <text data-layout-ignore x="${x + 94}" y="${y + 82}" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${CRE}" letter-spacing="3">${etiqueta || "CÁMARA SUBMARINA"}</text>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || "#e9e1cb"}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || TUR3}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${CRE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${CRE}">${nombre}</text>
      <text class="pe-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${CRE2}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho].
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d6f0c4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hora = o.hora ? `<text x="${gx + ancho - 18}" y="${y + alto - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#6b6259">${o.hora}</text>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}${hora}</g>`, alto, ancho];
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
    // centro de un elemento SVG como "x y"
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
    // la boca se abre y cierra (susurrar, hablar)
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.7, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // la cola del pez se mueve (nadar)
    function nadar(sel, t, d, vel) {
      qa(sel + " .pe-p-cola").forEach((c) => {
        const bb = c.getBBox();
        origen(c, `${bb.x + bb.width} ${bb.y + bb.height / 2}`);
        const v = vel || 0.18;
        const n = Math.max(1, Math.round(d / v / 2));
        tl.fromTo(c, { rotation: -14 }, { rotation: 14, duration: v, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // burbujas que suben y se desvanecen
    function burbujear(sel, t, d, sube) {
      qa(sel + " .pe-b").forEach((b, i) => {
        gsap.set(b, { opacity: 0 });
        tl.fromTo(b, { y: 0, opacity: 0 }, { y: -(sube || 220), opacity: 1, duration: d || 1.2, ease: "power1.out", immediateRender: false }, t + (i % 6) * 0.12);
        tl.to(b, { opacity: 0, duration: 0.25 }, t + (i % 6) * 0.12 + (d || 1.2) - 0.25);
      });
    }
    // vaivén de la lancha / del agua
    function mecer(el, t, d, ori, amp) {
      origen(el, ori);
      const n = Math.max(1, Math.round(d / 0.9));
      tl.fromTo(el, { rotation: -(amp || 1.6), y: 0 }, { rotation: amp || 1.6, y: 6, duration: d / n, yoyo: true, repeat: n - 1, ease: "sine.inOut", svgOrigin: ori, immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, centro, sello, sacudon, dibujar, hablar, nadar, burbujear, mecer, salida };
  }
  return { INK, NAR, NAR2, NAR3, TUR, TUR2, TUR3, TUR4, CRE, CRE2, ROJO, ROJO2, PIEL, PIEL2, VERDE, VERDE2, azar, conductor, dueno, pez, pezIcono, lancha, boya, cana, carrete, sonda, agente, burbujas, agua, aguaMarco, celular, celularBorde, chatCabecera, globo, kit };
})();
