// Generador de escenas de reels/caso-ritz (correr desde la carpeta del reel, después de
// `node armar.mjs`; después de tocarlo: `node gen.mjs && node armar.mjs`).
// Estilo "resultaaquee" (copiado de caso-toyota): un objeto grande relleno por escena, que se
// transforma: almohada sobre la cama → se achica y es el ícono de la tarjeta PREFERENCIAS (el lápiz
// anota) → la tarjeta entra al SISTEMA y se reparte a tres hoteles → push-in al otro hotel → la
// habitación con la almohada lista → un empleado → toda la empresa → TU NEGOCIO → tu mejor
// vendedor con lo que sabe de cada cliente → no viene → CRM con los clientes → la ficha a la vista
// del equipo → videollamada.
// Ritz-Carlton se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: almohada, cama,
// hoteles y tarjetas genéricos con los colores de Scalerics. Fondo navy oscuro liso #0b1220.
// Los tiempos salen de las palabras: w(i) = segundo de la palabra i relativo a la escena.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const START = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
let T0 = 0;
const w = (i) => r2(Math.max(0, pal[i].start - T0));
const desde = (id) => { T0 = START[id]; };

const BG = "#0b1220", DK = "#0b1220", MID = "#2b4573", MID2 = "#355489", CR = "#efeee5", CRD = "#b9b7a8", G = "#5ce611", GL = "#9df26a", RED = "#c7655b";
const SOMBRA = "rgba(0,0,0,0.5)";

// ---------- piezas ----------
const tick = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${DK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const tickG = (cls, cx, cy, r = 30) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 22})"><circle cx="22" cy="22" r="22" fill="${G}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${DK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, ww, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${ww}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const AV_IN = (piel, ropa) => `<circle cx="70" cy="70" r="70" fill="${piel}"/><circle cx="70" cy="56" r="26" fill="${ropa}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${ropa}"/>`;
const avatarG = (cls, cx, cy, r, piel = CR, ropa = DK) => `<g class="${cls}"><g transform="translate(${cx - r} ${cy - r}) scale(${r / 70})">${AV_IN(piel, ropa)}</g></g>`;

// Mover y escalar con el atributo transform: el punto P del dibujo queda en T con escala s
const pl = (P, s, T) => JSON.stringify({ attr: { transform: `translate(${r2(T[0] - s * P[0])} ${r2(T[1] - s * P[1])}) scale(${s})` } });
const T0A = `transform="translate(0 0) scale(1)"`;

// La almohada (centro PC) y la cama, en coordenadas de pantalla
const PC = [540, 1000];
const ALMOHADA = `
  <clipPath id="almclip"><path d="M150 800 Q540 740 930 800 Q985 1010 930 1220 Q540 1282 150 1220 Q95 1010 150 800 Z"/></clipPath>
  <path d="M150 800 Q540 740 930 800 Q985 1010 930 1220 Q540 1282 150 1220 Q95 1010 150 800 Z" fill="${CR}" stroke="#ffffff" stroke-width="6"/>
  <path d="M112 1070 Q540 1140 968 1070 Q962 1150 930 1220 Q540 1282 150 1220 Q118 1150 112 1070 Z" fill="${CRD}" opacity="0.75" clip-path="url(#almclip)"/>
  <path d="M190 832 Q540 782 890 832 Q936 1010 890 1188 Q540 1240 190 1188 Q144 1010 190 832 Z" fill="none" stroke="${CRD}" stroke-width="7" stroke-dasharray="18 14" stroke-linecap="round"/>
  <ellipse cx="360" cy="868" rx="150" ry="34" fill="#ffffff" opacity="0.7" transform="rotate(-4 360 868)"/>
  <path d="M400 1000 Q540 1050 680 1000" fill="none" stroke="${CRD}" stroke-width="9" stroke-linecap="round"/>`;
const almG = (cls) => `<g class="${cls}" ${T0A}>${ALMOHADA}</g>`;
const CAMA = `
  <ellipse cx="540" cy="1340" rx="490" ry="26" fill="${SOMBRA}"/>
  <rect x="70" y="1090" width="940" height="240" rx="40" fill="${MID}" stroke="${CR}" stroke-width="8"/>
  <path d="M74 1190 H1006 V1290 Q1006 1326 970 1326 H110 Q74 1326 74 1290 Z" fill="${MID2}"/>
  <path d="M74 1190 H1006" stroke="${CR}" stroke-width="8"/>`;
const camaG = (cls) => `<g class="${cls}" ${T0A}>${CAMA}</g>`;

// La tarjeta PREFERENCIAS (centro CC): 740 x 660
const CC = [540, 970];
const FILAS_P = [["Almohada", "FIRME"], ["Cama", "GRANDE"], ["Mesa", "JUNTO A LA VENTANA"]];
const filaY = (k) => 790 + k * 165;
const icono = (k) => {
  const y = filaY(k) + 65;
  if (k === 0) return ""; // la almohada de verdad se achica hasta acá
  if (k === 1) return `<rect x="248" y="${y - 4}" width="64" height="24" rx="6" fill="${CR}"/><rect x="252" y="${y - 22}" width="24" height="16" rx="6" fill="${CR}"/><rect x="248" y="${y + 18}" width="8" height="12" fill="${CR}"/><rect x="304" y="${y + 18}" width="8" height="12" fill="${CR}"/>`;
  return `<ellipse cx="280" cy="${y - 12}" rx="34" ry="10" fill="${CR}"/><rect x="274" y="${y - 6}" width="12" height="34" fill="${CR}"/><rect x="258" y="${y + 24}" width="44" height="8" rx="4" fill="${CR}"/>`;
};
const TARJETA = `
  <rect x="190" y="660" width="740" height="660" rx="34" fill="${SOMBRA}"/>
  <rect x="170" y="640" width="740" height="660" rx="34" fill="${CR}"/>
  <path d="M170 752 V674 Q170 640 204 640 H876 Q910 640 910 674 V752 Z" fill="${G}"/>
  <text x="540" y="712" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="44" letter-spacing="6" fill="${DK}">PREFERENCIAS</text>
  ${FILAS_P.map(([a, b], k) => `<g class="fp fp${k}">
    <rect x="210" y="${filaY(k)}" width="660" height="130" rx="22" fill="rgba(11,18,32,0.07)"/>
    <circle cx="280" cy="${filaY(k) + 65}" r="48" fill="${DK}"/>${icono(k)}
    <text x="352" y="${filaY(k) + 58}" font-family="Lexend" font-weight="700" font-size="46" fill="${DK}">${a}</text>
    <g class="fv"><text x="352" y="${filaY(k) + 104}" font-family="IBM Plex Mono" font-weight="600" font-size="32" letter-spacing="2" fill="rgba(11,18,32,0.7)">${b}</text></g>
    ${tickG("ft", 826, filaY(k) + 65, 28)}
  </g>`).join("")}`;
const tarjG = (cls) => `<g class="${cls}" ${T0A}>${TARJETA}</g>`;
// la almohada achicada en el ícono de la primera fila
const ALM_ICON = { s: 0.088, T: [280, filaY(0) + 63] };

// lápiz con la punta en (0, 0), inclinado
const LAPIZ = `<g class="lapiz" transform="translate(900 700) rotate(140)">
  <rect x="-18" y="-200" width="36" height="34" rx="6" fill="${CRD}"/>
  <rect x="-18" y="-168" width="36" height="120" fill="${G}"/>
  <rect x="2" y="-168" width="16" height="120" fill="rgba(11,18,32,0.18)"/>
  <path d="M-18 -48 H18 L0 0 Z" fill="${CR}"/>
  <path d="M-6 -16 H6 L0 0 Z" fill="${DK}"/>
</g>`;

// El hotel, en grande: base al centro en HB, 520 x 640
const HB = [540, 1330];
const VENT = [];
for (let f = 0; f < 4; f++) for (let c = 0; c < 3; c++) VENT.push([330 + c * 155, 770 + f * 110, f, c]);
const WIN = [540, 918]; // la ventana del medio de la segunda fila
const HOTEL = `
  <ellipse cx="540" cy="1336" rx="320" ry="22" fill="${SOMBRA}"/>
  <rect x="280" y="690" width="520" height="640" rx="18" fill="${MID}" stroke="${CR}" stroke-width="8"/>
  <path d="M640 694 H782 Q796 694 796 708 V1312 Q796 1326 782 1326 H640 Z" fill="rgba(0,0,0,0.18)"/>
  <rect x="280" y="690" width="520" height="56" rx="18" fill="${G}"/>
  <rect x="284" y="728" width="512" height="18" fill="${G}"/>
  ${VENT.map(([x, y, f, c]) => `<rect class="${f === 1 && c === 1 ? "vt" : "v"}" x="${x}" y="${y}" width="110" height="76" rx="10" fill="${(f + c) % 3 === 0 ? CR : CRD}"/>`).join("")}
  <rect x="470" y="1210" width="140" height="120" rx="12" fill="${DK}" stroke="${CR}" stroke-width="7"/>
  <rect x="420" y="1186" width="240" height="26" rx="10" fill="${CR}"/>`;
const hotelG = (cls) => `<g class="${cls}" ${T0A}>${HOTEL}</g>`;

// valija
const VALIJA = `<g class="valija"><rect x="-70" y="-150" width="140" height="150" rx="20" fill="${G}" stroke="${CR}" stroke-width="7"/>
  <path d="M-32 -150 V-182 Q-32 -194 -20 -194 H20 Q32 -194 32 -182 V-150" fill="none" stroke="${CR}" stroke-width="10"/>
  <rect x="-70" y="-90" width="140" height="18" fill="rgba(11,18,32,0.25)"/>
  <circle cx="-42" cy="8" r="12" fill="${CR}"/><circle cx="42" cy="8" r="12" fill="${CR}"/></g>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 5px solid ${CR}; border-radius: 999px; background: ${DK}; font: 600 42px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${DK}; font-weight: 700; }
    ${P} .pill.cr { background: ${CR}; border-color: ${CR}; color: ${DK}; font-weight: 700; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .rot { position: absolute; font: 600 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .rot.g { color: ${G}; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: Math.max(0.12, DUR - t), ease: "power2.in" }, t);
`;

function escena(id, { css = "", html, js, sfx }) {
  const dur = ESC[id];
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELP}
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx));
}
const D = (id) => ESC[id];

// ================= s01 · gancho =================
desde("s01-gancho");
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 104px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .gr { font-size: 140px; line-height: 1.02; }
    P .tit .v { color: ${G}; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${camaG("cama")}${almG("alm")}
        <g class="zz"><text x="900" y="700" font-family="Lexend" font-weight="800" font-size="70" fill="${G}">z</text><text x="960" y="640" font-family="Lexend" font-weight="800" font-size="50" fill="${G}">z</text></g>
      </svg>
      <div class="tit"><div>¿Por qué el</div><div>Ritz-Carlton se</div><div>acuerda de tu</div><div class="gr v">almohada?</div></div>`,
  js: `
      // cuadro 0: el gancho entero, la cama y la almohada ya grandes
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".alm"), ${pl([540, 1240], 1, [540, 1240])}, { attr: { transform: "translate(0 22) scale(1 0.97)" }, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.2);
      tl.fromTo(q(".zz"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.4);
      // "almohada": la palabra y la almohada saltan
      tl.fromTo(qa(".tit .v"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, ${w(8)});
      tl.to(q(".alm"), { attr: { transform: "translate(-27 -60) scale(1.05)" }, duration: 0.22, ease: "sine.out", yoyo: true, repeat: 1 }, ${w(8)});
      const V = ${r2(D("s01-gancho") - 0.35)};
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, V);
      fuera(".zz", V, 0.2);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.2 }, { t: w(8), sfx: "click-soft", vol: 0.25 }],
});

// ================= s02 · porque alguien la anotó: el personal anota lo que prefiere =================
desde("s02-anota");
const lapizA = (x, y) => JSON.stringify({ attr: { transform: `translate(${x} ${y}) rotate(140)` } });
escena("s02-anota", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${camaG("cama")}
        ${tarjG("tj")}
        ${almG("alm")}
        ${LAPIZ}
      </svg>
      ${pill(1, 540, 1420, "El personal anota", "cr")}`,
  js: `
      // la cama se va, la almohada se achica y queda de ícono en la tarjeta que aparece
      tl.to(q(".cama"), { opacity: 0, y: 120, duration: 0.35, ease: "power2.in" }, 0);
      tl.fromTo(q(".tj"), { ...${pl(CC, 0.6, [540, 1000])}, opacity: 0 }, { ...${pl(CC, 1, CC)}, opacity: 1, duration: 0.5, ease: "back.out(1.3)" }, 0.1);
      tl.to(q(".alm"), { ...${pl(PC, ALM_ICON.s, ALM_ICON.T)}, duration: 0.55, ease: "power3.inOut" }, 0.05);
      gsap.set(qa(".fp1, .fp2"), { opacity: 0 });
      gsap.set(qa(".fp .fv, .fp .ft"), { opacity: 0 });
      // "anotó": el lápiz escribe la primera fila
      gsap.set(q(".lapiz"), { opacity: 0 });
      tl.fromTo(q(".lapiz"), { ...${lapizA(980, 760)}, opacity: 0 }, { ...${lapizA(360, filaY(0) + 100)}, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: false }, ${r2(w(12) - 0.25)});
      tl.to(q(".lapiz"), { ...${lapizA(500, filaY(0) + 104)}, duration: 0.35, ease: "none" }, ${r2(w(12) + 0.05)});
      tl.fromTo(q(".fp0 .fv"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, ${r2(w(12) + 0.05)});
      pop(".fp0 .ft", ${r2(w(12) + 0.4)}, 0.25, 0.3);
      // "el personal anota": pill
      pop(".n1", ${r2(w(14))});
      // "lo que prefiere cada huésped": las otras dos filas, el lápiz va bajando
      [1, 2].forEach((k, i) => {
        const t = ${r2(w(17))} + i * 0.45;
        tl.fromTo(q(".fp" + k), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.7)" }, t);
        tl.to(q(".fp" + k + " .fv"), { opacity: 1, duration: 0.25 }, t + 0.15);
        pop(".fp" + k + " .ft", t + 0.32, 0.22, 0.3);
      });
      tl.to(q(".lapiz"), { ...${lapizA(560, filaY(1) + 104)}, duration: 0.4, ease: "power1.inOut" }, ${r2(w(17))});
      tl.to(q(".lapiz"), { ...${lapizA(700, filaY(2) + 104)}, duration: 0.4, ease: "power1.inOut" }, ${r2(w(17) + 0.45)});
      tl.to(q(".lapiz"), { opacity: 0, x: 80, duration: 0.25 }, ${r2(D("s02-anota") - 0.3)});
      fuera(".n1", ${r2(D("s02-anota") - 0.25)}, 0.2);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(12) - 0.05), sfx: "typing", vol: 0.18, max: 0.5 }, { t: r2(w(12) + 0.4), sfx: "ping", vol: 0.18 }, { t: w(14), sfx: "pop", vol: 0.2 }, { t: r2(w(17) + 0.32), sfx: "click-soft", vol: 0.22 }, { t: r2(w(17) + 0.77), sfx: "click-soft", vol: 0.22 }],
});

// ================= s03 · y queda en el sistema de la cadena =================
desde("s03-sistema");
const CS = 0.6, CPOS = [540, 832]; // la tarjeta chica dentro del sistema
const HX = [200, 540, 880], HS = 0.36;
const hTop = r2(1330 - 640 * HS);
escena("s03-sistema", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="sis">
          <rect x="250" y="530" width="580" height="520" rx="36" fill="${MID}" stroke="${CR}" stroke-width="8"/>
          <path d="M250 604 V566 Q250 530 286 530 H794 Q830 530 830 566 V604 Z" fill="${DK}"/>
          <path d="M254 604 H826" stroke="${CR}" stroke-width="6"/>
          <text x="540" y="580" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="34" letter-spacing="5" fill="${G}">SISTEMA</text>
        </g>
        ${HX.map((x, k) => `<path class="ruta r${k}" d="M540 1050 C 540 1080, ${x} ${hTop - 60}, ${x} ${hTop - 6}" fill="none" stroke="${G}" stroke-width="8" stroke-linecap="round"/>`).join("")}
        ${HX.map((x, k) => `<circle class="pulso p${k}" cx="540" cy="1050" r="14" fill="${G}"/>`).join("")}
        ${HX.map((x, k) => hotelG("h" + k)).join("")}
        ${tarjG("tj")}
        ${almG("alm")}
      </svg>
      ${pill(1, 540, 1440, "Toda la cadena", "lleno")}`,
  js: `
      // la tarjeta se achica y entra al sistema
      tl.fromTo(q(".sis"), { opacity: 0, scale: 0.85, svgOrigin: "540 810" }, { opacity: 1, scale: 1, svgOrigin: "540 810", duration: 0.4, ease: "back.out(1.4)" }, 0.1);
      tl.fromTo(q(".tj"), ${pl(CC, 1, CC)}, { ...${pl(CC, CS, CPOS)}, duration: 0.5, ease: "power3.inOut" }, 0);
      // la almohada-ícono viaja con la tarjeta
      tl.fromTo(q(".alm"), ${pl(PC, ALM_ICON.s, ALM_ICON.T)}, { ...${pl(PC, r2(ALM_ICON.s * CS), [r2(CPOS[0] + CS * (ALM_ICON.T[0] - CC[0])), r2(CPOS[1] + CS * (ALM_ICON.T[1] - CC[1]))])}, duration: 0.5, ease: "power3.inOut" }, 0);
      // "sistema": aparecen los hoteles de la cadena
      const HI = ${JSON.stringify(HX.map((x) => JSON.parse(pl(HB, 0.1, [x, 1330]))))};
      const HF = ${JSON.stringify(HX.map((x) => JSON.parse(pl(HB, HS, [x, 1330]))))};
      HI.forEach((a, k) => tl.fromTo(q(".h" + k), { ...a, opacity: 0 }, { ...HF[k], opacity: 1, duration: 0.38, ease: "back.out(1.5)", immediateRender: false }, ${r2(w(25) + 0.05)} + k * 0.08));
      gsap.set(qa(".h0, .h1, .h2"), { opacity: 0 });
      // "cadena": las rutas y los pulsos llegan a cada hotel
      dibujar(".ruta", ${r2(w(27) - 0.15)}, 0.35);
      qa(".pulso").forEach((p, k) => {
        gsap.set(p, { opacity: 0 });
        tl.set(p, { opacity: 1 }, ${r2(w(27) + 0.1)});
        tl.to(p, { attr: { cx: ${JSON.stringify(HX)}[k], cy: ${hTop - 6} }, duration: 0.4, ease: "power1.in" }, ${r2(w(27) + 0.1)});
        tl.to(p, { opacity: 0, duration: 0.1 }, ${r2(w(27) + 0.5)});
      });
      qa(".h0 .vt, .h1 .vt, .h2 .vt").forEach((v, k) => tl.to(v, { attr: { fill: "${G}" }, duration: 0.15 }, ${r2(w(27) + 0.5)} + k * 0.05));
      pop(".n1", ${r2(w(28))});
      fuera(".n1", ${r2(D("s03-sistema") - 0.2)}, 0.18);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(25) + 0.05), sfx: "pop", vol: 0.2 }, { t: r2(w(27) + 0.1), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(27) + 0.5), sfx: "ping", vol: 0.22 }],
});

// ================= s04 · volvés, incluso a otro hotel, y ya lo saben =================
desde("s04-otro-hotel");
escena("s04-otro-hotel", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${hotelG("h0")}${hotelG("h1")}${hotelG("hx")}
        <g class="vl" ${T0A}><g transform="translate(160 1330)">${VALIJA}</g></g>
        <g class="cuarto">${camaG("cama")}${almG("alm")}
          <g class="mini" ${T0A}>${TARJETA}</g>
          ${tickG("ok", 860, 790, 56)}
        </g>
      </svg>
      ${pill(1, 540, 1460, "Otro hotel", "cr")}${pill(2, 540, 1460, "Ya lo saben", "lleno")}`,
  js: `
      const HPS = ${JSON.stringify(HX.map((x) => JSON.parse(pl(HB, HS, [x, 1330]))))};
      gsap.set(q(".h0"), HPS[0]); gsap.set(q(".h1"), HPS[1]);
      qa(".vt").forEach((v) => gsap.set(v, { attr: { fill: "${G}" } }));
      // el hotel de la derecha pasa al frente, grande
      tl.to(qa(".h0, .h1"), { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
      tl.fromTo(q(".hx"), HPS[2], { ...${pl(HB, 1, [600, 1330])}, duration: 0.55, ease: "power3.inOut" }, 0.05);
      qa(".hx .vt").forEach((v) => gsap.set(v, { attr: { fill: "${CRD}" } }));
      // "volvés": la valija llega a la puerta
      tl.fromTo(q(".vl"), { attr: { transform: "translate(-300 0) scale(1)" }, opacity: 0 }, { attr: { transform: "translate(0 0) scale(1)" }, opacity: 1, duration: 0.45, ease: "power3.out", immediateRender: false }, ${r2(Math.max(0.1, w(29) + 0.1))});
      gsap.set(q(".vl"), { opacity: 0 });
      // "otro hotel"
      pop(".n1", ${r2(w(32))});
      // "y ya lo saben": se prende una ventana y entramos a la habitación
      tl.to(q(".hx .vt"), { attr: { fill: "${G}" }, duration: 0.15 }, ${r2(w(34) - 0.35)});
      fuera(".n1, .vl", ${r2(w(34) - 0.2)}, 0.15);
      tl.to(q(".hx"), { ...${pl(WIN, 6, [540, 1000])}, opacity: 0, duration: 0.45, ease: "power3.in" }, ${r2(w(34) - 0.2)});
      tl.fromTo(q(".cuarto"), { opacity: 0, scale: 0.2, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, svgOrigin: "540 1000", duration: 0.45, ease: "power3.out" }, ${r2(w(34) + 0.05)});
      gsap.set(q(".mini"), JSON.parse('${pl(CC, 0.3, [300, 740])}'));
      gsap.set(qa(".mini .fv, .mini .ft"), { opacity: 1 });
      tl.fromTo(q(".mini"), { opacity: 0, rotation: -20, svgOrigin: "300 740" }, { opacity: 1, rotation: -6, svgOrigin: "300 740", duration: 0.35, ease: "back.out(1.7)" }, ${r2(w(36))});
      pop(".ok", ${r2(w(37))}, 0.3, 0.3);
      pop(".n2", ${r2(w(37) + 0.1)});
      fuera(".n2", ${r2(D("s04-otro-hotel") - 0.22)}, 0.18);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: r2(Math.max(0.1, w(29) + 0.1)), sfx: "whoosh-short", vol: 0.2 }, { t: w(32), sfx: "pop", vol: 0.2 }, { t: r2(w(34) - 0.2), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(37), sfx: "ping", vol: 0.24 }],
});

// ================= s05 · ojo: lo que sabe un empleado, lo sabe toda la empresa =================
desde("s05-empresa");
const GRID = [[220, 720], [540, 720], [860, 720], [220, 960], [860, 960], [220, 1200], [540, 1200], [860, 1200]];
const ROPA = [MID2, DK, MID2, DK, DK, MID2, DK, MID2];
const AC = [540, 960];
const badge = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})"><rect x="-30" y="-36" width="60" height="72" rx="10" fill="${CR}" stroke="${DK}" stroke-width="4"/><rect x="-30" y="-36" width="60" height="20" rx="8" fill="${G}"/><rect x="-18" y="-6" width="36" height="7" rx="3" fill="${CRD}"/><rect x="-18" y="10" width="26" height="7" rx="3" fill="${CRD}"/></g>`;
escena("s05-empresa", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${GRID.map(([x, y], k) => `<path class="ln l${k}" d="M${AC[0]} ${AC[1]} L${x} ${y}" stroke="${G}" stroke-width="7" stroke-linecap="round"/>`).join("")}
        ${GRID.map(([x, y], k) => `<g class="ot o${k}"><circle cx="${x}" cy="${y}" r="104" fill="${BG}"/>${avatarG("a", x, y, 96, CR, ROPA[k])}<g class="bd">${badge(x + 78, y - 70, 0.9)}</g></g>`).join("")}
        <g class="emp" ${T0A}><circle cx="540" cy="960" r="246" fill="${BG}"/>${avatarG("a", 540, 960, 230, CR, DK)}
          <g class="bd0">${badge(750, 760, 2.2)}</g></g>
      </svg>
      ${pill(1, 540, 1290, "Un empleado", "cr")}${pill(2, 540, 1440, "Toda la empresa", "lleno")}`,
  js: `
      // la habitación se vuelve un empleado con la tarjeta
      tl.fromTo(q(".emp"), { ...${pl(AC, 0.4, AC)}, opacity: 0 }, { ...${pl(AC, 1, AC)}, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, 0);
      pop(".bd0", 0.35, 0.3, 0.3);
      gsap.set(qa(".ot, .ln"), { opacity: 0 });
      // "un empleado"
      pop(".n1", ${r2(w(42) - 0.05)});
      // "lo sabe toda la empresa": se achica al centro y aparecen los demás con la misma tarjeta
      fuera(".n1", ${r2(w(44) - 0.15)}, 0.15);
      tl.to(q(".emp"), { ...${pl(AC, 0.42, AC)}, duration: 0.4, ease: "power3.inOut" }, ${r2(w(44) - 0.1)});
      dibujar(".ln", ${r2(w(45))}, 0.3);
      qa(".ot").forEach((o, k) => tl.fromTo(o, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, ${r2(w(45) + 0.15)} + k * 0.05));
      qa(".ot .bd").forEach((b, k) => tl.fromTo(b, { scale: 1 }, { scale: 1.25, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, ${r2(w(46) + 0.1)} + k * 0.04));
      pop(".n2", ${r2(w(46) + 0.05)});
      salida(${r2(D("s05-empresa") - 0.22)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(42) - 0.05), sfx: "pop", vol: 0.2 }, { t: w(45), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(45) + 0.2), sfx: "click-soft", vol: 0.2 }, { t: r2(w(45) + 0.45), sfx: "click-soft", vol: 0.2 }, { t: r2(w(46) + 0.05), sfx: "ping", vol: 0.24 }],
});

// ================= s06 · ¿y en tu negocio? tu mejor vendedor sabe qué le gusta a cada cliente =================
desde("s06-vendedor");
const VC = [540, 1040];
const TIENDA = `
  <ellipse cx="540" cy="1336" rx="420" ry="22" fill="${SOMBRA}"/>
  <rect x="170" y="790" width="740" height="540" rx="16" fill="${MID}" stroke="${CR}" stroke-width="8"/>
  <rect x="220" y="880" width="400" height="300" rx="14" fill="${MID2}" stroke="${CR}" stroke-width="7"/>
  <path d="M250 1000 L330 910 M290 1060 L420 920" stroke="rgba(239,238,229,0.35)" stroke-width="10" stroke-linecap="round"/>
  <rect x="680" y="900" width="180" height="430" rx="12" fill="${DK}" stroke="${CR}" stroke-width="7"/>
  <circle cx="835" cy="1120" r="10" fill="${G}"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<path d="M${150 + k * 97.5} 700 h97.5 v110 a48.75 48.75 0 0 1 -97.5 0 Z" fill="${k % 2 ? CR : G}"/>`).join("")}
  <rect x="250" y="590" width="580" height="96" rx="20" fill="${DK}" stroke="${CR}" stroke-width="7"/>
  <text x="540" y="653" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="42" letter-spacing="6" fill="${G}">TU NEGOCIO</text>`;
const BURB = [[290, 690, "Ana · talle M"], [780, 600, "Luis · sin azúcar"], [740, 1340, "Sofía · los viernes"]];
const VEND = `<g class="vend" ${T0A}><circle cx="${VC[0]}" cy="${VC[1]}" r="246" fill="${BG}"/><g class="vav">${avatarG("a", VC[0], VC[1], 230, CR, MID2)}</g>
  <g class="star"><g transform="translate(30 -2)"><circle cx="700" cy="860" r="56" fill="${G}" stroke="${BG}" stroke-width="8"/><path d="M700 828 L709 849 L732 851 L715 866 L720 889 L700 877 L680 889 L685 866 L668 851 L691 849 Z" fill="${DK}"/></g></g></g>`;
escena("s06-vendedor", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="tienda">${TIENDA}</g>
        ${VEND}
      </svg>
      ${pill(1, 540, 1360, "Tu mejor vendedor", "cr")}
      ${BURB.map(([x, y, t], k) => `<div class="pill bb b${k}" style="left:${x}px;top:${y}px">${t}</div>`).join("")}`,
  css: `
    P .bb { background: ${CR}; border-color: ${CR}; color: ${DK}; font-weight: 700; }`,
  js: `
      // "negocio": la tienda
      tl.fromTo(q(".tienda"), { opacity: 0, scale: 0.6, svgOrigin: "540 1330" }, { opacity: 1, scale: 1, svgOrigin: "540 1330", duration: 0.45, ease: "back.out(1.4)" }, 0.05);
      // "tu mejor vendedor": entramos por la puerta y aparece él
      tl.to(q(".tienda"), { scale: 2.6, svgOrigin: "770 1110", opacity: 0, duration: 0.45, ease: "power3.in" }, ${r2(w(53) - 0.1)});
      gsap.set(q(".vend"), { opacity: 0 });
      tl.fromTo(q(".vend"), { ...${pl(VC, 0.3, [770, 1110])}, opacity: 0 }, { ...${pl(VC, 1, VC)}, opacity: 1, duration: 0.45, ease: "back.out(1.3)", immediateRender: false }, ${r2(w(53) + 0.2)});
      tl.fromTo(q(".star"), { scale: 0, svgOrigin: "730 858" }, { scale: 1, svgOrigin: "730 858", duration: 0.35, ease: "back.out(2.5)" }, ${r2(w(54))});
      pop(".n1", ${r2(w(55))});
      // "qué le gusta a cada cliente": lo que sabe de cada uno
      fuera(".n1", ${r2(w(58) - 0.1)}, 0.15);
      qa(".bb").forEach((b, k) => pop(b, ${r2(w(58))} + k * 0.28, 0.32, 0.5));
      qa(".bb").forEach((b, k) => tl.to(b, { y: -10, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(58) + 0.4)} + k * 0.2));`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.2 }, { t: r2(w(53) - 0.1), sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(54), sfx: "sparkle", vol: 0.18, max: 0.6 }, { t: w(58), sfx: "pop", vol: 0.2 }, { t: r2(w(58) + 0.28), sfx: "pop", vol: 0.2 }, { t: r2(w(58) + 0.56), sfx: "pop", vol: 0.2 }],
});

// ================= s07 · ¿y si mañana no viene? =================
desde("s07-no-viene");
escena("s07-no-viene", {
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <circle class="hueco" cx="${VC[0]}" cy="${VC[1]}" r="230" fill="rgba(199,101,91,0.1)" stroke="${RED}" stroke-width="8" stroke-dasharray="26 18"/>
        ${VEND}
        <g class="cal">
          <rect x="110" y="1130" width="230" height="230" rx="26" fill="${CR}"/>
          <path d="M110 1210 V1156 Q110 1130 136 1130 H314 Q340 1130 340 1156 V1210 Z" fill="${RED}"/>
          <rect x="150" y="1110" width="18" height="46" rx="9" fill="${DK}"/><rect x="282" y="1110" width="18" height="46" rx="9" fill="${DK}"/>
          <text x="225" y="1190" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" letter-spacing="2" fill="#fff">MAÑANA</text>
          <path d="M175 1245 L275 1325 M275 1245 L175 1325" stroke="${RED}" stroke-width="14" stroke-linecap="round"/>
        </g>
      </svg>
      ${BURB.map(([x, y, t], k) => `<div class="pill bb b${k}" style="left:${x}px;top:${y}px">${t}</div>`).join("")}
      ${pill(1, 540, 1460, "No viene", "r")}`,
  css: `
    P .bb { background: ${CR}; border-color: ${CR}; color: ${DK}; font-weight: 700; opacity: 1; }`,
  js: `
      gsap.set(q(".hueco"), { opacity: 0 });
      // "mañana": el calendario
      tl.fromTo(q(".cal"), { opacity: 0, scale: 0.4, rotation: -12, svgOrigin: "225 1245" }, { opacity: 1, scale: 1, rotation: -4, svgOrigin: "225 1245", duration: 0.35, ease: "back.out(2)" }, ${r2(w(65) - 0.1)});
      // "no viene": el vendedor se va y queda el hueco; lo que sabía se apaga y se cae
      tl.to(q(".vend"), { opacity: 0, duration: 0.3, ease: "power2.in" }, ${r2(w(66))});
      tl.to(q(".hueco"), { opacity: 1, duration: 0.2 }, ${r2(w(66) + 0.1)});
      pop(".n1", ${r2(w(67))});
      qa(".bb").forEach((b, k) => {
        tl.to(b, { backgroundColor: "#55606f", borderColor: "#55606f", color: "#2a3342", duration: 0.2 }, ${r2(w(66) + 0.05)} + k * 0.06);
        tl.to(b, { y: 520 - k * 60, rotation: k % 2 ? 14 : -12, opacity: 0, duration: 0.6, ease: "power2.in" }, ${r2(w(67) + 0.15)} + k * 0.08);
      });`,
  sfx: [{ t: r2(w(65) - 0.1), sfx: "pop", vol: 0.2 }, { t: w(66), sfx: "whoosh-short", vol: 0.2 }, { t: w(67), sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s08 · lo resolvemos con un CRM =================
desde("s08-crm");
const CLI = [["Ana", "TALLE M", MID2], ["Luis", "SIN AZÚCAR", G], ["Sofía", "LOS VIERNES", RED]];
const PANCSS = `
    P .pan { position: absolute; left: 90px; top: 620px; width: 900px; height: 700px; }
    P .pan-lado { position: absolute; left: 18px; top: 18px; width: 900px; height: 700px; border-radius: 50px; background: #a9a798; }
    P .pan-cuerpo { position: absolute; left: 0; top: 0; width: 900px; height: 700px; border-radius: 50px; background: ${CR}; overflow: hidden; }
    P .ban { position: absolute; left: 0; top: 0; width: 900px; height: 130px; background: ${DK}; }
    P .ban b { position: absolute; left: 56px; top: 34px; font: 800 62px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.01em; }
    P .ban span { position: absolute; right: 56px; top: 50px; font: 600 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${CR}; }`;
escena("s08-crm", {
  css: `${PANCSS}
    P .fila { position: absolute; left: 40px; width: 820px; height: 150px; border-radius: 28px; background: rgba(11,18,32,0.08); opacity: 0; }
    P .fila .av { position: absolute; left: 24px; top: 25px; width: 100px; height: 100px; border-radius: 50%; }
    P .fila .nm { position: absolute; left: 150px; top: 48px; font: 700 54px/1 "Lexend", sans-serif; color: ${DK}; }
    P .fila .ch { position: absolute; right: 26px; top: 44px; padding: 16px 22px; border-radius: 16px; background: ${G}; font: 600 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${DK}; opacity: 0; }`,
  html: `
      <div class="pan"><div class="pan-lado"></div><div class="pan-cuerpo">
        <div class="ban"><b>CRM</b><span>CLIENTES</span></div>
        ${CLI.map(([n, p, c], i) => `<div class="fila f${i}" style="top:${170 + i * 172}px"><svg class="av" viewBox="0 0 140 140" aria-hidden="true">${AV_IN(c, DK)}</svg><div class="nm">${n}</div><div class="ch">${p}</div></div>`).join("")}
      </div></div>`,
  js: `
      // "lo resolvemos": el panel entra
      tl.fromTo(q(".pan"), { opacity: 0, scale: 0.4, y: 120, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      // "CRM": el título salta y los clientes entran con lo que prefiere cada uno
      tl.fromTo(q(".ban b"), { scale: 1 }, { scale: 1.18, transformOrigin: "0% 50%", duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, ${r2(w(72))});
      qa(".fila").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.26, ease: "back.out(1.7)" }, 0.35 + i * 0.16));
      qa(".fila .ch").forEach((c, i) => pop(c, ${r2(w(72) + 0.15)} + i * 0.14, 0.25, 0.5));`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.35, sfx: "click-soft", vol: 0.2 }, { t: 0.67, sfx: "click-soft", vol: 0.2 }, { t: w(72), sfx: "ping", vol: 0.22 }],
});

// ================= s09 · cada cliente con su ficha, a la vista de todo el equipo =================
desde("s09-ficha");
const FICHA = [["Prefiere", "talle M"], ["Última compra", "campera"], ["Escribirle", "el viernes"]];
const EQ = [330, 540, 750];
escena("s09-ficha", {
  css: `${PANCSS}
    P .pan { top: 580px; height: 660px; }
    P .pan-lado, P .pan-cuerpo { height: 660px; }
    P .cab { position: absolute; left: 40px; top: 160px; width: 820px; height: 170px; }
    P .cab svg { position: absolute; left: 0; top: 0; width: 170px; height: 170px; }
    P .cab .nm { position: absolute; left: 200px; top: 34px; font: 800 66px/1 "Lexend", sans-serif; color: ${DK}; letter-spacing: -0.02em; }
    P .cab .sb2 { position: absolute; left: 202px; top: 114px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.6); }
    P .dato { position: absolute; left: 40px; width: 820px; height: 86px; border-radius: 22px; background: rgba(11,18,32,0.07); opacity: 0; }
    P .dato span { position: absolute; left: 28px; top: 26px; font: 600 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: rgba(11,18,32,0.65); }
    P .dato em { position: absolute; right: 28px; top: 20px; font: 800 44px/1 "Lexend", sans-serif; font-style: normal; color: ${DK}; }
    P .eq { position: absolute; top: 1300px; width: 140px; height: 140px; margin-left: -70px; opacity: 0; }
    P .eq .ojo { position: absolute; right: -14px; top: -14px; }`,
  html: `
      <div class="pan"><div class="pan-lado"></div><div class="pan-cuerpo">
        <div class="ban"><b>CRM</b><span>FICHA DEL CLIENTE</span></div>
        <div class="cab"><svg viewBox="0 0 140 140" aria-hidden="true">${AV_IN(MID2, DK)}</svg><div class="nm">Ana Méndez</div><div class="sb2">CLIENTA FRECUENTE</div></div>
        ${FICHA.map(([a, b], i) => `<div class="dato d${i}" style="top:${350 + i * 100}px"><span>${a.toUpperCase()}</span><em>${b}</em></div>`).join("")}
      </div></div>
      ${selbox("sb", 90 + 30, 580 + 150, 840, 190)}
      ${EQ.map((x, i) => `<div class="eq e${i}" style="left:${x}px"><svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">${AV_IN(CR, i === 1 ? MID2 : DK)}</svg><span class="ojo">${tick(26)}</span></div>`).join("")}
      ${pill(1, 540, 1505, "Todo el equipo", "lleno")}`,
  js: `
      // la lista se vuelve la ficha de Ana
      tl.fromTo(q(".pan"), { rotationY: -70, scale: 0.92, transformOrigin: "50% 50%", transformPerspective: 1400, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".cab"), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0.25);
      // "ficha": recuadro de selección y los datos
      caja(".sb", ${r2(w(77) - 0.05)});
      qa(".dato").forEach((d, i) => tl.fromTo(d, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.24, ease: "back.out(1.7)" }, ${r2(w(77) + 0.1)} + i * 0.16));
      fuera(".sb", ${r2(w(80) - 0.1)}, 0.15);
      // "a la vista de todo el equipo"
      qa(".eq").forEach((e, i) => tl.fromTo(e, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }, ${r2(w(80))} + i * 0.12));
      qa(".eq .ojo").forEach((o, i) => pop(o, ${r2(w(82) + 0.1)} + i * 0.1, 0.22, 0.3));
      pop(".n1", ${r2(w(84) + 0.05)});`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(77), sfx: "click-soft", vol: 0.26 }, { t: r2(w(77) + 0.3), sfx: "typing", vol: 0.14, max: 0.5 }, { t: w(80), sfx: "pop", vol: 0.2 }, { t: r2(w(82) + 0.1), sfx: "ping", vol: 0.22 }],
});

// ================= s10 · CTA =================
desde("s10-cta");
escena("s10-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 600px; width: 922px; height: 470px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 616px; width: 922px; height: 470px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: ${DK}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 390px; border-radius: 34px; background: ${MID}; overflow: hidden; }
    P .vc-a svg.av { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${DK}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 266px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1130px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1272px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { top: 1460px; color: ${G}; font-size: 112px; }
    P .mini { position: absolute; left: 90px; top: 580px; width: 900px; height: 660px; border-radius: 50px; background: ${CR}; overflow: hidden; }
    P .mini b { position: absolute; left: 0; top: 0; width: 900px; height: 130px; background: ${DK}; }
    P .mini s { position: absolute; left: 40px; top: 160px; width: 170px; height: 170px; border-radius: 50%; background: ${MID2}; }
    P .mini i { position: absolute; left: 40px; width: 820px; height: 86px; border-radius: 22px; background: rgba(11,18,32,0.08); }`,
  html: `
      <div class="mini"><b></b><s></s><i style="top:350px"></i><i style="top:450px"></i><i style="top:550px"></i></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg class="av" width="160" height="160" viewBox="0 0 140 140" aria-hidden="true">${AV_IN(CR, DK)}</svg><div class="lbl">TU NEGOCIO</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${DK}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${DK}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      // "¿lo vemos con tus clientes?": la ficha se vuelve la pantalla de la videollamada
      tl.to(q(".mini"), { scale: 0.7, y: -100, transformOrigin: "50% 50%", duration: 0.5, ease: "power3.inOut" }, 0.05);
      tl.to(q(".mini"), { opacity: 0, duration: 0.15 }, 0.3);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }, 0.45);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.6);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(92) - 0.05)});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${r2(w(93) - 0.1)});
      caja(".sb", ${r2(w(93) + 0.1)});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${r2(w(95) - 0.1)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, ${r2(w(95) + 0.4)});
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${r2(w(95) + 0.4)});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.6, sfx: "pop", vol: 0.22 }, { t: r2(w(92) - 0.05), sfx: "whoosh-short", vol: 0.2 }, { t: r2(w(93) + 0.1), sfx: "click-soft", vol: 0.28 }, { t: r2(w(95) - 0.1), sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
