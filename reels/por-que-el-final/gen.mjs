// Generador de las escenas HTML de reels/por-que-el-final (correr desde la carpeta del reel, después de
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
const TIT = `font: 900 108px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; text-shadow: 0 6px 0 rgba(3,6,12,0.55);`;
const SEL = `
    P .kw { position: relative; display: inline-block; padding: 0 18px 8px; color: #fff; }
    P .kw .selbox { left: 0; top: 6px; right: 0; bottom: -2px; opacity: 1; }
    P .kw em { position: relative; font-style: normal; }`;

// ================= s01 · gancho (cuadro 0 = portada): la mano en el agua fría =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `
    P .a { position: absolute; left: 0; right: 0; top: 110px; text-align: center; ${TIT} font-size: 118px; }
    P .a .l { display: block; }
    P .a .chica { font-size: 80px; font-weight: 800; color: #efeee5; margin-bottom: 18px; }
    P .exp { left: 540px; top: 790px; font-size: 44px; color: ${CR}; opacity: 1; padding: 10px 20px 12px; border-radius: 14px; background: rgba(11,18,32,0.82); }${SEL}`,
    html: `
      <div class="a"><span class="l chica">Agua fría, dos veces.</span><span class="l">La mayoría</span><span class="l">eligió <span class="kw"><div class="selbox sb">${esquinas}</div><em>la más larga</em></span>.</span><span class="l">¿Por qué?</span></div>${mono(1, 540, 790, "Experimento de psicología · 1993", "exp")}`,
    js: `
      tl.fromTo(q(".a"), { scale: 1.03, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      late(".kw", ${r2(w(id, 6))}, 1.08);
      // cambio seco al subtítulo (sin fundido ni hueco)
      tl.set([q(".a"), q(".n1")], { opacity: 0 }, ${r2(ESC[id] - 0.09)});`,
    sfx: [
      { t: 0, sfx: "impact-bass-2", vol: 0.22, max: 1.2 }, { t: 0.15, sfx: "burbuja", vol: 0.3 },
      { t: w(id, 6), sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 7) + 0.3, sfx: "burbuja", vol: 0.32 }, { t: w(id, 7) + 0.36, sfx: "burbuja", vol: 0.22 },
      { t: ESC[id] - 0.4, sfx: "whoosh-cine-corto", vol: 0.22, max: 1.0 },
    ],
  });
}

// ================= s02 · para repetir, la mayoría eligió la larga =================
{
  const id = "s02-mayoria";
  escena(id, {
    css: `P .exp { left: 540px; top: 500px; font-size: 44px; color: ${CR}; padding: 10px 20px 12px; border-radius: 14px; background: rgba(11,18,32,0.82); }`,
    html: `${leads(lead(1, 780, 1570, 950, 1200, "g"))}${pill(1, 780, 1610, "La mayoría", "g grande")}${mono(2, 540, 500, "Experimento de psicología · 1993", "exp")}`,
    js: `nota(1, ${r2(w(id, 11) + 0.25)}); tl.fromTo(q(".n2"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.05); fuera(".n2", ${r2(ESC[id] - 0.25)}, 0.2);`,
    sfx: [
      { t: 0.1, sfx: "pop", vol: 0.16 }, { t: 0.3, sfx: "pop", vol: 0.14 },
      ...Array.from({ length: 11 }, (_, k) => ({ t: r2(w(id, 11) - 0.25 + k * 0.075 + 0.28), sfx: "click-soft", vol: 0.16 })),
      { t: w(id, 14), sfx: "pop", vol: 0.2 }, { t: w(id, 14) + 0.08, sfx: "ding", vol: 0.1, max: 0.8 },
      { t: w(id, 14) + 0.33, sfx: "whoosh-short", vol: 0.13 }, // chapas a los costados y manos arriba
    ],
  });
}

// ================= s03 · ¿Por qué? (bisagra: el "?" se vuelve el termómetro, 14°) =================
{
  const id = "s03-por-que";
  escena(id, {
    html: `${leads(lead(1, 640, 1690, 470, 1620, "r"))}${pill(1, 760, 1690, "60 s", "r grande")}`,
    js: `nota(1, ${r2(w(id, 18))}); sinNota(1, ${r2(ESC[id] - 0.5)});`,
    sfx: [
      { t: 0.02, sfx: "impact-bass-1", vol: 0.24, max: 1.2 }, { t: 0.1, sfx: "pop", vol: 0.18 },
      { t: w(id, 17) - 0.15, sfx: "riser-corto", vol: 0.14, max: 0.9 },
      { t: w(id, 20) - 0.05, sfx: "tic", vol: 0.3 }, { t: w(id, 20) + 0.12, sfx: "tic", vol: 0.3 },
    ],
  });
}

// ================= s04 · o un minuto y medio (el cronómetro) =================
{
  const id = "s04-minuto-y-medio";
  escena(id, {
    html: `${leads(lead(1, 800, 1560, 700, 1120, "g"))}${pill(1, 800, 1600, "+30 s", "g grande")}${pill(2, 290, 1600, "60 s", "grande")}`,
    js: `nota(2, 0.2); nota(1, ${r2(w(id, 26) - 0.05)}); sinNota(1, ${r2(ESC[id] - 0.45)}); sinNota(2, ${r2(ESC[id] - 0.45)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.16 }, { t: 0.0, sfx: "pop", vol: 0.18 },
      ...Array.from({ length: 9 }, (_, k) => ({ t: r2(0.15 + k * 0.13), sfx: "tic", vol: 0.24 })),
      { t: w(id, 26) + 0.35, sfx: "click", vol: 0.26 },
    ],
  });
}

// ================= s05 · y al final el agua subía a quince =================
{
  const id = "s05-quince";
  escena(id, {
    html: `${leads(lead(1, 820, 1560, 640, 1000, "g"))}${pill(1, 820, 1600, "+1 °C", "g grande")}`,
    js: `nota(1, ${r2(w(id, 34) + 0.05)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-cine-corto", vol: 0.2, max: 1.0 }, { t: 0.2, sfx: "pop", vol: 0.14 },
      { t: w(id, 32) - 0.05, sfx: "riser-corto", vol: 0.12, max: 0.9 }, { t: w(id, 34), sfx: "ding", vol: 0.16, max: 1.0 },
    ],
  });
}

// ================= s06 · más rato, pero terminaba un grado mejor (la mano sale del agua) =================
{
  const id = "s06-un-grado";
  escena(id, {
    html: `${pill(1, 290, 1600, "+30 s")}
      ${pill(2, 300, 1690, `${tick(26)}Mejor final`, "lleno")}`,
    js: `nota(1, ${r2(w(id, 36) - 0.05)}); tl.to(q(".n1"), { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, ${r2(w(id, 39) - 0.2)}); nota(2, ${r2(w(id, 41))}); tl.to(q(".n2"), { opacity: 0, duration: 0.2 }, ${r2(ESC[id] - 0.22)});`,
    sfx: [
      { t: 0.25, sfx: "burbuja", vol: 0.3 }, { t: 0.65, sfx: "burbuja", vol: 0.2 }, { t: 1.07, sfx: "burbuja", vol: 0.18 }, { t: 1.49, sfx: "burbuja", vol: 0.16 }, { t: 1.91, sfx: "burbuja", vol: 0.14 },
      { t: w(id, 36) - 0.05, sfx: "pop", vol: 0.12 }, { t: w(id, 41), sfx: "pop", vol: 0.18 }, { t: w(id, 41) + 0.1, sfx: "sparkle", vol: 0.1, max: 1.0 },
      { t: ESC[id] - 0.45, sfx: "whoosh-short", vol: 0.13 }, // la mano sale por arriba
    ],
  });
}

// ================= s07 · recordamos más lo peor y el final (la curva) =================
{
  const id = "s07-pico-final";
  escena(id, {
    html: `${leads(lead(1, 300, 1560, 450, 760, "r"), lead(2, 790, 1560, 975, 1020, "g"))}${pill(1, 290, 1600, "Lo peor", "r grande")}${pill(2, 800, 1600, "El final", "g grande")}`,
    js: `nota(1, ${r2(w(id, 45) + 0.1)}); nota(2, ${r2(w(id, 48) + 0.1)}); sinNota(1, ${r2(ESC[id] - 0.48)}); sinNota(2, ${r2(ESC[id] - 0.48)});`,
    sfx: [
      { t: 0.05, sfx: "whoosh-cine-corto", vol: 0.2, max: 0.9 }, { t: 0.2, sfx: "burbuja", vol: 0.2 },
      { t: w(id, 45) + 0.2, sfx: "golpe", vol: 0.16, max: 0.42 }, { t: w(id, 48) + 0.2, sfx: "ding", vol: 0.14, max: 1.0 },
    ],
  });
}

// ================= s08 · al vender, el final es después de cobrar (el paquete) =================
{
  const id = "s08-cobrar";
  escena(id, {
    html: `${leads(lead(1, 540, 1580, 540, 1350, "g"))}${pill(1, 540, 1620, "Después de cobrar", "g grande")}`,
    js: `nota(1, ${r2(w(id, 54) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.22, sfx: "pop", vol: 0.2 }, { t: w(id, 50), sfx: "whoosh-short", vol: 0.14 },
      { t: w(id, 54) - 0.12, sfx: "whoosh-short", vol: 0.12 }, { t: w(id, 54) + 0.04, sfx: "pop", vol: 0.18 }, { t: w(id, 54) + 0.21, sfx: "click", vol: 0.24 }, { t: w(id, 56) + 0.15, sfx: "pop", vol: 0.2 },
    ],
  });
}

// ================= s09 · y ahí, muchos se callan (el chat callado) =================
{
  const id = "s09-callan";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: -0.05, sfx: "whoosh-short", vol: 0.16 }, { t: 0.1, sfx: "pop", vol: 0.14 }, { t: w(id, 61) + 0.1, sfx: "tic", vol: 0.32 }],
  });
}

// ================= s10 · sale solo: Ana, tu pedido va en camino =================
{
  const id = "s10-sale-solo";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: -0.1, sfx: "whoosh-cine-corto", vol: 0.2, max: 1.0 }, { t: 0.25, sfx: "vibra", vol: 1.0, max: 0.6 }, { t: 0.3, sfx: "notification", vol: 0.22 },
      { t: w(id, 64) - 0.05, sfx: "pop", vol: 0.12 },
    ],
  });
}

// ================= s11 · al otro día: ¿llegó bien? =================
{
  const id = "s11-llego-bien";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.16 }, { t: w(id, 72) - 0.1, sfx: "whoosh-short", vol: 0.14 }, { t: w(id, 72) + 0.2, sfx: "click-soft", vol: 0.2 },
      { t: w(id, 73) - 0.1, sfx: "vibra", vol: 1.0, max: 0.5 }, { t: w(id, 73) - 0.05, sfx: "notification", vol: 0.22 },
      { t: w(id, 72) + 0.36, sfx: "whoosh-short", vol: 0.13 }, // el calendario sale volando
      { t: w(id, 74) + 0.45, sfx: "ping", vol: 0.14 },
    ],
  });
}

// ================= s11b · ese grado de más lo automatizamos (el termómetro sube un grado) =================
{
  const id = "s11b-grado-mejor";
  escena(id, {
    css: `P .sello { left: 400px; top: 1745px; border-color: ${G}; color: ${NAVY}; background: ${G}; font-size: 72px; }`,
    html: `${pill(1, 640, 1830, "+1 °C", "g grande")}<div class="sello sx">AUTOMÁTICO</div>`,
    js: `tl.set(q(".sx"), { xPercent: -50, yPercent: -50 }, 0); nota(1, ${r2(w(id, 77))}); sinNota(1, ${r2(w(id, 79) - 0.05)}); sello(".sx", ${r2(w(id, 79) + 0.1)}, -4); fuera(".sx", ${r2(ESC[id] - 0.5)}, 0.2);`,
    sfx: [
      { t: -0.05, sfx: "pop", vol: 0.16 }, { t: w(id, 76), sfx: "riser-corto", vol: 0.12, max: 0.8 }, { t: w(id, 77) + 0.05, sfx: "ding", vol: 0.1, max: 0.6 },
      { t: w(id, 79) + 0.1, sfx: "impact-bass-1", vol: 0.06, max: 0.6 }, { t: w(id, 79) + 0.15, sfx: "click", vol: 0.12 },
    ],
  });
}

// ================= s12 · ¿lo vemos en tu local? (vuelve la cubeta, ahora a 15°, y el local) =================
{
  const id = "s12-tu-local";
  escena(id, {
    html: `<i></i>`,
    js: ``,
    sfx: [{ t: -0.1, sfx: "whoosh-cine-corto", vol: 0.22, max: 1.0 }, { t: 0.3, sfx: "pop", vol: 0.16 }, { t: 0.05, sfx: "pop", vol: 0.2 }, { t: w(id, 84) + 0.05, sfx: "sparkle", vol: 0.1, max: 1.0 }],
  });
}

// ================= s13 · cierre: videollamada gratis en scalerics.com =================
{
  const id = "s13-llamada";
  escena(id, {
    css: `
    P .fondo { position: absolute; inset: 0; background: ${NAVY}; opacity: 0; }
    P .t1 { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 786px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 4px 32px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 1010px; text-align: center; font: 800 128px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; }`,
    html: `
      <div class="fondo"></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
    js: `
      tl.set(q(".fondo"), { opacity: 1 }, 0);
      tl.set(q(".t1"), { opacity: 1 }, 0); tl.fromTo(q(".t1"), { y: 40 }, { y: 0, duration: 0.18, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, ${r2(w(id, 88) - 0.15)});
      caja(".sb", ${r2(w(id, 88))});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: true }, ${r2(w(id, 90) - 0.08)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.05, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 90) + 0.4)});`,
    sfx: [{ t: -0.1, sfx: "whoosh-short", vol: 0.18 }, { t: w(id, 88), sfx: "click-soft", vol: 0.26 }, { t: w(id, 90) - 0.06, sfx: "chime", vol: 0.3, max: 1.3 }],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
