from base import escena
from personajes import *
css = '''
    SC .s02-cartel { position: absolute; left: 590px; top: 706px; width: 380px; height: 96px; border-radius: 48px; background: #4b2537; border: 5px solid #c99a3c; }
    SC .s02-ct { left: 0; right: 0; top: 18px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; letter-spacing: 0.18em; color: #6b4655; }
'''
cuerpo = f'''
          {bambalina("s02", 60, 1020, 596)}
          {cortina_mitad("s02", "i", 60, 300, 650, 1330)}
          {cortina_mitad("s02", "d", 780, 1020, 650, 1330)}
          <g transform="translate(790 1010) scale(0.62)">{sillon("s02")}</g>
          <g class="s02-aldo-g"><g transform="translate(790 940) scale(0.62)">{aldo("s02")}</g></g>
          <g transform="translate(560 1290) scale(0.9)">{flores("s02")}</g>
          <g class="s02-cond-g"><g transform="translate(330 880) scale(0.95)">{conductora("s02")}</g></g>
'''
html = '''
        <div class="s02-cartel"><div class="s02-ct">APLAUSOS</div></div>
'''
js = '''
      const BIEN = 0.0, VOLVER = 0.82, VERTE = 1.15, DON = 1.39, CONTENOS = 2.29;
      tl.fromTo(q(".escenario"), { scale: 1.05, transformOrigin: "540px 960px" }, { scale: 1, duration: 1.2, ease: "power2.out" }, 0);
      tl.fromTo(q(".s02-cond-g"), { x: -120 }, { x: 0, duration: 0.45, ease: "back.out(1.6)" }, 0);
      // la conductora saluda con el micrófono
      tl.to(q(".s02-mic"), { rotation: -10, svgOrigin: "118 300", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.2);
      // el cartel de APLAUSOS se prende
      tl.to(q(".s02-ct"), { color: "#c99a3c", duration: 0.05 }, VOLVER);
      tl.fromTo(q(".s02-cartel"), { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, VOLVER);
      tl.to(q(".s02-ct"), { opacity: 0.4, duration: 0.12, yoyo: true, repeat: 5, ease: "steps(1)" }, VERTE + 0.3);
      // "Don Aldo": la cámara va hacia él; "contenos": el micrófono lo apunta
      tl.to(q(".escenario"), { x: -120, scale: 1.12, transformOrigin: "790px 960px", duration: 0.6, ease: "power2.inOut" }, DON);
      tl.to(q(".s02-mic"), { rotation: 28, svgOrigin: "118 300", duration: 0.35, ease: "back.out(2)" }, CONTENOS - 0.1);
      tl.to(q(".s02-aldo-g"), { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, CONTENOS + 0.3);
'''
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.3}, {"t": 0.82, "sfx": "click", "vol": 0.3}, {"t": 0.9, "sfx": "aplausos", "vol": 0.22, "max": 1.6}, {"t": 2.25, "sfx": "pop", "vol": 0.25}]
escena("s02-programa", css, cuerpo, js, sfx, html)
