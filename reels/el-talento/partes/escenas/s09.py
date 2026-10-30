ID = "s09-companero"; DUR = 4.80
CSS = """
    $ .s09-para { position: absolute; left: 520px; top: 650px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 130px; color: #ff2d3d; line-height: 1; text-shadow: 0 0 24px rgba(255, 45, 61, 0.5); }
    $ .s09-tal { left: 560px; top: 860px; background: #f6c544; color: #0b080b; font-size: 56px; }
    $ .s09-busca { position: absolute; left: 90px; top: 610px; width: 900px; padding: 18px 0 14px; text-align: center; border: 8px dashed #f6c544; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 74px; color: #f6c544; background: #0b080b; }
    $ .s09-q { position: absolute; left: 700px; top: 920px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 220px; color: #f6c544; line-height: 1; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-simp"><g transform="translate(60 880) scale(1.15)">""" + SIMPATICO("s09") + """
            <g class="s09-mano"><path class="l" d="M300 420 C350 380 370 320 368 250" stroke-width="30" /><path class="y" d="M300 420 C350 380 370 320 368 250" stroke="#f6c544" stroke-width="18" fill="none" /><circle class="b" cx="368" cy="226" r="30" /></g>
          </g></g>
          <g class="s09-tilde"><path d="M890 940 L920 970 L980 905" fill="none" stroke="#0b080b" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></g>
          """ + PISO("s09", 540, 1460, 400, 60) + """
          <g class="s09-maxi"><g transform="translate(120 900) scale(1.0)">""" + MAXI("s09", telefono=False) + """</g></g>
          <g class="s09-sombra"><g transform="translate(600 900) scale(1.0)">
            <path d="M30 560 C30 420 92 368 180 368 C268 368 330 420 330 560 Z M180 140 C120 140 108 200 108 236 C108 290 140 318 180 318 C220 318 252 290 252 236 C252 200 240 140 180 140 Z" fill="none" stroke="#f6c544" stroke-width="8" stroke-dasharray="20 16" stroke-linecap="round" />
          </g></g>
        </svg>
        <div class="s09-para">¡PARÁ!</div>
        <div class="cartela s09-tal">TALENTO ✓</div>
        <div class="s09-busca">SE BUSCA COMPAÑERO</div>
        <div class="s09-q">?</div>
"""
JS = """
      const PIBE = 0.96, TALENTO = 2.12, COMP = 3.39;
      // el juez bueno se para de golpe
      tl.fromTo(q(".s09-simp"), { y: 200 }, { y: 0, duration: 0.25, ease: "back.out(2)" }, 0);
      golpe(".s09-para", 0.05, 2.2);
      sacudon(0.1);
      habla(".s09-boca", 0, 3.6, "180 302");
      tl.fromTo(q(".s09-mano"), { rotation: -10, svgOrigin: "300 400" }, { rotation: 10, svgOrigin: "300 400", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0.2);
      tl.to(q(".s09-para"), { opacity: 0, y: -40, duration: 0.2 }, TALENTO - 0.3);
      pop(".s09-tal", TALENTO, { rotation: -4 });
      gsap.set(q(".s09-tilde"), { opacity: 0 });
      // cambio a Maxi y el lugar vacío
      tl.to([q(".s09-simp"), q(".s09-tal")], { x: -1200, duration: 0.3, ease: "power3.in" }, COMP - 0.45);
      entra(".s09-maxi", COMP - 0.2, { x: -500 });
      gsap.set(q(".s09-maxi .s09-boca"), { rotation: 180, svgOrigin: "182 291" });
      dibujar(".s09-sombra path", COMP, 0.5);
      golpe(".s09-busca", COMP + 0.1, 1.8);
      pop(".s09-q", COMP + 0.4);
      tl.to(q(".s09-q"), { rotation: 10, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, COMP + 0.7);
"""
SFX = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 2.12, "sfx": "chime", "vol": 0.3, "max": 0.8}, {"t": 3.0, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.45, "sfx": "pop", "vol": 0.3}]
