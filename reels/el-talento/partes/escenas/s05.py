ID = "s05-pulgar"; DUR = 4.56
CSS = """
    $ .s05-cartela { position: absolute; left: 150px; top: 590px; width: 780px; padding: 18px 0 14px; text-align: center; background: #1c151c; border: 8px solid #f6c544; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; color: #f6c544; text-shadow: 0 0 24px rgba(246, 197, 68, 0.5); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s05", "s05-h", 320, 320, 60, 520, 0, 1480) + """
          """ + PISO("s05", 320, 1450, 270, 56) + """
          <g class="s05-maxi"><g transform="translate(122 850) scale(1.1)">""" + MAXI("s05") + """</g></g>
          <g class="s05-pulgar"><g transform="translate(790 1110)">
            <path class="w" d="M-110 -10 H-40 V170 H-110 Z" />
            <path class="w" d="M-40 0 C0 -10 20 -60 22 -120 C24 -160 80 -160 84 -110 C88 -70 74 -40 64 -10 H130 C170 -10 176 40 146 52 C176 64 172 104 142 112 C166 126 160 162 132 168 C150 182 140 212 112 214 H-40 Z" />
            <path class="l" d="M70 52 H140 M70 112 H136 M70 168 H124" stroke="#0b080b" stroke-width="6" />
          </g></g>
        </svg>
        <div class="s05-cartela">GRAN FINAL</div>
        """ + GLOBO("s05", "s05-g", 540, 780, 470, "¿Tenés turno el sábado?", "izq", fs=42) + """
"""
JS = """
      const GRAN = 0.17, TURNO = 1.86, PULGAR = 3.47;
      golpe(".s05-cartela", GRAN, 2.4);
      sacudon(GRAN + 0.05);
      tl.to(q(".s05-cartela"), { scale: 1.05, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, GRAN + 0.3);
      tl.to(q(".s05-cartela"), { y: -60, opacity: 0, duration: 0.2 }, TURNO - 0.25);
      entra(".s05-maxi", 0, { x: -400 });
      habla(".s05-boca", 0, 3.6, "182 291");
      tl.fromTo(q(".s05-h"), { opacity: 0.06 }, { opacity: 0.16, duration: 0.25, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(q(".s05-maxi"), { rotation: -2, svgOrigin: "320 1450" }, { rotation: 2, svgOrigin: "320 1450", duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, 0.3);
      gsap.set(q(".s05-g"), { opacity: 0 });
      tl.fromTo(q(".s05-g"), { opacity: 0, scale: 0.5, y: -100 }, { opacity: 1, scale: 1, y: -180, duration: 0.3, ease: "back.out(2)", immediateRender: false }, TURNO - 0.1);
      gsap.set(q(".s05-pulgar"), { opacity: 0 });
      tl.fromTo(q(".s05-pulgar"), { opacity: 0, scale: 3, svgOrigin: "790 1110" }, { opacity: 1, scale: 1, svgOrigin: "790 1110", duration: 0.16, ease: "power4.in", immediateRender: false }, PULGAR - 0.12);
      sacudon(PULGAR + 0.06, 1.3);
      tl.to(q(".s05-pulgar"), { rotation: -10, svgOrigin: "790 1180", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, PULGAR + 0.2);
      tl.to(q(".s05-maxi"), { y: 40, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" }, PULGAR + 0.3);
"""
SFX = [{"t": 0.15, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.3, "sfx": "sparkle", "vol": 0.25}, {"t": 1.8, "sfx": "notification", "vol": 0.3}, {"t": 3.47, "sfx": "impact-bass-1", "vol": 0.42, "max": 0.7}]
