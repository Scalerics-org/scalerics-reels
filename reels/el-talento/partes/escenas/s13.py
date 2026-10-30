ID = "s13-dormi"; DUR = 4.90
CSS = """
    $ .s13-q { position: absolute; left: 300px; top: 800px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 160px; color: #4fc3ff; line-height: 1; }
    $ .s13-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #4fc3ff; line-height: 1; }
    $ .s13-card { position: absolute; left: 140px; width: 800px; padding: 18px 26px 16px; background: #fff3d6; border-left: 16px solid #5ce611; border-radius: 14px; color: #0b080b; }
    $ .s13-card small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.14em; color: #0b080b; opacity: 0.7; }
    $ .s13-card b { display: block; margin-top: 6px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + PISO("s13", 540, 1460, 420, 60) + """
          <g class="s13-maxi"><g transform="translate(40 930) scale(0.95)">""" + MAXI("s13", telefono=False) + """</g></g>
          <g class="s13-ag"><g transform="translate(600 900) scale(0.95)">""" + AGENTE("s13") + """</g></g>
        </svg>
        <div class="s13-q">?</div>
        <div class="s13-z s13-z1" style="left:330px;top:1010px;font-size:70px">Z</div>
        <div class="s13-z s13-z2" style="left:380px;top:950px;font-size:90px">Z</div>
        <div class="s13-z s13-z3" style="left:440px;top:880px;font-size:110px">Z</div>
        <div class="s13-card s13-c1" style="top:600px" data-layout-allow-overlap><small>PARA VOS · MAÑANA 9:00</small><b>Pedido grande: quiere hablar con el dueño</b></div>
        <div class="s13-card s13-c2" style="top:800px" data-layout-allow-overlap><small>PARA VOS · MAÑANA 9:00</small><b>Un proveedor pregunta por el pago</b></div>
"""
JS = """
      const VOS = 1.11, DORMI = 1.29, LO = 2.27, PASO = 3.43;
      tl.fromTo(q(".s13-maxi"), { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s13-ag"), { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: "back.out(1.4)" }, 0.05);
      habla(".s13-boca", 0, 0.8, "182 291");
      pop(".s13-q", 0.3);
      tl.to(q(".s13-q"), { rotation: -12, duration: 0.2, yoyo: true, repeat: 1 }, 0.6);
      tl.to(q(".s13-q"), { opacity: 0, duration: 0.15 }, VOS);
      // el agente le pone la mano en el hombro y Maxi se duerme
      tl.fromTo(q(".s13-ag-bi"), { rotation: 0, svgOrigin: "64 300" }, { rotation: -40, svgOrigin: "64 300", duration: 0.3, ease: "back.out(2)", immediateRender: false }, VOS);
      tl.fromTo(q(".s13-ag-boca"), { scaleY: 1, svgOrigin: "180 318" }, { scaleY: 0.4, svgOrigin: "180 318", duration: 0.12, yoyo: true, repeat: 27, ease: "sine.inOut", immediateRender: false }, VOS);
      tl.to(q(".s13-ojos"), { scaleY: 0.15, svgOrigin: "182 247", duration: 0.3 }, DORMI + 0.2);
      tl.to(q(".s13-maxi"), { rotation: -6, svgOrigin: "200 1460", duration: 0.6, ease: "sine.inOut" }, DORMI + 0.2);
      ["1", "2", "3"].forEach((k, i) => {
        gsap.set(q(".s13-z" + k), { opacity: 0 });
        tl.fromTo(q(".s13-z" + k), { opacity: 0, y: 30 }, { opacity: 1, y: -20, duration: 0.5, ease: "power2.out", immediateRender: false }, DORMI + 0.4 + i * 0.25);
        tl.to(q(".s13-z" + k), { y: -60, opacity: 0.4, duration: 1.6, ease: "sine.inOut" }, DORMI + 0.9 + i * 0.25);
      });
      // lo que es para vos: tarjetas que se apilan
      gsap.set([q(".s13-c1"), q(".s13-c2")], { opacity: 0 });
      tl.fromTo(q(".s13-c1"), { opacity: 0, y: -60, rotation: -2 }, { opacity: 1, y: 0, rotation: -2, duration: 0.3, ease: "back.out(2)", immediateRender: false }, LO + 0.1);
      tl.fromTo(q(".s13-c2"), { opacity: 0, y: -60, rotation: 1 }, { opacity: 1, y: 0, rotation: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, PASO);
"""
SFX = [{"t": 0.3, "sfx": "pop", "vol": 0.28}, {"t": 1.3, "sfx": "click-soft", "vol": 0.25}, {"t": 1.7, "sfx": "sparkle", "vol": 0.2}, {"t": 2.4, "sfx": "notification", "vol": 0.28}, {"t": 3.45, "sfx": "notification", "vol": 0.25}]
