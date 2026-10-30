ID = "s04-lunes"; DUR = 3.33
CSS = """
    $ .s04-cartela { left: 210px; top: 600px; background: #f6c544; color: #0b080b; font-size: 52px; }
    $ .s04-cal { position: absolute; left: 330px; top: 960px; width: 420px; height: 380px; }
    $ .s04-hoja { position: absolute; left: 0; top: 0; width: 420px; height: 380px; background: #fff3d6; border: 7px solid #fff3d6; border-radius: 22px; overflow: hidden; text-align: center; }
    $ .s04-hoja i { display: block; height: 90px; background: #ff2d3d; }
    $ .s04-hoja b { display: block; margin-top: 50px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #0b080b; font-style: normal; }
    $ .s04-sello { position: absolute; left: 560px; top: 1180px; padding: 10px 26px 6px; border: 8px solid #ff2d3d; color: #ff2d3d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; transform: rotate(-12deg); background: #0b080b; }
"""
dias = ["MIÉ", "JUE", "VIE", "SÁB", "DOM", "MAR", "MIÉ", "JUE", "MAR"]
hojas = "".join(f'<div class="s04-hoja s04-d{i}"><i></i><b>{d}</b></div>' for i, d in enumerate(dias))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-maxi"><g transform="translate(-40 960) scale(0.95)">""" + MAXI("s04") + """</g></g>
        </svg>
        <div class="cartela s04-cartela">SEGUNDO NÚMERO</div>
        """ + GLOBO("s04", "s04-g", 330, 760, 520, "Te contesto el lunes", "izq", fondo="#4fc3ff", fs=46) + """
        <div class="s04-cal" data-layout-allow-overlap>""" + hojas + """</div>
        <div class="s04-sello">NUNCA</div>
"""
JS = """
      const TE = 0.43, LUNES = 2.00, NUNCA = 2.61;
      golpe(".s04-cartela", 0.05);
      entra(".s04-maxi", 0, { x: -300 });
      habla(".s04-boca", 0, 2.6, "182 291");
      respira(".s04-maxi", 0.3, 3, 8, 0.4);
      gsap.set(q(".s04-g"), { opacity: 0 });
      tl.fromTo(q(".s04-g"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, TE);
      // el calendario: aparece y las hojas pasan sin llegar nunca al lunes
      pop(".s04-cal", 1.2);
      const H = qa(".s04-hoja");
      H.forEach((h, i) => gsap.set(h, { zIndex: 20 - i }));
      H.slice(0, -1).forEach((h, i) => tl.to(h, { y: -420, rotation: -14, opacity: 0, duration: 0.14, ease: "power2.in" }, LUNES - 0.4 + i * 0.13));
      golpe(".s04-sello", NUNCA + 0.4, 2.6);
      sacudon(NUNCA + 0.45);
"""
SFX = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 0.45, "sfx": "pop", "vol": 0.3}, {"t": 1.6, "sfx": "typing", "vol": 0.3, "max": 1.2}, {"t": 3.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}]
