exec(open("partes/escenas/pj.py").read())
ID = "s09-house"; DUR = 5.83
CSS = """
    $ .s09-dr { left: 70px; top: 470px; background: #0b2e35; color: #4fc3b0; border: 5px solid #4fc3b0; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.2em; }
    $ .s09-mien { left: 0; right: 0; top: 566px; font-size: 104px; color: #eef6f5; text-shadow: 8px 8px 0 #ff3341; }
    $ .s09-globo { position: absolute; left: 430px; top: 830px; padding: 22px 30px 18px; border-radius: 34px 34px 8px 34px; background: #9fe3ff; color: #03171b; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; white-space: nowrap; }
    $ .s09-sello { left: 520px; top: 980px; color: #ff3341; border: 10px solid #ff3341; border-radius: 16px; background: rgba(3, 23, 27, 0.85); font-size: 86px; padding: 16px 22px 8px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-doc"><g transform="translate(40 760) scale(1.15)">{doctora("s09")}</g></g>
        </svg>
        <div class="cartela s09-dr">COMO DIRÍA EL DR. HOUSE</div>
        <div class="txt s09-mien" style="position:absolute">TODOS MIENTEN</div>
        <div class="s09-globo">"Te contesto el lunes"</div>
        <div class="cartela s09-sello">MENTIRA</div>
"""
JS = """
      const HOUSE = 0.86, TODOS = 1.55, MIENTEN = 2.00, Y = 3.01, DIJO = 3.33, LUNES = 4.57;
      tl.fromTo(q(".s09-doc"), { x: -300, rotation: -4, svgOrigin: "250 1360" }, { x: 0, rotation: 0, svgOrigin: "250 1360", duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.to(q(".s09-doc"), { y: 8, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.4);
      habla(".s09-dboca", 0.05, 2.4, "180 292");
      habla(".s09-dboca", Y, 1.9, "180 292");
      // los ojos miran de reojo y una ceja sube
      tl.to(qa(".s09-dojos"), { x: 14, duration: 0.15 }, HOUSE);
      tl.to(q(".s09-dcejas"), { y: -8, rotation: -6, svgOrigin: "180 202", duration: 0.2, ease: "back.out(2)" }, TODOS);
      pop(".s09-dr", 0.15, { transformOrigin: "0% 50%" });
      golpe(".s09-mien", TODOS, 2.4);
      sacudon(MIENTEN, 1);
      tl.to(q(".s09-mien"), { opacity: 0.3, scale: 0.85, y: -20, duration: 0.3 }, Y - 0.1);
      pop(".s09-globo", DIJO, { transformOrigin: "100% 100%" });
      gsap.set(q(".s09-sello"), { opacity: 0 });
      tl.fromTo(q(".s09-sello"), { opacity: 0, scale: 2.6, rotation: -26 }, { opacity: 1, scale: 1, rotation: -10, duration: 0.15, ease: "power4.in", immediateRender: false }, LUNES);
      sacudon(LUNES + 0.15, 1.3);
"""
SFX = [{"t": 0.15, "sfx": "click", "vol": 0.25}, {"t": 1.5, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 3.33, "sfx": "pop", "vol": 0.25}, {"t": 4.7, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.6}]
