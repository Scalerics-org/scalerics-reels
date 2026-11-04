// Generador de escenas de reels/caso-mcdonalds (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" (copiado de caso-spotify y por-que-la-tarjeta): un objeto grande relleno
// por escena, que se transforma: hamburguesa (x3 iguales) → hamburguesa que se desarma en una
// línea de 4 pasos → los pasos se recorren en orden → ficha de receta (tachada) → cabeza con los
// pasos adentro → los pasos salen y quedan escritos en un manual → tu negocio y el dueño que se
// lo sabe solo → tablet con "Tu sistema" (Pedido · Preparación · Entrega) → un pedido recorre
// las columnas y cada uno sabe qué le toca → dos locales con los mismos pasos → videollamada.
// McDonald's se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: hamburguesa,
// plancha, bandeja y ticket genéricos con los colores de Scalerics.
// Los tiempos salen de las palabras: w(i) = segundo de la palabra i relativo a la escena.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const START = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
let T0 = 0;
const w = (i) => r2(pal[i].start - T0);
const desde = (id) => { T0 = START[id]; };

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", CRD = "#b9b7a8", G = "#5ce611", GD = "#3fa60a", GL = "#9df26a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
// tilde dentro de un svg (centro cx, cy)
const tickG = (cls, cx, cy, r = 30) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 22})"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const avatar = (s = 140, piel = CR, ropa = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${piel}"/><circle cx="70" cy="56" r="26" fill="${ropa}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${ropa}"/></svg>`;
// avatar dentro de un svg (centro cx, cy, radio r)
const avatarG = (cls, cx, cy, r, piel = CR, ropa = NAVY3) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 70})"><circle cx="70" cy="70" r="70" fill="${piel}"/><circle cx="70" cy="56" r="26" fill="${ropa}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${ropa}"/></g></g>`;

// hamburguesa genérica (viewBox 800 x 620): capas sueltas para poder desarmarla
const SESAMO = [[300, 200], [380, 165], [465, 190], [250, 270], [420, 248], [545, 238], [335, 305], [610, 300]]
  .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="8" transform="rotate(${(i % 3) * 25 - 25} ${x} ${y})" fill="${CRD}"/>`).join("");
const BURGER = `
  <ellipse class="h-sh" cx="400" cy="592" rx="330" ry="26" fill="rgba(3,6,12,0.55)"/>
  <g class="h-base"><path d="M100 470 H700 V500 Q700 560 630 560 H170 Q100 560 100 500 Z" fill="${CR}"/><path d="M520 470 H700 V500 Q700 560 630 560 H470 Z" fill="${CRD}"/></g>
  <g class="h-carne"><rect x="80" y="378" width="640" height="100" rx="50" fill="${NAVY3}"/><rect x="120" y="392" width="420" height="20" rx="10" fill="${BORDE}"/><path d="M540 378 H670 A50 50 0 0 1 670 478 H470 Z" fill="#17263f"/></g>
  <g class="h-queso"><path d="M90 368 H710 L690 392 H640 L612 440 L584 392 H330 L298 452 L266 392 H112 Z" fill="#ffffff"/></g>
  <g class="h-lech"><path d="M70 360 Q110 326 150 360 T230 360 T310 360 T390 360 T470 360 T550 360 T630 360 T710 360 L730 384 H70 Z" fill="${G}"/><path d="M70 372 H730 L730 384 H70 Z" fill="${GD}"/></g>
  <g class="h-top"><path d="M100 350 Q100 120 400 110 Q700 120 700 350 Z" fill="${CR}"/><path d="M520 126 Q700 172 700 350 L590 350 Z" fill="${CRD}"/><ellipse cx="270" cy="200" rx="60" ry="26" transform="rotate(-24 270 200)" fill="rgba(255,255,255,0.6)"/>${SESAMO}</g>`;
const burgerSvg = (cls = "") => `<svg class="h-svg ${cls}" viewBox="0 0 800 620" aria-hidden="true">${BURGER}</svg>`;
// hamburguesa adentro de un svg de 1080x1920: centro visual (cx, cy), escala s
const burgerG = (cls, cx, cy, s) => `<g class="${cls}" transform="translate(${r2(cx - 400 * s)} ${r2(cy - 335 * s)}) scale(${s})">${BURGER}</g>`;

// la línea: mostrador + 4 estaciones + números 1-4 unidos con flechas
const SX = [170, 403, 637, 870];
const plancha = (cx) => `<g class="st st1">
  <rect x="${cx - 104}" y="1112" width="208" height="58" rx="10" fill="${CRD}"/><rect x="${cx - 104}" y="1104" width="208" height="20" rx="8" fill="${CR}"/>
  <rect x="${cx - 72}" y="1064" width="144" height="44" rx="22" fill="${NAVY3}"/><rect x="${cx - 52}" y="1072" width="70" height="10" rx="5" fill="${BORDE}"/>
  <path class="vap" d="M${cx - 40} 1046 C ${cx - 56} 1020, ${cx - 24} 1004, ${cx - 40} 976 M${cx + 6} 1046 C ${cx - 10} 1020, ${cx + 22} 1004, ${cx + 6} 976 M${cx + 52} 1046 C ${cx + 36} 1020, ${cx + 68} 1004, ${cx + 52} 976" fill="none" stroke="${CR}" stroke-width="8" stroke-linecap="round" opacity="0.75"/></g>`;
const armado = (cx) => `<g class="st st2">
  <path d="M${cx - 96} 1124 H${cx + 96} V1136 Q${cx + 96} 1170 ${cx + 64} 1170 H${cx - 64} Q${cx - 96} 1170 ${cx - 96} 1136 Z" fill="${CR}"/>
  <rect x="${cx - 100}" y="1084" width="200" height="44" rx="22" fill="${NAVY3}"/>
  <path d="M${cx - 104} 1086 Q${cx - 84} 1066 ${cx - 64} 1086 T${cx - 24} 1086 T${cx + 16} 1086 T${cx + 56} 1086 T${cx + 96} 1086 L${cx + 106} 1098 H${cx - 104} Z" fill="${G}"/>
  <path d="M${cx - 92} 1036 Q${cx - 92} 980 ${cx} 976 Q${cx + 92} 980 ${cx + 92} 1036 Z" fill="${CR}" transform="rotate(-12 ${cx + 92} 1036) translate(-18 -10)"/></g>`;
const bandeja = (cx) => `<g class="st st4">
  <path d="M${cx - 112} 1140 H${cx + 112} L${cx + 96} 1170 H${cx - 96} Z" fill="${G}"/><rect x="${cx - 112}" y="1132" width="224" height="14" rx="6" fill="${GL}"/>
  <rect x="${cx - 86}" y="1050" width="132" height="84" rx="18" fill="${CR}"/><path d="M${cx - 86} 1078 L${cx + 46} 1104 V1134 H${cx - 86} Z" fill="${CRD}"/>
  <path d="M${cx + 54} 1132 L${cx + 62} 1018 H${cx + 108} L${cx + 116} 1132 Z" fill="${CR}"/><rect x="${cx + 56}" y="1004" width="64" height="18" rx="6" fill="${CRD}"/><path d="M${cx + 92} 1004 L${cx + 104} 964" stroke="${G}" stroke-width="9" stroke-linecap="round"/></g>`;
const num = (k, cx, cy = 860) => `<g class="nu nu${k}"><circle cx="${cx}" cy="${cy}" r="50" fill="${G}"/><text x="${cx}" y="${cy + 17}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="56" fill="${NAVY}">${k}</text></g>`;
const flecha = (k, x1, x2, y = 860) => `<path class="fl fl${k}" d="M${x1} ${y} H${x2} M${x2 - 18} ${y - 16} L${x2} ${y} L${x2 - 18} ${y + 16}" fill="none" stroke="${CR}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
const MOSTRADOR = `<g class="most"><rect x="40" y="1170" width="1000" height="30" rx="8" fill="${CR}"/><rect x="60" y="1200" width="960" height="70" fill="${NAVY3}"/><path class="cinta" d="M80 1236 H1000" stroke="${BORDE}" stroke-width="14" stroke-dasharray="40 30" stroke-linecap="round"/><ellipse cx="540" cy="1300" rx="500" ry="18" fill="rgba(3,6,12,0.5)"/></g>`;
const NUMS = SX.map((x, k) => num(k + 1, x)).join("") + [0, 1, 2].map((k) => flecha(k + 1, SX[k] + 58, SX[k + 1] - 58)).join("");
const grande = (cx, g) => `<g transform="translate(${r2(cx * -0.12)} ${r2(1170 * -0.12)}) scale(1.12)">${g}</g>`;
const LINEA = (conBurger = true) => `${MOSTRADOR}${grande(SX[0], plancha(SX[0]))}${grande(SX[1], armado(SX[1]))}${conBurger ? burgerG("st st3", SX[2], 1086, 0.37) : ""}${grande(SX[3], bandeja(SX[3]))}${NUMS}`;

// tienda (svg, coordenadas de pantalla): toldo a rayas verde/crema, vidriera y puerta
const tienda = (cls, x, y, ww, h, cartel = "") => {
  const ah = Math.round(h * 0.2), n = 6, sw = ww / n;
  let toldo = "";
  for (let i = 0; i < n; i++) {
    const c = i % 2 ? CR : G;
    toldo += `<rect x="${r2(x + i * sw)}" y="${y}" width="${r2(sw + 0.5)}" height="${ah}" fill="${c}"/><circle cx="${r2(x + i * sw + sw / 2)}" cy="${y + ah}" r="${r2(sw / 2)}" fill="${c}"/>`;
  }
  const fy = y + ah, fh = h - ah;
  return `<g class="${cls}">
    <ellipse cx="${x + ww / 2}" cy="${y + h + 8}" rx="${ww * 0.56}" ry="18" fill="rgba(3,6,12,0.5)"/>
    <rect x="${x + 14}" y="${fy}" width="${ww - 28}" height="${fh}" fill="${NAVY2}" stroke="${CR}" stroke-width="7"/>
    <rect x="${x + 0.1 * ww}" y="${fy + 0.3 * fh}" width="${0.44 * ww}" height="${0.42 * fh}" rx="8" fill="${NAVY3}" stroke="${CR}" stroke-width="7"/>
    <path d="M${x + 0.1 * ww} ${fy + 0.51 * fh} H${x + 0.54 * ww}" stroke="${CR}" stroke-width="6"/>
    <rect x="${x + 0.14 * ww}" y="${fy + 0.4 * fh}" width="${0.08 * ww}" height="${0.11 * fh - 3}" fill="${G}"/><rect x="${x + 0.26 * ww}" y="${fy + 0.43 * fh}" width="${0.06 * ww}" height="${0.08 * fh - 3}" fill="${CR}"/><rect x="${x + 0.38 * ww}" y="${fy + 0.6 * fh}" width="${0.1 * ww}" height="${0.12 * fh - 3}" fill="${CR}"/>
    <rect x="${x + 0.62 * ww}" y="${fy + 0.22 * fh}" width="${0.26 * ww}" height="${0.78 * fh}" fill="${NAVY3}" stroke="${CR}" stroke-width="7"/>
    <circle cx="${x + 0.66 * ww}" cy="${fy + 0.62 * fh}" r="9" fill="${G}"/>
    ${toldo}
    <rect x="${x - 10}" y="${y - 26}" width="${ww + 20}" height="30" rx="8" fill="${CR}"/>
    ${cartel ? `<text x="${r2(x + 0.32 * ww)}" y="${r2(fy + sw / 2 + 0.1 * fh + 14)}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="${Math.min(40, Math.round(ww / 13.5))}" letter-spacing="4" fill="${CR}">${cartel}</text>` : ""}
  </g>`;
};

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .hbw { position: absolute; left: 40px; top: 620px; width: 1000px; height: 775px; }
    ${P} .h-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .tab { position: absolute; left: 60px; top: 640px; width: 960px; height: 650px; }
    ${P} .tab-lado { position: absolute; left: 16px; top: 16px; width: 960px; height: 650px; border-radius: 54px; background: #a9a798; }
    ${P} .tab-cuerpo { position: absolute; left: 0; top: 0; width: 960px; height: 650px; border-radius: 54px; background: ${CR}; }
    ${P} .tab-pan { position: absolute; left: 22px; top: 22px; width: 916px; height: 606px; border-radius: 36px; background: ${NAVY2}; overflow: hidden; }
    ${P} .tab-tit { position: absolute; left: 40px; top: 30px; font: 800 54px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; padding: 6px 14px 10px; }
    ${P} .tab-chip { position: absolute; right: 36px; top: 36px; padding: 12px 22px; border-radius: 16px; background: ${G}; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${NAVY}; }
    ${P} .col { position: absolute; top: 124px; width: 276px; height: 456px; border-radius: 26px; background: ${NAVY3}; }
    ${P} .col h4 { position: absolute; left: 0; right: 0; top: 24px; margin: 0; text-align: center; font: 500 29px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${G}; }
    ${P} .tk { position: absolute; width: 240px; height: 176px; border-radius: 22px; background: ${CR}; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    ${P} .tk b { position: absolute; left: 22px; top: 22px; font: 800 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .tk span { position: absolute; left: 22px; top: 80px; font: 600 30px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }
    ${P} .tk i { position: absolute; left: 22px; top: 130px; width: 150px; height: 18px; border-radius: 9px; background: rgba(11,18,32,0.22); }
`;
// tablet con "Tu sistema" y las tres columnas (coordenadas internas de la pantalla 916 x 606)
const COLX = [22, 320, 618];
const tablet = (extra = "") => `<div class="tab" data-layout-allow-overlap><div class="tab-lado"></div><div class="tab-cuerpo"></div><div class="tab-pan">
  <div class="tab-tit">Tu sistema</div><div class="tab-chip">A MEDIDA</div>
  ${["PEDIDO", "PREPARACIÓN", "ENTREGA"].map((t, k) => `<div class="col c${k}" style="left:${COLX[k]}px"><h4>${t}</h4></div>`).join("")}
  ${extra}</div></div>`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const cinta = (t, d) => qa(".cinta").forEach((c) => tl.fromTo(c, { strokeDashoffset: 0 }, { strokeDashoffset: -70 * d * 2, duration: d, ease: "none" }, t));
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: Math.max(0.12, DUR - t), ease: "power2.in" }, t);
`;

function escena(id, { css = "", html, js, sfx }) {
  const dur = ESC[id];
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELP}
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx));
}
const D = (id) => ESC[id];

// ================= s01 · gancho =================
desde("s01-gancho");
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 104px/1.02 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 148px; line-height: 1.0; }
    P .tit .v { color: ${G}; }
    P .hb1, P .hb2 { opacity: 0; }
    P .lc { position: absolute; top: 1170px; width: 300px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${CR}; opacity: 0; }
    P .ig { position: absolute; top: 980px; width: 80px; text-align: center; font: 800 96px/1 "Lexend", sans-serif; color: ${G}; opacity: 0; }`,
  html: `
      <div class="hbw hb1">${burgerSvg()}</div>
      <div class="hbw hb2">${burgerSvg()}</div>
      <div class="hbw hb0">${burgerSvg()}</div>
      <div class="lc" style="left:60px">LOCAL 1</div><div class="lc" style="left:390px">LOCAL 2</div><div class="lc" style="left:720px">LOCAL 3</div>
      <div class="tit"><div>¿Por qué</div><div class="gr">McDonald's</div><div class="gr">sale <span class="v">igual</span></div><div>en cada local?</div></div>`,
  js: `
      const O = "500px 420px";
      // cuadro 0: el gancho entero y la hamburguesa ya grande
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".hb0"), { y: 40, scale: 0.96, transformOrigin: O }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.to(q(".hb0 .h-top"), { y: -14, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.9);
      // "igual": la hamburguesa se achica y aparecen dos idénticas al lado
      tl.to(q(".hb0"), { scale: 0.4, y: -40, duration: 0.4, ease: "power3.inOut" }, ${r2(w(6) + 0.75)});
      tl.fromTo(q(".hb1"), { opacity: 0, scale: 0.4, x: 0, y: -40, transformOrigin: O }, { opacity: 1, x: -330, duration: 0.4, ease: "back.out(1.4)" }, ${r2(w(7) - 0.1)});
      tl.fromTo(q(".hb2"), { opacity: 0, scale: 0.4, x: 0, y: -40, transformOrigin: O }, { opacity: 1, x: 330, duration: 0.4, ease: "back.out(1.4)" }, ${r2(w(7) - 0.05)});
      qa(".lc").forEach((l, i) => tl.fromTo(l, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, ${w(9)} + i * 0.08));
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, ${w(7)});
      // vuelve a ser una sola, grande (match con s02)
      const V = ${r2(D("s01-gancho") - 0.55)};
      tl.to(qa(".lc"), { opacity: 0, duration: 0.2 }, V);
      tl.to(q(".hb1"), { x: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, V);
      tl.to(q(".hb2"), { x: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, V);
      tl.to(q(".hb0"), { scale: 1, y: 0, duration: 0.5, ease: "power3.inOut" }, V);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, V);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.2 }, { t: r2(w(7) - 0.1), sfx: "whoosh-short", vol: 0.22 }, { t: w(9), sfx: "ping", vol: 0.18 }],
});

// ================= s02 · rehicieron la cocina como una línea =================
desde("s02-linea");
escena("s02-linea", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${LINEA(false)}</svg>
      <div class="hbw hb0">${burgerSvg()}</div>
      ${pill(1, 540, 640, "1948", "g")}${pill(2, 540, 720, "Una línea", "lleno")}`,
  js: `
      const O = "500px 420px";
      gsap.set(qa(".most, .st, .nu"), { opacity: 0 });
      // "rehicieron": la hamburguesa se desarma en capas
      pop(".n1", ${w(12)});
      const capas = [[".h-top", -150], [".h-lech", -80], [".h-queso", -40], [".h-carne", 20], [".h-base", 110]];
      capas.forEach(([c, dy], i) => tl.to(q(".hb0 " + c), { y: dy, duration: 0.45, ease: "back.out(1.6)" }, ${w(14)} + i * 0.03));
      tl.to(q(".hb0"), { rotation: -3, transformOrigin: O, duration: 0.45, ease: "sine.inOut" }, ${w(14)});
      // "cocina": se vuelve a armar, se achica y queda como el paso 3 de la línea
      tl.to(qa(".hb0 .h-top, .hb0 .h-lech, .hb0 .h-queso, .hb0 .h-carne, .hb0 .h-base"), { y: 0, duration: 0.3, ease: "power3.in" }, ${r2(w(16) - 0.05)});
      tl.to(q(".hb0"), { rotation: 0, x: 97, y: 47, scale: 0.296, transformOrigin: O, duration: 0.55, ease: "power3.inOut" }, ${r2(w(16) + 0.1)});
      tl.to(q(".n1"), { opacity: 0, duration: 0.2 }, ${r2(w(16) + 0.1)});
      tl.fromTo(q(".most"), { opacity: 0, scaleX: 0.3, transformOrigin: "540px 1200px" }, { opacity: 1, scaleX: 1, duration: 0.4, ease: "power3.out" }, ${r2(w(16) + 0.25)});
      [".st1", ".st2", ".st4"].forEach((s, i) => tl.fromTo(q(s), { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, ${r2(w(17))} + i * 0.12));
      // "línea": números 1-4 unidos con flechas
      qa(".nu").forEach((n, i) => pop(n, ${r2(w(18))} + i * 0.12, 0.3, 0.4));
      dibujar(".fl", ${r2(w(19))}, 0.3);
      pop(".n2", ${r2(w(19) + 0.1)});
      cinta(${r2(w(16) + 0.4)}, ${r2(D("s02-linea") - w(16) - 0.4)});
      tl.to(q(".n2"), { opacity: 0, duration: 0.2 }, ${r2(D("s02-linea") - 0.2)});`,
  sfx: [{ t: w(12), sfx: "pop", vol: 0.22 }, { t: w(14), sfx: "whoosh-short", vol: 0.25 }, { t: r2(w(16) + 0.1), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(17), sfx: "click-soft", vol: 0.25 }, { t: r2(w(19) + 0.1), sfx: "ping", vol: 0.2 }],
});

// ================= s03 · cada paso, siempre en el mismo orden =================
desde("s03-pasos");
const PASO_T = [w(20), w(21), w(22), w(25)];
escena("s03-pasos", {
  css: `
    P .zoom { position: absolute; inset: 0; }`,
  html: `
      <div class="zoom">
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${LINEA(true)}${SX.map((x, k) => tickG("tk tk" + k, x + 86, 960, 32)).join("")}</svg>
        ${selbox("sb", SX[0] - 122, 930, 244, 262)}
      </div>
      ${pill(1, 540, 720, "Siempre igual", "lleno")}`,
  js: `
      const Z = q(".zoom"), SB = q(".sb");
      tl.fromTo(Z, { scale: 1, transformOrigin: "540px 1060px" }, { scale: 1.08, duration: DUR, ease: "sine.inOut" }, 0);
      gsap.set(qa(".tk"), { opacity: 0 });
      const X = ${JSON.stringify(SX)}, T = ${JSON.stringify(PASO_T.map((t) => Math.max(0.05, t)))};
      T.forEach((t, k) => {
        if (k === 0) caja(".sb", t); else tl.to(SB, { x: X[k] - X[0], duration: 0.22, ease: "power3.inOut" }, t - 0.05);
        tl.fromTo(q(".nu" + (k + 1)), { scale: 1 }, { scale: 1.25, svgOrigin: X[k] + " 860", duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
        tl.fromTo(q(".tk" + k), { opacity: 0, scale: 0.3, svgOrigin: (X[k] + 86) + " 960" }, { opacity: 1, scale: 1, duration: 0.26, ease: "back.out(2)" }, t + 0.12);
      });
      tl.to(q(".st1 .vap"), { y: -14, opacity: 0.3, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      cinta(0, DUR);
      pop(".n1", ${r2(w(26))});
      salida(${r2(D("s03-pasos") - 0.25)});`,
  sfx: PASO_T.map((t, k) => ({ t: Math.max(0.05, t), sfx: k === 3 ? "ping" : "click-soft", vol: 0.25 })).concat([{ t: w(26), sfx: "pop", vol: 0.2 }]),
});

// ================= s04 · el secreto no es la receta =================
desde("s04-receta");
escena("s04-receta", {
  css: `
    P .rc { position: absolute; left: 210px; top: 610px; width: 660px; height: 720px; }
    P .rc-lado { position: absolute; left: 18px; top: 18px; width: 660px; height: 700px; border-radius: 40px; background: #a9a798; }
    P .rc-hoja { position: absolute; left: 0; top: 0; width: 660px; height: 700px; border-radius: 40px; background: ${CR}; overflow: hidden; }
    P .rc-ban { position: absolute; left: 0; top: 0; width: 660px; height: 150px; background: ${NAVY3}; }
    P .rc-ban b { position: absolute; left: 50px; top: 46px; font: 800 64px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: 0.02em; }
    P .rc-ban .h-svg.rb { inset: auto; left: auto; right: 40px; top: 22px; width: 140px; height: 108px; }
    P .rc-fila { position: absolute; left: 60px; display: flex; align-items: center; gap: 26px; font: 600 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .rc-fila i { display: block; width: 22px; height: 22px; border-radius: 50%; background: ${G}; }
    P .rc-x { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }`,
  html: `
      <div class="rc"><div class="rc-lado"></div><div class="rc-hoja">
        <div class="rc-ban"><b>RECETA</b>${burgerSvg("rb")}</div>
        ${["Pan", "Carne", "Queso", "Lechuga", "Salsa"].map((t, i) => `<div class="rc-fila" style="top:${206 + i * 96}px"><i></i>${t}</div>`).join("")}
      </div></div>
      <svg class="rc-x" viewBox="0 0 1080 1920" aria-hidden="true"><path class="x1" d="M250 690 L830 1280" stroke="${RED}" stroke-width="22" stroke-linecap="round"/><path class="x2" d="M830 690 L250 1280" stroke="${RED}" stroke-width="22" stroke-linecap="round"/></svg>
`,
  js: `
      const RC = q(".rc");
      // la línea se vuelve una ficha: entra girando
      tl.fromTo(RC, { opacity: 0, scale: 0.6, rotation: -12, y: 80, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -3, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      qa(".rc-fila").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" }, 0.2 + i * 0.07));
      tl.to(RC, { scale: 1.04, duration: 0.6, ease: "sine.inOut" }, ${r2(w(28))});
      // "no es la receta": se apaga y se tacha
      tl.to(RC, { opacity: 0.45, duration: 0.3 }, ${r2(w(29))});
      dibujar(".x1", ${r2(w(30))}, 0.22);
      dibujar(".x2", ${r2(w(30) + 0.16)}, 0.22);
      tl.to(q(".rc"), { x: -10, duration: 0.06, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${r2(w(32))});
      salida(${r2(D("s04-receta") - 0.22)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.22 }, { t: w(30), sfx: "glitch-1", vol: 0.16, max: 0.4 }, { t: w(32), sfx: "pop", vol: 0.2 }],
});

// ================= s05 · el cómo no vive en la cabeza de nadie: está escrito =================
desde("s05-cabeza");
const CAB = `M360 1330 L360 1190 Q280 1120 272 990 Q262 790 450 700 Q640 620 790 730 Q866 800 856 900 L908 984 Q914 1000 892 1006 L858 1012 L866 1074 Q866 1104 836 1110 L776 1116 L768 1210 L768 1330 Z`;
const tarjeta = (k, x, y) => `<g class="cd cd${k}"><rect x="${x}" y="${y}" width="320" height="64" rx="16" fill="${CR}"/><circle cx="${x + 36}" cy="${y + 32}" r="20" fill="${G}"/><text x="${x + 36}" y="${y + 42}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="28" fill="${NAVY}">${k}</text><rect x="${x + 72}" y="${y + 24}" width="${190 - k * 18}" height="16" rx="8" fill="${CRD}"/></g>`;
const PASOS = ["Tomar el pedido", "Preparar", "Revisar", "Entregar"];
escena("s05-cabeza", {
  css: `
    P .man { position: absolute; left: 230px; top: 600px; width: 620px; height: 730px; opacity: 0; }
    P .man-lado { position: absolute; left: 18px; top: 30px; width: 620px; height: 700px; border-radius: 36px; background: #a9a798; }
    P .man-hoja { position: absolute; left: 0; top: 12px; width: 620px; height: 700px; border-radius: 36px; background: ${CR}; }
    P .man-clip { position: absolute; left: 200px; top: -8px; width: 220px; height: 64px; border-radius: 18px; background: ${NAVY3}; }
    P .man-tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 56px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }
    P .mf { position: absolute; left: 44px; width: 540px; height: 104px; border-radius: 22px; background: rgba(11,18,32,0.07); display: flex; align-items: center; gap: 22px; padding-left: 20px; font: 600 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .mf b { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: ${G}; font: 800 36px/1 "Lexend", sans-serif; color: ${NAVY}; flex: none; }
    P .mf .ok { position: absolute; right: 18px; top: 30px; }`,
  html: `
      <svg class="full cab" viewBox="0 0 1080 1920" aria-hidden="true">
        <ellipse cx="564" cy="1330" rx="300" ry="16" fill="rgba(3,6,12,0.5)"/>
        <path class="cab-f" d="${CAB}" fill="${NAVY3}" stroke="${CR}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M680 700 Q 840 760 856 900 L908 984 Q914 1000 892 1006 L858 1012 L866 1074 Q866 1104 836 1110 L776 1116 L768 1210 L768 1330 L700 1330 Z" fill="rgba(11,18,32,0.25)"/>
        ${[0, 1, 2, 3].map((k) => tarjeta(k + 1, 400, 790 + k * 86)).join("")}
      </svg>
      ${pill(1, 560, 640, "En la cabeza", "r")}
      <div class="man"><div class="man-lado"></div><div class="man-hoja"><div class="man-tit">Cómo se hace</div>
        ${PASOS.map((t, i) => `<div class="mf mf${i}" style="top:${200 + i * 122}px"><b>${i + 1}</b>${t}<span class="ok">${tick(22)}</span></div>`).join("")}
      </div><div class="man-clip"></div></div>
      ${pill(2, 540, 1400, "Escrito", "lleno")}`,
  js: `
      const CABZ = q(".cab");
      tl.fromTo(CABZ, { opacity: 0, scale: 0.85, transformOrigin: "560px 1020px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, 0);
      // "cómo": los pasos aparecen adentro de la cabeza
      qa(".cd").forEach((c, i) => pop(c, ${r2(Math.max(0.15, w(36) - 0.1))} + i * 0.1, 0.28, 0.5));
      tl.to(qa(".cd"), { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", stagger: 0.06 }, ${r2(w(38))});
      // "cabeza": la cabeza se apaga
      tl.to(q(".cab-f"), { fill: "#2a3343", stroke: "#8f8d82", duration: 0.3 }, ${r2(w(41))});
      pop(".n1", ${r2(w(41))});
      // "nadie": los pasos salen de la cabeza
      qa(".cd").forEach((c, i) => tl.to(c, { x: 340, y: -120 + i * 40, opacity: 0, duration: 0.4, ease: "power2.in" }, ${r2(w(43))} + i * 0.05));
      tl.to(qa(".n1"), { opacity: 0, duration: 0.2 }, ${r2(w(44) - 0.3)});
      // "está escrito": la cabeza se va y queda el manual
      tl.to(CABZ, { opacity: 0, x: -200, duration: 0.35, ease: "power2.in" }, ${r2(w(44) - 0.35)});
      tl.fromTo(q(".man"), { opacity: 0, y: 160, rotation: 6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.42, ease: "back.out(1.4)" }, ${r2(w(44) - 0.2)});
      qa(".mf").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.22, ease: "power3.out" }, ${r2(w(44))} + i * 0.1));
      qa(".mf .ok").forEach((o, i) => pop(o, ${r2(w(45))} + i * 0.1, 0.25, 0.3));
      pop(".n2", ${r2(w(45) + 0.3)});
      salida(${r2(D("s05-cabeza") - 0.22)});`,
  sfx: [{ t: w(36), sfx: "pop", vol: 0.2 }, { t: w(41), sfx: "glitch-1", vol: 0.14, max: 0.4 }, { t: w(43), sfx: "whoosh-short", vol: 0.22 }, { t: w(44), sfx: "whoosh", vol: 0.18, max: 0.5 }, { t: w(45), sfx: "click-soft", vol: 0.28 }, { t: r2(w(45) + 0.3), sfx: "ping", vol: 0.2 }],
});

// ================= s06 · en tu negocio, ¿eso lo sabés solo vos? =================
desde("s06-vos");
escena("s06-vos", {
  css: `
    P .bur { position: absolute; left: 500px; top: 880px; width: 470px; height: 300px; opacity: 0; }
    P .bur-n { position: absolute; left: 0; top: 0; width: 470px; height: 250px; border-radius: 60px; background: #ffffff; }
    P .bur i { position: absolute; border-radius: 50%; background: #ffffff; }
    P .bf { position: absolute; left: 40px; height: 44px; display: flex; align-items: center; gap: 18px; }
    P .bf b { width: 40px; height: 40px; border-radius: 50%; background: ${G}; display: flex; align-items: center; justify-content: center; font: 800 30px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .bf span { display: block; height: 18px; border-radius: 9px; background: rgba(11,18,32,0.25); }`,
  html: `
      <svg class="full loc" viewBox="0 0 1080 1920" aria-hidden="true">${tienda("t1", 90, 700, 900, 630, "TU NEGOCIO")}${avatarG("duen", 300, 1200, 120, CR, NAVY)}</svg>
      <div class="bur"><div class="bur-n"></div><i style="left:70px;top:250px;width:44px;height:44px"></i><i style="left:30px;top:300px;width:26px;height:26px"></i>
        ${[0, 1, 2, 3].map((k) => `<div class="bf" style="top:${24 + k * 52}px"><b>${k + 1}</b><span style="width:${300 - k * 40}px"></span></div>`).join("")}
      </div>
      ${pill(1, 735, 1230, "Solo vos", "r")}`,
  js: `
      tl.fromTo(q(".loc"), { opacity: 0, scale: 0.82, transformOrigin: "540px 1330px" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".duen"), { y: 60 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0.2);
      // "eso": la burbuja con los pasos, en la cabeza del dueño
      tl.fromTo(q(".bur"), { opacity: 0, scale: 0.3, transformOrigin: "10% 100%" }, { opacity: 1, scale: 1, duration: 0.38, ease: "back.out(1.6)" }, ${r2(w(49) - 0.1)});
      qa(".bf").forEach((f, i) => tl.fromTo(f, { opacity: 0 }, { opacity: 1, duration: 0.15 }, ${r2(w(49) + 0.15)} + i * 0.08));
      // "solo vos"
      pop(".n1", ${r2(w(52))});
      tl.to(q(".bur"), { rotation: -2, duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${r2(w(52))});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(49) - 0.1), sfx: "pop", vol: 0.22 }, { t: w(52), sfx: "click-soft", vol: 0.25 }],
});

// ================= s07 · hacemos tu sistema a medida =================
desde("s07-sistema");
escena("s07-sistema", {
  css: `
    P .loc { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .tab-tit .selbox { left: 0; top: 0; right: 0; bottom: 0; }`,
  html: `
      <svg class="full loc" viewBox="0 0 1080 1920" aria-hidden="true">${tienda("t1", 90, 700, 900, 630, "TU NEGOCIO")}</svg>
      ${tablet()}`,
  js: `
      // la burbuja de la escena anterior se vuelve la tablet del sistema
      tl.to(q(".loc"), { opacity: 0, scale: 0.9, transformOrigin: "540px 1330px", duration: 0.3 }, 0);
      tl.fromTo(q(".tab"), { opacity: 0, scale: 0.45, x: 220, y: -120, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.5, ease: "back.out(1.3)" }, 0.02);
      qa(".col").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.28, ease: "back.out(1.6)" }, 0.35 + i * 0.1));
      tl.fromTo(q(".tab-tit"), { scale: 1 }, { scale: 1.08, transformOrigin: "0% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(56))});
      tl.fromTo(q(".tab-chip"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2)" }, ${r2(w(58))});
      tl.to(q(".tab"), { y: -10, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(58) + 0.3)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.4, sfx: "click-soft", vol: 0.22 }, { t: w(58), sfx: "pop", vol: 0.24 }],
});

// ================= s08 · cada pedido sigue los mismos pasos, y cada uno sabe qué le toca =================
desde("s08-pedido");
const QUIEN = [["Ana", CR, NAVY], ["Luis", "#d6d4c6", BORDE], ["Sofi", CR, NAVY3]];
escena("s08-pedido", {
  css: `
    P .pp { position: absolute; top: 390px; width: 276px; height: 170px; opacity: 0; }
    P .pp svg { position: absolute; left: 20px; top: 0; }
    P .pp span { position: absolute; left: 136px; top: 32px; font: 700 36px/1 "Lexend", sans-serif; color: ${CR}; }
    P .pp em { position: absolute; left: 136px; top: 84px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; font-style: normal; color: ${G}; opacity: 0; }
    P .pp .ring { position: absolute; left: 14px; top: -6px; width: 112px; height: 112px; border-radius: 50%; border: 7px solid ${G}; opacity: 0; }
    P .okc { position: absolute; top: 300px; opacity: 0; }`,
  html: `
      ${tablet(`
        <div class="tk t104" style="left:${COLX[0] + 18}px;top:200px"><b>#104</b><span>Mesa 3</span><i></i></div>
        <div class="tk t105" style="left:${COLX[0] + 18}px;top:200px;opacity:0"><b>#105</b><span>Para llevar</span><i></i></div>
        ${COLX.map((x, k) => `<div class="okc ok${k}" style="left:${x + 210}px">${tick(26)}</div>`).join("")}
        ${QUIEN.map(([n, piel, ropa], k) => `<div class="pp p${k}" style="left:${COLX[k]}px">${avatar(100, piel, ropa)}<div class="ring"></div><span>${n}</span><em>${["Toma", "Prepara", "Entrega"][k]}</em></div>`).join("")}`)}`,
  js: `
      const T4 = q(".t104"), T5 = q(".t105"), DX = ${COLX[1] - COLX[0]};
      // "cada pedido": entra el ticket
      tl.fromTo(T4, { opacity: 0, y: -80, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.35, ease: "back.out(1.8)" }, 0.05);
      pop(".ok0", ${r2(w(60) + 0.2)}, 0.25, 0.3);
      // "sigue los mismos pasos": pasa de columna en columna
      tl.to(T4, { x: DX, duration: 0.3, ease: "power3.inOut" }, ${r2(w(61))});
      tl.fromTo(T5, { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }, ${r2(w(62))});
      pop(".ok1", ${r2(w(62) + 0.1)}, 0.25, 0.3);
      tl.to(T4, { x: DX * 2, duration: 0.3, ease: "power3.inOut" }, ${r2(w(64))});
      tl.to(T5, { x: DX, duration: 0.3, ease: "power3.inOut" }, ${r2(w(64) + 0.1)});
      pop(".ok2", ${r2(w(64) + 0.3)}, 0.25, 0.3);
      // "cada uno sabe qué le toca": quién hace cada paso
      tl.to(qa(".tk"), { y: -40, scale: 0.9, transformOrigin: "50% 0%", duration: 0.3, ease: "power3.inOut" }, ${r2(w(66) - 0.25)});
      tl.to(qa(".okc"), { y: -40, duration: 0.3, ease: "power3.inOut" }, ${r2(w(66) - 0.25)});
      qa(".pp").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }, ${r2(w(66))} + i * 0.1));
      qa(".pp .ring").forEach((r, i) => pop(r, ${r2(w(69))} + i * 0.14, 0.24, 0.6));
      qa(".pp em").forEach((e, i) => tl.fromTo(e, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.2 }, ${r2(w(69))} + i * 0.14));
      salida(${r2(D("s08-pedido") - 0.22)});`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.22 }, { t: w(61), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(62) + 0.1), sfx: "click-soft", vol: 0.25 }, { t: w(64), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(64) + 0.3), sfx: "ping", vol: 0.2 }, { t: w(66), sfx: "pop", vol: 0.2 }, { t: w(69), sfx: "click-soft", vol: 0.25 }],
});

// ================= s09 · así sumás gente o abrís otro local sin desordenarte =================
desde("s09-local");
const pasosMini = (cls, x, y) => `<g class="${cls}">${[0, 1, 2].map((k) => `<circle cx="${x + k * 100}" cy="${y}" r="26" fill="${G}"/><text x="${x + k * 100}" y="${y + 10}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="30" fill="${NAVY}">${k + 1}</text>${k < 2 ? `<path d="M${x + k * 100 + 34} ${y} H${x + k * 100 + 66}" stroke="${CR}" stroke-width="7" stroke-linecap="round"/>` : ""}`).join("")}</g>`;
escena("s09-local", {
  css: `
    P .mov1, P .mov2 { position: absolute; inset: 0; }`,
  html: `
      <svg class="full mov1" viewBox="0 0 1080 1920" aria-hidden="true">
        ${tienda("ta", 60, 800, 450, 470, "LOCAL 1")}
        ${pasosMini("pa", 185, 700)}
        ${avatarG("ga0", 200, 1210, 62, CR, NAVY)}${avatarG("ga1 nuevo", 320, 1220, 54, "#d6d4c6", BORDE)}${avatarG("ga2 nuevo", 430, 1226, 48, CR, NAVY3)}
        ${tickG("oka", 470, 790, 34)}
      </svg>
      <svg class="full mov2" viewBox="0 0 1080 1920" aria-hidden="true">
        ${tienda("tb", 570, 800, 450, 470, "LOCAL 2")}
        ${pasosMini("pb", 695, 700)}
        ${avatarG("gb0", 710, 1210, 62, "#d6d4c6", NAVY)}${avatarG("gb1", 830, 1220, 54, CR, BORDE)}
        ${tickG("okb", 980, 790, 34)}
      </svg>
      ${pill(1, 540, 1400, "Mismos pasos", "lleno")}`,
  js: `
      const M1 = q(".mov1"), M2 = q(".mov2");
      // el local de la escena anterior, centrado y grande, se corre a la izquierda
      tl.fromTo(M1, { opacity: 0, x: 255, scale: 1.15, transformOrigin: "285px 1270px" }, { opacity: 1, x: 255, scale: 1.15, duration: 0.25 }, 0);
      pop(".pa", 0.3, 0.3, 0.5);
      pop(".ga0", 0.2, 0.3, 0.5);
      // "sumás gente"
      qa(".nuevo").forEach((g, i) => tl.fromTo(g, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }, ${r2(w(73))} + i * 0.14));
      // "abrís otro local": se corre y entra el segundo, con los mismos pasos
      tl.to(M1, { x: 0, scale: 1, duration: 0.5, ease: "power3.inOut" }, ${r2(w(75))});
      tl.fromTo(M2, { opacity: 0, x: 500 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, ${r2(w(76))});
      tl.fromTo(q(".pb"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, ${r2(w(77) + 0.1)});
      // "sin desordenarte"
      pop(".oka", ${r2(w(79))}, 0.28, 0.3);
      pop(".okb", ${r2(w(79) + 0.12)}, 0.28, 0.3);
      pop(".n1", ${r2(w(80) + 0.1)});
      tl.to(qa(".pa circle, .pb circle"), { scale: 1.15, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05, immediateRender: false }, ${r2(w(80))});`,
  sfx: [{ t: w(73), sfx: "pop", vol: 0.22 }, { t: w(76), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(79), sfx: "click-soft", vol: 0.28 }, { t: r2(w(80) + 0.1), sfx: "ping", vol: 0.2 }],
});

// ================= s10 · CTA =================
desde("s10-cta");
escena("s10-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 600px; width: 922px; height: 470px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 616px; width: 922px; height: 470px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 390px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg.av { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 266px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1130px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1272px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1460px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="capa locs"><svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${tienda("ta", 60, 800, 450, 470, "LOCAL 1")}${tienda("tb", 570, 800, 450, 470, "LOCAL 2")}</svg></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg class="av" width="160" height="160" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg><div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      // "¿lo vemos en tu negocio?": los dos locales se juntan en la pantalla de la videollamada
      tl.to(q(".locs"), { scale: 0.62, y: -120, transformOrigin: "540px 1030px", duration: 0.55, ease: "power3.inOut" }, 0.05);
      tl.to(q(".locs"), { opacity: 0, duration: 0.18 }, 0.5);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }, 0.5);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.65);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(86) - 0.05)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(89) - 0.1)});
      caja(".sb", ${r2(w(89) + 0.1)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(91) - 0.1)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(91) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(91) + 0.4)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.65, sfx: "pop", vol: 0.22 }, { t: r2(w(86) - 0.05), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(89) + 0.1), sfx: "click-soft", vol: 0.28 }, { t: r2(w(91) - 0.1), sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
