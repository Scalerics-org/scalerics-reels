from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-tv { position: absolute; left: 120px; top: 600px; width: 840px; height: 520px; background: #0d1424; border: 10px solid #f4f1e8; border-radius: 30px; box-shadow: 14px 14px 0 #6cc4ff; overflow: hidden; }
    [data-composition-id="%ID%"] .s07-var { position: absolute; left: 26px; top: 22px; padding: 8px 20px 4px; background: #ffd447; border: 5px solid #0d1424; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; color: #0d1424; }
    [data-composition-id="%ID%"] .s07-rev { position: absolute; left: 30px; top: 456px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.14em; color: #e63946; }
    [data-composition-id="%ID%"] .s07-zoom { position: absolute; left: 270px; top: 70px; width: 300px; height: 370px; }
    [data-composition-id="%ID%"] .s07-mini { position: absolute; inset: 0; border-radius: 36px; border: 7px solid #f4f1e8; background: #1b3a6b; }
    [data-composition-id="%ID%"] .s07-noti { position: absolute; left: 18px; right: 18px; top: 60px; padding: 14px 16px 10px; background: #f4f1e8; border: 4px solid #0d1424; border-radius: 18px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 26px; line-height: 1.15; color: #0d1424; }
    [data-composition-id="%ID%"] .s07-noti small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; color: #1b3a6b; }
    [data-composition-id="%ID%"] .s07-hora { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 54px; color: #f4f1e8; }
    [data-composition-id="%ID%"] .s07-mic { left: -60px; top: 1100px; width: 420px; height: 160px; }
    [data-composition-id="%ID%"] .s07-lin { position: absolute; left: 0; right: 0; height: 4px; background: #6cc4ff; opacity: 0.25; }
"""
lineas = "".join(f'<div class="s07-lin" style="top:{y}px"></div>' for y in range(40, 520, 60))
body = f"""
        <div class="s07-tv">{lineas}
          <div class="s07-var">VAR</div><div class="s07-rev">REVISANDO...</div>
          <div class="s07-zoom"><div class="s07-mini"><div class="s07-noti">1 mensaje nuevo<small>clienta · dom 23:00</small></div><div class="s07-hora">23:00</div></div></div>
        </div>
        <div class="obj s07-mic">{mic_mano('s07m', R, 'RADIO')}</div>
"""
js = """
      const VAR = 0.19, PROFE = 0.38, NO = 0.76, REVISASTE = 1.12, CELULAR = 1.81;
      // cuadro 0: la pantalla del VAR prendiéndose
      tl.fromTo(q(".s07-tv"), { scaleY: 0.1, opacity: 0.6 }, { scaleY: 1, opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      golpe(q(".s07-var"), VAR + 0.1, -3, 2.2);
      tl.fromTo(q(".s07-rev"), { opacity: 1 }, { opacity: 0.2, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 9, immediateRender: false }, 0.2);
      qa(".s07-lin").forEach((l, i) => tl.fromTo(l, { x: 0 }, { x: i % 2 ? 30 : -30, duration: 0.1, yoyo: true, repeat: 3, ease: "none", immediateRender: false }, 0.05 + i * 0.02));
      entra(q(".s07-mic"), 0.0, { x: -300 }, 0.35);
      vaiven(q(".s07-mic"), 0.4, 2.2, { y: -10 }, 0.4);
      pop(q(".s07-zoom"), NO - 0.1, 0.3);
      pop(q(".s07-noti"), REVISASTE, 0.3);
      // zoom al celular
      tl.to(q(".s07-zoom"), { scale: 1.25, duration: 0.5, ease: "power2.inOut" }, CELULAR - 0.2);
      tl.fromTo(q(".s07-noti"), { rotation: 0 }, { rotation: 2, duration: 0.1, yoyo: true, repeat: 5, immediateRender: false }, CELULAR);
"""
sfx = [{"t": 0.0, "sfx": "glitch-1", "vol": 0.25, "max": 0.4}, {"t": 0.25, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5},
       {"t": 1.12, "sfx": "notification", "vol": 0.28}, {"t": 1.65, "sfx": "whoosh-short", "vol": 0.2}]
escena("s07-var", p, 2.78, css, body, js, sfx)
