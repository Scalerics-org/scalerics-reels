// Genera todo me-lo-guardas desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las dos líneas de Rubén (su boca)
//   - compositions/*.html: la capa plana de arriba (la pastilla del día, los mensajes del chat, las dos líneas de
//     Rubén, la respuesta del agente, el cartel, la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (SONIDO, techo por efecto)
// Formato "PARA MANDAR" completo (como abren-hoy-completo, las-siete-y-cincuenta-y-nueve y que-en-paz-descanse) en UN
// solo proyecto: parte 1 (0 a P1), el cartel "Un agente de IA más tarde…" (P1 a P2, HTML debajo del canvas: el canvas
// se va girando y vuelve con un iris) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
const P1 = 14.4;          // termina la parte 1 (arranca el cartel)
const P2 = 17.6;          // arranca la parte 2 (termina el iris del cartel)
const T = {
  // ---- parte 1 ----
  // P1 · plano medio de Rubén: el chat de Walter en su celular, escribe el papelito y lo pega en la bolsa
  notif0: 0.05, escribe: [0.25, 0.85], c3: 0.6, levanta: 1.1, pega: 1.3,
  // P2 · el estante GUARDADOS se llena (mensajes, objetos, contador, días) y se arquea; la telaraña
  p2: 2.1, dejaW: 2.15, m1: 2.45, m2: 2.95, m3: 3.4, maple: 3.78, cosas: [3.95, 4.08, 4.2, 4.3, 4.38], zapallo: 4.2,
  c11: 3.4, rodillo: [3.6, 4.4], arquea: [4.15, 4.5], dia1: 3.0, dia2: 3.9, mes: 4.5, tela: [4.5, 4.78],
  // P3 · entra Graciela (vista hacia la puerta) · P3b contraplano: el hueco de la yerba, las cabezas giran
  p3: 4.8, campana1: 4.85, entraG: [4.85, 5.35], b1: 5.2, p3b: 5.55, giraEst: 5.6, agotada: 5.65, giraCab: [5.95, 6.35],
  // P4 · zambullida al papelito de Walter
  p4: 6.4, dive: [6.4, 7.2], b2: 7.35,
  // P5 · primer plano: se corta la música, gira a cámara, push-in, "Ya viene, Graciela."
  p5: 8.2, corte: 8.2, giraCam: [8.3, 9.0], pushIn: [8.8, 9.1], voz1: 9.21,
  // P6 · Walter en la puerta: "¡Guardame un dulce de leche!" "¡Ya vengo!", 28 y tuba, palmaditas
  p6: 11.4, p6b: 13.3, campana2: 11.45, asoma: [11.45, 11.75], giran: 11.6, levanta2: 11.75, b3: 12.0, b4: 12.55, seVa: [12.6, 12.85], campana3: 12.75, c28: 12.95, palmas: [13.55, 13.95],
  // ---- parte 2 ----
  q1: P2, notif2: 17.7, escribiendo: 17.95, resp1: 18.3, sorbo1: 18.4, tap: 18.95, pagada: 19.0, resp2: 19.35,
  q2: 20.2, c3s: 20.4, vence: 21.1, vuela: [21.35, 21.85],
  q3: 22.4, campana4: 22.5, entraW: [22.5, 23.05], alcanza: 22.95, b5: 23.3,
  q4: 24.4, sorbo2: [24.45, 24.95], baja: 25.05, voz2: 25.15,
  q5: 26.6, b6: 26.65, vibra: 27.15, resp3: 27.2, pulgar: 27.45, q6: 27.85, guino: 28.0,
  cierre: 28.5,
};
const DUR = 30.0;

// palabras de las líneas (relativas al inicio de cada archivo; medidas con tiempos.mjs y la envolvente)
const LINEA1 = [["Ya", 0.04], ["viene,", 0.22], ["Graciela.", 0.62]];
const LINEA2 = [["Ya", 0.03], ["vino,", 0.26], ["Graciela.", 0.56]];

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
const ENV1 = envolvente("assets/voice/ruben1.wav");
const ENV2 = envolvente("assets/voice/ruben2.wav");
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const VOZ1_ENV = ${JSON.stringify(ENV1)};\nexport const VOZ2_ENV = ${JSON.stringify(ENV2)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin contador ni burbujas (fondo de la portada)\n`);

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

// la pastilla del día (abajo a la derecha, como abren-hoy s01-hora): cambia de texto con un flip y un tic
function hora(id, ini, fin, textos, top = 1665) {
  const dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .hora { position: absolute; right: 50px; top: ${top}px; display: flex; align-items: center; gap: 18px; padding: 16px 28px 17px; border-radius: 999px; background: ${NAVY}; border: 5px solid ${CR}; font: 500 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; box-shadow: 0 8px 0 rgba(3,6,12,0.45); transform-origin: 100% 50%; }
    P .hora.mes { border-color: ${G}; }
    P .punto { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }
    P .tx { position: relative; display: inline-block; }
    P .tx span { display: none; white-space: nowrap; }`,
    html: `      <div class="hora"><span class="punto"></span><span class="tx">${textos.map(([, s], i) => `<span class="t${i}">${s}</span>`).join("")}</span></div>`,
    js: `      tl.fromTo(q(".hora"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: true }, 0.0);
      const ts = ${JSON.stringify(textos.map(([t]) => r2(t - ini)))};
      ts.forEach((t, i) => {
        tl.set(q(".t" + i), { display: "inline" }, Math.max(0, t));
        if (i > 0) { tl.set(q(".t" + (i - 1)), { display: "none" }, t); tl.fromTo(q(".hora"), { rotationX: 85, scale: 1.08 }, { rotationX: 0, scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, t); }
      });
      ${textos.some(([, s]) => s.includes("MES")) ? `tl.set(q(".hora"), { className: "hora mes" }, ${r2(textos.find(([, s]) => s.includes("MES"))[0] - ini)});` : ""}
      tl.fromTo(q(".punto"), { opacity: 1 }, { opacity: 0.35, duration: 0.5, yoyo: true, repeat: ${Math.max(1, Math.floor(dur / 0.5) - 2)}, ease: "sine.inOut", immediateRender: false }, 0.4);
      tl.to(q(".hora"), { opacity: 0, y: 30, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.25)});`,
  });
}
hora("s00-hora", 0, T.p5, [[0, "LUNES · 10:15"], [T.dia1, "MIÉRCOLES · 10:15"], [T.dia2, "VIERNES · 10:15"], [T.mes, "UN MES DESPUÉS"]]);

// los mensajes del chat que llegan mientras se llena el estante (P2): pegados arriba a la izquierda, el nuevo empuja
// al viejo, 2 a la vista. Burbuja crema del cliente con su nombre, como en el chat del celular.
{
  const id = "s05-chat", ini = T.m1 - 0.05, fin = T.mes - 0.02, dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const MSJ = [["la del perro", "¿Me separás un queso?", "Paso a la tarde.", T.m1], ["Sr. del 4B", "Guardame 2 flautas,", "ya voy.", T.m2], ["el de la gorra", "¿Me lo guardás", "hasta el lunes?", T.m3]];
  escena(id, dur, {
    css: `
    P .m { position: absolute; left: 40px; top: 300px; max-width: 660px; padding: 18px 30px 22px; border-radius: 34px 34px 34px 10px; background: ${CR}; border: 6px solid ${NAVY}; box-shadow: 8px 10px 0 rgba(11,18,32,0.55); transform-origin: 0% 100%; opacity: 0; }
    P .n { font: 500 34px/1.2 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: #3fa60a; }
    P .x { font: 700 44px/1.16 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }`,
    html: MSJ.map(([n, a, b], i) => `      <div class="m m${i}"><div class="n">${n}</div><div class="x">${a}<br>${b}</div></div>`).join("\n"),
    js: `      const ts = ${JSON.stringify(MSJ.map((m) => r2(m[3] - ini)))};
      const ALTO = 215;
      ts.forEach((t, i) => {
        const m = q(".m" + i);
        tl.fromTo(m, { opacity: 0, scale: 0.6, y: 0 }, { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2.2)", immediateRender: true }, t);
        // los anteriores bajan un lugar; el de hace dos se va
        for (let k = 0; k < i; k++) {
          const mk = q(".m" + k), lugar = i - k;
          tl.to(mk, { y: lugar * ALTO, duration: 0.2, ease: "power2.out" }, t);
          if (lugar >= 2) tl.to(mk, { opacity: 0, x: -60, duration: 0.18, ease: "power2.in" }, t);
        }
      });
      qa(".m").forEach((m) => tl.to(m, { opacity: 0, x: -60, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.22)}));`,
  });
}

// la respuesta del agente pegada a cámara sobre el celular de Rubén (Q5): navy claro con letra crema
{
  const id = "s06-resp", ini = T.resp3 - 0.03, fin = T.cierre - 0.05, dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .r { position: absolute; right: 44px; top: 300px; width: 760px; padding: 22px 32px 24px; border-radius: 34px 34px 10px 34px; background: #16243d; border: 6px solid ${G}; box-shadow: 8px 10px 0 rgba(11,18,32,0.55); transform-origin: 90% 100%; }
    P .x { font: 700 50px/1.18 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .a { margin-top: 12px; font: 500 34px/1.1 "IBM Plex Mono", monospace; color: ${G}; letter-spacing: 0.02em; }`,
    html: `      <div class="r"><div class="x">Reservado. Te espera<br>hasta el viernes.</div><div class="a">respondido automáticamente</div></div>`,
    js: `      tl.fromTo(q(".r"), { opacity: 0, scale: 0.55, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.26, ease: "back.out(2)", immediateRender: true }, 0.03);
      tl.to(q(".r"), { opacity: 0, y: 30, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}

// las líneas de Rubén, palabra por palabra, abajo de su cara; la clave en el recuadro verde
function linea(id, vozT, palabras, clave, fin) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 40px; right: 40px; top: 110px; text-align: center; font: 700 96px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: -5px -5px 0 ${NAVY}, 5px -5px 0 ${NAVY}, -5px 5px 0 ${NAVY}, 5px 5px 0 ${NAVY}, 0 -7px 0 ${NAVY}, 0 7px 0 ${NAVY}, -7px 0 0 ${NAVY}, 7px 0 0 ${NAVY}, 0 12px 0 rgba(11,18,32,0.45); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 18px; }
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
linea("s01-linea", T.voz1, LINEA1, 1, T.p6 - 0.02);
linea("s02-linea", T.voz2, LINEA2, 1, T.q5 - 0.02);

// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas:
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
hora("s04-hora", T.q1 + 0.05, T.q4, [[T.q1 + 0.05, "OTRO LUNES · 10:15"], [T.q3, "VIERNES · 10:15"]]);

// la línea chica final (abajo): una línea y la web
{
  const id = "s03-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1480px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.94); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 50px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA reserva,</div><div class="a">cobra la seña y avisa por vos</div><div class="b">scalerics.com</div></div>`,
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
// ambiente de barrio de mañana (calle.wav dura 15,5 s), con pasabajos: se oye desde adentro del almacén
s("sfx/calle.wav", 0, -6, { dur: P1, fin: 0.3, techo: -36, lp: 1800 });
s("bgm/pizzicato.wav", 0, 0, { desde: 0.4, dur: T.corte, fin: 0.02, techo: -32 });   // la música se corta seca en P5
s("sfx/notification.mp3", T.notif0, 0, { techo: -36 });
s("sfx/papel.wav", T.escribe[0], 0, { dur: 0.6, fin: 0.12, techo: -38 });               // la birome en el papelito
s("sfx/pop.mp3", T.c3, 0, { desde: 0.11, techo: -34 });
s("sfx/key-press.mp3", T.c3 + 0.04, 0, { desde: 0.07, techo: -36 });
s("sfx/papel.wav", T.pega, 0, { dur: 0.22, fin: 0.06, techo: -36 });                    // la cinta
// P2: cada mensaje (burbuja) y cada cosa que cae en el estante (pop con apoyo bajo), el contador, los días
s("sfx/whoosh-short.mp3", T.p2 - 0.02, 0, { techo: -42 });
s("sfx/pop.mp3", T.dejaW, 0, { desde: 0.11, techo: -34 }); s("sfx/sello.wav", T.dejaW + 0.08, -4, { techo: -39 });
const COSAS = [T.m1 + 0.12, T.m2 + 0.12, T.m3 + 0.12, T.maple, ...T.cosas];
for (const [i, t] of COSAS.entries()) { s("sfx/pop.mp3", t, 0, { desde: 0.11, techo: -34 + (i % 3) }); s("sfx/sello.wav", t + 0.06, -4, { techo: -41 }); }
for (const t of [T.m1, T.m2, T.m3]) s("sfx/burbuja.mp3", t, 0);
s("sfx/key-press.mp3", T.c11, 0, { desde: 0.07, techo: -35 });
for (let i = 0; i < 16; i++) { const u = i / 15; s("sfx/key-press.mp3", T.rodillo[0] + (T.rodillo[1] - T.rodillo[0]) * (1 - Math.pow(1 - u, 1.6)), 0, { desde: 0.07, techo: -38 + u * 2 }); }
for (const t of [T.dia1, T.dia2]) s("sfx/tic-real.mp3", t, 0, { techo: -36 });
s("sfx/papel.wav", T.arquea[0], 0, { dur: 0.45, fin: 0.15, techo: -40 });               // la madera que cede
// el mes que pasa: ráfaga de tic/tac acelerando
for (let i = 0, t = T.mes; i < 10; i++) { s(i % 2 ? "sfx/tac-real.mp3" : "sfx/tic-real.mp3", t, 0, { techo: -37 + i * 0.3 }); t += 0.13 * Math.pow(0.86, i); }
// P3: campanita, pasos de Graciela, su burbuja, el AGOTADA, el giro de cabezas
s("sfx/campanita.wav", T.campana1, 0, { techo: -32 });
for (let t = T.entraG[0] + 0.1; t < T.entraG[1]; t += 0.2) s("sfx/tac-real.mp3", t, 0, { techo: -41 });
s("sfx/burbuja.mp3", T.b1, 0);
s("sfx/pop.mp3", T.agotada, 0, { desde: 0.11, techo: -36 });
s("sfx/whoosh-short.mp3", T.giraCab[0] + 0.05, 0, { techo: -41 });
// P4: la zambullida y "¿Y cuándo viene?"
s("sfx/whoosh.mp3", T.dive[0], 0, { techo: -37 });
s("sfx/burbuja.mp3", T.b2, 0);
// P5: se corta la música (solo ambiente), push-in, la voz; después nada
s("sfx/whoosh-short.mp3", T.pushIn[0], 0, { techo: -38 });
s("voice/ruben1.wav", T.voz1, 0, { voz: true });
// P6: Walter en la puerta
s("sfx/campanita.wav", T.campana2, 0, { techo: -32 });
s("sfx/papel.wav", T.levanta2, 0, { dur: 0.3, fin: 0.08, techo: -37 });                // la bolsa que levanta
s("sfx/burbuja.mp3", T.b3, 0);
s("sfx/burbuja.mp3", T.b4, 0);
s("sfx/campanita.wav", T.campana3, 0, { techo: -34 });
s("sfx/key-press.mp3", T.c28, 0, { desde: 0.07, techo: -34 });
s("sfx/tuba.mp3", T.c28 + 0.05, 0, { desde: 0.19, techo: -31 });
for (const t of [T.palmas[0], T.palmas[0] + 0.22]) s("sfx/tac-real.mp3", t, 0, { techo: -40 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -36 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -36 });
s("voice/narrador.wav", P1 + 0.3, 0, { voz: true });
s("sfx/calle.wav", P2 - 1.05, -6, { desde: 5, dur: 1.1, fi: 0.35, fin: 0.05, techo: -40, lp: 1800 });   // cama mínima bajo el final del cartel
s("sfx/whoosh-short.mp3", P2 - 0.38, 0, { techo: -40 });
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -37, lp: 1800 });
s("bgm/pizzicato.wav", P2, 0, { dur: r2(DUR - P2), fin: 0.8, techo: -35, duck: [T.voz2 + 0.02, T.voz2 + 1.4] });
s("sfx/notification.mp3", T.notif2, 0, { techo: -36 });
s("sfx/respuesta.wav", T.resp1, 0, { techo: -35 });
s("sfx/sorbo.wav", T.sorbo1, 0, { techo: -35 });
s("sfx/click-soft.mp3", T.tap, 0, { techo: -35 });
s("sfx/cero.mp3", T.pagada + 0.02, 0, { techo: -34 });
s("sfx/respuesta.wav", T.resp2, 0, { techo: -36 });
s("sfx/whoosh-short.mp3", T.q2 - 0.02, 0, { techo: -42 });
s("sfx/papel.wav", T.c3s - 0.02, 0, { dur: 0.2, fin: 0.06, techo: -37 });               // la raya que tacha el 27
s("sfx/cero.mp3", T.c3s + 0.2, 0, { techo: -33 });                                         // "3 · con seña"
s("sfx/papel.wav", T.vence, 0, { dur: 0.25, fin: 0.06, techo: -37 });                    // la etiqueta "venció"
s("sfx/whoosh-short.mp3", T.vuela[0], 0, { techo: -37 });
s("sfx/pop.mp3", T.vuela[1], 0, { desde: 0.11, techo: -33 }); s("sfx/sello.wav", T.vuela[1] + 0.05, -4, { techo: -38 });
s("sfx/campanita.wav", T.campana4, 0, { techo: -32 });
for (let t = T.entraW[0] + 0.12; t < T.entraW[1]; t += 0.22) s("sfx/tac-real.mp3", t, 0, { techo: -41 });
s("sfx/papel.wav", T.alcanza, 0, { dur: 0.3, fin: 0.08, techo: -37 });                 // la bolsa
s("sfx/burbuja.mp3", T.b5, 0);
s("sfx/sorbo.wav", T.sorbo2[0], 0, { techo: -34 });
s("voice/ruben2.wav", T.voz2, 0, { voz: true });
s("sfx/burbuja.mp3", T.b6, 0);
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.6, fin: 0.08, techo: -33 });
s("sfx/respuesta.wav", T.resp3, 0, { techo: -35 });
s("sfx/chime.mp3", T.guino, 0, { desde: 0.41, techo: -34 });   // chime.mp3 tiene 0,41 s mudos al principio
s("sfx/whoosh-short.mp3", T.cierre - 0.03, 0, { techo: -39 });
s("sfx/campanita.wav", 29.3, 0, { techo: -40 });

// arreglos por archivo (heredados de las-siete: tramos mudos al principio, un solo golpe, burbujas más bajas)
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
    const txt = execSync(`ffmpeg -hide_banner -i assets/${f} -af "${corte}${lp}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128" -f null - 2>&1`).toString();
    const m = [...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
    lufs[k] = m && Number(m[1]) > -69 ? Number(m[1]) : -30;
  }
  return lufs[k];
}
// la cama (música + ambiente) sube CAMA dB: el reel es ralo (la voz suena ~3 s de 30) y, para llegar a -14,5 sin
// aplastar la voz contra el limitador, tiene que sonar más el resto (la voz sigue ≥ 6 LU arriba: medido)
const CAMA = Number(process.env.CAMA ?? 4);
const esCama = (f) => f.startsWith("bgm/") || f === "sfx/calle.wav";
const ganancia = ([f, , db, o]) => (o.voz ? db : r2(Math.min(db, (o.techo ?? TECHO) - lufsTramo(f, o)) + (esCama(f) ? CAMA : 0)));
function mezcla(lista, salida, dur, bus = false) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.lp) c += `,lowpass=f=${o.lp}`;
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
fs.mkdirSync("assets/audio", { recursive: true });
mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
if (process.env.MEDIR) {
  mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
  mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
}
// nivel: -14 LUFS con limitador (el loudnorm del paso 10 casi no toca nada y el AAC no clipea); modo lineal
const OBJ = Number(process.env.OBJ ?? -14.4), LIM = Number(process.env.LIM ?? 0.68);
{
  const txt = execSync(`ffmpeg -hide_banner -i assets/audio/mezcla-cruda.wav -af ebur128 -f null - 2>&1`).toString();
  const I = Number([...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", `volume=${r2(OBJ - I)}dB,aresample=192000,alimiter=limit=${LIM}:level=false:attack=1:release=60,aresample=48000,atrim=duration=${DUR}`, "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre (también en LIMPIO)
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.44);
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
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 700 40px "Caveat"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #fondo { position: absolute; inset: 0; background: #16243d; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1800px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Walter</div>
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
