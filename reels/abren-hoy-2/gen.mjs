// Genera todo abren-hoy-2 desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los tiempos de cada beat (T), la duración y la envolvente de la voz (boca de Rubén)
//   - compositions/*.html: la capa plana de arriba (hora, la línea de Rubén, el cierre chico)
//   - index.html: fondo + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voz mezclados con ffmpeg (ver SONIDO abajo)
// Formato "PARA MANDAR": sin narrador, sin tarjeta de videollamada larga; el chiste se entiende sin sonido.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos) =================
// Parte 2: el celular contesta solo. Planos: general · celular grande · Graciela · Rubén con mate · general (entra)
// · remate (contador a 0 y "salud" con el mate).
// SINVOZ=1 node gen.mjs arma la versión sin la línea de Rubén (para compararlas).
const SINVOZ = !!process.env.SINVOZ;
const T = {
  planos: [0, 1.4, 3.75, 5.5, 6.95, 9.0],
  tipea1: [0.15, 0.85], m1: 0.9, sorbos: [[0.35, 1.15], [5.72, 6.55]], vibra: [1.45, 5.6], escribe: [1.85, 5.62],
  m2: 2.35, sorpresa: 3.95, tipea2: [4.55, 5.1], m3: 5.2, m4: 6.05,
  guarda: 7.2, gira: 7.45, puerta: 7.55, entra: [7.7, 8.9], voz: 8.0,
  contador: 9.1, tacha: 9.55, cero: 9.95, linea2: 10.05, salud: 10.5, cierre: 11.55,
};
const DUR = 13.4;

// palabras de la línea (relativas al inicio de la locución; medidas sobre la envolvente de la toma Algenib)
const LINEA = [["Pase,", 0.1], ["Graciela.", 0.52]];

// ---------- envolvente de la voz a 30 cuadros por segundo (para mover la boca) ----------
const VOZ = "assets/voice/locucion.wav";
const VOZ_DUR = r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${VOZ}`).toString()));
const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", VOZ, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
const env = [];
for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
  let s = 0, c = 0;
  for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
  env.push(Math.sqrt(s / Math.max(1, c)));
}
const mx = Math.max(...env);
const ENV = env.map((v) => r2(Math.pow(v / mx, 0.8)));
// la respiración del principio no mueve la boca; sin voz, la boca no se mueve
for (let i = 0; i < Math.round(0.08 * 30); i++) ENV[i] = 0;
if (SINVOZ) ENV.length = 0;
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const T = ${JSON.stringify(T)};\nexport const VOZ_T = ${T.voz};\nexport const VOZ_ENV = ${JSON.stringify(ENV)};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611";
const BASE = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }`;
function escena(id, dur, { css, html, js }) {
  const P = `[data-composition-id="${id}"]`;
  fs.writeFileSync(`compositions/${id}.html`, `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${BASE(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
}

// s01 · la hora: otro día, a la tarde. Solo en el primer plano (después tapaba el celular).
const ESC = [];
{
  const id = "s01-hora", ini = 0, dur = r2(T.planos[1]);
  ESC.push([id, ini, dur]);
  escena(id, dur, {
    css: `
    P .hora { position: absolute; right: 56px; top: 1660px; display: flex; align-items: center; gap: 18px; padding: 16px 28px 17px; border-radius: 999px; background: ${NAVY}; border: 5px solid ${CR}; font: 500 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; box-shadow: 0 8px 0 rgba(3,6,12,0.45); }
    P .punto { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }`,
    html: `      <div class="hora"><i class="punto"></i>JUEVES · 16:40</div>`,
    js: `      tl.fromTo(q(".hora"), { opacity: 1, y: 0 }, { opacity: 0, y: 30, duration: 0.25, ease: "power2.in", immediateRender: true }, ${r2(dur - 0.3)});
      tl.fromTo(q(".punto"), { opacity: 1 }, { opacity: 0.35, duration: 0.5, yoyo: true, repeat: ${Math.floor(dur / 1)}, ease: "sine.inOut", immediateRender: false }, 0.2);`,
  });
}
// s02 · la línea de Rubén, palabra por palabra, abajo de su cara
{
  const id = "s02-linea", ini = r2(T.voz + LINEA[0][1] - 0.1), dur = r2(T.planos[5] - 0.02 - ini);
  if (!SINVOZ) ESC.push([id, ini, dur]);
  const spans = LINEA.map(([w, s], i) => `<span class="w${i === 1 ? " ac" : ""}" data-t="${r2(T.voz + s - ini)}">${i === 1 ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 40px; right: 40px; top: 1290px; text-align: center; font: 700 84px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: 0 5px 0 rgba(3,6,12,0.6), 0 0 26px rgba(3,6,12,0.55); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 14px; }
    P .caja { position: absolute; left: -16px; right: -16px; top: 4px; bottom: 0; border: 5px solid ${G}; background: rgba(11,18,32,0.55); }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${G}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        tl.fromTo(w, { opacity: 0, y: 18, scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out", immediateRender: true }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { opacity: 0, scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t + 0.06);
      }
      tl.to(q(".linea"), { opacity: 0, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}
// s03 · el cierre chico (abajo): una línea y la web
{
  const id = "s03-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1500px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.9); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 46px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA contesta por vos</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s) }]
const SONIDO = [
  ["sfx/calle.wav", 0, 4, { dur: DUR, fin: 0.4, baja: SINVOZ ? null : [T.voz - 0.1, T.voz + 1.45, -7] }],
  ["bgm/pizzicato.wav", 0, -3, { dur: DUR, fin: 1.2, baja: SINVOZ ? null : [T.voz - 0.1, T.voz + 1.45, -9] }],                    // esta vez la música sigue: todo anda
  ["sfx/tipeo.mp3", T.tipea1[0], 4, { desde: 0.05, dur: 0.7, fin: 0.1 }],
  ["sfx/burbuja.mp3", T.m1 + 0.03, -4],
  ["sfx/sorbo.wav", T.sorbos[0][0] + 0.38, 0],
  ["sfx/vibra.wav", T.vibra[0], -2, { dur: 0.5, fin: 0.08 }],
  ["sfx/respuesta.wav", T.m2, -3],
  ["sfx/tipeo.mp3", T.tipea2[0], 4, { desde: 1.65, dur: 0.55, fin: 0.1 }],
  ["sfx/burbuja.mp3", T.m3 + 0.03, -4],
  ["sfx/vibra.wav", T.vibra[1], -2, { dur: 0.5, fin: 0.08 }],
  ["sfx/sorbo.wav", T.sorbos[1][0] + 0.38, 1],
  ["sfx/respuesta.wav", T.m4, -3],
  ["sfx/puerta.wav", T.puerta - 0.05, 8],
  ["sfx/campanita.wav", T.puerta + 0.08, -4, { dur: 0.6, fin: 0.25 }],
  ...(SINVOZ ? [] : [["voice/locucion.wav", T.voz, 2.5]]),
  ["sfx/pop.mp3", T.contador, -8],
  ["sfx/whoosh-short.mp3", T.tacha - 0.05, -6],
  ["sfx/key-press.mp3", T.cero, -6],
  ["sfx/cero.mp3", T.cero + 0.02, -6],
  ["sfx/pop.mp3", T.linea2, -10],
  ["sfx/whoosh.mp3", T.salud - 0.08, -12],
];
fs.mkdirSync("assets/audio", { recursive: true });
{
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  SONIDO.forEach(([f, ini, db, o = {}], i) => {
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.baja) c += `,volume=${o.baja[2]}dB:enable='between(t,${o.baja[0]},${o.baja[1]})'`;
    c += `,volume=${db}dB,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${SONIDO.map((_, i) => `[a${i}]`).join("")}amix=inputs=${SONIDO.length}:normalize=0:dropout_transition=0,atrim=duration=${DUR},afade=t=out:st=${r2(DUR - 0.3)}:d=0.3[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla-cruda.wav");
  execFileSync("ffmpeg", args);
  // stems para medir (MEDIR=1 node gen.mjs): la voz sola y todo lo demás, con las mismas ganancias
  if (process.env.MEDIR) for (const [nombre, filtro] of [["voz", (f) => f.startsWith("voice/")], ["resto", (f) => !f.startsWith("voice/")]]) {
    const sel = SONIDO.map((x, i) => [x, i]).filter(([x]) => filtro(x[0]));
    const a2 = ["-y", "-loglevel", "error"]; const f2 = [];
    sel.forEach(([[f, ini, db, o = {}]], k) => {
      a2.push("-i", `assets/${f}`);
      let c = `[${k}:a]aresample=48000,aformat=channel_layouts=stereo`;
      if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
      if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
      if (o.baja) c += `,volume=${o.baja[2]}dB:enable='between(t,${o.baja[0]},${o.baja[1]})'`;
      c += `,volume=${db}dB,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${DUR}[a${k}]`;
      f2.push(c);
    });
    f2.push(`${sel.map((_, k) => `[a${k}]`).join("")}amix=inputs=${sel.length}:normalize=0:dropout_transition=0,atrim=duration=${DUR}[m]`);
    a2.push("-filter_complex", f2.join(";"), "-map", "[m]", "-ar", "48000", `assets/audio/stem-${nombre}.wav`);
    execFileSync("ffmpeg", a2);
  }
  // nivel: -14 LUFS con limitador a -4,4 dBFS: el loudnorm del paso 10 casi no toca nada y el AAC no clipea
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "loudnorm=I=-14:TP=-3:LRA=11,alimiter=limit=0.6:level=false", "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
// LIMPIO=1: sin capa plana ni firma (para el fondo de la portada)
const LIMPIO = !!process.env.LIMPIO;
const hosts = (LIMPIO ? [] : ESC).map(([id, a, d], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`).join("\n");
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #fondo { position: absolute; inset: 0; background: #16243d; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1790px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${hosts}
${LIMPIO ? "" : `      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="9" />`}
      <audio id="mezcla" src="assets/audio/mezcla.wav" data-start="0" data-duration="${DUR}" data-track-index="30" data-volume="1"></audio>
    </div>
    <script>
      window.__hf = window.__hf || {};
      window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["tres"] = new Promise((ok) => { window.__tresListo = ok; });
    </script>
    <script type="module" src="assets/tres.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.to("#fondo", { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${SONIDO.length} sonidos, ${DUR} s; voz ${VOZ_DUR} s desde ${T.voz}`);
