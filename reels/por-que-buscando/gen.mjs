// Generador de las escenas HTML de reels/por-que-buscando (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/por-que-seis (fondo crema) y reels/por-que-dos-sellos. Los objetos son 3D de verdad y
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
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${NAVY}; font: 700 46px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.18); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${NAVY}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
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


// Sobre crema: texto navy, la palabra clave en recuadro verde (texto navy) o rojo apagado (el problema).
const TIT = `font: 900 112px/1.04 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.04em;`;
const marca = (txt, kind = "") => `<span class="mk ${kind}"><b class="selbox ${kind === "r" ? "r" : ""}" style="opacity:1">${esquinas}</b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 22px; margin: 0 6px; }
    P .mk .selbox { position: absolute; left: 0; right: 0; top: 10px; bottom: 2px; }
    P .mk em { position: relative; font-style: normal; }`;
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });

// ================= s01 · gancho (cuadro 0 = portada): el celular gigante "Buscando…" =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; ${TIT} }
    P .h0 { top: 96px; font-size: 76px; font-weight: 800; letter-spacing: -0.03em; } P .h1 { top: 190px; } P .h2 { top: 308px; } P .h3 { top: 430px; font-size: 120px; }`,
    html: `
      <div class="h h0">¿Por qué algunas páginas</div>
      <div class="h h1">te muestran</div>
      <div class="h h2">que están</div>
      <div class="h h3">${marca("“buscando”")}?</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h3 .mk", ${r2(w(id, 8))}, 1.12);
      // el gancho se va (4-5 cuadros) antes de que entre el primer subtítulo
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: 0, sfx: "whoosh-cine-corto", vol: 0.1, max: 0.8 },
      { t: w(id, 8) - 0.04, sfx: "pop", vol: 0.12 }, { t: w(id, 8) - 0.02, sfx: "tic-real", vol: 0.3 },
      ...[0.5, 1.4, 2.2].map((x) => ({ t: x, sfx: "tic", vol: 0.06 })),
    ],
  });
}

// ================= s02 · hay gente que hasta prefiere esa espera (cae el sello PREFERIDA) =================
vacia("s02-prefiere", [
  { t: w("s02-prefiere", 11) + 0.05, sfx: "pop", vol: 0.1 }, { t: w("s02-prefiere", 11) + 0.06, sfx: "tic-real", vol: 0.26 },
  { t: w("s02-prefiere", 13) - 0.16, sfx: "whoosh-short", vol: 0.12 }, { t: w("s02-prefiere", 13) + 0.0, sfx: "sello", vol: 0.5 },
  { t: w("s02-prefiere", 15) - 0.05, sfx: "pop", vol: 0.1 }, { t: w("s02-prefiere", 15) - 0.04, sfx: "tic-real", vol: 0.26 },
]);

// ================= s03 · lo probaron con una página de viajes (despega el avión) + crédito =================
{
  const id = "s03-viajes";
  escena(id, {
    css: `P .cred { position: absolute; left: 540px; top: 1636px; transform: translateX(-50%); padding: 12px 26px 13px; border-radius: 16px; background: ${CR}; font: 500 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${NAVY}; white-space: nowrap; opacity: 0; border: 4px solid ${NAVY}; }`,
    html: `<div class="cred">Experimento · Buell y Norton, 2011</div>`,
    js: `tl.set(q(".cred"), { opacity: 1 }, ${r2(w(id, 17))}); tl.fromTo(q(".cred"), { y: 24 }, { y: 0, duration: 0.2, ease: "power3.out", immediateRender: false }, ${r2(w(id, 17))}); fuera(".cred", ${r2(ESC[id] - 0.25)}, 0.1);`,
    sfx: [
      { t: 0.02, sfx: "whoosh-short", vol: 0.14 }, { t: 0.3, sfx: "click-soft", vol: 0.12 },
      { t: w(id, 17), sfx: "key-press", vol: 0.1 },
      { t: w(id, 20) - 0.15, sfx: "whoosh-cinematic", vol: 0.16, max: 1.5 },
    ],
  });
}

// ================= s04 · a unos, los vuelos al instante (rayo) =================
{
  const id = "s04-instante";
  escena(id, {
    html: `${pill(1, 300, 1590, "Al instante", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 28))}); sinNota(1, ${r2(ESC[id] - 0.28)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.14 }, { t: 0.18, sfx: "pop", vol: 0.08 },
      { t: w(id, 26) - 0.06, sfx: "flash", vol: 0.22 }, { t: w(id, 26) - 0.04, sfx: "pop", vol: 0.1 },
      { t: w(id, 28) - 0.05, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 28), sfx: "flash", vol: 0.16 }, { t: w(id, 28) + 0.02, sfx: "pop", vol: 0.1 },
    ],
  });
}

// ================= s05 · a otros, esperar viendo cada aerolínea revisada (reloj de arena) =================
{
  const id = "s05-aerolinea";
  const tt = [0.25, w(id, 32) + 0.05, w(id, 34) - 0.02, w(id, 35) - 0.12, w(id, 35) + 0.3];
  escena(id, {
    html: `${pill(1, 600, 1600, "Se ve el trabajo", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 34) - 0.1)}); sinNota(1, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.2, sfx: "whoosh-short", vol: 0.14 }, { t: 0.08, sfx: "pop", vol: 0.09 },
      { t: w(id, 31) - 0.05, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 31) + 0.3, sfx: "sello", vol: 0.16 },
      ...tt.flatMap((x) => [{ t: r2(x), sfx: "tic-real", vol: 0.28 }, { t: r2(x + 0.01), sfx: "pop", vol: 0.07 }]),
      { t: w(id, 35) + 0.45, sfx: "ding", vol: 0.08, max: 0.6 },
    ],
  });
}

// ================= s06 · mismos vuelos (tarjetas "=") · y la espera se valoraba más (balanza) =================
{
  const id = "s06-mismos";
  escena(id, {
    css: `P .sello { left: 540px; top: 1500px; transform: translate(-50%, -50%); border-color: ${NAVY}; color: ${NAVY}; font-size: 60px; background: ${G}; }`,
    html: `<div class="sello">MISMO RESULTADO</div>`,
    js: `sello(".sello", ${r2(w(id, 37) - 0.2)}, -4); tl.set(q(".sello"), { opacity: 0 }, ${r2(w(id, 38) - 0.15)});`,
    sfx: [
      { t: 0.02, sfx: "whoosh-short", vol: 0.12 }, { t: 0.05, sfx: "papel", vol: 0.3, max: 0.5 }, { t: 0.12, sfx: "papel", vol: 0.24, max: 0.5 },
      { t: w(id, 37) - 0.05, sfx: "pop", vol: 0.1 }, { t: w(id, 37) - 0.2, sfx: "sello", vol: 0.4 },
      { t: w(id, 38) - 0.15, sfx: "whoosh-cine-corto", vol: 0.14, max: 0.8 }, { t: w(id, 38) - 0.03, sfx: "pop", vol: 0.1 },
      { t: w(id, 38) + 0.45, sfx: "sello", vol: 0.22 },
      { t: w(id, 42) - 0.12, sfx: "impact-bass-1", vol: 0.1, max: 0.8 },
      { t: w(id, 43) - 0.04, sfx: "pop", vol: 0.1 }, { t: w(id, 43), sfx: "ding", vol: 0.1, max: 0.9 },
    ],
  });
}

// ================= s07 · ¿Por qué? (la arena arma el "?") · vieron el trabajo (la lupa) =================
{
  const id = "s07-por-que";
  escena(id, {
    html: `${pill(1, 540, 1610, "Esfuerzo a la vista", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 51) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.5)});`,
    sfx: [
      { t: -0.3, sfx: "riser-corto", vol: 0.12, max: 0.6 }, { t: 0.08, sfx: "pop", vol: 0.12 }, { t: 0.1, sfx: "sparkle", vol: 0.08, max: 0.7 },
      { t: w(id, 46) - 0.15, sfx: "whoosh-short", vol: 0.14 },
      { t: w(id, 47) - 0.02, sfx: "tic-real", vol: 0.28 }, { t: w(id, 48) + 0.15, sfx: "tic-real", vol: 0.28 },
      { t: w(id, 51) - 0.08, sfx: "pop", vol: 0.12 }, { t: w(id, 51) - 0.05, sfx: "sello", vol: 0.3 }, { t: w(id, 51) + 0.02, sfx: "ding", vol: 0.1, max: 0.8 },
      { t: ESC[id] - 0.45, sfx: "whoosh-cinematic", vol: 0.14, max: 0.8 },
    ],
  });
}

// ================= s08 · Rubén arma cada pedido con cuidado (el almacén, la bolsa) =================
{
  const id = "s08-ruben";
  escena(id, {
    css: `P .nom { font-size: 44px; padding: 12px 28px 13px; }`,
    html: `${pill(1, 300, 640, "Rubén", "nom")}${pill(2, 540, 1600, "Pedido de Graciela", "lleno grande")}`,
    js: `pop(".n1", 0.75); fuera(".n1", ${r2(ESC[id] - 0.3)}, 0.1); pop(".n2", ${r2(w(id, 55))}); fuera(".n2", ${r2(ESC[id] - 0.3)}, 0.1);`,
    sfx: [
      { t: -0.04, sfx: "campanita", vol: 0.22, max: 1.0 }, { t: 0.1, sfx: "papel", vol: 0.3, max: 0.6 },
      ...[53, 54, 55, 57].flatMap((i, k) => [{ t: r2(w(id, i) - 0.05 - 0.3), sfx: "pop", vol: 0.08 }, { t: r2(w(id, i) - (k === 3 ? 0.02 : 0.05)), sfx: k % 2 ? "burbuja" : "papel", vol: k % 2 ? 0.2 : 0.22, max: 0.4 }]),
      { t: w(id, 55), sfx: "pop", vol: 0.09 },
    ],
  });
}

// ================= s09 · pero el que pidió por WhatsApp no ve nada (Graciela, el reloj) =================
{
  const id = "s09-no-ve";
  escena(id, {
    css: `P .nom { font-size: 44px; padding: 12px 28px 13px; }`,
    html: `${pill(1, 250, 1600, "Sin noticias", "rl grande")}`,
    js: `nota(1, ${r2(w(id, 66) + 0.02)}); sinNota(1, ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh-short", vol: 0.14 }, { t: 0.12, sfx: "pop", vol: 0.08 },
      ...[0.35, 0.65, 0.95, 1.25, 1.55].map((x, k) => ({ t: x, sfx: k % 2 ? "tac-real" : "tic-real", vol: 0.24 })),
      { t: w(id, 66) + 0.02, sfx: "tic-real", vol: 0.42 }, { t: w(id, 66) + 0.05, sfx: "pop", vol: 0.1 },
    ],
  });
}

// ================= s10 · lo automatizamos: recibimos tu pedido =================
{
  const id = "s10-avisos";
  escena(id, {
    html: `${pill(1, 270, 1480, "Automatizado", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 68) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 68) + 0.05, sfx: "click-soft", vol: 0.14 }, { t: w(id, 68) + 0.1, sfx: "sparkle", vol: 0.06, max: 0.6 },
      { t: w(id, 69) - 0.47, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 69) - 0.05, sfx: "notification", vol: 0.14, max: 0.9 },
    ],
  });
}

// ================= s11 · lo estamos armando, salió (Nico se lleva la bolsa) =================
vacia("s11-salio", [
  { t: w("s11-salio", 74) - 0.25, sfx: "papel", vol: 0.26, max: 0.5 },
  { t: w("s11-salio", 74) - 0.47, sfx: "whoosh-short", vol: 0.1 }, { t: w("s11-salio", 74) - 0.05, sfx: "notification", vol: 0.13, max: 0.9 },
  { t: w("s11-salio", 75) - 0.44, sfx: "whoosh-short", vol: 0.1 }, { t: w("s11-salio", 75) - 0.02, sfx: "notification", vol: 0.13, max: 0.9 },
  ...[0.0, 0.26, 0.52].map((x, k) => ({ t: r2(w("s11-salio", 74) + 0.05 - 0.55 + x), sfx: k % 2 ? "tac-real" : "tic-real", vol: 0.14 })),
  ...[0.3, 0.56, 0.82, 1.08].map((x, k) => ({ t: r2(w("s11-salio", 75) + x), sfx: k % 2 ? "tac-real" : "tic-real", vol: 0.14 })),
]);

// ================= s12 · ¿querés que se vea tu trabajo? (Graciela recibe "¡Llegó!") =================
vacia("s12-se-vea", [
  { t: -0.08, sfx: "whoosh-short", vol: 0.14 }, { t: 0.2, sfx: "notification", vol: 0.13, max: 0.9 },
  { t: w("s12-se-vea", 79) - 0.04, sfx: "burbuja", vol: 0.22 }, { t: w("s12-se-vea", 79), sfx: "pop", vol: 0.08 },
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
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 85) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 87) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.4, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.1 },
      ...[0, 1, 2, 3].map((k) => ({ t: r2(0.12 + k * 0.13), sfx: "tic-real", vol: 0.18 })), { t: 0.72, sfx: "ding", vol: 0.08, max: 0.8 },
      { t: w(id, 85) - 0.02, sfx: "key-press", vol: 0.12 }, { t: w(id, 87) - 0.03, sfx: "chime", vol: 0.09, max: 1.8 }, { t: w(id, 87) - 0.03, sfx: "click-soft", vol: 0.08 },
    ],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
