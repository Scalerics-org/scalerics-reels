// Arma compositions/<id>.html y <id>.sfx.json desde escenas/<id>.mjs (correr desde reels/como-se-hace).
//   node escenas/hacer.mjs s02-recepcion [s03-...]   ·   sin argumentos: todas las que tengan .mjs
// Cada escenas/<id>.mjs exporta { css, html, svg, js, sfx }: css con "P" como prefijo de la escena
// ([data-composition-id="<id>"]), html = divs sobre el svg, svg = función (F) -> string, js = cuerpo del
// timeline (tiene F, I, tl, K, q, qa, DUR a mano). DUR sale de reel.json + palabras.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DURT = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const dur = {};
reel.escenas.forEach(([id, i], k) => { dur[id] = r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DURT) - ini(i)); });
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync("escenas").filter((f) => /^s\d\d.*\.mjs$/.test(f)).map((f) => f.replace(".mjs", ""));
for (const id of ids) {
  const m = await import(`./${id}.mjs?${Date.now()}`);
  const D = dur[id], P = `[data-composition-id="${id}"]`, pre = id.slice(0, 3);
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/fabrica.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Black Ops One"; font-weight: 400; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .${pre}-capa, ${P} .${pre}-escenario { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
${(m.css || "").replaceAll("P ", P + " ").split("\n").map((l) => "    " + l.trim()).join("\n")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${D}">
    <div id="${pre}-escena" class="${pre}-capa clip" data-start="0" data-duration="${D}" data-track-index="0">
      <div class="${pre}-escenario">
        <svg class="${pre}-svg" viewBox="0 0 1080 1920" aria-hidden="true"></svg>
${(m.html || "").trim().split("\n").map((l) => "        " + l.trim()).join("\n")}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${D};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const F = FAB, I = F.INK;
      root.querySelector(".${pre}-svg").innerHTML = (${m.svg.toString()})(F);
      const tl = gsap.timeline({ paused: true });
      const K = F.kit(tl, root);
      const { q, qa } = K;
${m.js.trim().split("\n").map((l) => "      " + l.replace(/^\s{0,6}/, "")).join("\n")}

      K.salida(q("#${pre}-escena"), DUR);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(m.sfx || []));
  console.log(id, D);
}
