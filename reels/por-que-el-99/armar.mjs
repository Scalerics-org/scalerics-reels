// Arma index.html, compositions/subtitulos.html y tiempos.md desde reel.json y la locución.
// Versión corta de netflix-blockbuster (03-11, ~30 s; reel.json acepta sinSub) (copiada de caso-dominos; capa 3D real con Three.js en assets/tres.js debajo de las escenas HTML): subtítulos arriba al centro, de 1 a 3
// palabras, Lexend 700 grande, y la palabra clave dentro de un recuadro verde de selección.
// por-que-el-99 (base por-que-sacar-numero): fondo NAVY3 #1f3254 LISO (compresión de Instagram; el piso 3D es una
// planilla gigante del mismo navy), subtítulos Lexend 800 CREMA con borde navy #0b1220 de 14 px, recuadro verde con
// texto navy (rojo apagado para el problema), logo crema en píldora navy; en el cierre (s13) el fondo pasa a verde #5ce611.
//
// reel.json:
//   escenas:  [["s01-algo", 0], ...]   id y ÍNDICE de la palabra donde arranca
//   cortes:   "auto" (grupos de 1 a 3 palabras cortando en puntuación) o la lista de índices
//   subDesde / subHasta: primera palabra con subtítulo y primera sin (el gancho y el CTA ya
//             tienen texto grande en la escena)
//   acento:   palabras con recuadro verde · malo: con recuadro rojo apagado
import fs from "node:fs";
import { execSync } from "node:child_process";
const largo = {};
const durArchivo = (n) => (largo[n] ??= Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/sfx/${n}.mp3`).toString()));
// techo por efecto: cada SFX queda con su sonoridad MOMENTÁNEA máxima (ventana de 0,4 s) en TECHO LUFS como mucho, medida
// sobre el tramo que de verdad suena (desde el silencio inicial hasta su max), así nunca tapa la voz (que anda en -15)
const TECHO = -31;
// ronda 2 de revisión: los efectos se oían poco; todos suben hasta el techo (VOLX) y se sacó la baja x0,6 sobre palabras
const VOLX = 2.8; // por-que-las-tarjetas ronda 1: 4 → 2,8 (SFX que pisaban arranques de palabras)
const lufs = {};
const lufsArchivo = (n, desde = 0, dur = 99) => {
  const kk = `${n}|${desde}|${dur}`;
  if (lufs[kk] === undefined) {
    const txt = execSync(`ffmpeg -hide_banner -ss ${desde} -t ${dur} -i assets/sfx/${n}.mp3 -af "apad=pad_dur=0.4,ebur128=metadata=1,ametadata=print:key=lavfi.r128.M" -f null - 2>&1`).toString();
    const ms = [...txt.matchAll(/lavfi.r128.M=(-?[\d.]+)/g)].map((m) => Number(m[1])).filter((x) => isFinite(x));
    lufs[kk] = ms.length ? Math.max(...ms) : -30;
  }
  return lufs[kk];
};
// silencio inicial de cada SFX: se adelanta el cue para que el sonido arranque en el tiempo pedido
const lead = {};
// ronda 2: papel.mp3 y ping.mp3 arrancan con ~0,3 s de ruido de fondo (no es silencio digital): se fija a mano
const LEAD_FIJO = { papel: 0.32, ping: 0.31 };
const leadArchivo = (n) => {
  if (LEAD_FIJO[n] !== undefined) return LEAD_FIJO[n];
  if (lead[n] === undefined) {
    const txt = execSync(`ffmpeg -hide_banner -i assets/sfx/${n}.mp3 -af silencedetect=n=-45dB:d=0.02 -f null - 2>&1`).toString();
    const m = txt.match(/silence_start: (-?[\d.]+)[\s\S]*?silence_end: ([\d.]+)/);
    lead[n] = m && Number(m[1]) <= 0.01 ? Math.min(0.6, Number(m[2])) : 0;
  }
  return lead[n];
};
// colas largas: estos SFX se cortan (con max) aunque la escena no lo pida
const MAXDEF = { pop: 0.35, "glitch-1": 0.6, "impact-bass-1": 0.8, "impact-bass-2": 0.9, riser: 1.2 };
const conTecho = (n, v, desde, dur) => Math.round(Math.min(v, Math.pow(10, (TECHO - lufsArchivo(n, desde, dur)) / 20)) * 1000) / 1000;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const r2 = (n) => Math.round(n * 100) / 100;

const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const palabras = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, palabras.at(-1).end) + 0.12);

const inicio = (i) => (i === 0 ? 0 : r2(palabras[i].start));
const TODAS = reel.escenas.map(([id, i], k) => [id, inicio(i), k + 1 < reel.escenas.length ? inicio(reel.escenas[k + 1][1]) : DUR]);
export const ESCENAS = TODAS.filter(([id]) => fs.existsSync(`compositions/${id}.html`));
fs.writeFileSync(
  "assets/tiempos3d.js",
  `// lo genera armar.mjs\nexport const DUR = ${DUR};\nexport const E = ${JSON.stringify(Object.fromEntries(TODAS.map(([id, a]) => [id, a])))};\nexport const W = ${JSON.stringify(palabras.map((w) => r2(w.start)))};\n`,
);
const ACENTO = new Set(reel.acento);
const MALO = new Set(reel.malo ?? []);
const DESDE = reel.subDesde ?? 0;
const HASTA = reel.subHasta ?? palabras.length;

// grupos automáticos: hasta 3 palabras, o 2 si ya son largas; cortan después de puntuación
let CORTES = reel.cortes;
if (CORTES === "auto") {
  CORTES = [];
  let n = 0, chars = 0;
  // sinSub: [[desde, hasta), ...] frases que ya tienen texto grande en la escena
  const SIN = reel.sinSub ?? [];
  const fuera = (i) => SIN.some(([a, b]) => i >= a && i < b);
  for (let i = DESDE; i < HASTA; i++) {
    if (fuera(i)) { n = 0; chars = 0; continue; }
    if (n === 0) CORTES.push(i);
    n++; chars += palabras[i].text.length + 1;
    const sig = palabras[i + 1]?.text ?? "";
    if (/[.,?!:]$/.test(palabras[i].text) || n === 3 || (n === 2 && chars + sig.length > 17)) { n = 0; chars = 0; }
  }
}

fs.writeFileSync(
  "tiempos.md",
  TODAS.map(([id, a, b]) =>
    `### ${id} — dura ${(b - a).toFixed(2)} s (inicio global ${a.toFixed(2)})\nPalabras (segundos relativos a la escena): ` +
    palabras.filter((w) => w.start >= a - 0.01 && w.start < b).map((w) => `${w.text} ${(w.start - a).toFixed(2)}`).join(" · "),
  ).join("\n\n") + `\n\nDuración total ${DUR} (la voz termina en ${VOZ}).\n`,
);

// ---------- subtítulos ----------
let grupos = "";
let anim = "";
// texto de pantalla distinto del dicho (comillas en los avisos, sin la coma de "trabajo,")
const TEXTO = reel.texto ?? {};
const SINS = reel.sinSub ?? [];
CORTES.forEach((desde, g) => {
  let hasta = g + 1 < CORTES.length ? CORTES[g + 1] : HASTA;
  for (const [a, b] of SINS) if (a > desde && a < hasta) hasta = a;
  const ws = palabras.slice(desde, hasta);
  // si el grupo arranca justo en un corte de escena, entra con el corte (ni antes ni después)
  const enCorte = (i) => reel.escenas.some(([, k]) => k === i);
  const ini = enCorte(desde) ? r2(palabras[desde].start) : r2(Math.max(0, ws[0].start - 0.08));
  const proximo = g + 1 < CORTES.length && CORTES[g + 1] === hasta ? palabras[CORTES[g + 1]].start - (enCorte(CORTES[g + 1]) ? 0 : 0.08) : Math.min(DUR, hasta === HASTA && reel.subFin ? DUR : ws.at(-1).end + 0.35, hasta < palabras.length && SINS.some(([x]) => x === hasta) ? palabras[hasta].start : DUR);
  const fin = r2(Math.min(proximo, DUR, hasta === HASTA && HASTA < palabras.length ? palabras[reel.subFin ?? HASTA].start : DUR));
  const id = `sub-g${String(g + 1).padStart(2, "0")}`;
  const spans = ws
    .map((w, k) => {
      const i = desde + k;
      const cls = ACENTO.has(i) ? " ac" : MALO.has(i) ? " ac malo" : "";
      const caja = cls ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : "";
      return `<span class="w${cls}" data-t="${r2(w.start - ini)}">${caja}<em>${esc(TEXTO[i] ?? w.text)}</em></span>`;
    })
    .join(" ");
  const largoTxt = ws.map((w, k) => TEXTO[desde + k] ?? w.text).join(" ").length;
  const claro = "";
  grupos += `    <div id="${id}" class="grupo clip" data-start="${ini}" data-duration="${r2(fin - ini)}" data-track-index="0"><p${claro}${largoTxt > 22 ? ' style="font-size: 64px"' : largoTxt > 17 ? ' style="font-size: 74px"' : ""}>${spans}</p></div>\n`;
  anim += `      ["${id}", ${ini}, ${r2(fin - ini)}],\n`;
});

const C = '[data-composition-id="subtitulos"]';
const subtitulos = `<template>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; pointer-events: none; }
    ${C} .grupo { position: absolute; left: 50px; top: 200px; width: 980px; height: 260px; display: flex; align-items: center; justify-content: center; }
    ${C} p { margin: 0; padding: 4px 30px 12px; -webkit-text-stroke: 14px #0b1220; paint-order: stroke fill; max-width: 960px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 86px; line-height: 1.22; letter-spacing: -0.015em; color: #efeee5; }
    ${C} .w.ac em { color: #0b1220; -webkit-text-stroke: 0; }
    ${C} .w { display: inline-block; position: relative; opacity: 0; }
    ${C} .w em { font-style: normal; position: relative; }
    ${C} .w.ac { margin: 0; } ${C} p.claro { background: rgba(11,18,32,0.78); border-radius: 26px; }
    ${C} .caja { position: absolute; left: -12px; right: -12px; top: 8px; bottom: 0px; border-radius: 16px; background: #5ce611; border: 5px solid #0b1220; opacity: 0; }
    ${C} .caja i { display: none; }
    ${C} .malo .caja { border-color: #0b1220; background: #c7655b; }
    ${C} .caja i { position: absolute; width: 18px; height: 18px; background: #ffffff; border: 4px solid #5ce611; }
    ${C} .malo .caja i { border-color: #c7655b; }
    ${C} .caja .c1 { left: -12px; top: -12px; } ${C} .caja .c2 { right: -12px; top: -12px; }
    ${C} .caja .c3 { left: -12px; bottom: -12px; } ${C} .caja .c4 { right: -12px; bottom: -12px; }
  </style>
  <div id="root" data-composition-id="subtitulos" data-width="1080" data-height="1920" data-duration="${DUR}">
${grupos}  </div>
  <script>
    (function () {
      const ID = "subtitulos";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const tl = gsap.timeline({ paused: true });
      const GRUPOS = [
${anim}      ];
      for (const [id, ini, dur] of GRUPOS) {
        const el = root.querySelector("#" + id);
        tl.fromTo(el.querySelector("p"), { scale: 0.94, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, ini);
        for (const w of el.querySelectorAll(".w")) {
          const t = ini + Number(w.dataset.t);
          tl.set(w, { opacity: 1 }, ini); tl.fromTo(w, { y: 10 }, { y: 0, duration: 0.12, ease: "power2.out", immediateRender: false }, ini);
          const caja = w.querySelector(".caja");
          if (caja) tl.fromTo(caja, { opacity: 0.5, scaleX: 1.2, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.12, ease: "power3.out", immediateRender: false }, t + 0.02);
        }
      }
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/subtitulos.html", subtitulos);

// ---------- fondo: estrellitas deterministas ----------
let semilla = 7;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
let estrellas = "";
for (let i = 0; i < 0; i++) {
  const x = Math.round(azar() * 1080), y = Math.round(azar() * 1920);
  const r = r2(1.6 + azar() * 1.8), o = r2(0.18 + azar() * 0.22);
  estrellas += `<circle class="estr" cx="${x}" cy="${y}" r="${r}" fill="#efeee5" opacity="${o}" />`;
}

// en el "¿Por qué?" la cama baja más (bisagra)
// en la pausa de "Más caro… y vendió más" la cama baja (no se corta)
const P1 = palabras[49].end, P2 = palabras[50].start;
const DUCK = [r2(P1 - 0.05), r2(P2 + 0.05)];
// la cama (bed.mp3) tiene un golpe propio cerca de los 21 s: ahí baja también (en por-que-la-toalla quedaba antes de s09)
const DUCK2 = [20.54, 21.39];
// música recortada a la duración del reel, con fundido de 0,35 s al final
// la cama baja sola mientras habla la voz (sidechain): más presente en los silencios, nunca encima de la voz
execSync(`ffmpeg -y -hide_banner -loglevel error -i assets/bgm/bed.mp3 -i assets/voice/locucion.wav -filter_complex "[0:a]atrim=0:${DUR},aresample=48000,aformat=channel_layouts=stereo[b];[1:a]atrim=start=0.2,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur=${DUR}[v];[b][v]sidechaincompress=threshold=0.03:ratio=8:attack=10:release=700:makeup=1.4[d];[d]volume='(1-0.7*min(max((t-${DUCK[0]})/0.2,0),1)*min(max((${DUCK[1]}-t)/0.2,0),1))*(1-0.6*min(max((t-${DUCK2[0]})/0.15,0),1)*min(max((${DUCK2[1]}-t)/0.15,0),1))':eval=frame,afade=t=out:st=${r2(DUR - 0.35)}:d=0.35[o]" -map "[o]" assets/bgm/bed-corte.mp3`);
const hosts = ESCENAS.map(
  ([id, a, b], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${r2(b - a)}" data-track-index="${2 + (i % 2)}" data-track-kind="graphics"></div>`,
).join("\n");

const sfx = [];
for (const [id, a] of ESCENAS) {
  const f = `compositions/${id}.sfx.json`;
  if (!fs.existsSync(f)) continue;
  for (const s of JSON.parse(fs.readFileSync(f, "utf8"))) sfx.push({ t: r2(a + s.t), name: s.sfx, vol: s.vol ?? 0.3, max: s.max, full: s.full });
}
// whoosh automático en cada cambio de escena, salvo que la escena ya traiga uno (whoosh y whoosh-short son el mismo archivo)
for (const [id, a] of ESCENAS.slice(1)) {
  const f = `compositions/${id}.sfx.json`;
  const propio = fs.existsSync(f) && JSON.parse(fs.readFileSync(f, "utf8")).some((s) => /^whoosh/.test(s.sfx) && s.t <= 0.3 && s.t >= -0.6);
  if (!propio) sfx.push({ t: r2(a - 0.15), name: "whoosh-short", vol: 0.03 }); // ronda 2: debajo del techo (antes quedaba topado)
}
for (const s of sfx) { const l = leadArchivo(s.name); s.cut = l; s.t = r2(s.t - l); if (s.t < 0) s.t = 0; s.max = s.max ?? MAXDEF[s.name]; }
sfx.sort((x, y) => x.t - y.t);
const sfxTags = sfx
  .map((s, i) => {
    // duración: la pedida, sin pasar el final del archivo ni el final del reel; si se corta antes del final, fundido de salida
    const full = durArchivo(s.name), d = r2(Math.min((s.max ?? 99) + (s.cut ?? 0), full, DUR - 0.02 - s.t) - 0.01);
    const largo = /^(impact|whoosh|glitch|sparkle|chime|riser|motor)/.test(s.name);
    const fade = d < full - 0.03 ? ` data-fade-out="${r2(largo ? Math.min(0.35, d * 0.4) : Math.min(0.08, d * 0.2))}"` : "";
    return `      <audio id="sfx-${String(i).padStart(2, "0")}" src="assets/sfx/${s.name}.mp3" data-start="${s.t}" data-duration="${d}"${fade} data-track-index="${40 + (i % 24)}" data-volume="${Math.round(conTecho(s.name, Math.min(1, s.vol * VOLX), 0, d) * 1000) / 1000}"></audio>`;
  })
  .join("\n");

// LIMPIO=1 node armar.mjs: solo la capa 3D (sin escenas HTML, subtítulos, logo ni audio), para el fondo de la portada
const LIMPIO = process.env.LIMPIO === "1";
const FONDO_LIMPIO = process.env.FONDO || "#1f3254";
const index = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; top: 0; font: 700 40px "Caveat"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${LIMPIO ? FONDO_LIMPIO : "#1f3254"}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${LIMPIO ? FONDO_LIMPIO : "#1f3254"}; }
      #fondo { position: absolute; inset: 0; background: ${LIMPIO ? FONDO_LIMPIO : "#1f3254"}; }
      #estrellas { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #pie { position: absolute; left: 0; top: 1712px; width: 1080px; height: 208px; background: #0b1220; }
      #velo { position: absolute; left: 0; top: 0; width: 1080px; height: 640px; background: linear-gradient(180deg, rgba(239,238,229,0.88) 0%, rgba(239,238,229,0.7) 50%, rgba(239,238,229,0) 100%); }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene, #el-subtitulos { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1752px; height: 40px; width: auto; transform: translateX(-50%); z-index: 50; box-sizing: content-box; padding: 8px 20px; border-radius: 999px; background: #0b1220; border: 4px solid #efeee5; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"><svg id="estrellas" viewBox="0 0 1080 1920" aria-hidden="true">${estrellas}</svg></div>
      <div id="precarga" aria-hidden="true">Rubén 999 US$</div>
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${LIMPIO ? "" : hosts}
${LIMPIO ? "" : `      <div id="el-subtitulos" data-composition-id="subtitulos" data-composition-src="compositions/subtitulos.html" data-start="0" data-duration="${DUR}" data-track-index="5" data-track-kind="captions"></div>
      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="${TODAS[1][1]}" data-duration="${r2(DUR - TODAS[1][1])}" data-track-index="9" />
      <audio id="voz" src="assets/voice/locucion.wav" data-start="0" data-duration="${VOZ}" data-track-index="30" data-volume="1"></audio>
${fs.existsSync("assets/bgm/bed.mp3") ? `      <audio id="bgm" src="assets/bgm/bed-corte.mp3" data-start="0" data-duration="${Math.min(DUR, 63.9)}" data-track-index="31" data-volume="0.2"></audio>\n` : ""}${sfxTags}`}
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
      document.querySelectorAll("#estrellas .estr").forEach((s, i) => {
        tl.to(s, { opacity: 0.08, duration: 1.4 + (i % 5) * 0.3, ease: "sine.inOut", yoyo: true, repeat: Math.ceil(${DUR} / 2.6) }, (i % 7) * 0.4);
      });
      tl.to("#fondo", { opacity: 1, duration: ${DUR} }, 0);
      // cierre: el fondo pasa a verde de marca (el texto de la tarjeta es navy)
      tl.set("#fondo", { backgroundColor: "#1f3254" }, 0); tl.set("#fondo", { backgroundColor: "#5ce611" }, ${TODAS.find(([id]) => id === "s13-cierre")[1]});
      // FIRMA_OCULTA (de gen.mjs, assets/firma.json): tramos sin logo (primeros planos de celulares)
      ${(fs.existsSync("assets/firma.json") ? JSON.parse(fs.readFileSync("assets/firma.json", "utf8")) : []).map(([a, b]) => `tl.set("#firma", { opacity: 0 }, ${a}); tl.set("#firma", { opacity: 1 }, ${b});`).join(" ")}
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", index);
console.log(`index: ${ESCENAS.length} escenas, ${sfx.length} efectos; subtítulos: ${CORTES.length} grupos`);
console.log(CORTES.map((c, g) => palabras.slice(c, Math.min(g + 1 < CORTES.length ? CORTES[g + 1] : HASTA, ...SINS.map(([a]) => (a > c ? a : 1e9)))).map((w) => w.text).join(" ")).join(" | "));
