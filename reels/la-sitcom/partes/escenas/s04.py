ID = "s04-apartada"; DUR = 4.19
CSS = """
    $ .s04-nunca { position: absolute; left: 60px; top: 560px; }
    $ .s04-ticket { position: absolute; left: 540px; top: 760px; width: 470px; padding: 30px 32px 34px; background: #fff4e0; border: 7px solid #24122f; border-radius: 24px; box-shadow: 0 10px 0 #24122f; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; line-height: 1.5; color: #24122f; transform: rotate(3deg); }
    $ .s04-ticket b { display: block; font-family: "Luckiest Guy", sans-serif; font-weight: 400; font-size: 52px; color: #d4581f; margin-bottom: 8px; }
    $ .s04-sello { position: absolute; left: 490px; top: 1090px; padding: 16px 30px 8px; border: 10px solid #5ce611; border-radius: 18px; font-family: "Luckiest Guy", sans-serif; font-size: 76px; line-height: 1; color: #5ce611; background: rgba(36, 18, 47, 0.9); transform: rotate(-12deg); white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + NOCHE("s04", 0.6) + SILLON("s04", -200, 1220, 900, 300) + """
          <ellipse class="s04-brillo" cx="280" cy="1060" rx="300" ry="280" fill="#5ce611" opacity="0.12" />
          <g class="s04-ag"><g transform="translate(60 740) scale(1.15)">""" + AGENTE("s04", "guino", brazo="pulgar") + """</g></g>
        </svg>
        """ + CARTEL("s04", "s04-nunca", 60, 570, "NUNCA DORMIMOS", fondo="#f0b429", fs=60, rot=-6) + """
        <div class="s04-ticket"><b>PEDIDO</b>CAMPERA VERDE<br>TALLE M<br>A NOMBRE DE: SOFI</div>
        <div class="s04-sello">APARTADA</div>
"""
JS = """
      const NUNCA = 0.52, LISTO = 1.83, APART = 2.72;
      tl.fromTo(q(".s04-ag"), { scale: 1.08, transformOrigin: "260px 1060px" }, { scale: 1, transformOrigin: "260px 1060px", duration: 0.6, ease: "power3.out", immediateRender: false }, 0);
      habla(".s04-ag-boca", 0, 3.6, "180 290");
      golpe(".s04-nunca", NUNCA, 2.2); sacudon(NUNCA + 0.04, 0.6);
      tl.fromTo(q(".s04-ag-bd"), { rotation: 0, svgOrigin: "290 310" }, { rotation: -10, svgOrigin: "290 310", duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)", immediateRender: false }, LISTO);
      entra(".s04-ticket", LISTO, { x: 600 });
      golpe(".s04-sello", APART, 2.6); sacudon(APART + 0.04, 1.0);
      tl.fromTo(q(".s04-brillo"), { opacity: 0.08 }, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
"""
SFX = [{"t": 0.48, "sfx": "pop", "vol": 0.3}, {"t": 1.8, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.68, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.6}, {"t": 2.75, "sfx": "chime", "vol": 0.22}]
