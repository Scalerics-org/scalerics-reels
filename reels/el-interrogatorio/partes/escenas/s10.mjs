import { buena, telefono } from "./pj.mjs";
export const ID = "s10-tu-llamada";
export const CSS = `
  $ .s10-card { position: absolute; left: 560px; width: 420px; padding: 16px 22px; background: #111815; border: 4px solid #e5484d; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 30px; color: #efeadf; white-space: nowrap; }
  $ .s10-card b { color: #e5484d; font-weight: 800; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(60 830) scale(1.0)"><g class="s10-pj">${buena("s10")}</g></g>
          <g transform="translate(620 1080) scale(0.85)"><g class="s10-tel">${telefono("s10")}</g></g>
          <g class="s10-ring"><path class="rl s10-r" d="M600 1100 C580 1080 580 1050 600 1030 M940 1100 C960 1080 960 1050 940 1030" stroke-width="7" /></g>
        </svg>
        <div class="s10-card s10-c1" style="top: 660px"><b>×</b> Llamada perdida</div>
        <div class="s10-card s10-c2" style="top: 760px"><b>×</b> Llamada perdida</div>
        <div class="s10-card s10-c3" style="top: 860px"><b>×</b> Llamada perdida</div>
        <div class="etiqueta s10-et">Golpe bajo</div>
`;
export const JS = `
      tl.fromTo(q(".s10-pj"), { x: -80, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s10-buena-boca", 0, 0.7, 0.5);
      tl.fromTo(q(".s10-tel"), { opacity: 0.5 }, { opacity: 1, duration: 0.2 }, 0);
      // el teléfono suena y nadie atiende
      tl.to(q(".s10-tubo"), { y: -20, duration: 0.07, yoyo: true, repeat: 7 }, 0.2);
      tl.to(q(".s10-tubo"), { y: -20, duration: 0.07, yoyo: true, repeat: 7 }, 1.4);
      dibujar(".s10-r", 0.2, 0.3);
      // "atendés", "las que", "hacen": se apilan las perdidas
      pop(".s10-c1", 1.05, 0.3);
      pop(".s10-c2", 1.6, 0.3);
      pop(".s10-c3", 2.0, 0.3);
      hablar(".s10-buena-boca", 1.0, 2.4, 0.5);
      tl.to(q(".s10-buena-cejas"), { y: -8, duration: 0.15 }, 1.0);
      pop(".s10-et", 0.5);
`;
export const SFX = [
  { t: 0.2, sfx: "beep", vol: 0.22, max: 0.6 },
  { t: 1.05, sfx: "glitch-1", vol: 0.18, max: 0.3 },
  { t: 1.6, sfx: "pop", vol: 0.25 },
  { t: 2.0, sfx: "pop", vol: 0.25 },
];
