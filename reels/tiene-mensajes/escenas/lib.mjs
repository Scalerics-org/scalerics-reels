// Piezas comunes de las escenas de "Tiene mensajes": el molde de cada composición, el
// contestador, el display de 7 segmentos, los post-its, la onda de audio, la foto carnet y los
// personajes dibujados (Graciela, Ernesto, la novia, el pibe, el dueño).
// Los usa escenas/hacer.mjs para escribir compositions/sNN-*.html.

export const C = {
  noche: "#17110c", madera: "#5a3a24", beige: "#d8ccb0", crema: "#f6ecd8",
  rojo: "#ff3b2a", am: "#ffd84a", verdeo: "#1f3328", verde: "#5ce611",
  lcd: "#2a0f0b",
};
const { noche, madera, beige, crema, rojo, am, verdeo, lcd } = C;

// borde festoneado alrededor de una elipse (rulos, nubes)
export function nube(cx, cy, rx, ry, n, amp, desde = 0) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = desde + (i / n) * Math.PI * 2;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const a = desde + ((i - 0.5) / n) * Math.PI * 2;
    const k = [cx + Math.cos(a) * (rx + amp), cy + Math.sin(a) * (ry + amp)];
    d += ` Q${k[0].toFixed(1)} ${k[1].toFixed(1)} ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
  }
  return d + " Z";
}

// ---------- display de 7 segmentos ----------
const SEG = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "" };
function segs(x, y, w, h, t) {
  const m = h / 2;
  return {
    a: [x + t * 0.6, y, w - t * 1.2, t], g: [x + t * 0.6, y + m - t / 2, w - t * 1.2, t], d: [x + t * 0.6, y + h - t, w - t * 1.2, t],
    f: [x, y + t * 0.6, t, m - t * 0.9], b: [x + w - t, y + t * 0.6, t, m - t * 0.9],
    e: [x, y + m + t * 0.3, t, m - t * 0.9], c: [x + w - t, y + m + t * 0.3, t, m - t * 0.9],
  };
}
const rects = (x, y, w, h, t, cuales, fill) => {
  const S = segs(x, y, w, h, t);
  return [...cuales].map((k) => `<rect x="${S[k][0].toFixed(1)}" y="${S[k][1].toFixed(1)}" width="${S[k][2].toFixed(1)}" height="${S[k][3].toFixed(1)}" rx="${(t / 2.4).toFixed(1)}" fill="${fill}" />`).join("");
};
// texto de dígitos (ej. "14") en x,y con alto h. Fantasma "88" apagado + un grupo por valor.
export function lcdDigitos(p, valores, x, y, h, { color = rojo, apagado = "rgba(255,59,42,0.13)" } = {}) {
  const w = h * 0.56, t = h * 0.13, gap = h * 0.2;
  const n = Math.max(...valores.map((v) => String(v).length));
  const sk = `transform="skewX(-7)" style="transform-box: fill-box"`;
  let fantasma = "";
  for (let i = 0; i < n; i++) fantasma += rects(x + i * (w + gap), y, w, h, t, "abcdefg", apagado);
  const grupos = valores.map((v, k) => {
    const s = String(v).padStart(n, " ");
    let r = "";
    for (let i = 0; i < n; i++) r += rects(x + i * (w + gap), y, w, h, t, SEG[s[i]] ?? "", color);
    return `<g class="${p}-v${k}" opacity="${k === 0 ? 1 : 0}">${r}</g>`;
  }).join("");
  return `<g ${sk}>${fantasma}${grupos}</g>`;
}

// ---------- el contestador (centrado en 0,0; ancho 720, alto ~360) ----------
// clases: p-cuerpo, p-luz, p-halo, p-r1 / p-r2 (carretes, girar con svgOrigin R1 / R2), p-play, p-v<i>
export const R1 = "-235 -18", R2 = "-75 -18";
const carrete = (cls, cx, cy, r) => `<g class="${cls}">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${beige}" stroke="${noche}" stroke-width="5" />
  <circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="${noche}" />
  ${[0, 60, 120, 180, 240, 300].map((a) => { const rad = (a * Math.PI) / 180; return `<path d="M${(cx + Math.cos(rad) * r * 0.42).toFixed(1)} ${(cy + Math.sin(rad) * r * 0.42).toFixed(1)} L${(cx + Math.cos(rad) * r * 0.86).toFixed(1)} ${(cy + Math.sin(rad) * r * 0.86).toFixed(1)}" stroke="${noche}" stroke-width="7" stroke-linecap="round" />`; }).join("")}
  <circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="${beige}" />
</g>`;
export const contestador = (p, valores = ["14"]) => `
<g class="${p}">
  <ellipse cx="0" cy="190" rx="380" ry="28" fill="${noche}" opacity="0.55" />
  <g class="${p}-cuerpo">
  <path d="M-330 -120 L-296 -176 H296 L330 -120 Z" fill="${crema}" stroke="${noche}" stroke-width="6" stroke-linejoin="round" />
  <rect x="-360" y="-122" width="720" height="300" rx="34" fill="${beige}" stroke="${noche}" stroke-width="6" />
  <path d="M-330 150 H330" stroke="${noche}" stroke-width="3" opacity="0.25" />
  <!-- casete -->
  <rect x="-326" y="-96" width="342" height="160" rx="16" fill="${noche}" />
  <rect x="-310" y="-82" width="310" height="132" rx="10" fill="${madera}" stroke="${beige}" stroke-width="3" />
  <rect x="-280" y="-74" width="250" height="26" rx="4" fill="${crema}" />
  <text x="-155" y="-54" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="26" fill="${noche}">mensajes</text>
  <path d="M-266 20 Q-155 44 -44 20" stroke="${noche}" stroke-width="5" fill="none" />
  ${carrete(`${p}-r1`, -235, -18, 40)}
  ${carrete(`${p}-r2`, -75, -18, 40)}
  <!-- display -->
  <rect x="60" y="-96" width="250" height="140" rx="14" fill="${lcd}" stroke="${noche}" stroke-width="6" />
  ${lcdDigitos(p, valores, 110, -76, 100)}
  <text x="185" y="72" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${noche}" letter-spacing="4">MENSAJES</text>
  <!-- luz -->
  <circle class="${p}-halo" cx="34" cy="-140" r="26" fill="${rojo}" opacity="0.25" />
  <circle class="${p}-luz" cx="34" cy="-140" r="13" fill="${rojo}" stroke="${noche}" stroke-width="3" />
  <text x="-20" y="-132" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="20" fill="${noche}" letter-spacing="3">NUEVOS</text>
  <!-- teclas -->
  ${["PLAY", "STOP", "<<", ">>", "BORRAR"].map((l, i) => `<g class="${p}-t${i}${i === 0 ? ` ${p}-play` : ""}"><rect x="${-330 + i * 134}" y="96" width="120" height="44" rx="10" fill="${i === 0 ? am : crema}" stroke="${noche}" stroke-width="4" />
  <text x="${-270 + i * 134}" y="126" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${noche}" letter-spacing="2">${l.replace("<", "&lt;")}</text></g>`).join("")}
  </g>
</g>`;

// ---------- post-it (x, y = centro) ----------
export const postit = (cls, x, y, rot, texto, { w = 210, size = 40, color = am } = {}) => {
  const l = texto.split("|");
  const h = Math.max(w * 0.86, 40 + l.length * size * 1.05);
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${cls}">
    <rect x="${-w / 2 + 6}" y="${-h / 2 + 8}" width="${w}" height="${h}" fill="${noche}" opacity="0.35" />
    <path d="M${-w / 2} ${-h / 2} H${w / 2} V${h / 2 - 26} L${w / 2 - 26} ${h / 2} H${-w / 2} Z" fill="${color}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
    <path d="M${w / 2} ${h / 2 - 26} L${w / 2 - 26} ${h / 2 - 26} L${w / 2 - 26} ${h / 2} Z" fill="${madera}" opacity="0.45" />
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="22" fill="${madera}" opacity="0.12" />
    ${l.map((s, i) => `<text x="0" y="${(i - (l.length - 1) / 2) * size * 1.05 + size * 0.36}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${size}" fill="${noche}"${cls.startsWith("amb") ? " data-layout-ignore" : ""}>${s}</text>`).join("")}
  </g></g>`;
};

// ---------- onda de audio (barras; x, y = esquina izquierda, centro vertical) ----------
export const onda = (cls, x, y, { n = 18, w = 360, h = 130, color = rojo } = {}) => {
  const paso = w / n;
  const alt = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.85, 0.5, 0.95, 0.65, 0.3, 0.8, 0.6, 1, 0.45, 0.7, 0.5, 0.9, 0.35, 0.6, 0.8];
  return `<g class="${cls}">${Array.from({ length: n }, (_, i) => {
    const hh = h * alt[i % alt.length];
    return `<rect class="${cls}-b" x="${(x + i * paso).toFixed(1)}" y="${(y - hh / 2).toFixed(1)}" width="${(paso * 0.55).toFixed(1)}" height="${hh.toFixed(1)}" rx="${(paso * 0.27).toFixed(1)}" fill="${color}" />`;
  }).join("")}</g>`;
};

// ---------- personajes (cabeza centrada en 0,0; hombros hasta y ~260) ----------
const cara = (p, { ojos = "normal", boca = "normal" } = {}) => `
  <ellipse cx="0" cy="0" rx="62" ry="74" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <g class="${p}-ojos">${ojos === "medio"
    ? `<path d="M-34 -6 H-14 M14 -6 H34" stroke="${noche}" stroke-width="6" stroke-linecap="round" /><circle cx="-24" cy="-1" r="5" fill="${noche}" /><circle cx="24" cy="-1" r="5" fill="${noche}" />`
    : `<circle cx="-24" cy="-4" r="7" fill="${noche}" /><circle cx="24" cy="-4" r="7" fill="${noche}" />`}</g>
  <path d="M-3 4 Q-8 22 4 24" stroke="${noche}" stroke-width="3.5" fill="none" stroke-linecap="round" />
  ${boca === "linea" ? `<path class="${p}-boca" d="M-16 44 H16" stroke="${noche}" stroke-width="5" stroke-linecap="round" />`
    : `<ellipse class="${p}-boca" cx="0" cy="44" rx="14" ry="8" fill="${noche}" />`}`;

export const graciela = (p = "gra", { brazos = false } = {}) => `
<g class="${p}">
  <path d="${nube(0, -18, 96, 92, 13, 24, 0.3)}" fill="${madera}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-150 270 L-156 150 Q-150 104 -98 98 L-30 94 Q0 116 30 94 L98 98 Q150 104 156 150 L150 270 Z" fill="${am}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-20" y="50" width="40" height="50" fill="${crema}" stroke="${noche}" stroke-width="4" />
  ${[-36, -18, 0, 18, 36].map((x, i) => `<circle cx="${x}" cy="${110 + Math.abs(x) * -0.25 + 6}" r="8" fill="${crema}" stroke="${noche}" stroke-width="2.5" />`).join("")}
  ${cara(p)}
  <path d="${nube(0, -66, 64, 22, 8, 12, 3.3)}" fill="${madera}" stroke="${crema}" stroke-width="3" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-40 -28 Q-26 -36 -12 -28 M12 -28 Q26 -36 40 -28" stroke="${noche}" stroke-width="5" fill="none" stroke-linecap="round" />
  <rect x="-48" y="-20" width="38" height="30" rx="10" fill="none" stroke="${rojo}" stroke-width="5" />
  <rect x="10" y="-20" width="38" height="30" rx="10" fill="none" stroke="${rojo}" stroke-width="5" />
  <path d="M-10 -8 H10" stroke="${rojo}" stroke-width="4" />
  <path d="M-48 -4 Q-74 40 -44 92 M48 -4 Q74 40 44 92" stroke="${am}" stroke-width="3" stroke-dasharray="3 6" fill="none" stroke-linecap="round" />
  <circle cx="-34" cy="22" r="10" fill="${rojo}" opacity="0.25" /><circle cx="34" cy="22" r="10" fill="${rojo}" opacity="0.25" />
  ${brazos ? `<path d="M-130 250 Q-40 170 60 210 Q120 230 140 250 Q40 200 -40 240 Z" fill="${am}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M130 250 Q40 180 -60 214 Q-110 230 -130 254" fill="none" stroke="${noche}" stroke-width="5" stroke-linecap="round" />` : ""}
</g>`;

export const ernesto = (p = "ern") => `
<g class="${p}">
  <path d="M-150 270 L-156 150 Q-150 104 -98 98 L-30 94 L0 150 L30 94 L98 98 Q150 104 156 150 L150 270 Z" fill="${madera}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-30 94 L0 150 L30 94 Z" fill="${crema}" stroke="${noche}" stroke-width="3" />
  <path d="M-10 108 L10 108 L16 200 L0 220 L-16 200 Z" fill="${rojo}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
  <rect x="-22" y="52" width="44" height="48" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="-62" cy="6" rx="11" ry="17" fill="${crema}" stroke="${noche}" stroke-width="4" /><ellipse cx="62" cy="6" rx="11" ry="17" fill="${crema}" stroke="${noche}" stroke-width="4" />
  ${cara(p, { boca: "linea" })}
  <path d="M-62 -24 C-60 -60 -30 -72 0 -72 C30 -72 60 -60 62 -24 C40 -40 -40 -40 -62 -24 Z" fill="${beige}" stroke="${noche}" stroke-width="3" />
  <path d="M-80 -42 C-70 -96 70 -100 82 -44 C60 -54 -60 -54 -80 -42 Z" fill="${noche}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M0 -92 V-104" stroke="${noche}" stroke-width="8" stroke-linecap="round" />
  <path class="${p}-cejas" d="M-44 -30 L-12 -24 M12 -24 L44 -30" stroke="${beige}" stroke-width="9" stroke-linecap="round" />
  <circle cx="-26" cy="-4" r="19" fill="none" stroke="${noche}" stroke-width="4" /><circle cx="26" cy="-4" r="19" fill="none" stroke="${noche}" stroke-width="4" />
  <path d="M-7 -4 H7" stroke="${noche}" stroke-width="4" />
  <path d="M-44 36 C-34 16 -8 18 0 26 C8 18 34 16 44 36 C28 30 12 38 0 33 C-12 38 -28 30 -44 36 Z" fill="${beige}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
</g>`;

export const novia = (p = "nov") => `
<g class="${p}">
  <path d="M-60 -70 C-150 -40 -180 120 -170 270 H170 C180 120 150 -40 60 -70 Z" fill="${crema}" opacity="0.5" stroke="${crema}" stroke-width="3" />
  <path d="M-140 270 L-146 150 Q-140 110 -96 104 L-40 98 Q0 150 40 98 L96 104 Q140 110 146 150 L140 270 Z" fill="${crema}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-40 98 Q0 150 40 98" fill="none" stroke="${beige}" stroke-width="4" />
  <rect x="-20" y="52" width="40" height="50" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <circle cx="0" cy="-92" r="34" fill="${madera}" stroke="${crema}" stroke-width="4" />
  ${cara(p)}
  <path d="M-62 4 C-72 -66 -30 -86 0 -84 C30 -86 72 -66 62 4 C54 -34 30 -52 0 -50 C-30 -52 -54 -34 -62 4 Z" fill="${madera}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-34 -70 L-24 -94 L-10 -76 L0 -100 L10 -76 L24 -94 L34 -70 Z" fill="${am}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-38 -26 Q-26 -32 -12 -26 M12 -26 Q26 -32 38 -26" stroke="${noche}" stroke-width="4" fill="none" stroke-linecap="round" />
  <g class="${p}-panico" opacity="0"><circle cx="-24" cy="-4" r="15" fill="${crema}" stroke="${noche}" stroke-width="4" /><circle cx="24" cy="-4" r="15" fill="${crema}" stroke="${noche}" stroke-width="4" /><circle cx="-24" cy="-4" r="4" fill="${noche}" /><circle cx="24" cy="-4" r="4" fill="${noche}" /></g>
  <circle cx="-62" cy="28" r="7" fill="${am}" /><circle cx="62" cy="28" r="7" fill="${am}" />
  <circle cx="-34" cy="22" r="10" fill="${rojo}" opacity="0.25" /><circle cx="34" cy="22" r="10" fill="${rojo}" opacity="0.25" />
</g>`;

export const pibe = (p = "pib") => `
<g class="${p}">
  <path d="M-150 270 L-156 150 Q-150 100 -96 94 L-40 88 Q0 104 40 88 L96 94 Q150 100 156 150 L150 270 Z" fill="${rojo}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-70 92 Q0 150 70 92" fill="none" stroke="${noche}" stroke-width="5" />
  <path d="M-30 130 V200 M30 130 V200" stroke="${crema}" stroke-width="5" stroke-linecap="round" />
  <rect x="-20" y="50" width="40" height="46" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-70 80 C-80 40 -70 20 -60 16 M70 80 C80 40 70 20 60 16" stroke="${noche}" stroke-width="8" fill="none" stroke-linecap="round" />
  <rect x="-86" y="66" width="30" height="40" rx="10" fill="${noche}" /><rect x="56" y="66" width="30" height="40" rx="10" fill="${noche}" />
  ${cara(p, { ojos: "medio", boca: "linea" })}
  <path d="M-64 -24 C-66 -82 64 -86 66 -24 Z" fill="${am}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
  <path d="M30 -32 Q90 -40 118 -22 Q86 -14 40 -20 Z" fill="${am}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-64 -24 H66" stroke="${noche}" stroke-width="4" />
  <path class="${p}-cejas" d="M-38 -16 L-12 -12 M12 -12 L38 -16" stroke="${noche}" stroke-width="5" stroke-linecap="round" />
</g>`;

// el dueño: brazo aparte (p-brazo, gira con svgOrigin "120 130")
export const dueno = (p = "due", { brazo = true } = {}) => `
<g class="${p}">
  <path d="M-170 300 L-176 160 Q-170 104 -110 98 L-34 92 Q0 112 34 92 L110 98 Q170 104 176 160 L170 300 Z" fill="${madera}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-40 94 Q0 140 40 94" fill="none" stroke="${crema}" stroke-width="4" />
  <rect x="-22" y="52" width="44" height="46" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="-62" cy="6" rx="11" ry="17" fill="${crema}" stroke="${noche}" stroke-width="4" /><ellipse cx="62" cy="6" rx="11" ry="17" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="62" ry="74" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-62 -14 L-70 -50 L-50 -44 L-52 -82 L-28 -66 L-16 -100 L2 -72 L22 -102 L30 -68 L56 -86 L50 -48 L72 -52 L62 -14 C40 -44 -40 -44 -62 -14 Z" fill="${beige}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-42 -26 L-14 -20 M14 -20 L42 -26" stroke="${noche}" stroke-width="6" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-26" cy="-4" r="6" fill="${noche}" /><circle cx="26" cy="-4" r="6" fill="${noche}" /></g>
  <path d="M-38 10 Q-26 18 -14 10 M14 10 Q26 18 38 10" stroke="${madera}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path d="M-3 4 Q-8 22 4 24" stroke="${noche}" stroke-width="3.5" fill="none" stroke-linecap="round" />
  ${[[-40, 40], [-30, 54], [-14, 62], [14, 62], [30, 54], [40, 40], [-46, 26], [46, 26], [0, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${madera}" />`).join("")}
  <ellipse class="${p}-boca" cx="0" cy="44" rx="13" ry="6" fill="${noche}" />
  <path class="${p}-gota" d="M70 -40 C60 -22 60 -12 70 -10 C80 -12 80 -22 70 -40 Z" fill="${crema}" stroke="${noche}" stroke-width="3" opacity="0" />
  ${brazo ? `<g class="${p}-brazo">
    <path d="M120 140 C150 60 120 -40 70 -70" stroke="${madera}" stroke-width="46" fill="none" stroke-linecap="round" />
    <path d="M120 140 C150 60 120 -40 70 -70" stroke="${crema}" stroke-width="4" fill="none" opacity="0.6" />
    <circle cx="62" cy="-78" r="26" fill="${crema}" stroke="${noche}" stroke-width="4" />
    <path d="M44 -96 L36 -106 M56 -102 L52 -114 M70 -102 L72 -114" stroke="${noche}" stroke-width="4" stroke-linecap="round" />
  </g>` : ""}
</g>`;

// foto carnet: marco centrado en 0,0 (340 x 430), personaje adentro, nombre en Caveat
export const carnet = (p, persona, nombre, { cinta = true } = {}) => `
<g class="${p}">
  <rect x="-162" y="-200" width="340" height="430" fill="${noche}" opacity="0.4" />
  <rect x="-170" y="-210" width="340" height="430" rx="6" fill="${beige}" stroke="${noche}" stroke-width="5" />
  <clipPath id="${p}-clip"><rect x="-146" y="-186" width="292" height="320" /></clipPath>
  <rect x="-146" y="-186" width="292" height="320" fill="${verdeo}" />
  <g clip-path="url(#${p}-clip)"><g transform="translate(0 -36) scale(0.92)">${persona}</g></g>
  <rect x="-146" y="-186" width="292" height="320" fill="none" stroke="${noche}" stroke-width="4" />
  <text x="0" y="196" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="58" fill="${noche}">${nombre}</text>
  ${cinta ? `<rect x="-60" y="-232" width="120" height="40" fill="${crema}" opacity="0.7" transform="rotate(-6 0 -212)" />` : ""}
</g>`;

// ---------- el molde de una escena ----------
export function escena({ id, dur, css = "", html, js }) {
  const S = `[data-composition-id="${id}"]`;
  const pre = id.split("-")[0];
  return `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${pre}-capa { position: absolute; inset: 0; }
    ${S} .${pre}-esc { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .lin { fill: none; stroke: ${crema}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; }
    ${S} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.12em; }
    ${S} .tira { position: absolute; left: 0; right: 0; text-align: center; }
    ${S} .tira b { display: inline-block; padding: 14px 30px; background: ${lcd}; border: 5px solid ${noche}; border-radius: 12px; color: ${rojo}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 44px; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; text-shadow: 0 0 14px rgba(255, 59, 42, 0.55); }
    ${S} .sello { position: absolute; left: 0; right: 0; text-align: center; }
    ${S} .sello b { display: inline-block; padding: 10px 30px; border: 8px solid ${rojo}; border-radius: 14px; color: ${rojo}; background: rgba(23, 17, 12, 0.88); font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; }
    ${S} .sello.am b { border-color: ${am}; color: ${am}; }
    ${S} .bip { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; line-height: 1; color: ${rojo}; letter-spacing: 0.06em; text-shadow: 8px 8px 0 ${noche}; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${pre}-escena" class="${pre}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${pre}-esc">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const lista = (x) => (typeof x === "string" ? qa(x) : Array.isArray(x) ? x : [x]);
      // trazo que se dibuja solo (opacity 0 hasta que arranca: sin puntitos de los caps)
      const dibujar = (sel, t, d = 0.6) => lista(sel).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L + 1, strokeDashoffset: L + 1, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      // aparece entero con rebote
      const pop = (sel, t, d = 0.35, s = 0.8) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: s, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.8)", immediateRender: false }, t);
      });
      // cae de golpe, como un sello
      const golpe = (sel, t, s = 2.2) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: s, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      });
      const fuera = (sel, t, d = 0.25) => tl.to(lista(sel), { opacity: 0, duration: d }, t);
      const sacudon = (t, f = 1, sel = ".${pre}-esc") => [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(sel), { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // la boca se mueve mientras habla
      const hablar = (sel, t0, t1) => {
        const n = Math.max(1, Math.floor((t1 - t0) / 0.12));
        tl.fromTo(q(sel), { scaleY: 0.45, transformOrigin: "50% 50%" }, { scaleY: 1.25, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0);
      };
      // la onda de audio se mueve mientras habla (quieta y bajita fuera de eso)
      const ondear = (cls, t0, t1) => qa("." + cls + "-b").forEach((b, i) => {
        gsap.set(b, { scaleY: 0.18, transformOrigin: "50% 50%" });
        const d = 0.08 + ((i * 7) % 5) * 0.022;
        const n = Math.max(1, Math.floor((t1 - t0) / d));
        tl.fromTo(b, { scaleY: 0.18 }, { scaleY: 1, duration: d, ease: "sine.inOut", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0 + (i % 4) * 0.02);
      });
      // carretes del casete girando (sel, svgOrigin, desde, hasta, vueltas por segundo)
      const girar = (sel, origen, t0, t1, vps = 0.8) => tl.fromTo(q(sel), { rotation: 0, svgOrigin: origen }, { rotation: 360 * vps * (t1 - t0), svgOrigin: origen, duration: t1 - t0, ease: "none", immediateRender: false }, t0);
      // display: [[índice del valor, t], ...]
      const lcd = (p, n, pares) => pares.forEach(([k, t]) => { for (let i = 0; i < n; i++) tl.set(q("." + p + "-v" + i), { opacity: i === k ? 1 : 0 }, t); });
      // luz que titila
      const titilar = (sel, t0, t1, per = 0.5) => {
        const n = Math.max(1, Math.floor((t1 - t0) / (per / 2)));
        tl.fromTo(lista(sel), { opacity: 1 }, { opacity: 0.12, duration: per / 2, ease: "steps(1)", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0);
      };
      // el BIP del contestador
      const bip = (sel, t) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.16, ease: "back.out(3)", immediateRender: false }, t);
        tl.to(q(sel), { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, t + 0.16);
        tl.to(q(sel), { opacity: 0, duration: 0.15 }, t + 0.5);
      };

${js}

      // salida: blur
      tl.to(q("#${pre}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
}
