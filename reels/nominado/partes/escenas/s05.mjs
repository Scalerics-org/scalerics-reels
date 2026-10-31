import { escena, C } from "../escena.mjs";
import { walter, sillon, ojo } from "../personajes.mjs";
const badge = (cls, x, y, ico, txt) => `<g class="${cls}"><g transform="translate(${x} ${y})">
  <circle r="92" fill="${C.blanco}" class="tinta" stroke-width="6" /><circle r="80" fill="none" stroke="${C.amarillo}" stroke-width="8" />
  ${ico}
  <rect x="-104" y="70" width="208" height="44" rx="22" fill="${C.amarillo}" class="tinta" stroke-width="4" />
  <text class="tv" x="0" y="102" font-size="23" fill="${C.tinta}" text-anchor="middle" letter-spacing="1">${txt}</text></g></g>`;
const CAJA = `<rect x="-48" y="-10" width="96" height="50" rx="6" fill="${C.sillon2}" class="tinta" stroke-width="4" /><rect x="-36" y="-46" width="60" height="38" rx="4" fill="${C.tinta}" /><rect x="-28" y="-38" width="44" height="16" fill="${C.amarillo}" /><path d="M-30 6 h12 M-8 6 h12 M14 6 h12 M-30 22 h12 M-8 22 h12" stroke="${C.blanco}" stroke-width="5" stroke-linecap="round" />`;
const DEPO = `<rect x="-52" y="-6" width="56" height="46" fill="#c9a46a" class="tinta" stroke-width="4" /><rect x="4" y="-6" width="50" height="46" fill="#c9a46a" class="tinta" stroke-width="4" /><rect x="-26" y="-50" width="56" height="44" fill="#c9a46a" class="tinta" stroke-width="4" /><path d="M-24 10 h0 M-2 -36 v14 M30 10 v14 M-24 10 v14" stroke="${C.tinta}" stroke-width="4" />`;
const MOST = `<rect x="-58" y="6" width="116" height="34" fill="${C.sillon2}" class="tinta" stroke-width="4" /><path d="M-26 6 Q-26 -36 0 -36 Q26 -36 26 6 Z" fill="${C.amarillo}" class="tinta" stroke-width="4" /><circle cx="0" cy="-42" r="6" fill="${C.tinta}" />`;
escena({
  id: "s05-descargo",
  e: ["Su descargo", "Caja · depósito · mostrador", "¿Que no duerma?"],
  svg: `
          <path class="s05-luz" d="M440 600 L640 600 L900 1330 L180 1330 Z" fill="${C.sillon2}" opacity="0.16" />
          <g class="s05-sillon"><g transform="translate(540 1290) scale(0.95)">${sillon("s05")}</g></g>
          <g class="s05-w1"><g transform="translate(540 1262)">${walter("s05", "defensa")}</g></g>
          <g class="s05-w2"><g transform="translate(540 1262)">${walter("s05b", "cansado")}</g></g>
          <g class="s05-gotas" fill="#9fd3ff"><path d="M640 960 q-12 20 0 28 q12 -8 0 -28 Z" stroke="${C.tinta}" stroke-width="3" /><path d="M444 940 q-10 16 0 24 q10 -8 0 -24 Z" stroke="${C.tinta}" stroke-width="3" /></g>
          <g class="s05-ojo"><g transform="translate(190 700) scale(0.62)">${ojo("s05")}</g></g>
          <g class="s05-ondas" fill="none" stroke="${C.amarillo}" stroke-width="6" stroke-linecap="round">
            <path d="M262 680 Q278 700 262 720" /><path d="M284 664 Q308 700 284 736" /><path d="M306 648 Q338 700 306 752" />
          </g>
          <g class="s05-iconos">
            ${badge("s05-caja", 200, 960, CAJA, "CAJA")}
            ${badge("s05-depo", 880, 960, DEPO, "DEPÓSITO")}
            ${badge("s05-most", 760, 740, MOST, "MOSTRADOR")}
          </g>
          <g class="s05-zocalo"><g transform="translate(540 1230)">
            <rect x="-330" y="-40" width="660" height="80" rx="10" fill="${C.rosa}" class="tinta" />
            <rect x="-330" y="-40" width="150" height="80" rx="10" fill="${C.tinta}" />
            <text class="tv" x="-255" y="12" font-size="28" fill="${C.amarillo}" text-anchor="middle">EN VIVO</text>
            <text class="tv" x="80" y="14" font-size="36" fill="${C.blanco}" text-anchor="middle">WALTER · SU DESCARGO</text>
          </g></g>`,
  js: `
      const DESCARGO = 1.42, YO = 2.63, CAJA = 4.3, DEPO = 4.79, MOST = 5.48, QUE = 5.74, DUERMA = 6.86;
      tl.fromTo(q(".s05-sillon"), { opacity: 0.5, scale: 1.08, svgOrigin: "540 1290" }, { opacity: 1, scale: 1, svgOrigin: "540 1290", duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".s05-w1"), { opacity: 0.4, y: 80 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, 0.05);
      gsap.set(q(".s05-w2"), { opacity: 0 });
      tl.fromTo(q(".s05-luz"), { opacity: 0.08 }, { opacity: 0.2, duration: 0.6, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
      pop(q(".s05-ojo"), 0.05);
      etiqueta(0, 0.2);
      [0, 1.2].forEach((t) => qa(".s05-ondas path").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.14, yoyo: true, repeat: 1 }, t + i * 0.08)));
      tl.fromTo(q(".s05-zocalo"), { opacity: 0, x: -700 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, DESCARGO - 0.1);
      tl.to(q(".s05-zocalo"), { opacity: 0, x: 700, duration: 0.3, ease: "power2.in" }, CAJA - 0.6);
      tl.to(q(".s05-w1"), { rotation: 4, svgOrigin: "540 1262", duration: 0.2, yoyo: true, repeat: 3 }, YO);
      pop(q(".s05-caja"), CAJA - 0.1);
      pop(q(".s05-depo"), DEPO - 0.1);
      pop(q(".s05-most"), MOST - 0.1);
      etiqueta(1, CAJA - 0.1);
      // ¿qué querés?: todo le da vueltas
      [".s05-caja", ".s05-depo", ".s05-most"].forEach((s, i) => tl.to(q(s), { y: -16, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, QUE + i * 0.08));
      temblor(q(".s05-w1"), QUE + 0.1, 0.8);
      tl.to(q(".s05-w1"), { opacity: 0, duration: 0.1 }, DUERMA - 0.2);
      tl.to(q(".s05-w2"), { opacity: 1, duration: 0.1 }, DUERMA - 0.2);
      tl.fromTo(q(".s05-gotas"), { opacity: 0, y: -10 }, { opacity: 1, y: 14, duration: 0.5 }, DUERMA - 0.1);
      tl.to(q(".s05-w2"), { y: 14, duration: 0.4, ease: "power2.out" }, DUERMA);
      etiqueta(2, DUERMA - 0.3);`,
  sfx: [{ t: 0.0, sfx: "estatica", vol: 0.2, max: 0.5 }, { t: 1.35, sfx: "whoosh-short", vol: 0.25 }, { t: 4.25, sfx: "pop", vol: 0.25 }, { t: 4.75, sfx: "pop", vol: 0.25 }, { t: 5.45, sfx: "pop", vol: 0.25 }, { t: 6.8, sfx: "uuh", vol: 0.22, max: 1.0 }],
});
