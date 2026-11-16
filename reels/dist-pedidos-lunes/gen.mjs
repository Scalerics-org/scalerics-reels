// Genera todo dist-pedidos-lunes desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el chip "Lunes, 8:00." de la parte 2, el
//     cartel "Un catálogo de pedidos más tarde…" y la tarjeta de cierre "Comentá PEDIDOS"); las burbujas de diálogo son
//     3D pegadas a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (Juan, 15-11): un rubro (DISTRIBUIDORAS) en el cuadro 0, el dolor con su número (40 pedidos,
// tres horas, uno que se escapa), el cartel y la solución funcionando en pantalla (la mitad del reel), y el cierre con
// una palabra para comentar (Rubén a cámara: "Comentá PEDIDOS…"). Base técnica: reels/dice-cuarenta.
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): g1 audio de Graciela a 2x ("lo de siempre" +0,9) ·
// r1 "Cuatro minutos para decir lo de siempre." · r2 "¿Eso es un siete o una mosca?" · w1 audio de Walter · r3 "Lo de
// siempre era yo." · nar · g2 "Lo de siempre." · r4 "Siete. Sin mosca." ("Sin" +0,95) · r5 "Ocho y cinco. ¿Y ahora qué
// hago hasta las once?" ("¿Y ahora" +0,95) · n1 "¿Vender?" · r6 "Comentá PEDIDOS y te mando…" ("PEDIDOS" +0,45)
const VOCES = ["g1", "r1", "r2", "w1", "r3", "g2", "r4", "r5", "n1", "r6"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v}.wav`)]));
const T = {};
// ---- parte 1 (lunes, 8:00 → 11:00) ----
// P1 · cuadro 0: Rubén al escritorio con el celular (40 sin leer); el audio de Graciela a 2x ya corriendo
T.g1 = 0.12; T.fin1 = r2(T.g1 + LEN.g1 + 0.02);
// P2 · primer plano: "Cuatro minutos para decir lo de siempre."
T.p2 = r2(T.fin1 + 0.06); T.r1 = r2(T.fin1 + 0.2);
// P3 · la foto de la lista de Marta (inserto del celular): zoom con dos dedos · "¿Eso es un siete o una mosca?"
T.p3 = r2(T.r1 + LEN.r1 + 0.1); T.zoom = [r2(T.p3 + 0.2), r2(T.p3 + 0.7)]; T.r2 = r2(T.p3 + 0.35);
// P4 · la ráfaga y las tres horas: burbujas mudas que caen cada vez más rápido; Rubén tipea con dos dedos; el reloj de
// 8:00 a 11:00, las franjas de la persiana se corren, el termo se inclina (ceba tres veces), la planilla 12 · 27 · 39
T.p4 = r2(T.r2 + LEN.r2 + 0.1);
T.rafaga = [0.06, 0.36, 0.62, 0.84, 1.03, 1.2, 1.34].map((d) => r2(T.p4 + d));
T.lapse = [r2(T.p4 + 0.12), r2(T.p4 + 1.5)];
T.ceba = [0.3, 0.72, 1.14].map((d) => r2(T.p4 + d));
// P5 · 11:00: "Rubén, ¿y mi pedido?" (Walter, muda) · sube en el chat: el mensaje de las 8:04 aplastado entre dos audios
// (borde rojo) · el audio de Walter · corte al monitor: "39 de 40"
T.p5 = r2(T.p4 + 1.62); T.walter = r2(T.p5 + 0.06); T.scroll = [r2(T.p5 + 0.4), r2(T.p5 + 0.65)]; T.rojo = r2(T.p5 + 0.78);
T.w1 = r2(T.p5 + 0.92); T.p5b = r2(T.w1 + LEN.w1 - 0.7);
// P6 · la pausa (el tic del reloj, el celular vibra una vez) · "Lo de siempre era yo."
T.p6 = r2(T.w1 + LEN.w1 + 0.05); T.tics = [r2(T.p6 + 0.1), r2(T.p6 + 0.6)]; T.vibra = r2(T.p6 + 0.35); T.r3 = r2(T.p6 + 0.7);
// P7 · remate del remate: "Rubén, cambié todo. Te mando audio." (▶ 6:40) · deja el celular boca abajo · mate lavado
T.p7 = r2(T.r3 + LEN.r3 + 0.12); T.cambie = r2(T.p7 + 0.08); T.bocaAbajo = [r2(T.p7 + 0.45), r2(T.p7 + 0.72)]; T.sorbo = [r2(T.p7 + 0.85), r2(T.p7 + 1.35)];
const P1 = r2(T.p7 + 1.5);   // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.4);      // arranca la parte 2
// ---- parte 2 (otro lunes, 8:00 → 8:05) ----
// Q1 · la rotisería de Graciela: el chip "Lunes, 8:00." (callback) · inserto de su celular: el catálogo de la
// distribuidora · "Lo de siempre." · un toque en "Repetir lo de siempre" · el carrito se llena · Pedir · Pedido ✓
T.q1 = P2; T.q1b = r2(P2 + 0.62); T.g2 = r2(T.q1b + 0.2); T.toca = r2(T.g2 + LEN.g2 - 0.05);
T.filas = [0.15, 0.3, 0.45, 0.6].map((d) => r2(T.toca + d)); T.pedir = r2(T.filas[3] + 0.35); T.pedido = r2(T.pedir + 0.2);
// Q2 · la cafetería de Marta: inserto de su celular, "+" en Café en grano: 1 · 4 · 7 (enorme, verde) · Pedir ✓
T.q2 = r2(T.pedido + 0.42); T.mas = [0.25, 0.5, 0.75].map((d) => r2(T.q2 + d)); T.pedirM = r2(T.q2 + 1.05); T.pedidoM = r2(T.pedirM + 0.15);
// Q2b · Rubén en la oficina con el mate, de perfil al monitor: entra la fila de Marta · "Siete. Sin mosca."
T.q2b = r2(T.pedidoM + 0.32); T.filaM = r2(T.q2b + 0.12); T.r4 = r2(T.q2b + 0.32);
// Q3 · el panel (inserto del monitor): los pedidos caen ordenados, 12 → 27 → 40 de 40 ✓, Walter se ilumina, "Mandar a
// armar" · grúa por el ventanal al depósito: el operario arma el pallet WALTER
T.q3 = r2(T.r4 + LEN.r4 + 0.12); T.cuenta = [0.12, 0.45, 0.78].map((d) => r2(T.q3 + d)); T.walterOk = r2(T.q3 + 0.98);
T.mandar = r2(T.q3 + 1.38); T.grua = [r2(T.q3 + 1.55), r2(T.q3 + 2.6)]; T.cajasW = [0.0, 0.3, 0.6].map((d) => r2(T.grua[1] - 0.25 + d));
// Q4 · la oficina como en el cuadro 0: el mate lleno, el termo con vapor, el reloj en 8:05 · "Ocho y cinco. ¿Y ahora
// qué hago hasta las once?" · Nico asoma por la puerta: "¿Vender?" · Rubén lo mira
T.q4 = r2(T.cajasW[2] + 0.45); T.r5 = r2(T.q4 + 0.2); T.puerta = r2(T.r5 + LEN.r5 - 0.15); T.n1 = r2(T.r5 + LEN.r5 + 0.12);
T.miraNico = r2(T.n1 - 0.1);
// C · Rubén a cámara: "Comentá PEDIDOS y te mando cómo funciona para tu distribuidora." + la tarjeta (entra en "PEDIDOS")
T.c = r2(T.n1 + LEN.n1 + 0.4); T.r6 = r2(T.c + 0.15); T.tarjeta = r2(T.r6 + 0.45);
const DUR = r2(T.r6 + LEN.r6 + 0.65);

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

// el rubro en el cuadro 0: "DISTRIBUIDORAS" gigante (crema con borde navy y sombra dura) y "Lunes, 8:00." en verde,
// enteros desde el primer cuadro; se van hacia arriba antes del primer plano
const RUBRO = { top: 120 };
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 + 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .rubro { position: absolute; left: 0; right: 0; top: ${RUBRO.top}px; text-align: center; }
    P .t1 { display: inline-block; font: 900 106px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; -webkit-text-stroke: 14px ${NAVY}; paint-order: stroke fill; text-shadow: 10px 12px 0 ${NAVY}; }
    P .t2 { display: inline-block; margin-top: 26px; padding: 10px 34px 16px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${G}; font: 800 76px/1 "Lexend", sans-serif; letter-spacing: -0.01em; color: ${G}; }`,
    html: `      <div class="rubro"><div class="t1">DISTRIBUIDORAS</div><br><div class="t2">Lunes, 8:00.</div></div>`,
    js: `      tl.fromTo(q(".t1"), { scale: 1 }, { scale: 1.03, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.5);
      tl.to(q(".rubro"), { y: -560, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el chip de la parte 2 (callback del cuadro 0): "Lunes, 8:00." sobre la rotisería
{
  const id = "s05-chip", ini = r2(P2 + 0.02), dur = r2(T.q1b - P2 - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .chip { position: absolute; left: 0; right: 0; top: 170px; text-align: center; }
    P .t2 { display: inline-block; padding: 12px 38px 18px; border-radius: 24px; background: ${NAVY}; border: 6px solid ${G}; font: 800 84px/1 "Lexend", sans-serif; letter-spacing: -0.01em; color: ${G}; box-shadow: 10px 12px 0 rgba(5,10,20,0.9); }
    P .sub { display: inline-block; margin-top: 16px; padding: 8px 26px 12px; border-radius: 18px; background: ${CR}; border: 5px solid ${NAVY}; font: 700 50px/1 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="chip"><div class="t2">Lunes, 8:00.</div><br><div class="sub">Rotisería de Graciela</div></div>`,
    js: `      tl.fromTo(q(".chip"), { y: -300 }, { y: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: true }, 0);
      tl.to(q(".chip"), { y: -420, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}

// el cartel "Un catálogo de pedidos más tarde…" (el time card de ya-lo-cargo / dice-cuarenta con el texto nuevo). Va
// DEBAJO del canvas. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.03)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
  // el narrador va en P1 + 0,15 (Un 0,0 · catálogo 0,1 · de 0,8 · pedidos 0,9 · más 1,3 · tarde 1,7)
  const N = 0.15;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 560px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 124px/1.08 "Lexend", sans-serif; letter-spacing: -0.015em; }
    P .linea.c { font-size: 150px; margin-top: 30px; }
    P .l { display: inline-block; position: relative; color: ${CR}; -webkit-text-stroke: 16px ${NAVY}; paint-order: stroke fill; text-shadow: 0 16px 0 ${NAVY}, 10px 16px 0 ${NAVY}; }
    P .esp { display: inline-block; width: 0.3em; }`,
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
        ${lin("a", [["Un", N + 0.0], ["catálogo", N + 0.1]])}
        ${lin("b", [["de", N + 0.8], ["pedidos", N + 0.9]])}
        ${lin("c", [["más", N + 1.3], ["tarde…", N + 1.7]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: 0.85, y: 30, rotation: (i % 2 ? 1 : -1) * 5 }, { scale: 1, y: 0, rotation: 0, duration: 0.28, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 4; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (4 + (i % 3) * 2), rotation: s * (i % 2 ? 1.5 : -1.5), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.3 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.42)});   // se va antes de que abra el iris`,
  });
}

// la tarjeta de cierre (abajo de la cara de Rubén): "Comentá" / PEDIDOS (recuadro verde) / "y te mando cómo funciona
// para tu distribuidora" / scalerics.com chico en verde. Entra sobre "PEDIDOS" y queda hasta el final.
{
  const id = "s09-cierre", ini = T.tarjeta, dur = r2(DUR - T.tarjeta);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1170px; padding: 34px 34px 38px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${G}; text-align: center; box-shadow: 14px 16px 0 rgba(3,6,12,0.55); }
    P .a { font: 800 84px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.02em; }
    P .sel { display: inline-block; margin-top: 18px; padding: 6px 30px 16px; border-radius: 14px; background: ${G}; border: 7px solid ${CR}; font: 900 150px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .c { margin-top: 24px; font: 600 50px/1.18 "Lexend", sans-serif; color: ${CR}; }
    P .d { margin-top: 22px; font: 800 48px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.01em; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="sel">PEDIDOS</div><div class="c">y te mando cómo funciona<br>para tu distribuidora</div><div class="d">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 900 }, { y: 0, duration: 0.32, ease: "back.out(1.3)", immediateRender: true }, 0.0);
      tl.fromTo(q(".sel"), { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2.2)", immediateRender: true }, 0.18);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.05, duration: 0.16, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 1.2);`,
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
const pop = (t, techo = -40, vel = 1) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo, vel });
const VOZ = [];
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.7)]); };
const notif = (t, techo = -44) => s("sfx/notification.mp3", t, 0, { techo, dur: 0.35, fin: 0.12 });
const tic = (t, k = 0, techo = -38) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, vel: 0.62 + (k % 2) * 0.08, lp: 3000 });   // el reloj de pared (Kenney, más grave)
const tecla = (t, k = 0, techo = -40) => s("sfx/key-press.mp3", t, 0, { techo, vel: 0.92 + (k % 3) * 0.06 });
const bip = (t, techo = -38) => s("sfx/k-tono.wav", t, 0, { dur: 0.12, fin: 0.03, techo, vel: 1.35, hp: 500 });
const caja = (t, techo = -38, vel = 1) => s("sfx/madera-golpe.wav", t, 0, { techo, vel, lp: 1800 });
const vibra = (t, techo = -44) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.3, fin: 0.08 });
// ---- parte 1 ----
// ambiente: la oficina de mañana (zumbido bajo) y el camión que espera en marcha, lejos; la música (pizzicato) baja en la
// pausa de P6 (no se corta) y debajo de cada voz
s("sfx/zumbido-largo.wav", 0, 0, { dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -47, lp: 900 });
s("sfx/k-motor-bajo.wav", 0, 0, { loop: true, dur: r2(T.p5), fi: 0.05, fin: 0.4, techo: -50, lp: 500 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p6 - 0.05, T.r3 + LEN.r3 + 0.1, 0.8]] });
// P1 · el celular vibra (40 sin leer), dos notificaciones chicas, el audio de Graciela a 2x, el clic del fin del audio
for (let t = 0.0; t < T.fin1 - 0.2; t += 0.45) vibra(t, -47);
notif(0.35, -47); notif(1.05, -47);
voz("g1", T.g1, -2);
s("sfx/click-soft.mp3", T.fin1, 0, { techo: -40 });
// P3 · entra la foto (notificación + pop), el roce de los dedos al hacer zoom
notif(T.p3 - 0.08, -44); pop(T.p3 + 0.02, -42);
s("sfx/k-cloth_1.wav", T.zoom[0], 0, { techo: -42, dur: 0.35, fin: 0.1, hp: 400 });
voz("r1", T.r1, -1);
voz("r2", T.r2, -1);
// P4 · la ráfaga: un pop por burbuja (cada uno más agudo), el tecleo con dos dedos (irregular), el tic-tac del reloj que
// se acelera (tres horas en 1,6 s), el termo que se inclina (tres cebadas)
T.rafaga.forEach((t, i) => pop(t, -41 + Math.min(3, i * 0.5), 1 + i * 0.05));
[0.1, 0.3, 0.38, 0.62, 0.7, 0.95, 1.05, 1.13, 1.33, 1.42, 1.6, 1.68].forEach((d, i) => tecla(T.p4 + d, i, -41));
{ let t = T.lapse[0], k = 0; while (t < T.lapse[1]) { tic(t, k, -40); const u = (t - T.lapse[0]) / (T.lapse[1] - T.lapse[0]); t += 0.24 - 0.17 * Math.sin(Math.PI * Math.min(1, u * 1.2)); k++; } }
T.ceba.forEach((t, i) => s("sfx/k-plastico.wav", t, 0, { techo: -42, vel: 0.75 + i * 0.05, lp: 1500 }));
// P5 · 11:00: el reloj se frena (un tic), la burbuja de Walter, el scroll, el "tuc" seco del mensaje perdido (rojo)
tic(T.p5, 0, -36);
pop(T.walter - 0.02, -39); notif(T.walter, -43);
s("sfx/k-cloth_2.wav", T.scroll[0], 0, { techo: -44, dur: 0.3, fin: 0.1, hp: 600, vel: 1.3 });
s("sfx/click-soft.mp3", T.rojo, 0, { techo: -37, vel: 0.7 });
voz("w1", T.w1, -2);
s("sfx/k-tick-2.wav", T.p5b + 0.05, 0, { techo: -42, vel: 0.8 });   // el contador de la planilla que se queda en 39
// P6 · la pausa: el tic del reloj (dos), el celular que vibra una vez · "Lo de siempre era yo."
T.tics.forEach((t, i) => tic(t, i, -36));
vibra(T.vibra, -42);
voz("r3", T.r3, -1);
// P7 · "cambié todo" (pop + notificación), el celular boca abajo, la bombilla en vacío, el stinger
pop(T.cambie - 0.02, -39); notif(T.cambie, -43);
s("sfx/madera-golpe.wav", T.bocaAbajo[1] - 0.02, 0, { techo: -40, vel: 1.4, lp: 2500 });
s("sfx/sorbo.wav", T.sorbo[0] + 0.12, 0, { techo: -36, hp: 700, fin: 0.12 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/nar.wav", P1 + 0.15, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.15 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.0, 0.1, 0.8, 0.9, 1.3, 1.7]) pop(P1 + 0.15 + d + 0.02, -45);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.9, techo: -36 });
s("sfx/zumbido-largo.wav", P2, 0, { desde: 30, dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -48, lp: 900 });
// Q1 · la campanita de la puerta de la rotisería; el toque en "Repetir lo de siempre"; un pop por fila; Pedir; Pedido ✓
s("sfx/campanita.wav", P2 + 0.05, 0, { techo: -40, dur: 0.6, fin: 0.25 });
s("sfx/whoosh-short.mp3", T.q1b - 0.04, 0, { techo: -44 });
voz("g2", T.g2, -1);
s("sfx/click-soft.mp3", T.toca, 0, { techo: -36 });
T.filas.forEach((t, i) => pop(t, -41, 1 + i * 0.07));
s("sfx/click-soft.mp3", T.pedir, 0, { techo: -36 });
s("sfx/cero.mp3", T.pedido, 0, { techo: -38 });
// Q2 · Marta: tres "+", Pedir ✓; el viaje al monitor de Rubén (whoosh) y la fila nueva
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -44 });
T.mas.forEach((t, i) => s("sfx/click-soft.mp3", t, 0, { techo: -37, vel: 1 + i * 0.06 }));
s("sfx/cero.mp3", T.pedidoM, 0, { techo: -38 });
s("sfx/whoosh-short.mp3", T.q2b - 0.05, 0, { techo: -42 });
pop(T.filaM, -40);
voz("r4", T.r4, -1);
// Q3 · el contador (un tic por número + ding en 40), la fila de Walter, "Mandar a armar", la grúa, las cajas al pallet
T.cuenta.forEach((t, i) => { tic(t, i, -40); pop(t + 0.02, -42, 1 + i * 0.08); });
s("sfx/ding.mp3", T.cuenta[2] + 0.05, 0, { techo: -36 });
s("sfx/cero.mp3", T.walterOk, 0, { techo: -40, vel: 1.1 });
s("sfx/click-soft.mp3", T.mandar, 0, { techo: -35 });
s("sfx/whoosh.mp3", T.grua[0], 0, { techo: -42, vel: 0.8, dur: 1.2, fin: 0.4 });
s("sfx/zumbido-largo.wav", T.grua[0] + 0.4, 0, { desde: 12, dur: r2(T.q4 - T.grua[0] - 0.4), fi: 0.3, fin: 0.2, techo: -42, lp: 1200 });   // el galpón
T.cajasW.forEach((t, i) => { caja(t + 0.1, -36, 1 + i * 0.06); bip(t + 0.16, -38); });
// Q4 · la oficina: corte (whoosh), el termo humeando, la puerta de vidrio que se abre · "Ocho y cinco…" · "¿Vender?"
s("sfx/whoosh-short.mp3", T.q4 - 0.04, 0, { techo: -42 });
voz("r5", T.r5, -1);
s("sfx/puerta-abre.wav", T.puerta, 0, { techo: -38, dur: 0.6, fin: 0.2 });
voz("n1", T.n1, -1);
// C · Rubén a cámara; la tarjeta (pop + whoosh)
s("sfx/whoosh-short.mp3", T.c - 0.04, 0, { techo: -44 });
voz("r6", T.r6, -1);
s("sfx/whoosh-short.mp3", T.tarjeta - 0.02, 0, { techo: -42 }); pop(T.tarjeta + 0.15, -40);
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => b >= x[1] && a <= x[1] + x[3].dur).map(([a, b]) => [a, b, 0.5])]; }

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
const IRIS_C = "540px 760px";   // el iris se abre desde el celular de Graciela (Q1)
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
      <div id="precarga">Rubén</div><div id="precarga2">Café en grano</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Graciela
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · solución+cierre ${r2(DUR - P2)} s (${Math.round(((DUR - P2) / DUR) * 100)} %)`);
console.log(JSON.stringify(T));
