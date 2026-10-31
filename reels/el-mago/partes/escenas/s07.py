ID = "s07-sierra"; DUR = 3.12
CSS = """
    $ .s07-tit { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 96px; line-height: 0.95; color: #e6e8f0; text-transform: uppercase; }
    $ .s07-tit i { font-style: normal; color: #ff4fa3; text-shadow: 0 0 26px rgba(255, 79, 163, 0.55); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s07", "", 540, 1440, 440, 70, 540) + """
          """ + CAJA("s07", "s07-c", 560, 1120, 1.0) + """
          """ + SIERRA("s07", "s07-s", 560, 860, 1.0, 90) + """
          """ + DESTELLOS("s07", "s07-d", [(200, 960, 26), (900, 960, 30), (560, 1300, 18)], "#ff4fa3") + """
        </svg>
        <div class="s07-tit">La mujer<br><i>cortada</i> al medio</div>
"""
JS = """
      const MUJER = 0.18, CORTADA = 0.99, MEDIO = 1.79;
      tl.fromTo(q(".s07-c"), { scale: 0.85, svgOrigin: "560 1120", opacity: 0.5 }, { scale: 1, svgOrigin: "560 1120", opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      habla(".s07-caja-boca", MUJER, 0.6, "-352 20");
      golpe(".s07-tit", MUJER + 0.1, 2.0);
      tl.to(q(".s07-tit"), { opacity: 0, y: -60, duration: 0.2 }, CORTADA - 0.4);
      // la sierra baja, serruchando
      gsap.set(q(".s07-s"), { opacity: 0 });
      tl.fromTo(q(".s07-s"), { opacity: 1, y: -500 }, { opacity: 1, y: -160, duration: 0.35, ease: "power3.out", immediateRender: false }, CORTADA - 0.3);
      for (let k = 0; k < 6; k++) tl.to(q(".s07-s"), { y: -160 + (k + 1) * 30 + (k % 2 ? -40 : 40), duration: 0.12, ease: "sine.inOut" }, CORTADA + k * 0.13);
      tl.to(q(".s07-s"), { y: 60, duration: 0.15, ease: "power2.in" }, MEDIO - 0.1);
      sacudon(MEDIO + 0.05, 1.2);
      tl.to(q(".s07-caja-izq"), { x: -50, duration: 0.3, ease: "back.out(2)" }, MEDIO + 0.15);
      tl.to(q(".s07-caja-der"), { x: 50, duration: 0.3, ease: "back.out(2)" }, MEDIO + 0.15);
      destello(".s07-d path", MEDIO + 0.15, 2);
"""
SFX = [{"t": 0.15, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 0.75, "sfx": "whoosh", "vol": 0.25}, {"t": 1.0, "sfx": "glitch-2", "vol": 0.2, "max": 0.7}, {"t": 1.8, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.6}, {"t": 2.0, "sfx": "sparkle", "vol": 0.28}]
