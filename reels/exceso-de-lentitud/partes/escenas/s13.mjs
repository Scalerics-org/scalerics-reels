import { agente, dueno } from "./pj.mjs";
export const ID = "s13-turnos";
export const CSS = `
  $ .s13-card { position: absolute; left: 450px; width: 560px; padding: 18px 24px 18px 84px; background: #0b1020; border: 4px solid #5ce611; border-radius: 18px; white-space: nowrap; }
  $ .s13-card::before { content: ""; position: absolute; left: 24px; top: 50%; width: 40px; height: 40px; margin-top: -20px; border-radius: 50%; background: #5ce611; }
  $ .s13-card b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; color: #efeadf; line-height: 1.1; }
  $ .s13-card span { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #9aa3b8; margin-top: 6px; }
  $ .s13-globo { position: absolute; left: 330px; top: 640px; padding: 14px 24px; background: #5ce611; color: #0b1020; border-radius: 24px 24px 24px 6px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle cx="222" cy="990" r="240" fill="#5ce611" opacity="0.10" />
          <g transform="translate(80 760) scale(0.95)"><g class="s13-ag">${agente("s13")}</g></g>
          <g transform="translate(650 820) scale(0.95)"><g class="s13-pj">${dueno("s13", { b: "sonrisa" })}</g></g>
          <path class="sl s13-flecha" d="M380 980 C460 900 560 900 620 960 M590 930 L624 964 L580 978" stroke-width="10" />
        </svg>
        <div class="s13-card s13-c1" style="top: 700px"><b>Turno agendado</b><span>Martes · 10:00</span></div>
        <div class="s13-card s13-c2" style="top: 860px"><b>Pedido tomado</b><span>Para retirar mañana</span></div>
        <div class="s13-globo">Esta es para vos</div>
        <div class="etiqueta s13-et" style="background: #5ce611">Tu empleado de IA</div>
`;
export const JS = `
      tl.fromTo(q(".s13-ag"), { opacity: 0.6, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      pop(".s13-et", 0.2);
      hablar(".s13-agente-boca", 0.0, 2.3, 0.4);
      // "Agendan turnos", "toman pedidos"
      entra(".s13-c1", 0.05, 140, 0, 0.3);
      entra(".s13-c2", 1.35, 140, 0, 0.3);
      // "si es para vos, te pasan la conversación": entra el dueño, flecha
      tl.to(qa(".s13-c1, .s13-c2"), { opacity: 0, x: 120, duration: 0.25, ease: "power2.in" }, 2.45);
      gsap.set(qa(".s13-pj, .s13-globo"), { opacity: 0 });
      entra(".s13-pj", 2.6, 200, 0, 0.35);
      pop(".s13-globo", 3.0, 0.3, { transformOrigin: "0% 100%" });
      dibujar(".s13-flecha", 3.8, 0.45);
      tl.to(q(".s13-ag"), { rotation: 6, svgOrigin: "150 480", duration: 0.25, yoyo: true, repeat: 1 }, 3.8);
      hablar(".s13-dueno-boca", 4.5, 5.4, 0.6);
      parpadeo(".s13-dueno-ojos", 4.3);
`;
export const SFX = [
  { t: 0.05, sfx: "ping", vol: 0.3 },
  { t: 1.35, sfx: "ping", vol: 0.3 },
  { t: 2.6, sfx: "whoosh-short", vol: 0.22 },
  { t: 3.0, sfx: "pop", vol: 0.3 },
  { t: 3.8, sfx: "chime", vol: 0.3, max: 0.8 },
];
