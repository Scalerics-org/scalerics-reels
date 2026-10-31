// Piezas comunes de las escenas de "chimentos" (programa de chimentos de la tarde "Picante a las
// Cinco"): personas de busto con peinados, fotos de paparazzi, sellos, celular y globos de chat,
// sillón del panel. Cada sNN.mjs arma su escena con escena({...}).
// Uso (desde reels/chimentos): node partes/escenas/gen.mjs
import fs from "node:fs";

export const COL = {
  rosa: "#ff4fa3", rosac: "#ffb3d6", // rosa chicle y rosa claro
  oro: "#f5c242", oros: "#c9952a", // dorado y su sombra
  ink: "#140a12", // negro del set y contornos
  blanco: "#fff7fb",
  rojo: "#ff2e4d", // flash de PRIMICIA, círculos de chimento
  noche: "#2b1430", // interior de las fotos de noche
  piel: "#f6c9a8",
  verde: "#5ce611", // solo con Scalerics
};
const K = COL.ink;

// ---------- persona de busto ----------
// Coordenadas locales: cabeza en (0,-230), hombros en y -130, corte abajo en y 160.
// o: { id, x, y, s, rot, ropa, pelo: "rubia"|"morocha"|"jopo"|"pelado"|"rulos", colPelo,
//      cara: "habla"|"sonrisa"|"sorpresa"|"chusma"|"triste"|"dormida"|"grita",
//      pestanas, aros, anteojos, bigote, ruleros, camison, censura, cuello: "v"|"saco"|"camison", extra, atras }
export function persona(o) {
  const id = o.id ?? "";
  const n = id.split(" ").at(-1);
  const cp = o.colPelo ?? { rubia: COL.oro, morocha: K, jopo: "#3a2030", pelado: "#9a8c94", rulos: COL.rosa }[o.pelo ?? "jopo"];
  const atras = {
    rubia: `<path d="M-118 -210 C-150 -330 -60 -372 0 -364 C60 -372 150 -330 118 -210 C140 -150 130 -100 96 -96 L-96 -96 C-130 -100 -140 -150 -118 -210 Z" fill="${cp}" stroke="${K}" stroke-width="7" stroke-linejoin="round" />`,
    morocha: `<path d="M-96 -240 C-104 -350 104 -350 96 -240 L104 -90 L64 -100 L62 -230 L-62 -230 L-64 -100 L-104 -90 Z" fill="${cp}" stroke="${K}" stroke-width="7" stroke-linejoin="round" />`,
    rulos: [[-96, -280], [-110, -220], [-104, -160], [96, -280], [110, -220], [104, -160], [-60, -320], [0, -336], [60, -320]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="38" fill="${cp}" stroke="${K}" stroke-width="6" />`).join(""),
  }[o.pelo] ?? "";
  const frente = {
    rubia: `<path d="M-84 -250 C-70 -320 60 -330 86 -246 C50 -290 0 -270 -20 -300 C-30 -270 -60 -270 -84 -250 Z" fill="${cp}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    morocha: `<path d="M-80 -244 C-70 -316 70 -330 82 -246 C40 -300 -10 -286 -80 -244 Z" fill="${cp}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    jopo: `<path d="M-80 -248 C-90 -300 -50 -350 20 -352 C80 -350 96 -300 80 -248 C60 -284 -50 -290 -80 -248 Z" fill="${cp}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    pelado: `<path d="M-82 -236 C-92 -210 -86 -190 -78 -186 M82 -236 C92 -210 86 -190 78 -186" fill="none" stroke="${cp}" stroke-width="14" stroke-linecap="round" /><path d="M-30 -300 Q0 -312 30 -300" fill="none" stroke="${COL.blanco}" stroke-width="6" stroke-linecap="round" opacity="0.5" />`,
    rulos: [[-56, -300], [-14, -316], [30, -312], [66, -290]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="${cp}" stroke="${K}" stroke-width="6" />`).join(""),
  }[o.pelo ?? "jopo"];
  const ruleros = o.ruleros ? [[-70, -318, -30], [-18, -340, -8], [36, -336, 12], [84, -304, 34]]
    .map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-30" y="-17" width="60" height="34" rx="12" fill="${COL.oro}" stroke="${K}" stroke-width="5" /><path d="M-14 -17 V17 M0 -17 V17 M14 -17 V17" stroke="${COL.oros}" stroke-width="4" /></g>`).join("") : "";
  const my = -186; // boca
  const k = o.cara ?? "habla";
  const boca = {
    habla: `<g class="boca ${n}-boca" data-o="0 ${my}"><ellipse cx="0" cy="${my}" rx="22" ry="15" fill="${K}" /><ellipse cx="0" cy="${my + 7}" rx="11" ry="5" fill="${COL.rosa}" /></g>`,
    grita: `<g class="boca ${n}-boca" data-o="0 ${my - 4}"><path d="M-32 ${my - 16} Q0 ${my - 24} 32 ${my - 16} Q28 ${my + 26} 0 ${my + 28} Q-28 ${my + 26} -32 ${my - 16} Z" fill="${K}" /><path d="M-14 ${my + 16} Q0 ${my + 4} 14 ${my + 16} Q0 ${my + 24} -14 ${my + 16} Z" fill="${COL.rojo}" /></g>`,
    sorpresa: `<ellipse class="boca ${n}-boca" data-o="0 ${my}" cx="0" cy="${my}" rx="16" ry="22" fill="${K}" />`,
    sonrisa: `<g class="boca ${n}-boca" data-o="0 ${my}"><path d="M-30 ${my - 8} Q0 ${my + 26} 30 ${my - 8} Z" fill="${K}" stroke="${K}" stroke-width="5" stroke-linejoin="round" /></g>`,
    chusma: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-26 ${my + 4} Q4 ${my + 16} 30 ${my - 10}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />`,
    triste: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-24 ${my + 8} Q0 ${my - 10} 24 ${my + 8}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />`,
    dormida: `<path class="boca ${n}-boca" data-o="0 ${my}" d="M-14 ${my} Q0 ${my + 8} 14 ${my}" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round" />`,
  }[k];
  const cejas = {
    sorpresa: `M-58 -280 Q-38 -296 -18 -280 M58 -280 Q38 -296 18 -280`,
    grita: `M-58 -284 Q-38 -300 -18 -284 M58 -284 Q38 -300 18 -284`,
    chusma: `M-58 -270 L-18 -264 M58 -280 Q38 -292 18 -278`,
    triste: `M-56 -262 L-20 -274 M56 -262 L20 -274`,
    dormida: `M-56 -266 Q-38 -274 -20 -266 M56 -266 Q38 -274 20 -266`,
  }[k] ?? `M-56 -270 Q-38 -282 -20 -270 M56 -270 Q38 -282 20 -270`;
  const ojos = k === "dormida"
    ? `<path d="M-50 -236 Q-36 -226 -22 -236 M50 -236 Q36 -226 22 -236" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round" />`
    : k === "chusma"
      ? `<g class="${n}-ojos" data-o="0 -236"><path d="M-52 -236 Q-36 -248 -20 -236 Z M52 -236 Q36 -248 20 -236 Z" fill="${COL.blanco}" stroke="${K}" stroke-width="5" stroke-linejoin="round" /><circle cx="-26" cy="-238" r="6" fill="${K}" /><circle cx="46" cy="-238" r="6" fill="${K}" /></g>`
      : `<g class="${n}-ojos" data-o="0 -236"><ellipse cx="-36" cy="-236" rx="11" ry="${k === "sorpresa" || k === "grita" ? 17 : 14}" fill="${K}" /><ellipse cx="36" cy="-236" rx="11" ry="${k === "sorpresa" || k === "grita" ? 17 : 14}" fill="${K}" /><circle cx="-32" cy="-242" r="4" fill="${COL.blanco}" /><circle cx="40" cy="-242" r="4" fill="${COL.blanco}" /></g>`;
  const pest = o.pestanas && k !== "dormida" ? `<path d="M-48 -248 L-56 -258 M-38 -251 L-42 -262 M48 -248 L56 -258 M38 -251 L42 -262" stroke="${K}" stroke-width="4" stroke-linecap="round" />` : "";
  const aros = o.aros ? `<circle cx="-84" cy="-196" r="13" fill="none" stroke="${COL.oro}" stroke-width="6" /><circle cx="84" cy="-196" r="13" fill="none" stroke="${COL.oro}" stroke-width="6" />` : "";
  const anteojos = o.anteojos ? `<g fill="none" stroke="${K}" stroke-width="6"><rect x="-66" y="-260" width="56" height="44" rx="12" fill="${COL.blanco}" fill-opacity="0.25" /><rect x="10" y="-260" width="56" height="44" rx="12" fill="${COL.blanco}" fill-opacity="0.25" /><path d="M-10 -242 Q0 -250 10 -242" /></g>` : "";
  const bigote = o.bigote ? `<path d="M0 -204 Q-28 -214 -52 -194 Q-24 -186 0 -196 Q24 -186 52 -194 Q28 -214 0 -204 Z" fill="#5a3a44" stroke="${K}" stroke-width="5" stroke-linejoin="round" />` : "";
  const ropa = o.ropa ?? COL.rosa;
  const cuello = {
    v: `<path d="M-40 -128 L0 -70 L40 -128" fill="${COL.piel}" stroke="${K}" stroke-width="6" stroke-linejoin="round" />`,
    saco: `<path d="M-40 -128 L0 -60 L40 -128 Z" fill="${COL.blanco}" stroke="${K}" stroke-width="6" stroke-linejoin="round" /><path d="M-8 -90 L0 -60 L8 -90 L0 -100 Z" fill="${COL.rosa}" stroke="${K}" stroke-width="4" /><path d="M-60 -128 L-10 -40 L-40 160 M60 -128 L10 -40 L40 160" fill="none" stroke="${K}" stroke-width="6" />`,
    camison: `<path d="M-70 -126 Q0 -60 70 -126" fill="none" stroke="${K}" stroke-width="6" /><path d="M-70 -126 Q0 -80 70 -126" fill="none" stroke="${COL.blanco}" stroke-width="4" stroke-dasharray="4 10" stroke-linecap="round" /><path d="M-120 -112 L-110 -40 M120 -112 L110 -40" stroke="${K}" stroke-width="5" />`,
  }[o.cuello ?? "v"];
  const censura = o.censura ? `<g class="${n}-censura"><rect x="-96" y="-262" width="192" height="52" fill="${K}" /><text data-layout-ignore x="0" y="-228" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${COL.blanco}">TESTIMONIO</text></g>` : "";
  return `<g transform="translate(${o.x} ${o.y}) rotate(${o.rot ?? 0}) scale(${o.s ?? 1})"><g class="${id}">
    ${o.atras ?? ""}${atras}
    <path d="M-190 160 C-190 -40 -150 -110 -60 -130 L60 -130 C150 -110 190 -40 190 160 Z" fill="${ropa}" stroke="${K}" stroke-width="7" stroke-linejoin="round" />
    <rect x="-28" y="-160" width="56" height="40" fill="${COL.piel}" stroke="${K}" stroke-width="6" />
    ${cuello}
    <ellipse cx="-82" cy="-226" rx="14" ry="22" fill="${COL.piel}" stroke="${K}" stroke-width="6" /><ellipse cx="82" cy="-226" rx="14" ry="22" fill="${COL.piel}" stroke="${K}" stroke-width="6" />
    <ellipse cx="0" cy="-230" rx="80" ry="92" fill="${COL.piel}" stroke="${K}" stroke-width="7" />
    ${aros}${frente}${ruleros}
    <path d="${cejas}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" />
    ${ojos}${pest}
    <ellipse cx="-56" cy="-200" rx="16" ry="9" fill="${COL.rosa}" opacity="0.35" /><ellipse cx="56" cy="-200" rx="16" ry="9" fill="${COL.rosa}" opacity="0.35" />
    <path d="M0 -226 Q-12 -206 4 -202" fill="none" stroke="${K}" stroke-width="5" stroke-linecap="round" />
    ${anteojos}${bigote}${boca}${censura}
    ${o.extra ?? ""}
  </g></g>`;
}

// ---------- celular (centro x,y; local: cuerpo -70..70 x -130..130) ----------
// pantalla: svg en coordenadas locales (pantalla -58..58 x -108..108)
export const celular = ({ id = "", x, y, s = 1, rot = 0, pantalla = "", brillo = true }) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${id}">
  ${brillo ? `<circle class="${id.split(" ").at(-1)}-brillo" r="150" fill="${COL.blanco}" opacity="0.12" />` : ""}
  <rect x="-70" y="-130" width="140" height="260" rx="22" fill="${K}" stroke="${K}" stroke-width="6" />
  <rect x="-58" y="-112" width="116" height="220" rx="10" fill="${COL.blanco}" />
  ${pantalla}
</g></g>`;
// mano que sostiene algo (local, puño en 0,0)
export const mano = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-34 -10 Q-40 30 -10 40 L24 40 Q40 30 36 -6 Q30 -26 0 -24 Q-30 -26 -34 -10 Z" fill="${COL.piel}" stroke="${K}" stroke-width="6" stroke-linejoin="round" /><path d="M-30 4 L30 4 M-28 18 L30 18" stroke="${K}" stroke-width="4" stroke-linecap="round" /></g>`;

// globo de chat HTML (para usar en html): lado "der" (enviado, rosa) o "izq" (recibido, blanco)
export const globo = (cls, txt, { x, y, w, lado = "der", tam = 38, check = true } = {}) =>
  `<div class="globo ${lado} ${cls}" style="left:${x}px;top:${y}px;${w ? `width:${w}px;` : ""}font-size:${tam}px">${txt}${check && lado === "der" ? `<i class="chk">✓✓</i>` : ""}</div>`;

// ---------- foto de paparazzi ----------
// Marco blanco con franjas de flash; adentro un svg recortado (contenido en coords locales 0..w, 0..h).
// o: { id, x, y (centro), w, h, rot, contenido, fondo, hora: "23:04", lugar: "LA UNIÓN" }
export function foto(o) {
  const { w, h } = o;
  const n = (o.id ?? "").split(" ").at(-1);
  const cid = `${n}-clip`;
  let franjas = "";
  for (let i = -h; i < w; i += 70) franjas += `<path d="M${i} ${h} L${i + h} 0" stroke="${COL.blanco}" stroke-width="18" opacity="0.06" />`;
  return `<g transform="translate(${o.x} ${o.y}) rotate(${o.rot ?? 0})"><g class="${o.id ?? ""}">
    <rect x="${-w / 2 - 22 + 14}" y="${-h / 2 - 22 + 16}" width="${w + 44}" height="${h + 96}" fill="#000" opacity="0.4" />
    <rect x="${-w / 2 - 22}" y="${-h / 2 - 22}" width="${w + 44}" height="${h + 96}" fill="${COL.blanco}" stroke="${K}" stroke-width="6" />
    <clipPath id="${cid}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" /></clipPath>
    <g clip-path="url(#${cid})"><g transform="translate(${-w / 2} ${-h / 2})">
      <rect width="${w}" height="${h}" fill="${o.fondo ?? COL.noche}" />
      ${o.contenido ?? ""}
      ${franjas}
      <rect class="${n}-fl" width="${w}" height="${h}" fill="${COL.blanco}" opacity="0" />
    </g></g>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="none" stroke="${K}" stroke-width="5" />
    ${o.hora ? `<text x="${w / 2 - 16}" y="${h / 2 - 18}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${COL.oro}">${o.hora}</text>` : ""}
    ${o.lugar ? `<text x="${-w / 2}" y="${h / 2 + 52}" font-family="Caveat" font-weight="700" font-size="48" fill="${K}">${o.lugar}</text>` : ""}
    <circle cx="${w / 2 - 30}" cy="${-h / 2 + 30}" r="10" fill="${COL.rojo}" />
  </g></g>`;
}

// destello de flash (estrella blanca), centro x,y
export const destello = (x, y, s = 1, cls = "") => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}"><path d="M0 -90 L16 -16 L90 0 L16 16 L0 90 L-16 16 L-90 0 L-16 -16 Z" fill="${COL.blanco}" /><circle r="26" fill="${COL.blanco}" /></g></g>`;
// cámara de paparazzi (centro x,y)
export const camara = (x, y, s = 1, rot = 0, cls = "") => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="${cls}">
  <rect x="-110" y="-64" width="220" height="140" rx="18" fill="${K}" stroke="${COL.blanco}" stroke-width="5" />
  <rect x="-90" y="-96" width="80" height="40" rx="8" fill="${K}" stroke="${COL.blanco}" stroke-width="5" />
  <rect x="30" y="-92" width="60" height="32" rx="6" fill="${COL.oro}" stroke="${K}" stroke-width="5" />
  <circle cx="10" cy="6" r="54" fill="${COL.noche}" stroke="${COL.blanco}" stroke-width="6" /><circle cx="10" cy="6" r="30" fill="${K}" stroke="${COL.oro}" stroke-width="5" /><circle cx="0" cy="-6" r="9" fill="${COL.blanco}" opacity="0.8" />
</g></g>`;

// sillón del panel (centro abajo x,y; ancho w)
export const sillon = (x, y, w = 420, col = COL.oro, cls = "") => `<g transform="translate(${x} ${y})"><g class="${cls}">
  <rect x="${-w / 2}" y="-230" width="${w}" height="170" rx="60" fill="${col}" stroke="${K}" stroke-width="7" />
  <rect x="${-w / 2 - 30}" y="-120" width="80" height="150" rx="34" fill="${col}" stroke="${K}" stroke-width="7" />
  <rect x="${w / 2 - 50}" y="-120" width="80" height="150" rx="34" fill="${col}" stroke="${K}" stroke-width="7" />
  <rect x="${-w / 2 + 40}" y="-80" width="${w - 80}" height="90" rx="20" fill="${col}" stroke="${K}" stroke-width="7" />
  <path d="M${-w / 2 + 70} -200 Q${-w / 2 + 90} -150 ${-w / 2 + 70} -100 M0 -210 L0 -100 M${w / 2 - 70} -200 Q${w / 2 - 90} -150 ${w / 2 - 70} -100" fill="none" stroke="${K}" stroke-width="4" opacity="0.4" />
</g></g>`;

// estrellitas de brillo (para el set)
export const brillito = (x, y, s = 1, col = COL.oro, cls = "") => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 -30 Q4 -4 30 0 Q4 4 0 30 Q-4 4 -30 0 Q-4 -4 0 -30 Z" fill="${col}" /></g>`;

// ---------- escena ----------
const HELPERS = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const ESC = q(".esc");
      const org = (el, o) => (el instanceof SVGElement ? { svgOrigin: o ?? "0 0" } : { transformOrigin: o ?? "50% 50%" });
      const sacudon = (t, f = 1) => [[-16, 9], [12, -7], [-6, 3], [0, 0]].forEach(([x, y], i) => tl.to(ESC, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // flash de cámara a pantalla completa
      const flash = (t, a = 0.85) => { tl.fromTo(q(".fl"), { opacity: a }, { opacity: 0, duration: 0.28, ease: "power2.out", immediateRender: false }, t); };
      // tiembla (zócalo de PRIMICIA) de t a t+d
      const tiembla = (sel, t, d, a = 5, per = 0.05) => qa(sel).forEach((el) => tl.fromTo(el, { x: -a, rotation: -0.6 }, { x: a, rotation: 0.6, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "none", immediateRender: false }, t));
      const pop = (sel, t, { d = 0.32, desde = 0.6, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: d, ease: "back.out(2)", immediateRender: false }, t);
      });
      const golpe = (sel, t, { desde = 2.2, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      });
      // foto que cae sobre la mesa: llega grande y girada y se asienta
      const cae = (sel, t, { rot = -12, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 1.5, rotation: rot, ...org(el, o) }, { opacity: 1, scale: 1, rotation: 0, ...org(el, o), duration: 0.24, ease: "power3.in", immediateRender: false }, t - 0.14);
      });
      const entra = (sel, t, desde = { x: -700 }, d = 0.32) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, ...desde }, { opacity: 1, x: 0, y: 0, duration: d, ease: "back.out(1.3)", immediateRender: false }, t);
      });
      const sale = (sel, t, d = 0.2) => qa(sel).forEach((el) => tl.to(el, { opacity: 0, duration: d }, t));
      const dibujar = (sel, t, d = 0.5) => qa(sel).forEach((p) => {
        const L = p.getTotalLength();
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.to(p, { opacity: 1, duration: 0.01 }, t);
        tl.to(p, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      const habla = (sel, t, d, per = 0.1, min = 0.45) => qa(sel).forEach((el) => {
        const o = el.dataset.o ?? "0 0";
        const n = Math.max(1, Math.round(d / per)) | 1;
        tl.fromTo(el, { scaleY: 1, svgOrigin: o }, { scaleY: min, svgOrigin: o, duration: per, yoyo: true, repeat: n, ease: "sine.inOut", immediateRender: false }, t);
      });
      const respira = (sel, t, d, dy = 8, per = 0.5) => qa(sel).forEach((el) => tl.fromTo(el, { y: 0 }, { y: dy, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      const balancea = (sel, t, d, deg = 4, per = 0.25, o) => qa(sel).forEach((el) => tl.fromTo(el, { rotation: -deg, ...org(el, o) }, { rotation: deg, ...org(el, o), duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      const pestanea = (sel, t) => qa(sel).forEach((el) => tl.to(el, { scaleY: 0.1, ...org(el, el.dataset?.o), duration: 0.06, yoyo: true, repeat: 1 }, t));
      // zoom lento (ken burns) sobre un elemento
      const acerca = (sel, t, d, a = 1, b = 1.08, o) => qa(sel).forEach((el) => tl.fromTo(el, { scale: a, ...org(el, o) }, { scale: b, ...org(el, o), duration: d, ease: "none", immediateRender: false }, t));
`;

export function escena({ id, dur, css = "", svg = "", html = "", js = "", sfx = [] }) {
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .capa, ${P} .esc { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .fl { position: absolute; inset: 0; background: ${COL.blanco}; opacity: 0; }
    ${P} .mk { position: absolute; font-family: "Caveat", cursive; font-weight: 700; line-height: 0.95; white-space: nowrap; color: ${COL.blanco}; text-shadow: 0 5px 0 rgba(20, 10, 18, 0.8); }
    ${P} .tit { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-style: normal; text-transform: uppercase; line-height: 0.92; letter-spacing: -0.03em; white-space: nowrap; }
    ${P} .sello { position: absolute; padding: 10px 28px 6px; border: 9px solid ${COL.rojo}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: 0.04em; color: ${COL.rojo}; white-space: nowrap; background: rgba(20, 10, 18, 0.55); }
    ${P} .barra { position: absolute; padding: 12px 30px 10px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; white-space: nowrap; border: 6px solid ${COL.ink}; box-shadow: 10px 10px 0 ${COL.ink}; }
    ${P} .globo { position: absolute; padding: 18px 26px 16px; border: 5px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 600; line-height: 1.12; color: ${COL.ink}; box-shadow: 8px 8px 0 rgba(20, 10, 18, 0.6); }
    ${P} .globo.der { background: ${COL.rosac}; border-radius: 34px 34px 8px 34px; }
    ${P} .globo.izq { background: ${COL.blanco}; border-radius: 34px 34px 34px 8px; }
    ${P} .globo .chk { font-style: normal; margin-left: 12px; font-size: 0.6em; color: ${COL.rosa}; letter-spacing: -0.2em; }
${css.replace(/\bP\b(?=\s)/g, P)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-capa" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="esc">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
        </svg>
${html}
      </div>
      <div class="fl"></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELPERS}
${js}
      tl.to(q(".capa"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power3.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx, null, 1));
}

export function duracion(id) {
  const m = fs.readFileSync("tiempos.md", "utf8").match(new RegExp(`### ${id} — dura ([0-9.]+) s`));
  return Number(m[1]);
}
