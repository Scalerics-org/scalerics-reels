// Generador de escenas de reels/dos-jugueterias (correr desde la carpeta del reel: `node armar.mjs &&
// node gen.mjs && node armar.mjs`). Serie "Dos negocios": dos jugueterías en la misma cuadra; se vienen
// las fiestas y un abuelo en Salto quiere el mismo juguete para su nieto. La de la izquierda (Trencito,
// gris y rojo apagado) vende solo en el mostrador; la de la derecha (Calesita, verde de marca) tiene
// tienda online, cobra con Mercado Pago y lo manda por DAC. Fondo navy claro #16243d liso.
// Forma copiada de reels/dos-gimnasios/gen.mjs (que viene de dos-restaurantes y por-que-la-tarjeta).
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 31.58;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

// fondo #16243d: los paneles van más oscuros (DK) o más claros (MID)
const BG = "#16243d", DK = "#0b1220", DK2 = "#0f1a2e", MID = "#22365a", MID2 = "#2e4672";
const CR = "#efeee5", G = "#5ce611", RED = "#c7655b", GRIS = "#8a96ab", GRIS2 = "#4a5873";
const ST = 7; // grosor de trazo

// ---------- piezas ----------
const tick = (r = 22, fondo = G, marca = DK) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, kind = "") => `<div class="selbox ${kind} ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
// abuelo: círculo crema, silueta navy, pelo blanco a los costados, lentes y bigote
const abuelo = (r, fondo = CR, sil = MID) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/>
   <path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${sil}"/>
   <circle cx="70" cy="56" r="27" fill="${sil}"/>
   <path d="M43 52 Q42 36 52 34 M97 52 Q98 36 88 34" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none"/>
   <circle cx="59" cy="56" r="8" fill="none" stroke="${fondo}" stroke-width="4"/><circle cx="81" cy="56" r="8" fill="none" stroke="${fondo}" stroke-width="4"/><path d="M67 56 H73" stroke="${fondo}" stroke-width="4"/>
   <path d="M58 70 Q70 63 82 70" stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none"/></svg>`;
const persona = (r, fondo = CR, sil = MID) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${sil}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${sil}"/></svg>`;

// ---------- juguetes ----------
// camión de bomberos de juguete (viewBox 420 x 270): EL juguete del abuelo
const CAMION_IN = (c = G, esc = "") => `
    <ellipse cx="212" cy="252" rx="196" ry="14" fill="#000" opacity="0.28"/>
    <rect x="40" y="46" width="222" height="24" rx="7" fill="${CR}" stroke="${DK}" stroke-width="6"/>
    <path d="M70 46 V70 M104 46 V70 M138 46 V70 M172 46 V70 M206 46 V70 M240 46 V70" stroke="${DK}" stroke-width="5"/>
    <rect x="18" y="74" width="256" height="134" rx="16" fill="${c}" stroke="${DK}" stroke-width="7"/>
    <rect x="22" y="170" width="248" height="34" rx="6" fill="#000" opacity="0.16"/>
    <path d="M274 208 V104 Q274 84 294 84 H346 Q362 84 370 98 L400 152 Q404 160 404 170 V208 Z" fill="${c}" stroke="${DK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M292 102 H340 L364 146 H292 Z" fill="${DK}"/>
    <rect x="300" y="62" width="34" height="22" rx="7" fill="${CR}" stroke="${DK}" stroke-width="5"/>
    <rect x="18" y="146" width="386" height="18" fill="${CR}"/>
    <rect x="40" y="96" width="70" height="40" rx="8" fill="${DK}" opacity="0.25"/>
    <rect x="130" y="96" width="70" height="40" rx="8" fill="${DK}" opacity="0.25"/>
    <circle cx="92" cy="212" r="38" fill="${DK}" stroke="${CR}" stroke-width="7"/><circle cx="92" cy="212" r="12" fill="${CR}"/>
    <circle cx="334" cy="212" r="38" fill="${DK}" stroke="${CR}" stroke-width="7"/><circle cx="334" cy="212" r="12" fill="${CR}"/>
    ${esc}`;
const camion = (w, c = G, cls = "") => `<svg class="${cls}" width="${w}" height="${(w * 270) / 420}" viewBox="0 0 420 270" aria-hidden="true">${CAMION_IN(c)}</svg>`;
// osito, pelota y bloques, para las vidrieras (coordenadas de pantalla)
const osito = (x, y, s, c, ojo) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="-30" cy="-62" r="17" fill="${c}"/><circle cx="30" cy="-62" r="17" fill="${c}"/>
    <ellipse cx="0" cy="22" rx="46" ry="48" fill="${c}"/><circle cx="0" cy="-40" r="38" fill="${c}"/>
    <ellipse cx="0" cy="-30" rx="15" ry="11" fill="${ojo}" opacity="0.35"/>
    <circle cx="-13" cy="-46" r="5.5" fill="${ojo}"/><circle cx="13" cy="-46" r="5.5" fill="${ojo}"/><circle cx="0" cy="-34" r="6" fill="${ojo}"/>
    <ellipse cx="0" cy="30" rx="24" ry="22" fill="${ojo}" opacity="0.18"/></g>`;
const pelota = (x, y, r, c1, c2) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${c1}"/><path d="M${x - r} ${y} Q${x} ${y - r * 0.55} ${x + r} ${y} L${x + r} ${y + 0.001} Q${x} ${y + r * 0.55} ${x - r} ${y} Z" fill="${c2}"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.4}" r="${r * 0.18}" fill="#fff" opacity="0.5"/></g>`;
const bloque = (x, y, s, c, letra, tc) => `<g><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="8" fill="${c}"/><text x="${x + s / 2}" y="${y + s * 0.72}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="${s * 0.62}" fill="${tc}">${letra}</text></g>`;
// caja de envío (viewBox 300 x 260)
const CAJA = (txt = "DAC") => `<svg class="caja-svg" data-layout-ignore width="100%" height="100%" viewBox="0 0 300 260" aria-hidden="true">
    <ellipse cx="150" cy="246" rx="130" ry="12" fill="#000" opacity="0.28"/>
    <path d="M30 70 L150 30 L270 70 L150 110 Z" fill="#f7f6ef" stroke="${DK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M30 70 V196 L150 238 V110 Z" fill="${CR}" stroke="${DK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M270 70 V196 L150 238 V110 Z" fill="#cfcdbd" stroke="${DK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M90 50 L210 90 V140" stroke="${G}" stroke-width="16" fill="none"/>
    <path d="M178 140 L250 116 V160 L178 184 Z" fill="${DK}"/>
    <text x="214" y="158" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="30" fill="${CR}" transform="rotate(-18 214 152)">${txt}</text>
  </svg>`;

// ---------- fachada de juguetería (svg, coordenadas de pantalla) ----------
// 430 de ancho x 730 de alto, con toldo de rayas, vidriera con juguetes y puerta
const fachada = (cls, cx, B, nombre, bien) => {
  const c = bien ? CR : GRIS, vid = bien ? "#1d3a24" : DK2;
  const t1 = bien ? G : GRIS2, t2 = bien ? CR : MID;
  let toldo = "";
  for (let i = 0; i < 6; i++) {
    const x = cx - 215 + i * (430 / 6), w = 430 / 6;
    toldo += `<path d="M${x} ${B - 600} H${x + w} V${B - 560} A${w / 2} ${w / 2.6} 0 0 1 ${x} ${B - 560} Z" fill="${i % 2 ? t2 : t1}"/>`;
  }
  const jc = bien ? G : GRIS, jc2 = bien ? CR : GRIS2;
  return `<g class="${cls}">
    <rect x="${cx - 215}" y="${B - 600}" width="430" height="600" fill="${DK2}" stroke="${c}" stroke-width="${ST}" stroke-linejoin="round"/>
    <rect x="${cx - 200}" y="${B - 740}" width="400" height="104" rx="18" fill="${bien ? CR : MID}" stroke="${c}" stroke-width="${ST}"/>
    <text x="${cx}" y="${B - 669}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="56" fill="${bien ? DK : GRIS}" letter-spacing="3">${nombre}</text>
    <path d="M${cx - 120} ${B - 636} V${B - 600} M${cx + 120} ${B - 636} V${B - 600}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
    <g class="toldo">${toldo}<path d="M${cx - 215} ${B - 600} H${cx + 215}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/></g>
    <rect class="vid" x="${cx - 192}" y="${B - 470}" width="256" height="320" rx="12" fill="${vid}" stroke="${c}" stroke-width="${ST}"/>
    ${bien ? `<rect class="luzv" x="${cx - 188}" y="${B - 466}" width="248" height="312" rx="10" fill="${G}" opacity="0.14"/>` : ""}
    <g class="jug">
      ${osito(cx - 128, B - 238, 0.95, bien ? CR : GRIS, DK2)}
      ${pelota(cx + 4, B - 206, 44, jc, jc2)}
      ${bloque(cx - 50, B - 420, 70, jc, "A", DK)}
      ${bloque(cx - 150, B - 420, 70, jc2, "B", bien ? DK : CR)}
      <path d="M${cx - 186} ${B - 168} H${cx + 60}" stroke="${c}" stroke-width="6"/>
    </g>
    <rect class="puerta" x="${cx + 84}" y="${B - 450}" width="116" height="450" rx="8" fill="${MID}" stroke="${c}" stroke-width="${ST}"/>
    <rect x="${cx + 102}" y="${B - 424}" width="80" height="170" rx="6" fill="${vid}" stroke="${c}" stroke-width="5"/>
    <circle cx="${cx + 180}" cy="${B - 210}" r="9" fill="${c}"/>
  </g>`;
};
const PISO = (B) => `<path class="piso" d="M20 ${B} H1060" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round" opacity="0.5"/>`;
const DIV = (y1, y2) => `<path class="div" d="M540 ${y1} V${y2}" stroke="${CR}" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round" opacity="0.4"/>`;

// ---------- mapa de Uruguay (lat, lon) -> pantalla ----------
const BORDE = [
  [-30.19, -57.61], [-30.28, -57.08], [-30.38, -56.6], [-30.6, -56.1], [-30.9, -55.55], [-31.25, -55.05], [-31.55, -54.6],
  [-31.87, -54.16], [-32.15, -53.8], [-32.55, -53.35], [-32.95, -53.25], [-33.25, -53.5], [-33.7, -53.45], [-34.05, -53.56],
  [-34.4, -53.85], [-34.66, -54.16], [-34.9, -54.6], [-34.97, -54.95], [-34.8, -55.3], [-34.88, -55.9], [-34.9, -56.2],
  [-34.75, -56.6], [-34.45, -57.2], [-34.47, -57.85], [-34.2, -58.2], [-33.9, -58.42], [-33.4, -58.42], [-33.12, -58.3],
  [-32.7, -58.15], [-32.32, -58.08], [-31.85, -58.15], [-31.39, -57.97], [-30.85, -57.85], [-30.45, -57.82],
];
const CAPITALES = {
  Artigas: [-30.45, -56.47], Rivera: [-30.92, -55.56], Salto: [-31.39, -57.86], Paysandú: [-32.32, -57.97], Tacuarembó: [-31.71, -55.98],
  Melo: [-32.37, -54.2], "Fray Bentos": [-33.12, -58.18], Mercedes: [-33.25, -57.98], Durazno: [-33.38, -56.52], "Treinta y Tres": [-33.23, -54.38],
  Trinidad: [-33.52, -56.9], Florida: [-34.1, -56.21], Minas: [-34.37, -55.24], Rocha: [-34.48, -54.33], Colonia: [-34.44, -57.78],
  "San José": [-34.34, -56.71], Canelones: [-34.52, -56.28], Maldonado: [-34.88, -54.95], Montevideo: [-34.84, -56.19],
};
// mapa de 760 x 800 en pantalla, desde (MX, MY)
const MAPA = (MX = 170, MY = 600, KY = 160) => {
  const KX = KY * 0.84;
  const p = ([lat, lon]) => [r2(MX + (lon + 58.42) * KX), r2(MY + (-30.19 - lat) * KY)];
  const d = "M" + BORDE.map((q) => p(q).join(" ")).join(" L") + " Z";
  return { p, d };
};

// ---------- celular (div) ----------
const tel = (cls, x, y, w, h, pantalla) => `
<div class="telw ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="tel-lado"></div>
  <div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>
</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 6px solid ${CR}; border-radius: 999px; background: ${DK}; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; display: flex; align-items: center; gap: 14px; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${DK}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .pill.big { font-size: 52px; padding: 18px 38px 20px; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .lado { position: absolute; top: 520px; left: 0; width: 1080px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; }
    ${P} .lado.izq { color: ${RED}; } ${P} .lado.der { color: ${G}; }
    ${P} .telw { position: absolute; }
    ${P} .tel-lado { position: absolute; left: 16px; top: 16px; right: -16px; bottom: -16px; border-radius: 70px; background: #0a1120; }
    ${P} .tel { position: absolute; inset: 0; border-radius: 70px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 50%; top: 26px; width: 120px; height: 28px; margin-left: -60px; border-radius: 14px; background: ${CR}; }
    ${P} .mapa-n { font-family: "IBM Plex Mono"; font-weight: 500; font-size: 32px; letter-spacing: 0.08em; }
`;

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
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const temblor = (s, t) => tl.fromTo(typeof s === "string" ? q(s) : s, { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
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

// ================= s01 · gancho (5.10) =================
// cuadro 0: el gancho entero en grande + las dos jugueterías ya dibujadas
const B1 = 1560;
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 130px; text-align: center; font: 800 96px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .tit .g2 { font-size: 80px; margin-top: 18px; color: ${CR}; }
    P .tit .g3 { font-size: 88px; margin-top: 6px; color: ${G}; }
    P .tit .bx { position: relative; display: inline-block; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(820, B1)}${PISO(B1)}
        ${fachada("fzL", 270, B1, "TRENCITO", false)}
        ${fachada("fzR", 810, B1, "CALESITA", true)}
      </svg>
      ${pill(1, 270, 1640, "Al barrio", "r")}
      ${pill(2, 810, 1640, "A todo el país", "lleno")}
      <div class="tit"><div>Dos jugueterías,</div><div>misma cuadra.</div><div class="g2">Una le vende al barrio.</div><div class="g3">La otra, a todo el país.</div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzL"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0.08);
      dibujar(".div", 0.2, 0.6);
      tl.fromTo(qa(".jug"), { y: 0 }, { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.4);
      // "Una le vende al barrio"
      latido(".tit .g2", 1.9, 1.05);
      pop(".n1", 2.6);
      // "La otra, a todo el país": se enciende la derecha
      tl.fromTo(q(".fzR .luzv"), { opacity: 0.14 }, { opacity: 0.5, duration: 0.18, yoyo: true, repeat: 3, immediateRender: false }, 3.3);
      tl.to(q(".fzL"), { opacity: 0.5, duration: 0.4 }, 3.5);
      latido(".fzR", 3.9, 1.04);
      tl.fromTo(q(".tit .g3"), { scale: 1 }, { scale: 1.07, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 3.95);
      pop(".n2", 3.75);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 4.75);
      salida(4.85);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.6, sfx: "click-soft", vol: 0.25 }, { t: 3.3, sfx: "ping", vol: 0.25 }, { t: 4.0, sfx: "pop", vol: 0.28 }],
});

// ================= s02 · el abuelo en Salto (4.40) =================
let luces = "";
for (let i = 0; i < 11; i++) {
  const x = 60 + i * 96, y = 640 + Math.sin((i / 10) * Math.PI) * 70;
  luces += `<circle class="luz l${i % 2}" cx="${x}" cy="${y + 26}" r="20" fill="${i % 2 ? CR : G}"/>`;
}
escena("s02-abuelo", {
  css: `
    P .guir { position: absolute; left: 0; top: 0; }
    P .fiestas { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font: 900 150px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.03em; }
    P .ficha { position: absolute; left: 70px; top: 600px; width: 940px; height: 220px; border-radius: 36px; background: ${DK}; border: 6px solid ${CR}; opacity: 0; }
    P .ficha .av { position: absolute; left: 30px; top: 34px; }
    P .ficha .nm { position: absolute; left: 216px; top: 46px; font: 800 70px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; }
    P .ficha .dd { position: absolute; left: 220px; top: 140px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${GRIS}; }
    P .pin { position: absolute; right: 34px; top: 54px; height: 104px; padding: 0 34px; border-radius: 52px; background: ${G}; display: flex; align-items: center; gap: 14px; font: 800 52px/1 "Lexend", sans-serif; color: ${DK}; opacity: 0; }
    P .juguete { position: absolute; left: 90px; top: 900px; width: 900px; height: 579px; }
    P .rotulo { position: absolute; left: 0; right: 0; top: 1500px; text-align: center; font: 500 36px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${G}; opacity: 0; }`,
  html: `
      <svg class="full guir" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="cable" d="M0 640 Q540 790 1080 640" stroke="${CR}" stroke-width="6" fill="none" opacity="0.6"/>
        ${luces}
      </svg>
      <div class="fiestas">Fiestas</div>
      <div class="ficha"><div class="av">${abuelo(76)}</div><div class="nm">Un abuelo</div><div class="dd">QUIERE REGALAR</div>
        <div class="pin"><svg width="40" height="52" viewBox="0 0 40 52"><path d="M20 50 C8 34 2 26 2 18 A18 18 0 0 1 38 18 C38 26 32 34 20 50 Z" fill="${DK}"/><circle cx="20" cy="18" r="7" fill="${G}"/></svg>Salto</div></div>
      <div class="juguete">${camion(900)}</div>
      ${selbox("sbJ", 70, 880, 940, 620)}
      <div class="rotulo">EL MISMO JUGUETE</div>
      ${pill(1, 540, 1610, "Para su nieto", "lleno big")}`,
  js: `
      // "Se vienen las fiestas": guirnalda de luces y la palabra gigante
      dibujar(".cable", 0, 0.4);
      qa(".luz").forEach((l, i) => tl.fromTo(l, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2.5)" }, 0.05 + i * 0.04));
      tl.fromTo(qa(".luz.l0"), { opacity: 1 }, { opacity: 0.35, duration: 0.2, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, 0.6);
      tl.fromTo(q(".fiestas"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, 0.45);
      tl.fromTo(q(".juguete"), { opacity: 0, y: 160, scale: 0.85, transformOrigin: "50% 100%" }, { opacity: 0.35, y: 0, scale: 0.85, duration: 0.5, ease: "power3.out" }, 0.4);
      // "Un abuelo en Salto": la palabra se va, entra la ficha
      tl.to(q(".fiestas"), { opacity: 0, y: -40, duration: 0.2 }, 1.3);
      tl.to(q(".guir"), { opacity: 0, duration: 0.25 }, 1.3);
      tl.fromTo(q(".ficha"), { opacity: 0, x: -900 }, { opacity: 1, x: 0, duration: 0.42, ease: "power3.out" }, 1.4);
      tl.fromTo(q(".pin"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 1.9);
      // "el mismo juguete": el camión sube al frente
      tl.to(q(".juguete"), { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, 2.5);
      caja(".sbJ", 2.8);
      tl.to(q(".rotulo"), { opacity: 1, duration: 0.25 }, 2.85);
      tl.fromTo(q(".juguete svg"), { rotation: 0 }, { rotation: -2.5, svgOrigin: "212 250", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 2.95);
      // "para su nieto"
      tl.to(q(".rotulo"), { opacity: 0, duration: 0.15 }, 3.4);
      pop(".n1", 3.5);
      salida(4.2);`,
  sfx: [{ t: 0.05, sfx: "sparkle", vol: 0.22, max: 0.9 }, { t: 1.4, sfx: "whoosh-short", vol: 0.18 }, { t: 1.9, sfx: "pop", vol: 0.26 }, { t: 2.5, sfx: "whoosh", vol: 0.16, max: 0.5 }, { t: 2.8, sfx: "click", vol: 0.24 }, { t: 3.5, sfx: "pop", vol: 0.26 }],
});

// ================= s03 · la vidriera de la izquierda (4.72) =================
// la fachada del Trencito, grande (escala 1.55), en gris; las cosas buenas en crema con tilde
const S3 = 1.4, B3 = 1600;
escena("s03-vidriera", {
  css: `
    P .cartel { position: absolute; left: 528px; top: 1100px; width: 420px; padding: 26px 26px 30px; border-radius: 26px; background: ${CR}; border: 7px solid ${RED}; text-align: center; opacity: 0; box-shadow: 14px 14px 0 rgba(0,0,0,0.35); }
    P .cartel b { display: block; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${RED}; margin-bottom: 14px; }
    P .cartel span { display: block; font: 800 50px/1.08 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .hilo { position: absolute; left: 0; top: 0; }`,
  html: `
      <div class="lado izq">TRENCITO · SIN TIENDA ONLINE</div>
      <svg class="full fac" viewBox="0 0 1080 1920" aria-hidden="true">
        <g transform="translate(${540 - 270 * S3} ${B3 - 1560 * S3}) scale(${S3})">${fachada("fz", 270, 1560, "TRENCITO", false)}</g>
      </svg>
      <svg class="full hilo" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="hl" d="M640 1104 L738 1030 L836 1104" stroke="${RED}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="cartel"><b>AVISO</b><span>Se compra solo en el local</span></div>
      ${pill(1, 290, 1690, `${tick(22, CR)}Linda vidriera`)}
      ${pill(2, 790, 1690, `${tick(22, CR)}Buena atención`)}`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(q(".fac"), { opacity: 0, scale: 0.85, transformOrigin: "540px 1500px" }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.2);
      // "linda vidriera": se iluminan los juguetes
      tl.fromTo(q(".fac .jug"), { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 1.0);
      pop(".n1", 1.3);
      // "buena atención"
      pop(".n2", 2.25);
      // push-in a la puerta
      tl.to(q(".lado"), { opacity: 0, duration: 0.2 }, 2.6);
      tl.to(q(".fac"), { scale: 1.08, transformOrigin: "760px 1300px", duration: 1.2, ease: "power2.inOut" }, 2.6);
      // "Pero se compra solo en el local": el cartel cuelga de la puerta
      dibujar(".hl", 3.2, 0.2);
      tl.fromTo(q(".cartel"), { opacity: 0, y: -60, rotation: -8, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(2)" }, 3.3);
      tl.fromTo(q(".cartel"), { rotation: 0 }, { rotation: 3, transformOrigin: "50% 0%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 3.8);
      tl.to(qa(".n1, .n2"), { opacity: 0.4, duration: 0.3 }, 3.5);
      salida(4.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 1.3, sfx: "ping", vol: 0.22 }, { t: 2.25, sfx: "ping", vol: 0.22 }, { t: 3.3, sfx: "click", vol: 0.28 }, { t: 3.75, sfx: "glitch-1", vol: 0.16, max: 0.35 }],
});

// ================= s04 · Salto queda lejos (1.52) =================
const M4 = MAPA(170, 590, 160);
const [mvx, mvy] = M4.p(CAPITALES.Montevideo), [sax, say] = M4.p(CAPITALES.Salto);
escena("s04-lejos", {
  css: `
    P .mapa { position: absolute; left: 0; top: 0; }`,
  html: `
      <svg class="full mapa" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="uy" d="${M4.d}" fill="${MID}" stroke="${CR}" stroke-width="${ST}" stroke-linejoin="round"/>
        <path class="ruta" d="M${mvx} ${mvy} Q${(mvx + sax) / 2 + 120} ${(mvy + say) / 2} ${sax} ${say}" stroke="${RED}" stroke-width="8" stroke-dasharray="4 22" stroke-linecap="round" fill="none"/>
        <g class="pm"><circle cx="${mvx}" cy="${mvy}" r="26" fill="${GRIS}" stroke="${DK}" stroke-width="6"/><text class="mapa-n" x="${mvx + 40}" y="${mvy + 70}" fill="${GRIS}" text-anchor="middle">TRENCITO</text></g>
        <g class="ps"><circle cx="${sax}" cy="${say}" r="30" fill="${CR}" stroke="${DK}" stroke-width="6"/><text class="mapa-n" x="${sax + 50}" y="${say - 52}" fill="${CR}">SALTO</text></g>
      </svg>
      ${pill(1, 640, 1080, "Lejos", "rl big")}`,
  js: `
      tl.fromTo(q(".mapa"), { opacity: 0, scale: 1.12, transformOrigin: "540px 1000px" }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }, 0);
      pop(".pm", 0.1, 0.3, 0.3);
      pop(".ps", 0.15, 0.3, 0.3);
      // "queda lejos": la ruta punteada roja y la pill
      tl.fromTo(q(".ruta"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.35);
      tl.fromTo(q(".ruta"), { strokeDashoffset: 0 }, { strokeDashoffset: -104, duration: 1.1, ease: "none" }, 0.35);
      pop(".n1", 0.6);
      temblor(".n1", 0.95);
      salida(1.38);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.6, sfx: "glitch-1", vol: 0.2, max: 0.4 }],
});

// ================= s05 · lo encuentra en el celular y paga (3.59) =================
const TM = { x: 200, y: 580, w: 680, h: 1100 };
const PAN_TIENDA = `
  <div class="st-head"><div class="st-av">CA</div><div class="st-nom">La Calesita</div><div class="st-sub">tienda online</div>
    <svg class="st-cart" width="64" height="58" viewBox="0 0 64 58"><path d="M4 6 H14 L22 38 H52 L58 16 H18" fill="none" stroke="${CR}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="50" r="5" fill="${CR}"/><circle cx="48" cy="50" r="5" fill="${CR}"/></svg><i class="st-badge">1</i></div>
  <div class="st-busca"><svg width="34" height="34" viewBox="0 0 34 34"><circle cx="14" cy="14" r="10" fill="none" stroke="${GRIS}" stroke-width="5"/><path d="M22 22 L31 31" stroke="${GRIS}" stroke-width="5" stroke-linecap="round"/></svg><span class="tx">camión de bomberos</span></div>
  <div class="st-card" data-layout-allow-overlap>
    <div class="st-img">${camion(470)}</div>
    <div class="st-tit">Camión de bomberos</div>
    <div class="st-env">${tick(18)}Envío a todo el país</div>
    <div class="st-btn">Comprar</div>
  </div>
  <div class="st-sheet" data-layout-allow-overlap>
    <div class="sh-t">PAGAR CON</div>
    <div class="sh-mp">Mercado Pago</div>
    <div class="sh-ok">${tick(26)}Pago aprobado</div>
  </div>`;
escena("s05-celular", {
  css: `
    P .st-head { position: absolute; left: 0; top: 0; width: 652px; height: 176px; background: ${MID}; }
    P .st-av { position: absolute; left: 34px; top: 74px; width: 80px; height: 80px; border-radius: 50%; background: ${G}; font: 800 32px/80px "Lexend", sans-serif; text-align: center; color: ${DK}; }
    P .st-nom { position: absolute; left: 134px; top: 80px; font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; }
    P .st-sub { position: absolute; left: 136px; top: 128px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${G}; }
    P .st-cart { position: absolute; right: 44px; top: 86px; }
    P .st-badge { position: absolute; right: 30px; top: 70px; width: 38px; height: 38px; border-radius: 50%; background: ${G}; font: 800 28px/38px "Lexend", sans-serif; font-style: normal; text-align: center; color: ${DK}; opacity: 0; }
    P .st-busca { position: absolute; left: 30px; top: 204px; width: 592px; height: 84px; border-radius: 42px; background: ${DK2}; border: 5px solid ${GRIS2}; display: flex; align-items: center; gap: 18px; padding-left: 28px; box-sizing: border-box; }
    P .st-busca .tx { font: 600 34px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; overflow: hidden; display: inline-block; }
    P .st-card { position: absolute; left: 30px; top: 318px; width: 592px; height: 720px; border-radius: 36px; background: ${DK2}; border: 6px solid ${CR}; box-sizing: border-box; overflow: hidden; }
    P .st-img { position: absolute; left: 0; top: 0; right: 0; height: 360px; background: ${MID}; display: flex; align-items: center; justify-content: center; }
    P .st-tit { position: absolute; left: 34px; top: 392px; font: 800 48px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; }
    P .st-env { position: absolute; left: 34px; top: 468px; display: flex; align-items: center; gap: 14px; font: 600 34px/1 "Lexend", sans-serif; color: ${G}; }
    P .st-btn { position: absolute; left: 34px; right: 34px; top: 560px; height: 104px; border-radius: 52px; background: ${G}; font: 800 46px/104px "Lexend", sans-serif; text-align: center; color: ${DK}; }
    P .st-sheet { position: absolute; left: 0; right: 0; bottom: 0; height: 520px; border-radius: 44px 44px 0 0; background: ${CR}; padding: 50px 40px; box-sizing: border-box; }
    P .sh-t { font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${MID2}; }
    P .sh-mp { margin-top: 26px; height: 120px; border-radius: 30px; background: ${DK}; font: 800 54px/120px "Lexend", sans-serif; text-align: center; color: #fff; letter-spacing: -0.01em; }
    P .sh-ok { margin-top: 40px; display: flex; align-items: center; justify-content: center; gap: 18px; font: 800 52px/1 "Lexend", sans-serif; color: ${DK}; opacity: 0; }
    P .toque { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 8px solid ${G}; opacity: 0; }`,
  html: `
      <div class="lado der">CALESITA · CON TIENDA ONLINE</div>
      ${tel("tm", TM.x, TM.y, TM.w, TM.h, PAN_TIENDA)}
      <div class="toque t1" style="left:${TM.x + 14 + 30 + 296 - 60}px;top:${TM.y + 14 + 318 + 612 - 60}px"></div>
      <div class="toque t2" style="left:${TM.x + 14 + 40 + 286 - 60}px;top:${TM.y + 14 + TM.h - 28 - 520 + 50 + 30 + 26 + 60 - 60}px"></div>`,
  js: `
      const T = q(".tm");
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(T, { y: 1150, rotation: 4 }, { y: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.2);
      // escribe la búsqueda
      tl.fromTo(q(".st-busca .tx"), { width: 0 }, { width: 430, duration: 0.6, ease: "steps(18)" }, 0.45);
      // "lo encuentra": aparece la tarjeta del producto
      tl.fromTo(q(".st-card"), { opacity: 0, y: 80, scale: 0.9, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.95);
      tl.fromTo(q(".st-img svg"), { scale: 0.6, transformOrigin: "50% 60%" }, { scale: 1, duration: 0.45, ease: "back.out(2)" }, 1.05);
      // "celular": toca Comprar
      tl.fromTo(q(".t1"), { opacity: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.6, duration: 0.45, ease: "power2.out", immediateRender: false }, 1.75);
      latido(".st-btn", 1.75, 0.94);
      pop(".st-badge", 1.85, 0.25, 0.2);
      // "Paga con Mercado Pago": sube la hoja de pago
      tl.fromTo(q(".st-sheet"), { y: 560 }, { y: 0, duration: 0.4, ease: "power3.out" }, 2.1);
      tl.fromTo(q(".t2"), { opacity: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.6, duration: 0.45, ease: "power2.out", immediateRender: false }, 2.75);
      latido(".sh-mp", 2.75, 0.95);
      tl.fromTo(q(".sh-ok"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.2)" }, 3.0);
      tl.fromTo(T, { scale: 1 }, { scale: 1.035, transformOrigin: "50% 60%", duration: 3.0, ease: "sine.inOut" }, 0.5);
      salida(3.42);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.45, sfx: "typing", vol: 0.16, max: 0.6 }, { t: 0.95, sfx: "pop", vol: 0.24 }, { t: 1.75, sfx: "click", vol: 0.28 }, { t: 2.1, sfx: "whoosh-short", vol: 0.16 }, { t: 2.75, sfx: "click", vol: 0.28 }, { t: 3.0, sfx: "chime", vol: 0.3 }],
});

// ================= s06 · sale por DAC y llega a Salto (3.23) =================
const M6 = MAPA(170, 590, 160);
const [m6x, m6y] = M6.p(CAPITALES.Montevideo), [s6x, s6y] = M6.p(CAPITALES.Salto);
const cq = [(m6x + s6x) / 2 + 160, (m6y + s6y) / 2 + 40];
const quad = (t) => [r2((1 - t) ** 2 * m6x + 2 * (1 - t) * t * cq[0] + t * t * s6x), r2((1 - t) ** 2 * m6y + 2 * (1 - t) * t * cq[1] + t * t * s6y)];
const PASOS = [0.2, 0.4, 0.6, 0.8, 1].map(quad);
const CJ = 104; // caja chica sobre el mapa
escena("s06-envio", {
  css: `
    P .mapa { position: absolute; left: 0; top: 0; }
    P .cajaw { position: absolute; left: ${m6x - CJ / 2}px; top: ${m6y - CJ * 0.8}px; width: ${CJ}px; height: ${CJ * 0.87}px; }
    P .cajag { position: absolute; left: 240px; top: 760px; width: 600px; height: 520px; }
    P .etq { position: absolute; left: 0; right: 0; top: 1440px; text-align: center; font: 800 76px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; opacity: 0; }
    P .etq span { color: ${G}; }`,
  html: `
      <svg class="full mapa" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="uy" d="${M6.d}" fill="${MID}" stroke="${CR}" stroke-width="${ST}" stroke-linejoin="round"/>
        <path class="ruta" d="M${m6x} ${m6y} Q${cq[0]} ${cq[1]} ${s6x} ${s6y}" stroke="${G}" stroke-width="9" stroke-linecap="round" fill="none"/>
        <g class="pm"><circle cx="${m6x}" cy="${m6y}" r="26" fill="${G}" stroke="${DK}" stroke-width="6"/><text class="mapa-n" x="${m6x + 40}" y="${m6y + 70}" fill="${G}" text-anchor="middle">CALESITA</text></g>
        <g class="ps"><circle class="psc" cx="${s6x}" cy="${s6y}" r="30" fill="${CR}" stroke="${DK}" stroke-width="6"/><text class="mapa-n" x="${s6x + 50}" y="${s6y - 52}" fill="${CR}">SALTO</text></g>
        <circle class="anillo" cx="${s6x}" cy="${s6y}" r="34" fill="none" stroke="${G}" stroke-width="8" opacity="0"/>
      </svg>
      <div class="cajaw">${CAJA()}</div>
      <div class="cajag">${CAJA()}</div>
      <div class="etq" data-layout-allow-overlap>Envío por <span>DAC</span></div>
      ${pill(1, 640, 1500, `${tick(24)}Llegó a Salto`, "g big")}`,
  js: `
      gsap.set(q(".cajaw"), { opacity: 0 });
      tl.fromTo(q(".mapa"), { opacity: 0.0 }, { opacity: 0.35, duration: 0.3 }, 0);
      // "Sale por DAC": la caja grande al frente
      tl.fromTo(q(".cajag"), { opacity: 0, scale: 0.5, y: 120, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, 0);
      tl.fromTo(q(".etq"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.3);
      // la caja se achica y se va a Montevideo
      tl.to(q(".etq"), { opacity: 0, duration: 0.2 }, 0.85);
      tl.to(q(".cajag"), { scale: ${CJ / 600}, x: ${m6x - 540}, y: ${m6y - CJ * 0.8 - 760 - (520 - CJ * 0.87) / 2 + 0}, transformOrigin: "50% 50%", duration: 0.35, ease: "power3.in" }, 0.8);
      tl.to(q(".mapa"), { opacity: 1, duration: 0.3 }, 0.85);
      tl.set(q(".cajag"), { opacity: 0 }, 1.15);
      tl.set(q(".cajaw"), { opacity: 1 }, 1.15);
      // "Días después": la ruta verde y la caja viajando
      dibujar(".ruta", 1.15, 0.8);
      const P = ${JSON.stringify(PASOS)};
      P.forEach(([x, y], i) => tl.to(q(".cajaw"), { x: x - ${m6x}, y: y - ${m6y}, duration: 0.16, ease: "none" }, 1.15 + i * 0.16));
      // "llega a Salto"
      tl.to(q(".psc"), { fill: "${G}", duration: 0.15 }, 2.0);
      tl.fromTo(q(".anillo"), { opacity: 0.9, scale: 1, svgOrigin: "${s6x} ${s6y}" }, { opacity: 0, scale: 2.8, duration: 0.6, ease: "power2.out" }, 2.0);
      tl.fromTo(q(".cajaw"), { scale: 1 }, { scale: 1.3, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 1.98);
      pop(".n1", 2.1);
      salida(3.08);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.24 }, { t: 0.8, sfx: "whoosh-short", vol: 0.18 }, { t: 1.15, sfx: "whoosh", vol: 0.16, max: 0.8 }, { t: 2.0, sfx: "chime", vol: 0.3 }],
});

// ================= s07 · las dos son buenas (1.64) =================
const B7 = 1440;
escena("s07-iguales", {
  css: `
    P .igual { position: absolute; left: 470px; top: 1000px; width: 140px; height: 140px; border-radius: 50%; background: ${G}; font: 900 110px/128px "Lexend", sans-serif; text-align: center; color: ${DK}; opacity: 0; }
    P .ok { position: absolute; width: 540px; display: flex; justify-content: center; opacity: 0; }
    P .ok span { display: inline-flex; align-items: center; gap: 14px; font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ok.a { left: 0; } P .ok.b { left: 540px; }
    P .ok.m { top: 1490px; } P .ok.p { top: 1570px; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(700, B7)}${PISO(B7)}
        ${fachada("fzL", 270, B7, "TRENCITO", true)}
        ${fachada("fzR", 810, B7, "CALESITA", true)}
      </svg>
      <div class="igual">=</div>
      <div class="ok a m"><span>${tick(22)}Juguetes</span></div><div class="ok b m"><span>${tick(22)}Juguetes</span></div>
      <div class="ok a p"><span>${tick(22)}Atención</span></div><div class="ok b p"><span>${tick(22)}Atención</span></div>`,
  js: `
      tl.fromTo(q(".fzL"), { x: -560 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { x: 560 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.04);
      dibujar(".div", 0.25, 0.35);
      tl.fromTo(q(".igual"), { opacity: 0, scale: 0.3, rotation: -90, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.32, ease: "back.out(2)" }, 0.35);
      // "buenas jugueterías"
      tl.fromTo(qa(".jug"), { y: 0 }, { y: -14, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.5);
      pop(".ok.m", 0.5, 0.28);
      pop(".ok.p", 0.8, 0.28);
      salida(1.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.35, sfx: "impact-bass-1", vol: 0.22, max: 0.6 }, { t: 0.5, sfx: "ping", vol: 0.22 }, { t: 0.8, sfx: "ping", vol: 0.22 }],
});

// ================= s08 · abre en todo el país (2.22) =================
const M8 = MAPA(170, 590, 160);
const [o8x, o8y] = M8.p(CAPITALES.Montevideo);
const OTRAS = Object.entries(CAPITALES).filter(([n]) => n !== "Montevideo").map(([n, c]) => [n, ...M8.p(c)]);
// orden por distancia, para que la onda salga de Montevideo
OTRAS.sort((a, b) => Math.hypot(a[1] - o8x, a[2] - o8y) - Math.hypot(b[1] - o8x, b[2] - o8y));
escena("s08-todo-el-pais", {
  css: `
    P .mapa { position: absolute; left: 0; top: 0; }
    P .abierto { position: absolute; left: 540px; top: 1530px; }`,
  html: `
      <svg class="full mapa" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="uy" d="${M8.d}" fill="${MID}" stroke="${CR}" stroke-width="${ST}" stroke-linejoin="round"/>
        <path class="uyv" d="${M8.d}" fill="${G}" opacity="0"/>
        ${OTRAS.map(([n, x, y], i) => `<path class="ray r${i}" d="M${o8x} ${o8y} L${x} ${y}" stroke="${G}" stroke-width="6" stroke-linecap="round" opacity="0.9"/>`).join("")}
        ${OTRAS.map(([n, x, y], i) => `<circle class="cap c${i}" cx="${x}" cy="${y}" r="17" fill="${G}" stroke="${DK}" stroke-width="5"/>`).join("")}
        <circle class="anillo" cx="${o8x}" cy="${o8y}" r="40" fill="none" stroke="${G}" stroke-width="8" opacity="0"/>
        <g class="tienda"><circle cx="${o8x}" cy="${o8y}" r="34" fill="${G}" stroke="${DK}" stroke-width="7"/><path d="M${o8x - 15} ${o8y - 4} H${o8x + 15} L${o8x + 11} ${o8y + 14} H${o8x - 11} Z" fill="${DK}"/></g>
      </svg>
      ${pill(1, 540, 1530, "Abierta en todo el país", "lleno big")}`,
  js: `
      tl.fromTo(q(".mapa"), { opacity: 0, scale: 0.92, transformOrigin: "540px 1000px" }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }, 0);
      pop(".tienda", 0.15, 0.3, 0.3);
      // "abre": onda desde la tienda
      tl.fromTo(q(".anillo"), { opacity: 0.9, scale: 1, svgOrigin: "${o8x} ${o8y}" }, { opacity: 0, scale: 4, duration: 0.7, ease: "power2.out" }, 0.5);
      // "en todo el país": rayos a cada capital
      ${OTRAS.map((_, i) => `dibujar(".r${i}", ${r2(0.55 + i * 0.045)}, 0.28);`).join("\n      ")}
      ${OTRAS.map((_, i) => `pop(".c${i}", ${r2(0.75 + i * 0.045)}, 0.24, 0.2);`).join("\n      ")}
      tl.to(q(".uyv"), { opacity: 0.18, duration: 0.4 }, 1.2);
      pop(".n1", 1.05);
      tl.fromTo(q(".mapa"), { scale: 1 }, { scale: 1.04, transformOrigin: "540px 1000px", duration: 1.6, ease: "sine.inOut", immediateRender: false }, 0.4);
      salida(2.08);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.5, sfx: "whoosh", vol: 0.16, max: 0.6 }, { t: 0.75, sfx: "sparkle", vol: 0.24, max: 0.9 }, { t: 1.05, sfx: "pop", vol: 0.28 }],
});

// ================= s09 · la tienda la armamos nosotros (2.50) =================
const PRODS = [["camion", "Camión"], ["osito", "Osito"], ["pelota", "Pelota"]];
const mini = (k) => k === "camion" ? camion(220) :
  `<svg width="160" height="150" viewBox="0 0 160 150" aria-hidden="true">${k === "osito" ? osito(80, 88, 0.95, CR, DK2) : pelota(80, 78, 58, G, CR)}</svg>`;
const LAPTOP = (cls) => `
  <div class="lap ${cls}">
    <div class="lap-s"><div class="lap-p">
      <div class="lp-h">TU JUGUETERÍA · TIENDA ONLINE</div>
      ${PRODS.map(([k, n], i) => `<div class="lp-c" style="left:${30 + i * 280}px"><div class="lp-i">${mini(k)}</div><div class="lp-n">${n}</div><div class="lp-b">Comprar</div></div>`).join("")}
      <div class="lp-pie"><span>${tick(16)}Mercado Pago</span><span>${tick(16)}DAC · Correo</span></div>
    </div></div>
    <div class="lap-b"></div>
  </div>`;
const CSS_LAP = `
    P .lap { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .lap-s { position: absolute; left: 70px; top: 640px; width: 940px; height: 640px; border-radius: 34px; background: ${CR}; }
    P .lap-p { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; border-radius: 20px; background: ${DK}; overflow: hidden; }
    P .lp-h { position: absolute; left: 0; top: 0; right: 0; height: 96px; background: ${G}; padding-left: 36px; font: 800 40px/96px "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.01em; }
    P .lp-c { position: absolute; top: 126px; width: 254px; height: 330px; border-radius: 24px; background: ${DK2}; border: 5px solid ${GRIS2}; box-sizing: border-box; }
    P .lp-i { position: absolute; left: 0; right: 0; top: 0; height: 170px; background: ${MID}; border-radius: 19px 19px 0 0; display: flex; align-items: center; justify-content: center; }
    P .lp-n { position: absolute; left: 22px; top: 190px; font: 700 36px/1 "Lexend", sans-serif; color: #fff; }
    P .lp-b { position: absolute; left: 20px; right: 20px; bottom: 20px; height: 64px; border-radius: 32px; background: ${G}; font: 800 30px/64px "Lexend", sans-serif; text-align: center; color: ${DK}; }
    P .lp-pie { position: absolute; left: 30px; right: 30px; top: 486px; display: flex; gap: 22px; }
    P .lp-pie span { display: inline-flex; align-items: center; gap: 12px; padding: 14px 24px; border: 4px solid ${G}; border-radius: 18px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: ${G}; }
    P .lap-b { position: absolute; left: 10px; top: 1280px; width: 1060px; height: 54px; border-radius: 0 0 30px 30px; background: ${CR}; }
    P .lap-b::after { content: ""; position: absolute; left: 450px; top: 0; width: 160px; height: 14px; border-radius: 0 0 10px 10px; background: #b9b7a8; }`;
escena("s09-tienda", {
  css: CSS_LAP,
  html: `
      ${LAPTOP("l9")}
      ${pill(1, 540, 1470, "La armamos nosotros", "lleno big")}`,
  js: `
      gsap.set(qa(".lp-c, .lp-pie span"), { opacity: 0 });
      tl.fromTo(qa(".lap-s, .lap-b"), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", stagger: 0.05 }, 0);
      tl.fromTo(q(".lp-h"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.32, ease: "power3.out" }, 0.22);
      qa(".lp-c").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 50, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 0.45 + i * 0.12));
      qa(".lp-pie span").forEach((c, i) => tl.fromTo(c, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }, 0.85 + i * 0.12));
      // "la armamos nosotros"
      pop(".n1", 1.1);
      latido(".lap-s", 1.1, 1.02);
      tl.fromTo(q(".l9"), { scale: 1 }, { scale: 1.03, transformOrigin: "540px 960px", duration: 2.2, ease: "sine.inOut", immediateRender: false }, 0.2);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.45, sfx: "pop", vol: 0.22 }, { t: 0.85, sfx: "click-soft", vol: 0.22 }, { t: 1.1, sfx: "pop", vol: 0.28 }],
});

// ================= s10 · CTA =================
escena("s10-cta", {
  css: CSS_LAP + `
    P .vc { position: absolute; left: 79px; top: 590px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 606px; width: 922px; height: 460px; border-radius: 70px; background: ${DK}; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${MID}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.8); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1120px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1262px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t3 { top: 1450px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="capa lapg">${LAPTOP("l10")}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${persona(80, CR, MID2)}<div class="lbl">TU JUGUETERÍA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${DK}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${DK}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><span class="selbox sb" style="left:0;top:0;right:0;bottom:0">${esquinas}</span><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const LG = q(".lapg");
      // la laptop se achica y se vuelve la videollamada
      tl.to(LG, { scale: 0.8, y: -120, transformOrigin: "540px 900px", duration: 0.35, ease: "power3.in" }, 0);
      tl.to(LG, { opacity: 0, duration: 0.12 }, 0.3);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.3);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.4);
      // Agendá una videollamada gratis en scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.38);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.62);
      caja(".sb", 0.75);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 1.55);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 2.2);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.2);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: 0.4, sfx: "pop", vol: 0.22 }, { t: 0.75, sfx: "click-soft", vol: 0.28 }, { t: 1.55, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
