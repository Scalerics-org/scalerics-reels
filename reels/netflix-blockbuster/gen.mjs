// Generador de las escenas HTML de reels/netflix-blockbuster (versión corta del 03-11, ~30 s) (correr desde la carpeta del reel,
// después de `node armar.mjs`). Base: reels/caso-dominos. Los objetos son 3D de verdad y viven en
// assets/tres.js (una sola escena Three.js para todo el reel, con la cámara que se mueve y los
// objetos que se transforman); estas escenas son SOLO la capa plana de arriba: el gancho en
// grande, etiquetas con línea guía, contadores, sellos y la tarjeta de cierre. Nada de esto se
// inclina. Netflix y Blockbuster se nombran en texto: no se dibuja ningún logo ni sus colores.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 2.2);
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

// ================= s01 · gancho (cuadro 0 = portada) =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .tit { position: absolute; left: 0; right: 0; top: 170px; text-align: center; ${TIT} }
    P .tit .v { color: ${G}; font-size: 98px; }`,
    html: `
      <div class="tit"><div>Blockbuster pudo</div><div>comprar Netflix</div><div class="v">por US$ 50 millones</div></div>`,
    js: `
      tl.fromTo(q(".tit"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".tit .v", ${w(id, 5)}, 1.08);`,
    sfx: [{ t: 0, sfx: "impact-bass-2", vol: 0.22 }, { t: w(id, 5), sfx: "click-soft", vol: 0.28 }],
  });
}

// ================= s02 · dijo que no: cae el sello =================
{
  const id = "s02-no";
  escena(id, {
    css: `
    P .tit { position: absolute; left: 0; right: 0; top: 230px; text-align: center; ${TIT} font-size: 150px; }
    P .sello { left: 540px; top: 1090px; font-size: 230px; padding: 10px 56px 26px; border-width: 14px; border-radius: 34px; }`,
    html: `
      <div class="tit">Dijo que no.</div>
      <div class="sello sx">NO</div>`,
    js: `
      tl.fromTo(q(".tit"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.out" }, 0);
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".sx", ${r2(w(id, 11) - 0.12)}, -10);`,
    sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 11) + 0.14, sfx: "impact-bass-1", vol: 0.36 }],
  });
}

// ================= s03 · diez años después, quebró: 2010 y la persiana =================
{
  const id = "s03-quiebra";
  escena(id, {
    css: `P .sello { left: 540px; top: 1250px; font-size: 104px; }`,
    html: `<div class="sello sx">QUIEBRA</div>`,
    js: `
      tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0);
      sello(".sx", ${r2(w(id, 15) + 0.05)}, -6);`,
    sfx: [{ t: 0.1, sfx: "riser", vol: 0.14, max: 1.2 }, { t: 0.3, sfx: "typing", vol: 0.12, max: 0.9 }, { t: w(id, 15) + 0.2, sfx: "impact-bass-2", vol: 0.34 }],
  });
}

// ================= s04 · ¿por qué? (golpe corto) =================
{
  const id = "s04-porque";
  escena(id, {
    css: `
    P .flash { position: absolute; inset: 0; background: ${CR}; opacity: 0; }
    P .pq { position: absolute; left: 0; right: 0; top: 760px; text-align: center; ${TIT} font-size: 200px; text-shadow: 0 10px 0 rgba(3,6,12,0.7); }`,
    html: `<div class="flash"></div><div class="pq">¿Por qué?</div>`,
    js: `
      tl.fromTo(q(".flash"), { opacity: 0.55 }, { opacity: 0, duration: 0.25, ease: "power2.out", immediateRender: true }, 0);
      tl.fromTo(q(".pq"), { scale: 1.5, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.2, ease: "power4.out", immediateRender: true }, 0);
      tl.to(q(".pq"), { scale: 1.06, duration: 0.6, ease: "none" }, 0.2);`,
    sfx: [{ t: 0, sfx: "impact-bass-1", vol: 0.34 }],
  });
}

// ================= s05 · elegir la película desde tu casa =================
{
  const id = "s05-casa";
  escena(id, {
    html: `${pill(1, 540, 1655, `${tick(26)}Desde tu casa`, "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 24) - 0.05)});`,
    sfx: [{ t: 0.05, sfx: "pop", vol: 0.22 }, { t: w(id, 21), sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 24), sfx: "ping", vol: 0.25 }],
  });
}

// ================= s06 · sin ir al local, sin multas =================
{
  const id = "s06-sin";
  escena(id, {
    css: `P .xx { position: absolute; left: 540px; top: 1170px; opacity: 0; }`,
    html: `
      <div class="xx">${cruz(92)}</div>
      ${pill(1, 540, 1650, `${tick(26)}Sin multas`, "lleno grande")}`,
    js: `
      tl.set(q(".xx"), { xPercent: -50, yPercent: -50 }, 0);
      pop(".xx", ${r2(w(id, 28))}, 0.3, 0.3);
      tl.set(q(".xx"), { opacity: 0 }, ${r2(w(id, 31) - 0.06)});
      nota(1, ${r2(w(id, 32) + 0.2)});`,
    sfx: [{ t: w(id, 28), sfx: "glitch-1", vol: 0.16 }, { t: w(id, 31), sfx: "pop", vol: 0.22 }, { t: w(id, 32) + 0.2, sfx: "ping", vol: 0.26 }],
  });
}

// ================= s07 · las películas eran las mismas =================
{
  const id = "s07-mismas";
  escena(id, {
    css: `
    P .igual { position: absolute; left: 540px; top: 1120px; width: 170px; height: 170px; border-radius: 50%; background: ${G}; color: ${NAVY}; display: flex; align-items: center; justify-content: center; font: 900 150px/1 "Lexend", sans-serif; padding-bottom: 14px; box-shadow: 0 10px 0 rgba(3,6,12,0.5); opacity: 0; }`,
    html: `
      ${pill(1, 280, 1530, "Netflix")}
      ${pill(2, 800, 1530, "Blockbuster")}
      <div class="igual">=</div>`,
    js: `
      tl.set(q(".igual"), { xPercent: -50, yPercent: -50 }, 0);
      nota(1, ${r2(w(id, 34))});
      nota(2, ${r2(w(id, 34) + 0.15)});
      pop(".igual", ${r2(w(id, 37) - 0.05)}, 0.32, 0.3);`,
    sfx: [{ t: w(id, 34), sfx: "pop", vol: 0.2 }, { t: w(id, 34) + 0.15, sfx: "pop", vol: 0.2 }, { t: w(id, 37), sfx: "ping", vol: 0.26 }],
  });
}

// ================= s08 · cambió la forma de comprar (la peli entra al sobre y viaja) =================
{
  const id = "s08-forma";
  escena(id, {
    css: `P .mono { font-size: 44px; }`,
    html: `${mono(1, 540, 1560, "llega a tu casa", "g")}`,
    js: `pop(".n1", ${r2(w(id, 39))}, 0.3, 0.9);`,
    sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 40), sfx: "click-soft", vol: 0.26 }, { t: w(id, 42), sfx: "whoosh-cinematic", vol: 0.24, max: 1.0 }],
  });
}

// ================= s09 · hoy compran desde el celular =================
{
  const id = "s09-celular";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 46), sfx: "notification", vol: 0.24, max: 1.2 }],
  });
}

// ================= s10 · ¿tu negocio está ahí? =================
{
  const id = "s10-ahi";
  escena(id, {
    css: `
    P .tit { position: absolute; left: 0; right: 0; top: 150px; text-align: center; ${TIT} font-size: 118px; }
    P .tit .bx { position: relative; display: inline-block; padding: 0 24px 8px; }
    P .tit .selbox { left: 0; top: 0; right: 0; bottom: 0; }`,
    html: `<div class="tit"><div>¿Tu negocio</div><div>está <span class="bx"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">ahí?</em></span></div></div>`,
    js: `
      tl.fromTo(q(".tit"), { opacity: 0, scale: 1.12, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, 0);
      caja(".sb", ${r2(w(id, 53) - 0.05)});`,
    sfx: [{ t: 0, sfx: "impact-bass-2", vol: 0.24 }, { t: w(id, 51) + 0.15, sfx: "glitch-1", vol: 0.12 }, { t: w(id, 53), sfx: "click-soft", vol: 0.28 }],
  });
}

// ================= s11 · tu tienda online =================
{
  const id = "s11-tienda";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: 0.0, sfx: "whoosh-cinematic", vol: 0.22, max: 0.8 }, { t: 0.35, sfx: "sparkle", vol: 0.16 }, { t: w(id, 58), sfx: "pop", vol: 0.22 }, { t: w(id, 58) + 0.15, sfx: "pop", vol: 0.2 }],
  });
}

// ================= s12 + s13 · cierre: videollamada gratis en scalerics.com =================
const CTA_CSS = `
    P .t1 { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }
    P .t2w { position: absolute; left: 0; right: 0; top: 296px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 480px; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; text-shadow: 0 6px 0 rgba(3,6,12,0.5); }`;
const CTA_HTML = (t3) => `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      ${t3 ? `<div class="t3">scalerics.com</div>` : ""}`;
{
  const id = "s12-llamada";
  escena(id, {
    css: CTA_CSS,
    html: CTA_HTML(false),
    js: `
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(w(id, 62) - 0.1)});
      caja(".sb", ${r2(w(id, 63))});`,
    sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.6 }, { t: w(id, 63), sfx: "click-soft", vol: 0.28 }],
  });
}
{
  const id = "s13-web";
  escena(id, {
    css: CTA_CSS + `
    P .selbox { opacity: 1; }`,
    html: CTA_HTML(true),
    js: `
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, 0.02);
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 3, immediateRender: false }, 0.6);
      `,
    sfx: [{ t: 0.02, sfx: "chime", vol: 0.3 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
