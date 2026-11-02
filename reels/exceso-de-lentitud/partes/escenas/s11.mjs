import { autito, local, dig } from "./pj.mjs";
export const ID = "s11-esquina";
export const CSS = `
  $ .s11-globo { position: absolute; left: 600px; top: 1130px; padding: 14px 24px; background: #efeadf; color: #0b1020; border-radius: 24px 24px 6px 24px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; white-space: nowrap; }
  $ .s11-visto { position: absolute; left: 640px; top: 1210px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #3d7bff; letter-spacing: 0.1em; white-space: nowrap; }
  $ .s11-sello { left: 580px; top: 1240px; font-size: 48px; background: rgba(11, 16, 32, 0.9); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-mapa">
            <rect x="420" y="880" width="200" height="500" fill="#2a3150" />
            <rect x="420" y="880" width="700" height="190" fill="#2a3150" />
            <path d="M520 1360 V1090" stroke="#ffc23a" stroke-width="6" stroke-dasharray="30 26" />
            <path d="M640 975 H1080" stroke="#ffc23a" stroke-width="6" stroke-dasharray="30 26" />
            <path d="M420 1380 V880 H1100 M620 1380 V1070 H1100" fill="none" stroke="#efeadf" stroke-width="5" opacity="0.6" />
          </g>
          <g transform="translate(60 980) scale(0.95)"><g class="s11-tulocal">${local("s11", "TU LOCAL", "r", false)}</g></g>
          <g transform="translate(690 590) scale(0.85)"><g class="s11-enfrente">${local("s11", "ENFRENTE", "g", true)}</g></g>
          <g class="s11-hora">
            <rect x="90" y="640" width="290" height="150" rx="16" fill="#05080f" stroke="#efeadf" stroke-width="5" />
            <g class="s11-dg">${dig(112, 662, 50, 106, 11)}${dig(172, 662, 50, 106, 11)}${dig(258, 662, 50, 106, 11)}${dig(318, 662, 50, 106, 11)}</g>
            <circle cx="240" cy="694" r="7" fill="#ffc23a" /><circle cx="240" cy="738" r="7" fill="#ffc23a" />
          </g>
          <g transform="translate(476 1220)"><g class="s11-auto"><g class="s11-rot">${autito("s11", "r")}</g></g></g>
        </svg>
        <div class="s11-globo">¿Tenés para hoy?</div>
        <div class="s11-visto">✓✓ visto</div>
        <div class="sello s11-sello">Se fue</div>
        <div class="etiqueta s11-et">Tu cliente, a las 23:00</div>
`;
export const JS = `
      tl.fromTo(q(".s11-mapa"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      pop(".s11-tulocal", 0.0, 0.35, { transformOrigin: "50% 100%" });
      pop(".s11-et", 0.3);
      // "Y tu cliente pregunta": el auto entra y sale el globo
      entra(".s11-auto", 0.05, 0, 200, 0.5);
      pop(".s11-globo", 1.0, 0.3, { transformOrigin: "100% 100%" });
      // "a las once de la noche": la hora
      gsap.set(q(".s11-hora"), { opacity: 0 });
      pop(".s11-hora", 1.55, 0.3);
      reloj("s11-dg", (t) => "2300");
      // "Si no le contestás": visto
      gsap.set(q(".s11-visto"), { opacity: 0 });
      tl.to(q(".s11-visto"), { opacity: 1, duration: 0.2 }, 3.3);
      tl.to(q(".s11-globo"), { opacity: 0.4, duration: 0.3 }, 3.6);
      // "dobla en la esquina": el auto sube y dobla a la derecha
      tl.to(qa(".s11-globo, .s11-visto"), { opacity: 0, duration: 0.2 }, 4.2);
      tl.to(q(".s11-auto"), { y: -270, duration: 0.5, ease: "power1.in" }, 4.2);
      tl.to(q(".s11-rot"), { rotation: 90, svgOrigin: "45 75", duration: 0.35, ease: "power1.inOut" }, 4.6);
      tl.to(q(".s11-auto"), { x: 150, duration: 0.5, ease: "power1.out" }, 4.75);
      // "estaciona en el de enfrente": entra el local de enfrente con luz, el auto frena
      gsap.set(q(".s11-enfrente"), { opacity: 0 });
      pop(".s11-enfrente", 5.4, 0.4, { transformOrigin: "50% 100%" });
      tl.to(q(".s11-auto"), { x: 260, duration: 0.6, ease: "power2.out" }, 5.6);
      golpe(".s11-sello", 6.3, 2.2);
      tl.set(q(".s11-sello"), { rotation: -5 }, 0);
      tl.to(q(".s11-tulocal"), { opacity: 0.45, duration: 0.4 }, 6.3);
`;
export const SFX = [
  { t: 0.05, sfx: "whoosh", vol: 0.2, max: 0.6 },
  { t: 1.0, sfx: "notification", vol: 0.3 },
  { t: 1.55, sfx: "beep", vol: 0.25, max: 0.4 },
  { t: 3.3, sfx: "glitch-1", vol: 0.18, max: 0.3 },
  { t: 4.2, sfx: "whoosh-short", vol: 0.25 },
  { t: 5.4, sfx: "chime", vol: 0.25, max: 0.7 },
  { t: 6.3, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
];
