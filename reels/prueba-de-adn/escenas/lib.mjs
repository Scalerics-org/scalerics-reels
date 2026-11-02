// Piezas comunes de las escenas de "Prueba de ADN": el molde de cada composición, los personajes
// dibujados (Norma, Rubén, el de enfrente, Romina, el guardia), los sillones, el sobre y la silla.
// Los usa escenas/hacer.mjs para escribir compositions/sNN-*.html.

export const C = {
  noche: "#0a1250", rey2: "#13207a", rey: "#2343c9",
  am: "#ffd21f", rojo: "#e5262d", crema: "#fff4dc", verde: "#5ce611",
};

// borde festoneado alrededor de una elipse (pelo con volumen de los 90)
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

const { noche, rey, am, rojo, crema } = C;

// ---------- personajes (cabeza centrada en 0,0; el cuerpo baja hasta y ~330) ----------
// Cada uno tiene .<p>-boca (la que habla) y piezas con clase para animar.

export const norma = (p = "nor") => `
<g class="${p}">
  <path d="${nube(0, -10, 128, 140, 14, 34, 0.2)}" fill="${am}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-150 340 L-162 160 Q-160 108 -108 100 L-34 94 L0 150 L34 94 L108 100 Q160 108 162 160 L150 340 Z" fill="${rojo}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-34 94 L0 150 L34 94 Z" fill="${crema}" />
  <path d="M-34 94 L-12 210 M34 94 L12 210" stroke="${crema}" stroke-width="5" stroke-linecap="round" fill="none" />
  <circle cx="0" cy="250" r="9" fill="${am}" /><circle cx="0" cy="295" r="9" fill="${am}" />
  <rect x="-22" y="50" width="44" height="52" fill="${crema}" />
  <ellipse cx="0" cy="0" rx="62" ry="74" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-64 -24 C-72 -92 -20 -104 0 -82 C20 -108 76 -92 64 -24 C44 -58 12 -54 0 -44 C-14 -58 -46 -58 -64 -24 Z" fill="${am}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-38 -22 Q-26 -32 -12 -24 M12 -24 Q26 -32 38 -22" stroke="${noche}" stroke-width="5" fill="none" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-24" cy="-4" r="7" fill="${noche}" /><circle cx="24" cy="-4" r="7" fill="${noche}" />
  <path d="M-34 -10 L-38 -16 M-28 -13 L-30 -20 M34 -10 L38 -16 M28 -13 L30 -20" stroke="${noche}" stroke-width="3" stroke-linecap="round" /></g>
  <circle cx="-36" cy="22" r="11" fill="${rojo}" opacity="0.35" /><circle cx="36" cy="22" r="11" fill="${rojo}" opacity="0.35" />
  <ellipse class="${p}-boca" cx="0" cy="40" rx="17" ry="10" fill="${rojo}" stroke="${noche}" stroke-width="3" />
  <circle cx="-64" cy="26" r="13" fill="none" stroke="${rojo}" stroke-width="6" /><circle cx="64" cy="26" r="13" fill="none" stroke="${rojo}" stroke-width="6" />
  <g class="${p}-mic">
    <rect x="86" y="36" width="16" height="92" rx="6" fill="${noche}" stroke="${crema}" stroke-width="3" />
    <circle cx="94" cy="30" r="20" fill="${crema}" stroke="${noche}" stroke-width="4" />
    <path d="M80 24 H108 M80 36 H108 M88 12 V48 M100 12 V48" stroke="${noche}" stroke-width="2" opacity="0.6" />
    <circle cx="94" cy="126" r="22" fill="${crema}" stroke="${noche}" stroke-width="4" />
  </g>
</g>`;

export const ruben = (p = "rub") => `
<g class="${p}">
  <path d="M-140 340 Q-152 172 -100 116 Q-50 96 0 100 Q50 96 100 116 Q152 172 140 340 Z" fill="${crema}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-82 150 H82 L98 340 H-98 Z" fill="${rey}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-60 150 L-40 104 M60 150 L40 104" stroke="${rey}" stroke-width="12" stroke-linecap="round" />
  <rect x="30" y="200" width="46" height="50" rx="6" fill="none" stroke="${crema}" stroke-width="4" />
  <path d="M44 214 V178" stroke="${am}" stroke-width="9" stroke-linecap="round" /><path d="M60 214 V184 M52 184 H68" stroke="${crema}" stroke-width="6" stroke-linecap="round" />
  <rect x="-22" y="58" width="44" height="48" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="-66" cy="4" rx="12" ry="18" fill="${crema}" stroke="${noche}" stroke-width="4" /><ellipse cx="66" cy="4" rx="12" ry="18" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="66" ry="76" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-66 -10 C-70 -40 -58 -52 -46 -50 M66 -10 C70 -40 58 -52 46 -50" stroke="${noche}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.55" />
  <path d="M-20 -60 Q-6 -66 6 -58 M10 -64 Q20 -68 28 -62" stroke="${noche}" stroke-width="3" fill="none" opacity="0.5" />
  <path class="${p}-cejas" d="M-44 -34 L-12 -28 M12 -28 L44 -34" stroke="${noche}" stroke-width="7" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-26" cy="-8" r="6" fill="${noche}" /><circle cx="26" cy="-8" r="6" fill="${noche}" /></g>
  <circle cx="-26" cy="-8" r="21" fill="none" stroke="${noche}" stroke-width="4" /><circle cx="26" cy="-8" r="21" fill="none" stroke="${noche}" stroke-width="4" />
  <path d="M-5 -8 H5" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="16" rx="13" ry="15" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse class="${p}-boca" cx="0" cy="50" rx="15" ry="10" fill="${noche}" />
  <path d="M-44 36 C-34 18 -8 20 0 28 C8 20 34 18 44 36 C28 32 12 40 0 35 C-12 40 -28 32 -44 36 Z" fill="${noche}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
  <g class="${p}-lagrimas" opacity="0"><path d="M-30 18 C-36 30 -36 40 -30 42 C-24 40 -24 30 -30 18 Z M30 18 C24 30 24 40 30 42 C36 40 36 30 30 18 Z" fill="${crema}" stroke="${rey}" stroke-width="3" /></g>
</g>`;

export const enfrente = (p = "enf") => `
<g class="${p}">
  <path d="M-146 340 L-150 160 Q-148 110 -100 104 L-30 98 L0 160 L30 98 L100 104 Q148 110 150 160 L146 340 Z" fill="${am}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-30 98 L0 160 L30 98 Z" fill="${crema}" />
  <path d="M-30 98 L-6 186 L-40 150 Z M30 98 L6 186 L40 150 Z" fill="${am}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-26 108 Q0 176 26 108" fill="none" stroke="${noche}" stroke-width="6" stroke-dasharray="2 10" stroke-linecap="round" />
  <rect x="-22" y="52" width="44" height="52" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="62" ry="74" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-66 -6 C-80 -70 -40 -118 14 -112 C64 -110 90 -78 74 -40 C66 -20 64 -8 62 4 C56 -30 40 -46 10 -44 C-24 -42 -50 -40 -66 -6 Z" fill="${noche}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-20 -92 C10 -104 40 -96 56 -76" stroke="${am}" stroke-width="6" fill="none" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-24" cy="-4" r="6" fill="${noche}" /><path d="M14 -4 Q24 -12 34 -4" stroke="${noche}" stroke-width="5" fill="none" stroke-linecap="round" /></g>
  <g class="${p}-lentes">
    <path d="M-58 -16 H62" stroke="${am}" stroke-width="5" />
    <rect x="-58" y="-24" width="50" height="36" rx="12" fill="${noche}" stroke="${am}" stroke-width="5" />
    <rect x="8" y="-24" width="50" height="36" rx="12" fill="${noche}" stroke="${am}" stroke-width="5" />
    <path d="M-46 -14 L-30 2 M20 -14 L36 2" stroke="${crema}" stroke-width="4" stroke-linecap="round" opacity="0.8" />
  </g>
  <path d="M-4 10 Q4 22 -6 28" stroke="${noche}" stroke-width="4" fill="none" stroke-linecap="round" />
  <path class="${p}-boca" d="M-26 42 Q4 58 32 36" stroke="${noche}" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M32 40 L66 30" stroke="${crema}" stroke-width="5" stroke-linecap="round" />
</g>`;

export const romina = (p = "rom") => `
<g class="${p}">
  <path d="M60 -50 C130 -40 150 40 120 130 C110 160 90 170 80 160 C110 90 100 10 50 -20 Z" fill="${noche}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-120 340 L-128 170 Q-124 112 -84 104 L-26 96 Q0 120 26 96 L84 104 Q124 112 128 170 L120 340 Z" fill="${rojo}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-20" y="52" width="40" height="50" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="58" ry="70" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-62 10 C-74 -62 -30 -96 10 -90 C52 -86 72 -52 62 4 C50 -26 30 -40 4 -42 C-12 -24 -40 -18 -62 10 Z" fill="${noche}" stroke="${crema}" stroke-width="4" stroke-linejoin="round" />
  <circle cx="52" cy="-58" r="12" fill="${am}" />
  <path class="${p}-cejas" d="M-36 -26 L-12 -20 M12 -20 L36 -26" stroke="${noche}" stroke-width="5" stroke-linecap="round" />
  <g class="${p}-ojos"><circle cx="-22" cy="-4" r="7" fill="${noche}" /><circle cx="22" cy="-4" r="7" fill="${noche}" /></g>
  <circle cx="-58" cy="24" r="7" fill="${am}" /><circle cx="58" cy="24" r="7" fill="${am}" />
  <ellipse class="${p}-boca" cx="0" cy="38" rx="14" ry="9" fill="${noche}" />
</g>`;

export const guardia = (p = "gua") => `
<g class="${p}">
  <path d="M-200 360 L-206 150 Q-200 86 -120 76 L120 76 Q200 86 206 150 L200 360 Z" fill="${noche}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-26" y="34" width="52" height="48" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <ellipse cx="0" cy="0" rx="54" ry="62" fill="${crema}" stroke="${noche}" stroke-width="4" />
  <path d="M-54 -14 C-54 -60 -30 -66 0 -66 C30 -66 54 -60 54 -14 C40 -30 -40 -30 -54 -14 Z" fill="${noche}" stroke="${crema}" stroke-width="3" />
  <rect x="-46" y="-12" width="40" height="24" rx="6" fill="${noche}" /><rect x="6" y="-12" width="40" height="24" rx="6" fill="${noche}" /><path d="M-6 -2 H6" stroke="${noche}" stroke-width="5" />
  <path d="M-18 36 H18" stroke="${noche}" stroke-width="6" stroke-linecap="round" />
  <path d="M58 6 C74 16 74 40 60 62" stroke="${crema}" stroke-width="3" fill="none" />
  <text x="0" y="168" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="40" fill="${am}" letter-spacing="2">SEGURIDAD</text>
  <rect x="-180" y="200" width="360" height="76" rx="38" fill="${noche}" stroke="${crema}" stroke-width="5" />
  <path d="M-100 220 V258 M100 220 V258" stroke="${crema}" stroke-width="4" opacity="0.5" />
</g>`;

export const sillonAtras = (color) =>
  `<rect x="-200" y="-40" width="400" height="380" rx="80" fill="${color}" stroke="${crema}" stroke-width="5" />
   <path d="M-150 20 Q0 -10 150 20" stroke="${crema}" stroke-width="4" fill="none" opacity="0.4" />`;
export const sillonDelante = (color) =>
  `<rect x="-215" y="280" width="430" height="110" rx="34" fill="${color}" stroke="${crema}" stroke-width="5" />
   <rect x="-250" y="150" width="86" height="240" rx="40" fill="${color}" stroke="${crema}" stroke-width="5" />
   <rect x="164" y="150" width="86" height="240" rx="40" fill="${color}" stroke="${crema}" stroke-width="5" />
   <path d="M-180 390 V430 M180 390 V430" stroke="${crema}" stroke-width="8" stroke-linecap="round" />`;

export const sobre = (p = "sob") => `
<g class="${p}">
  <rect x="-230" y="-150" width="460" height="300" rx="14" fill="${crema}" stroke="${noche}" stroke-width="5" />
  <path class="${p}-solapa" d="M-230 -150 L0 20 L230 -150" fill="none" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-230 150 L-60 10 M230 150 L60 10" stroke="${noche}" stroke-width="3" opacity="0.4" />
  <circle cx="0" cy="22" r="40" fill="${rojo}" stroke="${noche}" stroke-width="4" />
  <text x="0" y="34" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="${crema}">ADN</text>
  <text x="0" y="112" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${noche}" letter-spacing="3">CONFIDENCIAL</text>
</g>`;

export const silla = (p = "silla", seat = rojo) => `
<g class="${p}">
  <path d="M-50 -90 V40 M50 -90 V40 M-50 -90 H50 M-50 -50 H50" stroke="${crema}" stroke-width="10" stroke-linecap="round" fill="none" />
  <path d="M-62 30 H62 L56 50 H-56 Z" fill="${seat}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-50 50 L-62 130 M50 50 L62 130 M-40 50 L40 130 M40 50 L-40 130" stroke="${crema}" stroke-width="8" stroke-linecap="round" />
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
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${pre}-capa { position: absolute; inset: 0; }
    ${S} .${pre}-esc { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .lin { fill: none; stroke: ${crema}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; }
    ${S} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.12em; }
    ${S} .zoc { position: absolute; left: 50px; top: 1376px; display: flex; height: 104px; border: 4px solid ${crema}; border-radius: 10px; overflow: hidden; box-shadow: 8px 8px 0 rgba(10, 18, 80, 0.75); }
    ${S} .zoc .tab { display: flex; align-items: center; padding: 0 18px; background: ${rojo}; color: ${crema}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
    ${S} .zoc .tab.verde { background: ${C.verde}; color: ${noche}; }
    ${S} .zoc .tit { display: flex; align-items: center; padding: 0 26px; background: ${am}; color: ${noche}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; letter-spacing: -0.01em; text-transform: uppercase; white-space: nowrap; }
    ${S} .sello b { display: inline-block; padding: 10px 28px; border: 7px solid ${rojo}; border-radius: 14px; color: ${rojo}; background: rgba(10, 18, 80, 0.88); font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; }
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
      // zócalos: cada uno entra desde la izquierda y saca al anterior
      const zocalos = (pares) => pares.forEach(([sel, t], i) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out", immediateRender: false }, t);
        if (i > 0) tl.to(q(pares[i - 1][0]), { opacity: 0, y: 30, duration: 0.18 }, t);
      });

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
