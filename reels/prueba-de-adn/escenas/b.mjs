// Escenas s07 a s12: el descargo, el sobre, "no es el padre", las sillas, el giro.
import { C, norma, ruben, enfrente, guardia, sobre, silla } from "./lib.mjs";
const { noche, rey, am, rojo, crema } = C;

export default [
  // ---------------------------------------------------------------- s07
  {
    id: "s07-durmiendo",
    css: `
    [data-composition-id="s07-durmiendo"] .s07-dom { top: 600px; }
    [data-composition-id="s07-durmiendo"] .s07-dom b { font-size: 86px; transform: rotate(-4deg); }
    [data-composition-id="s07-durmiendo"] .s07-zzz { position: absolute; left: 730px; top: 790px; font-family: "Lexend", sans-serif; font-weight: 900; color: ${crema}; }
    [data-composition-id="s07-durmiendo"] .s07-zzz span { position: absolute; display: block; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-cama">
            <rect x="200" y="840" width="680" height="260" rx="40" fill="${rojo}" stroke="${crema}" stroke-width="5" />
            <path d="M260 900 H820" stroke="${crema}" stroke-width="4" opacity="0.35" />
            <rect x="380" y="1000" width="320" height="110" rx="40" fill="${crema}" stroke="${noche}" stroke-width="5" />
          </g>
          <g transform="translate(540 1010) scale(0.95)"><g class="s07-rub">${ruben("s07r")}
            <path d="M-70 -40 C-70 -110 40 -140 80 -120 C110 -110 140 -60 150 -10 L66 -36 C40 -60 -40 -64 -70 -40 Z" fill="${rojo}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
            <circle cx="152" cy="-6" r="20" fill="${am}" stroke="${crema}" stroke-width="4" />
          </g></g>
          <g class="s07-manta">
            <path d="M150 1170 Q540 1110 930 1170 L950 1350 H130 Z" fill="${rey}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
            <path d="M200 1230 H880 M190 1290 H890" stroke="${am}" stroke-width="8" opacity="0.6" />
          </g>
          <g class="s07-mesa">
            <rect x="880" y="1080" width="150" height="160" rx="10" fill="${noche}" stroke="${crema}" stroke-width="5" />
            <g class="s07-cel"><rect x="920" y="1010" width="70" height="66" rx="10" fill="${crema}" stroke="${noche}" stroke-width="4" /><circle cx="990" cy="1012" r="14" fill="${rojo}" /></g>
            <path class="s07-vib" d="M906 1020 l-12 -8 M906 1050 l-14 0 M1004 1020 l12 -8" stroke="${crema}" stroke-width="4" stroke-linecap="round" />
          </g>
        </svg>
        <div class="txt sello s07-dom"><b>¡Era domingo!</b></div>
        <div class="s07-zzz"><span class="s07-z1" style="left:0;top:80px;font-size:44px">Z</span><span class="s07-z2" style="left:40px;top:30px;font-size:58px">Z</span><span class="s07-z3" style="left:96px;top:-30px;font-size:70px">Z</span></div>
        <div class="zoc s07-z"><div class="tab">Descargo</div><div class="tit">Rubén se defiende</div></div>`,
    js: `
      const DOMINGO = 0.18, DURMIENDO = 1.39;
      tl.fromTo(q(".s07-esc"), { scale: 1.12, transformOrigin: "50% 55%" }, { scale: 1, duration: 0.4, ease: "power3.out" }, 0);
      golpe(".s07-dom", DOMINGO + 0.1, 2);
      sacudon(DOMINGO + 0.12, 1);
      zocalos([[".s07-z", 0.05]]);
      hablar(".s07r-boca", 0, 2.1);
      tl.to(q(".s07-rub"), { rotation: -5, svgOrigin: "0 300", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      // el celular vibra en la mesa de luz
      tl.fromTo(q(".s07-cel"), { x: -3 }, { x: 3, duration: 0.05, yoyo: true, repeat: 23, ease: "none" }, 0.2);
      tl.fromTo(q(".s07-vib"), { opacity: 1 }, { opacity: 0.1, duration: 0.15, yoyo: true, repeat: 9, ease: "steps(1)" }, 0.2);
      // "durmiendo": Z z z
      ["s07-z1", "s07-z2", "s07-z3"].forEach((z, i) => {
        gsap.set(q("." + z), { opacity: 0 });
        tl.fromTo(q("." + z), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, DURMIENDO + i * 0.15);
        tl.to(q("." + z), { y: -26, duration: 1, ease: "sine.inOut" }, DURMIENDO + 0.25 + i * 0.15);
      });`,
    sfx: [
      { t: 0.15, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 0.2, sfx: "notification", vol: 0.25 },
      { t: 1.35, sfx: "sparkle", vol: 0.2, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s08
  {
    id: "s08-sobre",
    css: ``,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s08-cono" d="M640 520 L380 1340 H900 Z" fill="${am}" opacity="0.1" />
          <g transform="translate(220 1060) scale(0.8)"><g class="s08-nor">${norma("s08n")}</g></g>
          <g transform="translate(640 820)"><g class="s08-sob">${sobre("s08s")}</g></g>
          <g class="s08-adn" fill="none" stroke-width="9" stroke-linecap="round">
            <path class="s08-h1" d="M470 1060 C520 1000 570 1000 620 1060 S720 1120 770 1060 S870 1000 920 1060" stroke="${am}" />
            <path class="s08-h2" d="M470 1060 C520 1120 570 1120 620 1060 S720 1000 770 1060 S870 1120 920 1060" stroke="${rojo}" />
            <path class="s08-pel" d="M520 1026 V1094 M570 1018 V1102 M670 1026 V1094 M720 1018 V1102 M820 1026 V1094 M870 1018 V1102" stroke="${crema}" stroke-width="5" />
          </g>
        </svg>
        <div class="zoc s08-z"><div class="tab">Atención</div><div class="tit">El resultado del ADN</div></div>`,
    js: `
      const RESULTADO = 0.93, ADN = 2.13;
      tl.fromTo(q(".s08-nor"), { x: -260 }, { x: 0, duration: 0.35, ease: "power3.out" }, 0);
      hablar(".s08n-boca", 0, 2.6);
      tl.fromTo(q(".s08-sob"), { y: -500, rotation: -40 }, { y: 0, rotation: -4, duration: 0.5, ease: "back.out(1.4)" }, 0);
      zocalos([[".s08-z", RESULTADO - 0.1]]);
      // el sobre late, con suspenso
      tl.to(q(".s08-sob"), { scale: 1.08, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, RESULTADO);
      tl.fromTo(q(".s08-cono"), { opacity: 0.05 }, { opacity: 0.16, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.3);
      // "ADN": la doble hélice se dibuja
      dibujar([q(".s08-h1"), q(".s08-h2")], ADN - 0.1, 0.6);
      dibujar(".s08-pel", ADN + 0.3, 0.3);
      tl.to(q(".s08-adn"), { x: -30, duration: 0.8, yoyo: true, repeat: 1, ease: "sine.inOut" }, ADN + 0.5);
      tl.to(q(".s08-sob"), { rotation: 4, duration: 0.08, yoyo: true, repeat: 7, ease: "none" }, 2.75);`,
    sfx: [
      { t: 0.05, sfx: "whoosh", vol: 0.3 },
      { t: 0.85, sfx: "riser", vol: 0.25, max: 2.4 },
      { t: 2.05, sfx: "sparkle", vol: 0.25, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s09
  {
    id: "s09-no-es-el-padre",
    css: `
    [data-composition-id="s09-no-es-el-padre"] .s09-no { position: absolute; left: 0; right: 0; top: 960px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 190px; line-height: 1; color: ${rojo}; }
    [data-composition-id="s09-no-es-el-padre"] .s09-padre { position: absolute; left: 0; right: 250px; top: 1170px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 66px; line-height: 1; color: ${rojo}; text-transform: uppercase; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-hoja">
            <rect x="170" y="600" width="740" height="700" rx="12" fill="${crema}" stroke="${noche}" stroke-width="6" />
            <rect x="170" y="600" width="740" height="90" rx="12" fill="${rey}" />
            <text x="540" y="660" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="34" fill="${crema}" letter-spacing="6">PRUEBA DE ADN</text>
            <text x="220" y="752" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${noche}">CLIENTA ...... ROMINA</text>
            <text x="220" y="806" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${noche}">SUPUESTO PADRE RUBÉN</text>
            <path d="M220 842 H860" stroke="${noche}" stroke-width="4" stroke-dasharray="10 10" />
            <text x="540" y="910" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${noche}" letter-spacing="4">RESULTADO:</text>
          </g>
          <g class="s09-pip">
            <rect x="800" y="1110" width="240" height="230" rx="16" fill="${rojo}" stroke="${crema}" stroke-width="6" />
            <clipPath id="s09-clip"><rect x="800" y="1110" width="240" height="230" rx="16" /></clipPath>
            <g clip-path="url(#s09-clip)"><g transform="translate(920 1210) scale(0.72)">${ruben("s09r")}</g></g>
          </g>
        </svg>
        <div class="s09-no">NO</div>
        <div class="s09-padre">es el padre</div>
        <div class="zoc s09-z"><div class="tab">Último momento</div><div class="tit">No es el padre</div></div>`,
    js: `
      const USTED = 1.1, NO = 2.19, PADRE = 3.84;
      // la hoja sale del sobre
      tl.fromTo(q(".s09-hoja"), { y: 500, scale: 0.7, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".s09-hoja"), { scale: 1.03, transformOrigin: "50% 50%", duration: 1.0, ease: "sine.inOut" }, 0.6);
      golpe(".s09-no", NO + 0.05, 3);
      sacudon(NO + 0.08, 1.6);
      golpe(".s09-padre", PADRE + 0.05, 2.2);
      sacudon(PADRE + 0.08, 1.8);
      zocalos([[".s09-z", PADRE]]);
      // Rubén, en el recuadro, no lo puede creer
      gsap.set(q(".s09-pip"), { opacity: 0 });
      tl.fromTo(q(".s09-pip"), { opacity: 0, x: 360 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, PADRE + 0.35);
      tl.fromTo(q(".s09r-boca"), { scaleY: 0.5, transformOrigin: "50% 0%" }, { scaleY: 2.4, duration: 0.2, ease: "back.out(2)", immediateRender: false }, PADRE + 0.5);
      tl.to(q(".s09r-cejas"), { y: -12, duration: 0.15 }, PADRE + 0.5);
      tl.to(q(".s09-esc"), { scale: 1.04, transformOrigin: "50% 50%", duration: 1.2, ease: "power1.out" }, PADRE);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.3 },
      { t: 1.0, sfx: "riser", vol: 0.25, max: 1.2 },
      { t: 2.15, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
      { t: 3.8, sfx: "impact-bass-1", vol: 0.45, max: 0.7 },
      { t: 3.85, sfx: "glitch-1", vol: 0.3, max: 0.4 },
    ],
  },
  // ---------------------------------------------------------------- s10
  {
    id: "s10-sillas",
    css: ``,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(330 900) scale(0.95)"><g class="s10-gua">${guardia("s10g")}</g></g>
          <g transform="translate(810 1020) scale(0.75)"><g class="s10-enf">${enfrente("s10e")}</g></g>
          <g transform="translate(0 0)"><g class="s10-s1">${silla("s10-c1", rojo)}</g></g>
          <g transform="translate(0 0)"><g class="s10-s2">${silla("s10-c2", am)}</g></g>
          <g transform="translate(0 0)"><g class="s10-s3">${silla("s10-c3", rey)}</g></g>
          <g class="s10-golpes" fill="${am}">
            <path d="M560 660 l18 40 l40 -14 l-24 34 l36 22 l-42 6 l4 42 l-28 -32 l-28 32 l4 -42 l-42 -6 l36 -22 l-24 -34 l40 14 Z" />
          </g>
        </svg>
        <div class="zoc s10-z"><div class="tab">En vivo</div><div class="tit">¡Se armó en el estudio!</div></div>`,
    js: `
      tl.fromTo(q(".s10-gua"), { x: -500 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s10-gua"), { x: 14, duration: 0.08, yoyo: true, repeat: 9, ease: "none" }, 0.4);
      tl.fromTo(q(".s10-enf"), { x: 300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0.05);
      hablar(".s10e-boca", 0, 1.9);
      tl.to(q(".s10e-lentes"), { y: 22, duration: 0.2 }, 0.5);
      zocalos([[".s10-z", 0.1]]);
      // las sillas vuelan por el estudio
      tl.fromTo(q(".s10-s1"), { x: -150, y: 1300, rotation: 0 }, { x: 1250, y: 620, rotation: 540, duration: 1.4, ease: "none" }, 0.05);
      tl.fromTo(q(".s10-s2"), { x: 1250, y: 1250, rotation: 0 }, { x: -200, y: 760, rotation: -420, duration: 1.5, ease: "none" }, 0.6);
      tl.fromTo(q(".s10-s3"), { x: 300, y: 1500, rotation: 0 }, { x: 900, y: 560, rotation: 300, duration: 1.2, ease: "power1.out" }, 1.2);
      pop(".s10-golpes", 0.2, 0.2, 0.3);
      tl.to(q(".s10-golpes"), { rotation: 30, scale: 1.2, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 7 }, 0.4);
      [0.25, 0.9, 1.6].forEach((t) => sacudon(t, 1.2));`,
    sfx: [
      { t: 0.05, sfx: "whoosh", vol: 0.32 },
      { t: 0.25, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 0.65, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.9, sfx: "glitch-1", vol: 0.2, max: 0.3 },
      { t: 1.25, sfx: "whoosh", vol: 0.28 },
      { t: 1.6, sfx: "impact-bass-2", vol: 0.3, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s11
  {
    id: "s11-mostrador",
    css: `
    [data-composition-id="s11-mostrador"] .s11-solo { top: 572px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; letter-spacing: 0.3em; color: ${am}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(0 40)"><g class="s11-estantes" stroke="${crema}" stroke-width="5" fill="none" stroke-linecap="round">
            <path d="M120 700 H960 M120 830 H960" opacity="0.6" />
            <rect x="160" y="640" width="70" height="60" fill="${rojo}" /><rect x="250" y="650" width="60" height="50" fill="${am}" /><rect x="700" y="645" width="80" height="55" fill="${am}" /><rect x="800" y="655" width="60" height="45" fill="${rojo}" />
            <path d="M380 770 l50 0 M405 770 v56 M560 760 l30 30 l-30 30 M640 770 v56 M628 770 h24" />
            <rect x="860" y="770" width="70" height="60" fill="${rey}" />
          </g></g>
          <g transform="translate(560 960) scale(0.9)"><g class="s11-rub">${ruben("s11r")}</g></g>
          <g class="s11-mostrador">
            <rect x="80" y="1130" width="920" height="230" rx="10" fill="${rojo}" stroke="${crema}" stroke-width="6" />
            <path d="M80 1180 H1000" stroke="${crema}" stroke-width="4" opacity="0.5" />
            <text x="540" y="1290" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="64" fill="${crema}" letter-spacing="6">FERRETERÍA</text>
          </g>
          <g class="s11-cola" fill="${noche}" stroke="${crema}" stroke-width="4">
            <g class="s11-c"><circle cx="110" cy="1000" r="44" /><path d="M40 1130 Q110 1040 180 1130 Z" /></g>
            <g class="s11-c"><circle cx="230" cy="1030" r="40" /><path d="M164 1130 Q230 1060 296 1130 Z" /></g>
          </g>
          <g class="s11-cel">
            <rect x="840" y="1040" width="80" height="80" rx="12" fill="${crema}" stroke="${noche}" stroke-width="4" />
            <circle class="s11-badge" cx="918" cy="1042" r="20" fill="${rojo}" stroke="${crema}" stroke-width="3" />
          </g>
          <g class="s11-gotas" fill="${crema}"><path d="M470 860 c-8 14 -8 24 0 26 c8 -2 8 -12 0 -26 Z" /><path d="M650 850 c-8 14 -8 24 0 26 c8 -2 8 -12 0 -26 Z" /></g>
        </svg>
        <div class="txt s11-solo">Solo · todo el día</div>
        <div class="zoc s11-z"><div class="tab">Norma</div><div class="tit">«No es mal padre»</div></div>`,
    js: `
      const MAL = 0.61, SOLO = 1.59;
      tl.fromTo(q(".s11-esc"), { scale: 1.15, transformOrigin: "50% 60%" }, { scale: 1, duration: 0.6, ease: "power2.out" }, 0);
      zocalos([[".s11-z", MAL - 0.2]]);
      pop(".s11-solo", SOLO - 0.1, 0.3);
      // Rubén atiende y mira el celular, a la vez
      tl.to(q(".s11-rub"), { rotation: -6, svgOrigin: "0 300", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s11-cel"), { x: -3 }, { x: 3, duration: 0.05, yoyo: true, repeat: 25, ease: "none" }, 0.3);
      tl.fromTo(q(".s11-badge"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 5 }, 0.3);
      tl.fromTo(qa(".s11-c"), { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 9, stagger: 0.12, ease: "sine.inOut" }, 0);
      tl.fromTo(qa(".s11-gotas path"), { y: 0, opacity: 0 }, { y: 50, opacity: 1, duration: 0.6, repeat: 3, stagger: 0.2, ease: "power1.in" }, 0.3);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.25 },
      { t: 0.35, sfx: "notification", vol: 0.25 },
      { t: 1.5, sfx: "pop", vol: 0.25 },
      { t: 1.9, sfx: "notification", vol: 0.2 },
    ],
  },
  // ---------------------------------------------------------------- s12
  {
    id: "s12-contesta",
    css: `
    [data-composition-id="s12-contesta"] .s12-a { top: 610px; font-weight: 900; font-size: 92px; color: ${crema}; }
    [data-composition-id="s12-contesta"] .s12-b { top: 720px; font-weight: 800; font-size: 60px; color: ${crema}; }
    [data-composition-id="s12-contesta"] .s12-c { top: 795px; font-weight: 800; font-size: 60px; color: ${crema}; }
    [data-composition-id="s12-contesta"] .s12-d { top: 960px; font-weight: 900; font-size: 96px; color: ${am}; }
    [data-composition-id="s12-contesta"] .s12-e { top: 1075px; font-weight: 900; font-size: 110px; color: ${am}; text-shadow: 8px 8px 0 ${rojo}; }`,
    html: `
        <div class="txt s12-a">Un cliente</div>
        <div class="txt s12-b">no es del que</div>
        <div class="txt s12-c">lo conoció primero</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s12-tacha" d="M180 790 L900 745" stroke="${rojo}" stroke-width="14" stroke-linecap="round" fill="none" />
          <path class="s12-sub" d="M150 1220 Q540 1250 930 1214" stroke="${crema}" stroke-width="8" stroke-linecap="round" fill="none" />
          <g class="s12-chk"><circle cx="540" cy="1300" r="42" fill="${am}" stroke="${crema}" stroke-width="5" /><path d="M518 1300 l14 14 l26 -28" stroke="${noche}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" /></g>
        </svg>
        <div class="txt s12-d">Es del que</div>
        <div class="txt s12-e">le contesta</div>
        <div class="zoc s12-z"><div class="tab">Norma</div><div class="tit">La moraleja de hoy</div></div>`,
    js: `
      const NO = 0.92, PRIMERO = 1.97, ES = 2.53, CONTESTA = 2.9;
      tl.fromTo(q(".s12-a"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s12-b", NO - 0.05, 0.3);
      pop(".s12-c", 1.6, 0.3);
      zocalos([[".s12-z", 0.2]]);
      dibujar(".s12-tacha", PRIMERO + 0.2, 0.3);
      tl.to([q(".s12-a"), q(".s12-b"), q(".s12-c")], { opacity: 0.4, duration: 0.3 }, ES);
      golpe(".s12-d", ES + 0.05, 1.8);
      golpe(".s12-e", CONTESTA + 0.05, 2.2);
      sacudon(CONTESTA + 0.08, 1.2);
      dibujar(".s12-sub", CONTESTA + 0.25, 0.4);
      pop(".s12-chk", CONTESTA + 0.5, 0.3, 0.4);
      tl.to(q(".s12-e"), { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, CONTESTA + 0.4);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.28 },
      { t: 2.1, sfx: "glitch-1", vol: 0.2, max: 0.3 },
      { t: 2.5, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 2.9, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 3.4, sfx: "ping", vol: 0.3 },
    ],
  },
];
