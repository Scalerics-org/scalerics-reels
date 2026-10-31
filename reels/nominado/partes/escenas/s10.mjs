import { escena, C } from "../escena.mjs";
import { agente } from "../personajes.mjs";
const chip = (cls, y, ico, txt, fondo = C.blanco) => `<g class="${cls}"><g transform="translate(800 ${y})">
  <rect x="-170" y="-40" width="340" height="80" rx="40" fill="${fondo}" class="tinta" stroke-width="5" />
  <circle cx="-126" cy="0" r="28" fill="${C.tinta}" /><g transform="translate(-18 0)">${ico}</g>
  <text class="tv" x="30" y="12" font-size="30" fill="${C.tinta}" text-anchor="middle">${txt}</text></g></g>`;
const I = {
  wa: `<path d="M-122 -12 h28 q8 0 8 8 v14 q0 8 -8 8 h-14 l-10 8 v-8 h-4 q-8 0 -8 -8 v-14 q0 -8 8 -8 Z" fill="${C.amarillo}" />`,
  rayo: `<path d="M-104 -20 L-120 4 L-108 4 L-114 22 L-94 -4 L-106 -4 Z" fill="${C.amarillo}" />`,
  precio: `<text class="tv" x="-108" y="11" font-size="30" fill="${C.amarillo}" text-anchor="middle">$</text>`,
  stock: `<rect x="-122" y="-14" width="28" height="26" fill="${C.amarillo}" /><path d="M-122 -2 h28" stroke="${C.tinta}" stroke-width="3" />`,
  hora: `<circle cx="-108" cy="0" r="16" fill="none" stroke="${C.amarillo}" stroke-width="4" /><path d="M-108 -9 V0 H-100" stroke="${C.amarillo}" stroke-width="4" stroke-linecap="round" fill="none" />`,
};
escena({
  id: "s10-agente",
  e: ["Ingresó: agente de IA", "Al instante", "Precios · stock · horarios"],
  svg: `
          <path class="s10-luz" d="M260 600 L420 600 L620 1330 L60 1330 Z" fill="${C.amarillo}" opacity="0.1" />
          <g class="s10-age"><g transform="translate(330 1330) scale(1.12)">${agente("s10")}
            <g class="s10-mano"><path d="M150 -60 Q190 -140 176 -210" fill="none" stroke="${C.blanco}" stroke-width="40" stroke-linecap="round" /><path d="M150 -60 Q190 -140 176 -210" fill="none" stroke="${C.tinta}" stroke-width="5" opacity="0" />
              <circle cx="176" cy="-226" r="26" fill="${C.blanco}" class="tinta" stroke-width="4" /></g>
          </g></g>
          ${chip("s10-c1", 700, I.wa, "WHATSAPP")}
          ${chip("s10-c2", 800, I.rayo, "AL INSTANTE", C.amarillo)}
          ${chip("s10-c3", 930, I.precio, "PRECIOS")}
          ${chip("s10-c4", 1030, I.stock, "STOCK")}
          ${chip("s10-c5", 1130, I.hora, "HORARIOS")}
          <g class="s10-zocalo"><g transform="translate(330 1250)">
            <rect x="-290" y="-38" width="580" height="76" rx="10" fill="${C.amarillo}" class="tinta" />
            <text class="tv" x="0" y="13" font-size="34" fill="${C.tinta}" text-anchor="middle">AGENTE DE IA · DE WALTER</text>
          </g></g>`,
  js: `
      const AGENTE = 0.71, CONTESTO = 1.97, WHATSAPP = 2.84, INSTANTE = 3.47, PRECIOS = 4.49, STOCK = 5.2, HORARIOS = 5.99;
      tl.fromTo(q(".s10-age"), { opacity: 0.5, scale: 0.9, svgOrigin: "330 1330" }, { opacity: 1, scale: 1, svgOrigin: "330 1330", duration: 0.4, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".s10-mano"), { rotation: -14, svgOrigin: "150 -60" }, { rotation: 14, svgOrigin: "150 -60", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.05);
      tl.fromTo(q(".s10-luz"), { opacity: 0.04 }, { opacity: 0.14, duration: 0.5, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
      tl.to(q(".s10-age-ojos"), { scaleY: 0.15, svgOrigin: "0 -269", duration: 0.07, yoyo: true, repeat: 1 }, 1.3);
      tl.to(q(".s10-age-ojos"), { scaleY: 0.15, svgOrigin: "0 -269", duration: 0.07, yoyo: true, repeat: 1 }, 4.0);
      etiqueta(0, 0.2);
      tl.fromTo(q(".s10-zocalo"), { opacity: 0, x: -600 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, AGENTE - 0.1);
      tl.to(q(".s10-zocalo"), { opacity: 0, x: -600, duration: 0.3, ease: "power2.in" }, PRECIOS - 0.5);
      const ent = (s, t) => tl.fromTo(q(s), { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)" }, t);
      ent(".s10-c1", WHATSAPP - 0.15);
      ent(".s10-c2", INSTANTE - 0.15);
      etiqueta(1, INSTANTE);
      temblor(q(".s10-c2"), INSTANTE + 0.3, 0.6);
      ent(".s10-c3", PRECIOS - 0.15);
      ent(".s10-c4", STOCK - 0.15);
      ent(".s10-c5", HORARIOS - 0.15);
      etiqueta(2, PRECIOS);
      tl.to(q(".s10-age"), { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, CONTESTO);`,
  sfx: [{ t: 0.05, sfx: "chime", vol: 0.25 }, { t: 0.6, sfx: "whoosh-short", vol: 0.22 }, { t: 2.7, sfx: "notification", vol: 0.28 }, { t: 3.35, sfx: "ping", vol: 0.28 }, { t: 4.35, sfx: "pop", vol: 0.25 }, { t: 5.05, sfx: "pop", vol: 0.25 }, { t: 5.85, sfx: "pop", vol: 0.25 }],
});
