// Generador de las escenas HTML de reels/por-que-el-caramelo (correr desde la carpeta del reel, después de
// `node armar.mjs`). Base: reels/por-que-se-fue (fondo navy claro #16243d en este reel). Los objetos son 3D de verdad y
// viven en assets/tres.js (una sola escena Three.js); estas escenas son SOLO la capa plana de arriba: el gancho en
// grande, 1-2 rótulos, el crédito del estudio y la tarjeta de cierre.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 0.12);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
// tiempo de la palabra i, relativo al inicio de la escena id
const w = (id, i) => r2(pal[i].start - INI[id]);
const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cruz = (r = 22) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${RED}"/><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const leads = (...ls) => `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${ls.join("")}</svg>`;
const mono = (k, x, y, txt, kind = "") => `<div class="mono ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .pill { position: absolute; display: flex; align-items: center; gap: 16px; padding: 16px 32px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${CR}; font: 700 54px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 8px 0 rgba(0,0,0,0.28); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.r { border-color: ${RED}; color: ${RED}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .pill.rl { background: ${RED}; border-color: ${RED}; color: #fff; }
    ${P} .pill.nom { font-size: 54px; padding: 14px 32px 15px; }
    ${P} .pill.chico { font-size: 46px; padding: 12px 26px 13px; }
    ${P} .pill.grande { font-size: 64px; padding: 20px 44px 22px; }
    ${P} .mono { position: absolute; transform: translateX(-50%); font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; text-transform: uppercase; color: ${CR}; white-space: nowrap; opacity: 0; }
    ${P} .mono.g { color: ${G}; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.5); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .sello { position: absolute; padding: 14px 34px 18px; border: 9px solid ${RED}; border-radius: 22px; font: 900 92px/1 "Lexend", sans-serif; letter-spacing: 0.02em; color: ${RED}; background: rgba(239,238,229,0.92); opacity: 0; white-space: nowrap; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => { const el = typeof s === "string" ? qa(s) : s; tl.set(el, { opacity: 1 }, t); tl.fromTo(el, { scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { scale: 1, duration: d ?? 0.3, ease: "back.out(1.8)", immediateRender: false }, t); };
      const fuera = (s, t, d) => tl.set(typeof s === "string" ? qa(s) : s, { opacity: 0 }, t + (d ?? 0.2));
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.3, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.28); pop(".d" + k, t + 0.2, 0.2); } pop(".n" + k, t); };
      const sinNota = (k, t) => tl.to(qa(".n" + k + ", .l" + k + ", .d" + k), { opacity: 0, duration: 0.08, ease: "power1.in" }, t);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const sello = (s, t, rot) => tl.fromTo(q(s), { opacity: 0, scale: 1.8, rotation: rot ?? -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: rot ?? -8, duration: 0.28, ease: "power4.in" }, t);
      const late = (s, t, k) => tl.fromTo(q(s), { scale: 1 }, { scale: k ?? 1.12, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t);
      const finTodo = () => tl.to(q(".esc"), { opacity: 0, duration: 0.2, ease: "power2.in" }, DUR - 0.22);
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


// Sobre navy: texto crema, la palabra clave en recuadro verde (texto navy) o rojo apagado (el problema).
const TIT = `font: 900 118px/1.04 "Lexend", sans-serif; color: ${CR}; letter-spacing: -0.04em;`;
const marca = (txt, kind = "") => `<span class="mk ${kind}"><b class="fondo"></b><em>${txt}</em></span>`;
const CSS_MK = `
    P .mk { position: relative; display: inline-block; padding: 0 24px; margin: 0 4px; }
    P .mk .fondo { position: absolute; left: 0; right: 0; top: 12px; bottom: 0px; background: ${G}; border-radius: 14px; }
    P .mk.r .fondo { background: ${RED}; }
    P .mk em { position: relative; font-style: normal; color: ${NAVY}; }
    P .mk.r em { color: #fff; }`;
const vacia = (id, sfx) => escena(id, { html: `<i></i>`, js: ``, sfx });
const T = (i) => r2(pal[i].start);
// rótulo con línea guía: aparece en t (relativo), se va al final de la escena
const rotulo = (id, k, t, fin) => `nota(${k}, ${r2(t)}); sinNota(${k}, ${r2(fin ?? ESC[id] - 0.25)});`;


// posiciones en pantalla de los rótulos (medidas sobre los cuadros del 3D)
const POS = {
  cred: [540, 1590], credLead: [540, 1520, 540, 1350],
  pocoMas: [300, 690], pocoLead: [300, 740, 300, 830],
  mas: [870, 760], masLead: [800, 800, 720, 850],
  dosJuntos: [230, 1265], laQueMas: [700, 1560],
  gesto: [540, 1590], gestoLead: [540, 1530, 560, 1290],
  ruben: [300, 880],
  burbuja: [540, 300], colita: 42,
};

// ================= s01 · gancho (cuadro 0 = portada): el platito con la cuenta y el caramelo =================
{
  const id = "s01-gancho";
  escena(id, {
    css: `${CSS_MK}
    P .h { position: absolute; left: 0; right: 0; text-align: center; ${TIT} color: ${NAVY}; }
    P .h1 { top: 150px; font-size: 104px; font-weight: 800; letter-spacing: -0.03em; } P .h2 { top: 286px; font-size: 140px; } P .h3 { top: 450px; font-size: 118px; }`,
    html: `
      <div class="h h1">¿Por qué te traen</div>
      <div class="h h2">un ${marca("caramelo")}</div>
      <div class="h h3">con la cuenta?</div>`,
    js: `
      tl.fromTo(qa(".h"), { scale: 1.03, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0);
      late(".h2 .mk", ${w(id, 5)}, 1.08);
      late(".h3", ${w(id, 8)}, 1.05);
      tl.to(qa(".h"), { opacity: 0, duration: 0.15, ease: "power1.in" }, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: w(id, 5) - 0.03, sfx: "pop", vol: 0.3 }, { t: w(id, 5) + 0.02, sfx: "papel-fuerte", vol: 0.5, max: 0.3 },
    ],
  });
}

// ================= s02 · un estudio comparó las propinas (grúa atrás: la mesa, los comensales, la moza) =================
{
  const id = "s02-estudio";
  const [cx, cy] = POS.cred, [a, b, c, d] = POS.credLead;
  escena(id, {
    css: `P .cred { position: absolute; left: ${cx}px; top: ${cy}px; transform: translate(-50%, -50%); padding: 16px 34px 18px; border-radius: 22px; background: ${NAVY}; border: 6px solid ${G}; font: 600 44px/1.1 "Lexend", sans-serif; letter-spacing: -0.01em; color: ${CR}; white-space: nowrap; opacity: 0; }`,
    html: `${leads(lead(1, a, b, c, d, "g"))}<div class="cred n1">Estudio publicado en 2002</div>`,
    js: `nota(1, ${r2(w(id, 10) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.15)});`,
    sfx: [
      { t: -0.1, sfx: "whoosh-short", vol: 0.35 },
      { t: w(id, 10) + 0.05, sfx: "click-soft", vol: 0.3 }, { t: w(id, 10) + 0.1, sfx: "pop", vol: 0.2 },
    ],
  });
}

// pings de monedas: un golpe metálico corto por cada ~4 monedas
const pings = (t0, dur, n) => Array.from({ length: n }, (_, k) => ({ t: r2(t0 + 0.12 + (dur * k) / Math.max(1, n - 1)), sfx: "ping", vol: 0.6, max: 0.16 }));
// ================= s03 · con uno, subió un poco; con dos, más (las pilas de monedas) =================
{
  const id = "s03-uno-dos";
  const llega1 = 0.62, dos = w(id, 21) - 0.1;
  const [px, py] = POS.pocoMas, [pa, pb, pc, pd] = POS.pocoLead, [mx, my] = POS.mas, [ma, mb, mc, md] = POS.masLead;
  escena(id, {
    html: `${leads(lead(1, pa, pb, pc, pd, "g"), lead(2, ma, mb, mc, md, "g"))}${pill(1, px, py, "Un poco más", "g nom")}${pill(2, mx, my, "Más", "lleno grande")}`,
    js: `nota(1, ${r2(llega1 + 0.75)}); sinNota(1, ${r2(ESC[id] - 0.3)}); nota(2, ${r2(w(id, 22) - 0.05)}); sinNota(2, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.08, sfx: "whoosh", vol: 0.4 },
      ...pings(0.1, 0.36, 4),
      { t: llega1 - 0.02, sfx: "pop", vol: 0.3 },
      ...pings(llega1 + 0.02, 0.5, 4),
      { t: llega1 + 0.75, sfx: "click-soft", vol: 0.3 },
      { t: dos + 0.05, sfx: "whoosh-short", vol: 0.25 }, { t: dos + 0.38, sfx: "pop", vol: 0.3 }, { t: dos + 0.45, sfx: "pop", vol: 0.25 },
      ...pings(dos + 0.42, 0.5, 5),
      { t: w(id, 22) - 0.05, sfx: "click-soft", vol: 0.3 },
    ],
  });
}

// ================= s04 · y la que más: dar uno, amagar a irse y volver con otro (la moza) =================
{
  const id = "s04-uno-mas-uno";
  const dar = w(id, 27) - 0.15, amaga = w(id, 29) - 0.02, vuelve = w(id, 32) - 0.02, latigo = w(id, 35) + 0.05;
  vacia(id, [
    { t: -0.08, sfx: "whoosh-short", vol: 0.3 },
    { t: dar + 0.38, sfx: "pop", vol: 0.25 }, { t: dar + 0.4, sfx: "papel-fuerte", vol: 0.25, max: 0.25 },
    { t: amaga, sfx: "whoosh-short", vol: 0.3 },
    { t: amaga + 0.4, sfx: "tac-real", vol: 0.4 },
    { t: vuelve, sfx: "tic-real", vol: 0.45 }, { t: vuelve + 0.06, sfx: "whoosh-short", vol: 0.2 },
    { t: vuelve + 0.3, sfx: "pop", vol: 0.25 }, { t: vuelve + 0.33, sfx: "papel-fuerte", vol: 0.3, max: 0.25 },
    { t: latigo - 0.05, sfx: "whoosh", vol: 0.45 },
    { t: latigo + 0.3, sfx: "pop", vol: 0.25 }, { t: latigo + 0.5, sfx: "pop", vol: 0.25 },
  ]);
}

// ================= s05 · los mismos dos caramelos (plano general de las 4 pilas; los dos pares y el "=") =================
{
  const id = "s05-mismos";
  const [dx, dy] = POS.dosJuntos, [lx, ly] = POS.laQueMas;
  const t0 = r2(T(35) + 0.05 + 0.62 - INI[id]), verde = r2(t0 + 23 * 0.017 + 0.12), sube = r2(w(id, 38) + 0.05), mismos = r2(w(id, 38) + 0.45);
  escena(id, {
    html: `${pill(1, dx, dy, "Dos juntos", "nom")}${pill(2, lx, ly, "Uno + uno: la que más", "lleno nom")}`,
    js: `nota(2, ${r2(verde + 0.05)}); sinNota(2, ${r2(sube + 0.1)}); nota(1, ${r2(mismos + 0.1)}); sinNota(1, ${r2(ESC[id] - 0.15)});`,
    sfx: [
      ...pings(t0, 0.36, 4),
      { t: verde, sfx: "ding", vol: 0.35, max: 0.8 },
      { t: sube - 0.05, sfx: "whoosh", vol: 0.35 },
      { t: mismos, sfx: "pop", vol: 0.3 }, { t: mismos + 0.15, sfx: "click-soft", vol: 0.3 },
    ],
  });
}

// ================= s06 · ¿Por qué? Se sintió como un gesto personal (el "?" → la mano de la moza) =================
{
  const id = "s06-por-que";
  const [gx, gy] = POS.gesto, [a, b, c, d] = POS.gestoLead;
  escena(id, {
    html: `${leads(lead(1, a, b, c, d, "g"))}${pill(1, gx, gy, "Gesto personal", "lleno grande")}`,
    js: `nota(1, ${r2(w(id, 47) + 0.05)}); sinNota(1, ${r2(ESC[id] - 0.3)});`,
    sfx: [
      { t: -0.15, sfx: "whoosh-cine-corto", vol: 0.15, max: 0.6 }, { t: 0.0, sfx: "pop", vol: 0.3 },
      { t: w(id, 41), sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
      { t: w(id, 42) - 0.02, sfx: "whoosh", vol: 0.4 },
      { t: w(id, 42) + 0.72, sfx: "pop", vol: 0.25 },
      { t: w(id, 47) - 0.05, sfx: "sparkle", vol: 0.3, max: 0.6 },
    ],
  });
}

// ================= s07 · y para que sea personal, tenés que saber quién es (el caramelo al frasco; la fila con "?") =================
{
  const id = "s07-quien";
  const [rx, ry] = POS.ruben;
  escena(id, {
    html: `${pill(1, rx, ry, "Rubén", "nom")}`,
    js: `pop(".n1", 1.45); fuera(".n1", ${r2(ESC[id] - 0.12)}, 0.08);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.4 },
      { t: 0.85, sfx: "ping", vol: 0.5, max: 0.6 }, { t: 0.86, sfx: "tic-real", vol: 0.4 },
      { t: 1.1, sfx: "campanita", vol: 0.25, max: 0.8 },
      ...[0, 1, 2, 3, 4].map((k) => ({ t: r2(w(id, 56) - 0.05 + k * 0.07), sfx: "pop", vol: 0.25 })),
    ],
  });
}

// ================= s08 · la ficha de Rubén le avisa: Graciela hace un año que viene (la tablet) =================
vacia("s08-ficha", [
  { t: -0.05, sfx: "whoosh-short", vol: 0.3 },
  { t: w("s08-ficha", 59) + 0.05, sfx: "click", vol: 0.4 }, { t: w("s08-ficha", 59) + 0.1, sfx: "whoosh-short", vol: 0.15 },
  { t: w("s08-ficha", 63) - 0.05, sfx: "vibra", vol: 1.0, max: 0.45 }, { t: w("s08-ficha", 63) + 0.02, sfx: "notification", vol: 0.4, max: 0.7 },
  { t: w("s08-ficha", 64) - 0.02, sfx: "pop", vol: 0.25 }, { t: w("s08-ficha", 67) - 0.02, sfx: "sparkle", vol: 0.3, max: 0.5 }, { t: w("s08-ficha", 67), sfx: "pop", vol: 0.2 },
]);

// ================= s09 · le da un caramelo… y vuelve con otro · RUBÉN: "Y este… por tu año." =================
{
  const id = "s09-vuelve";
  const [bx, by] = POS.burbuja;
  const tH = w(id, 78) - 0.05, tC = w(id, 82) + 0.78, daR = w(id, 70) - 0.05, mira = w(id, 73) + 0.3, vuelve = w(id, 74) - 0.05, toma = w(id, 81) - 0.1;
  escena(id, {
    css: `
    P .burb { position: absolute; left: ${bx}px; top: ${by}px; transform: translate(-50%, -50%); padding: 26px 48px 32px; border-radius: 48px; background: ${CR}; border: 7px solid ${NAVY}; font: 700 70px/1.1 "Lexend", sans-serif; letter-spacing: -0.02em; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(0,0,0,0.25); }
    P .burb::after { content: ""; position: absolute; left: ${POS.colita}%; bottom: -46px; width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 48px solid ${NAVY}; }
    P .burb::before { content: ""; position: absolute; left: calc(${POS.colita}% + 9px); bottom: -32px; width: 0; height: 0; border-left: 21px solid transparent; border-right: 21px solid transparent; border-top: 34px solid ${CR}; z-index: 1; }`,
    html: `<div class="burb">Y este… por tu año.</div>`,
    js: `tl.set(q(".burb"), { opacity: 1 }, ${r2(tH)}); tl.fromTo(q(".burb"), { scale: 0.6, transformOrigin: "${POS.colita}% 100%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ${r2(tH)}); tl.to(q(".burb"), { opacity: 0, duration: 0.06 }, ${r2(tC - 0.06)});`,
    sfx: [
      { t: -0.06, sfx: "whoosh-short", vol: 0.3 },
      { t: daR + 0.3, sfx: "pop", vol: 0.25 }, { t: daR + 0.72, sfx: "papel-fuerte", vol: 0.4, max: 0.3 }, { t: daR + 0.74, sfx: "pop", vol: 0.2 },
      { t: mira + 0.05, sfx: "click-soft", vol: 0.3 }, { t: mira + 0.08, sfx: "sparkle", vol: 0.25, max: 0.5 },
      { t: vuelve - 0.03, sfx: "pop", vol: 0.35 }, { t: vuelve, sfx: "whoosh-short", vol: 0.25 }, { t: vuelve + 0.02, sfx: "ding", vol: 0.35, max: 0.6 },
      { t: vuelve + 0.55, sfx: "pop", vol: 0.3 },
      { t: toma, sfx: "papel-fuerte", vol: 0.4, max: 0.3 }, { t: toma + 0.02, sfx: "pop", vol: 0.2 },
      { t: tC - 0.02, sfx: "whoosh-short", vol: 0.2 }, { t: tC + 0.25, sfx: "chime", vol: 0.4, max: 0.8 },
    ],
  });
}

// ================= s10 · ¿querés tener ese gesto con cada cliente? (Graciela se va; la lista con los gestos) =================
{
  const id = "s10-gesto";
  vacia(id, [
    { t: -0.06, sfx: "whoosh", vol: 0.35 }, { t: 0.4, sfx: "campanita", vol: 0.25, max: 0.8 },
    { t: 1.2, sfx: "whoosh-short", vol: 0.3 },
    ...[0, 1, 2].map((k) => ({ t: r2(w(id, 89) - 0.2 + k * 0.3), sfx: "pop", vol: 0.3 })),
    { t: w(id, 89) - 0.18, sfx: "ding", vol: 0.3, max: 0.7 },
  ]);
}

// ================= s11 · cierre: videollamada gratis en scalerics.com (fondo verde, letras navy, el caramelo 3D abajo) =================
{
  const id = "s11-llamada";
  escena(id, {
    css: `
    P .t1 { position: absolute; left: 0; right: 0; top: 330px; text-align: center; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${NAVY}; }
    P .t2w { position: absolute; left: 0; right: 0; top: 476px; text-align: center; }
    P .t2 { position: relative; display: inline-block; padding: 6px 34px 18px; border-radius: 22px; background: ${NAVY}; font: 900 128px/1 "Lexend", sans-serif; letter-spacing: -0.04em; color: ${G}; }
    P .t3w { position: absolute; left: 0; right: 0; top: 676px; text-align: center; }
    P .t3 { display: inline-block; padding: 14px 40px 24px; border-radius: 30px; background: ${CR}; border: 8px solid ${NAVY}; font: 900 108px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${NAVY}; }`,
    html: `
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">gratis</span></div>
      <div class="t3w"><span class="t3">scalerics.com</span></div>`,
    js: `
      tl.fromTo(qa(".t1, .t2w"), { scale: 1.06, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: true }, 0);
      tl.fromTo(q(".t3w"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.22, ease: "back.out(1.7)", immediateRender: true }, 0.04);
      tl.fromTo(q(".t2"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.13, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 93) - 0.02)});
      tl.fromTo(q(".t3"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, ${r2(w(id, 95) - 0.03)});
      tl.fromTo(q(".esc"), { scale: 1 }, { scale: 1.03, transformOrigin: "50% 20%", duration: ${r2(ESC[id] - 0.2)}, ease: "none", immediateRender: false }, 0.2);`,
    sfx: [
      { t: -0.14, sfx: "whoosh-cine-corto", vol: 0.2, max: 0.6 }, { t: 0.04, sfx: "pop", vol: 0.3 },
      { t: w(id, 93) - 0.02, sfx: "key-press", vol: 0.6 }, { t: w(id, 95) - 0.03, sfx: "chime", vol: 0.5, max: 1.2 },
    ],
  });
}
console.log("escenas escritas:", Object.keys(ESC).join(", "), "· DUR", DUR);
