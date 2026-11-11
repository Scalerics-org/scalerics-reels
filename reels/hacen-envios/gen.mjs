// Genera todo hacen-envios desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el gancho, el HUD de la parte 1 y de la parte 2: chip de hora,
//     "Cruces", las notificaciones del chat; las dos líneas habladas; el cartel; la línea chica final)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato "PARA MANDAR" completo (como me-haces-precio, las-siete-y-cincuenta-y-nueve y abren-hoy-completo) en UN solo
// proyecto: parte 1 (0 a P1), el cartel "Una tienda online más tarde…" (P1 a P2, HTML debajo del canvas: el canvas se
// va girando y vuelve con un iris) y la parte 2 (P2 a DUR). Sin narrador de marca ni tarjeta de videollamada.
// LIMPIO=1 node gen.mjs: sin capa plana ni firma (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, recortadas): hector1 1,01 ("¿Hacen" 0 · "envíos?" +0,3) · ruben1 1,31 ("Abrimos" 0 ·
// "sucursal." +0,5) · hector2 1,60 ("¡Qué" 0 · "cerquita" +0,1 · "que" +0,6 · "quedás," +0,7 · "Rubén!" +0,9) · coro:
// graciela 1,09 · marta 0,90 · walter 0,97 · vecino 1,04 · vecino2 0,91 · narrador 2,81 (reusado de las-siete:
// "Una" +0,24 · "tienda" +0,5 · "online" +1,0 · "más" +1,2 · "tarde." +2,07)
const T = {};
// ---- parte 1 ----
// P1 · adentro del almacén: Rubén detrás del mostrador (de espaldas a la vidriera), el celular en primer término con el
// chat de "Héctor · enfrente"; por la vidriera, Héctor saluda desde su ventana. P2 · la cámara cruza la calle sin corte
T.h1 = 0.25; T.levanta = 1.2; T.arranca = 1.6; T.p2 = 2.3; T.rotH = 2.9; T.pasos14 = 3.15;
// P3 · el picado de la calle: primer cruce (yerba) · P4 · el mismo picado, cada vez más rápido
T.p3 = 3.7;
T.x1 = [3.75, 4.75]; T.entrega1 = 4.8; T.gracias = 4.85; T.c1 = 5.05; T.v1 = [5.05, 5.55];
T.m2 = 5.6; T.x2 = [5.65, 6.2]; T.c2 = 6.3; T.h1926 = 6.3; T.v2a = [6.3, 6.65];
T.m3 = 6.65; T.giro3 = [6.68, 6.82]; T.v2b = [6.82, 6.97]; T.x3 = [6.97, 7.27]; T.c3 = 7.3; T.v3 = [7.3, 7.55];
T.m4 = 7.55; T.x4 = [7.6, 8.0]; T.c4 = 8.1; T.h1941 = 8.1; T.v4 = [8.1, 8.3];
// P5 · sale con el cajón; vibra "¿Fósforos tenés?"; corte al plano a ras de calle sobre la línea del medio; silencio de
// domingo; contraplano de Héctor; da vuelta el cajón, se sienta, el termo, el cartón SUCURSAL; push-in; "Abrimos sucursal."
T.sale5 = 8.3; T.m5 = 8.33; T.p5 = 8.7; T.para = 8.98; T.miraA = 9.0; T.p5c = 9.3; T.p5b = 9.7;
T.vuelca = 9.85; T.sienta = 10.1; T.termo = 10.3; T.carton = 10.5; T.push = 10.7; T.r1 = 10.8;
// P6 · la grúa: se prenden las ventanas de la cuadra (cada una con su "¿Hacen envíos?"), el coro, el farol
T.p6 = 12.15; T.ven = [12.6, 12.75, 12.88, 13.0, 13.12, 13.22, 13.32]; T.mira6 = 13.75; T.farol1 = 14.15;
const P1 = 14.6;                // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + 3.2);        // arranca la parte 2 (termina el iris del cartel)
// ---- parte 2 ----
// Q1 · por encima del hombro de Héctor: la tienda del almacén en su celular
T.q1 = P2; T.tildes = [r2(P2 + 0.05), r2(P2 + 0.2), r2(P2 + 0.35), r2(P2 + 0.5)]; T.duda = r2(P2 + 0.7); T.miraR = r2(P2 + 1.1);
T.retiro = r2(P2 + 1.6); T.pagado = r2(P2 + 2.0);
// Q2 · el picado al revés: cruza Héctor en pantuflas · Q2b · en la puerta del almacén: la bolsa y "¡Qué cerquita…!"
T.q2 = r2(P2 + 2.6); T.xh = [r2(P2 + 2.65), r2(P2 + 3.75)]; T.q2b = r2(P2 + 3.4); T.bolsa = r2(P2 + 4.0); T.h2 = r2(P2 + 4.12);
// Q3 · la moto de Nico con los envíos de lejos; el contador vuelve: "Cruces de Rubén: 0"
T.q3 = r2(T.h2 + 1.6 + 0.12); T.moto = r2(T.q3 + 0.1); T.aviso1 = r2(T.q3 + 0.3); T.aviso2 = r2(T.q3 + 0.6); T.cero = r2(T.q3 + 1.0);
// Q4 · la grúa de P6 al revés: las ventanas con "Pagado ✓" y la fila en pantuflas; el farol sobre la fila
T.q4 = r2(T.q3 + 2.2); T.pag = [r2(T.q4 + 0.1), r2(T.q4 + 0.25), r2(T.q4 + 0.4), r2(T.q4 + 0.55), r2(T.q4 + 0.7)];
T.fila = [r2(T.q4 + 0.8), r2(T.q4 + 3.9)]; T.farol2 = r2(T.q4 + 1.8);
T.cierre = r2(T.q4 + 2.75);
const DUR = r2(T.cierre + 2.0);

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
const VOCES = ["hector1", "hector2", "ruben1", "coro-graciela", "coro-marta", "coro-walter", "coro-vecino", "coro-vecino2"];
const ENV = Object.fromEntries(VOCES.map((v) => [v, envolvente(`assets/voice/${v}.wav`)]));
// el coro: quién entra cuándo (la ventana i del remate del remate dice su "¿Hacen envíos?" en T.ven[i])
const CORO = [["coro-graciela", 0], ["coro-marta", 1], ["coro-walter", 2], ["coro-vecino", 3], ["coro-vecino2", 5]];
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const CORO = ${JSON.stringify(CORO)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin globos ni rótulos (fondo de la portada)\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", NAVY2 = "#16243d", CR = "#efeee5", G = "#5ce611", RED = "#c7655b";
const BASE = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
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

// estilos compartidos: chip de hora, contador, notificación de chat
const HUDCSS = `
    P .chip { position: absolute; right: 70px; top: 1610px; height: 92px; padding: 0 30px; border-radius: 46px; background: ${NAVY}; border: 5px solid ${CR}; display: flex; align-items: center; gap: 16px; box-shadow: 0 8px 0 rgba(3,6,12,0.5); }
    P .chip .d { font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: 0.02em; }
    P .chip .h { position: relative; width: 132px; height: 52px; overflow: hidden; }
    P .chip .h span { position: absolute; left: 0; top: 0; font: 800 50px/52px "Lexend", sans-serif; color: ${G}; letter-spacing: -0.01em; }
    P .cruces { position: absolute; right: 70px; top: 330px; padding: 18px 34px 22px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; box-shadow: 12px 14px 0 rgba(5,10,20,0.85); display: flex; align-items: baseline; gap: 20px; transform-origin: 100% 0; }
    P .cruces .l { font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .cruces .n { position: relative; width: 74px; height: 96px; }
    P .cruces .n span { position: absolute; left: 0; right: 0; bottom: -6px; text-align: center; font: 900 104px/1 "Lexend", sans-serif; color: ${RED}; }
    P .noti { position: absolute; left: 50px; top: 560px; width: 480px; padding: 22px 28px 26px; border-radius: 34px; background: ${CR}; border: 7px solid ${NAVY}; box-shadow: 12px 14px 0 rgba(5,10,20,0.85); transform-origin: 0 0; }
    P .noti .de { display: flex; align-items: center; gap: 16px; font: 700 36px/1 "Lexend", sans-serif; color: ${NAVY2}; }
    P .noti .av { width: 50px; height: 50px; border-radius: 25px; background: #d9a441; border: 4px solid ${NAVY}; }
    P .noti .m { margin-top: 12px; font: 800 54px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }`;
const flipHora = (sel, horas) => horas.map(([t, i]) => i === 0 ? "" : `      tl.fromTo(qa("${sel} span")[${i - 1}], { yPercent: 0 }, { yPercent: -130, duration: 0.1, ease: "power2.in", immediateRender: false }, ${r2(t)});
      tl.set(qa("${sel} span")[${i - 1}], { opacity: 0 }, ${r2(t + 0.1)});
      tl.set(qa("${sel} span")[${i}], { opacity: 1 }, ${r2(t + 0.1)});
      tl.fromTo(qa("${sel} span")[${i}], { yPercent: 130 }, { yPercent: 0, duration: 0.18, ease: "back.out(2)", immediateRender: false }, ${r2(t + 0.1)});`).join("\n");

// P1 · el gancho entero en el cuadro 0 ("envíos" en el recuadro verde de selección); con la voz de Héctor (0,25) late
// y a los 1,25 s se achica y se va (arranca la notificación del chat)
{
  const id = "s00-gancho", ini = 0, dur = 1.5;
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .glo { position: absolute; left: 70px; right: 70px; top: 170px; padding: 30px 40px 42px; border-radius: 46px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 #050a14; text-align: center; transform-origin: 50% 0; }
    P .tx { font: 900 132px/1.08 "Lexend", sans-serif; letter-spacing: -0.025em; color: ${NAVY}; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: 6px 0 -2px; background: ${G}; border: 6px solid ${NAVY}; border-radius: 8px; }
    P .sel em { position: relative; font-style: normal; }
    P .de { font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY2}; margin-bottom: 14px; letter-spacing: 0.01em; }`,
    html: `      <div class="glo"><div class="de">Héctor · enfrente</div><div class="tx">¿Hacen<br><span class="sel"><b></b><em>envíos?</em></span></div></div>`,
    js: `      tl.fromTo(q(".glo"), { scale: 1 }, { scale: 1.05, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${T.h1});
      tl.fromTo(q(".sel b"), { scaleX: 1.2, scaleY: 1.35 }, { scaleX: 1, scaleY: 1, duration: 0.28, ease: "power3.out", immediateRender: false }, ${r2(T.h1 + 0.3)});
      tl.to(q(".glo"), { scale: 0.6, opacity: 0, y: -60, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.22)});`,
  });
}

// HUD de la parte 1: chip de hora (abajo a la derecha), "Cruces: N" (arriba a la derecha, número rojo apagado con pop)
// y las notificaciones del chat de Héctor (arriba a la izquierda: entran y salen, nunca más de una)
{
  const id = "s01-hud", ini = T.p3 - 0.05, dur = r2(P1 - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const L = (t) => r2(t - ini);
  const notis = [["¿Tenés pan?", T.m2, T.m3 - 0.05], ["¿Y hielo?", T.m3, T.m4 - 0.05], ["¿Me cambiás mil?", T.m4, T.m5 - 0.02], ["¿Fósforos tenés?", T.m5, T.p5 + 0.04]];
  escena(id, dur, {
    css: HUDCSS + `
    P .grupo { position: absolute; inset: 0; }`,
    html: `      <div class="grupo">
        <div class="cruces"><span class="l">Cruces:</span><span class="n">${[0, 1, 2, 3, 4].map((n) => `<span>${n}</span>`).join("")}</span></div>
        ${notis.map(([m], i) => `<div class="noti n${i}"><div class="de"><span class="av"></span>Héctor · enfrente</div><div class="m">${m}</div></div>`).join("\n        ")}
        <div class="chip"><span class="d">DOMINGO ·</span><span class="h">${["19:10", "19:26", "19:41"].map((h) => `<span>${h}</span>`).join("")}</span></div>
      </div>`,
    js: `      const nums = qa(".cruces .n span");
      nums.forEach((s, i) => tl.set(s, { opacity: i === 0 ? 1 : 0 }, 0));
      tl.fromTo(q(".cruces"), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)", immediateRender: true }, 0.05);
      tl.fromTo(q(".chip"), { y: 160 }, { y: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      ${[T.c1, T.c2, T.c3, T.c4].map((t, i) => `tl.set(nums[${i}], { opacity: 0 }, ${L(t)}); tl.set(nums[${i + 1}], { opacity: 1 }, ${L(t)});
      tl.fromTo(nums[${i + 1}], { scale: 1.9, y: -10 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(2.4)", immediateRender: false }, ${L(t)});
      tl.fromTo(q(".cruces"), { rotation: -4 }, { rotation: 0, duration: 0.3, ease: "elastic.out(1.2, 0.4)", immediateRender: false }, ${L(t)});`).join("\n      ")}
      qa(".chip .h span").forEach((s, i) => tl.set(s, { yPercent: i === 0 ? 0 : 130, opacity: i === 0 ? 1 : 0 }, 0));
${flipHora(".chip .h", [[L(T.h1926), 1], [L(T.h1941), 2]])}
      const notis = qa(".noti");
      ${notis.map(([, a, b], i) => `tl.set(notis[${i}], { opacity: 0 }, 0);
      tl.fromTo(notis[${i}], { opacity: 0, scale: 0.6, y: -40 }, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, ${L(a)});
      tl.fromTo(notis[${i}], { x: -6 }, { x: 6, duration: 0.04, repeat: 5, yoyo: true, ease: "none", immediateRender: false }, ${L(a + 0.02)});
      tl.to(notis[${i}], { opacity: 0, scale: 0.85, y: -30, duration: 0.14, ease: "power2.in" }, ${L(b - 0.14)});`).join("\n      ")}
      // en el plano a ras de calle el HUD se va (silencio de domingo): queda solo la escena
      tl.to(q(".grupo"), { opacity: 0, duration: 0.25, ease: "power2.in" }, ${L(T.p5 + 0.05)});`,
  });
}

// las líneas habladas, palabra por palabra; la clave en el recuadro verde
function linea(id, vozT, palabras, clave, fin, top = 1400) {
  const ini = r2(vozT + palabras[0][1] - 0.1), dur = r2(fin - ini);
  ESC.push([id, ini, dur, "arriba"]);
  const spans = palabras.map(([w, s], i) => `<span class="w${i === clave ? " ac" : ""}" data-t="${r2(vozT + s - ini)}">${i === clave ? `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>` : ""}<em>${w}</em></span>`).join(" ");
  escena(id, dur, {
    css: `
    P .linea { position: absolute; left: 60px; right: 60px; top: ${top}px; text-align: center; font: 800 100px/1.22 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; text-shadow: 0 6px 0 ${NAVY}, 0 0 18px rgba(11,18,32,0.9); }
    P .w { display: inline-block; position: relative; opacity: 0; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 22px; text-shadow: none; }
    P .w.ac em { color: ${NAVY}; }
    P .caja { position: absolute; left: -20px; right: -20px; top: 6px; bottom: 0; border: 5px solid ${NAVY}; background: ${G}; border-radius: 6px; box-shadow: 0 10px 0 rgba(11,18,32,0.45); }
    P .caja i { position: absolute; width: 18px; height: 18px; background: #fff; border: 4px solid ${NAVY}; }
    P .caja .c1 { left: -12px; top: -12px; } P .caja .c2 { right: -12px; top: -12px; } P .caja .c3 { left: -12px; bottom: -12px; } P .caja .c4 { right: -12px; bottom: -12px; }`,
    html: `      <p class="linea">${spans}</p>`,
    js: `      for (const w of qa(".w")) {
        const t = Number(w.dataset.t);
        tl.set(w, { opacity: 1 }, t);
        tl.fromTo(w, { y: 18, scale: 0.86 }, { y: 0, scale: 1, duration: 0.12, ease: "back.out(2)", immediateRender: false }, t);
        const c = w.querySelector(".caja");
        if (c) tl.fromTo(c, { scaleX: 1.25, scaleY: 1.4, transformOrigin: "50% 50%" }, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out", immediateRender: true }, t);
      }
      tl.to(q(".linea"), { opacity: 0, duration: 0.16, ease: "power2.in" }, ${r2(dur - 0.18)});`,
  });
}
linea("s02-sucursal", T.r1, [["Abrimos", 0.0], ["sucursal.", 0.5]], 1, r2(T.p6 + 0.35), 140);
linea("s05-cerquita", T.h2, [["¡Qué", 0.0], ["cerquita", 0.1], ["que", 0.6], ["quedás,", 0.7], ["Rubén!", 0.9]], 1, r2(T.q3 - 0.02), 1300);

// el cartel "Una tienda online más tarde…" (el de las-siete-y-cincuenta-y-nueve tal cual, con su audio). Va DEBAJO del
// canvas: el canvas se va girando (último cuadro de la parte 1) y vuelve abriéndose en un iris. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  // cada palabra entra con el narrador (Una 0,46 · tienda 0,72 · online 1,22 · más 1,42 · tarde 2,0: el audio va en P1 + 0,22)
  const palabra = (w, t0) => [...w].map((ch, i) => `<span class="l" data-t="${r2(t0 + i * 0.03)}">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(([w, t0]) => palabra(w, t0)).join('<span class="esp"></span>')}</span>`;
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
        ${lin("a", [["Una", 0.42], ["tienda", 0.62]])}
        ${lin("b", [["online", 1.18]])}
        ${lin("c", [["más", 1.4], ["tarde…", 1.95]])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      letras.forEach((l, i) => {
        const t0 = Number(l.dataset.t);
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 5; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});   // se va debajo del iris`,
  });
}

// HUD de la parte 2: chip "OTRO DOMINGO · 19:10"; los avisos de los envíos pagos; el contador que vuelve tachado y pasa
// a "Cruces de Rubén: 0" en verde
{
  const id = "s04-hud", ini = P2, dur = r2(T.cierre - P2 - 0.05);
  ESC.push([id, ini, dur, "arriba"]);
  const L = (t) => r2(t - ini);
  escena(id, dur, {
    css: HUDCSS + `
    P .chip .h { width: 132px; }
    P .chip { top: 150px; right: auto; left: 70px; }
    P .aviso { position: absolute; left: 70px; width: 560px; padding: 20px 28px 24px; border-radius: 30px; background: ${G}; border: 7px solid ${NAVY}; box-shadow: 12px 14px 0 rgba(5,10,20,0.85); font: 800 52px/1.15 "Lexend", sans-serif; color: ${NAVY}; transform-origin: 0 50%; }
    P .aviso small { display: block; font: 700 40px/1.2 "Lexend", sans-serif; color: ${NAVY2}; }
    P .a1 { top: 560px; } P .a2 { top: 750px; }
    P .cruces.r { top: 330px; }
    P .cruces.r .raya { position: absolute; left: 20px; right: 20px; top: 50%; height: 12px; margin-top: -2px; background: ${NAVY}; border: 3px solid ${CR}; border-radius: 6px; transform-origin: 0 50%; }
    P .cruces.v { top: 330px; background: ${G}; }
    P .cruces.v .n span { color: ${NAVY}; }`,
    html: `      <div class="chip"><span class="d">OTRO DOMINGO ·</span><span class="h"><span>19:10</span></span></div>
      <div class="aviso a1">Envío pago ✓<small>a 15 cuadras</small></div>
      <div class="aviso a2">Envío pago ✓<small>a 22 cuadras</small></div>
      <div class="cruces r"><span class="l">Cruces:</span><span class="n"><span>4</span></span><i class="raya"></i></div>
      <div class="cruces v"><span class="l">Cruces de Rubén:</span><span class="n"><span>0</span></span></div>`,
    js: `      tl.fromTo(q(".chip"), { y: -160 }, { y: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.to(q(".chip"), { opacity: 0, duration: 0.2 }, ${L(T.q2b - 0.2)});
      for (const [s, a] of [[".a1", ${L(T.aviso1)}], [".a2", ${L(T.aviso2)}]]) {
        tl.fromTo(q(s), { opacity: 0, scale: 0.5, x: -60 }, { opacity: 1, scale: 1, x: 0, duration: 0.24, ease: "back.out(2)", immediateRender: true }, a);
        tl.to(q(s), { opacity: 0, x: -40, duration: 0.18, ease: "power2.in" }, ${L(T.q4 - 0.05)});
      }
      tl.fromTo(q(".cruces.r"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: true }, ${L(T.cero - 0.45)});
      tl.fromTo(q(".cruces.r .raya"), { scaleX: 0 }, { scaleX: 1, duration: 0.16, ease: "power2.out", immediateRender: true }, ${L(T.cero - 0.15)});
      tl.to(q(".cruces.r"), { opacity: 0, scale: 0.8, duration: 0.12 }, ${L(T.cero)});
      tl.fromTo(q(".cruces.v"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)", immediateRender: true }, ${L(T.cero + 0.02)});
      tl.fromTo(q(".cruces.v .n span"), { scale: 2 }, { scale: 1, duration: 0.3, ease: "back.out(2.4)", immediateRender: true }, ${L(T.cero + 0.06)});
      tl.to(q(".cruces.v"), { opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.in" }, ${L(T.pag[0] - 0.1)});`,
  });
}

// la línea chica final (abajo): una línea y la web
{
  const id = "s06-cierre", ini = T.cierre, dur = r2(DUR - T.cierre);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1450px; padding: 26px 30px 30px; border-radius: 30px; background: rgba(11,18,32,0.96); border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 10px; font: 800 70px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Una tienda online cobra</div><div class="a">el pedido y el envío por vos</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.05);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), pan (-1..1), duck: [[a, b, k]] (baja la cama), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima
// del tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -38) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const pasos = (a, b, n, techo = -41, base = "paso") => { for (let i = 0; i < n; i++) s(`sfx/${base}-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo }); };
// ---- parte 1 ----
// ambiente de barrio (calle.wav) todo el reel; música liviana de barrio (pizzicato) que baja (no se corta) en el silencio
s("sfx/calle.wav", 0, -6, { loop: true, dur: r2(P2 + 0.1), fin: 0.3, techo: -40, lp: 2600, duck: [[T.p5, T.r1 - 0.05, 0.5]] });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -34, duck: [[T.h1 - 0.05, T.h1 + 1.05, 0.55], [T.p5 - 0.2, T.p6 + 0.2, 0.75], [T.ven[0] - 0.05, T.ven[6] + 1.2, 0.6]] });
s("sfx/vibra.wav", 0.0, 0, { dur: 0.6, fin: 0.08, techo: -36 });
s("sfx/notification.mp3", 0.05, 0, { dur: 0.9, fin: 0.3, techo: -40 });
s("voice/hector1.wav", T.h1, -2, { voz: true, fin: 0.04 });
s("sfx/whoosh.mp3", T.arranca, 0, { techo: -42 });
s("sfx/whoosh.mp3", T.p2 - 0.05, 0, { techo: -39 });
pop(T.rotH, -40); pop(T.pasos14, -39);
s("sfx/whoosh-short.mp3", T.p3 - 0.04, 0, { techo: -42 });
// los cruces: pasos acelerados; el pop del "¡Gracias, Rubén!"; tic en cada número
pasos(T.x1[0], T.x1[1], 12); pasos(T.v1[0], T.v1[1], 7, -44);
pop(T.gracias, -38);
for (const [t, k] of [[T.m2, 0], [T.m3, 1], [T.m4, 2], [T.m5, 3]]) { s("sfx/vibra.wav", t - 0.02, 0, { dur: 0.45, fin: 0.08, techo: -37 }); pop(t + 0.02, -40); }
pasos(T.x2[0], T.x2[1], 9); pasos(T.v2a[0], T.v2a[1], 5, -44);
s("sfx/whoosh-short.mp3", T.giro3[0], 0, { techo: -40 });
pasos(T.v2b[0], T.v2b[1], 3, -44); pasos(T.x3[0], T.x3[1], 7); pasos(T.v3[0], T.v3[1], 4, -44);
pasos(T.x4[0], T.x4[1], 8); pasos(T.v4[0], T.v4[1], 3, -44);
for (const t of [T.c1, T.c2, T.c3, T.c4]) { s("sfx/tic-real.mp3", t, 0, { techo: -36 }); pop(t + 0.01, -41); }
for (const t of [T.h1926, T.h1941]) s("sfx/tac-real.mp3", t + 0.06, 0, { techo: -42 });
// P5: sale con el cajón, pasos, para; silencio de domingo: pájaro, zumbido del farol; el cajón, el termo, el cartón
pasos(T.sale5, T.p5 + 0.25, 6, -42);
s("sfx/whoosh-short.mp3", T.p5 - 0.03, 0, { techo: -44 });
s("sfx/pajaro.wav", T.p5 + 0.12, 0, { dur: 1.3, fin: 0.3, techo: -40, pan: 0.4 });
s("sfx/zumbido.wav", T.p5, 0, { dur: r2(T.p6 - T.p5 + 0.6), fi: 0.3, fin: 0.4, techo: -46, lp: 900 });
s("sfx/whoosh-short.mp3", T.p5c - 0.03, 0, { techo: -46 });
s("sfx/whoosh-short.mp3", T.p5b - 0.03, 0, { techo: -46 });
s("sfx/madera-golpe.wav", T.vuelca + 0.12, 0, { techo: -35 });
s("sfx/cruje.wav", T.sienta + 0.1, 0, { techo: -40 });
s("sfx/madera-tabla.wav", T.termo + 0.08, 0, { dur: 0.25, fin: 0.1, techo: -42 });
s("sfx/papel.wav", T.carton, 0, { dur: 0.4, fin: 0.15, techo: -40 });
s("sfx/whoosh.mp3", T.push - 0.05, 0, { techo: -45 });
s("voice/ruben1.wav", T.r1, -1, { voz: true, fin: 0.04 });
// P6: la grúa, las ventanas (interruptor + pop + su voz), el celular de Rubén que vibra en ráfaga, el clac del farol
s("sfx/whoosh.mp3", T.p6 - 0.05, 0, { techo: -42 });
T.ven.forEach((t, i) => { s(i % 2 ? "sfx/interruptor2.wav" : "sfx/interruptor.wav", t - 0.03, 0, { techo: -43 - (i % 3) }); pop(t + 0.02, -42); });
const CORO_MIX = [["coro-graciela", 0, -3, -0.35, 0], ["coro-marta", 1, -5, 0.4, 5000], ["coro-walter", 2, -7, -0.5, 4000], ["coro-vecino", 3, -9, 0.55, 3500], ["coro-vecino2", 5, -11, -0.2, 3200]];
for (const [v, i, db, pan, lp] of CORO_MIX) s(`voice/${v}.wav`, T.ven[i], db, { voz: true, pan, lp: lp || undefined, fin: 0.04 });
for (let i = 0; i < 6; i++) s("sfx/vibra.wav", T.ven[1] + i * (0.36 - i * 0.03), 0, { dur: 0.3, fin: 0.06, techo: -42 });
s("sfx/interruptor.wav", T.farol1 - 0.02, 0, { techo: -36 });
s("sfx/zumbido.wav", T.farol1, 0, { desde: 2, dur: 0.6, fi: 0.02, fin: 0.3, techo: -44, lp: 1400 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -36 });
s("sfx/stinger.wav", P1 + 0.05, 0, { techo: -38, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.22, -1, { voz: true });
s("sfx/whoosh-short.mp3", P2 - 0.38, 0, { techo: -40 });
// ---- parte 2 ----
s("sfx/calle.wav", P2, -6, { desde: 2, dur: r2(DUR - P2), fin: 0.3, techo: -40, lp: 2600 });
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fin: 0.8, techo: -34, duck: [[T.h2 - 0.1, T.h2 + 1.7, 0.6]] });
T.tildes.forEach((t) => s("sfx/key-press.mp3", t, 0, { desde: 0.07, techo: -38 }));
s("sfx/click-soft.mp3", T.retiro, 0, { techo: -36 });
s("sfx/cero.mp3", T.pagado, 0, { techo: -36 });
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -42 });
s("sfx/puerta-abre.wav", T.xh[0] - 0.08, 0, { techo: -44 });
pasos(T.xh[0], T.xh[1], 10, -41, "pantufla");
s("sfx/whoosh-short.mp3", T.q2b - 0.04, 0, { techo: -44 });
s("sfx/campanita.wav", T.q2b + 0.0, 0, { techo: -42, dur: 0.6, fin: 0.25 });
s("sfx/papel.wav", T.bolsa, 0, { dur: 0.35, fin: 0.12, techo: -42 });
s("voice/hector2.wav", T.h2, -1, { voz: true, fin: 0.04 });
s("sfx/moto.mp3", T.moto - 0.3, 0, { techo: -33, fi: 0.1 });
pop(T.aviso1, -40); pop(T.aviso2, -40);
s("sfx/tic-real.mp3", T.cero - 0.15, 0, { techo: -38 });
s("sfx/ding.mp3", T.cero, 0, { techo: -38, dur: 0.9, fin: 0.4 });
s("sfx/whoosh.mp3", T.q4 - 0.05, 0, { techo: -42 });
T.pag.forEach((t, i) => { s(i % 2 ? "sfx/interruptor2.wav" : "sfx/interruptor.wav", t - 0.03, 0, { techo: -44 }); pop(t + 0.02, -42); });
pasos(T.fila[0], T.fila[1], 22, -44, "pantufla");
s("sfx/interruptor.wav", T.farol2 - 0.02, 0, { techo: -38 });
s("sfx/campanita.wav", T.cierre + 0.2, 0, { techo: -44, dur: 0.6, fin: 0.25 });

// arreglos por archivo (heredados)
for (const x of S) {
  const [f, , , o] = x;
  if (f === "sfx/papel.wav") { o.desde = r2((o.desde ?? 0) + 0.3); if (!o.dur) { o.dur = 0.75; o.fin = 0.2; } }
  if (f === "sfx/sello.wav") { o.dur = 0.3; o.fin = 0.05; }
}
for (const x of S) { const o = x[3]; if (o.fin && !o.dur) o.dur = r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 assets/${x[0]}`).toString()) - (o.desde ?? 0)); }
const lufs = {};
function lufsTramo(f, o) {
  const k = `${f}@${o.desde ?? 0}@${o.dur ?? "todo"}@${o.lp ?? 0}`;
  if (lufs[k] === undefined) {
    const corte = o.desde || o.dur ? `atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},` : "";
    const lp = o.lp ? `lowpass=f=${o.lp},` : "";
    const txt = execSync(`ffmpeg -hide_banner -nostats ${o.loop ? "-stream_loop 2 " : ""}-i assets/${f} -af "${corte}${lp}aresample=48000,aformat=channel_layouts=stereo,apad=pad_dur=1,ebur128=peak=true" -f null - 2>&1`).toString();
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
    let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
    if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
    if (o.lp) c += `,lowpass=f=${o.lp}`;
    if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
    if (o.fi) c += `,afade=t=in:st=0:d=${o.fi}`;
    if (o.voz) c += ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    if (o.pan) { const l = r2(Math.min(1, 1 - o.pan)), r = r2(Math.min(1, 1 + o.pan)); c += `,pan=stereo|c0=${l}*c0|c1=${r}*c1`; }
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k] of o.duck || []) { const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/0.4,0,1)*clip((${b}-t)/0.4,0,1)':eval=frame`; }
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
const abajo = ESC.filter((e) => e[3] === "abajo").map((e, i) => host(e, 10 + i, 1)).join("\n");
const arriba = capa("arriba").map((e, i) => host(e, i, 3)).join("\n");
const ROT = r2(P1), IRIS = r2(P2 - 0.32);
const IRIS_C = "540px 900px";
// la firma (logo) abajo al centro (no en el cartel, ni sobre la línea chica final, ni en los primeros planos del chat)
const FIRMAS = [[T.p3, T.p5], [T.q2, T.q2b], [T.q3, T.q4]];
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
      #precarga2 { position: absolute; left: -9999px; font: 700 40px "Caveat"; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #16243d; }
      #fondo { position: absolute; inset: 0; background: #16243d; z-index: 0; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; z-index: 2; transform-origin: 540px 960px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      .firma { position: absolute; left: 50%; top: 1795px; height: 46px; width: auto; transform: translateX(-50%); opacity: 0.95; z-index: 4; filter: drop-shadow(0 0 3px rgba(11,18,32,0.95)) drop-shadow(0 0 10px rgba(11,18,32,0.85)); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="precarga">Héctor</div><div id="precarga2">SUCURSAL</div>
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
${abajo}
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${arriba}
${LIMPIO ? "" : FIRMAS.map(([a, b], i) => `      <img id="firma${i}" class="firma clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="${a}" data-duration="${r2(b - a)}" data-track-index="9" />`).join("\n")}
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
      // el último cuadro de la parte 1 se va girando 540° y achicándose (el giro clásico del cartel)
      tl.fromTo("#capa3d", { scale: 1, rotation: 0 }, { scale: 0.001, rotation: 540, duration: 0.26, ease: "power2.in", immediateRender: false }, ${ROT});
      tl.fromTo("#capa3d", { opacity: 1 }, { opacity: 0, duration: 0.12, ease: "none", immediateRender: false }, ${r2(ROT + 0.12)});
      // la parte 2 entra por un iris que se abre desde el celular de Héctor
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(0px at ${IRIS_C})" }, { clipPath: "circle(1700px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
