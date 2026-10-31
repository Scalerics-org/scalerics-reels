ID = "s04-torta"; DUR = 4.39
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s04-htp)" />
            """ + RAYOS("s04", "s04-rayos", 760, 900, 30, 200, 900, "#ffd23f", 8, 0.5) + """
            <g class="s04-cli"><g transform="translate(40 860) scale(1.15)">""" + CLIENTA("s04") + """</g></g>
            <g class="s04-torta"><g transform="translate(620 950) scale(1.1)">""" + TORTA("s04", "s04-t") + """</g></g>
"""
CSS = """
    $ .s04-msj { position: absolute; left: 470px; top: 620px; width: 520px; padding: 22px 26px 18px; background: #fdf6e3; border: 6px solid #111111; border-radius: 26px; box-shadow: 10px 10px 0 #111111; font-family: "Comic Neue", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.1; color: #111111; }
    $ .s04-msj small { display: block; margin-top: 10px; text-align: right; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; color: #2f6fe0; }
    $ .s04-feliz { position: absolute; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s04") + VINETA("s04", "s04-v", 60, 560, 960, 940, "#fdf6e3", DENTRO) + """</svg>
        <div class="s04-msj">Hola, ¿tienen la <b style="color:#e63946">torta de chocolate</b> para mañana?<small>23:02</small></div>
        """ + ONO("s04-cumple", "¡ES EL CUMPLE!", 420, 1340, 92, "#ffd23f", -5) + """
"""
JS = """
      const HOLA = 0.0, TIENEN = 0.26, TORTA = 1.13, CUMPLE = 3.05;
      entra(".s04-cli", 0, { x: -300 }, 0.35);
      habla(".s04-boca", 0.0, 2.2, "181 290");
      tl.fromTo(q(".s04-cbrazo"), { rotation: 0, svgOrigin: "300 470" }, { rotation: -10, svgOrigin: "300 470", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.3);
      gsap.set(q(".s04-msj"), { opacity: 0 });
      tl.fromTo(q(".s04-msj"), { opacity: 0, scale: 0.4, x: -120, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, x: 0, transformOrigin: "0% 100%", duration: 0.3, ease: "back.out(2)", immediateRender: false }, TIENEN);
      gsap.set(q(".s04-torta"), { opacity: 0 });
      tl.fromTo(q(".s04-torta"), { opacity: 0, y: 200, scale: 0.6, svgOrigin: "785 1270" }, { opacity: 1, y: 0, scale: 1, svgOrigin: "785 1270", duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, TORTA);
      tl.fromTo(q(".s04-t-llama"), { scaleY: 1, svgOrigin: "150 92" }, { scaleY: 1.25, svgOrigin: "150 92", duration: 0.12, yoyo: true, repeat: 21, ease: "sine.inOut" }, TORTA + 0.3);
      tl.fromTo(q(".s04-rayos"), { rotation: 0, svgOrigin: "760 900" }, { rotation: 10, svgOrigin: "760 900", duration: DUR, ease: "none" }, 0);
      golpe(".s04-cumple", CUMPLE, 2.0);
      late(".s04-cumple", CUMPLE + 0.2, 2, 1.06, 0.14);
      respira(".s04-cli", 1.0, 3.0, 6, 0.4);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.28, "sfx": "notification", "vol": 0.35}, {"t": 1.15, "sfx": "pop", "vol": 0.3}, {"t": 3.02, "sfx": "sparkle", "vol": 0.28}, {"t": 3.05, "sfx": "impact-bass-1", "vol": 0.28, "max": 0.5}]
