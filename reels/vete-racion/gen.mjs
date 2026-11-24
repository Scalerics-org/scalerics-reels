// Genera todo vete-racion desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Una tienda online más tarde…",
//     "Comentá RACIÓN" y la línea chica final); las burbujas de diálogo y los audios son 3D pegados a la cámara
//     (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra) con el formato completo de veterinaria-vacunas: parte 1 (0 a P1),
// el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): v1 Vero "Uy. Se terminó." · v2 "Bueno, Toto. Al súper."
// · i1 Inés "¡Vero! ¿Qué está comiendo Toto?" (se reusa en Q4) · v3 "La que me recomendaste. La compro en el súper." · v4
// "¿Me la anotás? Así no me equivoco." · nar "Una tienda online más tarde." · v5 "¿Cómo sabe?" · b1 Bruno "¡Ración para
// Toto!" · v6 "La que me recomendaste. Me llega sola." · i2 Inés "Comentá RACIÓN y te mando cómo funciona para tu veterinaria."
const VOCES = ["v1", "v2", "i1", "v3", "v4", "v5", "b1", "v6", "i2"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0, domingo 21:40, la cocina: Toto ya empuja el plato vacío; Vero da vuelta la bolsa: cae UNA croqueta ·
// "Uy. Se terminó." · inserto del celular "Cerrado" · Toto empuja otra vez · "Bueno, Toto. Al súper."
T.empuja = [0.0, 0.55]; T.v1 = 0.25; T.croqueta = 0.7;
T.cel = r2(T.v1 + LEN.v1 + 0.1); T.celFin = r2(T.cel + 0.9);
T.empuja2 = r2(T.celFin + 0.02); T.v2 = r2(T.celFin + 0.08); T.orejas = r2(T.v2 + LEN.v2 - 0.35);
// P2 · el súper, domingo 22:05: la bolsa verde al carro · NOVIEMBRE, DICIEMBRE, ENERO (un chip grande por mes, la misma
// bolsa al carro, el contador rojo que sube)
T.p2 = r2(T.v2 + LEN.v2 + 0.1); T.agarra = r2(T.p2 + 0.12); T.carro = r2(T.p2 + 0.55);
const MES = 0.55;
T.mes = [0, 1, 2].map((i) => r2(T.carro + 0.45 + i * MES));
T.carroMes = T.mes.map((m) => r2(m + 0.3));
// P3 · febrero en la veterinaria: la torre de bolsas sin vender, Inés con el talonario, Bruno · campanita
T.p3 = r2(T.mes[2] + MES); T.campana = r2(T.p3 + 0.6);
// P4 · entran Vero y Toto; Toto tira derecho a la torre y la huele · "¡Vero! ¿Qué está comiendo Toto?"
T.p4 = r2(T.campana + 0.15); T.entra = [T.campana, r2(T.campana + 1.0)]; T.huele = r2(T.entra[1] - 0.05);
T.i1 = r2(T.p4 + 0.35);
// P4b · contraplano: Vero de frente, "La que me recomendaste. La compro en el súper." (la pausa interna no se toca)
T.p4b = r2(T.i1 + LEN.i1 + 0.1); T.v3 = r2(T.p4b + 0.1);
// P4c · la pausa: Inés con la sonrisa quieta; los rótulos del costo (≥ 1 s)
T.p4c = r2(T.v3 + LEN.v3 + 0.06); T.rot = [r2(T.p4c + 0.08), r2(T.p4c + 0.25)];
// P5 · remate del remate: "¿Me la anotás? Así no me equivoco." · Inés escribe en el recetario (inserto) · Toto se echa
T.p5 = r2(T.p4c + 1.05); T.v4 = r2(T.p5 + 0.08);
T.p5w = r2(T.v4 + 0.95); T.arranca = r2(T.v4 + LEN.v4 - 0.05); T.p5i = r2(T.arranca + 0.3);   T.escribe = [r2(T.p5i + 0.1), r2(T.p5i + 0.95)];   // (r1) P5w: Inés, seria, arranca la hoja del recetario
T.p5t = r2(T.escribe[1] + 0.1); T.suspiro = r2(T.p5t + 0.02);
const P1 = r2(T.p5t + 0.55);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.45, LEN.nar + 0.1));
// ---- parte 2 ----
// Q1 · jueves 10:00, la misma cocina de día: el aviso llega solo (inserto del chat) · "¿Cómo sabe?" · la ficha de recompra
// en la tablet de Inés (inserto) · la tienda con el pedido armado: Pagar → Pagado ✓
T.q1 = P2; T.ding = r2(P2 + 0.3); T.q1c = r2(P2 + 0.42);
T.toca = r2(T.q1c + 0.8); T.q1v = r2(T.q1c + 1.05); T.v5 = r2(T.q1v + 0.08); T.q1t = r2(T.v5 + LEN.v5 + 0.15);
T.q1s = r2(T.q1t + 1.35); T.envio = r2(T.q1s + 0.35); T.pagar = r2(T.q1s + 0.75); T.pagado = r2(T.pagar + 0.2);
// Q2 · viernes 18:40: timbre, Vero abre, Bruno con la bolsa TOTO · "¡Ración para Toto!"
T.q2 = r2(T.pagado + 0.7); T.timbre = r2(T.q2 + 0.03); T.abre = r2(T.q2 + 0.22); T.b1 = r2(T.q2 + 0.5); T.apoya = r2(T.b1 + LEN.b1 + 0.15);
// Q3 · domingo 21:40 (el remate de la parte 2, sin voz): Toto va a empujar el plato y está lleno; mira a cámara y come
T.q3 = r2(T.apoya + 0.35); T.empujaQ = r2(T.q3 + 0.3); T.para = r2(T.q3 + 0.75); T.mira = [r2(T.q3 + 1.0), r2(T.q3 + 1.55)]; T.come = r2(T.q3 + 1.8);   // (r1) empuja, mira, come; Q3 de 2,7 s
// Q4 · febrero: el mismo "¡Vero! ¿Qué está comiendo Toto?" (mismo audio) · "La que me recomendaste. Me llega sola."
T.q4 = r2(T.q3 + 2.7); T.campana2 = r2(T.q4 + 0.0); T.entra2 = [T.q4, r2(T.q4 + 0.7)]; T.i1b = r2(T.q4 + 0.75);   // (r1) Inés habla cuando Vero ya entró
T.q4b = r2(T.i1b + LEN.i1 + 0.1); T.v6 = r2(T.q4b + 0.1);
// Q5 · el panel de recompras (inserto): filas con tilde, 11 → 2, $ 74.100
T.q5 = r2(T.v6 + LEN.v6 + 0.25); T.filas = [0.2, 0.38, 0.56, 0.74].map((d) => r2(T.q5 + d)); T.gira = r2(T.q5 + 0.85); T.plata = r2(T.q5 + 1.3);
// C · Inés a cámara: "Comentá RACIÓN…"
T.c = r2(T.q5 + 1.85); T.i2 = r2(T.c + 0.12); T.palabra = r2(T.i2); T.palabraR = r2(T.i2 + Number(process.env.RACION ?? 0.3));   // "RACIÓN" en la voz
const DUR = Math.ceil((Math.ceil((T.i2 + LEN.i2 + 0.15) * 30) / 30) * 1e4) / 1e4;   // (r1) cierre ≤ 3,6 s
T.cierre = r2(DUR - 1.0);

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

// P1 · el rubro: "VETERINARIAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0; se va
// con el corte al súper (P2)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 150px; padding: 30px 6px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 120px/1.06 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>VETERINARIAS</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -420, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Una tienda online más tarde…" (time card de dibujito, de marca, hecho de cero; como tienda-tenes-stock). Va
// DEBAJO del canvas. No dice "Scalerics". "más tarde…" entra cuando el narrador dice "más" (~1,0 s).
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 120px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 132px; margin-top: 12px; }
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
        ${lin("a", ["Una", "tienda"])}
        ${lin("b", ["online"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.03 : 1.0 + (i - nAB) * 0.03;   // "más tarde…" entra cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});   // (r1) se va antes del iris   // (r2 11:11) sale mientras crece el iris; (r1 11:11) sale justo cuando abre el iris (no queda el verde vacío)   // (ronda 2) se va entero antes del iris   // se va antes de que abra el iris`,
  });
}

// C · "Comentá RACIÓN" + "y te mando cómo funciona para tu veterinaria", debajo de la cara de Inés (y 1040-1440)
{
  const id = "s05-palabra", ini = T.c, dur = r2(DUR - T.c + 0.1);   // (qa4) entra con el corte al cierre (antes 0,12 s de mitad navy vacía)   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1235px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>RACIÓN</em></span></div><div class="c">y te mando cómo funciona<br>para tu veterinaria</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(T.palabraR - T.c)});`,
  });
}
// la línea chica final (abajo de la tarjeta, arriba de la zona de botones): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1675px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Tienda online con aviso de recompra</div><div class="a">por WhatsApp</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.0);
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
const s = (f, t, db, o = {}) => S.push([f, r2(Math.max(0, t)), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t - 0.06, 0, { techo });
const unas = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][i % 3], a + ((b - a) * i) / n, 0, { techo, hp: 2500, vel: 1.35 }); };
const lad = (f, t, techo = -36, o = {}) => s(`sfx/ladrido-${f}.wav`, t, 0, { techo, pico: -10, ...o });
const platoAcero = (t, techo = -36) => s("sfx/k-plato-000.wav", t, 0, { techo, pico: -12, hp: 400 });
const bolsaPapel = (t, d = 0.5, techo = -38) => s("sfx/bsb-papel.wav", t, 0, { techo, dur: d, fin: 0.12 });
const bolsaCae = (t, techo = -34) => s("sfx/bsb-bolsa-piso.wav", t, 0, { techo, dur: 0.6, fin: 0.15 });
const chip = (t) => { tic(t, -40, 0); whoosh(t, -46); };
// ---- parte 1 ----
// la cocina de noche: la heladera muy baja; la música (pizzicato) arranca con el plato
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p2 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 500 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p4c - 0.1, T.p5 + 0.1, 0.8], [T.p5t - 0.1, P1, 0.6], [T.carro, T.p3, 0.35]] });   // (r2) la cama baja en el montaje de meses
// P1 · el plato contra la pantufla, la bolsa vacía, la croqueta, el celular, el plato otra vez, "Al súper." y el ladridito
platoAcero(0.05, -36); platoAcero(T.empuja[1] - 0.05, -38);
bolsaPapel(0.2, 0.55, -40);
s("sfx/k-tick-2.wav", T.croqueta + 0.33, 0, { techo: -40, hp: 1500, vel: 1.4 }); s("sfx/k-tick-4.wav", T.croqueta + 0.48, 0, { techo: -46, hp: 1500, vel: 1.5 });
voz("v1", T.v1, -1);
s("sfx/vibra.wav", T.cel - 0.05, 0, { techo: -36, dur: 0.3, fin: 0.1 }); whoosh(T.cel, -40);   // (r1) +6 dB
platoAcero(T.empuja2 + 0.25, -37);
voz("v2", T.v2, -1);
lad("corgi_fs630648", T.orejas + 0.25, -37);
// P2 · el súper: el tubo, la bolsa al carro (golpe sordo + alambre) y un golpe por mes; chip con tic y whoosh
s("sfx/zumbido.wav", T.p2, 0, { dur: r2(T.p3 - T.p2), fi: 0.1, fin: 0.15, techo: -48, lp: 1200 });
whoosh(T.p2, -42);
bolsaPapel(T.agarra, 0.35, -40);
bolsaCae(T.carro, -33); s("sfx/k-metal-liviano-2.wav", T.carro + 0.02, 0, { techo: -42 });
T.mes.forEach((m, i) => { chip(m); bolsaCae(T.carroMes[i], -36); s("sfx/k-metal-liviano-2.wav", T.carroMes[i] + 0.02, 0, { techo: -43 }); pop(m + 0.15, -40); });
// P3 · la veterinaria: ladrido lejano en la sala, la campanita
whoosh(T.p3, -44); tic(T.p3, -42);
lad("spaniel_fs502655", T.p3 + 0.35, -46, { lp: 2000 });
s("sfx/campanita.wav", T.campana, 0, { techo: -34 });
// P4 · pasos de Vero, uñas de Toto, el olfateo
pasos(T.entra[0] + 0.1, T.entra[1], 4, -44);
unas(T.entra[0] + 0.1, T.entra[1], 8, -44);
s("sfx/bsb-olfateo.wav", T.huele, 0, { techo: -38, dur: 1.0, fin: 0.2, hp: 300 });
voz("i1", T.i1, -1);
voz("v3", T.v3, -1);
// P4c · la pausa: nada encima (la música baja); pop chico por rótulo
T.rot.forEach((t) => pop(t, -44));
// P5 · "¿Me la anotás?", la hoja que se arranca, la lapicera, el suspiro de Toto y el stinger
voz("v4", T.v4, -1);
s("sfx/bsb-rasga.wav", T.arranca - 0.35, 0, { techo: -38, dur: 0.5, fin: 0.1 });
whoosh(T.p5i, -46);
s("sfx/birome.wav", T.escribe[0], 0, { libre: true, pico: -8, techo: -31, dur: r2(T.escribe[1] - T.escribe[0]), fin: 0.1 });
s("sfx/bsb-suspiro.wav", T.suspiro, 0, { libre: true, pico: -8, techo: -30, desde: 0.4, dur: 0.5, fin: 0.15, lp: 3000 });   // (r2) termina antes del cartel
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -46 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -42, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 - 0.1, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.4), r2(P1 - 0.1 + LEN.nar + 0.45)]);   // (el wav arranca con 0,2 s de silencio)
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.3, fin: 0.3, techo: -46, sinDuck: true });
for (const d of [0.12, 0.4, 0.75, 1.0]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36, duck: [[T.q3, T.q4 - 0.1, 0.45], [T.q5, T.c, 0.35]] });
// Q1 · el aviso: notificación; "¿Cómo sabe?"; la ficha; la tienda: envío, Pagar, Pagado ✓
noti(T.ding + 0.08, -32.5); whoosh(T.q1c, -50); toque(T.toca, -42);   // (r1) la notificación audible; el toque en "Repetir pedido"
voz("v5", T.v5, -1);
whoosh(T.q1t, -44); ding(T.q1t + 0.7, -40);
whoosh(T.q1s, -44); toque(T.envio, -38); toque(T.pagar, -36); ding(T.pagado, -34);
// Q2 · el timbre, la puerta, "¡Ración para Toto!", el ladrido contento, la bolsa en el piso
s("sfx/bsb-timbre.wav", T.timbre, 0, { techo: -34, dur: 1.2, fin: 0.3 });
s("sfx/puerta-abre.wav", T.abre, 0, { techo: -40 });
voz("b1", T.b1, -1);
lad("golden_fs146343_1", T.b1 + LEN.b1 + 0.0, -35);
bolsaCae(T.apoya, -34);
// Q3 · domingo 21:40: el plato lleno (no suena el acero: las croquetas), Toto mira, come
s("sfx/zumbido-largo.wav", T.q3, 0, { loop: true, dur: r2(T.q4 - T.q3), fi: 0.1, fin: 0.2, techo: -52, lp: 500 });
s("sfx/bsb-cereal.wav", T.empujaQ, 0, { libre: true, pico: -6, techo: -26, dur: 0.7, fin: 0.2 });
s("sfx/bsb-masticar.wav", T.come, 0, { libre: true, pico: -6, techo: -30.5, dur: r2(T.q4 - T.come), fin: 0.2 });
// Q4 · campanita, pasos y uñas, el mismo "¡Vero!…", "Me llega sola."
s("sfx/campanita.wav", T.campana2, 0, { techo: -36 });
pasos(T.entra2[0] + 0.1, T.entra2[1], 3, -46); unas(T.entra2[0] + 0.1, T.entra2[1], 6, -46);
voz("i1", T.i1b, -1);
voz("v6", T.v6, -1);
// Q5 · el panel: tic por fila, el 11 que gira, la plata
whoosh(T.q5, -44);
T.filas.forEach((t, k) => tic(t, -40, k));
s("sfx/whoosh-short.mp3", T.gira - 0.05, 0, { techo: -44, vel: 1.4 }); ding(T.gira + 0.25, -36);
ding(T.plata, -36);
// C · Inés a cámara: pop en RACIÓN, la línea chica
whoosh(T.c, -46);
voz("i2", T.i2, -1);
pop(T.c + 0.02, -38);   // (qa4) con la tarjeta, que entra en el corte pop(T.palabraR, -40);
pop(T.cierre + 0.05, -44);
// la cama +4 dB y, en los tramos sin voz (el montaje de meses, el panel, el plato lleno), los SFX +6 dB (nunca por encima
// del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz || o.libre) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.carro - 0.1, T.p3) || en(t0, T.q3, T.q4 - 0.2) || en(t0, T.q5, T.c - 0.3)) o.techo = Math.min(-35, (o.techo ?? TECHO) + 3); }   // (r2) +3 y techo -33: con la cama, el tramo queda ≤ -31 en el MP4
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }
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
// (r1) libre: el techo es la meta medida en el MP4 (la momentánea de un SFX corto queda varios LU debajo del pico del archivo)
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, (o.libre ? o.techo : Math.min(o.techo ?? TECHO, TECHO)) - 6 - L.M, (o.pico ?? PICO) - L.pk)); };
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
const IRIS_C = "540px 1250px";   // el iris se abre desde el plato de Toto (Q1)
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
      <div id="precarga">Inés</div><div id="precarga2">Ración</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el plato de Toto
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(LEN));
