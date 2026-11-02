// Escenas s06 a s10: Ernesto, la novia, los post-its, el pibe del talle y el avance rápido.
import { C, R1, R2, contestador, postit, onda, carnet, ernesto, novia, pibe, dueno } from "./lib.mjs";
const { noche, madera, beige, crema, rojo, am, verdeo } = C;

// una silla de frente (x, y = centro del asiento)
const silla = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="s07-si">
  <path d="M-60 -120 V0 M60 -120 V0 M-60 -120 H60 M-60 -80 H60" stroke="${crema}" stroke-width="10" stroke-linecap="round" fill="none" />
  <path d="M-72 -8 H72 L64 14 H-64 Z" fill="${madera}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-58 14 L-66 100 M58 14 L66 100" stroke="${crema}" stroke-width="9" stroke-linecap="round" />
</g></g>`;

// celular chico (x, y = centro)
const celu = (cls, x, y, w, h, contenido = "") => `<g class="${cls}" transform="translate(${x} ${y})">
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.14}" fill="${noche}" stroke="${crema}" stroke-width="5" />
  <rect x="${-w / 2 + 12}" y="${-h / 2 + 26}" width="${w - 24}" height="${h - 52}" rx="8" fill="${verdeo}" />
  ${contenido}
</g>`;

// la intro de cada mensaje: contestador con su número, carretes y BIP
const introMsj = (pre, num) => `
          <g transform="translate(540 990) scale(1.1)"><g class="${pre}-maq">${contestador(pre + "c", [num])}</g></g>`;
const introJs = (pre, bipT, salida) => `
      tl.fromTo(q(".${pre}-maq"), { scale: 1.1, opacity: 0.5, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      girar(".${pre}c-r1", "${R1}", 0, ${salida}, 0.9);
      girar(".${pre}c-r2", "${R2}", 0, ${salida}, 0.9);
      titilar([q(".${pre}c-luz"), q(".${pre}c-halo")], 0, ${salida}, 0.5);
      tl.fromTo(q(".${pre}c-v0"), { scale: 1.3, svgOrigin: "185 -26" }, { scale: 1, svgOrigin: "185 -26", duration: 0.25, ease: "back.out(2)" }, 0.5);
      bip(".${pre}-bip", ${bipT});
      tl.to(q(".${pre}-maq"), { opacity: 0, scale: 0.6, y: 300, duration: 0.3, ease: "power2.in" }, ${salida} - 0.3);`;

export default [
  // ---------------------------------------------------------------- s06
  {
    id: "s06-ernesto",
    css: `
    [data-composition-id="s06-ernesto"] .s06-que { left: 420px; right: 0; top: 880px; }
    [data-composition-id="s06-ernesto"] .s06-que b { font-size: 76px; transform: rotate(-6deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(270 790) scale(0.82)"><g class="s06-car">${carnet("s06k", ernesto("s06e"), "Ernesto")}</g></g>
          <text class="s06-tel" x="470" y="660" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${beige}" letter-spacing="4">MENSAJE 02</text>
          ${onda("s06-o", 470, 790, { n: 20, w: 540, h: 150 })}
          <g class="s06-cal">
            <rect x="120" y="1010" width="840" height="390" rx="16" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <rect x="120" y="1010" width="840" height="64" rx="16" fill="${rojo}" stroke="${noche}" stroke-width="5" />
            ${["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"].map((d, i) => `<text x="${180 + i * 120}" y="1054" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${crema}">${d}</text>`).join("")}
            ${Array.from({ length: 35 }, (_, k) => { const n = k - 2; const c = k % 7, r = Math.floor(k / 7); return n >= 1 && n <= 30 ? `<text x="${180 + c * 120}" y="${1124 + r * 62}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="34" fill="${noche}">${n}</text>` : ""; }).join("")}
            ${[0, 1, 2, 3, 4].map((r) => `<ellipse class="s06-cir" cx="180" cy="${1112 + r * 62}" rx="50" ry="27" fill="none" stroke="${rojo}" stroke-width="6" />`).join("")}
          </g>
        </svg>
        <div class="sello s06-que"><b>¿Qué lunes?</b></div>`,
    js: `
      const QUEDAMOS = 1.58, LUNES = 3.22, NO = 3.92, QUE = 4.47;
      tl.fromTo(q(".s06-car"), { rotation: 8, scale: 0.85, opacity: 0.4, transformOrigin: "50% 50%" }, { rotation: 3, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0);
      pop(".s06-o", 0.05, 0.3, 0.5); pop(".s06-tel", 0.1, 0.3, 0.8);
      ondear("s06-o", 0, 5.2);
      hablar(".s06e-boca", 0, 1.2); hablar(".s06e-boca", 1.58, 3.5); hablar(".s06e-boca", 3.92, 5.1);
      pop(".s06-cal", QUEDAMOS, 0.4, 0.7);
      tl.fromTo(q(".s06-cal"), { y: 30 }, { y: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, QUEDAMOS);
      // "el lunes": un primer círculo; "qué lunes": todos
      dibujar(q(".s06-cir"), LUNES, 0.3);
      dibujar(qa(".s06-cir").slice(1), NO + 0.25, 0.25);
      qa(".s06-cir").slice(1).forEach((c, i) => { tl.set(c, { opacity: 0 }, 0); tl.set(c, { opacity: 1 }, NO + 0.25 + i * 0.13); });
      tl.to(q(".s06e-cejas"), { y: -10, duration: 0.18, yoyo: true, repeat: 1 }, NO);
      golpe(".s06-que", QUE + 0.25, 2.3);
      sacudon(QUE + 0.3, 1);`,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.25 },
      { t: 1.55, sfx: "whoosh-short", vol: 0.22 },
      { t: 3.2, sfx: "click-soft", vol: 0.3 },
      { t: 4.17, sfx: "key-press", vol: 0.22 },
      { t: 4.5, sfx: "key-press", vol: 0.22 },
      { t: 4.62, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s07
  {
    id: "s07-la-boda",
    css: `
    [data-composition-id="s07-la-boda"] .s07-bip { top: 580px; }
    [data-composition-id="s07-la-boda"] .s07-vienen { top: 1290px; font-weight: 900; font-size: 112px; color: ${rojo}; text-shadow: 7px 7px 0 ${noche}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${introMsj("s07", "03")}
          <g class="s07-b">
            <g transform="translate(290 820) scale(0.95)"><g class="s07-car">${carnet("s07k", novia("s07n"), "la de la boda")}</g></g>
            <text class="s07-tel" x="510" y="640" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${beige}" letter-spacing="4">MENSAJE 03</text>
            ${onda("s07-o", 510, 760, { n: 18, w: 500, h: 150 })}
            <g class="s07-sillas">${silla(690, 1130, 0.62)}${silla(800, 1130, 0.62)}${silla(910, 1130, 0.62)}${silla(800, 1010, 0.62)}</g>
            <g class="s07-cal" transform="translate(320 1180) rotate(-5)">
              <rect x="-120" y="-90" width="240" height="180" rx="12" fill="${crema}" stroke="${noche}" stroke-width="5" />
              <rect x="-120" y="-90" width="240" height="46" rx="12" fill="${rojo}" stroke="${noche}" stroke-width="5" />
              <text x="0" y="-56" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${crema}" letter-spacing="3">SÁBADO</text>
              <circle cx="-22" cy="22" r="34" fill="none" stroke="${am}" stroke-width="10" /><circle cx="22" cy="22" r="34" fill="none" stroke="${am}" stroke-width="10" />
              <circle cx="-22" cy="22" r="34" fill="none" stroke="${noche}" stroke-width="2" /><circle cx="22" cy="22" r="34" fill="none" stroke="${noche}" stroke-width="2" />
            </g>
          </g>
        </svg>
        <div class="bip s07-bip">BIP</div>
        <div class="txt s07-vienen">¿Vienen?</div>`,
    js: `
      const HOLA = 2.10, SILLAS = 4.23, SABADO = 5.15, VIENEN = 6.17;
      ${introJs("s07", 1.5, 2.0)}
      pop(".s07-car", HOLA - 0.05, 0.4, 0.6);
      pop(".s07-o", HOLA, 0.3, 0.5); pop(".s07-tel", HOLA, 0.3, 0.8);
      ondear("s07-o", HOLA, DUR - 0.2);
      hablar(".s07n-boca", HOLA, 3.6); hablar(".s07n-boca", 3.77, 5.5); hablar(".s07n-boca", 5.81, 6.6);
            qa(".s07-si").forEach((g, i) => { tl.set(g, { opacity: 0 }, 0); tl.fromTo(g, { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.25, ease: "bounce.out", immediateRender: false }, SILLAS - 0.2 + i * 0.1); });
      pop(".s07-cal", SABADO - 0.1, 0.35, 0.5);
      // pánico
      tl.set(q(".s07n-panico"), { opacity: 1 }, 5.81);
      tl.set(q(".s07n-ojos"), { opacity: 0 }, 5.81);
      tl.to(q(".s07-car"), { x: 6, duration: 0.05, yoyo: true, repeat: 13, ease: "none" }, 5.81);
      tl.to(qa(".s07-si"), { rotation: 6, svgOrigin: "0 100", duration: 0.07, yoyo: true, repeat: 11, ease: "none" }, 5.9);
      golpe(".s07-vienen", VIENEN, 2);`,
    sfx: [
      { t: 0.0, sfx: "click", vol: 0.3 },
      { t: 0.5, sfx: "key-press", vol: 0.3 },
      { t: 2.05, sfx: "pop", vol: 0.25 },
      { t: 4.05, sfx: "click", vol: 0.25 },
      { t: 4.25, sfx: "click", vol: 0.22 },
      { t: 5.05, sfx: "chime", vol: 0.22, max: 0.7 },
      { t: 6.12, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s08
  {
    id: "s08-post-its",
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1110) scale(1.15)"><g class="s08-due">${dueno("s08d", { brazo: false })}</g></g>
          ${postit("s08-p0", 150, 700, -8, "llamar|a G.", { w: 190, size: 34 })}
          ${postit("s08-p1", 930, 690, 6, "¿sillas?", { w: 190, size: 36 })}
          ${postit("s08-p2", 140, 950, 5, "presup.|!!", { w: 180, size: 36 })}
          ${postit("s08-p3", 940, 940, -5, "Ernesto:|lunes", { w: 190, size: 34 })}
          ${postit("s08-p4", 160, 1200, -4, "talle M", { w: 180, size: 36 })}
          ${postit("s08-p5", 920, 1190, 7, "¿quién|era?", { w: 180, size: 36 })}
          ${postit("s08-p6", 540, 650, 3, "URGENTE", { w: 220, size: 38 })}
          <g class="s08-celus">
            ${[-2, -1, 0, 1, 2].map((k) => `<g transform="rotate(${k * 16} 540 1600)">${celu("s08-c" + (k + 2), 540, 1335, 120, 210, `<path d="M-36 -40 H30 M-36 -10 H16 M-36 20 H36" stroke="${crema}" stroke-width="7" stroke-linecap="round" opacity="0.6" /><circle cx="44" cy="-90" r="24" fill="${rojo}" stroke="${noche}" stroke-width="3" />`)}</g>`).join("")}
          </g>
          <g class="s08-nube">
            <circle cx="700" cy="905" r="14" fill="${crema}" stroke="${noche}" stroke-width="3" />
            <circle cx="740" cy="850" r="22" fill="${crema}" stroke="${noche}" stroke-width="3" />
            <path d="M600 720 C560 650 640 590 700 620 C730 560 840 560 860 620 C930 600 970 680 920 730 C950 790 860 820 820 790 C780 830 680 820 670 780 C610 800 570 760 600 720 Z" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <path class="s08-gara" d="M660 720 C700 640 760 760 800 680 C840 620 880 740 820 760 C760 780 700 700 760 680 C820 660 860 720 800 740 C740 760 700 690 690 740 C680 780 860 780 880 700" stroke="${noche}" stroke-width="5" fill="none" stroke-linecap="round" />
          </g>
        </svg>`,
    js: `
      const POSTIT = 0.84, CHATS = 2.27, CABEZA = 4.0;
      tl.fromTo(q(".s08-due"), { y: 30, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      hablar(".s08d-boca", 0, 1.0); hablar(".s08d-boca", 0.91, 2.9); hablar(".s08d-boca", 3.09, 4.5);
      for (let i = 0; i < 7; i++) pop(".s08-p" + i, POSTIT - 0.4 + i * 0.12, 0.28, 0.3);
      tl.to(qa(".s08-p0, .s08-p2, .s08-p4"), { rotation: 4, duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, POSTIT + 0.5);
      tl.to(qa(".s08-p1, .s08-p3, .s08-p5"), { rotation: -4, duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, POSTIT + 0.6);
      // cinco celulares en abanico
      gsap.set(q(".s08-celus"), { opacity: 0 });
      tl.set(q(".s08-celus"), { opacity: 1 }, CHATS - 0.45);
      qa(".s08-celus > g").forEach((g, i) => tl.fromTo(g, { rotation: 0, opacity: 0 }, { rotation: (i - 2) * 16, opacity: 1, svgOrigin: "540 1600", duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, CHATS - 0.45 + i * 0.07));
      // los ojos van de un celular a otro
      tl.to(q(".s08d-ojos"), { x: -8, duration: 0.15, yoyo: true, repeat: 5, ease: "steps(1)" }, CHATS);
      // la cabeza: nube con un garabato
      fuera(qa(".s08-p6, .s08-p1"), CABEZA - 0.4, 0.2);
      pop(".s08-nube", CABEZA - 0.35, 0.35, 0.5);
      dibujar(".s08-gara", CABEZA - 0.1, 0.9);
      tl.to(q(".s08d-gota"), { opacity: 1, duration: 0.1 }, CABEZA);
      tl.fromTo(q(".s08d-gota"), { y: 0 }, { y: 40, duration: 0.7, ease: "power1.in", immediateRender: false }, CABEZA);`,
    sfx: [
      { t: 0.45, sfx: "pop", vol: 0.22 },
      { t: 0.7, sfx: "pop", vol: 0.22 },
      { t: 0.95, sfx: "pop", vol: 0.22 },
      { t: 1.82, sfx: "notification", vol: 0.25 },
      { t: 2.0, sfx: "notification", vol: 0.2 },
      { t: 3.65, sfx: "whoosh-short", vol: 0.2 },
      { t: 3.9, sfx: "typing", vol: 0.18, max: 0.8 },
    ],
  },
  // ---------------------------------------------------------------- s09
  {
    id: "s09-el-talle",
    css: `
    [data-composition-id="s09-el-talle"] .s09-bip { top: 580px; }
    [data-composition-id="s09-el-talle"] .s09-entro { left: 560px; right: 20px; top: 1236px; }
    [data-composition-id="s09-el-talle"] .s09-entro b { font-size: 76px; transform: rotate(-8deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${introMsj("s09", "04")}
          <g class="s09-b">
            <g transform="translate(290 800) scale(0.9)"><g class="s09-car">${carnet("s09k", pibe("s09p"), "el del talle")}</g></g>
            <text class="s09-tel" x="510" y="640" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${beige}" letter-spacing="4">MENSAJE 04</text>
            ${onda("s09-o", 510, 760, { n: 18, w: 500, h: 150 })}
            <g class="s09-rem">
              <path d="M790 870 L790 900 M760 920 Q790 880 820 920" stroke="${crema}" stroke-width="6" fill="none" stroke-linecap="round" />
              <path d="M690 940 L760 912 Q790 940 820 912 L890 940 L940 1020 L890 1044 L880 1020 L880 1220 L700 1220 L700 1020 L690 1044 L640 1020 Z" fill="${am}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
              <path d="M860 1000 L900 1110" stroke="${crema}" stroke-width="3" />
              <g transform="translate(900 1110) rotate(-12)"><rect x="-56" y="0" width="112" height="70" rx="8" fill="${crema}" stroke="${noche}" stroke-width="4" /><text x="0" y="30" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${noche}">TALLE</text><text x="0" y="60" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="${rojo}">M</text></g>
            </g>
            <g class="s09-cel">${celu("s09-c", 300, 1230, 230, 330, `
              <rect x="-90" y="-120" width="180" height="180" fill="${am}" stroke="${noche}" stroke-width="3" />
              <path d="M-50 -80 L-20 -92 Q0 -80 20 -92 L50 -80 L66 -50 L50 -42 V30 H-50 V-42 L-66 -50 Z" fill="${rojo}" stroke="${noche}" stroke-width="3" stroke-linejoin="round" />
              <path d="M-80 98 C-80 84 -62 80 -56 92 C-50 80 -32 84 -32 98 C-32 110 -56 122 -56 122 C-56 122 -80 110 -80 98 Z" fill="${rojo}" />
              <text x="-20" y="114" font-family="Lexend" font-weight="800" font-size="30" fill="${crema}">¡Llegó!</text>`)}</g>
          </g>
        </svg>
        <div class="bip s09-bip">BIP</div>
        <div class="sello s09-entro"><b>Entró</b></div>`,
    js: `
      const TE = 2.43, TALLE = 3.91, ENTRO = 4.58, INSTA = 5.30;
      ${introJs("s09", 1.83, 2.35)}
      pop(".s09-car", TE - 0.05, 0.4, 0.6);
      pop(".s09-o", TE, 0.3, 0.5); pop(".s09-tel", TE, 0.3, 0.8);
      ondear("s09-o", TE, 6.4);
      hablar(".s09p-boca", TE, 4.4); hablar(".s09p-boca", 4.58, 6.3);
      pop(".s09-rem", TALLE - 0.3, 0.35, 0.5);
      tl.fromTo(q(".s09-rem"), { rotation: -4, svgOrigin: "790 870" }, { rotation: 4, svgOrigin: "790 870", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, TALLE);
      golpe(".s09-entro", ENTRO + 0.05, 2.3);
      sacudon(ENTRO + 0.1, 0.8);
      tl.fromTo(q(".s09-cel"), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, INSTA - 0.15);
      gsap.set(q(".s09-cel"), { opacity: 0 });
      tl.to(q(".s09p-cejas"), { y: 6, duration: 0.2 }, INSTA);`,
    sfx: [
      { t: 0.0, sfx: "click", vol: 0.3 },
      { t: 0.5, sfx: "key-press", vol: 0.3 },
      { t: 2.4, sfx: "pop", vol: 0.25 },
      { t: 3.65, sfx: "whoosh-short", vol: 0.2 },
      { t: 4.6, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 5.2, sfx: "notification", vol: 0.28 },
    ],
  },
  // ---------------------------------------------------------------- s10
  {
    id: "s10-catorce",
    css: `
    [data-composition-id="s10-catorce"] .s10-tira { top: 1290px; }
    [data-composition-id="s10-catorce"] .s10-bip { top: 570px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-vel">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-200 + i * 40} ${700 + i * 110} H${300 + i * 60}" stroke="${crema}" stroke-width="6" stroke-linecap="round" opacity="0.35" />`).join("")}</g>
          <g transform="translate(540 1000) scale(1.22)"><g class="s10-maq">${contestador("s10c", ["04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"])}</g></g>
        </svg>
        <div class="tira s10-tira"><b>&gt;&gt; Avance rápido</b></div>
        <div class="bip s10-bip">BIP</div>`,
    js: `
      const CATORCE = 0.63, BIP = 1.73;
      lcd("s10c", 11, Array.from({ length: 11 }, (_, i) => [i, i * 0.058]));
      girar(".s10c-r1", "${R1}", 0, CATORCE, 4);
      girar(".s10c-r2", "${R2}", 0, CATORCE, 4);
      girar(".s10c-r1", "${R1}", CATORCE, DUR, 0.8);
      girar(".s10c-r2", "${R2}", CATORCE, DUR, 0.8);
      tl.fromTo(q(".s10-vel"), { x: -300, opacity: 1 }, { x: 900, opacity: 0, duration: 0.6, ease: "none" }, 0);
      tl.to(q(".s10c-t3"), { y: 6, duration: 0.3, yoyo: true, repeat: 1 }, 0);
      pop(".s10-tira", 0.0, 0.2, 0.7);
      fuera(".s10-tira", CATORCE + 0.2);
      tl.fromTo(q(".s10c-v10"), { scale: 1.4, svgOrigin: "185 -26" }, { scale: 1, svgOrigin: "185 -26", duration: 0.3, ease: "back.out(2.4)", immediateRender: false }, CATORCE);
      sacudon(CATORCE, 1.2);
      titilar([q(".s10c-luz"), q(".s10c-halo"), q(".s10c-v10")], CATORCE + 0.3, DUR, 0.4);
      bip(".s10-bip", BIP);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.3 },
      { t: 0.6, sfx: "impact-bass-2", vol: 0.38, max: 0.5 },
    ],
  },
];
