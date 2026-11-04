// Generador de escenas de reels/zara-repone (correr desde la carpeta del reel, después de
// `node armar.mjs`). Copiado de la forma de reels/por-que-la-tarjeta: estilo "resultaaquee", un
// objeto grande relleno por escena que se transforma en el siguiente:
// remera en la percha → billete colgado → caja gigante → tandas chicas → tienda → dos remeras →
// fábrica → caja registradora → estante → panel de stock y ventas → videollamada.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 32.29;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", CR2 = "#d6d4c6", CR3 = "#b9b7a8", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", REDD = "#9e4c44";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${NAVY}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${RED}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;
const pz = (cls, x, y, w, h, vb, inner) => `<div class="pz ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><svg viewBox="${vb}" width="${w}" height="${h}" aria-hidden="true">${inner}</svg></div>`;
let uid = 0;

// barra del perchero (de lado a lado)
const barra = (y = 596) => `<div class="barra" style="top:${y}px"></div><div class="barra-luz" style="top:${y}px"></div>`;

// percha: el gancho cuelga de la barra (y 600); los hombros quedan detrás de la remera
const percha = (cls, x = 210, y = 600, w = 660) =>
  pz("percha " + cls, x, y, w, r2(w * 200 / 660), "0 0 660 200",
    `<path d="M330 92 L330 46 Q330 10 360 10 Q390 10 390 38" fill="none" stroke="${CR}" stroke-width="14" stroke-linecap="round"/>` +
    `<path d="M330 92 L78 170 Q52 182 80 186 L580 186 Q608 182 582 170 Z" fill="none" stroke="${CR}" stroke-width="14" stroke-linejoin="round"/>`);

// remera (viewBox 660 x 690): cuerpo, cuello, lado en sombra, luz en diagonal con corte duro
const CAMISA = "M222 12 Q330 84 438 12 L610 84 L656 262 L542 292 L530 226 L530 684 L130 684 L130 226 L118 292 L4 262 L50 84 Z";
const remera = (cls, color, osc, x = 210, y = 676, w = 660) => {
  const id = `zr${++uid}`;
  return pz("remera " + cls, x, y, w, r2(w * 690 / 660), "0 0 660 690",
    `<defs><clipPath id="${id}"><path d="${CAMISA}"/></clipPath></defs>` +
    `<path class="tela" d="${CAMISA}" fill="${color}"/>` +
    `<g clip-path="url(#${id})">` +
    `<polygon class="osc" points="452,0 660,0 660,690 452,690" fill="${osc}"/>` +
    `<rect class="osc" x="0" y="640" width="660" height="50" fill="${osc}" opacity="0.7"/>` +
    `<polygon points="0,0 250,0 96,690 0,690" fill="rgba(255,255,255,0.16)"/>` +
    `</g>` +
    `<path class="osc" d="M222 12 Q330 84 438 12 Q330 132 222 12 Z" fill="${osc}"/>`);
};

// etiqueta de precio colgante (viewBox 300 x 420)
const etiqueta = (cls, x, y, txt, color = CR, tc = NAVY) =>
  pz("etq " + cls, x, y, 300, 420, "0 0 300 420",
    `<path d="M150 0 L150 70" stroke="${CR}" stroke-width="8"/>` +
    `<path d="M40 110 L150 60 L260 110 L260 400 Q260 418 242 418 L58 418 Q40 418 40 400 Z" fill="${color}"/>` +
    `<polygon points="200,82 260,110 260,418 200,418" fill="rgba(11,18,32,0.12)"/>` +
    `<circle cx="150" cy="104" r="16" fill="${NAVY}"/>` +
    `<text x="150" y="330" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="190" fill="${tc}">${txt}</text>`);

// billete (viewBox 640 x 340)
const billete = (cls, x, y, w = 640, color = G, osc = GD) =>
  pz("bill " + cls, x, y, w, r2(w * 340 / 640), "0 0 640 340",
    `<rect x="0" y="0" width="640" height="340" rx="26" fill="${color}"/>` +
    `<polygon points="470,0 640,0 640,340 380,340" fill="${osc}"/>` +
    `<rect x="34" y="34" width="572" height="272" rx="16" fill="none" stroke="${NAVY}" stroke-width="10"/>` +
    `<circle cx="320" cy="170" r="92" fill="${NAVY}"/>` +
    `<text x="320" y="222" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="150" fill="${color}">$</text>` +
    `<circle cx="110" cy="170" r="24" fill="${NAVY}"/><circle cx="530" cy="170" r="24" fill="${NAVY}"/>`);

// caja de cartón en 3/4 (viewBox 400 x 360): frente, tapa, lado y cinta
const caja = (cls, x, y, w, frente = CR, tapa = CR2, lado = CR3, cinta = G, txt = "") =>
  pz("cj " + cls, x, y, w, r2(w * 360 / 400), "0 0 400 360",
    `<polygon points="0,90 300,90 300,360 0,360" fill="${frente}"/>` +
    `<polygon points="0,90 90,0 400,0 300,90" fill="${tapa}"/>` +
    `<polygon points="300,90 400,0 400,270 300,360" fill="${lado}"/>` +
    `<polygon points="130,90 220,0 260,0 170,90" fill="${cinta}"/>` +
    `<rect x="130" y="90" width="40" height="90" fill="${cinta}"/>` +
    (txt ? `<text x="150" y="290" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="58" fill="${NAVY}">${txt}</text>` : ""));

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pz { position: absolute; }
    ${P} .pz svg { display: block; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.55); }
    ${P} .barra { position: absolute; left: 60px; width: 960px; height: 26px; border-radius: 13px; background: ${NAVY3}; border: 5px solid ${BORDE}; }
    ${P} .barra-luz { position: absolute; left: 80px; width: 920px; height: 7px; margin-top: 6px; border-radius: 4px; background: rgba(239,238,229,0.25); }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 700; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .pill.grande { font-size: 50px; padding: 18px 40px 20px; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .ic { position: absolute; opacity: 0; }
    ${P} .ic svg { display: block; }
    ${P} .tachar { fill: none; stroke: ${RED}; stroke-width: 12; stroke-linecap: round; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)", immediateRender: true }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.3); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.18 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const marco = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const hamaca = (s, t, a, d) => tl.fromTo(q(s), { rotation: a }, { rotation: 0, duration: d ?? 1.2, ease: "elastic.out(1, 0.35)", transformOrigin: "50% 0%", immediateRender: false }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
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

// ================= s01 · gancho =================
// "Zara no se juega toda la temporada de entrada." (temporada 1.50 · entrada 2.10)
const FILA = [-300, -200, -100, 100, 200, 300];
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 100px; text-align: center; font: 800 112px/0.98 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .v { color: ${G}; display: inline-block; }
    P .fila .remera { opacity: 0; }`,
  html: `
      ${barra()}
      <div class="capa fila">${FILA.map((dx, i) => remera("f" + i, i % 2 ? CR2 : CR3, i % 2 ? CR3 : "#9d9b8d", 210 + dx, 690, 660)).join("")}</div>
      ${percha("p0")}
      ${remera("r0", G, GD)}
      ${pill(1, 540, 1500, "Todo de entrada", "rl grande")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="tachar tx" d="M240 1500 L840 1500" style="stroke:#fff"/></svg>
      <div class="tit"><div>Zara no se juega</div><div>toda la</div><div class="v">temporada</div><div>de entrada.</div></div>`,
  js: `
      // cuadro 0: el gancho entero y la remera grande ya colgada
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(qa(".r0, .p0"), { rotation: 7, transformOrigin: "50% 0%" }, { rotation: 0, duration: 1.6, ease: "elastic.out(1, 0.35)" }, 0);
      // "toda la temporada": el perchero se llena de remeras iguales
      qa(".fila .remera").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 1.15 + i * 0.07));
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 1.5);
      // "de entrada": todo de entrada, tachado
      pop(".n1", 1.5, 0.32);
      dibujar(".tx", 2.12, 0.25);
      tl.to(q(".n1"), { opacity: 0.55, duration: 0.15 }, 2.22);
      // se van las copias y el título: queda la remera sola para s02
      tl.to(qa(".fila .remera"), { opacity: 0, y: 30, duration: 0.25, stagger: 0.03, ease: "power2.in" }, 2.6);
      tl.to(qa(".n1, .tx"), { opacity: 0, duration: 0.2 }, 2.62);
      tl.to(q(".tit"), { opacity: 0, y: -50, duration: 0.28, ease: "power2.in" }, 2.66);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 1.15, sfx: "typing", vol: 0.18, max: 0.5 }, { t: 1.5, sfx: "pop", vol: 0.25 }, { t: 2.12, sfx: "click", vol: 0.3 }],
});

// ================= s02 · se vende y repone =================
// "Mira qué se vende y repone eso." (vende 0.40 · repone 1.10 · eso 1.60)
escena("s02-repone", {
  css: `P .ic.vend { left: 470px; top: 930px; } P .ic.vend svg { width: 140px; height: 140px; }`,
  html: `
      ${barra()}
      ${percha("p0")}
      ${remera("r0", G, GD)}
      ${remera("r1", G, GD)}
      ${selbox("sb", 196, 664, 688, 724)}
      <div class="ic vend">${tick(70)}</div>
      ${pill(1, 540, 1500, "Se vendió", "lleno grande")}
      ${pill(2, 540, 1500, "Repone", "g grande")}`,
  js: `
      gsap.set(q(".r1"), { opacity: 0 });
      // mira qué se vende
      marco(".sb", 0.3);
      pop(".vend", 0.42, 0.3, 0.4);
      pop(".n1", 0.5);
      // se la llevan: sale para arriba
      tl.to(qa(".r0, .sb, .vend"), { y: -420, opacity: 0, duration: 0.4, ease: "power3.in" }, 0.78);
      tl.fromTo(q(".p0"), { rotation: 0 }, { rotation: -6, transformOrigin: "50% 0%", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 0.9);
      fuera(".n1", 0.95);
      // y repone eso: cae otra igual en la percha
      tl.fromTo(q(".r1"), { opacity: 0, y: -520 }, { opacity: 1, y: 0, duration: 0.42, ease: "back.out(1.3)" }, 1.08);
      hamaca(".r1", 1.45, 5, 0.9);
      pop(".n2", 1.2);
      fuera(".n2", 1.72);`,
  sfx: [{ t: 0.42, sfx: "ping", vol: 0.3 }, { t: 0.78, sfx: "whoosh-short", vol: 0.22 }, { t: 1.1, sfx: "pop", vol: 0.28 }],
});

// ================= s03 · plata colgada =================
// "¿Por qué? Lo que no se vende es plata colgada." (qué 0.56 · no 1.30 · vende 1.60 · plata 2.00 · colgada 2.30)
escena("s03-colgada", {
  css: ``,
  html: `
      ${barra()}
      ${percha("p0")}
      ${billete("bl", 230, 790, 620)}
      ${remera("r0", G, GD)}
      ${etiqueta("et", 720, 606, "?")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(2, 540, 1420, 540, 1200, "r")}</svg>
      ${pill(1, 540, 1480, "No se vendió", "r grande")}
      ${pill(2, 540, 1480, "Plata colgada", "rl grande")}`,
  js: `
      gsap.set(q(".bl"), { opacity: 0 });
      // ¿por qué?: entra la etiqueta con el signo
      tl.fromTo(q(".et"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.36, ease: "back.out(1.4)" }, 0.0);
      hamaca(".et", 0.32, 16, 1.0);
      tl.fromTo(q(".et"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 20%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, 0.56);
      tl.to(q(".et"), { opacity: 0, y: -80, duration: 0.25, ease: "power2.in" }, 1.08);
      // lo que no se vende: la remera se apaga
      tl.to(qa(".r0 .tela"), { attr: { fill: "#8d939f" }, duration: 0.35 }, 1.25);
      tl.to(qa(".r0 .osc"), { attr: { fill: "#6b7180" }, duration: 0.35 }, 1.25);
      tl.to(q(".r0"), { y: 24, duration: 0.6, ease: "power2.out" }, 1.25);
      pop(".n1", 1.4);
      // es plata colgada: la remera se vuelve un billete colgado de la percha
      fuera(".n1", 1.9);
      tl.to(q(".r0"), { opacity: 0, scale: 0.7, transformOrigin: "50% 30%", duration: 0.3, ease: "power2.in" }, 1.92);
      tl.fromTo(q(".bl"), { opacity: 0, scale: 0.6, transformOrigin: "50% 0%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 2.02);
      hamaca(".bl", 2.3, 9, 1.0);
      nota(2, 2.3);
      // el billete cae (se vuelve la caja de s04)
      sinNota(2, 2.85);
      tl.to(q(".bl"), { y: 300, opacity: 0, duration: 0.3, ease: "power2.in" }, 2.85);
      tl.to(qa(".p0, .barra, .barra-luz"), { opacity: 0, duration: 0.25 }, 2.9);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.56, sfx: "pop", vol: 0.25 }, { t: 1.25, sfx: "glitch-1", vol: 0.14, max: 0.35 }, { t: 2.02, sfx: "pop", vol: 0.28 }, { t: 2.3, sfx: "click", vol: 0.25 }],
});

// ================= s04 · tandas chicas =================
// "Por eso fabrica en tandas chicas." (fabrica 0.43 · tandas 0.90 · chicas 1.13)
const CHICAS = [24, 374, 724];
escena("s04-tandas", {
  css: `P .cruz-g { fill: none; stroke: ${RED}; stroke-width: 22; stroke-linecap: round; }`,
  html: `
      ${sombra("sh", 540, 1350, 860, 70)}
      ${caja("gr", 150, 640, 760, CR3, "#a3a194", "#8f8d80", "#9d9b8d", "TODO")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="cruz-g x1" d="M230 760 L830 1260"/><path class="cruz-g x2" d="M830 760 L230 1260"/></svg>
      ${CHICAS.map((x, i) => sombra("shc c" + i, x + 150, 1206, 320, 44) + caja("ch c" + i, x, 900, 330, CR, CR2, CR3, G, String(i + 1))).join("")}
      ${pill(1, 540, 1440, "Tandas chicas", "lleno grande")}`,
  js: `
      tl.fromTo(qa(".gr, .sh"), { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }, 0.0);
      tl.fromTo(q(".gr"), { scaleY: 1 }, { scaleY: 0.95, transformOrigin: "50% 100%", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, 0.4);
      dibujar(".x1", 0.55, 0.2); dibujar(".x2", 0.68, 0.2);
      // se achica y salen tres cajas chicas
      tl.to(qa(".gr, .sh, .x1, .x2"), { opacity: 0, scale: 0.4, transformOrigin: "540px 1000px", duration: 0.3, ease: "power2.in" }, 0.9);
      qa(".ch").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: -160, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.36, ease: "back.out(1.7)" }, 1.0 + i * 0.12));
      qa(".shc").forEach((el, i) => tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.1 + i * 0.12));
      pop(".n1", 1.3);
      salida(1.86);`,
  sfx: [{ t: 0.4, sfx: "impact-bass-1", vol: 0.25, max: 0.6 }, { t: 0.55, sfx: "click", vol: 0.28 }, { t: 1.0, sfx: "pop", vol: 0.25 }, { t: 1.12, sfx: "pop", vol: 0.25 }, { t: 1.24, sfx: "pop", vol: 0.25 }],
});

// ================= s05 · las tiendas cuentan =================
// "Cada día, las tiendas cuentan qué se vende." (día 0.31 · tiendas 1.01 · cuentan 1.31 · vende 2.01)
const mini = (x, y, s, c, o) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="${CAMISA}" fill="${c}"/><polygon points="452,12 610,84 656,262 542,292 530,226 530,684 452,684" fill="${o}"/></g>`;
const DIAS = ["L", "M", "M", "J", "V", "S", "D"];
const BARS = [[G, 170], [G, 120], [CR3, 46]];
escena("s05-tiendas", {
  css: `
    P .dia { position: absolute; width: 112px; height: 112px; border-radius: 50%; border: 7px solid rgba(239,238,229,0.45); font: 700 46px/98px "Lexend", sans-serif; text-align: center; color: ${CR}; }
    P .dok { position: absolute; width: 112px; height: 112px; opacity: 0; } P .dok svg { width: 112px; height: 112px; }
    P .bub { position: absolute; left: 610px; top: 790px; width: 400px; height: 330px; border-radius: 40px; background: #fff; box-shadow: 0 14px 0 rgba(3,6,12,0.45); opacity: 0; }
    P .bub::after { content: ""; position: absolute; left: 60px; bottom: -40px; border: 22px solid transparent; border-top: 26px solid #fff; border-left-width: 0; }
    P .bub .hd { position: absolute; left: 34px; top: 30px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    P .bub .bar { position: absolute; bottom: 40px; width: 86px; border-radius: 14px 14px 0 0; }
    P .bub .base { position: absolute; left: 30px; right: 30px; bottom: 34px; height: 8px; border-radius: 4px; background: ${NAVY}; }`,
  html: `
      <svg class="full tienda" viewBox="0 0 1080 1920" aria-hidden="true">
        <ellipse cx="540" cy="1262" rx="470" ry="30" fill="rgba(3,6,12,0.55)"/>
        <polygon points="940,740 1000,776 1000,1250 940,1250" fill="#101b2f"/>
        <rect x="140" y="740" width="800" height="510" fill="${NAVY2}"/>
        <rect x="120" y="712" width="840" height="44" rx="10" fill="${NAVY3}"/>
        <rect x="300" y="584" width="480" height="116" rx="16" fill="${CR}"/>
        <rect x="300" y="680" width="480" height="20" rx="8" fill="rgba(11,18,32,0.16)"/>
        <text x="540" y="665" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="66" fill="${NAVY}">TIENDA</text>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${140 + i * 100} 756 h100 v104 q-50 34 -100 0 z" fill="${i % 2 ? CR : G}"/>`).join("")}
        <rect x="190" y="910" width="420" height="300" rx="10" fill="${NAVY3}" stroke="${CR}" stroke-width="12"/>
        ${mini(222, 960, 0.26, G, GD)}${mini(400, 960, 0.26, CR, CR3)}
        <polygon points="230,1200 320,920 390,920 300,1200" fill="rgba(239,238,229,0.10)"/>
        <rect x="660" y="910" width="230" height="340" rx="10" fill="#0d1628" stroke="${CR}" stroke-width="12"/>
        <rect x="846" y="1070" width="16" height="70" rx="8" fill="${G}"/>
      </svg>
      ${DIAS.map((d, i) => `<div class="dia" style="left:${66 + i * 136}px;top:1330px">${d}</div><div class="dok k${i}" style="left:${66 + i * 136}px;top:1330px">${tick(56)}</div>`).join("")}
      <div class="bub"><div class="hd">HOY SE VENDIÓ</div>${BARS.map(([c, h], i) => `<div class="bar b${i}" style="left:${48 + i * 112}px;height:${h}px;background:${c}"></div>`).join("")}<div class="base"></div></div>`,
  js: `
      tl.fromTo(q(".tienda"), { opacity: 0, scale: 0.85, transformOrigin: "540px 1250px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      qa(".dia").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }, 0.1 + i * 0.04));
      // cada día: se tilda la semana
      qa(".dok").forEach((el, i) => pop(el, 0.36 + i * 0.1, 0.24, 0.4));
      // las tiendas cuentan qué se vende
      tl.fromTo(q(".bub"), { opacity: 0, scale: 0.5, transformOrigin: "15% 110%" }, { opacity: 1, scale: 1, duration: 0.38, ease: "back.out(1.6)" }, 1.15);
      qa(".bub .bar").forEach((el, i) => tl.fromTo(el, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.4, ease: "power3.out" }, 1.5 + i * 0.12));
      tl.fromTo(q(".b0"), { scaleX: 1 }, { scaleX: 1.15, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, 2.0);
      salida(2.1);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.36, sfx: "typing", vol: 0.2, max: 0.7 }, { t: 1.15, sfx: "notification", vol: 0.3 }, { t: 1.5, sfx: "click-soft", vol: 0.25 }],
});

// ================= s06 · lo que sale vuelve =================
// "Lo que sale, vuelve. Lo que no, no se repite." (sale 0.50 · vuelve 1.11 · no 1.90 · repite 2.80)
const W2 = 470, XA = 40, XB = 570;
const yR = 600 + Math.round((676 - 600) * W2 / 660);
const hueco = (x) => pz("hueco", x, yR, W2, r2(W2 * 690 / 660), "0 0 660 690", `<path d="${CAMISA}" fill="none" stroke="${RED}" stroke-width="10" stroke-dasharray="26 18"/>`);
escena("s06-sale", {
  css: `
    P .ic.vuel { left: 195px; top: 1110px; } P .ic.vuel svg { width: 150px; height: 150px; }
    P .ic.nox { left: 735px; top: 1110px; } P .ic.nox svg { width: 150px; height: 150px; }
    P .hueco { opacity: 0; }`,
  html: `
      ${barra()}
      ${percha("pa", XA, 600, W2)}${percha("pb", XB, 600, W2)}
      ${hueco(XB)}
      ${remera("a2", G, GD, XA, yR, W2)}${remera("a1", G, GD, XA, yR, W2)}${remera("a0", G, GD, XA, yR, W2)}
      ${remera("b0", CR, CR3, XB, yR, W2)}
      ${selbox("sba", XA - 10, yR - 12, W2 + 20, 516)}
      <div class="ic vuel"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="75" fill="${G}"/><path d="M110 75 A35 35 0 1 1 96 47" fill="none" stroke="${NAVY}" stroke-width="12" stroke-linecap="round"/><path d="M84 30 L104 44 L86 62" fill="none" stroke="${NAVY}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="ic nox">${cruz(75)}</div>
      ${pill(1, 275, 1360, "Sale", "lleno grande")}
      ${pill(2, 805, 1360, "No sale", "rl grande")}`,
  js: `
      gsap.set(qa(".a1, .a2"), { opacity: 0 });
      tl.fromTo(qa(".pa, .a0"), { x: 220, opacity: 0 }, { x: 0, opacity: 1, duration: 0.36, ease: "power3.out" }, 0);
      tl.fromTo(qa(".pb, .b0"), { x: -220, opacity: 0 }, { x: 0, opacity: 1, duration: 0.36, ease: "power3.out" }, 0);
      // lo que sale
      marco(".sba", 0.48);
      pop(".n1", 0.55);
      // vuelve: entran más iguales atrás
      pop(".vuel", 1.1, 0.34, 0.4);
      tl.fromTo(q(".vuel svg"), { rotation: -120 }, { rotation: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(1.4)" }, 1.1);
      tl.fromTo(q(".a1"), { opacity: 0, x: 0, y: 0 }, { opacity: 0.8, x: -22, y: -20, duration: 0.3, ease: "back.out(1.6)" }, 1.2);
      tl.fromTo(q(".a2"), { opacity: 0, x: 0, y: 0 }, { opacity: 0.6, x: -44, y: -40, duration: 0.3, ease: "back.out(1.6)" }, 1.3);
      // lo que no: la otra se apaga
      tl.to(qa(".b0 .tela"), { attr: { fill: "${RED}" }, duration: 0.3 }, 1.85);
      tl.to(qa(".b0 .osc"), { attr: { fill: "${REDD}" }, duration: 0.3 }, 1.85);
      pop(".n2", 1.95);
      tl.to(qa(".sba"), { opacity: 0.35, duration: 0.2 }, 1.9);
      // no se repite: se cae y queda el hueco
      tl.to(q(".b0"), { y: 420, rotation: 14, opacity: 0, duration: 0.5, ease: "power2.in" }, 2.6);
      tl.fromTo(q(".hueco"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.85);
      pop(".nox", 2.85, 0.32, 0.4);
      salida(3.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.5, sfx: "ping", vol: 0.28 }, { t: 1.1, sfx: "pop", vol: 0.26 }, { t: 1.9, sfx: "glitch-1", vol: 0.14, max: 0.35 }, { t: 2.6, sfx: "whoosh-short", vol: 0.2 }, { t: 2.85, sfx: "click", vol: 0.28 }],
});

// ================= s07 · el giro: la fábrica y la caja =================
// "Todos miran la fábrica. Pero la ventaja empieza en la caja." (fábrica 0.57 · Pero 1.34 · ventaja 1.67 · caja 2.87)
const OJO = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-62 0 Q0 -50 62 0 Q0 50 -62 0 Z" fill="${CR}"/><circle cx="0" cy="0" r="22" fill="${NAVY}"/><circle cx="8" cy="-8" r="7" fill="${CR}"/></g>`;
escena("s07-giro", {
  css: `P .ojos g { opacity: 0; }`,
  html: `
      <svg class="full fab" viewBox="0 0 1080 1920" aria-hidden="true">
        <ellipse cx="540" cy="1312" rx="480" ry="32" fill="rgba(3,6,12,0.55)"/>
        <rect x="700" y="560" width="90" height="260" fill="${NAVY3}"/><rect x="700" y="560" width="90" height="34" fill="${CR}"/>
        <rect x="830" y="610" width="80" height="210" fill="${NAVY3}"/><rect x="830" y="610" width="80" height="30" fill="${CR}"/>
        <polygon points="120,820 120,700 300,820 300,700 480,820 480,700 660,820 660,700 840,820 960,820 960,1300 120,1300" fill="${NAVY2}"/>
        <polygon points="120,700 300,820 120,820" fill="${G}"/><polygon points="300,700 480,820 300,820" fill="${CR}"/><polygon points="480,700 660,820 480,820" fill="${G}"/><polygon points="660,700 840,820 660,820" fill="${CR}"/>
        <rect x="120" y="820" width="840" height="24" fill="${NAVY3}"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${170 + i * 190}" y="900" width="130" height="110" rx="10" fill="${CR}"/><rect x="${170 + i * 190}" y="900" width="130" height="30" fill="rgba(11,18,32,0.14)"/>`).join("")}
        <rect x="430" y="1080" width="220" height="220" rx="8" fill="${NAVY3}" stroke="${CR}" stroke-width="10"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="440" y="${1100 + i * 46}" width="200" height="12" fill="rgba(239,238,229,0.35)"/>`).join("")}
        <polygon points="960,820 1010,850 1010,1300 960,1300" fill="#101b2f"/>
      </svg>
      <svg class="full ojos" viewBox="0 0 1080 1920" aria-hidden="true">${OJO(130, 1430)}${OJO(330, 1470)}${OJO(540, 1450)}${OJO(750, 1470)}${OJO(950, 1430)}</svg>
      <svg class="full reg" viewBox="0 0 1080 1920" aria-hidden="true">
        <ellipse cx="540" cy="1330" rx="470" ry="32" fill="rgba(3,6,12,0.55)"/>
        <rect x="290" y="620" width="500" height="190" rx="22" fill="${NAVY3}" stroke="${BORDE}" stroke-width="8"/>
        <rect class="pant" x="320" y="650" width="440" height="130" rx="12" fill="${G}"/>
        <text class="pant-t" x="540" y="740" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="70" fill="${NAVY}">VENDIDO</text>
        <rect x="500" y="810" width="80" height="60" fill="${NAVY3}"/>
        <polygon points="190,870 890,870 960,1160 120,1160" fill="${CR}"/>
        <polygon points="740,870 890,870 960,1160 790,1160" fill="${CR2}"/>
        ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${250 + c * 92 - r * 14}" y="${905 + r * 78}" width="72" height="58" rx="10" fill="${NAVY3}"/>`).join("")).join("")}
        <rect x="640" y="960" width="200" height="110" rx="20" fill="${G}"/><rect x="640" y="1040" width="200" height="30" rx="10" fill="${GD}"/>
        <g class="cajon"><rect x="120" y="1160" width="840" height="150" rx="14" fill="${CR2}"/><rect x="120" y="1160" width="840" height="22" fill="rgba(11,18,32,0.14)"/><rect x="460" y="1220" width="160" height="26" rx="13" fill="${NAVY}"/></g>
      </svg>
      ${selbox("sb", 96, 596, 888, 750)}
      ${pill(1, 540, 1470, "Acá empieza", "lleno grande")}`,
  js: `
      gsap.set(q(".reg"), { y: 1300 });
      tl.fromTo(q(".fab"), { opacity: 0, scale: 0.9, transformOrigin: "540px 1300px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.3)" }, 0);
      // todos miran la fábrica: ojos abajo, mirando para arriba
      qa(".ojos g").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.25, ease: "back.out(2)" }, 0.25 + i * 0.07));
      // pero: paneo hacia abajo, la fábrica sale y entra la caja registradora
      tl.to(q(".fab"), { y: -1300, duration: 0.6, ease: "power3.inOut" }, 1.34);
      tl.to(q(".ojos"), { y: -560, duration: 0.6, ease: "power3.inOut" }, 1.34);
      tl.to(qa(".ojos, .fab"), { opacity: 0, duration: 0.2 }, 1.8);
      tl.to(q(".reg"), { y: 0, duration: 0.6, ease: "power3.inOut" }, 1.34);
      // la ventaja: la pantalla titila
      tl.fromTo(qa(".pant, .pant-t"), { opacity: 1 }, { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, 1.95);
      // en la caja: se abre el cajón
      tl.to(q(".cajon"), { y: 40, duration: 0.25, ease: "back.out(2)" }, 2.82);
      marco(".sb", 2.86);
      pop(".n1", 2.95);`,
  sfx: [{ t: 0.25, sfx: "pop", vol: 0.2 }, { t: 1.34, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.95, sfx: "ping", vol: 0.25 }, { t: 2.82, sfx: "chime", vol: 0.3 }],
});

// ================= s08 · ¿y vos? =================
// "¿Sabés qué vendiste más esta semana?" (vendiste 0.41 · más 0.91 · semana 1.31)
const SX = [130, 340, 550, 760];
const pila = (x, base, cols, n) => Array.from({ length: n }, (_, k) => `<rect x="${x}" y="${base - (k + 1) * 62}" width="190" height="56" rx="12" fill="${cols[0]}"/><rect x="${x + 140}" y="${base - (k + 1) * 62}" width="50" height="56" rx="12" fill="${cols[1]}"/>`).join("");
const COLS = [[G, GD], [CR, CR3], ["#8fa3c8", "#6d82aa"], ["#ffffff", CR2]];
escena("s08-vos", {
  css: `P .pr { position: absolute; width: 130px; height: 130px; border-radius: 50%; background: ${CR}; font: 800 92px/130px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }`,
  html: `
      <svg class="full est" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="90" y="640" width="30" height="760" fill="${NAVY3}"/><rect x="960" y="640" width="30" height="760" fill="${NAVY3}"/>
        ${SX.map((x, i) => pila(x + 15, 1010, COLS[i], [4, 2, 3, 1][i])).join("")}
        ${SX.map((x, i) => pila(x + 15, 1360, COLS[(i + 2) % 4], [2, 4, 1, 3][i])).join("")}
        <rect x="80" y="1010" width="920" height="34" rx="8" fill="${NAVY3}" stroke="${BORDE}" stroke-width="6"/>
        <rect x="80" y="1360" width="920" height="34" rx="8" fill="${NAVY3}" stroke="${BORDE}" stroke-width="6"/>
      </svg>
      ${SX.map((x, i) => `<div class="pr p${i}" style="left:${x + 45}px;top:${[640, 760, 700, 820][i]}px">?</div>`).join("")}
      ${selbox("sb", 130, 600, 230, 430)}`,
  js: `
      tl.fromTo(q(".est"), { opacity: 0, scale: 1.12, transformOrigin: "540px 1000px" }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, 0);
      qa(".pr").forEach((el, i) => pop(el, 0.35 + i * 0.1, 0.3, 0.3));
      // más: la selección salta de una pila a otra sin saber cuál
      marco(".sb", 0.9);
      tl.to(q(".sb"), { x: 420, duration: 0.18, ease: "power2.inOut" }, 1.15);
      tl.to(q(".sb"), { x: 210, duration: 0.18, ease: "power2.inOut" }, 1.4);
      tl.to(q(".sb"), { x: 630, duration: 0.18, ease: "power2.inOut" }, 1.65);
      qa(".pr").forEach((el, i) => tl.to(el, { rotation: i % 2 ? 12 : -12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.2));
      salida(1.92);`,
  sfx: [{ t: 0.35, sfx: "pop", vol: 0.22 }, { t: 0.55, sfx: "pop", vol: 0.22 }, { t: 0.9, sfx: "click-soft", vol: 0.28 }, { t: 1.15, sfx: "click-soft", vol: 0.25 }, { t: 1.4, sfx: "click-soft", vol: 0.25 }, { t: 1.65, sfx: "click-soft", vol: 0.25 }],
});

// ================= s09 · el sistema a medida =================
// "Con un sistema a medida, ves stock y ventas juntos, y sabés qué reponer."
// (sistema 0.36 · medida 0.86 · stock 1.66 · ventas 2.36 · juntos 2.66 · sabés 3.46 · reponer 3.86)
const FILAS = [["Remera", 48, 6], ["Buzo", 31, 22], ["Jean", 12, 40], ["Campera", 5, 38]];
const TCSS = `
    P .tab { position: absolute; left: 90px; top: 560px; width: 900px; height: 940px; border-radius: 64px; background: ${CR}; }
    P .tab-lado { position: absolute; left: 106px; top: 576px; width: 900px; height: 940px; border-radius: 64px; background: #a9a798; }
    P .scr { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; border-radius: 48px; background: ${NAVY2}; overflow: hidden; }
    P .scr .tt { position: absolute; left: 44px; top: 48px; font: 800 56px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.02em; }
    P .scr .bdg { position: absolute; right: 40px; top: 46px; padding: 12px 22px; border-radius: 16px; background: ${G}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${NAVY}; }
    P .scr .ch { position: absolute; top: 150px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(239,238,229,0.62); }
    P .fila { position: absolute; left: 24px; right: 24px; height: 150px; border-radius: 28px; background: ${NAVY3}; border: 6px solid ${NAVY3}; }
    P .fila .nm { position: absolute; left: 22px; top: 52px; font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; }
    P .fila .v, P .fila .s { position: absolute; top: 26px; font: 800 52px/1 "Lexend", sans-serif; }
    P .fila .v { left: 336px; color: ${G}; } P .fila .s { left: 586px; color: ${CR}; }
    P .fila .bv, P .fila .bs, P .fila .bt { position: absolute; top: 96px; height: 24px; border-radius: 12px; }
    P .fila .bt { width: 210px; background: rgba(11,18,32,0.55); }
    P .fila .bv { left: 336px; background: ${G}; } P .fila .bs { left: 586px; background: ${CR}; }`;
const tablet = (fin) => `
      <div class="tab-lado"></div>
      <div class="tab"><div class="scr">
        <div class="tt">Stock y ventas</div><div class="bdg">A MEDIDA</div>
        <div class="ch" style="left:44px">PRODUCTO</div><div class="ch" style="left:358px">VENDIDOS</div><div class="ch" style="left:608px">STOCK</div>
        ${FILAS.map(([n, v, s], i) => `<div class="fila f${i}" style="top:${204 + i * 170}px"><div class="nm">${n}</div>
          <div class="v">${fin ? v : 0}</div><div class="s"${i === 0 && fin ? ` style="color:${RED}"` : ""}>${fin ? s : 0}</div>
          <div class="bt" style="left:336px"></div><div class="bt" style="left:586px"></div>
          <div class="bv" style="width:${Math.round(v / 50 * 210)}px"></div><div class="bs" style="width:${Math.round(s / 40 * 210)}px${i === 0 ? `;background:${RED}` : ""}"></div></div>`).join("")}
      </div></div>`;
escena("s09-sistema", {
  css: TCSS + `
    P .fila.f0.hot { border-color: ${G}; }`,
  html: `
      ${tablet(false)}
      ${selbox("sbs", 680, 740, 270, 720)}
      ${selbox("sbj", 430, 740, 520, 720)}
      ${pill(1, 540, 1590, "Reponer remeras", "lleno grande")}`,
  js: `
      const T = qa(".tab, .tab-lado");
      tl.fromTo(T, { opacity: 0, scale: 0.8, y: 60, transformOrigin: "540px 1030px" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      qa(".fila").forEach((el, i) => tl.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.28, ease: "power3.out" }, 0.3 + i * 0.08));
      gsap.set(qa(".bv, .bs"), { scaleX: 0, transformOrigin: "0% 50%" });
      // a medida
      pop(".bdg", 0.86, 0.34, 0.5);
      // ves stock
      marco(".sbs", 1.6);
      ${FILAS.map(([, , s], i) => `contar(".f${i} .s", 0, ${s}, 1.66, 0.5, (v) => v); tl.to(q(".f${i} .bs"), { scaleX: 1, duration: 0.5, ease: "power3.out" }, ${r2(1.66 + i * 0.05)});`).join("\n      ")}
      // y ventas
      ${FILAS.map(([, v], i) => `contar(".f${i} .v", 0, ${v}, 2.36, 0.5, (x) => x); tl.to(q(".f${i} .bv"), { scaleX: 1, duration: 0.5, ease: "power3.out" }, ${r2(2.36 + i * 0.05)});`).join("\n      ")}
      // juntos
      tl.to(q(".sbs"), { opacity: 0, duration: 0.15 }, 2.62);
      marco(".sbj", 2.66);
      // y sabés qué reponer: la remera verde vende mucho y queda poco
      tl.to(q(".sbj"), { opacity: 0, duration: 0.2 }, 3.3);
      tl.to(q(".f0"), { borderColor: "${G}", duration: 0.2 }, 3.4);
      tl.to(q(".f0 .s"), { color: "${RED}", duration: 0.2 }, 3.4);
      tl.to(q(".f0 .bs"), { backgroundColor: "${RED}", duration: 0.2 }, 3.4);
      tl.fromTo(q(".f0"), { scale: 1 }, { scale: 1.04, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 3.5);
      nota(1, 3.8);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.86, sfx: "pop", vol: 0.25 }, { t: 1.6, sfx: "click-soft", vol: 0.28 }, { t: 1.66, sfx: "typing", vol: 0.18, max: 0.5 }, { t: 2.36, sfx: "typing", vol: 0.18, max: 0.5 }, { t: 2.66, sfx: "click-soft", vol: 0.28 }, { t: 3.5, sfx: "ping", vol: 0.28 }, { t: 3.8, sfx: "pop", vol: 0.28 }],
});

// ================= s10 · CTA =================
// "¿Querés ver cómo quedaría en tu negocio? Agendá una videollamada gratis en scalerics.com."
// (negocio 1.70 · Agendá 2.68 · videollamada 3.20 · gratis 3.50 · scalerics.com 4.40)
const avatar = (s = 140) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg>`;
escena("s10-cta", {
  css: TCSS + `
    P .fila.f0 { border-color: ${G}; }
    P .vc { position: absolute; left: 79px; top: 570px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 586px; width: 922px; height: 460px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1110px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1252px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1440px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="capa tg">${tablet(true)}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(160)}<div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const TG = q(".tg");
      tl.to(TG, { scale: 1.03, transformOrigin: "540px 1030px", duration: 0.65, ease: "sine.inOut" }, 0);
      // el panel gira a horizontal y se vuelve la videollamada
      tl.to(TG, { rotation: -90, scale: 0.8, y: -230, duration: 0.6, ease: "power3.inOut" }, 0.7);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.24);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.2);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.32);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.95);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 3.3);
      marco(".sb", 3.5);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 4.3);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 4.8);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 4.8);`,
  sfx: [{ t: 0.7, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.32, sfx: "pop", vol: 0.22 }, { t: 2.95, sfx: "whoosh-short", vol: 0.2 }, { t: 3.5, sfx: "click-soft", vol: 0.28 }, { t: 4.3, sfx: "chime", vol: 0.3 }],
});

console.log("escenas escritas:", Object.keys(ESC).filter((id) => fs.existsSync(`compositions/${id}.html`)).join(", "));
