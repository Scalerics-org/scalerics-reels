// s15-cta: Mostranos tu caja: ¿cuántos post-its tiene? Te leemos en los comentarios.
import { escena, duracion, postit, caja, COL } from "./comun.mjs";
const id = "s15-cta", dur = duracion(id);
const ps = [[250, 1250, "y", -10], [430, 1230, "r", 6], [650, 1240, "c", -5], [830, 1260, "y", 9], [350, 1400, "c", 4], [740, 1410, "r", -8]];



const svg = `
  ${caja({ id: "s15-caja", x: 540, y: 1500, s: 1.0, pantalla: "TU CAJA" })}
  ${ps.map(([x, y, col, rot], i) => postit({ id: "s15-p s15-p" + i, x, y, s: 0.36, col, rot, cara: i % 2 ? "sorpresa" : "serio" })).join("")}
`;
const html = `
  <div class="mk s15-most">Mostranos tu caja</div>
  <div class="mk s15-cuantos">¿cuántos tiene?</div>
  <div class="s15-glob"><span class="s15-d"></span><span class="s15-d"></span><span class="s15-d"></span><b>Te leemos</b></div>`;
const css = `
  P .s15-most { left: 0; right: 0; text-align: center; top: 600px; font-size: 128px; color: ${COL.y}; transform: rotate(-3deg); }
  P .s15-cuantos { left: 0; right: 0; text-align: center; top: 740px; font-size: 96px; color: ${COL.papel}; }
  P .s15-glob { position: absolute; left: 330px; top: 880px; display: flex; align-items: center; gap: 12px; padding: 20px 30px; border-radius: 40px 40px 40px 8px; background: ${COL.verde}; border: 5px solid ${COL.ink}; }
  P .s15-d { width: 18px; height: 18px; border-radius: 50%; background: ${COL.ink}; display: inline-block; }
  P .s15-glob b { margin-left: 10px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 60px; color: ${COL.ink}; white-space: nowrap; }
`;
const js = `
      const MOST = 0, CAJA = 0.55, CUANT = 1.24, POST = 1.55, TIENE = 1.82, TE = 2.27, LEEMOS = 2.64, COM = 3.27;
      tl.fromTo(q(".s15-caja"), { y: 60, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      gsap.set(q(".s15-most"), { opacity: 0 });
      tl.fromTo(q(".s15-most"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.05);
      tl.to(q(".s15-caja"), { y: -12, duration: 0.1, yoyo: true, repeat: 1 }, CAJA);
      gsap.set(q(".s15-cuantos"), { opacity: 0 });
      tl.fromTo(q(".s15-cuantos"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, CUANT);
      qa(".s15-p").forEach((el, i) => pega(".s15-p" + i, POST + i * 0.09, { rot: i % 2 ? 12 : -12 }));
      // te leemos: globo de comentario escribiendo
      pop(".s15-glob", TE, { desde: 0.5 });
      qa(".s15-d").forEach((d, i) => tl.fromTo(d, { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, TE + 0.2 + i * 0.1));
      tl.to(q(".s15-glob"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, COM);
      // que nada quede quieto hasta el final
      respira(".s15-most", 1.0, DUR - 1.4, 8, 0.6);
      balancea(".s15-p", COM, DUR - COM - 0.3, 3, 0.4);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "pop", vol: 0.3 },
  { t: 1.24, sfx: "click", vol: 0.25 },
  { t: 1.6, sfx: "pop", vol: 0.22 }, { t: 1.9, sfx: "pop", vol: 0.22 },
  { t: 2.27, sfx: "notification", vol: 0.32 },
  { t: 3.3, sfx: "chime", vol: 0.28 },
] });
