// Piezas del reel "cuenta-cartas": la crupier, el dueño (vos), el de enfrente, los naipes con caras de
// clientes, fichas, el borde de la mesa, globos, nube de pensamiento, celular y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = CC.crupier(x, y, s) + ...
// y en el script: const K = CC.kit(tl, root).
window.CC = window.CC || (function () {
  const INK = "#070b10", PANO = "#0e4a55", PANO2 = "#082f37", PANO3 = "#136070", PANO4 = "#2a8a99",
    MAG = "#ff2e88", MAG2 = "#ff4fa0", MAG3 = "#a3125a", ORO = "#f2c14e", ORO2 = "#b8862b", CRE = "#f5efe0", CRE2 = "#e3d9c2",
    ROJO = "#d62839", PIEL = "#f0c8a0", PIEL2 = "#e0ad86", VERDE = "#5ce611", VERDE2 = "#3f9e0b", GRIS = "#8a8f96";
  if (!document.getElementById("cc-css")) {
    const st = document.createElement("style");
    st.id = "cc-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.cc-neon { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #fff1f8; white-space: nowrap; text-align: center; line-height: 1;
  text-shadow: 0 0 6px ${MAG2}, 0 0 18px ${MAG}, 0 0 38px ${MAG}, 0 0 70px rgba(255, 46, 136, 0.6); letter-spacing: 0.01em; }
.cc-neon.oro { color: #fff6dc; text-shadow: 0 0 6px ${ORO}, 0 0 18px ${ORO}, 0 0 38px ${ORO2}, 0 0 70px rgba(242, 193, 78, 0.5); }
.cc-neon.verde { color: #eaffdc; text-shadow: 0 0 6px ${VERDE}, 0 0 18px ${VERDE}, 0 0 40px ${VERDE2}; }
.cc-titulo { position: absolute; font-family: "Cinzel", serif; font-weight: 900; color: ${ORO}; white-space: nowrap; text-align: center; line-height: 1;
  text-shadow: 0 5px 0 ${INK}, 0 0 30px rgba(242, 193, 78, 0.35); letter-spacing: 0.04em; }
.cc-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${MAG}; border-radius: 14px; color: ${MAG};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(7, 11, 16, 0.92);
  box-shadow: 0 0 24px rgba(255, 46, 136, 0.45); }
.cc-sello.oro { border-color: ${ORO}; color: ${ORO}; box-shadow: 0 0 24px rgba(242, 193, 78, 0.35); }
.cc-sello.rojo { border-color: ${ROJO}; color: ${ROJO}; background: rgba(245, 239, 224, 0.95); box-shadow: none; }
.cc-sello.verde { border-color: ${VERDE}; color: ${VERDE}; box-shadow: 0 0 24px rgba(92, 230, 17, 0.4); }
.cc-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${ORO}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.45);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.14em; color: ${ORO}; white-space: nowrap; text-align: center; }
.cc-tag.mag { border-color: ${MAG}; color: ${MAG2}; }
.cc-tag.verde { border-color: ${VERDE}; color: ${VERDE}; }
.cc-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.45); }
.cc-globo.mag { background: ${MAG}; color: #fff; }
.cc-globo.pet { background: ${PANO4}; color: ${INK}; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // PALOS: centrados en 0 0, tamaño ~ 2s de alto
  function palo(p, x, y, s, color) {
    const c = color || (p === "c" || p === "d" ? ROJO : INK);
    const t = `translate(${x} ${y}) scale(${s / 14})`;
    if (p === "c") return `<path transform="${t}" d="M0 12 C-16 0 -15 -13 -7 -13 C-2 -13 0 -9 0 -7 C0 -9 2 -13 7 -13 C15 -13 16 0 0 12 Z" fill="${c}"/>`;
    if (p === "d") return `<path transform="${t}" d="M0 -14 L10 0 L0 14 L-10 0 Z" fill="${c}"/>`;
    if (p === "p") return `<path transform="${t}" d="M0 -13 C-16 -1 -15 9 -7 9 C-3 9 -1 6 -1 5 L-4 13 L4 13 L1 5 C1 6 3 9 7 9 C15 9 16 -1 0 -13 Z" fill="${c}"/>`;
    return `<g transform="${t}" fill="${c}"><circle cx="0" cy="-7" r="6"/><circle cx="-7" cy="3" r="6"/><circle cx="7" cy="3" r="6"/><path d="M-1 3 L-4 13 L4 13 L1 3 Z"/></g>`;
  }

  // RETRATO de cliente dentro del naipe: centro (0, 0), ancho aprox w. tipo: senora | muchacho | nadie | gonzalo
  function retrato(tipo, w) {
    const s = w / 200;
    const g = (inner) => `<g transform="scale(${s})">${inner}</g>`;
    const hombros = (col) => `<path d="M-88 100 C-86 40 -50 20 0 20 C50 20 86 40 88 100 Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    const cara = `<ellipse cx="0" cy="-30" rx="48" ry="56" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>`;
    const ojos = `<circle cx="-18" cy="-34" r="6" fill="${INK}"/><circle cx="18" cy="-34" r="6" fill="${INK}"/>`;
    if (tipo === "nadie") return g(`${hombros("#2b333c")}<ellipse cx="0" cy="-30" rx="48" ry="56" fill="#2b333c" stroke="${INK}" stroke-width="6"/>
      <text x="0" y="-2" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="80" fill="${CRE}">?</text>`);
    if (tipo === "senora") return g(`${hombros(MAG3)}
      <path d="M-26 20 Q0 44 26 20" fill="none" stroke="${ORO}" stroke-width="6"/>
      ${[[-50, -60], [-56, -30], [-48, -84], [-26, -98], [0, -104], [26, -98], [48, -84], [56, -30], [50, -60]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="20" fill="#c9c4bd" stroke="${INK}" stroke-width="5"/>`).join("")}
      ${cara}${ojos}
      <circle cx="-18" cy="-34" r="15" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="18" cy="-34" r="15" fill="none" stroke="${INK}" stroke-width="4"/><path d="M-3 -34 L3 -34" stroke="${INK}" stroke-width="4"/>
      <path d="M-14 -4 Q0 6 14 -4" fill="none" stroke="${ROJO}" stroke-width="6" stroke-linecap="round"/>`);
    if (tipo === "muchacho") return g(`${hombros(PANO3)}${cara}
      <path d="M-50 -46 C-60 -100 -10 -120 30 -108 C60 -100 64 -70 52 -50 C40 -76 10 -84 -20 -74 C-30 -66 -42 -56 -50 -46 Z" fill="#3a2616" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      ${ojos}<path d="M-14 -6 Q0 2 14 -6" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`);
    // gonzalo: pelo corto y barba
    return g(`${hombros(ORO2)}${cara}
      <path d="M-48 -50 C-50 -96 50 -96 48 -50 C40 -70 -40 -70 -48 -50 Z" fill="${INK}" stroke="${INK}" stroke-width="5"/>
      <path d="M-46 -24 C-44 22 -20 26 0 26 C20 26 44 22 46 -24 C34 0 20 -4 0 -4 C-20 -4 -34 0 -46 -24 Z" fill="#3b2b20" stroke="${INK}" stroke-width="4"/>
      ${ojos}<path d="M-12 6 L12 6" stroke="${PIEL}" stroke-width="5" stroke-linecap="round"/>`);
  }

  // NAIPE francés centrado en (x, y), ancho w (alto 1.42w). o.valor, o.palo (c d p t), o.cara (retrato), o.texto (rótulo abajo),
  // o.dorso (true: solo el dorso), o.doble (dorso + frente apilados para voltear: .cc-dorso y .cc-frente), o.rot, o.cls, o.marca (borde)
  function naipe(x, y, w, o) {
    o = o || {};
    const h = Math.round(w * 1.42), x0 = -w / 2, y0 = -h / 2, r = w * 0.08, sw = Math.max(4, w * 0.03);
    const dorso = () => {
      let rombos = "";
      const n = 5, m = 7;
      for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) {
        const cx = x0 + w * 0.14 + (i + 0.5) * ((w * 0.72) / n), cy = y0 + h * 0.1 + (j + 0.5) * ((h * 0.8) / m), d = w * 0.06;
        rombos += `<path d="M${cx} ${cy - d} L${cx + d} ${cy} L${cx} ${cy + d} L${cx - d} ${cy} Z" fill="${(i + j) % 2 ? MAG : MAG3}"/>`;
      }
      return `<g class="cc-dorso"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${r}" fill="${PANO2}" stroke="${INK}" stroke-width="${sw}"/>
        <rect x="${x0 + w * 0.08}" y="${y0 + w * 0.08}" width="${w * 0.84}" height="${h - w * 0.16}" rx="${r * 0.6}" fill="${PANO2}" stroke="${ORO}" stroke-width="${sw * 0.8}"/>
        ${rombos}
        <circle cx="0" cy="0" r="${w * 0.17}" fill="${INK}" stroke="${ORO}" stroke-width="${sw * 0.8}"/>
        <text data-layout-ignore x="0" y="${w * 0.07}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="${w * 0.19}" fill="${ORO}">21</text></g>`;
    };
    const frente = () => {
      const val = o.valor || "A", p = o.palo || "c";
      const col = p === "c" || p === "d" ? ROJO : INK;
      const fs = w * 0.2;
      const esquina = (rot) => `<g transform="rotate(${rot})">
          <text data-layout-ignore x="${x0 + w * 0.13}" y="${y0 + fs * 1.05}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${fs}" fill="${col}">${val}</text>
          ${palo(p, x0 + w * 0.13, y0 + fs * 1.55, fs * 0.36, col)}</g>`;
      const centro = o.cara
        ? `<g><rect x="${x0 + w * 0.22}" y="${y0 + h * 0.16}" width="${w * 0.56}" height="${h * 0.46}" rx="${r * 0.6}" fill="${CRE2}" stroke="${col}" stroke-width="${sw * 0.7}"/>
            <clipPath id="cc-clip-${o.id || o.cara}-${Math.round(x)}-${Math.round(y)}"><rect x="${x0 + w * 0.22}" y="${y0 + h * 0.16}" width="${w * 0.56}" height="${h * 0.46}" rx="${r * 0.6}"/></clipPath>
            <g clip-path="url(#cc-clip-${o.id || o.cara}-${Math.round(x)}-${Math.round(y)})"><g transform="translate(0 ${y0 + h * 0.41})">${retrato(o.cara, w * 0.5)}</g></g>
            <rect x="${x0 + w * 0.22}" y="${y0 + h * 0.16}" width="${w * 0.56}" height="${h * 0.46}" rx="${r * 0.6}" fill="none" stroke="${col}" stroke-width="${sw * 0.7}"/></g>`
        : palo(p, 0, -h * 0.05, w * 0.22, col);
      const texto = o.texto ? (Array.isArray(o.texto) ? o.texto : [o.texto]).map((t, i) =>
        `<text data-layout-ignore x="0" y="${y0 + h * 0.735 + i * w * 0.1}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${w * 0.078}" fill="${INK}" letter-spacing="1">${t}</text>`).join("") : "";
      return `<g class="cc-frente"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${r}" fill="${CRE}" stroke="${o.marca || INK}" stroke-width="${o.marca ? sw * 1.6 : sw}"/>
        ${esquina(0)}${esquina(180)}${centro}${texto}</g>`;
    };
    const cuerpo = o.dorso ? dorso() : o.doble ? dorso() + frente() : frente();
    return `<g class="cc-naipe ${o.cls || ""}" transform="translate(${x} ${y}) rotate(${o.rot || 0})">
      <rect x="${x0 + 8}" y="${y0 + 10}" width="${w}" height="${h}" rx="${r}" fill="#000" opacity="0.35"/>${cuerpo}</g>`;
  }

  // FICHA de casino (vista de arriba) centro (x, y), radio r, color
  function ficha(x, y, r, color, o) {
    o = o || {};
    const c = color || MAG;
    let marcas = "";
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      marcas += `<rect x="${-r * 0.12}" y="${-r * 0.98}" width="${r * 0.24}" height="${r * 0.26}" fill="${CRE}" transform="rotate(${(a * 180) / Math.PI})"/>`;
    }
    return `<g class="cc-ficha ${o.cls || ""}" transform="translate(${x} ${y})">
      <circle r="${r}" fill="${c}" stroke="${INK}" stroke-width="${Math.max(3, r * 0.08)}"/>${marcas}
      <circle r="${r * 0.62}" fill="none" stroke="${CRE}" stroke-width="${r * 0.06}" stroke-dasharray="${r * 0.2} ${r * 0.14}"/>
      ${o.txt ? `<text data-layout-ignore y="${r * 0.18}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${r * 0.5}" fill="${CRE}">${o.txt}</text>` : ""}</g>`;
  }
  // PILA de fichas de perfil: base (x, y), n fichas, ancho w
  function pila(x, y, n, w, color, o) {
    o = o || {};
    const h = w * 0.16;
    let s = "";
    for (let k = 0; k < n; k++) {
      const yy = y - k * h;
      s += `<g class="cc-pf"><path d="M${x - w / 2} ${yy - h} L${x - w / 2} ${yy} A${w / 2} ${h * 0.6} 0 0 0 ${x + w / 2} ${yy} L${x + w / 2} ${yy - h} Z" fill="${k % 2 ? color : CRE}" stroke="${INK}" stroke-width="4"/>
        <ellipse cx="${x}" cy="${yy - h}" rx="${w / 2}" ry="${h * 0.6}" fill="${color}" stroke="${INK}" stroke-width="4"/></g>`;
    }
    return `<g class="cc-pila ${o.cls || ""}">${s}</g>`;
  }

  // BORDE DE LA MESA (al frente de los personajes): paño azul petróleo con riel dorado desde y0 hasta abajo.
  function mesa(y0, o) {
    o = o || {};
    const y = y0 || 1430;
    return `<g class="cc-mesa ${o.cls || ""}">
      <path d="M-200 ${y + 150} Q540 ${y - 60} 1280 ${y + 150} L1280 2000 L-200 2000 Z" fill="${PANO}" stroke="${INK}" stroke-width="10"/>
      <path d="M-200 ${y + 150} Q540 ${y - 60} 1280 ${y + 150}" fill="none" stroke="${ORO2}" stroke-width="22"/>
      <path d="M-200 ${y + 143} Q540 ${y - 67} 1280 ${y + 143}" fill="none" stroke="${ORO}" stroke-width="6"/>
      <path d="M-120 ${y + 260} Q540 ${y + 70} 1200 ${y + 260}" fill="none" stroke="${ORO}" stroke-width="4" opacity="0.55" stroke-dasharray="18 12"/>
      ${o.texto !== false ? `<text data-layout-ignore x="540" y="${y + 120}" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="28" fill="${ORO}" opacity="0.7" letter-spacing="6">${o.texto || "LA CASA SIEMPRE GANA"}</text>` : ""}
    </g>`;
  }

  // LA CRUPIER: busto, origen = base del torso. Cabeza en (0,-350). o.cara: "neutra" | "ceja" | "sonrisa"; o.carta: mano derecha con un naipe.
  // clases: .cc-k .cc-k-cabeza .cc-k-boca .cc-k-cejas .cc-k-ojos .cc-k-brazo (hombro 150 -190) .cc-k-carta
  function crupier(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const cejas = cara === "ceja" ? "M-72 -392 Q-50 -410 -26 -398 M72 -380 L26 -386" : "M-72 -386 Q-50 -398 -26 -390 M72 -386 Q50 -398 26 -390";
    const boca = cara === "sonrisa"
      ? `<path class="cc-k-boca" d="M-34 -270 Q0 -236 34 -270 Q0 -258 -34 -270 Z" fill="${ROJO}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
      : `<path class="cc-k-boca" d="M-28 -266 Q-6 -276 0 -270 Q8 -276 30 -270 Q6 -252 -28 -266 Z" fill="${ROJO}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    const brazo = o.carta ? `<g class="cc-k-brazo">
        <path d="M150 -190 C210 -170 240 -110 230 -40" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C210 -170 240 -110 230 -40" fill="none" stroke="${CRE}" stroke-width="50" stroke-linecap="round"/>
        <g class="cc-k-carta">${naipe(250, -130, 110, { dorso: true, rot: -14 })}</g>
        <circle cx="230" cy="-40" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="cc-k">
      <circle cx="0" cy="-478" r="56" fill="#1a1014" stroke="${INK}" stroke-width="7"/>
      <path d="M-30 -478 Q0 -500 30 -478" fill="none" stroke="${MAG}" stroke-width="7" stroke-linecap="round"/>
      <!-- camisa blanca, chaleco negro -->
      <path d="M-220 30 C-222 -110 -190 -192 -100 -214 L100 -214 C190 -192 222 -110 220 30 Z" fill="#141a22" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-74 -214 L0 -60 L74 -214 Z" fill="${CRE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-220 30 C-222 -110 -190 -192 -150 -205 L-150 30 Z M220 30 C222 -110 190 -192 150 -205 L150 30 Z" fill="${CRE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <circle cx="0" cy="-40" r="7" fill="${ORO}" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="-5" r="7" fill="${ORO}" stroke="${INK}" stroke-width="3"/>
      <rect x="-128" y="-140" width="90" height="34" rx="6" fill="${ORO}" stroke="${INK}" stroke-width="4"/>
      <text data-layout-ignore x="-83" y="-116" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="17" fill="${INK}">CRUPIER</text>
      <path d="M-36 -262 L-40 -208 L40 -208 L36 -262 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <!-- moño magenta -->
      <path d="M0 -206 L-46 -230 L-46 -182 Z M0 -206 L46 -230 L46 -182 Z" fill="${MAG}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="0" cy="-206" r="11" fill="${MAG3}" stroke="${INK}" stroke-width="5"/>
      <g class="cc-k-cabeza">
        <path d="M-98 -380 C-102 -470 102 -470 98 -380 L94 -310 C88 -250 48 -228 0 -228 C-48 -228 -88 -250 -94 -310 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- pelo tirante hacia atrás con raya al costado -->
        <path d="M-104 -350 C-118 -460 -40 -500 20 -496 C90 -492 124 -440 104 -350 C96 -400 70 -430 30 -440 C0 -420 -60 -410 -104 -350 Z" fill="#1a1014" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="-102" cy="-300" r="10" fill="${ORO}" stroke="${INK}" stroke-width="4"/><circle cx="102" cy="-300" r="10" fill="${ORO}" stroke="${INK}" stroke-width="4"/>
        <path class="cc-k-cejas" d="${cejas}" fill="none" stroke="#1a1014" stroke-width="9" stroke-linecap="round"/>
        <g class="cc-k-ojos">
          <path d="M-66 -350 Q-46 -366 -26 -350 Q-46 -340 -66 -350 Z M66 -350 Q46 -366 26 -350 Q46 -340 66 -350 Z" fill="${INK}"/>
          <path d="M-70 -356 L-80 -364 M70 -356 L80 -364" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
          <circle cx="-42" cy="-354" r="3.5" fill="#fff"/><circle cx="50" cy="-354" r="3.5" fill="#fff"/>
        </g>
        <path d="M0 -342 C-8 -316 -14 -306 2 -300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
      </g>
      ${brazo}
    </g></g>`;
  }

  // EL DUEÑO (vos): busto, origen = base del torso. Cabeza en (0,-360).
  // o.cara: "neutra" | "confiado" | "duda" | "sorpresa" | "culpa"; o.dedo: mano en la sien ("la tengo en la cabeza").
  // clases: .cc-d .cc-d-cabeza .cc-d-boca .cc-d-cejas .cc-d-ojos .cc-d-brazo .cc-d-gota
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "confiado" ? `<path d="M-70 -346 Q-50 -362 -30 -346 M70 -346 Q50 -362 30 -346" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "sorpresa" ? `<circle cx="-50" cy="-350" r="16" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="50" cy="-350" r="16" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-50" cy="-350" r="7" fill="${INK}"/><circle cx="50" cy="-350" r="7" fill="${INK}"/>`
      : `<circle cx="-50" cy="-350" r="11" fill="${INK}"/><circle cx="50" cy="-350" r="11" fill="${INK}"/>`;
    const cejas = cara === "duda" ? "M-76 -396 Q-54 -410 -30 -396 M76 -380 L30 -388" : cara === "culpa" ? "M-76 -376 L-30 -392 M76 -376 L30 -392" : cara === "sorpresa" ? "M-76 -398 Q-54 -414 -30 -400 M76 -398 Q54 -414 30 -400" : "M-76 -386 L-30 -392 M76 -386 L30 -392";
    const boca = cara === "confiado" ? `<path class="cc-d-boca" d="M-40 -276 Q0 -240 40 -276 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "sorpresa" ? `<ellipse class="cc-d-boca" cx="0" cy="-262" rx="18" ry="22" fill="#7a1420" stroke="${INK}" stroke-width="6"/>`
      : cara === "duda" ? `<path class="cc-d-boca" d="M-28 -264 Q-14 -276 0 -266 Q14 -256 28 -270" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "culpa" ? `<path class="cc-d-boca" d="M-26 -262 Q0 -276 26 -262" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="cc-d-boca" d="M-26 -268 Q0 -256 26 -268" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const brazo = o.dedo ? `<g class="cc-d-brazo">
        <path d="M-170 -190 C-240 -230 -250 -320 -150 -380" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M-170 -190 C-240 -230 -250 -320 -150 -380" fill="none" stroke="${ORO2}" stroke-width="52" stroke-linecap="round"/>
        <circle cx="-140" cy="-388" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M-124 -404 L-108 -420" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M-124 -404 L-108 -420" stroke="${PIEL}" stroke-width="12" stroke-linecap="round"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="cc-d">
      <!-- camisa crema y chaleco de lana dorado -->
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${CRE2}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 40 C-205 -90 -170 -170 -100 -200 L0 -40 L100 -200 C170 -170 205 -90 200 40 Z" fill="${ORO2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-70 -120 L-40 -70 M70 -120 L40 -70 M-110 -40 L-60 -20 M110 -40 L60 -20" stroke="${INK}" stroke-width="4" opacity="0.35"/>
      <circle cx="0" cy="0" r="7" fill="${CRE}" stroke="${INK}" stroke-width="3"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-46 -212 L0 -150 L46 -212" fill="none" stroke="${INK}" stroke-width="6"/>
      <g class="cc-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -425 C-132 -400 -130 -355 -110 -335 L-100 -335 L-98 -425 Z M112 -425 C132 -400 130 -355 110 -335 L100 -335 L98 -425 Z" fill="#8f8a84" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -478 Q0 -492 40 -480" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        <path class="cc-d-cejas" d="${cejas}" fill="none" stroke="#5e5852" stroke-width="13" stroke-linecap="round"/>
        <g class="cc-d-ojos">${ojos}</g>
        <path d="M0 -340 C-10 -312 -16 -300 4 -296" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- bigote -->
        <path d="M-56 -282 C-40 -306 -10 -300 0 -290 C10 -300 40 -306 56 -282 C40 -290 14 -286 0 -280 C-14 -286 -40 -290 -56 -282 Z" fill="#5e5852" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        ${boca}
        <path class="cc-d-gota" d="M96 -420 C86 -400 88 -386 100 -384 C112 -386 112 -402 96 -420 Z" fill="#9fd8e8" stroke="${INK}" stroke-width="4" opacity="${cara === "culpa" || cara === "duda" ? 1 : 0}"/>
      </g>
      ${brazo}
    </g></g>`;
  }

  // EL DE ENFRENTE: busto, origen = base del torso. Cabeza en (0,-350).
  // o.cara: "sobrador" | "guino" | "neutra"; o.libreta: mano con la libretita y la birome.
  // clases: .cc-f .cc-f-cabeza .cc-f-boca .cc-f-cejas .cc-f-ojos .cc-f-brazo .cc-f-libreta .cc-f-lapiz
  function enfrente(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "sobrador";
    const ojos = cara === "guino" ? `<path d="M-66 -350 Q-46 -340 -26 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="46" cy="-350" r="11" fill="${INK}"/>`
      : `<path d="M-64 -346 L-28 -346" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="-46" cy="-342" r="9" fill="${INK}"/><path d="M64 -346 L28 -346" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="46" cy="-342" r="9" fill="${INK}"/>`;
    const cejas = cara === "neutra" ? "M-72 -380 L-26 -384 M72 -380 L26 -384" : "M-72 -378 L-26 -384 M72 -392 Q50 -404 26 -390";
    const boca = cara === "neutra" ? `<path class="cc-f-boca" d="M-24 -266 L24 -266" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="cc-f-boca" d="M-30 -268 Q4 -262 34 -284 Q20 -252 -30 -268 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    const brazo = o.libreta ? `<g class="cc-f-brazo">
        <path d="M160 -190 C230 -160 240 -80 170 -40" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M160 -190 C230 -160 240 -80 170 -40" fill="none" stroke="${PANO4}" stroke-width="50" stroke-linecap="round"/>
        <g class="cc-f-libreta" transform="rotate(-10 120 -110)">
          <rect x="40" y="-200" width="170" height="210" rx="10" fill="${CRE}" stroke="${INK}" stroke-width="7"/>
          <rect x="40" y="-200" width="170" height="34" rx="8" fill="${MAG}" stroke="${INK}" stroke-width="6"/>
          <path d="M62 -136 L188 -136 M62 -106 L170 -106 M62 -76 L188 -76 M62 -46 L150 -46" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
        </g>
        <path class="cc-f-lapiz" d="M150 -30 L230 -150" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path class="cc-f-lapiz" d="M150 -30 L230 -150" stroke="${ORO}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="170" cy="-40" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="cc-f">
      <!-- campera petróleo con cuello y remera magenta -->
      <path d="M-230 40 C-232 -110 -180 -200 -84 -220 L84 -220 C180 -200 232 -110 230 40 Z" fill="${PANO4}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -220 L-20 40 L20 40 L70 -220 Z" fill="${MAG}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-84 -220 L-120 -150 L-60 -110 L-40 -200 Z M84 -220 L120 -150 L60 -110 L40 -200 Z" fill="${PANO3}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-14 -190 L-14 30" stroke="${INK}" stroke-width="3" opacity="0.4"/>
      <path d="M-38 -265 L-42 -208 L42 -208 L38 -265 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-30 -214 L0 -190 L30 -214" fill="none" stroke="${ORO}" stroke-width="5"/>
      <g class="cc-f-cabeza">
        <path d="M-98 -380 C-102 -470 102 -470 98 -380 L94 -310 C88 -248 48 -226 0 -226 C-48 -226 -88 -248 -94 -310 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- barba de tres días -->
        <path d="M-94 -320 C-88 -250 -48 -226 0 -226 C48 -226 88 -250 94 -320 C80 -290 50 -296 0 -296 C-50 -296 -80 -290 -94 -320 Z" fill="#3b2b20" opacity="0.35"/>
        <!-- jopo -->
        <path d="M-102 -360 C-130 -450 -60 -540 30 -530 C110 -522 140 -470 120 -420 C100 -440 70 -450 40 -446 C10 -430 -40 -420 -70 -400 C-84 -390 -96 -376 -102 -360 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -500 C0 -520 60 -515 90 -480" fill="none" stroke="#2b333c" stroke-width="8" stroke-linecap="round"/>
        <path class="cc-f-cejas" d="${cejas}" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
        <g class="cc-f-ojos">${ojos}</g>
        <path d="M0 -336 C-8 -310 -14 -300 2 -296" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
        ${o.palillo !== false ? `<path d="M30 -272 L96 -292" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M30 -272 L96 -292" stroke="${CRE2}" stroke-width="4" stroke-linecap="round"/>` : ""}
      </g>
      ${brazo}
    </g></g>`;
  }

  // NUBE DE PENSAMIENTO: centro (x, y), w x h, cola hacia (cx, cy). clase .cc-nube
  function nube(x, y, w, h, cx, cy, o) {
    o = o || {};
    const n = 10;
    let bultos = "";
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2;
      bultos += `<circle cx="${x + Math.cos(a) * w * 0.42}" cy="${y + Math.sin(a) * h * 0.36}" r="${Math.min(w, h) * 0.22}"/>`;
    }
    const cola = [0.25, 0.55, 0.8].map((f, i) => `<circle cx="${x + (cx - x) * (0.55 + f * 0.45)}" cy="${y + (cy - y) * (0.55 + f * 0.45)}" r="${22 - i * 6}" fill="${CRE}" stroke="${INK}" stroke-width="6"/>`).join("");
    return `<g class="cc-nube ${o.cls || ""}">${cola}
      <g fill="${INK}" transform="translate(0 0)">${bultos.replace(/r="([\d.]+)"/g, (m, r) => `r="${Number(r) + 6}"`)}<ellipse cx="${x}" cy="${y}" rx="${w * 0.46}" ry="${h * 0.4}"/></g>
      <g fill="${CRE}">${bultos}<ellipse cx="${x}" cy="${y}" rx="${w * 0.46}" ry="${h * 0.4}"/></g></g>`;
  }

  // CELULAR: rectángulo (x, y, w, h) con pantalla; devuelve el cuerpo (el contenido va aparte, encima)
  function celular(x, y, w, h, fondo) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || "#e9e4d8"}" stroke="${INK}" stroke-width="${Math.max(10, w * 0.04)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 14}" width="${w * 0.26}" height="12" rx="6" fill="${INK}"/>`;
  }
  // GLOBO de chat SVG: lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho].
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 34;
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d9f2e9" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}</g>`, alto, ancho];
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
    // neón que se prende titilando
    function neon(el, t) {
      gsap.set(el, { opacity: 0 });
      tl.to(el, { opacity: 1, duration: 0.04 }, t);
      tl.to(el, { opacity: 0.2, duration: 0.04 }, t + 0.07);
      tl.to(el, { opacity: 1, duration: 0.04 }, t + 0.13);
      tl.to(el, { opacity: 0.4, duration: 0.03 }, t + 0.22);
      tl.to(el, { opacity: 1, duration: 0.05 }, t + 0.27);
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
    // un naipe llega deslizando desde (dx, dy) relativos, girando
    function repartir(el, t, dx, dy, rot, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, x: dx, y: dy, rotation: rot || 0 }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: d || 0.4, ease: "power3.out", immediateRender: false }, t);
    }
    // voltea un naipe doble (dorso -> frente) en t
    function voltear(el, t, d) {
      const dor = el.querySelector(".cc-dorso"), fre = el.querySelector(".cc-frente");
      d = d || 0.32;
      origen(dor, "0 0"); origen(fre, "0 0");
      gsap.set(fre, { scaleX: 0 });
      tl.to(dor, { scaleX: 0, duration: d / 2, ease: "power2.in" }, t);
      tl.fromTo(fre, { scaleX: 0 }, { scaleX: 1, duration: d / 2, ease: "power2.out", immediateRender: false }, t + d / 2);
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    function respirar(el, t, d, a) {
      tl.fromTo(el, { y: 0 }, { y: -(a || 8), duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((d || 3) / 0.9)), ease: "sine.inOut", immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, neon, sacudon, dibujar, repartir, voltear, hablar, respirar, salida };
  }
  return { INK, PANO, PANO2, PANO3, PANO4, MAG, MAG2, MAG3, ORO, ORO2, CRE, CRE2, ROJO, PIEL, PIEL2, VERDE, VERDE2, GRIS, azar, palo, retrato, naipe, ficha, pila, mesa,
    crupier, dueno, enfrente, nube, celular, globo, kit };
})();
