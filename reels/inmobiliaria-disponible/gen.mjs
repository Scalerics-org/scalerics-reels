// Genera todo inmobiliaria-disponible desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las
//     voces (bocas) y los tiempos de palabra que usa la escena
//   - compositions/*.html: la capa plana de arriba (INMOBILIARIAS + "Martes, 15:00." del cuadro 0, los chips de día y
//     hora, el cartel "Un agente de IA más tarde…", "Comentá DISPONIBLE" y la línea chica final); las burbujas de
//     diálogo, las consultas, el contador y los rótulos son 3D pegados a la cámara (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Base: reels/inmobiliaria-visitas (gen.mjs) y reels/gym-cupo. Línea "ANTES QUE TODO": parte 1 (0 a P1), el cartel
// (P1 a P2, HTML debajo del canvas) y la parte 2 (P2 a DUR, la solución funcionando, con el cierre adentro).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace la
// mezcla. VER=portada: el plano de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh): d1 Diego "Silvana. El de Punta Carretas explota. Van doce." (se reusa
// igual en Q1) · s1 Silvana "Contestales vos." · d2 Diego "Estoy mostrando." · s2 Silvana "Yo también." · s3 Silvana "¡Hola,
// Agustina! Perdón la demora. Sí, sigue disponible." · a1 Agustina (nota de voz) "¡Qué bueno! Yo ya no." · al don Alberto
// (altavoz) "Silvana, ¿cómo va? ¿Nadie preguntó por el apartamento?" (se reusa igual en Q4) · s4 "Preguntar,
// preguntaron." · nar "Un agente de IA más tarde." · s5 "¿Y quién contesta?" · d3 "Ya contestó. Le pidió la garantía y
// agendó." · (sin s6: "Esos dos, para mí." se sacó en r1) · a2 "¿Sigue disponible?" · s7 "Sí." · a3 "¡Qué bueno! Yo también." · s8 "Treinta y
// ocho. Y el viernes firman." (r1: sin "Seis visitas.") · s9 "Comentá DISPONIBLE y te mando cómo funciona para tu inmobiliaria."
const VOCES = ["d1", "s1", "d2", "s2", "s3", "a1", "al", "s4", "s5", "d3", "a2", "s7", "a3", "s8", "s9"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = {};
for (const k of ["s3", "a1", "a3", "s8", "s9", "d1", "al"]) PAL[k] = JSON.parse(fs.readFileSync(`assets/voice/palabras-${k}.json`, "utf8")).map((p) => ({ w: p.text ?? p.word, a: r2(p.start ?? p.a), b: r2(p.end ?? p.b) }));
const palabra = (k, i) => PAL[k][i].a;
const finPal = (k, i) => PAL[k][i].b;
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0: el living vacío de Parque Batlle; la visita; del celular de Silvana brotan las consultas; Diego, bajito
T.d1 = 0.15;
T.cons = [0, 0, 0, r2(T.d1 + 0.55), r2(T.d1 + 1.3), r2(T.d1 + 2.1)];   // las 3 primeras ya están en el cuadro 0
T.s1 = r2(T.d1 + LEN.d1 + 0.06);
T.d2 = r2(T.s1 + LEN.s1 + 0.06);
// la pausita antes de "Yo también." (0,5 s): corte a Silvana con la sonrisa fija
T.p1b = r2(T.d2 + LEN.d2 + 0.12); T.s2 = r2(T.d2 + LEN.d2 + 0.5);
// P2 · la escalada muda: el celular sobre el escritorio de la oficina, de noche; 12 → 38; la de Agustina
T.p2 = r2(T.s2 + LEN.s2 + 0.12);
T.h1830 = T.p2; T.h2310 = r2(T.p2 + 0.7);
T.cuenta = [r2(T.p2 + 0.08), r2(T.p2 + 0.9)];             // el contador corre 12 → 38
T.agus = r2(T.p2 + 0.95);                                    // se ilumina la de Agustina (15:02)
T.ideal = r2(T.agus + 0.25);
// P3 · miércoles 9:10: Silvana con el café; inserto del chat: tipea mientras lo dice, enviado, escribiendo…, nota de voz
T.p3 = r2(T.ideal + 0.45);
T.p3i = r2(T.p3 + 0.45); T.s3 = r2(T.p3i + 0.05);
T.envia = r2(T.s3 + LEN.s3 + 0.03);
T.escribe = r2(T.envia + 0.15); T.nota = r2(T.escribe + 0.3); T.a1 = r2(T.nota + 0.08);
T.yaNo = r2(T.a1 + palabra("a1", 2) - 0.05);                // la burbuja suma "Yo ya no." cuando lo dice
// P3b · la pausa: Silvana quieta, el café a medio camino; rótulos; la música se corta seca
T.p3b = r2(T.a1 + LEN.a1 + 0.08);
T.rot = [r2(T.p3b + 0.12), r2(T.p3b + 0.45)];
// P4 · remate del remate: vibra, "Don Alberto · propietario", altavoz; Silvana mira la pantalla (38); "Preguntar, preguntaron."
T.p4 = r2(T.p3b + 1.05); T.vibra = r2(T.p4 + 0.05); T.atiende = r2(T.p4 + 0.3); T.al = r2(T.p4 + 0.36);
T.p4i = r2(T.al + LEN.al + 0.03);                           // inserto: "Sin contestar: 38"
T.p4b = r2(T.p4i + 0.6); T.s4 = r2(T.p4b + 0.12);           // pausa de ~0,75 s antes del remate
const P1 = r2(T.s4 + LEN.s4 + 0.35);
const P2 = r2(P1 + Math.max(2.25, LEN.nar + 0.06));   // (r1) el narrador con atempo 1,1
// ---- parte 2 ----
// Q1 · martes 15:00 otra vez, el encuadre del cuadro 0; el mismo audio de Diego (desde "El de Punta Carretas"); "¿Y
// quién contesta?"; Diego le muestra el celular: el chat del agente (inserto)
T.q1 = P2; T.vib2 = r2(P2 + 0.05);
T.d1bDesde = r2(palabra("d1", 1) - 0.06); T.d1b = r2(P2 + 0.06); T.d1b0 = r2(T.d1b - T.d1bDesde);   // d1b0: donde "empezaría" la toma entera (boca)
T.s5 = r2(T.d1b0 + LEN.d1 + 0.06); T.q1b = r2(T.s5 - 0.08);   // Q1b: corte a los dos más cerca (Q1 no pasa de 3 s)
T.muestra = r2(T.s5 + LEN.s5 - 0.2);
T.q1i = r2(T.s5 + LEN.s5 + 0.08); T.d3 = r2(T.q1i + 0.05);
T.chat = [0, 0, r2(T.q1i + 0.3), r2(T.q1i + 0.75), r2(T.q1i + 1.2), r2(T.q1i + 1.6), r2(T.q1i + 2.05)];   // 0-1 ya están
T.rotQ1 = r2(T.q1i + 0.4);
// Q2 · el panel en el monitor, solo visual (r1 del coordinador: sin "Esos dos, para mí."): la lista → la agenda de Diego →
// "Listos para visitar y firmar: 2" resaltado; ~2,3 s
T.q2 = r2(Math.max(T.d3 + LEN.d3, T.chat[6] + 0.45) + 0.06);
T.filas = [0, 1, 2, 3, 4].map((i) => r2(T.q2 + 0.1 + i * 0.14));
T.agenda = r2(T.q2 + 0.75); T.turnos = [0, 1, 2, 3, 4, 5].map((i) => r2(T.agenda + 0.12 + i * 0.08));
T.listos = r2(T.agenda + 0.68);
// Q3 · miércoles 10:30, el palier 3B: Agustina llega; "¿Sigue disponible?" / "Sí." (abre) / "¡Qué bueno! Yo también."
T.q3 = r2(T.listos + 0.75); T.a2 = r2(T.q3 + 0.38);
T.s7 = r2(T.a2 + LEN.a2 + 0.08); T.abre = r2(T.s7 + 0.05);
T.q3b = r2(T.s7 + LEN.s7 + 0.35); T.a3 = r2(T.q3b + 0.05);
T.tambien = r2(T.a3 + palabra("a3", 2) - 0.05);
T.rotQ3 = r2(T.a3 + LEN.a3 + 0.02);
// Q4 · miércoles 12:00, la oficina: vibra, el mismo audio de don Alberto (desde "¿Nadie preguntó…?"); "Treinta y ocho.
// Seis visitas. Y el viernes firman."; la ficha ALQUILA: RESERVADO ✓
T.q4 = r2(T.rotQ3 + 0.55); T.vib3 = r2(T.q4 + 0.04);
T.al2Desde = r2(palabra("al", 3) - 0.06); T.al2 = r2(T.q4 + 0.22); T.al2Fin = r2(T.al2 + LEN.al - T.al2Desde);
T.s8 = r2(T.al2Fin + 0.06); T.visitas = r2(T.s8 + 0.1);   // "Treinta y ocho." · el rótulo "Visitas agendadas: 6 ✓"
T.q4f = r2(T.s8 + palabra("s8", 3) - 0.1);                // en "Y el viernes firman." la cámara va a la ficha
T.reserva = r2(T.s8 + LEN.s8 - 0.1); T.rotQ4 = [r2(T.reserva + 0.2), r2(T.reserva + 0.38)];
// F · el cierre: Silvana a cámara; "Comentá DISPONIBLE…"
// (r1 del coordinador) el cierre entero ≤ 3 s: el plano y la tarjeta arrancan sobre "Comentá"; la línea chica, el último ~1 s
T.q5 = r2(T.reserva + 0.95); T.s9 = T.q5;
T.palabra = r2(T.s9);
const DUR = Math.ceil((Math.ceil((T.s9 + LEN.s9) * 30) / 30) * 1e4) / 1e4;
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
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const P1 = ${P1};\nexport const P2 = ${P2};\nexport const T = ${JSON.stringify(T)};\nexport const LEN = ${JSON.stringify(LEN)};\nexport const PAL = ${JSON.stringify(PAL)};\nexport const ENV = ${JSON.stringify(ENV)};\nexport const LIMPIO = ${!!process.env.LIMPIO}; // sin burbujas ni rótulos (fondo de la portada)\nexport const VER = ${JSON.stringify(process.env.VER || "")};\n`);

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

// P1 · el rubro: "INMOBILIARIAS" enorme arriba, entero desde el cuadro 0, y el chip "Martes, 15:00." debajo; se van antes
// del corte a Silvana ("Yo también.")
{
  const id = "s00-rubro", ini = 0, dur = r2(T.s1 + 0.2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 30px; right: 30px; top: 96px; padding: 26px 6px 28px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; }
    P .tx { font: 900 108px/1.06 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 8px; }
    P .sel b { position: absolute; inset: -14px 0 -6px; background: ${G}; border: 7px solid ${NAVY}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 324px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>INMOBILIARIAS</em></span></div></div>
      <div class="chip">Martes, 15:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);
      tl.to(q(".caja"), { y: -460, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});
      tl.to(q(".chip"), { x: -560, duration: 0.24, ease: "power2.in" }, ${r2(dur - 0.3)});`,
  });
}
// los chips de día y hora (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.h1830, T.h2310, "Martes, 18:30."],
  ["s02-chip", T.h2310, T.p3, "Martes, 23:10."],
  ["s03-chip", T.p3, r2(T.p3i + 1.2), "Miércoles, 9:10."],
  ["s04-chip", P2, r2(T.s5 + 0.2), "Martes, 15:00."],
  ["s06-chip", T.q3, r2(T.q3b - 0.02), "Miércoles, 10:30."],
  ["s07-chip", T.q4, r2(T.s8 + 0.3), "Miércoles, 12:00."],
];
for (const [id, a, b, txt] of CHIPS) {
  const ini = r2(a), dur = r2(b - a);
  ESC.push([id, ini, dur, "arriba"]);
  const entra = id === "s02-chip" ? `tl.fromTo(q(".chip"), { rotationX: 90, transformOrigin: "50% 50%" }, { rotationX: 0, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`
    : `tl.fromTo(q(".chip"), { scale: 0.6, opacity: 0, transformOrigin: "0% 50%" }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);`;
  const sale = id === "s01-chip" ? "" : `tl.to(q(".chip"), { scale: 0.6, opacity: 0, duration: 0.14, ease: "power2.in" }, ${r2(dur - 0.16)});`;
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip">${txt}</div>`,
    js: `      ${entra}
      ${sale}`,
  });
}

// el cartel "Un agente de IA más tarde…" (time card de dibujito, de marca, hecho de cero; el de resto-reservas). Va
// DEBAJO del canvas. No dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraC = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraC).join('<span class="esp"></span>')}</span>`;
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 640px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 146px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.c { font-size: 150px; margin-top: 26px; }
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
        ${lin("a", ["Un", "agente"])}
        ${lin("b", ["de", "IA"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nAB = qa(".linea.a .l, .linea.b .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nAB ? i * 0.03 : 1.05 + (i - nAB) * 0.03;   // "más tarde…" entra cuando el narrador dice "más"
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.36)});   // se va antes del iris`,
  });
}

// F · "Comentá DISPONIBLE" + "y te mando cómo funciona para tu inmobiliaria", debajo de la cara de Silvana
{
  const id = "s05-palabra", ini = T.palabra, dur = r2(DUR - T.palabra + 0.1);   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 1020px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 84px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 116px/1.1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 8px 0 -6px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 14px; font: 700 46px/1.2 "Lexend", sans-serif; color: ${NAVY}; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>DISPONIBLE</em></span></div><div class="c">y te mando cómo funciona<br>para tu inmobiliaria</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, ${r2(palabra("s9", 1) + 0.02)});`,
  });
}
// la línea chica final (abajo): qué es y la web
{
  const id = "s09-cierre", ini = T.cierre, dur = r2(DUR - T.cierre + 0.1);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1500px; padding: 12px 22px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.22 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; }
    P .b { margin-top: 8px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Un agente de IA que contesta</div><div class="a">y agenda las visitas</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { y: 420 }, { y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, 0.0);
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
const voz = (f, t, db = -1, pan = 0) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, pan }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const vibra = (t, techo = -38, dur = 0.5) => s("sfx/vibra.wav", t, 0, { techo, dur, fin: 0.1 });
const noti = (t, techo = -38) => s("sfx/notification.mp3", t, 0, { techo, dur: 0.35, fin: 0.12 });
const tic = (t, techo = -42) => s("sfx/tic-real.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 });
const ding = (t, techo = -38) => s("sfx/ding.mp3", t, 0, { techo, hp: 500 });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const tecla = (t, techo = -42) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.12, fin: 0.04 });
// ---- parte 1 ----
// P1 · el living vacío: aire de apartamento vacío (eco bajo), pájaros del parque por la ventana, la música; una consulta
// con vibración y notificación cada una
const amb = (a, b, desde = 0) => {
  s("sfx/zumbido-largo.wav", a, 0, { loop: true, desde, dur: r2(b - a), fi: 0.05, fin: 0.2, techo: -54, lp: 600 });
  s("sfx/pajaro.wav", a + 0.3, 0, { techo: -50, hp: 1500 });
};
amb(0, T.p2);
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(T.p3b + 0.05), fin: 0.05, techo: -37 });
T.cons.slice(3).forEach((t, i) => { vibra(t - 0.12, -44, 0.3); noti(t, -40 + (i % 2)); });
voz("d1", T.d1, -1, 0.25);
voz("s1", T.s1, -1, -0.25);
voz("d2", T.d2, -1, 0.25);
s("sfx/whoosh-short.mp3", T.p1b - 0.04, 0, { techo: -48 });
voz("s2", T.s2, -1);
// P2 · la escalada: el celular vibrando sobre el escritorio, un tic por número, el aire de la oficina de noche
s("sfx/whoosh.mp3", T.p2 - 0.12, 0, { techo: -38 });
s("sfx/zumbido-largo.wav", T.p2, 0, { loop: true, dur: r2(T.p3 - T.p2), fi: 0.05, fin: 0.1, techo: -46, lp: 900 });
for (let k = 0; k < 6; k++) vibra(T.p2 + 0.05 + k * 0.26, -40, 0.24);
for (let k = 0; k < 13; k++) tic(T.cuenta[0] + (k * (T.cuenta[1] - T.cuenta[0])) / 12, -42);
s("sfx/whoosh-short.mp3", T.h2310 - 0.05, 0, { techo: -44 });
ding(T.agus, -36); pop(T.ideal, -38);
// P3 · la mañana: un sorbo de café, el tipeo, enviado (whoosh), la nota de voz que llega
s("sfx/whoosh-short.mp3", T.p3 - 0.06, 0, { techo: -44 });
s("sfx/zumbido-largo.wav", T.p3, 0, { loop: true, desde: 3, dur: r2(P1 - T.p3), fi: 0.1, fin: 0.3, techo: -52, lp: 700 });
s("sfx/sorbo.wav", T.p3 + 0.2, 0, { techo: -40 });
for (let k = 0; k < Math.floor((LEN.s3 - 0.2) / 0.16); k++) tecla(T.s3 + 0.1 + k * 0.16, -45 + (k % 3));
s("sfx/whoosh-short.mp3", T.envia, 0, { techo: -38 });
noti(T.nota, -36);
voz("s3", T.s3, -1);
voz("a1", T.a1, -1);
pop(T.yaNo - 0.02, -40);
// P3b · la pausa: la música se corta seca; dos pops por rótulo; el reloj de la oficina
T.rot.forEach((t, i) => pop(t, -40 + i));
for (let k = 0; k < 3; k++) tic(T.p3b + 0.3 + k * 0.5, -46);
// P4 · vibra, atiende (toque), el altavoz; la pausa; "Preguntar, preguntaron."; el stinger lo da el cartel
vibra(T.vibra, -36, 0.45); toque(T.atiende, -40);
voz("al", T.al, -1);
s("sfx/whoosh-short.mp3", T.p4i - 0.05, 0, { techo: -46 });
voz("s4", T.s4, -1);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.04 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.6, fin: 0.8, techo: -39 });
// Q1 · el living otra vez: el celular de Silvana vibra una vez, corto; el mismo audio de Diego; el chat del agente
amb(P2, T.q2, 2);
vibra(T.vib2, -44, 0.22);
s("voice/d1.wav", T.d1b, -1, { voz: true, desde: T.d1bDesde, fin: 0.04, pan: 0.25 }); VOZ.push([r2(T.d1b - 0.75), r2(T.d1b0 + LEN.d1 + 0.95)]);
voz("s5", T.s5, -1, -0.25);
s("sfx/whoosh-short.mp3", T.q1i - 0.06, 0, { techo: -44 });
T.chat.slice(2).forEach((t, i) => (i === 4 ? ding(t + 0.02, -36) : noti(t, -42 + (i % 2))));
voz("d3", T.d3, -1);
pop(T.rotQ1, -42);
// Q2 · el panel: tics por fila, pops por turno, ding en "Listos para firmar: 2"
s("sfx/whoosh.mp3", T.q2 - 0.1, 0, { techo: -42 });
s("sfx/zumbido-largo.wav", T.q2, 0, { loop: true, dur: r2(T.q3 - T.q2), fi: 0.1, fin: 0.1, techo: -52, lp: 700 });
T.filas.forEach((t, i) => tic(t, -42 + (i % 2)));
s("sfx/whoosh-short.mp3", T.agenda - 0.08, 0, { techo: -42 });
T.turnos.forEach((t, i) => pop(t, -44 + (i % 2)));
ding(T.listos, -38);
// Q3 · el palier: los pasos de Agustina, las llaves, la puerta; ding con el rótulo
s("sfx/zumbido-largo.wav", T.q3, 0, { loop: true, desde: 1, dur: r2(T.q4 - T.q3), fi: 0.1, fin: 0.1, techo: -54, lp: 500 });
pasos(T.q3, T.a2 - 0.05, 4, -42);
s("sfx/llaves.wav", T.q3 + 0.1, 0, { techo: -40, dur: 0.6, fin: 0.2 });
voz("a2", T.a2, -1);
voz("s7", T.s7, -1);
s("sfx/puerta-abre.wav", T.abre + 0.05, 0, { techo: -40 });
s("sfx/whoosh-short.mp3", T.q3b - 0.04, 0, { techo: -48 });
voz("a3", T.a3, -1);
ding(T.rotQ3, -36);
// Q4 · la oficina: vibra, atiende, el mismo audio de don Alberto; RESERVADO (whoosh + pop + ding); los rótulos
s("sfx/whoosh-short.mp3", T.q4 - 0.06, 0, { techo: -44 });
s("sfx/zumbido-largo.wav", T.q4, 0, { loop: true, desde: 2, dur: r2(DUR - T.q4), fi: 0.1, fin: 0.4, techo: -54, lp: 700 });
vibra(T.vib3, -38, 0.22); toque(T.al2 - 0.08, -42);
s("voice/al.wav", T.al2, -1, { voz: true, desde: T.al2Desde, fin: 0.04 }); VOZ.push([r2(T.al2 - 0.75), r2(T.al2Fin + 0.95)]);
voz("s8", T.s8, -1); pop(T.visitas, -42);
s("sfx/whoosh-short.mp3", T.q4f - 0.05, 0, { techo: -46 });
s("sfx/whoosh-short.mp3", T.reserva - 0.08, 0, { techo: -40 }); pop(T.reserva + 0.08, -37); ding(T.reserva + 0.12, -38);
T.rotQ4.forEach((t, i) => pop(t, -40 + i));
// F · el cierre: Silvana a cámara; pop en la tarjeta y en DISPONIBLE; la línea chica
s("sfx/whoosh-short.mp3", T.q5 - 0.06, 0, { techo: -46 });
voz("s9", T.s9, -1);
pop(T.palabra + 0.02, -40); pop(T.s9 + palabra("s9", 1) + 0.02, -42);
pop(T.cierre + 0.05, -44);
// la cama +7 dB; en los tramos sin voz (la escalada, la pausa) los SFX +4 dB (nunca por encima del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 7); continue; }
  if (en(t0, T.p3b, T.al - 0.3)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 4); }
// la música: duck debajo de cada voz (~0,3) para que la voz quede ≥ 6 LU arriba; en la pausa P3b se corta seca
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
const IRIS_C = "720px 1180px";   // el iris se abre desde el celular de Silvana (Q1)
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      #precarga { position: absolute; left: -9999px; font: 800 40px "Lexend"; }
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
      <div id="precarga">Disponible</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el celular de Silvana
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
