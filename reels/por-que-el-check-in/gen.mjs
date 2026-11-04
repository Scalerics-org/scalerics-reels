// Generador de escenas de reels/por-que-el-check-in (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Estilo "resultaaquee" copiado de por-que-el-carrito: UN objeto
// grande por escena y se transforma. El protagonista es el celular gigante (700 x 1140) sobre navy
// liso, y lo que cambia es su pantalla: check-in → (la fila y el mostrador, objeto lleno) → check-in
// desde casa → asientos → tarjeta de embarque con QR → credencial "personal" → la fila que se vacía
// y el mostrador libre → mensajes de turnos en tu negocio → la web con reservas → turno confirmado a
// las 23:40 → videollamada.
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

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#b9b8ad", GRIS2 = "#8f8e86", SOMBRA = "#060a13";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const avatar = (s = 140, fondo = CR, fig = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;
// avión genérico de perfil (viewBox 100 x 48)
const avion = (w = 100, c = NAVY) =>
  `<svg width="${w}" height="${r2((w * 48) / 100)}" viewBox="0 0 100 48" aria-hidden="true"><path d="M4 21 L18 21 L26 9 L33 9 L29 21 L58 21 L44 2 L54 2 L74 21 L90 21 Q99 24 90 27 L74 27 L54 46 L44 46 L58 27 L29 27 L33 39 L26 39 L18 27 L4 27 Z" fill="${c}"/></svg>`;
const casa = (s = 40, c = NAVY) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M4 20 L20 5 L36 20 V36 H25 V26 H15 V36 H4 Z" fill="${c}"/></svg>`;
const luna = (s = 40, c = NAVY) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M26 4 A17 17 0 1 0 36 28 A13 13 0 1 1 26 4 Z" fill="${c}"/></svg>`;
const reloj = (s = 40, c = "#fff") => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="none" stroke="${c}" stroke-width="5"/><path d="M20 10 V20 L27 24" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/></svg>`;

// QR de mentira, determinista (21 x 21 módulos, con los 3 cuadros de las esquinas)
function QR(px, c = NAVY) {
  const n = 21, m = px / n;
  let s = 7, out = "";
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const finder = (x, y) => x < 8 && y < 8 || x > n - 9 && y < 8 || x < 8 && y > n - 9;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() < 0.48) out += `<rect x="${r2(x * m)}" y="${r2(y * m)}" width="${r2(m + 0.4)}" height="${r2(m + 0.4)}"/>`;
  const fp = (x, y) => `<rect x="${r2(x * m)}" y="${r2(y * m)}" width="${r2(7 * m)}" height="${r2(7 * m)}"/><rect x="${r2((x + 1) * m)}" y="${r2((y + 1) * m)}" width="${r2(5 * m)}" height="${r2(5 * m)}" fill="#fff"/><rect x="${r2((x + 2) * m)}" y="${r2((y + 2) * m)}" width="${r2(3 * m)}" height="${r2(3 * m)}"/>`;
  return `<svg class="qr" width="${px}" height="${px}" viewBox="0 0 ${px} ${px}" aria-hidden="true"><g fill="${c}">${out}${fp(0, 0)}${fp(n - 7, 0)}${fp(0, n - 7)}</g></svg>`;
}

// ---------- el aeropuerto (objeto lleno, coordenadas globales) ----------
// persona de pie: pies en (x, y); cabeza r 54 · cuerpo 156 x 300
const persona = (x, y, fill, cls = "") =>
  `<g class="per ${cls}"><circle cx="${x}" cy="${y - 360}" r="54" fill="${fill}"/><path d="M${x - 78} ${y} V${y - 236} Q${x - 78} ${y - 290} ${x - 24} ${y - 290} H${x + 24} Q${x + 78} ${y - 290} ${x + 78} ${y - 236} V${y} Z" fill="${fill}"/></g>`;
const valija = (x, y, cls = "") =>
  `<g class="val ${cls}"><rect x="${x - 34}" y="${y - 170}" width="68" height="40" rx="14" fill="none" stroke="${CR}" stroke-width="10"/><rect x="${x - 56}" y="${y - 140}" width="112" height="140" rx="18" fill="${NAVY3}" stroke="${CR}" stroke-width="7"/><path d="M${x - 20} ${y - 120} V${y - 20} M${x + 20} ${y - 120} V${y - 20}" stroke="${CR}" stroke-width="7" stroke-linecap="round"/></g>`;
const FILA = [470, 330, 190, 50];
const MOSTRADOR = (filaCls = "") => `
      <svg class="full aero" viewBox="0 0 1080 1920" aria-hidden="true">
        <ellipse cx="810" cy="1462" rx="270" ry="22" fill="${SOMBRA}"/>
        <ellipse cx="270" cy="1462" rx="300" ry="22" fill="${SOMBRA}" class="sombra-fila"/>
        <g class="cartel"><rect x="796" y="760" width="18" height="200" fill="${NAVY3}"/><rect class="cartel-r" x="600" y="630" width="410" height="140" rx="24" fill="${CR}"/><text class="cartel-t" x="805" y="722" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="62" fill="${NAVY}">CHECK-IN</text></g>
        <g class="emp"><circle cx="810" cy="926" r="60" fill="${CR}"/><path d="M700 1100 Q700 996 810 996 Q920 996 920 1100 Z" fill="${CR}"/><rect x="780" y="1010" width="60" height="40" rx="8" fill="${G}"/></g>
        <g class="mos"><rect x="600" y="1112" width="420" height="340" fill="${NAVY3}"/><rect x="600" y="1190" width="420" height="30" fill="${NAVY2}"/><rect class="mos-top" x="576" y="1076" width="468" height="44" rx="12" fill="${CR}"/></g>
        <g class="fila ${filaCls}">${FILA.map((x, i) => persona(x, 1450, i % 2 ? GRIS2 : GRIS, "p" + i) + (i === 1 || i === 3 ? "" : valija(x + 92, 1450, "v" + i))).join("")}</g>
      </svg>`;

// ---------- el celular ----------
// .tel: left 190, top 560, 700 x 1140 (borde crema 10) · .pan (pantalla): left 216, top 586, 648 x 1088
const TEL = (pantallas) => `
      <div class="telw"><div class="tel-sh"></div><div class="tel"><div class="pan">${pantallas}<div class="notch"></div></div></div></div>`;
const barra = (c = NAVY, h = "21:40") => `<div class="hora" style="color:${c}">${h}</div>`;

// pantalla del check-in (s01, s03)
const CHECKIN = (h = "08:10") => `
        <div class="scr checkin">${barra(CR, h)}
          <div class="ci-head"><div class="ci-k">TU VUELO</div>
            <div class="ci-a">MVD</div><div class="ci-b">MAD</div><div class="ci-av">${avion(130, G)}</div><div class="ci-ln"></div></div>
          <div class="ci-card"><div class="ci-r"><span>Pasajero</span><b>1 adulto</b></div><div class="ci-r"><span>Equipaje</span><b>De mano</b></div><div class="ci-r"><span>Asiento</span><b class="ci-as">Elegir</b></div></div>
          <div class="ci-st">CHECK-IN ABIERTO</div>
          <div class="ci-btn">Hacer check-in</div>
        </div>`;

// tarjeta de embarque (s04, s05, s06)
const PASE = `
        <div class="scr pase">${barra(CR, "23:10")}
          <div class="pa-card">
            <div class="pa-h">TARJETA DE EMBARQUE</div>
            <div class="pa-a">MVD</div><div class="pa-b">MAD</div><div class="pa-av">${avion(110, NAVY)}</div>
            <div class="pa-f"><div><span>ASIENTO</span><b class="v">14D</b></div><div><span>EMBARQUE</span><b>07:50</b></div></div>
            <div class="pa-cut"></div>
            <div class="pa-qr">${QR(330)}</div>
          </div>
        </div>`;

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
    ${P} .checkin { background: ${CR}; }
    ${P} .ci-head { position: absolute; left: 0; top: 0; width: 648px; height: 400px; background: ${NAVY}; }
    ${P} .ci-k { position: absolute; left: 50px; top: 110px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; }
    ${P} .ci-a, ${P} .ci-b { position: absolute; top: 170px; font: 800 118px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    ${P} .ci-a { left: 44px; } ${P} .ci-b { right: 44px; }
    ${P} .ci-ln { position: absolute; left: 60px; top: 330px; width: 528px; height: 0; border-top: 6px dashed rgba(239,238,229,0.45); }
    ${P} .ci-av { position: absolute; left: 259px; top: 300px; }
    ${P} .ci-card { position: absolute; left: 36px; top: 440px; width: 576px; height: 330px; border-radius: 44px; background: #fff; border: 6px solid ${NAVY}; padding: 20px 36px; }
    ${P} .ci-r { height: 96px; display: flex; justify-content: space-between; align-items: center; font: 500 36px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.6); border-bottom: 4px solid rgba(11,18,32,0.12); }
    ${P} .ci-r:last-child { border-bottom: 0; }
    ${P} .ci-r b { font-weight: 800; color: ${NAVY}; }
    ${P} .ci-st { position: absolute; left: 36px; top: 800px; height: 70px; padding: 0 28px; border-radius: 35px; background: ${NAVY}; font: 500 30px/70px "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: ${G}; }
    ${P} .ci-btn { position: absolute; left: 36px; top: 920px; width: 576px; height: 120px; border-radius: 60px; background: ${G}; border: 6px solid ${NAVY}; font: 800 50px/108px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    ${P} .pase { background: ${NAVY2}; }
    ${P} .pa-card { position: absolute; left: 30px; top: 90px; width: 588px; height: 970px; border-radius: 44px; background: #fff; border: 6px solid ${NAVY}; overflow: hidden; }
    ${P} .pa-h { position: absolute; left: 0; top: 0; width: 100%; height: 96px; background: ${G}; font: 500 30px/96px "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: ${NAVY}; text-align: center; }
    ${P} .pa-a, ${P} .pa-b { position: absolute; top: 130px; font: 800 96px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .pa-a { left: 34px; } ${P} .pa-b { right: 34px; }
    ${P} .pa-av { position: absolute; left: 238px; top: 152px; }
    ${P} .pa-f { position: absolute; left: 34px; top: 270px; width: 520px; display: flex; justify-content: space-between; }
    ${P} .pa-f span { display: block; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.55); }
    ${P} .pa-f b { display: block; margin-top: 12px; font: 800 76px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .pa-f b.v { color: ${NAVY}; background: ${G}; padding: 4px 14px; border-radius: 14px; margin-left: -14px; }
    ${P} .pa-cut { position: absolute; left: 20px; top: 430px; width: 548px; border-top: 6px dashed rgba(11,18,32,0.3); }
    ${P} .pa-qr { position: absolute; left: 123px; top: 490px; padding: 0; }
    ${P} .pill { position: absolute; padding: 16px 34px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 42px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.5); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${NAVY}; color: #fff; font-weight: 800; }
    ${P} .pill svg { vertical-align: -6px; margin-left: 10px; }
    ${P} .pill svg.izq { margin-left: 0; margin-right: 12px; }
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
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.08, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const TEL = q(".telw");
      const vibrar = (t, n) => tl.fromTo(TEL, { x: 0 }, { x: 10, duration: 0.05, ease: "none", yoyo: true, repeat: n ?? 5, immediateRender: false }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
`;

function escena(id, build) {
  const dur = ESC[id];
  const T = (i) => r2(pal[i].start - INI[id]); // segundo de la palabra i, relativo a la escena
  const { css = "", html, js, sfx } = build(T, dur);
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
// cuadro 0: el gancho entero en grande + el celular con el check-in (achicado abajo)
escena("s01-gancho", (T, D) => ({
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 112px/1.0 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .tit .v { color: ${G}; display: inline-block; }
    P .tap { position: absolute; left: 540px; top: 1554px; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 60px; background: rgba(239,238,229,0.55); border: 6px solid #fff; opacity: 0; }`,
  html: `${TEL(CHECKIN("08:10"))}
      <div class="tap"></div>
      <div class="tit"><div>¿Por qué la</div><div>aerolínea quiere</div><div>que hagas el</div><div><span class="v">check-in</span> desde</div><div>tu casa?</div></div>`,
  js: `
      // el celular empieza chico y bajo (debajo del título) y al final hace push-in a tamaño completo
      gsap.set(TEL, { scale: 0.74, y: 250, transformOrigin: "540px 560px" });
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(TEL, { rotation: -4 }, { rotation: 0, duration: 0.8, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".ci-av"), { x: -200 }, { x: 0, duration: 1.4, ease: "power2.out" }, 0);
      // "check-in": la palabra y el botón laten
      latido(".tit .v", ${T(8)}, 1.1);
      latido(".ci-btn", ${T(8)}, 1.07);
      // "casa": toque en el botón
      tl.fromTo(q(".tap"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, ${T(11)});
      tl.to(q(".tap"), { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in" }, ${T(11) + 0.3});
      tl.to(q(".ci-btn"), { backgroundColor: "${GD}", duration: 0.12, yoyo: true, repeat: 1 }, ${T(11) + 0.05});
      // se va el título y el celular entra a tamaño completo
      tl.to(q(".tit"), { opacity: 0, y: -80, duration: 0.3, ease: "power2.in" }, ${r2(D - 0.55)});
      tl.to(TEL, { scale: 1, y: 0, duration: 0.5, ease: "power3.inOut" }, ${r2(D - 0.5)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(8), sfx: "pop", vol: 0.25 }, { t: T(11), sfx: "click", vol: 0.3 }],
}));

// ================= s02 · la fila y el mostrador =================
escena("s02-fila", (T, D) => ({
  css: `P .fila .per, P .fila .val { opacity: 0; }`,
  html: `${MOSTRADOR()}
      ${selbox("r sb", 560, 1050, 500, 420)}
      ${pill(1, 290, 1560, `${reloj(40, "#fff").replace("<svg", '<svg class="izq"')}Esperando`, "rl")}`,
  js: `
      // entra el aeropuerto: mostrador y cartel
      tl.fromTo(qa(".mos, .cartel"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)", stagger: 0.06 }, 0);
      tl.fromTo(q(".sombra-fila"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${T(15)});
      // "una fila": la gente entra de a uno
      qa(".fila .per, .fila .val").forEach((p) => tl.fromTo(p, { opacity: 0, x: -160 }, { opacity: 1, x: 0, duration: 0.32, ease: "back.out(1.4)" }, ${T(15) - 0.25} + (Number((p.getAttribute("class").match(/[pv](\\d)/) || [0, 0])[1])) * 0.09));
      // "un empleado": aparece detrás del mostrador
      tl.fromTo(q(".emp"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.8)" }, ${T(18) - 0.1});
      // "mostrador": recuadro rojo y "Esperando"
      caja(".sb", ${T(21) - 0.05});
      latido(".mos", ${T(21)}, 1.03);
      nota(1, ${T(21) + 0.25});
      tl.fromTo(qa(".fila .per"), { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.07, immediateRender: false }, ${T(18) + 0.2});`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(15) - 0.2, sfx: "pop", vol: 0.22 }, { t: T(18), sfx: "pop", vol: 0.22 }, { t: T(21), sfx: "glitch-1", vol: 0.12, max: 0.35 }],
}));

// ================= s03 · ahora lo hacés vos =================
escena("s03-vos", (T, D) => ({
  css: `
    P .tap { position: absolute; left: 540px; top: 1566px; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 60px; background: rgba(239,238,229,0.55); border: 6px solid #fff; opacity: 0; }
    P .h2 { position: absolute; left: 64px; top: 24px; font: 600 30px/1 "Lexend", sans-serif; color: ${CR}; opacity: 0; background: ${NAVY}; padding-right: 20px; }`,
  html: `${TEL(CHECKIN("08:10") + `<div class="h2">23:10</div>`)}
      <div class="tap"></div>
      ${pill(1, 540, 1421, `${casa(44, NAVY).replace("<svg", '<svg class="izq"')}Desde casa`, "lleno")}
      ${pill(2, 540, 1421, `${luna(40, G).replace("<svg", '<svg class="izq"')}A las 23:10`, "g")}`,
  js: `
      tl.fromTo(TEL, { y: 500, rotation: 6 }, { y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      // "lo hacés vos": toque y el botón cambia
      tl.fromTo(q(".tap"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, ${T(24) - 0.05});
      tl.to(q(".tap"), { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in" }, ${T(24) + 0.25});
      latido(".ci-btn", ${T(24)}, 1.07);
      tl.to(q(".ci-st"), { opacity: 0, duration: 0.12 }, ${T(25) - 0.15});
      nota(1, ${T(25) - 0.1});
      // "cuando querés": la hora cambia a la noche
      tl.fromTo(q(".h2"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.25 }, ${T(26)});
      tl.set(q(".checkin .hora"), { opacity: 0 }, ${T(26)});
      fuera(".n1", ${T(27) - 0.25}, 0.12);
      nota(2, ${T(27) - 0.1});
      tl.to(TEL, { scale: 1.03, transformOrigin: "540px 1100px", duration: 1.2, ease: "sine.inOut" }, 0.5);
      fuera(".n2", ${r2(D - 0.22)}, 0.18);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(24), sfx: "click", vol: 0.28 }, { t: T(25), sfx: "pop", vol: 0.22 }, { t: T(27), sfx: "pop", vol: 0.22 }],
}));

// ================= s04 · asiento y tarjeta de embarque =================
const FILAS = [12, 13, 14, 15, 16];
const OCUP = new Set(["12A", "12D", "13B", "13C", "14A", "14B", "15D", "16A", "16C", "16D", "13D", "15A"]);
const ASIENTOS = FILAS.map((f, r) => ["A", "B", "C", "D"].map((L, c) => {
  const x = 70 + c * 128 + (c > 1 ? 40 : 0), y = 300 + r * 140, id = f + L;
  return `<div class="as ${OCUP.has(id) ? "oc" : ""} ${id === "14D" ? "elegido" : ""}" style="left:${x}px;top:${y}px">${id === "14D" ? "14D" : ""}</div>`;
}).join("") + `<div class="as-n" style="top:${300 + r * 140 + 30}px">${f}</div>`).join("");
escena("s04-asiento", (T, D) => ({
  css: `
    P .mapa { background: ${CR}; }
    P .ma-t { position: absolute; left: 50px; top: 100px; font: 800 62px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    P .ma-l { position: absolute; top: 210px; font: 500 30px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.55); width: 104px; text-align: center; }
    P .as { position: absolute; width: 104px; height: 110px; border-radius: 24px 24px 14px 14px; background: #fff; border: 6px solid ${NAVY}; font: 800 34px/98px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .as.oc { background: ${GRIS}; border-color: ${GRIS2}; }
    P .as-n { position: absolute; left: 302px; width: 44px; text-align: center; font: 600 32px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.5); }
    P .pase { opacity: 0; }`,
  html: `${TEL(`
        <div class="scr mapa">${barra(NAVY, "23:10")}
          <div class="ma-t">Elegí tu asiento</div>
          ${["A", "B", "C", "D"].map((L, c) => `<div class="ma-l" style="left:${70 + c * 128 + (c > 1 ? 40 : 0)}px">${L}</div>`).join("")}
          ${ASIENTOS}
        </div>${PASE}`)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 900, 1100, 800, 1176, "g")}</svg>
      ${pill(1, 880, 1060, `Ventanilla ${tick(22)}`, "lleno")}
      ${pill(2, 540, 1640, `En el celular ${tick(22)}`, "lleno")}`,
  js: `
      tl.fromTo(q(".mapa"), { opacity: 0, scale: 1.08, transformOrigin: "50% 30%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(qa(".as"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.012 }, 0.02);
      // "asiento": el 14C se pinta de verde
      tl.to(q(".elegido"), { backgroundColor: "${G}", duration: 0.15 }, ${T(30)});
      latido(".elegido", ${T(30)}, 1.25);
      nota(1, ${T(30) + 0.1});
      // "tarjeta de embarque": el mapa se va y entra la tarjeta
      tl.to(q(".mapa"), { opacity: 0, y: -200, duration: 0.3, ease: "power2.in" }, ${T(33) - 0.15});
      tl.to(qa(".n1, .l1, .d1"), { opacity: 0, duration: 0.15 }, ${T(33) - 0.15});
      tl.fromTo(q(".pase"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, ${T(33) - 0.05});
      tl.fromTo(q(".pa-card"), { y: 700, rotation: 8, transformOrigin: "50% 100%" }, { y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.3)" }, ${T(33) - 0.05});
      tl.fromTo(q(".qr"), { scale: 0.5, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.8)" }, ${T(35)});
      // "queda en el celular": push-in al QR
      latido(".qr", ${T(39)}, 1.08);
      nota(2, ${T(39) - 0.05});
      tl.to(TEL, { scale: 1.05, transformOrigin: "540px 1300px", duration: 1.0, ease: "sine.inOut" }, ${T(36)});`,
  sfx: [{ t: 0, sfx: "click-soft", vol: 0.24 }, { t: T(30), sfx: "pop", vol: 0.26 }, { t: T(33) - 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: T(35), sfx: "sparkle", vol: 0.18, max: 0.6 }, { t: T(39), sfx: "chime", vol: 0.24 }],
}));

// ================= s05 · parece que te pasan el trabajo =================
escena("s05-trabajo", (T, D) => ({
  css: `
    P .cred { position: absolute; left: 0; top: 0; width: 648px; height: 1088px; }
    P .cuerda { position: absolute; left: 0; top: 0; }
    P .tarj { position: absolute; left: 104px; top: 340px; width: 440px; height: 560px; border-radius: 36px; background: #fff; border: 7px solid ${NAVY}; overflow: hidden; box-shadow: 0 16px 0 rgba(3,6,12,0.4); }
    P .tj-h { position: absolute; left: 0; top: 0; width: 100%; height: 120px; background: ${RED}; font: 800 50px/120px "Lexend", sans-serif; color: #fff; text-align: center; letter-spacing: 0.04em; }
    P .tj-av { position: absolute; left: 130px; top: 150px; }
    P .tj-n { position: absolute; left: 0; right: 0; top: 352px; text-align: center; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .tj-s { position: absolute; left: 0; right: 0; top: 440px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }
    P .clip-t { position: absolute; left: 284px; top: 300px; width: 80px; height: 60px; border-radius: 14px; background: ${GRIS}; border: 6px solid ${NAVY}; }`,
  html: `${TEL(PASE + `
        <div class="cred">
          <svg class="cuerda" width="648" height="1088" viewBox="0 0 648 1088" aria-hidden="true"><path d="M150 -20 L324 320 L498 -20" fill="none" stroke="${RED}" stroke-width="22" stroke-linejoin="round"/></svg>
          <div class="clip-t"></div>
          <div class="tarj"><div class="tj-h">PERSONAL</div><div class="tj-av">${avatar(180, NAVY3, CR)}</div><div class="tj-n">Vos</div><div class="tj-s">MOSTRADOR</div></div>
        </div>`)}
      ${pill(1, 540, 1610, "¿Laburo tuyo?", "rl")}`,
  js: `
      // "pasan el trabajo": cae la credencial de personal sobre la tarjeta
      tl.fromTo(q(".cred"), { y: -1100 }, { y: 0, duration: 0.45, ease: "back.out(1.2)" }, ${T(43) - 0.3});
      tl.to(q(".pase"), { opacity: 0.35, duration: 0.3 }, ${T(43) - 0.1});
      tl.fromTo(q(".tarj"), { rotation: -10, transformOrigin: "50% 0%" }, { rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" }, ${T(43) + 0.1});
      nota(1, ${T(45) - 0.1});
      vibrar(${T(45)}, 5);
      tl.to(TEL, { scale: 1.04, transformOrigin: "540px 1000px", duration: ${r2(D)}, ease: "sine.inOut" }, 0);`,
  sfx: [{ t: T(43) - 0.3, sfx: "whoosh-short", vol: 0.2 }, { t: T(43) + 0.12, sfx: "impact-bass-1", vol: 0.2, max: 0.5 }, { t: T(45), sfx: "glitch-1", vol: 0.12, max: 0.35 }],
}));

// ================= s06 · ganan los dos =================
escena("s06-ganan", (T, D) => ({
  css: `
    P .mini { position: absolute; left: 70px; top: 760px; width: 400px; height: 700px; border-radius: 64px; background: ${NAVY3}; border: 10px solid ${CR}; opacity: 0; }
    P .mini-p { position: absolute; left: 14px; top: 14px; width: 352px; height: 652px; border-radius: 48px; background: #fff; overflow: hidden; }
    P .mini-h { position: absolute; left: 0; top: 0; width: 100%; height: 110px; background: ${G}; }
    P .mini-a { position: absolute; left: 30px; top: 150px; font: 800 58px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .mini-b { position: absolute; right: 30px; top: 150px; font: 800 58px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .mini-q { position: absolute; left: 46px; top: 290px; }
    P .libre { opacity: 0; }
    P .ganan { position: absolute; left: 0; right: 0; top: 478px; text-align: center; font: 800 96px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; opacity: 0; }
    P .ganan .v { color: ${NAVY}; background: ${G}; padding: 0 22px; border-radius: 16px; }`,
  html: `${MOSTRADOR()}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><g class="libre"><rect x="600" y="630" width="410" height="140" rx="24" fill="${G}"/><text x="805" y="722" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="62" fill="${NAVY}">LIBRE</text></g></svg>
      <div class="mini"><div class="mini-p"><div class="mini-h"></div><div class="mini-a">MVD</div><div class="mini-b">MAD</div><div class="mini-q">${QR(260)}</div></div></div>
      <div class="ganan">Ganan <span class="v">los dos</span></div>
      ${pill(1, 270, 1560, `Sin fila ${tick(22)}`, "lleno")}
      ${pill(2, 810, 1560, `Libre ${tick(22)}`, "lleno")}`,
  js: `
      // vuelve el aeropuerto con la fila (estado de s02)
      tl.fromTo(q(".aero"), { opacity: 0, scale: 1.06, transformOrigin: "540px 1100px" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".ganan"), { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.7)" }, ${T(47) - 0.05});
      // "vos no hacés fila": la fila se va y entra tu celular con la tarjeta
      tl.to(qa(".fila .per, .fila .val"), { opacity: 0, x: -200, duration: 0.3, ease: "power2.in", stagger: 0.05 }, ${T(50) - 0.1});
      tl.to(q(".sombra-fila"), { opacity: 0, duration: 0.3 }, ${T(50)});
      tl.fromTo(q(".mini"), { opacity: 0, y: 300, rotation: -8 }, { opacity: 1, y: 0, rotation: -4, duration: 0.45, ease: "back.out(1.4)" }, ${T(51) - 0.05});
      nota(1, ${T(53)});
      // "el mostrador se libera": cartel verde y el empleado saluda
      tl.to(q(".libre"), { opacity: 1, duration: 0.2 }, ${T(56)});
      tl.set(q(".cartel-t"), { opacity: 0 }, ${T(56)});
      latido(".libre", ${T(56)}, 1.06);
      tl.fromTo(q(".emp"), { rotation: 0 }, { rotation: 5, svgOrigin: "810 1100", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ${T(57)});
      tl.to(q(".mos-top"), { fill: "${G}", duration: 0.2 }, ${T(58) - 0.1});
      nota(2, ${T(58)});
      tl.to(q(".ganan"), { opacity: 0, y: -40, duration: 0.25 }, ${r2(D - 0.3)});`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(47), sfx: "pop", vol: 0.26 }, { t: T(50), sfx: "whoosh-short", vol: 0.16 }, { t: T(53), sfx: "pop", vol: 0.24 }, { t: T(56), sfx: "ping", vol: 0.24 }, { t: T(58), sfx: "chime", vol: 0.24 }],
}));

// ================= s07 · en tu negocio: los mensajes de turnos =================
const MSJ = [
  { n: "Carla", m: "¿Tenés turno el jueves?" },
  { n: "Diego", m: "¿Hay lugar a las 18?" },
  { n: "Ana", m: "¿Me anotás el sábado?" },
  { n: "Pablo", m: "¿Mañana de tarde?" },
];
escena("s07-negocio", (T, D) => ({
  css: `
    P .neg { background: ${CR}; }
    P .ng-head { position: absolute; left: 0; top: 0; width: 648px; height: 250px; background: ${NAVY}; }
    P .ng-ic { position: absolute; left: 44px; top: 96px; width: 120px; height: 120px; border-radius: 30px; background: ${G}; }
    P .ng-ic svg { position: absolute; left: 18px; top: 18px; }
    P .ng-t { position: absolute; left: 190px; top: 108px; font: 800 64px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .ng-s { position: absolute; left: 192px; top: 184px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${G}; }
    P .ng-c { position: absolute; left: 540px; top: 110px; width: 76px; height: 76px; border-radius: 38px; background: ${RED}; border: 5px solid #fff; font: 800 40px/66px "Lexend", sans-serif; color: #fff; text-align: center; }
    P .ng-c span { position: absolute; left: 0; right: 0; top: 0; opacity: 0; }
    P .ms { position: absolute; left: 24px; width: 600px; height: 186px; border-radius: 36px; background: #fff; border: 6px solid ${NAVY}; opacity: 0; }
    P .ms .av { position: absolute; left: 22px; top: 32px; }
    P .ms .nm { position: absolute; left: 160px; top: 32px; font: 800 44px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .ms .tx { position: absolute; left: 160px; top: 96px; width: 370px; font: 600 34px/1.15 "Lexend", sans-serif; color: rgba(11,18,32,0.75); white-space: nowrap; }
    P .ms .pt { position: absolute; right: 28px; top: 34px; width: 34px; height: 34px; border-radius: 17px; background: ${RED}; }`,
  html: `${TEL(`
        <div class="scr neg">
          <div class="ng-head">${barra(CR, "10:15")}<div class="ng-ic"><svg width="84" height="84" viewBox="0 0 84 84"><path d="M8 34 L14 10 H70 L76 34 Z" fill="${NAVY}"/><rect x="12" y="34" width="60" height="42" fill="${CR}"/><rect x="34" y="50" width="16" height="26" fill="${NAVY3}"/></svg></div>
            <div class="ng-t">Tu negocio</div><div class="ng-s">MENSAJES</div><div class="ng-c">${[1, 2, 3, 4].map((n) => `<span class="c${n}">${n}</span>`).join("")}</div></div>
          ${MSJ.map((c, i) => `<div class="ms m${i}" style="top:${280 + i * 200}px"><div class="av">${avatar(120, NAVY3, CR)}</div><div class="nm">${c.n}</div><div class="tx">${c.m}</div><i class="pt"></i></div>`).join("")}
        </div>`)}
      ${pill(1, 540, 1640, `${reloj(40, "#fff").replace("<svg", '<svg class="izq"')}Sin contestar`, "rl")}`,
  js: `
      // la pantalla gira y es tu negocio
      tl.fromTo(q(".neg"), { opacity: 0, rotationY: -70, transformOrigin: "0% 50%" }, { opacity: 1, rotationY: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(TEL, { y: 0 }, { y: 0, duration: 0.01 }, 0);
      // "cuántos te escriben": los mensajes caen y el contador sube
      [${T(61) + 0.1}, ${T(62) - 0.05}, ${T(64)}, ${T(66) - 0.05}].forEach((t, i) => {
        tl.fromTo(q(".m" + i), { opacity: 0, y: -80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, t);
        if (i > 0) tl.set(q(".c" + i), { opacity: 0 }, t);
        tl.set(q(".c" + (i + 1)), { opacity: 1 }, t);
        latido(".ng-c", t, 1.18);
      });
      vibrar(${T(64)}, 3);
      // "turno": "Sin contestar"
      nota(1, ${T(68) + 0.15});
      tl.fromTo(TEL, { scale: 1 }, { scale: 1.04, transformOrigin: "540px 1000px", duration: ${r2(D)}, ease: "sine.inOut", immediateRender: false }, 0);
      fuera(".n1", ${r2(D - 0.2)}, 0.15);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(61) + 0.1, sfx: "notification", vol: 0.26 }, { t: T(62) - 0.05, sfx: "notification", vol: 0.22 }, { t: T(64), sfx: "notification", vol: 0.22 }, { t: T(66) - 0.05, sfx: "notification", vol: 0.2 }],
}));

// ================= s08 · reservas en tu web =================
const DIAS = ["LU", "MA", "MI", "JU", "VI", "SÁ"];
const HORAS = [["10:00", 1], ["11:30", 0], ["14:00", 1], ["16:30", 0], ["18:00", 2], ["19:30", 1]];
escena("s08-web", (T, D) => ({
  css: `
    P .web { background: ${CR}; }
    P .url { position: absolute; left: 30px; top: 76px; width: 588px; height: 70px; border-radius: 35px; background: #fff; border: 5px solid rgba(11,18,32,0.2); font: 500 30px/60px "IBM Plex Mono", monospace; color: rgba(11,18,32,0.65); text-align: center; }
    P .w-head { position: absolute; left: 0; top: 170px; width: 648px; height: 150px; background: ${NAVY}; }
    P .w-t { position: absolute; left: 40px; top: 36px; font: 800 58px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; }
    P .w-t b { color: ${G}; }
    P .w-s { position: absolute; left: 42px; top: 104px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.7); }
    P .dia { position: absolute; top: 350px; width: 88px; height: 110px; border-radius: 22px; background: #fff; border: 5px solid ${NAVY}; font: 800 34px/100px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .dia.sel { background: ${NAVY}; color: ${G}; }
    P .hr { position: absolute; width: 276px; height: 108px; border-radius: 26px; background: #fff; border: 6px solid ${NAVY}; font: 800 46px/96px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .hr.oc { background: ${GRIS}; border-color: ${GRIS2}; color: rgba(11,18,32,0.4); text-decoration: line-through; }
    P .w-btn { position: absolute; left: 30px; top: 940px; width: 588px; height: 116px; border-radius: 58px; background: ${G}; border: 6px solid ${NAVY}; font: 800 48px/104px "Lexend", sans-serif; color: ${NAVY}; text-align: center; opacity: 0.35; }
    P .tap { position: absolute; width: 110px; height: 110px; margin: -55px 0 0 -55px; border-radius: 55px; background: rgba(11,18,32,0.25); border: 6px solid ${NAVY}; opacity: 0; }`,
  html: `${TEL(`
        <div class="scr web">${barra(NAVY, "10:16")}
          <div class="url">tunegocio.com.uy</div>
          <div class="w-head"><div class="w-t">Reservá tu <b>turno</b></div><div class="w-s">ONLINE · 24 HS</div></div>
          ${DIAS.map((d, i) => `<div class="dia ${i === 3 ? "sel" : ""} dd${i}" style="left:${30 + i * 100}px">${d}</div>`).join("")}
          ${HORAS.map(([h, s], i) => `<div class="hr ${s === 0 ? "oc" : ""} ${s === 2 ? "elige" : ""} hh${i}" style="left:${i % 2 ? 342 : 30}px;top:${500 + Math.floor(i / 2) * 136}px">${h}</div>`).join("")}
          <div class="w-btn">Confirmar turno</div>
          <div class="tap" style="left:480px;top:826px"></div>
        </div>`)}
      ${pill(1, 540, 1666, "Sin llamar", "lleno")}
      ${pill(2, 540, 1666, `Solos ${tick(22)}`, "lleno")}`,
  js: `
      // los mensajes se vuelven la web con reservas
      tl.fromTo(q(".web"), { opacity: 0, scale: 1.1, transformOrigin: "50% 30%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      // "reservas": entra el calendario
      tl.fromTo(qa(".dia"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)", stagger: 0.04 }, ${T(70) - 0.1});
      tl.fromTo(qa(".hr"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.6)", stagger: 0.05 }, ${T(70) + 0.15});
      latido(".dd3", ${T(73)}, 1.15);
      // "lo sacan solos": toque en 18:00, se pinta de verde y se habilita el botón
      tl.fromTo(q(".tap"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, ${T(75) - 0.1});
      tl.to(q(".tap"), { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.in" }, ${T(75) + 0.2});
      tl.to(q(".elige"), { backgroundColor: "${G}", duration: 0.12 }, ${T(75)});
      latido(".elige", ${T(75)}, 1.1);
      tl.to(q(".w-btn"), { opacity: 1, duration: 0.15 }, ${T(76) - 0.1});
      latido(".w-btn", ${T(76)}, 1.06);
      nota(1, ${T(73)});
      tl.to(qa(".n1"), { opacity: 0, duration: 0.12 }, ${T(76) - 0.15});
      nota(2, ${T(76) - 0.05});
      tl.to(TEL, { scale: 1.05, transformOrigin: "540px 1300px", duration: 1.6, ease: "sine.inOut" }, ${T(73) - 0.4});
      fuera(".n2", ${r2(D - 0.2)}, 0.15);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.2 }, { t: T(70), sfx: "pop", vol: 0.22 }, { t: T(73), sfx: "pop", vol: 0.22 }, { t: T(75) - 0.1, sfx: "click", vol: 0.28 }, { t: T(76), sfx: "ping", vol: 0.22 }],
}));

// ================= s09 · a cualquier hora, sin esperarte =================
const NOCHE = `
        <div class="scr lock">${barra(CR, "23:40")}
          <div class="lk-m">${luna(70, G)}</div>
          <div class="lk-h">23:40</div><div class="lk-d">MIÉRCOLES · NOCHE</div>
          <div class="noti"><div class="ic">${tick(50, NAVY, G)}</div><div class="t0">TU WEB · AHORA</div><div class="t1">Turno nuevo</div><div class="t2">Lucía · jueves 18:00</div></div>
          <div class="ok">${tick(80, G, NAVY)}<b>Confirmado</b></div>
        </div>`;
const NOCHE_CSS = `
    P .lock { background: ${NAVY2}; }
    P .lk-m { position: absolute; left: 289px; top: 96px; }
    P .lk-h { position: absolute; left: 0; right: 0; top: 180px; text-align: center; font: 700 170px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .lk-d { position: absolute; left: 0; right: 0; top: 370px; text-align: center; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(239,238,229,0.65); }
    P .noti { position: absolute; left: 24px; top: 450px; width: 600px; height: 230px; border-radius: 44px; background: #ffffff; border: 6px solid ${NAVY}; box-shadow: 0 14px 0 rgba(3,6,12,0.35); }
    P .noti .ic { position: absolute; left: 26px; top: 54px; width: 120px; height: 120px; border-radius: 30px; background: ${G}; }
    P .noti .ic svg { position: absolute; left: 10px; top: 10px; }
    P .noti .t0 { position: absolute; left: 172px; top: 34px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: rgba(11,18,32,0.55); }
    P .noti .t1 { position: absolute; left: 172px; top: 80px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .noti .t2 { position: absolute; left: 172px; top: 150px; font: 600 34px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }
    P .ok { position: absolute; left: 0; right: 0; top: 710px; text-align: center; }
    P .ok svg { display: block; margin: 0 auto; }
    P .ok b { display: block; margin-top: 22px; font: 800 64px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.02em; }`;
escena("s09-hora", (T, D) => ({
  css: NOCHE_CSS + `
    P .noti, P .ok { opacity: 0; }`,
  html: `${TEL(NOCHE)}
      ${pill(1, 540, 1650, `Sin esperarte ${tick(22)}`, "lleno")}`,
  js: `
      // "a cualquier hora": la pantalla bloqueada de noche
      tl.fromTo(q(".lock"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
      tl.fromTo(q(".lk-h"), { scale: 0.85, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.02);
      tl.fromTo(q(".lk-m"), { rotation: -30, opacity: 0, transformOrigin: "50% 50%" }, { rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, ${T(79) - 0.1});
      // cae el turno nuevo
      tl.fromTo(q(".noti"), { opacity: 0, y: -300 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, ${T(79) + 0.1});
      vibrar(${T(79) + 0.3}, 5);
      // "sin esperarte": tilde verde, confirmado solo
      tl.fromTo(q(".ok"), { opacity: 0, scale: 0.4, transformOrigin: "50% 30%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, ${T(81) - 0.1});
      nota(1, ${T(81) + 0.25});
      tl.to(TEL, { scale: 1.05, transformOrigin: "540px 1100px", duration: ${r2(D)}, ease: "sine.inOut" }, 0);`,
  sfx: [{ t: 0, sfx: "click-soft", vol: 0.22 }, { t: T(79) + 0.1, sfx: "notification", vol: 0.34 }, { t: T(81) - 0.1, sfx: "chime", vol: 0.3 }],
}));

// ================= s10 · CTA =================
escena("s10-cta", (T, D) => ({
  css: NOCHE_CSS + `
    P .vc { background: ${NAVY}; opacity: 0; }
    P .vc-a { position: absolute; left: 30px; top: 100px; width: 588px; height: 520px; border-radius: 44px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 184px; top: 110px; }
    P .lbl { position: absolute; left: 24px; bottom: 24px; padding: 10px 18px; border-radius: 14px; background: rgba(11,18,32,0.8); font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 30px; top: 650px; width: 588px; height: 250px; border-radius: 44px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .vc-btn { position: absolute; left: 264px; top: 930px; width: 120px; height: 120px; border-radius: 60px; background: ${G}; border: 6px solid ${CR}; }
    P .vc-btn svg { position: absolute; left: 22px; top: 30px; }
    P .cta1 { position: absolute; left: 0; right: 0; top: 1210px; text-align: center; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; opacity: 0; }
    P .cta2w { position: absolute; left: 0; right: 0; top: 1346px; text-align: center; opacity: 0; }
    P .cta2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; }
    P .cta2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .cta3 { position: absolute; left: 0; right: 0; top: 1520px; text-align: center; font: 800 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; opacity: 0; }`,
  html: `${TEL(NOCHE + `
        <div class="scr vc">
          <div class="vc-a">${avatar(220)}<div class="lbl">TU NEGOCIO</div></div>
          <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
          <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
        </div>`)}
      <div class="cta1">Videollamada</div>
      <div class="cta2w"><span class="cta2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="cta3">scalerics.com</div>`,
  js: `
      // "¿Lo armamos?": la pantalla de noche da paso a la videollamada, el celular se achica arriba
      latido(".ok", 0.05, 1.1);
      tl.to(q(".vc"), { opacity: 1, duration: 0.3 }, ${T(83) - 0.1});
      tl.set(q(".lock"), { opacity: 0 }, ${T(83) + 0.25});
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, ${T(83)});
      tl.to(TEL, { scale: 0.62, y: -110, transformOrigin: "540px 600px", duration: 0.6, ease: "power3.inOut" }, ${T(84) - 0.35});
      // Videollamada gratis · scalerics.com
      tl.fromTo(q(".cta1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(86) - 0.15});
      tl.fromTo(q(".cta2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(87) - 0.1});
      caja(".sb", ${T(87) + 0.1});
      tl.fromTo(q(".cta3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${T(89)});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, ${T(89) + 0.5});
      tl.to(TEL, { y: -124, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${T(89) + 0.3});`,
  sfx: [{ t: T(83) - 0.1, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: T(83), sfx: "pop", vol: 0.22 }, { t: T(86) - 0.15, sfx: "whoosh-short", vol: 0.2 }, { t: T(87) + 0.1, sfx: "click-soft", vol: 0.28 }, { t: T(89), sfx: "chime", vol: 0.3 }],
}));

console.log("escenas escritas:", Object.keys(ESC).join(", "), "· total", DUR);
