import { escena, C } from "../escena.mjs";
import { agente, walter } from "../personajes.mjs";
escena({
  id: "s11-tres",
  e: ["03:00 · atendiendo", "Para vos, jefe"],
  svg: `
          <g class="s11-reloj"><g transform="translate(540 680)">
            <rect x="-190" y="-62" width="380" height="124" rx="20" fill="${C.tinta}" stroke="${C.amarillo}" stroke-width="6" />
            <text class="tv s11-hora" x="30" y="34" font-size="92" fill="${C.amarillo}" text-anchor="middle" letter-spacing="4">03:00</text>
            <path d="M-150 -26 A30 30 0 1 0 -116 18 A24 24 0 1 1 -150 -26 Z" fill="${C.blanco}" transform="translate(-22 4) scale(0.8)" />
          </g></g>
          <g class="s11-wal">
            <ellipse cx="800" cy="1110" rx="190" ry="70" fill="${C.blanco}" class="tinta" />
            <g transform="translate(800 1330) scale(0.78)">${walter("s11", "dormido")}</g>
            <path d="M610 1250 Q800 1180 990 1250 L990 1330 L610 1330 Z" fill="${C.sillon}" class="tinta" />
          </g>
          <g class="s11-zzz" fill="${C.blanco}"><text class="tv s11-z1" x="900" y="930" font-size="44">z</text><text class="tv s11-z2" x="935" y="880" font-size="56">z</text><text class="tv s11-z3" x="975" y="820" font-size="70">Z</text></g>
          <g class="s11-age"><g transform="translate(290 1330) scale(0.86)">${agente("s11")}</g></g>
          <g class="s11-msj"><g transform="translate(300 860)">
            <path d="M-190 -50 H190 Q206 -50 206 -34 V30 Q206 46 190 46 H-40 L-70 76 L-70 46 H-190 Q-206 46 -206 30 V-34 Q-206 -50 -190 -50 Z" fill="${C.blanco}" class="tinta" stroke-width="4" />
            <text class="lex" x="0" y="10" font-size="32" fill="${C.tinta}" text-anchor="middle">¿Hablo con el dueño?</text>
          </g></g>
          <path class="s11-arco" d="M420 930 Q600 820 760 960" fill="none" stroke="${C.rosa}" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 18" />
          <g class="s11-tarjeta"><g transform="translate(790 990) rotate(6)">
            <rect x="-120" y="-40" width="240" height="80" rx="14" fill="${C.amarillo}" class="tinta" />
            <text class="tv" x="0" y="12" font-size="30" fill="${C.tinta}" text-anchor="middle">PARA WALTER</text>
            <circle cx="112" cy="-36" r="16" fill="${C.rosa}" class="tinta" stroke-width="3" />
          </g></g>`,
  js: `
      const SI = 1.27, SE = 2.4, PASO = 2.6;
      tl.fromTo(q(".s11-reloj"), { opacity: 0.4, scale: 1.3, svgOrigin: "540 680" }, { opacity: 1, scale: 1, svgOrigin: "540 680", duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s11-hora"), { opacity: 1 }, { opacity: 0.55, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 3 }, 0.5);
      tl.fromTo(q(".s11-age"), { opacity: 0.4, x: -120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".s11-wal"), { opacity: 0.4, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0.05);
      [".s11-z1", ".s11-z2", ".s11-z3"].forEach((s, i) => tl.fromTo(q(s), { opacity: 0, y: 20 }, { opacity: 0.85, y: -10, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.2 + i * 0.25));
      etiqueta(0, 0.15);
      gsap.set(q(".s11-msj"), { opacity: 0 });
      tl.fromTo(q(".s11-msj"), { opacity: 0, scale: 0.5, svgOrigin: "230 936" }, { opacity: 1, scale: 1, svgOrigin: "230 936", duration: 0.32, ease: "back.out(2)" }, SI - 0.15);
      tl.to(q(".s11-age-ojos"), { scaleY: 0.15, svgOrigin: "0 -269", duration: 0.07, yoyo: true, repeat: 1 }, SI + 0.4);
      dibujar(q(".s11-arco"), SE - 0.1, 0.35);
      gsap.set(q(".s11-tarjeta"), { opacity: 0 });
      tl.fromTo(q(".s11-tarjeta"), { opacity: 0, x: -380, y: -40, rotation: -30, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, SE);
      tl.to(q(".s11-msj"), { opacity: 0.4, duration: 0.3 }, PASO);
      etiqueta(1, PASO);`,
  sfx: [{ t: 0.05, sfx: "tic", vol: 0.3 }, { t: 1.15, sfx: "notification", vol: 0.28 }, { t: 2.35, sfx: "whoosh-short", vol: 0.28 }, { t: 2.8, sfx: "pop", vol: 0.28 }],
});
