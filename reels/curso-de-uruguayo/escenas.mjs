// Escribe las escenas de compositions/ (html + sfx.json) para "Curso de uruguayo".
// Los tiempos salen de reel.json + assets/voice/palabras.json: T(i) = segundo de la palabra i
// relativo al inicio de la escena. Uso: node escenas.mjs [s01 s05 ...]  y después node armar.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";

const r2 = (n) => Math.round(n * 100) / 100;
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, P.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(P[i].start));
const ESC = reel.escenas.map(([id, i], k) => ({ id, a: ini(i), b: k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR }));

// ---------- paleta ----------
const C = { papel: "#f2e8cf", claro: "#f8f2e2", tinta: "#1f2b4d", rojo: "#d64532", mostaza: "#e3a92b", celeste: "#5b9bd5", verde: "#5ce611" };

// ---------- dibujos reutilizables (cada uno es un <svg> propio, posicionado en HTML) ----------
const S = 6; // trazo
const boca = (y = 50, w = 26) => `<path class="boca-c" d="M${-w} ${y} Q0 ${y + 16} ${w} ${y}" fill="none" stroke="${C.tinta}" stroke-width="${S}" stroke-linecap="round" />
  <path class="boca-a" d="M${-w + 2} ${y - 4} Q0 ${y - 6} ${w - 2} ${y - 4} Q${w - 6} ${y + 32} 0 ${y + 32} Q${-w + 6} ${y + 32} ${-w + 2} ${y - 4} Z" fill="${C.tinta}" opacity="0" />`;

// la profesora: rodete, lentes redondos, saco rojo, caravanas mostaza. viewBox centrado en la cabeza.
const profe = (cls, x, y, w, extra = "") => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 500) / 400}px" viewBox="-200 -150 400 500" overflow="visible">
  <path d="M-150 340 C-150 196 -100 124 0 124 C100 124 150 196 150 340 Z" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="${S}" stroke-linejoin="round" />
  <path d="M-52 128 L0 204 L52 128 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-60 196 V340 M60 196 V340" stroke="${C.tinta}" stroke-width="5" />
  <circle cx="-78" cy="240" r="8" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="3" /><circle cx="-78" cy="290" r="8" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="3" />
  <rect x="-26" y="72" width="52" height="58" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" />
  <circle cx="0" cy="-100" r="38" fill="${C.tinta}" />
  <circle cx="0" cy="0" r="88" fill="${C.claro}" stroke="${C.tinta}" stroke-width="${S}" />
  <path d="M-90 -2 C-96 -84 -44 -100 0 -100 C44 -100 96 -84 90 -2 C74 -40 36 -56 -4 -54 C-42 -52 -72 -34 -90 -2 Z" fill="${C.tinta}" />
  <circle cx="-88" cy="34" r="10" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="4" /><circle cx="88" cy="34" r="10" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="4" />
  <g class="cejas"><path d="M-54 -26 L-16 -30" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" /><path d="M16 -30 L54 -26" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" /></g>
  <circle cx="-35" cy="10" r="25" fill="none" stroke="${C.tinta}" stroke-width="5" /><circle cx="35" cy="10" r="25" fill="none" stroke="${C.tinta}" stroke-width="5" /><path d="M-10 8 Q0 2 10 8" fill="none" stroke="${C.tinta}" stroke-width="5" />
  <circle class="ojo" cx="-35" cy="12" r="7" fill="${C.tinta}" /><circle class="ojo" cx="35" cy="12" r="7" fill="${C.tinta}" />
  ${boca(52, 24)}
  ${extra}
</svg>`;
// el puntero de la profe (para pasar en extra): de la mano hacia (px, py)
const puntero = (px, py) => `<path d="M118 230 L${px} ${py}" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" /><circle cx="${px}" cy="${py}" r="9" fill="${C.rojo}" /><circle cx="118" cy="230" r="24" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" />`;

// el alumno: pelo parado, auriculares de walkman mostaza, buzo celeste.
const alumno = (cls, x, y, w, extra = "") => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 500) / 400}px" viewBox="-200 -150 400 500" overflow="visible">
  <path d="M-146 340 C-146 196 -96 126 0 126 C96 126 146 196 146 340 Z" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="${S}" stroke-linejoin="round" />
  <path d="M-46 130 Q0 176 46 130" fill="none" stroke="${C.tinta}" stroke-width="5" />
  <rect x="-26" y="74" width="52" height="58" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" />
  <circle cx="0" cy="0" r="84" fill="${C.claro}" stroke="${C.tinta}" stroke-width="${S}" />
  <path d="M-86 -8 C-94 -70 -56 -98 -14 -98 L-4 -124 L16 -98 L40 -116 L46 -92 C82 -84 96 -50 86 -8 C72 -40 40 -58 0 -56 C-40 -56 -68 -38 -86 -8 Z" fill="${C.tinta}" stroke="${C.tinta}" stroke-width="4" stroke-linejoin="round" />
  <path d="M-96 12 C-104 -128 104 -128 96 12" fill="none" stroke="${C.mostaza}" stroke-width="16" stroke-linecap="round" />
  <rect x="-116" y="-8" width="38" height="62" rx="14" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" /><rect x="78" y="-8" width="38" height="62" rx="14" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" />
  <g class="cejas"><path d="M-50 -26 L-14 -22" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" /><path d="M14 -22 L50 -26" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" /></g>
  <circle class="ojo" cx="-30" cy="8" r="10" fill="${C.tinta}" /><circle class="ojo" cx="30" cy="8" r="10" fill="${C.tinta}" />
  ${boca(46, 26)}
  ${extra}
</svg>`;

// el comerciante: pelado con costados, bigote, camisa clara y delantal mostaza.
const comerciante = (cls, x, y, w, extra = "") => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 500) / 400}px" viewBox="-200 -150 400 500" overflow="visible">
  <path d="M-156 340 C-156 196 -104 126 0 126 C104 126 156 196 156 340 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="${S}" stroke-linejoin="round" />
  <path d="M-90 340 V196 Q0 172 90 196 V340 Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-90 200 L-60 132 M90 200 L60 132" stroke="${C.tinta}" stroke-width="5" />
  <rect x="-28" y="74" width="56" height="58" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" />
  <circle cx="0" cy="0" r="90" fill="${C.claro}" stroke="${C.tinta}" stroke-width="${S}" />
  <path d="M-90 10 C-96 -30 -84 -50 -70 -56 L-62 -10 Z M90 10 C96 -30 84 -50 70 -56 L62 -10 Z" fill="${C.tinta}" />
  <g class="cejas"><path d="M-56 -24 L-18 -20" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" /><path d="M18 -20 L56 -24" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" /></g>
  <circle class="ojo" cx="-34" cy="6" r="9" fill="${C.tinta}" /><circle class="ojo" cx="34" cy="6" r="9" fill="${C.tinta}" />
  <path d="M-48 40 Q-24 26 0 36 Q24 26 48 40 Q24 52 0 44 Q-24 52 -48 40 Z" fill="${C.tinta}" />
  ${boca(62, 20)}
  ${extra}
</svg>`;

// el agente de IA: un globo de chat mostaza con ojos, sonrisa y vincha con micrófono.
const agente = (cls, x, y, w) => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 320) / 400}px" viewBox="-200 -170 400 320" overflow="visible">
  <path d="M-150 -110 Q-150 -140 -120 -140 H120 Q150 -140 150 -110 V40 Q150 70 120 70 H-30 L-90 130 L-80 70 H-120 Q-150 70 -150 40 Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="8" stroke-linejoin="round" />
  <path d="M-168 -20 C-170 -190 170 -190 168 -20" fill="none" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" />
  <rect x="-186" y="-50" width="36" height="66" rx="14" fill="${C.tinta}" /><rect x="150" y="-50" width="36" height="66" rx="14" fill="${C.tinta}" />
  <path d="M168 10 Q170 70 100 76" fill="none" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" /><circle cx="96" cy="76" r="11" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="4" />
  <ellipse class="ojo" cx="-48" cy="-50" rx="16" ry="22" fill="${C.tinta}" /><ellipse class="ojo" cx="48" cy="-50" rx="16" ry="22" fill="${C.tinta}" />
  <circle cx="-42" cy="-58" r="5" fill="${C.claro}" /><circle cx="54" cy="-58" r="5" fill="${C.claro}" />
  <path class="boca-c" d="M-44 2 Q0 36 44 2" fill="none" stroke="${C.tinta}" stroke-width="8" stroke-linecap="round" />
  <path class="boca-a" d="M-42 -2 Q0 -6 42 -2 Q36 44 0 44 Q-36 44 -42 -2 Z" fill="${C.tinta}" opacity="0" />
</svg>`;

// el casete: carcasa azul marino, etiqueta crema con franja roja, dos bobinas que giran.
const bobina = (cx) => `<g transform="translate(${cx} -32)"><g class="bobina"><circle r="34" fill="${C.claro}" stroke="${C.tinta}" stroke-width="4" /><circle r="13" fill="${C.tinta}" />${[0, 60, 120, 180, 240, 300].map((a) => `<rect x="-4" y="-27" width="8" height="12" fill="${C.tinta}" transform="rotate(${a})" />`).join("")}</g></g>`;
const casete = (cls, x, y, w, lado = "A", titulo = "LECCIÓN 1") => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 340) / 540}px" viewBox="-270 -170 540 340" overflow="visible">
  <rect x="-262" y="-162" width="524" height="324" rx="26" fill="${C.tinta}" stroke="${C.tinta}" stroke-width="6" />
  <rect x="-232" y="-138" width="464" height="176" rx="12" fill="${C.papel}" />
  <rect x="-232" y="-138" width="464" height="38" fill="${C.rojo}" />
  <text x="-214" y="-110" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${C.papel}">CURSO EN CASETE</text>
  <text class="lado-a" x="214" y="-110" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${C.papel}" ${lado === "A" ? "" : 'opacity="0"'}>LADO A</text>
  <text class="lado-b" x="214" y="-110" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${C.papel}" ${lado === "B" ? "" : 'opacity="0"'}>LADO B</text>
  <rect x="-160" y="-76" width="320" height="88" rx="44" fill="${C.tinta}" />
  <path d="M-95 2 H95" stroke="#6b4e2e" stroke-width="10" />
  ${bobina(-95)}${bobina(95)}
  <text x="0" y="30" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="22" fill="${C.tinta}">${titulo}</text>
  <path d="M-176 162 L-146 92 H146 L176 162" fill="#2c3b66" stroke="${C.papel}" stroke-width="4" stroke-linejoin="round" />
  <circle cx="-90" cy="128" r="10" fill="${C.papel}" /><circle cx="90" cy="128" r="10" fill="${C.papel}" />
  <circle cx="-240" cy="-148" r="7" fill="${C.papel}" opacity="0.7" /><circle cx="240" cy="-148" r="7" fill="${C.papel}" opacity="0.7" /><circle cx="-240" cy="148" r="7" fill="${C.papel}" opacity="0.7" /><circle cx="240" cy="148" r="7" fill="${C.papel}" opacity="0.7" />
</svg>`;

// banderita inventada de "Uruguayo comerciante": cuatro franjas y un mate en el cantón.
const bandera = (cls, x, y, w) => `<svg class="ab ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${(w * 200) / 250}px" viewBox="-20 -20 250 200" overflow="visible">
  <path d="M0 -10 V176" stroke="${C.tinta}" stroke-width="8" stroke-linecap="round" />
  <g class="tela"><rect x="4" y="0" width="200" height="132" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" />
  ${[0, 1, 2, 3].map((k) => `<rect x="4" y="${16 + k * 33}" width="200" height="16" fill="${C.tinta}" />`).join("")}
  <rect x="4" y="0" width="80" height="66" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" />
  <path d="M28 22 Q24 52 44 56 Q64 52 60 22 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="4" stroke-linejoin="round" /><path d="M48 26 L62 6" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" /></g>
</svg>`;

// tilde de "bien" (svg chico, para chips)
const tilde = (col = C.tinta) => `<svg width="40" height="40" viewBox="0 0 40 40" style="display:inline-block;vertical-align:-6px;margin-right:12px"><path d="M6 21 L16 31 L34 9" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

// ---------- CSS y JS comunes ----------
const css = (id) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    $ .capa { position: absolute; inset: 0; }
    $ .esc { position: absolute; inset: 0; }
    $ svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    $ .ab { position: absolute; }
    $ .titulo { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; color: ${C.tinta}; }
    $ .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.16em; color: ${C.tinta}; }
    $ .manus { position: absolute; font-family: "Caveat", cursive; font-weight: 700; white-space: nowrap; line-height: 1; color: ${C.rojo}; }
    $ .pill { position: absolute; padding: 12px 24px 10px; border-radius: 10px; background: ${C.tinta}; color: ${C.papel}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.16em; text-transform: uppercase; white-space: nowrap; line-height: 1.1; }
    $ .pill.roja { background: ${C.rojo}; }
    $ .pill.mostaza { background: ${C.mostaza}; color: ${C.tinta}; }
    $ .sello { position: absolute; padding: 12px 26px 8px; border: 8px solid ${C.rojo}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; color: ${C.rojo}; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.03em; line-height: 1; background: rgba(248, 242, 226, 0.88); }
    $ .caja { position: absolute; background: ${C.claro}; border: 6px solid ${C.tinta}; border-radius: 6px; box-shadow: 12px 12px 0 ${C.tinta}; }
    $ .caja .cab { position: absolute; left: 0; right: 0; top: 0; height: 58px; background: ${C.tinta}; color: ${C.papel}; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; line-height: 58px; padding-left: 26px; text-transform: uppercase; }
    $ .caja .cab.roja { background: ${C.rojo}; }
    $ .frase { position: absolute; font-family: "Lexend", sans-serif; font-weight: 800; color: ${C.tinta}; line-height: 1.1; white-space: nowrap; }
    $ .fon { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; color: ${C.tinta}; opacity: 0.7; white-space: nowrap; letter-spacing: 0.04em; }
    $ .globo { position: absolute; padding: 22px 30px 20px; background: ${C.claro}; border: 6px solid ${C.tinta}; border-radius: 36px; font-family: "Lexend", sans-serif; font-weight: 700; color: ${C.tinta}; line-height: 1.15; }
    $ .resalta { position: absolute; background: ${C.mostaza}; border-radius: 4px; }
    $ .chip { position: absolute; padding: 14px 26px 12px 18px; background: ${C.claro}; border: 5px solid ${C.tinta}; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: ${C.tinta}; text-transform: uppercase; white-space: nowrap; line-height: 1; box-shadow: 8px 8px 0 ${C.tinta}; }
`.replaceAll("$ ", `[data-composition-id="${id}"] `);

const helpers = `
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const els = (s) => (typeof s === "string" ? qa(s) : [].concat(s));
      const tl = gsap.timeline({ paused: true });
      // un trazo que se dibuja (opacity 0 hasta que arranca: nada de puntitos de los caps)
      const dibujar = (s, t, d) => els(s).forEach((el) => {
        const L = el.getTotalLength() + 2;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: d || 0.5, ease: "power2.inOut" }, t);
      });
      // aparece entero con rebote (rot: rotación final fija)
      const pop = (s, t, de, rot) => els(s).forEach((el) => {
        gsap.set(el, { opacity: 0, rotation: rot || 0 });
        tl.fromTo(el, Object.assign({ opacity: 0, scale: 0.6 }, de || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, t);
      });
      // cae de golpe como un sello o una palabra gigante
      const golpe = (s, t, esc, rot) => els(s).forEach((el) => {
        gsap.set(el, { opacity: 0, rotation: rot || 0 });
        tl.fromTo(el, { opacity: 0, scale: esc || 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08);
      });
      const sacudon = (t, f) => {
        f = f || 1;
        [[-16 * f, 9 * f], [12 * f, -7 * f], [-6 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(q(".esc"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      };
      // se escribe de izquierda a derecha
      const escribir = (s, t, d) => els(s).forEach((el) => {
        gsap.set(el, { clipPath: "inset(-30% 100% -30% -5%)" });
        tl.to(el, { clipPath: "inset(-30% 0% -30% -5%)", duration: d || 0.5, ease: "none" }, t);
      });
      const fuera = (s, t, d) => tl.to(els(s), { opacity: 0, scale: 0.9, duration: d || 0.2, ease: "power2.in" }, t);
      // boca que se mueve mientras habla (patrón fijo, determinista)
      const PASOS = [0.11, 0.15, 0.12, 0.17, 0.1, 0.14];
      const hablar = (raiz, t0, t1) => {
        const a = qa(raiz + " .boca-a"), c = qa(raiz + " .boca-c");
        let t = t0, k = 0, abierta = false;
        while (t < t1) { abierta = !abierta; tl.set(a, { opacity: abierta ? 1 : 0 }, t); tl.set(c, { opacity: abierta ? 0 : 1 }, t); t += PASOS[k++ % PASOS.length]; }
        tl.set(a, { opacity: 0 }, t1); tl.set(c, { opacity: 1 }, t1);
      };
      const parpadeo = (raiz, t) => qa(raiz + " .ojo").forEach((o) => {
        tl.to(o, { scaleY: 0.12, transformOrigin: "50% 50%", duration: 0.06, yoyo: true, repeat: 1, ease: "none" }, t);
      });
      // bobinas del casete girando de t0 a t1
      const girar = (raiz, t0, t1, vel) => qa(raiz + " .bobina").forEach((b) => {
        tl.to(b, { rotation: "+=" + Math.round((t1 - t0) * (vel || 300)), transformOrigin: "50% 50%", duration: t1 - t0, ease: "none" }, t0);
      });
      // vaivén suave para que nada quede quieto
      const flotar = (s, t0, t1, amp) => els(s).forEach((el) => {
        const n = Math.max(1, Math.floor((t1 - t0) / 0.9));
        tl.to(el, { y: "-=" + (amp || 8), duration: (t1 - t0) / (n * 2), yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t0);
      });
`;

function componer(id, dur, { html, js }) {
  return `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${css(id)}  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id.slice(0, 3)}-escena" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="esc">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
${helpers}
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
}
const salida = (id) => `      tl.to(q("#${id.slice(0, 3)}-escena"), { opacity: 0, filter: "blur(8px)", y: -40, duration: 0.22, ease: "power3.in" }, DUR - 0.22);`;

// ---------- escenas ----------
const E = {};

E["s01-leccion"] = (T, D) => ({
  html: `
        <div class="resalta s01-res" style="left:60px;top:640px;width:560px;height:44px"></div>
        <div class="titulo s01-tit" style="left:72px;top:566px;font-size:128px">Lección 1</div>
        <div class="mono s01-sub" style="left:78px;top:712px;font-size:28px">Uruguayo comerciante · nivel 1</div>
        ${bandera("s01-band", 800, 560, 220)}
        ${profe("s01-profe", 300, 770, 400, puntero(300, 330))}
        ${alumno("s01-alu", 340, 790, 380)}
        <div class="pill roja s01-repita" style="left:96px;top:880px">Repita</div>
        <div class="caja s01-caja" style="left:90px;top:1230px;width:880px;height:270px"><div class="cab">Vocabulario</div>
          <div class="frase s01-frase" style="left:32px;top:84px;font-size:66px">«Después te contesto»</div>
          <div class="fon s01-fon" style="left:34px;top:184px;font-size:32px">[des·PUÉS te con·TES·to]</div>
        </div>`,

  js: `
      // cuadro 0: la hoja ya está, la profe aparece a medio pop
      tl.fromTo(qa(".s01-tit, .s01-res"), { scale: 1.12, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", transformOrigin: "0% 50%" }, 0);
      tl.fromTo(q(".s01-res"), { scaleX: 0.3 }, { scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "0% 50%" }, 0);
      tl.fromTo(q(".s01-profe"), { y: 60, scale: 0.92, opacity: 0.9 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }, 0);
      pop(".s01-band", 0.25, { x: 40 });
      tl.to(q(".s01-band .tela"), { skewY: 4, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut", transformOrigin: "0% 50%" }, 0.4);
      escribir(".s01-sub", ${T(3)} - 0.3, 0.6);
      hablar(".s01-profe", 0.02, ${T(10)} - 0.2);
      parpadeo(".s01-profe", 1.3);
      tl.to(q(".s01-profe .cejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, ${T(5)});
      pop(".s01-repita", ${T(5)}, { x: -30 }, -5);

      // la tarjeta de vocabulario entra y se escribe la frase
      pop(".s01-caja", ${T(7)} - 0.35, { y: 60 });
      escribir(".s01-frase", ${T(7)}, ${T(9)} + 0.4 - ${T(7)});
      escribir(".s01-fon", ${T(9)} + 0.1, 0.5);
      // corte: sale la profe, entra el alumno a repetir
      tl.to(qa(".s01-profe"), { x: -760, duration: 0.3, ease: "power3.in" }, ${T(10)} - 0.32);
      tl.to(qa(".s01-repita"), { opacity: 0, duration: 0.2 }, ${T(10)} - 0.3);
      tl.fromTo(q(".s01-alu"), { x: 760 }, { x: 0, duration: 0.32, ease: "power3.out", immediateRender: true }, ${T(10)} - 0.12);
      hablar(".s01-alu", ${T(10)}, ${D} - 0.3);
      tl.to(q(".s01-frase"), { color: "${C.rojo}", duration: 0.1, yoyo: true, repeat: 3 }, ${T(10)});
${salida("s01")}`,
  sfx: [[0, "click", 0.35], [0.1, "pop", 0.3], ["T5", "ping", 0.3], ["T7-0.3", "pop", 0.3], ["T7", "typing", 0.25, 0.9], ["T10-0.3", "whoosh-short", 0.25], ["T10", "pop", 0.3]],
});

E["s02-nunca"] = (T, D) => ({
  html: `
        <div class="caja s02-dic" style="left:90px;top:590px;width:900px;height:330px"><div class="cab">Diccionario</div>
          <div class="frase" style="left:32px;top:88px;font-size:62px">después te contesto</div>
          <div class="fon" style="left:34px;top:180px;font-size:28px">loc. de comerciante · uso diario</div>
          <div class="manus s02-bien" style="left:600px;top:226px;font-size:76px">¡Muy bien!</div>
        </div>
        <svg class="full">
          <path class="s02-tic" d="M820 650 L860 700 L960 560" fill="none" stroke="${C.rojo}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
          <path class="s02-flecha" d="M540 950 V1060 M500 1020 L540 1062 L580 1020" fill="none" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s02-reloj"><path d="M870 1330 H970 L920 1400 L970 1470 H870 L920 1400 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="6" stroke-linejoin="round" /><path d="M895 1462 H945 L920 1430 Z" fill="${C.mostaza}" /></g>
        </svg>
        <div class="mono s02-sig" style="left:610px;top:980px;font-size:32px">Significa</div>
        <div class="titulo s02-nunca" style="left:0;width:1080px;text-align:center;top:1110px;font-size:230px;color:${C.rojo}">Nunca.</div>`,
  js: `
      pop(".s02-dic", 0, { y: 40 });
      dibujar(".s02-tic", ${T(13)}, 0.35);
      golpe(".s02-bien", ${T(14)} + 0.05, 1.8, -6);
      pop(".s02-sig", ${T(15)} - 0.05, { x: -20 });
      dibujar(".s02-flecha", ${T(15)}, 0.45);
      pop(".s02-reloj", ${T(15)} + 0.2);
      golpe(".s02-nunca", ${T(16)}, 2.6, -3);
      sacudon(${T(16)} + 0.06, 1.3);
      tl.to(q(".s02-reloj"), { rotation: 180, transformOrigin: "50% 50%", duration: 0.5, ease: "back.inOut(1.6)" }, ${T(16)} + 0.2);
      tl.to(q(".s02-nunca"), { scale: 1.05, duration: 0.6, ease: "sine.inOut" }, ${T(16)} + 0.15);
${salida("s02")}`,
  sfx: [[0.05, "pop", 0.3], ["T13", "key-press", 0.3], ["T14", "pop", 0.3], ["T15", "click-soft", 0.3], ["T16-0.06", "impact-bass-1", 0.45, 0.7]],
});

E["s03-lunes"] = (T, D) => ({
  html: `
        <div class="pill s03-frase" style="left:72px;top:570px">Frase 2</div>
        <svg class="ab s03-cal" style="left:270px;top:650px;width:540px;height:470px" viewBox="0 0 540 470" overflow="visible">
          <rect x="20" y="40" width="500" height="420" rx="18" fill="${C.claro}" stroke="${C.tinta}" stroke-width="7" />
          <path d="M20 58 Q20 40 38 40 H502 Q520 40 520 58 V150 H20 Z" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="7" stroke-linejoin="round" />
          ${[110, 220, 320, 430].map((x) => `<rect x="${x - 10}" y="10" width="20" height="62" rx="10" fill="${C.tinta}" />`).join("")}
          <text x="270" y="122" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="40" letter-spacing="8" fill="${C.papel}">PRÓXIMO</text>
          <text class="s03-lunes" x="270" y="330" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="128" fill="${C.tinta}">LUNES</text>
          <path class="s03-sub" d="M110 372 Q270 350 430 372" fill="none" stroke="${C.mostaza}" stroke-width="12" stroke-linecap="round" />
        </svg>
        ${alumno("s03-alu", 110, 1140, 300)}
        <div class="globo s03-glo" style="left:420px;top:1220px;font-size:58px">«Pasá el lunes.»</div>`,
  js: `
      pop(".s03-frase", 0.02, { x: -30 });
      pop(".s03-cal", 0.1, { y: 50 });
      tl.fromTo(q(".s03-lunes"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)" }, ${T(20)});
      dibujar(".s03-sub", ${T(22)}, 0.35);
      tl.to(q(".s03-cal"), { rotation: -3, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${T(22)} + 0.1);
      tl.fromTo(q(".s03-alu"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.5)", immediateRender: true }, ${T(23)} - 0.4);
      pop(".s03-glo", ${T(23)} - 0.05, { x: -40 });
      hablar(".s03-alu", ${T(23)}, ${D} - 0.25);
      parpadeo(".s03-alu", ${T(23)} + 0.5);
${salida("s03")}`,
  sfx: [[0.05, "pop", 0.3], ["T20", "impact-bass-2", 0.35, 0.5], ["T22", "click", 0.25], ["T23-0.3", "pop", 0.3]],
});

E["s04-traduccion"] = (T, D) => ({
  html: `
        <div class="sello s04-sello" style="left:250px;top:572px;font-size:76px">Traducción</div>
        <div class="caja s04-a" style="left:90px;top:740px;width:900px;height:170px"><div class="mono" style="left:30px;top:20px;font-size:28px;opacity:0.6">Dice</div>
          <div class="frase" style="left:30px;top:66px;font-size:62px">«Pasá el lunes»</div></div>
        <svg class="full"><path class="s04-fl" d="M540 940 V1010 M505 978 L540 1012 L575 978" fill="none" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <div class="caja s04-b" style="left:90px;top:1040px;width:900px;height:180px"><div class="cab roja">Significa</div>
          <div class="frase s04-txt" style="left:30px;top:80px;font-size:66px;color:${C.rojo}">No te voy a atender.</div></div>
        <div class="manus s04-ni" style="left:150px;top:1290px;font-size:120px">Ni el lunes.</div>
        <svg class="ab s04-mini" style="left:720px;top:1270px;width:220px;height:200px" viewBox="0 0 220 200" overflow="visible">
          <rect x="10" y="20" width="200" height="170" rx="10" fill="${C.claro}" stroke="${C.tinta}" stroke-width="6" />
          <rect x="10" y="20" width="200" height="50" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="6" />
          <text x="110" y="148" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="48" fill="${C.tinta}">LUNES</text>
          <path class="s04-x" d="M20 30 L200 180 M200 30 L20 180" fill="none" stroke="${C.rojo}" stroke-width="14" stroke-linecap="round" />
        </svg>`,
  js: `
      golpe(".s04-sello", 0.12, 2.2, -4);
      sacudon(0.14, 0.8);
      pop(".s04-a", 0.25, { y: 30 });
      dibujar(".s04-fl", 0.6, 0.3);
      pop(".s04-b", 0.8, { y: 30 });
      escribir(".s04-txt", ${T(27)} - 0.05, ${T(31)} + 0.5 - ${T(27)});
      golpe(".s04-ni", ${T(32)}, 1.8, -5);
      pop(".s04-mini", ${T(33)});
      dibujar(".s04-x", ${T(34)}, 0.3);
      sacudon(${T(34)} + 0.3, 1.1);
      tl.to(q(".s04-ni"), { rotation: -2, duration: 0.6, ease: "sine.inOut" }, ${T(32)} + 0.2);
${salida("s04")}`,
  sfx: [[0.04, "impact-bass-1", 0.4, 0.6], [0.8, "pop", 0.25], ["T27", "typing", 0.22, 0.8], ["T32", "pop", 0.3], ["T34", "error", 0.0, 0.01], ["T34+0.25", "glitch-1", 0.3, 0.4]],
});

E["s05-visto"] = (T, D) => ({
  html: `
        <div class="globo s05-msg" style="left:90px;top:590px;font-size:50px;border-bottom-left-radius:8px">Hola, ¿cuánto sale?<div class="mono" style="position:relative;display:block;text-align:right;font-size:28px;margin-top:8px;opacity:0.6">21:04</div></div>
        <div class="pill roja s05-pill" style="left:700px;top:640px">El visto</div>
        <svg class="full">
          <path class="s05-t1" d="M250 960 L360 1070 L560 830" fill="none" stroke="${C.celeste}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
          <path class="s05-t2" d="M450 1010 L520 1070 L760 830" fill="none" stroke="${C.celeste}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="mono s05-lab" style="left:0;width:1080px;text-align:center;top:1110px;font-size:30px">Dos tildes azules</div>
        <div class="caja s05-caja" style="left:90px;top:1190px;width:900px;height:300px"><div class="cab roja">Significa</div>
          <div class="frase s05-leí" style="left:36px;top:96px;font-size:84px">«Lo leí.</div>
          <div class="titulo s05-no" style="left:400px;top:96px;font-size:128px;color:${C.rojo}">Y no.»</div></div>`,
  js: `
      pop(".s05-msg", 0, { y: 30 });
      pop(".s05-pill", ${T(36)}, { x: 30 }, 4);
      dibujar(".s05-t1", ${T(37)}, 0.25);
      dibujar(".s05-t2", ${T(38)}, 0.25);
      sacudon(${T(39)}, 0.8);
      escribir(".s05-lab", ${T(39)}, 0.4);
      tl.to(qa(".s05-t1, .s05-t2"), { y: -12, duration: 0.45, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${T(39)} + 0.3);
      pop(".s05-caja", ${T(40)} - 0.1, { y: 40 });
      escribir(".s05-leí", ${T(41)} - 0.05, 0.35);
      golpe(".s05-no", ${T(44)}, 2.4, -4);
      sacudon(${T(44)} + 0.06, 1.3);
${salida("s05")}`,
  sfx: [[0.02, "notification", 0.3], ["T36", "pop", 0.3], ["T37", "click", 0.3], ["T38", "click", 0.3], ["T40", "pop", 0.25], ["T44-0.06", "impact-bass-2", 0.45, 0.7]],
});

E["s06-a-que-hora"] = (T, D) => ({
  html: `
        <div class="pill mostaza s06-pill" style="left:72px;top:570px">Pregunta del alumno</div>
        ${alumno("s06-alu", 90, 900, 470, `<path class="s06-brazo" d="M120 190 Q190 60 170 -120" fill="none" stroke="${C.tinta}" stroke-width="40" stroke-linecap="round" /><path d="M120 190 Q190 60 170 -120" fill="none" stroke="${C.celeste}" stroke-width="28" stroke-linecap="round" /><circle cx="170" cy="-140" r="30" fill="${C.claro}" stroke="${C.tinta}" stroke-width="6" />`)}
        <div class="globo s06-glo" style="left:470px;top:700px;width:530px;font-size:62px;border-bottom-left-radius:8px"><span class="s06-txt" style="display:inline-block">¿A qué hora abren?</span></div>
        <svg class="ab s06-reloj" style="left:720px;top:1150px;width:260px;height:260px" viewBox="-130 -130 260 260" overflow="visible">
          <circle r="110" fill="${C.claro}" stroke="${C.tinta}" stroke-width="8" />
          ${[0, 90, 180, 270].map((a) => `<rect x="-4" y="-100" width="8" height="20" fill="${C.tinta}" transform="rotate(${a})" />`).join("")}
          <path class="s06-aguja" d="M0 0 V-70" stroke="${C.rojo}" stroke-width="10" stroke-linecap="round" /><path d="M0 0 H50" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" />
          <text x="0" y="62" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="56" fill="${C.rojo}">?</text>
        </svg>`,
  js: `
      pop(".s06-pill", 0.02, { x: -30 });
      tl.fromTo(q(".s06-alu"), { y: 300, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.to(q(".s06-alu"), { rotation: -3, transformOrigin: "50% 100%", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.4);
      hablar(".s06-alu", 0.05, ${D} - 0.3);
      pop(".s06-glo", ${T(46)} - 0.25, { x: -40 });
      escribir(".s06-txt", ${T(46)}, ${T(51)} + 0.35 - ${T(46)});
      pop(".s06-reloj", ${T(50)} - 0.1);
      tl.to(q(".s06-aguja"), { rotation: 720, transformOrigin: "50% 100%", duration: 0.9, ease: "power2.inOut" }, ${T(50)});
${salida("s06")}`,
  sfx: [[0.02, "pop", 0.3], ["T46-0.2", "pop", 0.25], ["T46", "typing", 0.22, 0.9], ["T50", "ping", 0.25]],
});

E["s07-manana"] = (T, D) => ({
  html: `
        <div class="pill s07-pill" style="left:72px;top:570px">Conjugación</div>
        <div class="manus s07-verbo" style="left:420px;top:560px;font-size:70px">verbo: atender</div>
        <div class="caja s07-tabla" style="left:90px;top:680px;width:900px;height:380px">
          <div class="chip" style="left:28px;top:44px;box-shadow:none;background:${C.mostaza}">Hoy</div>
          <div class="frase s07-f1" style="left:300px;top:50px;font-size:58px">se pregunta.</div>
          <div style="position:absolute;left:0;right:0;top:184px;height:6px;background:${C.tinta};opacity:0.25"></div>
          <div class="chip" style="left:28px;top:226px;box-shadow:none;background:${C.mostaza}">Mañana</div>
          <div class="frase s07-f2" style="left:300px;top:232px;font-size:58px">se contesta.</div>
        </div>
        <svg class="full">
          <path d="M260 1130 H820 L860 1200 H220 Z" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="7" stroke-linejoin="round" />
          ${[0, 1, 2, 3].map((k) => `<path d="M${330 + k * 140} 1130 L${310 + k * 150} 1200 H${370 + k * 150} L${380 + k * 140} 1130 Z" fill="${C.claro}" />`).join("")}
          <rect x="250" y="1200" width="580" height="290" fill="${C.claro}" stroke="${C.tinta}" stroke-width="7" />
          <g class="s07-pers">
            <rect x="262" y="1210" width="556" height="270" fill="#2c3b66" />
            ${Array.from({ length: 9 }, (_, k) => `<path d="M262 ${1236 + k * 28} H818" stroke="${C.papel}" stroke-width="4" opacity="0.5" />`).join("")}
          </g>
        </svg>
        <div class="sello s07-cerrado" style="left:330px;top:1270px;font-size:84px">Cerrado</div>`,
  js: `
      pop(".s07-pill", 0.02, { x: -30 });
      escribir(".s07-verbo", 0.2, 0.5);
      pop(".s07-tabla", 0.05, { y: 40 });
      escribir(".s07-f1", ${T(53)}, ${T(54)} + 0.35 - ${T(53)});
      escribir(".s07-f2", ${T(56)}, ${T(57)} + 0.4 - ${T(56)});
      tl.fromTo(q(".s07-pers"), { scaleY: 0 }, { scaleY: 1, svgOrigin: "540 1210", duration: 0.45, ease: "bounce.out" }, ${T(58)});
      golpe(".s07-cerrado", ${T(60)} + 0.05, 2.2, -6);
      sacudon(${T(60)} + 0.1, 1.2);
${salida("s07")}`,
  sfx: [[0.05, "pop", 0.25], ["T53", "key-press", 0.25], ["T56", "key-press", 0.25], ["T58", "whoosh", 0.25, 0.6], ["T60", "impact-bass-1", 0.45, 0.6]],
});

E["s08-comprar"] = (T, D) => ({
  html: `
        ${alumno("s08-alu", 330, 700, 420, `<path class="s08-gota" d="M118 -60 Q100 -30 118 -18 Q136 -30 118 -60 Z" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="4" />`)}
        <svg data-layout-ignore class="ab s08-libro" style="left:90px;top:1180px;width:400px;height:300px" viewBox="0 0 400 300" overflow="visible">
          <rect x="20" y="20" width="360" height="260" rx="10" fill="${C.tinta}" stroke="${C.tinta}" stroke-width="6" />
          <rect x="44" y="20" width="12" height="260" fill="${C.papel}" opacity="0.5" />
          <text x="216" y="96" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" letter-spacing="3" fill="${C.papel}">APRENDA</text>
          <text x="216" y="146" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="${C.mostaza}">URUGUAYO</text>
          <text x="216" y="190" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="34" fill="${C.mostaza}">COMERCIANTE</text>
          <path class="s08-x" d="M30 30 L370 270 M370 30 L30 270" fill="none" stroke="${C.rojo}" stroke-width="18" stroke-linecap="round" />
        </svg>
        <svg class="ab s08-bolsa" style="left:600px;top:1140px;width:380px;height:360px" viewBox="0 0 380 360" overflow="visible">
          <path d="M130 120 Q130 40 190 40 Q250 40 250 120" fill="none" stroke="${C.tinta}" stroke-width="12" stroke-linecap="round" />
          <path d="M60 110 H320 L340 340 H40 Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="8" stroke-linejoin="round" />
          <path class="s08-cor" d="M190 290 C120 240 130 180 165 180 C180 180 190 192 190 204 C190 192 200 180 215 180 C250 180 260 240 190 290 Z" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="6" />
        </svg>
        <div class="titulo s08-comprar" style="left:680px;width:400px;text-align:center;top:1050px;font-size:52px;color:${C.rojo}">Comprar</div>`,
  js: `
      tl.fromTo(q(".s08-alu"), { scale: 1.08, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.to(q(".s08-alu .cejas"), { rotation: 0, y: -6, duration: 0.15 }, 0.1);
      hablar(".s08-alu", 0.03, ${T(70)} + 0.6);
      tl.to(q(".s08-alu"), { x: -14, duration: 0.07, yoyo: true, repeat: 7, ease: "none" }, 0.2);
      tl.fromTo(q(".s08-gota"), { y: 0, opacity: 0 }, { y: 70, opacity: 1, duration: 0.7, ease: "power1.in" }, 0.4);
      pop(".s08-libro", ${T(65)} - 0.1, { x: -40 }, -4);
      dibujar(".s08-x", ${T(67)}, 0.3);
      tl.to(q(".s08-libro"), { y: 30, rotation: -12, duration: 0.4, ease: "power2.in" }, ${T(67)} + 0.35);
      pop(".s08-bolsa", ${T(69)} - 0.1, { x: 40 }, 4);
      golpe(".s08-comprar", ${T(70)}, 2.2, 3);
      tl.fromTo(q(".s08-cor"), { scale: 0.6 }, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${T(70)} + 0.1);
      sacudon(${T(70)} + 0.08, 1);
${salida("s08")}`,
  sfx: [[0.05, "pop", 0.25], ["T65", "pop", 0.3], ["T67", "glitch-1", 0.3, 0.35], ["T69", "pop", 0.3], ["T70", "impact-bass-2", 0.4, 0.6]],
});

E["s09-lado-a"] = (T, D) => ({
  html: `
        ${casete("s09-cas", 110, 680, 860, "A", "LECCIÓN 1")}
        <div class="sello s09-sello" style="left:200px;top:1260px;font-size:72px">Fin del lado A</div>
        <svg class="full"><path class="s09-fl" d="M300 640 Q540 520 780 640 M745 600 L784 644 L730 664" fill="none" stroke="${C.rojo}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <div class="manus s09-vuelta" style="left:0;width:1080px;text-align:center;top:1420px;font-size:72px">dé vuelta el casete</div>`,
  js: `
      girar(".s09-cas", 0, 0.12, 900);
      tl.fromTo(q(".s09-cas"), { scale: 1.06 }, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      golpe(".s09-sello", ${T(73)}, 2.2, -5);
      sacudon(${T(73)} + 0.06, 1);
      escribir(".s09-vuelta", ${T(75)}, 0.6);
      dibujar(".s09-fl", ${T(76)}, 0.45);
      // el casete se da vuelta: aparece LADO B
      tl.to(q(".s09-sello"), { opacity: 0, duration: 0.15 }, ${T(78)} + 0.1);
      tl.to(q(".s09-cas"), { scaleX: 0, duration: 0.18, ease: "power2.in" }, ${T(78)} + 0.15);
      tl.set(q(".s09-cas .lado-a"), { opacity: 0 }, ${T(78)} + 0.33);
      tl.set(q(".s09-cas .lado-b"), { opacity: 1 }, ${T(78)} + 0.33);
      tl.to(q(".s09-cas"), { scaleX: 1, duration: 0.2, ease: "back.out(1.6)" }, ${T(78)} + 0.33);
      girar(".s09-cas", ${T(78)} + 0.7, ${D}, 260);
${salida("s09")}`,
  sfx: [[0.06, "click", 0.4], ["T73", "impact-bass-1", 0.4, 0.6], ["T76", "whoosh", 0.25, 0.6], ["T78+0.15", "click-soft", 0.35], ["T78+0.7", "click", 0.35]],
});

E["s10-lado-b"] = (T, D) => ({
  html: `
        <div class="resalta s10-res" style="left:60px;top:640px;width:400px;height:44px"></div>
        <div class="titulo s10-tit" style="left:72px;top:566px;font-size:128px">Lado B</div>
        <div class="frase s10-mal" style="left:560px;top:720px;font-size:56px;padding:10px 20px;border:5px solid ${C.tinta};background:${C.claro}">MALEDUCADO</div>
        <svg class="full"><path class="s10-tach" d="M560 760 L1000 742" stroke="${C.rojo}" stroke-width="14" stroke-linecap="round" /></svg>
        <div class="manus s10-no" style="left:470px;top:700px;font-size:80px">no</div>
        ${comerciante("s10-com", 330, 840, 420, `<path class="s10-gota" d="M-110 -40 Q-126 -10 -110 0 Q-94 -10 -110 -40 Z" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="4" /><path class="s10-gota2" d="M112 -60 Q96 -30 112 -20 Q128 -30 112 -60 Z" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="4" />`)}
        <div class="sello s10-solo" style="left:72px;top:780px;font-size:62px">Está solo</div>
        <svg class="ab s10-caja" style="left:110px;top:1140px;width:260px;height:200px" viewBox="0 0 260 200" overflow="visible">
          <path d="M30 70 H230 L250 190 H10 Z" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="7" stroke-linejoin="round" />
          <rect x="60" y="14" width="140" height="60" rx="8" fill="${C.claro}" stroke="${C.tinta}" stroke-width="6" />
          ${[0, 1, 2].map((k) => `<rect x="${58 + k * 50}" y="104" width="34" height="22" rx="4" fill="${C.claro}" stroke="${C.tinta}" stroke-width="4" /><rect x="${58 + k * 50}" y="140" width="34" height="22" rx="4" fill="${C.claro}" stroke="${C.tinta}" stroke-width="4" />`).join("")}
        </svg>
        <svg class="ab s10-cel" style="left:780px;top:1060px;width:160px;height:280px" viewBox="0 0 160 280" overflow="visible">
          <rect x="10" y="10" width="140" height="260" rx="22" fill="${C.tinta}" />
          <rect x="22" y="36" width="116" height="200" rx="8" fill="${C.claro}" />
          ${[0, 1, 2].map((k) => `<rect x="32" y="${52 + k * 58}" width="${k === 1 ? 70 : 92}" height="40" rx="12" fill="${C.celeste}" />`).join("")}
          <circle class="s10-badge" cx="146" cy="16" r="22" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="4" />
        </svg>
        <svg class="full"><path class="s10-vib" d="M760 1100 Q745 1130 760 1160 M960 1100 Q975 1130 960 1160" fill="none" stroke="${C.rojo}" stroke-width="6" stroke-linecap="round" /></svg>
        <svg class="ab s10-most" style="left:60px;top:1300px;width:960px;height:220px" viewBox="0 0 960 220" overflow="visible">
          <rect x="6" y="6" width="948" height="40" rx="6" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="7" />
          <rect x="30" y="46" width="900" height="168" fill="${C.claro}" stroke="${C.tinta}" stroke-width="7" />
          ${[0, 1, 2, 3].map((k) => `<path d="M${120 + k * 240} 70 V190" stroke="${C.tinta}" stroke-width="4" opacity="0.3" />`).join("")}
        </svg>
        <div class="pill s10-l1" style="left:390px;top:1410px">Mostrador</div>
        <div class="pill roja s10-l2" style="left:140px;top:1080px;font-size:28px">Caja</div>
        <div class="pill roja s10-l3" style="left:770px;top:1000px;font-size:28px">Celular</div>`,
  js: `
      tl.fromTo(qa(".s10-tit, .s10-res"), { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.6)", transformOrigin: "0% 50%" }, 0);
      tl.fromTo(q(".s10-res"), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out", transformOrigin: "0% 50%" }, 0.05);
      tl.fromTo(q(".s10-com"), { y: 520, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.3)", immediateRender: true }, ${T(81)} - 0.2);
      parpadeo(".s10-com", ${T(81)} + 0.8);
      pop(".s10-mal", ${T(83)}, { y: -30 }, 3);
      dibujar(".s10-tach", ${T(86)}, 0.3);
      golpe(".s10-no", ${T(86)} + 0.1, 1.8, -8);
      tl.to(qa(".s10-mal, .s10-tach, .s10-no"), { opacity: 0, y: -30, duration: 0.25 }, ${T(87)} + 0.3);
      golpe(".s10-solo", ${T(88)}, 2.2, -6);
      sacudon(${T(88)} + 0.06, 0.9);
      tl.to(q(".s10-com .cejas"), { y: 8, duration: 0.2 }, ${T(88)});
      tl.fromTo(q(".s10-most"), { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)", immediateRender: true }, ${T(91)} - 0.2);
      pop(".s10-l1", ${T(91)} + 0.1);
      pop(".s10-caja", ${T(93)} - 0.05, { y: 40 });
      pop(".s10-l2", ${T(93)} + 0.1, {}, -4);
      pop(".s10-cel", ${T(96)} - 0.1, { y: 40 });
      pop(".s10-l3", ${T(96)}, {}, 4);
      pop(".s10-badge", ${T(96)} + 0.2);
      dibujar(".s10-vib", ${T(96)} + 0.2, 0.2);
      tl.to(q(".s10-cel"), { rotation: 5, duration: 0.05, yoyo: true, repeat: 11, ease: "none" }, ${T(96)} + 0.25);
      tl.fromTo(qa(".s10-gota, .s10-gota2"), { y: 0, opacity: 0 }, { y: 60, opacity: 1, duration: 0.6, stagger: 0.25, ease: "power1.in" }, ${T(93)});
      tl.to(q(".s10-com"), { x: -10, duration: 0.06, yoyo: true, repeat: 9, ease: "none" }, ${T(96)} + 0.1);
${salida("s10")}`,
  sfx: [[0.03, "impact-bass-2", 0.35, 0.5], ["T81-0.2", "pop", 0.25], ["T83", "pop", 0.25], ["T86", "glitch-1", 0.25, 0.3], ["T88", "impact-bass-1", 0.35, 0.5], ["T91", "pop", 0.25], ["T93", "click", 0.3], ["T96+0.2", "notification", 0.35]],
});

E["s11-otro-idioma"] = (T, D) => ({
  html: `
        <svg class="ab s11-band" style="left:72px;top:580px;width:250px;height:200px" viewBox="-20 -20 250 200" overflow="visible">
          <path d="M0 -10 V176" stroke="${C.tinta}" stroke-width="8" stroke-linecap="round" />
          <g class="tela"><rect x="4" y="0" width="200" height="132" fill="${C.celeste}" stroke="${C.tinta}" stroke-width="5" />
          <rect x="4" y="44" width="200" height="44" fill="${C.claro}" />
          <path d="M70 30 H140 Q156 30 156 46 V82 Q156 98 140 98 H104 L84 116 L88 98 H70 Q54 98 54 82 V46 Q54 30 70 30 Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" /></g>
        </svg>
        <div class="mono s11-otro" style="left:350px;top:590px;font-size:30px">Otro idioma:</div>
        <div class="titulo s11-cli" style="left:350px;top:638px;font-size:76px;line-height:1.02">El del<br />cliente</div>
        <svg class="ab s11-cel" style="left:110px;top:830px;width:450px;height:690px" viewBox="0 0 450 690" overflow="visible">
          <rect x="6" y="6" width="438" height="678" rx="54" fill="${C.tinta}" />
          <rect x="26" y="70" width="398" height="590" rx="16" fill="${C.claro}" />
          <rect x="170" y="26" width="110" height="20" rx="10" fill="#2c3b66" />
          <rect x="26" y="70" width="398" height="70" fill="${C.celeste}" />
          <text x="50" y="116" font-family="Lexend" font-weight="700" font-size="28" fill="${C.tinta}">Tu local</text>
        </svg>
        <div class="globo s11-g1" style="left:150px;top:1000px;font-size:34px;padding:16px 22px;border-width:5px;border-radius:26px;border-bottom-left-radius:6px">¿Hasta qué hora<br />abren hoy?</div>
        <div class="globo s11-esc" style="left:300px;top:1150px;font-size:34px;padding:12px 22px;border-width:5px;border-radius:26px;background:${C.mostaza}"><span class="s11-p">•</span> <span class="s11-p">•</span> <span class="s11-p">•</span></div>
        <div class="globo s11-g2" style="left:190px;top:1150px;font-size:34px;padding:16px 22px;border-width:5px;border-radius:26px;border-bottom-right-radius:6px;background:${C.mostaza}">¡Hola! Hasta las 20.<br />¿Te guardo algo?</div>
        <div class="chip s11-toque" style="left:430px;top:900px;background:${C.mostaza}">Al toque</div>
        <svg class="ab s11-reloj" style="left:640px;top:930px;width:330px;height:330px" viewBox="-165 -165 330 330" overflow="visible">
          <circle r="140" fill="${C.claro}" stroke="${C.tinta}" stroke-width="9" />
          ${Array.from({ length: 12 }, (_, k) => `<rect x="-4" y="-128" width="8" height="${k % 3 ? 12 : 24}" fill="${C.tinta}" transform="rotate(${k * 30})" />`).join("")}
          <path class="s11-hora" d="M0 0 V-62" stroke="${C.tinta}" stroke-width="12" stroke-linecap="round" />
          <path class="s11-min" d="M0 0 V-100" stroke="${C.rojo}" stroke-width="8" stroke-linecap="round" />
          <circle r="12" fill="${C.tinta}" />
        </svg>
        <div class="mono s11-24" style="left:640px;width:330px;text-align:center;top:1270px;font-size:30px">24 horas</div>
        <div class="chip s11-c1" style="left:620px;top:1330px">${tilde(C.rojo)}Precios</div>
        <div class="chip s11-c2" style="left:620px;top:1430px">${tilde(C.rojo)}Horarios</div>`,
  js: `
      pop(".s11-band", 0.05, { x: -30 });
      tl.to(q(".s11-band .tela"), { skewY: 4, duration: 0.5, yoyo: true, repeat: 13, ease: "sine.inOut", transformOrigin: "0% 50%" }, 0.3);
      escribir(".s11-otro", ${T(103)} - 0.1, 0.4);
      pop(".s11-cli", ${T(105)}, { x: 30 });
      tl.to(q(".s11-cli"), { color: "${C.rojo}", duration: 0.12, yoyo: true, repeat: 1 }, ${T(107)});
      tl.fromTo(q(".s11-cel"), { y: 760, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.2)", immediateRender: true }, ${T(100)});
      pop(".s11-g1", ${T(108)}, { y: 20 });
      pop(".s11-esc", ${T(108)} + 0.35);
      tl.to(qa(".s11-p"), { y: -8, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: "sine.inOut" }, ${T(108)} + 0.45);
      tl.to(q(".s11-esc"), { opacity: 0, duration: 0.08 }, ${T(110)} - 0.12);
      pop(".s11-g2", ${T(110)} - 0.08, { y: 20 });
      golpe(".s11-toque", ${T(110)} + 0.05, 2, 6);
      sacudon(${T(110)} + 0.1, 0.8);
      pop(".s11-reloj", ${T(112)} - 0.2);
      tl.fromTo(q(".s11-min"), { rotation: 0 }, { rotation: 1440, svgOrigin: "0 0", duration: 1.6, ease: "power2.inOut" }, ${T(112)});
      tl.fromTo(q(".s11-hora"), { rotation: 0 }, { rotation: 120, svgOrigin: "0 0", duration: 1.6, ease: "power2.inOut" }, ${T(112)});
      escribir(".s11-24", ${T(113)}, 0.4);
      pop(".s11-c1", ${T(115)} - 0.05, { x: 40 });
      pop(".s11-c2", ${T(117)} - 0.05, { x: 40 });
${salida("s11")}`,
  sfx: [[0.05, "pop", 0.25], ["T105", "pop", 0.25], ["T108", "notification", 0.3], ["T110", "ping", 0.35], ["T112", "whoosh", 0.2, 0.8], ["T115", "pop", 0.3], ["T117", "pop", 0.3]],
});

E["s12-tres-am"] = (T, D) => ({
  html: `
        <div class="ab s12-noche" style="left:60px;top:580px;width:960px;height:930px;background:${C.tinta};border-radius:24px"></div>
        <svg class="full">
          <path class="s12-luna" d="M900 640 A70 70 0 1 0 960 760 A56 56 0 1 1 900 640 Z" fill="${C.mostaza}" />
          ${[[150, 660], [260, 720], [720, 690], [180, 1420], [930, 1380], [600, 640]].map(([x, y], k) => `<path class="s12-est" d="M${x} ${y - 14} L${x + 4} ${y - 4} L${x + 14} ${y} L${x + 4} ${y + 4} L${x} ${y + 14} L${x - 4} ${y + 4} L${x - 14} ${y} L${x - 4} ${y - 4} Z" fill="${C.papel}" opacity="0.8" />`).join("")}
        </svg>
        <div class="titulo s12-hora" style="left:0;width:1080px;text-align:center;top:680px;font-size:190px;color:${C.mostaza};font-family:'IBM Plex Mono',monospace;font-weight:500;letter-spacing:0.02em">03:00</div>
        <div class="titulo s12-tamb" style="left:0;width:1080px;text-align:center;top:920px;font-size:120px;color:${C.papel}">También.</div>
        ${agente("s12-ag", 280, 1000, 400)}
        <div class="pill mostaza s12-lab" style="left:340px;top:1360px">Agente de IA</div>
        <div class="pill roja s12-rep" style="left:110px;top:640px">Repita</div>
        <div class="globo s12-glo" style="left:560px;top:830px;font-size:52px;border-bottom-left-radius:8px">«Ya te lo<br />reservo.»</div>`,
  js: `
      tl.fromTo(q(".s12-noche"), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s12-luna", 0.15);
      pop(".s12-est", 0.2);
      tl.to(qa(".s12-est"), { opacity: 0.3, duration: 0.4, yoyo: true, repeat: 15, stagger: 0.13, ease: "sine.inOut" }, 0.6);
      golpe(".s12-hora", ${T(120)}, 1.8);
      tl.to(q(".s12-hora"), { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 3, ease: "steps(1)" }, ${T(120)} + 0.4);
      golpe(".s12-tamb", ${T(124)} + 0.05, 2, -3);
      sacudon(${T(124)} + 0.1, 0.8);
      tl.to(q(".s12-hora"), { y: -40, scale: 0.6, opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, ${T(125)});
      tl.to(q(".s12-tamb"), { y: -150, scale: 0.6, opacity: 0, duration: 0.35, ease: "power2.inOut" }, ${T(126)});
      tl.to(q(".s12-hora"), { opacity: 0, duration: 0.25 }, ${T(131)} - 0.3);
      tl.fromTo(q(".s12-ag"), { y: 300, scale: 0.5, opacity: 0 }, { y: -60, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }, ${T(128)} - 0.35);
      pop(".s12-lab", ${T(128)} + 0.2);
      parpadeo(".s12-ag", ${T(130)} + 0.3);
      flotar(".s12-ag", ${T(128)} + 0.4, ${D} - 0.3, 10);
      pop(".s12-rep", ${T(131)}, { x: -30 }, -5);
      pop(".s12-glo", ${T(132)} - 0.1, { x: -30 });
      hablar(".s12-ag", ${T(132)}, ${T(135)} + 0.55);
${salida("s12")}`,
  sfx: [[0.05, "whoosh-short", 0.2], ["T120", "impact-bass-2", 0.35, 0.5], ["T124", "impact-bass-1", 0.35, 0.5], ["T128-0.3", "sparkle", 0.35, 1.0], ["T131", "ping", 0.25], ["T132", "pop", 0.3]],
});

E["s13-entiendo"] = (T, D) => ({
  html: `
        ${alumno("s13-alu", 90, 860, 470)}
        <div class="globo s13-glo" style="left:430px;top:620px;font-size:60px;border-bottom-left-radius:8px">¡Ya te lo reservo!</div>
        <svg class="full">
          <circle class="s13-circ" cx="790" cy="1210" r="150" fill="none" stroke="${C.rojo}" stroke-width="12" stroke-linecap="round" transform="rotate(-80 790 1210)" />
          ${[[620, 900], [960, 980], [600, 1460], [990, 1420]].map(([x, y]) => `<path class="s13-est" d="M${x} ${y - 30} L${x + 9} ${y - 9} L${x + 30} ${y} L${x + 9} ${y + 9} L${x} ${y + 30} L${x - 9} ${y + 9} L${x - 30} ${y} L${x - 9} ${y - 9} Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="4" stroke-linejoin="round" />`).join("")}
        </svg>
        <div class="manus s13-12" style="left:640px;width:300px;text-align:center;top:1100px;font-size:220px">12</div>
        <div class="manus s13-sob" style="left:560px;width:460px;text-align:center;top:1376px;font-size:64px">¡Sobresaliente!</div>`,
  js: `
      tl.fromTo(q(".s13-alu"), { y: 200, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }, 0);
      pop(".s13-glo", 0.02, { x: -40 });
      hablar(".s13-alu", 0.03, ${T(144)} + 0.6);
      tl.to(q(".s13-alu .cejas"), { y: -12, duration: 0.15 }, 0.1);
      tl.to(q(".s13-alu"), { y: -24, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out" }, ${T(140)});
      pop(".s13-est", ${T(141)} - 0.1);
      tl.to(qa(".s13-est"), { rotation: 30, transformOrigin: "50% 50%", duration: 1.2, ease: "sine.inOut" }, ${T(141)} + 0.3);
      golpe(".s13-12", ${T(143)}, 2.2, -6);
      dibujar(".s13-circ", ${T(143)} + 0.1, 0.45);
      escribir(".s13-sob", ${T(144)} + 0.1, 0.5);
      sacudon(${T(143)} + 0.06, 1);
${salida("s13")}`,
  sfx: [[0.03, "pop", 0.3], ["T141", "sparkle", 0.3, 0.8], ["T143", "impact-bass-2", 0.4, 0.6], ["T144", "chime", 0.3, 1.0]],
});

E["s14-scalerics"] = (T, D) => ({
  html: `
        <div class="ab s14-libro" style="left:200px;top:590px;width:680px;height:880px;background:${C.tinta};border-radius:10px 22px 22px 10px;box-shadow:16px 16px 0 #2c3b66">
          <div style="position:absolute;left:34px;top:0;bottom:0;width:14px;background:${C.papel};opacity:0.4"></div>
          <div class="mono" style="left:90px;top:60px;font-size:28px;color:${C.papel}">Curso completo</div>
          <div class="titulo s14-tit" style="left:86px;top:112px;font-size:96px;line-height:1.0;color:${C.mostaza}">Agente<br />de IA</div>
          <div class="manus s14-sub" style="left:92px;top:332px;font-size:54px;color:${C.papel}">el idioma del cliente</div>
          <div class="mono s14-b1" style="left:92px;top:450px;font-size:30px;color:${C.papel}">· Atiende tu WhatsApp</div>
          <div class="mono s14-b2" style="left:92px;top:510px;font-size:30px;color:${C.papel}">· Como un empleado más</div>
          <div class="mono s14-b3" style="left:92px;top:570px;font-size:30px;color:${C.papel}">· A cualquier hora</div>
        </div>
        ${agente("s14-ag", 660, 1320, 280)}
        <div class="ab s14-sello" style="left:120px;top:1250px;padding:16px 30px 12px;background:${C.verde};border:7px solid ${C.tinta};border-radius:14px;box-shadow:10px 10px 0 ${C.tinta}">
          <div class="mono" style="position:relative;font-size:28px">Lo hacemos nosotros</div>
          <div class="titulo" style="position:relative;font-size:70px;margin-top:6px;text-transform:none">Scalerics</div>
        </div>`,
  js: `
      tl.fromTo(q(".s14-libro"), { y: 120, rotation: -6, opacity: 0 }, { y: 0, rotation: -2, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, 0);
      escribir(".s14-tit", ${T(146)}, ${T(148)} + 0.3 - ${T(146)});
      escribir(".s14-sub", ${T(148)} + 0.25, 0.5);
      escribir(".s14-b1", ${T(150)}, 0.45);
      escribir(".s14-b2", ${T(153)}, 0.5);
      escribir(".s14-b3", ${T(156)} + 0.1, 0.45);
      pop(".s14-ag", ${T(149)}, { y: 40 }, 6);
      flotar(".s14-ag", ${T(149)} + 0.4, ${D} - 0.3, 10);
      parpadeo(".s14-ag", ${T(156)});
      golpe(".s14-sello", ${T(160)}, 2.2, -5);
      sacudon(${T(160)} + 0.06, 1);
      tl.to(q(".s14-libro"), { rotation: 0, duration: 1.4, ease: "sine.inOut" }, 0.5);
${salida("s14")}`,
  sfx: [[0.05, "whoosh-short", 0.2], ["T146", "pop", 0.25], ["T150", "key-press", 0.25], ["T153", "key-press", 0.25], ["T160-0.06", "impact-bass-1", 0.45, 0.6], ["T160+0.1", "chime", 0.3, 1.0]],
});

E["s15-cta"] = (T, D) => ({
  html: `
        <div class="resalta s15-res" style="left:60px;top:640px;width:610px;height:44px"></div>
        <div class="titulo s15-tit" style="left:72px;top:566px;font-size:128px">Lección 2</div>
        <div class="titulo s15-preg" style="left:72px;top:740px;font-size:76px;line-height:1.05;text-transform:none">¿Qué frase de<br />comerciante agregarías?</div>
        <div class="mono s15-ej" style="left:78px;top:944px;font-size:28px;opacity:0.7">Ejercicio · completá</div>
        <svg class="full">
          <path class="s15-r1" d="M90 1080 H990" stroke="${C.tinta}" stroke-width="5" opacity="0.5" />
          <path class="s15-r2" d="M90 1170 H990" stroke="${C.tinta}" stroke-width="5" opacity="0.5" />
          <path class="s15-gar" d="M120 1060 C150 1020 170 1080 200 1050 S250 1030 280 1056 S340 1020 370 1052 S430 1040 460 1050" fill="none" stroke="${C.rojo}" stroke-width="7" stroke-linecap="round" />
          <g class="s15-lapiz"><path d="M0 0 L26 -80 L60 -70 L34 10 Z" fill="${C.mostaza}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" /><path d="M0 0 L34 10 L10 34 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" /><path d="M26 -80 L60 -70 L66 -92 L32 -102 Z" fill="${C.rojo}" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" /></g>
        </svg>
        <svg class="ab s15-com" style="left:90px;top:1230px;width:250px;height:220px" viewBox="0 0 250 220" overflow="visible">
          <path d="M40 10 H210 Q240 10 240 40 V140 Q240 170 210 170 H110 L60 212 L68 170 H40 Q10 170 10 140 V40 Q10 10 40 10 Z" fill="${C.claro}" stroke="${C.tinta}" stroke-width="8" stroke-linejoin="round" />
          <circle class="s15-d" cx="75" cy="90" r="16" fill="${C.mostaza}" /><circle class="s15-d" cx="125" cy="90" r="16" fill="${C.mostaza}" /><circle class="s15-d" cx="175" cy="90" r="16" fill="${C.mostaza}" />
        </svg>
        <div class="titulo s15-lee" style="left:380px;top:1280px;font-size:110px;color:${C.rojo}">Te leemos</div>`,
  js: `
      tl.fromTo(qa(".s15-tit, .s15-res"), { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.6)", transformOrigin: "0% 50%" }, 0);
      tl.fromTo(q(".s15-res"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out", transformOrigin: "0% 50%" }, 0.05);
      escribir(".s15-preg", ${T(162)}, ${T(165)} + 0.5 - ${T(162)});
      escribir(".s15-ej", ${T(166)}, 0.4);
      dibujar(".s15-r1", ${T(166)}, 0.4);
      dibujar(".s15-r2", ${T(167)}, 0.4);
      // el lápiz escribe un garabato en el renglón
      gsap.set(q(".s15-lapiz"), { x: 100, y: 1060, opacity: 0 });
      tl.to(q(".s15-lapiz"), { opacity: 1, duration: 0.15 }, ${T(168)} - 0.2);
      dibujar(".s15-gar", ${T(168)}, 1.2);
      tl.to(q(".s15-lapiz"), { x: 450, duration: 1.2, ease: "power2.inOut" }, ${T(168)});
      tl.to(q(".s15-lapiz"), { y: 1035, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, ${T(168)});
      pop(".s15-com", ${T(170)} - 0.1, { y: 30 });
      golpe(".s15-lee", ${T(171)}, 2, -3);
      sacudon(${T(171)} + 0.06, 1);
      tl.to(qa(".s15-d"), { y: -14, duration: 0.2, yoyo: true, repeat: 15, stagger: 0.12, ease: "sine.inOut" }, ${T(171)} + 0.2);
      tl.to(q(".s15-lee"), { scale: 1.05, duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${T(171)} + 0.4);`,
  sfx: [[0.03, "pop", 0.3], ["T162", "typing", 0.2, 1.0], ["T168", "key-press", 0.25], ["T170", "pop", 0.3], ["T171-0.06", "impact-bass-2", 0.4, 0.6], ["T171+0.3", "chime", 0.3, 1.2]],
});

// ---------- escribir ----------
const solo = process.argv.slice(2);
fs.mkdirSync("compositions", { recursive: true });
for (const { id, a, b } of ESC) {
  if (!E[id]) continue;
  if (solo.length && !solo.some((s) => id.startsWith(s))) continue;
  const dur = r2(b - a);
  const T = (i) => r2(P[i].start - a).toFixed(2);
  const { html, js, sfx } = E[id](T, dur);
  fs.writeFileSync(`compositions/${id}.html`, componer(id, dur, { html, js }));
  const tt = (v) => {
    if (typeof v === "number") return v;
    const m = /^T(\d+)([+-][\d.]+)?$/.exec(v);
    return Number(T(Number(m[1]))) + Number(m[2] || 0);
  };
  const lista = sfx.filter(([, , vol]) => vol > 0).map(([t, s, vol, max]) => Object.assign({ t: r2(Math.max(0, Math.min(dur - 0.05, tt(t)))), sfx: s, vol }, max ? { max } : {}));
  fs.writeFileSync(`compositions/${id}.sfx.json`, "[\n" + lista.map((x) => "  " + JSON.stringify(x)).join(",\n") + "\n]\n");
  console.log(id, dur);
}
