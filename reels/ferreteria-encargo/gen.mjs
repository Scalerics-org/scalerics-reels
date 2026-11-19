// Genera todo ferreteria-encargo desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Un agente de IA más tarde…",
//     "Comentá OBRA" y la línea chica final); las burbujas de diálogo, los audios y los chats son 3D pegados a la cámara
//     (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra) con el formato completo: parte 1 (0 a P1), el cartel (P1 a
// P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): s1 Susana "Gustavo, ¿tenés este cartucho? Me gotea la
// canilla." (P1 y Q1) · g2 Gustavo "Ese no me queda. Te lo encargo." · g3 "Dejame tu número." (P1b, P5, Q1, Q5) · t4 Tito
// "Seis tornillos del ocho." (P2 y Q2) · s5 "Gustavo, ¿llegó lo mío?" · g6 "Elegí." · s7 "Ya lo compré." · s8 "¿Me
// encargás este?" (P5 y Q5) · nar "Un sistema más tarde." · s10 "¡Llegó lo mío!" · s11 "Ya lo tenés." · g12 "Comentá
// ENCARGO y te mando cómo funciona para tu ferretería."
const VOCES = ["s1", "g2", "g3", "t4", "s5", "g6", "s7", "s8", "s10", "s11", "g12"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: Susana levanta la bolsita con el cartucho con sarro: "Gustavo, ¿tenés este cartucho? Me gotea la
// canilla." · Gustavo lo saca y lo mide (inserto del calibre "35") · "Ese no me queda. Te lo encargo."
T.s1 = 0.12; T.agarra = r2(T.s1 + LEN.s1 * 0.55); T.insCal = [r2(T.s1 + LEN.s1 - 0.15), r2(T.s1 + LEN.s1 + 0.35)];
T.g2 = r2(T.s1 + LEN.s1 + 0.12);
// P1b · las manos: arranca el papel, "Dejame tu número.", escribe, lo pega en la caja registradora
T.p1b = r2(T.g2 + LEN.g2 + 0.06); T.arranca = r2(T.p1b + 0.05); T.g3 = r2(T.p1b + 0.12);
T.escribe = [r2(T.p1b + 0.4), r2(T.p1b + 1.1)]; T.pega = r2(T.escribe[1] + 0.22);
// P2 · Tito con los codos: "Seis tornillos del ocho." · el cajoncito 8 · despega el papelito sin mirar · el cucurucho
T.p2 = r2(T.pega + 0.22); T.t4 = r2(T.p2 + 0.1); T.cajon8 = r2(T.t4 + 0.3); T.despega = r2(T.cajon8 + 0.62);
T.insCuc = [r2(T.despega + 0.25), r2(T.despega + 0.72)]; T.da = r2(T.insCuc[1] + 0.25);
// P3 · martes: la caja del proveedor, el blíster, la caja registradora (solo la cinta), "?", el cajón ENCARGOS, el rótulo
T.p3 = r2(T.da + 0.35); T.mira = r2(T.p3 + 0.4); T.preg = r2(T.p3 + 0.55); T.abre = r2(T.p3 + 0.95); T.mete = r2(T.p3 + 1.35); T.rot1 = r2(T.p3 + 1.45);
// P4 · el remate: "Gustavo, ¿llegó lo mío?" · saca el cajón inclinado · pausa · "Elegí."
T.p4 = r2(T.p3 + 2.25); T.s5 = r2(T.p4 + 0.15); T.saca = r2(T.s5 + LEN.s5 + 0.02); T.g6 = r2(T.s5 + LEN.s5 + 0.62);
// P5 · contraplano a Susana: "Ya lo compré." + rótulo · levanta la bolsita del flotador: "¿Me encargás este?" · P5b las
// manos de vuelta: ya arrancando papel: "Dejame tu número."
T.p5 = r2(T.g6 + LEN.g6 + 0.2); T.s7 = r2(T.p5 + 0.1); T.rot2 = r2(T.s7 + 0.3); T.s8 = r2(T.s7 + LEN.s7 + 0.15); T.levanta = r2(T.s8 - 0.05);
T.p5b = r2(T.s8 + LEN.s8 + 0.05); T.arranca2 = r2(T.p5b + 0.02); T.g3b = r2(T.p5b + 0.15);
const P1 = r2(T.g3b + LEN.g3 + 0.18);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.12));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0: el mismo audio de Susana · mide · toca la tablet · inserto: "Dejame tu número." mientras se
// llenan los campos · "Guardar ✓" · el celular de Susana: "Anotamos tu encargo ✓"
T.q1 = P2; T.s1b = r2(P2 + 0.12); T.agarraB = r2(T.s1b + LEN.s1 * 0.55); T.toca = r2(T.s1b + LEN.s1 + 0.05);
T.q1t = r2(T.toca + 0.15); T.g3c = r2(T.q1t + 0.1); T.campos = [r2(T.q1t + 0.1), r2(T.q1t + 0.9)]; T.guardar = r2(T.q1t + 1.08);
T.q1c = r2(T.guardar + 0.3); T.anotamos = r2(T.q1c + 0.2);
// Q2 · el mismo P2: Tito (el mismo audio) · el cucurucho de papel en blanco
T.q2 = r2(T.anotamos + 0.9); T.t4b = r2(T.q2 + 0.1); T.cajon8b = r2(T.t4b + 0.3);
T.insCucB = [r2(T.cajon8b + 0.8), r2(T.cajon8b + 1.22)]; T.daB = r2(T.insCucB[1] + 0.25);
// Q3 · martes: la entrada de mercadería se cruza sola con el encargo · la cocina de Susana: la canilla gotea, le llega
// el aviso · "¡Llegó lo mío!"
T.q3 = r2(T.daB + 0.35); T.q3t = r2(T.q3 + 0.45); T.fila = r2(T.q3t + 0.2); T.coincide = r2(T.q3t + 0.65); T.aviso = r2(T.q3t + 1.05);
T.k = r2(T.aviso + 0.45); T.noti = r2(T.k + 0.6); T.s10 = r2(T.noti + 0.95);
// Q4 · el panel Encargos: 9 → 0, el recordatorio
T.q4 = r2(T.s10 + LEN.s10 + 0.15); T.baja = [r2(T.q4 + 0.35), r2(T.q4 + 1.15)]; T.record = r2(T.q4 + 1.5);
// Q5 · miércoles: el cajón ordenado, la bolsita de Susana, "Retirado ✓", el flotador: "¿Me encargás este?" · "Dejame tu
// número." · "Ya lo tenés." · "Nuevo encargo · Susana · Flotador ✓" · Gustavo se ríe
T.q5 = r2(T.q4 + 2.5); T.daBolsa = r2(T.q5 + 0.55); T.retirado = r2(T.daBolsa + 0.3); T.levantaQ = r2(T.daBolsa + 0.6);
T.s8b = r2(T.levantaQ + 0.15); T.g3d = r2(T.s8b + LEN.s8 + 0.15); T.s11 = r2(T.g3d + LEN.g3 + 0.15); T.nuevo = r2(T.s11 + LEN.s11 * 0.5);
// C · Gustavo a cámara: "Comentá ENCARGO y te mando cómo funciona para tu ferretería."
T.c = r2(T.s11 + LEN.s11 + 0.4); T.g12 = r2(T.c + 0.12); T.palabra = r2(T.g12 + 0.4);
const DUR = Math.ceil((Math.ceil((T.g12 + LEN.g12 + 0.3) * 30) / 30) * 1e4) / 1e4;   // múltiplo de un cuadro
T.cierre = r2(DUR - 1.35);

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

// P1 · el rubro: "FERRETERÍAS" enorme arriba (en el recuadro verde), entero desde el cuadro 0; se va con el corte a P1b
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p1b - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 80px; padding: 30px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 108px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: -8px 0 -12px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>FERRETERÍAS</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Un sistema más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 760px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.c { font-size: 150px; margin-top: 26px; }
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
        const t0 = i < nA ? i * 0.035 : 0.95 + (i - nA) * 0.035;   // "más tarde…" entra cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.06, ease: "power2.in" }, ${r2(dur - 0.08)});`,
  });
}

// C · "Comentá ENCARGO" abajo de la cara de Gustavo (ENCARGO en el recuadro verde), entra en la palabra y queda
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1060px; padding: 26px 20px 34px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 92px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 30px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 14px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 22px; font: 700 48px/1.22 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>ENCARGO</em></span></div><div class="c">y te mando cómo funciona<br>para tu ferretería</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.08, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.4);`,
  });
}

// la línea chica final (abajo): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1600px; padding: 20px 24px 24px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 40px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Registro de encargos con aviso</div><div class="a">automático por WhatsApp</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420 }, { y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, 0.0);
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
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.18, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -42) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.15, fin: 0.05 });
const nylon = (t, techo = -38) => s("sfx/k-bolsa-m.wav", t, 0, { techo, pico: -12, dur: 0.45, fin: 0.15, hp: 1200 });
const rasga = (t, techo = -35, k = 0) => s(k ? "sfx/bsb-rasga2.wav" : "sfx/bsb-rasga.wav", t, 0, { techo, dur: 0.7, fin: 0.15 });
const cinta = (t, techo = -38) => s("sfx/bsb-cinta.wav", t, 0, { techo, dur: 0.55, fin: 0.15 });
const cajoncito = (t, techo = -37) => s("sfx/bsb-cajoncito.wav", t, 0, { techo, dur: 0.9, fin: 0.2 });
const tornillos = (t, techo = -39) => s("sfx/bsb-clavo.wav", t, 0, { techo, dur: 0.7, fin: 0.2, hp: 600 });
const cajonM = (t, techo = -36) => s("sfx/bsb-cajon-madera.wav", t, 0, { techo, dur: 1.0, fin: 0.2 });
const papelDobla = (t, techo = -40) => s("sfx/papel.wav", t, 0, { techo, desde: 0.3, dur: 0.45, fin: 0.12 });
const codos = (t) => s("sfx/madera-golpe.wav", t, 0, { techo: -39, dur: 0.4, fin: 0.1 });
const carton = (t) => s("sfx/k-cloth_2.wav", t, 0, { techo: -38, dur: 0.5, fin: 0.12 });
// ---- parte 1 ----
// ambiente: el zumbido de los tubos, un murmullo de ferretería (llaves lejos)
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -48, lp: 700 });
s("sfx/llaves.wav", 2.6, 0, { techo: -47, dur: 1.4, fin: 0.4, lp: 3000 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -34, duck: [[T.g6 - 0.7, T.p5, 0.85]] });
// P1 · la bolsita de nylon; el calibre; "Ese no me queda…"
nylon(0.08, -38); voz("s1", T.s1, -1);
nylon(T.agarra - 0.05, -40); s("sfx/k-metal-click.wav", T.agarra + 0.3, 0, { techo: -38 });
s("sfx/whoosh-short.mp3", T.insCal[0] - 0.04, 0, { techo: -46, vel: 1.3 }); s("sfx/k-metal-click.wav", T.insCal[0] + 0.12, 0, { techo: -37, vel: 1.15 });
voz("g2", T.g2, -1);
// P1b · el papel contra la cuchilla, "Dejame tu número.", el lápiz, la cinta
rasga(T.arranca, -36); voz("g3", T.g3, -1);
s("sfx/birome.wav", T.escribe[0], 0, { techo: -41, desde: 0.2, dur: r2(T.escribe[1] - T.escribe[0]), fi: 0.05, fin: 0.1, lp: 5000 });
cinta(T.pega - 0.1, -38);
// P2 · los codos de Tito; Tito; el cajoncito; los tornillos; el papel que se despega y se dobla
codos(T.p2 + 0.02); voz("t4", T.t4, -1);
cajoncito(T.cajon8 - 0.15, -38); tornillos(T.cajon8 + 0.3, -41);
cinta(T.despega - 0.05, -41);
s("sfx/whoosh-short.mp3", T.insCuc[0] - 0.04, 0, { techo: -46, vel: 1.3 }); papelDobla(T.insCuc[0] + 0.05, -38); tornillos(T.insCuc[0] + 0.2, -39);
papelDobla(T.da - 0.1, -44); pasos(T.da + 0.1, T.p3, 2, -46);
// P3 · martes: el cartón de la caja, el tic del chip, "?" (pop), el cajón de madera, el blíster que cae, el rótulo
carton(T.p3 + 0.02); tic(T.p3 + 0.05, -40); pop(T.preg, -40);
cajonM(T.abre - 0.1, -36); s("sfx/k-plastico.wav", T.mete, 0, { techo: -38, dur: 0.3, fin: 0.1 }); pop(T.rot1, -40);
// P4 · el tic del chip, "¿llegó lo mío?", el cajón, nada encima de "Elegí."
tic(T.p4 + 0.05, -40); voz("s5", T.s5, -1);
cajonM(T.saca - 0.05, -35); s("sfx/madera-tabla.wav", T.saca + 0.42, 0, { techo: -38, dur: 0.4, fin: 0.1 });
voz("g6", T.g6, -1);
// P5 · "Ya lo compré.", el rótulo, la bolsita del flotador, "¿Me encargás este?", el papel, "Dejame tu número.", stinger
voz("s7", T.s7, -1); pop(T.rot2, -42);
nylon(T.levanta - 0.1, -39); voz("s8", T.s8, -1);
rasga(T.arranca2, -36, 1); voz("g3", T.g3b, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.02, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.02 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.5, techo: -34, duck: [[T.q3t + 0.1, T.k, -0.6], [T.q4, T.q5, -0.6]] });
s("sfx/zumbido-largo.wav", P2, 0, { loop: true, desde: 3, dur: r2(T.k - P2), fi: 0.1, fin: 0.3, techo: -49, lp: 700 });
s("sfx/zumbido-largo.wav", T.q4, 0, { loop: true, desde: 6, dur: r2(DUR - T.q4), fi: 0.2, fin: 0.5, techo: -49, lp: 700 });
// Q1 · el mismo audio de Susana; el calibre; el toque en la tablet; el tipeo; "Guardar ✓"; el celular de Susana
nylon(P2 + 0.05, -40); voz("s1", T.s1b, -1);
nylon(T.agarraB - 0.05, -41); s("sfx/k-metal-click.wav", T.agarraB + 0.3, 0, { techo: -38 });
toque(T.toca, -38); s("sfx/whoosh-short.mp3", T.q1t - 0.04, 0, { techo: -45 });
voz("g3", T.g3c, -1);
for (let i = 0; i < 8; i++) tecla(T.campos[0] + 0.05 + i * 0.13, -43);
toque(T.guardar, -36); ding(T.guardar + 0.05, -38);
s("sfx/whoosh-short.mp3", T.q1c - 0.04, 0, { techo: -45 }); noti(T.anotamos, -37);
// Q2 · Tito (el mismo audio), el cajoncito, los tornillos, el papel en blanco
codos(T.q2 + 0.02); voz("t4", T.t4b, -1);
cajoncito(T.cajon8b - 0.15, -38); tornillos(T.cajon8b + 0.3, -41); rasga(T.cajon8b + 0.6, -38, 1);
s("sfx/whoosh-short.mp3", T.insCucB[0] - 0.04, 0, { techo: -46, vel: 1.3 }); papelDobla(T.insCucB[0] + 0.05, -38); tornillos(T.insCucB[0] + 0.2, -39);
pasos(T.daB + 0.1, T.q3, 2, -46);
// Q3 · martes: cartón, el chip, la tablet (toque, fila, coincide, aviso), whoosh a la cocina, la gota, la notificación
carton(T.q3 + 0.02); tic(T.q3 + 0.05, -40);
s("sfx/whoosh-short.mp3", T.q3t - 0.04, 0, { techo: -45 }); toque(T.q3t + 0.05, -38);
pop(T.fila, -42); ding(T.coincide, -36); s("sfx/ding.mp3", T.aviso, 0, { techo: -36 });
s("sfx/whoosh.mp3", T.k - 0.15, 0, { techo: -40 });
s("sfx/zumbido.wav", T.k, 0, { dur: r2(T.q4 - T.k), fi: 0.1, fin: 0.2, techo: -50, lp: 500 });
for (let t = T.k + 0.35; t < T.q4 - 0.05; t += 0.6) s("sfx/gota.wav", t, 0, { techo: -42, dur: 0.35, fin: 0.1 });
noti(T.noti, -36);
voz("s10", T.s10, -1);
// Q4 · el panel: un tic por número, el cero, el recordatorio
s("sfx/whoosh-short.mp3", T.q4 - 0.04, 0, { techo: -44 });
for (let k = 0; k < 9; k++) tic(T.baja[0] + (k * (T.baja[1] - T.baja[0])) / 9, -41, k);
ding(T.baja[1], -34); s("sfx/ding.mp3", T.record, 0, { techo: -37 });
// Q5 · el tic del chip, el cajón, la bolsita, "Retirado ✓", el flotador, las voces, la tablet que se completa
tic(T.q5 + 0.05, -40); cajonM(T.q5 + 0.02, -36);
nylon(T.daBolsa, -40); ding(T.retirado, -38);
nylon(T.levantaQ - 0.1, -40); voz("s8", T.s8b, -1);
voz("g3", T.g3d, -1); voz("s11", T.s11, -1);
toque(T.nuevo, -38); pop(T.nuevo + 0.03, -42);
// C · Gustavo, el pop de ENCARGO, la línea chica
s("sfx/whoosh.mp3", T.c - 0.1, 0, { techo: -43 });
voz("g12", T.g12, -1);
pop(T.palabra + 0.02, -38);
pop(T.cierre + 0.05, -44);
// la cama +4 dB y, en los tramos sin voz, los SFX +6 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.p3, T.p4) || en(t0, T.insCuc[0], T.da + 0.3) || en(t0, T.q3, T.k + 0.6) || en(t0, T.q4, T.q5)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 6); }
// los SFX que arrancan en los 0,45 s después de que termina una voz no tapan la cola (ventana de 400 ms)
{ const fines = S.filter((x) => x[3].voz).map((x) => x[1] + LEN[x[0].includes("narrador") ? "nar" : x[0].slice(6, -4)]);
  for (const x of S) { if (x[3].voz || x[0].startsWith("bgm/")) continue; if (fines.some((f) => x[1] >= f - 0.05 && x[1] < f + 0.45)) x[3].techo = Math.min(x[3].techo ?? TECHO, -40); } }
// la música: duck debajo de cada voz para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.4])]; }
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
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,alimiter=limit=0.5:attack=2:release=60:level=false", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla-lim.wav"]);
  fs.renameSync("assets/audio/mezcla-lim.wav", "assets/audio/mezcla-cruda.wav");
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
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
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 900px";   // el iris se abre desde el mostrador (Q1)
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
      <div id="precarga">FERRETERÍAS</div><div id="precarga2">SUSANA</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el mostrador
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "inset(0% 0% 100% 0%)" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power2.inOut", immediateRender: false }, ${IRIS});   // (r2) barrido de arriba hacia abajo (sin agujero negro)
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(LEN));
