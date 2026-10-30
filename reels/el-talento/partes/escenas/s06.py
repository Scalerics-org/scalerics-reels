ID = "s06-matrix"; DUR = 6.32
CSS = """
    $ .s06-card { position: absolute; left: 70px; top: 600px; width: 400px; height: 210px; background: #fff3d6; border-radius: 24px; }
    $ .s06-card svg { position: absolute; left: 0; top: 0; width: 400px; height: 210px; }
    $ .s06-matrix { left: 560px; top: 640px; background: #0b080b; border: 6px solid #fff3d6; color: #fff3d6; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; letter-spacing: 0.12em; }
    $ .s06-no { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; color: #ff2d3d; line-height: 1; text-shadow: 0 0 30px rgba(255, 45, 61, 0.6); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s06", "s06-h", 540, 540, 60, 620, 0, 1300) + """
          <g class="s06-malo"><g transform="translate(234 575) scale(1.7)">""" + MALO("s06") + """
            <g class="s06-brillo" opacity="0"><path d="M130 258 L150 230 L160 230 L140 258 Z M192 258 L212 230 L222 230 L202 258 Z" fill="#fff3d6" /></g>
          </g></g>
          """ + MESA("s06", 40, 1250, 1000, 200) + """
          """ + BOTON_X("s06", 800, 1236, "s06-boton", 56) + """
          """ + XROJA("s06", "s06-xx", 540, 1000, 1.25) + """
        </svg>
        <div class="s06-card"><svg viewBox="0 0 400 210"><g class="s06-tt" transform="translate(200 110) scale(1.6)"><path d="M-60 0 L-30 30 L30 -34 M0 30 L60 -34" fill="none" stroke="#4fc3ff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" /></g></svg></div>
        <div class="cartela s06-matrix">NI EN MATRIX</div>
"""
JS = """
      const TILDES = 0.48, MATRIX = 2.22, AZUL = 3.61, ES = 5.33, NO = 5.58;
      tl.fromTo(q(".s06-malo"), { scale: 1.08, svgOrigin: "540 1250" }, { scale: 1, svgOrigin: "540 1250", duration: 1.2, ease: "power2.out" }, 0);
      habla(".s06-boca", 0, 5.6, "183 289");
      tl.fromTo(q(".s06-ceja"), { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.2);
      pop(".s06-card", TILDES - 0.1, { rotation: -8 });
      dibujar(".s06-tt path", TILDES, 0.3);
      // Matrix: brillo en los anteojos
      golpe(".s06-matrix", MATRIX, 1.8);
      [MATRIX + 0.1, MATRIX + 0.9].forEach((t) => {
        tl.fromTo(q(".s06-brillo"), { opacity: 0, x: -20 }, { opacity: 1, x: 30, duration: 0.3, ease: "power2.inOut", immediateRender: false }, t);
        tl.to(q(".s06-brillo"), { opacity: 0, duration: 0.1 }, t + 0.3);
      });
      tl.fromTo(q(".s06-card"), { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, AZUL);
      tl.to(q(".s06-malo"), { x: -10, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 3.0);
      // es un no: aprieta el botón y cae la X
      tl.to([q(".s06-card"), q(".s06-matrix")], { opacity: 0, y: -40, duration: 0.2 }, ES - 0.3);
      tl.fromTo(q(".s06-boton .r"), { y: 0 }, { y: 10, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, ES);
      equis(".s06-xx", NO - 0.25);
"""
SFX = [{"t": 0.5, "sfx": "pop", "vol": 0.3}, {"t": 2.22, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}, {"t": 2.35, "sfx": "sparkle", "vol": 0.25}, {"t": 3.61, "sfx": "click-soft", "vol": 0.3}, {"t": 5.33, "sfx": "click", "vol": 0.35}, {"t": 5.35, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
