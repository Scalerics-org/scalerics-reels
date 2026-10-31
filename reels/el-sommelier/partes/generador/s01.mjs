import { C, somm, botella, escupidera, barrica, clienta, escena, sfx } from "./lib.mjs";
import { D } from "./dur.mjs";
const id = "s01-gancho", p = "s01";
escena({
  id, dur: D[id],
  etiquetas: ["Cata · tu local", "Directo a la escupidera"],
  svg: `
          ${barrica(p, "barr1", 150, 860, 0.85, "")}
          ${barrica(p, "barr2", 930, 860, 0.85, "")}
          ${somm(p, { x: 540, y: 790, s: 1.1 })}
          <!-- la mesa de cata -->
          <g class="${p}-mesa">
            <rect x="20" y="1150" width="1040" height="30" fill="#3e2615" />
            <rect x="40" y="1180" width="1000" height="150" fill="${C.roble}" />
            <path d="M80 1220 Q300 1210 520 1226 T 1000 1218 M60 1280 Q260 1272 480 1288 T 1020 1282" fill="none" stroke="#3e2615" stroke-width="4" opacity="0.7" />
          </g>
          ${botella(p, "botella", 360, 1170, 0.78, ["TU LOCAL", "por", "Instagram"])}
          ${escupidera(p, "escup", 850, 1182, 0.95)}
          <path class="${p}-chorro" d="M600 878 Q740 800 846 1030" fill="none" stroke="${C.vino}" stroke-width="16" stroke-linecap="round" />
          <g class="${p}-gotas" fill="${C.vino}">
            <circle cx="800" cy="1010" r="9" /><circle cx="900" cy="1000" r="7" /><circle cx="830" cy="985" r="6" /><circle cx="880" cy="1020" r="8" />
          </g>
          ${clienta(p, { x: 170, y: 1105, s: 0.66 })}
  `,
  js: `
      const ESCUPIR = 4.9, TAN = 5.69, LOCAL = 2.12;
      // cuadro 0 ya armado; la cámara se acerca
      tl.fromTo(q(".${p}-escenario"), { scale: 1.06 }, { scale: 1, duration: 4.4, ease: "none", transformOrigin: "540px 900px" }, 0);
      tl.fromTo(q(".${p}-som"), { opacity: 0.6, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(qa(".${p}-barr1, .${p}-barr2"), { opacity: 0.3 }, { opacity: 0.55, duration: 0.5 }, 0);
      tl.fromTo(q(".${p}-mesa"), { y: 40 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      etiq(0, 1, 0.15);
      // la copa gira (se "airea")
      tl.fromTo(q(".${p}-som-copa"), { rotation: -7, transformOrigin: "50% 100%" }, { rotation: 7, duration: 0.32, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0.1);
      tl.to(q(".${p}-som-ceja-d"), { y: -6, duration: 0.2, yoyo: true, repeat: 1 }, 0.5);
      // "local": la botella del local en la mesa
      pop(q(".${p}-botella"), LOCAL - 0.1);
      tl.to(q(".${p}-botella"), { rotation: -4, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1 }, 2.65);
      // trago
      tl.to(q(".${p}-som-brazo"), { x: -150, y: 20, rotation: -22, transformOrigin: "60% 90%", duration: 0.35, ease: "power2.inOut" }, 3.0);
      tl.set(q(".${p}-som-boca"), { opacity: 0 }, 3.35);
      tl.set(q(".${p}-som-cachete"), { opacity: 1 }, 3.35);
      tl.to(q(".${p}-som-brazo"), { x: 0, y: 0, rotation: 0, duration: 0.35, ease: "power2.inOut" }, 3.6);
      tl.to(q(".${p}-som-cabeza"), { x: -6, duration: 0.08, yoyo: true, repeat: 5 }, 3.75);
      // se da vuelta hacia la escupidera
      tl.to(q(".${p}-som-cabeza"), { rotation: 14, x: 18, transformOrigin: "50% 80%", duration: 0.3, ease: "power2.out" }, 4.35);
      // "escupir"
      tl.set(q(".${p}-som-cachete"), { opacity: 0 }, ESCUPIR - 0.1);
      tl.set(q(".${p}-som-asco"), { opacity: 1 }, ESCUPIR - 0.1);
      dibujar(q(".${p}-chorro"), ESCUPIR - 0.1, 0.22);
      tl.to(q(".${p}-chorro"), { opacity: 0, duration: 0.25 }, ESCUPIR + 0.3);
      tl.fromTo(qa(".${p}-gotas circle"), { opacity: 0, y: 30 }, { opacity: 1, y: -30, duration: 0.25, ease: "power2.out", stagger: 0.03 }, ESCUPIR + 0.1);
      tl.to(qa(".${p}-gotas circle"), { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" }, ESCUPIR + 0.45);
      temblor(q(".${p}-escup"), ESCUPIR + 0.12, 0.6);
      etiq(1, 2, ESCUPIR);
      tl.to(q(".${p}-som-cabeza"), { rotation: 0, x: 0, duration: 0.35, ease: "power2.inOut" }, 5.5);
      // "¿Tan mala era?": asoma la clienta
      tl.fromTo(q(".${p}-cli"), { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, TAN - 0.2);
      tl.fromTo(q(".${p}-cli-boca"), { scaleY: 0.4, transformOrigin: "50% 50%" }, { scaleY: 1.2, duration: 0.2, yoyo: true, repeat: 3 }, TAN);
      tl.to(q(".${p}-cli-cabeza"), { rotation: -10, transformOrigin: "50% 90%", duration: 0.3 }, 6.1);
  `,
});
sfx(id, [{ t: 0.05, sfx: "tic", vol: 0.3 }, { t: 2.05, sfx: "pop", vol: 0.25 }, { t: 3.3, sfx: "click-soft", vol: 0.25 }, { t: 4.82, sfx: "splash", vol: 0.45 }, { t: 4.9, sfx: "uuh", vol: 0.22, max: 1.4 }, { t: 5.55, sfx: "pop", vol: 0.25 }]);
