// Generador de escenas de reels/black-friday-caos. Correr desde la carpeta del reel:
//   node armar.mjs && node gen.mjs && node armar.mjs
// Estilo: tipografía gigante + interfaz recreada. Fondo navy liso #0b1220 (lo pone el index);
// el giro (s05) y el cierre (s10) pintan su propio verde de marca a pantalla completa.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", CR2 = "#d6d4c6", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#7c8698";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;

// íconos de canal (genéricos, sin logos): trazo crema sobre el chip navy
const ICONO = {
  INSTAGRAM: `<rect x="5" y="5" width="30" height="30" rx="9" fill="none" stroke="${CR}" stroke-width="4.5"/><circle cx="20" cy="20" r="7" fill="none" stroke="${CR}" stroke-width="4.5"/>`,
  WHATSAPP: `<path d="M20 5 C11 5 5 11 5 19 C5 23 6.5 26 9 28.5 L7 35 L14 32.5 C16 33.5 18 34 20 34 C29 34 35 27.5 35 19.5 C35 11 29 5 20 5 Z" fill="none" stroke="${CR}" stroke-width="4.5" stroke-linejoin="round"/>`,
  MOSTRADOR: `<path d="M5 15 L9 6 H31 L35 15 Z" fill="${CR}"/><rect x="8" y="15" width="24" height="19" fill="none" stroke="${CR}" stroke-width="4.5"/><rect x="17" y="22" width="7" height="12" fill="${CR}"/>`,
  ONLINE: `<rect x="5" y="7" width="30" height="22" rx="4" fill="none" stroke="${CR}" stroke-width="4.5"/><path d="M12 35 H28" stroke="${CR}" stroke-width="4.5" stroke-linecap="round"/>`,
};
const pedido = (cls, canal, titulo, sub, x, y, rot = 0, kind = "") => `
  <div class="ped ${kind} ${cls}" style="left:${x}px;top:${y}px;--r:${rot}deg">
    <div class="ped-chip"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">${ICONO[canal]}</svg><span>${canal}</span></div>
    <div class="ped-tit">${titulo}</div><div class="ped-sub">${sub}</div>
  </div>`;

// la campera (viewBox 600 x 700, el gancho arriba)
const campera = (cuerpo = CR, sombra = CR2, detalle = NAVY, extra = "") => `
  <path d="M300 92 L300 44 Q300 8 334 8 Q366 8 366 38" fill="none" stroke="${CR}" stroke-width="10" stroke-linecap="round"/>
  <path d="M300 92 L118 150 L482 150 Z" fill="none" stroke="${CR}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M196 120 L244 104 Q300 150 356 104 L404 120 L548 214 L592 556 L506 576 L478 360 L478 690 L122 690 L122 360 L94 576 L8 556 L52 214 Z" fill="${cuerpo}" stroke="${detalle}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M300 136 L300 690 L478 690 L478 360 L506 576 L592 556 L548 214 L404 120 L356 104 Q330 128 300 136 Z" fill="${sombra}"/>
  <path d="M196 120 L244 104 Q300 150 356 104 L404 120 L548 214 L592 556 L506 576 L478 360 L478 690 L122 690 L122 360 L94 576 L8 556 L52 214 Z" fill="none" stroke="${detalle}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M244 104 Q300 196 356 104" fill="none" stroke="${detalle}" stroke-width="8" stroke-linecap="round"/>
  <path d="M300 160 L300 690" stroke="${detalle}" stroke-width="8"/>
  <path d="M160 470 L250 470 M350 470 L440 470" stroke="${detalle}" stroke-width="8" stroke-linecap="round"/>
  <path d="M122 640 L478 640" stroke="${detalle}" stroke-width="6" opacity="0.35"/>
  ${extra}`;

// celular grande (izquierda): 560 x 1100
const TEL = { x: 80, y: 560, w: 560, h: 1100 };
const celular = (pantalla = "", cls = "") => `
  <div class="tel-lado ${cls}"></div>
  <div class="tel ${cls}"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .verde { position: absolute; inset: 0; background: ${G}; }
    ${P} .pie { position: absolute; left: 380px; top: 1730px; width: 320px; height: 100px; border-radius: 50px; background: ${NAVY}; }
    ${P} .gig { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: -0.035em; line-height: 1; color: #fff; text-transform: uppercase; white-space: nowrap; }
    ${P} .gig .v, ${P} .gig.v { color: ${G}; }
    ${P} .hl { position: relative; display: inline-block; padding: 0 22px 8px; }
    ${P} .hl > b { position: absolute; inset: 0; border: 7px solid ${G}; background: rgba(92,230,17,0.16); }
    ${P} .hl.r > b { border-color: ${RED}; background: rgba(199,101,91,0.2); }
    ${P} .hl.n > b { border-color: ${NAVY}; background: ${NAVY}; }
    ${P} .hl > b i { position: absolute; width: 24px; height: 24px; background: #fff; border: 6px solid ${G}; }
    ${P} .hl.r > b i { border-color: ${RED}; } ${P} .hl.n > b i { border-color: ${NAVY}; }
    ${P} .hl > b .k1 { left: -15px; top: -15px; } ${P} .hl > b .k2 { right: -15px; top: -15px; } ${P} .hl > b .k3 { left: -15px; bottom: -15px; } ${P} .hl > b .k4 { right: -15px; bottom: -15px; }
    ${P} .hl > em { position: relative; font-style: normal; }
    ${P} .pill { position: absolute; padding: 14px 30px 15px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 38px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.gris { border-color: ${GRIS}; color: ${CR}; background: ${NAVY3}; font-size: 56px; padding: 16px 34px; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .ped { position: absolute; width: 450px; height: 176px; border-radius: 26px; background: ${CR}; border: 6px solid ${NAVY}; box-shadow: 0 14px 0 rgba(3,6,12,0.55); transform: rotate(var(--r)); }
    ${P} .ped-chip { position: absolute; left: 20px; top: 20px; height: 54px; padding: 0 20px 0 10px; border-radius: 16px; background: ${NAVY}; display: flex; align-items: center; gap: 10px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${CR}; }
    ${P} .ped-tit { position: absolute; left: 24px; top: 88px; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    ${P} .ped-sub { position: absolute; right: 22px; top: 32px; font: 500 28px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.55); }
    ${P} .ped.ok { border-color: ${G}; }
    ${P} .tel-lado { position: absolute; left: ${TEL.x + 18}px; top: ${TEL.y + 18}px; width: ${TEL.w}px; height: ${TEL.h}px; border-radius: 78px; background: #050a12; }
    ${P} .tel { position: absolute; left: ${TEL.x}px; top: ${TEL.y}px; width: ${TEL.w}px; height: ${TEL.h}px; border-radius: 78px; background: ${CR}; }
    ${P} .tel-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 64px; background: #ffffff; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: ${TEL.w / 2 - 70}px; top: 30px; width: 140px; height: 34px; border-radius: 17px; background: ${NAVY}; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const caja = (s, t) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const golpe = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t);
      const temblar = (s, t, n) => tl.fromTo(q(s), { x: 0 }, { x: 10, duration: 0.05, yoyo: true, repeat: (n ?? 5) * 2 - 1, ease: "none", immediateRender: false }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
      const lineaIn = (s, t, d) => tl.fromTo(q(s), { opacity: 0, y: 46, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: d ?? 0.28, ease: "back.out(1.9)" }, t);
      if (qa(".ped").length) gsap.set(qa(".ped"), { rotation: (i, el) => parseFloat(getComputedStyle(el).getPropertyValue("--r")) || 0 });
`;
const hl = (txt, kind = "") => `<span class="hl ${kind}"><b>${esquinas}</b><em>${txt}</em></span>`;

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

// ================= s01 · gancho =================
// cuadro 0: el gancho entero en grande + el panel de ventas ya armado
const HORAS = ["20", "21", "22", "23", "00", "01"];
const BAR_H = [120, 180, 250, 310, 370, 420];
escena("s01-gancho", {
  css: `
    P .ta, P .tb { position: absolute; left: 0; right: 0; top: 96px; height: 440px; }
    P .l1 { top: 0; font-size: 116px; } P .l2 { top: 146px; font-size: 104px; } P .l3 { top: 284px; font-size: 112px; }
    P .panel { position: absolute; left: 70px; top: 600px; width: 940px; height: 1040px; border-radius: 46px; background: ${NAVY2}; border: 8px solid ${CR}; box-shadow: 0 22px 0 #050a12; overflow: hidden; }
    P .p-lbl { position: absolute; left: 50px; top: 46px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.7); }
    P .p-num { position: absolute; left: 46px; top: 100px; font: 800 132px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; white-space: nowrap; }
    P .p-num.rojo { color: ${RED}; }
    P .p-svg { position: absolute; left: 0; top: 0; width: 940px; height: 1040px; }
    P .bar { fill: ${G}; } P .eje { stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    P .hora { font: 500 30px/1 "IBM Plex Mono", monospace; fill: rgba(239,238,229,0.7); }
    P .luna { position: absolute; right: 50px; top: 40px; width: 96px; height: 96px; }
    P .lluvia { clip-path: inset(850px 0 0 0); }
    P .lluvia .ped { width: 420px; }`,
  html: `
      <div class="panel" data-layout-allow-overlap>
        <div class="p-lbl pl-a">VENTAS · VIERNES</div><div class="p-lbl pl-b" style="opacity:0;color:${RED}">PEDIDOS SIN ANOTAR</div>
        <div class="p-num pn-a">$ 0</div><div class="p-num rojo pn-b" style="opacity:0">0</div>
        <svg class="luna" viewBox="0 0 96 96" aria-hidden="true"><path d="M62 8 A40 40 0 1 0 88 62 A32 32 0 1 1 62 8 Z" fill="${CR}"/></svg>
        <svg class="p-svg" viewBox="0 0 940 1040" aria-hidden="true">
          ${BAR_H.map((h, i) => `<rect class="bar b${i}" x="${92 + i * 136}" y="${930 - h}" width="96" height="${h}" rx="14"/>`).join("")}
          <path class="eje" d="M60 934 H880"/>
          ${HORAS.map((h, i) => `<text class="hora" x="${140 + i * 136}" y="990" text-anchor="middle">${h}h</text>`).join("")}
        </svg>
      </div>
      <div class="capa lluvia" data-layout-allow-overlap>
        ${pedido("c1", "INSTAGRAM", "Campera M", "#0412", 70, 880, -7)}
        ${pedido("c2", "WHATSAPP", "Buzo L", "#0413", 540, 910, 6)}
        ${pedido("c3", "MOSTRADOR", "Gorro", "#0414", 130, 1070, 4)}
        ${pedido("c4", "INSTAGRAM", "Campera S", "#0415", 560, 1130, -5)}
        ${pedido("c5", "WHATSAPP", "Remera XL", "#0416", 90, 1260, -3)}
        ${pedido("c6", "MOSTRADOR", "Campera M", "#0417", 520, 1320, 7)}
        ${pedido("c7", "INSTAGRAM", "Jean 42", "#0418", 300, 1450, -4)}
      </div>
      <div class="ta">
        <div class="gig l1 v">Black Friday:</div>
        <div class="gig l2">Tu mejor noche</div>
        <div class="gig l3">de ${hl("ventas.")}</div>
      </div>
      <div class="tb" style="opacity:0">
        <div class="gig l1">Y tu peor</div>
        <div class="gig l2">noche de</div>
        <div class="gig l3">${hl("pedidos.", "r")}</div>
      </div>`,
  js: `
      // cuadro 0: barras a medio crecer, el número ya corriendo
      qa(".bar").forEach((b, i) => tl.fromTo(b, { scaleY: 0.45 + i * 0.04 }, { scaleY: 1, svgOrigin: (140 + i * 136) + " 930", duration: 1.6, ease: "power2.out" }, 0.05 + i * 0.06));
      contar(".pn-a", 41, 186, 0, 1.95, (v) => "$ " + v + ".500");
      tl.fromTo(q(".ta"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".panel"), { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, 0);
      golpe(".ta .hl", 1.92, 1.07);
      // "Y tu peor noche de pedidos."
      tl.to(q(".ta"), { opacity: 0, y: -50, duration: 0.2, ease: "power2.in" }, 2.66);
      tl.fromTo(q(".tb"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.26, ease: "power3.out" }, 2.8);
      tl.to(qa(".bar"), { fill: "${GRIS}", duration: 0.3 }, 2.8);
      tl.to(qa(".pl-a, .pn-a"), { opacity: 0, duration: 0.15 }, 2.9);
      tl.to(qa(".pl-b, .pn-b"), { opacity: 1, duration: 0.15 }, 3.0);
      contar(".pn-b", 0, 23, 3.0, 1.0, (v) => String(v));
      qa(".lluvia .ped").forEach((el, i) => {
        const t0 = 2.95 + i * 0.13;
        tl.fromTo(el, { opacity: 0, y: -900 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.in" }, t0);
        tl.fromTo(el, { scaleY: 1 }, { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.07, yoyo: true, repeat: 1, immediateRender: false }, t0 + 0.32);
      });
      caja(".tb .hl > b", 3.72);
      temblar(".panel", 3.75, 3);
      salida(4.36);`,
  sfx: [{ t: 0.1, sfx: "riser", vol: 0.18, max: 1.8 }, { t: 1.92, sfx: "chime", vol: 0.22 }, { t: 2.8, sfx: "glitch-1", vol: 0.18, max: 0.4 }, { t: 3.0, sfx: "pop", vol: 0.22 }, { t: 3.3, sfx: "pop", vol: 0.22 }, { t: 3.6, sfx: "pop", vol: 0.22 }, { t: 3.75, sfx: "impact-bass-1", vol: 0.3 }],
});

// ================= s02 · aluvión =================
const LINEAS_CUAD = ["Campera M · Lucía (insta)", "Buzo L · el de WhatsApp", "Gorro · mostrador ¿pagó?"];
escena("s02-aluvion", {
  css: `
    P .cuad { position: absolute; left: 60px; top: 1010px; width: 960px; height: 660px; border-radius: 30px; background: ${CR}; box-shadow: 0 18px 0 #050a12; overflow: hidden; }
    P .cuad-svg { position: absolute; left: 0; top: 0; width: 960px; height: 660px; }
    P .reng { stroke: rgba(31,50,84,0.28); stroke-width: 4; } P .margen { stroke: ${RED}; stroke-width: 5; opacity: 0.7; }
    P .esp { position: absolute; top: -26px; width: 30px; height: 70px; border-radius: 15px; background: ${NAVY3}; border: 6px solid ${NAVY}; }
    P .mano { position: absolute; left: 150px; height: 120px; overflow: hidden; }
    P .mano span { display: block; font: 700 72px/120px "Caveat", cursive; color: ${NAVY3}; white-space: nowrap; }
    P .tapa { position: absolute; left: 0; top: 0; width: 820px; height: 120px; background: ${CR}; }
    P .lapiz { position: absolute; left: 0; top: 0; width: 120px; height: 120px; }`,
  html: `
      <div class="capa pila" data-layout-allow-overlap>
        ${pedido("i1", "INSTAGRAM", "Campera M", "#0419", 60, 560, -6)}
        ${pedido("i2", "INSTAGRAM", "Jean 40", "#0420", 300, 760, 5)}
        ${pedido("i3", "INSTAGRAM", "Buzo S", "#0421", 40, 930, 3)}
        ${pedido("w1", "WHATSAPP", "Buzo L", "#0422", 560, 560, 7)}
        ${pedido("w2", "WHATSAPP", "Medias x3", "#0423", 600, 800, -4)}
        ${pedido("w3", "WHATSAPP", "Campera L", "#0424", 330, 1040, -8)}
        ${pedido("m1", "MOSTRADOR", "Gorro", "#0425", 70, 1250, 5)}
        ${pedido("m2", "MOSTRADOR", "Remera M", "#0426", 580, 1110, -3)}
        ${pedido("m3", "MOSTRADOR", "Campera M", "#0427", 330, 1380, 4)}
      </div>
      <div class="cuad">
        <svg class="cuad-svg" viewBox="0 0 960 660" aria-hidden="true">
          ${[150, 270, 390, 510, 630].map((y) => `<path class="reng" d="M0 ${y} H960"/>`).join("")}
          <path class="margen" d="M120 0 V660"/>
        </svg>
        ${[110, 250, 390, 530, 670, 810].map((x) => `<div class="esp" style="left:${x}px"></div>`).join("")}
        ${LINEAS_CUAD.map((t, i) => `<div class="mano m${i}" style="top:${54 + i * 120}px;width:820px"><span>${t}</span><div class="tapa t${i}"></div></div>`).join("")}
      </div>
      <svg class="lapiz" viewBox="0 0 120 120" aria-hidden="true" style="overflow:visible"><g class="lap"><rect x="-20" y="-150" width="40" height="190" rx="6" fill="${G}" stroke="${NAVY}" stroke-width="6"/><path d="M-20 40 L0 84 L20 40 Z" fill="${CR2}" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round"/><path d="M-6 70 L0 84 L6 70 Z" fill="${NAVY}"/></g></svg>
      ${pill(1, 820, 1610, "A mano", "rl")}`,
  js: `
      const caer = (s, t) => qa(s).forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, y: -700, x: i % 2 ? 160 : -160 }, { opacity: 1, y: 0, x: 0, duration: 0.3, ease: "power2.in" }, t + i * 0.1);
        tl.fromTo(el, { scaleY: 1 }, { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.07, yoyo: true, repeat: 1, immediateRender: false }, t + i * 0.1 + 0.3);
      });
      // cuadro 0: ya hay pedidos de Instagram cayendo
      caer(".i1, .i2, .i3", -0.12);
      caer(".w1, .w2, .w3", 0.42);
      caer(".m1, .m2, .m3", 1.1);
      gsap.set(q(".cuad"), { y: 1000 });
      // "Todo a mano.": sube el cuaderno y se escribe
      tl.to(q(".cuad"), { y: 0, duration: 0.42, ease: "power3.out" }, 1.7);
      tl.to(q(".pila"), { y: -30, duration: 0.42, ease: "power3.out" }, 1.7);
      const lap = q(".lap");
      gsap.set(lap, { x: 220, y: 1100, rotation: 28, opacity: 0 });
      tl.to(lap, { opacity: 1, duration: 0.1 }, 1.95);
      [0, 1, 2].forEach((i) => {
        const t0 = 2.0 + i * 0.32;
        tl.fromTo(q(".t" + i), { x: 0 }, { x: 820, duration: 0.3, ease: "none" }, t0);
        tl.fromTo(lap, { x: 220, y: 1100 + i * 120 }, { x: 880, y: 1100 + i * 120, duration: 0.3, ease: "none", immediateRender: false }, t0);
      });
      tl.to(lap, { y: "+=10", rotation: 22, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 2.0);
      pop(".n1", 2.5);
      golpe(".n1", 2.75, 1.1);
      salida(2.98);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.22 }, { t: 0.65, sfx: "pop", vol: 0.22 }, { t: 1.35, sfx: "pop", vol: 0.22 }, { t: 1.7, sfx: "whoosh-short", vol: 0.2 }, { t: 2.0, sfx: "typing", vol: 0.18, max: 0.9 }, { t: 2.7, sfx: "glitch-1", vol: 0.16, max: 0.35 }],
});

// ================= s03 · la campera vendida dos veces =================
escena("s03-campera", {
  css: `
    P .cw { position: absolute; left: 190px; top: 560px; width: 700px; height: 816px; }
    P .cw svg { width: 700px; height: 816px; overflow: visible; }
    P .tag { position: absolute; left: 690px; top: 830px; width: 350px; height: 250px; border-radius: 26px; background: #fff; border: 7px solid ${NAVY}; box-shadow: 0 14px 0 rgba(3,6,12,0.5); transform-origin: 50% 0%; }
    P .tag-ag { position: absolute; left: 157px; top: 18px; width: 36px; height: 36px; border-radius: 50%; border: 7px solid ${NAVY}; }
    P .tag-t { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 900 66px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .tag-q { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font: 500 40px/1 "IBM Plex Mono", monospace; letter-spacing: 0.04em; color: ${NAVY}; }
    P .tag-q.mal { color: ${RED}; opacity: 0; }
    P .hilo { stroke: ${CR}; stroke-width: 6; fill: none; }
    P .x2 { position: absolute; left: 0; right: 300px; top: 760px; text-align: center; font: 900 300px/1 "Lexend", sans-serif; color: ${RED}; letter-spacing: -0.04em; -webkit-text-stroke: 10px ${NAVY}; paint-order: stroke fill; opacity: 0; }
    P .vend .ped-sub { display: none; }
    P .ped .sello { position: absolute; right: 10px; top: 184px; background: #fff; padding: 8px 14px; border-radius: 10px; border: 5px solid ${RED}; font: 700 30px/1 "Lexend", sans-serif; color: ${RED}; transform: rotate(-6deg); }`,
  html: `
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><ellipse cx="540" cy="1420" rx="380" ry="34" fill="#050a12"/><path class="hilo" d="M760 1010 Q800 900 865 840"/></svg>
      <div class="cw"><svg viewBox="-50 -60 700 816" aria-hidden="true">${campera()}</svg></div>
      <div class="tag" data-layout-allow-overlap><div class="tag-ag"></div><div class="tag-t">TALLE M</div><div class="tag-q bien">QUEDA 1</div><div class="tag-q mal">QUEDA -1</div></div>
      <div class="capa vend" data-layout-allow-overlap>
        ${pedido("va", "INSTAGRAM", "Campera M", "#0419", 40, 1300, -6).replace("</div>\n  </div>", '</div><div class="sello">VENDIDA</div>\n  </div>')}
        ${pedido("vb", "MOSTRADOR", "Campera M", "#0427", 590, 1380, 5).replace("</div>\n  </div>", '</div><div class="sello">VENDIDA</div>\n  </div>')}
      </div>
      <div class="x2">×2</div>`,
  js: `
      const CW = q(".cw"), TAG = q(".tag");
      // cuadro 0: la campera ya colgada, entra con un push-in
      tl.fromTo(CW, { scale: 1.12, y: -30, transformOrigin: "50% 10%" }, { scale: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(TAG, { rotation: 14 }, { rotation: -4, duration: 0.9, ease: "elastic.out(1, 0.5)" }, 0.15);
      golpe(".tag-t", 0.82, 1.12);
      golpe(".bien", 1.12, 1.15);
      // "vendida": la vende Instagram
      tl.fromTo(q(".va"), { x: -600, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 1.5);
      // "dos": la vende también el mostrador
      tl.fromTo(q(".vb"), { x: 600, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 1.92);
      temblar(".cw", 2.2, 4);
      // "veces.": ×2 y el stock da negativo
      tl.fromTo(q(".x2"), { opacity: 0, scale: 2.2, rotation: -10 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.24, ease: "power4.in" }, 2.08);
      tl.to(q(".bien"), { opacity: 0, duration: 0.1 }, 2.3);
      tl.to(q(".mal"), { opacity: 1, duration: 0.1 }, 2.3);
      tl.to(TAG, { borderColor: "${RED}", duration: 0.1 }, 2.3);
      golpe(".tag", 2.32, 1.1);
      salida(2.72);`,
  sfx: [{ t: 0.15, sfx: "whoosh-short", vol: 0.18 }, { t: 0.82, sfx: "click-soft", vol: 0.25 }, { t: 1.5, sfx: "notification", vol: 0.28 }, { t: 1.92, sfx: "ping", vol: 0.28 }, { t: 2.3, sfx: "impact-bass-1", vol: 0.34 }, { t: 2.32, sfx: "glitch-1", vol: 0.18, max: 0.35 }],
});

// ================= s04 · stock a ojo y la planilla de la una =================
const prenda = (x, y, w, color, n) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y - (i + 1) * 46}" width="${w}" height="40" rx="10" fill="${color}" stroke="${NAVY}" stroke-width="6"/>`).join("");
const FILAS = [["0419", "Campera M", "insta", "?"], ["0420", "Jean 40", "insta", "ok"], ["0422", "Buzo L", "whats", "?"], ["0425", "Gorro", "local", "ok"], ["0427", "Campera M", "local", "?"], ["0428", "", "", ""]];
escena("s04-planilla", {
  css: `
    P .est { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .reloj { position: absolute; left: 110px; top: 700px; width: 860px; height: 520px; border-radius: 48px; background: ${NAVY2}; border: 8px solid ${CR}; box-shadow: 0 20px 0 #050a12; opacity: 0; }
    P .rl-h { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 800 260px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${CR}; }
    P .rl-l { position: absolute; left: 0; right: 0; top: 420px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: rgba(239,238,229,0.7); }
    P .rl-luna { position: absolute; right: 44px; top: 36px; width: 90px; height: 90px; }
    P .plan { position: absolute; left: 50px; top: 560px; width: 980px; height: 1060px; border-radius: 30px; background: #fff; border: 8px solid ${CR}; box-shadow: 0 20px 0 #050a12; overflow: hidden; opacity: 0; }
    P .pl-bar { position: absolute; left: 0; top: 0; right: 0; height: 110px; background: ${NAVY3}; }
    P .pl-bar span { position: absolute; left: 36px; top: 34px; font: 600 40px/1 "Lexend", sans-serif; color: ${CR}; }
    P .pl-hora { position: absolute; right: 30px; top: 22px; height: 66px; padding: 0 22px; border-radius: 18px; background: ${RED}; font: 700 40px/66px "Lexend", sans-serif; color: #fff; }
    P .pl-cab { position: absolute; left: 0; top: 110px; right: 0; height: 96px; background: ${CR}; display: flex; font: 500 30px/96px "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: ${NAVY}; }
    P .pl-row { position: absolute; left: 0; right: 0; height: 132px; border-bottom: 6px solid rgba(31,50,84,0.18); display: flex; font: 500 38px/132px "IBM Plex Mono", monospace; color: ${NAVY}; }
    P .c0 { width: 190px; padding-left: 30px; border-right: 6px solid rgba(31,50,84,0.18); }
    P .c1 { width: 380px; padding-left: 26px; border-right: 6px solid rgba(31,50,84,0.18); white-space: nowrap; overflow: hidden; }
    P .c2 { width: 210px; padding-left: 26px; border-right: 6px solid rgba(31,50,84,0.18); }
    P .c3 { flex: 1; padding-left: 26px; }
    P .c3 .q { color: ${RED}; font-weight: 500; }
    P .pl-row .tapa { position: absolute; left: 0; top: 0; width: 980px; height: 126px; background: #fff; }
    P .cursor { position: absolute; left: 0; width: 190px; height: 132px; border: 8px solid ${G}; opacity: 0; }`,
  html: `
      <div class="est">
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="70" y="600" width="940" height="1040" rx="30" fill="${NAVY2}" stroke="${CR}" stroke-width="8"/>
          <rect x="70" y="1100" width="940" height="26" fill="${CR}"/><rect x="70" y="1560" width="940" height="26" fill="${CR}"/>
          ${prenda(130, 1100, 240, G, 6)}${prenda(420, 1100, 240, CR, 4)}${prenda(710, 1100, 240, GRIS, 7)}
          ${prenda(130, 1560, 240, CR, 3)}${prenda(420, 1560, 240, GRIS, 5)}${prenda(710, 1560, 240, G, 1)}
        </svg>
        ${pill(1, 250, 760, "¿5?", "gris")}${pill(2, 540, 850, "¿3?", "gris")}${pill(3, 830, 710, "¿6?", "gris")}
        ${pill(4, 250, 1350, "¿2?", "gris")}${pill(5, 540, 1260, "¿4?", "gris")}${pill(6, 830, 1430, "¿0?", "gris")}
      </div>
      <div class="reloj"><svg class="rl-luna" viewBox="0 0 96 96" aria-hidden="true"><path d="M62 8 A40 40 0 1 0 88 62 A32 32 0 1 1 62 8 Z" fill="${CR}"/></svg><div class="rl-h">00:59</div><div class="rl-l">VIERNES · DE NOCHE</div></div>
      <div class="plan">
        <div class="pl-bar"><span>pedidos_viernes_FINAL2.xls</span><div class="pl-hora">01:12</div></div>
        <div class="pl-cab"><div class="c0">N.º</div><div class="c1">PRODUCTO</div><div class="c2">CANAL</div><div class="c3">¿PAGÓ?</div></div>
        ${FILAS.map(([n, p, c, ok], i) => `<div class="pl-row r${i}" style="top:${206 + i * 132}px"><div class="c0">${n}</div><div class="c1">${p}</div><div class="c2">${c}</div><div class="c3">${ok === "?" ? '<span class="q">¿?</span>' : ok === "ok" ? "sí" : ""}</div><div class="tapa"></div></div>`).join("")}
        <div class="cursor" style="top:${206 + 5 * 132}px"></div>
      </div>`,
  js: `
      // "El stock, a ojo."
      tl.fromTo(q(".est"), { scale: 1.08, transformOrigin: "540px 1100px" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      [1, 2, 3, 4, 5, 6].forEach((k, i) => pop(".n" + k, 0.36 + i * 0.09, 0.28, 0.5));
      tl.to(qa(".est .pill"), { y: -8, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.04, ease: "sine.inOut" }, 0.85);
      // "Y a la una de la mañana": el reloj
      tl.to(q(".est"), { opacity: 0, scale: 0.9, y: 120, duration: 0.25, ease: "power2.in" }, 1.1);
      tl.fromTo(q(".reloj"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(1.7)" }, 1.25);
      tl.set(q(".rl-h"), { textContent: "01:00" }, 1.86);
      golpe(".rl-h", 1.86, 1.1);
      tl.to(q(".rl-h"), { color: "${RED}", duration: 0.12 }, 1.86);
      // "la planilla.": el reloj se achica a la barra de la planilla
      tl.to(q(".reloj"), { scale: 0.2, x: 330, y: -470, opacity: 0, duration: 0.38, ease: "power3.inOut" }, 2.68);
      tl.fromTo(q(".plan"), { opacity: 0, scale: 0.86, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "power3.out" }, 2.82);
      [0, 1, 2, 3, 4].forEach((i) => tl.fromTo(q(".r" + i + " .tapa"), { x: 0 }, { x: 980, duration: 0.14, ease: "none" }, 2.92 + i * 0.1));
      tl.fromTo(q(".cursor"), { opacity: 0 }, { opacity: 1, duration: 0.06, yoyo: true, repeat: 5, ease: "none" }, 3.3);
      salida(3.68);`,
  sfx: [{ t: 0.36, sfx: "pop", vol: 0.2 }, { t: 0.7, sfx: "pop", vol: 0.2 }, { t: 1.25, sfx: "whoosh-short", vol: 0.2 }, { t: 1.86, sfx: "click", vol: 0.3 }, { t: 2.82, sfx: "whoosh-short", vol: 0.18 }, { t: 2.92, sfx: "typing", vol: 0.2, max: 0.7 }],
});

// ================= s05 · giro (VERDE) =================
escena("s05-giro", {
  css: `
    P .gig { color: ${NAVY}; }
    P .ga, P .gb { position: absolute; left: 0; right: 0; top: 230px; }
    P .g1 { top: 0; font-size: 150px; } P .g2 { top: 170px; font-size: 150px; } P .g3 { top: 350px; font-size: 136px; }
    P .gb .g1 { font-size: 128px; } P .gb .g2 { top: 150px; font-size: 128px; } P .gb .g3 { top: 320px; font-size: 140px; }
    P .hl.n em { color: ${G}; }
    P .graf { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .gbar { fill: ${NAVY}; }
    P .flecha { fill: none; stroke: #fff; stroke-width: 16; stroke-linecap: round; stroke-linejoin: round; }
    P .lapw { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; opacity: 0; }
    P .garabato { fill: none; stroke: ${NAVY}; stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; }`,
  html: `
      <div class="verde"></div>
      <svg class="full graf" viewBox="0 0 1080 1920" aria-hidden="true">
        ${[0, 1, 2, 3, 4].map((i) => `<rect class="gbar gb${i}" x="${150 + i * 166}" y="${1620 - (120 + i * 80)}" width="120" height="${120 + i * 80}" rx="16"/>`).join("")}
        <path class="flecha fl" d="M150 1400 L420 1270 L600 1320 L900 1060"/><path class="flecha fp" d="M820 1050 L910 1052 L896 1140"/>
      </svg>
      <svg class="full lapw" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="garabato gz" d="M140 1240 Q200 1140 250 1240 T360 1240 T470 1240 T580 1240 T690 1240 M150 1420 Q210 1320 260 1420 T370 1420 T480 1420 T590 1420"/>
        <g class="lap2" transform="translate(0 0)"><g transform="rotate(32)"><rect x="-34" y="-330" width="68" height="300" rx="10" fill="#fff" stroke="${NAVY}" stroke-width="8"/><rect x="-34" y="-330" width="68" height="60" rx="10" fill="${NAVY}"/><path d="M-34 -30 L0 46 L34 -30 Z" fill="${CR2}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/><path d="M-11 22 L0 46 L11 22 Z" fill="${NAVY}"/></g></g>
      </svg>
      <div class="ga">
        <div class="gig g1">Vender</div>
        <div class="gig g2">mucho está</div>
        <div class="gig g3">${hl("bárbaro.", "n")}</div>
      </div>
      <div class="gb" style="opacity:0">
        <div class="gig g1">El problema</div>
        <div class="gig g2">es anotarlo</div>
        <div class="gig g3">${hl("a mano.", "n")}</div>
      </div>
      <div class="pie"></div>`,
  js: `
      tl.fromTo(q(".verde"), { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.16, ease: "power3.out" }, 0);
      lineaIn(".ga .g1", 0.0, 0.24); lineaIn(".ga .g2", 0.32, 0.24); lineaIn(".ga .g3", 0.7, 0.26);
      caja(".ga .hl > b", 0.76);
      qa(".gbar").forEach((b, i) => tl.fromTo(b, { scaleY: 0.02, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.08 + i * 0.07));
      dibujar(".fl", 0.4, 0.45); dibujar(".fp", 0.82, 0.16);
      // "El problema es anotarlo a mano."
      tl.to(q(".ga"), { opacity: 0, y: -60, duration: 0.18, ease: "power2.in" }, 1.04);
      tl.to(q(".graf"), { opacity: 0, y: 80, duration: 0.2, ease: "power2.in" }, 1.04);
      tl.set(q(".gb"), { opacity: 1 }, 1.14);
      lineaIn(".gb .g1", 1.14, 0.24); lineaIn(".gb .g2", 1.9, 0.24); lineaIn(".gb .g3", 2.36, 0.26);
      caja(".gb .hl > b", 2.42);
      tl.to(q(".lapw"), { opacity: 1, duration: 0.15 }, 1.3);
      const L = q(".lap2");
      dibujar(".gz", 1.4, 1.2);
      tl.fromTo(L, { x: 130, y: 1240 }, { x: 600, y: 1420, duration: 1.2, ease: "none" }, 1.4);
      tl.to(L, { y: "-=30", duration: 0.1, yoyo: true, repeat: 11, ease: "sine.inOut" }, 1.4);
      golpe(".gb .hl", 2.75, 1.06);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.3 }, { t: 0.76, sfx: "chime", vol: 0.22 }, { t: 1.14, sfx: "whoosh-short", vol: 0.2 }, { t: 1.4, sfx: "typing", vol: 0.14, max: 1.0 }, { t: 2.42, sfx: "click", vol: 0.3 }],
});

// ================= s06 · tienda online: el stock baja solo =================
const PRODUCTO_TEL = (stock) => `
  <div class="ti-bar"><span>tutienda.uy</span></div>
  <div class="ti-foto"><svg viewBox="-50 -60 700 816" aria-hidden="true">${campera(G, GD, NAVY)}</svg></div>
  <div class="ti-nom">Campera · Talle M</div>
  <div class="ti-pre">$ 2.490</div>
  <div class="ti-st"><span class="ti-stl">STOCK</span><span class="ti-stn">${stock}</span></div>
  <div class="ti-btn">Comprar</div>`;
const CSS_TIENDA = `
    P .ti-bar { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: ${NAVY}; }
    P .ti-bar span { position: absolute; left: 0; right: 0; top: 66px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    P .ti-foto { position: absolute; left: 40px; top: 150px; width: 448px; height: 440px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .ti-foto svg { position: absolute; left: 64px; top: 20px; width: 320px; height: 400px; overflow: visible; }
    P .ti-nom { position: absolute; left: 40px; top: 620px; font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .ti-pre { position: absolute; left: 40px; top: 686px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ti-st { position: absolute; left: 40px; top: 772px; width: 448px; height: 110px; border-radius: 24px; background: ${CR}; border: 6px solid ${NAVY}; }
    P .ti-stl { position: absolute; left: 28px; top: 38px; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${NAVY}; }
    P .ti-stn { position: absolute; right: 30px; top: 14px; font: 900 76px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ti-btn { position: absolute; left: 40px; top: 910px; width: 448px; height: 116px; border-radius: 58px; background: ${G}; font: 800 46px/116px "Lexend", sans-serif; text-align: center; color: ${NAVY}; }`;
escena("s06-tienda", {
  css: `${CSS_TIENDA}
    P .flash { position: absolute; left: ${TEL.x + 16 + 40 - 14}px; top: ${TEL.y + 16 + 772 - 14}px; width: 476px; height: 138px; border-radius: 34px; border: 10px solid ${G}; opacity: 0; }
    P .toast { position: absolute; left: 540px; top: 600px; width: 490px; height: 170px; border-radius: 30px; background: #fff; border: 7px solid ${G}; box-shadow: 0 14px 0 rgba(3,6,12,0.55); opacity: 0; }
    P .toast .tk { position: absolute; left: 24px; top: 40px; }
    P .toast .t1 { position: absolute; left: 132px; top: 34px; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .toast .t2 { position: absolute; left: 132px; top: 96px; font: 500 30px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.6); white-space: nowrap; }
    P .stk { position: absolute; left: 670px; top: 810px; width: 370px; height: 440px; border-radius: 40px; background: ${NAVY2}; border: 8px solid ${CR}; box-shadow: 0 16px 0 #050a12; }
    P .stk.on { border-color: ${G}; }
    P .stk-l { position: absolute; left: 0; right: 0; top: 34px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.18em; color: rgba(239,238,229,0.75); }
    P .stk-p { position: absolute; left: 0; right: 0; top: 82px; text-align: center; font: 700 38px/1 "Lexend", sans-serif; color: ${CR}; }
    P .stk-n { position: absolute; left: 0; right: 0; top: 136px; text-align: center; font: 900 210px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .stk-a { position: absolute; left: 34px; right: 34px; top: 350px; height: 60px; border-radius: 30px; background: ${G}; font: 700 32px/60px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }
    P .menos { position: absolute; left: 860px; top: 980px; font: 900 120px/1 "Lexend", sans-serif; color: #fff; opacity: 0; }
    P .caja-reg { position: absolute; left: 670px; top: 1350px; width: 370px; height: 320px; opacity: 0; }
    P .link { fill: none; stroke: ${G}; stroke-width: 10; stroke-linecap: round; }`,
  html: `
      ${celular(PRODUCTO_TEL('<span class="sn">3</span>'))}
      <div class="flash"></div>
      <div class="stk" data-layout-allow-overlap><div class="stk-l">STOCK</div><div class="stk-p">Campera M</div><div class="stk-n">3</div><div class="stk-a">Automático</div></div>
      <div class="menos m1">-1</div>
      <div class="toast to1"><div class="tk">${tick(44)}</div><div class="t1">Venta online</div><div class="t2">#0431 · Campera M</div></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="link lk" d="M690 1480 Q640 1500 600 1420"/><path class="link lk2" d="M855 1350 V1262"/></svg>
      <svg class="caja-reg" viewBox="0 0 380 330" aria-hidden="true">
        <rect x="40" y="10" width="300" height="110" rx="18" fill="${NAVY3}" stroke="${CR}" stroke-width="8"/>
        <text x="190" y="82" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="56" fill="${G}">LOCAL</text>
        <path d="M20 150 H360 L340 320 H40 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>
        ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${70 + c * 64}" y="${180 + r * 40}" width="46" height="26" rx="6" fill="${NAVY3}"/>`).join("")).join("")}
      </svg>`,
  js: `
      const TELS = qa(".tel, .tel-lado");
      const sn = q(".sn"), big = q(".stk-n");
      tl.fromTo(TELS, { y: 120, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".stk"), { x: 420 }, { x: 0, duration: 0.42, ease: "power3.out" }, 0.08);
      tl.fromTo(q(".ti-foto svg"), { scale: 0.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0.1);
      // "cada venta": entra la venta online
      tl.fromTo(q(".to1"), { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 0.32, ease: "back.out(1.5)" }, 0.6);
      // "descuenta el stock": 3 -> 2
      tl.fromTo(q(".m1"), { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, 1.5);
      tl.to(q(".m1"), { y: 60, opacity: 0, duration: 0.2, ease: "power2.in" }, 1.84);
      tl.set([sn, big], { textContent: "2" }, 1.98);
      tl.fromTo(q(".flash"), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" }, 1.98);
      golpe(".ti-st", 1.98, 1.08); golpe(".stk-n", 1.98, 1.15);
      tl.to(q(".stk"), { borderColor: "${G}", duration: 0.15 }, 1.98);
      pop(".stk-a", 2.5);
      // "También la del local.": la caja del mostrador, 2 -> 1
      tl.to(q(".to1"), { opacity: 0, y: -40, duration: 0.2 }, 3.0);
      tl.to(q(".flash"), { opacity: 0, duration: 0.15 }, 3.0);
      tl.fromTo(q(".caja-reg"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.34, ease: "back.out(1.5)" }, 3.2);
      dibujar(".lk", 3.6, 0.2); dibujar(".lk2", 3.6, 0.2);
      tl.set([sn, big], { textContent: "1" }, 3.8);
      tl.fromTo(q(".flash"), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" }, 3.8);
      golpe(".ti-st", 3.8, 1.08); golpe(".stk-n", 3.8, 1.15);
      tl.to(qa(".caja-reg, .lk, .lk2, .flash, .stk"), { opacity: 0, duration: 0.2 }, 4.22);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.18 }, { t: 0.6, sfx: "notification", vol: 0.3 }, { t: 1.98, sfx: "ping", vol: 0.3 }, { t: 2.5, sfx: "pop", vol: 0.25 }, { t: 3.2, sfx: "key-press", vol: 0.3 }, { t: 3.8, sfx: "ping", vol: 0.3 }],
});

// ================= s07 · cobra y arma el envío =================
escena("s07-cobra", {
  css: `${CSS_TIENDA}
    P .pago { position: absolute; inset: 0; background: #fff; opacity: 0; }
    P .pg-ok { position: absolute; left: 124px; top: 190px; width: 280px; height: 280px; }
    P .pg-t1 { position: absolute; left: 0; right: 0; top: 510px; text-align: center; font: 800 54px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .pg-t2 { position: absolute; left: 0; right: 0; top: 590px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }
    P .pg-t3 { position: absolute; left: 0; right: 0; top: 660px; text-align: center; font: 900 88px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .caja { position: absolute; left: 520px; top: 860px; width: 520px; height: 460px; opacity: 0; }
    P .chips { position: absolute; left: 540px; top: 1360px; width: 480px; }
    P .chip { position: absolute; left: 0; width: 480px; height: 92px; border-radius: 46px; border: 6px solid ${CR}; background: ${NAVY}; font: 700 40px/80px "Lexend", sans-serif; color: ${CR}; padding-left: 40px; opacity: 0; }
    P .chip.sel { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    P .chip .tk { position: absolute; right: 16px; top: 10px; }`,
  html: `
      ${celular(PRODUCTO_TEL("1") + `<div class="pago" data-layout-allow-overlap><div class="ti-bar"><span>tutienda.uy</span></div><div class="pg-ok">${tick(140)}</div><div class="pg-t1">Pago aprobado</div><div class="pg-t2">CON MERCADO PAGO</div><div class="pg-t3">$ 2.490</div></div>`)}
      <svg class="caja" viewBox="0 0 520 460" aria-hidden="true">
        <path d="M40 140 L260 60 L480 140 L260 220 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M40 140 L260 220 L260 450 L40 370 Z" fill="${CR2}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M480 140 L260 220 L260 450 L480 370 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M150 100 L370 180 L370 260" fill="none" stroke="${G}" stroke-width="22" stroke-linejoin="round"/>
        <rect x="290" y="270" width="160" height="110" rx="10" fill="#fff" stroke="${NAVY}" stroke-width="6" transform="skewY(-20) translate(0 112)"/>
      </svg>
      <div class="chips">
        <div class="chip ch0 sel" style="top:0">DAC<span class="tk">${tick(30)}</span></div>
        <div class="chip ch1" style="top:112px">Correo</div>
        <div class="chip ch2" style="top:224px">PedidosYa</div>
      </div>`,
  js: `
      // "Cobra con Mercado Pago."
      tl.fromTo(q(".pago"), { opacity: 0 }, { opacity: 1, duration: 0.16 }, 0.0);
      tl.set(qa(".tel-pan > div:not(.pago)"), { opacity: 0 }, 0.17);
      tl.fromTo(q(".pg-ok"), { scale: 0.3, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.1);
      lineaIn(".pg-t1", 0.22); lineaIn(".pg-t2", 0.38); lineaIn(".pg-t3", 0.5);
      // "Arma el envío.": el celular se corre y entra la caja
      tl.to(qa(".tel, .tel-lado"), { x: -40, scale: 0.94, transformOrigin: "0% 50%", duration: 0.4, ease: "power2.inOut" }, 1.0);
      tl.fromTo(q(".caja"), { opacity: 0, y: -260, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.36, ease: "back.out(1.4)" }, 1.2);
      tl.fromTo(q(".caja"), { scaleY: 1 }, { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, 1.56);
      [0, 1, 2].forEach((i) => tl.fromTo(q(".ch" + i), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.24, ease: "back.out(1.6)" }, 1.5 + i * 0.1));
      golpe(".ch0", 1.9, 1.06);`,
  sfx: [{ t: 0.1, sfx: "chime", vol: 0.28 }, { t: 1.2, sfx: "whoosh-short", vol: 0.2 }, { t: 1.56, sfx: "impact-bass-1", vol: 0.22 }, { t: 1.9, sfx: "click-soft", vol: 0.28 }],
});

// ================= s08 · el panel del día, en verde =================
const FILAS_P = [["Pedidos", "87"], ["Stock", "al día"], ["Cobrado", "todo"], ["Envíos", "listos"]];
escena("s08-panel", {
  css: `
    P .pan { position: absolute; left: 60px; top: 560px; width: 960px; height: 1080px; border-radius: 48px; background: ${NAVY2}; border: 8px solid ${CR}; box-shadow: 0 22px 0 #050a12; overflow: hidden; }
    P .pan-h { position: absolute; left: 0; right: 0; top: 0; height: 180px; background: ${NAVY3}; }
    P .pan-h .h1 { position: absolute; left: 50px; top: 40px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(239,238,229,0.75); }
    P .pan-h .h2 { position: absolute; left: 50px; top: 88px; font: 800 64px/1 "Lexend", sans-serif; color: ${CR}; }
    P .pan-h .hr { position: absolute; right: 50px; top: 58px; height: 74px; padding: 0 24px; border-radius: 20px; background: ${NAVY}; font: 800 50px/74px "Lexend", sans-serif; color: ${CR}; }
    P .verdeh { position: absolute; left: 0; right: 0; top: 0; height: 180px; background: ${G}; opacity: 0; }
    P .verdeh .h2 { position: absolute; left: 50px; top: 52px; font: 900 80px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .zz { position: absolute; right: 54px; top: 46px; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .fila { position: absolute; left: 40px; right: 40px; height: 180px; border-radius: 30px; background: ${NAVY}; border: 6px solid ${NAVY3}; }
    P .fila .fn { position: absolute; left: 40px; top: 62px; font: 700 52px/1 "Lexend", sans-serif; color: ${CR}; }
    P .fila .fv { position: absolute; right: 150px; top: 58px; font: 800 58px/1 "Lexend", sans-serif; color: ${G}; }
    P .fila .ft { position: absolute; right: 34px; top: 42px; width: 96px; height: 96px; opacity: 0; }
    P .fila .ft svg { width: 96px; height: 96px; }`,
  html: `
      <div class="pan">
        <div class="pan-h"><div class="h1">BLACK FRIDAY · CIERRE</div><div class="h2">Tu tienda</div><div class="hr">01:00</div></div>
        <div class="verdeh"><div class="h2">Todo al día</div><div class="zz">Zzz</div></div>
        ${FILAS_P.map(([n, v], i) => `<div class="fila f${i}" style="top:${220 + i * 206}px"><div class="fn">${n}</div><div class="fv">${v}</div><div class="ft">${tick(48)}</div></div>`).join("")}
      </div>`,
  js: `
      tl.fromTo(q(".pan"), { scale: 0.9, y: 60, opacity: 0.3 }, { scale: 1, y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      [0, 1, 2, 3].forEach((i) => {
        const t0 = 0.12 + i * 0.22;
        tl.fromTo(q(".f" + i), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.22, ease: "power3.out" }, t0);
        pop(".f" + i + " .ft", t0 + 0.12, 0.26, 0.3);
        tl.to(q(".f" + i), { borderColor: "${G}", duration: 0.15 }, t0 + 0.12);
      });
      // "durmiendo": el encabezado se pone verde
      tl.fromTo(q(".verdeh"), { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "power3.out" }, 1.12);
      tl.to(q(".pan"), { borderColor: "${G}", duration: 0.2 }, 1.12);
      tl.fromTo(q(".zz"), { y: 20, opacity: 0 }, { y: -6, opacity: 1, duration: 0.3, ease: "sine.out" }, 1.25);
      tl.to(q(".pan"), { scale: 1.03, transformOrigin: "50% 40%", duration: 0.5, ease: "sine.inOut" }, 1.3);`,
  sfx: [{ t: 0.24, sfx: "pop", vol: 0.2 }, { t: 0.46, sfx: "pop", vol: 0.2 }, { t: 0.68, sfx: "pop", vol: 0.2 }, { t: 0.9, sfx: "pop", vol: 0.2 }, { t: 1.3, sfx: "sparkle", vol: 0.26 }],
});

// ================= s09 · con tus productos =================
const PRODS = [
  ["Tu producto", G, `<svg viewBox="-50 -60 700 816" aria-hidden="true">${campera(G, GD, NAVY)}</svg>`],
  ["Tu producto", CR, `<svg viewBox="0 0 300 300" aria-hidden="true"><path d="M60 110 H240 L226 270 H74 Z" fill="${NAVY3}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/><path d="M110 110 V80 Q110 40 150 40 Q190 40 190 80 V110" fill="none" stroke="${NAVY}" stroke-width="10"/></svg>`],
  ["Tu producto", CR, `<svg viewBox="0 0 300 300" aria-hidden="true"><path d="M60 200 Q60 70 150 70 Q240 70 240 200 Z" fill="${G}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/><rect x="48" y="190" width="204" height="54" rx="14" fill="${NAVY3}" stroke="${NAVY}" stroke-width="8"/><circle cx="150" cy="60" r="22" fill="${NAVY3}" stroke="${NAVY}" stroke-width="6"/></svg>`],
  ["Tu producto", G, `<svg viewBox="0 0 300 300" aria-hidden="true"><path d="M40 90 L110 50 Q150 80 190 50 L260 90 L240 140 L210 128 V260 H90 V128 L60 140 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/></svg>`],
];
escena("s09-productos", {
  css: `
    P .web { position: absolute; left: 60px; top: 560px; width: 960px; height: 1080px; border-radius: 40px; background: #fff; border: 8px solid ${CR}; box-shadow: 0 22px 0 #050a12; overflow: hidden; }
    P .wb { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: ${NAVY}; }
    P .wb .dots { position: absolute; left: 36px; top: 44px; display: flex; gap: 16px; }
    P .wb .dots i { width: 30px; height: 30px; border-radius: 50%; background: ${NAVY3}; }
    P .wb .url { position: absolute; left: 200px; top: 26px; width: 560px; height: 68px; border-radius: 34px; background: ${NAVY2}; font: 500 32px/68px "IBM Plex Mono", monospace; color: ${CR}; padding-left: 32px; }
    P .wt { position: absolute; left: 50px; top: 150px; font: 900 64px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .pr { position: absolute; width: 410px; height: 380px; border-radius: 30px; border: 6px solid ${NAVY}; overflow: hidden; opacity: 0; }
    P .pr .im { position: absolute; left: 0; right: 0; top: 0; height: 280px; }
    P .pr .im svg { position: absolute; left: 95px; top: 30px; width: 220px; height: 230px; overflow: visible; }
    P .pr .nm { position: absolute; left: 0; right: 0; bottom: 0; height: 100px; background: #fff; border-top: 6px solid ${NAVY}; font: 700 38px/94px "Lexend", sans-serif; color: ${NAVY}; padding-left: 26px; }
    P .pr.sel { border-color: ${G}; }
    P .cur { position: absolute; left: 0; top: 0; width: 80px; height: 100px; }`,
  html: `
      <div class="web">
        <div class="wb"><div class="dots"><i></i><i></i><i></i></div><div class="url">tutienda.uy</div></div>
        <div class="wt">Black Friday</div>
        ${PRODS.map(([n, bg, svg], i) => `<div class="pr p${i}" style="left:${50 + (i % 2) * 440}px;top:${250 + Math.floor(i / 2) * 410}px"><div class="im" style="background:${bg}">${svg}</div><div class="nm">${n}</div></div>`).join("")}
      </div>
      <svg class="cur" viewBox="0 0 80 100" aria-hidden="true"><path d="M8 6 L8 80 L28 62 L42 94 L58 86 L44 56 L72 56 Z" fill="#fff" stroke="${NAVY}" stroke-width="7" stroke-linejoin="round"/></svg>`,
  js: `
      tl.fromTo(q(".web"), { scale: 0.9, y: 60 }, { scale: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      [0, 1, 2, 3].forEach((i) => pop(".p" + i, 0.15 + i * 0.16, 0.32, 0.6));
      const C = q(".cur");
      tl.fromTo(C, { x: 980, y: 1700 }, { x: 760, y: 1380, duration: 0.6, ease: "power2.out" }, 0.7);
      tl.to(C, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, 1.3);
      tl.to(q(".p3"), { borderColor: "${G}", duration: 0.1 }, 1.32);
      golpe(".p3", 1.32, 1.05);
      salida(1.8);`,
  sfx: [{ t: 0.15, sfx: "pop", vol: 0.2 }, { t: 0.47, sfx: "pop", vol: 0.2 }, { t: 0.7, sfx: "whoosh-short", vol: 0.15 }, { t: 1.3, sfx: "click", vol: 0.3 }],
});

// ================= s10 · CTA (VERDE) =================
escena("s10-cta", {
  css: `
    P .vc { position: absolute; left: 80px; top: 360px; width: 920px; height: 520px; border-radius: 60px; background: ${NAVY}; box-shadow: 0 18px 0 ${GD}; }
    P .vc-a { position: absolute; left: 30px; top: 30px; width: 560px; height: 460px; border-radius: 36px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 190px; top: 100px; }
    P .lbl { position: absolute; left: 24px; bottom: 22px; padding: 10px 18px; border-radius: 14px; background: ${NAVY}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 616px; top: 30px; width: 274px; height: 260px; border-radius: 32px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 90px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 690px; top: 336px; width: 130px; height: 130px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 30px; top: 38px; }
    P .vivo { position: absolute; right: 36px; top: 36px; width: 26px; height: 26px; border-radius: 50%; background: ${RED}; }
    P .gig { color: ${NAVY}; }
    P .c1 { top: 985px; font-size: 106px; }
    P .c2 { top: 1120px; font-size: 150px; }
    P .hl.n em { color: ${G}; }
    P .url { position: absolute; left: 90px; top: 1360px; width: 900px; height: 170px; border-radius: 85px; background: ${NAVY}; font: 800 104px/164px "Lexend", sans-serif; text-align: center; color: ${G}; letter-spacing: -0.02em; opacity: 0; }`,
  html: `
      <div class="verde"></div>
      <div class="vc">
        <div class="vc-a"><svg width="180" height="180" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${CR}"/><circle cx="70" cy="56" r="26" fill="${NAVY3}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${NAVY3}"/></svg><div class="lbl">TU TIENDA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div><div class="vivo"></div></div>
        <div class="vc-btn"><svg width="70" height="54" viewBox="0 0 68 52" aria-hidden="true"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div>
      <div class="gig c1">Videollamada</div>
      <div class="gig c2">${hl("gratis", "n")}</div>
      <div class="url">scalerics.com</div>
      <div class="pie"></div>`,
  js: `
      tl.fromTo(q(".verde"), { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.18, ease: "power3.out" }, 0);
      tl.fromTo(q(".vc"), { opacity: 0, scale: 0.8, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0.05);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)", stagger: 0.08 }, 0.2);
      lineaIn(".c1", 0.45, 0.3);
      lineaIn(".c2", 0.78, 0.3);
      caja(".c2 .hl > b", 0.84);
      tl.fromTo(q(".url"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, 1.62);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 9, immediateRender: false }, 2.1);
      tl.fromTo(q(".vivo"), { opacity: 1 }, { opacity: 0.25, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 9, immediateRender: false }, 2.1);
      tl.to(q(".vc"), { y: -14, duration: 2, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.1);
      golpe(".url", 3.2, 1.04);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.45, sfx: "pop", vol: 0.22 }, { t: 0.84, sfx: "click-soft", vol: 0.28 }, { t: 1.62, sfx: "chime", vol: 0.3 }],
});

console.log("escenas escritas:", Object.keys(ESC).join(", "));
