// Genera todo dist-camion desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: los beats (T), la duración, dónde termina la parte 1 y arranca la 2, las envolventes de las voces
//     (bocas) y CORTE (el silencio interno de cada línea en dos tiempos)
//   - compositions/*.html: la capa plana de arriba (DISTRIBUIDORAS del cuadro 0, los chips de hora, el cartel "Una hoja
//     de ruta más tarde…", "Comentá CAMIÓN" y la línea chica final); las burbujas y los rótulos son 3D pegados a la cámara
//   - index.html: fondo + cartel (debajo) + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (techo por efecto)
// Esqueleto de reels/importadora-dolar (la mezcla: bus → ganancia a -14 LUFS → recién ahí el limitador).
// LIMPIO=1: sin capa plana ni burbujas (fondo de la portada). MEDIR=1: además stems voz / resto. SINAUDIO=1: no rehace
// la mezcla. VER=cam:px,py,pz,mx,my,mz,fov: una cámara fija.
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const durWav = (f) => r2(Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString()));

// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/procesar.sh): g1 Graciela "Rubén, ¿por dónde viene el camión?" · r1 Rubén "Está
// llegando." · m1 Marta "¿Por dónde viene?" · r2 "Llegando." · h1 Héctor "Rubén, ¿y el camión?" · r3 "Llegando." · n1 Nico
// "Jefe, ¿dónde está el camión?" · r4 "Llegando." · n2 "¿Adónde?" (n1, r4, n2 se reusan en Q3) · r5 "Es un camión, Nico. A
// algún lado llega." · r6 "¿Y esta firma?" · u1 Ruso "Un señor." · r7 "¿Qué señor?" · u2 "Uno que pasaba." · nar "Una hoja
// de ruta más tarde." · g2 "Ah. Soy la próxima." · m2 "Al banco voy a la una." · r8 "A lo de Héctor. En dos minutos." · h2
// "¿Firmo yo?" · u3 "Vos, Héctor. Vos." · r9 "¿Y hoy? ¿Pasó algún señor?" · u4 "Ni uno." · r10 "Comentá CAMIÓN y te mando
// cómo funciona para tu distribuidora."
const VOCES = ["g1", "r1", "m1", "r2", "h1", "r3", "n1", "r4", "n2", "r5", "r6", "u1", "r7", "u2", "g2", "m2", "r8", "h2", "u3", "r9", "u4", "r10"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const PAL = { r10: JSON.parse(fs.readFileSync("assets/voice/palabras-r10.json", "utf8")) };
const T = {};
const ALIAS = { n1b: "n1", r4b: "r4", n2b: "n2" };
const fin = (k) => r2(T[k] + LEN[ALIAS[k] ?? k]);
function silencios(k) {
  const txt = execSync(`ffmpeg -hide_banner -i assets/voice/${k}.wav -af silencedetect=n=-38dB:d=0.1 -f null - 2>&1`).toString();
  const ini = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), fn = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const L = []; ini.forEach((a, i) => { const b = fn[i]; if (b !== undefined && a > 0.05 && b < LEN[k] - 0.05) L.push([a, b]); });
  return L;
}
const corteVoz = (k) => { const L = silencios(k); if (!L.length) return r2(LEN[k] * 0.45); const s = L.reduce((m, x) => (x[1] - x[0] > m[1] - m[0] ? x : m)); return r2(s[1] - 0.02); };
const CORTE = { r5: corteVoz("r5"), g2: corteVoz("g2"), r8: corteVoz("r8"), u3: corteVoz("u3"), r9: corteVoz("r9") };
// ---- parte 1 ----
// P1 · pantalla partida (cuadro 0): arriba la rotisería, Graciela con el celular en la oreja; abajo la oficina vidriada,
// Rubén con el mate y el celular en altavoz sobre el escritorio
T.g1 = 0.12;
// P2 · primer plano de Rubén, seguro: "Está llegando."
T.p2 = r2(fin("g1") + 0.04); T.r1 = r2(T.p2 + 0.06);
// P3 · el montaje (pantalla partida): arriba Cafetería Marta y después Súper Héctor; abajo Rubén cada vez más hundido;
// el contador de llamadas 7 → 12 → 19
T.p3 = r2(fin("r1") + 0.06); T.ring1 = r2(T.p3 + 0.02); T.m1 = r2(T.p3 + 0.22); T.r2 = r2(fin("m1") + 0.06);
T.p3b = r2(fin("r2") + 0.08); T.ring2 = r2(T.p3b + 0.02); T.h1 = r2(T.p3b + 0.2); T.r3 = r2(fin("h1") + 0.08); T.c19 = r2(fin("r3") + 0.04);
// P4 · el inserto del celular de Rubén: llama al Ruso (toca Llamar) · P4b · la cabina andando por la rambla: el celular
// vibra en el portavasos ("Rubén · 14 llamadas perdidas"), el Ruso maneja con las dos manos
T.p4 = r2(T.c19 + 0.32); T.tap = r2(T.p4 + 0.3);
T.p4b = r2(T.p4 + 0.66); T.rotCab = r2(T.p4b + 0.5);
// P5 · la oficina: Nico asoma por la puerta vidriada · P5b · primer plano de Rubén para el remate (deja el mate)
T.p5 = r2(T.p4b + 1.6); T.n1 = r2(T.p5 + 0.12); T.r4 = r2(fin("n1") + 0.06); T.n2 = r2(fin("r4") + 0.1);
T.deja = r2(fin("n2") + 0.04); T.p5b = r2(fin("n2") + 0.26); T.r5 = r2(fin("n2") + 0.5);
// P6a · 12:10: Cafetería Marta con la persiana baja y el cartel; el Ruso golpea con la zorra al lado
T.p6a = r2(fin("r5") + 0.2); T.golpes = [0.25, 0.48, 0.71].map((d) => r2(T.p6a + d));
// P6b · 18:00, el muelle: el camión vuelve, se abren las puertas, bajan las 6 cajas, los rótulos; el fajo de remitos
T.p6b = r2(T.p6a + 1.3); T.puertas = r2(T.p6b + 0.02); T.baja = r2(T.p6b + 0.2); T.rotMarta = r2(T.p6b + 0.3); T.rotViaje = r2(T.p6b + 0.75); T.rotHoras = r2(T.p6b + 1.1); T.fajo = r2(T.p6b + 1.45);
// P6i · el inserto del remito: "¿Y esta firma?" · P6c · los dos: "Un señor." / "¿Qué señor?" / "Uno que pasaba." · suena el
// celular de Rubén ("Súper Héctor"), Rubén cierra los ojos
T.p6i = r2(T.p6b + 1.8); T.r6 = r2(T.p6i + 0.18);
T.p6c = r2(fin("r6") + 0.04); T.u1 = r2(T.p6c + 0.06); T.r7 = r2(fin("u1") + 0.07); T.u2 = r2(fin("r7") + 0.07);
T.ring3 = r2(fin("u2") + 0.15); T.ojos = r2(T.ring3 + 0.2);
// termina la parte 1 (arranca el cartel)
const P1 = r2(T.ring3 + 0.75);
const P2 = r2(P1 + Math.max(2.05, LEN.nar + 0.06));
// ---- parte 2 ----
// Q1 · la misma pantalla partida: a Graciela le llega el aviso (Q1i, el celular a pantalla: la ventana de entrega y "Sos
// la próxima parada") · Q1g · Graciela baja el celular: "Ah. Soy la próxima."
T.q1 = P2; T.aviso1 = r2(P2 + 0.35); T.q1i = r2(P2 + 0.7); T.aviso2 = r2(T.q1i + 0.75); T.rotAviso = r2(T.q1i + 0.35);
T.q1g = r2(T.aviso2 + 1.0); T.g2 = r2(T.q1g + 0.1);
// Q2 · Cafetería Marta abierta: Marta con el cartel en la mano y el aviso en el celular: "Al banco voy a la una."
T.q2 = r2(fin("g2") + 0.08); T.m2 = r2(T.q2 + 0.3); T.cajon = r2(fin("m2") + 0.05);
// Q3 · la oficina (= P5): el panel en el monitor; el mismo "Jefe, ¿dónde está el camión?" / "Llegando." / "¿Adónde?" ·
// Rubén gira el monitor · Q3m · el panel: "Parada 15 · Súper Héctor · llega 10:52" · "A lo de Héctor. En dos minutos."
T.q3 = r2(T.cajon + 0.4); T.n1b = r2(T.q3 + 0.12); T.r4b = r2(fin("n1b") + 0.06); T.n2b = r2(fin("r4b") + 0.1);
T.gira = r2(fin("n2b") + 0.02); T.q3m = r2(fin("n2b") + 0.3); T.r8 = r2(T.q3m + 0.1); T.fila15 = r2(T.q3m + 0.05);
// Q4 · la vereda del Súper Héctor: el camión estacionado, el Ruso le da el celular: "¿Firmo yo?" · Q4i · el remito en el
// celular, la firma con el dedo, la foto, "Entregado ✓" · "Vos, Héctor. Vos." · Q4p · el panel: 15 de 18
T.q4 = r2(fin("r8") + 0.12); T.h2 = r2(T.q4 + 0.45);
T.q4i = r2(fin("h2") + 0.08); T.firma = r2(T.q4i + 0.15); T.u3 = r2(T.q4i + 0.1); T.foto = r2(fin("u3") - 0.1); T.entregado = r2(T.foto + 0.3);
T.q4p = r2(T.entregado + 0.55); T.vuela = r2(T.q4p + 0.05);
// Q5 · el muelle a las 18:00 (= P6b): el camión vacío; el Ruso muestra el celular (18 de 18) · "¿Y hoy? ¿Pasó algún señor?"
// · "Ni uno."
T.q5 = r2(T.q4p + 0.85); T.q5i = r2(T.q5 + 0.75); T.r9 = r2(T.q5 + 0.3); T.q5d = r2(fin("r9") + 0.02); T.u4 = r2(fin("r9") + 0.1);
// C · Rubén a cámara en el muelle con el mate: "Comentá CAMIÓN y te mando cómo funciona para tu distribuidora."
T.c = r2(fin("u4") + 0.25); T.r10 = r2(T.c + 0.05);
const iCom = PAL.r10.findIndex((w) => /CAMI/i.test(w.word ?? w.w ?? w.text ?? ""));
T.palabra = r2(T.r10 + Math.max(0.3, (PAL.r10[iCom >= 0 ? iCom : 1].start ?? 0.3) - 0.05));
const DUR = Math.ceil((Math.ceil((T.r10 + LEN.r10 + 0.15) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(Math.max(T.palabra + 0.7, DUR - 1.9));
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
// desde el cuadro 0, y el chip "Martes, 9:40." debajo; se van con el corte al primer plano de Rubén
{
  const id = "s00-rubro", ini = 0, dur = r2(T.p2);
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 40px; right: 40px; top: 70px; padding: 20px 4px 26px; border-radius: 40px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 14px 16px 0 rgba(3,6,12,0.6); text-align: center; }
    P .tx { font: 900 96px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 18px; }
    P .sel b { position: absolute; inset: -10px 0 -6px; background: ${G}; border: 7px solid ${CR}; border-radius: 10px; }
    P .sel em { position: relative; font-style: normal; }${CHIP}
    P .chip { top: 272px; }`,
    html: `      <div class="caja"><div class="tx"><span class="sel"><b></b><em>DISTRIBUIDORAS</em></span></div></div>
      <div class="chip">Martes, 9:40.</div>`,
    js: `      tl.fromTo(q(".caja"), { scale: 1 }, { scale: 1.03, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, 0.25);`,
  });
}
// P3 · el contador de llamadas en la costura de la pantalla partida: "¿Y el camión?" 7 → 12 → 19 (rojo apagado)
{
  const id = "s03-contador", ini = T.p3, dur = r2(T.p4 - T.p3);
  ESC.push([id, ini, dur, "arriba"]);
  const a = r2(T.p3b - T.p3), b = r2(T.c19 - T.p3);
  escena(id, dur, {
    css: `
    P .cont { position: absolute; left: 50%; top: 960px; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 26px; padding: 14px 34px 18px; border-radius: 30px; background: ${NAVY}; border: 7px solid ${CR}; box-shadow: 10px 12px 0 rgba(3,6,12,0.55); white-space: nowrap; }
    P .et { font: 800 50px/1.08 "Lexend", sans-serif; color: ${CR}; text-align: left; }
    P .n { position: relative; width: 150px; height: 112px; }
    P .n span { position: absolute; inset: 0; font: 900 112px/1 "Lexend", sans-serif; color: ${RED}; text-align: center; letter-spacing: -0.03em; }`,
    html: `      <div class="cont"><div class="et">Llamadas:<br>¿y el camión?</div><div class="n"><span class="n7">7</span><span class="n12">12</span><span class="n19">19</span></div></div>`,
    js: `      tl.fromTo(q(".cont"), { scale: 0.6 }, { scale: 1, duration: 0.2, ease: "back.out(1.8)", immediateRender: true }, 0);
      tl.set(q(".n12"), { opacity: 0 }, 0); tl.set(q(".n19"), { opacity: 0 }, 0);
      tl.set(q(".n7"), { opacity: 0 }, ${a}); tl.set(q(".n12"), { opacity: 1 }, ${a});
      tl.fromTo(q(".n12"), { scale: 1.5 }, { scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, ${a});
      tl.set(q(".n12"), { opacity: 0 }, ${b}); tl.set(q(".n19"), { opacity: 1 }, ${b});
      tl.fromTo(q(".n19"), { scale: 1.6 }, { scale: 1, duration: 0.22, ease: "back.out(2)", immediateRender: false }, ${b});`,
  });
}
// los chips de hora (arriba a la izquierda)
const CHIPS = [
  ["s04-chip", T.p6a + 0.02, T.p6b, "12:10."],
  ["s05-chip", T.p6b + 0.02, T.p6i, "18:00."],
  ["s06-chip", T.q1 + 0.02, T.q1i, "Martes, 9:40."],
  ["s07-chip", T.q5 + 0.02, T.q5i, "18:00."],
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

// el cartel "Una hoja de ruta más tarde…" (time card de dibujito, de marca, hecho de cero). Va DEBAJO del canvas. No
// dice "Scalerics".
{
  const id = "cartel", dur = r2(P2 - P1);
  ESC.push([id, P1, dur, "abajo"]);
  const palabraL = (w) => [...w].map((ch) => `<span class="l">${ch}</span>`).join("");
  const lin = (cls, ws) => `<span class="linea ${cls}">${ws.map(palabraL).join('<span class="esp"></span>')}</span>`;
  const MAS = 1.25;   // "más tarde…" entra cuando el narrador dice "más"
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: -200px; background: ${G}; }
    P svg.manchas { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; }
    P .texto { position: absolute; left: 0; right: 0; top: 560px; text-align: center; transform: rotate(-4deg); }
    P .linea { display: block; font: 900 136px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; }
    P .linea.c { margin-top: 18px; }
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
        ${lin("a", ["Una", "hoja"])}
        ${lin("a", ["de", "ruta"])}
        ${lin("c", ["más", "tarde…"])}
      </div>`,
    js: `      tl.fromTo(q(".giraA"), { rotation: -6, scale: 1.1 }, { rotation: 8, scale: 1, duration: ${dur}, ease: "sine.inOut", immediateRender: true }, 0);
      qa(".bu").forEach((b, i) => tl.fromTo(b, { y: 0 }, { y: -220 - i * 30, duration: ${dur}, ease: "none", immediateRender: true }, 0));
      const letras = qa(".l");
      const nA = qa(".linea.a .l").length;
      letras.forEach((l, i) => {
        const t0 = i < nA ? i * 0.03 : ${MAS} + (i - nA) * 0.03;
        tl.fromTo(l, { scale: 0, y: 80, rotation: (i % 2 ? 1 : -1) * 25 }, { scale: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: true }, t0);
        for (let k = 0; k < 6; k++) {
          const s = k % 2 ? 1 : -1;
          tl.to(l, { y: s * (8 + (i % 3) * 3), rotation: s * (i % 2 ? 4 : -4), duration: 0.17 + (i % 4) * 0.02, ease: "sine.inOut" }, t0 + 0.34 + k * 0.2);
        }
      });
      tl.to(q(".texto"), { scale: 0.5, opacity: 0, duration: 0.08, ease: "power2.in" }, ${r2(dur - 0.42)});   // se va con el iris`,
  });
}

// C · "Comentá CAMIÓN" + "y te mando cómo funciona para tu distribuidora", debajo de la cara de Rubén
{
  const id = "s10-palabra", ini = T.palabra, dur = Math.ceil((DUR - T.palabra) * 100) / 100;
  ESC.push([id, ini, dur, "arriba"]);
  escena(id, dur, {
    css: `
    P .caja { position: absolute; left: 90px; right: 90px; top: 930px; padding: 14px 10px 22px; border-radius: 40px; background: ${CR}; border: 9px solid ${NAVY}; box-shadow: 14px 16px 0 ${NAVY}; text-align: center; transform-origin: 50% 0%; }
    P .a { font: 800 84px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .tx { font: 900 132px/1.12 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; white-space: nowrap; }
    P .sel { position: relative; display: inline-block; padding: 0 22px; margin-top: 6px; }
    P .sel b { position: absolute; inset: 6px 0 -4px; background: ${G}; border: 8px solid ${NAVY}; border-radius: 12px; }
    P .sel em { position: relative; font-style: normal; }
    P .c { margin-top: 10px; font: 700 50px/1.2 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; } P .c + .c { margin-top: 0; }`,
    html: `      <div class="caja"><div class="a">Comentá</div><div class="tx"><span class="sel"><b></b><em>CAMIÓN</em></span></div><div class="c">y te mando cómo funciona</div><div class="c">para tu distribuidora</div></div>`,
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
    P .caja { position: absolute; left: 90px; right: 90px; top: 1440px; padding: 12px 18px 16px; border-radius: 30px; background: ${NAVY}; border: 5px solid ${G}; text-align: center; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .a { font: 700 44px/1.2 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.015em; white-space: nowrap; }
    P .b { margin-top: 8px; font: 800 60px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`,
    html: `      <div class="caja"><div class="a">Aviso de entrega, hoja de ruta</div><div class="a">y remito firmado en el celular</div><div class="b">scalerics.com</div></div>`,
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
const esCama = (f) => f.startsWith("bgm/") || /calle|pajaro|omnibus|cafeteria|chisporroteo|motor-bajo/.test(f);
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(t), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1, o = {}) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04, ...o }); VOZ.push([r2(t - 0.3), r2(t + LEN[f] + 0.4)]); };
const vibra = (t, techo = -40, dur = 0.6) => s("sfx/vibra.wav", t, 0, { techo, dur, fin: 0.12 });
const ring = (t, dur, techo = -38) => s("sfx/bsb-ring.wav", t, 0, { desde: 0.2, dur, fin: 0.04, techo });
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.5, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const ding = (t, techo = -39) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -38) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t, 0, { techo });
const cajaS = (t, techo = -40, k = 1) => s(`sfx/k-book_place_${k}.wav`, t, 0, { techo });
const pasos = (a, b, techo = -44, cada = 0.3) => { for (let t = a, i = 0; t < b; t += cada, i++) s(`sfx/paso-${i % 5}.wav`, t, 0, { techo }); };
const calle = (a, b, techo = -44) => s("sfx/calle-tramo.wav", a, 0, { loop: true, desde: 2.0, dur: r2(b - a), fi: 0.06, fin: 0.08, techo, lp: 2200 });
const rotiseria = (a, b, techo = -47) => s("sfx/chisporroteo.wav", a, 0, { loop: true, desde: 1.0, dur: r2(b - a), fi: 0.05, fin: 0.06, techo, lp: 3000 });
const cafeteria = (a, b, techo = -46) => s("sfx/bsb-cafeteria.wav", a, 0, { desde: 2.0, dur: r2(b - a), fi: 0.05, fin: 0.06, techo });
const oficina = (a, b, techo = -48) => s("sfx/calle-tramo.wav", a, 0, { loop: true, desde: 6.0, dur: r2(b - a), fi: 0.06, fin: 0.06, techo, lp: 900 });
const motorIdle = (a, b, techo = -44) => s("sfx/k-motor-bajo.wav", a, 0, { loop: true, dur: r2(b - a), fi: 0.1, fin: 0.15, techo, lp: 1500 });
// ---- parte 1 ----
s("bgm/pizzicato-lleno.wav", 0, 0, { dur: r2(T.p4 + 0.02), fin: 0.08, techo: -40 });
rotiseria(0, T.p2); oficina(0, T.p4 + 0.02);
voz("g1", T.g1, -1);
voz("r1", T.r1, -1);
s("sfx/sorbo.wav", T.r1 + LEN.r1 + 0.02, 0, { techo: -42, dur: 0.6, fin: 0.15 });
// P3: suena el celular de Rubén (cortado seco cuando atiende), Marta en su cafetería, Héctor en la vereda
ring(T.ring1 - 0.08, 0.32); vibra(T.ring1 - 0.08, -44, 0.3); toque(T.m1 - 0.08, -44);
cafeteria(T.p3, T.p3b);
voz("m1", T.m1, -1); voz("r2", T.r2, -1);
ring(T.ring2 - 0.06, 0.28); vibra(T.ring2 - 0.06, -44, 0.28); toque(T.h1 - 0.08, -44);
calle(T.p3b, T.p4, -46);
voz("h1", T.h1, -1); voz("r3", T.r3, -1);
pop(T.p3b, -42); s("sfx/glitch-1.mp3", T.c19, 0, { techo: -40, dur: 0.22, fin: 0.06 });
// P4: el toque en Llamar y el tono de llamada; la cabina: el motor por dentro, la rambla, el celular que vibra
toque(T.tap, -40); s("sfx/k-tono.wav", T.tap + 0.12, 0, { techo: -42, dur: 0.4, fin: 0.1 });
s("sfx/bsb-omnibus.wav", T.p4b - 0.03, 0, { desde: 4.0, dur: r2(T.p5 - T.p4b + 0.05), fi: 0.03, fin: 0.06, techo: -38, lp: 2600 });
s("sfx/gaviota.wav", T.p4b + 0.5, 0, { techo: -46, dur: 1.2, fin: 0.3 });
vibra(T.p4b, -38, 0.55); vibra(T.p4b + 0.75, -38, 0.55); s("sfx/k-tono.wav", T.p4b + 0.1, 0, { techo: -46, dur: 0.35, fin: 0.1, lp: 1800 });
// P5: Nico, el mate en el escritorio (golpe de madera) antes del remate
oficina(T.p5, T.p6a + 0.02, -46);
s("bgm/pizzicato-lleno.wav", T.p5, 0, { desde: 9.0, dur: r2(T.deja - T.p5 + 0.1), fi: 0.1, fin: 0.1, techo: -42 });
voz("n1", T.n1, -1); voz("r4", T.r4, -1); voz("n2", T.n2, -1);
s("sfx/madera-golpe.wav", T.deja + 0.18, 0, { techo: -40 });
voz("r5", T.r5, -1);
// P6a: la calle, los golpes en la persiana
calle(T.p6a, T.p6b, -45);
for (const g of T.golpes) s("sfx/k-metal-pesado-0.wav", g, 0, { techo: -38 });
s("sfx/k-chapa-pesada.wav", T.golpes[2] + 0.02, 0, { techo: -42, dur: 0.4, fin: 0.12 });
// P6b: el muelle a la tarde: el motor parado, el freno de aire, las puertas, las cajas, el papel; el celular que suena
motorIdle(T.p6b, T.p6i, -44);
s("sfx/k-neumatico-abre.wav", T.p6b + 0.02, 0, { techo: -40, vel: 0.85, lp: 3000 });
s("sfx/k-metal-pesado-2.wav", T.puertas + 0.12, 0, { techo: -42 });
for (let k = 0; k < 6; k++) cajaS(T.baja + 0.08 + k * 0.17, -42, (k % 2) + 1);
pop(T.rotViaje, -44); pop(T.rotHoras, -44);
s("sfx/papel-fuerte.mp3", T.fajo, 0, { techo: -40, dur: 0.5, fin: 0.12 });
s("sfx/papel.wav", T.p6i + 0.02, 0, { techo: -42, dur: 0.45, fin: 0.12 });
calle(T.p6b, P1 + 0.02, -48);
voz("r6", T.r6, -1); voz("u1", T.u1, -1); voz("r7", T.r7, -1); voz("u2", T.u2, -1);
ring(T.ring3, r2(P1 - T.ring3 - 0.02), -36); vibra(T.ring3, -42, 0.6);
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.06, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.06 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 1.25, 1.5]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato-lleno.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(T.c - P2 + 0.1), fi: 0.4, fin: 0.1, techo: -37 });
s("bgm/pizzicato-lleno.wav", T.c - 0.05, 0, { desde: 8.0, dur: r2(DUR - T.c + 0.05), fi: 0.1, fin: 0.6, techo: -38 });
rotiseria(P2, T.q2); oficina(P2, T.q1i);
noti(T.aviso1, -40); ding(T.aviso2, -41); pop(T.rotAviso, -44);
voz("g2", T.g2, -1);
cafeteria(T.q2, T.q3); noti(T.q2 + 0.1, -44);
voz("m2", T.m2, -1);
s("sfx/bsb-caja.wav", T.cajon, 0, { techo: -42, dur: 0.5, fin: 0.15 });
oficina(T.q3, T.q4, -46);
voz("n1", T.n1b, -1); voz("r4", T.r4b, -1); voz("n2", T.n2b, -1);
s("sfx/k-cloth_1.wav", T.gira, 0, { techo: -42 }); whoosh(T.q3m - 0.03, -46); ding(T.fila15 + 0.15, -42);
voz("r8", T.r8, -1);
// Q4: la calle, el motor del camión estacionado, la firma con el dedo, la foto, Entregado ✓; el ✓ al panel
calle(T.q4, T.q5, -45); motorIdle(T.q4, T.q4i, -48);
cajaS(T.q4 + 0.1, -42, 1);
voz("h2", T.h2, -1);
s("sfx/birome.wav", T.firma, 0, { desde: 0.4, techo: -42, dur: 0.6, fin: 0.12, hp: 1200 });
s("sfx/bsb-foto.wav", T.foto, 0, { techo: -40 });
voz("u3", T.u3, -1);
ding(T.entregado, -40); whoosh(T.vuela, -44); ding(T.vuela + 0.45, -42);
// Q5: el muelle a la tarde otra vez, el motor parado; C: Rubén a cámara
motorIdle(T.q5, DUR, -48); calle(T.q5, DUR, -48);
ding(T.q5i + 0.15, -42);
voz("r9", T.r9, -1); voz("u4", T.u4, -1);
s("sfx/cero.mp3", T.u4 + 0.05, 0, { vel: 0.6, techo: -38, extra: 6 });
whoosh(T.c - 0.08, -44);
voz("r10", T.r10, -1);
pop(T.palabra + 0.02, -40);
pop(T.cierre + 0.05, -44);
// pop suave en la entrada de cada burbuja (y de la segunda mitad de las líneas en dos tiempos)
for (const t of [T.g1, T.r1, T.m1, T.r2, T.h1, T.r3, T.n1, T.r4, T.n2, T.r5, T.r5 + CORTE.r5, T.r6, T.u1, T.r7, T.u2, T.g2 + CORTE.g2, T.m2, T.n1b, T.r4b, T.n2b, T.r8, T.r8 + CORTE.r8, T.h2, T.u3, T.r9 + CORTE.r9, T.u4]) pop(t - 0.04, -42);
// la cama se agacha bajo la voz
for (const x of S) if (x[0].startsWith("bgm/") && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + (x[3].dur ?? 99) + 0.5).map(([a, b]) => [a, b, 0.2])]; }
// los tramos SIN voz: la cama más abajo (k = HUECO_K) para que los efectos manden y los huecos queden ≤ -31 LUFS
const HUECO_K = Number(process.env.HUECO_K ?? 0.6);
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
// (r1) CAMA: la música, el patio y el ventilador suben CAMA dB sobre su techo (se oyen bajo la voz); los huecos sin voz se
// verifican con medir-sfx.py (≤ -31)
const CAMA = Number(process.env.CAMA ?? 11);
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
    if (o.voz) c += (o.suave ?? true) ? ",acompressor=threshold=-24dB:ratio=2:attack=8:release=150:makeup=2.5" : ",acompressor=threshold=-28dB:ratio=5:attack=3:release=100:makeup=4,alimiter=limit=0.34:attack=1.5:release=40:level=false";
    c += `,volume=${ganancia(x)}dB`;
    for (const [a0, b0, k, rr = 0.4] of o.duck || []) { if (!k) continue; const a = r2(a0 - ini), b = r2(b0 - ini); c += `,volume='1-${k}*clip((t-${a})/${rr},0,1)*clip((${b}-t)/${rr},0,1)':eval=frame`; }
    c += `,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)},apad=whole_dur=${dur}[a${i}]`;
    filtros.push(c);
  });
  filtros.push(`anullsrc=r=48000:cl=stereo,atrim=duration=${dur}[z]`);   // (r1) ancla: amix sin entrada en t = 0 daba silencio
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
    if (process.env.STEMS) { mezcla(S.filter((x) => !x[3].voz && esCama(x[0])), "assets/audio/stem-cama.wav", DUR); mezcla(S.filter((x) => !x[3].voz && !esCama(x[0])), "assets/audio/stem-sfx.wav", DUR); }
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
const IRIS_C = "540px 700px";   // el iris abre sobre Graciela (arriba de la pantalla partida)
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
      <div id="precarga">Distribuidoras</div><div id="precarga2">Fui al banco</div>
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
      // corte seco al cartel; la parte 2 entra por un iris que se abre desde el piso del depósito
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
