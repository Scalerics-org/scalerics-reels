import { escena } from "./lib.mjs";
const hojas = Array.from({ length: 9 }, (_, i) => `<rect class="tinta s12-hoja" x="${390 + (i % 2) * 8}" y="${1290 - (i + 1) * 15}" width="300" height="15" rx="3" style="stroke-width:5" />`).join("\n          ");
escena({
  id: "s12-una-pagina",
  etiqueta: 1420,
  svg: `
          ${hojas}
          <g class="s12-hojita">
            <rect class="sombra" x="218" y="618" width="660" height="700" rx="14" />
            <rect class="tinta" x="210" y="610" width="660" height="700" rx="14" />
            <text class="num" x="250" y="690" font-size="44">MANUAL NUEVO</text>
            <path class="fina" d="M250 716 H830" />
          </g>
          <g class="s12-sello">
            <rect x="690" y="640" width="150" height="70" rx="10" fill="#ffcf1f" stroke="#1a1a1a" stroke-width="6" />
            <text class="num" x="765" y="690" text-anchor="middle" font-size="44">1/1</text>
          </g>
          <text class="num s12-uno" x="250" y="900" font-size="190">1</text>
          <!-- la cama -->
          <g class="s12-cama">
            <path class="tinta" d="M300 1150 H800 V1210 H300 Z" />
            <path class="linea" d="M300 1060 V1270 M800 1120 V1270" />
            <rect class="tinta" x="320" y="1100" width="110" height="46" rx="18" />
          </g>
          <g transform="translate(640 1108) rotate(-90) scale(0.9)"><g class="s12-h" data-hombre='{}'></g></g>
          <path class="tinta s12-manta" d="M500 1070 Q650 1050 790 1080 V1150 H500 Z" />
          <text class="num s12-z s12-z1" x="440" y="1030" font-size="54" style="fill:#2b50d6">Z</text>
          <text class="num s12-z s12-z2" x="490" y="980" font-size="66" style="fill:#2b50d6">Z</text>
          <text class="num s12-z s12-z3" x="550" y="920" font-size="80" style="fill:#2b50d6">Z</text>
          <path class="linea s12-luna" d="M780 900 A46 46 0 1 1 746 840 A36 36 0 1 0 780 900 Z" />
  `,
  html: `<div class="s12-etiqueta">1 paso</div>`,
  js: String.raw`
      const NUEVO = 0.52, UNA = 1.27, PAGINA = 1.49, PASO = 2.23, ANDA = 3.05;
      // el manual de 47 pasos se desarma: las hojas vuelan
      qa(".s12-hoja").forEach((h, i) => {
        tl.fromTo(h, { opacity: 1, x: 0, y: 0, rotation: 0 }, { opacity: 0, x: (i % 2 ? 1 : -1) * (400 + i * 40), y: -300 - i * 40, rotation: (i % 2 ? 40 : -40), transformOrigin: "50% 50%", duration: 0.5, ease: "power2.in" }, 0.05 + i * 0.04);
      });
      gsap.set(q(".s12-hojita"), { opacity: 0 });
      tl.fromTo(q(".s12-hojita"), { opacity: 0, scale: 0.7, rotation: -6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, NUEVO - 0.15);
      golpe(q(".s12-sello"), UNA + 0.1, 2.2);
      tl.to(q(".s12-sello"), { rotation: 8, svgOrigin: "765 675", duration: 0.2 }, PAGINA);
      golpe(q(".s12-uno"), PASO + 0.1, 2);
      // "andá a dormir": cama, hombrecito acostado, Z Z Z
      pop(q(".s12-cama"), ANDA - 0.4);
      gsap.set(q(".s12-manta"), { opacity: 0 });
      tl.fromTo(q(".s12-manta"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, ANDA + 0.05);
      gsap.set(q(".s12-h .hb"), { opacity: 0 });
      tl.fromTo(q(".s12-h .hb"), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, ANDA - 0.2);
      tl.to(q(".s12-cama"), { y: 6, duration: 0.08, yoyo: true, repeat: 1 }, ANDA + 0.1);
      qa(".s12-z").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        tl.fromTo(z, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, ANDA + 0.2 + i * 0.25);
        tl.to(z, { y: -10, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, ANDA + 0.5 + i * 0.25);
      });
      dibujar([q(".s12-luna")], ANDA, 0.4);
      etiquetas([[".s12-etiqueta", PASO]]);
  `,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.3 }, { t: 0.4, sfx: "pop", vol: 0.3 }, { t: 1.3, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 2.25, sfx: "pop", vol: 0.3 }, { t: 3.1, sfx: "sparkle", vol: 0.25 }],
});
