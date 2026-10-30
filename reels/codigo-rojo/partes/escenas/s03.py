exec(open("partes/escenas/pj.py").read())
ID = "s03-greys"; DUR = 3.39
CSS = """
    $ .s03-cartel { position: absolute; left: 0; right: 0; margin: 0 auto; top: 470px; width: 860px; text-align: center; }
    $ .s03-noes { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.24em; color: #4fc3b0; }
    $ .s03-greys { position: relative; display: inline-block; margin-top: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; color: #eef6f5; white-space: nowrap; text-transform: uppercase; letter-spacing: -0.02em; }
    $ .s03-sint { left: 600px; top: 900px; background: #ff3341; color: #eef6f5; font-size: 60px; box-shadow: 8px 8px 0 #03171b; transform: rotate(4deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-doc">
            <g transform="translate(140 690) scale(1.2)">
              {doctora("s03")}
              <path class="l s03-brazo" d="M300 420 C370 390 410 330 430 270" stroke-width="22" stroke="#4fc3b0" />
              <g class="s03-mano"><circle cx="436" cy="258" r="26" fill="#eef6f5" stroke="#eef6f5" stroke-width="7" /><path class="l" d="M446 240 L480 196" stroke-width="16" /></g>
            </g>
          </g>
          <path class="s03-tacha" d="M150 590 L930 552" fill="none" stroke="#ff3341" stroke-width="16" stroke-linecap="round" />
        </svg>
        <div class="s03-cartel"><div class="s03-noes">ESTO NO ES</div><div class="s03-greys">Grey's Anatomy</div></div>
        <div class="cartela s03-sint">SÍNTOMAS</div>
"""
JS = """
      const NO = 0.20, GREYS = 0.60, RAPIDO = 1.84, SINT = 2.29;
      tl.fromTo(q(".s03-doc"), { y: 520 }, { y: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      tl.to(q(".s03-doc"), { y: 8, duration: 0.45, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.45);
      habla(".s03-dboca", 0.05, 1.3, "180 292");
      habla(".s03-dboca", RAPIDO, 1.1, "180 292");
      // cejas: una sube (ironía)
      tl.to(q(".s03-dcejas"), { y: -10, duration: 0.15, ease: "back.out(2)" }, GREYS);
      pop(".s03-noes", NO);
      golpe(".s03-greys", GREYS, 2.2);
      dibujar(".s03-tacha", GREYS + 0.45, 0.3);
      sacudon(GREYS + 0.75, 0.8);
      tl.to(q(".s03-cartel"), { opacity: 0.4, duration: 0.2 }, RAPIDO);
      gsap.set(q(".s03-brazo"), { opacity: 0 }); gsap.set(q(".s03-mano"), { opacity: 0 });
      tl.to([q(".s03-brazo"), q(".s03-mano")], { opacity: 1, duration: 0.05 }, RAPIDO);
      tl.fromTo([q(".s03-brazo"), q(".s03-mano")], { rotation: 50, svgOrigin: "300 420" }, { rotation: 0, svgOrigin: "300 420", duration: 0.25, ease: "back.out(2)", immediateRender: false }, RAPIDO);
      golpe(".s03-sint", SINT, 2.2);
      sacudon(SINT + 0.05, 1);
"""
SFX = [{"t": 0.0, "sfx": "whoosh", "vol": 0.25}, {"t": 0.5, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.05, "sfx": "glitch-1", "vol": 0.25, "max": 0.4}, {"t": 1.84, "sfx": "click", "vol": 0.25}, {"t": 2.2, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}]
