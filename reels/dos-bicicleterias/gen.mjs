// Generador de las escenas HTML de reels/dos-bicicleterias (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/por-que-la-lista. Los objetos son 3D y viven en assets/tres.js (una sola escena
// Three.js, la cámara viaja sin cortes); estas escenas son SOLO la capa plana de arriba: el gancho en grande,
// 1-2 rótulos con línea guía, sellos y el cierre. Fondo crema: letra navy, clave en recuadro verde con letra navy.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.55);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const w = (id, i) => r2(pal[i].start - INI[id]);

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
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${NAVY}; font: 700 48px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(11,18,32,0.18); }
    ${P} .pill.g { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.r { background: #ffffff; border-color: ${RED}; color: ${REDD}; }
    ${P} .pill.grande { font-size: 60px; padding: 20px 42px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 38px/1.25 "IBM Plex Mono", monospace; letter-spacing: 0.08em; text-transform: uppercase; color: ${NAVY}; white-space: nowrap; text-align: center; }
    ${P} .lead { fill: none; stroke: ${NAVY}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${NAVY}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${NAVY}; opacity: 0; } ${P} .dot.g { fill: ${G}; stroke: ${NAVY}; stroke-width: 5; } ${P} .dot.r { fill: ${RED}; }
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

// ================= s01 · el gancho entero en el cuadro 0, sobre las dos fachadas =================
const GANCHO_CSS = `
    P .a { position: absolute; left: 0; right: 0; top: 112px; text-align: center; font: 900 106px/1.08 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${NAVY}; text-shadow: -5px -5px 0 #efeee5, 5px -5px 0 #efeee5, -5px 5px 0 #efeee5, 5px 5px 0 #efeee5, 0 -7px 0 #efeee5, 0 7px 0 #efeee5, -7px 0 0 #efeee5, 7px 0 0 #efeee5, 0 11px 0 rgba(11,18,32,0.16); }
    P .a .kw em { text-shadow: none; }
    P .a .l { display: block; }
    P .kw { position: relative; display: inline-block; padding: 2px 26px 14px; margin-top: 10px; }
    P .kw .selbox { left: 0; top: 4px; right: 0; bottom: 0; }
    P .kw em { position: relative; font-style: normal; }
    P .mono { left: 540px; top: 1640px; font-size: 50px; letter-spacing: 0.04em; text-shadow: -5px -5px 0 #efeee5, 5px -5px 0 #efeee5, -5px 5px 0 #efeee5, 5px 5px 0 #efeee5, 0 -7px 0 #efeee5, 0 7px 0 #efeee5, -7px 0 0 #efeee5, 7px 0 0 #efeee5, 0 11px 0 rgba(11,18,32,0.16); }`;
const GANCHO_HTML = `
      <div class="a"><span class="l">Dos bicicleterías,</span><span class="l">los mismos cascos.</span><span class="l">Una sabe</span><span class="l"><span class="kw"><div class="selbox sb">${esquinas}</div><em>a quién avisarle.</em></span></span></div>
      <div class="mono">Mismo rubro · misma calle<br>una sola diferencia</div>`;
{
  const id = "s01-gancho";
  escena(id, {
    css: GANCHO_CSS,
    html: GANCHO_HTML,
    js: `tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.22, max: 1.0 },
      { t: w(id, 4) - 0.06, sfx: "pop", vol: 0.2 }, { t: w(id, 4) + 0.02, sfx: "pop", vol: 0.16 },
    ],
  });
}
// ================= s01b · "Una sabe a quién avisarle": la de la derecha se prende =================
{
  const id = "s01b-una";
  escena(id, {
    css: GANCHO_CSS,
    html: GANCHO_HTML,
    js: `
      late(".kw", ${r2(w(id, 7))}, 1.08);
      tl.to(q(".mono"), { opacity: 0, duration: 0.2 }, ${r2(ESC[id] - 0.44)});
      tl.to(q(".a"), { y: -60, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(ESC[id] - 0.44)});`,
    sfx: [
      { t: 0, sfx: "click", vol: 0.26 }, { t: 0.08, sfx: "sparkle", vol: 0.12, max: 1.0 },
      { t: w(id, 7), sfx: "pop", vol: 0.14 }, { t: ESC[id] - 0.4, sfx: "whoosh-cine-corto", vol: 0.26, max: 1.1 },
    ],
  });
}
// ================= s02 · la izquierda: una foto en las redes, para todos igual =================
{
  const id = "s02-izquierda";
  escena(id, {
    html: `${leads(lead(1, 720, 1580, 560, 1300))}${pill(1, 720, 1620, "para todos igual")}`,
    js: `nota(1, ${r2(w(id, 14) + 0.4)}); sinNota(1, ${r2(ESC[id] - 0.4)});`,
    sfx: [
      { t: w(id, 14) - 0.2, sfx: "whoosh-short", vol: 0.16 }, { t: w(id, 14) - 0.02, sfx: "flash", vol: 0.32 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 18) - 0.05 + i * 0.14), sfx: "whoosh-short", vol: 0.09 })),
      { t: w(id, 18) - 0.05, sfx: "pop", vol: 0.14 },
    ],
  });
}
// ================= s03 · la derecha: el CRM sabe =================
{
  const id = "s03-derecha";
  escena(id, {
    html: `${leads(lead(1, 300, 1580, 380, 1260))}${pill(1, 300, 1620, `<span style="color:${G}">CRM</span>`, "grande")}`,
    js: `nota(1, ${r2(w(id, 24) + 0.05)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.22, max: 1.0 }, { t: 0.5, sfx: "pop", vol: 0.18 },
      { t: w(id, 24) - 0.1, sfx: "typing", vol: 0.14, max: 0.6 }, { t: w(id, 24) + 0.1, sfx: "pop", vol: 0.14 },
    ],
  });
}
// ================= s04 · el filtro: compró bici, sin casco · quedan 3 =================
{
  const id = "s04-filtro";
  escena(id, {
    html: `${pill(1, 540, 1640, `${tick(26)}quedan 3`, "g grande")}`,
    js: `nota(1, ${r2(w(id, 30) + 0.05)});`,
    sfx: [
      { t: w(id, 27) + 0.2, sfx: "click", vol: 0.26 }, { t: w(id, 28) + 0.08, sfx: "whoosh-short", vol: 0.1 },
      { t: w(id, 29) + 0.2, sfx: "click", vol: 0.26 }, { t: w(id, 30) + 0.1, sfx: "whoosh-short", vol: 0.1 },
      { t: w(id, 30) + 0.4, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 30) + 0.08, sfx: "ding", vol: 0.12, max: 0.8 },
    ],
  });
}
// ================= s05 · le escribe a esos pocos: la ficha de Paula y su bici =================
{
  const id = "s05-escribe";
  escena(id, {
    css: `P .tk { position: absolute; left: 880px; top: 560px; opacity: 0; }`,
    html: `<div class="tk">${tick(48)}</div>`,
    js: `pop(".tk", ${r2(w(id, 35))}, 0.3, 0.4);`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.18 }, { t: 0.42, sfx: "pop", vol: 0.16 },
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ t: r2(w(id, 33) - 0.3 + i * 0.09), sfx: "tic", vol: 0.22 })),
      { t: w(id, 35) + 0.18, sfx: "click-soft", vol: 0.24 }, { t: w(id, 35), sfx: "ping", vol: 0.14 },
    ],
  });
}
// ================= s06 · el mensaje vuela al celular de Paula =================
{
  const id = "s06-mensaje";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0, sfx: "whoosh-short", vol: 0.16 }, { t: 0.05, sfx: "respuesta", vol: 0.3 }, { t: 0.28, sfx: "whoosh-short", vol: 0.14 },
      { t: w(id, 37) + 0.2, sfx: "vibra", vol: 0.3, max: 0.5 }, { t: w(id, 37) + 0.22, sfx: "notification", vol: 0.22 },

    ],
  });
}
// ================= s07 · Paula vio las dos; la foto la pasó de largo =================
{
  const id = "s07-vio";
  escena(id, {
    html: `${leads(lead(1, 560, 650, 740, 700, "r"))}${pill(1, 330, 640, "la pasó de largo", "r")}`,
    js: `nota(1, ${r2(w(id, 49) + 0.02)}); sinNota(1, ${r2(ESC[id] - 0.32)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-cine-corto", vol: 0.2, max: 1.0 }, { t: 0.5, sfx: "pop", vol: 0.12 },
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ t: r2(-0.1 + i * 0.1), sfx: "tic", vol: 0.18 })),
      { t: w(id, 46) - 0.08, sfx: "pop", vol: 0.16 }, { t: w(id, 49) - 0.05, sfx: "whoosh-short", vol: 0.2 },
      { t: w(id, 49) + 0.05, sfx: "pop", vol: 0.14 },
    ],
  });
}
// ================= s08 · su nombre, no: esa tarde vuelve =================
{
  const id = "s08-su-nombre";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.12, sfx: "whoosh-short", vol: 0.08 }, { t: w(id, 55), sfx: "ding", vol: 0.14, max: 0.8 },
      // CUT2 (w57 + 0,33): corte a la bicicletería verde; pasos mientras entra empujando la bici
      { t: r2(w(id, 57) + 0.29), sfx: "whoosh-short", vol: 0.14 },
      ...Array.from({ length: 12 }, (_, i) => ({ t: r2(w(id, 57) + 0.4 + i * 0.11), sfx: "tic", vol: 0.16 })),
      { t: w(id, 59) + 0.3, sfx: "puerta", vol: 0.22, max: 0.9 }, { t: w(id, 59) + 0.35, sfx: "campanita", vol: 0.3 },
    ],
  });
}
// ================= s09 · mismos cascos, mismos clientes =================
{
  const id = "s09-mismos";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.24, max: 1.1 },
      { t: w(id, 61) - 0.08, sfx: "pop", vol: 0.18 }, { t: w(id, 61) - 0.02, sfx: "pop", vol: 0.16 }, { t: w(id, 61) + 0.1, sfx: "whoosh-short", vol: 0.1 },
      { t: w(id, 62) - 0.05, sfx: "pop", vol: 0.14 },
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 63) - 0.1 + i * 0.06), sfx: "pop", vol: 0.12 })),
    ],
  });
}
// ================= s10 · una sabía qué se llevó cada uno =================
{
  const id = "s10-sabia";
  escena(id, {
    html: `${leads(lead(1, 540, 1600, 540, 1215))}${pill(1, 540, 1640, "lo que compró cada uno")}`,
    js: `nota(1, ${r2(w(id, 66) + 0.05)});`,
    sfx: [
      ...[0, 1, 2, 3].map((i) => ({ t: r2(w(id, 64) - 0.1 + i * 0.05), sfx: "tic", vol: 0.18 })),
      { t: w(id, 65), sfx: "whoosh-short", vol: 0.16 },
      ...[66, 67, 68, 69].map((k) => ({ t: r2(w(id, k) - 0.06), sfx: "pop", vol: 0.16 })),
    ],
  });
}
// ================= s11 · en Scalerics armamos ese CRM: callback a la ficha de Paula =================
{
  const id = "s11-scalerics";
  escena(id, {
    html: `${leads(lead(1, 540, 1590, 540, 1300))}${pill(1, 540, 1640, `CRM · <span style="color:${G}">Scalerics</span>`, "grande")}`,
    js: `nota(1, ${r2(w(id, 72) + 0.1)});`,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.18 },
      { t: w(id, 72) + 0.3, sfx: "click-soft", vol: 0.24 },
      { t: w(id, 73) - 0.4, sfx: "whoosh-short", vol: 0.18 }, { t: w(id, 73) + 0.02, sfx: "click", vol: 0.28 }, { t: w(id, 73) + 0.03, sfx: "ding", vol: 0.14, max: 0.8 },
    ],
  });
}
// ================= s12 · ¿vemos a quién avisarle en tu local? =================
{
  const id = "s12-tu-local";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.05, sfx: "whoosh-short", vol: 0.16 },
      ...[0, 1, 2].map((i) => ({ t: r2(w(id, 78) - 0.06 + i * 0.1), sfx: "pop", vol: 0.15 })),
      ...[0, 1, 2].map((i) => ({ t: r2(w(id, 82) + i * 0.1), sfx: "ping", vol: 0.13 })),
      { t: w(id, 83) - 0.15, sfx: "whoosh-cine-corto", vol: 0.24, max: 1.0 },
    ],
  });
}
// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .panel { position: absolute; left: 0; top: 1010px; width: 1080px; height: 910px; background: ${CR}; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1060px; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1196px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .banda { position: absolute; left: 70px; right: 70px; top: 1400px; height: 170px; border-radius: 28px; background: ${NAVY}; display: flex; align-items: center; justify-content: center; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; }`,
    html: `
      <div class="panel"></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="banda">scalerics.com</div>`,
    js: `
      tl.fromTo(q(".panel"), { y: 140 }, { y: 0, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t1"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out", immediateRender: true }, 0.02);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out", immediateRender: true }, ${r2(w(id, 86) - 0.15)});
      caja(".sb", ${r2(w(id, 86))});
      tl.fromTo(q(".banda"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 86) + 0.3)});
      tl.fromTo(q(".banda"), { scale: 1 }, { scale: 1.07, duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 88) - 0.06)});`,
    sfx: [{ t: -0.1, sfx: "whoosh-short", vol: 0.18 }, { t: w(id, 86), sfx: "click-soft", vol: 0.26 }, { t: w(id, 86) + 0.32, sfx: "pop", vol: 0.16 }, { t: w(id, 88) - 0.06, sfx: "chime", vol: 0.3, max: 1.3 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
