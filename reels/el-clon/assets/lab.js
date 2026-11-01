// Piezas del reel "el-clon": el científico (el dueño), la criatura (su clon), el laboratorio gótico
// (bobinas, mesa, palanca, ventana con tormenta), la planilla, el celular con chat, rayos y helpers.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = LAB.cientifico(x, y, s) + ...
// y en el script: const K = LAB.kit(tl, root).
window.LAB = window.LAB || (function () {
  const INK = "#0a0a0c", GRA = "#26262b", GRA2 = "#3a3a41", PLA = "#8d8d94", PLA2 = "#b9b9be", HUE = "#ecebe4", HUE2 = "#d2d0c6",
    VER = "#5ce611", VER2 = "#b8ff7a", VER3 = "#2f7a0a", ROJ = "#e5484d", ROJ2 = "#ff6b70",
    PIEL = "#d8d4c8", PIEL2 = "#b5b0a3", MON = "#a3ab9c", MON2 = "#7f8879";
  if (!document.getElementById("lab-css")) {
    const st = document.createElement("style");
    st.id = "lab-css";
    st.textContent = `
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Special Elite"; font-display: block; src: url("assets/fonts/SpecialElite.woff2") format("woff2"); }
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.lab-titulo { position: absolute; font-family: "Cinzel", serif; font-weight: 900; color: ${HUE}; white-space: nowrap; text-align: center; line-height: 0.95;
  letter-spacing: 0.04em; text-shadow: 0 0 2px ${INK}, 0 6px 0 ${INK}, 0 0 30px rgba(92, 230, 17, 0.45); }
.lab-titulo.verde { color: ${VER}; text-shadow: 0 6px 0 ${INK}, 0 0 34px rgba(92, 230, 17, 0.7); }
.lab-titulo.rojo { color: ${ROJ2}; text-shadow: 0 6px 0 ${INK}, 0 0 30px rgba(229, 72, 77, 0.6); }
.lab-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROJ}; border-radius: 12px; color: ${ROJ};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(236, 235, 228, 0.95); }
.lab-sello.verde { border-color: ${VER3}; color: ${VER3}; }
.lab-sello.negro { border-color: ${INK}; color: ${INK}; }
.lab-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${VER}; border-radius: 6px; box-shadow: 0 0 22px rgba(92, 230, 17, 0.45);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.16em; color: ${VER2}; white-space: nowrap; text-align: center; }
.lab-tag.hueso { border-color: ${HUE}; color: ${HUE}; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5); }
.lab-tag.rojo { border-color: ${ROJ2}; color: ${ROJ2}; box-shadow: 0 0 22px rgba(229, 72, 77, 0.45); }
.lab-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${HUE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.55); }
.lab-placa { position: absolute; box-sizing: border-box; padding: 18px 40px 14px; background: ${INK}; border: 5px solid ${HUE}; outline: 3px solid ${INK}; outline-offset: 0;
  box-shadow: inset 0 0 0 5px ${INK}, inset 0 0 0 8px ${HUE2}; font-family: "Cinzel", serif; font-weight: 900; color: ${HUE}; text-align: center; white-space: nowrap; letter-spacing: 0.08em; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // RAYO: zigzag determinista de (x1,y1) a (x2,y2). Devuelve dos paths (halo verde + núcleo blanco) con clase o.cls.
  function rayo(x1, y1, x2, y2, o) {
    o = o || {};
    const rnd = azar(o.seed || 5), n = o.n || 9, amp = o.amp || 50;
    let d = `M${x1} ${y1}`;
    for (let k = 1; k < n; k++) {
      const f = k / n, px = x1 + (x2 - x1) * f, py = y1 + (y2 - y1) * f;
      const dx = -(y2 - y1), dy = x2 - x1, L = Math.hypot(dx, dy) || 1;
      const off = (rnd() - 0.5) * 2 * amp;
      d += ` L${Math.round(px + (dx / L) * off)} ${Math.round(py + (dy / L) * off)}`;
    }
    d += ` L${x2} ${y2}`;
    return `<g class="lab-rayo ${o.cls || ""}">
      <path d="${d}" fill="none" stroke="${VER}" stroke-width="${o.w ? o.w * 3 : 22}" stroke-linejoin="round" stroke-linecap="round" opacity="0.45"/>
      <path d="${d}" fill="none" stroke="${VER2}" stroke-width="${o.w ? o.w * 1.6 : 11}" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${o.w || 5}" stroke-linejoin="round" stroke-linecap="round"/>
    </g>`;
  }

  // BOBINA de Tesla: base en (x, y), alto h. Clase .lab-bob; la esfera de arriba .lab-bob-top (centro x, y-h).
  function bobina(x, y, h, o) {
    o = o || {};
    let esp = "";
    for (let k = 0; k < 12; k++) {
      const yy = y - 70 - k * ((h - 140) / 12);
      esp += `<path d="M${x - 38} ${yy} Q${x} ${yy + 10} ${x + 38} ${yy}" fill="none" stroke="${PLA2}" stroke-width="5"/>`;
    }
    return `<g class="lab-bob ${o.cls || ""}">
      <path d="M${x - 90} ${y} L${x + 90} ${y} L${x + 70} ${y - 50} L${x - 70} ${y - 50} Z" fill="${GRA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="${x - 42}" y="${y - h + 50}" width="84" height="${h - 100}" rx="10" fill="${GRA2}" stroke="${INK}" stroke-width="7"/>
      ${esp}
      <rect x="${x - 60}" y="${y - h + 30}" width="120" height="30" rx="8" fill="${PLA}" stroke="${INK}" stroke-width="6"/>
      <g class="lab-bob-top">
        <circle cx="${x}" cy="${y - h}" r="44" fill="${PLA2}" stroke="${INK}" stroke-width="7"/>
        <path d="M${x - 26} ${y - h - 18} A30 30 0 0 1 ${x - 4} ${y - h - 32}" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.8"/>
      </g>
    </g>`;
  }

  // MESA de operaciones con sábana (para la criatura acostada). Centro arriba (x, y), ancho w.
  function mesa(x, y, w) {
    return `<g class="lab-mesa">
      <path d="M${x - w / 2 + 40} ${y + 30} L${x - w / 2 + 70} ${y + 260} M${x + w / 2 - 40} ${y + 30} L${x + w / 2 - 70} ${y + 260}" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
      <path d="M${x - w / 2 + 40} ${y + 30} L${x - w / 2 + 70} ${y + 260} M${x + w / 2 - 40} ${y + 30} L${x + w / 2 - 70} ${y + 260}" stroke="${PLA}" stroke-width="12" stroke-linecap="round"/>
      <rect x="${x - w / 2}" y="${y}" width="${w}" height="44" rx="10" fill="${GRA2}" stroke="${INK}" stroke-width="7"/>
      <path d="M${x - w / 2 + 20} ${y + 22} L${x + w / 2 - 20} ${y + 22}" stroke="${PLA}" stroke-width="4" opacity="0.5"/>
    </g>`;
  }

  // PALANCA de la máquina: caja en (x, y). La manija .lab-pal-man rota con svgOrigin "x y-20".
  function palanca(x, y, o) {
    o = o || {};
    return `<g class="lab-pal ${o.cls || ""}">
      <rect x="${x - 70}" y="${y - 40}" width="140" height="150" rx="10" fill="${GRA}" stroke="${INK}" stroke-width="7"/>
      <text data-layout-ignore x="${x}" y="${y + 70}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="${VER2}" letter-spacing="2">${o.txt || "ON"}</text>
      <circle cx="${x - 40}" cy="${y + 92}" r="8" fill="${VER}" class="lab-pal-luz"/>
      <circle cx="${x + 40}" cy="${y + 92}" r="8" fill="${ROJ}"/>
      <g class="lab-pal-man">
        <path d="M${x} ${y - 20} L${x - 60} ${y - 170}" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
        <path d="M${x} ${y - 20} L${x - 60} ${y - 170}" stroke="${PLA2}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="${x - 62}" cy="${y - 176}" r="24" fill="${ROJ}" stroke="${INK}" stroke-width="6"/>
      </g>
      <circle cx="${x}" cy="${y - 20}" r="16" fill="${PLA}" stroke="${INK}" stroke-width="6"/>
    </g>`;
  }

  // VENTANA gótica en arco con tormenta: centro x, base y, ancho w, alto h. El destello es .lab-ven-luz.
  function ventana(x, y, w, h, o) {
    o = o || {};
    const r = w / 2;
    return `<g class="lab-ven">
      <path d="M${x - r} ${y} L${x - r} ${y - h + r} A${r} ${r} 0 0 1 ${x + r} ${y - h + r} L${x + r} ${y} Z" fill="#101016" stroke="${INK}" stroke-width="16"/>
      <path class="lab-ven-luz" d="M${x - r} ${y} L${x - r} ${y - h + r} A${r} ${r} 0 0 1 ${x + r} ${y - h + r} L${x + r} ${y} Z" fill="${HUE}" opacity="0"/>
      ${o.rayo ? rayo(x - r * 0.4, y - h + 20, x + r * 0.25, y - 30, { seed: o.seed || 2, n: 6, amp: 26, w: 4, cls: "lab-ven-rayo" }) : ""}
      <path d="M${x} ${y - h} L${x} ${y} M${x - r} ${y - h * 0.45} L${x + r} ${y - h * 0.45}" stroke="${INK}" stroke-width="12"/>
      <path d="M${x - r} ${y} L${x - r} ${y - h + r} A${r} ${r} 0 0 1 ${x + r} ${y - h + r} L${x + r} ${y} Z" fill="none" stroke="${PLA}" stroke-width="5"/>
      <rect x="${x - r - 24}" y="${y}" width="${w + 48}" height="26" fill="${GRA2}" stroke="${INK}" stroke-width="6"/>
    </g>`;
  }

  // FRASCOS burbujeantes (decorado): base en (x, y)
  function frascos(x, y) {
    return `<g class="lab-frascos">
      <path d="M${x - 20} ${y - 160} L${x - 20} ${y - 100} L${x - 70} ${y - 10} Q${x - 76} ${y} ${x - 60} ${y} L${x + 60} ${y} Q${x + 76} ${y} ${x + 70} ${y - 10} L${x + 20} ${y - 100} L${x + 20} ${y - 160} Z" fill="${GRA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M${x - 50} ${y - 46} L${x + 50} ${y - 46} L${x + 66} ${y - 12} Q${x + 68} ${y - 6} ${x + 58} ${y - 6} L${x - 58} ${y - 6} Q${x - 68} ${y - 6} ${x - 66} ${y - 12} Z" fill="${VER}" opacity="0.85"/>
      <circle class="lab-burbuja" cx="${x - 10}" cy="${y - 60}" r="8" fill="${VER2}"/><circle class="lab-burbuja" cx="${x + 14}" cy="${y - 80}" r="6" fill="${VER2}"/>
      <rect x="${x + 90}" y="${y - 120}" width="56" height="120" rx="10" fill="${GRA}" stroke="${INK}" stroke-width="7"/>
      <rect x="${x + 96}" y="${y - 60}" width="44" height="54" rx="6" fill="${VER3}"/>
      <rect x="${x + 84}" y="${y - 136}" width="68" height="20" rx="5" fill="${PLA}" stroke="${INK}" stroke-width="5"/>
    </g>`;
  }

  // EL CIENTÍFICO (el dueño): busto, origen = centro de la base del torso. Cabeza en (0,-360).
  // o.cara: "loco" | "grito" | "horror" | "feliz" | "dormido" | "neutra"; o.brazos: "arriba" (¡está vivo!) | "cabeza" (se agarra la cabeza)
  // clases: .lab-c .lab-c-cabeza .lab-c-boca .lab-c-ojos .lab-c-pelo .lab-c-brazos
  function cientifico(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "dormido" ? `<path d="M-68 -350 Q-48 -336 -28 -350 M68 -350 Q48 -336 28 -350" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path d="M-68 -344 Q-48 -368 -28 -344 M68 -344 Q48 -368 28 -344" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "horror" || cara === "grito" ? `<circle cx="-48" cy="-350" r="20" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="48" cy="-350" r="20" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-350" r="6" fill="${INK}"/><circle cx="48" cy="-350" r="6" fill="${INK}"/>`
      : cara === "loco" ? `<circle cx="-48" cy="-350" r="18" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="48" cy="-354" r="24" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="-44" cy="-348" r="7" fill="${INK}"/><circle cx="52" cy="-352" r="9" fill="${INK}"/>`
      : `<circle cx="-48" cy="-350" r="11" fill="${INK}"/><circle cx="48" cy="-350" r="11" fill="${INK}"/>`;
    const cejas = cara === "horror" || cara === "grito" ? "M-76 -394 Q-50 -414 -24 -396 M76 -394 Q50 -414 24 -396"
      : cara === "loco" ? "M-78 -380 L-26 -392 M76 -404 Q50 -416 24 -400" : "M-76 -384 L-30 -392 M76 -384 L30 -392";
    const boca = cara === "loco" ? `<path class="lab-c-boca" d="M-52 -284 Q0 -222 52 -284 Z" fill="#ffffff" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M-40 -270 L40 -270 M-20 -282 L-20 -252 M0 -284 L0 -246 M20 -282 L20 -252" stroke="${INK}" stroke-width="4"/>`
      : cara === "grito" ? `<ellipse class="lab-c-boca" cx="0" cy="-262" rx="30" ry="36" fill="${INK}" stroke="${INK}" stroke-width="5"/>`
      : cara === "horror" ? `<ellipse class="lab-c-boca" cx="0" cy="-262" rx="20" ry="26" fill="${INK}" stroke="${INK}" stroke-width="5"/>`
      : cara === "feliz" ? `<path class="lab-c-boca" d="M-40 -280 Q0 -236 40 -280 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "dormido" ? `<ellipse class="lab-c-boca" cx="0" cy="-266" rx="14" ry="10" fill="${INK}"/>`
      : `<path class="lab-c-boca" d="M-26 -268 Q0 -256 26 -268" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const brazos = o.brazos === "arriba" ? `<g class="lab-c-brazos">
        <path d="M-170 -170 C-250 -250 -290 -380 -280 -520" fill="none" stroke="${INK}" stroke-width="72" stroke-linecap="round"/>
        <path d="M-170 -170 C-250 -250 -290 -380 -280 -520" fill="none" stroke="${HUE}" stroke-width="56" stroke-linecap="round"/>
        <path d="M170 -170 C250 -250 290 -380 280 -520" fill="none" stroke="${INK}" stroke-width="72" stroke-linecap="round"/>
        <path d="M170 -170 C250 -250 290 -380 280 -520" fill="none" stroke="${HUE}" stroke-width="56" stroke-linecap="round"/>
        <circle cx="-280" cy="-548" r="36" fill="${INK}"/><circle cx="-280" cy="-548" r="30" fill="${GRA2}"/>
        <circle cx="280" cy="-548" r="36" fill="${INK}"/><circle cx="280" cy="-548" r="30" fill="${GRA2}"/>
      </g>`
      : o.brazos === "cabeza" ? `<g class="lab-c-brazos">
        <path d="M-170 -170 C-230 -220 -200 -300 -130 -340" fill="none" stroke="${INK}" stroke-width="72" stroke-linecap="round"/>
        <path d="M-170 -170 C-230 -220 -200 -300 -130 -340" fill="none" stroke="${HUE}" stroke-width="56" stroke-linecap="round"/>
        <path d="M170 -170 C230 -220 200 -300 130 -340" fill="none" stroke="${INK}" stroke-width="72" stroke-linecap="round"/>
        <path d="M170 -170 C230 -220 200 -300 130 -340" fill="none" stroke="${HUE}" stroke-width="56" stroke-linecap="round"/>
        <circle cx="-120" cy="-350" r="34" fill="${INK}"/><circle cx="-120" cy="-350" r="28" fill="${GRA2}"/>
        <circle cx="120" cy="-350" r="34" fill="${INK}"/><circle cx="120" cy="-350" r="28" fill="${GRA2}"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="lab-c">
      <!-- guardapolvo blanco y, encima, el delantal del almacén -->
      <path d="M-250 40 C-250 -110 -190 -205 -80 -222 L80 -222 C190 -205 250 -110 250 40 Z" fill="${HUE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-80 -222 L-20 -100 L0 -170 L20 -100 L80 -222" fill="${HUE2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-150 40 L-138 -120 Q0 -96 138 -120 L150 40 Z" fill="${GRA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-138 -120 L-90 -215 M138 -120 L90 -215" stroke="${INK}" stroke-width="8"/>
      <text data-layout-ignore x="0" y="-40" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="30" fill="${HUE2}" letter-spacing="2">ALMACÉN</text>
      <rect x="-180" y="-150" width="50" height="10" rx="4" fill="${PLA}"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      ${o.brazos === "cabeza" ? "" : brazos}
      <g class="lab-c-cabeza">
        <!-- pelo blanco desquiciado -->
        <path class="lab-c-pelo" d="M-112 -330 C-190 -330 -200 -400 -150 -420 C-210 -470 -150 -540 -90 -500 C-90 -580 0 -580 10 -520 C40 -590 140 -560 110 -500 C180 -530 210 -440 150 -420 C210 -390 190 -320 112 -330 Z" fill="${HUE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <ellipse cx="-112" cy="-338" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-338" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-108 -390 C-112 -500 112 -500 108 -390 L104 -315 C96 -250 55 -228 0 -228 C-55 -228 -96 -250 -104 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- antiparras en la frente -->
        <path d="M-108 -428 L108 -428" stroke="${INK}" stroke-width="14"/>
        <circle cx="-44" cy="-430" r="30" fill="${GRA2}" stroke="${INK}" stroke-width="8"/><circle cx="44" cy="-430" r="30" fill="${GRA2}" stroke="${INK}" stroke-width="8"/>
        <circle cx="-44" cy="-430" r="18" fill="${VER}" opacity="0.55"/><circle cx="44" cy="-430" r="18" fill="${VER}" opacity="0.55"/>
        <path d="M-56 -442 L-46 -448 M32 -442 L42 -448" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
        <path class="lab-c-cejas" d="${cejas}" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <!-- ojeras de tanto pasar pedidos -->
        <path d="M-74 -326 Q-48 -312 -22 -326 M74 -326 Q48 -312 22 -326" fill="none" stroke="${PLA}" stroke-width="7" stroke-linecap="round"/>
        <g class="lab-c-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="${HUE}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
      </g>
      ${o.brazos === "cabeza" ? brazos : ""}
    </g></g>`;
  }

  // LA CRIATURA (el clon): busto, origen = centro de la base del torso. Cabeza en (0,-360). Misma cara que el
  // científico (bigote) pero piel gris verdosa, cabeza chata, costuras, electrodos en las sienes, ojos verdes.
  // o.cara: "neutra" | "cansada" | "malvada" | "feliz" | "triste" | "dormida"; o.delantal (default true); o.ojos: false (apagados)
  // o.lentes: anteojos de sol (vacaciones). clases: .lab-k .lab-k-cabeza .lab-k-boca .lab-k-ojos .lab-k-brillo
  function criatura(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const prendidos = o.ojos !== false;
    const ojoC = prendidos ? VER : INK;
    const ojos = cara === "dormida" ? `<path d="M-70 -346 Q-50 -334 -30 -346 M70 -346 Q50 -334 30 -346" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path d="M-70 -342 Q-50 -364 -30 -342 M70 -342 Q50 -364 30 -342" fill="none" stroke="${prendidos ? VER3 : INK}" stroke-width="10" stroke-linecap="round"/>`
      : `<g class="lab-k-brillo">${prendidos ? `<circle cx="-50" cy="-348" r="28" fill="${VER}" opacity="0.35"/><circle cx="50" cy="-348" r="28" fill="${VER}" opacity="0.35"/>` : ""}</g>
         <ellipse cx="-50" cy="-348" rx="17" ry="${cara === "cansada" ? 9 : 15}" fill="${ojoC}" stroke="${INK}" stroke-width="5"/><ellipse cx="50" cy="-348" rx="17" ry="${cara === "cansada" ? 9 : 15}" fill="${ojoC}" stroke="${INK}" stroke-width="5"/>
         ${prendidos ? `<circle cx="-50" cy="-348" r="5" fill="#ffffff"/><circle cx="50" cy="-348" r="5" fill="#ffffff"/>` : ""}
         ${cara === "cansada" ? `<path d="M-74 -362 L-26 -360 M74 -362 L26 -360" stroke="${MON2}" stroke-width="12" stroke-linecap="round"/>` : ""}`;
    const cejas = cara === "malvada" ? "M-80 -392 L-26 -372 M80 -392 L26 -372" : cara === "triste" ? "M-76 -374 L-28 -392 M76 -374 L28 -392" : "M-78 -386 L-26 -386 M78 -386 L26 -386";
    const boca = cara === "malvada" ? `<path class="lab-k-boca" d="M-40 -270 Q10 -250 46 -282" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path class="lab-k-boca" d="M-40 -280 Q0 -238 40 -280 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "triste" ? `<path class="lab-k-boca" d="M-28 -256 Q0 -276 28 -256" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<path class="lab-k-boca" d="M-30 -266 L30 -266" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    const delantal = o.delantal === false ? "" : `<path d="M-150 40 L-138 -120 Q0 -96 138 -120 L150 40 Z" fill="${HUE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-138 -120 L-90 -215 M138 -120 L90 -215" stroke="${INK}" stroke-width="8"/>
      <text data-layout-ignore x="0" y="-40" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="30" fill="${GRA2}" letter-spacing="2">ALMACÉN</text>`;
    const lentes = o.lentes ? `<path d="M-92 -360 L92 -360" stroke="${INK}" stroke-width="10"/><rect x="-92" y="-376" width="78" height="50" rx="18" fill="${INK}"/><rect x="14" y="-376" width="78" height="50" rx="18" fill="${INK}"/><path d="M-80 -364 L-60 -364 M26 -364 L46 -364" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.6"/>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="lab-k">
      <!-- campera negra con hombros anchos -->
      <path d="M-270 40 C-270 -120 -210 -210 -90 -228 L90 -228 C210 -210 270 -120 270 40 Z" fill="${GRA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 -150 L-150 -120 M200 -150 L150 -120" stroke="${GRA2}" stroke-width="8" stroke-linecap="round"/>
      ${delantal}
      <path d="M-48 -275 L-52 -212 L52 -212 L48 -275 Z" fill="${MON2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-30 -240 L30 -240 M-20 -250 L-20 -230 M0 -250 L0 -230 M20 -250 L20 -230" stroke="${INK}" stroke-width="4"/>
      <g class="lab-k-cabeza">
        <!-- electrodos en las sienes -->
        <rect x="-150" y="-370" width="40" height="34" rx="6" fill="${PLA}" stroke="${INK}" stroke-width="6"/>
        <rect x="110" y="-370" width="40" height="34" rx="6" fill="${PLA}" stroke="${INK}" stroke-width="6"/>
        <path d="M-118 -380 C-120 -460 -110 -500 -100 -505 L100 -505 C110 -500 120 -460 118 -380 L112 -305 C102 -248 60 -224 0 -224 C-60 -224 -102 -248 -112 -305 Z" fill="${MON}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <!-- pelo chato -->
        <path d="M-118 -440 L-100 -505 L100 -505 L118 -440 L80 -452 L60 -436 L30 -452 L0 -436 L-30 -452 L-60 -436 L-90 -452 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <!-- costura de la frente -->
        <path d="M-80 -418 L80 -418" stroke="${INK}" stroke-width="5"/>
        <path d="M-64 -430 L-64 -406 M-32 -430 L-32 -406 M0 -430 L0 -406 M32 -430 L32 -406 M64 -430 L64 -406" stroke="${INK}" stroke-width="4"/>
        <path d="M88 -320 L60 -282" stroke="${INK}" stroke-width="4"/><path d="M68 -310 L82 -300 M76 -298 L64 -290" stroke="${INK}" stroke-width="3"/>
        <path class="lab-k-cejas" d="${cejas}" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <g class="lab-k-ojos">${ojos}</g>
        ${cara === "cansada" ? `<path d="M-76 -322 Q-50 -306 -24 -322 M76 -322 Q50 -306 24 -322" fill="none" stroke="${MON2}" stroke-width="9" stroke-linecap="round"/>` : ""}
        ${lentes}
        <path d="M0 -340 C-12 -308 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="${GRA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
      </g>
    </g></g>`;
  }

  // PLANILLA: esquina (x, y), ancho w, filas = [[col1, col2, col3], ...] con encabezado. Cada fila .lab-pl-f<i>
  // (i desde 0 = primera fila de datos) y su texto .lab-pl-t<i>. o.nums: número de la primera fila (default 1).
  function planilla(x, y, w, filas, o) {
    o = o || {};
    const fh = o.fh || 64, cols = o.cols || [0.45, 0.55], n0 = o.nums ?? 1, enc = o.enc || ["#", "CLIENTE", "PEDIDO"];
    const cx = [x + 70];
    let acc = x + 70;
    cols.forEach((c) => { acc += c * (w - 70); cx.push(acc); });
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${fh * (filas.length + 1) + 8}" rx="10" fill="${HUE}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x}" y="${y}" width="${w}" height="${fh}" rx="10" fill="${GRA}" stroke="${INK}" stroke-width="8"/>`;
    enc.forEach((e, i) => { s += i === 0 ? `<text data-layout-ignore x="${x + 37}" y="${y + fh * 0.64}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.36}" fill="${VER2}">${e}</text>`
      : `<text data-layout-ignore x="${cx[i - 1] + 14}" y="${y + fh * 0.64}" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.36}" fill="${VER2}" letter-spacing="2">${e}</text>`; });
    filas.forEach((f, i) => {
      const yy = y + fh * (i + 1);
      s += `<g class="lab-pl-f lab-pl-f${i}"><rect class="lab-pl-bg" x="${x + 4}" y="${yy}" width="${w - 8}" height="${fh}" fill="${i % 2 ? HUE2 : HUE}" opacity="0.9"/>
        <rect x="${x + 4}" y="${yy}" width="66" height="${fh}" fill="${PLA2}"/>
        <text data-layout-ignore x="${x + 37}" y="${yy + fh * 0.64}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.34}" fill="${INK}">${n0 + i}</text>
        <g class="lab-pl-t lab-pl-t${i}">${f.map((c, k) => `<text data-layout-ignore x="${cx[k] + 14}" y="${yy + fh * 0.66}" font-family="Lexend" font-weight="600" font-size="${fh * 0.4}" fill="${INK}">${c}</text>`).join("")}</g>
        <path d="M${x + 4} ${yy + fh} L${x + w - 4} ${yy + fh}" stroke="${PLA}" stroke-width="2"/></g>`;
    });
    cx.slice(0, -1).forEach((c) => { s += `<path d="M${c} ${y + 4} L${c} ${y + fh * (filas.length + 1) + 4}" stroke="${PLA}" stroke-width="2"/>`; });
    return `<g class="lab-pl ${o.cls || ""}">${s}</g>`;
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
  function chatCabecera(x, y, w, nombre, sub) {
    return `<rect x="${x}" y="${y}" width="${w}" height="112" fill="${GRA}"/>
      <circle cx="${x + 58}" cy="${y + 68}" r="26" fill="${HUE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 100}" y="${y + 66}" font-family="Lexend" font-weight="700" font-size="28" fill="${HUE}">${nombre}</text>
      <text x="${x + 100}" y="${y + 96}" font-family="IBM Plex Mono" font-weight="600" font-size="19" fill="${VER2}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho].
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 32, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 30;
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d9f5c4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 15 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="20" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}</g>`, alto, ancho];
  }

  // RELOJ de pared: centro (x, y), radio r, hora h, minutos m. Agujas .lab-rj-h .lab-rj-m (rotar con svgOrigin "x y").
  function reloj(x, y, r, h, m) {
    let marcas = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      marcas += `<line x1="${x + Math.sin(a) * r * 0.76}" y1="${y - Math.cos(a) * r * 0.76}" x2="${x + Math.sin(a) * r * 0.9}" y2="${y - Math.cos(a) * r * 0.9}" stroke="${INK}" stroke-width="${k % 3 ? 4 : 9}" stroke-linecap="round"/>`;
    }
    const ah = ((h % 12) + m / 60) * 30, am = m * 6;
    return `<g class="lab-rj">
      <circle cx="${x}" cy="${y}" r="${r + 14}" fill="${GRA}" stroke="${INK}" stroke-width="8"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${HUE}" stroke="${INK}" stroke-width="6"/>
      ${marcas}
      <line class="lab-rj-h" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.5}" stroke="${INK}" stroke-width="12" stroke-linecap="round" transform="rotate(${ah} ${x} ${y})"/>
      <line class="lab-rj-m" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.74}" stroke="${ROJ}" stroke-width="7" stroke-linecap="round" transform="rotate(${am} ${x} ${y})"/>
      <circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>
    </g>`;
  }

  // TECLA de teclado: centro (x, y), lado l, texto
  function tecla(x, y, l, txt, o) {
    o = o || {};
    return `<g class="lab-tecla ${o.cls || ""}">
      <rect x="${x - l / 2}" y="${y - l / 2 + 14}" width="${l}" height="${l}" rx="${l * 0.16}" fill="${INK}"/>
      <rect x="${x - l / 2}" y="${y - l / 2}" width="${l}" height="${l}" rx="${l * 0.16}" fill="${o.fill || HUE}" stroke="${INK}" stroke-width="7"/>
      <text data-layout-ignore x="${x}" y="${y + l * 0.16}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${l * (txt.length > 2 ? 0.26 : 0.46)}" fill="${INK}">${txt}</text>
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
    // un rayo: aparece de golpe, titila y se va
    function chispazo(sel, t, d) {
      const els = typeof sel === "string" ? qa(sel) : [sel];
      els.forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, t);
        tl.to(el, { opacity: 1, duration: 0.01 }, t + 0.31);
        tl.to(el, { opacity: 0, duration: 0.18 }, t + (d || 0.6));
      });
    }
    // la boca se abre y cierra
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // respirar / temblar: leve balanceo continuo de un grupo (y), sin repeat infinito
    function flotar(el, t, d, amp, per) {
      const p = per || 0.8, n = Math.max(1, Math.floor(d / p));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 8), duration: p / 2, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, chispazo, hablar, flotar, salida };
  }
  return { INK, GRA, GRA2, PLA, PLA2, HUE, HUE2, VER, VER2, VER3, ROJ, ROJ2, PIEL, PIEL2, MON, MON2, azar, rayo, bobina, mesa, palanca, ventana, frascos,
    cientifico, criatura, planilla, celular, celularBorde, chatCabecera, globo, reloj, tecla, kit };
})();
