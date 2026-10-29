// Generador de escenas de reels/papa-no-quiero: comparte CSS, helpers y los dibujos de personajes.
import fs from "node:fs";
export const DIR = "/home/user/scalerics-reels/reels/papa-no-quiero/compositions/";
export const C = { azul: "#2b4cd1", ama: "#f2e35b", rojo: "#ff3b3b", crema: "#e9dfc6", som: "#1a1622", tom: "#c8553d", verde: "#5ce611" };

// ---------- personajes (coordenadas locales: (0,0) = base del cuello) ----------
export const POSES = {
  abajo: { c: [205, 200], h: [185, 345] },
  amasar: { c: [225, 240], h: [130, 318] },
  arriba: { c: [285, 70], h: [255, -60] },
  cabeza: { c: [250, -10], h: [92, -200] },
  pecho: { c: [170, 260], h: [30, 140] },
  frente: { c: [220, 160], h: [150, 250] },
};
const brazo = (p, lado, pose, color) => {
  const s = lado === "d" ? 1 : -1;
  const P = POSES[pose];
  const d = `M${150 * s} 70 Q${P.c[0] * s} ${P.c[1]} ${P.h[0] * s} ${P.h[1]}`;
  return `<g class="${p}brazo-${lado}">
      <path class="${p}bz-o" d="${d}" fill="none" stroke="${C.crema}" stroke-width="66" stroke-linecap="round" />
      <path class="${p}bz-i" d="${d}" fill="none" stroke="${color}" stroke-width="54" stroke-linecap="round" />
      <circle class="${p}mano" cx="${P.h[0] * s}" cy="${P.h[1]}" r="31" fill="${C.som}" stroke="${C.crema}" stroke-width="6" />
    </g>`;
};

// El padre: pizzero con gorro, bigote y delantal.
export function PAPA(p, { x, y, s = 1, pose = ["abajo", "abajo"], extra = "" }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}papa">
    <path d="M-178 440 L-160 90 Q-150 8 0 0 Q150 8 160 90 L178 440 Z" fill="${C.som}" stroke="${C.crema}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-96 64 Q0 84 96 64 L118 440 L-118 440 Z" fill="${C.crema}" opacity="0.92" />
    <path d="M-96 64 L-58 4 M96 64 L58 4" stroke="${C.crema}" stroke-width="10" stroke-linecap="round" />
    <circle cx="48" cy="232" r="17" fill="${C.tom}" opacity="0.85" /><circle cx="70" cy="252" r="8" fill="${C.tom}" opacity="0.85" />
    <rect x="-52" y="300" width="104" height="62" rx="8" fill="none" stroke="${C.som}" stroke-width="5" opacity="0.6" />
    ${brazo(p, "i", pose[0], C.som)}
    ${brazo(p, "d", pose[1], C.som)}
    <g class="${p}cabeza">
      <circle cx="0" cy="-112" r="102" fill="${C.som}" stroke="${C.crema}" stroke-width="6" />
      <path d="M-98 -150 Q-114 -100 -94 -60 M98 -150 Q114 -100 94 -60" fill="none" stroke="${C.crema}" stroke-width="12" stroke-linecap="round" opacity="0.55" />
      <path d="M-86 -178 L-82 -236 Q-124 -262 -94 -304 Q-62 -344 -20 -318 Q12 -354 54 -322 Q104 -312 92 -262 Q122 -240 82 -232 L86 -178 Z" fill="${C.crema}" stroke="${C.som}" stroke-width="5" stroke-linejoin="round" />
      <path d="M-86 -192 H86" stroke="${C.som}" stroke-width="4" opacity="0.5" />
      <ellipse class="${p}ojo" cx="-38" cy="-120" rx="11" ry="14" fill="${C.crema}" />
      <ellipse class="${p}ojo" cx="38" cy="-120" rx="11" ry="14" fill="${C.crema}" />
      <path class="${p}ceja-i" d="M-64 -150 L-16 -146" stroke="${C.crema}" stroke-width="13" stroke-linecap="round" />
      <path class="${p}ceja-d" d="M16 -146 L64 -150" stroke="${C.crema}" stroke-width="13" stroke-linecap="round" />
      <path class="${p}boca" d="M-22 -42 Q0 -34 22 -42" fill="none" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
      <path class="${p}bigote" d="M-74 -66 Q-42 -100 0 -84 Q42 -100 74 -66 Q62 -44 0 -60 Q-62 -44 -74 -66 Z" fill="${C.crema}" />
      ${extra}
    </g>
  </g></g>`;
}

// El hijo: buzo con capucha azul y gorrita para atrás.
export function HIJO(p, { x, y, s = 1, pose = ["abajo", "abajo"], extra = "" }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}hijo">
    <path d="M-170 440 L-152 90 Q-140 8 0 0 Q140 8 152 90 L170 440 Z" fill="${C.azul}" stroke="${C.crema}" stroke-width="6" stroke-linejoin="round" />
    <path d="M-92 20 Q0 110 92 20" fill="none" stroke="${C.crema}" stroke-width="8" stroke-linecap="round" />
    <path d="M-30 70 V170 M30 70 V170" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
    <path d="M-90 300 H90 L70 380 H-70 Z" fill="none" stroke="${C.crema}" stroke-width="5" opacity="0.55" />
    ${brazo(p, "i", pose[0], C.azul)}
    ${brazo(p, "d", pose[1], C.azul)}
    <g class="${p}cabeza">
      <circle cx="0" cy="-108" r="96" fill="${C.som}" stroke="${C.crema}" stroke-width="6" />
      <path d="M-92 -126 Q-90 -212 0 -212 Q90 -212 92 -126 Z" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" stroke-linejoin="round" />
      <path d="M-86 -134 Q-150 -140 -170 -120 Q-130 -112 -88 -118" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" stroke-linejoin="round" />
      <ellipse class="${p}ojo" cx="-34" cy="-98" rx="10" ry="13" fill="${C.crema}" />
      <ellipse class="${p}ojo" cx="34" cy="-98" rx="10" ry="13" fill="${C.crema}" />
      <path class="${p}ceja-i" d="M-56 -124 L-16 -126" stroke="${C.crema}" stroke-width="9" stroke-linecap="round" />
      <path class="${p}ceja-d" d="M16 -126 L56 -124" stroke="${C.crema}" stroke-width="9" stroke-linecap="round" />
      <path class="${p}boca" d="M-28 -54 Q0 -34 28 -54" fill="none" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
      ${extra}
    </g>
  </g></g>`;
}

// Vecino genérico chico (cabeza y cuerpo), con extras para "de tu edad".
export function VECINO(p, i, { x, y, s = 1, color = C.som }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${p}vecino ${p}v${i}">
    <path d="M-120 330 L-108 70 Q-100 6 0 0 Q100 6 108 70 L120 330 Z" fill="${color}" stroke="${C.crema}" stroke-width="7" stroke-linejoin="round" />
    <circle cx="0" cy="-80" r="78" fill="${C.som}" stroke="${C.crema}" stroke-width="7" />
    <ellipse cx="-26" cy="-84" rx="9" ry="12" fill="${C.crema}" /><ellipse cx="26" cy="-84" rx="9" ry="12" fill="${C.crema}" />
    <path d="M-20 -40 Q0 -28 20 -40" fill="none" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
    <g class="${p}viejo">
      <path d="M-82 -100 Q-60 -170 0 -166 Q60 -170 82 -100" fill="none" stroke="${C.crema}" stroke-width="16" stroke-linecap="round" opacity="0.8" />
      <circle cx="-26" cy="-84" r="22" fill="none" stroke="${C.ama}" stroke-width="5" /><circle cx="26" cy="-84" r="22" fill="none" stroke="${C.ama}" stroke-width="5" />
      <path d="M-4 -84 H4" stroke="${C.ama}" stroke-width="5" />
      <path d="M150 330 V90 Q150 50 120 50" fill="none" stroke="${C.ama}" stroke-width="12" stroke-linecap="round" />
    </g>
  </g></g>`;
}

// ---------- escena ----------
const HELPERS = `
      const tl = gsap.timeline({ paused: true });
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const POSES = ${JSON.stringify(POSES)};
      // sacudón (sobre un contenedor HTML)
      const sacudon = (el, t, f = 1) => [[-14 * f, 8 * f], [10 * f, -6 * f], [-5 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(el, { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      // texto que cae de golpe
      const golpe = (el, t, rot = 0, s0 = 2.6) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: s0, rotation: rot * 2 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.12); };
      const pop = (el, t, d = 0.35, from = 0.6) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: from }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.8)", immediateRender: false }, t); };
      const entra = (el, t, y = 40, d = 0.3) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: d, ease: "power3.out", immediateRender: false }, t); };
      const dibujar = (els, t, d = 0.6, st = 0) => [].concat(els).forEach((e, i) => { const L = e.getTotalLength(); gsap.set(e, { strokeDasharray: L + 2, strokeDashoffset: L + 2, opacity: 0 }); tl.set(e, { opacity: 1 }, t + i * st); tl.to(e, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t + i * st); });
      const corte = (fuera, dentro, t) => { if (dentro) gsap.set(dentro, { opacity: 0 }); if (fuera) tl.set(fuera, { opacity: 0 }, t); if (dentro) tl.set(dentro, { opacity: 1 }, t); };
      // cambio de pose de un brazo: p = prefijo, lado "i"/"d"
      const pose = (p, lado, nombre, t, d = 0.22, sel = "") => { const s = lado === "d" ? 1 : -1; const P = POSES[nombre]; const dd = "M" + 150 * s + " 70 Q" + P.c[0] * s + " " + P.c[1] + " " + P.h[0] * s + " " + P.h[1];
        tl.to(qa(sel + " ." + p + "brazo-" + lado + " path"), { attr: { d: dd }, duration: d, ease: "back.out(1.6)" }, t);
        tl.to(qa(sel + " ." + p + "brazo-" + lado + " circle"), { attr: { cx: P.h[0] * s, cy: P.h[1] }, duration: d, ease: "back.out(1.6)" }, t); };
      // cámara en mano: deriva suave y continua
      const mano = (el, dur, a = 7) => { for (let i = 0, t = 0; t < dur; i++, t += 0.9) tl.to(el, { x: a * Math.sin(i * 1.7 + 0.4), y: a * 0.8 * Math.cos(i * 2.3), rotation: 0.35 * Math.sin(i * 1.1), duration: 0.9, ease: "sine.inOut" }, t); };
`;

export function escena({ id, dur, css = "", html, js, sfx }) {
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} .capa { position: absolute; inset: 0; }
    ${P} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .trazo { fill: none; stroke: ${C.crema}; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; letter-spacing: -0.02em; white-space: nowrap;
      -webkit-text-stroke: 12px ${C.som}; paint-order: stroke fill; text-shadow: 6px 0 0 rgba(255, 59, 59, 0.55), -6px 0 0 rgba(43, 76, 209, 0.7); }
    ${P} .mono { font-family: "IBM Plex Mono", monospace; font-weight: 600; }
    ${P} .osd { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; color: ${C.ama}; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; text-shadow: 3px 3px 0 ${C.som}, 2px 0 0 rgba(255, 59, 59, 0.5); }
    ${P} .lex { font-family: "Lexend", sans-serif; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id.slice(0, 3)}-escena" class="capa clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELPERS}
${js}
      // salida
      tl.to(q("#${id.slice(0, 3)}-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.15, ease: "power2.in" }, DUR - 0.15);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(DIR + id + ".html", out);
  fs.writeFileSync(DIR + id + ".sfx.json", "[\n" + sfx.map((s) => "  " + JSON.stringify(s)).join(",\n") + "\n]\n");
  console.log("escrita", id);
}
