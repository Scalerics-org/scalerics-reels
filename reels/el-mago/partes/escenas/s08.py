ID = "s08-uno-por-uno"; DUR = 3.85
CSS = """
    $ .s08-env { position: absolute; left: 470px; width: 500px; padding: 12px 18px 10px; background: #45dcf0; border-radius: 18px; border-bottom-right-radius: 4px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; line-height: 1.1; color: #0a0610; }
    $ .s08-env small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; color: #2b1250; }
    $ .s08-uh { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 200px; line-height: 1; color: #ff4fa3; text-shadow: 0 0 34px rgba(255, 79, 163, 0.6); }
"""
nombres = ["Rubén", "Marta", "Sra. empanadas", "Walter", "Doña Elsa", "Gustavo"]
env = "".join(f'<div class="s08-env s08-e{i}" style="top:{880 + i * 96}px"><small>A {n.upper()}</small>Tu pedido está listo</div>' for i, n in enumerate(nombres))
pub = "".join(f'<g class="s08-pub"><circle cx="{x}" cy="1470" r="46" fill="#0a0610" stroke="#c3a2ff" stroke-width="5" /><path d="M{x-74} 1600 C{x-74} 1530 {x+74} 1530 {x+74} 1600 Z" fill="#0a0610" stroke="#c3a2ff" stroke-width="5" /></g>' for x in [90, 290, 490, 690, 890, 1060])
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-cajag"><g transform="translate(250 640) scale(0.42)">""" + CAJA("s08", "s08-c", 560, 400, 1.0) + SIERRA("s08", "s08-s", 560, 260, 1.0, 90) + """</g></g>
          <g class="s08-dueno"><g transform="translate(-20 900) scale(1.05)">""" + DUENO("s08") + """</g></g>
          """ + pub + """
        </svg>
        """ + env + """
        <div class="s08-uh">¡UUUH!</div>
"""
JS = """
      const AVISO = 0.75, PEDIDOS = 1.17, LISTOS = 1.96, UNO = 2.0, POR = 2.30, UNO2 = 2.59, UH = 2.92;
      // la sierra quedó trabada a la mitad
      tl.fromTo(q(".s08-s"), { rotation: -3, svgOrigin: "560 260" }, { rotation: 3, svgOrigin: "560 260", duration: 0.1, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s08-dueno"), { x: -300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s08-boca", 0, 2.8, "180 294");
      tl.fromTo(q(".s08-pantalla"), { opacity: 0.5 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 23, immediateRender: false }, AVISO);
      // los avisos salen de a uno, a mano
      [AVISO, PEDIDOS, LISTOS - 0.25, UNO + 0.05, POR, UNO2].forEach((t, i) => pop(".s08-e" + i, t, { x: 60 }));
      tl.to(q(".s08-dueno"), { rotation: 2, svgOrigin: "180 1560", duration: 0.1, yoyo: true, repeat: 17, ease: "sine.inOut" }, AVISO);
      // el público: ¡uuuh!
      gsap.set(qa(".s08-pub"), { opacity: 0 });
      tl.fromTo(qa(".s08-pub"), { opacity: 1, y: 200 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: "back.out(1.6)", immediateRender: false }, UH - 0.3);
      tl.to([...qa(".s08-env"), q(".s08-cajag")], { opacity: 0.25, duration: 0.2 }, UH - 0.1);
      golpe(".s08-uh", UH, 2.2);
      sacudon(UH + 0.04, 1.0);
      tl.to(qa(".s08-pub"), { y: -14, duration: 0.12, yoyo: true, repeat: 3, stagger: 0.03 }, UH + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.75, "sfx": "click", "vol": 0.25}, {"t": 1.17, "sfx": "click", "vol": 0.25}, {"t": 1.71, "sfx": "click", "vol": 0.25}, {"t": 2.05, "sfx": "click", "vol": 0.25}, {"t": 2.3, "sfx": "click", "vol": 0.25}, {"t": 2.59, "sfx": "click", "vol": 0.25}, {"t": 2.92, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
