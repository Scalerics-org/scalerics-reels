// Escribe compositions/<id>.html y <id>.sfx.json con el esqueleto común de "nominado".
// Uso desde partes/sNN.mjs: escena({ id, svg, html, css, js, sfx, e: ["ETIQUETA 1", "ETIQUETA 2"] }).
// La duración sale de tiempos.md (correr node armar.mjs antes). En `js` hay: root, q, qa, tl, DUR,
// pop(el, t, s), entra(el, t, desde), temblor(el, t, f), dibujar(el, t, d), etiqueta(k, t), flash(t, color).
import fs from "node:fs";
export { C } from "./personajes.mjs";

export function durDe(id) {
  const m = fs.readFileSync("tiempos.md", "utf8").match(new RegExp("### " + id + " — dura ([0-9.]+) s"));
  if (!m) throw new Error("sin duración para " + id);
  return Number(m[1]);
}

export function escena({ id, svg, html = "", css = "", js, sfx, e = [] }) {
  const DUR = durDe(id);
  const P = `[data-composition-id="${id}"]`;
  const p = id.slice(0, 3);
  const etiquetas = e.map((t, i) => `<span class="${p}-e${i + 1}">${t}</span>`).join("");
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .${p}-capa { position: absolute; inset: 0; }
    ${P} .${p}-escenario { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .tinta { stroke: #12051f; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .lex { font-family: "Lexend", sans-serif; font-weight: 600; }
    ${P} .tv { font-family: "Lexend", sans-serif; font-weight: 800; }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
    ${P} .${p}-flash { position: absolute; inset: 0; opacity: 0; }
    ${P} .${p}-etiqueta { position: absolute; left: 0; right: 0; top: 1372px; height: 44px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.26em; color: #ffd23f; text-transform: uppercase; white-space: nowrap; }
    ${P} .${p}-etiqueta span { position: absolute; left: 0; right: 0; opacity: 0; }
    ${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="${p}-escenario">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">${svg}
        </svg>
      </div>
      ${html}
      <div class="${p}-flash"></div>
      <div class="${p}-etiqueta">${etiquetas}</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => root.querySelectorAll(s);
      const tl = gsap.timeline({ paused: true });
      const pop = (el, t, s) => tl.fromTo(el, { opacity: 0, scale: s ?? 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, t);
      const entra = (el, t, desde) => tl.fromTo(el, { opacity: 0, x: (desde && desde[0]) || 0, y: (desde && desde[1]) ?? 160 }, { opacity: 1, x: 0, y: 0, duration: 0.42, ease: "back.out(1.3)" }, t);
      const temblor = (el, t, f) => [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045));
      const dibujar = (el, t, d) => { const L = el.getTotalLength ? el.getTotalLength() : 1000; gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t); tl.to(el, { strokeDashoffset: 0, duration: d ?? 0.6, ease: "power2.inOut" }, t); };
      const ET = [...qa(".${p}-etiqueta span")];
      const etiqueta = (k, t) => { ET.forEach((s, i) => { if (i !== k) tl.to(s, { opacity: 0, y: -12, duration: 0.2 }, t - 0.1); }); tl.fromTo(ET[k], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, t); };
      const flash = (t, color) => { tl.set(q(".${p}-flash"), { background: color || "#ff3d9a" }, t); tl.fromTo(q(".${p}-flash"), { opacity: 0.45 }, { opacity: 0, duration: 0.5, ease: "power2.out" }, t); };
${js}
      // salida
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx));
  console.log("escena", id, DUR);
}
