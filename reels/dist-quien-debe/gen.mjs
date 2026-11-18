// Genera todo dist-quien-debe desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (DISTRIBUIDORAS del cuadro 0, los chips de día y hora, la línea de la
//     pantalla partida con "Llamando · Graciela", el contador "Te deben", el cartel "Una cobranza automática más tarde…",
//     "Comentá COBRAR" y la línea chica final); las burbujas de diálogo y los rótulos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/contable-papeles y reels/tienda-tenes-stock (la mezcla corregida: bus → ganancia a -14 LUFS → recién
// ahí el limitador, techo ≤ -3 dBFS). Parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR,
// la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh):
//   pa1 Patricia "Rubén, estás en rojo. Y hoy pagás sueldos." · r1 Rubén "Tranquila. La calle me debe un millón." ·
//   r2 Rubén "Graciela, querida… te llamaba por lo de la factura…" · g1 Graciela "¡Rubén! Justo. Mandame veinte cajas." ·
//   r3 Rubén "…Dale." · pa2 Patricia "¿Y? ¿Cobraste?" (se reusa igual en Q4) · r4 Rubén "Mejor. Ahora me deben más." ·
//   pa3 Patricia "Te paso con cobranzas." · nar "Una cobranza automática más tarde." · g2 Graciela "¿Por favor? Esto no lo
//   escribió Rubén." · n1 Nico "Beto. Hoy paso." · g3 Graciela "¡Rubén! Ya te pagué. Mandame veinte cajas." · r5 Rubén
//   "Dale." · r6 Rubén "Mejor. Cobré y vendí." · pa4 Patricia "Te paso con inversiones." · r7 Rubén "Comentá COBRAR y te
//   mando cómo funciona para tu distribuidora."
const VOCES = ["pa1", "r1", "r2", "g1", "r3", "pa2", "r4", "pa3", "g2", "n1", "g3", "r5", "r6", "pa4", "r7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { r7: JSON.parse(fs.readFileSync("assets/voice/palabras-r7.json", "utf8")) };
const palabra = (k, i) => r2(PAL[k][i].start ?? PAL[k][i].a);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el box de atención a empresas, el monitor ya girado hacia Rubén ("− $ 140.000"); Patricia: "Rubén, estás
// en rojo. Y hoy pagás sueldos." (señala "Sueldos hoy" con la lapicera) · rótulo "Distribuidora Rubén · 15 empleados"
T.pa1 = 0.15; T.tic = r2(T.pa1 + LEN.pa1 * 0.72); T.rotD = 0.35;
// P2 · contraplano: Rubén, canchero: "Tranquila. La calle me debe un millón."
T.p2 = r2(T.pa1 + LEN.pa1 + 0.06); T.r1 = r2(T.p2 + 0.08);
// P3 · la planilla entra sobre "un millón": el pulgar baja y baja, frena en Graciela; toca "Llamar"
T.p3 = r2(T.r1 + LEN.r1 - 0.85); T.rotA = r2(T.p3 + 0.1); T.frena = r2(T.p3 + 0.7); T.rotB = r2(T.p3 + 0.78); T.llamar = r2(T.p3 + 1.0);
// P4 · la llamada (pantalla partida): "Graciela, querida… te llamaba por lo de la fac—" · Graciela lo corta: "¡Rubén!
// Justo. Mandame veinte cajas." · P4d primer plano de Rubén: pausa · "…Dale." · cuelga · el contador "Te deben" sube
T.p4 = r2(T.p3 + 1.2); T.r2 = r2(T.p4 + 0.1); T.g1 = r2(T.r2 + LEN.r2 - 0.04);
T.p4d = r2(T.g1 + LEN.g1 + 0.08); T.r3 = r2(T.g1 + LEN.g1 + 0.38); T.cuelga = r2(T.r3 + LEN.r3 + 0.04); T.kaching = r2(T.r3 + LEN.r3 + 0.06);
// P5 · Patricia, cejas arriba: "¿Y? ¿Cobraste?" (el contador llega en 0,45 s y queda quieto 0,7 s antes del corte)
T.p5 = r2(T.kaching + 1.1); T.pa2 = r2(T.p5 + 0.1);
// P6 · el remate: primer plano de Rubén; pausa (la bombilla, nada sale) · "Mejor. Ahora me deben más."
T.p6 = r2(T.pa2 + LEN.pa2 + 0.12); T.sorbo = r2(T.p6 + 0.06); T.r4 = r2(T.p6 + 0.35);
// P7 · remate del remate: pausa · Patricia aprieta el timbre: "Te paso con cobranzas." · el turnero: COBRANZAS · BOX 3
T.p7 = r2(T.r4 + LEN.r4 + 0.12); T.pa3 = r2(T.r4 + LEN.r4 + 0.38); T.timbre = r2(T.pa3 + LEN.pa3 - 0.3); T.flip = r2(T.timbre + 0.04);
const P1 = r2(T.timbre + 1.1);                              // (r2) COBRANZAS legible ~0,9 s                      // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.2, LEN.nar + 0.02));
// ---- parte 2 ----
// Q1i · martes 9:00: el iris se abre al celular de Graciela en el mostrador: vibra, el recordatorio con "vence hoy"
// subrayado y Pagar · Q1g Graciela: "Mirá vos. Rubén nunca me cobra." · Q1p toca Pagar → Pagado ✓
T.q1 = P2; T.vibra = r2(P2 + 0.05); T.llega = r2(P2 - 0.3); T.q1i = P2; T.g2 = r2(P2 + 1.3); T.q1g = r2(T.g2 - 0.05);
T.pagar = r2(T.g2 + LEN.g2 + 0.15); T.pagado = r2(T.pagar + 0.14);
// Q2 · el panel de Rubén: el "Pagado ✓" vuela a su fila; los otros de a uno; Te deben baja a $ 96.400; "Quién y desde
// cuándo"
T.q2 = r2(T.pagado + 0.3); T.fila = [0.15, 0.35, 0.55, 0.75, 0.95].map((d) => r2(T.q2 + d)); T.quien = r2(T.q2 + 1.3);
// Q3 · el muelle: el aviso "Visitar hoy · Kiosco Beto" · Nico: "Beto. Hoy paso." · se va a la cabina; portazo
T.q3 = r2(T.q2 + 2.25); T.aviso = r2(T.q3 + 0.08); T.n1 = r2(T.q3 + 0.68); T.sube = r2(T.n1 + LEN.n1 + 0.05); T.portazo = r2(T.sube + 0.25);
// Q4 · viernes 16:00, directo a la pantalla partida (arriba el monitor en verde): "¡Rubén! Ya te pagué. Mandame veinte
// cajas." · "Dale." · "¿Y? ¿Cobraste?" (el mismo audio) · "Mejor. Cobré y vendí." · pausa · "Te paso con inversiones." ·
// el turnero: INVERSIONES · BOX 1
T.q4 = r2(T.portazo + 0.05); T.q4s = T.q4; T.vibraR = r2(T.q4 + 0.05); T.g3 = r2(T.q4 + 0.35);
T.r5 = r2(T.g3 + LEN.g3 + 0.25); T.cuelga2 = r2(T.r5 + LEN.r5 + 0.06);
T.q4p5 = r2(T.r5 + LEN.r5 + 0.2); T.pa2b = r2(T.q4p5 + 0.1);
T.q4p6 = r2(T.pa2b + LEN.pa2 + 0.12); T.r6 = r2(T.q4p6 + 0.25);
T.q4p7 = r2(T.r6 + LEN.r6 + 0.12); T.pa4 = r2(T.r6 + LEN.r6 + 0.42); T.timbre2 = r2(T.pa4 + LEN.pa4 - 0.12); T.flip2 = r2(T.timbre2 + 0.04);
// C · Rubén a cámara en el box de inversiones: "Comentá COBRAR y te mando cómo funciona para tu distribuidora."
T.c = r2(T.flip2 + 1.04); T.r7 = r2(T.c + 0.1);
T.palabra = r2(T.r7 + palabra("r7", 1) + 0.36);           // la tarjeta entra sobre "COBRAR"
const DUR = Math.ceil((Math.ceil((T.r7 + LEN.r7 + 0.3) * 30) / 30) * 1e4) / 1e4;
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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

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
// desde el cuadro 0, y el chip "Viernes, 16:00." debajo; se van con el corte al contraplano
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2 - 0.04);
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
      <div class="chip">Viernes, 16:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de día y hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.q1 + 0.02, T.g2 - 0.08, "Martes, 9:00."],
  ["s02-chip", T.q4 + 0.0, T.g3 + 1.0, "Viernes, 16:00."],
];
for (const [id, ini0, fin, txt] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}
// la línea de la pantalla partida (navy de 10 px al medio) con el chip "Llamando · Graciela" / "En llamada · Graciela"
const SPLITS = [["s03-split", T.p4, r2(T.g1 - 0.03), "Llamando · Graciela", T.r2 - 0.05, "En llamada"], ["s04-split", T.q4s, r2(T.g3 + 0.4), "Graciela", T.g3 - 0.05, "En llamada"]];
for (const [id, ini0, fin, txt, cambio, txt2] of SPLITS) {
  const ini = r2(ini0), dur = r2(fin - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 0; right: 0; top: 955px; height: 10px; background: ${NAVY}; }
    P .chipL { position: absolute; left: 50%; top: 960px; transform: translate(-50%, -50%); padding: 12px 30px 15px; border-radius: 40px; background: ${NAVY}; border: 5px solid ${CR}; font: 800 44px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; display: flex; align-items: center; gap: 16px; }
    P .chipL i { width: 22px; height: 22px; border-radius: 50%; background: ${G}; display: inline-block; }
    P .t2 { display: none; }`,
    html: `      <div class="linea"></div>
      <div class="chipL"><i></i><span class="t1">${txt}</span><span class="t2">${txt2} · Graciela</span></div>`,
    js: `      tl.fromTo(q(".chipL"), { scale: 0.7 }, { scale: 1, duration: 0.18, ease: "back.out(2)", immediateRender: true }, 0);
      tl.fromTo(q(".chipL i"), { opacity: 1 }, { opacity: 0.25, duration: 0.25, ease: "none", yoyo: true, repeat: 3, immediateRender: false }, 0.05);
      tl.set(q(".t1"), { display: "none" }, ${r2(Math.max(0.05, cambio - ini0))});
      tl.set(q(".t2"), { display: "inline" }, ${r2(Math.max(0.05, cambio - ini0))});`,
  });
}
// P4 · tras el "…Dale.": "Te deben: $ 1.012.000 → $ 1.034.000" y "Graciela: $ 186.000 → $ 208.000" (rojo apagado, el número
// sube con tic de contador); se quedan hasta el corte a P5
{
  const id = "s05-debe", ini = r2(T.kaching - 0.02), dur = r2(T.p5 - T.kaching + 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .r { position: absolute; left: 50%; width: 700px; margin-left: -350px; padding: 14px 28px 18px; border-radius: 26px; background: ${NAVY}; border: 6px solid ${CR}; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); color: ${CR}; text-align: center; }
    P .r .a { font: 800 44px/1.1 "Lexend", sans-serif; }
    P .r .n { font: 900 76px/1.1 "Lexend", sans-serif; color: ${RED}; letter-spacing: -0.02em; }
    P .r1 { top: 1230px; } P .r2 { top: 1480px; }`,
    html: `      <div class="r r1"><div class="a">Te deben</div><div class="n">$ <span class="v1">1.012.000</span></div></div>
      <div class="r r2"><div class="a">Rotisería Graciela</div><div class="n">$ <span class="v2">186.000</span></div></div>`,
    js: `      const fmt = (n) => Math.round(n).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
      tl.fromTo(q(".r1"), { scale: 0.4 }, { scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, 0);
      tl.fromTo(q(".r2"), { scale: 0.4 }, { scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, 0.06);
      const o = { a: 1012000, b: 186000 };
      tl.to(o, { a: 1034000, b: 208000, duration: 0.4, ease: "power1.inOut", onUpdate: () => { q(".v1").textContent = fmt(Math.round(o.a / 1000) * 1000); q(".v2").textContent = fmt(Math.round(o.b / 1000) * 1000); } }, 0.12);
      tl.fromTo(q(".r1 .n"), { scale: 1 }, { scale: 1.12, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%", immediateRender: false }, 0.5);
      tl.fromTo(q(".r2 .n"), { scale: 1 }, { scale: 1.12, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%", immediateRender: false }, 0.54);`,
  });
}

// el cartel "Una cobranza automática más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = 0.95;   // "más tarde…" entra cuando el narrador dice "más"
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
        ${lin("a", ["Una", "cobranza"])}
        ${lin("b", ["automática"])}
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

// C · "Comentá COBRAR" + "y te mando cómo funciona para tu distribuidora", debajo de la cara de Rubén
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
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>COBRAR</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu distribuidora</div></div>`,
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
    html: `      <div class="caja"><div class="a">Cobranza automática: estado de cuenta,</div><div class="a">recordatorio y link de pago</div><div class="b">scalerics.com</div></div>`,
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
const TECHO = -31;
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
const dingdong = (t, techo = -33) => s("sfx/bsb-1604.mp3", t, 0, { desde: 0.2, dur: 2.4, fin: 0.6, techo });
const kaching = (t, techo = -33) => { s("sfx/bsb-1417.mp3", t, 0, { techo: techo - 2 }); s("sfx/bsb-0193.mp3", t + 0.1, 0, { desde: 0.14, dur: 0.75, fin: 0.25, techo }); };
const espera = (a, b) => s("bgm/pizzicato.wav", a, 0, { desde: 2.0, dur: r2(b - a), fi: 0.08, fin: 0.15, techo: -32, hp: 450, lp: 2800, sinDuck: true });   // la música de espera del banco (parlante de techo)
// ---- parte 1 ----
// ambiente: el banco (murmullo bajo, el zumbido del aire, un teclado lejano) y la cama
s("sfx/zumbido.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fi: 0.05, fin: 0.2, techo: -46, lp: 900 });
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(T.p4 + 0.05), fi: 0.05, fin: 0.2, techo: -48, lp: 700 });
for (let k = 0; k < 6; k++) s("sfx/key-press.mp3", 0.4 + k * 0.17 + (k > 2 ? 0.35 : 0), 0, { techo: -50, dur: 0.12, fin: 0.04, lp: 3000 });
s("bgm/pizzicato-lleno.wav", 0, 0, { loop: true, dur: r2(T.flip + 0.05), fin: 0.12, techo: -36, duck: [[T.p6 - 0.1, T.r4 + LEN.r4 + 0.1, 0.75]] });
// P1 · el brazo del monitor (creak), la lapicera en la pantalla
voz("pa1", T.pa1, -1);
tic(T.tic, -40);
// P2 · el contraplano; sorbo; saca el celular
whoosh(T.p2 - 0.04, -48);
voz("r1", T.r1, -1);
// P3 · la planilla: el pulgar (3 roces), pop por rótulo, el toque de Llamar
s("sfx/k-page-turn.wav", T.p3 + 0.05, 0, { techo: -44, dur: 0.25, fin: 0.08, hp: 800 });
s("sfx/k-page-turn.wav", T.p3 + 0.3, 0, { techo: -45, dur: 0.25, fin: 0.08, hp: 900 });
s("sfx/k-page-turn.wav", T.p3 + 0.55, 0, { techo: -46, dur: 0.25, fin: 0.08, hp: 1000 });
pop(T.rotA, -40); pop(T.rotB, -38); toque(T.llamar, -38);
// P4 · el tono de llamada, el spiedo en la mitad de Graciela, el colgado, la caja registradora y el tic del contador
s("sfx/k-tono.wav", T.p4 - 0.05, 0, { techo: -40, dur: 0.32, fin: 0.06, lp: 2000 });
s("sfx/chisporroteo.wav", T.p4, 0, { loop: true, dur: r2(T.p4d - T.p4), fi: 0.1, fin: 0.15, techo: -43, lp: 3500 });
voz("r2", T.r2, -1);
voz("g1", T.g1, -1);
whoosh(T.p4d - 0.04, -48);
voz("r3", T.r3, 0);
s("sfx/k-dos-tonos.wav", T.cuelga, 0, { techo: -42, lp: 2200 });
kaching(T.kaching + 0.04, -33);
for (let k = 0; k < 4; k++) tic(T.kaching + 0.14 + k * 0.1, -46);
// P5 · "¿Y? ¿Cobraste?"
whoosh(T.p5 - 0.04, -48);
voz("pa2", T.pa2, -1);
// P6 · el sorbo vacío; el remate sin nada encima
s("sfx/sorbo.wav", T.sorbo, 0, { techo: -34, dur: 0.38, fin: 0.12 });
voz("r4", T.r4, -1);
// P7 · "Te paso con cobranzas." · el timbre · el ding-dong del turnero · la música de espera · el stinger lo da el cartel
voz("pa3", T.pa3, -1);
s("sfx/k-switch-3.wav", T.timbre, 0, { techo: -38 });
whoosh(T.flip - 0.15, -46);
dingdong(T.flip + 0.15, -34);
espera(T.flip + 0.05, P1);
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
// Q1 · la rotisería: el spiedo, el celular vibra, el mensaje, Graciela, Pagar → Pagado
s("sfx/chisporroteo.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.q2 - P2), fi: 0.2, fin: 0.15, techo: -44, lp: 3500 });
noti(T.vibra + 0.05, -34);
whoosh(T.q1i - 0.05, -46);
voz("g2", T.g2, -1);
toque(T.pagar, -36); ding(T.pagado + 0.05, -35);
// Q2 · el panel: el chip vuela (whoosh), ding suave por fila, el tic del contador, pop en "Quién y desde cuándo"
s("sfx/whoosh.mp3", T.q2 - 0.08, 0, { techo: -42 });
T.fila.forEach((t, i) => { ding(t, -40 + (i === 0 ? 3 : 0)); for (let k = 0; k < 2; k++) tic(t + 0.08 + k * 0.08, -48); });
pop(T.quien, -38); for (let k = 0; k < 3; k++) pop(T.quien + 0.2 + k * 0.18, -44);
s("sfx/key-press.mp3", T.q2 + 0.1, 0, { techo: -48, dur: 0.12, fin: 0.04 });
// Q3 · el muelle: el aviso, Nico, el portazo, el motor
s("sfx/calle.wav", T.q3, 0, { desde: 3, dur: r2(T.q4 - T.q3 + 0.3), fi: 0.15, fin: 0.3, techo: -46, lp: 1500 });
whoosh(T.q3 - 0.05, -46);
noti(T.aviso + 0.05, -35);
voz("n1", T.n1, 0);
s("sfx/k-cloth_2.wav", T.sube - 0.05, 0, { techo: -42, dur: 0.3, fin: 0.1 });
s("sfx/puerta-auto.wav", T.portazo, 0, { techo: -35 });
// Q4 · el banco otra vez: vibra, atiende, Graciela, "Dale.", "¿Y? ¿Cobraste?", "Mejor. Cobré y vendí.", "inversiones",
// timbre, ding-dong
s("sfx/zumbido.wav", T.q4, 0, { loop: true, dur: r2(T.c - T.q4), fi: 0.1, fin: 0.2, techo: -46, lp: 900 });
whoosh(T.q4 - 0.04, -48);
toque(T.q4 + 0.12, -40); s("sfx/k-tono.wav", T.q4 + 0.16, 0, { techo: -44, dur: 0.2, fin: 0.06, lp: 2000 });
s("sfx/chisporroteo.wav", T.q4s, 0, { loop: true, desde: 2.0, dur: r2(T.q4p5 - T.q4s), fi: 0.1, fin: 0.15, techo: -45, lp: 3500 });
voz("g3", T.g3, -1);
voz("r5", T.r5, -1);
s("sfx/k-dos-tonos.wav", T.cuelga2, 0, { techo: -44, lp: 2200 });
whoosh(T.q4p5 - 0.04, -48);
voz("pa2", T.pa2b, -1);
voz("r6", T.r6, -1);
voz("pa4", T.pa4, -1);
s("sfx/k-switch-3.wav", T.timbre2, 0, { techo: -38 });
whoosh(T.flip2 - 0.15, -46);
dingdong(T.flip2 + 0.15, -34);
// C · el sillón de cuero, la taza en el platito, pop en COBRAR, la línea chica
whoosh(T.c - 0.08, -44);
s("sfx/k-cloth_2.wav", T.c + 0.02, 0, { techo: -42, dur: 0.35, fin: 0.1 });
voz("r7", T.r7, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// la cama +7 dB (con su duck)
for (const x of S) { const [f, , , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; } }
// la música: duck debajo de cada voz (~0,6) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.6])]; }

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
const IRIS_C = "540px 1150px";   // el iris se abre desde el celular de Graciela (Q1)
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
      <div id="precarga">Cobrar</div><div id="precarga2">Rotisería 2200</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Graciela
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
