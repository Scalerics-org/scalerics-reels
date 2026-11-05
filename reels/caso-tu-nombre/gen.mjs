// Generador de las escenas HTML de reels/caso-tu-nombre (correr desde la carpeta del reel: `node gen.mjs && node armar.mjs`).
// Base: reels/caso-pedidosya. Los objetos son 3D de verdad y viven en assets/tres.js (una sola escena
// Three.js, la cámara viaja sin cortes); estas escenas son SOLO la capa plana de arriba, sobre FONDO CREMA:
// el gancho en grande, 1-2 rótulos con línea guía, sellos y el cierre. Coca-Cola se nombra en texto:
// ni logo, ni su rojo, ni su tipografía.
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
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 46px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.18); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${GD}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${NAVY}; opacity: 0; } ${P} .dot.g { fill: ${GD}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: ${G}; opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: ${RED}; }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${NAVY}; }
    ${P} .selbox.r i { border-color: ${NAVY}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${RED}; border-radius: 22px; font: 900 92px/1 "Lexend", sans-serif; letter-spacing: 0.02em; color: ${RED}; background: ${CR}; opacity: 0; white-space: nowrap; }
    ${P} .sello.g { border-color: ${NAVY}; background: ${G}; color: ${NAVY}; }
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
      const nota = (k, t) => { pop(".n" + k, t); if (q(".l" + k)) { dibujar(".l" + k, t + 0.05, 0.28); pop(".d" + k, t + 0.22, 0.2); } };
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



const TIT = `font: 900 112px/1.04 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.035em;`;
// palabra en recuadro de selección (verde lleno, o rojo apagado si es el problema); sin espacio doble antes
const sel = (txt, kind = "", cls = "sb") => `<span class="selw"><span class="selbox ${kind} ${cls}">${esquinas}</span><em>${txt}</em></span>`;
const SELCSS = `P .selw { position: relative; display: inline-block; padding: 0 16px; margin: 0 -4px 0 8px; }
    P .selw em { position: relative; font-style: normal; }
    P .selw .selbox { left: 0; right: 0; top: 6px; bottom: 2px; }`;
const CINE = "whoosh-cine-corto"; // tramo real de whoosh-cinematic.mp3 (ver fuentes.md)

// ================= s01 · gancho (cuadro 0 = portada) =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 40px; right: 40px; top: 130px; text-align: center; ${TIT} }
    ${SELCSS}`,
    html: `
      <div class="a"><div>¿Por qué</div><div>Coca-Cola sacó</div><div>su logo y puso</div><div>${sel("tu nombre")}?</div></div>`,
    js: `
      gsap.set(q(".sb"), { opacity: 1 });
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".sb", ${r2(w(id, 8) - 0.05)}, 1.08);
      tl.to(q(".a"), { y: -60, opacity: 0, duration: 0.18, ease: "power2.in" }, ${r2(ESC[id] - 0.34)});`,
    sfx: [
      { t: 0.04, sfx: "impact-bass-1", vol: 0.2, max: 0.8 }, { t: 0.06, sfx: CINE, vol: 0.08 }, { t: 0.5, sfx: "campanita", vol: 0.25, max: 0.6 },
      { t: w(id, 5) - 0.05, sfx: "pop", vol: 0.2 },
      { t: w(id, 8) - 0.1, sfx: "pop", vol: 0.24 }, { t: w(id, 8) - 0.05, sfx: "sparkle", vol: 0.16 },
    ],
  });
}

// ================= s02 · Australia, 2011 =================
{
  const id = "s02-australia";
  escena(id, {
    html: `${leads(lead(1, 530, 1565, 480, 1110))}${pill(1, 540, 1610, "Australia")}`,
    js: `nota(1, ${r2(w(id, 12) - 0.05)}); sinNota(1, ${r2(ESC[id] - 0.6)});`,
    sfx: [
      { t: 0, sfx: CINE, vol: 0.2 }, { t: 0.62, sfx: "golpe", vol: 0.26 },
      { t: w(id, 12), sfx: "click-soft", vol: 0.2 }, { t: w(id, 14) - 0.1, sfx: "pop", vol: 0.22 }, { t: w(id, 14) - 0.05, sfx: "impact-bass-2", vol: 0.14, max: 0.6 },
    ],
  });
}

// ================= s03 · 150 nombres, los más comunes =================
{
  const id = "s03-ciento-cincuenta";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh", vol: 0.2, max: 0.7 },
      ...[0, 0.22, 0.44].flatMap((f) => [0, 1, 2].map((k) => ({ t: r2(0.02 + f + k * 0.09), sfx: "campanita", vol: 0.25, max: 0.35 }))),
      ...[0, 1, 2, 3, 4, 5].map((k) => ({ t: r2(0.3 + k * 0.17), sfx: "tic", vol: 0.2 })),
    ],
  });
}

// ================= s04 · para que buscaras el tuyo =================
{
  const id = "s04-buscar";
  escena(id, {
    css: `P .tk { position: absolute; left: 650px; top: 1010px; opacity: 0; }`,
    html: `<div class="tk">${tick(50)}</div>`,
    js: `pop(".tk", ${r2(w(id, 27) - 0.05)}, 0.3, 0.3); fuera(".tk", ${r2(ESC[id] - 0.2)});`,
    sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.22 }, { t: 0.3, sfx: "campanita", vol: 0.12, max: 0.5 }, { t: w(id, 27) - 0.05, sfx: "ping", vol: 0.2 }],
  });
}

// ================= s04b · y se la compartieras a un amigo (brindis) =================
{
  const id = "s04b-amigo";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: w(id, 31) - 0.35, sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: w(id, 34) - 0.12, sfx: "campanita", vol: 0.24, max: 0.8 }, { t: w(id, 34) - 0.1, sfx: "pop", vol: 0.12 }],
  });
}

// ================= s05 · más de 80 países =================
{
  const id = "s05-paises";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: CINE, vol: 0.2 },
      ...Array.from({ length: 6 }, (_, k) => ({ t: r2(0.45 + k * 0.12), sfx: "pop", vol: 0.1 })),
      { t: w(id, 39) - 0.12, sfx: "impact-bass-2", vol: 0.08, max: 0.5 },
    ],
  });
}

// ================= s06 · tuvo que adivinar (bisagra) =================
{
  const id = "s06-adivinar";
  escena(id, {
    css: `P .a { position: absolute; left: 40px; right: 40px; top: 170px; text-align: center; ${TIT} font-size: 104px; }
    ${SELCSS}`,
    html: `<div class="a"><div>Coca-Cola tuvo</div><div>que${sel("adivinar", "r")}</div></div>`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.2, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.24, ease: "power4.out", immediateRender: true }, 0.02);
      caja(".sb", ${r2(w(id, 45) + 0.05)});
      tl.fromTo(q(".selw em"), { color: "${NAVY}" }, { color: "#ffffff", duration: 0.1, immediateRender: true }, ${r2(w(id, 45) + 0.08)});
      tl.to(q(".a"), { opacity: 0, y: -40, duration: 0.16, ease: "power2.in" }, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: 0, sfx: "pop", vol: 0.12 }, { t: 0.1, sfx: "typing", vol: 0.5, max: 1.2 },
      ...Array.from({ length: 9 }, (_, k) => ({ t: r2(0.12 + k * 0.13), sfx: "tic", vol: 0.3 })),
      { t: w(id, 45) + 0.05, sfx: "golpe", vol: 0.3 }, { t: w(id, 45) + 0.08, sfx: "glitch-1", vol: 0.1, max: 0.5 },
    ],
  });
}

// ================= s07 · vos ya sabés el de cada cliente =================
{
  const id = "s07-vos";
  escena(id, {
    css: `P .tk { position: absolute; left: 840px; top: 960px; opacity: 0; }`,
    html: `<div class="tk">${tick(50)}</div>`,
    js: `pop(".tk", ${r2(w(id, 50) + 0.3)}, 0.3, 0.3);`,
    sfx: [
      { t: 0, sfx: "tijera", vol: 0.22 }, { t: 0.1, sfx: "whoosh-short", vol: 0.18 },
      { t: 0.8, sfx: "naipe", vol: 0.24 }, { t: w(id, 50) + 0.3, sfx: "ping", vol: 0.2 },
      { t: w(id, 53) - 0.15, sfx: "naipe", vol: 0.2 }, { t: w(id, 53) - 0.05, sfx: "naipe", vol: 0.2 },
    ],
  });
}

// ================= s08 · Lucía esperaba que volviera su talle =================
{
  const id = "s08-lucia";
  escena(id, {
    html: `${leads(lead(1, 830, 1260, 790, 1150, "r"))}${pill(1, 830, 1305, "agotado", "rl")}`,
    js: `nota(1, ${r2(w(id, 60) - 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh", vol: 0.1, max: 0.6 }, { t: 0.15, sfx: "salto", vol: 0.1 }, { t: 0.6, sfx: "ficha", vol: 0.14 },
      { t: 1.9, sfx: "glitch-1", vol: 0.1, max: 0.35 },
    ],
  });
}

// ================= s09 · llega la caja, y sale solo el mensaje =================
{
  const id = "s09-caja";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.32, sfx: "golpe", vol: 0.3 }, { t: 0.32, sfx: "impact-bass-1", vol: 0.12 },
      { t: w(id, 63) + 0.1, sfx: "naipe", vol: 0.2 }, { t: w(id, 63) + 0.3, sfx: "correcta", vol: 0.16, max: 0.9 },
      { t: w(id, 65) - 0.45, sfx: "whoosh", vol: 0.22, max: 0.8 }, { t: w(id, 66) + 0.1, sfx: "vibra", vol: 0.14, max: 0.6 }, { t: w(id, 66) + 0.12, sfx: "notification", vol: 0.14, max: 1.0 },
    ],
  });
}

// ================= s10 · Lucía, volvió tu talle (callback) =================
{
  const id = "s10-mensaje";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [ { t: w(id, 72) + 0.2, sfx: "ping", vol: 0.16 }, { t: w(id, 72) + 0.2, sfx: "pop", vol: 0.12 }],
  });
}

// ================= s11 · lo automatizamos en Scalerics =================
{
  const id = "s11-automatizamos";
  escena(id, {
    css: `P .pill b { color: ${G}; font-weight: 800; }`,
    html: `${pill(1, 540, 1640, "Automatización · <b>Scalerics</b>")}`,
    js: `nota(1, ${r2(w(id, 75) - 0.1)}); fuera(".n1", ${r2(ESC[id] - 0.35)});`,
    sfx: [
      { t: 0, sfx: CINE, vol: 0.12 }, { t: 0.15, sfx: "pop", vol: 0.14 }, { t: 0.47, sfx: "pop", vol: 0.14 }, 
      { t: w(id, 74) + 0.1, sfx: "ping", vol: 0.18 }, { t: w(id, 75), sfx: "ping", vol: 0.18 }, { t: w(id, 76) + 0.1, sfx: "ping", vol: 0.18 },
    ],
  });
}

// ================= s12 · ¿lo vemos en tu local? =================
{
  const id = "s12-tu-local";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: -0.15, sfx: "whoosh", vol: 0.2, max: 0.7 }, { t: 0.2, sfx: "campanita", vol: 0.16, max: 0.6 }, { t: w(id, 81) - 0.02, sfx: "pop", vol: 0.26 }, { t: w(id, 81) - 0.02, sfx: "salto", vol: 0.18 }],
  });
}

// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 170px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 316px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3w { position: absolute; left: 0; right: 0; top: 500px; text-align: center; }
    P .t3 { display: inline-block; padding: 18px 44px 26px; border-radius: 30px; background: ${NAVY}; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(w(id, 85) - 0.15)});
      caja(".sb", ${r2(w(id, 85))});
      tl.fromTo(q(".t3w"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 87) - 0.62)});
      tl.fromTo(q(".t3w"), { scale: 1 }, { scale: 1.05, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 87) + 0.2)});`,
    sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(id, 87) - 0.3, sfx: "vibra", vol: 0.1, max: 0.35 }, { t: w(id, 85), sfx: "click-soft", vol: 0.26 }, { t: w(id, 87) - 0.62, sfx: "chime", vol: 0.3, max: 1.4 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
