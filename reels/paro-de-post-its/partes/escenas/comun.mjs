// Piezas comunes de las escenas de "paro-de-post-its": post-its con carita, caja registradora,
// pancartas de cartón, megáfono, cinta. Cada sNN.mjs arma su escena con escena({...}).
// Uso (desde reels/paro-de-post-its): node partes/escenas/gen.mjs
import fs from "node:fs";

export const COL = {
  y: "#ffd84d", ys: "#e0b22c", // post-it amarillo y su sombra
  r: "#ff8fb8", rs: "#de6592", // rosa
  c: "#7fd3f7", cs: "#4ea7d0", // celeste
  ink: "#1d1b22", // tinta de marcador
  rojo: "#e5383b",
  carton: "#d6a46a", cartons: "#b07f45",
  papel: "#fff6e0",
  verde: "#5ce611",
};

// ---------- post-it con carita ----------
// o: { id (clase extra), x, y, s (escala; 1 = 300 px), rot, col ("y"|"r"|"c"), texto: ["línea", ...],
//      cara: "enojado"|"grita"|"triste"|"feliz"|"serio"|"sorpresa"|"ninguna", brazos: "arriba"|"abajo"|"cintura"|"puno"|null,
//      piernas: bool, extra: svg local (coordenadas del post-it: cuadrado -150..150), tam: tamaño de letra }
export function postit(o) {
  const c = COL[o.col ?? "y"], cs = COL[(o.col ?? "y") + "s"];
  const ink = COL.ink;
  const conTexto = o.texto && o.texto.length;
  const fy = o.fy ?? (conTexto ? 52 : 6); // centro de la cara
  const k = o.cara ?? "serio";
  const ids = o.id ?? "";
  const id = ids.split(" ").at(-1);
  let cara = "";
  if (k !== "ninguna") {
    // cejas
    const ceja = {
      enojado: `M-84 ${fy - 50} L-28 ${fy - 32} M84 ${fy - 50} L28 ${fy - 32}`,
      grita: `M-84 ${fy - 52} L-28 ${fy - 34} M84 ${fy - 52} L28 ${fy - 34}`,
      triste: `M-84 ${fy - 32} L-30 ${fy - 50} M84 ${fy - 32} L30 ${fy - 50}`,
      feliz: `M-80 ${fy - 44} Q-56 ${fy - 60} -30 ${fy - 46} M80 ${fy - 44} Q56 ${fy - 60} 30 ${fy - 46}`,
      serio: `M-80 ${fy - 42} L-30 ${fy - 42} M80 ${fy - 42} L30 ${fy - 42}`,
      sorpresa: `M-80 ${fy - 52} Q-56 ${fy - 66} -30 ${fy - 54} M80 ${fy - 52} Q56 ${fy - 66} 30 ${fy - 54}`,
    }[k];
    const ojos = k === "feliz"
      ? `<path d="M-72 ${fy - 14} Q-55 ${fy - 32} -38 ${fy - 14} M72 ${fy - 14} Q55 ${fy - 32} 38 ${fy - 14}" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />`
      : `<g class="ojos ${id}-ojos"><ellipse cx="-55" cy="${fy - 12}" rx="13" ry="${k === "sorpresa" ? 19 : 16}" fill="${ink}" /><ellipse cx="55" cy="${fy - 12}" rx="13" ry="${k === "sorpresa" ? 19 : 16}" fill="${ink}" />
         <circle cx="-51" cy="${fy - 18}" r="4.5" fill="${COL.papel}" /><circle cx="59" cy="${fy - 18}" r="4.5" fill="${COL.papel}" /></g>`;
    const my = fy + 34;
    const boca = {
      enojado: `<path class="boca ${id}-boca" data-o="0 ${my}" d="M-30 ${my + 8} Q0 ${my - 14} 30 ${my + 8}" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />`,
      triste: `<path class="boca ${id}-boca" data-o="0 ${my}" d="M-26 ${my + 8} Q0 ${my - 10} 26 ${my + 8}" fill="none" stroke="${ink}" stroke-width="7" stroke-linecap="round" />`,
      grita: `<g class="boca ${id}-boca" data-o="0 ${my}"><path d="M-34 ${my - 14} Q0 ${my - 22} 34 ${my - 14} Q30 ${my + 30} 0 ${my + 32} Q-30 ${my + 30} -34 ${my - 14} Z" fill="${ink}" /><path d="M-16 ${my + 22} Q0 ${my + 8} 16 ${my + 22} Q0 ${my + 30} -16 ${my + 22} Z" fill="${COL.rojo}" /></g>`,
      feliz: `<g class="boca ${id}-boca" data-o="0 ${my}"><path d="M-36 ${my - 8} Q0 ${my + 34} 36 ${my - 8} Z" fill="${ink}" stroke="${ink}" stroke-width="6" stroke-linejoin="round" /></g>`,
      serio: `<path class="boca ${id}-boca" data-o="0 ${my}" d="M-24 ${my} L24 ${my}" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />`,
      sorpresa: `<ellipse class="boca ${id}-boca" data-o="0 ${my + 4}" cx="0" cy="${my + 4}" rx="16" ry="20" fill="${ink}" />`,
    }[k];
    cara = `<path class="cejas ${id}-cejas" d="${ceja}" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${ojos}
      <ellipse cx="-92" cy="${fy + 18}" rx="18" ry="10" fill="${COL.rojo}" opacity="0.25" /><ellipse cx="92" cy="${fy + 18}" rx="18" ry="10" fill="${COL.rojo}" opacity="0.25" />${boca}`;
  }
  const tam = o.tam ?? 46;
  const texto = conTexto
    ? `<text${o.ignorar ? " data-layout-ignore" : ""} x="0" y="${-100 + tam * 0.3}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${tam}" fill="${ink}">${o.texto.map((l, i) => `<tspan x="0" dy="${i ? tam * 1.12 : 0}">${l}</tspan>`).join("")}</text>`
    : "";
  const mano = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="${c}" stroke="${ink}" stroke-width="6" />`;
  const brazos = {
    arriba: `<g class="${id}-bi"><path d="M-150 30 Q-200 0 -214 -70" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${mano(-214, -78)}</g>
             <g class="${id}-bd"><path d="M150 30 Q200 0 214 -70" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${mano(214, -78)}</g>`,
    puno: `<g class="${id}-bi"><path d="M-150 40 Q-200 60 -210 120" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${mano(-210, 126)}</g>
           <g class="${id}-bd"><path d="M150 20 Q196 -10 206 -90" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" /><rect x="186" y="-130" width="40" height="40" rx="12" fill="${c}" stroke="${ink}" stroke-width="6" /></g>`,
    abajo: `<g class="${id}-bi"><path d="M-150 40 Q-196 70 -204 130" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${mano(-204, 136)}</g>
            <g class="${id}-bd"><path d="M150 40 Q196 70 204 130" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />${mano(204, 136)}</g>`,
    cintura: `<g class="${id}-bi"><path d="M-150 30 L-196 70 L-150 106" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /></g>
              <g class="${id}-bd"><path d="M150 30 L196 70 L150 106" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /></g>`,
  }[o.brazos] ?? "";
  const piernas = o.piernas
    ? `<path d="M-50 150 L-56 206 M50 150 L56 206" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" />
       <path d="M-84 210 Q-60 194 -40 210 Z M84 210 Q60 194 40 210 Z" fill="${ink}" stroke="${ink}" stroke-width="8" stroke-linejoin="round" />`
    : "";
  return `<g transform="translate(${o.x} ${o.y}) rotate(${o.rot ?? 0}) scale(${o.s ?? 1})"><g class="pi ${ids}">
    ${o.atras ?? ""}${piernas}${brazos}
    <rect x="-138" y="-136" width="300" height="300" fill="#000" opacity="0.28" />
    <path d="M-150 -150 H150 V112 L112 150 H-150 Z" fill="${c}" stroke="${ink}" stroke-width="6" stroke-linejoin="round" />
    <rect x="-147" y="-147" width="294" height="40" fill="${cs}" opacity="0.4" />
    <path d="M150 112 L112 150 L120 120 Z" fill="${cs}" stroke="${ink}" stroke-width="6" stroke-linejoin="round" />
    ${texto}${cara}${o.extra ?? ""}
  </g></g>`;
}

// ---------- accesorios (coordenadas locales del post-it) ----------
export const megafono = (x = 150, y = -40, rot = -20) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0 -16 L40 -16 L130 -64 L130 64 L40 16 L0 16 Z" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" />
  <ellipse cx="130" cy="0" rx="14" ry="64" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="7" />
  <rect x="34" y="14" width="22" height="40" rx="6" fill="${COL.ink}" />
  <path d="M60 -26 L60 26" stroke="${COL.papel}" stroke-width="6" stroke-linecap="round" />
</g>`;
export const anteojos = (fy = 52) => `<g fill="none" stroke="${COL.ink}" stroke-width="6"><circle cx="-55" cy="${fy - 12}" r="30" /><circle cx="55" cy="${fy - 12}" r="30" /><path d="M-25 ${fy - 14} Q0 ${fy - 26} 25 ${fy - 14} M-85 ${fy - 16} L-140 ${fy - 30} M85 ${fy - 16} L140 ${fy - 30}" /></g>`;
export const bigote = (fy = 52) => `<path d="M0 ${fy + 20} Q-30 ${fy + 8} -58 ${fy + 30} Q-26 ${fy + 40} 0 ${fy + 26} Q26 ${fy + 40} 58 ${fy + 30} Q30 ${fy + 8} 0 ${fy + 20} Z" fill="${COL.papel}" stroke="${COL.ink}" stroke-width="5" stroke-linejoin="round" />`;
export const mono = (x = 96, y = -150) => `<g transform="translate(${x} ${y}) rotate(18)"><path d="M0 0 L-44 -26 L-44 26 Z M0 0 L44 -26 L44 26 Z" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" /><circle r="12" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="6" /></g>`;
export const vincha = (txt = "PARO") => `<g><rect x="-152" y="-138" width="304" height="40" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="5" /><text data-layout-ignore x="0" y="-108" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="38" fill="${COL.papel}">${txt}</text></g>`;
// tira de cinta adhesiva (semitransparente)
export const cinta = (x, y, w = 150, rot = -30, cls = "") => `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${cls}"><rect x="${-w / 2}" y="-22" width="${w}" height="44" fill="${COL.papel}" opacity="0.62" stroke="${COL.ink}" stroke-width="3" stroke-opacity="0.35" /><path d="M${-w / 2} -22 l6 8 l-6 8 l6 8 l-6 8 l6 8 l-6 4 M${w / 2} -22 l-6 8 l6 8 l-6 8 l6 8 l-6 8 l6 4" fill="none" stroke="${COL.ink}" stroke-width="2" stroke-opacity="0.3" /></g></g>`;

// pancarta de cartón con palo (coordenadas globales)
export function pancarta({ id = "", x, y, w = 420, h = 170, rot = 0, txt = [""], tam = 76, palo = 230, col = COL.ink }) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${id}">
    <rect x="-10" y="${h / 2 - 10}" width="20" height="${palo}" fill="${COL.cartons}" stroke="${COL.ink}" stroke-width="6" />
    <path d="M${-w / 2} ${-h / 2} L${w / 2 - 6} ${-h / 2 + 4} L${w / 2} ${h / 2} L${-w / 2 + 4} ${h / 2 - 4} Z" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
    <path d="M${-w / 2 + 30} ${-h / 2 + 20} L${-w / 2 + 70} ${-h / 2 + 24}" stroke="${COL.cartons}" stroke-width="5" stroke-linecap="round" />
    <text x="0" y="${-((txt.length - 1) * tam * 1.08) / 2 + tam * 0.34}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${tam}" fill="${col}">${txt.map((l, i) => `<tspan x="0" dy="${i ? tam * 1.08 : 0}">${l}</tspan>`).join("")}</text>
  </g></g>`;
}

// caja registradora (centro abajo en x,y; s escala; ancho base 560)
export function caja({ id = "", x = 540, y = 1480, s = 1, pantalla = "PARO" }) {
  const k = COL.ink;
  let teclas = "";
  for (let f = 0; f < 3; f++) for (let c = 0; c < 6; c++) teclas += `<circle cx="${-170 + c * 62}" cy="${-246 + f * 50}" r="17" fill="${COL.papel}" stroke="${k}" stroke-width="5" />`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${id}">
    <path d="M-280 0 L-280 -150 L280 -150 L280 0 Z" fill="${COL.cartons}" stroke="${k}" stroke-width="7" stroke-linejoin="round" />
    <rect x="-90" y="-112" width="180" height="22" rx="8" fill="${k}" />
    <path d="M-250 -150 L-220 -330 L220 -330 L250 -150 Z" fill="${COL.carton}" stroke="${k}" stroke-width="7" stroke-linejoin="round" />
    ${teclas}
    <rect x="160" y="-310" width="50" height="140" rx="10" fill="${COL.cartons}" stroke="${k}" stroke-width="6" />
    <path d="M-150 -330 L-150 -420 L150 -420 L150 -330" fill="${COL.carton}" stroke="${k}" stroke-width="7" stroke-linejoin="round" />
    <rect x="-118" y="-404" width="236" height="60" rx="6" fill="${k}" />
    <text x="0" y="-360" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="40" fill="${COL.rojo}">${pantalla}</text>
    <path d="M300 -60 Q340 -90 330 -150" fill="none" stroke="${k}" stroke-width="7" stroke-linecap="round" /><circle cx="330" cy="-160" r="18" fill="${COL.rojo}" stroke="${k}" stroke-width="6" />
  </g></g>`;
}

// ---------- escena ----------
const HELPERS = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const ESC = q(".esc");
      const org = (el, o) => (el instanceof SVGElement ? { svgOrigin: o ?? "0 0" } : { transformOrigin: o ?? "50% 50%" });
      const sacudon = (t, f = 1) => [[-16, 9], [12, -7], [-6, 3], [0, 0]].forEach(([x, y], i) => tl.to(ESC, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // aparece con rebote
      const pop = (sel, t, { d = 0.32, desde = 0.6, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: d, ease: "back.out(2)", immediateRender: false }, t);
      });
      // cae de golpe desde grande (palabra que pega)
      const golpe = (sel, t, { desde = 2.2, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde, ...org(el, o) }, { opacity: 1, scale: 1, ...org(el, o), duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      });
      // un post-it que se pega al corcho: llega grande y girado, se aplasta
      const pega = (sel, t, { rot = -10, o } = {}) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 1.45, rotation: rot, ...org(el, o) }, { opacity: 1, scale: 1, rotation: 0, ...org(el, o), duration: 0.2, ease: "power3.in", immediateRender: false }, t - 0.12);
        tl.to(el, { scaleY: 0.94, duration: 0.06, yoyo: true, repeat: 1, ...org(el, o) }, t + 0.08);
      });
      const entra = (sel, t, desde = { x: -700 }, d = 0.32) => qa(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, ...desde }, { opacity: 1, x: 0, y: 0, duration: d, ease: "back.out(1.3)", immediateRender: false }, t);
      });
      const dibujar = (sel, t, d = 0.5) => qa(sel).forEach((p) => {
        const L = p.getTotalLength();
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.to(p, { opacity: 1, duration: 0.01 }, t);
        tl.to(p, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      // la boca habla de t a t+d (data-o = origen local)
      const habla = (sel, t, d, per = 0.1, min = 0.45) => qa(sel).forEach((el) => {
        const o = el.dataset.o ?? "0 0";
        const n = Math.max(1, Math.round(d / per)) | 1;
        tl.fromTo(el, { scaleY: 1, svgOrigin: o }, { scaleY: min, svgOrigin: o, duration: per, yoyo: true, repeat: n, ease: "sine.inOut", immediateRender: false }, t);
      });
      // vaivén (respira)
      const respira = (sel, t, d, dy = 8, per = 0.5) => qa(sel).forEach((el) => tl.fromTo(el, { y: 0 }, { y: dy, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      // se balancea girando (de t a t+d)
      const balancea = (sel, t, d, deg = 4, per = 0.25, o) => qa(sel).forEach((el) => tl.fromTo(el, { rotation: -deg, ...org(el, o) }, { rotation: deg, ...org(el, o), duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per)) | 1, ease: "sine.inOut", immediateRender: false }, t));
      // pestañeo
      const pestanea = (sel, t) => qa(sel).forEach((el) => tl.to(el, { scaleY: 0.1, ...org(el, el.dataset?.o), duration: 0.06, yoyo: true, repeat: 1 }, t));
      // texto HTML que se escribe letra por letra (spans .le)
      const escribe = (sel, t, d = 0.5) => qa(sel).forEach((el) => {
        const ls = [...el.querySelectorAll(".le")];
        ls.forEach((l, i) => { gsap.set(l, { opacity: 0 }); tl.to(l, { opacity: 1, duration: 0.01 }, t + (d * i) / ls.length); });
      });
`;

// letras sueltas para escribe()
export const letras = (s) => [...s].map((ch) => (ch === " " ? " " : `<span class="le">${ch}</span>`)).join("");

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
    ${P} .mk { position: absolute; font-family: "Caveat", cursive; font-weight: 700; line-height: 0.95; white-space: nowrap; color: ${COL.papel}; text-shadow: 0 5px 0 rgba(20, 10, 4, 0.75); }
    ${P} .tit { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; letter-spacing: -0.02em; white-space: nowrap; }
    ${P} .le { display: inline; }
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

// duración de cada escena según tiempos.md
export function duracion(id) {
  const m = fs.readFileSync("tiempos.md", "utf8").match(new RegExp(`### ${id} — dura ([0-9.]+) s`));
  return Number(m[1]);
}

// persona de busto (periodista o dueño). Coordenadas locales: cabeza en (0,-230), hombros en y -130,
// corte abajo en y 160. o: { id, x, y, s, ropa, pelo: "corto"|"largo"|"pelado", bigote, delantal, cara: "habla"|"sonrisa"|"nervioso", extra }
export function persona(o) {
  const k = COL.ink, piel = "#f3c9a0";
  const id = o.id ?? "";
  const pelo = {
    largo: `<path d="M-92 -230 C-100 -340 100 -340 92 -230 L96 -120 L60 -130 L62 -230 C40 -270 -40 -270 -62 -230 L-60 -130 L-96 -120 Z" fill="${COL.ink}" stroke="${k}" stroke-width="6" stroke-linejoin="round" />`,
    corto: `<path d="M-80 -250 C-84 -330 84 -330 80 -250 C60 -280 -60 -280 -80 -250 Z" fill="#5a3a24" stroke="${k}" stroke-width="6" stroke-linejoin="round" />`,
    pelado: `<path d="M-82 -236 C-92 -210 -86 -190 -78 -186 M82 -236 C92 -210 86 -190 78 -186" fill="none" stroke="#8a8a8a" stroke-width="14" stroke-linecap="round" />`,
  }[o.pelo ?? "corto"];
  const my = -186;
  const boca = o.cara === "nervioso"
    ? `<g class="boca ${id}-boca" data-o="0 ${my}"><path d="M-34 ${my - 6} Q0 ${my + 22} 34 ${my - 6} Z" fill="${COL.papel}" stroke="${k}" stroke-width="6" stroke-linejoin="round" /><path d="M-22 ${my + 2} V${my + 10} M-8 ${my + 4} V${my + 14} M8 ${my + 4} V${my + 14} M22 ${my + 2} V${my + 10}" stroke="${k}" stroke-width="3" /></g>`
    : o.cara === "sonrisa"
      ? `<path class="boca ${id}-boca" data-o="0 ${my}" d="M-26 ${my - 6} Q0 ${my + 20} 26 ${my - 6}" fill="none" stroke="${k}" stroke-width="7" stroke-linecap="round" />`
      : `<ellipse class="boca ${id}-boca" data-o="0 ${my}" cx="0" cy="${my}" rx="20" ry="13" fill="${k}" />`;
  const cejas = o.cara === "nervioso" ? `M-56 -270 L-22 -262 M56 -270 L22 -262` : `M-56 -266 Q-38 -278 -20 -266 M56 -266 Q38 -278 20 -266`;
  return `<g transform="translate(${o.x} ${o.y}) scale(${o.s ?? 1})"><g class="${id}">
    <path d="M-190 160 C-190 -40 -150 -110 -60 -130 L60 -130 C150 -110 190 -40 190 160 Z" fill="${o.ropa ?? COL.rojo}" stroke="${k}" stroke-width="7" stroke-linejoin="round" />
    ${o.delantal ? `<path d="M-90 -100 L90 -100 L110 160 L-110 160 Z" fill="${COL.papel}" stroke="${k}" stroke-width="6" stroke-linejoin="round" /><path d="M-90 -100 Q0 -70 90 -100" fill="none" stroke="${k}" stroke-width="5" /><rect x="-50" y="20" width="100" height="60" rx="8" fill="none" stroke="${k}" stroke-width="5" />` : `<path d="M-40 -128 L0 -70 L40 -128" fill="${COL.papel}" stroke="${k}" stroke-width="6" stroke-linejoin="round" />`}
    <rect x="-28" y="-160" width="56" height="40" fill="${piel}" stroke="${k}" stroke-width="6" />
    ${o.pelo === "largo" ? pelo : ""}
    <ellipse cx="0" cy="-230" rx="80" ry="92" fill="${piel}" stroke="${k}" stroke-width="7" />
    <ellipse cx="-82" cy="-226" rx="14" ry="22" fill="${piel}" stroke="${k}" stroke-width="6" /><ellipse cx="82" cy="-226" rx="14" ry="22" fill="${piel}" stroke="${k}" stroke-width="6" />
    ${o.pelo !== "largo" ? pelo : `<path d="M-74 -250 C-60 -300 40 -320 78 -250 C30 -290 -30 -280 -74 -250 Z" fill="${COL.ink}" />`}
    <path d="${cejas}" fill="none" stroke="${k}" stroke-width="7" stroke-linecap="round" />
    <g class="${id}-ojos"><ellipse cx="-36" cy="-236" rx="10" ry="13" fill="${k}" /><ellipse cx="36" cy="-236" rx="10" ry="13" fill="${k}" /></g>
    <path d="M0 -226 Q-12 -206 4 -202" fill="none" stroke="${k}" stroke-width="5" stroke-linecap="round" />
    ${o.bigote ? `<path d="M0 -204 Q-28 -214 -52 -194 Q-24 -186 0 -196 Q24 -186 52 -194 Q28 -214 0 -204 Z" fill="#5a3a24" stroke="${k}" stroke-width="5" stroke-linejoin="round" />` : ""}
    ${boca}
    ${o.extra ?? ""}
  </g></g>`;
}
// rollo de cinta adhesiva (centro x,y)
export const rollo = (x, y, s = 1, cls = "") => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}"><circle r="62" fill="${COL.papel}" opacity="0.85" stroke="${COL.ink}" stroke-width="6" /><circle r="30" fill="${COL.carton}" stroke="${COL.ink}" stroke-width="6" /><path d="M40 46 L96 92 L72 108 L30 58" fill="${COL.papel}" opacity="0.85" stroke="${COL.ink}" stroke-width="4" stroke-linejoin="round" /></g></g>`;
