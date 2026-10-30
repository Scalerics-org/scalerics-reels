export const ID = "s10-avisos";
const nombres = ["Marta", "Rubén", "Lucía", "Pocho", "Sofi"];
export const CSS = `
  $ .s10-dem { top: 590px; font-size: 104px; }
  $ .s10-dem span { color: #ffd60a; font-size: 150px; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
  $ .s10-fila { position: absolute; left: 110px; width: 860px; height: 92px; }
  $ .s10-av { position: absolute; left: 0; top: 4px; width: 84px; height: 84px; border-radius: 50%; border: 6px solid #f2f2f2; background: #2f6bff; color: #f2f2f2; text-align: center; line-height: 72px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; }
  $ .s10-nom { position: absolute; left: 104px; top: 22px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 40px; color: #f2f2f2; }
  $ .s10-msj { position: absolute; left: 290px; top: 8px; height: 76px; padding: 0 26px; border-radius: 24px; background: #21a366; color: #f2f2f2; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; line-height: 76px; white-space: nowrap; }
  $ .s10-tilde { position: absolute; left: 720px; top: 18px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; color: #ffd60a; }
  $ .s10-falta { position: absolute; left: 290px; top: 8px; height: 76px; width: 400px; border-radius: 24px; border: 4px dashed rgba(242,242,242,0.35); }
`;
export const HTML = `
        <div class="txt s10-dem">Demanda <span>4</span></div>
        ${nombres.map((n, i) => `<div class="s10-fila s10-f${i}" style="top:${830 + i * 112}px"><div class="s10-av">${n[0]}</div><div class="s10-nom">${n}</div><div class="s10-falta"></div><div class="s10-msj">Tu pedido está listo</div><div class="s10-tilde">OK</div></div>`).join("")}
`;
export const JS = `
      const AVISALE = 0.96, CLIENTE = 2.0, LISTO = 3.5, UNO = 4.95, POR = 5.54, UNO2 = 5.7;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s10-dem"), { opacity: 0.5, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.1, 1);
      gsap.set(qa(".s10-msj, .s10-tilde"), { opacity: 0 });
      // "avisale a cada cliente": aparecen los clientes, uno abajo del otro
      qa(".s10-fila").forEach((f, i) => entra(f, AVISALE + i * 0.16, -80, 0, 0.25));
      tl.to(qa(".s10-av"), { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1, stagger: 0.06 }, CLIENTE);
      // el mensaje se escribe a mano y se manda, de a uno (lento a propósito)
      const ENVIOS = [LISTO - 0.2, UNO, POR, UNO2 + 0.1, 6.05];
      ENVIOS.forEach((t, i) => {
        const f = q(".s10-f" + i);
        tl.fromTo(f.querySelector(".s10-msj"), { opacity: 1, clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: i ? 0.22 : 0.6, ease: "none", immediateRender: false }, t);
        pop(f.querySelector(".s10-tilde"), t + (i ? 0.22 : 0.6), 0.2);
      });
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.96, sfx: "whoosh-short", vol: 0.22 },
  { t: 3.3, sfx: "typing", vol: 0.3, max: 0.6 },
  { t: 4.1, sfx: "notification", vol: 0.25 },
  { t: 5.17, sfx: "notification", vol: 0.25 },
  { t: 5.76, sfx: "notification", vol: 0.25 },
  { t: 6.02, sfx: "notification", vol: 0.25 },
  { t: 6.27, sfx: "notification", vol: 0.22 },
];
