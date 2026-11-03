// Generador de escenas de reels/se-te-acaba (correr desde la carpeta del reel).
import fs from "node:fs";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = 57.77;
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = reel.escenas.map(([id, i], k) => ({ id, a: ini(i), b: k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR }));

const RED = "#c7655b";
const GREEN = "#5ce611";
const CR = "#efeee5";

// ---------- formas ----------
// balde con origen en la base, ~64 x 84 (asa hasta -96)
const balde = (x, y, s, cls, anim = "", cls2) => {
  const sw = r2(5 / Math.max(s, 0.55));
  const c2 = cls2 ?? (cls === "ln" ? "ln-ap" : cls);
  const st = `style="stroke-width:${sw}"`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${anim}">` +
    `<path class="${cls}" ${st} d="M-32 -76 L-27 -6 Q0 2 27 -6 L32 -76" />` +
    `<ellipse class="${cls}" ${st} cx="0" cy="-76" rx="32" ry="9" />` +
    `<path class="${c2}" ${st} d="M-31 -72 Q0 -112 31 -72" />` +
    `<path class="${c2}" ${st} d="M-30 -52 Q0 -46 30 -52 M-29 -26 Q0 -20 29 -26" />` +
    `</g></g>`;
};
const lata = (x, y, cls = "ln-ap", anim = "") =>
  `<g class="${anim}"><rect class="${cls}" x="${x - 26}" y="${y - 64}" width="52" height="64" rx="6" /><path class="${cls}" d="M${x - 26} ${y - 50} H${x + 26}" /></g>`;
// pintor con origen en los pies (alto ~240)
const pintor = (x, y, s, anim) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><g class="${anim}">` +
  `<circle class="ln" cx="0" cy="-196" r="30" />` +
  `<path class="ln" d="M-32 -204 Q-31 -238 0 -238 Q31 -238 32 -204 Z" />` +
  `<path class="ln" d="M-30 -206 H-64" />` +
  `<path class="ln" d="M-10 -192 V-186 M12 -192 V-186" />` +
  `<path class="ln" d="M-62 0 Q-62 -150 0 -158 Q62 -150 62 0" />` +
  `<path class="ln-ap" d="M-30 0 V-96 H30 V0 M-30 -96 L-42 -148 M30 -96 L42 -148" />` +
  `<path class="ln" d="M-58 -70 L-96 -120 V-160" />` +
  `<rect class="ln" x="-136" y="-196" width="80" height="34" rx="12" />` +
  `</g></g>`;
const cursor = (anim) => `<g class="${anim}"><path class="ln" style="fill:#050a12" d="M0 0 L0 44 L12 33 L22 54 L31 50 L21 29 L37 29 Z" /></g>`;
const tilde = (x, y, r, anim) =>
  `<g class="${anim}"><circle class="ln-ac" cx="${x}" cy="${y}" r="${r}" /><path class="ln-ac" d="M${x - r * 0.45} ${y + r * 0.02} L${x - r * 0.1} ${y + r * 0.36} L${x + r * 0.48} ${y - r * 0.32}" /></g>`;

// ---------- plantilla ----------
const CSS = (id) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="${id}"] .capa { position: absolute; inset: 0; }
    [data-composition-id="${id}"] svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="${id}"] .ln { fill: none; stroke: ${CR}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    [data-composition-id="${id}"] .ln-ap { fill: none; stroke: rgba(239, 238, 229, 0.4); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    [data-composition-id="${id}"] .ln-ac { fill: none; stroke: ${GREEN}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    [data-composition-id="${id}"] .ln-rojo { fill: none; stroke: ${RED}; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    [data-composition-id="${id}"] .punt { stroke-dasharray: 14 14; }
    [data-composition-id="${id}"] .tx { font-family: "Lexend", sans-serif; font-weight: 600; fill: ${CR}; font-size: 28px; }
    [data-composition-id="${id}"] .tx-ap { font-family: "Lexend", sans-serif; font-weight: 500; fill: rgba(239, 238, 229, 0.6); font-size: 26px; }
    [data-composition-id="${id}"] .tx-ac { font-family: "Lexend", sans-serif; font-weight: 600; fill: ${GREEN}; font-size: 28px; }
    [data-composition-id="${id}"] .tx-rojo { font-family: "Lexend", sans-serif; font-weight: 600; fill: ${RED}; font-size: 28px; }
    [data-composition-id="${id}"] .mono { font-family: "IBM Plex Mono", monospace; font-weight: 500; fill: ${CR}; font-size: 26px; letter-spacing: 0.1em; }
    [data-composition-id="${id}"] .mono-ap { font-family: "IBM Plex Mono", monospace; font-weight: 500; fill: rgba(239, 238, 229, 0.55); font-size: 26px; letter-spacing: 0.1em; }
    [data-composition-id="${id}"] .mono-ac { font-family: "IBM Plex Mono", monospace; font-weight: 500; fill: ${GREEN}; font-size: 26px; letter-spacing: 0.1em; }
    [data-composition-id="${id}"] .mono-rojo { font-family: "IBM Plex Mono", monospace; font-weight: 500; fill: ${RED}; font-size: 26px; letter-spacing: 0.1em; }
    [data-composition-id="${id}"] .etiqueta { position: absolute; left: 0; right: 0; top: 1268px; height: 40px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; text-transform: uppercase; color: ${GREEN}; }
    [data-composition-id="${id}"] .etiqueta span { position: absolute; left: 0; right: 0; opacity: 0; }
    [data-composition-id="${id}"] .etiqueta .rojo { color: ${RED}; }
    [data-composition-id="${id}"] .etiqueta .cr { color: rgba(239, 238, 229, 0.8); }`;

const HELPERS = `
      const dibujar = (els, t, dur, desde, paso) => {
        (Array.isArray(els) ? els : [els]).forEach((el, i) => {
          const L = el.getTotalLength();
          const t0 = t + i * (paso ?? 0.03);
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
          tl.to(el, { opacity: 1, duration: 0.04 }, t0);
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t0);
        });
      };
      const centro = (el) => { const b = el.getBBox(); return (b.x + b.width / 2) + " " + (b.y + b.height / 2); };
      const pop = (els, t, paso) => {
        (Array.isArray(els) ? els : [els]).forEach((el, i) => {
          const o = centro(el);
          gsap.set(el, { opacity: 0 });
          tl.fromTo(el, { opacity: 0, scale: 0.85, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: 0.35, ease: "back.out(1.6)" }, t + i * (paso ?? 0.08));
        });
      };
      const latir = (el, t, s) => { const o = centro(el); tl.to(el, { scale: s ?? 1.08, svgOrigin: o, duration: 0.13, yoyo: true, repeat: 1, ease: "power2.out" }, t); };
      const fuera = (els, t, d) => tl.to(els, { opacity: 0, duration: d ?? 0.25, ease: "power2.in" }, t);
      let etAnt = null;
      const etq = (i, t) => {
        const el = q(".e" + i);
        if (etAnt) tl.to(etAnt, { opacity: 0, duration: 0.2 }, t - 0.2);
        tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, t);
        etAnt = el;
      };`;

const escribir = (id, { svg, etqs, js, sfx, css = "" }) => {
  const e = ESC.find((x) => x.id === id);
  const dur = r2(e.b - e.a);
  const w = (i) => r2(pal[i].start - e.a);
  const etHtml = etqs.map(([cls, txt], i) => `<span class="e${i + 1} ${cls}">${txt}</span>`).join("");
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(id)}${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-escena" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
${svg}
      </svg>
      <div class="etiqueta">${etHtml}</div>
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
${HELPERS}
${js(w, dur)}
      tl.to(q("#${id}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx(w).map(([t, s, v, m]) => (m ? { t: r2(t), sfx: s, vol: v, max: m } : { t: r2(t), sfx: s, vol: v }))).replace(/\},/g, "},\n ") + "\n");
};

// =============== s01-gancho ===============
{
  const xs = [210, 300, 390, 480, 570, 660, 750, 840];
  escribir("s01-gancho", {
    svg: [
      `<path class="ln d" d="M160 700 V1232 M920 700 V1232" />`,
      `<path class="ln d" d="M140 832 H940 M140 1032 H940 M140 1232 H940" />`,
      xs.map((x) => lata(x, 830, "ln-ap", "lata")).join(""),
      [210, 300, 780, 870].map((x) => lata(x, 1030, "ln-ap", "lata")).join(""),
      xs.map((x) => lata(x, 1230, "ln-ap", "lata")).join(""),
      [450, 540, 630].map((x, i) => balde(x, 1028, 0.95, "ln", "b b" + i)).join(""),
      `<g class="hueco"><rect class="ln-rojo punt" x="398" y="918" width="284" height="104" rx="12" /></g>`,
      `<g class="tag-v"><path class="ln-ac" d="M540 834 V850" /><rect class="ln-ac" x="410" y="850" width="260" height="50" rx="12" /><text class="mono-ac" x="540" y="884" text-anchor="middle" style="font-size:24px">MÁS VENDIDO</text></g>`,
      `<g class="tag-r"><path class="ln-rojo" d="M540 834 V850" /><rect class="ln-rojo" x="410" y="850" width="260" height="50" rx="12" /><text class="mono-rojo" x="540" y="884" text-anchor="middle" style="font-size:24px">AGOTADO</text></g>`,
    ].join("\n"),
    etqs: [["", "El que más sale"], ["rojo", "Agotado"]],
    js: (w) => `
      const base = qa(".d").concat(qa(".lata rect, .lata path"));
      dibujar(base, 0, 0.6, 0.5, 0.005);
      tl.set(base, { opacity: 1 }, 0);
      pop(qa(".b"), 0.1, 0.08);
      pop(q(".tag-v"), 0.35);
      latir(q(".tag-v"), ${w(4)});
      etq(1, ${w(3)});
      [${w(4) + 0.15}, ${w(6)}, ${w(9)}].forEach((t, i) => {
        tl.to(q(".b" + i), { y: -50, opacity: 0, duration: 0.3, ease: "power2.in" }, t);
      });
      gsap.set(q(".hueco"), { opacity: 0 });
      tl.to(q(".hueco"), { opacity: 1, duration: 0.2 }, ${w(11)});
      tl.to(q(".hueco"), { opacity: 0.45, duration: 0.25, yoyo: true, repeat: 1 }, ${w(11) + 0.3});
      fuera(q(".tag-v"), ${w(11) - 0.1}, 0.15);
      pop(q(".tag-r"), ${w(11)});
      tl.to(q(".tag-r"), { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, ${w(11) + 0.3});
      etq(2, ${w(11)});`,
    sfx: (w) => [[0, "impact-bass-1", 0.3, 0.6], [w(4) + 0.15, "pop", 0.25], [w(6), "pop", 0.25], [w(9), "pop", 0.25], [w(11), "glitch-1", 0.3, 0.5]],
  });
}

// =============== s02-pintureria ===============
{
  let toldo = "M180 800 H900 L880 850";
  for (let x = 880; x > 200; x -= 68) toldo += ` Q${x - 34} 878 ${x - 68} 850`;
  toldo += " Z";
  const cols = [450, 530, 610, 690, 770];
  const rows = [962, 1087, 1212];
  escribir("s02-pintureria", {
    svg: [
      `<g class="fach">`,
      `<path class="ln d" d="M200 1230 V800 M880 800 V1230" />`,
      `<rect class="ln d" x="300" y="690" width="480" height="84" rx="14" />`,
      `<text class="tx fa" x="540" y="747" text-anchor="middle" style="font-size:44px">PINTURERÍA</text>`,
      `<path class="ln d" d="${toldo}" />`,
      `<rect class="ln d" x="270" y="940" width="270" height="200" rx="8" />`,
      `<rect class="ln d" x="610" y="960" width="160" height="270" rx="6" />`,
      `<circle class="ln d" cx="742" cy="1100" r="6" />`,
      `<path class="ln-ap d" d="M120 1232 H960" />`,
      [335, 405, 475].map((x) => balde(x, 1120, 0.6, "ln-ap", "fa")).join(""),
      `</g>`,
      balde(540, 1190, 2.1, "ln", "grande"),
      `<g class="cal"><rect class="ln" x="130" y="900" width="190" height="150" rx="16" /><path class="ln" d="M130 948 H320 M180 885 V915 M270 885 V915" /><text class="mono" x="225" y="1012" text-anchor="middle" style="font-size:30px">LUNES</text></g>`,
      `<path class="ln es" d="M400 840 V1216 M820 840 V1216 M390 964 H830 M390 1089 H830 M390 1214 H830" />`,
      rows.map((y) => cols.map((x) => balde(x, y, 0.7, "ln", "bq")).join("")).join(""),
    ].join("\n"),
    etqs: [["cr", "Pinturería de barrio"], ["", "Lo que más sale"], ["cr", "Lunes · 15 baldes"]],
    js: (w) => `
      dibujar(qa(".d"), 0, 0.7, 0.45, 0.02);
      pop(qa(".fa"), 0.15, 0.06);
      etq(1, 0.25);
      latir(q(".fach"), ${w(15)}, 1.03);
      tl.to(q(".fach"), { opacity: 0.18, duration: 0.3 }, ${w(21) - 0.15});
      pop(q(".grande"), ${w(21)});
      etq(2, ${w(19)});
      latir(q(".grande"), ${w(22) + 0.2}, 1.06);
      // "El lunes": sale la fachada, entra el estante (la capa del stock arriba)
      tl.to([q(".fach"), q(".grande")], { opacity: 0, duration: 0.3, ease: "power2.in" }, ${w(23) - 0.3});
      pop(q(".cal"), ${w(24)});
      dibujar(q(".es"), ${w(24)}, 0.5);
      pop(qa(".bq"), ${w(26)}, 0.035);
      etq(3, ${w(26)});
      latir(q(".cal"), ${w(29)}, 1.05);`,
    sfx: (w) => [[0.1, "pop", 0.25], [w(21), "sparkle", 0.3, 0.8], [w(24), "click-soft", 0.3], [w(26), "typing", 0.2, 0.6], [w(29), "ping", 0.2]],
  });
}

// =============== s03-semana ===============
{
  escribir("s03-semana", {
    svg: [
      `<g class="p1">`,
      `<text class="mono" x="200" y="852" text-anchor="middle" style="font-size:28px">MARTES</text>`,
      `<text class="mono-ap" x="200" y="890" text-anchor="middle" style="font-size:24px">LOCAL</text>`,
      `<path class="ln d" d="M90 1092 H310 V1200 H90 Z M90 1124 H310" />`,
      [120, 160, 200, 240, 280].map((x) => balde(x, 1088, 0.5, "ln", "vb")).join(""),
      `<text class="tx-rojo m1" x="200" y="1000" text-anchor="middle" style="font-size:52px">−5</text>`,
      `</g>`,
      `<g class="p2">`,
      `<text class="mono" x="540" y="852" text-anchor="middle" style="font-size:28px">MIÉRCOLES</text>`,
      `<text class="mono-ap" x="540" y="890" text-anchor="middle" style="font-size:24px">WHATSAPP</text>`,
      `<rect class="ln d" x="455" y="925" width="170" height="280" rx="26" />`,
      `<path class="ln d" d="M520 946 H560" />`,
      `<g class="bu2"><rect class="ln-ap" x="470" y="990" width="140" height="52" rx="14" /><text class="tx" x="540" y="1025" text-anchor="middle" style="font-size:25px">4 baldes</text></g>`,
      `<g class="bu2b"><rect class="ln-ap" x="490" y="1060" width="110" height="46" rx="14" /><text class="tx-ap" x="545" y="1091" text-anchor="middle" style="font-size:24px">dale</text></g>`,
      `<text class="tx-rojo m2" x="540" y="1000" text-anchor="middle" style="font-size:52px">−4</text>`,
      `</g>`,
      `<g class="p3">`,
      `<text class="mono" x="880" y="852" text-anchor="middle" style="font-size:28px">JUEVES</text>`,
      `<text class="mono-ap" x="880" y="890" text-anchor="middle" style="font-size:24px">WEB</text>`,
      `<rect class="ln d" x="770" y="960" width="220" height="150" rx="10" />`,
      `<path class="ln d" d="M740 1132 H1020 L1000 1112 H760 Z" />`,
      `<g class="w3">${balde(812, 1060, 0.5, "ln")}<text class="tx" x="840" y="1040" style="font-size:25px">6 baldes</text><rect class="ln-ap" x="840" y="1058" width="120" height="32" rx="10" /></g>`,
      `<text class="tx-rojo m3" x="880" y="1000" text-anchor="middle" style="font-size:52px">−6</text>`,
      `</g>`,
    ].join("\n"),
    etqs: [["cr", "En el mostrador"], ["cr", "Por WhatsApp"], ["cr", "En la tienda online"]],
    js: (w) => `
      dibujar(qa(".d"), 0, 0.55, 0.4, 0.02);
      gsap.set([q(".p2"), q(".p3")], { opacity: 0.3 });
      pop(qa(".vb"), 0.05, 0.04);
      etq(1, 0.15);
      const sube = (el, t) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, t);
        tl.to(el, { y: -70, opacity: 0, duration: 0.6, ease: "power2.in" }, t + 0.45);
      };
      // martes: se van cinco del mostrador
      tl.to(qa(".vb"), { x: 70, opacity: 0, duration: 0.35, ease: "power2.in", stagger: 0.05 }, ${w(32)});
      sube(q(".m1"), ${w(35)});
      // miércoles
      tl.to(q(".p1"), { opacity: 0.3, duration: 0.3 }, ${w(37) - 0.2});
      tl.to(q(".p2"), { opacity: 1, duration: 0.3 }, ${w(37) - 0.2});
      etq(2, ${w(37)});
      pop(q(".bu2"), ${w(38)});
      pop(q(".bu2b"), ${w(39)});
      sube(q(".m2"), ${w(40)});
      // jueves
      tl.to(q(".p2"), { opacity: 0.3, duration: 0.3 }, ${w(42) - 0.2});
      tl.to(q(".p3"), { opacity: 1, duration: 0.3 }, ${w(42) - 0.2});
      etq(3, ${w(42)});
      pop(q(".w3"), ${w(43)});
      latir(q(".w3"), ${w(47) - 0.2}, 1.06);
      sube(q(".m3"), ${w(47)});`,
    sfx: (w) => [[0.1, "pop", 0.2], [w(32), "whoosh-short", 0.2], [w(35), "click", 0.25], [w(38), "notification", 0.25, 0.8], [w(40), "click", 0.25], [w(43), "key-press", 0.25], [w(47), "click", 0.25]],
  });
}

// =============== s04-distinto ===============
{
  escribir("s04-distinto", {
    svg: [
      `<g class="ic">`,
      `<rect class="ln" x="160" y="860" width="130" height="56" rx="6" />`,
      balde(200, 856, 0.42, "ln"), balde(245, 856, 0.42, "ln"),
      `<rect class="ln" x="195" y="985" width="64" height="104" rx="14" /><path class="ln" d="M214 998 H240" />`,
      `<rect class="ln" x="160" y="1138" width="130" height="80" rx="8" /><path class="ln" d="M145 1230 H305 L292 1218 H158 Z" />`,
      `</g>`,
      `<path class="ln-ap fl" d="M310 890 C480 890 560 1030 760 1030 M742 1016 L760 1030 L742 1044" />`,
      `<path class="ln-ap fl" d="M280 1040 C480 1040 560 1180 760 1180 M742 1166 L760 1180 L742 1194" />`,
      `<path class="ln-ap fl" d="M310 1180 C480 1180 560 890 760 890 M742 876 L760 890 L742 904" />`,
      `<g class="de de1"><rect class="ln-ap" x="780" y="840" width="160" height="104" rx="6" /><path class="ln-ap" d="M800 840 V944" /><text class="mono-ap" x="870" y="905" text-anchor="middle" style="font-size:34px">−5</text></g>`,
      `<g class="de de2"><rect class="ln-ap" x="780" y="990" width="160" height="84" rx="20" /><path class="ln-ap" d="M800 1074 L790 1096 L820 1074" /><text class="mono-ap" x="860" y="1044" text-anchor="middle" style="font-size:34px">−4</text></g>`,
      `<g class="de de3"><rect class="ln-ap" x="780" y="1136" width="160" height="94" rx="10" /><path class="ln-ap" d="M780 1162 H940" /><text class="mono-ap" x="860" y="1212" text-anchor="middle" style="font-size:34px">−6</text></g>`,
      `<g class="preg"><circle class="ln-rojo" cx="540" cy="1035" r="62" /><text class="tx-rojo" x="540" y="1066" text-anchor="middle" style="font-size:88px">?</text></g>`,
    ].join("\n"),
    etqs: [["cr", "Cada uno por su lado"], ["rojo", "Nadie ve el número"]],
    js: (w) => `
      pop(q(".ic"), 0);
      dibujar(qa(".fl"), ${w(49)}, 0.6, 1, 0.3);
      pop(qa(".de"), ${w(50)}, 0.3);
      etq(1, ${w(51)});
      pop(q(".preg"), ${w(55)});
      latir(q(".preg"), ${w(58)}, 1.12);
      tl.to(qa(".de"), { x: 5, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, ${w(55) + 0.2});
      tl.to(qa(".fl"), { opacity: 0.35, duration: 0.3 }, ${w(55)});
      etq(2, ${w(55)});`,
    sfx: (w) => [[w(49), "whoosh-short", 0.2], [w(50), "click-soft", 0.2], [w(50) + 0.3, "click-soft", 0.2], [w(50) + 0.6, "click-soft", 0.2], [w(55), "glitch-1", 0.25, 0.5]],
  });
}

// =============== s05-acuerda ===============
{
  escribir("s05-acuerda", {
    svg: [
      `<g class="cal"><rect class="ln d" x="130" y="860" width="290" height="300" rx="20" /><path class="ln d" d="M130 930 H420 M200 840 V880 M350 840 V880" /></g>`,
      ...["MAR", "MIÉ", "JUE"].map((d, i) => `<text class="tx dia dia${i}" x="275" y="1080" text-anchor="middle" style="font-size:72px">${d}</text>`),
      `<g transform="translate(750 870)"><g class="post"><g transform="rotate(-4)"><rect class="ln-ap" x="-150" y="0" width="300" height="270" rx="8" /><text class="mono-ap" x="0" y="72" text-anchor="middle" style="font-size:30px">PEDIR</text><text class="mono-ap" x="0" y="116" text-anchor="middle" style="font-size:30px">LÁTEX</text><text class="mono-ap" x="0" y="160" text-anchor="middle" style="font-size:30px">BLANCO</text></g></g></g>`,
      `<g transform="translate(750 1095) rotate(-10)"><g class="sello"><rect class="ln-rojo" x="-120" y="-30" width="240" height="60" rx="10" /><text class="mono-rojo" x="0" y="10" text-anchor="middle" style="font-size:28px">PENDIENTE</text></g></g>`,
    ].join("\n"),
    etqs: [["cr", "Pedido al proveedor"], ["rojo", "Cuando alguien se acuerda"]],
    js: (w) => `
      dibujar(qa(".d"), 0, 0.5, 0.4);
      pop(q(".post"), 0.1);
      etq(1, 0.15);
      const dias = qa(".dia");
      gsap.set(dias, { opacity: 0 });
      [0.15, 0.75, 1.35].forEach((t, i) => {
        tl.fromTo(dias[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, t);
        if (i < 2) tl.to(dias[i], { opacity: 0, y: -24, duration: 0.18, ease: "power2.in" }, t + 0.45);
      });
      [0.75, 1.35].forEach((t) => latir(q(".cal"), t, 1.03));
      pop(q(".sello"), ${w(65)});
      etq(2, ${w(66)});
      // "acuerda": el post-it se balancea
      tl.to(q(".post"), { rotation: 7, svgOrigin: "0 0", duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, ${w(69) - 0.3});
      latir(q(".sello"), ${w(69)}, 1.1);`,
    sfx: (w) => [[0.15, "click-soft", 0.2], [0.75, "click-soft", 0.2], [1.35, "click-soft", 0.2], [w(65), "impact-bass-1", 0.25, 0.5]],
  });
}

// =============== s06-viernes ===============
{
  escribir("s06-viernes", {
    svg: [
      `<g class="chip"><rect class="ln" x="370" y="805" width="340" height="80" rx="18" /><text class="mono" x="540" y="856" text-anchor="middle" style="font-size:30px">VIERNES 17:00</text></g>`,
      `<path class="ln est" d="M150 930 V1226 M450 930 V1226 M140 1078 H460 M140 1226 H460" />`,
      `<path class="ln-rojo est-r" d="M150 930 V1226 M450 930 V1226 M140 1078 H460 M140 1226 H460" />`,
      `<text class="tx-rojo cero" x="300" y="1190" text-anchor="middle" style="font-size:120px">0</text>`,
      pintor(830, 1226, 1, "pin"),
      `<g class="glo"><path class="ln glo-l" d="M470 920 H700 Q716 920 716 936 V1026 Q716 1042 700 1042 H660 L690 1070 L630 1042 H470 Q454 1042 454 1026 V936 Q454 920 470 920 Z" /><text class="tx" x="585" y="970" text-anchor="middle" style="font-size:29px">Tres baldes</text><text class="tx t2" x="585" y="1012" text-anchor="middle" style="font-size:29px">de blanco</text></g>`,
    ].join("\n"),
    etqs: [["cr", "Viernes · 17:00"], ["cr", "Tres baldes"], ["rojo", "Sin stock"]],
    js: (w) => `
      pop(q(".chip"), 0);
      dibujar(q(".est"), 0, 0.5, 0.4);
      etq(1, 0.15);
      latir(q(".chip"), ${w(71)}, 1.05);
      const pin = q(".pin");
      gsap.set(pin, { opacity: 0 });
      tl.fromTo(pin, { x: 260, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, ${w(75)});
      tl.to(pin, { y: -8, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${w(75)});
      pop(q(".glo"), ${w(77)});
      gsap.set(q(".t2"), { opacity: 0 });
      tl.to(q(".t2"), { opacity: 1, duration: 0.2 }, ${w(80)});
      etq(2, ${w(78)});
      // no queda ni uno
      gsap.set(q(".est-r"), { opacity: 0 });
      tl.to(q(".est-r"), { opacity: 1, duration: 0.25 }, ${w(82)});
      pop(q(".cero"), ${w(82)});
      latir(q(".cero"), ${w(85)}, 1.12);
      tl.to(q(".glo-l"), { stroke: "${RED}", duration: 0.25 }, ${w(83)});
      tl.to(pin, { rotation: -4, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${w(83)});
      etq(3, ${w(82)});`,
    sfx: (w) => [[0, "click-soft", 0.25], [w(75), "whoosh-short", 0.2], [w(77), "pop", 0.25], [w(82), "glitch-1", 0.3, 0.5], [w(85), "impact-bass-1", 0.25, 0.6]],
  });
}

// =============== s07-giro ===============
{
  let zz = "M140 830 H480 V1180";
  for (let x = 480, k = 0; x > 140; x -= 34, k++) zz += ` L${x - 17} ${k % 2 ? 1180 : 1200} L${x - 34} 1180`;
  zz = "M140 830 H480 V1180";
  for (let x = 480; x > 140; x -= 34) zz += ` L${x - 17} 1200 L${x - 34} 1180`;
  zz += " Z";
  escribir("s07-giro", {
    svg: [
      `<g class="tick"><path class="ln tk" d="${zz}" />`,
      `<text class="mono tt" x="310" y="890" text-anchor="middle" style="font-size:26px">LÁTEX BLANCO</text>`,
      `<text class="tx tt" x="310" y="990" text-anchor="middle" style="font-size:76px">x15</text>`,
      `<path class="ln-ap tk" d="M170 1030 H450" />`,
      `<text class="mono-ac vend" x="310" y="1084" text-anchor="middle" style="font-size:30px">VENDIDO</text>`,
      tilde(310, 1138, 28, "vt"),
      `</g>`,
      pintor(840, 1226, 0.9, "pin"),
      `<g class="glo"><path class="ln-rojo" d="M560 820 H900 Q916 820 916 836 V910 Q916 926 900 926 H840 L850 956 L812 926 H560 Q544 926 544 910 V836 Q544 820 560 820 Z" /><text class="tx-rojo" x="730" y="886" text-anchor="middle" style="font-size:38px">¿No tenés?</text></g>`,
    ].join("\n"),
    etqs: [["", "Buena noticia"], ["rojo", "Te enterás por el cliente"]],
    js: (w) => `
      dibujar(qa(".tk"), 0, 0.9, 0.55);
      pop(qa(".tt"), 0.25, 0.25);
      pop(q(".vend"), ${w(92)});
      pop(q(".vt"), ${w(93)});
      etq(1, ${w(92)});
      latir(q(".tick"), ${w(96)}, 1.05);
      latir(q(".vt"), ${w(96) + 0.35}, 1.15);
      // lo malo: el cliente
      tl.to(q(".tick"), { opacity: 0.35, duration: 0.3 }, ${w(97)});
      const pin = q(".pin");
      gsap.set(pin, { opacity: 0 });
      tl.fromTo(pin, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, ${w(97)});
      pop(q(".glo"), ${w(100)});
      latir(q(".glo"), ${w(103)}, 1.07);
      etq(2, ${w(99)});`,
    sfx: (w) => [[0.05, "typing", 0.2, 0.9], [w(92), "chime", 0.3, 0.9], [w(96), "ping", 0.2], [w(97), "whoosh-short", 0.2], [w(100), "pop", 0.25], [w(103), "glitch-1", 0.2, 0.4]],
  });
}

// =============== s08-automatiza ===============
{
  // engranaje
  const dientes = 10, R = 88, r = 70;
  let g = "";
  for (let i = 0; i < dientes * 2; i++) {
    const a0 = (i / (dientes * 2)) * Math.PI * 2, a1 = ((i + 1) / (dientes * 2)) * Math.PI * 2;
    const rr = i % 2 ? r : R;
    g += `${i ? "L" : "M"}${r2(540 + rr * Math.cos(a0))} ${r2(1060 + rr * Math.sin(a0))} L${r2(540 + rr * Math.cos(a1))} ${r2(1060 + rr * Math.sin(a1))} `;
  }
  g += "Z";
  escribir("s08-automatiza", {
    svg: [
      `<g class="pa">`,
      `<g class="chip"><rect class="ln-ac" x="400" y="815" width="280" height="80" rx="18" /><text class="mono-ac" x="540" y="866" text-anchor="middle" style="font-size:30px">LUNES</text></g>`,
      `<g class="gear"><path class="ln-ac" d="${g}" /><circle class="ln-ac" cx="540" cy="1060" r="30" /></g>`,
      `</g>`,
      `<g class="pb">`,
      `<path class="ln-ap lb" d="M205 1100 C205 930 380 840 480 800" />`,
      `<path class="ln-ap lb" d="M540 975 V800" />`,
      `<path class="ln-ap lb" d="M890 1050 C890 920 700 840 600 800" />`,
      `<path class="ln-ac lg lg1" d="M205 1100 C205 930 380 840 480 800" />`,
      `<path class="ln-ac lg lg2" d="M540 975 V800" />`,
      `<path class="ln-ac lg lg3" d="M890 1050 C890 920 700 840 600 800" />`,
      `<path class="ln d" d="M110 1112 H300 V1186 H110 Z" />`,
      [150, 205, 260].map((x) => balde(x, 1108, 0.48, "ln", "vb")).join(""),
      `<rect class="ln d" x="480" y="985" width="120" height="200" rx="20" /><path class="ln d" d="M525 1000 H555" />`,
      `<g class="bu"><rect class="ln-ap" x="490" y="1035" width="100" height="44" rx="12" /><text class="tx" x="540" y="1066" text-anchor="middle" style="font-size:26px">x4</text></g>`,
      `<rect class="ln d" x="790" y="1060" width="200" height="120" rx="10" /><path class="ln d" d="M765 1200 H1015 L995 1182 H785 Z" />`,
      `<g class="w3"><text class="mono-ac" x="890" y="1108" text-anchor="middle" style="font-size:24px">STOCK</text><text class="tx-ac" x="890" y="1158" text-anchor="middle" style="font-size:40px">6</text></g>`,
      `<text class="mono-ap lbl" x="205" y="1230" text-anchor="middle" style="font-size:24px">LOCAL</text>`,
      `<text class="mono-ap lbl" x="540" y="1230" text-anchor="middle" style="font-size:24px">WHATSAPP</text>`,
      `<text class="mono-ap lbl" x="890" y="1230" text-anchor="middle" style="font-size:24px">WEB</text>`,
      tilde(300, 1100, 22, "ok"), tilde(612, 985, 22, "ok"), tilde(1000, 1060, 22, "ok"),
      `</g>`,
    ].join("\n"),
    etqs: [["cr", "Misma semana"], ["", "Con una automatización"], ["", "Se descuenta solo"]],
    js: (w) => `
      pop(q(".chip"), 0);
      etq(1, 0.1);
      dibujar(q(".gear path"), 0.05, 0.8, 0.5);
      dibujar(q(".gear circle"), 0.2, 0.6);
      tl.fromTo(q(".gear"), { rotation: 0 }, { rotation: 200, svgOrigin: "540 1060", duration: 2.4, ease: "power1.inOut" }, 0.1);
      latir(q(".gear"), ${w(109)}, 1.1);
      etq(2, ${w(109)});
      tl.to(q(".pa"), { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, ${w(110) - 0.3});
      // los tres canales, unidos al stock
      dibujar(qa(".d"), ${w(110)}, 0.5, 1, 0.04);
      dibujar(qa(".lb"), ${w(110) + 0.2}, 0.6, 1, 0.08);
      pop(qa(".lbl"), ${w(110) + 0.3}, 0.08);
      pop(qa(".vb"), ${w(110) + 0.3}, 0.05);
      const corre = (el, t) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.to(el, { opacity: 1, duration: 0.04 }, t);
        tl.fromTo(el, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.in" }, t);
      };
      tl.to(qa(".vb"), { x: -60, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.05 }, ${w(113)});
      corre(q(".lg1"), ${w(113)});
      pop(q(".bu"), ${w(115)});
      corre(q(".lg2"), ${w(116)});
      corre(q(".lg3"), ${w(119)});
      pop(q(".w3"), ${w(120)});
      pop(qa(".ok"), ${w(121)}, 0.12);
      etq(3, ${w(121)});
      qa(".ok").forEach((el, i) => latir(el, ${w(124)} + i * 0.08, 1.15));`,
    sfx: (w) => [[0, "click-soft", 0.25], [w(109), "chime", 0.3, 0.9], [w(113), "ping", 0.22], [w(116), "ping", 0.22], [w(119), "ping", 0.22], [w(121), "sparkle", 0.25, 0.8]],
  });
}

// =============== s09-aviso ===============
{
  escribir("s09-aviso", {
    svg: [
      `<rect class="ln d" x="360" y="800" width="360" height="440" rx="44" />`,
      `<path class="ln d" d="M505 826 H575" />`,
      `<g class="noti"><rect class="ln-ac" x="384" y="852" width="312" height="112" rx="18" />`,
      `<g class="bell"><path class="ln-ac" d="M408 926 Q408 884 428 882 Q448 884 448 926 Z M402 926 H454 M422 934 Q428 942 434 934" /></g>`,
      `<text class="tx" x="464" y="900" style="font-size:25px">Quedan 6 baldes</text>`,
      `<text class="tx-ap" x="464" y="938" style="font-size:24px">de látex blanco</text></g>`,
      `<g class="ped"><rect class="ln" x="384" y="986" width="312" height="230" rx="18" />`,
      `<text class="mono" x="404" y="1028" style="font-size:24px">PEDIDO ARMADO</text>`,
      `<path class="ln-ap" d="M404 1046 H676" />`,
      `<text class="tx fila" x="404" y="1092" style="font-size:26px">Látex blanco</text>`,
      `<text class="tx-ac fila" x="636" y="1092" text-anchor="end" style="font-size:26px">x 20</text>`,
      `</g>`,
      `<g class="bt1"><rect class="ln-ap" x="404" y="1130" width="272" height="64" rx="18" /><text class="tx" x="540" y="1172" text-anchor="middle" style="font-size:28px">Enviar</text></g>`,
      `<g class="bt2"><rect class="ln-ac" x="404" y="1130" width="272" height="64" rx="18" /><text class="tx-ac" x="555" y="1172" text-anchor="middle" style="font-size:28px">Enviado</text><path class="ln-ac" d="M450 1162 L462 1174 L484 1150" /></g>`,
      `<g class="fl-ok"><path class="ln-ac" d="M648 1080 L660 1092 L682 1066" /></g>`,
      `<g transform="translate(0 0)">${cursor("cur")}</g>`,
    ].join("\n"),
    etqs: [["cr", "Quedan pocos"], ["", "Aviso al celular"], ["", "Pedido armado"], ["", "Lo revisás y lo mandás"]],
    js: (w) => `
      dibujar(qa(".d"), 0, 0.5, 0.45);
      etq(1, 0.15);
      pop(q(".noti"), ${w(128)});
      tl.to(q(".bell"), { rotation: 12, svgOrigin: "428 884", duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${w(129)});
      etq(2, ${w(129)});
      dibujar(q(".ped rect"), ${w(132)}, 0.5);
      pop(qa(".ped text"), ${w(133)}, 0.15);
      pop(q(".bt1"), ${w(137)});
      etq(3, ${w(137)});
      latir(q(".ped"), ${w(138)}, 1.03);
      const c = q(".cur");
      gsap.set(c, { x: 760, y: 1240, opacity: 0 });
      tl.to(c, { opacity: 1, duration: 0.2 }, ${w(139) - 0.3});
      tl.to(c, { x: 640, y: 1080, duration: 0.4, ease: "power2.inOut" }, ${w(139) - 0.3});
      tl.to(c, { scale: 0.85, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 1 }, ${w(140)});
      pop(q(".fl-ok"), ${w(140) + 0.05});
      etq(4, ${w(140)});
      tl.to(c, { x: 560, y: 1160, duration: 0.45, ease: "power2.inOut" }, ${w(141)});
      tl.to(c, { scale: 0.85, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 1 }, ${w(143)});
      tl.to(q(".bt1"), { opacity: 0, duration: 0.15 }, ${w(143)});
      pop(q(".bt2"), ${w(143)});
      tl.to(c, { x: 760, y: 1250, opacity: 0, duration: 0.4, ease: "power2.in" }, ${w(143) + 0.4});`,
    sfx: (w) => [[w(129), "notification", 0.3, 0.9], [w(132), "click-soft", 0.2], [w(138), "pop", 0.2], [w(140), "click", 0.25], [w(143), "click", 0.25], [w(143) + 0.08, "chime", 0.25, 0.8]],
  });
}

// =============== s10-viernes ===============
{
  escribir("s10-viernes", {
    svg: [
      `<g class="chip"><rect class="ln-ac" x="370" y="805" width="340" height="80" rx="18" /><text class="mono-ac" x="540" y="856" text-anchor="middle" style="font-size:30px">VIERNES 17:00</text></g>`,
      `<path class="ln est" d="M150 930 V1226 M450 930 V1226 M140 1078 H460 M140 1226 H460" />`,
      [210, 300, 390].map((x, i) => balde(x, 1076, 0.8, "ln", "lv lv" + i)).join(""),
      [210, 300, 390].map((x) => balde(x, 1224, 0.8, "ln", "qd")).join(""),
      pintor(830, 1226, 1, "pin"),
      tilde(830, 930, 34, "ok"),
    ].join("\n"),
    etqs: [["", "Viernes · 17:00"], ["", "Hay stock"]],
    js: (w) => `
      pop(q(".chip"), 0);
      dibujar(q(".est"), 0, 0.45, 0.4);
      pop(qa(".lv, .qd"), 0.05, 0.04);
      etq(1, 0.1);
      const pin = q(".pin");
      gsap.set(pin, { opacity: 0 });
      tl.fromTo(pin, { x: 260, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, ${w(146)});
      // se lleva los tres de arriba (coordenadas internas: escala 0.8)
      [0, 1, 2].forEach((i) => {
        const dx = (650 + i * 55 - [210, 300, 390][i]) / 0.8;
        tl.to(q(".lv" + i), { x: dx, y: (1224 - 1076) / 0.8, duration: 0.55, ease: "power2.inOut" }, ${w(149)} + i * 0.1);
      });
      pop(q(".ok"), ${w(152)});
      latir(q(".ok"), ${w(152)} + 0.4, 1.15);
      etq(2, ${w(149)});`,
    sfx: (w) => [[0, "click-soft", 0.25], [w(146), "whoosh-short", 0.2], [w(149), "pop", 0.2], [w(149) + 0.2, "pop", 0.2], [w(152), "chime", 0.3, 0.9]],
  });
}

// =============== s11-scalerics ===============
{
  escribir("s11-scalerics", {
    svg: [
      `<g class="caja"><rect class="ln-ac" x="230" y="680" width="620" height="160" rx="26" /><text class="tx-ac" x="540" y="764" text-anchor="middle" style="font-size:66px;font-weight:700">SCALERICS</text><text class="mono" x="540" y="812" text-anchor="middle" style="font-size:26px">AUTOMATIZACIONES</text></g>`,
      `<path class="ln-ac l1" d="M540 842 V950" />`,
      `<g class="hub"><rect class="ln-ac" x="370" y="950" width="340" height="96" rx="20" />${balde(405, 1024, 0.55, "ln-ac")}<text class="mono-ac" x="575" y="1009" text-anchor="middle" style="font-size:28px">UN SOLO STOCK</text></g>`,
      `<path class="ln-ac l2" d="M220 1140 C220 1080 300 1048 370 1020" />`,
      `<path class="ln-ac l2" d="M540 1120 V1046" />`,
      `<path class="ln-ac l2" d="M860 1140 C860 1080 780 1048 710 1020" />`,
      `<g class="ch"><rect class="ln" x="150" y="1140" width="140" height="70" rx="6" /><path class="ln" d="M150 1164 H290" /></g>`,
      `<g class="ch"><rect class="ln" x="505" y="1120" width="70" height="110" rx="14" /><path class="ln" d="M528 1132 H552" /></g>`,
      `<g class="ch"><rect class="ln" x="790" y="1140" width="140" height="80" rx="8" /><path class="ln" d="M772 1232 H948 L935 1220 H785 Z" /></g>`,
    ].join("\n"),
    etqs: [["", "Para pymes"], ["", "Que venden por varios lados"]],
    js: (w) => `
      pop(q(".caja"), 0.05);
      latir(q(".caja"), ${w(154)} + 0.2, 1.04);
      dibujar(q(".l1"), ${w(155)}, 0.4);
      pop(q(".hub"), ${w(156)});
      latir(q(".hub"), ${w(157)} + 0.3, 1.05);
      etq(1, ${w(159)});
      pop(qa(".ch"), ${w(160)}, 0.15);
      dibujar(qa(".l2"), ${w(162)}, 0.5, 1, 0.1);
      etq(2, ${w(161)});
      latir(q(".hub"), ${w(164)} + 0.2, 1.06);
      qa(".ch").forEach((el, i) => latir(el, ${w(164)} + 0.5 + i * 0.1, 1.08));`,
    sfx: (w) => [[0.05, "impact-bass-1", 0.25, 0.6], [w(156), "pop", 0.25], [w(160), "click-soft", 0.2], [w(162), "whoosh-short", 0.18], [w(164) + 0.2, "chime", 0.25, 0.8]],
  });
}

// =============== s12-cta ===============
{
  escribir("s12-cta", {
    svg: [
      `<rect class="ln d" x="330" y="650" width="420" height="590" rx="50" />`,
      `<path class="ln d" d="M500 676 H580" />`,
      `<g class="card"><rect class="ln-ap" x="360" y="705" width="360" height="160" rx="18" />${balde(420, 838, 0.8, "ln")}<text class="tx" x="476" y="772" style="font-size:30px">Se te acaba</text><text class="tx-ap" x="476" y="812" style="font-size:24px">el más vendido</text></g>`,
      `<text class="mono-ap env" x="360" y="912" style="font-size:24px">ENVIAR A</text>`,
      ...[["Equipo del local", 950], ["Encargado de pedidos", 1020], ["Socio", 1090]].map(([n, y], i) =>
        `<g class="fila f${i}"><circle class="ln-ap" cx="384" cy="${y + 28}" r="20" /><text class="tx" x="418" y="${y + 38}" style="font-size:24px">${n}</text></g>`),
      `<g class="sel"><rect class="ln-ac" x="354" y="1013" width="372" height="70" rx="16" /></g>`,
      `<g class="bt1"><rect class="ln-ap" x="380" y="1150" width="320" height="64" rx="18" /><text class="tx" x="540" y="1192" text-anchor="middle" style="font-size:28px">Enviar</text></g>`,
      `<g class="bt2"><rect class="ln-ac" x="380" y="1150" width="320" height="64" rx="18" /><text class="tx-ac" x="555" y="1192" text-anchor="middle" style="font-size:28px">Enviado</text><path class="ln-ac" d="M448 1182 L460 1194 L482 1170" /></g>`,
      `<g class="avion"><path class="ln-ac" d="M0 0 L60 -24 L36 30 L28 8 Z M28 8 L60 -24" /></g>`,
      cursor("cur"),
    ].join("\n"),
    etqs: [["", "Mandáselo"], ["", "Al que hace los pedidos"]],
    js: (w, dur) => `
      dibujar(qa(".d"), 0, 0.6, 0.5);
      pop(q(".card"), 0.1);
      pop(q(".env"), 0.25);
      pop(qa(".fila"), 0.3, 0.08);
      etq(1, 0.1);
      const c = q(".cur");
      gsap.set(c, { x: 780, y: 1250, opacity: 0 });
      tl.to(c, { opacity: 1, duration: 0.2 }, 0.45);
      tl.to(c, { x: 620, y: 1050, duration: 0.45, ease: "power2.inOut" }, 0.45);
      tl.to(c, { scale: 0.85, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 1 }, ${w(170)});
      pop(q(".sel"), ${w(170)});
      tl.to(q(".f1 text"), { fill: "${GREEN}", duration: 0.2 }, ${w(170)});
      tl.to(q(".f1 circle"), { stroke: "${GREEN}", duration: 0.2 }, ${w(170)});
      etq(2, ${w(170)});
      pop(q(".bt1"), 0.5);
      tl.to(c, { x: 560, y: 1180, duration: 0.4, ease: "power2.inOut" }, ${w(171)});
      tl.to(c, { scale: 0.85, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 1 }, ${w(173)});
      tl.to(q(".bt1"), { opacity: 0, duration: 0.15 }, ${w(173)});
      pop(q(".bt2"), ${w(173)});
      tl.to(c, { x: 800, y: 1260, opacity: 0, duration: 0.4, ease: "power2.in" }, ${w(173)} + 0.4);
      const av = q(".avion");
      gsap.set(av, { x: 640, y: 1170, opacity: 0 });
      tl.to(av, { opacity: 1, duration: 0.1 }, ${w(173)} + 0.15);
      tl.to(av, { x: 900, y: 760, rotation: -12, svgOrigin: "0 0", duration: 0.9, ease: "power2.in" }, ${w(173)} + 0.15);
      tl.to(av, { opacity: 0, duration: 0.25 }, ${w(173)} + 0.85);
      latir(q(".sel"), ${w(173)} + 1.4, 1.04);
      latir(q(".card"), ${w(173)} + 2.2, 1.04);
      latir(q(".bt2"), ${w(173)} + 3.0, 1.06);`,
    sfx: (w) => [[0.1, "pop", 0.2], [w(170), "click", 0.25], [w(173), "click", 0.25], [w(173) + 0.15, "whoosh-short", 0.25], [w(173) + 0.4, "notification", 0.25, 0.9]],
  });
}

// =============== capa stock ===============
{
  const A = ini(reel.stock[0]);
  const B = ini(reel.stock[1]);
  const dur = r2(B - A);
  const g = (i) => r2(pal[i].start - A);
  const NUMS = [
    ["n15", "15", "cr"], ["n10", "10", "cr"], ["n6", "6", "cr"], ["n0", "0", "rojo"],
    ["m15", "15", "ac"], ["m10", "10", "ac"], ["m6", "6", "ac"], ["m26", "26", "ac"], ["m23", "23", "ac"],
  ];
  const EST = [
    ["s-lun", "LUNES", "cr"], ["s-mar", "MARTES", "cr"], ["s-mie", "MIÉRCOLES", "cr"], ["s-jue", "JUEVES", "cr"],
    ["s-nadie", "NADIE LO MIRA", "rojo"], ["s-sin", "SIN STOCK", "rojo"], ["s-vend", "VENDISTE 15", "ac"],
    ["s-cli", "TE AVISÓ EL CLIENTE", "rojo"], ["s-lun2", "LUNES · AUTOMÁTICO", "ac"], ["s-solo", "SE DESCUENTA SOLO", "ac"],
    ["s-pocos", "QUEDAN POCOS · AVISO", "cr"], ["s-env", "PEDIDO ENVIADO", "ac"], ["s-lleg", "LLEGÓ EL PEDIDO", "ac"], ["s-hay", "HAY STOCK", "ac"],
  ];
  const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="stock"] .stk-capa { position: absolute; inset: 0; }
    [data-composition-id="stock"] .stk-bloque { position: absolute; left: 120px; top: 600px; width: 840px; height: 170px; }
    [data-composition-id="stock"] .stk-caja { position: absolute; inset: 0; border: 5px solid rgba(239, 238, 229, 0.85); border-radius: 28px; }
    [data-composition-id="stock"] .stk-ico { position: absolute; left: 34px; top: 30px; width: 100px; height: 110px; overflow: visible; }
    [data-composition-id="stock"] .stk-ico path, [data-composition-id="stock"] .stk-ico ellipse { fill: none; stroke: #efeee5; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    [data-composition-id="stock"] .stk-num { position: absolute; left: 140px; top: 0; width: 230px; height: 170px; }
    [data-composition-id="stock"] .stk-num div { position: absolute; left: 0; right: 0; top: 0; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 124px; line-height: 170px; opacity: 0; font-variant-numeric: tabular-nums; }
    [data-composition-id="stock"] .stk-lbl { position: absolute; left: 390px; right: 30px; top: 38px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.12em; color: rgba(239, 238, 229, 0.6); }
    [data-composition-id="stock"] .stk-est { position: absolute; left: 390px; right: 24px; top: 86px; height: 46px; }
    [data-composition-id="stock"] .stk-est div { position: absolute; left: 0; right: 0; top: 0; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 29px; line-height: 46px; letter-spacing: 0.06em; opacity: 0; white-space: nowrap; }
    [data-composition-id="stock"] .cr { color: #efeee5; }
    [data-composition-id="stock"] .ac { color: ${GREEN}; }
    [data-composition-id="stock"] .rojo { color: ${RED}; }
  </style>
  <div id="root" data-composition-id="stock" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="stk-escena" class="stk-capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div class="stk-bloque">
        <div class="stk-caja"></div>
        <svg class="stk-ico" viewBox="-50 -118 100 124" aria-hidden="true">
          <path d="M-32 -76 L-27 -6 Q0 2 27 -6 L32 -76" /><ellipse cx="0" cy="-76" rx="32" ry="9" />
          <path d="M-31 -72 Q0 -112 31 -72" style="opacity:0.5" /><path d="M-30 -52 Q0 -46 30 -52 M-29 -26 Q0 -20 29 -26" style="opacity:0.5" />
        </svg>
        <div class="stk-num">${NUMS.map(([id, t, c]) => `<div class="${id} ${c}">${t}</div>`).join("")}</div>
        <div class="stk-lbl">STOCK · LÁTEX BLANCO</div>
        <div class="stk-est">${EST.map(([id, t, c]) => `<div class="${id} ${c}">${t}</div>`).join("")}</div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "stock";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      const bloque = q(".stk-bloque");
      const caja = q(".stk-caja");
      gsap.set(bloque, { transformOrigin: "50% 50%" });
      // entrada
      tl.fromTo(bloque, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0);
      // números: entra uno, sale el anterior
      let nAnt = null;
      const num = (cls, t) => {
        const el = q("." + cls);
        if (nAnt) tl.to(nAnt, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, t - 0.05);
        tl.fromTo(el, { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }, t + 0.08);
        tl.fromTo(bloque, { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t + 0.08);
        nAnt = el;
      };
      let eAnt = null;
      const est = (cls, t) => {
        const el = q("." + cls);
        if (eAnt) tl.to(eAnt, { opacity: 0, duration: 0.15 }, t - 0.15);
        tl.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, t);
        eAnt = el;
      };
      num("n15", 0.1); est("s-lun", 0.2);
      est("s-mar", ${g(31)}); num("n10", ${g(35)});
      est("s-mie", ${g(37)}); num("n6", ${g(40)});
      est("s-jue", ${g(42)}); num("n0", ${g(47)});
      // nadie lo ve
      est("s-nadie", ${g(55)});
      tl.to(bloque, { opacity: 0.28, filter: "blur(4px)", duration: 0.4, ease: "power2.inOut" }, ${g(56)});
      // viernes: no queda ni uno
      tl.to(bloque, { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }, ${g(82)});
      tl.to(caja, { borderColor: "${RED}", duration: 0.25 }, ${g(82)});
      est("s-sin", ${g(82)});
      tl.to(bloque, { x: 7, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, ${g(83)});
      // giro
      tl.to(caja, { borderColor: "rgba(239, 238, 229, 0.85)", duration: 0.3 }, ${g(92)});
      est("s-vend", ${g(92)});
      est("s-cli", ${g(98)});
      tl.to(caja, { borderColor: "${RED}", duration: 0.3 }, ${g(98)});
      // misma semana con automatización: todo verde
      tl.to(caja, { borderColor: "${GREEN}", duration: 0.3 }, ${g(105)});
      num("m15", ${g(105)}); est("s-lun2", ${g(105)});
      num("m10", ${g(114)});
      num("m6", ${g(116)});
      est("s-solo", ${g(121)});
      est("s-pocos", ${g(126)});
      tl.to(q(".m6"), { opacity: 0.35, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${g(127)});
      tl.to(q(".s-pocos"), { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${g(127)});
      est("s-env", ${g(143)});
      num("m26", ${g(145)}); est("s-lleg", ${g(145)});
      num("m23", ${g(150)}); est("s-hay", ${g(151)});
      tl.to(q("#stk-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync("compositions/stock.html", html);
  fs.writeFileSync("compositions/stock.sfx.json", JSON.stringify([
    { t: 0, sfx: "pop", vol: 0.25 },
    { t: g(35) + 0.08, sfx: "key-press", vol: 0.25 },
    { t: g(40) + 0.08, sfx: "key-press", vol: 0.25 },
    { t: g(47) + 0.08, sfx: "key-press", vol: 0.3 },
    { t: g(105) + 0.08, sfx: "ping", vol: 0.2 },
    { t: g(114) + 0.08, sfx: "key-press", vol: 0.2 },
    { t: g(116) + 0.08, sfx: "key-press", vol: 0.2 },
    { t: g(145) + 0.08, sfx: "key-press", vol: 0.25 },
  ]).replace(/\},/g, "},\n ") + "\n");
}
console.log("listo", ESC.map((e) => e.id + " " + r2(e.b - e.a)).join(", "));
