import { planilla, burbuja } from "./pj.mjs";
export const ID = "s03-demanda";
const burb = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => burbuja(`s03-b s03-b${i}`, 40 + (i % 2) * 660, 1120 + (i % 3) * 36, 340, i % 2 ? "Quiero 2 docenas" : "Hola, ¿tenés...?", "#f2f2f2")).join("");
export const CSS = `
  $ .s03-reloj { position: absolute; left: 50%; top: 1250px; width: 400px; margin-left: -200px; padding: 14px 0 10px; text-align: center; border: 6px solid #ff3b3b; border-radius: 16px; background: #0a0d14; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 96px; color: #ff3b3b; line-height: 1; text-shadow: 0 0 24px rgba(255,59,59,0.6); }
  $ .s03-cuarenta { top: 1262px; font-size: 118px; color: #ffd60a; text-shadow: 0 0 30px rgba(255,214,10,0.4); }
  $ .s03-uno { position: absolute; top: 1400px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: #f2f2f2; text-transform: uppercase; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(156 600) scale(1.2)"><g class="s03-pl">${planilla("s03")}</g></g>
          <rect class="s03-llena" x="233" y="690" width="138" height="92" fill="#21a366" opacity="0" />
          <rect class="s03-llena" x="371" y="690" width="138" height="92" fill="#21a366" opacity="0" />
          <rect class="s03-llena" x="509" y="690" width="138" height="92" fill="#21a366" opacity="0" />
          ${burb}
        </svg>
        <div class="s03-reloj">23:59</div>
        <div class="txt s03-cuarenta">40 pedidos</div>
        <div class="s03-uno s03-u1" style="left:150px">Uno.</div>
        <div class="s03-uno s03-u2" style="left:440px">Por.</div>
        <div class="s03-uno s03-u3" style="left:700px">Uno.</div>
`;
export const JS = `
      const MEDIA = 1.9, PASAME = 3.0, CUARENTA = 3.6, UNO = 5.86, POR = 6.43, UNO2 = 6.6;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 45%" }, 0);
      // la planilla aparece de golpe, como pantalla que se enciende
      tl.fromTo(q(".s03-pl"), { opacity: 0.4, scaleY: 0.05, transformOrigin: "50% 50%" }, { opacity: 1, scaleY: 1, transformOrigin: "50% 50%", duration: 0.22, ease: "power4.out" }, 0);
      hablar(".s03-pl-boca", 0.05, 2.7, 0.2);
      hablar(".s03-pl-boca", 3.0, 5.3, 0.2);
      hablar(".s03-pl-boca", 5.86, 7.0, 0.15, 0.2);
      tl.to(qa(".s03-pl-pupila"), { x: 22, duration: 0.3, ease: "power2.inOut" }, 0.8);
      tl.to(qa(".s03-pl-pupila"), { x: -22, duration: 0.3, ease: "power2.inOut" }, 3.1);
      tl.to(qa(".s03-pl-pupila"), { x: 0, duration: 0.3, ease: "power2.inOut" }, 5.6);
      parpadeo(".s03-pl-ojo", 2.6);
      tl.to(qa(".s03-pl-ceja"), { y: -10, duration: 0.12, yoyo: true, repeat: 1 }, MEDIA);
      // medianoche: reloj rojo
      pop(".s03-reloj", MEDIA - 0.05, 0.3);
      tl.to(q(".s03-reloj"), { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 3, ease: "steps(1)" }, MEDIA + 0.4);
      tl.to(q(".s03-reloj"), { opacity: 0, y: -40, duration: 0.2 }, PASAME + 0.4);
      // pasame los cuarenta pedidos: burbujas que vuelan a la planilla
      qa(".s03-b").forEach((b, i) => {
        const t = PASAME + i * 0.22;
        tl.fromTo(b, { opacity: 0, x: (i % 2 ? 200 : -200), y: 0, scale: 1, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, duration: 0.18, ease: "power2.out", immediateRender: false }, t);
        tl.to(b, { x: (i % 2 ? -220 : 220), y: -280, scale: 0.25, opacity: 0, duration: 0.4, ease: "power2.in" }, t + 0.25);
      });
      gsap.set(qa(".s03-b"), { opacity: 0 });
      golpe(".s03-cuarenta", CUARENTA, 2.4);
      sacudon(CUARENTA + 0.05);
      // uno por uno: las celdas se llenan de a una
      golpe(".s03-u1", UNO, 2);
      golpe(".s03-u2", POR, 2);
      golpe(".s03-u3", UNO2 + 0.05, 2);
      qa(".s03-llena").forEach((c, i) => tl.to(c, { opacity: 0.85, duration: 0.05 }, [UNO, POR, UNO2 + 0.05][i]));
      tl.to(qa(".s03-u3"), { color: "#ffd60a", duration: 0.1 }, UNO2 + 0.3);
`;
export const SFX = [
  { t: 0.0, sfx: "glitch-2", vol: 0.3, max: 0.5 },
  { t: 0.1, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 1.85, sfx: "ping", vol: 0.3 },
  { t: 3.0, sfx: "notification", vol: 0.28 },
  { t: 3.45, sfx: "notification", vol: 0.25 },
  { t: 3.55, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 5.8, sfx: "key-press", vol: 0.4 },
  { t: 6.38, sfx: "key-press", vol: 0.4 },
  { t: 6.6, sfx: "key-press", vol: 0.45 },
];
