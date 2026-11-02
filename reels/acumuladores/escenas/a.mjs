// Escenas s01 a s05: el gancho, el programa, Patricia, "¡esa no!" y la etiqueta.
import { C, caja, pared, norma, patricia, peaton } from "./lib.mjs";
const { cem, cem2, gris, kraft, kraft2, cinta, rojo, crema } = C;

// fachada del bazar (x, y = esquina superior izquierda del frente, 480 x 300)
export const fachada = (p, x, y, w = 480) => `
<g class="${p}">
  <rect x="${x}" y="${y}" width="${w}" height="300" fill="${cem}" stroke="${crema}" stroke-width="5" />
  <rect x="${x + 20}" y="${y + 16}" width="${w - 40}" height="60" rx="6" fill="${rojo}" stroke="${crema}" stroke-width="4" />
  <text x="${x + w / 2}" y="${y + 58}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="34" fill="${crema}" letter-spacing="2">BAZAR NORMA</text>
  <rect class="${p}-vid" x="${x + 30}" y="${y + 100}" width="${w * 0.48}" height="180" fill="${cem2}" stroke="${crema}" stroke-width="5" />
  <rect x="${x + 44}" y="${y + 196}" width="54" height="40" fill="${kraft}" stroke="${cem2}" stroke-width="3" />
  <rect x="${x + 102}" y="${y + 176}" width="48" height="60" fill="${kraft}" stroke="${cem2}" stroke-width="3" />
  <rect x="${x + 70}" y="${y + 150}" width="44" height="34" fill="${kraft}" stroke="${cem2}" stroke-width="3" />
  <path d="M${x + 160} ${y + 236} q20 -40 40 0" fill="${cinta}" stroke="${cem2}" stroke-width="3" />
  <path d="M${x + 30} ${y + 236} H${x + 30 + w * 0.48}" stroke="${crema}" stroke-width="4" />
  <rect x="${x + w * 0.62}" y="${y + 100}" width="${w * 0.3}" height="200" fill="${kraft2}" stroke="${crema}" stroke-width="5" />
  <circle cx="${x + w * 0.62 + 22}" cy="${y + 210}" r="7" fill="${cinta}" />
  <rect x="${x + w * 0.66}" y="${y + 120}" width="${w * 0.22}" height="40" fill="${crema}" />
  <text x="${x + w * 0.77}" y="${y + 150}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="30" fill="${cem2}" data-layout-ignore>abierto</text>
</g>`;

export default [
  // ---------------------------------------------------------------- s01
  {
    id: "s01-camperas",
    css: `
    [data-composition-id="s01-camperas"] .s01-300 { top: 700px; }
    [data-composition-id="s01-camperas"] .s01-300 b { font-size: 112px; transform: rotate(-7deg); }
    [data-composition-id="s01-camperas"] .s01-tira { top: 1060px; transform: rotate(9deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-pared">${pared("s01-c", { filas: 6, txts: ["CAMPERAS", "CAMPERAS", "ojotas", "CAMPERAS", "tazas", "CAMPERAS", "CAMPERAS"], urg: [3, 9, 16, 27], fra: [5, 20] })}</g>
          <g class="s01-frente">
            <rect x="-40" y="1300" width="1160" height="80" fill="${gris}" stroke="${crema}" stroke-width="4" />
            <path d="M-40 1316 H1120" stroke="${crema}" stroke-width="3" opacity="0.4" />
            ${fachada("s01-fa", 300, 1000)}
          </g>
          <g class="s01-pea"><g transform="translate(0 1300) scale(0.85)">${peaton("s01-pe")}</g></g>
          <g class="s01-flecha">
            <path class="s01-fl" d="M900 1180 Q960 1240 900 1292" stroke="${cinta}" stroke-width="8" fill="none" stroke-linecap="round" />
            <path class="s01-fl2" d="M880 1268 L900 1294 L928 1278" stroke="${cinta}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <text x="900" y="1160" text-anchor="middle" font-family="Black Ops One" font-size="46" fill="${cinta}">VEREDA</text>
          </g>
        </svg>
        <div class="txt sello s01-300"><b>300 camperas</b></div>
        <div class="tira s01-tira"><span>NO TOCAR · NO TOCAR · NO TOCAR</span></div>
        <div class="zoc s01-z1"><div class="tab">Caso 12</div><div class="tit">Vende solo por la vereda</div></div>`,
    js: `
      const TRES = 0.55, GUARD = 1.74, VENDE = 3.01, PASAN = 4.11, VEREDA = 4.82;
      // cuadro 0: la pared ya está; las últimas cajas caen arriba
      qa(".s01-c-f5").forEach((el, i) => cae(el, 0.02 + i * 0.07, -200, 0.4));
      qa(".s01-c-f4").forEach((el, i) => { if (i % 2) tl.fromTo(el, { y: -30 }, { y: 0, duration: 0.3, ease: "bounce.out" }, 0.3 + i * 0.05); });
      golpe(".s01-300", TRES, 2.4);
      sacudon(TRES + 0.05, 1.4);
      tl.to(q(".s01-300"), { scale: 1.06, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, TRES + 0.2);
      tira(".s01-tira", GUARD);
      // "y vende solo": la pared se achica y aparece el frente del bazar
      fuera([".s01-300", ".s01-tira"], VENDE - 0.1, 0.2);
      tl.to(q(".s01-pared"), { scale: 0.5, svgOrigin: "540 600", duration: 0.5, ease: "power3.inOut" }, VENDE);
      gsap.set(q(".s01-frente"), { opacity: 0 });
      tl.fromTo(q(".s01-frente"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, VENDE + 0.15);
      zocalos([[".s01-z1", VENDE + 0.1]]);
      // el peatón pasa de largo, mirando el celular
      gsap.set(q(".s01-pea"), { opacity: 0 });
      tl.fromTo(q(".s01-pea"), { opacity: 1, x: -120 }, { opacity: 1, x: 1200, duration: 2.0, ease: "none", immediateRender: false }, PASAN - 0.5);
      tl.fromTo(q(".s01-pe"), { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 11, ease: "sine.inOut" }, PASAN - 0.5);
      dibujar(".s01-fl", VEREDA - 0.1, 0.35); dibujar(".s01-fl2", VEREDA + 0.2, 0.2);
      gsap.set(q(".s01-flecha text"), { opacity: 0 });
      tl.to(q(".s01-flecha text"), { opacity: 1, duration: 0.2 }, VEREDA);`,
    sfx: [
      { t: 0.0, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
      { t: 0.2, sfx: "click", vol: 0.3 },
      { t: 0.5, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
      { t: 1.7, sfx: "whoosh-short", vol: 0.3 },
      { t: 3.0, sfx: "whoosh", vol: 0.28 },
      { t: 4.8, sfx: "pop", vol: 0.3 },
    ],
  },  // ---------------------------------------------------------------- s02
  {
    id: "s02-programa",
    css: `
    [data-composition-id="s02-programa"] .s02-t1 { top: 700px; transform: rotate(-6deg); }
    [data-composition-id="s02-programa"] .s02-t2 { top: 880px; transform: rotate(4deg); background: ${crema}; }
    [data-composition-id="s02-programa"] .s02-t1 span, [data-composition-id="s02-programa"] .s02-t2 span { font-size: 112px; }
    [data-composition-id="s02-programa"] .s02-sub { top: 1080px; font-size: 34px; color: ${crema}; opacity: 0.85; }
    [data-composition-id="s02-programa"] .s02-peligro { top: 1150px; }
    [data-composition-id="s02-programa"] .s02-peligro b { font-size: 70px; transform: rotate(-8deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s02-clip"><rect x="160" y="620" width="760" height="720" /></clipPath></defs>
          <g class="s02-ficha"><g class="s02-fichar">
            <rect x="290" y="630" width="500" height="640" rx="8" fill="${crema}" stroke="${cem2}" stroke-width="5" transform="rotate(-3 540 950)" />
            <rect x="320" y="660" width="440" height="460" fill="${gris}" transform="rotate(-3 540 950)" />
            <g transform="rotate(-3 540 950)"><g transform="translate(540 810) scale(0.82)"><g class="s02-nor">${norma("s02n")}</g></g></g>
            <rect x="320" y="1090" width="440" height="40" fill="${crema}" transform="rotate(-3 540 950)" />
            <text x="540" y="1188" text-anchor="middle" font-family="Black Ops One" font-size="64" fill="${cem2}" transform="rotate(-3 540 950)">NORMA</text>
            <text class="s02-bazar" x="540" y="1246" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="46" fill="${rojo}" transform="rotate(-3 540 950)">bazar de barrio</text>
            <rect x="250" y="610" width="140" height="44" fill="${cinta}" opacity="0.9" transform="rotate(-30 320 632)" />
            <rect x="690" y="610" width="140" height="44" fill="${cinta}" opacity="0.9" transform="rotate(28 760 632)" />
          </g></g>
          <g class="s02-dep">
            <rect x="160" y="620" width="760" height="720" fill="${cem2}" stroke="${crema}" stroke-width="6" />
            <g clip-path="url(#s02-clip)">
              <g class="s02-cajas">${pared("s02-c", { x0: 160, x1: 920, yBase: 1340, filas: 6, w: 160, h: 120, txts: ["CAMPERAS", "ojotas", "???", "CAMPERAS", "tazas"], urg: [2, 8, 13] })}</g>
              <rect x="160" y="620" width="760" height="720" fill="${cem2}" opacity="0.35" />
              <g class="s02-persiana">
                <rect x="160" y="620" width="760" height="720" fill="${gris}" />
                ${Array.from({ length: 18 }, (_, i) => `<path d="M160 ${660 + i * 40} H920" stroke="${cem2}" stroke-width="4" opacity="0.6" />`).join("")}
                <rect x="480" y="1290" width="120" height="26" rx="6" fill="${cem2}" />
              </g>
            </g>
          </g>
        </svg>
        <div class="tira s02-t1"><span>ENTERRADOS</span></div>
        <div class="tira s02-t2"><span>EN STOCK</span></div>
        <div class="txt sello s02-peligro"><b>Zona de derrumbe</b></div>
        <div class="zoc s02-z1"><div class="tab">Hoy</div><div class="tit">El caso de Norma</div></div>`,
    js: `
      const STOCK = 1.46, HOY = 2.07, BAZAR = 3.88, Y = 4.95, MIEDO = 5.94;
      tira(".s02-t1", 0, -1300);
      tira(".s02-t2", STOCK - 0.1, 1300);
      sacudon(STOCK, 0.8);
      fuera([".s02-t1", ".s02-t2"], HOY - 0.05, 0.2);
      gsap.set(q(".s02-ficha"), { opacity: 0 });
      tl.fromTo(q(".s02-ficha"), { opacity: 1, y: 900 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.3)", immediateRender: false }, HOY);
      tl.fromTo(q(".s02-fichar"), { rotation: 12, svgOrigin: "540 950" }, { rotation: 0, svgOrigin: "540 950", duration: 0.45, ease: "back.out(1.3)" }, HOY);
      zocalos([[".s02-z1", HOY + 0.1]]);
      gsap.set(q(".s02-bazar"), { opacity: 0 });
      tl.to(q(".s02-bazar"), { opacity: 1, duration: 0.2 }, BAZAR);
      tl.fromTo(q(".s02-nor"), { rotation: -3, transformOrigin: "50% 100%" }, { rotation: 3, transformOrigin: "50% 100%", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, HOY + 0.4);
      // el depósito: la persiana sube
      tl.to(q(".s02-ficha"), { opacity: 0, x: -400, duration: 0.25, ease: "power2.in" }, Y - 0.1);
      gsap.set(q(".s02-dep"), { opacity: 0 });
      tl.fromTo(q(".s02-dep"), { opacity: 0, scale: 0.92, svgOrigin: "540 980" }, { opacity: 1, scale: 1, svgOrigin: "540 980", duration: 0.25, immediateRender: false }, Y);
      tl.to(q(".s02-persiana"), { y: -700, duration: 0.75, ease: "power2.inOut" }, Y + 0.15);
      tl.fromTo(q(".s02-cajas"), { y: 0 }, { y: -8, duration: 0.08, yoyo: true, repeat: 5, ease: "none" }, MIEDO);
      golpe(".s02-peligro", MIEDO + 0.1, 2.4);
      sacudon(MIEDO + 0.1, 1.6);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.3 },
      { t: 1.4, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 2.05, sfx: "whoosh", vol: 0.28 },
      { t: 5.1, sfx: "whoosh-cinematic", vol: 0.25, max: 0.9 },
      { t: 6.0, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s03
  {
    id: "s03-patricia",
    css: `
    [data-composition-id="s03-patricia"] .s03-plaf { position: absolute; left: 820px; top: 1150px; font-family: "Black Ops One", sans-serif; font-size: 56px; color: ${cinta}; transform: rotate(-12deg); }
    [data-composition-id="s03-patricia"] .s03-preg { position: absolute; left: 210px; top: 760px; font-family: "Black Ops One", sans-serif; font-size: 170px; color: ${cinta}; text-shadow: 6px 6px 0 ${rojo}; line-height: 1; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${caja("s03-a", 40, 1180, 230, 160, { txt: "CAMPERAS" })}
          ${caja("s03-b", 280, 1200, 200, 140, { txt: "ojotas", urgente: true })}
          ${caja("s03-c", 60, 1030, 200, 150, { txt: "tazas" })}
          <g class="s03-target">${caja("s03-t", 110, 900, 280, 130, { txt: "???", tam: 34 })}</g>
          <path class="s03-punt" d="M640 960 Q520 930 410 960" stroke="${cinta}" stroke-width="6" fill="none" stroke-dasharray="4 14" stroke-linecap="round" />
          <g transform="translate(780 860) scale(1.2)">
            <g class="s03-pat">
              <g class="s03-v1">${patricia("s03p")}</g>
              <g class="s03-v2" opacity="0">${patricia("s03q", { brazo: "señala" })}</g>
            </g>
          </g>
        </svg>
        <div class="s03-plaf">¡PLAF!</div>
        <div class="s03-preg">?</div>
        <div class="zoc s03-z1"><div class="tab">Experta</div><div class="tit">Patricia, organizadora</div></div>`,
    js: `
      const SOY = 0.36, PAT = 0.91, QUE = 3.22, CAJA = 4.0;
      tl.fromTo(q(".s03-pat"), { x: 420 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(qa(".s03-a, .s03-b, .s03-c, .s03-target"), { y: 30, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(2)" }, 0);
      // se calza el guante
      tl.fromTo(q(".s03p-gd"), { y: 0 }, { y: -40, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, SOY);
      tl.fromTo(q(".s03p-gi"), { y: 0 }, { y: -30, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, SOY + 0.25);
      pop(".s03-plaf", SOY + 0.1, 0.25, 0.4);
      fuera(".s03-plaf", SOY + 1.0, 0.2);
      zocalos([[".s03-z1", PAT]]);
      hablar(".s03p-boca", 0, 2.9);
      tl.fromTo(q(".s03p-cejas"), { y: 0 }, { y: -6, duration: 0.2, yoyo: true, repeat: 1 }, PAT + 0.4);
      // "¿Qué hay en esta caja?": señala
      tl.set(q(".s03-v1"), { opacity: 0 }, QUE);
      tl.set(q(".s03-v2"), { opacity: 1 }, QUE);
      hablar(".s03q-boca", QUE, 4.6);
      dibujar(".s03-punt", QUE + 0.1, 0.4);
      tl.fromTo(q(".s03-target"), { x: 0 }, { x: 8, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, CAJA);
      pop(".s03-preg", CAJA, 0.3, 0.3);
      tl.to(q(".s03-preg"), { rotation: 10, y: -12, duration: 0.25, yoyo: true, repeat: 1 }, CAJA + 0.3);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.28 },
      { t: 0.45, sfx: "click", vol: 0.45 },
      { t: 0.7, sfx: "click", vol: 0.35 },
      { t: 0.9, sfx: "whoosh", vol: 0.25 },
      { t: 3.25, sfx: "pop", vol: 0.25 },
      { t: 4.0, sfx: "glitch-1", vol: 0.25, max: 0.4 },
    ],
  },
  // ---------------------------------------------------------------- s04
  {
    id: "s04-esa-no",
    css: `
    [data-composition-id="s04-esa-no"] .s04-grito { top: 590px; font-family: "Black Ops One", sans-serif; font-size: 118px; color: ${cinta}; text-shadow: 7px 7px 0 ${rojo}; }
    [data-composition-id="s04-esa-no"] .s04-grito span { display: inline-block; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${caja("s04-cj", 250, 1050, 580, 300, { txt: "CAMPERAS", tam: 44, urgente: true })}
          <g class="s04-campera"><g transform="translate(-110 20)">
            <path d="M800 1050 L850 960 L900 940 L950 960 L1000 1050 L970 1062 L950 1010 L950 1080 L850 1080 L850 1010 L830 1062 Z" fill="${gris}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
            <path d="M900 950 V1080" stroke="${crema}" stroke-width="4" stroke-dasharray="6 6" />
          </g></g>
          <g transform="translate(540 960)"><g class="s04-nor">${norma("s04n", { brazos: "abiertos" })}</g></g>
          <g class="s04-cal">
            <rect x="70" y="740" width="230" height="250" rx="10" fill="${crema}" stroke="${cem2}" stroke-width="5" />
            <rect x="70" y="740" width="230" height="70" rx="10" fill="${rojo}" />
            <text x="185" y="790" text-anchor="middle" font-family="Black Ops One" font-size="46" fill="${crema}">MARZO</text>
            ${Array.from({ length: 12 }, (_, i) => `<rect x="${92 + (i % 4) * 50}" y="${830 + Math.floor(i / 4) * 50}" width="36" height="36" rx="4" fill="${i === 5 ? cinta : gris}" opacity="${i === 5 ? 1 : 0.5}" />`).join("")}
          </g>
        </svg>
        <div class="txt s04-grito"><span class="s04-g1">¡No,</span> <span class="s04-g2">esa no!</span></div>
        <div class="zoc s04-z1"><div class="tab">Caso 12</div><div class="tit">Norma defiende la caja</div></div>`,
    js: `
      const ESA = 0.64, CAMP = 1.43, MARZO = 2.87;
      tl.fromTo(q(".s04-nor"), { x: 700, y: -200, rotation: 25, transformOrigin: "50% 100%" }, { x: 0, y: 0, rotation: 0, transformOrigin: "50% 100%", duration: 0.35, ease: "power3.out" }, 0);
      golpe(".s04-g1", 0.12, 2.4);
      golpe(".s04-g2", ESA, 2.4);
      sacudon(0.15, 1.2); sacudon(ESA + 0.05, 1.5);
      hablar(".s04n-boca", 0, 1.2);
      hablar(".s04n-boca", 1.26, 3.4);
      tl.fromTo(q(".s04n-bi"), { rotation: 0 }, { rotation: -8, transformOrigin: "100% 100%", duration: 0.2, yoyo: true, repeat: 5 }, 0.4);
      tl.fromTo(q(".s04n-bd"), { rotation: 0 }, { rotation: 8, transformOrigin: "0% 100%", duration: 0.2, yoyo: true, repeat: 5 }, 0.4);
      gsap.set(q(".s04-campera"), { opacity: 0 });
      tl.fromTo(q(".s04-campera"), { opacity: 1, y: 120 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, CAMP);
      zocalos([[".s04-z1", 1.0]]);
      gsap.set(q(".s04-cal"), { opacity: 0 });
      tl.fromTo(q(".s04-cal"), { opacity: 0, scale: 0.4, rotation: -30, svgOrigin: "185 865" }, { opacity: 1, scale: 1, rotation: -6, svgOrigin: "185 865", duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, MARZO - 0.1);
      tl.to(q(".s04-grito"), { opacity: 0.35, scale: 0.85, duration: 0.3 }, CAMP);`,
    sfx: [
      { t: 0.05, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
      { t: 0.6, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 1.4, sfx: "pop", vol: 0.3 },
      { t: 2.8, sfx: "chime", vol: 0.22, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s05
  {
    id: "s05-etiqueta",
    css: `
    [data-composition-id="s05-etiqueta"] .s05-sello { top: 1170px; }
    [data-composition-id="s05-etiqueta"] .s05-sello b { font-size: 76px; transform: rotate(-6deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="90" y="590" width="900" height="760" rx="10" fill="${kraft}" stroke="${cem2}" stroke-width="6" />
          <path d="M90 690 H990" stroke="${kraft2}" stroke-width="5" />
          <rect x="760" y="590" width="150" height="760" fill="${cinta}" opacity="0.88" />
          <path d="M780 640 L890 700 M780 900 L890 960 M780 1180 L890 1240" stroke="${crema}" stroke-width="4" opacity="0.35" />
          <g transform="rotate(-4 450 950)">
            <rect class="s05-papel" x="160" y="760" width="560" height="360" rx="6" fill="${crema}" stroke="${cem2}" stroke-width="4" />
            <text x="440" y="880" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="${cem2}">CAMPERAS</text>
            <text x="440" y="990" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="66" fill="${cem2}">vender en <tspan fill="${rojo}">MARZO</tspan></text>
            <path class="s05-sub" d="M480 1010 Q560 1024 640 1006" stroke="${rojo}" stroke-width="7" fill="none" stroke-linecap="round" />
            <text class="s05-chico" x="440" y="1078" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="40" fill="${gris}">¡no tocar!</text>
          </g>
          <g class="s05-dedo"><g transform="translate(860 1000) rotate(-110)">
            <rect x="-26" y="-30" width="52" height="60" rx="20" fill="${cinta}" stroke="${cem2}" stroke-width="4" />
            <path d="M-4 -30 V-110" stroke="${cinta}" stroke-width="16" stroke-linecap="round" />
            <path d="M-4 -30 V-110" stroke="${cem2}" stroke-width="2" opacity="0.4" />
            <rect x="-30" y="22" width="60" height="140" rx="10" fill="${gris}" stroke="${cem2}" stroke-width="4" />
          </g></g>
          <g class="s05-polvo" fill="${crema}" opacity="0">
            <circle cx="200" cy="1220" r="40" opacity="0.4" /><circle cx="300" cy="1250" r="30" opacity="0.3" /><circle cx="780" cy="1230" r="44" opacity="0.35" /><circle cx="880" cy="1260" r="28" opacity="0.3" />
          </g>
        </svg>
        <div class="txt sello s05-sello"><b>Del año pasado</b></div>`,
    js: `
      const DICE = 1.18, MARZO = 1.36, PASADO = 2.27;
      tl.fromTo(q(".s05-esc"), { scale: 1.25, transformOrigin: "45% 50%" }, { scale: 1.0, duration: 0.5, ease: "power3.out", immediateRender: false }, 0);
      gsap.set(q(".s05-dedo"), { opacity: 0 });
      tl.fromTo(q(".s05-dedo"), { opacity: 1, x: 400 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, DICE - 0.2);
      tl.to(q(".s05-dedo"), { x: -14, duration: 0.12, yoyo: true, repeat: 3 }, MARZO);
      dibujar(".s05-sub", MARZO, 0.35);
      golpe(".s05-sello", PASADO, 2.6);
      sacudon(PASADO + 0.05, 1.3);
      tl.fromTo(q(".s05-polvo"), { opacity: 0, scale: 0.6, svgOrigin: "540 1240" }, { opacity: 1, scale: 1.4, svgOrigin: "540 1240", duration: 0.6, ease: "power2.out" }, PASADO);
      tl.to(q(".s05-polvo"), { opacity: 0, y: -60, duration: 0.5 }, PASADO + 0.6);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
      { t: 1.0, sfx: "click-soft", vol: 0.3 },
      { t: 1.4, sfx: "key-press", vol: 0.3 },
      { t: 2.2, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
    ],
  },
];
