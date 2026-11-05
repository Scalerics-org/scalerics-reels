// Generador de las escenas HTML de reels/tres-segundos (correr desde la carpeta del reel: `node gen.mjs && node armar.mjs`).
// Base: reels/caso-pedidosya. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena
// Three.js, la cámara viaja sin cortes); estas escenas son SOLO la capa plana de arriba: el gancho en
// grande, 1-2 rótulos con línea guía, el sello, la pregunta final y el cierre.
// Google se nombra solo en texto (pill "Fuente: Google"): ni logo, ni sus colores, ni su letra.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.3);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${RED}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const mono = (k, x, y, txt, kind = "") => `<div class="mono ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 46px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${CR}; white-space: nowrap; opacity: 0; text-shadow: 0 3px 0 rgba(3,6,12,0.6); }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${RED}; border-radius: 22px; font: 900 92px/1 "Lexend", sans-serif; letter-spacing: 0.02em; color: ${RED}; background: rgba(11,18,32,0.78); opacity: 0; white-space: nowrap; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)", immediateRender: true }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.16 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const sello = (s, t, rot) => tl.fromTo(q(s), { opacity: 0, scale: 1.8, rotation: rot ?? -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: rot ?? -8, duration: 0.28, ease: "power4.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const finTodo = () => tl.to(q(".esc"), { opacity: 0, duration: 0.2, ease: "power2.in" }, DUR - 0.22);
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



// tiempo absoluto t → relativo a la escena id; W(i) = inicio de la palabra i (absoluto)
const W = (i) => r2(pal[i].start);
const rel = (id, t) => r2(t - INI[id]);
const TIT = `font: 800 104px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55);`;

// ================= s01 · gancho (cuadro 0 = portada): el cronómetro gigante ya corriendo =================
{
  const id = "s01-gancho";
  // el 3D: la aguja pasa el 1, el 2 y el 3 en 0,5 / 1,0 / 1,5 s (tres.js: MARCAS1)
  const T1 = r2(W(6) / 3), T2 = r2((2 * W(6)) / 3), T3 = W(6);
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 150px; text-align: center; ${TIT} font-size: 106px; }
    P .v { position: absolute; left: 0; right: 0; top: 392px; text-align: center; ${TIT} font-size: 150px; font-weight: 900; color: ${G}; }`,
    html: `
      <div class="a"><div>Si tu página tarda</div><div>más de</div></div>
      <div class="v">3 segundos</div>`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".v", ${r2(T3 - 0.02)}, 1.1);
      tl.to(q(".a"), { y: -90, opacity: 0, duration: 0.3, ease: "power2.in" }, ${r2(rel(id, W(10)) - 0.1)});
      tl.to(q(".v"), { y: -90, opacity: 0, duration: 0.3, ease: "power2.in" }, ${r2(rel(id, W(10)) - 0.02)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.22 },
      { t: T1, sfx: "tic", vol: 0.5 }, { t: T2, sfx: "tic", vol: 0.5 }, { t: T3, sfx: "tic", vol: 0.55 },
      { t: T3 + 0.02, sfx: "click", vol: 0.22 }, { t: T3 + 0.06, sfx: "glitch-1", vol: 0.12, max: 0.35 },
      { t: rel(id, W(10)) - 0.1, sfx: "whoosh", vol: 0.22, max: 0.8 }, { t: rel(id, W(10)) + 0.35, sfx: "pop", vol: 0.18 },
    ],
  });
}

// ================= s02 · más de la mitad de las visitas se va (siluetas que se dan vuelta) · 53 % · según Google =================
{
  const id = "s02-mitad";
  escena(id, {
    css: `P .pill.f { font-size: 44px; }`,
    html: `
      ${pill(1, 540, 1645, "Visitas desde el celular", "")}
      ${pill(2, 540, 1640, "Fuente: Google", "f")}`,
    js: `
      nota(1, 0.15);
      fuera(".n1", ${r2(rel(id, W(19)) - 0.25)}, 0.2);
      nota(2, ${r2(rel(id, W(21)) - 0.08)});
      fuera(".n2", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: 0.05, sfx: "pop", vol: 0.14 }, { t: 0.2, sfx: "pop", vol: 0.12 }, { t: 0.35, sfx: "pop", vol: 0.14 },
      { t: rel(id, W(14)) + 0.02, sfx: "whoosh-short", vol: 0.18 }, { t: rel(id, W(14)) + 0.12, sfx: "click-soft", vol: 0.18 }, { t: rel(id, W(14)) + 0.28, sfx: "click-soft", vol: 0.16 },
      { t: rel(id, W(18)) - 0.02, sfx: "whoosh", vol: 0.2, max: 0.7 },
      { t: rel(id, W(19)) - 0.05, sfx: "impact-bass-1", vol: 0.22 }, { t: rel(id, W(19)) + 0.0, sfx: "pop", vol: 0.16 },
      { t: rel(id, W(21)) - 0.05, sfx: "click-soft", vol: 0.2 },
    ],
  });
}

// ================= s03 · te buscan desde la parada, con hambre =================
{
  const id = "s03-parada";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-cinematic", vol: 0.24, max: 0.9 }, { t: 0.32, sfx: "pop", vol: 0.16 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(rel(id, W(24)) + i * 0.13), sfx: "key-press", vol: 0.2 })),
      { t: rel(id, W(28)) - 0.05, sfx: "pop", vol: 0.2 },
    ],
  });
}

// ================= s04 · pantalla en blanco · uno, dos, tres =================
{
  const id = "s04-blanco";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.12, sfx: "whoosh-cinematic", vol: 0.24, max: 0.8 }, { t: 0.45, sfx: "pop", vol: 0.16 },
      { t: rel(id, W(32)), sfx: "tic", vol: 0.6 }, { t: rel(id, W(33)), sfx: "tic", vol: 0.6 }, { t: rel(id, W(34)), sfx: "tic", vol: 0.65 },
      { t: rel(id, W(32)) + 0.02, sfx: "pop", vol: 0.12 }, { t: rel(id, W(33)) + 0.02, sfx: "pop", vol: 0.12 },
      { t: rel(id, W(34)) + 0.04, sfx: "glitch-1", vol: 0.14, max: 0.4 },
    ],
  });
}

// ================= s05 · vuelve atrás, elige otro =================
{
  const id = "s05-atras";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0.05, sfx: "click", vol: 0.26 }, { t: 0.14, sfx: "whoosh-short", vol: 0.2 },
      { t: rel(id, W(37)) + 0.08, sfx: "click-soft", vol: 0.24 }, { t: rel(id, W(38)), sfx: "whoosh", vol: 0.14, max: 0.6 },
    ],
  });
}

// ================= s06 · y nunca te avisa que se fue (tu local, la campanita que no suena) =================
{
  const id = "s06-avisa";
  escena(id, {
    html: `
      ${leads(lead(1, 800, 1560, 800, 1150, ""))}
      ${pill(1, 800, 1610, "0 avisos", "")}`,
    js: `
      nota(1, ${r2(rel(id, W(43)) - 0.05)});
      fuera(".n1, .l1, .d1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: -0.15, sfx: "whoosh-cinematic", vol: 0.24, max: 1.0 }, { t: 0.42, sfx: "pop", vol: 0.16 }, { t: 0.62, sfx: "pop", vol: 0.14 },
      { t: rel(id, W(43)) - 0.02, sfx: "ping", vol: 0.08, max: 0.18 },
    ],
  });
}

// ================= s07 · perdiste la venta antes de mostrar nada (la caja de pizza que no se abre) =================
{
  const id = "s07-venta";
  escena(id, {
    css: `P .sello { left: 540px; top: 1560px; font-size: 92px; }`,
    html: `<div class="sello sx">VENTA PERDIDA</div>`,
    js: `
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".sx", ${r2(rel(id, W(52)) - 0.05)}, -6);`,
    sfx: [
      { t: 0.15, sfx: "pop", vol: 0.18 }, { t: 0.38, sfx: "impact-bass-2", vol: 0.16 },
      { t: rel(id, W(49)) + 0.02, sfx: "click-soft", vol: 0.22 }, { t: rel(id, W(49)) + 0.5, sfx: "impact-bass-2", vol: 0.2 },
      { t: rel(id, W(52)) - 0.05, sfx: "glitch-1", vol: 0.07, max: 0.35 }, { t: rel(id, W(52)) + 0.1, sfx: "impact-bass-1", vol: 0.035, max: 0.6 },
    ],
  });
}

// ================= s08 · pasa con páginas viejas o pesadas (los marcos que aplastan el celular) =================
{
  const id = "s08-pesadas";
  // marcos que caen (tres.js: CAIDAS)
  const caidas = [0, 1, 2, 3].map((k) => r2(W(57) + 0.05 + k * 0.2));
  escena(id, {
    html: `
      ${leads(lead(1, 790, 1560, 690, 1330, "r"))}
      ${pill(1, 790, 1610, "Fotos pesadas", "r")}`,
    js: `
      nota(1, ${r2(rel(id, W(58)) + 0.05)});
      fuera(".n1, .l1, .d1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: rel(id, W(55)) + 0.05, sfx: "glitch-2", vol: 0.1, max: 0.3 },
      ...caidas.map((c, k) => ({ t: rel(id, c + 0.16), sfx: "impact-bass-2", vol: 0.018 + k * 0.004, max: k < 3 ? 0.35 : 0.5 })),
    ],
  });
}

// ================= s09 · en Scalerics hacemos tu página rápida en el celular =================
{
  const id = "s09-rapida";
  escena(id, {
    css: `P .pill.s { font-size: 52px; }`,
    html: `${pill(1, 540, 1640, "Scalerics", "lleno s")}`,
    js: `
      nota(1, 0.9);
      fuera(".n1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: 0.08, sfx: "scan", vol: 1.0, max: 0.8 }, { t: 0.5, sfx: "pop", vol: 0.14 }, { t: 0.65, sfx: "pop", vol: 0.14 }, { t: 0.8, sfx: "pop", vol: 0.14 },
      { t: 0.95, sfx: "whoosh-short", vol: 0.18 },
      { t: rel(id, W(64)), sfx: "sparkle", vol: 0.24 }, { t: rel(id, W(64)) + 0.05, sfx: "pop", vol: 0.18 },
    ],
  });
}

// ================= s10 · misma parada: abre al toque (el cronómetro frena en verde) =================
{
  const id = "s10-abre";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.12, sfx: "whoosh-cinematic", vol: 0.24, max: 0.9 }, { t: 0.4, sfx: "pop", vol: 0.16 }, { t: 0.55, sfx: "pop", vol: 0.14 },
      { t: rel(id, W(70)), sfx: "click", vol: 0.24 }, { t: rel(id, W(70)) + 0.22, sfx: "click", vol: 0.26 }, { t: rel(id, W(70)) + 0.26, sfx: "chime", vol: 0.2, max: 0.9 },
      { t: rel(id, W(72)), sfx: "whoosh", vol: 0.18, max: 0.7 },
    ],
  });
}

// ================= s11 · con horario, fotos y WhatsApp (la página abre entera) + la caja abierta =================
{
  const id = "s11-pagina";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: rel(id, W(74)), sfx: "pop", vol: 0.2 }, { t: rel(id, W(74)) + 0.05, sfx: "click-soft", vol: 0.16 },
      { t: rel(id, W(75)), sfx: "pop", vol: 0.2 }, { t: rel(id, W(75)) + 0.05, sfx: "click-soft", vol: 0.16 },
      { t: rel(id, W(77)), sfx: "pop", vol: 0.2 }, { t: rel(id, W(77)) + 0.05, sfx: "ping", vol: 0.2 },
      { t: rel(id, W(77)) + 0.42, sfx: "sparkle", vol: 0.2 },
    ],
  });
}

// ================= s12 · ¿cuánto tarda la tuya? (el cronómetro con el "?") =================
{
  const id = "s12-tuya";
  escena(id, {
    css: `
    P .pq { position: absolute; left: 0; right: 0; top: 190px; text-align: center; ${TIT} font-size: 118px; }
    P .pq em { font-style: normal; color: ${G}; }`,
    html: `<div class="pq"><div>¿Cuánto tarda</div><div><em>la tuya?</em></div></div>`,
    js: `
      tl.fromTo(q(".pq"), { scale: 1.2, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.24, ease: "power4.out", immediateRender: true }, 0);
      late(".pq em", ${r2(rel(id, W(81)))}, 1.08);
      tl.to(q(".pq"), { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, ${r2(rel(id, W(82)) - 0.12)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh-short", vol: 0.2 }, { t: 0.12, sfx: "pop", vol: 0.18 },
      { t: 0.55, sfx: "tic", vol: 0.3 }, { t: 1.25, sfx: "tic", vol: 0.25 },
    ],
  });
}

// ================= s13 · cierre: videollamada gratis en scalerics.com (fondo verde) =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 170px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 316px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; background: ${NAVY}; border-radius: 22px; }
    P .t3w { position: absolute; left: 0; right: 0; top: 1470px; text-align: center; }
    P .t3 { display: inline-block; padding: 26px 50px 32px; border-radius: 34px; background: ${NAVY}; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; box-shadow: 0 12px 0 rgba(11,18,32,0.25); }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, 0.02);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(rel(id, W(85)) - 0.1)});
      tl.fromTo(q(".t3w"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(rel(id, W(86)) - 0.15)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(rel(id, W(87)) + 0.35)});`,
    sfx: [{ t: -0.05, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.35, sfx: "pop", vol: 0.16 }, { t: rel(id, W(85)), sfx: "click-soft", vol: 0.24 }, { t: rel(id, W(86)) - 0.15, sfx: "chime", vol: 0.3, max: 1.4 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
