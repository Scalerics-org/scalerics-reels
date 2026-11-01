// Genera compositions/<id>.html y .sfx.json desde partes/escenas/<id>.mjs
// (uso, desde reels/la-orquesta: node partes/gen-escenas.mjs . s02-batuta s03-ravel ...). s01 está escrita a mano.
import fs from "node:fs";
const [dir, ...ids] = process.argv.slice(2);
const tiempos = fs.readFileSync(dir + "/tiempos.md", "utf8");
for (const id of ids) {
  const E = (await import(`./escenas/${id}.mjs?${Date.now()}`)).default;
  const m = tiempos.match(new RegExp(`### ${id} — dura ([0-9.]+) s`));
  const DUR = Number(m[1]);
  const P = id.split("-")[0];
  const css = (E.css || "").trim().split("\n").filter(Boolean).map((l) => `    [data-composition-id="${id}"] ${l.trim()}`).join("\n");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/orquesta.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="${id}"] .${P}-capa, [data-composition-id="${id}"] .${P}-escenario { position: absolute; inset: 0; }
    [data-composition-id="${id}"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${P}-escena" class="${P}-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="${P}-escenario">
        <svg class="${P}-svg" viewBox="0 0 1080 1920" aria-hidden="true"></svg>
${(E.html || "").trim().split("\n").map((l) => "        " + l.trim()).join("\n")}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${E.pre ? E.pre.trim().split("\n").map((l) => "      " + l.trim()).join("\n") + "\n" : ""}      root.querySelector(".${P}-svg").innerHTML =
        ${E.svg.trim()};
      const tl = gsap.timeline({ paused: true });
      const K = OR.kit(tl, root);
      const { q, qa } = K;

${E.anim.trim().split("\n").map((l) => "      " + l.trim()).join("\n")}

      K.salida(q("#${P}-escena"), DUR);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`${dir}/compositions/${id}.html`, html);
  fs.writeFileSync(`${dir}/compositions/${id}.sfx.json`, JSON.stringify(E.sfx));
  console.log(id, DUR);
}
