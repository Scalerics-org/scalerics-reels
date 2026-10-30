// Ambiente de todo el reel: luz UV violeta que titila, tubo arriba, cartel de sala y cronómetro rojo
// de segmentos arriba a la derecha (60:00 -> 00:00 hasta "se terminó el tiempo"). En la LUZ (50.6)
// se prende la luz de verdad: flash, el violeta se va, entra luz clara con verde Scalerics. En la
// puerta (67.4) cronómetro verde 00:01; en el CTA vuelve el violeta y el cronómetro en "--:--".
import { seg7 } from "./pj.mjs";
export const ID = "ambiente";
const D = { w: 38, h: 64, t: 9, gap: 10 };
export const CSS = `
  $ .amb-uv { position: absolute; inset: 0; background: radial-gradient(ellipse 760px 1000px at 50% 48%, rgba(155, 92, 255, 0.26), rgba(155, 92, 255, 0) 72%); }
  $ .amb-luz { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 900px 1100px at 50% 45%, rgba(239, 233, 255, 0.16), rgba(239, 233, 255, 0.03) 60%, rgba(239, 233, 255, 0) 80%), radial-gradient(ellipse 600px 700px at 50% 55%, rgba(92, 230, 17, 0.12), rgba(92, 230, 17, 0) 75%); }
  $ .amb-rojo { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 900px 1200px at 50% 50%, rgba(255, 45, 61, 0) 40%, rgba(255, 45, 61, 0.35) 100%); }
  $ .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 760px 1120px at 540px 920px, rgba(8, 4, 15, 0) 55%, rgba(8, 4, 15, 0.88) 100%); }
  $ .amb-tubo { position: absolute; left: 190px; top: 52px; width: 700px; height: 14px; border-radius: 7px; background: #c9a6ff; box-shadow: 0 0 30px 8px rgba(155, 92, 255, 0.8), 0 0 90px 30px rgba(155, 92, 255, 0.35); }
  $ .amb-sala { position: absolute; left: 72px; top: 128px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: #b388ff; white-space: nowrap; }
  $ .amb-sala2 { color: #5ce611; opacity: 0; }
  $ .amb-piso { position: absolute; left: 0; right: 0; top: 1420px; height: 3px; background: rgba(155, 92, 255, 0.35); }
  $ .amb-pinta { position: absolute; left: 700px; top: 1470px; font-family: "Caveat", cursive; font-weight: 700; font-size: 54px; color: #39ffd2; opacity: 0.4; transform: rotate(-6deg); text-shadow: 0 0 18px rgba(57, 255, 210, 0.6); white-space: nowrap; }
  $ .amb-flash { position: absolute; inset: 0; background: #efe9ff; opacity: 0; }
`;
export const HTML = `
        <div class="amb-uv"></div>
        <div class="amb-luz"></div>
        <div class="amb-rojo"></div>
        <div class="amb-vineta"></div>
        <div class="amb-piso"></div>
        <div class="amb-pinta" data-layout-ignore>salida →</div>
        <div class="amb-tubo"></div>
        <div class="amb-sala" data-layout-ignore>SALA 1 · EL DEPÓSITO</div>
        <div class="amb-sala amb-sala2" data-layout-ignore>SALA 1 · ABIERTA</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="amb-rel-r">${seg7("amb-r", { x: 800, y: 104, ...D })}</g>
          <g class="amb-rel-v" opacity="0">${seg7("amb-v", { x: 800, y: 104, ...D, color: "#5ce611", glow: "ledv" })}</g>
        </svg>
        <div class="amb-flash"></div>
`;
export const JS = `
      const LUZ = 50.6, FIN = 46.87, PUERTA = 67.4, CTA = 68.32;
      const tramos = [[0, 3600], [7.59, 3600], [28.2, 2400], [38.84, 600], [FIN, 0]];
      const V = (t) => {
        if (t >= FIN) return 0;
        for (let i = 1; i < tramos.length; i++) {
          const [a, va] = tramos[i - 1], [b, vb] = tramos[i];
          if (t < b) return va + (vb - va) * (t - a) / (b - a);
        }
        return 0;
      };
      reloj("amb-r", (t) => {
        if (t >= CTA) return Math.floor((t - CTA) / 0.5) % 2 ? "    " : "----";
        if (t >= FIN && t < LUZ) return Math.floor((t - FIN) / 0.35) % 2 ? "    " : "0000";
        return mmss(V(t));
      });
      reloj("amb-v", (t) => (t >= PUERTA - 0.3 ? "0001" : "0000"));
      // los dos puntos titilan
      tl.to(qa(".amb-r-dos"), { opacity: 0.15, duration: 0.5, yoyo: true, repeat: Math.floor(LUZ / 0.5) - 1, ease: "steps(1)" }, 0);
      // el tubo UV titila de a ratos
      [[0.6, 0.3], [9.4, 0.2], [21.0, 0.4], [33.2, 0.25], [41.5, 0.5]].forEach(([t, d]) => {
        tl.to(q(".amb-tubo"), { opacity: 0.25, duration: 0.05 }, t);
        tl.to(q(".amb-tubo"), { opacity: 1, duration: 0.05 }, t + d * 0.4);
        tl.to(q(".amb-tubo"), { opacity: 0.4, duration: 0.05 }, t + d * 0.7);
        tl.to(q(".amb-tubo"), { opacity: 1, duration: 0.05 }, t + d);
      });
      // la luz UV respira
      tl.fromTo(q(".amb-uv"), { opacity: 0.75 }, { opacity: 1, duration: 1.6, yoyo: true, repeat: 14, ease: "sine.inOut" }, 0);
      // alarma roja con los minutos y el final
      [[28.2, 1.6], [38.84, 3.0], [45.9, 4.6]].forEach(([t, d]) => {
        const n = Math.round(d / 0.5);
        tl.fromTo(q(".amb-rojo"), { opacity: 0 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
      // LA LUZ
      tl.to(q(".amb-flash"), { opacity: 0.85, duration: 0.04 }, LUZ - 0.05);
      tl.to(q(".amb-flash"), { opacity: 0, duration: 0.5, ease: "power2.out" }, LUZ);
      tl.set(q(".amb-uv"), { opacity: 0 }, LUZ);
      tl.set(q(".amb-luz"), { opacity: 1 }, LUZ);
      tl.set(q(".amb-tubo"), { background: "#ffffff", boxShadow: "0 0 30px 8px rgba(239, 233, 255, 0.8), 0 0 90px 30px rgba(239, 233, 255, 0.3)" }, LUZ);
      tl.set(q(".amb-rel-r"), { opacity: 0 }, LUZ);
      tl.set(q(".amb-pinta"), { opacity: 0 }, LUZ);
      // la puerta: cronómetro verde y cartel ABIERTA
      tl.to(q(".amb-rel-v"), { opacity: 1, duration: 0.2 }, 64.48);
      tl.to(q(".amb-sala"), { opacity: 0, duration: 0.2 }, PUERTA);
      tl.to(q(".amb-sala2"), { opacity: 1, duration: 0.3 }, PUERTA + 0.1);
      // CTA: vuelve el violeta (tu local) y el cronómetro rojo en guiones
      tl.to(q(".amb-rel-v"), { opacity: 0, duration: 0.2 }, CTA);
      tl.to(q(".amb-rel-r"), { opacity: 1, duration: 0.2 }, CTA);
      tl.to(q(".amb-luz"), { opacity: 0, duration: 0.5 }, CTA);
      tl.to(q(".amb-uv"), { opacity: 1, duration: 0.5 }, CTA);
      tl.to(q(".amb-sala2"), { opacity: 0, duration: 0.2 }, CTA);
      tl.to(q(".amb-sala"), { opacity: 1, duration: 0.2 }, CTA + 0.1);
      tl.set(q(".amb-tubo"), { background: "#c9a6ff", boxShadow: "0 0 30px 8px rgba(155, 92, 255, 0.8), 0 0 90px 30px rgba(155, 92, 255, 0.35)" }, CTA);
`;
export const SFX = [];
