// Generador de las escenas HTML de reels/por-que-seis (base: caso-pedidosya) (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/netflix-blockbuster. Los objetos son 3D de verdad y viven en
// assets/tres.js (una sola escena Three.js, la cámara viaja sin cortes); estas escenas son SOLO la
// capa plana de arriba: el gancho en grande, 1-2 rótulos con línea guía, sellos y el cierre.
// PedidosYa se nombra en texto: ni logo, ni su rojo, ni su tipografía.
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
const TIT = `font: 900 132px/1.04 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.04em;`;
const marca = (txt, kind = "") => `<span class="mk ${kind}"><b class="selbox ${kind === "r" ? "r" : ""}" style="opacity:1">${esquinas}</b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 22px; margin: 0 6px; }
    P .mk .selbox { position: absolute; left: 0; right: 0; top: 10px; bottom: 2px; }
    P .mk em { position: relative; font-style: normal; }`;

// ================= s01 · gancho (cuadro 0 = portada): la mesa de 24 a pantalla llena =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; ${TIT} }
    P .h0 { top: 130px; font-size: 120px; } P .h1 { top: 262px; font-size: 112px; } P .h2 { top: 384px; font-size: 112px; } P .h3 { top: 506px; font-size: 112px; }`,
    html: `
      <div class="h h0">Con ${marca("24", "")}</div>
      <div class="h h1">mermeladas</div>
      <div class="h h2">se vendió ${marca("menos", "r")}</div>
      <div class="h h3">que con ${marca("6", "")}</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      tl.set(qa(".h"), { opacity: 0 }, ${r2(ESC[id] - 0.12)});`,
    sfx: [
      { t: 0, sfx: "whoosh-cine-corto", vol: 0.12, max: 0.9 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 2) + 0.06 + i * 0.09), sfx: i % 2 ? "burbuja" : "pop", vol: 0.07 })),
    ],
  });
}

// ================= s02 · vendieron menos que con seis (aparece la mesa chica) =================
{
  const id = "s02-seis";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto2", vol: 0.09, max: 0.7 }, { t: -0.05, sfx: "burbuja", vol: 0.1 },
      { t: w(id, 8) + 0.05, sfx: "glitch-1", vol: 0.05, max: 0.4 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 11) - 0.08 + i * 0.12), sfx: i % 2 ? "key-press" : "pop", vol: 0.06 })),
    ],
  });
}

// ================= s03 · ¿Por qué? (las mesas se van, la tapa vuela y se vuelve el "?") =================
{
  const id = "s03-porque";
  escena(id, {
    css: `P .pq { position: absolute; left: 0; right: 0; top: 230px; text-align: center; ${TIT} font-size: 150px; }`,
    html: `<div class="pq">¿Por qué?</div>
      ${pill(1, 540, 1640, "Estudio publicado en 2000", "lleno")}`,
    js: `
      tl.fromTo(q(".pq"), { scale: 1.2, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.16, ease: "power4.out", immediateRender: true }, 0);
      tl.set(q(".pq"), { opacity: 0 }, ${r2(w(id, 14) - 0.2)});
      nota(1, ${r2(w(id, 15))});`,
    sfx: [
      { t: -0.3, sfx: "whoosh-short", vol: 0.05, max: 0.5 }, { t: 0.05, sfx: "impact-bass-1", vol: 0.1 },
      { t: w(id, 14) - 0.1, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.6 },
      { t: r2(w(id, 14) + 0.03), sfx: "burbuja", vol: 0.08 }, { t: r2(w(id, 14) + 0.1), sfx: "pop", vol: 0.06 },
      { t: w(id, 15) + 0.1, sfx: "key-press", vol: 0.12 },
    ],
  });
}

// ================= s04 · la mesa grande atrajo más gente =================
{
  const id = "s04-gente";
  escena(id, {
    css: `P .pill.medio { font-size: 52px; padding: 16px 34px 18px; }`,
    html: `${leads(lead(1, 870, 560, 790, 640, "g"))}${pill(1, 870, 520, "Más gente", "lleno medio")}`,
    js: `nota(1, ${r2(w(id, 20) - 0.12)}); fuera(".n1, .l1, .d1", ${r2(ESC[id] - 0.48)}, 0.14);`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto2", vol: 0.1, max: 0.7 },
      ...[0, 1, 2, 3, 4].map((i) => ({ t: r2(w(id, 20) - 0.2 + i * 0.09), sfx: i % 2 ? "key-press" : "click-soft", vol: 0.08 })),
      { t: r2(w(id, 20) - 0.12), sfx: "burbuja", vol: 0.1 },
      { t: r2(ESC[id] - 0.5), sfx: "whoosh-cine-corto", vol: 0.1, max: 0.8 },
    ],
  });
}

// ================= s05 · pero compraron tres de cada cien =================
{
  const id = "s05-tres";
  escena(id, {
    html: `${pill(1, 540, 1690, "Mesa de 24", "rl")}`,
    js: `nota(1, 0.35); fuera(".n1", ${r2(ESC[id] - 0.3)}, 0.16);`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.7 }, { t: 0.04, sfx: "burbuja", vol: 0.1 }, { t: 0.35, sfx: "key-press", vol: 0.12 },
      { t: w(id, 25) - 0.05, sfx: "impact-bass-1", vol: 0.07, max: 0.5 }, { t: w(id, 25) - 0.04, sfx: "pop", vol: 0.1 },
      { t: w(id, 25) + 0.2, sfx: "pop", vol: 0.12 }, { t: w(id, 25) + 0.37, sfx: "burbuja", vol: 0.12 }, { t: w(id, 25) + 0.54, sfx: "pop", vol: 0.12 },
    ],
  });
}

// ================= s06 · con seis mermeladas, treinta (la canasta de la mesa chica se llena) =================
{
  const id = "s06-treinta";
  escena(id, {
    html: `${pill(1, 540, 1690, "Mesa de 6", "lleno")}`,
    js: `nota(1, 0.1); fuera(".n1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: -0.08, sfx: "whoosh-cine-corto2", vol: 0.09, max: 0.7 }, { t: 0.1, sfx: "key-press", vol: 0.12 },
      ...Array.from({ length: 5 }, (_, i) => ({ t: r2(w(id, 31) + 0.0 + i * 0.13), sfx: ["pop", "burbuja", "key-press"][i % 3], vol: 0.05 })),
      { t: w(id, 32) - 0.08, sfx: "ping", vol: 0.06, max: 0.6 }, { t: w(id, 32) - 0.07, sfx: "impact-bass-1", vol: 0.05, max: 0.4 },
    ],
  });
}

// ================= s07 · no les faltaban ganas (la cucharita sale cargada) =================
{
  const id = "s07-ganas";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.26, sfx: "whoosh-cine-corto", vol: 0.07, max: 0.6 },
      { t: 0.32, sfx: "click-soft", vol: 0.12 }, { t: w(id, 36) + 0.3, sfx: "sparkle", vol: 0.05, max: 0.5 },
    ],
  });
}

// ================= s08 · con tantas, costaba elegir · y se iban sin comprar =================
{
  const id = "s08-despues";
  escena(id, {
    css: `P .pill.m44 { font-size: 44px; padding: 14px 30px 16px; }`,
    html: `${pill(1, 540, 1650, "Sobre todo si no sabés qué querés", "m44")}`,
    js: `nota(1, 0.4);`,
    sfx: [
      { t: -0.6, sfx: "whoosh-cine-corto2", vol: 0.08, max: 0.7 },
      ...Array.from({ length: 4 }, (_, i) => ({ t: r2(-0.25 + i * 0.09), sfx: i % 2 ? "burbuja" : "pop", vol: 0.055 })),
      { t: w(id, 39) + 0.1, sfx: "key-press", vol: 0.14 }, { t: w(id, 40) + 0.1, sfx: "key-press", vol: 0.14 }, { t: w(id, 40) + 0.44, sfx: "key-press", vol: 0.14 },
    ],
  });
}

// ================= s08b · y se iban sin comprar (la canasta vacía se va) =================
{
  const id = "s08b-sin";
  escena(id, {
    css: `P .pill.m44 { font-size: 44px; padding: 14px 30px 16px; opacity: 1; }`,
    html: `${pill(1, 540, 1650, "Sobre todo si no sabés qué querés", "m44")}`,
    js: `fuera(".n1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: w(id, 42) + 0.1, sfx: "key-press", vol: 0.13 },
      { t: w(id, 43) - 0.05, sfx: "whoosh-short", vol: 0.1 },
      { t: r2(ESC[id] - 0.42), sfx: "whoosh-short", vol: 0.06, max: 0.5 },
    ],
  });
}

// ================= s09 · tu catálogo de WhatsApp: doscientas fotos sueltas =================
{
  const id = "s09-whatsapp";
  escena(id, {
    html: `${pill(1, 540, 1650, "Tu catálogo")}`,
    js: `nota(1, ${r2(w(id, 49))}); fuera(".n1", ${r2(ESC[id] - 0.22)}, 0.18);`,
    sfx: [
      { t: -0.3, sfx: "burbuja", vol: 0.11 },
      { t: w(id, 49), sfx: "typing", vol: 0.06, max: 0.8 },
      ...[0, 0.3, 0.55, 0.75, 0.92, 1.06].map((d) => ({ t: r2(w(id, 52) + d), sfx: "notification", vol: 0.07, max: 0.4 })),
    ],
  });
}

// ================= s10 · es la mesa de veinticuatro (el celular acostado) =================
{
  const id = "s10-mesa24";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.09, max: 0.6 },
      ...Array.from({ length: 4 }, (_, i) => ({ t: r2(0.22 + i * 0.1), sfx: i % 2 ? "burbuja" : "pop", vol: 0.06 })),
      { t: w(id, 59) - 0.05, sfx: "impact-bass-2", vol: 0.08, max: 0.5 },
    ],
  });
}

// ================= s11 · en Scalerics armamos tu tienda online =================
{
  const id = "s11-tienda";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.12, sfx: "whoosh-short", vol: 0.06 },
      { t: w(id, 61), sfx: "whoosh-short", vol: 0.1 }, { t: w(id, 62), sfx: "pop", vol: 0.09 },
      { t: w(id, 62) + 0.15, sfx: "whoosh-cine-corto2", vol: 0.08, max: 0.6 },
    ],
  });
}

// ================= s12 · lo más pedido primero, pocas categorías =================
{
  const id = "s12-pocas";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: w(id, 68), sfx: "key-press", vol: 0.12 }, { t: w(id, 70), sfx: "click", vol: 0.12 }],
  });
}

// ================= s13 · el cliente elige y paga =================
{
  const id = "s13-paga";
  escena(id, {
    css: `P .pill.chico { font-size: 52px; padding: 16px 34px 18px; }`,
    html: `
      ${leads(lead(1, 880, 560, 240, 900, "g"), lead(2, 300, 1560, 330, 1420, "g"))}
      ${pill(1, 880, 520, `${tick(24)}Elige`, "lleno chico")}
      ${pill(2, 300, 1590, `${tick(24)}Paga`, "lleno chico")}`,
    js: `
      nota(1, ${r2(w(id, 74) - 0.05)});
      nota(2, ${r2(w(id, 76) - 0.05)});
      fuera(".n1, .n2, .l1, .l2, .d1, .d2", ${r2(ESC[id] - 0.2)}, 0.18);`,
    sfx: [
      { t: 0.42, sfx: "pop", vol: 0.12 },
      { t: w(id, 74), sfx: "key-press", vol: 0.13 }, { t: w(id, 74) + 0.08, sfx: "ping", vol: 0.07 },
      { t: w(id, 76), sfx: "click", vol: 0.12 },
      { t: w(id, 76) + 0.65, sfx: "pop", vol: 0.055 }, { t: w(id, 76) + 1.05, sfx: "burbuja", vol: 0.05 },
    ],
  });
}

// ================= s14 · ¿querés ver cómo quedaría en tu negocio? =================
{
  const id = "s14-negocio";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.2, sfx: "whoosh-cine-corto2", vol: 0.09, max: 0.7 }, { t: 0.05, sfx: "burbuja", vol: 0.1 },
      { t: w(id, 80), sfx: "notification", vol: 0.08, max: 0.6 }, { t: w(id, 83) + 0.1, sfx: "chime", vol: 0.1, max: 0.9 },
    ],
  });
}

// ================= s15 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s15-cta";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 900 124px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 296px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 900 124px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3w { position: absolute; left: 0; right: 0; top: 478px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 44px 24px; border-radius: 30px; background: ${G}; font: 900 104px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb" style="opacity:1">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      // entra todo de una (sin fundidos grises): solo un pequeño rebote de escala
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".sb"), { scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2w"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 87) - 0.02)});
      tl.fromTo(q(".t3w"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 50%", duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 89) - 0.03)});`,
    sfx: [{ t: -0.5, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.1 }, { t: w(id, 87) - 0.02, sfx: "key-press", vol: 0.12 }, { t: w(id, 89) - 0.03, sfx: "chime", vol: 0.09, max: 0.8 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
