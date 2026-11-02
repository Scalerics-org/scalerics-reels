import { escena } from "./lib.mjs";
const hojas = Array.from({ length: 9 }, (_, i) => `<rect class="tinta s08-hoja" x="${90 + (i % 2) * 8}" y="${1290 - (i + 1) * 15}" width="300" height="15" rx="3" style="stroke-width:5" />`).join("\n          ");
escena({
  id: "s08-erratas",
  etiqueta: 1420,
  css: `
    $C .s08-fe { position: absolute; left: 0; right: 0; top: 600px; text-align: center; }
    $C .s08-fe span { display: inline-block; padding: 14px 36px; background: #ffcf1f; border: 6px solid #1a1a1a; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 74px; color: #1a1a1a; text-transform: uppercase; box-shadow: 8px 8px 0 #b9b3a3; white-space: nowrap; }
  `,
  svg: `
          <g class="s08-pila">
          ${hojas}
            <text class="num" x="240" y="1080" text-anchor="middle" font-size="120">47</text>
            <text class="mono" x="240" y="1126" text-anchor="middle">PASOS</text>
          </g>
          <!-- el paso que faltaba: recuadro punteado -->
          <rect class="s08-vacio" x="460" y="780" width="560" height="520" rx="22" fill="#fffdf6" stroke="#1a1a1a" stroke-width="6" stroke-dasharray="22 16" />
          <path class="linea s08-mas" d="M740 990 v100 M690 1040 h100" style="stroke-width:12;stroke:#b9b3a3" />
          <text class="num s08-0" x="490" y="1000" font-size="230" style="fill:#2b50d6">0</text>
          <g transform="translate(700 1270) scale(0.95)"><g class="s08-h" data-hombre='{"brazoI":"M-40 -196 L-6 -150 L44 -162","brazoD":"M40 -196 L6 -158 L-44 -168"}'></g></g>
          <!-- piezas que se encastran solas -->
          <g class="s08-pa">
            <rect class="tinta" x="830" y="880" width="70" height="120" rx="14" />
            <circle class="amarillo" cx="830" cy="880" r="24" style="stroke-width:4" /><text class="num" x="830" y="889" text-anchor="middle" font-size="30">A</text>
          </g>
          <g class="s08-pb">
            <rect class="tinta" x="830" y="1080" width="140" height="110" rx="6" />
            <path class="fina" d="M830 1116 H970 M830 1152 H970 M876 1080 V1190 M924 1080 V1190" />
            <circle class="amarillo" cx="970" cy="1080" r="24" style="stroke-width:4" /><text class="num" x="970" y="1089" text-anchor="middle" font-size="30">B</text>
          </g>
          <path class="azul s08-f1" d="M870 1010 V1066 M852 1048 L870 1068 L888 1048" />
          <path class="azul s08-chispa" d="M1000 1000 l20 -16 M1004 1040 h24 M780 1000 l-20 -16" />
  `,
  html: `<div class="s08-fe"><span>Fe de erratas</span></div>
        <div class="s08-etiqueta">Paso 0</div>`,
  js: String.raw`
      const ERRATAS = 0.35, MANUAL = 1.67, FALTABA = 2.37, PASO = 2.98, CERO = 4.30, DEJA = 5.08, SOLO = 5.70;
      // la tira de "fe de erratas" se pega torcida
      tl.fromTo(q(".s08-fe span"), { opacity: 0.4, scale: 1.25, rotation: 4 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.25, ease: "power4.in" }, 0);
      tl.to(q(".s08-fe span"), { rotation: -4, duration: 0.15, yoyo: true, repeat: 1 }, ERRATAS);
      // la pila del manual
      qa(".s08-hoja").forEach((h, i) => { gsap.set(h, { opacity: 0 }); tl.fromTo(h, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.12, immediateRender: false }, MANUAL - 0.5 + i * 0.05); });
      pop(q(".s08-pila text"), MANUAL - 0.1);
      pop(q(".s08-pila .mono"), MANUAL);
      tl.to(q(".s08-pila"), { scale: 1.06, svgOrigin: "240 1290", duration: 0.15, yoyo: true, repeat: 1 }, MANUAL + 0.1);
      // "le faltaba un paso": el recuadro vacío
      gsap.set(q(".s08-vacio"), { opacity: 0 });
      tl.fromTo(q(".s08-vacio"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, FALTABA - 0.1);
      tl.fromTo(q(".s08-vacio"), { strokeDashoffset: 0 }, { strokeDashoffset: -152, duration: 2, ease: "none", immediateRender: false }, FALTABA);
      pop(q(".s08-mas"), PASO - 0.1);
      tl.to(q(".s08-mas"), { rotation: 90, svgOrigin: "740 1040", duration: 0.5, ease: "power2.inOut" }, PASO + 0.3);
      // "paso cero": cae el 0 azul; se va el +
      tl.to(q(".s08-mas"), { opacity: 0, duration: 0.1 }, CERO - 0.15);
      golpe(q(".s08-0"), CERO, 2.4);
      temblor(CERO + 0.05, 0.7);
      tl.to(q(".s08-vacio"), { strokeDasharray: "1 0", stroke: "#2b50d6", duration: 0.1 }, CERO);
      // "dejá que se haga solo": el hombrecito descansa, las piezas se encastran solas
      gsap.set(q(".s08-h .hb"), { opacity: 0 });
      tl.fromTo(q(".s08-h .hb"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, DEJA - 0.25);
      tl.to(q(".s08-h .hb"), { rotation: -3, svgOrigin: "0 0", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, DEJA + 0.2);
      gsap.set(q(".s08-pa"), { opacity: 0 }); gsap.set(q(".s08-pb"), { opacity: 0 });
      tl.fromTo(q(".s08-pa"), { opacity: 0, x: 80, y: -60 }, { opacity: 1, x: 0, y: 0, duration: 0.3, immediateRender: false }, DEJA);
      tl.fromTo(q(".s08-pb"), { opacity: 0, x: 80, y: 60 }, { opacity: 1, x: 0, y: 0, duration: 0.3, immediateRender: false }, DEJA + 0.1);
      dibujar([q(".s08-f1")], DEJA + 0.35, 0.25);
      tl.to(q(".s08-pa"), { y: 70, duration: 0.25, ease: "power2.in" }, SOLO);
      dibujar([q(".s08-chispa")], SOLO + 0.25, 0.2);
      tl.to(q(".s08-pb"), { scale: 1.06, svgOrigin: "900 1135", duration: 0.12, yoyo: true, repeat: 1 }, SOLO + 0.25);
      etiquetas([[".s08-etiqueta", CERO]]);
  `,
  sfx: [{ t: 0.0, sfx: "glitch-1", vol: 0.25, max: 0.4 }, { t: 0.3, sfx: "pop", vol: 0.3 }, { t: 1.3, sfx: "typing", vol: 0.2, max: 0.5 }, { t: 2.3, sfx: "pop", vol: 0.3 }, { t: 4.2, sfx: "impact-bass-2", vol: 0.45, max: 0.7 }, { t: 5.1, sfx: "whoosh-short", vol: 0.25 }, { t: 5.95, sfx: "sparkle", vol: 0.3 }],
});
