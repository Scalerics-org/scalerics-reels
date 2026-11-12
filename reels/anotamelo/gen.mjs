// Genera todo anotamelo desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho-burbuja de P1, la línea de Rubén "Mil ochocientos
//     cuarenta.", el cartel "Un sistema más tarde…", la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como me-haces-precio, hacen-envios y abren-hoy-completo) en UN solo proyecto: parte 1
// (0 a P1), el cartel (P1 a P2, HTML debajo del canvas: el canvas se va girando y vuelve con un iris) y la parte 2
// (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana, globos ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, recortadas; tomas en partes/voces.md): g1 1,14 ("Anotámelo," 0 · "Rubén." +0,5) · h1 0,79 ·
// w1 0,70 · m1 0,74 · h2 0,90 · w2 1,56 · g2 2,16 ("Rubén," 0 · "vengo" +0,4 · "pagarte." +0,9 · "¿Cuánto" +1,58 ·
// "es?" +1,8) · r1 1,63 ("Mil" 0 · "ochocientos" +0,35 · "cuarenta." +0,7) · h3 1,27 · narrador 2,26 ("Un" 0 · "sistema"
// +0,2 · "más" +0,9 · "tarde." +1,5) · r2 0,66 · h4 1,52 ("¡Ah, mirá!" 0 · "Yo" +0,4 · "debía." +0,9)
const LEN = { g1: 1.14, h1: 0.79, w1: 0.7, m1: 0.74, h2: 0.9, w2: 1.56, g2: 2.16, r1: 1.63, h3: 1.27, nar: 2.26, r2: 0.66, h4: 1.52 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el mostrador, la libreta abierta en primer término, Graciela con la bolsa, Rubén con el lápiz largo
// en la oreja. "Anotámelo, Rubén." · saca el lápiz (la mano sube por el costado) · escribe
T.g1 = 0.25;
// CICLOS del lápiz: [agarra (de la oreja a la libreta), escribe, saca punta, vuelve a la oreja] (inicio de cada fase y fin)
// · el largo del lápiz en la oreja después de cada ciclo
const ciclo = (a, dA, dW, dS, dE) => { const b = r2(a + dA), c = r2(b + dW), d = r2(c + dS + 0.02), e = r2(d + dE); return [r2(a), b, c, d, e]; };
T.ciclos = [
  ciclo(0.95, 0.6, 0.5, 0.14, 0.14),   // (ronda 2) la mano llega a la oreja ~1,22 y lo saca a la vista      // Graciela (P1: saca el lápiz de la oreja y escribe la línea entera)
];
T.p2 = 2.12;
// P2 · el desfile: Héctor, Walter, Marta (con voz) y tres vecinos más, sin voz (time-lapse, cada vez más rápido)
// (ronda 1: más rápido; los tres vecinos se ven: la burbuja tiene dueño)
T.cli = [2.56, 3.1, 3.58, 4.03, 4.27, 4.51];          // cuando aparece cada burbuja
T.llega = [2.46, 3.0, 3.48, 4.0, 4.24, 4.48];      // cuando entra cada uno (sale cuando entra el siguiente)
T.ciclos.push(ciclo(2.6, 0.11, 0.22, 0.12, 0.11), ciclo(3.14, 0.1, 0.2, 0.1, 0.1), ciclo(3.62, 0.1, 0.18, 0.1, 0.09));
for (const t of [4.03, 4.27, 4.51]) T.ciclos.push(ciclo(t, 0.04, 0.06, 0.03, 0.05));
T.largos = [0.24, 0.215, 0.19, 0.165, 0.14, 0.12, 0.105, 0.09];   // el largo antes del primer ciclo y después de cada uno
// el almanaque: la hoja que se arranca en cada cliente (día que se va → día que queda)
T.hojas = [[2.64, 1, 8], [3.18, 8, 15], [3.66, 15, 22], [4.07, 22, 25], [4.31, 25, 27], [4.55, 27, 29]];
// P3 · el 30: el almanaque grande, la última hoja vuela y queda el 30 con COBRAR · P3b la libreta cerrada y gorda
T.p3 = 4.78; T.hoja30 = 4.88; T.p3b = 5.36;
// P4 · cobrar, por encima del hombro de Rubén: Héctor "¿Yo te debía?" · corte a Walter "¿Eso no te lo pagué el martes?" ·
// inserto cenital de la hoja del martes: la mano la da vuelta 180° de una vez (ronda 1)
T.p4 = 5.9; T.h2 = 6.05; T.p4w = r2(T.h2 + LEN.h2 + 0.12); T.w2 = r2(T.p4w + 0.1);
T.p4i = r2(T.w2 + LEN.w2 + 0.06); T.gira = [r2(T.p4i + 0.22), r2(T.p4i + 0.48)];
// P5 · general desde atrás del mostrador: campanita, entra Graciela con el monedero: "Rubén, vengo a pagarte. ¿Cuánto es?"
T.p5 = r2(T.p4i + 0.7); T.entraG = [T.p5, r2(T.p5 + 0.75)]; T.g2 = r2(T.p5 + 0.35);
// P5b · inserto: pasa dos hojas (la mano al costado, nunca sobre la hoja), la última llena, la contratapa llena, cierra
T.p5b = r2(T.g2 + LEN.g2 + 0.05); T.pasa = [r2(T.p5b + 0.05), r2(T.p5b + 0.5)]; T.ultima = r2(T.p5b + 0.5);
T.contra = [r2(T.p5b + 0.68), r2(T.p5b + 0.86)]; T.cierra = [r2(T.p5b + 1.04), r2(T.p5b + 1.2)];
// P5c · Rubén de frente: quietud; da vuelta el antebrazo · P5d (corte) el antebrazo de frente, llena el cuadro:
// "Mil ochocientos cuarenta."
T.p5c = r2(T.cierra[1] + 0.08); T.brazo = [r2(T.p5c + 0.55), r2(T.p5c + 0.9)]; T.p5d = r2(T.p5c + 0.95); T.push = [T.p5d, r2(T.p5d + 0.6)];
T.r1 = r2(T.p5d + 0.2);
// P6 · la puerta (desde atrás del mostrador): Graciela se va contenta y entra Héctor con la billetera: "¿Y yo cuánto te
// debía?" · P6c cámara alta: Rubén agacha la cabeza, la pelada escrita (con su golpe, la música baja); Héctor se arrima
T.p6 = r2(T.r1 + LEN.r1 + 0.12); T.saleG = [T.p6, r2(T.p6 + 0.5)];
T.p6b = T.p6; T.entraH = [r2(T.p6 + 0.72), r2(T.p6 + 1.2)]; T.h3 = r2(T.p6 + 0.8);   // (ronda 2) Héctor entra cuando Graciela ya salió
T.p6c = r2(T.h3 + LEN.h3 + 0.08); T.agacha = [r2(T.p6c + 0.12), r2(T.p6c + 0.5)]; T.push6 = [r2(T.p6c + 0.3), r2(T.p6c + 1.0)];
T.lee = r2(T.p6c + 0.65);
const P1 = r2(T.p6c + 1.45);     // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 3.0);        // arranca la parte 2 (termina el iris del cartel)
// ---- parte 2 ----
// Q1 · el encuadre de P1 con la tablet: "Anotámelo, Rubén." (la misma toma) · la mano va sola a la oreja, se frena,
// baja y toca la tablet: "Graciela · + $ 320 ✓" (el saldo pasa a $ 1.840) · "Anotado."
T.q1 = P2; T.g1b = r2(P2 + 0.2); T.mano = [r2(T.g1b + LEN.g1 - 0.05), r2(T.g1b + LEN.g1 + 0.25)]; T.frena = r2(T.mano[1] + 0.25);
T.toca = r2(T.frena + 0.22); T.mas320 = r2(T.toca + 0.16); T.r2 = r2(T.toca + 0.12);
// Q2 · el almanaque: 30 limpio · Q2b Héctor entra YA leyendo el aviso en el celular · Q2c el aviso en su mano: "¡Ah,
// mirá! Yo te debía." y toca Pagar: "Pagado ✓" (ronda 1: sin el beat de "abre la boca y vibra")
T.q2 = r2(T.r2 + LEN.r2 + 0.12); T.hoja30b = r2(T.q2 + 0.08);
T.q2b = r2(T.q2 + 0.5); T.entraH2 = [r2(T.q2b - 0.25), r2(T.q2b + 0.2)]; T.noti = r2(T.q2b - 1.0);
T.q2c = r2(T.q2b + 0.55); T.h4 = r2(T.q2c + 0.15);
T.pagar = r2(T.h4 + LEN.h4 + 0.05); T.pagado = r2(T.pagar + 0.14);
// Q3 · la tablet de Rubén: las cuentas se ponen en verde una por una · Q3b el estante: la libreta se jubila
T.q3 = r2(T.pagado + 0.45); T.filas = [0, 0.35, 0.6, 0.85].map((d) => r2(T.q3 + d));
T.q3b = r2(T.q3 + 1.05); T.grua = [T.q3b, T.q3b]; T.apoya = r2(T.q3b + 0.35);
// Q4 · cierre: Rubén sentado, mate en la izquierda, el diario: saca el lápiz de la oreja y escribe FIADO; la línea chica
T.q4 = r2(T.q3b + 0.6); T.sacaQ4 = [r2(T.q4 + 0.05), r2(T.q4 + 0.3)]; T.fiado = [r2(T.q4 + 0.32), r2(T.q4 + 0.95)];
T.cierre = r2(T.q4 + 0.95);
const DUR = r2(T.cierre + 1.6);

// palabras de "Mil ochocientos cuarenta." (relativas al inicio del archivo)
const LINEA_R1 = [["Mil", 0.0], ["ochocientos", 0.35], ["cuarenta.", 0.7]];

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
const VOCES = ["g1", "h1", "w1", "m1", "h2", "w2", "g2", "r1", "h3", "r2", "h4"];
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

// P1 · el gancho ES la burbuja de Graciela: en el cuadro 0 ya está entero y grande ("Anotámelo" en el recuadro verde de
// selección); con la voz (0,25) late una vez, como cualquier burbuja que habla. La cola baja hacia Graciela (izquierda).
const GANCHO = { cola: 800, rot: 22 };   // (ronda 1) Graciela a la derecha
{
  const id = "s00-gancho", ini = 0, fin = r2(T.g1 + LEN.g1 + 0.3), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 70px; right: 70px; top: 130px; padding: 30px 36px 40px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 82% 100%; }
    P .tx { font: 900 132px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx"><span class="sel"><b></b><em>Anotámelo,</em></span><br>Rubén.</div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.025, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${T.g1});   // (ronda 2) sin el salto del recuadro verde
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -50, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}

// la línea de Rubén, palabra por palabra, en una caja navy (sobre la pared crema nunca va texto blanco suelto); la
// clave ("cuarenta.") en el recuadro verde
function linea(id, vozT, palabras, clave, fin, top) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 60px; right: 60px; top: ${top}px; padding: 24px 26px 34px; border-radius: 30px; background: ${NAVY}; border: 6px solid ${CR}; box-shadow: 0 12px 0 rgba(3,6,12,0.45); text-align: center; font: 800 96px/1.2 "Lexend", sans-serif; letter-spacing: -0.015em; color: ${CR}; }
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
linea("s05-r1", T.r1, LINEA_R1, 2, r2(T.p6 - 0.02), 1590);   // (ronda 2) arriba: no tapa el antebrazo

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
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 140px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 146px; margin-top: 22px; }
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
        ${lin("a", [["Un", 0.25], ["sistema", 0.45]])}
        ${lin("b", [["más", 1.15], ["tarde…", 1.75]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
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
    html: `      <div class="caja"><div class="a">Un sistema anota el fiado</div><div class="a">y le manda a cada cliente</div><div class="a">su cuenta</div><div class="b">scalerics.com</div></div>`,
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
const escribe = (a, b, techo = -44) => { for (let t = a; t < b - 0.05; t += 0.17) s("sfx/papel.wav", t, 14, { desde: r2(0.30 + ((t * 7) % 0.16)), dur: 0.12, fin: 0.05, techo, lp: 5000 }); };
const pasos = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo }); };
// las voces: en todas, duck de la música alrededor
const VOZ = [];
const voz = (f, t, db = -2) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.05), r2(t + LEN[f === "narrador" ? "nar" : f] + 0.3)]); };
// ---- parte 1 ----
// ambiente de almacén (la calle de día por la puerta, con pasabajos) y el zumbido de la heladera, todo el reel
s("sfx/calle.wav", 0, -6, { loop: true, dur: r2(DUR), fin: 0.5, techo: -42, lp: 1800 });
s("sfx/zumbido.wav", 0, 0, { dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -47, lp: 700 });
s("sfx/zumbido.wav", P2, 0, { dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -48, lp: 700 });
// la música (pizzicato, la firma de la línea): sigue toda la parte 1; en la pausa baja a -12 dB en 0,4 s (NO se corta)
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -33, duck: [[T.cierra[1] - 0.25, T.r1 + LEN.r1 + 0.2, 0.75], [T.agacha[0] - 0.1, P1 + 0.6, 0.68]] });   // (ronda 1) la pelada: la música baja ~10 dB hasta el whoosh del cartel
voz("g1", T.g1, -2);
// el lápiz: sale de la oreja (roce), escribe, sacapuntas, vuelve
T.ciclos.forEach(([a, b, c, d, e], i) => {
  s("sfx/k-cloth_2.wav", a, 0, { techo: -50 });
  s("sfx/k-cloth_1.wav", d + 0.02, 0, { techo: -52, dur: 0.25, fin: 0.08 });   // (ronda 1) roce al volver a la oreja
  escribe(b, c, i === 0 ? -42 : -45);
  if (i > 0) s(i % 2 ? "sfx/k-knife_slice_2.wav" : "sfx/k-knife_slice.wav", c + 0.01, 0, { dur: Math.max(0.12, d - c), fin: 0.05, techo: i < 4 ? -42 : -45, lp: 6000 });
});
// P2 · la órbita, los clientes (pop por burbuja, sus voces), la hoja de la libreta que pasa, el almanaque
s("sfx/whoosh.mp3", T.p2 - 0.04, 0, { techo: -42, dur: 0.5, fin: 0.15 });
voz("h1", T.cli[0], -2); voz("w1", T.cli[1], -3); voz("m1", T.cli[2], -2);
T.cli.forEach((t, i) => pop(t - 0.02, i < 3 ? -38 : -39));
T.llega.forEach((t) => s("sfx/whoosh-short.mp3", t - 0.03, 0, { techo: -46 }));
T.hojas.forEach(([t], i) => s(i % 2 ? "sfx/k-book_flip_2.wav" : "sfx/k-book_flip_3.wav", t, 0, { techo: i < 3 ? -42 : -45 }));
T.ciclos.slice(1).forEach(([a, b]) => s("sfx/k-page-turn.wav", b - 0.06, 0, { techo: -47, dur: 0.3, fin: 0.1 }));
// P3 · la ráfaga de la última hoja y el 30 (tic), el corte a la libreta gorda
s("sfx/whoosh-short.mp3", T.p3 - 0.04, 0, { techo: -42 });
s("sfx/k-book_flip_2.wav", T.hoja30 - 0.02, 0, { techo: -40 });
s("sfx/tic-real.mp3", T.hoja30 + 0.2, 0, { techo: -37 });
s("sfx/whoosh-short.mp3", T.p3b - 0.04, 0, { techo: -42 });
s("sfx/k-book_place_1.wav", T.p3b + 0.05, 0, { techo: -44 });
// P4 · cobrar
s("sfx/whoosh-short.mp3", T.p4 - 0.04, 0, { techo: -44 });
pop(T.h2 - 0.02); voz("h2", T.h2, -2);
s("sfx/whoosh-short.mp3", T.p4w - 0.04, 0, { techo: -46 });
pop(T.w2 - 0.02); voz("w2", T.w2, -3);
s("sfx/whoosh-short.mp3", T.p4i - 0.04, 0, { techo: -44 });
for (const t of T.gira) s("sfx/papel.wav", t - 0.02, 0, { dur: 0.25, fin: 0.1, techo: -42 });
// P5 · la campanita, Graciela, las hojas, la contratapa, la tapa que cierra; la quietud (heladera + un tic); el brazo
s("sfx/campanita.wav", T.p5 + 0.02, 0, { techo: -38, dur: 0.7, fin: 0.25 });
s("sfx/puerta-abre.wav", T.p5 - 0.05, 0, { techo: -46 });
pasos(T.entraG[0] + 0.1, T.entraG[1], 4, -47);
pop(T.g2 - 0.02); voz("g2", T.g2, -3);
s("sfx/whoosh-short.mp3", T.p5b - 0.04, 0, { techo: -46 });
s("sfx/k-book_flip_2.wav", T.pasa[0], 0, { techo: -42 });
s("sfx/k-book_flip_3.wav", r2((T.pasa[0] + T.pasa[1]) / 2), 0, { techo: -42 });   // (ronda 1) dos hojas, dos pases
s("sfx/k-page-turn.wav", T.contra[0] - 0.03, 0, { techo: -43, dur: 0.35, fin: 0.1 });
s("sfx/k-book_close.wav", T.cierra[1] - 0.02, 0, { techo: -36 });
s("sfx/reloj.wav", T.p5c + 0.25, 0, { desde: 1.0, dur: 0.22, fin: 0.06, techo: -41 });   // un tic del reloj en la quietud
s("sfx/k-cloth_1.wav", T.brazo[0], 0, { techo: -46, dur: 0.4, fin: 0.1 });
s("sfx/whoosh-short.mp3", T.push[0] - 0.02, 0, { techo: -50 });
voz("r1", T.r1, -1);
// P6 · los billetes, el saludo, la puerta, Héctor; la pelada
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -46 });
// (ronda 3) sin pasos cuando Graciela se va: tapaban la cola de la voz de Rubén (B2)
s("sfx/campanita.wav", r2(T.entraH[0] - 0.12), 0, { techo: -45, dur: 0.5, fin: 0.25 });
pasos(T.entraH[0], T.entraH[1], 3, -47);
pop(T.h3 - 0.02); voz("h3", T.h3, -2);
s("sfx/whoosh-short.mp3", T.p6c - 0.04, 0, { techo: -46 });
s("sfx/k-cloth_2.wav", T.agacha[0], 0, { techo: -47 });
s("sfx/k-book_close.wav", T.agacha[1] - 0.04, 0, { techo: -38 });   // (ronda 1) el acento seco de la pelada
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -41, dur: 0.6, fin: 0.25 });
voz("narrador", P1 + 0.25, -4);
for (const d of [0.25, 0.45, 1.15, 1.75]) pop(P1 + d, -42);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -40 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -33 });
s("sfx/campanita.wav", P2 + 0.02, 0, { techo: -46, dur: 0.6, fin: 0.25 });
voz("g1", T.g1b, -2);
s("sfx/k-cloth_2.wav", T.mano[0], 0, { techo: -48 });
s("sfx/click-soft.mp3", T.toca, 0, { techo: -38 });
s("sfx/ding.mp3", T.mas320, 0, { techo: -40, dur: 0.8, fin: 0.35 });
voz("r2", T.r2, -1);
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -44 });
s("sfx/k-book_flip_3.wav", T.hoja30b - 0.04, 0, { techo: -42 });
s("sfx/whoosh-short.mp3", T.q2b - 0.04, 0, { techo: -46 });
pasos(T.entraH2[0], T.entraH2[1], 3, -47);
// (ronda 1) el aviso llega durante el almanaque (fin de mes): vibra y notificación fuera de cuadro; Héctor entra leyéndolo
s("sfx/vibra.wav", r2(T.q2b + 0.02), 0, { dur: 0.45, fin: 0.08, techo: -38 });   // (ronda 2) en Q2b, con el celular en cuadro
s("sfx/notification.mp3", r2(T.q2b + 0.08), 0, { techo: -40 });
s("sfx/whoosh-short.mp3", T.q2c - 0.06, 0, { techo: -50 });
pop(T.h4 - 0.08, -42); voz("h4", T.h4, -2);
s("sfx/click-soft.mp3", T.pagar, 0, { techo: -42 });
s("sfx/cero.mp3", T.pagado, 0, { techo: -41 });
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -46 });
T.filas.slice(1).forEach((t) => pop(t, -40));   // (ronda 3) Héctor ya entra en verde (pagó): sin pop
s("sfx/whoosh-short.mp3", T.q3b - 0.04, 0, { techo: -46 });
s("sfx/k-book_place_2.wav", T.apoya - 0.02, 0, { techo: -38 });
s("sfx/whoosh-short.mp3", T.q4 - 0.04, 0, { techo: -46 });
s("sfx/k-cloth_2.wav", T.sacaQ4[0], 0, { techo: -48 });
escribe(r2(T.fiado[0] + 0.2), T.fiado[1], -40);   // (ronda 3) la mano llega a la grilla ~0,2 s después
pop(T.cierre + 0.05, -42);   // (ronda 1) la línea chica
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
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
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
    mezcla(S.filter((x) => !x[3].voz && !(x[0] === "sfx/papel.wav" && x[3].dur === 0.12)), "assets/audio/stem-sinlapiz.wav", DUR);
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
const IRIS_C = "540px 1250px";   // el iris se abre desde la tablet (Q1, el mismo encuadre de P1)
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
      <div id="precarga">Rubén</div><div id="precarga2">FIADO</div>
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
