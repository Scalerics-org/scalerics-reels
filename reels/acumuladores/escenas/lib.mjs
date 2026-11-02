// Piezas comunes de las escenas de "Acumuladores": el molde de cada composición, los personajes
// dibujados (Norma, Patricia, peatón), las cajas de cartón y el celular.
// Los usa escenas/hacer.mjs para escribir compositions/sNN-*.html.

export const C = {
  cem: "#2b2a28", cem2: "#1c1b1a", gris: "#77736b",
  kraft: "#c08a4e", kraft2: "#8a5a2b",
  cinta: "#f2c230", rojo: "#d7332b", crema: "#f4ecd8", turq: "#19c2a5",
};
const { cem, cem2, gris, kraft, kraft2, cinta, rojo, crema, turq } = C;

// borde festoneado alrededor de una elipse (rulos)
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

// ---------- cajas ----------
// caja kraft con solapas, cinta amarilla y etiqueta a mano. (x, y) = esquina superior izquierda.
export const caja = (cls, x, y, w, h, { txt = "", urgente = false, fragil = false, tam = 30, vendido = false } = {}) => {
  const cx = x + w / 2;
  const et = txt
    ? `<rect x="${cx - Math.min(w * 0.36, 90)}" y="${y + h * 0.42}" width="${Math.min(w * 0.72, 180)}" height="${tam + 18}" rx="4" fill="${crema}" transform="rotate(-3 ${cx} ${y + h * 0.5})" />
       <text x="${cx}" y="${y + h * 0.42 + tam + 4}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="${tam}" fill="${cem2}" transform="rotate(-3 ${cx} ${y + h * 0.5})" data-layout-ignore>${txt}</text>`
    : "";
  const urg = urgente
    ? `<text x="${x + 14}" y="${y + h - 14}" font-family="Black Ops One" font-size="${Math.round(w * 0.13)}" fill="${rojo}" opacity="0.9" data-layout-ignore>URGENTE</text>`
    : "";
  const fra = fragil
    ? `<text x="${x + w - 14}" y="${y + h - 14}" text-anchor="end" font-family="Black Ops One" font-size="${Math.round(w * 0.12)}" fill="${rojo}" opacity="0.85" data-layout-ignore>FRÁGIL</text>`
    : "";
  const ven = vendido
    ? `<g transform="rotate(-10 ${cx} ${y + h / 2})"><rect x="${cx - w * 0.4}" y="${y + h / 2 - 26}" width="${w * 0.8}" height="52" rx="8" fill="none" stroke="${turq}" stroke-width="6" />
       <text x="${cx}" y="${y + h / 2 + 13}" text-anchor="middle" font-family="Black Ops One" font-size="${Math.round(Math.min(36, w * 0.17))}" fill="${turq}" data-layout-ignore>VENDIDO</text></g>`
    : "";
  return `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${kraft}" stroke="${cem2}" stroke-width="4" />
    <path d="M${x} ${y + h * 0.2} H${x + w}" stroke="${kraft2}" stroke-width="3" />
    <rect x="${cx - w * 0.09}" y="${y}" width="${w * 0.18}" height="${h * 0.34}" fill="${cinta}" opacity="0.9" />
    <path d="M${x + 6} ${y + h - 6} L${x + w * 0.3} ${y + h - 6}" stroke="${kraft2}" stroke-width="3" opacity="0.6" />
    ${et}${urg}${fra}${ven}
  </g>`;
};

// pared de cajas: filas de abajo hacia arriba. Devuelve el svg de todas (clase cls-f<fila>-<i>)
export const pared = (cls, { x0 = 0, x1 = 1080, yBase = 1370, filas = 6, w = 180, h = 130, txts = ["CAMPERAS"], urg = [], fra = [] } = {}) => {
  let s = "", k = 0;
  for (let f = 0; f < filas; f++) {
    const off = f % 2 ? w / 2 : 0;
    for (let x = x0 - off; x < x1; x += w) {
      const y = yBase - (f + 1) * h - ((k * 7) % 3) * 2;
      const t = txts[k % txts.length];
      s += caja(`${cls} ${cls}-f${f}`, x + ((k * 5) % 7) - 3, y, w - 4, h - 3, { txt: t, urgente: urg.includes(k), fragil: fra.includes(k), tam: 28 });
      k++;
    }
  }
  return s;
};

// ---------- personajes (cabeza centrada en 0,0; el cuerpo baja hasta y ~330) ----------
export const norma = (p = "nor", { brazos = "abajo" } = {}) => {
  const B = {
    abajo: `<path d="M-120 140 Q-150 230 -120 320" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><path d="M120 140 Q150 230 120 320" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" />
      <circle cx="-120" cy="326" r="22" fill="${crema}" stroke="${cem2}" stroke-width="4" /><circle cx="120" cy="326" r="22" fill="${crema}" stroke="${cem2}" stroke-width="4" />`,
    arriba: `<g class="${p}-bi"><path d="M-110 140 Q-190 60 -200 -60" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><circle cx="-202" cy="-80" r="24" fill="${crema}" stroke="${cem2}" stroke-width="4" /></g>
      <g class="${p}-bd"><path d="M110 140 Q190 60 200 -60" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><circle cx="202" cy="-80" r="24" fill="${crema}" stroke="${cem2}" stroke-width="4" /></g>`,
    abiertos: `<g class="${p}-bi"><path d="M-110 140 Q-220 150 -300 110" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><circle cx="-312" cy="104" r="24" fill="${crema}" stroke="${cem2}" stroke-width="4" /></g>
      <g class="${p}-bd"><path d="M110 140 Q220 150 300 110" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><circle cx="312" cy="104" r="24" fill="${crema}" stroke="${cem2}" stroke-width="4" /></g>`,
    cruzados: `<path d="M-120 150 Q-130 230 -40 236 L90 226" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><path d="M120 150 Q130 220 40 214 L-90 206" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" stroke-opacity="0.95" />
      <path d="M-96 196 L84 238" stroke="${cem2}" stroke-width="3" opacity="0.5" />`,
    manos: `<path d="M-120 140 Q-110 230 -30 250" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" /><path d="M120 140 Q110 230 30 250" stroke="${rojo}" stroke-width="44" stroke-linecap="round" fill="none" />
      <ellipse cx="0" cy="250" rx="40" ry="28" fill="${crema}" stroke="${cem2}" stroke-width="4" />`,
  }[brazos];
  return `
<g class="${p}">
  <path d="M-140 340 L-148 170 Q-146 112 -96 104 L-30 98 Q0 130 30 98 L96 104 Q146 112 148 170 L140 340 Z" fill="${rojo}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-30 98 Q0 130 30 98 L22 340 H-22 Z" fill="${crema}" stroke="${cem2}" stroke-width="3" />
  <circle cx="-44" cy="170" r="7" fill="${cinta}" /><circle cx="-44" cy="220" r="7" fill="${cinta}" /><circle cx="-44" cy="270" r="7" fill="${cinta}" />
  ${B}
  <rect x="-20" y="52" width="40" height="50" fill="${crema}" stroke="${cem2}" stroke-width="4" />
  <path d="${nube(0, -22, 92, 92, 13, 22, 0.3)}" fill="#d8d2c4" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <ellipse cx="0" cy="4" rx="62" ry="72" fill="${crema}" stroke="${cem2}" stroke-width="4" />
  <path d="${nube(0, -58, 66, 26, 9, 14, 3.4)}" fill="#d8d2c4" stroke="${crema}" stroke-width="3" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-38 -22 Q-24 -30 -10 -24 M10 -24 Q24 -30 38 -22" stroke="${cem2}" stroke-width="5" fill="none" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-24" cy="-4" r="7" fill="${cem2}" /><circle cx="24" cy="-4" r="7" fill="${cem2}" /></g>
  <circle cx="-24" cy="-4" r="20" fill="none" stroke="${cem2}" stroke-width="4" /><circle cx="24" cy="-4" r="20" fill="none" stroke="${cem2}" stroke-width="4" /><path d="M-4 -6 H4" stroke="${cem2}" stroke-width="4" />
  <path d="M-44 -2 Q-70 60 -30 96 M44 -2 Q70 60 30 96" stroke="${cinta}" stroke-width="3" fill="none" stroke-dasharray="3 6" stroke-linecap="round" />
  <circle cx="-36" cy="26" r="11" fill="${rojo}" opacity="0.35" /><circle cx="36" cy="26" r="11" fill="${rojo}" opacity="0.35" />
  <path d="M-4 10 Q0 22 6 18" stroke="${cem2}" stroke-width="4" fill="none" stroke-linecap="round" />
  <ellipse class="${p}-boca" cx="0" cy="42" rx="15" ry="9" fill="${rojo}" stroke="${cem2}" stroke-width="3" />
  <g class="${p}-lagrima" opacity="0"><path d="M-30 18 C-38 34 -38 44 -30 48 C-22 44 -22 34 -30 18 Z" fill="${crema}" stroke="${turq}" stroke-width="3" /></g>
</g>`;
};

export const patricia = (p = "pat", { brazo = "abajo" } = {}) => {
  const guante = (x, y) => `<g><rect x="${x - 26}" y="${y - 30}" width="52" height="60" rx="20" fill="${cinta}" stroke="${cem2}" stroke-width="4" />
    <path d="M${x - 16} ${y - 30} V${y - 52} M${x - 4} ${y - 30} V${y - 58} M${x + 8} ${y - 30} V${y - 56} M${x + 20} ${y - 26} V${y - 46}" stroke="${cinta}" stroke-width="12" stroke-linecap="round" />
    <rect x="${x - 30}" y="${y + 22}" width="60" height="20" rx="6" fill="${cinta}" stroke="${cem2}" stroke-width="4" /></g>`;
  const BD = {
    abajo: `<path d="M118 140 Q150 230 122 310" stroke="${gris}" stroke-width="42" stroke-linecap="round" fill="none" /><g class="${p}-gd">${guante(122, 340)}</g>`,
    señala: `<path d="M118 140 Q60 120 -40 90" stroke="${gris}" stroke-width="42" stroke-linecap="round" fill="none" /><g class="${p}-gd"><g transform="rotate(-90 -70 86)">${guante(-70, 86)}</g></g>`,
    arriba: `<path d="M118 140 Q170 60 170 -40" stroke="${gris}" stroke-width="42" stroke-linecap="round" fill="none" /><g class="${p}-gd">${guante(170, -76)}</g>`,
  }[brazo];
  return `
<g class="${p}">
  <path d="M-140 340 L-146 168 Q-144 112 -96 104 L96 104 Q144 112 146 168 L140 340 Z" fill="${crema}" stroke="${cem2}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-86 150 H86 L100 340 H-100 Z" fill="${gris}" stroke="${cem2}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-62 150 L-44 104 M62 150 L44 104" stroke="${gris}" stroke-width="12" stroke-linecap="round" />
  <rect x="-40" y="210" width="80" height="54" rx="6" fill="none" stroke="${crema}" stroke-width="4" opacity="0.7" />
  <path d="M-118 140 Q-150 230 -122 310" stroke="${gris}" stroke-width="42" stroke-linecap="round" fill="none" /><g class="${p}-gi">${guante(-122, 340)}</g>
  ${BD}
  <rect x="-20" y="54" width="40" height="50" fill="${crema}" stroke="${cem2}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="60" ry="72" fill="${crema}" stroke="${cem2}" stroke-width="4" />
  <circle cx="0" cy="-104" r="36" fill="${cem2}" stroke="${crema}" stroke-width="4" />
  <path d="M-62 4 C-70 -66 -30 -84 0 -82 C30 -84 70 -66 62 4 C56 -32 30 -50 0 -48 C-30 -50 -56 -32 -62 4 Z" fill="${cem2}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path class="${p}-cejas" d="M-40 -28 L-12 -22 M12 -22 L40 -28" stroke="${cem2}" stroke-width="6" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-24" cy="-6" r="7" fill="${cem2}" /><circle cx="24" cy="-6" r="7" fill="${cem2}" /></g>
  <path d="M-4 8 Q0 20 6 16" stroke="${cem2}" stroke-width="4" fill="none" stroke-linecap="round" />
  <ellipse class="${p}-boca" cx="0" cy="40" rx="14" ry="7" fill="${cem2}" />
  <path d="M-62 34 Q0 60 62 34" stroke="${crema}" stroke-width="0" fill="none" />
</g>`;
};

// peatón que mira el celular (silueta gris con pantalla prendida); pies en y 0, cabeza ~-250
export const peaton = (p = "pea", color = gris) => `
<g class="${p}">
  <circle cx="0" cy="-250" r="34" fill="${color}" stroke="${crema}" stroke-width="4" />
  <path d="M-46 -200 Q0 -214 46 -200 L40 -80 H-40 Z" fill="${color}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-24 -80 L-30 0 M24 -80 L30 0" stroke="${color}" stroke-width="22" stroke-linecap="round" />
  <path d="M40 -190 Q60 -160 30 -150" stroke="${color}" stroke-width="18" stroke-linecap="round" fill="none" />
  <rect x="18" y="-176" width="24" height="38" rx="5" fill="${crema}" transform="rotate(-20 30 -157)" />
  <path d="M30 -150 L4 -228" stroke="${crema}" stroke-width="3" opacity="0.35" />
</g>`;

// celular (x, y = esquina superior izquierda; 500 x 790)
export const celular = (x = 290, y = 560, titulo = "", color = turq) => `
  <rect x="${x}" y="${y}" width="500" height="790" rx="56" fill="${cem2}" stroke="${crema}" stroke-width="6" />
  <rect x="${x + 20}" y="${y + 20}" width="460" height="750" rx="40" fill="${crema}" />
  <rect x="${x + 200}" y="${y + 32}" width="100" height="18" rx="9" fill="${cem2}" />
  <rect x="${x + 20}" y="${y + 66}" width="460" height="92" fill="${color}" />
  <text x="${x + 46}" y="${y + 126}" font-family="Lexend" font-weight="800" font-size="36" fill="${cem2}">${titulo}</text>`;

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
    @font-face { font-family: "Black Ops One"; font-weight: 400; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${pre}-capa { position: absolute; inset: 0; }
    ${S} .${pre}-esc { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .lin { fill: none; stroke: ${crema}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; }
    ${S} .ops { font-family: "Black Ops One", sans-serif; font-weight: 400; }
    ${S} .mano { font-family: "Caveat", cursive; font-weight: 700; text-transform: none; }
    ${S} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.12em; }
    ${S} .zoc { position: absolute; left: 50px; top: 1376px; display: flex; height: 100px; border: 4px solid ${cem2}; border-radius: 6px; overflow: hidden; box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.55); }
    ${S} .zoc .tab { display: flex; align-items: center; padding: 0 18px; background: ${rojo}; color: ${crema}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
    ${S} .zoc .tab.turq { background: ${turq}; color: ${cem2}; }
    ${S} .zoc .tit { display: flex; align-items: center; padding: 0 26px; background: ${cinta}; color: ${cem2}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; letter-spacing: -0.01em; text-transform: uppercase; white-space: nowrap; }
    ${S} .sello b { display: inline-block; padding: 8px 26px; border: 7px solid ${rojo}; border-radius: 10px; color: ${rojo}; background: rgba(28, 27, 26, 0.85); font-family: "Black Ops One", sans-serif; font-weight: 400; text-transform: uppercase; white-space: nowrap; }
    ${S} .sello.turq b { border-color: ${turq}; color: ${turq}; }
    ${S} .tira { position: absolute; left: -60px; right: -60px; height: 128px; background: ${cinta}; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 0 rgba(0, 0, 0, 0.35); }
    ${S} .tira span { font-family: "Black Ops One", sans-serif; font-size: 92px; color: ${cem2}; white-space: nowrap; line-height: 1; }
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
      // cae desde arriba y rebota (cajas)
      const cae = (sel, t, dy = -700, d = 0.4) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, y: dy }, { opacity: 1, y: 0, duration: d, ease: "bounce.out", immediateRender: false }, t);
      });
      // tira de cinta que entra cruzando
      const tira = (sel, t, desde = -1300) => lista(sel).forEach((el) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 1, x: desde }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, t);
      });
      const fuera = (sel, t, d = 0.25) => tl.to(lista(sel), { opacity: 0, duration: d }, t);
      const sacudon = (t, f = 1, sel = ".${pre}-esc") => [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(sel), { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // la boca se mueve mientras habla
      const hablar = (sel, t0, t1) => {
        const n = Math.max(1, Math.floor((t1 - t0) / 0.12));
        tl.fromTo(q(sel), { scaleY: 0.45, transformOrigin: "50% 50%" }, { scaleY: 1.25, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: n % 2 ? n : n + 1, immediateRender: false }, t0);
      };
      // zócalos: cada uno entra desde la izquierda y saca al anterior
      const zocalos = (pares) => pares.forEach(([sel, t], i) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out", immediateRender: false }, t);
        if (i > 0) tl.to(q(pares[i - 1][0]), { opacity: 0, y: 30, duration: 0.18 }, t);
      });
      // cámara en mano: deriva lenta del contenedor de la escena
      tl.fromTo(q(".${pre}-esc"), { scale: 1.0, transformOrigin: "50% 55%" }, { scale: 1.035, duration: DUR, ease: "none" }, 0);

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
