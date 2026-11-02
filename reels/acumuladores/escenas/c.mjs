// Escenas s11 a s15: la tienda online, el envío, la camioneta, "¡vendí las camperas!" y el cierre.
import { C, caja, pared, norma, celular } from "./lib.mjs";
const { cem, cem2, gris, kraft, kraft2, cinta, rojo, crema, turq } = C;

// íconos de producto (centrados en 0,0, ~120 px)
const ICON = {
  campera: `<path d="M-50 50 L-30 -40 L0 -54 L30 -40 L50 50 L30 56 L26 0 L26 60 H-26 L-26 0 L-30 56 Z" fill="${gris}" stroke="${cem2}" stroke-width="4" stroke-linejoin="round" /><path d="M0 -50 V60" stroke="${crema}" stroke-width="3" stroke-dasharray="5 5" />`,
  ojotas: `<ellipse cx="-22" cy="0" rx="22" ry="52" fill="${cinta}" stroke="${cem2}" stroke-width="4" /><ellipse cx="26" cy="4" rx="22" ry="52" fill="${rojo}" stroke="${cem2}" stroke-width="4" /><path d="M-22 -30 L-38 0 M-22 -30 L-6 0 M26 -26 L10 4 M26 -26 L42 4" stroke="${crema}" stroke-width="5" stroke-linecap="round" />`,
  taza: `<path d="M-40 -36 H30 V30 Q30 52 -5 52 Q-40 52 -40 30 Z" fill="${crema}" stroke="${cem2}" stroke-width="4" /><path d="M30 -16 Q56 -16 54 8 Q52 28 30 26" stroke="${cem2}" stroke-width="6" fill="none" /><path d="M-26 -10 H16" stroke="${rojo}" stroke-width="6" />`,
  mate: `<path d="M-34 -30 Q-46 30 -10 52 H10 Q46 30 34 -30 Z" fill="${kraft}" stroke="${cem2}" stroke-width="4" /><path d="M10 -30 L34 -66" stroke="${gris}" stroke-width="8" stroke-linecap="round" /><path d="M-34 -30 H34" stroke="${cem2}" stroke-width="4" />`,
};
const tarjeta = (cls, x, y, icon, nombre) => `<g class="${cls}">
  <rect x="${x}" y="${y}" width="210" height="240" rx="18" fill="#fffaf0" stroke="${gris}" stroke-width="3" />
  <g transform="translate(${x + 105} ${y + 80}) scale(0.9)">${ICON[icon]}</g>
  <text x="${x + 105}" y="${y + 166}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="26" fill="${cem2}">${nombre}</text>
  <rect x="${x + 22}" y="${y + 184}" width="166" height="42" rx="21" fill="${turq}" />
  <text x="${x + 105}" y="${y + 214}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="24" fill="${cem2}">Comprar</text>
</g>`;
const confeti = (cls) => Array.from({ length: 22 }, (_, i) => {
  const x = 60 + ((i * 197) % 960), y = 600 + ((i * 131) % 300), col = [cinta, turq, rojo, crema][i % 4], r = (i * 47) % 180;
  return `<rect class="${cls}" x="${x}" y="${y}" width="22" height="12" fill="${col}" transform="rotate(${r} ${x + 11} ${y + 6})" />`;
}).join("");

export default [
  // ---------------------------------------------------------------- s11
  {
    id: "s11-tienda",
    css: `
    [data-composition-id="s11-tienda"] .s11-24 { top: 1150px; left: 430px; right: auto; }
    [data-composition-id="s11-tienda"] .s11-24 b { font-size: 64px; transform: rotate(-9deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-cel">${celular(290, 560, "Bazar Norma")}
            <text class="s11-online" x="540" y="790" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="${cem2}" letter-spacing="4">TIENDA ONLINE</text>
            ${tarjeta("s11-t1", 320, 820, "campera", "Campera")}${tarjeta("s11-t2", 550, 820, "ojotas", "Ojotas")}
            ${tarjeta("s11-t3", 320, 1080, "taza", "Taza")}${tarjeta("s11-t4", 550, 1080, "mate", "Mate")}
          </g>
          <g class="s11-vuela">
            ${caja("s11-c1", 40, 760, 150, 110, { txt: "CAMPERAS", tam: 22 })}${caja("s11-c2", 30, 960, 160, 110, { txt: "ojotas", tam: 24 })}
            ${caja("s11-c3", 50, 1160, 140, 110, { txt: "tazas", tam: 24 })}
          </g>
        </svg>
        <div class="txt sello turq s11-24"><b>Abierto 24 h</b></div>
        <div class="zoc s11-z1"><div class="tab turq">Scalerics</div><div class="tit">Tu tienda online</div></div>`,
    js: `
      const ARM = 0.7, TIENDA = 1.31, TODO = 2.27, DEP = 2.54, H24 = 3.59;
      gsap.set(q(".s11-cel"), { opacity: 0 });
      tl.fromTo(q(".s11-cel"), { opacity: 0, y: 300, scale: 0.85, svgOrigin: "540 955" }, { opacity: 1, y: 0, scale: 1, svgOrigin: "540 955", duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, 0);
      zocalos([[".s11-z1", ARM]]);
      pop(".s11-online", TIENDA, 0.3, 0.6);
      // las cajas vuelan al celular y se vuelven productos
      qa(".s11-c1, .s11-c2, .s11-c3").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 1, x: -250 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, TODO - 0.3 + i * 0.05);
        tl.to(c, { x: 380, y: 60 - i * 80, scale: 0.2, opacity: 0, transformOrigin: "50% 50%", duration: 0.35, ease: "power2.in" }, TODO + 0.1 + i * 0.12);
      });
      ["s11-t1", "s11-t2", "s11-t3", "s11-t4"].forEach((t, i) => pop("." + t, DEP + i * 0.14, 0.32, 0.4));
      golpe(".s11-24", H24, 2.2);
      tl.to(qa(".s11-t1 rect:nth-of-type(2), .s11-t4 rect:nth-of-type(2)"), { opacity: 0.5, duration: 0.15, yoyo: true, repeat: 3 }, H24 + 0.3);`,
    sfx: [
      { t: 0.0, sfx: "whoosh", vol: 0.28 },
      { t: 1.3, sfx: "chime", vol: 0.28, max: 0.9 },
      { t: 2.3, sfx: "whoosh-short", vol: 0.3 },
      { t: 2.55, sfx: "pop", vol: 0.25 },
      { t: 2.85, sfx: "pop", vol: 0.25 },
      { t: 3.55, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s12
  {
    id: "s12-envios",
    css: `
    [data-composition-id="s12-envios"] .s12-chip { position: absolute; top: 1220px; height: 100px; padding: 0 30px; display: flex; align-items: center; gap: 14px; border-radius: 50px; background: ${crema}; border: 5px solid ${turq}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: ${cem2}; white-space: nowrap; }
    [data-composition-id="s12-envios"] .s12-chip i { width: 22px; height: 22px; border-radius: 50%; background: ${turq}; display: inline-block; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-pago">
            <rect x="140" y="610" width="800" height="140" rx="70" fill="${turq}" stroke="${crema}" stroke-width="5" />
            <text x="540" y="698" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="52" fill="${cem2}">Pagar · Mercado Pago</text>
          </g>
          <circle class="s12-tap" cx="800" cy="690" r="40" fill="none" stroke="${crema}" stroke-width="6" />
          <g class="s12-caja"><g class="s12-cj">${caja("s12-c", 360, 830, 360, 260, { txt: "Campera", tam: 40 })}
            <rect x="360" y="1030" width="360" height="40" fill="${turq}" opacity="0.95" />
            <text x="540" y="1062" text-anchor="middle" font-family="Black Ops One" font-size="32" fill="${cem2}">ENVÍO</text></g>
            <path class="s12-v1" d="M300 900 H220 M300 960 H180 M300 1020 H230" stroke="${crema}" stroke-width="6" stroke-linecap="round" opacity="0.6" />
          </g>
        </svg>
        <div class="s12-chip s12-d" style="left:70px"><i></i>DAC</div>
        <div class="s12-chip s12-co" style="left:330px"><i></i>Correo</div>
        <div class="s12-chip s12-py" style="left:640px"><i></i>PedidosYa</div>`,
    js: `
      const MP = 0.08, ENV = 0.96, DAC = 1.4, CO = 1.97, PY = 2.45;
      pop(".s12-pago", 0, 0.35, 0.7);
      gsap.set(q(".s12-tap"), { opacity: 0 });
      tl.fromTo(q(".s12-tap"), { opacity: 1, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 2, transformOrigin: "50% 50%", duration: 0.5, immediateRender: false }, MP + 0.3);
      tl.to(q(".s12-pago"), { scale: 0.95, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, MP + 0.3);
      gsap.set(q(".s12-caja"), { opacity: 0 });
      tl.fromTo(q(".s12-caja"), { opacity: 1, x: -700 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.2)", immediateRender: false }, ENV - 0.15);
      tl.fromTo(q(".s12-cj"), { y: 0 }, { y: -16, duration: 0.18, yoyo: true, repeat: 9, ease: "sine.out" }, ENV + 0.3);
      fuera(".s12-v1", ENV + 0.6, 0.3);
      pop(".s12-d", DAC - 0.05, 0.3, 0.5); pop(".s12-co", CO - 0.05, 0.3, 0.5); pop(".s12-py", PY - 0.05, 0.3, 0.5);`,
    sfx: [
      { t: 0.35, sfx: "click", vol: 0.35 },
      { t: 0.85, sfx: "whoosh", vol: 0.28 },
      { t: 1.35, sfx: "pop", vol: 0.28 },
      { t: 1.92, sfx: "pop", vol: 0.28 },
      { t: 2.4, sfx: "pop", vol: 0.28 },
      { t: 2.9, sfx: "ping", vol: 0.25, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s13
  {
    id: "s13-camioneta",
    css: `
    [data-composition-id="s13-camioneta"] .s13-t1 { top: 740px; transform: rotate(-5deg); }
    [data-composition-id="s13-camioneta"] .s13-t2 { top: 900px; transform: rotate(4deg); background: ${crema}; }
    [data-composition-id="s13-camioneta"] .s13-t1 span, [data-composition-id="s13-camioneta"] .s13-t2 span { font-size: 110px; }
    [data-composition-id="s13-camioneta"] .s13-aah { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font-size: 84px; color: ${crema}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-dep">
            <path d="M40 1330 H1040" stroke="${gris}" stroke-width="6" />
            <g class="s13-cajas">
              ${caja("s13-c1", 120, 1170, 180, 160, { vendido: true })}${caja("s13-c2", 310, 1190, 160, 140, { vendido: true })}${caja("s13-c3", 160, 1040, 150, 130, { vendido: true })}
            </g>
            <path class="s13-r1" d="M70 780 Q30 900 70 1020" stroke="${crema}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.6" />
            <path class="s13-r2" d="M1010 780 Q1050 900 1010 1020" stroke="${crema}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.6" />
          </g>
          <g class="s13-van"><g class="s13-vanb">
            <path d="M560 1290 V1060 Q560 1030 590 1030 H880 Q920 1030 940 1080 L1010 1170 Q1020 1185 1020 1200 V1290 Z" fill="${crema}" stroke="${cem2}" stroke-width="5" stroke-linejoin="round" />
            <path d="M890 1060 H920 L975 1160 H890 Z" fill="${cem}" stroke="${cem2}" stroke-width="4" />
            <rect x="560" y="1200" width="460" height="34" fill="${turq}" />
            <text x="700" y="1150" text-anchor="middle" font-family="Black Ops One" font-size="40" fill="${cem2}">ENVÍOS</text>
            <circle cx="640" cy="1296" r="40" fill="${cem2}" stroke="${crema}" stroke-width="5" /><circle cx="930" cy="1296" r="40" fill="${cem2}" stroke="${crema}" stroke-width="5" />
          </g>
            <g class="s13-vel"><path d="M1060 1100 H1180 M1070 1170 H1220 M1060 1240 H1160" stroke="${crema}" stroke-width="7" stroke-linecap="round" opacity="0.6" /></g>
          </g>
        </svg>
        <div class="tira s13-t1"><span>UN MES</span></div>
        <div class="tira s13-t2"><span>DESPUÉS</span></div>
        <div class="txt mano s13-aah">aaah... espacio</div>`,
    js: `
      const DESP = 0.36, DEP = 1.09, RESP = 1.79, Y = 2.9, CAMP = 3.13, VAN = 3.84, CAMI = 4.29;
      tira(".s13-t1", 0, -1300);
      tira(".s13-t2", DESP - 0.05, 1300);
      fuera([".s13-t1", ".s13-t2"], DEP - 0.15, 0.2);
      gsap.set(q(".s13-dep"), { opacity: 0 });
      tl.to(q(".s13-dep"), { opacity: 1, duration: 0.3 }, DEP);
      tl.fromTo(qa(".s13-r1, .s13-r2"), { scale: 0.9, transformOrigin: "50% 50%" }, { scale: 1.15, duration: 0.5, yoyo: true, repeat: 2, ease: "sine.inOut" }, RESP - 0.3);
      tl.fromTo(q(".s13-r1"), { x: 0 }, { x: -20, duration: 0.5, yoyo: true, repeat: 2, ease: "sine.inOut" }, RESP - 0.3);
      tl.fromTo(q(".s13-r2"), { x: 0 }, { x: 20, duration: 0.5, yoyo: true, repeat: 2, ease: "sine.inOut" }, RESP - 0.3);
      pop(".s13-aah", RESP, 0.35, 0.7);
      fuera([".s13-aah", ".s13-r1", ".s13-r2"], Y - 0.2, 0.2);
      // la camioneta entra, carga y se va
      gsap.set(q(".s13-van"), { opacity: 0 });
      tl.fromTo(q(".s13-van"), { opacity: 1, x: 700 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, Y - 0.15);
      gsap.set(q(".s13-vel"), { opacity: 0 });
      tl.fromTo(q(".s13-vel"), { opacity: 1 }, { opacity: 0, duration: 0.3 }, Y + 0.3);
      qa(".s13-c1, .s13-c2, .s13-c3").forEach((c, i) => {
        tl.to(c, { x: 480 - i * 30, y: -80, scale: 0.4, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.in" }, CAMP + i * 0.2);
        tl.to(c, { opacity: 0, duration: 0.05 }, CAMP + i * 0.2 + 0.28);
        tl.fromTo(q(".s13-vanb"), { y: 0 }, { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, CAMP + i * 0.2 + 0.3);
      });
      tl.to(q(".s13-van"), { x: -1300, duration: 0.8, ease: "power3.in" }, CAMI + 0.15);
      tl.set(q(".s13-vel"), { x: 0 }, CAMI);
      tl.to(q(".s13-vel"), { opacity: 1, duration: 0.1 }, CAMI + 0.1);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.35, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 1.8, sfx: "sparkle", vol: 0.22, max: 0.8 },
      { t: 2.8, sfx: "whoosh", vol: 0.3 },
      { t: 3.45, sfx: "pop", vol: 0.25 },
      { t: 4.3, sfx: "whoosh-cinematic", vol: 0.3, max: 1.0 },
    ],
  },
  // ---------------------------------------------------------------- s14
  {
    id: "s14-vendi",
    css: `
    [data-composition-id="s14-vendi"] .s14-sello { top: 610px; }
    [data-composition-id="s14-vendi"] .s14-sello b { font-size: 96px; transform: rotate(-7deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-conf">${confeti("s14-cf")}</g>
          <g transform="translate(470 1000)"><g class="s14-nor">${norma("s14n", { brazos: "arriba" })}</g></g>
          <g class="s14-cal">
            <rect x="760" y="1080" width="250" height="260" rx="10" fill="${crema}" stroke="${cem2}" stroke-width="5" />
            <rect x="760" y="1080" width="250" height="74" rx="10" fill="${rojo}" />
            <text class="s14-marzo" x="885" y="1134" text-anchor="middle" font-family="Black Ops One" font-size="44" fill="${crema}">MARZO</text>
            <g class="s14-nov" opacity="0"><rect x="760" y="1080" width="250" height="74" rx="10" fill="${turq}" />
            <text x="885" y="1132" text-anchor="middle" font-family="Black Ops One" font-size="34" fill="${cem2}">NOVIEMBRE</text></g>
            ${Array.from({ length: 12 }, (_, i) => `<rect x="${782 + (i % 4) * 56}" y="${1176 + Math.floor(i / 4) * 54}" width="40" height="40" rx="4" fill="${gris}" opacity="0.5" />`).join("")}
            <rect class="s14-hoy" x="838" y="1230" width="40" height="40" rx="4" fill="${turq}" opacity="0" />
            <path class="s14-x" d="M770 1090 L1000 1330 M1000 1090 L770 1330" stroke="${rojo}" stroke-width="12" stroke-linecap="round" />
          </g>
        </svg>
        <div class="txt sello turq s14-sello"><b>¡Vendidas!</b></div>`,
    js: `
      const CAMP = 0.75, Y = 1.93, MARZO = 2.83;
      tl.fromTo(q(".s14-nor"), { y: 0 }, { y: -50, duration: 0.22, yoyo: true, repeat: 9, ease: "power1.out" }, 0);
      tl.fromTo(q(".s14n-bi"), { rotation: 0, transformOrigin: "100% 100%" }, { rotation: -10, transformOrigin: "100% 100%", duration: 0.22, yoyo: true, repeat: 9 }, 0);
      tl.fromTo(q(".s14n-bd"), { rotation: 0, transformOrigin: "0% 100%" }, { rotation: 10, transformOrigin: "0% 100%", duration: 0.22, yoyo: true, repeat: 9 }, 0);
      hablar(".s14n-boca", 0, 3.6);
      qa(".s14-cf").forEach((c, i) => tl.fromTo(c, { y: -40 - (i % 5) * 20, opacity: 1 }, { y: 600 + (i % 3) * 60, rotation: 360, transformOrigin: "50% 50%", duration: 2.6 + (i % 4) * 0.3, ease: "none" }, (i % 6) * 0.08));
      golpe(".s14-sello", CAMP, 2.4);
      sacudon(CAMP + 0.05, 1.1);
      fuera(".s14-sello", Y - 0.1, 0.2);
      gsap.set(q(".s14-cal"), { opacity: 0 });
      tl.fromTo(q(".s14-cal"), { opacity: 1, x: 400, rotation: 10, svgOrigin: "885 1210" }, { opacity: 1, x: 0, rotation: 0, svgOrigin: "885 1210", duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, Y - 0.15);
      dibujar(".s14-x", Y + 0.35, 0.3);
      fuera(".s14-x", MARZO - 0.05, 0.1);
      tl.set(q(".s14-nov"), { opacity: 1 }, MARZO);
      tl.set(q(".s14-marzo"), { opacity: 0 }, MARZO);
      tl.fromTo(q(".s14-cal"), { scale: 1 }, { scale: 1.08, svgOrigin: "885 1210", duration: 0.15, yoyo: true, repeat: 1 }, MARZO);
      tl.to(q(".s14-hoy"), { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, MARZO + 0.1);`,
    sfx: [
      { t: 0.0, sfx: "sparkle", vol: 0.3, max: 1.0 },
      { t: 0.72, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.8, sfx: "whoosh", vol: 0.25 },
      { t: 2.25, sfx: "glitch-1", vol: 0.22, max: 0.3 },
      { t: 2.8, sfx: "chime", vol: 0.28, max: 0.9 },
    ],
  },
  // ---------------------------------------------------------------- s15
  {
    id: "s15-cta",
    css: `
    [data-composition-id="s15-cta"] .s15-tira { top: 600px; transform: rotate(-4deg); }
    [data-composition-id="s15-cta"] .s15-tira span { font-size: 116px; }
    [data-composition-id="s15-cta"] .s15-al { top: 780px; font-size: 70px; color: ${crema}; }
    [data-composition-id="s15-cta"] .s15-lleno { top: 870px; font-weight: 900; font-size: 84px; color: ${cinta}; text-shadow: 5px 5px 0 ${rojo}; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-pila">${pared("s15-c", { x0: 300, x1: 780, yBase: 1340, filas: 3, w: 120, h: 90, txts: ["CAMPERAS", "ojotas", "tazas"], urg: [2, 6] })}</g>
          <g class="s15-share">
            <circle cx="900" cy="1150" r="90" fill="${turq}" stroke="${crema}" stroke-width="6" />
            <path d="M850 1150 L950 1100 L920 1210 L895 1165 Z" fill="${crema}" stroke="${cem2}" stroke-width="4" stroke-linejoin="round" />
            <path d="M895 1165 L950 1100" stroke="${cem2}" stroke-width="4" />
          </g>
        </svg>
        <div class="tira s15-tira"><span>MANDÁSELO</span></div>
        <div class="txt mano s15-al">al que tiene</div>
        <div class="txt s15-lleno">el depósito lleno</div>
        <div class="zoc s15-z1"><div class="tab">Próximo caso</div><div class="tit">¿Vos?</div></div>`,
    js: `
      const AL = 0.65, DEP = 1.11, LLENO = 1.39;
      tira(".s15-tira", 0, -1300);
      sacudon(0.25, 0.8);
      pop(".s15-al", AL, 0.3, 0.7);
      golpe(".s15-lleno", DEP, 1.8);
      qa(".s15-c").forEach((c, i) => cae(c, 0.1 + (i % 12) * 0.06, -600, 0.45));
      tl.fromTo(q(".s15-pila"), { rotation: -2, svgOrigin: "540 1340" }, { rotation: 2, svgOrigin: "540 1340", duration: 0.5, yoyo: true, repeat: 6, ease: "sine.inOut" }, LLENO);
      pop(".s15-share", LLENO + 0.4, 0.35, 0.4);
      tl.to(q(".s15-share"), { x: 16, y: -16, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, LLENO + 0.8);
      zocalos([[".s15-z1", LLENO + 0.6]]);`,
    sfx: [
      { t: 0.0, sfx: "whoosh-short", vol: 0.3 },
      { t: 0.25, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
      { t: 1.05, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
      { t: 1.8, sfx: "pop", vol: 0.3 },
      { t: 2.0, sfx: "whoosh", vol: 0.22 },
    ],
  },
];
