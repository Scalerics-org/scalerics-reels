// Generador de las escenas HTML de reels/por-que-la-lista (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/caso-pedidosya. Los objetos son 3D de verdad y viven en assets/tres.js
// (una sola escena Three.js, la cámara viaja sin cortes); estas escenas son SOLO la capa plana de arriba:
// el gancho en grande, 1-2 rótulos con línea guía, sellos y el cierre.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.6);
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
const TIT = `font: 800 104px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55);`;


// ================= s01 · gancho (cuadro 0 = portada): el volante con la tarjeta de la lista =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 140px; text-align: center; ${TIT} font-weight: 900; font-size: 96px; }
    P .a .l { display: block; }
    P .kw { position: relative; display: inline-block; padding: 0 20px 8px; color: #fff; }
    P .kw .selbox { left: 0; top: 4px; right: 0; bottom: -2px; opacity: 1; }
    P .kw em { position: relative; font-style: normal; }`,
    html: `
      <div class="a"><span class="l">¿Por qué el piloto</span><span class="l">repasa una <span class="kw"><div class="selbox sb">${esquinas}</div><em>lista</em></span>,</span><span class="l">si sabe volar?</span></div>`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".kw", ${r2(w(id, 6) + 0.02)}, 1.1);
      tl.to(q(".a"), { y: -60, opacity: 0, duration: 0.22, ease: "power2.in" }, ${r2(ESC[id] - 0.24)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.24, max: 1.2 }, { t: 0.3, sfx: "click-soft", vol: 0.22 },
      { t: w(id, 6), sfx: "pop", vol: 0.16 }, { t: ESC[id] - 0.45, sfx: "whoosh-cine-corto", vol: 0.3, max: 1.3 },
    ],
  });
}

// ================= s02 · "En 1935" (la cabina se achica, detrás el avión; el año 3D arriba) =================
{
  const id = "s02-1935";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: w(id, 11) - 0.05, sfx: "pop", vol: 0.2 }, { t: w(id, 11) + 0.02, sfx: "impact-bass-1", vol: 0.2, max: 1.2 },
      { t: w(id, 11) + 0.3, sfx: "riser-corto", vol: 0.12, max: 1.6 },
    ],
  });
}

// ================= s02b · un avión nuevo se estrelló en una prueba =================
{
  const id = "s02b-prueba";
  escena(id, {
    html: `${leads(lead(1, 300, 1555, 470, 1080))}${pill(1, 300, 1590, "Vuelo de prueba")}`,
    js: `nota(1, ${r2(w(id, 16) - 0.05)});`,
    sfx: [
      { t: w(id, 16) - 0.05, sfx: "impact-bass-2", vol: 0.26, max: 0.8 },
      { t: w(id, 16) + 0.1, sfx: "pop", vol: 0.16 },
    ],
  });
}

// ================= s03 · pilotos expertos, avión sano =================
{
  const id = "s03-expertos";
  escena(id, {
    html: `${leads(lead(1, 540, 700, 540, 920, "g"), lead(2, 760, 1560, 860, 1120, "g"))}
      ${pill(1, 540, 660, `${tick(24)}Pilotos expertos`, "g")}
      ${pill(2, 700, 1600, `${tick(24)}Avión sin fallas`, "g")}`,
    js: `nota(1, ${r2(w(id, 21) - 0.15)}); nota(2, ${r2(w(id, 21) + 0.15)});`,
    sfx: [
      { t: w(id, 21) - 0.1, sfx: "ping", vol: 0.18 }, { t: w(id, 21) + 0.2, sfx: "ping", vol: 0.16 },
    ],
  });
}

// ================= s04 · despegaron con los controles trabados: un paso olvidado =================
{
  const id = "s04-trabados";
  escena(id, {
    css: `P .sello { left: 540px; top: 1560px; font-size: 76px; }`,
    html: `${leads(lead(1, 540, 1540, 540, 1040, "r"))}${pill(1, 540, 1580, "Controles trabados", "r")}
      <div class="sello sx">UN PASO OLVIDADO</div>`,
    js: `
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      nota(1, ${r2(w(id, 28) - 0.05)});
      sinNota(1, ${r2(w(id, 29) - 0.2)});
      sello(".sx", ${r2(w(id, 29))}, -6);`,
    sfx: [
      // despegue: el riser real (recortado donde suena) y el whoosh del travelling
      { t: 0, sfx: "riser-corto", vol: 0.2, max: 1.6 }, { t: 0.6, sfx: "whoosh-cine-corto", vol: 0.07, max: 0.9 },
      { t: w(id, 28) - 0.05, sfx: "impact-bass-2", vol: 0.025, max: 0.8 },
      // el timón forcejea contra la traba
      ...[0, 1, 2].map((i) => ({ t: r2(w(id, 28) + 0.05 + i * 0.16), sfx: "tic", vol: 0.2 })),
      { t: w(id, 29) + 0.02, sfx: "glitch-1", vol: 0.07, max: 0.45 }, { t: w(id, 29) + 0.2, sfx: "impact-bass-1", vol: 0.1, max: 0.6 },
    ],
  });
}

// ================= s05 · en vez de más entrenamiento, una lista corta (el giro) =================
{
  const id = "s05-lista";
  escena(id, {
    css: `P .tacha { position: absolute; left: 0; top: 50%; height: 9px; width: 100%; background: ${RED}; border-radius: 5px; transform-origin: 0 50%; transform: scaleX(0); }`,
    html: `
      <div class="pill r n1" style="left:540px;top:575px">Más entrenamiento<i class="tacha"></i></div>
      ${leads(lead(2, 540, 1560, 540, 1385, "g"))}${pill(2, 540, 1600, "Una lista corta", "g grande")}`,
    js: `
      nota(1, ${r2(w(id, 35) + 0.05)});
      tl.to(q(".tacha"), { scaleX: 1, duration: 0.25, ease: "power2.out" }, ${r2(w(id, 36) + 0.45)});
      sinNota(1, ${r2(w(id, 37) - 0.1)});
      nota(2, ${r2(w(id, 37) + 0.05)});
      sinNota(2, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: w(id, 35) + 0.15, sfx: "impact-bass-1", vol: 0.26, max: 1.0 }, { t: w(id, 35) + 0.3, sfx: "golpe", vol: 0.16, max: 0.42 },
      { t: w(id, 36) + 0.45, sfx: "click-soft", vol: 0.2 },
      { t: w(id, 37) - 0.12, sfx: "whoosh-short", vol: 0.22 }, { t: w(id, 37) + 0.08, sfx: "pop", vol: 0.2 }, { t: w(id, 37) + 0.2, sfx: "sparkle", vol: 0.16, max: 1.2 },
    ],
  });
}

// ================= s06 · hoy, todo piloto la repasa (la tarjeta vuelve al volante y se tilda) =================
{
  const id = "s06-hoy";
  escena(id, {
    css: `P .pill.chico { font-size: 54px; padding: 18px 36px 20px; }`,
    html: `${pill(1, 540, 1600, `${tick(26)}Controles libres`, "lleno chico")}`,
    js: `nota(1, ${r2(w(id, 44) + 0.1)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.24, max: 1.1 },
      { t: 0.45, sfx: "tic", vol: 0.2 }, { t: w(id, 41), sfx: "tic", vol: 0.2 }, { t: w(id, 42), sfx: "tic", vol: 0.2 }, { t: w(id, 43), sfx: "tic", vol: 0.2 },
      { t: w(id, 44), sfx: "tic", vol: 0.34 }, { t: w(id, 44) + 0.12, sfx: "ding", vol: 0.09, max: 0.8 },
    ],
  });
}

// ================= s07 · tu local también despega (la tarjeta vuela al local, el toldo se abre) =================
{
  const id = "s07-local";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.22 }, { t: 0.35, sfx: "pop", vol: 0.18 },
      { t: w(id, 48) - 0.35, sfx: "whoosh-cine-corto", vol: 0.1, max: 0.9 }, { t: w(id, 48) + 0.08, sfx: "pop", vol: 0.2 },
    ],
  });
}

// ================= s07b · abrir, cerrar, el pedido al proveedor =================
{
  const id = "s07b-tareas";
  escena(id, {
    html: `
      ${leads(lead(1, 290, 1575, 430, 1250), lead(2, 790, 1575, 650, 1250), lead(3, 640, 1575, 790, 1420))}
      ${pill(1, 290, 1610, "Abrir")}
      ${pill(2, 790, 1610, "Cerrar")}
      ${pill(3, 290, 1610, "Pedido al proveedor")}`,
    js: `
      gsap.set(q(".n3"), { left: 540 });
      nota(1, ${r2(w(id, 49) - 0.05)});
      nota(2, ${r2(w(id, 50) - 0.05)});
      fuera(".n1, .n2, .l1, .l2, .d1, .d2", ${r2(w(id, 52) - 0.2)}, 0.18);
      nota(3, ${r2(w(id, 52) - 0.02)});`,
    sfx: [
      // persiana: sube (whoosh + click arriba) y baja (whoosh + golpe cuando llega abajo)
      { t: w(id, 49) - 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 49) + 0.17, sfx: "click", vol: 0.2 },
      { t: w(id, 50) + 0.08, sfx: "whoosh-cine-corto", vol: 0.12, max: 0.6 }, { t: w(id, 50) + 0.4, sfx: "golpe", vol: 0.16, max: 0.42 },
      { t: w(id, 52) + 0.3, sfx: "impact-bass-1", vol: 0.04, max: 0.6 }, { t: w(id, 52) + 0.33, sfx: "golpe", vol: 0.14, max: 0.42 }, { t: w(id, 52) + 0.62, sfx: "tic", vol: 0.2 },
    ],
  });
}

// ================= s08 · ¿y si eso lo sabe solo Marta? (el cuaderno) =================
{
  const id = "s08-marta";
  escena(id, {
    html: `${leads(lead(1, 540, 1560, 540, 1330, "r"))}${pill(1, 540, 1600, "Solo lo sabe Marta", "r")}`,
    js: `nota(1, ${r2(w(id, 59) - 0.05)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.22, max: 0.9 }, { t: 0.12, sfx: "pop", vol: 0.18 },
      // el cuaderno tiembla
      ...[0, 1, 2, 3, 4].map((i) => ({ t: r2(w(id, 58) + i * 0.09), sfx: "tic", vol: 0.36 })),
      { t: w(id, 59) - 0.05, sfx: "pop", vol: 0.16 }, { t: w(id, 61) + 0.15, sfx: "pop", vol: 0.12 },
    ],
  });
}

// ================= s09 · en Scalerics armamos tu sistema a medida (el cuaderno se vuelve tablet) =================
{
  const id = "s09-sistema";
  escena(id, {
    html: `${pill(1, 540, 1670, "A medida", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 66) + 0.05)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-short", vol: 0.16 }, { t: 0.08, sfx: "click", vol: 0.24 },
      { t: w(id, 66) - 0.75, sfx: "whoosh-cine-corto", vol: 0.08, max: 0.7 }, { t: w(id, 66) + 0.12, sfx: "pop", vol: 0.12 },
      { t: w(id, 66) + 0.4, sfx: "ping", vol: 0.14 }, { t: w(id, 68) + 0.1, sfx: "sparkle", vol: 0.07, max: 1.0 },
    ],
  });
}

// ================= s10 · cada tarea con su lista (la lista de apertura, se tilda) =================
{
  const id = "s10-tareas";
  escena(id, {
    css: `P .pill.chico { font-size: 52px; padding: 16px 34px 18px; }`,
    html: `${pill(1, 540, 1680, `${tick(24)}Cada tarea, su lista`, "lleno chico")}`,
    js: `nota(1, ${r2(w(id, 69) + 0.1)});`,
    sfx: [
      { t: -0.08, sfx: "click-soft", vol: 0.22 },
      { t: w(id, 70), sfx: "tic", vol: 0.3 }, { t: w(id, 72), sfx: "tic", vol: 0.3 }, { t: w(id, 73) + 0.15, sfx: "tic", vol: 0.3 },
      { t: w(id, 73) + 0.22, sfx: "ping", vol: 0.16 },
    ],
  });
}

// ================= s11 · ¿querés verlo en tu local? (retroceso: el local, la tarjeta del piloto en el mostrador) =================
{
  const id = "s11-verlo";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: -0.1, sfx: "whoosh-cine-corto", vol: 0.2, max: 1.0 }, { t: w(id, 77) - 0.05, sfx: "pop", vol: 0.2 }, { t: w(id, 77) + 0.05, sfx: "sparkle", vol: 0.12, max: 1.0 }],
  });
}

// ================= s12 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s12-llamada";
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
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(w(id, 82) - 0.15)});
      caja(".sb", ${r2(w(id, 82))});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 83) - 0.08)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 84) + 0.3)});`,
    sfx: [{ t: -0.1, sfx: "whoosh-short", vol: 0.18 }, { t: w(id, 82), sfx: "click-soft", vol: 0.26 }, { t: w(id, 83) - 0.06, sfx: "chime", vol: 0.3, max: 1.3 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
