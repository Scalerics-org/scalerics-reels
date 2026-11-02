// Piezas del reel "el-guardavidas": el guardavidas canchero, la clienta en el agua, el dueño en la reposera,
// la torre, banderas, salvavidas, olas, mate y termo, el agente de IA guardavidas, el celular con chat,
// sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = PL.guardavidas(x, y, s) + ...
// y en el script: const K = PL.kit(tl, root).
window.PL = window.PL || (function () {
  const INK = "#10202b", CEL = "#8fd6f0", TUR = "#1aa6b7", TUR2 = "#7fe0e6", TUR3 = "#0b6e7a", ARENA = "#f2d49b", ARENA2 = "#d9b36c",
    ROJO = "#e5484d", ROJO2 = "#ff9a8a", AMA = "#ffc93c", AMA2 = "#e0a400", CRE = "#fff6e3", PIEL = "#f0c09a", PIEL2 = "#d9996c",
    BRON = "#d99a62", BRON2 = "#b97a45", VERDE = "#5ce611", VERDE2 = "#3f9e0b", BOCA = "#7a1420";
  if (!document.getElementById("pl-css")) {
    const st = document.createElement("style");
    st.id = "pl-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.pl-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROJO}; border-radius: 14px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(255, 246, 227, 0.95); }
.pl-sello.ama { border-color: ${AMA2}; color: ${INK}; background: ${AMA}; }
.pl-sello.tur { border-color: ${TUR3}; color: ${TUR3}; }
.pl-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.pl-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${AMA}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.25);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${AMA}; white-space: nowrap; text-align: center; }
.pl-tag.rojo { background: ${ROJO}; border-color: ${CRE}; color: ${CRE}; }
.pl-tag.tur { background: ${TUR3}; border-color: ${TUR2}; color: ${CRE}; }
.pl-tag.verde { background: ${VERDE2}; border-color: ${CRE}; color: ${CRE}; }
.pl-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${CRE}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 7px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}; letter-spacing: -0.01em; }
.pl-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
.pl-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: ${INK}; white-space: nowrap; line-height: 1; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // SILBATO amarillo: centro (x, y), escala s
  function silbato(x, y, s, rot) {
    return `<g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})"><path d="M-34 -16 L20 -16 Q40 -16 40 4 Q40 24 20 24 Q4 24 0 10 L-34 10 Z" fill="${AMA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="20" cy="4" r="7" fill="${INK}"/></g>`;
  }

  // EL GUARDAVIDAS: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // o.cara: "canchero" (default) | "grito" | "enojado" | "serio" | "feliz"; o.lentes: false (sin lentes, ojos a la vista;
  // los lentes van arriba del pelo); o.brazo: "senala" (señala a la derecha) | "arriba" (puño en alto) | "prismaticos"
  // | "silbato" (silbato en la boca). clases: .pl-g .pl-g-cabeza .pl-g-boca .pl-g-brazo .pl-g-silb
  function guardavidas(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "canchero";
    const lentes = o.lentes !== false && o.brazo !== "prismaticos";
    const cejas = cara === "enojado" ? "M-78 -404 L-28 -384 M78 -404 L28 -384" : cara === "grito" ? "M-78 -414 Q-52 -432 -26 -416 M78 -414 Q52 -432 26 -416"
      : cara === "serio" ? "M-78 -398 Q-52 -392 -26 -400 M78 -398 Q52 -392 26 -400" : "M-78 -402 Q-52 -414 -26 -404 M78 -396 Q52 -404 26 -398";
    const ojos = lentes
      ? `<path d="M-108 -372 Q-108 -392 -86 -392 L86 -392 Q108 -392 108 -372 L102 -346 Q96 -322 66 -322 Q30 -322 18 -348 L10 -358 L-10 -358 L-18 -348 Q-30 -322 -66 -322 Q-96 -322 -102 -346 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
         <path d="M-84 -378 L-50 -378 M50 -378 L84 -378" stroke="${TUR2}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
         <path d="M-70 -360 L-40 -340 M60 -364 L84 -346" stroke="${CRE}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>`
      : cara === "feliz" ? `<path d="M-70 -356 Q-50 -378 -30 -356 M70 -356 Q50 -378 30 -356" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "grito" ? `<circle cx="-50" cy="-358" r="18" fill="${CRE}" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="-358" r="18" fill="${CRE}" stroke="${INK}" stroke-width="6"/><circle cx="-50" cy="-358" r="7" fill="${INK}"/><circle cx="50" cy="-358" r="7" fill="${INK}"/>`
      : `<ellipse cx="-50" cy="-358" rx="11" ry="13" fill="${INK}"/><ellipse cx="50" cy="-358" rx="11" ry="13" fill="${INK}"/><circle cx="-46" cy="-363" r="4" fill="#ffffff"/><circle cx="54" cy="-363" r="4" fill="#ffffff"/>`;
    const boca = o.brazo === "silbato" ? `<g class="pl-g-boca">${silbato(36, -262, 1.1, -8)}</g>`
      : cara === "grito" ? `<path class="pl-g-boca" d="M-38 -282 Q0 -296 38 -282 Q34 -226 0 -222 Q-34 -226 -38 -282 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-30 -280 L30 -280" stroke="${CRE}" stroke-width="8"/>`
      : cara === "feliz" ? `<path class="pl-g-boca" d="M-46 -284 Q0 -226 46 -284 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-40 -282 L40 -282" stroke="${CRE}" stroke-width="7"/>`
      : cara === "enojado" ? `<path class="pl-g-boca" d="M-36 -258 Q0 -290 36 -258 L32 -252 Q0 -272 -32 -252 Z" fill="${BOCA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "serio" ? `<path class="pl-g-boca" d="M-28 -268 Q0 -276 28 -268" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<path class="pl-g-boca" d="M-40 -276 Q-4 -250 42 -290" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M8 -268 L30 -282" stroke="${CRE}" stroke-width="6" stroke-linecap="round"/>`;
    const brazoPiel = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="70" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${BRON}" stroke-width="56" stroke-linecap="round"/>`;
    let brazo = "";
    if (o.brazo === "senala") brazo = `<g class="pl-g-brazo">${brazoPiel("M180 -150 C260 -190 330 -250 400 -300")}
        <ellipse cx="412" cy="-306" rx="34" ry="28" fill="${BRON}" stroke="${INK}" stroke-width="6"/>
        <path d="M430 -320 L490 -350" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M430 -320 L490 -350" stroke="${BRON}" stroke-width="18" stroke-linecap="round"/></g>`;
    else if (o.brazo === "arriba") brazo = `<g class="pl-g-brazo">${brazoPiel("M190 -160 C250 -240 260 -340 240 -440")}
        <circle cx="240" cy="-470" r="42" fill="${BRON}" stroke="${INK}" stroke-width="6"/><path d="M214 -486 L266 -486 M214 -466 L266 -466" stroke="${INK}" stroke-width="4" opacity="0.5"/></g>`;
    else if (o.brazo === "prismaticos") brazo = `<g class="pl-g-brazo">${brazoPiel("M-190 -60 C-180 -180 -150 -270 -90 -320")}${brazoPiel("M190 -60 C180 -180 150 -270 90 -320")}
        <rect x="-104" y="-404" width="88" height="96" rx="20" fill="${INK}"/><rect x="16" y="-404" width="88" height="96" rx="20" fill="${INK}"/>
        <rect x="-26" y="-380" width="52" height="34" fill="${INK}"/>
        <circle cx="-60" cy="-356" r="30" fill="${TUR3}" stroke="${CRE}" stroke-width="4"/><circle cx="60" cy="-356" r="30" fill="${TUR3}" stroke="${CRE}" stroke-width="4"/>
        <path d="M-74 -368 L-56 -376 M46 -368 L64 -376" stroke="${CRE}" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="-100" cy="-322" rx="34" ry="30" fill="${BRON}" stroke="${INK}" stroke-width="6"/><ellipse cx="100" cy="-322" rx="34" ry="30" fill="${BRON}" stroke="${INK}" stroke-width="6"/></g>`;
    const lentesArriba = !lentes && o.brazo !== "prismaticos" ? `<g transform="translate(-6 -440) rotate(-4)"><path d="M-96 -12 L96 -12 L90 14 Q84 30 56 30 Q24 30 16 10 L-16 10 Q-24 30 -56 30 Q-84 30 -90 14 Z" fill="${INK}"/><path d="M-70 -2 L-44 -2 M44 -2 L70 -2" stroke="${TUR2}" stroke-width="6" stroke-linecap="round"/></g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pl-g">
      <!-- hombros bronceados y musculosa roja con la cruz -->
      <path d="M-250 40 C-252 -110 -200 -205 -90 -222 L90 -222 C200 -205 252 -110 250 40 Z" fill="${BRON}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-170 40 L-160 -150 Q-120 -200 -70 -212 Q0 -150 70 -212 Q120 -200 160 -150 L170 40 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-196 -60 Q-210 -120 -180 -170 M196 -60 Q210 -120 180 -170" fill="none" stroke="${BRON2}" stroke-width="7" stroke-linecap="round"/>
      <rect x="-22" y="-120" width="44" height="120" fill="${CRE}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="-82" width="120" height="44" fill="${CRE}" stroke="${INK}" stroke-width="5"/>
      <rect x="-20" y="-118" width="40" height="116" fill="${CRE}"/>
      <text data-layout-ignore x="0" y="30" text-anchor="middle" font-family="Black Ops One" font-size="30" fill="${AMA}" letter-spacing="2">GUARDAVIDAS</text>
      <!-- cordón y silbato colgando -->
      <path d="M-56 -212 Q-30 -120 30 -110 Q60 -150 56 -212" fill="none" stroke="${AMA}" stroke-width="7"/>
      ${o.brazo === "silbato" ? "" : `<g class="pl-g-silb">${silbato(40, -100, 0.9, 20)}</g>`}
      <path d="M-44 -282 L-48 -212 L48 -212 L44 -282 Z" fill="${BRON2}" stroke="${INK}" stroke-width="7"/>
      <g class="pl-g-cabeza">
        <ellipse cx="-108" cy="-346" rx="20" ry="30" fill="${BRON}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="108" cy="-346" rx="20" ry="30" fill="${BRON}" stroke="${INK}" stroke-width="7"/>
        <path d="M-106 -396 C-110 -486 110 -486 106 -396 L102 -318 C96 -254 54 -228 0 -228 C-54 -228 -96 -254 -102 -318 Z" fill="${BRON}" stroke="${INK}" stroke-width="8"/>
        <!-- jopo rubio -->
        <path d="M-112 -380 C-130 -470 -60 -520 10 -512 C60 -540 140 -520 128 -470 C150 -450 130 -410 110 -392 C90 -430 40 -446 -10 -440 C-50 -436 -90 -420 -112 -380 Z" fill="${AMA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-60 -480 Q-10 -500 40 -486 M-20 -458 Q30 -476 90 -462" fill="none" stroke="${AMA2}" stroke-width="7" stroke-linecap="round"/>
        ${lentesArriba}
        <path class="pl-g-cejas" d="${cejas}" fill="none" stroke="${AMA2}" stroke-width="12" stroke-linecap="round"/>
        <g class="pl-g-ojos">${ojos}</g>
        <!-- nariz con protector blanco -->
        <path d="M0 -344 C-14 -312 -20 -298 -2 -292" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-14 -336 L6 -336 L4 -300 L-18 -300 Z" fill="${CRE}" opacity="0.9"/>
        <path d="M-80 -306 L-56 -306 M56 -306 L80 -306" stroke="${CRE}" stroke-width="10" stroke-linecap="round" opacity="0.85"/>
        ${boca}
      </g>
      ${brazo}
    </g></g>`;
  }

  // LA CLIENTA en el agua: cabeza y hombros. Origen = línea del agua al centro (x, y). Cabeza en (0,-190).
  // o.cara: "feliz" (default) | "duda" | "asustada" | "triste" | "aliviada"; o.mano: "celular" | "auxilio" | "chau" | "";
  // o.agua: color del agua del frente (default TUR). clases: .pl-c .pl-c-cuerpo (bajar en y para hundirla) .pl-c-mano .pl-c-boca
  function clienta(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "feliz";
    const ojos = cara === "aliviada" ? `<path d="M-56 -200 Q-38 -184 -20 -200 M56 -200 Q38 -184 20 -200" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "asustada" ? `<circle cx="-38" cy="-200" r="17" fill="${CRE}" stroke="${INK}" stroke-width="5"/><circle cx="38" cy="-200" r="17" fill="${CRE}" stroke="${INK}" stroke-width="5"/><circle cx="-38" cy="-198" r="7" fill="${INK}"/><circle cx="38" cy="-198" r="7" fill="${INK}"/>`
      : `<ellipse cx="-38" cy="-200" rx="10" ry="13" fill="${INK}"/><ellipse cx="38" cy="-200" rx="10" ry="13" fill="${INK}"/><circle cx="-34" cy="-205" r="4" fill="#ffffff"/><circle cx="42" cy="-205" r="4" fill="#ffffff"/>
         <path d="M-54 -214 L-62 -222 M-48 -216 L-52 -226 M54 -214 L62 -222 M48 -216 L52 -226" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    const cejas = cara === "asustada" || cara === "triste" ? "M-58 -236 L-22 -228 M58 -236 L22 -228" : cara === "duda" ? "M-58 -228 L-22 -228 M58 -240 Q40 -248 22 -236" : "M-58 -232 Q-40 -242 -22 -232 M58 -232 Q40 -242 22 -232";
    const boca = cara === "asustada" ? `<ellipse class="pl-c-boca" cx="0" cy="-140" rx="16" ry="20" fill="${BOCA}" stroke="${INK}" stroke-width="5"/>`
      : cara === "triste" ? `<path class="pl-c-boca" d="M-24 -134 Q0 -152 24 -134" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : cara === "duda" ? `<path class="pl-c-boca" d="M-22 -142 Q4 -136 24 -148" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : `<path class="pl-c-boca" d="M-30 -150 Q0 -112 30 -150 Z" fill="${BOCA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    const brazoP = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="46" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${PIEL}" stroke-width="34" stroke-linecap="round"/>`;
    let mano = "";
    if (o.mano === "celular") mano = `<g class="pl-c-mano">${brazoP("M110 -40 C150 -100 160 -170 150 -230")}
        <g transform="rotate(8 150 -300)"><rect x="104" y="-380" width="92" height="160" rx="16" fill="${INK}"/><rect x="113" y="-368" width="74" height="132" rx="9" fill="${TUR2}"/>
        <rect x="122" y="-350" width="50" height="14" rx="7" fill="${CRE}"/><rect x="122" y="-326" width="36" height="14" rx="7" fill="${CRE}"/></g>
        <ellipse cx="148" cy="-236" rx="26" ry="22" fill="${PIEL}" stroke="${INK}" stroke-width="5"/></g>`;
    else if (o.mano === "auxilio") mano = `<g class="pl-c-mano">${brazoP("M110 -40 C150 -120 170 -230 180 -330")}
        <path d="M150 -350 L148 -400 M168 -356 L170 -410 M186 -354 L192 -404 M202 -344 L214 -386" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
        <path d="M150 -350 L148 -400 M168 -356 L170 -410 M186 -354 L192 -404 M202 -344 L214 -386" stroke="${PIEL}" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="180" cy="-336" rx="34" ry="28" fill="${PIEL}" stroke="${INK}" stroke-width="5"/></g>`;
    else if (o.mano === "chau") mano = `<g class="pl-c-mano">${brazoP("M-110 -40 C-150 -110 -160 -190 -150 -250")}
        <ellipse cx="-150" cy="-262" rx="30" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="5"/></g>`;
    const agua = o.agua || TUR;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pl-c">
      <defs><clipPath id="${o.id || "pl-c-clip"}"><rect x="-400" y="-700" width="800" height="${700 + (o.bajo || 12)}"/></clipPath></defs>
      <g clip-path="url(#${o.id || "pl-c-clip"})"><g class="pl-c-cuerpo">
        <!-- malla turquesa claro con breteles, hombros -->
        <path d="M-150 120 C-150 20 -110 -50 -40 -62 L40 -62 C110 -50 150 20 150 120 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-96 120 L-90 -10 Q0 20 90 -10 L96 120 Z" fill="${ROJO2}" stroke="${INK}" stroke-width="6"/>
        <path d="M-80 -6 L-60 -58 M80 -6 L60 -58" stroke="${ROJO2}" stroke-width="10"/>
        <path d="M-24 -100 L-26 -58 L26 -58 L24 -100 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="6"/>
        <!-- pelo atrás (cola) -->
        <path d="M60 -250 C140 -240 150 -150 110 -96 C100 -140 90 -180 50 -210 Z" fill="#5a3320" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-82 -210 C-86 -290 86 -290 82 -210 L78 -160 C72 -116 40 -96 0 -96 C-40 -96 -72 -116 -78 -160 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-88 -196 C-104 -300 40 -320 92 -250 C96 -230 92 -212 86 -196 C70 -250 30 -262 -10 -258 C-40 -254 -70 -236 -88 -196 Z" fill="#5a3320" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="-60" cy="-276" r="14" fill="${AMA}" stroke="${INK}" stroke-width="4"/>
        <path class="pl-c-cejas" d="${cejas}" fill="none" stroke="#5a3320" stroke-width="8" stroke-linecap="round"/>
        <g class="pl-c-ojos">${ojos}</g>
        <path d="M0 -190 C-8 -170 -12 -162 0 -158" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="-52" cy="-160" r="11" fill="${ROJO2}" opacity="0.6"/><circle cx="52" cy="-160" r="11" fill="${ROJO2}" opacity="0.6"/>
        ${boca}
        ${mano}
      </g></g>
      <!-- agua delante -->
      <path class="pl-c-agua" d="M-250 6 Q-190 -14 -130 6 T-10 6 T110 6 T230 6 Q300 30 280 80 Q200 140 0 146 Q-200 140 -270 80 Q-290 30 -250 6 Z" fill="${agua}"/>
      <path d="M-250 6 Q-190 -14 -130 6 T-10 6 T110 6 T230 6" fill="none" stroke="${CRE}" stroke-width="8" stroke-linecap="round"/>
      <path d="M-200 30 Q-160 20 -120 30 M40 40 Q80 30 120 40" fill="none" stroke="${CRE}" stroke-width="6" stroke-linecap="round" opacity="0.7"/>
    </g></g>`;
  }

  // MATE de calabaza con bombilla: centro de la base (x, y), escala s. clase .pl-mate
  function mate(x, y, s, o) {
    o = o || {};
    return `<g class="pl-mate ${o.cls || ""}" transform="translate(${x} ${y}) scale(${s || 1})">
      <path d="M44 -150 L22 -84" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M44 -150 L22 -84" stroke="#c9ced4" stroke-width="6" stroke-linecap="round"/>
      <path d="M-46 -86 C-70 -60 -66 -10 -30 0 L30 0 C66 -10 70 -60 46 -86 Z" fill="#7a4a24" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-50 -88 L50 -88" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M-50 -88 L50 -88" stroke="#c9ced4" stroke-width="5" stroke-linecap="round"/>
      <path d="M-30 -86 Q0 -110 30 -86 Z" fill="#5f8a2a" stroke="${INK}" stroke-width="4"/>
      <path d="M-30 -60 Q-34 -30 -18 -14" fill="none" stroke="#a46a38" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  }
  // TERMO: base (x, y), escala s. clase .pl-termo
  function termo(x, y, s, o) {
    o = o || {};
    return `<g class="pl-termo ${o.cls || ""}" transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s || 1})">
      <rect x="-34" y="-250" width="68" height="250" rx="16" fill="${TUR3}" stroke="${INK}" stroke-width="7"/>
      <rect x="-30" y="-286" width="60" height="40" rx="10" fill="${INK}"/><path d="M-12 -296 L22 -296 L28 -280 L-12 -280 Z" fill="${INK}"/>
      <path d="M34 -210 Q66 -200 64 -150 Q62 -110 34 -100" fill="none" stroke="${INK}" stroke-width="10"/>
      <path d="M-18 -220 L-18 -40" stroke="${CRE}" stroke-width="7" stroke-linecap="round" opacity="0.5"/>
    </g>`;
  }

  // EL DUEÑO en la reposera, de cuerpo entero sentado y tirado para atrás. Origen = arena al centro (x, y). Alto ~ 560*s.
  // o.cara: "dormido" (default) | "desganado" | "unojo"; o.mate: mate en la mano; o.cel: celular boca abajo en la panza.
  // clases: .pl-d .pl-d-cabeza .pl-d-boca .pl-d-mano .pl-d-zzz
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "dormido";
    const ojos = cara === "unojo" ? `<path d="M-60 -404 Q-42 -396 -24 -404" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="44" cy="-408" r="15" fill="${CRE}" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="-406" r="7" fill="${INK}"/>`
      : cara === "desganado" ? `<path d="M-62 -412 L-22 -412 M62 -412 L22 -412" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M-56 -408 Q-42 -398 -28 -408 M56 -408 Q42 -398 28 -408" fill="${INK}" stroke="${INK}" stroke-width="5"/>`
      : `<path d="M-60 -404 Q-42 -394 -24 -404 M60 -404 Q42 -394 24 -404" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const boca = cara === "unojo" ? `<ellipse class="pl-d-boca" cx="0" cy="-330" rx="13" ry="11" fill="${BOCA}" stroke="${INK}" stroke-width="5"/>`
      : `<path class="pl-d-boca" d="M-24 -332 Q0 -322 24 -334" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const lentes = o.lentes ? `<path d="M-84 -424 L84 -424 L80 -400 Q74 -384 46 -384 Q20 -384 14 -402 L-14 -402 Q-20 -384 -46 -384 Q-74 -384 -80 -400 Z" fill="${INK}"/>` : "";
    const brazoP = (d, c) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="58" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c || PIEL}" stroke-width="44" stroke-linecap="round"/>`;
    const manga = `<path d="M120 -300 Q190 -290 196 -220 L140 -190 Z" fill="${AMA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
    const mano = o.mate ? `<g class="pl-d-mano">${brazoP("M160 -230 C210 -170 220 -120 190 -80")}${manga}${mate(186, -30, 0.75)}<ellipse cx="176" cy="-70" rx="30" ry="26" fill="${PIEL}" stroke="${INK}" stroke-width="5"/></g>`
      : `<g class="pl-d-mano">${brazoP("M160 -230 C210 -170 230 -110 230 -60")}${manga}<ellipse cx="230" cy="-50" rx="28" ry="26" fill="${PIEL}" stroke="${INK}" stroke-width="5"/></g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pl-d">
      <!-- reposera a rayas -->
      <path d="M-230 0 L-150 -170 M230 0 L170 -190 M-200 -60 L210 -60" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <path d="M-170 -110 L160 -110 L190 -470 L-130 -490 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-114 -112 L-82 -484 M-42 -112 L-10 -480 M30 -112 L60 -476 M100 -112 L130 -472" stroke="${ROJO}" stroke-width="30"/>
      <path d="M-170 -110 L160 -110 L190 -470 L-130 -490 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <!-- piernas con short rojo y ojotas -->
      <path d="M-120 -110 L-150 -30 L-150 0 M70 -110 L120 -30 L130 0" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-120 -110 L-150 -30 L-150 0 M70 -110 L120 -30 L130 0" fill="none" stroke="${PIEL}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-180 8 L-110 8 M100 8 L170 8" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
      <path d="M-160 -120 L130 -120 L150 -170 L-150 -190 Z" fill="${ROJO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <!-- panza con camisa amarilla de flores abierta -->
      <path d="M-160 -170 C-190 -260 -160 -360 -90 -380 L90 -380 C160 -360 190 -260 150 -170 Z" fill="${AMA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-40 -380 C-80 -300 -60 -220 -20 -172 L40 -172 C80 -220 90 -300 40 -380 Z" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      <circle cx="-120" cy="-300" r="16" fill="${ROJO}"/><circle cx="-100" cy="-220" r="13" fill="${ROJO}"/><circle cx="110" cy="-310" r="15" fill="${ROJO}"/><circle cx="120" cy="-230" r="12" fill="${ROJO}"/>
      ${o.cel ? `<g class="pl-d-cel"><rect x="-30" y="-262" width="80" height="44" rx="10" fill="${INK}" transform="rotate(-8 10 -240)"/></g>` : ""}
      ${termo(-200, -150, 0.6, { rot: -18 })}
      <g class="pl-d-cabeza">
        <path d="M-80 -400 C-84 -500 84 -500 80 -400 L76 -350 C70 -312 40 -296 0 -296 C-40 -296 -70 -312 -76 -350 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <ellipse cx="-84" cy="-390" rx="16" ry="24" fill="${PIEL}" stroke="${INK}" stroke-width="6"/><ellipse cx="84" cy="-390" rx="16" ry="24" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <!-- sombrero de paja -->
        <path d="M-170 -450 Q0 -500 170 -450 Q140 -430 0 -436 Q-140 -430 -170 -450 Z" fill="${ARENA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-80 -446 C-84 -530 84 -530 80 -446 Z" fill="${ARENA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-80 -462 L80 -462" stroke="${ROJO}" stroke-width="14"/>
        <g class="pl-d-ojos">${ojos}</g>${lentes}
        <path d="M0 -394 C-10 -366 -14 -356 -2 -350" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-52 -346 C-30 -366 -10 -360 0 -350 C10 -360 30 -366 52 -346 C30 -338 10 -340 0 -344 C-10 -340 -30 -338 -52 -346 Z" fill="#6b5a48" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        ${boca}
      </g>
      ${mano}
      <g class="pl-d-zzz" opacity="${o.zzz ? 1 : 0}"><text data-layout-ignore x="110" y="-500" font-family="Black Ops One" font-size="56" fill="${INK}">Z</text><text data-layout-ignore x="160" y="-550" font-family="Black Ops One" font-size="42" fill="${INK}">z</text><text data-layout-ignore x="196" y="-590" font-family="Black Ops One" font-size="32" fill="${INK}">z</text></g>
    </g></g>`;
  }

  // LA TORRE de guardavidas: origen = base al centro (x, y). Alto ~ 720*s. Plataforma en y -430*s.
  // o.cartel: texto del cartel; o.luz: farol. clases: .pl-t .pl-t-farol
  function torre(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pl-t">
      <path d="M-150 0 L-100 -430 M150 0 L100 -430 M-130 -150 L120 -300 M130 -150 L-120 -300" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
      <path d="M-150 0 L-100 -430 M150 0 L100 -430" stroke="${AMA}" stroke-width="10" stroke-linecap="round"/>
      <!-- escalera -->
      <path d="M40 0 L70 -430 M110 0 L130 -430" stroke="${INK}" stroke-width="10"/>
      <path d="M46 -60 L114 -60 M52 -130 L118 -130 M58 -200 L122 -200 M62 -270 L124 -270 M66 -340 L128 -340" stroke="${INK}" stroke-width="8"/>
      <!-- plataforma y cabina -->
      <rect x="-170" y="-470" width="340" height="44" rx="6" fill="${AMA}" stroke="${INK}" stroke-width="8"/>
      <rect x="-130" y="-640" width="260" height="170" fill="${AMA}" stroke="${INK}" stroke-width="8"/>
      <rect x="-96" y="-610" width="192" height="80" rx="6" fill="${TUR3}" stroke="${INK}" stroke-width="6"/>
      <path d="M-180 -640 L0 -720 L180 -640 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-120 -664 L-60 -690 M60 -690 L120 -664" stroke="${CRE}" stroke-width="10" stroke-linecap="round"/>
      <rect x="-110" y="-516" width="220" height="36" rx="4" fill="${CRE}" stroke="${INK}" stroke-width="5"/>
      <text data-layout-ignore x="0" y="-488" text-anchor="middle" font-family="Black Ops One" font-size="28" fill="${ROJO}" letter-spacing="2">${o.cartel || "TORRE 1"}</text>
      ${o.luz ? `<g class="pl-t-farol"><circle cx="150" cy="-650" r="20" fill="${AMA}" stroke="${INK}" stroke-width="5"/></g>` : ""}
    </g></g>`;
  }

  // BANDERA: palo con base en (x, y), alto h, color de la tela. clases .pl-b .pl-b-tela (flamear con kit.flamear)
  function bandera(x, y, h, color, o) {
    o = o || {};
    const w = o.w || h * 0.5, th = o.th || h * 0.32;
    return `<g class="pl-b ${o.cls || ""}">
      <path d="M${x} ${y} L${x} ${y - h}" stroke="${INK}" stroke-width="${o.palo || 16}" stroke-linecap="round"/>
      <path d="M${x} ${y} L${x} ${y - h}" stroke="${CRE}" stroke-width="${(o.palo || 16) * 0.45}" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y - h - 6}" r="${(o.palo || 16) * 0.8}" fill="${AMA}" stroke="${INK}" stroke-width="5"/>
      <path class="pl-b-tela" d="M${x + 4} ${y - h + 4} Q${x + w * 0.5} ${y - h - th * 0.12} ${x + w} ${y - h + th * 0.08} Q${x + w * 0.9} ${y - h + th * 0.55} ${x + w} ${y - h + th} Q${x + w * 0.5} ${y - h + th * 0.86} ${x + 4} ${y - h + th} Z"
        fill="${color}" stroke="${INK}" stroke-width="${o.trazo || 7}" stroke-linejoin="round"/>
    </g>`;
  }

  // SALVAVIDAS (rosco rojo y crema): centro (x, y), radio r. clase .pl-sv
  function salvavidas(x, y, r, o) {
    o = o || {};
    const ri = r * 0.5, sw = r - ri, rm = (r + ri) / 2;
    let franjas = "";
    for (let k = 0; k < 4; k++) {
      const a0 = (k / 4) * Math.PI * 2 + Math.PI / 4 - 0.32, a1 = a0 + 0.64;
      franjas += `<path d="M${(Math.cos(a0) * rm).toFixed(1)} ${(Math.sin(a0) * rm).toFixed(1)} A${rm} ${rm} 0 0 1 ${(Math.cos(a1) * rm).toFixed(1)} ${(Math.sin(a1) * rm).toFixed(1)}" fill="none" stroke="${CRE}" stroke-width="${sw}"/>`;
    }
    return `<g class="pl-sv ${o.cls || ""}" transform="translate(${x} ${y})">
      <circle r="${rm}" fill="none" stroke="${INK}" stroke-width="${sw + 14}"/>
      <circle r="${rm}" fill="none" stroke="${o.color || ROJO}" stroke-width="${sw}"/>
      ${franjas}
      <circle r="${ri - 2}" fill="none" stroke="${INK}" stroke-width="5"/><circle r="${r + 2}" fill="none" stroke="${INK}" stroke-width="5"/>
      ${o.texto ? `<text data-layout-ignore x="0" y="${-rm + sw * 0.2}" text-anchor="middle" font-family="Black Ops One" font-size="${sw * 0.5}" fill="${INK}">${o.texto}</text>` : ""}
    </g>`;
  }

  // OLAS: franja ondulada de x -400 a 1480 con borde superior en y, cresta amp, onda L, alto h. Moverla en x por L
  // (kit.olear) para que corra sin cortes. clase .pl-ola
  function olas(y, o) {
    o = o || {};
    const L = o.L || 160, amp = o.amp || 18, h = o.h || 300;
    let d = `M-400 ${y}`;
    for (let x = -400; x < 1480; x += L) d += ` Q${x + L / 4} ${y - amp} ${x + L / 2} ${y} T${x + L} ${y}`;
    d += ` L1480 ${y + h} L-400 ${y + h} Z`;
    let espuma = "";
    if (o.espuma !== false) { espuma = `M-400 ${y}`; for (let x = -400; x < 1480; x += L) espuma += ` Q${x + L / 4} ${y - amp} ${x + L / 2} ${y} T${x + L} ${y}`; }
    return `<g class="pl-ola ${o.cls || ""}"><path d="${d}" fill="${o.color || TUR}" ${o.op ? `opacity="${o.op}"` : ""}/>
      ${espuma ? `<path d="${espuma}" fill="none" stroke="${o.borde || CRE}" stroke-width="${o.trazo || 8}" stroke-linecap="round" opacity="${o.opBorde || 0.85}"/>` : ""}</g>`;
  }

  // EL AGENTE DE IA guardavidas: un celular con cara verde, visera roja y silbato, de cuerpo entero. Origen = pies (x, y). Alto ~ 640*s.
  // o.brazo: "saluda" | "tira" (brazo adelante, tirando el salvavidas). clases: .pl-k .pl-k-ojos .pl-k-boca .pl-k-brazo
  function agente(x, y, s, o) {
    o = o || {};
    const brazoD = o.brazo === "saluda" ? `<g class="pl-k-brazo"><path d="M130 -330 C200 -380 220 -450 210 -520" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="210" cy="-530" r="28" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>`
      : o.brazo === "tira" ? `<g class="pl-k-brazo"><path d="M130 -330 C200 -330 250 -360 290 -400" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="296" cy="-406" r="28" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>`
      : `<g class="pl-k-brazo"><path d="M130 -330 C180 -300 190 -240 170 -200" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="168" cy="-192" r="26" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pl-k">
      <path d="M-60 -80 L-70 0 M60 -80 L70 0" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
      <path d="M-100 0 L-50 0 M50 0 L100 0" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
      <g class="pl-k-brazo-i"><path d="M-130 -330 C-200 -290 -210 -220 -180 -180" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><circle cx="-180" cy="-176" r="26" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></g>
      ${brazoD}
      <rect x="-140" y="-520" width="280" height="450" rx="46" fill="${INK}"/>
      <rect x="-122" y="-500" width="244" height="400" rx="32" fill="#0f2a1a" stroke="${VERDE}" stroke-width="5"/>
      <g class="pl-k-ojos"><rect x="-74" y="-410" width="40" height="58" rx="20" fill="${VERDE}"/><rect x="34" y="-410" width="40" height="58" rx="20" fill="${VERDE}"/></g>
      <path class="pl-k-boca" d="M-50 -300 Q0 -256 50 -300" fill="none" stroke="${VERDE}" stroke-width="12" stroke-linecap="round"/>
      <text data-layout-ignore x="0" y="-140" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${VERDE}" letter-spacing="4">IA</text>
      <!-- cordón y silbato -->
      <path d="M-100 -500 Q-60 -200 40 -200 Q90 -300 100 -500" fill="none" stroke="${AMA}" stroke-width="6" opacity="0.9"/>
      ${silbato(50, -196, 0.8, 16)}
      <!-- visera roja de guardavidas -->
      <path d="M-150 -520 C-150 -580 150 -580 150 -520 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-150 -524 C-40 -536 120 -534 230 -506 C200 -490 120 -498 60 -506 C0 -510 -100 -510 -150 -506 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-20 -566 L20 -566 M0 -584 L0 -548" stroke="${CRE}" stroke-width="10"/>
    </g></g>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || "#efe6d0"}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || TUR3}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${CRE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${CRE}">${nombre}</text>
      <text class="pl-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${CRE}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho]. o.visto: doble tilde (clase .pl-tilde)
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48 + (o.hora ? 30 : 0);
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d6f0c4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hx = gx + ancho - 18 - (o.visto ? 40 : 0);
    const hora = o.hora ? `<text x="${hx}" y="${y + alto - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#6b6259">${o.hora}</text>` : "";
    const visto = o.visto ? `<path class="pl-tilde" d="M${gx + ancho - 52} ${y + alto - 24} l7 7 l14 -16 M${gx + ancho - 40} ${y + alto - 17} l14 -16" fill="none" stroke="${o.visto === "azul" ? "#2b8be6" : "#8a8a8a"}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : "";
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
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // la tela de una bandera flamea (sel = selector de .pl-b-tela); palo = "x y" donde se agarra
    function flamear(sel, t, d, vel) {
      qa(sel).forEach((el) => {
        const bb = el.getBBox();
        const o = `${bb.x} ${bb.y + bb.height / 2}`;
        origen(el, o);
        const v = vel || 0.22;
        const n = Math.max(1, Math.round(d / v / 2));
        tl.fromTo(el, { scaleX: 1, skewY: -3 }, { scaleX: 0.88, skewY: 5, duration: v, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", svgOrigin: o, immediateRender: false }, t);
      });
    }
    // las olas corren de costado: dx = largo de onda (o múltiplo) para que no se note el corte
    function olear(sel, t, d, dx, vel) {
      qa(sel).forEach((el, i) => {
        const v = vel || 1.4;
        const n = Math.max(1, Math.round(d / v));
        tl.fromTo(el, { x: 0 }, { x: (i % 2 ? -1 : 1) * (dx || 160), duration: v, repeat: n - 1, ease: "none", immediateRender: false }, t);
      });
    }
    // algo que flota en el agua: sube y baja y se inclina
    function flotar(el, t, d, amp, ori) {
      const n = Math.max(1, Math.round(d / 0.7));
      if (ori) origen(el, ori);
      tl.fromTo(el, { y: 0, rotation: -(amp || 6) * 0.3 }, { y: amp || 6, rotation: (amp || 6) * 0.3, duration: d / n, yoyo: true, repeat: n - 1, ease: "sine.inOut", immediateRender: false, ...(ori ? { svgOrigin: ori } : {}) }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, centro, sello, sacudon, dibujar, hablar, flamear, olear, flotar, salida };
  }
  return { INK, CEL, TUR, TUR2, TUR3, ARENA, ARENA2, ROJO, ROJO2, AMA, AMA2, CRE, PIEL, PIEL2, BRON, BRON2, VERDE, VERDE2, BOCA, azar,
    silbato, guardavidas, clienta, mate, termo, dueno, torre, bandera, salvavidas, olas, agente, celular, celularBorde, chatCabecera, globo, kit };
})();
