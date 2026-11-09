// Generador de las escenas HTML de reels/por-que-se-fue (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/por-que-buscando (fondo navy oscuro en este reel). Los objetos son 3D de verdad y
// viven en assets/tres.js (una sola escena Three.js); estas escenas son SOLO la capa plana de arriba: el gancho en
// grande, 1-2 rótulos, el crédito del estudio y la tarjeta de cierre.
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
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${CR}; font: 700 54px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(0,0,0,0.28); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.nom { font-size: 54px; padding: 14px 32px 15px; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.5); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${RED}; border-radius: 22px; font: 900 92px/1 "Lexend", sans-serif; letter-spacing: 0.02em; color: ${RED}; background: rgba(239,238,229,0.92); opacity: 0; white-space: nowrap; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => { const el = typeof s === "string" ? qa(s) : s; tl.set(el, { opacity: 1 }, t); tl.fromTo(el, { scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { scale: 1, duration: d ?? 0.3, ease: "back.out(1.8)", immediateRender: false }, t); };
      const fuera = (s, t, d) => tl.set(typeof s === "string" ? qa(s) : s, { opacity: 0 }, t + (d ?? 0.2));
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t + 0.2, 0.2); } pop(".n" + k, t); };
      const sinNota = (k, t) => tl.to(qa(".n" + k + ", .l" + k + ", .d" + k), { opacity: 0, duration: 0.08, ease: "power1.in" }, t);
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


// Sobre navy: texto crema, la palabra clave en recuadro verde (texto navy) o rojo apagado (el problema).
const TIT = `font: 900 118px/1.04 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.04em;`;
const marca = (txt, kind = "") => `<span class="mk ${kind}"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 24px; margin: 0 4px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 12px; bottom: 0px; background: ${G}; border-radius: 14px; }
    P .mk.r .fondo { background: ${RED}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; }
    P .mk.r em { color: #fff; }`;
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });
const T = (i) => r2(pal[i].start);
// rótulo con línea guía: aparece en t (relativo), se va al final de la escena
const rotulo = (id, k, t, fin) => `nota(${k}, ${r2(t)}); sinNota(${k}, ${r2(fin ?? ESC[id] - 0.25)});`;

// ================= s01 · gancho (cuadro 0 = portada): la góndola con el hueco =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; ${TIT} }
    P .h1 { top: 82px; font-size: 100px; font-weight: 800; letter-spacing: -0.03em; } P .h2 { top: 206px; font-size: 140px; color: ${RED}; } P .h3 { top: 356px; font-size: 140px; }`,
    html: `
      <div class="h h1">Vino por su ${marca("yerba")}.</div>
      <div class="h h2">No había.</div>
      <div class="h h3">¿Qué hizo?</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h1 .mk", ${w(id, 3)}, 1.06);
      late(".h2", ${w(id, 4)}, 1.08);
      late(".h3", ${w(id, 6)}, 1.06);
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: 0, sfx: "whoosh-cine-corto", vol: 0.1, max: 0.8 },
      { t: w(id, 3) - 0.02, sfx: "pop", vol: 0.1 },
      { t: w(id, 4) + 0.02, sfx: "tic-real", vol: 0.4 }, { t: w(id, 4) + 0.06, sfx: "glitch-1", vol: 0.12, max: 0.25 },
      { t: w(id, 6) - 0.1, sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 6) + 0.02, sfx: "pop", vol: 0.12 },
    ],
  });
}

// ================= s02 · casi un tercio se va a otro lado (se rebana el paquete; la tajada entra a la puerta de al lado) =================
{
  const id = "s02-otro-lado";
  escena(id, {
    html: `${pill(1, 540, 1640, "Compra en otro local", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 15) - 0.1)}); sinNota(1, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: 0.1, sfx: "pop", vol: 0.09 }, { t: 0.15, sfx: "tic-real", vol: 0.22 },
      { t: w(id, 10) - 0.05, sfx: "whoosh-cinematic", vol: 0.13, max: 0.9 },
      { t: w(id, 11) + 0.1, sfx: "puerta", vol: 1.0, max: 0.8 }, { t: w(id, 11) + 0.2, sfx: "campanita", vol: 0.26, max: 1.0 },
      { t: w(id, 11) + 0.6, sfx: "sello", vol: 0.22 },
      { t: w(id, 15) - 0.1, sfx: "click-soft", vol: 0.12 },
    ],
  });
}

// ================= s03 · otros cambian de marca o esperan (canasta y almanaque) =================
{
  const id = "s03-marca";
  const tC = w(id, 21) + 0.1, tE = w(id, 23);
  escena(id, {
    html: `${leads(lead(1, 230, 490, 230, 1010), lead(2, 420, 620, 420, 1010), lead(3, 830, 490, 830, 560))}
      ${pill(1, 330, 450, "26 % otra marca", "nom")}${pill(2, 400, 580, "19 % otra versión", "nom")}${pill(3, 820, 440, "15 % espera", "nom")}`,
    js: `nota(1, ${r2(tC)}); nota(2, ${r2(tC + 0.12)}); nota(3, ${r2(tE)}); sinNota(1, ${r2(ESC[id] - 0.4)}); sinNota(2, ${r2(ESC[id] - 0.4)}); sinNota(3, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh-cinematic", vol: 0.14, max: 0.7 },
      { t: w(id, 21) - 0.1, sfx: "whoosh-short", vol: 0.1 }, { t: w(id, 21) + 0.12, sfx: "papel", vol: 0.9, max: 0.5 }, { t: w(id, 21) + 0.2, sfx: "papel", vol: 0.24, max: 0.5 },
      { t: w(id, 21) + 0.15, sfx: "pop", vol: 0.1 }, { t: w(id, 21) + 0.25, sfx: "pop", vol: 0.09 },
      { t: tE, sfx: "tic-real", vol: 0.24 }, { t: tE + 0.12, sfx: "papel", vol: 0.28, max: 0.4 }, { t: tE + 0.4, sfx: "papel", vol: 0.26, max: 0.4 },
    ],
  });
}

// ================= s04 · nueve de cada cien no compran nada (la canasta vacía) + crédito del estudio =================
{
  const id = "s04-nada";
  const t9 = r2(Math.max(w(id, 25) - 0.05, 0.45));
  escena(id, {
    css: `P .cred { position: absolute; left: 540px; top: 1588px; transform: translateX(-50%); padding: 14px 28px 15px; border-radius: 18px; background: ${CR}; font: 600 44px/1.25 "Lexend", sans-serif; text-align: center; letter-spacing: -0.01em; color: ${NAVY}; white-space: nowrap; opacity: 0; }`,
    html: `<div class="cred">Estudio mundial de faltantes · 2002<br>más de 70.000 compradores · 29 países</div>`,
    js: `tl.set(q(".cred"), { opacity: 1 }, ${t9}); tl.fromTo(q(".cred"), { y: 24 }, { y: 0, duration: 0.2, ease: "power3.out", immediateRender: false }, ${t9}); tl.to(q(".cred"), { opacity: 0, duration: 0.12, ease: "power1.in" }, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.12 },
      { t: t9 - 0.02, sfx: "pop", vol: 0.1 }, { t: t9, sfx: "sello", vol: 0.24 }, { t: w(id, 29) + 0.05, sfx: "papel", vol: 0.2, max: 0.4 },
      { t: w(id, 31) - 0.02, sfx: "golpe", vol: 0.3, max: 0.5 }, { t: w(id, 31), sfx: "sparkle", vol: 0.05, max: 0.5 },
    ],
  });
}

// ================= s05 · y suele faltar lo que más se vende (las barras de ventas) =================
{
  const id = "s05-lo-que-mas";
  escena(id, {
    html: `${leads(lead(1, 555, 640, 545, 640, "r"))}${pill(1, 795, 640, "El más vendido", "rl nom")}`,
    js: `nota(1, ${r2(w(id, 39) - 0.05)}); sinNota(1, ${r2(ESC[id] + 0.3)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cinematic", vol: 0.14, max: 0.8 },
      ...[0, 1, 2, 3, 4, 5].map((k) => ({ t: r2(w(id, 34) - 0.12 + k * 0.07), sfx: k % 2 ? "tic-real" : "pop", vol: k % 2 ? 0.2 : 0.08 })),
      { t: w(id, 37) - 0.2, sfx: "riser-corto", vol: 0.06, max: 0.5 },
      { t: w(id, 39) - 0.02, sfx: "impact-bass-1", vol: 0.08, max: 0.4 },
    ],
  });
}

// ================= s06 · ¿Por qué? (el "?") · sale tan rápido (la pila) =================
{
  const id = "s06-por-que";
  vacia(id, [
    { t: -0.08, sfx: "whoosh-short", vol: 0.05 }, { t: 0.0, sfx: "pop", vol: 0.1 }, { t: 0.04, sfx: "sparkle", vol: 0.05, max: 0.6 },
    { t: w(id, 42) - 0.15, sfx: "whoosh-short", vol: 0.12 },
    ...[0, 1, 2, 3].map((k) => ({ t: r2(w(id, 42) - 0.04 + k * 0.08), sfx: "pop", vol: 0.08 })),
    // un tic por cada número del contador (12 → 1); el 0 tiene su golpe en s07
    ...Array.from({ length: 11 }, (_, k) => ({ t: r2(w(id, 44) - 0.05 + (T(47) - T(44) + 0.05) * (k / 11)), sfx: k % 2 ? "tac-real" : "tic-real", vol: 0.16 })),
  ]);
}

// ================= s07 · que se acaba antes de pedirlo (contador en 0, la notita llega tarde) =================
{
  const id = "s07-rapido";
  const t0 = r2(Number((pal[47].start - INI[id]).toFixed(2)));
  escena(id, {
    html: `${pill(1, 540, 1640, "Se vacía antes del pedido", "rl")}`,
    js: `nota(1, ${r2(w(id, 50) + 0.1)}); sinNota(1, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: t0, sfx: "glitch-1", vol: 0.12, max: 0.3 }, { t: t0 + 0.02, sfx: "tic-real", vol: 0.4 },
      { t: t0 + 0.14, sfx: "whoosh-short", vol: 0.14 }, { t: t0 + 0.52, sfx: "sello", vol: 0.42 },
      { t: ESC[id] - 0.45, sfx: "whoosh-cinematic", vol: 0.14, max: 0.8 },
    ],
  });
}

// ================= s08 · a Rubén le pasa con la yerba del sábado (el almacén) =================
{
  const id = "s08-ruben";
  escena(id, {
    html: `${pill(1, 640, 600, "Rubén", "nom")}`,
    js: `pop(".n1", 0.25); fuera(".n1", ${r2(ESC[id] - 0.3)}, 0.1);`,
    sfx: [
      { t: 0.02, sfx: "campanita", vol: 0.26, max: 1.0 }, { t: 0.25, sfx: "pop", vol: 0.08 },
      { t: 0.55, sfx: "tic-real", vol: 0.3 }, { t: 0.6, sfx: "glitch-1", vol: 0.08, max: 0.2 },
      { t: w(id, 59) - 0.04, sfx: "tac-real", vol: 0.2 },
    ],
  });
}

// ================= s09 · su sistema a medida le avisa el martes (la pizarra rebobina, la tablet) =================
{
  const id = "s09-aviso";
  escena(id, {
    html: `${pill(1, 380, 1590, "Sistema a medida", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 61))}); sinNota(1, ${r2(ESC[id] - 0.35)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cinematic", vol: 0.16, max: 0.9 }, { t: 0.2, sfx: "papel", vol: 0.24, max: 0.4 },
      { t: w(id, 61), sfx: "pop", vol: 0.1 }, { t: w(id, 61) + 0.02, sfx: "click-soft", vol: 0.14 },
      { t: w(id, 65) - 0.05, sfx: "notification", vol: 0.16, max: 0.9 },
      { t: w(id, 66), sfx: "tic-real", vol: 0.22 },
    ],
  });
}

// ================= s10 · quedan pocas. Pide a tiempo (Pedir ✓, llega la caja, se llena el hueco) =================
{
  const id = "s10-pide";
  const caja = w(id, 72) + 0.18;
  vacia(id, [
    { t: 0.0, sfx: "tic-real", vol: 0.16 },
    { t: w(id, 70) + 0.0, sfx: "click", vol: 0.2 }, { t: w(id, 70) + 0.04, sfx: "ding", vol: 0.12, max: 0.8 },
    { t: caja - 0.12, sfx: "whoosh-short", vol: 0.14 }, { t: caja + 0.3, sfx: "golpe", vol: 0.32, max: 0.5 }, { t: caja + 0.33, sfx: "papel", vol: 0.3, max: 0.5 },
    { t: caja + 0.56, sfx: "pop", vol: 0.1 },
  ]);
}

// ================= s11 · el sábado, Graciela encuentra la suya =================
{
  const id = "s11-encuentra";
  escena(id, {
    html: `${pill(1, 300, 600, "Graciela", "nom")}`,
    js: `pop(".n1", ${r2(w(id, 75))}); fuera(".n1", ${r2(ESC[id] - 0.25)}, 0.1);`,
    sfx: [
      { t: -0.06, sfx: "whoosh-short", vol: 0.12 }, { t: 0.4, sfx: "campanita", vol: 0.12, max: 0.8 },
      { t: w(id, 75) + 0.05, sfx: "pop", vol: 0.08 }, { t: w(id, 75) + 0.12, sfx: "papel", vol: 0.24, max: 0.4 },
      { t: w(id, 76) + 0.05, sfx: "pop", vol: 0.1 }, { t: w(id, 76) + 0.07, sfx: "ding", vol: 0.12, max: 0.9 },
    ],
  });
}

// ================= s12 · ¿querés que no te falte? (la góndola del gancho, llena) =================
vacia("s12-queres", [
  { t: -0.06, sfx: "whoosh-short", vol: 0.12 }, { t: 0.25, sfx: "pop", vol: 0.1 }, { t: 0.37, sfx: "pop", vol: 0.09 },
  { t: 0.45, sfx: "ding", vol: 0.1, max: 0.8 },
]);

// ================= s13 · cierre: videollamada gratis en scalerics.com (fondo verde, letras navy) =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font: 900 124px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 300px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 124px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 486px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; font: 900 106px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 87) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 89) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.1 },
      { t: w(id, 87) - 0.02, sfx: "key-press", vol: 0.12 }, { t: w(id, 89) - 0.03, sfx: "chime", vol: 0.1, max: 1.0 },
    ],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
