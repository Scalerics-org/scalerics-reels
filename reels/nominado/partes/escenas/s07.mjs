import { escena, C } from "../escena.mjs";
import { celular, clienta } from "../personajes.mjs";
const corazon = (cls, x, y, s) => `<g class="${cls}"><path transform="translate(${x} ${y}) scale(${s})" d="M0 12 C-30 -10 -24 -40 0 -26 C24 -40 30 -10 0 12 Z" fill="${C.rosa}" class="tinta" stroke-width="3" /></g>`;
escena({
  id: "s07-enfrente",
  e: ["El de enfrente", "Domingo · 23:00", "Contestó al toque"],
  svg: `
          <g class="s07-reloj"><g transform="translate(250 740)">
            <circle r="96" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="6" />
            <path d="M-30 -50 A56 56 0 1 0 40 30 A44 44 0 1 1 -30 -50 Z" fill="${C.amarillo}" transform="translate(-6 -6) scale(0.7)" />
            <rect x="-110" y="70" width="220" height="64" rx="32" fill="${C.amarillo}" class="tinta" stroke-width="4" />
            <text class="tv" x="0" y="116" font-size="40" fill="${C.tinta}" text-anchor="middle">23:00</text>
          </g></g>
          <g class="s07-cel"><g transform="translate(720 930)">${celular("s07", "El de enfrente", 360, 620)}</g>
            <g class="s07-chip"><rect x="610" y="762" width="220" height="40" rx="20" fill="#e4dcf3" /><text class="mono" x="720" y="790" font-size="22" fill="${C.sillon}" text-anchor="middle" letter-spacing="2">DOMINGO 23:00</text></g>
            <g class="s07-msj"><path d="M610 822 H868 Q880 822 880 834 V898 Q880 910 868 910 H622 Q610 910 610 898 Z" fill="${C.blanco}" stroke="${C.sillon2}" stroke-width="4" />
              <text class="lex" x="626" y="858" font-size="26" fill="${C.tinta}">¿Tenés la campera</text>
              <text class="lex" x="626" y="894" font-size="26" fill="${C.tinta}">en negro?</text></g>
            <g class="s07-resp"><path d="M560 940 H836 Q850 940 850 954 V1050 Q850 1064 836 1064 H574 Q560 1064 560 1050 Z" fill="${C.amarillo}" class="tinta" stroke-width="4" />
              <text class="lex" x="578" y="984" font-size="26" fill="${C.tinta}">¡Sí! Queda una.</text>
              <text class="lex" x="578" y="1022" font-size="26" fill="${C.tinta}">¿Te la guardo?</text>
              <text class="mono" x="836" y="1056" font-size="18" fill="${C.tinta}" text-anchor="end" data-layout-ignore>23:00</text></g>
          </g>
          <g class="s07-c1"><g transform="translate(250 1335) scale(0.9)">${clienta("s07", "chusma")}</g></g>
          <g class="s07-c2"><g transform="translate(250 1335) scale(0.9)">${clienta("s07b", "enamorada")}</g></g>
          <g class="s07-cors">${corazon("s07-k", 110, 1010, 1.5)}${corazon("s07-k", 420, 960, 1.2)}${corazon("s07-k", 160, 1110, 1)}${corazon("s07-k", 430, 1090, 1.4)}${corazon("s07-k", 470, 1180, 1)}</g>`,
  js: `
      const CONTESTO = 1.08, DOMINGO = 1.66, ONCE = 2.58, TOQUE = 3.9;
      tl.fromTo(q(".s07-cel"), { opacity: 0.4, x: 200 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".s07-c1"), { opacity: 0.4, y: 120 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.3)" }, 0.05);
      gsap.set(q(".s07-c2"), { opacity: 0 });
      etiqueta(0, 0.1);
      tl.fromTo(q(".s07-msj"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.35);
      pop(q(".s07-chip"), DOMINGO - 0.05);
      etiqueta(1, DOMINGO);
      tl.fromTo(q(".s07-reloj"), { opacity: 0, scale: 0.5, rotation: -40, svgOrigin: "250 740" }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: "250 740", duration: 0.4, ease: "back.out(1.6)" }, ONCE - 0.15);
      tl.to(q(".s07-c1"), { rotation: -3, svgOrigin: "250 1335", duration: 0.3, yoyo: true, repeat: 1 }, CONTESTO);
      gsap.set(q(".s07-resp"), { opacity: 0 });
      tl.fromTo(q(".s07-resp"), { opacity: 0, scale: 0.5, svgOrigin: "560 1064" }, { opacity: 1, scale: 1, svgOrigin: "560 1064", duration: 0.32, ease: "back.out(2)" }, TOQUE - 0.15);
      tl.to(q(".s07-c1"), { opacity: 0, duration: 0.1 }, TOQUE);
      tl.to(q(".s07-c2"), { opacity: 1, duration: 0.1 }, TOQUE);
      tl.to(q(".s07-c2"), { y: -16, duration: 0.2, yoyo: true, repeat: 3 }, TOQUE + 0.1);
      qa(".s07-k").forEach((k, i) => tl.fromTo(k, { opacity: 0, scale: 0.2, y: 40, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: -30, duration: 0.6, ease: "back.out(2)" }, TOQUE + i * 0.07));
      etiqueta(2, TOQUE);`,
  sfx: [{ t: 0.35, sfx: "notification", vol: 0.25 }, { t: 1.6, sfx: "pop", vol: 0.2 }, { t: 2.5, sfx: "tic", vol: 0.3 }, { t: 3.78, sfx: "ping", vol: 0.32 }, { t: 3.95, sfx: "sparkle", vol: 0.28 }],
});
