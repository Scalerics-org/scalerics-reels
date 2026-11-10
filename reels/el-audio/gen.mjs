// Genera todo el-audio desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas de Rubén y de Graciela)
//   - compositions/*.html: la capa plana de arriba (la pastilla de la hora, el chip "Grabando", las dos líneas de
//     Rubén, la respuesta del agente en Q5, el cartel, la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como me-lo-guardas y abren-hoy-completo) en UN solo proyecto: parte 1 (0 a P1), el
// cartel "Un agente de IA más tarde…" (P1 a P2, HTML debajo del canvas: el canvas se va girando y vuelve con un iris)
// y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Las voces de Graciela (assets/voice/g1..g5) ya vienen recortadas, aceleradas (g1-g3 1,2x; g4 2x; g5 1,3x) y con el
// filtro de audio de celular (ver partes/voces.md). Las palabras de cada una (relativas) están anotadas al lado.
const P1 = 16.5;          // termina la parte 1 (arranca el cartel)
const P2 = 19.7;          // arranca la parte 2 (termina el iris del cartel)
const T = {
  // ---- parte 1 ----
  // P1 · el celular en primer término, Rubén atrás con el mate humeante: toca play
  tap: 0.28, g1: 0.38,                               // g1: "¡Hola, Rubén! ¿Cómo andás? Mirá, te cuento, porque ayer vino mi sobrino…" (sobrino +2,95)
  // P2 · contraplano: Graciela en su casa grabando el audio
  p2: 2.0, fSobrino: 3.36, g2: 3.93, fPerro: 4.24,   // g2: "…y el perro, divino," (perro +0,33)
  // P3a · general del almacén: la luz empieza a caer, el reloj gira, el mate ya no humea
  p3a: 5.0, g3: 5.14, fFrio: 5.52, sorbo1: 5.75, fVecina: 6.55, // g3: "…¿y viste el frío que hace? Yo le dije a la del tres…" (frío +0,4, del +1,6)
  // P3b · plano medio de Rubén con el celular: 2x, la Nelly o la Beba, atardecer → noche, apoya la mejilla
  p3b: 6.95, tap2x: 7.02, g4: 7.1, fNelly: 7.58, rodillo: [7.85, 8.15], farol: 8.0, mejilla: 8.25, // g4 (2x): Nelly +0,5
  // P4 · primer plano de la pantalla: 4:09, 4:10, 4:11
  p4: 9.0, k409: 9.3, k410: 9.85, k411: 10.4, g5: 9.42,  // g5 (1,3x): "…bueno, no te molesto más. ¿A cuánto está la polenta? Beso." (polenta +1,7, Beso +2,45)
  // P4b · el encuadre de P3b: la polenta, "Beso." → 4:12, la luz vuelve de golpe a la mañana (10:19)
  p4b: 10.95, fPolenta: 11.1, k412: 11.9, luz: 12.42,
  // P5 · primer plano de Rubén: se corta la música, pausa, mira a cámara, graba "Noventa."
  p5: 12.5, corte: 12.5, cabeza: [12.55, 13.0], micro: [12.85, 13.1], click: 13.12, pushIn: [12.95, 13.2], voz1: 13.25, suelta: 14.2, enviado: 14.25,
  // P6 · el encuadre de P1: 4:12 arriba y 0:01 abajo; "Graciela está grabando un audio…"; 6:47 y tuba; el segundo termo
  p6: 14.45, b001: 14.6, p6b: 15.72, grabando: 14.95, b647: 15.45, termo2: 15.9,
  // ---- parte 2 ----
  q1: P2, llega: 19.8, escucha: [20.1, 20.8], escuchado: 20.85, resp1: 21.2,
  q1b: 21.8, resp2: 21.9, gTexto: 22.5, sorbo2: 22.8,
  q2: 23.3, etiqueta: 23.45, h1016: 24.0,
  q3: 24.7, campana: 24.75, entraG: [24.75, 25.75], g6: 25.02, bG6: 25.6,   // g6 (en persona): "¡Rubén! ¿Te conté lo de mi sobrino?" (Te +0,7, sobrino +1,8)
  q4: 26.8, levTermo: [27.75, 28.1], voz2: 28.25,
  q5: 29.3, ceba: [29.35, 29.85], alcanza: [29.85, 30.25], bResulta: 30.1, vibra: 30.25, b647b: 30.3, escuchado2: 30.5, resp3: 30.75,
  cierre: 30.2,
};
const DUR = 32.0;

// palabras de las líneas de Rubén (relativas al inicio de cada archivo)
const LINEA1 = [["Noventa.", 0.02]];
const LINEA2 = [["Contame.", 0.02]];

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
const ENV = { r1: envolvente("assets/voice/ruben1.wav"), r2: envolvente("assets/voice/ruben2.wav"), g1: envolvente("assets/voice/g1.wav"), g2: envolvente("assets/voice/g2.wav"), g6: envolvente("assets/voice/g6.wav") };
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin contador, fichas ni globos (fondo de la portada)\n`);

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
fs.mkdirSync("compositions", { recursive: true });
for (const f of fs.readdirSync("compositions")) if (f.endsWith(".html")) fs.unlinkSync(`compositions/${f}`);
const ESC = [];     // [id, inicio, duración, capa]  capa: "arriba" (sobre el canvas) o "abajo" (el cartel)

// la pastilla de la hora (abajo a la derecha, como abren-hoy s01-hora): cambia de texto con un flip y un tic
function hora(id, ini, fin, textos, top = 1770) {
  const dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .hora { position: absolute; right: 40px; top: ${top}px; display: flex; align-items: center; gap: 14px; padding: 12px 22px 13px; border-radius: 999px; background: ${NAVY}; border: 5px solid ${CR}; font: 500 36px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: ${CR}; box-shadow: 0 8px 0 rgba(3,6,12,0.45); transform-origin: 100% 50%; }
    P .punto { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }
    P .tx { position: relative; display: inline-block; }
    P .tx span { display: none; white-space: nowrap; }`,
    html: `      <div class="hora"><span class="punto"></span><span class="tx">${textos.map(([, s], i) => `<span class="t${i}">${s}</span>`).join("")}</span></div>`,
    js: `      ${ini > 0 ? `tl.fromTo(q(".hora"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: true }, 0.0);` : ""}
      const ts = ${JSON.stringify(textos.map(([t]) => r2(t - ini)))};
      ts.forEach((t, i) => {
        tl.set(q(".t" + i), { display: "inline" }, Math.max(0, t));
        if (i > 0) { tl.set(q(".t" + (i - 1)), { display: "none" }, t); tl.fromTo(q(".hora"), { rotationX: 85, scale: 1.1 }, { rotationX: 0, scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, t); }
      });
      tl.fromTo(q(".punto"), { opacity: 1 }, { opacity: 0.35, duration: 0.5, yoyo: true, repeat: ${Math.max(1, Math.floor(dur / 0.5) - 2)}, ease: "sine.inOut", immediateRender: false }, 0.4);
      tl.to(q(".hora"), { opacity: 0, y: 30, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.22)});`,
  });
}
hora("s00-hora", 0, P1 - 0.02, [[0, "MARTES · 10:15"], [T.luz, "MARTES · 10:19"]]);

// el chip "Grabando" de Rubén (P5): crema sobre navy con el punto rojo apagado que late y el contador 0:00 → 0:01
{
  const id = "s05-chip", ini = T.click, fin = T.suelta + 0.06, dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .chip { position: absolute; left: 60px; top: 1500px; display: flex; align-items: center; gap: 22px; padding: 22px 36px 24px 30px; border-radius: 999px; background: ${NAVY}; border: 6px solid ${CR}; box-shadow: 0 10px 0 rgba(3,6,12,0.45); transform-origin: 0% 50%; }
    P .rec { width: 34px; height: 34px; border-radius: 50%; background: #c7655b; }
    P .tx { font: 800 58px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .n { font: 500 54px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    P .n span { display: none; }`,
    html: `      <div class="chip"><span class="rec"></span><span class="tx">Grabando</span><span class="n"><span class="a">0:00</span><span class="b">0:01</span></span></div>`,
    js: `      tl.fromTo(q(".chip"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2.2)", immediateRender: true }, 0.0);
      tl.set(q(".a"), { display: "inline" }, 0);
      tl.set(q(".a"), { display: "none" }, ${r2(T.voz1 + 0.6 - ini)}); tl.set(q(".b"), { display: "inline" }, ${r2(T.voz1 + 0.6 - ini)});
      tl.fromTo(q(".rec"), { opacity: 1 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: ${Math.floor(dur / 0.25) - 1}, ease: "sine.inOut", immediateRender: false }, 0.1);
      tl.to(q(".chip"), { opacity: 0, scale: 0.8, duration: 0.06, ease: "power2.in" }, ${r2(dur - 0.06)});`,
  });
}

// la respuesta del agente pegada a cámara sobre el celular de Rubén (Q5): el 6:47 escuchado y contestado solo
{
  const id = "s06-resp", ini = T.escuchado2 - 0.02, fin = DUR, dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .ok { position: absolute; right: 60px; top: 330px; display: flex; align-items: center; gap: 16px; padding: 16px 30px 18px 22px; border-radius: 999px; background: ${G}; border: 6px solid ${NAVY}; box-shadow: 8px 10px 0 rgba(11,18,32,0.5); font: 800 46px/1 "Lexend", sans-serif; color: ${NAVY}; transform-origin: 100% 50%; }
    P .ok svg { width: 44px; height: 44px; }
    P .r { position: absolute; right: 60px; top: 460px; width: 720px; padding: 22px 32px 24px; border-radius: 34px 34px 10px 34px; background: #16243d; border: 6px solid ${G}; box-shadow: 8px 10px 0 rgba(11,18,32,0.5); transform-origin: 90% 0%; }
    P .x { font: 700 52px/1.18 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .a { margin-top: 12px; font: 500 38px/1.1 "IBM Plex Mono", monospace; color: ${G}; letter-spacing: 0.01em; }`,
    html: `      <div class="ok"><svg viewBox="0 0 44 44"><path d="M7 23 L18 33 L37 11" fill="none" stroke="${NAVY}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>Audio escuchado</div>
      <div class="r"><div class="x">¡Qué lindo lo del perro!<br>Ya te la separé.</div><div class="a">respondido automáticamente</div></div>`,
    js: `      tl.fromTo(q(".ok"), { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2)", immediateRender: true }, 0.02);
      tl.fromTo(q(".r"), { opacity: 0, scale: 0.55, y: -30 }, { opacity: 1, scale: 1, y: 0, duration: 0.26, ease: "back.out(2)", immediateRender: true }, ${r2(T.resp3 - ini)});`,
  });
}

// las líneas de Rubén, palabra por palabra, arriba; la clave en el recuadro verde
function linea(id, vozT, palabras, clave, fin) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 50px; right: 50px; top: 110px; text-align: center; font: 700 96px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 22px; }
    P .w.ac em { color: ${NAVY}; }
    P .caja { position: absolute; left: -20px; right: -20px; top: 6px; bottom: 0; border: 5px solid ${NAVY}; background: ${G}; border-radius: 6px; box-shadow: 0 10px 0 rgba(11,18,32,0.45); }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${NAVY}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        tl.set(w, { opacity: 1 }, t);
        tl.fromTo(w, { y: 18, scale: 0.86 }, { y: 0, scale: 1, duration: 0.12, ease: "back.out(2)", immediateRender: false }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t);
      }
      tl.to(q(".linea"), { opacity: 0, duration: 0.16, ease: "power2.in" }, ${r2(dur - 0.18)});`,
  });
}
linea("s01-linea", T.voz1, LINEA1, 0, T.p6 - 0.02);
linea("s02-linea", T.voz2, LINEA2, 0, T.q5 - 0.02);

// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero; el mismo de
// abren-hoy-completo y me-lo-guardas). Va DEBAJO del canvas: el canvas se va girando (último cuadro de la parte 1) y
// vuelve abriéndose en un iris (primer cuadro de la parte 2).
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 600px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 190px; margin-top: 6px; }
    P .linea.c { font-size: 140px; margin-top: 22px; }
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
        ${lin("a", ["Un", "agente"])}
        ${lin("b", ["de", "IA"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = 0.3 + i * 0.04;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.25, duration: 0.45, ease: "power2.in" }, ${r2(dur - 0.45)});`,
  });
}
hora("s04-hora", T.q1 + 0.05, T.q5, [[T.q1 + 0.05, "OTRO MARTES · 10:15"], [T.h1016, "OTRO MARTES · 10:16"]], 1690);

// la línea chica final (abajo): una línea y la web
{
  const id = "s03-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1440px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.95); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 56px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA escucha</div><div class="a">los audios y contesta por vos</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), voz: true (sin techo),
//  rev: true (al revés), loop: true (el archivo dos veces seguidas) }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS medido en el tramo que suena;
// las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
// ---- parte 1 ----
// ambiente de barrio (calle.wav con pasabajos): se oye desde adentro; de noche baja; en la pausa de P5 casi nada
s("sfx/calle.wav", 0, -6, { dur: P1, fin: 0.3, techo: -37, lp: 1800, duck: [T.corte, T.p6] });
// la música, liviana debajo del audio de Graciela, se corta seca en P5 (antes de "Noventa.")
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: T.corte, fin: 0.01, techo: -38 });
s("sfx/click-soft.mp3", T.tap, 0, { techo: -37 });                                       // play
// el audio de Graciela, con el filtro de celular (ya aplicado en los archivos)
s("voice/g1.wav", T.g1, -4, { voz: true });
s("voice/g2.wav", T.g2, -4, { voz: true });
s("voice/g3.wav", T.g3, -4, { voz: true });
s("voice/g4.wav", T.g4, -4, { voz: true });
s("voice/g5.wav", T.g5, -4, { voz: true });
// fichas de temas: un pop por ficha
for (const t of [T.fSobrino, T.fPerro, T.fFrio, T.fVecina, T.fNelly]) s("sfx/pop.mp3", t, 0, { desde: 0.11, techo: -39 });
s("sfx/pop.mp3", T.fPolenta, 0, { desde: 0.11, techo: -37 });
s("sfx/whoosh.mp3", T.p2 - 0.03, 0, { techo: -43 });
s("sfx/sorbo.wav", T.sorbo1, 0, { techo: -38 });
// las agujas del reloj que giran rápido durante el time-lapse: tic/tac bajito
for (let t = T.p3a + 0.1, i = 0; t < T.luz - 0.1; t += 0.24, i++) s(i % 2 ? "sfx/tac-real.mp3" : "sfx/tic-real.mp3", t, 0, { techo: -46 });
s("sfx/click-soft.mp3", T.tap2x, 0, { techo: -39 });                                      // 2x
for (let i = 0; i < 5; i++) s("sfx/key-press.mp3", T.rodillo[0] + i * 0.07, 0, { desde: 0.07, techo: -41 });
s("sfx/whoosh.mp3", T.farol, 0, { techo: -45 });                                            // se prende el farol
for (const t of [T.k409, T.k410, T.k411, T.k412]) s("sfx/key-press.mp3", t, 0, { desde: 0.07, techo: -41 });
// la luz vuelve de golpe: whoosh al revés + tic
s("sfx/whoosh.mp3", T.luz - 0.5, 0, { rev: true, techo: -39 });
s("sfx/tic-real.mp3", T.luz, 0, { techo: -38 });
// P5: se corta la música (solo ambiente bajo), push-in, el botón del micrófono, la voz, el "enviado"
s("sfx/whoosh.mp3", T.pushIn[0], 0, { techo: -40 });
s("sfx/click-soft.mp3", T.click, 0, { techo: -37 });
s("voice/ruben1.wav", T.voz1, -5, { voz: true });
s("sfx/burbuja.mp3", T.enviado, 0);
// P6: 0:01, grabando, 6:47 con tuba, el segundo termo con un golpe seco
s("sfx/pop.mp3", T.b001, 0, { desde: 0.11, techo: -35 });
s("sfx/tic-real.mp3", T.grabando, 0, { techo: -40 });
s("sfx/notification.mp3", T.b647, 0, { techo: -37 });
s("sfx/key-press.mp3", T.b647, 0, { desde: 0.07, techo: -36 });
s("sfx/tuba.mp3", T.b647 + 0.05, 0, { desde: 0.19, techo: -31 });
s("sfx/sello.wav", T.termo2, 0, { techo: -33 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -36 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -36 });
s("voice/narrador.wav", P1 + 0.3, -5, { voz: true });
s("sfx/calle.wav", P2 - 1.05, -6, { desde: 5, dur: 1.1, fi: 0.35, fin: 0.05, techo: -41, lp: 1800 });
s("sfx/whoosh.mp3", P2 - 0.38, 0, { techo: -40 });
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -38, lp: 1800 });
s("bgm/pizzicato.wav", P2, 0, { dur: r2(DUR - P2), fin: 0.8, techo: -35, duck: [T.g6 - 0.1, T.voz2 + 0.9] });
s("sfx/pop.mp3", T.llega, 0, { desde: 0.11, techo: -35 });
s("sfx/whoosh.mp3", T.escucha[0], 0, { techo: -38 });
s("sfx/cero.mp3", T.escuchado, 0, { techo: -34 });
s("sfx/respuesta.wav", T.resp1, 0, { techo: -35 });
s("sfx/whoosh.mp3", T.q1b - 0.02, 0, { techo: -44 });
s("sfx/respuesta.wav", T.resp2, 0, { techo: -36 });
s("sfx/burbuja.mp3", T.gTexto, 0);
s("sfx/sorbo.wav", T.sorbo2, 0, { techo: -37 });
s("sfx/pop.mp3", T.etiqueta, 0, { desde: 0.11, techo: -35 });
s("sfx/tic-real.mp3", T.h1016, 0, { techo: -38 });
s("sfx/campanita.wav", T.campana, 0, { techo: -36 });
for (let t = T.entraG[0] + 0.1; t < T.entraG[1]; t += 0.22) s("sfx/tac-real.mp3", t, 0, { techo: -42 });
s("voice/g6.wav", T.g6, -5, { voz: true });
s("sfx/burbuja.mp3", T.bG6, 0, { techo: -40 });
s("sfx/sello.wav", T.levTermo[1] - 0.05, -4, { techo: -40 });
s("voice/ruben2.wav", T.voz2, -5, { voz: true });
s("sfx/papel.wav", T.ceba[0], 0, { dur: 0.4, fin: 0.12, techo: -42 });                   // el agua que cae (el roce más suave que tenemos)
s("sfx/burbuja.mp3", T.bResulta, 0, { techo: -40 });
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.6, fin: 0.08, techo: -35 });
s("sfx/cero.mp3", T.escuchado2, 0, { techo: -36 });
s("sfx/respuesta.wav", T.resp3, 0, { techo: -36 });
s("sfx/whoosh.mp3", T.cierre - 0.03, 0, { techo: -40 });

// arreglos por archivo (heredados: tramos mudos al principio, un solo golpe, burbujas más bajas)
for (const x of S) {
  const [f, , , o] = x;
  if (f === "sfx/papel.wav") { o.desde = r2((o.desde ?? 0) + 0.3); if (!o.dur) { o.dur = 0.75; o.fin = 0.2; } }
  if (f === "sfx/sello.wav") { o.dur = 0.3; o.fin = 0.05; }
  if (f === "sfx/campanita.wav") { o.dur = 0.6; o.fin = 0.2; }
  if (f === "sfx/burbuja.mp3") { o.desde = 0.04; o.techo = (o.techo ?? TECHO) - 3; }
}
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}@${o.lp ?? 0}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const lp = o.lp ? `lowpass=f=${o.lp},` : "";
    const txt = execSync(`ffmpeg -hide_banner ${o.loop ? "-stream_loop 1 " : ""}-i assets/${f} -af "${corte}${lp}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128" -f null - 2>&1`).toString();
    const m = [...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
    lufs[k] = m && Number(m[1]) > -69 ? Number(m[1]) : -30;
  }
  return lufs[k];
}
const CAMA = Number(process.env.CAMA ?? 4);
const esCama = (f) => f.startsWith("bgm/") || f === "sfx/calle.wav";
const ganancia = ([f, , db, o]) => (o.voz ? db : r2(Math.min(db, (o.techo ?? TECHO) - lufsTramo(f, o)) + (esCama(f) ? CAMA : 0)));
function mezcla(lista, salida, dur, bus = false) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    if (o.loop) args.push("-stream_loop", "1");
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.rev) c += ",areverse";
    if (o.lp) c += `,lowpass=f=${o.lp}`;
    if (o.tempo) c += `,atempo=${o.tempo}`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.fi) c += `,afade=t=in:st=0:d=${o.fi}`;
    if (o.voz) c += ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.42:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    if (o.duck) { const [a, b] = o.duck.map((v) => r2(v - ini)); c += `,volume='1-0.645*clip((t-${a})/0.15,0,1)*clip((${b}-t)/0.15,0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}${bus ? ",acompressor=threshold=-30dB:ratio=2.5:attack=5:release=120:makeup=1" : ""}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  // nivel: -14 LUFS con limitador (el loudnorm del paso 10 casi no toca nada y el AAC no clipea); modo lineal
  const OBJ = Number(process.env.OBJ ?? -13.3), LIM = Number(process.env.LIM ?? 0.6);
  const txt = execSync(`ffmpeg -hide_banner -i assets/audio/mezcla-cruda.wav -af ebur128 -f null - 2>&1`).toString();
  const I = Number([...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", `volume=${r2(OBJ - I)}dB,lowpass=f=${process.env.LP ?? 15000}:poles=2,aresample=192000,alimiter=limit=${LIM}:level=false:attack=1:release=60,aresample=48000,atrim=duration=${DUR}`, "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre (también en LIMPIO)
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.44);
const IRIS_C = "540px 1300px";   // el iris se abre desde el celular de Rubén (abajo al centro en Q1)
// la firma (logo) abajo al centro, en las dos partes (no en el cartel ni sobre la línea chica final)
const FIRMAS = [[0, P1], [P2, T.cierre]];
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #efeee5; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #efeee5; }
      #fondo { position: absolute; inset: 0; background: #efeee5; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1800px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Graciela</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
${LIMPIO ? "" : FIRMAS.map(([a, b], i) => `      <img id="firma${i}" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="${a}" data-duration="${r2(b - a)}" data-track-index="9" />`).join("\n")}
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
      // el último cuadro de la parte 1 se va girando 540° y achicándose (el giro clásico del cartel)
      tl.fromTo("#capa3d", { scale: 1, rotation: 0 }, { scale: 0.001, rotation: 540, duration: 0.42, ease: "power2.in", immediateRender: false }, ${ROT});
      // la parte 2 entra por un iris que se abre desde el celular de Rubén (con el audio de Graciela ya puesto)
      tl.set("#capa3d", { scale: 1, rotation: 0, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.43)});
      tl.fromTo("#capa3d", { clipPath: "circle(0px at ${IRIS_C})" }, { clipPath: "circle(1500px at ${IRIS_C})", duration: 0.42, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s`);
