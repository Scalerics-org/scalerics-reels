// Escenas s01 a s06: la interrupción, el discurso y los tres primeros artículos; la calle.
import { C, escudo, bandera, atril, cortina, cenefa, presidente, periodista, gente, cartel, cacerola, celular, globo } from "./lib.mjs";
const { noche, azul2, azul, oro, blanco, rojo } = C;
const S = (id) => `[data-composition-id="${id}"]`;

// el presidente detrás del atril, entre banderas y cortinas (para s02, s11, s16)
export const despacho = (p, { y = 0, k = 1 } = {}) => `
  ${cortina(p + "-ci")}${cortina(p + "-cd", true)}
  ${cenefa(500)}
  <g transform="translate(150 ${780 + y})">${bandera(p + "-b1")}</g>
  <g transform="translate(930 ${780 + y})">${bandera(p + "-b2", true)}</g>
  <g transform="translate(540 ${880 + y}) scale(${k})"><g class="${p}-pre">${presidente(p + "p")}</g></g>
  <g transform="translate(540 ${1110 + y}) scale(${0.95 * k})"><g class="${p}-atr">${atril(p + "a")}</g></g>`;

export default [
  // ---------------------------------------------------------------- s01
  {
    id: "s01-interrumpimos",
    css: `
    ${S("s01-interrumpimos")} .s01-l1 { top: 600px; font-weight: 900; font-size: 84px; color: ${blanco}; text-shadow: 6px 6px 0 ${noche}; }
    ${S("s01-interrumpimos")} .s01-l2 { top: 694px; font-weight: 900; font-size: 128px; color: ${oro}; text-shadow: 7px 7px 0 ${rojo}; }
    ${S("s01-interrumpimos")} .s01-com { top: 1218px; font-size: 32px; color: ${blanco}; letter-spacing: 0.3em; }
    ${S("s01-interrumpimos")} .s01-sello { top: 1100px; }
    ${S("s01-interrumpimos")} .s01-sello b { font-size: 64px; transform: rotate(-5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-barras">
            ${[blanco, oro, azul, rojo, azul2, oro, blanco].map((c, i) => `<rect x="${i * 155 - 5}" y="540" width="160" height="620" fill="${c}" />`).join("")}
            ${[azul, noche, rojo, noche, oro, noche, azul].map((c, i) => `<rect x="${i * 155 - 5}" y="1160" width="160" height="90" fill="${c}" />`).join("")}
            <rect x="-5" y="1250" width="1090" height="110" fill="${noche}" />
            <text x="540" y="1325" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="40" fill="${blanco}" letter-spacing="8">SEÑAL INTERRUMPIDA</text>
          </g>
          <g class="s01-rayos" opacity="0.14" fill="${oro}">
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M540 990 L${540 + Math.cos((i * 30 * Math.PI) / 180) * 900} ${990 + Math.sin((i * 30 * Math.PI) / 180) * 900} L${540 + Math.cos(((i * 30 + 12) * Math.PI) / 180) * 900} ${990 + Math.sin(((i * 30 + 12) * Math.PI) / 180) * 900} Z" />`).join("")}
          </g>
          <g transform="translate(540 1000) scale(1.05)"><g class="s01-escudo">${escudo("s01e")}</g></g>
        </svg>
        <div class="txt s01-l1">Interrumpimos</div>
        <div class="txt s01-l2">tu scroll</div>
        <div class="txt mono s01-com">Comunicado oficial del local</div>
        <div class="txt sello s01-sello"><b>¡No te va a gustar!</b></div>
        <div class="zoc s01-z"><div class="tab">Cadena nacional</div><div class="tit">Mensaje del dueño</div></div>`,
    js: `
      const SCROLL = 0.88, DUENO = 1.75, ANUNCIO = 3.33, GUSTAR = 4.24;
      // cuadro 0: barras de color de la señal; se cortan con un glitch
      tl.to(q(".s01-barras"), { x: 30, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)" }, 0.15);
      tl.to(q(".s01-barras"), { scaleY: 0.02, opacity: 0, transformOrigin: "50% 950px", duration: 0.16, ease: "power3.in" }, 0.5);
      tl.fromTo(q(".s01-l1"), { opacity: 0.4, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      gsap.set(q(".s01-escudo"), { opacity: 0 });
      tl.fromTo(q(".s01-escudo"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, 0.6);
      tl.fromTo(q(".s01-rayos"), { rotation: 0, opacity: 0 }, { rotation: 40, opacity: 0.14, svgOrigin: "540 990", duration: 5.6, ease: "none" }, 0.6);
      golpe(".s01-l2", SCROLL, 1.8);
      sacudon(SCROLL + 0.05, 1.2);
      zocalos([[".s01-z", DUENO - 0.1]]);
      pop(".s01-com", ANUNCIO - 0.05, 0.3);
      tl.to(q(".s01e-humo"), { y: -10, opacity: 0.5, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.8);
      // "y no te va a gustar"
      tl.to(q(".s01-com"), { opacity: 0, duration: 0.15 }, GUSTAR - 0.15);
      golpe(".s01-sello", GUSTAR + 0.1, 2.2);
      sacudon(GUSTAR + 0.12, 1.4);
      tl.to(q(".s01-escudo"), { scale: 0.92, duration: 0.2, yoyo: true, repeat: 1 }, GUSTAR + 0.1);`,
    sfx: [
      { t: 0.0, sfx: "fanfarria", vol: 0.32 },
      { t: 0.12, sfx: "glitch-1", vol: 0.3, max: 0.4 },
      { t: 0.85, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
      { t: 1.65, sfx: "whoosh", vol: 0.25 },
      { t: 4.3, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s02
  {
    id: "s02-pueblo",
    css: `
    ${S("s02-pueblo")} .s02-sello { top: 600px; }
    ${S("s02-pueblo")} .s02-sello b { font-size: 76px; color: ${oro}; border-color: ${oro}; transform: rotate(-4deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s02-todo">${despacho("s02")}</g>
          <g class="s02-brillo" fill="${oro}">
            <path d="M650 1170 l10 -26 l10 26 l26 10 l-26 10 l-10 26 l-10 -26 l-26 -10 Z" />
            <path d="M590 1100 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 Z" />
          </g>
        </svg>
        <div class="txt sello s02-sello"><b>Decreto</b></div>
        <div class="zoc s02-z"><div class="tab">En vivo</div><div class="tit">El Presidente del Local</div></div>`,
    js: `
      const PUEBLO = 0.34, AUTORIDAD = 1.86, MOSTRADOR = 2.88, DECRETO = 3.8;
      tl.fromTo(q(".s02-todo"), { scale: 1.12, transformOrigin: "540px 1000px" }, { scale: 1, duration: 1.2, ease: "power2.out" }, 0);
      flamear([".s02-b1-pano", ".s02-b2-pano"], 0, 4.6);
      zocalos([[".s02-z", PUEBLO]]);
      hablar(".s02p-boca", 0, 1.1);
      hablar(".s02p-boca", 1.6, 4.3);
      tl.to(q(".s02-pre"), { y: -10, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.2);
      // "autoridad": la banda brilla
      pop(".s02-brillo path", AUTORIDAD, 0.3, 0.2);
      tl.to(qa(".s02-brillo path"), { rotation: 90, transformOrigin: "50% 50%", opacity: 0, duration: 0.8 }, AUTORIDAD + 0.35);
      tl.to(q(".s02p-cejas"), { y: -8, duration: 0.2, yoyo: true, repeat: 1 }, MOSTRADOR);
      // "decreto": golpe en el atril
      golpe(".s02-sello", DECRETO, 2);
      sacudon(DECRETO + 0.02, 1.2);
      tl.to(q(".s02-atr"), { y: 8, duration: 0.06, yoyo: true, repeat: 1 }, DECRETO);
      tl.to(q(".s02a-mics"), { rotation: 4, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 3 }, DECRETO);`,
    sfx: [
      { t: 0.3, sfx: "whoosh", vol: 0.25 },
      { t: 1.85, sfx: "sparkle", vol: 0.25, max: 0.7 },
      { t: 3.8, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s03
  {
    id: "s03-articulo-uno",
    css: `
    ${S("s03-articulo-uno")} .s03-sello { top: 1120px; }
    ${S("s03-articulo-uno")} .s03-sello b { font-size: 60px; transform: rotate(-6deg); }`,
    html: `
        <div class="txt art s03-art"><small>Artículo</small>1</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-cel">
            ${celular(320, 730, 440, 620, "WhatsApp del local", oro)}
            ${globo("s03-g1", 350, 880, 300, "¿Tenés en talle M?", { hora: "09:12" })}
            ${globo("s03-g2", 350, 990, 260, "¿Precio?", { hora: "11:40" })}
            ${globo("s03-g3", 350, 1100, 330, "¿Abren mañana?", { hora: "16:05" })}
            ${globo("s03-g4", 350, 1210, 220, "Hola??", { hora: "22:31" })}
          </g>
          <g class="s03-badge"><circle cx="760" cy="740" r="54" fill="${rojo}" stroke="${blanco}" stroke-width="5" />
            <text class="s03-n1" x="760" y="757" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${blanco}">12</text>
            <text class="s03-n2" x="760" y="757" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${blanco}" opacity="0">47</text>
            <text class="s03-n3" x="760" y="755" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="${blanco}" opacity="0">99+</text></g>
        </svg>
        <div class="txt sello s03-sello"><b>Cuando yo pueda</b></div>
        <div class="zoc s03-z"><div class="tab">Decreto 1</div><div class="tit">Se contesta cuando pueda</div></div>`,
    js: `
      const UNO = 0.51, WHATSAPP = 1.27, CONTESTAN = 2.21, YO = 2.88;
      golpe(".s03-art", UNO, 1.8);
      sacudon(UNO + 0.02, 0.9);
      tl.fromTo(q(".s03-cel"), { y: 700 }, { y: 0, duration: 0.45, ease: "power3.out" }, 0);
      [".s03-g1", ".s03-g2", ".s03-g3", ".s03-g4"].forEach((g, i) => pop(g, WHATSAPP + i * 0.25, 0.3, 0.6));
      pop(".s03-badge", WHATSAPP + 0.1, 0.3, 0.3);
      tl.set(q(".s03-n1"), { opacity: 0 }, CONTESTAN - 0.4); tl.set(q(".s03-n2"), { opacity: 1 }, CONTESTAN - 0.4);
      tl.set(q(".s03-n2"), { opacity: 0 }, CONTESTAN); tl.set(q(".s03-n3"), { opacity: 1 }, CONTESTAN);
      tl.to(q(".s03-badge"), { scale: 1.2, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 3 }, CONTESTAN);
      zocalos([[".s03-z", CONTESTAN - 0.2]]);
      // "cuando yo pueda": el celular queda en visto, se apaga
      golpe(".s03-sello", YO + 0.05, 2);
      sacudon(YO + 0.07, 1);
      tl.to(qa(".s03-g1, .s03-g2"), { opacity: 0.35, duration: 0.3 }, YO + 0.1);
      tl.to(qa(".s03-g3, .s03-g4"), { opacity: 0, duration: 0.1 }, YO - 0.12);
      tl.to(q(".s03-cel"), { rotation: -4, svgOrigin: "540 1040", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, YO + 0.3);`,
    sfx: [
      { t: 0.5, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.27, sfx: "notification", vol: 0.25 },
      { t: 1.52, sfx: "notification", vol: 0.22 },
      { t: 1.77, sfx: "notification", vol: 0.22 },
      { t: 2.02, sfx: "notification", vol: 0.22 },
      { t: 2.9, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s04
  {
    id: "s04-articulo-dos",
    css: `
    ${S("s04-articulo-dos")} .s04-ups { top: 1270px; font-size: 34px; color: ${oro}; letter-spacing: 0.24em; }`,
    html: `
        <div class="txt art s04-art"><small>Artículo</small>2</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-puerta">
            <rect x="290" y="740" width="500" height="600" fill="${azul2}" stroke="${blanco}" stroke-width="6" />
            <rect x="330" y="780" width="420" height="380" fill="${azul}" stroke="${blanco}" stroke-width="4" />
            <path d="M360 800 L440 900 M600 800 L720 950" stroke="${blanco}" stroke-width="5" opacity="0.3" stroke-linecap="round" />
            <circle cx="710" cy="1230" r="14" fill="${oro}" />
            <path d="M250 1340 H830" stroke="${blanco}" stroke-width="6" stroke-linecap="round" />
            <circle cx="540" cy="820" r="8" fill="${blanco}" />
          </g>
          <g class="s04-cartel">
            <path d="M540 820 L420 900 M540 820 L660 900" stroke="${blanco}" stroke-width="4" />
            <rect x="360" y="900" width="360" height="200" rx="10" fill="${blanco}" stroke="${noche}" stroke-width="5" />
            <text x="540" y="958" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" fill="${rojo}">HORARIO</text>
            <text x="540" y="1012" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="30" fill="${noche}">Lun a Vie 9 a 13</text>
            <text x="540" y="1056" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="28" fill="${noche}">16 a 20 (más o menos)</text>
          </g>
          <g class="s04-polvo" fill="${blanco}" opacity="0">
            <circle cx="400" cy="1320" r="18" /><circle cx="460" cy="1306" r="12" /><circle cx="640" cy="1308" r="14" /><circle cx="700" cy="1322" r="20" />
          </g>
        </svg>
        <div class="txt mono s04-ups">(se cayó)</div>
        <div class="zoc s04-z"><div class="tab">Decreto 2</div><div class="tit">El horario es el del cartel</div></div>`,
    js: `
      const DOS = 0.54, HORARIO = 1.31, CARTEL = 2.85, QUE = 3.36, CAYO = 4.05;
      golpe(".s04-art", DOS, 1.8);
      sacudon(DOS + 0.02, 0.9);
      tl.fromTo(q(".s04-puerta"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0);
      gsap.set(q(".s04-cartel"), { opacity: 0 });
      tl.fromTo(q(".s04-cartel"), { opacity: 0, rotation: -20, svgOrigin: "540 820" }, { opacity: 1, rotation: 0, svgOrigin: "540 820", duration: 0.5, ease: "back.out(2)", immediateRender: false }, HORARIO - 0.1);
      zocalos([[".s04-z", HORARIO + 0.4]]);
      tl.to(q(".s04-cartel"), { rotation: 6, svgOrigin: "540 820", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, CARTEL);
      // "que se cayó": se zafa de un lado y cae
      tl.to(q(".s04-cartel"), { rotation: 28, svgOrigin: "540 820", duration: 0.3, ease: "power2.in" }, QUE);
      tl.to(q(".s04-cartel"), { y: 300, rotation: 84, svgOrigin: "540 820", duration: 0.3, ease: "power3.in" }, CAYO - 0.25);
      tl.to(q(".s04-polvo"), { opacity: 0.6, duration: 0.05 }, CAYO + 0.05);
      tl.to(q(".s04-polvo"), { opacity: 0, y: -40, scale: 1.4, transformOrigin: "50% 50%", duration: 0.5 }, CAYO + 0.1);
      sacudon(CAYO + 0.06, 1.1);
      pop(".s04-ups", CAYO + 0.15, 0.3);`,
    sfx: [
      { t: 0.54, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.25, sfx: "pop", vol: 0.3 },
      { t: 3.4, sfx: "whoosh-short", vol: 0.25 },
      { t: 4.05, sfx: "impact-bass-2", vol: 0.45, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s05
  {
    id: "s05-articulo-tres",
    css: `
    ${S("s05-articulo-tres")} .s05-sello { top: 1170px; }
    ${S("s05-articulo-tres")} .s05-sello b { font-size: 58px; transform: rotate(4deg); }
    ${S("s05-articulo-tres")} .s05-afuera { top: 1290px; font-size: 32px; color: ${blanco}; letter-spacing: 0.22em; }`,
    html: `
        <div class="txt art s05-art"><small>Artículo</small>3</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-cal">
            <rect x="560" y="760" width="380" height="380" rx="16" fill="${blanco}" stroke="${noche}" stroke-width="6" />
            <rect x="560" y="760" width="380" height="96" rx="16" fill="${rojo}" />
            <rect x="560" y="830" width="380" height="26" fill="${rojo}" />
            <circle cx="650" cy="760" r="10" fill="${noche}" /><circle cx="850" cy="760" r="10" fill="${noche}" />
            <text x="750" y="826" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="46" fill="${blanco}" letter-spacing="3">LUNES</text>
            <text x="750" y="1060" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="180" fill="${noche}">L</text>
            <ellipse class="s05-circulo" cx="750" cy="1000" rx="130" ry="110" fill="none" stroke="${rojo}" stroke-width="10" />
          </g>
          <g transform="translate(270 1000)"><g class="s05-cli">${gente("s05c", azul2)}</g></g>
          <g class="s05-preg">
            <path d="M120 720 H420 Q440 720 440 740 V830 Q440 850 420 850 H260 L230 890 L230 850 H120 Q100 850 100 830 V740 Q100 720 120 720 Z" fill="${blanco}" stroke="${noche}" stroke-width="5" />
            <text x="270" y="802" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="46" fill="${noche}">¿Precio?</text>
          </g>
        </svg>
        <div class="txt sello s05-sello"><b>Que pase el lunes</b></div>
        <div class="txt mono s05-afuera">Afuera: cacerolas</div>
        <div class="zoc s05-z"><div class="tab">Decreto 3</div><div class="tit">El precio, el lunes</div></div>`,
    js: `
      const TRES = 0.6, QUIERA = 1.45, PRECIO = 1.7, PASE = 2.46, LUNES = 2.97, CACEROLAS = 3.55;
      golpe(".s05-art", TRES, 1.8);
      sacudon(TRES + 0.02, 0.9);
      tl.fromTo(q(".s05-cal"), { x: 500 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0.1);
      tl.fromTo(q(".s05-cli"), { x: -400 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0.3);
      pop(".s05-preg", PRECIO - 0.2, 0.35, 0.5);
      hablar(".s05c-boca", QUIERA, PRECIO + 0.4);
      zocalos([[".s05-z", PRECIO]]);
      dibujar(".s05-circulo", LUNES - 0.1, 0.45);
      golpe(".s05-sello", PASE + 0.05, 2);
      sacudon(PASE + 0.07, 1);
      tl.to(q(".s05-cli"), { x: -500, duration: 0.5, ease: "power2.in" }, LUNES + 0.2);
      tl.to(q(".s05-preg"), { opacity: 0, duration: 0.25 }, LUNES + 0.2);
      // afuera empiezan las cacerolas: tiembla todo
      pop(".s05-afuera", CACEROLAS, 0.3);
      [0, 0.18, 0.5, 0.68, 0.86].forEach((d) => sacudon(CACEROLAS + d, 0.5));`,
    sfx: [
      { t: 0.6, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.55, sfx: "pop", vol: 0.28 },
      { t: 2.5, sfx: "impact-bass-2", vol: 0.42, max: 0.6 },
      { t: 3.45, sfx: "cacerolas", vol: 0.38 },
    ],
  },
  // ---------------------------------------------------------------- s06
  {
    id: "s06-la-calle",
    css: `
    ${S("s06-la-calle")} .s06-ardiendo { top: 590px; font-weight: 900; font-size: 84px; color: ${oro}; text-shadow: 6px 6px 0 ${rojo}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(0 50)"><g class="s06-fachada">
            <rect x="120" y="700" width="840" height="560" fill="${azul2}" stroke="${blanco}" stroke-width="5" />
            <path d="M100 700 H980 L940 790 H140 Z" fill="${rojo}" stroke="${blanco}" stroke-width="5" stroke-linejoin="round" />
            <path d="M210 700 L190 790 M320 700 L310 790 M430 700 L430 790 M540 700 L550 790 M650 700 L670 790 M760 700 L790 790 M870 700 L910 790" stroke="${blanco}" stroke-width="4" opacity="0.6" />
            <rect x="380" y="672" width="320" height="56" rx="8" fill="${oro}" stroke="${noche}" stroke-width="4" />
            <text x="540" y="712" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="34" fill="${noche}" letter-spacing="3">EL LOCAL</text>
            <rect x="460" y="860" width="160" height="400" fill="${azul}" stroke="${blanco}" stroke-width="4" />
            <rect x="180" y="860" width="220" height="200" fill="${azul}" stroke="${blanco}" stroke-width="4" />
            <rect x="680" y="860" width="220" height="200" fill="${azul}" stroke="${blanco}" stroke-width="4" />
          </g></g>
          <g class="s06-gente">
            <g transform="translate(560 1060) scale(0.85)"><g class="s06-c1">${cartel("s06-k1", "¡QUEREMOS|RESPUESTA!", 330)}</g></g>
            <g transform="translate(830 1060) scale(0.8)"><g class="s06-c2">${cartel("s06-k2", "¿Y EL|HORARIO?", 260, noche, oro)}</g></g>
            <g transform="translate(470 1170) scale(0.8)">${gente("s06g1", rojo)}</g>
            <g transform="translate(640 1180) scale(0.8)">${gente("s06g2", azul)}</g>
            <g transform="translate(860 1230) scale(0.8)">${gente("s06g3", oro)}</g>
            <g transform="translate(420 1130) scale(0.7)"><g class="s06-cac">${cacerola("s06-o")}</g></g>
          </g>
          <g class="s06-llamas" opacity="0">
            ${[[290, 1000], [790, 1000]].map(([x, y]) => `<path d="M${x} ${y} c-40 -40 -10 -80 0 -110 c10 40 50 50 30 100 c-6 14 -20 20 -30 10 Z" fill="${rojo}" stroke="${oro}" stroke-width="5" />`).join("")}
          </g>
          <g transform="translate(250 1150) scale(0.95)"><g class="s06-per">${periodista("s06p")}</g></g>
        </svg>
        <div class="txt s06-ardiendo">¡Está que arde!</div>
        <div class="zoc s06-z"><div class="tab">En vivo</div><div class="tit azul">Desde la puerta del local</div></div>`,
    js: `
      const PUERTA = 0.63, GENTE = 1.91, ARDE = 2.45;
      tl.fromTo(q(".s06-esc"), { x: 260 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s06-per"), { x: -300 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0.05);
      hablar(".s06p-boca", 0, 2.9);
      zocalos([[".s06-z", PUERTA - 0.2]]);
      // los carteles suben y bajan, la cacerola suena
      tl.to(q(".s06-c1"), { y: -24, rotation: -5, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0.1);
      tl.to(q(".s06-c2"), { y: -20, rotation: 5, transformOrigin: "50% 100%", duration: 0.24, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.2);
      tl.to(q(".s06-o-cuch"), { rotation: 24, svgOrigin: "30 -60", duration: 0.09, yoyo: true, repeat: 29, ease: "power1.in" }, 0);
      [".s06g1-boca", ".s06g2-boca", ".s06g3-boca"].forEach((b, i) => hablar(b, 0.2 + i * 0.1, 3.1));
      tl.to(q(".s06-llamas"), { opacity: 1, duration: 0.15 }, ARDE - 0.1);
      tl.fromTo(qa(".s06-llamas path"), { scaleY: 0.3, transformOrigin: "50% 100%" }, { scaleY: 1.1, duration: 0.15, yoyo: true, repeat: 5, stagger: 0.05, ease: "sine.inOut", immediateRender: false }, ARDE - 0.1);
      golpe(".s06-ardiendo", ARDE, 1.8);
      sacudon(ARDE + 0.03, 1);
      tl.to(q(".s06-per"), { y: -10, duration: 0.25, yoyo: true, repeat: 1 }, GENTE);`,
    sfx: [
      { t: 0.0, sfx: "cacerolas", vol: 0.2 },
      { t: 0.6, sfx: "click", vol: 0.25 },
      { t: 2.4, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
    ],
  },
];
