// Genera todo dice-cuarenta desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho del cuadro 0, el cartel "Un sistema más tarde…" y la
//     línea chica final); las burbujas de diálogo son 3D pegadas a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como la-lista y ya-lo-cargo) en UN solo proyecto: parte 1 (0 a P1), el cartel (P1 a
// P2, HTML debajo del canvas) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): r1 "El Excel dice cuarenta." ("cuarenta" +0,7) ·
// n1/n2/n3 "¡Vendido!" · n4 "Pero el Excel dice cuarenta." · r2 "El Excel nunca bajó al depósito." · n5 "Tranqui, ya lo
// actualicé." · r3 "Bárbaro. Ahora miente actualizado." ("Ahora" +1,0) · narrador · n6 "Rubén, ¿hay aceite?" · r4 "Fijate
// vos." · n7 "¡Vendido!" (la misma toma que n1) · n8 "¿Y? ¿Cuántos hay?" · r5 "Los que dice."
const LEN = { r1: 1.43, n1: 0.7, n2: 0.7, n3: 0.74, n4: 1.61, r2: 1.78, n5: 1.87, r3: 2.46, nar: 2.26, n6: 1.52, r4: 1.11, n7: 0.7, n8: 0.98, r5: 0.88 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el depósito desde el pasillo; Nico (burbuja muda "Rubén, ¿hay aceite? Graciela quiere 40.") y Rubén
// arriba en la oficina: "El Excel dice cuarenta." (el gancho); en "cuarenta" baja el cartel "40" colgado de cadenas
T.r1 = 0.2; T.cartel = r2(T.r1 + 0.72); T.gancho = r2(T.r1 + LEN.r1 + 0.08);
T.n1 = r2(T.gancho + 0.04); T.rem = [[r2(T.n1 + 0.42), r2(T.n1 + 0.66)]];         // el remito GRACIELA vuela y se clava
// P2 · la ráfaga: Nico camina por el pasillo con el celular; Marta, ¡Vendido!, Walter, ¡Vendido!
T.p2 = r2(T.rem[0][1] + 0.12);
T.marta = r2(T.p2 + 0.1); T.mira1 = r2(T.marta + 0.35); T.n2 = r2(T.marta + 0.55); T.rem.push([r2(T.n2 + 0.35), r2(T.n2 + 0.55)]);
T.walter = r2(T.n2 + 0.75); T.n3 = r2(T.walter + 0.45); T.rem.push([r2(T.n3 + 0.35), r2(T.n3 + 0.55)]);
T.camina = [T.p2, r2(T.n3 + 0.5)];
// P2b · inserto del parante: los tres remitos clavados y, arriba, el 40 que no se movió
T.p2b = r2(T.rem[2][1] + 0.15);
// P3 · el camión entra al muelle, el operario con la zorra; la grúa baja del 40 al pallet: tres cajas
T.p3 = r2(T.p2b + 0.7); T.camion = [T.p3, r2(T.p3 + 0.75)]; T.freno = r2(T.p3 + 0.72);
T.zorra = [r2(T.p3 + 0.15), r2(T.p3 + 1.25)]; T.grua = [r2(T.p3 + 0.55), r2(T.p3 + 1.9)]; T.rojo = r2(T.p3 + 1.75);
// P4 · la pausa: Rubén (bajó con el mate), Nico y el operario en fila; miran las cajas, el 40, las cajas; la paloma
T.p4 = r2(T.p3 + 2.1); T.miran = [r2(T.p4 + 0.15), r2(T.p4 + 0.65), r2(T.p4 + 1.2)]; T.paloma = [r2(T.p4 + 0.3), r2(T.p4 + 1.5)];
// P5 · "Pero el Excel dice cuarenta." · Rubén gira la cabeza · "El Excel nunca bajó al depósito."
T.p5 = r2(T.p4 + 1.6); T.n4 = r2(T.p5 + 0.1); T.gira = [r2(T.n4 + LEN.n4 + 0.03), r2(T.n4 + LEN.n4 + 0.4)]; T.r2 = r2(T.gira[1] + 0.05);
// P6 · el operario carga las 3 cajas y se va · "Tranqui, ya lo actualicé." · el cartel gira a 37 (rojo) · "Bárbaro.
// Ahora miente actualizado." · mate
T.p6 = r2(T.r2 + LEN.r2 + 0.1); T.cajas = [0.05, 0.25, 0.45].map((d) => r2(T.p6 + d)); T.seVa = [r2(T.p6 + 0.65), r2(T.p6 + 1.25)];
T.n5 = r2(T.p6 + 0.6); T.toca = r2(T.n5 + LEN.n5 - 0.25); T.flip37 = r2(T.n5 + LEN.n5 + 0.06);
T.mira37 = r2(T.flip37 + 0.4); T.miraPal = r2(T.flip37 + 0.7); T.r3 = r2(T.flip37 + 0.9);
T.sorbo1 = r2(T.r3 + LEN.r3 + 0.08);
const P1 = r2(T.sorbo1 + 0.55);   // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.5);          // arranca la parte 2
// ---- parte 2 ----
// Q1 · el encuadre de P1, el cartel verde: "Rubén, ¿hay aceite?" · Rubén señala con la bombilla: "Fijate vos."
T.q1 = P2; T.n6 = r2(P2 + 0.2); T.senala = r2(T.n6 + LEN.n6 - 0.1); T.r4 = r2(T.n6 + LEN.n6 + 0.08);
// Q1b · inserto del celular de Nico: "Aceite 1,5 L x 12 · En depósito 40 ✓" · "¡Vendido!"
T.q1b = r2(T.r4 + LEN.r4 + 0.05); T.ok = r2(T.q1b + 0.12); T.n7 = r2(T.q1b + 0.35);
// Q2 · el operario escanea cada capa (bip): el cartel baja 40 → 30 → 20 → 10; en 10 parpadea y sale el aviso
T.q2 = r2(T.n7 + LEN.n7 + 0.05); T.capas = [0.15, 0.5, 0.85].map((d) => r2(T.q2 + d)); T.parpadea = r2(T.capas[2] + 0.25); T.aviso = r2(T.parpadea + 0.15);
// Q2b · inserto del monitor de Rubén: "Aceite: quedan 10 · ¿Pedimos 40?" · Pedir ✓
T.q2b = r2(T.aviso + 0.2); T.pedir = r2(T.q2b + 0.42); T.pedido = r2(T.pedir + 0.1);
// Q2c · la última capa (0) · el autoelevador deja el pallet nuevo: 40
T.q2c = r2(T.pedido + 0.25); T.capa4 = r2(T.q2c + 0.1); T.elev = [r2(T.q2c + 0.15), r2(T.q2c + 0.8)]; T.lleno = r2(T.elev[1] + 0.05);
// Q3 · Rubén frente al pallet nuevo: saca una caja (39), la pone (40) · "¿Y? ¿Cuántos hay?" · "Los que dice." · mate
T.q3 = r2(T.lleno + 0.2); T.saca = [r2(T.q3 + 0.1), r2(T.q3 + 0.35)]; T.f39 = r2(T.saca[1]); T.pone = [r2(T.q3 + 0.65), r2(T.q3 + 0.9)]; T.f40 = r2(T.pone[1]);
T.n8 = r2(T.pone[1] + 0.2); T.r5 = r2(T.n8 + LEN.n8 + 0.1); T.cierre = r2(T.r5 + 0.45); T.sorbo2 = r2(T.r5 + LEN.r5 + 0.12);
const DUR = r2(T.cierre + 2.05);
// el cartel del número: [t, "valor"] (cada cambio gira como un marcador de aeropuerto, un dígito por paso de FLAP s)
T.cartelK = [[0, "40"], [T.flip37, "37"], [P1 + 0.1, "40"], ...T.capas.map((t, i) => [t + 0.08, String(30 - i * 10)]), [T.capa4 + 0.08, " 0"], [T.lleno, "40"], [T.f39, "39"], [T.f40, "40"]];

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
const VOCES = ["r1", "n1", "n2", "n3", "n4", "r2", "n5", "r3", "n6", "r4", "n7", "n8", "r5"];
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


// P1 · el gancho: la burbuja de Rubén (desde la oficina), entera y grande desde el cuadro 0 ("cuarenta." en el recuadro
// verde de selección); con la voz late una vez; la cola baja hacia la oficina. Se va al terminar la frase.
const GANCHO = { cola: 640, rot: 8 };
{
  const id = "s00-gancho", ini = 0, dur = r2(T.gancho + 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 60px; right: 60px; top: 110px; padding: 30px 30px 40px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 62% 100%; }
    P .tx { font: 900 128px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; }
    P .sel b { position: absolute; inset: 8px 0 -4px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx">El Excel dice</div><div class="tx"><span class="sel"><b></b><em>cuarenta.</em></span></div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.035, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(T.cartel - 0.05)});
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -50, duration: 0.15, ease: "power2.in" }, ${r2(dur - 0.16)});`,
  });
}

// el cartel "Un sistema más tarde…" (el de ya-lo-cargo, mismo texto y misma toma de Rasalgethi). Va DEBAJO del
// canvas. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.035)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
  // el narrador va en P1 + 0,15 (Un 0,15 · sistema 0,35 · más 1,05 · tarde 1,65)
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 140px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 140px; margin-top: 22px; }
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
        ${lin("a", [["Un", 0.0], ["sistema", 0.3]])}
        ${lin("b", [["más", 0.95], ["tarde…", 1.55]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: 0.85, y: 30, rotation: (i % 2 ? 1 : -1) * 5 }, { scale: 1, y: 0, rotation: 0, duration: 0.28, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 5; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (4 + (i % 3) * 2), rotation: s * (i % 2 ? 1.5 : -1.5), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.3 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.45)});   // se va antes de que abra el iris`,
  });
}

// la línea chica final (abajo, sobre el piso del depósito): una línea y la web. Sin tarjeta de videollamada.
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1480px; padding: 24px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 60px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 74px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un sistema de stock</div><div class="a">a medida</div><div class="b">scalerics.com</div></div>`,
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
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f === "narrador" ? "nar" : f] + 0.7)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
// el marcador de aeropuerto: un tic por paleta que cae (3 tics de Kenney que se alternan) + un roce de hoja al final
const FLAP = 0.07;
function pasosFlap(de, a) {
  const D = " 0123456789"; let n = 0;
  for (let i = 0; i < 2; i++) {
    if (de[i] === " " || a[i] === " ") n = Math.max(n, de[i] === a[i] ? 0 : 1);
    else { const f = (Number(a[i]) - Number(de[i]) + 10) % 10; n = Math.max(n, f <= 5 ? f : 10 - f); }
  }
  return Math.max(1, n);
}
const flap = (t, de, a, techo = -38) => {
  const n = pasosFlap(de, a);
  for (let i = 0; i < n; i++) s(["sfx/k-tick-1.wav", "sfx/k-tick-4.wav", "sfx/k-tick-2.wav"][i % 3], t + i * FLAP, 0, { techo, vel: 0.9 + (i % 2) * 0.12 });
  s("sfx/k-page-turn.wav", t + n * FLAP - 0.05, 0, { techo: techo - 4, vel: 1.25, dur: 0.25, fin: 0.08 });
};
const cadenas = (t, techo = -40) => { s("sfx/k-metal-liviano-2.wav", t, 0, { techo, vel: 1.25, hp: 400 }); s("sfx/k-metal-click.wav", t + 0.09, 0, { techo: techo - 4, vel: 1.4 }); };
const grampa = (t, k, techo = -38) => { s("sfx/whoosh-short.mp3", t - 0.2, 0, { techo: techo - 6, vel: 1.1 }); s("sfx/k-metal-click.wav", t, 0, { techo, vel: 1.0 + k * 0.08 }); s("sfx/k-plato-001.wav", t + 0.01, 0, { techo: techo - 8, vel: 1.4 + k * 0.1, hp: 600 }); };
const bip = (t, techo = -38) => s("sfx/k-tono.wav", t, 0, { dur: 0.12, fin: 0.03, techo, vel: 1.35, hp: 500 });
const caja = (t, techo = -40, vel = 1) => s("sfx/madera-golpe.wav", t, 0, { techo, vel, lp: 1800 });
// ---- parte 1 ----
// ambiente: el zumbido del depósito de día (pasabajos); la música (pizzicato): baja en la pausa (NO se corta)
s("sfx/zumbido-largo.wav", 0, 0, { dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -46, lp: 900 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -33, duck: [[T.p4 - 0.1, T.p5 + 0.2, 0.78], [T.r2 - 0.3, T.r2 + LEN.r2 + 0.2, 0.55], [T.flip37 - 0.1, P1 + 0.2, 0.55]] });
// P1 · el cartel baja (pop + cadenas), "¡Vendido!", el remito vuela y se clava
voz("r1", T.r1, -1);
pop(T.cartel - 0.02, -38); cadenas(T.cartel + 0.05, -38);
voz("n1", T.n1, -1);
grampa(T.rem[0][1], 0, -38);
// P2 · la ráfaga: pop + notificación por burbuja, "¡Vendido!", whoosh + grampa por remito (cada uno más agudo), pasos
s("sfx/whoosh-short.mp3", T.p2 - 0.04, 0, { techo: -48 });
pasos(T.camina[0] + 0.05, T.camina[1], 6, -46);
for (const t of [T.marta, T.walter]) { pop(t - 0.02, -40); s("sfx/notification.mp3", t, 0, { techo: -44, dur: 0.35, fin: 0.12 }); }
voz("n2", T.n2, -1); grampa(T.rem[1][1], 1, -37);
voz("n3", T.n3, -1); grampa(T.rem[2][1], 2, -36);
s("sfx/whoosh-short.mp3", T.p2b - 0.04, 0, { techo: -46 });
// P3 · el camión entra al muelle (motor grave + freno de aire), la zorra rodando, la grúa (whoosh lento), remitos rojos
s("sfx/motor.mp3", T.camion[0] - 0.05, 0, { desde: 0.5, dur: r2(T.camion[1] - T.camion[0] + 0.2), fi: 0.15, fin: 0.25, techo: -40, vel: 0.72, lp: 1500 });
s("sfx/k-neumatico-abre.wav", T.freno, 0, { techo: -42, lp: 2500, vel: 1.2, dur: 0.35, fin: 0.12 });
s("sfx/k-plastico.wav", T.zorra[0] + 0.1, 0, { techo: -46, vel: 0.6, lp: 1200 });
s("sfx/k-plastico.wav", T.zorra[0] + 0.55, 0, { techo: -48, vel: 0.55, lp: 1200 });
s("sfx/whoosh.mp3", T.grua[0], 0, { techo: -46, vel: 0.8, dur: 0.9, fin: 0.3 });
s("sfx/k-metal-click.wav", T.rojo, 0, { techo: -46, vel: 0.8 });
// P4 · la pausa: el zumbido solo, la música abajo; la paloma (aleteos de tela, Kenney) que cruza
s("sfx/whoosh-short.mp3", T.p4 - 0.04, 0, { techo: -52 });
[0, 0.16, 0.3, 0.46, 0.62, 0.8].forEach((d, i) => s(`sfx/k-ala-${[1, 3, 4][i % 3]}.wav`, T.paloma[0] + d, 0, { techo: -44 - (i > 3 ? 3 : 0), vel: 1.35, hp: 300, dur: 0.22, fin: 0.06 }));
// P5 · "Pero el Excel dice cuarenta." · Rubén gira · "El Excel nunca bajó al depósito."
s("sfx/whoosh-short.mp3", T.p5 - 0.04, 0, { techo: -52 });
voz("n4", T.n4, -1);
s("sfx/k-cloth_1.wav", T.gira[0], 0, { techo: -48, dur: 0.3, fin: 0.1 });
voz("r2", T.r2, -1);
// P6 · las 3 cajas a la zorra, la zorra que se va, el toque del celular, el marcador que gira a 37, "Bárbaro…", el sorbo
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -52 });
T.cajas.forEach((t, i) => caja(t + 0.12, -40, 1 + i * 0.08));
s("sfx/k-plastico.wav", T.seVa[0], 0, { techo: -48, vel: 0.6, lp: 1200 });
voz("n5", T.n5, -1);
s("sfx/key-press.mp3", T.toca, 0, { techo: -44 });
flap(T.flip37, "40", "37", -36); cadenas(T.flip37 + 0.05, -42);
voz("r3", T.r3, -1);
s("sfx/sorbo.wav", T.sorbo1, 0, { techo: -40, fin: 0.15 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.15, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.15 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.0, 0.3, 0.95, 1.55]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -33, duck: [[T.q3, DUR + 1, 0.3]] });
s("sfx/zumbido-largo.wav", P2, 0, { desde: 30, dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -47, lp: 900 });
voz("n6", T.n6, -1);
s("sfx/k-cloth_2.wav", T.senala - 0.1, 0, { techo: -50, dur: 0.3, fin: 0.1 });
voz("r4", T.r4, -1);
s("sfx/whoosh-short.mp3", T.q1b - 0.04, 0, { techo: -48 });
s("sfx/cero.mp3", T.ok, 0, { techo: -40 });
voz("n7", T.n7, -1);
// Q2 · bip por capa + el marcador que baja; en 10 parpadea (dos dings) y vuela el aviso
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -50 });
T.capas.forEach((t, i) => { bip(t, -38); caja(t + 0.12, -44, 1.1); flap(t + 0.08, ["40", "30", "20"][i], ["30", "20", "10"][i], -38); });
s("sfx/campanita.wav", T.parpadea, 0, { techo: -42, dur: 0.5, fin: 0.2 });
s("sfx/whoosh-short.mp3", T.aviso, 0, { techo: -44, vel: 1.1 });
// Q2b · el aviso en el monitor, Pedir ✓
s("sfx/notification.mp3", T.q2b + 0.05, 0, { techo: -44, dur: 0.35, fin: 0.12 });
s("sfx/click-soft.mp3", T.pedir, 0, { techo: -40 });
s("sfx/cero.mp3", T.pedido, 0, { techo: -40 });
// Q2c · la última capa (0), el autoelevador (motor eléctrico + hidráulico) y el pallet nuevo al piso (40)
s("sfx/whoosh-short.mp3", T.q2c - 0.04, 0, { techo: -50 });
bip(T.capa4, -40); flap(T.capa4 + 0.08, "10", " 0", -40);
s("sfx/k-motor-bajo.wav", T.q2c, 0, { dur: r2(T.elev[1] - T.q2c + 0.2), fi: 0.05, fin: 0.2, techo: -44, lp: 1400 });
s("sfx/k-neumatico-abre.wav", T.elev[0] + 0.15, 0, { techo: -44, lp: 1200, vel: 0.75, dur: 0.5, fin: 0.15 });
s("sfx/madera-tabla.wav", T.elev[1] - 0.02, 0, { techo: -38, vel: 0.9, lp: 2000 });
flap(T.lleno, " 0", "40", -38);
// Q3 · la caja que sale (39) y vuelve (40), "¿Y? ¿Cuántos hay?", "Los que dice.", el sorbo, la línea chica
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -52 });
s("sfx/k-cloth_1.wav", T.saca[0], 0, { techo: -48, dur: 0.3, fin: 0.1 });
bip(T.f39 - 0.05, -40); flap(T.f39, "40", "39", -40);
caja(T.pone[1] - 0.03, -42, 0.95); bip(T.f40 - 0.05, -40); flap(T.f40, "39", "40", -40);
voz("n8", T.n8, -1);
voz("r5", T.r5, -1);
s("sfx/sorbo.wav", T.sorbo2, 0, { techo: -40, fin: 0.15 });
pop(T.cierre + 0.05, -44);
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }

// SFX: copias que terminan con la ventana de cada efecto (el archivo que no existe en assets falla acá, no en el render)
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
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, (o.techo ?? TECHO) - L.M, (o.pico ?? PICO) - L.pk)); };
function mezcla(lista, salida, dur) {
  const args = ["-y", "-loglevel", "error"];
  const filtros = [];
  lista.forEach((x, i) => {
    const [f, ini, , o] = x;
    if (o.loop) args.push("-stream_loop", "-1");   // (ronda 5) loop sin fin: el zumbido (8 s) se cortaba a los 24 s
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
const IRIS_C = "540px 1250px";   // el iris se abre desde el celular de Nico (Q1, el encuadre de P1)
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "Plex"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
      #precarga2 { position: absolute; left: -9999px; font: 600 40px "Plex"; }
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
      <div id="precarga">Rubén</div><div id="precarga2">GRACIELA</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Nico
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});   // (el iris: ver abajo)
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(T));
