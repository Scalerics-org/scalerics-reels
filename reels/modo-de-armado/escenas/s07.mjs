import { escena } from "./lib.mjs";
escena({
  id: "s07-tornillo",
  etiqueta: 1420,
  svg: `
          <!-- reloj de pared -->
          <g class="s07-reloj">
            <circle class="tinta" cx="800" cy="760" r="120" />
            <path class="fina" d="M800 652 v18 M800 850 v18 M692 760 h18 M890 760 h18" />
          </g>
          <path class="s07-ah" d="M800 760 V672" fill="none" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round" />
          <path class="s07-am" d="M800 760 V700" fill="none" stroke="#e0362c" stroke-width="12" stroke-linecap="round" />
          <circle cx="800" cy="760" r="10" class="relleno-n" />
          <text class="num s07-hora" x="800" y="950" text-anchor="middle" font-size="64" style="fill:#e0362c">00:30</text>
          <path class="linea" d="M80 1272 H1010" style="stroke:#b9b3a3" />
          <!-- el hombrecito sentado en el piso, encorvado, con la llave Allen -->
          <g transform="translate(290 1404) scale(1.3)"><g class="s07-h" data-hombre='{"piernaI":"M-20 -104 L52 -168 L92 -104 L112 -104","piernaD":"M20 -104 L78 -158 L118 -104 L136 -104","brazoD":"M40 -196 L82 -150 L118 -170","brazoI":"M-40 -196 L-10 -150 L30 -150"}'></g></g>
          <path class="s07-allen" d="M455 1180 H500 V1230" fill="none" stroke="#1a1a1a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
          <!-- el tornillo sobrante -->
          <g class="s07-tor">
            <path class="tinta" d="M600 1226 h28 v44 h-28 Z" />
            <path class="tinta" d="M628 1238 h70 l10 10 l-10 10 h-70 Z" />
            <path class="fina" d="M642 1238 l-6 20 M660 1238 l-6 20 M678 1238 l-6 20" />
          </g>
          <circle class="rojo s07-circ" cx="654" cy="1248" r="78" />
          <text class="mono s07-x1" x="740" y="1160">x1 ?</text>
          <path class="guia s07-vuelo" d="M640 1220 Q470 980 236 1160" />
          <path class="rojo s07-crac" d="M196 1110 l-34 -20 M200 1160 l-44 0 M196 1210 l-34 20" style="stroke-width:7" />
          <g class="s07-ok">
            <circle cx="620" cy="1100" r="58" fill="#fffdf6" stroke="#2b50d6" stroke-width="8" />
            <path class="azul" d="M590 1102 L612 1126 L650 1078" style="stroke-width:10" />
            <text class="lex" x="700" y="1116" font-size="46" style="fill:#2b50d6">normal</text>
          </g>
  `,
  html: `<div class="s07-etiqueta">Pieza sobrante</div>`,
  js: String.raw`
      const DOCE = 0.47, MEDIA = 1.16, TORNILLO = 2.36, ESE = 3.64, ESPALDA = 5.46, NORMAL = 5.99;
      const H = q(".s07-h .hb");
      gsap.set(H, { rotation: 14, svgOrigin: "0 -104" });
      tl.fromTo(H, { opacity: 0.6, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 0);
      tl.fromTo(q(".s07-reloj"), { opacity: 0.5, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      // las agujas giran hasta las doce y media
      gsap.set(q(".s07-ah"), { rotation: -40, svgOrigin: "800 760" });
      gsap.set(q(".s07-am"), { rotation: -200, svgOrigin: "800 760" });
      tl.to(q(".s07-ah"), { rotation: 15, svgOrigin: "800 760", duration: 1.0, ease: "power2.inOut" }, 0.05);
      tl.to(q(".s07-am"), { rotation: 180, svgOrigin: "800 760", duration: 1.1, ease: "power2.inOut" }, 0.05);
      golpe(q(".s07-hora"), MEDIA, 1.8);
      tl.to(q(".s07-reloj"), { rotation: 5, svgOrigin: "800 760", duration: 0.06, yoyo: true, repeat: 5 }, MEDIA + 0.1);
      // la llave Allen gira en la mano, cansada
      tl.to(q(".s07-allen"), { rotation: -30, svgOrigin: "470 1200", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.2);
      // "me sobró un tornillo"
      pop(q(".s07-tor"), TORNILLO - 0.3, 0.4);
      dibujar([q(".s07-circ")], TORNILLO - 0.05, 0.35);
      pop(q(".s07-x1"), TORNILLO + 0.2);
      tl.to(q(".s07-h .hb-cabeza"), { x: 10, duration: 0.25, ease: "power2.out" }, TORNILLO);
      // "ese tornillo": zoom al tornillo
      tl.to(q(".s07-tor"), { scale: 1.5, svgOrigin: "654 1248", duration: 0.4, ease: "back.out(1.6)" }, ESE);
      tl.to(q(".s07-circ"), { scale: 1.5, svgOrigin: "654 1248", duration: 0.4, ease: "back.out(1.6)" }, ESE);
      tl.to(q(".s07-tor"), { rotation: 20, svgOrigin: "654 1248", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, ESE + 0.4);
      // "es tu espalda": el tornillo vuela a la espalda y el hombrecito se endereza con un crac
      dibujar([q(".s07-vuelo")], ESPALDA - 0.6, 0.4);
      tl.to([q(".s07-circ"), q(".s07-x1")], { opacity: 0, duration: 0.15 }, ESPALDA - 0.5);
      tl.to(q(".s07-tor"), { x: -400, y: -80, scale: 0.9, rotation: -160, svgOrigin: "654 1248", duration: 0.5, ease: "power2.in" }, ESPALDA - 0.45);
      tl.to(H, { rotation: 0, svgOrigin: "0 -104", duration: 0.15, ease: "back.out(3)" }, ESPALDA + 0.05);
      dibujar(qa(".s07-crac"), ESPALDA + 0.05, 0.12);
      temblor(ESPALDA + 0.05, 1.2);
      tl.to(q(".s07-vuelo"), { opacity: 0, duration: 0.2 }, ESPALDA + 0.2);
      pop(q(".s07-ok"), NORMAL - 0.1, 0.5);
      etiquetas([[".s07-etiqueta", TORNILLO]]);
  `,
  sfx: [{ t: 0.05, sfx: "typing", vol: 0.2, max: 0.9 }, { t: 1.1, sfx: "chime", vol: 0.25, max: 0.7 }, { t: 2.1, sfx: "click", vol: 0.35 }, { t: 3.64, sfx: "pop", vol: 0.3 }, { t: 5.0, sfx: "whoosh-short", vol: 0.3 }, { t: 5.48, sfx: "impact-bass-2", vol: 0.45, max: 0.6 }, { t: 5.9, sfx: "ping", vol: 0.25 }],
});
