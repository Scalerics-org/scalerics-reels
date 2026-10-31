from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-tax { left: 290px; top: 830px; }
    [data-composition-id="%ID%"] .s01-ese { left: 0; right: 0; top: 560px; text-align: center; font-size: 40px; color: #ffc81a; letter-spacing: 0.3em; }
    [data-composition-id="%ID%"] .s01-no { top: 620px; font-size: 158px; }
    [data-composition-id="%ID%"] .s01-sello { left: 560px; top: 1090px; color: #ff3b30; font-size: 74px; }
    [data-composition-id="%ID%"] .s01-busca { position: absolute; left: 28px; right: 28px; top: 90px; height: 84px; border-radius: 42px; border: 5px solid #0b0f1a; background: #fff; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; line-height: 74px; padding-left: 70px; color: #0b0f1a; white-space: nowrap; }
    [data-composition-id="%ID%"] .s01-lupa { position: absolute; left: 22px; top: 20px; width: 34px; height: 34px; border: 6px solid #0b0f1a; border-radius: 50%; }
    [data-composition-id="%ID%"] .s01-nada { position: absolute; left: 0; right: 0; top: 470px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.08em; color: #ff3b30; }
    [data-composition-id="%ID%"] .s01-pin { position: absolute; left: 70px; top: 200px; width: 230px; height: 260px; }
"""
pant = f'''<div class="s01-busca"><div class="s01-lupa"></div>tu local</div>
  <svg class="s01-pin" viewBox="-115 -150 230 260">{pin(R, 0, 60, 1.1)}</svg>
  <div class="s01-nada">SIN RESULTADOS</div>'''
body = f"""
        <div class="fig s01-tax">{taxista('s01t')}</div>
        {celular('s01-cel', 360, 640, pant, 640, 760)}
        <div class="mono s01-ese">ESE LOCAL</div>
        <div class="big r s01-no">NO EXISTE</div>
        <div class="sello s01-sello">NO EXISTE</div>
"""
js = """
      const NO = 0.55, SENORA = 1.18, SI = 2.13, CEL = 2.64, NO2 = 3.37;
      const tax = q(".s01-tax");
      // cuadro 0: el taxista ya está, con el mate, a media luz
      gsap.set(tax, { opacity: 0.6, scale: 0.96, transformOrigin: "50% 100%" });
      tl.to(tax, { opacity: 1, scale: 1.12, duration: 0.6, ease: "power2.out" }, 0);
      habla(".s01t-boca", 0.05, 4.3, "250 388");
      traqueteo(tax, 0.6, 4);
      pop(q(".s01-ese"), 0.05, 0.3);
      golpe(q(".s01-no"), NO + 0.08, -4, 3);
      sacudon(NO + 0.1, 1.4);
      // "señora": levanta el dedo
      tl.set(q(".s01t-dedo"), { opacity: 1 }, SENORA - 0.05);
      tl.fromTo(q(".s01t-dedo"), { y: 120 }, { y: 0, duration: 0.22, ease: "back.out(2)", immediateRender: false }, SENORA - 0.05);
      tl.to(q(".s01t-dedo"), { rotation: 8, svgOrigin: "372 640", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, SENORA + 0.2);
      // el celular
      tl.to([q(".s01-ese"), q(".s01-no")], { y: -20, scale: 0.85, opacity: 0.3, duration: 0.25 }, SI);
      tl.to(tax, { x: -200, duration: 0.35, ease: "power3.inOut" }, SI);
      gsap.set(q(".s01-cel"), { opacity: 0 });
      tl.fromTo(q(".s01-cel"), { opacity: 0, y: 260, rotation: 10 }, { opacity: 1, y: 0, rotation: 4, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, CEL - 0.25);
      tl.fromTo(q(".s01-pin"), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "bounce.out", immediateRender: false }, CEL + 0.1);
      tl.to(q(".s01-pin"), { rotation: 12, transformOrigin: "50% 80%", duration: 0.1, yoyo: true, repeat: 5 }, CEL + 0.45);
      pop(q(".s01-nada"), CEL + 0.35, 0.25);
      golpe(q(".s01-sello"), NO2 + 0.1, -12, 3);
      sacudon(NO2 + 0.12, 1.6);
      tl.to(q(".s01-no"), { opacity: 1, scale: 1.05, y: 0, duration: 0.15 }, NO2 + 0.1);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.7}, {"t": 0.5, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7},
       {"t": 1.15, "sfx": "click", "vol": 0.25}, {"t": 2.4, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.75, "sfx": "pop", "vol": 0.3},
       {"t": 3.0, "sfx": "error", "vol": 0.25, "max": 0.7}, {"t": 3.4, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.7}]
escena("s01-gancho", p, 4.65, css, body, js, sfx)
