// Escenas s01 a s06: la presentación del caso y el relato de Romina.
import { C, norma, ruben, enfrente, romina, sillonAtras, sillonDelante } from "./lib.mjs";
const { noche, rey, am, rojo, crema } = C;

// globo de chat dentro de un celular (x, y = esquina superior izquierda)
const globo = (cls, x, y, w, texto, { mio = false, hora = "", tildes = false, color } = {}) => {
  const fill = color || (mio ? am : crema);
  const lineas = texto.split("|");
  const h = 30 + lineas.length * 42 + (hora ? 30 : 0);
  return `<g class="${cls}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${noche}" stroke-width="4" />
    ${lineas.map((l, i) => `<text x="${x + 24}" y="${y + 50 + i * 42}" font-family="Lexend" font-weight="600" font-size="32" fill="${noche}">${l}</text>`).join("")}
    ${hora ? `<text x="${x + w - (tildes ? 70 : 24)}" y="${y + h - 16}" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${noche}" opacity="0.7" data-layout-ignore>${hora}</text>` : ""}
    ${tildes ? `<path class="${cls}-t" d="M${x + w - 60} ${y + h - 26} l8 8 l14 -16 M${x + w - 44} ${y + h - 18} l14 -16" stroke="${noche}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />` : ""}
  </g>`;
};
export const celular = (p, titulo, colorTitulo = crema) => `
  <rect x="290" y="560" width="500" height="790" rx="56" fill="${noche}" stroke="${crema}" stroke-width="6" />
  <rect x="310" y="580" width="460" height="750" rx="40" fill="${C.rey2}" />
  <rect x="490" y="592" width="100" height="18" rx="9" fill="${noche}" />
  <path d="M310 700 H770" stroke="${crema}" stroke-width="3" opacity="0.3" />
  <circle cx="368" cy="660" r="28" fill="${colorTitulo}" stroke="${crema}" stroke-width="3" />
  <text x="412" y="672" font-family="Lexend" font-weight="700" font-size="32" fill="${crema}">${titulo}</text>`;
export { globo };

export default [
  // ---------------------------------------------------------------- s01
  {
    id: "s01-desgraciado",
    css: `
    [data-composition-id="s01-desgraciado"] .s01-l1 { top: 590px; font-weight: 900; font-size: 92px; color: ${crema}; }
    [data-composition-id="s01-desgraciado"] .s01-l2 { top: 690px; font-weight: 900; font-size: 104px; color: ${am}; text-shadow: 7px 7px 0 ${rojo}; }
    [data-composition-id="s01-desgraciado"] .s01-preg { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: ${am}; text-shadow: 5px 5px 0 ${rojo}; line-height: 1; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s01-cono" d="M330 520 L120 1400 H560 Z" fill="${am}" opacity="0.08" />
          <path class="s01-cono2" d="M750 520 L520 1400 H960 Z" fill="${am}" opacity="0.08" />
          <g transform="translate(540 1000) scale(1.3)"><g class="s01-norma">${norma("s01n")}</g></g>
        </svg>
        <div class="txt s01-l1">¡Que pase</div>
        <div class="txt s01-l2">el desgraciado!</div>
        <div class="s01-preg s01-p1" style="left:150px;top:870px;font-size:150px">?</div>
        <div class="s01-preg s01-p2" style="left:850px;top:830px;font-size:120px">?</div>
        <div class="s01-preg s01-p3" style="left:880px;top:1060px;font-size:90px">?</div>
        <div class="zoc s01-z1"><div class="tab">Hoy</div><div class="tit">¿De quién es esta clienta?</div></div>`,
    js: `
      const DESGRACIADO = 0.65, HOY = 1.86, CLIENTA = 3.55;
      tl.fromTo(q(".s01-norma"), { scale: 0.9, y: 30, transformOrigin: "50% 100%" }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s01-l1"), { opacity: 0.4, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      golpe(".s01-l2", DESGRACIADO, 1.8);
      sacudon(DESGRACIADO + 0.05, 1.3);
      hablar(".s01n-boca", 0, 1.1);
      hablar(".s01n-boca", HOY, 3.95);
      tl.to(q(".s01n-mic"), { rotation: -14, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.3);
      // los conos de luz barren
      tl.fromTo(q(".s01-cono"), { rotation: -10, svgOrigin: "330 520" }, { rotation: 8, svgOrigin: "330 520", duration: 2.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s01-cono2"), { rotation: 10, svgOrigin: "750 520" }, { rotation: -8, svgOrigin: "750 520", duration: 2.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
      // "hoy sabremos": el grito se achica, entra el zócalo
      tl.to([q(".s01-l1"), q(".s01-l2")], { scale: 0.8, y: -20, opacity: 0.55, duration: 0.3, ease: "power2.out" }, HOY);
      zocalos([[".s01-z1", HOY]]);
      // "clienta": signos de pregunta
      pop(".s01-p1", CLIENTA - 0.05, 0.3, 0.3); pop(".s01-p2", CLIENTA + 0.1, 0.3, 0.3); pop(".s01-p3", CLIENTA + 0.25, 0.3, 0.3);
      tl.to(qa(".s01-preg"), { y: -14, rotation: 8, duration: 0.5, yoyo: true, repeat: 2, ease: "sine.inOut" }, CLIENTA + 0.35);
      tl.to(q(".s01-norma"), { rotation: -3, svgOrigin: "0 300", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, HOY);`,
    sfx: [
      { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
      { t: 0.6, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.8, sfx: "whoosh", vol: 0.3 },
      { t: 3.5, sfx: "pop", vol: 0.3 },
      { t: 3.7, sfx: "pop", vol: 0.25 },
    ],
  },
  // ---------------------------------------------------------------- s02
  {
    id: "s02-ruben",
    css: `
    [data-composition-id="s02-ruben"] .s02-mia { left: 560px; right: auto; width: 480px; top: 610px; }
    [data-composition-id="s02-ruben"] .s02-mia b { font-size: 76px; transform: rotate(5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(560 930) scale(1.1)"><g class="s02-todo">
            ${sillonAtras(rojo)}
            <g class="s02-rub">${ruben("s02r")}</g>
            ${sillonDelante(rojo)}
          </g></g>
          <g transform="translate(200 720) rotate(-7)"><g class="s02-foto">
            <rect x="-130" y="-120" width="260" height="290" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <rect x="-110" y="-100" width="220" height="190" fill="${rey}" />
            <circle cx="-30" cy="-30" r="34" fill="${crema}" stroke="${noche}" stroke-width="4" />
            <path d="M-64 -40 C-70 -80 6 -84 4 -40 C-10 -60 -50 -60 -64 -40 Z" fill="${noche}" />
            <path d="M4 -50 C30 -40 34 -10 24 6" stroke="${noche}" stroke-width="10" fill="none" stroke-linecap="round" />
            <path d="M-70 90 Q-30 10 10 90 Z" fill="${rojo}" stroke="${crema}" stroke-width="4" />
            <path d="M44 -20 V40 M32 -20 H56" stroke="${am}" stroke-width="9" stroke-linecap="round" />
            <path d="M40 0 l8 0 M40 14 l8 0 M40 28 l8 0" stroke="${noche}" stroke-width="3" />
            <text x="0" y="140" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${noche}">SU 1er TORNILLO</text>
          </g></g>
        </svg>
        <div class="txt sello s02-mia"><b>¡Es mía!</b></div>
        <div class="zoc s02-z1"><div class="tab">Invitado</div><div class="tit">Rubén · ferretero</div></div>
        <div class="zoc s02-z2"><div class="tab">Rubén</div><div class="tit">«¡La crié yo!»</div></div>`,
    js: `
      const RUBEN = 0.99, ROMINA = 3.38, DIEZ = 5.33, CRIE = 6.53;
      tl.fromTo(q(".s02-todo"), { x: -700 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0);
      zocalos([[".s02-z1", RUBEN - 0.1], [".s02-z2", CRIE - 0.1]]);
      // Rubén se acomoda, orgulloso
      tl.to(q(".s02-rub"), { y: -10, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, RUBEN);
      hablar(".s02r-boca", ROMINA, 7.1);
      golpe(".s02-mia", ROMINA + 0.45);
      sacudon(ROMINA + 0.5, 0.8);
      tl.to(q(".s02-rub"), { rotation: -4, svgOrigin: "0 300", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, ROMINA);
      // "diez años": la foto de cuando era chica
      gsap.set(q(".s02-foto"), { opacity: 0 });
      tl.fromTo(q(".s02-foto"), { opacity: 0, y: -200, rotation: -30 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.5)", immediateRender: false }, DIEZ - 0.15);
      tl.to(q(".s02-mia"), { opacity: 0, duration: 0.2 }, CRIE - 0.2);
      // "la crié yo": lágrimas
      tl.to(q(".s02r-lagrimas"), { opacity: 1, duration: 0.15 }, CRIE);
      tl.fromTo(q(".s02r-lagrimas"), { y: 0 }, { y: 30, duration: 0.5, repeat: 2, ease: "power1.in" }, CRIE);
      tl.to(q(".s02r-cejas"), { rotation: 0, y: -6, duration: 0.2 }, CRIE);
      sacudon(CRIE + 0.1, 0.6);
      tl.to(q(".s02-todo"), { scale: 1.06, transformOrigin: "50% 30%", duration: 1.2, ease: "power1.out" }, CRIE);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.3 },
      { t: 0.9, sfx: "click", vol: 0.3 },
      { t: 3.75, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 5.2, sfx: "pop", vol: 0.3 },
      { t: 6.45, sfx: "click-soft", vol: 0.3 },
      { t: 7.4, sfx: "glitch-1", vol: 0.15, max: 0.3 },
    ],
  },
  // ---------------------------------------------------------------- s03
  {
    id: "s03-enfrente",
    css: `
    [data-composition-id="s03-enfrente"] .s03-mia { top: 620px; }
    [data-composition-id="s03-enfrente"] .s03-mia b { font-size: 70px; color: ${am}; border-color: ${am}; transform: rotate(-4deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(600 940) scale(1.1)"><g class="s03-todo">
            ${sillonAtras(rey)}
            <g class="s03-enf">${enfrente("s03e")}</g>
            ${sillonDelante(rey)}
          </g></g>
          <g class="s03-brillos" fill="${am}">
            <path d="M880 760 l10 30 l30 10 l-30 10 l-10 30 l-10 -30 l-30 -10 l30 -10 Z" />
            <path d="M330 820 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 l22 -8 Z" />
            <path d="M900 1020 l7 18 l18 7 l-18 7 l-7 18 l-7 -18 l-18 -7 l18 -7 Z" />
          </g>
          <!-- Rubén en el recuadro, echando humo -->
          <g class="s03-pip">
            <clipPath id="s03-clip"><rect x="60" y="1070" width="300" height="270" rx="16" /></clipPath>
            <rect x="60" y="1070" width="300" height="270" rx="16" fill="${rojo}" />
            <g clip-path="url(#s03-clip)"><g transform="translate(210 1190) scale(0.85)">${ruben("s03r")}</g></g>
            <rect x="60" y="1070" width="300" height="270" rx="16" fill="none" stroke="${crema}" stroke-width="6" />
            <g class="s03-humo" stroke="${crema}" stroke-width="7" fill="none" stroke-linecap="round">
              <path d="M130 1060 q-14 -20 0 -40 t0 -40" /><path d="M290 1060 q14 -20 0 -40 t0 -40" />
            </g>
          </g>
        </svg>
        <div class="txt sello s03-mia"><b>¡Ahora es mía!</b></div>
        <div class="zoc s03-z1"><div class="tab">Invitado</div><div class="tit">El de enfrente</div></div>
        <div class="zoc s03-z2"><div class="tab">El de enfrente</div><div class="tit">«Compra conmigo»</div></div>`,
    js: `
      const OTRO = 0.37, ENFRENTE = 2.07, PERDONAME = 3.56, RUBEN = 4.02, COMPRA = 5.32;
      // la cámara se va al otro lado
      tl.fromTo(q(".s03-todo"), { x: 800 }, { x: 0, duration: 0.5, ease: "power3.out" }, OTRO);
      tl.fromTo(q(".s03-enf"), { y: 0 }, { y: -8, duration: 0.6, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.9);
      zocalos([[".s03-z1", ENFRENTE - 0.1], [".s03-z2", COMPRA - 0.15]]);
      pop(".s03-brillos path", ENFRENTE, 0.3, 0.2);
      tl.to(qa(".s03-brillos path"), { rotation: 90, transformOrigin: "50% 50%", duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, ENFRENTE + 0.3);
      // "perdoname": se baja los lentes y guiña
      tl.to(q(".s03e-lentes"), { y: 26, duration: 0.25, ease: "power2.out" }, PERDONAME);
      hablar(".s03e-boca", PERDONAME, 5.95);
      // "Rubén": el recuadro con Rubén furioso
      gsap.set(q(".s03-pip"), { opacity: 0 });
      tl.fromTo(q(".s03-pip"), { opacity: 0, x: -360 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, RUBEN - 0.1);
      dibujar(".s03-humo path", RUBEN + 0.3, 0.4);
      tl.to(qa(".s03-humo path"), { y: -20, opacity: 0.3, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, RUBEN + 0.7);
      tl.to(q(".s03r-cejas"), { rotation: 0, y: 6, duration: 0.15 }, RUBEN);
      // "compra conmigo"
      golpe(".s03-mia", COMPRA, 1.8);
      sacudon(COMPRA + 0.05, 0.7);
`,
    sfx: [
      { t: 0.35, sfx: "whoosh", vol: 0.32 },
      { t: 2.0, sfx: "sparkle", vol: 0.3, max: 0.7 },
      { t: 3.55, sfx: "click-soft", vol: 0.3 },
      { t: 3.95, sfx: "pop", vol: 0.3 },
      { t: 5.25, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s04
  {
    id: "s04-clienta",
    css: `
    [data-composition-id="s04-clienta"] .s04-dom { position: absolute; left: 372px; top: 626px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.1em; color: ${noche}; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- la entrada del estudio: telón -->
          <g class="s04-telon">
            <rect x="820" y="760" width="260" height="620" fill="${rojo}" stroke="${crema}" stroke-width="5" />
            <path d="M870 760 V1380 M930 760 V1380 M990 760 V1380 M1050 760 V1380" stroke="${noche}" stroke-width="4" opacity="0.35" />
          </g>
          <g transform="translate(240 1010) scale(0.85)"><g class="s04-nor">${norma("s04n")}</g></g>
          <g transform="translate(700 990)"><g class="s04-rom">${romina("s04r")}
            <g class="s04-cel"><rect x="-150" y="120" width="56" height="96" rx="12" fill="${noche}" stroke="${crema}" stroke-width="4" /><circle cx="-122" cy="230" r="20" fill="${crema}" stroke="${noche}" stroke-width="4" /></g>
          </g></g>
          <!-- lo que cuenta: nube de pensamiento -->
          <g class="s04-nube">
            <circle cx="560" cy="864" r="12" fill="${crema}" /><circle cx="590" cy="830" r="18" fill="${crema}" />
            <rect x="330" y="590" width="440" height="220" rx="80" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <circle cx="420" cy="740" r="38" fill="${am}" /><circle cx="438" cy="728" r="34" fill="${crema}" />
            <g class="s04-mecha"><path d="M560 720 H700" stroke="${noche}" stroke-width="18" stroke-linecap="round" /><path d="M590 712 l16 16 M620 712 l16 16 M650 712 l16 16 M680 712 l16 16" stroke="${crema}" stroke-width="5" /><path d="M700 720 l26 0" stroke="${noche}" stroke-width="8" stroke-linecap="round" /></g>
          </g>
        </svg>
        <div class="s04-dom">DOMINGO · 22:40</div>
        <div class="zoc s04-z1"><div class="tab">La clienta</div><div class="tit">Romina, en disputa</div></div>`,
    js: `
      const CLIENTA = 0.55, DOMINGO = 2.0, NOCHE = 2.54, MECHA = 4.14;
      tl.fromTo(q(".s04-nor"), { x: -300 }, { x: 0, duration: 0.35, ease: "power3.out" }, 0);
      hablar(".s04n-boca", 0, 0.9);
      tl.to(q(".s04n-mic"), { x: 30, rotation: 20, transformOrigin: "50% 100%", duration: 0.3, ease: "power2.out" }, 0.2);
      // Romina entra por el telón, caminando
      tl.fromTo(q(".s04-rom"), { x: 420 }, { x: 0, duration: 0.7, ease: "power2.out" }, 0.25);
      tl.fromTo(q(".s04-rom"), { y: 0 }, { y: -14, duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.25);
      tl.to(q(".s04-telon"), { scaleX: 0.7, transformOrigin: "100% 50%", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.2);
      zocalos([[".s04-z1", CLIENTA]]);
      hablar(".s04r-boca", 1.82, 4.6);
      // "domingo a la noche": la nube con la luna
      pop(".s04-nube", DOMINGO - 0.1, 0.35, 0.6);
      pop(".s04-dom", DOMINGO + 0.1, 0.3);
      tl.to(q(".s04-nube"), { y: -10, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, DOMINGO + 0.4);
      // "mecha"
      pop(".s04-mecha", MECHA - 0.1, 0.3, 0.3);
      tl.to(q(".s04-mecha"), { rotation: 360, svgOrigin: "640 720", duration: 0.5, ease: "power2.in" }, MECHA + 0.15);`,
    sfx: [
      { t: 0.3, sfx: "whoosh", vol: 0.3 },
      { t: 0.5, sfx: "click", vol: 0.28 },
      { t: 1.95, sfx: "pop", vol: 0.28 },
      { t: 4.05, sfx: "pop", vol: 0.3 },
      { t: 4.3, sfx: "whoosh-short", vol: 0.22 },
    ],
  },
  // ---------------------------------------------------------------- s05
  {
    id: "s05-visto",
    css: `
    [data-composition-id="s05-visto"] .s05-s1 { top: 1010px; }
    [data-composition-id="s05-visto"] .s05-s1 b { font-size: 96px; transform: rotate(-8deg); }
    [data-composition-id="s05-visto"] .s05-s2 { top: 1190px; }
    [data-composition-id="s05-visto"] .s05-s2 b { font-size: 70px; transform: rotate(6deg); }
    [data-composition-id="s05-visto"] .s05-vis { position: absolute; left: 520px; top: 905px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: ${crema}; opacity: 0.8; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-cel">${celular("s05", "Ferretería Rubén", rojo)}
            ${globo("s05-g1", 400, 740, 350, "Hola, ¿tenés|mecha de 8?", { mio: true, hora: "22:40", tildes: true })}
          </g>
        </svg>
        <div class="s05-vis">Visto 22:40</div>
        <div class="txt sello s05-s1"><b>En visto</b></div>
        <div class="txt sello s05-s2"><b>¡En visto!</b></div>
        <div class="zoc s05-z1"><div class="tab">Domingo</div><div class="tit">Rubén la dejó en visto</div></div>`,
    js: `
      const VISTO = 0.43, VISTO2 = 1.23;
      tl.fromTo(q(".s05-cel"), { y: 80, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s05-g1", 0.05, 0.3, 0.7);
      pop(".s05-vis", VISTO, 0.2);
      tl.to(q(".s05-g1-t"), { stroke: "${rojo}", duration: 0.05 }, VISTO);
      golpe(".s05-s1", VISTO + 0.05);
      sacudon(VISTO + 0.08, 1.1);
      zocalos([[".s05-z1", VISTO]]);
      golpe(".s05-s2", VISTO2 + 0.05, 2.6);
      sacudon(VISTO2 + 0.08, 1.4);
      tl.to(q(".s05-esc"), { scale: 1.05, transformOrigin: "50% 55%", duration: 1.2, ease: "power1.out" }, VISTO2);`,
    sfx: [
      { t: 0.05, sfx: "notification", vol: 0.3 },
      { t: 0.4, sfx: "glitch-1", vol: 0.3, max: 0.4 },
      { t: 0.45, sfx: "impact-bass-1", vol: 0.4, max: 0.5 },
      { t: 1.25, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s06
  {
    id: "s06-minuto",
    css: `
    [data-composition-id="s06-minuto"] .s06-res { top: 1240px; }
    [data-composition-id="s06-minuto"] .s06-res b { font-size: 52px; color: ${am}; border-color: ${am}; transform: rotate(-5deg); }
    [data-composition-id="s06-minuto"] .s06-reloj { position: absolute; left: 812px; top: 700px; width: 210px; height: 210px; border-radius: 50%; border: 7px solid ${am}; background: ${noche}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: ${am}; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; }
    [data-composition-id="s06-minuto"] .s06-reloj span { font-size: 70px; }
    [data-composition-id="s06-minuto"] .s06-reloj i { font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: ${crema}; margin-top: 8px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s06-cel">${celular("s06", "El de enfrente", am)}
            ${globo("s06-g1", 400, 730, 350, "Hola, ¿tenés|mecha de 8?", { mio: true, hora: "22:40", tildes: true })}
            <g class="s06-tipeo"><rect x="330" y="900" width="130" height="60" rx="26" fill="${crema}" stroke="${noche}" stroke-width="4" />
              <circle class="s06-d" cx="365" cy="930" r="9" fill="${noche}" /><circle class="s06-d" cx="395" cy="930" r="9" fill="${noche}" /><circle class="s06-d" cx="425" cy="930" r="9" fill="${noche}" /></g>
            ${globo("s06-g2", 330, 900, 380, "¡Sí! Tengo de 8.|Sale $ 190.", { hora: "22:41" })}
            ${globo("s06-g3", 330, 1080, 400, "Te la guardo|hasta el lunes.", { hora: "22:41" })}
          </g>
        </svg>
        <div class="s06-reloj"><span>1'</span><i>minuto</i></div>
        <div class="txt sello s06-res"><b>Reservada · Romina</b></div>
        <div class="zoc s06-z1"><div class="tab">Domingo</div><div class="tit">Enfrente contestó</div></div>`,
    js: `
      const CONTESTO = 1.54, MINUTO = 1.98, PRECIO = 2.79, GUARDO = 3.77;
      tl.fromTo(q(".s06-cel"), { x: 700 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      pop(".s06-g1", 0.3, 0.3, 0.7);
      // escribiendo...
      pop(".s06-tipeo", 0.8, 0.25);
      tl.fromTo(qa(".s06-d"), { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: "sine.inOut" }, 0.9);
      fuera(".s06-tipeo", CONTESTO - 0.05, 0.1);
      pop(".s06-g2", CONTESTO, 0.35, 0.6);
      zocalos([[".s06-z1", CONTESTO]]);
      // "un minuto": el reloj
      pop(".s06-reloj", MINUTO - 0.1, 0.35, 0.4);
      tl.to(q(".s06-reloj"), { rotation: 8, duration: 0.1, yoyo: true, repeat: 5 }, MINUTO + 0.25);
      // "precio": el precio salta
      tl.to(q(".s06-g2"), { scale: 1.08, transformOrigin: "0% 50%", duration: 0.15, yoyo: true, repeat: 1 }, PRECIO);
      // "guardó"
      pop(".s06-g3", GUARDO - 0.15, 0.35, 0.6);
      golpe(".s06-res", GUARDO + 0.35, 2);
      sacudon(GUARDO + 0.4, 0.6);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.28 },
      { t: 0.3, sfx: "click-soft", vol: 0.3 },
      { t: 0.8, sfx: "typing", vol: 0.25, max: 0.7 },
      { t: 1.55, sfx: "notification", vol: 0.32 },
      { t: 1.9, sfx: "ping", vol: 0.3 },
      { t: 3.65, sfx: "notification", vol: 0.28 },
      { t: 4.1, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
];
