// Genera todo dist-cliente-grande desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas y el led del altavoz)
//   - compositions/*.html: la capa plana de arriba (DISTRIBUIDORAS + "Noviembre." del cuadro 0, el chip "Miércoles,
//     8:10.", el cartel "Un aviso automático más tarde…", "Comentá CLIENTES" y la línea chica final); las burbujas de
//     diálogo, los rótulos y los audios son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), formato completo de dist-pedidos-lunes: parte 1 (0 a P1),
// el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): c1 contador "Rubén, ¿y Héctor?" (se reusa en Q4) · r1
// Rubén "¿Héctor? Compra todos los martes." (se reusa en Q4) · c2 contador "Compraba." · n1 Nico "Yo pensé que lo llamabas
// vos." · h1 Héctor "¡Rubén! ¿Cerraste? Dejé de pedir y nadie me llamó." · r2 Rubén "Te extrañó el contador." · h2 Héctor
// "Llamame el martes." · nar "Un aviso automático más tarde." · n2 Nico "¡Héctor! Ayer no pediste. ¿Todo bien?" · h3
// Héctor "¡Uh, se me pasó! Mandame lo de los martes." · c3 contador "Compra." · r3 Rubén "Comentá CLIENTES y te mando…"
const VOCES = ["c1", "r1", "c2", "n1", "h1", "r2", "h2", "n2", "h3", "c3", "r3"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = JSON.parse(fs.readFileSync("assets/voice/palabras-r3.json", "utf8"));   // tiempos por palabra de r3 (CLIENTES)
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: la oficina de tarde; el contador por el altavoz "Rubén, ¿y Héctor?"; Rubén con el mate "¿Héctor? Compra
// todos los martes."; pausa; "Compraba." (la bombilla se frena a medio camino)
T.c1 = 0.12; T.r1 = r2(T.c1 + LEN.c1 + 0.12); T.c2 = r2(T.r1 + LEN.r1 + 0.55);   // (r1) pausa de 0,55 s antes de "Compraba."
T.frena = r2(T.c2 + 0.05);                       // el sorbo se corta
// P2 · la grúa sale por el vidrio y baja a la zona de armado; frena en "HÉCTOR · MARTES" (el rincón del operario)
T.p2 = r2(T.c2 + LEN.c2 + 0.18); T.llega = r2(T.p2 + 0.95);
T.rot = [r2(T.llega + 0.05), r2(T.llega + 0.3), r2(T.llega + 0.55)];
T.saluda = r2(T.llega - 0.2);
// P3 · Nico asomado a la puerta "Yo pensé que lo llamabas vos."; Rubén gira la silla
T.p3 = r2(T.rot[2] + 0.6); T.n1 = r2(T.p3 + 0.15); T.gira = r2(T.n1 + LEN.n1 - 0.3);
// P4 · la vereda del Súper Héctor: el portazo del auto; Héctor sale con los brazos abiertos
T.p4 = r2(T.n1 + LEN.n1 + 0.22); T.portazo = r2(T.p4 + 0.2); T.sale = [r2(T.p4 + 0.05), r2(T.p4 + 0.7)];
T.h1 = r2(T.p4 + 0.4); T.p4b = r2(T.h1 + 0.85);
// P5 · la pausa: Rubén mira el camión gris · P5b contraplano: el camión gris descargando en el súper, el chofer cierra
T.p5 = r2(T.h1 + LEN.h1 + 0.08); T.p5b = r2(T.p5 + 0.35); T.cierra = [r2(T.p5b + 0.2), r2(T.p5b + 0.38)];
// P6 · el remate: primer plano de Rubén
T.p6 = r2(T.p5b + 0.6); T.r2 = r2(T.p6 + 0.12);
// P7 · remate del remate: Héctor con la caja "Llamame el martes." · P7b Nico pega el post-it en el tablero · P7c el auto
// arranca, el post-it sale volando por la ventanilla y se pega en la puerta del camión gris (push-in hasta que se lea)
T.p7 = r2(T.r2 + LEN.r2 + 0.1); T.h2 = r2(T.p7 + 0.05);
T.p7b = r2(T.h2 + LEN.h2 + 0.02); T.pega = r2(T.p7b + 0.35);
T.p7c = r2(T.p7b + 0.68); T.arranca = r2(T.p7c); T.vuela = [r2(T.p7c + 0.12), r2(T.p7c + 0.68)];
const P1 = r2(T.p7c + 1.12);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.15, LEN.nar + 0.08));
// ---- parte 2 ----
// Q1 · miércoles 8:10, el auto de Nico en el semáforo: el celular del soporte avisa solo; Nico toca Llamar; "tuu"
T.q1 = P2; T.vibra = r2(P2 + 0.25); T.q1i = r2(P2 + 0.2); T.noti = r2(P2 + 0.62);
T.llamar = r2(P2 + 1.3); T.n2 = r2(T.llamar + 0.5);
// Q2 · la vereda (sin camión): Héctor atiende en la puerta "¡Uh, se me pasó!…" · Q2i inserto: Pedido
T.q2 = r2(T.n2 + LEN.n2 + 0.06); T.h3 = r2(T.q2 + 0.1);
T.q2i = r2(T.h3 + LEN.h3 + 0.03); T.pedido = r2(T.q2i + 0.12);
// Q3 · la zona de armado: Darío pliega la reposera y se va; el pallet de Héctor se llena por capas · Q3b la ficha
T.q3 = r2(T.q2i + 0.75); T.pliega = [r2(T.q3 + 0.1), r2(T.q3 + 0.35), r2(T.q3 + 0.6)];
T.capas = [r2(T.q3 + 0.5), r2(T.q3 + 0.72), r2(T.q3 + 0.94)];
T.grua2 = [r2(T.q3 + 1.15), r2(T.q3 + 1.8)]; T.hueco = r2(T.q3 + 1.65);
// Q4 · (r1) el panel en grande primero (cuenta 4 → 0) con el mismo "Rubén, ¿y Héctor?"; Q4r el encuadre del cuadro 0
// para el mismo "¿Héctor? Compra todos los martes."; Q4b el panel y "Compra." (pausa de 0,55 s)
T.q4 = r2(T.q3 + 2.15); T.c1b = r2(T.q4 + 0.1); T.tildes = [0, 1, 2, 3].map((i) => r2(T.q4 + 0.15 + i * 0.18)); T.cero = r2(T.q4 + 0.9);
T.r1b = r2(T.c1b + LEN.c1 + 0.12); T.q4r = r2(T.r1b - 0.12); T.q4b = r2(T.r1b + LEN.r1 + 0.05); T.c3 = r2(T.r1b + LEN.r1 + 0.55); T.tildeH = r2(T.c3 + 0.05);
// C · Rubén a cámara: "Comentá CLIENTES y te mando cómo funciona para tu distribuidora."
T.c = r2(T.c3 + LEN.c3 + 0.25); T.r3 = r2(T.c + 0.2);
T.palabra = r2(T.r3 + Math.max(0.4, PAL.find((p) => /client/i.test(p.w))?.a ?? 0.45) - 0.05);
const DUR = Math.ceil((Math.ceil((T.r3 + LEN.r3 + 0.3) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 2.3));

// ---------- envolventes de las voces a 30 cuadros por segundo (para mover la boca y el led del altavoz) ----------
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
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); }`;

// P1 · el rubro: "DISTRIBUIDORAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0, y el
// chip "Noviembre." debajo; se van con la grúa (P2)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 130px; padding: 26px 6px 28px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 104px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 352px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>DISTRIBUIDORAS</em></span></div></div>
      <div class="chip">Noviembre.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { x: -560, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}
// Q1 · el chip "Miércoles, 8:10." (entra con el iris, se va antes de Q2)
{
  const id = "s01-chip", ini = r2(P2 - 0.05), dur = r2(T.n2 - 0.12 - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">Miércoles, 8:10.</div>`,
    js: `      tl.fromTo(q(".chip"), { x: -560 }, { x: 0, duration: 0.28, ease: "back.out(1.6)", immediateRender: true }, 0.12);
      tl.to(q(".chip"), { x: -560, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Un aviso automático más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  const MAS = r2(Math.min(dur - 0.5, LEN.nar * 0.62));   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 120px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 124px; margin-top: 12px; }
    P .linea.c { font-size: 146px; margin-top: 18px; }
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
        ${lin("a", ["Un", "aviso"])}
        ${lin("b", ["automático"])}
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

// C · "Comentá CLIENTES" + "y te mando cómo funciona para tu distribuidora", debajo de la cara de Rubén (y 1000-1480)
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1060px; padding: 22px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>CLIENTES</em></span></div><div class="c">y te mando cómo funciona<br>para tu distribuidora</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.35);`,
  });
}
// la línea chica final (arriba, sobre la cabeza de Rubén): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 64px; padding: 16px 22px 20px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 40px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 58px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">CRM: la ficha de cada cliente</div><div class="a">y el aviso cuando deja de pedir</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: -420 }, { y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, 0.0);
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
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -40) => { techo = Math.min(-33, techo + 5); s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const clac = (t, techo = -38) => s("sfx/k-metal-click.wav", t, 0, { techo });
const caja = (t, techo = -36) => s("sfx/k-book_place_1.wav", t, 0, { techo, lp: 1800, vel: 0.8 });
// ---- parte 1 ----
// ambiente: la oficina arriba del depósito (zumbido bajo) y la música; la radio de Darío en el depósito
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p4 + 0.1), fi: 0.05, fin: 0.3, techo: -52, lp: 600 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p5 - 0.05, T.p7, 0.75]] });
// P1 · el contador (con filtro de altavoz en la toma), el sorbo de mate de Rubén, el sorbo que se corta en seco
voz("c1", T.c1, -1);
s("sfx/sorbo.wav", T.r1 + LEN.r1 + 0.02, 0, { techo: -40, dur: 0.3, fin: 0.12, hp: 600 });
voz("r1", T.r1, -1);
voz("c2", T.c2, -1);
s("sfx/sorbo.wav", T.frena + LEN.c2 - 0.1, 0, { techo: -38, dur: 0.14, fin: 0.03, hp: 700 });
// P2 · la grúa (whoosh), la radio de Darío (la cama filtrada como radio portátil), pop por rótulo, tic en el $ 456.000
s("sfx/whoosh.mp3", T.p2 - 0.05, 0, { techo: -31 });   // (r1) la zambullida más presente: tapa el hueco
s("bgm/pizzicato.wav", T.p2 + 0.05, 0, { desde: 6, dur: r2(T.p3 - T.p2 + 0.05), fi: 0.05, fin: 0.25, techo: -40, hp: 500, lp: 2600, sinDuck: true });
T.rot.forEach((t, i) => pop(t, -40 + i));
for (let k = 0; k < 8; k++) tic(T.rot[2] + 0.04 + k * 0.05, -44, k);
// P3 · la grúa vuelve (whoosh corto), el picaporte de la puerta
s("sfx/whoosh-short.mp3", T.p3 - 0.08, 0, { techo: -40 });
s("sfx/k-metal-click.wav", T.p3 + 0.05, 0, { techo: -40 });
voz("n1", T.n1, -1);
s("sfx/k-creak.wav", T.gira, 0, { techo: -40 });   // (r1) la silla que gira
// P4 · la vereda: la calle de fondo, pájaros, el auto que frena, el portazo, la zorra
s("sfx/calle.wav", T.p4, 0, { loop: true, dur: r2(P1 - T.p4 + 0.05), fi: 0.08, fin: 0.25, techo: -44 });
s("sfx/pajaro.wav", T.p4 + 0.6, 0, { techo: -46 });
s("sfx/auto-entra.wav", T.p4 - 0.35, 0, { techo: -38, dur: 0.6, fin: 0.2 });
s("sfx/puerta-auto.wav", T.portazo, 0, { techo: -36 });
s("sfx/k-neumatico-abre.wav", T.p4 + 0.1, 0, { techo: -48, lp: 1500 });
voz("h1", T.h1, -1);
// P5 · la pausa: las puertas del camión gris (dos hojas)
s("sfx/whoosh-short.mp3", T.p5b - 0.05, 0, { techo: -44 });
s("sfx/k-metal-pesado-0.wav", T.cierra[0], 0, { techo: -37 });
s("sfx/k-metal-pesado-2.wav", T.cierra[1], 0, { techo: -38 });
// P6 · el remate
voz("r2", T.r2, -1);
// P7 · remate del remate: "Llamame el martes."; el post-it (pop), el motor, el aleteo del papel, el pop seco en la chapa
voz("h2", T.h2, -1);
s("sfx/papel.wav", T.p7b + 0.05, 0, { techo: -42, dur: 0.25, fin: 0.08, hp: 1500 });
pop(T.pega, -38);
s("sfx/motor.mp3", T.arranca - 0.05, 0, { techo: -31, dur: 1.0, fin: 0.3 });
s("sfx/k-page-turn.wav", T.vuela[0], 0, { techo: -40, vel: 1.3 });
s("sfx/hoja.mp3", T.vuela[0] + 0.15, 0, { techo: -33 });
pop(T.vuela[1], -33); s("sfx/k-plastico.wav", T.vuela[1], 0, { techo: -38 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36 });
// Q1 · el auto en el semáforo (calle de fondo), el aviso (vibra + notificación), el toque en Llamar, el tono
s("sfx/calle.wav", P2, 0, { loop: true, desde: 3, dur: r2(T.q3 - P2), fi: 0.2, fin: 0.25, techo: -46, lp: 1800 });
s("sfx/vibra.wav", T.vibra, 0, { techo: -38, dur: 0.5, fin: 0.1 });
s("sfx/whoosh-short.mp3", T.noti - 0.12, 0, { techo: -40 }); noti(T.noti, -34); pop(T.noti + 0.04, -38);   // (r1) la notificación cuando entra el aviso en grande
toque(T.llamar, -36); s("sfx/k-tono.wav", T.llamar + 0.06, 0, { techo: -37, vel: 0.85, dur: 0.3, fin: 0.06, lp: 2600, hp: 300 });   // (r1) el "tuu" de la llamada
voz("n2", T.n2, -1);
// Q2 · Héctor en la puerta (pájaros), el inserto: Pedido ✓ (ding)
s("sfx/pajaro.wav", T.q2 + 0.3, 0, { techo: -46 });
voz("h3", T.h3, -1);
s("sfx/whoosh-short.mp3", T.q2i - 0.04, 0, { techo: -44 }); ding(T.pedido, -35);
// Q3 · la reposera que se pliega (tres clac), pop por capa del pallet, whoosh de la grúa, ding del hueco verde
s("sfx/zumbido-largo.wav", T.q3, 0, { loop: true, dur: r2(DUR - T.q3), fi: 0.1, fin: 0.5, techo: -54, lp: 600 });
T.pliega.forEach((t, i) => clac(t, -37 + i));
T.capas.forEach((t, i) => { caja(t, -36); pop(t + 0.02, -42 + i); });
s("sfx/whoosh-short.mp3", T.q3 - 0.05, 0, { techo: -40 }); pasos(T.q3 + 0.45, T.q3 + 1.3, 5, -42);   // (r1) el corte a la zona y los pasos de Darío
s("sfx/whoosh-short.mp3", T.grua2[0] - 0.02, 0, { techo: -40 });
ding(T.hueco, -35);
// Q4 · el panel: pop por tilde, tic del contador 4 → 0; el mismo contador y el mismo Rubén; "Compra." y la tilde verde
T.tildes.forEach((t, i) => pop(t + 0.02, -44 + i));
for (let k = 0; k < 4; k++) tic(T.cero - 0.3 + k * 0.08, -44, k);
ding(T.cero + 0.02, -38);
voz("c1", T.c1b, -1);
voz("r1", T.r1b, -1);
s("sfx/sorbo.wav", T.r1b + LEN.r1 + 0.02, 0, { techo: -40, dur: 0.45, fin: 0.15, hp: 500 });
voz("c3", T.c3, -1);
ding(T.tildeH, -36);
// C · Rubén a cámara; pop en CLIENTES; la línea chica
s("sfx/whoosh-short.mp3", T.c - 0.06, 0, { techo: -46 });
voz("r3", T.r3, -1);
pop(T.palabra + 0.02, -38);
pop(T.cierre + 0.05, -44);
// la cama +4 dB y, en los tramos sin voz (la grúa, la pausa del auto, el pallet), los SFX +5 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.p2, T.p3 - 0.2) || en(t0, T.p7b, P1) || en(t0, T.q3, T.c1b - 0.3)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 5); }
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.32])]; }   // (r1) la cama más presente bajo la voz
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
  fs.writeFileSync("assets/audio/ganancia.txt", String(r2(OBJ - I)));
  fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 1000px";   // el iris se abre desde el celular del soporte (Q1)
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
      <div id="precarga">Héctor</div><div id="precarga2">MARTES</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular del auto
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
