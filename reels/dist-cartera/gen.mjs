// Genera todo dist-cartera desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (DISTRIBUIDORAS del cuadro 0, los chips de día y hora, los contadores
//     "Zona Este: 38 clientes" / "En el Excel: 3 → 2", el cartel "Un sistema de clientes más tarde…", "Comentá CARTERA" y
//     la línea chica final); las burbujas de diálogo y los rótulos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/dist-quien-debe (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador, techo ≤ -3 dBFS).
// Parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución, con el cierre).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija (prev).
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh):
//   l1 Leo "Rubén, te quiero un montón. Pero me voy." (se reusa en Q1) · r1 Rubén "¿Y los clientes?" (se reusa en Q1) ·
//   l2 Leo "Tranqui. Te dejé el Excel." · r2 Rubén "Treinta y ocho clientes. Me dejaste tres." · r3 Rubén "Marta, habla
//   Rubén." · m1 Marta "¿Qué Rubén? Yo le compro a Leo." · n1 Nico "Jefe, ¿y la zona de Leo?" (se reusa en Q3) · r4 Rubén
//   "Tuya. Son dos." · nar "Un sistema de clientes más tarde." · l3 Leo "Donde estuvieron siempre." · r5 Rubén "Tuya.
//   Son treinta y ocho." · n2 Nico "Marta, ¿lo de los martes? Y las dos cajas que te guardó Leo." · m2 Marta "¡Ay, sí!
//   Mandame." · r6 Rubén "Treinta y ocho. Con nombre y apellido." · s1 Sofi "Comentá CARTERA y te mando cómo funciona
//   para tu distribuidora."
const VOCES = ["l1", "r1", "l2", "r2", "r3", "m1", "n1", "r4", "l3", "r5", "n2", "m2", "r6", "s1"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { s1: JSON.parse(fs.readFileSync("assets/voice/palabras-s1.json", "utf8")) };
const palabra = (k, i) => r2(PAL[k][i].start ?? PAL[k][i].a);
const T = {};
const fin = (k) => r2(T[k] + LEN[k.replace(/b$/, "")]);
// el punto que parte una línea en dos (la burbuja muestra la segunda mitad recién cuando suena): el final del silencio
// interno más largo de la toma
function corteVoz(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fin = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  let mejor = null; ini.forEach((a, i) => { const b = fin[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05 && (!mejor || b - a > mejor[1] - mejor[0])) mejor = [a, b]; });
  return mejor ? r2(mejor[1] - 0.02) : r2(LEN[k] * 0.5);
}
const CORTE = Object.fromEntries(["l1", "r2", "m1", "r4", "r5", "r6"].map((k) => [k, corteVoz(k)]));
// ---- parte 1 ----
// P1 · cuadro 0: la despedida en el depósito; Leo abraza a Rubén: "Rubén, te quiero un montón. Pero me voy."
T.l1 = 0.15;
// P2 · primer plano de Rubén, el cuchillo quieto en el aire; el murmullo se corta: "¿Y los clientes?"
T.p2 = r2(fin("l1") + 0.12); T.r1 = r2(T.p2 + 0.18);
// P3 · Leo, feliz, se palmea el celular del pecho: "Tranqui. Te dejé el Excel." · inserto del celular del pecho
T.p3 = r2(fin("r1") + 0.1); T.l2 = r2(T.p3 + 0.08); T.palmea = r2(T.l2 + 0.2); T.ins3 = r2(T.l2 + LEN.l2 * 0.62);
// P4 · el escritorio de Leo: la planilla con 3 filas; rótulos; "Treinta y ocho clientes. Me dejaste tres."
T.p4 = r2(fin("l2") + 0.1); T.fila = [0.3, 0.48, 0.66].map((d) => r2(T.p4 + d)); T.rotA = r2(T.p4 + 0.7); T.rotB = r2(T.p4 + 1.0); T.r2 = r2(T.p4 + 0.72); T.tres = r2(T.r2 + CORTE.r2);
// P5 · Rubén llama con el celular en altavoz: "Marta, habla Rubén." · corte a la cafetería: "¿Qué Rubén? Yo le compro a
// Leo."
T.p5 = r2(fin("r2") + 0.14); T.llama = r2(T.p5 + 0.05); T.r3 = r2(T.p5 + 0.32); T.p5m = r2(fin("r3") + 0.1); T.m1 = r2(T.p5m + 0.32);   // (r1) ≥ 0,4 s antes de "¿Qué Rubén?"
// P6 · remate del remate: Rubén y Nico frente al monitor; pausa; "Jefe, ¿y la zona de Leo?" · Rubén borra a Marta (3 → 2)
// · pausa · "Tuya. Son dos."
T.p6 = r2(fin("m1") + 0.1); T.n1 = r2(T.p6 + 0.25); T.p6i = r2(fin("n1") + 0.04); T.borra = r2(T.p6i + 0.22); T.p6b = r2(T.borra + 0.5); T.r4 = r2(T.p6b + 0.12);
const P1 = r2(fin("r4") + 0.25);                              // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.3, LEN.nar + 0.08));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0 (la torta con una porción menos): el mismo "Rubén, te quiero…" · Q1r el mismo "¿Y los
// clientes?" · Q1l Leo: "Donde estuvieron siempre." y señala el monitor con el pulgar; la cámara viaja (Q2) al monitor
// (r1) la repetición arranca en "¿Y los clientes?" (el mismo primer plano, con el chip): la interfaz entra antes
T.q1 = P2; T.q1r = P2; T.r1b = r2(P2 + 0.15); T.q1l = r2(fin("r1b") + 0.35); T.l3 = r2(T.q1l + 0.06);   // ≥ 0,4 s antes de "Donde estuvieron siempre."
// Q2 · el sistema de clientes en el monitor: 38 tarjetas · la ficha de Cafetería Marta · lo prometido · Autoservicio Pérez
T.q2 = r2(T.l3 + LEN.l3 * 0.62); T.grid = r2(T.q2 + 0.2); T.ficha = r2(T.q2 + 0.6); T.prom = r2(T.q2 + 1.15); T.perez = r2(T.q2 + 1.6);   // (r1) corte limpio al monitor sobre "siempre"
// Q3 · el mismo encuadre de P6: "Jefe, ¿y la zona de Leo?" · Pasar cartera ✓ · las 38 tarjetas vuelan al celular de
// Nico · "Tuya. Son treinta y ocho."
T.q3 = r2(T.q2 + 2.25); T.n1b = r2(T.q3 + 0.1); T.pasa = r2(fin("n1b") - 0.05); T.q3m = r2(T.pasa - 0.25); T.vuela = r2(T.pasa + 0.12);
T.q3i = r2(T.vuela + 0.32); T.llegan = r2(T.vuela + 0.7); T.q3b = r2(T.llegan + 0.3); T.r5 = r2(T.q3b + 0.06);
// Q4 · martes 9:00: Nico en el muelle con la ficha de Marta: "Marta, ¿lo de los martes? Y las dos cajas que te guardó
// Leo." · Q4m la cafetería: "¡Nico! Leo me habló de vos. Mandame." · Pedido ✓
// (r1) Q4i: inserto del celular de Nico con la ficha de Marta y el toque en "Llamar"; después Nico
T.q4 = r2(fin("r5") + 0.1); T.toqueN = r2(T.q4 + 0.25); T.n2 = r2(T.q4 + 0.35); T.q4n = r2(T.q4 + 1.25); T.q4m = r2(fin("n2") + 0.06); T.m2 = r2(T.q4m + 0.08); T.pedido = r2(T.m2 + 2.3);   // (r2) "Pedido ✓" sobre "Mandame." y queda ≥ 1 s
// Q5 · la oficina: el panel "Cartera" · "Treinta y ocho. Con nombre y apellido."
T.q5 = r2(fin("m2") + 0.3); T.r6 = r2(T.q5 + 0.15);
// C · Sofi a cámara en el depósito: "Comentá CARTERA y te mando cómo funciona para tu distribuidora."
T.c = r2(fin("r6") + 0.31); T.s1 = r2(T.c + 0.04);   // (r2) ~0,35 s de pausa después del remate de Rubén
T.palabra = r2(T.s1 + 0.42);                                  // la tarjeta entra sobre "CARTERA" (el STT ubica mal "Comentá": el hueco de la k cae en 0,43-0,50 s)
const DUR = Math.ceil((Math.ceil((T.s1 + LEN.s1 + 0.1) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.4));

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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const CORTE = ${JSON.stringify(CORTE)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";
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
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }`;

// P1 · el rubro: "DISTRIBUIDORAS" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema), entero
// desde el cuadro 0, y el chip "Viernes, 18:00." debajo; se van con el corte al primer plano de Rubén
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 84px; padding: 24px 4px 30px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 98px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; }
    P .sel b { position: absolute; inset: -10px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 300px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>DISTRIBUIDORAS</em></span></div></div>
      <div class="chip">Viernes, 18:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de día y hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.q1 + 0.02, T.q1l - 0.02, "Viernes, 18:00."],
  ["s02-chip", T.q4 + 0.0, T.q4m - 0.04, "Martes, 9:00."],
];
for (const [id, ini0, fin0, txt] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin0 - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}
// P4 · arriba del monitor: "Zona Este: 38 clientes · $ 1.900.000 por mes" y "En el Excel: 3" (rojo apagado)
const RCSS = `
    P .r { position: absolute; padding: 12px 26px 16px; border-radius: 26px; background: ${NAVY}; border: 6px solid ${CR}; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); color: ${CR}; text-align: center; }
    P .r .a { font: 800 44px/1.15 "Lexend", sans-serif; white-space: nowrap; }
    P .r .n { font: 900 66px/1.12 "Lexend", sans-serif; color: ${RED}; letter-spacing: -0.02em; white-space: nowrap; }`;
{
  const id = "s05-zona", ini = r2(T.rotA), dur = r2(T.p5 - T.rotA - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${RCSS}
    P .r1 { left: 44px; top: 60px; } P .r2 { right: 44px; top: 130px; } P .r3 { left: 44px; top: 250px; }
    P .r .n.cr { color: ${CR}; } P .r .a.rj { color: ${RED}; font-weight: 900; }`,
    html: `      <div class="r r1"><div class="a">Zona Este</div><div class="n cr">38 clientes</div></div>
      <div class="r r2"><div class="a">En el Excel:</div><div class="n">3</div></div>
      <div class="r r3"><div class="a rj">$ 1.900.000 por mes</div><div class="a">que se van con Leo</div></div>`,
    js: `      tl.fromTo(q(".r1"), { scale: 0.4, transformOrigin: "0% 0%" }, { scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, 0);
      tl.fromTo(q(".r2"), { scale: 0.4, opacity: 0, transformOrigin: "100% 0%" }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, ${r2(T.rotB - T.rotA)});
      tl.fromTo(q(".r3"), { scale: 0.4, opacity: 0, transformOrigin: "0% 0%" }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, ${r2(T.tres - T.rotA + 0.12)});
      tl.fromTo(q(".r2 .n"), { scale: 1 }, { scale: 1.35, duration: 0.12, yoyo: true, repeat: 3, transformOrigin: "50% 50%", immediateRender: false }, ${r2(T.tres - T.rotA)});`,
  });
}
// P6 · "En el Excel: 3 → 2" cuando Rubén borra a Marta
{
  const id = "s06-excel", ini = r2(T.p6), dur = r2(P1 - T.p6 - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${RCSS}
    P .r2 { right: 50px; top: 110px; }`,
    html: `      <div class="r r2"><div class="a">En el Excel:</div><div class="n"><span class="v3">3</span><span class="v2" style="display:none">2</span></div></div>`,
    js: `      tl.set(q(".v3"), { display: "none" }, ${r2(T.borra - T.p6 + 0.12)}); tl.set(q(".v2"), { display: "inline" }, ${r2(T.borra - T.p6 + 0.12)});
      tl.fromTo(q(".n"), { scale: 1 }, { scale: 1.25, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%", immediateRender: false }, ${r2(T.borra - T.p6 + 0.12)});`,
  });
}

// el cartel "Un sistema de clientes más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = 1.5;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 620px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 120px; margin-top: 10px; }
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
        ${lin("a", ["Un", "sistema"])}
        ${lin("b", ["de", "clientes"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.025 : ${MAS} + (i - nAB) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});   // se va antes del iris`,
  });
}

// C · "Comentá CARTERA" + "y te mando cómo funciona para tu distribuidora", debajo de la cara de Sofi
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1130px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 48px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>CARTERA</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu distribuidora</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.32);`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1590px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; }
    P .b { margin-top: 8px; font: 800 58px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Sistema de clientes: la cartera</div><div class="a">queda en tu empresa</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -38;   // (r1) techo ANTES de la ganancia final (~+7 dB): en el final, ningún efecto ni la cama pasan -31 LUFS
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -42) => s("sfx/k-tick-1.wav", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const cafe = (a, b, desde = 0) => { s("sfx/bsb-cafeteria.wav", a, 0, { desde, dur: r2(b - a), fi: 0.06, fin: 0.12, techo: -40 }); };
// ---- parte 1 ----
// ambiente: el depósito (el zumbido de los tubos, el murmullo de la despedida que se CORTA en "¿Y los clientes?")
s("sfx/zumbido.wav", 0, 0, { loop: true, dur: r2(T.p5m + 0.05), fi: 0.05, fin: 0.15, techo: -47, lp: 900 });
s("sfx/bsb-murmullo.wav", 0, 0, { dur: r2(T.p2 + 0.02), fi: 0.03, fin: 0.05, techo: -38 });
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p2 + 0.02), fin: 0.05, techo: -36 });
s("sfx/bsb-palmada.wav", 0.35, 0, { techo: -38 });
s("sfx/k-plastico.wav", 1.35, 0, { techo: -46, dur: 0.3, fin: 0.1 });
voz("l1", T.l1, -1);
// P2 · el silencio; solo el zumbido
voz("r1", T.r1, -1);
// P3 · la palmada en el celular del pecho, las notificaciones que se apilan
voz("l2", T.l2, -1);
s("sfx/bsb-palmada.wav", T.palmea, 0, { techo: -42 });
for (let k = 0; k < 3; k++) noti(T.ins3 + 0.05 + k * 0.16, -40 - k * 2);
// P4 · la cama vuelve baja; whoosh al escritorio; las filas; los rótulos
s("bgm/pizzicato-lleno.wav", T.p4 - 0.1, 0, { desde: 6.0, loop: true, dur: r2(P1 - T.p4 + 0.12), fi: 0.3, fin: 0.05, techo: -38 });
whoosh(T.p4 - 0.06, -40);
T.fila.forEach((t) => toque(t, -38));
pop(T.rotA, -38); pop(T.rotB, -38); pop(T.tres + 0.12, -38);
voz("r2", T.r2, -1);
// P5 · el tono de llamada; la cafetería (el molinillo, las tazas)
s("sfx/k-tono.wav", T.llama, 0, { techo: -42, dur: 0.32, fin: 0.06, lp: 2000 });
s("sfx/k-tono.wav", T.llama + 0.5, 0, { techo: -44, dur: 0.32, fin: 0.06, lp: 2000 });
voz("r3", T.r3, -1);
cafe(T.p5m - 0.02, T.p6 + 0.05, 4);
s("sfx/bsb-molinillo.wav", T.p5m + 0.05, 0, { dur: 0.9, fin: 0.25, techo: -44 });
voz("m1", T.m1, -1);
// P6 · el depósito otra vez; el borrado (click + tic); "Tuya. Son dos." · el stinger lo da el cartel
s("sfx/zumbido.wav", T.p6, 0, { loop: true, dur: r2(P1 - T.p6 + 0.05), fi: 0.05, fin: 0.1, techo: -47, lp: 900 });
whoosh(T.p6 - 0.05, -48);
voz("n1", T.n1, -1);
toque(T.borra, -38); s("sfx/k-tick-2.wav", T.borra + 0.12, 0, { techo: -38 });
voz("r4", T.r4, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 1.05, 1.5]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.c - P2), fi: 0.4, fin: 0.3, techo: -36 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -37 });
// Q1 · la despedida otra vez (el murmullo NO se corta); el zumbido
s("sfx/zumbido.wav", P2, 0, { loop: true, dur: r2(T.q4 - P2), fi: 0.1, fin: 0.15, techo: -47, lp: 900 });
s("sfx/bsb-murmullo.wav", P2, 0, { desde: 9, dur: r2(T.q2 - P2 + 0.05), fi: 0.1, fin: 0.08, techo: -42 });
voz("r1", T.r1b, -1);
voz("l3", T.l3, -1);
// Q2 · la cámara viaja al monitor; las tarjetas; la ficha renglón por renglón; lo prometido; Autoservicio Pérez
s("sfx/whoosh.mp3", T.q2 - 0.12, 0, { techo: -39 });   // (r1) el corte al monitor, audible
for (let k = 0; k < 4; k++) tic(T.grid + k * 0.08, -40);
toque(T.ficha - 0.05, -38);
for (let k = 0; k < 4; k++) tic(T.ficha + 0.12 + k * 0.16, -40);
ding(T.prom, -39);
pop(T.perez, -39);
// Q3 · Pasar cartera: el toque, las tarjetas que vuelan (whoosh + hojas), el ding en el celular de Nico
voz("n1", T.n1b, -1);
toque(T.pasa, -39);
s("sfx/whoosh.mp3", T.vuela, 0, { techo: -39 });
for (let k = 0; k < 4; k++) s("sfx/k-page-turn.wav", T.vuela + 0.08 + k * 0.15, 0, { techo: -40, dur: 0.22, fin: 0.08, hp: 900 });
noti(T.llegan, -38); ding(T.llegan + 0.05, -38);
voz("r5", T.r5, -1);
// Q4 · martes: el muelle (la calle), el tono, la cafetería; "Pedido ✓"
tic(T.q4 + 0.02, -40); toque(T.toqueN, -38);
s("sfx/calle.wav", T.q4, 0, { desde: 3, dur: r2(T.q4m - T.q4 + 0.1), fi: 0.12, fin: 0.12, techo: -46, lp: 1500 });
s("sfx/k-tono.wav", T.toqueN + 0.08, 0, { techo: -44, dur: 0.2, fin: 0.06, lp: 2000 });
voz("n2", T.n2, -1);
cafe(T.q4m - 0.02, T.q5 + 0.05, 9);
voz("m2", T.m2, -1);
ding(T.pedido + 0.02, -41);
// Q5 · la oficina: el panel con tic por fila; el sorbo de mate
whoosh(T.q5 - 0.05, -40);
for (let k = 0; k < 3; k++) tic(T.q5 + 0.15 + k * 0.12, -40);
s("sfx/sorbo.wav", T.q5 + 0.02, 0, { techo: -40, dur: 0.3, fin: 0.1 });
voz("r6", T.r6, -1);
// C · Sofi: whoosh, pop en CARTERA, la línea chica
whoosh(T.c - 0.08, -44);
s("sfx/bsb-murmullo.wav", T.c, 0, { desde: 20, dur: r2(DUR - T.c), fi: 0.2, fin: 0.5, techo: -46 });
voz("s1", T.s1, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// (r1) la cama ya no se sube +7: queda en el techo general (-38 antes de la ganancia final)
// (r1) duck de la cama (~-7 dB) en los huecos sin voz donde mandan los efectos de interfaz
const HUECOS = [[T.p4 - 0.1, T.r2 + 0.1], [T.p6i - 0.05, T.r4 + 0.1], [T.q2 - 0.15, T.q3 + 0.1], [T.q3m - 0.05, T.r5 + 0.1], [T.pedido - 0.2, T.r6 + 0.1]];
// la música: duck debajo de cada voz (~0,6) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.6]), ...HUECOS.filter(([a, b]) => b > x[1] && a < x[1] + x[3].dur).map(([a, b]) => [a, b, 0.55])]; }

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
// el bus suma +6 dB antes de la ganancia: el techo se cumple DESPUÉS del bus (por eso -6)
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
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  // el bus: +6 dB y compresor suave (LRA ≤ 8); después la ganancia a -14 LUFS y RECIÉN AHÍ el limitador (techo ≈ -3,4 dBFS),
  // así no queda nada recortado (ninguna muestra en ±32767) y el loudnorm del paso 10 va lineal
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=2.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
  if (process.env.MEDIR) {
    mezcla(S.filter((x) => x[3].voz), "assets/audio/stem-voz.wav", DUR);
    mezcla(S.filter((x) => !x[3].voz), "assets/audio/stem-resto.wav", DUR);
  }
  const OBJ = Number(process.env.OBJ ?? -14);
  const medirI = (f) => Number([...execSync(`ffmpeg -hide_banner -i ${f} -af ebur128 -f null - 2>&1`).toString().matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]);
  let gan = r2(OBJ - medirI("assets/audio/mezcla-bus.wav"));
  let usada = gan;
  for (let k = 0; k < 3; k++) {
    usada = gan;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-bus.wav", "-af", `volume=${gan}dB,alimiter=limit=0.675:attack=1:release=50:level=false,atrim=duration=${DUR}`, "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla.wav"]);
    const I = medirI("assets/audio/mezcla.wav");
    if (Math.abs(OBJ - I) <= 0.2) break;
    gan = r2(gan + (OBJ - I));
  }
  fs.writeFileSync("assets/audio/ganancia.txt", String(usada));   // medir.py le suma los +6 del bus
  fs.unlinkSync("assets/audio/mezcla-bus.wav"); fs.unlinkSync("assets/audio/mezcla-cruda.wav");
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const capa = (c) => (LIMPIO ? [] : ESC.filter((e) => e[3] === c));
const host = ([id, a, d], i, z) => `      <div id="el-${id}" class="scene" style="z-index:${z}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`;
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 20 + i, 1)).join("\n"); // el cartel va siempre
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.3);
const IRIS_C = "540px 1250px";   // el iris se abre desde la torta (Q1)
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
      <div id="precarga">Cartera</div><div id="precarga2">¡Suerte, Leo! 2200</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
      <audio id="mezcla" src="assets/audio/mezcla.wav" data-start="0" data-duration="${DUR}" data-track-index="40" data-volume="1"></audio>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde la torta
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
