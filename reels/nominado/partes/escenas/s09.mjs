import { escena, C } from "../escena.mjs";
const conf = Array.from({ length: 16 }, (_, i) => {
  const x = 140 + ((i * 53) % 800), y = 620 + ((i * 97) % 260), col = [C.rosa, C.amarillo, C.blanco, C.sillon2][i % 4];
  return `<rect class="s09-cf" x="${x}" y="${y}" width="${14 + (i % 3) * 4}" height="${26 - (i % 3) * 4}" rx="3" fill="${col}" transform="rotate(${(i * 37) % 90} ${x} ${y})" />`;
}).join("");
escena({
  id: "s09-ingreso",
  e: ["¡Ingreso sorpresa!"],
  svg: `
          <g class="s09-cartel"><g transform="translate(540 650)">
            <rect x="-330" y="-50" width="660" height="100" rx="50" fill="${C.tinta}" stroke="${C.rosa}" stroke-width="8" />
            <text class="tv" x="0" y="18" font-size="50" fill="${C.rosa}" text-anchor="middle" letter-spacing="4">INGRESO SORPRESA</text>
          </g></g>
          <g class="s09-marco">
            <rect x="330" y="730" width="420" height="600" fill="${C.sillon}" class="tinta" stroke-width="8" />
            <rect x="360" y="760" width="360" height="570" fill="${C.amarillo}" />
          </g>
          <g class="s09-rayos" fill="${C.amarillo}" opacity="0.35">
            <path d="M540 1000 L120 760 L120 860 Z" /><path d="M540 1000 L960 760 L960 860 Z" /><path d="M540 1000 L100 1100 L120 1200 Z" /><path d="M540 1000 L980 1100 L960 1200 Z" />
          </g>
          <g class="s09-silueta"><g transform="translate(540 1330)">
            <path d="M-150 0 Q-140 -130 -60 -150 L60 -150 Q140 -130 150 0 Z" fill="${C.tinta}" />
            <rect x="-90" y="-330" width="180" height="160" rx="44" fill="${C.tinta}" />
            <rect x="-52" y="-282" width="28" height="40" rx="13" fill="${C.amarillo}" /><rect x="24" y="-282" width="28" height="40" rx="13" fill="${C.amarillo}" />
          </g></g>
          <g class="s09-puerta"><rect x="360" y="760" width="360" height="570" fill="${C.sillon2}" class="tinta" stroke-width="6" />
            <rect x="400" y="800" width="280" height="200" rx="8" fill="none" stroke="${C.tinta}" stroke-width="5" opacity="0.5" />
            <rect x="400" y="1050" width="280" height="230" rx="8" fill="none" stroke="${C.tinta}" stroke-width="5" opacity="0.5" />
            <circle cx="680" cy="1040" r="14" fill="${C.amarillo}" class="tinta" stroke-width="4" /></g>
          <g class="s09-humo" fill="${C.blanco}" opacity="0.5"><circle cx="300" cy="1300" r="60" /><circle cx="380" cy="1320" r="48" /><circle cx="760" cy="1310" r="56" /><circle cx="830" cy="1290" r="44" /></g>
          ${conf}`,
  js: `
      const SORPRESA = 0.53, CASA = 1.25;
      tl.fromTo(q(".s09-marco"), { opacity: 0.5, scale: 0.94, svgOrigin: "540 1030" }, { opacity: 1, scale: 1, svgOrigin: "540 1030", duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s09-cartel"), { opacity: 0.3, scale: 0.6, svgOrigin: "540 650" }, { opacity: 1, scale: 1, svgOrigin: "540 650", duration: 0.3, ease: "back.out(2)" }, 0);
      tl.to(q(".s09-cartel"), { opacity: 0.5, duration: 0.08, yoyo: true, repeat: 5, ease: "steps(1)" }, 0.35);
      etiqueta(0, 0.1);
      gsap.set(q(".s09-silueta"), { opacity: 0 });
      gsap.set(q(".s09-rayos"), { opacity: 0 });
      tl.to(q(".s09-puerta"), { scaleX: 0.08, svgOrigin: "360 1045", duration: 0.45, ease: "power3.in" }, SORPRESA - 0.2);
      tl.to(q(".s09-rayos"), { opacity: 0.35, duration: 0.25 }, SORPRESA + 0.2);
      tl.fromTo(q(".s09-rayos"), { rotation: -4, svgOrigin: "540 1000" }, { rotation: 4, svgOrigin: "540 1000", duration: 1.6, ease: "sine.inOut" }, SORPRESA + 0.2);
      tl.fromTo(q(".s09-silueta"), { opacity: 0, scale: 0.85, svgOrigin: "540 1330" }, { opacity: 1, scale: 1, svgOrigin: "540 1330", duration: 0.4, ease: "back.out(1.4)" }, SORPRESA + 0.35);
      tl.fromTo(q(".s09-humo"), { opacity: 0, scale: 0.6, svgOrigin: "540 1310" }, { opacity: 0.55, scale: 1.2, svgOrigin: "540 1310", duration: 1.2, ease: "power2.out" }, SORPRESA + 0.2);
      flash(CASA, "#ffd23f");
      qa(".s09-cf").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: -120 }, { opacity: 1, y: 380 + (i % 4) * 60, x: ((i * 29) % 80) - 40, rotation: 180 + i * 20, duration: 1.1, ease: "power1.in" }, CASA - 0.1 + (i % 5) * 0.04));`,
  sfx: [{ t: 0.0, sfx: "riser", vol: 0.3, max: 0.6 }, { t: 0.4, sfx: "whoosh", vol: 0.3 }, { t: 1.2, sfx: "impact-bass-1", vol: 0.38 }, { t: 1.25, sfx: "sparkle", vol: 0.3 }],
});
