// Genera todo como-viene-el-mes desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho-burbuja de Marta, "Ahí." de Rubén, el cartel "Un sistema
//     más tarde…", la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como anotamelo y me-haces-precio) en UN solo proyecto: parte 1 (0 a P1), el cartel
// (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni globos (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, recortadas; tomas en partes/tomas y partes/rec): m1 1,43 "¿Y, cómo viene el mes?" (Aoede, toma b)
// · r1 0,82 "Pará que te digo." (Algenib, b) · r2 0,47 "Ahí." (a) · m2 1,52 "¿Y comparado con el mes pasado?" (a) · m3 1,12
// "Pongo otro café." (b) · narrador 2,26 (reusado de anotamelo) · r3 3,42 "Ocho por ciento arriba del mes pasado. / Lo que
// más salió fue la yerba." (a, atempo 1,1; "Lo" +1,55 · "yerba." +3,0) · r4 0,51 "¿Y a vos?" (e) · m4 0,88 "Pará que te
// digo." (a)
const LEN = { m1: 1.43, r1: 0.82, r2: 0.47, m2: 1.52, m3: 1.07, nar: 2.35, r3: 3.42, r4: 0.51, m4: 0.88 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0, por encima del hombro de Rubén hacia la persiana: Marta pasa agachada con el pocillo; la caja TICKETS y
// el pinche en primer término. "¿Y, cómo viene el mes?" · se endereza y camina al mostrador · apoya el pocillo 1
T.m1 = 0.25; T.levanta = [0.2, 0.6]; T.camina = [0.6, 1.4]; T.taza1 = 1.5;
// P2 · Rubén de frente: "Pará que te digo." (se arremanga) · abre la caja (los tickets saltan) · arrastra la calculadora
T.p2 = 2.0; T.r1 = 2.1; T.arremanga = [2.1, 2.7]; T.abre = 3.0; T.calcu = [3.12, 3.42];
// P3 · la noche (time-lapse): grúa y órbita; teclea, imprime, la montaña de cinta crece; el pinche se pela; Marta va y
// viene con cortados (torre 1 → 2 → 4 → 7) y termina sentada en el cajón
T.p3 = 3.55; T.teclea = [3.6, 7.8]; T.monta = [3.7, 7.8]; T.pela = [3.8, 7.6];
// (ronda 1) dos insertos de la torre para que se cuenten: P3t1 (3 → 4) y P3t2 (4 → 7)
T.viajes = [[3.9, [4.5]], [4.95, [5.62, 5.76]], [6.0, [6.62, 6.74, 6.86]]];
T.p3t1 = 5.45; T.p3w = 5.95; T.p3t2 = 6.45; T.p3w2 = 7.05;   // [sale, [apoya cada pocillo]]
T.apoyada = 5.8; T.sienta = [7.05, 7.4];
// P4 · la mañana: plano bajo junto a la persiana; la franja de abajo pasa a crema; la mano del panadero empuja el pan ·
// P4b inserto de la calculadora desde arriba: TOTAL, imprime, arranca la cinta
T.p4 = 7.95; T.manana = [7.65, 7.9]; T.pan = [8.0, 8.5]; T.panSale = [8.6, 8.82]; T.buenDia = 8.1;   // (ronda 1) la franja ya encendida al entrar
T.p4b = 8.95; T.total = 9.08; T.imprime = [9.1, 9.24]; T.arranca = 9.3;
// P5 · Rubén de frente por arriba de la montaña: lee la cinta · P5b contraplano a Marta (se inclina) · P5c vuelta a Rubén:
// quietud, levanta la vista, "Ahí." con la mano más o menos
T.p5 = 9.5; T.lee = [9.55, 10.4]; T.p5b = 10.45; T.p5c = 11.05; T.mira = [11.15, 11.4]; T.r2 = 12.15; T.masomenos = [12.1, 12.95];   // (ronda 1) quietud ~1,1 s antes de "Ahí."
// P6 · de costado: "¿Y comparado con el mes pasado?" · Rubén baja entero y sube con la caja MES PASADO (golpe) · P6b la
// calculadora: C → 0. · P6c Marta agarra la torre: "Pongo otro café." y sale por la persiana
T.p6 = 13.1; T.m2 = 13.2; T.p6x = 14.8; T.baja = [15.12, 15.34]; T.sube = [15.34, 15.52]; T.golpe = 15.52; T.p6m = r2(T.golpe + 0.2);   // (ronda 1) cara de nada antes de agacharse; P6m: la caja MES PASADO de frente 1,1 s
T.p6b = r2(T.p6m + 1.1); T.tc = r2(T.p6b + 0.18); T.p6c = r2(T.p6b + 0.5); T.levantaM = [r2(T.p6c + 0.05), r2(T.p6c + 0.35)]; T.agarra = r2(T.p6c + 0.35); T.m3 = r2(T.p6c + 0.4); T.saleM = [r2(T.p6c + 0.85), r2(T.p6c + 1.7)]; T.teclea2 = r2(T.p6c + 1.1);
const P1 = r2(T.p6c + 1.8);               // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.7);   // (ronda 1) cartel de 2,7 s        // arranca la parte 2 (termina el iris del cartel)
// ---- parte 2 ----
// Q1 · el encuadre de P1: el mostrador limpio, el celular en el atril; Marta entra con la torre en la bandeja y el cajón
T.q1 = P2; T.m1b = r2(P2 + 0.2); T.levantaQ = [r2(P2 + 0.1), r2(P2 + 0.45)]; T.caminaQ = [r2(P2 + 0.45), r2(P2 + 1.3)]; T.apoyaQ = r2(P2 + 1.72);   // (ronda 1) después de la cola de "¿…el mes?"
// Q2 · vibra el celular: el resumen fila por fila · Q2b Rubén de frente con el mate: "Ocho por ciento…" · Q2c la yerba
T.q2 = r2(P2 + 1.95); T.vibra = r2(T.q2 + 0.05); T.filas = [0.3, 0.5, 0.7, 0.9].map((d) => r2(T.q2 + d));
// (ronda 1) el resumen se sostiene ~2 s; Rubén empieza a leerlo en off sobre el celular; la grúa a la yerba se acorta
T.r3 = r2(T.q2 + 1.4); T.q2b = r2(T.q2 + 2.45); T.q2c = r2(T.r3 + 2.45); T.yerba = r2(T.r3 + 3.0);
// Q3 · contraplano a Marta con la bandeja · Q3b Rubén: "¿Y a vos?" · Q3c Marta se congela
T.q3 = r2(T.r3 + LEN.r3 + 0.12); T.tiembla = r2(T.q3 + 0.3); T.q3b = r2(T.q3 + 0.8); T.r4 = r2(T.q3b + 0.1);
T.q3c = r2(T.r4 + LEN.r4 + 0.1); T.q4 = r2(T.q3c + 0.55);
// Q4 · Marta de frente: "Pará que te digo." · Q4b grúa atrás: saca la caja CAFETERÍA del cajón, la abre (los tickets
// saltan); Rubén saca un pocillo de la torre y se sienta en el banquito con el mate: ahora espera él · línea chica
T.m4 = r2(T.q4 + 0.05); T.q4b = r2(T.m4 + LEN.m4 + 0.08); T.sacaCaja = [r2(T.q4b + 0.05), r2(T.q4b + 0.45)]; T.abreQ = r2(T.q4b + 0.6);
// (ronda 1) Q5: general: Rubén ya del lado del cliente, le saca un pocillo a la torre, se sienta en el cajón con el mate y
// toma un sorbo; Marta suma con su caja CAFETERÍA
T.pocillo = [r2(T.q4b + 0.5), r2(T.q4b + 0.85)];   // (ronda 1) en Q4b: Rubén se corre detrás del mostrador y le saca un pocillo a la torre
T.q5 = r2(T.abreQ + 0.55); T.sientaR = [r2(T.q5 + 0.05), r2(T.q5 + 0.45)]; T.sorbo = r2(T.q5 + 1.0);
T.cierre = r2(T.q5 + 0.6);
const DUR = r2(T.cierre + 2.0);   // la línea chica 2 s (check: una línea de cierre necesita ~2 s)

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
const VOCES = ["m1", "r1", "r2", "m2", "m3", "r3", "r4", "m4"];
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin globos ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

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

// P1 · el gancho ES la burbuja de Marta: en el cuadro 0 ya está entero y grande ("mes?" en el recuadro verde de
// selección); con la voz (0,25) late una vez, como cualquier burbuja que habla. La cola baja hacia Marta (la persiana).
const GANCHO = { cola: 430, rot: 0 };   // Marta abajo al centro, bajo la persiana
{
  const id = "s00-gancho", ini = 0, fin = r2(T.m1 + LEN.m1 + 0.27), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 50px; right: 50px; top: 130px; padding: 30px 36px 40px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 45% 100%; }
    P .tx { font: 900 112px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx">¿Y, cómo viene<br>el <span class="sel"><b></b><em>mes?</em></span></div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.025, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${T.m1});
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -50, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}

// la línea de Rubén, palabra por palabra, en una caja navy (sobre la pared crema nunca va texto blanco suelto); la
// clave ("cuarenta.") en el recuadro verde
function linea(id, vozT, palabras, clave, fin, top, px = 96, lr = 60) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: ${lr}px; right: ${lr}px; top: ${top}px; padding: 24px 26px 34px; border-radius: 30px; background: ${NAVY}; border: 6px solid ${CR}; box-shadow: 0 12px 0 rgba(3,6,12,0.45); text-align: center; font: 900 ${px}px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: ${CR}; }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 22px; }
    P .w.ac em { color: ${NAVY}; }
    P .caja { position: absolute; left: -20px; right: -20px; top: 6px; bottom: 0; border: 5px solid ${CR}; background: ${G}; border-radius: 6px; }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${NAVY}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      tl.set(q(".linea"), { opacity: 0 }, 0); tl.set(q(".linea"), { opacity: 1 }, Number(qa(".w")[0].dataset.t)); tl.fromTo(q(".linea"), { scale: 0.88 }, { scale: 1, duration: 0.12, ease: "back.out(2)", immediateRender: false }, Number(qa(".w")[0].dataset.t));
      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        tl.set(w, { opacity: 1 }, t);
        tl.fromTo(w, { y: 18, scale: 0.86 }, { y: 0, scale: 1, duration: 0.12, ease: "back.out(2)", immediateRender: false }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t);
      }
      tl.set(q(".linea"), { opacity: 0 }, ${r2(dur - 0.03)});   // (ronda 2) se va con el corte, sin fundido`,
  });
}
// "Ahí." (el remate): caja navy grande arriba, la palabra en el recuadro verde
linea("s05-r2", T.r2, [["Ahí.", 0.0]], 0, r2(T.p6 - 0.02), 200, 210, 250);

// el cartel "Un sistema más tarde…" (time card de dibujito, de marca, hecho de cero; el mismo de me-haces-precio con el
// texto nuevo en dos líneas). Va DEBAJO del canvas: el canvas se va girando (último cuadro de la parte 1) y vuelve
// abriéndose en un iris (primer cuadro de la parte 2). No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  // cada palabra entra con el narrador (el audio va en P1 + 0,25: Un 0,25 · sistema 0,45 · más 1,15 · tarde 1,75)
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.035)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 520px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 190px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.c { font-size: 114px; letter-spacing: -0.025em; margin-top: 10px; }
    P .linea.b { font-size: 160px; margin-top: 26px; }
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
        ${lin("a", [["Una", 0.0]])}
        ${lin("c", [["automatización", 0.3]])}
        ${lin("b", [["más", 1.0], ["tarde…", 1.6]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: t0 < 0.05 ? 0.55 : 0, y: t0 < 0.05 ? 30 : 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 5; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});   // se va debajo del iris (sin hueco verde vacío)`,
  });
}

// la línea chica final (abajo): una línea y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 160px; padding: 26px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Una automatización te manda</div><div class="a">al celular cómo viene el mes</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima
// del tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -38) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const plato = (t, i = 0, techo = -38) => s(`sfx/k-plato-00${i % 4}.wav`, t, 0, { techo });
const persiana = (t, techo = -44) => s("sfx/k-metal-1.wav", t, 0, { techo, lp: 5000 });
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo }); };
// las teclas de la calculadora en ráfaga (key-press real) y la impresora: no hay una impresora de calculadora CC0
// accesible desde la nube: el "trrrk" se arma con teclas reales muy seguidas y el roce de papel real (papel.wav)
const teclas = (a, b, cada = 0.13, techo = -44) => { let i = 0; for (let t = a; t < b - 0.03; t += cada * (0.85 + ((i * 7) % 5) * 0.08), i++) s("sfx/key-press.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 }); };
const impresora = (a, b, techo = -47) => { for (let t = a; t < b - 0.05; t += 0.21) s("sfx/papel.wav", t, 10, { desde: r2(0.3 + ((t * 5) % 0.2)), dur: 0.2, fin: 0.05, techo, lp: 4500 }); };
const VOZ = [];
const voz = (f, t, db = -2, arch = f) => { s(`voice/${arch}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.05), r2(t + LEN[f] + 0.3)]); };
// ---- todo el reel: la heladera (zumbido) y la calle de noche muy lejos ----
s("sfx/zumbido.wav", 0, 0, { dur: r2(P1 + 0.25), fi: 0.05, fin: 0.4, techo: -46, lp: 700 });
s("sfx/zumbido.wav", P2, 0, { dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -47, lp: 700 });
s("sfx/calle.wav", 0, -6, { loop: true, dur: r2(P1 + 0.2), fin: 0.4, techo: -50, lp: 900 });
s("sfx/calle.wav", P2, -6, { loop: true, desde: 3, dur: r2(DUR - P2), fin: 0.5, techo: -50, lp: 900 });
// ---- la música: pizzicato toda la parte 1 (en el time-lapse el mismo tema más rápido, atempo 1,2 en otro tramo);
// en la pausa baja ~12 dB en 0,4 s y vuelve (NO se corta) ----
s("bgm/pizzicato.wav", 0, 0, { dur: r2(T.p3 + 0.2), fin: 0.25, techo: -33 });
s("bgm/pizzicato.wav", T.p3, 0, { desde: r2(T.p3), dur: r2(T.p4 - T.p3 + 0.25), fi: 0.15, fin: 0.3, techo: -33, tempo: 1.2 });
s("bgm/pizzicato.wav", T.p4, 0, { desde: 9.5, dur: r2(P1 - T.p4 + 0.2), fi: 0.2, fin: 0.4, techo: -33, duck: [[T.p5c - 0.1, T.r2 + LEN.r2 + 0.35, 0.75]] });   // (ronda 1) fundido más largo: sin hueco antes del whoosh del cartel
// ---- parte 1 ----
persiana(0.03);
voz("m1", T.m1, -2);
pasos(T.camina[0], T.camina[1], 4);
plato(T.taza1, 0, -37);
s("sfx/whoosh-short.mp3", T.p2 - 0.04, 0, { techo: -46 });
voz("r1", T.r1, -1);
s("sfx/k-cloth_1.wav", T.arremanga[0] + 0.05, 0, { techo: -48, dur: 0.4, fin: 0.1 });
s("sfx/k-book_open.wav", T.abre - 0.03, 0, { techo: -42 });
pop(T.abre, -38); s("sfx/papel.wav", T.abre + 0.02, 6, { techo: -40, dur: 0.5, fin: 0.2 });
s("sfx/k-book_place_2.wav", T.calcu[0], 0, { techo: -44, lp: 3000 }); pop(T.calcu[1] - 0.05, -42);
// P3 · el time-lapse
s("sfx/whoosh.mp3", T.p3 - 0.04, 0, { techo: -42, dur: 0.6, fin: 0.2 });
teclas(T.teclea[0], T.teclea[1], 0.12, -45);
impresora(T.teclea[0] + 0.1, T.teclea[1], -48);
T.viajes.forEach(([sale, apoya], v) => { persiana(sale + 0.25, -48); persiana(sale + 0.5, -48); apoya.forEach((t, i) => plato(t, v + i, -39)); });
for (const c of [T.p3t1, T.p3w, T.p3t2, T.p3w2]) s("sfx/whoosh-short.mp3", c - 0.04, 0, { techo: -50 });   // (ronda 1) los insertos de la torre
s("sfx/k-plastico.wav", T.sienta[1] - 0.05, 0, { techo: -42 });
// P4 · la mañana: la bolsa del pan sobre la baldosa; la calculadora: TOTAL, imprime, rrrip
s("sfx/whoosh-short.mp3", T.p4 - 0.04, 0, { techo: -46 });
s("sfx/k-book_place_2.wav", T.pan[1] - 0.05, 0, { techo: -42 }); pop(T.buenDia - 0.02, -42); s("sfx/papel.wav", T.pan[0] + 0.1, 0, { techo: -47, dur: 0.4, fin: 0.15 });
s("sfx/whoosh-short.mp3", T.p4b - 0.04, 0, { techo: -46 });
s("sfx/k-metal-click.wav", T.total - 0.01, 0, { techo: -40, dur: 0.2, fin: 0.05 });
impresora(T.imprime[0], T.imprime[1] + 0.1, -44);
s("sfx/rasgado.wav", T.arranca - 0.04, 0, { techo: -34 });   // (ronda 1) papel que se rasga real (Luckius, OpenGameArt, CC0)
// P5 · lee la cinta (roce suave de papel), quietud (solo la heladera), "Ahí."
s("sfx/whoosh-short.mp3", T.p5 - 0.04, 0, { techo: -48 });
s("sfx/papel.wav", T.lee[0] + 0.05, 0, { techo: -50, dur: 0.8, fin: 0.25, lp: 4000 });
s("sfx/whoosh-short.mp3", T.p5b - 0.04, 0, { techo: -50 });
voz("r2", T.r2, -1);
s("sfx/k-cloth_2.wav", T.masomenos[0] + 0.05, 0, { techo: -50 });
// P6 · "¿Y comparado…?", el cuerpo que baja, el golpe de la caja MES PASADO, la C, el clink de la torre, la persiana
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -46 });
voz("m2", T.m2, -2);
s("sfx/whoosh-short.mp3", T.p6x - 0.04, 0, { techo: -48 }); s("sfx/whoosh-short.mp3", T.p6m - 0.04, 0, { techo: -50 });
s("sfx/k-cloth_1.wav", T.baja[0], 0, { techo: -46, dur: 0.35, fin: 0.1 });
s("sfx/k-book_place_1.wav", T.golpe - 0.02, 0, { techo: -34 }); s("sfx/papel.wav", T.golpe, 8, { techo: -42, dur: 0.35, fin: 0.15 });
plato(T.golpe + 0.04, 2, -44); plato(T.golpe + 0.13, 3, -46);   // la torre se sacude
s("sfx/whoosh-short.mp3", T.p6b - 0.04, 0, { techo: -48 });
s("sfx/k-metal-click.wav", T.tc - 0.01, 0, { techo: -40, dur: 0.2, fin: 0.05 });
s("sfx/whoosh-short.mp3", T.p6c - 0.04, 0, { techo: -48 });
s("sfx/k-cloth_2.wav", T.levantaM[0], 0, { techo: -46 }); s("sfx/k-creak.wav", T.levantaM[0] + 0.05, 0, { techo: -48 });   // (ronda 1) se levanta del cajón
plato(T.agarra - 0.15, 1, -40);
voz("m3", T.m3, -2);
pasos(T.saleM[0], T.saleM[1] - 0.2, 4);
persiana(T.saleM[1] - 0.15, -46);
teclas(T.teclea2, P1 - 0.05, 0.14, -48);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -41, dur: 0.6, fin: 0.25 });
voz("nar", P1 + 0.08, -4, "narrador");
for (const d of [0.0, 0.3, 1.0, 1.6]) pop(P1 + d + 0.02, -42);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -40 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -33, duck: [[T.q3c - 0.1, T.q4 + 0.1, 0.6]] });
persiana(P2 + 0.03);
voz("m1", T.m1b, -2);
pasos(T.caminaQ[0], T.caminaQ[1], 4);
plato(T.apoyaQ + 0.05, 0, -46); plato(T.apoyaQ + 0.13, 2, -48);
s("sfx/k-plastico.wav", T.apoyaQ + 0.1, 0, { techo: -48 });   // (ronda 1) bajos: no pisan la cola de "¿…el mes?"
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -46 });
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.45, fin: 0.08, techo: -38 });
s("sfx/notification.mp3", r2(T.vibra + 0.08), 0, { techo: -43 });
T.filas.forEach((t) => pop(t, -44));   // (ronda 1) también la 4.ª fila
s("sfx/whoosh-short.mp3", T.q2b - 0.04, 0, { techo: -48 });
voz("r3", T.r3, -1);
s("sfx/whoosh-short.mp3", T.q2c - 0.04, 0, { techo: -46 });
pop(T.yerba, -40); s("sfx/ding.mp3", T.yerba + 0.08, 0, { techo: -41, dur: 0.8, fin: 0.35 });
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -48 });
plato(T.tiembla, 1, -44); plato(T.tiembla + 0.1, 3, -46);
s("sfx/whoosh-short.mp3", T.q3b - 0.04, 0, { techo: -48 });
voz("r4", T.r4, -1);
s("sfx/whoosh-short.mp3", T.q4 - 0.04, 0, { techo: -48 });
voz("m4", T.m4, -2);
s("sfx/whoosh.mp3", T.q4b - 0.04, 0, { techo: -44, dur: 0.5, fin: 0.15 });
s("sfx/whoosh-short.mp3", T.q5 - 0.04, 0, { techo: -46 });
s("sfx/sorbo.wav", T.sorbo, 0, { desde: 0.45, dur: 0.95, fin: 0.2, techo: -40 });   // (ronda 1) el sorbo de mate (Abir19, CC0)
s("sfx/k-plastico.wav", T.sacaCaja[0] + 0.05, 0, { techo: -46 });
s("sfx/k-book_place_1.wav", T.sacaCaja[1] - 0.03, 0, { techo: -40 });
s("sfx/k-book_open.wav", T.abreQ - 0.03, 0, { techo: -42 });
pop(T.abreQ, -38); s("sfx/papel.wav", T.abreQ + 0.02, 6, { techo: -40, dur: 0.5, fin: 0.2 });
plato(T.pocillo[1] - 0.05, 2, -42);
s("sfx/k-plastico.wav", T.sientaR[1] - 0.05, 0, { techo: -44 });
pop(T.cierre + 0.05, -42);
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav") { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }

// arreglos por archivo (heredados: tramos mudos al principio, un solo golpe)
for (const x of S) {
  const [f, , , o] = x;
  if (f === "sfx/papel.wav" && !o.desde) { o.desde = 0.3; if (!o.dur) { o.dur = 0.75; o.fin = 0.2; } }
}
for (const x of S) { const o = x[3]; if (o.fin && !o.dur) o.dur = r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/${x[0]}`).toString()) - (o.desde ?? 0)); }
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}@${o.lp ?? 0}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const lp = o.lp ? `lowpass=f=${o.lp},` : "";
    const txt = execSync(`ffmpeg -hide_banner -nostats ${o.loop ? "-stream_loop 2 " : ""}-i assets/${f} -af "${corte}${lp}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128=peak=true" -f null - 2>&1`).toString();
    const ms = [...txt.matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => Number(m[1])).filter((v) => v > -69);
    const pk = [...txt.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1);
    lufs[k] = { M: ms.length ? Math.max(...ms) : -30, pk: pk ? Number(pk[1]) : -20 };
  }
  return lufs[k];
}
const PICO = Number(process.env.PICO ?? -19);
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, (o.techo ?? TECHO) - L.M, (o.pico ?? PICO) - L.pk)); };
function mezcla(lista, salida, dur) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    if (o.loop) args.push("-stream_loop", "2");
    args.push("-i", `assets/${f}`);
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${r2(o.dur * (o.tempo || 1))}` : ""},asetpts=PTS-STARTPTS`;
    if (o.tempo) c += `,atempo=${o.tempo}`;
    if (o.lp) c += `,lowpass=f=${o.lp}`;
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
  // el bus pasa por un limitador (como hacen-envios): loudnorm I=-14:TP=-1.5 del paso 10 llega a -14 sin quedarse corto
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
const ROT = r2(P1), IRIS = r2(P2 - 0.32);
const IRIS_C = "540px 1150px";   // el iris se abre desde Marta bajo la persiana (Q1, el mismo encuadre de P1)
// la firma (logo) abajo al centro, solo donde abajo hay mostrador navy (nunca sobre la pared crema, el cartel ni la línea chica)
const FIRMAS = [];   // (ronda 1) criterio parejo: sin logo suelto; la marca va solo en la línea chica (línea Para mandar)
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
      #precarga2 { position: absolute; left: -9999px; font: 700 40px "Caveat"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0b1220; }
      #fondo { position: absolute; inset: 0; background: #0b1220; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1795px; height: 46px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Rubén</div><div id="precarga2">TICKETS</div>
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
      tl.set("#capa3d", { opacity: 0 }, ${ROT});   // (ronda 2) corte seco al cartel (el giro pasaba por la pelada espejada)
      // la parte 2 entra por un iris que se abre desde la tablet
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(0px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(T));
