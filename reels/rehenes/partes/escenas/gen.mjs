// Arma compositions/<id>.html y <id>.sfx.json desde partes/escenas/sNN.mjs (correr desde reels/rehenes).
// Uso: node partes/escenas/gen.mjs s01 s02 ...   (sin argumentos: todas)
// Cada sNN.mjs exporta { ID, CSS, HTML, JS, SFX }. En CSS, "$" es el selector de la escena.
// La duración sale de tiempos.md (correr antes node armar.mjs).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIR = "partes/escenas";
const tiempos = fs.readFileSync("tiempos.md", "utf8");
const dura = (id) => Number(tiempos.match(new RegExp(`### ${id} . dura ([0-9.]+) s`))[1]);
const pedidas = process.argv.slice(2);
const archivos = fs.readdirSync(DIR).filter((f) => /^s\d\d\.mjs$/.test(f) && (!pedidas.length || pedidas.includes(f.slice(0, 3))));

for (const f of archivos) {
  const m = await import(pathToFileURL(path.resolve(DIR, f)).href + "?v=" + Date.now());
  const { ID, CSS = "", HTML, JS, SFX } = m;
  const DUR = dura(ID);
  const P = ID.split("-")[0];
  const SEL = `[data-composition-id="${ID}"]`;
  const base = `    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${SEL} .${P}-capa, ${SEL} .${P}-escenario { position: absolute; inset: 0; }
    ${SEL} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${SEL} .b { fill: #141a28; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .k { fill: #0a0d14; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .l { fill: none; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .w { fill: #f2f2f2; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .v { fill: #21a366; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .vl { fill: none; stroke: #21a366; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .vd { fill: #0e2a1e; stroke: #21a366; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .r { fill: #ff3b3b; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .rl { fill: none; stroke: #ff3b3b; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .a { fill: #2f6bff; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .al { fill: none; stroke: #2f6bff; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .y { fill: #ffd60a; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .yl { fill: none; stroke: #ffd60a; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .s { fill: #5ce611; stroke: #f2f2f2; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .sl { fill: none; stroke: #5ce611; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .cara { fill: #f2f2f2; stroke: #f2f2f2; stroke-width: 7; }
    ${SEL} .d { fill: none; stroke: #0a0d14; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    ${SEL} .fino { stroke-width: 3; }
    ${SEL} .txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; color: #f2f2f2; }
    ${SEL} .sello { position: absolute; padding: 12px 26px 10px; border: 6px solid #ff3b3b; border-radius: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; letter-spacing: 0.1em; line-height: 1; color: #ff3b3b; text-transform: uppercase; white-space: nowrap; }
    ${SEL} .cartel { position: absolute; padding: 14px 28px 12px; background: #ffd60a; color: #0a0d14; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 48px; line-height: 1; text-transform: uppercase; white-space: nowrap; letter-spacing: -0.01em; }
    ${SEL} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
    ${SEL} .smono { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.12em; }
    ${SEL} .slex { font-family: "Lexend", sans-serif; font-weight: 800; }
`;
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
${base}${CSS.replaceAll("$", SEL)}
  </style>
  <div id="root" data-composition-id="${ID}" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="${P}-escena" class="${P}-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="${P}-escenario">
${HTML.trim()}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${ID}";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const ESC = q(".${P}-escenario");
      // golpe: la palabra cae de grande a su lugar, EN la palabra
      const golpe = (el, t, s = 2.6) => {
        el = typeof el === "string" ? q(el) : el;
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: s }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
      };
      // pop: aparece con rebote
      const pop = (el, t, d = 0.32, extra = {}) => {
        el = typeof el === "string" ? qa(el) : el;
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false, ...extra }, t);
      };
      // entra desde un lado (dx, dy)
      const entra = (el, t, dx = 0, dy = 120, d = 0.35) => {
        el = typeof el === "string" ? qa(el) : el;
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, x: dx, y: dy }, { opacity: 1, x: 0, y: 0, duration: d, ease: "power3.out", immediateRender: false }, t);
      };
      const sale = (el, t, d = 0.2) => tl.to(typeof el === "string" ? qa(el) : el, { opacity: 0, duration: d }, t);
      const sacudon = (t, k = 1) => [[-14, 8], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(ESC, { x: x * k, y: y * k, duration: 0.04, ease: "none" }, t + i * 0.045));
      // dibujar: el trazo se dibuja solo (opacity 0 hasta que arranca: sin puntitos de los caps)
      const dibujar = (el, t, d = 0.5) => {
        for (const e of typeof el === "string" ? qa(el) : [].concat(el)) {
          const L = e.getTotalLength();
          gsap.set(e, { strokeDasharray: L + " " + L, strokeDashoffset: L, opacity: 0 });
          tl.set(e, { opacity: 1 }, t);
          tl.to(e, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
        }
      };
      // hablar: la boca se abre y cierra entre t0 y t1 (sin repeat infinito)
      const hablar = (el, t0, t1, min = 0.25, paso = 0.13) => {
        el = typeof el === "string" ? q(el) : el;
        const n = Math.max(1, Math.round((t1 - t0) / (paso * 2)));
        tl.fromTo(el, { scaleY: 1 }, { scaleY: min, duration: paso, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", transformOrigin: "50% 50%", immediateRender: false }, t0);
      };
      // parpadeo de ojos
      const parpadeo = (el, t) => tl.to(typeof el === "string" ? qa(el) : el, { scaleY: 0.1, duration: 0.06, yoyo: true, repeat: 1, ease: "none", transformOrigin: "50% 50%" }, t);

${JS.trim()}

      // salida: barrido con blur
      tl.to(q("#${P}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.22, ease: "power2.in" }, DUR - 0.22);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${ID}.html`, html);
  fs.writeFileSync(`compositions/${ID}.sfx.json`, "[\n" + SFX.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");
  console.log("escena", ID, DUR);
}
