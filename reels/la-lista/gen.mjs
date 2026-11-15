// Genera todo la-lista desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el cartel "Una tienda online más tarde…" y la línea chica final);
//     las burbujas de diálogo (el gancho incluido) son 3D pegadas a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como ya-lo-cargo) en UN solo proyecto: parte 1 (0 a P1), el cartel (P1 a P2, HTML
// debajo del canvas) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md): g1 2,07 ("Rubén," 0 · "¿me pasás la lista actualizada?" +0,3) · p1 1,48 ·
// g2 2,14 · r1 1,10 ("Está" +0,02) · g3 1,37 ("Tengo siete." +0,6) · p2 1,76 · r2 0,48 · g4 1,87 ("Dale." 0 ·
// "¿Me la mandás" +0,3 · "pe de efe" +1,2) · narrador 2,81 · r3 0,66
const LEN = { g1: 2.07, p1: 1.48, g2: 2.14, r1: 1.81, g3: 1.85, p2: 1.76, r2: 0.48, g4: 1.87, r4: 3.12, nar: 2.81, r3: 0.66 };
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: la oficina de noche. Graciela (audio de chat): "Rubén, ¿me pasás la lista actualizada?" · Rubén
// arrastra el archivo con el mouse · ✓✓
T.g1 = 0.2; T.arrastra = [1.55, 2.15]; T.envia1 = r2(T.g1 + LEN.g1 + 0.02);
// P2 · el teléfono de escritorio: suena, altavoz, el proveedor: "Rubén, subió el aceite." · inserto del monitor
T.p2 = r2(T.envia1 + 0.04); T.ring1 = r2(T.p2 + 0.03); T.alt1 = r2(T.p2 + 0.18); T.p1 = r2(T.p2 + 0.25);
T.p2b = r2(T.p1 + LEN.p1 + 0.03); T.celda = r2(T.p2b + 0.05); T.tacha = r2(T.p2b + 0.16); T.nuevo = r2(T.p2b + 0.27);
// P3 · clac de la v2 y la ráfaga que acelera (las primeras ~0,5 s, las últimas ~0,22 s)
T.p3 = r2(T.p2b + 0.36);
T.v = [0, r2(T.p3 + 0.08)];                       // v[k]: la cinta crece a la versión k (0 = la de arranque)
const R0 = r2(T.p3 + 0.2), E = [0, 0.5, 0.93, 1.3, 1.62];
T.marta = r2(R0 + E[0]); T.envM = r2(R0 + 0.25);
T.azucar = r2(R0 + E[1]); T.v[2] = r2(T.azucar + 0.15);
T.walter = r2(R0 + E[2]); T.envW = r2(T.walter + 0.18);
T.dolar = r2(R0 + E[3]); T.v[3] = r2(T.dolar + 0.12);
T.nico = r2(R0 + E[4]); T.v[4] = r2(T.nico + 0.1);
T.v[5] = r2(T.v[4] + 0.27);                       // v6: la cinta toca el termo
T.v[6] = r2(T.v[5] + 0.22);                       // v7: empuja el termo, que cabecea
T.agarra = [r2(T.v[6] + 0.1), r2(T.v[6] + 0.46)];
T.campanas = [0.32, 0.78, 1.2, 1.57, 1.92, 2.28].map((d) => r2(R0 + d));
// P4 · suena el celular (llamada de Graciela), zambullida por la pantalla, salimos por la del celular de Graciela
T.p4 = r2(T.agarra[1] + 0.06); T.llama = T.p4; T.zambulle = [r2(T.p4 + 0.06), r2(T.p4 + 0.36)];
T.p4b = T.zambulle[1]; T.g2 = r2(T.p4b + 0.1);
// P5 · Rubén: "Está en la lista. La última."
T.p5 = r2(T.g2 + LEN.g2 + 0.05); T.r1 = r2(T.p5 + 0.06);
// P6 · Graciela: "¿Cuál es la última? Tengo siete." · inserto del chat con los siete archivos
T.p6 = r2(T.r1 + LEN.r1 + 0.06); T.g3 = r2(T.p6 + 0.04); T.chat = r2(T.g3 + LEN.g3 + 0.05); T.scroll = [r2(T.chat + 0.3), r2(T.chat + 0.8)];
// P7 · la pausa (0,4 s) · el teléfono · el proveedor otra vez · Rubén quieto · "Ocho." · clac (v8, la taza) con aire
T.p7 = r2(T.chat + 0.95); T.ring2 = r2(T.p7 + 0.4); T.alt2 = r2(T.ring2 + 0.22); T.p2v = r2(T.alt2 + 0.08);
T.r2 = r2(T.p2v + LEN.p2 + 0.66); T.v[7] = r2(T.r2 + LEN.r2 + 0.12);
// P8 · "Dale. ¿Me la mandás en PDF?" (~0,5 s después de "Ocho.") · Rubén mira a cámara y lo sostiene · "Claro. El PDF
// no se mueve. El aceite, sí." · la tecla · la cinta .pdf crece entera (se lee) y después se cae del escritorio
T.p8 = r2(T.v[7] + 0.2); T.g4 = r2(T.r2 + LEN.r2 + 0.42); T.mira = [r2(T.g4 + LEN.g4 + 0.1), r2(T.g4 + LEN.g4 + 0.5)];
T.r4 = r2(T.mira[0] + 0.4); T.tecla = r2(T.r4 + LEN.r4 + 0.22); T.v[8] = r2(T.tecla + 0.08);
T.pdfLee = [r2(T.v[8] + 0.05), r2(T.v[8] + 0.6)];   // (ronda 3) push-in a la cinta .pdf y después la cola que cuelga   // la cinta entera en cuadro
const P1 = r2(T.v[8] + 1.0);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.6);         // arranca la parte 2
// ---- parte 2 ----
// Q1 · el encuadre de P1 a las 18:30: el teléfono, la MISMA toma del proveedor · la cinta hace un tic y no crece · Q1b
// inserto del panel: un precio, Publicar, "Publicado ✓" · Q1c Rubén con el mate: "¿Algo más?" · tono de colgado
T.q1 = P2; T.ring3 = r2(P2 + 0.02); T.alt3 = r2(P2 + 0.1); T.p1b = r2(P2 + 0.16);
T.tic = r2(T.p1b + LEN.p1 + 0.02); T.q1b = r2(T.p1b + LEN.p1 + 0.12); T.escribe = r2(T.q1b + 0.08); T.publica = r2(T.q1b + 0.28); T.publicado = r2(T.q1b + 0.36);
T.q1c = r2(T.q1b + 0.45); T.r3 = r2(T.q1c + 0.03); T.colgado = r2(T.r3 + LEN.r3 + 0.03);
// Q2 · el tríptico: tres celulares de clientes, el precio cambia a la vez con la chapita "hoy" · Q2c inserto del celular
// de Graciela: "1 lista · la de hoy", +6, Pedir, Pedido ✓
T.q2 = r2(T.colgado + 0.2); T.flip = r2(T.q2 + 0.24); T.q2c = r2(T.q2 + 0.85);   // (ronda 3) dos bips de colgado antes del tríptico
T.mas = [0.1, 0.2, 0.3].map((d) => r2(T.q2c + d)); T.pedir = r2(T.q2c + 0.4); T.pedido = r2(T.q2c + 0.48);
// Q3 · la oficina: entran los pedidos; el celular de Rubén no suena: lo mira, lo levanta, lo toca, lo deja boca abajo,
// mate (ronda 2: cada acción con su tiempo y el sorbo entero antes del final)
T.q3 = r2(T.pedido + 0.62); T.pedidos = [0.06, 0.18, 0.3].map((d) => r2(T.q3 + d));   // (ronda 3) "Pedido ✓" 0,6 s
T.miraCel = r2(T.q3 + 0.4); T.levanta = [r2(T.q3 + 0.55), r2(T.q3 + 0.72)]; T.toca = r2(T.q3 + 0.85); T.senal = [r2(T.q3 + 0.93), r2(T.q3 + 1.08)];
T.deja = r2(T.q3 + 1.1); T.sorbo = r2(T.q3 + 1.18);
T.cierre = r2(T.q3 + 0.45);
const DUR = r2(T.q3 + 2.15);

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
const VOCES = ["g1", "p1", "g2", "r1", "g3", "p2", "r2", "g4", "r4", "r3"];
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

// el cartel "Una tienda online más tarde…" (el de hacen-envios, mismo texto y misma toma de Rasalgethi). Va DEBAJO del
// canvas. No dice "Scalerics". Tres renglones ("Una tienda" / "online" / "más tarde…"): en dos no entra en 1080 px.
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.03)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
  // el narrador va en P1 + 0,12 (Una +0,24 · tienda +0,5 · online +1,0 · más +1,2 · tarde +2,07 dentro del audio)
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 650px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 166px; margin-top: 10px; }
    P .linea.c { font-size: 136px; margin-top: 22px; }
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
        ${lin("a", [["Una", 0.2], ["tienda", 0.48]])}
        ${lin("b", [["online", 0.98]])}
        ${lin("c", [["más", 1.2], ["tarde…", 1.85]])}
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
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.3)});   // se va antes de que abra el iris`,
  });
}

// la línea chica final (arriba, sobre el depósito): una línea y la web. Sin tarjeta de videollamada.
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1420px; padding: 24px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 58px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 72px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Tienda online mayorista:</div><div class="a">el precio de hoy,</div><div class="a">sin mandar listas</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 520 }, { y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, 0.0);   // (ronda 2) entra desde abajo, opaca
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
const voz = (f, t, db = -2) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.45), r2(t + LEN[f === "narrador" ? "nar" : f] + 0.45)]); };
// la cinta de rotuladora: un clic de plástico + el roce de la cinta que sale (cada versión un poco más aguda)
const clac = (t, k, techo = -38) => { s("sfx/k-metal-click.wav", t, 0, { techo, vel: 0.9 + k * 0.05 }); s("sfx/k-plastico.wav", t + 0.03, 0, { techo: techo - 6, vel: 1.1 + k * 0.04 }); };
const ringEsc = (t, n = 2, techo = -38) => { for (let i = 0; i < n; i++) s("sfx/k-dos-tonos.wav", t + i * 0.42, 0, { techo, desde: 0.09, dur: 0.4, fin: 0.06, hp: 400 }); };   // (ronda 3) el archivo arranca con 0,1 s de silencio
// ---- parte 1 ----
// ambiente: el zumbido de la oficina de noche (pasabajos); la música (pizzicato): baja en la pausa (NO se corta)
s("sfx/zumbido.wav", 0, 0, { loop: true, dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -45, lp: 900 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -33, duck: [[T.p7 - 0.1, T.v[7] + 0.1, 0.78], [T.g4 - 0.1, T.g4 + LEN.g4 + 0.1, 0.25], ...[1, 2, 3].map((k) => [T.v[k] - 0.1, T.v[k] + 0.2, 0.37])] });
// P1 · el celular vibra, el audio de Graciela, el mouse, el envío
s("sfx/vibra.wav", 0.02, 0, { dur: 0.4, fin: 0.1, techo: -42 });
voz("g1", T.g1, -1);
s("sfx/click-soft.mp3", T.arrastra[0], 0, { techo: -44 });
s("sfx/click-soft.mp3", T.arrastra[1], 0, { techo: -44, vel: 0.9 });
s("sfx/whoosh-short.mp3", T.envia1 + 0.03, 0, { techo: -44 });
// P2 · el teléfono de escritorio (dos tonos, real CC0), el altavoz, el proveedor, el inserto del monitor, el clac
s("sfx/whoosh-short.mp3", T.p2 - 0.04, 0, { techo: -48 });
ringEsc(T.ring1, 1, -38);
s("sfx/click-soft.mp3", T.alt1, 0, { techo: -40 });
pop(T.p1 - 0.02, -42); voz("p1", T.p1, -1);
s("sfx/whoosh-short.mp3", T.p2b - 0.04, 0, { techo: -48 });
for (const t of [T.celda, T.tacha, T.nuevo]) s("sfx/key-press.mp3", t, 0, { techo: -44 });
clac(T.v[1], 1, -34);
// P3 · la ráfaga: pop por burbuja, notificación por pedido, whoosh por envío, clac por versión, clunk por campana
s("sfx/whoosh-short.mp3", T.p3 - 0.04, 0, { techo: -48 });
for (const t of [T.marta, T.walter, T.nico]) { pop(t - 0.02, -40); s("sfx/notification.mp3", t, 0, { techo: -46, dur: 0.35, fin: 0.12 }); }
for (const t of [T.azucar, T.dolar]) { pop(t - 0.02, -40); s("sfx/k-dos-tonos.wav", t - 0.02, 0, { techo: -40, desde: 0.09, dur: 0.2, fin: 0.04, hp: 400 }); }
for (const t of [T.envM, T.envW]) s("sfx/whoosh-short.mp3", t, 0, { techo: -46, vel: 1.15 });
for (let k = 2; k <= 6; k++) clac(T.v[k], k, k <= 3 ? -34 : -37);
T.campanas.forEach((t, i) => s(i % 2 ? "sfx/interruptor2.wav" : "sfx/interruptor.wav", t + (i === 4 ? 0.15 : 0.07), 0, { techo: -40, lp: 2500, vel: 0.8 }));
s("sfx/k-plato-001.wav", T.v[6] + 0.05, 0, { techo: -36, vel: 0.85 });     // el termo que se inclina
s("sfx/k-cloth_1.wav", T.agarra[0], 0, { techo: -40, dur: 0.35, fin: 0.1 });
s("sfx/madera-golpe.wav", T.agarra[1] - 0.05, 0, { techo: -40, vel: 1.3 });
// P4 · el celular suena (vibra), la zambullida
s("sfx/vibra.wav", T.llama, 0, { dur: 0.6, fin: 0.12, techo: -38 });
s("sfx/whoosh.mp3", T.zambulle[0], 0, { techo: -40, dur: 0.6, fin: 0.2 });
voz("g2", T.g2, -1);
// P5 · de vuelta por la pantalla del celular de Rubén
s("sfx/whoosh-short.mp3", T.p5 - 0.08, 0, { techo: -44 });
voz("r1", T.r1, -1);
// P6 · contraplano a Graciela, el inserto del chat (scroll)
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -50 });
voz("g3", T.g3, -1);
s("sfx/whoosh-short.mp3", T.chat - 0.04, 0, { techo: -48 });
for (const t of T.scroll) s("sfx/key-press.mp3", t, 0, { techo: -48, vel: 0.8 });
// P7 · la pausa (solo el zumbido de la oficina: sin perro CC0, ver fuentes.md), el teléfono, el proveedor, "Ocho.", clac
ringEsc(T.ring2, 1, -38);
s("sfx/click-soft.mp3", T.alt2, 0, { techo: -40 });
pop(T.p2v - 0.02, -42); voz("p2", T.p2v, -1);
voz("r2", T.r2, 0);
clac(T.v[7], 7, -37);
s("sfx/k-plato-000.wav", T.v[7] + 0.06, 0, { techo: -44, vel: 0.9 });       // la taza de lapiceras que se corre
// P8 · "Dale. ¿Me la mandás en PDF?" · la tecla · el clac largo · la cinta que cae
s("sfx/whoosh-short.mp3", T.p8 - 0.04, 0, { techo: -52 });
voz("g4", T.g4, -1);
voz("r4", T.r4, -1);
s("sfx/key-press.mp3", T.tecla, 0, { techo: -42 });
clac(T.v[8], 8, -36);
s("sfx/k-plastico.wav", T.v[8] + 0.15, 0, { techo: -42, vel: 0.8 });
s("sfx/k-cloth_2.wav", T.v[8] + 0.3, 0, { techo: -44, dur: 0.4, fin: 0.15 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
voz("narrador", P1 + 0.02, -1);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });   // (ronda 2) cama corta: sin silencio digital
for (const d of [0.2, 0.48, 0.98, 1.2, 1.85]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.15, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -33, duck: [[T.q3, DUR + 1, 0.35]] });   // (ronda 3) -3,5 dB en Q3 (el sorbo)
s("sfx/zumbido.wav", P2, 0, { loop: true, dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -47, lp: 900 });
for (let i = 0; i < 4; i++) s(`sfx/paso-${i}.wav`, P2 + 0.2 + i * 0.45, 0, { techo: -50, lp: 1500 });   // el operario con la zorra, lejos
ringEsc(T.ring3, 1, -38);
s("sfx/click-soft.mp3", T.alt3, 0, { techo: -40 });
pop(T.p1b - 0.07, -45); voz("p1", T.p1b, -1);   // la MISMA toma de P2 (callback)
s("sfx/k-metal-click.wav", T.tic, 0, { techo: -46, vel: 1.3 });   // el tic de la cinta que no crece
s("sfx/whoosh-short.mp3", T.q1b - 0.04, 0, { techo: -50 });
s("sfx/key-press.mp3", T.escribe, 0, { techo: -46 }); s("sfx/key-press.mp3", T.escribe + 0.12, 0, { techo: -46 });
s("sfx/click-soft.mp3", T.publica, 0, { techo: -42 });
s("sfx/cero.mp3", T.publicado, 0, { techo: -42 });
voz("r3", T.r3, -1);
for (const d of [0, 0.18]) s("sfx/k-tono.wav", T.colgado + d, 0, { dur: 0.14, fin: 0.04, techo: -38, vel: 0.85 });   // tono de colgado
// Q2 · el tríptico: los tres precios se dan vuelta a la vez (tres hojas + ding) · Q2c el pedido de Graciela
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -52 });
for (const d of [0, 0.03, 0.06]) s("sfx/k-page-turn.wav", T.flip + d, 0, { techo: -42, vel: 1 + d * 3 });
s("sfx/cero.mp3", T.flip + 0.12, 0, { techo: -42 });
s("sfx/whoosh-short.mp3", T.q2c - 0.04, 0, { techo: -48 });
for (const t of [...T.mas, T.pedir]) s("sfx/click-soft.mp3", t, 0, { techo: -44 });
s("sfx/cero.mp3", T.pedido, 0, { techo: -36 });
// Q3 · los pedidos que entran; el celular que no suena
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -48 });
T.pedidos.forEach((t) => { pop(t, -44); s("sfx/notification.mp3", t + 0.02, 0, { techo: -50, dur: 0.3, fin: 0.1 }); });
s("sfx/k-cloth_2.wav", T.levanta[0], 0, { techo: -48, dur: 0.3, fin: 0.1 });
s("sfx/key-press.mp3", T.toca, 0, { techo: -46 });
s("sfx/k-cloth_1.wav", T.senal[0] + 0.1, 0, { techo: -50, dur: 0.3, fin: 0.1 });
s("sfx/madera-golpe.wav", T.deja, 0, { techo: -44, vel: 1.4 });
s("sfx/sorbo.wav", T.sorbo, 0, { techo: -42, fin: 0.15 });
pop(T.cierre + 0.05, -44);   // la línea chica
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
const ROT = r2(P1), IRIS = r2(P2 - 0.1);
const IRIS_C = "540px 1180px";   // el iris se abre desde el teléfono de escritorio (Q1, el encuadre de P1)
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
      <div id="precarga">Rubén</div><div id="precarga2">lista_v7.xlsx</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el teléfono de escritorio
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});   // (el iris: ver abajo)
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.1, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(T));
