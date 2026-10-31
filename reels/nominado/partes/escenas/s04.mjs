import { escena, C } from "../escena.mjs";
import { celular, clienta } from "../personajes.mjs";
const chip = (cls, y, txt) => `<g class="${cls}"><rect x="${540 - txt.length * 10 - 24}" y="${y - 24}" width="${txt.length * 20 + 48}" height="44" rx="22" fill="#e4dcf3" /><text class="mono" x="540" y="${y + 7}" font-size="24" fill="${C.sillon}" text-anchor="middle" letter-spacing="2">${txt}</text></g>`;
const tilde = (x, y) => `<path d="M${x} ${y} l9 9 l17 -19 M${x + 16} ${y + 9} l0 0 M${x + 12} ${y + 3} l7 6 l17 -19" fill="none" stroke="${C.rosa}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />`;
escena({
  id: "s04-visto",
  e: ["Prueba: el chat", "En visto", "¡Era el privado!"],
  svg: `
          <g class="s04-cel"><g transform="translate(560 960)">${celular("s04", "Walter · Ropa", 440, 720)}</g>
            ${chip("s04-sab", 770, "SÁBADO 21:40")}
            <g class="s04-msj"><path d="M420 810 H736 Q750 810 750 824 V898 Q750 912 736 912 H436 Q420 912 420 896 Z" fill="${C.blanco}" stroke="${C.sillon2}" stroke-width="4" />
              <text class="lex" x="440" y="852" font-size="30" fill="${C.tinta}">¿Tenés la campera</text>
              <text class="lex" x="440" y="892" font-size="30" fill="${C.tinta}">en negro?</text></g>
            <g class="s04-tildes">${tilde(590, 928)}<text class="mono" x="640" y="946" font-size="24" fill="${C.rosa}">Visto</text></g>
            ${chip("s04-lun", 1010, "LUNES 10:15")}
            <g class="s04-resp"><path d="M370 1052 H704 Q720 1052 720 1068 V1126 Q720 1142 704 1142 H384 Q370 1142 370 1128 Z" fill="${C.amarillo}" class="tinta" stroke-width="4" />
              <text class="lex" x="390" y="1108" font-size="30" fill="${C.tinta}">Consultá por privado</text></g>
          </g>
          <g class="s04-sello"><g transform="translate(560 960) rotate(-12)">
            <rect x="-250" y="-70" width="500" height="140" rx="16" fill="${C.tinta}" fill-opacity="0.55" stroke="${C.rosa}" stroke-width="12" />
            <text class="tv" x="0" y="32" font-size="92" fill="${C.rosa}" text-anchor="middle" letter-spacing="6">EN VISTO</text>
          </g></g>
          <g class="s04-flecha"><path class="s04-fl" d="M250 626 Q220 800 350 900" fill="none" stroke="${C.rosa}" stroke-width="12" stroke-linecap="round" />
            <path class="s04-punta" d="M318 870 L356 906 L366 856" fill="none" stroke="${C.rosa}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g class="s04-cartel"><g transform="translate(320 572) rotate(-6)">
            <rect x="-240" y="-46" width="480" height="92" rx="14" fill="${C.rosa}" class="tinta" />
            <text class="tv" x="0" y="16" font-size="44" fill="${C.blanco}" text-anchor="middle">¡ESTO ES EL PRIVADO!</text>
          </g></g>
          <g class="s04-cli"><g transform="translate(180 1335) scale(0.78)">${clienta("s04", "enojada")}</g></g>`,
  js: `
      const SABADO = 0.46, CAMPERA = 1.19, VISTO = 2.56, LUNES = 3.45, CONSULTA = 4.62, ERA = 6.15, PRIVADO = 6.35;
      tl.fromTo(q(".s04-cel"), { opacity: 0.4, y: 120, rotation: 6, svgOrigin: "560 960" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "560 960", duration: 0.45, ease: "back.out(1.3)" }, 0);
      etiqueta(0, 0.15);
      pop(q(".s04-sab"), SABADO - 0.05);
      tl.fromTo(q(".s04-msj"), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.6)" }, CAMPERA - 0.2);
      tl.fromTo(q(".s04-tildes"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, VISTO - 0.3);
      gsap.set(q(".s04-sello"), { opacity: 0 });
      tl.fromTo(q(".s04-sello"), { opacity: 0, scale: 2.4, svgOrigin: "560 960" }, { opacity: 1, scale: 1, svgOrigin: "560 960", duration: 0.2, ease: "power4.in" }, VISTO - 0.1);
      temblor(q(".s04-cel"), VISTO + 0.1, 1);
      flash(VISTO + 0.1);
      etiqueta(1, VISTO);
      tl.to(q(".s04-sello"), { opacity: 0, scale: 0.6, svgOrigin: "560 960", duration: 0.3, ease: "power2.in" }, LUNES - 0.3);
      pop(q(".s04-lun"), LUNES);
      tl.fromTo(q(".s04-resp"), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.6)" }, CONSULTA - 0.15);
      tl.to(q(".s04-resp"), { scale: 1.06, svgOrigin: "545 1097", duration: 0.2, yoyo: true, repeat: 1 }, CONSULTA + 0.6);
      // ¡era el privado, Walter!
      tl.fromTo(q(".s04-cli"), { opacity: 0, y: 260 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, ERA - 0.35);
      pop(q(".s04-cartel"), ERA);
      dibujar(q(".s04-fl"), PRIVADO, 0.3);
      dibujar(q(".s04-punta"), PRIVADO + 0.25, 0.15);
      temblor(q(".s04-cel"), PRIVADO + 0.1, 1.4);
      temblor(q(".s04-cli"), PRIVADO + 0.3, 1);
      flash(PRIVADO + 0.1);
      etiqueta(2, ERA);
      tl.to(q(".s04-cartel"), { scale: 1.06, svgOrigin: "320 572", duration: 0.25, yoyo: true, repeat: 3 }, PRIVADO + 0.5);`,
  sfx: [{ t: 0.4, sfx: "pop", vol: 0.2 }, { t: 1.0, sfx: "notification", vol: 0.3 }, { t: 2.46, sfx: "drama", vol: 0.42, max: 1.4 }, { t: 3.45, sfx: "pop", vol: 0.2 }, { t: 4.5, sfx: "notification", vol: 0.28 }, { t: 6.1, sfx: "impact-bass-1", vol: 0.36 }, { t: 6.5, sfx: "uuh", vol: 0.3, max: 1.2 }],
});
