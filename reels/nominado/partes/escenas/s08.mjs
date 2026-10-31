import { escena, C } from "../escena.mjs";
import { walter } from "../personajes.mjs";
const burb = (x, y, r) => `<g class="s08-b"><g transform="translate(${x} ${y}) rotate(${r})">
  <path d="M-62 -38 H62 Q76 -38 76 -24 V20 Q76 34 62 34 H-20 L-44 56 L-40 34 H-62 Q-76 34 -76 20 V-24 Q-76 -38 -62 -38 Z" fill="${C.blanco}" class="tinta" stroke-width="4" />
  <path d="M-48 -12 H40 M-48 10 H16" stroke="${C.sillon2}" stroke-width="7" stroke-linecap="round" />
  <circle cx="70" cy="-38" r="16" fill="${C.rosa}" class="tinta" stroke-width="3" /></g></g>`;
const hueco = (cls, x) => `<g class="${cls}"><g transform="translate(${x} 1250)">
  <path d="M-110 0 Q-104 -110 0 -120 Q104 -110 110 0 Z" fill="none" stroke="${C.blanco}" stroke-width="5" stroke-dasharray="14 12" opacity="0.6" />
  <circle cx="0" cy="-178" r="54" fill="none" stroke="${C.blanco}" stroke-width="5" stroke-dasharray="14 12" opacity="0.6" />
  <text class="tv" x="0" y="-158" font-size="58" fill="${C.blanco}" text-anchor="middle" opacity="0.7">?</text>
  <rect x="-92" y="14" width="184" height="44" rx="22" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="3" opacity="0.9" />
  <text class="mono" x="0" y="44" font-size="22" fill="${C.blanco}" text-anchor="middle" letter-spacing="2">VACANTE</text></g></g>`;
escena({
  id: "s08-solo",
  e: ["Prueba: atender a todos", "Juega solo", "Esta noche..."],
  svg: `
          <g class="s08-cartel"><g transform="translate(540 640)">
            <rect x="-360" y="-44" width="720" height="88" rx="14" fill="${C.amarillo}" class="tinta" />
            <text class="tv" x="0" y="15" font-size="38" fill="${C.tinta}" text-anchor="middle" letter-spacing="2">PRUEBA SEMANAL</text>
          </g></g>
          ${hueco("s08-h1", 190)}${hueco("s08-h2", 890)}
          <path class="s08-spot" d="M470 700 L610 700 L800 1330 L280 1330 Z" fill="${C.blanco}" opacity="0.08" />
          <g class="s08-wal"><g transform="translate(540 1330) scale(0.92)">${walter("s08", "cansado")}</g></g>
          <g class="s08-burbujas">${burb(330, 820, -8)}${burb(760, 800, 6)}${burb(300, 990, 4)}${burb(790, 980, -6)}${burb(540, 770, 2)}${burb(250, 1140, -4)}${burb(840, 1140, 8)}</g>
          <rect class="s08-osc" x="0" y="560" width="1080" height="800" fill="${C.tinta}" opacity="0" />
          <path class="s08-spot2" d="M490 560 L590 560 L740 1330 L340 1330 Z" fill="${C.amarillo}" opacity="0" />`,
  js: `
      const JUGADOR = 1.45, JUGANDO = 2.53, SOLO = 2.91, POR = 4.5, NOCHE = 4.91;
      tl.fromTo(q(".s08-wal"), { opacity: 0.4, y: 100 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      pop(q(".s08-cartel"), 0.05);
      etiqueta(0, 0.15);
      qa(".s08-b").forEach((b, i) => {
        tl.fromTo(b, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.3 + i * 0.32);
        tl.to(b, { y: i % 2 ? -12 : 12, duration: 0.45, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.6 + i * 0.32);
      });
      tl.to(q(".s08-wal"), { x: -16, duration: 0.18, yoyo: true, repeat: 7, ease: "sine.inOut" }, JUGADOR);
      tl.fromTo(q(".s08-h1"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35 }, JUGANDO);
      tl.fromTo(q(".s08-h2"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35 }, JUGANDO + 0.12);
      tl.to(qa(".s08-b"), { opacity: 0.35, duration: 0.3 }, SOLO + 0.2);
      etiqueta(1, SOLO - 0.1);
      // por eso, esta noche...: se apagan las luces
      tl.to(q(".s08-osc"), { opacity: 0.62, duration: 0.4, ease: "power2.in" }, POR);
      tl.to(q(".s08-spot2"), { opacity: 0.16, duration: 0.2 }, NOCHE - 0.1);
      tl.to(q(".s08-spot2"), { opacity: 0.05, duration: 0.15, yoyo: true, repeat: 3 }, NOCHE + 0.2);
      etiqueta(2, NOCHE - 0.2);`,
  sfx: [{ t: 0.3, sfx: "notification", vol: 0.22 }, { t: 0.95, sfx: "notification", vol: 0.22 }, { t: 1.6, sfx: "notification", vol: 0.22 }, { t: 2.25, sfx: "notification", vol: 0.22 }, { t: 2.9, sfx: "drama", vol: 0.25, max: 1.0 }, { t: 4.5, sfx: "click", vol: 0.35 }, { t: 4.9, sfx: "riser", vol: 0.28, max: 1.4 }],
});
