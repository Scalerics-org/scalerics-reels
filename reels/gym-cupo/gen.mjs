// Genera todo gym-cupo desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Un sistema de reservas más tarde…",
//     la tarjeta "Comentá CUPO" y la línea chica final); burbujas, chips, el contador y los rótulos son 3D pegados a la
//     cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Base: reels/pilates-cuota (mismo armado). LIMPIO=1: sin capa plana ni tarjetas (fondo de la portada). MEDIR=1: además
// escribe stems voz / resto. SINAUDIO=1: no rehace la mezcla. VER=portada: la cámara de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/lineas.tsv y partes/procesar.sh): m1 Mauro "Veintidós «yo voy». Hoy explota." · j1 Majo
// (audio) "Mauro, ¿hay lugar a las siete?" · m2 "Llena, Majo. Perdoná." · m3 (micrófono) "Los «yo voy» no pedalean." ·
// nar "Un sistema de reservas más tarde." · j2 Majo "¿Quedan tres? ¡La siete!" · m4 (micrófono) "Catorce reservas.
// Pedalean catorce." · g1 Graciela "Profe, ¿y ahora la toalla dónde la cuelgo?" · m5 (micrófono) "En el cuello, Graciela." ·
// m6 Mauro a cámara "Comentá CUPO y te mando cómo funciona para tu gimnasio."
const VOCES = ["m1", "j1", "m2", "m3", "j2", "m4", "g1", "m5", "m6"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
// dónde arranca la segunda frase de cada voz (para revelar la burbuja por frase entera), de partes/tmp/pal-*.json
const FRASE2 = { m1: 1.3, m2: 0.58, m3: 1.1, j2: 0.63, m4: 0.92 };
const T = { FRASE2 };
// ---- parte 1 ----
// P1 · cuadro 0, 18:20: Mauro en la bici del profe con el celular; el grupo se llena de "yo voy" (YO VOY 14 → 22)
T.yv = [0.05, 0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6].map(r2);            // cada "yo voy" nuevo: el contador llega a 22 antes que la burbuja
T.m1 = 0.72;
T.sticker = 1.6; T.audio47 = 2.1;
T.p1b = r2(T.m1 + LEN.m1 + 0.15);
// P1b · inserto del celular (el mismo chat): el audio de Majo, "Llena, Majo. Perdoná.", Sole "¿Me guardás una?", "Llena, Sole."
T.j1 = r2(T.p1b + 0.05);
T.m2 = r2(T.j1 + LEN.j1 + 0.3); T.llenaM = r2(T.m2 + 0.05);   // (r3 B1) aire antes de "Llena, Majo."
T.sole = r2(T.m2 + 0.6); T.llenaS = r2(T.m2 + LEN.m2 + 0.02); T.rotLlena = r2(T.llenaS + 0.05);
T.p2 = r2(T.rotLlena + 0.45);
// P2 · 19:00: la sala desde la tarima; el reloj corre hasta 19:00 mientras entran los nueve (cámara rápida) y se sientan
T.puerta = r2(T.p2 + 0.02);
T.entra = Array.from({ length: 9 }, (_, i) => r2(T.p2 + 0.05 + i * 0.1));    // sale de la puerta
T.sienta = T.entra.map((e) => r2(e + 0.45));                                 // ya sentado (VINIERON +1)
T.cierra = r2(T.sienta[8] + 0.05);
// P3 · el gag de cerca (push-in a la primera fila): la toalla de Graciela a la 2, la botella a la 4, el celular a la 7, la
// campera a la 11 y la mochila a la 13; "Bici 2: perchero" y "5 bicis vacías"
T.p3 = r2(T.cierra + 0.1);
T.perchero = [0.05, 0.3, 0.45, 0.6, 0.72].map((d) => r2(T.p3 + d));   // toalla · botella · celular · campera · mochila
T.rotPerch = r2(T.p3 + 0.38); T.rot5 = r2(T.p3 + 0.6);
// P3i · el mensaje de Majo (19:01) y el costo, 1,5 s en pantalla
T.p3i = r2(T.p3 + 2.45); T.rotCosto = r2(T.p3i + 0.08);   // (r3 M3) el gag legible ~2 s
T.p4 = r2(T.p3i + 1.6);
// P4 · el remate: pausa, "Los «yo voy» no pedalean."
T.m3 = r2(T.p4 + 0.4);
T.p5 = r2(T.m3 + LEN.m3 + 0.12);
// P5 · remate del remate, 19:04: vibra el celular, "Nico: ¿Ya empezó? Yo voy.", 22 → 23 · P5c Mauro lo da vuelta en el
// soporte · P5b arrancan a pedalear con la música
T.vibra = r2(T.p5 + 0.05); T.rodri = r2(T.p5 + 0.12); T.v23 = r2(T.rodri + 0.1);
T.p5c = r2(T.p5 + 0.72); T.vuelta = r2(T.p5c + 0.25);
T.p5b = r2(T.p5c + 0.8); T.musica = r2(T.p5b + 0.0);
const P1 = r2(T.p5b + 0.62);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.4, LEN.nar + 0.12));
// ---- parte 2 ----
// Q1 · lunes 21:30: el mapa "Quedan 3" (inserto) · Majo en el sofá: "¿Quedan tres? ¡La siete!" · toca la 7 → reservada ·
// se llena (14/14) · el celular de Sole: lista de espera
T.q1 = P2;
T.q1b = r2(P2 + 0.5); T.j2 = r2(T.q1b + 0.1);
T.q1c = r2(T.j2 + LEN.j2 + 0.12); T.toca7 = r2(T.q1c + 0.2); T.reserva7 = r2(T.q1c + 0.5);
T.ocupa = [r2(T.q1c + 0.95), r2(T.q1c + 1.08)]; T.llena = r2(T.q1c + 1.22);
T.q1s = r2(T.q1c + 1.32); T.tocaEspera = r2(T.q1s + 0.3); T.espera = r2(T.q1s + 0.5);
T.q2 = r2(T.q1s + 0.92);
// Q2 · martes 15:00: el recordatorio a Lucía · "Liberar mi bici" · la tablet: la 4 libre · el aviso a Sole · "La quiero"
T.recuerda = r2(T.q2 + 0.1); T.libera = r2(T.q2 + 0.85);
T.q2t = r2(T.q2 + 1.15); T.libre4 = r2(T.q2t + 0.2);
T.q2s = r2(T.q2t + 0.85); T.aviso = r2(T.q2s + 0.05); T.quiero = r2(T.q2s + 0.4); T.reserva4 = r2(T.quiero + 0.15); T.otraVez = r2(T.reserva4 + 0.1);
T.q3 = r2(T.q2s + 1.85);
// Q3 · martes 19:00: el mismo encuadre de P2 con las 14 ocupadas, pedaleando · "Catorce reservas. Pedalean catorce." ·
// Q3b Graciela con la toalla: "Profe, ¿y ahora la toalla dónde la cuelgo?" · Q3c Mauro: "En el cuello, Graciela." · Q3d
// Graciela se la pone al cuello
T.m4 = r2(T.q3 + 0.25);
T.q3b = r2(T.m4 + LEN.m4 + 0.05); T.g1 = r2(T.q3b + 0.12);
T.q3c = r2(T.g1 + LEN.g1 + 0.06); T.m5 = r2(T.q3c + 0.06);
T.q3d = r2(T.m5 + LEN.m5 + 0.05); T.cuello = r2(T.q3d + 0.25);   // (r3 M2) las manos la suben (0,25 s) y la bajan al cuello (0,3 s)
T.q4 = r2(T.q3d + 1.1);
// Q4 · el panel de noviembre: filas con tilde; "Bicis vacías en el mes 20 → 1"
T.filas = [0.02, 0.17, 0.32, 0.47].map((d) => r2(T.q4 + d)); T.gira = [r2(T.q4 + 0.65), r2(T.q4 + 0.85)];   // (r3 M6/B2) las filas enseguida; el giro más corto
T.c = r2(T.q4 + 1.75);
// C · Mauro a cámara: "Comentá CUPO y te mando cómo funciona para tu gimnasio."
T.m6 = r2(T.c + 0.05); T.palabra = r2(T.m6 + 0.02);
const DUR = Math.ceil((Math.ceil((T.m6 + LEN.m6 + 0.12) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(DUR - 1.55);

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

// P1 · el rubro: "GIMNASIOS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0; se va con el
// corte al inserto del celular (P1b)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p1b - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 60px; padding: 26px 6px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 132px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 24px; }
    P .sel b { position: absolute; inset: -8px 0 -4px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>GIMNASIOS</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -420, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Un sistema de reservas más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
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
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 112px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 138px; margin-top: 14px; }
    P .linea.c { font-size: 138px; margin-top: 18px; }
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
        ${lin("a", ["Un", "sistema", "de"])}
        ${lin("b", ["reservas"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.025 : 1.25 + (i - nAB) * 0.03;   // "más tarde…" entra cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0.35, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        tl.fromTo(l, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: "none", immediateRender: true }, t0);   // (r3 B4) sin glifo suelto: aparece con opacidad, no desde un punto
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.38)});   // se va entero antes del iris`,
  });
}

// C · "Comentá / CUPO / y te mando cómo funciona para tu gimnasio": abajo de la cara de Mauro, entra en "Comentá" y queda
// hasta el final
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.05);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 990px; padding: 18px 10px 26px; border-radius: 40px; background: ${NAVY}; border: 8px solid ${CR}; box-shadow: 12px 14px 0 rgba(3,6,12,0.6); text-align: center; transform-origin: 50% 100%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${CR}; }
    P .tx { font: 900 176px/1.04 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 30px; margin-top: 8px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 8px solid ${CR}; border-radius: 14px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 12px; font: 700 54px/1.18 "Lexend", sans-serif; color: ${CR}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>CUPO</em></span></div><div class="c">y te mando cómo funciona<br>para tu gimnasio</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 80 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.08, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.12);`,
  });
}

// la línea chica final (abajo): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.05);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1540px; padding: 14px 18px 18px; border-radius: 28px; background: ${CR}; border: 6px solid ${NAVY}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.015em; }
    P .b { margin-top: 6px; display: inline-block; padding: 2px 18px 6px; border-radius: 14px; background: ${NAVY}; font: 800 60px/1.1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Reservas con cupo real y lista de espera</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { autoAlpha: 0, scale: 0.82 }, { autoAlpha: 1, scale: 1, duration: 0.24, ease: "back.out(1.6)", immediateRender: true }, 0.0);   // (r3 M4) entra en su lugar: no asoma cortada por el borde
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: true }, 0.25);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,3 s), techo, pico, sinDuck }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.02 }); VOZ.push([r2(t - 0.5), r2(t + LEN[f] + 0.5)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const vibra = (t, techo = -38) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.45, fin: 0.1 });
const noti = (t, techo = -40) => s("sfx/notification.mp3", t - 0.02, 0, { techo, dur: 0.35, fin: 0.12 });
const tela = (t, techo = -40, k = 1) => s(`sfx/k-cloth_${k}.wav`, t, 0, { techo, dur: 0.35, fin: 0.1 });
const tic = (t, techo = -44, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -42) => s("sfx/whoosh-short.mp3", t - 0.04, 0, { techo });
// ---- parte 1 ----
// la sala: el ventilador de pie (todo el tiempo en la sala) y la música de espera bajita del parlante (pasabajos)
const sala = (a, b, techo = -44) => s("sfx/ventilador.wav", a, 0, { loop: true, desde: 1, dur: r2(b - a), fi: 0.05, fin: 0.1, techo, lp: 1800, sinDuck: true });
sala(0, T.p1b + 0.05); sala(T.p2 - 0.05, T.p3i + 0.05); sala(T.p4 - 0.05, P1 + 0.02, -42);
s("sfx/ventilador.wav", T.p1b, 0, { loop: true, desde: 3, dur: r2(T.p2 - T.p1b), fi: 0.1, fin: 0.1, techo: -50, lp: 900, sinDuck: true });
s("sfx/ventilador.wav", T.p3i, 0, { loop: true, desde: 5, dur: r2(T.p4 - T.p3i), fi: 0.1, fin: 0.1, techo: -50, lp: 900, sinDuck: true });
s("bgm/spinning.mp3", 0, 0, { desde: 2, dur: r2(T.p5b + 0.02), fi: 0.05, fin: 0.05, techo: -34, lp: 1100, duck: [[T.p4 - 0.25, T.p5b, 0.7]] });   // la música de espera (bajita, del parlante)
// P1 · los "yo voy" que entran (una notificación chica por burbuja, con altura que varía) y el tic del contador
T.yv.forEach((m, i) => { s("sfx/notification.mp3", m, 0, { techo: -45 - (i % 3), dur: 0.22, fin: 0.08, vel: 1 + (i % 3) * 0.06 }); tic(m + 0.03, -46, i); });
s("sfx/notification.mp3", T.sticker, 0, { techo: -45, dur: 0.22, fin: 0.08 }); s("sfx/notification.mp3", T.audio47, 0, { techo: -45, dur: 0.22, fin: 0.08, vel: 1.06 });
voz("m1", T.m1, -1);
// P1b · el inserto: vibra con el audio de Majo; Mauro escribe; Sole; "Llena, Sole."; el pop del rótulo
whoosh(T.p1b, -42); vibra(T.p1b + 0.02, -40);
voz("j1", T.j1, -1);
for (let k = 0; k < 7; k++) s("sfx/key-press.mp3", T.m2 + 0.05 + k * 0.11, 0, { techo: -50, hp: 600 });
voz("m2", T.m2, -1);
s("sfx/whoosh-short.mp3", T.llenaM + 0.55, 0, { techo: -46, vel: 1.4 });
noti(T.sole, -42);
for (let k = 0; k < 4; k++) s("sfx/key-press.mp3", T.llenaS - 0.3 + k * 0.08, 0, { techo: -48, hp: 600 });
s("sfx/whoosh-short.mp3", T.llenaS, 0, { techo: -44, vel: 1.4 }); pop(T.rotLlena + 0.02, -38);
// P2 · la puerta, los pasos de los nueve, el clic de cada asiento, el tic del contador; los percheros (tela, plástico, celular)
s("sfx/puerta-abre.wav", T.puerta, 0, { techo: -38 });
T.entra.forEach((e, i) => { pasos(e, e + 0.4, 2, -53); s("sfx/k-metal-click.wav", T.sienta[i], 0, { techo: -47, lp: 3000 }); tic(T.sienta[i] + 0.02, -43, i); });
s("sfx/puerta-abre.wav", T.cierra, 0, { techo: -44, vel: 0.85, lp: 2000 });
tela(T.perchero[0] + 0.25, -38, 1); s("sfx/k-plastico.wav", T.perchero[1] + 0.26, 0, { techo: -41 });
s("sfx/k-tick-2.wav", T.perchero[2] + 0.26, 0, { techo: -43 }); tela(T.perchero[3] + 0.25, -43, 2); tela(T.perchero[4] + 0.25, -44, 2);
T.perchero.forEach((p) => pop(p + 0.27, -45));
// P3 · la pausa: solo el ventilador · el pop de los rótulos · la notificación de Majo
pop(T.rot5 + 0.02, -41); pop(T.rotPerch + 0.02, -41);
whoosh(T.p3i, -44); noti(T.p3i + 0.08, -40); pop(T.rotCosto + 0.02, -38);
voz("m3", T.m3, -1);   // (r1) faltaba: el remate no sonaba
// P4 · el remate (nada encima) · P5 · vibra en el soporte, la notificación, el 23 · lo da vuelta · arranca la música
vibra(T.vibra, -39); noti(T.rodri, -40);
s("sfx/k-tick-4.wav", T.v23, 0, { techo: -37 }); pop(T.v23 + 0.02, -39);
s("sfx/k-metal-click.wav", T.vuelta + 0.2, 0, { techo: -36 });
s("sfx/click-soft.mp3", T.musica - 0.12, 0, { techo: -38 });
s("bgm/spinning.mp3", T.musica, 0, { desde: 33.5, dur: r2(P1 - T.musica + 0.02), fi: 0.02, fin: 0.02, techo: -33 });
s("sfx/fs-bici-fija.mp3", T.musica + 0.05, 0, { desde: 12, dur: r2(P1 - T.musica - 0.03), fi: 0.15, fin: 0.03, techo: -40 });
// ---- cartel ----
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -33, dur: 0.6, fin: 0.25 });
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -40 });
s("voice/narrador.wav", P1 + 0.05, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.05 + LEN.nar + 0.45)]);
for (const d of [0.12, 0.4, 0.9, 1.6]) pop(P1 + d + 0.02, -46);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
// Q1 · el living de noche (zumbido muy bajo) · toques en el mapa · reservada · se ocupan 4 y 13 · Sole
s("sfx/zumbido.wav", P2, 0, { loop: true, dur: r2(T.q2 - P2), fi: 0.3, fin: 0.2, techo: -50, lp: 700, sinDuck: true });
s("bgm/spinning.mp3", P2, 0, { desde: 20, dur: r2(T.q3 - P2), fi: 0.5, fin: 0.3, techo: -33, lp: 2500 });   // (r3 M7) más arriba en los huecos (el duck la baja debajo de la voz)
pop(T.q1 + 0.1, -40);
voz("j2", T.j2, -1);
whoosh(T.q1c, -44); toque(T.toca7, -36); toque(T.reserva7 - 0.08, -38); ding(T.reserva7, -36);
T.ocupa.forEach((t, i) => tic(t, -38, i)); s("sfx/k-tick-4.wav", T.llena, 0, { techo: -38 });
whoosh(T.q1s, -42); toque(T.tocaEspera, -36); ding(T.espera, -36);
// Q2 · el recordatorio, "Liberar mi bici", la tablet, el aviso a Sole, "La quiero"
whoosh(T.q2, -42); noti(T.recuerda, -36); toque(T.libera, -36);
s("sfx/whoosh.mp3", T.q2t - 0.15, 0, { techo: -40 }); tic(T.libre4, -36, 2); pop(T.libre4 + 0.05, -40);
s("sfx/whoosh.mp3", T.q2s - 0.15, 0, { techo: -40 }); vibra(T.aviso, -40); noti(T.aviso + 0.08, -40);
toque(T.quiero, -38); ding(T.reserva4, -38); pop(T.otraVez + 0.02, -40);
// Q3 · la sala llena: la música de spinning (más baja debajo de las voces) y el zumbido de las bicis; la toalla al cuello
s("bgm/spinning.mp3", T.q3, 0, { desde: 40, dur: r2(DUR - T.q3), fi: 0.05, fin: 0.6, techo: -33, duck: [[T.q4 - 0.1, T.c, 0.25]] });
s("sfx/fs-bici-fija.mp3", T.q3, 0, { desde: 14, dur: r2(T.q4 - T.q3 + 0.05), fi: 0.05, fin: 0.1, techo: -42, sinDuck: true });
s("sfx/fs-bici-fija.mp3", T.c, 0, { desde: 18, dur: r2(DUR - T.c), fi: 0.1, fin: 0.4, techo: -48, sinDuck: true });
voz("m4", T.m4, -1);
voz("g1", T.g1, -1);
voz("m5", T.m5, -1);
tela(T.cuello + 0.25, -38, 1);
// Q4 · el panel: un tic por fila, el giro del 20 al 1, el ding de la última
whoosh(T.q4, -46);
T.filas.forEach((t, i) => tic(t, -38, i)); s("sfx/k-tick-4.wav", r2((T.gira[0] + T.gira[1]) / 2), 0, { techo: -38 }); ding(T.gira[1], -37);   // (r3 B2) el tic cuando cambia el número ding(T.filas[3] + 0.05, -38);
// C · "Comentá CUPO…": el pop de la tarjeta y de la línea chica
whoosh(T.c, -44);
voz("m6", T.m6, -1);
pop(T.palabra + 0.1, -38);
pop(T.cierre + 0.05, -44);
// la música: duck debajo de cada voz para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => b >= x[1] && a <= x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a, b, 0.72])]; }

for (const x of S) if (!(x[1] >= 0)) console.error("inicio negativo", x);
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
    for (const [a0, b0, k] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-(${a}))/0.3,0,1)*clip((${b}-t)/0.3,0,1)':eval=frame`; }
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
  fs.writeFileSync("assets/audio/ganancia.txt", String(r2(OBJ - I)));
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 1040px";   // el iris se abre desde el celular de Majo (el mapa del inserto de Q1)
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
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
      <div id="precarga">Gimnasios</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Majo
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
