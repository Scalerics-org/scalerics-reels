// Genera todo tienda-tenes-stock desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (IMPORTADORAS + "Lunes, 10:00." del cuadro 0, los chips de Q1 y Q4,
//     el cartel "Una tienda online más tarde…", "Comentá STOCK" y la línea chica final); las burbujas de diálogo, los
//     rótulos y las notificaciones son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), formato completo de inmobiliaria-visitas: parte 1 (0 a
// P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): g1 Graciela (audio de chat) "Pao, ¿tenés stock de la
// verde?" · pa1 Paola "¡Sí! La última. Hoy te la mando." · mi1 Mica "¡Pao! La verde la vendí en el local." (se reusa
// igual en Q1) · pa2 Paola "Graciela, perdoname: se me agotó." · g2 Graciela (audio) "Ay. Bueno, la compro en otro lado."
// · mi2 Mica "Pao. ¿Y estas cajas?" · pa3 Paola "Del contenedor de marzo." · pa4 Paola "¡Hola! ¡Ingreso nuevo!" (se
// reusa igual en Q4) · nar "Una tienda online más tarde." · pa5 Paola "Ya lo sabe la tienda." · g3 Graciela "Queda una.
// ¡Mía!" · pa6 Paola "Ya se enteraron." · pa7 Paola "Comentá STOCK y te mando cómo funciona para tu importadora."
const VOCES = ["g1", "pa1", "mi1", "pa2", "g2", "mi2", "pa3", "pa4", "pa5", "g3", "mi3", "pa6", "pa7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = Object.fromEntries(["g1", "g2", "mi1", "mi2", "pa7"].map((k) => [k, JSON.parse(fs.readFileSync(`assets/voice/palabras-${k}.json`, "utf8"))]));
const palabra = (k, i) => r2(PAL[k][i].start ?? PAL[k][i].a);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el depósito, la mesa de fotos con la freidora verde, el aro de luz y Paola; del celular del aro, el
// audio de Graciela: "Pao, ¿tenés stock de la verde?"
T.g1 = 0.06;
// P2 · el cuaderno colgado del pilar ("VERDE: 1") y Paola detrás, segura: "¡Sí! La última. Hoy te la mando."
T.p2 = r2(T.g1 + LEN.g1 - 0.25); T.pa1 = r2(T.g1 + LEN.g1 + 0.02);
// P3 · plano general: "Pagado ✓" en el celular; Mica entra del local, levanta la verde de la mesa y se la lleva
T.p3 = r2(T.pa1 + LEN.pa1 + 0.04); T.pagado = r2(T.p3 + 0.02); T.mi1 = r2(T.p3 + 0.12);
T.agarra = r2(T.p3 + 0.85); T.sale = r2(T.agarra + 0.35);
// P4 · primer plano de Paola con el celular al pecho: "Graciela, perdoname: se me agotó." · "Reintegro" · (r1) el audio
// de vuelta de Graciela arranca sobre P4 (sin el inserto del chat); P5b el hueco iluminado y, después de "lado.", los rótulos
T.p4 = r2(T.mi1 + LEN.mi1 + 0.05); T.pa2 = r2(T.p4 + 0.06); T.reint = r2(T.pa2 + LEN.pa2 - 0.55);
T.g2 = r2(T.pa2 + LEN.pa2 + 0.06); T.p5 = r2(T.g2 + 1.0); T.p5b = T.p5;
T.rot = [r2(T.g2 + LEN.g2 + 0.05), r2(T.g2 + LEN.g2 + 0.3)];
// P6 · el remate: plano bajo de la mesa de fotos; Mica levanta el papel desde abajo: 8 cajas VERDE · "Pao. ¿Y estas cajas?"
T.p6 = r2(T.rot[1] + 0.42); T.sube = r2(T.p6 + 0.05); T.subeFin = r2(T.sube + 0.55); T.p6b = T.p6; T.mi2 = r2(T.subeFin - 0.05);   // (r2) un solo plano: Mica parada e inclinada sube el papel
// P7 · primer plano de Paola, cara de nada: "Del contenedor de marzo." · P7b la pared de cajas verdes (rótulos)
T.p7 = r2(T.mi2 + LEN.mi2 + 0.06); T.pa3 = r2(T.p7 + 0.28); T.p7b = r2(T.pa3 + LEN.pa3 - 0.4);
T.rot2 = [r2(T.p7b + 0.1), r2(T.p7b + 0.35)];
// P8 · remate del remate: Paola levanta el celular en modo historia: "¡Hola! ¡Ingreso nuevo!" · P8b contraplano (la historia)
T.p8 = r2(T.p7b + 0.92); T.levanta = r2(T.p8 + 0.1); T.pa4 = r2(T.p8 + 0.42); T.p8b = r2(T.pa4 + 0.62);
const P1 = r2(T.pa4 + LEN.pa4 + 0.12);                 // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 2.45);                               // (r1) cartel de 2,45 s (el narrador con atempo 1,1)
// ---- parte 2 ----
// Q1 · "Otro lunes." El local: Mica le da a Walter una caja verde (el MISMO "¡Pao! La verde la vendí en el local.");
// en la tablet del local "Venta en el local · Verde −1" · Q1b el depósito: Paola, sin levantar la vista, "Ya lo sabe la
// tienda." · Q1i el catálogo en su celular: Verde "Quedan 2" → "Queda 1"
T.q1 = P2; T.mi1b = r2(P2 + 0.2); T.entrega = r2(P2 + 0.3); T.ventaL = r2(P2 + 1.3);
T.q1b = r2(T.mi1b + LEN.mi1 + 0.4); T.pa5 = r2(T.q1b + 0.1); T.q1i = r2(T.pa5 + 0.5); T.baja = r2(T.q1i + 0.3);
// Q2 · el living de Graciela: "Queda una. ¡Mía!" · Comprar · envío · Pagar · Pagado ✓ · "Sin stock" sola (0,3-0,45 s por paso)
T.q2 = r2(T.baja + 1.0); T.g3 = r2(T.q2 + 0.15); T.q2i = r2(T.q2 + 0.7);
T.comprar = r2(T.g3 + 1.25); T.envio = r2(T.comprar + 0.35); T.pagar = r2(T.envio + 0.35); T.pagadoG = r2(T.pagar + 0.25); T.sinStock = r2(T.pagadoG + 0.45);
// Q3 · (r1) un solo plano de la tablet: el pedido #214 pago (Listo para despachar ✓) y el pedido por mayor (Azul 25 → 15);
// Mica: "¡Diez azules para el Bazar!"
T.q3 = r2(T.sinStock + 1.3); T.listo = r2(T.q3 + 0.4); T.mayor = r2(T.q3 + 0.85); T.mi3 = r2(T.mayor + 0.05); T.azul = r2(T.mayor + 0.5);
// Q4 · "Llegó el contenedor." Mica lee las cajas (3 lecturas); Q4t la tablet: Verde 0 → 36, "Sin stock" → "Quedan 36" ·
// Q4b Paola levanta el celular, el mismo encuadre de P8: el MISMO "¡Hola! ¡Ingreso nuevo!" · Q4c la historia: le llueven
// 12 pedidos pagos (Quedan 36 → 24) · Q4d baja el celular: "Ya se enteraron."
T.q4 = r2(Math.max(T.mi3 + LEN.mi3 + 0.3, T.azul + 1.0)); T.scan = [0, 1, 2].map((i) => r2(T.q4 + 0.6 + i * 0.2)); T.q4t = r2(T.q4 + 1.0); T.quedan40 = r2(T.q4t + 0.5);
T.q4b = r2(T.q4t + 1.5); T.levanta2 = r2(T.q4b + 0.08); T.pa4b = r2(T.q4b + 0.3); T.q4c = r2(T.pa4b + 0.62);
T.notis = Array.from({ length: 12 }, (_, i) => r2(T.pa4b + 1.0 + i * 0.085));
T.q4d = r2(Math.max(T.notis[11] + 0.45, T.pa4b + LEN.pa4 + 0.05)); T.pa6 = r2(T.q4d + 0.08);
// Q5 · el cierre: Paola graba su historia, de frente: "Comentá STOCK y te mando cómo funciona…"
T.q5 = r2(T.pa6 + LEN.pa6 - 0.12); T.pa7 = r2(T.pa6 + LEN.pa6 + 0.02);
T.palabra = r2(T.pa7 - 0.02);
const DUR = Math.ceil((Math.ceil((T.pa7 + LEN.pa7 + 0.18) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.pa7 + 0.9, DUR - 2.1));

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

// P1 · el rubro: "IMPORTADORAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0, y el
// chip "Lunes, 10:00." debajo; se van cuando la cámara va al cuaderno
{
  const id = "s00-rubro", ini = 0, dur = r2(T.pa1 + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 44px; right: 44px; top: 110px; padding: 26px 6px 28px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 104px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 342px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>IMPORTADORAS</em></span></div></div>
      <div class="chip">Lunes, 10:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { x: -560, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}
// Q1 · el chip "Otro lunes." · Q4 · "Llegó el contenedor."
for (const [id, ini, fin, txt] of [["s01-chip", r2(T.q1 + 0.02), r2(T.q1 + 1.55), "Otro lunes."], ["s02-chip", r2(T.q4 - 0.02), r2(T.q4t - 0.02), "Llegó el contenedor."]]) {
  const dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.6, opacity: 0, transformOrigin: "0% 50%" }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.02);
      tl.to(q(".chip"), { scale: 0.6, opacity: 0, duration: 0.14, ease: "power2.in" }, ${r2(dur - 0.16)});`,
  });
}

// el cartel "Una tienda online más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  const MAS = 1.0;    // "más tarde…" entra cuando el narrador dice "más" (1,2 s)
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 120px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 132px; margin-top: 12px; }
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
        ${lin("a", ["Una", "tienda"])}
        ${lin("b", ["online"])}
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
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.06, ease: "power2.in" }, ${r2(dur - 0.38)});   // se va antes del iris`,
  });
}



// Q5 · "Comentá STOCK" + "y te mando cómo funciona para tu importadora", debajo de la cara de Paola (y 1080-1500)
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1190px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 140px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>STOCK</em></span></div><div class="c">y te mando cómo funciona<br>para tu importadora</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(palabra("pa7", 1) + 0.02)});`,
  });
}
// la línea chica final (arriba de todo, debajo de la tarjeta): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1610px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Tu tienda online con el stock real</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.0);
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
const s = (f, t, db, o = {}) => S.push([f, r2(Math.max(0, t)), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, pan = 0) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, pan }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const audioEntra = (t) => { s("sfx/whoosh-short.mp3", t - 0.12, 0, { techo: -46 }); s("sfx/k-tick-2.wav", t - 0.04, 0, { techo: -42 }); };   // (r1) sin blip.mp3 (sin origen)
// ---- parte 1 ----
// ambiente: el depósito (zumbido de los tubos, la calle lejana por el local) y la música
s("sfx/zumbido.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -50, lp: 900 });
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 1100 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.rot[0] - 0.3, T.p6 + 0.2, 0.6], [T.p7 - 0.1, T.p8, 0.6], [T.p8, P1, 0.5]] });
// P1 · el click de la foto, el audio que entra
s("sfx/k-switch-3.wav", 0.05, 0, { techo: -40 });   // el click de la foto (Kenney, CC0)
audioEntra(T.g1); voz("g1", T.g1, -1);
// P2 · la cámara va al cuaderno; Paola contesta; "Pagado ✓"
s("sfx/whoosh-short.mp3", T.p2 + 0.05, 0, { techo: -46 });
voz("pa1", T.pa1, -1);
noti(T.pa1 + LEN.pa1 + 0.28, -37); pop(T.pa1 + LEN.pa1 + 0.15, -41);
// P3 · Mica entra (pasos), levanta la freidora (roce), se va; la campanita del local
pasos(T.p3 + 0.05, T.agarra - 0.1, 4, -44);
s("sfx/k-plastico.wav", T.agarra - 0.03, 0, { techo: -40 });
pasos(T.sale + 0.1, T.p4 - 0.05, 4, -46);
voz("mi1", T.mi1, -1);
s("sfx/campanita.wav", T.p4 - 0.35, 0, { techo: -48, lp: 3000 });
// P4 · el toque en el celular; "Reintegro"
s("sfx/whoosh-short.mp3", T.p4 - 0.05, 0, { techo: -46 });
voz("pa2", T.pa2, -1);
toque(T.reint - 0.1, -40); s("sfx/glitch-1.mp3", T.reint, 0, { techo: -44, dur: 0.25, fin: 0.08 });
// P5 · el audio de vuelta de Graciela; los rótulos de la plata
audioEntra(T.g2); voz("g2", T.g2, -1);
s("sfx/whoosh-short.mp3", T.p5 - 0.05, 0, { techo: -48 });
T.rot.forEach((t, i) => pop(t, -40 + i));
// P6 · el papel que se enrolla hacia arriba, el golpe sordo de las cajas a la vista
s("sfx/whoosh-short.mp3", T.p6 - 0.05, 0, { techo: -46 });
s("sfx/papel-fuerte.mp3", T.sube + 0.18, 0, { techo: -38 });
s("sfx/papel.wav", T.sube + 0.42, 0, { techo: -42 });
s("sfx/madera-golpe.wav", T.subeFin - 0.1, 0, { techo: -40, lp: 1200 });
voz("mi2", T.mi2, -1);
// P7 · silencio de depósito y el zumbido; el whoosh a la pared y los rótulos
s("sfx/zumbido.wav", T.p7, 0, { techo: -50, dur: r2(T.p8 - T.p7), fi: 0.1, fin: 0.2, loop: true, lp: 1600 });
voz("pa3", T.pa3, -1);
s("sfx/whoosh-short.mp3", T.p7b - 0.06, 0, { techo: -42 });
T.rot2.forEach((t, i) => pop(t, -39 + i));
// P8 · el click de grabar; "¡Hola! ¡Ingreso nuevo!"; el stinger lo da el cartel
s("sfx/k-cloth_1.wav", T.levanta, 0, { techo: -44, dur: 0.3, fin: 0.1 });
s("sfx/click-soft.mp3", T.pa4 - 0.12, 0, { techo: -38 });
voz("pa4", T.pa4, -1);
s("sfx/whoosh-short.mp3", T.p8b - 0.05, 0, { techo: -48 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 5.85, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -33 });
s("sfx/zumbido.wav", P2, 0, { loop: true, dur: r2(DUR - P2), fi: 0.3, fin: 0.4, techo: -44, lp: 900 });
s("sfx/calle.wav", P2, 0, { loop: true, desde: 8, dur: r2(DUR - P2), fi: 0.3, fin: 0.4, techo: -40, lp: 1300 });
// Q1 · el local: la campanita, la caja que pasa por el mostrador, el tic de la tablet; el depósito; el número que baja
s("sfx/campanita.wav", P2 + 0.05, 0, { techo: -42 });
s("sfx/calle.wav", P2, 0, { loop: true, desde: 3, dur: r2(T.q1b - P2 + 0.05), fi: 0.2, fin: 0.15, techo: -48, lp: 1400 });
s("sfx/k-bolsa-0.wav", T.entrega + 0.5, 0, { techo: -42 });
voz("mi1", T.mi1b, -1);
toque(T.ventaL - 0.08, -40); ding(T.ventaL, -40);
s("sfx/whoosh-short.mp3", T.q1b - 0.06, 0, { techo: -44 });
s("sfx/k-switch-3.wav", T.q1b + 0.05, 0, { techo: -44 });
voz("pa5", T.pa5, -1);
tic(T.baja, -38, 0); pop(T.baja + 0.02, -42);
// Q2 · el living: los toques en el celular, el ding de "Pagado ✓", el tic de "Sin stock"
s("sfx/whoosh-short.mp3", T.q2 - 0.06, 0, { techo: -46 });
voz("g3", T.g3, -1);
for (const t of [T.comprar, T.pagar]) toque(t - 0.04, -40);
ding(T.pagadoG - 0.05, -39); tic(T.sinStock, -40, 1);
// Q3 · el pedido llega (notification), Listo ✓, el pedido por mayor (ding) y Mica; Azul 25 → 15 (tic)
s("sfx/whoosh-short.mp3", T.q3 - 0.06, 0, { techo: -46 });
noti(T.q3 + 0.1, -36); ding(T.listo, -38);
noti(T.mayor, -38); voz("mi3", T.mi3, -1); tic(T.azul, -40, 2);
// Q4 · bip del lector por caja, el número que sube; el click de grabar; 12 notificaciones suaves; el contador
s("sfx/whoosh-short.mp3", T.q4 - 0.06, 0, { techo: -52 });
T.scan.forEach((t, i) => s("sfx/k-pep.wav", t - 0.1, 0, { techo: -38 + (i % 2), vel: 1.15 }));   // (r2) el bip del lector (Kenney, CC0)
s("sfx/whoosh-short.mp3", T.q4t - 0.06, 0, { techo: -46 });
ding(T.quedan40, -38);
s("sfx/k-cloth_1.wav", T.levanta2, 0, { techo: -44, dur: 0.3, fin: 0.1 });
s("sfx/click-soft.mp3", T.pa4b - 0.12, 0, { techo: -38 });
voz("pa4", T.pa4b, -1);
T.notis.forEach((t, i) => s("sfx/notification.mp3", t, 0, { techo: -44 + (i % 3), dur: 0.3, fin: 0.1, vel: 1 + (i % 4) * 0.03 }));
s("sfx/whoosh-short.mp3", T.q4d - 0.06, 0, { techo: -46 });
voz("pa6", T.pa6, -1);
// Q5 · el cierre: el click de grabar, pop en STOCK, la línea chica
s("sfx/whoosh-short.mp3", T.q5 - 0.06, 0, { techo: -46 });
voz("pa7", T.pa7, -1);
pop(T.palabra + 0.02, -38); pop(T.pa7 + palabra("pa7", 1) + 0.02, -40);
pop(T.cierre + 0.05, -44);
// la cama +7 dB; en los tramos sin voz (los rótulos, el papel, la pared, el pedido) los SFX +5 dB (nunca sobre el techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; }
  if (en(t0, T.p6 - 0.1, T.mi2 - 0.05) || en(t0, T.p7b - 0.1, T.p8) || en(t0, T.q4 - 0.1, T.q4b)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 5); }
// la música: duck debajo de cada voz (~0,7) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, x[1] >= P2 - 0.1 ? 0.12 : 0.3])]; }
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
    if (o.pan) c += `,pan=stereo|c0=${r2(Math.min(1, 1 - o.pan))}*c0|c1=${r2(Math.min(1, 1 + o.pan))}*c1`;
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
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  // (r1) la ganancia a -14 LUFS va ANTES del limitador (techo -3,4 dBFS); después no se suma nada: sin clipping
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => { const txt = execSync(`ffmpeg -hide_banner -i ${f} -af ebur128=peak=true -f null - 2>&1`).toString(); return { I: Number([...txt.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]), TP: Number([...txt.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1)[1]) }; };
  let G = r2(OBJ - medirI("assets/audio/mezcla-cruda.wav").I), fin = null;
  for (let k = 0; k < 3; k++) {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", `volume=${G}dB,alimiter=limit=0.675:attack=2:release=60:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    fin = medirI("assets/audio/mezcla.wav"); if (Math.abs(fin.I - OBJ) < 0.2) break; G = r2(G + OBJ - fin.I);
  }
  fs.writeFileSync("assets/audio/ganancia.txt", String(G));
  console.log(`mezcla: ${fin.I} LUFS, pico ${fin.TP} dBTP, ganancia ${G} dB antes del limitador`);
  fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 1100px";   // el iris se abre desde la caja verde del mostrador (Q1)
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
      <div id="precarga">Importadoras</div><div id="precarga2">VERDE CONT. MARZO</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde la caja verde del mostrador
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.q5} (${r2(DUR - T.q5)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
