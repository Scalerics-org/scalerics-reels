// Genera todo parrilla-no-vuelve desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Una tarjeta de puntos más tarde…",
//     "Comentá VUELVE" y la línea chica final); las burbujas de diálogo y los audios son 3D pegados a la cámara
//     (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra) con el formato completo de dice-cuarenta: parte 1 (0 a P1),
// el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): w1 Walter "¡Impecable, Raúl! ¡Volvemos!" (P1 y Q1) ·
// r1 Raúl "¡Cuando quieras, maestro!" · r2 "¿Quién era?" · f1 Fabián "¿Y si les avisás a los del sábado?" · r3 "¿A quién?
// ¿A maestro?" · w2 Walter "¡Raúl! ¿Te acordás de mí?" (P7 y Q4) · r4 "¡Obvio, maestro!" · nar "Una tarjeta de puntos más
// tarde." · r5 "¡Te espero, Walter!" · g1 Graciela "¡Vamos el martes!" · r6 "Walter. Tira y morcilla dulce. Faltaste dos
// sábados." · s1 Sofi "Comentá VUELVE y te mando cómo funciona para tu parrilla."
const VOCES = ["w1", "r1", "r2", "f1", "r3", "w2", "r4", "r5", "g1", "r6", "s1"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: la parrilla llena, Raúl con la pinza, Walter saliendo: "¡Impecable, Raúl! ¡Volvemos!" (palmada) ·
// "¡Cuando quieras, maestro!" (levanta la pinza)
T.w1 = 0.25; T.palmada = r2(T.w1 + LEN.w1 - 0.35); T.r1 = r2(T.w1 + LEN.w1 - 0.04); T.pinza1 = r2(T.r1 + 0.1);
// P2 · primer plano de Raúl, Fabián a su lado; Walter se va (campanita) · "¿Quién era?" · Fabián se encoge: "Ni idea."
T.p2 = r2(T.r1 + LEN.r1 + 0.02); T.r2 = r2(T.p2 + 0.12); T.campana1 = r2(T.p2 + 0.05);
T.encoge1 = r2(T.r2 + LEN.r2 + 0.02); T.niIdea = r2(T.encoge1 + 0.12);
// P3 · la ráfaga muda: tres mesas que se van, pares de burbujas cada vez más rápido · el rótulo de los 112 cubiertos
T.p3 = r2(T.niIdea + 0.4);
// (r1) dos pares legibles: cada par (cliente + respuesta de Raúl) entra y sale junto
T.raf = [[0.05, 0.28], [0.68, 0.9]].map(([a, b]) => [r2(T.p3 + a), r2(T.p3 + b)]);
T.rot112 = r2(T.p3 + 1.32); T.rot0 = r2(T.p3 + 1.46);
// P4 · de sábado a febrero: la cámara va a la pizarra; Fabián borra "SÁBADO" y escribe "MARTES · FEBRERO"
T.p4 = r2(T.p3 + 2.0); T.borra = [r2(T.p4 + 0.05), r2(T.p4 + 0.28)]; T.escribe = [r2(T.p4 + 0.3), r2(T.p4 + 0.72)];
// P5 · el salón vacío (el mismo plano de la ráfaga): los rótulos · "¿Y si les avisás a los del sábado?"
T.p5 = r2(T.p4 + 0.8); T.rot3 = r2(T.p5 + 0.1); T.rotLena = r2(T.p5 + 0.28); T.f1 = r2(T.p5 + 0.35);
// P6 · la pausa: el celular de Raúl, "Contactos" (el scroll llega al final y rebota) · primer plano: "¿A quién? ¿A maestro?"
T.p6 = r2(T.f1 + LEN.f1 + 0.05); T.scroll = [r2(T.p6 + 0.08), r2(T.p6 + 0.5)]; T.rebote = r2(T.p6 + 0.52);
T.p6b = r2(T.p6 + 0.6); T.r3 = r2(T.p6b + 0.08);
// P7 · remate del remate: la campanita, entra Walter: "¡Raúl! ¿Te acordás de mí?" · "¡Obvio, maestro!" (abrazo) · Raúl
// mira a Fabián por encima del hombro · Fabián se encoge de hombros otra vez
T.p7 = r2(T.r3 + LEN.r3 + 0.1); T.campana2 = r2(T.p7 + 0.04); T.entra = [r2(T.p7), r2(T.p7 + 0.8)]; T.w2 = r2(T.p7 + 0.22);
T.r4 = r2(T.w2 + LEN.w2 + 0.26); /* (r1) pausa con la cara de Raúl antes del remate */ T.abrazo = [r2(T.r4 - 0.25), r2(T.r4 + 0.25)]; T.mira = r2(T.r4 + LEN.r4 - 0.1); T.encoge2 = r2(T.mira + 0.4);
const P1 = r2(T.encoge2 + 0.38);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.12, LEN.nar + 0.08));
// ---- parte 2 ----
// Q1 · otro sábado, la mesa de Walter: el atril con el QR (pop), Walter lo escanea
T.q1 = P2; T.atril = r2(P2 + 0.1); T.escanea = r2(P2 + 0.4);
// Q1b · el celular de Walter: la tarjeta de puntos (el 4º círculo se llena: "+1 visita ✓") · la provoleta de regalo
T.q1b = r2(P2 + 0.5); T.visita = r2(T.q1b + 0.3); T.premio = r2(T.q1b + 0.7);
// Q1c · el cuadro 0 otra vez: en la tablet entra la ficha de Walter · "¡Impecable, Raúl! ¡Volvemos!" · "¡Te espero, Walter!"
T.q1c = r2(T.q1b + 0.9); T.ficha = r2(T.q1c + 0.1); T.w1b = r2(T.q1c + 0.12); T.palmada2 = r2(T.w1b + LEN.w1 - 0.35);
T.r5 = r2(T.w1b + LEN.w1 + 0.06);
// Q2 · la tablet: "Quién vuelve y cada cuánto" · las filas · "Nombres que sabe Raúl: 0 → 112"
T.q2 = r2(T.r5 + LEN.r5 + 0.12); T.filas = [-0.02, 0.1, 0.2, 0.3].map((d) => r2(T.q2 + d)); T.cuenta = [r2(T.q2 + 0.55), r2(T.q2 + 1.0)];
// Q3 · febrero: el filtro (38 que no vienen), la fila de Walter en rojo, "Enviado ✓ · 38" solo; el aviso vuela a Graciela
T.q3 = r2(T.q2 + 1.38); T.filtro = r2(T.q3 - 0.02); T.enviado = r2(T.q3 + 0.7); T.vuela = [r2(T.q3 + 0.85), r2(T.q3 + 1.15)];
T.q3b = r2(T.q3 + 1.15); T.aviso = r2(T.q3b + 0.05); T.g1 = r2(T.q3b + 0.4);
// Q4 · martes de febrero, el plano del salón: 17 mesas · la campanita, entra Walter: "¡Raúl! ¿Te acordás de mí?" ·
// primer plano: "Walter. Tira y morcilla dulce. Faltaste dos sábados."
T.q4 = r2(T.g1 + LEN.g1 + 0.12); T.chip17 = r2(T.q4 + 0.1); T.campana3 = r2(T.q4 + 0.3); T.entra2 = [r2(T.q4 + 0.25), r2(T.q4 + 1.0)];
T.w2b = r2(T.q4 + 0.4); T.q4b = r2(T.w2b + LEN.w2 + 0.04); T.r6 = r2(T.q4b + 0.04);
// Q5 · la mesada: la tablet (Walter ✓ volvió) y Sofi en videollamada · "Comentá VUELVE…" · la línea chica
T.q4c = r2(T.r6 + 2.42);   // (r1) corte a Walter culposo en "Faltaste dos sábados"
T.q5 = r2(T.r6 + LEN.r6 + 0.22);   /* (r2) respiro de reacción */ T.volvio = r2(T.q5 + 0.05); T.viaje = [r2(T.q5 + 1.2), r2(T.q5 + 1.7)]; T.s1 = r2(T.q5 + 0.35);
T.vuelve = r2(T.s1 + Number(process.env.VUELVE ?? 0.4));
const DUR = Math.ceil((Math.ceil((T.s1 + LEN.s1 + 0.4) * 30) / 30) * 1e4) / 1e4;   // múltiplo de un cuadro
T.cierre = r2(DUR - 2.05);

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

// P1 · el rubro: "PARRILLAS" enorme arriba (crema sobre navy, en el recuadro verde) y "Sábado, 21:30." debajo, entero desde
// el cuadro 0; se va cuando termina "¡Cuando quieras, maestro!"
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 + 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 90px; padding: 26px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 132px/1.0 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sub { margin-top: 18px; font: 800 62px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }
    P .sel { position: relative; display: inline-block; padding: 0 24px; }
    P .sel b { position: absolute; inset: -10px 0 -8px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>PARRILLAS</em></span></div><div class="sub">Sábado, 21:30.</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.2);
      tl.to(q(".caja"), { opacity: 0, y: -40, duration: 0.2, ease: "power1.in" }, ${r2(dur - 0.22)});   // (r1) sale con fundido (no queda cortada contra el borde)`,
  });
}

// el cartel "Una tarjeta de puntos más tarde…" (time card de dibujito, de marca, hecho de cero; tres renglones como el de
// las-siete-y-cincuenta-y-nueve). Va DEBAJO del canvas. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
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
          <circle class="bu" cx="500" cy="1960" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
          <circle class="bu" cx="560" cy="560" r="30" fill="none" stroke="${CR}" stroke-width="9"/>
        </g>
      </svg>
      <div class="texto" data-layout-allow-overlap data-layout-allow-overflow>
        ${lin("a", ["Una", "tarjeta"])}
        ${lin("b", ["de", "puntos"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = 0.0 + i * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.1, ease: "power2.in" }, ${r2(dur - 0.22)});   // (r2 11:11) sale mientras crece el iris; (r1 11:11) sale justo cuando abre el iris (no queda el verde vacío)   // (ronda 2) se va entero antes del iris   // se va antes de que abra el iris`,
  });
}

// Q5 · "Comentá VUELVE" grande arriba (VUELVE en el recuadro verde), entra en "VUELVE" y queda hasta el final
{
  const id = "s05-vuelve", ini = T.vuelve, dur = r2(DUR - T.vuelve);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 56px; padding: 26px 10px 36px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 92px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.05 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 26px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>VUELVE</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, opacity: 0, y: -60 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.35);`,
  });
}

// la línea chica final (abajo): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1500px; padding: 24px 30px 30px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 52px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 74px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Tarjeta de puntos con aviso</div><div class="a">al que deja de venir</div><div class="b">scalerics.com</div></div>`,
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
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.7)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -40) => { techo = Math.min(-33, techo + 5); s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.18, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tacha = (t, techo = -36) => { s("sfx/k-page-turn.wav", t, 0, { techo, vel: 1.6, dur: 0.22, fin: 0.06, hp: 1200 }); s("sfx/k-page-turn.wav", t + 0.12, 0, { techo: techo - 2, vel: 1.9, dur: 0.18, fin: 0.06, hp: 1500 }); };
const tela = (t, techo = -38, k = 1) => s(`sfx/k-cloth_${k}.wav`, t, 0, { techo, dur: 0.35, fin: 0.1 });
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const palmada = (t, techo = -33) => { s("sfx/k-cloth_2.wav", t, 0, { techo, dur: 0.2, fin: 0.06, vel: 1.15 }); };
const pinza = (t, techo = -35) => s("sfx/k-metal-click.wav", t, 0, { techo });
const campana = (t, techo = -35) => { s("sfx/campanita.wav", t, 0, { techo, dur: 0.9, fin: 0.3 }); s("sfx/puerta-abre.wav", t - 0.05, 0, { techo: -42, dur: 0.6, fin: 0.2 }); };
const amb = (f, a, b, techo, o = {}) => s(f, a, 0, { loop: true, dur: r2(b - a), fi: o.fi ?? 0.15, fin: o.fin ?? 0.3, techo, ...o });
// ---- parte 1 ----
// el sábado: el salón lleno (murmullo, cubiertos), la carne que chisporrotea y la leña; en febrero el murmullo se apaga y
// quedan el ventilador, los grillos lejanos y la parrilla con una sola tira (más baja). La música baja en la pausa.
amb("sfx/salon.wav", 0, T.p4 + 0.45, -35, { fi: 0.05, fin: 0.4, lp: 5000 });
amb("sfx/chisporroteo.wav", 0, T.p4 + 0.2, -39, { fi: 0.05, fin: 0.25 });
amb("sfx/fuego.wav", 0, P1 + 0.05, -45, { fi: 0.05 });
amb("sfx/chisporroteo.wav", T.p5, P1 + 0.05, -46, { desde: 4 });
amb("sfx/ventilador.wav", T.p4 + 0.3, P1 + 0.05, -42, { fi: 0.4, lp: 3000 });
amb("sfx/grillos.wav", T.p4 + 0.35, P1 + 0.05, -47, { fi: 0.5, lp: 5000, hp: 1500 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p6 - 0.1, T.r3 + 0.1, 0.75]] });
// P1 · palmada, la pinza
voz("w1", T.w1, -1); palmada(T.palmada); voz("r1", T.r1, -1); pinza(T.pinza1);
// P2 · la campanita (Walter se va), "¿Quién era?", el encogerse (tela) y "Ni idea." (pop)
campana(T.campana1, -38); voz("r2", T.r2, -1); tela(T.encoge1, -40, 1); pop(T.niIdea, -40);
// P3 · la ráfaga: pop por burbuja (cliente / Raúl en dos tonos), campanita por mesa, pasos, el rótulo
T.raf.forEach(([a, b], i) => { pop(a, -39); s("sfx/pop.mp3", b, 0, { desde: 0.11, techo: -39, vel: 0.85 }); pinza(b + 0.03, -42); });
[0.45, 1.1, 1.55].forEach((d) => campana(T.p3 + d, -41));   // la puerta de cada grupo que se va
pasos(T.p3, T.p3 + 1.8, 8, -42);
pop(T.rot112, -38); pop(T.rot0, -37);
// P4 · whoosh a la pizarra, el trapo que borra, la tiza que escribe
s("sfx/whoosh.mp3", T.p4 - 0.05, 0, { techo: -38 });
tela(T.borra[0], -38, 1); tela(T.borra[0] + 0.18, -39, 2);
s("sfx/tiza.wav", T.escribe[0], 0, { techo: -36, dur: r2(T.escribe[1] - T.escribe[0] + 0.05), fin: 0.06 });
// P5 · los rótulos, "¿Y si les avisás…?"
pop(T.rot3, -38); pop(T.rotLena, -39);
voz("f1", T.f1, -1);
// P6 · el scroll (roce) y el rebote; el remate solo
s("sfx/whoosh-short.mp3", T.p6 - 0.04, 0, { techo: -44 });
tela(T.scroll[0], -44, 1); toque(T.rebote, -40);
voz("r3", T.r3, -1);
// P7 · la campanita, los pasos de Walter, "¡Raúl! ¿Te acordás de mí?", el abrazo (palmadas), "¡Obvio, maestro!", el
// encogerse y el stinger
campana(T.campana2, -35); pasos(T.entra[0] + 0.1, T.entra[1] + 0.2, 4, -40);
pasos(T.p7 + 0.05, T.r4 - 0.15, 6, -39);   // (r2) los pasos de Raúl
voz("w2", T.w2, -1);
voz("r4", T.r4, -1); tela(T.abrazo[0], -37, 2);
tela(T.encoge2, -40, 2);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.02, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.02 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36 });
// el sábado otra vez (Q1): el salón y la parrilla
amb("sfx/salon.wav", P2, T.q2 + 0.2, -38, { desde: 12, fi: 0.3, fin: 0.3, lp: 5000 });
amb("sfx/chisporroteo.wav", T.q1c - 0.1, T.q2 + 0.1, -40, { desde: 2 });
// Q1 · el atril (pop), el bip del escaneo, la tarjeta (+1 visita), la provoleta, la ficha en la tablet, la palmada
pop(T.atril, -38);
s("sfx/click-soft.mp3", T.escanea, 0, { techo: -38, vel: 1.6 });
s("sfx/whoosh-short.mp3", T.q1b - 0.04, 0, { techo: -42 });
ding(T.visita, -36); pop(T.visita + 0.02, -40); pop(T.premio, -40);
s("sfx/whoosh-short.mp3", T.q1c - 0.04, 0, { techo: -42 }); pop(T.ficha, -40);
voz("w1", T.w1b, -1); palmada(T.palmada2, -37);
voz("r5", T.r5, -1);
// Q2 · la tablet: pop por fila, el contador que gira (tics) y el ding del 112
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -42 });
T.filas.forEach((t, i) => pop(t, -40 - (i % 2)));
for (let i = 0; i < 8; i++) tic(T.cuenta[0] + i * ((T.cuenta[1] - T.cuenta[0]) / 8), -40, i);
ding(T.cuenta[1], -35);
// Q3 · febrero: el filtro (papel), la fila roja, "Enviado ✓" (ding), el aviso que vuela (whoosh) y llega (notificación)
s("sfx/k-page-turn.wav", T.q3 + 0.05, 0, { techo: -40, vel: 1.3, dur: 0.25, fin: 0.08 }); pop(T.q3 + 0.08, -40);
pop(T.filtro, -39); ding(T.enviado, -35);
s("sfx/whoosh.mp3", T.vuela[0], 0, { techo: -39, vel: 1.1 });
noti(T.aviso, -38);
voz("g1", T.g1, -1);
// Q4 · el salón de febrero lleno (murmullo más bajo), el ventilador, la parrilla; el chip, la campanita, los pasos
amb("sfx/salon.wav", T.q4, T.q5 + 0.2, -40, { desde: 28, fi: 0.2, fin: 0.4, lp: 4500 });
amb("sfx/ventilador.wav", T.q4, T.q5 + 0.1, -44, { lp: 3000 });
amb("sfx/chisporroteo.wav", T.q4, DUR, -41, { desde: 6 });
amb("sfx/fuego.wav", T.q4, DUR, -46, { desde: 10 });
pop(T.chip17, -38); ding(T.chip17 + 0.25, -38);
campana(T.campana3, -36); pasos(T.entra2[0] + 0.1, T.entra2[1], 4, -41);
voz("w2", T.w2b, -1);
pinza(T.r6 + 0.05, -35); s("sfx/whoosh-short.mp3", T.q4c + 0.03, 0, { techo: -38 });   // (r2) el push-in del remate
voz("r6", T.r6, -1);
// Q5 · la mesada: ding de la fila de Walter, whoosh a Sofi, el pop de VUELVE, la línea chica
s("sfx/whoosh.mp3", T.q5 - 0.1, 0, { techo: -42 });
ding(T.volvio, -37); pop(T.volvio + 0.02, -41);
s("sfx/whoosh-short.mp3", T.viaje[0], 0, { techo: -42 });
voz("s1", T.s1, -1);
pop(T.vuelve + 0.02, -38);
pop(T.cierre + 0.05, -44);
// en los tramos sin voz (la ráfaga, la pizarra, la demo de la interfaz) los SFX +5 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz || o.loop) continue; if (f.startsWith("bgm/")) continue;
  if (en(t0, T.p3, T.p5) || en(t0, T.q1, T.w1b - 0.2) || en(t0, T.q2, T.g1 - 0.2)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 5); }
for (const x of S) if (x[0].startsWith("bgm/")) x[3].techo = Math.min(TECHO, (x[3].techo ?? TECHO) + 5);   // (r2) la música al techo en los tramos sin voz (debajo de la voz sigue el duck)
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.35])]; }
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
// el bus suma +6 dB antes del limitador: el techo se cumple DESPUÉS del bus (por eso -6)
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
const IRIS_C = "540px 1560px";   // el iris se abre desde el atril del QR (Q1)
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
      <div id="precarga">Raúl</div><div id="precarga2">Fabián</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el atril
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(LEN));
