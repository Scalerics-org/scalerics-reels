// Las escenas de "Terapia de pareja". `node escenas.mjs` escribe compositions/sNN-*.html y sus
// .sfx.json (con las duraciones de tiempos.md); después `node armar.mjs`.
// Los tiempos de cada beat son relativos a la escena (ver tiempos.md).
import { C, B, W, T, S, M, clienta, duenio, terapeuta, agente, sofaAtras, sofaFrente, sillonAtras, sillonFrente, lampara, planta, cuadro, reloj, corazon, escribirEscena, duraciones } from "./lib-escenas.mjs";

const D = duraciones();
const solo = process.argv[2]; // node escenas.mjs s03  → escribe solo esa
const E = [];
const escena = (e) => E.push(e);

// ---------------------------------------------------------------- s01
escena({
  id: "s01-escucha",
  css: `
    & .s01-t1 { top: 610px; font-size: 128px; }
    & .s01-t2 { top: 740px; font-size: 150px; color: ${T}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${sofaAtras(90, 1440, 900)}
          ${clienta("s01-cli", 540, 1450, 1.5, "c-triste")}
          <rect x="70" y="1440" width="940" height="90" rx="26" fill="${T}" stroke="${C}" stroke-width="6" />
        </svg>
        <div class="grande s01-t1">YA NO ME</div>
        <div class="grande s01-t2">ESCUCHA</div>`,
  js: `
      vaiven(".s01-cli", "y", -6, 0.6, 0);
      tl.fromTo(q(".s01-cli .c-lagrima"), { y: 0, opacity: 1 }, { y: 60, opacity: 0, duration: 0.9, ease: "power1.in" }, 0.2);
      tl.fromTo(q(".s01-cli .c-lagrima"), { y: 0, opacity: 1 }, { y: 60, opacity: 0, duration: 0.9, ease: "power1.in", immediateRender: false }, 1.15);
      golpe(".s01-t1", 0.72, 2.2, -2);
      golpe(".s01-t2", 1.02, 2.6, 2);
      sacudon(1.02, 1);
      tl.to(q(".escenario"), { scale: 1.06, duration: 1.2, ease: "power1.out", transformOrigin: "50% 60%" }, 1.0);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.25 }, { t: 0.68, sfx: "impact-bass-1", vol: 0.3 }, { t: 0.98, sfx: "impact-bass-2", vol: 0.4 }],
});

// ---------------------------------------------------------------- s02
escena({
  id: "s02-consultorio",
  css: `
    & .s02-placa { left: 566px; top: 706px; width: 288px; height: 176px; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 62px; line-height: 0.95; color: ${C}; white-space: normal; }
    & .s02-tag { position: absolute; padding: 8px 18px 6px; border-radius: 8px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.18em; }
    & .s02-tag-c { left: 800px; top: 900px; background: ${T}; color: #fff6ea; }
    & .s02-tag-d { left: 452px; top: 900px; background: ${C}; color: ${B}; }
    & .s02-tag-t { left: 112px; top: 932px; background: ${S}; color: ${B}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <ellipse cx="560" cy="1450" rx="520" ry="56" fill="${W}" />
          ${lampara(86, 1440)}
          ${cuadro(560, 700, 300, 188)}
          ${reloj(250, 720, 64, "s02")}
          ${sillonAtras(240, 1270)}
          ${terapeuta("s02-ter", 240, 1280, 0.82, "t-calma")}
          ${sillonFrente(240, 1270)}
          <rect class="s02-libreta" x="244" y="1150" width="96" height="120" rx="8" fill="${M}" stroke="${C}" stroke-width="5" transform="rotate(-12 292 1210)" />
          ${sofaAtras(470, 1270, 520)}
          ${duenio("s02-due", 560, 1280, 0.78, "d-cansado")}
          ${clienta("s02-cli", 892, 1280, 0.78, "c-enojo")}
          ${sofaFrente(470, 1270, 520)}
        </svg>
        <div class="ab mano s02-placa">Espacio seguro</div>
        <div class="s02-tag s02-tag-c">FLOR</div>
        <div class="s02-tag s02-tag-d">EL DUEÑO</div>
        <div class="s02-tag s02-tag-t">LA DOCTORA</div>
        <div class="etiqueta s02-e1" style="top: 1500px">SESIÓN N° 1</div>`,
  js: `
      tl.fromTo(q(".s02-min"), { rotation: 0 }, { rotation: 300, svgOrigin: "250 720", duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".s02-hora"), { rotation: 0 }, { rotation: 25, svgOrigin: "250 720", duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".m-luz"), { opacity: 0.06 }, { opacity: 0.14, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      pop(".s02-e1", 0.05, { y: 20 });
      // "respiren": los dos inflan el pecho

      [".s02-due", ".s02-cli"].forEach((s, i) => {
        tl.to(q(s), { scale: 1.06, y: -14, svgOrigin: "0 0", duration: 0.7, ease: "sine.inOut" }, 0.45 + i * 0.05);
        tl.to(q(s), { scale: 1, y: 0, svgOrigin: "0 0", duration: 0.8, ease: "sine.inOut" }, 1.2 + i * 0.05);
      });
      fuera(".s02-e1", 2.0);
      // "espacio seguro": el cuadro se vuelve un bordado
      tl.to(q(".m-cuadro path"), { opacity: 0, duration: 0.2 }, 2.3);
      tl.to(q(".m-cuadro circle"), { opacity: 0, duration: 0.2 }, 2.3);
      escribir(".s02-placa", 2.4, 0.6);
      // "contame, Flor": la doctora la señala con la cabeza y aparecen los nombres
      tl.to(q(".s02-ter"), { rotation: 8, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, 3.2);
      tl.to(q(".s02-libreta"), { rotation: 8, svgOrigin: "292 1210", duration: 0.3 }, 3.2);
      pop(".s02-tag-t", 0.9, { y: 20 });
      pop(".s02-tag-d", 1.3, { y: 20 });
      pop(".s02-tag-c", 3.95, { y: 30, scale: 0.4 });
      cara(".s02-cli", "c-enojo", "c-triste", 3.95);
      tl.to(q(".s02-cli"), { y: -16, duration: 0.15, yoyo: true, repeat: 1 }, 3.95);
      vaiven(".s02-ter", "y", -5, 0.8, 0.1);`,
  sfx: [{ t: 0.4, sfx: "whoosh", vol: 0.2 }, { t: 2.4, sfx: "sparkle", vol: 0.25 }, { t: 0.9, sfx: "click-soft", vol: 0.25 }, { t: 1.3, sfx: "click-soft", vol: 0.25 }, { t: 3.95, sfx: "pop", vol: 0.35 }],
});

// ---------------------------------------------------------------- s03
const tilde = (cls, col = C) => `<svg class="${cls}" width="44" height="24" viewBox="0 0 44 24" style="display:inline-block; vertical-align: -3px"><path d="M2 12 L10 20 L24 4 M18 16 L22 20 L38 4" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
escena({
  id: "s03-visto",
  css: `
    & .s03-cel { left: 250px; top: 600px; width: 580px; height: 820px; border: 8px solid ${C}; border-radius: 58px; background: ${W}; overflow: hidden; }
    & .s03-head { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: ${B}; border-bottom: 4px solid ${C}; }
    & .s03-avatar { position: absolute; left: 34px; top: 26px; width: 68px; height: 68px; border-radius: 50%; background: ${S}; border: 4px solid ${C}; }
    & .s03-nombre { position: absolute; left: 120px; top: 22px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; color: ${C}; }
    & .s03-estado { position: absolute; left: 120px; top: 68px; font-size: 28px; color: ${S}; }
    & .s03-g { position: absolute; padding: 16px 24px 12px; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; line-height: 1.15; white-space: nowrap; }
    & .s03-g small { display: block; text-align: right; font-family: "IBM Plex Mono", monospace; font-size: 28px; font-weight: 500; margin-top: 4px; }
    & .s03-yo { right: 24px; background: ${M}; color: ${B}; border-bottom-right-radius: 6px; }
    & .s03-el { left: 24px; background: ${C}; color: ${B}; border-bottom-left-radius: 6px; }
    & .s03-m1 { top: 160px; }
    & .s03-m2 { top: 330px; }
    & .s03-m3 { top: 600px; }
    & .s03-dots { position: absolute; left: 24px; top: 330px; padding: 22px 26px; border-radius: 24px; background: ${C}; display: flex; gap: 12px; }
    & .s03-dots i { display: block; width: 16px; height: 16px; border-radius: 50%; background: ${B}; }
    & .s03-dia { position: absolute; left: 0; right: 0; top: 510px; text-align: center; }
    & .s03-dia span { padding: 6px 18px 4px; border-radius: 8px; background: ${B}; color: ${C}; font-size: 28px; }
    & .s03-sello { left: 300px; top: 1060px; font-size: 92px; }
    & .s03-nota { left: 0; right: 0; top: 1300px; text-align: center; font-size: 96px; color: ${T}; }
  `,
  html: `
        <div class="ab s03-cel">
          <div class="s03-head"><div class="s03-avatar"></div><div class="s03-nombre">El local</div><div class="mono s03-estado s03-st1">EN LÍNEA</div><div class="mono s03-estado s03-st2" style="opacity:0">ÚLT. VEZ: HACE 3 DÍAS</div></div>
          <div class="s03-g s03-yo s03-m1">¡Hola! ¿Tienen talle M?<small>10:14 ${tilde("s03-t1")}</small></div>
          <div class="s03-dots"><i></i><i></i><i></i></div>
          <div class="s03-g s03-yo s03-m2">¿Hola? ¿Hay alguien?<small>10:31 ${tilde("s03-t2")}</small></div>
          <div class="s03-dia mono"><span>JUEVES</span></div>
          <div class="s03-g s03-el s03-m3">sí<small>18:02</small></div>
        </div>
        <div class="sello s03-sello">EN VISTO</div>
        <div class="ab mano s03-nota">¡tres días después!</div>`,
  js: `
      pop(".s03-cel", 0, { y: 80, scale: 0.9 });
      pop(".s03-m1", 0.09, { x: 40, y: 20 });
      // "no me contesta": escribe... y se arrepiente
      pop(".s03-dots", 0.55, { x: -30 });
      qa(".s03-dots i").forEach((el, i) => tl.fromTo(el, { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.6 + i * 0.08));
      fuera(".s03-dots", 1.25, 0.12);
      pop(".s03-m2", 1.4, { x: 40, y: 20 });
      // "visto": los tildes se pintan y cae el sello
      tl.to(qa(".s03-t1 path, .s03-t2 path"), { stroke: "${T}", duration: 0.1 }, 2.2);
      tl.to(qa(".s03-t1, .s03-t2"), { scale: 1.5, duration: 0.12, yoyo: true, repeat: 1 }, 2.2);
      golpe(".s03-sello", 2.3, 2.6, -10);
      sacudon(2.3, 0.8);
      tl.to(q(".s03-st1"), { opacity: 0, duration: 0.1 }, 3.2);
      tl.to(q(".s03-st2"), { opacity: 1, duration: 0.1 }, 3.2);
      fuera(".s03-sello", 3.25, 0.2);
      pop(".s03-dia", 3.7, { y: 10 });
      pop(".s03-m3", 4.49, { x: -40, scale: 0.5 });
      golpe(".s03-nota", 4.35, 1.8, -4);`,
  sfx: [{ t: 0.09, sfx: "click-soft", vol: 0.3 }, { t: 0.6, sfx: "typing", vol: 0.25, max: 0.6 }, { t: 1.4, sfx: "click-soft", vol: 0.3 }, { t: 2.26, sfx: "impact-bass-1", vol: 0.4 }, { t: 4.35, sfx: "notification", vol: 0.35 }],
});

// ---------------------------------------------------------------- s04
escena({
  id: "s04-liquidacion",
  css: `
    & .s04-t1 { top: 620px; font-size: 104px; }
    & .s04-t2 { top: 730px; font-size: 128px; color: ${M}; }
    & .s04-noti { left: 110px; top: 640px; width: 860px; padding: 30px 36px 32px; }
    & .s04-noti .mono { font-size: 30px; color: ${T}; }
    & .s04-noti .tit { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 74px; color: ${B}; line-height: 1; margin-top: 14px; }
    & .s04-noti .cuerpo { font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; color: ${B}; margin-top: 12px; }
    & .s04-sello { left: 70px; top: 1000px; font-size: 64px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-uno">
            <rect x="120" y="1330" width="840" height="140" rx="10" fill="${W}" stroke="${C}" stroke-width="6" />
            <path d="M120 1370 H960" stroke="${C}" stroke-width="4" opacity="0.5" />
            ${duenio("s04-due", 540, 1360, 1.3, "d-grita")}
          </g>
          ${clienta("s04-cli", 800, 1500, 1.05, "c-enojo")}
        </svg>
        <div class="grande s04-t1">¡ESTABA EN EL</div>
        <div class="grande s04-t2">MOSTRADOR!</div>
        <div class="ab papel s04-noti"><div class="mono">NOTIFICACIÓN · EL LOCAL</div><div class="tit">¡LIQUIDACIÓN TOTAL!</div><div class="cuerpo">Hola Flor, ¡te extrañamos!</div></div>
        <div class="sello s04-sello">SOLO EN LIQUIDACIÓN</div>`,
  js: `
      gsap.set(q(".s04-cli"), { x: 400 });
      tl.fromTo(q(".s04-uno"), { x: -500 }, { x: 0, duration: 0.25, ease: "back.out(1.6)" }, 0);
      golpe(".s04-t1", 0.25, 2, -2);
      golpe(".s04-t2", 0.55, 2.6, 2);
      sacudon(0.55, 1.2);
      vaiven(".s04-due", "rotation", 3, 0.12, 0.6);
      // corte: entra ella
      tl.to([q(".s04-uno"), q(".s04-t1"), q(".s04-t2")], { x: -900, opacity: 0, duration: 0.25, ease: "power3.in" }, 1.2);
      tl.to(q(".s04-cli"), { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 1.35);
      pop(".s04-noti", 1.95, { y: -120, scale: 0.9 });
      tl.to(q(".s04-noti"), { rotation: -2, duration: 0.2 }, 2.3);
      golpe(".s04-sello", 2.7, 2.4, -7);
      sacudon(2.7, 1);
      cara(".s04-cli", "c-enojo", "c-ruedo", 2.75);`,
  sfx: [{ t: 0.0, sfx: "whoosh-short", vol: 0.3 }, { t: 0.5, sfx: "impact-bass-1", vol: 0.4 }, { t: 1.95, sfx: "notification", vol: 0.4 }, { t: 2.66, sfx: "impact-bass-2", vol: 0.4 }],
});

// ---------------------------------------------------------------- s05
escena({
  id: "s05-libreta",
  css: `
    & .s05-hoja { left: 150px; top: 640px; width: 780px; height: 780px; transform: rotate(-3deg); }
    & .s05-tit { position: absolute; left: 56px; top: 64px; font-size: 54px; color: ${T}; }
    & .s05-l { position: absolute; left: 56px; font-size: 68px; color: ${B}; }
    & .s05-l1 { top: 200px; } & .s05-l2 { top: 300px; } & .s05-l3 { top: 400px; }
    & .s05-yel { position: absolute; left: 330px; top: 560px; font-size: 120px; color: ${T}; }
  `,
  html: `
        <div class="ab papel s05-hoja">
          <svg class="full" style="width:780px;height:780px" viewBox="0 0 780 780" aria-hidden="true">
            ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M30 ${180 + i * 100} H750" stroke="${S}" stroke-width="3" />`).join("")}
            <path d="M40 0 V780" stroke="${T}" stroke-width="3" opacity="0.6" />
            ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${90 + i * 86}" cy="0" r="16" fill="none" stroke="${B}" stroke-width="6" />`).join("")}
            <path class="s05-sub" d="M56 486 Q300 470 560 488" fill="none" stroke="${T}" stroke-width="7" stroke-linecap="round" />
            <path class="s05-flecha" d="M220 640 Q260 560 320 620 M300 590 L322 622 L284 630" fill="none" stroke="${T}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="mano s05-tit">Flor y el local · sesión 1</div>
          <div class="mano s05-l s05-l1">· la deja en visto</div>
          <div class="mano s05-l s05-l2">· tarda tres días</div>
          <div class="mano s05-l s05-l3">· solo liquidaciones</div>
          <div class="mano s05-yel">¿y él?</div>
        </div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-lapiz"><g transform="translate(300 860) rotate(30)">
            <rect x="-14" y="-200" width="28" height="170" fill="${M}" stroke="${C}" stroke-width="5" />
            <rect x="-14" y="-226" width="28" height="26" fill="${T}" stroke="${C}" stroke-width="5" />
            <path d="M-14 -30 L0 6 L14 -30 Z" fill="${C}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />
          </g></g>
        </svg>
        <div class="etiqueta" style="top: 1470px">NOTAS DE LA DOCTORA</div>`,
  js: `
      pop(".s05-hoja", 0, { y: 60, rot: -3 });
      escribir(".s05-tit", 0, 0.5);
      // "ajá": el lápiz golpetea
      tl.fromTo(q(".s05-lapiz"), { rotation: 0 }, { rotation: -8, svgOrigin: "300 860", duration: 0.12, yoyo: true, repeat: 3 }, 0.1);
      const linea = (s, t, d, x0, y0, x1) => {
        escribir(s, t, d);
        tl.fromTo(q(".s05-lapiz"), { x: x0, y: y0 }, { x: x1, y: y0, duration: d, ease: "none", immediateRender: false }, t);
      };
      linea(".s05-l1", 1.0, 0.5, -60, 40, 360);
      linea(".s05-l2", 1.55, 0.45, -60, 140, 330);
      linea(".s05-l3", 2.05, 0.5, -60, 240, 410);
      dibujar(".s05-sub", 2.6, 0.3);
      golpe(".s05-yel", 2.15, 2.2, -6);
      dibujar(".s05-flecha", 2.5, 0.4);
      tl.to(q(".s05-lapiz"), { x: 500, y: 420, duration: 0.4, ease: "power2.inOut" }, 2.6);
      tl.to(q(".s05-hoja"), { rotation: -1, duration: 0.8, ease: "sine.inOut" }, 3.0);`,
  sfx: [{ t: 0.1, sfx: "click-soft", vol: 0.3 }, { t: 0.35, sfx: "click-soft", vol: 0.3 }, { t: 1.0, sfx: "typing", vol: 0.2, max: 1.5 }, { t: 2.13, sfx: "pop", vol: 0.4 }],
});

// ---------------------------------------------------------------- s06
const tarjeta = (cls, x, y, label, icono) => `<div class="ab papel s06-tar ${cls}" style="left:${x}px; top:${y}px">
          <svg width="250" height="130" viewBox="0 0 250 130" aria-hidden="true" style="display:block; margin: 14px auto 0">${icono}</svg>
          <div class="mono s06-lab">${label}</div></div>`;
const ink = `fill="none" stroke="${B}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
escena({
  id: "s06-solo",
  css: `
    & .s06-t1 { top: 610px; font-size: 150px; }
    & .s06-t1 span { color: ${T}; }
    & .s06-tar { width: 280px; height: 210px; }
    & .s06-lab { text-align: center; font-size: 30px; color: ${B}; margin-top: 4px; }
    & .s06-hora { left: 760px; top: 1390px; font-size: 64px; font-family: "Lexend", sans-serif; font-weight: 900; color: ${M}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${duenio("s06-due", 540, 1500, 1.25, "d-grita")}
        </svg>
        <div class="grande s06-t1">ESTOY <span>SOLO</span></div>
        ${tarjeta("s06-a", 40, 830, "MOSTRADOR", `<rect x="30" y="50" width="190" height="70" rx="6" ${ink} /><path d="M20 50 H230" ${ink} /><rect x="150" y="16" width="50" height="34" rx="4" ${ink} />`)}
        ${tarjeta("s06-b", 760, 830, "CAJA", `<rect x="50" y="40" width="150" height="80" rx="8" ${ink} /><rect x="76" y="10" width="98" height="30" rx="4" ${ink} /><path d="M80 66 H100 M120 66 H140 M160 66 H170 M80 92 H170" ${ink} />`)}
        ${tarjeta("s06-c", 40, 1080, "PROVEEDOR", `<rect x="40" y="62" width="80" height="60" ${ink} /><rect x="130" y="62" width="80" height="60" ${ink} /><rect x="85" y="6" width="80" height="56" ${ink} /><path d="M80 62 V80 M170 62 V80 M125 6 V24" ${ink} />`)}
        ${tarjeta("s06-d", 760, 1080, "WHATSAPP", `<rect x="90" y="4" width="70" height="120" rx="12" ${ink} /><path d="M180 30 Q200 64 180 98 M200 16 Q230 64 200 112 M70 30 Q50 64 70 98" ${ink} /><path d="M112 40 Q104 56 116 70 Q128 72 134 62 Q122 60 112 40 Z" fill="${B}" />`)}
        <div class="ab s06-hora">23:00</div>`,
  js: `
      golpe(".s06-t1", 0.3, 2.6, -2);
      sacudon(0.3, 1.3);
      vaiven(".s06-due", "rotation", 2.5, 0.14, 0.4);
      pop(".s06-a", 1.45, { x: -80, rot: -6 });
      pop(".s06-b", 2.25, { x: 80, rot: 5 });
      pop(".s06-c", 2.85, { x: -80, rot: 4 });
      pop(".s06-d", 3.95, { x: 80, rot: -5 });
      // las tarjetas tiemblan cada vez más
      [".s06-a", ".s06-b", ".s06-c"].forEach((s, i) => tl.to(q(s), { rotation: i % 2 ? 4 : -4, duration: 0.1, yoyo: true, repeat: 15, ease: "none" }, 3.3 + i * 0.03));
      tl.to(q(".s06-d"), { x: 8, duration: 0.05, yoyo: true, repeat: 21, ease: "none" }, 4.05);
      golpe(".s06-hora", 4.6, 2.2, -6);
      tl.to(q(".s06-t1"), { y: -14, scale: 0.92, duration: 0.3 }, 1.3);`,
  sfx: [{ t: 0.27, sfx: "impact-bass-2", vol: 0.45 }, { t: 1.45, sfx: "pop", vol: 0.35 }, { t: 2.25, sfx: "pop", vol: 0.35 }, { t: 2.85, sfx: "pop", vol: 0.35 }, { t: 4.0, sfx: "notification", vol: 0.4 }, { t: 4.6, sfx: "impact-bass-1", vol: 0.35 }],
});

// ---------------------------------------------------------------- s07
escena({
  id: "s07-novela",
  css: `
    & .s07-post { width: 400px; padding: 22px 26px; background: ${C}; color: ${B}; font-size: 52px; box-shadow: 0 12px 0 rgba(20, 10, 6, 0.4); white-space: normal; line-height: 1.02; }
    & .s07-p1 { left: 60px; top: 640px; } & .s07-p2 { left: 560px; top: 700px; } & .s07-p3 { left: 300px; top: 880px; }
    & .s07-tvlab { left: 470px; top: 1110px; width: 560px; text-align: center; font-size: 34px; color: ${M}; }
    & .s07-drama { left: 520px; top: 700px; width: 380px; text-align: center; font-size: 84px; color: ${T}; }
  `,
  html: `
        <div class="ab mano s07-post s07-p1">"estaba en el mostrador"</div>
        <div class="ab mano s07-post s07-p2">"no vi el mensaje"</div>
        <div class="ab mano s07-post s07-p3">"pasá el lunes"</div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-tv">
            <path d="M690 650 L620 580 M800 650 L880 570" ${`fill="none" stroke="${C}" stroke-width="6" stroke-linecap="round"`} />
            <rect x="490" y="650" width="520" height="430" rx="40" fill="${W}" stroke="${C}" stroke-width="7" />
            <rect x="520" y="680" width="380" height="370" rx="40" fill="${S}" />
            <circle cx="955" cy="740" r="22" fill="none" stroke="${C}" stroke-width="5" />
            <circle cx="955" cy="820" r="22" fill="none" stroke="${C}" stroke-width="5" />
            <path d="M940 900 H970 M940 930 H970 M940 960 H970" stroke="${C}" stroke-width="5" stroke-linecap="round" />
            <g class="s07-pareja">
              <circle cx="606" cy="930" r="30" fill="${B}" /><path d="M566 1050 Q566 972 606 970 Q646 972 646 1050 Z" fill="${B}" />
              <circle cx="814" cy="922" r="32" fill="${B}" /><path d="M772 1050 Q772 966 814 964 Q856 966 856 1050 Z" fill="${B}" />
              <g transform="translate(710 900) scale(0.55)">${corazon(T)}</g>
            </g>
          </g>
          ${clienta("s07-cli", 300, 1500, 1.15, "c-ruedo")}
        </svg>
        <div class="ab mano s07-drama">¡Nooo!</div>
        <div class="ab mono s07-tvlab">LA NOVELA DE LAS 21:00</div>`,
  js: `
      vaiven(".s07-cli", "y", -6, 0.5, 0);
      pop(".s07-p1", 0.05, { rot: -4, y: -40 });
      pop(".s07-p2", 0.5, { rot: 5, y: -40 });
      pop(".s07-p3", 0.8, { rot: -2, y: -40 });
      [[".s07-p1", -4], [".s07-p2", 5], [".s07-p3", -2]].forEach(([s, r], i) => tl.fromTo(q(s), { y: 0, rotation: r, opacity: 1 }, { y: -900, rotation: 20, opacity: 0, duration: 0.35, ease: "power3.in", immediateRender: false }, 1.85 + i * 0.05));
      pop(".s07-tv", 2.3, { scale: 0.5, y: 80 });
      cara(".s07-cli", "c-ruedo", "c-enojo", 2.38);
      tl.fromTo(q(".s07-pareja"), { x: 0 }, { x: 12, duration: 0.1, yoyo: true, repeat: 9 }, 2.6);
      golpe(".s07-drama", 2.85, 2, -8);
      pop(".s07-tvlab", 2.55, { y: 20 });
      cara(".s07-cli", "c-enojo", "c-triste", 3.9);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.3 }, { t: 0.5, sfx: "pop", vol: 0.3 }, { t: 0.8, sfx: "pop", vol: 0.3 }, { t: 1.85, sfx: "whoosh", vol: 0.25 }, { t: 2.3, sfx: "glitch-1", vol: 0.25 }, { t: 2.82, sfx: "impact-bass-1", vol: 0.35 }],
});

// ---------------------------------------------------------------- s08
const mitad = (lado) => `<path d="M0 -32 C0 -44 ${10 * lado} -57 ${26 * lado} -56 C${56 * lado} -54 ${60 * lado} -6 0 34 L-8 14 L6 -2 L-6 -16 Z" fill="${T}" stroke="${C}" stroke-width="5" stroke-linejoin="round" />`;
escena({
  id: "s08-verdad",
  css: `
    & .s08-tic { left: 700px; top: 640px; font-size: 64px; color: ${C}; }
    & .s08-tac { left: 760px; top: 720px; font-size: 64px; color: ${M}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${reloj(540, 740, 100, "s08")}
          <g class="s08-uno">
            ${sillonAtras(540, 1460)}
            ${terapeuta("s08-ter", 540, 1500, 1.3, "t-calma")}
          </g>
          ${clienta("s08-cli", 790, 1500, 1.15, "c-sorpresa")}
          <g class="s08-cor"><g transform="translate(790 720) scale(2.2)"><g class="s08-ci">${mitad(-1)}</g><g class="s08-cd">${mitad(1)}</g></g></g>
        </svg>
        <div class="ab mano s08-tic">tic...</div>
        <div class="ab mano s08-tac">tac...</div>`,
  js: `
      tl.fromTo(q(".s08-min"), { rotation: 0 }, { rotation: 120, svgOrigin: "540 740", duration: 2.6, ease: "steps(10)" }, 0);
      pop(".s08-tic", 0.3, { x: -20 });
      pop(".s08-tac", 0.9, { x: -20 });
      // baja los lentes: se viene la verdad
      tl.to(q(".s08-ter .t-lentes"), { y: 22, duration: 0.25, ease: "power2.inOut" }, 0.55);
      cara(".s08-ter", "t-calma", "t-ceja", 0.6);
      tl.to(q(".s08-uno"), { scale: 1.08, svgOrigin: "540 1500", duration: 2.2, ease: "power1.inOut" }, 0.2);
      // "que no me quiere": corte a ella y el corazón se parte
      tl.to([q(".s08-uno"), q(".s08-reloj"), q(".s08-tic"), q(".s08-tac")], { x: -560, opacity: 0, duration: 0.25, ease: "power3.in" }, 2.55);
      gsap.set(q(".s08-cli"), { x: 400 });
      tl.to(q(".s08-cli"), { x: -250, duration: 0.3, ease: "back.out(1.4)" }, 2.7);
      cara(".s08-cli", "c-sorpresa", "c-triste", 2.85);
      pop(".s08-cor", 2.75, { scale: 0.4 });
      tl.to(q(".s08-cor"), { x: -250, duration: 0.01 }, 2.75);
      tl.to(q(".s08-ci"), { x: -14, rotation: -18, svgOrigin: "0 34", duration: 0.25, ease: "back.out(2)" }, 3.08);
      tl.to(q(".s08-cd"), { x: 14, rotation: 18, svgOrigin: "0 34", duration: 0.25, ease: "back.out(2)" }, 3.08);
      tl.fromTo(q(".s08-cli .c-lagrima"), { y: 0, opacity: 1 }, { y: 50, opacity: 0, duration: 0.8, ease: "power1.in" }, 3.1);
      sacudon(3.08, 0.8);`,
  sfx: [{ t: 0.3, sfx: "click-soft", vol: 0.3 }, { t: 0.9, sfx: "click-soft", vol: 0.3 }, { t: 1.5, sfx: "click-soft", vol: 0.3 }, { t: 2.55, sfx: "whoosh-short", vol: 0.25 }, { t: 3.06, sfx: "glitch-1", vol: 0.3 }],
});

// ---------------------------------------------------------------- s09
escena({
  id: "s09-no-puede",
  css: `
    & .s09-no { top: 620px; font-size: 260px; }
    & .s09-hoja { left: 130px; top: 860px; width: 820px; height: 330px; transform: rotate(-2deg); }
    & .s09-l { position: absolute; left: 60px; font-size: 92px; color: ${B}; }
    & .s09-l1 { top: 40px; } & .s09-l2 { top: 170px; color: ${T}; }
    & .s09-mas { left: 640px; top: 1220px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 72px; color: ${B}; background: ${M}; border-radius: 50%; width: 130px; height: 130px; line-height: 130px; text-align: center; }
  `,
  html: `
        <div class="grande s09-no">NO.</div>
        <div class="ab papel s09-hoja">
          <div class="mano s09-l s09-l1">no la quiere</div>
          <svg class="full" style="width:820px;height:330px" viewBox="0 0 820 330" aria-hidden="true"><path class="s09-tacha" d="M50 100 Q260 84 470 96" fill="none" stroke="${T}" stroke-width="12" stroke-linecap="round" /></svg>
          <div class="mano s09-l s09-l2">él solo no puede</div>
        </div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-silla">
            <path class="s09-sl" d="M430 1480 V1300 Q430 1240 490 1240 H590 Q650 1240 650 1300 V1480" fill="none" stroke="${C}" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 0" />
            <path class="s09-sl" d="M380 1500 V1400 Q380 1370 410 1370 H670 Q700 1370 700 1400 V1500" fill="none" stroke="${C}" stroke-width="7" stroke-linecap="round" />
            <path class="s09-sl" d="M370 1500 H710" fill="none" stroke="${C}" stroke-width="7" stroke-linecap="round" />
          </g>
        </svg>
        <div class="ab s09-mas">+1</div>`,
  js: `
      golpe(".s09-no", 0.05, 2.8, 0);
      sacudon(0.05, 1.4);
      tl.to(q(".s09-no"), { y: -40, opacity: 0, duration: 0.25, ease: "power2.in" }, 0.85);
      pop(".s09-hoja", 0.85, { y: 60, rot: -2 });
      dibujar(".s09-tacha", 1.0, 0.25);
      escribir(".s09-l2", 1.1, 0.5);
      dibujar(".s09-sl", 2.25, 0.5);
      pop(".s09-mas", 2.7, { scale: 0.3 });
      tl.to(q(".s09-mas"), { scale: 1.15, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 3.05);`,
  sfx: [{ t: 0.02, sfx: "impact-bass-2", vol: 0.45 }, { t: 1.0, sfx: "click", vol: 0.3 }, { t: 2.25, sfx: "whoosh", vol: 0.2 }, { t: 2.7, sfx: "ping", vol: 0.35 }],
});

// ---------------------------------------------------------------- s10
escena({
  id: "s10-tercero",
  css: `
    & .s10-t { top: 620px; font-size: 140px; color: ${M}; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-rayos">${Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, b = a + 0.12; return `<path d="M540 1100 L${540 + Math.cos(a) * 1100} ${1100 + Math.sin(a) * 1100} L${540 + Math.cos(b) * 1100} ${1100 + Math.sin(b) * 1100} Z" fill="${i % 2 ? T : M}" opacity="0.16" />`; }).join("")}</g>
          <g class="s10-zoom">${clienta("s10-cli", 540, 1640, 1.9, "c-sorpresa")}</g>
        </svg>
        <div class="grande s10-t">¿UN TERCERO?</div>`,
  entrada: false,
  js: `
      tl.fromTo(q(".s10-rayos"), { rotation: 0 }, { rotation: 30, svgOrigin: "540 1100", duration: DUR, ease: "none" }, 0);
      // triple zoom de telenovela
      tl.set(q(".s10-zoom"), { scale: 1, svgOrigin: "540 1100" }, 0);
      tl.set(q(".s10-zoom"), { scale: 1.12, svgOrigin: "540 1100" }, 0.22);
      tl.set(q(".s10-zoom"), { scale: 1.26, svgOrigin: "540 1100" }, 0.5);
      tl.set(q(".s10-zoom"), { scale: 1.4, svgOrigin: "540 1100" }, 0.78);
      golpe(".s10-t", 0.25, 2.4, -3);
      sacudon(0.25, 1.2);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.35 }, { t: 0.22, sfx: "impact-bass-2", vol: 0.45 }, { t: 0.5, sfx: "impact-bass-1", vol: 0.35 }, { t: 0.78, sfx: "impact-bass-2", vol: 0.4 }],
});

// ---------------------------------------------------------------- s11
escena({
  id: "s11-agente",
  css: `
    & .s11-tag { left: 120px; top: 680px; padding: 12px 24px 8px; border-radius: 10px; background: ${M}; color: ${B}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 56px; white-space: nowrap; }
    & .s11-g { position: absolute; padding: 16px 24px 12px; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; line-height: 1.15; width: 440px; }
    & .s11-q { left: 590px; top: 820px; background: ${C}; color: ${B}; border-bottom-left-radius: 6px; width: auto; white-space: nowrap; }
    & .s11-r { left: 560px; top: 930px; background: ${S}; color: ${B}; border-bottom-right-radius: 6px; }
    & .s11-ya { left: 640px; top: 1100px; font-size: 64px; color: ${M}; }
    & .s11-pill { position: absolute; padding: 10px 20px 8px; border-radius: 10px; border: 4px solid ${C}; color: ${C}; font-size: 32px; }
    & .s11-p1 { left: 650px; top: 1400px; } & .s11-p2 { left: 650px; top: 1476px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${sillonAtras(300, 1370)}
          ${agente("s11-age", 300, 1400, 1.2, "a-ok")}
          ${sillonFrente(300, 1370)}
          <g class="s11-rel">
            <circle cx="820" cy="1270" r="96" fill="${W}" stroke="${C}" stroke-width="7" />
            <path class="s11-h" d="M820 1270 V1218" stroke="${C}" stroke-width="9" stroke-linecap="round" />
            <path class="s11-m" d="M820 1270 V1192" stroke="${M}" stroke-width="6" stroke-linecap="round" />
            <circle cx="820" cy="1270" r="8" fill="${C}" />
            <g class="s11-sol"><circle cx="950" cy="1160" r="26" fill="${M}" /></g>
            <g class="s11-luna"><path d="M690 1150 A30 30 0 1 0 724 1196 A24 24 0 1 1 690 1150 Z" fill="${C}" /></g>
          </g>
        </svg>
        <div class="ab s11-tag">AGENTE DE IA</div>
        <div class="s11-g s11-q">¿Abren el domingo?</div>
        <div class="s11-g s11-r">¡Sí, de 9 a 13! ¿Te reservo uno?</div>
        <div class="ab mano s11-ya">¡al instante!</div>
        <div class="mono s11-pill s11-p1">PRECIOS ${`<svg width="30" height="24" viewBox="0 0 30 24" style="display:inline-block;vertical-align:-2px"><path d="M3 12 L11 20 L27 4" fill="none" stroke="${M}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</div>
        <div class="mono s11-pill s11-p2">HORARIOS ${`<svg width="30" height="24" viewBox="0 0 30 24" style="display:inline-block;vertical-align:-2px"><path d="M3 12 L11 20 L27 4" fill="none" stroke="${M}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</div>`,
  js: `
      tl.fromTo(q(".s11-age"), { y: -700 }, { y: 0, duration: 0.4, ease: "bounce.out" }, 0);
      pop(".s11-tag", 0.45, { scale: 0.4, rot: -4 });
      tl.to(q(".s11-tag"), { rotation: -3, duration: 0.2 }, 0.8);
      vaiven(".s11-age .a-brazo-d", "rotation", -16, 0.3, 0.6);
      pop(".s11-q", 1.0, { x: 60 });
      pop(".s11-r", 1.3, { x: -60 });
      cara(".s11-age", "a-ok", "a-feliz", 1.3);
      golpe(".s11-ya", 2.6, 2, -6);
      // "a cualquier hora": el reloj da vueltas, sale el sol y la luna
      pop(".s11-rel", 3.2, { scale: 0.5 });
      tl.fromTo(q(".s11-m"), { rotation: 0 }, { rotation: 1440, svgOrigin: "820 1270", duration: 2.6, ease: "power1.inOut" }, 3.3);
      tl.fromTo(q(".s11-h"), { rotation: 0 }, { rotation: 120, svgOrigin: "820 1270", duration: 2.6, ease: "power1.inOut" }, 3.3);
      tl.fromTo(q(".s11-sol"), { opacity: 1 }, { opacity: 0.2, duration: 0.35, yoyo: true, repeat: 5 }, 3.4);
      tl.fromTo(q(".s11-luna"), { opacity: 0.2 }, { opacity: 1, duration: 0.35, yoyo: true, repeat: 5 }, 3.4);
      tl.to([q(".s11-q"), q(".s11-r"), q(".s11-ya")], { y: -60, opacity: 0, duration: 0.3 }, 3.3);
      pop(".s11-p1", 5.2, { y: 30 });
      pop(".s11-p2", 5.75, { y: 30 });`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.25 }, { t: 0.35, sfx: "impact-bass-1", vol: 0.3 }, { t: 1.0, sfx: "click-soft", vol: 0.3 }, { t: 1.3, sfx: "notification", vol: 0.35 }, { t: 2.6, sfx: "sparkle", vol: 0.3 }, { t: 3.3, sfx: "riser", vol: 0.2, max: 2.4 }, { t: 5.2, sfx: "ping", vol: 0.3 }, { t: 6.05, sfx: "ping", vol: 0.3 }],
});

// ---------------------------------------------------------------- s12
escena({
  id: "s12-pasa",
  css: `
    & .s12-msg { left: 70px; top: 700px; padding: 18px 26px 14px; border-radius: 24px; background: ${C}; color: ${B}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; line-height: 1.15; width: 470px; border-bottom-left-radius: 6px; }
    & .s12-msg .mono { display: block; font-size: 32px; color: ${T}; margin-bottom: 6px; }
    & .s12-sello { left: 560px; top: 640px; font-size: 76px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${agente("s12-age", 260, 1400, 1.0, "a-ok")}
          ${duenio("s12-due", 800, 1420, 1.0, "d-cansado")}
          <path class="s12-flecha" d="M330 990 Q560 860 740 1010" fill="none" stroke="${M}" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 22" />
          <path class="s12-punta" d="M706 1010 L744 1014 L736 976" fill="none" stroke="${M}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="ab s12-msg"><span class="mono">CLIENTE NUEVO</span>¿Me hacés precio por mayor?</div>
        <div class="sello mos s12-sello">PARA ÉL</div>
        <div class="etiqueta" style="top: 1470px">LO IMPORTANTE, A VOS</div>`,
  js: `
      pop(".s12-msg", 0.3, { y: 40 });
      cara(".s12-age", "a-ok", "a-feliz", 0.9);
      tl.fromTo(q(".s12-flecha"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.95);
      tl.fromTo(q(".s12-flecha"), { strokeDashoffset: 0 }, { strokeDashoffset: -104, duration: 2.0, ease: "none" }, 0.95);
      dibujar(".s12-punta", 1.1, 0.2);
      tl.to(q(".s12-msg"), { x: 420, y: 80, scale: 0.85, rotation: 3, duration: 0.6, ease: "power2.inOut" }, 1.5);
      golpe(".s12-sello", 1.98, 2.4, 6);
      cara(".s12-due", "d-cansado", "d-feliz", 2.3);
      tl.to(q(".s12-due"), { y: -20, duration: 0.15, yoyo: true, repeat: 1 }, 2.3);
      vaiven(".s12-age .a-brazo-d", "rotation", -16, 0.3, 0.2);`,
  sfx: [{ t: 0.3, sfx: "notification", vol: 0.35 }, { t: 1.5, sfx: "whoosh", vol: 0.25 }, { t: 1.95, sfx: "impact-bass-1", vol: 0.35 }, { t: 2.3, sfx: "chime", vol: 0.3 }],
});

// ---------------------------------------------------------------- s13
escena({
  id: "s13-importante",
  css: `
    & .s13-dicho { left: 0; right: 0; top: 640px; text-align: center; font-size: 104px; color: ${M}; }
    & .s13-turno { left: 220px; top: 640px; width: 640px; padding: 26px 30px 24px; text-align: center; }
    & .s13-turno .mono { font-size: 30px; color: ${T}; }
    & .s13-turno .mano { font-size: 110px; color: ${B}; margin-top: 8px; }
  `,
  html: `
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${planta(1000, 1500)}
          ${sofaAtras(140, 1330, 800)}
          ${duenio("s13-due", 330, 1340, 1.0, "d-cansado")}
          ${clienta("s13-cli", 750, 1340, 1.0, "c-enojo")}
          ${sofaFrente(140, 1330, 800)}
          <path class="s13-sub" d="M200 790 Q540 770 880 792" fill="none" stroke="${M}" stroke-width="8" stroke-linecap="round" />
          ${[0, 1, 2].map((i) => `<g class="s13-cor s13-cor${i}"><g transform="translate(${700 + i * 70} ${960 - i * 40}) scale(${0.5 + i * 0.12})">${corazon(T)}</g></g>`).join("")}
        </svg>
        <div class="ab mano s13-dicho">cuando sea importante</div>
        <div class="ab papel s13-turno"><div class="mono">PRÓXIMA SESIÓN</div><div class="mano">el jueves</div></div>`,
  js: `
      vaiven(".s13-due", "y", -4, 0.7, 0);
      tl.to(q(".s13-cli"), { rotation: -6, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, 0.2);
      tl.to(q(".s13-cli"), { rotation: 0, svgOrigin: "0 0", duration: 0.3 }, 1.6);
      // "cuando sea importante": él tranquilo
      cara(".s13-due", "d-cansado", "d-feliz", 2.08);
      escribir(".s13-dicho", 2.08, 0.7);
      dibujar(".s13-sub", 2.8, 0.4);
      // "ay": ella se derrite
      cara(".s13-cli", "c-enojo", "c-feliz", 4.1);
      qa(".s13-cor").forEach((el, i) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: 60, scale: 0.4, svgOrigin: (700 + i * 70) + " " + (960 - i * 40) }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, 4.15 + i * 0.18);
        tl.to(el, { y: -120, opacity: 0, duration: 1.4, ease: "power1.in" }, 4.8 + i * 0.18);
      });
      // "eso fue lindo": se acercan
      tl.to(q(".s13-due"), { x: 70, duration: 0.6, ease: "power2.inOut" }, 5.2);
      tl.to(q(".s13-cli"), { x: -90, rotation: -5, svgOrigin: "0 0", duration: 0.6, ease: "power2.inOut" }, 5.2);
      // "seguimos el jueves"
      fuera([q(".s13-dicho"), q(".s13-sub")], 6.2, 0.2);
      pop(".s13-turno", 6.45, { y: -40, rot: -3 });
      tl.to(q(".s13-turno"), { rotation: 2, duration: 0.3 }, 7.1);`,
  sfx: [{ t: 2.08, sfx: "sparkle", vol: 0.3 }, { t: 4.13, sfx: "chime", vol: 0.35 }, { t: 4.2, sfx: "pop", vol: 0.25 }, { t: 4.4, sfx: "pop", vol: 0.25 }, { t: 5.2, sfx: "whoosh-short", vol: 0.2 }, { t: 6.45, sfx: "click", vol: 0.3 }],
});

// ---------------------------------------------------------------- s14
escena({
  id: "s14-cta",
  sinSalida: true,
  css: `
    & .s14-tit { top: 630px; font-size: 100px; color: ${M}; }
    & .s14-sub { left: 0; right: 0; top: 750px; text-align: center; font-size: 34px; color: ${C}; letter-spacing: 0.3em; }
    & .s14-g { position: absolute; padding: 14px 22px 10px; border-radius: 22px; background: ${C}; color: ${B}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; white-space: nowrap; }
    & .s14-g1 { left: 50px; top: 900px; } & .s14-g2 { left: 690px; top: 960px; } & .s14-g3 { left: 70px; top: 1120px; }
    & .s14-hora { left: 760px; top: 1150px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; color: ${M}; }
    & .s14-c1 { top: 640px; font-size: 118px; }
    & .s14-c2 { top: 770px; font-size: 136px; color: ${T}; }
    & .s14-c3 { left: 0; right: 0; top: 930px; text-align: center; font-size: 104px; color: ${M}; }
    & .s14-dos { left: 385px; top: 1090px; padding: 8px 20px 6px; border-radius: 8px; background: ${M}; color: ${B}; font-size: 30px; }
  `,
  html: `
        <div class="capa s14-a">
          <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s14-ondas">
              <path class="s14-o" d="M330 1010 Q290 1080 330 1150" fill="none" stroke="${M}" stroke-width="7" stroke-linecap="round" />
              <path class="s14-o" d="M290 980 Q235 1080 290 1180" fill="none" stroke="${M}" stroke-width="7" stroke-linecap="round" />
              <path class="s14-o" d="M750 1010 Q790 1080 750 1150" fill="none" stroke="${M}" stroke-width="7" stroke-linecap="round" />
              <path class="s14-o" d="M790 980 Q845 1080 790 1180" fill="none" stroke="${M}" stroke-width="7" stroke-linecap="round" />
            </g>
            ${agente("s14-age", 540, 1440, 1.45, "a-feliz")}
          </svg>
          <div class="grande s14-tit">TU AGENTE DE IA</div>
          <div class="ab mono s14-sub">HECHO POR SCALERICS</div>
          <div class="s14-g s14-g1">¿Tenés stock?</div>
          <div class="s14-g s14-g2">¿Hacen envíos?</div>
          <div class="s14-g s14-g3">¿A qué hora abren?</div>
          <div class="ab s14-hora">23:47</div>
        </div>
        <div class="capa s14-b">
          <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
            ${sofaAtras(300, 1370, 480)}
            ${sofaFrente(300, 1370, 480)}
            <g class="s14-avion"><g transform="translate(860 1120) rotate(-20)"><path d="M-60 0 L60 -40 L20 50 L0 14 Z" fill="${C}" stroke="${C}" stroke-width="4" stroke-linejoin="round" /><path d="M0 14 L60 -40" stroke="${B}" stroke-width="4" /></g></g>
          </svg>
          <div class="grande s14-c1">MANDÁSELO</div>
          <div class="grande s14-c2">A TU SOCIO.</div>
          <div class="ab mano s14-c3">Tienen que hablar.</div>
          <div class="ab mono s14-dos">SESIÓN PARA DOS</div>
        </div>`,
  js: `
      // primera parte: el agente que escucha
      tl.fromTo(q(".s14-age"), { y: 600 }, { y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      golpe(".s14-tit", 1.3, 2.2, -2);
      pop(".s14-sub", 1.6, { y: 20 });
      vaiven(".s14-age .a-brazo-d", "rotation", -16, 0.3, 0.5);
      dibujar(".s14-o", 2.7, 0.4);
      tl.fromTo(qa(".s14-o"), { opacity: 1 }, { opacity: 0.3, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 3.1);
      pop(".s14-g1", 3.2, { x: -40 });
      pop(".s14-g2", 3.45, { x: 40 });
      pop(".s14-g3", 3.7, { x: -40 });
      golpe(".s14-hora", 4.4, 2, -6);
      tl.to(q(".s14-a"), { y: -80, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 5.25);
      // el cierre
      gsap.set(q(".s14-b"), { opacity: 0 });
      tl.to(q(".s14-b"), { opacity: 1, duration: 0.01 }, 5.5);
      golpe(".s14-c1", 5.6, 2.4, -2);
      sacudon(5.6, 1);
      golpe(".s14-c2", 6.72, 2.6, 2);
      sacudon(6.72, 1.2);
      tl.fromTo(q(".s14-avion"), { x: -700, y: 300, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 5.7);
      tl.to(q(".s14-avion"), { y: -20, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 6.4);
      pop(".s14-dos", 6.2, { y: 30 });
      escribir(".s14-c3", 7.42, 0.8);
      tl.to(q(".s14-c2"), { scale: 1.06, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 8.4);`,
  sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.25 }, { t: 1.28, sfx: "impact-bass-1", vol: 0.35 }, { t: 2.7, sfx: "sparkle", vol: 0.3 }, { t: 3.2, sfx: "pop", vol: 0.25 }, { t: 3.45, sfx: "pop", vol: 0.25 }, { t: 3.7, sfx: "pop", vol: 0.25 }, { t: 5.58, sfx: "impact-bass-2", vol: 0.45 }, { t: 6.7, sfx: "impact-bass-1", vol: 0.4 }, { t: 7.42, sfx: "chime", vol: 0.3 }],
});

for (const e of E) {
  if (solo && !e.id.startsWith(solo)) continue;
  e.dur = D[e.id];
  escribirEscena(e);
  console.log("escena", e.id, e.dur);
}
