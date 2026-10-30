ID = "s03-visto"; DUR = 5.46
CSS = """
    $ .s03-cartela { left: 230px; top: 600px; background: #f6c544; color: #0b080b; font-size: 52px; }
    $ .s03-uh { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; letter-spacing: 0.12em; color: #fff3d6; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s03", "s03-h", 330, 330, 60, 520, 0, 1480) + """
          """ + PISO("s03", 330, 1450, 280, 56) + """
          <g class="s03-maxi"><g transform="translate(130 840) scale(1.1)">""" + MAXI("s03") + """</g></g>
          """ + TILDES("s03", "s03-tt", 840, 1080, 1.7) + """
        </svg>
        <div class="cartela s03-cartela">PRIMER NÚMERO</div>
        """ + GLOBO("s03", "s03-g", 560, 800, 440, "¿Precio de la campera?", "izq", fs=44) + """
        <div class="s03-uh s03-u1" style="left:110px;top:1490px">UUUH</div>
        <div class="s03-uh s03-u2" style="left:440px;top:1510px">UUUUH</div>
        <div class="s03-uh s03-u3" style="left:800px;top:1480px">UUH</div>
"""
JS = """
      const PRIMER = 1.14, PREGUNTAN = 2.50, Y = 4.19, VISTO = 4.33;
      entra(".s03-maxi", 0, { x: -400 });
      tl.fromTo(q(".s03-brazo"), { rotation: 0, svgOrigin: "300 460" }, { rotation: -25, svgOrigin: "300 460", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.25);
      habla(".s03-boca", 0, 0.6, "182 291");
      golpe(".s03-cartela", PRIMER);
      sacudon(PRIMER + 0.04, 0.7);
      respira(".s03-maxi", 0.6, 4.6, 8, 0.45);
      gsap.set(q(".s03-g"), { opacity: 0 });
      tl.fromTo(q(".s03-g"), { opacity: 0, scale: 0.5, x: -60 }, { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, PREGUNTAN);
      tl.to(q(".s03-g"), { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, PREGUNTAN + 0.35);
      // Maxi lo mira de reojo... y visto
      tl.fromTo(q(".s03-ojos"), { x: 0 }, { x: 8, duration: 0.15, immediateRender: false }, Y - 0.3);
      dibujar(".s03-tt path", VISTO, 0.25);
      tl.fromTo(q(".s03-tt"), { scale: 1.6, svgOrigin: "840 1080" }, { scale: 1, svgOrigin: "840 1080", duration: 0.25, ease: "back.out(2)", immediateRender: false }, VISTO);
      sacudon(VISTO + 0.05, 1.2);
      tl.to(q(".s03-g"), { rotation: -6, y: 30, duration: 0.4, ease: "power2.out" }, VISTO + 0.1);
      ["1", "2", "3"].forEach((k, i) => {
        gsap.set(q(".s03-u" + k), { opacity: 0 });
        tl.fromTo(q(".s03-u" + k), { opacity: 0, y: 60 }, { opacity: 0.8, y: -40, duration: 0.6, ease: "power2.out", immediateRender: false }, VISTO + 0.2 + i * 0.12);
      });
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.12, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.5, "sfx": "notification", "vol": 0.35}, {"t": 4.33, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 4.36, "sfx": "click", "vol": 0.3}]
