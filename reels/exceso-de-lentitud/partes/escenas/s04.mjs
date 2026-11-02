export const ID = "s04-lento-visto";
const hex = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * 0.87} ${y - r / 2} V${y + r / 2} L${x} ${y + r} L${x - r * 0.87} ${y + r / 2} V${y - r / 2} Z" fill="none" stroke="#0b1020" stroke-width="5" opacity="0.5" />`;
export const CSS = `
  $ .s04-t { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap; }
  $ .s04-viejo { top: 690px; font-size: 76px; color: #efeadf; }
  $ .s04-nuevo { top: 660px; font-size: 84px; color: #ffc23a; }
  $ .s04-nuevo span { color: #3d7bff; }
  $ .s04-pronto { position: absolute; left: 0; right: 0; text-align: center; top: 1236px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: #efeadf; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-poster">
            <rect x="200" y="610" width="680" height="700" rx="10" fill="#0b1020" stroke="#efeadf" stroke-width="7" />
            <path d="M200 1180 H880" stroke="#efeadf" stroke-width="3" opacity="0.4" />
          </g>
          <g class="s04-auto">
            <path d="M330 1060 L380 960 H660 L730 1060 H790 V1130 H290 V1060 Z" fill="#ff3b4a" stroke="#efeadf" stroke-width="7" stroke-linejoin="round" />
            <circle cx="390" cy="1132" r="34" fill="#0b1020" stroke="#efeadf" stroke-width="7" /><circle cx="690" cy="1132" r="34" fill="#0b1020" stroke="#efeadf" stroke-width="7" />
            <path d="M220 1000 H300 M200 1040 H280 M230 1080 H300" stroke="#efeadf" stroke-width="8" stroke-linecap="round" opacity="0.6" />
          </g>
          <path class="rl s04-tacha" d="M240 760 L840 700" stroke-width="14" />
          <g class="s04-tortuga">
            <path d="M380 1120 C380 960 700 960 700 1120 Z" fill="#ffc23a" stroke="#efeadf" stroke-width="7" />
            ${hex(470, 1060, 40)}${hex(560, 1040, 40)}${hex(640, 1080, 34)}
            <path d="M700 1100 C740 1100 770 1080 770 1050 C770 1020 740 1010 720 1030 L700 1070" fill="#9fb08a" stroke="#efeadf" stroke-width="7" />
            <circle cx="748" cy="1048" r="6" fill="#0b1020" />
            <path d="M400 1120 V1150 M460 1120 V1150 M620 1120 V1150 M680 1120 V1150" stroke="#9fb08a" stroke-width="22" stroke-linecap="round" />
            <path d="M370 1110 L340 1124" stroke="#9fb08a" stroke-width="14" stroke-linecap="round" />
            <path class="azl s04-c1" d="M560 880 L590 910 L650 840" stroke-width="16" />
            <path class="azl s04-c2" d="M610 880 L640 910 L700 840" stroke-width="16" />
          </g>
        </svg>
        <div class="s04-t s04-viejo">Rápido<br />y furioso</div>
        <div class="s04-t s04-nuevo">Lento<br /><span>y en visto</span></div>
        <div class="s04-pronto s04-pr">PRÓXIMAMENTE · EN TU LOCAL</div>
        <div class="etiqueta s04-et">La película de tu WhatsApp</div>
`;
export const JS = `
      tl.fromTo(q(".s04-poster"), { opacity: 0.5, scale: 0.92, svgOrigin: "540 960" }, { opacity: 1, scale: 1, svgOrigin: "540 960", duration: 0.35, ease: "back.out(1.6)" }, 0);
      pop(".s04-et", 0.3);
      // "Rápido y Furioso": el título y el auto entran rápido
      gsap.set(q(".s04-viejo"), { opacity: 0 });
      tl.fromTo(q(".s04-viejo"), { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.2, ease: "power3.out", immediateRender: false }, 0.6);
      entra(".s04-auto", 0.62, -500, 0, 0.25);
      tl.to(q(".s04-auto"), { x: 8, duration: 0.05, yoyo: true, repeat: 9 }, 0.9);
      // "querido": tachado
      dibujar(".s04-tacha", 1.4, 0.25);
      // "es Lento y en Visto": cambia el póster
      tl.to(qa(".s04-viejo, .s04-auto, .s04-tacha"), { opacity: 0, duration: 0.15 }, 1.8);
      golpe(".s04-nuevo", 2.0, 1.8);
      entra(".s04-tortuga", 2.1, 0, 60, 0.6);
      dibujar(".s04-c1", 2.8, 0.2);
      dibujar(".s04-c2", 2.95, 0.2);
      pop(".s04-pr", 2.1, 0.3);
      tl.to(q(".s04-tortuga"), { x: 14, duration: 1.4, ease: "none" }, 2.2);
`;
export const SFX = [
  { t: 0.55, sfx: "whoosh", vol: 0.3, max: 0.7 },
  { t: 1.4, sfx: "glitch-1", vol: 0.2, max: 0.3 },
  { t: 1.95, sfx: "impact-bass-2", vol: 0.38, max: 0.8 },
  { t: 2.85, sfx: "ping", vol: 0.25 },
];
