// Piezas comunes de las escenas de el-tesoro: genera HTML autocontenidos (cada escena es un archivo suelto).
import fs from "node:fs";
export const DIR = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
export const C = {
  perg: "#ecd7a6", perg2: "#c9a46a", tinta: "#2b1a0c", sepia: "#6b4423", rojo: "#d23a2a", oro: "#f5b82e",
  mar: "#2f7fb5", piel: "#e9b98c", noche: "#0b2438",
};
export const duraciones = () => {
  const out = {};
  for (const m of fs.readFileSync(`${DIR}/tiempos.md`, "utf8").matchAll(/### (s\d\d-[\w-]+) — dura ([\d.]+) s/g)) out[m[1]] = Number(m[2]);
  return out;
};

// ---------- personajes (coordenadas locales; envolver en <g transform="translate() scale()">) ----------
// CAPITÁN: centro de la cara en 0,0; sombrero hasta y -210, saco hasta y 330.
export const capitan = (P, { brazo = false, boca = true } = {}) => `
<g class="${P}-cap">
  <path class="tinta" fill="${C.rojo}" d="M-190 330 C-185 230 -140 172 -60 150 L60 150 C140 172 185 230 190 330 Z" />
  <path class="tinta" fill="${C.perg}" d="M-44 152 L0 250 L44 152 Z" />
  <path fill="none" stroke="${C.oro}" stroke-width="8" stroke-linecap="round" d="M-64 152 L-8 280 M64 152 L8 280" />
  <circle class="tinta" fill="${C.oro}" cx="-40" cy="300" r="10" /><circle class="tinta" fill="${C.oro}" cx="40" cy="300" r="10" />
  <path fill="none" stroke="${C.oro}" stroke-width="10" stroke-linecap="round" d="M-176 240 l-6 40 M176 240 l6 40" />
  ${brazo ? `<g class="${P}-cap-brazo"><path fill="none" stroke="${C.tinta}" stroke-width="58" stroke-linecap="round" d="M150 220 C215 190 262 150 296 108" /><path fill="none" stroke="${C.rojo}" stroke-width="46" stroke-linecap="round" d="M150 220 C215 190 262 150 296 108" /><circle class="tinta" fill="${C.piel}" cx="306" cy="96" r="28" /><path class="tinta" fill="${C.piel}" d="M318 84 L360 50 L368 60 L330 96 Z" /></g>` : ""}
  <circle class="tinta" fill="${C.piel}" cx="-92" cy="12" r="20" /><circle class="tinta" fill="${C.piel}" cx="92" cy="12" r="20" />
  <ellipse class="tinta" fill="${C.piel}" cx="0" cy="0" rx="92" ry="102" />
  <path class="tinta" fill="${C.sepia}" d="M-96 8 C-112 120 -62 205 0 212 C62 205 112 120 96 8 C76 58 44 72 0 72 C-44 72 -76 58 -96 8 Z" />
  <path fill="none" stroke="${C.perg}" stroke-width="4" stroke-linecap="round" opacity="0.35" d="M-70 110 q10 14 0 28 M-30 150 q10 14 0 28 M30 150 q10 14 0 28 M70 110 q10 14 0 28 M0 176 q10 12 0 24" />
  ${boca ? `<ellipse class="${P}-cap-boca" fill="${C.tinta}" cx="0" cy="88" rx="24" ry="15" />` : ""}
  <path class="tinta" fill="${C.tinta}" d="M-64 52 C-34 28 -12 36 0 46 C12 36 34 28 64 52 C44 64 22 62 0 56 C-22 62 -44 64 -64 52 Z" />
  <circle class="tinta" fill="${C.piel}" cx="0" cy="26" r="20" />
  <circle class="${P}-cap-ojo" fill="${C.tinta}" cx="-36" cy="-10" r="10" />
  <path class="${P}-cap-ceja" fill="none" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" d="M-60 -38 L-16 -30" />
  <path fill="none" stroke="${C.tinta}" stroke-width="6" d="M16 -24 L-86 -62 M58 -6 L94 6" />
  <ellipse fill="${C.tinta}" cx="38" cy="-10" rx="24" ry="20" />
  <path class="tinta" fill="${C.tinta}" d="M-170 -58 C-128 -152 -62 -204 0 -210 C62 -204 128 -152 170 -58 C104 -92 52 -82 0 -98 C-52 -82 -104 -92 -170 -58 Z" />
  <path fill="none" stroke="${C.oro}" stroke-width="9" stroke-linecap="round" d="M-166 -62 C-104 -94 -52 -84 0 -100 C52 -84 104 -94 166 -62" />
  <circle fill="${C.perg}" cx="0" cy="-152" r="22" /><circle fill="${C.tinta}" cx="-8" cy="-154" r="5" /><circle fill="${C.tinta}" cx="8" cy="-154" r="5" />
  <path fill="none" stroke="${C.perg}" stroke-width="7" stroke-linecap="round" d="M-30 -112 L30 -132 M-30 -132 L30 -112" />
</g>`;

// GRUMETE: centro de la cara en 0,0; pañuelo hasta y -100, remera hasta y 300.
export const grumete = (P, { brazo = false } = {}) => `
<g class="${P}-gru">
  <path class="tinta" fill="${C.perg}" d="M-122 300 C-116 200 -82 140 -30 124 L30 124 C82 140 116 200 122 300 Z" />
  <path fill="none" stroke="${C.mar}" stroke-width="16" d="M-92 180 H92 M-106 222 H106 M-114 264 H114" />
  <path class="tinta" fill="none" d="M-122 300 C-116 200 -82 140 -30 124 L30 124 C82 140 116 200 122 300" />
  <path class="tinta" fill="${C.piel}" d="M-22 70 h44 v62 h-44 Z" />
  ${brazo ? `<g class="${P}-gru-brazo"><path fill="none" stroke="${C.tinta}" stroke-width="44" stroke-linecap="round" d="M96 200 C150 170 170 110 168 60" /><path fill="none" stroke="${C.perg}" stroke-width="32" stroke-linecap="round" d="M96 200 C150 170 170 110 168 60" /><circle class="tinta" fill="${C.piel}" cx="168" cy="52" r="22" /></g>` : ""}
  <circle class="tinta" fill="${C.piel}" cx="-70" cy="10" r="15" /><circle class="tinta" fill="${C.piel}" cx="70" cy="10" r="15" />
  <circle class="tinta" fill="${C.oro}" cx="-74" cy="34" r="7" />
  <circle class="tinta" fill="${C.piel}" cx="0" cy="0" r="72" />
  <path class="tinta" fill="${C.rojo}" d="M-76 -6 C-78 -80 -32 -102 0 -102 C32 -102 78 -80 76 -6 C42 -30 -42 -30 -76 -6 Z" />
  <circle fill="${C.perg}" cx="-30" cy="-62" r="6" /><circle fill="${C.perg}" cx="12" cy="-76" r="6" /><circle fill="${C.perg}" cx="44" cy="-50" r="6" /><circle fill="${C.perg}" cx="-50" cy="-30" r="5" />
  <path class="tinta" fill="${C.rojo}" d="M70 -24 l46 -18 l-6 34 Z M70 -20 l40 22 l-22 16 Z" />
  <g class="${P}-gru-ojos">
    <circle class="tinta" fill="#fbf3dc" cx="-26" cy="2" r="17" /><circle class="tinta" fill="#fbf3dc" cx="26" cy="2" r="17" />
    <circle class="${P}-gru-pupila" fill="${C.tinta}" cx="-24" cy="4" r="7" /><circle class="${P}-gru-pupila" fill="${C.tinta}" cx="28" cy="4" r="7" />
  </g>
  <path fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" d="M-40 -24 l24 -6 M16 -30 l24 6" />
  <circle fill="${C.sepia}" cx="-44" cy="26" r="3" /><circle fill="${C.sepia}" cx="-34" cy="32" r="3" /><circle fill="${C.sepia}" cx="36" cy="32" r="3" /><circle fill="${C.sepia}" cx="46" cy="26" r="3" />
  <ellipse class="${P}-gru-boca" fill="${C.tinta}" cx="0" cy="42" rx="16" ry="11" />
</g>`;

// LORO: cuerpo en 0,0; cresta hasta y -190, cola hasta y 240. Mira a la derecha.
export const loro = (P) => `
<g class="${P}-loro">
  <path class="tinta" fill="${C.mar}" d="M-14 90 L-46 236 L6 224 L28 100 Z" />
  <path class="tinta" fill="${C.oro}" d="M8 96 L22 244 L54 226 L30 96 Z" />
  <path fill="none" stroke="${C.oro}" stroke-width="7" stroke-linecap="round" d="M-24 122 l-12 26 l8 4 M24 122 l-2 28 l10 2" />
  <ellipse class="tinta" fill="${C.rojo}" cx="0" cy="20" rx="70" ry="106" />
  <g class="${P}-loro-ala">
    <path class="tinta" fill="${C.mar}" d="M-48 -16 C-104 30 -96 120 -36 160 C-24 104 -22 40 -48 -16 Z" />
    <path class="tinta" fill="${C.oro}" d="M-80 110 C-70 136 -54 150 -36 160 C-34 140 -34 124 -36 108 Z" />
  </g>
  <path class="tinta" fill="${C.oro}" d="M-6 -136 L-20 -190 L8 -150 L18 -196 L28 -146 L52 -180 L40 -132 Z" />
  <circle class="tinta" fill="${C.rojo}" cx="12" cy="-90" r="60" />
  <ellipse class="tinta" fill="${C.perg}" cx="34" cy="-92" rx="26" ry="30" />
  <circle fill="${C.tinta}" cx="36" cy="-98" r="10" /><circle fill="#fbf3dc" cx="39" cy="-101" r="3.5" />
  <g class="${P}-loro-pico"><path class="tinta" fill="${C.tinta}" d="M56 -72 C72 -68 84 -60 88 -48 C74 -40 60 -46 54 -58 Z" /></g>
  <path class="tinta" fill="${C.perg}" d="M54 -104 C98 -104 108 -72 90 -48 C82 -62 70 -70 56 -72 Z" />
</g>`;

// PORCIÓN DE FUGAZZETA (punta arriba, centro 0,0, ~200 x 260)
export const porcion = (P) => `
<g class="${P}-porcion">
  <path class="tinta" fill="${C.oro}" d="M0 -126 L-96 112 C-32 132 32 132 96 112 Z" />
  <path class="tinta" fill="${C.perg2}" d="M-102 108 C-34 132 34 132 102 108 L106 128 C34 154 -34 154 -106 128 Z" />
  <g fill="none" stroke="${C.perg}" stroke-width="6"><ellipse cx="-20" cy="20" rx="26" ry="16" /><ellipse cx="34" cy="70" rx="24" ry="14" /><ellipse cx="4" cy="-50" rx="18" ry="11" /><ellipse cx="-50" cy="86" rx="20" ry="12" /></g>
  <g fill="${C.sepia}"><circle cx="20" cy="10" r="4" /><circle cx="-40" cy="50" r="4" /><circle cx="0" cy="96" r="4" /><circle cx="14" cy="-20" r="4" /><circle cx="60" cy="98" r="4" /></g>
</g>`;

// ROSA DE LOS VIENTOS (centro 0,0, radio ~110)
export const rosa = (P) => `
<g class="${P}-rosa">
  <circle fill="none" stroke="${C.tinta}" stroke-width="4" cx="0" cy="0" r="96" /><circle fill="none" stroke="${C.tinta}" stroke-width="2" cx="0" cy="0" r="84" />
  <path class="tinta" fill="${C.perg2}" d="M0 -70 L14 -14 L70 0 L14 14 L0 70 L-14 14 L-70 0 L-14 -14 Z" transform="rotate(45)" />
  <path class="tinta" fill="${C.oro}" d="M0 -112 L18 -18 L112 0 L18 18 L0 112 L-18 18 L-112 0 L-18 -18 Z" />
  <path fill="${C.rojo}" d="M0 -112 L18 -18 L0 0 Z" />
  <circle class="tinta" fill="${C.perg}" cx="0" cy="0" r="10" />
  <text data-layout-ignore x="0" y="-122" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="34" fill="${C.tinta}">N</text>
</g>`;

// BARCO (centro de la quilla en 0,0, ~420 de ancho; mástiles hasta y -330)
export const barco = (P) => `
<g class="${P}-barco">
  <path fill="none" stroke="${C.tinta}" stroke-width="8" d="M-40 -10 V-330 M90 -10 V-260" />
  <g class="${P}-velas">
    <path class="tinta" fill="${C.perg}" d="M-150 -300 C-110 -270 30 -270 70 -300 C80 -240 80 -170 70 -110 C30 -130 -110 -130 -150 -110 C-140 -170 -140 -240 -150 -300 Z" />
    <path class="tinta" fill="${C.perg}" d="M30 -240 C60 -222 130 -222 160 -240 C166 -196 166 -150 160 -110 C130 -122 60 -122 30 -110 C36 -150 36 -196 30 -240 Z" />
    <path fill="none" stroke="${C.rojo}" stroke-width="10" stroke-linecap="round" d="M-60 -240 L-20 -170 M-20 -240 L-60 -170" />
  </g>
  <path class="tinta" fill="${C.rojo}" d="M-40 -330 L20 -350 L-40 -372 Z" />
  <path class="tinta" fill="${C.sepia}" d="M-220 -40 L230 -40 L190 40 L-170 40 Z" />
  <path fill="none" stroke="${C.oro}" stroke-width="6" d="M-205 -20 L222 -20" />
  <g fill="${C.tinta}"><circle cx="-110" cy="8" r="9" /><circle cx="-40" cy="8" r="9" /><circle cx="30" cy="8" r="9" /><circle cx="100" cy="8" r="9" /></g>
</g>`;

// olas (línea ondulada de ancho w desde x)
export const ola = (x, y, w, amp = 18, paso = 80) => {
  let d = `M${x} ${y} q${paso / 2} ${-amp} ${paso} 0`;
  for (let i = paso; i < w; i += paso) d += ` t${paso} 0`;
  return d;
};

// ---------- la escena ----------
export function escena({ id, dur, css = "", body, js }) {
  const P = id.slice(0, 3);
  const S = `[data-composition-id="${id}"]`;
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .${P}-capa { position: absolute; inset: 0; }
    ${S} .${P}-escenario { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .tinta { stroke: ${C.tinta}; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .trazo { fill: none; stroke: ${C.tinta}; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${S} .mar { fill: none; stroke: ${C.mar}; stroke-width: 6; stroke-linecap: round; }
    ${S} .grande { position: absolute; left: 0; right: 0; text-align: center; font-family: "Cinzel", serif; font-weight: 900; line-height: 1; white-space: nowrap; color: ${C.oro}; -webkit-text-stroke: 12px ${C.tinta}; paint-order: stroke fill; text-shadow: 8px 10px 0 ${C.tinta}; }
    ${S} .mano { font-family: "Caveat", cursive; font-weight: 700; color: ${C.tinta}; }
    ${S} .sello { position: absolute; white-space: nowrap; text-align: center; font-family: "Cinzel", serif; font-weight: 900; line-height: 1; color: ${C.rojo}; border: 10px solid ${C.rojo}; border-radius: 18px; padding: 16px 30px 10px; background: rgba(236, 215, 166, 0.92); }
    ${S} .rotulo { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; text-transform: uppercase; color: ${C.perg}; }
${css.replaceAll("&", S).replaceAll("XX", P).split("\n").map((l) => "    " + l.trim()).join("\n")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${P}-escena" class="${P}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${P}-escenario">
${body.replaceAll("XX", P)}
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

      // helpers
      const pop = (el, t, from = 0.6, d = 0.32) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: d, ease: "back.out(1.8)", immediateRender: false }, t);
      };
      const slam = (el, t, from = 2.4) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      };
      const fuera = (el, t, d = 0.22) => tl.to(el, { opacity: 0, scale: 0.8, transformOrigin: "50% 50%", duration: d, ease: "power2.in" }, t);
      const golpe = (t, f = 14) => {
        [[-f, f * 0.6], [f * 0.8, -f * 0.5], [-f * 0.4, f * 0.2], [0, 0]].forEach(([x, y], i) => tl.to(q(".${P}-escenario"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      };
      const dibujar = (els, t, d = 0.6, st = 0.05) => {
        [].concat(els).forEach((el, i) => {
          const L = el.getTotalLength ? el.getTotalLength() + 2 : 1000;
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
          tl.set(el, { opacity: 1 }, t + i * st);
          tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t + i * st);
        });
      };
      // boca que habla entre t0 y t1
      const hablar = (el, t0, t1, r = 0.11) => {
        const n = Math.max(1, Math.floor((t1 - t0) / (2 * r)));
        tl.fromTo(el, { scaleY: 0.3, transformOrigin: "50% 50%" }, { scaleY: 1.15, transformOrigin: "50% 50%", duration: r, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
      };
      // respirar / flotar (cantidad fija de repeticiones)
      const flotar = (el, t, hasta, amp = 8, per = 0.9) => {
        const n = Math.max(1, Math.floor((hasta - t) / per));
        tl.fromTo(el, { y: 0 }, { y: -amp, duration: per, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t);
      };
${js.replaceAll("XX", P).split("\n").map((l) => "      " + l).join("\n")}

      // salida
      tl.to(q("#${P}-escena"), { opacity: 0, filter: "blur(6px)", scale: 1.04, transformOrigin: "50% 50%", duration: 0.28, ease: "power2.in" }, DUR - 0.28);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`${DIR}/compositions/${id}.html`, html);
}
export const sfx = (id, arr) => fs.writeFileSync(`${DIR}/compositions/${id}.sfx.json`, "[\n" + arr.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");

// pergamino con bordes gastados: rectángulo x,y,w,h con ondulaciones (determinista)
export const pergamino = (cls, x, y, w, h, fill = C.perg) => {
  const wob = (i) => [3, -4, 5, -2, 4, -5, 2, -3][i % 8];
  let d = `M${x} ${y}`;
  const n = 8;
  for (let i = 1; i <= n; i++) d += ` L${x + (w * i) / n} ${y + wob(i)}`;
  for (let i = 1; i <= n; i++) d += ` L${x + w + wob(i + 3)} ${y + (h * i) / n}`;
  for (let i = n - 1; i >= 0; i--) d += ` L${x + (w * i) / n} ${y + h + wob(i + 5)}`;
  for (let i = n - 1; i >= 1; i--) d += ` L${x + wob(i + 1)} ${y + (h * i) / n}`;
  d += " Z";
  return `<path class="${cls} tinta" fill="${fill}" d="${d}" /><path fill="none" stroke="${C.perg2}" stroke-width="16" opacity="0.55" d="${d}" transform="translate(${x + w / 2} ${y + h / 2}) scale(0.975) translate(${-x - w / 2} ${-y - h / 2})" />`;
};
