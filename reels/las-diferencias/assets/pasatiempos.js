// Piezas de "Las diferencias": revista de pasatiempos en papel de diario.
// En cada escena: <script src="assets/pasatiempos.js"></script>, armar el SVG con PA.* y en el script
// const K = PA.kit(tl, root).
window.PA = window.PA || (function () {
  const INK = "#1c1a17", PAP = "#ece3cc", PAP2 = "#f6f0de", PAP3 = "#d6c9a8", ROJO = "#d62828", ROJO2 = "#a51d1d",
    AZUL = "#1f4fbf", AZUL2 = "#163a8c", AMA = "#ffe14a", AMA2 = "#e8c626", VERDE = "#5ce611", VERDE2 = "#3f9e0b",
    PIEL = "#f0c8a0", PIEL2 = "#e0ad86", PELO = "#3b2f27", CANA = "#8d857a";
  if (!document.getElementById("pa-css")) {
    const st = document.createElement("style");
    st.id = "pa-css";
    st.textContent = `
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
@font-face { font-family: "Special Elite"; font-weight: 400; font-display: block; src: url("assets/fonts/SpecialElite.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Black Ops One"; font-weight: 400; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
.pa-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 4px; border: 9px solid ${ROJO}; border-radius: 12px; color: ${ROJO};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(246, 240, 222, 0.92); }
.pa-sello.azul { border-color: ${AZUL}; color: ${AZUL}; }
.pa-sello.verde { border-color: ${VERDE2}; color: ${VERDE2}; }
.pa-tag { position: absolute; box-sizing: border-box; padding: 12px 24px 10px; background: ${INK}; border-radius: 4px; box-shadow: 6px 6px 0 ${ROJO};
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.14em; color: ${PAP2}; white-space: nowrap; text-align: center; }
.pa-tag.ama { background: ${AMA}; color: ${INK}; box-shadow: 6px 6px 0 ${INK}; }
.pa-tag.verde { background: ${VERDE}; color: ${INK}; box-shadow: 6px 6px 0 ${INK}; }
.pa-titulo { position: absolute; font-family: "Cormorant Garamond", serif; font-weight: 600; color: ${INK}; white-space: nowrap; text-align: center; line-height: 0.95; letter-spacing: -0.01em; }
.pa-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; white-space: nowrap; line-height: 1; }
.pa-globo { position: absolute; box-sizing: border-box; padding: 14px 28px 12px; background: ${PAP2}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 6px 6px 0 rgba(28, 26, 23, 0.85); }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;
  function azar(seed) { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }
  const txt = (x, y, s, o) => `<text data-layout-ignore x="${x}" y="${y}" text-anchor="${o.a || "middle"}" font-family="${o.f || "Lexend"}" font-weight="${o.w || 700}" font-size="${o.fs || 30}" fill="${o.c || INK}"${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ""}>${s}</text>`;

  // CÍRCULO DE BIROME (rojo, a mano alzada, se pasa un poco del cierre). Dibujar con K.dibujar.
  function circulo(cx, cy, rx, ry, o) {
    o = o || {};
    const a = (o.giro || -8) * Math.PI / 180;
    const p = [];
    for (let k = 0; k <= 44; k++) {
      const t = -0.5 + (k / 40) * Math.PI * 2;
      const wob = 1 + Math.sin(t * 3 + 1) * 0.035 + (k > 38 ? 0.07 : 0);
      const x = Math.cos(t) * rx * wob, y = Math.sin(t) * ry * wob;
      p.push(`${(cx + x * Math.cos(a) - y * Math.sin(a)).toFixed(1)} ${(cy + x * Math.sin(a) + y * Math.cos(a)).toFixed(1)}`);
    }
    return `<path class="pa-circ ${o.cls || ""}" d="M${p.join(" L")}" fill="none" stroke="${o.color || ROJO}" stroke-width="${o.sw || 9}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  // TILDE / CRUZ de birome
  function tilde(x, y, s, o) {
    o = o || {};
    return `<path class="${o.cls || ""}" d="M${x - 30 * s} ${y} L${x - 8 * s} ${y + 24 * s} L${x + 36 * s} ${y - 30 * s}" fill="none" stroke="${o.color || VERDE2}" stroke-width="${10 * Math.max(0.6, s)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function cruz(x, y, s, o) {
    o = o || {};
    return `<path class="${o.cls || ""}" d="M${x - 26 * s} ${y - 26 * s} L${x + 26 * s} ${y + 26 * s} M${x + 26 * s} ${y - 26 * s} L${x - 26 * s} ${y + 26 * s}" fill="none" stroke="${o.color || ROJO}" stroke-width="${10 * Math.max(0.6, s)}" stroke-linecap="round"/>`;
  }

  // ---------- LA LÁMINA: el mismo local de ropa, dibujado en un recuadro de 940x440 ----------
  // v = { nombre, stock, precio, caja ("ok" | "mal"), pagos (1 | 2), vip (true | false) }
  // Centros de cada diferencia (coordenadas del recuadro): ver PA.D
  const D = { stock: [140, 300, 96, 62], precio: [312, 228, 78, 48], caja: [512, 150, 96, 46], factura: [722, 120, 82, 92], lucia: [858, 190, 74, 150] };
  function lamina(x, y, v, o) {
    o = o || {};
    const W = 940, H = 440;
    const id = o.id || "la";
    const campera = (cx, cy, fill, k) => `<g class="pa-campera">
        <path d="M${cx} ${cy - 12} L${cx} ${cy - 30} Q${cx} ${cy - 44} ${cx + 12} ${cy - 44}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${cx - 34} ${cy - 6} L${cx - 14} ${cy - 12} Q${cx} ${cy - 2} ${cx + 14} ${cy - 12} L${cx + 34} ${cy - 6} L${cx + 50} ${cy + 100} L${cx + 34} ${cy + 104} L${cx + 30} ${cy + 40} L${cx + 30} ${cy + 118} L${cx - 30} ${cy + 118} L${cx - 30} ${cy + 40} L${cx - 34} ${cy + 104} L${cx - 50} ${cy + 100} Z" fill="${fill}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M${cx} ${cy - 4} L${cx} ${cy + 116}" stroke="${INK}" stroke-width="3" stroke-dasharray="${k ? "6 6" : "0"}"/>
        <path d="M${cx - 14} ${cy - 12} L${cx - 4} ${cy + 18} M${cx + 14} ${cy - 12} L${cx + 4} ${cy + 18}" stroke="${INK}" stroke-width="3"/>
      </g>`;
    const sellos = (n) => {
      let s = `<g transform="rotate(-14 722 140)"><rect x="672" y="122" width="100" height="34" rx="4" fill="none" stroke="${ROJO}" stroke-width="4"/>${txt(722, 148, "PAGADO", { f: "Black Ops One", w: 400, fs: 22, c: ROJO })}</g>`;
      if (n > 1) s += `<g class="pa-pago2" transform="rotate(10 726 96)"><rect x="676" y="78" width="100" height="34" rx="4" fill="none" stroke="${ROJO}" stroke-width="4"/>${txt(726, 104, "PAGADO", { f: "Black Ops One", w: 400, fs: 22, c: ROJO })}</g>`;
      return s;
    };
    let lu = lucia(850, 400, 0.38, { cara: v.vip ? "feliz" : "enojada", pequena: true });
    const vip = v.vip
      ? `<g class="pa-vip"><path d="M818 92 L830 62 L846 82 L858 54 L870 82 L886 62 L898 92 Z" fill="${AMA}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
          <rect x="820" y="96" width="76" height="30" rx="6" fill="${INK}"/>${txt(858, 119, "VIP", { fs: 22, w: 900, c: AMA, ls: 3 })}</g>`
      : `<g class="pa-vip"><path d="M806 56 L912 56 Q922 56 922 66 L922 104 Q922 114 912 114 L870 114 L856 130 L852 114 L806 114 Q796 114 796 104 L796 66 Q796 56 806 56 Z" fill="${PAP2}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>${txt(859, 95, "¿NOMBRE?", { fs: 20, w: 800 })}</g>`;
    return `<g transform="translate(${x} ${y})"><g class="pa-lam pa-lam-${id}">
      <rect x="6" y="8" width="${W}" height="${H}" fill="${INK}" opacity="0.9"/>
      <rect x="0" y="0" width="${W}" height="${H}" fill="${PAP2}" stroke="${INK}" stroke-width="6"/>
      <!-- pared con tramado y piso -->
      <g opacity="0.22">${Array.from({ length: 22 }, (_, k) => `<path d="M${20 + k * 44} 6 L${20 + k * 44} 352" stroke="${INK}" stroke-width="2"/>`).join("")}</g>
      <rect x="3" y="352" width="${W - 6}" height="${H - 355}" fill="${PAP3}"/>
      <path d="M3 352 L${W - 3} 352" stroke="${INK}" stroke-width="5"/>
      ${Array.from({ length: 8 }, (_, k) => k + 1).map((k) => `<path d="M${k * 104 - 20} 437 L${k * 104 + 40} 354" stroke="${INK}" stroke-width="2" opacity="0.4"/>`).join("")}
      <!-- perchero con tres camperas -->
      <g class="pa-perchero">
        <path d="M50 70 L330 70 M60 70 L60 352 M320 70 L320 352" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        ${campera(110, 88, AZUL, 1)}${campera(190, 88, PAP3, 0)}${campera(270, 88, ROJO, 1)}
      </g>
      <!-- cartel de stock sobre una caja -->
      <g class="pa-stock">
        <rect x="80" y="264" width="120" height="88" fill="${PAP3}" stroke="${INK}" stroke-width="5"/>
        <path d="M80 292 L200 292" stroke="${INK}" stroke-width="3"/>
        <rect x="88" y="214" width="104" height="70" rx="4" fill="${PAP2}" stroke="${INK}" stroke-width="5" transform="rotate(-4 140 249)"/>
        ${txt(140, 233, "STOCK", { f: "IBM Plex Mono", w: 600, fs: 15, ls: 2, rot: -4 })}
        ${txt(140, 276, String(v.stock), { fs: 42, w: 900, c: INK, rot: -4 })}
      </g>
      <!-- etiqueta de precio colgando de la campera roja -->
      <g class="pa-precio">
        <path d="M296 150 L306 200" stroke="${INK}" stroke-width="3"/>
        <g transform="rotate(8 312 228)"><path d="M244 206 L356 206 L374 228 L356 250 L244 250 Z" fill="${AMA}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="358" cy="228" r="5" fill="${PAP2}" stroke="${INK}" stroke-width="3"/>
        ${txt(298, 237, "$ " + v.precio, { fs: 24, w: 900 })}</g>
      </g>
      <!-- mostrador y caja registradora -->
      <g class="pa-mostrador">
        <rect x="380" y="240" width="270" height="112" fill="${PAP3}" stroke="${INK}" stroke-width="6"/>
        <path d="M380 262 L650 262" stroke="${INK}" stroke-width="4"/>
        ${Array.from({ length: 5 }, (_, k) => `<path d="M${410 + k * 52} 280 L${410 + k * 52} 340" stroke="${INK}" stroke-width="2" opacity="0.5"/>`).join("")}
      </g>
      <g class="pa-caja">
        <path d="M430 240 L446 186 L578 186 L594 240 Z" fill="${INK}"/>
        <rect x="452" y="194" width="120" height="30" rx="3" fill="${PAP3}" opacity="0.5"/>
        ${Array.from({ length: 8 }, (_, k) => `<circle cx="${466 + (k % 4) * 30}" cy="${202 + Math.floor(k / 4) * 16}" r="5" fill="${PAP2}"/>`).join("")}
        <rect x="468" y="166" width="88" height="22" fill="${INK}"/>
        <rect x="448" y="126" width="128" height="46" rx="6" fill="${v.caja === "ok" ? PAP2 : AMA}" stroke="${INK}" stroke-width="5"/>
        ${txt(512, 158, v.caja === "ok" ? "CIERRA" : "− 800", { f: "IBM Plex Mono", w: 600, fs: 24, c: v.caja === "ok" ? INK : ROJO2 })}
      </g>
      <!-- corcho con la factura del proveedor -->
      <g class="pa-factura">
        <rect x="652" y="34" width="140" height="176" fill="${PAP3}" stroke="${INK}" stroke-width="5"/>
        <rect x="670" y="50" width="104" height="146" fill="${PAP2}" stroke="${INK}" stroke-width="3"/>
        ${txt(722, 70, "FACTURA", { f: "IBM Plex Mono", w: 600, fs: 13, ls: 2 })}
        ${[86, 172, 184].map((yy) => `<path d="M682 ${yy} L762 ${yy}" stroke="${INK}" stroke-width="3" opacity="0.5"/>`).join("")}
        <circle cx="722" cy="40" r="7" fill="${ROJO}" stroke="${INK}" stroke-width="3"/>
        ${sellos(v.pagos)}
      </g>
      <!-- Lucía, la clienta -->
      <g class="pa-lucia">${lu}${vip}</g>
      ${o.extra || ""}
    </g></g>`;
  }
  // PRENDA suelta (campera roja con etiqueta de precio): centro del cuello (x, y), escala s
  function prenda(x, y, s, precio, o) {
    o = o || {};
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${o.cls || "pa-prenda"}">
      <path d="M0 -12 L0 -30 Q0 -44 12 -44" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-34 -6 L-14 -12 Q0 -2 14 -12 L34 -6 L50 100 L34 104 L30 40 L30 118 L-30 118 L-30 40 L-34 104 L-50 100 Z" fill="${o.fill || ROJO}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M0 -4 L0 116" stroke="${INK}" stroke-width="3" stroke-dasharray="6 6"/>
      <path d="M-14 -12 L-4 18 M14 -12 L4 18" stroke="${INK}" stroke-width="3"/>
      <path d="M40 60 L58 96" stroke="${INK}" stroke-width="2.5"/>
      <g transform="rotate(10 82 112)"><path d="M30 96 L122 96 L138 114 L122 132 L30 132 Z" fill="${AMA}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      ${txt(80, 122, "$ " + precio, { fs: 21, w: 900 })}</g>
    </g></g>`;
  }
  // etiqueta del recuadro ("A · CENTRO")
  function rotulo(x, y, letra, nombre, color) {
    return `<g class="pa-rotulo">
      <rect x="${x}" y="${y}" width="${54 + nombre.length * 21}" height="50" fill="${color || INK}"/>
      <circle cx="${x + 26}" cy="${y + 25}" r="17" fill="${PAP2}"/>
      ${txt(x + 26, y + 34, letra, { fs: 26, w: 900, c: color || INK })}
      ${txt(x + 54, y + 35, nombre, { f: "IBM Plex Mono", w: 600, fs: 28, c: PAP2, a: "start", ls: 2 })}
    </g>`;
  }

  // ---------- PERSONAJES (origen = centro de la base del torso, cabeza en (0,-360)) ----------
  // LA PROFE: rodete con lápiz, lentes con cadenita, cárdigan rojo. o.birome: brazo levantado con birome roja.
  function profe(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const boca = cara === "feliz" ? `<path class="pa-p-boca" d="M-30 -282 Q0 -246 30 -282 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "picara" ? `<path class="pa-p-boca" d="M-28 -276 Q6 -258 30 -284" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<ellipse class="pa-p-boca" cx="0" cy="-274" rx="20" ry="10" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`;
    const brazo = o.birome ? `<g class="pa-p-brazo">
        <path d="M170 -170 C240 -230 250 -310 230 -400" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M170 -170 C240 -230 250 -310 230 -400" fill="none" stroke="${ROJO}" stroke-width="52" stroke-linecap="round"/>
        <g class="pa-p-birome" transform="rotate(18 232 -440)">
          <rect x="220" y="-560" width="26" height="150" rx="6" fill="${PAP2}" stroke="${INK}" stroke-width="5"/>
          <rect x="220" y="-560" width="26" height="30" rx="6" fill="${ROJO}" stroke="${INK}" stroke-width="5"/>
          <path d="M222 -410 L233 -380 L244 -410 Z" fill="${INK}"/>
        </g>
        <circle cx="232" cy="-430" r="32" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pa-p">
      <path d="M-235 40 C-238 -110 -195 -200 -95 -222 L95 -222 C195 -200 238 -110 235 40 Z" fill="${ROJO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-80 -222 L0 -110 L80 -222 Z" fill="${PAP2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-60 -170 L-40 -40 M60 -170 L40 -40" stroke="${INK}" stroke-width="5" opacity="0.6"/>
      ${[-110, -60, -10].map((yy) => `<circle cx="-30" cy="${yy}" r="7" fill="${PAP2}" stroke="${INK}" stroke-width="3"/>`).join("")}
      <path d="M-36 -272 L-40 -212 L40 -212 L36 -272 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      ${brazo}
      <g class="pa-p-cabeza">
        <!-- rodete y lápiz -->
        <circle cx="0" cy="-505" r="58" fill="${CANA}" stroke="${INK}" stroke-width="8"/>
        <path d="M-30 -520 Q0 -545 30 -520 M-36 -495 Q0 -470 36 -495" fill="none" stroke="${INK}" stroke-width="4" opacity="0.6"/>
        <g transform="rotate(-28 0 -505)"><rect x="-90" y="-516" width="180" height="20" fill="${AMA}" stroke="${INK}" stroke-width="5"/><path d="M90 -516 L118 -506 L90 -496 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><rect x="-104" y="-516" width="16" height="20" fill="${ROJO}" stroke="${INK}" stroke-width="4"/></g>
        <path d="M-100 -380 C-104 -468 104 -468 100 -380 L96 -318 C90 -258 48 -236 0 -236 C-48 -236 -90 -258 -96 -318 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-104 -380 C-112 -470 -40 -486 0 -470 C40 -486 112 -470 104 -380 C80 -420 40 -432 0 -420 C-40 -432 -80 -420 -104 -380 Z" fill="${CANA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path class="pa-p-cejas" d="M-74 -394 L-28 -400 M74 -394 L28 -400" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
        <g class="pa-p-ojos"><circle cx="-50" cy="-358" r="9" fill="${INK}"/><circle cx="50" cy="-358" r="9" fill="${INK}"/></g>
        <!-- lentes con cadenita -->
        <circle cx="-50" cy="-358" r="32" fill="${PAP2}" fill-opacity="0.25" stroke="${INK}" stroke-width="7"/>
        <circle cx="50" cy="-358" r="32" fill="${PAP2}" fill-opacity="0.25" stroke="${INK}" stroke-width="7"/>
        <path d="M-18 -362 Q0 -372 18 -362" fill="none" stroke="${INK}" stroke-width="6"/>
        <path d="M-82 -356 Q-108 -280 -84 -224 M82 -356 Q108 -280 84 -224" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="3 6" stroke-linecap="round"/>
        <path d="M0 -340 C-10 -316 -16 -306 -2 -302" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="-64" cy="-300" r="14" fill="${ROJO}" opacity="0.25"/><circle cx="64" cy="-300" r="14" fill="${ROJO}" opacity="0.25"/>
        ${boca}
      </g>
    </g></g>`;
  }

  // EL DUEÑO: pelado con costados canosos, bigote, camisa azul. o.cara: neutra | sobrado | confundido | feliz | rendido
  // o.birome: brazo levantado con birome azul.
  function dueno(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const ojos = cara === "feliz" ? `<path d="M-70 -346 Q-50 -370 -30 -346 M70 -346 Q50 -370 30 -346" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "sobrado" ? `<path d="M-72 -350 L-30 -350 M30 -350 L72 -350" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="-46" cy="-344" r="8" fill="${INK}"/><circle cx="54" cy="-344" r="8" fill="${INK}"/>`
      : cara === "confundido" ? `<circle cx="-50" cy="-350" r="10" fill="${INK}"/><circle cx="50" cy="-350" r="16" fill="${PAP2}" stroke="${INK}" stroke-width="5"/><circle cx="52" cy="-350" r="6" fill="${INK}"/>`
      : cara === "rendido" ? `<path d="M-72 -344 Q-50 -334 -28 -344 M72 -344 Q50 -334 28 -344" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<circle cx="-50" cy="-350" r="11" fill="${INK}"/><circle cx="50" cy="-350" r="11" fill="${INK}"/>`;
    const cejas = cara === "sobrado" ? "M-76 -388 L-30 -380 M76 -398 L30 -384"
      : cara === "confundido" ? "M-76 -380 L-30 -392 M76 -404 L30 -390"
      : cara === "rendido" ? "M-76 -372 L-30 -386 M76 -372 L30 -386"
      : "M-76 -384 L-30 -392 M76 -384 L30 -392";
    const boca = cara === "feliz" ? `<path class="pa-d-boca" d="M-44 -282 Q0 -226 44 -282 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "sobrado" ? `<path class="pa-d-boca" d="M-30 -270 Q10 -258 36 -284" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "confundido" ? `<ellipse class="pa-d-boca" cx="6" cy="-266" rx="14" ry="12" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`
      : cara === "rendido" ? `<path class="pa-d-boca" d="M-26 -262 Q0 -276 26 -262" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<ellipse class="pa-d-boca" cx="0" cy="-268" rx="18" ry="9" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`;
    const brazo = o.birome ? `<g class="pa-d-brazo">
        <path d="M-170 -190 C-230 -250 -240 -330 -220 -420" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
        <path d="M-170 -190 C-230 -250 -240 -330 -220 -420" fill="none" stroke="${AZUL}" stroke-width="52" stroke-linecap="round"/>
        <g class="pa-d-birome" transform="rotate(-16 -220 -460)">
          <rect x="-233" y="-580" width="26" height="150" rx="6" fill="${PAP2}" stroke="${INK}" stroke-width="5"/>
          <rect x="-233" y="-580" width="26" height="30" rx="6" fill="${AZUL}" stroke="${INK}" stroke-width="5"/>
          <path d="M-231 -430 L-220 -400 L-209 -430 Z" fill="${INK}"/>
        </g>
        <circle cx="-220" cy="-440" r="32" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pa-d">
      <path d="M-245 40 C-245 -110 -185 -205 -80 -222 L80 -222 C185 -205 245 -110 245 40 Z" fill="${AZUL}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-80 -222 L-20 -150 L0 -200 L20 -150 L80 -222 Z" fill="${PAP2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      ${[-120, -60, 0].map((yy) => `<circle cx="0" cy="${yy}" r="7" fill="${PAP2}" stroke="${INK}" stroke-width="3"/>`).join("")}
      <rect x="90" y="-150" width="70" height="60" fill="none" stroke="${INK}" stroke-width="5" opacity="0.6"/>
      <rect x="112" y="-176" width="12" height="44" rx="3" fill="${AZUL2}" stroke="${INK}" stroke-width="3"/>
      <path d="M-42 -275 L-46 -212 L46 -212 L42 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      ${brazo}
      <g class="pa-d-cabeza">
        <ellipse cx="-112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="112" cy="-345" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-110 -390 C-114 -510 114 -510 110 -390 L106 -315 C98 -250 55 -228 0 -228 C-55 -228 -98 -250 -106 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-112 -425 C-132 -400 -130 -355 -110 -335 L-100 -335 L-98 -425 Z M112 -425 C132 -400 130 -355 110 -335 L100 -335 L98 -425 Z" fill="${CANA}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-40 -478 Q0 -492 40 -480" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        <path class="pa-d-cejas" d="${cejas}" stroke="${PELO}" stroke-width="13" stroke-linecap="round"/>
        <g class="pa-d-ojos">${ojos}</g>
        <path d="M0 -345 C-12 -310 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-70 -292 C-45 -318 -14 -310 0 -298 C14 -310 45 -318 70 -292 C45 -280 15 -282 0 -288 C-15 -282 -45 -280 -70 -292 Z" fill="${PELO}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
        ${boca}
        <path class="pa-d-gota" d="M108 -430 C98 -410 96 -396 108 -392 C120 -396 118 -410 108 -430 Z" fill="#8fd3ff" stroke="${INK}" stroke-width="4" opacity="${o.gota ? 1 : 0}"/>
      </g>
    </g></g>`;
  }

  // LUCÍA, la clienta: cola de caballo, buzo amarillo, aros. o.cara: neutra | enojada | feliz
  function lucia(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "neutra";
    const cejas = cara === "enojada" ? "M-72 -392 L-28 -376 M72 -392 L28 -376" : "M-72 -392 L-30 -398 M72 -392 L30 -398";
    const ojos = cara === "feliz" ? `<path d="M-66 -350 Q-48 -370 -30 -350 M66 -350 Q48 -370 30 -350" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : `<circle cx="-48" cy="-352" r="11" fill="${INK}"/><circle cx="48" cy="-352" r="11" fill="${INK}"/><path d="M-66 -366 L-74 -374 M66 -366 L74 -374" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    const boca = cara === "enojada" ? `<path class="pa-l-boca" d="M-32 -268 Q0 -298 32 -268 Q0 -250 -32 -268 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "feliz" ? `<path class="pa-l-boca" d="M-32 -284 Q0 -246 32 -284 Z" fill="#7a1420" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : `<ellipse class="pa-l-boca" cx="0" cy="-272" rx="18" ry="10" fill="#7a1420" stroke="${INK}" stroke-width="5"/>`;
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="pa-l">
      <!-- cola de caballo -->
      <path class="pa-l-cola" d="M90 -440 C190 -450 220 -340 180 -250 C170 -300 150 -350 96 -380 Z" fill="${PELO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-225 40 C-228 -110 -185 -200 -90 -220 L90 -220 C185 -200 228 -110 225 40 Z" fill="${AMA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-70 -220 Q0 -170 70 -220" fill="none" stroke="${INK}" stroke-width="7"/>
      <path d="M-150 -40 L-150 40 M150 -40 L150 40" stroke="${INK}" stroke-width="5" opacity="0.5"/>
      <path d="M-34 -268 L-38 -212 L38 -212 L34 -268 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="pa-l-cabeza">
        <path d="M-98 -380 C-102 -466 102 -466 98 -380 L94 -318 C88 -258 46 -236 0 -236 C-46 -236 -88 -258 -94 -318 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <path d="M-104 -360 C-120 -470 -30 -500 20 -478 C90 -470 120 -420 104 -360 C90 -400 60 -420 10 -424 C-30 -400 -70 -390 -104 -360 Z" fill="${PELO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="-100" cy="-300" r="12" fill="${AMA}" stroke="${INK}" stroke-width="4"/><circle cx="100" cy="-300" r="12" fill="${AMA}" stroke="${INK}" stroke-width="4"/>
        <path class="pa-l-cejas" d="${cejas}" stroke="${PELO}" stroke-width="10" stroke-linecap="round"/>
        <g class="pa-l-ojos">${ojos}</g>
        <path d="M0 -340 C-8 -318 -14 -306 -2 -302" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="-62" cy="-300" r="14" fill="${ROJO}" opacity="0.22"/><circle cx="62" cy="-300" r="14" fill="${ROJO}" opacity="0.22"/>
        ${boca}
      </g>
    </g></g>`;
  }

  // CRONÓMETRO de pasatiempo: centro (x, y), radio r. Aguja .pa-crono-aguja (rotar con svgOrigin "x y").
  function crono(x, y, r) {
    let marcas = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      marcas += `<line x1="${x + Math.sin(a) * r * 0.74}" y1="${y - Math.cos(a) * r * 0.74}" x2="${x + Math.sin(a) * r * 0.88}" y2="${y - Math.cos(a) * r * 0.88}" stroke="${INK}" stroke-width="${k % 3 ? 4 : 8}" stroke-linecap="round"/>`;
    }
    return `<g class="pa-crono">
      <rect x="${x - 18}" y="${y - r - 40}" width="36" height="30" rx="5" fill="${INK}"/>
      <rect x="${x - 34}" y="${y - r - 54}" width="68" height="20" rx="6" fill="${ROJO}" stroke="${INK}" stroke-width="5"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${PAP2}" stroke="${INK}" stroke-width="10"/>
      <path class="pa-crono-sector" d="M${x} ${y} L${x} ${y - r + 14} A${r - 14} ${r - 14} 0 0 1 ${x + (r - 14) * Math.sin(Math.PI / 3)} ${y - (r - 14) * Math.cos(Math.PI / 3)} Z" fill="${ROJO}" opacity="0.18"/>
      ${marcas}
      <line class="pa-crono-aguja" x1="${x}" y1="${y + r * 0.12}" x2="${x}" y2="${y - r * 0.72}" stroke="${ROJO}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>
    </g>`;
  }

  // PAPELITOS de diario que caen (festejo): clase .pa-papelitos (cada uno .pa-pp)
  function papelitos(x, y, w, h, n, seed, verde) {
    const rnd = azar(seed || 3);
    const cols = verde ? [VERDE, PAP2, AMA, VERDE2] : [PAP2, AMA, ROJO, PAP3];
    let s = "";
    for (let k = 0; k < n; k++) {
      const cx = Math.round(x + rnd() * w), cy = Math.round(y + rnd() * h), rot = Math.round(rnd() * 180);
      s += `<rect class="pa-pp" x="${cx}" y="${cy}" width="${16 + Math.round(rnd() * 12)}" height="${26 + Math.round(rnd() * 14)}" fill="${cols[k % 4]}" stroke="${INK}" stroke-width="2" transform="rotate(${rot} ${cx} ${cy})"/>`;
    }
    return `<g class="pa-papelitos">${s}</g>`;
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
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.5, ease: ease || "power2.inOut" }, t);
    }
    // texto escrito a mano (HTML): se descubre de izquierda a derecha
    function escribir(el, t, d) {
      gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)" });
      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.5, ease: "none" }, t);
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    function lluvia(sel, t, d, caida) {
      qa(sel + " .pa-pp").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { y: -400 - (i % 7) * 60, opacity: 0 }, { y: caida || 600, opacity: 1, duration: d || 1.6, ease: "power1.in", immediateRender: false }, t + (i % 9) * 0.05);
      });
    }
    // zoom de cámara sobre un contenedor HTML: lleva el punto (px, py) al centro (cx, cy) con escala s
    function camara(el, t, px, py, s, d, cx, cy) {
      cx = cx ?? 540; cy = cy ?? 1040;
      tl.to(el, { x: cx - px * s, y: cy - py * s, scale: s, transformOrigin: "0px 0px", duration: d || 0.6, ease: "power3.inOut" }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, sello, sacudon, dibujar, escribir, hablar, lluvia, camara, salida };
  }
  return { INK, PAP, PAP2, PAP3, ROJO, ROJO2, AZUL, AZUL2, AMA, AMA2, VERDE, VERDE2, PIEL, PIEL2, PELO, CANA, D, T, txt, azar, prenda, circulo, tilde, cruz, lamina, rotulo, profe, dueno, lucia, crono, papelitos, kit };
})();
