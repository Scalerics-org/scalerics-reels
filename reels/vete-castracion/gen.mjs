// Genera todo vete-castracion desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Unos avisos automáticos más
//     tarde…", "Comentá AVISOS" y la línea chica final); las burbujas, chips y rótulos son 3D pegados a la cámara
//     (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: música, ambiente, SFX y voces mezclados con ffmpeg (techo por efecto)
// Formato completo (como vete-racion): parte 1 (0 a P1), el cartel (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a
// DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1 node gen.mjs: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además escribe stems voz / resto.
// SINAUDIO=1: no rehace la mezcla.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, partes/procesar.sh): v1 Vero "¿Cómo está Toto?" (P1 por teléfono y Q5 en persona) · b2 Bruno "Vero.
// Te estoy viendo." · b3 "Está dormido." · b4 "Sigue dormido." · b5 "Sí. Dormido. Todavía." · b6 "Doctora. Vero quiere
// hablar con él." · i7 Inés "Está anestesiado." · b8 "Dice que no importa." · v9 "¡Ay, mi amor!" (P4 teléfono, Q3
// altavoz) · b10 "Ahora el de Coco." (P5 y Q4) · nar · v12 "¡Ay, mirá! ¡Ya entró!" · i13 "Bruno, ¿llamó alguien?" · b14
// "Nadie." · b15 "Preguntale a él." · i16 "Comentá AVISOS y te mando cómo funciona para tu veterinaria."
const VOCES = ["v1", "b2", "b3", "b4", "b5", "b6", "i7", "b8", "v9", "b10", "v12", "i13", "b14", "b15", "i16"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const RONQ = durWav("assets/sfx/ronquido.wav"), RONQ2 = r2(durWav("assets/sfx/ronquido2.wav") / 1.19);
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0, jueves 9:02: el teléfono del mostrador YA suena; Bruno atiende con la correa de Toto en la otra mano ·
// "¿Cómo está Toto?" (por teléfono) · Bruno se da vuelta: Vero está en la vereda, del otro lado de la vidriera · "Vero. Te
// estoy viendo." · P1b: Vero saluda con la mano libre, sin colgar
T.ring0 = 0.0; T.atiende = 0.3; T.v1 = 0.55;
T.gira = r2(T.v1 + LEN.v1 - 0.05); T.b2 = r2(T.v1 + LEN.v1 + 0.15);
T.p1b = r2(T.b2 + LEN.b2 - 0.2); T.saluda = r2(T.p1b + 0.05);
// P2 · el montaje en el mismo encuadre, un ring por chip: 10:30 · 12:00 · 14:00 (la señora de Luna se va)
const CHIP = (t0, len) => ({ ini: t0, ring: r2(t0 + 0.0), atiende: r2(t0 + 0.2), voz: r2(t0 + 0.3), fin: r2(t0 + 0.34 + len + 0.1) });
T.p2a = r2(T.p1b + 0.52); const A = CHIP(T.p2a, LEN.b3); T.p2b = A.fin; const B = CHIP(T.p2b, LEN.b4); T.p2c = B.fin; const Cc = CHIP(T.p2c, LEN.b5);
T.mont = [A, B, Cc]; T.b3 = A.voz; T.b4 = B.voz; T.b5 = Cc.voz;
T.seVa = r2(T.p2c + 0.25); T.campana = r2(T.p2c + 1.35);
// P3 · 15:30, la sala de recuperación: Toto dormido con el collar, Coco al lado, Inés de cirugía; Bruno se asoma ·
// "Doctora. Vero quiere hablar con él." · P3b contraplano de Inés: "Está anestesiado." · P3c Bruno: "Dice que no importa."
T.p3 = Cc.fin; T.b6 = r2(T.p3 + 0.25);
T.p3b = r2(T.b6 + LEN.b6 + 0.05); T.i7 = r2(T.p3b + 0.08);
T.p3c = r2(T.i7 + LEN.i7 + 0.08); T.b8 = r2(T.p3c + 0.06);
// P4 · la pausa (Inés mira a Bruno; los rótulos del costo) · toma el inalámbrico y se lo apoya en la oreja a Toto · P4b
// primer plano: Toto RONCA · del teléfono, finito: "¡Ay, mi amor!"
T.p4 = r2(T.b8 + LEN.b8 + 0.05); T.rot = [r2(T.p4 + 0.15), r2(T.p4 + 0.4)];
T.toma = r2(T.p4 + 0.86); T.oreja = r2(T.toma + 0.4);
T.p4b = r2(T.oreja - 0.15); T.ronca = r2(T.oreja + 0.25); T.v9 = r2(T.ronca + RONQ + 0.05);   // (r1) el ronquido entero y solo antes de "¡Ay, mi amor!"
// P5 · el remate del remate: el teléfono vuelve a sonar en la mano de Inés · inserto de la pantallita "PAPÁ DE COCO" · P5b
// Bruno: "Ahora el de Coco." · Inés mira a Coco, que ronca también · stinger
T.ring5 = r2(T.v9 + LEN.v9 + 0.15); T.p5 = r2(T.ring5 - 0.05); T.p5i = r2(T.ring5 + 0.25);
T.p5b = r2(T.p5i + 0.52); T.b10 = r2(T.p5b + 0.08); T.miraCoco = r2(T.b10 + LEN.b10 - 0.1); T.roncaCoco = r2(T.miraCoco + 0.05);
const P1 = r2(T.roncaCoco + RONQ2 + 0.05);   // (r1) el ronquido de Coco termina antes del stinger   // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.32, LEN.nar + 0.03));
// ---- parte 2 ----
// Q1 · el mismo jueves 9:02, el mismo encuadre: el teléfono quieto · Bruno le saca una foto a Toto con la tablet y la manda
// · en la vereda vibra el celular de Vero · Q1i el aviso "Toto ingresó ✓" · Q1b "¡Ay, mirá! ¡Ya entró!", le muestra el
// celular por el vidrio, Bruno levanta el pulgar
T.q1 = P2; T.foto = r2(P2 + 0.35); T.envia = r2(P2 + 0.68); T.vibra1 = r2(P2 + 0.85);
T.q1i = r2(P2 + 1.02); T.q1b = r2(T.q1i + 1.18); T.v12 = r2(T.q1b + 0.08); T.pulgar = r2(T.v12 + LEN.v12 - 0.4);
// Q2 · 11:00: Inés entra al quirófano con los guantes en alto · Q2i el panel "Pacientes de hoy": Bruno toca "En cirugía"
// en la fila de Toto → "Aviso enviado ✓"
T.q2 = r2(T.v12 + LEN.v12 + 0.15); T.q2i = T.q2; T.tocaCir = r2(T.q2i + 0.5); T.enviadoCir = r2(T.tocaCir + 0.2);
// Q3 · 15:30, la sala de recuperación (el encuadre de P3): Toto se despierta, Bruno lo filma con la tablet y toca
// "Despertando" · Q3k la cocina de Vero: vibra el celular · Q3i el aviso con el video (del celular sale el ronquido) · Q3v
// "¡Ay, mi amor!" (el mismo audio, en altavoz)
T.q3 = r2(T.enviadoCir + 0.8); T.despierta = r2(T.q3 + 0.15); T.tocaDesp = r2(T.q3 + 0.85);
T.q3k = r2(T.q3 + 1.0); T.vibra3 = r2(T.q3k + 0.05);
T.q3i = T.q3k; T.play = r2(T.q3i + 0.2); T.roncaCel = r2(T.q3i + 0.3);
T.q3v = r2(T.roncaCel + 0.9); T.v9b = r2(T.q3v + 0.06);
// Q4 · la recepción: Bruno toca "Despertando" en la fila de Coco: "Ahora el de Coco." (el mismo audio) · atiende a la
// señora de Luna · Q4b Inés sale del quirófano sacándose un guante: "Bruno, ¿llamó alguien?" · Q4c "Nadie." · Q4i el panel:
// "Llamadas hoy: 34 → 3", "Consultas atendidas ✓"
T.q4 = r2(T.v9b + LEN.v9 + 0.15); T.b10b = r2(T.q4 + 0.15); T.tocaCoco = r2(T.b10b + LEN.b10 + 0.02); T.enviadoCoco = r2(T.tocaCoco + 0.2);
T.q4b = r2(T.enviadoCoco + 0.35); T.abreQ = r2(T.q4b + 0.0); T.guante = r2(T.q4b + 0.45); T.i13 = r2(T.q4b + 0.3);
T.q4c = r2(T.i13 + LEN.i13 + 0.05); T.b14 = r2(T.i13 + LEN.i13 + 0.12);
T.giraN = r2(T.b14 + LEN.b14 + 0.12); T.atendidas = r2(T.giraN + 0.4);   // (r1) sin el inserto Q4i: el rótulo "Llamadas preguntando 34 → 0" va en el plano de "Nadie."
// Q5 · 17:00: el aviso "Listo para retirar ✓" (inserto) · campanita: entra Vero: "¿Cómo está Toto?" (el mismo audio, en
// persona) · Bruno señala la puerta del quirófano: "Preguntale a él." · Toto entra trotando con el collar y ladra contento
T.q5i = r2(T.atendidas + 0.5); T.listo = r2(T.q5i + 0.2);
T.q5 = r2(T.q5i + 0.98); T.campana2 = r2(T.q5 + 0.0); T.entraV = [T.q5, r2(T.q5 + 0.75)]; T.v1b = r2(T.q5 + 0.7);
T.b15 = r2(T.v1b + LEN.v1 + 0.1); T.trota = [r2(T.b15 + 0.3), r2(T.b15 + 1.25)]; T.ladra = r2(T.trota[1] + 0.12);
// C · Inés a cámara (sin gorro): "Comentá AVISOS…"
T.c = r2(T.ladra + 0.5); T.i16 = r2(T.c + 0.08); T.palabraR = r2(T.i16 + 0.6);
const DUR = Math.ceil((Math.ceil((T.i16 + LEN.i16 + 0.1) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(T.palabraR + 0.35);   // (r1) la línea chica entra con la tarjeta (~2,5 s)

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
ENV.ronq = envolvente("assets/sfx/ronquido.wav");
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

// P1 · el rubro: "VETERINARIAS" enorme arriba (navy sobre crema, en el recuadro verde), entero desde el cuadro 0; se va
// con el corte al contraplano de Vero (P1b)
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p1b - 0.02);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 150px; padding: 30px 6px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 120px/1.06 "Lexend", sans-serif; letter-spacing: -0.045em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>VETERINARIAS</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -420, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Unos avisos automáticos más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas.
// No dice "Scalerics". "más tarde…" entra cuando el narrador dice "más".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabra = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabra).join('<span class="esp"></span>')}</span>`;
  const MAS = Number(process.env.MAS ?? 1.38);   // "más" en la voz del narrador (desde P1 - 0,05)
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.b { font-size: 118px; margin-top: 12px; }
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
        ${lin("a", ["Unos", "avisos"])}
        ${lin("b", ["automáticos"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nA = qa(".linea.a .l").length, nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nA ? i * 0.03 : i < nAB ? 0.55 + (i - nA) * 0.025 : ${MAS} + (i - nAB) * 0.03;   // "automáticos" con la voz; "más tarde…" cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.4)});`,
  });
}

// C · "Comentá AVISOS" + "y te mando cómo funciona para tu veterinaria", debajo de la cara de Inés
{
  const id = "s05-palabra", ini = r2(T.palabraR - 0.04), dur = r2(DUR - ini + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1180px; padding: 14px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 86px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>AVISOS</em></span></div><div class="c">y te mando cómo funciona<br>para tu veterinaria</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(0.3)});`,
  });
}
// la línea chica final (abajo de la tarjeta): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 1640px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 42px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Avisos automáticos con foto</div><div class="a">en cada etapa</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico, libre (el techo es la meta medida) }]
// Techo por efecto: cada SFX (y la música) queda como mucho en TECHO LUFS (momentánea máxima del tramo que suena); las
// voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(Math.max(0, t)), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
// tel: por teléfono (banda 300-3400 Hz, más baja); alt: altavoz del celular (más suave)
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const TELF = { hp: 320, lp: 3300 }, ALT = { hp: 220, lp: 5200 };
const pasos = (a, b, n, techo = -41) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -35) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -33) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t - 0.06, 0, { techo });
const unas = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][i % 3], a + ((b - a) * i) / n, 0, { techo, hp: 2500, vel: 1.35 }); };
// el ring del teléfono de mostrador: dos tonos cortos (k-dos-tonos) dos veces; el bip de atender (k-tono, cortito)
const ring = (t, techo = -35, d = 0.6) => s("sfx/bsb-ring.wav", t, 0, { techo, dur: d, fin: 0.08 });   // (r1) un ring de teléfono de verdad ("Phone Ring #5", BigSoundBank CC0)
const atender = (t, techo = -42) => s("sfx/k-tono.wav", t, 0, { techo, dur: 0.12, fin: 0.04, vel: 1.3 });
const ronquido = (f, t, techo = -33, o = {}) => s(`sfx/${f}.wav`, t, 0, { libre: true, techo, pico: -8, ...o });
const chipS = (t) => { tic(t, -37, 0); whoosh(t, -44); };
// ---- parte 1 ----
s("sfx/zumbido.wav", 0, 0, { dur: r2(T.p3), fi: 0.05, fin: 0.2, techo: -52, lp: 900 });   // el tubo de la recepción, muy bajo
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p4 - 0.1, T.ring5, 0.5], [T.p2a, T.p3, 0.3]] });
s("sfx/zumbido.wav", T.p3, 0, { dur: r2(P1 - T.p3), fi: 0.1, fin: 0.2, techo: -47, lp: 700 });   // (r1) el piso de la sala: la pausa no queda en silencio digital   // la música baja en la pausa y vuelve con el ring
// P1 · el ring, atender, la voz por teléfono, "Vero. Te estoy viendo.", Toto mueve la cola, Vero saluda
ring(T.ring0, -33, 0.42); atender(T.atiende);
voz("v1", T.v1, -5, TELF);
voz("b2", T.b2, -1);
whoosh(T.p1b, -48);
s("sfx/calle.wav", T.p1b, 0, { dur: r2(T.p2a - T.p1b), fi: 0.05, fin: 0.1, techo: -44, lp: 1800 });
// P2 · el montaje: chip con tic y whoosh, ring, atender, la voz; la señora se va (pasos y campanita)
T.mont.forEach((m, i) => { chipS(m.ini); ring(m.ring, -34, r2(m.atiende - m.ring + 0.06)); atender(m.atiende); pop(m.ini + 0.12, -44); });
voz("b3", T.b3, -1); voz("b4", T.b4, -1); voz("b5", T.b5, -1);
pasos(T.seVa, T.campana - 0.1, 4, -46);
s("sfx/campanita.wav", T.campana, 0, { techo: -38 });
// P3 · la sala de recuperación: el chip, la puerta, "Doctora…", "Está anestesiado.", "Dice que no importa."
chipS(T.p3); s("sfx/k-creak.wav", T.p3 + 0.15, 0, { techo: -44 });
voz("b6", T.b6, -1);
voz("i7", T.i7, -1);
voz("b8", T.b8, -1);
// P4 · la pausa: pop por rótulo; el guante que toma el teléfono; el ronquido; "¡Ay, mi amor!" por teléfono
T.rot.forEach((t) => pop(t, -44));
s("sfx/k-cloth_1.wav", T.toma - 0.05, 0, { techo: -42, dur: 0.35, fin: 0.1 });
ronquido("ronquido", T.ronca, -30.5);
voz("v9", T.v9, -5, TELF);
// P5 · el ring en la mano de Inés, el inserto, "Ahora el de Coco.", Coco ronca (el mismo más agudo y más bajo), stinger
ring(T.ring5, -32, 1.0); whoosh(T.p5i, -46);
voz("b10", T.b10, -1);
ronquido("ronquido2", T.roncaCoco, -32, { vel: 1.19 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -46 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -42, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.05, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.05 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.3, fin: 0.3, techo: -46, sinDuck: true });
for (const d of [0.12, 0.4, 0.75, 1.0]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36, duck: [[T.q2i, T.q3, 0.35], [T.giraN, T.q5, 0.35]] });
s("sfx/zumbido.wav", P2, 0, { dur: r2(T.q3 - P2), fi: 0.1, fin: 0.2, techo: -52, lp: 900 });
// Q1 · la foto (obturador), el envío, el celular de Vero, el aviso, "¡Ay, mirá!…", el pulgar
s("sfx/k-switch-3.wav", T.foto, 0, { techo: -35 }); toque(T.envia, -36); s("sfx/whoosh-short.mp3", T.envia + 0.05, 0, { techo: -48, vel: 1.3 });
noti(T.vibra1 + 0.15, -36.5);
whoosh(T.q1i, -48); ding(T.q1i + 0.35, -40);
voz("v12", T.v12, -1);
s("sfx/calle.wav", T.q1b, 0, { dur: r2(T.q2 - T.q1b), fi: 0.05, fin: 0.1, techo: -46, lp: 1800 });
// Q2 · 11:00: el chip, la puerta de vaivén, el panel, el toque, el aviso enviado
chipS(T.q2);
whoosh(T.q2i, -46); toque(T.tocaCir, -36); ding(T.enviadoCir, -36);
// Q3 · 15:30: el chip, la tablet (toque), la cocina: vibra, el aviso, el video: el ronquido por el altavoz, "¡Ay, mi amor!"
chipS(T.q3); toque(T.tocaDesp, -40);
whoosh(T.q3k, -48); noti(T.vibra3 + 0.15, -34);
whoosh(T.q3i, -48); toque(T.play, -42);
ronquido("ronquido", T.roncaCel, -34, { hp: 300, lp: 4500 });
voz("v9", T.v9b, -1);   // (r1) en persona (la burbuja es normal)
// Q4 · "Ahora el de Coco." (el mismo audio), el toque, el aviso; la puerta del quirófano, el guante, "¿llamó alguien?",
// "Nadie.", el panel: 34 → 3
voz("b10", T.b10b, -1);
toque(T.tocaCoco, -38); ding(T.enviadoCoco, -38);
s("sfx/k-creak.wav", T.abreQ, 0, { techo: -44 }); s("sfx/k-cloth_2.wav", T.guante, 0, { techo: -40, dur: 0.4, fin: 0.1 });
voz("i13", T.i13, -1);
voz("b14", T.b14, -1);
s("sfx/whoosh-short.mp3", T.giraN - 0.05, 0, { techo: -44, vel: 1.4 }); ding(T.giraN + 0.25, -36); ding(T.atendidas, -38);
// Q5 · 17:00: el aviso Listo, la campanita, pasos, "¿Cómo está Toto?" en persona, "Preguntale a él.", Toto trota y ladra
whoosh(T.q5i, -46); noti(T.q5i + 0.1, -38); ding(T.listo + 0.3, -38);
s("sfx/campanita.wav", T.campana2, 0, { techo: -36 }); pasos(T.entraV[0] + 0.1, T.entraV[1], 3, -46);
voz("v1", T.v1b, -1, { hp: 150, lp: 7000 });   // (r1) pasabanda suave: se entiende "Toto"
voz("b15", T.b15, -1);
s("sfx/k-creak.wav", T.trota[0] - 0.1, 0, { techo: -46 }); unas(T.trota[0], T.trota[1], 9, -42);
s("sfx/ladrido-golden_fs146343_1.wav", T.ladra, 0, { techo: -34, pico: -10 });
// C · Inés a cámara: pop con la tarjeta y la línea chica
whoosh(T.c, -46);
voz("i16", T.i16, -1);
pop(T.palabraR - 0.02, -38);
pop(T.cierre + 0.05, -44);
// la cama +4 dB; en los tramos sin voz (el montaje, los insertos), los SFX +3 (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz || o.libre) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.q2i, T.q3) || en(t0, T.giraN, T.q5)) o.techo = Math.min(-35, (o.techo ?? TECHO) + 3); }
// la música: duck debajo de cada voz para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }
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
const IRIS_C = "540px 1150px";   // el iris se abre desde el mostrador (Q1)
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
      <div id="precarga">Inés</div><div id="precarga2">Cirugías</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el mostrador
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
