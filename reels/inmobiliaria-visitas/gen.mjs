// Genera todo inmobiliaria-visitas desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (INMOBILIARIAS + "Viernes, 18:00." del cuadro 0, los chips de Q2 y
//     Q4, el cartel "Un registro de visitas más tarde…", "Comentá VISITAS" y la línea chica final); las burbujas de
//     diálogo y los rótulos son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), formato completo de dist-cliente-grande: parte 1 (0 a P1),
// el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): g1 Graciela por el altavoz "¿Y? ¿Hubo visitas?" (se
// reusa igual en Q3) · s1 Silvana "¿Hubo visitas en lo de Graciela?" · d1 Diego "Un montón." · ro1 Romina "Ninguna." · s2
// Silvana "Me dicen que varias, Graciela." · g2 Graciela en el balcón "Qué raro. La llave la tengo yo." · g3 Graciela
// (altavoz) "Mañana paso a buscar el cartel." · d2 Diego "Ah. Era el de Malvín." · nar "Un registro de visitas más tarde."
// · s3 Silvana "Cuatro. Y el martes vuelve una pareja." · g4 Graciela (altavoz) "Ya sé. Llamaba para chusmear." · g5
// Graciela en el balcón, contenta "Mañana paso a buscar el cartel." · so Sofi "Comentá VISITAS y te mando…"
const VOCES = ["g1", "s1", "d1", "ro1", "s2", "g2", "g3", "d2", "s3", "g4", "g5", "so"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { g2: JSON.parse(fs.readFileSync("assets/voice/palabras-g2.json", "utf8")), so: JSON.parse(fs.readFileSync("assets/voice/palabras-so.json", "utf8")) };
const palabra = (k, i) => r2(PAL[k][i].start ?? PAL[k][i].a);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: la oficina de Silvana Propiedades; del celular en altavoz: "¿Y? ¿Hubo visitas?"
T.g1 = 0.12;
// P2 · Silvana tapa el celular con la palma sobre la mesa y gira la silla; la cámara gira con ella hasta quedar detrás
T.tapa = r2(T.g1 + LEN.g1 + 0.04); T.p2 = T.tapa; T.s1 = r2(T.tapa + 0.1);
// P3 · desde atrás de Silvana: Diego "Un montón." y Romina "Ninguna." a la vez; Silvana mira a uno y a la otra
T.p3 = r2(T.s1 + LEN.s1 + 0.04); T.d1 = r2(T.p3 + 0.16); T.ro1 = r2(T.d1 + 0.08);
T.miraD = r2(T.d1 + 0.62); T.miraR = r2(T.d1 + 0.95);
// P4 · primer plano de Silvana, destapa el celular: "Me dicen que varias, Graciela."
T.p4 = r2(T.d1 + 1.0); T.destapa = r2(T.p4 + 0.05); T.s2 = r2(T.p4 + 0.15);
// P5 · el balcón de Pocitos: la grúa desde la rambla hasta Graciela; "Qué raro." · push-in a la llave POCITOS en "La llave"
T.p5 = r2(T.s2 + LEN.s2 + 0.1); T.g2 = r2(T.p5 + 0.5);
T.llave = r2(T.g2 + palabra("g2", 2) - 0.05);
// P6 · la pausa: la oficina quieta, rótulos de la plata (fichas y el gancho vacío)
T.p6 = r2(T.g2 + LEN.g2 + 0.08); T.rot = [r2(T.p6 + 0.08), r2(T.p6 + 0.3), r2(T.p6 + 0.52)];
// P7 · el celular en altavoz, de cerca: "Mañana paso a buscar el cartel." · tu-tu-tu · "Llamada finalizada"
T.p7 = r2(T.p6 + 0.85); T.g3 = r2(T.p7 + 0.05); T.cuelga = r2(T.g3 + LEN.g3 + 0.06);
// P8 · remate del remate: Diego mira la llave de su escritorio "Ah. Era el de Malvín." · P8b Silvana cierra los ojos
T.p8 = r2(T.cuelga + 0.32); T.mira = r2(T.p8 + 0.1); T.d2 = r2(T.p8 + 0.35);
T.p8b = r2(T.d2 + LEN.d2 + 0.06);
const P1 = r2(T.p8b + 0.42);                            // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.4, LEN.nar + 0.08));
// ---- parte 2 ----
// Q1 · el apartamento de Pocitos: la pareja se va saludando; Diego carga la visita en el celular (push-in ≥ 60 %)
T.q1 = P2; T.q1i = r2(P2 + 0.7); T.filasD = [0, 1, 2, 3, 4].map((i) => r2(P2 + 1.15 + i * 0.2)); T.guarda = r2(P2 + 2.3);
// Q2 · viernes 18:00, el balcón: a Graciela le llega solo el resumen (push-in ≥ 60 %); toca "Llamar" igual
T.q2 = r2(P2 + 2.8); T.vibra = r2(T.q2 + 0.12); T.q2i = r2(T.q2 + 0.3); T.filasG = [0, 1, 2, 3].map((i) => r2(T.q2 + 0.75 + i * 0.24)); T.llamaG = r2(T.q2 + 2.2);
// Q3 · el encuadre del cuadro 0, el mismo "¿Y? ¿Hubo visitas?"; Silvana mira el monitor (push-in a la ficha) "Cuatro.
// Y el martes vuelve una pareja." · Q3c el encuadre del cuadro 0: "Ya sé. Llamaba para chusmear."
T.q3 = r2(T.q2 + 2.55); T.g1b = r2(T.q3 + 0.08); T.mon = r2(T.g1b + LEN.g1 - 0.15);
T.tildes = [0, 1, 2, 3].map((i) => r2(T.mon + 0.25 + i * 0.16)); T.s3 = r2(T.g1b + LEN.g1 + 0.08);
T.q3c = r2(T.s3 + LEN.s3 + 0.02); T.g4 = r2(T.q3c + 0.08);
// Q4 · tres semanas después: la ficha (RESERVADO ✓, la comisión de rojo a verde) · Q4b el balcón: "Mañana paso a buscar
// el cartel." (contenta) y la franja VENDIDO
T.q4 = r2(T.g4 + LEN.g4 + 0.08); T.reserva = r2(T.q4 + 0.35); T.comision = r2(T.q4 + 0.7);
T.q4b = r2(T.q4 + 1.25); T.g5 = r2(T.q4b + 0.1); T.vendido = r2(T.g5 + LEN.g5 + 0.04);
// Q5 · el cierre: el monitor en verde y el celular parado con Sofi en videollamada
T.q5 = r2(T.vendido + 0.5); T.so = r2(T.q5 + 0.1);
T.palabra = r2(T.so - 0.02);
const DUR = Math.ceil((Math.ceil((T.so + LEN.so + 0.3) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 2.1));

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

// P1 · el rubro: "INMOBILIARIAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0, y el
// chip "Viernes, 18:00." debajo; se van cuando Silvana tapa el celular
{
  const id = "s00-rubro", ini = 0, dur = r2(T.s1 + 0.3);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 110px; padding: 26px 6px 28px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 108px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 338px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>INMOBILIARIAS</em></span></div></div>
      <div class="chip">Viernes, 18:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { x: -560, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}
// Q2 · el chip "Viernes, 18:00." (el balcón) · Q4 · "Tres semanas después."
for (const [id, ini, fin, txt] of [["s01-chip", r2(T.q2 - 0.02), r2(T.q3 - 0.04), "Viernes, 18:00."], ["s02-chip", r2(T.q4 - 0.02), r2(T.q4b - 0.02), "Tres semanas después."]]) {
  const dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { x: -760 }, { x: 0, duration: 0.24, ease: "back.out(1.6)", immediateRender: true }, 0.04);
      tl.to(q(".chip"), { x: -760, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.22)});`,
  });
}

// el cartel "Un registro de visitas más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  const MAS = 0.8;   // (r2) "más tarde…" entra antes (entero en ~1,4 s)   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 120px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 120px; margin-top: 12px; }
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
        ${lin("a", ["Un", "registro"])}
        ${lin("b", ["de", "visitas"])}
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


// Q5 · "Comentá VISITAS" + "y te mando cómo funciona para tu inmobiliaria", debajo de Sofi (y 1040-1460)
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1180px; padding: 22px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>VISITAS</em></span></div><div class="c">y te mando cómo funciona<br>para tu inmobiliaria</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(palabra("so", 1) + 0.02)});`,
  });
}
// la línea chica final (arriba): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 150px; padding: 16px 22px 20px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Cada visita anotada y el resumen</div><div class="a">al propietario, solo</div><div class="b">scalerics.com</div></div>`,
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
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -40) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 });
// ---- parte 1 ----
// ambiente: la oficina (zumbido bajo de aire y la calle por la vidriera) y la música
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p5 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 700 });
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(T.p5 + 0.05), fi: 0.05, fin: 0.2, techo: -50, lp: 1400 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p6 - 0.1, T.cuelga + 0.3, 0.75], [T.p8 - 0.1, P1, 0.6]] });
// P1 · Graciela por el altavoz (el filtro está en la toma)
voz("g1", T.g1, -1);
// P2 · Silvana tapa el celular (la palma en la mesa) y gira la silla (las rueditas)
s("sfx/k-cloth_2.wav", T.tapa - 0.05, 0, { techo: -40, dur: 0.3, fin: 0.1 });
s("sfx/k-creak.wav", T.tapa + 0.05, 0, { techo: -40 });
s("sfx/whoosh-short.mp3", T.p2 + 0.1, 0, { techo: -42 });
voz("s1", T.s1, -1);
// P3 · "Un montón." y "Ninguna." a la vez (pop doble)
pop(T.d1 - 0.02, -38); pop(T.ro1 - 0.02, -39);
voz("d1", T.d1, -1); voz("ro1", T.ro1, -2);
// P4 · Silvana destapa el celular
s("sfx/whoosh-short.mp3", T.p4 - 0.06, 0, { techo: -44 });
s("sfx/k-cloth_1.wav", T.destapa, 0, { techo: -42, dur: 0.25, fin: 0.08 });
voz("s2", T.s2, -1);
// P5 · el balcón: la grúa desde la rambla (whoosh), el viento, la calle abajo, una gaviota lejana; el tintineo de la llave
s("sfx/whoosh.mp3", T.p5 - 0.08, 0, { techo: -34 });
s("sfx/calle.wav", T.p5, 0, { loop: true, desde: 4, dur: r2(T.p6 - T.p5 + 0.1), fi: 0.15, fin: 0.15, techo: -46, lp: 1200 });
s("sfx/zumbido-largo.wav", T.p5, 0, { loop: true, desde: 2, dur: r2(T.p6 - T.p5 + 0.1), fi: 0.2, fin: 0.15, techo: -48, hp: 300, lp: 1500 });   // el viento del balcón (la cama de aire filtrada)
s("sfx/gaviota.wav", T.p5 + 0.35, 0, { techo: -44 });
voz("g2", T.g2, -1);
s("sfx/llaves.wav", T.llave - 0.05, 0, { techo: -38, dur: 0.6, fin: 0.2 });
// P6 · la pausa en la oficina: pop chico por rótulo
s("sfx/zumbido-largo.wav", T.p6, 0, { loop: true, dur: r2(P1 - T.p6 + 0.05), fi: 0.1, fin: 0.3, techo: -52, lp: 700 });
s("sfx/whoosh-short.mp3", T.p6 - 0.05, 0, { techo: -44 });
T.rot.forEach((t, i) => pop(t, -40 + i));
// P7 · el celular de cerca: "Mañana paso a buscar el cartel." · tu-tu-tu (el tono de colgado)
voz("g3", T.g3, -1);
s("sfx/k-dos-tonos.wav", T.cuelga, 0, { techo: -37, lp: 2600, hp: 300 });
// P8 · remate del remate: silencio de oficina, el reloj de pared; "Ah. Era el de Malvín."; el stinger lo da el cartel
s("sfx/whoosh-short.mp3", T.p8 - 0.06, 0, { techo: -46 });
for (let k = 0; k < Math.floor((P1 - T.p8) / 0.5); k++) s("sfx/tic-real.mp3", T.p8 + 0.1 + k * 0.5, 0, { techo: -44, dur: 0.15, fin: 0.04 });
voz("d2", T.d2, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -36 });
// Q1 · el apartamento: pasos de la pareja que se va, la puerta; tecleo suave por renglón; Guardar → ding
pasos(P2 + 0.05, P2 + 0.9, 4, -44);
s("sfx/puerta-abre.wav", P2 + 0.7, 0, { techo: -44, lp: 2000 });
T.filasD.forEach((t, i) => tecla(t, -40 + (i % 2)));
toque(T.guarda - 0.05, -37); ding(T.guarda + 0.05, -35);
// Q2 · el balcón: la notificación del resumen, un ding suave por renglón, el toque en "Llamar"
s("sfx/whoosh-short.mp3", T.q2 - 0.05, 0, { techo: -42 });
s("sfx/calle.wav", T.q2, 0, { loop: true, desde: 6, dur: r2(T.q3 - T.q2 + 0.05), fi: 0.15, fin: 0.15, techo: -48, lp: 1200 });
noti(T.vibra + 0.1, -34);
T.filasG.forEach((t, i) => s("sfx/ding.mp3", t, 0, { techo: -44 + (i === 3 ? 4 : 0), hp: 600 }));
toque(T.llamaG, -36); s("sfx/k-tono.wav", T.llamaG + 0.08, 0, { techo: -40, vel: 0.85, dur: 0.3, fin: 0.06, lp: 2600, hp: 300 });
// Q3 · la oficina: el mismo "¿Y? ¿Hubo visitas?", la ficha (ding por tilde), "Cuatro…", "Ya sé…"
s("sfx/zumbido-largo.wav", T.q3, 0, { loop: true, dur: r2(T.q4b - T.q3), fi: 0.1, fin: 0.2, techo: -52, lp: 700 });
voz("g1", T.g1b, -1);
s("sfx/whoosh-short.mp3", T.mon - 0.05, 0, { techo: -42 });
T.tildes.forEach((t, i) => ding(t, -40 + i));
voz("s3", T.s3, -1);
voz("g4", T.g4, -1);
// Q4 · la ficha tres semanas después (RESERVADO ✓, la comisión gira a verde), el balcón y la franja VENDIDO
s("sfx/whoosh-short.mp3", T.q4 - 0.05, 0, { techo: -42 });
pop(T.reserva, -38); ding(T.reserva + 0.03, -37);
s("sfx/whoosh-short.mp3", T.comision - 0.04, 0, { techo: -44 }); ding(T.comision + 0.06, -42);
s("sfx/whoosh-short.mp3", T.q4b - 0.12, 0, { techo: -47 });
s("sfx/calle.wav", T.q4b, 0, { loop: true, desde: 2, dur: r2(T.q5 - T.q4b + 0.05), fi: 0.45, fin: 0.15, techo: -48, lp: 1200 });
s("sfx/gaviota.wav", T.q4b + 0.2, 0, { techo: -46 });
voz("g5", T.g5, -1);
s("sfx/whoosh-short.mp3", T.vendido - 0.08, 0, { techo: -38 }); pop(T.vendido + 0.08, -34); ding(T.vendido + 0.12, -34);
// Q5 · el cierre: Sofi; pop en VISITAS; la línea chica
s("sfx/whoosh-short.mp3", T.q5 - 0.06, 0, { techo: -44 });
s("sfx/zumbido-largo.wav", T.q5, 0, { loop: true, dur: r2(DUR - T.q5), fi: 0.1, fin: 0.4, techo: -54, lp: 700 });
voz("so", T.so, -1);
pop(T.palabra + 0.02, -38); pop(T.so + palabra("so", 1) + 0.02, -40);
pop(T.cierre + 0.05, -44);
// la cama +3 dB; en los tramos sin voz (la grúa al balcón, la pausa, Q1, Q2, la ficha) los SFX +5 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; }
  if (en(t0, T.p5 - 0.2, T.g2) || en(t0, T.p6 - 0.1, T.g3) || en(t0, P2, T.q3) || en(t0, T.q4 - 0.1, T.q4b - 0.25)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 5); }
// la música: duck debajo de cada voz (~0,7) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.3])]; }
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
const IRIS_C = "540px 1100px";   // el iris se abre desde el celular de Diego (Q1)
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
      <div id="precarga">Visitas</div><div id="precarga2">Pocitos ¿6?</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Diego
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.q5} (${r2(DUR - T.q5)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
