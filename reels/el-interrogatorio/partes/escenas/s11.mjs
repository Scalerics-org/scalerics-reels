import { malo } from "./pj.mjs";
export const ID = "s11-silencio";
const fila = (y, n, msg, i) => `
      <g class="s11-fila s11-f${i}">
        <circle cx="54" cy="${y + 40}" r="28" fill="${["#e5484d", "#ffd23f", "#7f9a8c"][i]}" stroke="#efeadf" stroke-width="4" />
        <text x="100" y="${y + 32}" class="lex6" font-size="27" fill="#efeadf">${n}</text>
        <text x="100" y="${y + 66}" class="lex6" font-size="23" fill="#9fb3a8">${msg}</text>
        <path d="M330 ${y + 58} l10 10 l18 -22 M346 ${y + 58} l10 10 l18 -22" stroke="#9fb3a8" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <text x="392" y="${y + 66}" text-anchor="end" class="mono" font-size="17" fill="#9fb3a8">visto</text>
      </g>`;
export const CSS = `
  $ .s11-shh { position: absolute; left: 70px; top: 650px; font-family: "Caveat", cursive; font-weight: 700; font-size: 96px; color: #ffd23f; transform: rotate(-6deg); white-space: nowrap; }
  $ .s11-sello { left: 590px; top: 1110px; font-size: 64px; background: rgba(17, 24, 21, 0.9); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 860) scale(0.95)"><g class="s11-pj">${malo("s11", { b: "mueca" })}</g></g>
          <g transform="translate(560 660)"><g class="s11-cel">
            <rect class="k" x="0" y="0" width="430" height="640" rx="46" />
            <path class="l" d="M180 30 H250" stroke-width="7" />
            <text x="215" y="96" text-anchor="middle" class="lex6" font-size="26" fill="#efeadf">Tus clientes</text>
            <path d="M30 118 H400" stroke="#efeadf" stroke-width="2" opacity="0.3" />
            ${fila(140, "Lucía", "¿hay mesa hoy?", 0)}
            ${fila(260, "Martín", "¿abren el lunes?", 1)}
            ${fila(380, "Sofía", "¿me reservás?", 2)}
          </g></g>
        </svg>
        <div class="s11-shh">shhh...</div>
        <div class="sello s11-sello">En visto</div>
        <div class="etiqueta s11-et">Derecho a guardar silencio</div>
`;
export const JS = `
      tl.fromTo(q(".s11-pj"), { x: -60, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s11-malo-boca", 0, 1.2, 0.4);
      pop(".s11-et", 0.2);
      pop(".s11-shh", 0.85, 0.4);
      tl.to(q(".s11-shh"), { x: 10, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.25);
      sale(".s11-shh", 1.85);
      // "Total": el celular con los clientes en visto
      entra(".s11-cel", 1.85, 260, 0, 0.35);
      qa(".s11-fila").forEach((f, i) => entra(f, 2.5 + i * 0.25, 40, 0, 0.25));
      hablar(".s11-malo-boca", 1.9, 3.9, 0.4);
      golpe(".s11-sello", 3.4, 2.2);
      tl.set(q(".s11-sello"), { rotation: -7 }, 0);
      sacudon(3.42, 0.6);
`;
export const SFX = [
  { t: 0.85, sfx: "whoosh-short", vol: 0.2 },
  { t: 1.85, sfx: "whoosh", vol: 0.25 },
  { t: 2.5, sfx: "click-soft", vol: 0.25 },
  { t: 2.75, sfx: "click-soft", vol: 0.25 },
  { t: 3.0, sfx: "click-soft", vol: 0.25 },
  { t: 3.38, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
];
