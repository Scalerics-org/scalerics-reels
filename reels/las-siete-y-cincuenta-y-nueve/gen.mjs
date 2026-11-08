// Genera todo las-siete-y-cincuenta-y-nueve desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las dos líneas de Rubén (su boca)
//   - compositions/*.html: la capa plana de arriba (las dos líneas de Rubén, el cartel, la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (SONIDO, techo por efecto)
// Formato "PARA MANDAR" completo (como abren-hoy-completo) pero en UN solo proyecto: parte 1 (0 a P1), el cartel
// "Una tienda online más tarde…" (P1 a P2, HTML debajo del canvas: el canvas se va girando y vuelve con un iris) y
// la parte 2 (P2 a DUR). Sin narrador de marca y sin tarjeta de videollamada: la línea chica al final.
// LIMPIO=1 node gen.mjs: sin capa plana ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
let P1 = 14.6;          // termina la parte 1 (arranca el cartel)
let P2 = 17.8;          // arranca la parte 2 (termina el iris del cartel)
const T = {
  // ---- parte 1 ----
  baja: [0.05, 1.1],                     // Rubén baja la cortina con el gancho
  corre: [0.3, 1.15], frena: 1.15,      // Walter entra corriendo y clava la cortina
  b1: 1.35,                              // "¡Pará, pará!"
  p2: 2.0, miraHora: 2.3, resopla: 2.6,  // contraplano: Rubén lo mira, mira la hora, resopla
  p3: 2.9, b2: 3.1, papelito: 3.4,       // primer plano de Walter: "¡Perdón! Es una cosita nomás." y el papelito
  sube: [3.75, 4.25],                    // la cortina sube (detrás de Walter)
  p4: 4.3, entra: [4.3, 4.7], apoya: 4.55, deja: 4.82, alivio: 5.05, p4b: 4.95,
  suelta: 5.75,                          // Walter suelta una punta: la lista se desenrolla
  p5: 5.75, rodar: [5.75, 7.15], grua: [6.95, 7.55], cordon: 6.51, // cordon: el rollo baja del cordón (calculado sobre la curva de tres.js)
  p6: 7.55,                              // montaje: el mostrador se llena
  items: [7.75, 8.0, 8.25, 8.5, 8.75, 9.0, 9.25],
  ay1: 8.05, ay2: 9.05,                  // "Ah, y…" "Ah, y…"
  h2000: 7.8, h2007: 8.5, h2023: 9.3,
  p7: 9.8, tacha: [9.85, 10.1], sonrie: 10.12, vuelta: 10.3, corte: 10.48,
  p8: 10.6, pushIn: [11.0, 11.42], solapas: [11.3, 11.75], cuelga: 11.8,
  voz1: 10.65,                           // archivo de la voz 1 (suspiro + "Sacate la campera, Walter.")
  remate: 13.75, h2041: 13.8,
  // ---- parte 2 ----
  pA: P2, tildes: 18.05, pagar: 19.2, pagado: 19.38,
  pB: 19.8, vibra: 19.95, sorboB: 20.1, embolsa: [20.45, 21.3], abrocha: 21.48,
  pC: 22.1, llega: [22.3, 22.85], agarra: 22.7, da: 22.95, b3: 23.2, seVa: 23.5, frenaVuelta: 23.75, b4: 23.73,
  pD: 24.55, voz2: 23.95,                 // archivo de la voz 2 ("Está en la bolsa, Walter.")
  pIns: 26.25, saluda: 26.6,
  pE: 27.0, tiron: [27.1, 27.38], h2000b: 27.42, sorboE: 27.95, aCamara: 28.35, guino: 28.65,
  cierre: 28.5,
};
let DUR = 30.4;
// ronda 1 (revisores): el montaje arranca 0,2 s después (la lista rueda más lento) y después de que Walter da vuelta
// el papel entra un inserto del dorso "ATRÁS" a cuadro lleno (~1,1 s): todo lo que sigue se corre
function corre(desde, d) {
  for (const k in T) T[k] = Array.isArray(T[k]) ? T[k].map((v) => (v >= desde ? r2(v + d) : v)) : T[k] >= desde ? r2(T[k] + d) : T[k];
  if (P1 >= desde) P1 = r2(P1 + d); if (P2 >= desde) P2 = r2(P2 + d); DUR = r2(DUR + d);
}
corre(7.5, 0.2);
T.rodar = [5.75, 7.35]; T.grua = [7.15, 7.75];
corre(T.p8, 0.97);
T.pAtras = r2(T.vuelta + 0.14);     // inserto del dorso
T.corte = r2(T.pAtras + 0.06);      // la música se corta seca cuando se ve el ATRÁS
T.pA = P2;
// ronda 2: el 20:41 queda quieto ~1,4 s antes del giro al cartel (el remate entra apenas termina la frase)
T.remate = r2(T.voz1 + 3.1); T.h2041 = r2(T.remate + 0.05);
corre(P1, 0.5);
// ronda 2: el plano B arranca con un inserto del aviso en el celular de Rubén (de frente, ~0,75 s)
T.pBgen = r2(T.pB + 0.75); T.vibra = r2(T.pB + 0.1); T.sorboB = r2(T.pB + 0.85);
T.embolsa = [r2(T.pB + 1.05), r2(T.pB + 1.75)]; T.abrocha = r2(T.pB + 1.95);
corre(T.pC, 0.15);

// palabras de las líneas (relativas al inicio de cada archivo; medidas con tiempos.mjs y la envolvente)
const LINEA1 = [["Sacate", 0.9], ["la", 1.38], ["campera,", 1.62], ["Walter.", 2.22]];
const LINEA2 = [["Está", 0.28], ["en", 0.6], ["la", 0.8], ["bolsa,", 0.9], ["Walter.", 1.2]];

// ---------- envolventes de las voces a 30 cuadros por segundo (para mover la boca) ----------
function envolvente(archivo, mudo = 0) {
  const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", archivo, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
  const env = [];
  for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
    let s = 0, c = 0;
    for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
    env.push(Math.sqrt(s / Math.max(1, c)));
  }
  const mx = Math.max(...env);
  const E = env.map((v) => { const k = v / mx; return r2(k < 0.1 ? 0 : Math.pow(k, 0.8)); });
  for (let i = 0; i < Math.round(mudo * 30); i++) E[i] = 0; // el suspiro no mueve la boca
  return E;
}
const ENV1 = envolvente("assets/voice/ruben1.wav", 0.85);
const ENV2 = envolvente("assets/voice/ruben2.wav", 0.2);
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const VOZ1_ENV = ${JSON.stringify(ENV1)};\nexport const VOZ2_ENV = ${JSON.stringify(ENV2)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin chip ni burbujas (fondo de la portada)\n`);

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
const ESC = [];     // [id, inicio, duración, capa]  capa: "arriba" (sobre el canvas) o "abajo" (el cartel)

// las líneas de Rubén, palabra por palabra, abajo de su cara; la clave en el recuadro verde
function linea(id, vozT, palabras, clave, fin) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 40px; right: 40px; top: 1540px; text-align: center; font: 700 86px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: -5px -5px 0 ${NAVY}, 5px -5px 0 ${NAVY}, -5px 5px 0 ${NAVY}, 5px 5px 0 ${NAVY}, 0 -7px 0 ${NAVY}, 0 7px 0 ${NAVY}, -7px 0 0 ${NAVY}, 7px 0 0 ${NAVY}, 0 12px 0 rgba(11,18,32,0.45); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 14px; }
    P .w.ac em { color: ${NAVY}; text-shadow: none; }
    P .caja { position: absolute; left: -16px; right: -16px; top: 4px; bottom: 0; border: 5px solid ${NAVY}; background: ${G}; border-radius: 6px; }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${NAVY}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        // la palabra entra entera (sin fundido gris): aparece y rebota en escala
        tl.set(w, { opacity: 1 }, t);
        tl.fromTo(w, { y: 18, scale: 0.86 }, { y: 0, scale: 1, duration: 0.12, ease: "back.out(2)", immediateRender: false }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t);
      }
      tl.to(q(".linea"), { opacity: 0, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}
linea("s01-linea", T.voz1, LINEA1, 3, T.remate - 0.02);
linea("s02-linea", T.voz2, LINEA2, 3, T.pIns - 0.02);

// el cartel "Una tienda online más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas:
// el canvas se va girando (último cuadro de la parte 1) y vuelve abriéndose en un iris (primer cuadro de la parte 2).
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 650px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 166px; margin-top: 10px; }
    P .linea.c { font-size: 136px; margin-top: 22px; }
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
        ${lin("a", ["Una", "tienda"])}
        ${lin("b", ["online"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = 0.3 + i * 0.035;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.25, duration: 0.45, ease: "power2.in" }, ${r2(dur - 0.45)});`,
  });
}

// la línea chica final (abajo): una línea y la web
{
  const id = "s03-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1480px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.92); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 48px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Una tienda online toma</div><div class="a">el pedido y lo cobra por vos</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), voz: true (sin techo) }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS medido en el tramo que suena;
// las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
// ---- parte 1 ----
s("sfx/calle.wav", 0, -6, { dur: 15.4, fin: 0.4, techo: -35 });
s("sfx/calle.wav", 15.0, -6, { desde: 1, dur: r2(P1 - 15.0), fin: 0.3, techo: -35 });   // calle.wav dura 15,5 s: se encadena otro tramo
s("bgm/pizzicato.wav", 0, 0, { dur: T.corte, fin: 0.04, techo: -33 });                // la música se corta seca
// cortina que baja: traqueteo de lamas (tac/tic alternados) y el golpe cuando Walter la clava
for (let i = 0, t = T.baja[0]; t < T.frena - 0.05; i++, t += 0.085) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, -2, { techo: -36 });
// pasos corriendo de Walter
for (let t = T.corre[0]; t < T.frena; t += 0.14) s("sfx/tac-real.mp3", t, 0, { techo: -33 });
s("sfx/sello.wav", T.frena, 0, { techo: -37 });                                                         // clanc: la mano frena la cortina
s("sfx/burbuja.mp3", T.b1 + 0.03, 0);
s("sfx/whoosh-short.mp3", T.miraHora - 0.05, 0, { techo: -38 });
s("voice/ruben1.wav", T.resopla, 0, { desde: 0.4, dur: 0.45, fin: 0.15, techo: -34 });     // el resoplido (el suspiro de su toma)
s("sfx/burbuja.mp3", T.b2 + 0.03, 0);
s("sfx/papel.wav", T.papelito, 0, { dur: 0.35, fin: 0.1, techo: -34 });
for (let i = 0, t = T.sube[0]; t < T.sube[1]; i++, t += 0.07) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, 0, { techo: -36 });
s("sfx/sello.wav", T.sube[1], -4, { techo: -36 });
for (let t = T.entra[0]; t < T.entra[1]; t += 0.3) s("sfx/tic-real.mp3", t, 0, { techo: -38 });
s("sfx/papel.wav", T.deja - 0.05, 0, { dur: 0.3, fin: 0.1, techo: -34 });
// la lista que se desenrolla: papel que crece, el tuc del cordón y el whoosh de la grúa
s("sfx/papel.wav", T.suelta, 0, { techo: -33 });
s("sfx/papel.wav", T.suelta + 0.45, 0, { techo: -32 });
s("sfx/papel.wav", T.suelta + 0.9, 0, { techo: -31 });
s("sfx/whoosh.mp3", T.suelta + 0.3, 0, { techo: -34 });
s("sfx/sello.wav", T.cordon, -4, { techo: -35 });
s("sfx/sello.wav", T.cordon + 0.32, -4, { techo: -41 });
s("sfx/whoosh.mp3", T.grua[0], 0);
// montaje: pop por objeto (tonos variados), tic + campanita del reloj, "Ah, y…", tachones
T.items.forEach((t, i) => s(i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", t, 0, { techo: -31 - (i % 3), ...(i % 2 ? {} : { desde: 0.11 }) }));
for (const t of [T.h2000, T.h2007, T.h2023]) s("sfx/tic-real.mp3", t + 0.08, 0);
s("sfx/campanita.wav", T.h2000 + 0.1, 0, { techo: -33 });
s("sfx/burbuja.mp3", T.ay1 + 0.03, 0);
s("sfx/burbuja.mp3", T.ay2 + 0.03, 0);
for (const t of [8.5, 9.05, 9.75]) s("sfx/papel.wav", t, 0, { dur: 0.22, fin: 0.08, techo: -36 });
for (let t = T.p6 + 0.1; t < T.p7 - 0.1; t += 0.32) s("sfx/tic-real.mp3", t, 0, { techo: -42 });  // pasos de Rubén
s("sfx/papel.wav", T.tacha[0], 0, { dur: 0.25, fin: 0.08, techo: -34 });
s("sfx/papel.wav", T.vuelta, 0, { dur: 0.4, fin: 0.12 });
s("sfx/whoosh.mp3", T.pushIn[0], 0, { techo: -44 });
s("sfx/whoosh-short.mp3", T.cuelga - 0.02, 0, { techo: -40 });
s("voice/ruben1.wav", T.voz1, 0, { voz: true });
s("sfx/tuba.mp3", T.h2041 + 0.12, 0, { desde: 0.19, techo: -31 });
s("sfx/tic-real.mp3", T.h2041 + 0.08, 0);
s("sfx/whoosh-short.mp3", T.remate + 0.25, 0, { techo: -40 });              // Walter se saca la campera
s("sfx/sello.wav", T.remate + 0.12, -6, { techo: -38 });                                // el cajón cruje cuando se sienta
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -36 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -36 });
s("voice/narrador.wav", P1 + 0.22, 0, { voz: true });
s("sfx/whoosh-short.mp3", P2 - 0.38, 0, { techo: -40 });
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -37 });
s("bgm/pizzicato.wav", P2, 0, { dur: 12, fin: 0.8, techo: -36, duck: [T.voz2 + 0.1, T.voz2 + 2.95] });
for (let i = 0; i < 10; i++) s("sfx/key-press.mp3", T.tildes + i * 0.15, 0, { desde: 0.07, techo: -37 });
s("sfx/key-press.mp3", T.pagado - 0.05, 0, { desde: 0.07, techo: -33 });
s("sfx/cero.mp3", T.pagado, 0, { techo: -33 });
s("sfx/whoosh-short.mp3", T.pB - 0.05, 0, { techo: -38 });
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.7, fin: 0.08, techo: -32 });
s("sfx/sorbo.wav", T.sorboB, 0, { techo: -36 });
for (let i = 0; i < 7; i++) s(i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", T.embolsa[0] + i * 0.1, 0, { techo: -33 - (i % 2), ...(i % 2 ? {} : { desde: 0.11 }) });
s("sfx/papel.wav", T.embolsa[1] - 0.1, 0, { dur: 0.4, fin: 0.12, techo: -34 });
s("sfx/sello.wav", T.abrocha, 0, { techo: -35 });                                                     // la abrochadora: clac
for (let t = T.llega[0]; t < T.llega[1]; t += 0.28) s("sfx/tic-real.mp3", t, 0, { techo: -38 });
s("sfx/papel.wav", T.agarra, 0, { dur: 0.35, fin: 0.1, techo: -34 });
s("sfx/burbuja.mp3", T.b3 + 0.03, 0);
s("sfx/burbuja.mp3", T.b4 + 0.03, 0);
for (const t of [T.seVa + 0.3, T.seVa + 0.55]) s("sfx/tic-real.mp3", t, 0, { techo: -42 });   // dos pasos al irse
s("voice/ruben2.wav", T.voz2, 0, { voz: true });
s("sfx/papel.wav", T.pIns + 0.12, 0, { dur: 0.4, fin: 0.12, techo: -42 });
s("sfx/pop.mp3", T.pIns + 0.25, 0, { desde: 0.11, techo: -41 });
for (let i = 0, t = T.tiron[0]; t < T.tiron[1]; i++, t += 0.05) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, 0, { techo: -35 });
s("sfx/sello.wav", T.tiron[1], 0, { techo: -35 });
s("sfx/cero.mp3", T.h2000b, 0, { techo: -35 });
s("sfx/sorbo.wav", T.sorboE, 0, { techo: -36 });
s("sfx/click-soft.mp3", T.guino, 0, { techo: -33 });
s("sfx/whoosh-short.mp3", T.cierre, 0, { techo: -36 });

// ronda 2: arreglos por archivo (tramos mudos al principio, segundos golpes sin acción, burbujas más bajas)
for (const x of S) {
  const [f, , , o] = x;
  if (f === "sfx/papel.wav") { o.desde = r2((o.desde ?? 0) + 0.3); if (!o.dur) { o.dur = 0.75; o.fin = 0.2; } }
  if (f === "sfx/sello.wav") { o.dur = 0.3; o.fin = 0.05; }
  if (f === "sfx/campanita.wav") { o.dur = 0.35; o.fin = 0.08; }
  if (f === "sfx/burbuja.mp3") { x[1] = r2(Math.max(0, x[1] - 0.03)); o.desde = 0.04; o.techo = (o.techo ?? TECHO) - 3; }
}
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const txt = execSync(`ffmpeg -hide_banner -i assets/${f} -af "${corte}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128" -f null - 2>&1`).toString();
    const m = [...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
    lufs[k] = m && Number(m[1]) > -69 ? Number(m[1]) : -30;
  }
  return lufs[k];
}
// ronda 2: la cama (música + ambiente) sube CAMA dB: el reel es ralo (la voz suena ~6 s de 32) y, para llegar a -14,5
// sin aplastar la voz contra el limitador, tiene que sonar más el resto (la voz sigue ≥ 6 LU arriba: medido)
const CAMA = Number(process.env.CAMA ?? 4);
const esCama = (f) => f.startsWith("bgm/") || f === "sfx/calle.wav";
const ganancia = ([f, , db, o]) => (o.voz ? db : r2(Math.min(db, (o.techo ?? TECHO) - lufsTramo(f, o)) + (esCama(f) ? CAMA : 0)));
function mezcla(lista, salida, dur, bus = false) {  // bus: compresor suave en la suma (baja los picos sueltos)
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.voz) c += ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.42:attack=1.5:release=40:level=false"; // la voz llega al limitador ya pareja
    c += `,volume=${ganancia(x)}dB`;
    if (o.duck) { const [a, b] = o.duck.map((v) => r2(v - ini)); c += `,volume='1-0.645*clip((t-${a})/0.15,0,1)*clip((${b}-t)/0.15,0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}${bus ? ",acompressor=threshold=-30dB:ratio=2.5:attack=5:release=120:makeup=1" : ""}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
fs.mkdirSync("assets/audio", { recursive: true });
mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
if (process.env.MEDIR) {
  mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
  mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
}
// nivel: -14 LUFS con limitador a -4,4 dBFS (el loudnorm del paso 10 casi no toca nada y el AAC no clipea)
const OBJ = Number(process.env.OBJ ?? -14.4), LIM = Number(process.env.LIM ?? 0.68);
// ronda 1: en modo LINEAL (una ganancia fija): el loudnorm dinámico dejaba la parte 2 ~10 LU más baja
{
  const txt = execSync(`ffmpeg -hide_banner -i assets/audio/mezcla-cruda.wav -af ebur128 -f null - 2>&1`).toString();
  const I = Number([...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", `volume=${r2(OBJ - I)}dB,aresample=192000,alimiter=limit=${LIM}:level=false:attack=1:release=60,aresample=48000`, "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre (también en LIMPIO)
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.44);
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #fondo { position: absolute; inset: 0; background: ${NAVY}; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1800px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
      #precarga { position: absolute; left: -9999px; font: 400 40px "Caveat"; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
${LIMPIO ? "" : `      <img id="firma1" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${T.pAtras}" data-track-index="9" />
      <img id="firma1b" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="${T.p8}" data-duration="${r2(P1 - T.p8)}" data-track-index="9" />
      <img id="firma2" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="${P2}" data-duration="${r2(DUR - P2)}" data-track-index="9" />`}
      <div id="precarga">Yerba ATRÁS</div>
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
      // la parte 2 entra por un iris que se abre desde el centro
      tl.set("#capa3d", { scale: 1, rotation: 0, clipPath: "circle(0px at 540px 960px)" }, ${r2(ROT + 0.43)});
      tl.fromTo("#capa3d", { clipPath: "circle(0px at 540px 960px)" }, { clipPath: "circle(1150px at 540px 960px)", duration: 0.42, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s`);
