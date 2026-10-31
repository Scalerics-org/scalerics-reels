import { escena, C } from "../escena.mjs";
const pub = Array.from({ length: 7 }, (_, i) => {
  const x = 130 + i * 136, alto = i % 2 ? -14 : 0;
  return `<g class="s06-p"><g transform="translate(${x} ${1326 + alto})">
    <path d="M-62 0 Q-58 -70 0 -76 Q58 -70 62 0 Z" fill="${C.tinta}" stroke="${C.sillon2}" stroke-width="4" />
    <circle cx="0" cy="-104" r="34" fill="${C.tinta}" stroke="${C.sillon2}" stroke-width="4" />
    <g class="s06-pal"><path d="M44 -60 L56 -120" stroke="${C.blanco}" stroke-width="7" stroke-linecap="round" /><rect x="34" y="-166" width="50" height="50" rx="10" fill="${i % 3 === 1 ? C.rosa : C.amarillo}" class="tinta" stroke-width="4" transform="rotate(10 59 -141)" /></g>
  </g></g>`;
}).join("");
escena({
  id: "s06-votos",
  e: ["Votación en vivo", "Tu local: abajo", "Enfrente: arriba"],
  svg: `
          <g class="s06-tablero">
            <rect x="140" y="604" width="800" height="500" rx="24" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="6" />
            <rect x="140" y="604" width="800" height="84" rx="24" fill="${C.rosa}" /><rect x="140" y="660" width="800" height="28" fill="${C.rosa}" />
            <circle class="s06-dot" cx="214" cy="646" r="14" fill="${C.amarillo}" />
            <text class="tv" x="560" y="662" font-size="42" fill="${C.blanco}" text-anchor="middle" letter-spacing="4">VOTACIÓN EN VIVO</text>
            <path d="M200 1020 H880" stroke="${C.sillon2}" stroke-width="4" />
            <path d="M200 920 H880 M200 820 H880" stroke="${C.sillon2}" stroke-width="2" stroke-dasharray="8 12" opacity="0.6" />
            <rect class="s06-b1" x="280" y="720" width="160" height="300" rx="10" fill="${C.sillon2}" />
            <rect class="s06-b2" x="640" y="720" width="160" height="300" rx="10" fill="${C.sillon2}" />
            <text class="tv" x="360" y="1072" font-size="34" fill="${C.blanco}" text-anchor="middle">TU LOCAL</text>
            <text class="tv" x="720" y="1072" font-size="34" fill="${C.blanco}" text-anchor="middle">ENFRENTE</text>
          </g>
          <g class="s06-abajo"><path d="M360 830 V930 M320 890 L360 932 L400 890" fill="none" stroke="${C.rosa}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g class="s06-arriba"><path d="M720 820 V720 M680 760 L720 718 L760 760" fill="none" stroke="${C.tinta}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g class="s06-brillos" stroke="${C.amarillo}" stroke-width="7" stroke-linecap="round"><path d="M860 720 v40 M840 740 h40" /><path d="M600 760 v30 M585 775 h30" /></g>
          <g class="s06-publico">${pub}</g>`,
  js: `
      const PUBLICO = 0.39, VIVO = 1.15, LOCAL = 1.84, ABAJO = 2.57, ENFRENTE = 3.54, ARRIBA = 4.31;
      tl.fromTo(q(".s06-tablero"), { opacity: 0.4, scale: 0.92, svgOrigin: "540 854" }, { opacity: 1, scale: 1, svgOrigin: "540 854", duration: 0.4, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s06-dot"), { opacity: 1 }, { opacity: 0.2, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 16 }, 0);
      etiqueta(0, 0.15);
      gsap.set(qa(".s06-b1, .s06-b2"), { scaleY: 0.05, svgOrigin: "0 1020" });
      qa(".s06-p").forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, PUBLICO - 0.25 + i * 0.05));
      qa(".s06-pal").forEach((p, i) => tl.fromTo(p, { rotation: -14, svgOrigin: "44 -60" }, { rotation: 10, svgOrigin: "44 -60", duration: 0.28, yoyo: true, repeat: 15, ease: "sine.inOut" }, PUBLICO + i * 0.07));
      tl.to(qa(".s06-b1, .s06-b2"), { scaleY: 0.5, svgOrigin: "0 1020", duration: 0.5, ease: "power2.out" }, VIVO - 0.2);
      tl.to(q(".s06-b1"), { scaleY: 0.12, svgOrigin: "0 1020", fill: "${C.rosa}", duration: 0.5, ease: "power3.in" }, ABAJO - 0.4);
      tl.fromTo(q(".s06-abajo"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3 }, ABAJO);
      tl.to(q(".s06-abajo"), { y: 20, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, ABAJO + 0.3);
      temblor(q(".s06-tablero"), ABAJO + 0.1, 0.6);
      etiqueta(1, ABAJO);
      tl.to(q(".s06-b2"), { scaleY: 1, svgOrigin: "0 1020", fill: "${C.amarillo}", duration: 0.6, ease: "back.out(1.4)" }, ENFRENTE);
      tl.fromTo(q(".s06-arriba"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, ARRIBA - 0.2);
      tl.fromTo(q(".s06-brillos"), { opacity: 0, scale: 0.4, svgOrigin: "720 740" }, { opacity: 1, scale: 1, svgOrigin: "720 740", duration: 0.35, ease: "back.out(2)" }, ARRIBA);
      etiqueta(2, ARRIBA - 0.2);`,
  sfx: [{ t: 0.3, sfx: "murmullo", vol: 0.3, max: 2.4 }, { t: 1.0, sfx: "riser", vol: 0.2, max: 1.2 }, { t: 2.5, sfx: "uuh", vol: 0.32, max: 1.2 }, { t: 3.6, sfx: "chime", vol: 0.28 }, { t: 4.3, sfx: "sparkle", vol: 0.25 }],
});
