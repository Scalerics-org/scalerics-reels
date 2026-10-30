ID = "s10-agente"; DUR = 4.08
CSS = """
    $ .s10-cart { position: absolute; left: 90px; top: 600px; width: 900px; padding: 18px 0 14px; text-align: center; background: #0b080b; border: 8px solid #5ce611; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: #5ce611; line-height: 1; text-shadow: 0 0 24px rgba(92, 230, 17, 0.45); }
    $ .s10-cart small { display: block; margin-top: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.24em; color: #fff3d6; text-shadow: none; }
"""
humo = "".join(f'<circle cx="{560 + (i * 97) % 360}" cy="{1440 - (i % 3) * 30}" r="{40 + (i * 13) % 40}" fill="#fff3d6" opacity="0.12" />' for i in range(9))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s10", "s10-h", 740, 740, 60, 520, 0, 1480) + """
          """ + PISO("s10", 740, 1460, 280, 56) + """
          <g class="s10-pre"><g transform="translate(-10 900) scale(1.05)">""" + PRESENTADOR("s10") + """</g></g>
          <defs><clipPath id="s10-clip"><rect x="400" y="560" width="680" height="900" /></clipPath></defs>
          <g clip-path="url(#s10-clip)"><g class="s10-ag"><g transform="translate(560 900)">""" + AGENTE("s10") + """</g></g></g>
          <g class="s10-humo">""" + humo + """</g>
        </svg>
        <div class="s10-cart">AGENTE DE IA<small>CONCURSANTE 2</small></div>
"""
JS = """
      const CELULAR = 1.36, AGENTE = 2.29, IA = 2.97;
      entra(".s10-pre", 0, { x: -400 });
      habla(".s10-boca", 0, 3.2, "180 290");
      tl.fromTo(q(".s10-brazo"), { rotation: 0, svgOrigin: "300 460" }, { rotation: 40, svgOrigin: "300 460", duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.1);
      tl.fromTo(q(".s10-h"), { opacity: 0 }, { opacity: 0.2, duration: 0.3, immediateRender: false }, CELULAR - 0.3);
      gsap.set(q(".s10-h"), { opacity: 0 });
      // sube desde el piso
      tl.fromTo(q(".s10-ag"), { y: 620 }, { y: 0, duration: 0.7, ease: "power3.out" }, CELULAR - 0.2);
      gsap.set(q(".s10-ag"), { y: 620 });
      tl.fromTo(q(".s10-humo"), { opacity: 0, y: 0 }, { opacity: 1, y: -60, duration: 0.6, immediateRender: false }, CELULAR - 0.2);
      tl.to(q(".s10-humo"), { opacity: 0, y: -160, duration: 1.2 }, CELULAR + 0.4);
      gsap.set(q(".s10-humo"), { opacity: 0 });
      // abre los ojos y saluda
      gsap.set(q(".s10-ag-ojos"), { scaleY: 0.1, svgOrigin: "180 213" });
      tl.to(q(".s10-ag-ojos"), { scaleY: 1, svgOrigin: "180 213", duration: 0.2, ease: "back.out(2)" }, AGENTE);
      tl.fromTo(q(".s10-ag-bd"), { rotation: 0, svgOrigin: "296 300" }, { rotation: -30, svgOrigin: "296 300", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, AGENTE + 0.1);
      golpe(".s10-cart", IA, 2.2);
      sacudon(IA + 0.05);
      tl.to(q(".s10-ag-ojos"), { scaleY: 0.1, svgOrigin: "180 213", duration: 0.06, yoyo: true, repeat: 1 }, IA + 0.6);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.15, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.9}, {"t": 2.29, "sfx": "sparkle", "vol": 0.3}, {"t": 2.97, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
