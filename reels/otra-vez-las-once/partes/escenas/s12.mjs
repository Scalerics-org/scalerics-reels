export const ID = "s12-flujos";
const F = [
  ["Pedido de WhatsApp", "Planilla"],
  ["Pedido listo", "Aviso al cliente"],
  ["Venta en el local", "Stock al día"],
  ["Fin del día", "Reporte al celular"],
];
export const CSS = `
  $ .s12-fila { position: absolute; left: 60px; width: 960px; height: 140px; }
  $ .s12-a, $ .s12-b { position: absolute; top: 26px; height: 88px; padding: 0 22px; border-radius: 18px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; line-height: 88px; white-space: nowrap; }
  $ .s12-a { left: 0; border: 5px solid #f4efe4; color: #f4efe4; background: #0f2347; }
  $ .s12-b { right: 90px; border: 5px solid #5ce611; color: #050b18; background: #5ce611; }
  $ .s12-fila svg.s12-ok { position: absolute; left: auto; right: 0; top: 34px; width: 72px; height: 72px; }
  $ .s12-fila svg.s12-fl { position: absolute; left: 0; top: 0; width: 960px; height: 140px; overflow: visible; }
  $ .s12-solo { position: absolute; left: 0; right: 0; top: 1240px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.3em; color: #5ce611; }
`;
export const HTML = `
        ${F.map(([a, b], i) => `<div class="s12-fila s12-f${i}" style="top:${650 + i * 150}px">
          <svg class="s12-fl" viewBox="0 0 960 140" aria-hidden="true"><path class="sl s12-flecha" d="M${a.length * 19 + 70} 70 H${960 - 120 - b.length * 20 - 40}" stroke-dasharray="4 18" /></svg>
          <div class="s12-a">${a}</div><div class="s12-b">${b}</div>
          <svg class="s12-ok" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="30" fill="none" stroke="#5ce611" stroke-width="6" /><path class="sl s12-tilde" d="M22 37 L32 47 L51 26" stroke-width="7" /></svg>
        </div>`).join("")}
        <div class="s12-solo">SOLO · MIENTRAS VOS VIVÍS</div>
`;
export const JS = `
      const T = [0.0, 2.09, 3.48, 5.18];
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      T.forEach((t, i) => {
        const f = ".s12-f" + i;
        entra(q(f + " .s12-a"), t + (i ? -0.05 : 0), -80, 0, 0.25);
        // los puntitos del flujo corren solos
        const fl = q(f + " .s12-flecha");
        gsap.set(fl, { opacity: 0 });
        tl.set(fl, { opacity: 1 }, t + 0.25);
        tl.fromTo(fl, { strokeDashoffset: 0 }, { strokeDashoffset: -220, duration: DUR - t - 0.25, ease: "none", immediateRender: false }, t + 0.25);
        pop(q(f + " .s12-b"), t + 0.55, 0.28);
        pop(q(f + " .s12-ok"), t + 0.8, 0.25);
        dibujar(q(f + " .s12-tilde"), t + 0.85, 0.3);
      });
      entra(".s12-solo", 6.0, 0, 30, 0.3);
`;
export const SFX = [
  { t: 0.55, sfx: "pop", vol: 0.3 },
  { t: 0.85, sfx: "ping", vol: 0.3 },
  { t: 2.64, sfx: "pop", vol: 0.3 },
  { t: 2.94, sfx: "ping", vol: 0.3 },
  { t: 4.03, sfx: "pop", vol: 0.3 },
  { t: 4.33, sfx: "ping", vol: 0.3 },
  { t: 5.73, sfx: "pop", vol: 0.3 },
  { t: 6.03, sfx: "chime", vol: 0.3 },
];
