exec(PJ)
ID = "s10-ninguna"; DUR = 2.61
CSS = """
    $ .s10-ninguna-w { position: absolute; left: 0; right: 0; top: 590px; text-align: center; }
    $ .s10-ninguna { display: inline-block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #ff3b30; text-transform: uppercase; letter-spacing: -0.02em; text-shadow: 10px 10px 0 #0c0c0c; }
    $ .s10-verdad { left: 140px; top: 1250px; font-size: 48px; background: #fbf7ea; color: #0c0c0c; transform: rotate(-2deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-cartel">
            <rect x="110" y="780" width="420" height="140" rx="12" fill="#ffd400" stroke="#0c0c0c" stroke-width="8" />
            <text x="320" y="882" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="84" fill="#0c0c0c">SONRÍA</text>
          </g>
          {conductor("s10", 600, 1560, 1.55, "seria")}
        </svg>
        <div class="s10-ninguna-w"><span class="s10-ninguna">Ninguna</span></div>
        <div class="cartela s10-verdad">La página es así de verdad</div>
"""
JS = """
      const NINGUNA = 0.0, PAGINA = 0.83, VERDAD = 1.70;
      // corte seco: ya está todo, el cartel de SONRÍA se cae
      gsap.set(q(".s10-ninguna-w"), { opacity: 1 });
      tl.fromTo(q(".s10-ninguna-w"), { scale: 1.3 }, { scale: 1, duration: 0.12, ease: "power4.out" }, 0);
      tl.fromTo(q(".s10-cartel"), { rotation: -4, y: 0, svgOrigin: "320 850" }, { rotation: 70, y: 700, svgOrigin: "320 850", duration: 1.1, ease: "power2.in" }, 0.15);
      tl.to(q(".s10-cartel"), { opacity: 0, duration: 0.25 }, 0.8);
      // el conductor se saca los lentes de la sonrisa: quieto, serio, respira
      tl.fromTo(q(".s10-con"), { scale: 1, svgOrigin: "600 1300" }, { scale: 1.05, svgOrigin: "600 1300", duration: DUR, ease: "none" }, 0);
      habla(".s10-con-boca", 0.0, 0.5, "0 -248");
      habla(".s10-con-boca", PAGINA, 1.2, "0 -248");
      tl.to(q(".s10-ninguna"), { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 0.3);
      pop(".s10-verdad", PAGINA);
      tl.to(q(".s10-verdad"), { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1 }, VERDAD);
"""
SFX = [{"t": 0.0, "sfx": "glitch-2", "vol": 0.3, "max": 0.4}, {"t": 0.05, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.7}, {"t": 1.2, "sfx": "click-soft", "vol": 0.2}, {"t": 0.83, "sfx": "pop", "vol": 0.2}]
