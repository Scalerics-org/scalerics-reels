// Genera todo trabajar-con-scalerics desde un solo lugar (correr desde la carpeta del reel): `node gen.mjs`
//   - assets/tiempos3d.js: beats (T), duración, líneas de voz con su envolvente (bocas) y planos
//   - compositions/*.html: la capa plana (gancho, cabecera de cada paso, rótulos, subtítulos, tarjeta de cierre)
//   - index.html: fondo + canvas 3D + escenas + una sola pista de audio premezclada
//   - assets/audio/mezcla.wav: ambiente, música, SFX y voces mezclados con ffmpeg (SONIDO abajo)
// Variables: MEDIR=1 saca stems voz/resto; LIMPIO=1 arma el index sin capa plana ni logo (fondo de la portada).
// El fijado del perfil: "¿Cómo es trabajar con Scalerics?" contado por Rubén (el almacenero de abren-hoy),
// los 4 pasos reales de scalerics.com, narrador Orus + líneas de Rubén (Algenib) y Sofi de Scalerics (Achernar).
import fs from "node:fs";
import { execSync, execFileSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());

// ================= LAS VOCES (inicio de cada línea en el reel) =================
// [id del archivo assets/voice/vNN.wav, quién, inicio]
// Se encadenan: cada línea arranca `gap` s después de que termina la anterior (las pausas con acción visual, más largas)
const ORDEN = [
  ["01", "orus", 0.25],   // ¿Cómo es trabajar con Scalerics? Te lo cuenta Rubén.
  ["02", "ruben", 0.1],   // Yo hacía todo a mano: los pedidos, el stock, los mensajes…
  ["05", "orus", 0.08],   // Webs, tiendas online, sistemas a medida, agentes de IA, automatizaciones: lo que tu negocio precise.
  ["03", "orus", 0.15],   // Uno: una reunión gratis de treinta minutos, online o presencial.
  ["04r", "ruben", 0.2],  // Quiero vender online, saber qué tengo en stock… y que los mensajes se contesten solos.
  ["04", "sofi", 0.15],   // Sin compromiso. Vemos qué te sirve a vos.
  ["06b", "orus", 0.15],  // Dos: en cuarenta y ocho horas, la propuesta, con precio fijo.
  ["07", "ruben", 0.4],   // ¿Fijo? ¿Fijo, fijo?
  ["08", "sofi", 0.12],   // Fijo.
  ["09b", "orus", 0.95],  // Tres: por etapas. Ves el avance y pedís cambios en cada una.  (antes: "Sin letra chica")
  ["10", "ruben", 0.15],  // ¿Y si saluda con un "buen día, vecino"?
  ["11", "sofi", 0.12],   // Hecho.
  ["12b", "orus", 0.6],   // Cuatro: lo publicamos, te capacitamos y seguimos con vos, con soporte incluido.
  ["13", "ruben", 0.1],   // Ahora el almacén anda solo.
  ["14", "orus", 0.12],   // ¿Querés ver cómo sería en tu negocio? Agendá una videollamada gratis en scalerics.com.
];
const LINEAS = [];
{
  let fin = 0;
  for (const [id, quien, gap] of ORDEN) {
    const t0 = r2(LINEAS.length ? fin + gap : gap);
    LINEAS.push([id, quien, t0]);
    fin = t0 + dur(`assets/voice/v${id}.wav`);
  }
}
const VOZ = {};
for (const [id, quien, t0] of LINEAS) {
  const f = `assets/voice/v${id}.wav`;
  const pal = JSON.parse(fs.readFileSync(`assets/voice/pal/${id}.json`, "utf8")).map((w) => ({ w: w.text, t: r2(t0 + w.start), f: r2(t0 + w.end) }));
  VOZ[id] = { id, quien, t0, d: r2(dur(f)), pal, f };
}
// tiempo absoluto de la palabra k de la línea id; fin de una línea
const P = (id, k) => VOZ[id].pal[k].t;
const FIN = (id) => r2(VOZ[id].t0 + VOZ[id].d);

// ================= LOS BEATS (segundos) =================
const paso1 = r2(VOZ["03"].t0 - 0.05), paso2 = r2(VOZ["06b"].t0 - 0.05), paso3 = r2(VOZ["09b"].t0 - 0.05), paso4 = r2(VOZ["12b"].t0 - 0.05);
const T = {
  // gancho: burbujas que se apilan, el celular que vibra; Rubén nombra lo que hacía a mano (etiquetas en cada cosa)
  burbujas: [0.0, 0.33, 0.66, 1.0, 1.33, 1.66],
  pedidos: P("02", 6), stock: P("02", 8), mensajes: P("02", 10), facepalm: r2(FIN("02") - 0.5),
  // el abanico: cinco objetos, uno por servicio
  abanico: r2(VOZ["05"].t0 - 0.05), servicios: [P("05", 0), P("05", 1), P("05", 3), P("05", 6), P("05", 9)], precise: P("05", 10),
  // paso 1
  paso1, abreNotebook: [r2(paso1 + 0.25), r2(paso1 + 0.75)], conecta: r2(paso1 + 0.9), min30: P("03", 5), online: P("03", 7),
  sofiSaluda: [r2(paso1 + 1.8), r2(paso1 + 2.9)], necesidades: [P("04r", 1), P("04r", 3), P("04r", 8)],
  sinComp: P("04", 0), vemos: P("04", 2),
  // paso 2
  paso2, reloj: P("06b", 1), doc: P("06b", 7), alcance: r2(P("06b", 7) + 0.45), plazo: r2(P("06b", 7) + 0.75), precio: P("06b", 9),
  sello: r2(FIN("06b") + 0.06), fijo1: P("07", 0), fijo2: P("07", 1), sofiFijo: P("08", 0), lupa: [r2(FIN("08") + 0.08), paso3], letraChica: r2(FIN("08") + 0.08),
  // paso 3: tres piezas que se arman (tienda, stock, agente); Rubén pide el cambio en una burbuja
  paso3, etapa1: P("09b", 2), etapa2: P("09b", 5), etapa3: P("09b", 8), pide: VOZ["10"].t0,
  hecho: P("11", 0), cambio: r2(P("11", 0) + 0.45),
  // paso 4: todo andando junto
  paso4, publica: P("12b", 2), ensena: P("12b", 4), seguimos: P("12b", 6), soporte: P("12b", 10),
  pedido: r2(P("12b", 6) + 0.3), baja: r2(P("12b", 6) + 0.8), m1: r2(P("12b", 6) - 0.02), escribe: r2(P("12b", 6) + 0.12), m2: r2(P("12b", 6) + 0.55),
  agarra: r2(VOZ["13"].t0 - 0.1),
  anda: P("13", 2), sorbo: [r2(FIN("13") + 0.05), r2(FIN("13") + 0.4)],
  // cierre
  pregunta: P("14", 0), salud: r2(VOZ["14"].t0 + 1.0), tarjeta: P("14", 9),
};
const DUR = r2(T.tarjeta + 3.0);
// planos: [desde, nombre] (los usa tres.js; los cortes caen en el principio de frase o en una acción)
const PLANOS = [
  [0, "caos"], [2.9, "caosCerca"], [T.abanico, "abanico"],
  [T.paso1, "general1"], [r2(T.paso1 + 1.7), "hombro"], [r2(VOZ["04r"].t0 - 0.12), "rubenCuenta"], [r2(VOZ["04"].t0 - 0.1), "sofi"],
  [T.paso2, "reloj"], [r2(T.doc - 0.15), "doc"], [r2(T.fijo1 - 0.12), "fijo"], [r2(T.sofiFijo - 0.08), "sofi2"],
  [T.paso3, "pantallas"], [r2(T.pide - 0.12), "pide"], [r2(T.hecho - 0.12), "sofi3"], [r2(T.cambio - 0.15), "cambio"],
  [T.paso4, "publica"], [r2(T.ensena - 0.1), "ensena"], [r2(T.seguimos - 0.08), "junto"], [r2(VOZ["13"].t0 - 0.12), "mate"],
  [r2(T.tarjeta - 0.05), "fin"],
];

// ---------- envolvente de cada voz a 30 cuadros por segundo (bocas) ----------
function envolvente(f) {
  const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", f, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 });
  const env = [];
  for (let i = 0; (i * 8000) / 30 < pcm.length / 2; i++) {
    let s = 0, c = 0;
    for (let j = Math.floor((i * 8000) / 30); j < Math.min(pcm.length / 2, Math.floor(((i + 1) * 8000) / 30)); j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; c++; }
    env.push(Math.sqrt(s / Math.max(1, c)));
  }
  const mx = Math.max(...env);
  return env.map((v) => r2(Math.pow(v / mx, 0.8)));
}
const BOCAS = LINEAS.filter(([, q]) => q !== "orus").map(([id, quien, t0]) => ({ quien, t0, env: envolvente(VOZ[id].f) }));
fs.writeFileSync("assets/tiempos3d.js", `// lo genera gen.mjs\nexport const DUR = ${DUR};\nexport const T = ${JSON.stringify(T)};\nexport const PLANOS = ${JSON.stringify(PLANOS)};\nexport const BOCAS = ${JSON.stringify(BOCAS)};\n`);

// ================= CAPA PLANA (HTML) =================
const NAVY = "#0b1220", CR = "#efeee5", G = "#5ce611";
const BASE = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
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
const ESC = [];

// recuadro verde de "selección" (el de la marca) alrededor de una palabra
const CAJA = `<b class="caja"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></b>`;
const CAJA_CSS = `
    P .caja { position: absolute; left: -14px; right: -14px; top: 2px; bottom: -2px; border: 5px solid ${G}; background: rgba(11,18,32,0.55); }
    P .caja i { position: absolute; width: 16px; height: 16px; background: #fff; border: 4px solid ${G}; }
    P .caja .c1 { left: -11px; top: -11px; } P .caja .c2 { right: -11px; top: -11px; } P .caja .c3 { left: -11px; bottom: -11px; } P .caja .c4 { right: -11px; bottom: -11px; }`;

// s01 · el gancho: ya entero en el cuadro 0 (la portada en movimiento)
{
  const id = "s01-gancho", ini = 0, dur = 3.15;
  ESC.push([id, ini, dur]);
  escena(id, dur, {
    css: `
    P .gancho { position: absolute; left: 50px; right: 50px; top: 196px; text-align: center; }
    P .l1 { font: 900 112px/1.02 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; display: inline-block; background: ${NAVY}; padding: 20px 36px 30px; border-radius: 40px; box-shadow: 0 10px 0 rgba(3,6,12,0.45); }
    P .l1 .g { color: ${G}; }
    P .chip { display: inline-flex; align-items: center; gap: 16px; margin-top: 30px; padding: 16px 30px 18px; border-radius: 999px; background: ${CR}; color: ${NAVY}; font: 800 50px/1 "Lexend", sans-serif; letter-spacing: -0.01em; box-shadow: 0 8px 0 rgba(3,6,12,0.45); }
    P .chip i { width: 22px; height: 22px; border-radius: 50%; background: ${G}; border: 4px solid ${NAVY}; }`,
    html: `      <div class="gancho"><div class="l1">¿Cómo es trabajar con <span class="g">Scalerics</span>?</div><div class="chip"><i></i>Te lo cuenta Rubén</div></div>`,
    js: `      tl.fromTo(q(".l1"), { scale: 1 }, { scale: 1.03, duration: 1.4, ease: "sine.inOut", immediateRender: true }, 0);
      tl.fromTo(q(".chip"), { y: 0, scale: 1 }, { scale: 1.07, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: true }, ${r2(P("01", 5) - 0.25)});
      tl.to(q(".gancho"), { y: -760, duration: 0.3, ease: "power2.in" }, ${r2(dur - 0.36)});`,
  });
}

// s02 · cabecera de cada paso (el número 3D va en tres.js; acá el título a su derecha y la barra de progreso)
const PASOS = [
  [T.paso1, "Reunión inicial gratis", T.paso2],
  [T.paso2, "Propuesta en 48 h", T.paso3],
  [T.paso3, "Desarrollo con revisiones", T.paso4],
  [T.paso4, "Entrega y soporte", T.tarjeta + 0.04],
];
{
  const id = "s02-pasos", ini = T.paso1, dur = r2(T.tarjeta + 0.06 - ini);
  ESC.push([id, ini, dur]);
  const html = PASOS.map(([a, tit], i) => `      <div class="cab c${i}"><div class="kicker">PASO ${i + 1} DE 4</div><div class="tit">${tit}</div><div class="barra">${[0, 1, 2, 3].map((k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div></div>`).join("\n");
  const js = PASOS.map(([a, , b], i) => {
    const t0 = r2(a - ini + 0.8), t1 = r2(b - ini - 0.08);
    return `      tl.set(q(".c${i}"), { opacity: 1 }, ${t0});
      tl.fromTo(q(".c${i}"), { x: 40 }, { x: 0, duration: 0.18, ease: "power3.out", immediateRender: true }, ${t0});
      tl.fromTo(q(".c${i} .barra i:nth-child(${i + 1})"), { scaleX: 0.2 }, { scaleX: 1, duration: 0.35, ease: "back.out(2)", transformOrigin: "0% 50%", immediateRender: true }, ${r2(t0 + 0.15)});
      tl.set(q(".c${i}"), { opacity: 0 }, ${t1});`;
  }).join("\n");
  escena(id, dur, {
    css: `
    P .cab { position: absolute; left: 330px; right: 50px; top: 172px; opacity: 0; }
    P .kicker { font: 600 38px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; text-shadow: 0 3px 0 rgba(3,6,12,0.8); }
    P .tit { margin-top: 12px; font: 800 60px/1.04 "Lexend", sans-serif; letter-spacing: -0.025em; color: #fff; text-shadow: 0 5px 0 rgba(3,6,12,0.7), 0 0 24px rgba(3,6,12,0.6); }
    P .barra { display: flex; gap: 10px; margin-top: 18px; }
    P .barra i { display: block; width: 74px; height: 12px; border-radius: 6px; background: rgba(239,238,229,0.35); box-shadow: 0 3px 0 rgba(3,6,12,0.5); }
    P .barra i.on { background: ${G}; }`,
    html,
    js,
  });
}

// s03 · rótulos (chips con línea guía): lo que se dice, escrito, para verlo sin sonido
const ROTULOS = [
  // [inicio, fin, texto, x, y, ícono]
  [T.min30 - 0.05, r2(VOZ["04r"].t0 - 0.2), "30 min · gratis", 60, 455, "reloj"],
  [T.online - 0.05, r2(VOZ["04r"].t0 - 0.2), "online o presencial", 60, 570, "pin"],
  [T.letraChica, r2(T.paso3 - 0.3), "Sin letra chica", 0, 1405, "lupa"],
];
{
  const id = "s03-rotulos", ini = 0, dur = r2(T.tarjeta);
  ESC.push([id, ini, dur]);
  const ico = {
    reloj: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="${NAVY}" stroke-width="5"/><path d="M20 11 V20 L27 24" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/></svg>`,
    pin: `<svg viewBox="0 0 40 40"><path d="M20 36 C 10 24, 8 19, 8 15 A12 12 0 0 1 32 15 C 32 19, 30 24, 20 36 Z" fill="${NAVY}"/><circle cx="20" cy="15" r="5" fill="${G}"/></svg>`,
    ok: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="${NAVY}"/><path d="M11 20 L18 27 L30 13" fill="none" stroke="${G}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    lupa: `<svg viewBox="0 0 40 40"><circle cx="17" cy="17" r="11" fill="none" stroke="${NAVY}" stroke-width="5"/><path d="M25 25 L35 35" stroke="${NAVY}" stroke-width="6" stroke-linecap="round"/></svg>`,
  };
  const html = ROTULOS.map(([, , txt, x, y, ic], i) => `      <div class="rot r${i}" style="top:${y}px;${x ? `left:${x}px` : "left:50%;transform:translateX(-50%)"}"><span class="in"><span class="ico">${ico[ic]}</span>${txt}</span></div>`).join("\n");
  const js = ROTULOS.map(([a, b], i) => `      tl.set(q(".r${i} .in"), { opacity: 1 }, ${r2(a)});
      tl.fromTo(q(".r${i} .in"), { scale: 0.01, y: 30 }, { scale: 1, y: 0, duration: 0.32, ease: "back.out(2.2)", immediateRender: true }, ${r2(a)});
      tl.to(q(".r${i} .in"), { scale: 0.01, duration: 0.16, ease: "power2.in" }, ${r2(b - 0.16)});
      tl.set(q(".r${i} .in"), { opacity: 0 }, ${r2(b)});`).join("\n");
  escena(id, dur, {
    css: `
    P .rot { position: absolute; white-space: nowrap; }
    P .rot .in { opacity: 0; }
    P .in { display: inline-flex; align-items: center; gap: 16px; padding: 18px 32px 20px 22px; border-radius: 22px; background: ${G}; color: ${NAVY}; font: 800 54px/1 "Lexend", sans-serif; letter-spacing: -0.02em; border: 5px solid ${NAVY}; box-shadow: 0 9px 0 rgba(3,6,12,0.55); opacity: 0; }
    P .ico { width: 54px; height: 54px; display: inline-block; }
    P .ico svg { width: 54px; height: 54px; display: block; }`,
    html,
    js,
  });
}

// s04 · subtítulos: grupos cortos; el narrador en blanco, Rubén y Sofi con su nombre arriba
// (el gancho ya está escrito en grande, así que la línea 01 no lleva subtítulo)
const GRUPOS = [];
{
  const corta = { "02": [5, 11], "05": [3, 6, 9, 10, 15], "03": [1, 4, 7, 10], "04r": [3, 8, 15], "04": [2, 8], "06b": [1, 6, 8, 11], "07": [1, 3], "08": [1], "09b": [1, 3, 6, 12], "10": [5, 8], "11": [1], "12b": [1, 3, 5, 9, 12], "13": [5], "14": [4, 7, 10, 13] };
  const acento = new Set(["cuarenta", "ocho", "gratis", "treinta", "minutos,", "compromiso.", "vos.", "mano:", "pedidos,", "stock,", "mensajes…", "Webs,", "online,", "medida,", "IA,", "automatizaciones:", "precise.", "solo.", "stock…", "solos.", "capacitamos", "propuesta.", "fijo.", "¿Fijo?", "fijo?", "etapas.", "cambios", "vecino\"?", "Hecho.", "publicamos,", "usarlo", "soporte", "él.", "videollamada", "scalerics.com.", "Uno:", "Dos:", "Tres:", "Cuatro:"]);
  for (const [id, quien] of LINEAS) {
    if (id === "01") continue;
    const pal = VOZ[id].pal; let a = 0;
    for (const b of corta[id]) {
      const ws = pal.slice(a, b);
      const sig = pal[b] ? pal[b].t : VOZ[id].t0 + VOZ[id].d;
      // dentro de la misma línea el grupo queda hasta que entra el siguiente (sin huecos sin subtítulo)
      let fin = (pal[b] && sig - ws[ws.length - 1].f < 1.2 ? sig : Math.min(sig, ws[ws.length - 1].f + 0.5)) - 0.02;
      if (ws[0].t < T.sello && fin > T.sello) fin = T.sello - 0.02; // no pisa el sello de la propuesta
      if (id === "11") fin = Math.min(fin, T.cambio - 0.17); // el plano siguiente es la tablet: no la pisa
      const ini = Math.max(ws[0].t - 0.05, GRUPOS.length ? GRUPOS[GRUPOS.length - 1].fin + 0.02 : 0);
      if (GRUPOS.length) GRUPOS[GRUPOS.length - 1].fin = Math.min(GRUPOS[GRUPOS.length - 1].fin, ini - 0.02);
      GRUPOS.push({ quien, ws, ini, fin });
      a = b;
    }
  }
  // el último grupo (scalerics.com) lo dice la tarjeta: los subtítulos terminan cuando entra
  const id = "s04-subs", ini = 0, dur = r2(T.tarjeta);
  ESC.push([id, ini, dur]);
  const html = GRUPOS.map((g, i) => `      <div class="g g${i} ${g.quien}"><p>${g.ws.map((w, k) => `<span class="w${acento.has(w.w) ? " ac" : ""}" data-k="${k}">${acento.has(w.w) ? CAJA : ""}<em>${w.w.replace(/^"/, "«").replace(/"/, "»")}</em></span>`).join(" ")}</p></div>`).join("\n");
  const js = GRUPOS.map((g, i) => {
    const fin = Math.min(g.fin, T.tarjeta - 0.06);
    if (fin <= g.ini + 0.1) return "";
    return `      tl.set(q(".g${i}"), { opacity: 1 }, ${r2(g.ini)});
      tl.fromTo(q(".g${i} p"), { scale: 0.92 }, { scale: 1, duration: 0.12, ease: "power2.out", immediateRender: true }, ${r2(g.ini)});
${g.ws.map((w, k) => acento.has(w.w) ? `      tl.fromTo(q(".g${i} [data-k='${k}'] .caja"), { opacity: 0, scaleX: 1.25, scaleY: 1.4 }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, ${r2(Math.max(g.ini, w.t - 0.02))});` : "").join("\n")}
      tl.set(q(".g${i}"), { opacity: 0 }, ${r2(fin)});`;
  }).join("\n");
  escena(id, dur, {
    css: `
    P .g { position: absolute; left: 50px; right: 50px; top: 1395px; text-align: center; opacity: 0; }
    P p { display: inline; font: 700 66px/1.42 "Lexend", sans-serif; letter-spacing: -0.015em; color: #fff; background: ${NAVY}; padding: 8px 26px 12px; border-radius: 22px; box-decoration-break: clone; -webkit-box-decoration-break: clone; box-shadow: 0 8px 0 rgba(3,6,12,0.5); }
    P .ruben p { background: ${CR}; color: ${NAVY}; }
    P .sofi p { background: ${G}; color: ${NAVY}; }
    P .ruben .caja, P .sofi .caja { border-color: ${NAVY}; background: rgba(11,18,32,0.08); }
    P .ruben .caja i, P .sofi .caja i { border-color: ${NAVY}; }
    P .w { display: inline-block; position: relative; }
    P .w em { font-style: normal; position: relative; }
    P .w.ac { margin: 0 12px; }${CAJA_CSS}`,
    html,
    js,
  });
}

// s05 · la tarjeta de cierre (arranca sobre "videollamada")
{
  const id = "s05-cierre", ini = r2(T.tarjeta - 0.18), dur = r2(DUR - ini);
  ESC.push([id, ini, dur]);
  escena(id, dur, {
    css: `
    P .fondo { position: absolute; inset: 0; background: ${NAVY}; opacity: 0; }
    P .tarjeta { position: absolute; left: 60px; right: 60px; top: 470px; text-align: center; }
    P .a { font: 800 104px/1.02 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; }
    P .b { display: inline-block; margin-top: 46px; padding: 26px 52px 32px; border-radius: 30px; background: ${G}; color: ${NAVY}; font: 900 104px/1 "Lexend", sans-serif; letter-spacing: -0.035em; box-shadow: 0 12px 0 #3fa60a; }
    P .c { margin-top: 70px; font: 700 46px/1.25 "Lexend", sans-serif; color: ${CR}; }
    P .c b { color: ${G}; font-weight: 800; }
    P .d { margin-top: 56px; display: inline-flex; align-items: center; gap: 16px; font: 700 42px/1 "Lexend", sans-serif; color: ${CR}; padding: 16px 28px; border: 4px solid ${G}; border-radius: 18px; }
    P .d svg { width: 40px; height: 40px; }
    P .logo { display: block; margin: 64px auto 0; height: 58px; }`,
    html: `      <div class="fondo"></div>
      <div class="tarjeta"><div class="a">Videollamada<br>gratis</div><div class="b">scalerics.com</div>
      <div class="c">Ya trabajan con nosotros <b>+30 negocios</b><br>en Uruguay, Argentina y Chile</div>
      <div class="d"><svg viewBox="0 0 40 40"><path d="M16 24 L24 16 M13 19 L9 23 A6 6 0 0 0 17 31 L21 27 M19 13 L23 9 A6 6 0 0 1 31 17 L27 21" fill="none" stroke="${G}" stroke-width="4.5" stroke-linecap="round"/></svg>Link en el perfil</div>
      <img class="logo" src="assets/logo-blanco.png" alt="Scalerics" /></div>`,
    js: `      tl.set(q(".fondo"), { opacity: 1 }, 0.17);
      tl.fromTo(q(".a"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(1.8)", immediateRender: true }, 0.0);
      tl.fromTo(q(".b"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2.2)", immediateRender: true }, 0.15);
      tl.fromTo(q(".c"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.35);
      tl.fromTo(q(".d"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.5);
      tl.fromTo(q(".logo"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: true }, 0.6);
      tl.fromTo(q(".b"), { scale: 1 }, { scale: 1.05, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 1.9);`,
  });
}

// s06 · la interfaz de la videollamada (cuando el plano es la cámara de Sofi): nombre, duración, botones
const LLAMADAS = PLANOS.map(([a, n], i) => [a, PLANOS[i + 1]?.[0], n]).filter(([, , n]) => n.startsWith("sofi"));
{
  const id = "s06-llamada", ini = 0, dur = r2(T.tarjeta);
  ESC.push([id, ini, dur]);
  const html = LLAMADAS.map(([a, b], i) => `      <div class="ui u${i}"><div class="nombre"><i></i>Gonzalo · Scalerics<span class="rl">${["00:04", "12:31", "08:12", "05:40"][i] ?? "00:00"}</span></div><div class="botones"><span class="bt"><svg viewBox="0 0 40 40"><rect x="14" y="6" width="12" height="20" rx="6" fill="#efeee5"/><path d="M9 20 A11 11 0 0 0 31 20 M20 31 V35" fill="none" stroke="#efeee5" stroke-width="3.5" stroke-linecap="round"/></svg></span><span class="bt"><svg viewBox="0 0 40 40"><rect x="5" y="11" width="21" height="18" rx="4" fill="#efeee5"/><path d="M27 17 L36 12 V28 L27 23 Z" fill="#efeee5"/></svg></span><span class="bt rojo"><svg viewBox="0 0 40 40"><path d="M6 23 C 12 15, 28 15, 34 23 L30 27 L25 23 V20 C 22 19, 18 19, 15 20 V23 L10 27 Z" fill="#fff"/></svg></span></div></div>`).join("\n");
  const js = LLAMADAS.map(([a, b], i) => `      tl.set(q(".u${i}"), { opacity: 1 }, ${r2(a)});
      tl.fromTo(q(".u${i} .botones"), { y: 260 }, { y: 0, duration: 0.22, ease: "power2.out", immediateRender: true }, ${r2(a + 0.05)});
      tl.set(q(".u${i}"), { opacity: 0 }, ${r2(Math.min(b, ...[T.paso1, T.paso2, T.paso3, T.paso4, T.tarjeta].filter((p) => p - 0.25 > a).map((p) => p - 0.22)))});`).join("\n");
  escena(id, dur, {
    css: `
    P .ui { position: absolute; inset: 0; opacity: 0; }
    P .nombre { position: absolute; left: 50%; transform: translateX(-50%); top: 1512px; white-space: nowrap; display: inline-flex; align-items: center; gap: 14px; padding: 12px 22px 14px; border-radius: 16px; background: rgba(11,18,32,0.9); color: #fff; font: 700 36px/1 "Lexend", sans-serif; }
    P .nombre .rl { margin-left: 10px; color: ${CR}; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; opacity: 0.85; }
    P .nombre i { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }
    P .reloj { display: none; position: absolute; left: 50px; top: 520px; padding: 12px 20px; border-radius: 14px; background: rgba(11,18,32,0.82); color: ${CR}; font: 600 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; }
    P .botones { position: absolute; left: 0; right: 0; top: 1600px; display: flex; justify-content: center; gap: 30px; }
    P .bt { width: 104px; height: 104px; border-radius: 50%; background: rgba(22,36,61,0.92); border: 4px solid rgba(239,238,229,0.35); display: flex; align-items: center; justify-content: center; }
    P .bt svg { width: 52px; height: 52px; }
    P .bt.rojo { background: #c7655b; border-color: #c7655b; }`,
    html,
    js,
  });
}

// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s) }]
const SONIDO = [
  ["bgm/musica-larga.wav", 0, -15, { dur: DUR, fin: 0.6 }],
  ["sfx/calle.wav", 0, -6, { dur: T.abanico + 0.3, fin: 0.6 }],
  ...T.burbujas.map((t, i) => ["sfx/burbuja.mp3", t + 0.04, -8 - (i % 2) * 2]),
  ["sfx/vibra.wav", 0.4, -6, { dur: 0.6, fin: 0.08 }],
  ["sfx/vibra.wav", 1.75, -7, { dur: 0.6, fin: 0.08 }],
  ...[T.pedidos, T.stock, T.mensajes].map((t, i) => ["sfx/pop.mp3", t, -12 - i]),
  ["sfx/vibra.wav", T.mensajes + 0.1, -9, { dur: 0.5, fin: 0.08 }],
  // el abanico
  ["sfx/whoosh.mp3", T.abanico - 0.1, -14],
  ...T.servicios.map((t, i) => [i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", t + 0.02, -12]),
  ["sfx/chime.mp3", T.precise, -20, { dur: 0.6, fin: 0.3 }],
  // paso 1
  ["sfx/whoosh.mp3", T.paso1 - 0.12, -14],
  ["sfx/impact-bass-1.mp3", T.paso1 + 0.05, -26, { dur: 1.0, fin: 0.4 }],
  ["sfx/click-soft.mp3", T.abreNotebook[1], -6],
  ["sfx/chime.mp3", T.conecta, -14, { dur: 0.9, fin: 0.3 }],
  ["sfx/pop.mp3", T.min30, -13],
  ["sfx/pop.mp3", T.online, -14],
  ...T.necesidades.map((t) => ["sfx/burbuja.mp3", t + 0.03, -13]),
  ["sfx/pop.mp3", T.sinComp + 0.05, -14],
  ["sfx/whoosh-short.mp3", T.vemos - 0.12, -15],
  // paso 2
  ["sfx/whoosh.mp3", T.paso2 - 0.12, -14],
  ["sfx/impact-bass-2.mp3", T.paso2 + 0.05, -26, { dur: 1.0, fin: 0.4 }],
  ["sfx/tictac.wav", T.reloj, -15, { dur: 1.3, fin: 0.2 }],
  ["sfx/papel.wav", T.doc - 0.15, -4, { desde: 0.28, dur: 0.8, fin: 0.2 }],
  ["sfx/key-press.mp3", T.alcance, -5], ["sfx/pop.mp3", T.alcance + 0.03, -13],
  ["sfx/key-press.mp3", T.plazo, -5], ["sfx/pop.mp3", T.plazo + 0.03, -13],
  ["sfx/key-press.mp3", T.precio, -5], ["sfx/pop.mp3", T.precio + 0.03, -13],
  ["sfx/sello.wav", T.sello - 0.06, -9, { dur: 0.3, fin: 0.08 }],
  ["sfx/impact-bass-1.mp3", T.sello, -23, { dur: 0.45, fin: 0.2 }],
  // paso 3
  ["sfx/whoosh.mp3", T.paso3 - 0.12, -14],
  ["sfx/impact-bass-1.mp3", T.paso3 + 0.05, -26, { dur: 1.0, fin: 0.4 }],
  ...[T.etapa1, T.etapa2, T.etapa3].flatMap((t, i) => [["sfx/whoosh-short.mp3", t - 0.05, -17], [i % 2 ? "sfx/burbuja.mp3" : "sfx/pop.mp3", t + 0.25, -12]]),
  ["sfx/burbuja.mp3", T.pide + 0.03, -12],
  ["sfx/tipeo.mp3", T.hecho - 0.1, -7, { desde: 0.05, dur: 0.55, fin: 0.1 }],
  ["sfx/cero.mp3", T.cambio, -22],
  // paso 4
  ["sfx/whoosh.mp3", T.paso4 - 0.12, -14],
  ["sfx/impact-bass-2.mp3", T.paso4 + 0.05, -26, { dur: 1.0, fin: 0.4 }],
  ["sfx/whoosh-short.mp3", T.publica - 0.05, -12],
  ["sfx/respuesta.wav", T.publica + 0.45, -12],
  ["sfx/notification.mp3", T.pedido, -20, { dur: 0.8, fin: 0.3 }],
  ["sfx/key-press.mp3", T.baja, -7],
  ["sfx/vibra.wav", T.m1, -8, { dur: 0.45, fin: 0.08 }],
  ["sfx/respuesta.wav", T.m2, -10],
  ["sfx/whoosh-short.mp3", T.tarjeta - 0.15, -12],
  ["sfx/chime.mp3", T.tarjeta + 0.38, -20, { dur: 0.6, fin: 0.3 }],
  // voces
  ...LINEAS.map(([id, quien, t0]) => [`voice/v${id}.wav`, t0, quien === "orus" ? 0 : quien === "sofi" ? 0 : 0]),
];
fs.mkdirSync("assets/audio", { recursive: true });
const faltan = SONIDO.filter(([f]) => !fs.existsSync(`assets/${f}`)).map(([f]) => f);
if (faltan.length) { console.log("FALTAN sonidos:", faltan.join(", ")); }
const SON = SONIDO.filter(([f]) => fs.existsSync(`assets/${f}`));
// la música baja mientras habla alguien (ducking por tramos, con rampas de 0,15 s)
const habla = LINEAS.map(([id, , t0]) => [t0 - 0.05, t0 + VOZ[id].d + 0.05]);
function cadena(f, ini, db, o, i, extra = "") {
  let c = `[${i}:a]aresample=48000,aformat=channel_layouts=stereo`;
  if (o.desde || o.dur) c += `,atrim=start=${o.desde ?? 0}${o.dur ? `:duration=${o.dur}` : ""},asetpts=PTS-STARTPTS`;
  if (o.fin && o.dur) c += `,afade=t=out:st=${r2(o.dur - o.fin)}:d=${o.fin}`;
  if (f.startsWith("bgm/")) {
    // -5 dB bajo la voz: expresión de volumen por tiempo (el tiempo de la pista = el del reel, empieza en 0)
    const k = habla.map(([a, b]) => `clip((t-${r2(a - 0.15)})/0.15,0,1)*clip((${r2(b + 0.15)}-t)/0.15,0,1)`).join("+");
    c += `,volume='pow(10,(-4*min(1,${k}))/20)':eval=frame`;
  }
  c += `,volume=${db}dB,adelay=${Math.round(ini * 1000)}|${Math.round(ini * 1000)}${extra}[a${i}]`;
  return c;
}
{
  const args = ["-y", "-loglevel", "error"], filtros = [];
  SON.forEach(([f, ini, db, o = {}], i) => { args.push("-i", `assets/${f}`); filtros.push(cadena(f, ini, db, o, i)); });
  filtros.push(`${SON.map((_, i) => `[a${i}]`).join("")}amix=inputs=${SON.length}:normalize=0:dropout_transition=0,apad=whole_dur=${DUR},atrim=duration=${DUR},afade=t=out:st=${r2(DUR - 0.4)}:d=0.4[m]`);
  args.push("-filter_complex", filtros.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/mezcla-cruda.wav");
  execFileSync("ffmpeg", args);
  if (process.env.MEDIR) for (const [nombre, filtro] of [["voz", (f) => f.startsWith("voice/")], ["resto", (f) => !f.startsWith("voice/")]]) {
    const sel = SON.filter(([f]) => filtro(f));
    const a2 = ["-y", "-loglevel", "error"], f2 = [];
    sel.forEach(([f, ini, db, o = {}], k) => { a2.push("-i", `assets/${f}`); f2.push(cadena(f, ini, db, o, k, `,apad=whole_dur=${DUR}`).replace(/\[a(\d+)\]$/, `[a${k}]`)); });
    f2.push(`${sel.map((_, k) => `[a${k}]`).join("")}amix=inputs=${sel.length}:normalize=0:dropout_transition=0,atrim=duration=${DUR}[m]`);
    a2.push("-filter_complex", f2.join(";"), "-map", "[m]", "-ar", "48000", `assets/audio/stem-${nombre}.wav`);
    execFileSync("ffmpeg", a2);
  }
  // nivel: -14 LUFS con limitador: el loudnorm del paso 10 casi no toca nada y el AAC no clipea
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", "assets/audio/mezcla-cruda.wav", "-af", "loudnorm=I=-14:TP=-3:LRA=11,alimiter=limit=0.6:level=false", "-ar", "48000", "assets/audio/mezcla.wav"]);
}

// ================= INDEX =================
const LIMPIO = !!process.env.LIMPIO;
const hosts = (LIMPIO ? [] : ESC).map(([id, a, d], i) => `      <div id="el-${id}" class="scene" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${a}" data-duration="${d}" data-track-index="${2 + i}" data-track-kind="graphics"></div>`).join("\n");
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${NAVY}; }
      #fondo { position: absolute; inset: 0; background: #16243d; }
      #capa3d { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #tres { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; display: block; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
      #firma { position: absolute; left: 50%; top: 1790px; height: 36px; width: auto; transform: translateX(-50%); opacity: 0.8; z-index: 50; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
      <div id="capa3d" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"><canvas id="tres" width="1080" height="1920"></canvas></div>
${hosts}
${LIMPIO ? "" : `      <img id="firma" class="clip" src="assets/logo-blanco.png" alt="Scalerics" data-start="0" data-duration="${r2(T.paso1 - 0.1)}" data-track-index="9" />`}
      <audio id="mezcla" src="assets/audio/mezcla.wav" data-start="0" data-duration="${DUR}" data-track-index="30" data-volume="1"></audio>
    </div>
    <script>
      window.__hf = window.__hf || {};
      window.__limpio = ${LIMPIO};
      window.__portada = ${!!process.env.PORTADA};
      window.__sofitest = ${!!process.env.SOFITEST};
      window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["tres"] = new Promise((ok) => { window.__tresListo = ok; });
    </script>
    <script type="module" src="assets/tres.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.to("#fondo", { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
fs.writeFileSync("guion.txt", LINEAS.map(([id, q]) => `${q.toUpperCase()}: ${fs.readFileSync(`assets/voice/pal/${id}.txt`, "utf8").trim()}`).join("\n") + "\n");
console.log(`listo: ${ESC.length} escenas, ${SON.length} sonidos, ${DUR} s`);
console.log("T =", JSON.stringify(T));
