ID = "s10-respuesta"; DUR = 4.45
CSS = """
    $ .s10-m { position: absolute; padding: 16px 22px 12px; border: 5px solid #111111; border-radius: 24px; font-family: "Comic Neue", sans-serif; font-weight: 700; font-size: 38px; line-height: 1.12; color: #111111; }
    $ .s10-m small { display: block; margin-top: 6px; text-align: right; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; color: #2f6fe0; }
    $ .s10-cli { left: 290px; top: 760px; width: 420px; background: #fdf6e3; }
    $ .s10-a1 { left: 370px; top: 960px; width: 420px; background: #ffd23f; }
    $ .s10-a2 { left: 330px; top: 1120px; width: 460px; background: #ffd23f; }
    $ .s10-esc { position: absolute; left: 290px; top: 960px; padding: 12px 22px; background: #fdf6e3; border: 5px solid #111111; border-radius: 24px; font-family: "Lexend"; font-weight: 700; font-size: 34px; color: #2f6fe0; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s10") + """
          """ + RAYOS("s10", "s10-rayos", 540, 1050, 44, 300, 1100, "#ffd23f", 8, 0.5) + """
          """ + CELU_GRANDE("s10", "s10-cel", 250, 560, 580, 900) + """
        </svg>
        <div class="s10-m s10-cli">¿Tienen la torta de chocolate para mañana?<small>23:02</small></div>
        <div class="s10-esc">escribiendo...</div>
        <div class="s10-m s10-a1">¡Hola! Sí, tenemos la de <b>chocolate</b>.<small>23:02</small></div>
        <div class="s10-m s10-a2">¿Te la <b>reservo</b> para mañana a las 10?<small>23:02</small></div>
        """ + ONO("s10-al", "¡AL INSTANTE!", 120, 1380, 120, "#ffd23f", -6, 840) + """
"""
JS = """
      const HOLA = 0.0, SI = 0.73, TE = 2.53, DIEZ = 3.74;
      entra(".s10-cel", 0, { y: 400 }, 0.3);
      tl.fromTo(q(".s10-rayos"), { rotation: 0, svgOrigin: "540 1050" }, { rotation: 10, svgOrigin: "540 1050", duration: DUR, ease: "none" }, 0);
      entra(".s10-cli", 0.05, { y: 400 }, 0.3);
      pop(".s10-esc", 0.15);
      tl.to(q(".s10-esc"), { opacity: 0, duration: 0.08 }, 0.5);
      gsap.set(q(".s10-a1"), { opacity: 0 }); gsap.set(q(".s10-a2"), { opacity: 0 });
      tl.fromTo(q(".s10-a1"), { opacity: 0, scale: 0.5, transformOrigin: "100% 0%" }, { opacity: 1, scale: 1, transformOrigin: "100% 0%", duration: 0.28, ease: "back.out(2)", immediateRender: false }, 0.5);
      golpe(".s10-al", SI, 2.2);
      sacudon(SI + 0.05, 0.8);
      tl.fromTo(q(".s10-a2"), { opacity: 0, scale: 0.5, transformOrigin: "100% 0%" }, { opacity: 1, scale: 1, transformOrigin: "100% 0%", duration: 0.28, ease: "back.out(2)", immediateRender: false }, TE - 0.1);
      late(".s10-al", 1.2, 4, 1.05, 0.15);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.2, "sfx": "key-press", "vol": 0.3}, {"t": 0.5, "sfx": "notification", "vol": 0.35}, {"t": 0.75, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}, {"t": 2.43, "sfx": "notification", "vol": 0.3}]
