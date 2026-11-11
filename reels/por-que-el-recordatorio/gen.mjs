// Generador de las escenas HTML de reels/por-que-el-recordatorio (correr desde la carpeta del reel, después de `node armar.mjs`).
// Base: reels/por-que-la-toalla, con fondo CREMA #efeee5 liso en este reel (líneas guía navy, placas navy claro). Los objetos son 3D de verdad y viven en
// assets/tres.js (una sola escena Three.js); estas escenas son SOLO la capa plana de arriba: el gancho en grande, 1-2
// rótulos con línea guía, los créditos de los estudios, los sellos, y la tarjeta de cierre.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.12);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);
const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";

// ---------- piezas ----------
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="13"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const tickSvg = (r = 26) => `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------- CSS común (sobre crema: placas navy claro con texto crema y borde verde; líneas guía navy) ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 14px 32px 17px; border: 6px solid ${G}; border-radius: 26px; background: ${NAVY2}; font: 600 48px/1.05 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.2); }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.grande { font-size: 60px; padding: 18px 40px 21px; }
    ${P} .pill .sub { display: block; margin-top: 6px; font: 500 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; text-transform: uppercase; color: ${G}; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; stroke-width: 8; }
    ${P} .dot { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; opacity: 0; } ${P} .dot.g { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${NAVY}; border-radius: 22px; font: 900 80px/1 "Lexend", sans-serif; letter-spacing: 0.01em; color: ${NAVY}; background: ${G}; opacity: 0; white-space: nowrap; display: flex; align-items: center; gap: 18px; box-shadow: 0 10px 0 rgba(11,18,32,0.22); }
    ${P} .sello.navy { background: ${NAVY2}; color: ${CR}; border-color: ${G}; }
    ${P} .sello.chico { font-size: 70px; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => { const el = typeof s === "string" ? qa(s) : s; tl.set(el, { opacity: 1 }, t); tl.fromTo(el, { scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { scale: 1, duration: d ?? 0.3, ease: "back.out(1.8)", immediateRender: false }, t); };
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t + 0.2, 0.2); } pop(".n" + k, t); };
      const sinNota = (k, t) => tl.to(qa(".n" + k + ", .l" + k + ", .d" + k), { opacity: 0, duration: 0.08, ease: "power1.in" }, t);
      const sello = (s, t, rot) => { tl.set(q(s), { opacity: 1 }, t); tl.fromTo(q(s), { scale: 1.18, rotation: (rot ?? -8) - 14, transformOrigin: "50% 50%" }, { scale: 1, rotation: rot ?? -8, duration: 0.18, ease: "power3.in", immediateRender: false }, t); };
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
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
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });
const marca = (txt) => `<span class="mk"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 22px; margin: 0 4px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 14px; bottom: 2px; background: ${G}; border-radius: 14px; border: 5px solid ${NAVY}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; }`;



const cred = (k, x, y, txt, sub = "") => `<div class="cred n${k}" style="left:${x}px;top:${y}px">${txt}${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const CSS_CRED = `P .cred { position: absolute; transform: translate(-50%, -50%); padding: 16px 34px 18px; border-radius: 22px; background: ${NAVY2}; border: 6px solid ${G}; font: 600 46px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; box-shadow: 0 8px 0 rgba(11,18,32,0.2); }
    P .cred .sub { display: block; margin-top: 8px; font: 500 40px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: ${G}; }`;
const w2 = (id, i) => r2(w(id, i));
// tramos sin logo (primeros planos de celulares): los lee armar.mjs
const FIRMA = [];

// posiciones en pantalla de los rótulos (medidas sobre los cuadros del 3D)
const POS = {
  recordatorio: [540, 1790], recordatorioLead: [540, 1730, 560, 1420],
  credRev: [540, 540], noCero: [400, 1640], noCeroLead: [300, 1585, 120, 900],
  citada: [540, 1640],
  credPrest: [540, 545], sms: [440, 1680], smsLead: [640, 1630, 770, 1460],
  parecido: [540, 1650], parecidoLead: [540, 1575, 540, 1180],
  encargos: [540, 1640], encargosLead: [470, 1585, 330, 1170],
  solo: [540, 1700], soloLead: [540, 1645, 540, 1490],
};

// ================= s01 · gancho (cuadro 0 = portada): el celular de Rubén con el recordatorio =================
{
  const id = "s01-gancho";
  const [x, y] = POS.recordatorio, [a, b, c, d] = POS.recordatorioLead;
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 118px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; -webkit-text-stroke: 18px #ffffff; paint-order: stroke fill; white-space: nowrap; }
    P .h .mk { -webkit-text-stroke: 0; }
    P .h1 { top: 110px; font-size: 116px; } P .h2 { top: 236px; font-size: 140px; } P .h3 { top: 408px; font-size: 84px; } P .h4 { top: 516px; font-size: 112px; }`,
    html: `
      <div class="h h1">¿Por qué el</div>
      <div class="h h2">${marca("dentista")}</div>
      <div class="h h3">te manda un mensaje</div>
      <div class="h h4">el día antes?</div>
      ${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Recordatorio del día antes")}`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h2 .mk", ${w2(id, 3)}, 1.1);
      late(".h3", ${w2(id, 7)}, 1.06);
      late(".h4", ${w2(id, 10)}, 1.06);
      nota(1, ${r2(w(id, 7) + 0.35)});
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.5)});
      tl.to(qa(".n1, .l1, .d1"), { opacity: 0, duration: 0.1, ease: "power1.in" }, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: w(id, 7) - 0.05, sfx: "vibra-fuerte", vol: 1, max: 0.5 },
      { t: w(id, 7), sfx: "notification", vol: 0.5, max: 0.6 },
      { t: w(id, 7) + 0.35, sfx: "click-soft", vol: 0.25 },
      { t: w(id, 10) - 0.05, sfx: "pop", vol: 0.25 },
      { t: r2(ESC[id] - 0.5), sfx: "whoosh-short", vol: 0.4 },
    ],
  });
}

// ================= s02 · falta menos gente (la fila de sillones; las burbujas a los vacíos) =================
{
  const id = "s02-faltan";
  const [x, y] = POS.noCero, [a, b, c, d] = POS.noCeroLead;
  const tl1 = 0.8, tl2 = 1.08; // cuando llegan las dos primeras burbujas (ver tres.js)
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credRev[0], POS.credRev[1], "Revisión de 8 estudios · 2013")}${leads(lead(2, a, b, c, d))}${pill(2, x, y, "Menos faltas, no cero")}`,
    js: `nota(1, 1.25); nota(2, ${r2(w(id, 15))}); tl.to(qa(".n1, .n2, .l2, .d2"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.15)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh", vol: 0.5, max: 0.7, full: 1 },
      { t: 0.3, sfx: "whoosh-short", vol: 0.2 }, { t: 0.58, sfx: "whoosh-short", vol: 0.2 },
      { t: tl1, sfx: "pop", vol: 0.35 }, { t: tl1 + 0.02, sfx: "papel-fuerte", vol: 1, max: 0.3 },
      { t: tl2, sfx: "pop", vol: 0.35 }, { t: tl2 + 0.02, sfx: "papel-fuerte", vol: 1, max: 0.3 },
      { t: 1.25, sfx: "click-soft", vol: 0.2 },
      { t: w(id, 16) - 0.05, sfx: "ping", vol: 0.25, max: 0.5 },
      { t: w(id, 15), sfx: "click-soft", vol: 0.22 },
    ],
  });
}

// ================= s03 · ¿Por qué? (la lámpara se dobla en el "?") =================
vacia("s03-por-que", [
  { t: -0.2, sfx: "whoosh-cine-corto", vol: 0.35, max: 0.6 },
  { t: w("s03-por-que", 19), sfx: "impact-bass-1", vol: 0.3, max: 0.6 },
]);

// ================= s04 · la razón que más dan: «me olvidé» (la nube de Rubén) =================
{
  const id = "s04-olvide";
  const [x, y] = POS.citada;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, x, y, "La razón más citada", "en muchos estudios<br>varía según el lugar")}`,
    js: `nota(1, ${r2(w(id, 23))}); tl.to(qa(".n1"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.15)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.3, sfx: "burbuja", vol: 0.3 },
      { t: 0.45, sfx: "pop", vol: 0.25 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(0.55 + i * 0.22), sfx: "pop", vol: 0.2 })),
      { t: w(id, 23), sfx: "click-soft", vol: 0.2 },
      { t: w(id, 29) - 0.05, sfx: "papel-fuerte", vol: 1, max: 0.4 },
      { t: w(id, 29) + 0.3, sfx: "tic", vol: 0.25 },
    ],
  });
}

// ================= s05 · y no pasa solo con los turnos (el papelito se da vuelta: la tarjeta de cuotas, las monedas) =================
{
  const id = "s05-plata";
  const t0 = 0.9;
  vacia(id, [
    { t: -0.05, sfx: "whoosh-short", vol: 0.35 },
    { t: 0.4, sfx: "papel-fuerte", vol: 1, max: 0.35 },
    ...[0, 1, 2, 3].map((i) => ({ t: r2(t0 + 0.16 + i * 0.2), sfx: i % 2 ? "tac-real" : "tic-real", vol: 0.08 })),
  ]);
}

// ================= s06 · un estudio con préstamos: un aviso antes de cada cuota =================
{
  const id = "s06-cuotas";
  const [x, y] = POS.sms, [a, b, c, d] = POS.smsLead;
  const tA = w(id, 42) - 0.05;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, POS.credPrest[0], POS.credPrest[1], "Estudio publicado en 2011", "1.121 préstamos")}${leads(lead(2, a, b, c, d))}${pill(2, x, y, "Un mensaje por mes")}`,
    js: `nota(1, ${r2(w(id, 38))}); nota(2, ${r2(tA + 0.05)}); tl.to(qa(".n1, .n2, .l2, .d2"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.5)});`,
    sfx: [
      { t: w(id, 38), sfx: "click-soft", vol: 0.22 },
      { t: tA - 0.4, sfx: "whoosh-short", vol: 0.12 },
      { t: tA, sfx: "vibra-fuerte", vol: 1, max: 0.45 },
      ...[0, 1, 2].map((kk) => ({ t: r2(tA + 0.25 + kk * 0.34), sfx: "notification", vol: 0.3, max: 0.4 })),
      ...[0, 1, 2, 3].map((kk) => ({ t: r2(tA + 0.55 + kk * 0.34), sfx: "click-soft", vol: 0.25 })),
    ],
  });
}

// ================= s07 · funcionó casi como bajarle un cuarto a los intereses (la balanza que se nivela) =================
{
  const id = "s07-balanza";
  const [x, y] = POS.parecido, [a, b, c, d] = POS.parecidoLead;
  const tT = w(id, 48) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, `Efecto parecido en pagar a tiempo<span class="sub">mismo estudio</span>`)}`,
    css: `P .pill { flex-direction: column; gap: 0; }`,
    js: `nota(1, ${r2(tT + 0.9)}); tl.to(qa(".n1, .l1, .d1"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.55)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh", vol: 0.45, max: 0.7, full: 1 },
      { t: 0.0, sfx: "pop", vol: 0.3 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(0.62 + i * 0.09), sfx: i % 2 ? "tac-real" : "tic-real", vol: 0.25 })),
      { t: 0.5, sfx: "pop", vol: 0.2 },
      { t: tT + 0.75, sfx: "golpe", vol: 0.35, max: 0.5 },
      { t: tT + 0.9, sfx: "click-soft", vol: 0.2 },
      { t: w(id, 52) - 0.05, sfx: "pop", vol: 0.3 },
      { t: w(id, 55) - 0.02, sfx: "ding", vol: 0.12, max: 0.8 },
      { t: r2(ESC[id] - 0.45), sfx: "whoosh-short", vol: 0.25 },
    ],
  });
}

// ================= s08 · en el almacén de Rubén, el olvido tiene forma de encargo (grúa: las bolsas con nombre) =================
{
  const id = "s08-encargos";
  const [x, y] = POS.encargos, [a, b, c, d] = POS.encargosLead;
  const tE = w(id, 66) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Encargos armados, esperando")}`,
    js: `nota(1, ${r2(w(id, 62))}); tl.to(qa(".n1, .l1, .d1"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh-cinematic", vol: 0.35, max: 1.0 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 60) - 0.1 + i * 0.13), sfx: "pop", vol: 0.22 })),
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 60) - 0.08 + i * 0.13), sfx: "papel-fuerte", vol: 0.35, max: 0.25 })),
      { t: w(id, 62), sfx: "click-soft", vol: 0.15 },
    ],
  });
}

// ================= s09 · ahora el sistema avisa solo: «Tu pedido está listo» (la burbuja vuela al celular de Graciela) =================
{
  const id = "s09-aviso";
  const [x, y] = POS.solo, [a, b, c, d] = POS.soloLead;
  const tS = w(id, 69) - 0.05, tG = r2(tS + 0.62), tV = r2(tG + 0.35), tTu = w(id, 72), tL = w(id, 75);
  FIRMA.push([r2(INI[id] + tTu - 0.1), r2(INI[id] + ESC[id])]);
  escena(id, {
    css: `P .pill.lleno { font-size: 44px; padding: 12px 28px 15px; }`,
    html: `${pill(1, x, y, "Sale solo, a la hora que elijas", "lleno")}`,
    js: `nota(1, ${r2(tTu + 0.05)}); tl.to(qa(".n1"), { opacity: 0, duration: 0.1 }, ${r2(ESC[id] - 0.1)});`,
    sfx: [
      { t: tS, sfx: "ping", vol: 0.3, max: 0.5 },
      { t: tS + 0.1, sfx: "whoosh-short", vol: 0.35 },
      { t: tG, sfx: "whoosh-short", vol: 0.2 },
      { t: tV, sfx: "vibra-fuerte", vol: 1, max: 0.5 },
      { t: tV + 0.08, sfx: "notification", vol: 0.45, max: 0.6 },
      { t: tTu + 0.1, sfx: "click-soft", vol: 0.2 },
      { t: tL - 0.1, sfx: "click", vol: 0.25 },
      { t: tL + 0.12, sfx: "whoosh-short", vol: 0.2 },
    ],
  });
}

// ================= s10 · y Graciela pasa (campanita, la bolsa, los demás tickets se prenden) =================
vacia("s10-pasa", [
  { t: -0.02, sfx: "campanita", vol: 0.14, max: 0.8 },
  { t: w("s10-pasa", 77) + 0.1, sfx: "papel-fuerte", vol: 0.18, max: 0.35 },
  ...[0, 1, 2].map((i) => ({ t: r2(w("s10-pasa", 77) + 0.5 + i * 0.15), sfx: "pop", vol: 0.045 })),
]);

// ================= s11 · ¿que tus clientes no se olviden? (el celular de Rubén: las dos burbujas iguales) =================
{
  const id = "s11-local";
  FIRMA.push([INI[id], r2(INI[id] + ESC[id])]);
  vacia(id, [
    { t: -0.1, sfx: "whoosh", vol: 0.2, max: 0.6 },
    { t: 0.1, sfx: "vibra-medios", vol: 0.3, max: 0.5 },
    { t: 0.2, sfx: "notification", vol: 0.15, max: 0.6 },
  ]);
}

// ================= s12 · cierre: videollamada gratis en scalerics.com (fondo verde, la burbuja con el tilde) =================
{
  const id = "s12-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 446px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 646px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; font: 900 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 88) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 90) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.3 },
      { t: 0.1, sfx: "chime", vol: 0.1, max: 0.8 },
      { t: w(id, 90) - 0.03, sfx: "ding", vol: 0.08, max: r2(Math.min(1.2, ESC[id] - w(id, 90) - 0.3)) },
    ],
  });
}
fs.writeFileSync("assets/firma.json", JSON.stringify(FIRMA));
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
