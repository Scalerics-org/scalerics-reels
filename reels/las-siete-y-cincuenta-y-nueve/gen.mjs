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
const P1 = 14.6;          // termina la parte 1 (arranca el cartel)
const P2 = 17.8;          // arranca la parte 2 (termina el iris del cartel)
const T = {
  // ---- parte 1 ----
  baja: [0.05, 1.1],                     // Rubén baja la cortina con el gancho
  corre: [0.55, 1.15], frena: 1.15,      // Walter entra corriendo y clava la cortina
  b1: 1.35,                              // "¡Pará, pará!"
  p2: 2.0, miraHora: 2.3, resopla: 2.6,  // contraplano: Rubén lo mira, mira la hora, resopla
  p3: 2.9, b2: 3.1, papelito: 3.4,       // primer plano de Walter: "¡Perdón! Es una cosita nomás." y el papelito
  sube: [3.75, 4.25],                    // la cortina sube (detrás de Walter)
  p4: 4.3, entra: [4.3, 4.95], apoya: 4.55, deja: 4.95, alivio: 5.2,
  suelta: 5.75,                          // Walter suelta una punta: la lista se desenrolla
  p5: 5.75, rodar: [5.75, 7.15], grua: [6.95, 7.55],
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
  pC: 22.1, llega: [22.3, 22.85], agarra: 22.7, da: 22.95, b3: 23.2, seVa: 23.5, frenaVuelta: 23.75, b4: 23.85,
  pD: 24.1, voz2: 23.95,                 // archivo de la voz 2 ("Está en la bolsa, Walter.")
  pIns: 26.25, saluda: 26.6,
  pE: 27.0, tiron: [27.1, 27.38], h2000b: 27.42, sorboE: 27.95, aCamara: 28.35, guino: 28.65,
  cierre: 28.5,
};
const DUR = 30.4;

// palabras de las líneas (relativas al inicio de cada archivo; medidas con tiempos.mjs y la envolvente)
const LINEA1 = [["Sacate", 0.92], ["la", 1.5], ["campera,", 1.62], ["Walter.", 2.22]];
const LINEA2 = [["Está", 0.27], ["en", 0.78], ["la", 0.88], ["bolsa,", 1.0], ["Walter.", 1.62]];

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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const VOZ1_ENV = ${JSON.stringify(ENV1)};\nexport const VOZ2_ENV = ${JSON.stringify(ENV2)};\n`);

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
    P .linea { position: absolute; left: 40px; right: 40px; top: 1420px; text-align: center; font: 700 86px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: -5px -5px 0 ${NAVY}, 5px -5px 0 ${NAVY}, -5px 5px 0 ${NAVY}, 5px 5px 0 ${NAVY}, 0 -7px 0 ${NAVY}, 0 7px 0 ${NAVY}, -7px 0 0 ${NAVY}, 7px 0 0 ${NAVY}, 0 12px 0 rgba(11,18,32,0.45); }
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
        tl.fromTo(w, { opacity: 0, y: 18, scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out", immediateRender: true }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { opacity: 0, scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t + 0.04);
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
          <circle class="bu" cx="300" cy="1300" r="34" fill="none" stroke="${CR}" stroke-width="10"/>
          <circle class="bu" cx="1180" cy="1200" r="26" fill="none" stroke="${CR}" stroke-width="9"/>
          <circle class="bu" cx="420" cy="980" r="18" fill="none" stroke="${NAVY}" stroke-width="8"/>
          <circle class="bu" cx="1100" cy="1500" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
          <circle class="bu" cx="760" cy="1720" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
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
    html: `      <div class="caja"><div class="a">Tu tienda online toma</div><div class="a">el pedido y lo cobra</div><div class="b">scalerics.com</div></div>`,
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
s("sfx/calle.wav", 0, -6, { dur: P1, fin: 0.3, desde: 0.5, techo: -35 });
s("bgm/pizzicato.wav", 0, 0, { dur: T.corte, fin: 0.04, techo: -33 });                // la música se corta seca
// cortina que baja: traqueteo de lamas (tac/tic alternados) y el golpe cuando Walter la clava
for (let i = 0, t = T.baja[0]; t < T.frena - 0.05; i++, t += 0.085) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, -2, { techo: -36 });
// pasos corriendo de Walter
for (let t = T.corre[0]; t < T.frena; t += 0.14) s("sfx/tac-real.mp3", t, 0, { techo: -33 });
s("sfx/golpe.mp3", T.frena, 0);                                                         // clanc: la mano frena la cortina
s("sfx/burbuja.mp3", T.b1 + 0.03, 0);
s("sfx/whoosh-short.mp3", T.miraHora - 0.05, 0, { techo: -38 });
s("sfx/burbuja.mp3", T.b2 + 0.03, 0);
s("sfx/papel.wav", T.papelito, 0, { dur: 0.35, fin: 0.1, techo: -34 });
for (let i = 0, t = T.sube[0]; t < T.sube[1]; i++, t += 0.07) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, 0, { techo: -36 });
s("sfx/golpe.mp3", T.sube[1], -4, { techo: -36 });
for (let t = T.entra[0]; t < T.entra[1]; t += 0.3) s("sfx/tic-real.mp3", t, 0, { techo: -38 });
s("sfx/pop.mp3", T.apoya, 0, { techo: -35 });
s("sfx/papel.wav", T.deja - 0.05, 0, { dur: 0.3, fin: 0.1, techo: -34 });
// la lista que se desenrolla: papel que crece, el tuc del cordón y el whoosh de la grúa
s("sfx/papel.wav", T.suelta, 0, { techo: -33 });
s("sfx/papel.wav", T.suelta + 0.45, 0, { techo: -32 });
s("sfx/papel.wav", T.suelta + 0.9, 0, { techo: -31 });
s("sfx/whoosh.mp3", T.suelta + 0.3, 0, { techo: -34 });
s("sfx/golpe.mp3", 6.62, -4, { techo: -35 });
s("sfx/whoosh.mp3", T.grua[0], 0);
// montaje: pop por objeto (tonos variados), tic + campanita del reloj, "Ah, y…", tachones
T.items.forEach((t, i) => s(i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", t, 0, { techo: -31 - (i % 3) }));
for (const t of [T.h2000, T.h2007, T.h2023]) s("sfx/tic-real.mp3", t, 0);
s("sfx/campanita.wav", T.h2000 + 0.02, 0, { techo: -33 });
s("sfx/burbuja.mp3", T.ay1 + 0.03, 0);
s("sfx/burbuja.mp3", T.ay2 + 0.03, 0);
for (const t of [8.3, 8.85, 9.55]) s("sfx/papel.wav", t, 0, { dur: 0.22, fin: 0.08, techo: -36 });
for (let t = T.p6 + 0.1; t < T.p7 - 0.1; t += 0.32) s("sfx/tic-real.mp3", t, 0, { techo: -42 });  // pasos de Rubén
s("sfx/papel.wav", T.tacha[0], 0, { dur: 0.25, fin: 0.08, techo: -34 });
s("sfx/papel.wav", T.vuelta, 0, { dur: 0.4, fin: 0.12 });
s("sfx/whoosh.mp3", T.pushIn[0], 0, { techo: -33 });
s("sfx/papel.wav", T.solapas[0], 0, { dur: 0.45, fin: 0.15, techo: -37 });           // roce de la campera
s("sfx/whoosh-short.mp3", T.cuelga - 0.02, 0, { techo: -37 });
s("voice/ruben1.wav", T.voz1, 0, { voz: true });
s("sfx/tuba.mp3", T.h2041 + 0.02, 0, { techo: -29.5 });
s("sfx/tic-real.mp3", T.h2041, 0);
s("sfx/golpe.mp3", T.remate + 0.12, -6, { techo: -38 });                                // el cajón cruje cuando se sienta
// ---- cartel ----
s("sfx/whoosh.mp3", P1, 0);
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -29 });
s("voice/narrador.wav", P1 + 0.3, 0, { voz: true });
s("sfx/whoosh-short.mp3", P2 - 0.46, 0);
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -37 });
s("bgm/pizzicato.wav", P2, 0, { dur: r2(DUR - P2), fin: 0.4, techo: -36, duck: [T.voz2 + 0.1, T.voz2 + 2.4] });
for (let i = 0; i < 7; i++) s("sfx/key-press.mp3", T.tildes + i * 0.15, 0, { techo: -36 });
s("sfx/key-press.mp3", T.pagar, 0, { techo: -33 });
s("sfx/cero.mp3", T.pagado, 0, { techo: -30 });
s("sfx/whoosh-short.mp3", T.pB - 0.05, 0, { techo: -38 });
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.7, fin: 0.08, techo: -32 });
s("sfx/sorbo.wav", T.sorboB, 0, { techo: -33 });
for (let i = 0; i < 7; i++) s(i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", T.embolsa[0] + i * 0.13, 0, { techo: -33 - (i % 2) });
s("sfx/papel.wav", T.embolsa[1] - 0.1, 0, { dur: 0.4, fin: 0.12, techo: -34 });
s("sfx/sello.wav", T.abrocha, 0);                                                     // la abrochadora: clac
for (let t = T.llega[0]; t < T.llega[1]; t += 0.28) s("sfx/tic-real.mp3", t, 0, { techo: -38 });
s("sfx/papel.wav", T.agarra, 0, { dur: 0.35, fin: 0.1, techo: -34 });
s("sfx/burbuja.mp3", T.b3 + 0.03, 0);
s("sfx/burbuja.mp3", T.b4 + 0.03, 0);
s("voice/ruben2.wav", T.voz2, 0, { voz: true });
s("sfx/papel.wav", T.pIns + 0.05, 0, { dur: 0.4, fin: 0.12, techo: -35 });
s("sfx/pop.mp3", T.pIns + 0.2, 0, { techo: -34 });
for (let i = 0, t = T.tiron[0]; t < T.tiron[1]; i++, t += 0.05) s(i % 2 ? "sfx/tic-real.mp3" : "sfx/tac-real.mp3", t, 0, { techo: -35 });
s("sfx/golpe.mp3", T.tiron[1], 0);
s("sfx/cero.mp3", T.h2000b, 0, { techo: -29 });
s("sfx/sorbo.wav", T.sorboE, 0, { techo: -33 });
s("sfx/click-soft.mp3", T.guino, 0, { techo: -33 });
s("sfx/whoosh-short.mp3", T.cierre, 0, { techo: -36 });

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
const ganancia = ([f, , db, o]) => (o.voz ? db : r2(Math.min(db, (o.techo ?? TECHO) - lufsTramo(f, o))));
function mezcla(lista, salida, dur) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    c += `,volume=${ganancia(x)}dB`;
    if (o.duck) { const [a, b] = o.duck.map((v) => r2(v - ini)); c += `,volume='if(between(t,${a},${b}),0.355,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
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
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "loudnorm=I=-14:TP=-3:LRA=11,alimiter=limit=0.6:level=false", "-ar", "48000", "assets/audio/mezcla.wav"]);

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
      .firma { position: absolute; left: 50%; top: 1800px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 4; }
      #precarga { position: absolute; left: -9999px; font: 400 40px "Caveat"; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
${LIMPIO ? "" : `      <img id="firma1" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${P1}" data-track-index="9" />
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
