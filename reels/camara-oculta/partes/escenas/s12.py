exec(PJ)
ID = "s12-tito"; DUR = 2.99
CSS = """
    $ .s12-pag { left: 640px; top: 620px; font-size: 54px; transform: rotate(6deg); }
    $ .s12-barrio { left: 90px; top: 1190px; font-size: 56px; background: #fbf7ea; transform: rotate(-4deg); }
    $ .s12-letrero { position: absolute; left: 140px; width: 440px; text-align: center; white-space: nowrap; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 36px; line-height: 100px; top: 590px; color: #0c0c0c; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-local" opacity="0.7">
            <rect class="y" x="140" y="590" width="440" height="100" rx="8" />
            <path class="l" d="M180 1400 V760 H900 V1400" />
            <path class="l" d="M180 760 L220 700 H860 L900 760" opacity="0.6" />
          </g>
          {tito("s12", 540, 1420, 1.3, "abierta", extra=pinza("s12", 185, -150, -12))}
        </svg>
        <div class="s12-letrero">PARRILLA DON TITO</div>
        <div class="cartela s12-pag">¿Página?</div>
        <div class="cartela s12-barrio">Me conoce todo el barrio</div>
"""
JS = """
      const PAG = 0.0, SI = 0.56, CONOCE = 1.22, TODO = 1.6;
      tl.fromTo(q(".s12-tito"), { x: 80, opacity: 0.85 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s12-letrero", 0.05);
      golpe(".s12-pag", 0.1, 2);
      tl.to(q(".s12-tito-cejas"), { y: -12, duration: 0.15, yoyo: true, repeat: 1 }, 0.1);
      habla(".s12-tito-boca", SI, 1.4, "0 -236");
      tl.to(q(".s12-tito-bigote"), { y: -4, duration: 0.11, yoyo: true, repeat: 11, ease: "sine.inOut" }, SI);
      // infla el pecho y levanta la pinza
      tl.to(q(".s12-tito"), { scale: 1.06, svgOrigin: "540 1420", duration: 0.3, ease: "back.out(2)" }, CONOCE);
      tl.to(q(".s12-pinza"), { rotation: -10, svgOrigin: "185 -150", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, SI);
      tl.to(q(".s12-pag"), { opacity: 0, duration: 0.15 }, CONOCE);
      golpe(".s12-barrio", TODO, 2);
"""
SFX = [{"t": 0.05, "sfx": "pop", "vol": 0.28}, {"t": 0.6, "sfx": "click", "vol": 0.22}, {"t": 1.22, "sfx": "whoosh-short", "vol": 0.2}, {"t": 1.6, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
