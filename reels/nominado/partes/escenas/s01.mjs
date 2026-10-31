import { escena, C } from "../escena.mjs";
import { conductora, local } from "../personajes.mjs";
escena({
  id: "s01-gancho",
  e: ["Gala en vivo", "Nominado: tu local"],
  svg: `
          <g class="s01-pantalla">
            <rect x="150" y="610" width="780" height="450" rx="22" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="6" />
            <rect x="150" y="610" width="780" height="78" rx="22" fill="${C.sillon}" />
            <rect x="150" y="660" width="780" height="28" fill="${C.sillon}" />
            <text class="tv" x="540" y="664" font-size="38" fill="${C.amarillo}" text-anchor="middle" letter-spacing="3">PLACA DE NOMINADOS</text>
            <g class="s01-puntos" fill="${C.sillon2}" opacity="0.5">
              <circle cx="200" cy="740" r="6" /><circle cx="880" cy="740" r="6" /><circle cx="200" cy="1010" r="6" /><circle cx="880" cy="1010" r="6" />
            </g>
            <g class="s01-local"><g transform="translate(540 1000) scale(1.05)">${local("s01", false)}</g></g>
            <g class="s01-sello"><g transform="translate(560 850) rotate(-10)">
              <rect x="-250" y="-56" width="500" height="112" rx="12" fill="none" stroke="${C.rosa}" stroke-width="12" />
              <text class="tv" x="0" y="26" font-size="76" fill="${C.rosa}" text-anchor="middle" letter-spacing="6">NOMINADO</text>
            </g></g>
          </g>
          <g class="s01-trofeo"><g transform="translate(850 1150)">
            <path d="M-60 -150 H60 Q60 -50 0 -40 Q-60 -50 -60 -150 Z" fill="${C.amarillo}" class="tinta" />
            <path d="M-60 -130 Q-100 -130 -90 -100 Q-80 -76 -50 -80 M60 -130 Q100 -130 90 -100 Q80 -76 50 -80" fill="none" class="tinta" stroke-width="8" />
            <rect x="-12" y="-42" width="24" height="40" fill="${C.amarillo}" class="tinta" stroke-width="4" />
            <rect x="-50" y="-4" width="100" height="30" rx="4" fill="${C.sillon2}" class="tinta" stroke-width="4" />
            <path class="s01-x1" d="M-90 -170 L90 30" stroke="${C.rosa}" stroke-width="16" stroke-linecap="round" />
            <path class="s01-x2" d="M90 -170 L-90 30" stroke="${C.rosa}" stroke-width="16" stroke-linecap="round" />
          </g></g>
          <g class="s01-cond"><g transform="translate(250 1330) scale(1.12)">${conductora("s01")}</g></g>`,
  js: `
      const CLIENTES = 1.05, NOMINARON = 2.06, NO = 3.16, PREMIO = 3.68;
      tl.fromTo(q(".s01-escenario"), { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "540px 960px" }, 0);
      tl.fromTo(q(".s01-pantalla"), { opacity: 0.5, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".s01-cond"), { opacity: 0.6, x: -120 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".s01-puntos"), { opacity: 0.2 }, { opacity: 0.8, duration: 0.3, yoyo: true, repeat: 7, ease: "none" }, 0);
      etiqueta(0, 0.1);
      pop(q(".s01-local"), CLIENTES - 0.1);
      tl.to(q(".s01-cond-boca"), { scaleY: 0.4, svgOrigin: "250 1080", duration: 0.12, yoyo: true, repeat: 5 }, 0.3);
      gsap.set(q(".s01-sello"), { opacity: 0 });
      tl.fromTo(q(".s01-sello"), { opacity: 0, scale: 2.2, svgOrigin: "560 850" }, { opacity: 1, scale: 1, svgOrigin: "560 850", duration: 0.22, ease: "power4.in" }, NOMINARON - 0.1);
      temblor(q(".s01-pantalla"), NOMINARON + 0.12, 1.2);
      flash(NOMINARON + 0.12);
      etiqueta(1, NOMINARON + 0.1);
      pop(q(".s01-trofeo"), NO - 0.1);
      dibujar(q(".s01-x1"), PREMIO, 0.22);
      dibujar(q(".s01-x2"), PREMIO + 0.18, 0.22);
      temblor(q(".s01-trofeo"), PREMIO + 0.4, 0.8);
      tl.to(q(".s01-cond"), { rotation: -4, svgOrigin: "250 1330", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, PREMIO);`,
  sfx: [{ t: 0.05, sfx: "riser", vol: 0.22, max: 1.0 }, { t: 1.0, sfx: "pop", vol: 0.25 }, { t: 2.0, sfx: "drama", vol: 0.42, max: 1.5 }, { t: 3.08, sfx: "pop", vol: 0.25 }, { t: 3.7, sfx: "uuh", vol: 0.3, max: 1.0 }],
});
