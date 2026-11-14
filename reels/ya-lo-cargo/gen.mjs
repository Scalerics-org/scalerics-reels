// Genera todo ya-lo-cargo desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho-burbuja de Nico en P1, el cartel "Un sistema más tarde…",
//     la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como anotamelo y te-queda) en UN solo proyecto: parte 1 (0 a P1), el cartel (P1 a P2,
// HTML debajo del canvas) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana, globos ni rótulos (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, recortadas; tomas en partes/voces.md): n1 0,74 ("cargo." +0,2) · m1 1,63 ("azúcar" +1,0) · n2 0,79
// · g1 1,50 ("Rubén," 0 · "¿y mi harina?" +0,84) · r1 2,20 ("carga" +0,7 · "Nico" +1,0 · "es el celular." +1,3) · r2 0,94
// (con la cola del galpón; la palabra 0,3) · n3 0,76 · r3 0,77 ("cargué." +0,3) · n4 1,96 (ahogada; "Ya lo cargo." +0,6) ·
// narrador 2,26 · n5 0,43 ("Ya lo car…") · n6 1,63 ("Rubén," 0 · "¿lo de Graciela?" +0,58) · r4 0,65
const LEN = { n1: 0.74, m1: 1.63, n2: 0.79, g1: 1.5, r1: 2.2, r2: 0.94, n3: 0.76, r3: 0.77, n4: 1.71, nar: 2.26, n5: 0.43, n6: 1.63, r4: 0.65 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: la rotisería. Graciela (detrás del mostrador) ya dictó; Nico: "Ya lo cargo." · pulgar · del celular sale
// el globo "40 harina · lunes" y se infla
T.n1 = 0.3; T.pulgar = [0.75, 1.0]; T.globo1 = 1.0;
// P1b · la vereda: Nico sale con el globo atrás, abre la puerta del acompañante y lo mete apretado; cierra
T.p1b = 1.72; T.sale = [1.45, 2.05]; T.abre = [2.05, 2.25]; T.mete = [2.2, 2.5]; T.cierra = 2.55;
// P2 · la ronda: travelling por la calle. Paradas: [llega (frena), sale]
T.p2 = 2.7;
T.paradas = [[2.95, 5.5], [5.75, 6.15], [6.35, 6.75], [6.95, 7.1], [7.25, 7.4], [7.55, 7.7]];
T.m1 = 3.0; T.n2 = r2(T.m1 + LEN.m1 + 0.05);
// burbujas mudas del bar y del kiosco: [pregunta, "Ya lo cargo."]
T.bar = [5.8, 5.98]; T.kio = [6.4, 6.58];
// cuándo aparece cada globo de chat en el auto (0 = el de Graciela, ya adentro)
T.globos = [T.mete[1], r2(T.n2 + 0.35), 6.08, 6.68, 7.12, 7.42, 7.72];
T.lleno = 7.9;                                  // los globos se aplastan contra los vidrios; el cachete de Nico
T.p3 = 8.4;                                     // la transición: el último globo tapa la lente y se destapa en el depósito
// P3 · el depósito (lunes): grúa desde el piso hasta el ventanal de la oficina; el teléfono; "Rubén, ¿y mi harina?"
T.grua = [T.p3, r2(T.p3 + 0.85)]; T.ring = r2(T.p3 + 0.9); T.altavoz = r2(T.p3 + 1.15); T.g1 = r2(T.p3 + 1.25);
// P4 · el monitor (ninguno) · por encima del hombro: entra el auto lleno · "Lo único que carga Nico es el celular." · inserto
// del tablero (100 %)
T.p4 = r2(T.g1 + 1.1); T.ninguno = r2(T.p4 + 0.15);
T.p4b = r2(T.p4 + 0.6); T.entra = [T.p4b, r2(T.p4b + 1.1)]; T.r1 = r2(T.p4b + 0.1);
T.p4c = r2(T.r1 + 1.2);                          // inserto del tablero (el celular cargando, 100 %) sobre "es el celular."
T.p5 = r2(T.r1 + LEN.r1 + 0.1);
// P5 · Rubén en la baranda: "¡Nico!" · contraplano desde el auto: baja la ventanilla, asoma un globo: "¡Ya lo cargo!"
T.r2 = r2(T.p5 + 0.15); T.p5b = r2(T.r2 + 0.5); T.ventanilla = [T.p5b, r2(T.p5b + 0.22)]; T.n3 = r2(T.p5b + 0.2);
// P6 · la pausa: el bip del autoelevador, Rubén deja el mate en la baranda
T.p6 = r2(T.n3 + LEN.n3 + 0.08); T.bips = [r2(T.p6 + 0.1), r2(T.p6 + 0.5), r2(T.p6 + 0.9)]; T.mateBaranda = r2(T.p6 + 0.55);
// P7 · el remate: el autoelevador (Rubén) levanta el auto con Nico adentro, sube la rampa y lo mete en el camión
T.p7 = r2(T.p6 + 1.0); T.levanta = [r2(T.p7 + 0.05), r2(T.p7 + 0.35)]; T.viaje = [r2(T.p7 + 0.35), r2(T.p7 + 0.95)];
T.adentro = [r2(T.p7 + 0.95), r2(T.p7 + 1.2)]; T.r3 = r2(T.p7 + 1.25); T.puertas = [r2(T.r3 + LEN.r3 + 0.05), r2(T.r3 + LEN.r3 + 0.22)];
// P8 · remate del remate: las puertas cerradas; adentro suena un celular: "Sí, sí. Ya lo cargo." (ahogado); dos palmadas
T.p8 = r2(T.puertas[0] - 0.02); T.ringCel = r2(T.p8 + 0.05); T.n4 = r2(T.p8 + 0.25);
T.palmadas = [r2(T.n4 + LEN.n4 + 0.02), r2(T.n4 + LEN.n4 + 0.22)]; T.arranca = r2(T.palmadas[1] + 0.12);
const P1 = r2(T.arranca + 0.7);   // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.5);           // arranca la parte 2
// ---- parte 2 ----
// Q1 · el encuadre de P1: dos toques al celular; "Ya lo car…" y antes de que termine, ding: la tarjeta verde "Cargado ✓"
// vuela por la vidriera
T.q1 = P2; T.toques = [r2(P2 + 0.25), r2(P2 + 0.45)]; T.n5 = r2(P2 + 0.6); T.ding = r2(T.n5 + 0.38); T.vuela = [r2(T.ding + 0.05), r2(T.ding + 0.5)];
// Q2 · el viaje del pedido: la tarjeta por la misma calle (sin globos) · entra al depósito y se parte en dos · el pallet
// GRACIELA se tilda y el operario apila cuatro bolsas · Q2b la otra mitad sube al monitor: la ficha de Graciela
T.q2 = T.vuela[1]; T.q2w = r2(T.q2 + 0.75); T.parte = r2(T.q2w + 0.3); T.tilde = r2(T.parte + 0.25);
T.bolsas = [0, 0.15, 0.3, 0.45].map((d) => r2(T.tilde + 0.12 + d));
T.q2b = r2(T.bolsas[3] + 0.3); T.ficha = r2(T.q2b + 0.3);
// Q3 · "Ya salió.": Rubén en el autoelevador mete el pallet de harina en el camión; entra el auto de Nico, limpio:
// "Rubén, ¿lo de Graciela?" · la horquilla empuja la puerta (remito con tilde) · "Ya salió."
T.q3 = r2(T.ficha + 0.5); T.pallet = [T.q3, r2(T.q3 + 0.75)]; T.entra2 = [r2(T.q3 + 0.3), r2(T.q3 + 0.9)];
T.n6 = r2(T.q3 + 0.9); T.puerta2 = [r2(T.n6 + LEN.n6 - 0.15), r2(T.n6 + LEN.n6 + 0.1)]; T.r4 = r2(T.n6 + LEN.n6 + 0.12);
// Q4 · cierre: el camión sale; pulgar de Nico; Rubén gira el autoelevador y levanta un poquito las horquillas (bip, bip);
// Nico pone marcha atrás y se va · la línea chica
T.q4 = r2(T.r4 + LEN.r4 + 0.1); T.sale2 = [T.q4, r2(T.q4 + 0.9)]; T.pulgar2 = r2(T.q4 + 0.1);
T.horquillas = [r2(T.q4 + 0.45), r2(T.q4 + 0.85)]; T.atras = [r2(T.q4 + 1.0), r2(T.q4 + 1.6)];
T.cierre = r2(T.q4 + 0.3);
const DUR = r2(T.cierre + 1.6);

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
const VOCES = ["n1", "m1", "n2", "g1", "r1", "r2", "n3", "r3", "n4", "n5", "n6", "r4"];
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin globos ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

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

// P1 · el gancho ES la burbuja de Nico: en el cuadro 0 ya está entero y grande ("cargo." en el recuadro verde de
// selección); con la voz late una vez. La cola baja hacia Nico (abajo a la izquierda).
const GANCHO = { cola: 420, rot: 10 };
{
  const id = "s00-gancho", ini = 0, fin = r2(T.globo1 + 0.15), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 80px; right: 80px; top: 120px; padding: 34px 36px 44px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 22% 100%; }
    P .tx { font: 900 146px/1.06 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: 8px 0 -4px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .cola { position: absolute; left: ${GANCHO.cola}px; bottom: -86px; width: 0; height: 0; border-left: 46px solid transparent; border-right: 46px solid transparent; border-top: 90px solid ${NAVY}; transform: rotate(${GANCHO.rot}deg); transform-origin: 50% 0; }
    P .cola::after { content: ""; position: absolute; left: -30px; top: -98px; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 62px solid ${CR}; }`,
    html: `      <div class="glo"><div class="tx">Ya lo <span class="sel"><b></b><em>cargo.</em></span></div><div class="cola"></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.035, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${T.n1});
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -50, duration: 0.15, ease: "power2.in" }, ${r2(dur - 0.16)});`,
  });
}

// el cartel "Un sistema más tarde…" (el de anotamelo, mismo texto). Va DEBAJO del canvas. No dice "Scalerics".
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
        tl.fromTo(l, { scale: 0.6, y: 50, rotation: (i % 2 ? 1 : -1) * 18 }, { scale: 1, y: 0, rotation: 0, duration: 0.28, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 5; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.3 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.22)});`,
  });
}

// la línea chica final (arriba, sobre el techo del depósito): una línea y la web. Sin tarjeta de videollamada.
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 190px; padding: 26px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 56px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 72px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">El vendedor lo carga en la calle</div><div class="a">y entra al depósito y a la ficha</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
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
const pop = (t, techo = -38) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const pasos = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo }); };
const bip = (t, techo = -37) => s("sfx/k-tono.wav", t, 0, { dur: 0.3, fin: 0.08, techo, vel: 0.92 });
const inflado = (t, i = 0, techo = -42) => { s("sfx/k-plastico.wav", t, 0, { techo: techo - 2, vel: 0.8 + i * 0.06 }); pop(t + 0.04, techo + 2); };
const motor = (t, dur, techo = -42, vel = 1) => s("sfx/motor.mp3", t, 0, { desde: 0.5, dur, fi: 0.08, fin: Math.min(0.3, dur / 2), techo, vel, lp: 2400 });
const freno = (t, techo = -46) => s("sfx/k-creak.wav", t, 0, { dur: 0.35, fin: 0.12, techo, vel: 1.25 });
const VOZ = [];
const voz = (f, t, db = -2) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.45), r2(t + LEN[f === "narrador" ? "nar" : f] + 0.45)]); };
// ---- parte 1 ----
// ambiente: la calle de mediodía (P1 adentro con pasabajos, P1b y P2 abierto); el depósito con el zumbido de luminarias
s("sfx/calle.wav", 0, -6, { dur: T.p1b, fin: 0.1, techo: -44, lp: 1500 });
s("sfx/calle.wav", T.p1b, -6, { desde: 2, dur: r2(T.p3 - T.p1b), fin: 0.3, techo: -40 });
s("sfx/zumbido.wav", T.p3, 0, { loop: true, dur: r2(P1 - T.p3 + 0.1), fi: 0.1, fin: 0.3, techo: -46, lp: 900 });
// la música (pizzicato, la firma de la línea): toda la parte 1; en la pausa baja a -12 dB en 0,4 s (NO se corta)
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -33, duck: [[T.p6 - 0.1, T.r3 + LEN.r3 + 0.1, 0.75]] });
// P1 · el gancho, el globo que se infla
voz("n1", T.n1, -2);
s("sfx/k-cloth_2.wav", T.pulgar[0], 0, { techo: -48 });
inflado(T.globo1, 0, -40);
// P1b · la vereda: pasos, la puerta del auto, el globo que entra apretado
s("sfx/whoosh-short.mp3", T.p1b - 0.04, 0, { techo: -46 });
pasos(T.sale[0] + 0.05, T.sale[1], 4, -45);
s("sfx/k-metal-click.wav", T.abre[0], 0, { techo: -42 });
s("sfx/k-plastico.wav", T.mete[0] + 0.1, 0, { techo: -44, vel: 0.7 });
s("sfx/k-cloth_1.wav", T.mete[0] + 0.12, 0, { techo: -46, dur: 0.3, fin: 0.1 });
s("sfx/k-metal-liviano-2.wav", T.cierra, 0, { techo: -38 });
// P2 · la ronda: el motor del auto entre paradas, freno, voces, burbujas, globos
s("sfx/whoosh-short.mp3", T.p2 - 0.04, 0, { techo: -46 });
motor(T.p2, 0.3, -43);
T.paradas.forEach(([a, b], i) => { freno(a - 0.08, i < 2 ? -46 : -48); if (i < T.paradas.length - 1) motor(b, Math.max(0.2, T.paradas[i + 1][0] - b), -44, 1 + i * 0.03); });
pop(T.m1 - 0.02); voz("m1", T.m1, -3);
pop(T.n2 - 0.02); voz("n2", T.n2, -2);
for (const t of [...T.bar, ...T.kio]) pop(t - 0.02, -40);
T.globos.slice(1).forEach((t, i) => inflado(t, i + 1, -42));
for (const t of [T.paradas[3][0], T.paradas[4][0], T.paradas[5][0]]) pop(t + 0.02, -42);   // las burbujas "Ya lo cargo." de la ráfaga
s("sfx/k-cloth_1.wav", T.lleno - 0.05, 0, { techo: -42, dur: 0.4, fin: 0.12 });
s("sfx/k-plastico.wav", T.lleno, 0, { techo: -42, vel: 0.6 });
s("sfx/k-plastico.wav", T.lleno + 0.12, 0, { techo: -44, vel: 0.55 });
// P3 · la transición del globo, el depósito, la grúa, el teléfono de escritorio (dos tonos, real CC0), el altavoz
s("sfx/whoosh.mp3", T.p3 - 0.2, 0, { techo: -40, dur: 0.6, fin: 0.2 });
s("sfx/whoosh-short.mp3", T.grua[0] + 0.3, 0, { techo: -48 });
for (const d of [0, 0.32]) s("sfx/k-dos-tonos.wav", T.ring + d, 0, { techo: -38, dur: 0.3, fin: 0.06, hp: 400 });
s("sfx/click-soft.mp3", T.altavoz, 0, { techo: -40 });
pop(T.g1 - 0.02, -40); voz("g1", T.g1, -1);
// P4 · el monitor ("ninguno"), el auto que entra (motor + globos), el inserto del celular
s("sfx/whoosh-short.mp3", T.p4 - 0.04, 0, { techo: -46 });
s("sfx/click-soft.mp3", T.ninguno, 0, { techo: -42, vel: 0.7 });
motor(T.entra[0], r2(T.entra[1] - T.entra[0]), -46, 0.95);
s("sfx/k-creak.wav", T.entra[1] - 0.15, 0, { dur: 0.3, fin: 0.1, techo: -49, vel: 1.25 });
voz("r1", T.r1, -1);
s("sfx/whoosh-short.mp3", T.p4c - 0.04, 0, { techo: -50 });
// P5 · la puerta de vidrio, "¡Nico!", la ventanilla, "¡Ya lo cargo!"
s("sfx/puerta-abre.wav", T.p5 - 0.05, 0, { techo: -46, dur: 0.5, fin: 0.15 });
pop(T.r2 - 0.02, -40); voz("r2", T.r2, -2);
s("sfx/whoosh-short.mp3", T.p5b - 0.04, 0, { techo: -48 });
s("sfx/k-neumatico-abre.wav", T.ventanilla[0], 0, { techo: -46, lp: 3000, vel: 1.3, dur: 0.3, fin: 0.1 });
s("sfx/k-plastico.wav", T.ventanilla[1], 0, { techo: -44, vel: 0.8 });
pop(T.n3 - 0.02, -40); voz("n3", T.n3, -2);
// P6 · la pausa: solo el bip del autoelevador (Kenney, CC0) y el mate en la baranda
T.bips.forEach((t) => bip(t, -38));
s("sfx/madera-golpe.wav", T.mateBaranda, 0, { techo: -44, vel: 1.4 });
// P7 · el autoelevador: motor bajo (eléctrico), hidráulico, el auto que sube, la rampa, el auto que entra en la caja
s("sfx/k-motor-bajo.wav", T.p7, 0, { dur: r2(T.adentro[1] - T.p7 + 0.2), fi: 0.05, fin: 0.25, techo: -46, lp: 1400 });
s("sfx/k-neumatico-abre.wav", T.levanta[0], 0, { techo: -42, lp: 1200, vel: 0.7 });
s("sfx/k-plastico.wav", T.levanta[1] - 0.05, 0, { techo: -44, vel: 0.65 });
s("sfx/cruje.wav", T.viaje[0] + 0.25, 0, { techo: -46 });
s("sfx/k-chapa-pesada.wav", T.adentro[1] - 0.04, 0, { techo: -36 });
voz("r3", T.r3, -1);
s("sfx/k-metal-pesado-0.wav", T.puertas[0], 0, { techo: -36 });
s("sfx/k-metal-pesado-2.wav", T.puertas[1], 0, { techo: -36 });
// P8 · el celular ahogado (vibra, con pasabajos), la voz ahogada, las dos palmadas en la chapa, el camión que arranca
s("sfx/vibra.wav", T.ringCel, 0, { dur: 0.45, fin: 0.1, techo: -42, lp: 700 });
voz("n4", T.n4, 0);
s("sfx/k-metal-medio-1.wav", T.palmadas[0], 0, { techo: -36 });
s("sfx/k-metal-medio-3.wav", T.palmadas[1], 0, { techo: -36 });
motor(T.arranca, r2(P1 - T.arranca + 0.25), -40, 0.72);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -41, dur: 0.6, fin: 0.25 });
voz("narrador", P1 + 0.15, -4);
for (const d of [0.0, 0.3, 0.95, 1.55]) pop(P1 + d + 0.02, -42);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -40 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -33 });
s("sfx/calle.wav", P2, -6, { desde: 4, dur: r2(T.q2w - P2), fin: 0.2, techo: -44, lp: 1500 });
s("sfx/zumbido.wav", T.q2w, 0, { loop: true, dur: r2(DUR - T.q2w), fi: 0.1, fin: 0.5, techo: -47, lp: 900 });
for (const t of T.toques) s("sfx/key-press.mp3", t, 0, { techo: -42 });
voz("n5", T.n5, -2);
s("sfx/ding.mp3", T.ding, 0, { techo: -36, dur: 0.8, fin: 0.35 });
s("sfx/whoosh-short.mp3", T.vuela[0], 0, { techo: -42 });
s("sfx/whoosh.mp3", T.q2 - 0.05, 0, { techo: -42, dur: 0.8, fin: 0.2 });
s("sfx/whoosh-short.mp3", T.q2w - 0.04, 0, { techo: -44 });
s("sfx/whoosh-short.mp3", T.parte - 0.03, 0, { techo: -42, vel: 1.2 });
s("sfx/cero.mp3", T.tilde, 0, { techo: -40 });
T.bolsas.forEach((t, i) => s(i % 2 ? "sfx/madera-golpe.wav" : "sfx/k-cloth_1.wav", t, 0, { techo: i % 2 ? -42 : -40, dur: 0.3, fin: 0.1 }));
s("sfx/whoosh-short.mp3", T.q2b - 0.04, 0, { techo: -46 });
s("sfx/click-soft.mp3", T.ficha, 0, { techo: -40 });
s("sfx/cero.mp3", T.ficha + 0.1, 0, { techo: -44 });
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -46 });
s("sfx/k-motor-bajo.wav", T.q3, 0, { dur: r2(T.pallet[1] - T.q3 + 0.2), fi: 0.05, fin: 0.25, techo: -49, lp: 1400 });
s("sfx/madera-tabla.wav", T.pallet[1] - 0.05, 0, { techo: -47 });
motor(T.entra2[0], r2(T.entra2[1] - T.entra2[0]), -49, 0.95);
s("sfx/k-creak.wav", T.entra2[1] - 0.15, 0, { dur: 0.3, fin: 0.1, techo: -50, vel: 1.25 });
voz("n6", T.n6, -2);
s("sfx/k-metal-pesado-0.wav", T.puerta2[1] - 0.03, 0, { techo: -40 });
voz("r4", T.r4, -1);
s("sfx/k-metal-medio-1.wav", T.q4 + 0.02, 0, { techo: -43 });
motor(T.sale2[0] + 0.1, r2(T.sale2[1] - T.sale2[0]), -47, 0.72);
s("sfx/k-neumatico-abre.wav", T.horquillas[0], 0, { techo: -44, lp: 1200, vel: 0.75, dur: 0.35, fin: 0.1 });
bip(T.horquillas[0] + 0.05, -40); bip(T.horquillas[0] + 0.4, -40);
motor(T.atras[0], r2(T.atras[1] - T.atras[0]), -45, 1.1);
pop(T.cierre + 0.05, -42);   // la línea chica
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav") { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }

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
    if (o.loop) args.push("-stream_loop", "2");
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
const IRIS_C = "420px 1240px";   // el iris se abre desde el celular de Nico (Q1, el mismo encuadre de P1)
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
