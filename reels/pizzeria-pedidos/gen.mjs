// Genera todo pizzeria-pedidos desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tres.js: la escena 3D, concatenando assets/src/*.js en orden (EDITAR LAS PARTES de assets/src, no tres.js)
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro "PIZZERÍAS" del cuadro 0, el cartel "Mientras tanto, en la de
//     enfrente…", "Comentá MENÚ" y la línea chica final); las burbujas, chips, rótulos e insertos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO", formato Dos negocios: parte 1 (Pizzería Don Tano, 0 a P1), el cartel (P1 a P2, HTML debajo del
// canvas) y la parte 2 (Lucía Pizzas, la de enfrente, P2 a DUR, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// la escena 3D: las partes en orden
fs.writeFileSync("assets/tres.js", "// LO GENERA gen.mjs concatenando assets/src/*.js: editar las partes, no este archivo\n" + fs.readdirSync("assets/src").filter((f) => f.endsWith(".js")).sort().map((f) => fs.readFileSync(`assets/src/${f}`, "utf8")).join("\n"));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): t1 Tano "Una muzza y dos fainá… ¿Calle qué?" · m1 Martín
// por teléfono "¡Duvimioso Terra!" · t2 "Ajá. ¿Con be larga?" · t3 "¡Ya sale!" · f1 Facu "Tano. Dubimioso no existe." · t4
// "Cenamos." · t5 "¡Ya sale!" con la boca llena (se reusa en Q2 con filtro) · nar "Mientras tanto, en la de enfrente." ·
// m2 "¿Ya está?" · s1 Sabri "¿Martín? Una muzza y dos fainá." · t6 "¿Y esa cómo hace?" · l1 Lucía "Comentá MENÚ…"
const VOCES = ["t1", "m1", "t2", "t3", "f1", "t4", "t5", "m2", "s1", "t6", "l1"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
// dónde arranca la segunda frase dentro de cada voz (para revelar la burbuja por frase entera)
const W2 = { t1: 1.42, t2: 0.68, f1: 0.72, s1: 1.03, l1: 1.17, nar: 1.29 };
const T = { W2 };
// ---- parte 1: Pizzería Don Tano ----
// P1 · cuadro 0, viernes 21:00: Tano con el celular en el hombro, la comanda y el bollo · "Una muzza y dos fainá… ¿Calle
// qué?" · Martín por teléfono "¡Duvimioso Terra!" · inserto de la comanda: DUBIMIOSO TERA 14?? (y "Ajá." encima) · vuelve a
// Tano en "¿Con be larga?" · la burbuja muda del teléfono "¡Con V corta!"
T.t1 = 0.2; T.esc1 = [0.25, 1.3];
T.m1 = r2(T.t1 + LEN.t1 + 0.05);
T.p1i = r2(T.m1 + LEN.m1 - 0.08); T.esc2 = [r2(T.p1i + 0.06), r2(T.p1i + 0.85)];
T.t2 = r2(T.p1i + 0.4); T.p1b = r2(T.t2 + W2.t2 - 0.08); T.conV = r2(T.t2 + LEN.t2 - 0.1);
// P2 · el celular del mostrador: el chat que se apila y el contador 9 → 17 → 26; sube a Tano: "¡Ya sale!" con la masa cruda
T.p2 = r2(T.conV + 0.6); T.msgs = [0.08, 0.36, 0.6, 0.82, 1.0].map((d) => r2(T.p2 + d)); T.cont = [r2(T.p2 + 0.05), r2(T.p2 + 0.6), r2(T.p2 + 1.0)];
T.rotP2 = [r2(T.p2 + 1.1), r2(T.p2 + 1.3)];
T.p2b = r2(T.p2 + 1.8); T.mic = r2(T.p2b + 0.2); T.t3 = r2(T.p2b + 0.3);
// P3 · viernes 22:10: entra Facu con la caja (sobre el hombro de Tano) · "Tano. Dubimioso no existe." · contraplano · inserto
// de la comanda con la B en el círculo · la pausa con los rótulos
T.p3 = r2(T.t3 + LEN.t3 + 0.35); T.campana = r2(T.p3 + 0.08); T.entra = [r2(T.p3 + 0.05), r2(T.p3 + 0.95)]; T.f1 = r2(T.p3 + 0.75); T.apoyaCaja = r2(T.f1 + W2.f1 + 0.1);
T.p3b = r2(T.f1 + LEN.f1 + 0.05);
T.p3i = r2(T.p3b + 0.45); T.circ = [r2(T.p3i + 0.08), r2(T.p3i + 0.45)];
T.p3c = r2(T.p3i + 0.7); T.rotP3 = [r2(T.p3c + 0.12), r2(T.p3c + 0.35)];
// P4 · "Cenamos." (abre la caja) · Facu se saca el casco y agarra una porción · "Martín: ¿Y mi pizza?" · "¡Ya sale!" con la
// porción en la boca · stinger
T.p4 = r2(T.p3c + 1.05); T.abre = [r2(T.p4 - 0.05), r2(T.p4 + 0.45)]; T.t4 = r2(T.p4 + 0.45);
T.p4b = r2(T.t4 + LEN.t4 + 0.2); T.levanta = [r2(T.p4b + 0.12), r2(T.p4b + 0.7)];
T.p4i = r2(T.p4b + 0.85); T.mPizza = r2(T.p4i + 0.1);
T.p4c = r2(T.p4i + 0.7); T.mic2 = r2(T.p4c + 0.08); T.t5 = r2(T.p4c + 0.15);
const P1 = r2(T.t5 + LEN.t5 + 0.42);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.3));
// ---- parte 2: Lucía Pizzas, la de enfrente ----
// Q1 · viernes 21:00: la grúa cruza la calle y entra por la vidriera de Lucía (el MISMO encuadre de P1, en espejo) · la
// impresora saca dos tickets solos
T.q1 = P2; T.q1m = r2(P2 + 0.95); T.q1in = r2(P2 + 1.55); T.tks = [r2(P2 + 1.6), r2(P2 + 2.05)]; T.rotQ1 = r2(P2 + 1.7);
// Q2 · viernes 22:15: Martín en el sillón; llega el audio de Tano (el mismo "¡Ya sale!" con la boca llena) · el menú de
// Lucía: + Muzza, + Fainá × 2 · la dirección "Duvi…" → Duvimioso Terra 1432 y el pin · Pagar → Pagado ✓ · "¿Ya está?"
T.q2 = r2(P2 + 2.45); T.audio = r2(T.q2 + 0.15); T.ceja = r2(T.audio + LEN.t5 + 0.02);
T.q2i = r2(T.q2 + 1.3); T.menu = r2(T.q2i + 0.3); T.mas = [r2(T.q2i + 0.6), r2(T.q2i + 0.85), r2(T.q2i + 1.05)];
T.dir = r2(T.q2i + 1.4); T.tipea = [r2(T.dir + 0.12), r2(T.dir + 0.45)]; T.sug = r2(T.dir + 0.5); T.pin = r2(T.dir + 0.65);
T.pago = r2(T.dir + 1.2); T.pagar = r2(T.pago + 0.25); T.pagado = r2(T.pago + 0.42);
T.q2b = r2(T.pagado + 0.55); T.m2 = r2(T.q2b + 0.12);
// Q3 · la cocina de Lucía: sale el ticket #47 (la impresora de cerca) · Lucía lo corta y lo cuelga en el riel · el tablero
// #47: En horno → Listo → En camino · Sabri con el recorrido en el celular, sale
T.q3 = r2(T.m2 + LEN.m2 + 0.25); T.imprime = [r2(T.q3 + 0.05), r2(T.q3 + 0.7)];
T.q3b = r2(T.q3 + 0.9); T.corta = r2(T.q3b + 0.15); T.cuelga = [r2(T.q3b + 0.25), r2(T.q3b + 0.7)];
T.q3t = r2(T.q3b + 0.85); T.cols = [r2(T.q3t + 0.12), r2(T.q3t + 0.38), r2(T.q3t + 0.64)];
T.q3s = r2(T.q3t + 0.9);
// Q4 · viernes 22:54: la puerta de Martín · timbre · Sabri: "¿Martín? Una muzza y dos fainá." · abre la caja (el mismo
// encuadre de P4) · "Pizzería Don Tano: Disculpá, ¿calle qué?" · mira el celular, mira la pizza… y muerde
T.q4 = r2(T.q3s + 0.85); T.timbre = r2(T.q4 + 0.0); T.abreP = r2(T.q4 + 0.15); T.s1 = r2(T.q4 + 0.4);
T.q4b = r2(T.s1 + LEN.s1 - 0.1); T.abre2 = [r2(T.q4b - 0.05), r2(T.q4b + 0.45)];
T.q4i = r2(T.q4b + 0.85); T.noti = r2(T.q4i + 0.08);
T.q4c = r2(T.q4i + 0.7); T.mira = [r2(T.q4c + 0.05), r2(T.q4c + 0.45)]; T.muerde = r2(T.q4c + 0.95);
// Q5 · el panel del viernes en la tablet (64 pedidos, 3 → 0, 26 → 0) · la vereda de enfrente: Tano en la puerta con la caja
// vacía, la moto de Sabri que sale · "¿Y esa cómo hace?"
T.q5 = r2(T.q4c + 1.45); T.filas = [0.15, 0.35, 0.55].map((d) => r2(T.q5 + d)); T.gira = r2(T.q5 + 0.8); T.fila47 = r2(T.q5 + 1.25);
T.q5b = r2(T.q5 + 2.0); T.moto = r2(T.q5b - 0.1); T.t6 = r2(T.q5b + 0.45);
// C · Lucía a cámara: "Comentá MENÚ…"
T.c = r2(T.t6 + LEN.t6 + 0.25); T.l1 = r2(T.c + 0.1); T.palabraR = r2(T.l1 + 0.45);
const DUR = Math.ceil((Math.ceil((T.l1 + LEN.l1 + 0.2) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(DUR - 1.0);

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
// P1 · el rubro: "PIZZERÍAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0; se va con el
// corte al celular del mostrador (P2)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 150px; padding: 26px 6px 26px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 128px/1.06 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>PIZZERÍAS</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -420, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Mientras tanto, / en la de enfrente…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics". "en la de enfrente…" entra cuando el narrador lo dice (W2.nar).
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 650px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 118px; margin-top: 22px; }
    P .linea.c { font-size: 140px; margin-top: 8px; }
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
        ${lin("a", ["Mientras"])}
        ${lin("b", ["tanto,"])}
        ${lin("c", ["en", "la", "de"])}
        ${lin("c", ["enfrente…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? 0.05 + i * 0.03 : ${r2(W2.nar + 0.02)} + (i - nAB) * 0.025;   // "en la de enfrente…" entra cuando el narrador lo dice
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.3, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.32 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}

// C · "Comentá MENÚ" + "y te mando cómo funciona para tu pizzería", debajo de la cara de Lucía
{
  const id = "s05-palabra", ini = T.c, dur = r2(DUR - T.c + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1150px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 88px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 168px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 26px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 10px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>MENÚ</em></span></div><div class="c">y te mando cómo funciona<br>para tu pizzería</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.07, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(T.palabraR - T.c)});`,
  });
}
// la línea chica final (abajo de la tarjeta): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 70px; right: 70px; top: 1660px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Menú online con pedidos y pago</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico, libre (techo = meta medida en el MP4) }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto, medir.py).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(Math.max(0, t)), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const vibra = (t, techo = -38) => s("sfx/vibra.wav", t, 0, { techo, dur: 0.45, fin: 0.1 });
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t - 0.06, 0, { techo });
const birome = (a, b, techo = -38) => s("sfx/birome.wav", a, 0, { techo, dur: r2(b - a), fin: 0.08 });
const impresora = (t, techo = -35, f = "bsb-impresora") => s(`sfx/${f}.wav`, t, 0, { techo, pico: -10 });
const chip = (t) => { tic(t, -40, 0); whoosh(t, -46); };
// ---- parte 1: la cocina de Don Tano a full (el extractor, la música que arranca con el cuadro 0) ----
s("sfx/bsb-extractor.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -42, lp: 3000 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p3c - 0.1, T.p4, 0.75]] });
// P1 · el celular del mostrador vibra, la birome en el papel, las burbujas
vibra(0.02, -38); vibra(1.2, -42); vibra(2.6, -42);
birome(T.esc1[0], T.esc1[1], -40); birome(T.esc2[0], T.esc2[1], -38);
voz("t1", T.t1, -1);
voz("m1", T.m1, -2);
whoosh(T.p1i, -46); whoosh(T.p1b, -50);
voz("t2", T.t2, -1);
pop(T.conV, -45);
// P2 · el chat: notificación por mensaje (cada vez más seguido), tic en cada salto del contador; el micrófono
whoosh(T.p2, -49);
T.msgs.forEach((m, i) => s("sfx/notification.mp3", m - 0.03, 0, { techo: -42 + i, dur: 0.3, fin: 0.1 }));
T.cont.forEach((m, i) => tic(m + 0.05, -42, i));
T.rotP2.forEach((t) => pop(t, -44));
whoosh(T.p2b, -44); toque(T.mic, -40);
voz("t3", T.t3, -1);
// P3 · la campanita de la puerta, pasos, la caja en el mármol; el inserto con el círculo (la birome); la pausa (nada encima)
whoosh(T.p3, -46); chip(T.p3);
s("sfx/campanita.wav", T.campana, 0, { techo: -36 });
s("sfx/puerta-abre.wav", T.entra[0], 0, { techo: -42 });
pasos(T.entra[0] + 0.15, T.entra[1], 4, -45);
voz("f1", T.f1, -1);
s("sfx/k-book_place_1.wav", T.apoyaCaja, 0, { techo: -38, lp: 2500 });
whoosh(T.p3i, -46); birome(T.circ[0], T.circ[1], -38);
T.rotP3.forEach((t) => pop(t, -44));
// P4 · el cartón que se abre, "Cenamos.", la porción, el celular, "¡Ya sale!" con la boca llena
s("sfx/bsb-caja.wav", T.abre[0], 0, { techo: -36, dur: 0.8, fin: 0.2 });
voz("t4", T.t4, -1);
whoosh(T.p4b, -48);
noti(T.p4i + 0.1, -38);
toque(T.mic2, -40);
voz("t5", T.t5, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -46 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -42, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.06, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.06 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.3, fin: 0.3, techo: -46, sinDuck: true });
for (const d of [0.08, 0.32, W2.nar + 0.05, W2.nar + 0.3]) pop(P1 + d + 0.02, -45);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36, duck: [[T.q4c, T.q5 - 0.1, 0.5], [T.q5, T.q5b, 0.3]] });
// Q1 · la grúa: whoosh largo, la calle de noche, un auto lejos; adentro de Lucía la cocina más baja y ordenada; la impresora
s("sfx/whoosh.mp3", P2 + 0.05, 0, { techo: -40 });
s("sfx/calle.wav", P2, 0, { dur: r2(T.q1in - P2 + 0.3), fi: 0.2, fin: 0.3, techo: -44 });
s("sfx/auto-pasa.wav", P2 + 0.3, 0, { techo: -48, lp: 2000 });
chip(T.q1in);
s("sfx/bsb-extractor.wav", T.q1in - 0.2, 0, { dur: r2(T.q2 - T.q1in + 0.2), fi: 0.3, fin: 0.15, techo: -48, lp: 2500 });
T.tks.forEach((t, i) => impresora(t, -36, i ? "bsb-impresora2" : "bsb-impresora"));
pop(T.rotQ1, -44);
// Q2 · el living: el audio que llega y se oye por el parlante (el mismo "¡Ya sale!" con filtro de teléfono); los toques,
// el tipeo, el pin, Pagar, Pagado ✓; "¿Ya está?"
chip(T.q2);
s("sfx/notification.mp3", T.q2 + 0.02, 0, { techo: -42, dur: 0.3, fin: 0.1 });
voz("t5", T.audio, -6, { hp: 300, lp: 3400 });
whoosh(T.q2i, -46); toque(T.menu, -42);
T.mas.forEach((t) => toque(t, -38));
for (let i = 0; i < 4; i++) s("sfx/k-tick-4.wav", T.tipea[0] + i * 0.1, 0, { techo: -44, hp: 1500, vel: 1.3 });
pop(T.pin, -40);
toque(T.pagar, -38); ding(T.pagado, -36);
voz("m2", T.m2, -1);
// Q3 · el ticket #47 sale de la impresora, el papel que se corta, el tablero, la moto de Sabri que arranca
impresora(T.imprime[0], -34);
s("sfx/bsb-rasga.wav", T.corta, 0, { techo: -40, dur: 0.35, fin: 0.1 });
whoosh(T.q3t, -46); T.cols.forEach((t, i) => tic(t, -40, i));
whoosh(T.q3s, -46);
s("sfx/bsb-moto-arranca.wav", T.q3s + 0.45, 0, { techo: -38, dur: r2(T.q4 - T.q3s - 0.45), fin: 0.2 });
// Q4 · el timbre, la puerta, Sabri; el cartón; la notificación de Don Tano; la mordida
chip(T.q4);
s("sfx/bsb-timbre.wav", T.timbre, 0, { techo: -36, dur: 1.0, fin: 0.3 });
s("sfx/puerta-abre.wav", T.abreP, 0, { techo: -42 });
voz("s1", T.s1, -1);
s("sfx/bsb-caja.wav", T.abre2[0], 0, { techo: -36, dur: 0.8, fin: 0.2 });
noti(T.noti + 0.05, -38);
s("sfx/bsb-masticar.wav", T.muerde, 0, { libre: true, pico: -6, techo: -31, dur: r2(T.q5 - T.muerde), fin: 0.25 });
// Q5 · el panel: tic por fila, el 3 y el 26 que giran a 0; la moto de Sabri que sale; la calle; "¿Y esa cómo hace?"
whoosh(T.q5, -44);
T.filas.forEach((t, k) => tic(t, -40, k));
s("sfx/whoosh-short.mp3", T.gira - 0.05, 0, { techo: -44, vel: 1.4 }); ding(T.gira + 0.3, -36); tic(T.fila47, -40, 1);
s("sfx/bsb-moto-acel.wav", T.moto, 0, { techo: -36, dur: r2(T.c - T.moto + 0.2), fin: 0.4 });
s("sfx/calle.wav", T.q5b, 0, { desde: 4, dur: r2(T.c - T.q5b + 0.1), fi: 0.1, fin: 0.15, techo: -46 });
voz("t6", T.t6, -1);
// C · Lucía a cámara: pop en la tarjeta, la línea chica, la impresora saca un ticket más al final
whoosh(T.c, -46);
s("sfx/bsb-extractor.wav", T.c, 0, { dur: r2(DUR - T.c), fi: 0.2, fin: 0.3, techo: -50, lp: 2500 });
voz("l1", T.l1, -1);
pop(T.c + 0.02, -38);
pop(T.cierre + 0.05, -44);
impresora(r2(DUR - 0.75), -42, "bsb-impresora2");
// la cama +4 dB; la música hace duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) { const [f, , , o] = x; if (o.voz || o.libre) continue; if (f.startsWith("bgm/")) o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); }
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }

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
// (r1) libre: el techo es la meta medida en el MP4 (la momentánea de un SFX corto queda varios LU debajo del pico del archivo)
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, (o.libre ? o.techo : Math.min(o.techo ?? TECHO, TECHO)) - 6 - L.M, (o.pico ?? PICO) - L.pk)); };
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
const IRIS_C = "540px 960px";   // el iris se abre desde el centro (la grúa de la calle)
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
      <div id="precarga">Pizzerías</div><div id="precarga2">Dubimioso</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el centro
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
