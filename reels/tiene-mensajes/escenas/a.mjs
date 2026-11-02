// Escenas s01 a s05: el gancho, Graciela, el dueño y el mensaje dos.
import { C, R1, R2, contestador, postit, onda, carnet, graciela, dueno } from "./lib.mjs";
const { noche, madera, beige, crema, rojo, am, verdeo } = C;

export default [
  // ---------------------------------------------------------------- s01
  {
    id: "s01-catorce",
    css: `
    [data-composition-id="s01-catorce"] .s01-ni { top: 600px; }
    [data-composition-id="s01-catorce"] .s01-ni b { font-size: 120px; transform: rotate(-7deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s01-cono" d="M300 300 L40 1400 H760 Z" fill="${am}" opacity="0.07" />
          <g transform="translate(540 1010) scale(1.18)"><g class="s01-maq">${contestador("s01c", ["14", "  "])}</g></g>
          ${postit("s01-p1", 200, 690, -9, "¿quién?")}
          ${postit("s01-p2", 880, 680, 7, "¿Gra...?")}
          ${postit("s01-p3", 190, 1340, 6, "¿el de|las...?")}
          ${postit("s01-p4", 890, 1350, -6, "¿¿??", { size: 54 })}
        </svg>
        <div class="sello s01-ni"><b>Ni uno</b></div>`,
    js: `
      const CATORCE = 0.36, NUEVOS = 1.92, Y = 2.49, QUIEN = 3.62, NINGUNO = 4.35;
      tl.fromTo(q(".s01-maq"), { scale: 0.86, opacity: 0.55, y: 40, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      // el 14 titila desde el principio y se enciende fijo en "catorce"
      lcd("s01c", 2, [[1, 0], [0, 0.12], [1, 0.24], [0, CATORCE]]);
      tl.fromTo(q(".s01c-v0"), { scale: 1.25, svgOrigin: "185 -26" }, { scale: 1, svgOrigin: "185 -26", duration: 0.25, ease: "back.out(2)" }, CATORCE);
      sacudon(CATORCE + 0.05, 1);
      titilar([q(".s01c-luz"), q(".s01c-halo")], 0, DUR, 0.5);
      // "nuevos": arranca la cinta
      tl.to(q(".s01c-play"), { y: 6, duration: 0.08, yoyo: true, repeat: 1 }, NUEVOS - 0.1);
      girar(".s01c-r1", "${R1}", NUEVOS, DUR, 0.9);
      girar(".s01c-r2", "${R2}", NUEVOS, DUR, 0.9);
      sacudon(NUEVOS, 0.6);
      // "y no te acordás": post-its con dudas
      pop(".s01-p1", Y, 0.3, 0.4); pop(".s01-p2", Y + 0.35, 0.3, 0.4); pop(".s01-p3", QUIEN - 0.15, 0.3, 0.4); pop(".s01-p4", QUIEN + 0.2, 0.3, 0.4);
      tl.to(qa(".s01-p1, .s01-p3"), { rotation: 5, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, Y + 0.4);
      tl.to(qa(".s01-p2, .s01-p4"), { rotation: -5, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, Y + 0.5);
      tl.fromTo(q(".s01-cono"), { rotation: -4, svgOrigin: "300 300" }, { rotation: 4, svgOrigin: "300 300", duration: 2.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
      // "ninguno": sello
      golpe(".s01-ni", NINGUNO, 2.4);
      sacudon(NINGUNO + 0.04, 1.4);
      tl.to(qa(".s01-p1, .s01-p2, .s01-p3, .s01-p4"), { opacity: 0.35, duration: 0.2 }, NINGUNO);`,
    sfx: [
      { t: 0.0, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
      { t: 0.34, sfx: "ping", vol: 0.3 },
      { t: 1.82, sfx: "click", vol: 0.35 },
      { t: 2.5, sfx: "pop", vol: 0.25 },
      { t: 2.85, sfx: "pop", vol: 0.22 },
      { t: 3.5, sfx: "pop", vol: 0.22 },
      { t: 4.3, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s02
  {
    id: "s02-tres-meses",
    css: `
    [data-composition-id="s02-tres-meses"] .s02-tira { top: 1096px; }
    [data-composition-id="s02-tres-meses"] .s02-bip { top: 1236px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(610 860) scale(1.3)"><g class="s02-maq">${contestador("s02c", ["01"])}</g></g>
          <g class="s02-cal">
            <rect x="400" y="1216" width="280" height="200" rx="12" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <text x="540" y="1350" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="80" fill="${noche}" data-layout-ignore>NOV</text>
            ${["OCT", "SEP", "AGO"].map((m, i) => `<g class="s02-h${2 - i}"><rect x="400" y="1216" width="280" height="200" rx="12" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <rect x="400" y="1216" width="280" height="50" rx="12" fill="${rojo}" stroke="${noche}" stroke-width="5" />
            <text x="540" y="1374" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="80" fill="${noche}" data-layout-ignore>${m}</text></g>`).join("")}
            <path d="M450 1206 V1232 M630 1206 V1232" stroke="${noche}" stroke-width="10" stroke-linecap="round" />
          </g>
        </svg>
        <div class="tira s02-tira"><b>Recibido hace 3 meses</b></div>
        <div class="bip s02-bip">BIP</div>`,
    js: `
      const UNO = 0.47, RECIBIDO = 0.91, TRES = 2.07, BIP = 3.35;
      tl.fromTo(q(".s02-maq"), { scale: 0.92, transformOrigin: "50% 50%" }, { scale: 1, duration: 3.9, ease: "sine.out" }, 0);
      girar(".s02c-r1", "${R1}", 0, DUR, 0.7);
      girar(".s02c-r2", "${R2}", 0, DUR, 0.7);
      titilar([q(".s02c-luz"), q(".s02c-halo")], 0, DUR, 0.5);
      tl.fromTo(q(".s02c-v0"), { scale: 1.3, svgOrigin: "185 -26" }, { scale: 1, svgOrigin: "185 -26", duration: 0.25, ease: "back.out(2)" }, UNO);
      pop(".s02-tira", RECIBIDO, 0.3, 0.6);
      pop(".s02-cal", RECIBIDO + 0.3, 0.35, 0.6);
      // las hojas del almanaque se arrancan: AGO, SEP, OCT
      [0, 1, 2].forEach((i) => {
        const t = TRES - 0.2 + i * 0.3;
        tl.to(q(".s02-h" + i), { y: 520, x: (i % 2 ? 1 : -1) * 160, rotation: (i % 2 ? 1 : -1) * 40, opacity: 0, svgOrigin: "540 1216", duration: 0.55, ease: "power2.in" }, t);
      });
      bip(".s02-bip", BIP);
      tl.to(q(".s02-cal"), { opacity: 0, duration: 0.15 }, BIP - 0.05);`,
    sfx: [
      { t: 0.0, sfx: "click", vol: 0.35 },
      { t: 0.9, sfx: "key-press", vol: 0.3 },
      { t: 1.9, sfx: "whoosh-short", vol: 0.25 },
      { t: 2.2, sfx: "whoosh-short", vol: 0.22 },
      { t: 2.5, sfx: "whoosh-short", vol: 0.22 },
    ],
  },
  // ---------------------------------------------------------------- s03
  {
    id: "s03-graciela",
    css: `
    [data-composition-id="s03-graciela"] .s03-sin { left: 520px; right: 20px; top: 1236px; }
    [data-composition-id="s03-graciela"] .s03-sin b { font-size: 70px; transform: rotate(-6deg); }
    [data-composition-id="s03-graciela"] .s03-pend { left: 60px; width: 500px; right: auto; top: 1262px; }
    [data-composition-id="s03-graciela"] .s03-pend b { font-size: 50px; transform: rotate(8deg); padding: 6px 20px; border-width: 6px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(300 830)"><g class="s03-car">${carnet("s03k", graciela("s03g"), "Graciela")}</g></g>
          ${onda("s03-o", 520, 700, { n: 20, w: 480, h: 150 })}
          <text class="s03-tel" x="520" y="610" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${beige}" letter-spacing="4">MENSAJE 01</text>
          <g class="s03-cort">
            <rect x="590" y="820" width="380" height="250" rx="8" fill="${verdeo}" stroke="${crema}" stroke-width="5" />
            <path d="M590 832 H970" stroke="${crema}" stroke-width="10" stroke-linecap="round" />
            <path class="s03-c1" d="M596 838 C620 900 600 980 640 1064 L740 1064 C700 980 720 900 700 838 Z" fill="${rojo}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
            <path class="s03-c2" d="M964 838 C940 900 960 980 920 1064 L820 1064 C860 980 840 900 860 838 Z" fill="${rojo}" stroke="${noche}" stroke-width="4" stroke-linejoin="round" />
            <path d="M630 860 C640 940 630 1000 660 1060 M930 860 C920 940 930 1000 900 1060" stroke="${noche}" stroke-width="3" fill="none" opacity="0.4" />
          </g>
          <g transform="translate(300 1250) rotate(-4)"><g class="s03-doc">
            <rect x="-210" y="-120" width="420" height="250" rx="8" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <text x="-180" y="-70" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${noche}" letter-spacing="3">PRESUPUESTO</text>
            <text x="-180" y="-14" font-family="Caveat" font-weight="700" font-size="44" fill="${noche}">Cortinas · Graciela</text>
            <path d="M-180 40 H160 M-180 70 H100" stroke="${noche}" stroke-width="4" opacity="0.3" />
            <text x="-180" y="112" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${noche}">TOTAL: $ ...</text>
          </g></g>
          <g class="s03-reloj" transform="translate(940 1140)">
            <circle r="44" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <path class="s03-aguja" d="M0 0 V-32" stroke="${noche}" stroke-width="6" stroke-linecap="round" />
            <path class="s03-aguja2" d="M0 0 H22" stroke="${rojo}" stroke-width="5" stroke-linecap="round" />
          </g>
        </svg>
        <div class="sello s03-pend"><b>Pendiente</b></div>
        <div class="sello am s03-sin"><b>Sin apuro</b></div>`,
    js: `
      const CORTINAS = 1.72, PRESU = 3.0, CUANDO = 3.89, SIN = 4.89;
      tl.fromTo(q(".s03-car"), { rotation: -8, scale: 0.85, opacity: 0.4, transformOrigin: "50% 50%" }, { rotation: -3, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0);
      pop(".s03-o", 0.05, 0.3, 0.5);
      pop(".s03-tel", 0.1, 0.3, 0.8);
      ondear("s03-o", 0, 5.4);
      hablar(".s03g-boca", 0, 1.9); hablar(".s03g-boca", 1.9, 3.6); hablar(".s03g-boca", 3.89, 5.4);
      // cortina
      pop(".s03-cort", CORTINAS - 0.1, 0.35, 0.6);
      tl.fromTo(q(".s03-c1"), { scaleX: 0.6, svgOrigin: "596 838" }, { scaleX: 1, svgOrigin: "596 838", duration: 0.5, ease: "power2.out", immediateRender: false }, CORTINAS);
      tl.fromTo(q(".s03-c2"), { scaleX: 0.6, svgOrigin: "964 838" }, { scaleX: 1, svgOrigin: "964 838", duration: 0.5, ease: "power2.out", immediateRender: false }, CORTINAS);
      // presupuesto pendiente
      pop(".s03-doc", PRESU - 0.1, 0.35, 0.6);
      golpe(".s03-pend", PRESU + 0.45, 2.2);
      // "cuando puedas, eh": la ceja se levanta
      tl.to(q(".s03g-cejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, CUANDO + 0.4);
      tl.to(q(".s03-car"), { rotation: 3, duration: 0.3, ease: "sine.inOut" }, CUANDO);
      // sin apuro: el reloj vuela
      pop(".s03-reloj", SIN - 0.3, 0.3, 0.4);
      tl.fromTo(q(".s03-aguja"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 1440, svgOrigin: "0 0", duration: DUR - SIN + 0.3, ease: "none", immediateRender: false }, SIN - 0.3);
      tl.fromTo(q(".s03-aguja2"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 360, svgOrigin: "0 0", duration: DUR - SIN + 0.3, ease: "none", immediateRender: false }, SIN - 0.3);
      golpe(".s03-sin", SIN + 0.05, 2.2);
      sacudon(SIN + 0.1, 0.8);`,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.25 },
      { t: 1.65, sfx: "whoosh-short", vol: 0.22 },
      { t: 2.9, sfx: "pop", vol: 0.25 },
      { t: 3.35, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
      { t: 4.6, sfx: "typing", vol: 0.2, max: 0.5 },
      { t: 4.92, sfx: "impact-bass-2", vol: 0.32, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s04
  {
    id: "s04-quien-era",
    css: `
    [data-composition-id="s04-quien-era"] .s04-preg { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${am}; text-shadow: 6px 6px 0 ${noche}; line-height: 1; }
    [data-composition-id="s04-quien-era"] .s04-cart { top: 600px; font-weight: 900; font-size: 86px; color: ${am}; text-shadow: 6px 6px 0 ${noche}; }
    [data-composition-id="s04-quien-era"] .s04-cart.no { color: ${rojo}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(560 1040) scale(1.35)"><g class="s04-due">${dueno("s04d")}</g></g>
          <g class="s04-flor">
            <path d="M270 1400 C 280 1300 300 1220 300 1150" stroke="${verdeo}" stroke-width="10" fill="none" stroke-linecap="round" />
            <path d="M286 1300 C 250 1280 230 1290 220 1270 C 250 1260 270 1270 286 1300 Z" fill="${verdeo}" stroke="${crema}" stroke-width="3" />
            ${Array.from({ length: 8 }, (_, i) => { const a = i * 45; return `<g transform="rotate(${a} 300 1110)"><ellipse class="s04-pe${i}" cx="300" cy="1052" rx="20" ry="42" fill="${crema}" stroke="${noche}" stroke-width="4" /></g>`; }).join("")}
            <circle cx="300" cy="1110" r="28" fill="${am}" stroke="${noche}" stroke-width="5" />
          </g>
        </svg>
        <div class="s04-preg s04-q1" style="left:800px;top:700px;font-size:160px">?</div>
        <div class="s04-preg s04-q2" style="left:150px;top:690px;font-size:130px">?</div>
        <div class="s04-preg s04-q3" style="left:880px;top:930px;font-size:100px">?</div>
        <div class="txt s04-cart s04-k0">Le mandé</div>
        <div class="txt s04-cart no s04-k1">No le mandé</div>`,
    js: `
      const QUE = 1.27, LE = 2.28;
      tl.fromTo(q(".s04-due"), { y: 40, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
      tl.fromTo(q(".s04d-brazo"), { rotation: -6, svgOrigin: "120 140" }, { rotation: 6, svgOrigin: "120 140", duration: 0.16, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
      hablar(".s04d-boca", 0.0, 0.9); hablar(".s04d-boca", QUE, 2.0); hablar(".s04d-boca", LE, 3.7);
      pop(".s04-q2", 0.05, 0.3, 0.3);
      pop(".s04-q1", QUE, 0.3, 0.3);
      pop(".s04-q3", QUE + 0.25, 0.3, 0.3);
      tl.to(qa(".s04-preg"), { y: -14, rotation: 10, duration: 0.45, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      tl.to(q(".s04d-cejas"), { y: -8, duration: 0.2, yoyo: true, repeat: 1 }, QUE);
      // la margarita
      pop(".s04-flor", LE - 0.35, 0.3, 0.5);
      gsap.set(qa(".s04-cart"), { opacity: 0 });
      for (let i = 0; i < 8; i++) {
        const t = LE + 0.1 + i * 0.2;
        tl.to(q(".s04-pe" + i), { y: 380, rotation: 70, opacity: 0, duration: 0.5, ease: "power2.in" }, t);
        tl.set(q(".s04-k" + (i % 2)), { opacity: 1 }, t);
        tl.set(q(".s04-k" + ((i + 1) % 2)), { opacity: 0 }, t);
      }
      tl.fromTo(q(".s04-flor"), { rotation: -4, svgOrigin: "270 1400" }, { rotation: 4, svgOrigin: "270 1400", duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, LE);`,
    sfx: [
      { t: 0.0, sfx: "click-soft", vol: 0.3 },
      { t: 0.05, sfx: "pop", vol: 0.22 },
      { t: 1.27, sfx: "pop", vol: 0.25 },
      { t: 2.38, sfx: "key-press", vol: 0.2 },
      { t: 2.78, sfx: "key-press", vol: 0.2 },
      { t: 3.18, sfx: "key-press", vol: 0.2 },
    ],
  },
  // ---------------------------------------------------------------- s05
  {
    id: "s05-telaranas",
    css: `
    [data-composition-id="s05-telaranas"] .s05-tira { top: 1270px; }
    [data-composition-id="s05-telaranas"] .s05-bip { top: 590px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 990) scale(1.1)"><g class="s05-maq">${contestador("s05c", ["02"])}</g></g>
          <g class="s05-web1" opacity="0.85">
            ${[0, 18, 36, 54, 72, 90].map((a) => { const r = (a * Math.PI) / 180; return `<path class="s05-w" d="M150 790 L${(150 + Math.cos(r) * 230).toFixed(0)} ${(790 + Math.sin(r) * 230).toFixed(0)}" stroke="${crema}" stroke-width="3" fill="none" />`; }).join("")}
            ${[70, 130, 190].map((rr) => `<path class="s05-w" d="M${150 + rr} 790 ${[18, 36, 54, 72, 90].map((a) => { const r = (a * Math.PI) / 180; return `Q${(150 + Math.cos(r - 0.16) * rr * 0.86).toFixed(0)} ${(790 + Math.sin(r - 0.16) * rr * 0.86).toFixed(0)} ${(150 + Math.cos(r) * rr).toFixed(0)} ${(790 + Math.sin(r) * rr).toFixed(0)}`; }).join(" ")}" stroke="${crema}" stroke-width="3" fill="none" />`).join("")}
          </g>
          <g class="s05-web2" opacity="0.85">
            ${[180, 198, 216, 234, 252, 270].map((a) => { const r = (a * Math.PI) / 180; return `<path class="s05-w" d="M935 1200 L${(935 + Math.cos(r) * 200).toFixed(0)} ${(1200 + Math.sin(r) * 200).toFixed(0)}" stroke="${crema}" stroke-width="3" fill="none" />`; }).join("")}
            ${[60, 115, 170].map((rr) => `<path class="s05-w" d="M${935 - rr} 1200 ${[198, 216, 234, 252, 270].map((a) => { const r = (a * Math.PI) / 180; return `Q${(935 + Math.cos(r - 0.16) * rr * 0.86).toFixed(0)} ${(1200 + Math.sin(r - 0.16) * rr * 0.86).toFixed(0)} ${(935 + Math.cos(r) * rr).toFixed(0)} ${(1200 + Math.sin(r) * rr).toFixed(0)}`; }).join(" ")}" stroke="${crema}" stroke-width="3" fill="none" />`).join("")}
          </g>
          <g class="s05-ara">
            <path d="M820 540 V700" stroke="${crema}" stroke-width="2.5" />
            <g transform="translate(820 718)">
              ${[-1, 1].map((sx) => [-14, -4, 6, 16].map((y, i) => `<path d="M0 ${y} q${sx * 26} ${-14 + i * 4} ${sx * 40} ${10 + i * 6}" stroke="${noche}" stroke-width="5" fill="none" stroke-linecap="round" />`).join("")).join("")}
              <ellipse cx="0" cy="0" rx="18" ry="22" fill="${noche}" stroke="${crema}" stroke-width="3" />
              <circle cx="-6" cy="-6" r="4" fill="${crema}" /><circle cx="6" cy="-6" r="4" fill="${crema}" />
            </g>
          </g>
        </svg>
        <div class="tira s05-tira"><b>Hace 7 semanas</b></div>
        <div class="bip s05-bip">BIP</div>`,
    js: `
      const DOS = 0.59, HACE = 1.30, SIETE = 1.48, BIP = 3.18;
      tl.fromTo(q(".s05-maq"), { scale: 1.08, opacity: 0.5, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
      girar(".s05c-r1", "${R1}", 0, DUR, 0.7);
      girar(".s05c-r2", "${R2}", 0, DUR, 0.7);
      titilar([q(".s05c-luz"), q(".s05c-halo")], 0, DUR, 0.5);
      tl.fromTo(q(".s05c-v0"), { scale: 1.3, svgOrigin: "185 -26" }, { scale: 1, svgOrigin: "185 -26", duration: 0.25, ease: "back.out(2)" }, DOS);
      dibujar(qa(".s05-web1 .s05-w"), HACE, 0.6);
      dibujar(qa(".s05-web2 .s05-w"), HACE + 0.2, 0.6);
      pop(".s05-tira", HACE, 0.3, 0.6);
      tl.fromTo(q(".s05-ara"), { y: -260 }, { y: 0, duration: 0.9, ease: "bounce.out" }, SIETE);
      tl.to(q(".s05-ara"), { rotation: 8, svgOrigin: "820 540", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, SIETE + 0.9);
      bip(".s05-bip", BIP);`,
    sfx: [
      { t: 0.0, sfx: "click", vol: 0.3 },
      { t: 0.55, sfx: "key-press", vol: 0.3 },
      { t: 1.3, sfx: "sparkle", vol: 0.2, max: 0.8 },
      { t: 1.5, sfx: "whoosh-short", vol: 0.2 },
    ],
  },
];
