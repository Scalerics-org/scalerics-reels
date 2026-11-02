// Escenas s13 a s16: entra Scalerics (Orus), el agente de IA, el final feliz y el cierre.
import { C, norma, ruben, romina, enfrente } from "./lib.mjs";
import { celular, globo } from "./a.mjs";
const { noche, rey, am, rojo, crema, verde } = C;

// el agente de IA: una cara amable verde con auriculares
const agente = (p) => `
<g class="${p}">
  <path d="M-70 -10 C-70 -90 70 -90 70 -10" stroke="${crema}" stroke-width="10" fill="none" stroke-linecap="round" />
  <rect x="-64" y="-64" width="128" height="120" rx="40" fill="${verde}" stroke="${crema}" stroke-width="5" />
  <rect x="-88" y="-24" width="30" height="50" rx="12" fill="${noche}" stroke="${crema}" stroke-width="4" />
  <rect x="58" y="-24" width="30" height="50" rx="12" fill="${noche}" stroke="${crema}" stroke-width="4" />
  <path d="M74 26 Q74 70 24 70" stroke="${crema}" stroke-width="5" fill="none" /><circle cx="20" cy="70" r="8" fill="${crema}" />
  <g class="${p}-ojos"><rect x="-32" y="-26" width="16" height="26" rx="8" fill="${noche}" /><rect x="16" y="-26" width="16" height="26" rx="8" fill="${noche}" /></g>
  <path d="M-22 22 Q0 40 22 22" stroke="${noche}" stroke-width="6" fill="none" stroke-linecap="round" />
</g>`;

const chip = (cls, x, y, texto) => `
<g class="${cls}">
  <rect x="${x}" y="${y}" width="${30 + texto.length * 24 + 60}" height="70" rx="35" fill="${noche}" stroke="${verde}" stroke-width="5" />
  <path d="M${x + 26} ${y + 36} l12 12 l22 -24" stroke="${verde}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <text x="${x + 72}" y="${y + 47}" font-family="Lexend" font-weight="800" font-size="34" fill="${crema}">${texto}</text>
</g>`;

// tarjeta de una conversación que el agente maneja solo
const tarjeta = (cls, y, quien, texto) => `
<g class="${cls}">
  <rect x="90" y="${y}" width="900" height="200" rx="24" fill="${crema}" stroke="${noche}" stroke-width="5" />
  <rect x="90" y="${y}" width="22" height="200" rx="10" fill="${verde}" />
  <text x="140" y="${y + 56}" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${rey}" letter-spacing="2">${quien}</text>
  <text x="140" y="${y + 118}" font-family="Lexend" font-weight="700" font-size="40" fill="${noche}">${texto}</text>
  <g transform="translate(920 ${y + 150}) scale(0.32)">${agente(cls + "-ag")}</g>
</g>`;

export default [
  // ---------------------------------------------------------------- s13
  {
    id: "s13-agente",
    css: `
    [data-composition-id="s13-agente"] .s13-lbl { position: absolute; left: 790px; top: 1010px; width: 260px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: ${verde}; white-space: nowrap; }
    [data-composition-id="s13-agente"] .s13-hora { position: absolute; left: 812px; top: 610px; width: 210px; height: 130px; border-radius: 20px; border: 6px solid ${verde}; background: ${noche}; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 54px; color: ${crema}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-cel">${celular("s13", "Ferretería Rubén", rojo)}
            ${globo("s13-g1", 400, 730, 350, "¿Tenés mecha|de 8?", { mio: true, hora: "03:12", tildes: true })}
            ${globo("s13-g2", 330, 900, 400, "¡Sí! Sale $ 190.|Te la guardo.", { hora: "03:12", color: verde })}
          </g>
          <g transform="translate(920 900)"><g class="s13-ag">${agente("s13a")}</g></g>
          ${chip("s13-c1", 340, 1100, "Precios")}
          ${chip("s13-c2", 520, 1190, "Stock")}
        </svg>
        <div class="s13-lbl">Agente de IA</div>
        <div class="s13-hora">03:12</div>
        <div class="zoc s13-z"><div class="tab verde">Scalerics</div><div class="tit">Tu agente de IA</div></div>`,
    js: `
      const AGENTE = 1.24, CONTESTA = 2.09, HORA = 3.28, PRECIOS = 4.25, STOCK = 4.87;
      tl.fromTo(q(".s13-cel"), { y: 900 }, { y: 0, duration: 0.45, ease: "power3.out" }, 0);
      zocalos([[".s13-z", 0.15]]);
      pop(".s13-ag", AGENTE - 0.1, 0.4, 0.3);
      pop(".s13-lbl", AGENTE + 0.1, 0.3);
      tl.fromTo(q(".s13a-ojos"), { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, AGENTE + 0.8);
      tl.to(q(".s13-ag"), { y: -14, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, AGENTE + 0.4);
      pop(".s13-g1", CONTESTA - 0.5, 0.3, 0.7);
      pop(".s13-g2", CONTESTA + 0.2, 0.3, 0.6);
      pop(".s13-hora", HORA - 0.05, 0.35, 0.5);
      tl.to(q(".s13-hora"), { rotation: 4, duration: 0.1, yoyo: true, repeat: 3 }, HORA + 0.3);
      pop(".s13-c1", PRECIOS - 0.05, 0.3, 0.5);
      pop(".s13-c2", STOCK - 0.05, 0.3, 0.5);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-cinematic", vol: 0.25, max: 1.0 },
      { t: 1.15, sfx: "sparkle", vol: 0.3, max: 0.7 },
      { t: 1.6, sfx: "notification", vol: 0.28 },
      { t: 2.3, sfx: "ping", vol: 0.3 },
      { t: 3.25, sfx: "click", vol: 0.28 },
      { t: 4.2, sfx: "pop", vol: 0.3 },
      { t: 4.82, sfx: "pop", vol: 0.3 },
    ],
  },
  // ---------------------------------------------------------------- s14
  {
    id: "s14-seguimiento",
    css: `
    [data-composition-id="s14-seguimiento"] .s14-flecha-t { position: absolute; left: 540px; top: 1300px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: ${verde}; text-transform: uppercase; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${tarjeta("s14-t1", 590, "PREGUNTÓ Y NO COMPRÓ", "¿Y? ¿Te llevás la amoladora?")}
          ${tarjeta("s14-t2", 820, "HACE RATO QUE NO VIENE", "¡Llegaron las pinturas!")}
          ${tarjeta("s14-t3", 1050, "PEDIDO GRANDE PARA UNA OBRA", "Esto es para Rubén.")}
          <path class="s14-flecha" d="M300 1270 C300 1330 360 1340 470 1330" stroke="${verde}" stroke-width="9" fill="none" stroke-linecap="round" />
          <path class="s14-punta" d="M450 1308 l26 22 l-26 22" stroke="${verde}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="s14-flecha-t">Para vos, Rubén</div>
        <div class="zoc s14-z"><div class="tab verde">Agente de IA</div><div class="tit">Hace el seguimiento</div></div>`,
    js: `
      const SEGUIMIENTO = 0.23, ESCRIBE = 2.35, PASA = 4.65;
      const entra = (s, t) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 1, x: 1100 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, t); };
      entra(".s14-t1", SEGUIMIENTO - 0.15);
      zocalos([[".s14-z", 0.1]]);
      entra(".s14-t2", ESCRIBE - 0.15);
      entra(".s14-t3", 4.0);
      tl.to(q(".s14-t1"), { opacity: 0.55, duration: 0.3 }, ESCRIBE);
      tl.to(q(".s14-t2"), { opacity: 0.55, duration: 0.3 }, 4.0);
      dibujar(".s14-flecha", PASA - 0.05, 0.35);
      dibujar(".s14-punta", PASA + 0.25, 0.15);
      pop(".s14-flecha-t", PASA + 0.3, 0.3);
      tl.to(q(".s14-t3"), { scale: 1.03, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, PASA);`,
    sfx: [
      { t: 0.1, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.35, sfx: "notification", vol: 0.25 },
      { t: 2.2, sfx: "whoosh-short", vol: 0.3 },
      { t: 2.45, sfx: "notification", vol: 0.25 },
      { t: 3.85, sfx: "whoosh-short", vol: 0.3 },
      { t: 4.6, sfx: "chime", vol: 0.3, max: 0.8 },
    ],
  },
  // ---------------------------------------------------------------- s15
  {
    id: "s15-tenencia",
    css: `
    [data-composition-id="s15-tenencia"] .s15-sello { top: 610px; }
    [data-composition-id="s15-tenencia"] .s15-sello b { font-size: 64px; color: ${verde}; border-color: ${verde}; transform: rotate(-4deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(400 980) scale(0.9)"><g class="s15-rub">${ruben("s15r")}</g></g>
          <g transform="translate(720 1000) scale(0.85)"><g class="s15-rom">${romina("s15m")}</g></g>
          <path class="s15-brazo" d="M480 1150 C560 1110 620 1110 660 1140" stroke="${crema}" stroke-width="26" stroke-linecap="round" fill="none" />
          <g class="s15-cor" fill="${rojo}" stroke="${crema}" stroke-width="4">
            <path d="M560 860 c-20 -30 -60 -10 -40 20 l40 40 l40 -40 c20 -30 -20 -50 -40 -20 Z" />
            <path d="M240 820 c-14 -20 -42 -7 -28 14 l28 28 l28 -28 c14 -21 -14 -34 -28 -14 Z" />
            <path d="M880 830 c-14 -20 -42 -7 -28 14 l28 28 l28 -28 c14 -21 -14 -34 -28 -14 Z" />
          </g>
          <g class="s15-confeti">
            ${[[120, am], [220, rojo], [330, verde], [450, am], [560, crema], [680, rojo], [790, am], [890, verde], [980, rojo], [170, crema], [610, verde], [930, am]].map(([x, c], i) => `<rect class="s15-k" x="${x}" y="${520 - (i % 4) * 40}" width="18" height="30" rx="4" fill="${c}" />`).join("")}
          </g>
        </svg>
        <div class="txt sello s15-sello"><b>Tenencia recuperada</b></div>
        <div class="zoc s15-z"><div class="tab verde">Fallo</div><div class="tit">Rubén recupera a Romina</div></div>`,
    js: `
      const RECUPERA = 1.13, TENENCIA = 1.84;
      tl.fromTo(q(".s15-rub"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15-rom"), { x: 400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      dibujar(".s15-brazo", 0.4, 0.35);
      zocalos([[".s15-z", RECUPERA - 0.1]]);
      golpe(".s15-sello", TENENCIA + 0.05, 2);
      sacudon(TENENCIA + 0.08, 0.8);
      pop(".s15-cor path", RECUPERA, 0.35, 0.3);
      tl.to(qa(".s15-cor path"), { y: -20, duration: 0.4, yoyo: true, repeat: 3, stagger: 0.1, ease: "sine.inOut" }, RECUPERA + 0.4);
      // confeti que cae (determinista)
      qa(".s15-k").forEach((k, i) => tl.fromTo(k, { y: 0, rotation: 0, opacity: 0 }, { opacity: 1, y: 900 + (i % 3) * 80, rotation: 360 + i * 40, transformOrigin: "50% 50%", duration: 2.2 + (i % 4) * 0.2, ease: "none" }, TENENCIA - 0.2 + (i % 5) * 0.08));
      tl.to(q(".s15-rub"), { rotation: -4, svgOrigin: "0 300", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.5);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.28 },
      { t: 1.1, sfx: "sparkle", vol: 0.3, max: 0.7 },
      { t: 1.85, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 1.9, sfx: "chime", vol: 0.3, max: 0.8 },
    ],
  },
  // ---------------------------------------------------------------- s16
  {
    id: "s16-cta",
    css: `
    [data-composition-id="s16-cta"] .s16-a { top: 610px; font-weight: 900; font-size: 128px; color: ${am}; text-shadow: 8px 8px 0 ${rojo}; }
    [data-composition-id="s16-cta"] .s16-b { top: 770px; font-weight: 700; font-size: 58px; color: ${crema}; text-transform: none; }
    [data-composition-id="s16-cta"] .s16-c { top: 852px; font-weight: 900; font-size: 74px; color: ${crema}; }`,
    html: `
        <div class="txt s16-a">Mandáselo</div>
        <div class="txt s16-b">al que dice que sus</div>
        <div class="txt s16-c">clientes son fieles</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s16-sub" d="M150 960 Q540 990 930 952" stroke="${am}" stroke-width="8" stroke-linecap="round" fill="none" />
          <g transform="translate(540 1110) scale(0.62)"><g class="s16-enf">${enfrente("s16e")}</g></g>
          <g class="s16-env">
            <path d="M770 1150 C860 1110 900 1060 900 990" stroke="${am}" stroke-width="10" fill="none" stroke-linecap="round" />
            <path d="M872 1010 l28 -26 l24 30" stroke="${am}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <div class="zoc s16-z"><div class="tab">Mañana</div><div class="tit">«Mis clientes son fieles»</div></div>`,
    js: `
      const AL = 0.56, CLIENTES = 1.3, FIELES = 1.95;
      golpe(".s16-a", 0.1, 1.8);
      sacudon(0.12, 1);
      pop(".s16-b", AL - 0.05, 0.3);
      pop(".s16-c", CLIENTES - 0.1, 0.3);
      dibujar(".s16-sub", FIELES, 0.4);
      tl.fromTo(q(".s16-enf"), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, FIELES + 0.2);
      tl.to(q(".s16e-lentes"), { y: 24, duration: 0.2 }, FIELES + 0.9);
      tl.to(q(".s16e-boca"), { scaleX: 1.2, transformOrigin: "50% 50%", duration: 0.2 }, FIELES + 0.9);
      dibujar(".s16-env path", FIELES + 0.7, 0.4);
      zocalos([[".s16-z", 2.6]]);
      tl.to(q(".s16-a"), { scale: 1.06, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.4);
      tl.to(q(".s16-env"), { x: 14, y: -14, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.8);`,
    sfx: [
      { t: 0.05, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
      { t: 1.25, sfx: "pop", vol: 0.28 },
      { t: 2.1, sfx: "whoosh", vol: 0.28 },
      { t: 2.6, sfx: "click", vol: 0.28 },
      { t: 2.85, sfx: "ping", vol: 0.3 },
    ],
  },
];
