// Genera reel.json (escenas, cortes, acento), compositions/ambiente.html y todas las escenas
// compositions/sNN-*.html + .sfx.json de "La tasación", con los tiempos de assets/voice/palabras.json.
// Correr desde reels/la-tasacion:  node escenas.mjs && node armar.mjs
// (escenas.mjs vuelve a correr armar.mjs al final). Si cambia la voz, se regenera todo solo.
import fs from "node:fs";
import { execSync } from "node:child_process";

// ---------- paleta ----------
const N0 = "#07120d", N1 = "#0d241a", N2 = "#16392a", CR = "#f1e6c8", OR = "#c9a24a", RO = "#ff3b4a", AZ = "#4aa8ff", VE = "#5ce611";

// ---------- parlamentos -> índices de palabra ----------
const PARTES = fs.readdirSync("partes").filter((f) => /^\d\d\.txt$/.test(f)).sort();
const TXT = PARTES.map((f) => fs.readFileSync("partes/" + f, "utf8").split(/\s+/).filter(Boolean));
const OFF = []; let acc = 0; for (const t of TXT) { OFF.push(acc); acc += t.length; }
const NUM = PARTES.map((f) => Number(f.slice(0, 2)));
const IX = (n) => { const i = NUM.indexOf(n); if (i < 0) throw new Error("no hay parte " + n); return i; };
const P = (n, k = 0) => OFF[IX(n)] + k; // palabra k del parlamento n (por número de archivo)

// escenas: [id, palabra donde arranca]
const ESC = [
  ["s01-nada", P(1)], ["s02-beto", P(2)], ["s03-brazo", P(3)], ["s04-cuaderno", P(4)], ["s05-excel", P(5)],
  ["s06-caja", P(7)], ["s07-enlatado", P(9, 5)], ["s08-quien", P(11)], ["s09-cero", P(13)], ["s10-alfajor", P(14)],
  ["s11-vale", P(16)], ["s12-depende", P(16, 16)], ["s13-sistema", P(17)], ["s14-camina", P(17, 26)], ["s15-guardo", P(19)],
  ["s16-cta", P(20)],
];
// cortes de subtítulos: cada parlamento arranca grupo; dentro, cortar en . ? ! : (y en , si pasa de 9)
const TODAS = TXT.flat();
const cortes = [];
TXT.forEach((t, n) => {
  let ini = OFF[n]; cortes.push(ini);
  for (let k = 0; k < t.length - 1; k++) {
    const i = OFF[n] + k, largo = i - ini + 1;
    const fin = /[.?!:]$/.test(t[k]) || /\.\.\.$/.test(t[k]);
    const coma = /,$/.test(t[k]);
    if ((fin && largo >= 3) || (coma && largo >= 6) || largo >= 9) { cortes.push(i + 1); ini = i + 1; }
  }
});
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const ACENTOS = ["nada", "vender", "distribuidora", "locales", "jubilar", "cuanto", "negocio", "brazo", "cuaderno", "descifra", "excel",
  "version", "tres.", "nunca", "caja", "cierra", "menos.", "cotiza", "enlatado", "locales?", "hace.", "quien", "usar", "yo", "vende", "usted.", "cero",
  "cincuenta", "alfajor", "monton", "clientes", "proveedores", "barrio", "dependa", "medida", "solo", "camine", "estes", "eso", "guardo", "pregunta", "comentarios", "manana", "sin"];
const acento = [];
TODAS.forEach((w, i) => { const n = norm(w); if (ACENTOS.some((a) => norm(a) === n)) acento.push(i); });
// "negocio" solo en el gancho y en el giro
const reel = { escenas: ESC, cortes, acento };
fs.writeFileSync("reel.json", JSON.stringify(reel));
execSync("node armar.mjs", { stdio: "inherit" });

// ---------- tiempos ----------
const W = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, W.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(W[i].start));
const T = ESC.map(([id, i], k) => ({ id, a: ini(i), b: k + 1 < ESC.length ? ini(ESC[k + 1][1]) : DUR, i0: i, i1: k + 1 < ESC.length ? ESC[k + 1][1] : W.length }));
const G = (word, n = 0) => { const m = W.filter((w) => norm(w.text) === norm(word)); if (!m[n]) throw new Error("no está: " + word); return r2(m[n].start); };
const GP = (parte, k = 0) => r2(W[P(parte, k)].start);
const GE = (parte) => { const t = TXT[IX(parte)]; return r2(W[P(parte, t.length - 1)].end); };

// ---------- personajes (SVG en coordenadas propias) ----------
const st = `stroke="${CR}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
const tasador = (p) => `<svg viewBox="0 0 400 470" aria-hidden="true">
  <path d="M30 470 C30 370 85 322 150 306 L250 306 C315 322 370 370 370 470 Z" fill="${N2}" ${st} />
  <path d="M152 306 L200 392 L248 306 Z" fill="${CR}" />
  <path d="M150 306 L200 470 M250 306 L200 470" fill="none" ${st} />
  <path d="M200 324 L170 309 L170 339 Z M200 324 L230 309 L230 339 Z" fill="${OR}" />
  <circle cx="200" cy="420" r="7" fill="${OR}" /><circle cx="200" cy="450" r="7" fill="${OR}" />
  <path d="M265 380 h40" stroke="${OR}" stroke-width="5" stroke-linecap="round" /><path d="M285 380 v26" stroke="${OR}" stroke-width="4" />
  <ellipse cx="200" cy="186" rx="104" ry="124" fill="${N1}" ${st} />
  <path d="M97 176 C70 168 68 222 100 226 M303 176 C330 168 332 222 300 226" fill="${N1}" ${st} />
  <path d="M96 150 C74 132 82 100 106 108 C98 88 116 76 128 92 M304 150 C326 132 318 100 294 108 C302 88 284 76 272 92" fill="none" ${st} />
  <path d="M158 86 C178 76 206 76 224 84" fill="none" stroke="${CR}" stroke-width="5" stroke-linecap="round" opacity="0.45" />
  <g class="${p}-cejas"><path d="M124 146 L182 158" stroke="${CR}" stroke-width="13" stroke-linecap="round" /><path d="M218 158 L276 146" stroke="${CR}" stroke-width="13" stroke-linecap="round" /></g>
  <circle cx="153" cy="188" r="29" fill="none" stroke="${OR}" stroke-width="5" />
  <circle class="${p}-ojo" cx="153" cy="190" r="8" fill="${CR}" />
  <path d="M182 188 H214" stroke="${OR}" stroke-width="5" />
  <g class="${p}-lupa"><rect x="212" y="154" width="74" height="66" rx="12" fill="${N0}" stroke="${OR}" stroke-width="6" /><circle cx="249" cy="187" r="23" fill="${AZ}" opacity="0.35" /><circle class="${p}-pupila" cx="249" cy="187" r="12" fill="${CR}" /><path class="${p}-brillo" d="M232 172 l10 -6" stroke="${CR}" stroke-width="4" stroke-linecap="round" /></g>
  <path d="M198 200 C186 240 192 252 214 248" fill="none" ${st} />
  <path d="M146 270 C168 248 194 254 200 262 C206 254 232 248 254 270 C232 276 212 272 200 266 C188 272 168 276 146 270 Z" fill="${CR}" />
  <path class="${p}-boca" d="M178 292 H222" fill="none" ${st} />
  <ellipse class="${p}-bocaA" cx="200" cy="294" rx="18" ry="11" fill="${N0}" ${st} opacity="0" />
</svg>`;
const beto = (p) => `<svg viewBox="0 0 400 480" aria-hidden="true">
  <path d="M26 480 C26 384 78 340 140 326 L260 326 C322 340 374 384 374 480 Z" fill="${N2}" ${st} />
  <path d="M146 322 L200 376 L254 322 L236 310 L200 348 L164 310 Z" fill="${OR}" />
  <path d="M200 376 V440" ${st} /><circle cx="200" cy="400" r="5" fill="${CR}" /><circle cx="200" cy="428" r="5" fill="${CR}" />
  <rect x="262" y="392" width="70" height="40" rx="6" fill="none" stroke="${OR}" stroke-width="4" /><path d="M274 404 h46 M274 418 h30" stroke="${OR}" stroke-width="4" stroke-linecap="round" />
  <ellipse cx="200" cy="206" rx="120" ry="122" fill="${N1}" ${st} />
  <path d="M84 196 C60 188 58 240 88 244 M316 196 C340 188 342 240 312 244" fill="${N1}" ${st} />
  <path d="M96 168 C108 104 160 92 214 96 M112 150 C150 104 250 98 300 150 M140 120 C200 96 270 106 306 168" fill="none" ${st} />
  <g class="${p}-cejas"><path d="M134 166 Q160 154 184 166" fill="none" ${st} /><path d="M216 166 Q240 154 266 166" fill="none" ${st} /></g>
  <g class="${p}-cejasI" opacity="0"><path d="M134 150 L184 172" fill="none" stroke="${CR}" stroke-width="9" stroke-linecap="round" /><path d="M216 172 L266 150" fill="none" stroke="${CR}" stroke-width="9" stroke-linecap="round" /></g>
  <g class="${p}-ojos"><circle cx="160" cy="198" r="10" fill="${CR}" /><circle cx="240" cy="198" r="10" fill="${CR}" /></g>
  <ellipse cx="200" cy="234" rx="26" ry="20" fill="${N2}" ${st} />
  <path d="M136 270 C156 244 188 250 200 258 C212 250 244 244 264 270 C248 288 216 282 200 274 C184 282 152 288 136 270 Z" fill="${CR}" />
  <path class="${p}-boca" d="M176 296 Q200 314 224 296" fill="none" ${st} />
  <ellipse class="${p}-bocaO ${p}-bocaA" cx="200" cy="304" rx="17" ry="20" fill="${N0}" ${st} opacity="0" />
  <path class="${p}-gota" d="M318 132 C306 152 304 164 318 166 C332 164 330 152 318 132 Z" fill="${AZ}" opacity="0" />
</svg>`;
const ayudante = (p) => `<svg viewBox="0 0 320 440" aria-hidden="true">
  <path d="M28 440 C28 362 70 330 120 318 L200 318 C250 330 292 362 292 440 Z" fill="${N2}" ${st} />
  <path d="M118 318 C130 350 190 350 202 318" fill="none" ${st} /><path d="M140 346 V392 M180 346 V392" ${st} />
  <ellipse cx="160" cy="204" rx="86" ry="106" fill="${N1}" ${st} />
  <path d="M76 196 C56 190 56 232 80 234 M244 196 C264 190 264 232 240 234" fill="${N1}" ${st} />
  <circle cx="248" cy="240" r="7" fill="none" stroke="${OR}" stroke-width="4" />
  <path d="M76 158 C78 80 242 80 244 158 Z" fill="${RO}" ${st} />
  <path d="M244 146 L292 138 L290 160 L240 164" fill="${RO}" ${st} />
  <path d="M112 182 Q132 166 150 178" fill="none" ${st} /><path d="M172 184 L204 184" fill="none" ${st} />
  <circle class="${p}-ojo" cx="134" cy="206" r="8" fill="${CR}" /><circle class="${p}-ojo" cx="188" cy="206" r="8" fill="${CR}" />
  <path d="M118 198 H150 M172 198 H204" stroke="${CR}" stroke-width="5" stroke-linecap="round" />
  <path d="M160 214 Q150 242 168 242" fill="none" ${st} />
  <path class="${p}-boca" d="M132 266 Q164 282 192 258" fill="none" ${st} />
  <ellipse class="${p}-bocaA" cx="162" cy="270" rx="18" ry="12" fill="${N0}" ${st} opacity="0" />
  <circle class="${p}-chicle" cx="198" cy="268" r="26" fill="${RO}" opacity="0" stroke="${CR}" stroke-width="4" />
</svg>`;
// el local de Beto (fachada chica)
const local = (p, rot = "DISTRIBUIDORA") => `<svg viewBox="0 0 300 260" aria-hidden="true">
  <path d="M20 250 V90 H280 V250" fill="${N1}" ${st} />
  <path d="M10 92 L40 40 H260 L290 92 Z" fill="${RO}" ${st} />
  <path d="M60 40 L48 92 M110 40 L104 92 M160 40 V92 M210 40 L216 92 M240 40 L252 92" stroke="${CR}" stroke-width="5" opacity="0.7" />
  <rect x="44" y="118" width="90" height="70" rx="6" fill="${N2}" stroke="${CR}" stroke-width="5" />
  <rect class="${p}-luz" x="44" y="118" width="90" height="70" rx="6" fill="${OR}" opacity="0.35" />
  <path d="M170 250 V120 H246 V250" fill="${N2}" ${st} />
  <circle cx="232" cy="190" r="5" fill="${OR}" />
  <text x="150" y="226" text-anchor="middle" style="font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 24px; fill: ${CR}" data-layout-ignore>${rot}</text>
</svg>`;

// ---------- piezas comunes de cada escena ----------
const cssBase = (id, p) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="${id}"] .${p}-capa, [data-composition-id="${id}"] .${p}-esc { position: absolute; inset: 0; }
    [data-composition-id="${id}"] .${p}-abs { position: absolute; }
    [data-composition-id="${id}"] .${p}-abs > svg { display: block; width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="${id}"] svg.${p}-full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="${id}"] .${p}-big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; letter-spacing: -0.02em; white-space: nowrap; color: ${CR}; }
    [data-composition-id="${id}"] .${p}-neon { color: ${RO}; text-shadow: 0 0 18px rgba(255, 59, 74, 0.75), 0 0 46px rgba(255, 59, 74, 0.45); }
    [data-composition-id="${id}"] .${p}-neonaz { color: ${AZ}; text-shadow: 0 0 18px rgba(74, 168, 255, 0.75), 0 0 46px rgba(74, 168, 255, 0.4); }
    [data-composition-id="${id}"] .${p}-oro { color: ${OR}; }
    [data-composition-id="${id}"] .${p}-pieza { position: absolute; left: 70px; top: 572px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.22em; text-transform: uppercase; color: ${OR}; white-space: nowrap; }
    [data-composition-id="${id}"] .${p}-pieza b { display: inline-block; padding: 4px 14px; margin-right: 14px; background: ${OR}; color: ${N0}; border-radius: 6px; font-weight: 500; }
    /* etiqueta de precio colgante: hilo + cartón crema con agujero */
    [data-composition-id="${id}"] .${p}-tag { position: absolute; transform-origin: 50% 0; }
    [data-composition-id="${id}"] .${p}-tag .hilo { position: absolute; left: 50%; top: 0; width: 4px; margin-left: -2px; background: ${OR}; }
    [data-composition-id="${id}"] .${p}-tag .carton { position: absolute; left: 0; right: 0; bottom: 0; background: ${CR}; color: ${N0}; border-radius: 16px 16px 16px 16px; padding: 30px 26px 18px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; text-align: center; line-height: 1; white-space: nowrap; clip-path: polygon(14% 0, 86% 0, 100% 18%, 100% 100%, 0 100%, 0 18%); }
    [data-composition-id="${id}"] .${p}-tag .agujero { position: absolute; left: 50%; width: 22px; height: 22px; margin-left: -11px; border-radius: 50%; background: ${N0}; border: 4px solid ${OR}; }
    [data-composition-id="${id}"] .${p}-sello { position: absolute; left: 0; right: 0; text-align: center; }
    [data-composition-id="${id}"] .${p}-sello b { display: inline-block; padding: 10px 28px; border: 7px solid ${RO}; border-radius: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 46px; letter-spacing: 0.08em; color: ${RO}; text-transform: uppercase; white-space: nowrap; background: rgba(7, 18, 13, 0.88); }
    [data-composition-id="${id}"] .${p}-globo { position: absolute; padding: 18px 28px; background: ${CR}; color: ${N0}; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; line-height: 1.1; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="${id}"] .${p}-globo.az { background: ${AZ}; }
    [data-composition-id="${id}"] .${p}-globo.ro { background: ${RO}; color: ${CR}; }
    [data-composition-id="${id}"] .${p}-mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; }
`;
// etiqueta colgante: x, y = punto donde cuelga (clavo); w, h del cartón; hilo L
const tag = (p, cls, x, y, w, h, L, html, fs = 56) =>
  `<div class="${p}-tag ${cls}" style="left:${x - w / 2}px;top:${y}px;width:${w}px;height:${L + h}px"><div class="hilo" style="height:${L + 14}px"></div><div class="carton" style="height:${h}px;font-size:${fs}px">${html}</div><div class="agujero" style="top:${L + 8}px"></div></div>`;

const jsBase = (id, p, dur) => `
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const dibujar = (sel, t, d = 0.6, stg = 0) => qa(sel).forEach((el, i) => { const L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t + i * stg); tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t + i * stg); });
      const pop = (sel, t, o = {}) => { const els = qa(sel); gsap.set(els, { opacity: 0 }); tl.fromTo(els, { opacity: 0, scale: o.s ?? 0.85, y: o.y ?? 0, x: o.x ?? 0, rotation: o.r ?? 0 }, { opacity: 1, scale: 1, y: 0, x: 0, rotation: o.rf ?? 0, duration: o.d ?? 0.35, ease: o.e ?? "back.out(1.6)", stagger: o.st ?? 0, immediateRender: false }, t); };
      const golpe = (sel, t, s = 1.9) => { const els = qa(sel); gsap.set(els, { opacity: 0 }); tl.fromTo(els, { opacity: 0, scale: s }, { opacity: 1, scale: 1, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.12); };
      const fuera = (sel, t, d = 0.25) => tl.to(qa(sel), { opacity: 0, duration: d, ease: "power1.in" }, t);
      const sacudon = (t, f = 1) => [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(".${p}-esc"), { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
      // boca que habla: alterna abierta/cerrada entre t0 y t1
      const hablar = (pre, t0, t1, paso = 0.13) => { const c = qa(pre + "-boca"), a = qa(pre + "-bocaA"); for (let t = t0, k = 0; t < t1; t += paso, k++) { tl.set(c, { opacity: k % 2 ? 1 : 0 }, t); tl.set(a, { opacity: k % 2 ? 0 : 1 }, t); } tl.set(c, { opacity: 1 }, t1); tl.set(a, { opacity: 0 }, t1); };
      // la etiqueta se hamaca colgada del hilo
      const hamaca = (sel, t, ang = 7, n = 3, d = 0.6) => { tl.fromTo(qa(sel), { rotation: ang }, { rotation: -ang * 0.6, duration: d, yoyo: true, repeat: n, ease: "sine.inOut", immediateRender: false }, t); tl.to(qa(sel), { rotation: 0, duration: 0.5, ease: "sine.out" }, t + d * (n + 1)); };
      const respira = (sel, t = 0, amp = 6, d = 1.1) => tl.to(qa(sel), { y: -amp, duration: d, yoyo: true, repeat: Math.max(1, Math.floor((DUR - t) / d) - 1), ease: "sine.inOut" }, t);
      const parpadeo = (sel, ts) => ts.forEach((t) => { tl.to(qa(sel), { scaleY: 0.1, duration: 0.06, transformOrigin: "50% 50%" }, t); tl.to(qa(sel), { scaleY: 1, duration: 0.08 }, t + 0.08); });
`;

const escena = (id, p, dur, css, html, js, sfx) => {
  fs.writeFileSync(`compositions/${id}.html`, `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${cssBase(id, p)}${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${p}-escena" class="${p}-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="${p}-esc">
${html}
      </div>
    </div>
  </div>
  <script>
    (function () {${jsBase(id, p, dur)}
${js}
      tl.to(q("#${p}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map(([t, s, vol = 0.32, max]) => ({ t: r2(t), sfx: s, vol, ...(max ? { max } : {}) }))));
};

// cada escena: tiempos relativos con g(palabra, n) / gp(parte, k)
const ctx = (k) => {
  const s = T[k];
  const rel = (t) => r2(t - s.a);
  const g = (w, n = 0) => { const m = W.slice(s.i0, s.i1).filter((x) => norm(x.text) === norm(w)); const x = n < 0 ? m.at(n) : m[n]; if (!x) throw new Error(s.id + ": no está " + w + " " + n); return rel(r2(x.start)); };
  return { s, dur: r2(s.b - s.a), g, gp: (pa, kk = 0) => rel(GP(pa, kk)), ge: (pa) => rel(GE(pa)) };
};
const ESCENAS = {};

// ===== s01-nada: el tasador mira a cámara. "Tu negocio no vale nada."
ESCENAS["s01-nada"] = ({ dur, g, ge }) => [
  `    [data-composition-id="s01-nada"] .s01-tas { left: 190px; top: 760px; width: 700px; height: 822px; }
    [data-composition-id="s01-nada"] .s01-t1 { top: 590px; font-size: 120px; }
    [data-composition-id="s01-nada"] .s01-t2 { top: 1236px; font-size: 200px; }`,
  `        <div class="s01-abs s01-tas">${tasador("s01")}</div>
        <div class="s01-big s01-t1">No vale</div>
        <div class="s01-big s01-neon s01-t2">nada</div>`,
  `      // cuadro 0: el tasador ya está, acercándose
      tl.fromTo(q(".s01-tas"), { opacity: 0.6, scale: 1.12, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
      tl.fromTo(q(".s01-lupa"), { y: -10 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0.1);
      hablar(".s01", 0.05, ${ge(1)});
      golpe(".s01-t1", ${g("vale")});
      golpe(".s01-t2", ${g("nada")}, 2.4);
      sacudon(${g("nada")} + 0.05, 1.3);
      // el neón titila
      tl.to(q(".s01-t2"), { opacity: 0.25, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)" }, ${g("nada")} + 0.5);
      tl.to(q(".s01-brillo"), { opacity: 0, duration: 0.1, yoyo: true, repeat: 3 }, 0.3);
      tl.to(q(".s01-cejas"), { y: 8, duration: 0.2 }, ${g("nada")} - 0.1);
      tl.to(q(".s01-tas"), { scale: 1.05, duration: ${dur}, ease: "none" }, 0.5);`,
  [[0.05, "impact-bass-2", 0.4, 0.7], [g("vale") - 0.05, "click", 0.3], [g("nada") - 0.02, "impact-bass-1", 0.45, 0.7], [g("nada") + 0.5, "glitch-1", 0.25, 0.4]],
];

// ===== s02-beto: entra Beto con la caja. "Buenas. Vengo a vender la distribuidora. Dos locales. Me quiero jubilar. ¿Cuánto me da?"
ESCENAS["s02-beto"] = ({ dur, g, ge }) => [
  `    [data-composition-id="s02-beto"] .s02-beto { left: 40px; top: 900px; width: 520px; height: 624px; }
    [data-composition-id="s02-beto"] .s02-tas { left: 640px; top: 1010px; width: 440px; height: 517px; }
    [data-composition-id="s02-beto"] .s02-campana { left: 470px; top: 560px; width: 140px; height: 140px; }
    [data-composition-id="s02-beto"] .s02-loc1 { left: 70px; top: 640px; width: 230px; height: 200px; }
    [data-composition-id="s02-beto"] .s02-loc2 { left: 320px; top: 640px; width: 230px; height: 200px; }
    [data-composition-id="s02-beto"] .s02-dos { left: 70px; top: 850px; width: 480px; text-align: center; font-size: 34px; letter-spacing: 0.24em; color: ${OR}; text-transform: uppercase; }
    [data-composition-id="s02-beto"] .s02-jub { left: 70px; top: 640px; width: 480px; height: 250px; }
    [data-composition-id="s02-beto"] .s02-cuanto { top: 690px; font-size: 118px; color: ${OR}; }`,
  `        <div class="s02-abs s02-campana"><svg viewBox="0 0 140 140" aria-hidden="true"><path d="M70 10 V30" ${st} /><path d="M30 100 C30 50 45 30 70 30 C95 30 110 50 110 100 Z" fill="${OR}" ${st} /><path d="M20 104 H120" ${st} /><circle cx="70" cy="118" r="10" fill="${CR}" /><path class="s02-ring" d="M8 50 Q0 70 8 90 M132 50 Q140 70 132 90" fill="none" stroke="${OR}" stroke-width="6" stroke-linecap="round" /></svg></div>
        <div class="s02-abs s02-tas">${tasador("s02t")}</div>
        <div class="s02-abs s02-beto">${beto("s02b")}</div>
        <div class="s02-abs s02-loc1">${local("s02l", "LOCAL 1")}</div>
        <div class="s02-abs s02-loc2">${local("s02l", "LOCAL 2")}</div>
        <div class="s02-abs s02-dos s02-mono">Dos locales</div>
        <div class="s02-abs s02-jub"><svg viewBox="0 0 480 250" aria-hidden="true">
          <path d="M120 230 L190 90 M150 230 L120 160 H260 L300 230 M190 90 L250 110 L230 160" fill="none" stroke="${AZ}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="400" cy="60" r="38" fill="${OR}" opacity="0.9" />
          <path d="M330 150 C330 220 400 220 400 150 Z" fill="${N2}" ${st} /><path d="M380 150 L400 100" stroke="${OR}" stroke-width="6" stroke-linecap="round" />
          <text x="240" y="40" text-anchor="middle" style="font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 32px; letter-spacing: 6px; fill: ${AZ}">JUBILACIÓN</text>
        </svg></div>
        <div class="s02-big s02-cuanto">¿Cuánto me da?</div>`,
  `      // campanita de la puerta
      tl.fromTo(q(".s02-campana"), { rotation: -18, opacity: 1 }, { rotation: 18, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 7%" }, 0);
      tl.to(q(".s02-campana"), { rotation: 0, duration: 0.2 }, 0.72);
      fuera(".s02-campana", 1.0);
      // el tasador ya está; Beto entra desde la izquierda
      tl.fromTo(q(".s02-tas"), { opacity: 0.6, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(q(".s02-beto"), { x: -460, opacity: 1 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, 0);
      tl.to(q(".s02-beto"), { y: -12, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      hablar(".s02b", 0.1, ${ge(2)});
      // dos locales
      pop(".s02-loc1", ${g("dos")} - 0.08, { y: 40 });
      pop(".s02-loc2", ${g("locales")} - 0.08, { y: 40 });
      pop(".s02-dos", ${g("locales")});
      tl.to(qa(".s02l-luz"), { opacity: 0.7, duration: 0.15, yoyo: true, repeat: 3 }, ${g("locales")});
      fuera(".s02-loc1, .s02-loc2, .s02-dos", ${g("jubilar")} - 0.4, 0.2);
      // jubilar: reposera, sol y mate
      pop(".s02-jub", ${g("jubilar")} - 0.15, { y: 30 });
      fuera(".s02-jub", ${g("cuanto")} - 0.15, 0.15);
      // ¿cuánto me da?
      golpe(".s02-cuanto", ${g("cuanto")});
      sacudon(${g("da")}, 0.8);
      tl.to(q(".s02b-boca"), { opacity: 0 }, ${ge(2)});
      tl.to(q(".s02b-bocaO"), { opacity: 0 }, ${ge(2)});
      tl.to(q(".s02-beto"), { rotation: -3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 100%" }, ${g("cuanto")});
      parpadeo(".s02t-ojo, .s02t-pupila", [1.6, ${g("cuanto")} + 0.6]);`,
  [[0, "chime", 0.35, 1.0], [0.2, "whoosh", 0.25], [g("dos") - 0.08, "pop", 0.3], [g("locales") - 0.08, "pop", 0.3], [g("jubilar") - 0.15, "sparkle", 0.22, 0.6], [g("cuanto") - 0.1, "impact-bass-2", 0.38, 0.6]],
];

// ===== s03-brazo: el ayudante. "Jefe, este trae el negocio abajo del brazo."
ESCENAS["s03-brazo"] = ({ dur, g, ge }) => [
  `    [data-composition-id="s03-brazo"] .s03-ayu { left: 560px; top: 820px; width: 460px; height: 632px; }
    [data-composition-id="s03-brazo"] .s03-beto { left: 30px; top: 1000px; width: 420px; height: 504px; }
    [data-composition-id="s03-brazo"] .s03-loc { left: 300px; top: 1200px; width: 270px; height: 234px; }
    [data-composition-id="s03-brazo"] .s03-glob { left: 440px; top: 630px; }
    [data-composition-id="s03-brazo"] .s03-rot { left: 70px; top: 760px; font-size: 30px; letter-spacing: 0.22em; color: ${OR}; text-transform: uppercase; white-space: nowrap; }`,
  `        <div class="s03-abs s03-beto">${beto("s03b")}</div>
        <div class="s03-abs s03-loc">${local("s03l")}</div>
        <div class="s03-abs s03-ayu">${ayudante("s03a")}</div>
        <div class="s03-globo s03-glob">¿Todo el negocio?</div>
        <div class="s03-abs s03-rot s03-mono">El ayudante · por lo bajo</div>`,
  `      tl.fromTo(q(".s03-ayu"), { x: 420, rotation: 12, opacity: 1 }, { x: 0, rotation: 0, duration: 0.35, ease: "back.out(1.6)", transformOrigin: "50% 100%" }, 0);
      tl.fromTo(q(".s03-beto"), { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
      pop(".s03-rot", 0.1, { y: 10 });
      hablar(".s03a", 0.05, ${ge(3)});
      // abajo del brazo: el local entero
      pop(".s03-loc", ${g("negocio")} - 0.1, { s: 0.3, r: -20 });
      tl.to(q(".s03-loc"), { rotation: -6, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "20% 80%" }, ${g("brazo")});
      tl.to(q(".s03b-gota"), { opacity: 1, duration: 0.15 }, ${g("brazo")});
      tl.fromTo(q(".s03b-gota"), { y: 0 }, { y: 30, duration: 0.7, ease: "power1.in" }, ${g("brazo")});
      pop(".s03-glob", ${g("negocio")}, { s: 0.6 });
      fuera(".s03-glob", ${dur} - 0.5, 0.2);
      tl.to(q(".s03a-chicle"), { opacity: 1, duration: 0.05 }, ${ge(3)} + 0.05);
      tl.fromTo(q(".s03a-chicle"), { scale: 0.2, transformOrigin: "50% 50%" }, { scale: 1.2, duration: 0.5, ease: "power1.out", immediateRender: false }, ${ge(3)} + 0.05);`,
  [[0, "whoosh", 0.3], [g("negocio") - 0.1, "pop", 0.35], [g("brazo"), "click-soft", 0.3], [ge(3) + 0.05, "pop", 0.2]],
];

// ===== s04-cuaderno: Pieza uno. Lupa sobre el cuaderno.
const garabatos = (x, y, n, w) => Array.from({ length: n }, (_, i) => { const yy = y + i * 34; const ww = w - (i * 37) % 90; return `<path d="M${x} ${yy} c${ww * 0.1} -10 ${ww * 0.15} 10 ${ww * 0.25} 0 s${ww * 0.15} -12 ${ww * 0.25} 2 s${ww * 0.2} 8 ${ww * 0.3} -4 s${ww * 0.1} 6 ${ww * 0.2} 0" fill="none" stroke="${N1}" stroke-width="4" stroke-linecap="round" />`; }).join("");
ESCENAS["s04-cuaderno"] = ({ dur, g, gp }) => [
  `    [data-composition-id="s04-cuaderno"] .s04-cua { left: 90px; top: 700px; width: 900px; height: 600px; }
    [data-composition-id="s04-cuaderno"] .s04-lupa { left: 300px; top: 640px; width: 520px; height: 640px; }
    [data-composition-id="s04-cuaderno"] .s04-desc { top: 1300px; }`,
  `        <div class="s04-pieza"><b>Pieza 1</b>Cuaderno de stock</div>
        <div class="s04-abs s04-cua"><svg viewBox="0 0 900 600" aria-hidden="true">
          <path d="M40 80 L440 60 V560 L40 580 Z" fill="${CR}" ${st} /><path d="M460 60 L860 80 V580 L460 560 Z" fill="${CR}" ${st} />
          <path d="M440 60 C445 50 455 50 460 60 V560 C455 570 445 570 440 560" fill="${OR}" ${st} />
          <path d="M120 90 V570" stroke="${RO}" stroke-width="3" opacity="0.6" />
          ${garabatos(140, 140, 12, 260)}${garabatos(500, 140, 12, 300)}
          <circle cx="660" cy="430" r="46" fill="none" stroke="${N2}" stroke-width="10" opacity="0.45" />
          <path d="M560 300 l40 40 m0 -40 l-40 40" stroke="${RO}" stroke-width="6" stroke-linecap="round" />
        </svg></div>
        <div class="s04-abs s04-lupa"><svg viewBox="0 0 520 640" aria-hidden="true">
          <defs><clipPath id="s04-vidrio"><circle cx="230" cy="230" r="196" /></clipPath></defs>
          <circle cx="230" cy="230" r="196" fill="${CR}" />
          <g clip-path="url(#s04-vidrio)">
            <text x="60" y="140" style="font-family: 'Lexend', sans-serif; font-weight: 300; font-size: 54px; fill: ${N1}; font-style: italic">Coca: los de</text>
            <text x="70" y="214" style="font-family: 'Lexend', sans-serif; font-weight: 300; font-size: 54px; fill: ${N1}; font-style: italic">siempre (ver</text>
            <text x="64" y="288" style="font-family: 'Lexend', sans-serif; font-weight: 300; font-size: 54px; fill: ${N1}; font-style: italic">lo de Ramírez)</text>
            <path d="M60 330 c40 -20 60 20 100 0 s60 -20 100 4 s50 10 90 -8" fill="none" stroke="${N1}" stroke-width="7" stroke-linecap="round" />
            <path d="M80 380 c40 -20 60 20 100 0 s60 -20 100 4" fill="none" stroke="${N1}" stroke-width="7" stroke-linecap="round" />
          </g>
          <circle cx="230" cy="230" r="196" fill="${AZ}" opacity="0.08" />
          <circle cx="230" cy="230" r="196" fill="none" stroke="${OR}" stroke-width="22" />
          <path d="M370 370 L480 600" stroke="${N2}" stroke-width="44" stroke-linecap="round" /><path d="M370 370 L480 600" fill="none" ${st} stroke-width="6" />
          <path d="M120 120 Q150 80 200 74" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.5" />
        </svg></div>
        ${tag("s04", "s04-t1", 790, 600, 460, 90, 26, "Escritura antigua", 36)}
        <div class="s04-sello s04-desc"><b>No se tasa: se descifra</b></div>`,
  `      // cuadro 0: el cuaderno ya abierto, entra la lupa
      tl.fromTo(q(".s04-cua"), { opacity: 0.7, y: 40, rotation: -3 }, { opacity: 1, y: 0, rotation: -2, duration: 0.4, ease: "power2.out" }, 0);
      pop(".s04-pieza", 0.0, { x: -40, s: 1 });
      pop(".s04-lupa", ${g("cuaderno")} - 0.1, { s: 0.5, r: -20 });
      tl.to(q(".s04-lupa"), { x: -120, y: 30, duration: 0.9, ease: "sine.inOut" }, ${g("cuaderno")} + 0.3);
      tl.to(q(".s04-lupa"), { x: 60, y: -20, duration: 1.1, ease: "sine.inOut" }, ${g("cuaderno")} + 1.2);
      // escritura antigua: etiqueta colgante
      pop(".s04-t1", ${g("escritura")} - 0.1, { y: -80, s: 1, e: "power2.out", d: 0.25 });
      hamaca(".s04-t1", ${g("escritura")} + 0.15, 9, 3);
      tl.to(q(".s04-lupa"), { opacity: 0.3, duration: 0.2 }, ${g("tasa")} - 0.25);
      golpe(".s04-desc", ${g("tasa")}, 2.2);
      sacudon(${g("descifra")} + 0.05);`,
  [[0.0, "click", 0.3], [g("cuaderno") - 0.1, "whoosh", 0.25], [g("escritura") - 0.1, "pop", 0.3], [g("descifra") - 0.05, "impact-bass-1", 0.42, 0.6]],
];

// ===== s05-excel: Pieza dos, la planilla "precios final final v3" + el ayudante.
ESCENAS["s05-excel"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s05-excel"] .s05-hoja { left: 90px; top: 660px; width: 900px; height: 640px; background: ${CR}; border-radius: 18px; border: 6px solid ${CR}; overflow: hidden; }
    [data-composition-id="s05-excel"] .s05-barra { position: absolute; left: 0; right: 0; top: 0; height: 70px; background: ${N2}; display: flex; align-items: center; gap: 12px; padding-left: 24px; }
    [data-composition-id="s05-excel"] .s05-barra i { width: 18px; height: 18px; border-radius: 50%; background: ${CR}; opacity: 0.6; }
    [data-composition-id="s05-excel"] .s05-arch { position: absolute; left: 24px; right: 24px; top: 92px; height: 70px; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 36px; color: ${N0}; white-space: nowrap; border: 4px dashed ${N2}; border-radius: 10px; }
    [data-composition-id="s05-excel"] .s05-arch span { display: inline-block; }
    [data-composition-id="s05-excel"] .s05-arch .ro { color: ${RO}; }
    [data-composition-id="s05-excel"] .s05-grilla { position: absolute; left: 24px; top: 186px; }
    [data-composition-id="s05-excel"] .s05-c { position: absolute; width: 208px; height: 64px; border: 3px solid ${N2}; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: ${N1}; white-space: nowrap; }
    [data-composition-id="s05-excel"] .s05-c.r { background: rgba(255, 59, 74, 0.25); }
    [data-composition-id="s05-excel"] .s05-c.a { background: rgba(201, 162, 74, 0.35); }
    [data-composition-id="s05-excel"] .s05-ayu { left: 700px; top: 1060px; width: 330px; height: 454px; }
    [data-composition-id="s05-excel"] .s05-glob { left: 150px; top: 1150px; }`,
  `        <div class="s05-pieza"><b>Pieza 2</b>Planilla de precios</div>
        <div class="s05-abs s05-hoja">
          <div class="s05-barra"><i></i><i></i><i></i></div>
          <div class="s05-arch"><span>precios_</span><span class="s05-f1 ro">final_</span><span class="s05-f2 ro">final_</span><span class="s05-v3 ro">v3</span><span>.xls</span></div>
          <div class="s05-grilla">${[["Coca", "????", "ver"], ["Agua", "#####", "llamar"], ["Vino", "=¿?", "ojo"], ["Hielo", "como", "siempre"], ["Cerveza", "#REF!", "¿?"], ["Fernet", "Beto", "sabe"]]
            .map((fila, i) => fila.map((c, j) => `<div class="s05-c s05-cel${(i * 3 + j) % 4 === 1 ? " r" : (i + j) % 5 === 0 ? " a" : ""}" style="left:${j * 280}px;top:${i * 70}px">${c}</div>`).join("")).join("")}</div>
        </div>
        <div class="s05-abs s05-ayu">${ayudante("s05a")}</div>
        <div class="s05-globo az s05-glob">Nunca es la final</div>`,
  `      tl.fromTo(q(".s05-hoja"), { opacity: 0.6, scale: 0.9, rotation: 2 }, { opacity: 1, scale: 1, rotation: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      pop(".s05-pieza", 0.0, { x: -40, s: 1 });
      pop(".s05-cel", 0.15, { s: 0.6, st: 0.03, d: 0.2 });
      // el nombre del archivo: cada "final" cae
      gsap.set([q(".s05-f1"), q(".s05-f2"), q(".s05-v3")], { opacity: 0 });
      golpe(".s05-f1", ${g("final")});
      golpe(".s05-f2", ${g("final", 1)});
      golpe(".s05-v3", ${g("version")});
      sacudon(${g("tres")}, 0.6);
      tl.to(q(".s05-hoja"), { rotation: -1, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      // el ayudante asoma
      tl.fromTo(q(".s05-ayu"), { y: 460 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, ${gp(6)} - 0.3);
      hablar(".s05a", ${gp(6)}, ${ge(6)});
      pop(".s05-glob", ${g("nunca")} - 0.05, { s: 0.6, x: 40 });
      tl.to(q(".s05-glob"), { rotation: -3, duration: 0.2, yoyo: true, repeat: 3 }, ${g("nunca")} + 0.3);`,
  [[0, "pop", 0.3], [g("final") - 0.05, "key-press", 0.4], [g("final", 1) - 0.05, "key-press", 0.4], [g("version") - 0.05, "key-press", 0.4], [g("tres"), "glitch-1", 0.22, 0.4], [gp(6) - 0.3, "whoosh-short", 0.3], [g("nunca"), "pop", 0.3]],
];

// ===== s06-caja: Pieza tres, la registradora. "¿Cierra?" "Más o menos." "Más o menos no cotiza."
ESCENAS["s06-caja"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s06-caja"] .s06-caja { left: 160px; top: 690px; width: 620px; height: 660px; }
    [data-composition-id="s06-caja"] .s06-cierra { top: 592px; left: 470px; right: auto; width: 500px; font-size: 96px; color: ${OR}; transform-origin: 50% 50%; }
    [data-composition-id="s06-caja"] .s06-cot { top: 1260px; }
    [data-composition-id="s06-caja"] .s06-beto { left: 700px; top: 980px; width: 380px; height: 456px; }`,
  `        <div class="s06-pieza"><b>Pieza 3</b>La caja</div>
        <div class="s06-abs s06-caja"><svg viewBox="0 0 620 660" aria-hidden="true">
          <rect x="140" y="20" width="340" height="120" rx="16" fill="${N0}" stroke="${OR}" stroke-width="8" />
          <text class="s06-d0" x="310" y="100" text-anchor="middle" style="font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 52px; fill: ${VE}">0 0 0 0</text>
          <text class="s06-d1" x="310" y="96" text-anchor="middle" opacity="0" style="font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 44px; fill: ${RO}">MÁS O MENOS</text>
          <path d="M260 140 V180 M360 140 V180" stroke="${OR}" stroke-width="10" />
          <path d="M60 180 H560 L600 520 H20 Z" fill="${N2}" stroke="${OR}" stroke-width="8" stroke-linejoin="round" />
          ${Array.from({ length: 12 }, (_, i) => `<circle class="s06-tecla" cx="${150 + (i % 4) * 80}" cy="${250 + Math.floor(i / 4) * 80}" r="28" fill="${CR}" stroke="${N0}" stroke-width="4" />`).join("")}
          <path d="M490 220 h50 v200 h-50 z" fill="${RO}" ${st} />
          <path class="s06-palanca" d="M600 300 C640 300 650 240 640 200" fill="none" stroke="${OR}" stroke-width="12" stroke-linecap="round" /><circle cx="640" cy="196" r="20" fill="${RO}" />
          <g class="s06-cajon"><rect x="40" y="520" width="540" height="110" rx="8" fill="${N1}" stroke="${OR}" stroke-width="8" /><rect x="250" y="560" width="120" height="22" rx="10" fill="${OR}" /></g>
        </svg></div>
        <div class="s06-big s06-cierra">¿Cierra?</div>
        <div class="s06-abs s06-beto">${beto("s06b")}</div>
        <div class="s06-sello s06-cot"><b>Más o menos no cotiza</b></div>`,
  `      tl.fromTo(q(".s06-caja"), { opacity: 0.6, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      pop(".s06-pieza", 0.0, { x: -40, s: 1 });
      // teclas
      qa(".s06-tecla").forEach((k, i) => tl.to(k, { opacity: 0.45, duration: 0.06, yoyo: true, repeat: 1 }, 0.3 + i * 0.07));
      golpe(".s06-cierra", ${g("cierra")});
      tl.to(q(".s06-cierra"), { rotation: -4, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${g("cierra")} + 0.2);
      // Beto asoma, incómodo
      tl.fromTo(q(".s06-beto"), { x: 420 }, { x: 0, duration: 0.3, ease: "back.out(1.4)" }, ${gp(8)} - 0.35);
      hablar(".s06b", ${gp(8)}, ${ge(8)});
      tl.to(q(".s06b-gota"), { opacity: 1, duration: 0.1 }, ${gp(8)});
      tl.fromTo(q(".s06b-gota"), { y: 0 }, { y: 40, duration: 0.8, ease: "power1.in", immediateRender: false }, ${gp(8)});
      // el visor dice MÁS O MENOS; el cajón se abre y se cierra mal
      tl.to(q(".s06-d0"), { opacity: 0, duration: 0.05 }, ${gp(8)});
      tl.to(q(".s06-d1"), { opacity: 1, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)" }, ${gp(8)});
      tl.set(q(".s06-d1"), { opacity: 1 }, ${gp(8)} + 0.4);
      tl.to(q(".s06-cajon"), { y: 50, duration: 0.15, ease: "power2.out" }, ${gp(8)} + 0.1);
      tl.to(q(".s06-cajon"), { y: 20, duration: 0.2, yoyo: true, repeat: 2, ease: "sine.inOut" }, ${gp(8)} + 0.3);
      fuera(".s06-cierra", ${gp(8)} - 0.1, 0.15);
      golpe(".s06-cot", ${g("mas", 1)}, 2.2);
      sacudon(${g("cotiza")} + 0.05);`,
  [[0, "click", 0.3], [0.3, "typing", 0.22, 0.8], [g("cierra") - 0.05, "pop", 0.32], [gp(8) + 0.1, "chime", 0.3, 0.6], [g("cotiza") - 0.05, "impact-bass-1", 0.42, 0.6]],
];

// ===== s07-enlatado: Pieza cuatro, el sistema enlatado. "¿Maneja los dos locales?" "No. Eso no lo hace."
ESCENAS["s07-enlatado"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s07-enlatado"] .s07-lata { left: 330px; top: 700px; width: 420px; height: 520px; }
    [data-composition-id="s07-enlatado"] .s07-l1 { left: 60px; top: 760px; width: 250px; height: 216px; }
    [data-composition-id="s07-enlatado"] .s07-l2 { left: 770px; top: 760px; width: 250px; height: 216px; }
    [data-composition-id="s07-enlatado"] .s07-no { top: 1220px; }`,
  `        <div class="s07-pieza"><b>Pieza 4</b>Sistema enlatado</div>
        <div class="s07-abs s07-l1">${local("s07l", "LOCAL 1")}</div>
        <div class="s07-abs s07-l2">${local("s07l", "LOCAL 2")}</div>
        <svg class="s07-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s07-cable" d="M310 880 C360 880 360 900 400 900" fill="none" stroke="${OR}" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 18" />
          <path class="s07-cable" d="M770 880 C720 880 720 900 680 900" fill="none" stroke="${OR}" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 18" />
          <g class="s07-x"><path d="M215 690 l60 60 m0 -60 l-60 60" stroke="${RO}" stroke-width="14" stroke-linecap="round" /><path d="M805 690 l60 60 m0 -60 l-60 60" stroke="${RO}" stroke-width="14" stroke-linecap="round" /></g>
        </svg>
        <div class="s07-abs s07-lata"><svg viewBox="0 0 420 520" aria-hidden="true">
          <ellipse cx="210" cy="60" rx="170" ry="44" fill="${N2}" ${st} />
          <path d="M40 60 V460 C40 520 380 520 380 460 V60" fill="${N1}" ${st} />
          <path d="M40 150 C40 200 380 200 380 150 V360 C380 410 40 410 40 360 Z" fill="${CR}" />
          <text x="210" y="262" text-anchor="middle" style="font-family: 'Lexend', sans-serif; font-weight: 900; font-size: 58px; fill: ${N0}">SISTEMA</text>
          <text x="210" y="318" text-anchor="middle" style="font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 30px; fill: ${RO}">TALLE ÚNICO</text>
          <path d="M60 110 C130 130 290 130 360 110" fill="none" stroke="${CR}" stroke-width="4" opacity="0.5" />
          <g class="s07-tapa"><ellipse cx="210" cy="60" rx="170" ry="44" fill="${OR}" ${st} /><path d="M150 50 C170 30 250 30 270 50" fill="none" stroke="${N0}" stroke-width="10" stroke-linecap="round" /></g>
        </svg></div>
        <div class="s07-sello s07-no"><b>Eso no lo hace</b></div>`,
  `      pop(".s07-pieza", 0.0, { x: -40, s: 1 });
      tl.fromTo(q(".s07-lata"), { opacity: 0.6, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "bounce.out" }, 0);
      tl.to(q(".s07-tapa"), { y: -40, rotation: -14, duration: 0.25, ease: "back.out(2)", transformOrigin: "10% 50%" }, ${g("enlatado")});
      tl.to(q(".s07-tapa"), { y: 0, rotation: 0, duration: 0.2 }, ${g("enlatado")} + 0.6);
      pop(".s07-l1", ${g("dos")} - 0.1, { y: 30 });
      pop(".s07-l2", ${g("locales")} - 0.1, { y: 30 });
      dibujar(".s07-cable", ${g("locales")} + 0.2, 0.4);
      gsap.set(q(".s07-x"), { opacity: 0 });
      tl.to(q(".s07-x"), { opacity: 1, duration: 0.05 }, ${gp(10)});
      tl.fromTo(qa(".s07-x path"), { scale: 0.2, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, ${gp(10)});
      tl.to(qa(".s07-cable"), { opacity: 0, duration: 0.05, yoyo: true, repeat: 3, ease: "steps(1)" }, ${gp(10)});
      tl.to(q(".s07-lata"), { rotation: 4, duration: 0.08, yoyo: true, repeat: 5 }, ${gp(10)});
      golpe(".s07-no", ${g("eso")}, 2.2);
      sacudon(${g("hace")} - 0.25);`,
  [[0, "impact-bass-2", 0.3, 0.5], [g("enlatado"), "pop", 0.3], [g("dos") - 0.1, "pop", 0.25], [g("locales") - 0.1, "pop", 0.25], [gp(10), "glitch-1", 0.3, 0.4], [g("hace") - 0.35, "impact-bass-1", 0.4, 0.6]],
];

// ===== s08-quien: "Última pregunta. ¿Todo esto quién lo sabe usar?" "Yo."
ESCENAS["s08-quien"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s08-quien"] .s08-tas { left: 150px; top: 640px; width: 780px; height: 917px; }
    [data-composition-id="s08-quien"] .s08-preg { top: 600px; font-size: 92px; color: ${OR}; }
    [data-composition-id="s08-quien"] .s08-beto { left: 180px; top: 680px; width: 720px; height: 864px; }
    [data-composition-id="s08-quien"] .s08-yo { top: 640px; font-size: 300px; }
    [data-composition-id="s08-quien"] .s08-ult { left: 70px; top: 572px; font-size: 30px; letter-spacing: 0.22em; color: ${RO}; text-transform: uppercase; white-space: nowrap; }`,
  `        <div class="s08-abs s08-tas">${tasador("s08t")}</div>
        <div class="s08-big s08-preg">¿Quién lo sabe usar?</div>
        <div class="s08-abs s08-beto">${beto("s08b")}</div>
        <div class="s08-big s08-neon s08-yo">Yo</div>
`,
  `      // primer plano del tasador; se saca la lupa
      tl.fromTo(q(".s08-tas"), { opacity: 0.6, scale: 1.1 }, { opacity: 1, scale: 1.15, duration: ${gp(12)}, ease: "none", transformOrigin: "50% 30%" }, 0);
      hablar(".s08t", 0.05, ${ge(11)});
      tl.to(q(".s08t-lupa"), { y: -120, x: 60, rotation: 20, opacity: 0, duration: 0.5, ease: "power2.in" }, ${g("todo")} - 0.2);
      tl.to(q(".s08t-cejas"), { y: 10, duration: 0.2 }, ${g("quien")});
      golpe(".s08-preg", ${g("quien")});
      // corte a Beto: "Yo."
      tl.set(q(".s08-tas"), { opacity: 0 }, ${gp(12)} - 0.15);
      tl.set(q(".s08-preg"), { opacity: 0 }, ${gp(12)} - 0.15);
      gsap.set(q(".s08-beto"), { opacity: 0 });
      tl.fromTo(q(".s08-beto"), { opacity: 1, scale: 1.25 }, { scale: 1.15, duration: 0.3, ease: "power3.out", transformOrigin: "50% 30%", immediateRender: false }, ${gp(12)} - 0.15);
      hablar(".s08b", ${gp(12)}, ${ge(12)}, 0.1);
      golpe(".s08-yo", ${gp(12)} + 0.05, 2.6);
      sacudon(${gp(12)} + 0.08, 1.2);
      tl.to(q(".s08-beto"), { scale: 1.2, duration: 0.8, ease: "sine.out" }, ${gp(12)} + 0.3);`,
  [[0.05, "click-soft", 0.3], [g("todo") - 0.2, "whoosh-short", 0.3], [g("quien") - 0.1, "pop", 0.32], [gp(12) - 0.1, "impact-bass-2", 0.45, 0.7]],
];

// ===== s09-cero: "Entonces lo que usted vende... es usted. Y sin usted, vale cero."
ESCENAS["s09-cero"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s09-cero"] .s09-beto { left: 290px; top: 760px; width: 500px; height: 600px; }
    [data-composition-id="s09-cero"] .s09-vende { top: 590px; font-size: 76px; }
    [data-composition-id="s09-cero"] .s09-sello { top: 1250px; }
    [data-composition-id="s09-cero"] .s09-sello b { font-size: 64px; border-width: 9px; }
    [data-composition-id="s09-cero"] .s09-vit { left: 230px; top: 720px; width: 620px; height: 680px; }`,
  `        <div class="s09-abs s09-vit"><svg viewBox="0 0 620 680" aria-hidden="true"><rect x="10" y="10" width="600" height="660" rx="20" fill="${AZ}" opacity="0.07" /><path class="s09-marco" d="M10 670 V30 Q10 10 30 10 H590 Q610 10 610 30 V670" fill="none" stroke="${OR}" stroke-width="8" stroke-linecap="round" /><path d="M60 60 L180 180 M100 40 L240 180" stroke="${CR}" stroke-width="6" stroke-linecap="round" opacity="0.25" /></svg></div>
        <div class="s09-abs s09-beto">${beto("s09b")}</div>
        <div class="s09-big s09-vende">Lo que vende <span class="s09-oro">es usted</span></div>
        ${tag("s09", "s09-t", 770, 860, 250, 110, 120, "Beto", 54)}
        <div class="s09-sello"><b>Sin usted: cero</b></div>`,
  `      // Beto adentro de la vitrina, como una pieza más
      dibujar(".s09-marco", 0, 0.5);
      tl.fromTo(q(".s09-beto"), { opacity: 0.6, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0);
      gsap.set(q(".s09-oro"), { opacity: 0 });
      pop(".s09-vende", ${g("vende")} - 0.15, { s: 0.7 });
      golpe(".s09-oro", ${g("usted", 1)} - 0.05);
      tl.set(qa(".s09b-cejas"), { opacity: 0 }, ${g("usted", 1)});
      tl.set(qa(".s09b-cejasI"), { opacity: 1 }, ${g("usted", 1)});
      // la etiqueta con el nombre de Beto le cuelga del cuello
      pop(".s09-t", ${g("usted", 1)} + 0.1, { y: -120, s: 1, e: "power2.out", d: 0.25 });
      hamaca(".s09-t", ${g("usted", 1)} + 0.35, 10, 4);
      golpe(".s09-sello", ${g("cero")}, 2.6);
      sacudon(${g("cero")} + 0.05, 1.4);
      tl.to(q(".s09b-gota"), { opacity: 1, duration: 0.1 }, ${g("cero")} + 0.2);
      tl.fromTo(q(".s09b-gota"), { y: 0 }, { y: 40, duration: 0.8, ease: "power1.in", immediateRender: false }, ${g("cero")} + 0.2);`,
  [[0, "whoosh", 0.25], [g("vende") - 0.15, "pop", 0.3], [g("usted", 1) - 0.05, "impact-bass-2", 0.35, 0.6], [g("usted", 1) + 0.1, "chime", 0.25, 0.6], [g("cero") - 0.05, "impact-bass-1", 0.45, 0.7]],
];

// ===== s10-alfajor: "Jefe, ¿le ofrezco cincuenta y un alfajor?" "¡¿Un alfajor?!"
ESCENAS["s10-alfajor"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s10-alfajor"] .s10-ayu { left: 600px; top: 830px; width: 440px; height: 605px; }
    [data-composition-id="s10-alfajor"] .s10-beto { left: 30px; top: 900px; width: 460px; height: 552px; }
    [data-composition-id="s10-alfajor"] .s10-alf { left: 380px; top: 1180px; width: 320px; height: 220px; }
    [data-composition-id="s10-alfajor"] .s10-ofer { left: 320px; top: 620px; }
    [data-composition-id="s10-alfajor"] .s10-grito { top: 700px; font-size: 104px; }`,
  `        <div class="s10-abs s10-beto">${beto("s10b")}</div>
        <div class="s10-abs s10-ayu">${ayudante("s10a")}</div>
        <div class="s10-globo az s10-ofer">¿Cincuenta y un alfajor?</div>
        <div class="s10-abs s10-alf"><svg viewBox="0 0 320 220" aria-hidden="true">
          <ellipse cx="160" cy="150" rx="140" ry="44" fill="${N0}" ${st} />
          <path d="M20 120 V150 C20 210 300 210 300 150 V120" fill="${OR}" ${st} />
          <ellipse cx="160" cy="118" rx="140" ry="44" fill="${N1}" ${st} />
          <path d="M60 104 C100 90 140 96 160 110 M180 96 C210 90 240 96 262 110" fill="none" stroke="${CR}" stroke-width="5" stroke-linecap="round" opacity="0.6" />
        </svg></div>
        ${tag("s10", "s10-t", 540, 1040, 220, 70, 40, "Oferta", 34)}
        <div class="s10-big s10-neon s10-grito">¡¿Un alfajor?!</div>`,
  `      tl.fromTo(q(".s10-ayu"), { opacity: 0.6, x: 60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 0);
      tl.fromTo(q(".s10-beto"), { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
      hablar(".s10a", 0.05, ${ge(14)});
      pop(".s10-ofer", ${g("ofrezco")} - 0.1, { s: 0.6, x: 60 });
      pop(".s10-alf", ${g("alfajor")} - 0.15, { y: -200, s: 1, e: "bounce.out", d: 0.45 });
      pop(".s10-t", ${g("alfajor")} + 0.2, { y: -60, s: 1, d: 0.2, e: "power2.out" });
      hamaca(".s10-t", ${g("alfajor")} + 0.4, 10, 2, 0.4);
      // Beto se indigna
      fuera(".s10-ofer", ${gp(15)} - 0.15, 0.12);
      tl.set(qa(".s10b-cejas"), { opacity: 0 }, ${gp(15)});
      tl.set(qa(".s10b-cejasI"), { opacity: 1 }, ${gp(15)});
      tl.set(q(".s10b-boca"), { opacity: 0 }, ${gp(15)});
      tl.set(q(".s10b-bocaO"), { opacity: 1 }, ${gp(15)});
      golpe(".s10-grito", ${gp(15)} + 0.05, 2.2);
      sacudon(${gp(15)} + 0.08, 1.4);
      tl.to(q(".s10-beto"), { y: -40, duration: 0.15, yoyo: true, repeat: 3, ease: "power1.out" }, ${gp(15)});
      tl.to(q(".s10a-boca"), { opacity: 0, duration: 0.01 }, ${ge(14)} + 0.1);
      tl.set(q(".s10a-chicle"), { opacity: 1 }, ${ge(14)} + 0.1);
      tl.fromTo(q(".s10a-chicle"), { scale: 0.2, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.6, immediateRender: false }, ${ge(14)} + 0.1);`,
  [[0.05, "click-soft", 0.25], [g("ofrezco") - 0.1, "pop", 0.3], [g("alfajor") - 0.1, "impact-bass-2", 0.3, 0.5], [g("alfajor") + 0.2, "ping", 0.25], [gp(15), "glitch-1", 0.32, 0.4]],
];

// ===== s11-vale: GIRO. "Ojo, Beto: su negocio vale un montón. Los clientes, los proveedores, el nombre en el barrio."
const iconoClientes = `<svg viewBox="0 0 220 180" aria-hidden="true"><circle cx="70" cy="56" r="30" fill="${N1}" ${st} /><path d="M20 170 C20 120 120 120 120 170" fill="${N2}" ${st} /><circle cx="150" cy="56" r="30" fill="${N1}" ${st} /><path d="M100 170 C100 120 200 120 200 170" fill="${N2}" ${st} /></svg>`;
const iconoCamion = `<svg viewBox="0 0 240 180" aria-hidden="true"><rect x="10" y="40" width="140" height="100" rx="8" fill="${N2}" ${st} /><path d="M150 70 H200 L230 110 V140 H150 Z" fill="${N1}" ${st} /><circle cx="60" cy="150" r="20" fill="${N0}" ${st} /><circle cx="190" cy="150" r="20" fill="${N0}" ${st} /><path d="M40 80 h70 M40 105 h50" stroke="${OR}" stroke-width="6" stroke-linecap="round" /></svg>`;
ESCENAS["s11-vale"] = ({ dur, g }) => [
  `    [data-composition-id="s11-vale"] .s11-monton { top: 600px; font-size: 104px; color: ${OR}; }
    [data-composition-id="s11-vale"] .s11-ojo { top: 600px; font-size: 104px; }
    [data-composition-id="s11-vale"] .s11-i1 { left: 55px; top: 1080px; width: 300px; height: 245px; }
    [data-composition-id="s11-vale"] .s11-i2 { left: 395px; top: 1090px; width: 300px; height: 225px; }
    [data-composition-id="s11-vale"] .s11-i3 { left: 730px; top: 1060px; width: 300px; height: 260px; }`,
  `        <div class="s11-big s11-ojo">Ojo, Beto</div>
        <div class="s11-big s11-monton">Vale un montón</div>
        ${tag("s11", "s11-t1", 205, 720, 300, 84, 250, "Clientes", 38)}
        ${tag("s11", "s11-t2", 545, 720, 330, 84, 250, "Proveedores", 31)}
        ${tag("s11", "s11-t3", 880, 720, 300, 84, 250, "El barrio", 38)}
        <div class="s11-abs s11-i1">${iconoClientes}</div>
        <div class="s11-abs s11-i2">${iconoCamion}</div>
        <div class="s11-abs s11-i3">${local("s11l", "DE BETO")}</div>`,
  `      golpe(".s11-ojo", 0.12, 1.5);
      fuera(".s11-ojo", ${g("vale")} - 0.2, 0.15);
      golpe(".s11-monton", ${g("monton")} - 0.2, 1.6);
      tl.to(q(".s11-monton"), { scale: 1.06, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${g("monton")} + 0.2);
      [["s11-t1", "s11-i1", "clientes"], ["s11-t2", "s11-i2", "proveedores"], ["s11-t3", "s11-i3", "barrio"]].forEach(([t, i, w], k) => {
        const tt = [${g("clientes")}, ${g("proveedores")}, ${g("barrio")}][k];
        pop("." + i, tt - 0.12, { y: 40 });
        pop("." + t, tt - 0.05, { y: -120, s: 1, e: "power2.out", d: 0.25 });
        hamaca("." + t, tt + 0.2, 8, 2, 0.45);
      });
      tl.to(qa(".s11l-luz"), { opacity: 0.8, duration: 0.2, yoyo: true, repeat: 3 }, ${g("barrio")});`,
  [[0.05, "whoosh", 0.25], [g("monton") - 0.2, "sparkle", 0.35, 0.8], [g("clientes") - 0.1, "chime", 0.25, 0.5], [g("proveedores") - 0.1, "chime", 0.25, 0.5], [g("barrio") - 0.1, "chime", 0.25, 0.5]],
];

// ===== s12-depende: "Lo que no vale es que dependa de usted."
ESCENAS["s12-depende"] = ({ dur, g }) => [
  `    [data-composition-id="s12-depende"] .s12-beto { left: 330px; top: 1000px; width: 420px; height: 504px; }
    [data-composition-id="s12-depende"] .s12-i1 { left: 60px; top: 730px; width: 230px; height: 188px; }
    [data-composition-id="s12-depende"] .s12-i2 { left: 425px; top: 700px; width: 230px; height: 173px; }
    [data-composition-id="s12-depende"] .s12-i3 { left: 790px; top: 710px; width: 230px; height: 200px; }
    [data-composition-id="s12-depende"] .s12-sello { top: 590px; }`,
  `        <svg class="s12-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s12-hilo" d="M540 1080 C420 1000 250 960 175 920" fill="none" stroke="${OR}" stroke-width="5" stroke-linecap="round" />
          <path class="s12-hilo" d="M540 1080 C540 990 540 920 540 875" fill="none" stroke="${OR}" stroke-width="5" stroke-linecap="round" />
          <path class="s12-hilo" d="M540 1080 C660 1000 830 960 905 912" fill="none" stroke="${OR}" stroke-width="5" stroke-linecap="round" />
        </svg>
        <div class="s12-abs s12-i1">${iconoClientes}</div>
        <div class="s12-abs s12-i2">${iconoCamion}</div>
        <div class="s12-abs s12-i3">${local("s12l", "DE BETO")}</div>
        <div class="s12-abs s12-beto">${beto("s12b")}</div>
        <div class="s12-sello"><b>Todo cuelga de Beto</b></div>`,
  `      tl.fromTo(qa(".s12-i1, .s12-i2, .s12-i3"), { opacity: 0.7, y: 0 }, { opacity: 1, y: 0, duration: 0.2 }, 0);
      tl.fromTo(q(".s12-beto"), { y: 300 }, { y: 0, duration: 0.4, ease: "back.out(1.4)" }, 0.05);
      dibujar(".s12-hilo", ${g("dependa")} - 0.35, 0.45, 0.06);
      golpe(".s12-sello", ${g("dependa")} - 0.1);
      // todo cuelga de Beto: se hamaca con él
      tl.to(q(".s12-esc"), { rotation: 2.5, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 60%" }, ${g("dependa")} + 0.2);
      tl.to(q(".s12b-gota"), { opacity: 1, duration: 0.1 }, ${g("dependa")});
      tl.fromTo(q(".s12b-gota"), { y: 0 }, { y: 40, duration: 0.8, ease: "power1.in", immediateRender: false }, ${g("dependa")});`,
  [[0.05, "whoosh-short", 0.25], [g("dependa") - 0.35, "whoosh-short", 0.25], [g("dependa") + 0.2, "click-soft", 0.3]],
];

// ===== s13-sistema (Orus, Scalerics): "En Scalerics te hacemos un sistema a medida, hecho para cómo trabaja tu negocio: stock, pedidos, proveedores, caja y los dos locales en un solo lugar."
ESCENAS["s13-sistema"] = ({ dur, g }) => [
  `    [data-composition-id="s13-sistema"] .s13-tit { top: 590px; font-size: 76px; color: ${VE}; }
    [data-composition-id="s13-sistema"] .s13-sub { top: 676px; font-size: 40px; font-weight: 700; color: ${CR}; letter-spacing: 0; }
    [data-composition-id="s13-sistema"] .s13-mod { position: absolute; width: 270px; height: 96px; border: 5px solid ${VE}; border-radius: 18px; background: rgba(13, 36, 26, 0.95); display: flex; align-items: center; justify-content: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; text-transform: uppercase; color: ${CR}; white-space: nowrap; }
    [data-composition-id="s13-sistema"] .s13-centro { position: absolute; left: 360px; top: 1000px; width: 360px; height: 150px; border-radius: 24px; background: ${VE}; color: ${N0}; display: flex; align-items: center; justify-content: center; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 1; text-transform: uppercase; }`,
  `        <div class="s13-big s13-tit">Sistema a medida</div>
        <div class="s13-big s13-sub">hecho para cómo trabaja tu negocio</div>
        <svg class="s13-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s13-cinta" d="M90 760 H990" stroke="${OR}" stroke-width="30" stroke-linecap="butt" />
          <path class="s13-marcas" d="${Array.from({ length: 46 }, (_, i) => `M${96 + i * 20} 746 v${i % 5 ? 12 : 24}`).join(" ")}" stroke="${N0}" stroke-width="3" />
          <path class="s13-lin" d="M540 1075 L245 905" stroke="${VE}" stroke-width="5" /><path class="s13-lin" d="M540 1075 L835 905" stroke="${VE}" stroke-width="5" />
          <path class="s13-lin" d="M540 1075 L245 1245" stroke="${VE}" stroke-width="5" /><path class="s13-lin" d="M540 1075 L835 1245" stroke="${VE}" stroke-width="5" />
          <path class="s13-lin" d="M540 1075 L540 1320" stroke="${VE}" stroke-width="5" />
        </svg>
        <div class="s13-mod s13-m1" style="left:110px;top:857px">Stock</div>
        <div class="s13-mod s13-m2" style="left:700px;top:857px">Pedidos</div>
        <div class="s13-mod s13-m3" style="left:110px;top:1197px;font-size:30px">Proveedores</div>
        <div class="s13-mod s13-m4" style="left:700px;top:1197px">Caja</div>
        <div class="s13-mod s13-m5" style="left:330px;top:1300px;width:420px">Local 1 + Local 2</div>
        <div class="s13-centro">Un solo<br />lugar</div>`,
  `      // entra el verde de Scalerics: la cinta de medir se estira
      tl.fromTo(qa(".s13-cinta, .s13-marcas"), { scaleX: 0.3, opacity: 0.7, transformOrigin: "0% 50%" }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
      golpe(".s13-tit", ${g("sistema")});
      pop(".s13-sub", ${g("hecho")} - 0.1, { y: 20, s: 1 });
      dibujar(".s13-lin", ${g("stock")} - 0.2, 0.4, 0.05);
      gsap.set(q(".s13-centro"), { opacity: 0 });
      tl.fromTo(q(".s13-centro"), { opacity: 0.25, scale: 0.8 }, { opacity: 0.25, scale: 1, duration: 0.3, immediateRender: false }, ${g("stock")} - 0.2);
      pop(".s13-m1", ${g("stock")} - 0.08);
      pop(".s13-m2", ${g("pedidos")} - 0.08);
      pop(".s13-m3", ${g("proveedores")} - 0.08);
      pop(".s13-m4", ${g("caja", 0)} - 0.08);
      pop(".s13-m5", ${g("dos")} - 0.08);
      tl.to(q(".s13-centro"), { opacity: 1, scale: 1.08, duration: 0.25, ease: "back.out(2)" }, ${g("solo")} - 0.1);
      tl.to(q(".s13-centro"), { scale: 1, duration: 0.3 }, ${g("solo")} + 0.15);
      tl.to(qa(".s13-mod"), { borderColor: "${OR}", duration: 0.1, yoyo: true, repeat: 1 }, ${g("lugar")});`,
  [[0, "sparkle", 0.3, 0.8], [g("sistema") - 0.05, "impact-bass-2", 0.35, 0.6], [g("stock") - 0.08, "pop", 0.28], [g("pedidos") - 0.08, "pop", 0.28], [g("proveedores") - 0.08, "pop", 0.28], [g("caja", 0) - 0.08, "pop", 0.28], [g("dos") - 0.08, "pop", 0.28], [g("solo") - 0.1, "chime", 0.35, 0.8]],
];

// ===== s14-camina: "Para que camine aunque vos no estés." El local con patitas; Beto en la reposera.
ESCENAS["s14-camina"] = ({ dur, g }) => [
  `    [data-composition-id="s14-camina"] .s14-loc { left: 60px; top: 780px; width: 520px; height: 607px; }
    [data-composition-id="s14-camina"] .s14-rep { left: 570px; top: 980px; width: 440px; height: 396px; }
    [data-composition-id="s14-camina"] .s14-abierto { position: absolute; left: 190px; top: 640px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 72px; text-transform: uppercase; color: ${AZ}; text-shadow: 0 0 18px rgba(74, 168, 255, 0.75), 0 0 46px rgba(74, 168, 255, 0.4); border: 5px solid ${AZ}; border-radius: 20px; padding: 6px 26px; white-space: nowrap; }`,
  `        <div class="s14-abs s14-loc"><svg viewBox="0 0 480 560" aria-hidden="true">
          <g class="s14-pata1"><path d="M150 400 L130 520 H90" fill="none" stroke="${CR}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g class="s14-pata2"><path d="M330 400 L350 520 H390" fill="none" stroke="${CR}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g transform="translate(40 30) scale(1.333)">${local("s14l", "DISTRIBUIDORA").replace(/<svg[^>]*>/, "").replace("</svg>", "")}</g>
          <circle cx="160" cy="250" r="16" fill="${VE}" /><circle cx="310" cy="250" r="16" fill="${VE}" />
        </svg></div>
        <div class="s14-abs s14-rep"><svg viewBox="0 0 400 360" aria-hidden="true">
          <path d="M60 340 L170 140 M120 340 L80 240 H280 L330 340 M170 140 L250 170 L230 240" fill="none" stroke="${AZ}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
          <g transform="translate(110 30) scale(0.42)">${beto("s14b").replace(/<svg[^>]*>/, "").replace("</svg>", "")}</g>
          <g class="s14-mate"><path d="M300 200 C300 260 360 260 360 200 Z" fill="${N2}" ${st} /><path d="M340 200 L362 150" stroke="${OR}" stroke-width="6" stroke-linecap="round" /></g>
          <circle class="s14-sol" cx="350" cy="50" r="34" fill="${OR}" />
        </svg></div>
        <div class="s14-abierto">Abierto</div>`,
  `      tl.fromTo(q(".s14-loc"), { opacity: 0.6, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 }, 0);
      tl.to(qa(".s14l-luz"), { opacity: 0.8, duration: 0.2 }, 0.1);
      // "camine": el local camina solo
      tl.to(q(".s14-loc"), { x: 70, duration: ${dur} - 0.6, ease: "none" }, ${g("camine")} - 0.1);
      tl.to(q(".s14-loc"), { y: -16, duration: 0.18, yoyo: true, repeat: Math.floor((${dur} - 0.7 - ${g("camine")}) / 0.18), ease: "sine.inOut" }, ${g("camine")} - 0.1);
      tl.to(q(".s14-pata1"), { rotation: 14, svgOrigin: "150 400", duration: 0.18, yoyo: true, repeat: Math.floor((${dur} - 0.7 - ${g("camine")}) / 0.18), ease: "sine.inOut" }, ${g("camine")} - 0.1);
      tl.to(q(".s14-pata2"), { rotation: -14, svgOrigin: "330 400", duration: 0.18, yoyo: true, repeat: Math.floor((${dur} - 0.7 - ${g("camine")}) / 0.18), ease: "sine.inOut" }, ${g("camine")} - 0.1);
      pop(".s14-abierto", ${g("camine")}, { s: 0.6 });
      tl.to(q(".s14-abierto"), { opacity: 0.4, duration: 0.05, yoyo: true, repeat: 3, ease: "steps(1)" }, ${g("camine")} + 0.4);
      // "aunque vos no estés": Beto en la reposera con el mate
      pop(".s14-rep", ${g("aunque")} - 0.1, { x: 120, s: 1 });
      tl.to(q(".s14-mate"), { rotation: -12, svgOrigin: "330 230", duration: 0.4, yoyo: true, repeat: 1 }, ${g("estes")});`,
  [[0.05, "pop", 0.25], [g("camine") - 0.1, "click-soft", 0.3], [g("camine") + 0.2, "click-soft", 0.25], [g("aunque") - 0.1, "whoosh-short", 0.25], [g("estes"), "sparkle", 0.25, 0.6]],
];

// ===== s15-guardo: el ayudante, de remate: "Y el alfajor se lo guardo."
ESCENAS["s15-guardo"] = ({ dur, g, gp, ge }) => [
  `    [data-composition-id="s15-guardo"] .s15-tas { left: 60px; top: 900px; width: 460px; height: 540px; }
    [data-composition-id="s15-guardo"] .s15-ayu { left: 580px; top: 860px; width: 440px; height: 605px; }
    [data-composition-id="s15-guardo"] .s15-alf { left: 560px; top: 1180px; width: 200px; height: 138px; }
    [data-composition-id="s15-guardo"] .s15-g2 { left: 300px; top: 660px; }`,
  `        <div class="s15-abs s15-tas">${tasador("s15t")}</div>
        <div class="s15-abs s15-ayu">${ayudante("s15a")}</div>
        <div class="s15-abs s15-alf"><svg viewBox="0 0 320 220" aria-hidden="true"><ellipse cx="160" cy="150" rx="140" ry="44" fill="${N0}" ${st} /><path d="M20 120 V150 C20 210 300 210 300 150 V120" fill="${OR}" ${st} /><ellipse cx="160" cy="118" rx="140" ry="44" fill="${N1}" ${st} /></svg></div>
        <div class="s15-globo az s15-g2">El alfajor se lo guardo</div>`,
  `      tl.fromTo(qa(".s15-tas, .s15-ayu"), { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0);
      tl.fromTo(q(".s15-alf"), { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, 0);
      hablar(".s15a", 0.03, ${ge(19)});
      pop(".s15-g2", 0.05, { s: 0.6, x: 60 });
      // el ayudante se lleva el alfajor; el tasador le guiña al que mira
      tl.to(q(".s15-alf"), { x: 160, y: -120, rotation: 20, duration: 0.4, ease: "back.in(1.4)" }, ${g("guardo")} - 0.1);
      tl.to(q(".s15-alf"), { opacity: 0, scale: 0.3, duration: 0.15 }, ${g("guardo")} + 0.3);
      tl.to(q(".s15t-ojo"), { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, ${g("guardo")} + 0.35);
      tl.to(q(".s15t-cejas"), { y: -8, duration: 0.15, yoyo: true, repeat: 1 }, ${g("guardo")} + 0.3);`,
  [[0.05, "pop", 0.28], [g("guardo") - 0.1, "whoosh-short", 0.25], [g("guardo") + 0.35, "ping", 0.25]],
];

// ===== s16-cta: "Hacete la pregunta y contestala en los comentarios: ¿tu negocio abre mañana sin vos?"
ESCENAS["s16-cta"] = ({ dur, g }) => [
  `    [data-composition-id="s16-cta"] .s16-cartel { left: 140px; top: 640px; width: 800px; height: 660px; transform-origin: 50% 0; }
    [data-composition-id="s16-cta"] .s16-hilo { position: absolute; left: 398px; top: -90px; width: 4px; height: 120px; background: ${OR}; }
    [data-composition-id="s16-cta"] .s16-carton { position: absolute; inset: 0; background: ${CR}; color: ${N0}; border-radius: 24px; clip-path: polygon(12% 0, 88% 0, 100% 12%, 100% 100%, 0 100%, 0 12%); }
    [data-composition-id="s16-cta"] .s16-aguj { position: absolute; left: 380px; top: 22px; width: 40px; height: 40px; border-radius: 50%; background: ${N0}; border: 6px solid ${OR}; }
    [data-composition-id="s16-cta"] .s16-l1 { position: absolute; left: 0; right: 0; top: 100px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.22em; text-transform: uppercase; color: ${N2}; }
    [data-composition-id="s16-cta"] .s16-l2 { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; line-height: 1.02; text-transform: uppercase; letter-spacing: -0.02em; }
    [data-composition-id="s16-cta"] .s16-l2 b { color: ${RO}; }
    [data-composition-id="s16-cta"] .s16-l3 { position: absolute; left: 50px; right: 50px; top: 520px; height: 90px; border-radius: 16px; background: ${N0}; color: ${OR}; display: flex; align-items: center; justify-content: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; text-transform: uppercase; white-space: nowrap; }`,
  `        <div class="s16-abs s16-cartel"><div class="s16-hilo"></div><div class="s16-carton">
          <div class="s16-l1">Tasación final</div>
          <div class="s16-l2">¿Tu negocio<br />abre mañana<br /><b>sin vos?</b></div>
          <div class="s16-l3">Contestá en los comentarios</div>
        </div><div class="s16-aguj"></div></div>`,
  `      tl.fromTo(q(".s16-cartel"), { opacity: 0.6, y: -260, rotation: 10 }, { opacity: 1, y: 0, rotation: -6, duration: 0.45, ease: "power2.out" }, 0);
      tl.to(q(".s16-cartel"), { rotation: 4, duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.45);
      tl.to(q(".s16-cartel"), { rotation: 0, duration: 0.8, ease: "sine.out" }, 0.45 + 0.7 * 4);
      gsap.set(qa(".s16-l1, .s16-l2, .s16-l3"), { opacity: 0 });
      pop(".s16-l1", 0.15, { y: 10, s: 1 });
      pop(".s16-l3", ${g("comentarios")} - 0.2, { s: 0.7 });
      pop(".s16-l2", ${g("negocio")} - 0.3, { s: 0.7 });
      tl.fromTo(q(".s16-l2 b"), { opacity: 0.25 }, { opacity: 1, duration: 0.1, immediateRender: false }, ${g("sin")} - 0.05);
      tl.to(q(".s16-l3"), { scale: 1.05, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${g("sin")} + 0.4);`,
  [[0, "whoosh", 0.25], [0.45, "click-soft", 0.25], [g("comentarios") - 0.2, "pop", 0.3], [g("negocio") - 0.3, "impact-bass-2", 0.35, 0.6], [g("sin"), "ping", 0.3]],
];

// ---------- ambiente: cartel de neón arriba, mostrador de vidrio abajo ----------
const amb = () => {
  const NADA = G("nada"), CERO = G("cero"), YO = GP(12), ALF = GP(15), ORUS = GP(17);
  fs.writeFileSync("compositions/ambiente.html", `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="ambiente"] .amb-capa { position: absolute; inset: 0; }
    [data-composition-id="ambiente"] .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 760px 1120px at 540px 900px, rgba(7, 18, 13, 0) 55%, rgba(7, 18, 13, 0.85) 100%); }
    [data-composition-id="ambiente"] .amb-cartel { position: absolute; left: 50px; right: 50px; top: 96px; height: 112px; border: 5px solid ${AZ}; border-radius: 22px; box-shadow: 0 0 22px rgba(74, 168, 255, 0.55), inset 0 0 22px rgba(74, 168, 255, 0.35); display: flex; align-items: center; justify-content: center; gap: 22px; background: rgba(7, 18, 13, 0.6); }
    [data-composition-id="ambiente"] .amb-cartel span { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; letter-spacing: 0.06em; color: ${RO}; text-shadow: 0 0 14px rgba(255, 59, 74, 0.9), 0 0 38px rgba(255, 59, 74, 0.5); white-space: nowrap; }
    [data-composition-id="ambiente"] .amb-cartel i { width: 14px; height: 14px; border-radius: 50%; background: ${AZ}; box-shadow: 0 0 14px ${AZ}; }
    [data-composition-id="ambiente"] .amb-rojo { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 700px 900px at 540px 960px, rgba(255, 59, 74, 0) 30%, rgba(255, 59, 74, 0.35) 100%); }
    [data-composition-id="ambiente"] .amb-mostrador { position: absolute; left: 0; top: 1440px; width: 1080px; height: 480px; }
    [data-composition-id="ambiente"] .amb-rotulo { position: absolute; left: 70px; top: 1650px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.2em; color: ${OR}; opacity: 0.6; white-space: nowrap; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-vineta"></div>
      <div class="amb-rojo"></div>
      <div class="amb-cartel"><span class="amb-w1">COMPRO</span><i></i><span class="amb-w2">TASO</span><i></i><span class="amb-w3">VENDO</span></div>
      <svg class="amb-mostrador" viewBox="0 0 1080 480" aria-hidden="true">
        <rect x="0" y="0" width="1080" height="480" fill="${N0}" opacity="0.92" />
        <rect x="0" y="0" width="1080" height="480" fill="${AZ}" opacity="0.06" />
        <path d="M0 6 H1080" stroke="${OR}" stroke-width="10" />
        <path d="M0 22 H1080" stroke="${CR}" stroke-width="3" opacity="0.3" />
        <path d="M120 60 L60 200 M180 60 L120 200 M720 60 L660 200 M780 60 L720 200" stroke="${CR}" stroke-width="4" opacity="0.12" stroke-linecap="round" />
        <g opacity="0.55">
          <circle cx="260" cy="150" r="26" fill="none" stroke="${OR}" stroke-width="6" /><path d="M250 124 l10 -14 l10 14" fill="${AZ}" />
          <circle cx="360" cy="150" r="34" fill="none" stroke="${OR}" stroke-width="6" /><path d="M360 132 V150 L374 160" stroke="${OR}" stroke-width="4" stroke-linecap="round" fill="none" />
          <path d="M440 170 C470 120 520 120 550 170" fill="none" stroke="${OR}" stroke-width="5" /><circle cx="495" cy="174" r="12" fill="${RO}" />
          <rect x="820" y="120" width="70" height="60" rx="8" fill="none" stroke="${CR}" stroke-width="4" /><path d="M830 150 h50" stroke="${CR}" stroke-width="3" />
          <circle cx="620" cy="160" r="20" fill="none" stroke="${OR}" stroke-width="5" /><circle cx="660" cy="160" r="20" fill="none" stroke="${OR}" stroke-width="5" />
        </g>
        <path d="M0 236 H1080" stroke="${OR}" stroke-width="4" opacity="0.4" />
      </svg>
      <div class="amb-rotulo" data-layout-ignore>CASA DE EMPEÑOS · TASACIONES</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const DUR = ${DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      // el neón titila: "TASO" se apaga a ratos (determinista)
      [2.2, 9.7, 17.3, 26.1, 33.8, 44.5].filter((t) => t < DUR - 1).forEach((t) => tl.to(q(".amb-w2"), { opacity: 0.2, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)" }, t));
      // golpes rojos: "nada", "yo", "cero", "un alfajor"
      [${NADA}, ${YO}, ${CERO}, ${ALF}].forEach((t) => { tl.to(q(".amb-rojo"), { opacity: 1, duration: 0.06 }, t - 0.02); tl.to(q(".amb-rojo"), { opacity: 0, duration: 0.6, ease: "power2.out" }, t + 0.1); });
      // cuando entra Scalerics el cartel queda prendido fijo y el borde pasa a verde
      tl.to(q(".amb-cartel"), { borderColor: "${VE}", boxShadow: "0 0 22px rgba(92, 230, 17, 0.55), inset 0 0 22px rgba(92, 230, 17, 0.35)", duration: 0.4 }, ${ORUS});
      tl.to(q(".amb-cartel"), { opacity: 0.85, duration: 1.6, yoyo: true, repeat: Math.max(1, Math.floor(DUR / 1.6) - 1), ease: "sine.inOut" }, 0);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`);
};

amb();
T.forEach((s, k) => {
  const f = ESCENAS[s.id];
  if (!f) return;
  const c = ctx(k);
  const p = s.id.slice(0, 3);
  const [css, html, js, sfx] = f(c);
  escena(s.id, p, c.dur, css, html, js, sfx);
});
execSync("node armar.mjs", { stdio: "inherit" });
console.log(T.map((s) => `${s.id} ${s.a}-${s.b}`).join("\n"));
