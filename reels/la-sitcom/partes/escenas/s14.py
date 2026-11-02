ID = "s14-scalerics"; DUR = 9.12
CSS = """
    $ .s14-tit { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 76px; line-height: 1; color: #5ce611; white-space: nowrap; }
    $ .s14-chip { position: absolute; padding: 16px 26px 14px; background: #24122f; border: 5px solid #5ce611; border-radius: 40px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; line-height: 1; color: #fff4e0; white-space: nowrap; }
    $ .s14-chip b { color: #5ce611; font-weight: 800; }
    $ .s14-etq { position: absolute; left: 0; right: 0; top: 1600px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.34em; color: #5ce611; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="s14-apagon" x="0" y="0" width="1080" height="1920" fill="#120a1c" opacity="0.88" />
          <circle class="s14-halo" cx="540" cy="940" r="330" fill="#5ce611" opacity="0.10" />
          <g class="s14-ag"><g transform="translate(360 650) scale(1.0)">""" + AGENTE("s14", "feliz", brazo="saluda") + """</g></g>
        </svg>
        <div class="s14-tit">Tu agente de IA</div>
        <div class="s14-chip s14-k1" style="left:70px;top:1250px">Tus <b>precios</b></div>
        <div class="s14-chip s14-k2" style="left:600px;top:1250px">Tu <b>stock</b></div>
        <div class="s14-chip s14-k3" style="left:210px;top:1350px"><b>A cualquier hora</b></div>
        <div class="s14-chip s14-k4" style="left:110px;top:1450px">Lo grande, <b>te lo pasa</b></div>
        <div class="s14-etq">HECHO POR SCALERICS</div>
"""
JS = """
      const SCAL = 1.73, AGENTE = 2.82, PRECIOS = 4.63, STOCK = 5.18, HORA = 5.91, PASA = 7.27;
      gsap.set(q(".s14-apagon"), { opacity: 0 });
      tl.fromTo(q(".s14-apagon"), { opacity: 0 }, { opacity: 0.88, duration: 0.4, immediateRender: false }, 0);
      pop(".s14-ag", 0.15, { transformOrigin: "540px 930px" });
      tl.fromTo(q(".s14-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.22, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.4);
      respira(".s14-ag", 1.8, DUR - 2, -10, 0.6);
      tl.fromTo(q(".s14-halo"), { scale: 0.9, svgOrigin: "540 940" }, { scale: 1.1, svgOrigin: "540 940", duration: 0.8, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, 0.3);
      pop(".s14-etq", SCAL - 0.05, { y: 20 });
      pop(".s14-tit", AGENTE - 0.05);
      pop(".s14-k1", PRECIOS - 0.05, { y: 20 }); pop(".s14-k2", STOCK - 0.05, { y: 20 }); pop(".s14-k3", HORA - 0.1, { y: 20 }); pop(".s14-k4", 6.54, { y: 20 });
"""
SFX = [{"t": 0.0, "sfx": "whoosh-cinematic", "vol": 0.25, "max": 1.2}, {"t": 1.7, "sfx": "chime", "vol": 0.25}, {"t": 4.6, "sfx": "pop", "vol": 0.26}, {"t": 5.15, "sfx": "pop", "vol": 0.26}, {"t": 5.85, "sfx": "pop", "vol": 0.26}, {"t": 7.25, "sfx": "ping", "vol": 0.28}]
