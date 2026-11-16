// Genera todo estetica-turnos desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, y las envolventes de
//     las voces (bocas)
//   - compositions/*.html: la capa plana de arriba (el rubro del cuadro 0, el cartel "Una agenda online más tarde…",
//     "Comentá TURNOS" y la línea chica final); las burbujas de diálogo y los audios son 3D pegados a la cámara
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
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): c1 Carolina (audio) "Ay, Lore, justo me surgió algo." ·
// l1 "Tranqui." · j1 Jimena (audio) "¿Era hoy? Lo tenía para el jueves que viene." · l2 "Lo único puntual hoy fueron las
// excusas." · c2 Carolina (audio) "Lore, ¿me guardás el jueves que viene? Esta vez voy." · l3 "Te lo guardo." · nar
// "Una agenda online más tarde." · l4 "Te mando el link." · g1 Graciela "¡Me lo quedo!" · c3 Carolina "¡Llegué! Pagué la
// seña, ¿cómo no voy a venir?" · l5 "Mirá vos. Hoy le surgió venir." · s1 Sofi "Comentá TURNOS y te mando cómo funciona
// para tu centro de estética."
const VOCES = ["c1", "l1", "j1", "l2", "c2", "l3", "l4", "g1", "c3", "l5", "s1"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el gabinete listo y vacío desde la puerta, Lorena con la agenda y el celular; el reloj 15:00. El audio
// de Carolina ya está en pantalla (15:00). "Tranqui." · tacha 15:00 · Vale enrolla la toalla
T.c1 = 0.2; T.l1 = r2(T.c1 + LEN.c1 + 0.08); T.tacha1 = r2(T.l1 + LEN.l1 + 0.04); T.rollo = [r2(T.tacha1 - 0.1), r2(T.tacha1 + 0.4)];
// P2 · el reloj corre a 16:00 · el mensaje a Mariana (✓✓ 16:05) · "escribiendo…" que se apaga · tacha 16:00 · cisne
T.p2 = r2(T.tacha1 + 0.18); T.reloj1 = [r2(T.p2 + 0.1), r2(T.p2 + 1.1)];
T.msj = r2(T.p2 + 0.3); T.escribe = [r2(T.msj + 0.45), r2(T.msj + 1.0)]; T.tacha2 = r2(T.escribe[1] + 0.15);
T.cisne1 = [r2(T.p2 + 0.75), r2(T.p2 + 1.45)];
// P3 · 17:00 en punto: el audio de Jimena · tacha 17:00 · el segundo cisne y el corazón
T.p3 = r2(T.tacha2 + 0.2); T.reloj2 = [r2(T.p3 - 0.05), r2(T.p3 + 0.15)]; T.jimena = r2(T.p3 + 0.05); T.j1 = r2(T.p3 + 0.2);
T.tacha3 = r2(T.j1 + LEN.j1 + 0.08); T.cisne2 = [r2(T.j1 + 0.6), r2(T.j1 + 1.4)]; T.corazon = [r2(T.tacha3 - 0.05), r2(T.tacha3 + 0.4)];
// P4 · la pausa: plano general quieto; los rótulos del costo
T.p4 = r2(T.tacha3 + 0.3); T.rot = [r2(T.p4 + 0.12), r2(T.p4 + 0.4), r2(T.p4 + 0.7)];
// P5 · primer plano de Lorena: "Lo único puntual hoy fueron las excusas."
T.p5 = r2(T.p4 + 1.8); T.l2 = r2(T.p5 + 0.15);
// P6 · remate del remate: Carolina otra vez (17:52) · Lorena da vuelta la hoja y anota · "Te lo guardo." · Vale deja los
// cisnes y agarra otra toalla
T.p6 = r2(T.l2 + LEN.l2 + 0.2); T.carolina2 = r2(T.p6 + 0.05); T.c2 = r2(T.p6 + 0.12);
T.hoja = [r2(T.c2 + LEN.c2 - 0.55), r2(T.c2 + LEN.c2 - 0.2)]; T.anota = [r2(T.hoja[1] + 0.05), r2(T.hoja[1] + 0.5)];
T.l3 = r2(T.c2 + LEN.c2 + 0.12); T.vale = [r2(T.l3 - 0.25), r2(T.l3 + 0.2), r2(T.l3 + 0.6)];   // deja los cisnes · agarra la toalla · empieza
const P1 = r2(T.l3 + LEN.l3 + 0.35);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.4, LEN.nar + 0.12));
// ---- parte 2 ----
// Q1 · la recepción otra semana: la burbuja de Carolina ("¿me guardás el jueves que viene?") · "Te mando el link." ·
// la tarjeta del link
T.q1 = P2; T.carolina3 = r2(P2 + 0.05); T.l4 = r2(P2 + 0.35); T.link = r2(T.l4 + LEN.l4 + 0.05);
// Q1b · inserto del celular de Carolina: la página de reserva · Jue · 15:00 · Pagar seña · Turno reservado ✓
T.q1b = r2(T.link + 0.35); T.jue = r2(T.q1b + 0.35); T.hora = r2(T.q1b + 0.7); T.paga = r2(T.q1b + 1.25); T.reservado = r2(T.q1b + 1.45);
// Q2 · el miércoles a las 15:00: el recordatorio a los tres celulares · Confirmar · Confirmar · Reprogramar → Martes 10:00
T.q2 = r2(T.reservado + 0.75); T.llega = r2(T.q2 + 0.05); T.conf = [r2(T.q2 + 0.6), r2(T.q2 + 0.95), r2(T.q2 + 1.3)]; T.martes = r2(T.q2 + 1.6);
// Q3 · la tablet: 16:00 libre, avisando a la lista de espera · Graciela en su living toca "Lo quiero" · "¡Me lo quedo!"
// · la tablet: 16:00 Graciela ✓ · hueco cubierto en 2 minutos
T.q3 = r2(T.martes + 0.45); T.libre = r2(T.q3 + 0.1); T.avisa = r2(T.q3 + 0.45);
T.q3b = r2(T.q3 + 0.85); T.aviso = r2(T.q3b + 0.1); T.quiero = r2(T.q3b + 0.45); T.g1 = r2(T.q3b + 0.55);
T.q3c = r2(T.g1 + LEN.g1 + 0.1); T.cubierto = r2(T.q3c + 0.05); T.chip = r2(T.q3c + 0.2);
// Q4 · jueves 15:00, el encuadre del cuadro 0: la campanita, entra Carolina · "¡Llegué! …" · "Mirá vos. Hoy le surgió venir."
T.q4 = r2(T.chip + 0.5); T.campanita = r2(T.q4 + 0.02); T.entra = [r2(T.q4 + 0.0), r2(T.q4 + 0.9)];
T.c3 = r2(T.q4 + 0.47); T.pasa = [r2(T.c3 + LEN.c3 - 0.3), r2(T.c3 + LEN.c3 + 0.7)];
T.q4b = r2(T.c3 + LEN.c3 + 0.1); T.l5 = r2(T.q4b + 0.25);
// Q5 · la recepción: la tablet con el jueves lleno, Sofi en videollamada al lado · "Comentá TURNOS…" · la línea chica
T.q5 = r2(T.l5 + LEN.l5 + 0.15); T.filas = [0, 0.12, 0.24].map((d) => r2(T.q5 + 0.1 + d)); T.cero = r2(T.q5 + 0.45);
T.s1 = r2(T.q5 + 0.2); T.turnos = r2(T.s1 + 0.45);
T.cierre = r2(T.s1 + LEN.s1 - 1.6);
const DUR = r2(T.s1 + LEN.s1 + 0.4);
// el reloj de pared [t, hora decimal]: 15:00 · corre a 16:00 · 17:00 en punto · (parte 2) 15:00 en punto
T.relojK = [[0, 15.0], [T.reloj1[0], 15.0], [T.reloj1[1], 16.0], [T.reloj2[0], 16.97], [T.reloj2[1], 17.0], [T.p5, 17.0], [T.p6, 17.86]];

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

// P1 · el rubro: "CENTROS DE ESTÉTICA" enorme arriba (navy sobre la pared crema, ESTÉTICA en el recuadro verde), entero
// desde el cuadro 0; se va cuando termina el audio de Carolina
{
  const id = "s00-rubro", ini = 0, dur = r2(T.l1 + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 96px; padding: 22px 10px 30px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 118px/1.06 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="tx">CENTROS DE</div><div class="tx"><span class="sel"><b></b><em>ESTÉTICA</em></span></div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -420, duration: 0.22, ease: "power2.in" }, ${r2(dur - 0.24)});`,
  });
}

// el cartel "Una agenda online más tarde…" (time card de dibujito, de marca, hecho de cero; tres renglones como el de
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
          <circle class="bu" cx="240" cy="1500" r="34" fill="none" stroke="${CR}" stroke-width="10"/>
          <circle class="bu" cx="1270" cy="1560" r="26" fill="none" stroke="${CR}" stroke-width="9"/>
          <circle class="bu" cx="330" cy="1620" r="18" fill="none" stroke="${NAVY}" stroke-width="8"/>
          <circle class="bu" cx="1290" cy="1400" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
          <circle class="bu" cx="500" cy="1960" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
          <circle class="bu" cx="560" cy="560" r="30" fill="none" stroke="${CR}" stroke-width="9"/>
        </g>
      </svg>
      <div class="texto" data-layout-allow-overlap data-layout-allow-overflow>
        ${lin("a", ["Una", "agenda"])}
        ${lin("b", ["online"])}
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
      tl.to(q(".texto"), { scale: 1.15, opacity: 0, duration: 0.2, ease: "power2.in" }, ${r2(dur - 0.42)});   // se va antes de que abra el iris`,
  });
}

// Q5 · "Comentá TURNOS" grande arriba (TURNOS en el recuadro verde), entra en "TURNOS" y queda hasta el final
{
  const id = "s05-turnos", ini = T.turnos, dur = r2(DUR - T.turnos);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 120px; padding: 26px 10px 36px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 92px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 150px/1.05 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 26px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>TURNOS</em></span></div></div>`,
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
    P .a { font: 700 54px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 12px; font: 800 74px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Agenda online con seña</div><div class="a">y recordatorios</div><div class="b">scalerics.com</div></div>`,
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
// ---- parte 1 ----
// ambiente: el zumbido de la lámpara lupa (pasabajos, bajito) y el tic del reloj; la música baja en la pausa (NO se corta)
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(P1 + 0.1), fi: 0.05, fin: 0.3, techo: -47, lp: 700 });
for (let t = 0.5; t < P1 - 0.2; t += 1.0) if (!(t > T.reloj1[0] - 0.1 && t < T.reloj1[1] + 0.1)) tic(t, en(t, T.p4, T.p6) ? -40 : -46, Math.round(t));
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p4 - 0.1, T.p5 + 0.2, 0.78]] });
// P1 · el audio de Carolina, "Tranqui.", la tachadura, la toalla que se enrolla
pop(0.0, -42); s("sfx/click-soft.mp3", T.c1 - 0.06, 0, { techo: -42 });
voz("c1", T.c1, -1);
voz("l1", T.l1, -1);
tacha(T.tacha1); tela(T.rollo[0], -40, 1);
// P2 · el reloj corre (tics rápidos), el mensaje (teclas + enviado), "escribiendo…", la tachadura, el cisne
for (let i = 0; i < 12; i++) tic(T.reloj1[0] + i * ((T.reloj1[1] - T.reloj1[0]) / 12), -40, i);
s("sfx/key-press.mp3", T.msj - 0.2, 0, { techo: -42 }); s("sfx/key-press.mp3", T.msj - 0.08, 0, { techo: -43 });
s("sfx/whoosh-short.mp3", T.msj, 0, { techo: -42, vel: 1.2 }); pop(T.msj + 0.02, -42);
pop(T.escribe[0], -44);
tacha(T.tacha2); tela(T.cisne1[0], -39, 2); tela(T.cisne1[1] - 0.3, -40, 1); pop(T.cisne1[1] - 0.05, -42);
// P3 · 17:00 en punto: el tic del minutero, el audio de Jimena, la tachadura, el segundo cisne y el corazón
tic(T.reloj2[1], -36, 1);
noti(T.jimena, -38); s("sfx/click-soft.mp3", T.j1 - 0.06, 0, { techo: -42 });
voz("j1", T.j1, -1);
tela(T.cisne2[0], -40, 2); tacha(T.tacha3); tela(T.corazon[0], -38, 1); pop(T.corazon[1] - 0.05, -40);
// P4 · la pausa: zumbido de la lámpara y el reloj; pop chico por rótulo
s("sfx/zumbido.wav", T.p4, 0, { dur: r2(T.p5 - T.p4 + 0.2), fi: 0.15, fin: 0.2, techo: -40, lp: 900 });
T.rot.forEach((t) => pop(t, -40));
// P5 · el remate: solo la voz y el zumbido
voz("l2", T.l2, -1);
// P6 · Carolina otra vez, la hoja, la lapicera, "Te lo guardo.", la toalla nueva
noti(T.carolina2, -38); s("sfx/click-soft.mp3", T.c2 - 0.06, 0, { techo: -42 });
voz("c2", T.c2, -1);
s("sfx/k-page-turn.wav", T.hoja[0], 0, { techo: -36 });
tacha(T.anota[0] + 0.05, -40);
voz("l3", T.l3, -1);
tela(T.vale[0], -40, 2); tela(T.vale[1], -39, 1); tela(T.vale[2], -40, 2);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -41, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.12, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.12 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36 });
s("sfx/zumbido-largo.wav", P2, 0, { loop: true, desde: 30, dur: r2(DUR - P2), fi: 0.1, fin: 0.5, techo: -48, lp: 700 });
// Q1 · la burbuja de Carolina, "Te mando el link.", la tarjeta del link
noti(T.carolina3, -40); pop(T.carolina3 + 0.02, -42);
voz("l4", T.l4, -1);
s("sfx/whoosh-short.mp3", T.link, 0, { techo: -42, vel: 1.2 }); pop(T.link + 0.02, -42);
// Q1b · la página de reserva: Jue, 15:00, Pagar seña, Turno reservado ✓
s("sfx/whoosh-short.mp3", T.q1b - 0.04, 0, { techo: -42 });
toque(T.jue, -38); toque(T.hora, -38); toque(T.paga, -36); ding(T.reservado, -36);
// Q2 · el recordatorio a los tres celulares (escalonado), tres toques, dos dings, el reprogramado
s("sfx/whoosh-short.mp3", T.q2 - 0.04, 0, { techo: -42 });
[0, 0.08, 0.16].forEach((d, i) => noti(T.llega + d, -40 - i));
T.conf.forEach((t, i) => { toque(t, -37); if (i < 2) ding(t + 0.1, -38); });
ding(T.martes, -38);
// Q3 · la tablet: libre (whoosh), avisando; el aviso a Graciela, "Lo quiero", "¡Me lo quedo!", Graciela ✓, el chip
s("sfx/whoosh-short.mp3", T.q3 - 0.04, 0, { techo: -42 });
s("sfx/k-page-turn.wav", T.libre, 0, { techo: -40, vel: 1.3, dur: 0.25, fin: 0.08 });
s("sfx/whoosh.mp3", T.avisa + 0.1, 0, { techo: -40, vel: 1.1 });
noti(T.aviso, -38); toque(T.quiero, -36);
voz("g1", T.g1, -1);
s("sfx/whoosh-short.mp3", T.q3c - 0.04, 0, { techo: -42 });
ding(T.cubierto, -36); pop(T.chip, -40);
// Q4 · la campanita de la puerta, los pasos de Carolina, "¡Llegué!…", Vale la hace pasar (tela), "Mirá vos."
s("sfx/campanita.wav", T.campanita, 0, { techo: -35, dur: 0.9, fin: 0.3 });
s("sfx/puerta-abre.wav", T.campanita - 0.05, 0, { techo: -42, dur: 0.6, fin: 0.2 });
pasos(T.entra[0] + 0.1, T.entra[1], 4, -38);
voz("c3", T.c3, -1);
tela(T.pasa[0] + 0.2, -40, 2);
voz("l5", T.l5, -2);
// Q5 · la agenda llena (ding por fila), "Camilla vacía: 0 h", Sofi, el pop de TURNOS, la línea chica
s("sfx/whoosh.mp3", T.q5 - 0.1, 0, { techo: -42 });
T.filas.forEach((t, i) => ding(t, -38 + i));
pop(T.cero, -38);
voz("s1", T.s1, -1);
pop(T.turnos + 0.02, -38);
pop(T.cierre + 0.05, -44);
// (ronda 1) la cama +4 dB y, en los tramos sin voz (el reloj que corre, la demo de la interfaz, la entrada de Carolina), los
// SFX +6 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.p2, T.p3) || en(t0, T.link, T.g1 - 0.2) || en(t0, T.q3c - 0.2, T.q4 - 0.05)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 6); }
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
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
const IRIS_C = "540px 1500px";   // el iris se abre desde el mostrador de la recepción (Q1)
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
      <div id="precarga">Lorena</div><div id="precarga2">Carolina</div>
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
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.3, ease: "power2.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 + 0.01)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.cierre}`);
console.log(JSON.stringify(LEN));
