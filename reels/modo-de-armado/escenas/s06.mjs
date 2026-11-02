import { escena } from "./lib.mjs";
escena({
  id: "s06-stock",
  etiqueta: 1420,
  svg: `
          <text class="num s06-49" x="76" y="830" font-size="230">49</text>
          <!-- el local: mostrador con la caja -->
          <g class="s06-local">
            <path class="sombra" d="M88 1308 H448 V1316 H88 Z" />
            <path class="tinta" d="M80 1150 H440 V1300 H80 Z" />
            <path class="fina" d="M80 1190 H440" />
            <text class="mono" x="260" y="1260" text-anchor="middle">LOCAL</text>
          </g>
          <g class="s06-caja">
            <path class="amarillo" d="M210 1060 H310 V1146 H210 Z" />
            <path class="fina" d="M210 1088 H310 M260 1060 V1088" />
          </g>
          <text class="num s06-menos" x="330" y="1050" font-size="70" style="fill:#e0362c">-1</text>
          <!-- la tienda online -->
          <g class="s06-tienda">
            <rect class="sombra" x="568" y="888" width="440" height="420" rx="18" />
            <rect class="tinta" x="560" y="880" width="440" height="420" rx="18" />
            <path class="fina" d="M560 936 H1000" />
            <circle class="fina" cx="592" cy="908" r="9" /><circle class="fina" cx="622" cy="908" r="9" /><circle class="fina" cx="652" cy="908" r="9" />
            <path class="amarillo" d="M620 980 H740 V1080 H620 Z" />
            <path class="fina" d="M620 1012 H740 M680 980 V1012" />
            <text class="mono" x="770" y="1010">TIENDA</text>
            <text class="mono" x="770" y="1050">ONLINE</text>
            <text class="lex" x="600" y="1172" font-size="46">STOCK</text>
          </g>
          <text class="num s06-8" x="780" y="1172" font-size="80">8</text>
          <path class="rojo s06-tacha" d="M770 1152 L840 1100" />
          <text class="num s06-7" x="870" y="1172" font-size="80" style="fill:#2b50d6">7</text>
          <path class="guia s06-guia" d="M380 1130 Q470 1000 590 1150" />
          <!-- el lápiz (a mano) -->
          <g class="s06-lapiz">
            <path class="tinta" d="M0 0 L22 -10 L120 -220 L84 -238 L-14 -28 Z" />
            <path class="relleno-n" d="M0 0 L8 -22 L22 -10 Z" />
            <path class="fina" d="M100 -214 L70 -228" />
          </g>
          <g class="s06-amano">
            <rect class="amarillo" x="600" y="1208" width="190" height="64" rx="10" />
            <text class="num" x="695" y="1254" text-anchor="middle" font-size="40">A MANO</text>
          </g>
  `,
  html: `<div class="s06-etiqueta">Paso 49</div>`,
  js: String.raw`
      const NUEVE = 0.95, VENDISTE = 1.29, ACTUALIZA = 2.41, TIENDA = 3.34, MANO = 4.21;
      tl.fromTo(q(".s06-49"), { opacity: 0.5, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in" }, 0);
      tl.to(q(".s06-49"), { rotation: 4, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, NUEVE);
      tl.fromTo(q(".s06-local"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.05);
      pop(q(".s06-caja"), 0.25);
      pop(q(".s06-tienda"), 0.45);
      gsap.set(q(".s06-8"), { opacity: 0 });
      tl.to(q(".s06-8"), { opacity: 1, duration: 0.2 }, 0.6);
      // "vendiste en el local": la caja se va y aparece el -1
      tl.to(q(".s06-caja"), { x: -260, y: -40, rotation: -20, opacity: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "power2.in" }, VENDISTE);
      golpe(q(".s06-menos"), VENDISTE + 0.3, 1.8);
      // "actualizá": el lápiz viene, tacha el 8 y escribe el 7
      dibujar([q(".s06-guia")], ACTUALIZA - 0.2, 0.5);
      gsap.set(q(".s06-lapiz"), { x: 1100, y: 1400, opacity: 0 });
      tl.to(q(".s06-lapiz"), { opacity: 1, duration: 0.05 }, ACTUALIZA - 0.1);
      tl.to(q(".s06-lapiz"), { x: 770, y: 1150, duration: 0.4, ease: "power2.out" }, ACTUALIZA - 0.1);
      tl.to(q(".s06-lapiz"), { x: 840, y: 1100, duration: 0.25, ease: "none" }, ACTUALIZA + 0.35);
      dibujar([q(".s06-tacha")], ACTUALIZA + 0.35, 0.25);
      tl.to(q(".s06-lapiz"), { x: 880, y: 1170, duration: 0.3, ease: "power1.inOut" }, TIENDA - 0.25);
      [0, 1, 2].forEach((i) => tl.to(q(".s06-lapiz"), { x: 905 - (i % 2) * 25, y: 1120 + i * 18, duration: 0.1, ease: "none" }, TIENDA + 0.05 + i * 0.1));
      gsap.set(q(".s06-7"), { opacity: 0 });
      tl.fromTo(q(".s06-7"), { opacity: 0, scale: 0.5, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.3, immediateRender: false }, TIENDA + 0.05);
      // "a mano": cartel amarillo y el lápiz se agranda
      golpe(q(".s06-amano"), MANO, 2);
      tl.to(q(".s06-lapiz"), { x: 940, y: 1060, duration: 0.2, ease: "back.out(2)" }, MANO);
      [0, 1, 2, 3].forEach((i) => tl.to(q(".s06-lapiz"), { y: 1060 + (i % 2 ? 0 : -24), duration: 0.12, ease: "sine.inOut" }, MANO + 0.2 + i * 0.12));
      temblor(MANO + 0.05, 0.6);
      etiquetas([[".s06-etiqueta", 0.4]]);
  `,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 1.3, sfx: "whoosh-short", vol: 0.25 }, { t: 1.55, sfx: "pop", vol: 0.3 }, { t: 2.75, sfx: "key-press", vol: 0.3 }, { t: 3.4, sfx: "key-press", vol: 0.3 }, { t: 4.15, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }],
});
