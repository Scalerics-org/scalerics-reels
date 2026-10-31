import { escena, C } from "../escena.mjs";
import { local } from "../personajes.mjs";
const foto = (cls, x, rot, abierto, nombre, color) => `
          <g class="${cls}"><g transform="translate(${x} 990) rotate(${rot})">
            <rect x="-200" y="-230" width="400" height="460" rx="14" fill="${C.blanco}" class="tinta" />
            <rect x="-178" y="-208" width="356" height="330" rx="6" fill="${abierto ? C.sillon : "#4b3a66"}" />
            <g transform="translate(0 92) scale(1.05)">${local("s02", abierto)}</g>
            <rect x="-178" y="140" width="356" height="70" rx="6" fill="${color}" />
            <text class="tv" x="0" y="188" font-size="${nombre.length > 9 ? 30 : 36}" fill="${C.tinta}" text-anchor="middle" letter-spacing="2">${nombre}</text>
          </g></g>`;
escena({
  id: "s02-placa",
  e: ["Placa de nominados", "Uno se va de la casa"],
  svg: `
          <g class="s02-cartel"><g transform="translate(540 640)">
            <rect x="-230" y="-44" width="460" height="88" rx="44" fill="${C.rosa}" class="tinta" />
            <text class="tv" x="0" y="18" font-size="50" fill="${C.blanco}" text-anchor="middle" letter-spacing="8">EN PLACA</text>
          </g></g>
          ${foto("s02-izq", 285, -4, false, "TU LOCAL", C.rosa)}
          ${foto("s02-der", 795, 4, true, "EL DE ENFRENTE", C.amarillo)}
          <g class="s02-zzz" fill="${C.blanco}"><text class="tv" x="330" y="850" font-size="40">z</text><text class="tv" x="360" y="815" font-size="52">z</text></g>
          <g class="s02-brillos" stroke="${C.amarillo}" stroke-width="6" stroke-linecap="round">
            <path d="M920 800 v40 M900 820 h40" /><path d="M680 1120 v30 M665 1135 h30" />
          </g>
          <g class="s02-vs"><g transform="translate(540 990)">
            <circle r="92" fill="${C.amarillo}" class="tinta" stroke-width="7" />
            <text class="tv" x="0" y="30" font-size="84" fill="${C.tinta}" text-anchor="middle">VS</text>
          </g></g>`,
  js: `
      const PLACA = 0.17, LOCAL = 0.43, CONTRA = 1.84, ENFRENTE = 2.24;
      tl.fromTo(q(".s02-cartel"), { opacity: 0.4, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      etiqueta(0, 0.1);
      tl.fromTo(q(".s02-izq"), { opacity: 0, x: -300, rotation: -14, svgOrigin: "285 990" }, { opacity: 1, x: 0, rotation: 0, svgOrigin: "285 990", duration: 0.45, ease: "back.out(1.4)" }, LOCAL - 0.15);
      tl.fromTo(q(".s02-zzz"), { opacity: 0, y: 20 }, { opacity: 0.8, y: -20, duration: 1.2, ease: "sine.out" }, LOCAL + 0.4);
      tl.fromTo(q(".s02-der"), { opacity: 0, x: 300, rotation: 14, svgOrigin: "795 990" }, { opacity: 1, x: 0, rotation: 0, svgOrigin: "795 990", duration: 0.45, ease: "back.out(1.4)" }, ENFRENTE - 0.2);
      tl.fromTo(q(".s02-brillos"), { opacity: 0, scale: 0.4, svgOrigin: "800 900" }, { opacity: 1, scale: 1, svgOrigin: "800 900", duration: 0.35, ease: "back.out(2)" }, ENFRENTE + 0.2);
      gsap.set(q(".s02-vs"), { opacity: 0 });
      tl.fromTo(q(".s02-vs"), { opacity: 0, scale: 2.4, rotation: -30, svgOrigin: "540 990" }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: "540 990", duration: 0.25, ease: "power4.in" }, CONTRA - 0.1);
      temblor(q(".s02-escenario"), CONTRA + 0.15, 1);
      tl.to(q(".s02-vs"), { scale: 1.12, svgOrigin: "540 990", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, CONTRA + 0.4);
      etiqueta(1, ENFRENTE + 0.3);`,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.25 }, { t: 0.3, sfx: "whoosh-short", vol: 0.25 }, { t: 1.8, sfx: "impact-bass-1", vol: 0.38 }, { t: 2.1, sfx: "whoosh-short", vol: 0.25 }, { t: 2.45, sfx: "sparkle", vol: 0.22 }],
});
