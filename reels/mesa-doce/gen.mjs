// Genera todo mesa-doce desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/voice/*.wav: las tomas recortadas (silencio de punta) y con el tempo final
//   - assets/tiempos3d.js: cuándo empieza cada línea (L), los beats (T), la duración y las envolventes de las bocas
//   - compositions/capa.html: el HUD de arriba (rubro, visitas, la tarjeta de puntos), los subtítulos y la firma
//   - compositions/cierre.html: la tarjeta final "Comentá PUNTOS"
//   - index.html y assets/audio/mezcla.wav (ambiente, música, SFX y voces mezclados con ffmpeg)
//   MEDIR=1 node gen.mjs  → además stems voz/resto para medir la mezcla
//   LIMPIO=1 node gen.mjs → index sin capa plana ni cierre (fondo de la portada)
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());

// ================= LAS VOCES =================
// Las tomas ya vienen recortadas y con el tempo final (partes/prep.sh → assets/voice/*.wav).
// [toma, silencio antes (s)]. r = Rubén (Algenib, voz en off en primera persona), d = el dueño (Iapetus), n = cierre (Orus)
const ORDEN = [["r01", 0.72], ["d01", 0.22], ["r02", 0.35], ["r03", 0.22], ["r04", 0.22], ["r06", 0.85], ["r07", 0.2], ["r08", 0.22], ["r09", 0.25], ["d02", 0.25], ["r11", 0.18], ["n01", 0.3]];
// tiempos por palabra: el reconocimiento de voz se corre hasta medio segundo; se anclan a los tramos con voz
// (silencedetect) y adentro de cada tramo se reparten por largo de la palabra. Si las frases (cortadas en la
// puntuación) son tantas como los tramos, una frase por tramo; si no, todo el texto sobre el tiempo con voz.
function tramos(f) {
  const sd = execSync(`ffmpeg -hide_banner -i ${f} -af silencedetect=n=-38dB:d=0.09 -f null - 2>&1`).toString();
  const D = dur(f), ss = [...sd.matchAll(/silence_start: ([0-9.]+)/g)].map((m) => Number(m[1])), se = [...sd.matchAll(/silence_end: ([0-9.]+)/g)].map((m) => Number(m[1]));
  const out = []; let a = 0;
  ss.forEach((s0, i) => { if (s0 > a + 0.05) out.push([a, s0]); a = se[i] ?? D; });
  if (a < D - 0.05) out.push([a, D]);
  return out;
}
function alinear(f, palabras) {
  const tr = tramos(f), largo = (w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 1.5;
  const frases = []; let cur = [];
  palabras.forEach((w, i) => { cur.push(i); if (/[.,:;?!]$/.test(w)) { frases.push(cur); cur = []; } });
  if (cur.length) frases.push(cur);
  const res = [];
  const repartir = (idx, a, z) => { const tot = idx.reduce((s, i) => s + largo(palabras[i]), 0); let t = a; for (const i of idx) { const d = ((z - a) * largo(palabras[i])) / tot; res[i] = { t, f: t + d }; t += d; } };
  if (frases.length === tr.length) frases.forEach((fr, k) => repartir(fr, tr[k][0], tr[k][1]));
  else {
    const voz = tr.reduce((s, [a, z]) => s + z - a, 0), tot = palabras.reduce((s, w) => s + largo(w), 0);
    const aT = (u) => { let r = u * voz; for (const [a, z] of tr) { if (r <= z - a) return a + r; r -= z - a; } return tr[tr.length - 1][1]; };
    let acc = 0; palabras.forEach((w, i) => { const u0 = acc / tot; acc += largo(w); res[i] = { t: aT(u0), f: aT(acc / tot) }; });
  }
  return { res, tr, frases: frases.length };
}
const L = {}, PAL = [];
let t = 0;
for (const [b, gap] of ORDEN) {
  const out = `assets/voice/${b}.wav`;
  t = r2(t + gap);
  const d = r2(dur(out));
  L[b] = { a: t, d, z: r2(t + d) };
  const palabras = fs.readFileSync(`partes/${b}.txt`, "utf8").split(/\s+/).filter(Boolean);
  const { res, tr, frases } = alinear(out, palabras);
  if (process.env.VER) console.log(b, "tramos", tr.length, "frases", frases, palabras.map((w, i) => w + "@" + res[i].t.toFixed(2)).join(" "));
  res.forEach((x, i) => PAL.push({ b, i, w: palabras[i], t: r2(t + x.t), f: r2(t + x.f) }));
  t = L[b].z;
}
const pw = (b, i) => PAL.find((p) => p.b === b && p.i === i).t; // inicio de la palabra i de la línea b
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(PAL));
const CIERRE = r2(pw("n01", 1) - 0.12); // la tarjeta final entra sobre "PUNTOS" ("Comentá" se dice sobre el último plano)
const DUR = r2(L.n01.z + 0.25);

// ================= LOS BEATS (segundos del video) =================
const T = {
  // ---- parte 1: el de siempre ----
  rubro: 0.68,                          // "PIZZERÍAS" grande hasta acá, después sube al HUD
  planoA2: r2(pw("r01", 2) - 0.1),     // general: Rubén en la mesa 12 ("Todos los viernes. Mesa doce.")
  llegaD: r2(L.d01.a - 1.3),            // el dueño camina hacia la mesa (todavía en el plano A)
  planoB: r2(L.d01.a - 0.12),           // POV: el dueño en la mesa, "¿Primera vez por acá?"
  primera: pw("d01", 2),                // "¿Primera…": el contador de visitas tiembla
  planoC: r2(L.r02.a - 0.12),           // Rubén en primer plano: "Noventa visitas." (la porción se le cae)
  perro: r2(pw("r02", 2) - 0.12),       // inserto: Toby durmiendo, el plato con su nombre
  planoE1: r2(L.r03.a - 0.1),           // por encima del hombro de Rubén: la vidriera, enfrente abrieron otra
  planoE2: r2(pw("r03", 5) - 0.1),      // push-in al cartel de enfrente: "PORCIÓN DE REGALO", "SUMÁ PUNTOS"
  planoF: r2(L.r04.a - 0.1),            // la mesa 12 vacía; el dueño la limpia silbando
  dias: r2(L.r04.a + 0.15),             // el HUD: "SIN VENIR" cuenta los días
  // ---- parte 2: con puntos ----
  rebobina: r2(L.r04.z + 0.1),          // rebobina: la cámara vuelve a la mesa, el HUD pasa a la tarjeta
  planoG: r2(L.r06.a - 0.05),           // POV: la mesa con el QR ("Ahora, con puntos:")
  planoH: r2(pw("r06", 3) - 0.1),       // POV: escanea el QR con el celular
  scan: r2(pw("r06", 7) - 0.05),        // "y sumo": +1 sello
  planoI: r2(L.r07.a - 0.08),           // el celular en primer plano: faltan 2
  planoJ1: r2(L.r08.a - 0.1),           // POV: llega la porción con vela
  planoJ2: r2(pw("r08", 7) - 0.12),     // Rubén con la vela: "Con vela."
  planoK: r2(L.r09.a - 0.1),            // el panel del dueño
  planoL: r2(L.d02.a - 0.15),           // contraplano desde el mostrador: "¡Rubén! ¿La de siempre?"
  planoM: r2(L.r11.a - 0.15),           // Rubén: "Ahora sí."
  cierre: CIERRE,
};
// la porción de cumpleaños: el plato toca la mesa
T.plato = r2(T.planoJ1 + 1.05);
T.planoJ1b = r2(T.plato + 0.3);       // la porción con vela llegando a la mesa, de cerca
T.regalo = r2(T.planoJ1 + 0.6);         // el HUD: PREMIOS 1
T.panelFila = r2(pw("r09", 5) - 0.05);  // "quién viene": se marca la fila de Rubén
T.panelCada = r2(pw("r09", 8) - 0.05);  // "cada cuánto": se marca "los viernes"
T.saluda = r2(pw("d02", 0) - 0.05);
T.faltan = r2(pw("r07", 2) - 0.05);
T.puntosE = r2(pw("r03", 12) - 0.08); // "suman": entra el afiche "SUMÁ PUNTOS"

// ---------- envolventes de las bocas (30 por segundo): el dueño en d01 y d02, Rubén en r11 ----------
function envolvente(f) {
  const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", f, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
  const env = [];
  for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
    let s = 0, c = 0;
    for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
    env.push(Math.sqrt(s / Math.max(1, c)));
  }
  const mx = Math.max(...env);
  return env.map((v) => r2(Math.pow(v / mx, 0.8)));
}
const BOCAS = { d01: { t: L.d01.a, env: envolvente("assets/voice/d01.wav") }, d02: { t: L.d02.a, env: envolvente("assets/voice/d02.wav") }, r11: { t: L.r11.a, env: envolvente("assets/voice/r11.wav") } };
const LIMPIO = !!process.env.LIMPIO;
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const T = ${JSON.stringify(T)};\nexport const L = ${JSON.stringify(L)};\nexport const BOCAS = ${JSON.stringify(BOCAS)};\nexport const LIMPIO = ${LIMPIO};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";
// subtítulos: grupos de palabras [línea, desde, hasta (incl.), acento (índice dentro de la línea) | -1]
const GRUPOS = [
  ["r01", 0, 1, 1], ["r01", 2, 4, 4], ["r01", 5, 6, 6],
  ["d01", 0, 1, -1], ["d01", 2, 5, 2],
  ["r02", 0, 1, 0], ["r02", 2, 7, 7],
  ["r03", 0, 4, 4], ["r03", 5, 7, 7], ["r03", 8, 10, 9], ["r03", 11, 13, 13],
  ["r04", 0, 1, 1], ["r04", 2, 6, 6],
  ["r06", 0, 2, 2], ["r06", 3, 7, 5],
  ["r07", 0, 6, 6],
  ["r08", 0, 2, 2], ["r08", 3, 6, 6], ["r08", 7, 8, 8],
  ["r09", 0, 4, 4], ["r09", 5, 9, 9],
  ["d02", 0, 0, 0], ["d02", 1, 3, 3],
  ["r11", 0, 1, 1],
];
const MUESTRA = { muza: "muzza" }; // la voz lee "muza"; en pantalla va como se escribe
const subs = GRUPOS.map(([b, i0, i1, ac]) => {
  const ws = PAL.filter((p) => p.b === b && p.i >= i0 && p.i <= i1);
  const fin = ws[ws.length - 1].f;
  const sig = PAL.find((p) => p.t > fin + 0.001 && !(p.b === b && p.i <= i1));
  const hasta = sig ? Math.min(r2(fin + 0.6), r2(sig.t - 0.04)) : r2(fin + 0.5);
  return { b, a: r2(ws[0].t - 0.06), z: Math.max(r2(ws[0].t + 0.45), hasta), dueno: b.startsWith("d"), ws: ws.map((p) => ({ w: MUESTRA[p.w.replace(/[^\p{L}]/gu, "").toLowerCase()] ? p.w.replace(/muza/i, "muzza") : p.w, t: p.t, ac: p.i === ac })) };
});
// cada grupo se va cuando entra el siguiente (nunca dos a la vez)
subs.forEach((s, k) => { const sig = subs[k + 1]; if (sig) { s.z = Math.min(Math.max(s.z, s.a + 0.45), sig.a); } });
const CORTES = ["planoA2", "planoB", "planoC", "perro", "planoE1", "planoE2", "planoF", "rebobina", "planoG", "planoH", "planoI", "planoJ1", "planoJ1b", "planoJ2", "planoK", "planoL", "planoM"].map((k) => T[k]);
for (const sb of subs) for (const c of CORTES) if (c > sb.a + 0.3 && c < sb.z && sb.z - c < 0.32) sb.z = c;
// el último subtítulo no puede pisar la tarjeta final
for (const s of subs) s.z = Math.min(s.z, r2(CIERRE - 0.02));

const capaDur = CIERRE;
const subsHTML = subs.map((s, k) => `      <p class="sub${s.dueno ? " dueno" : ""}" id="sub${k}">${s.dueno ? `<span class="quien">EL DUEÑO</span>` : ""}${s.ws.map((w, j) => `<span class="w${w.ac ? " ac" : ""}" id="sub${k}w${j}">${w.ac ? `<b class="caja"></b>` : ""}<em>${w.w}</em></span>`).join(" ")}</p>`).join("\n");
const subsJS = subs.map((s, k) => {
  const ws = s.ws.map((w, j) => `tl.fromTo(q("#sub${k}w${j}"), { opacity: 0, y: 16, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out", immediateRender: true }, ${r2(Math.max(s.a, w.t - 0.04))});${w.ac ? `\n      tl.fromTo(q("#sub${k} .caja"), { opacity: 0, scaleX: 1.2, scaleY: 1.35 }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.16, ease: "power3.out", immediateRender: true }, ${r2(Math.max(s.a, w.t - 0.04))});` : ""}`).join("\n      ");
  return `tl.set(q("#sub${k}"), { autoAlpha: 1 }, ${s.a}); tl.set(q("#sub${k}"), { autoAlpha: 0 }, ${s.z});\n      ${ws}`;
}).join("\n      ");

// los sellos de la tarjeta del HUD (10)
const sellos = Array.from({ length: 10 }, (_, i) => `<i class="se" id="se${i}"></i>`).join("");
fs.mkdirSync("compositions", { recursive: true });
fs.writeFileSync("compositions/capa.html", `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    [data-composition-id="capa"] { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="capa"] .esc { position: absolute; inset: 0; }
    [data-composition-id="capa"] .sombra { position: absolute; left: 0; right: 0; top: 0; height: 560px; background: linear-gradient(rgba(11,18,32,0.55), rgba(11,18,32,0)); }
    /* HUD fila 1: rubro + día + mesa */
    [data-composition-id="capa"] .f1 { position: absolute; left: 0; right: 0; top: 92px; display: flex; justify-content: center; align-items: center; gap: 18px; }
    [data-composition-id="capa"] .rubro { display: inline-block; padding: 10px 20px 11px; border-radius: 14px; background: ${G}; color: ${NAVY}; font: 800 38px/1 "Lexend", sans-serif; letter-spacing: 0.06em; transform-origin: 50% 50%; box-shadow: 0 6px 0 rgba(3,6,12,0.45); }
    [data-composition-id="capa"] .cuando { font: 600 36px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; text-shadow: 0 3px 0 rgba(3,6,12,0.7), 0 0 14px rgba(3,6,12,0.8); }
    /* HUD fila 2 */
    [data-composition-id="capa"] .f2 { position: absolute; left: 0; right: 0; top: 160px; height: 84px; }
    [data-composition-id="capa"] .grupo { position: absolute; left: 0; right: 0; top: 0; display: flex; justify-content: center; gap: 16px; }
    [data-composition-id="capa"] .pill { display: flex; align-items: center; gap: 14px; height: 76px; padding: 0 26px; border-radius: 999px; font: 800 38px/1 "Lexend", sans-serif; letter-spacing: 0.02em; box-shadow: 0 6px 0 rgba(3,6,12,0.45); }
    [data-composition-id="capa"] .pill small { font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; }
    [data-composition-id="capa"] .crema { background: ${CR}; color: ${NAVY}; border: 5px solid ${NAVY}; }
    [data-composition-id="capa"] .roja { background: ${RED}; color: #fff; border: 5px solid ${NAVY}; }
    [data-composition-id="capa"] .navy { background: ${NAVY}; color: ${CR}; border: 5px solid ${G}; }
    [data-composition-id="capa"] .verde { background: ${G}; color: ${NAVY}; border: 5px solid ${NAVY}; }
    [data-composition-id="capa"] .se { display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 4px solid ${CR}; background: transparent; margin-left: -4px; }
    [data-composition-id="capa"] .se.on { background: ${G}; border-color: ${G}; }
    [data-composition-id="capa"] .num { display: inline-block; min-width: 1.2em; text-align: center; }
    /* subtítulos */
    [data-composition-id="capa"] .sub { position: absolute; left: 50px; right: 50px; top: 300px; text-align: center; font: 800 86px/1.18 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: 0 5px 0 rgba(3,6,12,0.8), 0 0 22px rgba(3,6,12,0.75), 0 0 6px rgba(3,6,12,0.9); visibility: hidden; }
    [data-composition-id="capa"] .sub .quien { display: block; margin: 0 auto 10px; width: max-content; padding: 8px 16px 9px; border-radius: 10px; background: ${CR}; color: ${NAVY}; font: 600 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; text-shadow: none; box-shadow: 0 5px 0 rgba(3,6,12,0.5); }
    [data-composition-id="capa"] .w { display: inline-block; position: relative; opacity: 0; }
    [data-composition-id="capa"] .w em { font-style: normal; position: relative; }
    [data-composition-id="capa"] .w.ac { margin: 0 12px; }
    [data-composition-id="capa"] .w.ac em { color: ${NAVY}; text-shadow: none; }
    [data-composition-id="capa"] .caja { position: absolute; left: -14px; right: -14px; top: 8px; bottom: 0; background: ${G}; border-radius: 12px; box-shadow: 0 6px 0 rgba(3,6,12,0.6); }
    /* rebobinar */
    [data-composition-id="capa"] .rew { position: absolute; left: 0; right: 0; top: 860px; text-align: center; opacity: 0; }
    [data-composition-id="capa"] .rew span { display: inline-flex; align-items: center; gap: 18px; padding: 18px 34px 20px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; color: ${CR}; font: 800 64px/1 "Lexend", sans-serif; box-shadow: 0 10px 0 rgba(3,6,12,0.5); }
    [data-composition-id="capa"] .rayas { position: absolute; inset: 0; opacity: 0; background: repeating-linear-gradient(0deg, rgba(239,238,229,0.16) 0 6px, rgba(0,0,0,0) 6px 46px); }
    [data-composition-id="capa"] .firma { position: absolute; left: 50%; top: 1790px; height: 36px; width: auto; margin-left: -85px; opacity: 0.8; }
  </style>
  <div id="root" data-composition-id="capa" data-width="1080" data-height="1920" data-duration="${capaDur}">
    <div id="capa-esc" class="esc clip" data-start="0" data-duration="${capaDur}" data-track-index="0">
      <div class="sombra"></div>
      <div class="rayas"></div>
      <div class="f1"><span class="rubro">PIZZERÍAS</span><span class="cuando">VIERNES · 21:30 · MESA 12</span></div>
      <div class="f2">
        <div class="grupo g1"><span class="pill crema visitas"><small>VISITAS</small><b class="num nv">90</b></span><span class="pill roja premios"><small>PREMIOS</small><b class="num">0</b></span></div>
        <div class="grupo g2" style="opacity:0"><span class="pill roja"><small>SIN VENIR</small><b class="num nd">1</b> <b class="dd">DÍA</b></span></div>
        <div class="grupo g3" style="opacity:0"><span class="pill navy tarjeta">${sellos}<b class="num nt" style="margin-left:6px">7/10</b></span><span class="pill crema premios2"><small>PREMIOS</small><b class="num np">0</b></span></div>
      </div>
${subsHTML}
      <div class="rew"><span><svg width="70" height="48" viewBox="0 0 70 48" aria-hidden="true"><path d="M34 4 L4 24 L34 44 Z M66 4 L36 24 L66 44 Z" fill="${CR}"/></svg>REBOBINEMOS</span></div>
      <img class="firma" src="assets/logo-blanco.png" alt="Scalerics" />
    </div>
  </div>
  <script>
    (function () {
      const ID = "capa";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      // cuadro 0: el rubro grande en el medio de arriba; sube al HUD
      const f1 = q(".f1"), rubro = q(".rubro"), cuando = q(".cuando");
      tl.fromTo(rubro, { scale: 2.3, y: 230, x: 322 }, { scale: 1, y: 0, x: 0, duration: 0.42, ease: "power3.inOut", immediateRender: true }, ${r2(T.rubro - 0.42)});
      tl.fromTo(cuando, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", immediateRender: true }, ${r2(T.rubro - 0.1)});
      tl.fromTo(q(".g1"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: true }, ${r2(T.rubro)});
      // "¿Primera vez?": el contador de visitas tiembla
      tl.to(q(".visitas"), { keyframes: { x: [0, -12, 12, -9, 9, -4, 0] }, duration: 0.42, ease: "none" }, ${T.primera});
      tl.fromTo(q(".visitas"), { scale: 1 }, { scale: 1.12, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ${r2(T.planoC + 0.2)});
      // "Me fui.": SIN VENIR cuenta los días
      tl.to(q(".g1"), { opacity: 0, y: -16, duration: 0.18, ease: "power2.in" }, ${r2(T.dias - 0.2)});
      tl.fromTo(q(".g2"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, ${T.dias});
      const cuenta = { n: 1 };
      const nd = q(".nd"), dd = q(".dd");
      tl.to(cuenta, { n: 21, duration: ${r2(T.rebobina - T.dias - 0.25)}, ease: "power1.in", onUpdate: () => { const n = Math.round(cuenta.n); nd.textContent = n; dd.textContent = n === 1 ? "DÍA" : "DÍAS"; } }, ${r2(T.dias + 0.1)});
      // rebobina: los días vuelven a 0 y el HUD pasa a la tarjeta de puntos
      tl.to(cuenta, { n: 1, duration: 0.5, ease: "power2.in", onUpdate: () => { const n = Math.round(cuenta.n); nd.textContent = n; dd.textContent = n === 1 ? "DÍA" : "DÍAS"; } }, ${T.rebobina});
      tl.fromTo(q(".rew"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.18, ease: "back.out(2.4)", immediateRender: false }, ${T.rebobina});
      tl.to(q(".rew"), { opacity: 0, scale: 1.1, duration: 0.16, ease: "power2.in" }, ${r2(T.planoG - 0.12)});
      tl.fromTo(q(".rayas"), { opacity: 0, backgroundPositionY: "0px" }, { opacity: 1, backgroundPositionY: "-460px", duration: ${r2(T.planoG - T.rebobina)}, ease: "none", immediateRender: false }, ${T.rebobina});
      tl.set(q(".rayas"), { opacity: 0 }, ${T.planoG});
      tl.to(q(".g2"), { opacity: 0, y: -16, duration: 0.16, ease: "power2.in" }, ${r2(T.rebobina + 0.4)});
      tl.fromTo(q(".g3"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.28, ease: "back.out(2)", immediateRender: false }, ${r2(T.rebobina + 0.5)});
      const se = qa(".se");
      se.forEach((s, i) => { if (i < 7) tl.set(s, { className: "se on" }, 0); });
      // "y sumo": el octavo sello
      tl.set(se[7], { className: "se on" }, ${T.scan});
      tl.fromTo(se[7], { scale: 2.2 }, { scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, ${T.scan});
      tl.set(q(".nt"), { textContent: "8/10" }, ${T.scan});
      tl.fromTo(q(".tarjeta"), { scale: 1 }, { scale: 1.1, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ${T.scan});
      // el regalo de cumpleaños: PREMIOS 1, en verde
      tl.set(q(".np"), { textContent: "1" }, ${T.regalo});
      tl.set(q(".premios2"), { className: "pill verde premios2" }, ${T.regalo});
      tl.fromTo(q(".premios2"), { scale: 1 }, { scale: 1.18, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ${T.regalo});
      // subtítulos
      ${subsJS}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);

// ---------- la tarjeta final ----------
{
  const D = r2(DUR - CIERRE);
  const pal = PAL.filter((p) => p.b === "n01");
  fs.writeFileSync("compositions/cierre.html", `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    [data-composition-id="cierre"] { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; }
    [data-composition-id="cierre"] .esc { position: absolute; inset: 0; background: ${NAVY}; }
    [data-composition-id="cierre"] .logo { position: absolute; left: 50%; top: 360px; height: 92px; width: auto; transform: translateX(-50%); }
    [data-composition-id="cierre"] .a { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font: 800 96px/1.1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; }
    [data-composition-id="cierre"] .pal { position: absolute; left: 0; right: 0; top: 770px; text-align: center; }
    [data-composition-id="cierre"] .pal span { display: inline-block; padding: 18px 46px 24px; border-radius: 30px; background: ${G}; color: ${NAVY}; font: 900 170px/1 "Lexend", sans-serif; letter-spacing: -0.02em; box-shadow: 0 14px 0 rgba(0,0,0,0.45); }
    [data-composition-id="cierre"] .b { position: absolute; left: 90px; right: 90px; top: 1060px; text-align: center; font: 700 62px/1.25 "Lexend", sans-serif; color: ${CR}; }
    [data-composition-id="cierre"] .web { position: absolute; left: 0; right: 0; top: 1400px; text-align: center; font: 800 76px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.01em; }
    [data-composition-id="cierre"] .linea { position: absolute; left: 340px; right: 340px; top: 1340px; height: 6px; border-radius: 3px; background: ${NAVY3}; }
  </style>
  <div id="root" data-composition-id="cierre" data-width="1080" data-height="1920" data-duration="${D}">
    <div id="cierre-esc" class="esc clip" data-start="0" data-duration="${D}" data-track-index="0">
      <img class="logo" src="assets/logo-blanco.png" alt="Scalerics" />
      <div class="a">Comentá</div>
      <div class="pal"><span>PUNTOS</span></div>
      <div class="b">y te mando cómo funciona para tu pizzería</div>
      <div class="linea"></div>
      <div class="web">scalerics.com</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "cierre";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(q(".esc"), { yPercent: 100 }, { yPercent: 0, duration: 0.3, ease: "power3.out", immediateRender: true }, 0); // sube como un telón navy (el iris arrancaba como un agujero negro en la cara)
      tl.fromTo(q(".logo"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: true }, 0.2);
      tl.fromTo(q(".a"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: true }, 0.06);
      tl.fromTo(q(".pal span"), { scale: 0.4, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.36, ease: "back.out(2.6)", immediateRender: true }, ${r2(pal[1].t - CIERRE - 0.05)});
      tl.fromTo(q(".b"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: true }, ${r2(pal[2].t - CIERRE)});
      tl.fromTo(q(".linea"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.5);
      tl.fromTo(q(".web"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: true }, 0.55);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin, ini, lp, rev }]
const P2 = T.rebobina;
const SONIDO = [
  // ambiente de pizzería (charla y cubiertos) y la música, más bajos en la parte 1 después de "Me fui"
  ["sfx/restaurante.mp3", 0, -2, { desde: 4, dur: r2(CIERRE + 0.3), ini: 0.05, fin: 0.4, lp: 5000 }],
  ["bgm/pizzicato.wav", 0, -9, { dur: r2(T.planoF + 0.3), fin: 0.35 }],
  ["bgm/pizzicato.wav", r2(T.planoG - 0.05), -9, { dur: 14, fin: 0.3 }],
  ["bgm/pizzicato.wav", r2(T.planoG + 13.95), -9, { dur: r2(CIERRE + 0.4 - T.planoG - 13.95), fin: 0.4 }],
  // ---- parte 1 ----
  ["sfx/whoosh-short.mp3", r2(T.planoA2 - 0.06), -19],
  ["sfx/paso-0.wav", r2(T.llegaD + 0.2), -8], ["sfx/paso-1.wav", r2(T.llegaD + 0.6), -8], ["sfx/paso-2.wav", r2(T.llegaD + 1.0), -8],
  ["sfx/whoosh-short.mp3", r2(T.planoC - 0.06), -19],
  ["sfx/perro.mp3", r2(T.perro + 0.02), -6, { desde: 0.7, dur: 1.4, ini: 0.05, fin: 0.3 }],
  ["sfx/whoosh-short.mp3", r2(T.planoE1 - 0.06), -19],
  ["sfx/calle.wav", r2(T.planoE1), -4, { dur: r2(T.planoF - T.planoE1 + 0.1), ini: 0.15, fin: 0.25, lp: 3000 }],
  ["sfx/whoosh.mp3", r2(T.planoE2 - 0.15), -17],
  ["sfx/pop.mp3", r2(T.planoE2 + 0.35), -14], ["sfx/pop.mp3", r2(T.puntosE), -14],
  ["sfx/k-cloth_1.wav", r2(T.planoF + 0.25), -2], ["sfx/k-cloth_2.wav", r2(T.planoF + 0.85), -2], ["sfx/k-cloth_1.wav", r2(T.planoF + 1.5), -3],
  ["sfx/key-press.mp3", r2(T.dias), -12],
  // ---- el rebobinado ----
  ["sfx/whoosh-cine-corto.mp3", r2(T.rebobina - 0.05), -9, { rev: true, desde: 0.6, dur: 0.7, fin: 0.12 }],
  ["sfx/tic-real.mp3", r2(T.rebobina + 0.1), -14], ["sfx/tic-real.mp3", r2(T.rebobina + 0.25), -14], ["sfx/tic-real.mp3", r2(T.rebobina + 0.4), -14],
  // ---- parte 2 ----
  ["sfx/pop.mp3", r2(T.planoG + 0.02), -9],
  ["sfx/scan.mp3", r2(T.scan - 0.3), -6],
  ["sfx/sparkle.mp3", r2(T.scan), -12, { dur: 1.2, fin: 0.4 }],
  ["sfx/pop.mp3", r2(T.scan + 0.02), -8],
  ["sfx/whoosh-short.mp3", r2(T.planoI - 0.06), -19],
  ["sfx/cero.mp3", r2(T.faltan + 0.05), -19],
  ["sfx/paso-3.wav", r2(T.planoJ1 + 0.1), -8], ["sfx/paso-0.wav", r2(T.planoJ1 + 0.45), -8],
  ["sfx/k-plato-001.wav", r2(T.plato), -9], ["sfx/whoosh-short.mp3", r2(T.planoJ1b - 0.05), -19],
  ["sfx/pop.mp3", r2(T.regalo), -10],
  ["sfx/campanita.wav", r2(T.regalo + 0.05), -12],
  ["sfx/fuego.mp3", r2(T.planoK), -4, { desde: 2, dur: r2(T.planoL - T.planoK + 0.1), ini: 0.1, fin: 0.2 }],
  ["sfx/click-soft.mp3", r2(T.panelFila), -2], ["sfx/click-soft.mp3", r2(T.panelCada), -2],
  ["sfx/whoosh-short.mp3", r2(T.planoL - 0.06), -19],
  ["sfx/whoosh-short.mp3", r2(T.cierre - 0.05), -10],
  ["sfx/pop.mp3", r2(PAL.find((p) => p.b === "n01" && p.i === 1).t), -8],
];
for (const [b] of ORDEN) SONIDO.push([`voice/${b}.wav`, L[b].a, b.startsWith("d") ? 1 : b === "n01" ? -1 : 0]);
fs.mkdirSync("assets/audio", { recursive: true });
{
  const cadena = (i, [f, ini, db, o = {}], pad) => {
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.rev) c += `,areverse`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.lp) c += `,lowpass=f=${o.lp}`;
    if (o.ini) c += `,afade=t=in:st=0:d=${o.ini}`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    c += `,volume=${db}dB,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)}${pad ? `,apad=whole_dur=${DUR}` : ""}[a${i}]`;
    return c;
  };
  const mezclar = (lista, salida) => {
    const args = ["-y", "-loglevel", "error"], f = [];
    lista.forEach((s, i) => { args.push("-i", `assets/${s[0]}`); f.push(cadena(i, s, true)); });
    f.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${DUR},afade=t=out:st=${r2(DUR - 0.3)}:d=0.3[m]`);
    args.push("-filter_complex", f.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", salida);
    execFileSync("ffmpeg", args);
  };
  // voz y resto por separado; el resto se agacha (sidechain) mientras hay voz, para que la voz quede 6 LU arriba
  mezclar(SONIDO.filter((x) => x[0].startsWith("voice/")), "assets/audio/stem-voz.wav");
  mezclar(SONIDO.filter((x) => !x[0].startsWith("voice/")), "assets/audio/stem-resto-crudo.wav");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/stem-resto-crudo.wav", "-i", "assets/audio/stem-voz.wav", "-filter_complex",
    "[1:a]asplit=2[k0][v];[k0]atrim=start=0.18,asetpts=PTS-STARTPTS,apad[k];[0:a][k]sidechaincompress=threshold=0.02:ratio=4:attack=5:release=300:makeup=1[r];[r]asplit=2[r1][r2];[r1]anull[resto];[v][r2]amix=inputs=2:normalize=0[m]",
    "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla-cruda.wav", "-map", "[resto]", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/stem-resto.wav"]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "loudnorm=I=-14:TP=-3:LRA=11,alimiter=limit=0.6:level=false", "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
const capa = LIMPIO ? "" : `      <div id="el-capa" class="scene plana" data-composition-id="capa" data-composition-src="compositions/capa.html" data-start="0" data-duration="${capaDur}" data-track-index="3" data-track-kind="graphics"></div>
      <div id="el-cierre" class="scene plana" data-composition-id="cierre" data-composition-src="compositions/cierre.html" data-start="${CIERRE}" data-duration="${r2(DUR - CIERRE)}" data-track-index="4" data-track-kind="graphics"></div>`;
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .plana { z-index: 5; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="2"><canvas id="tres" width="1080" height="1920"></canvas></div>
${capa}
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
      tl.to("#capa3d", { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${DUR} s; cierre ${CIERRE}`);
console.log(Object.entries(L).map(([b, v]) => `${b} ${v.a}-${v.z}`).join(" · "));
console.log(JSON.stringify(T));
