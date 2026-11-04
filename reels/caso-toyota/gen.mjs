// Generador de escenas de reels/caso-toyota (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" (copiado de caso-mcdonalds y por-que-la-tarjeta): un objeto grande relleno
// por escena, que se transforma: caja de piezas con su tarjeta (x3) → push-in a la tarjeta KANBAN
// → la caja se vacía, la tarjeta viaja al proveedor y vuelve una caja llena → grilla de cajas
// (contar todo, tachado) → la tarjeta de la caja usada → estante de tu local → el hueco vacío →
// panel de stock que baja del mínimo → pedido al proveedor armado solo → videollamada.
// Toyota se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: cajas, piezas y
// tarjetas genéricas con los colores de Scalerics. Fondo navy claro #16243d.
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
const w = (i) => r2(Math.max(0, pal[i].start - T0));
const desde = (id) => { T0 = START[id]; };

const BG = "#16243d", DK = "#0b1220", MID = "#2b4573", MID2 = "#355489", CR = "#efeee5", CRD = "#b9b7a8", G = "#5ce611", GD = "#3fa60a", GL = "#9df26a", RED = "#c7655b";
const SOMBRA = "rgba(5,10,20,0.45)";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${DK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const tickG = (cls, cx, cy, r = 30) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 22})"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${DK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const avatarG = (cls, cx, cy, r, piel = CR, ropa = DK) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 70})"><circle cx="70" cy="70" r="70" fill="${piel}"/><circle cx="70" cy="56" r="26" fill="${ropa}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${ropa}"/></g></g>`;

// engranaje (centro cx, cy, radio r)
const gear = (cx, cy, r, fill = CR, rot = 0) => {
  let d = "";
  for (let k = 0; k < 8; k++) d += `<rect x="${r2(cx - r * 0.2)}" y="${r2(cy - r * 1.28)}" width="${r2(r * 0.4)}" height="${r2(r * 0.5)}" rx="${r2(r * 0.08)}" transform="rotate(${k * 45 + rot} ${cx} ${cy})" fill="${fill}"/>`;
  return `${d}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/><circle cx="${cx}" cy="${cy}" r="${r2(r * 0.38)}" fill="${DK}"/>`;
};
// tornillo (cabeza hexagonal + vástago), parado, base en (cx, by)
const bolt = (cx, by, h, rot = 0) => `<g transform="rotate(${rot} ${cx} ${by})"><rect x="${cx - 13}" y="${by - h}" width="26" height="${h}" rx="6" fill="${CRD}"/><path d="M${cx - 13} ${by - h + 22} l26 -10 M${cx - 13} ${by - h + 44} l26 -10 M${cx - 13} ${by - h + 66} l26 -10" stroke="${MID}" stroke-width="5"/><path d="M${cx - 34} ${by - h} l10 -26 h48 l10 26 z" fill="#fff"/></g>`;

// La caja de piezas, en coordenadas de pantalla (1080x1920): frente 190..890 x 880..1300
const BX = 190, BY = 880, BW = 700, BH = 420;
const PIEZAS = `<g class="pz">
  <g class="pz1">${gear(320, 840, 70, CR, 10)}</g>
  <g class="pz2">${bolt(470, 900, 170, -12)}</g>
  <g class="pz3">${gear(600, 812, 82, "#ffffff", 0)}</g>
  <g class="pz4">${bolt(720, 900, 150, 14)}</g>
  <g class="pz5">${gear(800, 858, 52, GL, 20)}</g>
</g>`;
const CAJA = (lleno = true) => `
  <ellipse cx="${BX + BW / 2}" cy="${BY + BH + 16}" rx="${BW * 0.56}" ry="24" fill="${SOMBRA}"/>
  <path class="lip" d="M${BX + 30} ${BY - 70} H${BX + BW - 30} L${BX + BW} ${BY} H${BX} Z" fill="${DK}" stroke="${CR}" stroke-width="8" stroke-linejoin="round"/>
  ${lleno ? PIEZAS : ""}
  <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="26" fill="${MID}" stroke="${CR}" stroke-width="8"/>
  <path d="M${BX + BW - 170} ${BY + 4} H${BX + BW - 30} Q${BX + BW - 4} ${BY + 4} ${BX + BW - 4} ${BY + 30} V${BY + BH - 30} Q${BX + BW - 4} ${BY + BH - 4} ${BX + BW - 30} ${BY + BH - 4} H${BX + BW - 290} Z" fill="rgba(5,10,20,0.28)"/>
  <rect x="${BX + 40}" y="${BY + 30}" width="${BW - 80}" height="22" rx="11" fill="${MID2}"/>
  <rect x="${BX + 360 - 175}" y="${BY + 70}" width="350" height="320" rx="20" fill="rgba(239,238,229,0.16)" stroke="${CR}" stroke-width="6"/>`;
const cajaG = (cls, lleno = true) => `<g class="${cls}" ${T0A}>${CAJA(lleno)}</g>`;

// La tarjeta kanban (centro en 0,0; 300 x 380) dibujada en (cx, cy) con escala s
const CARD_IN = `
  <rect x="-140" y="-178" width="300" height="380" rx="24" fill="${SOMBRA}"/>
  <rect x="-150" y="-190" width="300" height="380" rx="24" fill="${CR}"/>
  <path d="M-150 -98 V-166 Q-150 -190 -126 -190 H126 Q150 -190 150 -166 V-98 Z" fill="${G}"/>
  <text x="0" y="-130" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="40" letter-spacing="6" fill="${DK}">KANBAN</text>
  <text x="-118" y="-48" font-family="IBM Plex Mono" font-weight="500" font-size="28" letter-spacing="3" fill="rgba(11,18,32,0.6)">PIEZA</text>
  <text x="-118" y="6" font-family="Lexend" font-weight="800" font-size="54" fill="${DK}">A-12</text>
  <rect x="-118" y="26" width="236" height="6" rx="3" fill="rgba(11,18,32,0.18)"/>
  <text x="-118" y="76" font-family="IBM Plex Mono" font-weight="500" font-size="28" letter-spacing="3" fill="rgba(11,18,32,0.6)">CANTIDAD</text>
  <text x="-118" y="134" font-family="Lexend" font-weight="800" font-size="54" fill="${DK}">50</text>`;
const CARD_CX = 540, CARD_CY = 1110, CARD_S = 0.8;
const cardG = (cls, cx = CARD_CX, cy = CARD_CY, s = CARD_S, rot = -3) => `<g class="${cls}" ${T0A}><g class="cw"><g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">${CARD_IN}</g></g></g>`;

// Para mover un grupo escalado con svgOrigin O: offset (x, y) para que el punto P quede en T
const off = (P, O, s, T) => [r2(T[0] - (O[0] + s * (P[0] - O[0]))), r2(T[1] - (O[1] + s * (P[1] - O[1])))];
const OB = [540, 1300]; // centro del piso de la caja
// Todo lo que se mueve y escala usa svgOrigin "0 0": el punto P del dibujo queda en T con escala s
// (se escribe el atributo transform con el plugin attr: no se mezcla con los transforms de GSAP)
const pl = (P, s, T) => JSON.stringify({ attr: { transform: `translate(${r2(T[0] - s * P[0])} ${r2(T[1] - s * P[1])}) scale(${s})` } });
const T0A = `transform="translate(0 0) scale(1)"`;
const CC = [540, 1110]; // centro de la tarjeta

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${DK}; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${DK}; font-weight: 700; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .rot { position: absolute; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .rot.g { color: ${G}; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
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
    P .tit { position: absolute; left: 0; right: 0; top: 92px; text-align: center; font: 800 100px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 150px; line-height: 1.0; }
    P .tit .v { color: ${G}; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${cajaG("bx1")}${cardG("cd1")}
        ${cajaG("bx2")}${cardG("cd2")}
        ${cajaG("bx0")}${cardG("cd0")}
      </svg>
      <div class="tit"><div>¿Por qué Toyota</div><div>pone una</div><div class="gr v">tarjetita</div><div>en cada caja?</div></div>`,
  js: `
      const O = "540 1300";
      // cuadro 0: el gancho entero y la caja ya grande
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      qa(".bx0 .pz > g").forEach((p, i) => tl.to(p, { y: -16, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.3 + i * 0.08));
      // "tarjetita": la tarjeta salta
      tl.fromTo(q(".cd0 .cw"), { scale: 1 }, { scale: 1.12, rotation: 4, svgOrigin: "540 1110", duration: 0.2, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${w(5)});
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, ${w(5)});
      // "cada caja": la caja se achica y aparecen dos iguales a los costados
      const CH = ${pl(OB, 0.44, OB)};
      gsap.set(qa(".bx1, .cd1, .bx2, .cd2"), { ...CH, opacity: 0 });
      tl.fromTo(qa(".bx0, .cd0"), ${pl(OB, 1, OB)}, { ...CH, duration: 0.4, ease: "power3.inOut", immediateRender: false }, ${r2(w(7) - 0.2)});
      tl.to(qa(".bx1, .cd1"), { ...${pl(OB, 0.44, [200, 1300])}, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, ${r2(w(8) - 0.15)});
      tl.to(qa(".bx2, .cd2"), { ...${pl(OB, 0.44, [880, 1300])}, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, ${r2(w(8) - 0.1)});
      // vuelve a ser una sola, grande (match con s02)
      const V = ${r2(D("s01-gancho") - 0.5)};
      tl.to(qa(".bx1, .cd1, .bx2, .cd2"), { ...CH, opacity: 0, duration: 0.35, ease: "power2.in" }, V);
      tl.to(qa(".bx0, .cd0"), { ...${pl(OB, 1, OB)}, duration: 0.45, ease: "power3.inOut" }, V);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, V);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.2 }, { t: w(5), sfx: "click-soft", vol: 0.25 }, { t: r2(w(8) - 0.15), sfx: "whoosh-short", vol: 0.22 }],
});

// ================= s02 · esa tarjeta se llama kanban =================
desde("s02-kanban");
const ZS = 2.1; // push-in a la tarjeta: queda centrada en (540, 990)
const ZY = r2(990 - (1300 + ZS * (CARD_CY - 1300)));
const cy2 = (yc) => r2(990 + ZS * CARD_S * yc); // y de pantalla de un punto de la tarjeta
const cx2 = (xc) => r2(540 + ZS * CARD_S * xc);
escena("s02-kanban", {
  css: `
    P .ln { stroke: ${G}; stroke-width: 6; stroke-linecap: round; fill: none; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="zoom" ${T0A}>${cajaG("bx0")}${cardG("cd0")}</g>
        <path class="ln l1" d="M${cx2(110)} ${cy2(-14)} H${cx2(186)}"/>
        <path class="ln l2" d="M${cx2(-158)} ${cy2(116)} H${cx2(-196)}"/>
        <circle class="dt d1" cx="${cx2(110)}" cy="${cy2(-14)}" r="12" fill="${G}"/>
        <circle class="dt d2" cx="${cx2(-158)}" cy="${cy2(116)}" r="12" fill="${G}"/>
      </svg>
      ${selbox("sb", cx2(-150) - 8, cy2(-190) - 8, r2(300 * ZS * CARD_S) + 16, r2(92 * ZS * CARD_S) + 16)}
      <div class="rot g r1" style="left:${cx2(186) + 14}px;top:${cy2(-14) - 16}px">QUÉ PIEZA</div>
      <div class="rot g r2" style="right:${1080 - cx2(-196) + 14}px;top:${cy2(116) - 16}px">CUÁNTAS</div>`,
  js: `
      // push-in: la caja crece hasta que la tarjeta llena la pantalla
      tl.fromTo(q(".zoom"), ${pl(CC, 1, CC)}, { ...${pl(CC, ZS, [540, 990])}, duration: 0.6, ease: "power3.inOut" }, 0.05);
      tl.to(q(".cd0"), { rotation: 3, svgOrigin: "${CARD_CX} ${CARD_CY}", duration: 0.6, ease: "power3.inOut" }, 0.05);
      tl.to(qa(".bx0 .pz, .bx0 .lip"), { opacity: 0, duration: 0.3 }, 0.1);
      // "llama": rótulos con línea guía
      dibujar(".l1", ${r2(w(13))}, 0.22); pop(".d1", ${r2(w(13))}, 0.2, 0.3);
      tl.fromTo(q(".r1"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.22 }, ${r2(w(13) + 0.15)});
      dibujar(".l2", ${r2(w(14))}, 0.22); pop(".d2", ${r2(w(14))}, 0.2, 0.3);
      tl.fromTo(q(".r2"), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.22 }, ${r2(w(14) + 0.15)});
      // "kanban": recuadro de selección sobre el encabezado
      caja(".sb", ${r2(w(15) - 0.05)});
      fuera(".sb, .rot, .ln, .dt", ${r2(D("s02-kanban") - 0.2)}, 0.18);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(13), sfx: "click-soft", vol: 0.22 }, { t: w(14), sfx: "click-soft", vol: 0.22 }, { t: w(15), sfx: "ping", vol: 0.22 }],
});

// ================= s03 · se vacía, la tarjeta vuelve y pide reponer justo eso =================
desde("s03-vuelve");
const S3 = 0.8, X3 = -165; // la caja chica, a la izquierda
const CARD3 = [CARD_CX + X3, r2(1300 + S3 * (CARD_CY - 1300))]; // centro de la tarjeta en la caja
const PROV = [850, 900]; // puerta del proveedor
const [cpx, cpy] = off([CARD_CX, CARD_CY], OB, 0.42, [PROV[0], PROV[1] - 40]);
const PROVEEDOR = `<g class="prov">
  <ellipse cx="850" cy="1004" rx="190" ry="18" fill="${SOMBRA}"/>
  <path d="M676 760 L850 640 L1024 760 Z" fill="${G}" stroke="${CR}" stroke-width="8" stroke-linejoin="round"/>
  <rect x="696" y="760" width="308" height="240" fill="${DK}" stroke="${CR}" stroke-width="8"/>
  <rect x="790" y="852" width="120" height="148" rx="8" fill="${MID}" stroke="${CR}" stroke-width="7"/>
  <path d="M790 890 H910 M790 930 H910 M790 970 H910" stroke="${CR}" stroke-width="6"/>
  <text x="850" y="1060" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="34" letter-spacing="4" fill="${CR}">PROVEEDOR</text>
</g>`;
escena("s03-vuelve", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${PROVEEDOR}
        <path class="ruta" d="M${CARD3[0] + 60} ${CARD3[1] - 200} C 420 640, 640 620, ${PROV[0] - 40} ${PROV[1] - 90}" fill="none" stroke="${CR}" stroke-width="7" stroke-dasharray="4 22" stroke-linecap="round" opacity="0.8"/>
        ${cajaG("bxn")}
        ${cajaG("bx0")}
        ${cardG("cd0", CARD_CX, CARD_CY, CARD_S, 0)}
        ${tickG("ok", CARD3[0] + 120, CARD3[1] - 150, 40)}
      </svg>
      ${pill(1, CARD3[0], 1410, "Vacía", "r")}${pill(2, CARD3[0], 1410, "Justo eso", "lleno")}`,
  js: `
      const O = "540 1300";
      gsap.set(q(".prov"), { opacity: 0 });
      // de la tarjeta gigante a la caja chica a la izquierda
      const IZQ = ${pl(OB, S3, [540 + X3, 1300])};
      tl.fromTo(qa(".bx0, .cd0"), ${pl(CC, ZS, [540, 990])}, { ...IZQ, duration: 0.5, ease: "power3.inOut" }, 0);
      gsap.set(q(".bxn"), { opacity: 0 });
      tl.fromTo(q(".prov"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0.3);
      // "vacía": las piezas se van (se usaron en la línea)
      qa(".bx0 .pz > g").forEach((p, i) => tl.to(p, { y: -260, x: -60 + i * 30, opacity: 0, duration: 0.32, ease: "power2.in" }, ${r2(w(19) - 0.1)} + i * 0.07));
      pop(".n1", ${r2(w(20))});
      // "la tarjeta vuelve": viaja al proveedor
      dibujar(".ruta", ${r2(w(21))}, 0.5);
      tl.to(q(".cd0"), { ...${pl(CC, 0.42, [PROV[0], PROV[1] - 50])}, duration: 0.7, ease: "power2.inOut" }, ${r2(w(22))});
      tl.to(q(".prov"), { scale: 1.06, svgOrigin: "850 1000", duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r2(w(22) + 0.7)});
      // "pide reponer": vuelve una caja llena con la tarjeta; la vacía se va
      fuera(".n1", ${r2(w(25) - 0.1)}, 0.15);
      tl.to(q(".bx0"), { ...${pl(OB, S3, [540 + X3 - 420, 1300])}, opacity: 0, duration: 0.4, ease: "power2.in" }, ${r2(w(25))});
      tl.fromTo(q(".bxn"), { ...${pl(OB, 0.3, [850, 1000])}, opacity: 0 }, { ...IZQ, opacity: 1, duration: 0.6, ease: "power3.inOut", immediateRender: false }, ${r2(w(25) + 0.05)});
      tl.to(q(".cd0"), { ...IZQ, duration: 0.6, ease: "power3.inOut" }, ${r2(w(25) + 0.1)});
      fuera(".ruta", ${r2(w(25) + 0.2)}, 0.3);
      // "justo eso"
      pop(".ok", ${r2(w(27))}, 0.3, 0.3);
      pop(".n2", ${r2(w(27) + 0.1)});
      tl.to(q(".prov"), { opacity: 0, x: 120, duration: 0.3, ease: "power2.in" }, ${r2(D("s03-vuelve") - 0.35)});
      fuera(".n2, .ok", ${r2(D("s03-vuelve") - 0.25)}, 0.2);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(19) - 0.1), sfx: "whoosh-short", vol: 0.22 }, { t: w(20), sfx: "glitch-1", vol: 0.12, max: 0.35 }, { t: w(22), sfx: "whoosh", vol: 0.2, max: 0.7 }, { t: r2(w(25) + 0.05), sfx: "whoosh-short", vol: 0.22 }, { t: w(27), sfx: "ping", vol: 0.22 }],
});

// ================= s04 · no cuenta lo que hay: avisa lo que se usó =================
desde("s04-giro");
const S4 = 0.4;
const GRID = [[220, 1010], [540, 1010], [860, 1010], [220, 1320], [540, 1320], [860, 1320]]; // centro del piso de cada caja
const USADA = 4; // la del medio de abajo: vacía
// la tarjeta de la caja usada, en coordenadas locales de su caja, para quedar en (540, 1000) de pantalla
const GOFF = [GRID[USADA][0] - S4 * OB[0], GRID[USADA][1] - S4 * OB[1]];
const CL = [r2((540 - GOFF[0]) / S4), r2((1000 - GOFF[1]) / S4)];
escena("s04-giro", {
  css: `
    P .cnt { position: absolute; width: 96px; height: 96px; margin: -48px 0 0 -48px; border-radius: 50%; background: ${CR}; font: 800 54px/96px "Lexend", sans-serif; color: ${DK}; text-align: center; opacity: 0; }
    P .tach { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g data-layout-allow-overlap>${GRID.map((p, k) => `<g class="gb gb${k}" ${T0A}>${cajaG("b", k !== USADA)}${cardG("c", CARD_CX, CARD_CY, CARD_S, 0)}</g>`).join("")}</g>
      </svg>
      ${GRID.map(([x, y], k) => (k === USADA ? "" : `<div class="cnt c${k}" style="left:${x}px;top:${y - 230}px">${k < USADA ? k + 1 : k}</div>`)).join("")}
      ${pill(1, 540, 640, "Contar todo", "r")}
      <svg class="tach" viewBox="0 0 1080 1920" aria-hidden="true"><path class="x1" d="M330 646 L750 634" stroke="${RED}" stroke-width="14" stroke-linecap="round"/></svg>
      ${pill(2, 540, 1460, "Lo que se usó", "lleno")}`,
  js: `
      const O = "540 1300";
      const FIN = ${JSON.stringify(GRID.map((T) => JSON.parse(pl(OB, S4, T))))};
      const INI = ${JSON.stringify(GRID.map((T) => JSON.parse(pl(OB, 0.15, [T[0], T[1] - 60]))))};
      // la caja de la izquierda se vuelve una de seis
      qa(".gb").forEach((g, k) => {
        if (k === ${USADA}) tl.fromTo(g, ${pl(OB, S3, [540 + X3, 1300])}, { ...FIN[k], duration: 0.5, ease: "power3.inOut" }, 0);
        else tl.fromTo(g, { ...INI[k], opacity: 0 }, { ...FIN[k], opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, 0.15 + k * 0.06);
      });
      // "no cuenta lo que hay": contar una por una (lo que NO hace)
      pop(".n1", ${r2(w(31))});
      qa(".cnt").forEach((c, i) => pop(c, ${r2(w(32))} + i * 0.13, 0.2, 0.4));
      dibujar(".x1", ${r2(w(36))}, 0.25);
      tl.to(qa(".cnt"), { opacity: 0.25, duration: 0.2 }, ${r2(w(36))});
      // "avisa lo que se usó": la tarjeta de la caja vacía salta al frente
      fuera(".n1, .x1, .cnt", ${r2(w(37) - 0.15)}, 0.2);
      tl.to(qa(".gb:not(.gb${USADA})"), { opacity: 0.25, duration: 0.3 }, ${r2(w(37) - 0.1)});
      tl.to(q(".gb${USADA} .c"), { ...${pl(CC, r2(1.25 / S4), CL)}, duration: 0.5, ease: "back.out(1.3)" }, ${r2(w(37))});
      pop(".n2", ${r2(w(37) + 0.35)});
      salida(${r2(D("s04-giro") - 0.2)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: w(32), sfx: "click-soft", vol: 0.22 }, { t: r2(w(32) + 0.4), sfx: "click-soft", vol: 0.2 }, { t: w(36), sfx: "glitch-1", vol: 0.12, max: 0.35 }, { t: w(37), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(w(41) - 0.1), sfx: "ping", vol: 0.22 }],
});

// ================= s05 · ¿y en tu local, quién se da cuenta de que falta algo? =================
desde("s05-local");
// estante: 110..970, tablas en y 880, 1100, 1320; 4 lugares por tabla
const SH = { x: 110, w: 860, top: 640, tablas: [880, 1100, 1320] };
const SLOT = (SH.w - 44) / 4;
const slotX = (k) => SH.x + 22 + k * SLOT;
const lata = (x, by, ww, h, cuerpo = G, tapa = GL) => `<rect x="${x}" y="${by - h}" width="${ww}" height="${h}" rx="10" fill="${cuerpo}"/><ellipse cx="${x + ww / 2}" cy="${by - h}" rx="${ww / 2}" ry="12" fill="${tapa}"/><rect x="${x}" y="${by - h * 0.62}" width="${ww}" height="${h * 0.3}" fill="${CR}"/><rect x="${x + ww * 0.62}" y="${by - h}" width="${ww * 0.22}" height="${h}" fill="rgba(5,10,20,0.18)"/>`;
const cajita = (x, by, ww, h) => `<rect x="${x}" y="${by - h}" width="${ww}" height="${h}" rx="8" fill="${CR}"/><rect x="${x + ww / 2 - 12}" y="${by - h}" width="24" height="${h}" fill="${CRD}"/><rect x="${x + ww * 0.7}" y="${by - h}" width="${ww * 0.3}" height="${h}" rx="8" fill="rgba(5,10,20,0.14)"/>`;
const frasco = (x, by, ww, h) => `<rect x="${x + ww * 0.25}" y="${by - h - 26}" width="${ww * 0.5}" height="30" rx="6" fill="${DK}"/><rect x="${x}" y="${by - h}" width="${ww}" height="${h}" rx="20" fill="#ffffff"/><rect x="${x + 10}" y="${by - h * 0.6}" width="${ww - 20}" height="${h * 0.32}" rx="6" fill="${MID}"/>`;
const caja2 = (x, by, ww, h) => `<rect x="${x}" y="${by - h}" width="${ww}" height="${h}" rx="12" fill="${MID2}" stroke="${CR}" stroke-width="6"/><path d="M${x + ww * 0.3} ${by - h} q${ww * 0.2} -40 ${ww * 0.4} 0" fill="none" stroke="${CR}" stroke-width="8"/>`;
const PROD = (tabla, k) => {
  const by = SH.tablas[tabla] - 13, x = slotX(k);
  const tipo = (tabla * 4 + k) % 4;
  if (tipo === 0) return lata(x + 20, by, 74, 150) + lata(x + 108, by, 74, 150);
  if (tipo === 1) return cajita(x + 14, by, 176, 120) + cajita(x + 40, by - 120, 124, 70);
  if (tipo === 2) return frasco(x + 18, by, 76, 130) + frasco(x + 108, by, 76, 130);
  return caja2(x + 18, by, 168, 150);
};
const HUECO = [1, 2]; // tabla del medio, tercer lugar
const ESTANTE = `
  <ellipse cx="540" cy="${SH.tablas[2] + 40}" rx="470" ry="22" fill="${SOMBRA}"/>
  <rect x="${SH.x}" y="${SH.top}" width="${SH.w}" height="${SH.tablas[2] + 26 - SH.top}" rx="14" fill="${DK}"/>
  ${SH.tablas.map((y, t) => [0, 1, 2, 3].map((k) => `<g class="pr ${t === HUECO[0] && k === HUECO[1] ? "hueco" : ""}">${PROD(t, k)}</g>`).join("")).join("")}
  <path class="fr" d="M${SH.x} ${SH.tablas[2] + 30} V${SH.top} H${SH.x + SH.w} V${SH.tablas[2] + 30}" fill="none" stroke="${CR}" stroke-width="22" stroke-linejoin="round"/>
  ${SH.tablas.map((y) => `<rect class="tb" x="${SH.x - 10}" y="${y - 13}" width="${SH.w + 20}" height="26" rx="8" fill="${CR}"/>`).join("")}
  <rect x="${SH.x + 260}" y="${SH.top - 40}" width="${SH.w - 520}" height="72" rx="16" fill="${G}"/>
  <text x="540" y="${SH.top + 9}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="36" letter-spacing="5" fill="${DK}">TU LOCAL</text>`;
const HX = slotX(HUECO[1]), HY = SH.tablas[HUECO[0]];
escena("s05-local", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="est">${ESTANTE}</g>
        <rect class="hq" x="${HX + 10}" y="${HY - 200}" width="${SLOT - 20}" height="180" rx="14" fill="rgba(199,101,91,0.12)" stroke="${RED}" stroke-width="7" stroke-dasharray="22 14"/>
        <g class="preg"><circle cx="920" cy="640" r="70" fill="${G}"/><text x="920" y="672" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="92" fill="${DK}">?</text></g>
      </svg>`,
  js: `
      // la tarjeta (de la escena anterior) se vuelve el estante de tu local
      tl.fromTo(q(".est"), { opacity: 0, scale: 0.7, svgOrigin: "540 1300" }, { opacity: 1, scale: 1, svgOrigin: "540 1300", duration: 0.45, ease: "back.out(1.3)" }, 0);
      qa(".pr").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.22, ease: "back.out(2)" }, 0.2 + i * 0.035));
      // "quién"
      tl.fromTo(q(".preg"), { opacity: 0, scale: 0.3, svgOrigin: "920 640" }, { opacity: 1, scale: 1, svgOrigin: "920 640", duration: 0.35, ease: "back.out(2)" }, ${r2(w(46))});
      tl.to(q(".preg"), { rotation: 10, svgOrigin: "920 640", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${r2(w(46) + 0.4)});
      // "falta algo": un lugar se vacía
      tl.to(q(".hueco"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, ${r2(w(52) - 0.1)});
      gsap.set(q(".hq"), { opacity: 0 });
      tl.to(q(".hq"), { opacity: 1, duration: 0.2 }, ${r2(w(53))});
      fuera(".preg", ${r2(D("s05-local") - 0.2)}, 0.18);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: 0.3, sfx: "click-soft", vol: 0.18 }, { t: w(46), sfx: "pop", vol: 0.22 }, { t: r2(w(52) - 0.1), sfx: "whoosh-short", vol: 0.2 }, { t: w(53), sfx: "glitch-1", vol: 0.1, max: 0.3 }],
});

// ================= s06 · el que ve el estante vacío =================
desde("s06-estante");
const HC = [HX + SLOT / 2, HY - 110]; // centro del hueco
const S6 = 1.55;
const [x6, y6] = off(HC, HC, S6, [540, 1000]);
escena("s06-estante", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="zoom" ${T0A}><g class="est">${ESTANTE}</g>
        <rect class="hq" x="${HX + 10}" y="${HY - 200}" width="${SLOT - 20}" height="180" rx="14" fill="rgba(199,101,91,0.12)" stroke="${RED}" stroke-width="7" stroke-dasharray="22 14"/></g>
        <g class="duen">
          <circle cx="210" cy="1200" r="130" fill="${BG}"/>
          ${avatarG("av", 210, 1200, 120, CR, DK)}
          <g class="exc"><circle cx="320" cy="1080" r="44" fill="${RED}"/><rect x="314" y="1052" width="12" height="36" rx="6" fill="#fff"/><circle cx="320" cy="1104" r="7" fill="#fff"/></g>
        </g>
      </svg>
      ${pill(1, 540, 1000, "Vacío", "r")}`,
  js: `
      gsap.set(q(".est .hueco"), { opacity: 0 });
      // push-in al hueco
      tl.fromTo(q(".zoom"), ${pl(HC, 1, HC)}, { ...${pl(HC, S6, [540, 1000])}, duration: 0.55, ease: "power3.inOut" }, 0);
      // "ve": el dueño lo ve
      tl.fromTo(q(".duen"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, ${r2(w(56))});
      pop(".exc", ${r2(w(58))}, 0.25, 0.3);
      // "vacío"
      pop(".n1", ${r2(w(59) - 0.05)});
      tl.to(q(".hq"), { scale: 1.06, svgOrigin: "${HC[0]} ${HC[1]}", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${r2(w(59))});
      salida(${r2(D("s06-estante") - 0.2)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.55 }, { t: w(56), sfx: "pop", vol: 0.2 }, { t: w(59), sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s07 · automatización: cuando un producto baja del mínimo =================
desde("s07-minimo");
const BAR = { x: 170, y: 1170, w: 740, max: 20 };
const MINX = BAR.x + BAR.w * (5 / BAR.max);
escena("s07-minimo", {
  css: `
    P .pan { position: absolute; left: 90px; top: 650px; width: 900px; height: 680px; }
    P .pan-lado { position: absolute; left: 18px; top: 18px; width: 900px; height: 680px; border-radius: 50px; background: #a9a798; }
    P .pan-cuerpo { position: absolute; left: 0; top: 0; width: 900px; height: 680px; border-radius: 50px; background: ${CR}; overflow: hidden; }
    P .pan-tit { position: absolute; left: 60px; top: 56px; font: 800 56px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .pan-sub { position: absolute; left: 60px; top: 132px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.6); }
    P .pan-ic { position: absolute; right: 60px; top: 40px; }
    P .num { position: absolute; left: 0; right: 0; top: 196px; text-align: center; font: 900 220px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.04em; }
    P .uni { position: absolute; left: 0; right: 0; top: 420px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    P .chip { position: absolute; left: 540px; top: 620px; padding: 16px 30px; border-radius: 18px; background: ${G}; font: 600 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${DK}; opacity: 0; transform: translate(-50%, -50%); }
    P .bar { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }`,
  html: `
      <div class="pan"><div class="pan-lado"></div><div class="pan-cuerpo">
        <div class="pan-tit">Pintura blanca</div><div class="pan-sub">STOCK EN EL LOCAL</div>
        <div class="pan-ic"><svg width="110" height="130" viewBox="0 0 110 130" aria-hidden="true">${lata(10, 124, 90, 110)}</svg></div>
        <div class="num"><span class="nv">12</span></div><div class="uni">UNIDADES</div>
      </div></div>
      <svg class="bar" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="${BAR.x}" y="${BAR.y}" width="${BAR.w}" height="48" rx="24" fill="rgba(11,18,32,0.14)"/>
        <rect class="fill" x="${BAR.x}" y="${BAR.y}" width="${BAR.w * (12 / BAR.max)}" height="48" rx="24" fill="${G}"/>
        <g class="mk"><path d="M${MINX} ${BAR.y - 26} V${BAR.y + 74}" stroke="${DK}" stroke-width="8" stroke-linecap="round"/>
        <text x="${MINX + 18}" y="${BAR.y + 102}" font-family="IBM Plex Mono" font-weight="600" font-size="30" letter-spacing="3" fill="${DK}">MÍNIMO 5</text></g>
      </svg>
      <div class="chip">AUTOMATIZACIÓN</div>
      ${pill(1, 540, 1430, "Bajo el mínimo", "r")}`,
  js: `
      // el hueco se vuelve el panel del stock
      tl.fromTo(q(".pan"), { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".bar"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.3);
      // "automatización"
      tl.fromTo(q(".chip"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2)" }, ${r2(w(64))});
      // "un producto baja del mínimo": el número y la barra bajan
      const n = { v: 12 }, nv = q(".nv");
      tl.to(n, { v: 4, duration: 0.9, ease: "power1.in", onUpdate: () => { nv.textContent = Math.round(n.v); } }, ${r2(w(67) - 0.2)});
      tl.to(q(".fill"), { attr: { width: ${BAR.w * (4 / BAR.max)} }, duration: 0.9, ease: "power1.in" }, ${r2(w(67) - 0.2)});
      tl.to(q(".fill"), { attr: { fill: "${RED}" }, duration: 0.15 }, ${r2(w(67) + 0.5)});
      tl.to(q(".num"), { color: "${RED}", duration: 0.15 }, ${r2(w(67) + 0.5)});
      tl.to(q(".mk"), { scale: 1.12, svgOrigin: "${MINX} ${BAR.y + 24}", duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r2(w(70))});
      pop(".n1", ${r2(w(67) + 0.5)}, 0.28);`,
  sfx: [{ t: 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: w(64), sfx: "pop", vol: 0.24 }, { t: r2(w(67) - 0.2), sfx: "typing", vol: 0.16, max: 0.9 }, { t: w(70), sfx: "click-soft", vol: 0.26 }],
});

// ================= s08 · el pedido al proveedor queda armado solo =================
desde("s08-pedido");
const FILAS = [["Pintura blanca 4 L", "× 12"], ["Rodillo 23 cm", "× 6"]];
escena("s08-pedido", {
  css: `
    P .ped { position: absolute; left: 90px; top: 640px; width: 900px; height: 690px; }
    P .ped-lado { position: absolute; left: 18px; top: 18px; width: 900px; height: 690px; border-radius: 50px; background: #a9a798; }
    P .ped-cuerpo { position: absolute; left: 0; top: 0; width: 900px; height: 690px; border-radius: 50px; background: ${CR}; overflow: hidden; }
    P .ped-ban { position: absolute; left: 0; top: 0; width: 900px; height: 130px; background: ${DK}; }
    P .ped-ban b { position: absolute; left: 56px; top: 44px; font: 600 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${G}; }
    P .ped-prov { position: absolute; left: 56px; top: 170px; font: 800 54px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .fila { position: absolute; left: 40px; width: 820px; height: 110px; border-radius: 24px; background: rgba(11,18,32,0.08); opacity: 0; }
    P .fila span { position: absolute; left: 30px; top: 35px; font: 600 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .fila em { position: absolute; right: 110px; top: 33px; font: 800 44px/1 "Lexend", sans-serif; font-style: normal; color: ${DK}; }
    P .fila .ok { position: absolute; right: 26px; top: 27px; opacity: 0; }
    P .btn { position: absolute; left: 40px; top: 560px; width: 820px; height: 96px; border-radius: 26px; background: ${G}; font: 700 44px/96px "Lexend", sans-serif; color: ${DK}; text-align: center; opacity: 0; }
    P .ped-in { position: absolute; inset: 0; }`,
  html: `
      <div class="ped"><div class="ped-lado"></div><div class="ped-cuerpo">
        <div class="ped-ban"><b>PEDIDO AL PROVEEDOR</b></div>
        <div class="ped-prov">Distribuidora Norte</div>
        ${FILAS.map(([a, b], i) => `<div class="fila f${i}" style="top:${266 + i * 136}px"><span>${a}</span><em>${b}</em><span class="ok" style="left:auto">${tick(28)}</span></div>`).join("")}
        <div class="btn">Listo para enviar</div>
      </div></div>
      ${pill(1, 540, 1440, "Armado solo", "lleno")}`,
  js: `
      // el panel de stock gira y queda el pedido
      tl.fromTo(q(".ped"), { opacity: 0, rotationY: -70, scale: 0.9, transformOrigin: "50% 50%", transformPerspective: 1400 }, { opacity: 1, rotationY: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      tl.fromTo(q(".ped-prov"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.25 }, ${r2(Math.max(0.3, w(72) + 0.1))});
      qa(".fila").forEach((f, i) => tl.fromTo(f, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.7)" }, ${r2(w(74) + 0.25)} + i * 0.18));
      qa(".fila .ok").forEach((o, i) => pop(o, ${r2(w(76))} + i * 0.14, 0.25, 0.3));
      tl.fromTo(q(".btn"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }, ${r2(w(76) + 0.1)});
      pop(".n1", ${r2(w(77))});
      tl.to(q(".btn"), { scale: 1.04, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r2(w(77) + 0.3)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(w(74) + 0.25), sfx: "click-soft", vol: 0.22 }, { t: r2(w(74) + 0.43), sfx: "click-soft", vol: 0.2 }, { t: w(76), sfx: "notification", vol: 0.2, max: 0.8 }, { t: w(77), sfx: "ping", vol: 0.22 }],
});

// ================= s09 · CTA =================
desde("s09-cta");
escena("s09-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 600px; width: 922px; height: 470px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 616px; width: 922px; height: 470px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 390px; border-radius: 34px; background: ${MID}; overflow: hidden; }
    P .vc-a svg.av { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 266px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1130px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1272px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1460px; color: ${G}; font-size: 112px; }
    P .mini { position: absolute; left: 90px; top: 640px; width: 900px; height: 690px; border-radius: 50px; background: ${CR}; overflow: hidden; }
    P .mini b { position: absolute; left: 0; top: 0; width: 900px; height: 130px; background: ${DK}; }
    P .mini i { position: absolute; left: 40px; width: 820px; height: 110px; border-radius: 24px; background: rgba(11,18,32,0.08); }
    P .mini u { position: absolute; left: 40px; top: 560px; width: 820px; height: 96px; border-radius: 26px; background: ${G}; }`,
  html: `
      <div class="mini"><b></b><i style="top:266px"></i><i style="top:402px"></i><u></u></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg class="av" width="160" height="160" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${DK}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${DK}"/></svg><div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${DK}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${DK}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      // "¿lo vemos con tu stock?": el pedido se vuelve la pantalla de la videollamada
      tl.to(q(".mini"), { scale: 0.7, y: -100, transformOrigin: "50% 50%", duration: 0.5, ease: "power3.inOut" }, 0.05);
      tl.to(q(".mini"), { opacity: 0, duration: 0.15 }, 0.3);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }, 0.45);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.6);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(85) - 0.05)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(86) - 0.1)});
      caja(".sb", ${r2(w(86) + 0.1)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(88) - 0.1)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(88) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(88) + 0.4)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.6, sfx: "pop", vol: 0.22 }, { t: r2(w(85) - 0.05), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(86) + 0.1), sfx: "click-soft", vol: 0.28 }, { t: r2(w(88) - 0.1), sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
