exec(open("partes/escenas/tel.py").read())
ID = "s08-once"; DUR = 5.16
CSS = TEL("s08") + """
    $ .s08-tel { left: 420px; }
    $ .s08-reloj { position: absolute; left: 40px; top: 590px; padding: 8px 18px 4px; background: #ffd21f; color: #050d22; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 76px; border-radius: 12px; box-shadow: 8px 8px 0 #e3212d; }
    $ .s08-tildes { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #f4f6fb; opacity: 0.7; letter-spacing: 0.1em; }
    $ .s08-nada { top: 1120px; font-size: 190px; color: #ff5a5f; text-shadow: 12px 12px 0 #050d22; }
    $ .s08-cosa { left: 600px; top: 600px; background: #f4f6fb; color: #0b1d4a; font-size: 46px; box-shadow: 8px 8px 0 #ffd21f; transform: rotate(4deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-vecina">
            <g transform="translate(330 760) scale(1.25)">
              <path class="m" d="M40 540 C40 400 95 360 180 360 C265 360 320 400 320 540 Z" />
              <path class="b" d="M155 300 V365 H205 V300" />
              <ellipse class="b" cx="180" cy="230" rx="72" ry="84" />
              <circle class="w" cx="180" cy="128" r="34" />
              <path class="w" d="M108 222 C104 150 256 150 252 222 C230 186 130 186 108 222 Z" />
              <path class="l" d="M150 232 h14 M196 232 h14" stroke-width="8" />
              <path class="b s08-boca" d="M160 268 C170 286 190 286 200 268 Z" />
              <g class="s08-mano-i"><ellipse cx="140" cy="240" rx="42" ry="56" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7" /></g>
              <g class="s08-mano-d"><ellipse cx="220" cy="240" rx="42" ry="56" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7" /></g>
            </g>
          </g>
        </svg>
        <div class="cartela s08-cosa">"ME DA COSA"</div>
        <div class="s08-tel">
          <div class="s08-barra"></div>
          <div class="s08-head">Almacén Raúl<small>últ. vez: el martes</small></div>
          <div class="s08-burb s08-out s08-b1" style="top: 210px">¿Tenés pañales?<small>23:00 ✓✓</small></div>
          <svg class="s08-panial" viewBox="0 0 500 800" style="width:500px;height:800px" aria-hidden="true">
            <path d="M170 380 H330 L320 440 C300 500 200 500 180 440 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="6" stroke-linejoin="round" />
            <path d="M170 380 H330" stroke="#ffd21f" stroke-width="12" stroke-linecap="round" />
          </svg>
          <div class="s08-tildes">· sin respuesta ·</div>
        </div>
        <div class="s08-reloj">23:00</div>
        <div class="txt s08-nada">NADA.</div>
"""
JS = """
      const COSA = 0.38, LE = 1.04, ONCE = 1.91, PANIALES = 3.24, NADA = 4.2;
      // cuadro 0: la vecina se tapa la cara
      tl.fromTo(q(".s08-vecina"), { scale: 1.06, svgOrigin: "555 1200" }, { scale: 1, svgOrigin: "555 1200", duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo([q(".s08-mano-i"), q(".s08-mano-d")], { y: 120 }, { y: 0, duration: 0.25, ease: "back.out(2)" }, 0);
      tl.to(q(".s08-vecina"), { rotation: -3, svgOrigin: "555 1400", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.25);
      pop(".s08-cosa", COSA);
      // le escribí: celular
      tl.to([q(".s08-cosa")], { opacity: 0, duration: 0.15 }, LE - 0.1);
      tl.to(q(".s08-vecina"), { x: -260, opacity: 0.5, duration: 0.3, ease: "power2.inOut" }, LE - 0.1);
      tl.to([q(".s08-mano-i"), q(".s08-mano-d")], { y: 140, duration: 0.25 }, LE);
      entra(".s08-tel", LE - 0.05, { y: 900 });
      pop(".s08-b1", ONCE - 0.1);
      golpe(".s08-reloj", ONCE, 2);
      tl.to(q(".s08-reloj"), { rotation: -4, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, ONCE + 0.2);
      pop(".s08-panial", PANIALES);
      tl.to(q(".s08-panial"), { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, PANIALES + 0.3);
      gsap.set(q(".s08-tildes"), { opacity: 0 });
      tl.to(q(".s08-tildes"), { opacity: 0.7, duration: 0.2 }, PANIALES + 0.4);
      // NADA.
      tl.to(q(".s08-tel"), { opacity: 0.45, duration: 0.2 }, NADA - 0.1);
      golpe(".s08-nada", NADA, 2.8);
      sacudon(NADA + 0.05, 1.3);
"""
SFX = [{"t": 0.0, "sfx": "pop", "vol": 0.2}, {"t": 1.0, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.81, "sfx": "key-press", "vol": 0.3}, {"t": 1.95, "sfx": "click", "vol": 0.25}, {"t": 3.24, "sfx": "pop", "vol": 0.22}, {"t": 4.12, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
