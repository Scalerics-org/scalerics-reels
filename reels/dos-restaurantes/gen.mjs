// Generador de escenas de reels/dos-restaurantes (correr desde la carpeta del reel, después de
// `node armar.mjs`; después volver a correr `node armar.mjs`). Serie "Dos negocios": pantalla
// partida con dibujos de líneas GRANDES (trazo 7 px), el de la izquierda en gris y rojo apagado, el
// de la derecha en verde de marca. Forma copiada de reels/por-que-la-tarjeta/gen.mjs.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 32.8;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#7c8698", GRIS2 = "#3a465c";
const ST = 7; // grosor de trazo

// ---------- piezas ----------
const tick = (r = 22, fondo = G, marca = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, kind = "") => `<div class="selbox ${kind} ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="11"/>`;
const chatIcon = (s = 40, c = NAVY) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 C10 4 4 10.5 4 18.5 C4 22.5 5.6 26 8.4 28.6 L6.5 36 L14.2 32.6 C16 33.2 18 33.5 20 33.5 C30 33.5 36 27 36 18.8 C36 10.5 30 4 20 4 Z" fill="none" stroke="${c}" stroke-width="4.5" stroke-linejoin="round"/></svg>`;
const pinIcon = (s = 36, c = G) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 36 36" aria-hidden="true"><path d="M18 33 C11 24 7 19 7 13.5 C7 7.4 12 3 18 3 C24 3 29 7.4 29 13.5 C29 19 25 24 18 33 Z" fill="${c}"/><circle cx="18" cy="13.5" r="4.6" fill="${NAVY}"/></svg>`;
const candado = `<svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true"><rect x="2" y="13" width="22" height="16" rx="4" fill="${G}"/><path d="M7 13 V9 C7 5.5 9.6 3 13 3 C16.4 3 19 5.5 19 9 V13" fill="none" stroke="${G}" stroke-width="4"/></svg>`;

// ---------- fachada de restaurante (svg, coordenadas de pantalla) ----------
// cx: centro; B: línea del piso; bien: con sitio (verde) o sin (gris)
const fachada = (cls, cx, B, nombre, bien) => {
  const c = bien ? CR : GRIS, acc = bien ? G : GRIS2, acc2 = bien ? CR : "#4a5468";
  const vid = bien ? "#1d3a24" : "#0f1828";
  let toldo = "";
  for (let i = 0; i < 6; i++) {
    const x = cx - 235 + i * (470 / 6), w = 470 / 6;
    toldo += `<path d="M${r2(x)} ${B - 556} h${r2(w)} v74 q${r2(-w / 2)} 30 ${r2(-w)} 0 z" fill="${i % 2 ? acc2 : acc}"/>`;
  }
  return `<g class="${cls}">
    <rect x="${cx - 215}" y="${B - 560}" width="430" height="560" fill="${NAVY2}" stroke="${c}" stroke-width="${ST}" stroke-linejoin="round"/>
    <rect x="${cx - 180}" y="${B - 706}" width="360" height="100" rx="16" fill="${bien ? CR : NAVY3}" stroke="${c}" stroke-width="${ST}"/>
    <text x="${cx}" y="${B - 638}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="52" fill="${bien ? NAVY : GRIS}" letter-spacing="1">${nombre}</text>
    <path d="M${cx - 120} ${B - 606} V${B - 586} M${cx + 120} ${B - 606} V${B - 586}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
    <rect x="${cx - 238}" y="${B - 590}" width="476" height="36" rx="8" fill="${NAVY3}" stroke="${c}" stroke-width="${ST}"/>
    <g>${toldo}</g>
    <path d="M${cx - 235} ${B - 556} H${cx + 235}" stroke="${c}" stroke-width="${ST}" stroke-linecap="round"/>
    <rect class="vid" x="${cx - 195}" y="${B - 420}" width="230" height="270" rx="10" fill="${vid}" stroke="${c}" stroke-width="${ST}"/>
    <path class="ln mesa" d="M${cx - 170} ${B - 222} H${cx + 10} M${cx - 80} ${B - 222} V${B - 160}" fill="none" stroke="${c}" stroke-width="${ST - 1}" stroke-linecap="round"/>
    <path class="ln sillas" d="M${cx - 178} ${B - 290} V${B - 160} M${cx - 178} ${B - 205} H${cx - 140} V${B - 160} M${cx + 18} ${B - 290} V${B - 160} M${cx + 18} ${B - 205} H${cx - 20} V${B - 160}" fill="none" stroke="${c}" stroke-width="${ST - 1}" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="ln cable" d="M${cx - 80} ${B - 420} V${B - 352}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
    <path class="lampara" d="M${cx - 112} ${B - 322} Q${cx - 80} ${B - 362} ${cx - 48} ${B - 322} Z" fill="${bien ? G : GRIS2}" stroke="${c}" stroke-width="5" stroke-linejoin="round"/>
    ${bien ? `<path class="luzv" d="M${cx - 112} ${B - 318} L${cx - 150} ${B - 228} H${cx - 10} L${cx - 48} ${B - 318} Z" fill="${G}" opacity="0.16"/>` : ""}
    <path class="ln vela" d="M${cx - 80} ${B - 222} V${B - 250}" stroke="${bien ? G : c}" stroke-width="6" stroke-linecap="round"/>
    <rect x="${cx + 70}" y="${B - 430}" width="128" height="430" rx="8" fill="${NAVY3}" stroke="${c}" stroke-width="${ST}"/>
    <rect x="${cx + 92}" y="${B - 400}" width="84" height="150" rx="6" fill="${vid}" stroke="${c}" stroke-width="5"/>
    <circle cx="${cx + 172}" cy="${B - 200}" r="9" fill="${c}"/>
  </g>`;
};
const PISO = (B) => `<path class="piso" d="M20 ${B} H1060" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round" opacity="0.5"/>`;
const DIV = (y1, y2) => `<path class="div" d="M540 ${y1} V${y2}" stroke="${CR}" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round" opacity="0.35"/>`;

// ---------- celular (div) ----------
const tel = (cls, x, y, w, h, pantalla) => `
<div class="telw ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="tel-lado"></div>
  <div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>
</div>`;
// pantalla del Fogón (sin sitio). Coordenadas dentro de la pantalla: 512 x 932.
const PAN_FOGON = `
  <div class="hora">21:04</div>
  <div class="foto mala"><div class="borr"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div></div>
  <div class="nom gris">El Fogón</div>
  <div class="sub">PARRILLA · ESQUINA</div>
  <div class="fila punt fcarta"><span class="f-t gris">Carta</span><span class="f-v gris">no disponible</span></div>
  <div class="fila fhor"><span class="f-t rojo">Cerrado</span><span class="f-v gris">cierra 15:00</span></div>
  <div class="btn gris">Llamar</div>`;
const PLATO_FOTO = `<svg class="pf" viewBox="0 0 464 260" aria-hidden="true">
  <ellipse cx="232" cy="140" rx="168" ry="98" fill="${CR}"/><ellipse cx="232" cy="140" rx="128" ry="72" fill="none" stroke="#c9c7b8" stroke-width="5"/>
  <path d="M168 122 C176 92 248 84 290 102 C322 116 314 160 278 170 C232 184 160 166 168 122 Z" fill="${NAVY3}"/>
  <path d="M196 112 L218 160 M232 104 L256 162 M268 104 L290 150" stroke="${CR}" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  <path d="M316 150 C326 132 346 130 352 142 C342 146 334 156 316 150 Z M330 160 C344 150 362 156 362 168 C350 168 340 170 330 160 Z" fill="${G}"/>
</svg>`;
const CARTA = (cls = "") => `
  <div class="carta ${cls}"><div class="c-tit">CARTA</div>
    <div class="c-f"><span>Asado de tira</span><b>$ 690</b></div>
    <div class="c-f"><span>Milanesa</span><b>$ 480</b></div>
    <div class="c-f"><span>Ensalada</span><b>$ 310</b></div></div>`;
const PAN_BRASA = `
  <div class="hora">21:05</div>
  <div class="foto buena">${PLATO_FOTO}</div>
  <div class="nom">La Brasa</div>
  <div class="abierto"><i></i>ABIERTO HASTA 00:00</div>
  ${CARTA("cb")}
  <div class="btn verde">${chatIcon(40)}<span>Reservar por WhatsApp</span></div>
  <div class="onda"></div>`;
const PAN_CHAT = `
  <div class="ch-head"><div class="ch-av">LB</div><div class="ch-nom">La Brasa</div><div class="ch-sub">en línea</div></div>
  <div class="bur yo">¿Mesa para dos a las 21:30?</div>
  <div class="bur ellos"><span>¡Listo! Los esperamos.</span>${tick(18)}</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 600 38px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 700; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 6; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .lado { position: absolute; top: 560px; width: 540px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; }
    ${P} .lado.izq { left: 0; color: ${RED}; } ${P} .lado.der { left: 540px; color: ${G}; }
    ${P} .telw { position: absolute; }
    ${P} .tel-lado { position: absolute; left: 16px; top: 16px; right: -16px; bottom: -16px; border-radius: 70px; background: #a9a798; }
    ${P} .tel { position: absolute; inset: 0; border-radius: 70px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 50%; top: 26px; width: 120px; height: 28px; margin-left: -60px; border-radius: 14px; background: ${CR}; }
    ${P} .hora { position: absolute; left: 40px; top: 22px; font: 500 28px/1 "IBM Plex Mono", monospace; color: rgba(239,238,229,0.7); }
    ${P} .foto { position: absolute; left: 24px; top: 70px; width: 464px; height: 260px; border-radius: 28px; overflow: hidden; }
    ${P} .foto.mala { background: #2a3448; }
    ${P} .borr { position: absolute; inset: 0; filter: blur(16px); }
    ${P} .borr i { position: absolute; border-radius: 50%; background: #56627a; }
    ${P} .borr .b1 { left: 60px; top: 60px; width: 200px; height: 150px; } ${P} .borr .b2 { left: 250px; top: 40px; width: 170px; height: 190px; background: #3c4760; } ${P} .borr .b3 { left: 150px; top: 150px; width: 160px; height: 90px; background: #6c7790; }
    ${P} .foto.buena { background: ${NAVY3}; }
    ${P} .pf { position: absolute; left: 0; top: 0; width: 464px; height: 260px; }
    ${P} .nom { position: absolute; left: 32px; top: 356px; font: 700 54px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .nom.gris { color: #aab2c0; }
    ${P} .sub { position: absolute; left: 34px; top: 428px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${GRIS}; }
    ${P} .fila { position: absolute; left: 24px; width: 464px; height: 128px; border-radius: 24px; background: ${NAVY2}; display: flex; flex-direction: column; justify-content: center; padding-left: 30px; gap: 12px; }
    ${P} .fila.punt { background: transparent; border: 6px dashed ${GRIS2}; }
    ${P} .fcarta { top: 486px; } ${P} .fhor { top: 638px; }
    ${P} .f-t { font: 700 38px/1 "Lexend", sans-serif; } ${P} .f-v { font: 500 28px/1 "IBM Plex Mono", monospace; }
    ${P} .gris { color: ${GRIS}; } ${P} .rojo { color: ${RED}; }
    ${P} .btn { position: absolute; left: 24px; top: 796px; width: 464px; height: 110px; border-radius: 55px; display: flex; align-items: center; justify-content: center; gap: 16px; font: 700 34px/1 "Lexend", sans-serif; }
    ${P} .btn.gris { border: 6px solid ${GRIS2}; color: ${GRIS}; }
    ${P} .btn.verde { background: ${G}; color: ${NAVY}; font-size: 31px; }
    ${P} .abierto { position: absolute; left: 34px; top: 428px; display: flex; align-items: center; gap: 12px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.02em; color: ${G}; }
    ${P} .abierto i { width: 18px; height: 18px; border-radius: 50%; background: ${G}; }
    ${P} .carta { position: absolute; left: 24px; top: 480px; width: 464px; height: 292px; border-radius: 24px; background: ${NAVY2}; padding: 24px 30px; }
    ${P} .c-tit { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: ${G}; margin-bottom: 18px; }
    ${P} .c-f { display: flex; justify-content: space-between; align-items: center; height: 70px; border-top: 4px solid rgba(239,238,229,0.12); font: 600 32px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .c-f b { font: 700 32px/1 "Lexend", sans-serif; color: ${G}; }
    ${P} .onda { position: absolute; left: 196px; top: 791px; width: 120px; height: 120px; border-radius: 50%; border: 8px solid ${CR}; opacity: 0; }
    ${P} .ch-head { position: absolute; left: 0; top: 0; width: 512px; height: 150px; background: ${NAVY2}; }
    ${P} .ch-av { position: absolute; left: 30px; top: 60px; width: 72px; height: 72px; border-radius: 50%; background: ${G}; font: 800 28px/72px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }
    ${P} .ch-nom { position: absolute; left: 122px; top: 66px; font: 700 36px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .ch-sub { position: absolute; left: 124px; top: 108px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${G}; }
    ${P} .bur { position: absolute; max-width: 400px; padding: 22px 28px; border-radius: 30px; font: 600 34px/1.25 "Lexend", sans-serif; }
    ${P} .bur.yo { right: 24px; top: 230px; background: ${CR}; color: ${NAVY}; border-bottom-right-radius: 8px; }
    ${P} .bur.ellos { left: 24px; top: 440px; background: ${NAVY3}; color: ${CR}; border-bottom-left-radius: 8px; display: flex; align-items: center; gap: 14px; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.3); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.18 : 0)); };
      const sinNota = (k, t) => fuera(qa(".n" + k + ", .l" + k + ", .d" + k), t, 0.2);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const toque = (s, t) => tl.fromTo(q(s), { opacity: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.9, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const temblor = (s, t) => tl.fromTo(q(s), { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
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

// ================= s01 · gancho (0-4.66) =================
// cuadro 0: el gancho entero en grande + las dos fachadas ya dibujadas
const B1 = 1440;
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font: 800 100px/1.04 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .tit .g2 { font-size: 124px; margin-top: 14px; }
    P .tit .v { color: ${G}; }
    P .marca { position: absolute; left: 810px; top: 650px; opacity: 0; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(760, B1)}${PISO(B1)}
        ${fachada("fzL", 270, B1, "EL FOGÓN", false)}
        ${fachada("fzR", 810, B1, "LA BRASA", true)}
      </svg>
      ${pill(1, 810, 1520, "La eligen", "lleno")}
      ${pill(2, 270, 1520, "Ni la miran", "r")}
      <div class="tit"><div>Dos restaurantes,</div><div>misma esquina.</div><div class="g2">A uno lo eligen</div><div class="g2 v">sin probarlo.</div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzL"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0.08);
      dibujar(".fzL .ln, .fzR .ln", 0.1, 0.5);
      dibujar(".div", 0.2, 0.6);
      // "A uno lo eligen": la de la derecha se enciende, la izquierda se apaga
      tl.fromTo(q(".fzR .luzv"), { opacity: 0.16 }, { opacity: 0.5, duration: 0.18, yoyo: true, repeat: 3, immediateRender: false }, 2.27);
      tl.to(q(".fzL"), { opacity: 0.45, duration: 0.4 }, 2.4);
      latido(".fzR", 2.95, 1.04);
      pop(".n1", 3.0);
      pop(".n2", 3.4);
      tl.fromTo(q(".tit .v"), { scale: 1 }, { scale: 1.07, transformOrigin: "50% 50%", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, 3.7);
      // sale el título; entran las etiquetas de lado
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.3, ease: "power2.in" }, 4.2);
      salida(4.36);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.27, sfx: "ping", vol: 0.25 }, { t: 3.0, sfx: "pop", vol: 0.28 }, { t: 3.4, sfx: "click-soft", vol: 0.25 }],
});

// ================= s02 · viernes (2.94) =================
const PAREJA = `
  <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
    <path class="ln sofa" d="M110 1500 V1250 Q110 1190 170 1190 H910 Q970 1190 970 1250 V1500 M60 1500 H1020 M150 1500 V1560 M930 1500 V1560 M110 1330 H970" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round" stroke-linejoin="round"/>
    <circle class="ln" cx="380" cy="930" r="96" fill="none" stroke="${CR}" stroke-width="${ST}"/>
    <path class="ln" d="M220 1330 Q220 1080 380 1070 Q520 1078 548 1210" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round"/>
    <path class="ln" d="M300 870 Q380 800 470 880" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round"/>
    <circle class="ln" cx="690" cy="950" r="90" fill="none" stroke="${CR}" stroke-width="${ST}"/>
    <path class="ln" d="M610 900 Q660 830 760 870 Q800 900 790 960" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round"/>
    <path class="ln" d="M860 1330 Q860 1090 690 1080 Q590 1084 560 1170" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round"/>
    <path class="ln" d="M420 1250 Q470 1210 500 1170 M760 1250 Q680 1220 600 1180" fill="none" stroke="${CR}" stroke-width="${ST}" stroke-linecap="round"/>
    <g class="cel"><path class="haz" d="M470 1010 L548 1110 L610 1110 L640 1010 Z" fill="${G}" opacity="0.18"/>
      <rect x="496" y="1100" width="96" height="160" rx="18" fill="${NAVY}" stroke="${CR}" stroke-width="${ST}" transform="rotate(-8 544 1180)"/>
      <rect x="512" y="1118" width="64" height="120" rx="8" fill="${G}" transform="rotate(-8 544 1180)"/></g>
  </svg>`;
escena("s02-viernes", {
  css: `
    P .dia { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font: 900 200px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .hs { position: absolute; left: 0; right: 0; top: 870px; text-align: center; font: 500 64px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${G}; }
    P .luna { position: absolute; left: 820px; top: 560px; width: 130px; height: 130px; }
    P .busca { position: absolute; left: 140px; top: 600px; width: 800px; height: 112px; border-radius: 56px; background: ${CR}; display: flex; align-items: center; gap: 22px; padding-left: 40px; font: 600 44px/1 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }
    P .busca .cur { width: 5px; height: 50px; background: ${NAVY}; }
    P .busca .lt { display: inline-block; }`,
  html: `
      <div class="pareja">${PAREJA}</div>
      <svg class="luna" viewBox="0 0 130 130" aria-hidden="true"><path d="M90 14 A56 56 0 1 0 116 92 A46 46 0 1 1 90 14 Z" fill="${CR}"/></svg>
      <div class="dia">VIERNES</div><div class="hs">21:00</div>
      <div class="busca"><svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true"><circle cx="19" cy="19" r="14" fill="none" stroke="${NAVY}" stroke-width="6"/><path d="M30 30 L42 42" stroke="${NAVY}" stroke-width="7" stroke-linecap="round"/></svg><span class="txt">${[..."¿Dónde cenamos?"].map((c) => `<span class="lt">${c === " " ? "&nbsp;" : c}</span>`).join("")}</span><i class="cur"></i></div>`,
  js: `
      gsap.set(qa(".pareja .ln, .pareja .cel"), { opacity: 0 });
      tl.fromTo(q(".dia"), { scale: 1.25, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".hs"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.2);
      tl.fromTo(q(".luna"), { opacity: 0, rotation: -40, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, rotation: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0.45);
      // "Una pareja": se va el día y se dibuja la pareja en el sillón
      tl.to(qa(".dia, .hs"), { opacity: 0, y: -80, duration: 0.25, ease: "power2.in" }, 1.1);
      dibujar(".pareja .ln", 1.2, 0.55);
      tl.fromTo(q(".pareja .cel"), { opacity: 0, scale: 0.6, svgOrigin: "544 1180" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 1.55);
      // "busca dónde cenar": la barra de búsqueda se tipea
      tl.to(q(".luna"), { opacity: 0, y: -40, duration: 0.2 }, 1.6);
      tl.fromTo(q(".busca"), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 1.74);
      qa(".busca .lt").forEach((el, i) => { gsap.set(el, { opacity: 0 }); tl.set(el, { opacity: 1 }, 1.9 + i * 0.045); });
      tl.fromTo(q(".busca .cur"), { opacity: 1 }, { opacity: 0, duration: 0.12, yoyo: true, repeat: 7, ease: "steps(1)", immediateRender: false }, 1.8);
      tl.fromTo(q(".pareja .haz"), { opacity: 0.18 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 2.0);
      salida(2.7);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.25, max: 0.8 }, { t: 1.2, sfx: "whoosh-short", vol: 0.16 }, { t: 1.9, sfx: "typing", vol: 0.22, max: 0.7 }],
});

// ================= s03 · izquierda (5.90) =================
// celular del Fogón a la izquierda (x 90-630, y 600-1560), notas rojas a la derecha
const TA = { x: 90, y: 600 }, PA = { x: TA.x + 14, y: TA.y + 14 };
escena("s03-izquierda", {
  css: `
    P .preg { position: absolute; left: 0; right: 0; text-align: center; opacity: 0; }
    P .preg span { display: inline-block; padding: 26px 50px 30px; border-radius: 60px; background: ${CR}; font: 800 92px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; box-shadow: 0 14px 0 rgba(3,6,12,0.5); }
    P .preg.p1 { top: 820px; } P .preg.p2 { top: 1080px; }
    P .ni { position: absolute; left: 0; right: 0; top: 1360px; text-align: center; font: 800 110px/1 "Lexend", sans-serif; color: ${RED}; opacity: 0; }
    P .tacha { stroke: ${RED}; stroke-width: 9; stroke-linecap: round; fill: none; }`,
  html: `
      <div class="lado izq" style="top:540px;left:0;width:720px">EL FOGÓN · SIN SITIO</div>
      ${tel("ta", TA.x, TA.y, 540, 960, PAN_FOGON)}
      ${selbox("sb1", PA.x + 16, PA.y + 478, 480, 144, "r")}
      ${selbox("sb3", PA.x + 16, PA.y + 62, 480, 276, "r")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${lead(1, 690, PA.y + 550, 520, PA.y + 550, "r")}
        ${lead(2, 690, PA.y + 702, 520, PA.y + 702, "r")}
        ${lead(3, 690, PA.y + 200, 520, PA.y + 200, "r")}
        <path class="tacha tx" d="M${PA.x + 270} ${PA.y + 722} L${PA.x + 470} ${PA.y + 722}"/>
      </svg>
      ${pill(1, 860, PA.y + 550, "Sin carta", "r")}
      ${pill(2, 860, PA.y + 702, "Horario viejo", "r")}
      ${pill(3, 860, PA.y + 200, "Foto borrosa", "r")}
      <div class="preg p1"><span>¿Abre hoy?</span></div>
      <div class="preg p2"><span>¿Cuánto sale?</span></div>
      <div class="ni">Ni idea.</div>`,
  js: `
      const T = q(".ta");
      gsap.set(qa(".lado"), { opacity: 0 });
      tl.fromTo(T, { x: -700, rotation: -6 }, { x: 0, rotation: 0, duration: 0.55, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.4);
      tl.fromTo(T, { scale: 1 }, { scale: 1.03, transformOrigin: "50% 50%", duration: 4, ease: "sine.inOut" }, 0.55);
      // sin carta
      caja(".sb1", 1.5); nota(1, 1.6);
      // horario viejo: "Cerrado" (son las 21 y está abierto) se tacha
      nota(2, 2.33); dibujar(".tx", 2.6, 0.25);
      temblor(".ta .fhor", 2.6);
      // foto borrosa: más borrosa
      caja(".sb3", 3.31); nota(3, 3.4);
      tl.fromTo(q(".ta .borr"), { filter: "blur(16px)" }, { filter: "blur(30px)", duration: 0.4, ease: "power2.out" }, 3.4);
      // ¿Abre hoy? ¿Cuánto sale?
      sinNota(1, 4.3); sinNota(2, 4.3); sinNota(3, 4.3);
      tl.to(qa(".sb1, .sb3, .tx"), { opacity: 0, duration: 0.2 }, 4.3);
      tl.to(T, { opacity: 0.3, duration: 0.3 }, 4.35);
      tl.fromTo(q(".p1"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -3, duration: 0.35, ease: "back.out(2)" }, 4.54);
      tl.fromTo(q(".p2"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 2, duration: 0.35, ease: "back.out(2)" }, 5.43);
      salida(5.66);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 1.6, sfx: "glitch-1", vol: 0.18, max: 0.4 }, { t: 2.6, sfx: "click", vol: 0.25 }, { t: 3.4, sfx: "glitch-1", vol: 0.18, max: 0.4 }, { t: 4.54, sfx: "pop", vol: 0.28 }, { t: 5.43, sfx: "pop", vol: 0.28 }],
});

// ================= s04 · derecha (4.32) =================
// celular de La Brasa a la derecha (x 450-990, y 600-1560), notas verdes a la izquierda
const TB = { x: 450, y: 600 }, PB = { x: TB.x + 14, y: TB.y + 14 };
escena("s04-derecha", {
  html: `
      <div class="lado der" style="top:540px;left:360px;width:720px">LA BRASA · CON SITIO</div>
      ${tel("tb", TB.x, TB.y, 540, 960, PAN_BRASA)}
      ${selbox("sbc", PB.x + 16, PB.y + 472, 480, 308)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${lead(1, 360, PB.y + 626, 520, PB.y + 626, "g")}
        ${lead(2, 360, PB.y + 441, 474, PB.y + 441, "g")}
        ${lead(3, 360, PB.y + 851, 520, PB.y + 851, "g")}
      </svg>
      ${pill(1, 210, PB.y + 626, "Carta y precios", "g")}
      ${pill(2, 210, PB.y + 441, "Abierto ahora", "g")}
      ${pill(3, 210, PB.y + 851, "Reservar", "lleno")}`,
  js: `
      const T = q(".tb");
      gsap.set(qa(".lado"), { opacity: 0 });
      gsap.set(qa(".tb .carta, .tb .abierto, .tb .btn"), { opacity: 0 });
      tl.fromTo(T, { x: 700, rotation: 6 }, { x: 0, rotation: 0, duration: 0.55, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.4);
      // carta con precios
      pop(".tb .carta", 1.1, 0.3, 0.85);
      caja(".sbc", 1.3); nota(1, 1.3);
      qa(".tb .c-f b").forEach((b, i) => latido(b, 1.5 + i * 0.1, 1.2));
      // horario
      pop(".tb .abierto", 1.7, 0.3, 0.6); nota(2, 1.75);
      tl.fromTo(q(".tb .abierto i"), { scale: 1 }, { scale: 1.5, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 1.9);
      // botón para reservar
      tl.to(q(".sbc"), { opacity: 0, duration: 0.2 }, 2.7);
      pop(".tb .btn", 2.95, 0.35, 0.6); nota(3, 3.05);
      // "Tocan" (empieza en s05): el dedo toca justo antes del corte
      toque(".tb .onda", 3.95);
      latido(".tb .btn", 3.95, 0.94);
      tl.fromTo(T, { scale: 1 }, { scale: 1.03, transformOrigin: "50% 50%", duration: 3.6, ease: "sine.inOut" }, 0.6);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 1.3, sfx: "click-soft", vol: 0.28 }, { t: 1.75, sfx: "ping", vol: 0.24 }, { t: 3.05, sfx: "pop", vol: 0.28 }, { t: 3.95, sfx: "click", vol: 0.3 }],
});

// ================= s05 · mesa para dos (1.63) =================
escena("s05-mesa", {
  css: `
    P .tb2 .tel-pan > * { }`,
  html: `
      ${tel("tb2", TB.x, TB.y, 540, 960, PAN_CHAT)}
      ${pill(1, 250, 1180, "Mesa para dos", "lleno")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 300, 1130, 520, PB.y + 500, "g")}</svg>`,
  js: `
      const T = q(".tb2");
      // corte por match: mismo celular, la pantalla pasa al chat
      tl.fromTo(T, { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1.06, x: -40, duration: 1.6, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".ch-head"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.2 }, 0);
      tl.fromTo(q(".bur.yo"), { opacity: 0, y: 40, scale: 0.8, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "back.out(1.8)" }, 0.12);
      tl.fromTo(q(".bur.ellos"), { opacity: 0, y: 40, scale: 0.8, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "back.out(1.8)" }, 0.65);
      nota(1, 0.72);
      salida(1.45);`,
  sfx: [{ t: 0.12, sfx: "click-soft", vol: 0.25 }, { t: 0.65, sfx: "notification", vol: 0.32 }, { t: 0.95, sfx: "pop", vol: 0.28 }],
});

// ================= s06 · giro: la comida es igual (2.39) =================
const plato = (cx, cy, cls) => `<g class="${cls}">
  <path class="ln vapor" d="M${cx - 60} ${cy - 250} q-24 -40 0 -80 q24 -40 0 -80 M${cx + 40} ${cy - 250} q-24 -40 0 -80 q24 -40 0 -80" fill="none" stroke="${CR}" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
  <circle cx="${cx}" cy="${cy}" r="215" fill="${CR}"/>
  <circle cx="${cx}" cy="${cy}" r="160" fill="none" stroke="#c9c7b8" stroke-width="7"/>
  <path d="M${cx - 120} ${cy - 10} C${cx - 108} ${cy - 90} ${cx + 30} ${cy - 108} ${cx + 100} ${cy - 66} C${cx + 150} ${cy - 30} ${cx + 120} ${cy + 70} ${cx + 40} ${cy + 86} C${cx - 50} ${cy + 104} ${cx - 130} ${cy + 66} ${cx - 120} ${cy - 10} Z" fill="${NAVY3}" stroke="${NAVY}" stroke-width="6"/>
  <path d="M${cx - 80} ${cy - 40} L${cx - 40} ${cy + 50} M${cx - 20} ${cy - 66} L${cx + 22} ${cy + 46} M${cx + 44} ${cy - 66} L${cx + 82} ${cy + 20}" stroke="${CR}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
  <path d="M${cx + 100} ${cy + 100} C${cx + 116} ${cy + 72} ${cx + 150} ${cy + 70} ${cx + 160} ${cy + 90} C${cx + 142} ${cy + 96} ${cx + 128} ${cy + 112} ${cx + 100} ${cy + 100} Z" fill="${G}"/>
</g>`;
escena("s06-giro", {
  css: `
    P .igual { position: absolute; left: 470px; top: 980px; width: 140px; height: 140px; border-radius: 50%; background: ${G}; font: 900 110px/128px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }
    P .nomp { position: absolute; top: 1390px; width: 540px; text-align: center; font: 800 52px/1 "Lexend", sans-serif; color: ${CR}; }
    P .nomp.a { left: 0; } P .nomp.b { left: 540px; }
    P .ok { position: absolute; top: 1460px; width: 540px; text-align: center; opacity: 0; }
    P .ok.a { left: 0; } P .ok.b { left: 540px; }
    P .ok span { display: inline-flex; align-items: center; gap: 14px; font: 700 40px/1 "Lexend", sans-serif; color: ${G}; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${plato(270, 1050, "pa")}${plato(810, 1050, "pb")}
      </svg>
      <div class="nomp a">El Fogón</div><div class="nomp b">La Brasa</div>
      <div class="igual">=</div>
      <div class="ok a"><span>${tick(22)}Muy buena</span></div><div class="ok b"><span>${tick(22)}Muy buena</span></div>`,
  js: `
      tl.fromTo(q(".pa"), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".pb"), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, 0.1);
      tl.fromTo(qa(".nomp"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, 0.3);
      dibujar(".vapor", 0.5, 0.6);
      tl.to(qa(".vapor"), { y: -20, duration: 1.6, ease: "sine.inOut" }, 0.7);
      // igual de buena
      tl.fromTo(q(".igual"), { opacity: 0, scale: 0.3, rotation: -90, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, 1.1);
      pop(".ok.a", 1.7, 0.3); pop(".ok.b", 1.78, 0.3);
      latido(".igual", 1.75, 1.15);
      salida(2.17);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 1.1, sfx: "impact-bass-1", vol: 0.26, max: 0.7 }, { t: 1.7, sfx: "ping", vol: 0.22 }],
});

// ================= s07 · uno se dejó ver (2.45) =================
const B7 = 1440;
escena("s07-dejo-ver", {
  css: `
    P .pant { fill: none; stroke: ${G}; stroke-width: 9; stroke-linecap: round; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(760, B7)}${PISO(B7)}
        ${fachada("fzL", 270, B7, "EL FOGÓN", false)}
        ${fachada("fzR", 810, B7, "LA BRASA", true)}
        <rect class="pant" x="566" y="660" width="488" height="930" rx="60"/>
        <path class="pant notch" d="M760 690 H860"/>
        <path class="camino" d="M300 1640 C 420 1640 520 1620 640 1560 S 860 1470 880 1442" fill="none" stroke="${G}" stroke-width="8" stroke-dasharray="2 22" stroke-linecap="round"/>
        <g class="gente"><circle cx="0" cy="-70" r="20" fill="${CR}"/><path d="M-28 0 Q-28 -46 0 -46 Q28 -46 28 0 Z" fill="${CR}"/><circle cx="56" cy="-66" r="18" fill="${CR}"/><path d="M30 0 Q30 -42 56 -42 Q82 -42 82 0 Z" fill="${CR}"/></g>
      </svg>
      ${pill(1, 810, 600, "Lo vieron antes", "lleno")}
      ${pill(2, 270, 1520, "¿Existe?", "r")}`,
  js: `
      // arranca como terminó s01: las dos fachadas
      tl.fromTo(qa(".fzL, .fzR"), { scale: 1.06, svgOrigin: "540 1100" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      // "uno se dejó ver": la de la derecha queda adentro de un celular; la otra se borra
      dibujar(".pant", 0.6, 0.5);
      tl.to(q(".fzL"), { opacity: 0.22, duration: 0.5 }, 0.5);
      tl.fromTo(q(".fzR .luzv"), { opacity: 0.16 }, { opacity: 0.55, duration: 0.25, yoyo: true, repeat: 3, immediateRender: false }, 0.8);
      pop(".n1", 0.96);
      pop(".n2", 1.2);
      // "antes de que llegaran": la pareja camina hacia la puerta
      tl.fromTo(q(".camino"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.16);
      tl.fromTo(q(".gente"), { x: 240, y: 1640, opacity: 0 }, { x: 240, y: 1640, opacity: 1, duration: 0.15 }, 1.16);
      tl.to(q(".gente"), { x: 760, y: 1470, duration: 1.0, ease: "power1.inOut" }, 1.3);
      salida(2.25);`,
  sfx: [{ t: 0.6, sfx: "whoosh-short", vol: 0.18 }, { t: 0.96, sfx: "pop", vol: 0.28 }, { t: 1.2, sfx: "click-soft", vol: 0.22 }],
});

// ================= s08 · el sitio (3.71) =================
// celular grande al centro (x 250-830, y 590-1570); pantalla 552 x 952
const TS = { x: 130, y: 590, w: 580, h: 980 };
const PAN_SITIO = `
  <div class="url"><span class="lk">${candado}</span><span>turestaurante.uy</span></div>
  <div class="carga"><i></i></div>
  <div class="hero"><div class="h1">TU RESTAURANTE</div><div class="h2">Abierto hoy hasta las 00:00</div></div>
  ${CARTA("cs")}
  <div class="btn verde wa">${chatIcon(42)}<span>Escribinos por WhatsApp</span></div>
  <div class="llegar">${pinIcon(36)}<span>Cómo llegar</span></div>
  <div class="onda"></div>`;
const CSS_SITIO = `
    P .url { position: absolute; left: 24px; top: 74px; width: 504px; height: 76px; border-radius: 38px; background: ${NAVY2}; display: flex; align-items: center; gap: 14px; padding-left: 26px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    P .carga { position: absolute; left: 40px; top: 164px; width: 472px; height: 10px; border-radius: 5px; background: ${NAVY2}; overflow: hidden; }
    P .carga i { position: absolute; left: 0; top: 0; width: 472px; height: 10px; background: ${G}; transform-origin: 0 50%; }
    P .hero { position: absolute; left: 24px; top: 196px; width: 504px; height: 200px; border-radius: 28px; background: ${G}; padding: 36px 30px; }
    P .h1 { font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.01em; }
    P .h2 { margin-top: 22px; font: 600 30px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .carta.cs { left: 24px; top: 420px; width: 504px; }
    P .btn.wa { left: 24px; top: 738px; width: 504px; }
    P .llegar { position: absolute; left: 24px; top: 866px; width: 504px; display: flex; justify-content: center; align-items: center; gap: 12px; font: 600 32px/1 "Lexend", sans-serif; color: ${CR}; }
    P .onda { left: 216px; top: 733px; }`;
escena("s08-sitio", {
  css: CSS_SITIO,
  html: `
      ${tel("ts", TS.x, TS.y, TS.w, TS.h, PAN_SITIO)}
      ${pill(1, 890, 760, "Abre al toque", "lleno")}
      ${pill(2, 905, 1150, "Tu carta", "g")}
      ${pill(3, 905, 1400, "Tu WhatsApp", "g")}
      ${selbox("sbs", TS.x + 30, TS.y + 426, 520, 320)}`,
  js: `
      const T = q(".ts");
      gsap.set(qa(".ts .hero, .ts .carta, .ts .wa, .ts .llegar"), { opacity: 0 });
      tl.fromTo(T, { y: 260, opacity: 0, scale: 0.92, transformOrigin: "50% 50%" }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      // rápidos: la barra de carga se llena de un saque
      tl.fromTo(q(".carga i"), { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: "power3.out" }, 0.8);
      pop(".ts .hero", 1.0, 0.28, 0.8);
      pop(".n1", 0.95);
      // en el celular
      latido(T, 1.71, 1.03);
      pop(".ts .llegar", 1.9, 0.25, 0.8);
      // con tu carta
      sinNota(1, 2.4);
      pop(".ts .carta", 2.45, 0.3, 0.85);
      caja(".sbs", 2.62); pop(".n2", 2.7);
      // y tu WhatsApp
      tl.to(q(".sbs"), { opacity: 0, duration: 0.2 }, 3.2);
      pop(".ts .wa", 3.12, 0.3, 0.6); pop(".n3", 3.2);
      toque(".ts .onda", 3.45);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.8, sfx: "whoosh-short", vol: 0.16 }, { t: 0.95, sfx: "pop", vol: 0.25 }, { t: 2.62, sfx: "click-soft", vol: 0.28 }, { t: 3.3, sfx: "pop", vol: 0.28 }, { t: 3.55, sfx: "click", vol: 0.25 }],
});

// ================= s09 · CTA (8.00) =================
escena("s09-cta", {
  css: CSS_SITIO + `
    P .vc { position: absolute; left: 79px; top: 570px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 586px; width: 922px; height: 460px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 90px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.75); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1, P .t3 { position: absolute; left: 0; right: 0; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; opacity: 0; }
    P .t1 { top: 1110px; color: #fff; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1252px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; opacity: 1; }
    P .t3 { top: 1440px; color: ${G}; font-size: 112px; }`,
  html: `
      <div class="capa telg">${tel("ts", TS.x, TS.y, TS.w, TS.h, PAN_SITIO)}</div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><svg width="160" height="160" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg><div class="lbl">TU RESTAURANTE</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><span class="selbox sb" style="left:0;top:0;right:0;bottom:0">${esquinas}</span><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const TG = q(".telg");
      tl.to(TG, { scale: 1.03, transformOrigin: "540px 1080px", duration: 0.9, ease: "sine.inOut" }, 0);
      latido(".ts .wa", 0.6, 1.05);
      // "el tuyo": gira a horizontal y se vuelve la videollamada
      tl.to(TG, { rotation: -90, scale: 0.9, y: -280, duration: 0.6, ease: "power3.inOut" }, 1.1);
      tl.to(TG, { opacity: 0, duration: 0.14 }, 1.66);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.62);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.72);
      // Agendá una videollamada gratis en scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.25);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.55);
      caja(".sb", 2.7);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.4);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.9);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.9, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.9);`,
  sfx: [{ t: 1.1, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.72, sfx: "pop", vol: 0.22 }, { t: 2.25, sfx: "whoosh-short", vol: 0.2 }, { t: 2.7, sfx: "click-soft", vol: 0.28 }, { t: 3.4, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
