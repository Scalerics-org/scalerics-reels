// Escenas s01 a s06: el gancho, el programa, el primer ejercicio (la clienta escribe) y el dueño
// que no suelta la caja.
import { C, tito, dueno, sofia, perro, caja, celular, globo, cono, valla } from "./lib.mjs";
const { tinta, cielo, nar, tiza, verde } = C;

// doble tilde de "visto" (centro en 0,0)
export const tildes = (cls, color = cielo, s = 1) => `<g class="${cls}" transform="scale(${s})"><path d="M-46 0 l16 16 l30 -34 M-8 16 l30 -34" stroke="${color}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" /></g>`;
// la zapatilla (champión)
export const champion = (cls) => `<g class="${cls}">
  <path d="M-110 30 L-104 -24 C-100 -40 -80 -44 -64 -36 C-40 -22 -20 -26 -6 -40 L10 -40 C30 -10 70 0 104 8 C118 12 120 30 112 40 L-104 40 Z" fill="${nar}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M-110 30 H114" stroke="${tinta}" stroke-width="5" /><path d="M-108 40 H110 L108 50 H-106 Z" fill="${tiza}" stroke="${tinta}" stroke-width="4" />
  <path d="M-40 -18 L-20 -4 M-30 -24 L-10 -10 M-20 -30 L0 -16" stroke="${tiza}" stroke-width="5" stroke-linecap="round" />
  <path d="M30 0 Q60 20 96 18" stroke="${tiza}" stroke-width="5" fill="none" stroke-linecap="round" />
</g>`;

export default [
  // ---------------------------------------------------------------- s01
  {
    id: "s01-dueno",
    css: `
    [data-composition-id="s01-dueno"] .s01-l1 { top: 590px; font-size: 88px; }
    [data-composition-id="s01-dueno"] .s01-l2 { top: 690px; font-size: 100px; }
    [data-composition-id="s01-dueno"] .s01-l3 { top: 690px; font-size: 112px; }
    [data-composition-id="s01-dueno"] .s01-visto { left: 470px; right: auto; width: 600px; top: 1160px; }
    [data-composition-id="s01-dueno"] .s01-visto b { font-size: 60px; transform: rotate(-6deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(300 990) scale(1.12)"><g class="s01-tito">${tito("s01t")}</g></g>
          <g transform="translate(790 1110) scale(1.15)"><g class="s01-perro">${perro("s01p")}</g></g>
          <g class="s01-ok"><circle cx="880" cy="960" r="40" fill="${verde}" stroke="${tinta}" stroke-width="5" /><path d="M862 960 l12 13 l24 -26" stroke="${tinta}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g transform="translate(790 1010) scale(1.0)"><g class="s01-due">${dueno("s01d")}</g></g>
        </svg>
        <div class="txt grito s01-l1">El problema</div>
        <div class="txt grito s01-l2">no es el perro</div>
        <div class="txt grito nar s01-l3">Es el dueño</div>
        <div class="txt sello s01-visto"><b>Deja en visto</b></div>
        <div class="zoc s01-z"><div class="tab">Hoy</div><div class="tit">Caso: dueño en visto</div></div>`,
    js: `
      const PERRO = 0.73, DUENO = 1.82, HOY = 2.64, VISTO = 4.09;
      // cuadro 0: Tito ya está entrando
      tl.fromTo(q(".s01-tito"), { scale: 0.9, y: 30, transformOrigin: "50% 100%" }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s01-l1"), { opacity: 0.4, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      hablar(".s01t-boca", 0, 2.4);
      hablar(".s01t-boca", HOY, 4.6);
      tl.fromTo(q(".s01t-brazo"), { rotation: 40, svgOrigin: "96 130" }, { rotation: 22, svgOrigin: "96 130", duration: 0.3, ease: "power2.out" }, 0);
      // "perro": el perro, perfecto, con su tilde verde
      tl.fromTo(q(".s01-perro"), { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0.1);
      pop(".s01-l2", PERRO - 0.05, 0.3, 0.6);
      pop(".s01-ok", PERRO + 0.1, 0.35, 0.3);
      cola(".s01p-cola", PERRO, 3);
      // "dueño": el perro se va, entra el dueño; Tito lo señala
      fuera(".s01-l2", DUENO - 0.12, 0.1);
      golpe(".s01-l3", DUENO, 2);
      sacudon(DUENO + 0.04, 1.2);
      tl.to([q(".s01-perro"), q(".s01-ok")], { x: 520, duration: 0.35, ease: "power2.in" }, DUENO - 0.1);
      tl.fromTo(q(".s01-due"), { x: 520 }, { x: 0, duration: 0.4, ease: "power3.out" }, DUENO + 0.1);
      tl.to(q(".s01t-brazo"), { rotation: 0, svgOrigin: "96 130", duration: 0.2, ease: "power2.out" }, DUENO);
      tl.to(q(".s01t-cejas"), { y: -6, duration: 0.2 }, DUENO);
      tl.to([q(".s01-l1"), q(".s01-l3")], { scale: 0.86, y: -16, duration: 0.3, ease: "power2.out" }, HOY);
      zocalos([[".s01-z", HOY]]);
      // el dueño ni mira: bosteza
      tl.to(q(".s01d-boca"), { scaleY: 3, scaleX: 0.7, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1 }, 3.0);
      // "visto": sello y sacudón
      golpe(".s01-visto", VISTO + 0.05, 2);
      sacudon(VISTO + 0.08, 0.8);`,
    sfx: [
      { t: 0.0, sfx: "silbato", vol: 0.32 },
      { t: 0.75, sfx: "pop", vol: 0.3 },
      { t: 0.85, sfx: "chime", vol: 0.22, max: 0.6 },
      { t: 1.8, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
      { t: 2.65, sfx: "whoosh-short", vol: 0.25 },
      { t: 4.1, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s02
  {
    id: "s02-programa",
    css: `
    [data-composition-id="s02-programa"] .s02-t1 { top: 690px; font-size: 118px; color: ${tinta}; }
    [data-composition-id="s02-programa"] .s02-t2 { top: 810px; font-size: 128px; color: ${tiza}; -webkit-text-stroke: 4px ${tinta}; paint-order: stroke fill; }
    [data-composition-id="s02-programa"] .s02-tit { position: absolute; inset: 0; }
    [data-composition-id="s02-programa"] .s02-piz { position: absolute; left: 160px; top: 1040px; width: 760px; height: 250px; border-radius: 24px; background: ${tinta}; border: 6px solid ${tiza}; box-shadow: 10px 10px 0 rgba(13, 44, 84, 0.5); }
    [data-composition-id="s02-programa"] .s02-piz .a { position: absolute; left: 40px; top: 36px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.2em; color: ${nar}; white-space: nowrap; }
    [data-composition-id="s02-programa"] .s02-piz .b { position: absolute; left: 40px; top: 100px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 54px; line-height: 1.15; color: ${tiza}; text-transform: uppercase; white-space: nowrap; }`,
    html: `
        <div class="s02-tit">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s02-cartel">
              <rect x="70" y="630" width="940" height="360" rx="40" fill="${nar}" stroke="${tinta}" stroke-width="8" />
              <rect x="96" y="656" width="888" height="308" rx="28" fill="none" stroke="${tiza}" stroke-width="5" stroke-dasharray="18 14" />
            </g>
            <g transform="translate(120 640) rotate(-20) scale(0.9)"><g class="s02-h1"><path d="M-60 -14 C-70 -40 -40 -50 -34 -26 L34 -26 C40 -50 70 -40 60 -14 C76 -6 76 6 60 14 C70 40 40 50 34 26 L-34 26 C-40 50 -70 40 -60 14 C-76 6 -76 -6 -60 -14 Z" fill="${tiza}" stroke="${tinta}" stroke-width="6" /></g></g>
            <g transform="translate(960 980) rotate(15) scale(0.9)"><g class="s02-h2"><path d="M-60 -14 C-70 -40 -40 -50 -34 -26 L34 -26 C40 -50 70 -40 60 -14 C76 -6 76 6 60 14 C70 40 40 50 34 26 L-34 26 C-40 50 -70 40 -60 14 C-76 6 -76 -6 -60 -14 Z" fill="${tiza}" stroke="${tinta}" stroke-width="6" /></g></g>
          </svg>
          <div class="txt s02-t1">¡Sentado,</div>
          <div class="txt s02-t2">dueño!</div>
        </div>
        <div class="s02-piz"><div class="a">EJERCICIO 1</div><div class="b">Contestar a<br>la clienta</div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(830 1160)"><g class="s02-cel">
            <rect x="-44" y="-76" width="88" height="152" rx="16" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <rect x="-30" y="-56" width="60" height="100" rx="6" fill="${cielo}" />
            <circle cx="40" cy="-70" r="24" fill="${nar}" stroke="${tinta}" stroke-width="4" />
            <text x="40" y="-60" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="28" fill="${tinta}">1</text>
          </g></g>
        </svg>`,
    js: `
      const SENTADO = 0.62, DUENO = 1.25, EJERCICIO = 2.05, CLIENTA = 2.95;
      tl.fromTo(q(".s02-cartel"), { scale: 0.2, rotation: -12, opacity: 0, transformOrigin: "540px 810px" }, { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }, 0);
      pop(".s02-h1", 0.3, 0.3, 0.3); pop(".s02-h2", 0.4, 0.3, 0.3);
      golpe(".s02-t1", SENTADO, 1.9);
      golpe(".s02-t2", DUENO, 2.1);
      sacudon(DUENO + 0.04, 1);
      tl.to(q(".s02-cartel"), { rotation: 2, svgOrigin: "540 810", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, DUENO + 0.2);
      // "primer ejercicio": el cartel sube y entra la pizarra
      tl.to(q(".s02-tit"), { scale: 0.72, y: -130, transformOrigin: "540px 700px", duration: 0.35, ease: "power3.inOut" }, EJERCICIO - 0.15);
      tl.fromTo(q(".s02-piz"), { y: 500, opacity: 0 }, { y: -40, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, EJERCICIO);
      // "la clienta escribe": el celular vibra
      pop(".s02-cel", CLIENTA - 0.05, 0.3, 0.4);
      tl.to(q(".s02-cel"), { rotation: 8, duration: 0.06, yoyo: true, repeat: 11, ease: "none" }, CLIENTA + 0.3);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.28 },
      { t: 0.6, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 1.25, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 2.0, sfx: "whoosh-short", vol: 0.3 },
      { t: 2.95, sfx: "notification", vol: 0.3 },
    ],
  },
  // ---------------------------------------------------------------- s03
  {
    id: "s03-championes",
    css: `
    [data-composition-id="s03-championes"] .s03-38 { left: 60px; right: auto; width: 360px; top: 650px; }
    [data-composition-id="s03-championes"] .s03-38 b { font-size: 120px; transform: rotate(-8deg); padding: 6px 30px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(140 0)"><g class="s03-cel">${celular("Calzados del barrio", "en línea", nar)}
            ${`<g class="s03-foto"><rect x="470" y="760" width="290" height="190" rx="22" fill="#dfeefc" stroke="${tinta}" stroke-width="4" /><g transform="translate(615 850) scale(1.05)">${champion("s03-ch")}</g></g>`}
            ${globo("s03-g1", 380, 975, 380, "Hola, ¿tenés estos|championes en 38?", { mio: true, hora: "10:12", tildes: "gris" })}
          </g></g>
          <g transform="translate(200 1120) scale(0.82)"><g class="s03-sof">${sofia("s03s")}</g></g>
          <g class="s03-mano"><rect x="250" y="1150" width="56" height="96" rx="12" fill="${tinta}" stroke="${tiza}" stroke-width="4" transform="rotate(14 278 1198)" /></g>
        </svg>
        <div class="txt sello s03-38"><b>38</b></div>
        <div class="zoc s03-z"><div class="tab">Clienta</div><div class="tit">Sofía quiere comprar</div></div>`,
    js: `
      const TENES = 0.5, CHAMPIONES = 1.09, OCHO = 2.27;
      tl.fromTo(q(".s03-cel"), { y: 900 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s03-sof"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      tl.fromTo(q(".s03-mano"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      hablar(".s03s-boca", 0, 2.6);
      zocalos([[".s03-z", 0.2]]);
      pop(".s03-foto", TENES - 0.1, 0.35, 0.6);
      tl.fromTo(q(".s03-ch"), { rotation: -10, svgOrigin: "0 0" }, { rotation: 6, svgOrigin: "0 0", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, CHAMPIONES);
      pop(".s03-g1", TENES + 0.2, 0.3, 0.7);
      golpe(".s03-38", OCHO + 0.05, 2);
      tl.to(q(".s03-sof"), { y: -10, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.0);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.25 },
      { t: 0.4, sfx: "typing", vol: 0.22, max: 0.6 },
      { t: 0.75, sfx: "pop", vol: 0.3 },
      { t: 1.1, sfx: "click-soft", vol: 0.3 },
      { t: 2.3, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s04
  {
    id: "s04-atento",
    css: `
    [data-composition-id="s04-atento"] .s04-a { top: 590px; font-size: 104px; }
    [data-composition-id="s04-atento"] .s04-b { top: 708px; font-size: 104px; }
    [data-composition-id="s04-atento"] .s04-c { top: 826px; font-size: 132px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(470 1180) scale(1.45)"><g class="s04-tito">${tito("s04t")}</g></g>
          <g class="s04-rayos" stroke="${tiza}" stroke-width="9" stroke-linecap="round">
            <path d="M600 1210 L680 1180" /><path d="M606 1250 L700 1256" /><path d="M596 1290 L676 1324" />
          </g>
          <g transform="translate(930 1150) rotate(12)"><g class="s04-cel">
            <rect x="-56" y="-96" width="112" height="192" rx="18" fill="${tiza}" stroke="${tinta}" stroke-width="6" />
            <rect x="-40" y="-72" width="80" height="128" rx="8" fill="${cielo}" />
            <circle cx="48" cy="-90" r="26" fill="${nar}" stroke="${tinta}" stroke-width="4" />
            <text x="48" y="-79" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="${tinta}">1</text>
          </g></g>
        </svg>
        <div class="txt grito s04-a">¡Atento!</div>
        <div class="txt grito s04-b">¡Celular!</div>
        <div class="txt grito nar s04-c">¡Contestá!</div>`,
    js: `
      const CELULAR = 0.93, CONTESTA = 1.69;
      tl.fromTo(q(".s04-tito"), { y: 200, scale: 0.9, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      golpe(".s04-a", 0.08, 1.8);
      sacudon(0.1, 0.9);
      hablar(".s04t-boca", 0, 2.3);
      tl.fromTo(q(".s04t-brazo"), { rotation: 0, svgOrigin: "96 130" }, { rotation: -26, svgOrigin: "96 130", duration: 0.12, yoyo: true, repeat: 5, ease: "power2.inOut", immediateRender: false }, 0);
      [0.05, CELULAR, CONTESTA].forEach((t) => {
        tl.fromTo(qa(".s04-rayos path"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.12, immediateRender: false }, t);
        tl.to(qa(".s04-rayos path"), { opacity: 0, duration: 0.2 }, t + 0.4);
      });
      golpe(".s04-b", CELULAR, 1.8);
      pop(".s04-cel", CELULAR, 0.3, 0.4);
      tl.to(q(".s04-cel"), { x: 8, duration: 0.05, yoyo: true, repeat: 13, ease: "none" }, CELULAR + 0.3);
      golpe(".s04-c", CONTESTA, 2.2);
      sacudon(CONTESTA + 0.05, 1.4);
      tl.to(q(".s04-c"), { scale: 1.08, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, CONTESTA + 0.2);`,
    sfx: [
      { t: 0.0, sfx: "silbato", vol: 0.3 },
      { t: 0.1, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
      { t: 0.93, sfx: "impact-bass-1", vol: 0.32, max: 0.4 },
      { t: 1.0, sfx: "notification", vol: 0.25 },
      { t: 1.69, sfx: "impact-bass-2", vol: 0.42, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s05
  {
    id: "s05-caja",
    css: `
    [data-composition-id="s05-caja"] .s05-clin { position: absolute; left: 560px; top: 640px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; color: ${nar}; -webkit-text-stroke: 4px ${tinta}; paint-order: stroke fill; transform: rotate(-8deg); white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(330 960) scale(1.05)"><g class="s05-due">${dueno("s05d")}</g></g>
          <g class="s05-grr" stroke="${tinta}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M180 1010 l-20 -14 l-6 20 l-20 -14" /><path d="M176 1060 l-24 -2 l6 18 l-24 -2" />
          </g>
          <rect x="60" y="1190" width="960" height="190" rx="14" fill="${tinta}" stroke="${tiza}" stroke-width="6" />
          <path d="M60 1222 H1020" stroke="${tiza}" stroke-width="4" opacity="0.4" />
          <g transform="translate(640 1196) scale(0.95)">${caja("s05c")}</g>
          <g transform="translate(910 1160) rotate(-8)"><g class="s05-cel">
            <rect x="-40" y="-70" width="80" height="140" rx="14" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <rect x="-28" y="-52" width="56" height="94" rx="6" fill="${cielo}" />
            <circle cx="34" cy="-64" r="22" fill="${nar}" stroke="${tinta}" stroke-width="4" />
            <text x="34" y="-55" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="${tinta}">1</text>
          </g></g>
        </svg>
        <div class="s05-clin">¡CLIN!</div>
        <div class="zoc s05-z"><div class="tab">Dueño</div><div class="tit">«Estoy en la caja»</div></div>`,
    js: `
      const NO = 0.47, CAJA = 1.39;
      tl.fromTo(q(".s05-due"), { y: 60 }, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
      // mira la caja, no el celular
      tl.fromTo(qa(".s05d-ojos"), { x: 0, y: 0 }, { x: 10, y: 8, duration: 0.2 }, 0.1);
      tl.to(q(".s05d-cejas"), { y: 6, duration: 0.2 }, 0.1);
      hablar(".s05d-boca", 0, 1.8);
      dibujar(".s05-grr path", NO, 0.25);
      tl.to(qa(".s05-grr path"), { x: -10, duration: 0.06, yoyo: true, repeat: 9, ease: "none" }, NO + 0.25);
      zocalos([[".s05-z", 0.15]]);
      // el celular vibra solo, nadie lo mira
      tl.to(q(".s05-cel"), { x: 8, duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, 0.2);
      tl.to(q(".s05-cel"), { x: 8, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, 1.7);
      // "caja": se abre el cajón
      tl.to(qa(".s05c-cajon"), { y: 46, duration: 0.15, ease: "power3.out" }, CAJA);
      pop(".s05-clin", CAJA, 0.25, 0.4);
      tl.to(q(".s05-due"), { y: -12, duration: 0.15, yoyo: true, repeat: 1 }, CAJA);`,
    sfx: [
      { t: 0.1, sfx: "notification", vol: 0.25 },
      { t: 0.5, sfx: "glitch-1", vol: 0.15, max: 0.3 },
      { t: 1.4, sfx: "chime", vol: 0.32, max: 0.6 },
      { t: 1.75, sfx: "notification", vol: 0.22 },
    ],
  },
  // ---------------------------------------------------------------- s06
  {
    id: "s06-quieto",
    css: `
    [data-composition-id="s06-quieto"] .s06-a { top: 600px; font-size: 120px; }
    [data-composition-id="s06-quieto"] .s06-b { top: 600px; font-size: 96px; }
    [data-composition-id="s06-quieto"] .s06-c { top: 600px; font-size: 124px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(230 1010) scale(0.95)"><g class="s06-tito">${tito("s06t")}</g></g>
          <path class="s06-correa" d="M566 1122 C620 1130 650 1170 700 1236" stroke="${nar}" stroke-width="12" fill="none" stroke-linecap="round" />
          <g class="s06-lado">
            <g transform="translate(790 1000) scale(0.95)"><g class="s06-due">${dueno("s06d")}</g></g>
            <g transform="translate(790 1352) scale(0.8)">${caja("s06c")}</g>
            <path d="M660 1170 C640 1250 690 1300 760 1300 M920 1170 C940 1250 890 1300 820 1300" stroke="${tinta}" stroke-width="44" fill="none" stroke-linecap="round" />
            <path d="M660 1170 C640 1250 690 1300 760 1300 M920 1170 C940 1250 890 1300 820 1300" stroke="${cielo}" stroke-width="34" fill="none" stroke-linecap="round" />
            <g class="s06-gotas" fill="${tiza}" stroke="${tinta}" stroke-width="3">
              <path d="M700 900 c-8 14 -8 22 0 24 c8 -2 8 -10 0 -24 Z" /><path d="M886 890 c-8 14 -8 22 0 24 c8 -2 8 -10 0 -24 Z" />
            </g>
          </g>
        </svg>
        <div class="txt grito s06-a">¡Quieto!</div>
        <div class="txt grito nar s06-b">¡Soltá la caja!</div>
        <div class="txt grito s06-c">¡Contestá!</div>
        <div class="zoc s06-z"><div class="tab">Ejercicio 1</div><div class="tit">No suelta la caja</div></div>`,
    js: `
      const SOLTA = 0.95, CAJA = 1.48, CONTESTA = 2.45;
      tl.fromTo(q(".s06-tito"), { x: -300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s06-lado"), { x: 300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      golpe(".s06-a", 0.08, 1.8);
      sacudon(0.1, 0.8);
      hablar(".s06t-boca", 0, 3.2);
      tl.fromTo(q(".s06t-brazo"), { rotation: 30, svgOrigin: "96 130" }, { rotation: 30, svgOrigin: "96 130", duration: 0.01 }, 0);
      dibujar(".s06-correa", 0.35, 0.4);
      zocalos([[".s06-z", 0.3]]);
      fuera(".s06-a", SOLTA - 0.1, 0.1);
      golpe(".s06-b", SOLTA, 1.8);
      // "caja": tironeo; el dueño no la suelta
      [CAJA, CAJA + 0.45].forEach((t) => {
        tl.to(q(".s06-tito"), { x: -24, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t);
        tl.to(q(".s06-correa"), { x: -16, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t);
        tl.to(q(".s06-lado"), { x: -20, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t + 0.03);
      });
      tl.to(q(".s06d-cejas"), { y: 8, duration: 0.15 }, CAJA);
      pop(".s06-gotas path", CAJA + 0.1, 0.25, 0.4);
      tl.to(qa(".s06-gotas path"), { y: 40, opacity: 0, duration: 0.6, ease: "power1.in" }, CAJA + 0.6);
      fuera(".s06-b", CONTESTA - 0.1, 0.1);
      golpe(".s06-c", CONTESTA, 2);
      sacudon(CONTESTA + 0.05, 1);
      // "no" con la cabeza
      tl.to(q(".s06-due"), { rotation: 8, svgOrigin: "0 60", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, CONTESTA + 0.15);`,
    sfx: [
      { t: 0.0, sfx: "silbato", vol: 0.26 },
      { t: 0.1, sfx: "impact-bass-1", vol: 0.32, max: 0.4 },
      { t: 0.95, sfx: "impact-bass-1", vol: 0.32, max: 0.4 },
      { t: 1.5, sfx: "whoosh-short", vol: 0.28 },
      { t: 1.95, sfx: "whoosh-short", vol: 0.28 },
      { t: 2.45, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
    ],
  },
];
