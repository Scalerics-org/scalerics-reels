// Generador de escenas de reels/sabado-mediodia (correr desde la carpeta del reel, después
// `node armar.mjs`; después de esto, `node armar.mjs` otra vez para que tome los .sfx.json).
// Formato "Rutina + punto de dolor" (motion de TikTok): sábado 12:00 en una rotisería, el reloj
// corre arriba, interfaz recreada GRANDE (chat del agente, comandas de cocina con tilde verde).
// Fondo navy liso #0b1220; cierre con fondo verde de marca y textos navy.
// Misma forma que reels/la-misma-pregunta/gen.mjs.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 32.41;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", CR2 = "#d6d4c6", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h) => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (cls, x, y, txt, kind = "") => `<div class="pill ${kind} ${cls}" style="left:${x}px;top:${y}px">${txt}</div>`;
const av = (letra, kind = "") => `<span class="av ${kind}">${letra}</span>`;
const bin = (cls, x, y, txt, quien = "", extra = "") =>
  `<div class="bw ${cls}" style="left:${x}px;top:${y}px${extra}">${quien ? `<div class="quien">${quien}</div>` : ""}<div class="b in">${txt}</div></div>`;
const bout = (cls, x, y, txt, extra = "") => `<div class="bw sale ${cls}" style="right:${1080 - x}px;top:${y}px${extra}"><div class="b out">${txt}</div></div>`;
const chispa = (s = 1, fill = NAVY) => `<path transform="scale(${s})" d="M0 -30 Q4 -4 30 0 Q4 4 0 30 Q-4 4 -30 0 Q-4 -4 0 -30 Z" fill="${fill}"/>`;

// bolsa de papel de la rotisería (viewBox 200 x 240)
const bolsa = (w = 200) => `<svg width="${w}" height="${r2(w * 1.2)}" viewBox="0 0 200 240" aria-hidden="true">
  <path d="M62 52 Q62 8 100 8 Q138 8 138 52" fill="none" stroke="${NAVY3}" stroke-width="12" stroke-linecap="round"/>
  <path d="M24 52 H176 L188 232 H12 Z" fill="${CR}"/>
  <path d="M140 52 H176 L188 232 H150 Z" fill="${CR2}"/>
  <rect x="18" y="112" width="164" height="54" fill="${G}"/><rect x="146" y="112" width="38" height="54" fill="${GD}"/>
  <path d="M24 52 L34 74 L46 52 L58 74 L70 52 L82 74 L94 52 L106 74 L118 52 L130 74 L142 52 L154 74 L166 52 L176 52" fill="none" stroke="${CR2}" stroke-width="6" stroke-linejoin="round"/>
</svg>`;
// persona en la fila (origen arriba a la izquierda, 150 x 250)
const persona = (fill = BORDE, cara = CR2) => `<svg width="150" height="250" viewBox="0 0 150 250" aria-hidden="true">
  <circle cx="75" cy="58" r="50" fill="${cara}"/>
  <path d="M6 250 Q6 124 75 120 Q144 124 144 250 Z" fill="${fill}"/>
</svg>`;
// dueño con delantal verde (150 x 250)
const duenio = `<svg width="150" height="250" viewBox="0 0 150 250" aria-hidden="true">
  <path d="M34 26 Q75 -8 116 26 L112 40 H38 Z" fill="#ffffff"/>
  <circle cx="75" cy="66" r="46" fill="${CR}"/>
  <path d="M6 250 Q6 128 75 122 Q144 128 144 250 Z" fill="${NAVY3}"/>
  <path d="M40 150 H110 V250 H40 Z" fill="${G}"/><path d="M40 150 Q75 132 110 150" fill="none" stroke="${G}" stroke-width="8"/>
</svg>`;
// celular chico (viewBox 360 x 560)
const celu = (badge = "3") => `<svg width="360" height="560" viewBox="0 0 360 560" aria-hidden="true">
  <rect x="10" y="14" width="340" height="540" rx="56" fill="#060b14"/>
  <rect x="0" y="0" width="340" height="540" rx="56" fill="${NAVY3}"/>
  <rect x="18" y="18" width="304" height="504" rx="42" fill="${NAVY2}"/>
  <rect x="120" y="32" width="100" height="26" rx="13" fill="#060b14"/>
  <rect x="40" y="96" width="220" height="64" rx="24" fill="${CR}"/>
  <rect x="40" y="184" width="180" height="64" rx="24" fill="${CR}"/>
  <rect x="40" y="272" width="240" height="64" rx="24" fill="${CR}"/>
  <rect x="40" y="360" width="160" height="64" rx="24" fill="${CR}" opacity="0.5"/>
  <circle cx="306" cy="34" r="54" fill="${RED}" stroke="${NAVY}" stroke-width="10"/>
  <text x="306" y="56" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="62" fill="#ffffff" class="celu-n">${badge}</text>
</svg>`;
// reloj de pared (viewBox 700 x 700); .hh / .mm son las agujas
const reloj = `<svg viewBox="0 0 700 700" aria-hidden="true">
  <circle cx="358" cy="366" r="330" fill="#060b14"/>
  <circle cx="350" cy="350" r="330" fill="${CR}"/>
  <circle cx="350" cy="350" r="296" fill="#ffffff"/>
  ${Array.from({ length: 12 }, (_, i) => `<rect x="341" y="70" width="18" height="${i % 3 ? 34 : 60}" rx="9" fill="${NAVY}" transform="rotate(${i * 30} 350 350)"/>`).join("")}
  <rect class="hh" x="338" y="180" width="24" height="182" rx="12" fill="${NAVY}"/>
  <rect class="mm" x="342" y="100" width="16" height="262" rx="8" fill="${G}"/>
  <circle cx="350" cy="350" r="28" fill="${NAVY}"/><circle cx="350" cy="350" r="10" fill="${G}"/>
</svg>`;
// el celular grande (s02, s06, s07): marco + cabecera
const TEL = (estado, avatar, badge = "") => `
      <div class="tel"><div class="tel-hd">
        <div class="tel-av">${avatar}</div>
        <div class="tel-n">La Esquina</div>
        <div class="tel-s">${estado}</div>
        ${badge}
      </div></div>`;
const AV_LOCAL = `<div style="position:absolute;left:14px;top:8px">${bolsa(70)}</div>`;
const AV_AGENTE = `<svg viewBox="-48 -48 96 96" width="96" height="96" class="chis">${chispa(1.15)}</svg>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: rgba(3, 6, 12, 0.6); }
    ${P} .pill { position: absolute; padding: 16px 34px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 40px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; font-weight: 800; }
    ${P} .selbox { position: absolute; border: 6px solid ${G}; background: rgba(92,230,17,0.12); opacity: 0; }
    ${P} .selbox i { position: absolute; width: 20px; height: 20px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox .k1 { left: -13px; top: -13px; } ${P} .selbox .k2 { right: -13px; top: -13px; } ${P} .selbox .k3 { left: -13px; bottom: -13px; } ${P} .selbox .k4 { right: -13px; bottom: -13px; }
    ${P} .bw { position: absolute; max-width: 720px; opacity: 0; }
    ${P} .bw.sale { display: flex; flex-direction: column; align-items: flex-end; }
    ${P} .quien { display: flex; align-items: center; gap: 16px; margin: 0 0 12px 6px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.7); white-space: nowrap; }
    ${P} .av { display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: ${NAVY3}; border: 4px solid ${BORDE}; font: 800 28px/48px "Lexend", sans-serif; text-align: center; color: ${CR}; letter-spacing: 0; }
    ${P} .av.c { background: ${CR}; border-color: ${CR}; color: ${NAVY}; }
    ${P} .b { display: inline-block; padding: 24px 36px 26px; font: 600 50px/1.2 "Lexend", sans-serif; border-radius: 40px; box-shadow: 0 12px 0 rgba(3,6,12,0.5); }
    ${P} .b.in { background: ${CR}; color: ${NAVY}; border-bottom-left-radius: 10px; }
    ${P} .b.out { background: ${G}; color: ${NAVY}; border-bottom-right-radius: 10px; }
    ${P} .tel { position: absolute; left: 90px; top: 510px; width: 900px; height: 1190px; border-radius: 72px; background: ${NAVY2}; border: 8px solid ${BORDE}; box-shadow: 0 20px 0 rgba(3,6,12,0.6); overflow: hidden; }
    ${P} .tel-hd { position: absolute; left: 0; right: 0; top: 0; height: 160px; background: ${NAVY3}; border-bottom: 6px solid ${BORDE}; }
    ${P} .tel-av { position: absolute; left: 34px; top: 30px; width: 100px; height: 100px; border-radius: 50%; background: ${NAVY}; border: 5px solid ${BORDE}; overflow: hidden; }
    ${P} .tel-av .chis { position: absolute; left: 0; top: 0; }
    ${P} .tel-n { position: absolute; left: 162px; top: 32px; font: 800 52px/1 "Lexend", sans-serif; color: #fff; }
    ${P} .tel-s { position: absolute; left: 164px; top: 100px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.7); white-space: nowrap; }
    ${P} .tel-b { position: absolute; right: 40px; top: 38px; min-width: 84px; height: 84px; padding: 0 18px; border-radius: 42px; background: ${RED}; font: 900 50px/84px "Lexend", sans-serif; text-align: center; color: #fff; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const entra = (s, t, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, y: desde ?? 60, scale: 0.92, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.6)" }, t);
      const sale = (s, t) => tl.fromTo(q(s), { opacity: 0, y: 50, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const latir = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.1, transformOrigin: "50% 50%", duration: 0.13, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t);
      const temblar = (s, t, n, dx) => tl.to(q(s), { x: dx ?? 8, duration: 0.05, yoyo: true, repeat: n ?? 5, ease: "none" }, t);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const cuenta = (s, v0, pasos, fmt) => {
        const el = q(s); const o = { v: v0 }; const f = fmt ?? ((v) => Math.round(v));
        el.textContent = f(v0);
        pasos.forEach(([t, v, d]) => {
          tl.to(o, { v, duration: d ?? 0.08, ease: "none", onUpdate: () => { el.textContent = f(o.v); } }, t);
        });
      };
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.03, duration: DUR - t, ease: "power2.in" }, t);
`;

function escena(id, { css = "", html, js, sfx }) {
  const dur = ESC[id];
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0" data-layout-allow-overlap>
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
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx).replace(/\},/g, "},\n ") + "\n");
}

// ================= ambiente: el reloj del sábado, arriba, todo el reel =================
{
  const T = (id, d = 0) => r2(INI[id] + d);
  // [segundo, hora]: el reloj corre mientras pasa el mediodía
  const HORAS = [[T("s02-mensajes"), "12:01"], [T("s03-a-la-vez"), "12:03"], [T("s04-masa"), "12:06"], [T("s04-masa", 1.9), "12:07"], [T("s05-agente"), "12:08"], [T("s07-pedido"), "12:09"], [T("s08-comanda"), "12:10"], [T("s09-giro"), "12:11"]];
  const T0 = T("s02-mensajes"), TDOLOR = T("s04-masa"), TAG = T("s05-agente"), TCTA = T("s10-cta");
  fs.writeFileSync("compositions/ambiente.html", `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] .amb-bar { position: absolute; left: 290px; top: 74px; width: 500px; height: 112px; border-radius: 56px; background: #16243d; border: 6px solid #2c4268; opacity: 0; }
    [data-composition-id="ambiente"] .amb-ic { position: absolute; left: 22px; top: 16px; width: 68px; height: 68px; }
    [data-composition-id="ambiente"] .amb-dia { position: absolute; left: 108px; top: 34px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.18em; color: rgba(239,238,229,0.75); }
    [data-composition-id="ambiente"] .amb-h { position: absolute; left: 266px; top: 14px; width: 200px; height: 74px; font: 800 66px/74px "Lexend", sans-serif; color: #ffffff; letter-spacing: -0.02em; }
    [data-composition-id="ambiente"] .amb-h span { position: absolute; left: 0; top: 0; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-bar">
        <svg class="amb-ic" viewBox="0 0 68 68" aria-hidden="true"><circle cx="34" cy="34" r="30" fill="#efeee5"/><path class="amb-mm" d="M34 34 V12" stroke="#0b1220" stroke-width="6" stroke-linecap="round"/><path d="M34 34 L46 40" stroke="#0b1220" stroke-width="6" stroke-linecap="round"/><circle cx="34" cy="34" r="5" fill="#5ce611"/></svg>
        <div class="amb-dia">SÁBADO</div>
        <div class="amb-h">${HORAS.map(([, h], i) => `<span class="amb-h${i}">${h}</span>`).join("")}</div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(q(".amb-bar"), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, ${T0});
      const H = ${JSON.stringify(HORAS)};
      H.forEach(([t], i) => {
        if (i > 0) tl.to(q(".amb-h" + (i - 1)), { opacity: 0, y: -22, duration: 0.14, ease: "power2.in" }, t);
        tl.fromTo(q(".amb-h" + i), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)" }, t + (i > 0 ? 0.08 : 0));
      });
      tl.to(q(".amb-mm"), { rotation: 360 * 5, svgOrigin: "34 34", duration: ${r2(TCTA - T0)}, ease: "none" }, ${T0});
      // en el punto de dolor el reloj se pone rojo apagado; con el agente, verde
      tl.to(q(".amb-bar"), { borderColor: "${RED}", duration: 0.25 }, ${TDOLOR});
      tl.to(q(".amb-h"), { color: "${RED}", duration: 0.25 }, ${TDOLOR});
      tl.to(q(".amb-bar"), { borderColor: "${G}", duration: 0.3 }, ${r2(TAG + 1.1)});
      tl.to(q(".amb-h"), { color: "${G}", duration: 0.3 }, ${r2(TAG + 1.1)});
      tl.to(q(".amb-bar"), { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" }, ${r2(TCTA - 0.25)});
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
}

// ================= s01 · gancho: sábado 12:00 =================
// 0.30 Sábado · 0.80 doce · 1.70 mostrador · 2.60 lleno · 3.20 WhatsApp · 3.80 sonando
const FILA = [[70, 1150, BORDE], [255, 1120, NAVY3], [440, 1160, BORDE], [625, 1124, NAVY3], [810, 1150, BORDE]];
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 900 140px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .tit2 { position: absolute; left: 0; right: 0; top: 262px; text-align: center; font: 900 96px/1.06 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit2 .v { color: ${G}; }
    P .rel { position: absolute; left: 40px; top: 520px; width: 600px; height: 600px; }
    P .rel svg { width: 600px; height: 600px; overflow: visible; }
    P .cel { position: absolute; left: 650px; top: 560px; width: 360px; height: 560px; }
    P .ondas { fill: none; stroke: ${G}; stroke-width: 8; stroke-linecap: round; }
    P .p { position: absolute; width: 150px; height: 250px; }
    P .mos { position: absolute; left: 30px; top: 1370px; width: 1020px; height: 300px; }
    P .mos-top { position: absolute; left: 0; top: 0; width: 1020px; height: 46px; border-radius: 18px; background: ${CR}; }
    P .mos-fr { position: absolute; left: 24px; top: 46px; width: 972px; height: 230px; background: ${CR2}; border-radius: 0 0 26px 26px; }
    P .mos-fr .fr { position: absolute; left: 0; right: 0; top: 74px; height: 70px; background: ${G}; font: 800 44px/70px "Lexend", sans-serif; text-align: center; color: ${NAVY}; letter-spacing: 0.24em; }
    P .bol { position: absolute; left: 760px; top: 1140px; }
    P .bol2 { position: absolute; left: 110px; top: 1200px; }`,
  html: `
      <div class="tit">Sábado, 12:00</div>
      <div class="tit2"><div>Mostrador lleno y</div><div class="v">WhatsApp sonando</div></div>
      <div class="rel">${reloj}</div>
      <div class="cel">${celu("3")}</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="ondas o1" d="M1022 640 Q1046 690 1022 740"/><path class="ondas o2" d="M1046 610 Q1080 690 1046 770"/>
        <path class="ondas o3" d="M640 640 Q616 690 640 740"/>
      </svg>
      ${FILA.map(([x, y, f], i) => `<div class="p p${i}" style="left:${x}px;top:${y}px">${persona(f)}</div>`).join("")}
      <div class="mos"><div class="mos-fr"><div class="fr">ROTISERÍA</div></div><div class="mos-top"></div></div>
      <div class="bol">${bolsa(180)}</div>`,
  js: `
      gsap.set(q(".hh"), { rotation: -2, svgOrigin: "350 350" });
      gsap.set(q(".mm"), { rotation: -30, svgOrigin: "350 350" });
      // cuadro 0: todo ya está; las cosas se mueven
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".rel"), { scale: 0.94, rotation: -4, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.6)" }, 0);
      // en "doce" el minutero llega a las 12 en punto
      tl.to(q(".mm"), { rotation: 0, svgOrigin: "350 350", duration: 0.35, ease: "back.out(2.6)" }, 0.75);
      tl.to(q(".hh"), { rotation: 0, svgOrigin: "350 350", duration: 0.35, ease: "back.out(2.6)" }, 0.75);
      latir(".rel", 1.1, 1.05);
      // mostrador lleno: la fila se aprieta y entra uno más
      [0, 1, 2, 3, 4].forEach((i) => tl.to(q(".p" + i), { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 1.7 + i * 0.07));
      tl.fromTo(q(".bol"), { y: -60, rotation: -8 }, { y: 0, rotation: 0, duration: 0.35, ease: "bounce.out" }, 2.6);
      latir(".mos", 2.6, 1.02);
      // WhatsApp sonando: el celu vibra, el número sube
      const vib = (t) => { tl.to(q(".cel"), { rotation: 5, transformOrigin: "50% 50%", duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, t); };
      vib(0.2); vib(3.2); vib(3.8); vib(4.35);
      [".o1", ".o2", ".o3"].forEach((s, i) => tl.fromTo(q(s), { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 5, ease: "none" }, 3.2 + i * 0.06));
      cuenta(".celu-n", 3, [[3.25, 4], [3.85, 5], [4.4, 6]]);
      latir(".cel", 3.85, 1.06);
      tl.to(qa(".tit, .tit2"), { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 4.55);
      salida(4.6);`,
  sfx: [{ t: 0.2, sfx: "notification", vol: 0.24 }, { t: 0.75, sfx: "click", vol: 0.3 }, { t: 2.6, sfx: "pop", vol: 0.24 }, { t: 3.2, sfx: "notification", vol: 0.32 }, { t: 3.85, sfx: "notification", vol: 0.3 }, { t: 4.4, sfx: "notification", vol: 0.26 }],
});

// ================= s02 · los mensajes: milanesas, tartas, a qué hora =================
// 0.0 ¿Tenés · 1.27 Dos tartas · 2.76 ¿A qué hora llega?
escena("s02-mensajes", {
  css: `
    P .bw { max-width: none; }
    P .b { font-size: 56px; white-space: nowrap; }`,
  html: `
      ${TEL("ROTISERÍA · SIN LEER", AV_LOCAL, `<div class="tel-b">3</div>`)}
      ${bin("m0", 130, 730, "¿Tenés milanesas?", `${av("L")}LAURA · 12:01`)}
      ${bin("m1", 130, 980, "Dos tartas para la una.", `${av("J", "c")}JORGE · 12:01`)}
      ${bin("m2", 130, 1230, "¿A qué hora llega?", `${av("V")}VALE · 12:02`)}
      ${bin("m3", 130, 1480, "¿Hacen envíos?", `${av("C", "c")}CARLOS · 12:02`)}`,
  js: `
      tl.fromTo(q(".tel"), { opacity: 0, y: 120, scale: 0.9, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, 0);
      tl.to(q(".tel"), { scale: 1.03, transformOrigin: "50% 40%", duration: 3.3, ease: "none" }, 0.35);
      const M = [[0.05, ".m0", 1], [1.27, ".m1", 2], [2.76, ".m2", 3], [3.3, ".m3", 4]];
      M.forEach(([t, s]) => { entra(s, t); latir(".tel-b", t + 0.05, 1.25); });
      cuenta(".tel-b", 0, M.map(([t, , v]) => [t + 0.05, v, 0.04]));
      salida(3.5);`,
  sfx: [{ t: 0.05, sfx: "notification", vol: 0.3 }, { t: 1.27, sfx: "notification", vol: 0.3 }, { t: 2.76, sfx: "notification", vol: 0.3 }, { t: 3.3, sfx: "notification", vol: 0.22 }],
});

// ================= s03 · hacés todo bien, pero no podés las dos cosas a la vez =================
// 0 Hacés · 0.61 bien · 1.35 Pero · 1.51 no · 2.11 despachar · 2.61 escribir · 3.01 a la vez
escena("s03-a-la-vez", {
  css: `
    P .cd { position: absolute; top: 530px; width: 470px; height: 780px; border-radius: 48px; background: ${NAVY2}; border: 8px solid ${BORDE}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); }
    P .cd-t { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: rgba(239,238,229,0.75); }
    P .cd-v { position: absolute; left: 0; right: 0; bottom: 44px; text-align: center; font: 800 52px/1 "Lexend", sans-serif; color: #fff; }
    P .izq { left: 50px; } P .der { left: 560px; }
    P .izq .ic { position: absolute; left: 115px; top: 140px; }
    P .der .ic { position: absolute; left: 55px; top: 120px; }
    P .ok { position: absolute; left: 330px; top: 110px; opacity: 0; }
    P .bdg { position: absolute; left: 0; right: 0; top: 560px; text-align: center; opacity: 0; }
    P .bdg span { display: inline-block; padding: 12px 28px; border-radius: 999px; background: ${G}; font: 800 38px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .der .bdg span { background: ${RED}; color: #fff; }
    P .yo { position: absolute; left: 465px; top: 1330px; width: 150px; height: 250px; }
    P .flecha { fill: none; stroke: ${CR}; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; opacity: 0.55; }
    P .cruz { position: absolute; left: 0; right: 0; top: 1610px; text-align: center; }`,
  html: `
      <div class="cd izq"><div class="cd-t">MOSTRADOR</div><div class="ic">${bolsa(240)}</div>
        <div class="ok">${tick(44)}</div><div class="bdg"><span>Atendido</span></div><div class="cd-v">Despachar</div></div>
      <div class="cd der"><div class="cd-t">WHATSAPP</div><div class="ic">${celu("4")}</div>
        <div class="bdg"><span>Sin contestar</span></div><div class="cd-v">Escribir</div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="flecha fl" d="M440 1420 H330 M360 1390 L330 1420 L360 1450"/>
        <path class="flecha fr" d="M640 1420 H750 M720 1390 L750 1420 L720 1450"/>
      </svg>
      <div class="yo">${duenio}</div>
      ${pill("dos", 540, 1600, "Dos lugares · una persona", "r")}`,
  js: `
      gsap.set(q(".dos"), { xPercent: -50 });
      tl.fromTo(q(".izq"), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".der"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)" }, 0.08);
      tl.fromTo(q(".yo"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.15);
      // hacés todo bien: tilde verde en el mostrador
      tl.to(q(".izq"), { borderColor: "${G}", duration: 0.2 }, 0.55);
      pop(".izq .ok", 0.6, 0.3, 0.4);
      pop(".izq .bdg", 0.75, 0.3);
      // pero: el WhatsApp acumula, en rojo apagado
      tl.to(q(".der"), { borderColor: "${RED}", duration: 0.2 }, 1.4);
      pop(".der .bdg", 1.5, 0.3);
      cuenta(".celu-n", 4, [[1.55, 5], [1.95, 6]]);
      // despachar / escribir: el dueño va de un lado al otro
      tl.to(q(".yo"), { x: -300, duration: 0.3, ease: "power3.inOut" }, 2.0);
      latir(".izq", 2.15, 1.04);
      tl.fromTo(q(".fl"), { opacity: 0 }, { opacity: 0.8, duration: 0.15 }, 2.0);
      tl.to(q(".yo"), { x: 300, duration: 0.34, ease: "power3.inOut" }, 2.5);
      latir(".der", 2.7, 1.04);
      tl.fromTo(q(".fr"), { opacity: 0 }, { opacity: 0.8, duration: 0.15 }, 2.5);
      // a la vez: no se puede
      tl.to(q(".yo"), { x: 0, duration: 0.25, ease: "power3.out" }, 2.95);
      temblar(".yo", 3.2, 5, 10);
      tl.to(qa(".fl, .fr"), { stroke: "${RED}", opacity: 1, duration: 0.15 }, 3.1);
      pop(".dos", 3.15);
      salida(3.76);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.18 }, { t: 0.6, sfx: "ping", vol: 0.26 }, { t: 1.5, sfx: "notification", vol: 0.26 }, { t: 2.0, sfx: "whoosh-short", vol: 0.2 }, { t: 2.5, sfx: "whoosh-short", vol: 0.2 }, { t: 3.15, sfx: "glitch-1", vol: 0.18, max: 0.4 }],
});

// ================= s04 · punto de dolor: las manos en la masa =================
// 0.15 pedido · 0.41 entra · 0.81 justo · 1.91 manos · 2.41 masa
escena("s04-masa", {
  css: `
    P .noti { position: absolute; left: 60px; top: 520px; width: 960px; height: 250px; border-radius: 44px; background: #ffffff; box-shadow: 0 16px 0 rgba(3,6,12,0.5); opacity: 0; }
    P .noti .ic { position: absolute; left: 32px; top: 46px; width: 156px; height: 156px; border-radius: 38px; background: ${NAVY}; }
    P .noti .ic svg { position: absolute; left: 28px; top: 28px; }
    P .noti .t0 { position: absolute; left: 220px; top: 38px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .noti .t1 { position: absolute; left: 220px; top: 86px; font: 800 54px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .noti .t2 { position: absolute; left: 220px; top: 162px; font: 500 38px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.72); }
    P .esp { position: absolute; left: 0; right: 0; top: 810px; text-align: center; opacity: 0; }
    P .esp .l { font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: ${RED}; }
    P .esp .n { font: 900 150px/1.05 "Lexend", sans-serif; color: ${RED}; letter-spacing: -0.03em; }
    P .mesa { position: absolute; left: 0; top: 1040px; width: 1080px; height: 660px; }
    P .mesa svg { width: 1080px; height: 660px; overflow: visible; }`,
  html: `
      <div class="noti"><div class="ic"><svg width="100" height="100" viewBox="0 0 100 100"><path d="M10 14 H90 Q96 14 96 20 V66 Q96 72 90 72 H40 L18 92 V72 H10 Q4 72 4 66 V20 Q4 14 10 14 Z" fill="${G}"/><circle cx="30" cy="43" r="7" fill="${NAVY}"/><circle cx="50" cy="43" r="7" fill="${NAVY}"/><circle cx="70" cy="43" r="7" fill="${NAVY}"/></svg></div>
        <div class="t0">WHATSAPP · AHORA</div><div class="t1">Nuevo pedido</div><div class="t2">Jorge · Dos tartas para la una</div></div>
      <div class="esp"><div class="l">SIN RESPUESTA</div><div class="n">0:00</div></div>
      <div class="mesa"><svg viewBox="0 0 1080 660" aria-hidden="true">
        <rect x="40" y="250" width="1000" height="380" rx="40" fill="#060b14" transform="translate(10 14)"/>
        <rect x="40" y="250" width="1000" height="380" rx="40" fill="${NAVY3}"/>
        <rect x="40" y="250" width="1000" height="380" rx="40" fill="none" stroke="${BORDE}" stroke-width="8"/>
        <g class="masa"><ellipse cx="540" cy="452" rx="330" ry="130" fill="${CR2}"/><ellipse cx="530" cy="432" rx="318" ry="118" fill="#ffffff"/>
          <ellipse cx="440" cy="392" rx="110" ry="28" fill="${CR}"/></g>
        ${[[180, 560], [230, 300], [880, 330], [930, 560], [820, 590], [290, 600]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${CR}" opacity="0.7"/>`).join("")}
        <g class="mi"><path d="M300 60 L372 360 Q380 410 330 420 L240 430 Q190 432 186 384 L160 120 Q154 60 210 54 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8"/><path d="M186 380 L372 360" stroke="${CR2}" stroke-width="10"/><path d="M168 150 Q110 190 132 250 L178 290" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/></g>
        <g class="md"><path d="M780 60 L708 360 Q700 410 750 420 L840 430 Q890 432 894 384 L920 120 Q926 60 870 54 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8"/><path d="M894 380 L708 360" stroke="${CR2}" stroke-width="10"/><path d="M912 150 Q970 190 948 250 L902 290" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/></g>
      </svg></div>
      ${pill("mm", 540, 1590, "Las manos en la masa", "lleno")}`,
  js: `
      gsap.set(q(".mm"), { xPercent: -50 });
      tl.fromTo(q(".mesa"), { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      // amasando: las manos hunden la masa una y otra vez
      const amasar = (t) => {
        tl.to(qa(".mi, .md"), { y: 40, duration: 0.17, ease: "power2.in", yoyo: true, repeat: 1 }, t);
        tl.to(q(".masa"), { scaleX: 1.05, scaleY: 0.92, svgOrigin: "540 452", duration: 0.17, ease: "power2.in", yoyo: true, repeat: 1 }, t);
      };
      [0.1, 0.55, 1.0, 1.45, 1.9, 2.35, 2.8].forEach(amasar);
      // entra el pedido, justo ahora
      tl.fromTo(q(".noti"), { opacity: 0, y: -160, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.5)" }, 0.38);
      temblar(".noti", 0.85, 5, 8);
      // y nadie lo contesta: el contador corre (en rojo apagado)
      pop(".esp", 1.1, 0.3, 0.6);
      cuenta(".esp .n", 0, [[1.15, 239, 2.2]], (v) => { const s = Math.round(v); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); });
      pop(".mm", 2.3);
      latir(".masa", 2.42, 1.05);
      salida(3.22);`,
  sfx: [{ t: 0.1, sfx: "click-soft", vol: 0.2 }, { t: 0.38, sfx: "notification", vol: 0.36 }, { t: 0.85, sfx: "notification", vol: 0.22 }, { t: 1.15, sfx: "typing", vol: 0.16, max: 2.0 }, { t: 2.3, sfx: "impact-bass-1", vol: 0.24 }],
});

// ================= s05 · ahí entra un agente de IA =================
// 0.51 entra · 1.10 agente · 1.55 IA
escena("s05-agente", {
  css: `
    P .orb { position: absolute; left: 290px; top: 560px; width: 500px; height: 500px; border-radius: 50%; background: ${G}; box-shadow: 0 22px 0 ${GD}; }
    P .orb svg { position: absolute; left: 90px; top: 90px; }
    P .anillo { position: absolute; left: 240px; top: 510px; width: 600px; height: 600px; border-radius: 50%; border: 8px solid ${G}; opacity: 0; }
    P .nom { position: absolute; left: 0; right: 0; top: 1160px; text-align: center; }
    P .nom span { position: relative; display: inline-block; padding: 6px 36px 16px; font: 900 136px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; }
    P .nom .selbox { left: 0; top: 0; right: 0; bottom: 0; width: auto; height: auto; }
    P .est { position: absolute; left: 540px; top: 1400px; }`,
  html: `
      <div class="anillo a1"></div><div class="anillo a2"></div>
      <div class="orb"><svg width="320" height="320" viewBox="-48 -48 96 96" class="ch">${chispa(1.3)}</svg></div>
      <div class="nom"><span><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">Agente de IA</em></span></div>
      ${pill("est", 540, 1400, `<span style="display:inline-flex;align-items:center;gap:16px">${tick(22, NAVY, G)}EN LÍNEA · ATIENDE POR VOS</span>`, "lleno")}`,
  js: `
      gsap.set(q(".est"), { xPercent: -50 });
      tl.fromTo(q(".orb"), { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.05);
      tl.fromTo(q(".ch"), { rotation: -90, transformOrigin: "50% 50%" }, { rotation: 90, duration: 2.1, ease: "power1.out" }, 0.05);
      [".a1", ".a2"].forEach((s, i) => tl.fromTo(q(s), { opacity: 0.9, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.35, duration: 0.9, ease: "power2.out" }, 0.5 + i * 0.45));
      tl.fromTo(q(".nom"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.32, ease: "back.out(1.7)" }, 1.0);
      caja(".sb", 1.15);
      pop(".est", 1.55);
      latir(".orb", 1.6, 1.06);
      salida(1.92);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22 }, { t: 0.5, sfx: "sparkle", vol: 0.28 }, { t: 1.15, sfx: "click-soft", vol: 0.28 }, { t: 1.55, sfx: "chime", vol: 0.28 }],
});

// ================= s06 · contesta con el menú del día =================
// 0.0 Contesta · 0.70 menú · 1.10 día
const MENU = [["Milanesa con fritas", "$ 390"], ["Tarta de jamón y queso", "$ 320"], ["Tarta de verdura", "$ 300"]];
const CSS_CHAT = `
    P .b { font-size: 48px; }
    P .menu { position: absolute; right: 130px; top: 880px; width: 800px; border-radius: 40px 40px 10px 40px; background: ${G}; box-shadow: 0 12px 0 rgba(3,6,12,0.5); padding: 28px 36px 24px; }
    P .menu-h { font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: rgba(11,18,32,0.7); margin-bottom: 14px; }
    P .fila { display: flex; justify-content: space-between; align-items: baseline; gap: 28px; padding: 18px 0; border-top: 4px solid rgba(11,18,32,0.18); font: 700 46px/1.1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .fila b { font-weight: 900; }`;
const MENU_HTML = (cls = "") => `<div class="menu ${cls}"><div class="menu-h">MENÚ DE HOY</div>${MENU.map(([a, b], i) => `<div class="fila f${i}"><span>${a}</span><b>${b}</b></div>`).join("")}</div>`;
escena("s06-menu", {
  css: CSS_CHAT,
  html: `
      ${TEL("AGENTE DE IA · EN LÍNEA", AV_AGENTE)}
      ${bin("pq", 130, 700, "Dos tartas para la una.<br>¿Qué tenés hoy?")}
      ${MENU_HTML()}`,
  js: `
      tl.fromTo(q(".tel"), { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.set(q(".tel-av"), { backgroundColor: "${G}" }, 0);
      entra(".pq", 0.05);
      tl.fromTo(q(".menu"), { opacity: 0, y: 50, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.7)" }, 0.6);
      ${[0, 1, 2].map((i) => `tl.fromTo(q(".f${i}"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, ${r2(0.78 + i * 0.16)});`).join("\n      ")}
      latir(".menu", 1.4, 1.03);`,
  sfx: [{ t: 0.05, sfx: "notification", vol: 0.22 }, { t: 0.6, sfx: "ping", vol: 0.3 }, { t: 0.78, sfx: "pop", vol: 0.18 }, { t: 0.94, sfx: "pop", vol: 0.18 }, { t: 1.1, sfx: "pop", vol: 0.18 }],
});

// ================= s07 · toma el pedido y confirma la hora =================
// 0.24 pedido · 0.98 confirma · 1.54 hora
escena("s07-pedido", {
  css: CSS_CHAT + `
    P .menu { opacity: 1; }
    P .tk { position: absolute; left: 130px; width: 820px; height: 150px; border-radius: 36px; background: ${CR}; box-shadow: 0 12px 0 rgba(3,6,12,0.5); opacity: 0; }
    P .tk svg { position: absolute; left: 28px; top: 31px; }
    P .tk .l { position: absolute; left: 140px; top: 26px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(11,18,32,0.6); }
    P .tk .v { position: absolute; left: 140px; top: 70px; font: 800 46px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .tk .hr { position: absolute; right: 36px; top: 30px; height: 90px; padding: 0 26px; border-radius: 24px; background: ${NAVY}; font: 900 60px/90px "Lexend", sans-serif; color: ${G}; }`,
  html: `
      ${TEL("AGENTE DE IA · EN LÍNEA", AV_AGENTE)}
      ${bin("pq", 130, 700, "Dos tartas para la una.<br>¿Qué tenés hoy?")}
      ${MENU_HTML("mn")}
      <div class="tk t1" style="top:1300px">${tick(44)}<div class="l">PEDIDO TOMADO</div><div class="v">2 tartas de jamón y queso</div></div>
      <div class="tk t2" style="top:1480px">${tick(44)}<div class="l">RETIRO CONFIRMADO</div><div class="v">Jorge · hoy</div><div class="hr">13:00</div></div>`,
  js: `
      tl.set(q(".tel-av"), { backgroundColor: "${G}" }, 0);
      gsap.set(qa(".pq"), { opacity: 1 });
      // el chat sube para hacer lugar a las tarjetas
      tl.to(q(".pq"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 0.05);
      tl.to(q(".mn"), { y: -180, duration: 0.35, ease: "power3.inOut" }, 0.05);
      tl.to(q(".f1"), { backgroundColor: "rgba(11,18,32,0.14)", duration: 0.2 }, 0.2);
      tl.fromTo(q(".t1"), { opacity: 0, y: 80, scale: 0.88, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.7)" }, 0.24);
      tl.fromTo(q(".t1 svg"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 0.45);
      tl.fromTo(q(".t2"), { opacity: 0, y: 80, scale: 0.88, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.7)" }, 0.98);
      tl.fromTo(q(".t2 svg"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 1.2);
      latir(".t2 .hr", 1.55, 1.15);
      salida(1.96);`,
  sfx: [{ t: 0.24, sfx: "pop", vol: 0.26 }, { t: 0.45, sfx: "ping", vol: 0.26 }, { t: 0.98, sfx: "pop", vol: 0.26 }, { t: 1.2, sfx: "ping", vol: 0.26 }, { t: 1.55, sfx: "click-soft", vol: 0.26 }],
});

// ================= s08 · la comanda cae en la cocina; vos seguís en el mostrador =================
// 0.08 comanda · 0.44 cae · 0.84 cocina · 1.54 vos · 2.14 mostrador
const COM = (cls, n, l1, l2, nuevo = false) => `<div class="com ${cls}${nuevo ? " nueva" : ""}"><div class="com-h">#${n}</div><div class="com-a">${l1}</div><div class="com-b">${l2}</div>${nuevo ? `<div class="com-ok">${tick(30)}</div><div class="com-o">WHATSAPP</div>` : `<div class="com-o">MOSTRADOR</div>`}</div>`;
escena("s08-comanda", {
  css: `
    P .pan { position: absolute; left: 50px; top: 520px; width: 980px; height: 720px; border-radius: 48px; background: ${NAVY2}; border: 8px solid ${CR}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); overflow: hidden; }
    P .pan-h { position: absolute; left: 0; right: 0; top: 0; height: 100px; background: ${CR}; font: 800 44px/100px "Lexend", sans-serif; color: ${NAVY}; padding-left: 44px; letter-spacing: 0.06em; }
    P .pan-h span { position: absolute; right: 40px; top: 0; font: 500 30px/100px "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(11,18,32,0.6); }
    P .com { position: absolute; top: 140px; width: 290px; height: 520px; border-radius: 30px; background: ${CR}; box-shadow: 0 12px 0 rgba(3,6,12,0.5); }
    P .com.nueva { background: #ffffff; border: 8px solid ${G}; }
    P .com-h { position: absolute; left: 26px; top: 26px; font: 900 56px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .com-a { position: absolute; left: 26px; right: 20px; top: 120px; font: 700 40px/1.15 "Lexend", sans-serif; color: ${NAVY}; }
    P .com-b { position: absolute; left: 26px; right: 20px; top: 280px; font: 500 32px/1.2 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }
    P .com-o { position: absolute; left: 26px; bottom: 30px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.55); }
    P .nueva .com-o { color: ${GD}; }
    P .com-ok { position: absolute; right: 22px; top: 20px; }
    P .mos { position: absolute; left: 30px; top: 1500px; width: 1020px; height: 200px; }
    P .mos-top { position: absolute; left: 0; top: 0; width: 1020px; height: 40px; border-radius: 16px; background: ${CR}; }
    P .mos-fr { position: absolute; left: 24px; top: 40px; width: 972px; height: 160px; background: ${CR2}; border-radius: 0 0 26px 26px; }
    P .p { position: absolute; width: 150px; height: 250px; }
    P .bol { position: absolute; left: 470px; top: 1340px; }
    P .vos { position: absolute; left: 540px; top: 1566px; }`,
  html: `
      <div class="pan"><div class="pan-h">COCINA<span>COMANDAS</span></div>
        ${COM("c1", 47, "Milanesa con fritas", "Para llevar")}
        ${COM("c2", 48, "Pollo al spiedo", "Medio, con ensalada")}
        ${COM("c3", 49, "2 tartas de jamón y queso", "Retira 13:00", true)}
      </div>
      <div class="p dn" style="left:250px;top:1260px">${duenio}</div>
      <div class="p cl" style="left:700px;top:1250px">${persona(BORDE)}</div>
      <div class="mos"><div class="mos-fr"></div><div class="mos-top"></div></div>
      <div class="bol">${bolsa(150)}</div>
      ${pill("vos", 540, 1566, `<span style="display:inline-flex;align-items:center;gap:16px">${tick(22, NAVY, G)}Vos, en el mostrador</span>`, "lleno")}`,
  js: `
      gsap.set(q(".vos"), { xPercent: -50 });
      tl.fromTo(q(".pan"), { opacity: 0, y: 70, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }, 0);
      gsap.set(q(".c1"), { left: 40 }); gsap.set(q(".c2"), { left: 345 }); gsap.set(q(".c3"), { left: 650 });
      // la comanda nueva cae desde arriba en su lugar
      tl.fromTo(q(".c3"), { opacity: 0, y: -620, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.42, ease: "bounce.out" }, 0.4);
      tl.fromTo(q(".c3 .com-ok"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2.4)" }, 0.85);
      latir(".pan", 0.86, 1.02);
      // mientras tanto, el mostrador: el dueño despacha
      tl.fromTo(qa(".dn, .cl, .mos"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", stagger: 0.06 }, 1.0);
      tl.fromTo(q(".bol"), { opacity: 0, x: -150, y: -40 }, { opacity: 1, x: 0, y: 0, duration: 0.45, ease: "power3.out" }, 1.5);
      tl.to(q(".bol"), { x: 150, duration: 0.45, ease: "power2.inOut" }, 2.1);
      pop(".vos", 1.6);
      tl.to(q(".vos"), { y: -18, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.15);
      salida(2.94);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.16 }, { t: 0.44, sfx: "impact-bass-2", vol: 0.24 }, { t: 0.85, sfx: "ping", vol: 0.28 }, { t: 1.6, sfx: "pop", vol: 0.26 }, { t: 2.14, sfx: "chime", vol: 0.24 }],
});

// ================= s09 · giro: ya no compite con el que tenés enfrente =================
// 0.06 WhatsApp · 0.66 no · 0.76 compite · 1.86 enfrente
escena("s09-giro", {
  css: `
    P .cd { position: absolute; top: 540px; width: 470px; height: 760px; border-radius: 48px; background: ${NAVY2}; border: 8px solid ${RED}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); }
    P .cd-t { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: rgba(239,238,229,0.75); }
    P .cd-v { position: absolute; left: 0; right: 0; bottom: 44px; text-align: center; font: 800 50px/1.1 "Lexend", sans-serif; color: #fff; }
    P .izq { left: 50px; } P .der { left: 560px; }
    P .izq .ic { position: absolute; left: 160px; top: 160px; }
    P .der .ic { position: absolute; left: 85px; top: 150px; width: 300px; height: 300px; border-radius: 50%; background: ${G}; }
    P .der .ic svg { position: absolute; left: 50px; top: 50px; }
    P .izq .ic2 { position: absolute; left: 70px; top: 300px; }
    P .ok { position: absolute; left: 345px; top: 100px; opacity: 0; }
    P .vs { position: absolute; left: 430px; top: 810px; width: 220px; height: 220px; border-radius: 50%; background: ${RED}; border: 12px solid ${NAVY}; font: 900 96px/196px "Lexend", sans-serif; text-align: center; color: #fff; }
    P .mas { position: absolute; left: 430px; top: 810px; width: 220px; height: 220px; border-radius: 50%; background: ${G}; border: 12px solid ${NAVY}; opacity: 0; }
    P .mas svg { position: absolute; left: 40px; top: 40px; }
    P .fin { position: absolute; left: 540px; top: 1400px; }`,
  html: `
      <div class="cd izq"><div class="cd-t">ENFRENTE</div><div class="ic2">${persona(BORDE)}</div><div class="ic" style="left:170px;top:170px">${duenio}</div>
        <div class="ok">${tick(44)}</div><div class="cd-v">Vos</div></div>
      <div class="cd der"><div class="cd-t">WHATSAPP</div><div class="ic"><svg width="200" height="200" viewBox="-48 -48 96 96">${chispa(1.3)}</svg></div>
        <div class="ok">${tick(44)}</div><div class="cd-v">Agente de IA</div></div>
      <div class="vs">VS</div>
      <div class="mas"><svg width="116" height="116" viewBox="0 0 116 116"><path d="M58 14 V102 M14 58 H102" stroke="${NAVY}" stroke-width="20" stroke-linecap="round"/></svg></div>
      ${pill("fin", 540, 1400, "Cada uno, atendido", "lleno")}`,
  js: `
      gsap.set(q(".fin"), { xPercent: -50 });
      tl.fromTo(q(".izq"), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".der"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0.05);
      tl.fromTo(q(".vs"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.12);
      temblar(".vs", 0.4, 3, 8);
      // ya no compite: el VS se da vuelta y queda un "+"
      tl.to(q(".vs"), { scaleX: 0, transformOrigin: "50% 50%", duration: 0.14, ease: "power2.in" }, 0.7);
      tl.fromTo(q(".mas"), { opacity: 1, scaleX: 0, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, 0.84);
      tl.to(qa(".cd"), { borderColor: "${G}", duration: 0.2 }, 0.84);
      pop(".der .ok", 0.95, 0.3, 0.4);
      // con el que tenés enfrente
      pop(".izq .ok", 1.85, 0.3, 0.4);
      latir(".izq", 1.88, 1.04);
      pop(".fin", 1.95);
      salida(2.56);`,
  sfx: [{ t: 0.12, sfx: "impact-bass-1", vol: 0.22 }, { t: 0.84, sfx: "sparkle", vol: 0.28 }, { t: 0.95, sfx: "ping", vol: 0.24 }, { t: 1.85, sfx: "ping", vol: 0.24 }, { t: 1.95, sfx: "chime", vol: 0.24 }],
});

// ================= s10 · CTA: videollamada gratis (fondo verde de marca) =================
// 0.0 ¿Lo vemos · 0.88 local · 1.67 Videollamada · 2.28 gratis · 3.08 scalerics.com
escena("s10-cta", {
  css: `
    P .verde { position: absolute; inset: 0; background: ${G}; }
    P .pre { position: absolute; left: 0; right: 0; top: 230px; text-align: center; font: 800 84px/1.08 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; opacity: 0; }
    P .vc { position: absolute; left: 80px; top: 470px; width: 920px; height: 520px; border-radius: 64px; background: ${NAVY}; box-shadow: 0 18px 0 ${GD}; opacity: 0; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 468px; border-radius: 40px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a .mini { position: absolute; left: 175px; top: 70px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 22px; padding: 10px 18px; border-radius: 12px; background: rgba(11,18,32,0.85); font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 610px; top: 26px; width: 284px; height: 250px; border-radius: 36px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 80px; text-align: center; font: 800 44px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 690px; top: 320px; width: 130px; height: 130px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 30px; top: 39px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1060px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1206px; text-align: center; opacity: 0; }
    P .t2 { display: inline-block; padding: 8px 40px 20px; border-radius: 28px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 1430px; text-align: center; opacity: 0; }
    P .t3 { display: inline-block; padding: 26px 52px 30px; border-radius: 999px; background: ${NAVY}; font: 800 104px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; }`,
  html: `
      <div class="verde"></div>
      <div class="pre">¿Lo vemos para<br>tu local?</div>
      <div class="vc">
        <div class="vc-a"><div class="mini">${bolsa(210)}</div><div class="lbl">LA ESQUINA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="72" height="54" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
  js: `
      tl.fromTo(q(".verde"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(80% at 50% 50%)", duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".pre"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }, 0.1);
      tl.fromTo(q(".vc"), { opacity: 0, y: 70, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, 0.3);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.45);
      latir(".vc", 0.9, 1.03);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 1.6);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, 2.2);
      tl.fromTo(q(".t3w"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.0);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.5);
      tl.to(q(".vc"), { y: -14, duration: 1.9, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.5);
      tl.to(q(".vc-a .mini"), { rotation: -4, transformOrigin: "50% 0%", duration: 0.95, ease: "sine.inOut", yoyo: true, repeat: 3 }, 3.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22 }, { t: 0.45, sfx: "pop", vol: 0.22 }, { t: 2.2, sfx: "click-soft", vol: 0.28 }, { t: 3.0, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
