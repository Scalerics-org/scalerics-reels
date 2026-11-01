// Piezas del reel "las-ojeras": la influencer, Néstor (con ojeras), los productos de maquillaje, el
// celular con chat, el reloj digital, la luna, destellos, el agente de IA, tarjetas de paso y helpers.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = TO.nestor(x, y, s) + ...
// y en el script: const K = TO.kit(tl, root).
window.TO = window.TO || (function () {
  const INK = "#2b1720", CIR2 = "#4a2533", CIR3 = "#5a2c3b",
    NUDE = "#f2c4b8", NUDE2 = "#f9e1d8", NUDE3 = "#d9998a",
    ROSA = "#e8577e", ROSA2 = "#ff8fb0",
    ORO = "#d9a441", ORO2 = "#f3cf7a", ORO3 = "#a8782a",
    LILA = "#7d6b9e", LILA2 = "#c3b2f0",
    PIEL = "#f0c8a0", PIEL2 = "#e0ad86", VERDE = "#5ce611", VERDE2 = "#3f9e0b", BLANCO = "#fff8f4";
  if (!document.getElementById("to-css")) {
    const st = document.createElement("style");
    st.id = "to-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.to-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROSA}; border-radius: 14px; color: ${ROSA};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(249, 225, 216, 0.95); }
.to-sello.lila { border-color: ${LILA}; color: ${LILA}; }
.to-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.to-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${ORO}; border-radius: 12px; box-shadow: 6px 6px 0 rgba(43, 23, 32, 0.35);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${ORO2}; white-space: nowrap; text-align: center; }
.to-tag.rosa { background: ${ROSA}; border-color: ${NUDE2}; color: ${NUDE2}; }
.to-tag.lila { background: ${LILA}; border-color: ${NUDE2}; color: ${NUDE2}; }
.to-tag.verde { background: ${VERDE2}; border-color: ${NUDE2}; color: ${NUDE2}; }
.to-sticker { position: absolute; box-sizing: border-box; padding: 16px 34px 18px; background: ${ROSA}; border: 7px solid ${INK}; border-radius: 999px; box-shadow: 0 9px 0 ${INK};
  font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; line-height: 1; color: ${NUDE2}; white-space: nowrap; text-align: center; letter-spacing: -0.01em; }
.to-sticker.oro { background: ${ORO2}; color: ${INK}; }
.to-sticker.verde { background: ${VERDE}; color: ${INK}; }
.to-titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${ROSA2}; white-space: nowrap; text-align: center; line-height: 0.95;
  -webkit-text-stroke: 4px ${INK}; paint-order: stroke fill; text-shadow: 0 8px 0 ${INK}; letter-spacing: -0.01em; }
.to-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: ${ORO2}; white-space: nowrap; line-height: 0.9;
  -webkit-text-stroke: 3px ${INK}; paint-order: stroke fill; text-shadow: 0 6px 0 ${INK}; }
.to-paso { position: absolute; left: 330px; top: 830px; width: 420px; height: 330px; box-sizing: border-box; background: ${NUDE2}; border: 8px solid ${INK}; border-radius: 34px;
  box-shadow: 0 12px 0 ${INK}, inset 0 0 0 10px ${ORO2}; text-align: center; }
.to-paso small { position: absolute; left: 0; right: 0; top: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; letter-spacing: 0.4em; color: ${ROSA}; }
.to-paso b { position: absolute; left: 0; right: 0; top: 64px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; line-height: 1; color: ${ORO}; -webkit-text-stroke: 6px ${INK}; paint-order: stroke fill; text-shadow: 0 8px 0 ${ORO3}; }
.to-paso i { position: absolute; left: 0; right: 0; top: 232px; font-family: "Caveat", cursive; font-weight: 700; font-style: normal; font-size: 74px; line-height: 1; color: ${INK}; }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

  // DESTELLO de 4 puntas: centro (x, y), radio r. Clase .to-ds (rotar/escalar con svgOrigin "x y").
  function destello(x, y, r, color, cls) {
    const k = r * 0.22;
    return `<path class="to-ds ${cls || ""}" data-o="${x} ${y}" d="M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r} Z" fill="${color || ORO2}" stroke="${INK}" stroke-width="${Math.max(3, r * 0.12)}" stroke-linejoin="round"/>`;
  }
  // varios destellos: lista [[x, y, r], ...]
  function destellos(lista, color, cls) { return lista.map(([x, y, r]) => destello(x, y, r, color, cls)).join(""); }

  // ZZZ: tres Z crecientes desde (x, y). Clase .to-z (cada Z .to-z1 .to-z2 .to-z3)
  function zzz(x, y, s, color) {
    s = s || 1;
    return `<g class="to-zzz">${[0, 1, 2].map((i) => `<text class="to-z to-z${i + 1}" x="${x + i * 46 * s}" y="${y - i * 56 * s}" font-family="Lexend" font-weight="900" font-size="${(54 + i * 22) * s}" fill="${color || LILA2}" stroke="${INK}" stroke-width="${6 * s}" paint-order="stroke" data-layout-ignore>Z</text>`).join("")}</g>`;
  }

  // LUNA creciente lila: centro (x, y), radio r.
  function luna(x, y, r) {
    return `<g class="to-luna"><path d="M${x + r * 0.3} ${y - r * 0.954} A${r} ${r} 0 1 0 ${x + r * 0.3} ${y + r * 0.954} A${r} ${r} 0 0 1 ${x + r * 0.3} ${y - r * 0.954} Z" fill="${LILA2}" stroke="${INK}" stroke-width="${Math.max(5, r * 0.09)}" stroke-linejoin="round"/>
      <circle cx="${x - r * 0.7}" cy="${y - r * 0.1}" r="${r * 0.09}" fill="${LILA}" opacity="0.6"/><circle cx="${x - r * 0.55}" cy="${y + r * 0.45}" r="${r * 0.07}" fill="${LILA}" opacity="0.6"/></g>`;
  }
  // SOL dorado: centro (x, y), radio r. Rayos en .to-sol-rayos (rotar con svgOrigin).
  function sol(x, y, r) {
    let ray = "";
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2; ray += `M${x + Math.cos(a) * r * 1.25} ${y + Math.sin(a) * r * 1.25} L${x + Math.cos(a) * r * 1.6} ${y + Math.sin(a) * r * 1.6} `; }
    return `<g class="to-sol"><path class="to-sol-rayos" d="${ray}" stroke="${INK}" stroke-width="${r * 0.24}" stroke-linecap="round"/><path class="to-sol-rayos2" d="${ray}" stroke="${ORO2}" stroke-width="${r * 0.12}" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${ORO2}" stroke="${INK}" stroke-width="${Math.max(5, r * 0.1)}"/></g>`;
  }

  // RELOJ DIGITAL despertador: centro (x, y), texto "02:00". o.color (dígitos), o.cls
  function reloj(x, y, txt, o) {
    o = o || {};
    const w = 300, h = 150;
    return `<g class="to-reloj ${o.cls || ""}">
      <path d="M${x - w * 0.36} ${y + h / 2 - 4} L${x - w * 0.42} ${y + h / 2 + 22} M${x + w * 0.36} ${y + h / 2 - 4} L${x + w * 0.42} ${y + h / 2 + 22}" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="34" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x - w / 2 + 22}" y="${y - h / 2 + 20}" width="${w - 44}" height="${h - 40}" rx="16" fill="${INK}"/>
      <text x="${x}" y="${y + 30}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="84" fill="${o.color || ROSA2}" letter-spacing="0.02em">${txt}</text>
      <rect x="${x - 40}" y="${y - h / 2 - 16}" width="80" height="18" rx="8" fill="${ORO3}" stroke="${INK}" stroke-width="6"/>
    </g>`;
  }

  // ---------- productos (centro x, y; escala s) ----------
  function frascoBase(x, y, s) {
    return `<g class="to-prod to-base" transform="${T(x, y, s)}">
      <rect x="-70" y="-150" width="140" height="70" rx="12" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <rect x="-40" y="-90" width="80" height="30" fill="${ORO3}" stroke="${INK}" stroke-width="7"/>
      <rect x="-95" y="-64" width="190" height="220" rx="34" fill="${NUDE3}" stroke="${INK}" stroke-width="8"/>
      <path d="M-70 -40 L-70 120" stroke="${BLANCO}" stroke-width="14" stroke-linecap="round" opacity="0.55"/>
      <rect x="-60" y="10" width="130" height="80" rx="10" fill="${NUDE2}" stroke="${INK}" stroke-width="5"/>
      <text x="5" y="64" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="${INK}" data-layout-ignore>BASE</text>
    </g>`;
  }
  function corrector(x, y, s, rot) {
    return `<g class="to-prod to-corr" transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})">
      <rect x="-34" y="-30" width="68" height="200" rx="16" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <rect x="-34" y="60" width="68" height="20" fill="${ORO3}" stroke="${INK}" stroke-width="5"/>
      <rect x="-24" y="-100" width="48" height="80" rx="8" fill="${NUDE2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-24 -100 C-22 -150 22 -150 24 -100 Z" fill="${NUDE}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-20 -10 L-20 50" stroke="${ORO2}" stroke-width="8" stroke-linecap="round"/>
    </g>`;
  }
  function iluminador(x, y, s) {
    return `<g class="to-prod to-ilu" transform="${T(x, y, s)}">
      <ellipse class="to-ilu-tapa" cx="0" cy="-120" rx="150" ry="70" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="0" cy="-120" rx="112" ry="48" fill="${NUDE2}" stroke="${INK}" stroke-width="5"/>
      <path d="M-70 -140 Q-20 -160 40 -150" stroke="${BLANCO}" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.8"/>
      <ellipse cx="0" cy="40" rx="160" ry="74" fill="${ORO3}" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="0" cy="26" rx="160" ry="74" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="0" cy="26" rx="118" ry="50" fill="${ORO2}" stroke="${INK}" stroke-width="6"/>
      <path d="M-80 26 Q-30 -6 30 20 Q70 34 90 10" stroke="${BLANCO}" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.9"/>
      ${destello(-40, 30, 22, BLANCO)}${destello(50, 10, 16, BLANCO)}
    </g>`;
  }
  function spray(x, y, s) {
    return `<g class="to-prod to-spray" transform="${T(x, y, s)}">
      <rect x="-30" y="-190" width="60" height="40" rx="8" fill="${ORO}" stroke="${INK}" stroke-width="7"/>
      <rect x="20" y="-182" width="34" height="16" rx="5" fill="${INK}"/>
      <path d="M-50 -150 L50 -150 L60 -110 L-60 -110 Z" fill="${ORO3}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="-80" y="-112" width="160" height="290" rx="40" fill="${ROSA2}" stroke="${INK}" stroke-width="8"/>
      <path d="M-55 -80 L-55 140" stroke="${BLANCO}" stroke-width="14" stroke-linecap="round" opacity="0.5"/>
      <rect x="-56" y="-10" width="112" height="100" rx="12" fill="${NUDE2}" stroke="${INK}" stroke-width="5"/>
      <text x="0" y="34" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="22" fill="${INK}" data-layout-ignore>FIJADOR</text>
      <text x="0" y="72" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="34" fill="${ROSA}" data-layout-ignore>24 h</text>
    </g>`;
  }
  // nube de spray: puntitos desde la boquilla hacia la derecha. Clase .to-niebla (cada punto .to-np)
  function niebla(x, y, seed) {
    const rnd = azar(seed || 5);
    let s = "";
    for (let k = 0; k < 26; k++) {
      const d = 30 + rnd() * 300, a = (rnd() - 0.5) * 0.9;
      s += `<circle class="to-np" cx="${Math.round(x + Math.cos(a) * d)}" cy="${Math.round(y + Math.sin(a) * d)}" r="${Math.round(6 + rnd() * 14)}" fill="${BLANCO}" stroke="${INK}" stroke-width="3" opacity="0.85"/>`;
    }
    return `<g class="to-niebla">${s}</g>`;
  }
  function esponja(x, y, s) {
    return `<g class="to-prod to-esponja" transform="${T(x, y, s)}">
      <path d="M0 -110 C50 -60 80 -10 80 40 C80 90 44 120 0 120 C-44 120 -80 90 -80 40 C-80 -10 -50 -60 0 -110 Z" fill="${ROSA2}" stroke="${INK}" stroke-width="8"/>
      <path d="M-40 10 C-40 -20 -20 -50 0 -70" stroke="${BLANCO}" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.6"/>
      <path d="M-50 80 C-20 100 30 100 56 74" stroke="${NUDE3}" stroke-width="22" stroke-linecap="round" fill="none"/>
    </g>`;
  }
  function brocha(x, y, s, rot, color) {
    return `<g class="to-prod to-brocha" transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})">
      <path d="M-14 40 L-10 220 Q0 232 10 220 L14 40 Z" fill="${CIR3}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="-22" y="-10" width="44" height="60" rx="6" fill="${ORO}" stroke="${INK}" stroke-width="7"/>
      <path d="M-22 -8 C-50 -60 -40 -120 0 -130 C40 -120 50 -60 22 -8 Z" fill="${CIR2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-30 -90 C-20 -126 20 -126 30 -90 C14 -100 -14 -100 -30 -90 Z" fill="${color || ROSA2}"/>
    </g>`;
  }
  function almohada(x, y, s) {
    return `<g class="to-almohada" transform="${T(x, y, s)}">
      <path d="M-230 -80 Q0 -120 230 -80 Q260 0 230 80 Q0 120 -230 80 Q-260 0 -230 -80 Z" fill="${NUDE2}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M-200 -50 Q0 -80 200 -50" stroke="${NUDE3}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M-120 20 l18 0 M-40 40 l18 0 M60 10 l18 0 M140 36 l18 0" stroke="${ROSA2}" stroke-width="10" stroke-linecap="round"/>
    </g>`;
  }

  // LA INFLUENCER: busto, origen = centro de la base del torso. Cabeza en (0,-360).
  // o.cara: "feliz" | "guino" | "tierna" | "beso"; o.brazo: "brocha" (default) | "abajo" | "saludo"
  // clases: .to-i .to-i-cabeza .to-i-boca .to-i-ojos .to-i-cejas .to-i-brazo (hombro 150 -190) .to-i-pelo
  function influencer(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "feliz";
    const ojo = (cx, cerrado) => cerrado
      ? `<path d="M${cx - 24} -350 Q${cx} -334 ${cx + 24} -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
         <path d="M${cx - 24} -348 l-12 -6 M${cx + 24} -348 l12 -6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
      : `<ellipse cx="${cx}" cy="-350" rx="22" ry="26" fill="${BLANCO}" stroke="${INK}" stroke-width="6"/>
         <circle cx="${cx + 2}" cy="-346" r="14" fill="${CIR3}"/><circle cx="${cx + 2}" cy="-346" r="7" fill="${INK}"/>
         <circle cx="${cx + 7}" cy="-353" r="5" fill="${BLANCO}"/>
         <path d="M${cx - 26} -360 Q${cx} -386 ${cx + 26} -362 M${cx + 18} -372 l14 -14 M${cx + 6} -378 l8 -18 M${cx - 8} -378 l-2 -18 M${cx - 20} -372 l-12 -12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const ojos = cara === "guino" ? ojo(-48, false) + ojo(48, true) : cara === "tierna" ? ojo(-48, true) + ojo(48, true) : ojo(-48, false) + ojo(48, false);
    const cejas = cara === "tierna" ? "M-76 -394 Q-52 -404 -26 -390 M76 -394 Q52 -404 26 -390" : "M-78 -400 Q-52 -418 -24 -402 M78 -400 Q52 -418 24 -402";
    const boca = cara === "beso"
      ? `<path class="to-i-boca" d="M-14 -268 C-30 -268 -30 -248 -14 -250 C-28 -244 -24 -226 -6 -232 C4 -226 18 -236 10 -250 C24 -252 22 -270 6 -268 C0 -276 -10 -276 -14 -268 Z" fill="${ROSA}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
      : cara === "tierna"
        ? `<path class="to-i-boca" d="M-30 -262 Q0 -242 30 -262" fill="none" stroke="${ROSA}" stroke-width="11" stroke-linecap="round"/>`
        : `<path class="to-i-boca" d="M-40 -272 Q0 -270 40 -272 Q30 -228 0 -228 Q-30 -228 -40 -272 Z" fill="${INK}" stroke="${ROSA}" stroke-width="9" stroke-linejoin="round"/><path d="M-26 -266 L26 -266" stroke="${BLANCO}" stroke-width="9" stroke-linecap="round"/>`;
    const brazoT = o.brazo || "brocha";
    const brazo = brazoT === "abajo" ? `<g class="to-i-brazo">
        <path d="M150 -190 C200 -120 210 -40 190 20" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C200 -120 210 -40 190 20" fill="none" stroke="${PIEL}" stroke-width="50" stroke-linecap="round"/>
        ${o.tool === false ? "" : brocha(190, 40, 0.7, 80)}
      </g>`
      : brazoT === "saludo" ? `<g class="to-i-brazo">
        <path d="M150 -190 C220 -220 240 -330 220 -420" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C220 -220 240 -330 220 -420" fill="none" stroke="${PIEL}" stroke-width="50" stroke-linecap="round"/>
        <path d="M196 -440 l-14 -50 M214 -446 l-4 -56 M232 -444 l8 -52 M248 -432 l18 -40" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
        <path d="M196 -440 l-14 -50 M214 -446 l-4 -56 M232 -444 l8 -52 M248 -432 l18 -40" stroke="${PIEL}" stroke-width="17" stroke-linecap="round"/>
        <circle cx="222" cy="-430" r="36" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>`
      : `<g class="to-i-brazo">
        <path d="M150 -190 C210 -150 220 -60 160 -40 C110 -30 80 -90 76 -150" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
        <path d="M150 -190 C210 -150 220 -60 160 -40 C110 -30 80 -90 76 -150" fill="none" stroke="${PIEL}" stroke-width="50" stroke-linecap="round"/>
        ${brocha(76, -190, 0.85, 12)}
        <circle cx="76" cy="-150" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="to-i">
      <!-- pelo de atrás, largo y ondulado -->
      <path class="to-i-pelo" d="M-150 -330 C-200 -440 -130 -560 0 -560 C130 -560 200 -440 150 -330 C190 -260 150 -200 190 -120 C210 -70 170 -30 130 -40 L-130 -40 C-170 -30 -210 -70 -190 -120 C-150 -200 -190 -260 -150 -330 Z" fill="#5a3426" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-170 -150 C-150 -200 -180 -250 -150 -300 M170 -150 C150 -200 180 -250 150 -300" fill="none" stroke="${ORO}" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
      <!-- top rosa con tiritas -->
      <path d="M-210 30 C-215 -100 -180 -175 -110 -195 L110 -195 C180 -175 215 -100 210 30 Z" fill="${ROSA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-120 -195 C-80 -150 80 -150 120 -195 C90 -230 -90 -230 -120 -195 Z" fill="${PIEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-34 -262 L-38 -205 L38 -205 L34 -262 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <path d="M-60 -196 Q0 -150 60 -196" fill="none" stroke="${ORO}" stroke-width="7"/><circle cx="0" cy="-160" r="12" fill="${ORO2}" stroke="${INK}" stroke-width="4"/>
      <g class="to-i-cabeza">
        <path d="M-100 -380 C-104 -470 104 -470 100 -380 L96 -310 C90 -250 48 -226 0 -226 C-48 -226 -90 -250 -96 -310 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <circle cx="-104" cy="-290" r="22" fill="none" stroke="${INK}" stroke-width="13"/><circle cx="-104" cy="-290" r="22" fill="none" stroke="${ORO2}" stroke-width="6"/>
        <circle cx="104" cy="-290" r="22" fill="none" stroke="${INK}" stroke-width="13"/><circle cx="104" cy="-290" r="22" fill="none" stroke="${ORO2}" stroke-width="6"/>
        <!-- flequillo de costado -->
        <path d="M-110 -350 C-130 -470 -20 -520 60 -490 C120 -470 130 -400 110 -340 C90 -400 40 -440 -30 -430 C-70 -420 -100 -390 -110 -350 Z" fill="#6e4030" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-40 -470 C0 -490 60 -480 90 -450" fill="none" stroke="${ORO}" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
        <path class="to-i-cejas" d="${cejas}" fill="none" stroke="#5a3426" stroke-width="10" stroke-linecap="round"/>
        <path d="M-74 -366 Q-48 -384 -22 -366 M74 -366 Q48 -384 22 -366" fill="none" stroke="${ROSA2}" stroke-width="9" stroke-linecap="round" opacity="0.8"/>
        <g class="to-i-ojos">${ojos}</g>
        <ellipse cx="-70" cy="-300" rx="22" ry="12" fill="${ROSA2}" opacity="0.7"/><ellipse cx="70" cy="-300" rx="22" ry="12" fill="${ROSA2}" opacity="0.7"/>
        <path d="M0 -338 C-8 -312 -14 -302 2 -296" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        ${boca}
        <path d="M-58 -318 l6 6 M60 -318 l-6 6" stroke="${BLANCO}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
      </g>
      ${brazo}
    </g></g>`;
  }

  // NÉSTOR: busto, origen = centro de la base del torso. Cabeza en (0,-360). Capa de maquillaje y vincha.
  // o.cara: "dormido" | "cansado" | "tuerto" (un ojo abierto) | "sobresalto" | "feliz" (dormido feliz)
  // o.ojeras (0-1, default 1); o.celular: brazo con el celular frente a la cara; o.antifaz; o.saludo (mano en la frente)
  // clases: .to-n .to-n-cabeza .to-n-boca .to-n-ojos .to-n-cejas .to-n-ojeras (.to-n-oj-i .to-n-oj-d)
  //   .to-n-base (capa de base sobre la cara, opacity 0) .to-n-brillo (iluminador, opacity 0) .to-n-cel .to-n-luz .to-n-gota
  function nestor(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "cansado";
    let ojos;
    if (cara === "dormido" || cara === "feliz") ojos = `<path d="M-72 -352 Q-50 -336 -28 -352 M72 -352 Q50 -336 28 -352" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    else if (cara === "sobresalto") ojos = `<circle cx="-50" cy="-356" r="27" fill="${BLANCO}" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="-356" r="27" fill="${BLANCO}" stroke="${INK}" stroke-width="6"/><circle cx="-48" cy="-354" r="8" fill="${INK}"/><circle cx="48" cy="-354" r="8" fill="${INK}"/>`;
    else {
      const abierto = (cx) => `<ellipse cx="${cx}" cy="-350" rx="20" ry="18" fill="${BLANCO}" stroke="${INK}" stroke-width="6"/><circle cx="${cx}" cy="-346" r="9" fill="${INK}"/>
        <path d="M${cx - 22} -352 Q${cx} -366 ${cx + 22} -352 L${cx + 22} -360 Q${cx} -374 ${cx - 22} -360 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
      const cerrado = (cx) => `<path d="M${cx - 22} -350 Q${cx} -338 ${cx + 22} -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
      ojos = cara === "tuerto" ? cerrado(-50) + abierto(50) : abierto(-50) + abierto(50);
    }
    const cejas = cara === "sobresalto" ? "M-80 -402 L-28 -410 M80 -402 L28 -410" : "M-78 -384 L-30 -392 M78 -384 L30 -392";
    const boca = cara === "sobresalto" ? `<ellipse class="to-n-boca" cx="0" cy="-262" rx="26" ry="22" fill="#7a1f35" stroke="${INK}" stroke-width="6"/>`
      : cara === "dormido" ? `<ellipse class="to-n-boca" cx="0" cy="-266" rx="13" ry="10" fill="#7a1f35" stroke="${INK}" stroke-width="5"/>`
      : cara === "feliz" ? `<path class="to-n-boca" d="M-30 -270 Q0 -246 30 -270" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<path class="to-n-boca" d="M-26 -264 Q0 -272 26 -264" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const oj = o.ojeras ?? 1;
    // ojeras: medialunas lila debajo de cada ojo, dos tonos
    const ojera = (cx, cls) => `<g class="${cls}">
        <path d="M${cx - 40} -338 C${cx - 44} -296 ${cx + 44} -296 ${cx + 40} -338 C${cx + 22} -318 ${cx - 22} -318 ${cx - 40} -338 Z" fill="${LILA}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M${cx - 30} -320 C${cx - 18} -306 ${cx + 18} -306 ${cx + 30} -320" fill="none" stroke="${LILA2}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
        <path d="M${cx - 34} -300 C${cx - 14} -286 ${cx + 14} -286 ${cx + 34} -300" fill="none" stroke="${LILA}" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
      </g>`;
    const cel = o.celular ? `<g class="to-n-cel">
        <ellipse class="to-n-luz" cx="144" cy="-245" rx="95" ry="120" fill="${BLANCO}" opacity="0"/>
        <path d="M160 40 C210 -40 200 -120 160 -170" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M160 40 C210 -40 200 -120 160 -170" fill="none" stroke="${NUDE}" stroke-width="48" stroke-linecap="round"/>
        <rect x="96" y="-330" width="96" height="170" rx="16" fill="${INK}"/>
        <rect class="to-n-pantalla" x="105" y="-318" width="78" height="146" rx="9" fill="${LILA2}"/>
        <rect x="112" y="-300" width="50" height="14" rx="7" fill="${BLANCO}" opacity="0.8"/>
        <rect x="126" y="-276" width="50" height="14" rx="7" fill="${BLANCO}" opacity="0.6"/>
        <circle cx="160" cy="-172" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    const saludo = o.saludo ? `<g class="to-n-brazo">
        <path d="M-190 -170 C-250 -250 -275 -360 -262 -470" fill="none" stroke="${INK}" stroke-width="62" stroke-linecap="round"/>
        <path d="M-190 -170 C-250 -250 -275 -360 -262 -470" fill="none" stroke="${NUDE}" stroke-width="48" stroke-linecap="round"/>
        <circle cx="-262" cy="-505" r="36" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
        <path d="M-286 -530 l-6 -30 M-266 -538 l0 -32 M-246 -534 l8 -28" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
        <path d="M-286 -530 l-6 -30 M-266 -538 l0 -32 M-246 -534 l8 -28" stroke="${PIEL}" stroke-width="11" stroke-linecap="round"/>
      </g>` : "";
    const antifaz = o.antifaz ? `<g class="to-n-antifaz">
        <path d="M-106 -352 L-128 -366 M106 -352 L128 -366" stroke="${ROSA}" stroke-width="12" stroke-linecap="round"/>
        <path d="M-100 -380 C-60 -396 -20 -384 0 -372 C20 -384 60 -396 100 -380 C108 -350 96 -318 60 -316 C30 -314 14 -330 0 -334 C-14 -330 -30 -314 -60 -316 C-96 -318 -108 -350 -100 -380 Z" fill="${ROSA2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-70 -350 Q-50 -340 -30 -350 M70 -350 Q50 -340 30 -350" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-80 -334 l-8 10 M-62 -330 l-4 12 M80 -334 l8 10 M62 -330 l4 12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="to-n">
      <!-- capa de maquillaje nude -->
      <path d="M-260 40 C-250 -90 -200 -190 -90 -222 L90 -222 C200 -190 250 -90 260 40 Z" fill="${NUDE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-200 -60 L-190 30 M-120 -120 L-110 30 M120 -120 L110 30 M200 -60 L190 30" stroke="${NUDE3}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-90 -222 Q0 -180 90 -222 L80 -200 Q0 -164 -80 -200 Z" fill="${NUDE2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      ${saludo}
      <g class="to-n-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path class="to-n-base" d="M-104 -392 C-108 -500 108 -500 104 -392 L100 -316 C92 -256 52 -236 0 -236 C-52 -236 -92 -256 -100 -316 Z" fill="${NUDE}" opacity="0"/>
        <path d="M-112 -425 C-140 -400 -136 -350 -112 -330 L-100 -335 L-98 -425 Z M112 -425 C140 -400 136 -350 112 -330 L100 -335 L98 -425 Z" fill="#8a7f86" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -478 Q0 -492 40 -480" fill="none" stroke="${BLANCO}" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        <!-- vincha rosa con moño -->
        <path d="M-112 -410 C-100 -500 100 -500 112 -410" fill="none" stroke="${INK}" stroke-width="34" stroke-linecap="round"/>
        <path d="M-112 -410 C-100 -500 100 -500 112 -410" fill="none" stroke="${ROSA}" stroke-width="22" stroke-linecap="round"/>
        <path d="M40 -478 L0 -520 L-6 -470 Z M40 -478 L86 -512 L84 -462 Z" fill="${ROSA2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" transform="translate(10 0)"/>
        <circle cx="50" cy="-478" r="13" fill="${ROSA}" stroke="${INK}" stroke-width="6"/>
        <g class="to-n-ojeras" opacity="${oj}">${ojera(-50, "to-n-oj-i")}${ojera(50, "to-n-oj-d")}</g>
        <path class="to-n-brillo" d="M-92 -306 Q-76 -320 -60 -312 M92 -306 Q76 -320 60 -312 M-10 -330 L-6 -310" fill="none" stroke="${BLANCO}" stroke-width="9" stroke-linecap="round" opacity="0"/>
        <path class="to-n-cejas" d="${cejas}" stroke="#5e555a" stroke-width="13" stroke-linecap="round"/>
        <g class="to-n-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="#6b6259" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        ${antifaz}
        <path class="to-n-gota" d="M108 -430 C98 -410 96 -396 108 -392 C120 -396 118 -410 108 -430 Z" fill="${LILA2}" stroke="${INK}" stroke-width="4" opacity="${o.gota ? 1 : 0}"/>
      </g>
      ${cel}
    </g></g>`;
  }

  // EL AGENTE DE IA: un celular con cara amable, auriculares y pantalla verde. Centro (x, y), escala s.
  // clases: .to-a .to-a-ojos .to-a-boca .to-a-cuerpo
  function agente(x, y, s, o) {
    o = o || {};
    return `<g transform="${T(x, y, s)}"><g class="to-a">
      <path d="M-150 60 C-210 80 -230 140 -200 170 M150 60 C210 80 230 140 200 170" fill="none" stroke="${INK}" stroke-width="34" stroke-linecap="round"/>
      <path d="M-150 60 C-210 80 -230 140 -200 170 M150 60 C210 80 230 140 200 170" fill="none" stroke="${VERDE2}" stroke-width="20" stroke-linecap="round"/>
      <g class="to-a-cuerpo">
        <rect x="-150" y="-260" width="300" height="520" rx="48" fill="${INK}"/>
        <rect x="-132" y="-236" width="264" height="472" rx="34" fill="${VERDE}"/>
        <rect x="-40" y="-252" width="80" height="12" rx="6" fill="${CIR3}"/>
        <path d="M-100 -200 L-100 160" stroke="${BLANCO}" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
        <g class="to-a-ojos">
          ${o.dormilon ? "" : `<ellipse cx="-50" cy="-70" rx="26" ry="34" fill="${INK}"/><ellipse cx="50" cy="-70" rx="26" ry="34" fill="${INK}"/><circle cx="-42" cy="-82" r="9" fill="${BLANCO}"/><circle cx="58" cy="-82" r="9" fill="${BLANCO}"/>`}
        </g>
        <path class="to-a-boca" d="M-56 10 Q0 70 56 10" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <ellipse cx="-92" cy="-10" rx="20" ry="11" fill="${VERDE2}" opacity="0.7"/><ellipse cx="92" cy="-10" rx="20" ry="11" fill="${VERDE2}" opacity="0.7"/>
        <text x="0" y="140" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="34" fill="${INK}" letter-spacing="4" data-layout-ignore>AGENTE IA</text>
      </g>
      <!-- auriculares -->
      <path d="M-170 -80 C-170 -330 170 -330 170 -80" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
      <path d="M-170 -80 C-170 -330 170 -330 170 -80" fill="none" stroke="${ORO}" stroke-width="16" stroke-linecap="round"/>
      <rect x="-200" y="-130" width="60" height="110" rx="24" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <rect x="140" y="-130" width="60" height="110" rx="24" fill="${ORO}" stroke="${INK}" stroke-width="8"/>
      <path d="M-170 -30 C-170 40 -120 60 -70 56" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="-64" cy="56" r="14" fill="${INK}"/>
    </g></g>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || NUDE2}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="122" fill="${color || CIR2}"/>
      <circle cx="${x + 62}" cy="${y + 74}" r="28" fill="${NUDE2}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 106}" y="${y + 72}" font-family="Lexend" font-weight="700" font-size="30" fill="${NUDE2}">${nombre}</text>
      <text class="to-chat-sub" x="${x + 106}" y="${y + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${NUDE}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho]. o.fs, o.hora, o.ticks ("gris"|"verde"), o.fill, o.cls
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 34, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48 + (o.hora ? 40 : 0);
    const alto = lineas.length * fs * 1.25 + 34 + (o.hora ? 22 : 0);
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? NUDE2 : BLANCO);
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 17 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    const hora = o.hora ? `<text x="${gx + ancho - (o.ticks ? 52 : 18)}" y="${y + alto - 12}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#7a6870">${o.hora}</text>` : "";
    const ticks = o.ticks ? `<path d="M${gx + ancho - 46} ${y + alto - 22} l7 7 l12 -14 M${gx + ancho - 32} ${y + alto - 22} l7 7 l12 -14" fill="none" stroke="${o.ticks === "verde" ? VERDE2 : "#9b8a90"}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : "";
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="22" fill="${fill}" stroke="${INK}" stroke-width="5"/>${txt}${hora}${ticks}</g>`, alto, ancho];
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function centro(el) { const b = el.getBBox(); return `${b.x + b.width / 2} ${b.y + b.height / 2}`; }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    // pop para elementos SVG, desde su centro (o "x y")
    function popSvg(el, t, o, d, desde) {
      o = o || centro(el);
      gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 0.3, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: d || 0.4, ease: "back.out(2)", immediateRender: false }, t);
    }
    function fuera(el, t, d) { tl.to(el, { opacity: 0, duration: d || 0.2, ease: "power2.in" }, t); }
    function sello(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 1.9, rotation: (rot || 0) - 6 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.12, ease: "power4.in", immediateRender: false }, t - 0.1);
      tl.fromTo(el, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t + 0.02);
    }
    function sacudon(el, t, f) {
      f = f || 1;
      [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    function vibrar(el, t, d) {
      const n = Math.round((d || 0.6) / 0.05);
      for (let i = 0; i < n; i++) tl.to(el, { x: i % 2 ? -7 : 7, duration: 0.05, ease: "none" }, t + i * 0.05);
      tl.to(el, { x: 0, duration: 0.05 }, t + n * 0.05);
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    // destellos que titilan (escala y giro) desde t por d segundos
    function titilar(sel, t, d) {
      qa(sel).forEach((el, i) => {
        const o = el.dataset.o || centro(el);
        gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
        const t0 = t + (i % 5) * 0.12;
        tl.fromTo(el, { opacity: 0, scale: 0, rotation: -40, svgOrigin: o }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: o, duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, t0);
        const veces = Math.max(1, Math.floor(((d || 1.5) - 0.3) / 0.5));
        tl.to(el, { scale: 0.55, rotation: 30, svgOrigin: o, duration: 0.25, yoyo: true, repeat: veces * 2 - 1, ease: "sine.inOut" }, t0 + 0.3);
      });
    }
    // las Z suben y titilan
    function roncar(sel, t, d) {
      qa(sel + " .to-z").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        const veces = Math.max(1, Math.floor((d || 2) / 1.2));
        tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -10, duration: 0.6, ease: "sine.out", yoyo: true, repeat: veces * 2 - 1, immediateRender: false }, t + i * 0.2);
      });
    }
    // la boca se abre y cierra
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        origen(b, centro(b));
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    // tarjeta de capítulo "PASO n": entra gigante al centro en t y se achica a la esquina de arriba a la izquierda en t2
    function paso(el, t, t2) {
      gsap.set(el, { opacity: 0, transformOrigin: "50% 50%" });
      tl.fromTo(el, { opacity: 0, scale: 1.7, rotation: -10 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, t);
      tl.to(el, { x: -300, y: -390, scale: 0.46, rotation: -6, duration: 0.45, ease: "power3.inOut" }, t2);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, centro, pop, popSvg, fuera, sello, sacudon, vibrar, dibujar, titilar, roncar, hablar, paso, salida };
  }
  return { INK, CIR2, CIR3, NUDE, NUDE2, NUDE3, ROSA, ROSA2, ORO, ORO2, ORO3, LILA, LILA2, PIEL, PIEL2, VERDE, VERDE2, BLANCO, T, azar,
    destello, destellos, zzz, luna, sol, reloj, frascoBase, corrector, iluminador, spray, niebla, esponja, brocha, almohada,
    influencer, nestor, agente, celular, celularBorde, chatCabecera, globo, kit };
})();
