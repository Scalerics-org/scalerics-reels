// Personajes y piezas de historieta compartidos por las escenas de "El grupo de los agentes".
// Cada función devuelve un string SVG; la escena lo mete en su <svg> antes de armar el timeline.
// Todo determinista (sin random). Coordenadas en px del lienzo 1080x1920.
(function () {
  const TINTA = "#141414", PAPEL = "#fbf3dc", BLANCO = "#fffdf6";
  const AMARILLO = "#ffd60a", CIAN = "#22b8e6", MAGENTA = "#ff2d87", VERDE = "#5ce611";
  const COLOR = { pelu: MAGENTA, ferre: CIAN, pizza: AMARILLO, scalerics: VERDE };

  // trama de puntos (semitono) para sombras: <defs> con id propio de la escena
  const defs = (p) =>
    `<defs><pattern id="${p}-trama" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.4" fill="${TINTA}"/></pattern>` +
    `<pattern id="${p}-trama-f" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="2.6" fill="${TINTA}"/></pattern></defs>`;

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  // Robotito agente. Origen: entre los pies. Mide ~200 de ancho y ~300 de alto (sin accesorio).
  // o: { p (prefijo), x, y, s, kind: pelu|ferre|pizza|scalerics, cls, cara: feliz|risa|pena|serio|sorpresa }
  function robot(o) {
    const c = COLOR[o.kind] || CIAN;
    const s = o.s || 1;
    const f = o.flip ? -1 : 1;
    const bocas = {
      feliz: "M-28 -146 Q0 -124 28 -146",
      risa: "M-30 -150 Q0 -112 30 -150 Z",
      pena: "M-24 -132 Q0 -148 24 -132",
      serio: "M-22 -140 L22 -140",
      sorpresa: "M-10 -140 a10 12 0 1 0 20 0 a10 12 0 1 0 -20 0",
    };
    const cara = o.cara || "feliz";
    const boca = bocas[cara];
    const relleno = cara === "risa" || cara === "sorpresa" ? c : "none";
    let acc = "";
    if (o.kind === "pelu")
      acc = `<g class="acc"><path d="M30 -238 L78 -270 L80 -222 Z M30 -238 L-14 -272 L-12 -222 Z" fill="${AMARILLO}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/><circle cx="32" cy="-242" r="13" fill="${MAGENTA}" stroke="${TINTA}" stroke-width="6"/></g>`;
    if (o.kind === "ferre")
      acc = `<g class="acc"><path d="M-84 -226 Q-84 -300 0 -304 Q84 -300 84 -226 Z" fill="${AMARILLO}" stroke="${TINTA}" stroke-width="8" stroke-linejoin="round"/><path d="M-108 -226 H108" stroke="${TINTA}" stroke-width="12" stroke-linecap="round"/><path d="M0 -300 V-232" stroke="${TINTA}" stroke-width="6"/></g>`;
    if (o.kind === "pizza")
      acc = `<g class="acc"><path d="M-62 -226 L-58 -268 Q-96 -300 -60 -326 Q-40 -360 0 -340 Q40 -362 62 -326 Q98 -300 58 -268 L62 -226 Z" fill="${BLANCO}" stroke="${TINTA}" stroke-width="8" stroke-linejoin="round"/><path d="M-58 -248 H58" stroke="${TINTA}" stroke-width="5"/></g>`;
    if (o.kind === "scalerics")
      acc = `<g class="acc"><path d="M-100 -168 Q-100 -262 0 -262 Q100 -262 100 -168" fill="none" stroke="${TINTA}" stroke-width="10"/><rect x="-112" y="-190" width="26" height="54" rx="10" fill="${VERDE}" stroke="${TINTA}" stroke-width="6"/><rect x="86" y="-190" width="26" height="54" rx="10" fill="${VERDE}" stroke="${TINTA}" stroke-width="6"/><path d="M-100 -140 Q-90 -100 -50 -104" fill="none" stroke="${TINTA}" stroke-width="6"/></g>`;
    const antena = o.kind === "ferre" || o.kind === "pizza" ? "" : `<g class="antena"><path d="M0 -230 V-268" stroke="${TINTA}" stroke-width="7"/><circle class="bolita" cx="0" cy="-276" r="12" fill="${o.kind === "pelu" ? AMARILLO : c}" stroke="${TINTA}" stroke-width="6"/></g>`;
    const brazoI = `<g class="brazo-i"><path d="M-66 -78 Q-112 -60 -118 -18" fill="none" stroke="${TINTA}" stroke-width="20" stroke-linecap="round"/><circle cx="-118" cy="-14" r="17" fill="${c}" stroke="${TINTA}" stroke-width="6"/></g>`;
    const brazoD = `<g class="brazo-d"><path d="M66 -78 Q112 -60 118 -18" fill="none" stroke="${TINTA}" stroke-width="20" stroke-linecap="round"/><circle cx="118" cy="-14" r="17" fill="${c}" stroke="${TINTA}" stroke-width="6"/></g>`;
    const tag = o.tag ? etiqueta({ x: 0, y: 34, txt: o.tag, color: o.tagColor || BLANCO, size: o.tagSize || 26 }) : "";
    return `<g transform="translate(${o.x} ${o.y}) scale(${s * f} ${s})"><g class="robot ${o.cls || ""}">
      <g class="cuerpo-todo">
        <path d="M-40 -14 V0 M40 -14 V0" stroke="${TINTA}" stroke-width="16" stroke-linecap="round"/>
        <ellipse cx="0" cy="4" rx="78" ry="10" fill="${TINTA}" opacity="0.18"/>
        ${brazoI}${brazoD}
        <rect x="-68" y="-98" width="136" height="88" rx="26" fill="${c}" stroke="${TINTA}" stroke-width="8"/>
        <rect x="18" y="-92" width="40" height="76" rx="16" fill="url(#${o.p}-trama)" opacity="0.28"/>
        <text x="0" y="-38" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="${TINTA}" transform="scale(${f} 1)">IA</text>
        <g class="cabeza">
          ${antena}
          <rect x="-92" y="-232" width="184" height="134" rx="36" fill="${c}" stroke="${TINTA}" stroke-width="8"/>
          <rect x="52" y="-224" width="32" height="116" rx="14" fill="url(#${o.p}-trama)" opacity="0.28"/>
          <rect x="-68" y="-210" width="136" height="90" rx="24" fill="${TINTA}"/>
          <ellipse class="ojo" cx="-28" cy="-172" rx="12" ry="${cara === "risa" ? 4 : 15}" fill="${BLANCO}"/>
          <ellipse class="ojo" cx="28" cy="-172" rx="12" ry="${cara === "risa" ? 4 : 15}" fill="${BLANCO}"/>
          <path class="boca" d="${boca}" fill="${relleno}" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          ${acc}
        </g>
      </g>
    </g></g>${tag ? `<g transform="translate(${o.x} ${o.y})"><g class="tag ${o.cls ? o.cls + "-tag" : ""}">${tag}</g></g>` : ""}`;
  }

  // Cartelito con el nombre del personaje (lo de "la de la peluquería").
  function etiqueta(o) {
    const size = o.size || 26;
    const w = Math.round(o.txt.length * size * 0.66 + 40);
    const h = size + 24;
    return `<g class="etq"><rect x="${o.x - w / 2 + 6}" y="${o.y + 6}" width="${w}" height="${h}" rx="8" fill="${TINTA}"/><rect x="${o.x - w / 2}" y="${o.y}" width="${w}" height="${h}" rx="8" fill="${o.color}" stroke="${TINTA}" stroke-width="5"/><text x="${o.x}" y="${o.y + h / 2 + size * 0.36}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${size}" fill="${TINTA}" letter-spacing="1">${esc(o.txt.toUpperCase())}</text></g>`;
  }

  // El dueño del almacén: humano genérico de historieta, con bigote y delantal.
  // o: { p, x, y (pies), s, cara: cansado|apurado|feliz, cls }
  function dueno(o) {
    const s = o.s || 1;
    const cara = o.cara || "cansado";
    const boca = { cansado: "M-22 -232 Q0 -244 22 -232", apurado: "M-16 -236 a16 12 0 1 0 32 0 a16 12 0 1 0 -32 0", feliz: "M-24 -238 Q0 -218 24 -238" }[cara];
    return `<g transform="translate(${o.x} ${o.y}) scale(${s})"><g class="dueno ${o.cls || ""}">
      <ellipse cx="0" cy="4" rx="90" ry="10" fill="${TINTA}" opacity="0.18"/>
      <path d="M-46 -10 V0 M46 -10 V0" stroke="${TINTA}" stroke-width="18" stroke-linecap="round"/>
      <path d="M-86 -10 L-74 -150 Q-60 -186 0 -190 Q60 -186 74 -150 L86 -10 Z" fill="${BLANCO}" stroke="${TINTA}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-54 -10 L-50 -150 H50 L54 -10 Z" fill="${CIAN}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M10 -146 L48 -20" stroke="url(#${o.p}-trama)" stroke-width="40" opacity="0.25"/>
      <path d="M-50 -150 Q-30 -186 -18 -188 M50 -150 Q30 -186 18 -188" fill="none" stroke="${TINTA}" stroke-width="6"/>
      <rect x="-26" y="-112" width="52" height="34" rx="6" fill="${BLANCO}" stroke="${TINTA}" stroke-width="5"/>
      <g class="cabeza">
        <circle cx="0" cy="-252" r="66" fill="${BLANCO}" stroke="${TINTA}" stroke-width="8"/>
        <path d="M30 -306 A66 66 0 0 1 62 -230 L40 -236 Z" fill="url(#${o.p}-trama)" opacity="0.3"/>
        <path d="M-64 -270 Q-60 -330 0 -322 Q56 -330 64 -270 Q40 -300 0 -296 Q-36 -300 -64 -270 Z" fill="${TINTA}"/>
        <ellipse class="ojo" cx="-24" cy="-262" rx="8" ry="${cara === "cansado" ? 3 : 10}" fill="${TINTA}"/>
        <ellipse class="ojo" cx="24" cy="-262" rx="8" ry="${cara === "cansado" ? 3 : 10}" fill="${TINTA}"/>
        ${cara === "cansado" ? `<path d="M-36 -248 Q-24 -242 -12 -248 M12 -248 Q24 -242 36 -248" fill="none" stroke="${TINTA}" stroke-width="4"/>` : ""}
        <path d="M-34 -244 Q-18 -256 0 -246 Q18 -256 34 -244 Q30 -234 0 -238 Q-30 -234 -34 -244 Z" fill="${TINTA}"/>
        <path class="boca" d="${boca}" fill="${cara === "apurado" ? TINTA : "none"}" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/>
        <circle class="gota" cx="58" cy="-290" r="9" fill="${CIAN}" stroke="${TINTA}" stroke-width="4" opacity="${cara === "cansado" ? 1 : 0}"/>
      </g>
    </g></g>`;
  }

  // Globo de diálogo: rectángulo redondeado con colita hacia (cx, cy). lines: textos centrados.
  function globo(o) {
    const { x, y, w, h } = o;
    const r = o.r ?? 40;
    const size = o.size || 44;
    const tx = o.cola ? o.cola[0] : x + w / 2, ty = o.cola ? o.cola[1] : y + h + 50;
    const bx = Math.max(x + r + 10, Math.min(x + w - r - 70, tx - 30));
    const forma = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${bx + 60} L${tx} ${ty} L${bx} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
    const lh = size * 1.12;
    const y0 = y + h / 2 - ((o.lines.length - 1) * lh) / 2 + size * 0.36;
    const txt = o.lines.map((l, i) => `<text x="${x + w / 2}" y="${y0 + i * lh}" text-anchor="middle" font-family="Lexend" font-weight="${o.weight || 800}" font-size="${size}" fill="${o.ink || TINTA}">${l}</text>`).join("");
    return `<g class="globo ${o.cls || ""}"><path d="${forma}" transform="translate(8 8)" fill="${TINTA}"/><path d="${forma}" fill="${o.fill || BLANCO}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/>${txt}</g>`;
  }

  // Estrella de onomatopeya (puntas alternadas, deterministas).
  function estrella(o) {
    const n = o.n || 14, pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (Math.PI * i) / n - Math.PI / 2;
      const rr = i % 2 ? o.r2 : o.r1 * (i % 4 === 0 ? 1 : 0.86);
      pts.push(`${(o.x + Math.cos(a) * rr * (o.ax || 1)).toFixed(1)},${(o.y + Math.sin(a) * rr).toFixed(1)}`);
    }
    return pts.join(" ");
  }
  // Onomatopeya completa: estrella de color + texto grande con contorno.
  function onomato(o) {
    const size = o.size || 96;
    return `<g class="onomato ${o.cls || ""}"><polygon points="${estrella({ x: o.x + 8, y: o.y + 8, r1: o.r1, r2: o.r2, n: o.n, ax: o.ax })}" fill="${TINTA}"/><polygon points="${estrella({ x: o.x, y: o.y, r1: o.r1, r2: o.r2, n: o.n, ax: o.ax })}" fill="${o.fondo || AMARILLO}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round"/><text x="${o.x}" y="${o.y + size * 0.36}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${size}" fill="${o.color || MAGENTA}" stroke="${TINTA}" stroke-width="${Math.round(size / 9)}" paint-order="stroke fill" letter-spacing="-2" transform="rotate(${o.rot || -6} ${o.x} ${o.y})">${esc(o.txt)}</text></g>`;
  }

  // Viñeta: marco negro grueso con sombra dura. fill opcional (o trama).
  function vineta(o) {
    return `<g class="vineta ${o.cls || ""}"><rect x="${o.x + 12}" y="${o.y + 12}" width="${o.w}" height="${o.h}" fill="${TINTA}"/><rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${o.fill || BLANCO}" stroke="${TINTA}" stroke-width="10"/>${o.trama ? `<rect x="${o.x + 5}" y="${o.y + 5}" width="${o.w - 10}" height="${o.h - 10}" fill="url(#${o.p}-trama-f)" opacity="${o.trama}"/>` : ""}</g>`;
  }

  // Cartucho de narrador (rectángulo amarillo con texto mono).
  function cartucho(o) {
    const size = o.size || 32;
    const w = o.w || Math.round(o.txt.length * size * 0.66 + 48);
    return `<g class="cartucho ${o.cls || ""}"><rect x="${o.x + 8}" y="${o.y + 8}" width="${w}" height="${size + 30}" fill="${TINTA}"/><rect x="${o.x}" y="${o.y}" width="${w}" height="${size + 30}" fill="${o.fill || AMARILLO}" stroke="${TINTA}" stroke-width="6"/><text x="${o.x + w / 2}" y="${o.y + 15 + size * 0.86}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${size}" fill="${TINTA}" letter-spacing="2">${esc(o.txt.toUpperCase())}</text></g>`;
  }

  // Líneas de acción radiales (fondo de viñeta "zoom").
  function rayos(o) {
    let d = "";
    const n = o.n || 36;
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + (i % 3) * 0.02;
      const r0 = o.r0 * (i % 2 ? 1.15 : 1);
      d += `M${(o.x + Math.cos(a) * r0).toFixed(1)} ${(o.y + Math.sin(a) * r0).toFixed(1)} L${(o.x + Math.cos(a) * o.r1).toFixed(1)} ${(o.y + Math.sin(a) * o.r1).toFixed(1)} `;
    }
    return `<path class="rayos ${o.cls || ""}" d="${d}" stroke="${o.color || TINTA}" stroke-width="${o.sw || 6}" stroke-linecap="round" opacity="${o.op ?? 0.8}"/>`;
  }

  window.COMIC = { TINTA, PAPEL, BLANCO, AMARILLO, CIAN, MAGENTA, VERDE, defs, robot, dueno, etiqueta, globo, estrella, onomato, vineta, cartucho, rayos };
})();
