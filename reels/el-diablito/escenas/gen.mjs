// Genera compositions/sNN-*.html y .sfx.json de reels/el-diablito (personajes compartidos en lib.mjs). Correr desde reels/el-diablito:
//   node escenas/gen.mjs [s01 s02 ...]
import { escena, pon, diablito, angelito, dueno, agente, senora, globo, nube, chispa, guante, INK, PAPEL, SKIN, RED, CEL, HALO, SEPIA } from "./lib.mjs";
const solo = process.argv.slice(2);
const S = {};
const K = (w = 7) => `stroke="${INK}" stroke-width="${w}"`;
// iris de dibujo viejo: círculo con un trazo enorme; el agujero = 500 * escala
const iris = (cls) => `<g class="${cls}"><circle cx="540" cy="960" r="2500" fill="none" stroke="${INK}" stroke-width="4000" /></g>`;

// ============ s01: el diablito se presenta ============
S["s01-diablito"] = () => {
  const p = "s01";
  const D = pon(diablito(p), 540, 1220, 1.7);
  return escena("s01-diablito", {
    svg: `${D.svg}
      <g class="${p}-ticket"><g class="${p}-t1"><path d="M210 930 H330 L322 950 L334 968 L324 986 L332 1004 L320 1022 L330 1040 H210 Z" fill="${PAPEL}" ${K(6)} /><text class="${p}-tit" x="222" y="1000" font-size="40">VEN</text></g>
        <g class="${p}-t2"><path d="M330 930 H420 V1040 H330 L320 1022 L332 1004 L324 986 L334 968 L322 950 Z" fill="${PAPEL}" ${K(6)} /><text class="${p}-tit" x="336" y="1000" font-size="40">TA</text></g></g>
      ${chispa(`${p}-ch1`, 820, 700, 26)}${chispa(`${p}-ch2`, 250, 760, 20)}${chispa(`${p}-ch3`, 880, 1000, 18)}
      ${iris(`${p}-iris`)}`,
    html: `<div class="etiqueta"><span class="${p}-e1">Una venta perdida</span><span class="${p}-e2">Tu diablito</span></div>`,
    js: `
      // iris que se abre (cuadro 0: ya se ve la cara)
      tl.fromTo(q(".${p}-iris"), { scale: 0.62, svgOrigin: "540 960" }, { scale: 2.6, svgOrigin: "540 960", duration: 0.7, ease: "power2.in" }, 0);
      rebote(q(".${p}-dia"), "0 0", 0, DUR, 0.04);
      etq(".${p}-e1", 0.25, 2.15);
      // el ticket de la VENTA en la mano: "perdiste" lo rompe
      tl.fromTo(q(".${p}-ticket"), { opacity: 0, y: 30, rotation: -8, svgOrigin: "320 985" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "320 985", duration: 0.35, ease: "back.out(2)" }, 0.25);
      tl.to(q(".${p}-t1"), { x: -24, rotation: -14, svgOrigin: "270 985", duration: 0.1, ease: "power2.out" }, 1.02);
      tl.to(q(".${p}-t2"), { x: 24, rotation: 14, svgOrigin: "375 985", duration: 0.1, ease: "power2.out" }, 1.02);
      tl.to(q(".${p}-t1"), { x: -80, y: 300, rotation: -60, svgOrigin: "270 985", duration: 0.6, ease: "power1.in" }, 1.14);
      tl.to(q(".${p}-t2"), { x: 70, y: 320, rotation: 50, svgOrigin: "375 985", duration: 0.65, ease: "power1.in" }, 1.14);
      tl.to([q(".${p}-t1"), q(".${p}-t2")], { opacity: 0, duration: 0.2 }, 1.7);
      tl.to(q(".${p}-dia-bi"), { rotation: 25, svgOrigin: "-44 -150", duration: 0.12, yoyo: true, repeat: 1 }, 1.0);
      // "mí": se ríe (la cabeza se sacude)
      tl.to(q(".${p}-dia-cab"), { rotation: 6, svgOrigin: "0 -180", duration: 0.07, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.6);
      // "diablito": reverencia con el tridente, cejas arriba, chispas
      tl.to(q(".${p}-dia-cejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, 2.25);
      tl.to(q(".${p}-dia-bd"), { rotation: 16, svgOrigin: "44 -150", duration: 0.2, ease: "back.out(3)" }, 2.5);
      tl.to(q(".${p}-dia-cola"), { rotation: 20, svgOrigin: "24 -96", duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.3);
      ["${p}-ch1", "${p}-ch2", "${p}-ch3"].forEach((c, i) => {
        tl.fromTo(q("." + c), { opacity: 0, scale: 0, rotation: 0, svgOrigin: ["820 700", "250 760", "880 1000"][i] }, { opacity: 1, scale: 1, rotation: 90, svgOrigin: ["820 700", "250 760", "880 1000"][i], duration: 0.35, ease: "back.out(2)" }, 2.5 + i * 0.1);
      });
      etq(".${p}-e2", 2.55);
      tl.to(qa(".${p}-pupila"), { x: 4, y: 3, duration: 0.2 }, 2.4);
    `,
    sfx: [{ t: 0.0, sfx: "drama", vol: 0.3, max: 1.4 }, { t: 0.3, sfx: "pop", vol: 0.3 }, { t: 1.05, sfx: "tijera", vol: 0.0 }, { t: 1.05, sfx: "golpe", vol: 0.3 }, { t: 2.5, sfx: "magia", vol: 0.3, max: 1.0 }].filter((s) => s.vol > 0),
  });
};

// ---------- el trío: dueño con el celular, diablito en el hombro izq, angelito en el der ----------
const trio = (p, { dia = true, ang = true, cel = true } = {}) =>
  `<g class="${p}-trio">
    <g transform="translate(540 1110) scale(0.9)">${dueno(p, { celular: cel })}</g>
    ${dia ? `<g transform="translate(292 1112) scale(0.74)">${diablito(p)}</g>` : ""}
    ${ang ? `<g transform="translate(790 1112) scale(0.74)">${angelito(p)}</g>` : ""}
  </g>`;
// js para el trío: párpados cansados del dueño, parpadeos y rebotes
const trioJs = (p, { dia = true, ang = true, desde = 0, blinks = [] } = {}) => `
      gsap.set(q(".${p}-due-pi"), { scaleY: 0.45, svgOrigin: "-48 -252" });
      gsap.set(q(".${p}-due-pd"), { scaleY: 0.45, svgOrigin: "48 -252" });
      ${ang ? `gsap.set(q(".${p}-ang-pi"), { scaleY: 0, svgOrigin: "-21 -267" }); gsap.set(q(".${p}-ang-pd"), { scaleY: 0, svgOrigin: "21 -267" });` : ""}
      ${JSON.stringify(blinks)}.forEach((t) => { parpadeo([q(".${p}-due-pi")], "-48 -252", [t], 0.45); parpadeo([q(".${p}-due-pd")], "48 -252", [t], 0.45); });
      rebote(q(".${p}-due"), "0 170", ${desde}, DUR, 0.015);
      ${dia ? `rebote(q(".${p}-dia"), "0 0", ${desde}, DUR, 0.06);` : ""}
      ${ang ? `rebote(q(".${p}-ang"), "0 0", ${desde}, DUR, 0.05);` : ""}
`;
const sello = (cls, x, y, txt, rot = -12, w = 360) => `<g class="${cls}" transform="rotate(${rot} ${x} ${y})"><rect x="${x - w / 2}" y="${y - 50}" width="${w}" height="100" rx="12" fill="none" stroke="${RED}" stroke-width="9" /><text class="${cls.split(" ")[0].split("-")[0]}-tit" x="${x}" y="${y + 20}" font-size="60" text-anchor="middle" fill="${RED}" style="fill:${RED}">${txt}</text></g>`;

// ============ s02: once de la noche, la clienta que no compró ============
S["s02-noche"] = () => {
  const p = "s02";
  return escena("s02-noche", {
    svg: `
      <g class="${p}-ventana"><rect x="110" y="610" width="250" height="250" rx="14" fill="#2c3550" ${K(8)} /><path d="M235 610 V860 M110 735 H360" ${K(7)} fill="none" />
        <path d="M196 642 A60 60 0 1 0 290 718 A48 48 0 1 1 196 642 Z" fill="${HALO}" ${K(5)} /><path d="M236 690 q6 6 12 0 M232 720 q10 8 18 -2" fill="none" ${K(4)} />
        ${chispa(`${p}-est1`, 150, 650, 12, PAPEL)}${chispa(`${p}-est2`, 320, 810, 10, PAPEL)}</g>
      <g class="${p}-reloj"><circle cx="830" cy="710" r="96" fill="${PAPEL}" ${K(8)} />
        <text class="${p}-tit" x="830" y="648" font-size="34" text-anchor="middle">12</text><text class="${p}-tit" x="830" y="800" font-size="34" text-anchor="middle">6</text>
        <text class="${p}-tit" x="752" y="722" font-size="34" text-anchor="middle">9</text><text class="${p}-tit" x="908" y="722" font-size="34" text-anchor="middle">3</text>
        <path class="${p}-aguja-h" d="M830 710 L790 670" ${K(10)} /><path class="${p}-aguja-m" d="M830 710 V636" ${K(7)} /><circle cx="830" cy="710" r="9" fill="${INK}" /></g>
      ${trio(p, { dia: false, ang: false })}
      <g class="${p}-chat">${globo(`${p}-g1`, 560, 600, 450, 150, "bi")}
        <text class="${p}-txt" x="592" y="664" font-size="38">¿Qué precio tiene?</text>
        <text class="${p}-txt" x="592" y="718" font-size="28" opacity="0.55">Clienta · ayer 18:40</text></g>
      ${sello(`${p}-sello`, 800, 860, "NO COMPRÓ", -10, 380)}`,
    html: `<div class="etiqueta"><span class="${p}-e1">11 de la noche</span><span class="${p}-e2">Ayer preguntó</span></div>`,
    js: `${trioJs(p, { dia: false, ang: false, blinks: [1.0, 3.9] })}
      // el reloj marca las once
      tl.fromTo(q(".${p}-aguja-h"), { rotation: -200, svgOrigin: "830 710" }, { rotation: 0, svgOrigin: "830 710", duration: 0.6, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".${p}-aguja-m"), { rotation: -720, svgOrigin: "830 710" }, { rotation: 0, svgOrigin: "830 710", duration: 0.6, ease: "back.out(1.6)" }, 0);
      tl.to(q(".${p}-reloj"), { rotation: 8, svgOrigin: "830 614", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.6);
      tl.fromTo(q(".${p}-ventana"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(2)" }, 0.05);
      tl.fromTo(q(".${p}-trio"), { y: 60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      [".${p}-est1", ".${p}-est2"].forEach((c, i) => tl.fromTo(q(c), { scale: 0.4, svgOrigin: i ? "320 810" : "150 650" }, { scale: 1.2, svgOrigin: i ? "320 810" : "150 650", duration: 0.4, yoyo: true, repeat: 9, ease: "sine.inOut" }, i * 0.2));
      etq(".${p}-e1", 0.2, 1.4);
      // "clienta": el reloj sale, entra el mensaje de ayer; el dueño lo mira
      tl.to(q(".${p}-reloj"), { scale: 0, svgOrigin: "830 710", duration: 0.2, ease: "back.in(2)" }, 1.4);
      pop(q(".${p}-chat"), 1.55, "600 780");
      tl.to(qa(".${p}-due-oi .${p}-pupila, .${p}-due-od .${p}-pupila"), { x: 10, y: -10, duration: 0.2 }, 1.6);
      tl.to(q(".${p}-due-pantalla"), { fill: "${HALO}", duration: 0.1 }, 1.55);
      etq(".${p}-e2", 1.7);
      // "no compró": sello rojo
      tl.fromTo(q(".${p}-sello"), { opacity: 0, scale: 2.2, svgOrigin: "800 860" }, { opacity: 1, scale: 1, svgOrigin: "800 860", duration: 0.22, ease: "power3.in" }, 3.25);
      tl.to(q(".${p}-chat"), { y: 6, duration: 0.05, yoyo: true, repeat: 3 }, 3.47);
      tl.to(q(".${p}-due-cejas"), { y: 8, duration: 0.2 }, 3.4);
    `,
    sfx: [{ t: 0.0, sfx: "tic", vol: 0.35 }, { t: 0.3, sfx: "tic", vol: 0.35 }, { t: 0.6, sfx: "campanita", vol: 0.25, max: 0.8 }, { t: 1.55, sfx: "notification", vol: 0.3 }, { t: 3.42, sfx: "golpe", vol: 0.35 }],
  });
};

// ============ s03: el angelito: escribile ============
S["s03-angelito"] = () => {
  const p = "s03";
  return escena("s03-angelito", {
    svg: `${trio(p, { dia: false })}
      <g class="${p}-chat">${globo(`${p}-g1`, 120, 600, 560, 190, "bd", "#e3f2f9")}
        <text class="${p}-txt ${p}-l1" x="152" y="662" font-size="36">Hola, te paso el precio</text>
        <text class="${p}-txt ${p}-l2" x="152" y="716" font-size="36">¿Lo seguís queriendo?</text>
        <g class="${p}-dots"><circle cx="164" cy="756" r="8" fill="${INK}" /><circle cx="190" cy="756" r="8" fill="${INK}" /><circle cx="216" cy="756" r="8" fill="${INK}" /></g></g>
      <g class="${p}-corazon"><path d="M900 820 c-30 -40 -80 -10 -50 30 l50 46 l50 -46 c30 -40 -20 -70 -50 -30 Z" fill="${RED}" ${K(5)} /></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">El angelito</span><span class="${p}-e2">Escribile</span></div>`,
    js: `${trioJs(p, { dia: false, blinks: [2.0] })}
      // el angelito aparece en el hombro, con el halo que brilla
      pop(q(".${p}-ang"), 0.0, "0 0", 0.5);
      tl.fromTo(q(".${p}-ang-halo"), { y: -30, rotation: 0 }, { y: 0, rotation: 0, duration: 0.5, ease: "bounce.out" }, 0.05);
      etq(".${p}-e1", 0.2, 1.4);
      // "corazón": el corazoncito late
      tl.fromTo(q(".${p}-corazon"), { opacity: 0, scale: 0.3, svgOrigin: "900 870" }, { opacity: 1, scale: 1, svgOrigin: "900 870", duration: 0.3, ease: "back.out(3)" }, 0.6);
      tl.to(q(".${p}-corazon"), { scale: 1.2, svgOrigin: "900 870", duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.9);
      tl.to(q(".${p}-corazon"), { opacity: 0, y: -60, duration: 0.4 }, 2.4);
      // le susurra: mano a la boca
      tl.to(q(".${p}-ang-bi"), { rotation: 70, svgOrigin: "-38 -150", duration: 0.25, ease: "back.out(2)" }, 0.1);
      // el dueño mira al angelito
      tl.to(qa(".${p}-due-oi .${p}-pupila, .${p}-due-od .${p}-pupila"), { x: 14, duration: 0.2 }, 0.2);
      tl.to(q(".${p}-due-cab"), { rotation: 5, svgOrigin: "0 -40", duration: 0.3 }, 0.2);
      // "Pasale el precio": el borrador del mensaje
      pop(q(".${p}-chat"), 1.45, "600 800");
      gsap.set([q(".${p}-l1"), q(".${p}-l2")], { opacity: 0 });
      tl.to(q(".${p}-l1"), { opacity: 1, duration: 0.2 }, 1.7);
      tl.to(q(".${p}-l2"), { opacity: 1, duration: 0.2 }, 2.6);
      tl.fromTo(qa(".${p}-dots circle"), { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 11, stagger: 0.08, ease: "sine.inOut" }, 1.6);
      tl.to(q(".${p}-due-pantalla"), { fill: "${HALO}", duration: 0.1 }, 1.5);
      etq(".${p}-e2", 1.55);
      tl.to(q(".${p}-ang-bd"), { rotation: -40, svgOrigin: "38 -150", duration: 0.2, yoyo: true, repeat: 3 }, 2.6);
    `,
    sfx: [{ t: 0.0, sfx: "magia", vol: 0.3, max: 1.2 }, { t: 0.6, sfx: "sparkle", vol: 0.25 }, { t: 1.45, sfx: "pop", vol: 0.3 }, { t: 1.7, sfx: "typing", vol: 0.2, max: 1.4 }],
  });
};

// ============ s04: el diablito: vas a quedar de pesado ============
S["s04-pesado"] = () => {
  const p = "s04";
  return escena("s04-pesado", {
    svg: `${trio(p)}
      <g class="${p}-chat"><g class="${p}-chat-in">${globo(`${p}-g1`, 120, 600, 560, 190, "bd", "#e3f2f9")}
        <text class="${p}-txt" x="152" y="662" font-size="36">Hola, te paso el precio</text>
        <text class="${p}-txt" x="152" y="716" font-size="36">¿Lo seguís queriendo?</text></g></g>
      <g class="${p}-pesa"><path d="M250 520 H560 L520 470 H290 Z" fill="${INK}" /><path d="M210 520 H600 Q610 600 560 610 H250 Q200 600 210 520 Z" fill="${INK}" ${K(6)} />
        <text class="${p}-tit" x="405" y="588" font-size="58" text-anchor="middle" style="fill:${PAPEL}">PESADO</text></g>
      ${nube(`${p}-polvo1`, 170, 800, 0.9)}${nube(`${p}-polvo2`, 640, 800, 0.9)}
      <g class="${p}-no"><path d="M80 880 L130 850 L120 800 L170 820 L190 770 L225 815 L270 790 L265 845 L310 860 L265 890 L285 940 L230 925 L205 975 L180 925 L125 945 L140 900 Z" fill="${RED}" ${K(6)} />
        <text class="${p}-tit" x="196" y="900" font-size="52" text-anchor="middle" style="fill:${PAPEL}">¡NO!</text></g>
      ${nube(`${p}-puf`, 300, 1000, 1.3)}`,
    html: `<div class="etiqueta"><span class="${p}-e1">El diablito</span><span class="${p}-e2">Si quiere, que vuelva</span></div>`,
    js: `${trioJs(p, { blinks: [] })}
      // el diablito aparece con un puf de humo
      tl.fromTo(q(".${p}-puf"), { opacity: 1, scale: 0.4, svgOrigin: "300 1000" }, { opacity: 0, scale: 1.8, svgOrigin: "300 1000", duration: 0.5, ease: "power2.out" }, 0);
      pop(q(".${p}-dia"), 0.05, "0 0", 0.5);
      tl.fromTo(q(".${p}-no"), { opacity: 0, scale: 0.2, svgOrigin: "196 880" }, { opacity: 1, scale: 1, svgOrigin: "196 880", duration: 0.3, ease: "back.out(3)" }, 0.3);
      tl.to(q(".${p}-no"), { rotation: 6, svgOrigin: "196 880", duration: 0.06, yoyo: true, repeat: 7 }, 0.6);
      tl.to(q(".${p}-no"), { opacity: 0, scale: 0.5, svgOrigin: "196 880", duration: 0.2 }, 1.25);
      etq(".${p}-e1", 0.15, 2.1);
      // el dueño y el angelito se asustan
      tl.to(qa(".${p}-due-oi .${p}-pupila, .${p}-due-od .${p}-pupila"), { x: -14, duration: 0.15 }, 0.1);
      tl.to(q(".${p}-due-pi"), { scaleY: 0.1, svgOrigin: "-48 -252", duration: 0.12 }, 0.1);
      tl.to(q(".${p}-due-pd"), { scaleY: 0.1, svgOrigin: "48 -252", duration: 0.12 }, 0.1);
      // "pesado": cae la pesa y aplasta el mensaje
      gsap.set(q(".${p}-pesa"), { opacity: 0 });
      tl.set(q(".${p}-pesa"), { opacity: 1 }, 1.28);
      tl.fromTo(q(".${p}-pesa"), { y: -200 }, { y: 70, duration: 0.2, ease: "power3.in" }, 1.28);
      tl.to(q(".${p}-chat-in"), { scaleY: 0.12, scaleX: 1.15, svgOrigin: "400 790", duration: 0.1, ease: "power2.in" }, 1.46);
      tl.to(q(".${p}-pesa"), { y: 240, duration: 0.1, ease: "power2.in" }, 1.5);
      [".${p}-polvo1", ".${p}-polvo2"].forEach((c, i) => tl.fromTo(q(c), { opacity: 0, scale: 0.3, x: 0, svgOrigin: i ? "640 800" : "170 800" }, { opacity: 1, scale: 1.2, x: i ? 60 : -60, svgOrigin: i ? "640 800" : "170 800", duration: 0.35, ease: "power2.out" }, 1.55));
      tl.to([q(".${p}-polvo1"), q(".${p}-polvo2")], { opacity: 0, duration: 0.3 }, 2.0);
      tl.to(q(".${p}-trio"), { y: 10, duration: 0.05, yoyo: true, repeat: 3 }, 1.56);
      // "Si quiere, que vuelva": se encoge de hombros
      tl.to(q(".${p}-dia-bi"), { rotation: 40, svgOrigin: "-44 -150", duration: 0.2, ease: "back.out(2)" }, 2.2);
      tl.to(q(".${p}-dia-cab"), { rotation: -10, svgOrigin: "0 -180", duration: 0.2, ease: "back.out(2)" }, 2.25);
      tl.to(q(".${p}-ang-sonrisa"), { scaleY: -1, svgOrigin: "0 -206", duration: 0.15 }, 2.3);
      tl.to(q(".${p}-due-pi"), { scaleY: 0.45, svgOrigin: "-48 -252", duration: 0.2 }, 2.4);
      tl.to(q(".${p}-due-pd"), { scaleY: 0.45, svgOrigin: "48 -252", duration: 0.2 }, 2.4);
      etq(".${p}-e2", 2.25);
    `,
    sfx: [{ t: 0.0, sfx: "glitch-1", vol: 0.15, max: 0.3 }, { t: 0.05, sfx: "pop", vol: 0.35 }, { t: 0.3, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }, { t: 1.18, sfx: "whoosh", vol: 0.3, max: 0.4 }, { t: 1.48, sfx: "golpe", vol: 0.45 }, { t: 1.5, sfx: "impact-bass-2", vol: 0.35, max: 0.6 }, { t: 2.2, sfx: "salto", vol: 0.3 }],
  });
};

// ============ s05: mañana le escribo (y el calendario vuela) ============
S["s05-manana"] = () => {
  const p = "s05";
  const hojas = [["MAÑANA", 12], ["MAÑANA", 13], ["MAÑANA", 14], ["MAÑANA", 15], ["MAÑANA", 16], ["MAÑANA", 17], ["MAÑANA", 18], ["MAÑANA", 19]];
  const hoja = (txt, n, i) => `<g class="${p}-hoja ${p}-h${i}" data-layout-allow-overlap><rect x="330" y="700" width="420" height="380" rx="10" fill="${PAPEL}" ${K(7)} />
      <text class="${p}-tit" x="540" y="900" font-size="150" text-anchor="middle">${n}</text>
      <text class="${p}-tit" x="540" y="1030" font-size="70" text-anchor="middle" style="fill:${RED}">${txt}</text></g>`;
  return escena("s05-manana", {
    svg: `${trio(p, { ang: false })}
      <g class="${p}-postit"><rect x="120" y="620" width="300" height="200" fill="${HALO}" ${K(6)} transform="rotate(-6 270 720)" />
        <text class="${p}-txt" x="270" y="704" font-size="44" text-anchor="middle" transform="rotate(-6 270 720)">MAÑANA</text>
        <text class="${p}-txt" x="270" y="760" font-size="36" text-anchor="middle" transform="rotate(-6 270 720)">le escribo</text></g>
      <g class="${p}-cal">
        <rect x="310" y="620" width="460" height="480" rx="18" fill="${RED}" ${K(8)} />
        <circle cx="430" cy="650" r="12" fill="${INK}" /><circle cx="650" cy="650" r="12" fill="${INK}" />
        ${hojas.map(([t, n], i) => hoja(t, n, i)).reverse().join("")}
      </g>
      <g class="${p}-cel"><rect x="70" y="1140" width="230" height="120" rx="22" fill="${INK}" ${K(6)} /><rect x="88" y="1156" width="194" height="88" rx="10" fill="#3a4152" /><text class="${p}-txt" x="185" y="1212" font-size="26" text-anchor="middle" style="fill:${PAPEL}">1 mensaje</text><path class="${p}-tela" d="M80 1150 L180 1205 M80 1205 L180 1205 M100 1250 L180 1205 M80 1170 q30 10 40 40 M90 1230 q20 -20 50 -22" fill="none" stroke="${PAPEL}" stroke-width="3" /></g>
      <g transform="translate(880 1200) scale(0.75)"><g class="${p}-dia2">${diablito(p + "b", { tridente: false })}</g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Mañana le escribo</span><span class="${p}-e2">Mañana. Siempre mañana.</span></div>`,
    js: `${trioJs(p, { ang: false, blinks: [0.8] })}
      // "Tenés razón": el dueño asiente, aliviado
      tl.to(q(".${p}-due-cab"), { rotation: 0, y: 14, svgOrigin: "0 -40", duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.05);
      tl.to(q(".${p}-dia-bd"), { rotation: 30, svgOrigin: "44 -150", duration: 0.15, yoyo: true, repeat: 3 }, 0.1);
      // "Mañana le escribo": el celular se va y queda el post-it
      tl.to(q(".${p}-due-cel"), { y: 260, opacity: 0, duration: 0.35, ease: "power2.in" }, 1.1);
      pop(q(".${p}-postit"), 1.2, "270 720");
      etq(".${p}-e1", 1.25, 2.4);
      tl.to(q(".${p}-due-bostezo"), { opacity: 1, duration: 0.05 }, 1.9);
      tl.to(q(".${p}-due-boca"), { opacity: 0, duration: 0.05 }, 1.9);
      tl.fromTo(q(".${p}-due-bostezo"), { scaleY: 0.4, svgOrigin: "0 -62" }, { scaleY: 1.1, svgOrigin: "0 -62", duration: 0.4, yoyo: true, repeat: 1 }, 1.9);
      // "Eso.": se va el trío, entra el calendario
      tl.to([q(".${p}-trio"), q(".${p}-postit")], { opacity: 0, y: 80, duration: 0.25, ease: "power2.in" }, 2.45);
      pop(q(".${p}-cal"), 2.6, "540 1100");
      pop(q(".${p}-dia2"), 2.7, "0 0");
      tl.fromTo(q(".${p}-cel"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.7);
      rebote(q(".${p}-dia2"), "0 0", 2.8, DUR, 0.06);
      rebote(q(".${p}-cal"), "540 1100", 2.9, DUR, 0.02);
      etq(".${p}-e2", 3.34);
      // las hojas del calendario vuelan, cada vez más rápido
      const T = [3.34, 4.32, 4.84, 5.25, 5.6, 6.07, 6.4];
      qa(".${p}-hoja").forEach((h, i) => { if (i > 0) gsap.set(h, { opacity: 0 }); });
      T.forEach((t, i) => {
        const h = q(".${p}-h" + i);
        tl.set(q(".${p}-h" + (i + 1)), { opacity: 1 }, t);
        tl.to(h, { y: -240, x: (i % 2 ? 420 : -420), rotation: (i % 2 ? 50 : -50), svgOrigin: "540 700", duration: 0.45, ease: "power2.in" }, t);
        tl.to(h, { opacity: 0, duration: 0.1 }, t + 0.38);
      });
      // la telaraña crece sobre el celular
      dibujar(qa(".${p}-tela"), 4.9, 0.8);
      // "Y la otra": el diablito se mata de risa
      tl.to(q(".${p}-dia2"), { rotation: -10, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, 6.05);
      tl.to(q(".${p}b-dia-bi"), { rotation: 60, svgOrigin: "-44 -150", duration: 0.2 }, 6.05);
    `,
    sfx: [{ t: 1.1, sfx: "whoosh-short", vol: 0.25 }, { t: 1.2, sfx: "pop", vol: 0.3 }, { t: 2.6, sfx: "salto", vol: 0.3 }, { t: 3.34, sfx: "whoosh-short", vol: 0.3 }, { t: 4.32, sfx: "whoosh-short", vol: 0.3 }, { t: 4.84, sfx: "whoosh-short", vol: 0.3 }, { t: 5.25, sfx: "whoosh-short", vol: 0.3 }, { t: 6.07, sfx: "risas", vol: 0.25, max: 1.1 }],
  });
};

// ============ s06: la señora de los sábados ============
S["s06-senora"] = () => {
  const p = "s06";
  const sab = (i) => `<g class="${p}-sab ${p}-sab${i}"><rect x="${150 + i * 150}" y="1090" width="120" height="110" rx="12" fill="${PAPEL}" ${K(6)} />
    <text class="${p}-tit" x="${210 + i * 150}" y="1132" font-size="30" text-anchor="middle">SÁB</text>
    <path class="${p}-cruz ${p}-cruz${i}" d="M${178 + i * 150} 1146 L${242 + i * 150} 1190 M${242 + i * 150} 1146 L${178 + i * 150} 1190" fill="none" stroke="${RED}" stroke-width="9" /></g>`;
  return escena("s06-senora", {
    svg: `
      <g class="${p}-foto"><g transform="rotate(-4 540 830)"><rect x="330" y="600" width="420" height="470" rx="8" fill="${PAPEL}" ${K(7)} />
        <rect x="358" y="628" width="364" height="340" fill="#e6d6ad" ${K(5)} />
        <g class="${p}-sen-foto" transform="translate(540 1050) scale(0.95)">${senora(p)}</g>
        <rect x="358" y="968" width="364" height="90" fill="${PAPEL}" />
        <path d="M358 968 H722" ${K(5)} />
        <text class="${p}-tit" x="540" y="1035" font-size="44" text-anchor="middle">LOS SÁBADOS</text></g></g>
      ${[0, 1, 2, 3].map(sab).join("")}
      <g transform="translate(905 1225) scale(0.66)"><g class="${p}-angw">${angelito(p)}</g></g>
      <g class="${p}-zz"><text class="${p}-tit" x="960" y="900" font-size="44">Z</text><text class="${p}-tit" x="995" y="855" font-size="34">z</text></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Hace un mes que no viene</span></div>`,
    js: `
      gsap.set(q(".${p}-ang-pi"), { scaleY: 0, svgOrigin: "-21 -267" }); gsap.set(q(".${p}-ang-pd"), { scaleY: 0, svgOrigin: "21 -267" });
      rebote(q(".${p}-angw"), "0 0", 0, DUR, 0.05);
      tl.fromTo(q(".${p}-foto"), { opacity: 0, y: -40, rotation: -10, svgOrigin: "540 600" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "540 600", duration: 0.5, ease: "back.out(2)" }, 0);
      tl.to(q(".${p}-foto"), { rotation: 3, svgOrigin: "540 600", duration: 0.9, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.5);
      tl.fromTo(q(".${p}-angw"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.05);
      // "sábados": los cuatro sábados aparecen
      qa(".${p}-sab").forEach((el, i) => pop(el, 0.9 + i * 0.1, (210 + i * 150) + " 1200"));
      gsap.set(qa(".${p}-cruz"), { opacity: 0 });
      // "Hace un mes": se tachan los sábados y la foto se destiñe
      qa(".${p}-cruz").forEach((el, i) => dibujar([el], 1.84 + i * 0.18, 0.2));
      tl.to(q(".${p}-sen-foto"), { opacity: 0.18, duration: 0.6 }, 2.1);
      etq(".${p}-e1", 1.9);
      // "Escribile... escribile...": el angelito se duerme de a poco
      tl.to(q(".${p}-ang-pi"), { scaleY: 0.55, svgOrigin: "-21 -267", duration: 0.3 }, 3.5);
      tl.to(q(".${p}-ang-pd"), { scaleY: 0.55, svgOrigin: "21 -267", duration: 0.3 }, 3.5);
      tl.to(q(".${p}-ang-cab"), { rotation: 12, svgOrigin: "0 -180", duration: 0.5, ease: "sine.inOut" }, 3.6);
      tl.to(q(".${p}-ang-halo"), { rotation: 18, y: 10, svgOrigin: "0 -326", duration: 0.5 }, 3.6);
      tl.to(q(".${p}-ang-pi"), { scaleY: 1, svgOrigin: "-21 -267", duration: 0.4 }, 4.7);
      tl.to(q(".${p}-ang-pd"), { scaleY: 1, svgOrigin: "21 -267", duration: 0.4 }, 4.7);
      tl.to(q(".${p}-ang-cab"), { rotation: 22, svgOrigin: "0 -180", duration: 0.5, ease: "sine.inOut" }, 4.8);
      tl.fromTo(q(".${p}-zz"), { opacity: 0, y: 20 }, { opacity: 1, y: -20, duration: 0.8 }, 5.0);
    `,
    sfx: [{ t: 0.0, sfx: "pop", vol: 0.3 }, { t: 0.9, sfx: "click", vol: 0.3 }, { t: 1.84, sfx: "tiza", vol: 0 }, { t: 1.84, sfx: "click-soft", vol: 0.35 }, { t: 2.2, sfx: "click-soft", vol: 0.35 }, { t: 3.6, sfx: "ronquido", vol: 0.0 }, { t: 4.9, sfx: "ronquido", vol: 0.25, max: 1.1 }].filter((s) => s.vol > 0),
  });
};

// ============ s07: se habrá ido con el de enfrente ============
S["s07-enfrente"] = () => {
  const p = "s07";
  const toldo = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M${540 + i * 74} 760 h74 v70 q-37 28 -74 0 Z" fill="${i % 2 ? PAPEL : RED}" ${K(5)} />`).join("");
  return escena("s07-enfrente", {
    svg: `
      <g class="${p}-local"><rect x="560" y="640" width="420" height="470" fill="${SEPIA}" ${K(8)} />
        <rect x="580" y="660" width="380" height="90" rx="10" fill="${PAPEL}" ${K(6)} /><text class="${p}-tit" x="770" y="726" font-size="58" text-anchor="middle">ENFRENTE</text>
        ${toldo}
        <rect x="700" y="880" width="140" height="230" fill="${CEL}" ${K(7)} /><circle cx="818" cy="1000" r="8" fill="${INK}" />
        <rect x="590" y="880" width="90" height="120" fill="#e3f2f9" ${K(6)} /><rect x="860" y="880" width="90" height="120" fill="#e3f2f9" ${K(6)} />
        <path d="M480 1110 H1040" ${K(8)} /></g>
      <g class="${p}-senw-pos" transform="translate(560 1110) scale(0.62)"><g class="${p}-senw">${senora(p)}</g></g>
      <g class="${p}-cora"><path d="M770 830 c-20 -28 -56 -6 -34 22 l34 32 l34 -32 c22 -28 -14 -50 -34 -22 Z" fill="${RED}" ${K(5)} /></g>
      <g transform="translate(260 1240) scale(1.0)"><g class="${p}-diaw">${diablito(p)}</g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">El de enfrente</span></div>`,
    js: `
      rebote(q(".${p}-diaw"), "0 0", 0, DUR, 0.06);
      tl.fromTo(q(".${p}-local"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".${p}-diaw"), { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      // "Dejala": manotazo de "andá"
      tl.to(q(".${p}-dia-bd"), { rotation: 50, svgOrigin: "44 -150", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.15);
      tl.to(q(".${p}-dia-cab"), { rotation: -8, svgOrigin: "0 -180", duration: 0.2 }, 0.15);
      tl.to(qa(".${p}-dia-oi .${p}-pupila, .${p}-dia-od .${p}-pupila"), { x: 6, duration: 0.2 }, 0.9);
      // "Se habrá ido": la señora entra feliz al local de enfrente
      tl.fromTo(q(".${p}-senw"), { x: -60, opacity: 0 }, { x: 330, opacity: 1, duration: 1.2, ease: "none" }, 0.8);
      tl.to(q(".${p}-senw"), { y: -16, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.8);
      tl.to(q(".${p}-senw"), { opacity: 0, duration: 0.2 }, 2.0);
      tl.fromTo(q(".${p}-cora"), { opacity: 0, scale: 0.3, svgOrigin: "770 880" }, { opacity: 1, scale: 1, y: -50, svgOrigin: "770 880", duration: 0.5, ease: "back.out(3)" }, 1.8);
      etq(".${p}-e1", 1.75);
    `,
    sfx: [{ t: 0.15, sfx: "whoosh-short", vol: 0.3 }, { t: 1.0, sfx: "tic", vol: 0.25 }, { t: 1.3, sfx: "tic", vol: 0.25 }, { t: 1.6, sfx: "tic", vol: 0.25 }, { t: 1.85, sfx: "campanita", vol: 0.3, max: 1.0 }],
  });
};

// ============ s08: el angelito renuncia ============
S["s08-renuncio"] = () => {
  const p = "s08";
  const local = (x, i) => `<g class="${p}-loc ${p}-loc${i}"><rect x="${x - 110}" y="610" width="220" height="160" fill="${SEPIA}" ${K(6)} />
      <path d="M${x - 124} 650 H${x + 124} L${x + 110} 610 H${x - 110} Z" fill="${RED}" ${K(5)} />
      <rect x="${x - 30}" y="690" width="60" height="80" fill="${CEL}" ${K(5)} />
      <g class="${p}-cartel${i}"><rect x="${x - 92}" y="672" width="184" height="50" rx="8" fill="${PAPEL}" ${K(5)} transform="rotate(-6 ${x} 697)" /><text class="${p}-tit" x="${x}" y="712" font-size="34" text-anchor="middle" style="fill:${RED}" transform="rotate(-6 ${x} 697)">MAÑANA</text></g></g>`;
  return escena("s08-renuncio", {
    svg: `${[200, 540, 880].map(local).join("")}
      <g transform="translate(540 1230) scale(1.25)"><g class="${p}-angw">${angelito(p)}</g></g>
      <g class="${p}-cartel"><rect x="360" y="1000" width="360" height="130" rx="10" fill="${PAPEL}" ${K(7)} transform="rotate(-5 540 1065)" />
        <text class="${p}-tit" x="540" y="1090" font-size="76" text-anchor="middle" style="fill:${RED}" transform="rotate(-5 540 1065)">RENUNCIO</text></g>
      <g class="${p}-zz"><text class="${p}-tit" x="700" y="860" font-size="60">Z</text><text class="${p}-tit" x="750" y="800" font-size="46">z</text><text class="${p}-tit" x="790" y="752" font-size="34">z</text></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Tres comercios a cargo</span><span class="${p}-e2">Renuncia</span></div>`,
    js: `
      gsap.set(q(".${p}-ang-pi"), { scaleY: 1, svgOrigin: "-21 -267" }); gsap.set(q(".${p}-ang-pd"), { scaleY: 1, svgOrigin: "21 -267" });
      rebote(q(".${p}-angw"), "0 0", 0, 7.2, 0.04);
      tl.fromTo(q(".${p}-angw"), { opacity: 0.3, scale: 0.9, svgOrigin: "0 0" }, { opacity: 1, scale: 1, svgOrigin: "0 0", duration: 0.3 }, 0);
      // "aaah": bostezo gigante
      tl.to(q(".${p}-ang-sonrisa"), { opacity: 0, duration: 0.05 }, 0.35);
      tl.to(q(".${p}-ang-bostezo"), { opacity: 1, duration: 0.05 }, 0.35);
      tl.fromTo(q(".${p}-ang-bostezo"), { scale: 0.4, svgOrigin: "0 -200" }, { scale: 1.6, svgOrigin: "0 -200", duration: 0.6, ease: "sine.out" }, 0.35);
      tl.to(q(".${p}-ang-cab"), { rotation: -8, y: -10, svgOrigin: "0 -180", duration: 0.6 }, 0.35);
      tl.to(q(".${p}-ang-bi"), { rotation: 110, svgOrigin: "-38 -150", duration: 0.5 }, 0.4);
      tl.to(q(".${p}-ang-bd"), { rotation: -110, svgOrigin: "38 -150", duration: 0.5 }, 0.4);
      tl.fromTo(q(".${p}-zz"), { opacity: 0, y: 20 }, { opacity: 1, y: -30, duration: 0.9 }, 0.5);
      tl.to(q(".${p}-zz"), { opacity: 0, duration: 0.2 }, 1.5);
      // "Perdón": se despabila
      tl.to(q(".${p}-ang-bostezo"), { scale: 0.3, opacity: 0, svgOrigin: "0 -200", duration: 0.2 }, 1.55);
      tl.to(q(".${p}-ang-sonrisa"), { opacity: 1, duration: 0.05 }, 1.7);
      tl.to(q(".${p}-ang-cab"), { rotation: 0, y: 0, svgOrigin: "0 -180", duration: 0.25 }, 1.6);
      tl.to([q(".${p}-ang-bi"), q(".${p}-ang-bd")], { rotation: 0, duration: 0.3 }, 1.6);
      tl.to(q(".${p}-ang-pi"), { scaleY: 0.4, svgOrigin: "-21 -267", duration: 0.12 }, 1.67);
      tl.to(q(".${p}-ang-pd"), { scaleY: 0.4, svgOrigin: "21 -267", duration: 0.12 }, 1.67);
      // "no doy más": se desinfla, las alas caen
      tl.to(q(".${p}-ang-cab"), { y: 16, svgOrigin: "0 -180", duration: 0.4, ease: "power2.out" }, 2.9);
      tl.to(q(".${p}-ang-alas"), { y: 20, scaleY: 0.85, svgOrigin: "0 -100", duration: 0.4 }, 2.9);
      tl.to(q(".${p}-ang-sonrisa"), { scaleY: -1, svgOrigin: "0 -206", duration: 0.15 }, 3.1);
      // "tres comercios": aparecen los tres locales
      qa(".${p}-loc").forEach((el, i) => pop(el, 3.95 + i * 0.18, [200, 540, 880][i] + " 770"));
      gsap.set([q(".${p}-cartel0"), q(".${p}-cartel1"), q(".${p}-cartel2")], { opacity: 0 });
      etq(".${p}-e1", 4.0, 7.1);
      // "ninguno me hace caso": cartelitos de MAÑANA en los tres
      [0, 1, 2].forEach((i) => tl.fromTo(q(".${p}-cartel" + i), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.25, ease: "bounce.out" }, 5.4 + i * 0.3));
      // "Renuncio": se saca el halo, lo tira, levanta el cartel y se va volando
      tl.to(q(".${p}-ang-halo"), { y: -60, duration: 0.2, ease: "power2.out" }, 7.2);
      tl.to(q(".${p}-ang-halo"), { y: 330, rotation: 30, svgOrigin: "0 -326", duration: 0.45, ease: "bounce.out" }, 7.4);
      tl.fromTo(q(".${p}-cartel"), { opacity: 0, scale: 0.4, svgOrigin: "540 1065" }, { opacity: 1, scale: 1, svgOrigin: "540 1065", duration: 0.3, ease: "back.out(3)" }, 7.26);
      tl.to(q(".${p}-ang-pi"), { scaleY: 0.2, svgOrigin: "-21 -267", duration: 0.1 }, 7.26);
      tl.to(q(".${p}-ang-pd"), { scaleY: 0.2, svgOrigin: "21 -267", duration: 0.1 }, 7.26);
      etq(".${p}-e2", 7.3);
      tl.to(q(".${p}-ang-alas"), { scaleY: 1.2, y: 0, svgOrigin: "0 -100", duration: 0.08, yoyo: true, repeat: 5 }, 7.75);
      tl.to(q(".${p}-angw"), { y: -700, duration: 0.55, ease: "power2.in" }, 7.8);
    `,
    sfx: [{ t: 0.35, sfx: "uuh", vol: 0.0 }, { t: 3.95, sfx: "pop", vol: 0.3 }, { t: 4.13, sfx: "pop", vol: 0.3 }, { t: 4.31, sfx: "pop", vol: 0.3 }, { t: 5.4, sfx: "click", vol: 0.3 }, { t: 5.7, sfx: "click", vol: 0.3 }, { t: 6.0, sfx: "click", vol: 0.3 }, { t: 7.5, sfx: "campanita", vol: 0.35, max: 0.9 }, { t: 7.26, sfx: "golpe", vol: 0.3 }].filter((s) => s.vol > 0),
  });
};

// ============ s09: ¡ganamos! ¿y ese quién es? ============
S["s09-ganamos"] = () => {
  const p = "s09";
  const conf = [[200, 700, RED], [330, 640, HALO], [520, 690, CEL], [700, 650, RED], [880, 720, HALO], [260, 880, CEL], [620, 860, HALO]];
  return escena("s09-ganamos", {
    svg: `
      <path class="${p}-luz" d="M740 560 L960 560 L1060 1250 L640 1250 Z" fill="${HALO}" opacity="0" />
      <g transform="translate(820 1240) scale(0.95)"><g class="${p}-silueta" style="filter: brightness(0)">${agente(p)}</g></g>
      <text class="${p}-tit ${p}-preg" x="820" y="860" font-size="150" text-anchor="middle" style="fill:${PAPEL}; stroke:${INK}; stroke-width:6px; paint-order: stroke">?</text>
      ${conf.map(([x, y, c], i) => chispa(`${p}-cf ${p}-cf${i}`, x, y, 22, c)).join("")}
      <g transform="translate(380 1240) scale(1.05)"><g class="${p}-diaw">${diablito(p)}</g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">¡Ganamos!</span><span class="${p}-e2">¿Y ese quién es?</span></div>`,
    js: `
      // "¡Ganamos!": salta con los brazos arriba
      tl.to(q(".${p}-dia-bi"), { rotation: 120, svgOrigin: "-44 -150", duration: 0.15 }, 0);
      tl.to(q(".${p}-dia-bd"), { rotation: -30, svgOrigin: "44 -150", duration: 0.15 }, 0);
      tl.fromTo(q(".${p}-diaw"), { y: 0 }, { y: -110, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, 0.02);
      tl.to(q(".${p}-diaw"), { scaleY: 0.85, scaleX: 1.1, svgOrigin: "0 0", duration: 0.06, yoyo: true, repeat: 1 }, 0.46);
      qa(".${p}-cf").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(3)" }, 0.05 + i * 0.04));
      qa(".${p}-cf").forEach((el, i) => tl.to(el, { y: 60, rotation: 90, opacity: 0, duration: 0.6 }, 0.7 + i * 0.03));
      etq(".${p}-e1", 0.05, 0.6);
      // "¿Y ese?": se congela y mira a la derecha
      tl.to([q(".${p}-dia-bi"), q(".${p}-dia-bd")], { rotation: 0, duration: 0.2 }, 0.62);
      tl.to(qa(".${p}-dia-oi .${p}-pupila, .${p}-dia-od .${p}-pupila"), { x: 9, duration: 0.15 }, 0.62);
      tl.to(q(".${p}-dia-cejas"), { y: -12, duration: 0.12 }, 0.65);
      // "quién es": se prende la luz y aparece la silueta
      tl.to(q(".${p}-luz"), { opacity: 0.28, duration: 0.1 }, 1.0);
      tl.fromTo(q(".${p}-silueta"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 1.05);
      tl.fromTo(q(".${p}-preg"), { opacity: 0, scale: 0.3, svgOrigin: "820 820" }, { opacity: 1, scale: 1, svgOrigin: "820 820", duration: 0.35, ease: "back.out(3)" }, 1.35);
      tl.to(q(".${p}-preg"), { rotation: 10, svgOrigin: "820 820", duration: 0.12, yoyo: true, repeat: 5 }, 1.7);
      etq(".${p}-e2", 1.36);
    `,
    sfx: [{ t: 0.0, sfx: "salto", vol: 0.35 }, { t: 0.05, sfx: "sparkle", vol: 0.3 }, { t: 0.62, sfx: "tic", vol: 0.3 }, { t: 1.0, sfx: "riser", vol: 0.25, max: 1.4 }, { t: 1.35, sfx: "impact-bass-1", vol: 0.25, max: 0.5 }],
  });
};

// ============ s10: el agente de IA ya le escribió ============
S["s10-agente"] = () => {
  const p = "s10";
  const bub = (cls, x, y, w, txt, fill) => `<g class="${cls}"><rect x="${x}" y="${y}" width="${w}" height="76" rx="22" fill="${fill}" ${K(5)} /><text class="${p}-txt" x="${x + 22}" y="${y + 50}" font-size="31">${txt}</text></g>`;
  return escena("s10-agente", {
    svg: `
      <g class="${p}-tel"><rect x="560" y="600" width="440" height="640" rx="50" fill="${INK}" ${K(6)} />
        <rect x="582" y="624" width="396" height="592" rx="34" fill="${PAPEL}" />
        <rect x="582" y="624" width="396" height="80" rx="34" fill="${CEL}" /><rect x="582" y="670" width="396" height="34" fill="${CEL}" />
        <circle cx="626" cy="664" r="22" fill="${SKIN}" ${K(4)} /><text class="${p}-txt" x="662" y="676" font-size="32">Clienta</text>
        ${bub(`${p}-b1`, 600, 730, 372, "¿Lo seguís queriendo?", "#d9eef7")}
        ${bub(`${p}-b2`, 610, 826, 352, "Te paso el precio", "#d9eef7")}
        ${bub(`${p}-b3`, 600, 922, 250, "¡Sí! Lo quiero", PAPEL)}
        ${bub(`${p}-b4`, 610, 1018, 352, "Listo, te lo reservé", "#d9eef7")}
      </g>
      ${(() => { const x = 780, y = 1150; return `<g class="${p}-sello" transform="rotate(-10 ${x} ${y})"><rect x="${x - 190}" y="${y - 46}" width="380" height="92" rx="12" fill="${PAPEL}" stroke="${RED}" stroke-width="9" /><text class="${p}-tit" x="${x}" y="${y + 20}" font-size="56" text-anchor="middle" style="fill:${RED}">RESERVADO</text></g>`; })()}
      <g class="${p}-pelea">${nube(`${p}-n1`, 290, 720, 1.5)}
        <path d="M200 700 l-30 -30 M380 700 l34 -26 M230 780 l-26 30 M360 780 l30 26" fill="none" ${K(8)} />
        <path d="M250 680 Q240 650 252 636 Q262 656 272 668 Z" fill="${INK}" /><ellipse cx="330" cy="672" rx="26" ry="8" fill="none" stroke="${HALO}" stroke-width="7" />
        ${chispa(`${p}-pe1`, 420, 640, 18)}${chispa(`${p}-pe2`, 160, 650, 14)}</g>
      ${chispa(`${p}-c1`, 300, 800, 28)}${chispa(`${p}-c2`, 790, 760, 22, CEL)}${chispa(`${p}-c3`, 800, 1060, 18)}
      <g transform="translate(540 1240) scale(1.35)"><g class="${p}-agemove"><g class="${p}-agepop"><g class="${p}-agew">${agente(p, { celular: false })}</g></g></g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Tu agente de IA</span><span class="${p}-e2">Mientras discutían</span><span class="${p}-e3">Pedido reservado</span></div>`,
    js: `
      rebote(q(".${p}-agew"), "0 0", 0.5, DUR, 0.05);
      pop(q(".${p}-agepop"), 0, "0 0", 0.6);
      [".${p}-c1", ".${p}-c2", ".${p}-c3"].forEach((c, i) => tl.fromTo(q(c), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: 0.4, ease: "back.out(3)" }, 0.05 + i * 0.08));
      [".${p}-c1", ".${p}-c2", ".${p}-c3"].forEach((c, i) => tl.to(q(c), { opacity: 0, duration: 0.3 }, 1.3 + i * 0.1));
      // "Hola": saluda
      tl.to(q(".${p}-age-bd"), { rotation: 25, svgOrigin: "44 -140", duration: 0.13, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.1);
      tl.to(q(".${p}-age-luz"), { scale: 1.4, svgOrigin: "0 -344", duration: 0.2, yoyo: true, repeat: 9 }, 0.2);
      etq(".${p}-e1", 0.63, 1.8);
      // "Mientras ustedes discutían": la nube de pelea de dibujito
      tl.fromTo(q(".${p}-pelea"), { opacity: 0, scale: 0.3, svgOrigin: "290 720" }, { opacity: 1, scale: 1, svgOrigin: "290 720", duration: 0.3, ease: "back.out(2)" }, 1.86);
      tl.to(q(".${p}-pelea"), { x: 10, y: -6, duration: 0.06, yoyo: true, repeat: 15, ease: "none" }, 2.1);
      tl.to(q(".${p}-pelea"), { opacity: 0, scale: 0.5, svgOrigin: "290 720", duration: 0.2 }, 3.2);
      tl.to(qa(".${p}-age-oi .${p}-pupila, .${p}-age-od .${p}-pupila"), { x: -4, y: -6, duration: 0.2 }, 1.9);
      tl.to(qa(".${p}-age-oi .${p}-pupila, .${p}-age-od .${p}-pupila"), { x: 6, y: 0, duration: 0.2 }, 3.3);
      etq(".${p}-e2", 1.9, 3.3);
      // "le escribí": el teléfono y los mensajes
      tl.fromTo(q(".${p}-agemove"), { x: 0, scale: 1, svgOrigin: "0 0" }, { x: -190, scale: 0.78, svgOrigin: "0 0", duration: 0.35, ease: "back.out(1.4)" }, 3.05);
      pop(q(".${p}-tel"), 3.2, "780 1240");
      gsap.set([q(".${p}-b1"), q(".${p}-b2"), q(".${p}-b3"), q(".${p}-b4")], { opacity: 0 });
      [[".${p}-b1", 3.42], [".${p}-b2", 4.67], [".${p}-b3", 5.25], [".${p}-b4", 5.84]].forEach(([c, t]) => tl.fromTo(q(c), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)" }, t));
      tl.to(q(".${p}-age-bd"), { rotation: -30, svgOrigin: "44 -140", duration: 0.2, ease: "back.out(2)" }, 3.4);
      // "reservé el pedido": sello
      tl.fromTo(q(".${p}-sello"), { opacity: 0, scale: 2.2, svgOrigin: "780 1150" }, { opacity: 1, scale: 1, svgOrigin: "780 1150", duration: 0.2, ease: "power3.in" }, 5.95);
      etq(".${p}-e3", 6.0);
    `,
    sfx: [{ t: 0.0, sfx: "magia", vol: 0.35, max: 1.6 }, { t: 1.86, sfx: "golpe", vol: 0.3 }, { t: 2.3, sfx: "golpe", vol: 0.25 }, { t: 2.7, sfx: "golpe", vol: 0.25 }, { t: 3.42, sfx: "notification", vol: 0.3 }, { t: 4.67, sfx: "notification", vol: 0.3 }, { t: 5.25, sfx: "ping", vol: 0.3 }, { t: 6.13, sfx: "golpe", vol: 0.35 }],
  });
};

// ============ s11: a la señora de los sábados: viene mañana ============
S["s11-sabados"] = () => {
  const p = "s11";
  return escena("s11-sabados", {
    svg: `
      <g class="${p}-msg">${globo(`${p}-g`, 90, 610, 560, 170, "bi", "#d9eef7")}
        <text class="${p}-txt" x="124" y="680" font-size="40">¡Hola! Llegó lo que</text><text class="${p}-txt" x="124" y="736" font-size="40">te gusta</text></g>
      <g class="${p}-cal"><rect x="360" y="610" width="360" height="300" rx="14" fill="${PAPEL}" ${K(7)} /><rect x="360" y="610" width="360" height="70" rx="14" fill="${RED}" ${K(7)} />
        <text class="${p}-tit" x="540" y="805" font-size="80" text-anchor="middle" style="fill:${RED}">MAÑANA</text>
        <path class="${p}-tilde" d="M470 850 L520 885 L620 830" fill="none" ${K(12)} /></g>
      ${[0, 1, 2].map((i) => `<path class="${p}-cora ${p}-cora${i}" d="M${700 + i * 90} ${860 - (i % 2) * 50} c-20 -28 -56 -6 -34 22 l34 32 l34 -32 c22 -28 -14 -50 -34 -22 Z" fill="${RED}" ${K(5)} />`).join("")}
      <g transform="translate(250 1240) scale(0.8)"><g class="${p}-agew">${agente(p, { celular: true })}</g></g>
      <g transform="translate(790 1240) scale(1.05)"><g class="${p}-senw">${senora(p)}</g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">La señora de los sábados</span><span class="${p}-e2">Viene mañana</span></div>`,
    js: `
      rebote(q(".${p}-agew"), "0 0", 0, DUR, 0.05);
      rebote(q(".${p}-senw"), "0 0", 0, DUR, 0.04);
      pop(q(".${p}-senw"), 0.0, "0 0", 0.5);
      tl.fromTo(q(".${p}-agew"), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, 0.05);
      etq(".${p}-e1", 0.4, 3.1);
      // "le avisé": el mensaje sale del celular del agente
      pop(q(".${p}-msg"), 1.7, "200 820");
      tl.to(q(".${p}-age-bd"), { rotation: -20, svgOrigin: "44 -140", duration: 0.15, yoyo: true, repeat: 3 }, 1.7);
      // "lo que le gusta": la señora se pone feliz, corazones
      tl.to(qa(".${p}-sen-oi .${p}-pupila, .${p}-sen-od .${p}-pupila"), { x: -5, y: -4, duration: 0.15 }, 1.9);
      tl.to(q(".${p}-sen-cab"), { rotation: -8, svgOrigin: "0 -180", duration: 0.15, yoyo: true, repeat: 3 }, 2.6);
      tl.to(q(".${p}-sen-bd"), { rotation: -40, svgOrigin: "34 -160", duration: 0.2, ease: "back.out(2)" }, 2.6);
      qa(".${p}-cora").forEach((el, i) => { tl.fromTo(el, { opacity: 0, scale: 0.2, y: 20 }, { opacity: 1, scale: 1, y: -40, duration: 0.45, ease: "back.out(3)" }, 2.6 + i * 0.12); tl.to(el, { opacity: 0, y: -90, duration: 0.3 }, 3.6 + i * 0.05); });
      // "Viene mañana": el mañana que sí llega
      tl.to(q(".${p}-msg"), { opacity: 0, scale: 0.6, svgOrigin: "370 700", duration: 0.2 }, 3.1);
      pop(q(".${p}-cal"), 3.2, "540 910");
      gsap.set(q(".${p}-tilde"), { opacity: 0 });
      dibujar([q(".${p}-tilde")], 3.45, 0.3);
      etq(".${p}-e2", 3.25);
    `,
    sfx: [{ t: 0.0, sfx: "pop", vol: 0.3 }, { t: 1.7, sfx: "notification", vol: 0.35 }, { t: 2.6, sfx: "sparkle", vol: 0.3 }, { t: 3.2, sfx: "salto", vol: 0.3 }, { t: 3.45, sfx: "chime", vol: 0.35 }],
  });
};

// ============ s12: ¿y yo qué hago? buscate otro hombro ============
S["s12-hombro"] = () => {
  const p = "s12";
  return escena("s12-hombro", {
    svg: `
      <g transform="translate(540 1110) scale(0.9)">${dueno(p)}</g>
      <g transform="translate(800 1112) scale(0.74)"><g class="${p}-agew">${agente(p)}</g></g>
      <g class="${p}-diamove"><g transform="translate(292 1112) scale(0.74)"><g class="${p}-diaw">${diablito(p, { tridente: false, cara: "triste" })}</g></g>
        <g class="${p}-cartel"><path d="M160 960 V1110" ${K(8)} /><rect x="40" y="860" width="250" height="120" rx="10" fill="${PAPEL}" ${K(6)} transform="rotate(-6 165 920)" />
          <text class="${p}-tit" x="165" y="910" font-size="40" text-anchor="middle" transform="rotate(-6 165 920)">BUSCO</text><text class="${p}-tit" x="165" y="956" font-size="40" text-anchor="middle" style="fill:${RED}" transform="rotate(-6 165 920)">HOMBRO</text></g></g>
      <g class="${p}-gota"><path d="M372 892 q-14 22 0 30 q14 -8 0 -30 Z" fill="${CEL}" ${K(4)} /></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Sin trabajo</span><span class="${p}-e2">Buscate otro hombro</span></div>`,
    js: `
      gsap.set(q(".${p}-due-pi"), { scaleY: 0.45, svgOrigin: "-48 -252" });
      gsap.set(q(".${p}-due-pd"), { scaleY: 0.45, svgOrigin: "48 -252" });
      rebote(q(".${p}-agew"), "0 0", 0, DUR, 0.05);
      rebote(q(".${p}-due"), "0 170", 0, DUR, 0.015);
      // "¿Y yo qué hago?": el diablito se desinfla
      tl.fromTo(q(".${p}-diaw"), { scaleY: 1, scaleX: 1, svgOrigin: "0 0" }, { scaleY: 0.8, scaleX: 1.08, svgOrigin: "0 0", duration: 0.5, ease: "power2.out" }, 0.1);
      tl.to(q(".${p}-dia-cola"), { rotation: 50, svgOrigin: "24 -96", duration: 0.4 }, 0.1);
      tl.to(q(".${p}-dia-cejas"), { rotation: 0, y: 6, duration: 0.3 }, 0.1);
      tl.fromTo(q(".${p}-gota"), { opacity: 0, y: -10 }, { opacity: 1, y: 30, duration: 0.6 }, 0.3);
      tl.to(q(".${p}-gota"), { opacity: 0, duration: 0.2 }, 0.9);
      tl.to(qa(".${p}-dia-oi .${p}-pupila, .${p}-dia-od .${p}-pupila"), { x: 6, y: 4, duration: 0.2 }, 0.2);
      etq(".${p}-e1", 0.15, 2.05);
      // "Vos buscate otro hombro": el agente lo despide; se va con el cartel
      tl.to(q(".${p}-age-bd"), { rotation: 30, svgOrigin: "44 -140", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 1.2);
      gsap.set(q(".${p}-cartel"), { opacity: 0 });
      tl.fromTo(q(".${p}-cartel"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)" }, 2.1);
      tl.to(q(".${p}-diamove"), { x: -420, duration: 1.1, ease: "power1.in" }, 2.35);
      tl.to(q(".${p}-diamove"), { y: -14, duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 2.35);
      etq(".${p}-e2", 2.16);
    `,
    sfx: [{ t: 0.1, sfx: "uuh", vol: 0.0 }, { t: 0.1, sfx: "whoosh-short", vol: 0.15 }, { t: 2.16, sfx: "risas", vol: 0.3, max: 1.3 }, { t: 2.4, sfx: "tic", vol: 0.25 }, { t: 2.7, sfx: "tic", vol: 0.25 }, { t: 3.0, sfx: "tic", vol: 0.25 }].filter((s) => s.vol > 0),
  });
};

// ============ s13: Scalerics: un empleado de IA que hace el seguimiento ============
S["s13-scalerics"] = () => {
  const p = "s13";
  const sobre = (i) => `<g class="${p}-sob ${p}-sob${i}"><rect x="-34" y="-22" width="68" height="44" rx="10" fill="${PAPEL}" ${K(4)} /><circle cx="-14" cy="0" r="5" fill="${INK}" /><circle cx="0" cy="0" r="5" fill="${INK}" /><circle cx="14" cy="0" r="5" fill="${INK}" /></g>`;
  return escena("s13-scalerics", {
    svg: `
      <g class="${p}-ventana"><rect x="110" y="610" width="230" height="230" rx="14" fill="#2c3550" ${K(8)} /><path d="M225 610 V840 M110 725 H340" ${K(7)} fill="none" />
        <path d="M186 640 A56 56 0 1 0 274 712 A45 45 0 1 1 186 640 Z" fill="${HALO}" ${K(5)} /></g>
      <g class="${p}-reloj"><circle cx="850" cy="700" r="80" fill="${PAPEL}" ${K(8)} />
        <path class="${p}-aguja-h" d="M850 700 L815 665" ${K(9)} /><path class="${p}-aguja-m" d="M850 700 V640" ${K(6)} /><circle cx="850" cy="700" r="8" fill="${INK}" /></g>
      <g class="${p}-trio"><g transform="translate(540 1110) scale(0.9)">${dueno(p)}</g>
        <g transform="translate(800 1112) scale(0.74)"><g class="${p}-agew">${agente(p, { celular: true })}</g></g></g>
      <g class="${p}-zz"><text class="${p}-tit" x="380" y="860" font-size="56">Z</text><text class="${p}-tit" x="340" y="800" font-size="42">z</text><text class="${p}-tit" x="310" y="752" font-size="32">z</text></g>
      ${[0, 1, 2, 3].map((i) => `<g transform="translate(900 900)">${sobre(i)}</g>`).join("")}
      <g class="${p}-pluma"><path d="M0 -90 C40 -60 44 20 0 90 C-44 20 -40 -60 0 -90 Z" fill="${PAPEL}" ${K(5)} transform="translate(250 1000) rotate(20)" /><path d="M0 -80 V110" ${K(4)} transform="translate(250 1000) rotate(20)" /></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">Scalerics</span><span class="${p}-e2">Tu empleado de IA</span><span class="${p}-e3">A cualquier hora</span><span class="${p}-e4">Sin quedar pesado</span></div>`,
    js: `
      gsap.set(q(".${p}-due-pi"), { scaleY: 1, svgOrigin: "-48 -252" });
      gsap.set(q(".${p}-due-pd"), { scaleY: 1, svgOrigin: "48 -252" });
      tl.set(q(".${p}-due-boca"), { attr: { d: "M-26 -70 q26 16 52 0" } }, 0);
      rebote(q(".${p}-agew"), "0 0", 0, DUR, 0.05);
      tl.to(q(".${p}-due"), { y: 8, duration: 1.1, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".${p}-trio"), { opacity: 0.3, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.fromTo([q(".${p}-ventana"), q(".${p}-reloj")], { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
      qa(".${p}-zz text").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3 + i * 0.3));
      etq(".${p}-e1", 0.38, 1.8);
      // "empleado de IA": tipea en su celular
      tl.to(q(".${p}-age-bd"), { rotation: -8, svgOrigin: "44 -140", duration: 0.1, yoyo: true, repeat: 23, ease: "sine.inOut" }, 1.9);
      tl.to(q(".${p}-age-luz"), { scale: 1.4, svgOrigin: "0 -344", duration: 0.2, yoyo: true, repeat: 15 }, 1.9);
      etq(".${p}-e2", 1.9, 4.0);
      // "seguimiento": los mensajes salen volando
      qa(".${p}-sob").forEach((el, i) => {
        const t = 3.2 + i * 0.35;
        tl.fromTo(el, { opacity: 0, x: 0, y: 0, scale: 0.4 }, { opacity: 1, x: 40 + (i % 2) * 30, y: -230 - i * 30, scale: 1, duration: 0.7, ease: "power2.out" }, t);
        tl.to(el, { opacity: 0, duration: 0.2 }, t + 0.7);
      });
      // "a cualquier hora": el reloj gira loco
      tl.to(q(".${p}-aguja-m"), { rotation: 1440, svgOrigin: "850 700", duration: 1.2, ease: "power1.inOut" }, 4.0);
      tl.to(q(".${p}-aguja-h"), { rotation: 120, svgOrigin: "850 700", duration: 1.2, ease: "power1.inOut" }, 4.0);
      etq(".${p}-e3", 4.06, 5.3);
      // "sin quedar pesado": baja una pluma (en vez de la pesa)
      tl.fromTo(q(".${p}-pluma"), { opacity: 0, y: -260, x: 0, rotation: 0, svgOrigin: "250 1000" }, { opacity: 1, y: 0, x: 0, rotation: 0, svgOrigin: "250 1000", duration: 1.3, ease: "sine.out" }, 5.2);
      tl.to(q(".${p}-pluma"), { x: 40, rotation: -25, svgOrigin: "250 1000", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 5.2);
      etq(".${p}-e4", 5.34);
    `,
    sfx: [{ t: 0.0, sfx: "chime", vol: 0.3 }, { t: 0.4, sfx: "ronquido", vol: 0.2, max: 1.5 }, { t: 1.9, sfx: "typing", vol: 0.2, max: 1.5 }, { t: 3.2, sfx: "whoosh-short", vol: 0.25 }, { t: 3.55, sfx: "whoosh-short", vol: 0.25 }, { t: 4.0, sfx: "tic", vol: 0.25 }, { t: 4.4, sfx: "tic", vol: 0.25 }, { t: 5.3, sfx: "sparkle", vol: 0.25 }],
  });
};

// ============ s14: cierre ============
S["s14-cta"] = () => {
  const p = "s14";
  const rayos = Array.from({ length: 18 }, (_, i) => { const a = (i * 20 * Math.PI) / 180, b = ((i * 20 + 10) * Math.PI) / 180, R = 1300; return `<path d="M540 900 L${540 + R * Math.cos(a)} ${900 + R * Math.sin(a)} L${540 + R * Math.cos(b)} ${900 + R * Math.sin(b)} Z" fill="${SEPIA}" />`; }).join("");
  return escena("s14-cta", {
    svg: `
      <g class="${p}-rayos" opacity="0.55">${rayos}</g>
      <g class="${p}-cartel"><ellipse cx="540" cy="880" rx="470" ry="300" fill="${INK}" /><ellipse cx="540" cy="866" rx="458" ry="286" fill="${PAPEL}" ${K(8)} />
        <ellipse cx="540" cy="866" rx="420" ry="250" fill="none" stroke="${RED}" stroke-width="6" />
        <text class="${p}-txt" x="540" y="760" font-size="46" text-anchor="middle">Mandáselo al que siempre dice:</text>
        <g class="${p}-l1"><text class="${p}-tit" x="540" y="900" font-size="120" text-anchor="middle" style="fill:${RED}">MAÑANA</text></g>
        <g class="${p}-l2"><text class="${p}-tit" x="540" y="1020" font-size="120" text-anchor="middle" style="fill:${RED}">LE ESCRIBO</text></g></g>
      <g transform="translate(170 1300) scale(0.85)"><g class="${p}-diaw">${diablito(p)}</g></g>
      <g transform="translate(910 1300) scale(0.75)"><g class="${p}-agew">${agente(p)}</g></g>`,
    html: `<div class="etiqueta"><span class="${p}-e1">¡Mandáselo!</span></div>`,
    js: `
      tl.fromTo(q(".${p}-rayos"), { rotation: 0, svgOrigin: "540 900" }, { rotation: 30, svgOrigin: "540 900", duration: DUR, ease: "none" }, 0);
      pop(q(".${p}-cartel"), 0, "540 880", 0.6);
      rebote(q(".${p}-cartel"), "540 1170", 0.6, DUR, 0.015);
      rebote(q(".${p}-diaw"), "0 0", 0, DUR, 0.06);
      rebote(q(".${p}-agew"), "0 0", 0, DUR, 0.05);
      tl.fromTo(q(".${p}-diaw"), { x: -200 }, { x: 0, duration: 0.4, ease: "back.out(1.6)" }, 0.1);
      tl.fromTo(q(".${p}-agew"), { x: 200 }, { x: 0, duration: 0.4, ease: "back.out(1.6)" }, 0.2);
      gsap.set([q(".${p}-l1"), q(".${p}-l2")], { opacity: 0 });
      tl.fromTo(q(".${p}-l1"), { opacity: 0, scale: 0.4, svgOrigin: "540 860" }, { opacity: 1, scale: 1, svgOrigin: "540 860", duration: 0.35, ease: "back.out(3)" }, 1.75);
      tl.fromTo(q(".${p}-l2"), { opacity: 0, scale: 0.4, svgOrigin: "540 980" }, { opacity: 1, scale: 1, svgOrigin: "540 980", duration: 0.35, ease: "back.out(3)" }, 2.0);
      // el diablito se ríe y el agente lo señala
      tl.to(q(".${p}-dia-cab"), { rotation: 6, svgOrigin: "0 -180", duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, 2.4);
      tl.to(q(".${p}-age-bi"), { rotation: 60, svgOrigin: "-44 -140", duration: 0.25, ease: "back.out(2)" }, 2.5);
      etq(".${p}-e1", 2.6);
      tl.to(q(".${p}-l1"), { rotation: -3, svgOrigin: "540 860", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 2.6);
    `,
    sfx: [{ t: 0.0, sfx: "pop", vol: 0.35 }, { t: 0.1, sfx: "whoosh", vol: 0.25, max: 0.5 }, { t: 1.75, sfx: "golpe", vol: 0.3 }, { t: 2.0, sfx: "golpe", vol: 0.3 }, { t: 2.4, sfx: "risas", vol: 0.25, max: 1.4 }, { t: 3.2, sfx: "campanita", vol: 0.3 }],
  });
};

for (const [id, f] of Object.entries(S)) if (!solo.length || solo.some((s) => id.startsWith(s))) { const r = f(); console.log(id, r.dur); }
