// Piezas compartidas del reel "karaoke": personajes, pantalla del karaoke, letra que se pinta y helpers.
// Uso en una escena: <script src="assets/vendor/gsap.min.js"></script><script src="assets/karaoke.js"></script>
// y en el script: const K = KR.kit(tl, root).
window.KR = window.KR || (function () {
  const INK = "#12081f", AZUL = "#1638d6", AZUL2 = "#3d63ff", AZUL3 = "#0b1a6e", AMA = "#ffd81a", MAG = "#ff2fa0",
    BLA = "#fff6e8", NAR = "#ff8a3d", VIO = "#2b1550", VERDE = "#5ce611", PIEL = "#f2c29b", PIEL2 = "#dfa57c";
  if (!document.getElementById("kr-css")) {
    const st = document.createElement("style");
    st.id = "kr-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "Outfit"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Outfit-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.kr-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 6px; border: 9px solid ${MAG}; border-radius: 16px; color: ${MAG};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(18, 8, 31, 0.88);
  box-shadow: 0 0 30px rgba(255, 47, 160, 0.55); }
.kr-sello.ama { border-color: ${AMA}; color: ${AMA}; box-shadow: 0 0 30px rgba(255, 216, 26, 0.45); }
.kr-sello.nar { border-color: ${NAR}; color: ${NAR}; box-shadow: 0 0 30px rgba(255, 138, 61, 0.45); }
.kr-sello.verde { border-color: ${VERDE}; color: ${VERDE}; box-shadow: 0 0 30px rgba(92, 230, 17, 0.45); }
.kr-tag { position: absolute; box-sizing: border-box; padding: 10px 24px 8px; background: ${AZUL}; border: 4px solid ${INK}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(18, 8, 31, 0.6);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.16em; color: ${BLA}; white-space: nowrap; text-align: center; }
.kr-tag.mag { background: ${MAG}; }
.kr-tag.nar { background: ${NAR}; color: ${INK}; }
.kr-tag.verde { background: #3f9e0b; }
.kr-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${BLA}; border: 6px solid ${INK}; border-radius: 34px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 8px 8px 0 rgba(18, 8, 31, 0.5); }
.kr-pan { position: absolute; box-sizing: border-box; border: 16px solid #0b0620; border-radius: 28px; overflow: hidden; background: ${AZUL};
  box-shadow: 0 0 0 6px ${AZUL2}, 0 0 60px rgba(61, 99, 255, 0.55), 14px 18px 0 rgba(0, 0, 0, 0.45); }
.kr-pan > svg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
.kr-pan .kr-scan { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.13) 0px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 7px); }
.kr-pan .kr-banda { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(22, 56, 214, 0.86), rgba(11, 26, 110, 0.96)); border-top: 5px solid ${AZUL2}; }
.kr-pan .kr-titulo { position: absolute; left: 24px; top: 20px; padding: 6px 16px 4px; background: rgba(11, 26, 110, 0.85); border: 3px solid ${BLA}; border-radius: 8px;
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.14em; color: ${BLA}; white-space: nowrap; }
.kr-letra { position: absolute; left: 0; right: 0; text-align: center; font-family: "Outfit", sans-serif; font-weight: 800; font-size: 66px; line-height: 1.32; white-space: nowrap; }
.kr-letra .kr-l { display: block; }
.kr-w { position: relative; display: inline-block; color: ${BLA};
  text-shadow: 0 5px 0 ${AZUL3}, 4px 4px 0 ${AZUL3}, -4px -4px 0 ${AZUL3}, 4px -4px 0 ${AZUL3}, -4px 4px 0 ${AZUL3}, 4px 0 0 ${AZUL3}, -4px 0 0 ${AZUL3}, 0 -4px 0 ${AZUL3}; }
.kr-w .kr-clip { position: absolute; left: -8px; right: -8px; top: -6px; bottom: -8px; overflow: hidden; }
.kr-w .kr-m { position: absolute; inset: 0; overflow: hidden; }
.kr-w .kr-mi { position: absolute; inset: 0; box-sizing: border-box; padding: 6px 8px 0 8px; white-space: nowrap; color: ${AMA};
  text-shadow: 0 5px 0 #8a1257, 4px 4px 0 #8a1257, -4px -4px 0 #8a1257, 4px -4px 0 #8a1257, -4px 4px 0 #8a1257, 4px 0 0 #8a1257, -4px 0 0 #8a1257, 0 -4px 0 #8a1257; }
.kr-letra.mag .kr-w .kr-mi, .kr-l.mag .kr-w .kr-mi { color: ${MAG}; text-shadow: 0 5px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}, 4px 0 0 ${INK}, -4px 0 0 ${INK}, 0 -4px 0 ${INK}; }
.kr-w .kr-bola { position: absolute; left: 50%; top: -30px; width: 28px; height: 28px; margin-left: -14px; border-radius: 50%; background: ${AMA};
  border: 4px solid #8a1257; box-sizing: border-box; box-shadow: 0 0 18px rgba(255, 216, 26, 0.9); opacity: 0; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;

  // micrófono: origen = centro de la rejilla, apunta hacia abajo (rot gira alrededor de la rejilla)
  function mic(x, y, s, rot, cls) {
    return `<g class="${cls || "kr-mic"}" transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})">
      <path d="M-14 22 L-20 150 Q0 166 20 150 L14 22 Z" fill="#2a2440" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <rect x="-22" y="18" width="44" height="18" rx="6" fill="#c9c3d8" stroke="${INK}" stroke-width="5"/>
      <circle cx="0" cy="-6" r="34" fill="#c9c3d8" stroke="${INK}" stroke-width="6"/>
      <path d="M-24 -18 H24 M-30 -4 H30 M-26 10 H26 M-10 -36 V24 M10 -36 V24" stroke="#8a84a0" stroke-width="4"/>
      <path d="M-16 -26 Q-6 -34 6 -32" fill="none" stroke="${BLA}" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  }

  // VALE, la clienta despechada: busto, origen = centro de la base del torso. Cabeza en (0,-340).
  // clases: .kr-v .kr-v-cabeza .kr-v-pelo .kr-v-abiertos .kr-v-cerrados .kr-v-cejas .kr-v-boca .kr-v-lagrima .kr-v-brazo (hombro 150 -190)
  // o.cerrados: ojos cerrados (cantando con sentimiento) · o.lagrima · o.sinMic · o.feliz
  function vale(x, y, s, o) {
    o = o || {};
    const rulos = [[-130, -370, 72], [130, -370, 72], [-100, -470, 82], [100, -470, 82], [0, -510, 92], [-150, -280, 62], [150, -280, 62], [-170, -200, 50], [170, -200, 50]]
      .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3b1530" stroke="${INK}" stroke-width="7"/>`).join("");
    const brillos = `<path d="M-120 -470 q20 -26 50 -24 M60 -540 q30 -10 56 8 M-170 -300 q4 -26 24 -40" fill="none" stroke="${MAG}" stroke-width="7" stroke-linecap="round" opacity="0.7"/>`;
    const lentejuelas = [[-120, -60], [-60, -110], [0, -40], [70, -120], [120, -50], [-150, 0], [40, -10], [-30, -160], [100, -170], [-100, -150], [150, -110]]
      .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="7" fill="#ffd0ea"/>`).join("");
    const brazo = o.sinMic ? "" : `<g class="kr-v-brazo">
        <path d="M150 -190 C235 -130 220 -40 165 -55 C130 -70 110 -120 92 -168" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M150 -190 C235 -130 220 -40 165 -55 C130 -70 110 -120 92 -168" fill="none" stroke="${PIEL}" stroke-width="48" stroke-linecap="round"/>
        ${mic(58, -262, 0.95, -32, "kr-v-mic")}
        <circle cx="92" cy="-176" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M70 -190 q14 -8 30 -2" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      </g>`;
    return `<g transform="${T(x, y, s)}"><g class="kr-v">
      <g class="kr-v-pelo">${rulos}${brillos}</g>
      <path d="M-195 30 C-190 -110 -132 -192 -60 -206 L60 -206 C132 -192 190 -110 195 30 Z" fill="${MAG}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -206 Q0 -140 60 -206" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      ${lentejuelas}
      <path d="M-38 -262 L-42 -200 L42 -200 L38 -262 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="kr-v-cabeza">
        <circle cx="-104" cy="-300" r="20" fill="none" stroke="${AMA}" stroke-width="7"/>
        <circle cx="104" cy="-300" r="20" fill="none" stroke="${AMA}" stroke-width="7"/>
        <path d="M-100 -380 C-104 -478 104 -478 100 -380 L96 -302 C90 -244 48 -220 0 -220 C-48 -220 -90 -244 -96 -302 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- flequillo -->
        <path d="M-108 -380 C-110 -470 -20 -500 40 -480 C100 -470 120 -420 108 -380 C80 -420 40 -432 10 -430 C-20 -410 -60 -404 -108 -380 Z" fill="#3b1530" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path class="kr-v-cejas" d="M-78 -384 L-30 -398 M78 -384 L30 -398" stroke="#3b1530" stroke-width="11" stroke-linecap="round"/>
        <g class="kr-v-abiertos" ${o.cerrados ? 'opacity="0"' : ""}>
          <ellipse cx="-48" cy="-350" rx="19" ry="23" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="-46" cy="-346" r="10" fill="${INK}"/>
          <ellipse cx="48" cy="-350" rx="19" ry="23" fill="${BLA}" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="-346" r="10" fill="${INK}"/>
          <path d="M-70 -368 l-12 -10 M-62 -373 l-6 -13 M70 -368 l12 -10 M62 -373 l6 -13" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        </g>
        <g class="kr-v-cerrados" ${o.cerrados ? "" : 'opacity="0"'}>
          <path d="M-70 -350 Q-48 -334 -26 -350 M70 -350 Q48 -334 26 -350" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
          <path d="M-70 -350 l-14 6 M-62 -343 l-8 12 M70 -350 l14 6 M62 -343 l8 12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        </g>
        <ellipse cx="-70" cy="-300" rx="20" ry="11" fill="${MAG}" opacity="0.35"/><ellipse cx="70" cy="-300" rx="20" ry="11" fill="${MAG}" opacity="0.35"/>
        <path d="M0 -335 C-8 -310 -14 -298 -2 -292" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${o.feliz
          ? `<path class="kr-v-boca" d="M-36 -268 Q0 -226 36 -268 Z" fill="#7a1040" stroke="#c4126e" stroke-width="7" stroke-linejoin="round"/>`
          : `<ellipse class="kr-v-boca" cx="0" cy="-258" rx="22" ry="20" fill="#7a1040" stroke="#c4126e" stroke-width="7"/>`}
        <path class="kr-v-lagrima" d="M-58 -326 C-66 -306 -72 -296 -64 -288 C-56 -282 -48 -292 -52 -304 Z" fill="#7fd6ff" stroke="${INK}" stroke-width="4" ${o.lagrima ? "" : 'opacity="0"'}/>
      </g>
      ${brazo}
    </g></g>`;
  }

  // EL DUEÑO: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // clases: .kr-d .kr-d-cabeza .kr-d-cejas .kr-d-boca .kr-d-ojos .kr-d-brazo (mano levantada, hombro -150 -190) .kr-d-sudor
  function dueno(x, y, s, o) {
    o = o || {};
    const brazo = o.mano ? `<g class="kr-d-brazo">
        <path d="M-150 -190 C-215 -225 -240 -300 -236 -380" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M-150 -190 C-215 -225 -240 -300 -236 -380" fill="none" stroke="${NAR}" stroke-width="52" stroke-linecap="round"/>
        <path d="M-272 -392 C-280 -455 -196 -460 -200 -392 L-200 -372 L-272 -372 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-254 -444 V-404 M-236 -450 V-406 M-218 -444 V-404" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="kr-d">
      <path d="M-215 30 C-210 -120 -150 -200 -70 -215 L70 -215 C150 -200 210 -120 215 30 Z" fill="${NAR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <!-- delantal -->
      <path d="M-110 30 L-118 -150 Q0 -128 118 -150 L110 30 Z" fill="${BLA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-118 -150 L-70 -215 M118 -150 L70 -215" stroke="${BLA}" stroke-width="16"/>
      <path d="M-118 -150 L-70 -215 M118 -150 L70 -215" stroke="${INK}" stroke-width="4" opacity="0.6"/>
      <rect x="-50" y="-90" width="100" height="62" rx="8" fill="${BLA}" stroke="${INK}" stroke-width="5"/>
      <path d="M-28 -98 V-60 M-10 -102 V-62" stroke="${AZUL}" stroke-width="7" stroke-linecap="round"/>
      <!-- repasador al hombro -->
      <path d="M120 -205 L190 -170 L170 -40 L110 -60 Z" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M135 -180 L120 -70 M160 -168 L145 -55 M118 -150 L182 -130 M114 -110 L176 -90" stroke="${MAG}" stroke-width="6" opacity="0.8"/>
      ${brazo}
      <path d="M-44 -280 L-48 -210 L48 -210 L44 -280 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="kr-d-cabeza">
        <ellipse cx="-116" cy="-350" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="116" cy="-350" rx="24" ry="34" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -395 C-114 -515 114 -515 110 -395 L106 -318 C98 -250 55 -226 0 -226 C-55 -226 -98 -250 -106 -318 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -410 C-134 -392 -130 -342 -110 -322 L-98 -322 L-98 -410 Z M112 -410 C134 -392 130 -342 110 -322 L98 -322 L98 -410 Z" fill="#4a3a48" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -488 Q0 -500 40 -488" fill="none" stroke="${BLA}" stroke-width="9" stroke-linecap="round" opacity="0.7"/>
        <path class="kr-d-cejas" d="M-82 -400 L-30 -392 M82 -400 L30 -392" stroke="#4a3a48" stroke-width="13" stroke-linecap="round"/>
        <g class="kr-d-ojos"><circle cx="-52" cy="-362" r="10" fill="${INK}"/><circle cx="52" cy="-362" r="10" fill="${INK}"/></g>
        <path d="M-74 -340 Q-52 -330 -32 -340 M74 -340 Q52 -330 32 -340" fill="none" stroke="${PIEL2}" stroke-width="6" stroke-linecap="round"/>
        <path d="M0 -358 C-12 -326 -20 -310 -2 -302" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-78 -282 C-50 -318 -14 -308 0 -296 C14 -308 50 -318 78 -282 C50 -270 18 -274 0 -282 C-18 -274 -50 -270 -78 -282 Z" fill="#2a1a2a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <ellipse class="kr-d-boca" cx="0" cy="-256" rx="20" ry="12" fill="#5a1630" stroke="${INK}" stroke-width="6"/>
        <path class="kr-d-sudor" d="M96 -420 C88 -400 84 -390 92 -382 C100 -376 108 -386 104 -398 Z" fill="#7fd6ff" stroke="${INK}" stroke-width="4" opacity="0"/>
      </g>
    </g></g>`;
  }

  // EL ANIMADOR: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // clases: .kr-a .kr-a-cabeza .kr-a-boca .kr-a-brazo (con micrófono, hombro 150 -190) .kr-a-cejas
  function animador(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="kr-a">
      <path d="M-210 30 C-205 -120 -145 -200 -70 -215 L70 -215 C145 -200 205 -120 210 30 Z" fill="${AZUL}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -215 L0 -60 L70 -215 Z" fill="${BLA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-70 -215 L-110 -120 L-40 -100 L0 -60 Z M70 -215 L110 -120 L40 -100 L0 -60 Z" fill="${AMA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-40 -190 L0 -172 L-40 -154 Z M40 -190 L0 -172 L40 -154 Z" fill="${MAG}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="0" cy="-172" r="10" fill="${MAG}" stroke="${INK}" stroke-width="5"/>
      <path d="M-160 -60 l10 -10 M-130 -20 l10 -10 M150 -80 l10 -10 M130 -30 l10 -10 M-170 0 l10 -10" stroke="${AZUL2}" stroke-width="8" stroke-linecap="round"/>
      <g class="kr-a-brazo">
        <path d="M150 -190 C230 -140 230 -60 175 -60 C140 -64 120 -110 100 -160" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C230 -140 230 -60 175 -60 C140 -64 120 -110 100 -160" fill="none" stroke="${AZUL}" stroke-width="50" stroke-linecap="round"/>
        ${mic(64, -258, 0.95, -32, "kr-a-mic")}
        <circle cx="98" cy="-172" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>
      <path d="M-42 -280 L-46 -210 L46 -210 L42 -280 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="kr-a-cabeza">
        <ellipse cx="-112" cy="-350" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-350" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-108 -390 C-112 -500 112 -500 108 -390 L104 -312 C96 -246 54 -224 0 -224 C-54 -224 -96 -246 -104 -312 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- jopo -->
        <path d="M-116 -380 C-140 -470 -90 -560 20 -572 C120 -580 170 -520 140 -470 C130 -440 116 -410 112 -380 C90 -430 40 -440 0 -436 C-40 -432 -90 -420 -116 -380 Z" fill="#1c1030" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-50 -530 C0 -560 70 -555 110 -520" fill="none" stroke="${AZUL2}" stroke-width="9" stroke-linecap="round"/>
        <path class="kr-a-cejas" d="M-80 -402 L-28 -414 M80 -402 L28 -414" stroke="#1c1030" stroke-width="12" stroke-linecap="round"/>
        <circle cx="-50" cy="-366" r="10" fill="${INK}"/><circle cx="50" cy="-366" r="10" fill="${INK}"/>
        <path d="M0 -356 C-10 -326 -18 -312 -2 -306" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <g class="kr-a-boca"><path d="M-54 -282 Q0 -214 54 -282 Z" fill="#5a1630" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M-44 -278 H44 L38 -264 H-38 Z" fill="${BLA}"/></g>
      </g>
    </g></g>`;
  }

  // EL AGENTE DE IA: un celular con cara, vincha con micrófono y bracitos. Origen = centro de la base.
  // clases: .kr-ag .kr-ag-cara .kr-ag-ojos .kr-ag-boca .kr-ag-brazo-d (hombro 110 -260) .kr-ag-brazo-i (hombro -110 -260)
  function agente(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s)}"><g class="kr-ag">
      <g class="kr-ag-brazo-i"><path d="M-110 -260 C-170 -240 -200 -190 -210 -130" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><circle cx="-212" cy="-122" r="26" fill="${BLA}" stroke="${INK}" stroke-width="6"/></g>
      <g class="kr-ag-brazo-d"><path d="M110 -260 C170 -280 200 -330 210 -390" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><circle cx="212" cy="-398" r="26" fill="${BLA}" stroke="${INK}" stroke-width="6"/></g>
      <rect x="-120" y="-470" width="240" height="460" rx="40" fill="#1c1030" stroke="${INK}" stroke-width="8"/>
      <rect x="-100" y="-440" width="200" height="390" rx="24" fill="${VERDE}"/>
      <rect x="-30" y="-458" width="60" height="10" rx="5" fill="#3a2a50"/>
      <g class="kr-ag-cara">
        <g class="kr-ag-ojos"><rect x="-62" y="-340" width="34" height="56" rx="17" fill="${INK}"/><rect x="28" y="-340" width="34" height="56" rx="17" fill="${INK}"/>
          <circle cx="-38" cy="-326" r="7" fill="${BLA}"/><circle cx="52" cy="-326" r="7" fill="${BLA}"/></g>
        <path class="kr-ag-boca" d="M-50 -230 Q0 -180 50 -230" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <ellipse cx="-72" cy="-236" rx="16" ry="9" fill="#3f9e0b"/><ellipse cx="72" cy="-236" rx="16" ry="9" fill="#3f9e0b"/>
      </g>
      <!-- vincha con micrófono -->
      <path d="M-128 -330 C-130 -520 130 -520 128 -330" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <rect x="-146" y="-360" width="34" height="70" rx="14" fill="#3a2a50" stroke="${INK}" stroke-width="6"/>
      <rect x="112" y="-360" width="34" height="70" rx="14" fill="#3a2a50" stroke="${INK}" stroke-width="6"/>
      <path d="M-130 -300 C-130 -220 -100 -190 -54 -186" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="-48" cy="-186" r="12" fill="#3a2a50" stroke="${INK}" stroke-width="5"/>
      <text x="0" y="-80" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" letter-spacing="4" fill="${INK}">AGENTE IA</text>
    </g></g>`;
  }

  // público del bar: siluetas de cabezas y hombros, algunos con chopp en alto. (x, y) = base izquierda.
  // clases: .kr-pub .kr-pub-k (cada persona) .kr-pub-chopp
  function publico(x, y, n, sep, o) {
    o = o || {};
    let s = "";
    for (let k = 0; k < n; k++) {
      const cx = x + k * sep + sep / 2, alto = 0.82 + ((k * 37) % 30) / 100, col = k % 2 ? "#3a1d6b" : "#2e1758";
      const chopp = o.chopp && o.chopp.includes(k) ? `<g class="kr-pub-chopp">
          <path d="M${sep * 0.28} -150 C${sep * 0.42} -190 ${sep * 0.46} -230 ${sep * 0.44} -270" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
          <path d="M${sep * 0.28} -150 C${sep * 0.42} -190 ${sep * 0.46} -230 ${sep * 0.44} -270" fill="none" stroke="${col}" stroke-width="18" stroke-linecap="round"/>
          <rect x="${sep * 0.3}" y="-360" width="62" height="86" rx="8" fill="${AMA}" stroke="${INK}" stroke-width="6"/>
          <path d="M${sep * 0.3 + 62} -340 h16 a12 12 0 0 1 0 40 h-16" fill="none" stroke="${INK}" stroke-width="7"/>
          <path d="M${sep * 0.3 - 6} -356 q16 -26 36 -10 q18 -22 38 0 v8 h-74 Z" fill="${BLA}" stroke="${INK}" stroke-width="5"/>
        </g>` : "";
      s += `<g transform="translate(${cx} ${y}) scale(${alto})"><g class="kr-pub-k">
        ${chopp}
        <path d="M${-sep * 0.5} 0 C${-sep * 0.5} -120 ${-sep * 0.32} -170 0 -170 C${sep * 0.32} -170 ${sep * 0.5} -120 ${sep * 0.5} 0 Z" fill="${col}" stroke="${INK}" stroke-width="6"/>
        <circle cx="0" cy="-230" r="${sep * 0.26}" fill="${col}" stroke="${INK}" stroke-width="6"/>
        <path d="M${-sep * 0.18} -270 q${sep * 0.18} -20 ${sep * 0.36} 0" fill="none" stroke="${MAG}" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
      </g></g>`;
    }
    return `<g class="kr-pub" transform="translate(0 0)">${s}</g>`;
  }

  // la pantalla del karaoke (HTML): videoclip de los 90 (atardecer con sol a rayas, mar y palmeras) y una banda azul para la letra.
  // p = prefijo único de la escena (para los ids de los gradientes). banda = alto de la banda de letra en px.
  function pantalla(p, cls, x, y, w, h, banda, titulo) {
    const iw = w - 32, ih = h - 32, hz = Math.round(ih * (banda ? 0.5 : 0.62)), sr = Math.round(ih * 0.24), sx = Math.round(iw * 0.5);
    let rayas = "";
    for (let k = 0; k < 5; k++) rayas += `<rect x="${sx - sr - 4}" y="${hz - sr * 0.62 + k * sr * 0.14}" width="${sr * 2 + 8}" height="${6 + k * 2.4}" fill="#c4126e"/>`;
    let olas = "";
    for (let k = 0; k < 6; k++) olas += `<path d="M${iw * 0.12 + (k % 2) * 40} ${hz + 24 + k * 26} H${iw * 0.88 - (k % 3) * 30}" stroke="#ff8ad0" stroke-width="5" stroke-linecap="round" opacity="${0.75 - k * 0.1}"/>`;
    const palmera = (px, py, sc, esp) => `<g transform="translate(${px} ${py}) scale(${esp ? -sc : sc} ${sc})" class="kr-palm">
        <path d="M0 0 C10 -90 30 -170 70 -250" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
        <g class="kr-palm-hojas" transform="translate(70 -250)">
          <path d="M0 0 C-50 -40 -110 -30 -150 10 C-100 -10 -50 -6 0 0 Z M0 0 C40 -50 110 -50 150 -10 C100 -26 50 -16 0 0 Z M0 0 C-20 -60 -70 -100 -120 -100 C-70 -80 -36 -50 0 0 Z M0 0 C20 -60 70 -96 120 -90 C70 -76 34 -46 0 0 Z M0 0 C-60 10 -100 50 -110 90 C-80 50 -46 26 0 0 Z M0 0 C60 6 100 40 116 80 C84 46 46 24 0 0 Z" fill="${INK}"/>
        </g></g>`;
    return `<div class="kr-pan ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      <svg viewBox="0 0 ${iw} ${ih}" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="${p}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1a8f"/><stop offset="0.45" stop-color="${MAG}"/><stop offset="0.85" stop-color="${NAR}"/><stop offset="1" stop-color="${AMA}"/></linearGradient>
          <linearGradient id="${p}-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${AMA}"/><stop offset="1" stop-color="${NAR}"/></linearGradient>
          <clipPath id="${p}-solc"><rect x="0" y="0" width="${iw}" height="${hz}"/></clipPath>
        </defs>
        <rect class="kr-cielo" x="0" y="0" width="${iw}" height="${hz}" fill="url(#${p}-cielo)"/>
        <g class="kr-sol" clip-path="url(#${p}-solc)"><circle cx="${sx}" cy="${hz}" r="${sr}" fill="url(#${p}-sol)"/>${rayas}</g>
        <rect x="0" y="${hz}" width="${iw}" height="${ih - hz}" fill="#2a0f5c"/>
        <g class="kr-olas">${olas}</g>
        ${palmera(iw * 0.06, hz + 30, ih / 620, false)}${palmera(iw * 0.94, hz + 40, ih / 700, true)}
      </svg>
      ${banda ? `<div class="kr-banda" style="height:${banda}px"></div>` : ""}
      <div class="kr-scan"></div>
      ${titulo ? `<div class="kr-titulo">${titulo}</div>` : ""}
    </div>`;
  }

  // una línea de letra: palabras con capa blanca, capa pintada y bolita. Devuelve HTML.
  function linea(texto, cls) {
    return `<span class="kr-l ${cls || ""}">` + texto.split(" ").map((w) =>
      `<span class="kr-w">${w}<span class="kr-clip"><span class="kr-m"><span class="kr-mi">${w}</span></span></span><i class="kr-bola"></i></span>`).join(" ") + `</span>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
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
    function hablar(sel, t, veces, d) {
      const el = typeof sel === "string" ? q(sel) : sel;
      const bb = el.getBBox();
      gsap.set(el, { svgOrigin: `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`, smoothOrigin: false });
      tl.fromTo(el, { scaleY: 1 }, { scaleY: 1.7, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    // pinta la letra: ws = elementos .kr-w, ts = segundo de cada palabra (relativo a la escena)
    function pintar(ws, ts, fin) {
      ws.forEach((w, i) => {
        const m = w.querySelector(".kr-m"), mi = w.querySelector(".kr-mi"), b = w.querySelector(".kr-bola");
        const t = ts[i], sig = i + 1 < ts.length ? ts[i + 1] : (fin ?? t + 0.5);
        const d = Math.max(0.12, Math.min(0.55, sig - t - 0.02));
        gsap.set(m, { xPercent: -101 });
        gsap.set(mi, { xPercent: 101 });
        tl.to(m, { xPercent: 0, duration: d, ease: "none" }, t);
        tl.to(mi, { xPercent: 0, duration: d, ease: "none" }, t);
        // la bolita salta a esta palabra
        tl.set(b, { opacity: 1 }, t);
        tl.fromTo(b, { y: -46, scaleY: 1 }, { y: 0, duration: 0.16, ease: "power2.in", immediateRender: false }, t);
        tl.to(b, { scaleY: 0.7, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.out" }, t + 0.16);
        tl.set(b, { opacity: 0 }, Math.max(t + 0.2, sig - 0.01));
        tl.fromTo(w, { scale: 1 }, { scale: 1.08, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t);
      });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, golpe, sello, sacudon, dibujar, hablar, pintar, salida };
  }
  return { INK, AZUL, AZUL2, AZUL3, AMA, MAG, BLA, NAR, VIO, VERDE, PIEL, PIEL2, mic, vale, dueno, animador, agente, publico, pantalla, linea, kit };
})();
