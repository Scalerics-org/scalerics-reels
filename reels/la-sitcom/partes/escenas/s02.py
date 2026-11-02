ID = "s02-madrugada"; DUR = 4.91
CAMPERA = """
            <g class="s02-camp">
              <rect class="c" x="700" y="860" width="320" height="380" rx="28" />
              <path class="g" d="M800 920 L760 950 L730 1060 L770 1070 L790 1010 L790 1170 H930 L930 1010 L950 1070 L990 1060 L960 950 L920 920 C900 950 820 950 800 920 Z" stroke-width="6" />
              <path class="l" d="M860 944 V1166" stroke-width="5" />
              <circle cx="842" cy="990" r="5" fill="#24122f" /><circle cx="842" cy="1040" r="5" fill="#24122f" />
            </g>"""
CSS = """
    $ .s02-talle { position: absolute; left: 760px; top: 1190px; }
    $ .s02-separo { position: absolute; left: 640px; top: 1300px; padding: 16px 30px 10px; background: #5ce611; color: #24122f; border: 6px solid #24122f; border-radius: 40px; box-shadow: 0 8px 0 #24122f; font-family: "Luckiest Guy", sans-serif; font-size: 46px; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + NOCHE("s02", 0.6) + SILLON("s02", -120, 1170, 980, 330) + """
          <ellipse class="s02-brillo" cx="420" cy="1010" rx="300" ry="260" fill="#5ce611" opacity="0.10" />
          <g class="s02-ag"><g transform="translate(250 800) scale(1.0)">""" + AGENTE("s02", "feliz", brazo="saluda") + """</g></g>
          """ + CAMPERA + """
        </svg>
        """ + RELOJ("s02", "s02-hora", 60, 600, "3:00", -5) + """
        """ + GLOBO("s02", "s02-g1", 420, 560, 600, "¿Tenés la campera verde en talle M?", lado="izq", fondo="#1fb5a8", fs=40) + """
        """ + GLOBO("s02", "s02-g2", 330, 720, 400, "¡Sí! Hay stock.", lado="der", fondo="#5ce611", fs=40) + """
        """ + CARTEL("s02", "s02-talle", 760, 1190, "TALLE M", fondo="#f0b429", fs=54, rot=-8) + """
        <div class="s02-separo">¿TE LA SEPARO?</div>
"""
JS = """
      const SOFI = 0.18, SI = 0.88, CAMP = 1.36, TALLE = 2.54, TE = 3.0;
      tl.fromTo(q(".s02-g1"), { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s02-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, SOFI);
      tl.fromTo(q(".s02-brillo"), { opacity: 0.06 }, { opacity: 0.16, duration: 0.6, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      habla(".s02-ag-boca", 0, 4.4, "180 290");
      tl.fromTo(q(".s02-hora"), { rotation: -5 }, { rotation: 3, duration: 0.5, yoyo: true, repeat: 8, ease: "sine.inOut", immediateRender: false }, 0);
      pop(".s02-g2", SI);
      pop(".s02-camp", CAMP, { transformOrigin: "860px 1050px" });
      golpe(".s02-talle", TALLE, 2.2); sacudon(TALLE + 0.04, 0.6);
      pop(".s02-separo", TE);
      tl.fromTo(q(".s02-separo"), { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, TE + 0.35);
      zoom(TE, 1.04, 1.6, "70%", "60%");
"""
SFX = [{"t": 0.02, "sfx": "notification", "vol": 0.3}, {"t": 0.86, "sfx": "pop", "vol": 0.3}, {"t": 1.34, "sfx": "click-soft", "vol": 0.3}, {"t": 2.5, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}, {"t": 2.98, "sfx": "ping", "vol": 0.3}]
