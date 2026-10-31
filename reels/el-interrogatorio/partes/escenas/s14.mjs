import { agente, dueno, sarten } from "./pj.mjs";
export const ID = "s14-agente";
export const CSS = `
  $ .s14-card { position: absolute; left: 470px; width: 540px; padding: 18px 24px 18px 84px; background: #111815; border: 4px solid #5ce611; border-radius: 18px; white-space: nowrap; }
  $ .s14-card::before { content: ""; position: absolute; left: 24px; top: 50%; width: 40px; height: 40px; margin-top: -20px; border-radius: 50%; background: #5ce611; }
  $ .s14-card::after { content: ""; position: absolute; left: 37px; top: 50%; width: 10px; height: 20px; margin-top: -14px; border: solid #111815; border-width: 0 5px 5px 0; transform: rotate(45deg); }
  $ .s14-card b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; color: #efeadf; line-height: 1.1; }
  $ .s14-card span { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #9fb3a8; margin-top: 6px; }
  $ .s14-globo { position: absolute; left: 110px; top: 640px; padding: 14px 24px; background: #5ce611; color: #111815; border-radius: 24px 24px 24px 6px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s14-halo" cx="222" cy="990" r="240" fill="#5ce611" opacity="0.10" />
          <g transform="translate(80 760) scale(0.95)"><g class="s14-ag">${agente("s14", { b: "abierta" })}</g></g>
          <g class="s14-cocina">
            <g transform="translate(650 950) scale(0.72)"><g class="s14-pj">${dueno("s14", { b: "sonrisa" })}</g></g>
            <g transform="translate(560 1240) scale(0.7)">${sarten("s14")}</g>
          </g>
        </svg>
        <div class="s14-globo">¡Hola! ¿En qué te ayudo?</div>
        <div class="s14-card s14-c1" style="top: 690px"><b>Reserva tomada</b><span>Mesa para 4 · 21:30</span></div>
        <div class="s14-card s14-c2" style="top: 850px"><b>Turno agendado</b><span>Martes · 10:00</span></div>
        <div class="s14-card s14-c3" style="top: 1010px"><b>Confirmado</b><span>Te esperamos</span></div>
        <div class="etiqueta s14-et">Tu agente de IA</div>
`;
export const JS = `
      // entra el agente con la luz de la puerta
      tl.fromTo(q(".s14-ag"), { opacity: 0.3, scale: 0.85, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s14-halo"), { opacity: 0 }, { opacity: 0.12, duration: 0.6 }, 0);
      pop(".s14-et", 0.85);
      parpadeo(".s14-agente-ojos", 0.6);
      // "WhatsApp": saluda
      pop(".s14-globo", 1.75, 0.35, { transformOrigin: "0% 100%" });
      hablar(".s14-agente-boca", 1.8, 3.0, 0.35);
      // "mientras vos cocinás": el dueño cocina tranquilo
      entra(".s14-cocina", 2.2, 200, 0, 0.35);
      tl.to(q(".s14-mila"), { y: -120, rotation: 180, svgOrigin: "130 30", duration: 0.35, ease: "power2.out" }, 2.8);
      tl.to(q(".s14-mila"), { y: 0, duration: 0.3, ease: "bounce.out" }, 3.15);
      // "Toman la reserva": se va la cocina, entran las tarjetas
      sale(".s14-globo", 3.3);
      tl.to(q(".s14-cocina"), { opacity: 0, x: 200, duration: 0.3, ease: "power2.in" }, 3.4);
      entra(".s14-c1", 3.9, 120, 0, 0.3);
      entra(".s14-c2", 4.9, 120, 0, 0.3);
      entra(".s14-c3", 5.6, 120, 0, 0.3);
      hablar(".s14-agente-boca", 3.9, 6.1, 0.35);
      tl.to(q(".s14-ag"), { y: -12, duration: 0.2, yoyo: true, repeat: 1 }, 5.7);
`;
export const SFX = [
  { t: 0.0, sfx: "sparkle", vol: 0.3, max: 1.0 },
  { t: 1.75, sfx: "pop", vol: 0.3 },
  { t: 2.8, sfx: "whoosh-short", vol: 0.22 },
  { t: 3.9, sfx: "ping", vol: 0.3 },
  { t: 4.9, sfx: "ping", vol: 0.3 },
  { t: 5.6, sfx: "chime", vol: 0.3, max: 0.8 },
];
