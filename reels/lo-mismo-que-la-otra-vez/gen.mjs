// lo-mismo-que-la-otra-vez: todo el reel desde un solo lugar (correr desde la carpeta del reel).
//   node gen.mjs 1        → parte 1 (el problema, 14,0 s): tiempos3d.js, capa plana, mezcla e index.html
//   node gen.mjs 2        → parte 2 (resuelto, 11,6 s, con la línea chica)
//   node gen.mjs cartel   → el cartel "Un sistema de clientes más tarde…" (3,4 s, sin 3D)
//   node gen.mjs unir     → pega renders/parte1.mp4 + renders/cartel.mp4 + renders/parte2.mp4 en
//                           renders/lo-mismo-que-la-otra-vez.mp4 (sin el paso 10: ese lo hace el coordinador)
//   MEDIR=1 node gen.mjs N → además escribe assets/audio/stem-voz-N.wav y stem-resto-N.wav (para medir la mezcla)
//   LIMPIO=1 node gen.mjs N → sin capa plana ni firma (fondo de la portada)
// Render de cada parte: `node gen.mjs N` y enseguida
//   flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/parteN.mp4
// Formato "PARA MANDAR" completo (como reels/abren-hoy-completo): sin narrador Orus; el chiste va en globos 3D.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
// la misma ganancia para las tres piezas (parte 1, cartel, parte 2): así las voces quedan parejas entre sí
const GANANCIA = 5;
const MODO = process.argv[2] || "1";
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { maxBuffer: 1e9 });
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());

// ================= UNIR =================
if (MODO === "unir") {
  const P = ["renders/parte1.mp4", "renders/cartel.mp4", "renders/parte2.mp4"];
  const ins = P.flatMap((p) => ["-i", p]);
  const norm = P.map((_, i) => `[${i}:v]fps=30,format=yuv420p,setsar=1[v${i}];[${i}:a]aresample=48000,aformat=channel_layouts=stereo[a${i}]`).join(";");
  ff([...ins, "-filter_complex", `${norm};[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]`, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "12", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "renders/lo-mismo-que-la-otra-vez.mp4"]);
  ff(["-i", "renders/lo-mismo-que-la-otra-vez.mp4", "-vf", "fps=1/1.5,scale=240:-1,tile=7x3", "-frames:v", "1", "renders/hoja.png"]);
  console.log(`listo: renders/lo-mismo-que-la-otra-vez.mp4 (${r2(dur("renders/lo-mismo-que-la-otra-vez.mp4"))} s) y renders/hoja.png`);
  process.exit(0);
}

// ================= CARTEL =================
if (MODO === "cartel") {
  const DUR = 3.4;
  const SON = [
    ["sfx/whoosh.mp3", 0.0, -31],        // el giro de la parte 1 que se va
    ["sfx/stinger.wav", 0.05, -31],      // vibráfono (CC0), unos 7 LU por debajo del narrador
    ["voice/narrador.wav", 0.38, -18],   // Gemini Rasalgethi: "Un sistema de clientes más tarde."
    ["sfx/whoosh-short.mp3", 2.94, -31], // el iris que abre la parte 2
  ];
  for (const x of SON) if (["sfx/whoosh.mp3", "sfx/whoosh-short.mp3"].includes(x[0])) x[3] = { desde: 0.06 };
  mezclar(SON, DUR, "cartel");
  fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #5ce611; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #5ce611; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="el-cartel" class="scene" data-composition-id="cartel" data-composition-src="compositions/cartel.html" data-start="0" data-duration="${DUR}" data-track-index="1" data-track-kind="graphics"></div>
      <audio id="mezcla" src="assets/audio/mezcla-cartel.wav" data-start="0" data-duration="${DUR}" data-track-index="30" data-volume="1"></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.to("#root", { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
  console.log(`cartel listo (${DUR} s)`);
  process.exit(0);
}

// ================= LOS BEATS (segundos de cada parte) =================
const PARTE = Number(MODO);
let T, DUR, VOZ, LINEA;
if (PARTE === 1) {
  DUR = 14.0;
  T = {
    planos: [0, 1.7, 2.6, 6.2, 7.4, 9.2, 12.3],
    globo0: 0.25, congela: 1.05,
    // [aparece el producto y su globo, "No." de Graciela, lo deja en la pila]
    ofertas: [[2.6, 3.05, 3.25], [3.45, 3.85, 4.0], [4.2, 4.55, 4.68], [4.85, 5.1, 5.2], [5.35, null, 5.78]],
    niega: [5.55, 6.1], tambalea: 5.92, globosSalen: 6.15,
    piensa: 6.2, verde: 6.85, latigo: [7.4, 7.65], contador: 7.75, cuenta37: 8.9,
    gira: 9.2, corte: 9.25, voz: 9.8,
    clarito: 12.35, contador2: 12.8, tacha: 12.9, frente: 13.05, cae: 13.3, caeGolpe: 13.84, // caeGolpe: llega al piso (misma física que tres.js)
  };
  VOZ = "assets/voice/ruben1.wav";
  LINEA = [["Todo", 0.03], ["es", 0.33], ["verde,", 0.6], ["Graciela.", 1.02]];
} else {
  DUR = 11.6;
  T = {
    planos: [0, 1.3, 3.1, 4.6, 6.0, 9.4],
    campanita: 0.1, tipea: [0.35, 1.25], toca: 0.6, tapG: 1.45, ficha: 1.7, tildes: [2.05, 2.4, 2.7],
    bolsa: [3.2, 3.45, 3.7], empuja: 3.95, feliz: 5.0, saca: [4.75, 5.1], eso: 5.15,
    sorbo: [6.0, 6.8], baja: 6.9, voz: 7.1, guino: 8.3, sale: [9.55, 11.6], cierre: 9.9, campanita2: 10.6,
  };
  VOZ = "assets/voice/ruben2.wav";
  LINEA = [["Era", 0.03], ["verde.", 0.45]];
}

// rodillo del contador (parte 1): de 1 a 37 entre contador+0,1 y cuenta37, desacelerando
const RODILLO = [];
if (PARTE === 1) {
  const a = T.contador + 0.12, b = T.cuenta37;
  for (let n = 2; n <= 37; n++) {
    // n(t) = 1 + 36 * (1 - (1-u)^2.2) → el t en que llega a n
    const u = 1 - Math.pow(1 - (n - 1) / 36, 1 / 2.2);
    RODILLO.push(r2(a + u * (b - a)));
  }
  T.rodillo = RODILLO;
}

// ---------- envolvente de la voz a 30 cuadros por segundo (la boca de Rubén) ----------
const VOZ_DUR = r2(dur(VOZ));
const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", VOZ, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
const env = [];
for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
  let s = 0, c = 0;
  for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
  env.push(Math.sqrt(s / Math.max(1, c)));
}
const mx = Math.max(...env);
const ENV = env.map((v) => { const k = v / mx; return r2(k < 0.1 ? 0 : Math.pow(k, 0.8)); });
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs (node gen.mjs ${PARTE})\nexport const PARTE = ${PARTE};\nexport const DUR = ${DUR};\nexport const T = ${JSON.stringify(T)};\nexport const VOZ_T = ${T.voz};\nexport const VOZ_ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${process.env.LIMPIO ? "true" : "false"};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611";
const BASE = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }`;
function escena(id, d, { css, html, js }) {
  const P = `[data-composition-id="${id}"]`;
  fs.writeFileSync(`compositions/${id}.html`, `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${BASE(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${d}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${d}" data-track-index="0">
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
fs.mkdirSync("compositions", { recursive: true });
const ESC = [];
// la hora (pill abajo a la derecha)
{
  const id = `p${PARTE}-hora`, ini = 0, d = PARTE === 1 ? 9.1 : 6.0;
  ESC.push([id, ini, d]);
  escena(id, d, {
    css: `
    P .hora { position: absolute; right: 56px; top: 1640px; display: flex; align-items: center; gap: 18px; padding: 16px 28px 17px; border-radius: 999px; background: ${NAVY}; border: 5px solid ${CR}; font: 500 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; box-shadow: 0 8px 0 rgba(3,6,12,0.45); }
    P .punto { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }`,
    html: `      <div class="hora"><i class="punto"></i>${PARTE === 1 ? "SÁBADO · 11:40" : "OTRO SÁBADO · 11:40"}</div>`,
    js: `      tl.fromTo(q(".hora"), { opacity: 1, y: 0 }, { opacity: 0, y: 30, duration: 0.25, ease: "power2.in", immediateRender: true }, ${r2(d - 0.3)});
      tl.fromTo(q(".punto"), { opacity: 1 }, { opacity: 0.35, duration: 0.5, yoyo: true, repeat: ${Math.floor(d / 1)}, ease: "sine.inOut", immediateRender: false }, 0.2);`,
  });
}
// la línea de Rubén, palabra por palabra, abajo de su cara; "verde" en el recuadro verde de selección
{
  const id = `p${PARTE}-linea`, ini = r2(T.voz + LINEA[0][1] - 0.08);
  const fin = PARTE === 1 ? 12.25 : 9.35;
  const d = r2(fin - ini);
  ESC.push([id, ini, d]);
  const spans = LINEA.map(([w, s]) => { const ac = /^verde/.test(w); return `<span class="w${ac ? " ac" : ""}" data-t="${r2(T.voz + s - ini)}">${ac ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`; }).join(" ");
  escena(id, d, {
    css: `
    P .linea { position: absolute; left: 40px; right: 40px; top: ${PARTE === 1 ? 1500 : 1480}px; text-align: center; font: 700 88px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: -5px -5px 0 ${NAVY}, 5px -5px 0 ${NAVY}, -5px 5px 0 ${NAVY}, 5px 5px 0 ${NAVY}, 0 -7px 0 ${NAVY}, 0 7px 0 ${NAVY}, -7px 0 0 ${NAVY}, 7px 0 0 ${NAVY}, 0 12px 0 rgba(11,18,32,0.45); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 14px; }
    P .caja { position: absolute; left: -16px; right: -16px; top: 4px; bottom: 0; border: 5px solid ${NAVY}; background: ${G}; border-radius: 6px; opacity: 0; }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${NAVY}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        tl.fromTo(w, { opacity: 0, y: 18, scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out", immediateRender: true }, t);
        const c = w.querySelector(".caja");
        if (c) { tl.set(w.querySelector("em"), { color: "${NAVY}", textShadow: "none" }, t + 0.06); tl.fromTo(c, { opacity: 0, scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t + 0.06); }
      }
      tl.set(q(".linea"), { opacity: 0 }, ${r2(d - 0.02)}); // sale de golpe (con fundido se veía gris)`,
  });
}
// la línea chica final (solo parte 2)
if (PARTE === 2) {
  const id = "p2-cierre", ini = T.cierre, d = r2(DUR - T.cierre);
  ESC.push([id, ini, d]);
  escena(id, d, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1470px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.92); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 50px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un sistema que se acuerda<br>de lo que compra cada cliente</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.03);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.28);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// Cada entrada: [archivo, inicio, LUFS objetivo, { desde, dur, fin, baja: [[a, b, dB], ...], vel }].
// Techo por efecto: -31 LUFS (los objetivos de los SFX nunca pasan de ahí). La voz va a -18 LUFS: así queda al menos
// 6 LU arriba de música + SFX mientras habla (se mide con MEDIR=1 y herramienta en el informe).
const TECHO = -31;
let SON;
if (PARTE === 1) {
  const o = T.ofertas;
  SON = [
    ["sfx/calle.wav", 0, -40, { dur: DUR, fin: 0.4, lp: 900 }],                    // la calle de afuera, apagada por la pared (ambiente interior)
    ["bgm/pizzicato.wav", 0, -27, { dur: T.corte + 0.03, fin: 0.03, baja: [[T.piensa, T.verde - 0.05, -8]] }], // se corta seco en la mirada
    ["sfx/burbuja.mp3", T.globo0 - 0.02, -33],
    ...o.flatMap(([a, no, deja], i) => [
      ["sfx/pop.mp3", a, -34],
      ["sfx/burbuja.mp3", a + 0.02, -35],
      ...(no ? [["sfx/burbuja.mp3", no, -36, { vel: 1.12 }]] : []),
      ["sfx/sello.mp3", deja + 0.06, -36, { vel: [1, 0.9, 1.08, 0.95, 0.85][i], dur: 0.28, fin: 0.06 }],   // el paquete que cae en la pila (solo el primer golpe del sello)
      ["sfx/golpe.mp3", deja + 0.06, -41],
    ]),
    ["sfx/papel.wav", T.tambalea, -33, { dur: 0.6, fin: 0.2 }],                    // la pila que cruje y se tambalea
    ["sfx/burbuja.mp3", T.verde - 0.02, -33],
    ["sfx/chime.mp3", T.verde + 0.02, -36, { desde: 0.37, dur: 0.45, fin: 0.25 }],   // chime.mp3 tiene 0,37 s mudos al principio
    ["sfx/whoosh.mp3", T.latigo[0] - 0.06, -31],
    ["sfx/pop.mp3", T.contador, -35],
    ...RODILLO.filter((t, i) => i === 0 || t - RODILLO[i - 1] > 0.035).map((t) => ["sfx/key-press.mp3", t, -40, { dur: 0.12, fin: 0.04 }]),
    ["sfx/chime.mp3", T.cuenta37 + 0.02, -35, { desde: 0.37, dur: 0.3, fin: 0.12 }],   // termina antes del silencio del chiste (9,25)
    ["voice/ruben1.wav", T.voz, -18],
    ["sfx/burbuja.mp3", T.clarito - 0.02, -33],
    ["sfx/pop.mp3", T.contador2, -35],
    ["sfx/key-press.mp3", T.tacha, -34],
    ["sfx/tuba.mp3", T.tacha + 0.04, -31, { desde: 0.15 }],
    ["sfx/cachetada.mp3", T.frente + 0.02, -32],                                  // la mano a la frente
    ["sfx/papel.wav", T.cae + 0.02, -35, { dur: 0.35, fin: 0.12 }],
    ["sfx/sello.mp3", T.caeGolpe, -34, { vel: 0.8, dur: 0.28, fin: 0.06 }],
  ];
} else {
  SON = [
    ["sfx/calle.wav", 0, -40, { dur: DUR, fin: 0.5, lp: 900, ini: 0.05 }],
    ["bgm/pizzicato.wav", 0, -25, { dur: DUR, fin: 1.0, ini: 0.05, baja: [[T.voz - 0.12, T.guino + 0.7, -9]] }], // todo anda: la música sigue (entra con un fundido corto después del cartel)
    ["sfx/campanita.wav", T.campanita, -32, { dur: 0.7, fin: 0.3 }],
    ["sfx/burbuja.mp3", T.tipea[0] - 0.02, -35],
    ...[0, 1, 2, 3, 4].map((k) => ["sfx/key-press.mp3", r2(T.tipea[0] + (k * (T.tipea[1] - T.tipea[0])) / 5), -34, { dur: 0.12, fin: 0.04 }]),   // tecleo de cada tramo del globo
    ["sfx/click-soft.mp3", T.toca, -34],
    ["sfx/click-soft.mp3", T.tapG, -33],
    ["sfx/whoosh-short.mp3", T.ficha - 0.08, -38],
    ...T.tildes.flatMap((t) => [["sfx/key-press.mp3", t, -36, { dur: 0.15, fin: 0.05 }], ["sfx/chime.mp3", t + 0.02, -37, { desde: 0.37, dur: 0.35, fin: 0.2 }]]),
    ...T.bolsa.map((t, i) => ["sfx/pop.mp3", t, -34 - i * 0.5]),
    ["sfx/papel.wav", T.empuja, -32, { dur: 0.55, fin: 0.15 }],                    // la bolsa de papel que se arrastra
    ["sfx/papel.wav", T.saca[0], -36, { desde: 0.3, dur: 0.4, fin: 0.12 }],
    ["sfx/burbuja.mp3", T.eso - 0.02, -33],
    ["sfx/sorbo.wav", T.sorbo[0] + 0.3, -32],
    ["voice/ruben2.wav", T.voz, -18],
    ["sfx/cero.mp3", T.guino, -31, { dur: 0.7, fin: 0.3 }],
    ["sfx/campanita.wav", T.campanita2, -37, { dur: 0.6, fin: 0.3 }],
  ];
}
// tramos mudos al principio de algunos efectos (pop 0,09 s, whoosh 0,06 s, chime 0,37 s, tuba 0,15 s)
const MUDO = { "sfx/pop.mp3": 0.09, "sfx/whoosh.mp3": 0.06, "sfx/whoosh-short.mp3": 0.06 };
const recortar = (L) => { for (const x of L) if (MUDO[x[0]] && !(x[3] && x[3].desde)) { x[3] = { ...(x[3] || {}), desde: MUDO[x[0]] }; } };
recortar(SON);
for (const s of SON) if (!s[0].startsWith("voice/") && !s[0].startsWith("bgm/") && s[0] !== "sfx/calle.wav") s[2] = Math.min(s[2], TECHO);
mezclar(SON, DUR, String(PARTE));

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const hosts = (LIMPIO ? [] : ESC).map(([id, a, d], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${3 + i}" data-track-kind="graphics"></div>`).join("\n");
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #fondo { position: absolute; inset: 0; background: #16243d; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #tres, #barrido { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      #barrido { visibility: hidden; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1790px; height: 44px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 50; filter: drop-shadow(0 0 6px rgba(11,18,32,0.95)) drop-shadow(0 2px 2px rgba(11,18,32,0.9)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas><canvas id="barrido" width="1080" height="1920"></canvas></div>
${hosts}
${LIMPIO ? "" : `      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${DUR}" data-track-index="2" />`}
      <audio id="mezcla" src="assets/audio/mezcla-${PARTE}.wav" data-start="0" data-duration="${DUR}" data-track-index="30" data-volume="1"></audio>
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
console.log(`parte ${PARTE} lista: ${ESC.length} escenas, ${SON.length} sonidos, ${DUR} s; voz ${VOZ_DUR} s desde ${T.voz}`);

// ================= mezcla (ffmpeg) =================
function lufsDe(f, o = {}) {
  const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS,` : "";
  const txt = execSync(`ffmpeg -hide_banner -i assets/${f} -af "${corte}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=0.5,ebur128" -f null - 2>&1`).toString();
  const m = [...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
  return m && Number(m[1]) > -69 ? Number(m[1]) : -30;
}
function cadena(i, [f, ini, obj, o = {}], cache) {
  const k = f + JSON.stringify([o.desde, o.dur]);
  cache[k] ??= lufsDe(f, o);
  const gan = r2(obj - cache[k]);
  let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
  if (o.vel && o.vel !== 1) c += `,asetrate=${Math.round(48000 * o.vel)},aresample=48000`;
  if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
  if (o.lp) c += `,lowpass=f=${o.lp}`;
  if (o.ini) c += `,afade=t=in:st=0:d=${o.ini}`;
  if (o.fin && o.dur) c += `,afade=t=out:st=${r2(Math.max(0, o.dur - o.fin))}:d=${o.fin}`;
  c += `,volume=${gan}dB`;
  // bajadas con rampa de 0,15 s (sin escalones)
  for (const [a, b, db] of o.baja ?? []) { const A = r2(a - ini), B = r2(b - ini), R = 0.15; c += `,volume='pow(10,(${db})*max(0,min(1,min((t-${A})/${R},(${B}-t)/${R})))/20)':eval=frame`; }
  c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)}`;
  return c;
}
function mezclar(lista, D, nombre) {
  fs.mkdirSync("assets/audio", { recursive: true });
  const cache = {};
  const una = (sel, salida) => {
    const args = [];
    const fil = [];
    sel.forEach((s, i) => { args.push("-i", `assets/${s[0]}`); fil.push(cadena(i, s, cache) + `,apad=whole_dur=${D}[a${i}]`); });
    fil.push(`${sel.map((_, i) => `[a${i}]`).join("")}amix=inputs=${sel.length}:normalize=0:dropout_transition=0,atrim=duration=${D}[m]`);
    ff([...args, "-filter_complex", fil.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", salida]);
  };
  una(lista, `assets/audio/cruda-${nombre}.wav`);
  if (process.env.MEDIR) {
    una(lista.filter((s) => s[0].startsWith("voice/")), `assets/audio/stem-voz-${nombre}.wav`);
    una(lista.filter((s) => !s[0].startsWith("voice/")), `assets/audio/stem-resto-${nombre}.wav`);
  }
  // nivel: ganancia fija común + limitador (la parte 1 queda cerca de -14 LUFS; el paso 10 hace el resto)
  ff(["-i", `assets/audio/cruda-${nombre}.wav`, "-af", `volume=${GANANCIA}dB,alimiter=limit=0.6:level=false`, "-ar", "48000", `assets/audio/mezcla-${nombre}.wav`]);
}
