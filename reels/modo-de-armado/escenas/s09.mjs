import { escena } from "./lib.mjs";
const filas = [0, 1, 2, 3, 4].map((i) => `<g class="s09-fila s09-f${i}"><rect x="563" y="${923 + i * 56}" width="424" height="50" fill="#ffcf1f" opacity="0.55" /><path class="fina" d="M585 ${948 + i * 56} h70 M740 ${948 + i * 56} h110 M886 ${948 + i * 56} h30" /><path class="azul" d="M935 ${948 + i * 56} l9 10 l18 -20" style="stroke-width:6" /></g>`).join("\n          ");
escena({
  id: "s09-planilla",
  etiqueta: 1420,
  css: `
    $C .s09-titulo { position: absolute; left: 0; right: 0; top: 610px; text-align: center; }
    $C .s09-titulo span { display: inline-block; padding: 14px 34px 16px; background: #2b50d6; border: 6px solid #1a1a1a; border-radius: 18px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 62px; color: #fffdf6; text-transform: uppercase; box-shadow: 8px 8px 0 #b9b3a3; white-space: nowrap; }
  `,
  svg: `
          <!-- engranaje -->
          <g transform="translate(-70 -20)"><g class="s09-eng">
            <path class="tinta" d="M960 600 l14 -4 l6 -20 l20 0 l6 20 l14 4 l18 -10 l14 14 l-10 18 l4 14 l20 6 l0 20 l-20 6 l-4 14 l10 18 l-14 14 l-18 -10 l-14 4 l-6 20 l-20 0 l-6 -20 l-14 -4 l-18 10 l-14 -14 l10 -18 l-4 -14 l-20 -6 l0 -20 l20 -6 l4 -14 l-10 -18 l14 -14 Z" />
            <circle class="tinta" cx="990" cy="640" r="18" />
          </g></g>
          <!-- el celular con el pedido -->
          <g class="s09-cel">
            <rect class="tinta" x="100" y="860" width="190" height="340" rx="30" />
            <path class="fina" d="M170 880 h50" />
          </g>
          <g class="s09-ped">
            <path class="tinta" d="M120 930 h146 a12 12 0 0 1 12 12 v64 a12 12 0 0 1 -12 12 h-120 l-22 18 Z" style="stroke-width:5" />
            <text class="mono" x="136" y="966" font-size="24" style="letter-spacing:0.04em">PEDIDO</text>
            <path class="fina" d="M136 990 h110" />
          </g>
          <path class="azul s09-flecha" d="M300 1000 Q420 900 545 960" />
          <path class="azul s09-punta" d="M520 940 L548 962 L518 980" />
          <!-- la planilla -->
          <g class="s09-pla">
            <rect class="sombra" x="568" y="868" width="430" height="350" rx="8" />
            <rect class="tinta" x="560" y="860" width="430" height="350" rx="8" />
            <path class="fina" d="M560 920 H990 M560 976 H990 M560 1032 H990 M560 1088 H990 M560 1144 H990 M720 860 V1210 M870 860 V1210" />
            <text class="mono" x="580" y="900" font-size="24">CLIENTE</text>
            <text class="mono" x="738" y="900" font-size="24">PEDIDO</text>
          </g>
          ${filas}
          <g class="s09-sobre"><rect class="tinta" x="0" y="0" width="80" height="44" rx="10" style="stroke-width:5" /><path class="fina" d="M14 22 h50" /></g>
          <g transform="translate(330 1310) scale(0.55)"><g class="s09-h" data-hombre='{"brazoI":"M-40 -196 L-6 -150 L44 -162","brazoD":"M40 -196 L6 -158 L-44 -168"}'></g></g>
          <path class="linea" d="M80 1312 H1000" style="stroke:#b9b3a3" />
  `,
  html: `<div class="s09-titulo"><span>Automatizaciones</span></div>
        <div class="s09-etiqueta">Se hace solo</div>`,
  js: String.raw`
      const AUTO = 1.07, PEDIDO = 2.48, WA = 2.92, PASA = 3.64, SOLO = 3.81, PLANILLA = 4.16;
      tl.fromTo(q(".s09-cel"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s09-pla"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.1);
      tl.fromTo(q(".s09-h .hb"), { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, 0.2);
      // "automatizaciones": el cartel azul y el engranaje
      golpe(q(".s09-titulo span"), AUTO, 1.8);
      pop(q(".s09-eng"), AUTO);
      tl.to(q(".s09-eng"), { rotation: 270, svgOrigin: "990 640", duration: DUR - AUTO, ease: "none" }, AUTO);
      temblor(AUTO + 0.05, 0.6);
      // "el pedido de WhatsApp": llega al celular
      pop(q(".s09-ped"), PEDIDO - 0.15, 0.5);
      tl.to(q(".s09-cel"), { x: 5, duration: 0.05, yoyo: true, repeat: 5 }, WA);
      dibujar([q(".s09-flecha")], WA, 0.4);
      dibujar([q(".s09-punta")], WA + 0.35, 0.12);
      // "pasa solo a la planilla": pedidos que viajan solos y llenan filas
      qa(".s09-fila").forEach((f) => gsap.set(f, { opacity: 0 }));
      const sobre = q(".s09-sobre");
      gsap.set(sobre, { opacity: 0 });
      const viajes = [PASA - 0.2, SOLO + 0.05, PLANILLA + 0.05, PLANILLA + 0.25, PLANILLA + 0.45];
      viajes.forEach((t, i) => {
        tl.set(sobre, { opacity: 1, x: 220, y: 980 }, t);
        tl.to(sobre, { x: 600, y: 925 + i * 56, duration: 0.22, ease: "power2.in" }, t);
        tl.set(sobre, { opacity: 0 }, t + 0.22);
        tl.fromTo(q(".s09-f" + i), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.15, immediateRender: false }, t + 0.2);
      });
      tl.to(q(".s09-h .hb"), { rotation: -4, svgOrigin: "0 0", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, PASA);
      etiquetas([[".s09-etiqueta", PASA]]);
  `,
  sfx: [{ t: 1.0, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 1.1, sfx: "sparkle", vol: 0.25 }, { t: 2.4, sfx: "notification", vol: 0.25 }, { t: 3.5, sfx: "click-soft", vol: 0.3 }, { t: 3.9, sfx: "click-soft", vol: 0.3 }, { t: 4.25, sfx: "click-soft", vol: 0.3 }, { t: 4.6, sfx: "chime", vol: 0.2, max: 0.5 }],
});
