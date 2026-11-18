// Genera todo resto-reservas desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (PARRILLAS del cuadro 0, los chips de día y hora, el cartel "Un agente
//     de IA más tarde…", la tarjeta "Comentá RESERVA" y la línea chica final); las burbujas de diálogo, los rótulos y los
//     insertos de las pantallas son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/dist-quien-debe (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador) con el set de
// reels/parrilla-no-vuelve. Parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la
// solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER="cam:px,py,pz,mx,my,mz,fov": fija la cámara (depuración).
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh):
//   p1 Pablo (teléfono) "Raúl, ¿tenés mesa para ocho a las diez? Soy Pablo." (P1 y, como nota de voz, Q1) · r1 Raúl
//   "¡Anotado, Pablo!" · w1 Walter "Raúl, ¿tenés mesa para seis?" · r2 "No, Walter. Esa es de Pablo." · f1 Fabián "Raúl,
//   ¿y los de las diez?" (P4 y Q4) · r3 "Están llegando." · f2 "¿Y?" · r4 "Siguen llegando." · r5 "Dejá los cubiertos."
//   (resignado) · nar "Un agente de IA más tarde." · w2 Walter "¡Esta vez sí entramos!" · r6 "Ese es para mí." · r7
//   "Llegaron." · r8 "Dejá los cubiertos." (contento) · r9 "Comentá RESERVA y te mando cómo funciona para tu restaurante."
const VOCES = ["p1", "r1", "w1", "r2", "f1", "r3", "f2", "r4", "w2", "r6", "r7", "r9"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL9 = JSON.parse(fs.readFileSync("assets/voice/palabras-r9.json", "utf8"));
const palabra9 = (i) => r2(PAL9[i].start ?? PAL9[i].a);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0, MIÉRCOLES 20:00: Raúl detrás de la parrilla, el celular apretado entre el hombro y la oreja, anota en
// el cuaderno (hoja del VIERNES): Pablo (teléfono) "Raúl, soy Pablo. ¿Me guardás mesa para ocho el viernes a las diez?" ·
// "¡Anotado, Pablo!"
T.p1 = 0.12; T.escribe = [r2(T.p1 + 0.6), r2(T.p1 + LEN.p1 + 0.05)]; T.r1 = r2(T.p1 + LEN.p1 + 0.08);
// (r1) sin la escalada muda (P2) ni la mesa que se pone (P2b): la mesa 7 ya está puesta con el RESERVADO cuando entra P3
const NUNCA = 999;
T.p2 = NUNCA; T.burb = []; T.p2b = NUNCA; T.reservado = -1; T.cubiertos = [-1, -0.5];
// P3 · viernes 21:40, la puerta: la campanita, Walter y su familia de 6: "Raúl, ¿tenés mesa para seis?" · P3b contraplano
// de Raúl, la pinza hacia la mesa 7: "No, Walter. Esa es de Pablo." · P3c se van saludando; "Familia de 6 que se fue: $ 9.000"
T.p3 = r2(T.r1 + LEN.r1 + 0.06); T.campana1 = r2(T.p3 + 0.02); T.w1 = r2(T.p3 + 0.14);
T.p3b = r2(T.w1 + LEN.w1 + 0.04); T.pinza = r2(T.p3b + 0.04); T.r2 = r2(T.p3b + 0.14);
T.p3c = r2(T.r2 + LEN.r2 + 0.04); T.rot9 = r2(T.p3c + 0.1); T.campana2 = r2(T.p3c + 0.55);
// P4 · la mesa 7, 22:45 (la vela entera): "Raúl, ¿y los de las diez?" · Raúl, confiado (nadie avisó nada desde el
// miércoles): "Están llegando."
T.p4 = r2(T.p3c + 0.9); T.f1 = r2(T.p4 + 0.12); T.msj = NUNCA; T.r3 = r2(T.f1 + LEN.f1 + 0.18);
// P5 · el mismo encuadre, 23:40 (la vela por la mitad, sillas arriba): "¿Y?" · pausa · P5b primer plano: "Siguen
// llegando." · P5c la mesa: los rótulos en rojo (el final de la parte 1)
T.p5 = r2(T.r3 + LEN.r3 + 0.28); T.f2 = r2(T.p5 + 0.26); T.p5b = r2(T.f2 + LEN.f2 + 0.42); T.r4 = r2(T.p5b + 0.2);
T.p5c = r2(T.r4 + LEN.r4 + 0.1); T.rotA = r2(T.p5c + 0.06); T.rotB = r2(T.p5c + 0.3);
// (r1) sin el remate del remate (era la misma mecánica de estetica-turnos: el que faltó vuelve a reservar)
T.p6 = NUNCA; T.junta = [NUNCA, NUNCA]; T.msj2 = NUNCA; T.r5 = NUNCA; T.p6b = NUNCA; T.tenedor = NUNCA;
const P1 = r2(T.p5c + 1.2);   // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.02));
// ---- parte 2 ----
// Q1 · miércoles 2:14: el salón a oscuras, el celular del local se prende; la MISMA nota de voz de Pablo (con "el
// viernes") suena sobre el plano 3D · Q1i el chat del agente: contesta con la mesa real; "Dale"; "Listo ✓"; el plano
T.q1 = P2; T.prende = r2(P2 + 0.1); T.nota = r2(P2 + 0.3); T.q1i = r2(T.nota + LEN.p1 - 0.55);
T.escribiendo = r2(T.nota + LEN.p1 - 0.3); T.resp1 = r2(T.nota + LEN.p1 + 0.02); T.dale = r2(T.resp1 + 0.5); T.listo = r2(T.dale + 0.28);
T.plano = r2(T.listo + 0.32); T.mesa7 = r2(T.plano + 0.25);
// Q2 · jueves: la tablet "Viernes · reservas" (3,7 s, el chip de hora avanza 12:00 → 18:00 → 20:00): las tildes de a una
// (11 de 12), Pablo sin confirmar; 18:00 segundo aviso; 20:00 la mesa 7 se libera y se le ofrece a Walter · Q2b el living
T.q2 = r2(T.plano + 0.85); T.tildes = Array.from({ length: 11 }, (_, i) => r2(T.q2 + 0.25 + i * 0.08));
T.aviso18 = r2(T.q2 + 1.4); T.libera = r2(T.q2 + 2.15); T.espera = r2(T.q2 + 2.65);
T.q2b = r2(T.q2 + 3.5); T.notiW = r2(T.q2b + 0.08); T.si = r2(T.q2b + 0.5); T.reservada = r2(T.si + 0.1); T.w2 = r2(T.q2b + 0.66);
// Q3 · viernes 21:00 (callback del cuadro 0): las dos manos en la parrilla; el celular contesta solo; la tarjeta "Para vos,
// Raúl · Cumpleaños de 20" · "Ese, para mí."
T.q3 = r2(T.w2 + LEN.w2 + 0.12); T.rq = [0.08, 0.28, 0.5, 0.7].map((d) => r2(T.q3 + d)); T.cero = NUNCA;
T.paraVos = r2(T.q3 + 0.9); T.r6 = r2(T.paraVos + 0.38);
// Q4 · viernes 22:30, el encuadre de P4: la mesa 7 llena con Walter y su familia · "Raúl, ¿y los de las diez?" (el mismo
// audio) · Raúl señala con la pinza: "Llegaron." · Walter levanta la copa · los rótulos en verde
T.q4 = r2(T.r6 + LEN.r6 + 0.2); T.f1b = r2(T.q4 + 0.18); T.r7 = r2(T.f1b + LEN.f1 + 0.3); T.copa = r2(T.r7 + 0.18);
T.rotQ4 = r2(T.r7 + LEN.r7 + 0.06);
// (r1) sin Q5 (callback de P6)
T.q5 = NUNCA; T.ding5 = NUNCA; T.r8 = NUNCA; T.tenedor2 = NUNCA;
// C · Raúl a cámara: "Comentá RESERVA y te mando cómo funciona para tu restaurante." · la tarjeta entra en "RESERVA"
T.c = r2(T.rotQ4 + 1.0); T.r9 = r2(T.c + 0.12); T.palabra = r2(T.r9 + palabra9(1) - 0.02);
const DUR = Math.ceil((Math.ceil((T.r9 + LEN.r9 + 0.4) * 30) / 30) * 1e4) / 1e4;   // múltiplo de un cuadro
T.cierre = r2(DUR - 1.1);

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

// P1 · el rubro: "PARRILLAS" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema), entero
// desde el cuadro 0, y el chip "Viernes, 21:00." debajo; se van con el corte a la escalada
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p3 - 0.04);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 70px; padding: 22px 4px 28px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: -8px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 312px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>PARRILLAS</em></span></div></div>
      <div class="chip">Miércoles, 20:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de día y hora (arriba a la izquierda): la noche avanza
const CHIPS = [
  ["s01-chip", T.p3, T.p3c + 1.4, "Viernes, 21:40."],
  ["s02-chip", T.p4, T.p5, "Viernes, 22:45."],
  ["s03-chip", T.p5, P1, "Viernes, 23:40."],
  ["s11-chip", T.q1, T.q2, "Miércoles, 2:14."],
  ["s12-chip", T.q2, T.aviso18 - 0.12, "Jueves, 12:00."],
  ["s16-chip", T.aviso18 - 0.12, T.libera - 0.12, "Jueves, 18:00."],
  ["s17-chip", T.libera - 0.12, T.q2b + 0.6, "Jueves, 20:00."],
  ["s13-chip", T.q3, T.q4, "Viernes, 21:00."],
  ["s14-chip", T.q4, T.c, "Viernes, 22:30."],
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

// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero; el de corralon-portland). Va
// DEBAJO del canvas. No dice "Scalerics".
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
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.36)});   // se va antes del iris`,
  });
}

// C · la tarjeta de cierre abajo de la cara de Raúl: "Comentá" / RESERVA (recuadro verde) / "y te mando cómo funciona para
// tu restaurante"; entra en la palabra "RESERVA" y queda hasta el final
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1060px; padding: 22px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 100%; }
    P .a { font: 800 88px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 30px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 14px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 18px; font: 700 50px/1.2 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>RESERVA</em></span></div><div class="c">y te mando cómo funciona<br>para tu restaurante</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 80 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.08, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.4);`,
  });
}
// la línea chica final (abajo de la tarjeta, nunca sobre la cara): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1596px; padding: 20px 26px 26px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 46px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA que confirma</div><div class="a">las reservas y libera las mesas</div><div class="b">scalerics.com</div></div>`,
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
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const vibra = (t, techo = -38) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.45, fin: 0.1 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const campana = (t, techo = -35) => { s("sfx/campanita.wav", t, 0, { techo, dur: 0.9, fin: 0.3 }); s("sfx/puerta-abre.wav", t - 0.05, 0, { techo: -42, dur: 0.6, fin: 0.2 }); };
const pinza = (t, techo = -38) => s("sfx/k-metal-click.wav", t, 0, { techo });
const tela = (t, techo = -40, k = 1) => s(`sfx/k-cloth_${k}.wav`, t, 0, { techo, dur: 0.35, fin: 0.1 });
const birome = (a, b, techo = -36) => s("sfx/birome.wav", a, 0, { techo, dur: r2(b - a), fin: 0.08 });
const cubiertos = (t, d = 0.6, techo = -36) => s("sfx/cubiertos.wav", t, 0, { techo, dur: d, fin: 0.12 });
const tenedor = (t, techo = -36) => s("sfx/tenedor.wav", t, 0, { techo, dur: 0.45, fin: 0.1 });
const amb = (f, a, b, techo, o = {}) => s(f, a, 0, { loop: true, dur: r2(b - a), fi: o.fi ?? 0.15, fin: o.fin ?? 0.3, techo, ...o });
// ---- parte 1 ----
// el viernes lleno: el murmullo del salón, la carne que chisporrotea y la leña; a las 23:40 el murmullo se apaga y
// quedan la parrilla y el fuego. La cama: el pizzicato de parrilla-no-vuelve, que se corta en la pausa del remate.
amb("sfx/salon.wav", 0, T.p5 + 0.05, -36, { fi: 0.05, fin: 0.25, lp: 5000 });
amb("sfx/chisporroteo.wav", 0, T.p5 + 0.05, -40, { fi: 0.05, fin: 0.2 });
amb("sfx/fuego.wav", 0, P1 + 0.05, -44, { fi: 0.05 });
amb("sfx/chisporroteo.wav", T.p5, P1 + 0.05, -47, { desde: 4 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(T.p5 + 0.02), fin: 0.08, techo: -36 });
// P1 · el teléfono (Pablo con filtro), la birome sobre el papel, "¡Anotado, Pablo!"
voz("p1", T.p1, -2);
birome(T.escribe[0], T.escribe[1], -37);
voz("r1", T.r1, -1);
// P3 · la campanita (entran), Walter, la pinza, Raúl, el rótulo, la campanita (se van)
campana(T.campana1, -36);
voz("w1", T.w1, -1);
whoosh(T.p3b - 0.04, -46); pinza(T.pinza + 0.08, -39);
voz("r2", T.r2, -1);
pop(T.rot9, -39);
campana(T.campana2, -37);
// P4 · el chip (tic), "¿y los de las diez?", el mensaje (notificación), "Están llegando."
tic(T.p4 + 0.02, -40);
voz("f1", T.f1, -1);
voz("r3", T.r3, -1);
// P5 · la silla que se apoya en la mesa, "¿Y?", el silencio, "Siguen llegando.", los rótulos
tic(T.p5 + 0.02, -40);
s("sfx/silla.wav", T.p5 + 0.06, 0, { techo: -37, dur: 0.5, fin: 0.12 });
voz("f2", T.f2, -1);
voz("r4", T.r4, -1);
pop(T.rotA, -45); pop(T.rotB, -44);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.02, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.02 + LEN.nar + 0.4)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.6, techo: -36 });
// Q1 · la madrugada: la calle y los grillos lejos; el celular se prende; la nota de voz (el mismo audio de Pablo); pop por
// burbuja; el ✓
amb("sfx/grillos.wav", P2, T.q2, -46, { fi: 0.2, lp: 5000, hp: 1500 });
amb("sfx/calle.wav", P2, T.q2, -47, { fi: 0.2, lp: 1500 });
noti(T.prende, -37);
whoosh(T.q1i - 0.04, -44);
voz("p1", T.nota, -2);
s("sfx/key-press.mp3", T.escribiendo, 0, { techo: -46, dur: 0.12, fin: 0.04 });
pop(T.resp1, -38); pop(T.dale, -40); pop(T.listo, -38); ding(T.listo + 0.05, -37);
whoosh(T.plano - 0.04, -44); pop(T.plano, -40); ding(T.mesa7, -38);
// Q2 · la tablet: un tic por tilde, el ding de 11 de 12, el segundo aviso, la mesa que se libera (papel), la lista de
// espera; el whoosh al living; la notificación de Walter, el toque en "Sí", el ✓
whoosh(T.q2 - 0.04, -44);
T.tildes.forEach((t, i) => tic(t, -41, i));
ding(T.tildes.at(-1) + 0.08, -37);
pop(T.aviso18, -39);
s("sfx/k-page-turn.wav", T.libera, 0, { techo: -38, vel: 1.4, dur: 0.25, fin: 0.08 }); pop(T.libera + 0.02, -40);
pop(T.espera, -39); ding(T.espera + 0.1, -38);
s("sfx/whoosh.mp3", T.q2b - 0.12, 0, { techo: -40 });
noti(T.notiW, -37); toque(T.si, -35); ding(T.reservada + 0.03, -36);
voz("w2", T.w2, -1);
// Q3 · el viernes otra vez: el salón, la parrilla; pop por respuesta del agente, los tics del contador, la tarjeta
amb("sfx/salon.wav", T.q3, T.c - 0.05, -38, { desde: 12, fi: 0.15, fin: 0.3, lp: 5000 });
amb("sfx/chisporroteo.wav", T.q3, DUR, -42, { desde: 2 });
amb("sfx/fuego.wav", T.q3, DUR, -46, { desde: 10 });
whoosh(T.q3 - 0.04, -44);
T.rq.forEach((t, i) => pop(t, i % 2 ? -38 : -40));
s("sfx/notification.mp3", T.paraVos, 0, { techo: -37, vel: 0.84, dur: 0.4, fin: 0.12 });
voz("r6", T.r6, -1);
// Q4 · la mesa llena: "¿y los de las diez?" (el mismo audio), la pinza, "Llegaron.", el brindis, los rótulos
voz("f1", T.f1b, -1);
pinza(T.r7 - 0.12, -39);
voz("r7", T.r7, -1);
s("sfx/copas.wav", T.copa + 0.3, 0, { techo: -36 });
pop(T.rotQ4, -39); pop(T.rotQ4 + 0.22, -40);
// C · whoosh al primer plano, pop en RESERVA, la línea chica
whoosh(T.c - 0.06, -44);
voz("r9", T.r9, -1);
pop(T.palabra + 0.02, -39);
pop(T.cierre + 0.05, -44);
// en los tramos sin voz (la escalada muda, la demo de la interfaz) los SFX +4 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz || o.loop || f.startsWith("bgm/")) continue;
  if (en(t0, T.q2, T.q2b) || en(t0, T.q3, T.r6 - 0.2)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 4); }
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
const IRIS_C = "540px 1250px";   // el iris se abre desde el celular del local (Q1)
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
      <div id="precarga">Raúl</div><div id="precarga2">Pablo</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular del local
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
