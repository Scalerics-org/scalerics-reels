ID = "s11-tres-am"; DUR = 7.57
CSS = """
    $ .s11-reloj { position: absolute; left: 540px; top: 600px; width: 460px; padding: 16px 0 10px; text-align: center; background: #0b080b; border: 7px solid #fff3d6; border-radius: 22px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 110px; color: #5ce611; line-height: 1; }
    $ .s11-reloj small { display: block; margin-top: 6px; font-size: 26px; letter-spacing: 0.3em; color: #fff3d6; }
    $ .s11-item { position: absolute; left: 470px; width: 560px; display: flex; align-items: center; gap: 22px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; color: #fff3d6; text-transform: uppercase; }
    $ .s11-box { position: relative; flex: none; width: 64px; height: 64px; border: 6px solid #5ce611; border-radius: 12px; }
    $ .s11-box svg { position: absolute; left: -6px; top: -6px; width: 64px; height: 64px; }
    $ .s11-g { position: absolute; left: 470px; top: 1240px; width: 560px; }
    $ .s11-g small { display: block; margin-bottom: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.14em; color: #f6c544; }
    $ .s11-g div { padding: 18px 24px 16px; background: #5ce611; color: #0b080b; border-radius: 26px; border-bottom-right-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; line-height: 1.15; }
"""
def item(k, y, txt):
    return f'<div class="s11-item s11-i{k}" style="top:{y}px"><div class="s11-box"><svg viewBox="0 0 64 64"><path class="s11-t{k}" d="M14 34 L27 47 L52 18" fill="none" stroke="#5ce611" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg></div>{txt}</div>'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-luna"><path d="M150 640 C110 680 120 760 180 780 C140 790 90 760 84 710 C78 660 110 630 150 640 Z" fill="#f6c544" /></g>
          """ + PISO("s11", 230, 1460, 220, 46) + """
          <g class="s11-ag"><g transform="translate(55 880) scale(0.95)">""" + AGENTE("s11") + """</g></g>
        </svg>
        <div class="s11-reloj"><span class="s11-hora">03:00</span><small>A. M. · CERRADO</small></div>
        """ + item(1, 880, "Precios ✓".replace(" ✓", "")) + item(2, 980, "Horarios") + item(3, 1080, "Turno agendado") + """
        <div class="s11-g"><small>AL QUE PREGUNTÓ Y NO COMPRÓ:</small><div>¡Hola! ¿Te guardo la campera para mañana?</div></div>
"""
JS = """
      const BUENAS = 0, TRES = 1.72, PRECIOS = 3.36, HORARIOS = 4.05, AGENDE = 4.57, ESCRIBI = 6.03;
      tl.fromTo(q(".s11-ag"), { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)" }, 0);
      // reverencia
      tl.to(q(".s11-ag"), { rotation: 12, svgOrigin: "225 1400", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.4);
      tl.fromTo(q(".s11-ag-boca"), { scaleY: 1, svgOrigin: "180 318" }, { scaleY: 0.4, svgOrigin: "180 318", duration: 0.12, yoyo: true, repeat: 55, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(q(".s11-ag"), { y: 0 }, { y: -14, duration: 0.3, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, 1.0);
      pop(".s11-luna", 0.2);
      tl.to(q(".s11-luna"), { rotation: 10, svgOrigin: "130 710", duration: 1, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.5);
      golpe(".s11-reloj", TRES, 1.8);
      tl.fromTo(q(".s11-hora"), { opacity: 1 }, { opacity: 0.3, duration: 0.5, yoyo: true, repeat: 10, ease: "steps(1)", immediateRender: false }, TRES + 0.4);
      [[1, PRECIOS], [2, HORARIOS], [3, AGENDE]].forEach(([k, t]) => {
        gsap.set(q(".s11-i" + k), { opacity: 0 });
        tl.fromTo(q(".s11-i" + k), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t - 0.15);
        dibujar(".s11-t" + k, t + 0.05, 0.2);
        tl.fromTo(q(".s11-ag-bd"), { rotation: 0, svgOrigin: "296 300" }, { rotation: -35, svgOrigin: "296 300", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, t);
      });
      gsap.set(q(".s11-g"), { opacity: 0 });
      tl.fromTo(q(".s11-g"), { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, ESCRIBI - 0.1);
"""
SFX = [{"t": 0.1, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.72, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 3.36, "sfx": "ping", "vol": 0.3}, {"t": 4.05, "sfx": "ping", "vol": 0.3}, {"t": 4.57, "sfx": "ping", "vol": 0.3}, {"t": 5.95, "sfx": "notification", "vol": 0.32}]
