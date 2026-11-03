// Generador de las escenas de reels/un-precio (íconos compartidos y helpers comunes).
// Uso: node generar-escenas.mjs && node armar.mjs  (desde reels/un-precio)
import fs from "node:fs";

const T = fs.readFileSync("tiempos.md", "utf8");
const DURS = Object.fromEntries([...T.matchAll(/### (\S+) — dura ([\d.]+)/g)].map((m) => [m[1], Number(m[2])]));

// ---------- íconos (coordenadas locales, centro 0,0) ----------
const L = (c, extra = "") => `class="ln ${c}" ${extra}`;
const F = (c, extra = "") => `class="ln-fino ${c}" ${extra}`;
const ICON = {
  pizarra: (c) => `<rect ${L(c)} x="-120" y="-85" width="240" height="170" rx="10" /><rect ${F(c)} x="-102" y="-67" width="204" height="134" rx="4" /><path ${F(c)} d="M-78 -32 q18 -14 36 0 t36 0 t36 0" /><path ${F(c)} d="M-78 16 h70" /><path ${F(c)} d="M-78 40 h40" />`,
  planilla: (c) => `<rect ${L(c)} x="-120" y="-85" width="240" height="170" rx="10" /><line ${L(c)} x1="-120" y1="-45" x2="120" y2="-45" /><line ${F(c)} x1="-40" y1="-85" x2="-40" y2="85" /><line ${F(c)} x1="40" y1="-85" x2="40" y2="85" /><line ${F(c)} x1="-120" y1="-2" x2="120" y2="-2" /><line ${F(c)} x1="-120" y1="42" x2="120" y2="42" />`,
  pagina: (c) => `<rect ${L(c)} x="-120" y="-85" width="240" height="170" rx="12" /><line ${L(c)} x1="-120" y1="-52" x2="120" y2="-52" /><circle ${F(c)} cx="-100" cy="-68" r="5" /><circle ${F(c)} cx="-82" cy="-68" r="5" /><circle ${F(c)} cx="-64" cy="-68" r="5" /><rect ${F(c)} x="-100" y="-34" width="82" height="100" rx="8" /><path ${F(c)} d="M-74 50 V-2 Q-74 -14 -62 -14 H-44 Q-36 -14 -36 -2 V50 Z" /><line ${F(c)} x1="0" y1="-22" x2="96" y2="-22" /><line ${F(c)} x1="0" y1="2" x2="66" y2="2" /><rect ${F(c)} x="0" y="30" width="96" height="32" rx="16" />`,
  catalogo: (c) => `<rect ${L(c)} x="-62" y="-100" width="124" height="200" rx="20" /><line ${L(c)} x1="-14" y1="-86" x2="14" y2="-86" /><rect ${F(c)} x="-46" y="-66" width="92" height="84" rx="10" /><path ${F(c)} d="M-16 8 V-30 Q-16 -40 -6 -40 H8 Q16 -40 16 -30 V8 Z" /><rect ${F(c)} x="-46" y="32" width="66" height="26" rx="13" /><rect ${F(c)} x="-20" y="66" width="66" height="22" rx="11" />`,
  lista: (c) => `<rect ${L(c)} x="-80" y="-92" width="160" height="184" rx="10" /><rect ${L(c)} x="-32" y="-104" width="64" height="26" rx="8" /><line ${F(c)} x1="-55" y1="-46" x2="30" y2="-46" /><line ${F(c)} x1="-55" y1="-14" x2="55" y2="-14" /><line ${F(c)} x1="-55" y1="18" x2="40" y2="18" /><line ${F(c)} x1="-55" y1="50" x2="55" y2="50" />`,
  gondola: (c) => `<rect ${L(c)} x="-120" y="30" width="240" height="20" rx="4" /><path ${L(c)} d="M-100 30 V-40 Q-100 -54 -86 -54 H-44 Q-32 -54 -32 -40 V30" /><rect ${F(c)} x="-82" y="-74" width="24" height="20" rx="4" /><path ${L(c)} d="M32 30 V-40 Q32 -54 46 -54 H88 Q100 -54 100 -40 V30" /><rect ${F(c)} x="50" y="-74" width="24" height="20" rx="4" /><rect ${F(c)} x="-46" y="56" width="92" height="40" rx="6" /><line ${F(c)} x1="-30" y1="76" x2="30" y2="76" />`,
};
const ORDEN = ["pizarra", "planilla", "pagina", "catalogo", "lista", "gondola"];
const NOMBRE = { pizarra: "PIZARRA", planilla: "PLANILLA", pagina: "TIENDA", catalogo: "CATÁLOGO", lista: "LISTA", gondola: "GÓNDOLA" };
const bidon = (c) => `<path ${L(c)} d="M-55 80 V-22 Q-55 -58 -18 -58 H42 Q55 -58 55 -44 V80 Q55 95 40 95 H-40 Q-55 95 -55 80 Z" /><rect ${L(c)} x="12" y="-82" width="30" height="24" rx="5" /><path ${L(c)} d="M-55 -8 Q-86 -8 -86 24 Q-86 54 -55 54" /><rect ${F(c)} x="-38" y="4" width="76" height="62" rx="8" />`;
const etiq = (c) => `<path ${L(c)} d="M-150 -80 H110 L170 0 L110 80 H-150 Q-165 80 -165 65 V-65 Q-165 -80 -150 -80 Z" /><circle ${L(c)} cx="128" cy="0" r="11" /><path ${F(c)} d="M139 0 q50 -46 110 -30" />`;
const tilde = (cls, verde) => `<circle class="${verde ? "ln-ac" : "ln"}" cx="0" cy="0" r="20" /><path class="${verde ? "ln-ac" : "ln"}" d="M-9 1 L-2 8 L10 -6" />`;
const local = (c, cartel, w = 1) => `<rect ${L(c)} x="-150" y="-60" width="300" height="200" rx="6" /><rect ${L(c)} x="-140" y="-120" width="280" height="50" rx="6" /><text class="lex s-cartel" x="0" y="-84" text-anchor="middle" font-size="34">${cartel}</text><path ${F(c)} d="M-150 -60 q25 26 50 0 t50 0 t50 0 t50 0 t50 0 t50 0" /><rect ${F(c)} x="-120" y="10" width="130" height="90" rx="4" /><rect ${F(c)} x="40" y="0" width="80" height="140" rx="4" />`;

// ---------- molde de escena ----------
function escena(id, { svg, html = "", et = [], js, sfx, salida = true, defs = "" }) {
  const p = id.slice(0, 3);
  const DUR = DURS[id];
  const sel = `[data-composition-id="${id}"]`;
  const spans = et.map((e, i) => `<span class="${p}-e${i + 1}">${e[1]}</span>`).join("");
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${sel} .${p}-capa { position: absolute; inset: 0; }
    ${sel} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${sel} .ln { fill: none; stroke: #efeee5; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${sel} .ln-fino { fill: none; stroke: #efeee5; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; }
    ${sel} .ln-ac { fill: none; stroke: #5ce611; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${sel} .ln-rojo { fill: none; stroke: #c0564b; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${sel} .ln-tenue { fill: none; stroke: #efeee5; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: 0.18; }
    ${sel} .punteada { fill: none; stroke: #efeee5; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 2 14; opacity: 0.5; }
    ${sel} .relleno-ac { fill: #5ce611; }
    ${sel} .relleno-rojo { fill: #c0564b; }
    ${sel} .relleno-navy { fill: #07111f; }
    ${sel} .relleno-crema { fill: #efeee5; }
    ${sel} .lex { font-family: "Lexend", sans-serif; font-weight: 600; fill: #efeee5; }
    ${sel} .lex-b { font-family: "Lexend", sans-serif; font-weight: 700; fill: #efeee5; }
    ${sel} .lex-ac { font-family: "Lexend", sans-serif; font-weight: 600; fill: #5ce611; }
    ${sel} .lex-rojo { font-family: "Lexend", sans-serif; font-weight: 600; fill: #c0564b; }
    ${sel} .lex-navy { font-family: "Lexend", sans-serif; font-weight: 600; fill: #07111f; }
    ${sel} .lex-blanco { font-family: "Lexend", sans-serif; font-weight: 700; fill: #ffffff; }
    ${sel} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.08em; fill: #efeee5; }
    ${sel} .mono-ac { font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.14em; fill: #5ce611; }
    ${sel} .apagado { opacity: 0.45; }
    ${sel} .etiqueta { position: absolute; left: 0; right: 0; top: 1268px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; text-transform: uppercase; color: #5ce611; }
    ${sel} .etiqueta span { position: absolute; left: 0; right: 0; opacity: 0; }
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ""}
${svg}
      </svg>${html}
      <div class="etiqueta">${spans}</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      // dibuja trazos (stroke-dashoffset); opacity 0 hasta que arrancan (sin puntitos de los caps)
      const dibujar = (els, t, dur, desde, paso) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          const t0 = t + i * (paso ?? 0.04);
          const o = Number(getComputedStyle(el).opacity) || 1;
          gsap.set(el, { strokeDasharray: L + 1, strokeDashoffset: (L + 1) * (desde ?? 1), opacity: t0 <= 0 ? o : 0 });
          if (t0 > 0) tl.to(el, { opacity: o, duration: 0.04 }, t0);
          tl.fromTo(el, { strokeDashoffset: (L + 1) * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t0);
        });
      };
      // aparece entero con golpe
      const pop = (el, t, o) => tl.fromTo(el, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: o ?? 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, t);
      // aparece suave desde abajo
      const sube = (el, t, o) => tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: o ?? 1, y: 0, duration: 0.35, ease: "power3.out" }, t);
      const fuera = (el, t, d) => tl.to(el, { opacity: 0, duration: d ?? 0.25, ease: "power2.in" }, t);
      // texto que se escribe de izquierda a derecha
      const escribir = (el, t, d) => tl.fromTo(el, { clipPath: "inset(-30% 100% -30% 0)" }, { clipPath: "inset(-30% 0% -30% 0)", duration: d ?? 0.5, ease: "power1.inOut" }, t);
      const latir = (el, t, n, s) => tl.fromTo(el, { scale: 1, transformOrigin: "50% 50%" }, { scale: s ?? 1.25, transformOrigin: "50% 50%", duration: 0.28, ease: "sine.inOut", yoyo: true, repeat: (n ?? 2) * 2 - 1 }, t);
${js}
      // etiqueta mono
      const ET = ${JSON.stringify(et.map((e) => e[0]))};
      ET.forEach((t, i) => {
        const el = q(".${p}-e" + (i + 1));
        tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t);
        if (i + 1 < ET.length) tl.to(el, { opacity: 0, y: -8, duration: 0.2 }, ET[i + 1] - 0.15);
      });
${salida ? `      // salida
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);` : "      tl.to({}, { duration: 0.01 }, DUR - 0.01);"}

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx, null, 1) + "\n");
}

// grilla de seis lugares
const CELDAS = [[300, 690], [780, 690], [300, 890], [780, 890], [300, 1090], [780, 1090]];
function grilla(p) {
  return CELDAS.map(([cx, cy], i) => {
    const k = ORDEN[i];
    return `        <g class="${p}-celda ${p}-celda${i}" transform="translate(${cx} ${cy})">
          <rect class="ln-tenue ${p}-marco${i}" x="-225" y="-92" width="450" height="184" rx="18" />
          <g transform="translate(-98 -20)"><g class="${p}-ic${i}"><g transform="scale(0.52)">${ICON[k](`${p}-ic${i}-dib`)}</g></g></g>
          <text class="mono ${p}-nom${i}" x="-98" y="66" text-anchor="middle" font-size="28" letter-spacing="0" opacity="0.7">${NOMBRE[k]}</text>
          <g transform="translate(-196 -66)"><g class="${p}-num${i}"><circle class="ln" cx="0" cy="0" r="22" /><text class="mono" data-layout-ignore x="1" y="10" text-anchor="middle" font-size="28">${i + 1}</text></g></g>
          <text class="lex ${p}-viejo${i} apagado" x="105" y="20" text-anchor="middle" font-size="54">$ 289</text>
          <text class="lex ${p}-nuevo${i}" x="105" y="20" text-anchor="middle" font-size="54" opacity="0">$ 319</text>
          <g transform="translate(196 -52)"><circle class="relleno-rojo ${p}-dot${i}" cx="0" cy="0" r="9" /><g class="${p}-tic${i}" opacity="0">${tilde("", false)}</g></g>
        </g>`;
  }).join("\n");
}

// ================= s01 =================
const GHOST = [[215, 690], [865, 690], [165, 905], [915, 905], [215, 1120], [865, 1120]];
escena("s01-precio", {
  svg: `${GHOST.map(([x, y], i) => `        <g transform="translate(${x} ${y})"><g class="s01-g s01-g${i}"><g transform="scale(0.36)" class="apagado">${etiq("s01-gd")}</g><text class="lex" x="-4" y="16" text-anchor="middle" font-size="44" opacity="0.6">?</text></g></g>`).join("\n")}
        <g transform="translate(530 890)"><g class="s01-tag">${etiq("s01-tag-dib")}
          <text class="lex s01-289" x="-20" y="36" text-anchor="middle" font-size="104">$ 289</text>
          <line class="ln-rojo s01-tacha" x1="-150" y1="2" x2="110" y2="-8" />
          <text class="lex s01-319" x="-20" y="36" text-anchor="middle" font-size="104" opacity="0">$ 319</text></g></g>`,
  et: [[0.15, "¿En cuántos lugares?"]],
  js: `
      dibujar(qa(".s01-tag-dib"), 0, 0.45, 0.5, 0.02);
      tl.fromTo(q(".s01-289"), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0);
      dibujar([q(".s01-tacha")], 0.4, 0.25);
      tl.to([q(".s01-289"), q(".s01-tacha")], { y: -60, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.6);
      tl.fromTo(q(".s01-319"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.82);
      qa(".s01-g").forEach((g, i) => {
        pop(g, 1.1 + i * 0.1);
        tl.to(g, { rotation: i % 2 ? 7 : -7, transformOrigin: "50% 0%", duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.1 + i * 0.03);
      });
      tl.to(q(".s01-tag"), { rotation: -4, svgOrigin: "128 0", duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.1);`,
  sfx: [{ t: 0.4, sfx: "click", vol: 0.3 }, { t: 0.8, sfx: "pop", vol: 0.3 }, { t: 1.1, sfx: "pop", vol: 0.22 }, { t: 1.4, sfx: "pop", vol: 0.22 }, { t: 2.1, sfx: "glitch-1", vol: 0.18, max: 0.4 }],
});

// ================= s02 =================
const ondas = Array.from({ length: 8 }, () => "q30 30 60 0").join(" ");
escena("s02-bazar", {
  svg: `        <g transform="translate(540 900)"><g class="s02-local">
          <rect class="ln s02-dib" x="-240" y="-150" width="480" height="330" rx="6" />
          <rect class="ln s02-dib" x="-220" y="-245" width="440" height="72" rx="8" />
          <text class="lex-b s02-cartel" x="0" y="-193" text-anchor="middle" font-size="48" letter-spacing="6">BAZAR</text>
          <path class="ln s02-dib" d="M-260 -150 H260 L240 -95 H-240 Z" />
          <path class="ln-fino s02-dib" d="M-240 -95 ${ondas}" />
          <rect class="ln s02-dib" x="-210" y="-50" width="250" height="170" rx="6" />
          <rect class="ln s02-dib" x="80" y="-50" width="120" height="230" rx="6" />
          <circle class="ln-fino s02-dib" cx="100" cy="70" r="6" />
          <g transform="translate(-160 60) scale(0.5)">${bidon("s02-it")}</g>
          <path class="ln-fino s02-it" d="M-110 40 L-100 110 H-40 L-30 40 Z" /><path class="ln-fino s02-it" d="M-112 40 Q-70 10 -28 40" />
          <line class="ln-fino s02-it" x1="10" y1="-30" x2="-10" y2="80" /><path class="ln-fino s02-it" d="M-24 80 L-30 112 M-10 80 L-12 112 M4 80 L6 112" />
          <line class="ln s02-dib" x1="-300" y1="180" x2="300" y2="180" />
        </g></g>
        <g transform="translate(780 900)"><g class="s02-hoja">
          <g transform="rotate(-5)">
          <rect class="ln" x="-160" y="-210" width="320" height="420" rx="10" />
          <text class="lex" x="-126" y="-150" font-size="34">Lista de precios</text>
          <text class="lex" x="-126" y="-112" font-size="28" opacity="0.7">Proveedor</text>
          <line class="ln-fino" x1="-126" y1="-86" x2="126" y2="-86" />
          ${[-46, -6, 34, 74, 114].map((y, i) => `<line class="ln-fino s02-ren" x1="-126" y1="${y}" x2="${[40, 20, 60, 10, 50, 30][i]}" y2="${y}" /><line class="ln-fino s02-ren" x1="80" y1="${y}" x2="126" y2="${y}" />`).join("")}
          <g class="s02-sello" transform="translate(56 168) rotate(-6)"><rect class="ln-ac" x="-62" y="-26" width="124" height="52" rx="8" /><text class="mono-ac" x="2" y="9" text-anchor="middle" font-size="28">NUEVA</text></g>
          </g></g></g>`,
  et: [[0.1, "Bazar de barrio"], [1.6, "Lista nueva"]],
  js: `
      dibujar(qa(".s02-dib"), 0, 0.5, 0.65, 0.035);
      pop(q(".s02-cartel"), 0.12);
      dibujar(qa(".s02-it"), 0.45, 0.4, 1, 0.04);
      tl.to(q(".s02-local"), { x: -330, scale: 0.7, transformOrigin: "50% 50%", duration: 0.55, ease: "power3.inOut" }, 1.1);
      tl.fromTo(q(".s02-hoja"), { x: 520, rotation: 14, opacity: 0, transformOrigin: "50% 50%" }, { x: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 1.18);
      tl.fromTo(qa(".s02-ren"), { opacity: 0 }, { opacity: 0.6, duration: 0.15, stagger: 0.04 }, 1.55);
      pop(q(".s02-sello"), 2.09);
      tl.to(q(".s02-hoja"), { y: -10, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.8);`,
  sfx: [{ t: 0.1, sfx: "pop", vol: 0.25 }, { t: 1.12, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 2.09, sfx: "click", vol: 0.3 }],
});

// ================= s03 =================
escena("s03-detergente", {
  svg: `        <g transform="translate(330 915)"><g class="s03-bidon"><g transform="scale(2.05)">${bidon("s03-bd")}
          <text class="lex s03-5l" x="0" y="46" text-anchor="middle" font-size="26">5 L</text></g></g></g>
        <g transform="translate(790 860)"><g class="s03-tag"><g transform="scale(0.72)">${etiq("s03-tg")}</g>
          <text class="lex s03-289" x="-14" y="26" text-anchor="middle" font-size="76">$ 289</text>
          <line class="ln-rojo s03-tacha" x1="-110" y1="2" x2="80" y2="-6" />
          <text class="lex s03-319" x="-14" y="26" text-anchor="middle" font-size="76" opacity="0">$ 319</text></g></g>
        <text class="mono s03-antes" x="776" y="1060" text-anchor="middle" font-size="30" opacity="0">ANTES $ 289</text>`,
  et: [[0.1, "Detergente 5 L"], [1.6, "Precio nuevo"]],
  js: `
      dibujar(qa(".s03-bd"), 0, 0.6, 1, 0.06);
      pop(q(".s03-5l"), 0.6);
      tl.fromTo(q(".s03-bidon"), { rotation: 0 }, { rotation: -2, svgOrigin: "0 190", duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.3);
      dibujar(qa(".s03-tg"), 1.2, 0.45, 1, 0.05);
      pop(q(".s03-289"), 1.6);
      gsap.set(q(".s03-289"), { opacity: 0 });
      dibujar([q(".s03-tacha")], 2.5, 0.2);
      tl.to([q(".s03-289"), q(".s03-tacha")], { y: 80, opacity: 0, duration: 0.3, ease: "power2.in" }, 2.66);
      tl.fromTo(q(".s03-319"), { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 2.72);
      sube(q(".s03-antes"), 2.75, 0.6);
      tl.to(q(".s03-tag"), { rotation: 5, svgOrigin: "92 0", duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.8);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.22 }, { t: 1.6, sfx: "pop", vol: 0.28 }, { t: 2.5, sfx: "click", vol: 0.3 }, { t: 2.72, sfx: "ping", vol: 0.25 }],
});

// ================= s04 =================
const NUMS = [0.0, 1.81, 3.25, 4.79, 6.61, 8.7];
const NOMS = [0.47, 2.27, 3.77, 5.27, 7.17, 9.17];
escena("s04-cuenta", {
  svg: grilla("s04"),
  et: NUMS.map((t, i) => [Math.max(0.1, t), i === 0 ? "1 lugar" : `${i + 1} lugares`]),
  js: `
      const NUMS = ${JSON.stringify(NUMS)}, NOMS = ${JSON.stringify(NOMS)};
      for (let i = 0; i < 6; i++) {
        const n = q(".s04-num" + i);
        tl.fromTo(n, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, Math.max(0.02, NUMS[i]));
        dibujar([q(".s04-marco" + i)], NUMS[i] + 0.05, 0.5);
        dibujar(qa(".s04-ic" + i + "-dib"), NOMS[i] - 0.15, 0.45, 1, 0.03);
        sube(q(".s04-nom" + i), NOMS[i] + 0.1, 0.7);
        pop(q(".s04-viejo" + i), NOMS[i] + 0.45, 0.45);
        pop(q(".s04-dot" + i), NOMS[i] + 0.6);
        // el que acaba de entrar respira un poco
        tl.fromTo(q(".s04-ic" + i), { y: 0 }, { y: -6, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, NOMS[i] + 0.4);
      }
      gsap.set(qa("[class*=s04-viejo], [class*=s04-dot]"), { opacity: 0 });`,
  sfx: [0, 1, 2, 3, 4, 5].map((i) => ({ t: Math.max(0.02, NUMS[i]), sfx: "click-soft", vol: 0.3 })).concat(NOMS.map((t) => ({ t: t + 0.45, sfx: "pop", vol: 0.2 }))),
});

// ================= s05 =================
escena("s05-cuarenta", {
  svg: `        <g class="s05-grilla">
${grilla("s05")}
        </g>
        <g transform="translate(300 890)"><circle class="ln-rojo s05-anillo" cx="105" cy="2" r="120" opacity="0" /></g>
        <g transform="translate(540 890)"><g class="s05-tarjeta">
          <rect class="relleno-navy" x="-300" y="-190" width="600" height="380" rx="28" />
          <rect class="ln" x="-300" y="-190" width="600" height="380" rx="28" />
          <text class="lex-b s05-n" x="0" y="60" text-anchor="middle" font-size="200">1</text>
          <text class="lex s05-cambio" x="0" y="140" text-anchor="middle" font-size="48" opacity="0.8">cambio</text>
          <text class="lex s05-cambios" x="0" y="140" text-anchor="middle" font-size="48" opacity="0">cambios</text>
        </g></g>`,
  et: [[0.1, "La lista nueva"], [1.72, "40 cambios"], [2.57, "Queda uno viejo"]],
  js: `
      gsap.set(qa("[class*=s05-num]"), { opacity: 1 });
      tl.to(q(".s05-grilla"), { opacity: 0.22, duration: 0.3 }, 0.05);
      pop(q(".s05-tarjeta"), 0.12);
      const n = q(".s05-n"), o = { v: 1 };
      tl.to(o, { v: 40, duration: 0.7, ease: "power2.in", onUpdate: () => { n.textContent = String(Math.round(o.v)); } }, 1.72);
      tl.to(q(".s05-cambio"), { opacity: 0, duration: 0.15 }, 1.72);
      tl.to(q(".s05-cambios"), { opacity: 0.8, duration: 0.15 }, 1.75);
      tl.fromTo(n, { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1 }, 2.42);
      tl.to(q(".s05-tarjeta"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 0.25, ease: "power2.in" }, 2.5);
      tl.to(q(".s05-grilla"), { opacity: 1, duration: 0.25 }, 2.55);
      [0, 1, 3, 4, 5].forEach((i, k) => {
        const t = 2.65 + k * 0.1;
        tl.to(q(".s05-viejo" + i), { opacity: 0, y: -20, duration: 0.15 }, t);
        tl.fromTo(q(".s05-nuevo" + i), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(1.6)" }, t + 0.05);
        tl.to(q(".s05-dot" + i), { opacity: 0, duration: 0.1 }, t);
        pop(q(".s05-tic" + i), t + 0.08);
        tl.to(q(".s05-celda" + i), { opacity: 0.55, duration: 0.3 }, 3.15);
      });
      tl.to(q(".s05-viejo2"), { opacity: 1, duration: 0.2 }, 3.1);
      latir(q(".s05-dot2"), 3.1, 2, 1.6);
      tl.fromTo(q(".s05-anillo"), { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 0.9, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 3.22);`,
  sfx: [{ t: 0.12, sfx: "pop", vol: 0.25 }, { t: 1.72, sfx: "typing", vol: 0.2, max: 0.7 }, { t: 2.65, sfx: "click-soft", vol: 0.25 }, { t: 2.95, sfx: "click-soft", vol: 0.25 }, { t: 3.22, sfx: "glitch-1", vol: 0.22, max: 0.4 }],
});

// ================= s06 =================
escena("s06-clienta", {
  svg: `        <g class="s06-clienta">
          <circle class="ln s06-dib" cx="330" cy="790" r="66" />
          <path class="ln s06-dib" d="M262 790 Q258 712 330 708 Q404 712 400 792 Q404 850 418 880" />
          <path class="ln s06-dib" d="M262 792 Q256 850 242 880" />
          <path class="ln s06-dib" d="M200 1120 V990 Q200 900 290 890 H370 Q460 900 460 990 V1120" />
          <path class="ln s06-dib" d="M430 1000 Q470 960 520 930" />
        </g>
        <line class="ln s06-dib" x1="110" y1="1120" x2="970" y2="1120" />
        <rect class="ln s06-dib" x="140" y="1120" width="800" height="110" rx="4" />
        <g transform="translate(800 1035)"><g class="s06-bid">${bidon("s06-bd")}</g></g>
        <g transform="translate(800 1075)"><g class="s06-tag"><rect class="relleno-navy" x="-74" y="-28" width="148" height="56" rx="8" /><rect class="ln" x="-74" y="-28" width="148" height="56" rx="8" /><text class="lex" x="0" y="13" text-anchor="middle" font-size="36">$ 319</text></g></g>
        <g transform="translate(545 860)"><g class="s06-cel">
          <rect class="relleno-navy" x="-100" y="-170" width="200" height="340" rx="30" />
          <rect class="ln" x="-100" y="-170" width="200" height="340" rx="30" />
          <line class="ln" x1="-22" y1="-150" x2="22" y2="-150" />
          <line class="ln-fino" x1="-100" y1="-120" x2="100" y2="-120" />
          <g transform="translate(0 -50) scale(0.55)"><path class="ln-fino" d="M-55 80 V-22 Q-55 -58 -18 -58 H42 Q55 -58 55 -44 V80 Q55 95 40 95 H-40 Q-55 95 -55 80 Z" /></g>
          <text class="lex s06-289" x="0" y="70" text-anchor="middle" font-size="52">$ 289</text>
          <circle class="ln-rojo s06-anillo" cx="0" cy="52" r="70" />
          <rect class="ln-fino" x="-60" y="110" width="120" height="34" rx="17" />
        </g></g>
        <text class="lex-rojo s06-dif" x="692" y="1000" text-anchor="middle" font-size="90">≠</text>`,
  et: [[0.1, "En el mostrador"], [1.75, "La página, vieja"]],
  js: `
      dibujar(qa(".s06-dib"), 0, 0.5, 1, 0.04);
      dibujar(qa(".s06-bd"), 0.2, 0.45, 1, 0.04);
      pop(q(".s06-tag"), 0.55);
      tl.fromTo(q(".s06-cel"), { opacity: 0, y: 120, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, 1.15);
      gsap.set([q(".s06-289"), q(".s06-anillo"), q(".s06-dif")], { opacity: 0 });
      pop(q(".s06-289"), 2.2);
      tl.fromTo(q(".s06-anillo"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 2.3);
      pop(q(".s06-dif"), 2.5);
      latir(q(".s06-dif"), 2.9, 1, 1.15);
      tl.to(q(".s06-clienta"), { rotation: -2, svgOrigin: "330 1120", duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.6);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.2 }, { t: 1.15, sfx: "whoosh-short", vol: 0.25 }, { t: 2.2, sfx: "pop", vol: 0.28 }, { t: 2.5, sfx: "glitch-1", vol: 0.2, max: 0.4 }],
});

// ================= s07 =================
const CH = [[250, 990], [540, 990], [830, 990], [250, 1170], [540, 1170], [830, 1170]];
escena("s07-cinco-de-seis", {
  svg: `        <g class="s07-locales">
${[["BAZAR", 210], ["FERRETERÍA", 540], ["LIBRERÍA", 870]].map(([c, x], i) => `          <g transform="translate(${x} 980) scale(0.86)"><g class="s07-loc s07-loc${i}">${local(`s07-ld${i}`, c)}
            ${[-1, 0, 1].map((d) => `<path class="punteada s07-ram${i}" d="M0 -126 Q${d * 60} -190 ${d * 110} -250" /><circle class="relleno-crema s07-pt${i}" cx="${d * 110}" cy="-262" r="10" opacity="0.7" />`).join("")}</g></g>`).join("\n")}
        </g>
        <g class="s07-grilla">
          <text class="lex-b s07-titulo" x="540" y="820" text-anchor="middle" font-size="150"><tspan class="s07-cinco">5</tspan> de <tspan class="s07-seis">6</tspan></text>
${CH.map(([x, y], i) => `          <g transform="translate(${x} ${y})"><g class="s07-c${i}"><g transform="scale(0.52)" class="${i === 2 ? "" : ""}">${ICON[ORDEN[i]](`s07-cd${i}`)}</g>
            <g transform="translate(80 -58)">${i === 2 ? `<circle class="relleno-rojo s07-dot" cx="0" cy="0" r="10" /><circle class="ln-rojo s07-anillo" cx="-80" cy="58" r="96" />` : `<g class="s07-tic s07-tic${i}">${tilde("", false)}</g>`}</g></g></g>`).join("\n")}
        </g>`,
  et: [[0.1, "Le pasa a todas"], [2.45, "Cinco de seis"]],
  js: `
      [0, 1, 2].forEach((i) => {
        dibujar(qa(".s07-ld" + i), 0.02 + i * 0.25, 0.45, 1, 0.03);
        pop(q(".s07-loc" + i + " .s-cartel"), 0.2 + i * 0.25);
        dibujar(qa(".s07-ram" + i), 1.55 + i * 0.1, 0.35, 1, 0.05);
        tl.fromTo(qa(".s07-pt" + i), { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 0.8, scale: 1, duration: 0.25, stagger: 0.05, ease: "back.out(2)" }, 1.8 + i * 0.1);
      });
      gsap.set(qa(".punteada"), { strokeDasharray: "2 14" });
      tl.to(q(".s07-locales"), { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" }, 2.3);
      gsap.set(q(".s07-grilla"), { opacity: 0 });
      tl.set(q(".s07-grilla"), { opacity: 1 }, 2.4);
      sube(q(".s07-titulo"), 2.45);
      ${JSON.stringify([0, 1, 2, 3, 4, 5])}.forEach((i) => pop(q(".s07-c" + i), 2.45 + i * 0.05));
      gsap.set(qa(".s07-tic, .s07-dot, .s07-anillo"), { opacity: 0 });
      [0, 1, 3, 4, 5].forEach((i, k) => pop(q(".s07-tic" + i), 2.75 + k * 0.1));
      pop(q(".s07-dot"), 2.9);
      tl.to([q(".s07-c0"), q(".s07-c1"), q(".s07-c3"), q(".s07-c4"), q(".s07-c5")], { opacity: 0.5, duration: 0.3 }, 3.7);
      tl.fromTo(q(".s07-anillo"), { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 4.39);
      latir(q(".s07-dot"), 4.4, 2, 1.5);
      latir(q(".s07-seis"), 4.59, 1, 1.18);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.2 }, { t: 1.6, sfx: "sparkle", vol: 0.18, max: 0.6 }, { t: 2.45, sfx: "pop", vol: 0.28 }, { t: 2.8, sfx: "click-soft", vol: 0.25 }, { t: 4.39, sfx: "glitch-1", vol: 0.2, max: 0.4 }],
});

// ================= s08 =================
const ANG = [-90, -30, 30, 90, 150, 210].map((a) => [540 + 300 * Math.cos((a * Math.PI) / 180), 905 + 250 * Math.sin((a * Math.PI) / 180)].map((v) => Math.round(v)));
const FILAS = [["Detergente 5 L", "$ 289"], ["Lavandina 2 L", "$ 95"], ["Esponja x 3", "$ 60"], ["Escoba", "$ 210"]];
escena("s08-juntan", {
  svg: `${ANG.map(([x, y], i) => `        <path class="punteada s08-hilo" d="M${x} ${y} L540 905" />`).join("\n")}
${ANG.map(([x, y], i) => `        <g transform="translate(${x} ${y})"><g class="s08-ic s08-ic${i}"><g transform="scale(0.5)" class="apagado">${ICON[ORDEN[i]](`s08-d${i}`)}</g></g></g>`).join("\n")}
        <g class="s08-centro"><circle class="ln-ac s08-ring" cx="540" cy="905" r="60" />
          <g class="s08-auto"><path class="ln-ac" d="M508 893 A34 34 0 0 1 568 885" /><path class="ln-ac" d="M572 917 A34 34 0 0 1 512 925" /><path class="ln-ac" d="M556 875 L569 886 L556 898" /><path class="ln-ac" d="M524 935 L511 924 L524 912" /></g></g>
        <circle class="ln-ac s08-onda" cx="540" cy="905" r="80" opacity="0" />
        <g class="s08-panel">
          <rect class="ln s08-pd" x="160" y="665" width="760" height="480" rx="24" />
          <circle class="relleno-ac s08-pt" cx="212" cy="726" r="11" />
          <text class="lex s08-tit" x="240" y="742" font-size="44">Lista de precios</text>
          <line class="ln-fino s08-pd" x1="160" y1="780" x2="920" y2="780" />
${FILAS.map(([a, b], i) => `          <g class="s08-fila s08-f${i}"><text class="lex" x="206" y="${850 + i * 82}" font-size="36" opacity="0.9">${a}</text><text class="lex" x="874" y="${850 + i * 82}" text-anchor="end" font-size="36">${b}</text>${i < 3 ? `<line class="ln-tenue" x1="200" y1="${878 + i * 82}" x2="880" y2="${878 + i * 82}" />` : ""}</g>`).join("\n")}
        </g>`,
  et: [[0.1, "Ahora"], [2.79, "Seis lugares"], [4.36, "Uno solo"]],
  js: `
      const P = ${JSON.stringify(ANG)};
      P.forEach((_, i) => dibujar(qa(".s08-d" + i), 0.02 + i * 0.07, 0.45, 1, 0.02));
      qa(".s08-ic").forEach((g, i) => tl.fromTo(g, { y: 0 }, { y: i % 2 ? 10 : -10, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.4));
      tl.fromTo(q(".s08-centro"), { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.61);
      tl.fromTo(q(".s08-auto"), { rotation: 0, svgOrigin: "540 905" }, { rotation: 360, svgOrigin: "540 905", duration: 2.2, ease: "none" }, 1.61);
      gsap.set(qa(".s08-hilo"), { opacity: 0 });
      tl.to(qa(".s08-hilo"), { opacity: 0.55, duration: 0.25, stagger: 0.06 }, 2.79);
      // se juntan
      P.forEach(([x, y], i) => tl.to(q(".s08-ic" + i), { x: 540 - x, y: 905 - y, scale: 0.15, opacity: 0, duration: 0.55, ease: "power3.in" }, 3.7 + i * 0.03));
      tl.to(qa(".s08-hilo"), { opacity: 0, duration: 0.3 }, 3.75);
      tl.to(q(".s08-ring"), { scale: 1.3, svgOrigin: "540 905", duration: 0.2, yoyo: true, repeat: 1 }, 4.2);
      tl.to(q(".s08-centro"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.25 }, 4.42);
      tl.fromTo(q(".s08-onda"), { opacity: 0.9, scale: 0.5, svgOrigin: "540 905" }, { opacity: 0, scale: 6, svgOrigin: "540 905", duration: 0.7, ease: "power2.out" }, 4.3);
      dibujar(qa(".s08-pd"), 4.36, 0.5, 1, 0.08);
      pop(q(".s08-pt"), 4.6);
      escribir(q(".s08-tit"), 4.91, 0.4);
      qa(".s08-fila").forEach((f, i) => sube(f, 4.6 + i * 0.1));`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.2 }, { t: 1.61, sfx: "ping", vol: 0.25 }, { t: 2.79, sfx: "click-soft", vol: 0.22 }, { t: 3.7, sfx: "riser", vol: 0.25, max: 0.6 }, { t: 4.3, sfx: "impact-bass-1", vol: 0.3, max: 0.6 }, { t: 4.91, sfx: "sparkle", vol: 0.2, max: 0.6 }],
});

// ================= s09 =================
const SAL = [["pagina", 250, 3.15], ["catalogo", 540, 3.85], ["planilla", 830, 4.65]];
escena("s09-una-vez", {
  svg: `        <g class="s09-panel">
          <rect class="ln" x="160" y="608" width="760" height="210" rx="22" />
          <circle class="relleno-ac" cx="206" cy="656" r="9" />
          <text class="lex" x="230" y="667" font-size="30" opacity="0.85">Lista de precios</text>
          <line class="ln-fino" x1="160" y1="692" x2="920" y2="692" />
          <text class="lex" x="206" y="770" font-size="42">Detergente 5 L</text>
          <text class="lex s09-289 apagado" x="874" y="770" text-anchor="end" font-size="46">$ 289</text>
          <text class="lex-ac s09-319" x="874" y="770" text-anchor="end" font-size="46">$ 319</text>
          <path class="relleno-crema s09-cursor" d="M0 0 L0 44 L11 33 L19 51 L27 47 L19 30 L34 30 Z" />
        </g>
        <g transform="translate(540 870)"><g class="s09-pill"><rect class="ln-ac" x="-170" y="-30" width="340" height="60" rx="30" /><text class="mono-ac" x="0" y="10" text-anchor="middle" font-size="30">UNA SOLA VEZ</text></g></g>
${SAL.map(([k, x], i) => `        <path class="ln-ac s09-linea s09-l${i}" d="M540 822 C540 920 ${x} 900 ${x} 1000" />
        <circle class="relleno-ac s09-viaja s09-v${i}" cx="540" cy="822" r="10" />
        <g transform="translate(${x} 1080)"><g class="s09-dest${i}"><g transform="scale(0.55)">${ICON[k](`s09-d${i}`)}</g>
          <g transform="translate(78 -60)"><g class="s09-tic${i}">${tilde("", true)}</g></g></g></g>
        <text class="lex-ac s09-p${i}" x="${x}" y="1198" text-anchor="middle" font-size="44">$ 319</text>`).join("\n")}`,
  et: [[0.1, "Un solo cambio"], [2.55, "Sale solo"]],
  js: `
      sube(q(".s09-panel"), 0);
      tl.fromTo(q(".s09-cursor"), { x: 960, y: 900, opacity: 0 }, { x: 860, y: 780, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.05);
      tl.to(q(".s09-cursor"), { scale: 0.85, transformOrigin: "0% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 0.42);
      tl.to(q(".s09-289"), { opacity: 0, y: -14, duration: 0.15 }, 0.45);
      gsap.set(q(".s09-319"), { opacity: 0 });
      tl.set(q(".s09-319"), { opacity: 1 }, 0.5);
      tl.fromTo(q(".s09-319"), { clipPath: "inset(-30% 0% -30% 100%)" }, { clipPath: "inset(-30% 0% -30% 0%)", duration: 0.4, ease: "power1.inOut" }, 0.5);
      tl.to(q(".s09-cursor"), { x: 960, y: 760, opacity: 0, duration: 0.4 }, 1.1);
      pop(q(".s09-pill"), 1.0);
      latir(q(".s09-pill"), 1.75, 1, 1.08);
      tl.to(q(".s09-pill"), { opacity: 0, duration: 0.2 }, 2.55);
      const DEST = ${JSON.stringify(SAL.map((s) => s[2]))};
      gsap.set(qa(".s09-viaja"), { opacity: 0 });
      DEST.forEach((t, i) => {
        const l = q(".s09-l" + i), v = q(".s09-v" + i), Lg = l.getTotalLength();
        dibujar([l], 2.55, Math.max(0.35, t - 2.75), 1);
        const o = { p: 0 };
        tl.set(v, { opacity: 1 }, 2.55);
        tl.to(o, { p: 1, duration: Math.max(0.35, t - 2.75), ease: "power2.inOut", onUpdate: () => { const pt = l.getPointAtLength(o.p * Lg); v.setAttribute("cx", pt.x); v.setAttribute("cy", pt.y); } }, 2.55);
        tl.to(v, { opacity: 0, duration: 0.1 }, t - 0.15);
        dibujar(qa(".s09-d" + i), t - 0.45, 0.4, 1, 0.02);
        pop(q(".s09-p" + i), t);
        pop(q(".s09-tic" + i), t + 0.1);
      });
      gsap.set(qa("[class*=s09-p], [class*=s09-tic]").filter((e) => !e.classList.contains("s09-panel") && !e.classList.contains("s09-pill")), { opacity: 0 });`,
  sfx: [{ t: 0.42, sfx: "click", vol: 0.3 }, { t: 0.5, sfx: "typing", vol: 0.18, max: 0.4 }, { t: 1.05, sfx: "pop", vol: 0.25 }, { t: 2.55, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 3.15, sfx: "ping", vol: 0.22 }, { t: 3.85, sfx: "ping", vol: 0.22 }, { t: 4.65, sfx: "ping", vol: 0.22 }],
});

// ================= s10 =================
const TAGS = [["Detergente 5 L", "$ 319"], ["Lavandina 2 L", "$ 99"], ["Esponja x 3", "$ 64"]];
escena("s10-vendedor", {
  defs: `<clipPath id="s10-clip"><rect x="560" y="842" width="420" height="420" /></clipPath>`,
  svg: `        <g class="s10-cel">
          <rect class="ln s10-cd" x="140" y="660" width="300" height="540" rx="42" />
          <line class="ln s10-cd" x1="260" y1="688" x2="320" y2="688" />
          <text class="lex" x="172" y="760" font-size="30" opacity="0.85">Precios</text>
          <line class="ln-fino s10-cd" x1="140" y1="790" x2="440" y2="790" />
          <rect class="ln-ac s10-hl" x="158" y="808" width="264" height="124" rx="16" />
          <text class="lex" x="178" y="856" font-size="28">Detergente 5 L</text>
          <text class="lex s10-v289 apagado" x="178" y="910" font-size="40">$ 289</text>
          <text class="lex-ac s10-v319" x="178" y="910" font-size="40">$ 319</text>
          <g transform="translate(386 892)"><g class="s10-vtic">${tilde("", true)}</g></g>
          ${[980, 1040, 1100].map((y, i) => `<line class="ln-fino s10-cd" x1="178" y1="${y}" x2="${[330, 300, 350][i]}" y2="${y}" /><line class="ln-fino s10-cd" x1="372" y1="${y}" x2="404" y2="${y}" />`).join("")}
        </g>
        <g class="s10-imp">
          <rect class="ln s10-id" x="600" y="700" width="340" height="140" rx="20" />
          <line class="ln s10-id" x1="640" y1="842" x2="900" y2="842" />
          <rect class="ln-fino s10-id" x="650" y="660" width="240" height="40" rx="6" />
          <circle class="relleno-ac s10-led" cx="900" cy="740" r="9" />
        </g>
        <g clip-path="url(#s10-clip)"><g class="s10-hoja">
          <rect class="ln" x="640" y="846" width="260" height="380" rx="6" />
${TAGS.map(([a, b], i) => `          <g transform="translate(770 ${920 + i * 110})"><rect class="ln-fino" x="-110" y="-44" width="220" height="88" rx="8" /><text class="lex" x="-92" y="-14" font-size="24" opacity="0.8">${a}</text><text class="lex" x="-92" y="30" font-size="34">${b}</text><g transform="translate(70 20)"><g class="s10-tic s10-tic${i}">${tilde("", true)}</g></g></g>`).join("\n")}
        </g></g>`,
  et: [[0.1, "El vendedor"], [1.62, "Etiquetas nuevas"], [4.0, "Solo las que cambiaron"]],
  js: `
      dibujar(qa(".s10-cd"), 0, 0.5, 1, 0.04);
      gsap.set([q(".s10-v319"), q(".s10-hl"), q(".s10-vtic")], { opacity: 0 });
      dibujar([q(".s10-hl")], 0.55, 0.4);
      tl.to(q(".s10-v289"), { opacity: 0, y: -12, duration: 0.15 }, 0.6);
      tl.fromTo(q(".s10-v319"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)" }, 0.65);
      pop(q(".s10-vtic"), 0.9);
      tl.fromTo(q(".s10-cel"), { y: 0 }, { y: -10, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: 5 }, 1.0);
      dibujar(qa(".s10-id"), 1.55, 0.45, 1, 0.05);
      gsap.set(q(".s10-led"), { opacity: 0 });
      pop(q(".s10-led"), 2.0);
      latir(q(".s10-led"), 2.4, 3, 1.4);
      tl.fromTo(q(".s10-hoja"), { y: -390 }, { y: 0, duration: 1.4, ease: "power1.inOut" }, 2.4);
      tl.to(q(".s10-imp"), { x: 3, duration: 0.07, yoyo: true, repeat: 15, ease: "none" }, 2.4);
      gsap.set(qa(".s10-tic"), { opacity: 0 });
      [4.18, 4.4, 4.62].forEach((t, i) => pop(q(".s10-tic" + i), t));`,
  sfx: [{ t: 0.6, sfx: "notification", vol: 0.25 }, { t: 0.9, sfx: "pop", vol: 0.22 }, { t: 2.4, sfx: "typing", vol: 0.2, max: 1.4 }, { t: 4.18, sfx: "click-soft", vol: 0.25 }, { t: 4.4, sfx: "click-soft", vol: 0.25 }, { t: 4.62, sfx: "click-soft", vol: 0.25 }],
});

// ================= s11 =================
escena("s11-iguales", {
  svg: `        <g transform="translate(290 880)"><g class="s11-a"><g transform="scale(1.3)">${ICON.pagina("s11-ad")}</g>
          <g transform="translate(156 -110)"><g class="s11-ta">${tilde("", true)}</g></g></g></g>
        <g transform="translate(790 880)"><g class="s11-b"><g transform="scale(1.3)">${ICON.gondola("s11-bd")}</g>
          <g transform="translate(156 -110)"><g class="s11-tb">${tilde("", true)}</g></g></g></g>
        <text class="mono s11-na" x="290" y="1050" text-anchor="middle" font-size="30" opacity="0.7">LA PÁGINA</text>
        <text class="mono s11-nb" x="790" y="1050" text-anchor="middle" font-size="30" opacity="0.7">LA GÓNDOLA</text>
        <text class="lex-ac s11-pa" x="290" y="1170" text-anchor="middle" font-size="78">$ 319</text>
        <text class="lex-ac s11-pb" x="790" y="1170" text-anchor="middle" font-size="78">$ 319</text>
        <text class="lex-b s11-igual" x="540" y="1170" text-anchor="middle" font-size="110" fill="#5ce611" style="fill:#5ce611">=</text>`,
  et: [[0.1, "La próxima clienta"], [2.77, "El mismo precio"]],
  js: `
      dibujar(qa(".s11-ad"), 0, 0.5, 1, 0.03);
      dibujar(qa(".s11-bd"), 0.15, 0.5, 1, 0.03);
      sube(q(".s11-na"), 0.4, 0.7); sube(q(".s11-nb"), 0.5, 0.7);
      gsap.set(qa(".s11-pa, .s11-pb, .s11-ta, .s11-tb, .s11-igual"), { opacity: 0 });
      pop(q(".s11-pa"), 1.27); pop(q(".s11-pb"), 1.4);
      pop(q(".s11-ta"), 2.47);
      pop(q(".s11-igual"), 2.77);
      latir(q(".s11-igual"), 3.1, 1, 1.2);
      pop(q(".s11-tb"), 3.17);
      tl.fromTo([q(".s11-a"), q(".s11-b")], { y: 0 }, { y: -10, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 5, stagger: 0.2 }, 0.6);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.2 }, { t: 1.27, sfx: "pop", vol: 0.25 }, { t: 2.47, sfx: "ping", vol: 0.22 }, { t: 2.77, sfx: "chime", vol: 0.25, max: 0.8 }, { t: 3.17, sfx: "ping", vol: 0.22 }],
});

// ================= s12 =================
const R = [-90, -30, 30, 90, 150, 210].map((a) => [540 + 290 * Math.cos((a * Math.PI) / 180), 985 + 200 * Math.sin((a * Math.PI) / 180)].map((v) => Math.round(v)));
const FICHAS = [240, 360, 480, 600, 720, 840];
escena("s12-cta", {
  salida: false,
  svg: `        <g class="s12-marca">
          <text class="lex-blanco s12-sc" x="540" y="650" text-anchor="middle" font-size="96">Scalerics</text>
${R.map(([x, y], i) => `          <line class="ln-ac s12-rayo" x1="540" y1="985" x2="${x}" y2="${y}" opacity="0.6" />`).join("\n")}
          <g class="s12-nucleo"><rect class="relleno-navy" x="430" y="930" width="220" height="110" rx="18" /><rect class="ln-ac" x="430" y="930" width="220" height="110" rx="18" /><text class="mono-ac" x="540" y="995" text-anchor="middle" font-size="30">PRECIOS</text></g>
${R.map(([x, y], i) => `          <g transform="translate(${x} ${y})"><g class="s12-ic s12-ic${i}"><rect class="relleno-navy" x="-80" y="-60" width="160" height="120" rx="12" /><g transform="scale(0.42)">${ICON[ORDEN[i]](`s12-d${i}`)}</g><g transform="translate(62 -44) scale(0.8)">${tilde("", true)}</g></g></g>`).join("\n")}
        </g>
        <g class="s12-preg">
          <text class="lex s12-q1" x="540" y="720" text-anchor="middle" font-size="62">¿En cuántos lugares</text>
          <text class="lex s12-q2" x="540" y="800" text-anchor="middle" font-size="62">tenés tus <tspan fill="#5ce611" style="fill:#5ce611">precios</tspan> hoy?</text>
${FICHAS.map((x, i) => `          <g transform="translate(${x} 945)"><g class="s12-f s12-f${i}"><circle class="ln s12-fc${i}" cx="0" cy="0" r="46" /><circle class="relleno-ac s12-fl${i}" cx="0" cy="0" r="46" opacity="0" /><text class="lex s12-ft${i}" x="0" y="15" text-anchor="middle" font-size="42">${i < 5 ? i + 1 : "6+"}</text></g></g>`).join("\n")}
          <g class="s12-pill"><rect class="relleno-crema" x="190" y="1060" width="700" height="100" rx="50" /><text class="lex-navy" x="540" y="1124" text-anchor="middle" font-size="40">Dejalo en los comentarios</text></g>
        </g>`,
  et: [[0.13, "Automatizaciones para pymes"], [3.36, "Contalos"]],
  js: `
      pop(q(".s12-sc"), 0.13);
      gsap.set(qa(".s12-rayo"), { opacity: 0.6 });
      dibujar(qa(".s12-rayo"), 0.3, 0.4, 1, 0.06);
      pop(q(".s12-nucleo"), 0.2);
      qa(".s12-ic").forEach((g, i) => pop(g, 0.5 + i * 0.12));
      tl.fromTo(q(".s12-nucleo"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.4);
      tl.to(q(".s12-marca"), { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" }, 3.2);
      gsap.set(q(".s12-preg"), { opacity: 0 });
      tl.set(q(".s12-preg"), { opacity: 1 }, 3.3);
      sube(q(".s12-q1"), 3.36); sube(q(".s12-q2"), 3.6);
      qa(".s12-f").forEach((f, i) => pop(f, 4.0 + i * 0.08));
      // contando: se van poniendo verdes
      for (let i = 0; i < 6; i++) {
        const t = 4.93 + i * 0.18;
        tl.to(q(".s12-fl" + i), { opacity: 1, duration: 0.12 }, t);
        tl.to(q(".s12-ft" + i), { fill: "#07111f", duration: 0.12 }, t);
        tl.fromTo(q(".s12-f" + i), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.15, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, t);
      }
      pop(q(".s12-pill"), 6.07);
      latir(q(".s12-pill"), 7.4, 2, 1.04);`,
  sfx: [{ t: 0.13, sfx: "impact-bass-1", vol: 0.28, max: 0.6 }, { t: 0.5, sfx: "sparkle", vol: 0.2, max: 0.8 }, { t: 3.36, sfx: "pop", vol: 0.22 }, { t: 4.93, sfx: "click-soft", vol: 0.22 }, { t: 5.3, sfx: "click-soft", vol: 0.22 }, { t: 5.66, sfx: "click-soft", vol: 0.22 }, { t: 6.07, sfx: "chime", vol: 0.25, max: 1 }],
});
console.log("escenas generadas");
