import { inspectora, senal } from "./pj.mjs";
export const ID = "s14-cta";
export const CSS = `
  $ .s14-diez { position: absolute; left: 340px; width: 400px; top: 700px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #0b1020; white-space: nowrap; }
  $ .s14-placa { position: absolute; left: 0; right: 0; margin: 0 auto; width: max-content; top: 990px; padding: 12px 26px 10px; background: #efeadf; color: #0b1020; border: 5px solid #0b1020; outline: 4px solid #efeadf; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; letter-spacing: 0.12em; white-space: nowrap; }
  $ .s14-boton { position: absolute; left: 0; right: 0; margin: 0 auto; width: max-content; top: 1180px; padding: 18px 40px 16px; background: #ffc23a; color: #0b1020; border-radius: 999px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1; white-space: nowrap; }
  $ .s14-pase { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1150px; font-size: 64px; color: #5ce611; border-color: #5ce611; background: rgba(11, 16, 32, 0.9); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(320 640) scale(1.2)"><g class="s14-pj">${inspectora("s14", { b: "sonrisa" })}
            <path class="s14-mano" d="M300 430 C330 380 340 330 330 290" fill="none" stroke="#1e3a8a" stroke-width="40" stroke-linecap="round" />
            <ellipse class="piel s14-mano" cx="330" cy="280" rx="26" ry="30" stroke-width="5" />
          </g></g>
          <g transform="translate(540 790)"><g class="s14-senal">${senal("s14", { r: 180 })}</g></g>
        </svg>
        <div class="sello s14-pase">Puede circular</div>
        <div class="s14-diez">10</div>
        <div class="s14-placa">TU WHATSAPP</div>
        <div class="s14-boton">Etiquetalo</div>
        <div class="etiqueta s14-et">Próximo control</div>
`;
export const JS = `
      // "Puede circular": la inspectora saluda
      tl.fromTo(q(".s14-pj"), { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s14-ins-boca", 0.0, 0.8, 0.5);
      tl.fromTo(qa(".s14-mano"), { rotation: -10, svgOrigin: "300 430" }, { rotation: 12, svgOrigin: "300 430", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.1);
      golpe(".s14-pase", 0.25, 2.0);
      tl.set(q(".s14-pase"), { rotation: -4 }, 0);
      // "Etiquetá": sale ella, entra la señal de 10
      tl.to(qa(".s14-pj, .s14-pase"), { opacity: 0, y: 40, duration: 0.25, ease: "power2.in" }, 1.15);
      gsap.set(qa(".s14-senal, .s14-diez, .s14-placa"), { opacity: 0 });
      tl.fromTo(q(".s14-senal"), { opacity: 0, scale: 0.4, svgOrigin: "0 300" }, { opacity: 1, scale: 1, svgOrigin: "0 300", duration: 0.4, ease: "back.out(1.8)", immediateRender: false }, 1.3);
      pop(".s14-boton", 1.45, 0.4);
      // "WhatsApp": la placa; "diez": el 10
      pop(".s14-placa", 2.45, 0.3);
      golpe(".s14-diez", 3.22, 2.2);
      sacudon(3.3, 0.6);
      pop(".s14-et", 3.6);
      tl.to(q(".s14-boton"), { scale: 1.08, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 4.0);
      tl.to(qa(".s14-senal"), { rotation: 4, svgOrigin: "0 600", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 4.2);
`;
export const SFX = [
  { t: 0.25, sfx: "impact-bass-2", vol: 0.3, max: 0.6 },
  { t: 1.3, sfx: "pop", vol: 0.3 },
  { t: 2.45, sfx: "click-soft", vol: 0.3 },
  { t: 3.2, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
  { t: 3.25, sfx: "click", vol: 0.3 },
];
