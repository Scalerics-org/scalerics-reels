// Genera todo importadora-dolar desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las voces
//     (bocas) y CORTE (el silencio interno de cada remate en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (IMPORTADORAS del cuadro 0, los chips de hora, el cartel "Un sistema más
//     tarde…", "Comentá PRECIOS" y la línea chica final); las burbujas y los rótulos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/dist-comisiones (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija; VER=portada: la cámara del fondo de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh):
//   s1 Seba "¡Pao! ¡Vendimos todo el contenedor!" (se reusa en Q1) · pa1 Paola "¡Vamos! ¿A cuánto?" (se reusa en Q2) ·
//   s2 Seba "A lista. Mil novecientos cincuenta." · mi1 Mica "Pao, llegó la factura del contenedor nuevo." (se reusa en Q4) ·
//   pa2 Paola "Vendimos todo. Y perdimos plata." · s3 Seba "¡Pao! ¡Graciela quiere doscientos más!" · pa3 Paola "Seba. Por
//   favor. Dejá de vender." · nar "Un sistema más tarde." · s4 Seba "Al de hoy. Dos mil quinientos treinta." · pa4 Paola "Ya
//   está cargada." · pa5 Paola "Vendimos todo. Y ganamos plata." · s5 Seba "¡Graciela quiere doscientos más! ¿Le hago un
//   diez?" · s6 Seba "Le hago un cinco." · pa6 Paola "Vendé, Seba. Vendé." · pa7 Paola "Comentá PRECIOS y te mando cómo
//   funciona para tu importadora."
const VOCES = ["s1", "pa1", "s2", "mi1", "pa2", "s3", "pa3", "s4", "pa4", "pa5", "s5", "s6", "pa6", "pa7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { pa7: JSON.parse(fs.readFileSync("assets/voice/palabras-pa7.json", "utf8")) };
const T = {};
const ALIAS = { s1b: "s1", pa1b: "pa1", mi1b: "mi1" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
// los silencios internos de una toma ([inicio, fin], de más largo a más corto): el que parte una línea en dos (la burbuja
// muestra la segunda mitad recién cuando suena)
function silencios(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fn = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const L = []; ini.forEach((a, i) => { const b = fn[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05) L.push([a, b]); });
  return L;
}
const corteVoz = (k, cual = "largo") => {
  const L = silencios(k);
  if (!L.length) return r2(LEN[k] * 0.45);
  const s = cual === "ultimo" ? L[L.length - 1] : cual === "primero" ? L[0] : L.reduce((m, x) => (x[1] - x[0] > m[1] - m[0] ? x : m));
  return r2(s[1] - 0.02);
};
const CORTE = { s2: corteVoz("s2"), pa2: corteVoz("pa2"), pa3a: corteVoz("pa3", "primero"), pa3: corteVoz("pa3", "ultimo"), pa5: corteVoz("pa5"), s5: corteVoz("s5"), pa6: corteVoz("pa6") };
// ---- parte 1 ----
// P1 · cuadro 0: el depósito de Casa Pao visto desde adentro hacia el portón abierto, el contenedor vacío en el patio; Seba
// entra con el celular en alto: "¡Pao! ¡Vendimos todo el contenedor!"
T.s1 = 0.06;
// P2 · Paola en la mesa de despacho, puño en alto: "¡Vamos! ¿A cuánto?"
T.p2 = r2(fin("s1") + 0.02); T.pa1 = r2(T.p2 + 0.02); T.puno = r2(T.p2 + 0.02);
// P3 · Seba en la columna señala la lista de JULIO (push-in): "A lista. Mil novecientos cincuenta." (la fila se resalta)
T.p3 = r2(fin("pa1") + 0.04); T.s2 = r2(T.p3 + 0.05); T.resalta = r2(T.s2 + CORTE.s2);
// P4 · Mica entra con la proforma: "Pao, llegó la factura del contenedor nuevo." · "USD 46 c/u" se marca
T.p4 = r2(fin("s2") + 0.05); T.mi1 = r2(T.p4 + 0.06); T.usd = r2(fin("mi1") - 0.25);
// P5 · el montaje sin voz (cámara continua): el pizarrón (borra el 40, escribe 43) → la calculadora (989.000) → el
// contenedor nuevo que se llena y deja 8 huecos (492 de 500)
T.p5 = r2(fin("mi1") + 0.06);
T.borra = r2(T.p5 + 0.08); T.escribe = r2(T.p5 + 0.38); T.escribeFin = r2(T.p5 + 0.72);
T.calc = r2(T.p5 + 0.8); T.teclas = [0.84, 0.9, 0.96, 1.02, 1.08].map((d) => r2(T.p5 + d)); T.igualC = r2(T.p5 + 1.12); T.cobramos = r2(T.p5 + 1.2);
T.viaja = r2(T.p5 + 2.42); T.llena = r2(T.p5 + 2.66); T.llenaFin = r2(T.p5 + 3.2); T.huecos = r2(T.p5 + 3.24); T.trae = r2(T.p5 + 3.32);
// P6 · el remate: plano medio de Paola, seca; el ventilador se frena solo; "Vendimos todo. Y perdimos plata." · − $ 14.000
T.p6 = r2(T.p5 + 3.76); T.frena = r2(T.p6 + 0.02); T.pa2 = r2(T.p6 + 0.36); T.menos = r2(T.pa2 + LEN.pa2 - 0.3);
// P7a · Seba otra vez en el portón, feliz, el celular en alto (Bazar Graciela: ¡Mandame 200 más!)
T.p7 = r2(fin("pa2") + 0.3); T.noti = r2(T.p7 + 0.02); T.s3 = r2(T.p7 + 0.08);
// P7b · el remate del remate: Paola de 3/4 de espaldas, mirando el contenedor; levanta la mano sin darse vuelta
T.p7b = r2(fin("s3") + 0.05); T.mano = r2(T.p7b + 0.28); T.pa3 = r2(T.p7b + 0.4);
const P1 = r2(fin("pa3") + 0.08);                               // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.08, LEN.nar + 0.02));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0 (la tablet en la columna, el pizarrón con el despacho): el mismo "¡Pao! ¡Vendimos todo el contenedor!"
T.q1 = P2; T.s1b = r2(P2 + 0.12);
// (r1) sin Q2: Q1 corta directo al celular de Seba ("Al de hoy.")
// Q3 · el celular de Seba a pantalla llena: "$ 2.530" con contador, "Precio de hoy ✓" · "Al de hoy. Dos mil quinientos treinta."
T.q3 = r2(fin("s1b") + 0.05); T.q2 = T.q3; T.cuenta = r2(T.q3 + 0.06); T.cuentaFin = r2(T.q3 + 0.56); T.hoy = r2(T.q3 + 0.58); T.s4 = r2(T.q3 + 0.2); T.rotQ3 = r2(T.q3 + 0.75);
// Q4 · el mismo plano de P4: Mica con la misma factura
T.q4 = r2(fin("s4") + 0.25); T.mi1b = r2(T.q4 + 0.08);
// Q4b · la tablet de Paola: "Ya está cargada." · el panel recalcula solo
T.q4b = r2(fin("mi1b") - 0.45); T.pa4 = r2(T.q4b + 0.12); T.cargada = r2(T.q4b + 0.08); T.filas = [0.5, 0.64, 0.78].map((d) => r2(T.q4b + d)); T.banda = r2(T.q4b + 0.95); T.rotQ4 = r2(T.q4b + 1.05);
// Q5 · el mismo contenedor de P5: entran las 500 · "500 de 500 ✓" · "+ $ 276.000" · "Vendimos todo. Y ganamos plata."
T.q5 = r2(T.q4b + 2.0); T.llena2 = r2(T.q5 + 0.05); T.llena2Fin = r2(T.q5 + 0.85); T.ok500 = r2(T.q5 + 0.9); T.mas = r2(T.q5 + 1.02); T.pa5 = r2(T.q5 + 0.35);
// Q6 · el mismo encuadre de P7a: "¡Graciela quiere doscientos más! ¿Le hago un diez?" · toca −10 %
T.q6 = r2(fin("pa5") + 0.16); T.noti2 = r2(T.q6 + 0.02); T.s5 = r2(T.q6 + 0.12); T.toca10 = r2(T.s5 + CORTE.s5 + 0.25);
// Q6b · el celular: −10 % · $ 2.277 · Debajo del margen mínimo → −5 % · $ 2.404 ✓ · "Le hago un cinco."
T.q6b = r2(fin("s5") + 0.05); T.rojo = r2(T.q6b + 0.08); T.baja5 = r2(T.q6b + 0.75); T.ok5 = r2(T.q6b + 0.92); T.s6 = r2(T.q6b + 0.76); T.rotQ6 = r2(T.q6b + 0.3);
// Q7 · el mismo plano de P7b: Paola levanta la mano, ahora sonriendo: "Vendé, Seba. Vendé."
T.q7 = r2(Math.max(fin("s6"), T.ok5 + 0.45) + 0.08); T.mano2 = r2(T.q7 + 0.1); T.pa6 = r2(T.q7 + 0.3);
// C · Paola a cámara: "Comentá PRECIOS y te mando cómo funciona para tu importadora." (≤ 3,5 s)
T.c = r2(fin("pa6") + 0.2); T.pa7 = r2(T.c + 0.05);
const iCom = PAL.pa7.findIndex((w) => /PRECIOS/i.test(w.word ?? w.w ?? w.text ?? ""));
T.palabra = r2(T.pa7 + Math.max(0.3, (PAL.pa7[iCom >= 0 ? iCom : 1].start ?? PAL.pa7[iCom >= 0 ? iCom : 1].a) - 0.05));
const DUR = Math.ceil((Math.ceil((T.pa7 + LEN.pa7 + 0.2) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.9));

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

// P1 · el rubro: "IMPORTADORAS" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema), entero
// desde el cuadro 0, y el chip "Lunes, 9:00." debajo; se van con el corte al plano de Paola
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 84px; padding: 24px 4px 30px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 104px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; }
    P .sel b { position: absolute; inset: -10px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 300px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>IMPORTADORAS</em></span></div></div>
      <div class="chip">Lunes, 9:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.p4, T.p5, "Lunes, 9:05.", ""],
  ["s02-chip", T.q1 + 0.02, T.q2, "Lunes, 9:00.", ""],
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
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.42)});   // se va con el iris (sin cuadros verdes vacíos)`,
  });
}

// C · "Comentá PRECIOS" + "y te mando cómo funciona para tu importadora", debajo de la cara de Paola
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 940px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 84px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 132px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 6px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 50px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>PRECIOS</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu importadora</div></div>`,
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
    P .caja { position: absolute; left: 50px; right: 50px; top: 1450px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; }
    P .b { margin-top: 8px; font: 800 58px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Tu lista de precios,</div><div class="a">atada al costo en dólares</div><div class="b">scalerics.com</div></div>`,
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
const esCama = (f) => f.startsWith("bgm/") || /calle|pajaro|ventilador\.wav/.test(f);
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
const papel = (t, techo = -40) => s("sfx/papel.wav", t, 0, { techo, dur: 0.45, fin: 0.12 });
const pasos = (a, b, techo = -44, cada = 0.3) => { for (let t = a, i = 0; t < b; t += cada, i++) s(`sfx/paso-${i % 5}.wav`, t, 0, { techo }); };
const fan = (a, b, techo = -46) => s("sfx/ventilador.wav", a, 0, { loop: true, desde: 1.0, dur: r2(b - a), fi: 0.08, fin: 0.1, techo, lp: 2400 });
// el patio de la mañana de verano: la calle lejos, pájaros
const patio = (a, b, techo = -44) => { s("sfx/calle.wav", a, 0, { loop: true, desde: 2.0, dur: r2(b - a), fi: 0.1, fin: 0.12, techo, lp: 2000 }); s("sfx/pajaro.wav", a + 0.3, 0, { dur: Math.min(4.4, r2(b - a - 0.3)), fi: 0.1, fin: 0.3, techo: techo - 3 }); };
// ---- parte 1 ----
patio(0, T.p5 + 0.02);
fan(0, T.p5 + 0.02);
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p5 + 0.02), fin: 0.05, techo: -38 });
pasos(0.0, T.p2 - 0.1, -42, 0.28);
voz("s1", T.s1, -1);
s("sfx/k-cloth_1.wav", T.puno, 0, { techo: -40 });
s("sfx/madera-golpe.wav", T.puno + 0.18, 0, { techo: -42 });
voz("pa1", T.pa1, -1);
voz("s2", T.s2, -1);
pop(T.resalta, -42); s("sfx/k-page-turn.wav", T.p3 + 0.05, 0, { techo: -46, dur: 0.4, fin: 0.1 });
papel(T.p4 + 0.05, -42);
voz("mi1", T.mi1, -1);
pop(T.usd, -37);
// P5 · el montaje: el marcador en el pizarrón, las teclas de la calculadora, las cajas (tono que sube), el golpe en los huecos
s("bgm/pizzicato-lleno.wav", T.p5 - 0.02, 0, { desde: 6.0, vel: 1.2, dur: r2(T.p6 - T.p5 + 0.04), fi: 0.05, fin: 0.06, techo: -44 });
s("sfx/bsb-marcador.wav", T.borra, 0, { dur: 0.28, fin: 0.06, techo: -44 });
s("sfx/bsb-marcador.wav", T.escribe, 0, { desde: 1.2, dur: 0.36, fin: 0.06, techo: -45 });
T.teclas.forEach((t) => s("sfx/key-press.mp3", t, 0, { techo: -48 }));
ding(T.igualC, -42);
whoosh(T.viaja, -47);
for (let k = 0; k < 6; k++) pop(T.llena + k * 0.1, -47 + k * 0.5);
s("sfx/k-chapa-pesada.wav", T.huecos, 0, { techo: -41, dur: 0.6, fin: 0.2 });
// P6 · el ventilador que se frena; la música baja
patio(T.p6, P1 + 0.02, -46);
// (r1) el ventilador se apaga: el clic en T.frena y la bajada de velocidad (tramos de la grabación real con asetrate decreciente,
// ventilador-baja.wav); 0,3 s solos antes de "Vendimos todo."
s("sfx/ventilador.wav", T.p6 - 0.02, 0, { desde: 1.0, dur: r2(T.frena - T.p6 + 0.06), fi: 0.02, fin: 0.04, techo: -44, lp: 2400 });
s("sfx/interruptor.wav", T.frena, 0, { techo: -38 });
s("sfx/ventilador-baja.wav", T.frena + 0.02, 0, { techo: -42, lp: 2400 });
s("bgm/pizzicato-lleno.wav", T.p6, 0, { desde: 9.0, dur: r2(T.pa2 + 0.2 - T.p6), fi: 0.05, fin: 0.3, techo: -44 });
voz("pa2", T.pa2, -1);
s("sfx/glitch-1.mp3", T.menos, 0, { techo: -38, vel: 0.8, dur: 0.3, fin: 0.08 });
// P7 · la notificación, Seba otra vez; el stinger va con el cartel
noti(T.noti, -42);
pasos(T.p7 - 0.05, T.p7 + 0.8, -44, 0.26);
voz("s3", T.s3, -1);
s("sfx/k-cloth_2.wav", T.mano, 0, { techo: -42 });
voz("pa3", T.pa3, -1);
// (r1) la música vuelve alegre con Seba en P7a y se corta seca en "Dejá de vender."
s("bgm/pizzicato-lleno.wav", T.p7 - 0.05, 0, { desde: 1.0, dur: r2(T.pa3 + CORTE.pa3 - T.p7 + 0.05), fi: 0.15, fin: 0.03, techo: -38 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.06, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.06 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.95, 1.3]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.pa6 + CORTE.pa6 - P2 + 0.1), fi: 0.4, fin: 0.1, techo: -37 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -38 });
patio(P2, DUR, -45);
fan(P2, DUR, -47);
pasos(P2, T.q2 - 0.1, -42, 0.28);
voz("s1", T.s1b, -1);
// Q3 · el celular de Seba: el contador, el ding al llegar
whoosh(T.q3 - 0.05, -44);
for (let k = 0; k < 5; k++) tic(T.cuenta + k * 0.1, -48);
ding(T.hoy, -43);
voz("s4", T.s4, -1);
// Q4 · la misma factura
papel(T.q4 + 0.05, -42);
voz("mi1", T.mi1b, -1);
// Q4b · el panel: toque, un tic por fila, ding en la banda
toque(T.cargada, -42);
voz("pa4", T.pa4, -1);
T.filas.forEach((t) => tic(t, -44));
ding(T.banda, -42);
// Q5 · el contenedor lleno: pops (tono que sube), ding en "500 de 500 ✓"
whoosh(T.q5 - 0.05, -48);
for (let k = 0; k < 6; k++) pop(T.llena2 + k * 0.14, -50 + k * 0.6);
ding(T.ok500, -41);
voz("pa5", T.pa5, -1);
ding(T.pa5 + CORTE.pa5 + 0.05, -38); s("sfx/cero.mp3", T.pa5 + CORTE.pa5 + 0.05, 0, { vel: 0.6, techo: -39 });   // (r1) acento grave en "Y ganamos plata."
// Q6 · la notificación, el toque en −10 %
noti(T.noti2, -42);
voz("s5", T.s5, -1);
toque(T.toca10, -42);
// Q6b · el aviso rojo (glitch corto), el pulgar a −5 %, ding en ✓
s("sfx/glitch-1.mp3", T.rojo, 0, { techo: -36, vel: 0.7, dur: 0.3, fin: 0.06 });   // (r1) error corto y grave
toque(T.baja5, -42);
ding(T.ok5, -41);
voz("s6", T.s6, -1);
// Q7 · la mano; la música vuelve arriba
s("sfx/k-cloth_2.wav", T.mano2, 0, { techo: -42 });
voz("pa6", T.pa6, -1);
// (r1) "Vendé." final: ding grave y la música vuelve arriba hasta el cierre
s("sfx/cero.mp3", T.pa6 + CORTE.pa6 + 0.04, 0, { vel: 0.6, techo: -38 });
s("bgm/pizzicato-lleno.wav", T.pa6 + CORTE.pa6, 0, { desde: 4.0, dur: r2(T.c - T.pa6 - CORTE.pa6 + 0.05), fi: 0.05, fin: 0.1, techo: -36, sinDuck: true });
// C · Paola a cámara: whoosh, pop en PRECIOS, la línea chica
whoosh(T.c - 0.08, -44);
voz("pa7", T.pa7, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// (r1) pop suave en la entrada de cada burbuja (y de la segunda mitad de los remates)
for (const t of [T.pa1, T.s2, T.s2 + CORTE.s2, T.mi1, T.pa2, T.pa2 + CORTE.pa2, T.s3, T.pa3, T.pa3 + CORTE.pa3a, T.pa3 + CORTE.pa3, T.s1b, T.s4, T.mi1b, T.pa4, T.pa5, T.pa5 + CORTE.pa5, T.s5, T.s5 + CORTE.s5, T.s6, T.pa6, T.pa6 + CORTE.pa6]) pop(t - 0.04, -41);
// duck de la cama (~-7 dB) en los huecos sin voz donde mandan los efectos de interfaz
const HUECOS = [[T.p5, T.p6], [T.q3 - 0.05, T.s4], [T.q5, T.pa5]];
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.2]), ...HUECOS.filter(([a, b]) => b > x[1] && a < x[1] + x[3].dur).map(([a, b]) => [a, b, 0.2])]; }

// (r1) la cama más arriba (CAMA) y, en los tramos SIN voz, más abajo (k = HUECO_K): se oye bajo la voz y los huecos quedan
// ≤ -31 LUFS con los efectos de interfaz adelante
const HUECO_K = Number(process.env.HUECO_K ?? 0.7);
{
  const V = VOZ.slice().sort((a, b) => a[0] - b[0]); const libres = []; let c = 0;
  for (const [a0, b0] of V) { const a = a0 + 0.2, b = b0 - 0.25; if (a > c + 0.25) libres.push([c, a]); c = Math.max(c, b); } if (DUR > c + 0.25) libres.push([c, DUR]);
  for (const x of S) if (esCama(x[0]) && !x[3].sinDuck) x[3].duck = [...(x[3].duck || []), ...libres.filter(([a, b]) => b > x[1] && a < x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a - 0.05, b + 0.05, HUECO_K, 0.12])];
}
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
// (r1) CAMA: la música, el patio y el ventilador suben CAMA dB sobre su techo (se oyen bajo la voz); los huecos sin voz se
// verifican con medir-sfx.py (≤ -31)
const CAMA = Number(process.env.CAMA ?? 11);
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, Math.min(o.techo ?? TECHO, TECHO) - 6 - L.M, (o.pico ?? PICO) - L.pk) + (esCama(f) ? CAMA : 0)); };
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
    if (o.voz) c += (o.suave ?? true) ? ",acompressor=threshold=-24dB:ratio=2:attack=8:release=150:makeup=2.5" : ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k, rr = 0.4] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/${rr},0,1)*clip((${b}-t)/${rr},0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`anullsrc=r=48000:cl=stereo,atrim=duration=${dur}[z]`);   // (r1) ancla: amix sin entrada en t = 0 daba silencio
  filtros.push(`[z]${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length + 1}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=1.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
    if (process.env.STEMS) { mezcla(S.filter((x) => !x[3].voz && esCama(x[0])), "assets/audio/stem-cama.wav", DUR); mezcla(S.filter((x) => !x[3].voz && !esCama(x[0])), "assets/audio/stem-sfx.wav", DUR); }
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
const ROT = r2(P1), IRIS = r2(P2 - 0.4);
const IRIS_C = "660px 1000px";   // (r1) el iris abre sobre Seba que entra   // el iris abre desde el piso del depósito, no desde una cara
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
      <div id="precarga">Importadoras</div><div id="precarga2">Dólar</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el piso del depósito
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.38, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
