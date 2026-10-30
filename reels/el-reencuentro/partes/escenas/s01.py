from base import escena
from personajes import *
css = '''
    SC .s01-cartel { position: absolute; left: 330px; top: 1052px; width: 420px; height: 250px; background: #fbefe9; border: 6px solid #c99a3c; border-radius: 18px; box-shadow: inset 0 0 0 5px #fbefe9, inset 0 0 0 8px #e3a6ae; }
    SC .s01-ct { left: 0; right: 0; top: 14px; font-size: 58px; line-height: 1; }
    SC .s01-cal { position: absolute; left: 96px; top: 640px; width: 230px; height: 220px; }
    SC .s01-hoja { position: absolute; inset: 0; background: #fbefe9; border: 5px solid #4b2537; border-radius: 14px; overflow: hidden; }
    SC .s01-hoja .cab { position: absolute; left: 0; right: 0; top: 0; height: 64px; background: #c4607a; border-bottom: 5px solid #4b2537; }
    SC .s01-hoja .mes { position: absolute; left: 0; right: 0; top: 10px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; letter-spacing: 0.12em; color: #fbefe9; }
    SC .s01-hoja .dia { position: absolute; left: 0; right: 0; top: 76px; text-align: center; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 110px; line-height: 1; color: #4b2537; }
    SC .s01-pre { position: absolute; left: 760px; top: 630px; width: 230px; height: 270px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 6px; }
    SC .s01-pre .t { left: 0; right: 0; top: 14px; font-size: 40px; }
    SC .s01-pre .m { left: 0; right: 0; top: 196px; font-size: 40px; color: #6f9a6a; }
    SC .s01-pre .rr { position: absolute; left: 26px; right: 26px; height: 4px; background: #e3a6ae; border-radius: 2px; }
'''
cuerpo = f'''
          <g transform="translate(540 905)">{sillon("s01")}</g>
          <g transform="translate(540 800)">{aldo("s01")}</g>
'''
html = f'''
        <div class="s01-cal" data-layout-allow-overlap>
          <div class="s01-hoja h3"><div class="cab"><div class="mes">JULIO</div></div><div class="dia">12</div></div>
          <div class="s01-hoja h2"><div class="cab"><div class="mes">JUNIO</div></div><div class="dia">9</div></div>
          <div class="s01-hoja h1"><div class="cab"><div class="mes">MAYO</div></div><div class="dia">20</div></div>
          <div class="s01-hoja h0"><div class="cab"><div class="mes">MARZO</div></div><div class="dia">3</div></div>
        </div>
        <div class="s01-pre">
          <div class="cartel t">Presupuesto</div>
          <div class="rr" style="top: 80px"></div><div class="rr" style="top: 112px"></div><div class="rr" style="top: 144px; right: 80px"></div>
          <div class="mano m">sillón verde</div>
        </div>
        <div class="s01-cartel">
          <div class="cartel s01-ct">¿La vieron?</div>
          <svg viewBox="0 0 420 250" style="position:absolute;left:0;top:0;width:420px;height:250px;overflow:visible" aria-hidden="true">
            <g transform="translate(210 168) scale(0.52)">{sillon_verde("s01")}</g>
          </svg>
        </div>
        <svg class="lienzo" viewBox="0 0 1080 1920" aria-hidden="true">
          <circle cx="352" cy="1180" r="30" fill="#fbefe9" stroke="#4b2537" stroke-width="5" />
          <circle cx="728" cy="1180" r="30" fill="#fbefe9" stroke="#4b2537" stroke-width="5" />
        </svg>
'''
js = '''
      const ALDO = 0.29, MARZO = 1.48, PIDIO = 2.71, PRESU = 3.2, NUNCA = 4.51, LLAMO = 5.04;
      // cuadro 0: ya está casi todo; la cámara se acerca despacio
      tl.fromTo(q(".escenario"), { scale: 1.06, transformOrigin: "540px 900px" }, { scale: 1, duration: 4.2, ease: "power1.out", transformOrigin: "540px 900px" }, 0);
      tl.fromTo(q(".s01-sillon"), { y: 30 }, { y: 0, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(q(".s01-aldo"), { y: 40 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, 0);
      gsap.set(q(".s01-lagrima"), { opacity: 0 });
      // el cartel sube y se balancea, como en la tele
      tl.fromTo(q(".s01-cartel"), { y: 60, rotation: -6 }, { y: 0, rotation: -2, duration: 0.45, ease: "back.out(1.8)" }, 0);
      tl.to(q(".s01-cartel"), { rotation: 2, duration: 0.7, yoyo: true, repeat: 6, ease: "sine.inOut" }, 0.45);
      // "marzo": el almanaque
      pop(q(".s01-cal"), MARZO - 0.15);
      tl.fromTo(q(".s01-cal"), { rotation: -12 }, { rotation: -5, duration: 0.4, ease: "back.out(2)" }, MARZO - 0.15);
      // "presupuesto": la hoja
      gsap.set(q(".s01-pre"), { opacity: 0 });
      tl.fromTo(q(".s01-pre"), { opacity: 0, x: 160, rotation: 18 }, { opacity: 1, x: 0, rotation: 6, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, PIDIO);
      tl.fromTo(q(".s01-pre"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, PRESU + 0.1);
      // "nunca": pasan los meses
      ["h0", "h1", "h2"].forEach((h, i) => {
        tl.to(q(".s01-hoja." + h), { y: -260, rotation: -30 + i * 10, opacity: 0, duration: 0.3, ease: "power2.in" }, NUNCA - 0.1 + i * 0.22);
      });
      // "llamó": zoom dramático a la cara y la lágrima
      zoom(LLAMO - 0.1, 1.28, 540, 800, 0.4);
      tl.to(q(".s01-cejas"), { y: -6, duration: 0.2 }, LLAMO - 0.1);
      tl.fromTo(q(".s01-lagrima"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.15, immediateRender: false }, LLAMO);
      tl.to(q(".s01-lagrima"), { y: 70, duration: 0.7, ease: "power1.in" }, LLAMO + 0.15);
'''
sfx = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.7}, {"t": 1.35, "sfx": "pop", "vol": 0.3}, {"t": 2.7, "sfx": "whoosh-short", "vol": 0.25}, {"t": 4.4, "sfx": "click-soft", "vol": 0.3}, {"t": 4.62, "sfx": "click-soft", "vol": 0.3}, {"t": 4.84, "sfx": "click-soft", "vol": 0.3}]
escena("s01-busca", css, cuerpo, js, sfx, html)
