// Generador de las escenas HTML de reels/dos-repuestos (correr desde la carpeta del reel, después de `node armar.mjs`).
// Base: reels/dos-bicicleterias/gen.mjs. Los objetos son 3D y viven en assets/tres.js (una sola escena Three.js, la cámara
// viaja casi sin cortes); estas escenas son SOLO la capa plana de arriba: el gancho en grande, 1-2 rótulos con línea
// guía, el recuadro de selección y el cierre. De noche (fondo navy): letra crema con contorno navy.
// LIMPIO=1 node gen.mjs: escenas sin texto (para el fondo de la portada).
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.15);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const w = (id, i) => r2(pal[i].start - INI[id]);
const wf = (id, i) => r2(pal[i].end - INI[id]);
const LIMPIO = !!process.env.LIMPIO;

const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b", REDD = "#a8463d";

const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;

const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 48px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(0,0,0,0.3); }
    ${P} .pill.g { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.r { background: #f5dcd8; border-color: ${NAVY}; color: ${REDD}; }
    ${P} .pill.grande { font-size: 60px; padding: 20px 42px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 38px/1.25 "IBM Plex Mono", monospace; letter-spacing: 0.08em; text-transform: uppercase; color: ${NAVY}; white-space: nowrap; text-align: center; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${NAVY}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; stroke: ${NAVY}; stroke-width: 4; opacity: 0; } ${P} .dot.g { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${NAVY}; background: ${G}; border-radius: 8px; }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${NAVY}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 12px 34px 18px; border: 9px solid ${NAVY}; border-radius: 22px; font: 900 96px/1 "Lexend", sans-serif; letter-spacing: 0.01em; color: ${NAVY}; background: ${G}; opacity: 0; white-space: nowrap; }
`;

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
      const nota = (k, t) => { pop(".n" + k, t); if (q(".l" + k)) { dibujar(".l" + k, t + 0.04, 0.26); pop(".d" + k, t + 0.2, 0.2); } };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const sello = (s, t, rot) => tl.fromTo(q(s), { opacity: 0, scale: 1.8, rotation: rot ?? -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: rot ?? -8, duration: 0.28, ease: "power4.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
`;

function escena(id, { css = "", html, js, sfx }) {
  if (LIMPIO) { html = "<i></i>"; js = ""; }
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


const SOMBRA = `-5px -5px 0 ${NAVY}, 5px -5px 0 ${NAVY}, -5px 5px 0 ${NAVY}, 5px 5px 0 ${NAVY}, 0 -7px 0 ${NAVY}, 0 7px 0 ${NAVY}, -7px 0 0 ${NAVY}, 7px 0 0 ${NAVY}, 0 12px 0 rgba(0,0,0,0.4)`;
const SB = (k, x, y, ww, h) => `<div class="selbox ${k}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px;background:none;opacity:0">${esquinas}</div>`;
// relojito (pendiente, no "visto"): reemplaza al tilde gris de las apps de mensajería
const reloj = (c = REDD) => `<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="none" stroke="${c}" stroke-width="5"/><path d="M20 11 V20 L26 24" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ================= s01 · el gancho entero en el cuadro 0, sobre las dos fachadas cerradas (22:00) =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 84px; text-align: center; font: 800 72px/1.12 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; text-shadow: ${SOMBRA}; }
    P .b { position: absolute; left: 0; right: 0; top: 268px; text-align: center; font: 900 112px/1.04 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${CR}; text-shadow: ${SOMBRA}; }
    P .l { display: block; }
    P .kw { position: relative; display: inline-block; padding: 0 22px 12px; }
    P .kw .selbox { left: 0; top: 6px; right: 0; bottom: 0; }
    P .kw em { position: relative; font-style: normal; color: ${NAVY}; text-shadow: none; }`,
    html: `
      <div class="a" data-hold><span class="l">Dos casas de repuestos.</span><span class="l">El mismo mensaje.</span></div>
      <div class="b" data-hold><span class="l">Solo una le <span class="kw"><div class="selbox sb">${esquinas}</div><em>guardó</em></span></span><span class="l">la batería.</span></div>`,
    js: `
      tl.fromTo(q(".b"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".kw", ${r2(w(id, 10))}, 1.1);
      tl.to(qa(".a, .b"), { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, ${r2(ESC[id] - 0.32)});`,
    sfx: [
      { t: 0, sfx: "calle", vol: 0.32, max: 15 },
      { t: 0, sfx: "impact-bass-2", vol: 0.22, max: 1.0 },
      { t: w(id, 5) - 0.1, sfx: "pop", vol: 0.16 }, { t: w(id, 5) + 0.02, sfx: "pop", vol: 0.14 },
      { t: w(id, 10) - 0.4, sfx: "whoosh-short", vol: 0.1 },
      { t: w(id, 10) - 0.05, sfx: "impact-bass-1", vol: 0.18, max: 0.9 }, { t: w(id, 10), sfx: "pop", vol: 0.16 },
    ],
  });
}
// ================= s02 · diez de la noche: a Rubén se le murió la batería =================
{
  const id = "s02-bateria";
  escena(id, {
    html: `${leads(lead(1, 300, 1560, 470, 1250, "r"))}${pill(1, 300, 1610, "Sin arranque", "r")}`,
    js: `nota(1, ${r2(w(id, 21) + 0.4)}); sinNota(1, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: 0, sfx: "golpe", vol: 0.16 }, { t: 0.05, sfx: "click", vol: 0.2 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 21) + 0.05 + i * 0.13), sfx: "tac-real", vol: 0.45 })),
      ...[0, 1, 2].map((i) => ({ t: r2(w(id, 21) + 0.08 + i * 0.13), sfx: "click", vol: 0.26 })),
      { t: w(id, 21) + 0.4, sfx: "pop", vol: 0.14 },
    ],
  });
}
// ================= s03 · y mañana reparte: Rubén escribe y el mensaje vuela a los dos =================
{
  const id = "s03-escribe";
  escena(id, {
    html: `${pill(1, 540, 1700, `<span style="color:${G}">Mañana</span> · reparto`)}`,
    js: `nota(1, 0.1); sinNota(1, ${r2(w(id, 26) + 0.05)});`,
    sfx: [
      { t: -0.03, sfx: "click", vol: 0.16 },
      { t: 0.05, sfx: "tipeo", vol: 0.4, max: Math.max(0.3, w(id, 26) - 0.05) },
      { t: w(id, 26) + 0.05, sfx: "respuesta", vol: 0.3 }, { t: w(id, 26) + 0.1, sfx: "pop", vol: 0.15 }, { t: w(id, 26) + 0.2, sfx: "pop", vol: 0.13 },
      { t: w(id, 26) + 0.3, sfx: "whoosh-cinematic", vol: 0.2, max: 1.2 },
    ],
  });
}
// ================= s04 · en lo de Néstor, queda para mañana =================
{
  const id = "s04-nestor";
  escena(id, {
    html: `${leads(lead(1, 300, 1480, 420, 1240, "r"))}${pill(1, 300, 1530, `${reloj()}Sin leer`, "r grande")}`,
    js: `nota(1, ${r2(w(id, 31))}); sinNota(1, ${r2(ESC[id] - 0.25)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.12 },
      { t: w(id, 30) + 0.15, sfx: "vibra2", vol: 0.9, max: 0.6 }, { t: w(id, 30) + 0.17, sfx: "notification", vol: 0.2, max: 0.8 },
      { t: w(id, 31), sfx: "pop", vol: 0.14 },
      { t: w(id, 33) - 0.05, sfx: "tic", vol: 0.3 },
    ],
  });
}
// ================= s05 · en lo de Daniel contesta un agente de IA =================
{
  const id = "s05-daniel";
  escena(id, {
    html: `<i></i>`, js: ``,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.16 }, { t: 0.35, sfx: "whoosh-short", vol: 0.14 }, { t: 0.5, sfx: "sparkle", vol: 0.1, max: 0.8 },
      { t: w(id, 38) + 0.05, sfx: "respuesta", vol: 0.3 }, { t: w(id, 40) + 0.35, sfx: "respuesta", vol: 0.3 },
      { t: w(id, 42) + 0.25, sfx: "pop", vol: 0.2 },
    ],
  });
}
// ================= s05b · y se la reserva =================
{
  const id = "s05b-reserva";
  escena(id, {
    html: `<i></i>`, js: ``,
    sfx: [
      { t: 0.12, sfx: "respuesta", vol: 0.3 },
      { t: w(id, 46) - 0.05, sfx: "whoosh-short", vol: 0.18 },
      { t: w(id, 46) + 0.37, sfx: "pop", vol: 0.24 }, { t: w(id, 46) + 0.45, sfx: "click-soft", vol: 0.24 },
      { t: w(id, 46) + 0.18, sfx: "chime", vol: 0.28, max: 1.4 },
    ],
  });
}
// ================= s06 · Rubén: "¿Me contestaron a esta hora?" =================
{
  const id = "s06-ruben";
  escena(id, {
    html: `<i></i>`, js: ``,
    sfx: [{ t: -0.36, sfx: "whoosh-short", vol: 0.06 }, { t: -0.33, sfx: "vibra2", vol: 0.8, max: 0.35 }, { t: -0.32, sfx: "notification", vol: 0.3, max: 0.6 }],
  });
}
// ================= s07 · la batería estaba en los dos estantes =================
{
  const id = "s07-estantes";
  escena(id, {
    html: `${pill(1, 290, 1640, "Lo de Néstor")}${pill(2, 790, 1640, "Lo de Daniel")}`,
    js: `nota(1, ${r2(w(id, 52) + 0.25)}); nota(2, ${r2(w(id, 52) + 0.37)}); sinNota(1, ${r2(ESC[id] - 0.3)}); sinNota(2, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.16 }, { t: 0, sfx: "golpe", vol: 0.12 },
      { t: w(id, 57) - 0.08, sfx: "pop", vol: 0.18 }, { t: w(id, 57) - 0.02, sfx: "pop", vol: 0.16 },
      { t: w(id, 52) + 0.27, sfx: "click-soft", vol: 0.16 }, { t: w(id, 52) + 0.39, sfx: "click-soft", vol: 0.14 },
    ],
  });
}
// ================= s08 · la diferencia: uno dejó a alguien atendiendo =================
{
  const id = "s08-diferencia";
  escena(id, {
    css: `P .sb { border-color: ${G}; border-width: 9px; }`,
    html: `${SB("sb", 730, 720, 240, 420)}${pill(1, 765, 1800, `<span style="color:${G}">●</span> Atendiendo`, "grande")}${leads(lead(2, 300, 1330, 330, 1080, "r"))}${pill(2, 300, 1380, `${reloj()}Sin leer`, "r")}`,
    js: `caja(".sb", ${r2(w(id, 60) + 0.7)}); nota(2, ${r2(w(id, 60) + 0.8)}); nota(1, ${r2(w(id, 65) - 0.05)}); late(".n1", ${r2(w(id, 65) + 0.3)}, 1.08);
      tl.to(qa(".sb, .n2, .l2, .d2"), { opacity: 0, duration: 0.15 }, ${r2(w(id, 65) - 0.4)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.16 },
      { t: w(id, 60) + 0.7, sfx: "click", vol: 0.26 }, { t: w(id, 60) + 0.8, sfx: "pop", vol: 0.14 },
      { t: w(id, 65) - 0.05, sfx: "ding", vol: 0.14, max: 0.8 }, { t: w(id, 65), sfx: "pop", vol: 0.16 },
    ],
  });
}
// ================= s09 · a las ocho, Rubén ya tiene la suya (y el remate en silencio) =================
{
  const id = "s09-manana";
  const rem = r2(pal[73].end - INI[id] + 0.1);
  escena(id, {
    html: `<i></i>`, js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-cinematic", vol: 0.2, max: 1.2 }, { t: 0.1, sfx: "calle", vol: 0.7, max: 6.5 },
      { t: 0.25, sfx: "click", vol: 0.22 }, { t: 0.3, sfx: "campanita", vol: 0.2 },
      // la cortina de Néstor sube en 1 s desde w73 - 0,75 (traqueteo de lamas) y golpea arriba
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ t: r2(w(id, 73) - 0.75 + i * 0.11), sfx: "tac-real", vol: 0.18 })),
      { t: r2(w(id, 73) + 0.25), sfx: "golpe", vol: 0.3 },
      { t: rem + 0.33, sfx: "vibra2", vol: 0.9, max: 0.5 }, { t: rem + 0.35, sfx: "pop", vol: 0.32 },
      { t: rem + 1.25, sfx: "whoosh-short", vol: 0.2 }, { t: rem + 1.35, sfx: "sparkle", vol: 0.18, max: 0.8 },
    ],
  });
}
// ================= s10 · ¿querés ver cómo atendería tu local a las diez? =================
{
  const id = "s10-tu-local";
  escena(id, {
    html: `<i></i>`, js: ``,
    sfx: [
      { t: -0.05, sfx: "golpe", vol: 0.14 }, { t: 0.2, sfx: "click", vol: 0.2 },
      { t: w(id, 78) - 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: w(id, 78) + 0.4, sfx: "pop", vol: 0.24 }, { t: w(id, 78) + 0.45, sfx: "ding", vol: 0.14, max: 0.8 },
    ],
  });
}
// ================= s11 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s11-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 1050px; text-align: center; font: 900 122px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1190px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 34px 18px; font: 900 122px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; background: ${CR}; }
    P .banda { position: absolute; left: 60px; right: 60px; top: 1400px; height: 180px; border-radius: 30px; background: ${NAVY}; display: flex; align-items: center; justify-content: center; font: 900 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; }
    P .logo { position: absolute; left: 50%; top: 1680px; height: 62px; transform: translateX(-50%); }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="banda">scalerics.com</div>
      <img class="logo" src="assets/logo-oscuro.png" alt="Scalerics" />`,
    js: `
      tl.fromTo(q(".t1"), { opacity: 1, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.16, ease: "power3.out", immediateRender: true }, ${r2(Math.max(0.15, w(id, 86)))});
      caja(".sb", ${r2(Math.max(0.15, w(id, 86)))});
      tl.fromTo(q(".banda"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 86) + 0.12)});
      tl.fromTo(q(".logo"), { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: true }, ${r2(w(id, 86) + 0.5)});
      tl.fromTo(q(".banda"), { scale: 1 }, { scale: 1.07, duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 88) - 0.06)});`,
    sfx: [{ t: -0.1, sfx: "whoosh-short", vol: 0.18 }, { t: 0.02, sfx: "click-soft", vol: 0.26 }, { t: w(id, 86) + 0.14, sfx: "pop", vol: 0.16 }, { t: w(id, 88) - 0.48, sfx: "chime", vol: 0.3, max: 1.6 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR, LIMPIO ? "(LIMPIO)" : "");
