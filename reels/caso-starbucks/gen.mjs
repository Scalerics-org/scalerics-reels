// Generador de escenas de reels/caso-starbucks (correr desde la carpeta del reel, después
// `node armar.mjs`). Estilo "resultaaquee" sobre fondo CREMA (copiado de amazon-tambien): un objeto
// grande relleno por escena (navy y verde, con lado oscuro y sombra plana), que se transforma en el
// siguiente. Starbucks se NOMBRA pero no se dibuja: vaso genérico blanco con manga verde lima y tapa
// navy, siluetas, celular, mostrador, local, bolsa.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", CR2 = "#dcdacb", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", W = "#ffffff", GRIS = "#b4b2a3";
const SOMBRA = "rgba(11,18,32,0.16)";
const PAN = "#d9ab62", PAN2 = "#b98a44";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const mas = (r = 26) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="26" fill="${NAVY}"/><path d="M26 14 V38 M14 26 H38" stroke="${CR}" stroke-width="6" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const sombra = (cls, x, y, w, h) => `<div class="sombra ${cls}" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px"></div>`;

// vaso de café genérico (viewBox 0 0 400 560): blanco, manga verde lima, tapa navy
const VASO_SVG = `
  <path class="vapor" d="M150 34 q-22 -26 0 -52 q22 -26 0 -52" fill="none" stroke="${NAVY3}" stroke-width="12" stroke-linecap="round"/>
  <path class="vapor" d="M250 34 q-22 -26 0 -52 q22 -26 0 -52" fill="none" stroke="${NAVY3}" stroke-width="12" stroke-linecap="round"/>
  <polygon points="72,120 328,120 300,524 100,524" fill="${W}"/>
  <polygon points="252,120 328,120 300,524 262,524" fill="${CR2}"/>
  <polygon points="80,250 320,250 310,404 90,404" fill="${G}"/>
  <polygon points="252,250 320,250 310,404 258,404" fill="${GD}"/>
  <text x="172" y="346" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="54" letter-spacing="-1" fill="${NAVY}">CAFÉ</text>
  <rect x="50" y="86" width="300" height="44" rx="20" fill="${NAVY2}"/>
  <rect x="250" y="86" width="100" height="44" rx="20" fill="${NAVY}"/>
  <polygon points="96,90 304,90 286,48 114,48" fill="${NAVY}"/>
  <rect x="226" y="54" width="44" height="14" rx="7" fill="${CR}"/>`;
const vaso = (cls = "") => `<svg class="vaso ${cls}" viewBox="0 0 400 560" aria-hidden="true" data-layout-allow-overflow>${VASO_SVG}</svg>`;
const vasoMini = (s) => `<svg width="${s}" height="${s * 1.4}" viewBox="0 0 400 560" aria-hidden="true">${VASO_SVG.replace(/<path class="vapor"[^>]*\/>/g, "")}</svg>`;

// medialuna (viewBox 0 0 300 200)
const MEDIALUNA = `<path d="M20 150 Q40 30 150 26 Q260 30 280 150 Q250 120 220 128 Q190 70 150 70 Q110 70 80 128 Q50 120 20 150 Z" fill="${PAN}"/>
  <path d="M80 128 Q110 70 150 70 Q190 70 220 128 Q190 112 150 112 Q110 112 80 128 Z" fill="${PAN2}"/>
  <path d="M104 52 Q112 90 118 114 M150 30 V108 M196 52 Q188 90 182 114" stroke="${PAN2}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
const medialuna = (s, cls = "") => `<svg class="ml ${cls}" width="${s}" height="${(s * 2) / 3}" viewBox="0 0 300 200" aria-hidden="true">${MEDIALUNA}</svg>`;

// persona (silueta rellena, viewBox 0 0 160 420)
const persona = (fill, cls = "") => `<svg class="per ${cls}" viewBox="0 0 160 420" aria-hidden="true">
  <rect x="38" y="280" width="36" height="136" rx="16" fill="${fill}"/><rect x="86" y="280" width="36" height="136" rx="16" fill="${fill}"/>
  <path d="M20 300 V178 Q20 118 80 118 Q140 118 140 178 V300 Z" fill="${fill}"/>
  <circle cx="80" cy="62" r="46" fill="${fill}"/>
</svg>`;
// la fila: 6 personas que van hacia el mostrador (a la derecha, al fondo)
const FILA = Array.from({ length: 6 }, (_, i) => {
  const s = 1.45 - i * 0.12, w = 160 * s, h = 420 * s, x = 20 + i * 128, bottom = 1660 - i * 62;
  return { x: r2(x), y: r2(bottom - h), w: r2(w), h: r2(h) };
});
const FILL_P = [NAVY2, NAVY3, NAVY, NAVY2, NAVY3, NAVY];
const fila = () => FILA.map((p, i) => `<div class="pw p${i}" style="left:${p.x}px;top:${p.y}px;width:${p.w}px;height:${p.h}px">${persona(FILL_P[i])}</div>`).join("")
  + FILA.map((p, i) => `<div class="pdash h${i}" style="left:${p.x + 6}px;top:${p.y + 6}px;width:${p.w - 12}px;height:${p.h - 12}px"></div>`).join("");
// mostrador al fondo de la fila (x 780-1060, y 1040-1340) con el vaso arriba
const MOSTRADOR = `<div class="most"><div class="most-top"></div><div class="most-f"></div><div class="most-l"></div></div>`;

// celular (navy), 640 x 1080 en (220, 560)
const celular = (pantalla = "", cls = "") => `
<div class="telw ${cls}"><div class="tel-lado"></div><div class="tel"><div class="tel-pan">${pantalla}</div><div class="tel-notch"></div></div></div>`;
const carritoIco = `<svg width="56" height="50" viewBox="0 0 56 50"><path d="M2 6 H12 L20 36 H48 L54 14 H16" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="24" cy="44" r="5" fill="${NAVY}"/><circle cx="44" cy="44" r="5" fill="${NAVY}"/></svg>`;
const dedo = `<svg class="dedo" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="rgba(11,18,32,0.18)"/><circle cx="60" cy="60" r="34" fill="${NAVY}"/><circle cx="60" cy="60" r="14" fill="${CR}"/></svg>`;

// pantalla de la app de café (604 x 1044)
const APP = `
  <div class="ap-top"><span>PEDIR</span><div class="ap-cart">${carritoIco}<b class="ap-badge">1</b></div></div>
  <div class="ap-hola">Hola, Lucía</div>
  <div class="ap-sub">¿Qué te preparamos?</div>
  ${[["Café con leche", vasoMini(70)], ["Cortado", vasoMini(70)], ["Medialuna", medialuna(96)]].map(([t, ic], i) => `<div class="ap-row r${i}" style="top:${330 + i * 176}px"><div class="ap-ic">${ic}</div><div class="ap-t">${t}</div><div class="ap-mas">${mas(30)}</div><div class="ap-ok">${tick(30)}</div></div>`).join("")}
  <div class="ap-btn">Pedir y pagar</div>`;
// pantalla de pago (604 x 1044)
const PAGO = `
  <div class="ap-top"><span>TU PEDIDO</span></div>
  <div class="pg-card"><div class="pg-ic">${vasoMini(110)}</div><div class="pg-t">Café con leche</div><div class="pg-s">x1 · para retirar</div></div>
  <div class="pg-ret"><span class="pg-k">RETIRÁS EN</span><span class="pg-v">Local Centro</span></div>
  <div class="pg-btn"><span class="pg-a">Pagar</span><span class="pg-b">${tick(26, NAVY, G)}Pagado</span></div>`;
// pantalla de la tienda online de la panadería (604 x 1044)
const TIENDA = `
  <div class="ap-top"><span>TU PANADERÍA</span><div class="ap-cart">${carritoIco}<b class="ap-badge">1</b></div></div>
  <div class="ti-img">${medialuna(250, "m1")}${medialuna(200, "m2")}${medialuna(200, "m3")}</div>
  <div class="ti-nom">Medialunas x6</div>
  <div class="ti-ret"><div class="ti-radio">${tick(24)}</div><div><b>Retiro en el local</b><span>Pasá cuando quieras</span></div></div>
  <div class="pg-btn ti-btn"><span class="pg-a">Pagar</span><span class="pg-b">${tick(26, NAVY, G)}Pagado</span></div>`;

// bolsa de papel (viewBox 0 0 500 620)
const BOLSA = `<svg class="bolsa" viewBox="0 0 500 620" aria-hidden="true" data-layout-allow-overflow>
  <ellipse cx="250" cy="600" rx="230" ry="20" fill="${SOMBRA}"/>
  <path d="M150 130 Q150 40 250 40 Q350 40 350 130" fill="none" stroke="${NAVY}" stroke-width="22" stroke-linecap="round"/>
  <polygon points="40,110 460,110 440,590 60,590" fill="${W}"/>
  <polygon points="360,110 460,110 440,590 372,590" fill="${CR2}"/>
  <polygon points="40,110 460,110 452,190 48,190" fill="${NAVY2}"/>
  <polygon points="360,110 460,110 452,190 364,190" fill="${NAVY}"/>
  <rect x="58" y="420" width="380" height="60" fill="${G}"/>
  <rect x="368" y="420" width="70" height="60" fill="${GD}"/>
</svg>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .sombra { position: absolute; border-radius: 50%; background: ${SOMBRA}; }
    ${P} svg.vaso, ${P} svg.bolsa { position: absolute; overflow: visible; }
    ${P} .pw { position: absolute; }
    ${P} .pw svg { width: 100%; height: 100%; display: block; }
    ${P} .pdash { position: absolute; border: 7px dashed rgba(11,18,32,0.3); border-radius: 60px 60px 24px 24px; opacity: 0; }
    ${P} .most { position: absolute; left: 790px; top: 960px; width: 290px; height: 380px; }
    ${P} .most-top { position: absolute; left: -10px; top: 0; width: 320px; height: 40px; border-radius: 14px; background: ${NAVY}; }
    ${P} .most-f { position: absolute; left: 0; top: 36px; width: 300px; height: 344px; background: ${NAVY2}; }
    ${P} .most-l { position: absolute; left: 0; top: 140px; width: 300px; height: 40px; background: ${G}; }
    ${P} .pill { position: absolute; padding: 16px 32px 17px; border: 6px solid ${NAVY}; border-radius: 999px; background: ${W}; font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .pill.navy { background: ${NAVY}; border-color: ${NAVY}; color: ${CR}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .tag { position: absolute; left: 0; right: 0; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: ${NAVY}; opacity: 0; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.2); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.14); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .telw { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    ${P} .tel-lado { position: absolute; left: 240px; top: 580px; width: 640px; height: 1080px; border-radius: 84px; background: ${CR2}; }
    ${P} .tel { position: absolute; left: 220px; top: 560px; width: 640px; height: 1080px; border-radius: 84px; background: ${NAVY}; }
    ${P} .tel-pan { position: absolute; left: 18px; top: 18px; right: 18px; bottom: 18px; border-radius: 66px; background: ${W}; overflow: hidden; }
    ${P} .tel-notch { position: absolute; left: 250px; top: 32px; width: 140px; height: 32px; border-radius: 16px; background: ${NAVY}; }
    ${P} svg.dedo { position: absolute; width: 120px; height: 120px; opacity: 0; }
    ${P} .ap-top { position: absolute; left: 40px; right: 40px; top: 80px; height: 60px; display: flex; justify-content: space-between; align-items: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: rgba(11,18,32,0.65); }
    ${P} .ap-cart { position: relative; width: 56px; height: 50px; }
    ${P} .ap-badge { position: absolute; right: -20px; top: -18px; width: 40px; height: 40px; border-radius: 50%; background: ${G}; border: 4px solid ${NAVY}; font: 800 22px/32px "Lexend", sans-serif; text-align: center; color: ${NAVY}; opacity: 0; }
    ${P} .ap-hola { position: absolute; left: 40px; top: 170px; font: 800 58px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    ${P} .ap-sub { position: absolute; left: 40px; top: 246px; font: 500 32px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.6); }
    ${P} .ap-row { position: absolute; left: 24px; width: 556px; height: 152px; border-radius: 34px; background: ${CR}; }
    ${P} .ap-row.on { background: ${G}; }
    ${P} .ap-ic { position: absolute; left: 22px; top: 22px; width: 108px; height: 108px; display: flex; align-items: center; justify-content: center; }
    ${P} .ap-t { position: absolute; left: 140px; top: 56px; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ap-mas, ${P} .ap-ok { position: absolute; right: 26px; top: 46px; width: 60px; height: 60px; }
    ${P} .ap-ok { opacity: 0; }
    ${P} .ap-btn { position: absolute; left: 24px; top: 878px; width: 556px; height: 110px; border-radius: 55px; background: ${NAVY}; text-align: center; font: 700 44px/110px "Lexend", sans-serif; color: ${CR}; }
    ${P} .pg-card { position: absolute; left: 24px; top: 170px; width: 556px; height: 360px; border-radius: 40px; background: ${CR}; }
    ${P} .pg-ic { position: absolute; left: 50%; top: 30px; transform: translateX(-50%); }
    ${P} .pg-t { position: absolute; left: 0; right: 0; top: 218px; text-align: center; font: 800 46px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .pg-s { position: absolute; left: 0; right: 0; top: 280px; text-align: center; font: 500 30px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.6); }
    ${P} .pg-ret { position: absolute; left: 24px; top: 560px; width: 556px; height: 150px; border-radius: 34px; border: 6px solid ${NAVY}; }
    ${P} .pg-k { position: absolute; left: 34px; top: 30px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    ${P} .pg-v { position: absolute; left: 34px; top: 74px; font: 800 44px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .pg-btn { position: absolute; left: 24px; top: 878px; width: 556px; height: 120px; border-radius: 60px; background: ${NAVY}; overflow: hidden; }
    ${P} .pg-a, ${P} .pg-b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 16px; font: 800 50px/1 "Lexend", sans-serif; color: ${CR}; }
    ${P} .pg-b { background: ${G}; color: ${NAVY}; opacity: 0; }
    ${P} .ti-img { position: absolute; left: 24px; top: 160px; width: 556px; height: 360px; border-radius: 40px; background: ${CR}; }
    ${P} .ti-img svg.ml { position: absolute; }
    ${P} .ti-img .m1 { left: 153px; top: 150px; } ${P} .ti-img .m2 { left: 40px; top: 50px; } ${P} .ti-img .m3 { left: 316px; top: 50px; }
    ${P} .ti-nom { position: absolute; left: 36px; top: 548px; font: 800 52px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    ${P} .ti-ret { position: absolute; left: 24px; top: 636px; width: 556px; height: 150px; border-radius: 34px; border: 6px solid ${NAVY}; background: rgba(92,230,17,0.18); }
    ${P} .ti-radio { position: absolute; left: 30px; top: 44px; }
    ${P} .ti-ret b { position: absolute; left: 110px; top: 34px; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .ti-ret span { position: absolute; left: 110px; top: 86px; font: 500 28px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.65); }
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
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const late = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const toque = (sel, x, y, t) => { const d = q(sel); gsap.set(d, { left: 0, top: 0 }); tl.set(d, { x: x - 60, y: y - 60 }, t - 0.21); tl.fromTo(d, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, t - 0.2); tl.to(d, { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1 }, t); tl.to(d, { opacity: 0, duration: 0.2 }, t + 0.3); };
      const vapor = (t, n) => qa(".vapor").forEach((v, i) => tl.fromTo(v, { y: 0, opacity: 0.9 }, { y: -18, opacity: 0.35, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: n ?? 3, immediateRender: false }, t + i * 0.25));
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

// ================= s01 · gancho =================
// cuadro 0: la pregunta entera en grande + el vaso gigante; en "antes de llegar" entra el celular
escena("s01-gancho", {
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 112px; text-align: center; font: 800 110px/1.08 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.035em; }
    P .tit .v { display: inline-block; background: ${G}; padding: 0 22px 8px; border-radius: 18px; }
    P .tit .s1 { font-size: 96px; }
    P svg.vaso { left: 250px; top: 760px; width: 580px; height: 812px; }
    P .mtel { position: absolute; left: 700px; top: 1010px; width: 300px; height: 520px; border-radius: 48px; background: ${NAVY}; opacity: 0; }
    P .mtel-p { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 36px; background: ${W}; }
    P .mtel-p .tk { position: absolute; left: 76px; top: 120px; }
    P .mtel-p b { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .mtel-p i { position: absolute; left: 0; right: 0; top: 370px; text-align: center; font: 500 28px/1 "IBM Plex Mono", monospace; font-style: normal; letter-spacing: 0.1em; color: rgba(11,18,32,0.6); }`,
  html: `
      ${sombra("sh", 540, 1555, 520, 46)}
      ${vaso("v0")}
      <div class="mtel"><div class="mtel-p"><div class="tk">${tick(68)}</div><b>Listo</b><i>PARA RETIRAR</i></div></div>
      <div class="tit"><div class="s1">¿Por qué Starbucks</div><div>quiere que pidas</div><div>el café</div><div><span class="v">antes de llegar?</span></div></div>`,
  js: `
      const V = q(".v0");
      tl.fromTo(q(".tit"), { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(V, { y: 24, scale: 0.97, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, 0);
      vapor(0, 2);
      tl.to(V, { rotation: -3, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1, svgOrigin: "200 524" }, 0.6);
      // "antes de llegar": el vaso se corre y entra el celular con el pedido listo
      tl.to(V, { x: -150, duration: 0.45, ease: "power3.inOut" }, 2.2);
      tl.to(q(".sh"), { x: -150, duration: 0.45, ease: "power3.inOut" }, 2.2);
      tl.fromTo(q(".mtel"), { opacity: 0, x: 200, rotation: 12 }, { opacity: 1, x: 0, rotation: 6, duration: 0.45, ease: "back.out(1.5)" }, 2.3);
      pop(".mtel .tk", 2.6, 0.3, 0.3);
      late(".tit .v", 2.75, 1.06);
      // salida: el título sube, el vaso se achica hacia el mostrador de la escena siguiente
      tl.to(q(".tit"), { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, 3.18);
      tl.to(q(".mtel"), { opacity: 0, x: 200, duration: 0.25, ease: "power2.in" }, 3.18);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.2 }, { t: 2.3, sfx: "whoosh-short", vol: 0.22 }, { t: 2.6, sfx: "ping", vol: 0.28 }],
});

// ================= s02 · la fila =================
// el vaso del gancho vuela al mostrador del fondo y entra la fila de gente
escena("s02-fila", {
  css: `
    P svg.vaso { left: 840px; top: 700px; width: 190px; height: 266px; }
    P .tag { top: 600px; }`,
  html: `
      ${MOSTRADOR}
      ${vaso("v0")}
      ${fila()}
      ${selbox("sb r", 8, 900, 800, 780)}
      <div class="tag">ANTES</div>
      ${pill(1, 400, 800, "La fila", "rl")}`,
  js: `
      const V = q(".v0");
      // el vaso grande (s01) baja al mostrador
      tl.fromTo(V, { x: -545, y: 333, scale: 3.05, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power3.inOut" }, 0);
      tl.fromTo(q(".most"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.1);
      qa(".pw").reverse().forEach((p, i) => tl.fromTo(p, { opacity: 0, x: -260 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0.12 + i * 0.07));
      qa(".pw").forEach((p, i) => tl.to(p, { y: -10, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.0 + (i % 3) * 0.12));
      pop(".n1", 0.66);
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 1.45);
      // esperando: golpean el pie
      qa(".pw").forEach((p, i) => tl.to(p, { y: -8, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.1 + (i % 2) * 0.1));
      caja(".sb", 2.86);
      fuera(".n1, .tag", 2.98, 0.16);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: 0.66, sfx: "pop", vol: 0.24 }, { t: 1.45, sfx: "click-soft", vol: 0.22 }, { t: 2.86, sfx: "glitch-1", vol: 0.14, max: 0.4 }],
});

// ================= s03 · antes: pedir, pagar, esperar =================
const IC3 = [
  `<path d="M24 36 Q24 20 40 20 H140 Q156 20 156 36 V104 Q156 120 140 120 H74 L44 150 L48 120 H40 Q24 120 24 104 Z" fill="${NAVY2}"/><circle cx="62" cy="70" r="11" fill="${CR}"/><circle cx="90" cy="70" r="11" fill="${CR}"/><circle cx="118" cy="70" r="11" fill="${CR}"/>`,
  `<rect x="18" y="36" width="144" height="100" rx="16" fill="${NAVY2}"/><rect x="18" y="58" width="144" height="22" fill="${NAVY}"/><rect x="34" y="100" width="54" height="16" rx="8" fill="${G}"/>`,
  `<circle cx="90" cy="90" r="70" fill="${W}" stroke="${NAVY2}" stroke-width="14"/><path class="hand" d="M90 90 L90 42" stroke="${RED}" stroke-width="12" stroke-linecap="round"/><path d="M90 90 L122 90" stroke="${NAVY2}" stroke-width="12" stroke-linecap="round"/><circle cx="90" cy="90" r="10" fill="${NAVY2}"/>`,
];
escena("s03-antes", {
  css: `
    P .c3 { position: absolute; left: 70px; width: 940px; height: 250px; }
    P .c3-lado { position: absolute; left: 14px; top: 16px; width: 100%; height: 100%; border-radius: 44px; background: ${CR2}; }
    P .c3-cara { position: absolute; inset: 0; border-radius: 44px; background: ${W}; border: 7px solid ${NAVY}; overflow: hidden; }
    P .c3-raya { position: absolute; left: 0; top: 0; bottom: 0; width: 24px; background: ${RED}; }
    P .c3-n { position: absolute; left: 56px; top: 56px; width: 124px; height: 124px; border-radius: 50%; background: ${NAVY}; text-align: center; font: 800 70px/124px "Lexend", sans-serif; color: ${CR}; }
    P .c3-t { position: absolute; left: 220px; top: 70px; font: 800 100px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; }
    P .c3-ic { position: absolute; right: 40px; top: 28px; width: 180px; height: 180px; border-radius: 36px; background: ${CR}; }
    P .c3-ic svg { width: 180px; height: 180px; }`,
  html: `
      ${["Pedir", "Pagar", "Esperar"].map((t, i) => `<div class="c3 k${i}" style="top:${600 + i * 290}px"><div class="c3-lado"></div><div class="c3-cara"><div class="c3-raya"></div><div class="c3-n">${i + 1}</div><div class="c3-t">${t}</div><div class="c3-ic"><svg viewBox="0 0 180 180" aria-hidden="true">${IC3[i]}</svg></div></div></div>`).join("")}
`,
  js: `
      [0, 0.79, 1.4].forEach((t, i) => tl.fromTo(q(".k" + i), { opacity: 0, x: 900, rotation: 6 }, { opacity: 1, x: 0, rotation: 0, duration: 0.36, ease: "back.out(1.3)" }, Math.max(0, t - 0.12)));
      [0.25, 1.04, 1.62].forEach((t, i) => tl.fromTo(q(".k" + i + " .c3-ic"), { scale: 1 }, { scale: 1.15, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, t));
      tl.fromTo(q(".hand"), { rotation: 0 }, { rotation: 540, svgOrigin: "90 90", duration: 1.0, ease: "none" }, 1.3);
      // todo se mete en el celular de la escena siguiente
      tl.to(qa(".c3"), { scale: 0.4, opacity: 0, y: (i) => 290 - i * 290, transformOrigin: "50% 50%", duration: 0.3, ease: "power3.in", stagger: 0.03 }, 2.02);
`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.22 }, { t: 0.7, sfx: "pop", vol: 0.22 }, { t: 1.3, sfx: "pop", vol: 0.22 }, { t: 1.4, sfx: "typing", vol: 0.12, max: 0.6 }],
});

// ================= s04 · lo puso en su app =================
escena("s04-app", {
  css: `
    P .tag { top: 484px; }
    P .tag b { display: inline-block; padding: 8px 18px; background: ${NAVY}; color: ${CR}; border-radius: 10px; font-weight: 500; }`,
  html: `
      ${celular(APP)}
      ${dedo}
      <div class="tag"><b>STARBUCKS · SU APP</b></div>`,
  js: `
      tl.fromTo(q(".telw"), { opacity: 0, scale: 0.45, y: 60, transformOrigin: "540px 1100px" }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.3)" }, 0);
      qa(".ap-row").forEach((r, i) => tl.fromTo(r, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0.4 + i * 0.12));
      tl.fromTo(q(".ap-btn"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.8);
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 1.3);
      // "Pedís": toca el café con leche
      toque("svg.dedo", 752, 984, 1.75);
      tl.to(q(".r0"), { backgroundColor: "${G}", duration: 0.15 }, 1.78);
      fuera(".r0 .ap-mas", 1.78, 0.1); pop(".r0 .ap-ok", 1.82, 0.3, 0.3);
      pop(".ap-badge", 2.05, 0.3, 0.3);
      // "celular": pide
      toque("svg.dedo", 540, 1512, 2.85);
      late(".ap-btn", 2.85, 1.06);
      tl.to(q(".telw"), { scale: 1.04, transformOrigin: "540px 1100px", duration: 0.5, ease: "sine.inOut" }, 2.9);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.22 }, { t: 1.3, sfx: "click-soft", vol: 0.22 }, { t: 1.75, sfx: "click", vol: 0.28 }, { t: 2.05, sfx: "pop", vol: 0.22 }, { t: 2.85, sfx: "click", vol: 0.28 }],
});

// ================= s05 · pagás, llegás y retirás =================
escena("s05-retiras", {
  css: `
    P .telw { transform-origin: 540px 1100px; }
    P .most2 { position: absolute; left: 440px; top: 1250px; width: 600px; height: 330px; }
    P .most2 .t { position: absolute; left: -16px; top: 0; width: 632px; height: 48px; border-radius: 16px; background: ${NAVY}; }
    P .most2 .f { position: absolute; left: 0; top: 44px; width: 600px; height: 286px; background: ${NAVY2}; }
    P .most2 .l { position: absolute; left: 0; top: 150px; width: 600px; height: 44px; background: ${G}; }
    P .most2 .o { position: absolute; left: 430px; top: 44px; width: 170px; height: 286px; background: ${NAVY}; }
    P svg.vaso { left: 620px; top: 918px; width: 240px; height: 336px; }
    P .tablero { position: absolute; left: 470px; top: 590px; width: 540px; height: 250px; border-radius: 34px; background: ${NAVY}; }
    P .tablero .k { position: absolute; left: 40px; top: 40px; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: ${G}; }
    P .tablero .nm { position: absolute; left: 40px; top: 104px; font: 800 96px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${CR}; }
    P .tablero .tk { position: absolute; right: 36px; top: 80px; }`,
  html: `
      ${celular(PAGO)}
      ${dedo}
      <div class="tablero"><div class="k">LISTO PARA</div><div class="nm">Lucía</div><div class="tk">${tick(46)}</div></div>
      ${sombra("sh", 740, 1252, 260, 26)}
      ${vaso("v0")}
      <div class="most2"><div class="t"></div><div class="f"></div><div class="l"></div><div class="o"></div></div>
      ${pill(1, 760, 1665, "Sin fila", "lleno")}`,
  js: `
      gsap.set(qa(".tablero, .most2, .v0, .sh"), { opacity: 0 });
      tl.fromTo(q(".tel-pan"), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0);
      toque("svg.dedo", 540, 1516, 0.22);
      tl.to(q(".pg-b"), { opacity: 1, duration: 0.15 }, 0.3); tl.to(q(".pg-a"), { opacity: 0, duration: 0.1 }, 0.3);
      late(".pg-btn", 0.32, 1.06);
      // "llegás": el celular se corre y aparece el mostrador
      tl.to(q(".telw"), { scale: 0.5, x: -290, y: 40, rotation: -6, duration: 0.45, ease: "power3.inOut" }, 0.95);
      tl.fromTo(q(".most2"), { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 1.0);
      tl.fromTo(q(".tablero"), { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 1.12);
      tl.fromTo(qa(".v0, .sh"), { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out" }, 1.2);
      pop(".tablero .tk", 1.45, 0.3, 0.3);
      // "retirás": el vaso se va con vos
      tl.to(q(".v0"), { y: -70, x: -40, rotation: -8, duration: 0.35, ease: "back.out(1.6)" }, 1.66);
      tl.to(q(".sh"), { opacity: 0.4, scale: 0.7, duration: 0.3 }, 1.66);
      pop(".n1", 1.75);`,
  sfx: [{ t: 0.22, sfx: "click", vol: 0.28 }, { t: 0.32, sfx: "ping", vol: 0.28 }, { t: 0.95, sfx: "whoosh-short", vol: 0.2 }, { t: 1.45, sfx: "pop", vol: 0.22 }, { t: 1.75, sfx: "chime", vol: 0.22 }],
});

// ================= s06 · el giro: el café no se hace más rápido =================
escena("s06-giro", {
  css: `
    P .tag { top: 560px; }
    P .tag b { display: inline-block; padding: 8px 18px; background: ${G}; color: ${NAVY}; border-radius: 10px; font-weight: 500; }
    P svg.crono { position: absolute; left: 140px; top: 650px; width: 800px; height: 900px; overflow: visible; }
    P svg.vaso { left: 470px; top: 1060px; width: 140px; height: 196px; }
    P .tacha { position: absolute; left: 290px; top: 1636px; width: 500px; height: 8px; border-radius: 4px; background: ${NAVY}; transform-origin: 0% 50%; transform: scaleX(0); }`,
  html: `
      <svg class="crono" viewBox="0 0 800 900" aria-hidden="true">
        <ellipse cx="400" cy="880" rx="300" ry="22" fill="${SOMBRA}"/>
        <rect x="350" y="20" width="100" height="60" rx="16" fill="${NAVY}"/><rect x="378" y="74" width="44" height="44" fill="${NAVY2}"/>
        <rect x="640" y="140" width="70" height="50" rx="14" fill="${NAVY2}" transform="rotate(45 675 165)"/>
        <circle cx="400" cy="490" r="380" fill="${NAVY}"/>
        <circle cx="400" cy="490" r="330" fill="${W}"/>
        <path class="arco" d="M400 190 A300 300 0 1 1 399.9 190" fill="none" stroke="${G}" stroke-width="34" stroke-linecap="round"/>
        ${Array.from({ length: 12 }, (_, i) => `<path d="M400 168 V${i % 3 === 0 ? 216 : 200}" stroke="${NAVY}" stroke-width="${i % 3 === 0 ? 14 : 9}" stroke-linecap="round" transform="rotate(${i * 30} 400 490)"/>`).join("")}
        <path class="aguja" d="M400 490 L400 220" stroke="${NAVY}" stroke-width="18" stroke-linecap="round"/>
        <circle cx="400" cy="490" r="26" fill="${NAVY}"/>
      </svg>
      ${vaso("v0")}
      <div class="tag"><b>EL GIRO</b></div>
      ${pill(1, 540, 1640, "¿Más rápido?", "rl")}
      <div class="tacha"></div>`,
  js: `
      tl.fromTo(q(".crono"), { opacity: 0, scale: 0.6, transformOrigin: "50% 55%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.1);
      pop(".v0", 0.1, 0.35, 0.3);
      // la aguja gira siempre igual
      tl.fromTo(q(".aguja"), { rotation: 0 }, { rotation: 360, svgOrigin: "400 490", duration: DUR, ease: "none" }, 0);
      dibujar(".arco", 0.05, DUR - 0.05);
      // "no se hace más rápido": la pill se tacha
      pop(".n1", 1.1);
      tl.to(q(".tacha"), { scaleX: 1, duration: 0.25, ease: "power2.out" }, 1.45);
      late(".v0", 1.4, 1.1);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.22, max: 0.8 }, { t: 0.2, sfx: "typing", vol: 0.1, max: 1.2 }, { t: 1.1, sfx: "pop", vol: 0.22 }, { t: 1.45, sfx: "glitch-1", vol: 0.14, max: 0.35 }],
});

// ================= s07 · lo que desaparece es la fila =================
escena("s07-sin-fila", {
  css: `
    P svg.vaso { left: 840px; top: 700px; width: 190px; height: 266px; }
    P .pill.big { font-size: 96px; padding: 20px 50px 24px; border-width: 8px; }`,
  html: `
      ${MOSTRADOR}
      ${vaso("v0")}
      ${fila()}
      ${pill(1, 420, 760, "Fila: 0", "lleno big")}`,
  js: `
      tl.fromTo(qa(".most, .v0"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(qa(".pw"), { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", stagger: 0.02 }, 0);
      // "desaparece": se esfuman de a uno y queda el hueco
      qa(".pw").forEach((p, i) => {
        const t = 0.3 + (5 - i) * 0.09;
        tl.to(p, { opacity: 0, scale: 0.3, y: -60, transformOrigin: "50% 60%", duration: 0.22, ease: "power2.in" }, t);
        tl.to(q(".h" + i), { opacity: 1, duration: 0.15 }, t + 0.12);
      });
      tl.to(qa(".pdash"), { opacity: 0, duration: 0.3 }, 1.4);
      pop(".n1", 1.13, 0.36, 0.5);
      tl.to(q(".v0"), { y: -30, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1 }, 1.2);
      tl.to(q(".n1"), { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.5);`,
  sfx: [{ t: 0.3, sfx: "sparkle", vol: 0.22, max: 0.8 }, { t: 1.13, sfx: "ping", vol: 0.28 }],
});

// ================= s08 · tu cafetería o tu panadería =================
escena("s08-tu-local", {
  css: `
    P svg.local { position: absolute; left: 90px; top: 560px; width: 900px; height: 1040px; overflow: visible; }
    P .cart { position: absolute; left: 90px; top: 588px; width: 900px; text-align: center; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${CR}; }
    P .cart.b { color: ${G}; }
    P .vit { position: absolute; left: 164px; top: 966px; width: 446px; height: 452px; display: flex; align-items: center; justify-content: center; }
    P .vit.b { flex-direction: column; gap: 0; }
    P .vit.b svg { display: block; }
    P .mtel { position: absolute; left: 820px; top: 1180px; width: 200px; height: 360px; border-radius: 36px; background: ${NAVY}; border: 6px solid ${CR}; }
    P .mtel-p { position: absolute; left: 12px; top: 12px; right: 12px; bottom: 12px; border-radius: 26px; background: ${W}; }
    P .mtel-p .tk { position: absolute; left: 38px; top: 60px; }
    P .mtel-p b { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font: 800 34px/1 "Lexend", sans-serif; color: ${NAVY}; }`,
  html: `
      <svg class="local" viewBox="0 0 900 1040" aria-hidden="true">
        <ellipse cx="450" cy="1030" rx="470" ry="24" fill="${SOMBRA}"/>
        <rect x="20" y="300" width="860" height="730" fill="${NAVY2}"/>
        <rect x="700" y="300" width="180" height="730" fill="${NAVY}"/>
        <rect x="0" y="0" width="900" height="180" rx="30" fill="${NAVY}"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 100} 170 H${i * 100 + 100} V286 Q${i * 100 + 50} 336 ${i * 100} 286 Z" fill="${i % 2 ? W : G}"/>`).join("")}
        <rect x="64" y="396" width="466" height="472" rx="20" fill="${CR2}"/>
        <rect x="74" y="406" width="446" height="452" rx="14" fill="${W}"/>
        <polygon points="330,406 400,406 260,858 190,858" fill="${CR}"/>
        <rect x="590" y="420" width="240" height="610" rx="16" fill="${G}"/>
        <rect x="770" y="420" width="60" height="610" fill="${GD}"/>
        <rect x="620" y="460" width="160" height="260" rx="12" fill="${W}"/>
        <circle cx="618" cy="780" r="16" fill="${NAVY}"/>
        <rect x="40" y="880" width="520" height="30" rx="10" fill="${NAVY}"/>
      </svg>
      <div class="cart a">CAFETERÍA</div><div class="cart b">PANADERÍA</div>
      <div class="vit a">${vasoMini(220)}</div>
      <div class="vit b">${medialuna(300)}${medialuna(300)}</div>
      <div class="mtel"><div class="mtel-p"><div class="tk">${tick(50)}</div><b>Pedido</b></div></div>
      ${pill(1, 540, 1672, "Lo mismo, a tu escala", "lleno")}`,
  js: `
      tl.fromTo(q(".local"), { opacity: 0, y: 160, scale: 0.92, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      gsap.set(qa(".cart.b, .vit.b"), { scaleY: 0, opacity: 0 });
      tl.fromTo(q(".cart.a"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 0.35);
      tl.fromTo(q(".vit.a"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.45);
      // "panadería": el cartel y la vidriera giran
      tl.to(qa(".cart.a, .vit.a"), { scaleY: 0, transformOrigin: "50% 50%", duration: 0.14, ease: "power2.in" }, 1.08);
      tl.set(qa(".cart.a, .vit.a"), { opacity: 0 }, 1.22);
      tl.fromTo(qa(".cart.b, .vit.b"), { scaleY: 0, opacity: 1, transformOrigin: "50% 50%" }, { scaleY: 1, opacity: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, 1.22);
      // "pueden hacer lo mismo": el pedido por celular llega al local
      tl.fromTo(q(".mtel"), { opacity: 0, x: 200, rotation: 14 }, { opacity: 1, x: 0, rotation: 6, duration: 0.4, ease: "back.out(1.5)" }, 1.75);
      pop(".mtel .tk", 2.0, 0.3, 0.3);
      pop(".n1", 2.12);
      tl.to(q(".local"), { scale: 1.03, transformOrigin: "50% 100%", duration: 0.6, ease: "sine.inOut" }, 2.5);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.35, sfx: "pop", vol: 0.22 }, { t: 1.08, sfx: "click-soft", vol: 0.26 }, { t: 1.75, sfx: "notification", vol: 0.26 }, { t: 2.12, sfx: "pop", vol: 0.22 }],
});

// ================= s09 · tu tienda online =================
escena("s09-tienda", {
  css: `
    P .telw { transform-origin: 540px 1100px; }
    P .tag { top: 500px; }
    P .tag b { display: inline-block; padding: 8px 18px; background: ${NAVY}; color: ${CR}; border-radius: 10px; font-weight: 500; }
    P svg.bolsa { left: 470px; top: 820px; width: 500px; height: 620px; }
    P .ticket { position: absolute; left: 560px; top: 1150px; width: 380px; height: 190px; border-radius: 26px; background: ${W}; border: 7px solid ${NAVY}; }
    P .ticket .k { position: absolute; left: 30px; top: 30px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${GD}; }
    P .ticket .nm { position: absolute; left: 30px; top: 82px; font: 800 66px/1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; }
    P .ticket .tk { position: absolute; right: 24px; top: 64px; }`,
  html: `
      ${celular(TIENDA)}
      ${dedo}
      <div class="tag"><b>TU TIENDA ONLINE</b></div>
      ${BOLSA}
      <div class="ticket"><div class="k">PARA RETIRAR</div><div class="nm">Lucía</div><div class="tk">${tick(30)}</div></div>`,
  js: `
      gsap.set(qa(".bolsa, .ticket"), { opacity: 0 });
      tl.fromTo(q(".telw"), { opacity: 0, y: 300, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.3)" }, 0);
      qa(".ti-img svg").forEach((m, i) => pop(m, 0.3 + i * 0.1, 0.3, 0.4));
      toque("svg.dedo", 540, 1000, 0.6);
      pop(".ap-badge", 0.66, 0.3, 0.3);
      tl.fromTo(q(".tag"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 1.0);
      toque("svg.dedo", 540, 1288, 1.5);
      pop(".ti-radio", 1.52, 0.3, 0.3);
      late(".ti-ret", 1.52, 1.04);
      // "paga"
      toque("svg.dedo", 540, 1516, 2.25);
      tl.to(q(".pg-b"), { opacity: 1, duration: 0.15 }, 2.3); tl.to(q(".pg-a"), { opacity: 0, duration: 0.1 }, 2.3);
      late(".pg-btn", 2.32, 1.06);
      // "pasa a retirar": sale la bolsa
      tl.to(q(".telw"), { scale: 0.5, x: -300, y: 40, rotation: -6, duration: 0.45, ease: "power3.inOut" }, 2.8);
      tl.fromTo(q(".bolsa"), { opacity: 0, x: -200, scale: 0.5, transformOrigin: "50% 100%" }, { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, 2.9);
      tl.fromTo(q(".ticket"), { opacity: 0, scale: 1.5, rotation: 0 }, { opacity: 1, scale: 1, rotation: -5, duration: 0.3, ease: "power3.out" }, 3.2);
      pop(".ticket .tk", 3.45, 0.3, 0.3);
      fuera(".tag", 3.6, 0.2);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.6, sfx: "click", vol: 0.26 }, { t: 1.5, sfx: "click-soft", vol: 0.26 }, { t: 2.25, sfx: "click", vol: 0.28 }, { t: 2.32, sfx: "ping", vol: 0.28 }, { t: 2.9, sfx: "pop", vol: 0.24 }, { t: 3.2, sfx: "click-soft", vol: 0.26 }],
});

// ================= s10 · lo armamos en Scalerics =================
const BOLSA10 = `svg.bolsa { left: 200px; top: 690px; width: 680px; height: 843px; }`;
escena("s10-scalerics", {
  css: `
    P ${BOLSA10}
    P .etq { position: absolute; left: 270px; top: 1010px; width: 540px; height: 190px; border-radius: 34px; background: ${W}; border: 8px solid ${NAVY}; box-shadow: 14px 16px 0 ${SOMBRA}; }
    P .etq img { position: absolute; left: 40px; top: 52px; width: 444px; height: auto; }`,
  html: `
      ${BOLSA}
      <div class="etq"><img src="assets/logo-oscuro.png" alt="Scalerics"></div>`,
  js: `
      tl.fromTo(q(".bolsa"), { x: 180, y: 20, scale: 0.735, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.inOut" }, 0);
      tl.fromTo(q(".etq"), { opacity: 0, scale: 1.7, rotation: 8 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.24, ease: "power3.in" }, 0.6);
      tl.to(q(".bolsa"), { y: 12, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out" }, 0.84);
      tl.to(qa(".bolsa, .etq"), { y: -14, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.0);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.84, sfx: "impact-bass-1", vol: 0.3, max: 0.8 }],
});

// ================= s11 · CTA =================
const avatar = (s, fondo = NAVY2, fig = CR) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;
escena("s11-cta", {
  css: `
    P ${BOLSA10}
    P .etq { position: absolute; left: 270px; top: 1010px; width: 540px; height: 190px; border-radius: 34px; background: ${W}; border: 8px solid ${NAVY}; transform: rotate(-4deg); }
    P .etq img { position: absolute; left: 40px; top: 52px; width: 444px; height: auto; }
    P .preg { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font: 800 100px/1.1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; opacity: 0; }
    P .preg .v { display: inline-block; background: ${G}; padding: 0 18px 6px; border-radius: 16px; }
    P .vc { position: absolute; left: 79px; top: 560px; width: 922px; height: 480px; border-radius: 70px; background: ${NAVY}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 578px; width: 922px; height: 480px; border-radius: 70px; background: ${CR2}; opacity: 0; }
    P .vc-pan { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; border-radius: 56px; background: ${NAVY2}; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 396px; border-radius: 34px; background: ${CR}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 190px; top: 80px; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: ${NAVY}; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 268px; height: 220px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 42px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-btn { position: absolute; left: 680px; top: 272px; width: 124px; height: 124px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 28px; top: 36px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1110px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1256px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 80px; right: 80px; top: 1452px; height: 170px; border-radius: 85px; background: ${G}; border: 8px solid ${NAVY}; text-align: center; font: 800 104px/150px "Lexend", sans-serif; letter-spacing: -0.03em; color: ${NAVY}; opacity: 0; }`,
  html: `
      <div class="preg"><div>¿Querés verlo</div><div>en tu <span class="v">local?</span></div></div>
      <div class="capa bz">${BOLSA}<div class="etq"><img src="assets/logo-oscuro.png" alt="Scalerics"></div></div>
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a">${avatar(200)}<div class="lbl">TU LOCAL</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      const B = q(".bz");
      tl.fromTo(q(".preg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.5);
      late(".preg .v", 0.8, 1.08);
      tl.to(B, { scale: 1.03, transformOrigin: "540px 1130px", duration: 0.5, ease: "sine.inOut" }, 0);
      // la bolsa se va y aparece la videollamada
      tl.to(B, { scale: 0.5, y: -320, opacity: 0, duration: 0.5, ease: "power3.inOut" }, 0.95);
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, 1.3);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 1.45);
      tl.to(q(".preg"), { opacity: 0, y: -30, duration: 0.25 }, 1.62);
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.7);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.05);
      caja(".sb", 2.2);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 3.0);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, 3.5);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.5);`,
  sfx: [{ t: 0.95, sfx: "whoosh", vol: 0.25, max: 0.7 }, { t: 1.45, sfx: "pop", vol: 0.22 }, { t: 1.7, sfx: "whoosh-short", vol: 0.2 }, { t: 2.2, sfx: "click-soft", vol: 0.28 }, { t: 3.0, sfx: "chime", vol: 0.3 }],
});

console.log("escenas escritas:", Object.keys(ESC).filter((id) => fs.existsSync(`compositions/${id}.html`)).join(", "));
