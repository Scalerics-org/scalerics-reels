// Arma una escena con el lenguaje de la hoja de manual (el mismo de compositions/s01-felicitaciones.html,
// que es la escena modelo hecha a mano). Correr desde reels/modo-de-armado: node escenas/hacer.mjs
import fs from "node:fs";

const dur = (id) => {
  const m = fs.readFileSync("tiempos.md", "utf8").match(new RegExp(`### ${id} — dura ([\\d.]+) s`));
  if (!m) throw new Error("sin tiempos: " + id);
  return Number(m[1]);
};

export function escena({ id, css = "", html = "", svg = "", js, sfx, etiqueta = 1268 }) {
  const D = dur(id);
  const p = id.slice(0, 3);
  const C = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${C} .${p}-capa { position: absolute; inset: 0; }
    ${C} .${p}-escenario { position: absolute; inset: 0; }
    ${C} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${C} .tinta { fill: #fffdf6; stroke: #1a1a1a; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .linea { fill: none; stroke: #1a1a1a; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .fina { fill: none; stroke: #1a1a1a; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .guia { fill: none; stroke: #b9b3a3; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 2 12; }
    ${C} .sombra { fill: #b9b3a3; opacity: 0.55; }
    ${C} .relleno-n { fill: #1a1a1a; }
    ${C} .amarillo { fill: #ffcf1f; stroke: #1a1a1a; stroke-width: 6; stroke-linejoin: round; }
    ${C} .azul { fill: none; stroke: #2b50d6; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .azul-r { fill: #2b50d6; stroke: #1a1a1a; stroke-width: 6; stroke-linejoin: round; }
    ${C} .rojo { fill: none; stroke: #e0362c; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .mb-n { fill: none; stroke: #1a1a1a; stroke-width: 28; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .mb-p { fill: none; stroke: #fffdf6; stroke-width: 15; stroke-linecap: round; stroke-linejoin: round; }
    ${C} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; fill: #1a1a1a; }
    ${C} .lex { font-family: "Lexend", sans-serif; font-weight: 600; fill: #1a1a1a; }
    ${C} .num { font-family: "Lexend", sans-serif; font-weight: 800; fill: #1a1a1a; }
    ${C} .${p}-etiqueta { position: absolute; left: 0; right: 0; top: ${etiqueta}px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.34em; color: #2b50d6; text-transform: uppercase; white-space: nowrap; }
    ${css.replaceAll("$C", C)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${D}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${D}" data-track-index="0">
      <div class="${p}-escenario">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
        </svg>
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${D};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      // el hombrecito del pictograma (igual que en s01): pies en (0,0), ~300 px, sin cara
      const miembro = (d) => '<path class="mb-n" d="' + d + '"/><path class="mb-p" d="' + d + '"/>';
      const hombre = (o) => { o = o || {}; return '<g class="hb">' +
        '<g class="hb-piernas">' + miembro(o.piernaI || "M-22 -104 L-27 -10 L-46 -10") + miembro(o.piernaD || "M22 -104 L27 -10 L46 -10") + '</g>' +
        '<g class="hb-bi">' + miembro(o.brazoI || "M-40 -196 L-58 -142 L-62 -100") + '</g>' +
        '<g class="hb-bd">' + miembro(o.brazoD || "M40 -196 L58 -142 L62 -100") + '</g>' +
        '<path class="tinta hb-cuerpo" d="M-50 -208 Q0 -224 50 -208 L46 -98 Q0 -88 -46 -98 Z" />' +
        '<circle class="tinta hb-cabeza" cx="0" cy="-258" r="36" />' + (o.extra || "") + '</g>'; };
      qa("[data-hombre]").forEach((g) => { g.innerHTML = hombre(JSON.parse(g.dataset.hombre || "{}")); });
      const tl = gsap.timeline({ paused: true });
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L * (desde ?? 1) });
          if ((desde ?? 1) >= 1) { gsap.set(el, { opacity: 0 }); tl.to(el, { opacity: 1, duration: 0.04 }, t + i * 0.04); }
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t + i * 0.04);
        });
      };
      const pop = (el, t, desde) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: desde ?? 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
      };
      const golpe = (el, t, escala) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: escala ?? 2.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.1);
      };
      const fuera = (el, t, d) => tl.to(el, { opacity: 0, duration: d ?? 0.2 }, t);
      const temblor = (t, f) => [[-12, 7], [9, -5], [-4, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(".${p}-escenario"), { x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045));
      const etiquetas = (lista) => lista.forEach(([sel, a, b]) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, a);
        if (b != null) tl.to(q(sel), { opacity: 0, y: -14, duration: 0.2 }, b);
      });
${js}
      tl.fromTo(q(".${p}-escenario"), { scale: 1.035 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.to(q("#${p}-escena"), { y: -260, opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power3.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx, null, 0).replace(/\},\{/g, "},\n {") + "\n");
}
