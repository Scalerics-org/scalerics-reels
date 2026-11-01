// Piezas del reel "la-quiniela": el bolillero, las bolillas, el tablero de números, la locutora,
// la clienta, el dueño, el celular con chat, sellos y helpers de animación.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = SO.locutora(x, y, s) + ...
// y en el script: const K = SO.kit(tl, root).
window.SO = window.SO || (function () {
  const INK = "#14100c", PANO = "#0f3b2a", PANO2 = "#17553c", PANO3 = "#2f7a55", ORO = "#e8b923", ORO2 = "#ffd65a", ORO3 = "#a87d12",
    CRE = "#f4ead2", CRE2 = "#e4d6b4", ROJO = "#d7263d", ROJO2 = "#ff5d6c", PIEL = "#f0c8a0", PIEL2 = "#e0ad86", VERDE = "#5ce611", VERDE2 = "#3f9e0b";
  if (!document.getElementById("so-css")) {
    const st = document.createElement("style");
    st.id = "so-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.so-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROJO}; border-radius: 14px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(244, 234, 210, 0.94); }
.so-sello.oro { border-color: ${ORO3}; color: ${ORO3}; }
.so-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.so-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${ORO}; border-radius: 10px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.35);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${ORO2}; white-space: nowrap; text-align: center; }
.so-tag.rojo { background: ${ROJO}; border-color: ${CRE}; color: ${CRE}; }
.so-tag.verde { background: ${VERDE2}; border-color: ${CRE}; color: ${CRE}; }
.so-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${ORO2}; white-space: nowrap; text-align: center; line-height: 0.95;
  text-shadow: 0 6px 0 ${ORO3}, 0 10px 18px rgba(0, 0, 0, 0.5); letter-spacing: -0.01em; }
.so-globo { position: absolute; box-sizing: border-box; padding: 16px 28px; background: ${CRE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  // pseudoazar determinista
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // BOLILLA numerada: centro (x, y), radio r. o.color: "cre" (default) | "oro" | "rojo" | "verde"; o.cls clase extra
  function bolilla(n, x, y, r, o) {
    o = o || {};
    const fill = { cre: CRE, oro: ORO2, rojo: ROJO2, verde: VERDE }[o.color || "cre"];
    const sombra = { cre: CRE2, oro: ORO, rojo: ROJO, verde: VERDE2 }[o.color || "cre"];
    const txt = String(n).padStart(2, "0");
    const sw = Math.max(3, r * 0.07);
    return `<g class="so-bolilla ${o.cls || ""}" transform="translate(${x} ${y})">
      <circle r="${r}" fill="${fill}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M${-r * 0.92} ${r * 0.3} A${r} ${r} 0 0 0 ${r * 0.92} ${r * 0.3} A${r * 1.1} ${r * 0.9} 0 0 1 ${-r * 0.92} ${r * 0.3} Z" fill="${sombra}"/>
      <circle r="${r * 0.62}" fill="none" stroke="${INK}" stroke-width="${sw * 0.6}" opacity="0.35"/>
      <text data-layout-ignore y="${r * 0.27}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${r * 0.8}" fill="${INK}" letter-spacing="-0.02em">${txt}</text>
      <path d="M${-r * 0.55} ${-r * 0.55} A${r * 0.78} ${r * 0.78} 0 0 1 ${-r * 0.05} ${-r * 0.78}" fill="none" stroke="#ffffff" stroke-width="${r * 0.11}" stroke-linecap="round" opacity="0.75"/>
    </g>`;
  }

  // BOLILLERO de vidrio: centro de la esfera (x, y), radio r. Clases: .so-bo (todo) .so-bo-giro (bolillas
  // de adentro, rotar con svgOrigin "x y") .so-bo-manija (manija, rotar en "x+r+60 y") .so-bo-vidrio .so-bo-boca (salida)
  function bolillero(x, y, r, o) {
    o = o || {};
    const rnd = azar(o.seed || 7);
    let adentro = "";
    const nums = [12, 31, 5, 66, 89, 40, 17, 3, 72, 55, 28, 94, 61, 9, 36, 80];
    nums.forEach((n, i) => {
      const ang = (i / nums.length) * Math.PI * 2 + rnd() * 0.3;
      const rr = r * (0.35 + rnd() * 0.42);
      const bx = x + Math.cos(ang) * rr, by = y + Math.sin(ang) * rr;
      adentro += bolilla(n, Math.round(bx), Math.round(by), Math.round(r * 0.14), { color: i % 5 === 0 ? "oro" : "cre" });
    });
    const mx = x + r + 70;
    return `<g class="so-bo">
      <!-- patas doradas y base -->
      <path d="M${x - r * 0.75} ${y + r * 1.55} L${x - r * 0.35} ${y + r * 0.8} M${x + r * 0.75} ${y + r * 1.55} L${x + r * 0.35} ${y + r * 0.8}" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
      <path d="M${x - r * 0.75} ${y + r * 1.55} L${x - r * 0.35} ${y + r * 0.8} M${x + r * 0.75} ${y + r * 1.55} L${x + r * 0.35} ${y + r * 0.8}" stroke="${ORO}" stroke-width="16" stroke-linecap="round"/>
      <rect x="${x - r * 1.05}" y="${y + r * 1.5}" width="${r * 2.1}" height="${r * 0.22}" rx="${r * 0.08}" fill="${ORO3}" stroke="${INK}" stroke-width="7"/>
      <rect x="${x - r * 0.95}" y="${y + r * 1.5}" width="${r * 1.9}" height="${r * 0.08}" rx="4" fill="${ORO2}"/>
      <!-- canaleta de salida -->
      <path class="so-bo-boca" d="M${x} ${y + r * 0.95} L${x} ${y + r * 1.18} Q${x} ${y + r * 1.32} ${x - r * 0.25} ${y + r * 1.32} L${x - r * 0.7} ${y + r * 1.32}" fill="none" stroke="${INK}" stroke-width="${r * 0.36}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${x} ${y + r * 0.95} L${x} ${y + r * 1.18} Q${x} ${y + r * 1.32} ${x - r * 0.25} ${y + r * 1.32} L${x - r * 0.7} ${y + r * 1.32}" fill="none" stroke="${CRE}" stroke-opacity="0.25" stroke-width="${r * 0.24}" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- esfera -->
      <circle cx="${x}" cy="${y}" r="${r}" fill="${CRE}" fill-opacity="0.10"/>
      <g class="so-bo-giro">${adentro}</g>
      <g class="so-bo-vidrio">
        <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="16"/>
        <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${CRE}" stroke-opacity="0.65" stroke-width="7"/>
        <path d="M${x - r * 0.72} ${y - r * 0.35} A${r * 0.82} ${r * 0.82} 0 0 1 ${x - r * 0.2} ${y - r * 0.8}" fill="none" stroke="#ffffff" stroke-width="${r * 0.07}" stroke-linecap="round" opacity="0.7"/>
        <path d="M${x + r * 0.55} ${y + r * 0.6} A${r * 0.82} ${r * 0.82} 0 0 0 ${x + r * 0.78} ${y + r * 0.2}" fill="none" stroke="#ffffff" stroke-width="${r * 0.04}" stroke-linecap="round" opacity="0.45"/>
        <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.18}" fill="none" stroke="${ORO}" stroke-width="12"/>
        <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.18}" fill="none" stroke="${INK}" stroke-width="3" opacity="0.6"/>
      </g>
      <!-- eje y manija -->
      <circle cx="${x + r}" cy="${y}" r="${r * 0.1}" fill="${ORO}" stroke="${INK}" stroke-width="7"/>
      <circle cx="${x - r}" cy="${y}" r="${r * 0.1}" fill="${ORO}" stroke="${INK}" stroke-width="7"/>
      <g class="so-bo-manija">
        <path d="M${x + r} ${y} L${mx} ${y} L${mx} ${y - 80}" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M${x + r} ${y} L${mx} ${y} L${mx} ${y - 80}" fill="none" stroke="${ORO}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="${mx - 16}" y="${y - 130}" width="32" height="60" rx="14" fill="${ROJO}" stroke="${INK}" stroke-width="6"/>
      </g>
    </g>`;
  }

  // TABLERO de números iluminados: esquina (x, y), nums = lista, cols, celda c. Cada celda .so-tb-c y .so-tb-<n>;
  // la luz es .so-tb-on (opacity 0 hasta que se enciende con K.encender(n, t)).
  function tablero(x, y, nums, cols, c, o) {
    o = o || {};
    const filas = Math.ceil(nums.length / cols);
    const pad = 22;
    let celdas = "";
    nums.forEach((n, i) => {
      const cx = x + pad + (i % cols) * c, cy = y + pad + Math.floor(i / cols) * c;
      const txt = String(n).padStart(2, "0");
      celdas += `<g class="so-tb-c so-tb-${n}">
        <rect x="${cx + 5}" y="${cy + 5}" width="${c - 10}" height="${c - 10}" rx="10" fill="${PANO}" stroke="${INK}" stroke-width="4"/>
        <text data-layout-ignore x="${cx + c / 2}" y="${cy + c / 2 + c * 0.13}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${c * 0.38}" fill="${PANO3}">${txt}</text>
        <g class="so-tb-on" opacity="0">
          <rect x="${cx + 5}" y="${cy + 5}" width="${c - 10}" height="${c - 10}" rx="10" fill="${o.on || ORO2}" stroke="${INK}" stroke-width="4"/>
          <text data-layout-ignore x="${cx + c / 2}" y="${cy + c / 2 + c * 0.13}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${c * 0.38}" fill="${INK}">${txt}</text>
        </g>
      </g>`;
    });
    const W = cols * c + pad * 2, H = filas * c + pad * 2;
    return `<g class="so-tb">
      <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="22" fill="${INK}" stroke="${ORO}" stroke-width="10"/>
      <rect x="${x + 10}" y="${y + 10}" width="${W - 20}" height="${H - 20}" rx="14" fill="none" stroke="${ORO3}" stroke-width="3"/>
      ${celdas}
    </g>`;
  }

  // LA LOCUTORA: busto, origen = centro de la base del torso. Cabeza en (0,-350).
  // clases: .so-l .so-l-cabeza .so-l-boca .so-l-ojos .so-l-cejas .so-l-brazo (micrófono; hombro 150 -190)
  function locutora(x, y, s, o) {
    o = o || {};
    let lentejuelas = "";
    for (let k = 0; k < 22; k++) lentejuelas += `<circle cx="${-150 + ((k * 67) % 300)}" cy="${-150 + ((k * 41) % 170)}" r="5" fill="${ORO2}"/>`;
    const boca = o.sonrisa
      ? `<path class="so-l-boca" d="M-34 -268 Q0 -236 34 -268 Z" fill="${INK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
      : `<ellipse class="so-l-boca" cx="0" cy="-262" rx="22" ry="11" fill="#9e1b2c" stroke="${INK}" stroke-width="5"/>`;
    return `<g transform="${T(x, y, s)}"><g class="so-l">
      <!-- pelo de atrás, voluminoso de los noventa -->
      <path d="M-170 -260 C-230 -380 -180 -540 -40 -560 C60 -590 210 -520 200 -380 C215 -300 180 -230 150 -200 L-140 -200 C-175 -210 -195 -230 -170 -260 Z" fill="#5a2a18" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <!-- vestido dorado con hombreras -->
      <path d="M-230 30 C-235 -110 -200 -190 -110 -215 L110 -215 C200 -190 235 -110 230 30 Z" fill="${ORO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-210 -150 C-190 -200 -140 -220 -100 -215 L-120 -150 Z M210 -150 C190 -200 140 -220 100 -215 L120 -150 Z" fill="${ORO3}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <g opacity="0.9">${lentejuelas}</g>
      <path d="M-70 -215 L0 -120 L70 -215" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-36 -262 L-40 -205 L40 -205 L36 -262 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <circle cx="0" cy="-150" r="11" fill="${CRE}" stroke="${INK}" stroke-width="4"/>
      <g class="so-l-cabeza">
        <path d="M-100 -380 C-104 -470 104 -470 100 -380 L96 -310 C90 -250 48 -228 0 -228 C-48 -228 -90 -250 -96 -310 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- aros dorados -->
        <circle cx="-104" cy="-300" r="16" fill="none" stroke="${INK}" stroke-width="12"/><circle cx="-104" cy="-300" r="16" fill="none" stroke="${ORO2}" stroke-width="6"/>
        <circle cx="104" cy="-300" r="16" fill="none" stroke="${INK}" stroke-width="12"/><circle cx="104" cy="-300" r="16" fill="none" stroke="${ORO2}" stroke-width="6"/>
        <!-- flequillo con jopo -->
        <path d="M-108 -360 C-130 -470 -40 -520 30 -500 C110 -490 140 -420 110 -350 C90 -400 60 -420 20 -425 C0 -400 -50 -395 -70 -410 C-85 -395 -100 -380 -108 -360 Z" fill="#6e3420" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path class="so-l-cejas" d="M-70 -385 Q-48 -398 -24 -388 M70 -385 Q48 -398 24 -388" fill="none" stroke="#5a2a18" stroke-width="9" stroke-linecap="round"/>
        <g class="so-l-ojos">
          <ellipse cx="-46" cy="-350" rx="13" ry="16" fill="${INK}"/><ellipse cx="46" cy="-350" rx="13" ry="16" fill="${INK}"/>
          <path d="M-66 -362 L-74 -372 M-58 -366 L-62 -378 M66 -362 L74 -372 M58 -366 L62 -378" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
          <circle cx="-42" cy="-355" r="4" fill="#ffffff"/><circle cx="50" cy="-355" r="4" fill="#ffffff"/>
        </g>
        <path d="M-75 -318 Q-62 -312 -50 -318 M75 -318 Q62 -312 50 -318" fill="none" stroke="${ROJO2}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
        <path d="M0 -345 C-8 -318 -14 -306 2 -300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
      </g>
      <!-- brazo con el micrófono -->
      <g class="so-l-brazo">
        <path d="M150 -190 C200 -150 200 -60 140 -40 C100 -30 70 -80 60 -140" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C200 -150 200 -60 140 -40 C100 -30 70 -80 60 -140" fill="none" stroke="${ORO}" stroke-width="50" stroke-linecap="round"/>
        <g transform="rotate(-20 60 -170)">
          <rect x="44" y="-200" width="32" height="110" rx="12" fill="${INK}"/>
          <circle cx="60" cy="-222" r="34" fill="#c9c2b0" stroke="${INK}" stroke-width="7"/>
          <path d="M38 -232 L82 -232 M36 -218 L84 -218 M44 -245 L76 -245" stroke="${INK}" stroke-width="4" opacity="0.5"/>
        </g>
        <circle cx="60" cy="-140" r="28" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>
    </g></g>`;
  }

  // LA CLIENTA: busto, origen = centro de la base del torso. Cabeza en (0,-340).
  // o.cara: "neutra" | "enojada" | "feliz"; o.celular: true (celular en la mano, a la derecha).
  // clases: .so-c .so-c-cabeza .so-c-boca .so-c-cejas .so-c-cel .so-c-pantalla
  function clienta(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const cejas = cara === "enojada" ? "M-72 -392 L-26 -376 M72 -392 L26 -376" : cara === "feliz" ? "M-72 -386 Q-50 -404 -28 -390 M72 -386 Q50 -404 28 -390" : "M-72 -384 L-28 -388 M72 -384 L28 -388";
    const boca = cara === "enojada" ? `<path class="so-c-boca" d="M-28 -256 Q0 -276 28 -256" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path class="so-c-boca" d="M-36 -272 Q0 -232 36 -272 Z" fill="${INK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
      : `<path class="so-c-boca" d="M-22 -262 L22 -262" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const cel = o.celular ? `<g class="so-c-cel">
        <path d="M150 20 C190 -60 180 -120 150 -170" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M150 20 C190 -60 180 -120 150 -170" fill="none" stroke="${ROJO}" stroke-width="48" stroke-linecap="round"/>
        <rect x="88" y="-330" width="96" height="170" rx="16" fill="${INK}"/>
        <rect class="so-c-pantalla" x="97" y="-318" width="78" height="146" rx="9" fill="${CRE}"/>
        <rect x="104" y="-300" width="50" height="14" rx="7" fill="${VERDE2}" opacity="0.7"/>
        <rect x="118" y="-276" width="50" height="14" rx="7" fill="${PANO3}" opacity="0.5"/>
        <circle cx="150" cy="-172" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="so-c">
      <path d="M-195 30 C-190 -120 -130 -200 -60 -215 L60 -215 C130 -200 190 -120 195 30 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-60 -215 Q0 -165 60 -215" fill="${CRE}" stroke="${INK}" stroke-width="7"/>
      <path d="M-34 -190 L-40 -110 M34 -190 L40 -110" stroke="${CRE}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-38 -265 L-42 -205 L42 -205 L38 -265 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="so-c-cabeza">
        <!-- cola de caballo -->
        <path d="M80 -440 C170 -450 200 -360 170 -280 C160 -250 140 -230 120 -235 C150 -300 140 -380 80 -400 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-100 -380 C-104 -470 104 -470 100 -380 L96 -305 C90 -245 48 -222 0 -222 C-48 -222 -90 -245 -96 -305 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-106 -360 C-120 -470 -30 -505 40 -488 C100 -478 125 -420 106 -365 C80 -410 30 -440 -20 -425 C-50 -400 -80 -385 -106 -360 Z" fill="#2a1a12" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="96" cy="-440" r="14" fill="${ORO}" stroke="${INK}" stroke-width="5"/>
        <path class="so-c-cejas" d="${cejas}" fill="none" stroke="#2a1a12" stroke-width="11" stroke-linecap="round"/>
        <g class="so-c-ojos"><ellipse cx="-46" cy="-345" rx="11" ry="14" fill="${INK}"/><ellipse cx="46" cy="-345" rx="11" ry="14" fill="${INK}"/></g>
        <path d="M0 -338 C-8 -312 -14 -302 2 -297" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
      </g>
      ${cel}
    </g></g>`;
  }

  // EL DUEÑO: busto, origen = centro de la base del torso. Cabeza en (0,-360).
  // o.cara: "neutra" | "feliz" | "dormido" | "culpa"; o.boleta: brazo levantado con la boleta de la quiniela.
  // clases: .so-d .so-d-cabeza .so-d-boca .so-d-ojos .so-d-brazo (hombro -170 -190) .so-d-boleta .so-d-gota
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "dormido" ? `<path d="M-70 -352 Q-50 -338 -30 -352 M70 -352 Q50 -338 30 -352" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path d="M-70 -346 Q-50 -370 -30 -346 M70 -346 Q50 -370 30 -346" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<circle cx="-50" cy="-350" r="11" fill="${INK}"/><circle cx="50" cy="-350" r="11" fill="${INK}"/>`;
    const cejas = cara === "culpa" ? "M-76 -378 L-30 -392 M76 -378 L30 -392" : "M-76 -384 L-30 -392 M76 -384 L30 -392";
    const boca = cara === "feliz" ? `<path class="so-d-boca" d="M-44 -282 Q0 -226 44 -282 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "dormido" ? `<ellipse class="so-d-boca" cx="0" cy="-268" rx="14" ry="10" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`
      : cara === "culpa" ? `<path class="so-d-boca" d="M-26 -266 Q-10 -276 0 -268 Q12 -260 26 -270" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="so-d-boca" d="M-26 -268 Q0 -256 26 -268" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const brazo = o.boleta ? `<g class="so-d-brazo">
        <path d="M-170 -190 C-230 -250 -240 -330 -220 -420" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M-170 -190 C-230 -250 -240 -330 -220 -420" fill="none" stroke="${PANO3}" stroke-width="52" stroke-linecap="round"/>
        <g class="so-d-boleta" transform="rotate(-12 -220 -470)">
          <rect x="-290" y="-560" width="150" height="110" rx="6" fill="${CRE}" stroke="${INK}" stroke-width="6"/>
          <rect x="-290" y="-560" width="150" height="26" rx="6" fill="${ROJO}" stroke="${INK}" stroke-width="6"/>
          <text x="-215" y="-490" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="46" fill="${INK}">07</text>
          <path d="M-272 -466 L-158 -466" stroke="${INK}" stroke-width="4" stroke-dasharray="8 6" opacity="0.6"/>
        </g>
        <circle cx="-220" cy="-440" r="32" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="so-d">
      <!-- camisa verde y delantal crema -->
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${PANO3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-140 40 L-130 -140 Q0 -112 130 -140 L140 40 Z" fill="${CRE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-130 -140 L-78 -222 M130 -140 L78 -222" stroke="${INK}" stroke-width="7"/>
      <rect x="-50" y="-70" width="100" height="60" rx="8" fill="none" stroke="${INK}" stroke-width="5" opacity="0.5"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      ${brazo}
      <g class="so-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -425 C-132 -400 -130 -355 -110 -335 L-100 -335 L-98 -425 Z M112 -425 C132 -400 130 -355 110 -335 L100 -335 L98 -425 Z" fill="#6b6259" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -478 Q0 -492 40 -480" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        <path class="so-d-cejas" d="${cejas}" stroke="#3b332c" stroke-width="13" stroke-linecap="round"/>
        <g class="so-d-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="#3b332c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        <path class="so-d-gota" d="M108 -430 C98 -410 96 -396 108 -392 C120 -396 118 -410 108 -430 Z" fill="#8fd3ff" stroke="${INK}" stroke-width="4" opacity="${o.gota ? 1 : 0}"/>
      </g>
    </g></g>`;
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
  // cabecera de chat dentro del celular
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || PANO}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${CRE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${CRE}">${nombre}</text>
      <text class="so-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${CRE2}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale, del cliente, crema verdoso) o "i" (entra, blanco). Devuelve [svg, alto].
  // Ancho estimado por caracteres (Lexend 600: ~0.56 em).
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d6f0c4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hora = o.hora ? `<text x="${gx + ancho - 18}" y="${y + alto - 14}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#6b6259">${o.hora}</text>` : "";
    const ticks = o.ticks ? `<path d="M${gx + ancho - 18} ${y + alto - 44} l8 8 l14 -16 M${gx + ancho - 32} ${y + alto - 44} l8 8 l14 -16" fill="none" stroke="${o.ticks === "azul" ? "#3aa0ff" : "#9b9285"}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 ${-0})"/>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}${hora}</g>`, alto, ancho];
  }

  // RELOJ de agujas: centro (x, y), radio r, hora h (0-12), minutos m. Clases .so-rj-h .so-rj-m (rotar con svgOrigin "x y").
  function reloj(x, y, r, h, m, o) {
    o = o || {};
    let marcas = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      marcas += `<line x1="${x + Math.sin(a) * r * 0.78}" y1="${y - Math.cos(a) * r * 0.78}" x2="${x + Math.sin(a) * r * 0.9}" y2="${y - Math.cos(a) * r * 0.9}" stroke="${INK}" stroke-width="${k % 3 ? 4 : 8}" stroke-linecap="round"/>`;
    }
    const ah = ((h % 12) + m / 60) * 30, am = m * 6;
    return `<g class="so-rj ${o.cls || ""}">
      <circle cx="${x}" cy="${y}" r="${r}" fill="${o.fondo || CRE}" stroke="${INK}" stroke-width="10"/>
      <circle cx="${x}" cy="${y}" r="${r - 12}" fill="none" stroke="${ORO}" stroke-width="5"/>
      ${marcas}
      <line class="so-rj-h" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.5}" stroke="${INK}" stroke-width="12" stroke-linecap="round" transform="rotate(${ah} ${x} ${y})"/>
      <line class="so-rj-m" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.74}" stroke="${ROJO}" stroke-width="7" stroke-linecap="round" transform="rotate(${am} ${x} ${y})"/>
      <circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>
    </g>`;
  }

  // CONFETI dorado/rojo/crema: n papelitos repartidos en el rectángulo; clase .so-confeti (cada uno .so-cf)
  function confeti(x, y, w, h, n, seed) {
    const rnd = azar(seed || 3);
    const cols = [ORO2, ROJO2, CRE, ORO, VERDE];
    let s = "";
    for (let k = 0; k < n; k++) {
      const cx = x + rnd() * w, cy = y + rnd() * h, rot = Math.round(rnd() * 180);
      s += `<rect class="so-cf" x="${Math.round(cx)}" y="${Math.round(cy)}" width="${14 + Math.round(rnd() * 10)}" height="${26 + Math.round(rnd() * 12)}" rx="3" fill="${cols[k % (seed === 9 ? 5 : 4)]}" stroke="${INK}" stroke-width="2" transform="rotate(${rot} ${Math.round(cx)} ${Math.round(cy)})"/>`;
    }
    return `<g class="so-confeti">${s}</g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    // pop para elementos SVG, desde su centro (svgOrigin "x y")
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
    // el bolillero gira: las bolillas de adentro dan vueltas y la manija también
    function girar(sel, cx, cy, r, t, d, vueltas) {
      const g = root.querySelector(sel);
      const giro = g.querySelector(".so-bo-giro"), man = g.querySelector(".so-bo-manija");
      origen(giro, `${cx} ${cy}`);
      origen(man, `${cx + r} ${cy}`);
      tl.to(giro, { rotation: "+=" + 360 * (vueltas || 1), duration: d, ease: "power1.inOut" }, t);
      tl.to(man, { rotation: "+=" + 360 * (vueltas || 1), duration: d, ease: "power1.inOut" }, t);
    }
    // enciende una celda del tablero
    function encender(n, t, parpadeo) {
      const on = q(".so-tb-" + n + " .so-tb-on");
      if (!on) return;
      if (parpadeo) tl.fromTo(on, { opacity: 0 }, { opacity: 1, duration: 0.07, yoyo: true, repeat: 3, ease: "steps(1)", immediateRender: false }, t);
      tl.to(on, { opacity: 1, duration: 0.08 }, t + (parpadeo ? 0.3 : 0));
    }
    // la boca se abre y cierra
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.7, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // confeti que cae
    function lluvia(sel, t, d, caida) {
      qa(sel + " .so-cf").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { y: -400 - (i % 7) * 60, opacity: 0 }, { y: caida || 600, opacity: 1, duration: d || 1.6, ease: "power1.in", immediateRender: false }, t + (i % 9) * 0.05);
      });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, girar, encender, hablar, lluvia, salida };
  }
  return { INK, PANO, PANO2, PANO3, ORO, ORO2, ORO3, CRE, CRE2, ROJO, ROJO2, PIEL, PIEL2, VERDE, VERDE2, azar, bolilla, bolillero, tablero, locutora, clienta, dueno, celular, celularBorde, chatCabecera, globo, reloj, confeti, kit };
})();
