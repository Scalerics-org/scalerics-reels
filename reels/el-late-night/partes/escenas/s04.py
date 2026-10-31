ID = "s04-pregunta"; DUR = 2.77
CSS = """
    $ .s04-q { position: absolute; left: 80px; top: 600px; width: 920px; padding: 26px 30px 22px; text-align: center; background: #fff1dc; border-radius: 26px; transform: rotate(-3deg); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 74px; line-height: 1.05; color: #0b1330; box-shadow: 0 10px 0 #ffb547; }
    $ .s04-q b { color: #ff3d6e; }
    $ .s04-arr { position: absolute; left: 80px; top: 620px; font-family: "Caveat", cursive; font-weight: 700; font-size: 90px; color: #ffb547; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s04", "s04-h", 500, 500, 60, 700, 520, 1500, "#ffb547") + """
          <g class="s04-nico"><g transform="translate(200 840) scale(1.5)">""" + NICO("s04") + """</g></g>
          """ + ESCRITORIO("s04", -40, 1420, 1160, 300, taza=False) + """
        </svg>
        <div class="s04-arr">Arranquemos...</div>
        <div class="s04-q">¿A QUÉ HORA TE <b>ACOSTASTE</b> ANOCHE?</div>
"""
JS = """
      const PREG = 1.1, ACOSTASTE = 1.43;
      tl.fromTo(q(ESC), { scale: 1, transformOrigin: "45% 55%" }, { scale: 1.1, transformOrigin: "45% 55%", duration: 2.7, ease: "sine.inOut", immediateRender: false }, 0);
      habla(".s04-boca", 0, 2.1, "180 284");
      pop(".s04-arr", 0.05, { rotation: -6 });
      tl.to(q(".s04-arr"), { opacity: 0, y: -30, duration: 0.2 }, PREG - 0.2);
      tl.fromTo(q(".s04-cejas"), { y: 0 }, { y: -14, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, PREG);
      tl.fromTo(q(".s04-brazo"), { rotation: 0, svgOrigin: "300 470" }, { rotation: -22, svgOrigin: "300 470", duration: 0.25, ease: "back.out(2)", immediateRender: false }, PREG - 0.1);
      golpe(".s04-q", PREG, 1.8);
      tl.fromTo(q(".s04-q b"), { color: "#0b1330" }, { color: "#ff3d6e", duration: 0.05, immediateRender: false }, ACOSTASTE);
      tl.fromTo(q(".s04-q"), { rotation: -3 }, { rotation: 2, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ACOSTASTE);
"""
SFX = [{"t": 0.05, "sfx": "pop", "vol": 0.25}, {"t": 1.0, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.5}]
