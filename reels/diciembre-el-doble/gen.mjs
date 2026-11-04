// Generador de escenas de reels/diciembre-el-doble (correr desde la carpeta del reel, después
// `node armar.mjs`; y después otra vez `node armar.mjs` para que tome los .sfx.json).
// Estilo: tipografía cinética gigante + caos → control. Escenas navy #0b1220 y escenas cortas
// en verde de marca #5ce611 con texto navy.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const tiempos = fs.readFileSync("tiempos.md", "utf8");
const DUR = Number(tiempos.match(/Duración total ([\d.]+)/)[1]);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = {};
reel.escenas.forEach(([id, i], k) => {
  const a = ini(i);
  const b = k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR;
  ESC[id] = { a, d: r2(b - a) };
});

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#7c8698";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// hoja de pedido (papelito) en html: x,y = centro
const hoja = (k, x, y, rot, txt) =>
  `<div class="hoja h${k}" style="left:${x - 130}px;top:${y - 82}px;transform:rotate(${rot}deg)"><b>${txt}</b><i></i><i></i><i class="c"></i></div>`;

// ticket con borde de sierra
const ticket = (k, x, y, rot) =>
  `<div class="tk t${k}" style="left:${x - 120}px;top:${y - 150}px;transform:rotate(${rot}deg)"><b>TICKET</b><i></i><i></i><i class="c"></i><span>?</span></div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc, ${P} .capa, ${P} .pila { position: absolute; inset: 0; }
    ${P} .verde { position: absolute; inset: 0; background: ${G}; }
    ${P} .pie { position: absolute; left: 360px; top: 1718px; width: 360px; height: 96px; border-radius: 48px; background: ${NAVY}; }
    ${P} .L { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; font-weight: 800; color: #ffffff; }
    ${P} .L.cr { color: ${CR}; }
    ${P} .L.g { color: ${G}; }
    ${P} .L.n { color: ${NAVY}; }
    ${P} .L.x9 { font-weight: 900; }
    ${P} .sel { display: inline-block; padding: 0.04em 0.16em 0.08em; border-radius: 0.12em; background: ${G}; color: ${NAVY}; }
    ${P} .seln { display: inline-block; padding: 0.04em 0.16em 0.08em; border-radius: 0.12em; background: ${NAVY}; color: ${G}; }
    ${P} .gw { color: ${G}; }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
    ${P} .etq { position: absolute; left: 0; right: 0; top: 340px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; text-transform: uppercase; color: ${G}; }
    ${P} .etq.n { color: ${NAVY}; }
    ${P} .hoja { position: absolute; width: 260px; height: 164px; border-radius: 14px; background: #ffffff; border: 6px solid ${NAVY}; box-shadow: 10px 12px 0 rgba(3,6,12,0.45); }
    ${P} .hoja b { position: absolute; left: 22px; top: 16px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: ${NAVY}; }
    ${P} .hoja i { position: absolute; left: 22px; width: 190px; height: 8px; border-radius: 4px; background: ${GRIS}; top: 74px; }
    ${P} .hoja i + i { top: 100px; width: 150px; }
    ${P} .hoja i.c { top: 126px; width: 170px; }
    ${P} .tk { position: absolute; width: 240px; height: 300px; background: #ffffff; border: 6px solid ${NAVY}; border-radius: 10px 10px 0 0; box-shadow: 10px 12px 0 rgba(3,6,12,0.45); }
    ${P} .tk b { position: absolute; left: 0; right: 0; top: 20px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.12em; color: ${NAVY}; }
    ${P} .tk i { position: absolute; left: 26px; width: 176px; height: 8px; border-radius: 4px; background: ${GRIS}; top: 82px; }
    ${P} .tk i + i { top: 110px; width: 130px; }
    ${P} .tk i.c { top: 138px; width: 150px; }
    ${P} .tk span { position: absolute; left: 70px; top: 168px; width: 88px; height: 88px; border-radius: 50%; background: ${RED}; color: #ffffff; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 88px; text-align: center; }
`;

// ---------- JS común ----------
const PRE = (id, dur) => `
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => (typeof s === "string" ? Array.from(root.querySelectorAll(s)) : [s]);
      const tl = gsap.timeline({ paused: true });
      // golpe: entra grande y se asienta
      const golpe = (s, t, desde = 1.45, d = 0.2) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: d, ease: "power4.out", immediateRender: false }, t); };
      const sube = (s, t, y = 90, d = 0.32) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, y }, { opacity: 1, y: 0, duration: d, ease: "back.out(1.7)", immediateRender: false }, t); };
      const pop = (s, t, desde = 0.4, d = 0.34) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t); };
      const cae = (s, t, y = -260, d = 0.3) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, y }, { opacity: 1, y: 0, duration: d, ease: "bounce.out", immediateRender: false }, t); };
      const dibujar = (s, t, d = 0.4) => qa(s).forEach((el) => {
        const L = el.getTotalLength ? el.getTotalLength() : 1000;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      const sacude = (s, t, n = 3, a = 8) => { for (let i = 0; i < n; i++) tl.to(q(s), { x: i % 2 ? -a : a, duration: 0.04, ease: "none" }, t + i * 0.045); tl.to(q(s), { x: 0, duration: 0.05 }, t + n * 0.045); };
`;
const POST = (salida = true) => `
${salida ? `      tl.to(q(".esc"), { scale: 1.1, opacity: 0, filter: "blur(8px)", transformOrigin: "50% 55%", duration: 0.2, ease: "power3.in" }, DUR - 0.2);` : ""}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
`;

const escenas = [];
function escena(id, { css = "", html, js, sfx, verde = false, salida = true }) {
  const { d } = ESC[id];
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${d}">
    ${verde ? `<div id="${id}-fondo" class="verde clip" data-start="0" data-duration="${d}" data-track-index="0"></div><div id="${id}-pie" class="pie clip" data-start="0" data-duration="${d}" data-track-index="1"></div>` : ""}
    <div id="${id}-escena" class="esc clip" data-start="0" data-duration="${d}" data-track-index="2">
${html}
    </div>
  </div>
  <script>
    (function () {${PRE(id, d)}${js}${POST(salida)}
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx, null, 1) + "\n");
  escenas.push(id);
}
// tiempo de la palabra i relativo a la escena
const W = (id, i) => r2(Math.max(0, pal[i].start - ESC[id].a));

// =====================================================================================
// s01 · "En diciembre vas a vender más que nunca." (cuadro 0 = portada: todo el texto ya está)
{
  const id = "s01-diciembre";
  const meses = ["JUL", "AGO", "SET", "OCT", "NOV", "DIC"];
  const alto = [170, 210, 190, 250, 300, 470];
  let barras = "";
  meses.forEach((m, k) => {
    const x = 120 + k * 140, h = alto[k], dic = k === 5;
    barras += `<div class="bar b${k}" style="left:${x}px;top:${1490 - h}px;height:${h}px;background:${dic ? G : CR};box-shadow:inset -28px 0 0 ${dic ? GD : "#c9c8bd"}"></div><div class="mes" style="left:${x - 20}px;color:${dic ? G : CR}">${m}</div>`;
  });
  escena(id, {
    css: `
    P .l1 { top: 395px; font-size: 112px; }
    P .l2 { top: 515px; font-size: 112px; color: ${CR}; }
    P .l3 { top: 640px; font-size: 158px; font-weight: 900; color: ${G}; }
    P .l4 { top: 800px; font-size: 158px; font-weight: 900; color: ${G}; }
    P .graf { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .bar { position: absolute; width: 104px; border-radius: 14px; }
    P .mes { position: absolute; top: 1516px; width: 144px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; }
    P .flecha { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }`,
    html: `
      <div class="L l1">En diciembre</div>
      <div class="L l2">vas a vender</div>
      <div class="L l3">más que</div>
      <div class="L l4">nunca.</div>
      <svg class="graf" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="90" y="1490" width="900" height="10" rx="5" fill="${CR}" opacity="0.5"/>
      </svg>
      ${barras}
      <svg class="flecha" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="fl" d="M190 1280 C 420 1250, 640 1200, 830 1050" fill="none" stroke="${G}" stroke-width="16" stroke-linecap="round"/>
        <path class="fp" d="M766 1052 L 842 1036 L 836 1114" fill="none" stroke="${G}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    js: `
      // cuadro 0: el texto ya está entero, solo se asienta
      tl.fromTo(qa(".L"), { scale: 1.08, opacity: 0.92 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.05 }, 0);
      gsap.set(qa(".bar"), { transformOrigin: "50% 100%" });
      // las barras ya están a medio crecer y terminan de subir; diciembre se dispara en "más"
      for (let k = 0; k < 5; k++) tl.fromTo(q(".b" + k), { scaleY: 0.55 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.5, ease: "power3.out" }, k * 0.06);
      tl.fromTo(q(".b5"), { scaleY: 0.3 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.45, ease: "back.out(1.6)" }, ${W(id, 5)} - 0.1);
      dibujar(".fl", ${W(id, 5)} + 0.05, 0.4);
      dibujar(".fp", ${W(id, 5)} + 0.4, 0.15);
      tl.to(q(".l4"), { scale: 1.07, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${W(id, 7)});`,
    sfx: [{ t: 0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: W(id, 5) - 0.05, sfx: "whoosh-short", vol: 0.3 }, { t: W(id, 7), sfx: "pop", vol: 0.3 }],
  });
}

// s02 · "¿Tu negocio aguanta el doble?" (verde)
{
  const id = "s02-aguanta";
  escena(id, {
    verde: true,
    css: `
    P .l1 { top: 400px; font-size: 124px; }
    P .l2 { top: 545px; font-size: 196px; font-weight: 900; }
    P .l3 { top: 770px; font-size: 150px; font-weight: 900; }
    P .x2 { position: absolute; left: 0; right: 0; top: 1010px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 480px; line-height: 1; color: ${NAVY}; letter-spacing: -0.04em; }
    P .x2 span { color: #ffffff; }`,
    html: `
      <div class="L n l1">¿Tu negocio</div>
      <div class="L n l2">aguanta</div>
      <div class="L n l3">el <span class="seln">doble?</span></div>
      <div class="x2"><span>×</span>2</div>`,
    js: `
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 10)} - 0.05, 1.5);
      golpe(".l3", ${W(id, 12)} - 0.05, 1.4);
      gsap.set(q(".x2"), { opacity: 0 });
      tl.fromTo(q(".x2"), { opacity: 0, scale: 0.2, rotation: -8 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.2)", immediateRender: false }, ${W(id, 12)} + 0.05);
      sacude(".esc", ${W(id, 12)} + 0.2, 3, 8);`,
    sfx: [{ t: 0, sfx: "click", vol: 0.3 }, { t: W(id, 10) - 0.05, sfx: "impact-bass-2", vol: 0.35, max: 0.6 }, { t: W(id, 12) + 0.05, sfx: "impact-bass-1", vol: 0.45, max: 0.7 }],
  });
}

// s03 · "El doble de pedidos en el mismo cuaderno." (caos 1: los pedidos se apilan sobre el cuaderno)
{
  const id = "s03-cuaderno";
  const pos = [[300, 860, -12], [760, 820, 9], [520, 980, -4], [290, 1150, 7], [790, 1110, -10], [540, 1230, 12], [380, 760, 15], [700, 960, -14], [460, 1100, -8], [640, 790, 6], [820, 1270, 4], [250, 1290, -6]];
  let hojas = "";
  pos.forEach(([x, y, r], k) => (hojas += hoja(k, x, y, r, `PEDIDO ${String(31 + k)}`)));
  let renglones = "";
  for (let k = 0; k < 9; k++) renglones += `<rect x="190" y="${790 + k * 54}" width="${k % 3 === 2 ? 380 : 560}" height="8" rx="4" fill="${GRIS}"/>`;
  let espiral = "";
  for (let k = 0; k < 9; k++) espiral += `<rect x="${170 + k * 80}" y="672" width="22" height="64" rx="11" fill="${CR}" stroke="${NAVY}" stroke-width="6"/>`;
  escena(id, {
    css: `
    P .l1 { top: 390px; font-size: 150px; font-weight: 900; }
    P .l2 { top: 545px; font-size: 104px; color: ${CR}; }
    P .l3 { top: 1400px; font-size: 64px; color: ${CR}; font-weight: 700; }
    P .l4 { top: 1475px; font-size: 118px; }
    P .cuad { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .pila { position: absolute; inset: 0; }`,
    html: `
      <div class="L l1">El <span class="gw">doble</span></div>
      <div class="L l2">de pedidos</div>
      <svg class="cuad" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="libro">
          <ellipse cx="560" cy="1372" rx="420" ry="26" fill="rgba(3,6,12,0.55)"/>
          <rect x="150" y="704" width="800" height="640" rx="26" fill="${NAVY3}"/>
          <rect x="130" y="690" width="800" height="640" rx="26" fill="#ffffff" stroke="${NAVY}" stroke-width="6"/>
          <rect x="130" y="690" width="800" height="70" rx="26" fill="${RED}"/>
          <rect x="130" y="730" width="800" height="30" fill="${RED}"/>
          <rect x="166" y="770" width="7" height="550" fill="${RED}" opacity="0.6"/>
          ${renglones}
          ${espiral}
        </g>
      </svg>
      <div class="pila">${hojas}</div>
      <div class="L l3">en el mismo</div>
      <div class="L l4">cuaderno.</div>`,
    js: `
      golpe(".l1", 0, 1.4);
      sube(".l2", ${W(id, 16)} - 0.1, 60);
      gsap.set(q(".libro"), { opacity: 0 });
      tl.fromTo(q(".libro"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, 0.02);
      // las hojas caen una tras otra: la pila crece
      for (let k = 0; k < ${pos.length}; k++) cae(".h" + k, ${W(id, 16)} + k * 0.11, -200 - (k % 3) * 60, 0.28);
      sube(".l3", ${W(id, 18)} - 0.05, 40, 0.25);
      golpe(".l4", ${W(id, 20)} - 0.05, 1.3);`,
    sfx: [{ t: 0, sfx: "impact-bass-2", vol: 0.3, max: 0.5 }, { t: W(id, 16), sfx: "click-soft", vol: 0.3 }, { t: W(id, 16) + 0.33, sfx: "click-soft", vol: 0.3 }, { t: W(id, 16) + 0.66, sfx: "click-soft", vol: 0.3 }, { t: W(id, 16) + 0.99, sfx: "click-soft", vol: 0.3 }, { t: W(id, 20), sfx: "pop", vol: 0.3 }],
  });
}

// s04 · "El doble de '¿esto ya se pagó?'" (caos 2: el globo y los tickets con signo de pregunta)
{
  const id = "s04-pago";
  const tks = [[230, 1310, -9], [440, 1360, 5], [650, 1300, -4], [860, 1350, 10], [330, 1420, 8], [760, 1440, -7]];
  let t = "";
  tks.forEach(([x, y, r], k) => (t += ticket(k, x, y, r)));
  escena(id, {
    css: `
    P .l1 { top: 390px; font-size: 120px; color: ${CR}; }
    P .glob { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .gt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; font-size: 140px; line-height: 1; color: ${NAVY}; letter-spacing: -0.02em; white-space: nowrap; }
    P .gt1 { top: 640px; }
    P .gt2 { top: 790px; }
    P .tks { position: absolute; inset: 0; }`,
    html: `
      <div class="L l1">El <span class="gw">doble</span> de</div>
      <div class="glob">
        <svg viewBox="0 0 1080 1920" width="1080" height="1920" aria-hidden="true" style="position:absolute;left:0;top:0">
          <path d="M120 590 Q120 560 150 560 L930 560 Q960 560 960 590 L960 950 Q960 980 930 980 L420 980 L300 1080 L320 980 L150 980 Q120 980 120 950 Z" fill="rgba(3,6,12,0.5)" transform="translate(14 16)"/>
          <path d="M120 590 Q120 560 150 560 L930 560 Q960 560 960 590 L960 950 Q960 980 930 980 L420 980 L300 1080 L320 980 L150 980 Q120 980 120 950 Z" fill="${CR}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>
        </svg>
        <div class="gt gt1">¿Esto ya</div>
        <div class="gt gt2">se pagó?</div>
      </div>
      <div class="tks">${t}</div>`,
    js: `
      golpe(".l1", 0, 1.3);
      gsap.set(q(".glob"), { opacity: 0 });
      tl.fromTo(q(".glob"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: "300px 1080px", duration: 0.32, ease: "back.out(1.8)", immediateRender: false }, ${W(id, 24)} - 0.12);
      gsap.set(qa(".gt"), { opacity: 0 });
      tl.to(q(".gt1"), { opacity: 1, duration: 0.1 }, ${W(id, 24)});
      tl.to(q(".gt2"), { opacity: 1, duration: 0.1 }, ${W(id, 26)});
      for (let k = 0; k < ${tks.length}; k++) cae(".t" + k, 0.12 + k * 0.13, -300, 0.3);
      tl.to(q(".glob"), { rotation: 2, transformOrigin: "300px 1080px", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${W(id, 27)} + 0.1);`,
    sfx: [{ t: 0.12, sfx: "click-soft", vol: 0.25 }, { t: 0.5, sfx: "click-soft", vol: 0.25 }, { t: W(id, 24) - 0.12, sfx: "pop", vol: 0.35 }, { t: W(id, 27), sfx: "glitch-1", vol: 0.15, max: 0.3 }],
  });
}

// s05 · "Stock contado a ojo. Caja cerrada a las once." (caos 3: torre de cajas y la caja registradora)
{
  const id = "s05-stock-caja";
  const cajas = [[210, 1310], [450, 1310], [690, 1310], [330, 1110], [570, 1110], [450, 910]];
  let cj = "";
  cajas.forEach(([x, y], k) => {
    const r = [-2, 3, -1, 4, -3, 6][k];
    cj += `<g class="cj cj${k}" transform="rotate(${r} ${x + 110} ${y + 100})"><rect x="${x}" y="${y}" width="220" height="200" rx="10" fill="#d9c9a3" stroke="${NAVY}" stroke-width="7"/><rect x="${x + 90}" y="${y}" width="40" height="200" fill="#c3b088"/><rect x="${x}" y="${y}" width="220" height="200" rx="10" fill="none" stroke="${NAVY}" stroke-width="7"/><text x="${x + 110}" y="${y + 135}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="100" fill="${NAVY}">?</text></g>`;
  });
  escena(id, {
    css: `
    P .a1 { top: 390px; font-size: 230px; font-weight: 900; }
    P .a2 { top: 630px; font-size: 104px; color: ${CR}; }
    P .b1 { top: 390px; font-size: 128px; }
    P .b2 { top: 535px; font-size: 128px; color: ${CR}; }
    P .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .cuenta { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 60px; color: ${GRIS}; background: ${NAVY3}; border: 5px solid ${GRIS}; border-radius: 14px; padding: 6px 20px; }
    P .reloj { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 120px; color: ${RED}; }`,
    html: `
      <div class="capa A">
        <div class="L a1">Stock</div>
        <div class="L a2">contado a <span class="gw">ojo.</span></div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <ellipse cx="540" cy="1530" rx="420" ry="26" fill="rgba(3,6,12,0.6)"/>
          <g class="torre">${cj}</g>
        </svg>
        <div class="cuenta c1" style="left:90px;top:880px">¿12?</div>
        <div class="cuenta c2" style="left:780px;top:820px">¿15?</div>
        <div class="cuenta c3" style="left:810px;top:1040px">¿9?</div>
      </div>
      <div class="capa B">
        <div class="L b1">Caja cerrada</div>
        <div class="L b2">a las <span class="gw">once.</span></div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="reg">
            <ellipse cx="540" cy="1560" rx="440" ry="26" fill="rgba(3,6,12,0.6)"/>
            <rect x="170" y="700" width="740" height="250" rx="26" fill="${NAVY3}" stroke="${CR}" stroke-width="8"/>
            <rect x="250" y="980" width="580" height="290" rx="26" fill="${CR}" stroke="${NAVY}" stroke-width="7"/>
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${292 + c * 132}" y="${1010 + r * 82}" width="104" height="60" rx="12" fill="${r === 2 && c === 3 ? G : "#ffffff"}" stroke="${NAVY}" stroke-width="5"/>`).join("")).join("")}
            <rect x="110" y="1280" width="860" height="270" rx="26" fill="${NAVY3}" stroke="${CR}" stroke-width="8"/>
            <g class="cajon"><rect x="180" y="1350" width="720" height="160" rx="16" fill="#ffffff" stroke="${NAVY}" stroke-width="7"/><rect x="460" y="1395" width="160" height="22" rx="11" fill="${NAVY}"/>
            ${[0, 1, 2, 3].map((k) => `<rect x="${220 + k * 170}" y="1440" width="140" height="50" rx="8" fill="${k % 2 ? GRIS : "#b9c2cf"}"/>`).join("")}</g>
          </g>
        </svg>
        <div class="reloj">23:00</div>
      </div>`,
    js: `
      const CAJA = ${W(id, 32)};
      golpe(".a1", 0, 1.4);
      sube(".a2", ${W(id, 29)} - 0.05, 60);
      for (let k = 0; k < 6; k++) cae(".cj" + k, 0.05 + k * 0.1, -320, 0.32);
      pop(".c1", ${W(id, 31)} - 0.1, 0.5, 0.22);
      pop(".c2", ${W(id, 31)} + 0.05, 0.5, 0.22);
      pop(".c3", ${W(id, 31)} + 0.2, 0.5, 0.22);
      tl.to(q(".torre"), { rotation: 3, svgOrigin: "540 1520", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.8);
      // cambio a la caja
      tl.to(q(".A"), { y: -1920, duration: 0.3, ease: "power3.in" }, CAJA - 0.25);
      gsap.set(q(".B"), { y: 1920 });
      tl.to(q(".B"), { y: 0, duration: 0.32, ease: "power3.out" }, CAJA - 0.05);
      tl.fromTo(q(".cajon"), { y: 0 }, { y: 70, duration: 0.25, ease: "back.out(2)" }, CAJA + 0.4);
      gsap.set(q(".b2"), { opacity: 0 });
      golpe(".b2", ${W(id, 34)} - 0.05, 1.3);
      gsap.set(q(".reloj"), { opacity: 0 });
      golpe(".reloj", ${W(id, 36)} - 0.05, 1.6);
      tl.to(q(".reloj"), { opacity: 0.35, duration: 0.08, yoyo: true, repeat: 3, ease: "none" }, ${W(id, 36)} + 0.4);`,
    sfx: [{ t: 0.05, sfx: "impact-bass-2", vol: 0.25, max: 0.4 }, { t: 0.4, sfx: "click-soft", vol: 0.25 }, { t: W(id, 31) - 0.1, sfx: "key-press", vol: 0.3 }, { t: W(id, 32) - 0.2, sfx: "whoosh", vol: 0.25 }, { t: W(id, 32) + 0.4, sfx: "chime", vol: 0.2, max: 0.6 }, { t: W(id, 36) - 0.05, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }],
  });
}

// s06 · "Crecer está bien. Lo que no tiene que crecer es el desorden." (verde · el giro)
{
  const id = "s06-crecer";
  const pos = [[640, 1180, -10], [820, 1240, 8], [700, 1330, 3], [880, 1390, -6], [620, 1440, 12], [790, 1100, 14], [920, 1160, -12]];
  let hojas = "";
  pos.forEach(([x, y, r], k) => (hojas += `<div class="hj hj${k}" style="left:${x - 110}px;top:${y - 70}px;transform:rotate(${r}deg)"><i></i><i></i></div>`));
  escena(id, {
    verde: true,
    css: `
    P .a1 { top: 400px; font-size: 230px; font-weight: 900; }
    P .a2 { top: 640px; font-size: 140px; }
    P .b1 { top: 400px; font-size: 92px; }
    P .b2 { top: 505px; font-size: 128px; }
    P .b3 { top: 660px; font-size: 92px; }
    P .b4 { top: 770px; font-size: 140px; font-weight: 900; }
    P .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .graf { z-index: 2; }
    P .vb { position: absolute; width: 76px; border-radius: 12px; background: ${NAVY}; }
    P .hj { position: absolute; width: 220px; height: 140px; border-radius: 12px; background: ${CR}; border: 6px solid ${NAVY}; }
    P .hj i { position: absolute; left: 22px; top: 40px; width: 160px; height: 9px; border-radius: 5px; background: ${NAVY}; opacity: 0.5; }
    P .hj i + i { top: 74px; width: 120px; }
    P .rot { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.16em; color: ${NAVY}; top: 1580px; }`,
    html: `
      <div class="capa A">
        <div class="L n a1">Crecer</div>
        <div class="L n a2">está <span class="seln">bien.</span></div>
      </div>
      <div class="capa B">
        <div class="L n b1">Lo que no tiene</div>
        <div class="L n b2">que crecer</div>
        <div class="L n b3">es el</div>
        <div class="L n b4"><span class="seln">desorden.</span></div>
      </div>
      <svg class="full graf" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="80" y="1550" width="920" height="10" rx="5" fill="${NAVY}" opacity="0.45"/>
        <path class="vfl" d="M120 1300 L 470 960" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
        <path class="vfp" d="M405 960 L 476 952 L 468 1024" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${[0, 1, 2, 3].map((k) => `<div class="vb vb${k}" style="left:${110 + k * 100}px;top:${1550 - (140 + k * 110)}px;height:${140 + k * 110}px"></div>`).join("")}
      <div class="pila">${hojas}</div>
      <svg class="full tope" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="tx1" d="M600 1050 L 960 1500" fill="none" stroke="${RED}" stroke-width="22" stroke-linecap="round"/>
        <path class="tx2" d="M960 1050 L 600 1500" fill="none" stroke="${RED}" stroke-width="22" stroke-linecap="round"/>
      </svg>
      <div class="rot r1" style="left:140px">VENTAS</div>
      <div class="rot r2" style="left:690px">DESORDEN</div>`,
    js: `
      const B = ${W(id, 40)};
      golpe(".a1", 0, 1.4);
      golpe(".a2", ${W(id, 38)} - 0.05, 1.3);
      gsap.set(qa(".vb"), { transformOrigin: "50% 100%" });
      for (let k = 0; k < 4; k++) { gsap.set(q(".vb" + k), { opacity: 0 }); tl.fromTo(q(".vb" + k), { opacity: 1, scaleY: 0 }, { opacity: 1, scaleY: 1, transformOrigin: "50% 100%", duration: 0.32, ease: "back.out(1.5)", immediateRender: false }, 0.05 + k * 0.1); }
      dibujar(".vfl", 0.45, 0.3);
      dibujar(".vfp", 0.72, 0.12);
      sube(".r1", 0.5, 20, 0.2);
      // B: el texto cambia; las ventas se quedan a la izquierda, el desorden aparece y se tacha
      tl.to(q(".A"), { opacity: 0, y: -80, duration: 0.2, ease: "power2.in" }, B - 0.15);
      gsap.set(qa(".B .L"), { opacity: 0 });
      sube(".b1", B, 50, 0.24);
      golpe(".b2", ${W(id, 45)} - 0.05, 1.3);
      sube(".b3", ${W(id, 46)} - 0.05, 40, 0.2);
      golpe(".b4", ${W(id, 48)} - 0.05, 1.5);
      for (let k = 0; k < ${pos.length}; k++) cae(".hj" + k, B + 0.15 + k * 0.1, -220, 0.26);
      sube(".r2", B + 0.3, 20, 0.2);
      dibujar(".tx1", ${W(id, 48)} + 0.15, 0.16);
      dibujar(".tx2", ${W(id, 48)} + 0.3, 0.16);
      sacude(".pila", ${W(id, 48)} + 0.15, 3, 10);`,
    sfx: [{ t: 0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: 0.45, sfx: "sparkle", vol: 0.2, max: 0.6 }, { t: W(id, 40) + 0.15, sfx: "click-soft", vol: 0.25 }, { t: W(id, 40) + 0.45, sfx: "click-soft", vol: 0.25 }, { t: W(id, 48) - 0.05, sfx: "impact-bass-2", vol: 0.4, max: 0.6 }, { t: W(id, 48) + 0.15, sfx: "glitch-1", vol: 0.15, max: 0.3 }],
  });
}

// s07 · "Hacemos sistemas a la medida de tu negocio." (caos → control: los papeles se juntan en el panel)
{
  const id = "s07-a-medida";
  const pos = [[220, 920, -14], [540, 880, 8], [860, 940, -6], [260, 1150, 10], [820, 1190, -12], [430, 1290, 5], [680, 1300, -9], [540, 1080, 14]];
  let hojas = "";
  pos.forEach(([x, y, r], k) => (hojas += hoja(k, x, y, r, ["PEDIDO", "STOCK", "CAJA", "¿PAGÓ?", "PEDIDO", "STOCK", "CAJA", "PEDIDO"][k])));
  let marcas = "";
  for (let k = 0; k <= 26; k++) marcas += `<rect x="${130 + k * 31}" y="672" width="5" height="${k % 5 === 0 ? 38 : 22}" fill="${NAVY}"/>`;
  escena(id, {
    css: `
    P .l1 { top: 390px; font-size: 88px; color: ${CR}; }
    P .l2 { top: 495px; font-size: 140px; font-weight: 900; }
    P .l3 { top: 1430px; font-size: 92px; color: ${CR}; }
    P .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .panel { position: absolute; left: 140px; top: 770px; width: 800px; height: 600px; border-radius: 36px; background: ${NAVY3}; border: 8px solid ${G}; box-shadow: 16px 18px 0 rgba(3,6,12,0.55); }
    P .panel .pt { position: absolute; left: 40px; top: 34px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.18em; color: ${G}; }
    P .panel .fila { position: absolute; left: 40px; right: 40px; height: 120px; border-radius: 20px; background: ${NAVY2}; display: flex; align-items: center; gap: 26px; padding-left: 28px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 58px; color: #ffffff; text-transform: uppercase; }
    P .panel .f1 { top: 110px; } P .panel .f2 { top: 260px; } P .panel .f3 { top: 410px; }
    P .pila { position: absolute; inset: 0; }`,
    html: `
      <div class="L l1">Hacemos sistemas</div>
      <div class="L l2 g">a la medida</div>
      <svg class="full cinta" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="ct"><rect x="110" y="662" width="860" height="64" rx="10" fill="${G}" stroke="${NAVY}" stroke-width="5"/>${marcas}</g>
      </svg>
      <div class="panel">
        <div class="pt">TU NEGOCIO</div>
        <div class="fila f1">${tick(32)}Pedidos</div>
        <div class="fila f2">${tick(32)}Stock</div>
        <div class="fila f3">${tick(32)}Caja</div>
      </div>
      <div class="pila">${hojas}</div>
      <div class="L l3">de tu <span class="gw">negocio.</span></div>`,
    js: `
      const MEDIDA = ${W(id, 53)};
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 51)} - 0.05, 1.4);
      gsap.set(q(".ct"), { opacity: 0 });
      tl.fromTo(q(".ct"), { opacity: 1, scaleX: 0 }, { opacity: 1, scaleX: 1, svgOrigin: "110 694", duration: 0.4, ease: "power3.out", immediateRender: false }, MEDIDA - 0.15);
      // los papeles del caos ya están (vienen de las escenas anteriores) y tiemblan
      tl.fromTo(qa(".hoja"), { opacity: 0.0, y: -40 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, ease: "power2.out" }, 0);
      tl.to(qa(".hoja"), { rotation: "+=6", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.02 }, 0.25);
      // a la medida: se juntan al centro y se apagan dentro del panel
      const POS = ${JSON.stringify(pos)};
      POS.forEach(([x, y], k) => tl.to(q(".h" + k), { x: 540 - x, y: 1070 - y, rotation: 0, scale: 0.3, opacity: 0, duration: 0.42, ease: "power3.in" }, MEDIDA + 0.05 + k * 0.03));
      pop(".panel", MEDIDA + 0.45, 0.6, 0.36);
      pop(".f1", MEDIDA + 0.6, 0.7, 0.22);
      pop(".f2", MEDIDA + 0.72, 0.7, 0.22);
      pop(".f3", MEDIDA + 0.84, 0.7, 0.22);
      sube(".l3", ${W(id, 55)} - 0.05, 40, 0.24);`,
    sfx: [{ t: 0, sfx: "click", vol: 0.25 }, { t: W(id, 53) - 0.15, sfx: "whoosh", vol: 0.3 }, { t: W(id, 53) + 0.45, sfx: "chime", vol: 0.3, max: 0.8 }, { t: W(id, 53) + 0.6, sfx: "pop", vol: 0.2 }],
  });
}

// s08 · "Pedidos, stock y caja en un solo lugar." (interfaz recreada grande)
{
  const id = "s08-panel";
  escena(id, {
    css: `
    P .l1 { top: 380px; font-size: 76px; color: ${CR}; }
    P .l1 span { transition: none; }
    P .l2 { top: 1495px; font-size: 96px; }
    P .ui { position: absolute; left: 70px; top: 500px; width: 940px; height: 930px; border-radius: 40px; background: ${CR}; border: 8px solid ${NAVY}; box-shadow: 18px 20px 0 rgba(3,6,12,0.6); overflow: hidden; }
    P .ui .barra { position: absolute; left: 0; right: 0; top: 0; height: 90px; background: ${NAVY}; }
    P .ui .barra b { position: absolute; left: 36px; top: 24px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.14em; color: ${G}; }
    P .ui .barra i { position: absolute; top: 33px; width: 24px; height: 24px; border-radius: 50%; background: ${NAVY3}; }
    P .tile { position: absolute; left: 32px; right: 32px; border-radius: 26px; background: #ffffff; border: 6px solid ${NAVY}; }
    P .tile h3 { position: absolute; left: 30px; top: 22px; margin: 0; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; text-transform: uppercase; color: ${NAVY}; letter-spacing: -0.01em; }
    P .tile .ok { position: absolute; right: 26px; top: 20px; }
    P .t1 { top: 112px; height: 292px; } P .t2 { top: 422px; height: 222px; } P .t3 { top: 662px; height: 236px; }
    P .row { position: absolute; left: 30px; right: 30px; height: 56px; display: flex; align-items: center; gap: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; color: ${NAVY}; }
    P .row .est { margin-left: auto; padding: 4px 16px; border-radius: 12px; background: ${G}; color: ${NAVY}; font-size: 28px; }
    P .sk { position: absolute; left: 30px; height: 36px; border-radius: 10px; }
    P .skl { position: absolute; left: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: ${NAVY}; }
    P .caja { position: absolute; left: 30px; top: 80px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: ${NAVY}; letter-spacing: -0.02em; }
    P .cajas { position: absolute; left: 34px; top: 176px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: ${GD}; }`,
    html: `
      <div class="L l1"><span class="p1">Pedidos,</span> <span class="p2">stock</span> y <span class="p3">caja</span></div>
      <div class="ui">
        <div class="barra"><b>TU NEGOCIO · HOY</b><i style="right:110px"></i><i style="right:72px"></i><i style="right:34px;background:${G}"></i></div>
        <div class="tile t1"><h3>Pedidos</h3><span class="ok">${tick(28)}</span>
          <div class="row r1" style="top:92px">#41 · Laura P.<span class="est">listo</span></div>
          <div class="row r2" style="top:150px">#42 · Martín G.<span class="est">pagado</span></div>
          <div class="row r3" style="top:208px">#43 · Ana R.<span class="est">enviado</span></div>
        </div>
        <div class="tile t2"><h3>Stock</h3><span class="ok">${tick(28)}</span>
          <div class="skl" style="top:96px">Pan dulce</div><div class="sk s1" style="top:96px;left:300px;width:540px;background:${G}"></div>
          <div class="skl" style="top:156px">Sidra</div><div class="sk s2" style="top:156px;left:300px;width:200px;background:${RED}"></div>
          <div class="skl s2l" style="top:156px;left:520px;color:${RED}">reponer</div>
        </div>
        <div class="tile t3"><h3>Caja</h3><span class="ok">${tick(28)}</span>
          <div class="caja">Cuadra</div>
          <div class="cajas">cerrada a las 20:05</div>
        </div>
      </div>
      <div class="L l2">en un <span class="sel">solo lugar.</span></div>`,
    js: `
      gsap.set(qa(".l1 span"), { color: "${CR}" });
      golpe(".l1", 0, 1.2);
      tl.to(q(".p1"), { color: "${G}", duration: 0.1 }, 0);
      tl.to(q(".p2"), { color: "${G}", duration: 0.1 }, ${W(id, 58)});
      tl.to(q(".p3"), { color: "${G}", duration: 0.1 }, ${W(id, 60)});
      gsap.set(q(".ui"), { opacity: 0 });
      tl.fromTo(q(".ui"), { opacity: 0, scale: 0.85, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: "back.out(1.5)", immediateRender: false }, 0);
      // cada tarjeta se llena en su palabra
      pop(".t1", 0.08, 0.8, 0.26);
      ["r1", "r2", "r3"].forEach((r, k) => sube("." + r, 0.25 + k * 0.12, 24, 0.2));
      pop(".t2", ${W(id, 58)} - 0.05, 0.8, 0.26);
      gsap.set(q(".s1"), { scaleX: 0, transformOrigin: "0% 50%" }); tl.to(q(".s1"), { scaleX: 1, duration: 0.4, ease: "power3.out" }, ${W(id, 58)} + 0.15);
      gsap.set(q(".s2"), { scaleX: 0, transformOrigin: "0% 50%" }); tl.to(q(".s2"), { scaleX: 1, duration: 0.35, ease: "power3.out" }, ${W(id, 58)} + 0.3);
      sube(".s2l", ${W(id, 58)} + 0.55, 16, 0.2);
      pop(".t3", ${W(id, 60)} - 0.05, 0.8, 0.26);
      pop(".caja", ${W(id, 60)} + 0.15, 0.6, 0.26);
      sube(".cajas", ${W(id, 60)} + 0.3, 16, 0.2);
      pop(qa(".ok"), ${W(id, 63)} - 0.1, 0.2, 0.3);
      golpe(".l2", ${W(id, 61)} - 0.05, 1.3);
      // push-in de cámara suave
      tl.to(q(".ui"), { scale: 1.015, duration: 1.4, ease: "sine.inOut" }, 1.0);`,
    sfx: [{ t: 0, sfx: "pop", vol: 0.3 }, { t: W(id, 58), sfx: "click", vol: 0.25 }, { t: W(id, 60), sfx: "click", vol: 0.25 }, { t: W(id, 63) - 0.1, sfx: "sparkle", vol: 0.3, max: 0.8 }],
  });
}

// s09 · "Vender el doble, sin trabajar el doble." (verde)
{
  const id = "s09-doble";
  escena(id, {
    verde: true,
    css: `
    P .l1 { top: 480px; font-size: 220px; font-weight: 900; }
    P .l2 { top: 720px; font-size: 164px; font-weight: 900; }
    P .l3 { top: 1060px; font-size: 118px; }
    P .l4 { top: 1200px; font-size: 164px; }
    P .raya { position: absolute; left: 120px; top: 1150px; width: 840px; height: 22px; border-radius: 11px; background: ${RED}; }
    P .raya2 { position: absolute; left: 180px; top: 1276px; width: 700px; height: 22px; border-radius: 11px; background: ${RED}; }`,
    html: `
      <div class="L n l1">Vender</div>
      <div class="L n l2">el <span class="seln">doble,</span></div>
      <div class="L n l3">sin trabajar</div>
      <div class="L n l4">el doble.</div>
      <div class="raya"></div>
      <div class="raya2"></div>`,
    js: `
      golpe(".l1", 0, 1.45);
      golpe(".l2", ${W(id, 67)} - 0.08, 1.5);
      sacude(".esc", ${W(id, 67)} + 0.1, 3, 8);
      sube(".l3", ${W(id, 68)} - 0.05, 60, 0.26);
      sube(".l4", ${W(id, 70)} - 0.1, 60, 0.26);
      gsap.set(qa(".raya, .raya2"), { scaleX: 0, transformOrigin: "0% 50%" });
      tl.to(q(".raya"), { scaleX: 1, duration: 0.22, ease: "power3.out" }, ${W(id, 71)} + 0.05);
      tl.to(q(".raya2"), { scaleX: 1, duration: 0.22, ease: "power3.out" }, ${W(id, 71)} + 0.2);
      tl.to(qa(".l3, .l4"), { opacity: 0.45, duration: 0.2 }, ${W(id, 71)} + 0.2);`,
    sfx: [{ t: 0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: W(id, 67) - 0.08, sfx: "impact-bass-2", vol: 0.35, max: 0.6 }, { t: W(id, 71) + 0.05, sfx: "whoosh-short", vol: 0.3 }],
  });
}

// s10 · "Ordenalo en noviembre, no el veintitrés de diciembre." (consejo: dos hojas de calendario)
{
  const id = "s10-noviembre";
  const pagina = (cls, mes, num, color) => `
    <div class="cal ${cls}">
      <div class="cab" style="background:${color}">${mes}</div>
      <div class="num">${num}</div>
      <div class="an a1"></div><div class="an a2"></div>
    </div>`;
  escena(id, {
    css: `
    P .l1 { top: 380px; font-size: 118px; }
    P .l2 { top: 505px; font-size: 150px; font-weight: 900; }
    P .l3 { top: 1310px; font-size: 104px; color: ${CR}; }
    P .l4 { top: 1430px; font-size: 104px; color: ${CR}; }
    P .cal { position: absolute; top: 720px; width: 440px; height: 520px; border-radius: 30px; background: #ffffff; border: 8px solid ${NAVY}; box-shadow: 16px 18px 0 rgba(3,6,12,0.6); overflow: visible; }
    P .cal .cab { position: absolute; left: 0; right: 0; top: 0; height: 130px; border-radius: 22px 22px 0 0; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 54px; line-height: 140px; text-align: center; color: ${NAVY}; letter-spacing: 0.02em; }
    P .cal .num { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 280px; line-height: 1; color: ${NAVY}; letter-spacing: -0.04em; }
    P .cal .an { position: absolute; top: -34px; width: 28px; height: 74px; border-radius: 14px; background: ${CR}; border: 6px solid ${NAVY}; }
    P .cal .a1 { left: 110px; } P .cal .a2 { right: 110px; }
    P .nov { left: 60px; transform: rotate(-3deg); }
    P .dic { left: 580px; transform: rotate(3deg); }
    P .okg { position: absolute; left: 170px; top: 880px; }
    P .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }`,
    html: `
      <div class="L l1">Ordenalo en</div>
      <div class="L l2 g">noviembre,</div>
      ${pagina("nov", "NOVIEMBRE", "", G)}
      ${pagina("dic", "DICIEMBRE", "23", RED)}
      <div class="okg">${tick(110)}</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="x1" d="M620 820 L 980 1200" fill="none" stroke="${RED}" stroke-width="26" stroke-linecap="round"/>
        <path class="x2" d="M980 820 L 620 1200" fill="none" stroke="${RED}" stroke-width="26" stroke-linecap="round"/>
      </svg>
      <div class="L l3">no el <span style="color:${RED}">23</span></div>
      <div class="L l4">de diciembre.</div>`,
    js: `
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 74)} - 0.08, 1.45);
      gsap.set(q(".nov"), { opacity: 0 });
      tl.fromTo(q(".nov"), { opacity: 0, y: 160, rotation: -10 }, { opacity: 1, y: 0, rotation: -3, duration: 0.34, ease: "back.out(1.6)", immediateRender: false }, 0.1);
      // la hoja de noviembre: en vez de número, el tilde verde (ordenado)
      pop(".okg", ${W(id, 74)} + 0.1, 0.2, 0.34);
      gsap.set(q(".dic"), { opacity: 0 });
      tl.fromTo(q(".dic"), { opacity: 0, y: 160, rotation: 10 }, { opacity: 1, y: 0, rotation: 3, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, ${W(id, 75)} - 0.1);
      golpe(".l3", ${W(id, 75)} - 0.05, 1.3);
      sube(".l4", ${W(id, 78)} - 0.05, 40, 0.22);
      dibujar(".x1", ${W(id, 77)} + 0.15, 0.15);
      dibujar(".x2", ${W(id, 77)} + 0.3, 0.15);
      tl.to(q(".dic"), { opacity: 0.6, duration: 0.2 }, ${W(id, 77)} + 0.45);`,
    sfx: [{ t: 0.1, sfx: "whoosh-short", vol: 0.25 }, { t: W(id, 74) + 0.1, sfx: "ping", vol: 0.3 }, { t: W(id, 75) - 0.1, sfx: "whoosh-short", vol: 0.25 }, { t: W(id, 77) + 0.15, sfx: "glitch-1", vol: 0.15, max: 0.3 }],
  });
}

// s11 · CTA (verde): "¿Querés verlo en tu negocio? Agendá una videollamada gratis en scalerics.com."
{
  const id = "s11-cta";
  const persona = (cx, col) => `<circle cx="${cx}" cy="880" r="56" fill="${col}"/><path d="M${cx - 110} 1010 Q${cx - 110} 950 ${cx} 950 Q${cx + 110} 950 ${cx + 110} 1010 Z" fill="${col}"/>`;
  escena(id, {
    verde: true,
    salida: false,
    css: `
    P .l1 { top: 390px; font-size: 98px; }
    P .l2 { top: 500px; font-size: 98px; }
    P .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    P .l3 { top: 1070px; font-size: 118px; font-weight: 900; }
    P .l4 { top: 1190px; font-size: 200px; font-weight: 900; }
    P .web { position: absolute; left: 70px; top: 1430px; width: 940px; height: 150px; border-radius: 75px; background: ${NAVY}; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 104px; line-height: 146px; color: ${G}; letter-spacing: -0.02em; }`,
    html: `
      <div class="L n l1">¿Querés verlo</div>
      <div class="L n l2">en tu negocio?</div>
      <svg class="full vc" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="150" y="640" width="800" height="390" rx="34" fill="rgba(11,18,32,0.35)" transform="translate(14 16)"/>
        <rect x="150" y="640" width="800" height="390" rx="34" fill="${NAVY}"/>
        <rect x="180" y="690" width="360" height="320" rx="20" fill="${NAVY3}"/>
        <rect x="560" y="690" width="360" height="320" rx="20" fill="${NAVY3}"/>
        <g clip-path="none">${persona(360, CR)}${persona(740, G)}</g>
        <circle class="vivo" cx="196" cy="664" r="10" fill="${G}"/>
        <rect x="216" y="656" width="120" height="16" rx="8" fill="${NAVY3}"/>
      </svg>
      <div class="L n l3">Videollamada</div>
      <div class="L n l4">gratis</div>
      <div class="web">scalerics.com</div>`,
    js: `
      golpe(".l1", 0, 1.25);
      sube(".l2", ${W(id, 82)} - 0.05, 50, 0.26);
      gsap.set(q(".vc"), { opacity: 0 });
      tl.fromTo(q(".vc"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, transformOrigin: "540px 835px", duration: 0.36, ease: "back.out(1.7)", immediateRender: false }, 0.2);
      golpe(".l3", ${W(id, 87)} - 0.08, 1.4);
      golpe(".l4", ${W(id, 88)} - 0.08, 1.5);
      gsap.set(q(".web"), { opacity: 0 });
      tl.fromTo(q(".web"), { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.8)", immediateRender: false }, ${W(id, 90)} - 0.1);
      // quieto con vida: el punto en vivo late y la web respira
      tl.to(q(".vivo"), { opacity: 0.25, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.6);
      tl.to(q(".web"), { scale: 1.04, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${W(id, 90)} + 0.6);`,
    sfx: [{ t: 0, sfx: "whoosh", vol: 0.25 }, { t: 0.2, sfx: "notification", vol: 0.25 }, { t: W(id, 87) - 0.08, sfx: "impact-bass-2", vol: 0.3, max: 0.5 }, { t: W(id, 90) - 0.1, sfx: "chime", vol: 0.35 }],
  });
}

console.log("escenas:", escenas.join(", "));
