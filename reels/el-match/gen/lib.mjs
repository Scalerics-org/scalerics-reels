// Generador de escenas de el-match: arma cada compositions/<id>.html con el boilerplate común.
import fs from "node:fs";
const DIR = new URL("../compositions/", import.meta.url).pathname;

const COMUN = `
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    $ .@-capa { position: absolute; inset: 0; }
    $ svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    $ .ln { fill: none; stroke: #fff7f4; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    $ .nf { fill: #1a0d2b; stroke: #fff7f4; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    $ .vf { fill: #9b6bff; stroke: #fff7f4; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    $ .wf { fill: #fff7f4; stroke: #1a0d2b; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    $ .cf { fill: #ff5a6e; stroke: none; }
    $ .bf { fill: #fff7f4; stroke: none; }
    $ .kf { fill: #1a0d2b; stroke: none; }
    $ .cl { fill: none; stroke: #ff5a6e; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    $ .gl { fill: none; stroke: #5ce611; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
    $ .la { fill: none; stroke: #b9a8d6; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    $ .kn { fill: none; stroke: #1a0d2b; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    $ .kw { fill: #fff7f4; stroke: #1a0d2b; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    $ .lente { fill: rgba(185, 168, 214, 0.35); stroke: #fff7f4; stroke-width: 8; stroke-linejoin: round; }
    $ .lentek { fill: rgba(185, 168, 214, 0.5); stroke: #1a0d2b; stroke-width: 7; stroke-linejoin: round; }
    /* tarjeta de perfil */
    $ .tarjeta { position: absolute; width: 460px; height: 640px; border-radius: 36px; background: #fff7f4; overflow: hidden; box-shadow: 0 18px 40px rgba(18, 8, 32, 0.55); }
    $ .tarjeta .foto { position: absolute; left: 0; top: 0; width: 460px; height: 420px; background: #ff5a6e; overflow: hidden; }
    $ .tarjeta .foto.v { background: #9b6bff; }
    $ .tarjeta .foto.l { background: #b9a8d6; }
    $ .tarjeta .foto svg { width: 460px; height: 420px; }
    $ .tarjeta .nom { position: absolute; left: 34px; top: 440px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 60px; line-height: 1; color: #1a0d2b; letter-spacing: -0.02em; }
    $ .tarjeta .bio { position: absolute; left: 36px; top: 522px; right: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; line-height: 1.3; color: #1a0d2b; opacity: 0.8; letter-spacing: 0.04em; }
    $ .boton { position: absolute; width: 112px; height: 112px; border-radius: 50%; border: 6px solid #b9a8d6; background: #120820; }
    $ .boton.c { border-color: #ff5a6e; }
    $ .boton svg { position: absolute; left: -6px; top: -6px; width: 112px; height: 112px; }
    $ .sello { position: absolute; padding: 10px 22px; border: 7px solid #ff5a6e; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; line-height: 1; color: #ff5a6e; white-space: nowrap; }
    $ .sello.la { border-color: #b9a8d6; color: #b9a8d6; background: rgba(18, 8, 32, 0.9); }
    $ .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.16em; color: #b9a8d6; text-transform: uppercase; white-space: nowrap; }
    $ .gigante { position: absolute; left: 50px; right: 50px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; letter-spacing: -0.02em; color: #fff7f4; }
    $ .burbuja { position: absolute; padding: 22px 30px; border-radius: 36px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 42px; line-height: 1.2; }
    $ .burbuja.yo { background: #9b6bff; color: #fff7f4; border-bottom-right-radius: 8px; }
    $ .burbuja.ella { background: #fff7f4; color: #1a0d2b; border-bottom-left-radius: 8px; }
    $ .burbuja small { display: block; margin-top: 8px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.08em; opacity: 0.85; text-align: right; }
    $ .cel { position: absolute; border: 6px solid #fff7f4; border-radius: 58px; background: #120820; overflow: hidden; }
    $ .cel .barra { position: absolute; left: 50%; top: 18px; width: 108px; height: 26px; margin-left: -54px; border-radius: 14px; background: #fff7f4; opacity: 0.85; }
`;

const HELPERS = `
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
          gsap.set(el, { opacity: desde ? 1 : 0 });
          if (!desde) tl.to(el, { opacity: 1, duration: 0.04 }, t + i * 0.02);
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t + i * 0.02);
        });
      };
      const oculto = (els) => gsap.set(els, { opacity: 0 });
      const pop = (el, t, desde = 0.85) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t); };
      const entra = (el, t, desde = {}) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: 30, ...desde }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, t); };
      const sale = (el, t, d = 0.2) => tl.to(el, { opacity: 0, duration: d }, t);
      const golpe = (t, f = 10) => tl.fromTo(q(".@-esc"), { x: -f }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)", immediateRender: false }, t);
      // sello que cae de golpe
      const sellar = (el, t, rot = -8) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 2.2, rotation: rot - 8 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.22, ease: "power4.in", immediateRender: false }, t - 0.18); golpe(t + 0.04, 12); };
      // swipe de tarjeta: dir -1 izquierda (nope), 1 derecha (like)
      const swipe = (el, t, dir = -1, dur = 0.4) => tl.to(el, { x: dir * 900, rotation: dir * 24, opacity: 0, duration: dur, ease: "power2.in" }, t);
      const late = (el, t, n = 2, s = 1.12, origen) => tl.to(el, { scale: s, ...(origen ? { svgOrigin: origen } : {}), duration: 0.15, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t);
`;

export function escena(id, dur, { css = "", body, js, sfx }) {
  const P = id.slice(0, 3);
  const sel = `[data-composition-id="${id}"]`;
  const fix = (s) => s.replaceAll("$", sel).replaceAll("@-", P + "-");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }${fix(COMUN)}${fix(css)}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${P}-escena" class="${P}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${P}-esc ${P}-capa">
${fix(body)}
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
${fix(HELPERS)}
${fix(js)}
      tl.to(q("#${P}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(DIR + id + ".html", html);
  fs.writeFileSync(DIR + id + ".sfx.json", JSON.stringify(sfx));
}

// ---------- dibujos ----------
// avatares para la foto de la tarjeta (viewBox 0 0 460 420), líneas noche sobre color
const hombros = `<path class="kw @-l" d="M80 430 Q92 316 230 304 Q368 316 380 430" /><path class="kw @-l" d="M200 250 V312 Q230 326 260 312 V250" />`;
const cara = (boca = "M204 250 Q230 266 256 250") => `<ellipse class="kw @-l" cx="230" cy="196" rx="72" ry="86" /><circle class="kf" cx="204" cy="196" r="8" /><circle class="kf" cx="256" cy="196" r="8" /><path class="kn @-l" d="${boca}" />`;
export const AV = {
  gabriela: `<svg viewBox="0 0 460 420" aria-hidden="true"><path class="kf" d="M150 210 Q140 96 230 92 Q320 96 310 210 L326 340 L134 340 Z" />${hombros}${cara()}<path class="kf" d="M158 178 Q164 110 230 108 Q296 110 302 178 Q262 140 210 148 Q182 152 158 178 Z" /><ellipse fill="#9b6bff" stroke="#1a0d2b" stroke-width="5" cx="202" cy="116" rx="28" ry="16" /><ellipse fill="#9b6bff" stroke="#1a0d2b" stroke-width="5" cx="258" cy="116" rx="28" ry="16" /><path class="kn" d="M230 116 h0" /></svg>`,
  rodrigo: `<svg viewBox="0 0 460 420" aria-hidden="true">${hombros}${cara("M210 238 Q230 248 250 238")}<path class="kf" d="M160 206 Q166 296 230 302 Q294 296 300 206 Q284 258 230 260 Q176 258 160 206 Z" /><path class="kf" d="M156 160 Q160 96 230 94 Q300 96 304 160 Z" /><path class="kf" d="M290 152 Q342 150 360 166 L294 168 Z" /></svg>`,
  dueno: `<svg viewBox="0 0 460 420" aria-hidden="true">${hombros}${cara("M210 262 Q230 256 250 262")}<path class="kn" d="M160 190 Q156 120 190 108 M300 190 Q304 120 270 108 M218 108 Q230 98 242 108" /><rect class="lentek" x="166" y="168" width="58" height="50" rx="16" /><rect class="lentek" x="236" y="168" width="58" height="50" rx="16" /><path class="kn" d="M224 190 H236" /><path class="kf" d="M196 240 Q214 226 230 236 Q246 226 264 240 Q246 252 230 246 Q214 252 196 240 Z" /></svg>`,
  quien: `<svg viewBox="0 0 460 420" aria-hidden="true"><path class="kf" d="M80 430 Q92 316 230 304 Q368 316 380 430 Z" /><ellipse class="kf" cx="230" cy="196" rx="76" ry="90" /><text x="230" y="240" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="130" fill="#fff7f4">?</text></svg>`,
  generico: (c = "kf") => `<svg viewBox="0 0 460 420" aria-hidden="true"><path class="${c}" d="M80 430 Q92 316 230 304 Q368 316 380 430 Z" /><ellipse class="${c}" cx="230" cy="196" rx="76" ry="90" /></svg>`,
};
export const tarjeta = (cls, x, y, foto, av, nom, bio, extra = "") =>
  `<div class="tarjeta ${cls}" style="left:${x}px;top:${y}px"><div class="foto ${foto}">${av}</div><div class="nom">${nom}</div><div class="bio">${bio}</div>${extra}</div>`;

// botones X y corazón debajo de una tarjeta
export const botones = (cls, cx, y) => `<div class="boton ${cls}-x" style="left:${cx - 150}px;top:${y}px"><svg viewBox="0 0 112 112"><path class="la" d="M38 38 L74 74 M74 38 L38 74" style="stroke-width:8" /></svg></div><div class="boton c ${cls}-c" style="left:${cx + 38}px;top:${y}px"><svg viewBox="0 0 112 112"><path class="cf" d="M56 42 C50 28 28 30 28 48 C28 62 44 72 56 84 C68 72 84 62 84 48 C84 30 62 28 56 42 Z" /></svg></div>`;

// corazón (centro 0,0; ancho ~320)
export const CORAZON = "M0 -60 C-40 -140 -170 -110 -160 -10 C-150 70 -50 120 0 170 C50 120 150 70 160 -10 C170 -110 40 -140 0 -60 Z";

// la coach de frente (cabeza en 231,1094 como en s01); envolver en <g transform>
export const COACH = `
          <path class="vf @-l" d="M70 1520 Q78 1290 170 1240 Q230 1214 290 1240 Q380 1284 396 1420 L404 1520 Z" />
          <path class="ln @-l" d="M200 1238 L230 1330 L262 1238 M230 1330 V1520" />
          <path class="nf @-l" d="M208 1180 V1238 Q230 1252 254 1238 V1180" />
          <circle class="nf @-l" cx="150" cy="1050" r="40" /><circle class="nf @-l" cx="140" cy="1120" r="38" />
          <circle class="nf @-l" cx="160" cy="1180" r="34" /><circle class="nf @-l" cx="310" cy="1050" r="40" />
          <circle class="nf @-l" cx="322" cy="1120" r="38" /><circle class="nf @-l" cx="302" cy="1180" r="34" />
          <circle class="nf @-l" cx="170" cy="980" r="42" /><circle class="nf @-l" cx="230" cy="955" r="46" /><circle class="nf @-l" cx="292" cy="980" r="42" />
          <ellipse class="nf @-l" cx="231" cy="1094" rx="70" ry="88" />
          <path class="nf @-l" d="M164 1060 Q170 1010 206 1014 Q214 990 240 996 Q268 990 276 1016 Q302 1018 300 1062 Q282 1036 258 1040 Q240 1030 222 1040 Q196 1032 164 1060 Z" />
          <path class="nf @-l" d="M176 1000 Q200 984 226 996 M236 996 Q262 984 288 1000" />
          <ellipse class="cf" cx="200" cy="998" rx="24" ry="13" /><ellipse class="cf" cx="262" cy="998" rx="24" ry="13" />
          <path class="ln @-l" d="M188 1068 Q202 1060 216 1066" />
          <path class="ln @-l @-ceja" d="M246 1060 Q262 1050 278 1058" />
          <circle class="cf" cx="204" cy="1090" r="7" /><circle class="cf" cx="258" cy="1090" r="7" />
          <path class="ln @-l" d="M231 1100 Q238 1124 228 1132" />
          <path class="ln @-l @-boca" d="M206 1150 Q234 1160 262 1142" />
          <circle class="cl @-l" cx="160" cy="1130" r="17" /><circle class="cl @-l" cx="302" cy="1130" r="17" />`;

// el dueño de la óptica, busto (cabeza en 0,0); envolver en <g transform>
export const DUENO = `
          <path class="wf @-l" d="M-180 430 Q-170 200 -74 160 L0 236 L74 160 Q170 200 180 430 Z" />
          <path class="kn @-l" d="M-74 160 L-34 310 M74 160 L34 310" />
          <rect class="kn @-l" x="60" y="300" width="64" height="50" rx="6" /><path class="cl @-l" d="M78 296 V330" />
          <path class="nf @-l" d="M-28 88 V176 Q0 194 28 176 V88" />
          <ellipse class="nf @-l" cx="-80" cy="10" rx="14" ry="24" /><ellipse class="nf @-l" cx="80" cy="10" rx="14" ry="24" />
          <ellipse class="nf @-l" cx="0" cy="0" rx="78" ry="96" />
          <path class="ln @-l" d="M-76 -14 Q-82 -76 -46 -94 M76 -14 Q82 -76 46 -94 M-14 -96 Q0 -110 14 -96" />
          <path class="ln @-l @-cejas" d="M-64 -46 Q-42 -36 -16 -42 M64 -46 Q42 -36 16 -42" />
          <rect class="lente @-l" x="-68" y="-30" width="60" height="50" rx="16" /><rect class="lente @-l" x="8" y="-30" width="60" height="50" rx="16" />
          <path class="ln @-l" d="M-8 -8 H8" />
          <circle class="cf" cx="-38" cy="-4" r="7" /><circle class="cf" cx="38" cy="-4" r="7" />
          <path class="bf" d="M-42 46 Q-20 30 0 40 Q20 30 42 46 Q20 60 0 52 Q-20 60 -42 46 Z" />
          <ellipse class="nf @-l @-boca" cx="0" cy="72" rx="14" ry="10" />`;

// tildes de visto (dos), en coordenadas locales
export const TILDES = (x, y, cls = "la") => `<path class="${cls}" d="M${x} ${y} l12 12 l22 -24 M${x + 20} ${y + 6} l6 6 l22 -24" />`;
