// Genera compositions/sNN-*.html y sus .sfx.json. Correr desde reels/respira-hondo:
//   node partes/escenas.mjs [s01 s02 ...]   (sin argumentos: todas)  y después  node armar.mjs
// Los tiempos salen de assets/voice/palabras.json: w(i) = segundo relativo de la palabra i (índice global).
import { C, ICO, tiempos, escena, notif, planilla, circulo, dueno, mate, laptop } from "./lib.mjs";

const SOLO = process.argv.slice(2);
const E = {};
const N = C.noche;

// ---------------------------------------------------------------- s01 · el gancho
E["s01-gancho"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s01-";
  return {
    css: `[data-composition-id="${id}"] .s01-pill { top: 560px; } [data-composition-id="${id}"] .s01-n1 { top: 600px; } [data-composition-id="${id}"] .s01-n2 { top: 790px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 540, 1150, 230)}</svg>
        <div class="pill s01-pill s01-p1">INHALÁ · <b>4</b></div>
        <div class="pill s01-pill s01-p2">SOSTENÉ · <b>4</b></div>
        ${notif("s01-n1", "wa", "WHATSAPP", "Nuevo pedido", "«¿Me anotás 2 docenas para mañana?»")}
        ${notif("s01-n2", "pl", "PLANILLA", "3 pedidos sin pasar", "Pendiente desde las 19:40", "ahora", "alerta")}`,
    js: `
      caraYa("${p}", "z");
      // cuadro 0: el círculo ya está, a medio inflar
      respira("${p}", 0, 1.4, 0.82, 1.06, "540 1150");
      gsap.set(q(".s01-p1"), { opacity: 1 });
      tl.from(q(".s01-p1"), { y: 20, duration: 0.4, ease: "power2.out" }, 0);
      tl.to(q(".s01-p1"), { opacity: 0, duration: 0.15 }, ${w(2)} - 0.1);
      pop(q(".s01-p2"), ${w(2)});
      vaiven(q(".${p}circ"), 1.45, 0.8, { scale: 1.09, svgOrigin: "540 1150" }, 0.4);
      // el pedido rompe la calma
      cae(q(".s01-n1"), ${w(5)} - 0.05);
      tl.to(q(".s01-p2"), { opacity: 0, duration: 0.1 }, ${w(5)} - 0.05);
      enRojo("${p}", ${w(5)}, 0.45);
      cara("${p}", "s", ${w(7)});
      tiembla(q(".${p}circ"), ${w(5)} + 0.1, 0.5, 0.8);
      cae(q(".s01-n2"), ${w(9)} - 0.12);
      enRojo("${p}", ${w(9)}, 0.9, 0.12);
      tiembla(q(".${p}circ"), ${w(9)}, ${dur} - ${w(9)} - 0.25, 1.8);
      sacudon(${w(9)} + 0.02, 1.4);`,
    sfx: [{ t: 0.02, sfx: "riser", vol: 0.16, max: 1.4 }, { t: w(2), sfx: "chime", vol: 0.2 }, { t: w(5) - 0.05, sfx: "notification", vol: 0.42 }, { t: w(7), sfx: "glitch-1", vol: 0.2, max: 0.4 }, { t: w(9) - 0.12, sfx: "notification", vol: 0.38 }, { t: w(9), sfx: "impact-bass-1", vol: 0.32, max: 0.6 }],
  };
};

// ---------------------------------------------------------------- s02 · bienvenida
E["s02-bienvenida"] = (id) => {
  const { w } = tiempos(id);
  const p = "s02-";
  const est = [[120, 640], [960, 700], [200, 1320], [900, 1300], [80, 980], [1000, 1060], [300, 590], [780, 610]]
    .map(([x, y], i) => `<path class="s02-est" d="M${x} ${y - 14} L${x + 4} ${y - 4} L${x + 14} ${y} L${x + 4} ${y + 4} L${x} ${y + 14} L${x - 4} ${y + 4} L${x - 14} ${y} L${x - 4} ${y - 4} Z" fill="${i % 3 ? C.crema : C.men}"/>`).join("");
  return {
    css: `[data-composition-id="${id}"] .s02-hola { top: 580px; font-size: 96px; }
      [data-composition-id="${id}"] .s02-hora { top: 712px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 54px; letter-spacing: 0.12em; color: ${C.lavc}; text-shadow: 0 5px 0 ${N}; }
      [data-composition-id="${id}"] .s02-pill { top: 1440px; }
      [data-composition-id="${id}"] .s02-pill b { display: inline-block; width: 40px; height: 1.3em; line-height: 1.3em; vertical-align: top; text-align: center; position: relative; }
      [data-composition-id="${id}"] .s02-pill b span { position: absolute; left: 0; right: 0; top: 0; line-height: 1.3em; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${est}
          <g class="s02-luna"><path d="M920 560 A70 70 0 1 1 850 470 A56 56 0 1 0 920 560 Z" fill="${C.crema}" opacity="0.92"/></g>
          ${circulo(p, 540, 1080, 240)}</svg>
        <div class="big s02-hola">Buenas noches</div>
        <div class="big s02-hora">23:00 · SESIÓN NOCTURNA</div>
        <div class="pill s02-pill s02-p1">INHALÁ · <b><span>4</span></b></div>
        <div class="pill s02-pill s02-p2">INHALÁ · <b><span class="s02-d">4</span><span class="s02-d">3</span><span class="s02-d">2</span><span class="s02-d">1</span></b></div>`,
    js: `
      caraYa("${p}", "a");
      gsap.set(q(".s02-p1"), { opacity: 0 });
      gsap.set(q(".s02-p2"), { opacity: 0 });
      respira("${p}", 0, 0.5, 0.55, 0.7, "540 1080");
      qa(".s02-est").forEach((e, i) => { tl.fromTo(e, { opacity: 0, scale: 0.3, svgOrigin: e.getBBox().x + 14 + " " + (e.getBBox().y + 14) }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.1 + i * 0.12);
        tl.to(e, { opacity: 0.3, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.2 + i * 0.17); });
      entra(q(".s02-luna"), 0.15, { y: -60 }, 0.6);
      pop(q(".s02-hola"), 0.05, 0.45, 0.8);
      pop(q(".s02-hora"), ${w(16)} - 0.1, 0.4);
      tl.to(q(".s02-hora"), { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1 }, ${w(16)} + 0.3);
      vaiven(q(".${p}circ"), 0.6, 2.4, { y: -14 }, 0.6);
      // cerrá los ojos
      tl.to([q(".s02-hola"), q(".s02-hora")], { opacity: 0, y: -30, filter: "blur(6px)", duration: 0.4, ease: "power2.in" }, ${w(20)});
      cara("${p}", "z", ${w(22)});
      tl.to(q(".${p}circ"), { y: -80, duration: 0.6, ease: "power2.inOut" }, ${w(20)});
      // inhalá en cuatro: el círculo se infla con la cuenta
      pop(q(".s02-p2"), ${w(23)} - 0.1, 0.35);
      respira("${p}", ${w(23)}, ${w(25)} + 0.7 - ${w(23)}, 0.7, 1.08, "540 1080");
      cuenta(qa(".s02-d"), ${w(23)}, (${w(25)} + 0.5 - ${w(23)}) / 4);`,
    sfx: [{ t: 0.05, sfx: "chime", vol: 0.28 }, { t: w(16) - 0.1, sfx: "click-soft", vol: 0.3 }, { t: w(20), sfx: "whoosh", vol: 0.15, max: 0.6 }, { t: w(23), sfx: "riser", vol: 0.16, max: 1.6 }, { t: w(23) + 0.2, sfx: "sparkle", vol: 0.18 }],
  };
};

// ---------------------------------------------------------------- s03 · pará, pará: las empanadas
E["s03-empanadas"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s03-";
  return {
    css: `[data-composition-id="${id}"] .s03-n1 { top: 560px; }
      [data-composition-id="${id}"] .s03-pl { left: 470px; top: 1010px; width: 560px; transform: rotate(3deg); }
      [data-composition-id="${id}"] .s03-pl .fila span { font-size: 27px; padding: 10px 12px 8px; }
      [data-composition-id="${id}"] .s03-pl .s03-pl-f3 span { background: ${C.dur}; }
      [data-composition-id="${id}"] .s03-pare { top: 790px; font-size: 128px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 540, 1000, 240)}
          <g transform="translate(60 950) scale(1.0)">${dueno(p)}</g>
          <g transform="translate(130 1290) scale(0.74)">${laptop(p)}</g></svg>
        ${notif("s03-n1", "wa", "WHATSAPP · SRA. DE LAS EMPANADAS", "«2 docenas de carne para mañana»", "«¿Me las anotás? Paso a las 12»")}
        ${planilla("s03-pl", [["Pérez", "1 tarta", "listo"], ["Gómez", "3 pizzas", "¿?"], ["Sra. emp.", "2 doc.", "a mano"]], ["CLIENTE", "PEDIDO", "ESTADO"])}
        <div class="big rojo s03-pare">¡PARÁ!</div>`,
    js: `
      caraYa("${p}", "z");
      gsap.set(q(".${p}circ"), { scale: 1.08, svgOrigin: "540 1000", opacity: 0.55 });
      gsap.set(q(".${p}rojo"), { opacity: 0.8 });
      cara("${p}", "s", 0.05);
      tiembla(q(".${p}circ"), 0, 0.7, 1.4);
      entra(q(".${p}dueno"), 0, { y: 520 }, 0.35);
      entra(q(".${p}lap"), 0.08, { y: 400 }, 0.35);
      golpe(q(".s03-pare"), 0.12, -4, 2.2);
      sacudon(${w(27)}, 1.4);
      habla(q(".${p}d-boca"), 0.05, ${dur} - 0.4, "200 254");
      tl.to(q(".s03-pare"), { opacity: 0, scale: 0.7, duration: 0.2 }, ${w(28)} - 0.1);
      cae(q(".s03-n1"), ${w(32)} - 0.15);
      tl.to(q(".${p}d-pup"), { x: 10, y: -12, duration: 0.15 }, ${w(32)});
      tl.set(q(".${p}d-gota"), { opacity: 1 }, ${w(35)});
      tl.fromTo(q(".${p}d-gota"), { y: 0 }, { y: 60, duration: 0.9, ease: "power1.in", immediateRender: false }, ${w(35)});
      // la planilla
      tl.to(q(".${p}circ"), { opacity: 0.25, duration: 0.3 }, ${w(38)});
      entra(q(".s03-pl"), ${w(40)} - 0.25, { x: 600 }, 0.35);
      pop(q(".s03-pl-f3"), ${w(41)} + 0.15, 0.3);
      tl.to(q(".${p}d-pup"), { x: 20, y: 4, duration: 0.15 }, ${w(40)});`,
    sfx: [{ t: 0.0, sfx: "glitch-1", vol: 0.35, max: 0.5 }, { t: 0.12, sfx: "impact-bass-2", vol: 0.35, max: 0.6 }, { t: w(32) - 0.15, sfx: "notification", vol: 0.4 }, { t: w(40) - 0.25, sfx: "whoosh-short", vol: 0.25 }, { t: w(41) + 0.15, sfx: "key-press", vol: 0.35 }],
  };
};

// ---------------------------------------------------------------- s04 · imaginá una playa
E["s04-playa"] = (id) => {
  const { w } = tiempos(id);
  const p = "s04-";
  const ola = (y, k) => `<path class="s04-ola s04-o${k}" d="M-200 ${y} q 70 -34 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0" fill="none" stroke="${k % 2 ? C.crema : C.men}" stroke-width="9" stroke-linecap="round"/>`;
  return {
    css: `[data-composition-id="${id}"] .s04-pl { left: 260px; top: 1060px; width: 560px; transform: rotate(-3deg); }
      [data-composition-id="${id}"] .s04-pl .fila span { font-size: 27px; padding: 10px 12px 8px; }
      [data-composition-id="${id}"] .s04-etq { top: 1480px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s04-clip"><rect x="60" y="560" width="960" height="900" rx="60"/></clipPath></defs>
          <g class="s04-mundo" clip-path="url(#s04-clip)">
            <rect class="s04-mar" x="60" y="1060" width="960" height="420" fill="${C.lav}"/>
            ${ola(1110, 1)}${ola(1180, 2)}${ola(1250, 3)}
            <path class="s04-arena" d="M60 1330 Q300 1270 560 1310 Q820 1350 1020 1290 L1020 1480 L60 1480 Z" fill="${C.dur}" stroke="${N}" stroke-width="7"/>
            <g class="s04-palma"><path class="s04-tronco" d="M850 1330 Q870 1190 820 1060" fill="none" stroke="${N}" stroke-width="16" stroke-linecap="round"/>
              <path class="s04-hoja" d="M820 1060 Q760 1010 690 1040" fill="none" stroke="${C.men}" stroke-width="18" stroke-linecap="round"/>
              <path class="s04-hoja" d="M820 1060 Q880 1000 950 1030" fill="none" stroke="${C.men}" stroke-width="18" stroke-linecap="round"/>
              <path class="s04-hoja" d="M820 1060 Q800 990 740 980" fill="none" stroke="${C.men}" stroke-width="18" stroke-linecap="round"/>
              <path class="s04-hoja" d="M820 1060 Q850 990 910 975" fill="none" stroke="${C.men}" stroke-width="18" stroke-linecap="round"/></g>
          </g>
          <path class="s04-horiz" d="M60 1060 H1020" stroke="${C.crema}" stroke-width="5" opacity="0.6"/>
          ${circulo(p, 540, 1000, 240)}</svg>
        ${planilla("s04-pl", [["Pérez", "1 tarta", "listo"], ["Gómez", "3 pizzas", "¿?"], ["Sra. emp.", "2 doc.", "a mano"]])}
        <div class="etq s04-etq">SONIDO · OLAS DEL MAR</div>`,
    js: `
      caraYa("${p}", "s");
      gsap.set(q(".${p}circ"), { opacity: 0.3, scale: 1, svgOrigin: "540 1000" });
      gsap.set(q(".${p}rojo"), { opacity: 0.7 });
      // soltá la planilla: sale volando
      tl.fromTo(q(".s04-pl"), { x: 0, y: 0, rotation: -3 }, { x: 0, y: 0, rotation: -3, duration: 0.01, immediateRender: true }, 0);
      tl.to(q(".s04-pl"), { x: 820, y: -520, rotation: 50, scale: 0.4, opacity: 0, duration: 0.6, ease: "power3.in" }, ${w(44)});
      tl.to(q(".${p}circ"), { opacity: 1, duration: 0.5 }, ${w(43)});
      enRojo("${p}", ${w(43)}, 0, 0.6);
      cara("${p}", "z", ${w(44)} + 0.2);
      // imaginá una playa: el círculo es el sol
      gsap.set(q(".s04-mundo"), { opacity: 0 });
      gsap.set(q(".s04-horiz"), { opacity: 0 });
      tl.to(q(".${p}circ"), { scale: 0.62, y: -230, svgOrigin: "540 1000", duration: 0.8, ease: "power2.inOut" }, ${w(45)} - 0.2);
      tl.to(q(".s04-mundo"), { opacity: 1, duration: 0.5 }, ${w(47)} - 0.15);
      tl.to(q(".s04-horiz"), { opacity: 0.6, duration: 0.5 }, ${w(47)} - 0.15);
      tl.fromTo(q(".s04-arena"), { y: 200 }, { y: 0, duration: 0.5, ease: "back.out(1.3)", immediateRender: false }, ${w(47)});
      dibujar(q(".s04-tronco"), ${w(47)} + 0.2, 0.4);
      dibujar(qa(".s04-hoja"), ${w(47)} + 0.5, 0.35, 0.08);
      vaiven(q(".s04-palma"), ${w(47)} + 0.9, 2.6, { rotation: 3, svgOrigin: "850 1330" }, 0.7);
      // las olas van... y vienen
      tl.fromTo(qa(".s04-ola"), { x: 0 }, { x: -140, duration: ${w(51)} - ${w(48)}, ease: "sine.inOut", immediateRender: false }, ${w(48)});
      tl.to(qa(".s04-ola"), { x: 0, duration: 0.9, ease: "sine.inOut" }, ${w(51)});
      tl.fromTo(q(".s04-o2"), { y: 0 }, { y: -12, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, ${w(47)});
      pop(q(".s04-etq"), ${w(49)}, 0.4, 0.9);
      vaiven(q(".${p}circ"), ${w(48)}, 2.2, { scale: 0.66, svgOrigin: "540 1000" }, 1.1);`,
    sfx: [{ t: w(44), sfx: "whoosh", vol: 0.28, max: 0.6 }, { t: w(44) + 0.25, sfx: "chime", vol: 0.2 }, { t: w(47), sfx: "sparkle", vol: 0.22 }, { t: w(48), sfx: "whoosh-cinematic", vol: 0.12, max: 1.5 }, { t: w(51), sfx: "whoosh-cinematic", vol: 0.1, max: 1.2 }],
  };
};

// ---------------------------------------------------------------- s05 · como los mensajes: ¿le avisé a Gómez?
E["s05-gomez"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s05-";
  const G = [["«¿Hay de jamón y queso?»", 560, 80], ["«¿A qué hora cierran?»", 660, 330], ["«¿Me pasás precio?»", 760, 120], ["«Hola»", 860, 560], ["«¿Hacen envíos?»", 940, 200]];
  return {
    css: G.map((_, i) => `[data-composition-id="${id}"] .s05-g${i} { top: ${G[i][1]}px; left: ${G[i][2]}px; }`).join("\n") +
      `[data-composition-id="${id}"] .s05-gomez { left: 90px; top: 1000px; width: 900px; white-space: normal; text-align: left; }
       [data-composition-id="${id}"] .s05-checks { position: absolute; right: 28px; bottom: 14px; width: 70px; height: 36px; }
       [data-composition-id="${id}"] .s05-q { position: absolute; left: 110px; top: 1200px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 230px; line-height: 1; color: ${C.rojo}; text-shadow: 0 9px 0 ${N}; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 880, 1300, 105)}
          <g transform="translate(330 1135) scale(0.86)">${dueno(p)}</g></svg>
        ${G.map(([t], i) => `<div class="globo men s05-g${i}">${t}</div>`).join("")}
        <div class="globo s05-gomez"><small>GÓMEZ · HACE 3 HORAS</small>«¿Está pronto lo mío?»
          <svg class="s05-checks" viewBox="0 0 70 36"><path d="M4 18 L16 30 L36 6 M30 26 L34 30 L62 6" fill="none" stroke="#8f86b8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="s05-q">?</div>`,
    js: `
      caraYa("${p}", "z");
      gsap.set(q(".${p}circ"), { opacity: 0 });
      // las olas se vuelven mensajes: entran como una marea
      ${G.map((_, i) => `entra(q(".s05-g${i}"), ${i < 2 ? `0.05 + ${i} * 0.2` : `${w(57)} - 0.2 + ${i - 2} * 0.12`}, { x: 1100 }, 0.45);`).join("\n      ")}
      ${G.map((_, i) => `vaiven(q(".s05-g${i}"), 0.6 + ${i} * 0.1, 1.2, { y: ${i % 2 ? 10 : -10} }, 0.3);`).join("\n      ")}
      // ¿le avisé a Gómez?
      tl.to(qa(".globo.men"), { opacity: 0.35, scale: 0.92, duration: 0.25 }, ${w(58)});
      entra(q(".${p}dueno"), ${w(58)} - 0.15, { y: 500 }, 0.35);
      habla(q(".${p}d-boca"), ${w(58)}, ${dur} - ${w(58)} - 0.3, "200 254");
      pop(q(".s05-gomez"), ${w(61)} - 0.1, 0.35);
      tl.set(q(".${p}d-gota"), { opacity: 1 }, ${w(61)});
      tl.fromTo(q(".${p}d-gota"), { y: 0 }, { y: 70, duration: 1, ease: "power1.in", immediateRender: false }, ${w(61)});
      tl.to(q(".${p}d-cejas"), { y: -14, duration: 0.15 }, ${w(61)});
      golpe(q(".s05-q"), ${w(66)}, 10, 2.4);
      tl.to(q(".${p}circ"), { opacity: 1, duration: 0.2 }, ${w(66)});
      enRojo("${p}", ${w(66)}, 0.9, 0.15);
      cara("${p}", "s", ${w(66)});
      tiembla(q(".${p}circ"), ${w(66)}, 0.5, 1);`,
    sfx: [{ t: 0.05, sfx: "pop", vol: 0.25 }, { t: 0.25, sfx: "pop", vol: 0.22 }, { t: w(57) - 0.2, sfx: "notification", vol: 0.3 }, { t: w(57), sfx: "notification", vol: 0.25 }, { t: w(61) - 0.1, sfx: "ping", vol: 0.3 }, { t: w(66), sfx: "impact-bass-1", vol: 0.3, max: 0.5 }],
  };
};

// ---------------------------------------------------------------- s06 · sostené el aire · tomá un sorbito de tu mate
E["s06-mate"] = (id) => {
  const { w } = tiempos(id);
  const p = "s06-";
  return {
    css: `[data-composition-id="${id}"] .s06-pill { top: 580px; }
      [data-composition-id="${id}"] .s06-pill b { display: inline-block; width: 40px; height: 1.3em; line-height: 1.3em; vertical-align: top; text-align: center; position: relative; }
      [data-composition-id="${id}"] .s06-pill b span { position: absolute; left: 0; right: 0; top: 0; line-height: 1.3em; }
      [data-composition-id="${id}"] .s06-etq { top: 1470px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 470, 1000, 230)}
          <g transform="translate(730 1110) scale(1.35)">${mate(p)}
            <g class="s06-vapor"><path class="s06-v" d="M60 70 q -18 -30 0 -60 t 0 -60" fill="none" stroke="${C.crema}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
              <path class="s06-v" d="M96 64 q 18 -30 0 -60 t 0 -60" fill="none" stroke="${C.crema}" stroke-width="8" stroke-linecap="round" opacity="0.8"/></g></g></svg>
        <div class="pill s06-pill">SOSTENÉ · <b><span class="s06-d">4</span><span class="s06-d">3</span><span class="s06-d">2</span><span class="s06-d">1</span></b></div>
        <div class="etq s06-etq">AL LADO DE LA COMPU · DESDE LAS 19</div>`,
    js: `
      caraYa("${p}", "z");
      gsap.set(q(".${p}rojo"), { opacity: 0.6 });
      enRojo("${p}", 0, 0, 0.5);
      tl.fromTo(q(".${p}circ"), { scale: 0.85, svgOrigin: "470 1000" }, { scale: 1.02, svgOrigin: "470 1000", duration: 0.6, ease: "power2.out", immediateRender: false }, 0);
      pop(q(".s06-pill"), 0.02, 0.35);
      cuenta(qa(".s06-d"), 0.1, 0.42);
      // sostené: el círculo aguanta y tirita apenas
      vaiven(q(".${p}circ"), 0.6, 1.2, { scale: 1.045, svgOrigin: "470 1000" }, 0.15);
      cara("${p}", "a", ${w(70)});
      habla(q(".${p}boca"), ${w(70)}, 1.6, "470 1090");
      tl.set(q(".${p}boca"), { opacity: 1 }, ${w(70)});
      tl.set(q(".${p}boca"), { opacity: 0 }, ${w(75)} + 0.4);
      // el mate
      entra(q(".${p}mate"), ${w(72)} - 0.2, { y: 300 }, 0.4);
      dibujar(qa(".s06-v"), ${w(72)} + 0.2, 0.6, 0.12);
      vaiven(q(".s06-vapor"), ${w(72)} + 0.8, 1.2, { x: 8 }, 0.3);
      tl.to(q(".${p}mate"), { rotation: -10, svgOrigin: "80 200", duration: 0.25, yoyo: true, repeat: 1 }, ${w(75)});
      pop(q(".s06-etq"), ${w(75)} - 0.2, 0.35, 0.9);`,
    sfx: [{ t: 0.02, sfx: "chime", vol: 0.22 }, { t: w(72) - 0.2, sfx: "pop", vol: 0.3 }, { t: w(72) + 0.2, sfx: "sparkle", vol: 0.15 }, { t: w(75), sfx: "click-soft", vol: 0.25 }],
  };
};

// ---------------------------------------------------------------- s07 · está helado · copiar, pegar
E["s07-copiar"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s07-";
  const copos = [[40, 60], [130, 30], [150, 150], [20, 170], [90, 230]].map(([x, y]) => `<path class="s07-copo" d="M${x - 16} ${y} H${x + 16} M${x} ${y - 16} V${y + 16} M${x - 11} ${y - 11} L${x + 11} ${y + 11} M${x + 11} ${y - 11} L${x - 11} ${y + 11}" stroke="${C.crema}" stroke-width="5" stroke-linecap="round"/>`).join("");
  const filas = [["Sra. emp.", "2 doc.", "copiado"], ["Sra. emp.", "2 doc.", "pegado"], ["Sra. emp.", "2 doc.", "copiado"], ["Sra. emp.", "2 doc.", "pegado"]];
  return {
    css: `[data-composition-id="${id}"] .s07-k1 { left: 150px; top: 590px; } [data-composition-id="${id}"] .s07-k2 { left: 520px; top: 590px; }
      [data-composition-id="${id}"] .s07-k3 { left: 520px; top: 590px; }
      [data-composition-id="${id}"] .s07-pl { left: 150px; top: 880px; width: 780px; }
      [data-composition-id="${id}"] .s07-hel { top: 1360px; font-size: 92px; }
      [data-composition-id="${id}"] .s07-gr { top: 1330px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: 0.2em; color: ${C.lavc}; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(360 760) scale(2)"><g class="s07-matebox">${mate(p)}<g class="s07-hielo">${copos}</g></g></g>
          <g transform="translate(416 1272) scale(0.62)"><g class="s07-chico">${dueno(p)}</g></g></svg>
        <div class="big lav s07-hel">MATE: HELADO</div>
        <div class="tecla ancha s07-k1"><span>CTRL</span></div>
        <div class="tecla s07-k2"><span>C</span></div>
        <div class="tecla s07-k3"><span>V</span></div>
        ${planilla("s07-pl", filas)}
`,
    js: `
      // está helado
      tl.fromTo(q(".s07-matebox"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      gsap.set(qa(".s07-copo"), { opacity: 0 });
      qa(".s07-copo").forEach((c, i) => pop(c, ${w(77)} + i * 0.06, 0.3));
      golpe(q(".s07-hel"), ${w(77)} + 0.05, -3, 2);
      tiembla(q(".s07-matebox"), ${w(77)}, 0.5, 0.8);
      tl.to([q(".s07-matebox"), q(".s07-hel")], { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in" }, ${w(78)} - 0.3);
      // copiar... pegar
      gsap.set(qa(".tecla"), { opacity: 0 });
      gsap.set(q(".s07-pl"), { opacity: 0 });
      ${filas.map((_, i) => `gsap.set(q(".s07-pl-f${i + 1}"), { opacity: 0 });`).join(" ")}
      tl.to(q(".s07-pl"), { opacity: 1, duration: 0.2 }, ${w(78)} - 0.1);
      pop(q(".s07-k1"), ${w(78)} - 0.1, 0.25);
      entra(q(".${p}chico"), ${w(78)}, { y: 300 }, 0.35);
      tl.set(q(".${p}d-parp"), { y: 14 }, ${w(78)});
      const P = [${w(78)}, ${w(79)}, ${w(80)}, ${w(81)}];
      P.forEach((t, i) => {
        const k = q(i % 2 ? ".s07-k3" : ".s07-k2");
        tl.set(qa(".s07-k2, .s07-k3"), { opacity: 0 }, t - 0.05);
        tl.set(k, { opacity: 1 }, t - 0.05);
        tl.fromTo([q(".s07-k1"), k], { y: 0 }, { y: 18, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.in", immediateRender: false }, t);
        pop(q(".s07-pl-f" + (i + 1)), t + 0.08, 0.25, 0.8);
        tl.to(q(".${p}chico"), { rotation: i % 2 ? 3 : -3, svgOrigin: "200 470", duration: 0.1 }, t);
      });
`,
    sfx: [{ t: w(77), sfx: "glitch-2", vol: 0.25, max: 0.4 }, { t: w(78), sfx: "key-press", vol: 0.4 }, { t: w(79), sfx: "key-press", vol: 0.4 }, { t: w(80), sfx: "key-press", vol: 0.4 }, { t: w(81), sfx: "key-press", vol: 0.4 }],
  };
};

// ---------------------------------------------------------------- s08 · repetí conmigo: om
E["s08-om"] = (id) => {
  const { w } = tiempos(id);
  const p = "s08-";
  return {
    css: `[data-composition-id="${id}"] .s08-pill { top: 580px; }
      [data-composition-id="${id}"] .s08-om { top: 1360px; font-size: 150px; font-weight: 300; letter-spacing: 0.08em; color: ${C.lavc}; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${[0, 1, 2].map((i) => `<circle class="s08-onda" cx="540" cy="1000" r="260" fill="none" stroke="${C.men}" stroke-width="6"/>`).join("")}
          ${circulo(p, 540, 1000, 230)}
          <g class="s08-loto" transform="translate(540 1300)">
            <path class="s08-p" d="M0 0 Q-40 -60 0 -110 Q40 -60 0 0 Z" fill="${C.lav}" stroke="${N}" stroke-width="6"/>
            <path class="s08-p" d="M0 0 Q-90 -30 -100 -90 Q-30 -80 0 0 Z" fill="${C.lavc}" stroke="${N}" stroke-width="6"/>
            <path class="s08-p" d="M0 0 Q90 -30 100 -90 Q30 -80 0 0 Z" fill="${C.lavc}" stroke="${N}" stroke-width="6"/></g></svg>
        <div class="pill s08-pill">REPETÍ CONMIGO</div>
        <div class="big s08-om">Ommm</div>`,
    js: `
      caraYa("${p}", "z");
      gsap.set(qa(".s08-onda"), { opacity: 0 });
      tl.fromTo(q(".${p}circ"), { scale: 0.9, svgOrigin: "540 1000" }, { scale: 1, svgOrigin: "540 1000", duration: 0.5, ease: "sine.out" }, 0);
      pop(q(".s08-pill"), 0.02, 0.35);
      qa(".s08-p").forEach((e, i) => { gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: 0, svgOrigin: "0 0" }, { opacity: 1, scale: 1, svgOrigin: "0 0", duration: 0.4, ease: "back.out(2)", immediateRender: false }, 0.2 + i * 0.12); });
      vaiven(q(".${p}circ"), 0.5, 1.0, { y: -10 }, 0.5);
      // om: ondas que salen del círculo
      pop(q(".s08-om"), ${w(84)} - 0.05, 0.5, 0.8);
      tl.to(q(".s08-om"), { scale: 1.1, duration: 0.8, ease: "sine.out" }, ${w(84)} + 0.4);
      qa(".s08-onda").forEach((o, i) => { tl.fromTo(o, { opacity: 0.8, scale: 0.9, svgOrigin: "540 1000" }, { opacity: 0, scale: 1.9, svgOrigin: "540 1000", duration: 1.0, ease: "sine.out", immediateRender: false }, ${w(84)} + i * 0.25); });
      tl.to(q(".${p}circ"), { scale: 1.06, svgOrigin: "540 1000", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${w(84)});`,
    sfx: [{ t: 0.02, sfx: "chime", vol: 0.2 }, { t: w(84) + 0.1, sfx: "sparkle", vol: 0.2 }],
  };
};

// ---------------------------------------------------------------- s09 · om... ¡el turno! ¡el stock!
E["s09-alarma"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s09-";
  const extra = [["pago", "COBROS", "Recordarle el pago a Ramírez", ""], ["wa", "WHATSAPP · 7 CHATS", "«¿Hay turno el sábado?»", ""], ["pl", "PLANILLA", "Pedidos sin pasar", ""]];
  return {
    css: `[data-composition-id="${id}"] .s09-n1 { top: 560px; } [data-composition-id="${id}"] .s09-n2 { top: 740px; }
      ${extra.map((_, i) => `[data-composition-id="${id}"] .s09-x${i} { top: ${920 + i * 150}px; }`).join(" ")}`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 540, 960, 250)}
          <g transform="translate(340 1110) scale(1)"><g class="s09-sentado">
            <path d="M-20 420 Q200 330 420 420 Q420 470 200 470 Q-20 470 -20 420 Z" fill="${C.dur}" stroke="${N}" stroke-width="7"/>
            ${dueno(p)}
            <g transform="translate(110 330) scale(0.35)">${laptop(p)}</g></g></g></svg>
        ${notif("s09-n1", "ag", "AGENDA", "Turno de mañana 9:00", "Mandale el recordatorio a Laura", "ahora", "alerta")}
        ${notif("s09-n2", "st", "TIENDA ONLINE", "Stock desactualizado", "Vendiste 3 en el local y siguen online", "ahora", "alerta")}
        ${extra.map(([ico, app, tit], i) => notif("s09-x" + i, ico, app, tit, "", "ahora")).join("")}`,
    js: `
      caraYa("${p}", "z");
      gsap.set(q(".${p}d-ojos"), { opacity: 0 });
      gsap.set(q(".${p}d-cerrados"), { opacity: 1 });
      gsap.set(q(".${p}circ"), { opacity: 0.7 });
      entra(q(".s09-sentado"), 0, { y: 200 }, 0.4);
      habla(q(".${p}d-boca"), 0.05, 0.8, "200 254");
      vaiven(q(".${p}circ"), 0, 1.1, { scale: 1.04, svgOrigin: "540 960" }, 0.5);
      // ¡el recordatorio!
      tl.set(q(".${p}d-ojos"), { opacity: 1 }, ${w(87)} - 0.05);
      tl.set(q(".${p}d-cerrados"), { opacity: 0 }, ${w(87)} - 0.05);
      tl.set(q(".${p}d-parp"), { opacity: 0 }, ${w(87)} - 0.05);
      tl.to(q(".${p}d-cejas"), { y: -16, duration: 0.1 }, ${w(87)});
      habla(q(".${p}d-boca"), ${w(87)}, ${dur} - ${w(87)} - 0.3, "200 254");
      tl.fromTo(q(".s09-sentado"), { y: 0 }, { y: -50, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ${w(87)});
      cae(q(".s09-n1"), ${w(87)} - 0.05, 0.35);
      enRojo("${p}", ${w(87)}, 0.6);
      cara("${p}", "s", ${w(87)});
      tl.to(q(".${p}circ"), { opacity: 1, duration: 0.2 }, ${w(87)});
      tiembla(q(".${p}circ"), ${w(87)}, 0.6, 1);
      // ¡el stock!
      cae(q(".s09-n2"), ${w(94)} - 0.1, 0.3);
      enRojo("${p}", ${w(94)}, 1, 0.1);
      tl.set(q(".${p}d-gota"), { opacity: 1 }, ${w(94)});
      tl.fromTo(q(".${p}d-gota"), { y: 0 }, { y: 70, duration: 0.8, ease: "power1.in", immediateRender: false }, ${w(94)});
      // y se apilan todas
      ${extra.map((_, i) => `cae(q(".s09-x${i}"), ${w(97)} + 0.15 + ${i} * 0.13, 0.25);`).join("\n      ")}
      tiembla(q(".${p}circ"), ${w(94)}, ${dur} - ${w(94)} - 0.2, 2);
      sacudon(${w(97)} + 0.2, 1.3);`,
    sfx: [{ t: 0.02, sfx: "chime", vol: 0.15 }, { t: w(87) - 0.05, sfx: "notification", vol: 0.42 }, { t: w(87), sfx: "glitch-1", vol: 0.25, max: 0.4 }, { t: w(94) - 0.1, sfx: "notification", vol: 0.42 }, { t: w(97) + 0.15, sfx: "ping", vol: 0.3 }, { t: w(97) + 0.3, sfx: "ping", vol: 0.3 }, { t: w(97) + 0.45, sfx: "glitch-1", vol: 0.3, max: 0.5 }],
  };
};

// ---------------------------------------------------------------- s10 · exhalá el Excel · mind-full
E["s10-excel"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s10-";
  const celdas = [];
  for (let f = 0; f < 4; f++) for (let c = 0; c < 4; c++) celdas.push(`<rect class="s10-cel" x="${250 + c * 145}" y="${1000 + f * 80}" width="135" height="70" rx="8" fill="${f === 0 ? C.men : C.crema}" stroke="${N}" stroke-width="5"/>`);
  const iconos = ["wa", "pl", "ag", "st", "pago", "wa", "pl"];
  return {
    css: `[data-composition-id="${id}"] .s10-mf { top: 590px; font-size: 104px; }
      [data-composition-id="${id}"] .s10-full { top: 600px; font-size: 104px; }
      [data-composition-id="${id}"] .s10-tacha { position: absolute; left: 130px; top: 640px; width: 820px; height: 18px; border-radius: 9px; background: ${C.rojo}; box-shadow: 0 5px 0 ${N}; }
      [data-composition-id="${id}"] .s10-ex { top: 1370px; font-size: 96px; }
      [data-composition-id="${id}"] .s10-i { position: absolute; width: 96px; height: 96px; }
      [data-composition-id="${id}"] .s10-i svg { width: 100%; height: 100%; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-grid">${celdas.join("")}</g>
          <g class="s10-viento">${[0, 1, 2].map((i) => `<path class="s10-v" d="M${180 + i * 30} ${1050 + i * 100} q 120 -40 240 0 t 240 0" fill="none" stroke="${C.crema}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>`).join("")}</g>
          ${circulo(p, 540, 920, 200)}
          <g class="s10-cabeza"><path d="M330 1500 L330 1390 Q250 1370 260 1290 L230 1250 L262 1220 Q240 1000 470 960 Q700 940 760 1110 Q800 1250 720 1340 L720 1500 Z" fill="${C.lav}" stroke="${N}" stroke-width="9" stroke-linejoin="round"/>
            <path d="M300 1140 Q470 1050 700 1140" fill="none" stroke="${N}" stroke-width="5" stroke-dasharray="14 12" opacity="0.45"/></g></svg>
        ${iconos.map((ic, i) => `<div class="s10-i s10-i${i}">${ICO[ic]}</div>`).join("")}
        <div class="big s10-mf">MINDFULNESS</div>
        <div class="s10-tacha"></div>
        <div class="big rojo s10-full">MIND-FULL</div>
        <div class="big rojo s10-ex">EXHALÁ EL EXCEL</div>`,
    js: `
      caraYa("${p}", "e");
      // la guía pierde la paciencia: exhalá
      gsap.set(q(".${p}rojo"), { opacity: 0.35 });
      tl.fromTo(q(".${p}circ"), { scale: 1.15, svgOrigin: "540 920" }, { scale: 0.95, svgOrigin: "540 920", duration: 0.9, ease: "power2.out", immediateRender: false }, 0);
      habla(q(".${p}cara"), 0.0, 0.4, "540 1000");
      pop(q(".s10-grid"), ${w(99)} - 0.25, 0.3, 0.8);
      gsap.set(q(".s10-grid"), { opacity: 0 });
      tl.set(q(".s10-grid"), { opacity: 1 }, ${w(99)} - 0.25);
      golpe(q(".s10-ex"), ${w(101)}, -3, 2);
      // el Excel sale volando con el soplido
      dibujar(qa(".s10-v"), ${w(101)}, 0.35, 0.06);
      tl.to(q(".s10-viento"), { opacity: 0, duration: 0.3 }, ${w(101)} + 0.5);
      qa(".s10-cel").forEach((c, i) => tl.to(c, { x: 500 + (i % 4) * 160, y: -260 + Math.floor(i / 4) * 140 - (i % 3) * 60, rotation: 90 + i * 30, svgOrigin: (317 + (i % 4) * 145) + " " + (1035 + Math.floor(i / 4) * 80), opacity: 0, duration: 0.6, ease: "power2.in" }, ${w(101)} + 0.05 + (i % 4) * 0.03));
      tl.to(q(".${p}circ"), { scale: 0.85, svgOrigin: "540 920", duration: 0.3, ease: "power2.out" }, ${w(101)});
      tl.to(q(".s10-ex"), { opacity: 0, y: 40, duration: 0.2 }, ${w(102)});
      // mindfulness... mind-full
      tl.to(q(".${p}circ"), { scale: 0.5, y: -200, svgOrigin: "540 920", opacity: 0, duration: 0.35, ease: "power2.in" }, ${w(102)} - 0.1);
      pop(q(".s10-mf"), ${w(105)} - 0.1, 0.4, 0.8);
      entra(q(".s10-cabeza"), ${w(102)}, { y: 500 }, 0.45);
      const POS = [[330, 1080], [470, 1040], [610, 1080], [380, 1200], [540, 1180], [440, 960], [600, 960]];
      POS.forEach(([x, y], i) => { gsap.set(q(".s10-i" + i), { left: x, top: y, opacity: 0 }); tl.fromTo(q(".s10-i" + i), { opacity: 0, scale: 0.2, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ${w(103)} + i * 0.18); });
      gsap.set(q(".s10-tacha"), { scaleX: 0, transformOrigin: "0% 50%" });
      tl.to(q(".s10-tacha"), { scaleX: 1, duration: 0.25, ease: "power2.inOut" }, ${w(106)});
      tl.to([q(".s10-mf"), q(".s10-tacha")], { y: -60, opacity: 0.4, scale: 0.7, duration: 0.25 }, ${w(107)} - 0.1);
      golpe(q(".s10-full"), ${w(107)} + 0.05, -4, 2.4);
      tiembla(q(".s10-cabeza"), ${w(107)}, ${dur} - ${w(107)} - 0.2, 1.4);
      sacudon(${w(107)} + 0.06, 1.2);`,
    sfx: [{ t: 0, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: w(99) - 0.25, sfx: "pop", vol: 0.25 }, { t: w(101), sfx: "whoosh-cinematic", vol: 0.3, max: 0.9 }, { t: w(105) - 0.1, sfx: "sparkle", vol: 0.2 }, { t: w(103), sfx: "notification", vol: 0.2 }, { t: w(106), sfx: "click", vol: 0.3 }, { t: w(107), sfx: "impact-bass-2", vol: 0.38, max: 0.6 }],
  };
};

// ---------------------------------------------------------------- s11 · el giro
E["s11-giro"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s11-";
  const engranaje = (cx, cy, r, n, cls, col) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, b = a + Math.PI / n;
      const P = (ang, rr) => `${(cx + Math.cos(ang) * rr).toFixed(1)} ${(cy + Math.sin(ang) * rr).toFixed(1)}`;
      d += `${i ? "L" : "M"}${P(a - 0.12, r)} L${P(a + 0.02, r + 26)} L${P(b - 0.3, r + 26)} L${P(b - 0.12, r)} `;
    }
    return `<g class="${cls}"><path d="${d}Z" fill="${col}" stroke="${N}" stroke-width="7" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="${C.crema}" stroke="${N}" stroke-width="7"/></g>`;
  };
  return {
    css: `[data-composition-id="${id}"] .s11-sello { left: 160px; top: 590px; font-size: 58px; color: ${C.rojo}; transform: rotate(-6deg); }
      [data-composition-id="${id}"] .s11-t1 { top: 1310px; font-size: 76px; }
      [data-composition-id="${id}"] .s11-t2 { top: 1400px; font-size: 96px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${circulo(p, 540, 980, 250)}
          <g class="s11-mano"><path d="M300 1060 Q290 960 330 960 Q360 962 360 1000 L360 900 Q360 864 392 864 Q422 866 422 900 L424 980 L426 880 Q428 848 458 850 Q486 852 486 886 L486 990 L490 920 Q494 890 520 892 Q546 896 546 930 L546 1080 Q546 1180 440 1190 Q330 1190 300 1060 Z" fill="${C.piel}" stroke="${N}" stroke-width="8" stroke-linejoin="round"/>
            <path class="s11-x" d="M270 870 L580 1200 M580 870 L270 1200" stroke="${C.rojo}" stroke-width="26" stroke-linecap="round"/></g>
          ${engranaje(690, 1010, 92, 9, "s11-e1", C.men)}${engranaje(830, 1150, 62, 7, "s11-e2", C.lav)}${engranaje(610, 1170, 52, 6, "s11-e3", C.dur)}</svg>
        <div class="sello s11-sello">SESIÓN CANCELADA</div>
        <div class="big s11-t1">LO QUE SE PUEDE</div>
        <div class="big men s11-t2">HACER SOLO</div>`,
    js: `
      caraYa("${p}", "a");
      gsap.set(q(".${p}boca"), { opacity: 1 });
      // mirá, querido: la guía deja de susurrar y le habla de frente
      tl.fromTo(q(".${p}circ"), { scale: 0.8, svgOrigin: "540 980" }, { scale: 1.12, svgOrigin: "540 980", duration: 0.6, ease: "power3.out", immediateRender: false }, 0);
      habla(q(".${p}boca"), 0.05, ${w(115)} - 0.2, "540 1090");
      tl.to(q(".${p}cz"), { opacity: 0, duration: 0.01 }, 0);
      tl.fromTo(q(".${p}circ"), { rotation: -4, svgOrigin: "540 980" }, { rotation: 4, svgOrigin: "540 980", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ${w(110)});
      golpe(q(".s11-sello"), ${w(113)}, -6, 2.4);
      sacudon(${w(113)} + 0.05, 1);
      // necesitás dejar de hacer a mano...
      tl.to(q(".${p}circ"), { scale: 0.45, x: -260, y: -260, svgOrigin: "540 980", duration: 0.45, ease: "power2.inOut" }, ${w(115)} - 0.1);
      tl.to(q(".s11-sello"), { opacity: 0, y: -40, duration: 0.25 }, ${w(115)} - 0.1);
      entra(q(".s11-mano"), ${w(116)} - 0.1, { y: 300 }, 0.35);
      tl.to(q(".s11-mano"), { x: 0, y: -24, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${w(116)} + 0.3);
      dibujar(q(".s11-x"), ${w(120)}, 0.3);
      // ...lo que se puede hacer solo: engranajes que giran solos
      tl.to(q(".s11-mano"), { x: -200, opacity: 0.25, scale: 0.7, duration: 0.3 }, ${w(122)});
      pop(q(".s11-t1"), ${w(121)}, 0.3, 0.8);
      ["e1", "e2", "e3"].forEach((e, i) => pop(q(".s11-" + e), ${w(122)} + i * 0.1, 0.35, 0.3));
      tl.fromTo(q(".s11-e1"), { rotation: 0, svgOrigin: "690 1010" }, { rotation: 240, svgOrigin: "690 1010", duration: ${dur} - ${w(122)}, ease: "none", immediateRender: false }, ${w(122)});
      tl.fromTo(q(".s11-e2"), { rotation: 0, svgOrigin: "830 1150" }, { rotation: -320, svgOrigin: "830 1150", duration: ${dur} - ${w(122)}, ease: "none", immediateRender: false }, ${w(122)});
      tl.fromTo(q(".s11-e3"), { rotation: 0, svgOrigin: "610 1170" }, { rotation: -400, svgOrigin: "610 1170", duration: ${dur} - ${w(122)}, ease: "none", immediateRender: false }, ${w(122)});
      golpe(q(".s11-t2"), ${w(126)}, -2, 2);`,
    sfx: [{ t: 0.0, sfx: "whoosh", vol: 0.22, max: 0.5 }, { t: w(113), sfx: "impact-bass-1", vol: 0.32, max: 0.6 }, { t: w(116), sfx: "pop", vol: 0.25 }, { t: w(120), sfx: "glitch-1", vol: 0.25, max: 0.4 }, { t: w(122), sfx: "click", vol: 0.3 }, { t: w(126), sfx: "impact-bass-2", vol: 0.3, max: 0.6 }],
  };
};

// ---------------------------------------------------------------- s12 · Scalerics lo automatiza: el pedido cae solo
E["s12-automatico"] = (id) => {
  const { w, dur } = tiempos(id);
  return {
    css: `[data-composition-id="${id}"] .s12-sc { top: 580px; font-size: 64px; font-weight: 700; letter-spacing: 0.14em; }
      [data-composition-id="${id}"] .s12-auto { top: 660px; font-size: 100px; }
      [data-composition-id="${id}"] .s12-raya { position: absolute; left: 190px; top: 776px; width: 700px; height: 14px; border-radius: 7px; background: ${C.verde}; }
      [data-composition-id="${id}"] .s12-msg { left: 80px; top: 880px; }
      [data-composition-id="${id}"] .s12-pl { left: 90px; top: 1130px; width: 900px; }
      [data-composition-id="${id}"] .s12-pl .s12-pl-f3 span { background: #dcfbc9; }
      [data-composition-id="${id}"] .s12-ok { position: absolute; left: 905px; top: 1342px; width: 84px; height: 84px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s12-flecha" d="M560 950 Q760 960 800 1110" fill="none" stroke="${C.verde}" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 22"/>
          <path class="s12-punta" d="M770 1090 L800 1120 L826 1084" fill="none" stroke="${C.verde}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="big s12-sc">SCALERICS</div>
        <div class="big verde s12-auto">LO AUTOMATIZA</div>
        <div class="s12-raya"></div>
        <div class="globo men s12-msg"><small>WHATSAPP · SRA. DE LAS EMPANADAS</small>«2 docenas de carne»</div>
        ${planilla("s12-pl", [["Pérez", "1 tarta", "listo"], ["Gómez", "3 pizzas", "listo"], ["Sra. emp.", "2 doc. carne", "anotado solo"]])}
        <svg class="s12-ok" viewBox="0 0 84 84"><circle cx="42" cy="42" r="38" fill="${C.verde}" stroke="${N}" stroke-width="6"/><path d="M22 44 L36 58 L62 28" fill="none" stroke="${N}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    js: `
      pop(q(".s12-sc"), ${w(128)} - 0.1, 0.35, 0.8);
      golpe(q(".s12-auto"), ${w(130)}, -2, 1.8);
      gsap.set(q(".s12-raya"), { scaleX: 0, transformOrigin: "0% 50%" });
      tl.to(q(".s12-raya"), { scaleX: 1, duration: 0.35, ease: "power2.out" }, ${w(130)} + 0.2);
      // el pedido de WhatsApp...
      entra(q(".s12-msg"), ${w(132)} - 0.2, { x: -700 }, 0.4);
      entra(q(".s12-pl"), ${w(132)}, { y: 500 }, 0.4);
      gsap.set(q(".s12-pl-f3"), { opacity: 0 });
      dibujar(q(".s12-flecha"), ${w(135)} - 0.1, 0.4);
      gsap.set(q(".s12-punta"), { opacity: 0 });
      tl.set(q(".s12-punta"), { opacity: 1 }, ${w(135)} + 0.3);
      tl.fromTo(q(".s12-flecha"), { strokeDasharray: "4 22" }, { strokeDasharray: "4 22", duration: 0.01, immediateRender: false }, ${w(135)} + 0.6);
      // ...cae solo en la planilla
      tl.to(q(".s12-msg"), { x: 540, y: 380, scale: 0.4, opacity: 0, duration: 0.45, ease: "power2.in" }, ${w(136)} - 0.1);
      tl.fromTo(q(".s12-pl-f3"), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ${w(136)} + 0.3);
      pop(q(".s12-ok"), ${w(139)}, 0.35, 0.3);
      tl.to(q(".s12-ok"), { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1 }, ${w(139)} + 0.4);
      tl.to(q(".s12-sc"), { y: -8, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.5);`,
    sfx: [{ t: w(128) - 0.1, sfx: "sparkle", vol: 0.25 }, { t: w(130), sfx: "impact-bass-1", vol: 0.3, max: 0.6 }, { t: w(132) - 0.2, sfx: "whoosh-short", vol: 0.25 }, { t: w(136), sfx: "whoosh", vol: 0.25, max: 0.5 }, { t: w(136) + 0.3, sfx: "pop", vol: 0.3 }, { t: w(139), sfx: "chime", vol: 0.3 }],
  };
};

// ---------------------------------------------------------------- s13 · el aviso sale solo · el reporte del día
E["s13-reporte"] = (id) => {
  const { w, dur } = tiempos(id);
  return {
    css: `[data-composition-id="${id}"] .s13-cel { position: absolute; left: 250px; top: 560px; width: 580px; height: 960px; border-radius: 70px; background: ${N}; border: 10px solid ${C.crema}; box-shadow: 0 14px 0 rgba(29, 26, 58, 0.5); }
      [data-composition-id="${id}"] .s13-cab { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: ${C.crema}; }
      [data-composition-id="${id}"] .s13-cab small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.12em; color: ${C.men}; }
      [data-composition-id="${id}"] .s13-m { position: absolute; right: 30px; top: 170px; width: 440px; padding: 20px 24px 18px; border-radius: 30px 30px 6px 30px; background: ${C.men}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; line-height: 1.2; color: ${N}; }
      [data-composition-id="${id}"] .s13-m svg { display: block; margin: 6px 0 0 auto; width: 70px; height: 36px; }
      [data-composition-id="${id}"] .s13-auto { position: absolute; left: 30px; top: 420px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.1em; color: ${C.verde}; white-space: nowrap; }
      [data-composition-id="${id}"] .s13-hora { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 300; font-size: 170px; line-height: 1; color: ${C.crema}; }
      [data-composition-id="${id}"] .s13-n { left: 40px; top: 1040px; width: 1000px; }
      [data-composition-id="${id}"] .s13-barras { position: absolute; left: 330px; top: 1230px; width: 420px; height: 200px; }`,
    html: `<div class="s13-cel">
          <div class="s13-cab s13-chat"><small>WHATSAPP</small>Gómez</div>
          <div class="s13-m s13-chat">Gómez, tu pedido está listo. ¡Te esperamos!<svg viewBox="0 0 70 36"><path d="M4 18 L16 30 L36 6 M30 26 L34 30 L62 6" fill="none" stroke="#1f6fd1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="s13-auto s13-chat">ENVIADO SOLO · 18:02</div>
          <div class="s13-hora">23:00</div>
        </div>
        ${notif("s13-n", "rep", "SCALERICS · 23:00", "Tu reporte del día", "Pedidos, ventas y stock: todo al día", "ahora")}
        <svg class="s13-barras" viewBox="0 0 420 200">${[60, 110, 80, 150, 130].map((h, i) => `<rect class="s13-b" x="${20 + i * 82}" y="${190 - h}" width="56" height="${h}" rx="10" fill="${i === 3 ? C.verde : C.lavc}" stroke="${N}" stroke-width="5"/>`).join("")}</svg>`,
    js: `
      entra(q(".s13-cel"), 0, { y: 300 }, 0.35);
      gsap.set(q(".s13-hora"), { opacity: 0 });
      pop(q(".s13-m"), ${w(143)} - 0.1, 0.35);
      tl.fromTo(q(".s13-m"), { x: 0 }, { x: 0, duration: 0.01, immediateRender: false }, ${w(145)});
      tl.to(q(".s13-m path"), { stroke: "${C.verde}", duration: 0.01 }, ${w(146)});
      pop(q(".s13-auto"), ${w(146)}, 0.3, 0.8);
      // a las once
      tl.to(qa(".s13-chat"), { opacity: 0, y: -40, duration: 0.25 }, ${w(148)} - 0.15);
      pop(q(".s13-hora"), ${w(150)} - 0.1, 0.4, 0.7);
      cae(q(".s13-n"), ${w(152)} - 0.1, 0.35);
      tl.to(q(".s13-cel"), { scale: 0.96, duration: 0.15, yoyo: true, repeat: 1 }, ${w(152)});
      qa(".s13-b").forEach((b, i) => { gsap.set(b, { opacity: 0 }); tl.fromTo(b, { opacity: 1, scaleY: 0, svgOrigin: (48 + i * 82) + " 190" }, { opacity: 1, scaleY: 1, svgOrigin: (48 + i * 82) + " 190", duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, ${w(154)} + i * 0.08); });
      tl.to(q(".s13-n"), { y: -10, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${w(157)});`,
    sfx: [{ t: w(143) - 0.1, sfx: "pop", vol: 0.28 }, { t: w(146), sfx: "ping", vol: 0.3 }, { t: w(150) - 0.1, sfx: "click-soft", vol: 0.3 }, { t: w(152) - 0.1, sfx: "notification", vol: 0.35 }, { t: w(154), sfx: "sparkle", vol: 0.2 }],
  };
};

// ---------------------------------------------------------------- s14 · ¿y ahora qué hago a las once? · dormí
E["s14-dormi"] = (id) => {
  const { w, dur } = tiempos(id);
  const p = "s14-";
  return {
    css: `[data-composition-id="${id}"] .s14-q { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 130px; line-height: 1; color: ${C.lavc}; text-shadow: 0 7px 0 ${N}; }
      [data-composition-id="${id}"] .s14-q1 { left: 190px; top: 760px; } [data-composition-id="${id}"] .s14-q2 { left: 800px; top: 720px; } [data-composition-id="${id}"] .s14-q3 { left: 860px; top: 930px; }
      [data-composition-id="${id}"] .s14-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 800; line-height: 1; color: ${C.crema}; text-shadow: 0 5px 0 ${N}; }
      [data-composition-id="${id}"] .s14-z1 { left: 690px; top: 1010px; font-size: 64px; } [data-composition-id="${id}"] .s14-z2 { left: 760px; top: 920px; font-size: 84px; } [data-composition-id="${id}"] .s14-z3 { left: 850px; top: 810px; font-size: 104px; }`,
    html: `<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          ${circulo(p, 320, 760, 120)}
          <g class="s14-parado"><g transform="translate(340 900) scale(1)">${dueno(p)}</g></g>
          <g class="s14-cama">
            <rect x="110" y="1220" width="860" height="150" rx="30" fill="${C.crema}" stroke="${N}" stroke-width="8"/>
            <rect x="90" y="1130" width="50" height="320" rx="20" fill="${C.dur}" stroke="${N}" stroke-width="8"/>
            <rect x="150" y="1160" width="220" height="90" rx="40" fill="${C.crema}" stroke="${N}" stroke-width="8"/>
            <g transform="translate(320 1170) rotate(-90) scale(0.55)"><g class="s14-cabdormida">${dueno("s14b-")}</g></g>
            <path d="M330 1180 Q520 1120 940 1170 L960 1300 L330 1300 Z" fill="${C.lav}" stroke="${N}" stroke-width="8" stroke-linejoin="round"/>
            <path d="M420 1220 Q600 1180 900 1210" fill="none" stroke="${C.crema}" stroke-width="6" opacity="0.6"/></g></svg>
        <div class="s14-q s14-q1">?</div><div class="s14-q s14-q2">?</div><div class="s14-q s14-q3">?</div>
        <div class="s14-z s14-z1">z</div><div class="s14-z s14-z2">z</div><div class="s14-z s14-z3">Z</div>`,
    js: `
      caraYa("${p}", "a");
      gsap.set(q(".s14b-d-ojos"), { opacity: 0 });
      gsap.set(q(".s14b-d-cerrados"), { opacity: 1 });
      // ¿y ahora qué hago?
      entra(q(".s14-parado"), 0, { y: 300 }, 0.35);
      habla(q(".${p}d-boca"), 0.05, 1.0, "200 254");
      tl.to(q(".${p}d-pup"), { x: -14, y: -10, duration: 0.2, yoyo: true, repeat: 3 }, 0.3);
      ["q1", "q2", "q3"].forEach((k, i) => pop(q(".s14-" + k), 0.25 + i * 0.22, 0.35, 0.3));
      tl.to(qa(".s14-q"), { rotation: 12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.9);
      gsap.set(q(".${p}circ"), { opacity: 0 }); tl.to(q(".${p}circ"), { opacity: 1, duration: 0.3 }, ${w(166)});
      // dormí, querido
      tl.to([q(".s14-parado"), ...qa(".s14-q")], { opacity: 0, y: 80, duration: 0.3, ease: "power2.in" }, ${w(166)} - 0.2);
      entra(q(".s14-cama"), ${w(166)} - 0.05, { y: 260 }, 0.4);
      tl.to(q(".${p}circ"), { x: 400, y: -120, scale: 1.2, svgOrigin: "320 760", duration: 0.5, ease: "power2.inOut" }, ${w(166)});
      cara("${p}", "z", ${w(166)} + 0.3);
      vaiven(q(".${p}circ"), ${w(166)} + 0.6, ${dur} - ${w(166)} - 0.6, { scale: 1.28, svgOrigin: "320 760" }, 0.9);
      ["z1", "z2", "z3"].forEach((k, i) => { gsap.set(q(".s14-" + k), { opacity: 0 }); tl.fromTo(q(".s14-" + k), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "sine.out", immediateRender: false }, ${w(167)} + i * 0.35); tl.to(q(".s14-" + k), { y: -16, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${w(167)} + 0.4 + i * 0.35); });
      vaiven(q(".s14-cama"), ${w(166)} + 0.5, ${dur} - ${w(166)} - 0.6, { y: -6 }, 0.9);`,
    sfx: [{ t: 0.25, sfx: "pop", vol: 0.22 }, { t: 0.47, sfx: "pop", vol: 0.22 }, { t: 0.69, sfx: "pop", vol: 0.22 }, { t: w(166), sfx: "chime", vol: 0.28 }, { t: w(167), sfx: "sparkle", vol: 0.16 }],
  };
};

// ---------------------------------------------------------------- s15 · CTA: etiquetá al que copia y pega a la medianoche
E["s15-cta"] = (id) => {
  const { w, dur } = tiempos(id);
  const usuario = "@el_que_copia_y_pega";
  return {
    css: `[data-composition-id="${id}"] .s15-arroba { top: 560px; font-size: 230px; font-weight: 900; color: ${C.verde}; }
      [data-composition-id="${id}"] .s15-box { position: absolute; left: 80px; top: 860px; width: 920px; padding: 30px 34px; border-radius: 40px; background: ${C.crema}; border: 6px solid ${N}; box-shadow: 0 14px 0 rgba(29, 26, 58, 0.5); }
      [data-composition-id="${id}"] .s15-box small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.1em; color: #6b5fa8; }
      [data-composition-id="${id}"] .s15-u { margin-top: 10px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 54px; color: ${N}; white-space: nowrap; }
      [data-composition-id="${id}"] .s15-u .s15-c { display: none; }
      [data-composition-id="${id}"] .s15-u .s15-cur { display: inline-block; width: 6px; height: 54px; margin-left: 4px; background: ${N}; vertical-align: -8px; opacity: 1; }
      [data-composition-id="${id}"] .s15-k1 { left: 120px; top: 1120px; } [data-composition-id="${id}"] .s15-k2 { left: 470px; top: 1120px; } [data-composition-id="${id}"] .s15-k3 { left: 730px; top: 1120px; }
      [data-composition-id="${id}"] .s15-hora { top: 1400px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 64px; letter-spacing: 0.14em; color: ${C.lavc}; }`,
    html: `<div class="big s15-arroba">@</div>
        <div class="s15-box"><small>ETIQUETALO EN LOS COMENTARIOS</small><div class="s15-u">${[...usuario].map((c) => `<span class="s15-c">${c}</span>`).join("")}<span class="s15-cur"></span></div></div>
        <div class="tecla ancha s15-k1"><span>CTRL</span></div>
        <div class="tecla s15-k2"><span>C</span></div>
        <div class="tecla s15-k3"><span>V</span></div>
        <div class="big s15-hora">00:00 · TODAVÍA</div>`,
    js: `
      golpe(q(".s15-arroba"), 0.1, -4, 2.2);
      tl.to(q(".s15-arroba"), { scale: 1.08, duration: 0.5, yoyo: true, repeat: Math.floor((DUR - 1) / 0.5) - 1, ease: "sine.inOut" }, 0.5);
      entra(q(".s15-box"), 0.15, { y: 200 }, 0.4);
      qa(".s15-c").forEach((c, i) => tl.set(c, { display: "inline" }, 0.45 + i * 0.055));
      tl.fromTo(q(".s15-cur"), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: Math.floor((DUR - 0.5) / 0.3) - 1, immediateRender: false }, 0.4);
      ["k1", "k2", "k3"].forEach((k, i) => pop(q(".s15-" + k), ${w(173)} + i * 0.12, 0.3));
      tl.fromTo([q(".s15-k1"), q(".s15-k2")], { y: 0 }, { y: 18, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, ${w(173)} + 0.4);
      tl.fromTo([q(".s15-k1"), q(".s15-k3")], { y: 0 }, { y: 18, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, ${w(175)} + 0.1);
      pop(q(".s15-hora"), ${w(178)}, 0.4, 0.8);
      tl.to(q(".s15-hora"), { opacity: 0.5, duration: 0.5, yoyo: true, repeat: 4, ease: "sine.inOut" }, ${w(178)} + 0.6);`,
    sfx: [{ t: 0.1, sfx: "impact-bass-1", vol: 0.3, max: 0.6 }, { t: 0.45, sfx: "typing", vol: 0.28, max: 1.1 }, { t: w(173) + 0.4, sfx: "key-press", vol: 0.35 }, { t: w(175) + 0.1, sfx: "key-press", vol: 0.35 }, { t: w(178), sfx: "chime", vol: 0.3 }],
  };
};

for (const [id, f] of Object.entries(E)) {
  if (SOLO.length && !SOLO.some((s) => id.startsWith(s))) continue;
  escena(id, f(id));
  console.log("escena", id);
}
