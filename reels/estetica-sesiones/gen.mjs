// Genera todo estetica-sesiones desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (CENTROS DE ESTÉTICA y los chips de hora, el cartel "Un sistema más
//     tarde…", la tarjeta "Comentá SESIONES" y la línea chica final); las burbujas, los rótulos y los insertos son 3D
//     pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato completo (como estetica-turnos / resto-reservas): parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del
// canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): c1 Carolina "Lore, ¿cuántas me quedan?" (P1 y Q1) ·
// l1 "Dejame ver." · l2 "Según el cuaderno, una." · c2 "¿Una? Acá tengo siete sellos." · l3 "Hagamos el promedio." ·
// c3 "¿Y cuánto da?" · l4 "Tres." · l5 "Vale, ¿y la de Jimena?" (P6 y Q2) · nar "Un sistema más tarde." · c4 "Ah. Tres." ·
// l6 "Tres. Sin promedio." · c5 "Chau, tarjetita." · l7 "Comentá SESIONES y te mando cómo funciona para tu centro de
// estética."
const VOCES = ["c1", "l1", "l2", "c2", "l3", "c3", "l4", "l5", "c4", "l6", "c5", "l7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el gabinete desde la puerta; Vale termina la sesión (dos pips del cabezal) · "Lore, ¿cuántas me
// quedan?" · Lorena abre el cuaderno y hojea · "Dejame ver."
T.c1 = 0.2; T.pips = [0.55, 1.15];
T.hojea = [r2(T.c1 + LEN.c1 - 0.15), r2(T.c1 + LEN.c1 + 0.45)];
T.l1 = r2(T.c1 + LEN.c1 + 0.06);
// P2 · el cuaderno en las manos de Lorena (inserto 3D): la birome cuenta los palitos · rótulo · "Según el cuaderno, una."
T.p2 = r2(T.l1 + LEN.l1 + 0.1); T.cuenta = [r2(T.p2 + 0.1), r2(T.p2 + 1.0)]; T.rotC = r2(T.p2 + 0.35); T.l2 = r2(T.p2 + 0.2);
// P3 · contraplano de Carolina: abre la cartera, saca la tarjetita · "¿Una? Acá tengo siete sellos." · la extiende
T.p3 = r2(T.l2 + LEN.l2 + 0.04); T.cartera = r2(T.p3 + 0.03); T.saca = [r2(T.p3 + 0.05), r2(T.p3 + 0.7)]; T.c2 = r2(T.p3 + 0.12);
T.extiende = [r2(T.c2 + 1.0), r2(T.c2 + 1.5)];
// P3b · inserto de la tarjetita (7 sellos, 3 vacíos) · rótulo
T.p3b = r2(T.c2 + LEN.c2 + 0.02); T.rotT = r2(T.p3b + 0.18);
// P4 · la pausa muda (plano general): Lorena mira a Vale · Vale señala el post-it · rótulo · los tres rótulos juntos
T.p4 = r2(T.p3b + 0.92); T.mira = r2(T.p4 + 0.15); T.senala = [r2(T.p4 + 0.3), r2(T.p4 + 0.65)]; T.rotP = r2(T.p4 + 0.6); T.tres3 = r2(T.p4 + 0.95);
// P5 · primer plano de Lorena: "Hagamos el promedio." · contraplano de Carolina: "¿Y cuánto da?" · Lorena cierra el
// cuaderno · pausa · "Tres." · los rótulos del promedio y de la plata
T.p5 = r2(T.p4 + 1.45); T.l3 = r2(T.p5 + 0.12);
T.p5b = r2(T.l3 + LEN.l3 + 0.08); T.c3 = r2(T.p5b + 0.06);
T.p5c = r2(T.c3 + LEN.c3 + 0.04); T.cierra = [r2(T.p5c + 0.05), r2(T.p5c + 0.4)]; T.l4 = r2(T.c3 + LEN.c3 + 0.62);
T.rotProm = r2(T.l4 + LEN.l4 + 0.05); T.rotPlata = r2(T.rotProm + 0.3);
// P6 · remate del remate: "Vale, ¿y la de Jimena?" · Vale se levanta y gira el equipo: el costado de post-its · rótulo
T.p6 = r2(T.rotPlata + 0.95); T.l5 = r2(T.p6 + 0.08); T.levanta = [r2(T.l5 + 0.25), r2(T.l5 + 0.75)];
T.gira = [r2(T.l5 + LEN.l5 - 0.15), r2(T.l5 + LEN.l5 + 0.45)]; T.rotPost = r2(T.gira[1] + 0.05);
const P1 = r2(T.rotPost + 0.9);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.1));
// ---- parte 2 ----
// Q1 · el mismo encuadre del cuadro 0: Vale toca "Asistió" en su tablet · inserto de la ficha (el 7.º círculo, "Te quedan:
// 4 → 3", "Enviado a Carolina ✓") · vibra el celular de Carolina · "Lore, ¿cuántas me quedan?" (el mismo audio) mientras
// lo mira · inserto del celular · "Ah. Tres." · primer plano de Lorena: "Tres. Sin promedio."
T.q1 = P2; T.asistio = r2(P2 + 0.3); T.q1f = r2(P2 + 0.5); T.circulo = r2(T.q1f + 0.25); T.cuenta2 = r2(T.q1f + 0.55); T.enviado = r2(T.q1f + 0.9);
T.q1b = r2(T.q1f + 1.25); T.vibra = r2(T.q1b + 0.05); T.c1b = r2(T.q1b + 0.15);
T.q1c = r2(T.c1b + LEN.c1 + 0.05); T.msg = r2(T.q1c + 0.12); T.rotSola = r2(T.q1c + 0.45);
T.c4 = r2(T.q1c + 0.85); T.q1d = r2(T.q1c + 1.3);
T.q1e = r2(T.c4 + LEN.c4 + 0.06); T.l6 = r2(T.q1e + 0.08);
// Q2 · el mismo plano de P6 (18:30): "Vale, ¿y la de Jimena?" (el mismo audio) · Vale gira la tablet · inserto de la ficha
// de Jimena · Vale despega el último post-it, lo hace un bollito y lo tira al tacho
T.q2 = r2(T.l6 + LEN.l6 + 0.12); T.l5b = r2(T.q2 + 0.1); T.giraTab = [r2(T.l5b + LEN.l5 - 0.2), r2(T.l5b + LEN.l5 + 0.15)];
T.q2i = r2(T.l5b + LEN.l5 + 0.1); T.q2b = r2(T.q2i + 1.05);
T.despega = [r2(T.q2b + 0.05), r2(T.q2b + 0.35)]; T.bollo = [r2(T.q2b + 0.35), r2(T.q2b + 0.6)]; T.tira = [r2(T.q2b + 0.62), r2(T.q2b + 0.95)]; T.tapa = r2(T.q2b + 0.98);
// Q3 · dos meses después, el living de Carolina: vibra · inserto del celular (te queda 1 · Renovar y pagar · Confirmar ·
// Pagado ✓) · saca la tarjetita · "Chau, tarjetita." · la guarda en el cajón
T.q3 = r2(T.tapa + 0.25); T.vibra3 = r2(T.q3 + 0.15);
T.q3i = r2(T.q3 + 0.45); T.renovar = r2(T.q3i + 0.85); T.confirmar = r2(T.q3i + 1.2); T.pagado = r2(T.q3i + 1.5); T.rotRenov = r2(T.q3i + 0.25);
T.q3b = r2(T.q3i + 2.25); T.sacaT = [r2(T.q3b + 0.0), r2(T.q3b + 0.4)]; T.c5 = r2(T.q3b + 0.35);
T.cajon = [r2(T.c5 + LEN.c5 - 0.2), r2(T.c5 + LEN.c5 + 0.1)]; T.guarda = [r2(T.cajon[1]), r2(T.cajon[1] + 0.3)]; T.cierraCajon = [r2(T.guarda[1] + 0.02), r2(T.guarda[1] + 0.3)];
// Q4 · la recepción: el panel "Paquetes" en la tablet del atril (las filas de a una, el 0 grande al final)
T.q4 = r2(T.cierraCajon[1] + 0.15); T.filas = [0, 1, 2, 3].map((i) => r2(T.q4 + 0.25 + i * 0.28)); T.cero = r2(T.q4 + 1.45);
// C · Lorena a cámara: "Comentá SESIONES…" · la tarjeta entra en "SESIONES" · la línea chica el último tramo
T.c = r2(T.q4 + 2.25); T.l7 = r2(T.c + 0.15); T.palabra = r2(T.l7 + 0.32);
const DUR = Math.ceil((Math.ceil((T.l7 + LEN.l7 + 0.3) * 30) / 30) * 1e4) / 1e4;   // múltiplo de un cuadro
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
const CHIP = `
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }`;

// P1 · el rubro: "CENTROS DE ESTÉTICA" enorme arriba (navy sobre crema, ESTÉTICA en el recuadro verde) y el chip
// "Jueves, 18:00." debajo, enteros desde el cuadro 0; se van con el corte al cuaderno
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 70px; padding: 20px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 118px/1.06 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 418px; }`,
    html: `      <div class="caja"><div class="tx">CENTROS DE</div><div class="tx"><span class="sel"><b></b><em>ESTÉTICA</em></span></div></div>
      <div class="chip">Jueves, 18:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de hora de la parte 2 (arriba a la izquierda)
const CHIPS = [
  ["s11-chip", T.q1, T.q1f, "Jueves, 18:00."],
  ["s12-chip", T.q2, T.q2i, "Jueves, 18:30."],
  ["s13-chip", T.q3, T.q3i, "Dos meses después."],
];
for (const [id, ini0, fin, txt] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 70px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scaleY: 0.2, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.12, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}

// el cartel "Un sistema más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas. No dice
// "Scalerics".
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
    P .linea { display: block; font: 900 148px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 136px; margin-top: 18px; }
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
        ${lin("b", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = 0.0 + i * 0.035;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.1, ease: "power2.in" }, ${r2(dur - 0.22)});   // sale mientras crece el iris`,
  });
}

// C · la tarjeta de cierre abajo de la cara de Lorena: "Comentá" / SESIONES (recuadro verde) / "y te mando cómo funciona
// para tu centro de estética"; entra en la palabra "SESIONES" y queda hasta el final
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.05);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1010px; padding: 22px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 100%; }
    P .a { font: 800 88px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 142px/1.08 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 26px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 14px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 18px; font: 700 48px/1.2 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>SESIONES</em></span></div><div class="c">y te mando cómo funciona<br>para tu centro de estética</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 80 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.08, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.4);`,
  });
}
// la línea chica final (abajo de la tarjeta, nunca sobre la cara): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.05);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1560px; padding: 20px 26px 26px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">La ficha de cada clienta con su</div><div class="a">paquete, que se descuenta sola</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420 }, { y: 0, duration: 0.28, ease: "back.out(1.4)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: true }, 0.25);`,
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
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.6), r2(t + LEN[f] + 0.95)]); };
const vibra = (t, techo = -38) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.45, fin: 0.1 });
const noti = (t, techo = -38) => s("sfx/notification.mp3", t, 0, { techo, dur: 0.35, fin: 0.12 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const tela = (t, techo = -40, k = 1) => s(`sfx/k-cloth_${k}.wav`, t, 0, { techo, dur: 0.35, fin: 0.1 });
const pip = (t, techo = -40) => s("sfx/bsb-pip.wav", t, 0, { techo, vel: 1.25, hp: 600 });
const hoja = (t, techo = -38, k = 1) => s(`sfx/k-book_flip_${k}.wav`, t, 0, { techo, dur: 0.45, fin: 0.1 });
const amb = (f, a, b, techo, o = {}) => s(f, a, 0, { loop: true, dur: r2(b - a), fi: o.fi ?? 0.15, fin: o.fin ?? 0.3, techo, ...o });
// ---- parte 1 ----
// el zumbido del equipo láser (bajito, pasabajos) y la cama spa (el pizzicato de siempre, bajo); en la pausa muda la
// música baja (no se corta) y queda el zumbido
amb("sfx/zumbido-largo.wav", 0, P1 + 0.05, -46, { fi: 0.05, lp: 900 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.02), fin: 0.1, techo: -37, duck: [[T.p4 - 0.1, T.p5 + 0.1, 0.75]] });
// P1 · los dos pips del cabezal, "Lore, ¿cuántas me quedan?", el cuaderno que se abre y las hojas, "Dejame ver."
pip(T.pips[0], -40); pip(T.pips[1], -41);
voz("c1", T.c1, -1);
s("sfx/k-book_flip_2.wav", T.hojea[0], 0, { techo: -38, dur: 0.4, fin: 0.1 }); hoja(T.hojea[0] + 0.25, -39, 1); s("sfx/k-page-turn.wav", T.hojea[1] - 0.15, 0, { techo: -40, dur: 0.3, fin: 0.08 });
voz("l1", T.l1, -1);
// P2 · el cuaderno: whoosh, la birome que cuenta (tic tic), el rótulo, "Según el cuaderno, una."
whoosh(T.p2 - 0.04, -46);
for (let i = 0; i < 4; i++) tic(T.cuenta[0] + 0.05 + i * 0.12, -45, i);
pop(T.rotC, -40);
voz("l2", T.l2, -1);
// P3 · el cierre de la cartera, la tarjetita, "¿Una? Acá tengo siete sellos.", el inserto y su rótulo
s("sfx/bsb-cierre.wav", T.cartera, 0, { techo: -38, dur: 0.6, fin: 0.15 });
voz("c2", T.c2, -1);
s("sfx/papel.wav", T.extiende[0], 0, { techo: -41, dur: 0.35, fin: 0.1 }); tela(T.saca[0] + 0.3, -42, 2);
whoosh(T.p3b - 0.04, -49); pop(T.rotT + 0.05, -40);
// P4 · la pausa muda: el zumbido del equipo, un pop chico por rótulo, nada encima
s("sfx/zumbido.wav", T.p4, 0, { dur: r2(T.p5 - T.p4 + 0.2), fi: 0.15, fin: 0.2, techo: -41, lp: 900 });
tela(T.senala[0], -42, 1); pop(T.rotP, -40); pop(T.tres3, -41);
// P5 · "Hagamos el promedio.", "¿Y cuánto da?", el cuaderno que se cierra, "Tres.", los rótulos
voz("l3", T.l3, -1);
voz("c3", T.c3, -1);
s("sfx/k-book_close.wav", T.cierra[0] + 0.15, 0, { techo: -38, dur: 0.4, fin: 0.1 });
voz("l4", T.l4, -1);
pop(T.rotProm + 0.04, -41); pop(T.rotPlata + 0.04, -40);
// P6 · "Vale, ¿y la de Jimena?", Vale se levanta (tela, banquito), las ruedas del equipo, los post-its que aletean, stinger
voz("l5", T.l5, -1);
tela(T.levanta[0], -41, 2); s("sfx/k-plastico.wav", T.levanta[1] - 0.1, 0, { techo: -44 });
s("sfx/bsb-rueditas.wav", T.gira[0] + 0.1, 0, { desde: 7.6, dur: r2(T.gira[1] - T.gira[0]), fi: 0.08, fin: 0.15, techo: -42 });
s("sfx/papel.wav", T.gira[1] + 0.02, 0, { techo: -47, dur: 0.35, fin: 0.12, vel: 1.2 });
pop(T.rotPost + 0.1, -46);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.02, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.02 + LEN.nar + 0.4)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -37 });
amb("sfx/zumbido-largo.wav", P2, T.q3, -48, { desde: 30, lp: 900 });
// Q1 · el toque de "Asistió", el círculo, el tic del contador, el ding, vibra, el mismo "Lore…", la notificación, "Ah. Tres.",
// "Tres. Sin promedio."
toque(T.asistio, -36); whoosh(T.q1f - 0.04, -45);
ding(T.circulo, -38); tic(T.cuenta2, -38, 1); tic(T.cuenta2 + 0.12, -39, 2); s("sfx/whoosh-short.mp3", T.enviado, 0, { techo: -42, vel: 1.3 });
vibra(T.vibra - 0.1, -37);
voz("c1", T.c1b, -1);
noti(T.msg, -37); pop(T.rotSola, -40);
voz("c4", T.c4, -1);
voz("l6", T.l6, -1);
// Q2 · el mismo "Vale…", la tablet que gira, el inserto, el post-it que se despega, el bollito, la tapa del tacho
voz("l5", T.l5b, -1);
whoosh(T.q2i - 0.04, -52); pop(T.q2i + 0.7, -44);
s("sfx/papel.wav", T.despega[0], 0, { techo: -39, dur: 0.35, fin: 0.1, vel: 1.3 });
s("sfx/bsb-bollito.wav", T.bollo[0], 0, { techo: -38, dur: 0.5, fin: 0.12 });
s("sfx/bsb-tapa.wav", T.tapa - 0.05, 0, { techo: -37 });
// Q3 · vibra en el living, el aviso, los toques, "Pagado ✓", la tarjetita, "Chau, tarjetita.", el cajón
vibra(T.vibra3 - 0.1, -37); whoosh(T.q3i - 0.04, -45); noti(T.q3i + 0.05, -37); pop(T.rotRenov, -41);
toque(T.renovar, -35); toque(T.confirmar, -35); ding(T.pagado, -36);
tela(T.sacaT[0], -42, 2); s("sfx/papel.wav", T.sacaT[1] - 0.1, 0, { techo: -42, dur: 0.3, fin: 0.1 });
voz("c5", T.c5, -1);
s("sfx/bsb-cajon-abre.wav", T.cajon[0], 0, { techo: -38, dur: 0.6, fin: 0.12 });
s("sfx/bsb-cajon-cierra.wav", T.cierraCajon[0], 0, { techo: -37, dur: 0.7, fin: 0.15 });
// Q4 · el whoosh de la cámara, un tic por fila, el ding del 0
s("sfx/whoosh.mp3", T.q4 - 0.06, 0, { techo: -43 });
T.filas.forEach((t, i) => tic(t, -40, i)); ding(T.cero, -35); pop(T.cero + 0.02, -40);
// C · Lorena a cámara: el pop de SESIONES y de la línea chica
s("sfx/whoosh-short.mp3", T.c - 0.05, 0, { techo: -45 });
voz("l7", T.l7, -1);
pop(T.palabra + 0.02, -39);
pop(T.cierre + 0.05, -44);
// en los tramos sin voz (la demo de la interfaz) los SFX +4 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz || o.loop || f.startsWith("bgm/")) continue;
  if (en(t0, T.q1f, T.c1b - 0.3) || en(t0, T.q2i, T.q3b) || en(t0, T.q4, T.l7 - 0.3)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 4); }
// la cama +6 dB (con su duck)
for (const x of S) { const [f, , , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 6); }
// la música: duck debajo de cada voz (~0,6) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.6])]; }
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
// el bus suma +6 dB antes de la ganancia: el techo se cumple DESPUÉS del bus (por eso -6)
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
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  // el bus: +6 dB y compresor suave; después la ganancia a -14 LUFS y RECIÉN AHÍ el limitador (techo ≈ -3,4 dBFS)
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=2.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => Number([...execSync(`ffmpeg -hide_banner -i ${f} -af ebur128 -f null - 2>&1`).toString().matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  let gan = r2(OBJ - medirI("assets/audio/mezcla-bus.wav"));
  let usada = gan;
  for (let k = 0; k < 3; k++) {
    usada = gan;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-bus.wav", "-af", `volume=${gan}dB,alimiter=limit=0.675:attack=1:release=50:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    const I = medirI("assets/audio/mezcla.wav");
    if (Math.abs(OBJ - I) <= 0.2) break;
    gan = r2(gan + (OBJ - I));
  }
  fs.writeFileSync("assets/audio/ganancia.txt", String(usada));   // medir.py le suma los +6 del bus
  fs.unlinkSync("assets/audio/mezcla-bus.wav"); fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 20 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 900px";   // el iris se abre desde la camilla (Q1)
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
      <div id="precarga">Lorena</div><div id="precarga2">Carolina</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde la camilla
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} · parte 2 ${r2(DUR - P2)} s (${Math.round(((DUR - P2) / DUR) * 100)} %)`);
console.log(JSON.stringify(LEN));
