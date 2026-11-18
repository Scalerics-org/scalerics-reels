// Genera todo contable-papeles desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (ESTUDIOS CONTABLES del cuadro 0, los chips de hora y de día, el
//     cartel "Una automatización más tarde…", "Comentá PAPELES" y la línea chica final); las burbujas de diálogo, los
//     audios y los rótulos son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/inmobiliaria-visitas (línea "ANTES QUE TODO", formato completo): parte 1 (0 a P1), el cartel (P1 a
// P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): m1 Marcelo (audio) "Adri, las facturas te las mando
// mañana sin falta." (se reusa igual en Q3) · a1 Adriana "Marcelo. Vence hoy." · m2 Marcelo "Acá está todo, Adri.
// Ordenadito." · a2 Adriana "¿Y esta?" · m3 Marcelo "Esa es la más importante." · m4 Marcelo "Si querés, te mando una
// foto." · nar "Una automatización más tarde." · m5 Marcelo "Listo. Ordenadito." · a3 Adriana "Marcelo, las mandaste el
// día tres." · m6 Marcelo (audio) "¿Yo? Qué ordenadito." · so Sofi "Comentá PAPELES y te mando cómo funciona para tu
// estudio."
const VOCES = ["m1", "m1b", "a1", "m2", "a2", "m3", "m4", "m5", "a3", "m6", "so"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { so: JSON.parse(fs.readFileSync("assets/voice/palabras-so.json", "utf8")) };
const palabra = (k, i) => r2(PAL[k][i].start ?? PAL[k][i].a);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el estudio de noche; del celular de Adriana, el audio de Marcelo (la tarjeta del audio ya en el cuadro 0)
T.m1 = 0.15;
// P2 · Adriana levanta el celular y graba "Marcelo. Vence hoy."
T.p2 = r2(T.m1 + LEN.m1 + 0.02); T.a1 = r2(T.p2 + 0.15); T.envia = r2(T.a1 + LEN.a1 + 0.04);
// P3 · la escalada sin voz: dos fotos en el chat (19:40 el pulgar, 20:30 la factura doblada y "¿esto sirve?"), Lucas
// cuelga un ticket en el piolín (la tira de la sumadora llega al piso), los sobres se abultan 33 → 41
T.p3 = r2(T.envia + 0.12); T.foto1 = r2(T.p3 + 0.14); T.foto2 = r2(T.p3 + 0.58); T.sirve = r2(T.foto2 + 0.28);
T.p3b = r2(T.p3 + 0.98); T.cuelga = r2(T.p3b + 0.3);
T.p3c = r2(T.p3b + 0.7); T.sob0 = r2(T.p3c + 0.05); T.sob1 = r2(T.p3c + 0.62);
// P4 · 22:10, golpean (Marcelo afuera), se abre la puerta y entra con la caja de zapatos: "Acá está todo, Adri.
// Ordenadito." · vuelca la caja
T.p4 = r2(T.p3c + 0.72); T.golpe = r2(T.p4 + 0.04); T.abre = r2(T.p4 + 0.32); T.m2 = r2(T.abre + 0.3);
T.vuelca = r2(T.m2 + LEN.m2 + 0.22);
// P5 · el remate: Adriana saca un ticket de la pila y lo levanta: "¿Y este?" · contraplano de Marcelo
T.p5 = r2(T.vuelca + 0.68); T.saca = r2(T.p5 + 0.05); T.a2 = r2(T.p5 + 0.45);
T.p5c = r2(T.a2 + LEN.a2 + 0.24); T.m3 = r2(T.p5c + 0.12);
// P6 · la pausa: rótulos (1,4 s)
T.p6 = r2(T.m3 + LEN.m3 + 0.12); T.rot = [0.08, 0.36, 0.64, 0.9].map((d) => r2(T.p6 + d));
// P7 · Marcelo en la puerta: "Si querés, te mando una foto." · se va y cierra · vibra el celular: la foto en blanco ·
// Adriana cierra los ojos
T.p7 = r2(T.p6 + 1.28); T.m4 = r2(T.p7 + 0.04); T.sale = r2(T.m4 + LEN.m4 - 0.05); T.cierra = r2(T.sale + 0.62);
T.vib = r2(T.cierra + 0.06); T.p7c = r2(T.vib + 0.52);
const P1 = r2(T.p7c + 0.48);                               // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.12));
// ---- parte 2 ----
// Q1 · Día 1, 9:00, la panadería: vibra el celular de Marcelo, el WhatsApp del estudio con su link · Día 3: el
// repartidor deja la harina; Marcelo saca las fotos de octubre de una vez: "Subido ✓" · "Listo. Ordenadito."
T.q1 = P2; T.vibraM = r2(P2 + 0.08); T.q1i = r2(P2 + 0.35);
T.q1d3 = r2(T.q1i + 1.18); T.bolsa = r2(T.q1d3 + 0.3); T.cam = r2(T.q1d3 + 0.85); T.click = r2(T.cam + 0.4); T.subido = r2(T.click + 0.12);
T.q1w = r2(T.subido + 0.5); T.m5 = r2(T.q1w + 0.05);
// Q2 · el estudio de tarde: el panel (0 → 38 de 60, Día 5: recordatorio a 22, 38 → 52) y la carpeta de Marcelo (más
// tiempo en la carpeta)
T.q2 = r2(T.m5 + LEN.m5 + 0.1); T.q2i = r2(T.q2 + 0.45); T.cnt1 = r2(T.q2i + 0.06); T.dia5 = r2(T.q2i + 0.6); T.cnt2 = r2(T.dia5 + 0.12);
// (r2) Día 8: 52 → 60 de 60 (el último día ya está todo)
T.dia8 = r2(T.dia5 + 0.55); T.cnt3 = r2(T.dia8 + 0.08);
T.clickM = r2(T.dia8 + 0.6);
// Q3 · el encuadre del cuadro 0: el mismo audio, que Adriana corta en "mañana…" · primer plano: "Marcelo, las mandaste
// el día tres." · pausa mirándola · el celular: "¿Ah, sí? Ni me di cuenta."
T.q3 = r2(T.clickM + 1.5); T.m1b = r2(T.q3 + 0.12); T.a3 = r2(T.m1b + LEN.m1b - 0.02); T.q3a = r2(T.a3 - 0.08);
T.m6 = r2(T.a3 + LEN.a3 + 0.45); T.q3m = r2(T.m6 - 0.14);
// Q4 · 18:05: el panel en 60 de 60 · Adriana tira de la cadenita: la lámpara se apaga
T.q4 = r2(T.m6 + LEN.m6 + 0.15); T.q4b = r2(T.q4 + 0.7); T.cadena = r2(T.q4b + 0.4);
// Q5 · el cierre: Sofi en el celular parado
T.q5 = r2(T.cadena + 0.35); T.so = r2(T.q5 + 0.08);
T.palabra = r2(T.so - 0.02);
const DUR = Math.ceil((Math.ceil((T.so + LEN.so + 0.12) * 30) / 30) * 1e4) / 1e4;   // (r2) cierre ≤ 3 s
T.cierre = r2(Math.max(T.palabra + 0.5, DUR - 2.05));

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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611";
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
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }`;

// P1 · el rubro: "ESTUDIOS CONTABLES" enorme arriba (crema en caja navy con borde crema, en el recuadro verde), entero
// desde el cuadro 0, y el chip "Último día · 18:00" debajo; se van cuando Adriana levanta el celular
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 + 0.02);   // (r1) se va antes de la burbuja de Adriana
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 92px; padding: 22px 4px 30px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 118px/1.12 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .tx + .tx { margin-top: 18px; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; margin-top: 6px; }
    P .sel b { position: absolute; inset: -12px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 440px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>ESTUDIOS</em></span></div><div class="tx"><span class="sel"><b></b><em>CONTABLES</em></span></div></div>
      <div class="chip">Último día · 18:00</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { x: -760, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}
// los chips de hora y de día (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.foto1 - 0.02, T.foto2 - 0.02, "19:40"],
  ["s02-chip", T.foto2 - 0.02, T.p3b - 0.02, "20:30"],
  ["s03-chip", T.p4 - 0.02, T.p5 - 0.02, "22:10"],
  ["s04-chip", T.q1 + 0.02, T.q1d3 - 0.02, "Día 1 · 9:00"],
  ["s05-chip", T.q1d3 - 0.02, T.q1w - 0.02, "Día 3"],
  ["s06-chip", T.cnt1 - 0.06, T.dia5 - 0.02, "Día 3"],
  ["s07-chip", T.dia5 - 0.02, T.dia8 - 0.02, "Día 5"],
  ["s07b-chip", T.dia8 - 0.02, T.clickM - 0.02, "Día 8"],
  ["s08-chip", T.q3 - 0.0, T.a3 - 0.02, "Último día · 18:00"],
  ["s09-chip", T.q4 - 0.0, T.q5 - 0.02, "18:05"],
];
for (const [id, ini0, fin, txt] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);   // (r2) sin fundido: entra y sale entero`,
  });
}

// el cartel "Una automatización más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  const MAS = 0.85;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 130px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 112px; margin-top: 12px; }
    P .linea.c { font-size: 146px; margin-top: 18px; }
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
        ${lin("a", ["Una"])}
        ${lin("b", ["automatización"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.03 : ${MAS} + (i - nAB) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});   // se va antes del iris`,
  });
}

// Q5 · "Comentá PAPELES" + "y te mando cómo funciona para tu estudio", debajo de Sofi
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1150px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>PAPELES</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu estudio</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(palabra("so", 1) + 0.02)});`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1575px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Pedido de comprobantes automático,</div><div class="a">cliente por cliente</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);   // (r2) entra en su lugar
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, pan = 0) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, pan }); VOZ.push([r2(t - 1.0), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -40) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 });
const tuc = (t, techo = -38) => s("sfx/k-pep.wav", t, 0, { techo, dur: 0.25, fin: 0.08 });   // el "tuc" del audio de chat
const reloj = (a, b, techo = -46) => { for (let k = 0; k < Math.floor((b - a) / 0.5); k++) s("sfx/tic-real.mp3", a + 0.1 + k * 0.5, 0, { techo, dur: 0.15, fin: 0.04 }); };
// ---- parte 1 ----
// ambiente: el estudio de noche (zumbido bajo, la calle lejana, el reloj de pared) y la música
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 700 });
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 900 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p6 - 0.1, T.p7 + 0.2, 0.75], [T.vib - 0.1, P1, 0.6]] });
// P1 · el audio de Marcelo (el filtro está en la toma)
tuc(T.m1 - 0.08); voz("m1", T.m1, -1);
// P2 · Adriana levanta el celular y graba; audio enviado
s("sfx/k-cloth_1.wav", T.p2 - 0.02, 0, { techo: -42, dur: 0.3, fin: 0.1 });
toque(T.a1 - 0.12, -40);
voz("a1", T.a1, -1);
s("sfx/whoosh-short.mp3", T.envia, 0, { techo: -44 }); tuc(T.envia + 0.05, -40);
// P3 · las fotos (ding chico por foto), la ráfaga de la sumadora, el ticket al piolín, los sobres (pop chico por sobre)
ding(T.foto1, -42); ding(T.foto2, -39); s("sfx/ding.mp3", T.sirve, 0, { techo: -44, hp: 600 });
s("sfx/whoosh-short.mp3", T.p3b - 0.05, 0, { techo: -42 });
s("sfx/bsb-3553.mp3", T.p3b - 0.02, 0, { desde: 0.17, dur: 0.85, fin: 0.12, techo: -36 });
s("sfx/papel-fuerte.mp3", T.cuelga, 0, { techo: -40, dur: 0.4, fin: 0.12 });
s("sfx/whoosh-short.mp3", T.p3c - 0.05, 0, { techo: -44 });
for (let k = 0; k < 8; k++) pop(T.sob0 + (k * (T.sob1 - T.sob0)) / 8, -44 + (k % 2));
// P4 · golpean la puerta, se abre, pasos; la caja que se vuelca: avalancha de papel (crujido, no golpe)
s("sfx/madera-golpe.wav", T.golpe, 0, { techo: -36 }); s("sfx/madera-golpe.wav", T.golpe + 0.18, 0, { techo: -38 });
s("sfx/puerta-abre.wav", T.abre, 0, { techo: -40 });
pasos(T.abre + 0.15, T.abre + 1.0, 4, -44);
voz("m2", T.m2, -1);
s("sfx/k-page-turn.wav", T.vuelca - 0.05, 0, { techo: -40 });
s("sfx/papel.wav", T.vuelca + 0.12, 0, { techo: -33 }); s("sfx/cruje.wav", T.vuelca + 0.3, 0, { techo: -36 }); s("sfx/hoja.mp3", T.vuelca + 0.5, 0, { techo: -40 });
// P5 · el ticket que cruje al levantarlo
s("sfx/papel-fuerte.mp3", T.saca, 0, { techo: -40, dur: 0.45, fin: 0.12 });
s("sfx/whoosh-short.mp3", T.a2 - 0.2, 0, { techo: -46 });
voz("a2", T.a2, -1);
s("sfx/whoosh-short.mp3", T.p5c - 0.05, 0, { techo: -46 });
voz("m3", T.m3, -1);
// P6 · la pausa: el reloj de pared y un pop chico por rótulo
reloj(T.p6, T.p7, -44);
T.rot.forEach((t, i) => pop(t, -40 + (i % 2)));
// P7 · "Si querés, te mando una foto." · la puerta se cierra · vibra el celular + ding · el stinger lo da el cartel
voz("m4", T.m4, -1);
pasos(T.sale - 0.1, T.cierra, 2, -46);
s("sfx/puerta-abre.wav", T.cierra - 0.35, 0, { techo: -42, vel: 0.9 }); s("sfx/madera-golpe.wav", T.cierra - 0.02, 0, { techo: -38, lp: 1200 });
noti(T.vib + 0.05, -34);
reloj(T.p7c - 0.2, P1, -44);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.95, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -36, duck: [[T.cadena - 0.2, T.cadena + 0.3, 0.6]] });   // (r1) hueco para el clic de la cadenita
// Q1 · la panadería: la calle, el WhatsApp del estudio; Día 3: la campanita de la puerta, la bolsa de harina, el
// obturador y "Subido ✓"
s("sfx/calle.wav", P2, 0, { loop: true, desde: 5, dur: r2(T.q2 - P2 + 0.05), fi: 0.2, fin: 0.15, techo: -48, lp: 1400 });
noti(T.vibraM + 0.1, -34);
s("sfx/campanita.wav", T.q1d3 + 0.02, 0, { techo: -40 });
s("sfx/bsb-0576.mp3", T.bolsa + 0.28, 0, { desde: 0.07, dur: 0.32, fin: 0.1, techo: -36, lp: 2500 });
s("sfx/whoosh-short.mp3", T.cam - 0.05, 0, { techo: -46 });
s("sfx/bsb-0307.mp3", T.click - 0.02, 0, { techo: -36 });
ding(T.subido, -36);
voz("m5", T.m5, -1);
// Q2 · el estudio de tarde (un pájaro lejano por la ventana); el panel: tecleo suave, ding por chip, whoosh del contador
s("sfx/zumbido-largo.wav", T.q2, 0, { loop: true, dur: r2(DUR - T.q2), fi: 0.1, fin: 0.4, techo: -54, lp: 700 });
s("sfx/pajaro.wav", T.q2 + 0.1, 0, { techo: -50, dur: 1.5, fin: 0.4 });
for (let k = 0; k < 3; k++) tecla(T.q2 + 0.12 + k * 0.11, -42);
s("sfx/whoosh-short.mp3", T.q2i - 0.06, 0, { techo: -44 });
s("sfx/whoosh-short.mp3", T.cnt1 + 0.05, 0, { techo: -46 }); ding(T.cnt1 + 0.6, -40);
ding(T.dia5 + 0.05, -38); s("sfx/whoosh-short.mp3", T.cnt2 + 0.05, 0, { techo: -46 }); ding(T.cnt2 + 0.4, -40);
ding(T.dia8 + 0.05, -38); s("sfx/whoosh-short.mp3", T.cnt3 + 0.03, 0, { techo: -46 }); ding(T.cnt3 + 0.4, -36);
toque(T.clickM - 0.05, -36); pop(T.clickM + 0.1, -42);
// Q3 · el mismo audio · Adriana graba (toque) · audio enviado · el audio de Marcelo
s("sfx/whoosh-short.mp3", T.q3 - 0.2, 0, { techo: -50 });
tuc(T.m1b - 0.22, -46); voz("m1b", T.m1b, -1);
s("sfx/whoosh-short.mp3", T.q3a - 0.04, 0, { techo: -48 }); toque(T.a3 - 0.12, -42); voz("a3", T.a3, -1);
s("sfx/whoosh-short.mp3", T.a3 + LEN.a3 + 0.02, 0, { techo: -48 }); s("sfx/whoosh-short.mp3", T.q3m - 0.04, 0, { techo: -50 }); tuc(T.m6 - 0.1, -44);
voz("m6", T.m6, -1);
// Q4 · el panel en 60 de 60 (ding) · el clic de la cadenita (la lámpara se apaga)
s("sfx/whoosh-short.mp3", T.q4 - 0.02, 0, { techo: -52 }); pop(T.q4 + 0.4, -40); ding(T.q4 + 0.45, -36);
s("sfx/whoosh-short.mp3", T.q4b - 0.05, 0, { techo: -46 });
s("sfx/bsb-0036.mp3", T.cadena - 0.01, 0, { desde: 0.86, dur: 0.22, fin: 0.05, techo: -37 });
// Q5 · el cierre: Sofi; pop en PAPELES; la línea chica
s("sfx/whoosh-short.mp3", T.q5 - 0.1, 0, { techo: -44 });
voz("so", T.so, -1);
pop(T.palabra + 0.02, -46); pop(T.so + palabra("so", 1) + 0.02, -40);
pop(T.cierre + 0.05, -44);
// la cama +7 dB (con su duck); en los tramos sin voz (P3, la pausa, Q1, Q2, Q4) los SFX +5 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; }
  if (en(t0, T.envia + 0.3, T.m2) || en(t0, T.vuelca - 0.1, T.a2 - 0.2) || en(t0, T.p6, T.m4) || en(t0, P2, T.m5) || en(t0, T.q2, T.m1b - 0.2) || en(t0, T.q4, T.so - 0.2)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 5); }
// la música: duck debajo de cada voz (~0,7) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.6])]; }
function en(t, a, b) { return t >= a && t < b; }

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
// el bus suma +6 dB antes del limitador: el techo se cumple DESPUÉS del bus (por eso -6)
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
    if (o.pan) c += `,pan=stereo|c0=${r2(Math.min(1, 1 - o.pan))}*c0|c1=${r2(Math.min(1, 1 + o.pan))}*c1`;
    if (o.voz) c += ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/0.4,0,1)*clip((${b}-t)/0.4,0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (process.env.LISTA) for (const x of S) if (!x[3].voz && x[1] + (x[3].dur ?? 3) > 38.3 && x[1] < 39.4) console.log(x[0], x[1], x[3].techo, ganancia(x));
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  // (r2) el bus: +6 dB y compresor suave (LRA ≤ 8); después la ganancia a -14 LUFS y RECIÉN AHÍ el limitador (techo -4 dBFS),
  // así no queda nada recortado ni el loudnorm del paso 10 tiene que tocar (va lineal)
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=2.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => Number([...execSync(`ffmpeg -hide_banner -i ${f} -af ebur128 -f null - 2>&1`).toString().matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  let gan = r2(OBJ - medirI("assets/audio/mezcla-bus.wav"));
  let usada = gan;
  for (let k = 0; k < 2; k++) {
    usada = gan;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-bus.wav", "-af", `volume=${gan}dB,alimiter=limit=0.63:attack=1:release=50:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    gan = r2(gan + (OBJ - medirI("assets/audio/mezcla.wav")));
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
const IRIS_C = "540px 1100px";   // el iris se abre desde el celular de Marcelo (Q1)
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
      <div id="precarga">Papeles</div><div id="precarga2">harina 2200</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Marcelo
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.q5} (${r2(DUR - T.q5)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
