// Piezas del reel "el-jardinero": Tito el jardinero conductor, las plantas-cliente en maceta (secas y
// vivas, con cara), el dueño, la regadera (común y la del agente de IA), estantes del vivero, celular,
// globos de chat, calendario, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = JA.tito(x, y, s) + ...
// y en el script: const K = JA.kit(tl, root).
window.JA = window.JA || (function () {
  const INK = "#1c1712",
    HOJA = "#4f9a3a", HOJA2 = "#8cc85a", HOJA3 = "#2c6b2a",
    INV = "#123323", INV2 = "#1b4a31",
    TERRA = "#c8643b", TERRA2 = "#f08a5c", TERRA3 = "#8f3f22",
    CRE = "#f3e9d2", CRE2 = "#e2d3b0",
    AMA = "#f2c14e", SECO = "#b08a45", SECO2 = "#7a5a2a",
    PIEL = "#f0c8a0", PIEL2 = "#e0ad86", TIERRA = "#4a2f1c",
    VERDE = "#5ce611", VERDE2 = "#3f9e0b";
  if (!document.getElementById("ja-css")) {
    const st = document.createElement("style");
    st.id = "ja-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.ja-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${TERRA3}; border-radius: 14px; color: ${TERRA3};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(243, 233, 210, 0.95); }
.ja-sello.seco { border-color: #5a3f18; color: #5a3f18; }
.ja-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.ja-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${HOJA2}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.35);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${HOJA2}; white-space: nowrap; text-align: center; }
.ja-tag.terra { background: ${TERRA}; border-color: ${CRE}; color: ${CRE}; }
.ja-tag.verde { background: ${VERDE2}; border-color: ${CRE}; color: ${CRE}; }
.ja-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${AMA}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 6px 0 ${TERRA3}, 0 10px 18px rgba(0, 0, 0, 0.5); letter-spacing: -0.01em; }
.ja-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
.ja-globo.mano { font-family: "Caveat", cursive; font-weight: 700; font-size: 60px; line-height: 1; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // TITO, el jardinero conductor. Pie en (x, y). o.cara: "neutra" | "feliz" | "triste" | "susurro"
  // o.brazo: "presenta" (palma arriba a la derecha) | "senala" (señala arriba a la derecha) | "regadera" | "abajo"
  // Clases: .ja-t (todo) .ja-t-cabeza .ja-t-boca .ja-t-cejas .ja-t-brazo .ja-t-sombrero
  function tito(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "feliz"
      ? `<path d="M-68 -350 Q-48 -372 -28 -350 M68 -350 Q48 -372 28 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<circle cx="-48" cy="-352" r="11" fill="${INK}"/><circle cx="48" cy="-352" r="11" fill="${INK}"/><circle cx="-44" cy="-356" r="3.5" fill="#fff"/><circle cx="52" cy="-356" r="3.5" fill="#fff"/>`;
    const cejas = cara === "triste" ? "M-80 -380 Q-56 -396 -26 -392 M80 -380 Q56 -396 26 -392"
      : cara === "susurro" ? "M-80 -386 Q-54 -382 -26 -378 M80 -386 Q54 -382 26 -378"
      : "M-80 -384 Q-54 -404 -26 -392 M80 -384 Q54 -404 26 -392";
    const boca = cara === "feliz"
      ? `<path class="ja-t-boca" d="M-34 -268 Q0 -228 34 -268 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : `<ellipse class="ja-t-boca" cx="0" cy="-262" rx="${cara === "susurro" ? 12 : 18}" ry="${cara === "susurro" ? 7 : 10}" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`;
    const brazos = {
      presenta: `<path d="M175 -188 C240 -150 300 -140 370 -170" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M175 -188 C240 -150 300 -140 370 -170" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
        <path d="M360 -186 C390 -200 430 -196 440 -180 C430 -160 392 -156 366 -160 Z" fill="${PIEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`,
      senala: `<path d="M175 -188 C240 -230 290 -290 320 -360" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M175 -188 C240 -230 290 -290 320 -360" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
        <circle cx="326" cy="-376" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M336 -398 L372 -452" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M336 -398 L372 -452" stroke="${PIEL}" stroke-width="12" stroke-linecap="round"/>`,
      regadera: `<path d="M175 -188 C230 -150 250 -100 250 -60" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M175 -188 C230 -150 250 -100 250 -60" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
        <circle cx="252" cy="-44" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`,
      abajo: `<path d="M190 -170 C225 -120 235 -60 228 -20" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M190 -170 C225 -120 235 -60 228 -20" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
        <circle cx="228" cy="-6" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`,
    };
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ja-t">
      <!-- camisa crema a cuadros -->
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${CRE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 -140 L-200 40 M-160 -190 L-160 40 M160 -190 L160 40 M200 -140 L200 40 M-238 -60 L-140 -60 M140 -60 L238 -60 M-232 -10 L-140 -10 M140 -10 L238 -10" stroke="${TERRA}" stroke-width="7" opacity="0.45"/>
      <!-- delantal verde hoja con bolsillo y tijera -->
      <path d="M-150 40 L-138 -150 Q0 -124 138 -150 L150 40 Z" fill="${HOJA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-138 -150 L-84 -222 M138 -150 L84 -222" stroke="${INK}" stroke-width="7"/>
      <path d="M-138 -150 L-84 -222 M138 -150 L84 -222" stroke="${HOJA3}" stroke-width="3"/>
      <circle cx="60" cy="-92" r="14" fill="none" stroke="${INK}" stroke-width="12"/><circle cx="60" cy="-92" r="14" fill="none" stroke="${TERRA}" stroke-width="6"/>
      <circle cx="92" cy="-86" r="14" fill="none" stroke="${INK}" stroke-width="12"/><circle cx="92" cy="-86" r="14" fill="none" stroke="${TERRA}" stroke-width="6"/>
      <rect x="22" y="-76" width="100" height="74" rx="10" fill="${HOJA3}" stroke="${INK}" stroke-width="6"/>
      <path d="M-100 -40 L-30 -40" stroke="${HOJA3}" stroke-width="6" stroke-linecap="round"/>
      <!-- pañuelo al cuello y cuello -->
      <path d="M-44 -272 L-48 -212 L48 -212 L44 -272 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-80 -222 L0 -150 L80 -222 Q0 -200 -80 -222 Z" fill="${TERRA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <g class="ja-t-brazo">${brazos[o.brazo || "presenta"] || ""}</g>
      <!-- mano en la cintura -->
      <path d="M-190 -170 C-260 -120 -250 -60 -190 -60" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
      <path d="M-190 -170 C-260 -120 -250 -60 -190 -60" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
      <circle cx="-176" cy="-62" r="28" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      <g class="ja-t-cabeza">
        <ellipse cx="-110" cy="-342" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="110" cy="-342" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-108 -390 C-112 -500 112 -500 108 -390 L104 -315 C96 -250 54 -228 0 -228 C-54 -228 -96 -250 -104 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-108 -400 C-120 -370 -118 -345 -104 -330 L-96 -400 Z M108 -400 C120 -370 118 -345 104 -330 L96 -400 Z" fill="#d9d2c3" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path class="ja-t-cejas" d="${cejas}" fill="none" stroke="#d9d2c3" stroke-width="15" stroke-linecap="round"/>
        <path d="${cejas}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity="0" />
        <g class="ja-t-ojos">${ojos}</g>
        <ellipse cx="-70" cy="-308" rx="20" ry="12" fill="${TERRA2}" opacity="0.55"/><ellipse cx="70" cy="-308" rx="20" ry="12" fill="${TERRA2}" opacity="0.55"/>
        <ellipse cx="0" cy="-318" rx="22" ry="20" fill="${PIEL2}" stroke="${INK}" stroke-width="6"/>
        ${boca}
        <!-- bigote canoso -->
        <path d="M-84 -280 C-60 -318 -16 -306 0 -292 C16 -306 60 -318 84 -280 C70 -286 50 -270 30 -276 C14 -278 6 -284 0 -286 C-6 -284 -14 -278 -30 -276 C-50 -270 -70 -286 -84 -280 Z" fill="#ece6d8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <!-- sombrero de paja -->
        <g class="ja-t-sombrero">
          <path d="M-100 -430 C-104 -520 -60 -560 0 -560 C60 -560 104 -520 100 -430 Z" fill="#dcbd6e" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
          <path d="M-100 -460 C-40 -444 40 -444 100 -460 L102 -430 C40 -416 -40 -416 -102 -430 Z" fill="${TERRA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <ellipse cx="0" cy="-428" rx="200" ry="40" fill="#dcbd6e" stroke="${INK}" stroke-width="8"/>
          <path d="M-170 -420 L-150 -440 M-120 -400 L-100 -424 M-60 -394 L-50 -418 M60 -394 L50 -418 M120 -400 L100 -424 M170 -420 L150 -440 M-60 -530 L-40 -490 M0 -546 L0 -500 M60 -530 L40 -490" stroke="${SECO2}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
          <g transform="translate(72 -446)"><circle r="16" fill="${AMA}" stroke="${INK}" stroke-width="4"/><circle cx="-18" cy="-6" r="12" fill="${TERRA2}" stroke="${INK}" stroke-width="4"/><circle r="6" fill="${TERRA3}"/></g>
        </g>
      </g>
    </g></g>`;
  }

  // PLANTA-CLIENTE en maceta de terracota con cara. Base de la maceta en (x, y).
  // o.estado: "seca" (default) | "viva" — están las dos capas: .ja-p-seca / .ja-p-viva (y sus caras .ja-p-cs / .ja-p-cv)
  // o.tipo: "hojas" (default) | "cactus" | "flor"; o.cartel: ["LÍNEA 1", "línea 2"]; o.gorro: gorrito de cumpleaños;
  // o.telarana: telaraña entre las hojas secas; o.cls: clase extra. Bocas: .ja-p-boca (cada cara la suya)
  function planta(x, y, s, o) {
    o = o || {};
    const tipo = o.tipo || "hojas";
    const viva = o.estado === "viva";
    let seca = "", vivo = "";
    if (tipo === "cactus") {
      seca = `<path d="M-46 -196 C-60 -260 -50 -330 -10 -350 C30 -360 54 -320 50 -260 L46 -196 Z" fill="${SECO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-46 -270 C-90 -270 -110 -250 -110 -210" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M-46 -270 C-90 -270 -110 -250 -110 -210" fill="none" stroke="${SECO}" stroke-width="28" stroke-linecap="round"/>
        <path d="M48 -290 C90 -290 110 -270 112 -230" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M48 -290 C90 -290 110 -270 112 -230" fill="none" stroke="${SECO}" stroke-width="28" stroke-linecap="round"/>
        <path d="M-20 -330 L-24 -232 M14 -336 L18 -230 M-30 -300 l-14 -6 M30 -300 l14 -6 M-34 -250 l-14 -4 M34 -250 l14 -4" stroke="${SECO2}" stroke-width="5" stroke-linecap="round"/>`;
      vivo = `<path d="M-50 -196 C-64 -290 -56 -400 0 -420 C56 -400 64 -290 50 -196 Z" fill="${HOJA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-50 -280 C-110 -280 -120 -320 -120 -370" fill="none" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M-50 -280 C-110 -280 -120 -320 -120 -370" fill="none" stroke="${HOJA}" stroke-width="30" stroke-linecap="round"/>
        <path d="M50 -300 C110 -300 120 -340 120 -390" fill="none" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M50 -300 C110 -300 120 -340 120 -390" fill="none" stroke="${HOJA}" stroke-width="30" stroke-linecap="round"/>
        <path d="M-18 -400 L-22 -220 M18 -400 L22 -220" stroke="${HOJA3}" stroke-width="6" stroke-linecap="round"/>
        ${flor(0, -428, 34, "ja-p-flor")}${flor(-120, -384, 24, "ja-p-flor")}${flor(120, -404, 24, "ja-p-flor")}`;
    } else {
      // tallos caídos y hojas secas colgando
      const caidas = [[-1, 120, -270], [1, 130, -300], [-1, 70, -330], [1, 60, -350]];
      caidas.forEach(([lado, dx, alto], k) => {
        const ex = lado * dx, ey = -196 - (k % 2 ? 40 : 10);
        seca += `<path d="M${lado * 8} -196 C${lado * 10} ${alto} ${ex * 0.7} ${alto - 30} ${ex} ${ey - 40}" fill="none" stroke="${SECO2}" stroke-width="9" stroke-linecap="round"/>
          <path d="M${ex} ${ey - 40} C${ex + lado * 26} ${ey - 10} ${ex + lado * 12} ${ey + 40} ${ex - lado * 4} ${ey + 52} C${ex - lado * 22} ${ey + 20} ${ex - lado * 12} ${ey - 20} ${ex} ${ey - 40} Z" fill="${SECO}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
          <path d="M${ex} ${ey - 34} L${ex - lado * 2} ${ey + 42}" stroke="${SECO2}" stroke-width="3"/>`;
      });
      seca += `<path d="M-6 -196 C-4 -260 4 -300 0 -350" fill="none" stroke="${SECO2}" stroke-width="10" stroke-linecap="round"/>
        <path d="M0 -350 C30 -330 34 -300 18 -282 C0 -300 -6 -330 0 -350 Z" fill="${SECO}" stroke="${INK}" stroke-width="5"/>`;
      if (o.telarana) seca += `<g opacity="0.75" fill="none" stroke="${CRE}" stroke-width="2.5"><path d="M-70 -330 L70 -330 M0 -250 L0 -400 M-55 -385 L55 -275 M55 -385 L-55 -275"/>
        <path d="M-24 -330 Q-17 -347 0 -354 Q17 -347 24 -330 Q17 -313 0 -306 Q-17 -313 -24 -330 Z M-46 -330 Q-33 -363 0 -376 Q33 -363 46 -330 Q33 -297 0 -284 Q-33 -297 -46 -330 Z"/></g>`;
      // hojas vivas para arriba, con flores
      const hojas = [[-150, -380, -40], [150, -390, 40], [-90, -470, -18], [96, -480, 22], [0, -520, 0]];
      hojas.forEach(([hx, hy, rot]) => {
        vivo += `<path d="M0 -196 C${hx * 0.2} -300 ${hx * 0.7} ${hy + 60} ${hx} ${hy}" fill="none" stroke="${HOJA3}" stroke-width="10" stroke-linecap="round"/>`;
      });
      hojas.forEach(([hx, hy, rot], k) => {
        const lx = hx * 0.55, ly = hy + 70;
        vivo += `<g transform="rotate(${rot} ${lx} ${ly})"><path d="M${lx} ${ly + 50} C${lx - 46} ${ly + 10} ${lx - 30} ${ly - 50} ${lx} ${ly - 70} C${lx + 30} ${ly - 50} ${lx + 46} ${ly + 10} ${lx} ${ly + 50} Z" fill="${k % 2 ? HOJA : HOJA2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
          <path d="M${lx} ${ly + 44} L${lx} ${ly - 56}" stroke="${HOJA3}" stroke-width="4"/></g>`;
      });
      hojas.forEach(([hx, hy], k) => {
        vivo += tipo === "flor" || k % 2 === 0 || k === 4 ? flor(hx, hy, k === 4 ? 40 : 30, "ja-p-flor", k % 2 ? CRE : TERRA2) : `<ellipse cx="${hx}" cy="${hy}" rx="26" ry="34" fill="${HOJA}" stroke="${INK}" stroke-width="5" transform="rotate(${hx > 0 ? 30 : -30} ${hx} ${hy})"/>`;
      });
    }
    // maceta de terracota con cara
    const maceta = `<path d="M-96 0 L-116 -154 L116 -154 L96 0 Z" fill="${TERRA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M60 -154 L76 -154 L64 0 L50 0 Z" fill="${TERRA3}" opacity="0.5"/>
      <rect x="-136" y="-196" width="272" height="46" rx="10" fill="${TERRA2}" stroke="${INK}" stroke-width="7"/>
      <path d="M86 -190 L118 -190" stroke="${TERRA3}" stroke-width="10" stroke-linecap="round" opacity="0.5"/>`;
    const tierra = `<ellipse cx="0" cy="-194" rx="118" ry="12" fill="${TIERRA}"/>`;
    const grietas = `<path d="M-60 -194 l12 -4 l10 5 M20 -196 l14 4 l10 -5" stroke="${SECO}" stroke-width="3" fill="none"/>`;
    const caraSeca = `<g class="ja-p-cs">
        <path d="M-62 -108 Q-42 -96 -22 -108 M22 -108 Q42 -96 62 -108" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M-62 -114 L-22 -114 M22 -114 L62 -114" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M-58 -86 Q-42 -80 -26 -86 M26 -86 Q42 -80 58 -86" fill="none" stroke="${TERRA3}" stroke-width="5" stroke-linecap="round"/>
        <path class="ja-p-boca" d="M-30 -42 Q0 -64 30 -42 Q0 -52 -30 -42 Z" fill="#5a1410" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      </g>`;
    const caraViva = `<g class="ja-p-cv">
        <path d="M-62 -100 Q-42 -124 -22 -100 M22 -100 Q42 -124 62 -100" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
        <ellipse cx="-72" cy="-72" rx="18" ry="10" fill="${TERRA2}"/><ellipse cx="72" cy="-72" rx="18" ry="10" fill="${TERRA2}"/>
        <path class="ja-p-boca" d="M-36 -66 Q0 -18 36 -66 Z" fill="#5a1410" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      </g>`;
    const cartel = o.cartel ? `<g class="ja-p-cartel">
        <path d="M150 0 L170 -250" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M150 0 L170 -250" stroke="${SECO}" stroke-width="8" stroke-linecap="round"/>
        <g transform="rotate(5 170 -280)">
          <rect x="${170 - o.cartelAncho / 2}" y="-330" width="${o.cartelAncho}" height="${o.cartel.length > 1 ? 112 : 70}" rx="8" fill="${CRE}" stroke="${INK}" stroke-width="6"/>
          ${o.cartel.map((l, i) => `<text data-layout-ignore x="170" y="${-282 + i * 48}" text-anchor="middle" font-family="${i ? "Caveat" : "IBM Plex Mono"}" font-weight="${i ? 700 : 600}" font-size="${i ? 40 : 30}" fill="${i ? TERRA3 : INK}" letter-spacing="${i ? 0 : 2}">${l}</text>`).join("")}
        </g></g>` : "";
    const gorro = o.gorro ? `<g class="ja-p-gorro" transform="translate(${o.gorro[0]} ${o.gorro[1]}) rotate(${o.gorro[2] || 0})">
        <path d="M-44 0 L0 -110 L44 0 Z" fill="${AMA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-30 -36 L28 -50 M-16 -72 L18 -80" stroke="${TERRA}" stroke-width="9"/>
        <circle cx="0" cy="-114" r="14" fill="${TERRA2}" stroke="${INK}" stroke-width="5"/></g>` : "";
    return `<g class="ja-p ${o.cls || ""}" transform="${T(x, y, s)}">
      <g class="ja-p-seca" opacity="${viva ? 0 : 1}">${seca}</g>
      <g class="ja-p-viva" opacity="${viva ? 1 : 0}">${vivo}</g>
      ${tierra}<g class="ja-p-grietas" opacity="${viva ? 0 : 1}">${grietas}</g>
      ${cartel}
      <g class="ja-p-maceta">${maceta}
      <g opacity="${viva ? 0 : 1}" class="ja-p-cs-w">${caraSeca}</g><g opacity="${viva ? 1 : 0}" class="ja-p-cv-w">${caraViva}</g></g>
      ${gorro}
    </g>`;
  }

  // FLOR de 5 pétalos centrada en (x, y), radio r
  function flor(x, y, r, cls, color) {
    let p = "";
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
      p += `<ellipse cx="${(x + Math.cos(a) * r * 0.62).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.62).toFixed(1)}" rx="${r * 0.48}" ry="${r * 0.62}" transform="rotate(${(a * 180) / Math.PI + 90} ${(x + Math.cos(a) * r * 0.62).toFixed(1)} ${(y + Math.sin(a) * r * 0.62).toFixed(1)})" fill="${color || TERRA2}" stroke="${INK}" stroke-width="4"/>`;
    }
    return `<g class="${cls || ""}" data-cx="${x}" data-cy="${y}">${p}<circle cx="${x}" cy="${y}" r="${r * 0.36}" fill="${AMA}" stroke="${INK}" stroke-width="4"/></g>`;
  }

  // DUEÑO del comercio (pie en x, y). o.cara: "neutra" | "grita" | "cansado" | "feliz"; o.gota sudor; o.camisa color
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "feliz" ? `<path d="M-70 -346 Q-50 -370 -30 -346 M70 -346 Q50 -370 30 -346" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "cansado" ? `<path d="M-70 -352 L-30 -352 M30 -352 L70 -352" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M-68 -340 Q-50 -330 -32 -340 M68 -340 Q50 -330 32 -340" fill="none" stroke="${TERRA3}" stroke-width="5" opacity="0.7"/>`
      : `<circle cx="-50" cy="-350" r="12" fill="${INK}"/><circle cx="50" cy="-350" r="12" fill="${INK}"/>`;
    const cejas = cara === "grita" ? "M-80 -394 L-30 -378 M80 -394 L30 -378" : cara === "cansado" ? "M-76 -376 L-30 -386 M76 -376 L30 -386" : "M-76 -384 L-30 -392 M76 -384 L30 -392";
    const boca = cara === "grita" ? `<path class="ja-d-boca" d="M-42 -284 Q0 -300 42 -284 Q34 -230 0 -228 Q-34 -230 -42 -284 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "feliz" ? `<path class="ja-d-boca" d="M-44 -282 Q0 -226 44 -282 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : `<path class="ja-d-boca" d="M-26 -266 Q0 -278 26 -266" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const cam = o.camisa || TERRA;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="ja-d">
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${cam}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-140 40 L-130 -140 Q0 -112 130 -140 L140 40 Z" fill="${CRE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-130 -140 L-78 -222 M130 -140 L78 -222" stroke="${INK}" stroke-width="7"/>
      <rect x="-50" y="-70" width="100" height="60" rx="8" fill="none" stroke="${INK}" stroke-width="5" opacity="0.5"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="ja-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -425 C-132 -400 -130 -355 -110 -335 L-100 -335 L-98 -425 Z M112 -425 C132 -400 130 -355 110 -335 L100 -335 L98 -425 Z" fill="#6b6259" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -478 Q0 -492 40 -480" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        <path class="ja-d-cejas" d="${cejas}" stroke="#3b332c" stroke-width="13" stroke-linecap="round"/>
        <g class="ja-d-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
        <path class="ja-d-gota" d="M108 -430 C98 -410 96 -396 108 -392 C120 -396 118 -410 108 -430 Z" fill="#8fd3ff" stroke="${INK}" stroke-width="4" opacity="${o.gota ? 1 : 0}"/>
      </g>
    </g></g>`;
  }

  // REGADERA: cuerpo con base en (x, y). o.ia: la del agente (verde, con pantallita y "IA").
  // Clases: .ja-rg (todo) .ja-rg-flor (la flor del pico, de donde sale el agua: en x+218*s, y-206*s) .ja-rg-ojos
  function regadera(x, y, s, o) {
    o = o || {};
    const c1 = o.ia ? HOJA : CRE2, c2 = o.ia ? HOJA3 : SECO;
    const pantalla = o.ia ? `<rect x="-64" y="-150" width="128" height="86" rx="16" fill="${INK}" stroke="${INK}" stroke-width="5"/>
        <g class="ja-rg-ojos"><ellipse cx="-28" cy="-114" rx="11" ry="14" fill="${VERDE}"/><ellipse cx="28" cy="-114" rx="11" ry="14" fill="${VERDE}"/></g>
        <path d="M-22 -84 Q0 -72 22 -84" fill="none" stroke="${VERDE}" stroke-width="6" stroke-linecap="round"/>
        <rect x="-50" y="-40" width="100" height="40" rx="8" fill="${VERDE}" stroke="${INK}" stroke-width="5"/>
        <text data-layout-ignore x="0" y="-10" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="${INK}">IA</text>`
      : `<path d="M-60 -110 L60 -110 M-60 -60 L60 -60" stroke="${c2}" stroke-width="6" opacity="0.6"/>`;
    return `<g class="ja-rg ${o.cls || ""}" transform="${T(x, y, s, o.espejo)}">
      <path d="M100 -60 L196 -196" stroke="${INK}" stroke-width="34" stroke-linecap="round"/>
      <path d="M100 -60 L196 -196" stroke="${c1}" stroke-width="20" stroke-linecap="round"/>
      <g class="ja-rg-flor"><path d="M186 -206 L232 -236 L250 -196 L206 -182 Z" fill="${c2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></g>
      <path d="M-90 -170 C-160 -180 -170 -60 -96 -50" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
      <path d="M-90 -170 C-160 -180 -170 -60 -96 -50" fill="none" stroke="${c2}" stroke-width="16" stroke-linecap="round"/>
      <path d="M-100 0 L-110 -176 Q0 -196 110 -176 L100 0 Z" fill="${c1}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -186 C-60 -250 60 -250 70 -186" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
      <path d="M-70 -186 C-60 -250 60 -250 70 -186" fill="none" stroke="${c2}" stroke-width="12" stroke-linecap="round"/>
      ${pantalla}
    </g>`;
  }

  // GOTAS de agua (o gotas-mensaje del agente): n gotas que salen de (x, y) en abanico; clase .ja-gota
  function gotas(x, y, n, o) {
    o = o || {};
    let s = "";
    for (let k = 0; k < n; k++) {
      const dx = (k - (n - 1) / 2) * (o.sep || 22);
      s += o.chat
        ? `<g transform="translate(${x + dx} ${y})"><g class="ja-gota"><rect x="-22" y="-16" width="44" height="32" rx="10" fill="${VERDE}" stroke="${INK}" stroke-width="4"/><path d="M-8 16 L-14 26 L2 16 Z" fill="${VERDE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M-10 -2 L10 -2" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g></g>`
        : `<path class="ja-gota" d="M${x + dx} ${y - 16} C${x + dx - 10} ${y} ${x + dx - 10} ${y + 10} ${x + dx} ${y + 12} C${x + dx + 10} ${y + 10} ${x + dx + 10} ${y} ${x + dx} ${y - 16} Z" fill="#8fd3ff" stroke="${INK}" stroke-width="3"/>`;
    }
    return `<g class="ja-gotas">${s}</g>`;
  }

  // ESTANTE de madera del vivero (tabla en y, de x a x+w) con patas
  function estante(x, y, w, o) {
    o = o || {};
    return `<g class="ja-estante ${o.cls || ""}">
      <path d="M${x + 30} ${y} L${x + 30} ${y + (o.patas || 360)} M${x + w - 30} ${y} L${x + w - 30} ${y + (o.patas || 360)}" stroke="${INK}" stroke-width="30"/>
      <path d="M${x + 30} ${y} L${x + 30} ${y + (o.patas || 360)} M${x + w - 30} ${y} L${x + w - 30} ${y + (o.patas || 360)}" stroke="${SECO2}" stroke-width="18"/>
      <rect x="${x}" y="${y}" width="${w}" height="36" rx="6" fill="${SECO}" stroke="${INK}" stroke-width="7"/>
      <path d="M${x + 20} ${y + 18} L${x + w - 20} ${y + 18}" stroke="${SECO2}" stroke-width="3" opacity="0.6"/>
    </g>`;
  }

  // MOSTRADOR del comercio: tapa en y, de x a x+w, hasta y+h
  function mostrador(x, y, w, h) {
    return `<g class="ja-mostrador">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${TERRA3}" stroke="${INK}" stroke-width="8"/>
      <path d="M${x + w * 0.33} ${y + 40} L${x + w * 0.33} ${y + h - 10} M${x + w * 0.66} ${y + 40} L${x + w * 0.66} ${y + h - 10}" stroke="${INK}" stroke-width="5" opacity="0.5"/>
      <rect x="${x - 16}" y="${y - 10}" width="${w + 32}" height="40" rx="8" fill="${SECO}" stroke="${INK}" stroke-width="8"/>
    </g>`;
  }

  // CALENDARIO de pared (hoja de mes): centro arriba (x, y), ancho w
  function calendario(x, y, w, mes, o) {
    o = o || {};
    const h = w * 1.05;
    let dias = "";
    for (let k = 0; k < 20; k++) dias += `<rect x="${x - w / 2 + 24 + (k % 5) * ((w - 48) / 5)}" y="${y + 120 + Math.floor(k / 5) * ((h - 150) / 4.6)}" width="${(w - 48) / 5 - 10}" height="${(h - 150) / 4.6 - 10}" rx="4" fill="${k === (o.marca ?? 8) ? TERRA2 : CRE2}" opacity="${k === (o.marca ?? 8) ? 1 : 0.7}"/>`;
    return `<g class="ja-cal ${o.cls || ""}">
      <rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="12" fill="${CRE}" stroke="${INK}" stroke-width="7"/>
      <rect x="${x - w / 2}" y="${y}" width="${w}" height="96" rx="12" fill="${TERRA}" stroke="${INK}" stroke-width="7"/>
      <text data-layout-ignore x="${x}" y="${y + 66}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${Math.round(w * 0.17)}" fill="${CRE}" letter-spacing="2">${mes}</text>
      <circle cx="${x - w / 4}" cy="${y}" r="10" fill="${INK}"/><circle cx="${x + w / 4}" cy="${y}" r="10" fill="${INK}"/>
      ${dias}
    </g>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || CRE}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || INV2}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${CRE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${CRE}">${nombre}</text>
      <text class="ja-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${CRE2}">${sub || ""}</text>`;
  }
  // GLOBO de chat: lado "d" (sale, verde claro) o "i" (entra, blanco). Devuelve [svg, alto, ancho].
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d9efc4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hora = o.hora ? `<text x="${gx + ancho - 18}" y="${y + alto - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#6b6259">${o.hora}</text>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}${hora}</g>`, alto, ancho];
  }

  // HOJAS que caen (secas): n hojitas repartidas; clase .ja-caen (cada una .ja-hc)
  function hojasCaen(x, y, w, h, n, seed, color) {
    const rnd = azar(seed || 5);
    let s = "";
    for (let k = 0; k < n; k++) {
      const cx = Math.round(x + rnd() * w), cy = Math.round(y + rnd() * h), rot = Math.round(rnd() * 180);
      s += `<path class="ja-hc" d="M${cx} ${cy - 22} C${cx + 16} ${cy - 8} ${cx + 12} ${cy + 14} ${cx} ${cy + 22} C${cx - 12} ${cy + 14} ${cx - 16} ${cy - 8} ${cx} ${cy - 22} Z" fill="${color || SECO}" stroke="${INK}" stroke-width="3" transform="rotate(${rot} ${cx} ${cy})"/>`;
    }
    return `<g class="ja-caen">${s}</g>`;
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
    // la boca se abre y cierra (todas las que coinciden con sel)
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.7, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // una planta se balancea (meneo de hojas) desde la base: el punto (x, y) en coordenadas del svg
    function menear(el, x, y, t, d, ang, veces) {
      origen(el, `${x} ${y}`);
      tl.fromTo(el, { rotation: -(ang || 3) }, { rotation: ang || 3, duration: d || 0.8, yoyo: true, repeat: (veces || 2) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    // FLORECER: la planta (selector del .ja-p) pasa de seca a viva en t; base (x, y) = coordenadas svg de la maceta
    function florecer(sel, t, x, y) {
      const p = q(sel);
      const viva = p.querySelector(".ja-p-viva"), seca = p.querySelector(".ja-p-seca");
      tl.to(seca, { opacity: 0, duration: 0.2 }, t);
      tl.to(p.querySelector(".ja-p-grietas"), { opacity: 0, duration: 0.2 }, t);
      tl.to(p.querySelector(".ja-p-cs-w"), { opacity: 0, duration: 0.1 }, t + 0.1);
      tl.to(p.querySelector(".ja-p-cv-w"), { opacity: 1, duration: 0.1 }, t + 0.1);
      const bb = viva.getBBox();
      origen(viva, `${bb.x + bb.width / 2} ${bb.y + bb.height}`);
      tl.fromTo(viva, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", immediateRender: false }, t);
      Array.from(p.querySelectorAll(".ja-p-flor")).forEach((f, i) => {
        const b2 = f.getBBox();
        origen(f, `${b2.x + b2.width / 2} ${b2.y + b2.height / 2}`);
        tl.fromTo(f, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.4)", immediateRender: false }, t + 0.35 + i * 0.08);
      });
    }
    // marchitar: la parte seca se cae un poco (de viva-ish a seca), con sacudón chico
    function marchitar(sel, t) {
      const p = q(sel);
      const seca = p.querySelector(".ja-p-seca");
      const bb = seca.getBBox();
      origen(seca, `${bb.x + bb.width / 2} ${bb.y + bb.height}`);
      tl.fromTo(seca, { scaleY: 1.12, rotation: 0 }, { scaleY: 0.9, rotation: 3, duration: 0.5, ease: "power2.in", immediateRender: false }, t);
    }
    // las gotas caen desde donde están (selector del grupo .ja-gotas)
    function regar(sel, t, caida, veces) {
      qa(sel + " .ja-gota").forEach((g, i) => {
        gsap.set(g, { opacity: 0 });
        for (let v = 0; v < (veces || 1); v++) {
          tl.fromTo(g, { y: 0, opacity: 0 }, { y: caida || 200, opacity: 1, duration: 0.5, ease: "power1.in", immediateRender: false }, t + v * 0.45 + (i % 4) * 0.08);
          tl.to(g, { opacity: 0, duration: 0.1 }, t + v * 0.45 + (i % 4) * 0.08 + 0.45);
        }
      });
    }
    function caen(sel, t, d, caida) {
      qa(sel + " .ja-hc").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { y: -120 - (i % 5) * 40, x: 0, opacity: 0 }, { y: caida || 500, x: (i % 2 ? 40 : -40), opacity: 1, duration: d || 2, ease: "sine.in", immediateRender: false }, t + (i % 7) * 0.12);
      });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, hablar, menear, florecer, marchitar, regar, caen, salida };
  }
  return { INK, HOJA, HOJA2, HOJA3, INV, INV2, TERRA, TERRA2, TERRA3, CRE, CRE2, AMA, SECO, SECO2, PIEL, PIEL2, TIERRA, VERDE, VERDE2,
    azar, tito, planta, flor, dueno, regadera, gotas, estante, mostrador, calendario, celular, celularBorde, chatCabecera, globo, hojasCaen, kit };
})();
