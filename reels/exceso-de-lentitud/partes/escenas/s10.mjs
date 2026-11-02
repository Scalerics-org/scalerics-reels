import { inspectora, senal } from "./pj.mjs";
export const ID = "s10-limite";
export const CSS = `
  $ .s10-t { position: absolute; left: 520px; width: 400px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; color: #0b1020; }
  $ .s10-vos { top: 790px; font-size: 92px; }
  $ .s10-cli { top: 776px; font-size: 52px; }
  $ .s10-cli small { display: block; font-size: 30px; color: #ff3b4a; margin-bottom: 4px; }
  $ .s10-cartel { left: 540px; top: 1120px; font-size: 40px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 760) scale(0.95)"><g class="s10-pj">${inspectora("s10", { b: "sonrisa" })}</g></g>
          <g transform="translate(720 840)"><g class="s10-senal">${senal("s10", { r: 190 })}</g></g>
          <path class="rl s10-tacha" d="M590 900 L850 800" stroke-width="16" />
        </svg>
        <div class="s10-t s10-vos">Vos</div>
        <div class="s10-t s10-cli"><small>límite</small>Tu<br />cliente</div>
        <div class="cartel s10-cartel">Lo pone el cliente</div>
        <div class="etiqueta s10-et">Ley de tránsito</div>
`;
export const JS = `
      // "Ya sé.": la inspectora se ablanda (se acomoda la gorra)
      tl.fromTo(q(".s10-pj"), { x: -40, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.to(q(".s10-gorra"), { rotation: -8, svgOrigin: "180 200", y: -6, duration: 0.3, yoyo: true, repeat: 1 }, 0.1);
      hablar(".s10-ins-boca", 0.0, 0.5, 0.5);
      hablar(".s10-ins-boca", 0.97, 4.3, 0.5);
      parpadeo(".s10-ins-ojos", 0.5);
      pop(".s10-et", 0.3);
      // "límite": la señal
      gsap.set(qa(".s10-cli, .s10-vos"), { opacity: 0 });
      tl.fromTo(q(".s10-senal"), { opacity: 0, scale: 0.4, svgOrigin: "0 300" }, { opacity: 1, scale: 1, svgOrigin: "0 300", duration: 0.4, ease: "back.out(1.8)", immediateRender: false }, 0.6);
      gsap.set(q(".s10-senal"), { opacity: 0 });
      // "no lo ponés vos": VOS, tachado
      tl.fromTo(q(".s10-vos"), { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, 2.1);
      dibujar(".s10-tacha", 2.45, 0.25);
      // "Lo pone tu cliente": cambia
      tl.to(qa(".s10-vos, .s10-tacha"), { opacity: 0, duration: 0.15 }, 3.1);
      tl.to(q(".s10-senal"), { rotation: 360, svgOrigin: "0 0", duration: 0.5, ease: "power2.inOut" }, 3.1);
      tl.fromTo(q(".s10-cli"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 3.6);
      pop(".s10-cartel", 3.55, 0.3);
      tl.set(q(".s10-cartel"), { rotation: -3 }, 0);
`;
export const SFX = [
  { t: 0.1, sfx: "whoosh-short", vol: 0.2 },
  { t: 1.2, sfx: "pop", vol: 0.3 },
  { t: 2.1, sfx: "impact-bass-2", vol: 0.3, max: 0.6 },
  { t: 2.45, sfx: "glitch-1", vol: 0.18, max: 0.3 },
  { t: 3.1, sfx: "whoosh", vol: 0.25, max: 0.6 },
  { t: 3.7, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
];
