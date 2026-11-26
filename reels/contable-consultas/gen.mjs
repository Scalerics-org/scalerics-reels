// Genera todo contable-consultas desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las
//     voces (bocas) y CORTE (el silencio interno de las líneas en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (ESTUDIOS CONTABLES del cuadro 0, los chips de día y hora, el chip
//     rojo del balance, el cartel "Un agente de IA más tarde…", "Comentá CONSULTAS" y la línea chica final); las
//     burbujas, los audios y los rótulos son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/contable-papeles (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija; VER=portada: la cámara del fondo de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh): m1 Marcelo (audio) "Adri, ¿cuándo vence lo mío?" (se reusa en Q1) · a1
// Adriana "El veintitrés, Marcelo." · g1 Graciela (audio) "Adri, ¿cuánto pago este mes?" · w1 Walter (audio) "¿Te llegó
// lo que te mandé?" · m2 Marcelo (audio) "¿Era el veintitrés?" · j1 Jorge "Adri, ¿cuándo comemos?" (se reusa en Q4) · a2
// Adriana "El veintitrés." · j2 Jorge "Es Marcelo. Que cuándo vence lo suyo." · nar "Un agente de IA más tarde." · m3
// Marcelo "¡Uh, qué rápido! Gracias, Adri." · a3 Adriana "De nada." · l1 Lucas "¿Ya? ¿El de Héctor?" · a4 Adriana "Y el
// de Walter." · a5 Adriana "Ahora." · j3 Jorge "Es Marcelo. Que sos un amor, que le contestaste al toque." · a6 Adriana
// "Sí. Un amor." · a7 Adriana "Comentá CONSULTAS y te mando cómo funciona para tu estudio."
const VOCES = ["m1", "a1", "g1", "w1", "m2", "j1", "a2", "j2", "m3", "a3", "l1", "a4", "a5", "j3", "a6", "a7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { a7: JSON.parse(fs.readFileSync("assets/voice/palabras-a7.json", "utf8")) };
const T = {};
const ALIAS = { m1b: "m1", j1b: "j1" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
// el punto que parte una línea en dos (la burbuja muestra la segunda mitad recién cuando suena): el final del silencio
// interno más largo de la toma
function corteVoz(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fn = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  let mejor = null; ini.forEach((a, i) => { const b = fn[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05 && (!mejor || b - a > mejor[1] - mejor[0])) mejor = [a, b]; });
  return mejor ? r2(mejor[1] - 0.02) : r2(LEN[k] * 0.4);
}
const CORTE = Object.fromEntries(["j2", "j3", "m3", "a6"].map((k) => [k, corteVoz(k)]));
// ---- parte 1 ----
// P1 · cuadro 0: el estudio, lunes 9:00; Adriana teclea el balance (3 %); vibra el celular: el audio de Marcelo
T.m1 = 0.15;
// P2 · Adriana, sin dejar de teclear, graba con la otra mano: "El veintitrés, Marcelo."
T.p2 = r2(fin("m1") + 0.04); T.a1 = r2(T.p2 + 0.1); T.envia = r2(fin("a1") + 0.06);
// P3 · la ráfaga (cámara fija al escritorio; la luz cambia): lunes 11:00 Graciela · miércoles 23:40 Walter · viernes
// 19:00 Marcelo otra vez; el contador 14 → 38 → 52 → 63; la barra en 3 %; las tazas 1 → 3; "Las mismas 3 preguntas"
T.p3 = r2(T.envia + 0.08);
T.r1 = T.p3; T.g1 = r2(T.r1 + 0.16); T.r2 = r2(fin("g1") + 0.08); T.w1 = r2(T.r2 + 0.14); T.r3 = r2(fin("w1") + 0.08); T.m2 = r2(T.r3 + 0.14);
T.rotM = r2(fin("m2") + 0.02);
// P4 · el remate: domingo 13:30, el asado: "Adri, ¿cuándo comemos?" · "El veintitrés." · P4b la pausa: Jorge congelado
T.p4 = r2(T.rotM + 0.7); T.j1 = r2(T.p4 + 0.3); T.a2 = r2(fin("j1") + 0.65);   // (r1) la pausa antes del remate
T.p4b = r2(fin("a2") + 0.12);
// P5 · el remate del remate: vibra el bolsillo de Jorge; lo saca y lee (P5i: su pantalla) · "Es Marcelo. Que cuándo
// vence lo suyo." · P5c Adriana cierra los ojos (chip rojo del balance)
T.p5 = r2(T.p4b + 0.95); T.vibJ = r2(T.p5 + 0.1); T.p5i = r2(T.vibJ + 0.72); T.j2 = r2(T.p5i + 0.12);
T.p5j = r2(T.j2 + CORTE.j2 - 0.06);
T.p5c = r2(fin("j2") + 0.12);
const P1 = r2(T.p5c + 0.75);                               // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.22, LEN.nar + 0.04));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0, el mismo audio; Adriana sigue tecleando: contesta el asistente (en el celular del soporte)
T.q1 = P2; T.m1b = r2(P2 + 0.08);
// Q2 · el celular de Marcelo en la panadería: escribiendo… → la respuesta con sus datos → la boleta → las facturas ·
// "¡Uh, qué rápido!" sobre el inserto; Q2m Marcelo: "Gracias, Adri."
T.q2 = r2(fin("m1b") + 0.68); T.resp = r2(T.q2 + 0.35); T.boleta = r2(T.q2 + 0.75); T.facturas = r2(T.q2 + 1.1);   // (r1) q2 + 0,75: "Contestó el agente de IA ✓" se lee
T.m3 = r2(T.q2 + 1.0); T.q2m = r2(T.m3 + CORTE.m3 - 0.08);   // (r1) "¡Uh, qué rápido!" sobre el inserto; "Gracias, Adri." en Q2m
// Q2b · Adriana (el encuadre de P2), el toast en el monitor: "De nada."
T.q2b = r2(fin("m3") + 0.06); T.a3 = r2(T.q2b + 0.1);
// Q3 · push-in al monitor: la bandeja del asistente (Graciela, Walter) · Q3n miércoles 23:40, el estudio a oscuras: la
// tarjeta de Marcelo entra igual · Q3r Héctor → "Para vos (2)" · la barra del balance 8 → 64
T.q3 = r2(fin("a3") + 0.1); T.c1 = r2(T.q3 + 0.05); T.c2 = r2(T.q3 + 0.25);   // (r1) la primera tarjeta ya entra con el push-in
T.q3n = r2(T.q3 + 0.85); T.c3 = r2(T.q3n + 0.3);
T.q3r = r2(T.q3n + 0.66); T.c4 = r2(T.q3r + 0.1); T.cpv = r2(T.c4 + 0.38);
// Q3b · viernes 18:00: el balance en 100 % · "¿Ya? ¿El de Héctor?" · "Y el de Walter."
T.q3b = r2(T.cpv + 0.42); T.l1 = r2(T.q3b + 0.9); T.a4 = r2(fin("l1") + 0.1);   // (r1) el inserto del 100 % se lee
// Q4 · el mismo asado: "Adri, ¿cuándo comemos?" · deja el celular boca abajo y se levanta: "Ahora." · el chorizo al pan
// · Q4j vibra el celular de Jorge · Q4i su pantalla · Q4a los dos: "…que le contestaste al toque." · "Sí. Un amor."
T.q4 = r2(fin("a4") + 0.1); T.j1b = r2(T.q4 + 0.2); T.a5 = r2(fin("j1b") + 0.65);   // (r2) la misma pausa que antes de "El veintitrés."
T.q4j = r2(fin("a5") + 0.15); T.vibJ2 = r2(T.q4j + 0.05); T.q4i = r2(T.vibJ2 + 0.42); T.j3 = r2(T.q4i + 0.06);
T.q4a = r2(T.j3 + CORTE.j3 - 0.06); T.a6 = r2(fin("j3") + 0.15); T.q4c = r2(T.a6 - 0.1);   // (r1) Q4c: contraplano de Adriana en "Sí. Un amor."
// C · el cierre: Adriana a cámara en el patio
T.c = r2(fin("a6") + 0.08); T.a7 = r2(T.c + 0.08);
const iCon = PAL.a7.findIndex((w) => /CONSULTAS/i.test(w.word ?? w.w ?? w.text ?? ""));
const pal = (i) => r2(PAL.a7[i].start ?? PAL.a7[i].a);
T.palabra = r2(T.a7 + 0.36);   // (r1) palabras-a7.json está degenerado: "CONSULTAS" suena en 0,41-0,83 s de la toma (÷ 1,12)
void iCon; void pal;
const DUR = Math.ceil((Math.ceil((fin("a7") + 0.15) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.4));

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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const CORTE = ${JSON.stringify(CORTE)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";
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

// P1 · el rubro: "ESTUDIOS CONTABLES" enorme arriba (en el recuadro verde), entero desde el cuadro 0, y el chip "Lunes,
// 9:00." debajo; se van antes de la burbuja de Adriana
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 + 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 92px; padding: 22px 4px 30px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 118px/1.12 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .tx + .tx { margin-top: 18px; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; margin-top: 6px; }
    P .sel b { position: absolute; inset: -12px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 440px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>ESTUDIOS</em></span></div><div class="tx"><span class="sel"><b></b><em>CONTABLES</em></span></div></div>
      <div class="chip">Lunes, 9:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { opacity: 0, duration: 0.2, ease: "power1.in" }, ${r2(dur - 0.28)});`,
  });
}
// los chips de día y hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.r1, T.r2, "Lunes, 11:00."],
  ["s02-chip", T.r2, T.r3, "Miércoles, 23:40."],
  ["s03-chip", T.r3, T.p4, "Viernes, 19:00."],
  ["s04-chip", T.p4, T.p4b, "Domingo, 13:30."],
  ["s05-chip", T.q1 + 0.02, T.q2, "Lunes, 9:00."],
  ["s06-chip", T.q3n, T.q3r, "Miércoles, 23:40."],
  ["s07-chip", T.q3b, T.q4, "Viernes, 18:00."],
  ["s08-chip", T.q4, T.q4j, "Domingo, 13:30."],
];
for (const [id, ini0, fin0, txt] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin0 - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}
// P5c · el chip rojo apagado del balance (abajo, no tapa la cara de Adriana)
{
  const id = "s09-balance", ini = r2(T.p5c + 0.25), dur = r2(P1 - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: auto; bottom: 300px; left: 50%; transform: translateX(-50%); text-align: center; padding: 20px 40px 26px; border-color: ${RED}; }
    P .chip .a { font: 800 56px/1.15 "Lexend", sans-serif; color: ${CR}; }
    P .chip .b { font: 900 110px/1.05 "Lexend", sans-serif; color: ${RED}; margin-top: 6px; }`,
    html: `      <div class="chip"><div class="a">Balance de Súper Héctor:</div><div class="b">3 %</div></div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.6, xPercent: 0 }, { scale: 1, duration: 0.22, ease: "back.out(2)", immediateRender: true }, 0);`,
  });
}
// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero; el de inmobiliaria-disponible).
// Va DEBAJO del canvas. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraC = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraC).join('<span class="esp"></span>')}</span>`;
  const MAS = 1.0;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
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
        const t0 = i < nAB ? i * 0.03 : ${MAS} + (i - nAB) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});   // se va antes del iris`,
  });
}
// C · "Comentá CONSULTAS" + "y te mando cómo funciona para tu estudio", debajo de la cara de Adriana
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1030px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 118px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 50px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>CONSULTAS</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu estudio</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.1);`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1470px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA contesta a cada</div><div class="a">cliente con sus datos</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -38.5;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, pan = 0) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, pan }); VOZ.push([r2(t - 1.0), r2(t + LEN[f] + 0.95)]); };
const vibra = (t, techo = -36) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.5, fin: 0.1 });
const noti = (t, techo = -36) => s("sfx/notification.mp3", t, 0, { techo, dur: 0.35, fin: 0.12 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -42) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 });
const teclas = (a, b, techo = -44) => { for (let k = 0, x = a; x < b; k++, x += 0.13 + (k % 3) * 0.04) tecla(x, techo - (k % 2) * 2); };
const tuc = (t, techo = -38) => s("sfx/k-pep.wav", t, 0, { techo, dur: 0.25, fin: 0.08 });
const tick = (t, techo = -42) => s("sfx/k-tick-1.wav", t, 0, { techo });
const wh = (t, techo = -46) => s("sfx/whoosh-short.mp3", t, 0, { techo });
// ---- parte 1 ----
// ambiente del estudio (zumbido bajo, la calle lejana) y la música (cama pizzicato, se corta seca en "veintitrés")
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p4 + 0.05), fi: 0.05, fin: 0.1, techo: -52, lp: 700 });
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(T.p4 + 0.05), fi: 0.05, fin: 0.1, techo: -52, lp: 900 });
const CORTE_M = r2(T.a2 + LEN.a2 - 0.05), DESDE_M = r2((((9.92 - CORTE_M) % 12) + 12) % 12);   // (r2) el corte seco cae sobre una nota sostenida
s("bgm/pizzicato.wav", 0, 0, { loop: true, desde: DESDE_M, dur: CORTE_M, fi: 0.3, fin: 0.03, techo: -36, hasta: r2(T.a2 - 0.05) });   // (r1) sin duck en "veintitrés": el corte seco es un escalón
// P1 · vibra el celular, el audio de Marcelo; Adriana teclea
vibra(0.02, -45); s("sfx/madera-tabla.wav", 0.25, 0, { techo: -48, lp: 1500 });   // (r1) el golpe suave del rubro
tuc(T.m1 - 0.08, -40); voz("m1", T.m1, -1);
teclas(0.1, T.p2 - 0.1, -46);
// P2 · teclea con la derecha y graba con la izquierda; audio enviado
toque(T.a1 - 0.12, -40); voz("a1", T.a1, -1);
wh(T.envia, -46); tuc(T.envia + 0.05, -42);
// P3 · la ráfaga: por cada audio, corte de luz (whoosh), vibra + tuc, el contador que sube (ticks)
for (const [r, k] of [[T.r1, "g1"], [T.r2, "w1"], [T.r3, "m2"]]) {
  wh(r - 0.04, -44); vibra(r + 0.0, -38); tuc(T[k] - 0.08, -42); voz(k, T[k], -1);
  for (let i = 0; i < 4; i++) tick(r + 0.12 + i * 0.09, -46 + (i % 2));
}
s("sfx/tic-real.mp3", T.r2 + 0.2, 0, { techo: -46, dur: 0.15, fin: 0.04 }); s("sfx/tic-real.mp3", T.r2 + 0.7, 0, { techo: -46, dur: 0.15, fin: 0.04 });   // el reloj de la noche
pop(T.rotM, -42);
s("sfx/k-plato-001.wav", T.r2 + 0.05, 0, { techo: -44 }); s("sfx/k-plato-001.wav", T.r3 + 0.05, 0, { techo: -44 });   // (r1) la loza de cada taza nueva
// P4 · el patio: las brasas que chisporrotean, un pájaro; la música se corta seca en "veintitrés"
s("sfx/chisporroteo.wav", T.p4, 0, { loop: true, dur: r2(P1 - T.p4 + 0.05), fi: 0.1, fin: 0.2, techo: -49.5, lp: 5000 });   // (r1) más bajo: el corte de la música es un escalón de ≥ 10 dB
s("sfx/pajaro.wav", T.p4 + 0.2, 0, { techo: -52, dur: 1.5, fin: 0.4 });
wh(T.p4 - 0.05, -42);
voz("j1", T.j1, -1);
s("sfx/k-metal-click.wav", T.j1 + 0.25, 0, { techo: -44 });   // la pinza agarra el chorizo
voz("a2", T.a2, -1);
// P4b · la pausa: solo las brasas (y el corte seco de la música)
// P5 · vibra el bolsillo de Jorge; lo saca (tela); "Es Marcelo. Que cuándo vence lo suyo."
vibra(T.vibJ, -41); s("sfx/k-cloth_1.wav", T.vibJ + 0.3, 0, { techo: -45, dur: 0.3, fin: 0.1 });
wh(T.p5i - 0.05, -48);
voz("j2", T.j2, -1);
wh(T.p5c - 0.04, -50);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 1.0, 1.3]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -38.5, duck: [[r2(T.q3 + 0.2), r2(T.q3b - 0.1), 0.55]] });   // (r1) duck chico en la bandeja: se oyen las tarjetas
// Q1 · el estudio de mañana: vibra, el mismo audio; contesta el asistente (ding); Adriana sigue tecleando
s("sfx/zumbido-largo.wav", P2, 0, { loop: true, dur: r2(T.q2 - P2 + 0.05), fi: 0.1, fin: 0.1, techo: -54, lp: 700 });
vibra(P2 + 0.02, -38); tuc(T.m1b - 0.08, -40); voz("m1", T.m1b, -1);
teclas(P2 + 0.1, T.q2 - 0.1, -46);
noti(fin("m1b") + 0.18, -40);
// Q2 · la panadería: escribiendo… → la respuesta (notificación), la boleta (pop), las facturas (ding)
s("sfx/calle.wav", T.q2, 0, { loop: true, desde: 5, dur: r2(T.q2b - T.q2 + 0.05), fi: 0.1, fin: 0.1, techo: -50, lp: 1400 });
wh(T.q2 - 0.05, -48); noti(T.resp, -43); pop(T.boleta, -43); ding(T.facturas, -43);
voz("m3", T.m3, 0);
// Q2b · Adriana teclea (el toast en el monitor): "De nada."
wh(T.q2b - 0.04, -48); pop(T.q2b + 0.02, -44); teclas(T.q2b + 0.05, T.q3 - 0.05, -46);
voz("a3", T.a3, -1);
// Q3 · la bandeja: pop + tick por tarjeta; Q3n el estudio a oscuras (el reloj); ding en "Para vos"
wh(T.q3, -46);
for (const c of [T.c1, T.c2, T.c3, T.c4]) { pop(c, -44); tick(c + 0.08, -46); }
s("sfx/tic-real.mp3", T.q3n + 0.1, 0, { techo: -46, dur: 0.15, fin: 0.04 }); s("sfx/tic-real.mp3", T.q3n + 0.6, 0, { techo: -46, dur: 0.15, fin: 0.04 });
ding(T.cpv, -45);
// Q3b · viernes 18:00: el balance terminado (ding), la silla de Lucas, la segunda barra (pop)
s("sfx/zumbido-largo.wav", T.q3b, 0, { loop: true, dur: r2(T.q4 - T.q3b + 0.05), fi: 0.1, fin: 0.1, techo: -54, lp: 700 });
wh(T.q3b - 0.04, -46); for (let i = 0; i < 3; i++) tick(T.q3b + 0.02 + i * 0.06, -48); ding(T.q3b + 0.2, -42);   // (r1) la barra 64 → 100 % y el "Terminado ✓"
s("sfx/k-cloth_1.wav", T.l1 - 0.3, 0, { techo: -46, dur: 0.3, fin: 0.1 });   // la silla de Lucas que gira
voz("l1", T.l1, -1); voz("a4", T.a4, -1); pop(T.a4 + 0.05, -42);
// Q4 · el mismo asado: las brasas; "¿cuándo comemos?" · el celular boca abajo (tabla) · "Ahora." · el plato · la pinza
// · vibra el celular de Jorge · "…al toque." · "Sí. Un amor."
s("sfx/chisporroteo.wav", T.q4, 0, { loop: true, desde: 3, dur: r2(DUR - T.q4), fi: 0.1, fin: 0.5, techo: -46, lp: 5000 });
s("sfx/pajaro.wav", T.q4 + 0.3, 0, { techo: -50, dur: 1.5, fin: 0.4 });
wh(T.q4 - 0.05, -42);
voz("j1", T.j1b, -1);
s("sfx/madera-tabla.wav", T.a5 - 0.3, 0, { techo: -42 });
voz("a5", T.a5, -1);
s("sfx/k-plato-000.wav", T.a5 + 0.45, 0, { techo: -44 }); s("sfx/k-metal-click.wav", T.a5 + 0.7, 0, { techo: -44 });
vibra(T.vibJ2, -45); s("sfx/k-cloth_1.wav", T.vibJ2 + 0.3, 0, { techo: -46, dur: 0.3, fin: 0.1 });
wh(T.q4i - 0.05, -48); wh(T.q4a - 0.04, -50);
voz("j3", T.j3, -1);
voz("a6", T.a6, -1);
// C · el cierre: Adriana a cámara; pop en CONSULTAS; la línea chica
wh(T.c - 0.08, -46);
voz("a7", T.a7, -1);
pop(T.palabra + 0.02, -40); pop(T.cierre + 0.05, -44);
// la cama +7 dB (con su duck); en los tramos sin voz los SFX +5 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; }
  }
// la música: duck debajo de cada voz para que la voz quede ≥ 6 LU arriba
// (r2) duck 0 bajo la voz: la cama queda pareja (el compresor del bus, que la aplastaba, ya no está)
// (r1) las ventanas de voz se UNEN antes del duck (superpuestas se multiplicaban y la cama quedaba muda); duck suave 0,35
const VOZU = VOZ.slice().sort((a, b) => a[0] - b[0]).reduce((acc, [a, b]) => { const u = acc[acc.length - 1]; if (u && a <= u[1]) u[1] = Math.max(u[1], b); else acc.push([a, b]); return acc; }, []);
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { const lim = x[3].hasta ?? 1e9; x[3].duck = [...(x[3].duck || []), ...VOZU.filter(([a, b]) => b > x[1] && a < x[1] + x[3].dur).map(([a, b]) => [Math.max(a, x[1]), Math.min(b, lim), 0]).filter(([a, b]) => b - a > 0.1)]; }
function en(t, a, b) { return t >= a && t < b; }

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
// (r2) sin compresor en el bus la ganancia final pasó de +7 a ~-1,7 dB: los techos se corren OFF dB para que los niveles
// finales queden donde estaban (techo -38,5 + 8,7 = -29,8 antes de la ganancia final)
const OFF = Number(process.env.OFF ?? 8.7);
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, Math.min(o.techo ?? TECHO, TECHO) + OFF - 6 - L.M, (o.pico ?? PICO) + OFF - L.pk)); };
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
    if (o.pan) c += `,pan=stereo|c0=${r2(Math.min(1, 1 - o.pan))}*c0|c1=${r2(Math.min(1, 1 + o.pan))}*c1`;
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
  // el bus: +6 dB y compresor suave; después la ganancia a -14 LUFS y RECIÉN AHÍ el limitador (techo -4 dBFS)
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB"   /* (r2) sin compresor en el bus: aplastaba la cama cuando hablaba alguien (cada voz ya va comprimida) */, "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => Number([...execSync(`ffmpeg -hide_banner -i ${f} -af ebur128 -f null - 2>&1`).toString().matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  let gan = r2(OBJ - medirI("assets/audio/mezcla-bus.wav"));
  let usada = gan;
  for (let k = 0; k < 2; k++) {
    usada = gan;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-bus.wav", "-af", `volume=${gan}dB,alimiter=limit=0.63:attack=1:release=50:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    gan = r2(gan + (OBJ - medirI("assets/audio/mezcla.wav")));
  }
  fs.writeFileSync("assets/audio/ganancia.txt", String(usada));   // medir.py le suma los +6 del bus
  fs.unlinkSync("assets/audio/mezcla-bus.wav"); fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 20 + i, 1)).join("\n");
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "620px 1180px";   // el iris se abre desde el celular del soporte (Q1)
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
      <div id="precarga">Consultas</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
      <audio id="mezcla" src="assets/audio/mezcla.wav" data-start="0" data-duration="${DUR}" data-track-index="40" data-volume="1"></audio>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular del soporte
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(T));
