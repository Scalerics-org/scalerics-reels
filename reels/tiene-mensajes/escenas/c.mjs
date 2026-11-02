// Escenas s11 a s15: Graciela otra vez, el dueño, el giro, el CRM y el cierre.
import { C, contestador, postit, onda, carnet, graciela, dueno } from "./lib.mjs";
const { noche, madera, beige, crema, rojo, am, verdeo, verde } = C;

// caritas chicas de los clientes (centro 0,0, radio ~40)
const carita = (tipo) => {
  const base = `<circle r="40" fill="${crema}" stroke="${noche}" stroke-width="4" /><circle cx="-13" cy="-2" r="4.5" fill="${noche}" /><circle cx="13" cy="-2" r="4.5" fill="${noche}" /><path d="M-10 18 Q0 25 10 18" stroke="${noche}" stroke-width="4" fill="none" stroke-linecap="round" />`;
  if (tipo === "gra") return `<path d="M-46 4 C-60 -50 -20 -64 0 -58 C30 -66 62 -40 46 4 C40 -30 20 -36 0 -30 C-20 -36 -40 -30 -46 4 Z" fill="${madera}" stroke="${noche}" stroke-width="3" />${base}<rect x="-26" y="-12" width="22" height="18" rx="6" fill="none" stroke="${rojo}" stroke-width="4" /><rect x="4" y="-12" width="22" height="18" rx="6" fill="none" stroke="${rojo}" stroke-width="4" />`;
  if (tipo === "ern") return `${base}<path d="M-48 -18 C-40 -60 40 -62 48 -18 Z" fill="${noche}" stroke="${crema}" stroke-width="3" /><path d="M-22 12 Q0 4 22 12" stroke="${beige}" stroke-width="7" stroke-linecap="round" fill="none" />`;
  if (tipo === "nov") return `<path d="M-36 -30 C-70 -10 -70 40 -60 50 H60 C70 40 70 -10 36 -30 Z" fill="${crema}" opacity="0.6" />${base}<path d="M-22 -34 L-14 -50 L-4 -38 L0 -54 L4 -38 L14 -50 L22 -34 Z" fill="${am}" stroke="${noche}" stroke-width="3" />`;
  return `${base}<path d="M-42 -14 C-42 -60 42 -60 42 -14 Z" fill="${am}" stroke="${noche}" stroke-width="3" /><path d="M20 -20 Q56 -26 70 -12 Q50 -6 26 -12 Z" fill="${am}" stroke="${noche}" stroke-width="3" />`;
};

export default [
  // ---------------------------------------------------------------- s11
  {
    id: "s11-enfrente",
    css: `
    [data-composition-id="s11-enfrente"] .s11-llamo { top: 1290px; }
    [data-composition-id="s11-enfrente"] .s11-llamo b { font-size: 96px; transform: rotate(-5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(290 820) scale(0.95)"><g class="s11-car">${carnet("s11k", graciela("s11g", { brazos: true }), "Graciela")}</g></g>
          <text class="s11-tel" x="510" y="640" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${beige}" letter-spacing="4">MENSAJE 14</text>
          ${onda("s11-o", 510, 760, { n: 18, w: 500, h: 150 })}
          <g transform="translate(290 1250) rotate(-4)"><g class="s11-doc">
            <rect x="-190" y="-110" width="380" height="220" rx="8" fill="${crema}" stroke="${noche}" stroke-width="5" />
            <text x="-160" y="-60" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${noche}" letter-spacing="3">PRESUPUESTO</text>
            <text x="-160" y="-6" font-family="Caveat" font-weight="700" font-size="42" fill="${noche}">Cortinas · Graciela</text>
            <path d="M-160 44 H140 M-160 80 H80" stroke="${noche}" stroke-width="4" opacity="0.3" />
          </g></g>
          <g class="s11-local">
            <rect x="620" y="900" width="360" height="330" fill="${verdeo}" stroke="${crema}" stroke-width="5" />
            <path d="M600 900 H1000 L980 970 H620 Z" fill="${rojo}" stroke="${crema}" stroke-width="5" stroke-linejoin="round" />
            ${[0, 1, 2, 3, 4].map((i) => `<path d="M${640 + i * 80} 900 L${650 + i * 76} 970" stroke="${crema}" stroke-width="14" opacity="0.8" />`).join("")}
            <rect x="660" y="860" width="280" height="50" rx="8" fill="${am}" stroke="${noche}" stroke-width="4" />
            <text x="800" y="896" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="32" fill="${noche}" letter-spacing="2">ENFRENTE</text>
            <rect x="650" y="1000" width="170" height="150" fill="${noche}" stroke="${crema}" stroke-width="4" />
            <path d="M656 1006 C680 1040 670 1100 690 1146 L720 1146 C705 1100 712 1040 700 1006 Z M814 1006 C790 1040 800 1100 780 1146 L750 1146 C765 1100 758 1040 770 1006 Z" fill="${rojo}" />
            <rect x="850" y="1060" width="100" height="170" fill="${madera}" stroke="${crema}" stroke-width="4" />
            <circle cx="935" cy="1150" r="6" fill="${am}" />
          </g>
          <g transform="translate(760 1190)"><g class="s11-fono">
            <path d="M-60 0 C-60 -40 60 -40 60 0 L50 30 H-50 Z" fill="${beige}" stroke="${noche}" stroke-width="4" />
            <path d="M-70 -30 C-70 -60 70 -60 70 -30 L56 -20 C40 -40 -40 -40 -56 -20 Z" fill="${crema}" stroke="${noche}" stroke-width="4" />
            <g class="s11-ring"><path d="M-90 -60 Q-110 -30 -90 0 M90 -60 Q110 -30 90 0 M-112 -76 Q-140 -30 -112 16 M112 -76 Q140 -30 112 16" stroke="${am}" stroke-width="6" fill="none" stroke-linecap="round" /></g>
          </g></g>
        </svg>
        <div class="sello s11-llamo"><b>Él me llamó</b></div>`,
    js: `
      const YA = 1.79, ENFRENTE = 3.05, EL = 3.80;
      tl.fromTo(q(".s11-car"), { rotation: -8, scale: 0.85, opacity: 0.4, transformOrigin: "50% 50%" }, { rotation: -2, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0);
      pop(".s11-o", 0.05, 0.3, 0.5); pop(".s11-tel", 0.1, 0.3, 0.8);
      ondear("s11-o", 0, 4.6);
      hablar(".s11g-boca", 0, 1.5); hablar(".s11g-boca", YA, 3.5); hablar(".s11g-boca", EL, 4.4);
      pop(".s11-doc", 0.2, 0.3, 0.7);
      tl.to(q(".s11-doc"), { y: 600, rotation: 50, opacity: 0, duration: 0.7, ease: "power2.in" }, YA + 0.1);
      pop(".s11-local", ENFRENTE - 0.65, 0.4, 0.6);
      tl.fromTo(q(".s11-local"), { x: 120 }, { x: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, ENFRENTE - 0.65);
      pop(".s11-fono", EL - 0.25, 0.25, 0.5);
      gsap.set(q(".s11-ring"), { opacity: 0 });
      tl.fromTo(q(".s11-ring"), { opacity: 1, scale: 0.8, svgOrigin: "0 -30" }, { opacity: 0.2, scale: 1.15, svgOrigin: "0 -30", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, EL);
      tl.to(q(".s11-fono"), { rotation: 8, svgOrigin: "0 0", duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, EL);
      golpe(".s11-llamo", 3.98 + 0.1, 2.3);
      sacudon(4.12, 1.1);
      tl.to(q(".s11g-cejas"), { y: 6, rotation: 0, duration: 0.2 }, YA);`,
    sfx: [
      { t: 0.0, sfx: "pop", vol: 0.25 },
      { t: 1.9, sfx: "whoosh", vol: 0.25 },
      { t: 2.4, sfx: "whoosh-short", vol: 0.22 },
      { t: 3.55, sfx: "notification", vol: 0.3 },
      { t: 4.05, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s12
  {
    id: "s12-como-se-acordo",
    css: `
    [data-composition-id="s12-como-se-acordo"] .s12-t { top: 610px; font-weight: 900; font-size: 84px; color: ${am}; text-shadow: 7px 7px 0 ${noche}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1130) scale(2.1)"><g class="s12-due">${dueno("s12d", { brazo: false })}</g></g>
        </svg>
        <div class="txt s12-t">¿Cómo se acordó?</div>`,
    js: `
      tl.fromTo(q(".s12-due"), { scale: 0.85, transformOrigin: "50% 50%" }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
      tl.fromTo(q(".s12d-boca"), { scaleY: 1, scaleX: 1, transformOrigin: "50% 50%" }, { scaleY: 3.2, scaleX: 1.3, duration: 0.2, ease: "back.out(2)" }, 0.15);
      tl.fromTo(q(".s12d-ojos"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.5, duration: 0.2, ease: "back.out(2)" }, 0.6);
      tl.to(q(".s12d-cejas"), { y: -12, duration: 0.2 }, 0.6);
      tl.to(q(".s12d-gota"), { opacity: 1, duration: 0.1 }, 0.7);
      tl.fromTo(q(".s12d-gota"), { y: 0 }, { y: 50, duration: 1.0, ease: "power1.in", immediateRender: false }, 0.7);
      golpe(".s12-t", 0.76, 1.8);`,
    sfx: [
      { t: 0.1, sfx: "whoosh-short", vol: 0.22 },
      { t: 0.72, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s13
  {
    id: "s13-la-cabeza",
    css: `
    [data-composition-id="s13-la-cabeza"] .s13-no { left: 60px; right: auto; width: 560px; top: 1270px; }
    [data-composition-id="s13-la-cabeza"] .s13-no b { font-size: 82px; transform: rotate(-6deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s13-cab" d="M330 1380 L330 1210 C250 1150 225 1000 255 880 C290 720 420 610 580 620 C760 630 860 760 850 900 C848 940 870 960 900 1010 C910 1030 890 1040 870 1040 C875 1070 870 1080 860 1090 C870 1110 860 1130 840 1130 C840 1180 820 1210 760 1200 L700 1195 L700 1380" fill="${verdeo}" stroke="${crema}" stroke-width="6" stroke-linejoin="round" />
          <g class="s13-rem">
            <g transform="translate(450 820)"><g class="s13-f0">${carita("gra")}</g></g>
            <g transform="translate(640 800)"><g class="s13-f1">${carita("ern")}</g></g>
            <g transform="translate(420 1010)"><g class="s13-f2">${carita("nov")}</g></g>
            <g transform="translate(650 1000)"><g class="s13-f3">${carita("pib")}</g></g>
            ${postit("s13-p0", 540, 910, -10, "presup.", { w: 110, size: 26 })}
            ${postit("s13-p1", 330, 920, 8, "lunes", { w: 100, size: 26 })}
            ${postit("s13-p2", 750, 900, -6, "talle", { w: 100, size: 26 })}
            ${postit("s13-p3", 540, 1100, 6, "sillas", { w: 110, size: 26 })}
          </g>
          <path class="s13-cor" d="M900 700 C900 660 950 650 960 690 C970 650 1020 660 1020 700 C1020 740 960 770 960 790 C960 770 900 740 900 700 Z" fill="${rojo}" stroke="${noche}" stroke-width="5" />
          <g class="s13-camp" transform="translate(860 1290)">
            <path d="M-50 30 C-50 -10 -44 -60 0 -64 C44 -60 50 -10 50 30 L62 44 H-62 Z" fill="${am}" stroke="${noche}" stroke-width="5" stroke-linejoin="round" />
            <circle cx="0" cy="56" r="13" fill="${am}" stroke="${noche}" stroke-width="5" />
            <path class="s13-x" d="M-80 -80 L80 80" stroke="${rojo}" stroke-width="14" stroke-linecap="round" />
          </g>
        </svg>
        <div class="sello s13-no"><b>No avisa</b></div>`,
    js: `
      const IMPORTAN = 0.09, TODOS = 1.67, CABEZA = 2.10, NO = 3.16;
      tl.fromTo(q(".s13-cab"), { opacity: 0.5, scale: 0.94, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0);
      pop(".s13-cor", IMPORTAN, 0.35, 0.3);
      tl.to(q(".s13-cor"), { scale: 1.15, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, IMPORTAN + 0.35);
      [0, 1, 2, 3].forEach((i) => pop(".s13-f" + i, TODOS - 0.4 + i * 0.1, 0.3, 0.3));
      [0, 1, 2, 3].forEach((i) => pop(".s13-p" + i, CABEZA - 0.3 + i * 0.08, 0.25, 0.3));
      tl.fromTo(q(".s13-rem"), { rotation: 0 }, { rotation: 14, svgOrigin: "540 950", duration: DUR - 1.2, ease: "sine.inOut", immediateRender: false }, 1.2);
      [0, 1, 2, 3].forEach((i) => tl.to(q(".s13-f" + i), { y: i % 2 ? 10 : -10, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, TODOS + i * 0.05));
      pop(".s13-camp", NO - 0.35, 0.3, 0.5);
      dibujar(".s13-x", NO, 0.25);
      golpe(".s13-no", NO + 0.08, 2.2);
      tl.to(q(".s13-cab"), { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 3.45);`,
    sfx: [
      { t: 0.05, sfx: "chime", vol: 0.22, max: 0.7 },
      { t: 1.3, sfx: "pop", vol: 0.2 },
      { t: 1.6, sfx: "pop", vol: 0.2 },
      { t: 1.9, sfx: "pop", vol: 0.2 },
      { t: 3.15, sfx: "glitch-1", vol: 0.25, max: 0.4 },
      { t: 3.4, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s14
  {
    id: "s14-crm",
    css: `
    [data-composition-id="s14-crm"] .s14-et { position: absolute; left: 0; right: 0; top: 1420px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.34em; color: ${verde}; text-transform: uppercase; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-tab">
            <rect x="100" y="590" width="880" height="800" rx="44" fill="${noche}" stroke="${crema}" stroke-width="6" />
            <rect x="132" y="622" width="816" height="736" rx="20" fill="${verdeo}" />
            <g class="s14-head">
              <rect x="132" y="622" width="816" height="110" rx="20" fill="${noche}" opacity="0.5" />
              <g class="s14-tit"><text x="170" y="696" font-family="Lexend" font-weight="900" font-size="56" fill="${verde}">CRM</text>
              <text x="320" y="692" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${crema}" letter-spacing="3" opacity="0.8">TUS CLIENTES</text></g>
              <text x="230" y="770" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${beige}" letter-spacing="2">CLIENTE</text>
              <text x="510" y="770" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${beige}" letter-spacing="2">COMPRÓ</text>
              <text x="720" y="770" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${beige}" letter-spacing="2">PROMETISTE</text>
            </g>
            ${[["gra", "Graciela", "Cortinas", "Presupuesto"], ["ern", "Ernesto", "Consulta", "Llamar lunes"], ["nov", "La de la boda", "Sillas", "Confirmar"], ["pib", "El del talle", "Remera", "Avisar talle"]].map(([t, n, c, pr], i) => {
              const y = 850 + i * 128;
              return `<g class="s14-fila s14-r${i}">
              <rect class="s14-hl${i}" x="146" y="${y - 56}" width="788" height="112" rx="16" fill="none" stroke="${verde}" stroke-width="5" opacity="0" />
              <g transform="translate(200 ${y}) scale(0.95)">${carita(t)}</g>
              <text x="262" y="${y + 12}" font-family="Lexend" font-weight="600" font-size="32" fill="${crema}">${n}</text>
              <g class="s14-c${i}"><rect x="500" y="${y - 26}" width="180" height="52" rx="26" fill="${beige}" /><text x="590" y="${y + 9}" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="26" fill="${noche}">${c}</text></g>
              <g class="s14-p${i}"><rect x="704" y="${y - 26}" width="216" height="52" rx="26" fill="${am}" /><text x="812" y="${y + 9}" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="26" fill="${noche}">${pr}</text></g>
              <g class="s14-hoy${i}"><rect x="420" y="${y - 50}" width="74" height="36" rx="18" fill="${verde}" stroke="${noche}" stroke-width="3" /><text x="457" y="${y - 23}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${noche}">HOY</text></g>
            </g>`;
            }).join("")}
          </g>
          <g class="s14-not">
            <rect x="150" y="610" width="780" height="120" rx="24" fill="${verde}" stroke="${noche}" stroke-width="5" />
            <g transform="translate(220 670)"><g class="s14-camp">
              <path d="M-26 16 C-26 -6 -22 -32 0 -34 C22 -32 26 -6 26 16 L32 24 H-32 Z" fill="${noche}" />
              <circle cx="0" cy="32" r="8" fill="${noche}" />
            </g></g>
            <text x="276" y="660" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${noche}" letter-spacing="3">HOY</text>
            <text x="276" y="704" font-family="Lexend" font-weight="800" font-size="38" fill="${noche}">Escribile a Graciela</text>
          </g>
        </svg>
        <div class="s14-et">Tu CRM · Scalerics</div>`,
    js: `
      const SCAL = 0.26, CRM = 2.03, CLIENTE = 2.49, COMPRO = 3.86, PROMETISTE = 4.82, AVISA = 5.79, ESCRIBIRLE = 6.58;
      tl.fromTo(q(".s14-tab"), { y: 260, opacity: 0, scale: 0.9, transformOrigin: "50% 100%" }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, SCAL - 0.2);
      gsap.set(q(".s14-head"), { opacity: 0 });
      tl.fromTo(q(".s14-head"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, SCAL + 0.35);
      pop(".s14-et", CRM, 0.3, 0.8);
      [0, 1, 2, 3].forEach((i) => {
        gsap.set(q(".s14-r" + i), { opacity: 0 });
        tl.fromTo(q(".s14-r" + i), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, CLIENTE - 0.1 + i * 0.12);
        pop(".s14-c" + i, COMPRO - 0.15 + i * 0.1, 0.25, 0.5);
        pop(".s14-p" + i, PROMETISTE - 0.15 + i * 0.1, 0.25, 0.5);
        pop(".s14-hoy" + i, ESCRIBIRLE + i * 0.14, 0.25, 0.4);
      });
      // aviso de hoy
      gsap.set(q(".s14-not"), { opacity: 0 });
      tl.fromTo(q(".s14-not"), { opacity: 1, y: -180 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, AVISA - 0.2);
      tl.to(q(".s14-camp"), { rotation: 18, svgOrigin: "0 -34", duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, AVISA + 0.1);
      tl.to(q(".s14-tit"), { opacity: 0, duration: 0.15 }, AVISA - 0.25);
      tl.to(q(".s14-hl0"), { opacity: 1, duration: 0.15 }, AVISA + 0.2);
      tl.to(q(".s14-hl0"), { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, AVISA + 0.4);`,
    sfx: [
      { t: 0.1, sfx: "whoosh", vol: 0.25 },
      { t: 2.0, sfx: "sparkle", vol: 0.22, max: 0.8 },
      { t: 2.45, sfx: "click-soft", vol: 0.25 },
      { t: 3.8, sfx: "pop", vol: 0.22 },
      { t: 4.75, sfx: "pop", vol: 0.22 },
      { t: 5.6, sfx: "notification", vol: 0.35 },
      { t: 6.55, sfx: "ping", vol: 0.22 },
    ],
  },
  // ---------------------------------------------------------------- s15
  {
    id: "s15-cta",
    css: `
    [data-composition-id="s15-cta"] .s15-t { top: 580px; font-weight: 900; font-size: 150px; color: ${am}; text-shadow: 8px 8px 0 ${noche}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${postit("s15-post", 540, 1030, -3, "@ el que todavía|te debe un|presupuesto", { w: 560, size: 72 })}
          <path class="s15-sub" d="M350 1168 C460 1186 630 1158 740 1178" stroke="${rojo}" stroke-width="9" fill="none" stroke-linecap="round" />
          <g transform="translate(540 1375) scale(0.5)"><g class="s15-maq">${contestador("s15c", ["00"])}</g></g>
        </svg>
        <div class="txt s15-t">Etiquetá</div>`,
    js: `
      const AL = 0.46, PRESU = 1.67;
      golpe(".s15-t", 0.12, 1.9);
      sacudon(0.12, 1);
      tl.fromTo(q(".s15-post"), { opacity: 0, scale: 0.5, rotation: -14, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.7)" }, AL - 0.1);
      dibujar(".s15-sub", PRESU + 0.1, 0.5);
      pop(".s15-maq", 0.9, 0.35, 0.6);
      tl.to(q(".s15-post"), { rotation: 2, svgOrigin: "0 -250", duration: 0.9, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.0);
      tl.to(q(".s15-t"), { scale: 1.06, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.0);
      tl.fromTo(q(".s15c-v0"), { opacity: 1 }, { opacity: 0.2, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 7, immediateRender: false }, 2.2);`,
    sfx: [
      { t: 0.05, sfx: "impact-bass-2", vol: 0.42, max: 0.6 },
      { t: 0.4, sfx: "pop", vol: 0.25 },
      { t: 1.75, sfx: "typing", vol: 0.18, max: 0.5 },
      { t: 2.3, sfx: "ping", vol: 0.22 },
    ],
  },
];
