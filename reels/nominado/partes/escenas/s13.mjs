import { escena, C } from "../escena.mjs";
import { agente, celular } from "../personajes.mjs";
escena({
  id: "s13-scalerics",
  e: ["Scalerics", "Un empleado más", "Sin horario"],
  svg: `
          <path class="s13-luz" d="M440 600 L640 600 L860 1330 L220 1330 Z" fill="${C.amarillo}" opacity="0.1" />
          <g class="s13-titulo"><g transform="translate(540 650)">
            <rect x="-300" y="-50" width="600" height="100" rx="18" fill="${C.amarillo}" class="tinta" />
            <text class="tv" x="0" y="18" font-size="50" fill="${C.tinta}" text-anchor="middle">TU AGENTE DE IA</text>
          </g></g>
          <g class="s13-age"><g transform="translate(540 1330)">${agente("s13")}</g></g>
          <g class="s13-gafete"><g transform="translate(610 1250) rotate(-4)">
            <rect x="-96" y="-34" width="192" height="68" rx="10" fill="${C.amarillo}" class="tinta" stroke-width="4" />
            <text class="tv" x="0" y="11" font-size="28" fill="${C.tinta}" text-anchor="middle">EMPLEADO</text>
          </g></g>
          <g class="s13-cel"><g transform="translate(860 960) rotate(6)">${celular("s13", "Tu local", 260, 420).replace('font-size="28"', 'font-size="22"')}
            <rect x="-40" y="-70" width="150" height="46" rx="14" fill="#e4dcf3" />
            <rect x="-110" y="-12" width="170" height="46" rx="14" fill="${C.amarillo}" />
            <rect x="-30" y="46" width="140" height="46" rx="14" fill="#e4dcf3" />
            <rect class="s13-r2" x="-110" y="104" width="160" height="46" rx="14" fill="${C.amarillo}" />
          </g></g>
          <g class="s13-24"><g transform="translate(210 920)">
            <circle r="110" fill="${C.tinta}" stroke="${C.amarillo}" stroke-width="8" />
            <path class="s13-giro" d="M0 -82 A82 82 0 1 1 -76 -30" fill="none" stroke="${C.rosa}" stroke-width="8" stroke-linecap="round" />
            <text class="tv" x="0" y="18" font-size="56" fill="${C.amarillo}" text-anchor="middle">24 h</text>
          </g></g>`,
  js: `
      const ARMAMOS = 0.94, AGENTE = 1.47, EMPLEADO = 2.67, WHATSAPP = 3.88, SIN = 4.56;
      tl.fromTo(q(".s13-age"), { opacity: 0.4, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s13-luz"), { opacity: 0 }, { opacity: 0.14, duration: 0.6 }, 0);
      etiqueta(0, 0.1);
      pop(q(".s13-titulo"), AGENTE - 0.15);
      tl.to(q(".s13-age"), { y: -12, duration: 0.25, yoyo: true, repeat: 1 }, ARMAMOS);
      tl.fromTo(q(".s13-gafete"), { opacity: 0, scale: 0.3, rotation: -40, svgOrigin: "610 1250" }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: "610 1250", duration: 0.35, ease: "back.out(2)" }, EMPLEADO - 0.1);
      etiqueta(1, EMPLEADO);
      tl.fromTo(q(".s13-cel"), { opacity: 0, x: 220 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.4)" }, WHATSAPP - 0.2);
      tl.fromTo(q(".s13-r2"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, WHATSAPP + 0.4);
      tl.fromTo(q(".s13-24"), { opacity: 0, scale: 0.4, svgOrigin: "210 920" }, { opacity: 1, scale: 1, svgOrigin: "210 920", duration: 0.35, ease: "back.out(1.8)" }, SIN - 0.15);
      tl.fromTo(q(".s13-giro"), { rotation: 0, svgOrigin: "210 920" }, { rotation: 360, svgOrigin: "210 920", duration: 1.2, ease: "power1.inOut" }, SIN);
      etiqueta(2, SIN);`,
  sfx: [{ t: 0.05, sfx: "chime", vol: 0.25 }, { t: 1.35, sfx: "pop", vol: 0.25 }, { t: 2.6, sfx: "pop", vol: 0.25 }, { t: 3.75, sfx: "notification", vol: 0.25 }, { t: 4.45, sfx: "sparkle", vol: 0.28 }],
});
