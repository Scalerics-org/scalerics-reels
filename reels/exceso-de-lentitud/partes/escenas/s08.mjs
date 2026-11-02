import { dueno, alcoholimetro } from "./pj.mjs";
export const ID = "s08-sopla";
export const CSS = `
  $ .s08-ticket { position: absolute; left: 340px; top: 1150px; width: 600px; padding: 16px 30px 14px; background: #efeadf; color: #0b1020; border: 6px solid #ff3b4a; border-radius: 10px; text-align: center; white-space: nowrap; }
  $ .s08-ticket small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; color: #ff3b4a; }
  $ .s08-ticket b { display: block; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; line-height: 1.05; margin-top: 6px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(30 640) scale(1.15)"><g class="s08-pj">${dueno("s08", { b: "abierta" })}</g></g>
          <g class="s08-aire">
            <path class="l" d="M240 1060 C220 1080 250 1100 230 1120 M280 1060 C260 1080 290 1100 270 1120" stroke-width="5" opacity="0.6" />
          </g>
          <g transform="translate(300 1100) rotate(-90)"><g class="s08-alc">${alcoholimetro("s08")}</g></g>
          <text class="mono s08-t0" x="475" y="1010" text-anchor="middle" font-size="22" fill="#9aa3b8">LISTO</text>
          <text class="slex s08-t1" x="475" y="1010" text-anchor="middle" font-size="22" fill="#ff3b4a">POSITIVO</text>
        </svg>
        <div class="s08-ticket"><small>RESULTADO · POSITIVO EN</small><b class="s08-r1">???</b><b class="s08-r2" style="position: absolute; left: 0; right: 0; bottom: 14px;">«AHORA NO PUEDO»</b></div>
        <div class="etiqueta s08-et">Espirometría</div>
`;
export const JS = `
      tl.fromTo(q(".s08-alc"), { y: 200, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      pop(".s08-et", 0.2);
      gsap.set(qa(".s08-t1, .s08-aire"), { opacity: 0 });
      // "Soplá acá": el dueño sopla (cachetes)
      tl.to(q(".s08-dueno-boca"), { scaleX: 0.6, scaleY: 0.6, transformOrigin: "50% 50%", duration: 0.15 }, 0.4);
      tl.to(q(".s08-aire"), { opacity: 1, duration: 0.1 }, 0.45);
      tl.fromTo(q(".s08-aire"), { y: -40 }, { y: 20, duration: 0.5, ease: "none", immediateRender: false }, 0.45);
      tl.to(q(".s08-aire"), { opacity: 0, duration: 0.1 }, 0.85);
      tl.to(q(".s08-dueno-boca"), { scaleX: 1, scaleY: 1, duration: 0.15 }, 0.9);
      tl.to(q(".s08-alc"), { x: 6, duration: 0.05, yoyo: true, repeat: 5 }, 0.45);
      // "positivo": la pantalla
      tl.to(q(".s08-t0"), { opacity: 0, duration: 0.05 }, 0.85);
      tl.to(q(".s08-t1"), { opacity: 1, duration: 0.05 }, 0.88);
      tl.fromTo(q(".s08-t1"), { opacity: 1 }, { opacity: 0.3, duration: 0.12, yoyo: true, repeat: 5, immediateRender: false }, 1.0);
      tl.to(q(".s08-dueno-cejas"), { y: -10, duration: 0.15 }, 1.0);
      // "ahora no puedo": sale el ticket
      gsap.set(q(".s08-ticket"), { opacity: 0 });
      tl.fromTo(q(".s08-ticket"), { opacity: 1, y: -160, scaleY: 0.2, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, 1.0);
      gsap.set(q(".s08-r2"), { opacity: 0 });
      tl.fromTo(q(".s08-r1"), { opacity: 1 }, { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 5, immediateRender: false }, 1.3);
      tl.to(q(".s08-r1"), { opacity: 0, duration: 0.05 }, 2.12);
      tl.fromTo(q(".s08-r2"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, 2.1);
      tl.set(q(".s08-ticket"), { rotation: -3 }, 0);
      sacudon(2.4, 0.7);
      tl.to(qa(".s08-gota"), { opacity: 0.85, duration: 0.15 }, 2.5);
      tl.to(qa(".s08-gota"), { y: 30, duration: 0.8, ease: "power1.in" }, 2.6);
`;
export const SFX = [
  { t: 0.45, sfx: "whoosh", vol: 0.2, max: 0.5 },
  { t: 0.88, sfx: "beep", vol: 0.3, max: 0.5 },
  { t: 1.1, sfx: "beep", vol: 0.3, max: 0.5 },
  { t: 2.1, sfx: "click", vol: 0.3 },
  { t: 2.4, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
];
