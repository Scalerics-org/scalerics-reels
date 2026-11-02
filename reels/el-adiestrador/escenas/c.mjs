// Escenas s13 a s17: entra Scalerics (Orus) con el agente de IA, la clienta atendida, el premio
// (la galletita) y el cierre.
import { C, tito, dueno, sofia, perro, agente, celular, globo, galletita, tablero } from "./lib.mjs";
const { tinta, cielo, nar, tiza, verde } = C;

const chip = (cls, x, y, texto) => `
<g class="${cls}">
  <rect x="${x}" y="${y}" width="${30 + texto.length * 22 + 60}" height="66" rx="33" fill="${tinta}" stroke="${verde}" stroke-width="5" />
  <path d="M${x + 26} ${y + 34} l12 12 l22 -24" stroke="${verde}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <text x="${x + 72}" y="${y + 45}" font-family="Lexend" font-weight="800" font-size="32" fill="${tiza}">${texto}</text>
</g>`;

const confeti = (p) => [[120, nar], [220, tiza], [330, verde], [450, nar], [560, tiza], [680, verde], [790, nar], [890, tiza], [980, verde], [170, nar], [610, verde], [930, tiza]]
  .map(([x, c], i) => `<rect class="${p}-k" x="${x}" y="${560 - (i % 4) * 40}" width="18" height="30" rx="4" fill="${c}" />`).join("");

export default [
  // ---------------------------------------------------------------- s13
  {
    id: "s13-agente",
    css: `
    [data-composition-id="s13-agente"] .s13-lbl { position: absolute; left: 700px; top: 945px; width: 300px; height: 52px; border-radius: 26px; background: ${tinta}; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.14em; color: ${verde}; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(-170 0)"><g class="s13-cel">${celular("Calzados del barrio", "en línea", nar)}
            ${globo("s13-g1", 380, 760, 380, "Hola, ¿tenés estos|championes en 38?", { mio: true, hora: "23:00", tildes: "azul" })}
            ${globo("s13-g2", 330, 930, 400, "¡Sí, hay en 38!|¿Te los guardo|para mañana?", { hora: "23:00", color: verde })}
          </g></g>
          <g transform="translate(850 830) scale(1.15)"><g class="s13-ag">${agente("s13a")}</g></g>
          ${chip("s13-c1", 640, 1020, "Al instante")}
          ${chip("s13-c2", 640, 1096, "A toda hora")}
          ${chip("s13-c3", 640, 1172, "Precios")}
          ${chip("s13-c4", 640, 1248, "Stock")}
          ${chip("s13-c5", 640, 1324, "Horarios")}
        </svg>
        <div class="s13-lbl">AGENTE DE IA</div>`,
    js: `
      const AGENTE = 1.55, CONTESTA = 2.49, INSTANTE = 3.63, HORA = 4.87, PRECIOS = 5.58, STOCK = 6.29, HORARIOS = 6.99;
      tl.fromTo(q(".s13-cel"), { y: 900 }, { y: 0, duration: 0.45, ease: "power3.out" }, 0);
      pop(".s13-g1", 0.4, 0.3, 0.7);
      pop(".s13-ag", AGENTE - 0.1, 0.45, 0.2);
      pop(".s13-lbl", AGENTE + 0.15, 0.3);
      tl.fromTo(q(".s13a-ojos"), { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, AGENTE + 0.8);
      tl.fromTo(q(".s13a-ojos"), { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, 5.2);
      tl.to(q(".s13-ag"), { y: -14, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, AGENTE + 0.4);
      pop(".s13-g2", CONTESTA + 0.05, 0.3, 0.6);
      tl.to(q(".s13-g2"), { scale: 1.04, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, INSTANTE);
      [[".s13-c1", INSTANTE], [".s13-c2", HORA], [".s13-c3", PRECIOS], [".s13-c4", STOCK], [".s13-c5", HORARIOS]].forEach(([s, t]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 1, x: 500 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, t - 0.08);
      });`,
    sfx: [
      { t: 0.0, sfx: "whoosh-cinematic", vol: 0.25, max: 1.0 },
      { t: 0.4, sfx: "pop", vol: 0.25 },
      { t: 1.45, sfx: "sparkle", vol: 0.3, max: 0.7 },
      { t: 2.55, sfx: "ping", vol: 0.3 },
      { t: 3.6, sfx: "click", vol: 0.26 },
      { t: 4.85, sfx: "click", vol: 0.26 },
      { t: 5.55, sfx: "click", vol: 0.26 },
      { t: 6.95, sfx: "chime", vol: 0.25, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s14
  {
    id: "s14-pasa",
    css: `
    [data-composition-id="s14-pasa"] .s14-tk { position: absolute; left: 150px; top: 590px; width: 780px; height: 210px; border-radius: 22px; background: ${tiza}; border: 6px solid ${tinta}; box-shadow: 10px 10px 0 rgba(13, 44, 84, 0.45); overflow: hidden; }
    [data-composition-id="s14-pasa"] .s14-tk .b { position: absolute; left: 0; top: 0; bottom: 0; width: 24px; background: ${verde}; }
    [data-composition-id="s14-pasa"] .s14-tk .h { position: absolute; left: 56px; top: 26px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: ${cielo}; white-space: nowrap; }
    [data-composition-id="s14-pasa"] .s14-tk .t { position: absolute; left: 56px; top: 74px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; color: ${tinta}; white-space: nowrap; }
    [data-composition-id="s14-pasa"] .s14-tk .s { position: absolute; left: 56px; top: 138px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; color: ${tinta}; opacity: 0.75; white-space: nowrap; }
    [data-composition-id="s14-pasa"] .s14-ok { position: absolute; left: 760px; top: 640px; transform: rotate(-10deg); padding: 6px 18px; border: 6px solid ${verde}; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: ${verde}; background: ${tinta}; white-space: nowrap; }`,
    html: `
        <div class="s14-tk"><div class="b"></div><div class="h">PEDIDO TOMADO · 23:01</div><div class="t">Championes 38 · Sofía</div><div class="s">Retira mañana a las 10</div></div>
        <div class="s14-ok">LISTO</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(230 1010) scale(0.95)"><g class="s14-ag">${agente("s14a")}</g></g>
          <g transform="translate(790 1040) scale(0.85)"><g class="s14-due">${dueno("s14d")}</g></g>
          <g class="s14-card">
            <rect x="110" y="1150" width="400" height="160" rx="22" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <rect x="110" y="1150" width="18" height="160" rx="8" fill="${verde}" />
            <text x="150" y="1196" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${cielo}" letter-spacing="2">PARA EL DUEÑO</text>
            <text x="150" y="1244" font-family="Lexend" font-weight="700" font-size="32" fill="${tinta}">Quiere 20 pares</text>
            <text x="150" y="1286" font-family="Lexend" font-weight="700" font-size="32" fill="${tinta}">para un club</text>
          </g>
          <path class="s14-flecha" d="M420 1140 C500 1060 560 1060 620 1100" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" />
          <path class="s14-punta" d="M592 1078 l30 24 l-34 14" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="zoc s14-z"><div class="tab verde">Agente de IA</div><div class="tit">Y te pasa lo tuyo</div></div>`,
    js: `
      const PEDIDO = 0.2, VOS = 1.17, PASA = 1.63, CONVERSACION = 2.06;
      tl.fromTo(q(".s14-tk"), { x: 1100 }, { x: 0, duration: 0.35, ease: "power3.out" }, PEDIDO - 0.2);
      golpe(".s14-ok", PEDIDO + 0.45, 2);
      tl.fromTo(q(".s14-ag"), { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }, 0.05);
      tl.fromTo(q(".s14-due"), { x: 400 }, { x: 0, duration: 0.35, ease: "power3.out" }, VOS - 0.3);
      zocalos([[".s14-z", 0.3]]);
      pop(".s14-card", PASA - 0.15, 0.3, 0.6);
      dibujar(".s14-flecha", PASA, 0.3);
      dibujar(".s14-punta", PASA + 0.25, 0.12);
      tl.to(q(".s14-card"), { x: 380, y: -40, scale: 0.6, transformOrigin: "310px 1230px", opacity: 0, duration: 0.45, ease: "power2.in" }, CONVERSACION + 0.1);
      // el dueño se alegra
      tl.to(q(".s14d-boca"), { scaleY: -1.4, transformOrigin: "50% 50%", duration: 0.15 }, CONVERSACION + 0.5);
      tl.to(q(".s14d-cejas"), { y: -10, duration: 0.15 }, CONVERSACION + 0.5);
      tl.to(q(".s14-due"), { y: -16, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, CONVERSACION + 0.5);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.28 },
      { t: 0.6, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
      { t: 1.5, sfx: "pop", vol: 0.28 },
      { t: 1.65, sfx: "whoosh-short", vol: 0.25 },
      { t: 2.6, sfx: "chime", vol: 0.28, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s15
  {
    id: "s15-segundo",
    css: `
    [data-composition-id="s15-segundo"] .s15-sello { left: 380px; right: auto; width: 700px; top: 1180px; }
    [data-composition-id="s15-segundo"] .s15-sello b { font-size: 64px; color: ${verde}; border-color: ${verde}; transform: rotate(-5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(360 960) scale(1.15)"><g class="s15-sof">${sofia("s15s")}</g></g>
          <g transform="translate(560 1160) rotate(-10)"><g class="s15-cel">
            <rect x="-60" y="-104" width="120" height="208" rx="20" fill="${tiza}" stroke="${tinta}" stroke-width="6" />
            <rect x="-44" y="-80" width="88" height="140" rx="8" fill="${cielo}" />
            <rect x="-36" y="-30" width="72" height="34" rx="10" fill="${verde}" />
          </g></g>
          <g transform="translate(820 790)"><g class="s15-reloj">
            <circle cx="0" cy="0" r="110" fill="${tinta}" stroke="${verde}" stroke-width="8" />
            <rect x="-22" y="-142" width="44" height="30" rx="8" fill="${verde}" stroke="${tinta}" stroke-width="4" />
            <text x="0" y="16" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="80" fill="${tiza}">1</text>
            <text x="0" y="62" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${verde}" letter-spacing="3">SEG</text>
            <path class="s15-aguja" d="M0 0 V-84" stroke="${verde}" stroke-width="6" stroke-linecap="round" opacity="0.6" />
          </g></g>
          <g class="s15-chis" stroke="${nar}" stroke-width="8" stroke-linecap="round">
            <path d="M200 760 l-40 -30" /><path d="M250 720 l-14 -46" /><path d="M480 740 l30 -36" />
          </g>
        </svg>
        <div class="txt sello s15-sello"><b>Mañana paso</b></div>
        <div class="zoc s15-z"><div class="tab">Clienta</div><div class="tit">Atendida a las 23:00</div></div>`,
    js: `
      const CONTESTARON = 0.09, SEGUNDO = 1.0, MANANA = 1.73;
      tl.fromTo(q(".s15-sof"), { y: 60, scale: 0.94, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s15-cel"), { y: 200 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.05);
      hablar(".s15s-boca", 0, 2.6);
      tl.to(q(".s15s-cejas"), { y: -10, duration: 0.15 }, CONTESTARON);
      dibujar(".s15-chis path", CONTESTARON + 0.1, 0.2);
      pop(".s15-reloj", SEGUNDO - 0.1, 0.35, 0.3);
      tl.fromTo(q(".s15-aguja"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 360, svgOrigin: "0 0", duration: 0.6, ease: "power2.out", immediateRender: false }, SEGUNDO);
      golpe(".s15-sello", MANANA + 0.05, 2);
      tl.to(q(".s15-sof"), { y: -18, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, MANANA + 0.1);
      zocalos([[".s15-z", 0.2]]);`,
    sfx: [
      { t: 0.05, sfx: "ping", vol: 0.3 },
      { t: 0.95, sfx: "pop", vol: 0.3 },
      { t: 1.1, sfx: "click-soft", vol: 0.25 },
      { t: 1.78, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
    ],
  },
  // ---------------------------------------------------------------- s16
  {
    id: "s16-galletita",
    css: ``,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 590) scale(0.8)"><g class="s16-tab">${tablero("s16t", "10", 600)}</g></g>
          <g class="s16-confeti">${confeti("s16")}</g>
          <g transform="translate(250 1060) scale(0.9)"><g class="s16-tito">${tito("s16ti")}</g></g>
          <g transform="translate(800 1060) scale(0.9)"><g class="s16-due">${dueno("s16d")}</g></g>
          <g transform="translate(560 1010)"><g class="s16-gal">${galletita("s16g")}</g></g>
          <g transform="translate(980 1260) scale(0.62)"><g class="s16-per">${perro("s16p")}</g></g>
        </svg>
        <div class="zoc s16-z"><div class="tab">Ejercicio 2</div><div class="tit">¡Aprobado!</div></div>`,
    js: `
      const DUENO = 0.45, DIEZ = 1.33, TOMA = 2.23, ES = 3.6, PERRO = 4.75;
      tl.fromTo(q(".s16-tab"), { y: -700 }, { y: 0, duration: 0.35, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".s16-tito"), { x: -300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s16-due"), { x: 300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s16ti-boca", 0, 3.2);
      tl.fromTo(q(".s16t-num"), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0);
      tl.fromTo(q(".s16t-num"), { opacity: 0, scale: 2.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, DIEZ - 0.08);
      sacudon(DIEZ + 0.06, 1.1);
      gsap.set(qa(".s16-k"), { opacity: 0 });
      qa(".s16-k").forEach((k, i) => tl.fromTo(k, { y: 0, rotation: 0, opacity: 0 }, { opacity: 1, y: 900 + (i % 3) * 80, rotation: 360 + i * 40, transformOrigin: "50% 50%", duration: 2.2 + (i % 4) * 0.2, ease: "none", immediateRender: false }, DIEZ - 0.1 + (i % 5) * 0.08));
      // el dueño se agranda con el diez
      tl.to(q(".s16d-boca"), { scaleY: -1.4, transformOrigin: "50% 50%", duration: 0.15 }, DIEZ);
      tl.to(q(".s16-due"), { y: -20, duration: 0.15, yoyo: true, repeat: 3 }, DIEZ);
      // "tomá, una galletita"
      tl.fromTo(q(".s16ti-brazo"), { rotation: 0, svgOrigin: "96 130" }, { rotation: 30, svgOrigin: "96 130", duration: 0.25, ease: "power2.out" }, TOMA - 0.1);
      pop(".s16-gal", TOMA + 0.05, 0.35, 0.3);
      tl.to(q(".s16-gal"), { rotation: 10, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, TOMA + 0.4);
      // "¿es de las de perro?": la mira desconfiado
      tl.to(q(".s16d-boca"), { scaleY: 1, duration: 0.12 }, ES - 0.1);
      tl.to(qa(".s16d-ojos"), { x: -12, y: 6, duration: 0.2 }, ES);
      tl.to(q(".s16d-cejas"), { y: 6, rotation: 0, duration: 0.2 }, ES);
      tl.to(q(".s16-due"), { x: -30, rotation: -6, svgOrigin: "0 300", duration: 0.3 }, ES + 0.1);
      zocalos([[".s16-z", DIEZ + 0.2]]);
      // "perro": el perro salta y se la lleva
      tl.fromTo(q(".s16-per"), { y: 1400 }, { y: 0, duration: 0.3, ease: "back.out(1.4)" }, PERRO - 0.6);
      cola(".s16p-cola", PERRO - 0.3, 3);
      tl.to(q(".s16-per"), { x: -680, y: -380, rotation: -20, duration: 0.3, ease: "power2.out" }, PERRO + 0.1);
      tl.to(q(".s16-gal"), { opacity: 0, duration: 0.05 }, PERRO + 0.38);
      tl.to(q(".s16-per"), { x: -1200, y: 100, rotation: 10, duration: 0.4, ease: "power2.in" }, PERRO + 0.42);
      sacudon(PERRO + 0.4, 0.7);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.25 },
      { t: 1.33, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 1.4, sfx: "sparkle", vol: 0.32, max: 0.8 },
      { t: 2.3, sfx: "pop", vol: 0.3 },
      { t: 4.2, sfx: "whoosh-short", vol: 0.25 },
      { t: 4.85, sfx: "whoosh", vol: 0.3 },
      { t: 5.15, sfx: "pop", vol: 0.32 },
    ],
  },
  // ---------------------------------------------------------------- s17
  {
    id: "s17-cta",
    css: `
    [data-composition-id="s17-cta"] .s17-a { top: 590px; font-size: 128px; }
    [data-composition-id="s17-cta"] .s17-b { top: 724px; font-weight: 800; font-size: 58px; color: ${tiza}; text-shadow: 0 4px 0 ${tinta}; text-transform: none; }`,
    html: `
        <div class="txt grito nar s17-a">Mandáselo</div>
        <div class="txt s17-b">al que dice</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s17-globo">
            <rect x="150" y="810" width="780" height="150" rx="40" fill="${tiza}" stroke="${tinta}" stroke-width="6" />
            <path d="M210 958 L180 1010 L270 958" fill="${tiza}" stroke="${tinta}" stroke-width="6" stroke-linejoin="round" />
            <path d="M212 952 H268" stroke="${tiza}" stroke-width="8" />
            <text x="540" y="910" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="74" fill="${tinta}">«Ya te contesto»</text>
            <path class="s17-tild" d="M836 930 l10 10 l18 -20 M856 940 l18 -20" stroke="${tinta}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" />
          </g>
          <g transform="translate(540 1110) scale(0.85)"><g class="s17-per">${perro("s17p")}</g></g>
          <g class="s17-env">
            <path d="M700 1240 C800 1200 860 1140 870 1060" stroke="${nar}" stroke-width="12" fill="none" stroke-linecap="round" />
            <path d="M838 1084 l32 -30 l26 36" stroke="${nar}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <div class="zoc s17-z"><div class="tab">Compartilo</div><div class="tit">Al que deja en visto</div></div>`,
    js: `
      const AL = 0.46, YA = 1.02, CONTESTO = 1.39;
      golpe(".s17-a", 0.1, 1.8);
      sacudon(0.12, 1);
      pop(".s17-b", AL - 0.05, 0.3);
      tl.fromTo(q(".s17-globo"), { scale: 0.3, opacity: 0, transformOrigin: "540px 885px" }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" }, YA - 0.1);
      tl.fromTo(q(".s17-per"), { y: 500 }, { y: 0, duration: 0.4, ease: "back.out(1.4)" }, CONTESTO + 0.2);
      // el perro inclina la cabeza: "¿ya te contesto?"
      tl.to(q(".s17-per"), { rotation: -8, svgOrigin: "0 230", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, CONTESTO + 0.8);
      cola(".s17p-cola", CONTESTO + 0.6, 6);
      dibujar(".s17-env path", 2.2, 0.4);
      zocalos([[".s17-z", 2.4]]);
      tl.to(q(".s17-a"), { scale: 1.06, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.4);
      tl.to(q(".s17-env"), { x: 14, y: -14, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.8);`,
    sfx: [
      { t: 0.05, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
      { t: 0.95, sfx: "pop", vol: 0.3 },
      { t: 1.6, sfx: "whoosh", vol: 0.25 },
      { t: 2.2, sfx: "click", vol: 0.28 },
      { t: 2.6, sfx: "silbato", vol: 0.22 },
    ],
  },
];
