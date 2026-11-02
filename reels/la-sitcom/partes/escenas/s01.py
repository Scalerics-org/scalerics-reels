ID = "s01-apertura"; DUR = 8.0
LETRAS = [("D", "#f0b429"), ("o", "#1fb5a8"), ("s", "#d4581f"), (" ", ""), ("e", "#fff4e0"), ("n", "#f0b429"), (" ", ""), ("e", "#1fb5a8"), ("l", "#d4581f")]
LOCAL = [("L", "#f0b429"), ("o", "#fff4e0"), ("c", "#1fb5a8"), ("a", "#d4581f"), ("l", "#f0b429")]
def _fila(cls, letras):
    return "".join(f'<span class="s01-l {cls}" style="color:{c}">{l}</span>' if l != " " else '<span class="s01-esp"> </span>' for l, c in letras)
CSS = """
    $ .s01-titulo { position: absolute; inset: 0; background: #5b2a86; }
    $ .s01-rayos { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    $ .s01-nombre { position: absolute; left: 0; right: 0; text-align: center; font-family: "Fredoka", sans-serif; font-weight: 700; line-height: 0.92; white-space: nowrap; }
    $ .s01-n1 { top: 600px; font-size: 150px; }
    $ .s01-n2 { top: 750px; font-size: 230px; }
    $ .s01-l { display: inline-block; -webkit-text-stroke: 8px #24122f; paint-order: stroke fill; text-shadow: 0 10px 0 #24122f; }
    $ .s01-esp { display: inline-block; width: 40px; }
    $ .s01-cred { position: absolute; top: 1440px; width: 400px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.2em; color: #fff4e0; }
    $ .s01-temp { position: absolute; left: 0; right: 0; top: 1030px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.4em; color: #f0b429; }
"""
RAYOS = "".join(f'<path d="M540 900 L{540 + 1600 * __import__("math").cos(k * 0.2618):.0f} {900 + 1600 * __import__("math").sin(k * 0.2618):.0f} L{540 + 1600 * __import__("math").cos(k * 0.2618 + 0.13):.0f} {900 + 1600 * __import__("math").sin(k * 0.2618 + 0.13):.0f} Z" fill="#8a4cc2" opacity="0.55" />' for k in range(24))
HTML = """
        <div class="s01-living">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + VENTANA("s01", 120, 600, 330, 380, noche=False) + LAMPARA("s01", 960, 700, 760) + """
          <g class="s01-du"><g transform="translate(90 600) scale(1.3)">""" + DUENO("s01", "cansado") + """</g></g>
          """ + SILLON("s01", 40, 1170, 1000, 330) + """
          <g class="s01-ag"><g transform="translate(600 760) scale(1.0)">""" + AGENTE("s01", "feliz", brazo="saluda") + """</g></g>
        </svg>
        """ + CARTEL("s01", "s01-mejor", 70, 560, "¡MEJOR QUE YO!", fondo="#f0b429", fs=64, rot=-7) + """
        """ + RELOJ("s01", "s01-hora", 640, 610, "3:00", 6) + """
        </div>
        <div class="s01-titulo">
          <svg class="s01-rayos" viewBox="0 0 1080 1920" aria-hidden="true"><g class="s01-ray">""" + RAYOS + """</g>
            <g class="s01-f1"><circle cx="300" cy="1270" r="140" fill="#1fb5a8" stroke="#24122f" stroke-width="10" />
              <defs><clipPath id="s01-c1"><circle cx="300" cy="1270" r="134" /></clipPath><clipPath id="s01-c2"><circle cx="780" cy="1270" r="134" /></clipPath></defs>
              <g clip-path="url(#s01-c1)"><g transform="translate(180 1160) scale(0.66)">""" + DUENO("s01b", "feliz") + """</g></g></g>
            <g class="s01-f2"><circle cx="780" cy="1270" r="140" fill="#d4581f" stroke="#24122f" stroke-width="10" />
              <g clip-path="url(#s01-c2)"><g transform="translate(672 1150) scale(0.62)">""" + AGENTE("s01c", "guino") + """</g></g></g>
          </svg>
          <div class="s01-nombre s01-n1">""" + _fila("s01-a", LETRAS) + """</div>
          <div class="s01-nombre s01-n2">""" + _fila("s01-b", LOCAL) + """</div>
          <div class="s01-temp">TEMPORADA 1</div>
          <div class="s01-cred" style="left:100px">EL DUEÑO</div>
          <div class="s01-cred" style="left:580px">EL AGENTE DE IA</div>
        </div>
"""
JS = """
      const COMP = 0.18, MEJOR = 2.59, TRES = 4.35, AP = 5.24;
      // arranca armado (el cuadro 0 no puede estar negro), con acercamiento de cámara
      tl.fromTo(q(".s01-living"), { scale: 1.1, transformOrigin: "30% 55%" }, { scale: 1, transformOrigin: "30% 55%", duration: 1.0, ease: "power3.out", immediateRender: false }, 0);
      habla(".s01-boca", 0, 3.3, "180 290");
      habla(".s01-boca", 3.95, 1.1, "180 290");
      tl.fromTo(q(".s01-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.22, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, COMP);
      respira(".s01-ag", 0, 5, -10, 0.45);
      // "mejor que yo": cartel y el dueño se hunde
      golpe(".s01-mejor", MEJOR, 2.4); sacudon(MEJOR + 0.04, 0.8);
      tl.to(q(".s01-du"), { y: 30, duration: 0.4, ease: "power2.out" }, MEJOR + 0.2);
      tl.to(q(".s01-ag-ojos"), { scaleY: 0.1, svgOrigin: "180 220", duration: 0.08, yoyo: true, repeat: 1 }, MEJOR + 0.6);
      // "a las tres": reloj
      golpe(".s01-hora", TRES, 2.2); sacudon(TRES + 0.04, 0.9);
      zoom(TRES + 0.1, 1.06, 0.4, "70%", "55%");
      // APERTURA "Dos en el Local"
      gsap.set(q(".s01-titulo"), { opacity: 0 });
      tl.to([q(".s01-mejor"), q(".s01-hora")], { opacity: 0, duration: 0.05 }, AP + 0.25);
      tl.fromTo(q(".s01-titulo"), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out", immediateRender: false }, AP);
      tl.fromTo(q(".s01-ray"), { rotation: 0, svgOrigin: "540 900" }, { rotation: 20, svgOrigin: "540 900", duration: DUR - AP, ease: "none", immediateRender: false }, AP);
      qa(".s01-l").forEach((el, i) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: -160, rotation: (i % 2 ? 12 : -12) }, { opacity: 1, y: 0, rotation: 0, duration: 0.32, ease: "back.out(2.6)", immediateRender: false }, AP + 0.2 + i * 0.07);
      });
      pop(".s01-temp", AP + 1.2);
      pop(".s01-f1", AP + 1.25); pop(".s01-f2", AP + 1.4);
      qa(".s01-cred").forEach((el, i) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, AP + 1.35 + i * 0.15); });
      tl.fromTo(q(".s01-n2"), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, AP + 1.3);
"""
SFX = [{"t": 2.55, "sfx": "pop", "vol": 0.35}, {"t": 4.3, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 5.3, "sfx": "sparkle", "vol": 0.3}, {"t": 6.5, "sfx": "pop", "vol": 0.25}]
