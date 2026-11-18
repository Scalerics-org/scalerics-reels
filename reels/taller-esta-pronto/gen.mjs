// Genera todo taller-esta-pronto desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (TALLERES del cuadro 0, los chips de día y hora, el contador "Salió a
//     atender", la línea de la pantalla partida, el cartel "Un aviso automático más tarde…", "Comentá PRONTO" y la línea
//     chica final); las burbujas de diálogo y los rótulos son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/dist-quien-debe (mezcla: bus → ganancia a -14 LUFS → limitador, techo ≤ -3 dBFS) con el taller de
// reels/taller-presupuestos. Parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la
// solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
// (mientras faltan voces: duración estimada del plan)
const ESTIMA = { g1: 1.0, o1: 0.6, w1: 0.7, o2: 0.7, m1: 1.9, o3: 0.5, d1: 1.1, o4: 1.3, nar: 2.2, g2: 2.0, o5: 0.8, d2: 0.7, o6: 1.2, m2: 0.6, o7: 3.0 };
const durWav = (f, k) => (fs.existsSync(f) ? r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString())) : ESTIMA[k]);

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh):
//   g1 Graciela "Óscar, ¿está pronto?" · o1 Óscar "A la tarde." · w1 Walter "¿Está pronto?" · o2 Óscar "A la tarde."
//   (cansado) · m1 Maxi "Jefe, el de Daniel: pierde la bomba de agua." (se reusa igual en Q3) · o3 Óscar "¡Daniel!" ·
//   d1 Daniel "Óscar, ¿está pronto?" · o4 Óscar "Está pronto para empezar." · nar "Un aviso automático más tarde." ·
//   g2 Graciela "¡Ay, mi autito! Ya lo están mirando." · o5 Óscar "Mandale la foto." · d2 Daniel "Dale, cambiala." ·
//   o6 Óscar "Maxi, ¿está pronto el mate?" · m2 Maxi "A la tarde." · o7 Óscar "Comentá PRONTO y te mando cómo funciona
//   para tu taller."
const VOCES = ["g1", "o1", "w1", "o2", "m1", "o3", "d1", "o4", "g2", "o5", "d2", "o6", "m2", "o7"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`, v)]));
const PAL = fs.existsSync("assets/voice/palabras-o7.json") ? JSON.parse(fs.readFileSync("assets/voice/palabras-o7.json", "utf8")) : null;
const palabraO7 = (i) => (PAL ? r2(PAL[i].start ?? PAL[i].a) : 0.12 + i * 0.3);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: martes 10:00, el taller lleno; suena el celular en el banquito (GRACIELA) y Óscar sale rodando de abajo
// del auto de Graciela en la camilla; "Óscar, ¿está pronto?" / "A la tarde." y vuelve a rodar abajo
T.ring1 = 0.0; T.sale1 = [0.0, 0.42]; T.cont1 = 0.12;
T.g1 = 0.12; T.o1 = r2(T.g1 + LEN.g1 + 0.15); T.vuelve1 = r2(T.o1 + LEN.o1 + 0.05);
// P2 · abajo del elevador: Maxi con la lámpara, la bomba de agua que gotea: "Jefe, el de Daniel: pierde la bomba de agua."
T.p2 = r2(T.o1 + LEN.o1 + 0.2); T.m1 = r2(T.p2 + 0.1);
// P3 · el celular de Óscar: Llamando a Daniel… No contesta (×2) · le deja un audio de 0:47 ("Daniel, llamame") que queda
// sin escuchar: Entregado ✓✓ 10:16 y nada (sin foto ni precio: Daniel no sabe qué aprobar)
T.p3 = r2(T.m1 + LEN.m1 + 0.08);
T.llama = [r2(T.p3 + 0.02), r2(T.p3 + 0.3)]; T.nocont = [r2(T.p3 + 0.18), r2(T.p3 + 0.46)];
T.foto = r2(T.p3 + 0.52); T.entregado = r2(T.p3 + 0.64);
// P4 · la escalada: cortes rápidos con el chip del día (Walter, Sergio, Silvia, Graciela), una burbuja por salida; en el
// último, Óscar, cansado: "A la tarde." · la pizarra con los services del miércoles tachados y los rótulos del costo
T.p4 = r2(T.p3 + 1.7); T.c0 = T.p4; T.sale4 = [r2(T.p4 - 0.01), T.p4];
const CORTE = 0.42;
T.cortes = [0, 1, 2].map((i) => r2(T.c0 + i * CORTE));
T.o2 = r2(T.cortes[2] + 0.2); T.vuelve4 = r2(T.o2 + LEN.o2 + 0.05);
T.piz = r2(T.o2 + LEN.o2 + 0.12); T.tacha = [0.1, 0.25, 0.4, 0.55].map((d) => r2(T.piz + d)); T.rotP = [r2(T.piz + 0.05), r2(T.piz + 0.22)];
// P5 · miércoles 18:00: el celular dice DANIEL; la camilla sale disparada; Óscar se sienta: "¡Daniel!" · pantalla partida
// con Daniel en el ómnibus: "Óscar, ¿está pronto?"
T.p5 = r2(T.piz + 1.45); T.sale5 = [r2(T.p5 + 0.1), r2(T.p5 + 0.32)]; T.sienta = [r2(T.p5 + 0.18), r2(T.p5 + 0.5)];
T.o3 = r2(T.p5 + 0.42); T.split = r2(T.o3 + LEN.o3 + 0.02); T.d1 = r2(T.o3 + LEN.o3 + 0.14);
// P6 · el remate: la mirada al auto clavado arriba · primer plano de Óscar, pausa: "Está pronto para empezar."
T.p6 = r2(T.d1 + LEN.d1 + 0.06); T.gota6 = r2(T.p6 + 0.18); T.p6b = r2(T.p6 + 0.38); T.o4 = r2(T.p6b + 0.38);
// P7 · remate del remate: se acuesta y rueda abajo; suena otra vez (GRACIELA); se empuja para salir y una ruedita se sale
T.p7 = r2(T.o4 + LEN.o4 + 0.1); T.vuelve7 = [r2(T.p7 + 0.0), r2(T.p7 + 0.38)]; T.ring7 = r2(T.p7 + 0.44); T.empuja = r2(T.p7 + 0.66);
T.sueltaR = r2(T.p7 + 0.74); T.frena = r2(T.p7 + 1.3);
const P1 = r2(T.p7 + 1.2);                              // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.2, LEN.nar + 0.08));
// ---- parte 2 ----
// Q1 · el encuadre del cuadro 0, martes 10:00: el celular del banquito, quieto, se prende solo ("Aviso enviado ✓") · Q1i
// el celular de Graciela en su mostrador: "Tu auto: En diagnóstico" con la foto y los pasos · Q1g Graciela: "¡Ay, mi
// autito! Ya lo están mirando."
T.q1 = P2; T.aviso = r2(P2 + 0.0); T.q1i = r2(P2 + 1.1); T.llegaG = r2(T.q1i - 0.03); T.q1g = r2(T.q1i + 1.1); T.g2 = r2(T.q1g + 0.1);
// Q2 · el panel "Autos en el taller": las tarjetas de a una, "Avisado ✓", los ceros
T.q2 = r2(T.g2 + LEN.g2 + 0.08); T.tarj = [0.0, 0.2, 0.4, 0.6].map((d) => r2(T.q2 + d)); T.ceros = r2(T.q2 + 0.26);
// Q3 · el mismo plano de P2, el mismo audio de Maxi · Q3o Óscar desde abajo del auto: "Mandale la foto." · Q3f la foto
// (flash) · Q3d el celular de Daniel en el ómnibus: el extra con Aprobar · Q3e Daniel: "Dale, cambiala." · Q3a Aprobado ✓
T.q3 = r2(T.q2 + 1.38); T.m1b = r2(T.q3 + 0.1);
T.q3o = r2(T.m1b + LEN.m1 + 0.04); T.o5 = r2(T.q3o + 0.08);
T.q3f = r2(T.o5 + LEN.o5 + 0.04); T.flash = r2(T.q3f + 0.34);
T.q3d = r2(T.q3f + 0.42); T.llegaD = r2(T.q3d - 0.03);
T.q3e = r2(T.q3d + 1.12); T.d2 = r2(T.q3e + 0.1);
T.q3a = r2(T.d2 + LEN.d2 + 0.06); T.aprueba = r2(T.q3a + 0.14); T.aprobado = r2(T.q3a + 0.26);
// Q4 · martes 12:30: el plano del elevador y la pizarra; baja el auto de Daniel arreglado; la pizarra con tildes; los
// rótulos · Q4b el ómnibus: "Pronto para retirar ✓" y Daniel toca el timbre de parada
T.q4 = r2(T.q3a + 0.66); T.baja = [r2(T.q4 + 0.05), r2(T.q4 + 0.9)]; T.q4p = r2(T.q4 + 1.14); T.tilde = [0.08, 0.2, 0.32, 0.44].map((d) => r2(T.q4p + d)); T.rotQ = [r2(T.q4 + 0.03), r2(T.q4p + 0.0)];
T.q4b = r2(T.q4p + 1.11); T.llegaP = r2(T.q4b - 0.03);
// Q5 · martes 17:30, el encuadre del cuadro 0 con la luz de tarde: "Maxi, ¿está pronto el mate?" / "A la tarde." y Óscar
// sale rodando por el mate
T.q5 = r2(T.q4b + 1.12); T.o6 = r2(T.q5 + 0.12); T.m2 = r2(T.o6 + LEN.o6 + 0.12);
T.q5b = r2(T.m2 - 0.12); T.sale6 = [r2(T.m2 + LEN.m2 + 0.3), r2(T.m2 + LEN.m2 + 0.72)]; T.chipMate = r2(T.m2 + LEN.m2 + 0.72);
// C · Óscar sentado en la camilla, a cámara, con el mate: "Comentá PRONTO y te mando cómo funciona para tu taller."
T.c = r2(T.m2 + LEN.m2 + 1.42); T.sorbo = r2(T.c - 0.1); T.o7 = r2(T.c + 0.08);
T.palabra = r2(T.o7 + palabraO7(1));                   // la tarjeta entra sobre "PRONTO"
const DUR = Math.ceil((Math.ceil((T.o7 + LEN.o7 + 0.18) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.35));
// el contador "Salió a atender" (parte 1): [t, n]
T.cont = [[T.cont1, 1], [T.cortes[0], 5], [T.cortes[1], 14], [T.cortes[2], 22], [r2(T.sale5[0] + 0.05), 23], [r2(T.empuja + 0.06), 24]];

// ---------- envolventes de las voces a 30 cuadros por segundo (para mover la boca) ----------
function envolvente(archivo) {
  if (!fs.existsSync(archivo)) return Array(60).fill(0.4);
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
    P .chip { position: absolute; left: 40px; padding: 14px 28px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 58px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }`;
// el contador: caja con "Salió a atender" arriba y el número grande; crema hasta 9, rojo apagado desde 10, verde en la parte 2
const CONT = `
    P .cont { position: absolute; right: 40px; width: 330px; padding: 12px 10px 14px; border-radius: 24px; border: 6px solid ${CR}; text-align: center; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); transform-origin: 50% 50%; }
    P .cont .a { font: 800 38px/1.05 "Lexend", sans-serif; letter-spacing: -0.02em; }
    P .cont .n { font: 900 96px/1 "Lexend", sans-serif; letter-spacing: -0.03em; margin-top: 4px; }
    P .cont.c0 { background: ${NAVY}; color: ${CR}; }
    P .cont.c1 { background: ${RED}; color: ${CR}; border-color: ${CR}; }
    P .cont.c2 { background: ${NAVY}; color: ${G}; border-color: ${G}; }`;
// P1 · el rubro: "TALLERES" enorme arriba (navy en el recuadro verde, caja navy con borde crema), entero desde el cuadro 0;
// debajo el chip "Martes, 10:00." y el contador; se van con el corte a P2
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  const vals = T.cont.filter(([t]) => t < T.p2);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 34px; right: 34px; top: 62px; padding: 16px 4px 22px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 172px/1.04 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 26px; }
    P .sel b { position: absolute; inset: -8px 0 -4px; background: ${G}; border: 7px solid ${CR}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}${CONT}
    P .chip { top: 340px; } P .cont { top: 322px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>TALLERES</em></span></div></div>
      <div class="chip">Martes, 10:00.</div>
      <div class="cont c0"><div class="a">Óscar salió<br>a atender</div><div class="n">0</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.3);
${vals.map(([t, n]) => `      tl.set(q(".cont .n"), { textContent: "${n}" }, ${t});
      tl.fromTo(q(".cont"), { scale: 1 }, { scale: 1.14, duration: 0.08, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${t});`).join("\n")}`,
  });
}
// el contador en el resto de la parte 1 (arriba a la derecha), con los chips de día y hora a la izquierda
{
  const id = "s01-cont", ini = r2(T.p2), dur = r2(P1 - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const vals = T.cont.filter(([t]) => t >= T.p2);
  const n0 = T.cont.filter(([t]) => t < T.p2).at(-1)[1];
  const chips = [[T.cortes[0], "Martes, 12:10."], [T.cortes[1], "Miércoles, 9:00."], [T.cortes[2], "Miércoles, 14:30."], [T.p5, "Miércoles, 18:00."]];
  escena(id, dur, {
    css: `${CHIP}${CONT}
    P .chip { top: 92px; display: none; } P .cont { top: 74px; }`,
    html: `      <div class="cont c0"><div class="a">Óscar salió<br>a atender</div><div class="n">${n0}</div></div>
${chips.map((_, i) => `      <div class="chip k${i}">${chips[i][1]}</div>`).join("\n")}`,
    js: `${vals.map(([t, n]) => `      tl.set(q(".cont .n"), { textContent: "${n}" }, ${r2(t - ini)});${n >= 10 ? `
      tl.set(q(".cont"), { className: "cont c1" }, ${r2(t - ini)});` : ""}
      tl.fromTo(q(".cont"), { scale: 1 }, { scale: 1.16, duration: 0.08, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(t - ini)});`).join("\n")}
      // el contador se esconde en el inserto del celular (P3), en la pantalla partida y en el primer plano del remate
      tl.set(q(".cont"), { display: "none" }, ${r2(T.p3 - ini)}); tl.set(q(".cont"), { display: "block" }, ${r2(T.p4 - ini)});
      tl.set(q(".cont"), { display: "none" }, ${r2(T.split - ini)}); tl.set(q(".cont"), { display: "block" }, ${r2(T.p7 - ini)});
${chips.map(([t], i) => `      tl.set(q(".k${i}"), { display: "block" }, ${r2(t - ini)}); tl.set(q(".k${i}"), { display: "none" }, ${r2((i < chips.length - 1 ? (i === 2 ? T.piz : chips[i + 1][0]) : T.split) - ini)});
      tl.fromTo(q(".k${i}"), { scale: 0.85, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.12, ease: "back.out(1.6)", immediateRender: false }, ${r2(t - ini)});`).join("\n")}`,
  });
}
// los chips de la parte 2 y el contador en verde
const CHIPS2 = [
  ["s02-chip", r2(T.q1 - 0.3), T.q1i, "Martes, 10:00.", true],
  ["s03-chip", T.q4, T.q4b, "Martes, 12:30.", false],
  ["s04-chip", T.q5, r2(Math.max(T.c, T.chipMate + 1.1)), "Martes, 17:30.", true],
];
for (const [id, ini0, fin, txt, conCont] of CHIPS2) {
  const ini = r2(ini0), dur = r2(fin - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  const mate = id === "s04-chip";
  escena(id, dur, {
    css: `${CHIP}${CONT}
    P .chip { top: 92px; } P .cont { top: 74px; }
    P .mate { position: absolute; right: 40px; top: 330px; padding: 12px 24px 16px; border-radius: 22px; background: ${G}; border: 6px solid ${NAVY}; font: 900 44px/1.05 "Lexend", sans-serif; color: ${NAVY}; text-align: center; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); }`,
    html: `      <div class="chip">${txt}</div>${conCont ? `
      <div class="cont c2"><div class="a">Óscar salió<br>a atender</div><div class="n">0</div></div>` : ""}${mate ? `
      <div class="mate">Salió por el mate: 1</div>` : ""}`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);${mate ? `
      tl.fromTo(q(".mate"), { scale: 0, transformOrigin: "100% 0%" }, { scale: 1, duration: 0.22, ease: "back.out(2)", immediateRender: true }, ${r2(T.chipMate - ini)});` : ""}`,
  });
}
// la línea de la pantalla partida (navy de 10 px al medio) con el chip "En llamada · Daniel"
{
  const id = "s05-split", ini = T.split, dur = r2(T.p6 - T.split);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 0; right: 0; top: 955px; height: 10px; background: ${NAVY}; }
    P .chipL { position: absolute; left: 50%; top: 960px; transform: translate(-50%, -50%); padding: 12px 30px 15px; border-radius: 40px; background: ${NAVY}; border: 5px solid ${CR}; font: 800 44px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; display: flex; align-items: center; gap: 16px; }
    P .chipL i { width: 22px; height: 22px; border-radius: 50%; background: ${G}; display: inline-block; }`,
    html: `      <div class="linea"></div>
      <div class="chipL"><i></i><span>En llamada · Daniel</span></div>`,
    js: `      tl.fromTo(q(".chipL"), { scale: 0.7 }, { scale: 1, duration: 0.18, ease: "back.out(2)", immediateRender: true }, 0);
      tl.fromTo(q(".chipL i"), { opacity: 1 }, { opacity: 0.25, duration: 0.25, ease: "none", yoyo: true, repeat: 3, immediateRender: false }, 0.05);`,
  });
}

// el cartel "Un aviso automático más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = 1.18;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 600px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 132px; margin-top: 10px; }
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
          <circle class="bu" cx="1290" cy="1760" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
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

// C · "Comentá PRONTO" + "y te mando cómo funciona para tu taller", debajo de la cara de Óscar
{
  const id = "s10-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1120px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 164px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 48px/1.2 "Lexend", sans-serif; color: ${NAVY}; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>PRONTO</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu taller</div></div>`,
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
    P .caja { position: absolute; left: 60px; right: 60px; top: 1600px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 46px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Avisos automáticos</div><div class="a">del estado del auto</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, y: 40 }, { scale: 1, y: 0, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
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
const voz = (f, t, db = -1, o = {}) => { if (!fs.existsSync(`assets/voice/${f}.wav`)) return; s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const noti = (t, techo = -36) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -42) => s("sfx/k-tick-1.wav", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
// el celular que suena (ringtone + vibración sobre el banquito); dur = cuánto suena
const ring = (t, dur = 0.6, techo = -34) => { s("sfx/bsb-ring.wav", t, 0, { techo, desde: 0.05, dur, fin: 0.08, lp: 5000 }); s("sfx/vibra.wav", t, 0, { techo: techo - 4, dur: Math.min(dur, 0.5), fin: 0.1 }); };
// las rueditas de la camilla sobre el hormigón (rodada corta)
const rueda = (t, dur = 0.4, techo = -36, desde = 1.0) => s("sfx/bsb-rueditas.wav", t, 0, { techo, desde, dur, fi: 0.04, fin: 0.1, hp: 140 });
// ---- parte 1 ----
// ambiente: la calle por el portón, la radio del taller (la cama con pasabajos) y algo de trabajo de fondo
s("sfx/calle.wav", 0, 0, { loop: true, dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -47, lp: 1800 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -37, lp: 3200, hp: 180, duck: [[T.p6 - 0.1, T.p7, 0.8]] });
// P1 · suena, sale rodando, contador, Graciela, Óscar, vuelve
ring(T.ring1, 0.95, -33);
rueda(T.sale1[0], 0.45, -35);
tic(T.cont1, -40);
voz("g1", T.g1, -1);
voz("o1", T.o1, -1);
rueda(T.vuelve1, 0.4, -37, 2.0);
// P2 · la lámpara (zumbido), las gotas
s("sfx/zumbido.wav", T.p2, 0, { dur: r2(T.p3 - T.p2), fi: 0.1, fin: 0.15, techo: -44, lp: 900 });
s("sfx/gota.wav", T.p2 + 0.1, 0, { techo: -38, dur: 0.5, fin: 0.15 });
voz("m1", T.m1, -1);
s("sfx/gota.wav", T.m1 + LEN.m1 - 0.1, 0, { techo: -40, dur: 0.5, fin: 0.15 });
// P3 · el celular: tono de llamada cortado ×2, no contesta ×2, la foto que vuela, enviado
whoosh(T.p3 - 0.04, -46);
for (let i = 0; i < 2; i++) { s("sfx/k-tono.wav", T.llama[i] + 0.04, 0, { techo: -40, dur: 0.3, fin: 0.06, lp: 2200 }); s("sfx/k-dos-tonos.wav", T.nocont[i], 0, { techo: -40, lp: 2200 }); }
s("sfx/k-tick-2.wav", T.foto, 0, { techo: -42 }); whoosh(T.foto + 0.05, -46);
s("sfx/notification.mp3", T.entregado, 0, { techo: -40, dur: 0.35, fin: 0.12 });
// P4 · los cortes (cada uno su timbre corto, rueditas y tic); en el último, "A la tarde." cansado; la pizarra
voz("o2", T.o2, -1);
T.cortes.forEach((c, i) => { whoosh(c - 0.03, -46); ring(c, 0.3 - i * 0.04, -36); rueda(c + 0.08, 0.22, -38, 2 + i * 0.6); tic(c, -40); pop(c + 0.06, -42); });
whoosh(T.piz - 0.04, -44);
T.tacha.forEach((t, i) => s("sfx/bsb-fibron.wav", t - 0.02, 0, { techo: -38, desde: 0.05 + i * 0.35, dur: 0.22, fin: 0.06 }));
T.rotP.forEach((t) => pop(t, -40));
// P5 · DANIEL: suena, sale disparado (rueditas rápidas), se sienta; "¡Daniel!"; la pantalla partida con el ómnibus
ring(T.p5, 0.3, -33);
rueda(T.sale5[0], 0.3, -33, 4.0);
tic(T.sale5[0] + 0.05, -40);
s("sfx/k-cloth_2.wav", T.sienta[0], 0, { techo: -42, dur: 0.3, fin: 0.1 });
voz("o3", T.o3, -1);
s("sfx/bsb-omnibus.wav", T.split, 0, { desde: 2.0, dur: r2(T.p6 - T.split + 0.1), fi: 0.08, fin: 0.12, techo: -40, lp: 2500 });
voz("d1", T.d1, -1);
// P6 · la gota, la pausa, el remate sin nada encima
s("sfx/gota.wav", T.gota6, 0, { techo: -36, dur: 0.5, fin: 0.15 });
voz("o4", T.o4, -1);
// P7 · se acuesta y rueda; suena; se empuja: tac, la ruedita que se aleja; el stinger lo da el cartel
rueda(T.vuelve7[0], 0.4, -37, 2.5);
ring(T.ring7, 0.55, -34);
rueda(T.empuja - 0.05, 0.15, -37, 3.5);
s("sfx/k-plastico.wav", T.sueltaR, 0, { techo: -33 });
tic(T.empuja + 0.06, -40);
s("sfx/bsb-rueditas.wav", T.sueltaR + 0.08, 0, { techo: -40, desde: 0.3, dur: r2(T.frena - T.sueltaR - 0.05), fi: 0.03, fin: 0.25, hp: 600, vel: 1.4 });
s("sfx/k-plastico.wav", T.frena, 0, { techo: -42, vel: 1.2 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
if (fs.existsSync("assets/voice/narrador.wav")) { s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]); }
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 1.3, 1.7]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.c - P2), fi: 0.4, fin: 0.3, techo: -36 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -37 });
s("sfx/calle.wav", P2, 0, { loop: true, desde: 6, dur: r2(T.q1i - P2 + 0.1), fi: 0.1, fin: 0.1, techo: -47, lp: 1800 });
// Q1 · el celular del banquito se prende sin sonar; el de Graciela recibe el aviso; la rotisería (spiedo); Graciela
toque(T.aviso, -36); ding(T.aviso + 0.06, -38);
whoosh(T.q1i - 0.05, -44);
noti(T.llegaG + 0.05, -35);
s("sfx/chisporroteo.wav", T.q1i, 0, { loop: true, desde: 1.0, dur: r2(T.q2 - T.q1i), fi: 0.2, fin: 0.15, techo: -45, lp: 3500 });
voz("g2", T.g2, -1);
// Q2 · el panel: whoosh, pop por tarjeta, ding suave por "Avisado ✓", los ceros
whoosh(T.q2 - 0.05, -44);
T.tarj.forEach((t, i) => { pop(t, -42); ding(t + 0.12, -41 + (i === 0 ? 2 : 0)); });
pop(T.ceros, -38); tic(T.ceros + 0.05, -42);
// Q3 · el mismo audio de Maxi, "Mandale la foto.", el obturador, el extra en el ómnibus, "Dale, cambiala.", Aprobar
s("sfx/zumbido.wav", T.q3, 0, { dur: r2(T.q3o - T.q3), fi: 0.1, fin: 0.15, techo: -44, lp: 900 });
s("sfx/gota.wav", T.q3 + 0.0, 0, { techo: -42, dur: 0.5, fin: 0.15 });
voz("m1", T.m1b, -1);
voz("o5", T.o5, -1);
s("sfx/bsb-foto.wav", T.flash - 0.03, 0, { techo: -38 });
s("sfx/bsb-omnibus.wav", T.q3d - 0.05, 0, { desde: 6.0, dur: r2(T.q4 - T.q3d + 0.1), fi: 0.1, fin: 0.15, techo: -41, lp: 2500 });
noti(T.llegaD + 0.05, -35);
voz("d2", T.d2, -1);
toque(T.aprueba, -36); ding(T.aprobado, -35);
// Q4 · el elevador baja (motor), la pistola neumática, los tildes de la pizarra, los rótulos; el ómnibus: el aviso, el timbre de parada
whoosh(T.q4 - 0.05, -44); whoosh(T.q4p - 0.05, -46);
s("sfx/k-switch-3.wav", T.baja[0] - 0.05, 0, { techo: -40 });
s("sfx/elevador.wav", T.baja[0], 0, { techo: -36, dur: r2(T.baja[1] - T.baja[0] + 0.2), fi: 0.1, fin: 0.25, hp: 120 });
s("sfx/bsb-neumatica.wav", T.baja[1] + 0.05, 0, { techo: -38, dur: 0.7, fin: 0.15 });
T.tilde.forEach((t, i) => { s("sfx/bsb-fibron.wav", t - 0.02, 0, { techo: -40, desde: 1.0 + i * 0.15, dur: 0.15, fin: 0.05 }); tic(t + 0.05, -44); });
T.rotQ.forEach((t) => pop(t, -40));
s("sfx/bsb-omnibus.wav", T.q4b - 0.05, 0, { desde: 12.0, dur: r2(T.q5 - T.q4b - 0.05), fi: 0.1, fin: 0.2, techo: -42, lp: 2500 });
whoosh(T.q4b - 0.05, -46);
noti(T.llegaP + 0.05, -36);
// Q5 · la tarde tranquila: la radio un poco más alta, "¿está pronto el mate?", "A la tarde.", las rueditas, el chip
s("sfx/calle.wav", T.q5, 0, { desde: 9, dur: r2(DUR - T.q5), fi: 0.15, fin: 0.4, techo: -48, lp: 1500 });
whoosh(T.q5 - 0.08, -50);
voz("o6", T.o6, -1);
voz("m2", T.m2, -1);
rueda(T.sale6[0], 0.42, -37, 1.2);
pop(T.chipMate, -40);
// C · el sorbo, Óscar a cámara, pop en PRONTO, la línea chica
s("sfx/sorbo.wav", T.sorbo, 0, { techo: -40, dur: 0.3, fin: 0.1 });
voz("o7", T.o7, -1);
pop(T.palabra + 0.02, -38);
pop(T.cierre + 0.05, -44);
// la cama +7 dB (con su duck)
for (const x of S) { const [f, , , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; } }
// la música: duck debajo de cada voz (~0,6) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a - 0.25, b + 0.3, 0.6])]; }

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
const IRIS_C = "540px 1250px";   // el iris se abre desde el banquito con el celular (Q1)
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
      <div id="precarga">Óscar ¿Está pronto?</div><div id="precarga2">SERVICE · FABIÁN 9:00</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el banquito
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
