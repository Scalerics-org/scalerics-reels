ID = "s02-maxi"; DUR = 3.80
CSS = """
    $ .s02-nombre { position: absolute; left: 470px; top: 760px; width: 580px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 190px; line-height: 1; color: #f6c544; text-shadow: 0 0 30px rgba(246, 197, 68, 0.5); }
    $ .s02-placa { position: absolute; left: 560px; top: 990px; width: 400px; padding: 14px 0 12px; text-align: center; background: #fff3d6; color: #0b080b; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 36px; letter-spacing: 0.24em; }
    $ .s02-con { position: absolute; left: 520px; top: 640px; width: 480px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #fff3d6; }
"""
pl = "".join(f'<path d="M{520 + i * 32} 560 V1380" stroke="#3a0812" stroke-width="10" />' for i in range(8))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s02", "s02-h", 760, 760, 60, 600, 0, 1480) + """
          """ + PISO("s02", 760, 1420, 300, 56) + """
          <g class="s02-tel-i"><rect class="v" x="470" y="560" width="290" height="820" rx="6" /><g>""" + pl.replace("M5", "M4").replace('stroke-width="10"', 'stroke-width="10" opacity="0.6"') + """</g></g>
          <g class="s02-tel-d"><rect class="v" x="760" y="560" width="290" height="820" rx="6" /></g>
          <g class="s02-pre"><g transform="translate(30 820) scale(1.2)">""" + PRESENTADOR("s02") + """</g></g>
        </svg>
        <div class="s02-con">CON USTEDES</div>
        <div class="s02-nombre">MAXI</div>
        <div class="s02-placa">DE MALVÍN</div>
"""
JS = """
      const MAXI = 1.00, MALVIN = 2.00;
      entra(".s02-pre", 0, { x: -500 });
      habla(".s02-boca", 0.1, 3.2, "180 290");
      tl.fromTo(q(".s02-brazo"), { rotation: 0, svgOrigin: "300 460" }, { rotation: 14, svgOrigin: "300 460", duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.15);
      respira(".s02-pre", 0.4, 3.2, 10, 0.4);
      pop(".s02-con", 0.1);
      tl.to(q(".s02-con"), { opacity: 0, y: -30, duration: 0.2 }, MAXI - 0.1);
      // se abre el telón
      tl.to(q(".s02-tel-i"), { x: -330, opacity: 0, duration: 0.45, ease: "power3.inOut" }, MAXI - 0.1);
      tl.to(q(".s02-tel-d"), { x: 330, opacity: 0, duration: 0.45, ease: "power3.inOut" }, MAXI - 0.1);
      golpe(".s02-nombre", MAXI + 0.25, 2.6);
      sacudon(MAXI + 0.12);
      tl.fromTo(q(".s02-h"), { opacity: 0 }, { opacity: 0.18, duration: 0.2, immediateRender: false }, MAXI);
      gsap.set(q(".s02-h"), { opacity: 0 });
      pop(".s02-placa", MALVIN, { y: 40 });
      tl.to(q(".s02-nombre"), { scale: 1.06, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, MALVIN + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "whoosh", "vol": 0.3}, {"t": 0.9, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.8}, {"t": 1.1, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 1.2, "sfx": "sparkle", "vol": 0.3}, {"t": 2.0, "sfx": "pop", "vol": 0.3}]
