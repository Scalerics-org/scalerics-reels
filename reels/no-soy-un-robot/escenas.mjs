// Genera compositions/sNN-*.html y .sfx.json de "No soy un robot" (las piezas de UI se repiten:
// tarjeta, casilla, escudo con ojos, cuadrícula 3x3, el dueño). Correr desde la carpeta del reel:
//   node escenas.mjs && node armar.mjs
// Las duraciones salen de tiempos.md (correr armar.mjs antes si cambió la voz).
import fs from "node:fs";

const DURS = {};
for (const m of fs.readFileSync("tiempos.md", "utf8").matchAll(/### (\S+) — dura ([\d.]+) s/g)) DURS[m[1]] = Number(m[2]);

const C = { fondo: "#e9edf3", blanco: "#ffffff", borde: "#c9d1dc", tinta: "#1d2433", gris: "#6b7689", azul: "#2f6fed", verde: "#1fae5b", rojo: "#e5484d" };

// ---------------- piezas SVG ----------------
const tarjeta = (x, y, w, h, extra = "") =>
  `<rect x="${x}" y="${y + 10}" width="${w}" height="${h}" rx="16" fill="rgba(29,36,51,0.07)" />
   <rect class="${extra}" x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C.blanco}" stroke="${C.borde}" stroke-width="3" />`;

// el captcha como personaje: escudo genérico con ojos (caja 0..120 x 0..130)
const escudo = (cls = "") => `<g class="escudo ${cls}">
    <path d="M60 6 L110 24 V62 C110 94 88 114 60 126 C32 114 10 94 10 62 V24 Z" fill="${C.blanco}" stroke="${C.azul}" stroke-width="7" stroke-linejoin="round" />
    <g class="ojos">
      <ellipse class="ojo" cx="42" cy="62" rx="9" ry="12" fill="${C.tinta}" />
      <ellipse class="ojo" cx="78" cy="62" rx="9" ry="12" fill="${C.tinta}" />
    </g>
    <path class="parpados" d="M28 50 L56 58 M92 50 L64 58" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0" />
    <path class="boca" d="M46 92 H74" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" fill="none" />
  </g>`;

// widget "No soy un robot": tarjeta 760x190 en (160, y)
const widget = (y, label = "No soy un robot") => `<g class="widget">
    ${tarjeta(160, y, 760, 190)}
    <rect class="casilla" x="210" y="${y + 55}" width="80" height="80" rx="10" fill="${C.blanco}" stroke="${C.borde}" stroke-width="5" />
    <text class="ui w-label" x="325" y="${y + 112}" font-size="50" font-weight="500" fill="${C.tinta}">${label}</text>
    <g transform="translate(762 ${y + 22}) scale(0.95)">${escudo("w-escudo")}</g>
    <text class="mono" x="819" y="${y + 172}" font-size="17" fill="${C.gris}" text-anchor="middle" letter-spacing="2" data-layout-ignore>VERIFICACIÓN</text>
  </g>`;

// tilde y cruz dentro de una caja de 80 en (x, y)
const tilde = (x, y, color = C.verde, cls = "tilde", w = 10) => `<path class="${cls}" d="M${x + 16} ${y + 42} L${x + 34} ${y + 60} L${x + 66} ${y + 20}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" />`;
const cruz = (x, y, s, color = C.rojo, cls = "cruz", w = 12) => `<path class="${cls}" d="M${x} ${y} L${x + s} ${y + s} M${x + s} ${y} L${x} ${y + s}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" />`;

// cursor flecha (punta en 0,0)
const cursor = (cls = "cursor") => `<g class="${cls}"><path d="M0 0 L0 62 L16 48 L28 74 L40 68 L28 43 L50 43 Z" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="4" stroke-linejoin="round" /></g>`;

// ---- desafío: tarjeta con encabezado azul y cuadrícula 3x3 ----
const TX = (c) => 185 + c * 240, TY = (r) => 790 + r * 240;
const desafio = ({ chica, grande, intento = 1, celdas }) => `<g class="desafio">
    ${tarjeta(160, 580, 760, 1010)}
    <rect x="185" y="605" width="710" height="160" rx="8" fill="${C.azul}" />
    <text class="ui" x="215" y="662" font-size="30" font-weight="500" fill="${C.blanco}">${chica}</text>
    <text class="ui" x="215" y="728" font-size="42" font-weight="800" fill="${C.blanco}">${grande}</text>
    ${celdas
      .map((dib, k) => {
        const x = TX(k % 3), y = TY(Math.floor(k / 3));
        return `<g transform="translate(${x} ${y})"><g class="celda c${k}">
        <g class="img img${k}"><rect x="0" y="0" width="230" height="230" fill="#f4f6fa" stroke="${C.borde}" stroke-width="2" />${dib(k)}</g>
        <g class="sel sel${k}" opacity="0"><circle cx="26" cy="26" r="22" fill="${C.azul}" stroke="${C.blanco}" stroke-width="4" /><path d="M15 26 L23 34 L38 18" fill="none" stroke="${C.blanco}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></g>
      </g></g>`;
      })
      .join("\n")}
    <text class="mono intento" x="190" y="1550" font-size="28" fill="${C.gris}" letter-spacing="2">INTENTO ${intento} DE 3</text>
    <g class="boton"><rect x="705" y="1508" width="190" height="60" rx="8" fill="${C.azul}" /><text class="ui" x="800" y="1548" font-size="26" font-weight="700" fill="${C.blanco}" text-anchor="middle" letter-spacing="1">VERIFICAR</text></g>
  </g>`;

// ---- dibujos de las celdas (caja 230x230, trazo tinta) ----
const T = `fill="none" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
const HORAS = ["23:47", "23:12", "00:31", "23:58", "22:40", "01:05", "23:21", "00:09", "23:35"];
const carita = (cx, cy, r = 26) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.blanco}" ${T} /><path d="M${cx - 12} ${cy - 3} h8 M${cx + 4} ${cy - 3} h8 M${cx - 13} ${cy + 5} q6 4 11 0 M${cx + 2} ${cy + 5} q6 4 11 0 M${cx - 7} ${cy + 15} h14" ${T} stroke-width="3" />`;
const celdaPedido = (k) => `
  <g class="chat"><rect x="18" y="30" width="96" height="62" rx="14" fill="${C.blanco}" ${T} /><path d="M34 92 l-8 16 l22 -16" fill="${C.blanco}" ${T} /><path d="M32 52 h${50 + (k % 3) * 8} M32 70 h${36 + ((k + 1) % 3) * 10}" stroke="${C.gris}" stroke-width="5" stroke-linecap="round" /></g>
  <path d="M122 62 h24 m-10 -10 l10 10 l-10 10" fill="none" stroke="${C.azul}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <g class="hoja"><rect x="154" y="28" width="60" height="84" fill="${C.blanco}" ${T} /><path d="M154 49 h60 M154 70 h60 M154 91 h60 M174 28 v84" stroke="${C.tinta}" stroke-width="2.5" /><rect class="fila" x="176" y="${51 + (k % 3) * 21}" width="36" height="17" fill="${C.azul}" opacity="0" /></g>
  ${carita(64, 160)}
  <text class="mono" x="208" y="208" font-size="24" fill="${C.gris}" text-anchor="end" data-layout-ignore>${HORAS[k]}</text>
  <path d="M196 140 a16 16 0 1 0 14 22 a12 12 0 1 1 -14 -22 Z" fill="none" stroke="${C.gris}" stroke-width="3" />`;
const NOMBRES = ["Marta", "Gómez", "Sofi", "Rubén", "Lucía", "Walter", "Ana", "Néstor", "Graciela"];
const celdaListo = (k) => `
  <rect x="16" y="40" width="198" height="110" rx="16" fill="${C.blanco}" ${T} /><path d="M40 150 l-10 18 l26 -18" fill="${C.blanco}" ${T} />
  <text class="ui" x="32" y="82" font-size="24" font-weight="600" fill="${C.tinta}">Tu pedido</text>
  <text class="ui" x="32" y="114" font-size="24" font-weight="600" fill="${C.tinta}">está listo</text>
  <path d="M158 136 l6 6 l10 -12 M170 136 l6 6 l10 -12" fill="none" stroke="${C.azul}" stroke-width="3" stroke-linecap="round" />
  <text class="ui" x="115" y="208" font-size="26" font-weight="500" fill="${C.gris}" text-anchor="middle">${NOMBRES[k]}</text>`;
const celdaSemaforo = (k) => `
  <rect x="88" y="26" width="54" height="128" rx="14" fill="${C.blanco}" ${T} />
  <circle cx="115" cy="54" r="13" fill="${k % 3 === 0 ? C.rojo : C.blanco}" ${T} stroke-width="3" />
  <circle cx="115" cy="90" r="13" fill="${k % 3 === 1 ? "#f2b13b" : C.blanco}" ${T} stroke-width="3" />
  <circle cx="115" cy="126" r="13" fill="${k % 3 === 2 ? C.verde : C.blanco}" ${T} stroke-width="3" />
  <path d="M115 154 V210 M80 210 h70" ${T} />
  ${k === 4 ? `<path class="corazon" d="M178 64 c-10 -16 -32 -6 -22 10 l22 22 l22 -22 c10 -16 -12 -26 -22 -10 Z" fill="${C.rojo}" stroke="none" />` : ""}`;
const celdaStock = (k) => `
  <path d="M22 96 l40 -20 l40 20 v54 l-40 20 l-40 -20 Z M22 96 l40 20 l40 -20 M62 116 v54" fill="${C.blanco}" ${T} />
  <path d="M112 112 h22 m-9 -9 l9 9 l-9 9" fill="none" stroke="${C.azul}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="142" y="64" width="72" height="96" rx="8" fill="${C.blanco}" ${T} /><path d="M158 100 h8 l6 24 h26 l6 -18 h-34" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round" /><circle cx="176" cy="134" r="4" fill="${C.tinta}" /><circle cx="194" cy="134" r="4" fill="${C.tinta}" />
  <text class="mono" x="20" y="52" font-size="26" fill="${C.tinta}" data-layout-ignore>${["12", "7", "31", "4", "18", "9", "25", "3", "40"][k]}</text>
  <path d="M60 38 l14 14 M74 38 l-14 14" stroke="${C.rojo}" stroke-width="3" stroke-linecap="round" opacity="0.8" />
  <text class="mono" x="208" y="210" font-size="24" fill="${C.gris}" text-anchor="end" data-layout-ignore>${HORAS[(k + 4) % 9]}</text>`;

// el dueño (busto, caja 0..400 x 0..400)
const dueno = (cls = "dueno", boca = "grito") => `<g class="${cls}">
    <path class="d-traz" d="M60 400 C70 320 120 292 200 292 C280 292 330 320 340 400" fill="${C.blanco}" ${T} stroke-width="5" />
    <path class="d-traz" d="M168 262 v30 M232 262 v30" ${T} stroke-width="5" />
    <ellipse class="d-traz" cx="200" cy="160" rx="96" ry="112" fill="${C.blanco}" ${T} stroke-width="5" />
    <path class="d-traz" d="M104 130 C110 50 290 50 296 130 M126 82 l-22 -30 M166 58 l-6 -38 M214 54 l10 -36 M258 70 l28 -26 M286 104 l30 -10" ${T} stroke-width="5" />
    <path class="d-traz" d="M150 150 h36 M214 150 h36" ${T} stroke-width="6" />
    <path class="d-traz" d="M148 172 q20 14 40 0 M212 172 q20 14 40 0" fill="none" stroke="${C.gris}" stroke-width="4" stroke-linecap="round" />
    <path class="d-traz" d="M198 176 q-8 24 6 28" ${T} stroke-width="4" />
    ${boca === "grito" ? `<ellipse class="d-boca" cx="200" cy="232" rx="26" ry="18" fill="${C.tinta}" />` : `<path class="d-traz d-boca" d="M176 236 q24 -12 48 0" ${T} stroke-width="5" />`}
  </g>`;

// ---------------- plantilla de escena ----------------
function escena({ id, css = "", html, js, sfx }) {
  const DUR = DURS[id];
  if (!DUR) throw new Error("sin duración: " + id);
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc, ${P} .cam { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .ui { font-family: "Lexend", sans-serif; }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
    ${P} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; line-height: 1; white-space: nowrap; color: ${C.tinta}; }
    ${P} .rotulo { position: absolute; left: 0; right: 0; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; text-transform: uppercase; white-space: nowrap; color: ${C.azul}; }
    ${P} .sello { position: absolute; padding: 10px 30px; border: 9px solid ${C.rojo}; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; color: ${C.rojo}; background: rgba(255,255,255,0.92); line-height: 1.05; }
${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="cam">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const lista = (s) => (typeof s === "string" ? qa(s) : [].concat(s));
      const tl = gsap.timeline({ paused: true });
      // trazos que se dibujan (opacity 0 hasta que arrancan: sin puntitos de los caps)
      function dibujar(s, t, d = 0.6) {
        lista(s).forEach((el) => {
          const L = (el.getTotalLength ? el.getTotalLength() : 1200) + 2;
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
          tl.set(el, { opacity: 1 }, t);
          tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
        });
      }
      function pop(s, t, d = 0.35) {
        const els = lista(s);
        gsap.set(els, { opacity: 0 });
        tl.fromTo(els, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: d, ease: "back.out(1.6)", immediateRender: false }, t);
      }
      function golpe(s, t, desde = 2.2) {
        const els = lista(s);
        gsap.set(els, { opacity: 0 });
        tl.fromTo(els, { opacity: 0, scale: desde, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.14, ease: "power4.in", immediateRender: false }, Math.max(0, t - 0.1));
      }
      function sacudir(t, a = 14) {
        [[-a, a * 0.6], [a * 0.8, -a * 0.5], [-a * 0.4, a * 0.25], [0, 0]].forEach(([x, y], i) => tl.to(q(".cam"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      }
      function fuera(s, t, d = 0.2) { tl.to(lista(s), { opacity: 0, duration: d, ease: "power2.in" }, t); }
      // cámara: se acerca despacio toda la escena
      tl.fromTo(q(".cam"), { scale: 1.035 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
${js}
      // salida
      tl.to(q(".esc"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx));
}

// selección de celdas (JS): marca la celda k en t
const marcarJS = `
      function marcar(k, t) {
        tl.to(q(".img" + k), { scale: 0.86, svgOrigin: "115 115", duration: 0.18, ease: "power2.out" }, t);
        tl.fromTo(q(".sel" + k), { opacity: 0, scale: 0.4, svgOrigin: "26 26" }, { opacity: 1, scale: 1, svgOrigin: "26 26", duration: 0.22, ease: "back.out(2.4)", immediateRender: false }, t);
      }
      function cursorA(k, t, d = 0.3) {
        const x = 185 + (k % 3) * 240 + 140, y = 790 + Math.floor(k / 3) * 240 + 140;
        tl.to(q(".cursor"), { x, y, duration: d, ease: "power2.inOut" }, t - d);
      }`;

const ESCENAS = [];
const add = (e) => ESCENAS.push(e);

// ===== s01: el gancho =====
add({
  id: "s01-verificacion",
  css: `P .s01-titulo { top: 600px; font-size: 64px; font-weight: 800; letter-spacing: -0.01em; }
    P .s01-sub { top: 690px; font-size: 34px; font-weight: 500; color: #6b7689; }
    P .s01-sello { left: 250px; top: 1150px; font-size: 92px; transform: rotate(-7deg); }
    P .s01-noche { top: 1370px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: #6b7689; }`,
  html: `
        <div class="txt s01-titulo">Verificación de seguridad</div>
        <div class="txt s01-sub">Demostrá que no sos un robot</div>
        <svg class="full" viewBox="0 0 1080 1920">
          ${widget(840)}
          <path class="s01-luna" d="M930 790 a40 40 0 1 0 34 56 a30 30 0 1 1 -34 -56 Z" fill="none" stroke="${C.gris}" stroke-width="5" stroke-linejoin="round" />
        </svg>
        <div class="txt s01-noche">ACTIVIDAD NOCTURNA DETECTADA</div>
        <div class="sello s01-sello">Como uno</div>`,
  js: `
      // cuadro 0 ya con algo: la tarjeta entra a medio camino
      tl.fromTo(q(".widget"), { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".s01-titulo"), { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      gsap.set(q(".s01-sub"), { opacity: 0 });
      tl.fromTo(q(".s01-sub"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, 1.5);
      // el escudo mira: parpadea, y en "robot" entrecierra los ojos
      tl.to(q(".ojos"), { scaleY: 0.1, svgOrigin: "60 62", duration: 0.08, yoyo: true, repeat: 1 }, 0.9);
      tl.to(q(".ojos"), { scaleY: 0.45, svgOrigin: "60 62", duration: 0.15 }, 2.6);
      tl.to(q(".parpados"), { opacity: 1, duration: 0.15 }, 2.6);
      tl.to(q(".w-escudo"), { rotation: -8, svgOrigin: "60 64", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.7);
      // "de noche": luna y aviso
      dibujar(".s01-luna", 3.5, 0.5);
      gsap.set(q(".s01-noche"), { opacity: 0 });
      tl.to(q(".s01-noche"), { opacity: 1, duration: 0.05, yoyo: true, repeat: 5 }, 3.6);
      tl.to(q(".s01-noche"), { opacity: 1, duration: 0.05 }, 3.95);
      // "trabajás como uno": sello rojo
      golpe(".s01-sello", 3.8);
      sacudir(3.8);
      tl.to(q(".s01-sello"), { rotation: -9, duration: 0.6, ease: "sine.inOut" }, 4.2);`,
  sfx: [{ t: 0.05, sfx: "ping", vol: 0.3 }, { t: 1.5, sfx: "click-soft", vol: 0.25 }, { t: 2.6, sfx: "key-press", vol: 0.25 }, { t: 3.6, sfx: "notification", vol: 0.25 }, { t: 3.75, sfx: "impact-bass-1", vol: 0.45, max: 0.8 }],
});

// ===== s02: clic =====
add({
  id: "s02-clic",
  css: `P .s02-que { top: 640px; font-size: 120px; font-weight: 900; color: #2f6fed; }
    P .s02-facil { top: 1130px; font-size: 64px; font-weight: 800; }`,
  html: `
        <div class="txt s02-que">¿Qué?</div>
        <svg class="full" viewBox="0 0 1080 1920">
          ${widget(840)}
          <g class="s02-spin"><path d="M250 925 a30 30 0 1 1 -30 -30" fill="none" stroke="${C.azul}" stroke-width="8" stroke-linecap="round" /></g>
          <g transform="translate(0 0)">${cursor()}</g>
        </svg>
        <div class="txt s02-facil">Ta, fácil.</div>`,
  js: `
      golpe(".s02-que", 0.1, 1.8);
      tl.to(q(".s02-que"), { y: -10, rotation: -4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.2);
      tl.to(q(".s02-que"), { opacity: 0, y: -30, duration: 0.25 }, 1.0);
      pop(".s02-facil", 1.2);
      // el cursor viene desde abajo a la derecha hasta la casilla
      gsap.set(q(".cursor"), { x: 900, y: 1500 });
      tl.to(q(".cursor"), { x: 740, y: 1300, duration: 0.6, ease: "power1.inOut" }, 0);
      tl.to(q(".cursor"), { x: 250, y: 930, duration: 0.8, ease: "power3.inOut" }, 1.2);
      // clic
      tl.to(q(".cursor"), { scale: 0.85, svgOrigin: "0 0", duration: 0.07, yoyo: true, repeat: 1 }, 2.12);
      tl.to(q(".casilla"), { opacity: 0, duration: 0.08 }, 2.15);
      gsap.set(q(".s02-spin"), { opacity: 0 });
      tl.to(q(".s02-spin"), { opacity: 1, duration: 0.05 }, 2.15);
      tl.fromTo(q(".s02-spin"), { rotation: 0 }, { rotation: 300, svgOrigin: "250 925", duration: 0.75, ease: "none", immediateRender: false }, 2.15);
      tl.to(q(".ojos"), { x: -10, duration: 0.2 }, 1.4);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.3 }, { t: 1.2, sfx: "whoosh-short", vol: 0.15 }, { t: 2.13, sfx: "click", vol: 0.45 }],
});

// ===== s03: la cuadrícula =====
add({
  id: "s03-cuadricula",
  css: `P .s03-mano { position: absolute; left: 0; top: 0; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          ${desafio({ chica: "Seleccioná todas las imágenes donde", grande: "pasás pedidos a la planilla", celdas: Array(9).fill(celdaPedido) })}
          <g transform="translate(470 1080)"><g class="s03-manog">
            <circle cx="70" cy="70" r="92" fill="${C.blanco}" stroke="${C.rojo}" stroke-width="6" />
            <path class="s03-mano" d="M40 120 V60 q0 -12 12 -12 q12 0 12 12 V40 q0 -12 12 -12 q12 0 12 12 V44 q0 -12 12 -12 q12 0 12 12 V70 q0 -10 10 -10 q10 0 10 10 V110 q0 30 -30 40 H70 q-20 -4 -30 -30 Z" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linejoin="round" />
            <text class="ui" x="70" y="200" font-size="40" font-weight="800" fill="${C.rojo}" text-anchor="middle">A MANO</text>
          </g></g>
        </svg>`,
  js: `
      tl.fromTo(q(".desafio"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      qa(".celda").forEach((c, k) => tl.fromTo(c, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.15 + k * 0.1));
      // "WhatsApp": los chats laten
      tl.to(qa(".chat"), { scale: 1.12, svgOrigin: "66 70", duration: 0.12, yoyo: true, repeat: 1, stagger: 0.03 }, 2.6);
      // "planilla": se llena una fila en cada hoja
      qa(".fila").forEach((f, k) => tl.to(f, { opacity: 0.8, duration: 0.1 }, 3.1 + k * 0.04));
      // "a mano"
      pop(".s03-manog", 4.0);
      tl.to(q(".s03-mano"), { rotation: 12, svgOrigin: "70 90", duration: 0.12, yoyo: true, repeat: 3 }, 4.2);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.25 }, { t: 0.55, sfx: "pop", vol: 0.2 }, { t: 0.95, sfx: "pop", vol: 0.2 }, { t: 2.6, sfx: "notification", vol: 0.25 }, { t: 3.1, sfx: "typing", vol: 0.25, max: 0.6 }, { t: 4.0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }],
});

// ===== s04: esta, esta, esta... ¿son todas? =====
add({
  id: "s04-todas",
  css: `P .s04-cont { position: absolute; left: 640px; top: 1508px; width: 0; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          ${desafio({ chica: "Seleccioná todas las imágenes donde", grande: "pasás pedidos a la planilla", celdas: Array(9).fill(celdaPedido) })}
          <text class="mono s04-n" x="190" y="1550" font-size="28" fill="${C.azul}" letter-spacing="2">0 DE 9</text>
          <g>${cursor()}</g>
        </svg>`,
  js: `${marcarJS}
      gsap.set(q(".cursor"), { x: 700, y: 1450 });
      gsap.set(q(".intento"), { opacity: 0 });
      const T = [0.05, 1.02, 1.47, 1.95, 2.2, 2.45, 2.7, 2.92, 3.12];
      const orden = [0, 4, 8, 2, 6, 1, 3, 5, 7];
      orden.forEach((k, i) => {
        cursorA(k, T[i], i === 0 ? 0.05 : i < 3 ? 0.3 : 0.18);
        tl.to(q(".cursor"), { scale: 0.85, svgOrigin: "0 0", duration: 0.05, yoyo: true, repeat: 1 }, T[i]);
        marcar(k, T[i]);
        tl.call(() => {}, null, T[i]);
        tl.set(q(".s04-n"), { textContent: (i + 1) + " DE 9" }, T[i]);
      });
      // "¿Son todas?": todo late y el cursor se aleja, perplejo
      tl.to(qa(".celda"), { scale: 1.04, svgOrigin: "115 115", duration: 0.15, yoyo: true, repeat: 1, stagger: 0.02 }, 3.3);
      tl.to(q(".cursor"), { x: 860, y: 1300, rotation: 15, duration: 0.6, ease: "power2.out" }, 3.4);`,
  sfx: [{ t: 0.05, sfx: "click", vol: 0.35 }, { t: 1.02, sfx: "click", vol: 0.35 }, { t: 1.47, sfx: "click", vol: 0.35 }, { t: 1.95, sfx: "click-soft", vol: 0.3 }, { t: 2.45, sfx: "click-soft", vol: 0.3 }, { t: 2.92, sfx: "click-soft", vol: 0.3 }, { t: 3.3, sfx: "pop", vol: 0.25 }],
});

// ===== s05: fallida =====
add({
  id: "s05-fallida",
  css: `P .s05-cartel { position: absolute; left: 130px; top: 940px; width: 820px; padding: 34px 0 34px 0; border-radius: 18px; background: #e5484d; color: #ffffff; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1.05; text-transform: uppercase; box-shadow: 0 12px 0 rgba(29,36,51,0.12); }
    P .s05-robot { position: absolute; left: 130px; top: 1330px; width: 820px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.16em; color: #e5484d; white-space: nowrap; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          <g class="s05-fondo">${desafio({ chica: "Seleccioná todas las imágenes donde", grande: "pasás pedidos a la planilla", celdas: Array(9).fill(celdaPedido) })}</g>
          ${cursor()}
        </svg>
        <div class="s05-cartel">Verificación<br />fallida</div>
        <svg class="full" viewBox="0 0 1080 1920">
          <g transform="translate(445 1130) scale(1.6)"><g class="s05-esc">${escudo()}</g></g>
        </svg>
        <div class="s05-robot">COMPORTAMIENTO: ROBOT</div>`,
  js: `
      qa(".sel").forEach((s) => gsap.set(s, { opacity: 1 }));
      qa(".img").forEach((s) => gsap.set(s, { scale: 0.86, svgOrigin: "115 115" }));
      gsap.set(q(".cursor"), { x: 860, y: 1300, rotation: 15 });
      // "son todas": el cursor va a VERIFICAR y aprieta
      tl.to(q(".cursor"), { x: 820, y: 1545, rotation: 0, duration: 0.45, ease: "power2.inOut" }, 0.1);
      tl.to(q(".boton"), { scale: 0.92, svgOrigin: "800 1538", duration: 0.08, yoyo: true, repeat: 1 }, 0.6);
      // "verificación fallida"
      golpe(".s05-cartel", 1.09, 1.9);
      sacudir(1.1, 18);
      tl.to(q(".s05-fondo"), { opacity: 0.25, duration: 0.2 }, 1.1);
      fuera(".cursor", 1.1, 0.1);
      // "actuás como un robot": el escudo, enojado
      pop(".s05-esc", 2.45);
      tl.to(q(".s05-esc .parpados"), { opacity: 1, duration: 0.1 }, 2.6);
      tl.to(q(".s05-esc .ojos"), { scaleY: 0.55, svgOrigin: "60 62", duration: 0.1 }, 2.6);
      gsap.set(q(".s05-robot"), { opacity: 0 });
      tl.to(q(".s05-robot"), { opacity: 1, duration: 0.05, yoyo: true, repeat: 3 }, 3.2);
      tl.to(q(".s05-robot"), { opacity: 1, duration: 0.05 }, 3.4);`,
  sfx: [{ t: 0.62, sfx: "click", vol: 0.4 }, { t: 1.0, sfx: "glitch-1", vol: 0.35, max: 0.6 }, { t: 1.05, sfx: "impact-bass-2", vol: 0.45, max: 0.8 }, { t: 2.45, sfx: "pop", vol: 0.25 }, { t: 3.2, sfx: "ping", vol: 0.2 }],
});

// ===== s06: ¡soy una persona! =====
add({
  id: "s06-persona",
  css: `P .s06-grito { top: 590px; font-size: 84px; font-weight: 900; text-transform: uppercase; color: #1d2433; }
    P .s06-item { position: absolute; left: 560px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 46px; color: #1d2433; white-space: nowrap; }
    P .s06-titulo { position: absolute; left: 470px; top: 760px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: #6b7689; white-space: nowrap; }`,
  html: `
        <div class="txt s06-grito">¡Soy una persona!</div>
        <svg class="full" viewBox="0 0 1080 1920">
          <g transform="translate(40 960) scale(1.05)">${dueno()}</g>
          ${tarjeta(450, 740, 580, 600)}
          ${[0, 1, 2].map((i) => `<rect class="s06-cas s06-cas${i}" x="480" y="${840 + i * 160}" width="56" height="56" rx="8" fill="${C.blanco}" stroke="${C.borde}" stroke-width="4" />${tilde(468, 828 + i * 160, C.verde, "s06-t s06-t" + i, 9)}`).join("")}
          <g class="s06-zzz"><path d="M820 860 h30 l-30 30 h30 M870 830 h22 l-22 22 h22 M905 806 h16 l-16 16 h16" fill="none" stroke="${C.azul}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g class="s06-plato"><ellipse cx="910" cy="1036" rx="62" ry="20" fill="${C.blanco}" ${T} /><ellipse cx="910" cy="1032" rx="34" ry="9" fill="none" stroke="${C.borde}" stroke-width="3" /></g>
          <g class="s06-mate"><path d="M880 1150 h64 l-8 70 q-24 14 -48 0 Z" fill="${C.blanco}" ${T} /><path d="M926 1150 l18 -50" ${T} /><path d="M960 1150 l14 -14 M967 1132 v22 M956 1143 h22 M864 1180 l-14 -10 M857 1164 v20 M847 1174 h20" stroke="${C.azul}" stroke-width="3" stroke-linecap="round" /></g>
        </svg>
        <div class="s06-titulo">PRUEBAS DE HUMANIDAD</div>
        <div class="s06-item s06-i0" style="top: 846px">sueño</div>
        <div class="s06-item s06-i1" style="top: 1006px">hambre</div>
        <div class="s06-item s06-i2" style="top: 1166px">mate frío</div>`,
  js: `
      dibujar(qa(".dueno .d-traz"), 0, 0.45);
      tl.fromTo(q(".d-boca"), { scaleY: 0.3, svgOrigin: "200 232" }, { scaleY: 1, svgOrigin: "200 232", duration: 0.2, ease: "back.out(2)" }, 0.75);
      golpe(".s06-grito", 0.79, 1.8);
      sacudir(0.8, 12);
      tl.to(q(".dueno"), { rotation: -3, svgOrigin: "200 400", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.9);
      tl.to(q(".d-boca"), { scaleY: 0.5, svgOrigin: "200 232", duration: 0.12, yoyo: true, repeat: 9 }, 1.9);
      pop(".s06-titulo", 1.6);
      const T = [2.09, 2.99, 4.2];
      const DIB = [".s06-zzz", ".s06-plato", ".s06-mate"];
      T.forEach((t, i) => {
        pop(".s06-i" + i, t - 0.1);
        pop(DIB[i], t - 0.05);
        dibujar(".s06-t" + i, t + 0.15, 0.3);
      });
      tl.to(q(".s06-zzz"), { y: -10, duration: 0.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, 2.4);
      tl.to(q(".s06-mate"), { x: -4, duration: 0.05, yoyo: true, repeat: 7 }, 4.5);`,
  sfx: [{ t: 0.75, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: 2.25, sfx: "pop", vol: 0.3 }, { t: 3.15, sfx: "pop", vol: 0.3 }, { t: 4.35, sfx: "pop", vol: 0.3 }, { t: 4.5, sfx: "sparkle", vol: 0.2, max: 0.6 }],
});

// ===== s07: segundo intento, "tu pedido está listo" =====
add({
  id: "s07-segundo",
  css: `P .s07-anot { position: absolute; left: 160px; top: 600px; width: 760px; height: 100px; border: 3px solid #c9d1dc; border-radius: 14px; background: #ffffff; }
    P .s07-anot span { position: absolute; left: 30px; top: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; color: #1d2433; white-space: nowrap; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          ${desafio({ chica: "Seleccioná las imágenes donde escribís", grande: "“tu pedido está listo”", intento: 2, celdas: Array(9).fill(celdaListo) })}
          ${cursor()}
        </svg>
        <div class="s07-anot"><span>Excusa: registrada<b class="s07-cur">|</b></span></div>`,
  js: `${marcarJS}
      // "Anotado.": el campo con la excusa, y se va
      tl.fromTo(q(".s07-anot"), { opacity: 0.6, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s07-anot span"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "steps(18)" }, 0.05);
      tl.to(q(".s07-cur"), { opacity: 0, duration: 0.05, yoyo: true, repeat: 5, repeatDelay: 0.12 }, 0.7);
      tl.to(q(".s07-anot"), { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 0.85);
      // "Segundo intento": entra el desafío nuevo
      gsap.set(q(".desafio"), { opacity: 0 });
      tl.fromTo(q(".desafio"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, 1.0);
      qa(".celda").forEach((c, k) => tl.fromTo(c, { opacity: 0, scale: 0.7, svgOrigin: (185 + (k % 3) * 240 + 115) + " " + (790 + Math.floor(k / 3) * 240 + 115) }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.8)", immediateRender: true }, 1.2 + k * 0.12));
      tl.fromTo(q(".intento"), { fill: "#6b7689" }, { fill: "#e5484d", duration: 0.1, yoyo: true, repeat: 3 }, 1.2);
      // "uno por uno": el cursor los marca de a uno
      gsap.set(q(".cursor"), { x: 900, y: 1600 });
      const T = [4.72, 4.9, 5.1, 5.3, 5.45];
      [0, 1, 2, 3, 4].forEach((k, i) => { cursorA(k, T[i], i === 0 ? 0.5 : 0.14); marcar(k, T[i]); });`,
  sfx: [{ t: 0.05, sfx: "typing", vol: 0.3, max: 0.6 }, { t: 1.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.25, sfx: "notification", vol: 0.25 }, { t: 4.72, sfx: "click", vol: 0.35 }, { t: 4.9, sfx: "click-soft", vol: 0.3 }, { t: 5.1, sfx: "click-soft", vol: 0.3 }, { t: 5.3, sfx: "click-soft", vol: 0.3 }],
});

// ===== s08: control C, control V =====
const tecla = (x, y, w, txt, cls) => `<g class="${cls}">
    <rect x="${x}" y="${y + 18}" width="${w}" height="200" rx="26" fill="${C.borde}" />
    <g class="${cls}-tapa"><rect x="${x}" y="${y}" width="${w}" height="200" rx="26" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="6" />
    <text class="ui" x="${x + w / 2}" y="${y + 128}" font-size="${txt.length > 2 ? 72 : 110}" font-weight="800" fill="${C.tinta}" text-anchor="middle">${txt}</text></g>
  </g>`;
add({
  id: "s08-ctrl",
  css: `P .s08-cont { position: absolute; left: 0; right: 0; top: 1380px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.12em; color: #6b7689; white-space: nowrap; }
    P .s08-cont b { color: #2f6fed; font-weight: 500; }
    P .s08-listo { left: 300px; top: 1110px; font-size: 120px; border-color: #2f6fed; color: #2f6fed; transform: rotate(-6deg); }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          <g class="s08-burbujas">
            ${[0, 1, 2, 3, 4, 5].map((i) => `<g transform="translate(${130 + (i % 3) * 280} ${600 + Math.floor(i / 3) * 110})"><g class="s08-b s08-b${i}"><rect x="0" y="0" width="250" height="80" rx="18" fill="${C.blanco}" stroke="${C.borde}" stroke-width="3" /><text class="ui" x="22" y="52" font-size="26" font-weight="600" fill="${C.tinta}">Tu pedido está…</text></g></g>`).join("")}
          </g>
          ${tecla(150, 880, 380, "CTRL", "s08-ctrl")}
          <text class="ui s08-mas" x="580" y="1010" font-size="90" font-weight="800" fill="${C.gris}">+</text>
          ${tecla(660, 880, 270, "C", "s08-c")}
          ${tecla(660, 880, 270, "V", "s08-v")}
        </svg>
        <div class="s08-cont">MENSAJES ENVIADOS: <b class="s08-n">0</b></div>
        <div class="sello s08-listo">¡Listo!</div>`,
  js: `
      gsap.set(qa(".s08-b"), { opacity: 0 });
      gsap.set(q(".s08-v"), { opacity: 0 });
      tl.fromTo([q(".s08-ctrl"), q(".s08-c"), q(".s08-mas")], { opacity: 0.4, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 0);
      const apretar = (sel, t) => tl.to(q(sel + "-tapa"), { y: 16, duration: 0.06, yoyo: true, repeat: 1, ease: "power2.in" }, t);
      // cada palabra: control (CTRL), C, control, V...
      const P = [[0.0, "ctrl"], [0.5, "c"], [0.7, "ctrl"], [0.96, "v"], [1.5, "ctrl"], [2.06, "c"], [2.6, "ctrl"], [3.01, "v"]];
      P.forEach(([t, k]) => {
        if (k === "c") { tl.set(q(".s08-c"), { opacity: 1 }, t - 0.02); tl.set(q(".s08-v"), { opacity: 0 }, t - 0.02); }
        if (k === "v") { tl.set(q(".s08-v"), { opacity: 1 }, t - 0.02); tl.set(q(".s08-c"), { opacity: 0 }, t - 0.02); }
        apretar(".s08-" + k, t);
      });
      // cada V pega un mensaje y sube el contador
      [[0.96, [0, 1, 2], "3"], [3.01, [3, 4, 5], "6"]].forEach(([t, bs, n]) => {
        bs.forEach((b, i) => tl.fromTo(q(".s08-b" + b), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22, ease: "back.out(2)", immediateRender: false }, t + i * 0.08));
        tl.set(q(".s08-n"), { textContent: n }, t + 0.2);
      });
      tl.set(q(".s08-n"), { textContent: "4" }, 1.9);
      tl.to(q(".s08-burbujas"), { y: -6, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.1);
      // "¡Listo!"
      golpe(".s08-listo", 3.6, 2.4);
      sacudir(3.6, 10);
      tl.to([q(".s08-ctrl"), q(".s08-c"), q(".s08-v"), q(".s08-mas")], { opacity: 0.25, duration: 0.2 }, 3.55);`,
  sfx: [{ t: 0.0, sfx: "key-press", vol: 0.4 }, { t: 0.5, sfx: "key-press", vol: 0.4 }, { t: 0.96, sfx: "key-press", vol: 0.4 }, { t: 1.5, sfx: "key-press", vol: 0.4 }, { t: 2.06, sfx: "key-press", vol: 0.4 }, { t: 3.01, sfx: "key-press", vol: 0.4 }, { t: 3.55, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }],
});

// ===== s09: fallida + ¿extrañás los semáforos? =====
add({
  id: "s09-semaforos",
  css: `P .s09-fallida { top: 600px; font-size: 104px; font-weight: 900; text-transform: uppercase; color: #e5484d; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          <g class="s09-cruzg"><circle cx="540" cy="1000" r="170" fill="${C.blanco}" stroke="${C.rojo}" stroke-width="14" />${cruz(460, 920, 160, C.rojo, "s09-cruz", 22)}</g>
          <g class="s09-sem">${desafio({ chica: "Seleccioná todas las imágenes con", grande: "semáforos (qué tiempos)", intento: 2, celdas: Array(9).fill(celdaSemaforo) })}</g>
        </svg>
        <div class="txt s09-fallida">Fallida</div>`,
  js: `
      tl.fromTo(q(".s09-cruzg"), { opacity: 0.5, scale: 1.5, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, svgOrigin: "540 1000", duration: 0.15, ease: "power4.in" }, 0);
      golpe(".s09-fallida", 0.1, 2);
      sacudir(0.15, 16);
      tl.to([q(".s09-cruzg"), q(".s09-fallida")], { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in" }, 1.0);
      // los semáforos, con nostalgia
      gsap.set(q(".s09-sem"), { opacity: 0 });
      tl.fromTo(q(".s09-sem"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, 1.14);
      qa(".s09-sem .celda").forEach((c, k) => tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, 1.2 + k * 0.06));
      tl.fromTo(q(".corazon"), { scale: 0, svgOrigin: "178 80" }, { scale: 1, svgOrigin: "178 80", duration: 0.3, ease: "back.out(3)", immediateRender: false }, 1.9);
      tl.to(q(".corazon"), { scale: 1.2, svgOrigin: "178 80", duration: 0.15, yoyo: true, repeat: 3 }, 2.25);`,
  sfx: [{ t: 0.0, sfx: "glitch-1", vol: 0.35, max: 0.5 }, { t: 0.05, sfx: "impact-bass-2", vol: 0.4, max: 0.7 }, { t: 1.2, sfx: "pop", vol: 0.25 }, { t: 1.9, sfx: "sparkle", vol: 0.25, max: 0.7 }],
});

// ===== s10: tercer intento, el stock =====
add({
  id: "s10-stock",
  css: ``,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          ${desafio({ chica: "Seleccioná las imágenes donde actualizás", grande: "a mano el stock de la tienda", intento: 3, celdas: Array(9).fill(celdaStock) })}
          <rect class="s10-alerta" x="160" y="580" width="760" height="1010" rx="16" fill="none" stroke="${C.rojo}" stroke-width="8" opacity="0" />
        </svg>`,
  js: `
      tl.fromTo(q(".desafio"), { opacity: 0.4, x: 120 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".intento"), { fill: "#6b7689" }, { fill: "#e5484d", duration: 0.08, yoyo: true, repeat: 5 }, 0.1);
      tl.set(q(".intento"), { fill: "#e5484d" }, 0.6);
      qa(".celda").forEach((c, k) => tl.fromTo(c, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: true }, 0.15 + k * 0.08));
      // "stock": los números tachados tiemblan (cuentas a mano)
      tl.to(qa(".celda text.mono:first-of-type"), { y: -6, duration: 0.08, yoyo: true, repeat: 3, stagger: 0.03 }, 2.69);
      // "tienda": las pantallas se agrandan
      qa(".celda").forEach((c, k) => tl.to(c.querySelectorAll("rect")[1], { scale: 1.12, svgOrigin: "178 112", duration: 0.15, yoyo: true, repeat: 1 }, 3.19 + k * 0.03));
      tl.to(q(".s10-alerta"), { opacity: 1, duration: 0.08, yoyo: true, repeat: 5 }, 3.3);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.1, sfx: "ping", vol: 0.25 }, { t: 0.2, sfx: "pop", vol: 0.2 }, { t: 2.69, sfx: "typing", vol: 0.25, max: 0.5 }, { t: 3.3, sfx: "glitch-1", vol: 0.25, max: 0.4 }],
});

// ===== s11: si no lo hago yo, no lo hace nadie =====
add({
  id: "s11-nadie",
  css: `P .s11-nadie { top: 610px; font-size: 170px; font-weight: 900; text-transform: uppercase; color: #e5484d; letter-spacing: -0.02em; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          <g transform="translate(340 860)">${dueno()}</g>
          <path class="s11-mesa" d="M120 1300 H960" ${T} stroke-width="8" />
          <g class="s11-puno"><path d="M760 1170 q0 -40 40 -40 h60 q36 0 36 40 v40 q0 40 -40 40 h-60 q-36 0 -36 -40 Z M790 1150 v40 M820 1146 v44 M850 1150 v40" fill="${C.blanco}" ${T} stroke-width="6" /></g>
          <path class="s11-golpe" d="M720 1250 l-40 -30 M740 1220 l-20 -46 M960 1250 l40 -30 M940 1220 l20 -46" ${T} stroke-width="6" />
        </svg>
        <div class="txt s11-nadie">¡Nadie!</div>`,
  js: `
      tl.fromTo(q(".dueno"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 0);
      dibujar(".s11-mesa", 0, 0.4);
      tl.to(q(".dueno"), { rotation: 4, svgOrigin: "200 400", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.2);
      // golpes al escritorio
      gsap.set(q(".s11-puno"), { y: -80 });
      [0.45, 0.95, 1.45].forEach((t) => {
        tl.to(q(".s11-puno"), { y: 0, duration: 0.1, ease: "power3.in" }, t);
        tl.to(q(".s11-puno"), { y: -80, duration: 0.25, ease: "power2.out" }, t + 0.12);
      });
      gsap.set(q(".s11-golpe"), { opacity: 0 });
      [0.55, 1.05, 1.55].forEach((t) => tl.fromTo(q(".s11-golpe"), { opacity: 1 }, { opacity: 0, duration: 0.2, immediateRender: false }, t));
      golpe(".s11-nadie", 1.5, 2.4);
      sacudir(1.55, 20);`,
  sfx: [{ t: 0.55, sfx: "impact-bass-1", vol: 0.3, max: 0.4 }, { t: 1.05, sfx: "impact-bass-1", vol: 0.3, max: 0.4 }, { t: 1.5, sfx: "impact-bass-2", vol: 0.45, max: 0.8 }],
});

// ===== s12: el bucle y Matrix =====
const COL = ["CTRL C", "CTRL V", "CTRL C", "CTRL V", "CTRL C", "CTRL V", "CTRL C", "CTRL V", "CTRL C"];
add({
  id: "s12-matrix",
  css: `P .s12-term { position: absolute; left: 130px; top: 600px; width: 820px; height: 900px; border-radius: 18px; background: #1d2433; overflow: hidden; }
    P .s12-col { position: absolute; top: 0; width: 60px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; line-height: 1.12; color: #1fae5b; text-align: center; white-space: pre; }
    P .s12-matrix { position: absolute; left: 130px; width: 820px; top: 1530px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.3em; color: #e5484d; white-space: nowrap; }`,
  html: `
        <svg class="full" viewBox="0 0 1080 1920">
          <g class="s12-noches">
            ${["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"].map((d, i) => `<g transform="translate(${150 + (i % 3) * 270} ${640 + Math.floor(i / 3) * 360})"><g class="s12-n s12-n${i}">
              <rect x="0" y="0" width="240" height="320" rx="14" fill="${C.blanco}" stroke="${C.borde}" stroke-width="3" />
              <rect x="0" y="0" width="240" height="60" rx="14" fill="${C.tinta}" /><rect x="0" y="40" width="240" height="20" fill="${C.tinta}" />
              <text class="mono" x="120" y="42" font-size="28" fill="${C.blanco}" text-anchor="middle" letter-spacing="3">${d}</text>
              <g transform="translate(5 70)">${celdaPedido(0)}</g>
            </g></g>`).join("")}
            <path class="s12-bucle" d="M540 1420 m-200 0 a200 60 0 1 0 400 0 a200 60 0 1 0 -400 0" fill="none" stroke="${C.azul}" stroke-width="7" stroke-linecap="round" />
            <path class="s12-flecha" d="M722 1388 l22 10 l-14 20" fill="none" stroke="${C.azul}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <div class="s12-term">
          ${Array.from({ length: 14 }, (_, i) => `<div class="s12-col s12-c${i}" style="left: ${22 + i * 57}px" data-layout-ignore>${Array.from({ length: 46 }, (_, j) => ["C", "V", "C", "^", "V", "C", "V", "V", "^", "C"][(i * 7 + j * 3 + ((i * j) % 5)) % 10]).join("\n")}</div>`).join("")}
        </div>
        <div class="s12-matrix">MODO ROBOT: ACTIVADO</div>`,
  js: `
      // noches que se repiten
      qa(".s12-n").forEach((n, i) => tl.fromTo(n, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22, ease: "back.out(1.6)", immediateRender: i > 0 }, i === 0 ? 0 : 0.2 + i * 0.32));
      tl.set(q(".s12-n0"), { opacity: 0.6 }, 0);
      tl.to(q(".s12-n0"), { opacity: 1, duration: 0.2 }, 0);
      dibujar(".s12-bucle", 1.26, 0.8);
      dibujar(".s12-flecha", 2.0, 0.2);
      tl.to([q(".s12-bucle"), q(".s12-flecha")], { scale: 1.06, svgOrigin: "540 1420", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.2);
      // "sin pensar": todas iguales
      tl.to(qa(".s12-n"), { scale: 0.96, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.03 }, 2.5);
      // "Matrix": la terminal con lluvia de Ctrl C Ctrl V
      gsap.set(q(".s12-term"), { opacity: 0 });
      tl.to(q(".s12-noches"), { opacity: 0, duration: 0.15 }, 3.5);
      tl.fromTo(q(".s12-term"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out", immediateRender: false }, 3.55);
      qa(".s12-col").forEach((c, i) => tl.fromTo(c, { y: -1500 + (i % 4) * 110 }, { y: -500 + (i % 3) * 140, duration: 2.0, ease: "none" }, 3.55));
      gsap.set(q(".s12-matrix"), { opacity: 0 });
      tl.to(q(".s12-matrix"), { opacity: 1, duration: 0.05, yoyo: true, repeat: 3 }, 4.4);
      tl.to(q(".s12-matrix"), { opacity: 1, duration: 0.05 }, 4.6);`,
  sfx: [{ t: 0.2, sfx: "pop", vol: 0.2 }, { t: 0.85, sfx: "pop", vol: 0.2 }, { t: 1.26, sfx: "whoosh", vol: 0.2, max: 0.8 }, { t: 3.55, sfx: "glitch-2", vol: 0.3, max: 0.6 }, { t: 3.7, sfx: "typing", vol: 0.25, max: 1.2 }],
});

// ===== s13: el giro =====
add({
  id: "s13-giro",
  css: `P .s13-que { top: 600px; font-size: 96px; font-weight: 900; color: #2f6fed; }
    P .s13-frase { top: 600px; font-size: 56px; font-weight: 800; line-height: 1.15; white-space: normal; padding: 0 90px; }`,
  html: `
        <div class="txt s13-que">¿?</div>
        <svg class="full" viewBox="0 0 1080 1920">
          <g class="s13-duenog"><g transform="translate(140 920) scale(0.78)">${dueno("dueno", "plana")}</g></g>
          <g transform="translate(660 790) scale(1.4)"><g class="s13-esc">${escudo()}</g></g>
          <g class="s13-pila">
            ${["PEDIDOS", "AVISOS", "STOCK", "REPORTE"].map((t, i) => `<g transform="translate(560 ${1250 - i * 72})"><g class="s13-p"><rect x="0" y="0" width="300" height="62" rx="8" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="4" /><text class="mono" x="150" y="42" font-size="28" fill="${C.tinta}" text-anchor="middle" letter-spacing="3">${t}</text></g></g>`).join("")}
          </g>
          <g class="s13-brazo">
            <path d="M1100 900 H930 L860 1000 V1040" fill="none" stroke="${C.azul}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="930" cy="900" r="20" fill="${C.blanco}" stroke="${C.azul}" stroke-width="7" />
            <circle cx="860" cy="1000" r="18" fill="${C.blanco}" stroke="${C.azul}" stroke-width="7" />
            <path d="M820 1080 l20 -40 h40 l20 40" fill="none" stroke="${C.azul}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <g class="s13-ok">
            ${tarjeta(160, 1380, 760, 150)}
            <rect x="200" y="1415" width="80" height="80" rx="10" fill="${C.blanco}" stroke="${C.borde}" stroke-width="5" />
            ${tilde(200, 1415, C.verde, "s13-tilde")}
            <text class="ui" x="310" y="1472" font-size="48" font-weight="600" fill="${C.tinta}">Soy una persona</text>
          </g>
        </svg>
        <div class="txt s13-frase">Si el trabajo es de robot, que lo haga un robot.</div>`,
  js: `
      // "¿Y entonces qué hago?"
      tl.fromTo(q(".s13-duenog"), { opacity: 0.5, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0);
      golpe(".s13-que", 0.94, 1.8);
      tl.to(q(".s13-que"), { rotation: 8, duration: 0.2, yoyo: true, repeat: 1 }, 1.1);
      tl.to(q(".s13-que"), { opacity: 0, duration: 0.15 }, 1.75);
      // el escudo habla calmado (ojos normales, boca que se mueve)
      pop(".s13-esc", 1.75);
      tl.to(q(".s13-esc .boca"), { scaleY: 3, svgOrigin: "60 92", duration: 0.1, yoyo: true, repeat: 9 }, 1.9);
      gsap.set(q(".s13-frase"), { opacity: 0 });
      tl.fromTo(q(".s13-frase"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, 1.95);
      // la pila de tareas aparece junto al dueño
      qa(".s13-pila .s13-p").forEach((g, i) => tl.fromTo(g, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: true }, 2.1 + i * 0.12));
      // "que lo haga un robot": el brazo baja y se la lleva
      gsap.set(q(".s13-brazo"), { x: 300, y: -200 });
      tl.to(q(".s13-brazo"), { x: 0, y: 0, duration: 0.4, ease: "power3.out" }, 3.0);
      tl.to([q(".s13-brazo"), q(".s13-pila")], { x: 600, y: -300, duration: 0.5, ease: "power3.in" }, 3.5);
      // "Vos volvé a ser persona": la casilla verde, el dueño sonríe
      tl.to([q(".s13-esc"), q(".s13-frase")], { opacity: 0, duration: 0.2 }, 3.85);
      pop(".s13-ok", 3.9);
      dibujar(".s13-tilde", 4.35, 0.3);
      tl.to(q(".s13-duenog"), { x: 290, duration: 0.5, ease: "power2.inOut" }, 3.9);
      tl.to(q(".s13-duenog .d-boca"), { scaleY: -1, svgOrigin: "200 236", duration: 0.2 }, 4.5);`,
  sfx: [{ t: 0.9, sfx: "pop", vol: 0.3 }, { t: 1.75, sfx: "ping", vol: 0.25 }, { t: 3.0, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 3.5, sfx: "whoosh-short", vol: 0.25 }, { t: 4.35, sfx: "chime", vol: 0.35 }],
});

// ===== s14: automatizamos =====
const FILAS = [
  ["El pedido pasa a la planilla", 2.7, 3.4],
  ["El aviso de listo sale", 4.5, 5.2],
  ["El stock se actualiza", 5.9, 6.7],
  ["El reporte llega al celular", 7.5, 8.8],
];
add({
  id: "s14-automatizamos",
  css: `P .s14-en { top: 590px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.3em; color: #2f6fed; }
    P .s14-auto { top: 640px; font-size: 96px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
    P .s14-mano { top: 752px; font-size: 44px; font-weight: 600; color: #6b7689; }`,
  html: `
        <div class="txt s14-en">EN SCALERICS</div>
        <div class="txt s14-auto">Automatizamos</div>
        <div class="txt s14-mano">lo que hacés a mano</div>
        <svg class="full" viewBox="0 0 1080 1920">
          <path class="s14-tacha" d="M596 770 H782" stroke="${C.rojo}" stroke-width="7" stroke-linecap="round" />
          ${FILAS.map(([t], i) => `<g class="s14-f s14-f${i}">
            ${tarjeta(120, 850 + i * 160, 840, 130)}
            <text class="ui" x="160" y="${930 + i * 160}" font-size="40" font-weight="600" fill="${C.tinta}">${t}</text>
            <circle cx="895" cy="${915 + i * 160}" r="38" fill="${C.blanco}" stroke="${C.borde}" stroke-width="4" class="s14-cir${i}" />
            ${tilde(855, 875 + i * 160, C.verde, "s14-t s14-t" + i, 9)}
            <text class="mono s14-solo${i}" x="800" y="${930 + i * 160}" font-size="28" fill="${C.verde}" text-anchor="end" letter-spacing="3">SOLO</text>
          </g>`).join("")}
        </svg>`,
  js: `
      tl.fromTo(q(".s14-en"), { opacity: 0.3 }, { opacity: 1, duration: 0.3 }, 0);
      golpe(".s14-auto", 1.07, 1.8);
      pop(".s14-mano", 1.75);
      dibujar(".s14-tacha", 2.05, 0.3);
      const F = ${JSON.stringify(FILAS.map(([, a, b]) => [a, b]))};
      F.forEach(([a, b], i) => {
        tl.fromTo(q(".s14-f" + i), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, a - 0.2);
        gsap.set(q(".s14-solo" + i), { opacity: 0 });
        tl.to(q(".s14-solo" + i), { opacity: 1, duration: 0.15 }, b);
        tl.to(q(".s14-cir" + i), { fill: "#1fae5b", stroke: "#1fae5b", duration: 0.15 }, b);
        dibujar(".s14-t" + i, b, 0.28);
        tl.set(q(".s14-t" + i), { stroke: "#ffffff" }, b);
        tl.fromTo(q(".s14-f" + i), { scale: 1 }, { scale: 1.03, svgOrigin: "540 " + (915 + i * 160), duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, b);
      });`,
  sfx: [{ t: 0.95, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: 2.05, sfx: "whoosh-short", vol: 0.2 }, { t: 3.4, sfx: "chime", vol: 0.3 }, { t: 5.2, sfx: "chime", vol: 0.3 }, { t: 6.7, sfx: "chime", vol: 0.3 }, { t: 8.8, sfx: "sparkle", vol: 0.35, max: 0.9 }],
});

// ===== s15: CTA =====
add({
  id: "s15-cta",
  css: `P .s15-ok { top: 620px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.24em; color: #1fae5b; }
    P .s15-persona { top: 1100px; font-size: 76px; font-weight: 900; }
    P .s15-boton { position: absolute; left: 190px; top: 1230px; width: 700px; height: 130px; border-radius: 18px; background: #2f6fed; color: #ffffff; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 64px; line-height: 130px; text-align: center; white-space: nowrap; }
    P .s15-al { top: 1400px; font-size: 46px; font-weight: 700; line-height: 1.2; }`,
  html: `
        <div class="txt s15-ok">VERIFICACIÓN COMPLETADA</div>
        <svg class="full" viewBox="0 0 1080 1920">
          ${widget(760)}
          ${tilde(210, 815, C.verde, "s15-tilde", 11)}
        </svg>
        <div class="txt s15-persona">Sos una persona.</div>
        <div class="s15-boton">Mandáselo <svg width="56" height="56" viewBox="0 0 56 56" style="vertical-align: -6px"><path d="M8 48 C10 26 22 18 38 18 V6 L52 24 L38 42 V30 C26 30 16 34 8 48 Z" fill="#ffffff" /></svg></div>
        <div class="txt s15-al">al que no pasaría<br />esta prueba</div>`,
  js: `
      tl.fromTo(q(".widget"), { opacity: 0.5, scale: 0.96, svgOrigin: "540 855" }, { opacity: 1, scale: 1, svgOrigin: "540 855", duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.to(q(".casilla"), { stroke: "#1fae5b", duration: 0.2 }, 0.1);
      dibujar(".s15-tilde", 0.25, 0.35);
      pop(".s15-ok", 0.45);
      tl.to(q(".ojos"), { scaleY: 0.1, svgOrigin: "60 62", duration: 0.08, yoyo: true, repeat: 1 }, 0.9);
      golpe(".s15-persona", 1.25, 1.6);
      // el CTA
      pop(".s15-boton", 2.3);
      tl.to(q(".s15-boton"), { scale: 1.05, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.7);
      gsap.set(q(".s15-al"), { opacity: 0 });
      tl.fromTo(q(".s15-al"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, 2.95);
      // el escudo guiña: pasivo-agresivo hasta el final
      tl.to(q(".ojo:last-child"), { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1, repeatDelay: 0.25 }, 4.6);
      tl.to(q(".w-escudo"), { rotation: 8, svgOrigin: "60 64", duration: 0.3, yoyo: true, repeat: 1 }, 4.6);`,
  sfx: [{ t: 0.25, sfx: "chime", vol: 0.4 }, { t: 1.2, sfx: "pop", vol: 0.3 }, { t: 2.3, sfx: "pop", vol: 0.3 }, { t: 4.6, sfx: "click-soft", vol: 0.25 }],
});

for (const e of ESCENAS) escena(e);
console.log("escenas:", ESCENAS.map((e) => e.id).join(", "));
