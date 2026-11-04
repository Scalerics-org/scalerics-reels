// Generador de escenas de reels/tres-horas (correr desde la carpeta del reel, después de
// `node armar.mjs`; y después otra vez `node armar.mjs` para que tome los .sfx.json).
// Formato "Rutina + punto de dolor" con reloj, en tipografía gigante de marca: el local cerró a
// las 20:00 y el dueño arranca su segundo turno; un reloj grande corre de 20:00 a 23:00 mientras
// las tareas se apilan en rojo apagado; con las automatizaciones se tildan en verde.
// Fondo navy oscuro #0b1220 liso; cierre sobre verde de marca #5ce611 con texto navy.
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

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", REDD = "#3a2027", GRIS = "#7c8698";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// minutos desde las 20:00 → "hh:mm"
const hora = (m) => { const t = 20 * 60 + m; return `${String(Math.floor(t / 60) % 24).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; };

// reloj: tarjeta con reloj de agujas a la izquierda y la hora digital grande; abajo, la barra
// del turno (20:00 → 23:00). `mins` = las horas que va a mostrar (spans .h0, .h1...).
const reloj = (cls, mins, { x, y, w, h, fs, col = "#ffffff", ic: icm = 999 }) => {
  const ic = Math.min(h - 60, icm);
  return `
      <div class="rel ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
        <svg class="ana" style="left:30px;top:${(h - ic) / 2 - 8}px;width:${ic}px;height:${ic}px" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="92" fill="${CR}"/>
          <circle cx="100" cy="100" r="92" fill="none" stroke="${NAVY}" stroke-width="8" opacity="0.15"/>
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => { const a = (k * Math.PI) / 6; const r1 = k % 3 ? 74 : 66; return `<line x1="${r2(100 + Math.sin(a) * r1)}" y1="${r2(100 - Math.cos(a) * r1)}" x2="${r2(100 + Math.sin(a) * 82)}" y2="${r2(100 - Math.cos(a) * 82)}" stroke="${NAVY}" stroke-width="${k % 3 ? 6 : 9}" stroke-linecap="round"/>`; }).join("")}
          <path class="hh" d="M100 100 L100 56" stroke="${NAVY}" stroke-width="13" stroke-linecap="round"/>
          <path class="mm" d="M100 100 L100 30" stroke="${NAVY}" stroke-width="9" stroke-linecap="round"/>
          <circle cx="100" cy="100" r="11" fill="${RED}"/>
        </svg>
        <div class="dig" data-layout-allow-overlap style="left:${ic + 40}px;width:${w - ic - 60}px;height:${h}px;font-size:${fs}px;line-height:${h}px;color:${col}">${mins.map((m, i) => `<span class="h${i}">${hora(m)}</span>`).join("")}</div>
      </div>`;
};
// barra del turno: track + relleno (scaleX = fracción de 20:00 a 23:00)
const barra = (cls, x, y, w) => `
      <div class="bar ${cls}" style="left:${x}px;top:${y}px;width:${w}px"><i></i></div>
      <div class="barl" style="left:${x}px;top:${y + 34}px">20:00</div>
      <div class="barl" style="left:${x + w - 130}px;top:${y + 34}px;width:130px;text-align:right">23:00</div>`;

// las cinco tareas del segundo turno
const TAREAS = ["Pedidos a la planilla", "Cuadrar la caja", "Pedido al proveedor", "Avisar: “está pronto”", "Stock de la tienda"];
// lista: filas fantasma (contorno) + filas rojas .r0...r4, cada una con su etiqueta "VOS";
// con `ok`, además el tilde verde y la etiqueta "SOLO" listos para aparecer.
const lista = ({ top, rh = 112, gap = 20, ok = false }) =>
  TAREAS.map((t, k) => {
    const y = top + k * (rh + gap);
    return `
      <div class="fant" style="top:${y}px;height:${rh}px"></div>
      <div class="fila r${k}" style="top:${y}px;height:${rh}px">
        <div class="chk" style="top:${(rh - 56) / 2}px"></div>
        ${ok ? `<div class="okt k${k}" style="top:${(rh - 64) / 2}px">${tick(32)}</div>` : ""}
        <div class="txt" style="line-height:${rh}px">${t}</div>
        <div class="tag" style="top:${(rh - 58) / 2}px">VOS</div>
        ${ok ? `<div class="tag solo s${k}" style="top:${(rh - 58) / 2}px">SOLO</div>` : ""}
      </div>`;
  }).join("");

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .verde { position: absolute; inset: 0; background: ${G}; }
    ${P} .pie { position: absolute; left: 360px; top: 1718px; width: 360px; height: 96px; border-radius: 48px; background: ${NAVY}; }
    ${P} .full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    ${P} .L { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.03em; font-weight: 800; color: #ffffff; }
    ${P} .L.cr { color: ${CR}; }
    ${P} .L.g { color: ${G}; }
    ${P} .L.n { color: ${NAVY}; }
    ${P} .L.x9 { font-weight: 900; }
    ${P} .sel { display: inline-block; padding: 0.04em 0.16em 0.08em; border-radius: 0.12em; background: ${G}; color: ${NAVY}; }
    ${P} .seln { display: inline-block; padding: 0.04em 0.16em 0.08em; border-radius: 0.12em; background: ${NAVY}; color: ${G}; }
    ${P} .rojo { color: ${RED}; }
    ${P} .rel { position: absolute; border-radius: 40px; background: ${NAVY2}; border: 8px solid ${BORDE}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); }
    ${P} .rel .ana { position: absolute; overflow: visible; }
    ${P} .rel .dig { position: absolute; top: -8px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
    ${P} .rel .dig span { position: absolute; left: 0; right: 0; top: 0; }
    ${P} .bar { position: absolute; height: 22px; border-radius: 11px; background: ${NAVY3}; overflow: hidden; }
    ${P} .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; border-radius: 11px; background: ${RED}; transform-origin: 0% 50%; }
    ${P} .barl { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: ${GRIS}; letter-spacing: 0.08em; }
    ${P} .fant { position: absolute; left: 70px; width: 940px; border-radius: 26px; border: 6px dashed ${BORDE}; }
    ${P} .fila { position: absolute; left: 70px; width: 940px; border-radius: 26px; background: ${REDD}; border: 6px solid ${RED}; box-shadow: 0 12px 0 rgba(3,6,12,0.55); }
    ${P} .fila .chk { position: absolute; left: 30px; width: 56px; height: 56px; border-radius: 50%; border: 7px solid ${RED}; box-sizing: border-box; }
    ${P} .fila .okt { position: absolute; left: 26px; width: 64px; height: 64px; }
    ${P} .fila .txt { position: absolute; left: 116px; top: -2px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 48px; color: #ffffff; letter-spacing: -0.02em; white-space: nowrap; }
    ${P} .fila .tag { position: absolute; right: 24px; width: 150px; height: 58px; border-radius: 29px; border: 5px solid ${RED}; box-sizing: border-box; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; line-height: 48px; text-align: center; letter-spacing: 0.14em; color: ${RED}; }
    ${P} .fila .tag.solo { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
`;

// ---------- JS común ----------
const PRE = (id, dur) => `
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => (typeof s === "string" ? Array.from(root.querySelectorAll(s)) : [s]);
      const tl = gsap.timeline({ paused: true });
      const golpe = (s, t, desde = 1.45, d = 0.2) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: d, ease: "power4.out", immediateRender: false }, t); };
      const sube = (s, t, y = 90, d = 0.32) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, y }, { opacity: 1, y: 0, duration: d, ease: "back.out(1.7)", immediateRender: false }, t); };
      const pop = (s, t, desde = 0.4, d = 0.34) => { const e = qa(s); gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t); };
      const sale = (s, t, d = 0.16) => tl.to(qa(s), { opacity: 0, y: -60, filter: "blur(6px)", duration: d, ease: "power2.in" }, t);
      const dibujar = (s, t, d = 0.4) => qa(s).forEach((el) => {
        const L = el.getTotalLength ? el.getTotalLength() : 1000;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      });
      const sacude = (s, t, n = 3, a = 8) => { for (let i = 0; i < n; i++) tl.to(q(s), { x: i % 2 ? -a : a, duration: 0.04, ease: "none" }, t + i * 0.045); tl.to(q(s), { x: 0, duration: 0.05 }, t + n * 0.045); };
      // reloj: pasa de la hora i-1 a la i en el segundo ts[i-1] (la .h0 ya está)
      const horas = (sel, ts) => {
        qa(sel + " .dig span").forEach((e, i) => gsap.set(e, { opacity: i ? 0 : 1 }));
        ts.forEach((t, k) => {
          const i = k + 1;
          tl.to(q(sel + " .h" + (i - 1)), { opacity: 0, y: -50, duration: 0.12, ease: "power2.in" }, t);
          tl.fromTo(q(sel + " .h" + i), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, t + 0.06);
        });
      };
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
// fracción del turno (20:00 → 23:00) para la barra
const F = (m) => r2(m / 180);

// =====================================================================================
// s01 · "Cerraste a las ocho. Tu segundo turno empieza ahora." (cuadro 0 = portada: todo ya está)
{
  const id = "s01-cerraste";
  escena(id, {
    css: `
    P .l1 { top: 300px; font-size: 150px; font-weight: 900; }
    P .l2 { top: 880px; font-size: 118px; }
    P .l3 { top: 1020px; font-size: 200px; font-weight: 900; }
    P .l4 { top: 1262px; font-size: 92px; color: ${CR}; }
    P .cart { position: absolute; left: 290px; top: 1400px; width: 500px; height: 230px; transform: scale(1.2); }
    P .cart .hilo { position: absolute; left: 0; top: 0; width: 500px; height: 230px; overflow: visible; }
    P .cart .placa { position: absolute; left: 30px; top: 70px; width: 440px; height: 140px; border-radius: 22px; background: ${CR}; border: 8px solid ${RED}; box-sizing: border-box; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 74px; line-height: 124px; text-align: center; color: ${RED}; letter-spacing: 0.04em; }`,
    html: `
      <div class="L l1">Cerraste</div>
      ${reloj("c1", [0, 1], { x: 70, y: 480, w: 940, h: 320, fs: 220 })}
      <div class="L l2">Tu segundo</div>
      <div class="L l3"><span class="sel">turno</span></div>
      <div class="L l4">empieza ahora.</div>
      <div class="cart">
        <svg class="hilo" viewBox="0 0 500 230" aria-hidden="true"><path d="M110 76 L250 8 L390 76" fill="none" stroke="${CR}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="250" cy="8" r="9" fill="${CR}"/></svg>
        <div class="placa">CERRADO</div>
      </div>`,
    js: `
      // cuadro 0: el gancho ya está entero; solo se asienta
      tl.fromTo(qa(".L, .rel"), { scale: 1.06, opacity: 0.9 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.04 }, 0);
      // el cartel de CERRADO se hamaca
      gsap.set(q(".cart"), { transformOrigin: "50% 3%" });
      tl.fromTo(q(".cart"), { rotation: 7 }, { rotation: -5, duration: 0.7, ease: "sine.inOut" }, 0);
      tl.to(q(".cart"), { rotation: 3, duration: 0.6, ease: "sine.inOut" }, 0.7);
      tl.to(q(".cart"), { rotation: 0, duration: 0.6, ease: "sine.inOut" }, 1.3);
      // "ocho": el reloj late; "segundo turno": la palabra se marca
      tl.to(q(".c1"), { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${W(id, 3)});
      tl.fromTo(q(".l3 .sel"), { scale: 1 }, { scale: 1.08, duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${W(id, 6)});
      // "ahora": el reloj arranca a correr y la tarjeta se pone en alerta
      horas(".c1", [${W(id, 8)}]);
      tl.to(q(".c1 .mm"), { rotation: 360, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      tl.to(q(".c1 .hh"), { rotation: 30 * 0.1, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      tl.to(q(".c1"), { borderColor: "${RED}", duration: 0.2 }, ${W(id, 8)});
      tl.to(q(".c1 .dig"), { color: "${RED}", duration: 0.2 }, ${W(id, 8)});`,
    sfx: [{ t: 0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: W(id, 3), sfx: "click", vol: 0.3 }, { t: W(id, 6), sfx: "pop", vol: 0.25 }, { t: W(id, 8), sfx: "key-press", vol: 0.35 }],
  });
}

// ---- s02/s03: el turno. Reloj arriba, la tarea del momento en grande, la lista abajo ----
const RELT = { x: 150, y: 290, w: 780, h: 220, fs: 168 };
const BARY = 540;
const LTOP = 930;
const HEAD = [
  ["Pasar los pedidos", "a la <span class=\"rojo\">planilla</span>", 84, 118],
  ["Cuadrar", "la <span class=\"rojo\">caja</span>", 110, 170],
  ["El pedido al", "<span class=\"rojo\">proveedor</span>", 110, 140],
  ["Avisar que", "<span class=\"rojo\">está pronto</span>", 110, 126],
  ["Actualizar el", "<span class=\"rojo\">stock</span>", 110, 170],
];
const cabeza = (k) => `
      <div class="L cr hd${k}a" style="top:640px;font-size:${HEAD[k][2]}px">${HEAD[k][0]}</div>
      <div class="L x9 hd${k}b" style="top:${640 + HEAD[k][2] + 22}px;font-size:${HEAD[k][3]}px">${HEAD[k][1]}</div>`;

// s02 · "Pasar los pedidos a la planilla. Cuadrar la caja. El pedido al proveedor."
{
  const id = "s02-tareas";
  // horas que muestra el reloj en esta escena (minutos desde las 20:00)
  const M = [5, 20, 45, 70, 95];
  const T = [0.25, W(id, 15) - 0.1, W(id, 18) - 0.1, W(id, 21)];
  escena(id, {
    html: `
      ${reloj("c2", M, RELT)}
      ${barra("b2", 150, BARY, 780)}
      ${cabeza(0)}${cabeza(1)}${cabeza(2)}
      ${lista({ top: LTOP })}`,
    js: `
      horas(".c2", [${T.join(", ")}]);
      tl.to(q(".c2 .mm"), { rotation: 360 * 1.5, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      tl.to(q(".c2 .hh"), { rotation: 45, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      gsap.set(q(".c2"), { borderColor: "${RED}" }); gsap.set(q(".c2 .dig"), { color: "${RED}" });
      tl.fromTo(q(".b2 i"), { scaleX: ${F(5)} }, { scaleX: ${F(95)}, duration: DUR, ease: "none" }, 0);
      gsap.set(qa(".fila"), { opacity: 0 });
      // las filas fantasma ya están; cada tarea entra en grande y cae a su fila
      tl.fromTo(qa(".fant"), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.04 }, 0);
      golpe(".hd0a", 0, 1.3); golpe(".hd0b", ${W(id, 11)} - 0.05, 1.4);
      sube(".r0", ${W(id, 14)}, 120, 0.3);
      sale(".hd0a, .hd0b", ${W(id, 15)} - 0.16);
      golpe(".hd1a", ${W(id, 15)}, 1.3); golpe(".hd1b", ${W(id, 17)} - 0.08, 1.45);
      sube(".r1", ${W(id, 17)} + 0.05, 120, 0.3);
      sale(".hd1a, .hd1b", ${W(id, 18)} - 0.16);
      golpe(".hd2a", ${W(id, 18)}, 1.3); golpe(".hd2b", ${W(id, 21)} - 0.08, 1.45);
      sube(".r2", ${W(id, 21)} + 0.1, 120, 0.3);
      sacude(".rel", ${W(id, 21)} + 0.1, 3, 6);`,
    sfx: [{ t: 0, sfx: "key-press", vol: 0.3 }, { t: W(id, 14), sfx: "pop", vol: 0.3 }, { t: W(id, 15), sfx: "key-press", vol: 0.3 }, { t: W(id, 17) + 0.05, sfx: "pop", vol: 0.3 }, { t: W(id, 18), sfx: "key-press", vol: 0.3 }, { t: W(id, 21) + 0.1, sfx: "pop", vol: 0.3 }],
  });
}

// s03 · "Avisar que el pedido está pronto. Actualizar el stock de la tienda."
{
  const id = "s03-tareas2";
  const M = [95, 120, 140, 160, 172];
  const T = [0.2, W(id, 27), W(id, 28) - 0.1, W(id, 33)];
  escena(id, {
    html: `
      ${reloj("c3", M, RELT)}
      ${barra("b3", 150, BARY, 780)}
      ${cabeza(3)}${cabeza(4)}
      ${lista({ top: LTOP })}`,
    js: `
      horas(".c3", [${T.join(", ")}]);
      tl.to(q(".c3 .mm"), { rotation: 360 * 1.3, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      tl.to(q(".c3 .hh"), { rotation: 40, svgOrigin: "100 100", duration: DUR, ease: "none" }, 0);
      gsap.set(q(".c3"), { borderColor: "${RED}" }); gsap.set(q(".c3 .dig"), { color: "${RED}" });
      tl.fromTo(q(".b3 i"), { scaleX: ${F(95)} }, { scaleX: ${F(176)}, duration: DUR, ease: "none" }, 0);
      gsap.set(qa(".r3, .r4"), { opacity: 0 });
      golpe(".hd3a", 0, 1.3); golpe(".hd3b", ${W(id, 26)} - 0.08, 1.4);
      sube(".r3", ${W(id, 27)} + 0.05, 120, 0.3);
      sale(".hd3a, .hd3b", ${W(id, 28)} - 0.16);
      golpe(".hd4a", ${W(id, 28)}, 1.3); golpe(".hd4b", ${W(id, 30)} - 0.08, 1.5);
      sube(".r4", ${W(id, 33)}, 120, 0.3);
      // la pila pesa: la lista se sacude y se acerca la cámara
      tl.to(qa(".fila"), { x: 6, duration: 0.04, yoyo: true, repeat: 5, ease: "none" }, ${W(id, 33)} + 0.35);
      tl.to(q(".esc"), { scale: 1.04, transformOrigin: "50% 60%", duration: DUR - 0.3, ease: "sine.inOut" }, 0.1);`,
    sfx: [{ t: 0, sfx: "key-press", vol: 0.3 }, { t: W(id, 27) + 0.05, sfx: "pop", vol: 0.3 }, { t: W(id, 28), sfx: "key-press", vol: 0.3 }, { t: W(id, 33), sfx: "pop", vol: 0.3 }, { t: W(id, 33) + 0.35, sfx: "glitch-1", vol: 0.12, max: 0.3 }],
  });
}

// s04 · "Once de la noche. Recién terminás." (el reloj llega a las 23:00, grande y en rojo)
{
  const id = "s04-once";
  escena(id, {
    css: `
    P .l1 { top: 300px; font-size: 128px; color: ${CR}; }
    P .l2 { top: 440px; font-size: 150px; font-weight: 900; }
    P .l3 { top: 1170px; font-size: 130px; color: ${CR}; }
    P .l4 { top: 1320px; font-size: 150px; font-weight: 900; }
    P .bar { height: 30px; border-radius: 15px; }
    P .pila { position: absolute; left: 0; top: 0; }`,
    html: `
      <div class="L l1">Once de</div>
      <div class="L l2">la noche.</div>
      ${reloj("c4", [176, 180], { x: 50, y: 650, w: 980, h: 380, fs: 222, ic: 250 })}
      ${barra("b4", 60, 1070, 960).replace(/<div class="barl".*?<\/div>/gs, "")}
      <div class="L l3">Recién</div>
      <div class="L l4 rojo">terminás.</div>`,
    js: `
      gsap.set(q(".c4"), { borderColor: "${RED}" }); gsap.set(q(".c4 .dig"), { color: "${RED}" });
      pop(".c4", 0, 0.75, 0.3);
      horas(".c4", [0.12]);
      tl.to(q(".c4 .mm"), { rotation: 30, svgOrigin: "100 100", duration: 0.4, ease: "power2.out" }, 0.05);
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 36)} - 0.05, 1.4);
      tl.fromTo(q(".b4 i"), { scaleX: ${F(176)} }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0.1);
      tl.to(q(".c4"), { scale: 1.06, duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${W(id, 37)});
      golpe(".l3", ${W(id, 38)} - 0.05, 1.3);
      golpe(".l4", ${W(id, 39)} - 0.05, 1.45);
      // push-in sobre el reloj
      tl.to(q(".esc"), { scale: 1.05, transformOrigin: "50% 45%", duration: DUR - 0.3, ease: "sine.inOut" }, 0.1);`,
    sfx: [{ t: 0, sfx: "impact-bass-2", vol: 0.4, max: 0.7 }, { t: 0.12, sfx: "click", vol: 0.3 }, { t: W(id, 38) - 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: W(id, 39) - 0.05, sfx: "impact-bass-1", vol: 0.3, max: 0.6 }],
  });
}

// s05 · "Lo hacés porque sos responsable." (tipografía gigante, el dueño bien parado)
{
  const id = "s05-responsable";
  escena(id, {
    css: `
    P .l1 { top: 380px; font-size: 150px; color: ${CR}; }
    P .l2 { top: 560px; font-size: 128px; }
    P .l3 { top: 800px; font-size: 200px; font-weight: 900; }
    P .l4 { top: 1050px; font-size: 220px; font-weight: 900; }
    P .sub { position: absolute; left: 140px; top: 1360px; width: 800px; height: 22px; border-radius: 11px; background: ${G}; }`,
    html: `
      <div class="L l1">Lo hacés</div>
      <div class="L l2">porque sos</div>
      <div class="L l3 g">respon-</div>
      <div class="L l4 g">sable.</div>
      <div class="sub"></div>`,
    js: `
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 42)} - 0.05, 1.3);
      golpe(".l3", ${W(id, 44)} - 0.08, 1.5);
      golpe(".l4", ${W(id, 44)} + 0.18, 1.5);
      gsap.set(q(".sub"), { scaleX: 0, transformOrigin: "0% 50%" });
      tl.to(q(".sub"), { scaleX: 1, duration: 0.35, ease: "power3.out" }, ${W(id, 44)} + 0.4);
      tl.to(q(".esc"), { scale: 1.04, transformOrigin: "50% 50%", duration: DUR - 0.3, ease: "sine.inOut" }, 0.1);`,
    sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.25 }, { t: W(id, 44) - 0.08, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: W(id, 44) + 0.4, sfx: "sparkle", vol: 0.2, max: 0.6 }],
  });
}

// s06 · "Pero nada de eso necesita que lo hagas vos." (la lista; las etiquetas VOS se caen)
{
  const id = "s06-nada";
  escena(id, {
    css: `
    P .l1 { top: 300px; font-size: 150px; font-weight: 900; }
    P .l2 { top: 470px; font-size: 104px; color: ${CR}; }
    P .l3 { top: 1420px; font-size: 124px; color: ${CR}; }
    P .l4 { top: 1580px; font-size: 0; }`,
    html: `
      <div class="L l1">Pero nada</div>
      <div class="L l2 a1">de eso</div>
      <div class="L l2 a2">necesita que</div>
      ${lista({ top: 650, rh: 112, gap: 22 })}
      <div class="L l3">lo hagas <span class="sel">vos.</span></div>`,
    js: `
      golpe(".l1", 0, 1.35);
      golpe(".a1", ${W(id, 47)} - 0.05, 1.3);
      tl.fromTo(qa(".fila"), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.22, stagger: 0.06, ease: "power3.out" }, 0.05);
      sale(".a1", ${W(id, 49)} - 0.14);
      golpe(".a2", ${W(id, 49)}, 1.3);
      golpe(".l3", ${W(id, 52)} - 0.05, 1.3);
      // en "vos": las etiquetas VOS saltan y se van
      qa(".fila .tag").forEach((e, k) => {
        tl.to(e, { y: -40, rotation: k % 2 ? 14 : -14, scale: 1.1, duration: 0.14, ease: "power2.out" }, ${W(id, 53)} + 0.05 + k * 0.06);
        tl.to(e, { y: 260, opacity: 0, duration: 0.3, ease: "power2.in" }, ${W(id, 53)} + 0.19 + k * 0.06);
      });`,
    sfx: [{ t: 0, sfx: "impact-bass-2", vol: 0.3, max: 0.6 }, { t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: W(id, 49), sfx: "key-press", vol: 0.25 }, { t: W(id, 53) + 0.05, sfx: "pop", vol: 0.35 }],
  });
}

// s07 · "Lo automatizamos: pedidos, avisos y stock se hacen solos." (las filas se tildan en verde)
{
  const id = "s07-solos";
  // orden en que se tildan: pedidos, avisos, stock, y después caja y proveedor
  const ORD = [[0, W(id, 56)], [3, W(id, 57)], [4, W(id, 59)], [1, W(id, 60) + 0.1], [2, W(id, 60) + 0.3]];
  escena(id, {
    css: `
    P .l1 { top: 300px; font-size: 100px; color: ${CR}; }
    P .l2 { top: 420px; font-size: 96px; font-weight: 900; }
    P .l3 { top: 1330px; font-size: 140px; font-weight: 900; }
    P .l3b { top: 1480px; }
    P .rl { position: absolute; left: 0; right: 0; top: 1520px; text-align: center; }`,
    html: `
      <div class="L l1">Lo</div>
      <div class="L l2"><span class="sel">automatizamos</span></div>
      ${lista({ top: 640, rh: 112, gap: 22, ok: true })}
      <div class="L l3">se hacen</div>
      <div class="L l3 l3b g">solos.</div>`,
    js: `
      golpe(".l1", 0, 1.3);
      golpe(".l2", ${W(id, 55)}, 1.5);
      qa(".fila .tag:not(.solo)").forEach((e) => gsap.set(e, { opacity: 0 }));
      tl.fromTo(qa(".fila"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.24, stagger: 0.05, ease: "power3.out" }, 0.1);
      ${ORD.map(([k, t]) => `
      tl.to(q(".r${k}"), { backgroundColor: "${NAVY2}", borderColor: "${G}", duration: 0.18 }, ${t});
      tl.to(q(".r${k} .chk"), { opacity: 0, duration: 0.05 }, ${t});
      pop(".k${k}", ${t}, 0.2, 0.3);
      pop(".s${k}", ${t} + 0.06, 0.4, 0.28);
      tl.to(q(".r${k} .txt"), { color: "${G}", duration: 0.18 }, ${t});`).join("")}
      golpe(".l3:not(.l3b)", ${W(id, 61)} - 0.1, 1.4);
      golpe(".l3b", ${W(id, 62)} - 0.1, 1.5);
      tl.to(q(".esc"), { scale: 1.03, transformOrigin: "50% 50%", duration: DUR - 0.3, ease: "sine.inOut" }, 0.1);`,
    sfx: [{ t: W(id, 55), sfx: "impact-bass-1", vol: 0.3, max: 0.6 }, ...ORD.map(([, t]) => ({ t, sfx: "ping", vol: 0.25 })), { t: W(id, 61) - 0.1, sfx: "sparkle", vol: 0.3, max: 0.8 }],
  });
}

// s08 · "Y a la mañana te llega el resumen al celular." (celular grande, 07:30, la notificación)
{
  const id = "s08-manana";
  const RES = ["Pedidos en la planilla", "Caja cuadrada", "Pedido al proveedor", "Avisos enviados", "Stock de la tienda"];
  escena(id, {
    css: `
    P .l1 { top: 290px; font-size: 104px; color: ${CR}; }
    P .cel { position: absolute; left: 180px; top: 440px; width: 720px; height: 1230px; border-radius: 90px; background: ${NAVY3}; border: 10px solid ${CR}; box-shadow: 0 22px 0 rgba(3,6,12,0.6); }
    P .pant { position: absolute; left: 22px; top: 22px; right: 22px; bottom: 22px; border-radius: 66px; background: ${NAVY2}; overflow: hidden; }
    P .isla { position: absolute; left: 50%; top: 26px; width: 170px; height: 44px; margin-left: -85px; border-radius: 22px; background: ${NAVY}; }
    P .dia { position: absolute; left: 0; right: 0; top: 110px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.2em; color: ${CR}; }
    P .hs { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 190px; line-height: 1; letter-spacing: -0.04em; color: #ffffff; }
    P .not { position: absolute; left: 22px; right: 22px; top: 400px; border-radius: 40px; background: ${CR}; padding: 30px 30px 20px; box-shadow: 0 14px 0 rgba(3,6,12,0.5); }
    P .not .cab { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.12em; color: ${NAVY}; opacity: 0.7; }
    P .not .tit { margin-top: 10px; margin-bottom: 8px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; white-space: nowrap; line-height: 1.1; color: ${NAVY}; letter-spacing: -0.02em; }
    P .not .tit b { background: ${G}; padding: 0 10px; border-radius: 8px; font-weight: 800; }
    P .not .it { position: relative; height: 104px; margin-top: 4px; border-top: 4px solid rgba(11,18,32,0.12); }
    P .not .it svg { position: absolute; left: 0; top: 24px; }
    P .not .it span { position: absolute; left: 80px; top: 0; line-height: 104px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; color: ${NAVY}; white-space: nowrap; }`,
    html: `
      <div class="L l1">A la <span class="sel">mañana</span></div>
      <div class="cel"><div class="pant">
        <div class="isla"></div>
        <div class="dia">MIÉRCOLES</div>
        <div class="hs">07:30</div>
        <div class="not">
          <div class="cab">AUTOMÁTICO · AHORA</div>
          <div class="tit"><b>Resumen</b> de ayer</div>
          ${RES.map((t, k) => `<div class="it i${k}">${tick(28)}<span>${t}</span></div>`).join("")}
        </div>
      </div></div>`,
    js: `
      golpe(".l1", 0, 1.3);
      gsap.set(q(".cel"), { opacity: 0 });
      tl.fromTo(q(".cel"), { opacity: 0, y: 260, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.42, ease: "back.out(1.4)", immediateRender: false }, 0.05);
      gsap.set(q(".not"), { opacity: 0 });
      tl.fromTo(q(".not"), { opacity: 0, y: -160, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.6)", immediateRender: false }, ${W(id, 68)} - 0.1);
      ${[0, 1, 2, 3, 4].map((k) => `sube(".i${k}", ${W(id, 70)} + ${k} * 0.12, 30, 0.22);`).join("\n      ")}
      tl.to(q(".cel"), { scale: 1.04, transformOrigin: "50% 40%", duration: DUR - 0.5, ease: "sine.inOut" }, 0.4);`,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.25 }, { t: W(id, 68) - 0.1, sfx: "notification", vol: 0.4 }, { t: W(id, 70) + 0.2, sfx: "sparkle", vol: 0.2, max: 0.6 }],
  });
}

// s09 · CTA (verde): "¿Qué tarea te sacás primero? Agendá una videollamada gratis en scalerics.com."
{
  const id = "s09-cta";
  const persona = (cx, col) => `<circle cx="${cx}" cy="880" r="56" fill="${col}"/><path d="M${cx - 110} 1010 Q${cx - 110} 950 ${cx} 950 Q${cx + 110} 950 ${cx + 110} 1010 Z" fill="${col}"/>`;
  escena(id, {
    verde: true,
    salida: false,
    css: `
    P .l1 { top: 380px; font-size: 110px; font-weight: 900; }
    P .l2 { top: 500px; font-size: 92px; }
    P .l3 { top: 1070px; font-size: 118px; font-weight: 900; }
    P .l4 { top: 1190px; font-size: 200px; font-weight: 900; }
    P .web { position: absolute; left: 70px; top: 1430px; width: 940px; height: 150px; border-radius: 75px; background: ${NAVY}; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 104px; line-height: 146px; color: ${G}; letter-spacing: -0.02em; }`,
    html: `
      <div class="L n l1">¿Qué tarea</div>
      <div class="L n l2">te sacás primero?</div>
      <svg class="full vc" viewBox="0 0 1080 1920" aria-hidden="true">
        <rect x="150" y="640" width="800" height="390" rx="34" fill="rgba(11,18,32,0.35)" transform="translate(14 16)"/>
        <rect x="150" y="640" width="800" height="390" rx="34" fill="${NAVY}"/>
        <rect x="180" y="690" width="360" height="320" rx="20" fill="${NAVY3}"/>
        <rect x="560" y="690" width="360" height="320" rx="20" fill="${NAVY3}"/>
        ${persona(360, CR)}${persona(740, G)}
        <circle class="vivo" cx="196" cy="664" r="10" fill="${G}"/>
        <rect x="216" y="656" width="120" height="16" rx="8" fill="${NAVY3}"/>
      </svg>
      <div class="L n l3">Videollamada</div>
      <div class="L n l4">gratis</div>
      <div class="web">scalerics.com</div>`,
    js: `
      golpe(".l1", 0, 1.25);
      sube(".l2", ${W(id, 75)} - 0.05, 50, 0.26);
      gsap.set(q(".vc"), { opacity: 0 });
      tl.fromTo(q(".vc"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, transformOrigin: "540px 835px", duration: 0.36, ease: "back.out(1.7)", immediateRender: false }, ${W(id, 78)} - 0.1);
      golpe(".l3", ${W(id, 80)} - 0.08, 1.4);
      golpe(".l4", ${W(id, 81)} - 0.08, 1.5);
      gsap.set(q(".web"), { opacity: 0 });
      tl.fromTo(q(".web"), { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.8)", immediateRender: false }, ${W(id, 83)} - 0.1);
      tl.to(q(".vivo"), { opacity: 0.25, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.6);
      tl.to(q(".web"), { scale: 1.04, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${W(id, 83)} + 0.6);`,
    sfx: [{ t: 0, sfx: "whoosh", vol: 0.25 }, { t: W(id, 78) - 0.1, sfx: "notification", vol: 0.25 }, { t: W(id, 80) - 0.08, sfx: "impact-bass-2", vol: 0.3, max: 0.5 }, { t: W(id, 83) - 0.1, sfx: "chime", vol: 0.35 }],
  });
}

console.log("escenas:", escenas.join(", "));
