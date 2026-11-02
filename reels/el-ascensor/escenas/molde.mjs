// Molde común de las escenas de "El ascensor": escenas/hacer.mjs lo usa para escribir compositions/<id>.html
// con la duración que sale de reel.json + assets/voice/palabras.json (así no se desfasa si cambia la voz).
import fs from "node:fs";
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = pal.at(-1).end;
export function duracion(id) {
  const k = reel.escenas.findIndex(([e]) => e === id);
  const ini = k === 0 ? 0 : r2(pal[reel.escenas[k][1]].start);
  const fin = k + 1 < reel.escenas.length ? r2(pal[reel.escenas[k + 1][1]].start) : null;
  if (fin !== null) return r2(fin - ini);
  // la última: igual que armar.mjs
  return null;
}
// e = { id, css, html, svg (expresión JS que arma el SVG), js (cuerpo; tiene tl, K, q, qa, DUR, root, svg), sfx, dur? }
export function escribir(e, durFin) {
  const DUR = e.dur ?? duracion(e.id) ?? durFin;
  const p = e.id.split("-")[0];
  const sel = `[data-composition-id="${e.id}"]`;
  const css = (e.css || "").replace(/&/g, sel);
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/ascensor.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${sel} .${p}-capa, ${sel} .${p}-escenario { position: absolute; inset: 0; }
    ${sel} svg.${p}-svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
${css.split("\n").map((l) => "    " + l.trim()).filter((l) => l.trim()).join("\n")}
  </style>
  <div id="root" data-composition-id="${e.id}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="${p}-escenario">
        <svg class="${p}-svg" viewBox="0 0 1080 1920" aria-hidden="true"></svg>
${(e.html || "").split("\n").map((l) => "        " + l.trim()).filter((l) => l.trim()).join("\n")}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${e.id}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const svg = root.querySelector(".${p}-svg");
      svg.innerHTML = ${e.svg || '""'};
      const tl = gsap.timeline({ paused: true });
      const K = AS.kit(tl, root);
      const { q, qa } = K;
${e.js.split("\n").map((l) => "      " + l.replace(/^\s{0,6}/, "")).join("\n")}
      K.salida(q("#${p}-escena"), DUR);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${e.id}.html`, out);
  fs.writeFileSync(`compositions/${e.id}.sfx.json`, JSON.stringify(e.sfx || []));
  console.log(e.id, DUR);
}
