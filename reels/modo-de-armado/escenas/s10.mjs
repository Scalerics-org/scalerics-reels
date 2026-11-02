import { escena } from "./lib.mjs";
const XS = [560, 670, 780, 890];
const clientes = XS.map((x, i) => `<g transform="translate(${x} 900) scale(0.48)"><g class="s10-cli s10-cli${i}" data-hombre='{}'></g></g>`).join("\n          ");
const globos = XS.map((x, i) => `<g class="s10-glo s10-glo${i}"><rect class="tinta" x="${x - 48}" y="676" width="96" height="42" rx="12" style="stroke-width:5" /><text class="mono" x="${x}" y="705" text-anchor="middle" font-size="24" style="letter-spacing:0.04em">LISTO</text></g>`).join("\n          ");
const tildes = XS.map((x, i) => `<g class="s10-ok s10-ok${i}"><circle cx="${x + 34}" cy="770" r="20" fill="#fffdf6" stroke="#2b50d6" stroke-width="5" /><path class="azul" d="M${x + 24} 771 l7 8 l13 -16" style="stroke-width:6" /></g>`).join("\n          ");
const visto = (x, y, c) => `<g class="${c}"><circle cx="${x}" cy="${y}" r="34" fill="#2b50d6" stroke="#1a1a1a" stroke-width="5" /><path d="M${x - 15} ${y + 1} l10 11 l20 -24" fill="none" stroke="#fffdf6" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /></g>`;
escena({
  id: "s10-aviso-stock",
  etiqueta: 1420,
  svg: `
          <rect class="sombra" x="78" y="608" width="940" height="320" rx="20" />
          <rect class="tinta s10-r1" x="70" y="600" width="940" height="320" rx="20" />
          <rect class="sombra" x="78" y="968" width="940" height="360" rx="20" />
          <rect class="tinta s10-r2" x="70" y="960" width="940" height="360" rx="20" />
          <!-- arriba: el aviso sale solo -->
          <g class="s10-cel">
            <rect class="tinta" x="130" y="660" width="120" height="210" rx="20" />
            <path class="fina" d="M170 676 h40" />
            <text class="num" x="190" y="790" text-anchor="middle" font-size="44" style="fill:#2b50d6">auto</text>
          </g>
          ${clientes}
          ${globos}
          ${tildes}
          ${visto(970, 640, "s10-v1")}
          <!-- abajo: el stock se actualiza solo -->
          <g class="s10-local">
            <path class="tinta" d="M110 1160 H380 V1290 H110 Z" />
            <path class="fina" d="M110 1196 H380" />
            <text class="mono" x="245" y="1252" text-anchor="middle">LOCAL</text>
          </g>
          <g class="s10-caja">
            <path class="amarillo" d="M200 1076 H290 V1156 H200 Z" />
            <path class="fina" d="M200 1102 H290 M245 1076 V1102" />
          </g>
          <path class="s10-cable" d="M400 1200 C480 1200 520 1130 600 1130" fill="none" stroke="#2b50d6" stroke-width="8" stroke-linecap="round" stroke-dasharray="16 14" />
          <g class="s10-tienda">
            <rect class="tinta" x="620" y="1000" width="350" height="290" rx="16" />
            <path class="fina" d="M620 1048 H970" />
            <circle class="fina" cx="650" cy="1024" r="8" /><circle class="fina" cx="678" cy="1024" r="8" /><circle class="fina" cx="706" cy="1024" r="8" />
            <path class="amarillo" d="M650 1080 H740 V1156 H650 Z" />
            <text class="mono" x="760" y="1112" font-size="24">TIENDA</text>
            <text class="lex" x="650" y="1242" font-size="44">STOCK</text>
          </g>
          <text class="num s10-8" x="820" y="1244" font-size="74">8</text>
          <text class="num s10-7" x="820" y="1244" font-size="74" style="fill:#2b50d6">7</text>
          ${visto(970, 1000, "s10-v2")}
  `,
  html: `<div class="s10-etiqueta">Automático</div>`,
  js: String.raw`
      const AVISO = 0.27, LISTO = 0.97, SALE = 1.54, SOLO = 1.77, STOCK = 2.43, TIENDA = 3.01, ACTUALIZA = 3.45, VENDES = 3.98, LOCAL = 4.69;
      tl.fromTo(q(".s10-r1"), { opacity: 0.5, scale: 0.95, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s10-r2"), { opacity: 0.3, scale: 0.95, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.1);
      pop(q(".s10-cel"), 0.05);
      qa(".s10-cli").forEach((c, i) => { gsap.set(c, { opacity: 0 }); tl.fromTo(c, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, 0.15 + i * 0.06); });
      tl.to(q(".s10-cel"), { x: 4, duration: 0.05, yoyo: true, repeat: 5 }, AVISO);
      // "listo... sale solo": todos los globitos salen a la vez
      qa(".s10-glo").forEach((g, i) => {
        gsap.set(g, { opacity: 0 });
        tl.fromTo(g, { opacity: 0, x: 190 - [560, 670, 780, 890][i], y: 60, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.out", immediateRender: false }, LISTO + i * 0.04);
        pop(q(".s10-ok" + i), SALE - 0.05 + i * 0.05, 0.4);
        tl.to(q(".s10-cli" + i), { y: -14, duration: 0.12, yoyo: true, repeat: 1 }, SALE + i * 0.05);
      });
      golpe(q(".s10-v1"), SOLO, 2);
      // abajo
      pop(q(".s10-local"), STOCK - 0.4);
      pop(q(".s10-caja"), STOCK - 0.3);
      pop(q(".s10-tienda"), STOCK - 0.1);
      gsap.set(q(".s10-7"), { opacity: 0 });
      gsap.set(q(".s10-8"), { opacity: 0 });
      tl.to(q(".s10-8"), { opacity: 1, duration: 0.15 }, STOCK);
      tl.fromTo(q(".s10-tienda"), { scale: 1 }, { scale: 1.04, svgOrigin: "795 1145", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, TIENDA);
      gsap.set(q(".s10-cable"), { opacity: 0 });
      tl.to(q(".s10-cable"), { opacity: 1, duration: 0.2 }, ACTUALIZA - 0.2);
      tl.fromTo(q(".s10-cable"), { strokeDashoffset: 0 }, { strokeDashoffset: -150, duration: DUR - ACTUALIZA, ease: "none", immediateRender: false }, ACTUALIZA - 0.2);
      // "cuando vendés": la caja sale y el stock cambia solo
      tl.to(q(".s10-caja"), { x: -160, y: -30, rotation: -20, opacity: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "power2.in" }, VENDES - 0.1);
      tl.to(q(".s10-8"), { opacity: 0, y: -30, duration: 0.15 }, VENDES + 0.25);
      tl.fromTo(q(".s10-7"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, VENDES + 0.3);
      golpe(q(".s10-v2"), LOCAL, 2);
      etiquetas([[".s10-etiqueta", SOLO]]);
  `,
  sfx: [{ t: 0.25, sfx: "notification", vol: 0.25 }, { t: 0.95, sfx: "whoosh-short", vol: 0.25 }, { t: 1.55, sfx: "ping", vol: 0.25 }, { t: 1.75, sfx: "pop", vol: 0.3 }, { t: 3.9, sfx: "click-soft", vol: 0.3 }, { t: 4.3, sfx: "ping", vol: 0.25 }, { t: 4.65, sfx: "pop", vol: 0.3 }],
});
