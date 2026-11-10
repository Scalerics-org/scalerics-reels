// Genera todo me-haces-precio desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas de Héctor, Rubén y Graciela)
//   - compositions/*.html: la capa plana de arriba (el gancho-burbuja de P1, las dos líneas de Rubén, el cartel, la
//     línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como el-audio, me-lo-guardas y abren-hoy-completo) en UN solo proyecto: parte 1
// (0 a P1), el cartel "Unos puntos más tarde…" (P1 a P2, HTML debajo del canvas: el canvas se va girando y vuelve con
// un iris) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Las voces (assets/voice/*.wav) ya vienen recortadas (y algunas aceleradas: ver partes/voces.md). Duraciones:
// hector1 1,06 · hector2 0,97 · hector3 2,05 ("Dejá." 0 · "Quedate" 1,0) · hector4 2,04 · hector5 0,62 · hector6 0,87 ·
// hector7 1,83 · ruben1 1,69 ("cinco" +0,95) · ruben2 1,02 · graciela1 1,87 · graciela2 2,10 · narrador 2,26
const P1 = 19.5;          // termina la parte 1 (arranca el cartel)
const P2 = 22.5;          // arranca la parte 2 (termina el iris del cartel): cartel de 3,0 s
const T = {
  // ---- parte 1 ----
  // P1 · Héctor de 3/4 con el pote y la etiqueta "$ 200": "¿Me hacés precio?"
  h1: 0.25,
  // P2 · contraplano: Rubén de frente, sorbe el mate, "Doscientos."
  p2: 1.85, sorbo1: 1.92, bDos1: 2.3,
  // P3a · general de perfil: el duelo de números (180 y 190 chocan contra el 200, se tachan y caen), el banquito
  p3a: 2.95, b180: 3.05, bDos2: 3.65, b190: 4.1, bDos3: 4.8, banco: [4.95, 5.3], sienta: [5.25, 5.5],
  // P3b · primer plano del mostrador: el monedero, las monedas en tres torres, el termo que no tira nada
  p3b: 5.55, abre: 5.6, monedas: [5.7, 6.3], bMon: 5.85, termo: [6.35, 6.6, 6.8, 6.95],
  // P4 · primer plano de Rubén: cierra los ojos, "Ciento noventa y cinco.", el 200 rueda a 195
  p4: 7.0, ojos: [7.05, 7.35], r1: 7.4, rodillo: 8.5,
  // P5 · plano medio de Héctor: se para, PUÑO "¡Hecho!", choque de manos
  p5: 9.15, puno: 9.2, h2: 9.25, mano: [9.6, 9.88], palmada: 9.88,
  // P6 · el mostrador: el billete, la latita, la moneda de 5; se corta la música; "Dejá. Quedate con el vuelto."
  p6: 10.35, billete: 10.42, latita: 10.68, moneda: [10.85, 11.1], corte: 11.15, deja: 11.4, h3: 11.5,
  // P6b · Rubén con la moneda de 5, cara de nada
  p6b: 13.62,
  // P7 · general hacia la puerta: Héctor sale con el pote, se cruza con Graciela; "¡Me lo dejó en…!"; "Rubén, ¿me hacés precio?"
  p7: 14.45, campana: 14.5, h4: 14.7, hSale: [16.6, 17.5], g1: 16.95,
  // P7b · primer plano de Rubén: apoya la frente en el mostrador
  p7b: 18.85, frente: [18.95, 19.25],
  // ---- parte 2 ----
  q1: P2, bMeHac: 22.8, vibra: 23.25, saca: [23.35, 23.75],
  q1b: 23.85, noti: 23.9, late: 24.4,
  q2: 25.15, h5: 25.25,
  q2b: 25.95, r2: 26.05,
  q3: 27.2, pago: 27.3, tilde: 27.5, mas20: 27.8, premio: 28.35, puno2: 28.7, h6: 28.75, pote2: 29.55,
  q4: 30.05, campana2: 30.1, h7: 30.25, hSale2: [31.95, 32.75], g2: 32.2, scan: 34.35, ok20: 34.5,
  cierre: 34.75,
};
const DUR = 36.35;

// palabras de las líneas de Rubén (relativas al inicio de cada archivo)
const LINEA1 = [["Ciento", 0.0], ["noventa", 0.32], ["y", 0.64], ["cinco.", 0.95]];
const LINEA2 = [["Doscientos.", 0.0]];

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
const VOCES = ["hector1", "hector2", "hector3", "hector4", "hector5", "hector6", "hector7", "ruben1", "ruben2", "graciela1", "graciela2"];
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin números, globos ni rótulos (fondo de la portada)\n`);

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

// P1 · el gancho ES la burbuja de Héctor: en el cuadro 0 ya está entero y grande ("precio" en el recuadro verde de
// selección); con la voz (0,25) late una vez, como cualquier burbuja que habla. La cola apunta a la boca de Héctor.
const GANCHO = { cola: 560, rot: 14 };
{
  const id = "s00-gancho", ini = 0, fin = T.p2, dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 70px; right: 70px; top: 150px; padding: 34px 40px 44px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 62% 100%; }
    P .tx { font: 900 128px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx">¿Me hacés<br><span class="sel"><b></b><em>precio?</em></span></div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.06, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${T.h1});
      tl.fromTo(q(".sel b"), { scaleX: 1.2, scaleY: 1.35 }, { scaleX: 1, scaleY: 1, duration: 0.28, ease: "power3.out", immediateRender: false }, ${r2(T.h1 + 0.32)});
      tl.to(q(".glo"), { opacity: 0, scale: 0.85, duration: 0.12, ease: "power2.in" }, ${r2(dur - 0.13)});`,
  });
}

// las líneas de Rubén, palabra por palabra, debajo de la cara; la clave en el recuadro verde
function linea(id, vozT, palabras, clave, fin, top = 1420) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 50px; right: 50px; top: ${top}px; text-align: center; font: 800 100px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: 0 6px 0 ${NAVY}, 0 0 18px rgba(11,18,32,0.9); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 22px; text-shadow: none; }
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
linea("s01-linea", T.r1, LINEA1, 3, T.p5 - 0.02);
linea("s02-linea", T.r2, LINEA2, 0, T.q3 - 0.02, 190);

// el cartel "Unos puntos más tarde…" (time card de dibujito, de marca, hecho de cero; el mismo de abren-hoy-completo,
// me-lo-guardas y el-audio, con el texto nuevo en dos líneas). Va DEBAJO del canvas: el canvas se va girando (último
// cuadro de la parte 1) y vuelve abriéndose en un iris (primer cuadro de la parte 2). No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  // cada palabra entra con el narrador (Unos 0,2 · puntos 0,6 · más 1,2 · tarde 1,8)
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.035)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 690px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 136px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 146px; margin-top: 18px; }
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
        ${lin("a", [["Unos", 0.2], ["puntos", 0.55]])}
        ${lin("b", [["más", 1.15], ["tarde…", 1.45]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.3, opacity: 0, duration: 0.3, ease: "power2.in" }, ${r2(dur - 0.62)});`,
  });
}

// la línea chica final (abajo): una línea y la web
{
  const id = "s03-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1450px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.96); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Scalerics Puntos: tus clientes</div><div class="a">suman y vuelven</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), voz: true (sin techo),
//  rev: true (al revés), loop: true (el archivo repetido), lp (pasabajos), duck: [a, b] (baja la cama) }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima
// del tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -38) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const golpecito = (t, techo = -40) => s("sfx/ping.mp3", t, 0, { dur: 0.09, fin: 0.05, techo, pico: -22 });   // una moneda (el ataque del ping, corto)
// ---- parte 1 ----
// ambiente de barrio desde adentro (calle.wav con pasabajos); en la pausa de P6 queda solo
s("sfx/calle.wav", 0, -6, { loop: true, dur: P1, fin: 0.3, techo: -40, lp: 1800 });
// la música (pizzicato, como un duelo de truco): se corta SECA antes de "Dejá."
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: T.corte, fin: 0.012, techo: -34, duck: [T.h1 - 0.05, T.h1 + 1.1], duckK: 0.6 });
// P1 · la burbuja con la voz
pop(T.h1 - 0.02, -40);
s("voice/hector1.wav", T.h1, -3, { voz: true });
// P2 · sorbo y "Doscientos."
s("sfx/whoosh.mp3", T.p2 - 0.04, 0, { techo: -41, dur: 0.35, fin: 0.1 });
s("sfx/sorbo.wav", T.sorbo1, 0, { techo: -38 });
pop(T.bDos1, -37);
// P3a · las burbujas, los números que entran y chocan, el que cae; el banquito
s("sfx/whoosh.mp3", T.p3a - 0.03, 0, { techo: -42, dur: 0.35, fin: 0.1 });
for (const t of [T.b180, T.bDos2, T.b190, T.bDos3]) pop(t, -37);
for (const t of [T.b180, T.b190]) {
  s("sfx/whoosh.mp3", t, 0, { techo: -40, dur: 0.3, fin: 0.08 });          // el número que entra
  s("sfx/key-press.mp3", t + 0.3, 0, { desde: 0.04, techo: -36, pico: -18 }); // choca contra el 200
  s("sfx/sello.wav", t + 0.62, 0, { techo: -42 });                          // se tacha y cae
}
s("sfx/papel.wav", T.banco[0], 0, { desde: 0.0, dur: 0.42, fin: 0.12, techo: -40, lp: 900 });   // el banquito que se arrastra (grave)
s("sfx/tac-real.mp3", T.sienta[1] - 0.05, 0, { techo: -40 });                                 // se sienta
// P3b · el monedero, las monedas (tres torres), el termo vacío
s("sfx/click-soft.mp3", T.abre, 0, { techo: -39 });
for (let i = 0; i < 9; i++) golpecito(T.monedas[0] + i * 0.066, -41 + (i % 3 === 2 ? 2 : 0));
pop(T.bMon, -37);
s("sfx/click-soft.mp3", T.termo[3], 0, { techo: -38 });
// P4 · el rodillo 200 → 195
s("sfx/whoosh.mp3", T.rodillo - 0.05, 0, { techo: -40, dur: 0.3, fin: 0.08 });
for (let i = 0; i < 3; i++) s("sfx/key-press.mp3", T.rodillo + i * 0.07, 0, { desde: 0.04, techo: -39, pico: -18 });
s("voice/ruben1.wav", T.r1, -2.5, { voz: true });
// P5 · "¡Hecho!" y la palmada del choque de manos
pop(T.puno - 0.02, -37);
s("voice/hector2.wav", T.h2, -3, { voz: true });
s("sfx/cachetada.mp3", T.palmada - 0.02, 0, { techo: -35 });
// P6 · billete, tapa de la lata, la moneda; corte de la música; "Dejá."
s("sfx/papel.wav", T.billete, 0, { dur: 0.3, fin: 0.1, techo: -40 });
s("sfx/click-soft.mp3", T.latita, 0, { techo: -38 });
s("sfx/ping.mp3", T.moneda[1] - 0.06, 0, { dur: 0.35, fin: 0.2, techo: -41, pico: -22 });
s("voice/hector3.wav", T.h3, -3, { voz: true });
// P7 · campanita, pasos, las dos voces; P7b · el golpe sordo de la frente
s("sfx/campanita.wav", T.campana, 0, { techo: -36, dur: 0.6 });
for (let t = T.campana + 0.1; t < T.h4 - 0.05; t += 0.24) s("sfx/tac-real.mp3", t, 0, { techo: -42 });
pop(T.h4 - 0.02, -38);
s("voice/hector4.wav", T.h4, -3, { voz: true });
for (let t = T.hSale[0] + 0.05; t < T.hSale[1]; t += 0.26) s("sfx/tac-real.mp3", t, 0, { techo: -44 });
pop(T.g1 - 0.02, -38);
s("voice/graciela1.wav", T.g1, -4, { voz: true });
s("sfx/sello.wav", T.frente[1] - 0.02, 0, { techo: -34 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -36 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -36 });
s("voice/narrador.wav", P1 + 0.2, -5, { voz: true, fi: 0.01, dur: 2.3, fin: 0.1 });
for (const d of [0.2, 1.15]) pop(P1 + d, -39);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -40 });
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -40, lp: 1800 });
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -34, duck: [T.h5 - 0.1, T.r2 + 1.1], duckK: 0.65 });
pop(T.bMeHac, -38);
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.6, fin: 0.08, techo: -35 });
s("sfx/whoosh.mp3", T.q1b - 0.03, 0, { techo: -41, dur: 0.35, fin: 0.1 });
s("sfx/notification.mp3", T.noti, 0, { techo: -38 });
s("sfx/click-soft.mp3", T.late, 0, { techo: -38 });
pop(T.h5 - 0.02, -38);
s("voice/hector5.wav", T.h5, -3, { voz: true });
s("voice/ruben2.wav", T.r2, -2.5, { voz: true });
s("sfx/papel.wav", T.pago - 0.03, 0, { dur: 0.3, fin: 0.1, techo: -39 });
pop(T.pago, -38);
s("sfx/ding.mp3", T.tilde, 0, { techo: -38, dur: 0.9, fin: 0.4 });
s("sfx/sparkle.mp3", T.mas20, 0, { techo: -38, dur: 1.0, fin: 0.4 });
s("sfx/cero.mp3", T.premio, 0, { techo: -36 });
pop(T.puno2 - 0.02, -38);
s("voice/hector6.wav", T.h6, -3, { voz: true });
pop(T.pote2, -36);
s("sfx/campanita.wav", T.campana2, 0, { techo: -37, dur: 0.6 });
s("voice/hector7.wav", T.h7, -3, { voz: true });
pop(T.h7, -39);
for (let t = T.hSale2[0] + 0.05; t < T.hSale2[1]; t += 0.26) s("sfx/tac-real.mp3", t, 0, { techo: -44 });
pop(T.g2 - 0.02, -38);
s("voice/graciela2.wav", T.g2, -4, { voz: true });
s("sfx/scan.mp3", T.scan, 0, { techo: -37 });
s("sfx/cero.mp3", T.ok20, 0, { techo: -37 });
s("sfx/whoosh.mp3", T.cierre - 0.03, 0, { techo: -40, dur: 0.35, fin: 0.1 });

// arreglos por archivo (heredados: tramos mudos al principio, un solo golpe)
for (const x of S) {
  const [f, , , o] = x;
  if (f === "sfx/papel.wav") { o.desde = r2((o.desde ?? 0) + 0.3); if (!o.dur) { o.dur = 0.75; o.fin = 0.2; } }
  if (f === "sfx/sello.wav") { o.dur = 0.3; o.fin = 0.05; }
  if (f === "sfx/campanita.wav") { o.dur = o.dur ?? 0.6; o.fin = Math.min(0.2, o.dur / 2); }
}
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}@${o.lp ?? 0}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const lp = o.lp ? `lowpass=f=${o.lp},` : "";
    // el techo se mide con la sonoridad MOMENTÁNEA máxima del tramo usado (no la integrada) y se guarda el pico
    // verdadero para que ningún transitorio sobresalga en la mezcla
    const txt = execSync(`ffmpeg -hide_banner -nostats ${o.loop ? "-stream_loop 2 " : ""}-i assets/${f} -af "${corte}${lp}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128=peak=true" -f null - 2>&1`).toString();
    const ms = [...txt.matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => Number(m[1])).filter((v) => v > -69);
    const pk = [...txt.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1);
    lufs[k] = { M: ms.length ? Math.max(...ms) : -30, pk: pk ? Number(pk[1]) : -20 };
  }
  return lufs[k];
}
const PICO = Number(process.env.PICO ?? -19);   // pico verdadero máximo de cada efecto en la mezcla cruda
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, (o.techo ?? TECHO) - L.M, (o.pico ?? PICO) - L.pk)); };
function mezcla(lista, salida, dur) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    if (o.loop) args.push("-stream_loop", "2");
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.rev) c += ",areverse";
    if (o.lp) c += `,lowpass=f=${o.lp}`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.fi) c += `,afade=t=in:st=0:d=${o.fi}`;
    if (o.voz) c += ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    if (o.duck) { const [a, b] = o.duck.map((v) => r2(v - ini)); c += `,volume='1-${o.duckK ?? 0.645}*clip((t-${a})/0.15,0,1)*clip((${b}-t)/0.15,0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
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
  // nivel: -14 LUFS lineal (la normalización final, loudnorm de 2 pasadas, va en el render)
  const OBJ = Number(process.env.OBJ ?? -14);
  const txt = execSync(`ffmpeg -hide_banner -i assets/audio/mezcla-cruda.wav -af ebur128 -f null - 2>&1`).toString();
  const I = Number([...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", `volume=${r2(OBJ - I)}dB,atrim=duration=${DUR}`, "-ar", "48000", "assets/audio/mezcla.wav"]);
  if (process.env.MEDIR) fs.writeFileSync("assets/audio/ganancia.txt", String(r2(OBJ - I)));
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre (también en LIMPIO)
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.32);
const IRIS_C = "560px 900px";   // el iris se abre desde la cara de Héctor (Q1, el mismo encuadre de P1)
// la firma (logo) abajo al centro, en las dos partes (no en el cartel ni sobre la línea chica final)
const FIRMAS = [[0, P1], [P2, T.q2b], [T.q3, T.cierre]];   // en Q2b no: taparía la tablet
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
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #fondo { position: absolute; inset: 0; background: #0b1220; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1795px; height: 46px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Héctor</div>
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
      // la parte 2 entra por un iris que se abre desde la cara de Héctor (que vuelve con el mismo pote)
      tl.set("#capa3d", { scale: 1, rotation: 0, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.43)});
      tl.fromTo("#capa3d", { clipPath: "circle(0px at ${IRIS_C})" }, { clipPath: "circle(1700px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s`);
