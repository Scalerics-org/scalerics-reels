// Genera todo te-queda desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho-burbuja de P1, el chip "Viajes al depósito", el cartel
//     "Un sistema más tarde…", la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como anotamelo, me-haces-precio y abren-hoy-completo) en UN solo proyecto: parte 1
// (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de
// videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni globos (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, recortadas; tomas en partes/voces.md): g1 "¿Te queda polenta?" · r1 "Ya me fijo." · r2 "No, no
// queda." ("no" +0,6) · w1 "¿Y fideos?" · m1 "¿Azúcar te queda?" · h1 "¿Te queda dulce de leche?" · r3 "Queda uno." ·
// h2 "Ah, no. Era para saber." ("Era" +0,79) · h3 "¿Y yerba?" · narrador "Un sistema más tarde." · r4 "Quedan tres." ·
// h4 "¿Y dulce de leche?" · r5 "Doce." · h5 "Era para saber." · r6 "Ahora sabés." · h6 "Doce."
const LEN = { g1: 1.04, r1: 0.91, r2: 1.22, w1: 0.91, m1: 1.02, h1: 1.53, r3: 1.0, h2: 1.67, h3: 0.63, nar: 2.26, r4: 0.87, h4: 1.01, r5: 0.63, h5: 0.88, r6: 1.0, h6: 0.52 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el mostrador a la siesta, Graciela con la bolsa, Rubén con el mate, la trampa del sótano con su
// argolla. "¿Te queda polenta?" · "Ya me fijo." · deja el mate, va a la trampa y la levanta
T.g1 = 0.25; T.r1 = r2(T.g1 + LEN.g1 + 0.1);
T.va = [1.42, 1.86]; T.abre = [1.9, 2.3];
// P2 · la zambullida: baja la escalera marinera (la cámara lo sigue por el hueco), la cadenita, el foco, la caja
// POLENTA: la sacude, vacía
T.p2 = 2.32; T.baja1 = [2.32, 2.86]; T.cadena = 3.0; T.luz = 3.06; T.agarra = [3.12, 3.38]; T.sacude = [3.42, 3.92];
// P3 · contraplano bajo: Rubén asoma por la trampa con polvo en los hombros: "No, no queda." · chip 1
T.p3 = 4.02; T.sube1 = [4.02, 4.3]; T.r2 = 4.3; T.chip1 = 4.42; T.palmea = [4.6, 4.95];
// P4 · el corte de casa de muñecas: Walter "¿Y fideos?" · baja, escalera tijera, avalancha, sube con la telaraña: "No." · chip 2
T.p4 = r2(T.r2 + LEN.r2 + 0.06); T.entraW = [r2(T.p4 - 0.1), r2(T.p4 + 0.12)]; T.w1 = r2(T.p4 + 0.18);
T.baja2 = [r2(T.w1 + 0.55), r2(T.w1 + 0.85)]; T.tij2 = [r2(T.baja2[1]), r2(T.baja2[1] + 0.16), r2(T.baja2[1] + 0.36)];   // camina, sube
T.aval = r2(T.tij2[2] + 0.04); T.bajaT2 = [r2(T.aval + 0.36), r2(T.aval + 0.5)]; T.sube2 = [r2(T.bajaT2[1] + 0.02), r2(T.bajaT2[1] + 0.14), r2(T.bajaT2[1] + 0.44)];
T.no2 = r2(T.sube2[2] + 0.04);
// P5 · la misma sección, más abajo: Marta "¿Azúcar te queda?" · el foco se quema, la linterna, la caja en la cabeza: "No." · chip 3
T.p5 = r2(T.no2 + 0.42); T.saleW = [r2(T.p5 - 0.18), r2(T.p5 + 0.02)]; T.entraM = [r2(T.p5 - 0.02), r2(T.p5 + 0.18)]; T.m1 = r2(T.p5 + 0.2);
T.baja3 = [r2(T.m1 + 0.2), r2(T.m1 + 0.5)]; T.quema = r2(T.baja3[1] + 0.12); T.linterna = r2(T.quema + 0.18); T.camina3 = [r2(T.linterna), r2(T.linterna + 0.2)];
T.cae = r2(T.camina3[1] + 0.12); T.sube3 = [r2(T.cae + 0.18), r2(T.cae + 0.3), r2(T.cae + 0.6)]; T.no3 = r2(T.sube3[2] + 0.04);
// P6 · primer plano de Rubén con la caja de sombrero: Héctor "¿Te queda dulce de leche?" · se saca la caja, el casco con
// la linterna atada con cinta verde, clic · P6b la expedición en la sección: escalera tijera arriba de todo, se
// tambalea, la última caja del fondo, crash; arriba Héctor espera mirando el techo
T.p6 = r2(T.no3 + 0.42); T.entraH = [r2(T.p6 - 0.25), r2(T.p6 + 0.05)]; T.h1 = r2(T.p6 + 0.1);
T.sacaCaja = [r2(T.h1 + 0.4), r2(T.h1 + 0.7)]; T.casco = [r2(T.sacaCaja[1] + 0.05), r2(T.sacaCaja[1] + 0.3), r2(T.sacaCaja[1] + 0.55)];   // agarra, sube, calza
T.clic = r2(T.casco[2] + 0.06); T.p6b = r2(Math.max(T.clic + 0.25, T.h1 + LEN.h1 + 0.02)); T.chip4 = r2(T.p6b + 0.05);
T.baja4 = [T.p6b, r2(T.p6b + 0.3)]; T.tij4 = [r2(T.baja4[1]), r2(T.baja4[1] + 0.16), r2(T.baja4[1] + 0.4)];
T.tambalea = [r2(T.tij4[2]), r2(T.tij4[2] + 0.4)]; T.ultima = r2(T.tambalea[1]); T.crash = r2(T.ultima + 0.14);
T.bajaT4 = [r2(T.crash + 0.2), r2(T.crash + 0.36)]; T.sube4 = [r2(T.bajaT4[1] + 0.02), r2(T.bajaT4[1] + 0.14), r2(T.bajaT4[1] + 0.42)];
// P7 · grúa: Rubén asoma destruido y levanta el frasco: "Queda uno."
T.p7 = r2(T.sube4[2] + 0.02); T.asoma = [T.p7, r2(T.p7 + 0.26)]; T.trofeo = [r2(T.p7 + 0.3), r2(T.p7 + 0.5)]; T.r3 = r2(T.p7 + 0.45); T.tada = r2(T.trofeo[1] - 0.05);
// P8 · la pausa: el polvo que cae en el haz, la telaraña que se descuelga
T.p8 = r2(T.r3 + LEN.r3 + 0.08); T.descuelga = [r2(T.p8 + 0.12), r2(T.p8 + 0.62)];
// P9 · Héctor de frente: "Ah, no. Era para saber." (se toca la boina)
T.p9 = r2(T.p8 + 0.78); T.h2 = r2(T.p9 + 0.08); T.boina = r2(T.h2 + 1.1);
// P10 · hacia la puerta: Héctor se da vuelta: "¿Y yerba?" · Rubén cruza, le calza el casco y le prende la linterna
T.p10 = r2(T.h2 + LEN.h2 + 0.08); T.vaPuerta = [T.p10, r2(T.p10 + 0.4)]; T.h3 = r2(T.p10 + 0.48);
T.cruza = [r2(T.h3 + 0.25), r2(T.h3 + 0.72)]; T.sacaCasco = [r2(T.cruza[0] + 0.1), r2(T.cruza[1])];
T.calza = [r2(T.cruza[1] + 0.02), r2(T.cruza[1] + 0.32)]; T.clic2 = r2(T.calza[1] + 0.06); T.parpadea = [r2(T.clic2 + 0.06), r2(T.clic2 + 0.3)];
const P1 = r2(T.clic2 + 0.45);     // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.7);          // arranca la parte 2
// ---- parte 2 ----
// Q1 · el encuadre de P1: la trampa cerrada, Rubén sentado en el banquito arriba de ella, la tablet: "¿Te queda polenta?"
// (la misma toma) · mira la tablet: "Quedan tres."
T.q1 = P2; T.g1b = r2(P2 + 0.2); T.mira = r2(T.g1b + LEN.g1 - 0.15); T.fila = r2(T.mira + 0.12); T.r4 = r2(T.mira + 0.15);
// Q2 · hacia la puerta: entra Héctor con el casco puesto y la linterna prendida: "¿Y dulce de leche?" · "Doce."
T.q2 = r2(T.r4 + LEN.r4 + 0.1); T.entraH2 = [r2(T.q2 - 0.1), r2(T.q2 + 0.4)]; T.h4 = r2(T.q2 + 0.36); T.r5 = r2(T.h4 + LEN.h4 + 0.1);
// Q3 · Héctor: "Era para saber." · Q3b Rubén con el mate: "Ahora sabés."
T.q3 = r2(T.r5 + LEN.r5 + 0.08); T.h5 = r2(T.q3 + 0.05); T.q3b = r2(T.h5 + LEN.h5 + 0.06); T.r6 = r2(T.q3b + 0.05);
// Q4 · la tablet: vibra sola "Yerba · quedan 2" → "Pedido al proveedor ✓ · Llega el jueves" · chip "Viajes al depósito: 0"
T.q4 = r2(T.r6 + LEN.r6 + 0.06); T.vibra = r2(T.q4 + 0.1); T.pedido = r2(T.q4 + 0.55); T.chip0 = r2(T.q4 + 0.68);
// Q5 · la sección: Héctor, desconfiado, le hace seña a Rubén de que se corra, abre la trampa y baja él con la linterna;
// cuenta los frascos; se le cae una caja; chip "Viajes de Héctor: 1"; sube con la telaraña: pulgar arriba: "Doce."
T.q5 = r2(T.q4 + 1.25); T.sena = [T.q5, r2(T.q5 + 0.3)]; T.corre = [r2(T.q5 + 0.25), r2(T.q5 + 0.5)]; T.abreH = [r2(T.q5 + 0.5), r2(T.q5 + 0.72)];
T.bajaH = [r2(T.q5 + 0.72), r2(T.q5 + 1.0)]; T.cuenta = [r2(T.q5 + 1.04), r2(T.q5 + 1.4)]; T.caeH = r2(T.q5 + 1.44); T.chipH = r2(T.caeH + 0.06);
T.subeH = [r2(T.caeH + 0.12), r2(T.caeH + 0.42)]; T.h6 = r2(T.subeH[1] + 0.08);
// Q6 · Rubén levanta el mate (y la línea chica)
T.q6 = r2(T.h6 + LEN.h6 + 0.08); T.cierre = r2(T.q6 + 0.05);
const DUR = r2(T.cierre + 1.8);
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

const VOCES = ["g1", "r1", "r2", "w1", "m1", "h1", "r3", "h2", "h3", "r4", "h4", "r5", "h5", "r6", "h6"];
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin globos ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

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

// P1 · el gancho ES la burbuja de Graciela: en el cuadro 0 ya está entero y grande ("polenta" en el recuadro verde de
// selección); con la voz (0,25) late una vez. La cola baja hacia Graciela (abajo a la izquierda).
const GANCHO = { cola: 230, rot: -16 };
{
  const id = "s00-gancho", ini = 0, fin = r2(T.g1 + LEN.g1 + 0.2), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 70px; right: 70px; top: 150px; padding: 30px 36px 40px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 25% 100%; }
    P .tx { font: 900 140px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx">¿Te queda<br><span class="sel"><b></b><em>polenta?</em></span></div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.025, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${T.g1});
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -50, duration: 0.18, ease: "power2.in" }, ${r2(dur - 0.2)});`,
  });
}

// el chip "Viajes al depósito: N" (arriba a la izquierda): rojo apagado en la parte 1, el número salta con pop en cada
// vuelta de Rubén; en la parte 2 vuelve en verde con 0 y al final "Viajes de Héctor: 1"
function chip(id, ini, fin, pasos, { borde, tinta = CR, fondo = NAVY, texto }) {
  const dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .chip { position: absolute; left: 44px; top: 64px; padding: 14px 30px 18px; border-radius: 60px; background: ${fondo}; border: 7px solid ${borde}; box-shadow: 8px 10px 0 rgba(3,6,12,0.55); font: 800 50px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; color: ${tinta}; transform-origin: 20% 50%; white-space: nowrap; }
    P .n { display: inline-block; min-width: 0.7em; text-align: center; color: ${borde}; transform-origin: 50% 60%; }`,
    html: `      <div class="chip">${texto} <span class="n">${pasos[0][1]}</span></div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: "back.out(2.2)", immediateRender: true }, 0.0);
${pasos.slice(1).map(([t, n]) => `      tl.set(q(".n"), { textContent: "${n}" }, ${r2(t - ini)}); tl.fromTo(q(".n"), { scale: 1.9 }, { scale: 1, duration: 0.25, ease: "back.out(2.5)", immediateRender: false }, ${r2(t - ini)}); tl.fromTo(q(".chip"), { scale: 1.08 }, { scale: 1, duration: 0.2, ease: "power2.out", immediateRender: false }, ${r2(t - ini)});`).join("\n")}
      tl.set(q(".chip"), { opacity: 0 }, ${r2(dur - 0.02)});`,
  });
}
const RED = "#c7655b";
chip("s01-chip", T.chip1, P1, [[T.chip1, 1], [T.no2, 2], [T.no3, 3], [T.chip4, 4]], { borde: RED, texto: "Viajes al depósito:" });
chip("s06-chip0", T.chip0, T.chipH, [[T.chip0, 0]], { borde: G, texto: "Viajes al depósito:" });
chip("s07-chiph", T.chipH, T.q6, [[T.chipH, 1]], { borde: "#d9a441", texto: "Viajes de Héctor:" });

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

// la línea chica final (arriba): una línea y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 150px; padding: 26px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un sistema te dice qué te queda</div><div class="a">y te avisa antes de que se acabe</div><div class="b">scalerics.com</div></div>`,
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
const pasos = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo }); };
// las voces: en todas, duck de la música alrededor
const VOZ = [];
const voz = (f, t, db = -2) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.05), r2(t + LEN[f === "narrador" ? "nar" : f] + 0.3)]); };
// ---- parte 1 ----
const paso = (t, i, techo = -44) => s(`sfx/paso-${i % 5}.wav`, t, 0, { techo });
const madera = (a, b, n, techo = -42) => { for (let i = 0; i < n; i++) s(`sfx/k-footstep_wood_00${i % 4}.wav`, a + ((b - a) * i) / Math.max(1, n - 1), 0, { techo }); };
const carton = (t, i, techo = -38) => s(`sfx/k-impact_soft_heavy_00${i % 3}.wav`, t, 0, { techo });
// ambiente de almacén a la siesta (la calle por la puerta, con pasabajos) y el zumbido de la heladera, todo el reel
s("sfx/calle.wav", 0, -6, { loop: true, dur: r2(P1 + 0.1), fin: 0.3, techo: -44, lp: 1500 });
s("sfx/calle.wav", P2, -6, { loop: true, desde: 3, dur: r2(DUR - P2), fin: 0.5, techo: -44, lp: 1500 });
s("sfx/zumbido.wav", 0, 0, { dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -48, lp: 700 });
s("sfx/zumbido.wav", P2, 0, { dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -49, lp: 700 });
// la música (pizzicato, la firma de la línea): toda la parte 1; en la pausa baja ~12 dB en 0,4 s (NO se corta)
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -33, duck: [[T.p8 - 0.1, T.h2 + LEN.h2 + 0.1, 0.75]] });
s("sfx/campanita.wav", 0.02, 0, { techo: -46, dur: 0.6, fin: 0.25 });
voz("g1", T.g1, -2);
voz("r1", T.r1, -1);
s("sfx/madera-tabla.wav", T.va[0] + 0.02, 0, { techo: -44 });   // deja el mate en el mostrador
pasos(T.va[0] + 0.1, T.va[1], 3, -47);
s("sfx/k-metal-click.wav", T.abre[0], 0, { techo: -44 });          // la argolla
s("sfx/k-creak.wav", T.abre[0] + 0.05, 0, { techo: -44 });         // la bisagra
s("sfx/madera-golpe.wav", T.abre[1] - 0.02, 0, { techo: -45 });    // la tapa contra la pared
// P2 · la zambullida
s("sfx/whoosh.mp3", T.p2 - 0.04, 0, { techo: -40, dur: 0.6, fin: 0.2 });
madera(T.baja1[0] + 0.05, T.baja1[1] - 0.05, 4, -42);
s("sfx/k-metal-click.wav", T.cadena, 0, { techo: -40 });
s("sfx/interruptor.wav", T.luz - 0.02, 0, { techo: -40 });
s("sfx/zumbido.wav", T.luz, 0, { dur: r2(T.p3 - T.luz), fi: 0.05, fin: 0.1, techo: -46, lp: 2500 });   // el foco
s("sfx/k-impact_soft_medium_000.wav", T.agarra[1] - 0.04, 0, { techo: -42 });
for (let i = 0; i < 4; i++) s(`sfx/k-impact_soft_medium_00${i % 3}.wav`, T.sacude[0] + 0.05 + i * 0.12, 0, { techo: -40 });   // la caja vacía (cartón hueco)
// P3 · asoma, el polvo, el chip
s("sfx/whoosh-short.mp3", T.p3 - 0.04, 0, { techo: -44 });
madera(T.sube1[0], T.sube1[1], 2, -44);
voz("r2", T.r2, -1);
pop(T.chip1, -40);
s("sfx/k-cloth_2.wav", T.palmea[0], 0, { techo: -44 }); s("sfx/k-cloth_1.wav", T.palmea[0] + 0.17, 0, { techo: -45 });
// P4 · la sección (time-lapse): Walter, abajo, la tijera, la avalancha, sube, "No."
s("sfx/whoosh.mp3", T.p4 - 0.04, 0, { techo: -42, dur: 0.6, fin: 0.2 });
s("sfx/campanita.wav", T.entraW[0], 0, { techo: -48, dur: 0.5, fin: 0.25 });
voz("w1", T.w1, -2);
madera(T.baja2[0], T.baja2[1], 3, -45);
s("sfx/k-creak.wav", T.tij2[1], 0, { techo: -46, dur: 0.4, fin: 0.15 });
[0, 0.09, 0.17, 0.26].forEach((d, i) => carton(T.aval + d, i, i ? -38 : -36));
s("sfx/k-impact_wood_heavy_002.wav", T.aval + 0.3, 0, { techo: -40 });
madera(T.sube2[1], T.sube2[2], 3, -46);
pop(T.no2, -38);
// P5 · Marta, el foco que se quema, la linterna, la caja en la cabeza
s("sfx/whoosh-short.mp3", T.p5 - 0.04, 0, { techo: -46 });
s("sfx/campanita.wav", T.entraM[0], 0, { techo: -48, dur: 0.5, fin: 0.25 });
voz("m1", T.m1, -2);
madera(T.baja3[0], T.baja3[1], 3, -45);
s("sfx/k-impact_glass_light_000.wav", T.quema, 0, { techo: -36 });
s("sfx/interruptor2.wav", T.quema + 0.02, 0, { techo: -42 });
s("sfx/interruptor.wav", T.linterna, 0, { techo: -40 });
s("sfx/k-impact_soft_heavy_001.wav", T.cae, 0, { techo: -34 });   // la caja en la cabeza (golpe sordo)
madera(T.sube3[1], T.sube3[2], 3, -46);
pop(T.no3, -38);
// P6 · Héctor, la caja que sale, el casco, la linterna; la expedición
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -46 });
s("sfx/campanita.wav", T.entraH[0], 0, { techo: -47, dur: 0.5, fin: 0.25 });
voz("h1", T.h1, -2);
s("sfx/k-impact_soft_medium_001.wav", T.sacaCaja[1] - 0.03, 0, { techo: -44 });
s("sfx/k-cloth_1.wav", T.casco[0], 0, { techo: -46 });
s("sfx/k-impact_plank_medium_002.wav", T.casco[2] - 0.02, 0, { techo: -42 });   // el casco calzado
s("sfx/interruptor.wav", T.clic, 0, { techo: -38 });
s("sfx/whoosh.mp3", T.p6b - 0.04, 0, { techo: -42, dur: 0.6, fin: 0.2 });
pop(T.chip4, -40);
madera(T.baja4[0], T.baja4[1], 3, -45);
s("sfx/k-creak.wav", T.tij4[1], 0, { techo: -45, dur: 0.4, fin: 0.15 });
s("sfx/cruje.wav", T.tambalea[0], 0, { techo: -40 });        // la escalera que se tambalea
s("sfx/k-creak.wav", T.tambalea[0] + 0.2, 0, { techo: -41 });
[0, 0.08, 0.15, 0.24, 0.33].forEach((d, i) => carton(T.crash + d, i + 1, -37));
s("sfx/k-impact_wood_heavy_002.wav", T.crash + 0.05, 0, { techo: -36 });
madera(T.sube4[1], T.sube4[2], 3, -45);
// P7 · asoma con el frasco: un "ta-dá" chiquito de vibráfono
s("sfx/whoosh-short.mp3", T.p7 - 0.04, 0, { techo: -44 });
s("sfx/stinger.wav", T.tada, 0, { techo: -40, dur: 0.75, fin: 0.3 });
voz("r3", T.r3, -1);
// P8 · la pausa (la música baja; solo la heladera, la calle y un roce de la telaraña)
s("sfx/k-cloth_2.wav", T.descuelga[0], 0, { techo: -50 });
// P9 · "Ah, no. Era para saber."
s("sfx/whoosh-short.mp3", T.p9 - 0.04, 0, { techo: -50 });
voz("h2", T.h2, -2);
// P10 · la puerta, "¿Y yerba?", el casco que cambia de cabeza, clic seco
s("sfx/whoosh-short.mp3", T.p10 - 0.04, 0, { techo: -46 });
pasos(T.vaPuerta[0] + 0.05, T.vaPuerta[1], 3, -47);
voz("h3", T.h3, -2);
pasos(T.cruza[0] + 0.03, T.cruza[1], 3, -46);
s("sfx/k-cloth_1.wav", T.sacaCasco[0] + 0.1, 0, { techo: -46 });
s("sfx/k-impact_plank_medium_002.wav", T.calza[1] - 0.02, 0, { techo: -42 });
s("sfx/interruptor.wav", T.clic2, 0, { techo: -37 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -41, dur: 0.6, fin: 0.25 });
voz("narrador", P1 + 0.25, -4);
for (const d of [0.25, 0.45, 1.15, 1.75]) pop(P1 + d, -42);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -40 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -33 });
s("sfx/campanita.wav", P2 + 0.02, 0, { techo: -47, dur: 0.6, fin: 0.25 });
voz("g1", T.g1b, -2);
s("sfx/click-soft.mp3", T.fila - 0.02, 0, { techo: -42 });
voz("r4", T.r4, -1);
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -46 });
s("sfx/campanita.wav", T.entraH2[0], 0, { techo: -45, dur: 0.6, fin: 0.25 });
s("sfx/puerta-abre.wav", T.entraH2[0] - 0.05, 0, { techo: -47 });
pasos(T.entraH2[0] + 0.1, T.entraH2[1], 3, -47);
voz("h4", T.h4, -2);
voz("r5", T.r5, -1);
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -50 });
voz("h5", T.h5, -2);
s("sfx/whoosh-short.mp3", T.q3b - 0.04, 0, { techo: -50 });
voz("r6", T.r6, -1);
s("sfx/whoosh-short.mp3", T.q4 - 0.04, 0, { techo: -46 });
s("sfx/vibra.wav", T.vibra, 0, { dur: 0.45, fin: 0.08, techo: -38 });
s("sfx/notification.mp3", T.vibra + 0.06, 0, { techo: -40 });
s("sfx/cero.mp3", T.pedido, 0, { techo: -39 });
pop(T.chip0, -42);
s("sfx/whoosh.mp3", T.q5 - 0.04, 0, { techo: -44, dur: 0.6, fin: 0.2 });
s("sfx/k-creak.wav", T.abreH[0], 0, { techo: -42 });
s("sfx/madera-golpe.wav", T.abreH[1] - 0.02, 0, { techo: -44 });
madera(T.bajaH[0], T.bajaH[1], 3, -45);
for (let i = 0; i < 3; i++) s("sfx/click-soft.mp3", T.cuenta[0] + 0.05 + i * 0.12, 0, { techo: -48 });
carton(T.caeH, 2, -37);
pop(T.chipH, -40);
madera(T.subeH[0], T.subeH[1], 3, -46);
pop(T.h6 - 0.05, -42); voz("h6", T.h6, -1);
s("sfx/chime.mp3", T.cierre + 0.05, 0, { techo: -42, dur: 1.2, fin: 0.5 });
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
const IRIS_C = "700px 1150px";   // el iris se abre desde Rubén sentado en el banquito (Q1, el mismo encuadre de P1)
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
      <div id="precarga">Rubén</div><div id="precarga2">POLENTA</div>
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
