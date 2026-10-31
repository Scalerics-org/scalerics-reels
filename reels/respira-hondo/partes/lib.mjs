// Piezas compartidas de las escenas de respira-hondo (las usa partes/escenas.mjs).
// Paleta: azul noche #1d1a3a · lavanda #b9a7f5 (clara #c9b8ff) · durazno #ffb38a · menta #8ee6c5 ·
// crema #fff7ee · rojo alerta #ff4757 · verde Scalerics #5ce611 (solo cuando entra Scalerics).
import fs from "node:fs";

export const C = { noche: "#1d1a3a", lav: "#b9a7f5", lavc: "#c9b8ff", dur: "#ffb38a", men: "#8ee6c5", crema: "#fff7ee", piel: "#ffe6d4", rojo: "#ff4757", verde: "#5ce611" };

const r2 = (n) => Math.round(n * 100) / 100;
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const palabras = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([\d.]+)/)[1]);
const ini = (i) => (i === 0 ? 0 : r2(palabras[i].start));

// tiempos de una escena: inicio, duración y w(i) = segundo relativo de la palabra i (índice global)
export function tiempos(id) {
  const k = reel.escenas.findIndex(([e]) => e === id);
  const a = ini(reel.escenas[k][1]);
  const b = k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : VOZ;
  return { a, dur: r2(b - a), w: (i) => r2(palabras[i].start - a) };
}

// ---------- CSS común (prefijado con la escena) ----------
export const cssComun = (id) => {
  const S = `[data-composition-id="${id}"]`;
  return `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .capa { position: absolute; inset: 0; }
    ${S} .esc { position: absolute; inset: 0; }
    ${S} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .abs { position: absolute; }
    ${S} .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; line-height: 0.98; white-space: nowrap; letter-spacing: -0.01em;
      color: ${C.crema}; text-shadow: 0 7px 0 ${C.noche}, 0 0 30px rgba(29, 26, 58, 0.55); }
    ${S} .big.lav { color: ${C.lavc}; } ${S} .big.dur { color: ${C.dur}; } ${S} .big.men { color: ${C.men}; } ${S} .big.rojo { color: ${C.rojo}; } ${S} .big.verde { color: ${C.verde}; }
    ${S} .pill { position: absolute; left: 50%; transform: translateX(-50%); padding: 14px 34px 12px; border-radius: 999px; background: rgba(29, 26, 58, 0.55); border: 3px solid rgba(201, 184, 255, 0.55);
      font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; letter-spacing: 0.2em; color: ${C.crema}; white-space: nowrap; }
    ${S} .pill b { color: ${C.men}; font-weight: 600; }
    ${S} .pill.rojo { background: ${C.rojo}; border-color: ${C.noche}; color: ${C.crema}; }
    ${S} .notif { position: absolute; left: 70px; width: 940px; padding: 22px 28px 24px 132px; border-radius: 38px; background: ${C.crema}; box-shadow: 0 12px 0 rgba(29, 26, 58, 0.45); }
    ${S} .notif .ico { position: absolute; left: 26px; top: 24px; width: 84px; height: 84px; border-radius: 22px; }
    ${S} .notif .ico svg { width: 100%; height: 100%; }
    ${S} .notif .app { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.06em; color: #6b5fa8; white-space: nowrap; }
    ${S} .notif .app i { font-style: normal; float: right; color: #8f86b8; }
    ${S} .notif .tit { margin-top: 4px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; line-height: 1.12; color: ${C.noche}; white-space: nowrap; }
    ${S} .notif .txt { margin-top: 4px; font-family: "Lexend", sans-serif; font-weight: 500; font-size: 33px; line-height: 1.2; color: ${C.noche}; white-space: nowrap; }
    ${S} .notif.alerta { box-shadow: 0 12px 0 ${C.rojo}; border: 5px solid ${C.rojo}; }
    ${S} .planilla { position: absolute; border-radius: 22px; overflow: hidden; background: ${C.crema}; border: 5px solid ${C.noche}; box-shadow: 0 12px 0 rgba(29, 26, 58, 0.45); }
    ${S} .planilla .barra { height: 58px; background: ${C.men}; border-bottom: 4px solid ${C.noche}; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 27px; letter-spacing: 0.1em; color: ${C.noche}; padding: 13px 22px 0; white-space: nowrap; }
    ${S} .planilla .fila { display: flex; border-bottom: 3px solid rgba(29, 26, 58, 0.25); }
    ${S} .planilla .fila span { flex: 1; padding: 12px 16px 10px; border-right: 3px solid rgba(29, 26, 58, 0.25); font-family: "Lexend", sans-serif; font-weight: 600; font-size: 29px; color: ${C.noche}; white-space: nowrap; overflow: hidden; }
    ${S} .planilla .fila span:last-child { border-right: 0; }
    ${S} .planilla .fila.cab span { background: ${C.lav}; font-family: "IBM Plex Mono", monospace; font-size: 28px; letter-spacing: 0.06em; }
    ${S} .tecla { position: absolute; width: 230px; height: 200px; border-radius: 34px; background: ${C.crema}; border: 6px solid ${C.noche}; box-shadow: 0 18px 0 ${C.noche};
      font-family: "Lexend", sans-serif; font-weight: 800; color: ${C.noche}; text-align: center; }
    ${S} .tecla.ancha { width: 330px; }
    ${S} .tecla span { display: block; padding-top: 44px; font-size: 92px; line-height: 1; }
    ${S} .tecla.ancha span { font-size: 78px; padding-top: 52px; }
    ${S} .globo { position: absolute; padding: 20px 30px 18px; border-radius: 34px; background: ${C.crema}; border: 5px solid ${C.noche}; box-shadow: 0 8px 0 rgba(29, 26, 58, 0.45);
      font-family: "Lexend", sans-serif; font-weight: 600; font-size: 38px; line-height: 1.15; color: ${C.noche}; white-space: nowrap; }
    ${S} .globo.men { background: ${C.men}; }
    ${S} .globo small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.05em; color: #6b5fa8; }
    ${S} .sello { position: absolute; padding: 16px 40px 12px; border: 10px solid currentColor; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; white-space: nowrap;
      background: rgba(29, 26, 58, 0.85); text-transform: uppercase; }
    ${S} .etq { position: absolute; left: 0; right: 0; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.3em; color: ${C.lavc}; white-space: nowrap; }
  `;
};

// ---------- íconos de notificación (sin logos: formas genéricas) ----------
export const ICO = {
  wa: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.men}"/><path d="M42 18 C26 18 16 28 16 41 C16 47 18 52 22 56 L19 67 L31 63 C34 65 38 66 42 66 C58 66 68 55 68 42 C68 28 58 18 42 18 Z" fill="${C.crema}" stroke="${C.noche}" stroke-width="4" stroke-linejoin="round"/><circle cx="31" cy="42" r="4" fill="${C.noche}"/><circle cx="42" cy="42" r="4" fill="${C.noche}"/><circle cx="53" cy="42" r="4" fill="${C.noche}"/></svg>`,
  pl: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.men}"/><rect x="16" y="18" width="52" height="48" rx="4" fill="${C.crema}" stroke="${C.noche}" stroke-width="4"/><path d="M16 34 H68 M16 50 H68 M34 18 V66" stroke="${C.noche}" stroke-width="4"/></svg>`,
  ag: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.lav}"/><rect x="16" y="20" width="52" height="46" rx="6" fill="${C.crema}" stroke="${C.noche}" stroke-width="4"/><path d="M16 34 H68 M28 14 V26 M56 14 V26" stroke="${C.noche}" stroke-width="4" stroke-linecap="round"/><rect x="26" y="42" width="12" height="10" fill="${C.rojo}"/></svg>`,
  st: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.dur}"/><path d="M18 32 L42 20 L66 32 L66 58 L42 70 L18 58 Z M18 32 L42 44 L66 32 M42 44 V70" fill="${C.crema}" stroke="${C.noche}" stroke-width="4" stroke-linejoin="round"/></svg>`,
  pago: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.dur}"/><rect x="14" y="24" width="56" height="38" rx="6" fill="${C.crema}" stroke="${C.noche}" stroke-width="4"/><circle cx="42" cy="43" r="9" fill="none" stroke="${C.noche}" stroke-width="4"/></svg>`,
  rep: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.verde}"/><path d="M20 64 V46 M34 64 V34 M48 64 V40 M62 64 V22" stroke="${C.noche}" stroke-width="9" stroke-linecap="round"/></svg>`,
  sc: `<svg viewBox="0 0 84 84"><rect width="84" height="84" rx="22" fill="${C.noche}"/><path d="M22 44 L36 58 L62 28" fill="none" stroke="${C.verde}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
export const notif = (cls, ico, app, tit, txt, hora = "ahora", extra = "") =>
  `<div class="notif ${cls} ${extra}"><div class="ico">${ICO[ico]}</div><div class="app">${app}<i>${hora}</i></div><div class="tit">${tit}</div>${txt ? `<div class="txt">${txt}</div>` : ""}</div>`;

export const planilla = (cls, filas, cab = ["CLIENTE", "PEDIDO", "ESTADO"], titulo = "PEDIDOS.XLSX") =>
  `<div class="planilla ${cls}"><div class="barra">${titulo}</div><div class="fila cab">${cab.map((c) => `<span>${c}</span>`).join("")}</div>${filas
    .map((f, i) => `<div class="fila ${cls}-f${i + 1}">${f.map((c) => `<span>${c}</span>`).join("")}</div>`)
    .join("")}</div>`;

// ---------- el círculo que respira: la guía de la app, con cara ----------
// estados de la cara: z (serena, ojos cerrados) · a (ojos abiertos, sonrisa) · e (enojada) · s (sorprendida)
export function circulo(p, cx = 540, cy = 1000, r = 250) {
  const L = (d, extra = "") => `<path d="${d}" fill="none" stroke="${C.noche}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  return `
  <defs>
    <radialGradient id="${p}gm" cx="45%" cy="38%" r="65%"><stop offset="0" stop-color="#e6fff5"/><stop offset="0.5" stop-color="${C.men}"/><stop offset="1" stop-color="${C.lav}"/></radialGradient>
    <radialGradient id="${p}gr" cx="45%" cy="38%" r="65%"><stop offset="0" stop-color="#ffd6d9"/><stop offset="0.55" stop-color="#ff7d88"/><stop offset="1" stop-color="${C.rojo}"/></radialGradient>
  </defs>
  <g class="${p}circ">
    <circle class="${p}an3" cx="${cx}" cy="${cy}" r="${r + 130}" fill="none" stroke="${C.lavc}" stroke-width="3" opacity="0.22"/>
    <circle class="${p}an2" cx="${cx}" cy="${cy}" r="${r + 80}" fill="none" stroke="${C.lavc}" stroke-width="4" opacity="0.35"/>
    <circle class="${p}an1" cx="${cx}" cy="${cy}" r="${r + 36}" fill="${C.lavc}" opacity="0.2"/>
    <circle class="${p}cuerpo" cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}gm)"/>
    <circle class="${p}rojo" cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}gr)" opacity="0"/>
    <g class="${p}cara">
      <ellipse cx="${cx - 130}" cy="${cy + 48}" rx="34" ry="20" fill="${C.dur}" opacity="0.7"/>
      <ellipse cx="${cx + 130}" cy="${cy + 48}" rx="34" ry="20" fill="${C.dur}" opacity="0.7"/>
      <g class="${p}cz">${L(`M${cx - 120} ${cy - 10} Q${cx - 82} ${cy + 24} ${cx - 44} ${cy - 10}`)}${L(`M${cx + 44} ${cy - 10} Q${cx + 82} ${cy + 24} ${cx + 120} ${cy - 10}`)}${L(`M${cx - 52} ${cy + 66} Q${cx} ${cy + 108} ${cx + 52} ${cy + 66}`)}</g>
      <g class="${p}ca" opacity="0"><ellipse cx="${cx - 82}" cy="${cy - 6}" rx="16" ry="22" fill="${C.noche}"/><ellipse cx="${cx + 82}" cy="${cy - 6}" rx="16" ry="22" fill="${C.noche}"/>${L(`M${cx - 52} ${cy + 66} Q${cx} ${cy + 104} ${cx + 52} ${cy + 66}`)}
        <path class="${p}boca" d="M${cx - 40} ${cy + 74} Q${cx} ${cy + 118} ${cx + 40} ${cy + 74} Z" fill="${C.noche}" opacity="0"/></g>
      <g class="${p}ce" opacity="0"><circle cx="${cx - 80}" cy="${cy + 4}" r="17" fill="${C.noche}"/><circle cx="${cx + 80}" cy="${cy + 4}" r="17" fill="${C.noche}"/>
        ${L(`M${cx - 135} ${cy - 62} L${cx - 45} ${cy - 30}`, 'stroke-width="14"')}${L(`M${cx + 135} ${cy - 62} L${cx + 45} ${cy - 30}`, 'stroke-width="14"')}${L(`M${cx - 60} ${cy + 86} Q${cx} ${cy + 62} ${cx + 60} ${cy + 86}`)}</g>
      <g class="${p}cs" opacity="0"><circle cx="${cx - 82}" cy="${cy - 8}" r="34" fill="${C.crema}" stroke="${C.noche}" stroke-width="8"/><circle cx="${cx + 82}" cy="${cy - 8}" r="34" fill="${C.crema}" stroke="${C.noche}" stroke-width="8"/>
        <circle cx="${cx - 82}" cy="${cy - 4}" r="12" fill="${C.noche}"/><circle cx="${cx + 82}" cy="${cy - 4}" r="12" fill="${C.noche}"/><ellipse cx="${cx}" cy="${cy + 92}" rx="30" ry="38" fill="${C.noche}"/></g>
    </g>
  </g>`;
}

// ---------- el dueño (busto, ~400x470 en coordenadas locales; se ubica con transform) ----------
export function dueno(p, extra = "") {
  const N = C.noche;
  return `<g class="${p}dueno" ${extra}>
    <path d="M24 470 Q34 318 200 306 Q366 318 376 470 Z" fill="${C.dur}" stroke="${N}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M150 312 Q200 372 250 312" fill="none" stroke="${N}" stroke-width="7" stroke-linecap="round"/>
    <path d="M172 340 L166 400 M228 340 L234 400" stroke="${C.crema}" stroke-width="7" stroke-linecap="round"/>
    <rect x="170" y="262" width="60" height="56" fill="${C.piel}" stroke="${N}" stroke-width="7"/>
    <ellipse cx="94" cy="186" rx="22" ry="30" fill="${C.piel}" stroke="${N}" stroke-width="7"/><ellipse cx="306" cy="186" rx="22" ry="30" fill="${C.piel}" stroke="${N}" stroke-width="7"/>
    <ellipse cx="200" cy="178" rx="108" ry="120" fill="${C.piel}" stroke="${N}" stroke-width="7"/>
    <path d="M96 150 Q84 64 150 58 L160 30 L184 56 L204 22 L222 56 L252 32 L256 64 Q318 72 304 150 Q290 104 250 98 Q200 120 140 98 Q108 108 96 150 Z" fill="${N}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/>
    <g opacity="0.3" fill="${N}"><circle cx="150" cy="248" r="3"/><circle cx="170" cy="262" r="3"/><circle cx="196" cy="268" r="3"/><circle cx="222" cy="262" r="3"/><circle cx="246" cy="248" r="3"/><circle cx="136" cy="230" r="3"/><circle cx="262" cy="230" r="3"/><circle cx="186" cy="282" r="3"/><circle cx="210" cy="282" r="3"/></g>
    <ellipse cx="156" cy="200" rx="30" ry="12" fill="${C.lav}" opacity="0.85"/><ellipse cx="244" cy="200" rx="30" ry="12" fill="${C.lav}" opacity="0.85"/>
    <g class="${p}d-ojos"><circle cx="156" cy="176" r="24" fill="${C.crema}" stroke="${N}" stroke-width="6"/><circle cx="244" cy="176" r="24" fill="${C.crema}" stroke="${N}" stroke-width="6"/>
      <circle class="${p}d-pup" cx="160" cy="178" r="9" fill="${N}"/><circle class="${p}d-pup" cx="240" cy="178" r="9" fill="${N}"/>
      <path class="${p}d-parp" d="M130 170 Q156 150 182 170 L182 160 Q156 140 130 160 Z M218 170 Q244 150 270 170 L270 160 Q244 140 218 160 Z" fill="${C.piel}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/></g>
    <g class="${p}d-cerrados" opacity="0"><path d="M132 180 Q156 196 180 180 M220 180 Q244 196 268 180" fill="none" stroke="${N}" stroke-width="7" stroke-linecap="round"/></g>
    <path class="${p}d-cejas" d="M128 136 L180 146 M220 146 L272 136" stroke="${N}" stroke-width="10" stroke-linecap="round"/>
    <path d="M196 196 Q186 226 204 230" fill="none" stroke="${N}" stroke-width="5" stroke-linecap="round"/>
    <ellipse class="${p}d-boca" cx="200" cy="254" rx="30" ry="14" fill="${N}"/>
    <path class="${p}d-gota" d="M318 96 Q332 124 318 136 Q304 124 318 96 Z" fill="${C.men}" stroke="${N}" stroke-width="5" opacity="0"/>
  </g>`;
}

// mate (en coordenadas locales ~160x240)
export const mate = (p) => `<g class="${p}mate">
    <path d="M118 20 L92 132" stroke="${C.lavc}" stroke-width="12" stroke-linecap="round"/>
    <path d="M40 92 Q24 150 40 196 Q80 240 120 196 Q138 150 122 92 Z" fill="${C.dur}" stroke="${C.noche}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M32 92 H130" stroke="${C.noche}" stroke-width="16" stroke-linecap="round"/><path d="M32 92 H130" stroke="${C.lav}" stroke-width="8" stroke-linecap="round"/>
    <path d="M44 150 Q80 162 118 150" fill="none" stroke="${C.noche}" stroke-width="5" opacity="0.4"/>
  </g>`;

// la laptop de espaldas (tapa hacia cámara), ~520x300
export const laptop = (p) => `<g class="${p}lap">
    <path d="M40 0 H480 Q500 0 500 20 V250 H20 V20 Q20 0 40 0 Z" fill="${C.lav}" stroke="${C.noche}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="260" cy="120" r="34" fill="none" stroke="${C.crema}" stroke-width="7" opacity="0.8"/>
    <path d="M0 250 H520 L500 290 H20 Z" fill="${C.crema}" stroke="${C.noche}" stroke-width="8" stroke-linejoin="round"/>
  </g>`;

// ---------- prelude de JS: helpers de animación ----------
export const helpers = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const pop = (el, t, d = 0.35, from = 0.6) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: from }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t); };
      const golpe = (el, t, rot = -3, sc = 2.4) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: sc, rotation: rot * 3 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.1); };
      const fuera = (el, t, d = 0.2) => tl.to(el, { opacity: 0, scale: 0.85, duration: d, ease: "power2.in" }, t);
      const entra = (el, t, desde = { y: 400 }, d = 0.4) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, Object.assign({ opacity: 1 }, desde), { opacity: 1, x: 0, y: 0, duration: d, ease: "back.out(1.4)", immediateRender: false }, t); };
      const cae = (el, t, d = 0.4) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: d, ease: "back.out(1.6)", immediateRender: false }, t); };
      const sacudon = (t, f = 1, el) => [[-14 * f, 8 * f], [10 * f, -6 * f], [-5 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(el || q(".esc"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      const tiembla = (el, t, d, f = 1) => { const n = Math.max(2, Math.round(d / 0.06)); for (let i = 0; i < n; i++) tl.to(el, { x: (i % 2 ? 1 : -1) * 7 * f, y: (i % 3 - 1) * 4 * f, duration: 0.06, ease: "none" }, t + i * 0.06); tl.to(el, { x: 0, y: 0, duration: 0.06 }, t + n * 0.06); };
      const vaiven = (el, t, d, vars, per = 0.4) => tl.to(el, Object.assign({ duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)) | 1, ease: "sine.inOut" }, vars), t);
      const habla = (el, t, d, origin) => tl.fromTo(el, { scaleY: 1, svgOrigin: origin }, { scaleY: 1.8, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }, t);
      const dibujar = (els, t, d = 0.6, stag = 0.05) => [].concat(els).forEach((el, i) => { const L = el.getTotalLength ? el.getTotalLength() : 1000; gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t + i * stag); tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t + i * stag); });
      // cara del círculo: z serena · a abierta · e enojada · s sorprendida
      const cara = (p, est, t) => ["z", "a", "e", "s"].forEach((k) => tl.set(q("." + p + "c" + k), { opacity: k === est ? 1 : 0 }, t));
      const caraYa = (p, est) => ["z", "a", "e", "s"].forEach((k) => gsap.set(q("." + p + "c" + k), { opacity: k === est ? 1 : 0 }));
      // el círculo respira: de escala s0 a s1 en d segundos (con anillos)
      const respira = (p, t, d, s0, s1, o = "540 1000") => { tl.fromTo(q("." + p + "circ"), { scale: s0, svgOrigin: o }, { scale: s1, svgOrigin: o, duration: d, ease: "sine.inOut", immediateRender: false }, t);
        tl.fromTo([q("." + p + "an2"), q("." + p + "an3")], { scale: 0.92, svgOrigin: o }, { scale: s1 > s0 ? 1.08 : 0.9, svgOrigin: o, duration: d, ease: "sine.inOut", immediateRender: false }, t); };
      const enRojo = (p, t, o = 1, d = 0.2) => tl.to(q("." + p + "rojo"), { opacity: o, duration: d, ease: "power2.out" }, t);
      // una pila de spans: muestra el k-ésimo en t (para contadores 4·3·2·1)
      const cuenta = (els, t0, paso) => els.forEach((el, k) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out", immediateRender: false }, t0 + k * paso); if (k < els.length - 1) tl.set(el, { opacity: 0 }, t0 + (k + 1) * paso); });
`;

// ---------- escritura de una escena ----------
export function escena(id, { css = "", html, js, sfx }) {
  const { dur } = tiempos(id);
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${cssComun(id)}
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-escena" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="esc">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${helpers}
${js}
      // salida
      tl.to(q("#${id}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, "[\n" + sfx.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");
}
