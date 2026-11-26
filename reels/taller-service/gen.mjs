// Genera todo taller-service desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las voces
//     (bocas) y CORTE (el silencio interno de cada remate en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (TALLERES MECÁNICOS del cuadro 0, los chips de fecha, el cartel "Una
//     ficha por auto más tarde…", "Comentá SERVICE" y la línea chica final); las burbujas y los rótulos son 3D pegados a
//     la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/importadora-dolar (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija · VER=portada: la cámara del fondo de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh):
//   o1 Óscar "Listo, Walter. Volvé a los diez mil kilómetros." (se reusa en Q1) · w1 Walter "¡Obvio! Vos sos mi mecánico."
//   (se reusa en Q1) · m1 Maxi "Jefe, ¿hoy no viene nadie?" (se reusa en Q3) · o2 Óscar "Ya vuelven. Tienen el papelito." ·
//   w2 Walter "Óscar, no entiendo. Si le hice el service hace poquito." · o3 Óscar "Volviste a los diez mil, Walter. Cuatro
//   veces." · w3 Walter "Ponele otro papelito, así no me olvido." · nar "Una ficha por auto más tarde." · w4 Walter "¡Uh!
//   Justo me estaba olvidando." · o4 Óscar "Ya vinieron. Tenían el aviso." · w5 Walter "¡Óscar! ¡Volví a los diez mil!" ·
//   o5 Óscar "Una vez. Así me gusta." · w6 Walter "¿No me ponés el papelito?" · o6 Óscar "El papelito ahora te escribe." ·
//   o7 Óscar "Comentá SERVICE y te mando cómo funciona para tu taller."
const VOCES = ["o1", "w1", "m1", "o2", "w2", "o3", "w3", "o4", "w5", "o5", "w6", "o6", "o7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { o7: JSON.parse(fs.readFileSync("assets/voice/palabras-o7.json", "utf8")) };
const T = {};
const ALIAS = { o1b: "o1", w1b: "w1", m1b: "m1" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
// los silencios internos de una toma ([inicio, fin]): el más largo parte una línea en dos (la burbuja muestra la segunda
// mitad recién cuando suena)
function silencios(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fn = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const L = []; ini.forEach((a, i) => { const b = fn[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05) L.push([a, b]); });
  return L;
}
const corteVoz = (k, cual = "largo") => {
  const L = silencios(k);
  if (!L.length) return r2(LEN[k] * 0.5);
  const s = cual === "ultimo" ? L[L.length - 1] : cual === "primero" ? L[0] : L.reduce((m, x) => (x[1] - x[0] > m[1] - m[0] ? x : m));
  return r2(s[1] - 0.02);
};
const CORTE = { o1: corteVoz("o1", "primero"), o2: corteVoz("o2"), w2: corteVoz("w2"), o3: corteVoz("o3"), o4: corteVoz("o4"), o5: corteVoz("o5"), w5: corteVoz("w5", "primero") };
// ---- parte 1 ----
// P1 · cuadro 0, Marzo 18:00: el hatchback blanco de Walter recién bajado del elevador; Óscar termina de pegar el papelito
// en el parabrisas: "Listo, Walter. Volvé a los diez mil kilómetros." / Walter, con la llave: "¡Obvio! Vos sos mi mecánico."
T.o1 = 0.08;
T.w1 = r2(fin("o1") + 0.04);
// Walter se sube (la puerta se cierra), el auto sale marcha atrás por el portón; Óscar lo saluda con el trapo
T.sube = r2(fin("w1") + 0.0);
T.p2 = r2(T.sube + 0.3);
// P2 · el montaje sin voz desde el asiento: el papelito se destiñe y el cuentakilómetros sube (un tic por mes)
T.meses = [0, 0.56, 1.12, 1.68].map((d) => r2(T.p2 + d));
T.p3 = r2(T.p2 + 2.3);
// P3 · Martes 9:00, el elevador vacío: Maxi en las cubiertas con el mate "Jefe, ¿hoy no viene nadie?" / Óscar en el banco
// "Ya vuelven. Tienen el papelito." · rótulos "Martes: 0 turnos" y "38 services que no volvieron · $ 247.000"
T.rot0 = r2(T.p3 + 0.08); T.m1 = r2(T.p3 + 0.12); T.o2 = r2(fin("m1") + 0.06);
T.rot38 = r2(Math.max(T.rot0 + 0.95, fin("o2") - 1.2));
T.p4 = r2(Math.max(fin("o2") + 0.08, T.rot38 + 1.0));
// P4 · Noviembre: la grúa entra de culata con el auto humeando; la plancha se inclina; Walter entra caminando, se rasca la
// cabeza: "Óscar, no entiendo. Si le hice el service hace poquito."
T.gPara = r2(T.p4 + 1.15); T.tilt = r2(T.p4 + 1.25); T.tiltFin = r2(T.p4 + 1.9);
T.w2 = r2(T.p4 + 0.55);
// P4b · la pausa: Óscar se asoma al parabrisas, el papelito en blanco; lo despega · P4c inserto del tablero: 125.000 km
T.p4b = r2(fin("w2") + 0.08); T.despega = r2(T.p4b + 0.3);
T.p4c = r2(T.p4b + 0.62); T.p5 = r2(T.p4c + 1.05);
// P5 · el remate: primer plano de Óscar, seco: "Volviste a los diez mil, Walter. Cuatro veces."
T.o3 = r2(T.p5 + 0.05);
// P6 · el remate del remate: Walter señala el parabrisas "Ponele otro papelito, así no me olvido." · Óscar mira el papelito
// en blanco en su dedo · Maxi le acerca el rollo de papelitos sin decir nada
T.p6 = r2(fin("o3") + 0.05); T.w3 = r2(T.p6 + 0.06); T.rollo = r2(fin("w3") - 0.3);
const P1 = r2(fin("w3") + 0.32);
const P2 = r2(P1 + Math.max(2.08, LEN.nar + 0.1));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0, sin papelito: Óscar con la tablet; el mismo "Listo, Walter…" · Q1i inserto de la ficha: "¡Obvio!…"
T.q1 = P2; T.o1b = r2(P2 + 0.12);
T.q1i = r2(fin("o1b") + 0.02); T.w1b = r2(T.q1i + 0.06); T.guarda = r2(T.q1i + 0.75);
// Q2 · Agosto: en el auto, el WhatsApp a Walter con el turno: "¡Uh! Justo me estaba olvidando." · toca "Reservar"
T.q2 = r2(fin("w1b") + 0.08); T.msj = r2(T.q2 + 0.2);
T.toca = r2(T.q2 + 1.1); T.reservado = r2(T.toca + 0.14); T.rotQ2 = r2(T.q2 + 0.45);
// Q3 · la tablet del banco: el panel "Les toca este mes" (el contador sube a 33 de 41) · Q3g el mismo plano general de P3: el
// mismo "Jefe, ¿hoy no viene nadie?" y la cámara gira: el elevador ocupado, tres autos en la vereda: "Ya vinieron. Tenían el aviso."
T.q3 = r2(T.reservado + 0.7); T.filas = [0.1, 0.22, 0.34, 0.46].map((d) => r2(T.q3 + d)); T.cuenta = r2(T.q3 + 0.5); T.cuentaFin = r2(T.q3 + 1.05); T.rotQ3 = r2(T.q3 + 0.25);
T.q3m = r2(T.q3 + 1.5); T.q3g = T.q3m; T.m1b = r2(T.q3m + 0.08); T.gira = r2(fin("m1b") + 0.04); T.rot44 = r2(T.gira + 0.35); T.q3h = r2(T.gira + 0.95); T.o4 = r2(T.q3h + 0.06);
// Q4 · Jueves 9:00: Walter entra manejando su auto, entero; baja con la llave en alto: "¡Óscar! ¡Volví a los diez mil!" · Q4i
// inserto del tablero 95.300 km en verde · Q4b Óscar recibe la llave: "Una vez. Así me gusta."
T.q4 = r2(fin("o4") + 0.2); T.frena = r2(T.q4 + 0.75); T.abre = r2(T.q4 + 0.8); T.baja = r2(T.q4 + 0.85); T.w5 = r2(T.q4 + 1.05);
T.q4b = r2(fin("w5") + 0.05); T.llave = r2(T.q4b + 0.05); T.o5 = r2(T.q4b + 0.2);
// Q5 · Walter señala el parabrisas: "¿No me ponés el papelito?" · Óscar le señala el celular, que vibra · Q5i inserto: "Service
// hecho ✓" · "El papelito ahora te escribe." · Q5b: Maxi tira el rollo al cajón y lo cierra
T.q5 = r2(fin("o5") + 0.15); T.w6 = r2(T.q5 + 0.08); T.senala = r2(fin("w6") + 0.02); T.vibra = r2(T.senala + 0.12);
T.q5i = r2(T.vibra + 0.12); T.o6 = r2(T.q5i + 0.12);
// C · Óscar a cámara, apoyado en la columna del elevador con el auto de Walter arriba: "Comentá SERVICE…"
T.c = r2(fin("o6") + 0.15); T.o7 = r2(T.c + 0.06);
const iCom = PAL.o7.findIndex((w) => /S[EÉ]RVI/i.test(w.word ?? w.w ?? w.text ?? ""));
T.palabra = r2(T.o7 + Math.max(0.3, (PAL.o7[iCom >= 0 ? iCom : 1].start ?? PAL.o7[iCom >= 0 ? iCom : 1].a) - 0.05));
const DUR = Math.ceil((Math.ceil((T.o7 + LEN.o7 + 0.3) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.9));

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
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }
    P .chip.rojo { color: ${RED}; border-color: ${RED}; }
    P .chip.verde { color: ${G}; border-color: ${G}; }`;

// P1 · el rubro: "TALLERES / MECÁNICOS" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema),
// entero desde el cuadro 0, y el chip "Marzo, 18:00." debajo; se van cuando Walter se sube al auto
{
  const id = "s00-rubro", ini = 0, dur = r2(T.sube);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 78px; padding: 18px 4px 26px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 118px/1.1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .tx + .tx { margin-top: 14px; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: -6px 0 -4px; background: ${G}; border: 7px solid ${CR}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 420px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>TALLERES</em></span></div><div class="tx"><span class="sel"><b></b><em>MECÁNICOS</em></span></div></div>
      <div class="chip">Marzo, 18:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de fecha (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.meses[0], T.meses[1], "Mayo.", ""],
  ["s02-chip", T.meses[1], T.meses[2], "Julio.", ""],
  ["s03-chip", T.meses[2], T.meses[3], "Setiembre.", ""],
  ["s04-chip", T.meses[3], T.p3, "Noviembre.", "rojo"],
  ["s05-chip", T.p3, r2(T.p3 + 1.4), "Martes, 9:00.", ""],
  ["s07-chip", r2(T.q1 + 0.02), T.q1i, "Marzo, 18:00.", ""],
  ["s08-chip", T.q2, r2(T.reservado), "Julio.", ""],
  ["s09-chip", T.q4, r2(T.w5), "Jueves, 9:00.", "verde"],
];
for (const [id, ini0, fin0, txt, cls] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin0 - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip ${cls}">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}

// el cartel "Una ficha por auto más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas. No
// dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = Number(process.env.MAS ?? 1.05);   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 600px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 136px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea + .linea { margin-top: 14px; }
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
          <circle class="bu" cx="240" cy="1560" r="34" fill="none" stroke="${CR}" stroke-width="10"/>
          <circle class="bu" cx="1270" cy="1600" r="26" fill="none" stroke="${CR}" stroke-width="9"/>
          <circle class="bu" cx="330" cy="1680" r="18" fill="none" stroke="${NAVY}" stroke-width="8"/>
          <circle class="bu" cx="1290" cy="1440" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
          <circle class="bu" cx="500" cy="1990" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
          <circle class="bu" cx="560" cy="460" r="30" fill="none" stroke="${CR}" stroke-width="9"/>
        </g>
      </svg>
      <div class="texto" data-layout-allow-overlap data-layout-allow-overflow>
        ${lin("a", ["Una", "ficha"])}
        ${lin("b", ["por", "auto"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const nA = qa(".linea.a .l").length, nB = qa(".linea.b .l").length;
      qa(".l").forEach((l, i) => {
        const t0 = i < nA ? i * 0.03 : i < nA + nB ? 0.42 + (i - nA) * 0.03 : ${MAS} + (i - nA - nB) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.42)});   // se va con el iris (sin cuadros verdes vacíos)`,
  });
}

// C · "Comentá SERVICE" + "y te mando cómo funciona para tu taller", debajo de la cara de Óscar
{
  const id = "s10-palabra", ini = T.palabra, dur = Math.ceil((DUR - T.palabra) * 100) / 100;   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 100px; right: 100px; top: 1010px; padding: 12px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 80px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 128px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 4px; }
    P .sel b { position: absolute; inset: 6px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 8px; font: 700 48px/1.2 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>SERVICE</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu taller</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.32);`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = Math.ceil((DUR - T.cierre) * 100) / 100;
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 100px; right: 100px; top: 1475px; padding: 10px 18px 14px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; white-space: nowrap; }
    P .b { margin-top: 6px; font: 800 56px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">La ficha de cada auto</div><div class="a">y el aviso del service</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto ANTES de la ganancia final (~+7 dB): en el final, ningún efecto ni la cama pasan -31 LUFS.
const TECHO = -38;
const esCama = (f) => f.startsWith("bgm/") || /calle/.test(f);
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -39) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -41) => s("sfx/k-tick-1.wav", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const pasos = (a, b, techo = -44, cada = 0.3) => { for (let t = a, i = 0; t < b; t += cada, i++) s(`sfx/paso-${i % 5}.wav`, t, 0, { techo }); };
// el ambiente del taller: la calle por el portón
const calle = (a, b, techo = -44) => s("sfx/calle-tramo.wav", a, 0, { loop: true, dur: r2(b - a), fi: 0.1, fin: 0.12, techo, lp: 2400 });
// ---- parte 1 ----
calle(0, T.p2 + 0.02);
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p2 + 0.02), fin: 0.08, techo: -38 });
s("sfx/bsb-cinta.wav", 0.02, 0, { techo: -40 });   // el papelito que se termina de pegar
voz("o1", T.o1, -1);
s("sfx/llaves.wav", T.w1 - 0.1, 0, { techo: -44, dur: 0.6, fin: 0.15 });
voz("w1", T.w1, -1);
s("sfx/k-cloth_2.wav", T.sube + 0.12, 0, { techo: -44 });   // el trapo
pasos(T.sube + 0.15, T.p2, -46, 0.28);
s("sfx/puerta-auto.wav", T.p2 - 0.22, 0, { techo: -42 });
s("sfx/motor.mp3", T.p2 - 0.05, 0, { techo: -40, dur: 1.0, fin: 0.3 });
// P2 · el montaje: un tic grueso por mes, el auto andando de fondo, la música acelerada
whoosh(T.p2 - 0.06, -44);
s("sfx/auto-pasa.wav", T.p2, 0, { desde: 1.6, dur: r2(T.p3 - T.p2 + 0.05), fi: 0.15, fin: 0.2, techo: -47, lp: 1200, sinHueco: true });
s("bgm/pizzicato-lleno.wav", T.p2 - 0.02, 0, { desde: 4.0, vel: 1.15, dur: r2(T.p3 - T.p2 + 0.04), fi: 0.05, fin: 0.08, techo: -47, sinHueco: true });
T.meses.forEach((t, i) => { s("sfx/k-tick-1.wav", t + 0.05, 0, { techo: -40 + i * 0.5 }); s("sfx/k-metal-click.wav", t + 0.08, 0, { techo: -45 }); });
// P3 · el martes vacío: calle, el sorbo de mate, el rótulo de los 38
calle(T.p3, T.p4 + 0.02, -45);
s("bgm/pizzicato.wav", T.p3, 0, { desde: 0.5, dur: r2(T.p4 - T.p3 + 0.02), fi: 0.1, fin: 0.1, techo: -42 });
s("sfx/sorbo.wav", T.p3 + 0.05, 0, { techo: -42 });
voz("m1", T.m1, -1);
voz("o2", T.o2, -1);
pop(T.rot0, -42); s("sfx/glitch-1.mp3", T.rot38, 0, { desde: 0.2, techo: -38, dur: 0.3, fin: 0.06 });
// P4 · la grúa: bip-bip de marcha atrás, el motor diésel, el siseo del humo; la baliza
s("sfx/bsb-marcha-atras.wav", T.p4, 0, { dur: r2(T.gPara - T.p4 + 0.15), fin: 0.05, techo: -38, sinHueco: true });
s("sfx/bsb-camion.wav", T.p4, 0, { dur: r2(T.p4c - T.p4), fi: 0.15, fin: 0.3, techo: -41, lp: 3000, sinHueco: true });
s("sfx/bsb-siseo.wav", T.p4 + 0.3, 0, { techo: -42, sinHueco: true });
s("sfx/bsb-neumatica.wav", T.tilt, 0, { desde: 0.25, dur: 0.6, fin: 0.15, techo: -44, vel: 0.7 });
calle(T.p4, P1 + 0.02, -46);
pasos(T.p4 + 0.75, T.w2 + 0.3, -44, 0.3);
voz("w2", T.w2, -1);
// P4b/P4c · la pausa: la música se fue; el papel que se despega; el tic del tablero
s("sfx/bsb-cinta.wav", T.despega, 0, { techo: -40, vel: 0.9 });
s("sfx/k-tick-1.wav", T.p4c + 0.04, 0, { techo: -40 }); s("sfx/glitch-1.mp3", T.p4c + 0.1, 0, { desde: 0.2, techo: -40, dur: 0.25, fin: 0.06 });
voz("o3", T.o3, -1);
s("sfx/cero.mp3", T.o3 + CORTE.o3 + 0.02, 0, { vel: 0.6, techo: -40 });   // acento grave en "Cuatro veces."
voz("w3", T.w3, -1);
s("sfx/k-cloth_1.wav", T.rollo, 0, { techo: -42 }); pop(T.rollo + 0.25, -42);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.06, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.06 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.5, 1.1, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.c - P2 + 0.05), fi: 0.4, fin: 0.1, techo: -38 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -38 });
calle(P2, DUR, -46);
voz("o1", T.o1b, -1);
toque(T.o1b + 0.4, -42); toque(T.o1b + 1.0, -44);
whoosh(T.q1i - 0.05, -46);
voz("w1", T.w1b, -1);
toque(T.guarda, -40); ding(T.guarda + 0.08, -43);
// Q2 · el aviso en el celular de Walter, el toque en Reservar, el ding
s("sfx/auto-pasa.wav", T.q2, 0, { desde: 1.6, dur: r2(T.q3 - T.q2), fi: 0.15, fin: 0.2, techo: -48, lp: 1200 });
noti(T.msj, -39);
toque(T.toca, -39); ding(T.reservado + 0.02, -40);
// Q3 · el panel: un tic por fila, el contador, el ding; el plano general
whoosh(T.q3 - 0.05, -46);
T.filas.forEach((t) => tic(t, -45));
for (let k = 0; k < 5; k++) tic(T.cuenta + k * 0.11, -47);
ding(T.cuentaFin, -41);
s("sfx/sorbo.wav", T.q3g + 0.0, 0, { techo: -44 });
voz("m1", T.m1b, -1);
whoosh(T.gira, -46);
voz("o4", T.o4, -1);
ding(T.rot44 + 0.05, -42);
// Q4 · Walter entra manejando, frena, la puerta, la llave
s("sfx/auto-entra.wav", T.q4 - 0.3, 0, { desde: 3.0, dur: 1.6, fi: 0.2, fin: 0.3, techo: -40 });
s("sfx/puerta-auto.wav", T.abre, 0, { techo: -39 });
voz("w5", T.w5, -1);
s("sfx/llaves.wav", T.w5 + 0.1, 0, { techo: -44, dur: 0.6, fin: 0.15 });
s("sfx/llaves.wav", T.llave, 0, { techo: -42, dur: 0.6, fin: 0.15 });
voz("o5", T.o5, -1);
s("sfx/cero.mp3", T.o5 + CORTE.o5 + 0.02, 0, { techo: -40 });
// Q5 · el celular vibra; el cajón
voz("w6", T.w6, -1);
noti(T.vibra + 0.05, -39);
voz("o6", T.o6, -1);
// C · Óscar a cámara: el elevador ya arriba, pop en SERVICE, la línea chica
whoosh(T.c - 0.08, -44);
voz("o7", T.o7, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// pop suave en la entrada de cada burbuja (y de la segunda mitad de los remates)
for (const t of [T.o1, T.w1, T.m1, T.o2, T.w2, T.o3, T.o3 + CORTE.o3, T.w3, T.o1b, T.w1b, T.m1b, T.o4, T.w5, T.o5, T.o5 + CORTE.o5, T.w6, T.o6]) pop(t - 0.04, -42);
// duck de la cama (~-7 dB) mientras habla alguien
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => b >= x[1] && a <= x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a, b, 0.2])]; }
// en los tramos SIN voz la cama baja (HUECO_K): los huecos quedan ≤ -31 LUFS con los efectos adelante
const HUECO_K = Number(process.env.HUECO_K ?? 0.6);
{
  const V = VOZ.slice().sort((a, b) => a[0] - b[0]); const libres = []; let c = 0;
  for (const [a0, b0] of V) { const a = a0 + 0.2, b = b0 - 0.25; if (a > c + 0.25) libres.push([c, a]); c = Math.max(c, b); } if (DUR > c + 0.25) libres.push([c, DUR]);
  for (const x of S) if (esCama(x[0]) && !x[3].sinDuck && !x[3].sinHueco) x[3].duck = [...(x[3].duck || []), ...libres.filter(([a, b]) => b > x[1] && a < x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a - 0.05, b + 0.05, HUECO_K, 0.12])];
}
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
// CAMA: la música y la calle suben CAMA dB sobre su techo (se oyen bajo la voz); los huecos sin voz se verifican con
// medir-sfx.py (≤ -31)
const CAMA = Number(process.env.CAMA ?? 9);
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, Math.min(o.techo ?? TECHO, TECHO) - 6 - L.M, (o.pico ?? PICO) - L.pk) + (esCama(f) ? CAMA : 0) + (o.extra ?? 0)); };
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
    if (o.voz) c += ",acompressor=threshold=-24dB:ratio=2:attack=8:release=150:makeup=2.5";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k, rr = 0.4] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/${rr},0,1)*clip((${b}-t)/${rr},0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`anullsrc=r=48000:cl=stereo,atrim=duration=${dur}[z]`);   // ancla: amix sin entrada en t = 0 daba silencio
  filtros.push(`[z]${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length + 1}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=1.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
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
const ROT = r2(P1), IRIS = r2(P2 - 0.4);
const IRIS_C = "560px 1060px";   // el iris abre sobre el auto de Walter (no desde una cara)
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
      <div id="precarga">Talleres</div><div id="precarga2">Próximo service</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre sobre el auto
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.38, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
