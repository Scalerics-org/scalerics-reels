// Genera todo dist-comisiones desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las voces
//     (bocas) y CORTE (el silencio interno de cada remate en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (DISTRIBUIDORAS del cuadro 0, los chips de día y hora, el cartel "Un
//     sistema más tarde…", "Comentá COMISIONES" y la línea chica final); las burbujas y los rótulos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/dist-cartera (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija; VER=portada: la cámara del fondo de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh):
//   n1 Nico "Jefe, ¿cuánto me toca?" (se reusa en Q1) · r1 Rubén "Fácil. Tres por ciento de lo cobrado." · r2 Rubén "Nico:
//   cuarenta y dos mil." · n2 Nico "¿Cuarenta y dos? Súper Héctor es mío." · j1 Javi "¡Héctor es mío!" · r3 Rubén
//   "Felicitaciones. Entre los dos vendieron más que la empresa." · g1 Graciela "Rubén, te devuelvo seis cajas." (se reusa
//   en Q4) · r4 Rubén "Te toca menos. Pasá el jueves." · nar "Un sistema más tarde." · r5 Rubén "Mirá el celular." · n3
//   Nico "Cuarenta y dos mil. ¿Ya?" · j2 Javi "¿Y Súper Héctor?" · n4 Nico "…Es de Javi." · r6 Rubén "Felicitaciones.
//   Ahora la cuenta da." · r7 Rubén "Te toca menos." · n5 Nico "Ya sé. Me llegó." · r8 Rubén "Comentá COMISIONES y te
//   mando cómo funciona para tu distribuidora."
const VOCES = ["n1", "r1", "r2", "n2", "j1", "r3", "g1", "r4", "r5", "n3", "j2", "n4", "r6", "r7", "n5", "r8"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { r8: JSON.parse(fs.readFileSync("assets/voice/palabras-r8.json", "utf8")) };
const T = {};
const ALIAS = { n1b: "n1", g2: "g1" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
// el punto que parte una línea en dos (la burbuja muestra la segunda mitad recién cuando suena): el final del silencio
// interno más largo de la toma
function corteVoz(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fn = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  let mejor = null; ini.forEach((a, i) => { const b = fn[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05 && (!mejor || b - a > mejor[1] - mejor[0])) mejor = [a, b]; });
  return mejor ? r2(mejor[1] - 0.02) : r2(LEN[k] * 0.4);
}
const CORTE = Object.fromEntries(["r1", "n2", "r3", "r4", "n3", "r6", "n5"].map((k) => [k, corteVoz(k)]));
// ---- parte 1 ----
// P1 · cuadro 0: la oficina vidriada, día 1, 8:00. Nico asomado a la puerta: "Jefe, ¿cuánto me toca?"
// (r1) todo más justo: total ≤ 44 s, solución ≥ 50 %
T.n1 = 0.12;
// P2 · Rubén, sin levantar la vista, se arremanga: "Fácil. Tres por ciento de lo cobrado."
T.p2 = r2(fin("n1") + 0.08); T.r1 = r2(T.p2 + 0.1); T.arremanga = r2(T.p2 + 0.04);
// P3 · el montaje sin voz (2,0 s): la planilla (13:00, con los dos rótulos legibles) · la escalera de noche (22:00) · el
// calendario cae 1 → 2 · el escritorio (día 2, 19:00)
T.p3 = r2(fin("r1") + 0.08);
T.col = [0.08, 0.2, 0.32, 0.44].map((d) => r2(T.p3 + d)); T.rotRem = r2(T.p3 + 0.12); T.rotWal = r2(T.p3 + 0.32);
T.p3b = r2(T.p3 + 0.8); T.p3c = r2(T.p3b + 0.36); T.cae2 = r2(T.p3c + 0.04); T.p3d = r2(T.p3c + 0.36);
// P4 · Rubén con ojeras golpea Enter: "Nico: cuarenta y dos mil."
T.p4 = r2(T.p3d + 0.3); T.enter = r2(T.p4 + 0.08); T.r2 = r2(T.p4 + 0.22);
// P5 · Nico en la puerta levanta su celular (su cuenta: $ 60.000): "¿Cuarenta y dos? Súper Héctor es mío."
T.p5 = r2(fin("r2") + 0.08); T.n2 = r2(T.p5 + 0.06); T.cel60 = r2(T.p5 + 0.03);
// P5b · Javi se mete por detrás (pisa el final de Nico), el celular en alto ($ 39.000): "¡Héctor es mío!"
T.p5b = r2(fin("n2") - 0.06); T.j1 = r2(T.p5b + 0.04);
// P6 · el remate: las dos pilas enteras en cuadro con Rubén y los dos en la puerta; caen las cajas; pausa;
// "Felicitaciones. Entre los dos vendieron más que la empresa."
T.p6 = r2(fin("j1") + 0.06); T.cajas = [0.05, 0.15, 0.25, 0.35, 0.45].map((d) => r2(T.p6 + d)); T.pasa = r2(T.p6 + 0.5); T.r3 = r2(T.p6 + 0.74);
// P7 · el remate del remate: el celular de Rubén vibra (altavoz): "Rubén, te devuelvo seis cajas." (la cola ya sobre
// P7b) · pausa · Recalculando… · 42.000 → 41.802 · el calendario cae 2 → 3 · "Te toca menos. Pasá el jueves."
T.p7 = r2(fin("r3") + 0.06); T.vibra = r2(T.p7 + 0.02); T.g1 = r2(T.p7 + 0.08);
T.p7b = r2(fin("g1") - 0.35); T.recalc = r2(fin("g1") - 0.05); T.cae3 = r2(fin("g1") + 0.1); T.baja = r2(fin("g1") + 0.2); T.r4 = r2(fin("g1") + 0.22);
const P1 = r2(fin("r4") + 0.1);                               // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.15, LEN.nar + 0.05));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0 (el panel en el monitor, el termo lleno): el mismo "Jefe, ¿cuánto me toca?"
T.q1 = P2; T.n1b = r2(P2 + 0.15);
// Q1b · el mismo plano de Rubén, con el mate: "Mirá el celular." (señala con la bombilla)
T.q1b = r2(fin("n1b") + 0.08); T.r5 = r2(T.q1b + 0.08);
// Q2 · el celular de Nico a pantalla llena: "Tu comisión · $ 42.000 ✓" · "Cuarenta y dos mil. ¿Ya?"
T.q2 = r2(fin("r5") + 0.06); T.vibraN = r2(T.q2 + 0.04); T.cuenta = r2(T.q2 + 0.1); T.cuentaFin = r2(T.q2 + 0.65); T.n3 = r2(T.q2 + 0.75);
// Q3 · Javi se asoma (= P5b): "¿Y Súper Héctor?"
T.q3 = r2(fin("n3") + 0.3); T.j2 = r2(T.q3 + 0.06);
// Q3m · el monitor: Rubén toca el pedido 0388 · "Cargó: Javi ✓" · "…Es de Javi."
T.q3m = r2(fin("j2") + 0.04); T.toca = r2(T.q3m + 0.15); T.pedido = r2(T.q3m + 0.28); T.n4 = r2(T.q3m + 1.1);
// Q3b · las mismas pilas de P6: la caja roja de Nico sale de costado, la pila baja y da justo · "= ✓" · "Felicitaciones.
// Ahora la cuenta da."
T.q3b = r2(fin("n4") + 0.08); T.vuela = r2(T.q3b + 0.08); T.asienta = r2(T.q3b + 0.62); T.igual = r2(T.q3b + 0.74); T.r6 = r2(T.q3b + 1.45);
// Q4 · la misma llamada de Graciela (= P7) · el panel descuenta solo · "Te toca menos." · Nico: "Ya sé. Me llegó."
T.q4 = r2(fin("r6") + 0.1); T.vibra2 = r2(T.q4 + 0.02); T.g2 = r2(T.q4 + 0.08);
T.q4b = r2(fin("g2") - 0.35); T.devol = r2(fin("g2") - 0.2); T.baja2 = r2(fin("g2")); T.r7 = r2(fin("g2") + 0.64);
T.q4n = r2(fin("r7") + 0.1); T.notiN = r2(T.q4n - 0.02); T.n5 = r2(fin("r7") + 0.55);
// C · Rubén a cámara: "Comentá COMISIONES y te mando cómo funciona para tu distribuidora." (≤ 3 s, 0,25 s de aire)
T.c = r2(fin("n5") + 0.25); T.r8 = r2(T.c);
const iCom = PAL.r8.findIndex((w) => /COMISIONES/i.test(w.word ?? w.w ?? w.text ?? ""));
T.palabra = r2(T.r8 + Math.max(0.3, (PAL.r8[iCom >= 0 ? iCom : 1].start ?? PAL.r8[iCom >= 0 ? iCom : 1].a) - 0.05));
const DUR = Math.ceil((Math.ceil((T.r8 + LEN.r8 + 0.2) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.7, DUR - 1.2));

// ---------- envolventes de las voces a 30 cuadros por segundo (para mover la boca) ----------
function envolvente(archivo) {
  const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", archivo, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
  const env = [];
  for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
    let s = 0, c = 0;
    for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
    env.push(Math.sqrt(s / Math.max(1, c)));
  }
  const mx = Math.max(...env);
  return env.map((v) => { const k = v / mx; return r2(k < 0.1 ? 0 : Math.pow(k, 0.8)); });
}
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const CORTE = ${JSON.stringify(CORTE)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";
const BASE = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
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
fs.mkdirSync("compositions", { recursive: true });
for (const f of fs.readdirSync("compositions")) if (f.endsWith(".html")) fs.unlinkSync(`compositions/${f}`);
const ESC = [];     // [id, inicio, duración, capa]  capa: "arriba" (sobre el canvas) o "abajo" (el cartel)

const CHIP = `
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }
    P .chip.rojo { color: ${RED}; border-color: ${RED}; }`;

// P1 · el rubro: "DISTRIBUIDORAS" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema), entero
// desde el cuadro 0, y el chip "Día 1 del mes, 8:00." debajo; se van con el corte al plano de Rubén
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 84px; padding: 24px 4px 30px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 98px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; }
    P .sel b { position: absolute; inset: -10px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 300px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>DISTRIBUIDORAS</em></span></div></div>
      <div class="chip">Día 1 del mes, 8:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de día y hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.p3, T.p3b, "Día 1, 13:00.", ""],
  ["s02-chip", T.p3b, T.p3c, "Día 1, 22:00.", ""],
  ["s03-chip", T.p3c, T.p5, "Día 2, 19:00.", ""],
  ["s04-chip", T.cae3 + 0.12, P1, "Día 3. Comisiones: sin pagar.", "rojo"],
  ["s05-chip", T.q1 + 0.02, T.q1b, "Día 1 del mes, 8:00.", ""],
];
for (const [id, ini0, fin0, txt, cls] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin0 - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip ${cls}">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}

// el cartel "Un sistema más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas. No dice
// "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = 0.95;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 700px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 136px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.c { font-size: 136px; margin-top: 18px; }
    P .l { display: inline-block; position: relative; color: ${CR}; -webkit-text-stroke: 16px ${NAVY}; paint-order: stroke fill; text-shadow: 0 16px 0 ${NAVY}, 10px 16px 0 ${NAVY}; }
    P .esp { display: inline-block; width: 0.32em; }`,
    html: `      <div class="fondo"></div>
      <svg class="manchas" viewBox="0 0 1480 2320" aria-hidden="true">
        <g class="giraA" style="transform-origin: 740px 1160px">
          <path d="M260 300 C 420 150, 640 260, 600 430 C 570 590, 330 640, 230 520 C 130 410, 140 380, 260 300 Z" fill="#3fa60a"/>
          <path d="M1080 420 C 1280 330, 1420 520, 1320 660 C 1220 800, 1000 760, 960 620 C 930 520, 980 470, 1080 420 Z" fill="${CR}" opacity="0.9"/>
          <path d="M180 1500 C 330 1380, 560 1460, 540 1640 C 520 1800, 300 1840, 200 1730 C 110 1630, 90 1570, 180 1500 Z" fill="${CR}" opacity="0.9"/>
          <path d="M1000 1680 C 1180 1580, 1380 1700, 1330 1880 C 1280 2050, 1040 2070, 960 1940 C 900 1840, 900 1740, 1000 1680 Z" fill="#3fa60a"/>
          <path d="M620 2040 C 760 1980, 880 2060, 850 2160 C 820 2260, 660 2270, 610 2190 C 570 2130, 560 2070, 620 2040 Z" fill="#16243d" opacity="0.85"/>
          <path d="M700 120 C 820 70, 920 140, 890 230 C 860 320, 720 320, 680 250 C 650 200, 640 150, 700 120 Z" fill="#16243d" opacity="0.85"/>
        </g>
        <g class="burbujas">
          <circle class="bu" cx="240" cy="1500" r="34" fill="none" stroke="${CR}" stroke-width="10"/>
          <circle class="bu" cx="1270" cy="1560" r="26" fill="none" stroke="${CR}" stroke-width="9"/>
          <circle class="bu" cx="330" cy="1620" r="18" fill="none" stroke="${NAVY}" stroke-width="8"/>
          <circle class="bu" cx="1290" cy="1400" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
          <circle class="bu" cx="500" cy="1960" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
          <circle class="bu" cx="560" cy="560" r="30" fill="none" stroke="${CR}" stroke-width="9"/>
        </g>
      </svg>
      <div class="texto" data-layout-allow-overlap data-layout-allow-overflow>
        ${lin("a", ["Un", "sistema"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nA = qa(".linea.a .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nA ? i * 0.03 : ${MAS} + (i - nA) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});   // se va antes del iris`,
  });
}

// C · "Comentá COMISIONES" + "y te mando cómo funciona para tu distribuidora", debajo de la cara de Rubén
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1080px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 84px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 116px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 6px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 50px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>COMISIONES</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu distribuidora</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.32);`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1590px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; }
    P .b { margin-top: 8px; font: 800 58px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Comisiones solas: por vendedor,</div><div class="a">con cada venta cobrada</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto ANTES de la ganancia final (~+7 dB): en el final, ningún efecto ni la cama pasan -31 LUFS.
const TECHO = -38;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const vibra = (t, techo = -40) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.6, fin: 0.12 });
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -39) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -41) => s("sfx/k-tick-1.wav", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const caja = (t, techo = -40) => s("sfx/k-book_place_1.wav", t, 0, { techo });
const hoja = (t, techo = -40) => s("sfx/k-page-turn.wav", t, 0, { techo, dur: 0.4, fin: 0.1 });
const tono = (o) => s("sfx/zumbido.wav", o.a, 0, { loop: true, dur: r2(o.b - o.a), fi: 0.05, fin: 0.12, techo: -47, lp: 900 });
// ---- parte 1 ----
tono({ a: 0, b: T.p3 + 0.02 });
s("sfx/elevador.wav", 0, 0, { dur: r2(T.p3), fi: 0.05, fin: 0.12, techo: -46, lp: 1200 });   // el autoelevador lejano del depósito
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p3 + 0.02), fin: 0.05, techo: -38 });
s("sfx/k-metal-click.wav", 0.08, 0, { techo: -42 });                 // el golpecito en el vidrio
voz("n1", T.n1, -1);
s("sfx/k-cloth_1.wav", T.arremanga, 0, { techo: -40 });
voz("r1", T.r1, -1);
// P3 · el montaje: la música acelera; tics por columna; la calculadora en ráfagas; el ronquido; la hoja que cae
s("bgm/pizzicato-lleno.wav", T.p3 - 0.02, 0, { desde: 6.0, vel: 1.25, dur: r2(T.p4 - T.p3 + 0.04), fi: 0.05, fin: 0.06, techo: -44 });
T.col.forEach((t) => tic(t, -46));
s("sfx/bsb-calculadora.wav", T.p3 + 0.05, 0, { dur: 0.8, fin: 0.1, techo: -49 });
s("sfx/bsb-ronquido.wav", T.p3b + 0.02, 0, { dur: 0.5, fin: 0.12, techo: -42 });
hoja(T.cae2, -43);
s("sfx/bsb-calc-impresora.wav", T.p3d, 0, { dur: 0.55, fin: 0.12, techo: -44 });
// P4 · el Enter y el número
tono({ a: T.p4, b: T.p6 + 0.05 });
s("sfx/key-press.mp3", T.enter, 0, { techo: -36 });
ding(T.enter + 0.08, -40);
voz("r2", T.r2, -1);
// P5 / P5b · los celulares
pop(T.cel60, -40);
voz("n2", T.n2, -1);
s("sfx/k-cloth_2.wav", T.p5b, 0, { techo: -40 });
voz("j1", T.j1, 0, { suave: true });   // (r1) la cadena fuerte partía "Héc|tor"
// P6 · la pausa; las cajas que caen (tono que sube)
s("bgm/pizzicato-lleno.wav", T.p4 - 0.02, 0, { desde: 9.0, loop: true, dur: r2(T.p7 - T.p4 + 0.04), fi: 0.2, fin: 0.06, techo: -42 });
T.cajas.forEach((t, i) => { caja(t + 0.08, -46); pop(t, -48 + i * 0.5); });
voz("r3", T.r3, -1);
// P7 · el celular vibra en el escritorio; Graciela por altavoz; Recalculando… (glitch); la hoja; el stinger va con el cartel
tono({ a: T.p7, b: P1 + 0.02 });
vibra(T.vibra, -38);
voz("g1", T.g1, -1);
s("sfx/glitch-1.mp3", T.recalc, 0, { techo: -42, dur: 0.35, fin: 0.1 });
hoja(T.cae3, -40);
tic(T.baja, -40);
voz("r4", T.r4, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.95, 1.3]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.c - P2), fi: 0.4, fin: 0.3, techo: -37 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -38 });
tono({ a: P2, b: DUR });
s("sfx/elevador.wav", P2, 0, { desde: 2, dur: r2(T.q2 - P2), fi: 0.1, fin: 0.12, techo: -46, lp: 1200 });
voz("n1", T.n1b, -1);
s("sfx/sorbo.wav", T.q1b, 0, { techo: -40, dur: 0.3, fin: 0.1 });
voz("r5", T.r5, -1);
// Q2 · el celular de Nico: vibra, el contador, el ding al llegar
whoosh(T.q2 - 0.05, -44);
noti(T.vibraN + 0.05, -44);
for (let k = 0; k < 5; k++) tic(T.cuenta + k * 0.12, -45);
ding(T.cuentaFin, -39);
voz("n3", T.n3, -1);
// Q3 · Javi
s("sfx/k-cloth_2.wav", T.q3, 0, { techo: -40 });
voz("j2", T.j2, -1);
// Q3m · el toque en el pedido y el ding de "Cargó: Javi ✓"
whoosh(T.q3m - 0.04, -44);
toque(T.toca, -42); ding(T.pedido + 0.05, -43);
voz("n4", T.n4, -1);
// Q3b · la caja roja sale volando (whoosh), la pila asienta (golpe de caja), "= ✓"
s("sfx/whoosh.mp3", T.vuela, 0, { techo: -46 });
caja(T.asienta, -45);
ding(T.igual, -42);
voz("r6", T.r6, -1);
// Q4 · la misma llamada; el panel descuenta (tic), la notificación en el celular de Nico
vibra(T.vibra2, -38);
voz("g1", T.g2, -1);
toque(T.devol, -40); for (let k = 0; k < 3; k++) tic(T.baja2 + k * 0.1, -42);
voz("r7", T.r7, 0, { suave: true });   // (r1) ídem "te toca menos"
noti(T.notiN, -39);
voz("n5", T.n5, -1);
// C · Rubén a cámara: whoosh, pop en COMISIONES, la línea chica
whoosh(T.c - 0.08, -44);
voz("r8", T.r8, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// duck de la cama (~-7 dB) en los huecos sin voz donde mandan los efectos de interfaz
const HUECOS = [[T.p6 - 0.05, T.r3], [T.q2 - 0.05, T.n3], [T.q3m, T.n4], [T.q3b, T.r6]];
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.6]), ...HUECOS.filter(([a, b]) => b > x[1] && a < x[1] + x[3].dur).map(([a, b]) => [a, b, 0.5])]; }

// SFX: el archivo que no existe en assets falla acá, no en el render
for (const x of S) if (!fs.existsSync(`assets/${x[0]}`)) throw new Error(`falta assets/${x[0]}`);

for (const x of S) { const o = x[3]; if (o.fin && !o.dur) o.dur = r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/${x[0]}`).toString()) / (o.vel ?? 1) - (o.desde ?? 0)); }
const filtroVel = (o) => (o.vel && o.vel !== 1 ? `asetrate=${Math.round(48000 * o.vel)},aresample=48000,` : "");
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}@${o.lp ?? 0}@${o.hp ?? 0}@${o.vel ?? 1}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const lp = (o.lp ? `lowpass=f=${o.lp},` : "") + (o.hp ? `highpass=f=${o.hp},` : "");
    const txt = execSync(`ffmpeg -hide_banner -nostats ${o.loop ? "-stream_loop 2 " : ""}-i assets/${f} -af "aresample=48000,${filtroVel(o)}${corte}${lp}aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128=peak=true" -f null - 2>&1`).toString();
    const ms = [...txt.matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => Number(m[1])).filter((v) => v > -69);
    const pk = [...txt.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1);
    lufs[k] = { M: ms.length ? Math.max(...ms) : -30, pk: pk ? Number(pk[1]) : -20 };
  }
  return lufs[k];
}
const PICO = Number(process.env.PICO ?? -19);
// el bus suma +6 dB antes de la ganancia: el techo se cumple DESPUÉS del bus (por eso -6)
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, Math.min(o.techo ?? TECHO, TECHO) - 6 - L.M, (o.pico ?? PICO) - L.pk)); };
function mezcla(lista, salida, dur) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    if (o.loop) args.push("-stream_loop", "-1");
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,${filtroVel(o)}aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.lp) c += `,lowpass=f=${o.lp}`;
    if (o.hp) c += `,highpass=f=${o.hp}`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.fi) c += `,afade=t=in:st=0:d=${o.fi}`;
    if (o.voz) c += o.suave ? ",acompressor=threshold=-24dB:ratio=2:attack=8:release=150:makeup=2.5" : ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/0.4,0,1)*clip((${b}-t)/0.4,0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=2.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => Number([...execSync(`ffmpeg -hide_banner -i ${f} -af ebur128 -f null - 2>&1`).toString().matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  let gan = r2(OBJ - medirI("assets/audio/mezcla-bus.wav"));
  let usada = gan;
  for (let k = 0; k < 3; k++) {
    usada = gan;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-bus.wav", "-af", `volume=${gan}dB,alimiter=limit=0.675:attack=1:release=50:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    const I = medirI("assets/audio/mezcla.wav");
    if (Math.abs(OBJ - I) <= 0.2) break;
    gan = r2(gan + (OBJ - I));
  }
  fs.writeFileSync("assets/audio/ganancia.txt", String(usada));   // medir.py le suma los +6 del bus
  fs.unlinkSync("assets/audio/mezcla-bus.wav"); fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 20 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 1100px";   // el iris se abre desde el centro de la oficina (Q1)
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
      #precarga2 { position: absolute; left: -9999px; font: 700 40px "Caveat"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #fondo { position: absolute; inset: 0; background: #0b1220; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Comisiones</div><div id="precarga2">Día 1</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
      <audio id="mezcla" src="assets/audio/mezcla.wav" data-start="0" data-duration="${DUR}" data-track-index="40" data-volume="1"></audio>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde la oficina
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
