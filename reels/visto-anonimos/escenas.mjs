// Las escenas de "Visto Anónimos". `node escenas.mjs` escribe compositions/sNN-*.html y sus
// .sfx.json (con las duraciones de tiempos.md); después `node armar.mjs`.
// Los tiempos de cada beat son relativos a la escena (ver tiempos.md).
import { C, B, W, V, M, A, R, nombre, gustavo, coordinadora, mirta, rosa, persona, agente, silla, sillaFrente, sillaArriba, termo, vasito, humo, mesita, cartel, celu, ficha, tildes, escribirEscena, duraciones } from "./lib-escenas.mjs";

const D = duraciones();
const solo = process.argv[2]; // node escenas.mjs s03  → escribe solo esa
const E = [];
const escena = (e) => E.push(e);
const ln = (sw = 6, col = C) => `fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;

// globo de chat (x,y esquina; ancho; texto; entrante = beige, saliente = verde)
const burbuja = (cls, x, y, w, txt, sale = false, fs = 38) => `<div class="ab ${cls} chat ${sale ? "sale" : "entra"}" style="left:${x}px; top:${y}px; width:${w}px; font-size:${fs}px">${txt}</div>`;
const CHAT_CSS = `
    & .chat { padding: 18px 26px 16px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; line-height: 1.18; white-space: normal; }
    & .chat.entra { background: ${C}; color: ${B}; border-bottom-left-radius: 6px; }
    & .chat.sale { background: ${V}; color: ${B}; border-bottom-right-radius: 6px; }
`;

// ---------------------------------------------------------------- s01
escena({
  id: "s01-gustavo",
  entrada: false,
  css: `
    & .s01-t1 { top: 600px; font-size: 104px; }
    & .s01-t2 { top: 714px; font-size: 84px; color: ${A}; }
    & .s01-sello { left: 560px; top: 1160px; font-size: 54px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${silla(250, 1330, "s01-silla", 1, 1)}
          ${silla(860, 1330, "s01-silla2", -1, 1)}
          ${gustavo("s01-gus", 540, 1330, 1.45, "g-verguenza")}
        </svg>
        <div class="grande s01-t1">HACE TRES DÍAS</div>
        <div class="grande s01-t2">QUE DEJO EN VISTO</div>
        <div class="sello s01-sello">EN VISTO <svg width="70" height="44" viewBox="-4 -40 66 46" style="vertical-align: -4px">${tildes(0, 0, R, 1)}</svg></div>
        <div class="etiqueta s01-et">REUNIÓN DE LOS JUEVES</div>`,
  js: `
      dibujar(".s01-silla path, .s01-silla2 path", 0, 0.6, 0.5);
      tl.fromTo(qa(".s01-silla rect, .s01-silla2 rect"), { opacity: 0.4 }, { opacity: 1, duration: 0.4 }, 0);
      tl.fromTo(q(".s01-gus"), { y: 50, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, 0);
      vaiven(".s01-gus", "y", -6, 0.7, 0.5);
      tl.fromTo(q(".s01-gus .pj-nombre"), { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", svgOrigin: "-66 -70" }, 1.0);
      golpe(".s01-t1", 2.3, 2.2, -2);
      sacudon(2.3, 0.8);
      golpe(".s01-t2", 3.56, 2.4, 2);
      cara(".s01-gus", "g-verguenza", "g-triste", 3.6);
      golpe(".s01-sello", 3.8, 2.6, -8);
      sacudon(3.8, 1.2);
      pop(".s01-et", 0.4, { y: 20 });
      tl.to(q(".escenario"), { scale: 1.05, duration: 1.4, ease: "power1.out", transformOrigin: "50% 70%" }, 2.9);`,
  sfx: [{ t: 0.05, sfx: "click-soft", vol: 0.3 }, { t: 2.26, sfx: "impact-bass-1", vol: 0.32 }, { t: 3.52, sfx: "impact-bass-2", vol: 0.38 }, { t: 3.78, sfx: "glitch-1", vol: 0.25, max: 0.4 }],
});

// ---------------------------------------------------------------- s02
// la ronda vista desde arriba: 8 sillas, 7 personas y la de Gustavo (abajo) en ámbar
const RONDA = { cx: 540, cy: 1050, r: 240 };
const PELOS = [M, C, A, M, B, C, M, A];
const BUZOS = [V, M, R, V, C, V, R, M];
const ronda = (pre, conHolas) => {
  let s = "", holas = "";
  for (let i = 0; i < 8; i++) {
    const ang = 90 + i * 45; // i = 0 abajo (Gustavo)
    const rad = (ang * Math.PI) / 180;
    const x = RONDA.cx + RONDA.r * Math.cos(rad), y = RONDA.cy + RONDA.r * Math.sin(rad);
    const rot = ang - 90; // respaldo hacia afuera
    s += sillaArriba(x, y, rot, `${pre}-silla`);
    const hx = RONDA.cx + (RONDA.r - 14) * Math.cos(rad), hy = RONDA.cy + (RONDA.r - 14) * Math.sin(rad);
    if (i === 0) {
      s += `<g transform="translate(${hx} ${hy}) rotate(${rot})"><g class="${pre}-gus"><ellipse cx="0" cy="18" rx="74" ry="34" fill="${M}" stroke="${A}" stroke-width="7" /><circle cx="0" cy="-4" r="42" fill="${M}" stroke="${A}" stroke-width="7" /></g></g>`;
    } else {
      s += `<g transform="translate(${hx} ${hy}) rotate(${rot})"><g class="${pre}-p ${pre}-p${i}"><ellipse cx="0" cy="18" rx="70" ry="32" fill="${BUZOS[i]}" stroke="${C}" stroke-width="5" /><circle cx="0" cy="-4" r="40" fill="${PELOS[i]}" stroke="${C}" stroke-width="5" /></g></g>`;
      if (conHolas) {
        const tx = RONDA.cx + (RONDA.r - 130) * Math.cos(rad), ty = RONDA.cy + (RONDA.r - 130) * Math.sin(rad);
        holas += `<text class="${pre}-hola" x="${tx}" y="${ty + 12}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="40" fill="${C}" opacity="0">hola</text>`;
      }
    }
  }
  return s + holas;
};
escena({
  id: "s02-ronda",
  css: `
    & .s02-centro { left: 340px; top: 990px; width: 400px; text-align: center; font-size: 46px; color: ${A}; letter-spacing: 0.06em; }
    & .s02-t1 { top: 618px; font-size: 80px; }
    & .s02-ella { left: 760px; top: 700px; font-size: 44px; color: ${R}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s02-aro" cx="${RONDA.cx}" cy="${RONDA.cy}" r="${RONDA.r + 90}" fill="none" stroke="${C}" stroke-width="4" stroke-dasharray="4 18" opacity="0.4" />
          <g class="s02-todo">${ronda("s02", true)}</g>
          <path class="s02-flecha" d="M846 760 Q830 800 806 828" ${ln(6, R)} />
          <path class="s02-flecha" d="M790 812 L806 830 L826 814" ${ln(6, R)} />
        </svg>
        <div class="grande s02-t1">ACÁ NADIE TE JUZGA</div>
        <div class="ab mano s02-ella">(ella sí)</div>
        <div class="etiqueta s02-et">VISTO ANÓNIMOS</div>`,
  js: `
      tl.fromTo(q(".s02-todo"), { rotation: -14, scale: 1.12 }, { rotation: 0, scale: 1, duration: 0.6, ease: "power3.out", svgOrigin: "${RONDA.cx} ${RONDA.cy}" }, 0);
      tl.to(q(".s02-todo"), { rotation: 6, duration: 3.4, ease: "sine.inOut", svgOrigin: "${RONDA.cx} ${RONDA.cy}" }, 0.6);
      dibujar(".s02-aro", 0, 0.8, 0.3);
      qa(".s02-hola").forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)", transformOrigin: "50% 50%" }, 0.02 + i * 0.05);
        tl.to(el, { opacity: 0, duration: 0.3 }, 1.4);
      });
      tl.fromTo(q(".s02-gus"), { opacity: 1 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.3);
      golpe(".s02-t1", 2.25, 2.2, -1);
      sacudon(2.25, 0.6);
      dibujar(".s02-flecha", 3.0, 0.3);
      pop(".s02-ella", 3.1, { rot: -6 });
      tl.to(q(".s02-p3"), { x: 8, duration: 0.08, yoyo: true, repeat: 5 }, 3.1);
      pop(".s02-et", 0.5, { y: 20 });`,
  sfx: [{ t: 0.02, sfx: "click-soft", vol: 0.25 }, { t: 2.2, sfx: "impact-bass-1", vol: 0.3 }, { t: 3.05, sfx: "pop", vol: 0.3 }],
});

// ---------------------------------------------------------------- s03
escena({
  id: "s03-lo-leo",
  css: CHAT_CSS + `
    & .s03-cab { left: 250px; top: 690px; font-size: 26px; color: ${C}; }
    & .s03-visto { left: 196px; top: 960px; font-size: 28px; color: ${A}; }
    & .s03-nube-t { left: 660px; top: 720px; width: 340px; text-align: center; font-size: 60px; color: ${B}; white-space: normal; line-height: 0.95; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${celu(140, 620, 460, 700, "s03-celu")}
          <circle cx="210" cy="704" r="26" fill="${V}" stroke="${C}" stroke-width="4" />
          <rect class="s03-luz" x="148" y="628" width="444" height="684" rx="42" fill="${V}" opacity="0" />
          ${tildes(400, 1000, A, 1, "s03-tildes")}
          <g class="s03-nube">
            <ellipse cx="830" cy="790" rx="200" ry="120" fill="${C}" />
            <circle cx="690" cy="730" r="70" fill="${C}" /><circle cx="960" cy="720" r="70" fill="${C}" /><circle cx="820" cy="680" r="80" fill="${C}" />
          </g>
          <circle class="s03-bol1" cx="760" cy="950" r="20" fill="${C}" /><circle class="s03-bol2" cx="790" cy="996" r="12" fill="${C}" />
          ${gustavo("s03-gus", 830, 1330, 0.9, "g-verguenza")}
          <rect class="s03-apaga" x="148" y="628" width="444" height="684" rx="42" fill="#0b100e" opacity="0" />
        </svg>
        <div class="ab mono s03-cab">CLIENTA · 21:14</div>
        ${burbuja("s03-msj", 180, 770, 380, "¡Hola! ¿Mañana abren temprano?", false, 36)}
        <div class="ab mono s03-visto">LEÍDO</div>
        <div class="ab mano s03-nube-t">después le contesto</div>
        <div class="etiqueta s03-et">LO ABRE · LO LEE</div>`,
  js: `
      pop(".s03-msj", 0.15, { x: -40 });
      tl.to(q(".s03-luz"), { opacity: 0.25, duration: 0.1 }, 1.0);
      tl.to(q(".s03-luz"), { opacity: 0, duration: 0.3 }, 1.15);
      dibujar(".s03-tildes path", 1.6, 0.3);
      pop(".s03-visto", 1.65, { x: -20 });
      tl.fromTo(q(".s03-gus"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }, 1.9);
      pop(".s03-bol2", 2.2);
      pop(".s03-bol1", 2.35);
      pop(".s03-nube", 2.5, { scale: 0.6 });
      escribir(".s03-nube-t", 3.0, 0.7);
      tl.to(q(".s03-apaga"), { opacity: 0.85, duration: 0.15 }, 3.75);
      vaiven(".s03-nube", "y", -8, 0.5, 2.9);
      pop(".s03-et", 0.6, { y: 20 });`,
  sfx: [{ t: 0.12, sfx: "notification", vol: 0.3 }, { t: 1.0, sfx: "click", vol: 0.25 }, { t: 1.6, sfx: "ping", vol: 0.22 }, { t: 3.0, sfx: "typing", vol: 0.15, max: 0.6 }, { t: 3.75, sfx: "click-soft", vol: 0.3 }],
});

// ---------------------------------------------------------------- s04
escena({
  id: "s04-nunca",
  css: `
    & .s04-dia { left: 580px; top: 800px; width: 360px; text-align: center; font-size: 96px; color: ${B}; }
    & .s04-mes { left: 580px; top: 668px; width: 360px; text-align: center; font-size: 30px; color: ${C}; }
    & .s04-sello { left: 600px; top: 900px; font-size: 96px; }
    & .s04-ec { left: 480px; top: 1120px; font-size: 92px; color: ${C}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-alma">
            <rect x="580" y="650" width="360" height="400" rx="10" fill="${C}" />
            <rect x="580" y="650" width="360" height="70" rx="10" fill="${R}" />
            <path d="M640 640 V672 M880 640 V672" ${ln(10, B)} />
          </g>
          <rect class="s04-hoja" x="580" y="724" width="360" height="326" fill="${C}" />
          <path class="s04-sub" d="M490 1240 Q720 1226 1010 1240" ${ln(7, A)} />
          ${coordinadora("s04-coo", 280, 1330, 1.15, "k-ceja")}
        </svg>
        <div class="ab mono s04-mes">CALENDARIO</div>
        <div class="ab mano s04-dia">Después</div>
        <div class="sello s04-sello">NUNCA</div>
        <div class="ab mano s04-ec">después = nunca</div>
        <div class="etiqueta s04-et">¿Y CUÁNDO ES DESPUÉS?</div>`,
  js: `
      tl.fromTo(q(".s04-coo"), { y: 50, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      pop(".s04-alma", 0.1, { rot: 0 });
      pop(".s04-mes", 0.15);
      pop(".s04-dia", 0.6, { y: 20 });
      vaiven(".s04-coo", "y", -5, 0.6, 0.4);
      // la hoja se arranca
      tl.to([q(".s04-hoja"), q(".s04-dia")], { y: 300, rotation: 14, opacity: 0, duration: 0.4, ease: "power2.in" }, 1.25);
      golpe(".s04-sello", 1.56, 2.6, -10);
      sacudon(1.56, 1.2);
      escribir(".s04-ec", 2.46, 0.8);
      dibujar(".s04-sub", 3.3, 0.4);
      cara(".s04-coo", "k-ceja", "k-calma", 2.0);
      pop(".s04-et", 0.2, { y: 20 });`,
  sfx: [{ t: 0.1, sfx: "pop", vol: 0.25 }, { t: 1.25, sfx: "whoosh-short", vol: 0.25 }, { t: 1.52, sfx: "impact-bass-2", vol: 0.42 }, { t: 2.46, sfx: "typing", vol: 0.15, max: 0.7 }],
});

// ---------------------------------------------------------------- s05
escena({
  id: "s05-pulgar",
  css: CHAT_CSS + `
    & .s05-t { top: 1250px; font-size: 64px; color: ${A}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-tipeo"><rect x="760" y="860" width="200" height="90" rx="40" fill="${V}" /><circle class="s05-pt" cx="815" cy="905" r="12" fill="${B}" /><circle class="s05-pt" cx="860" cy="905" r="12" fill="${B}" /><circle class="s05-pt" cx="905" cy="905" r="12" fill="${B}" /></g>
          <g class="s05-th">
            <rect x="600" y="830" width="380" height="370" rx="44" fill="${V}" />
            <path d="M980 1160 L1000 1200 L950 1190 Z" fill="${V}" />
            <rect x="680" y="990" width="44" height="170" rx="10" fill="${B}" stroke="${C}" stroke-width="5" />
            <path d="M724 1000 L770 1000 L770 900 Q770 868 800 868 Q826 868 826 900 L826 1000 L880 1000 Q906 1000 906 1026 Q906 1048 884 1050 Q906 1054 906 1076 Q906 1098 884 1100 Q906 1104 906 1124 Q904 1150 880 1152 L724 1160 Z" fill="${C}" stroke="${B}" stroke-width="6" stroke-linejoin="round" />
          </g>
        </svg>
        ${burbuja("s05-q", 100, 640, 600, "Hola, ¿qué precio tiene la mesa de luz?", false, 40)}
        ${burbuja("s05-r", 100, 1222, 480, "¿Eso es un sí?", false, 40)}
        <div class="etiqueta s05-et">RESPUESTA: UN PULGAR</div>`,
  js: `
      pop(".s05-q", 0.1, { x: -40 });
      pop(".s05-tipeo", 1.6, { x: 30 });
      qa(".s05-pt").forEach((el, i) => tl.fromTo(el, { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.7 + i * 0.08));
      fuera(".s05-tipeo", 2.4, 0.1);
      pop(".s05-th", 2.45, { scale: 0.3, rot: -20 });
      sacudon(2.5, 0.8);
      tl.fromTo(q(".s05-th"), { rotation: 0 }, { rotation: -4, duration: 0.2, yoyo: true, repeat: 2, ease: "sine.inOut", svgOrigin: "790 1015", immediateRender: false }, 2.8);
      pop(".s05-r", 2.8, { x: -40 });
      pop(".s05-et", 1.7, { y: 20 });`,
  sfx: [{ t: 0.08, sfx: "notification", vol: 0.28 }, { t: 1.6, sfx: "typing", vol: 0.15, max: 0.7 }, { t: 2.45, sfx: "pop", vol: 0.4 }, { t: 2.8, sfx: "notification", vol: 0.22 }],
});

// ---------------------------------------------------------------- s06
const barras = (() => {
  let s = "";
  for (let i = 0; i < 28; i++) {
    const h = 24 + Math.round(Math.abs(Math.sin(i * 1.7) * 46 + Math.sin(i * 0.6) * 22));
    const x = 250 + i * 24;
    const gol = i >= 19 && i <= 23;
    s += `<rect class="s06-b${gol ? " s06-gol" : ""}" x="${x}" y="${880 - h / 2}" width="12" height="${h}" rx="6" fill="${B}" />`;
  }
  return s;
})();
escena({
  id: "s06-audio",
  css: `
    & .s06-t1 { top: 606px; font-size: 104px; color: ${A}; }
    & .s06-dur { left: 830px; top: 940px; font-size: 32px; color: ${B}; }
    & .s06-goool { left: 560px; top: 1060px; font-size: 110px; color: ${R}; }
    & .s06-min { left: 600px; top: 1016px; font-size: 28px; color: ${C}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s06-burb">
            <rect x="90" y="770" width="900" height="230" rx="50" fill="${V}" />
            <path d="M990 960 L1010 1010 L950 990 Z" fill="${V}" />
            <circle cx="170" cy="880" r="46" fill="${B}" />
            <path d="M156 856 L192 880 L156 904 Z" fill="${V}" />
            ${barras}
            <circle class="s06-dot" cx="250" cy="940" r="12" fill="${A}" />
            <path d="M250 940 H910" stroke="${B}" stroke-width="4" opacity="0.3" />
          </g>
          <g transform="translate(410 1170)"><g class="s06-pelota">
            <circle cx="0" cy="0" r="80" fill="${C}" stroke="${B}" stroke-width="6" />
            <path d="M0 -26 L25 -8 L15 22 L-15 22 L-25 -8 Z" fill="${B}" />
            <path d="M0 -26 V-80 M25 -8 L76 -24 M15 22 L46 64 M-15 22 L-46 64 M-25 -8 L-76 -24" stroke="${B}" stroke-width="5" />
          </g></g>
          ${gustavo("s06-gus", 160, 1330, 0.7, "g-verguenza")}
        </svg>
        <div class="grande s06-t1">CUATRO MINUTOS</div>
        <div class="ab mono s06-dur">0:00</div>
        <div class="ab mono s06-min">MINUTO 3 · DE FONDO</div>
        <div class="ab mano s06-goool">¡GOOOL!</div>
        <div class="etiqueta s06-et">UN AUDIO DE GUSTAVO</div>`,
  js: `
      pop(".s06-burb", 0.1, { y: 40 });
      tl.fromTo(qa(".s06-b"), { scaleY: 0.2 }, { scaleY: 1, duration: 0.25, stagger: 0.02, ease: "back.out(2)", transformOrigin: "50% 50%" }, 0.3);
      tl.fromTo(q(".s06-dot"), { x: 0 }, { x: 640, duration: 4.6, ease: "none" }, 0.5);
      golpe(".s06-t1", 1.6, 2.2, -2);
      sacudon(1.6, 0.8);
      tl.set(q(".s06-dur"), { opacity: 1 }, 0);
      const dur = q(".s06-dur");
      ["0:47", "1:32", "2:18", "3:01", "3:44", "4:12"].forEach((txt, i) => tl.call(() => { dur.textContent = txt; }, null, 0.7 + i * 0.4));
      tl.call(() => { dur.textContent = "0:00"; }, null, 0.01);
      pop(".s06-min", 3.18, { y: 10 });
      tl.to(qa(".s06-gol"), { scaleY: 2.2, fill: "${R}", duration: 0.15, yoyo: true, repeat: 5, ease: "power2.out", transformOrigin: "50% 50%" }, 3.3);
      pop(".s06-pelota", 3.7, { y: -200, rot: -90 });
      golpe(".s06-goool", 4.0, 2.4, -6);
      sacudon(4.0, 1);
      tl.fromTo(q(".s06-gus"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0.4);
      pop(".s06-et", 0.5, { y: 20 });`,
  sfx: [{ t: 0.1, sfx: "pop", vol: 0.25 }, { t: 1.56, sfx: "impact-bass-1", vol: 0.32 }, { t: 3.3, sfx: "whoosh", vol: 0.2 }, { t: 3.98, sfx: "impact-bass-2", vol: 0.4 }],
});

// ---------------------------------------------------------------- s07
escena({
  id: "s07-mirta",
  css: `
    & .s07-t1 { top: 606px; font-size: 92px; }
    & .s07-t2 { top: 606px; font-size: 80px; color: ${A}; }
    & .s07-cap { left: 616px; top: 1100px; width: 368px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.15; color: ${B}; white-space: normal; }
    & .s07-user { left: 670px; top: 738px; font-size: 22px; color: ${B}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-post">
            <rect x="600" y="720" width="400" height="530" rx="20" fill="${C}" />
            <circle cx="640" cy="750" r="18" fill="${R}" />
            <rect x="616" y="790" width="368" height="290" rx="8" fill="${V}" />
            <path d="M800 818 Q800 806 812 806 Q824 806 824 820 Q824 830 800 842 L740 880 H860 L800 842" ${ln(5, B)} />
            <path d="M760 880 L742 1060 H858 L840 880 Z" fill="${R}" stroke="${B}" stroke-width="5" stroke-linejoin="round" />
          </g>
          <path class="s07-sub" d="M620 1214 H900" ${ln(7, A)} />
          <g class="s07-brazo"><path d="M-80 -150 Q-140 -230 -130 -380" fill="none" stroke="${R}" stroke-width="44" stroke-linecap="round" transform="translate(330 1330) scale(1.25)" /><circle cx="${330 - 130 * 1.25}" cy="${1330 - 400 * 1.25}" r="34" fill="${B}" stroke="${C}" stroke-width="6" /></g>
          ${mirta("s07-mir", 330, 1330, 1.25, "m-canchera")}
        </svg>
        <div class="grande s07-t1">¿ALGUIEN MÁS?</div>
        <div class="grande s07-t2">¿Y EN EL PRIVADO?</div>
        <div class="ab mono s07-user">MIRTA.MODAS</div>
        <div class="ab s07-cap">Vestido nuevo. Precio: consultá por privado.</div>
        <div class="etiqueta s07-et">MIRTA · TIENDA DE ROPA</div>`,
  js: `
      golpe(".s07-t1", 0.05, 1.8, -1);
      tl.fromTo(q(".s07-mir"), { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, 0.7);
      gsap.set(q(".s07-brazo"), { opacity: 0 });
      tl.fromTo(q(".s07-brazo"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 1.0);
      vaiven(".s07-brazo", "rotation", 4, 0.35, 1.3);
      vaiven(".s07-mir", "y", -5, 0.7, 1.2);
      pop(".s07-post", 1.94, { x: 60, rot: 4 });
      pop(".s07-user", 2.05);
      pop(".s07-cap", 2.6, { y: 10 });
      dibujar(".s07-sub", 3.25, 0.5);
      fuera(".s07-t1", 4.6);
      golpe(".s07-t2", 4.85, 2, 1);
      tl.to(q(".s07-brazo"), { opacity: 0, y: 120, duration: 0.25 }, 4.6);
      cara(".s07-mir", "m-canchera", "m-normal", 5.3);
      pop(".s07-et", 1.2, { y: 20 });`,
  sfx: [{ t: 0.02, sfx: "impact-bass-1", vol: 0.25 }, { t: 1.0, sfx: "pop", vol: 0.3 }, { t: 1.94, sfx: "whoosh-short", vol: 0.25 }, { t: 3.25, sfx: "click", vol: 0.25 }, { t: 4.82, sfx: "impact-bass-2", vol: 0.3 }],
});

// ---------------------------------------------------------------- s08
escena({
  id: "s08-privado",
  css: CHAT_CSS + `
    & .s08-cab { left: 250px; top: 690px; font-size: 26px; color: ${C}; }
    & .s08-sello { left: 230px; top: 1010px; font-size: 70px; }
    & .s08-tibio { left: 0; right: 0; top: 1250px; text-align: center; font-size: 34px; color: ${C}; letter-spacing: 0.18em; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${celu(190, 620, 700, 700, "s08-celu")}
          <circle cx="220" cy="704" r="0" fill="${V}" />
          <g class="s08-manos"><g transform="rotate(-20 490 1200)"><ellipse class="s08-mi" cx="490" cy="1200" rx="20" ry="30" fill="${C}" /></g><g transform="rotate(20 590 1200)"><ellipse class="s08-md" cx="590" cy="1200" rx="20" ry="30" fill="${C}" /></g></g>
        </svg>
        <div class="ab mono s08-cab">MENSAJE PRIVADO</div>
        ${burbuja("s08-q", 240, 750, 500, "¡Hola! ¿Precio del vestido?", false, 38)}
        ${burbuja("s08-r", 420, 900, 420, "Consultá por privado.", true, 38)}
        <div class="sello s08-sello">YA ES EL PRIVADO</div>
        <div class="ab mono s08-tibio">(APLAUSO TIBIO)</div>
        <div class="etiqueta s08-et">MIRTA, POR FAVOR</div>`,
  js: `
      pop(".s08-q", 0.05, { x: -40 });
      pop(".s08-r", 0.8, { x: 40 });
      golpe(".s08-sello", 1.45, 2.4, -8);
      sacudon(1.45, 1);
      pop(".s08-tibio", 2.0, { y: 10 });
      pop(".s08-manos", 2.0);
      tl.fromTo(q(".s08-mi"), { x: 0 }, { x: 22, duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.1);
      tl.fromTo(q(".s08-md"), { x: 0 }, { x: -22, duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.1);
      pop(".s08-et", 0.3, { y: 20 });`,
  sfx: [{ t: 0.05, sfx: "notification", vol: 0.25 }, { t: 0.8, sfx: "pop", vol: 0.3 }, { t: 1.42, sfx: "impact-bass-1", vol: 0.38 }, { t: 2.0, sfx: "aplausos", vol: 0.14, max: 1.25 }],
});

// ---------------------------------------------------------------- s09
const pildora = (cls, x, y, txt) => `<div class="ab ${cls} pil" style="left:${x}px; top:${y}px">${txt}<span class="pil-n">1</span></div>`;
escena({
  id: "s09-vos",
  css: `
    & .s09-t1 { top: 600px; font-size: 140px; }
    & .s09-t2 { top: 600px; font-size: 140px; color: ${A}; }
    & .pil { padding: 14px 70px 12px 24px; border-radius: 30px; background: ${C}; color: ${B}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; white-space: nowrap; }
    & .pil-n { position: absolute; right: 14px; top: 50%; margin-top: -20px; width: 40px; height: 40px; border-radius: 50%; background: ${R}; color: ${C}; font-size: 26px; line-height: 40px; text-align: center; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <ellipse class="s09-luz" cx="540" cy="1330" rx="330" ry="40" fill="${V}" opacity="0.25" />
          ${sillaFrente(540, 1330, "s09-silla", 1)}
          <g class="s09-tag">${nombre(540, 1330 - 365, "Vos", 150, 46)}</g>
        </svg>
        <div class="grande s09-t1">¿Y VOS?</div>
        <div class="grande s09-t2">SÍ, VOS.</div>
        ${pildora("s09-c1", 70, 830, "¿Precio?")}
        ${pildora("s09-c2", 690, 950, "¿Abren hoy?")}
        ${pildora("s09-c3", 60, 1090, "¿Hay talle?")}
        <div class="etiqueta s09-et">TU SILLA YA ESTÁ</div>`,
  js: `
      dibujar(".s09-silla path", 0, 0.5, 0.4);
      tl.fromTo(qa(".s09-silla rect, .s09-silla path[fill]"), { opacity: 0.3 }, { opacity: 1, duration: 0.4 }, 0);
      golpe(".s09-t1", 0.11, 2.2, -2);
      sacudon(0.11, 0.8);
      fuera(".s09-t1", 0.75, 0.1);
      golpe(".s09-t2", 0.85, 2.4, 2);
      sacudon(0.85, 1.2);
      pop(".s09-tag", 1.2, { scale: 0.4, rot: -10 });
      tl.to(q(".escenario"), { scale: 1.1, duration: 2.6, ease: "power1.inOut", transformOrigin: "50% 62%" }, 1.5);
      pop(".s09-c1", 2.5, { x: -60 });
      pop(".s09-c2", 2.85, { x: 60 });
      pop(".s09-c3", 3.2, { x: -60 });
      vaiven(".s09-c1, .s09-c3", "y", -6, 0.4, 2.9);
      vaiven(".s09-c2", "y", 6, 0.4, 3.1);
      pop(".s09-et", 1.6, { y: 20 });`,
  sfx: [{ t: 0.08, sfx: "impact-bass-1", vol: 0.3 }, { t: 0.82, sfx: "impact-bass-2", vol: 0.38 }, { t: 2.5, sfx: "notification", vol: 0.22 }, { t: 2.85, sfx: "notification", vol: 0.22 }, { t: 3.2, sfx: "notification", vol: 0.22 }],
});

// ---------------------------------------------------------------- s10
escena({
  id: "s10-abasto",
  css: `
    & .s10-t1 { top: 600px; font-size: 104px; }
    & .s10-s1 { left: 30px; top: 1236px; font-size: 40px; }
    & .s10-s2 { left: 590px; top: 770px; font-size: 52px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${persona("s10-cli", 200, 1200, 0.85, R, A)}
          <rect x="30" y="1160" width="350" height="170" rx="10" fill="${M}" stroke="${C}" stroke-width="6" />
          <g class="s10-timbre"><path d="M290 1160 Q290 1120 320 1120 Q350 1120 350 1160 Z" fill="${A}" stroke="${C}" stroke-width="5" /><circle cx="320" cy="1112" r="8" fill="${C}" /></g>
          ${celu(780, 880, 230, 390, "s10-celu")}
          <rect class="s10-pant" x="790" y="890" width="210" height="370" rx="40" fill="${V}" opacity="0.2" />
          <circle class="s10-badge" cx="1000" cy="890" r="30" fill="${R}" stroke="${C}" stroke-width="4" />
          <g><g class="s10-gusw">${gustavo("s10-gus", 560, 1330, 1.15, "g-triste")}</g></g>
        </svg>
        <div class="grande s10-t1">NO DOY ABASTO</div>
        <div class="sello s10-s1">NO ATIENDO</div>
        <div class="sello s10-s2">NO CONTESTO</div>
        <div class="etiqueta s10-et">MOSTRADOR · CELULAR</div>`,
  js: `
      tl.fromTo(q(".s10-gusw"), { y: 60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      golpe(".s10-t1", 0.45, 2.2, -1);
      cara(".s10-gus", "g-triste", "g-grita", 0.4);
      sacudon(0.45, 0.8);
      vaiven(".s10-badge", "scale", 0.2, 0.3, 0.2);
      // si contesto: mira el celular
      tl.to(q(".s10-gusw"), { rotation: 9, x: 40, duration: 0.25, ease: "power2.out", transformOrigin: "50% 100%" }, 1.4);
      tl.to(q(".s10-pant"), { opacity: 0.6, duration: 0.15 }, 1.45);
      tl.to(q(".s10-timbre"), { y: -10, duration: 0.06, yoyo: true, repeat: 7 }, 1.8);
      golpe(".s10-s1", 2.15, 2.4, -8);
      cara(".s10-gus", "g-grita", "g-triste", 2.0);
      // si atiendo: mira el mostrador
      tl.to(q(".s10-gusw"), { rotation: -6, x: -10, duration: 0.25, ease: "power2.out", transformOrigin: "50% 100%" }, 2.6);
      tl.to(q(".s10-pant"), { opacity: 0.2, duration: 0.15 }, 2.65);
      tl.to(q(".s10-celu"), { x: 8, duration: 0.05, yoyo: true, repeat: 9 }, 2.9);
      golpe(".s10-s2", 3.35, 2.4, 7);
      sacudon(3.35, 1);
      pop(".s10-et", 0.6, { y: 20 });`,
  sfx: [{ t: 0.42, sfx: "impact-bass-1", vol: 0.3 }, { t: 1.8, sfx: "ping", vol: 0.25 }, { t: 2.12, sfx: "impact-bass-2", vol: 0.35 }, { t: 2.9, sfx: "notification", vol: 0.25 }, { t: 3.32, sfx: "impact-bass-2", vol: 0.38 }],
});

// ---------------------------------------------------------------- s11
escena({
  id: "s11-uno-solo",
  css: `
    & .s11-a { top: 606px; font-size: 64px; }
    & .s11-b { top: 680px; font-size: 64px; }
    & .s11-t { top: 616px; font-size: 140px; color: ${A}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s11-cono" d="M440 560 H640 L900 1330 H180 Z" fill="${V}" opacity="0.16" />
          ${silla(150, 1330, "s11-otra", 1, 0.9)}
          ${silla(930, 1330, "s11-otra", -1, 0.9)}
          ${sillaFrente(540, 1330, "s11-silla", 0.95)}
          <g><g class="s11-gusw">${gustavo("s11-gus", 540, 1330, 1.2, "g-triste")}</g></g>
        </svg>
        <div class="grande s11-a">NO SOS UN MAL</div>
        <div class="grande s11-b">COMERCIANTE</div>
        <div class="grande s11-t">UNO SOLO.</div>
        <div class="etiqueta s11-et">LA VERDAD, GUSTAVO</div>`,
  js: `
      pop(".s11-a", 0.05, { y: 20 });
      pop(".s11-b", 0.55, { y: 20 });
      tl.fromTo(q(".s11-gusw"), { y: 40, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
      vaiven(".s11-gusw", "y", -4, 0.8, 0.4);
      fuera(".s11-a, .s11-b", 1.85, 0.15);
      tl.to(qa(".s11-otra"), { opacity: 0, x: (i) => (i ? 120 : -120), duration: 0.5, ease: "power2.in" }, 1.9);
      tl.fromTo(q(".s11-cono"), { opacity: 0.16 }, { opacity: 0.32, duration: 0.3 }, 2.0);
      golpe(".s11-t", 2.2, 2.6, -2);
      sacudon(2.2, 1.1);
      cara(".s11-gus", "g-triste", "g-sorpresa", 2.4);
      tl.to(q(".escenario"), { scale: 1.06, duration: 1.4, ease: "power1.out", transformOrigin: "50% 70%" }, 2.2);
      pop(".s11-et", 0.3, { y: 20 });`,
  sfx: [{ t: 0.05, sfx: "click-soft", vol: 0.25 }, { t: 1.9, sfx: "whoosh", vol: 0.2 }, { t: 2.16, sfx: "impact-bass-2", vol: 0.45 }],
});

// ---------------------------------------------------------------- s12
escena({
  id: "s12-limpia",
  css: `
    & .s12-t { top: 606px; font-size: 100px; }
    & .s12-ficha { left: 700px; top: 740px; width: 260px; height: 260px; border-radius: 50%; background: ${A}; border: 7px solid ${C}; box-sizing: border-box; text-align: center; color: ${B}; outline: 4px dashed ${B}; outline-offset: -26px; }
    & .s12-f1 { margin-top: 62px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 1; }
    & .s12-f2 { margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; letter-spacing: 0.08em; line-height: 1.2; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${rosa("s12-ros", 390, 1330, 1.3, "r-serena")}
          
          <g class="s12-brillo"><path d="M650 760 L680 790 M1010 760 L980 790 M650 980 L680 950 M1010 980 L980 950" ${ln(6, A)} /></g>
          ${gustavo("s12-gus", 880, 1330, 0.66, "g-triste")}
        </svg>
        <div class="grande s12-t">UN MES LIMPIA</div>
        <div class="ab s12-ficha"><div class="s12-f1">UN MES</div><div class="s12-f2">SIN DEJAR<br />EN VISTO</div></div>
        <div class="etiqueta s12-et">ROSA · PELUQUERÍA</div>`,
  js: `
      tl.fromTo(q(".s12-ros"), { y: 80, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      vaiven(".s12-ros", "y", -5, 0.7, 0.4);
      gsap.set(q(".s12-ficha"), { opacity: 0 });
      tl.fromTo(q(".s12-ficha"), { opacity: 0, scale: 0.2, rotation: -200 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.75);
      dibujar(".s12-brillo path", 1.15, 0.3);
      tl.to(qa(".s12-brillo path"), { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 5 }, 1.5);
      golpe(".s12-t", 1.0, 2.2, -1);
      tl.fromTo(q(".s12-gus"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 1.95);
      cara(".s12-gus", "g-triste", "g-sorpresa", 2.05);
      tl.to(q(".s12-gus"), { y: -14, duration: 0.12, yoyo: true, repeat: 3 }, 2.9);
      pop(".s12-et", 0.3, { y: 20 });`,
  sfx: [{ t: 0.75, sfx: "sparkle", vol: 0.3 }, { t: 0.98, sfx: "impact-bass-1", vol: 0.3 }, { t: 1.95, sfx: "pop", vol: 0.3 }],
});

// ---------------------------------------------------------------- s13
const tarjeta = (cls, y, txt, fin = false) => `<div class="ab ${cls} tar${fin ? " fin" : ""}" style="top:${y}px"><span class="tar-ok"></span>${txt}</div>`;
escena({
  id: "s13-agente",
  css: `
    & .s13-t { top: 600px; font-size: 100px; color: ${A}; }
    & .tar { box-sizing: border-box; left: 420px; width: 620px; padding: 18px 20px 16px 80px; border-radius: 18px; background: ${C}; color: ${B}; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; line-height: 1.1; white-space: nowrap; }
    & .tar.fin { left: 90px; width: 900px; padding-right: 22px; background: ${A}; font-size: 42px; text-align: center; padding-left: 22px; }
    & .tar.fin .tar-ok { display: none; }
    & .tar-ok { position: absolute; left: 22px; top: 50%; margin-top: -21px; width: 42px; height: 42px; border-radius: 50%; background: ${V}; }
    & .tar-ok::after { content: ""; position: absolute; left: 13px; top: 7px; width: 10px; height: 20px; border: solid ${B}; border-width: 0 6px 6px 0; transform: rotate(40deg); }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s13-aura" cx="230" cy="1000" r="200" fill="${V}" opacity="0.12" />
          ${agente("s13-age", 230, 1150, 1.0, "a-ok")}
        </svg>
        <div class="grande s13-t">UN AGENTE DE IA</div>
        ${tarjeta("s13-c1", 740, "Contesta al instante")}
        ${tarjeta("s13-c2", 840, "A cualquier hora")}
        ${tarjeta("s13-c3", 940, "Tus precios y horarios")}
        ${tarjeta("s13-c4", 1040, "Agenda los turnos")}
        ${tarjeta("s13-c5", 1196, "Lo que es para vos, te lo pasa", true)}
        <div class="etiqueta s13-et">EL SECRETO DE ROSA</div>`,
  js: `
      gsap.set(q(".s13-age"), { opacity: 0 });
      tl.fromTo(q(".s13-age"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 0.05);
      dibujar(".s13-aura", 0.1, 0.4);
      vaiven(".s13-age .a-brazo-d", "rotation", -14, 0.35, 0.6);
      vaiven(".s13-age", "y", -8, 0.6, 0.6);
      golpe(".s13-t", 0.7, 2.2, -1);
      sacudon(0.7, 0.8);
      pop(".s13-c1", 1.5, { x: 80 });
      pop(".s13-c2", 2.9, { x: 80 });
      pop(".s13-c3", 4.3, { x: 80 });
      pop(".s13-c4", 5.5, { x: 80 });
      cara(".s13-age", "a-ok", "a-feliz", 5.6);
      tl.to(qa(".s13-c1, .s13-c2, .s13-c3, .s13-c4"), { opacity: 0.55, duration: 0.3 }, 7.0);
      golpe(".s13-c5", 7.5, 1.8, 0);
      tl.to(q(".s13-c5"), { scale: 1.04, duration: 0.3, yoyo: true, repeat: 2, ease: "sine.inOut" }, 7.8);
      pop(".s13-et", 0.4, { y: 20 });`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.25 }, { t: 0.68, sfx: "impact-bass-1", vol: 0.3 }, { t: 1.5, sfx: "pop", vol: 0.28 }, { t: 2.9, sfx: "pop", vol: 0.28 }, { t: 4.3, sfx: "pop", vol: 0.28 }, { t: 5.5, sfx: "pop", vol: 0.28 }, { t: 7.48, sfx: "chime", vol: 0.32 }],
});

// ---------------------------------------------------------------- s14
escena({
  id: "s14-duermo",
  css: `
    & .s14-hora { left: 0; right: 0; top: 610px; text-align: center; font-size: 150px; color: ${A}; letter-spacing: 0.04em; }
    & .s14-z { font-size: 90px; color: ${C}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s14-luna" d="M970 900 A70 70 0 1 1 900 800 A56 56 0 1 0 970 900 Z" fill="${C}" opacity="0.85" />
          ${rosa("s14-ros", 480, 1330, 1.35, "r-normal")}
        </svg>
        <div class="ab mono s14-hora">23:00</div>
        <div class="ab mano s14-z s14-z1" style="left: 650px; top: 900px">z</div>
        <div class="ab mano s14-z s14-z2" style="left: 710px; top: 830px">z</div>
        <div class="ab mano s14-z s14-z3" style="left: 780px; top: 750px">Z</div>
        <div class="etiqueta s14-et">ROSA, A LAS ONCE</div>`,
  js: `
      tl.fromTo(q(".s14-ros"), { y: 60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      golpe(".s14-hora", 0.8, 2, 0);
      sacudon(0.8, 0.6);
      cara(".s14-ros", "r-normal", "r-duerme", 1.85);
      tl.to(q(".s14-ros"), { rotation: -5, duration: 0.4, ease: "sine.inOut", transformOrigin: "50% 100%" }, 1.85);
      pop(".s14-luna", 1.9, { scale: 0.5 });
      pop(".s14-z1", 2.0, { y: 20 });
      pop(".s14-z2", 2.25, { y: 20 });
      pop(".s14-z3", 2.5, { y: 20 });
      vaiven(".s14-z", "y", -14, 0.45, 2.6);
      tl.to(q(".s14-hora"), { opacity: 0.35, duration: 0.3 }, 1.9);
      pop(".s14-et", 0.3, { y: 20 });`,
  sfx: [{ t: 0.78, sfx: "click", vol: 0.3 }, { t: 1.85, sfx: "chime", vol: 0.2 }, { t: 2.05, sfx: "risas", vol: 0.28, max: 1.4 }, { t: 2.4, sfx: "aplausos", vol: 0.22, max: 1.1 }],
});

// ---------------------------------------------------------------- s15
escena({
  id: "s15-cta",
  css: `
    & .s15-a1 { top: 610px; font-size: 120px; color: ${A}; }
    & .s15-a2 { left: 0; right: 0; top: 750px; text-align: center; font-size: 40px; color: ${C}; letter-spacing: 0.2em; }
    & .s15-b1 { top: 772px; font-size: 150px; }
    & .s15-b2 { top: 924px; font-size: 62px; color: ${A}; }
    & .s15-et { color: ${A}; }
  `,
  html: `
        <div class="capa s15-a">
          <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
            ${persona("s15-p1", 170, 1300, 0.95, V, C)}
            ${persona("s15-p2", 910, 1300, 0.95, R, M)}
            ${agente("s15-age", 540, 1290, 1.15, "a-feliz")}
          </svg>
          <div class="grande s15-a1">AGENTE DE IA</div>
          <div class="ab mono s15-a2">LO HACEMOS EN SCALERICS</div>
        </div>
        <div class="capa s15-b">
          <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
            ${cartel(540, 590, 640, 130, ["Un mensaje a la vez"], 68, "s15-cartel", -2)}
            ${sillaFrente(540, 1330, "s15-silla", 0.75)}
            <g class="s15-tag">${nombre(540, 1330 - 0.75 * 365, "@ . . . . .", 170, 40)}</g>
            ${vasito(620, 1172, "s15-vaso")}
            <path class="s15-humo" d="M620 1088 Q606 1072 620 1056 Q634 1040 620 1026" fill="none" stroke="${C}" stroke-width="5" stroke-linecap="round" opacity="0.6" />
          </svg>
          <div class="grande s15-b1">ETIQUETÁ</div>
          <div class="grande s15-b2">AL QUE TIENE QUE VENIR</div>
        </div>
        <div class="etiqueta s15-et">LE GUARDAMOS UNA SILLA</div>`,
  js: `
      gsap.set(q(".s15-age"), { opacity: 0 });
      tl.fromTo(q(".s15-age"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0.0);
      tl.fromTo(qa(".s15-p1, .s15-p2"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "back.out(1.4)" }, 0.15);
      vaiven(".s15-age .a-brazo-d", "rotation", -14, 0.35, 0.5);
      golpe(".s15-a1", 0.55, 2.2, -1);
      sacudon(0.55, 0.8);
      pop(".s15-a2", 1.6, { y: 20 });
      tl.to(q(".s15-a"), { y: -80, opacity: 0, filter: "blur(8px)", duration: 0.25, ease: "power3.in" }, 2.5);
      gsap.set(q(".s15-b"), { opacity: 0 });
      tl.to(q(".s15-b"), { opacity: 1, duration: 0.01 }, 2.75);
      pop(".s15-cartel", 2.75, { y: -40, rot: -2 });
      dibujar(".s15-silla path", 2.75, 0.5);
      tl.fromTo(qa(".s15-silla rect, .s15-silla path[fill]"), { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, 2.85);
      golpe(".s15-b1", 2.85, 2.4, -2);
      sacudon(2.85, 1.2);
      pop(".s15-b2", 4.0, { y: 20 });
      gsap.set(q(".s15-tag"), { opacity: 0 });
      tl.fromTo(q(".s15-tag"), { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, 4.7);
      gsap.set(q(".s15-vaso"), { opacity: 0 });
      tl.fromTo(q(".s15-vaso"), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, 6.7);
      dibujar(".s15-humo", 7.0, 0.6);
      tl.to(q(".s15-humo"), { y: -8, opacity: 0.2, duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }, 7.6);
      pop(".s15-et", 6.6, { y: 20 });
      tl.to(q(".s15-tag"), { y: -10, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut" }, 5.2);
      tl.to(q(".s15-b1"), { scale: 1.05, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 7.8);`,
  sinSalida: true,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.25 }, { t: 0.52, sfx: "impact-bass-1", vol: 0.32 }, { t: 1.6, sfx: "sparkle", vol: 0.25 }, { t: 2.82, sfx: "impact-bass-2", vol: 0.45 }, { t: 4.7, sfx: "pop", vol: 0.3 }, { t: 6.7, sfx: "chime", vol: 0.3 }],
});

for (const e of E) {
  if (solo && !e.id.startsWith(solo)) continue;
  e.dur = D[e.id];
  escribirEscena(e);
  console.log("escena", e.id, e.dur);
}
