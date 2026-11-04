// Generador de escenas de reels/la-misma-pregunta (correr desde la carpeta del reel, después
// `node armar.mjs`; después de esto, `node armar.mjs` otra vez para que tome los .sfx.json).
// Formato "contador en vivo" (motion de TikTok) dentro del celular a pantalla completa: interfaz
// recreada grande, burbujas, contadores enormes. Misma forma que reels/por-que-la-tarjeta/gen.mjs.
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 32.13;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", BORDE = "#2c4268", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, trazo = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${trazo}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h) => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${esquinas}</div>`;
const pill = (cls, x, y, txt, kind = "") => `<div class="pill ${kind} ${cls}" style="left:${x}px;top:${y}px">${txt}</div>`;
const av = (letra, kind = "") => `<span class="av ${kind}">${letra}</span>`;
// burbuja entrante (crema) o saliente (verde); x,y = esquina superior izquierda (o derecha si sale)
const bin = (cls, x, y, txt, quien = "", extra = "") =>
  `<div class="bw ${cls}" style="left:${x}px;top:${y}px${extra}">${quien ? `<div class="quien">${quien}</div>` : ""}<div class="b in">${txt}</div></div>`;
const bout = (cls, x, y, txt, extra = "") => `<div class="bw sale ${cls}" style="right:${1080 - x}px;top:${y}px${extra}"><div class="b out">${txt}</div></div>`;

// tarjetas de contador (s03, s04, s05 comparten la grilla)
const PREG = ["¿Abren hoy?", "¿Hacen envíos?", "¿Cuánto sale?", "¿Hay talle M?"];
const RESP = ["De 10 a 19 h", "A todo el país", "$ 1.890", "Sí, quedan 3"];
const POS = [[60, 540], [560, 540], [60, 1010], [560, 1010]];
const grilla = (nums, conResp = false) =>
  POS.map(([x, y], k) => `
      <div class="cc c${k}" style="left:${x}px;top:${y}px">
        <div class="cc-q">${PREG[k]}</div>
        <div class="cc-n n${k}">${nums[k]}</div>
        <div class="cc-l l${k}">VECES HOY</div>
        <div class="cc-r r${k}"${conResp ? "" : ` style="opacity:0"`}>${tick(20)}<span>${RESP[k]}</span></div>
      </div>`).join("");

// remera de la casa de ropa (viewBox 640 x 600)
const remera = `<svg viewBox="0 0 640 600" aria-hidden="true">
  <path d="M320 34 V10 Q320 -16 346 -16" fill="none" stroke="${CR}" stroke-width="12" stroke-linecap="round"/>
  <path d="M200 40 L110 72 L18 196 L112 272 L160 226 L160 566 L480 566 L480 226 L528 272 L622 196 L530 72 L440 40 Q320 128 200 40 Z" fill="${CR}"/>
  <path d="M440 40 L530 72 L622 196 L528 272 L480 226 L480 566 L420 566 L420 120 Q440 80 440 40 Z" fill="#d6d4c6"/>
  <rect x="160" y="300" width="320" height="64" fill="${G}"/><rect x="420" y="300" width="60" height="64" fill="${GD}"/>
  <path d="M200 40 Q320 128 440 40" fill="none" stroke="${NAVY3}" stroke-width="16" stroke-linecap="round"/>
  <path d="M160 226 L160 150 M480 226 L480 150" stroke="rgba(11,18,32,0.22)" stroke-width="8" stroke-linecap="round"/>
</svg>`;
const chispa = (s = 1, fill = NAVY) => `<path transform="scale(${s})" d="M0 -30 Q4 -4 30 0 Q4 4 0 30 Q-4 4 -30 0 Q-4 -4 0 -30 Z" fill="${fill}"/>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} .capa { position: absolute; inset: 0; }
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
    ${P} .bw { position: absolute; max-width: 860px; opacity: 0; }
    ${P} .bw.sale { display: flex; flex-direction: column; align-items: flex-end; }
    ${P} .quien { display: flex; align-items: center; gap: 16px; margin: 0 0 12px 6px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(239,238,229,0.7); white-space: nowrap; }
    ${P} .av { display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: ${NAVY3}; border: 4px solid ${BORDE}; font: 800 28px/48px "Lexend", sans-serif; text-align: center; color: ${CR}; letter-spacing: 0; }
    ${P} .av.g { background: ${G}; border-color: ${G}; color: ${NAVY}; }
    ${P} .av.c { background: ${CR}; border-color: ${CR}; color: ${NAVY}; }
    ${P} .b { display: inline-block; padding: 24px 36px 26px; font: 600 46px/1.2 "Lexend", sans-serif; border-radius: 40px; box-shadow: 0 12px 0 rgba(3,6,12,0.5); }
    ${P} .b.in { background: ${CR}; color: ${NAVY}; border-bottom-left-radius: 10px; }
    ${P} .b.out { background: ${G}; color: ${NAVY}; border-bottom-right-radius: 10px; }
    ${P} .cc { position: absolute; width: 460px; height: 440px; border-radius: 40px; background: ${NAVY2}; border: 6px solid ${BORDE}; box-shadow: 0 16px 0 rgba(3,6,12,0.55); }
    ${P} .cc-q { position: absolute; left: 0; right: 0; top: 34px; text-align: center; font: 700 44px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; }
    ${P} .cc-n { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 900 196px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.04em; }
    ${P} .cc-l { position: absolute; left: 0; right: 0; top: 318px; text-align: center; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: rgba(239,238,229,0.6); }
    ${P} .cc-r { position: absolute; left: 22px; right: 22px; top: 318px; height: 82px; border-radius: 26px; background: ${G}; display: flex; align-items: center; justify-content: center; gap: 14px; font: 700 34px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    ${P} .cc-r svg circle { fill: ${NAVY}; } ${P} .cc-r svg path { stroke: ${G}; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const entra = (s, t, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, y: desde ?? 60, scale: 0.92, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.6)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const latir = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.1, transformOrigin: "50% 50%", duration: 0.13, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t);
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.12, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      // contador: un solo objeto por número, varios pasos [t, valor, duración]
      const cuenta = (s, v0, pasos, salto) => {
        const el = q(s); const o = { v: v0 }; el.textContent = v0;
        pasos.forEach(([t, v, d]) => {
          tl.to(o, { v, duration: d ?? 0.08, ease: "none", onUpdate: () => { el.textContent = Math.round(o.v); } }, t);
          if (salto !== false) tl.fromTo(el, { scale: 1.16 }, { scale: 1, transformOrigin: "50% 60%", duration: 0.3, ease: "back.out(2.4)", immediateRender: false }, t + (d ?? 0.08));
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

// ================= ambiente: el reel ES la pantalla de un celular =================
{
  const T_TARDE = INI["s05-tarde"], T_MSJ = INI["s02-martes"], T_AG = INI["s07-agente"], T_CTA = INI["s10-cta"];
  fs.writeFileSync("compositions/ambiente.html", `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] .amb-marco { position: absolute; left: 14px; top: 14px; width: 1052px; height: 1892px; border: 6px solid rgba(239, 238, 229, 0.24); border-radius: 92px; }
    [data-composition-id="ambiente"] .amb-isla { position: absolute; left: 440px; top: 38px; width: 200px; height: 56px; border-radius: 28px; background: #02050a; }
    [data-composition-id="ambiente"] .amb-hora { position: absolute; left: 112px; top: 42px; width: 200px; height: 48px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 38px; line-height: 48px; color: #efeee5; }
    [data-composition-id="ambiente"] .amb-hora span { position: absolute; left: 0; top: 0; opacity: 0; }
    [data-composition-id="ambiente"] .amb-iconos { position: absolute; right: 104px; top: 48px; width: 180px; height: 38px; }
    [data-composition-id="ambiente"] .amb-home { position: absolute; left: 400px; top: 1868px; width: 280px; height: 10px; border-radius: 5px; background: #efeee5; opacity: 0.45; }
    [data-composition-id="ambiente"] .amb-modo { position: absolute; left: 112px; top: 128px; width: 860px; height: 32px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.22em; color: rgba(239, 238, 229, 0.65); white-space: nowrap; }
    [data-composition-id="ambiente"] .amb-modo span { position: absolute; left: 0; top: 0; opacity: 0; }
    [data-composition-id="ambiente"] .amb-modo .verde { color: #5ce611; }
    [data-composition-id="ambiente"] .amb-linea { position: absolute; left: 112px; right: 112px; top: 178px; height: 3px; background: rgba(239, 238, 229, 0.14); transform-origin: 0 50%; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-marco"></div>
      <div class="amb-isla"></div>
      <div class="amb-hora"><span class="amb-h0">9:14</span><span class="amb-h1">17:46</span></div>
      <svg class="amb-iconos" viewBox="0 0 180 38" aria-hidden="true">
        <rect x="0" y="23" width="8" height="12" rx="2" fill="#efeee5" />
        <rect x="13" y="16" width="8" height="19" rx="2" fill="#efeee5" />
        <rect x="26" y="9" width="8" height="26" rx="2" fill="#efeee5" />
        <rect x="39" y="2" width="8" height="33" rx="2" fill="#efeee5" opacity="0.4" />
        <path d="M66 15 C78 3 98 3 110 15 M74 23 C82 15 94 15 102 23" fill="none" stroke="#efeee5" stroke-width="5" stroke-linecap="round" />
        <circle cx="88" cy="30" r="4" fill="#efeee5" />
        <rect x="122" y="5" width="48" height="27" rx="8" fill="none" stroke="#efeee5" stroke-width="3" opacity="0.6" />
        <rect class="amb-bat" x="127" y="10" width="30" height="17" rx="4" fill="#5ce611" />
        <rect x="173" y="14" width="5" height="10" rx="2" fill="#efeee5" opacity="0.6" />
      </svg>
      <div class="amb-modo"><span class="amb-m1">MENSAJES · ALMA ROPA</span><span class="amb-m2 verde">AGENTE DE IA · EN LÍNEA</span><span class="amb-m3 verde">SCALERICS · VIDEOLLAMADA</span></div>
      <div class="amb-linea"></div>
      <div class="amb-home"></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      gsap.set(q(".amb-h0"), { opacity: 1 });
      tl.to(q(".amb-h0"), { opacity: 0, duration: 0.01 }, ${T_TARDE + 0.2});
      tl.fromTo(q(".amb-h1"), { opacity: 0 }, { opacity: 1, duration: 0.01 }, ${T_TARDE + 0.2});
      // la batería baja a la tarde
      tl.to(q(".amb-bat"), { scaleX: 0.35, fill: "#c7655b", svgOrigin: "127 18", duration: 0.4 }, ${T_TARDE + 0.2});
      tl.to(q(".amb-bat"), { scaleX: 1, fill: "#5ce611", svgOrigin: "127 18", duration: 0.4 }, ${T_AG + 1});
      // rótulo: mensajes del local, después el agente, después la videollamada
      tl.fromTo(q(".amb-linea"), { scaleX: 0.3, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, ${T_MSJ});
      tl.fromTo(q(".amb-m1"), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.4 }, ${T_MSJ});
      tl.to(q(".amb-m1"), { opacity: 0, y: -10, duration: 0.25 }, ${T_AG});
      tl.fromTo(q(".amb-m2"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${T_AG + 0.1});
      tl.to(q(".amb-linea"), { backgroundColor: "rgba(92, 230, 17, 0.4)", duration: 0.4 }, ${T_AG + 0.1});
      tl.to(q(".amb-m2"), { opacity: 0, y: -10, duration: 0.25 }, ${T_CTA});
      tl.fromTo(q(".amb-m3"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${T_CTA + 0.1});
      tl.to(q(".amb-marco"), { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
}

// ================= s01 · gancho: el contador =================
const DIG = 320;
const tira = (k) => `<div class="dg dg${k}"><div class="tira">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => `<div>${d}</div>`).join("")}</div></div>`;
escena("s01-gancho", {
  css: `
    P .kick { position: absolute; left: 0; right: 0; top: 148px; text-align: center; font: 500 36px/1 "IBM Plex Mono", monospace; letter-spacing: 0.26em; color: ${G}; }
    P .tit { position: absolute; left: 0; right: 0; top: 214px; text-align: center; font: 900 118px/1.02 "Lexend", sans-serif; color: #fff; letter-spacing: -0.035em; }
    P .tit .v { color: ${G}; }
    P .big { position: absolute; left: 70px; top: 640px; width: 940px; height: 520px; border-radius: 48px; background: ${NAVY2}; border: 6px solid ${BORDE}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); }
    P .big-h { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.22em; color: rgba(239,238,229,0.7); }
    P .dg { position: absolute; top: 112px; width: 250px; height: ${DIG}px; border-radius: 30px; background: ${NAVY}; overflow: hidden; }
    P .dg0 { left: 52px; } P .dg1 { left: 339px; } P .dg2 { left: 626px; }
    P .dg::after { content: ""; position: absolute; left: 0; right: 0; top: ${DIG / 2 - 3}px; height: 6px; background: rgba(22,36,61,0.9); }
    P .tira div { height: ${DIG}px; font: 900 290px/${DIG}px "Lexend", sans-serif; text-align: center; color: ${G}; letter-spacing: -0.04em; }
    P .dg0 .tira div, P .dg1 .tira div { color: rgba(239,238,229,0.35); }
    P .mas { position: absolute; left: 900px; top: 1060px; font: 900 76px/1 "Lexend", sans-serif; color: ${G}; opacity: 0; }`,
  html: `
      <div class="kick">ESTE CONTADOR SUMA</div>
      <div class="tit"><div>¿Cuántas veces</div><div>te preguntan</div><div class="v">lo mismo?</div></div>
      <div class="big"><div class="big-h">LA MISMA PREGUNTA · HOY</div>${tira(0)}${tira(1)}${tira(2)}</div>
      <div class="mas">+1</div>
      ${bin("q1", 70, 1210, "¿Abren hoy?", `${av("S")}SOFI`)}
      ${bout("q2", 1010, 1290, "¿Abren hoy?")}
      ${bin("q3", 70, 1420, "¿Abren hoy?", `${av("M")}MARTÍN`)}
      ${bout("q4", 1010, 1530, "¿Abren hoy?")}`,
  js: `
      // las burbujas de la derecha también son preguntas (otros chats), en crema
      qa(".q2 .b, .q4 .b").forEach((b) => { b.classList.remove("out"); b.classList.add("in"); b.style.borderBottomLeftRadius = "40px"; b.style.borderBottomRightRadius = "10px"; });
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".big"), { y: 30 }, { y: 0, duration: 0.6, ease: "power3.out" }, 0);
      const rodar = (k, d, t) => tl.to(q(".dg" + k + " .tira"), { y: -d * ${DIG}, duration: 0.32, ease: "back.out(1.5)" }, t);
      const mas = (t) => tl.fromTo(q(".mas"), { opacity: 1, y: 0, scale: 0.7 }, { opacity: 0, y: -90, scale: 1.1, duration: 0.6, ease: "power2.out", immediateRender: false }, t);
      // cada pregunta suma: 1, 2, 3, 4 ... y se dispara
      const BEATS = [[0.6, 1, ".q1"], [1.58, 2, ".q2"], [2.5, 3, ".q3"], [3.3, 4, ".q4"]];
      for (const [t, v, s] of BEATS) { entra(s, t - 0.12); rodar(2, v, t); mas(t); latir(".big", t, 1.03); }
      rodar(2, 9, 3.75); rodar(1, 1, 3.95); tl.to(q(".dg2 .tira"), { y: -2 * ${DIG}, duration: 0.25, ease: "power2.out" }, 4.0);
      tl.to(qa(".dg1 .tira div"), { color: "${G}", duration: 0.2 }, 3.95);
      tl.to(q(".tit"), { opacity: 0, y: -50, duration: 0.25, ease: "power2.in" }, 4.0);
      salida(4.08);`,
  sfx: [{ t: 0.6, sfx: "key-press", vol: 0.32 }, { t: 1.58, sfx: "key-press", vol: 0.32 }, { t: 2.5, sfx: "key-press", vol: 0.32 }, { t: 3.3, sfx: "key-press", vol: 0.32 }, { t: 0.5, sfx: "notification", vol: 0.22 }, { t: 3.75, sfx: "click", vol: 0.28 }],
});

// ================= s02 · casa de ropa, un martes =================
escena("s02-martes", {
  css: `
    P .rem { position: absolute; left: 200px; top: 520px; width: 680px; height: 638px; }
    P .rem svg { width: 680px; height: 638px; overflow: visible; }
    P .nom { position: absolute; left: 0; right: 0; top: 1214px; text-align: center; font: 900 120px/1 "Lexend", sans-serif; color: #fff; letter-spacing: -0.03em; opacity: 0; }
    P .badge { position: absolute; left: 790px; top: 520px; width: 170px; height: 170px; border-radius: 50%; background: ${RED}; border: 10px solid ${NAVY}; font: 900 80px/150px "Lexend", sans-serif; text-align: center; color: #fff; opacity: 0; }`,
  html: `
      ${`<div class="sombra sh" style="left:250px;top:1158px;width:580px;height:44px"></div>`}
      <div class="rem">${remera}</div>
      <div class="badge">12</div>
      <div class="nom">Alma Ropa</div>
      ${pill("dia", 540, 1386, "MARTES · 9:14", "lleno")}`,
  js: `
      gsap.set(q(".dia"), { xPercent: -50 });
      tl.fromTo(q(".rem"), { opacity: 0, scale: 0.7, y: 80, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0, scaleX: 0.5 }, { opacity: 1, scaleX: 1, duration: 0.45 }, 0);
      tl.to(q(".rem"), { rotation: -3, transformOrigin: "50% 0%", duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.45);
      tl.fromTo(q(".nom"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.2);
      tl.fromTo(q(".dia"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.34, ease: "back.out(1.8)" }, 0.8);
      pop(".badge", 1.1, 0.3, 0.4);
      cuenta(".badge", 12, [[1.4, 13], [1.6, 14]]);
      salida(1.74);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.25 }, { t: 0.8, sfx: "click-soft", vol: 0.28 }, { t: 1.1, sfx: "notification", vol: 0.3 }],
});

// ================= s03 · las cuatro preguntas =================
// valores al final de s03: [5, 3, 3, 2]
escena("s03-preguntas", {
  css: `
    P .cc { opacity: 0; }
    P .bw { left: 60px; top: 1500px; }`,
  html: `
      ${grilla([0, 0, 0, 0])}
      ${PREG.map((p, k) => bin("b" + k, 60, 1500, p, `${av(["S", "M", "L", "C"][k], k % 2 ? "c" : "")}${["SOFI", "MARTÍN", "LU", "CARLA"][k]}`)).join("")}`,
  js: `
      gsap.set(qa(".cc-n"), { color: "rgba(239,238,229,0.3)" });
      qa(".cc").forEach((c, k) => tl.fromTo(c, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, k * 0.06));
      const T = [0.0, 0.94, 2.14, 3.13];
      const enc = (k, t) => { tl.to(q(".c" + k), { borderColor: "${G}", duration: 0.15 }, t); tl.to(q(".n" + k), { color: "${G}", duration: 0.15 }, t); latir(".c" + k, t + 0.05, 1.05); };
      T.forEach((t, k) => {
        entra(".b" + k, t + 0.05);
        if (k < 3) tl.to(q(".b" + k), { opacity: 0, y: -60, scale: 0.8, duration: 0.25, ease: "power2.in" }, T[k + 1] - 0.05);
        enc(k, t + 0.2);
      });
      cuenta(".n0", 0, [[0.2, 1], [1.14, 2], [2.34, 3], [3.33, 4], [3.95, 5]]);
      cuenta(".n1", 0, [[1.14, 1], [2.5, 2], [3.6, 3]]);
      cuenta(".n2", 0, [[2.34, 1], [3.45, 2], [4.05, 3]]);
      cuenta(".n3", 0, [[3.33, 1], [3.8, 2]]);
      salida(4.14);`,
  sfx: [{ t: 0.05, sfx: "notification", vol: 0.26 }, { t: 0.99, sfx: "notification", vol: 0.26 }, { t: 2.19, sfx: "notification", vol: 0.26 }, { t: 3.18, sfx: "notification", vol: 0.26 }, { t: 3.6, sfx: "key-press", vol: 0.25 }, { t: 3.95, sfx: "key-press", vol: 0.25 }],
});

// ================= s04 · contestás bien, cada una =================
escena("s04-contestas", {
  css: `
    P .cc { border-color: ${G}; }
    P .bw { left: 60px; top: 1500px; }`,
  html: `
      ${grilla([5, 3, 3, 2])}
      ${bin("b9", 60, 1500, "¿Abren hoy?", `${av("P")}PABLO`)}`,
  js: `
      gsap.set(qa(".cc-r"), { opacity: 0 });
      [0.0, 0.3, 0.64, 0.98].forEach((t, k) => {
        tl.to(q(".l" + k), { opacity: 0, duration: 0.12 }, t);
        tl.fromTo(q(".r" + k), { opacity: 0, y: 30, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, t + 0.04);
      });
      // y enseguida, otra vez la misma
      entra(".b9", 1.22);
      tl.to(q(".c0"), { x: -8, duration: 0.05, yoyo: true, repeat: 3 }, 1.4);
      cuenta(".n0", 5, [[1.4, 6]]);
      salida(1.7);`,
  sfx: [{ t: 0.04, sfx: "pop", vol: 0.24 }, { t: 0.34, sfx: "pop", vol: 0.24 }, { t: 0.68, sfx: "pop", vol: 0.24 }, { t: 1.02, sfx: "pop", vol: 0.24 }, { t: 1.22, sfx: "notification", vol: 0.28 }],
});

// ================= s05 · a la tarde: no entra en la pantalla =================
escena("s05-tarde", {
  css: `
    P .cc { border-color: ${G}; }
    P .hora { position: absolute; left: 540px; top: 1500px; }
    P .tot { position: absolute; left: 70px; top: 620px; width: 940px; height: 700px; border-radius: 48px; background: ${NAVY2}; border: 6px solid ${G}; box-shadow: 0 18px 0 rgba(3,6,12,0.55); opacity: 0; }
    P .tot-h { position: absolute; left: 0; right: 0; top: 46px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: rgba(239,238,229,0.7); }
    P .tot-n { position: absolute; left: -400px; right: -400px; top: 960px; text-align: center; font: 900 420px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.05em; opacity: 0; }`,
  html: `
      <div class="grid">${grilla([6, 3, 3, 2], true)}</div>
      <div class="tot"><div class="tot-h">TOTAL DE HOY</div></div>
      <div class="tot-n">125</div>
      ${pill("hora", 540, 1500, "A LA TARDE · 17:46", "g")}`,
  js: `
      gsap.set(q(".hora"), { xPercent: -50 });
      gsap.set(q(".tot-n"), { yPercent: -50 });
      pop(".hora", 0.18);
      // los cuatro contadores se disparan
      const F = [38, 27, 41, 19], A = [6, 3, 3, 2];
      F.forEach((v, k) => {
        const el = q(".n" + k); const o = { v: A[k] };
        tl.to(o, { v, duration: 0.62, ease: "power2.in", onUpdate: () => { el.textContent = Math.round(o.v); } }, 0.25 + k * 0.04);
        tl.to(q(".c" + k), { x: k % 2 ? 6 : -6, duration: 0.05, yoyo: true, repeat: 5 }, 0.5);
      });
      // el contador total ocupa todo y no entra
      tl.to(q(".grid"), { opacity: 0, scale: 0.8, transformOrigin: "540px 1000px", duration: 0.25, ease: "power2.in" }, 0.92);
      fuera(".hora", 0.92);
      pop(".tot", 0.98, 0.3, 0.9);
      tl.fromTo(q(".tot-n"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 1.0);
      tl.to(q(".tot-n"), { scale: 1.9, duration: 0.5, ease: "back.out(1.4)" }, 1.36);
      tl.to(q(".tot"), { borderColor: "${RED}", duration: 0.2 }, 1.4);
      tl.to(q(".tot-n"), { color: "${RED}", duration: 0.2 }, 1.9);
      tl.to(q(".tot-n"), { scale: 2.7, duration: 0.45, ease: "back.out(1.4)" }, 1.9);
      tl.to(q(".tot"), { x: -10, duration: 0.05, yoyo: true, repeat: 7 }, 1.95);
      salida(2.55);`,
  sfx: [{ t: 0.18, sfx: "click-soft", vol: 0.28 }, { t: 0.25, sfx: "typing", vol: 0.25, max: 0.7 }, { t: 1.0, sfx: "pop", vol: 0.3 }, { t: 1.36, sfx: "impact-bass-1", vol: 0.3 }, { t: 1.9, sfx: "glitch-1", vol: 0.22, max: 0.5 }],
});

// ================= s06 · giro: siempre la misma respuesta =================
const GENTE = [["S", "SOFI · 10:02", ""], ["M", "MARTÍN · 12:15", "c"], ["L", "LU · 15:40", ""], ["C", "CARLA · 17:31", "c"]];
escena("s06-giro", {
  css: `
    P .ok { position: absolute; left: 500px; width: 64px; height: 64px; opacity: 0; }
    P .g .b { font-size: 56px; }
    P .ok svg { width: 64px; height: 64px; }
    P .lead { fill: none; stroke: ${G}; stroke-width: 7; stroke-linecap: round; }
    P .resp { position: absolute; right: 70px; top: 1340px; }
    P .resp .b { font-size: 60px; padding: 30px 44px 32px; }
    P .fant { opacity: 0; }
    P .fant .b { background: ${GD}; }`,
  html: `
      ${GENTE.map(([l, n, k], i) => bin("g g" + i, 60, 520 + i * 190, "¿Abren hoy?", `${av(l, k)}${n}`)).join("")}
      ${GENTE.map((_, i) => `<div class="ok o${i}" style="top:${600 + i * 190}px">${tick(32)}</div>`).join("")}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${GENTE.map((_, i) => `<path class="lead ld${i}" d="M590 ${632 + i * 190} C 800 ${632 + i * 190}, 860 ${1150 + i * 20}, 860 1330"/>`).join("")}</svg>
      ${[3, 2, 1].map((k) => bout(`resp fant f${k}`, 1010, 1340, "Abrimos de 10 a 19 h", `;transform:translate(${-k * 16}px,${-k * 22}px)`)).join("")}
      ${bout("resp r0", 1010, 1340, `Abrimos de 10 a 19 h`)}
      ${pill("misma", 540, 1560, "SIEMPRE LA MISMA", "lleno")}`,
  js: `
      gsap.set(q(".misma"), { xPercent: -50 });
      [0.0, 0.2, 0.42, 0.66].forEach((t, i) => entra(".g" + i, t));
      // la gente pregunta bien: tilde a cada una
      [1.36, 1.46, 1.56, 1.66].forEach((t, i) => pop(".o" + i, t, 0.3, 0.4));
      // esas preguntas convergen en una sola respuesta
      [0, 1, 2, 3].forEach((i) => dibujar(".ld" + i, 2.0 + i * 0.06, 0.45));
      tl.fromTo(q(".r0"), { opacity: 0, scale: 0.7, transformOrigin: "100% 100%" }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(1.8)" }, 2.6);
      [1, 2, 3].forEach((k, j) => tl.to(q(".f" + k), { opacity: 1, duration: 0.12 }, 2.9 + j * 0.14));
      tl.to(qa(".fant"), { x: 0, y: 0, duration: 0.25, ease: "power3.in" }, 3.46);
      tl.to(qa(".fant"), { opacity: 0, duration: 0.05 }, 3.7);
      latir(".r0", 3.72, 1.08);
      pop(".misma", 3.6);
      salida(4.36);`,
  sfx: [{ t: 0.0, sfx: "notification", vol: 0.22 }, { t: 0.42, sfx: "notification", vol: 0.22 }, { t: 1.36, sfx: "ping", vol: 0.22 }, { t: 2.0, sfx: "whoosh-short", vol: 0.2 }, { t: 2.6, sfx: "pop", vol: 0.28 }, { t: 3.6, sfx: "chime", vol: 0.28 }],
});

// ================= s07 · el agente de IA contesta =================
const ICON = {
  precios: `<svg width="84" height="84" viewBox="0 0 84 84"><path d="M8 40 L40 8 H76 V44 L44 76 Z" fill="${NAVY}"/><circle cx="60" cy="24" r="7" fill="${G}"/></svg>`,
  stock: `<svg width="84" height="84" viewBox="0 0 84 84"><path d="M42 6 L78 22 V62 L42 78 L6 62 V22 Z" fill="${NAVY}"/><path d="M6 22 L42 38 L78 22 M42 38 V78" fill="none" stroke="${G}" stroke-width="6"/></svg>`,
  horarios: `<svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="36" fill="${NAVY}"/><path d="M42 20 V42 L58 52" fill="none" stroke="${G}" stroke-width="7" stroke-linecap="round"/></svg>`,
};
const DATOS = [["precios", "PRECIOS", "$ 1.890"], ["stock", "STOCK", "M: 3"], ["horarios", "HORARIOS", "10 a 19 h"]];
escena("s07-agente", {
  css: `
    P .hd { position: absolute; left: 60px; top: 520px; width: 960px; height: 140px; border-radius: 40px; background: ${NAVY2}; border: 6px solid ${BORDE}; }
    P .hd-av { position: absolute; left: 24px; top: 20px; width: 88px; height: 88px; border-radius: 50%; background: ${G}; }
    P .hd-av svg { position: absolute; left: 0; top: 0; width: 88px; height: 88px; }
    P .hd-n { position: absolute; left: 136px; top: 22px; font: 800 46px/1 "Lexend", sans-serif; color: #fff; }
    P .hd-s { position: absolute; left: 138px; top: 82px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${G}; }
    P .b { font-size: 44px; }
    P .rap { position: absolute; right: 100px; top: 570px; display: flex; align-items: center; gap: 14px; font: 600 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${G}; opacity: 0; }
    P .dt { position: absolute; top: 1250px; width: 300px; height: 280px; border-radius: 36px; background: ${CR}; box-shadow: 0 14px 0 rgba(3,6,12,0.5); opacity: 0; }
    P .dt svg { position: absolute; left: 24px; top: 24px; }
    P .dt-t { position: absolute; left: 26px; top: 132px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(11,18,32,0.6); }
    P .dt-v { position: absolute; left: 24px; top: 186px; font: 800 50px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; }
    P .lead { fill: none; stroke: ${G}; stroke-width: 7; stroke-linecap: round; }`,
  html: `
      <div class="hd"><div class="hd-av"><svg viewBox="-44 -44 88 88">${chispa(1.1)}</svg></div><div class="hd-n">Alma Ropa</div><div class="hd-s">AGENTE DE IA · EN LÍNEA</div></div>
      ${selbox("sb", 50, 510, 980, 160)}
      ${bin("pq", 60, 700, "¿Cuánto sale el buzo gris?<br>¿Hay en M?")}
      ${bout("rs", 1020, 880, "$ 1.890 y sí, quedan 3 en M.<br>Abrimos hasta las 19 h.")}
      ${bout("typ", 1020, 880, "•  •  •")}
      <div class="rap">${tick(20)}<span>AL INSTANTE</span></div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
        <path class="lead e0" d="M210 1250 C 210 1150, 300 1080, 330 1060"/>
        <path class="lead e1" d="M540 1250 C 540 1190, 560 1150, 600 1110"/>
        <path class="lead e2" d="M870 1250 C 870 1200, 840 1130, 820 1085"/>
      </svg>
      ${DATOS.map(([k, t, v], i) => `<div class="dt d${i}" style="left:${60 + i * 330}px">${ICON[k]}<div class="dt-t">${t}</div><div class="dt-v">${v}</div></div>`).join("")}`,
  js: `
      tl.fromTo(q(".hd"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".hd-av svg"), { rotation: 0 }, { rotation: 180, transformOrigin: "50% 50%", duration: 4.6, ease: "none" }, 0);
      entra(".pq", 0.3);
      caja(".sb", 1.0);
      tl.to(q(".sb"), { opacity: 0, duration: 0.2 }, 1.85);
      entra(".typ", 1.2, 30); tl.to(q(".typ"), { opacity: 0, duration: 0.08 }, 1.98);
      // al instante: la respuesta sale sola
      tl.fromTo(q(".rs"), { opacity: 0, y: 50, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 2.0);
      tl.fromTo(q(".rap"), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 2.25);
      // con tus precios, stock y horarios
      [3.0, 3.42, 4.02].forEach((t, i) => {
        tl.fromTo(q(".d" + i), { opacity: 0, y: 80, scale: 0.85, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.7)" }, t);
        dibujar(".e" + i, t + 0.15, 0.3);
      });
      latir(".rs", 4.4, 1.04);
      salida(4.82);`,
  sfx: [{ t: 0.3, sfx: "notification", vol: 0.24 }, { t: 1.0, sfx: "click-soft", vol: 0.28 }, { t: 2.0, sfx: "ping", vol: 0.3 }, { t: 3.0, sfx: "pop", vol: 0.24 }, { t: 3.42, sfx: "pop", vol: 0.24 }, { t: 4.02, sfx: "pop", vol: 0.24 }],
});

// ================= s08 · y si es para vos, te la pasa =================
escena("s08-vos", {
  css: `
    P .b { font-size: 44px; }
    P .noti { position: absolute; left: 60px; top: 1070px; width: 960px; height: 260px; border-radius: 44px; background: #ffffff; box-shadow: 0 16px 0 rgba(3,6,12,0.5); opacity: 0; }
    P .noti .ic { position: absolute; left: 34px; top: 52px; width: 150px; height: 150px; border-radius: 36px; background: ${G}; }
    P .noti .ic svg { position: absolute; left: 25px; top: 25px; }
    P .noti .t0 { position: absolute; left: 216px; top: 40px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.55); }
    P .noti .t1 { position: absolute; left: 216px; top: 90px; font: 800 52px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .noti .t2 { position: absolute; left: 216px; top: 166px; font: 500 36px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.72); }`,
  html: `
      ${bin("pq", 60, 540, "Necesito 30 remeras con<br>el logo de mi empresa.")}
      ${bout("rs", 1020, 760, "¡Buenísimo! Te paso con<br>alguien del equipo.")}
      <div class="noti"><div class="ic"><svg width="100" height="100" viewBox="0 0 100 100"><path d="M10 14 H90 Q96 14 96 20 V66 Q96 72 90 72 H40 L18 92 V72 H10 Q4 72 4 66 V20 Q4 14 10 14 Z" fill="${NAVY}"/><circle cx="30" cy="43" r="7" fill="${G}"/><circle cx="50" cy="43" r="7" fill="${G}"/><circle cx="70" cy="43" r="7" fill="${G}"/></svg></div>
        <div class="t0">ALMA ROPA · AHORA</div><div class="t1">Esta es para vos</div><div class="t2">Pedido grande · 30 remeras</div></div>
      ${pill("pv", 540, 1420, "Te pasa la conversación", "lleno")}`,
  js: `
      gsap.set(q(".pv"), { xPercent: -50 });
      entra(".pq", 0.0);
      tl.fromTo(q(".rs"), { opacity: 0, y: 50, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 0.5);
      tl.fromTo(q(".noti"), { opacity: 0, y: -200, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, 0.95);
      pop(".pv", 1.4);
      tl.to(q(".noti"), { y: 12, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.45);
      salida(2.16);`,
  sfx: [{ t: 0.0, sfx: "notification", vol: 0.22 }, { t: 0.5, sfx: "ping", vol: 0.26 }, { t: 0.95, sfx: "notification", vol: 0.36 }, { t: 1.4, sfx: "pop", vol: 0.26 }],
});

// ================= s09 · cuánto tiempo te devuelve =================
const R = 150;
const CIRC = r2(2 * Math.PI * R);
escena("s09-tiempo", {
  css: `
    P .reloj { position: absolute; left: 190px; top: 560px; width: 700px; height: 700px; }
    P .reloj svg { width: 700px; height: 700px; overflow: visible; }
    P .sec { fill: none; stroke: ${G}; stroke-width: ${2 * R}; }`,
  html: `
      <div class="sombra sh" style="left:250px;top:1290px;width:580px;height:46px"></div>
      <div class="reloj"><svg viewBox="0 0 700 700" aria-hidden="true">
        <circle cx="356" cy="364" r="330" fill="#a9a798"/>
        <circle cx="350" cy="350" r="330" fill="${CR}"/>
        <circle cx="350" cy="350" r="300" fill="#ffffff"/>
        <circle class="sec" cx="350" cy="350" r="${R}" transform="rotate(-90 350 350)" style="stroke-dasharray:${CIRC};stroke-dashoffset:${CIRC}"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="342" y="66" width="16" height="${i % 3 ? 30 : 52}" rx="8" fill="${NAVY}" transform="rotate(${i * 30} 350 350)"/>`).join("")}
        <rect class="hh" x="340" y="190" width="20" height="170" rx="10" fill="${NAVY}"/>
        <rect class="mm" x="343" y="110" width="14" height="250" rx="7" fill="${NAVY}"/>
        <circle cx="350" cy="350" r="24" fill="${NAVY}"/><circle cx="350" cy="350" r="9" fill="${G}"/>
      </svg></div>
      ${pill("tv", 540, 1380, "Tiempo para vos", "lleno")}`,
  js: `
      gsap.set(q(".tv"), { xPercent: -50 });
      gsap.set(q(".hh"), { rotation: 150, svgOrigin: "350 350" });
      gsap.set(q(".mm"), { rotation: 276, svgOrigin: "350 350" });
      tl.fromTo(q(".reloj"), { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".sh"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
      // las agujas vuelven para atrás y se pinta el tiempo que vuelve
      tl.to(q(".mm"), { rotation: -360, svgOrigin: "350 350", duration: 1.3, ease: "power2.inOut" }, 0.45);
      tl.to(q(".hh"), { rotation: 60, svgOrigin: "350 350", duration: 1.3, ease: "power2.inOut" }, 0.45);
      tl.to(q(".sec"), { strokeDashoffset: ${r2(CIRC * 0.25)}, duration: 1.3, ease: "power2.inOut" }, 0.45);
      pop(".tv", 1.1);
      salida(1.76);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.24 }, { t: 0.45, sfx: "riser", vol: 0.2, max: 1.2 }, { t: 1.1, sfx: "sparkle", vol: 0.26 }],
});

// ================= s10 · CTA videollamada =================
escena("s10-cta", {
  css: `
    P .vc { position: absolute; left: 79px; top: 465px; width: 922px; height: 460px; border-radius: 70px; background: ${CR}; opacity: 0; }
    P .vc-lado { position: absolute; left: 95px; top: 481px; width: 922px; height: 460px; border-radius: 70px; background: #a9a798; opacity: 0; }
    P .vc-pan { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; border-radius: 56px; background: #111c30; overflow: hidden; }
    P .vc-a { position: absolute; left: 26px; top: 26px; width: 560px; height: 380px; border-radius: 34px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a .mini { position: absolute; left: 150px; top: 46px; width: 260px; height: 244px; }
    P .vc-a .mini svg { width: 260px; height: 244px; overflow: visible; }
    P .vc-a .lbl, P .vc-b .lbl { position: absolute; left: 22px; bottom: 20px; padding: 8px 16px; border-radius: 12px; background: rgba(11,18,32,0.8); font: 500 26px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 606px; top: 26px; width: 262px; height: 210px; border-radius: 30px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 66px; text-align: center; font: 800 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    P .vc-b .lbl { background: rgba(11,18,32,0.85); }
    P .vc-btn { position: absolute; left: 686px; top: 262px; width: 120px; height: 120px; border-radius: 50%; background: ${G}; }
    P .vc-btn svg { position: absolute; left: 26px; top: 34px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 1005px; text-align: center; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 1151px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 34px 16px; font: 800 124px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; width: auto; height: auto; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 1345px; text-align: center; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.03em; color: ${G}; opacity: 0; }`,
  html: `
      <div class="vc-lado"></div>
      <div class="vc"><div class="vc-pan">
        <div class="vc-a"><div class="mini">${remera}</div><div class="lbl">ALMA ROPA</div></div>
        <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
        <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
      </div></div>
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2"><div class="selbox sb">${esquinas}</div><em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>`,
  js: `
      tl.fromTo(qa(".vc, .vc-lado"), { opacity: 0, y: 60, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, 0);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.15);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.05);
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.48);
      caja(".sb", 0.62);
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 1.18);
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 9, immediateRender: false }, 1.6);
      tl.to(qa(".vc, .vc-lado"), { y: -14, duration: 2.0, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.6);
      tl.to(q(".vc-a .mini"), { rotation: -4, transformOrigin: "50% 0%", duration: 1.0, ease: "sine.inOut", yoyo: true, repeat: 3 }, 1.6);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.2 }, { t: 0.2, sfx: "pop", vol: 0.22 }, { t: 0.62, sfx: "click-soft", vol: 0.28 }, { t: 1.18, sfx: "chime", vol: 0.3 }],
});
console.log("escenas escritas:", Object.keys(ESC).join(", "));
