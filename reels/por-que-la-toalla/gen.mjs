// Generador de las escenas HTML de reels/por-que-la-toalla (correr desde la carpeta del reel, después de `node armar.mjs`).
// Base: reels/por-que-el-mozo, con fondo navy #0b1220 liso en este reel. Los objetos son 3D de verdad y viven en
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

// ---------- CSS común (sobre navy: placas navy claro con texto crema y borde verde; líneas guía crema) ----------
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
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; stroke-width: 8; }
    ${P} .dot { fill: ${CR}; stroke: ${NAVY}; stroke-width: 4; opacity: 0; } ${P} .dot.g { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; }
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



// toallas que caen (tic/tac reales como golpecitos blandos de tela; máx. 6 audibles)
const caen = (a, b, n = 6, vol = 0.3) => Array.from({ length: n }, (_, i) => ({ t: r2(a + (i * (b - a)) / n), sfx: i % 2 ? "tac-real" : "tic-real", vol }));
const cred = (k, x, y, txt, sub = "") => `<div class="cred n${k}" style="left:${x}px;top:${y}px">${txt}${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const CSS_CRED = `P .cred { position: absolute; transform: translate(-50%, -50%); padding: 16px 34px 18px; border-radius: 22px; background: ${NAVY2}; border: 6px solid ${G}; font: 600 46px/1.1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; }
    P .cred .sub { display: block; margin-top: 8px; font: 500 44px/1.15 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: ${G}; }`;

// posiciones en pantalla de los rótulos (medidas sobre los cuadros del 3D)
const POS = {
  estudio: [540, 1590], estudioLead: [540, 1525, 540, 1300],
  siempre: [540, 1600], siempreLead: [540, 1535, 540, 1420],
  credPilas: [540, 530], gano: [800, 1060],
  demas: [540, 1690], demasLead: [540, 1640, 540, 1560],
  cred2: [540, 1660], honesto: [470, 555], honestoLead: [800, 628, 895, 738], siempre2: [510, 1480],
  almacen: [800, 1180], almacenLead: [790, 1128, 760, 990],
  resenas: [540, 1650], resenasLead: [540, 1600, 540, 1545],
  mismo: [540, 1620],
};

// ================= s01 · gancho (cuadro 0 = portada): el cartelito de la mayoría sobre la toalla =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; font: 900 118px/1.04 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; -webkit-text-stroke: 18px ${NAVY}; paint-order: stroke fill; white-space: nowrap; }
    P .h .mk { -webkit-text-stroke: 0; }
    P .h1 { top: 130px; font-size: 112px; } P .h2 { top: 262px; font-size: 112px; } P .h3 { top: 392px; font-size: 136px; } P .h4 { top: 556px; font-size: 104px; letter-spacing: -0.035em; }`,
    html: `
      <div class="h h1">¿Por qué el hotel</div>
      <div class="h h2">te dice que la</div>
      <div class="h h3">${marca("mayoría")}</div>
      <div class="h h4">reutiliza la toalla?</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${w(id, 8)}, 1.12);
      late(".h4", ${w(id, 11)}, 1.06);
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: w(id, 8) - 0.05, sfx: "click-soft", vol: 0.3 },
      ...[0, 1, 2].map((k) => ({ t: r2(w(id, 8) + 0.02 + k * 0.12), sfx: "pop", vol: 0.28 })),
      { t: w(id, 11) - 0.05, sfx: "papel-fuerte", vol: 1, max: 0.4, full: 1 },
    ],
  });
}

// ================= s02 · un estudio probó dos carteles (travelling atrás: las dos toallas) =================
{
  const id = "s02-carteles";
  const [x, y] = POS.estudio, [a, b, c, d] = POS.estudioLead;
  escena(id, {
    css: CSS_CRED,
    html: `${leads(lead(1, a, b, c, d))}${cred(1, x, y, "Estudio publicado en 2008")}`,
    js: `nota(1, ${r2(w(id, 13) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: -0.4, sfx: "whoosh", vol: 0.08 }, { t: 0.08, sfx: "papel-fuerte", vol: 1, max: 0.35 },
      { t: w(id, 13) + 0.05, sfx: "click", vol: 0.25 },
      { t: w(id, 16) - 0.05, sfx: "papel-fuerte", vol: 1, max: 0.4 },
    ],
  });
}

// ================= s03 · uno pedía cuidar el ambiente (push-in al cartel de la izquierda) =================
{
  const id = "s03-ambiente";
  const [x, y] = POS.siempre, [a, b, c, d] = POS.siempreLead;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Cartel de siempre")}`,
    js: `nota(1, ${r2(w(id, 18) + 0.3)}); sinNota(1, ${r2(ESC[id] - 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.3 },
      { t: w(id, 18) - 0.2, sfx: "papel-fuerte", vol: 1, max: 0.35 }, { t: w(id, 18), sfx: "sello", vol: 0.4, max: 0.4 },
      { t: w(id, 21) - 0.1, sfx: "pop", vol: 0.28 },
    ],
  });
}

// ================= s04 · el otro: la mayoría la reusa. Ganó el segundo (paneo, y las pilas) =================
{
  const id = "s04-mayoria";
  const [cx, cy] = POS.credPilas, [gx, gy] = POS.gano;
  const tG = w(id, 28) - 0.05;
  escena(id, {
    css: CSS_CRED,
    html: `${cred(1, cx, cy, "Estudio publicado en 2008", "reusaron la toalla")}<div class="sello s1" style="left:${gx}px;top:${gy}px">${tickSvg(30)}Ganó</div>`,
    js: `nota(1, ${r2(tG + 0.6)}); gsap.set(q(".s1"), { xPercent: -50, yPercent: -50 }); sello(".s1", ${r2(tG + 0.98)}, -6); tl.to(qa(".s1, .n1"), { opacity: 0, duration: 0.12 }, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.05 },
      ...[0, 1, 2].map((k) => ({ t: r2(w(id, 25) - 0.02 + k * 0.12), sfx: "pop", vol: 0.26 })),
      { t: tG + 0.05, sfx: "whoosh-short", vol: 0.3 },
      ...caen(tG + 0.32, tG + 0.78, 4, 0.2),
      { t: tG + 0.8, sfx: "pop", vol: 0.1 }, { t: tG + 0.88, sfx: "pop", vol: 0.1 },
      
      { t: tG + 1.0, sfx: "sello", vol: 0.3, max: 0.35 },
    ],
  });
}

// ================= s05 · ¿Por qué? (las toallas verdes se juntan en el "?") =================
vacia("s05-por-que", [
  { t: -0.25, sfx: "whoosh", vol: 0.16, max: 0.6 },
  { t: w("s05-por-que", 32), sfx: "impact-bass-1", vol: 0.28, max: 0.6 },
]);

// ================= s06 · antes de decidir, miramos a los demás (el hotel en corte) =================
{
  const id = "s06-demas";
  const [x, y] = POS.demas, [a, b, c, d] = POS.demasLead;
  const tD = w(id, 39) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Lo que hacen los demás")}`,
    js: `nota(1, ${r2(w(id, 35) + 0.25)}); sinNota(1, ${r2(ESC[id] - 0.1)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh", vol: 0.6, max: 0.7, full: 1 },
      ...Array.from({ length: 6 }, (_, i) => ({ t: r2(tD - 0.35 + i * 0.13), sfx: "pop", vol: 0.18 })),
      { t: tD + 0.67, sfx: "ping", vol: 0.22, max: 0.4 },
    ],
  });
}

// ================= s07 · y si decía "los de esta habitación", más todavía (la 214) =================
{
  const id = "s07-habitacion";
  const [hx, hy] = POS.honesto, [a, b, c, d] = POS.honestoLead;
  const tL = w(id, 43) - 0.05, tH = w(id, 46) - 0.05, tT = w(id, 48) - 0.05;
  escena(id, {
    html: `${leads(lead(2, a, b, c, d, "g"))}<div class="hon n2" style="left:${hx}px;top:${hy}px"><b>2.º experimento</b><span>Otros estudios: no siempre<br>tan fuerte</span></div>${pill(3, POS.siempre2[0], POS.siempre2[1], "Cartel de siempre", "chico")}`,
    css: `
    P .pill.chico { font-size: 46px; padding: 10px 24px 13px; border-width: 5px; }
    P .hon { position: absolute; transform: translate(-50%, -50%); padding: 16px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${G}; color: ${CR}; white-space: nowrap; opacity: 0; text-align: center; }
    P .hon b { display: block; font: 600 44px/1.15 "Lexend", sans-serif; margin-bottom: 8px; }
    P .hon span { display: block; font: 500 44px/1.2 "IBM Plex Mono", monospace; color: ${CR}; }`,
    js: `pop(".n2", ${r2(tH - 0.02)}); dibujar(".l2", ${r2(tH + 0.35)}, 0.28); pop(".d2", ${r2(tH + 0.55)}, 0.2); nota(3, ${r2(tH + 0.35)}); tl.set(qa(".n2, .l2, .d2, .n3"), { opacity: 0 }, ${r2(ESC[id] - 0.34)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.3 },
      { t: tL, sfx: "papel-fuerte", vol: 1, max: 0.4 },
      { t: tH, sfx: "pop", vol: 0.3 },
      { t: tH + 0.25, sfx: "whoosh-short", vol: 0.15 },
      ...caen(tH + 0.12, tH + 0.5, 5, 0.2),
      { t: tH + 0.6, sfx: "chime", vol: 0.08, max: 0.8 },
      { t: tH, sfx: "click-soft", vol: 0.25 },
    ],
  });
}

// ================= s08 · Graciela duda qué pedirle a Rubén (la calle, el almacén atrás) =================
{
  const id = "s08-graciela";
  const [x, y] = POS.almacen, [a, b, c, d] = POS.almacenLead;
  const tD = w(id, 50) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d))}${pill(1, x, y, "Almacén de Rubén")}`,
    js: `nota(1, 0.85); sinNota(1, ${r2(ESC[id] - 0.06)});`,
    sfx: [
      { t: -0.32, sfx: "whoosh", vol: 0.6, max: 0.7, full: 1 },
      { t: tD, sfx: "burbuja", vol: 0.3 },
      ...[0, 1, 2].map((k) => ({ t: r2(tD + 0.15 + k * 0.14), sfx: "pop", vol: 0.24 })),
      { t: 0.85, sfx: "click-soft", vol: 0.22 },
    ],
  });
}

// ================= s09 · el sitio de Rubén: lo más pedido del barrio (el celular que muestra) =================
{
  const id = "s09-sitio";
  const [x, y] = POS.resenas, [a, b, c, d] = POS.resenasLead;
  const tP = w(id, 63) - 0.05, tB = w(id, 65) - 0.05;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d, "g"))}${pill(1, x, y, "Reseñas de vecinos", "lleno")}`,
    js: `nota(1, ${r2(tB + 0.33)}); sinNota(1, ${r2(ESC[id] - 0.06)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.03 }, { t: w(id, 56) - 0.1, sfx: "click-soft", vol: 0.1 },
      { t: w(id, 56) + 0.2, sfx: "click-soft", vol: 0.25 },
      ...[0, 1, 2].map((k) => ({ t: r2(tP + 0.05 + k * 0.13), sfx: "pop", vol: 0.28 })),
      { t: tB + 0.33, sfx: "sparkle", vol: 0.22, max: 0.8 },
    ],
  });
}

// ================= s10 · es el cartel de la toalla (callback: la tarjeta cuelga y encaja) =================
{
  const id = "s10-cartel";
  const [x, y] = POS.mismo;
  const tT = w(id, 71) - 0.05;
  escena(id, {
    html: `${pill(1, x, y, "Mismo cartel · otro mostrador", "lleno")}`,
    js: `nota(1, ${r2(w(id, 68) - 0.05)}); sinNota(1, ${r2(ESC[id] - 0.06)});`,
    sfx: [
      { t: -0.32, sfx: "whoosh-short", vol: 0.19 },
      { t: w(id, 68) - 0.08, sfx: "papel-fuerte", vol: 1, max: 0.35 },
      { t: tT - 0.06, sfx: "papel-fuerte", vol: 1, max: 0.35 },
      { t: tT + 0.22, sfx: "chime", vol: 0.32, max: 0.8 }, { t: tT + 0.22, sfx: "pop", vol: 0.3 },
    ],
  });
}

// ================= s11 · ¿lo vemos en tu local? (la tarjeta vuela al almacén: Rubén, el celular, Hoy: 13) =================
{
  const id = "s11-local";
  vacia(id, [
    { t: -0.3, sfx: "whoosh", vol: 0.5 },
    { t: 1.0, sfx: "vibra-medios", vol: 1, max: 0.55 },
    { t: 1.3, sfx: "pop", vol: 0.3 }, { t: 1.3, sfx: "campanita", vol: 0.155, max: 0.8 },
  ]);
}

// ================= s12 · cierre: videollamada gratis en scalerics.com (fondo verde, el cartelito con el tilde) =================
{
  const id = "s12-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 446px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 646px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${NAVY}; border: 8px solid ${NAVY}; font: 900 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 80) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 82) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.3 },
      { t: w(id, 82) - 0.03, sfx: "ding", vol: 0.08, max: r2(Math.min(1.2, ESC[id] - w(id, 82) - 0.3)) },
    ],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, "·", Object.entries(ESC).map(([k, v]) => `${k.slice(0, 3)} ${INI[k]}+${v}`).join(" "));
