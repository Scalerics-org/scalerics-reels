import { inspectora, dueno, autoAtras, autoFrente, volante, linterna, celular } from "./pj.mjs";
export const ID = "s01-ventanilla";
export const CSS = `
  $ .s01-cartel { left: 0; right: 0; margin: 0 auto; width: max-content; top: 600px; font-size: 54px; background: #0b1020; color: #ffc23a; border-color: #ffc23a; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-todo">
            <g transform="translate(40 580) scale(1.2)">${autoAtras("s01")}</g>
            <g transform="translate(262 590) scale(0.95)"><g class="s01-pj">${dueno("s01", { b: "mueca" })}</g></g>
            <g transform="translate(240 900) scale(0.9)">${volante("s01")}</g>
            <g transform="translate(40 580) scale(1.2)">${autoFrente("s01")}</g>
            <g transform="translate(520 690) scale(0.55)"><g class="s01-cel">${celular("s01", { pantalla: "#efeadf" })}
              <text x="150" y="250" text-anchor="middle" class="lex6" font-size="44" fill="#0b1020">escribiendo</text>
              <circle class="s01-p1" cx="100" cy="320" r="18" fill="#0b1020" /><circle class="s01-p2" cx="150" cy="320" r="18" fill="#0b1020" /><circle class="s01-p3" cx="200" cy="320" r="18" fill="#0b1020" />
            </g></g>
          </g>
          <g transform="translate(730 900) rotate(8)"><g class="s01-lint">${linterna("s01")}</g></g>
          <g transform="translate(650 690) scale(1.05)"><g class="s01-ins">${inspectora("s01")}</g></g>
        </svg>
        <div class="sello s01-cartel">CONTROL DE VELOCIDAD</div>
        <div class="etiqueta s01-et">Operativo: WhatsApp lento</div>
`;
export const JS = `
      // cuadro 0: el auto parado y la inspectora ya inclinada
      tl.fromTo(q(".s01-ins"), { x: 80, opacity: 0.7 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      hablar(".s01-ins-boca", 0.05, 3.4, 0.3);
      // "Bajá la ventanilla": el vidrio baja
      tl.fromTo(q(".s01-vidrio"), { y: 0 }, { y: 300, duration: 0.9, ease: "power1.inOut" }, 0.15);
      tl.fromTo(q(".s01-haz"), { opacity: 0.05 }, { opacity: 0.2, duration: 0.3 }, 0.6);
      parpadeo(".s01-dueno-ojos", 0.7);
      // "velocidad": cartel
      golpe(".s01-cartel", 1.9, 2.2);
      tl.set(q(".s01-cartel"), { rotation: -3 }, 0);
      // "contestando": el celular con "escribiendo..." asoma, y la linterna lo apunta
      gsap.set(q(".s01-cel"), { opacity: 0 });
      tl.fromTo(q(".s01-cel"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, 2.65);
      ["p1", "p2", "p3"].forEach((p, i) => tl.fromTo(q(".s01-" + p), { opacity: 0.2 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 2.9 + i * 0.12));
      tl.to(q(".s01-lint"), { rotation: -14, svgOrigin: "0 30", duration: 0.35, ease: "power2.out" }, 2.6);
      tl.to(qa(".s01-gota"), { opacity: 0.85, duration: 0.2 }, 2.8);
      tl.to(qa(".s01-gota"), { y: 30, duration: 0.8, ease: "power1.in" }, 2.9);
      tl.to(q(".s01-ins"), { y: -10, rotation: -3, svgOrigin: "180 540", duration: 0.3 }, 2.6);
      pop(".s01-et", 0.4);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.3, max: 0.8 },
  { t: 0.15, sfx: "whoosh", vol: 0.2, max: 0.9 },
  { t: 1.85, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
  { t: 2.65, sfx: "pop", vol: 0.3 },
  { t: 2.9, sfx: "typing", vol: 0.15, max: 0.9 },
];
