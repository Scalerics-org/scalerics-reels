// Escenas s06 a s10: "algún marzo", las ojotas, la vidriera, el confesionario y el giro.
import { C, caja, norma, patricia, peaton } from "./lib.mjs";
import { fachada } from "./a.mjs";
const { cem, cem2, gris, kraft, kraft2, cinta, rojo, crema } = C;

const hoja = (cls, x, y, r) => `<g class="${cls}"><g transform="translate(${x} ${y}) rotate(${r})">
  <rect x="-60" y="-70" width="120" height="140" rx="6" fill="${crema}" stroke="${cem2}" stroke-width="4" />
  <rect x="-60" y="-70" width="120" height="40" rx="6" fill="${rojo}" />
  <text x="0" y="-40" text-anchor="middle" font-family="Black Ops One" font-size="26" fill="${crema}" data-layout-ignore>MARZO</text>
  <text x="0" y="40" text-anchor="middle" font-family="Black Ops One" font-size="54" fill="${cem2}" data-layout-ignore>?</text>
</g></g>`;
const sol = (cls, x, y) => `<g class="${cls}">
  <circle cx="${x}" cy="${y}" r="38" fill="${cinta}" stroke="${cem2}" stroke-width="4" />
  ${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return `<path d="M${(x + Math.cos(a) * 50).toFixed(1)} ${(y + Math.sin(a) * 50).toFixed(1)} L${(x + Math.cos(a) * 68).toFixed(1)} ${(y + Math.sin(a) * 68).toFixed(1)}" stroke="${cinta}" stroke-width="7" stroke-linecap="round" />`; }).join("")}
</g>`;
const brillo = (cls, x, y, s = 1) => `<path class="${cls}" d="M${x} ${y - 30 * s} Q${x + 4 * s} ${y - 4 * s} ${x + 30 * s} ${y} Q${x + 4 * s} ${y + 4 * s} ${x} ${y + 30 * s} Q${x - 4 * s} ${y + 4 * s} ${x - 30 * s} ${y} Q${x - 4 * s} ${y - 4 * s} ${x} ${y - 30 * s} Z" fill="${cinta}" />`;
const ojota = (x, y, color, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})">
  <path d="M0 -90 C40 -90 46 -40 40 0 C34 50 30 90 0 90 C-30 90 -36 50 -40 0 C-46 -40 -40 -90 0 -90 Z" fill="${color}" stroke="${cem2}" stroke-width="4" />
  <path d="M0 -60 L-34 -10 M0 -60 L34 -10" stroke="${crema}" stroke-width="9" stroke-linecap="round" fill="none" />
</g>`;

export default [
  // ---------------------------------------------------------------- s06
  {
    id: "s06-algun-marzo",
    css: `
    [data-composition-id="s06-algun-marzo"] .s06-tira { top: 1210px; transform: rotate(-4deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${hoja("s06-h1", 170, 700, -14)}${hoja("s06-h2", 900, 660, 12)}${hoja("s06-h3", 130, 1060, 8)}${hoja("s06-h4", 940, 1040, -10)}
          <g transform="translate(540 880) scale(1.05)"><g class="s06-nor">${norma("s06n", { brazos: "cruzados" })}</g></g>
        </svg>
        <div class="tira s06-tira"><span>¡ALGÚN MARZO!</span></div>`,
    js: `
      const MARZO = 0.84;
      tl.fromTo(q(".s06-nor"), { rotation: 0, transformOrigin: "50% 100%" }, { rotation: -5, duration: 0.35, ease: "back.out(2)" }, 0.05);
      tl.fromTo(q(".s06n-ojos"), { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.2, duration: 0.08, yoyo: true, repeat: 1 }, 0.5);
      hablar(".s06n-boca", 0, 1.5);
      ["s06-h1", "s06-h2", "s06-h3", "s06-h4"].forEach((h, i) => {
        tl.fromTo(q("." + h), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.05 + i * 0.12);
        tl.to(q("." + h), { y: 30, rotation: i % 2 ? 10 : -10, transformOrigin: "50% 50%", duration: 0.7, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.5 + i * 0.12);
      });
      tira(".s06-tira", MARZO - 0.1, 1300);
      sacudon(MARZO, 0.8);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
      { t: 0.75, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s07
  {
    id: "s07-ojotas",
    css: `
    [data-composition-id="s07-ojotas"] .s07-tag { position: absolute; left: 100px; top: 760px; font-size: 54px; color: ${cinta}; transform: rotate(-6deg); white-space: nowrap; }
    [data-composition-id="s07-ojotas"] .s07-cartel { position: absolute; left: 110px; top: 1190px; width: 860px; height: 150px; background: ${kraft}; border: 5px solid ${cem2}; border-radius: 6px; display: flex; align-items: center; justify-content: center; transform: rotate(-2deg); box-shadow: 8px 8px 0 rgba(0,0,0,0.4); }
    [data-composition-id="s07-ojotas"] .s07-cartel span { font-family: "Caveat", cursive; font-weight: 700; font-size: 62px; color: ${cem2}; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${sol("s07-sol1", 150, 650)}${sol("s07-sol2", 320, 650)}
          <path class="s07-x1" d="M120 620 L180 680 M180 620 L120 680" stroke="${rojo}" stroke-width="10" stroke-linecap="round" />
          <path class="s07-x2" d="M290 620 L350 680 M350 620 L290 680" stroke="${rojo}" stroke-width="10" stroke-linecap="round" />
          <g class="s07-oj">${ojota(560, 850, cinta, -12)}${ojota(670, 860, rojo, 10)}
            <g class="s07-polvo" fill="${crema}"><circle cx="560" cy="960" r="6" opacity="0.5" /><circle cx="640" cy="975" r="5" opacity="0.4" /><circle cx="700" cy="965" r="7" opacity="0.45" /></g>
          </g>
          <path d="M720 790 L930 820" stroke="${gris}" stroke-width="12" stroke-linecap="round" />
          <path d="M720 790 L700 770 M720 790 L702 812" stroke="${gris}" stroke-width="8" stroke-linecap="round" />
          ${brillo("s07-b1", 480, 740, 1)}${brillo("s07-b2", 760, 720, 0.8)}${brillo("s07-b3", 740, 960, 0.7)}${brillo("s07-b4", 470, 960, 0.6)}
          <g transform="translate(860 900)"><g class="s07-pat">${patricia("s07p", { brazo: "arriba" })}</g></g>
          <g transform="translate(250 1000) scale(0.9)"><g class="s07-nor">${norma("s07n", { brazos: "manos" })}</g></g>
        </svg>
        <div class="mano s07-tag">hace 2 veranos</div>
        <div class="s07-cartel"><span>El que quiera, que venga al local</span></div>`,
    js: `
      const OJ = 0.48, SON = 1.56, DOS = 1.83, NUEV = 3.48, EL = 3.95, VENGA = 4.65;
      tl.fromTo(q(".s07-pat"), { x: 300 }, { x: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".s07-oj"), { y: -40, rotation: -6, transformOrigin: "50% 0%" }, { y: 0, rotation: 6, transformOrigin: "50% 0%", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s07-polvo"), { y: 0, opacity: 1 }, { y: 120, opacity: 0, duration: 0.8, repeat: 2, ease: "power1.in" }, OJ);
      hablar(".s07p-boca", 0, 1.1);
      gsap.set(q(".s07-nor"), { opacity: 0 });
      tl.fromTo(q(".s07-nor"), { opacity: 1, x: -400 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, SON - 0.2);
      hablar(".s07n-boca", SON, 5.0);
      pop(".s07-sol1", DOS, 0.3, 0.4); pop(".s07-sol2", DOS + 0.2, 0.3, 0.4);
      dibujar(".s07-x1", DOS + 0.45, 0.2); dibujar(".s07-x2", DOS + 0.6, 0.2);
      pop(".s07-tag", DOS + 0.3, 0.3, 0.7);
      ["s07-b1", "s07-b2", "s07-b3", "s07-b4"].forEach((b, i) => {
        gsap.set(q("." + b), { opacity: 0 });
        tl.fromTo(q("." + b), { opacity: 0, scale: 0, rotation: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 90, duration: 0.3, ease: "back.out(2)", immediateRender: false }, NUEV - 0.1 + i * 0.08);
        tl.to(q("." + b), { scale: 0.5, duration: 0.25, yoyo: true, repeat: 3 }, NUEV + 0.3 + i * 0.08);
      });
      tl.to(q(".s07-nor"), { x: 90, rotation: 4, transformOrigin: "50% 100%", duration: 0.3, ease: "power2.out" }, NUEV);
      fuera([".s07-sol1", ".s07-sol2", ".s07-x1", ".s07-x2", ".s07-tag"], EL - 0.2, 0.2);
      gsap.set(q(".s07-cartel"), { opacity: 0 });
      tl.fromTo(q(".s07-cartel"), { opacity: 1, y: 300, rotation: 6 }, { opacity: 1, y: 0, rotation: -2, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, EL);
      tl.to(q(".s07-cartel"), { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, VENGA);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
      { t: 0.5, sfx: "glitch-1", vol: 0.2, max: 0.3 },
      { t: 1.85, sfx: "pop", vol: 0.28 },
      { t: 2.05, sfx: "pop", vol: 0.25 },
      { t: 3.45, sfx: "sparkle", vol: 0.32, max: 0.9 },
      { t: 3.95, sfx: "whoosh", vol: 0.25 },
    ],
  },
  // ---------------------------------------------------------------- s08
  {
    id: "s08-vidriera",
    css: `
    [data-composition-id="s08-vidriera"] .s08-una { top: 620px; font-family: "Black Ops One", sans-serif; font-size: 92px; color: ${cinta}; text-shadow: 6px 6px 0 ${rojo}; }
    [data-composition-id="s08-vidriera"] .s08-medio { top: 1270px; }
    [data-composition-id="s08-vidriera"] .s08-medio b { font-size: 64px; transform: rotate(-5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(180 760) scale(1.5)">${fachada("s08-fa", 0, 0, 480)}</g>
          <rect x="-40" y="1210" width="1160" height="38" fill="${gris}" stroke="${crema}" stroke-width="4" />
          <rect x="-40" y="1248" width="1160" height="120" fill="${cem2}" />
          <path d="M0 1310 H1080" stroke="${crema}" stroke-width="6" stroke-dasharray="50 40" opacity="0.4" />
          <rect class="s08-marco" x="215" y="900" width="365" height="290" rx="6" fill="none" stroke="${cinta}" stroke-width="10" stroke-dasharray="26 14" />
          <g class="s08-viento">
            <path class="s08-v1" d="M80 1060 Q300 1040 520 1070" stroke="${crema}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5" />
            <path class="s08-v2" d="M600 1120 Q800 1100 1000 1130" stroke="${crema}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5" />
          </g>
          <g class="s08-rod"><g transform="translate(0 1160)">
            <circle cx="0" cy="0" r="52" fill="none" stroke="${kraft}" stroke-width="5" />
            <path d="M-40 -20 Q0 40 40 -20 M-30 30 Q0 -40 30 30 M-50 0 Q0 -10 50 0 M-20 -46 Q-10 0 -24 46 M20 -46 Q10 0 26 44" stroke="${kraft2}" stroke-width="5" fill="none" stroke-linecap="round" />
          </g></g>
          <g class="s08-cinta">
            <rect x="100" y="1216" width="560" height="26" fill="${cinta}" stroke="${cem2}" stroke-width="3" />
            ${Array.from({ length: 14 }, (_, i) => `<path d="M${110 + i * 40} 1216 V${i % 2 ? 1228 : 1236}" stroke="${cem2}" stroke-width="3" />`).join("")}
            <rect x="660" y="1206" width="60" height="46" rx="8" fill="${rojo}" stroke="${cem2}" stroke-width="3" />
          </g>
        </svg>
        <div class="txt s08-una">1 sola vidriera</div>
        <div class="txt sello s08-medio"><b>Medio metro</b></div>`,
    js: `
      const NADIE = 0.19, SOLA = 2.69, VID = 3.27, MEDIO = 4.69, METRO = 5.19;
      tl.fromTo(q(".s08-esc"), { scale: 1.12, transformOrigin: "50% 55%" }, { scale: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, 0);
      dibujar(".s08-v1", NADIE, 0.5); dibujar(".s08-v2", NADIE + 0.3, 0.5);
      fuera(".s08-viento", 1.5, 0.3);
      gsap.set(q(".s08-rod"), { opacity: 0 });
      tl.fromTo(q(".s08-rod"), { opacity: 1, x: -120 }, { opacity: 1, x: 1220, duration: 2.2, ease: "none", immediateRender: false }, NADIE);
      tl.fromTo(q(".s08-rod > g"), { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 720, transformOrigin: "50% 50%", duration: 2.2, ease: "none" }, NADIE);
      tl.fromTo(q(".s08-rod > g > *"), { y: 0 }, { y: -40, duration: 0.25, yoyo: true, repeat: 7, ease: "sine.out" }, NADIE);
      dibujar(".s08-marco", SOLA - 0.1, 0.5);
      golpe(".s08-una", VID - 0.1, 2.0);
      tl.to(q(".s08-marco"), { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 3 }, VID + 0.3);
      gsap.set(q(".s08-cinta"), { opacity: 0 });
      tl.fromTo(q(".s08-cinta"), { opacity: 1, scaleX: 0, svgOrigin: "100 1229" }, { opacity: 1, scaleX: 1, svgOrigin: "100 1229", duration: 0.5, ease: "power3.out", immediateRender: false }, MEDIO - 0.1);
      golpe(".s08-medio", METRO + 0.1, 2.4);
      sacudon(METRO + 0.1, 1.2);`,
    sfx: [
      { t: 0.2, sfx: "whoosh-cinematic", vol: 0.25, max: 1.6 },
      { t: 2.65, sfx: "click", vol: 0.3 },
      { t: 3.2, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 4.6, sfx: "typing", vol: 0.25, max: 0.5 },
      { t: 5.25, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s09
  {
    id: "s09-confesionario",
    css: `
    [data-composition-id="s09-confesionario"] .s09-oscuro { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; background: ${cem2}; opacity: 0.94; }`,
    html: `
        <div class="s09-oscuro"></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path d="M540 520 L180 1380 H900 Z" fill="${crema}" opacity="0.07" />
          <ellipse cx="540" cy="1360" rx="330" ry="40" fill="${crema}" opacity="0.08" />
          <rect x="370" y="1150" width="340" height="40" rx="10" fill="${kraft2}" stroke="${crema}" stroke-width="4" />
          <path d="M400 1190 L390 1360 M680 1190 L690 1360" stroke="${crema}" stroke-width="10" stroke-linecap="round" />
          <g transform="translate(540 900) scale(1.1)"><g class="s09-nor">${norma("s09n", { brazos: "manos" })}</g></g>
          <path class="s09-panu" d="M510 1170 Q540 1130 570 1172 Q560 1196 540 1186 Q520 1196 510 1170 Z" fill="${crema}" stroke="${gris}" stroke-width="3" />
          <defs><clipPath id="s09-clip"><rect x="700" y="600" width="320" height="230" rx="10" /></clipPath></defs>
          <g class="s09-ins">
            <rect x="700" y="600" width="320" height="230" rx="10" fill="${cem}" stroke="${crema}" stroke-width="5" />
            <g clip-path="url(#s09-clip)">
              <rect x="700" y="790" width="320" height="40" fill="${gris}" />
              <g class="s09-pa1"><g transform="translate(760 795) scale(0.6)">${peaton("s09-p1")}</g></g>
              <g class="s09-pa2"><g transform="translate(900 795) scale(0.6)">${peaton("s09-p2", kraft2)}</g></g>
            </g>
            <text x="860" y="870" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${crema}" letter-spacing="3">LA VEREDA</text>
          </g>
        </svg>
        <div class="zoc s09-z1"><div class="tab">Confesionario</div><div class="tit">Norma</div></div>`,
    js: `
      const ACUM = 0.54, VENDER = 2.36, GENTE = 3.36, PASA = 3.63;
      gsap.set(q(".s09-oscuro"), { opacity: 0.94 });
      zocalos([[".s09-z1", 0.1]]);
      tl.fromTo(q(".s09-nor"), { rotation: -4, transformOrigin: "50% 30%" }, { rotation: 4, transformOrigin: "50% 30%", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, ACUM);
      hablar(".s09n-boca", 0, 2.9);
      hablar(".s09n-boca", 3.2, 5.2);
      tl.to(q(".s09-panu"), { y: -50, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, VENDER - 0.2);
      gsap.set(q(".s09-ins"), { opacity: 0 });
      tl.fromTo(q(".s09-ins"), { opacity: 0, scale: 0.6, svgOrigin: "860 715" }, { opacity: 1, scale: 1, svgOrigin: "860 715", duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, GENTE - 0.2);
      tl.fromTo(q(".s09-pa1"), { x: -160 }, { x: 320, duration: 2.2, ease: "none" }, GENTE - 0.2);
      tl.fromTo(q(".s09-pa2"), { x: -560 }, { x: 60, duration: 2.2, ease: "none" }, GENTE - 0.2);
      tl.set(q(".s09n-lagrima"), { opacity: 1 }, PASA);
      tl.fromTo(q(".s09n-lagrima"), { y: 0 }, { y: 50, duration: 1.2, ease: "power1.in" }, PASA);
      tl.fromTo(q(".s09n-cejas"), { rotation: 0, transformOrigin: "50% 50%" }, { y: -6, duration: 0.3 }, PASA);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
      { t: 3.2, sfx: "pop", vol: 0.22 },
      { t: 3.6, sfx: "chime", vol: 0.2, max: 0.8 },
    ],
  },
  // ---------------------------------------------------------------- s10
  {
    id: "s10-giro",
    css: `
    [data-composition-id="s10-giro"] .s10-vos { top: 610px; font-family: "Black Ops One", sans-serif; font-size: 96px; color: ${crema}; }
    [data-composition-id="s10-giro"] .s10-vos span { color: ${cinta}; }
    [data-composition-id="s10-giro"] .s10-busca { top: 640px; font-weight: 800; font-size: 60px; color: ${cinta}; }
    [data-composition-id="s10-giro"] .s10-mira { top: 1230px; font-weight: 800; font-size: 54px; color: ${crema}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 960)"><g class="s10-pat">${patricia("s10p")}</g></g>
          <defs><clipPath id="s10-clip"><rect x="300" y="780" width="480" height="400" /></clipPath></defs>
          <g class="s10-dep">
            ${caja("s10-cj", 320, 860, 440, 300, { txt: "CAMPERAS", tam: 40 })}
            <g class="s10-lupa"><circle cx="640" cy="900" r="70" fill="${crema}" fill-opacity="0.2" stroke="${cinta}" stroke-width="12" /><path d="M690 950 L760 1020" stroke="${cinta}" stroke-width="22" stroke-linecap="round" /></g>
            <g clip-path="url(#s10-clip)"><g class="s10-pers">
              <rect x="300" y="780" width="480" height="400" fill="${gris}" stroke="${crema}" stroke-width="5" />
              ${Array.from({ length: 10 }, (_, i) => `<path d="M300 ${820 + i * 38} H780" stroke="${cem2}" stroke-width="4" opacity="0.6" />`).join("")}
            </g></g>
            <g class="s10-candado"><rect x="500" y="1100" width="80" height="64" rx="8" fill="${rojo}" stroke="${cem2}" stroke-width="4" /><path d="M515 1100 V1080 Q540 1046 565 1080 V1100" stroke="${cem2}" stroke-width="8" fill="none" /></g>
          </g>
          <g class="s10-cel"><rect x="880" y="820" width="150" height="270" rx="22" fill="${cem2}" stroke="${crema}" stroke-width="5" /><rect x="894" y="846" width="122" height="218" rx="10" fill="${crema}" /></g>
          ${[0, 1, 2, 3, 4].map((i) => `<g class="s10-ojo"><ellipse cx="${100 + i * 150}" cy="1340" rx="30" ry="20" fill="${crema}" stroke="${cem2}" stroke-width="3" /><ellipse cx="${150 + i * 150}" cy="1340" rx="30" ry="20" fill="${crema}" stroke="${cem2}" stroke-width="3" />
            <g class="s10-pup"><circle cx="${100 + i * 150}" cy="1342" r="9" fill="${cem2}" /><circle cx="${150 + i * 150}" cy="1342" r="9" fill="${cem2}" /></g></g>`).join("")}
        </svg>
        <div class="txt s10-vos">Vos no <span>acumulás</span></div>
        <div class="txt s10-busca">Lo que la gente busca</div>
        <div class="txt s10-mira">...donde la gente no mira</div>`,
    js: `
      const NO = 1.0, ACUM = 1.24, TENES = 2.23, BUSCA = 3.09, GUARD = 3.8, NOMIRA = 4.73;
      hablar(".s10p-boca", 0, 2.0);
      // se saca los guantes y los revolea
      tl.to(q(".s10p-gd"), { x: 420, y: -620, rotation: 300, transformOrigin: "50% 50%", opacity: 0, duration: 0.8, ease: "power2.out" }, 0.3);
      tl.to(q(".s10p-gi"), { x: -420, y: -600, rotation: -260, transformOrigin: "50% 50%", opacity: 0, duration: 0.8, ease: "power2.out" }, 0.45);
      golpe(".s10-vos", ACUM, 2.0);
      sacudon(ACUM + 0.05, 1.0);
      fuera([".s10-vos", ".s10-pat"], TENES - 0.15, 0.2);
      gsap.set(q(".s10-dep"), { opacity: 0 });
      tl.fromTo(q(".s10-dep"), { opacity: 0, scale: 0.8, svgOrigin: "540 1010" }, { opacity: 1, scale: 1, svgOrigin: "540 1010", duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, TENES);
      tl.fromTo(q(".s10-lupa"), { x: -180, y: 60 }, { x: 0, y: 0, duration: 0.6, ease: "sine.inOut" }, TENES + 0.1);
      tl.to(q(".s10-lupa"), { x: -80, y: 40, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, TENES + 0.75);
      pop(".s10-busca", BUSCA - 0.2, 0.3, 0.8);
      tl.fromTo(q(".s10-pers"), { y: -400 }, { y: 0, duration: 0.45, ease: "bounce.out" }, GUARD);
      pop(".s10-candado", GUARD + 0.4, 0.3, 0.3);
      fuera(".s10-lupa", GUARD, 0.1);
      pop(".s10-mira", GUARD + 0.5, 0.3, 0.8);
      pop(".s10-cel", NOMIRA - 0.3, 0.3, 0.5);
      qa(".s10-ojo").forEach((o, i) => pop(o, NOMIRA - 0.3 + i * 0.05, 0.25, 0.5));
      tl.fromTo(qa(".s10-pup"), { x: -8, y: 0 }, { x: 14, y: -6, duration: 0.2, ease: "power2.out" }, NOMIRA);
      tl.to(q(".s10-cel"), { rotation: 6, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 5 }, NOMIRA + 0.2);`,
    sfx: [
      { t: 0.3, sfx: "whoosh", vol: 0.3 },
      { t: 1.2, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 2.25, sfx: "pop", vol: 0.25 },
      { t: 3.8, sfx: "glitch-2", vol: 0.25, max: 0.5 },
      { t: 4.2, sfx: "click", vol: 0.35 },
      { t: 4.5, sfx: "notification", vol: 0.25, max: 0.8 },
    ],
  },
];
