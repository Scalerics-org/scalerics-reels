// Escenas s07 a s12: el visto, la noche ("pasá el lunes"), el GIRO (está solo) y el compañero.
import { C, tito, dueno, sofia, perro, caja, celular, globo, tablero } from "./lib.mjs";
import { tildes } from "./a.mjs";
const { tinta, cielo, nar, tiza, verde } = C;

const zzzCama = (p) => `
  <rect x="140" y="1150" width="800" height="70" rx="20" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
  <ellipse cx="330" cy="1110" rx="150" ry="60" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
  <g transform="translate(330 1060) rotate(-78) scale(0.85)"><g class="${p}-due">${dueno(p + "d")}</g></g>
  <path d="M400 1080 C520 1040 900 1050 960 1110 L980 1300 L380 1300 Z" fill="${nar}" stroke="${tinta}" stroke-width="5" stroke-linejoin="round" />
  <path d="M440 1150 C560 1120 800 1120 940 1160" stroke="${tiza}" stroke-width="5" fill="none" opacity="0.6" />
  <rect x="100" y="1300" width="900" height="40" rx="10" fill="${tinta}" />`;

export default [
  // ---------------------------------------------------------------- s07
  {
    id: "s07-visto",
    css: `
    [data-composition-id="s07-visto"] .s07-sello { top: 1170px; }
    [data-composition-id="s07-visto"] .s07-sello b { font-size: 70px; transform: rotate(-7deg); }
    [data-composition-id="s07-visto"] .s07-piz { position: absolute; left: 190px; top: 1060px; width: 700px; height: 150px; border-radius: 22px; background: ${tinta}; border: 6px solid ${tiza}; display: flex; flex-direction: column; justify-content: center; padding-left: 36px; }
    [data-composition-id="s07-visto"] .s07-piz .a { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.2em; color: ${nar}; white-space: nowrap; }
    [data-composition-id="s07-visto"] .s07-piz .b { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 52px; color: ${tiza}; text-transform: uppercase; white-space: nowrap; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-a">
            <g transform="translate(140 0)"><g class="s07-cel">${celular("Calzados del barrio", "en línea", nar)}
              ${globo("s07-g0", 380, 760, 380, "Hola, ¿tenés estos|championes en 38?", { mio: true, hora: "10:12", tildes: "gris" })}
              ${globo("s07-g1", 560, 930, 200, "¿Hola?", { mio: true, hora: "10:13", tildes: "gris" })}
              <g class="s07-azul">${`<path d="M700 1006 l8 8 l14 -16 M716 1014 l14 -16" stroke="${cielo}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" />`}</g>
              <text class="s07-vt" x="760" y="1080" text-anchor="end" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${cielo}">Visto 10:13</text>
            </g></g>
            <g transform="translate(200 1120) scale(0.82)"><g class="s07-sof">${sofia("s07s")}</g></g>
          </g>
          <g transform="translate(540 610)"><g class="s07-tab">${tablero("s07t", "0", 560)}</g></g>
          <g transform="translate(300 1240) scale(0.7)"><g class="s07-tito">${tito("s07ti")}</g></g>
        </svg>
        <div class="txt sello s07-sello"><b>Me clavó el visto</b></div>
        <div class="s07-piz"><div class="a">EJERCICIO 2</div><div class="b">De noche</div></div>`,
    js: `
      const CLAVO = 0.82, VISTO = 1.36, VISTO2 = 2.46, CERO = 2.91, PROBEMOS = 4.17;
      tl.fromTo(q(".s07-cel"), { y: 60 }, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
      pop(".s07-g1", 0.05, 0.3, 0.6);
      hablar(".s07s-boca", 0, 1.9);
      // "visto": las tildes se ponen azules, Sofía se indigna
      gsap.set([q(".s07-azul"), q(".s07-vt")], { opacity: 0 });
      tl.to([q(".s07-azul"), q(".s07-vt")], { opacity: 1, duration: 0.1 }, VISTO - 0.2);
      tl.to(q(".s07-g1-t"), { opacity: 0, duration: 0.1 }, VISTO - 0.2);
      tl.to(q(".s07s-cejas"), { y: 8, rotation: 0, duration: 0.15 }, CLAVO);
      golpe(".s07-sello", VISTO + 0.05, 2);
      sacudon(VISTO + 0.08, 1);
      // "visto. cero puntos": el tablero
      tl.to(q(".s07-a"), { x: -1100, duration: 0.35, ease: "power3.in" }, VISTO2 - 0.3);
      fuera(".s07-sello", VISTO2 - 0.3, 0.2);
      tl.fromTo(q(".s07-tab"), { y: -1300 }, { y: 0, duration: 0.35, ease: "back.out(1.3)", immediateRender: true }, VISTO2 - 0.1);
      tl.fromTo(q(".s07t-num"), { opacity: 0, scale: 2.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: true }, CERO - 0.08);
      sacudon(CERO + 0.06, 1.3);
      tl.fromTo(q(".s07-tito"), { y: 1500 }, { y: 0, duration: 0.35, ease: "power3.out", immediateRender: true }, VISTO2);
      hablar(".s07ti-boca", VISTO2, DUR - 0.2);
      tl.to(q(".s07-tito"), { rotation: -6, svgOrigin: "0 300", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CERO + 0.1);
      // "probemos de noche": la pizarra
      tl.to(q(".s07-tab"), { scale: 0.8, y: -40, transformOrigin: "50% 0%", duration: 0.3 }, PROBEMOS - 0.1);
      tl.fromTo(q(".s07-piz"), { x: 1100 }, { x: 0, duration: 0.35, ease: "power3.out", immediateRender: true }, PROBEMOS);
      tl.to(q(".s07-tito"), { y: 140, duration: 0.3 }, PROBEMOS);`,
    sfx: [
      { t: 0.05, sfx: "pop", vol: 0.28 },
      { t: 1.15, sfx: "click-soft", vol: 0.3 },
      { t: 1.4, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 2.3, sfx: "whoosh", vol: 0.28 },
      { t: 2.9, sfx: "error", vol: 0.3, max: 0.6 },
      { t: 2.92, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 4.2, sfx: "whoosh-short", vol: 0.28 },
      { t: 4.6, sfx: "riser", vol: 0.2, max: 1.0 },
    ],
  },
  // ---------------------------------------------------------------- s08
  {
    id: "s08-once",
    css: `
    [data-composition-id="s08-once"] .s08-hora { position: absolute; left: 50px; top: 600px; width: 330px; height: 150px; border-radius: 24px; border: 6px solid ${nar}; background: ${tinta}; display: flex; align-items: center; justify-content: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 84px; color: ${tiza}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(140 0)"><g class="s08-cel">${celular("Calzados del barrio", "últ. vez hoy 19:30", nar)}
            ${globo("s08-g0", 560, 760, 200, "¿Hola?", { mio: true, hora: "10:13", tildes: "azul" })}
            <rect x="440" y="880" width="200" height="44" rx="22" fill="${tinta}" opacity="0.12" />
            <text x="540" y="911" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${tinta}">HOY</text>
            ${globo("s08-g1", 400, 950, 360, "Son las once.|¿Me guardás un|par para mañana?", { mio: true, hora: "23:00", tildes: "gris" })}
          </g></g>
          <g transform="translate(200 1120) scale(0.82)"><g class="s08-sof">${sofia("s08s")}</g></g>
          <path class="s08-luz" d="M290 1180 L120 980 L460 980 Z" fill="${tiza}" opacity="0.12" />
        </svg>
        <div class="s08-hora">23:00</div>
        <div class="zoc s08-z"><div class="tab">23:00</div><div class="tit">Sofía insiste</div></div>`,
    js: `
      const ONCE = 0.45, MANANA = 1.91;
      tl.fromTo(q(".s08-cel"), { y: 900 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s08-sof"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      hablar(".s08s-boca", 0, 2.4);
      golpe(".s08-hora", ONCE + 0.05, 1.8);
      tl.to(q(".s08-hora"), { rotation: -4, duration: 0.1, yoyo: true, repeat: 5 }, ONCE + 0.3);
      pop(".s08-g1", 0.95, 0.3, 0.7);
      tl.to(q(".s08-g1"), { y: -10, duration: 0.2, yoyo: true, repeat: 1 }, MANANA);
      zocalos([[".s08-z", 0.2]]);
      tl.fromTo(q(".s08-luz"), { opacity: 0.05 }, { opacity: 0.16, duration: 0.5, yoyo: true, repeat: 4, ease: "sine.inOut" }, 0);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.25 },
      { t: 0.45, sfx: "click", vol: 0.3 },
      { t: 0.9, sfx: "typing", vol: 0.22, max: 0.6 },
      { t: 1.25, sfx: "pop", vol: 0.28 },
    ],
  },
  // ---------------------------------------------------------------- s09
  {
    id: "s09-gruno",
    css: `
    [data-composition-id="s09-gruno"] .s09-grr { position: absolute; left: 470px; top: 640px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; color: ${tiza}; -webkit-text-stroke: 4px ${tinta}; paint-order: stroke fill; transform: rotate(-6deg); white-space: nowrap; }
    [data-composition-id="s09-gruno"] .s09-sello { top: 640px; }
    [data-composition-id="s09-gruno"] .s09-sello b { font-size: 110px; transform: rotate(-5deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-cama">${zzzCama("s09")}</g>
          <g transform="translate(900 1020) rotate(10)"><g class="s09-cel">
            <path d="M0 0 L-120 -160 L120 -160 Z" fill="${tiza}" opacity="0.14" />
            <rect x="-40" y="-70" width="80" height="140" rx="14" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <rect x="-28" y="-52" width="56" height="94" rx="6" fill="${cielo}" />
            <circle cx="34" cy="-64" r="22" fill="${nar}" stroke="${tinta}" stroke-width="4" />
            <text x="34" y="-55" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="${tinta}">2</text>
          </g></g>
          <g class="s09-ondas" stroke="${tiza}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M420 960 l20 -24 l12 22 l20 -24 l12 22" /><path d="M430 1010 l24 -16 l8 22 l24 -16" />
          </g>
          <g transform="translate(110 1090) scale(0.85)"><g class="s09-tito">${tito("s09t")}</g></g>
        </svg>
        <div class="s09-grr">GRRR...</div>
        <div class="txt sello s09-sello"><b>Grave</b></div>
        <div class="zoc s09-z"><div class="tab">Ejercicio 2</div><div class="tit">«Pasá el lunes»</div></div>`,
    js: `
      const LUNES = 0.29, GRUNO = 1.7, GRAVE = 2.9;
      tl.fromTo(q(".s09-cama"), { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      gsap.set(q(".s09d-ojos"), { scaleY: 0.12, transformOrigin: "50% 50%" });
      gsap.set(q(".s09d-zzz"), { opacity: 1 });
      tl.fromTo(q(".s09d-zzz"), { y: 0 }, { y: -20, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      hablar(".s09d-boca", 0, 0.9);
      tl.to(q(".s09-cel"), { x: 8, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, 0);
      dibujar(".s09-ondas path", LUNES - 0.1, 0.25);
      pop(".s09-grr", LUNES, 0.25, 0.5);
      tl.to(q(".s09-grr"), { x: 8, duration: 0.05, yoyo: true, repeat: 11, ease: "none" }, LUNES + 0.25);
      fuera([q(".s09-grr"), ...qa(".s09-ondas path")], GRUNO - 0.2, 0.2);
      zocalos([[".s09-z", 0.15]]);
      // "gruñó": Tito asoma por la izquierda, en voz baja
      tl.fromTo(q(".s09-tito"), { x: -400 }, { x: 0, duration: 0.35, ease: "power3.out" }, GRUNO - 0.2);
      hablar(".s09t-boca", GRUNO, 3.4);
      tl.fromTo(q(".s09t-brazo"), { rotation: -40, svgOrigin: "96 130" }, { rotation: -40, svgOrigin: "96 130", duration: 0.01 }, 0);
      tl.to(q(".s09t-cejas"), { y: -8, duration: 0.2 }, GRUNO + 0.8);
      golpe(".s09-sello", GRAVE + 0.05, 2.2);
      sacudon(GRAVE + 0.08, 1.2);`,
    sfx: [
      { t: 0.0, sfx: "notification", vol: 0.22 },
      { t: 0.3, sfx: "glitch-1", vol: 0.2, max: 0.4 },
      { t: 1.55, sfx: "whoosh-short", vol: 0.28 },
      { t: 2.95, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s10
  {
    id: "s10-solo",
    css: `
    [data-composition-id="s10-solo"] .s10-para { top: 600px; font-size: 130px; }
    [data-composition-id="s10-solo"] .s10-malo { left: 470px; right: auto; width: 600px; top: 790px; }
    [data-composition-id="s10-solo"] .s10-malo b { font-size: 54px; transform: rotate(5deg); color: ${tiza}; border-color: ${tiza}; }
    [data-composition-id="s10-solo"] .s10-solo { top: 610px; font-size: 128px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-campo">
            <path class="s10-luz" d="M560 560 L380 1360 L920 1360 Z" fill="${tiza}" opacity="0.14" />
            <ellipse cx="650" cy="1350" rx="200" ry="34" fill="${tinta}" opacity="0.25" />
            <g transform="translate(650 1060) scale(0.85)"><g class="s10-due">${dueno("s10d")}</g></g>
          </g>
          <g transform="translate(200 1080) scale(0.9)"><g class="s10-tito">${tito("s10t")}</g></g>
        </svg>
        <div class="txt grito s10-para">¡Pará!</div>
        <div class="txt sello s10-malo"><b>No es malo</b></div>
        <div class="txt grito nar s10-solo">Está solo</div>
        <div class="zoc s10-z"><div class="tab">Diagnóstico</div><div class="tit">El dueño está solo</div></div>`,
    js: `
      const MIRA = 0.81, ESTE = 1.83, MALO = 2.95, SOLO = 3.62;
      golpe(".s10-para", 0.08, 1.8);
      tl.fromTo(q(".s10t-brazo"), { rotation: 0, svgOrigin: "96 130" }, { rotation: -50, svgOrigin: "96 130", duration: 0.2, ease: "back.out(2)" }, 0);
      hablar(".s10t-boca", 0, 4.3);
      tl.fromTo(q(".s10-tito"), { x: -200 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      fuera(".s10-para", MIRA - 0.1, 0.2);
      // "mirá bien": se prende la luz sobre el dueño, solo en el medio del campo
      tl.fromTo(q(".s10-luz"), { opacity: 0 }, { opacity: 0.16, duration: 0.4 }, MIRA);
      tl.fromTo(q(".s10-due"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, MIRA);
      tl.to(q(".s10t-brazo"), { rotation: 10, svgOrigin: "96 130", duration: 0.3 }, MIRA);
      zocalos([[".s10-z", ESTE]]);
      golpe(".s10-malo", MALO, 1.8);
      // "solo": zoom lento al dueño, que baja la cabeza
      tl.to(q(".s10-campo"), { scale: 1.18, transformOrigin: "650px 1100px", duration: 1.1, ease: "power2.out" }, SOLO - 0.3);
      tl.to(q(".s10-tito"), { x: -260, opacity: 0.5, duration: 0.5 }, SOLO - 0.3);
      fuera(".s10-malo", SOLO - 0.2, 0.2);
      pop(".s10-solo", SOLO, 0.4, 0.7);
      tl.to(q(".s10-due"), { y: 14, rotation: -4, svgOrigin: "0 100", duration: 0.5 }, SOLO);
      tl.to(qa(".s10d-ojos"), { y: 8, duration: 0.4 }, SOLO);`,
    sfx: [
      { t: 0.05, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 0.85, sfx: "click", vol: 0.25 },
      { t: 2.95, sfx: "pop", vol: 0.3 },
      { t: 3.6, sfx: "chime", vol: 0.25, max: 1.0 },
    ],
  },
  // ---------------------------------------------------------------- s11
  {
    id: "s11-todo",
    css: `
    [data-composition-id="s11-todo"] .s11-lbl { position: absolute; width: 300px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.16em; color: ${tiza}; text-shadow: 0 3px 0 ${tinta}; white-space: nowrap; }
    [data-composition-id="s11-todo"] .s11-tamb { top: 600px; font-size: 104px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 1030) scale(0.95)"><g class="s11-due">${dueno("s11d")}</g></g>
          <g class="s11-i1"><g transform="translate(210 880) scale(0.42)">${caja("s11c")}</g></g>
          <g transform="translate(870 800)"><g class="s11-i2">
            <rect x="-90" y="-10" width="100" height="80" fill="${nar}" stroke="${tinta}" stroke-width="5" /><rect x="-10" y="-10" width="100" height="80" fill="${nar}" stroke="${tinta}" stroke-width="5" />
            <rect x="-50" y="-90" width="100" height="80" fill="${nar}" stroke="${tinta}" stroke-width="5" />
            <path d="M-60 -50 H40 M-80 30 H0 M0 30 H80" stroke="${tinta}" stroke-width="4" />
          </g></g>
          <g transform="translate(200 1180)"><g class="s11-i3">
            <rect x="-90" y="-50" width="180" height="96" rx="10" fill="${verde}" stroke="${tinta}" stroke-width="5" transform="rotate(-8)" />
            <rect x="-80" y="-40" width="180" height="96" rx="10" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <circle cx="10" cy="8" r="26" fill="none" stroke="${tinta}" stroke-width="5" /><text x="10" y="20" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="34" fill="${tinta}">$</text>
          </g></g>
          <g transform="translate(870 1160)"><g class="s11-i4">
            <circle cx="0" cy="0" r="74" fill="${tinta}" stroke="${tiza}" stroke-width="6" />
            <path d="M0 0 V-48 M0 0 L34 20" stroke="${tiza}" stroke-width="8" stroke-linecap="round" />
            <circle cx="62" cy="-62" r="30" fill="${tiza}" stroke="${tinta}" stroke-width="4" /><circle cx="76" cy="-72" r="26" fill="${tinta}" />
          </g></g>
          <g transform="translate(540 852)"><g class="s11-cel">
            <rect x="-60" y="-104" width="120" height="208" rx="20" fill="${tiza}" stroke="${tinta}" stroke-width="6" />
            <rect x="-44" y="-80" width="88" height="140" rx="8" fill="${cielo}" />
            <circle cx="56" cy="-96" r="40" fill="${nar}" stroke="${tinta}" stroke-width="5" />
            <text x="56" y="-82" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="36" fill="${tinta}">+9</text>
          </g></g>
        </svg>
        <div class="s11-lbl s11-l1" style="left:60px;top:900px">CAJA</div>
        <div class="s11-lbl s11-l2" style="left:720px;top:900px">REPONER</div>
        <div class="s11-lbl s11-l3" style="left:50px;top:1250px">COBRAR</div>
        <div class="s11-lbl s11-l4" style="left:720px;top:1250px">23:00</div>
        <div class="txt grito nar s11-tamb">¿Y también?</div>
        <div class="zoc s11-z"><div class="tab">Un solo dueño</div><div class="tit">Hace todo él</div></div>`,
    js: `
      const CAJA = 0.43, REPONE = 1.08, COBRA = 1.97, ONCE = 2.84, DORMIR = 4.09, PEDIR = 5.34, TAMBIEN = 6.23;
      tl.fromTo(q(".s11-due"), { scale: 0.92, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      zocalos([[".s11-z", 0.1]]);
      [[".s11-i1", ".s11-l1", CAJA], [".s11-i2", ".s11-l2", REPONE], [".s11-i3", ".s11-l3", COBRA], [".s11-i4", ".s11-l4", ONCE]].forEach(([i, l, t], k) => {
        pop(i, t - 0.08, 0.35, 0.3);
        pop(l, t, 0.3, 0.6);
        tl.to(q(".s11-due"), { x: k % 2 ? 30 : -30, duration: 0.2, ease: "power2.out" }, t);
        tl.to(q(i), { y: -10, duration: 0.35, yoyo: true, repeat: Math.floor((DUR - t) / 0.35) - 2, ease: "sine.inOut" }, t + 0.35);
      });
      tl.to(q(".s11-due"), { x: 0, duration: 0.3 }, ONCE + 0.4);
      // "dormir": se le cierran los ojos
      tl.to(q(".s11d-ojos"), { scaleY: 0.15, transformOrigin: "50% 50%", duration: 0.3 }, DORMIR);
      tl.to(q(".s11d-zzz"), { opacity: 1, duration: 0.2 }, DORMIR + 0.1);
      tl.fromTo(q(".s11d-zzz"), { y: 0 }, { y: -18, duration: 0.4, yoyo: true, repeat: 2, ease: "sine.inOut" }, DORMIR + 0.1);
      tl.to(q(".s11d-boca"), { scaleY: 3, scaleX: 0.7, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1 }, DORMIR - 0.1);
      // "pedir que conteste también": el celular le cae encima y lo despierta
      tl.to(q(".s11d-zzz"), { opacity: 0, duration: 0.1 }, PEDIR);
      gsap.set(q(".s11-cel"), { opacity: 0 });
      tl.fromTo(q(".s11-cel"), { opacity: 1, y: -500, rotation: -30 }, { opacity: 1, y: 0, rotation: 8, duration: 0.35, ease: "power3.in", immediateRender: false }, PEDIR);
      tl.to(q(".s11d-ojos"), { scaleY: 1.3, duration: 0.1 }, PEDIR + 0.35);
      tl.to(q(".s11-due"), { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.1, yoyo: true, repeat: 1 }, PEDIR + 0.35);
      sacudon(PEDIR + 0.36, 1);
      tl.to(q(".s11-cel"), { rotation: -6, duration: 0.06, yoyo: true, repeat: 11, ease: "none" }, PEDIR + 0.45);
      golpe(".s11-tamb", TAMBIEN, 1.8);
      sacudon(TAMBIEN + 0.04, 0.8);`,
    sfx: [
      { t: 0.45, sfx: "pop", vol: 0.28 },
      { t: 1.1, sfx: "pop", vol: 0.28 },
      { t: 2.0, sfx: "chime", vol: 0.22, max: 0.5 },
      { t: 2.85, sfx: "click", vol: 0.28 },
      { t: 4.1, sfx: "whoosh-short", vol: 0.2 },
      { t: 5.7, sfx: "impact-bass-1", vol: 0.38, max: 0.5 },
      { t: 5.8, sfx: "notification", vol: 0.28 },
      { t: 6.25, sfx: "impact-bass-2", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s12
  {
    id: "s12-companero",
    css: `
    [data-composition-id="s12-companero"] .s12-comp { top: 600px; font-size: 104px; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-correa">
            <path class="s12-c1" d="M220 800 C320 640 520 900 640 760 C720 670 820 700 860 760" stroke="${nar}" stroke-width="16" fill="none" stroke-linecap="round" />
            <ellipse class="s12-c2" cx="890" cy="800" rx="46" ry="60" fill="none" stroke="${nar}" stroke-width="16" />
            <rect class="s12-c3" x="196" y="788" width="44" height="34" rx="8" fill="${tiza}" stroke="${tinta}" stroke-width="5" />
            <path class="s12-x" d="M180 660 L940 920 M940 660 L180 920" stroke="${tinta}" stroke-width="22" fill="none" stroke-linecap="round" />
          </g>
          <g transform="translate(330 1040) scale(0.9)"><g class="s12-due">${dueno("s12d")}</g></g>
          <g class="s12-hueco">
            <rect x="620" y="900" width="240" height="430" rx="110" fill="${tiza}" fill-opacity="0.12" stroke="${tiza}" stroke-width="7" stroke-dasharray="22 16" />
            <text x="740" y="1170" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="190" fill="${tiza}">?</text>
          </g>
          <g transform="translate(960 1180) scale(0.62)"><g class="s12-perro">${perro("s12p")}</g></g>
        </svg>
        <div class="txt grito s12-comp">Un compañero</div>
        <div class="zoc s12-z"><div class="tab">Receta</div><div class="tit">Nada de correa</div></div>`,
    js: `
      const CORREA = 0.91, NECESITA = 1.68, COMPANERO = 2.55;
      dibujar(".s12-c1", 0.0, 0.5);
      pop(".s12-c2", 0.35, 0.3, 0.5);
      pop(".s12-c3", 0.05, 0.25, 0.5);
      dibujar(".s12-x", CORREA, 0.3);
      sacudon(CORREA + 0.3, 0.8);
      zocalos([[".s12-z", CORREA - 0.2]]);
      tl.fromTo(q(".s12-due"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.1);
      tl.to(q(".s12-correa"), { y: -80, opacity: 0, duration: 0.3 }, NECESITA - 0.2);
      // "necesita": el lugar vacío al lado del dueño
      pop(".s12-hueco", NECESITA, 0.4, 0.6);
      tl.to(q(".s12-hueco"), { scale: 1.04, transformOrigin: "740px 1115px", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, NECESITA + 0.4);
      tl.to(q(".s12d-cejas"), { y: -10, duration: 0.2 }, NECESITA + 0.2);
      tl.to(qa(".s12d-ojos"), { x: 10, duration: 0.2 }, NECESITA + 0.2);
      // el perro se ofrece, ilusionado
      tl.fromTo(q(".s12-perro"), { x: 300 }, { x: 0, duration: 0.35, ease: "back.out(1.6)" }, NECESITA + 0.3);
      cola(".s12p-cola", NECESITA + 0.6, 4);
      pop(".s12-comp", COMPANERO, 0.4, 0.6);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
      { t: 0.95, sfx: "glitch-1", vol: 0.22, max: 0.3 },
      { t: 1.2, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
      { t: 1.7, sfx: "pop", vol: 0.28 },
      { t: 2.55, sfx: "sparkle", vol: 0.3, max: 0.8 },
    ],
  },
];
