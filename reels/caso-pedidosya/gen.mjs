// Generador de las escenas HTML de reels/caso-pedidosya (correr desde la carpeta del reel, después de
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


// Cortes secos entre escenas (sin fundido): cada escena dura 1-3 s y el 3D cambia en el corte.
const TIT = `font: 800 104px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55);`;

// ================= s01 · gancho (cuadro 0 = portada): ciudad + celular-torre, después la grúa al mapa =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 150px; text-align: center; ${TIT} }
    P .b { position: absolute; left: 0; right: 0; top: 495px; text-align: center; ${TIT} font-size: 86px; }
    P .v { position: absolute; left: 0; right: 0; top: 590px; text-align: center; ${TIT} font-size: 140px; color: ${G}; }`,
    html: `
      <div class="a"><div>Dos estudiantes</div><div>de Montevideo</div><div>armaron una app</div></div>
      <div class="b">que hoy está en</div>
      <div class="v">15 países</div>`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      // la grúa: arriba queda solo el dato
      tl.to(q(".a"), { y: -120, opacity: 0, duration: 0.35, ease: "power2.in" }, ${r2(w(id, 7) - 0.15)});
      tl.to(q(".b"), { y: -335, duration: 0.5, ease: "power3.inOut" }, ${r2(w(id, 7) - 0.05)});
      tl.to(q(".v"), { y: -335, duration: 0.5, ease: "power3.inOut" }, ${r2(w(id, 7) - 0.05)});
      late(".v", ${w(id, 11)}, 1.1);
      tl.to(q(".esc"), { opacity: 0, duration: 0.15, ease: "power2.in" }, ${r2(ESC[id] - 0.16)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.22 }, { t: w(id, 3), sfx: "click-soft", vol: 0.2 },
      { t: w(id, 7) - 0.2, sfx: "whoosh-cinematic", vol: 0.26 }, { t: w(id, 7), sfx: "riser", vol: 0.12, max: 1.3 },
      { t: w(id, 9) - 0.05, sfx: "ping", vol: 0.18 }, { t: w(id, 9) + 0.3, sfx: "pop", vol: 0.14 }, { t: w(id, 9) + 0.6, sfx: "pop", vol: 0.14 },
      { t: w(id, 11), sfx: "sparkle", vol: 0.2 }, { t: w(id, 11) + 0.35, sfx: "pop", vol: 0.14 }, { t: w(id, 12) + 0.2, sfx: "impact-bass-1", vol: 0.2 },
    ],
  });
}

// ================= s02 · todo empezó con un chivito (zambullida + se arma capa por capa) =================
{
  const id = "s02-chivito";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0, sfx: "whoosh-cinematic", vol: 0.26, max: 0.8 },
      { t: 0.2, sfx: "click-soft", vol: 0.18 }, { t: 0.35, sfx: "click-soft", vol: 0.18 }, { t: 0.5, sfx: "click-soft", vol: 0.18 }, { t: 0.65, sfx: "click-soft", vol: 0.18 },
      { t: w(id, 17), sfx: "impact-bass-2", vol: 0.24 },
    ],
  });
}

// ================= s03 · llamabas, te hacían mil preguntas =================
{
  const id = "s03-telefono";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0.15, sfx: "ring", vol: 0.26 },
      { t: w(id, 19) - 0.05, sfx: "click", vol: 0.2 },
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ t: r2(w(id, 20) + i * 0.11 + 0.05), sfx: "pop", vol: i % 2 ? 0.12 : 0.16 })),
    ],
  });
}

// ================= s04 · y te llegaba otra cosa =================
{
  const id = "s04-otra";
  escena(id, {
    css: `P .sello { left: 540px; top: 1560px; font-size: 100px; }`,
    html: `<div class="sello sx">OTRA COSA</div>`,
    js: `
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".sx", ${r2(w(id, 26) + 0.12)}, -6);`,
    sfx: [
      { t: 0.22, sfx: "impact-bass-1", vol: 0.22 }, { t: w(id, 26) - 0.15, sfx: "click-soft", vol: 0.22 },
      { t: w(id, 26) + 0.05, sfx: "glitch-1", vol: 0.14 }, { t: w(id, 26) + 0.3, sfx: "impact-bass-2", vol: 0.3 },
    ],
  });
}

// ================= s05 · lo dieron vuelta: el fijo gira y sale el celular =================
{
  const id = "s05-vuelta";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: w(id, 29), sfx: "whoosh", vol: 0.24, max: 0.8 }, { t: w(id, 30) + 0.05, sfx: "sparkle", vol: 0.18 },
      { t: w(id, 34), sfx: "click", vol: 0.26 }, { t: w(id, 34) + 0.12, sfx: "notification", vol: 0.22, max: 1.0 },
      { t: w(id, 35) - 0.05, sfx: "ping", vol: 0.2 },
    ],
  });
}

// ================= s06 · así nació PedidosYa, en 2009 (la ciudad vuelve, la moto recorre la rambla) =================
{
  const id = "s06-nacio";
  escena(id, {
    html: `${pill(1, 540, 1650, "PedidosYa", "grande")}`,
    js: `nota(1, ${r2(w(id, 40) - 0.05)});`,
    sfx: [
      { t: 0, sfx: "whoosh-cinematic", vol: 0.24, max: 0.9 }, { t: 0.05, sfx: "moto", vol: 0.3 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(0.5 + i * 0.32), sfx: "pop", vol: 0.15 })),
      { t: w(id, 42) - 0.05, sfx: "impact-bass-2", vol: 0.22 },
    ],
  });
}

// ================= s07 · cinco años después, una empresa alemana compró el control (2014, 70 %) =================
{
  const id = "s07-alemana";
  escena(id, {
    css: `P .mono { font-size: 40px; }`,
    html: `
      ${mono(1, 540, 1655, "2014 · empresa alemana", "g")}`,
    js: `nota(1, ${r2(w(id, 47) - 0.05)});`,
    sfx: [
      ...[0, 1, 2, 3, 4].map((i) => ({ t: r2(w(id, 44) + 0.05 + i * 0.17), sfx: "key-press", vol: 0.2 })),
      { t: w(id, 46) - 0.1, sfx: "pop", vol: 0.2 }, { t: w(id, 49) - 0.15, sfx: "scan", vol: 0.18 }, { t: w(id, 51) + 0.2, sfx: "impact-bass-1", vol: 0.26 },
    ],
  });
}

// ================= s08 · ¿la lección? pedir por teléfono se presta a errores (vuelve el teléfono) =================
{
  const id = "s08-leccion";
  escena(id, {
    css: `P .pq { position: absolute; left: 0; right: 0; top: 240px; text-align: center; ${TIT} font-size: 112px; }`,
    html: `<div class="pq">¿La lección?</div>`,
    js: `
      tl.fromTo(q(".pq"), { scale: 1.25, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.22, ease: "power4.out", immediateRender: true }, 0);
      tl.to(q(".pq"), { opacity: 0, y: -40, duration: 0.16, ease: "power2.in" }, ${r2(w(id, 54) - 0.18)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-1", vol: 0.28 }, { t: 0.05, sfx: "pop", vol: 0.18 }, { t: w(id, 54) - 0.12, sfx: "whoosh-short", vol: 0.18 }, { t: w(id, 54), sfx: "ring", vol: 0.22 },
      { t: w(id, 56) - 0.05, sfx: "click", vol: 0.2 },
      { t: w(id, 60) + 0.12, sfx: "impact-bass-2", vol: 0.26 }, { t: w(id, 60) + 0.5, sfx: "click", vol: 0.16 },
    ],
  });
}

// ================= s09 · si tu local todavía toma pedidos así, o por WhatsApp (chat genérico) =================
{
  const id = "s09-whatsapp";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: w(id, 68) - 0.15, sfx: "whoosh-short", vol: 0.2 },
      { t: w(id, 68) + 0.05, sfx: "notification", vol: 0.18, max: 0.8 }, { t: w(id, 70) + 0.1, sfx: "notification", vol: 0.16, max: 0.8 },
    ],
  });
}

// ================= s10 · te pasa lo mismo que con aquel chivito (callback: la caja con la porción equivocada) =================
{
  const id = "s10-mismo";
  escena(id, {
    css: `P .sello { left: 540px; top: 1600px; font-size: 92px; }`,
    html: `<div class="sello sx">OTRA COSA</div>`,
    js: `
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".sx", ${r2(w(id, 78) + 0.05)}, -6);`,
    sfx: [
      { t: 0, sfx: "impact-bass-1", vol: 0.24 }, { t: w(id, 74), sfx: "notification", vol: 0.16, max: 0.8 },
      { t: w(id, 77) - 0.1, sfx: "click-soft", vol: 0.22 }, { t: w(id, 78) - 0.05, sfx: "glitch-1", vol: 0.14 }, { t: w(id, 78) + 0.2, sfx: "impact-bass-2", vol: 0.3 },
    ],
  });
}

// ================= s11 · en Scalerics armamos tu tienda online =================
{
  const id = "s11-tienda";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: -0.05, sfx: "whoosh-cinematic", vol: 0.22, max: 0.8 }, { t: 0.3, sfx: "sparkle", vol: 0.16 }],
  });
}

// ================= s12 · el cliente elige, paga, y te llega el pedido claro =================
{
  const id = "s12-elige";
  escena(id, {
    css: `P .pill.chico { font-size: 52px; padding: 16px 34px 18px; }`,
    html: `
      ${pill(1, 290, 1650, `${tick(24)}Elige`, "lleno chico")}
      ${pill(2, 790, 1650, `${tick(24)}Paga`, "lleno chico")}`,
    js: `
      nota(1, ${r2(w(id, 87) - 0.05)});
      nota(2, ${r2(w(id, 88) - 0.05)});
      fuera(".n1, .n2", ${r2(w(id, 94) - 0.1)}, 0.2);`,
    sfx: [
      { t: w(id, 87), sfx: "click", vol: 0.24 }, { t: w(id, 87) + 0.05, sfx: "ping", vol: 0.2 },
      { t: w(id, 88), sfx: "click", vol: 0.24 }, { t: w(id, 88) + 0.05, sfx: "ping", vol: 0.2 },
      { t: w(id, 89) + 0.05, sfx: "whoosh", vol: 0.22, max: 0.8 }, { t: w(id, 94) - 0.05, sfx: "sparkle", vol: 0.22 }, { t: w(id, 94), sfx: "notification", vol: 0.2, max: 1.0 },
    ],
  });
}
{
  const id = "s12-elige";
  // rótulo del pedido claro, cuando la tarjeta llega al local
  void id;
}

// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }
    P .t2w { position: absolute; left: 0; right: 0; top: 296px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 480px; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
    js: `
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(w(id, 98) - 0.15)});
      caja(".sb", ${r2(w(id, 98))});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 100) - 0.1)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 100) + 0.35)});`,
    sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(id, 98), sfx: "click-soft", vol: 0.26 }, { t: w(id, 100) - 0.1, sfx: "chime", vol: 0.3, max: 1.4 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
