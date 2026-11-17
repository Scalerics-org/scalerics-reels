// Genera todo corralon-portland desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
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
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): b1 Beto (audio) "Gustavo, ¿tenés portland? Cuarenta
// bolsas. Hoy llenamos la losa." (se reusa en Q1) · g1 Gustavo "¡Ya te digo!" (se reusa en Q1) · g2 "Beto espera." ·
// g3 "Es de la casa." (se reusa en Q4) · b2 Beto (audio) "Ya está, Gustavo. Me contestó otro." · b3 Beto (audio) "Ya las
// están bajando." (se reusa en Q4) · g4 "Era de la casa." · t1 Tito "¿Me das una bolsita de portland?" (se reusa en Q3) ·
// nar "Un agente de IA más tarde." · g5 "Ya le dijo." · g6 "Las que quieras, Tito." · f1 Sofi "Comentá OBRA y te mando
// cómo funciona para tu corralón."
const VOCES = ["b1", "g1", "g2", "g3", "b2", "b3", "g4", "t1", "g5", "g6", "f1"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: Gustavo atrás del mostrador con el tubo del teléfono de pared en el hombro; el celular vibra ("20 sin
// leer"); el audio de Beto sale del celular · Gustavo cuelga el tubo: "¡Ya te digo!" y sale hacia el portón
T.b1 = 0.12; T.cuelga = r2(T.b1 + LEN.b1 + 0.0); T.g1 = r2(T.b1 + LEN.b1 + 0.08);   // (r2) más apretado
T.sale = [r2(T.g1 + 0.25), r2(T.g1 + LEN.g1 + 0.2)];
// P2 · la escalada: en el patio Gustavo cuenta la pila (37… 38… 39…), cortes al celular del mostrador (6:47, 6:48,
// 6:49 y 6:50; el contador 20 → 27), el teléfono de pared suena solo; "¡40!" y la palmada en la bolsa
T.p2 = r2(T.g1 + LEN.g1 + 0.22);
T.cuenta = [0.1, 0.62, 1.14].map((d) => r2(T.p2 + d)); T.n40 = r2(T.p2 + 1.78);   // (r1) escalada más corta
T.ins = [[0.3, 0.58], [0.82, 1.1], [1.34, 1.66]].map(([a, b]) => [r2(T.p2 + a), r2(T.p2 + b)]);
T.fila = [r2(T.ins[0][0] + 0.05), r2(T.ins[1][0] + 0.05), r2(T.ins[2][0] + 0.05), r2(T.ins[2][0] + 0.2)];
// P3 · inserto: "Tengo las 40. ¿Te las mando?" (un tilde gris) · plano medio: el primero de la fila le señala el
// celular; Gustavo levanta un dedo: "Beto espera." · "Es de la casa."
T.p3 = r2(T.n40 + 0.42); T.tipea = r2(T.p3 + 0.05); T.manda = r2(T.p3 + 0.38);
T.p3b = r2(T.p3 + 0.46); T.g2 = r2(T.p3b + 0.14); T.g3 = r2(T.g2 + LEN.g2 + 0.14);
// P4 · el golpe: inserto del chat con Beto: "Ya está, Gustavo. Me contestó otro." · "Ya las están bajando." + la FOTO
T.p4 = r2(T.g3 + LEN.g3 + 0.12); T.b2 = r2(T.p4 + 0.14); T.b3 = r2(T.b2 + LEN.b2 + 0.1); T.foto = r2(T.b3 + 0.08);
// P5 · la pausa: la pila de 40 intacta, Gustavo de espaldas en el portón; los rótulos del costo
T.p5 = r2(T.b3 + LEN.b3 + 0.22); T.rot = [r2(T.p5 + 0.15), r2(T.p5 + 0.42)];
// P6 · el remate: "Era de la casa."
T.p6 = r2(T.p5 + 0.92); T.g4 = r2(T.p6 + 0.15);
// P7 · remate del remate: Tito apoya los codos: "¿Me das una bolsita de portland?"; Gustavo gira la cabeza a la pila
T.p7 = r2(T.g4 + LEN.g4 + 0.1); T.t1 = r2(T.p7 + 0.12); T.gira = r2(T.t1 + LEN.t1 + 0.02); T.dedo = r2(T.t1 + LEN.t1 - 0.2);
const P1 = r2(T.gira + 0.42);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.12));
// ---- parte 2 ----
// Q1 · el encuadre del cuadro 0, otro lunes: el mismo audio de Beto; el agente contesta antes de que termine
T.q1 = P2; T.b1b = r2(P2 + 0.15);
T.q1i = r2(P2 + 0.95); T.escr = r2(T.q1i + 0.12); T.resp = r2(T.q1i + 0.5);   // el agente contesta mientras Beto todavía habla
T.dale = r2(T.resp + 0.75); T.conf = r2(T.dale + 0.45);
// Q1g · Gustavo, por costumbre: "¡Ya te digo!" (el mismo audio), el ding y "Ya le dijo."
T.q1g = r2(Math.max(T.conf + 0.45, T.b1b + LEN.b1 - 0.1)); T.g1b = r2(Math.max(T.q1g + 0.1, T.b1b + LEN.b1 + 0.1)); T.ding = r2(T.g1b + LEN.g1 + 0.12); T.q1h = r2(T.ding - 0.04); T.g5 = r2(T.ding + 0.3);   // (r2) Q1h: corte al celular parado con el ding
// Q2 · los 27 contestados (inserto): fila por fila, el contador baja a 0, el de 300 bolsas "Para vos, Gustavo"
T.q2 = r2(T.g5 + LEN.g5 + 0.32); T.filas = [0.15, 0.5, 0.85, 1.2].map((d) => r2(T.q2 + d));
T.cero = r2(T.q2 + 1.5); T.paraVos = r2(T.q2 + 1.75); T.rq2 = [r2(T.q2 + 0.45), r2(T.paraVos + 0.12)];
// Q3 · el mostrador libre: Tito (el mismo audio), "Las que quieras, Tito." y la bolsa en el mostrador · el panel
T.q3 = r2(T.q2 + 2.95); T.t1b = r2(T.q3 + 0.2); T.g6 = r2(T.t1b + LEN.t1 + 0.22); T.apoya = r2(T.g6 + LEN.g6 + 0.05);
T.q3m = r2(T.apoya + 0.25); T.suma = [0.08, 0.24, 0.4, 0.56, 0.72].map((d) => r2(T.q3m + d));
// Q4 · la misma foto, otro camión: "Ya las están bajando." (el mismo audio) · Gustavo, el pallet vacío: "Es de la casa."
T.q4 = r2(T.q3m + 1.2); T.b3b = r2(T.q4 + 0.18); T.foto2 = r2(T.b3b + 0.08); T.entregado = r2(T.b3b + LEN.b3 + 0.05);
T.q4g = r2(T.entregado + 0.5); T.g3b = r2(T.q4g + 0.12); T.arranca = r2(T.q4g + 0.05);
// Q5 · cierre: el monitor y el celular parado con Sofi en videollamada: "Comentá OBRA…"
T.q5 = r2(T.g3b + LEN.g3 + 0.15); T.f1 = r2(T.q5 + 0.08); T.palabra = r2(T.f1 + 0.05);   // (r1) cierre ≤ 3,4 s
const DUR = Math.ceil((Math.ceil((T.f1 + LEN.f1 + 0.1) * 30) / 30) * 1e4) / 1e4;   // múltiplo de un cuadro
T.cierre = r2(DUR - 1.5);

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

// P1 · el rubro: "CORRALONES" enorme arriba (en el recuadro verde) y "Y BARRACAS" un poco más chico, entero desde el
// cuadro 0; se va con el corte al patio (P2)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 96px; padding: 26px 10px 26px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 112px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .tx2 { font: 900 84px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; white-space: nowrap; margin-top: 18px; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; }
    P .sel b { position: absolute; inset: -6px 0 -10px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>CORRALONES</em></span></div><div class="tx2">Y BARRACAS</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
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
    P .texto { position: absolute; left: 0; right: 0; top: 700px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 146px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
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
        ${lin("a", ["Un", "agente"])}
        ${lin("b", ["de", "IA"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.03 : 1.3 + (i - nAB) * 0.03;   // "más tarde…" entra cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.06, ease: "power2.in" }, ${r2(dur - 0.08)});   // (r2) el barrido lo tapa; no queda verde vacío   // se va entero antes del iris`,
  });
}

// Q5 · "Comentá OBRA" grande arriba (OBRA en el recuadro verde), entra en la palabra y queda hasta el final
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 90px; right: 90px; top: 64px; padding: 24px 10px 40px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 96px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 30px; margin-top: 10px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 14px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>OBRA</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: -60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.08, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.4);`,
  });
}

// la línea chica final (abajo): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1500px; padding: 24px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 74px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA que</div><div class="a">atiende tu WhatsApp</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 520 }, { y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, 0.0);
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
const pasos = (a, b, n, techo = -46, tierra = false) => { for (let i = 0; i < n; i++) s(tierra ? `sfx/k-tierra-${[0, 2, 4][i % 3]}.wav` : `sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -40) => { techo = Math.min(-33, techo + 5); s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.18, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -40) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.15, fin: 0.05 });
const bolsa = (t, techo = -33, k = 0) => s(["sfx/k-bolsa-0.wav", "sfx/k-bolsa-2.wav", "sfx/k-bolsa-m.wav"][k % 3], t, 0, { techo, pico: -10, dur: 0.5, fin: 0.15, lp: 3500 });
// la obra dentro de los audios de Beto: martillazos de chapa lejanos (pasabajos, bajitos)
const obra = (a, b, techo = -41) => { for (let t = a + 0.15, i = 0; t < b - 0.1; t += 0.55 + (i % 3) * 0.08, i++) s("sfx/k-metal-liviano-2.wav", t, 0, { techo, lp: 2200, hp: 300, vel: 0.9 + (i % 2) * 0.12, dur: 0.3, fin: 0.1 }); };
const ring = (t, techo = -36, n = 2) => { for (let i = 0; i < n; i++) s("sfx/k-dos-tonos.wav", t + i * 0.42, 0, { techo, hp: 500, dur: 0.38, fin: 0.06 }); };
// ---- parte 1 ----
// ambiente: el zumbido de los tubos del galpón, un pájaro afuera; la música baja en la pausa
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -48, lp: 700 });
s("sfx/pajaro.wav", 0.6, 0, { techo: -45, dur: 1.6, fin: 0.4 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -34, duck: [[T.p5 - 0.1, T.p7, 0.8], [T.p2 + 0.3, T.p3, -0.6]] });   // (r2) la música sube en la escalada
// P1 · el celular vibra en el mostrador; el audio de Beto (con la obra adentro); cuelga el tubo; "¡Ya te digo!"; pasos
s("sfx/vibra.wav", 0.02, 0, { techo: -37, dur: 0.5, fin: 0.1 }); s("sfx/vibra.wav", 1.6, 0, { techo: -40, dur: 0.45, fin: 0.1 });
voz("b1", T.b1, -1); obra(T.b1, T.b1 + LEN.b1, -42);
s("sfx/k-plastico.wav", T.cuelga - 0.05, 0, { techo: -38, dur: 0.3, fin: 0.1 }); s("sfx/k-metal-click.wav", T.cuelga + 0.04, 0, { techo: -36 });
voz("g1", T.g1, -1);
pasos(T.sale[0], T.p2, 3, -42);
// P2 · la escalada: pasos en la tierra, el toque en cada bolsa, los mensajes que entran (cada uno un poco más fuerte),
// el teléfono de pared que suena solo, "¡40!" con la palmada y el polvo
pasos(T.p2, T.p2 + 0.3, 2, -42, true);
T.cuenta.forEach((t, i) => bolsa(t, -40 + i, 2));
T.ins.forEach(([a]) => s("sfx/whoosh-short.mp3", a - 0.04, 0, { techo: -42, vel: 1.2 }));
T.fila.forEach((t, i) => { noti(t, -33 + i * 0.7); s("sfx/vibra.wav", t + 0.12, 0, { techo: -36, dur: 0.3, fin: 0.1 }); });
bolsa(T.n40, -31, 0); s("sfx/k-cloth_1.wav", T.n40 + 0.05, 0, { techo: -40, dur: 0.3, fin: 0.1 });
// P3 · el teclado; el envío; vibra (sigue en 27)
for (let i = 0; i < 4; i++) tecla(T.tipea + i * 0.07, -40);
s("sfx/whoosh-short.mp3", T.manda, 0, { techo: -42, vel: 1.4 });
s("sfx/vibra.wav", T.p3b + 0.05, 0, { techo: -40, dur: 0.4, fin: 0.1 });
voz("g2", T.g2, -1); voz("g3", T.g3, -1);
// P4 · el golpe: entra el audio de Beto (la obra adentro, un camión que descarga); la foto con un pop
noti(T.p4 + 0.05, -36);
voz("b2", T.b2, -1); voz("b3", T.b3, -1); obra(T.b2, T.b3 + LEN.b3, -40);
pop(T.foto, -38);
// P5 · la pausa: el zumbido del tubo, el pájaro; un pop chico por rótulo
s("sfx/zumbido.wav", T.p5, 0, { dur: r2(T.p7 - T.p5), fi: 0.15, fin: 0.2, techo: -44, lp: 900 });
s("sfx/pajaro.wav", T.p5 + 0.3, 0, { techo: -43, desde: 1.0, dur: 1.2, fin: 0.3 });
T.rot.forEach((t) => pop(t, -42));
// P6 · el remate
voz("g4", T.g4, -1);
// P7 · los codos de Tito en la madera; Tito; el dedo; el stinger
s("sfx/madera-golpe.wav", T.p7 + 0.02, 0, { techo: -38, dur: 0.4, fin: 0.1 });
voz("t1", T.t1, -1); s("sfx/k-cloth_2.wav", T.gira, 0, { techo: -38, dur: 0.4, fin: 0.1 }); s("sfx/zumbido.wav", T.gira - 0.1, 0, { dur: r2(P1 - T.gira + 0.1), fi: 0.1, fin: 0.1, techo: -40, lp: 900 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.02, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.02 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.5, techo: -34, duck: [[T.q2 + 0.5, T.q3 - 0.1, -0.6], [T.q3m + 0.1, T.q4, -0.6]] });   // (r2) sube en los tramos sin voz
s("sfx/zumbido-largo.wav", P2, 0, { loop: true, desde: 3, dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -49, lp: 700 });
s("sfx/pajaro.wav", P2 + 0.5, 0, { techo: -46, dur: 1.4, fin: 0.4 });
// Q1 · el mismo audio de Beto; el agente escribe y contesta; Beto confirma; la tarjeta verde
voz("b1", T.b1b, -1); obra(T.b1b, T.b1b + LEN.b1, -42);
s("sfx/whoosh-short.mp3", T.q1i - 0.04, 0, { techo: -44 });
noti(T.resp, -42); pop(T.resp + 0.02, -44); noti(T.dale, -42); ding(T.conf, -38);
// Q1g · "¡Ya te digo!" (el mismo), el ding del celular parado, "Ya le dijo."
voz("g1", T.g1b, -1); s("sfx/k-plastico.wav", T.g1b - 0.05, 0, { techo: -38, dur: 0.3, fin: 0.1 });
s("sfx/ding.mp3", T.ding, 0, { techo: -34 });
voz("g5", T.g5, -1);
// Q2 · los chats: un tilde por fila, el contador que baja, el cero, la campanita de "Para vos"
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -42 });
T.filas.forEach((t, i) => { toque(t, -38); pop(t + 0.18, -44); });
for (let k = 0; k < 8; k++) tic(T.q2 + 0.2 + k * 0.16, -40, k);
ding(T.cero, -34); pop(T.rq2[0], -44);
s("sfx/campanita.wav", T.paraVos, 0, { techo: -36, dur: 0.9, fin: 0.3 }); pop(T.rq2[1], -44);
// Q3 · los codos de Tito; Tito (el mismo audio); Gustavo; la bolsa en el mostrador; el panel que suma
s("sfx/madera-golpe.wav", T.q3 + 0.05, 0, { techo: -38, dur: 0.4, fin: 0.1 });
voz("t1", T.t1b, -1);
voz("g6", T.g6, -1);
bolsa(T.apoya - 0.22, -31, 1);   // (r1) el golpe con la bolsa que toca la mesada
s("sfx/whoosh-short.mp3", T.q3m - 0.04, 0, { techo: -42 });
T.suma.forEach((t, i) => { tic(t, -40, i); if (i === 4) ding(t + 0.05, -34); });
// Q4 · el audio de Beto (el mismo), la foto, "Entregado ✓"; el camión arranca lejos; "Es de la casa." (el mismo)
noti(T.q4 + 0.05, -40);
voz("b3", T.b3b, -1); obra(T.b3b, T.b3b + LEN.b3, -41);
pop(T.foto2, -38); ding(T.entregado, -36);
s("sfx/motor.mp3", T.foto2 + 0.1, 0, { techo: -38, vel: 0.72, lp: 1500, dur: 1.6, fin: 0.5 });
voz("g3", T.g3b, -1);
// Q5 · Sofi, el pop de OBRA, la línea chica
s("sfx/whoosh.mp3", T.q5 - 0.1, 0, { techo: -42 });
voz("f1", T.f1, -1);
pop(T.palabra + 0.02, -38);
pop(T.cierre + 0.05, -44);
// la cama +4 dB y, en los tramos sin voz (la escalada, la pausa, los chats), los SFX +6 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.p2 + 0.25, T.p3b) || en(t0, T.p5 + 0.3, T.p6) || en(t0, T.q2 + 0.45, T.q3) || en(t0, T.q3m, T.q4)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 8); }
// (r1) los SFX que arrancan en los 0,45 s después de que termina una voz no tapan la cola (ventana de 400 ms)
{ const fines = S.filter((x) => x[3].voz).map((x) => x[1] + LEN[x[0].includes("narrador") ? "nar" : x[0].slice(6, -4)]);
  for (const x of S) { if (x[3].voz || x[0].startsWith("bgm/")) continue; if (fines.some((f) => x[1] >= f - 0.05 && x[1] < f + 0.45)) x[3].techo = Math.min(x[3].techo ?? TECHO, -40); } }
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
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
      <div id="precarga">Gustavo</div><div id="precarga2">$ 520</div>
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
