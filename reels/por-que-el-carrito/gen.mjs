// Generador de escenas de reels/por-que-el-carrito (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Estilo "resultaaquee" copiado de por-que-el-service: UN objeto
// grande por escena y se transforma. Acá el protagonista es SIEMPRE el mismo celular gigante (700 x
// 1140) sobre navy liso, y lo que se transforma es su pantalla: carrito → producto elegido → envío,
// llamada, pantalla apagada → camino a medio hacer → notificación → tu negocio → presupuesto y
// pedido → mensaje automático → caja con tilde → videollamada.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));

const BG = "#0b1220", NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#b9b8ad";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const avatar = (s = 140, fondo = CR, fig = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;
const carro = (s = 80, c = NAVY) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><path d="M8 18 H22 L34 64 H80 L90 30 H27" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="82" r="8" fill="${c}"/><circle cx="74" cy="82" r="8" fill="${c}"/></svg>`;
const rayo = (s = 40, c = NAVY) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M23 2 L6 23 H18 L15 38 L33 15 H21 Z" fill="${c}"/></svg>`;

// zapatilla genérica (viewBox 460 x 260), verde de marca con suela navy
const ZAPA = (w = 460) => `
<svg class="zapa" width="${w}" height="${r2((w * 260) / 460)}" viewBox="0 0 460 260" aria-hidden="true">
  <path d="M24 198 Q18 128 70 116 L168 90 Q194 46 236 56 Q264 62 278 96 L302 126 Q394 130 434 166 Q454 184 448 204 L24 204 Z" fill="${G}"/>
  <path d="M302 126 Q394 130 434 166 Q454 184 448 204 L336 204 Q344 158 302 126 Z" fill="${GD}"/>
  <path d="M24 198 Q18 140 52 122 L64 198 Z" fill="${GD}"/>
  <path d="M74 156 Q160 140 236 176" stroke="${CR}" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M186 86 L222 106 M204 72 L240 92 M172 104 L204 122" stroke="${CR}" stroke-width="9" stroke-linecap="round"/>
  <rect x="12" y="198" width="448" height="48" rx="22" fill="${NAVY}"/>
  <rect x="12" y="196" width="448" height="14" rx="7" fill="${CR}"/>
</svg>`;

// presupuesto (hoja) y pedido (bolsa) para s07
const HOJA = `
<svg width="230" height="270" viewBox="0 0 230 270" aria-hidden="true">
  <path d="M30 20 H160 L210 70 V250 H30 Z" fill="${NAVY3}" transform="translate(12 12)"/>
  <path d="M30 20 H160 L210 70 V250 H30 Z" fill="#ffffff"/>
  <path d="M160 20 V70 H210 Z" fill="${GRIS}"/>
  <rect x="58" y="96" width="120" height="14" rx="7" fill="${NAVY3}"/>
  <rect x="58" y="132" width="96" height="14" rx="7" fill="${GRIS}"/>
  <rect x="58" y="168" width="110" height="14" rx="7" fill="${GRIS}"/>
  <text x="120" y="232" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="46" fill="${NAVY}">$ ···</text>
</svg>`;
const BOLSA = `
<svg width="230" height="270" viewBox="0 0 230 270" aria-hidden="true">
  <path d="M80 80 Q80 24 115 24 Q150 24 150 80" fill="none" stroke="${NAVY}" stroke-width="14" stroke-linecap="round"/>
  <path d="M30 76 H200 L214 254 H16 Z" fill="${NAVY3}" transform="translate(12 10)"/>
  <path d="M30 76 H200 L214 254 H16 Z" fill="${G}"/>
  <path d="M150 76 H200 L214 254 H170 Z" fill="${GD}"/>
  <rect x="58" y="140" width="110" height="70" rx="12" fill="#ffffff"/>
  <text x="113" y="186" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="30" fill="${NAVY}">LISTO</text>
</svg>`;
// caja con tilde (pedido retirado)
const CAJA = `
<svg class="caja-svg" width="520" height="470" viewBox="0 0 520 470" aria-hidden="true">
  <ellipse cx="260" cy="440" rx="220" ry="26" fill="rgba(11,18,32,0.25)"/>
  <polygon points="60,140 260,60 460,140 260,220" fill="#ffffff"/>
  <polygon points="60,140 260,220 260,430 60,350" fill="${CR}"/>
  <polygon points="260,220 460,140 460,350 260,430" fill="#d4d2c4"/>
  <polygon points="150,104 186,90 386,170 350,184" fill="${GD}"/>
  <polygon points="350,184 386,170 386,240 350,254" fill="${G}"/>
  <g transform="translate(330 300)"><circle r="92" fill="${G}"/><circle r="92" fill="none" stroke="${NAVY}" stroke-width="10"/><path d="M-44 2 L-12 34 L46 -28" fill="none" stroke="${NAVY}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>`;

// ---------- el celular ----------
// .tel: left 190, top 560, 700 x 1140 (borde crema 10) · .pan (pantalla): left 216, top 586, 648 x 1088
const TEL = (pantallas) => `
      <div class="telw"><div class="tel-sh"></div><div class="tel"><div class="pan">${pantallas}<div class="notch"></div></div></div></div>`;
const barra = (c = NAVY) => `<div class="hora" style="color:${c}">21:40</div>`;

// pantalla del carrito (s01-s03)
const CARRITO = `
        <div class="scr carrito">${barra()}
          <div class="ca-tit">Tu carrito</div>
          <div class="ca-ic">${carro(84, NAVY)}<b>1</b></div>
          <div class="ca-card"><div class="ca-zapa">${ZAPA(500)}</div></div>
          <div class="ca-nom">Zapatillas urbanas</div>
          <div class="ca-sub">TALLE 41 · VERDE</div>
          <div class="ca-row r1"><span>Subtotal</span><span>$ 2.490</span></div>
          <div class="ca-row r2"><span>Envío</span><span>$ 290</span></div>
          <div class="ca-btn">Finalizar compra</div>
        </div>`;

// notificación de la tienda (dentro de la pantalla)
const NOTI = (cls, t1, t2) => `
        <div class="noti ${cls}"><div class="ic">${carro(70, NAVY)}</div><div class="t0">TIENDA · AHORA</div><div class="t1">${t1}</div><div class="t2">${t2}</div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} * { box-sizing: border-box; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .telw { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    ${P} .tel-sh { position: absolute; left: 212px; top: 584px; width: 700px; height: 1140px; border-radius: 100px; background: #03060c; }
    ${P} .tel { position: absolute; left: 190px; top: 560px; width: 700px; height: 1140px; border-radius: 100px; background: ${NAVY3}; border: 10px solid ${CR}; }
    ${P} .pan { position: absolute; left: 16px; top: 16px; width: 648px; height: 1088px; border-radius: 76px; background: ${CR}; overflow: hidden; }
    ${P} .notch { position: absolute; left: 254px; top: 22px; width: 140px; height: 38px; border-radius: 19px; background: ${NAVY}; }
    ${P} .scr { position: absolute; left: 0; top: 0; width: 648px; height: 1088px; }
    ${P} .hora { position: absolute; left: 64px; top: 24px; font: 600 30px/1 "Lexend", sans-serif; }
    ${P} .ca-tit { position: absolute; left: 44px; top: 100px; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .ca-ic { position: absolute; left: 500px; top: 86px; width: 100px; height: 100px; }
    ${P} .ca-ic svg { position: absolute; left: 0; top: 4px; }
    ${P} .ca-ic b { position: absolute; left: 62px; top: -6px; width: 46px; height: 46px; border-radius: 23px; background: ${G}; border: 4px solid ${NAVY}; font: 800 26px/38px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    ${P} .ca-card { position: absolute; left: 36px; top: 210px; width: 576px; height: 400px; border-radius: 44px; background: #ffffff; border: 6px solid ${NAVY}; }
    ${P} .ca-zapa { position: absolute; left: 32px; top: 70px; }
    ${P} .ca-nom { position: absolute; left: 44px; top: 640px; font: 700 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ca-sub { position: absolute; left: 46px; top: 704px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.6); }
    ${P} .ca-row { position: absolute; left: 44px; width: 560px; height: 70px; display: flex; justify-content: space-between; align-items: center; font: 600 38px/1 "Lexend", sans-serif; color: ${NAVY}; border-top: 4px solid rgba(11,18,32,0.14); }
    ${P} .ca-row.r1 { top: 762px; } ${P} .ca-row.r2 { top: 836px; }
    ${P} .ca-btn { position: absolute; left: 36px; top: 940px; width: 576px; height: 112px; border-radius: 56px; background: ${G}; border: 6px solid ${NAVY}; font: 800 46px/100px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    ${P} .noti { position: absolute; left: 24px; top: 82px; width: 600px; height: 250px; border-radius: 44px; background: #ffffff; border: 6px solid ${NAVY}; box-shadow: 0 14px 0 rgba(3,6,12,0.35); opacity: 0; }
    ${P} .noti .ic { position: absolute; left: 26px; top: 64px; width: 120px; height: 120px; border-radius: 30px; background: ${G}; }
    ${P} .noti .ic svg { position: absolute; left: 24px; top: 24px; }
    ${P} .noti .t0 { position: absolute; left: 172px; top: 32px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.55); }
    ${P} .noti .t1 { position: absolute; left: 172px; top: 72px; width: 400px; font: 800 44px/1.05 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    ${P} .noti .t2 { position: absolute; left: 172px; top: 184px; font: 500 32px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }
    ${P} .pill { position: absolute; padding: 16px 34px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 42px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.5); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${NAVY}; color: #fff; font-weight: 800; }
    ${P} .pill svg { vertical-align: -6px; margin-left: 10px; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.14); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
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
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.08, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
      const TEL = q(".telw");
      const vibrar = (t, n) => tl.fromTo(TEL, { x: 0 }, { x: 10, duration: 0.05, ease: "none", yoyo: true, repeat: n ?? 5, immediateRender: false }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
`;

function escena(id, build) {
  const dur = ESC[id];
  const T = (i) => r2(pal[i].start - INI[id]); // segundo de la palabra i, relativo a la escena
  const { css = "", html, js, sfx } = build(T);
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
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map((s) => ({ ...s, t: r2(Math.max(0, s.t)) }))));
}

// ================= s01 · gancho =================
// cuadro 0: el gancho entero en grande + el celular con el carrito (achicado abajo)
escena("s01-gancho", (T) => ({
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 108px; text-align: center; font: 800 110px/1.0 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .tit .v { color: ${G}; display: inline-block; }`,
  html: `${TEL(CARRITO + NOTI("nt", "¿Te olvidaste algo?", "Tu carrito te espera"))}
      <div class="tit"><div>¿Por qué la</div><div>tienda online</div><div>te escribe si</div><div>dejás algo en</div><div>el <span class="v">carrito?</span></div></div>`,
  js: `
      // el celular empieza chico y bajo (debajo del título) y al final hace push-in a tamaño completo
      gsap.set(TEL, { scale: 0.8, y: 150, transformOrigin: "540px 560px" });
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(TEL, { rotation: -4 }, { rotation: 0, duration: 0.8, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".ca-zapa"), { scale: 0.9, rotation: -6, transformOrigin: "50% 60%" }, { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(2)" }, 0);
      // "te escribe": cae la notificación y vibra
      tl.fromTo(q(".nt"), { opacity: 0, y: -240 }, { opacity: 1, y: 0, duration: 0.42, ease: "back.out(1.5)" }, ${T(6) - 0.1});
      vibrar(${T(6) + 0.1}, 5);
      tl.to(q(".ca-tit"), { opacity: 0, duration: 0.1 }, ${T(6) + 0.2});
      // "carrito?": la palabra y el carrito laten
      latido(".tit .v", ${T(12)}, 1.08);
      latido(".ca-ic", ${T(12)}, 1.2);
      // se va el título y el celular entra a tamaño completo
      tl.to(q(".tit"), { opacity: 0, y: -80, duration: 0.3, ease: "power2.in" }, ${r2(ESC["s01-gancho"] - 0.55)});
      tl.to(q(".nt"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, ${r2(ESC["s01-gancho"] - 0.55)});
      tl.to(TEL, { scale: 1, y: 0, duration: 0.5, ease: "power3.inOut" }, ${r2(ESC["s01-gancho"] - 0.5)});
      tl.to(q(".ca-tit"), { opacity: 1, duration: 0.2 }, ${r2(ESC["s01-gancho"] - 0.3)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(6) - 0.1, sfx: "notification", vol: 0.36 }, { t: T(12), sfx: "pop", vol: 0.25 }],
}));

// ================= s02 · ya eligió =================
escena("s02-eligio", (T) => ({
  html: `${TEL(CARRITO)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 330, 1010, 470, 930, "g")}${lead(2, 790, 1100, 700, 990, "g")}${lead(3, 780, 1340, 660, 1250, "g")}</svg>
      ${pill(1, 310, 1040, `Talle 41 ${tick(22)}`, "lleno")}
      ${pill(2, 800, 1120, `Color ${tick(22)}`, "lleno")}
      ${pill(3, 780, 1360, `Cantidad 1 ${tick(22)}`, "lleno")}
      ${selbox("sb", 238, 1512, 604, 140)}`,
  js: `
      // push-in suave sobre el producto: lo eligió entero
      tl.fromTo(TEL, { scale: 1 }, { scale: 1.04, transformOrigin: "540px 1000px", duration: ${ESC["s02-eligio"]}, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".ca-zapa"), { y: 0 }, { y: -14, duration: 0.3, ease: "sine.out", yoyo: true, repeat: 1 }, 0);
      nota(1, ${T(15)});
      nota(2, ${T(17)});
      nota(3, ${r2(T(19) - 0.25)});
      // "ya eligió": el botón de compra queda marcado
      caja(".sb", ${T(19)});
      latido(".ca-btn", ${T(19)}, 1.06);
      fuera(".n1, .n2, .n3, .l1, .l2, .l3, .d1, .d2, .d3, .sb", ${r2(ESC["s02-eligio"] - 0.22)}, 0.18);`,
  sfx: [{ t: T(15) + 0.1, sfx: "pop", vol: 0.24 }, { t: T(17) + 0.1, sfx: "pop", vol: 0.24 }, { t: T(19) - 0.1, sfx: "pop", vol: 0.24 }, { t: T(19), sfx: "click-soft", vol: 0.28 }],
}));

// ================= s03 · algo lo frenó =================
const LLAMADA = `
        <div class="scr llamada">${barra(CR)}
          <div class="ll-t0">LLAMADA ENTRANTE</div>
          <div class="ll-av">${avatar(260, CR, NAVY3)}</div>
          <div class="ll-nom">Trabajo</div>
          <div class="ll-b ll-no"><svg width="70" height="70" viewBox="0 0 70 70"><path d="M10 40 Q35 18 60 40 L54 50 L44 44 L44 36 Q35 32 26 36 L26 44 L16 50 Z" fill="#fff"/></svg></div>
          <div class="ll-b ll-si"><svg width="70" height="70" viewBox="0 0 70 70"><path d="M10 40 Q35 18 60 40 L54 50 L44 44 L44 36 Q35 32 26 36 L26 44 L16 50 Z" fill="${NAVY}" transform="rotate(-135 35 38)"/></svg></div>
        </div>`;
escena("s03-freno", (T) => ({
  css: `
    P .llamada { background: ${NAVY2}; opacity: 0; }
    P .ll-t0 { position: absolute; left: 0; right: 0; top: 130px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.7); }
    P .ll-av { position: absolute; left: 194px; top: 210px; }
    P .ll-nom { position: absolute; left: 0; right: 0; top: 510px; text-align: center; font: 800 76px/1 "Lexend", sans-serif; color: #fff; }
    P .ll-b { position: absolute; top: 820px; width: 150px; height: 150px; border-radius: 75px; }
    P .ll-b svg { position: absolute; left: 40px; top: 40px; }
    P .ll-no { left: 96px; background: ${RED}; } P .ll-si { left: 402px; background: ${G}; }
    P .apagada { background: #03060c; opacity: 0; }
    P .reloj { position: absolute; left: 174px; top: 300px; width: 300px; height: 300px; opacity: 0; }
    P .ap-t { position: absolute; left: 0; right: 0; top: 650px; text-align: center; font: 800 64px/1.1 "Lexend", sans-serif; color: rgba(239,238,229,0.55); opacity: 0; }
    P .pausa { position: absolute; left: 470px; top: 960px; width: 150px; height: 150px; border-radius: 75px; background: ${RED}; border: 8px solid ${NAVY}; opacity: 0; }
    P .pausa i { position: absolute; top: 38px; width: 22px; height: 58px; border-radius: 6px; background: #fff; }`,
  html: `${TEL(CARRITO + LLAMADA + `
        <div class="scr apagada">
          <svg class="reloj" viewBox="0 0 300 300"><circle cx="150" cy="150" r="130" fill="none" stroke="rgba(239,238,229,0.5)" stroke-width="18"/><path class="aguja" d="M150 150 L150 64" stroke="rgba(239,238,229,0.5)" stroke-width="18" stroke-linecap="round"/><path d="M150 150 L208 182" stroke="rgba(239,238,229,0.5)" stroke-width="18" stroke-linecap="round"/></svg>
          <div class="ap-t">Después<br>lo veo</div>
        </div>`)}
      <div class="pausa"><i style="left:44px"></i><i style="left:76px"></i></div>
      ${selbox("r sb", 240, 1412, 600, 82)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 760, 1300, 720, 1412, "r")}</svg>
      ${pill(1, 720, 1270, "¿Encima envío?", "rl")}`,
  js: `
      // "frenó": el dedo no llega, el botón se apaga y sale la pausa
      tl.to(q(".ca-btn"), { backgroundColor: "${GRIS}", duration: 0.25 }, ${T(22)});
      pop(".pausa", ${T(22)}, 0.32, 0.3);
      tl.to(TEL, { y: 24, duration: 0.3, ease: "power2.out" }, ${T(22)});
      // "el envío": recuadro rojo en la fila
      caja(".sb", ${T(24) - 0.1});
      nota(1, ${T(24)});
      // "una llamada": entra la llamada y vibra
      fuera(".n1, .l1, .d1, .sb, .pausa", ${T(25) - 0.1}, 0.15);
      tl.fromTo(q(".llamada"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }, ${T(25) - 0.05});
      vibrar(${T(25) + 0.15}, 7);
      tl.set(q(".carrito"), { opacity: 0 }, ${T(25) + 0.25});
      tl.fromTo(q(".ll-si"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, ${T(26)});
      // "o lo dejó para después": la pantalla se apaga
      tl.to(q(".apagada"), { opacity: 1, duration: 0.3, ease: "power1.in" }, ${T(29) - 0.2});
      tl.set(qa(".carrito, .llamada"), { opacity: 0 }, ${T(29) + 0.15});
      tl.fromTo(q(".reloj"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.35, ease: "back.out(1.6)" }, ${T(29)});
      tl.fromTo(q(".aguja"), { rotation: 0 }, { rotation: 300, svgOrigin: "150 150", duration: 0.9, ease: "power1.inOut" }, ${T(29) + 0.1});
      tl.fromTo(q(".ap-t"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${T(31) - 0.1});
      tl.to(TEL, { y: 60, rotation: -3, transformOrigin: "540px 1130px", duration: 0.8, ease: "power2.inOut" }, ${T(29)});
      tl.to(TEL, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" }, ${r2(ESC["s03-freno"] - 0.32)});`,
  sfx: [{ t: T(22), sfx: "click", vol: 0.26 }, { t: T(24), sfx: "glitch-1", vol: 0.14, max: 0.4 }, { t: T(25), sfx: "notification", vol: 0.3 }, { t: T(29), sfx: "click-soft", vol: 0.25 }],
}));

// ================= s04 · quedó a medio camino =================
const PASOS = [
  { y: 190, txt: "Eligió" },
  { y: 470, txt: "Carrito" },
  { y: 750, txt: "Pagar" },
];
escena("s04-medio", (T) => ({
  css: `
    P .camino { background: ${CR}; }
    P .via { position: absolute; left: 150px; top: 250px; width: 26px; height: 560px; border-radius: 13px; background: rgba(11,18,32,0.16); }
    P .via-f { position: absolute; left: 150px; top: 250px; width: 26px; height: 280px; border-radius: 13px; background: ${G}; }
    P .paso { position: absolute; left: 88px; width: 150px; height: 150px; border-radius: 75px; background: ${G}; border: 8px solid ${NAVY}; }
    P .paso svg { position: absolute; left: 25px; top: 25px; }
    P .paso.no { background: ${CR}; border: 10px dashed rgba(11,18,32,0.4); }
    P .paso-t { position: absolute; left: 270px; font: 800 66px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .paso-t.no { color: rgba(11,18,32,0.4); }
    P .marca { position: absolute; left: 104px; top: 440px; width: 120px; height: 120px; border-radius: 30px; background: ${NAVY}; opacity: 0; }
    P .marca svg { position: absolute; left: 20px; top: 20px; }
    P .p-tit { position: absolute; left: 44px; top: 90px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.55); }
    P .tach { stroke: ${RED}; stroke-width: 10; stroke-linecap: round; fill: none; }`,
  html: `${TEL(`
        <div class="scr camino">${barra()}
          <div class="p-tit">TU COMPRA</div>
          <div class="via"></div><div class="via-f"></div>
          ${PASOS.map((p, i) => `<div class="paso ${i === 2 ? "no" : ""} ps${i}" style="top:${p.y}px">${i < 2 ? tick(50, "transparent", NAVY) : ""}</div><div class="paso-t ${i === 2 ? "no" : ""} pt${i}" style="top:${p.y + 44}px">${p.txt}</div>`).join("")}
          <div class="marca">${carro(80, G)}</div>
        </div>`)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="tach tx" d="M400 1600 L680 1600"/>${lead(2, 500, 1560, 430, 1470, "g")}</svg>
      ${pill(1, 540, 1600, "Se fue", "r")}
      ${pill(2, 600, 1600, "A un paso", "lleno")}`,
  js: `
      gsap.set(q(".via-f"), { scaleY: 0, transformOrigin: "50% 0%" });
      // la pantalla se prende con el camino de la compra
      tl.fromTo(q(".camino"), { opacity: 0, scale: 1.1, transformOrigin: "50% 40%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      qa(".paso, .paso-t").forEach((p, i) => pop(p, 0.08 + (i % 3) * 0.08, 0.3, 0.5));
      // "No se fue": "Se fue" tachado
      nota(1, ${T(32)});
      dibujar(".tx", ${T(34)}, 0.25);
      fuera(".n1, .tx", ${T(35) - 0.1}, 0.18);
      // "quedó a medio camino": el carrito baja por la vía y se queda en el medio
      tl.set(q(".marca"), { opacity: 1 }, ${T(35)});
      tl.fromTo(q(".marca"), { y: -280 }, { y: 0, duration: 0.6, ease: "power2.out" }, ${T(35)});
      tl.to(q(".via-f"), { scaleY: 1, duration: 0.6, ease: "power2.out" }, ${T(35)});
      latido(".marca", ${T(38)}, 1.18);
      tl.to(qa(".ps2"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${T(38)});
      nota(2, ${T(38) + 0.05});
      fuera(".n2, .l2, .d2", ${r2(ESC["s04-medio"] - 0.2)}, 0.15);`,
  sfx: [{ t: 0, sfx: "click-soft", vol: 0.24 }, { t: T(32), sfx: "pop", vol: 0.24 }, { t: T(34), sfx: "click", vol: 0.26 }, { t: T(35), sfx: "whoosh-short", vol: 0.18 }, { t: T(38), sfx: "pop", vol: 0.26 }],
}));

// ================= s05 · la tienda le escribe sola =================
escena("s05-aviso", (T) => ({
  css: `
    P .lock { background: ${NAVY2}; }
    P .lk-h { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 700 170px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .lk-d { position: absolute; left: 0; right: 0; top: 310px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(239,238,229,0.65); }
    P .noti { top: 400px; }
    P .guard { position: absolute; left: 24px; top: 690px; width: 600px; height: 360px; border-radius: 44px; background: #ffffff; border: 6px solid ${NAVY}; opacity: 0; }
    P .g-zapa { position: absolute; left: 22px; top: 40px; }
    P .g-t1 { position: absolute; left: 30px; top: 196px; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .g-ok { position: absolute; left: 30px; top: 262px; height: 66px; padding: 0 26px 0 14px; border-radius: 33px; background: ${G}; font: 800 36px/66px "Lexend", sans-serif; color: ${NAVY}; display: flex; align-items: center; gap: 12px; }
    P .g-btn { position: absolute; left: 330px; top: 262px; height: 66px; width: 240px; border-radius: 33px; background: ${NAVY}; font: 700 34px/66px "Lexend", sans-serif; color: #fff; text-align: center; }`,
  html: `${TEL(`
        <div class="scr lock">${barra(CR)}
          <div class="lk-h">21:40</div><div class="lk-d">MARTES 4 · NOV</div>
          ${NOTI("nt", "Te guardamos el carrito", "¿Lo terminás ahora?")}
          <div class="guard"><div class="g-zapa">${ZAPA(270)}</div><div class="g-t1">Zapatillas · talle 41</div>
            <div class="g-ok">${tick(22, NAVY, G)} Guardado</div><div class="g-btn">Comprar</div></div>
        </div>`)}
      ${pill(1, 540, 1690, `Sale solo ${rayo(40, NAVY)}`, "lleno")}`,
  css2: "",
  js: `
      tl.fromTo(q(".lock"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0);
      tl.fromTo(q(".lk-h"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0);
      // "escribe": cae la notificación
      tl.fromTo(q(".nt"), { opacity: 0, y: -300 }, { opacity: 1, y: 0, duration: 0.42, ease: "back.out(1.5)" }, ${T(42) - 0.15});
      vibrar(${T(42) + 0.1}, 5);
      // "sola"
      nota(1, ${T(43)});
      // "con el carrito guardado": la notificación se abre y aparece el carrito guardado
      tl.fromTo(q(".guard"), { opacity: 0, y: -140, scaleY: 0.4, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, scaleY: 1, duration: 0.4, ease: "back.out(1.4)" }, ${T(46) - 0.15});
      pop(".g-ok", ${T(47)}, 0.32, 0.4);
      latido(".g-btn", ${T(47) + 0.45}, 1.08);
      tl.to(TEL, { scale: 1.05, transformOrigin: "540px 1300px", duration: 1.2, ease: "sine.inOut" }, ${T(43)});
      fuera(".n1", ${r2(ESC["s05-aviso"] - 0.25)}, 0.18);
      tl.to(TEL, { scale: 1, duration: 0.25, ease: "power2.in" }, ${r2(ESC["s05-aviso"] - 0.27)});`,
  sfx: [{ t: T(42) - 0.15, sfx: "notification", vol: 0.38 }, { t: T(43), sfx: "pop", vol: 0.24 }, { t: T(46), sfx: "whoosh-short", vol: 0.16 }, { t: T(47), sfx: "chime", vol: 0.22 }],
}));

// ================= s06 · en tu negocio pasa lo mismo =================
const CLIENTES = [
  { n: "Martín", s: "Pidió presupuesto" },
  { n: "Sofía", s: "Encargó y no vino" },
  { n: "Laura", s: "Preguntó el precio" },
];
escena("s06-negocio", (T) => ({
  css: `
    P .neg { background: ${CR}; }
    P .ng-head { position: absolute; left: 0; top: 0; width: 648px; height: 250px; background: ${G}; }
    P .ng-ic { position: absolute; left: 44px; top: 96px; width: 120px; height: 120px; border-radius: 30px; background: ${NAVY}; }
    P .ng-ic svg { position: absolute; left: 18px; top: 18px; }
    P .ng-t { position: absolute; left: 190px; top: 112px; font: 800 66px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .ng-s { position: absolute; left: 192px; top: 186px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.65); }
    P .cli { position: absolute; left: 30px; width: 588px; height: 230px; border-radius: 40px; background: #ffffff; border: 6px solid ${NAVY}; }
    P .cli .av { position: absolute; left: 26px; top: 46px; }
    P .cli .nm { position: absolute; left: 186px; top: 52px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .cli .st { position: absolute; left: 186px; top: 124px; font: 600 34px/1 "Lexend", sans-serif; color: ${RED}; }
    P .cli .pt { position: absolute; right: 30px; top: 40px; width: 36px; height: 36px; border-radius: 18px; background: ${RED}; }`,
  html: `${TEL(`
        <div class="scr neg">
          <div class="ng-head">${barra()}<div class="ng-ic"><svg width="84" height="84" viewBox="0 0 84 84"><path d="M8 34 L14 10 H70 L76 34 Z" fill="${G}"/><rect x="12" y="34" width="60" height="42" fill="${CR}"/><rect x="34" y="50" width="16" height="26" fill="${NAVY3}"/></svg></div>
            <div class="ng-t">Tu negocio</div><div class="ng-s">CLIENTES A UN PASO</div></div>
          ${CLIENTES.map((c, i) => `<div class="cli c${i}" style="top:${290 + i * 260}px"><div class="av">${avatar(140, NAVY3, CR)}</div><div class="nm">${c.n}</div><div class="st">${c.s}</div><i class="pt"></i></div>`).join("")}
        </div>`)}
      ${pill(1, 540, 1640, "Pasa lo mismo", "lleno")}`,
  js: `
      // la pantalla bloqueada se da vuelta y es tu negocio
      tl.fromTo(q(".neg"), { opacity: 0, rotationY: -70, transformOrigin: "0% 50%" }, { opacity: 1, rotationY: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".ng-t"), { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, ${T(50) - 0.05});
      qa(".cli").forEach((c, i) => tl.fromTo(c, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.5)" }, ${T(51)} + i * 0.16));
      nota(1, ${T(53) - 0.05});
      tl.fromTo(TEL, { scale: 1 }, { scale: 1.04, transformOrigin: "540px 1000px", duration: ${ESC["s06-negocio"]}, ease: "sine.inOut" }, 0);
      fuera(".n1", ${r2(ESC["s06-negocio"] - 0.2)}, 0.15);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(51), sfx: "pop", vol: 0.2 }, { t: T(51) + 0.32, sfx: "pop", vol: 0.2 }, { t: T(53), sfx: "pop", vol: 0.24 }],
}));

// ================= s07 · el presupuesto y el pedido =================
escena("s07-casos", (T) => ({
  css: `
    P .casos { background: ${CR}; }
    P .cs { position: absolute; left: 24px; width: 600px; height: 470px; border-radius: 44px; background: #ffffff; border: 6px solid ${NAVY}; opacity: 0; }
    P .cs.a { top: 84px; } P .cs.b { top: 586px; }
    P .cs .ob { position: absolute; left: 20px; top: 40px; }
    P .cs .k { position: absolute; left: 270px; top: 70px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .cs .t { position: absolute; left: 270px; top: 112px; font: 800 52px/1.08 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .cs .st { position: absolute; left: 30px; top: 344px; height: 86px; padding: 0 30px; border-radius: 43px; background: ${RED}; font: 800 40px/86px "Lexend", sans-serif; color: #fff; opacity: 0; }
    P .cs .ok { position: absolute; left: 30px; top: 344px; height: 86px; padding: 0 30px; border-radius: 43px; background: ${G}; font: 800 40px/86px "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }`,
  html: `${TEL(`
        <div class="scr casos">${barra()}
          <div class="cs a"><div class="ob">${HOJA}</div><div class="k">PRESUPUESTO</div><div class="t">Enviado<br>a Martín</div><div class="st">Sin respuesta</div><div class="ok">A un paso</div></div>
          <div class="cs b"><div class="ob">${BOLSA}</div><div class="k">PEDIDO</div><div class="t">Pronto<br>para Sofía</div><div class="st">No lo retiró</div><div class="ok">A un paso</div></div>
        </div>`)}`,
  js: `
      tl.fromTo(q(".casos"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
      // "pidió presupuesto"
      tl.fromTo(q(".cs.a"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.02);
      tl.fromTo(q(".cs.a .ob"), { rotation: -12 }, { rotation: 0, transformOrigin: "50% 100%", duration: 0.5, ease: "back.out(2)" }, 0.1);
      pop(".cs.a .st", ${T(57) + 0.1}, 0.3, 0.5);
      // "encargó y no pasó a buscar"
      tl.fromTo(q(".cs.b"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ${T(60) - 0.15});
      tl.fromTo(q(".cs.b .ob"), { y: 30 }, { y: 0, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, ${T(60)});
      pop(".cs.b .st", ${T(62)}, 0.3, 0.5);
      latido(".cs.b .st", ${T(65)}, 1.08);
      // los dos, a un paso
      fuera(".cs .st", ${r2(T(65) + 0.3)}, 0.12);
      pop(".cs .ok", ${r2(T(65) + 0.35)}, 0.3, 0.5);
      tl.to(TEL, { scale: 1.04, transformOrigin: "540px 1100px", duration: 1.0, ease: "sine.inOut" }, ${T(60)});
      tl.to(TEL, { scale: 1, duration: 0.25, ease: "power2.in" }, ${r2(ESC["s07-casos"] - 0.27)});`,
  sfx: [{ t: 0.02, sfx: "pop", vol: 0.22 }, { t: T(57) + 0.1, sfx: "glitch-1", vol: 0.12, max: 0.35 }, { t: T(60) - 0.15, sfx: "pop", vol: 0.22 }, { t: T(62), sfx: "glitch-1", vol: 0.12, max: 0.35 }, { t: T(65) + 0.35, sfx: "ping", vol: 0.22 }],
}));

// ================= s08 · lo manda una automatización =================
escena("s08-automatico", (T) => ({
  css: `
    P .chat { background: ${CR}; }
    P .ch-head { position: absolute; left: 0; top: 0; width: 648px; height: 230px; background: ${NAVY}; }
    P .ch-av { position: absolute; left: 40px; top: 84px; }
    P .ch-n { position: absolute; left: 180px; top: 100px; font: 800 54px/1 "Lexend", sans-serif; color: #fff; }
    P .ch-s { position: absolute; left: 182px; top: 168px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${G}; }
    P .bub { position: absolute; padding: 28px 34px; font: 600 46px/1.22 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }
    P .yo { right: 28px; top: 270px; width: 540px; border-radius: 40px 40px 10px 40px; background: ${G}; border: 6px solid ${NAVY}; }
    P .yo small { display: block; margin-top: 14px; font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.08em; color: rgba(11,18,32,0.7); }
    P .auto { position: absolute; left: 54px; top: 650px; width: 540px; height: 92px; border-radius: 46px; background: ${NAVY}; font: 500 32px/92px "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${G}; text-align: center; opacity: 0; }
    P .auto svg { vertical-align: -8px; margin-right: 8px; }
    P .ella { left: 28px; top: 790px; white-space: nowrap; border-radius: 40px 40px 40px 10px; background: #ffffff; border: 6px solid ${NAVY}; }
    P .fin { position: absolute; left: 0; top: 0; width: 648px; height: 1088px; background: ${CR}; opacity: 0; }
    P .fin-caja { position: absolute; left: 64px; top: 230px; }
    P .fin-t { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font: 800 76px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .fin-s { position: absolute; left: 0; right: 0; top: 860px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }`,
  html: `${TEL(`
        <div class="scr chat">
          <div class="ch-head">${barra(CR)}<div class="ch-av">${avatar(116, CR, NAVY3)}</div><div class="ch-n">Sofía</div><div class="ch-s">EN LÍNEA</div></div>
          <div class="bub yo">Hola Sofía, tu pedido está pronto. ¿Pasás hoy?<small>ENVIADO SOLO · 10:00</small></div>
          <div class="auto">${rayo(34, G)}AVISO AUTOMÁTICO</div>
          <div class="bub ella">¡Sí! Paso a las 6.</div>
          <div class="fin"><div class="fin-caja">${CAJA}</div><div class="fin-t">Retirado</div><div class="fin-s">PEDIDO DE SOFÍA</div></div>
        </div>`)}
      ${pill(2, 540, 1640, "En el momento justo", "g")}`,
  js: `
      tl.fromTo(q(".chat"), { opacity: 0, scale: 1.08, transformOrigin: "50% 30%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      // "aviso": sale el mensaje
      tl.fromTo(q(".yo"), { opacity: 0, y: 60, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ${T(67)});
      // "automatización"
      pop(".auto", ${T(72) - 0.1}, 0.34, 0.5);
      latido(".yo", ${T(72)}, 1.04);
      // "en el momento justo": contesta y se vuelve la caja con tilde
      pop(".n2", ${T(73)}, 0.3, 0.6);
      tl.fromTo(q(".ella"), { opacity: 0, y: 60, scale: 0.85, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ${T(75) - 0.2});
      fuera(".n2", ${T(76) - 0.05}, 0.18);
      tl.to(qa(".yo, .ella, .auto"), { scale: 0.4, opacity: 0, y: 200, duration: 0.3, ease: "power2.in" }, ${T(76)});
      tl.to(q(".fin"), { opacity: 1, duration: 0.2 }, ${T(76) + 0.1});
      tl.fromTo(q(".fin-caja"), { scale: 0.4, y: 120, transformOrigin: "50% 100%" }, { scale: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" }, ${T(76) + 0.1});
      tl.fromTo(qa(".fin-t, .fin-s"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${T(76) + 0.3});`,
  sfx: [{ t: T(67), sfx: "notification", vol: 0.32 }, { t: T(72) - 0.1, sfx: "pop", vol: 0.24 }, { t: T(73), sfx: "pop", vol: 0.22 }, { t: T(75) - 0.2, sfx: "ping", vol: 0.24 }, { t: T(76) + 0.1, sfx: "chime", vol: 0.3 }],
}));

// ================= s09 · CTA =================
escena("s09-cta", (T) => ({
  css: `
    P .fin { position: absolute; left: 0; top: 0; width: 648px; height: 1088px; background: ${CR}; }
    P .fin-caja { position: absolute; left: 64px; top: 230px; }
    P .fin-t { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font: 800 76px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .fin-s { position: absolute; left: 0; right: 0; top: 860px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }
    P .vc { background: ${NAVY}; opacity: 0; }
    P .vc-a { position: absolute; left: 30px; top: 100px; width: 588px; height: 520px; border-radius: 44px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 184px; top: 110px; }
    P .lbl { position: absolute; left: 24px; bottom: 24px; padding: 10px 18px; border-radius: 14px; background: rgba(11,18,32,0.8); font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 30px; top: 650px; width: 588px; height: 250px; border-radius: 44px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .vc-btn { position: absolute; left: 264px; top: 930px; width: 120px; height: 120px; border-radius: 60px; background: ${G}; border: 6px solid ${CR}; }
    P .vc-btn svg { position: absolute; left: 22px; top: 30px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1210px; text-align: center; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1346px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 1520px; text-align: center; font: 800 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; opacity: 0; }`,
  html: `${TEL(`
        <div class="fin"><div class="fin-caja">${CAJA}</div><div class="fin-t">Retirado</div><div class="fin-s">PEDIDO DE SOFÍA</div></div>
        <div class="scr vc">
          <div class="vc-a">${avatar(220)}<div class="lbl">TU NEGOCIO</div></div>
          <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
          <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
        </div>`)}
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      // "¿Lo armamos en tu negocio?": la caja da paso a la videollamada, el celular se achica arriba
      tl.to(q(".fin-caja"), { rotation: 6, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.1);
      tl.to(q(".vc"), { opacity: 1, duration: 0.3 }, ${T(81) - 0.1});
      tl.set(q(".fin"), { opacity: 0 }, ${T(81) + 0.25});
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, ${T(81)});
      tl.to(TEL, { scale: 0.62, y: -110, transformOrigin: "540px 600px", duration: 0.6, ease: "power3.inOut" }, ${T(82) - 0.35});
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(84) - 0.15});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(85) - 0.1});
      caja(".sb", ${T(85) + 0.1});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${T(87)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, ${T(87) + 0.5});
      tl.to(TEL, { y: -124, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${T(87) + 0.3});`,
  sfx: [{ t: T(81) - 0.1, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: T(81), sfx: "pop", vol: 0.22 }, { t: T(84) - 0.15, sfx: "whoosh-short", vol: 0.2 }, { t: T(85) + 0.1, sfx: "click-soft", vol: 0.28 }, { t: T(87), sfx: "chime", vol: 0.3 }],
}));

console.log("escenas escritas:", Object.keys(ESC).join(", "), "· total", DUR);
