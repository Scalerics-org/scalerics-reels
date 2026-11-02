// Escenas s12 a s17: asume el ministro (el agente de IA), qué hace, el pueblo festeja, se deroga
// el lunes y el cierre.
import { C, presidente, vecina, gente, cartel, celular, globo, agente, atril, confeti } from "./lib.mjs";
import { despacho } from "./a.mjs";
const { noche, azul2, azul, oro, blanco, rojo, verde } = C;
const S = (id) => `[data-composition-id="${id}"]`;
const chip = (cls, x, y, w, texto) => `<g class="${cls}">
  <rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${noche}" stroke="${verde}" stroke-width="5" />
  <path d="M${x + 24} ${y + 33} l10 10 l18 -20" stroke="${verde}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <text x="${x + 64}" y="${y + 43}" font-family="Lexend" font-weight="700" font-size="30" fill="${blanco}">${texto}</text>
</g>`;

export default [
  // ---------------------------------------------------------------- s12
  {
    id: "s12-agente",
    css: `
    ${S("s12-agente")} .s12-nom { top: 1268px; font-size: 32px; color: ${verde}; letter-spacing: 0.3em; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-foco"><path d="M540 600 L280 1330 H800 Z" fill="${verde}" opacity="0.1" /></g>
          <rect x="300" y="1220" width="480" height="40" rx="8" fill="${azul}" stroke="${oro}" stroke-width="5" />
          <g transform="translate(540 870) scale(1.05)"><g class="s12-age">${agente("s12a")}</g></g>
          <g class="s12-ti"><path d="M200 720 H540 V1330 H200 Z" fill="${rojo}" stroke="${oro}" stroke-width="5" /></g>
          <g class="s12-td"><path d="M540 720 H880 V1330 H540 Z" fill="${rojo}" stroke="${oro}" stroke-width="5" /></g>
          <path d="M180 720 H900" stroke="${oro}" stroke-width="16" stroke-linecap="round" />
          <g class="s12-conf">${confeti("s12", 560)}</g>
        </svg>
        <div class="txt mono s12-nom">Ministro de atención</div>
        <div class="zoc s12-z"><div class="tab verde">Asume</div><div class="tit azul">Agente de IA · Scalerics</div></div>`,
    js: `
      const AGENTE = 0.18, IA = 0.63, SCALERICS = 1.61;
      tl.fromTo(q(".s12-ti"), { x: 0 }, { x: -330, scaleX: 0.3, svgOrigin: "200 720", duration: 0.5, ease: "power2.inOut" }, 0);
      tl.fromTo(q(".s12-td"), { x: 0 }, { x: 330, scaleX: 0.3, svgOrigin: "880 720", duration: 0.5, ease: "power2.inOut" }, 0);
      tl.set([q(".s12-ti"), q(".s12-td")], { opacity: 0 }, 0.5);
      tl.fromTo(q(".s12-age"), { scale: 0.85, transformOrigin: "50% 60%" }, { scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 0.1);
      tl.fromTo(q(".s12-foco"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
      tl.fromTo(q(".s12a-boca"), { scaleY: 0.5, transformOrigin: "50% 0%" }, { scaleY: 1.2, duration: 0.3, yoyo: true, repeat: 1, immediateRender: false }, IA);
      tl.to(q(".s12a-ojos"), { scaleY: 0.2, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, 1.3);
      pop(".s12-nom", IA, 0.3);
      llover(".s12-k", 0.3);
      zocalos([[".s12-z", SCALERICS - 0.3]]);
      tl.to(q(".s12-age"), { y: -10, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.7);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-cinematic", vol: 0.3, max: 1.0 },
      { t: 0.2, sfx: "aplausos", vol: 0.25 },
      { t: 0.65, sfx: "chime", vol: 0.3, max: 0.8 },
      { t: 1.35, sfx: "click", vol: 0.25 },
    ],
  },
  // ---------------------------------------------------------------- s13
  {
    id: "s13-contesta",
    css: `
    ${S("s13-contesta")} .s13-reloj { position: absolute; left: 70px; top: 620px; width: 250px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 64px; color: ${verde}; }
    ${S("s13-contesta")} .s13-reloj span { display: block; font-size: 24px; letter-spacing: 0.24em; color: ${blanco}; margin-top: 8px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-cel">
            ${celular(360, 600, 480, 760, "El local", verde)}
            <g transform="translate(430 690) scale(0.18)">${agente("s13ag", false)}</g>
            ${globo("s13-g1", 400, 760, 330, "¿Tienen torta|para el domingo?", { hora: "03:12" })}
            ${globo("s13-g2", 440, 900, 370, "¡Sí! Chocolate|o frutilla, $ 890.|Abrimos de 8 a 20.|¿Te la reservo?", { hora: "03:12", color: verde })}
            <g class="s13-escr"><rect x="400" y="1150" width="150" height="50" rx="25" fill="${noche}" />${[0, 1, 2].map((i) => `<circle class="s13-p" cx="${440 + i * 34}" cy="1175" r="9" fill="${verde}" />`).join("")}</g>
          </g>
          <g class="s13-luna"><path d="M190 820 a60 60 0 1 0 60 76 a48 48 0 1 1 -60 -76 Z" fill="${oro}" /></g>
        </svg>
        <div class="s13-reloj">03:12<span>De madrugada</span></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${chip("s13-c1", 60, 1000, 250, "Precios")}
          ${chip("s13-c2", 60, 1090, 230, "Stock")}
          ${chip("s13-c3", 60, 1180, 270, "Horarios")}
        </svg>
        <div class="zoc s13-z"><div class="tab verde">Ministro</div><div class="tit azul">Contesta al instante</div></div>`,
    js: `
      const INSTANTE = 0.49, CUALQUIER = 1.38, PRECIOS = 2.54, STOCK = 3.45, HORARIOS = 4.15;
      tl.fromTo(q(".s13-cel"), { y: 700 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      pop(".s13-g1", 0.3, 0.3, 0.6);
      pop(".s13-escr", 0.4, 0.15);
      tl.to(qa(".s13-p"), { y: -8, duration: 0.1, yoyo: true, repeat: 1, stagger: 0.05 }, 0.42);
      tl.to(q(".s13-escr"), { opacity: 0, duration: 0.1 }, INSTANTE + 0.05);
      pop(".s13-g2", INSTANTE + 0.05, 0.35, 0.6);
      zocalos([[".s13-z", INSTANTE + 0.2]]);
      pop(".s13-reloj", CUALQUIER, 0.3, 0.5);
      pop(".s13-luna", CUALQUIER + 0.1, 0.35, 0.4);
      tl.to(q(".s13-luna"), { rotation: -12, svgOrigin: "220 860", duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, CUALQUIER + 0.5);
      pop(".s13-c1", PRECIOS, 0.3, 0.5);
      pop(".s13-c2", STOCK, 0.3, 0.5);
      pop(".s13-c3", HORARIOS - 0.05, 0.3, 0.5);
      tl.to(q(".s13-g2"), { scale: 1.04, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, PRECIOS);`,
    sfx: [
      { t: 0.3, sfx: "notification", vol: 0.25 },
      { t: 0.55, sfx: "ping", vol: 0.3 },
      { t: 1.4, sfx: "click-soft", vol: 0.25 },
      { t: 2.55, sfx: "pop", vol: 0.28 },
      { t: 3.45, sfx: "pop", vol: 0.28 },
      { t: 4.12, sfx: "pop", vol: 0.28 },
    ],
  },
  // ---------------------------------------------------------------- s14
  {
    id: "s14-pedidos",
    css: `
    ${S("s14-pedidos")} .s14-para { top: 1280px; font-size: 32px; color: ${verde}; letter-spacing: 0.3em; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(260 760) scale(0.62)"><g class="s14-age">${agente("s14a")}</g></g>
          <g class="s14-t1"><rect x="470" y="600" width="520" height="150" rx="14" fill="${blanco}" stroke="${verde}" stroke-width="6" />
            <text x="500" y="652" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${noche}" letter-spacing="3">PEDIDO #14</text>
            <text x="500" y="708" font-family="Lexend" font-weight="700" font-size="32" fill="${noche}">Torta chocolate · Dom 10 h</text></g>
          <g class="s14-t2"><rect x="470" y="770" width="520" height="150" rx="14" fill="${blanco}" stroke="${verde}" stroke-width="6" />
            <text x="500" y="822" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${noche}" letter-spacing="3">RESERVA</text>
            <text x="500" y="878" font-family="Lexend" font-weight="700" font-size="32" fill="${noche}">Sáb 21 h · 4 personas</text></g>
          <g class="s14-g">${globo("s14-gl", 120, 1070, 360, "¿Me hacen una|torta de 3 pisos?", { color: verde })}</g>
          <path class="s14-flecha" d="M490 1130 C600 1060 700 1060 760 1110" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" />
          <path class="s14-punta" d="M730 1080 L768 1116 L720 1130" stroke="${verde}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <g transform="translate(860 1080) scale(0.62)"><g class="s14-pre">${presidente("s14p")}</g></g>
        </svg>
        <div class="txt mono s14-para">Para vos</div>
        <div class="zoc s14-z"><div class="tab verde">Ministro</div><div class="tit azul">Te pasa la conversación</div></div>`,
    js: `
      const PEDIDOS = 0.15, RESERVAS = 0.78, CUANDO = 1.4, VOS = 2.2, PASA = 2.74;
      tl.fromTo(q(".s14-age"), { x: -300 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s14-t1"), { x: 600 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, PEDIDOS);
      tl.fromTo(q(".s14-t2"), { x: 600 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, RESERVAS);
      pop(".s14-g", CUANDO, 0.35, 0.6);
      tl.fromTo(q(".s14-pre"), { x: 300 }, { x: 0, duration: 0.4, ease: "power3.out" }, VOS - 0.2);
      dibujar(".s14-flecha", PASA - 0.1, 0.4);
      dibujar(".s14-punta", PASA + 0.25, 0.15);
      tl.to(q(".s14-g"), { x: 470, y: -160, scale: 0.6, transformOrigin: "50% 50%", duration: 0.5, ease: "power2.inOut" }, PASA + 0.4);
      pop(".s14-para", PASA + 0.4, 0.3);
      tl.to(q(".s14p-cejas"), { y: -10, duration: 0.2 }, PASA + 0.8);
      zocalos([[".s14-z", CUANDO]]);
      tl.to(q(".s14-age"), { y: -10, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.5);`,
    sfx: [
      { t: 0.15, sfx: "click", vol: 0.28 },
      { t: 0.78, sfx: "click", vol: 0.28 },
      { t: 1.4, sfx: "notification", vol: 0.25 },
      { t: 2.7, sfx: "whoosh", vol: 0.28 },
      { t: 3.2, sfx: "ping", vol: 0.28 },
    ],
  },
  // ---------------------------------------------------------------- s15
  {
    id: "s15-viva",
    css: `
    ${S("s15-viva")} .s15-viva { top: 600px; font-weight: 900; font-size: 96px; color: ${verde}; text-shadow: 6px 6px 0 ${noche}; }`,
    html: `
        <div class="txt s15-viva">¡Viva el ministro!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-multitud">
            <g transform="translate(220 860) scale(0.78)"><g class="s15-cart s15-k1">${cartel("s15-c1", "¡GRACIAS|MINISTRO!", 330, noche, verde)}</g></g>
            <g transform="translate(860 860) scale(0.78)"><g class="s15-cart s15-k2">${cartel("s15-c2", "¡A LAS 3|AM!", 280, noche, oro)}</g></g>
            ${[[120, 1150, azul], [300, 1170, oro], [780, 1170, azul], [960, 1150, rojo], [210, 1270, rojo], [870, 1270, oro]]
              .map(([x, y, c], i) => `<g transform="translate(${x} ${y}) scale(0.75)"><g class="s15-p">${gente("s15g" + i, c)}</g></g>`).join("")}
          </g>
          <g transform="translate(540 1030)"><g class="s15-vec">${vecina("s15v")}
            <g transform="translate(130 140) rotate(-10)"><rect x="-50" y="-90" width="100" height="180" rx="16" fill="${noche}" stroke="${blanco}" stroke-width="5" /><rect class="s15-pant" x="-38" y="-74" width="76" height="140" rx="8" fill="${verde}" opacity="0.8" /><text x="0" y="-10" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${noche}">03:12</text></g>
          </g></g>
          <g class="s15-conf">${confeti("s15", 560)}</g>
        </svg>
        <div class="zoc s15-z"><div class="tab verde">Último momento</div><div class="tit azul">El pueblo festeja</div></div>`,
    js: `
      const TRES = 1.04, MANANA = 1.58, VIVA = 2.19, MINISTRO = 2.55;
      tl.fromTo(q(".s15-vec"), { y: 300 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15-multitud"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35 }, 0.1);
      hablar(".s15v-boca", 0, 3.1);
      tl.to(q(".s15v-cejas"), { y: -12, duration: 0.2 }, TRES);
      tl.to(q(".s15-pant"), { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 5 }, MANANA);
      golpe(".s15-viva", VIVA, 1.8);
      sacudon(VIVA + 0.03, 1.1);
      llover(".s15-k", VIVA);
      qa(".s15-p").forEach((p, i) => tl.to(p, { y: -34, duration: 0.15, yoyo: true, repeat: 7, ease: "power1.out" }, VIVA + (i % 3) * 0.05));
      qa(".s15-cart").forEach((k, i) => tl.to(k, { y: -24, rotation: i ? 6 : -6, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, VIVA));
      tl.to(q(".s15-vec"), { y: -20, duration: 0.2, yoyo: true, repeat: 5, ease: "power1.out" }, MINISTRO);
      zocalos([[".s15-z", 0.5]]);`,
    sfx: [
      { t: 1.0, sfx: "notification", vol: 0.25 },
      { t: 2.2, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
      { t: 2.6, sfx: "aplausos", vol: 0.42 },
      { t: 2.7, sfx: "sparkle", vol: 0.25, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s16
  {
    id: "s16-derogado",
    css: `
    ${S("s16-derogado")} .s16-sello { top: 1090px; }
    ${S("s16-derogado")} .s16-sello b { font-size: 74px; transform: rotate(-8deg); }`,
    html: `
        <div class="txt art s16-art"><small>Artículo</small>5</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(250 1010) scale(0.75)"><g class="s16-pre">${presidente("s16p")}</g></g>
          <g transform="translate(250 1230) scale(0.6)">${atril("s16a")}</g>
          <g class="s16-cal">
            <rect x="520" y="760" width="420" height="420" rx="16" fill="${blanco}" stroke="${noche}" stroke-width="6" />
            <rect x="520" y="760" width="420" height="100" rx="16" fill="${rojo}" />
            <rect x="520" y="834" width="420" height="26" fill="${rojo}" />
            <text x="730" y="830" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="50" fill="${blanco}" letter-spacing="3">LUNES</text>
            <text x="730" y="1090" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="200" fill="${noche}">L</text>
            <path class="s16-x" d="M560 900 L900 1150 M900 900 L560 1150" stroke="${rojo}" stroke-width="16" stroke-linecap="round" />
          </g>
          <g class="s16-conf">${confeti("s16", 560)}</g>
        </svg>
        <div class="txt sello s16-sello"><b>Derogado</b></div>
        <div class="zoc s16-z"><div class="tab">Decreto 5</div><div class="tit">Chau «pasá el lunes»</div></div>`,
    js: `
      const CINCO = 0.54, LUNES = 1.41, DEROGADO = 2.36;
      golpe(".s16-art", CINCO, 1.8);
      sacudon(CINCO + 0.02, 0.9);
      tl.fromTo(q(".s16-pre"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0);
      hablar(".s16p-boca", 0, 3.2);
      tl.fromTo(q(".s16-cal"), { x: 500 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.15);
      tl.to(q(".s16-cal"), { rotation: -4, svgOrigin: "730 760", duration: 0.2, yoyo: true, repeat: 1 }, LUNES);
      zocalos([[".s16-z", 0.9]]);
      dibujar(".s16-x", DEROGADO - 0.15, 0.3);
      golpe(".s16-sello", DEROGADO + 0.05, 2.2);
      sacudon(DEROGADO + 0.07, 1.3);
      llover(".s16-k", DEROGADO);
      tl.to(q(".s16-pre"), { rotation: -5, svgOrigin: "0 330", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, DEROGADO + 0.2);`,
    sfx: [
      { t: 0.54, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 2.3, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
      { t: 2.45, sfx: "fanfarria", vol: 0.25 },
    ],
  },
  // ---------------------------------------------------------------- s17
  {
    id: "s17-cta",
    css: `
    ${S("s17-cta")} .s17-a { top: 590px; font-weight: 900; font-size: 112px; color: ${verde}; text-shadow: 7px 7px 0 ${noche}; }
    ${S("s17-cta")} .s17-b { top: 712px; font-weight: 900; font-size: 112px; color: ${rojo}; text-shadow: 7px 7px 0 ${noche}; }
    ${S("s17-cta")} .s17-c { top: 1268px; font-size: 32px; color: ${oro}; letter-spacing: 0.24em; }`,
    html: `
        <div class="txt s17-a">¿Lo votás</div>
        <div class="txt s17-b">o lo echás?</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(0 28)"><g class="s17-v1"><rect x="300" y="830" width="200" height="130" rx="10" fill="${blanco}" stroke="${verde}" stroke-width="6" transform="rotate(-8 400 895)" />
            <text x="400" y="912" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="42" fill="${noche}" transform="rotate(-8 400 895)">VOTO</text></g></g>
          <g transform="translate(0 28)"><g class="s17-v2"><rect x="580" y="830" width="200" height="130" rx="10" fill="${blanco}" stroke="${rojo}" stroke-width="6" transform="rotate(8 680 895)" />
            <text x="680" y="912" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="42" fill="${rojo}" transform="rotate(8 680 895)">ECHO</text></g></g>
          <g class="s17-urna">
            <path d="M320 1010 H760 L800 1230 H280 Z" fill="${azul}" stroke="${oro}" stroke-width="7" stroke-linejoin="round" />
            <path d="M300 990 H780 V1030 H300 Z" fill="${azul2}" stroke="${oro}" stroke-width="6" />
            <rect x="440" y="1000" width="200" height="16" rx="8" fill="${noche}" />
            <g transform="translate(540 1130) scale(0.32)"><g class="s17-agu">${agente("s17ag", false)}</g></g>
          </g>
        </svg>
        <div class="txt mono s17-c">Te leemos en los comentarios</div>`,
    js: `
      const VOTAS = 0.18, ECHAS = 1.11, TE = 1.44, COMENTARIOS = 2.31;
      golpe(".s17-a", VOTAS, 1.8);
      sacudon(VOTAS + 0.02, 1);
      golpe(".s17-b", ECHAS - 0.05, 1.8);
      sacudon(ECHAS, 1);
      tl.fromTo(q(".s17-urna"), { y: 500 }, { y: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      pop(".s17-v1", VOTAS + 0.2, 0.3, 0.5);
      pop(".s17-v2", ECHAS + 0.1, 0.3, 0.5);
      pop(".s17-c", TE, 0.3);
      // las boletas entran y salen de la urna, alternadas
      [[".s17-v1", 2.6], [".s17-v2", 3.5]].forEach(([s, t]) => {
        tl.to(q(s), { y: 120, x: s === ".s17-v1" ? 140 : -140, scale: 0.5, opacity: 0, transformOrigin: "50% 50%", duration: 0.35, ease: "power2.in" }, t);
        tl.set(q(s), { x: 0, y: 0, scale: 1 }, t + 0.36);
        tl.to(q(s), { opacity: 1, duration: 0.25 }, t + 0.45);
        tl.to(q(".s17-urna"), { y: 8, duration: 0.06, yoyo: true, repeat: 1 }, t + 0.35);
      });
      tl.to(q(".s17-a"), { scale: 1.05, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, COMENTARIOS);`,
    sfx: [
      { t: 0.15, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
      { t: 1.08, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
      { t: 1.45, sfx: "pop", vol: 0.28 },
      { t: 2.9, sfx: "click", vol: 0.25 },
      { t: 3.8, sfx: "click", vol: 0.25 },
    ],
  },
];
