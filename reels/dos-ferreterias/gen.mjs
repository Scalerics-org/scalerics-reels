// Generador de escenas de reels/dos-ferreterias (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Serie "Dos negocios": Martín pide presupuesto para el baño en
// las dos ferreterías de la cuadra; El Tornillo (izquierda) lo deja en el chat y en la cabeza del
// dueño, La Tuerca (derecha) lo anota en un CRM, el miércoles le avisa al vendedor y le escriben.
// Fondo CREMA #efeee5 liso: líneas navy gruesas (7 px), verde de marca para lo resuelto (siempre
// como relleno, con texto navy encima), rojo apagado para lo perdido. Forma copiada de
// reels/dos-gimnasios/gen.mjs (que viene de por-que-la-tarjeta).
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 31.13;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

// fondo crema: todo se dibuja en navy; paneles blancos con borde navy y sombra navy plana
const CR = "#efeee5", N = "#0b1220", N2 = "#16243d", N3 = "#2e4672", W = "#ffffff";
const G = "#5ce611", RED = "#c7655b", REDT = "#a9473d", GRIS = "#8d8a7c", GRIS2 = "#d9d6c8", BUR = "#e7e5da";
const ST = 7; // grosor de trazo

// ---------- piezas ----------
const tick = (r = 22, fondo = G, marca = N) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${marca}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const equis = (r = 22, fondo = RED) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="${W}" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, kind = "") => `<div class="selbox ${kind} ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
// cara: círculo con silueta
const avatar = (r, fondo = N2, sil = CR, gorra = false) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${sil}"/>${gorra ? `<path d="M42 50 Q44 22 70 22 Q96 22 98 50 Z" fill="${G}"/><path d="M40 50 H106" stroke="${G}" stroke-width="8" stroke-linecap="round"/>` : ""}<path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${sil}"/></svg>`;
const campana = (s = 44, c = N) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 44 44" aria-hidden="true"><path d="M22 5 C14 5 10 11 10 18 V26 L6 32 H38 L34 26 V18 C34 11 30 5 22 5 Z" fill="${c}"/><circle cx="22" cy="37" r="5" fill="${c}"/></svg>`;
// hoja de presupuesto (div) w x h
const hoja = (cls, x, y, w, nombre, estado = "") => `
  <div class="hoja ${cls}" style="left:${x}px;top:${y}px;width:${w}px">
    <div class="hj-t">PRESUPUESTO</div><div class="hj-n">${nombre}</div>
    <div class="hj-l"><i style="width:78%"></i><i style="width:62%"></i><i style="width:70%"></i><i style="width:48%"></i><i style="width:74%"></i><i style="width:56%"></i></div>
    <div class="hj-tot"><span>TOTAL</span><b></b></div>${estado}
  </div>`;

// ---------- fachada de ferretería (svg, coordenadas de pantalla) ----------
const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => `${r2(cx + r * Math.cos((Math.PI / 3) * i))},${r2(cy + r * Math.sin((Math.PI / 3) * i))}`).join(" ");
const herramientas = (vx, vy, verde) => `
    <g transform="translate(${vx + 78} ${vy + 120}) rotate(-28)"><rect x="-11" y="-6" width="22" height="150" rx="9" fill="${N3}"/><rect x="-52" y="-40" width="104" height="44" rx="10" fill="${N}"/></g>
    <polygon points="${hex(vx + 188, vy + 92, 46)}" fill="${verde ? G : N}"/><circle cx="${vx + 188}" cy="${vy + 92}" r="18" fill="${W}"/>
    <rect x="${vx + 28}" y="${vy + 236}" width="94" height="42" rx="16" fill="${verde ? G : N3}"/><path d="M${vx + 124} ${vy + 257} H${vx + 226}" stroke="${N}" stroke-width="11" stroke-linecap="round"/>
    <path d="M${vx + 160} ${vy + 170} V${vy + 214}" stroke="${N}" stroke-width="6" stroke-linecap="round"/>`;
const FW = 440, FH = 560;
const fachada = (cls, cx, B, nombre, verde) => {
  const x0 = cx - FW / 2, y0 = B - FH;
  let toldo = "";
  for (let i = 0; i < 8; i++) toldo += `<rect x="${x0 + i * 55}" y="${y0}" width="55" height="74" fill="${i % 2 ? W : verde ? G : N3}"/>`;
  let ondas = `M${x0} ${y0 + 74}`;
  for (let i = 0; i < 8; i++) ondas += ` q27.5 30 55 0`;
  return `<g class="${cls}">
    <rect x="${x0 + 18}" y="${y0 + 18}" width="${FW}" height="${FH}" fill="${N}"/>
    <rect x="${x0}" y="${y0}" width="${FW}" height="${FH}" fill="${W}" stroke="${N}" stroke-width="${ST}" stroke-linejoin="round"/>
    <path d="M${cx - 130} ${y0 - 34} V${y0} M${cx + 130} ${y0 - 34} V${y0}" stroke="${N}" stroke-width="${ST}" stroke-linecap="round"/>
    <rect class="cartel" x="${cx - 210}" y="${y0 - 140}" width="420" height="108" rx="18" fill="${N}"/>
    <text x="${cx}" y="${y0 - 70}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="50" fill="${W}" letter-spacing="1">${nombre}</text>
    <g class="toldo">${toldo}<path d="${ondas}" fill="${W}" stroke="${N}" stroke-width="${ST}" stroke-linejoin="round"/>
    <rect x="${x0}" y="${y0}" width="${FW}" height="74" fill="none" stroke="${N}" stroke-width="${ST}"/></g>
    <rect class="vid" x="${x0 + 26}" y="${y0 + 140}" width="250" height="320" rx="12" fill="${CR}" stroke="${N}" stroke-width="${ST}"/>
    <g class="herr">${herramientas(x0 + 26, y0 + 140, verde)}</g>
    <rect x="${x0 + 300}" y="${B - 400}" width="116" height="400" rx="8" fill="${N2}" stroke="${N}" stroke-width="${ST}"/>
    <rect x="${x0 + 318}" y="${B - 372}" width="80" height="150" rx="6" fill="${CR}"/>
    <circle cx="${x0 + 396}" cy="${B - 180}" r="9" fill="${CR}"/>
  </g>`;
};
const PISO = (B) => `<path class="piso" d="M20 ${B} H1060" stroke="${N}" stroke-width="${ST}" stroke-linecap="round"/>`;
const DIV = (y1, y2) => `<path class="div" d="M540 ${y1} V${y2}" stroke="${N}" stroke-width="6" stroke-dasharray="2 20" stroke-linecap="round" opacity="0.5"/>`;

// ---------- celular (div) ----------
const tel = (cls, x, y, w, h, pantalla) => `
<div class="telw ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="tel-lado"></div>
  <div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>
</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; padding: 16px 32px 17px; border: 6px solid ${N}; border-radius: 999px; background: ${W}; font: 700 42px/1 "Lexend", sans-serif; color: ${N}; white-space: nowrap; opacity: 0; box-shadow: 8px 8px 0 ${N}; }
    ${P} .pill.lleno { background: ${G}; color: ${N}; font-weight: 800; }
    ${P} .pill.r { border-color: ${RED}; color: ${REDT}; box-shadow: 8px 8px 0 ${RED}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: ${W}; box-shadow: 8px 8px 0 ${N}; }
    ${P} .pill.gris { background: ${GRIS2}; border-color: ${GRIS}; color: ${N2}; box-shadow: none; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.2); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .lado { position: absolute; top: 500px; left: 50%; padding: 12px 26px; border-radius: 14px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; white-space: nowrap; transform: translateX(-50%); }
    ${P} .lado.izq { background: ${RED}; color: ${W}; } ${P} .lado.der { background: ${G}; color: ${N}; }
    ${P} .telw { position: absolute; }
    ${P} .tel-lado { position: absolute; left: 18px; top: 18px; right: -18px; bottom: -18px; border-radius: 72px; background: ${N2}; opacity: 0.35; }
    ${P} .tel { position: absolute; inset: 0; border-radius: 72px; background: ${N}; }
    ${P} .tel-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 58px; background: ${W}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 50%; top: 28px; width: 120px; height: 30px; margin-left: -60px; border-radius: 15px; background: ${N}; }
    ${P} .hoja { position: absolute; height: auto; padding: 34px 36px 32px; background: ${W}; border: 7px solid ${N}; border-radius: 18px; box-shadow: 14px 14px 0 ${N}; }
    ${P} .hj-t { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${N3}; }
    ${P} .hj-n { margin-top: 14px; font: 800 46px/1.05 "Lexend", sans-serif; color: ${N}; letter-spacing: -0.01em; }
    ${P} .hj-l { margin-top: 26px; display: flex; flex-direction: column; gap: 18px; }
    ${P} .hj-l i { display: block; height: 14px; border-radius: 7px; background: ${GRIS2}; }
    ${P} .hj-tot { margin-top: 28px; padding-top: 22px; border-top: 6px solid ${N}; display: flex; align-items: center; justify-content: space-between; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${N}; }
    ${P} .hj-tot b { width: 40%; height: 30px; border-radius: 8px; background: ${N}; }
    ${P} .ch-head { position: absolute; left: 0; top: 0; right: 0; height: 176px; background: ${N}; }
    ${P} .ch-av { position: absolute; left: 34px; top: 76px; width: 80px; height: 80px; border-radius: 50%; background: ${G}; font: 800 32px/80px "Lexend", sans-serif; text-align: center; color: ${N}; }
    ${P} .ch-nom { position: absolute; left: 134px; top: 80px; font: 700 38px/1 "Lexend", sans-serif; color: ${W}; white-space: nowrap; }
    ${P} .ch-sub { position: absolute; left: 136px; top: 128px; font: 500 28px/1 "IBM Plex Mono", monospace; color: ${G}; }
    ${P} .bur { position: absolute; padding: 26px 32px; border-radius: 34px; font: 600 44px/1.24 "Lexend", sans-serif; color: ${N}; }
    ${P} .bur.ellos { background: ${BUR}; border-bottom-left-radius: 8px; }
    ${P} .bur.yo { background: ${G}; border-bottom-right-radius: 8px; font-weight: 700; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const temblor = (s, t) => tl.fromTo(typeof s === "string" ? q(s) : s, { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, t);
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

// ================= s01 · gancho (5.96) =================
// cuadro 0: el gancho entero en grande + las dos ferreterías ya dibujadas
const B1 = 1500;
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 112px; text-align: center; font: 800 96px/1.04 "Lexend", sans-serif; color: ${N}; letter-spacing: -0.035em; }
    P .tit .g3 { font-size: 118px; margin-top: 18px; }
    P .tit .hl { position: relative; display: inline-block; padding: 0 22px 10px; margin-top: 8px; font-size: 124px; }
    P .tit .hl .selbox { opacity: 1; left: 0; top: 4px; right: 0; bottom: 0; background: ${G}; border-color: ${N}; }
    P .tit .hl .selbox i { border-color: ${N}; }
    P .tit .hl em { position: relative; font-style: normal; }
    P .pp { position: absolute; width: 230px; padding: 22px 22px 20px; background: ${W}; border: 6px solid ${N}; border-radius: 14px; box-shadow: 9px 9px 0 ${N}; opacity: 0; }
    P .pp .t { font: 500 22px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${N3}; }
    P .pp i { display: block; height: 12px; margin-top: 14px; border-radius: 6px; background: ${GRIS2}; }
    P .pp .ok { position: absolute; right: -22px; top: -22px; }
    P .pp.a { left: 158px; top: 1020px; } P .pp.b { left: 698px; top: 1020px; }
    P .flecha { position: absolute; left: 860px; top: 960px; opacity: 0; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(820, B1)}${PISO(B1)}
        ${fachada("fzL", 270, B1, "EL TORNILLO", false)}
        ${fachada("fzR", 810, B1, "LA TUERCA", true)}
      </svg>
      <div class="pp a"><div class="t" data-layout-ignore>PRESUPUESTO</div><i style="width:90%"></i><i style="width:70%"></i><i style="width:80%"></i><div class="ok">${tick(24)}</div></div>
      <div class="pp b"><div class="t" data-layout-ignore>PRESUPUESTO</div><i style="width:90%"></i><i style="width:70%"></i><i style="width:80%"></i><div class="ok">${tick(24)}</div></div>
      ${pill(1, 810, 1600, "Lo siguió", "lleno")}
      ${pill(2, 270, 1600, "Quedó ahí", "r")}
      <div class="tit"><div>Dos ferreterías,</div><div>dos presupuestos.</div><div class="g3">Una sola</div><div><span class="hl"><span class="selbox">${esquinas}</span><em>lo siguió.</em></span></div></div>`,
  js: `
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzL"), { y: 24 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { y: 24 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0.08);
      dibujar(".div", 0.2, 0.6);
      tl.fromTo(qa(".herr"), { y: 0 }, { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      // "Las dos mandaron el presupuesto": sale una hoja de cada una
      tl.fromTo(qa(".pp"), { opacity: 0, y: 160, scale: 0.6, rotation: -6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.42, ease: "back.out(1.7)", stagger: 0.12 }, 2.5);
      tl.fromTo(qa(".pp .ok"), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.4)", stagger: 0.12 }, 3.0);
      // "Una sola lo siguió": la izquierda se apaga, la derecha late
      tl.to(q(".pp.a"), { opacity: 0.45, y: 80, rotation: -9, duration: 0.5, ease: "power2.in" }, 4.1);
      tl.to(q(".fzL"), { opacity: 0.4, duration: 0.4 }, 4.15);
      tl.to(q(".pp.b"), { y: -30, rotation: 3, duration: 0.35, ease: "back.out(2)" }, 4.3);
      latido(".fzR", 4.35, 1.03);
      pop(".n2", 4.5);
      pop(".n1", 4.95);
      latido(".tit .hl", 4.95, 1.07);
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 5.55);
      salida(5.72);`,
  sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 2.5, sfx: "pop", vol: 0.24 }, { t: 3.0, sfx: "ping", vol: 0.22 }, { t: 4.1, sfx: "click-soft", vol: 0.24 }, { t: 4.95, sfx: "pop", vol: 0.28 }],
});

// ================= s02 · Martín reforma el baño (1.71) =================
let azulejos = "";
for (let c = 1; c < 6; c++) azulejos += `<path class="az" d="M${70 + c * 156} 600 V1180" stroke="${N}" stroke-width="5" opacity="0.28"/>`;
for (let r = 1; r < 4; r++) azulejos += `<path class="az" d="M70 ${600 + r * 145} H1010" stroke="${N}" stroke-width="5" opacity="0.28"/>`;
escena("s02-martin", {
  css: `
    P .pared { position: absolute; left: 70px; top: 600px; width: 940px; height: 580px; border-radius: 30px; background: ${W}; border: 7px solid ${N}; box-shadow: 16px 16px 0 ${N}; }
    P .ficha { position: absolute; left: 110px; top: 1230px; width: 860px; height: 200px; border-radius: 34px; background: ${N}; }
    P .ficha .av { position: absolute; left: 28px; top: 26px; }
    P .ficha .nm { position: absolute; left: 210px; top: 42px; font: 800 68px/1 "Lexend", sans-serif; color: ${W}; letter-spacing: -0.02em; }
    P .ficha .dd { position: absolute; left: 214px; top: 128px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${G}; }`,
  html: `
      <div class="pared"></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${azulejos}
        <g class="canilla">
          <rect x="420" y="660" width="240" height="70" rx="20" fill="${N}"/>
          <path class="cuello" d="M540 730 V780 Q540 860 640 860 H700" fill="none" stroke="${N}" stroke-width="44" stroke-linecap="round"/>
          <rect x="690" y="836" width="70" height="60" rx="14" fill="${N}"/>
          <rect x="470" y="610" width="140" height="40" rx="14" fill="${G}"/>
        </g>
        <path class="gota" d="M725 930 Q745 965 725 985 Q705 965 725 930 Z" fill="${G}" stroke="${N}" stroke-width="5"/>
        <path class="pileta" d="M150 1010 H930 Q910 1150 540 1150 Q170 1150 150 1010 Z" fill="${CR}" stroke="${N}" stroke-width="${ST}" stroke-linejoin="round"/>
      </svg>
      <div class="ficha"><div class="av">${avatar(74, G, N)}</div><div class="nm">Martín</div><div class="dd">REFORMA EL BAÑO</div></div>`,
  js: `
      tl.fromTo(q(".pared"), { scale: 0.92, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      dibujar(".az", 0.05, 0.4);
      tl.fromTo(q(".canilla"), { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.1);
      tl.fromTo(q(".pileta"), { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.2);
      latido(".canilla", 0.55, 1.04);
      tl.fromTo(q(".ficha"), { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.0);
      // "el baño": cae la gota
      tl.fromTo(q(".gota"), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.2 }, 0.8);
      tl.to(q(".gota"), { y: 130, duration: 0.4, ease: "power2.in" }, 1.0);
      tl.to(q(".gota"), { opacity: 0, duration: 0.08 }, 1.38);
      latido(".ficha", 0.95, 1.03);
      salida(1.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.5, sfx: "click", vol: 0.22 }, { t: 1.38, sfx: "pop", vol: 0.2 }],
});

// ================= s03 · el lunes pide presupuesto en las dos (1.92) =================
const LISTA = ["Inodoro", "Grifería", "Cerámica", "Caños"];
escena("s03-lunes", {
  css: `
    P .cal { position: absolute; left: 70px; top: 600px; width: 400px; height: 440px; border-radius: 34px; background: ${W}; border: 7px solid ${N}; box-shadow: 14px 14px 0 ${N}; overflow: hidden; }
    P .cal .top { position: absolute; left: 0; right: 0; top: 0; height: 130px; background: ${N}; font: 900 76px/130px "Lexend", sans-serif; text-align: center; color: ${W}; letter-spacing: -0.02em; }
    P .cal .dia { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font: 900 220px/1 "Lexend", sans-serif; color: ${N}; }
    P .lista { position: absolute; left: 510px; top: 600px; width: 500px; height: 440px; border-radius: 34px; background: ${W}; border: 7px solid ${N}; box-shadow: 14px 14px 0 ${N}; padding: 36px 40px; }
    P .lista .lt { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.18em; color: ${N3}; margin-bottom: 26px; }
    P .lista .it { display: flex; align-items: center; gap: 20px; height: 76px; font: 700 44px/1 "Lexend", sans-serif; color: ${N}; }
    P .lista .it b { width: 42px; height: 42px; border: 6px solid ${N}; border-radius: 10px; }
    P .msg { position: absolute; top: 1110px; width: 440px; padding: 26px 30px; border-radius: 30px; background: ${G}; border: 6px solid ${N}; font: 700 40px/1.2 "Lexend", sans-serif; color: ${N}; box-shadow: 9px 9px 0 ${N}; }
    P .msg.a { left: 70px; border-bottom-left-radius: 8px; } P .msg.b { left: 570px; border-bottom-right-radius: 8px; }
    P .dest { position: absolute; top: 1340px; width: 440px; height: 100px; border-radius: 20px; background: ${N}; font: 800 46px/100px "Lexend", sans-serif; text-align: center; color: ${W}; }
    P .dest.a { left: 70px; } P .dest.b { left: 570px; }`,
  html: `
      <div class="cal"><div class="top">LUNES</div><div class="dia">3</div></div>
      <div class="lista"><div class="lt">PARA EL BAÑO</div>${LISTA.map((t) => `<div class="it"><b></b>${t}</div>`).join("")}</div>
      <div class="msg a">¿Me pasás un presupuesto?</div><div class="msg b">¿Me pasás un presupuesto?</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="fl" d="M290 1282 V1330 M270 1308 L290 1330 L310 1308" fill="none" stroke="${N}" stroke-width="${ST}" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="fl" d="M790 1282 V1330 M770 1308 L790 1330 L810 1308" fill="none" stroke="${N}" stroke-width="${ST}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="dest a">EL TORNILLO</div><div class="dest b">LA TUERCA</div>`,
  js: `
      tl.fromTo(q(".cal"), { x: -500, rotation: -6 }, { x: 0, rotation: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".lista"), { x: 600, rotation: 6 }, { x: 0, rotation: 0, duration: 0.35, ease: "power3.out" }, 0.05);
      tl.fromTo(qa(".lista .it"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.18, stagger: 0.07 }, 0.25);
      latido(".cal", 0.15, 1.05);
      // "pide presupuesto en las dos"
      tl.fromTo(qa(".msg"), { opacity: 0, scale: 0.6, y: 40, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", stagger: 0.12 }, 0.6);
      dibujar(".fl", 0.95, 0.25);
      tl.fromTo(qa(".dest"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.8)", stagger: 0.1 }, 1.1);
      latido(".dest", 1.4, 1.05);
      salida(1.72);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.6, sfx: "notification", vol: 0.26 }, { t: 1.1, sfx: "pop", vol: 0.22 }],
});

// ================= s04 · izquierda: queda en el chat y en la cabeza (3.12) =================
const CHATS = [
  ["Proveedor", "Llega el jueves"], ["Laura", "¿Tenés silicona?"], ["Obra Pocitos", "Mandame la lista"],
  ["Carlos", "¿Abren el sábado?"], ["Ana", "Gracias!"], ["Martín", "Presupuesto baño.pdf"],
];
const CH_ROW = 132;
escena("s04-chat", {
  css: `
    P .lista-ch { position: absolute; left: 0; right: 0; top: 176px; }
    P .row { position: absolute; left: 0; right: 0; height: ${CH_ROW}px; border-bottom: 4px solid ${BUR}; }
    P .row .av { position: absolute; left: 30px; top: 26px; width: 80px; height: 80px; border-radius: 50%; background: ${GRIS2}; }
    P .row .nm { position: absolute; left: 136px; top: 28px; font: 700 38px/1 "Lexend", sans-serif; color: ${N}; white-space: nowrap; }
    P .row .ms { position: absolute; left: 136px; top: 78px; font: 500 30px/1 "Lexend", sans-serif; color: ${GRIS}; white-space: nowrap; }
    P .row.mt .ms { color: ${N}; font-weight: 600; }
    P .row.mt .av { background: ${N}; }
    P .row .nu { position: absolute; right: 30px; top: 46px; width: 40px; height: 40px; border-radius: 50%; background: ${N}; }
    P .cabeza { position: absolute; left: 520px; top: 640px; width: 520px; height: 760px; opacity: 0; }`,
  html: `
      <div class="lado izq">EL TORNILLO · SIN CRM</div>
      ${tel("tm", 190, 590, 700, 1000, `
        <div class="ch-head"><div class="ch-av" style="background:${GRIS2}">ET</div><div class="ch-nom">El Tornillo · chats</div><div class="ch-sub" style="color:${GRIS2}">hoy</div></div>
        <div class="lista-ch">${CHATS.map(([n, m], i) => `<div class="row ${n === "Martín" ? "mt" : ""} r${i}" style="top:${i * CH_ROW}px"><div class="av"></div><div class="nm">${n}</div><div class="ms">${m}</div>${n !== "Martín" ? `<div class="nu"></div>` : ""}</div>`).join("")}</div>`)}
      <svg class="cabeza" viewBox="0 0 520 760" aria-hidden="true">
        <circle class="nube" cx="300" cy="190" r="170" fill="${W}" stroke="${N}" stroke-width="${ST}"/>
        <circle class="nube" cx="150" cy="390" r="34" fill="${W}" stroke="${N}" stroke-width="${ST}"/>
        <circle class="nube" cx="104" cy="460" r="20" fill="${W}" stroke="${N}" stroke-width="${ST}"/>
        <g class="mem"><rect x="225" y="70" width="150" height="180" rx="12" fill="${W}" stroke="${N}" stroke-width="6"/>
          <path d="M252 115 H348 M252 150 H330 M252 185 H345 M252 220 H310" stroke="${GRIS2}" stroke-width="12" stroke-linecap="round"/>
          <text x="300" y="306" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="42" fill="${N}">¿Martín?</text></g>
        <g transform="translate(-20 440)"><circle cx="140" cy="110" r="96" fill="${N}"/><path d="M10 330 Q20 220 140 220 Q260 220 270 330 Z" fill="${N}"/></g>
      </svg>
      ${selbox("sbM", 206, 1437, 668, CH_ROW + 8, "r")}
      ${pill(1, 540, 1650, "Una conversación más", "r")}
      ${pill(2, 780, 1650, "Solo en la memoria", "rl")}`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      const T = q(".tm");
      tl.fromTo(T, { x: -1000, rotation: -4 }, { x: 0, rotation: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.2);
      // al principio solo está Martín arriba; "queda en el chat": entran los demás y lo empujan
      const filas = qa(".row");
      gsap.set(q(".lista-ch"), { y: -${(CHATS.length - 1) * CH_ROW} });
      filas.forEach((f, i) => { if (i < filas.length - 1) gsap.set(f, { opacity: 0 }); });
      tl.to(q(".lista-ch"), { y: 0, duration: 0.7, ease: "power2.inOut" }, 1.0);
      filas.slice(0, -1).reverse().forEach((f, i) => tl.fromTo(f, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.16 }, 1.02 + i * 0.12));
      tl.fromTo(q(".row.mt"), { opacity: 1 }, { opacity: 0.5, duration: 0.3, immediateRender: false }, 1.6);
      caja(".sbM", 1.65);
      pop(".n1", 1.3);
      // "y en la cabeza del dueño": el teléfono se corre, aparece la cabeza con la nube
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, 1.85);
      tl.to(qa(".sbM"), { opacity: 0, duration: 0.12 }, 1.85);
      tl.to(T, { x: -200, scale: 0.74, transformOrigin: "50% 50%", duration: 0.4, ease: "power3.inOut" }, 1.85);
      tl.fromTo(q(".cabeza"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 1.95);
      tl.fromTo(qa(".nube"), { scale: 0.3, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", stagger: -0.06 }, 2.05);
      tl.to(q(".mem"), { opacity: 0.25, duration: 0.5, ease: "power1.in" }, 2.45);
      pop(".n2", 2.4);
      salida(2.95);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: 1.0, sfx: "notification", vol: 0.2 }, { t: 1.3, sfx: "click-soft", vol: 0.22 }, { t: 1.65, sfx: "glitch-1", vol: 0.14, max: 0.4 }, { t: 2.4, sfx: "pop", vol: 0.22 }],
});

// ================= s05 · derecha: el CRM lo anota y avisa el miércoles (4.02) =================
const DIAS5 = ["LUN", "MAR", "MIÉ", "JUE", "VIE"];
escena("s05-crm", {
  css: `
    P .crm { position: absolute; left: 50px; top: 590px; width: 980px; height: 1000px; border-radius: 40px; background: ${W}; border: 7px solid ${N}; box-shadow: 18px 18px 0 ${N}; overflow: hidden; }
    P .crm-h { position: absolute; left: 0; top: 0; right: 0; height: 100px; background: ${N}; display: flex; align-items: center; padding-left: 36px; gap: 18px; font: 700 40px/1 "Lexend", sans-serif; color: ${W}; }
    P .crm-h i { width: 24px; height: 24px; border-radius: 50%; background: ${G}; }
    P .crm-h b { margin-left: auto; margin-right: 36px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${G}; }
    P .card { position: absolute; left: 36px; top: 136px; width: 894px; height: 250px; border-radius: 28px; background: ${CR}; border: 6px solid ${N}; opacity: 0; }
    P .card .av { position: absolute; left: 28px; top: 28px; }
    P .card .nm { position: absolute; left: 200px; top: 40px; font: 800 58px/1 "Lexend", sans-serif; color: ${N}; }
    P .card .dd { position: absolute; left: 202px; top: 116px; font: 600 34px/1 "Lexend", sans-serif; color: ${N3}; }
    P .card .es { position: absolute; left: 202px; top: 174px; padding: 8px 16px; border-radius: 12px; background: ${N}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${W}; }
    P .card .ok { position: absolute; right: 30px; top: 30px; opacity: 0; }
    P .sem-t { position: absolute; left: 40px; top: 430px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${N3}; }
    P .sem { position: absolute; left: 36px; top: 480px; width: 894px; height: 200px; display: flex; gap: 18px; }
    P .dia { position: relative; flex: 1; border-radius: 24px; border: 6px solid ${GRIS2}; background: ${W}; }
    P .dia span { position: absolute; left: 0; right: 0; top: 30px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${GRIS}; }
    P .dia em { position: absolute; left: 50%; top: 104px; width: 56px; height: 56px; margin-left: -28px; border-radius: 50%; background: ${GRIS2}; }
    P .dia.d0 { border-color: ${N}; } P .dia.d0 span { color: ${N}; } P .dia.d0 em { background: ${N}; }
    P .dia.d2 .hoy { position: absolute; inset: -6px; border-radius: 24px; background: ${G}; border: 6px solid ${N}; opacity: 0; }
    P .dia.d2 .hoy b { position: absolute; left: 0; right: 0; top: 30px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${N}; }
    P .dia.d2 .hoy svg { position: absolute; left: 50%; top: 96px; margin-left: -34px; }
    P .alerta { position: absolute; left: 36px; top: 730px; width: 894px; height: 220px; border-radius: 30px; background: ${N}; opacity: 0; }
    P .alerta .ic { position: absolute; left: 34px; top: 50px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; display: flex; align-items: center; justify-content: center; }
    P .alerta .tx { position: absolute; left: 186px; top: 52px; font: 800 50px/1.1 "Lexend", sans-serif; color: ${W}; letter-spacing: -0.01em; }
    P .alerta .tx small { display: block; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; margin-bottom: 14px; }`,
  html: `
      <div class="lado der">LA TUERCA · CON CRM</div>
      <div class="crm">
        <div class="crm-h"><i></i>CRM · Presupuestos<b>LA TUERCA</b></div>
        <div class="card"><div class="av">${avatar(70, G, N)}</div><div class="nm">Martín</div><div class="dd">Reforma del baño</div><div class="es">ENVIADO EL LUNES</div><div class="ok">${tick(36)}</div></div>
        <div class="sem-t">SEGUIMIENTO</div>
        <div class="sem">${DIAS5.map((d, i) => `<div class="dia d${i}"><span>${d}</span><em></em>${i === 2 ? `<div class="hoy"><b>MIÉ</b>${campana(68, N)}</div>` : ""}</div>`).join("")}</div>
        <div class="alerta"><div class="ic">${campana(64, N)}</div><div class="tx"><small>AVISO AL VENDEDOR</small>Escribirle a Martín</div></div>
      </div>`,
  js: `
      gsap.set(q(".lado"), { opacity: 0 });
      tl.fromTo(q(".crm"), { x: 1000, rotation: 3 }, { x: 0, rotation: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".lado"), { opacity: 1, duration: 0.3 }, 0.2);
      tl.fromTo(qa(".dia"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.06 }, 0.5);
      // "el CRM lo anota": cae la ficha del presupuesto
      tl.fromTo(q(".card"), { opacity: 0, y: -80, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.7)" }, 0.95);
      tl.fromTo(q(".card .ok"), { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.4)" }, 1.6);
      latido(".dia.d0", 1.75, 1.08);
      // "el miércoles": se prende el día
      tl.to(q(".dia.d2 > span"), { opacity: 0, duration: 0.1 }, 2.38);
      tl.fromTo(q(".dia.d2 .hoy"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1.06, duration: 0.3, ease: "back.out(2)" }, 2.38);
      tl.fromTo(q(".dia.d2 .hoy svg"), { rotation: 0 }, { rotation: 16, transformOrigin: "50% 10%", duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.6);
      // "le avisa al vendedor"
      tl.fromTo(q(".alerta"), { opacity: 0, y: 80, scale: 0.92, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, 2.88);
      tl.fromTo(q(".alerta .ic svg"), { rotation: 0 }, { rotation: 18, transformOrigin: "50% 10%", duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 3.2);
      tl.fromTo(q(".crm"), { scale: 1 }, { scale: 1.025, transformOrigin: "50% 50%", duration: 3.4, ease: "sine.inOut" }, 0.5);
      salida(3.85);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: 0.95, sfx: "pop", vol: 0.24 }, { t: 1.6, sfx: "ping", vol: 0.22 }, { t: 2.38, sfx: "click", vol: 0.22 }, { t: 2.88, sfx: "notification", vol: 0.32 }],
});

// ================= s06 · el mensaje (3.94) =================
const MSG = "Martín, ¿pudiste verlo? Te lo guardamos hasta el viernes.".split(" ");
const MSG_T = [0.93, 1.07, 1.62, 1.77, 1.87, 2.0, 2.87, 2.97, 3.07];
escena("s06-mensaje", {
  css: `
    P .dots { position: absolute; left: 30px; top: 216px; width: 130px; height: 72px; border-radius: 30px; background: ${BUR}; display: flex; align-items: center; justify-content: center; gap: 12px; }
    P .dots i { width: 16px; height: 16px; border-radius: 50%; background: ${N}; }
    P .bur.ellos { left: 30px; top: 216px; width: 600px; font-size: 52px; }
    P .bur.ellos b { font-weight: 800; background: ${G}; padding: 0 8px; border-radius: 8px; }
    P .mw { display: inline-block; }
    P .res { position: absolute; left: 30px; top: 572px; width: 520px; border-radius: 30px; background: ${W}; border: 6px solid ${N}; padding: 26px 30px; box-shadow: 8px 8px 0 ${N}; }
    P .rs-t { font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${N3}; }
    P .rs-d { margin-top: 16px; font: 800 44px/1.1 "Lexend", sans-serif; color: ${N}; }
    P .rs-b { margin-top: 18px; display: inline-flex; align-items: center; gap: 12px; padding: 10px 18px 10px 10px; border-radius: 999px; background: ${G}; font: 700 32px/1 "Lexend", sans-serif; color: ${N}; }
    P .bur.yo { right: 30px; top: 872px; font-size: 50px; }`,
  html: `
      ${tel("tm", 190, 580, 700, 1040, `
        <div class="ch-head"><div class="ch-av">LT</div><div class="ch-nom">Ferretería La Tuerca</div><div class="ch-sub">en línea</div></div>
        <div class="dots"><i></i><i></i><i></i></div>
        <div class="bur ellos">${MSG.map((w) => `<span class="mw">${w === "Martín," ? `<b>${w}</b>` : w}</span>`).join(" ")}</div>
        <div class="res"><div class="rs-t">PRESUPUESTO BAÑO</div><div class="rs-d">Guardado hasta el viernes</div><div class="rs-b">${tick(20)}Reservado</div></div>
        <div class="bur yo">¡Paso el jueves!</div>`)}
      ${pill(1, 540, 1690, "Con su nombre", "lleno")}`,
  js: `
      const T = q(".tm");
      gsap.set(qa(".mw, .bur, .res"), { opacity: 0 });
      tl.fromTo(T, { y: 1100, rotation: 4 }, { y: 0, rotation: 0, duration: 0.45, ease: "power3.out" }, 0);
      qa(".dots i").forEach((d, i) => tl.fromTo(d, { y: 0 }, { y: -12, duration: 0.16, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.3 + i * 0.08));
      tl.to(q(".dots"), { opacity: 0, duration: 0.1 }, 0.86);
      tl.fromTo(q(".bur.ellos"), { opacity: 0, scale: 0.8, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(1.8)" }, 0.88);
      const TT = ${JSON.stringify(MSG_T)};
      qa(".mw").forEach((w, i) => tl.fromTo(w, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, TT[i]));
      pop(".n1", 1.1);
      tl.to(q(".n1"), { opacity: 0, duration: 0.15 }, 2.7);
      // "hasta el viernes"
      tl.fromTo(q(".res"), { opacity: 0, y: 40, scale: 0.85, transformOrigin: "0% 0%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 3.05);
      tl.fromTo(q(".bur.yo"), { opacity: 0, y: 40, scale: 0.8, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.26, ease: "back.out(1.8)" }, 3.45);
      tl.fromTo(T, { scale: 1 }, { scale: 1.035, transformOrigin: "50% 40%", duration: 3.3, ease: "sine.inOut" }, 0.5);
      salida(3.76);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.18, max: 0.6 }, { t: 0.3, sfx: "typing", vol: 0.14, max: 0.6 }, { t: 0.88, sfx: "notification", vol: 0.32 }, { t: 3.05, sfx: "pop", vol: 0.24 }, { t: 3.45, sfx: "click-soft", vol: 0.28 }],
});

// ================= s07 · Martín compra en la segunda (2.13) =================
escena("s07-compra", {
  css: `
    P .hoja .hj-n { font-size: 52px; } P .hoja .hj-l { gap: 24px; }
    P .hoja.a { opacity: 0.55; background: ${GRIS2}; border-color: ${GRIS}; box-shadow: 10px 10px 0 ${GRIS}; }
    P .hoja.a .hj-n, P .hoja.a .hj-tot { color: ${N3}; } P .hoja.a .hj-tot { border-color: ${GRIS}; } P .hoja.a .hj-tot b { background: ${GRIS}; } P .hoja.a .hj-l i { background: ${W}; }
    P .est { margin-top: 24px; display: inline-flex; align-items: center; gap: 12px; padding: 10px 18px 10px 10px; border-radius: 999px; font: 700 30px/1 "Lexend", sans-serif; }
    P .hoja.a .est { background: ${W}; color: ${REDT}; }
    P .hoja.b .est { background: ${G}; color: ${N}; }
    P .sello { position: absolute; left: 560px; top: 1150px; padding: 18px 30px; border: 9px solid ${N}; border-radius: 22px; background: ${G}; font: 900 76px/1 "Lexend", sans-serif; color: ${N}; letter-spacing: 0.02em; opacity: 0; box-shadow: 10px 10px 0 ${N}; }
    P .nombre { position: absolute; top: 1420px; width: 470px; text-align: center; font: 800 44px/1 "Lexend", sans-serif; }
    P .nombre.a { left: 50px; color: ${GRIS}; } P .nombre.b { left: 560px; color: ${N}; }`,
  html: `
      ${hoja("a", 60, 620, 420, "Baño · Martín", `<div class="est">${equis(18)}Sin noticias</div>`)}
      ${hoja("b", 560, 620, 460, "Baño · Martín", `<div class="est">${tick(18)}Vendido</div>`)}
      <div class="sello">VENDIDO</div>
      <div class="nombre a">El Tornillo</div><div class="nombre b">La Tuerca</div>`,
  js: `
      gsap.set(q(".hoja.b .est"), { opacity: 0 });
      tl.fromTo(q(".hoja.a"), { x: -500, rotation: -4 }, { x: 0, rotation: -3, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".hoja.b"), { x: 600, rotation: 4 }, { x: 0, rotation: 2, duration: 0.4, ease: "power3.out" }, 0.05);
      tl.fromTo(qa(".nombre"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }, 0.3);
      // "compra en la segunda": cae el sello
      tl.fromTo(q(".sello"), { opacity: 0, scale: 2.2, rotation: -16, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -8, duration: 0.25, ease: "power4.in" }, 0.9);
      temblor(".hoja.b", 1.15);
      tl.fromTo(q(".hoja.b .est"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 1.2);
      tl.to(q(".hoja.a"), { opacity: 0.35, y: 30, duration: 0.5 }, 1.2);
      salida(1.95);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 1.13, sfx: "impact-bass-1", vol: 0.3, max: 0.7 }, { t: 1.2, sfx: "chime", vol: 0.24 }],
});

// ================= s08 · el giro (2.94) =================
const B8 = 1500;
escena("s08-giro", {
  css: `
    P .igual { position: absolute; left: 470px; top: 1100px; width: 140px; height: 140px; border-radius: 50%; background: ${N}; font: 900 110px/128px "Lexend", sans-serif; text-align: center; color: ${W}; opacity: 0; }
    P .ok { position: absolute; top: 1550px; width: 540px; display: flex; justify-content: center; opacity: 0; }
    P .ok span { display: inline-flex; align-items: center; gap: 14px; font: 700 42px/1 "Lexend", sans-serif; color: ${N}; }
    P .ok.a { left: 0; } P .ok.b { left: 540px; }
    P .glob { position: absolute; top: 590px; width: 420px; padding: 26px 30px; border-radius: 34px; font: 800 46px/1.15 "Lexend", sans-serif; opacity: 0; }
    P .glob.b { left: 600px; width: 440px; background: ${G}; border: 7px solid ${N}; color: ${N}; border-bottom-left-radius: 8px; box-shadow: 10px 10px 0 ${N}; }
    P .glob.a { left: 60px; width: 380px; height: 150px; border: 7px dashed ${RED}; background: transparent; border-bottom-right-radius: 8px; }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        ${DIV(840, B8)}${PISO(B8)}
        ${fachada("fzL", 270, B8, "EL TORNILLO", false)}
        ${fachada("fzR", 810, B8, "LA TUERCA", true)}
      </svg>
      <div class="glob a"></div><div class="glob b">Martín, ¿pudiste verlo?</div>
      <div class="igual">=</div>
      <div class="ok a"><span>${tick(24)}Buen precio</span></div><div class="ok b"><span>${tick(24)}Buen precio</span></div>`,
  js: `
      tl.fromTo(q(".fzL"), { x: -560 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".fzR"), { x: 560 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      dibujar(".div", 0.25, 0.4);
      // "buen precio" en las dos
      pop(".ok", 0.6, 0.3);
      tl.fromTo(q(".igual"), { opacity: 0, scale: 0.3, rotation: -90, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2)" }, 0.75);
      // "Una sola volvió a escribir"
      tl.to(q(".igual"), { opacity: 0, scale: 0.5, duration: 0.2 }, 1.4);
      tl.to(q(".fzL"), { opacity: 0.4, duration: 0.35 }, 1.45);
      tl.to(q(".ok.a"), { opacity: 0.4, duration: 0.35 }, 1.45);
      tl.fromTo(q(".glob.a"), { opacity: 0, scale: 0.8, transformOrigin: "100% 100%" }, { opacity: 0.8, scale: 1, duration: 0.3 }, 1.5);
      tl.fromTo(q(".glob.b"), { opacity: 0, scale: 0.5, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2)" }, 1.88);
      latido(".fzR", 2.0, 1.03);
      latido(".glob.b", 2.3, 1.06);
      salida(2.76);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.6, sfx: "ping", vol: 0.22 }, { t: 0.75, sfx: "impact-bass-1", vol: 0.2, max: 0.6 }, { t: 1.88, sfx: "notification", vol: 0.3 }],
});

// ================= s09 · a tu medida (2.55) =================
const FILAS9 = [["Martín · Baño", "VENDIDO", "v"], ["Laura · Pintura", "ESCRIBIR HOY", "n"], ["Carlos · Techo", "ENVIADO", "c"], ["Obra Pocitos", "VENCE VIERNES", "r"]];
const LAPTOP = (cls) => `
  <div class="lap ${cls}">
    <div class="lap-s"><div class="lap-p">
      <div class="lp-h">TU FERRETERÍA · CRM</div>
      ${FILAS9.map(([n, e, k], i) => `<div class="lp-f" style="top:${124 + i * 104}px"><span class="lp-n">${n}</span><span class="lp-e ${k}">${e}</span></div>`).join("")}
    </div></div>
    <div class="lap-b"></div>
  </div>`;
const CSS_LAP = `
    P .lap { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .lap-s { position: absolute; left: 90px; top: 620px; width: 900px; height: 600px; border-radius: 34px; background: ${N}; }
    P .lap-p { position: absolute; left: 20px; top: 20px; right: 20px; bottom: 20px; border-radius: 20px; background: ${W}; overflow: hidden; }
    P .lp-h { position: absolute; left: 0; top: 0; right: 0; height: 100px; background: ${G}; padding-left: 36px; font: 800 44px/100px "Lexend", sans-serif; color: ${N}; letter-spacing: -0.01em; }
    P .lp-f { position: absolute; left: 30px; right: 30px; height: 88px; border-bottom: 4px solid ${BUR}; display: flex; align-items: center; justify-content: space-between; }
    P .lp-n { font: 700 40px/1 "Lexend", sans-serif; color: ${N}; }
    P .lp-e { padding: 10px 16px; border-radius: 14px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; }
    P .lp-e.v { background: ${G}; color: ${N}; } P .lp-e.n { background: ${N}; color: ${W}; }
    P .lp-e.c { border: 4px solid ${N}; color: ${N}; } P .lp-e.r { background: ${RED}; color: ${W}; }
    P .lap-b { position: absolute; left: 30px; top: 1220px; width: 1020px; height: 56px; border-radius: 0 0 30px 30px; background: ${N}; }
    P .lap-b::after { content: ""; position: absolute; left: 430px; top: 0; width: 160px; height: 14px; border-radius: 0 0 10px 10px; background: ${N3}; }`;
let regla = "";
for (let i = 0; i <= 30; i++) {
  const x = 90 + i * 30;
  regla += `<path class="mk" d="M${x} 1346 V${1346 + (i % 5 === 0 ? 50 : 28)}" stroke="${N}" stroke-width="6" stroke-linecap="round"/>`;
}
escena("s09-medida", {
  css: CSS_LAP + `
    P .cinta { position: absolute; left: 70px; top: 1330px; width: 940px; height: 110px; border-radius: 16px; background: ${G}; border: 6px solid ${N}; transform-origin: 0 50%; }
    P svg.reg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }`,
  html: `
      ${LAPTOP("l9")}
      <div class="cinta"></div>
      <svg class="reg" viewBox="0 0 1080 1920" aria-hidden="true">${regla}<path class="flecha" d="M120 1490 H960 M120 1490 l26 -20 M120 1490 l26 20 M960 1490 l-26 -20 M960 1490 l-26 20" fill="none" stroke="${N}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${pill(1, 540, 1580, "A tu medida", "lleno")}`,
  js: `
      gsap.set(qa(".lp-f"), { opacity: 0 });
      tl.fromTo(qa(".lap-s, .lap-b"), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", stagger: 0.05 }, 0);
      tl.fromTo(q(".lp-h"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.35, ease: "power3.out" }, 0.22);
      qa(".lp-f").forEach((f, i) => tl.fromTo(f, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }, 0.45 + i * 0.12));
      // "lo armamos a tu medida": la cinta de medir
      tl.fromTo(q(".cinta"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.out" }, 1.15);
      qa(".mk").forEach((m, i) => { gsap.set(m, { opacity: 0 }); tl.set(m, { opacity: 1 }, 1.2 + i * 0.013); });
      dibujar(".flecha", 1.62, 0.32);
      pop(".n1", 1.66);
      latido(".lap-s", 1.7, 1.02);
      salida(2.38);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.45, sfx: "typing", vol: 0.14, max: 0.5 }, { t: 1.15, sfx: "whoosh-short", vol: 0.18 }, { t: 1.66, sfx: "pop", vol: 0.26 }],
});

// ================= s10 · CTA =================
escena("s10-cta", {
  css: CSS_LAP + `
    P .vc { position: absolute; left: 79px; top: 590px; width: 922px; height: 460px; border-radius: 70px; background: ${N}; opacity: 0; box-shadow: 18px 18px 0 rgba(11,18,32,0.3); }
    P .vc-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 56px; background: ${N2}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 376px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 200px; top: 80px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: ${N}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: ${W}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${N}; }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1120px; text-align: center; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${N}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1262px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 118px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${N}; }
    P .t2 .selbox { background: rgba(92,230,17,0.35); }
    P .t3w { position: absolute; left: 0; right: 0; top: 1440px; text-align: center; opacity: 0; }
    P .t3 { display: inline-block; padding: 18px 44px 26px; border-radius: 28px; background: ${G}; border: 7px solid ${N}; box-shadow: 12px 12px 0 ${N}; font: 800 104px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${N}; }`,
  html: `
      <div class="capa lapg">${LAPTOP("l10")}</div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(84, N3, CR)}<div class="lbl">TU FERRETERÍA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${N}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${N}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><span class="selbox sb" style="left:0;top:0;right:0;bottom:0">${esquinas}</span><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
  js: `
      gsap.set(qa(".lp-f"), { opacity: 1 });
      const LG = q(".lapg");
      tl.to(LG, { scale: 0.8, y: -120, transformOrigin: "540px 900px", duration: 0.35, ease: "power3.in" }, 0);
      tl.to(LG, { opacity: 0, duration: 0.12 }, 0.3);
      tl.fromTo(q(".vc"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.3);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.4);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.4);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.68);
      caja(".sb", 0.78);
      tl.fromTo(q(".t3w"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 1.6);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 2.3);
      tl.to(q(".vc"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.3);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: 0.4, sfx: "pop", vol: 0.22 }, { t: 0.78, sfx: "click-soft", vol: 0.28 }, { t: 1.6, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
