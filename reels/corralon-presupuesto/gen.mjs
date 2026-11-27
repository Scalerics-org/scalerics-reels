// Genera todo corralon-presupuesto desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las voces
//     (bocas) y CORTE (dónde arranca la segunda mitad de cada línea en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (CORRALONES del cuadro 0, los chips de fecha, el cartel "Un seguimiento
//     más tarde…", "Comentá PRESUPUESTO" y la línea chica final); las burbujas y los rótulos son 3D pegados a la cámara
//     (assets/tres.js)
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/taller-service (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija · VER=portada: la cámara del fondo de la portada.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh): m1 Mónica "Gustavo, ¿me pasás presupuesto? Es toda la casa." (P1 y Q1) ·
// g2 Gustavo "Te lo armo para el lunes." · t3 Tito "Gustavo, ¿la de la casa te compró?" (P3 y Q4) · g4 "Yo no ando
// persiguiendo a nadie." · m5 "¡Gustavo! ¡Arrancamos la casa!" (P4 y Q5) · m6 "El de la otra cuadra me escribió todos los
// días. ¡Un pesado!" · g7 "Por lo menos yo no fui pesado." · m8 "¡Y gracias por tu presupuesto! Se lo pasé a él." · nar
// "Un seguimiento más tarde." · g10 "Te lo armo ahora." · m11 "¡Ay, qué atentos!" · g12 "Compró. Con un botón." · g13 "Ya
// sé. Es mi camión." · g14 "Comentá PRESUPUESTO y te mando cómo funciona para tu corralón."
const VOCES = ["m1", "g2", "t3", "g4", "m5", "m6", "g7", "m8", "g10", "m11", "g12", "g13", "g14"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { g14: JSON.parse(fs.readFileSync("assets/voice/palabras-g14.json", "utf8")) };
const T = {};
const ALIAS = { m1b: "m1", t3b: "t3", m5b: "m5" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
// dónde arranca la segunda mitad de las líneas en dos tiempos (medido con silencedetect sobre assets/voice, ver NOTAS)
const CORTE = { m1: 1.55, m5: 0.87, m6: 2.13, m8: 1.72, g12: 0.68, g13: 0.88 };
// ---- parte 1 ----
// P1 · cuadro 0, sábado 10:00: Mónica ya desenrolla la lista de materiales sobre el mostrador; el rollo cae por el frente
// hasta el piso y sigue rodando: "Gustavo, ¿me pasás presupuesto? Es toda la casa." · P1g Gustavo mira el rollo que no
// termina: "Te lo armo para el lunes."
T.m1 = 0.1;
T.p1g = r2(fin("m1") + 0.06); T.g2 = r2(T.p1g + 0.12);
// P2 · el montaje del domingo a la noche (sin voz): 19:10 · 21:30 (la cinta ya cuelga) · 23:20 (enrulada en el piso; push-in
// al display "1.260.000") · el inserto del celular: Enviado 23:22 → Visto
T.p2 = r2(fin("g2") + 0.22);
T.n1 = T.p2; T.n2 = r2(T.p2 + 0.72); T.n3 = r2(T.p2 + 1.44); T.rot4h = r2(T.n3 + 0.2);
T.p2c = r2(T.p2 + 2.1); T.enviado = r2(T.p2c + 0.02); T.visto = r2(T.p2c + 0.6);
// P3 · jueves: el mostrador de día, Tito con los codos; Gustavo enrolla la cinta: "Gustavo, ¿la de la casa te compró?" /
// "Yo no ando persiguiendo a nadie."
T.p3 = r2(T.p2c + 0.95); T.t3 = r2(T.p3 + 0.15); T.g4 = r2(fin("t3") + 0.12);
// P4 · tres semanas después, desde el portón: el camión gris recula y descarga enfrente; Mónica cruza con el casco:
// "¡Gustavo! ¡Arrancamos la casa!" · P4m: "El de la otra cuadra me escribió todos los días. ¡Un pesado!"
T.p4 = r2(fin("g4") + 0.25); T.m5 = r2(T.p4 + 0.45);
T.p4m = r2(fin("m5") + 0.02); T.m6 = r2(T.p4m + 0.06);
// la pausa: los dos en el portón con el camión descargando atrás; rótulos
T.p4p = r2(fin("m6") + 0.05); T.rotP = r2(T.p4p + 0.1); T.rotS = r2(T.p4p + 0.5);
// P5 · primer plano de Gustavo, seco: "Por lo menos yo no fui pesado."
T.p5 = r2(T.p4p + 0.95); T.g7 = r2(T.p5 + 0.28);
// P6 · Mónica, agradecida: "¡Y gracias por tu presupuesto! Se lo pasé a él." · P6i el tablero del camión gris: la hoja tachada
T.p6 = r2(fin("g7") + 0.38); T.m8 = r2(T.p6 + 0.1);
T.p6i = r2(T.m8 + CORTE.m8 - 0.02);   // el inserto entra con "Se lo pasé a él."
const P1 = r2(Math.max(fin("m8") + 0.7, T.p6i + 1.4));
const P2 = r2(P1 + Math.max(2.25, LEN.nar + 0.2));
// ---- parte 2 ----
// Q1 · el mismo cuadro 0 (la tablet en el atril): el mismo audio de Mónica · Q1g Gustavo toca la tablet: "Te lo armo
// ahora." · Q1t el presupuesto se arma con la lista de precios; "Enviar por WhatsApp"
T.q1 = P2; T.m1b = r2(P2 + 0.1);
T.q1g = r2(fin("m1b") + 0.06); T.g10 = r2(T.q1g + 0.1); T.toca = r2(T.q1g + 0.15);
T.q1t = r2(fin("g10") + 0.1); T.filas = [0.15, 0.33, 0.51, 0.69].map((d) => r2(T.q1t + d)); T.total = r2(T.q1t + 0.9); T.enviar = r2(T.q1t + 1.4);
// Q2 · el celular de Mónica: el presupuesto con "Aceptar" / "Tengo una duda"
T.q2 = r2(T.enviar + 0.25); T.llega = r2(T.q2 + 0.15); T.rotQ2 = r2(T.q2 + 0.45);
// Q3 · lunes, 2 días después: el celular de Gustavo: "Mónica no respondió · Hoy toca seguimiento" con el mensaje listo;
// toca "Enviar" · Q3m Mónica en su terreno lee: "¡Ay, qué atentos!" · Q3a su celular: Aceptar → "Aceptado ✓"
T.q3 = r2(T.q2 + 1.4); T.rotQ3 = r2(T.q3 + 0.3); T.seg = r2(T.q3 + 1.08); T.segOk = r2(T.seg + 0.12);
T.q3m = r2(T.seg + 0.42); T.noti3 = r2(T.q3m + 0.12); T.m11 = r2(T.q3m + 0.35);
T.q3a = r2(fin("m11") + 0.08); T.acepta = r2(T.q3a + 0.4); T.aceptado = r2(T.acepta + 0.12);
// Q4 · el mostrador: Tito (el mismo audio) · Q4t el panel "Presupuestos abiertos" (Ganados 3 → 4) · Q4b "Compró. Con un botón."
T.q4 = r2(T.q3a + 1.15); T.t3b = r2(T.q4 + 0.12); T.gira = r2(fin("t3b") - 0.3);
T.q4t = r2(fin("t3b") + 0.08); T.gana = r2(T.q4t + 0.35); T.rotQ4 = r2(T.q4t + 0.3);
T.q4b = r2(T.q4t + 1.15); T.g12 = r2(T.q4b + 0.08);
// Q5 · tres semanas después, el mismo encuadre de P4: el camión navy de MATERIALES GUSTAVO descarga enfrente; el mismo
// "¡Gustavo! ¡Arrancamos la casa!" · Q5g "Ya sé. Es mi camión." · Q5b Tito enrolla la cinta y la guarda en el cajón
T.q5 = r2(fin("g12") + 0.22); T.m5b = r2(T.q5 + 0.4);
T.q5g = r2(fin("m5b") + 0.1); T.g13 = r2(T.q5g + 0.12);
T.q5b = r2(fin("g13") + 0.1); T.guarda = r2(T.q5b + 0.4); T.cierra = r2(T.q5b + 0.62);
// C · Gustavo a cámara en el portón, su camión descargando enfrente: "Comentá PRESUPUESTO…"
T.c = r2(T.q5b + 0.85); T.g14 = r2(T.c + 0.1);
const iCom = PAL.g14.findIndex((w) => /PRESUP/i.test(w.text ?? w.word ?? ""));
T.palabra = r2(T.g14 + Math.max(0.3, (PAL.g14[iCom >= 0 ? iCom : 1].start ?? 0.4) - 0.05));
const DUR = Math.ceil((Math.ceil((T.g14 + LEN.g14 + 0.2) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.6, DUR - 1.9));

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
    P .chip { position: absolute; left: 44px; padding: 14px 30px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${CR}; font: 900 62px/1 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.01em; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }
    P .chip.rojo { color: ${RED}; border-color: ${RED}; }
    P .chip.verde { color: ${G}; border-color: ${G}; }`;

// P1 · el rubro: "CORRALONES" enorme arriba (navy en el recuadro verde de selección, caja navy con borde crema), entero
// desde el cuadro 0, y el chip "Sábado, 10:00." debajo; se van con el corte a Gustavo
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p1g);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 60px; right: 60px; top: 78px; padding: 18px 4px 26px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 124px/1.1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; }
    P .sel b { position: absolute; inset: -6px 0 -4px; background: ${G}; border: 7px solid ${CR}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 300px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>CORRALONES</em></span></div></div>
      <div class="chip">Sábado, 10:00.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// los chips de fecha (arriba a la izquierda)
const CHIPS = [
  ["s01-chip", T.n1, T.n2, "Domingo, 19:10.", ""],
  ["s02-chip", T.n2, T.n3, "Domingo, 21:30.", ""],
  ["s03-chip", T.n3, T.p2c, "Domingo, 23:20.", "rojo"],
  ["s04-chip", T.p3, r2(T.p3 + 1.5), "Jueves.", ""],
  ["s05-chip", T.p4, r2(T.p4 + 1.7), "Tres semanas después.", ""],
  ["s06-chip", r2(T.q1 + 0.02), T.q1g, "Sábado, 10:00.", ""],
  ["s07-chip", T.q1t, T.q2, "Sábado, 10:25.", "verde"],
  ["s08-chip", T.q3, r2(T.q3 + 1.6), "Lunes · 2 días después.", ""],
  ["s09-chip", T.q5, r2(T.q5 + 1.6), "Tres semanas después.", "verde"],
];
for (const [id, ini0, fin0, txt, cls] of CHIPS) {
  const ini = r2(ini0), dur = r2(fin0 - ini0);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `${CHIP}
    P .chip { top: 96px; }`,
    html: `      <div class="chip ${cls}">${txt}</div>`,
    js: `      tl.fromTo(q(".chip"), { scale: 0.9, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.14, ease: "back.out(1.6)", immediateRender: true }, 0);`,
  });
}

// el cartel "Un seguimiento más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas. No dice
// "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = Number(process.env.MAS ?? 0.78);   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 620px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 128px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; }
    P .linea + .linea { margin-top: 14px; }
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
          <circle class="bu" cx="240" cy="1560" r="34" fill="none" stroke="${CR}" stroke-width="10"/>
          <circle class="bu" cx="1270" cy="1600" r="26" fill="none" stroke="${CR}" stroke-width="9"/>
          <circle class="bu" cx="330" cy="1680" r="18" fill="none" stroke="${NAVY}" stroke-width="8"/>
          <circle class="bu" cx="1290" cy="1440" r="40" fill="none" stroke="${NAVY}" stroke-width="10"/>
          <circle class="bu" cx="500" cy="1990" r="22" fill="none" stroke="${CR}" stroke-width="8"/>
          <circle class="bu" cx="560" cy="460" r="30" fill="none" stroke="${CR}" stroke-width="9"/>
        </g>
      </svg>
      <div class="texto" data-layout-allow-overlap data-layout-allow-overflow>
        ${lin("a", ["Un"])}
        ${lin("b", ["seguimiento"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const nA = qa(".linea.a .l").length, nB = qa(".linea.b .l").length;
      qa(".l").forEach((l, i) => {
        const t0 = i < nA ? i * 0.03 : i < nA + nB ? 0.18 + (i - nA) * 0.03 : ${MAS} + (i - nA - nB) * 0.03;
        tl.fromTo(l, { scale: 0.35, opacity: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.36)});   // se va con el barrido (sin cuadros verdes vacíos)`,
  });
}

// C · "Comentá PRESUPUESTO" + "y te mando cómo funciona para tu corralón", debajo de la cara de Gustavo
{
  const id = "s10-palabra", ini = T.palabra, dur = Math.ceil((DUR - T.palabra) * 100) / 100;   // hasta el último cuadro
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 50px; right: 50px; top: 1010px; padding: 12px 10px 20px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 80px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 108px/1.12 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 20px; margin-top: 4px; }
    P .sel b { position: absolute; inset: 6px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 8px; font: 700 48px/1.2 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>PRESUPUESTO</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu corralón</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.4, y: 60 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.fromTo(q(".sel"), { scale: 1 }, { scale: 1.06, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.32);`,
  });
}
// la línea chica final: qué es y la web
{
  const id = "s11-cierre", ini = T.cierre, dur = Math.ceil((DUR - T.cierre) * 100) / 100;
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 100px; right: 100px; top: 1490px; padding: 10px 18px 14px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; white-space: nowrap; }
    P .b { margin-top: 6px; font: 800 56px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Presupuestos con seguimiento</div><div class="b">scalerics.com</div></div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.6)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, 0.3);`,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto ANTES de la ganancia final (~+7 dB): en el final, ningún efecto ni la cama pasan -31 LUFS.
const TECHO = -38;
const esCama = (f) => f.startsWith("bgm/") || /calle/.test(f);
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -39) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const tic = (t, techo = -41) => s("sfx/k-tick-1.wav", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const tecla = (t, techo = -43) => s("sfx/key-press.mp3", t, 0, { techo, dur: 0.15, fin: 0.05 });
const pasos = (a, b, techo = -44, cada = 0.3) => { for (let t = a, i = 0; t < b; t += cada, i++) s(`sfx/paso-${i % 5}.wav`, t, 0, { techo }); };
const papel = (t, techo = -40, dur = 0.6) => s("sfx/papel.wav", t, 0, { techo, dur, fin: 0.12 });
const ladrillo = (t, techo = -44, k = 0) => s(k % 2 ? "sfx/bsb-ladrillo2.wav" : "sfx/bsb-ladrillo.wav", t, 0, { techo, fin: 0.08 });   // ladrillo sobre la pila (BigSoundBank #1022, CC0)
const calle = (a, b, techo = -44) => s("sfx/calle-tramo.wav", a, 0, { loop: true, dur: r2(b - a), fi: 0.1, fin: 0.12, techo, lp: 2400 });
// ---- parte 1 ----
// P1 · el galpón de sábado: el zumbido de los tubos, la música; el papel que se desenrolla y el rollo que golpea el piso
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p2 + 0.02), fi: 0.05, fin: 0.1, techo: -46, lp: 700 });
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p2 + 0.02), fin: 0.08, techo: -38 });
papel(0.02, -38, 1.4); s("sfx/k-page-turn.wav", 0.6, 0, { techo: -42, dur: 0.5, fin: 0.12 });
s("sfx/madera-golpe.wav", 1.05, 0, { techo: -44, dur: 0.3, fin: 0.08, lp: 1800 });   // el rollo toca el piso
s("sfx/k-cloth_1.wav", 1.3, 0, { techo: -46, dur: 0.9, fin: 0.3, lp: 2500 });         // y sigue rodando
voz("m1", T.m1, -1);
whoosh(T.p1g - 0.05, -48);
voz("g2", T.g2, -1);
// P2 · el domingo a la noche: el portón bajado (sin calle), el tic del reloj, las teclas, la impresora de la calculadora en
// cada chip, el sorbo de mate, el "fiu" del mensaje y el doble tilde
s("sfx/zumbido.wav", T.p2, 0, { dur: r2(T.p3 - T.p2), fi: 0.1, fin: 0.15, techo: -50, lp: 500 });
s("sfx/interruptor.wav", T.p2 + 0.02, 0, { techo: -44, dur: 0.3, fin: 0.08 });   // la lámpara
for (let t = T.p2 + 0.1; t < T.p2c - 0.05; t += 0.5) tic(t, -46);
for (const t0 of [T.n1 + 0.08, T.n2 + 0.05, T.n3 - 0.02]) { s("sfx/bsb-teclas.wav", t0, 0, { techo: -41, dur: 0.32, fin: 0.06 }); s("sfx/bsb-imprime.wav", t0 + 0.3, 0, { techo: -37 }); }   // las teclas y el traqueteo de la impresora de la calculadora (BigSoundBank #3283 y #3557, CC0)
pop(T.rot4h, -41);
whoosh(T.p2c - 0.04, -46); s("sfx/whoosh.mp3", T.enviado, 0, { techo: -44, vel: 1.5, dur: 0.4, fin: 0.1 });
ding(T.visto, -42);
// P3 · jueves: la calle por el portón, los codos de Tito, el papel que se enrolla
calle(T.p3, T.p4 + 0.02, -46);
s("bgm/pizzicato.wav", T.p3, 0, { desde: 2.0, dur: r2(T.p4 - T.p3 + 0.02), fi: 0.1, fin: 0.1, techo: -40 });
s("sfx/madera-golpe.wav", T.p3 + 0.04, 0, { techo: -42, dur: 0.3, fin: 0.08 });
papel(T.p3 + 0.3, -44, 1.2);
voz("t3", T.t3, -1);
voz("g4", T.g4, -1);
// P4 · la calle: bip-bip de marcha atrás + diésel, los ladrillos que se apilan, los pasos de Mónica
calle(T.p4, T.p6i, -42);
s("sfx/bsb-marcha-atras.wav", T.p4 - 0.05, 0, { techo: -38, dur: 1.1, fin: 0.2 });
s("sfx/bsb-camion.wav", T.p4, 0, { techo: -42, dur: r2(T.p5 - T.p4), fi: 0.1, fin: 0.4, lp: 900 });
for (let t = T.p4 + 0.9 + 0.62, k = 0; t < T.p6i; t += 0.62, k++) ladrillo(t, t > T.p4p - 0.1 && t < T.p5 ? -40 : -46, k);   // en el ciclo del peón (cada 0,62 s)
pasos(T.p4 + 0.3, T.p4m, -46, 0.3);
s("bgm/pizzicato.wav", T.p4, 0, { desde: 6.0, dur: r2(T.p4p - T.p4 + 0.1), fi: 0.15, fin: 0.12, techo: -40 });   // la música se corta seca en la pausa
voz("m5", T.m5, -1);
whoosh(T.p4m - 0.05, -48);
voz("m6", T.m6, -1);
pop(T.rotP, -40); pop(T.rotS, -42);
// P5 · el remate seco (sin música; solo la calle y un ladrillo)
s("sfx/k-tono.wav", T.g7 - 0.12, 0, { techo: -46, dur: 0.6, fin: 0.3, lp: 600 });
voz("g7", T.g7, -1);
// P6 · el remate del remate; el inserto del tablero; stinger al cartel
voz("m8", T.m8, -1);
whoosh(T.p6i - 0.05, -44); s("sfx/papel.wav", T.p6i + 0.1, 0, { techo: -42, dur: 0.4, fin: 0.1 });
s("sfx/glitch-1.mp3", T.p6i + 0.45, 0, { techo: -42, dur: 0.3, fin: 0.1 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -42 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -38, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.04, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.2), r2(P1 + 0.04 + LEN.nar + 0.3)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -42, sinDuck: true, sinHueco: true });
for (const d of [0.12, 0.4, 0.9, 1.4]) pop(P1 + d + 0.02, -46);
s("sfx/whoosh.mp3", P2 - 0.3, 0, { techo: -44 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { desde: 1.0, dur: r2(DUR - P2), fi: 0.4, fin: 0.5, techo: -38 });
s("sfx/zumbido-largo.wav", P2, 0, { loop: true, desde: 3, dur: r2(T.q2 - P2), fi: 0.1, fin: 0.2, techo: -46, lp: 700 });
// Q1 · el mismo audio de Mónica; el papel; la tablet: el toque, el tipeo, los renglones, el total, "Enviar"
papel(P2 + 0.02, -40, 1.4); s("sfx/madera-golpe.wav", P2 + 1.05, 0, { techo: -46, dur: 0.3, fin: 0.08, lp: 1800 });
voz("m1", T.m1b, -1);
whoosh(T.q1g - 0.05, -48);
voz("g10", T.g10, -1); toque(T.toca + 0.2, -40);
whoosh(T.q1t - 0.04, -46);
for (const t of T.filas) { tecla(t, -42); tic(t + 0.05, -43); }   // cada renglón que entra desde la lista de precios
ding(T.total, -40);
toque(T.enviar, -38); s("sfx/whoosh.mp3", T.enviar + 0.05, 0, { techo: -44, vel: 1.5, dur: 0.4, fin: 0.1 });
// Q2 · el celular de Mónica: la notificación, el rótulo
noti(T.llega, -40); pop(T.rotQ2, -43);
// Q3 · el aviso de seguimiento en el celular de Gustavo, el toque en Enviar, el "fiu" · el terreno de Mónica (la calle de
// fondo), la notificación, "¡Ay, qué atentos!", Aceptar, el ding
noti(T.q3 + 0.1, -40); pop(T.rotQ3, -42);
toque(T.seg, -38); s("sfx/whoosh.mp3", T.segOk, 0, { techo: -44, vel: 1.5, dur: 0.4, fin: 0.1 });
calle(T.q3m, T.q4, -46);
noti(T.noti3, -40);
voz("m11", T.m11, -1);
whoosh(T.q3a - 0.04, -48); toque(T.acepta, -43); ding(T.aceptado, -43);
// Q4 · el mostrador: Tito (el mismo audio), la tablet que gira, el contador del panel, "Compró. Con un botón."
s("sfx/madera-golpe.wav", T.q4 + 0.04, 0, { techo: -44, dur: 0.3, fin: 0.08 });
voz("t3", T.t3b, -1);
s("sfx/k-cloth_2.wav", T.gira, 0, { techo: -46, dur: 0.4, fin: 0.1 });
whoosh(T.q4t - 0.04, -46); tic(T.gana, -40); ding(T.gana + 0.1, -40); pop(T.rotQ4, -42);
voz("g12", T.g12, -1);
// Q5 · la calle: el camión navy, los ladrillos, Mónica (el mismo audio), "Ya sé. Es mi camión." · Q5b la cinta y el cajón
calle(T.q5, DUR, -44);
s("sfx/bsb-camion.wav", T.q5, 0, { techo: -44, dur: r2(T.q5b - T.q5), fi: 0.1, fin: 0.3, lp: 900 });
for (let t = T.q5 + 0.9 + 0.62, k = 0; t < T.q5b; t += 0.62, k++) ladrillo(t, -46, k);
pasos(T.q5 + 0.2, T.q5g, -46, 0.3);
voz("m5", T.m5b, -1);
whoosh(T.q5g - 0.05, -48);
voz("g13", T.g13, -1);
whoosh(T.q5b - 0.04, -46); papel(T.q5b + 0.05, -42, 0.5); s("sfx/bsb-cajon-madera.wav", T.cierra - 0.1, 0, { techo: -38, dur: 0.6, fin: 0.15 }); s("sfx/madera-golpe.wav", T.cierra + 0.08, 0, { techo: -40, dur: 0.3, fin: 0.08 });
// C · Gustavo a cámara: el camión descargando atrás, pop en PRESUPUESTO, la línea chica
for (let t = T.q5 + 0.9 + 0.62 * Math.ceil((T.c - T.q5 - 0.9) / 0.62), k = 0; t < DUR - 0.3; t += 0.62, k++) ladrillo(t, -50, k);
whoosh(T.c - 0.08, -46);
voz("g14", T.g14, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// pop suave en la entrada de cada burbuja (y de la segunda mitad de las líneas en dos tiempos)
for (const t of [T.m1, T.m1 + CORTE.m1, T.g2, T.t3, T.g4, T.m5, T.m5 + CORTE.m5, T.m6, T.m6 + CORTE.m6, T.g7, T.m8, T.m8 + CORTE.m8, T.m1b, T.m1b + CORTE.m1, T.g10, T.m11, T.t3b, T.g12, T.g12 + CORTE.g12, T.m5b, T.m5b + CORTE.m5, T.g13, T.g13 + CORTE.g13]) pop(t - 0.04, -44);
// duck de la cama (~-7 dB) mientras habla alguien
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => b >= x[1] && a <= x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a, b, 0.2])]; }
// en los tramos SIN voz la cama baja (HUECO_K): los huecos quedan ≤ -31 LUFS con los efectos adelante
const HUECO_K = Number(process.env.HUECO_K ?? 0.42);
{
  const V = VOZ.slice().sort((a, b) => a[0] - b[0]); const libres = []; let c = 0;
  for (const [a0, b0] of V) { const a = a0 + 0.2, b = b0 - 0.25; if (a > c + 0.25) libres.push([c, a]); c = Math.max(c, b); } if (DUR > c + 0.25) libres.push([c, DUR]);
  for (const x of S) if (esCama(x[0]) && !x[3].sinDuck && !x[3].sinHueco) x[3].duck = [...(x[3].duck || []), ...libres.filter(([a, b]) => b > x[1] && a < x[1] + (x[3].dur ?? 99)).map(([a, b]) => [a - 0.05, b + 0.05, HUECO_K, 0.12])];
}
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
// CAMA: la música y la calle suben CAMA dB sobre su techo (se oyen bajo la voz); los huecos sin voz se verifican con
// medir-sfx.py (≤ -31)
const CAMA = Number(process.env.CAMA ?? 9);
const ganancia = ([f, , db, o]) => { if (o.voz) return db; const L = lufsTramo(f, o); return r2(Math.min(db, Math.min(o.techo ?? TECHO, TECHO) - 6 - L.M, (o.pico ?? PICO) - L.pk) + (esCama(f) ? CAMA : 0) + (o.extra ?? 0)); };
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
    if (o.voz) c += ",acompressor=threshold=-24dB:ratio=2:attack=8:release=150:makeup=2.5";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k, rr = 0.4] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/${rr},0,1)*clip((${b}-t)/${rr},0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`anullsrc=r=48000:cl=stereo,atrim=duration=${dur}[z]`);   // ancla: amix sin entrada en t = 0 daba silencio
  filtros.push(`[z]${lista.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lista.length + 1}:normalize=0:dropout_transition=0,atrim=duration=${dur}[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_f32le", salida);
  execFileSync("ffmpeg", args, { maxBuffer: 1e8 });
}
if (!process.env.SINAUDIO) {
  fs.mkdirSync("assets/audio", { recursive: true });
  mezcla(S, "assets/audio/mezcla-cruda.wav", DUR);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "volume=6dB,acompressor=threshold=-24dB:ratio=1.5:attack=30:release=400:makeup=1", "-ar", "48000", "-c:a", "pcm_f32le", "assets/audio/mezcla-bus.wav"]);
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
const ROT = r2(P1), IRIS = r2(P2 - 0.4);
const IRIS_C = "540px 1300px";   // el iris abre sobre el mostrador (no desde una cara)
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
      <div id="precarga">CORRALONES</div><div id="precarga2">1.215.000</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre sobre el mostrador
      tl.set("#capa3d", { opacity: 0 }, ${ROT});
      tl.set("#capa3d", { scale: 1, rotation: 0, opacity: 1, clipPath: "circle(0px at ${IRIS_C})" }, ${r2(ROT + 0.27)});
      tl.fromTo("#capa3d", { clipPath: "circle(90px at ${IRIS_C})" }, { clipPath: "circle(1900px at ${IRIS_C})", duration: 0.38, ease: "power1.in", immediateRender: false }, ${IRIS});
      tl.set("#capa3d", { clipPath: "none" }, ${r2(P2 - 0.02)});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`listo: ${ESC.length} escenas, ${S.length} sonidos, ${DUR} s · P1 ${P1} · P2 ${P2} · cierre ${T.c} (${r2(DUR - T.c)} s) · parte 2 ${r2(DUR - P2)} s (${Math.round((100 * (DUR - P2)) / DUR)} %)`);
console.log(JSON.stringify(LEN));
