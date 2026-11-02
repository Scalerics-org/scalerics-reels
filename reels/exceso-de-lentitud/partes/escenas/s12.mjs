import { agente, dig } from "./pj.mjs";
import { velo } from "./velo.mjs";
export const ID = "s12-agente";
export const CSS = `
  $ .s12-b { position: absolute; left: 430px; padding: 14px 24px; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; white-space: nowrap; }
  $ .s12-b1 { top: 650px; background: #efeadf; color: #0b1020; border-radius: 24px 24px 24px 6px; }
  $ .s12-b2 { top: 750px; left: 520px; background: #5ce611; color: #0b1020; border-radius: 24px 24px 6px 24px; }
  $ .s12-chip { position: absolute; left: 560px; padding: 14px 26px 12px 70px; background: #0b1020; border: 4px solid #5ce611; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: #efeadf; white-space: nowrap; text-transform: uppercase; }
  $ .s12-chip::before { content: ""; position: absolute; left: 22px; top: 50%; width: 32px; height: 32px; margin-top: -16px; border-radius: 50%; background: #5ce611; }
  $ .s12-label { position: absolute; left: 600px; top: 1040px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #9aa3b8; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s12-halo" cx="232" cy="980" r="250" fill="#5ce611" opacity="0.10" />
          <g transform="translate(70 740) scale(1.0)"><g class="s12-ag">${agente("s12", { b: "abierta" })}</g></g>
          <g transform="translate(760 960)"><g class="s12-velo">${velo("s12", { r: 190, verde: true })}</g></g>
          <g class="s12-hora">
            <rect x="590" y="890" width="400" height="190" rx="16" fill="#05080f" stroke="#5ce611" stroke-width="5" />
            <g class="s12-dg">${dig(616, 916, 66, 138, 14, "#5ce611")}${dig(696, 916, 66, 138, 14, "#5ce611")}${dig(822, 916, 66, 138, 14, "#5ce611")}${dig(902, 916, 66, 138, 14, "#5ce611")}</g>
            <circle cx="790" cy="958" r="8" fill="#5ce611" /><circle cx="790" cy="1012" r="8" fill="#5ce611" />
          </g>
        </svg>
        <div class="s12-b s12-b1">¿Tenés para hoy?</div>
        <div class="s12-b s12-b2">¡Sí! ¿A qué hora?</div>
        <div class="s12-label">al instante</div>
        <div class="s12-chip s12-c1" style="top: 820px">Tus precios</div>
        <div class="s12-chip s12-c2" style="top: 940px">Tu stock</div>
        <div class="s12-chip s12-c3" style="top: 1060px">Tus horarios</div>
        <div class="etiqueta s12-et" style="background: #5ce611">Tu agente de IA</div>
`;
export const JS = `
      // entra el agente con luz verde
      tl.fromTo(q(".s12-ag"), { opacity: 0.3, scale: 0.85, svgOrigin: "150 480" }, { opacity: 1, scale: 1, svgOrigin: "150 480", duration: 0.45, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s12-halo"), { opacity: 0 }, { opacity: 0.12, duration: 0.6 }, 0);
      pop(".s12-et", 0.5);
      hablar(".s12-agente-boca", 0.5, 2.9, 0.35);
      parpadeo(".s12-agente-ojos", 1.2);
      // "velocidad de tu cliente": la aguja pasa de LENTO a AL DÍA
      gsap.set(q(".s12-velo"), { opacity: 0 });
      pop(".s12-velo", 1.6, 0.35);
      gsap.set(q(".s12-aguja"), { rotation: -78, svgOrigin: "0 0" });
      tl.fromTo(q(".s12-aguja"), { rotation: -78, svgOrigin: "0 0" }, { rotation: 72, svgOrigin: "0 0", duration: 0.6, ease: "back.out(2)", immediateRender: false }, 2.2);
      tl.to(q(".s12-velo"), { opacity: 0, duration: 0.2 }, 3.15);
      // "Contestan al instante": el chat
      gsap.set(qa(".s12-b1, .s12-b2, .s12-label, .s12-hora"), { opacity: 0 });
      pop(".s12-b1", 3.3, 0.3, { transformOrigin: "0% 100%" });
      pop(".s12-b2", 3.85, 0.3, { transformOrigin: "100% 100%" });
      tl.to(q(".s12-label"), { opacity: 1, duration: 0.2 }, 4.4);
      hablar(".s12-agente-boca", 3.3, 6.2, 0.35);
      // "a cualquier hora": el reloj 23:00 → 03:00
      tl.to(q(".s12-label"), { opacity: 0, duration: 0.15 }, 5.2);
      pop(".s12-hora", 5.3, 0.3);
      reloj("s12-dg", (t) => (t < 5.75 ? "2300" : t < 5.95 ? "0100" : "0300"));
      tl.to(qa(".s12-b1, .s12-b2, .s12-hora"), { opacity: 0, duration: 0.2 }, 6.3);
      // "precios, stock, horarios"
      entra(".s12-c1", 6.75, 120, 0, 0.3);
      entra(".s12-c2", 7.5, 120, 0, 0.3);
      entra(".s12-c3", 8.4, 120, 0, 0.3);
      hablar(".s12-agente-boca", 6.4, 9.0, 0.35);
      tl.to(q(".s12-ag"), { y: -14, duration: 0.2, yoyo: true, repeat: 1 }, 8.5);
`;
export const SFX = [
  { t: 0.0, sfx: "sparkle", vol: 0.3, max: 1.0 },
  { t: 2.2, sfx: "whoosh", vol: 0.25, max: 0.6 },
  { t: 3.3, sfx: "notification", vol: 0.25 },
  { t: 3.85, sfx: "pop", vol: 0.3 },
  { t: 5.3, sfx: "beep", vol: 0.2, max: 0.4 },
  { t: 6.75, sfx: "ping", vol: 0.25 },
  { t: 7.5, sfx: "ping", vol: 0.25 },
  { t: 8.4, sfx: "ping", vol: 0.25 },
];
