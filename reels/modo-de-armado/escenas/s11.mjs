import { escena } from "./lib.mjs";
escena({
  id: "s11-reporte",
  etiqueta: 1420,
  svg: `
          <g class="s11-cel">
            <rect class="sombra" x="338" y="608" width="420" height="720" rx="52" />
            <rect class="tinta" x="330" y="600" width="420" height="720" rx="52" />
            <path class="fina" d="M500 630 h80" />
            <text class="num" x="540" y="740" text-anchor="middle" font-size="80">00:31</text>
          </g>
          <path class="linea s11-luna" d="M900 760 A46 46 0 1 1 866 700 A36 36 0 1 0 900 760 Z" />
          <g class="s11-card">
            <rect class="tinta" x="360" y="800" width="360" height="380" rx="24" />
            <rect x="363" y="803" width="354" height="70" rx="21" fill="#2b50d6" />
            <text class="num" x="540" y="850" text-anchor="middle" font-size="30" style="fill:#fffdf6">REPORTE DEL DÍA</text>
            <path class="fina" d="M400 1120 H680" />
            <rect class="s11-b1" x="420" y="980" width="56" height="140" fill="#ffcf1f" stroke="#1a1a1a" stroke-width="5" />
            <rect class="s11-b2" x="512" y="930" width="56" height="190" fill="#ffcf1f" stroke="#1a1a1a" stroke-width="5" />
            <rect class="s11-b3" x="604" y="900" width="56" height="220" fill="#2b50d6" stroke="#1a1a1a" stroke-width="5" />
            <path class="azul s11-tilde" d="M500 1150 l14 14 l26 -28" style="stroke-width:7" />
            <text class="mono s11-listo" x="556" y="1162" font-size="24">LISTO</text>
          </g>
          <path class="azul s11-vib" d="M300 900 q-18 30 0 60 M780 900 q18 30 0 60" />
  `,
  html: `<div class="s11-etiqueta">Reporte</div>`,
  js: String.raw`
      const REPORTE = 0.30, DIA = 0.83, LLEGA = 1.27, CELULAR = 1.54;
      tl.fromTo(q(".s11-cel"), { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
      dibujar([q(".s11-luna")], 0, 0.4);
      gsap.set(q(".s11-card"), { opacity: 0 });
      tl.fromTo(q(".s11-card"), { opacity: 0, y: -220 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, REPORTE - 0.1);
      [".s11-b1", ".s11-b2", ".s11-b3"].forEach((b, i) => tl.fromTo(q(b), { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, DIA - 0.2 + i * 0.1));
      gsap.set(q(".s11-b1"), { scaleY: 0, transformOrigin: "50% 100%" }); gsap.set(q(".s11-b2"), { scaleY: 0, transformOrigin: "50% 100%" }); gsap.set(q(".s11-b3"), { scaleY: 0, transformOrigin: "50% 100%" });
      dibujar([q(".s11-tilde")], LLEGA - 0.1, 0.25);
      pop(q(".s11-listo"), LLEGA);
      dibujar(qa(".s11-vib"), CELULAR - 0.05, 0.15);
      tl.to(q(".s11-escenario"), { x: 6, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, CELULAR);
      etiquetas([[".s11-etiqueta", 0.3]]);
  `,
  sfx: [{ t: 0.2, sfx: "notification", vol: 0.3 }, { t: 0.7, sfx: "pop", vol: 0.25 }, { t: 1.2, sfx: "chime", vol: 0.2, max: 0.5 }, { t: 1.5, sfx: "click-soft", vol: 0.3 }],
});
