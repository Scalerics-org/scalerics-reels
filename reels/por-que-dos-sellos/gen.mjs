// Generador de las escenas HTML de reels/por-que-dos-sellos (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/caso-pedidosya. Los objetos son 3D de verdad y viven en assets/tres.js
// (una sola escena Three.js, la cámara viaja sin cortes); estas escenas son SOLO la capa plana de arriba:
// el gancho en grande, 1-2 rótulos con línea guía, sellos y el cierre.
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

const NAVY = "#16243d", NAVY0 = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

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
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY0}; font: 700 46px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
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
      // la píldora y su guía arrancan juntas (la guía no se adelanta)
      const nota = (k, t) => { pop(".n" + k, t); if (q(".l" + k)) { dibujar(".l" + k, t + 0.04, 0.26); pop(".d" + k, t + 0.2, 0.2); } };
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


// Cortes secos entre escenas (sin fundido): cada escena dura 1-3 s y el 3D cambia en el corte.
const TIT = `font: 900 108px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55);`;
const SEL = `
    P .kw { position: relative; display: inline-block; padding: 0 18px 8px; color: #fff; }
    P .kw .selbox { left: 0; top: 6px; right: 0; bottom: -2px; opacity: 1; }
    P .kw em { position: relative; font-style: normal; }`;

// ================= s01 · gancho (cuadro 0 = portada): la tarjeta con dos sellos ya puestos =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 120px; text-align: center; ${TIT} font-size: 104px; }
    P .a .l { display: block; }
    P .a .chica { font-size: 76px; font-weight: 800; color: ${CR}; margin-bottom: 14px; }${SEL}`,
    html: `
      <div class="a"><span class="l chica">¿Por qué algunas</span><span class="l">tarjetas vienen</span><span class="l">con <span class="kw"><div class="selbox sb">${esquinas}</div><em>dos sellos</em></span></span><span class="l">puestos?</span></div>`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".kw", ${r2(w(id, 8))}, 1.08);
      tl.set(q(".a"), { opacity: 0 }, ${r2(ESC[id] - 0.09)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.1, max: 1.0 }, { t: 0.08, sfx: "sello", vol: 0.32 },
      { t: w(id, 8) - 0.03, sfx: "pop", vol: 0.2 }, { t: w(id, 8) + 0.06, sfx: "pop", vol: 0.16 },
      { t: ESC[id] - 0.45, sfx: "whoosh-cine-corto", vol: 0.22, max: 1.0 },
    ],
  });
}

// ================= s02 · el lavadero de autos y las barras 19 % / 34 % =================
{
  const id = "s02-lavadero";
  escena(id, {
    css: `P .cred { left: 540px; top: 1640px; font-size: 34px; padding: 10px 20px 12px; border-radius: 14px; background: rgba(11,18,32,0.82); }`,
    html: `${pill(1, 540, 1560, "Estudio real", "g grande")}${mono(2, 540, 1640, "Nunes y Drèze · 2006", "cred")}`,
    js: `nota(1, ${r2(w(id, 12))}); sinNota(1, ${r2(w(id, 15) - 0.3)}); pop(".n2", ${r2(w(id, 17))}); fuera(".n2", ${r2(ESC[id] - 0.3)}, 0.2);`,
    sfx: [
      { t: 0.05, sfx: "whoosh-short", vol: 0.16 }, { t: 0.6, sfx: "papel", vol: 0.4 }, { t: 0.7, sfx: "burbuja", vol: 0.24 }, { t: 0.95, sfx: "burbuja", vol: 0.2 }, { t: 1.2, sfx: "burbuja", vol: 0.18 },
      { t: w(id, 15) - 0.14, sfx: "whoosh-cine-corto", vol: 0.2, max: 1.0 },
      ...Array.from({ length: 6 }, (_, k) => ({ t: r2(w(id, 15) + 0.2 + k * 0.12), sfx: "tic", vol: 0.2 })),
      { t: w(id, 17), sfx: "pop", vol: 0.2 }, { t: w(id, 20) - 0.03, sfx: "pop", vol: 0.22 }, { t: w(id, 20) + 0.02, sfx: "ding", vol: 0.12, max: 0.55 },
    ],
  });
}

// ================= s03 · a unos, una de ocho, vacía =================
{
  const id = "s03-ocho";
  escena(id, {
    html: `${leads(lead(1, 300, 1440, 290, 1185, "r"))}${pill(1, 300, 1480, "0 de 8", "r grande")}`,
    js: `nota(1, ${r2(w(id, 27) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.22)});`,
    sfx: [{ t: 0.02, sfx: "pop", vol: 0.13 }, { t: -0.12, sfx: "whoosh-short", vol: 0.1 }, { t: w(id, 27) - 0.02, sfx: "pop", vol: 0.2 }, { t: w(id, 28), sfx: "golpe", vol: 0.14, max: 0.45 }],
  });
}

// ================= s04 · a otros, una de diez con dos de regalo (pum, pum) =================
{
  const id = "s04-diez";
  escena(id, {
    html: `${leads(lead(1, 700, 1440, 395, 1005, "g"))}${pill(1, 760, 1480, "2 de 10", "g grande")}`,
    js: `nota(1, ${r2(w(id, 35) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-cine-corto", vol: 0.2, max: 0.9 }, { t: 0.02, sfx: "pop", vol: 0.2 }, { t: w(id, 33) - 0.02, sfx: "pop", vol: 0.2 },
      { t: w(id, 35) - 0.04, sfx: "sello", vol: 0.55 }, { t: w(id, 37) - 0.04, sfx: "sello", vol: 0.55 },
    ],
  });
}

// ================= s05 · mismos ocho lavados (las dos, una arriba de la otra, "=") =================
{
  const id = "s05-mismos";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.16 },
      ...Array.from({ length: 8 }, (_, k) => ({ t: r2(0.15 + k * 0.075), sfx: "tic", vol: 0.24 })),
      { t: 0.3, sfx: "pop", vol: 0.16 },
    ],
  });
}

// ================= s06 · ¿Por qué? (los sellos se vuelven el "?") · vacía, es arrancar de cero =================
{
  const id = "s06-por-que";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.25, sfx: "whoosh-cine-corto", vol: 0.14, max: 0.8 }, { t: 0.04, sfx: "impact-bass-1", vol: 0.09, max: 0.9 }, { t: 0.06, sfx: "pop", vol: 0.14 },
      { t: w(id, 43) - 0.2, sfx: "whoosh-short", vol: 0.15 }, { t: w(id, 43) - 0.05, sfx: "pop", vol: 0.16 },
      { t: w(id, 43) + 0.05, sfx: "click-soft", vol: 0.2 }, { t: w(id, 47) + 0.18, sfx: "golpe", vol: 0.16, max: 0.45 },
    ],
  });
}

// ================= s07 · con dos sellos, ya estás en camino (la barra pasa a 20 %) =================
{
  const id = "s07-camino";
  escena(id, {
    html: `${leads(lead(1, 520, 1615, 360, 1512, "g"))}${pill(1, 700, 1650, "Ya empezaste", "g grande")}`,
    js: `nota(1, ${r2(w(id, 54))}); sinNota(1, ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-short", vol: 0.16 }, { t: -0.12, sfx: "whoosh-short", vol: 0.12 }, { t: 0.32, sfx: "sello", vol: 0.5 }, { t: 0.52, sfx: "sello", vol: 0.5 },
      { t: w(id, 51), sfx: "riser-corto", vol: 0.12, max: 0.8 }, { t: w(id, 54) + 0.05, sfx: "ding", vol: 0.14, max: 0.9 },
    ],
  });
}

// ================= s08 · y anda mejor con una excusa: por estrenarla (moño y etiqueta) =================
{
  const id = "s08-excusa";
  escena(id, {
    html: `${leads(lead(1, 520, 580, 790, 640, "g"))}${pill(1, 330, 570, "Aunque sea floja", "g")}`,
    js: `nota(1, ${r2(w(id, 60) + 0.02)}); sinNota(1, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 60) - 0.25, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 60) + 0.02, sfx: "pop", vol: 0.22 }, { t: w(id, 60) + 0.1, sfx: "sparkle", vol: 0.1, max: 1.0 },
      { t: w(id, 61) - 0.25, sfx: "papel", vol: 0.4 }, { t: w(id, 61) + 0.05, sfx: "click-soft", vol: 0.2 },
    ],
  });
}

// ================= s09 · Rubén lo hace con Scalerics Puntos (el almacén) =================
{
  const id = "s09-ruben";
  escena(id, {
    css: `P .nom { font-size: 40px; padding: 12px 26px 13px; }`,
    html: `${pill(1, 335, 600, "Rubén", "nom")}${pill(2, 800, 545, "Graciela", "nom")}${pill(3, 540, 1600, "Scalerics Puntos", "lleno grande")}`,
    js: `pop(".n1", 0.15); pop(".n2", 0.3); fuera(".n1", ${r2(w(id, 67) - 0.1)}); fuera(".n2", ${r2(w(id, 67) - 0.1)}); pop(".n3", ${r2(w(id, 68))}); fuera(".n3", ${r2(ESC[id] - 0.22)}, 0.2);`,
    sfx: [
      { t: -0.08, sfx: "whoosh-cine-corto", vol: 0.22, max: 1.0 }, { t: 0.05, sfx: "campanita", vol: 0.3, max: 1.2 },
      { t: 0.15, sfx: "pop", vol: 0.14 }, { t: 0.3, sfx: "pop", vol: 0.12 }, { t: w(id, 68), sfx: "pop", vol: 0.2 }, { t: w(id, 68) + 0.08, sfx: "chime", vol: 0.14, max: 1.0 },
    ],
  });
}

// ================= s10 · Graciela arranca con dos (el celular grande) =================
{
  const id = "s10-graciela";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.08, sfx: "whoosh-short", vol: 0.16 }, { t: 0.2, sfx: "click-soft", vol: 0.2 },
      { t: w(id, 72) - 0.02, sfx: "sello", vol: 0.42 }, { t: w(id, 72) + 0.04, sfx: "ding", vol: 0.12, max: 0.9 },
    ],
  });
}

// ================= s11 · si deja de venir, le llega un aviso =================
{
  const id = "s11-aviso";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.12, sfx: "whoosh-short", vol: 0.14 }, { t: 0.4, sfx: "tic", vol: 0.14 }, { t: 0.62, sfx: "tic", vol: 0.12 }, { t: 0.84, sfx: "campanita", vol: 0.22, max: 1.0 },
      { t: w(id, 77) - 0.2, sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 78) - 0.05, sfx: "vibra", vol: 1.0, max: 0.6 }, { t: w(id, 78) + 0.05, sfx: "notification", vol: 0.22, max: 1.0 },
    ],
  });
}

// ================= s12 · ¿lo vemos en tu local? (Graciela vuelve) =================
{
  const id = "s12-tu-local";
  escena(id, {
    html: `${leads(lead(1, 830, 1580, 770, 1250, "g"))}${pill(1, 830, 1620, "Volvió", "g grande")}`,
    js: `nota(1, ${r2(w(id, 85) + 0.1)}); sinNota(1, ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.14 }, { t: 0.3, sfx: "puerta", vol: 0.3, max: 1.0 }, { t: 0.38, sfx: "campanita", vol: 0.32, max: 1.2 },
      { t: w(id, 85) + 0.1, sfx: "pop", vol: 0.18 }, { t: w(id, 85) + 0.35, sfx: "sparkle", vol: 0.1, max: 0.9 },
    ],
  });
}

// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 706px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 930px; text-align: center; font: 800 128px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
    js: `
      tl.set(q(".t1"), { opacity: 1 }, 0); tl.fromTo(q(".t1"), { y: 40 }, { y: 0, duration: 0.18, ease: "power3.out", immediateRender: true }, 0);
      tl.set(q(".t2w"), { opacity: 0 }, 0); tl.set(q(".t2w"), { opacity: 1 }, ${r2(w(id, 89) - 0.08)}); tl.fromTo(q(".t2w"), { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.26, ease: "back.out(2)", immediateRender: false }, ${r2(w(id, 89) - 0.08)});
      caja(".sb", ${r2(w(id, 89))});
      tl.set(q(".t3"), { opacity: 0 }, 0); tl.set(q(".t3"), { opacity: 1 }, ${r2(w(id, 89) + 0.12)}); tl.fromTo(q(".t3"), { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, ${r2(w(id, 89) + 0.12)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.06, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 91) - 0.05)});`,
    sfx: [{ t: -0.1, sfx: "whoosh-short", vol: 0.18 }, { t: 0.05, sfx: "pop", vol: 0.16 }, { t: w(id, 89), sfx: "click-soft", vol: 0.26 }, { t: w(id, 89) + 0.12, sfx: "chime", vol: 0.3, max: 1.3 }, { t: w(id, 91) + 0.05, sfx: "sello", vol: 0.4 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
