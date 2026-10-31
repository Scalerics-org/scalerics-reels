ID = "s05-empanadas"; DUR = 3.40
CSS = """
    $ .s05-cel { position: absolute; left: 470px; top: 590px; width: 520px; height: 520px; border: 7px solid #e6e8f0; border-radius: 40px; background: #0a0610; overflow: hidden; }
    $ .s05-cel .bar { padding: 22px 26px 16px; background: #2b1250; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #e6e8f0; }
    $ .s05-cel .bar small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; color: #45dcf0; }
    $ .s05-msg { position: absolute; left: 26px; width: 440px; padding: 16px 20px 14px; background: #e6e8f0; border-radius: 22px; border-bottom-left-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.15; color: #0a0610; }
    $ .s05-plan { position: absolute; left: 70px; top: 1150px; width: 940px; border: 6px solid #e6e8f0; border-radius: 12px; background: #e6e8f0; overflow: hidden; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: #0a0610; }
    $ .s05-plan .f { display: flex; border-top: 4px solid #0a0610; }
    $ .s05-plan .f span { padding: 12px 14px 10px; border-left: 4px solid #0a0610; white-space: nowrap; overflow: hidden; }
    $ .s05-plan .f span:first-child { border-left: 0; width: 360px; } $ .s05-plan .f span:nth-child(2) { width: 330px; } $ .s05-plan .f span:nth-child(3) { flex: 1; }
    $ .s05-plan .h { background: #45dcf0; border-top: 0; font-weight: 500; }
    $ .s05-plan .tit { padding: 8px 14px; background: #2b1250; color: #e6e8f0; font-size: 24px; letter-spacing: 0.2em; }
    $ .s05-cursor { display: inline-block; width: 4px; height: 30px; background: #0a0610; vertical-align: -4px; margin-left: 2px; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-dueno"><g transform="translate(-40 600) scale(1.05)">""" + DUENO("s05") + """</g></g>
          """ + CARTA("s05", "s05-c1", 760, 820, -20, 1.0, "A", "pica") + CARTA("s05", "s05-c2", 880, 760, 25, 1.0, "Q", "corazon") + CARTA("s05", "s05-c3", 640, 760, 10, 1.0, "7", "diamante") + """
        </svg>
        <div class="s05-cel"><div class="bar"><small>WHATSAPP</small>Sra. de las empanadas</div>
          <div class="s05-msg s05-m1" style="top:130px">Hola! Doce de carne y seis de jamón y queso</div>
          <div class="s05-msg s05-m2" style="top:300px">Para las nueve. Gracias!!</div>
        </div>
        <div class="s05-plan"><div class="tit">PEDIDOS.XLSX</div>
          <div class="f h"><span>CLIENTE</span><span>PEDIDO</span><span>HORA</span></div>
          <div class="f"><span>Rubén</span><span>2 pizzas</span><span>20:30</span></div>
          <div class="f"><span class="s05-t1">Sra. empanadas</span><span class="s05-t2">12 carne</span><span class="s05-t3"><i class="s05-cursor"></i></span></div>
        </div>
"""
JS = """
      const PASANDO = 0.42, SENORA = 1.17, EMPANADAS = 1.59, DOCE = 1.67, CARNE = 2.67;
      // las cartas del mago se caen: el dueño ni las mira
      [".s05-c1", ".s05-c2", ".s05-c3"].forEach((s, i) => tl.to(q(s), { y: 900, opacity: 0, rotation: 140 + i * 40, duration: 0.6, ease: "power2.in" }, 0.05 + i * 0.07));
      tl.fromTo(q(".s05-dueno"), { x: -300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s05-boca", 0, 3.0, "180 294");
      pop(".s05-cel", PASANDO - 0.2);
      pop(".s05-m1", SENORA - 0.3); pop(".s05-m2", EMPANADAS);
      pop(".s05-plan", EMPANADAS - 0.4);
      // tipea a mano, letra por letra (clip con escala)
      ["s05-t1", "s05-t2"].forEach((c, i) => tl.fromTo(q("." + c), { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: false }, DOCE + i * 0.8));
      tl.fromTo(q(".s05-t1"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(10)", immediateRender: false }, DOCE);
      tl.fromTo(q(".s05-t2"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "steps(8)", immediateRender: false }, CARNE - 0.2);
      tl.fromTo(q(".s05-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "steps(1)", yoyo: true, repeat: 15 }, 0);
      tl.fromTo(q(".s05-pantalla"), { opacity: 0.5 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 9, immediateRender: false }, DOCE);
"""
SFX = [{"t": 0.02, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.3, "sfx": "click-soft", "vol": 0.22}, {"t": 0.9, "sfx": "notification", "vol": 0.3}, {"t": 1.6, "sfx": "notification", "vol": 0.25}, {"t": 1.7, "sfx": "typing", "vol": 0.3, "max": 1.4}]
