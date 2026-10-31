from base import *
p = "s05"
css = """
    [data-composition-id="%ID%"] .s05-url { position: absolute; left: 24px; right: 24px; top: 70px; height: 70px; border-radius: 35px; background: #fff; border: 5px solid #0b0f1a; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; line-height: 60px; padding-left: 24px; color: #1d2f55; white-space: nowrap; overflow: hidden; }
    [data-composition-id="%ID%"] .s05-rueda { position: absolute; left: 140px; top: 220px; width: 280px; height: 280px; }
    [data-composition-id="%ID%"] .s05-cargando { position: absolute; left: 0; right: 0; top: 530px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.12em; color: #1d2f55; }
    [data-composition-id="%ID%"] .s05-gira { top: 1290px; font-size: 130px; }
    [data-composition-id="%ID%"] .s05-reloj { left: 650px; top: 560px; width: 330px; height: 330px; }
    [data-composition-id="%ID%"] .s05-hor { left: 40px; top: 1290px; color: #ff3b30; font-size: 76px; }
"""
rueda = f'<svg viewBox="0 0 280 280"><g class="s05-r">' + "".join(
    f'<rect x="130" y="20" width="20" height="62" rx="10" fill="{L if i < 8 else K}" opacity="{0.25 + i * 0.065:.2f}" transform="rotate({i * 30} 140 140)"/>' for i in range(12)) + '</g></svg>'
reloj = f'''<svg viewBox="0 0 330 330"><circle cx="165" cy="165" r="140" fill="{C}" {S} stroke-width="10"/>
  {"".join(f'<path d="M165 40 V60" stroke="{K}" stroke-width="8" transform="rotate({i * 30} 165 165)"/>' for i in range(12))}
  <path class="s05-hh" d="M165 165 V95" stroke="{K}" stroke-width="14" stroke-linecap="round"/><path class="s05-mm" d="M165 165 V60" stroke="{R}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="165" cy="165" r="12" fill="{K}"/>
  <text x="250" y="110" font-family="Lexend" font-weight="900" font-size="90" fill="{Y}" stroke="{K}" stroke-width="8" paint-order="stroke fill">?</text></svg>'''
pant = f'''<div class="s05-url">lodedonanelida.com.uy</div><div class="s05-rueda">{rueda}</div><div class="s05-cargando">CARGANDO...</div>'''
body = f"""
        {celular('s05-cel', 560, 700, pant, 120, 580)}
        <div class="big l s05-gira">GIRA Y GIRA</div>
        <div class="obj s05-reloj">{reloj}</div>
        <div class="sello s05-hor">HORARIO: ¿?</div>
"""
js = """
      const GIRA2 = 0.37, NO = 1.11, HORA = 1.76;
      tl.fromTo(q(".s05-cel"), { scale: 0.92, rotation: 3, opacity: 0.7 }, { scale: 1, rotation: -3, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s05-r"), { rotation: 0, svgOrigin: "140 140" }, { rotation: 360 * 5, svgOrigin: "140 140", duration: 2.7, ease: "none" }, 0);
      tl.fromTo(q(".s05-cargando"), { opacity: 1 }, { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, 0);
      golpe(q(".s05-gira"), 0.12, -3, 2.2);
      tl.to(q(".s05-gira"), { rotation: 3, duration: 0.12, yoyo: true, repeat: 5 }, GIRA2);
      tl.to(q(".s05-gira"), { opacity: 0, y: 60, duration: 0.2 }, NO - 0.15);
      pop(q(".s05-reloj"), NO, 0.3);
      tl.fromTo(q(".s05-mm"), { rotation: 0, svgOrigin: "165 165" }, { rotation: 1080, svgOrigin: "165 165", duration: 1.5, ease: "power1.in", immediateRender: false }, NO);
      tl.fromTo(q(".s05-hh"), { rotation: 0, svgOrigin: "165 165" }, { rotation: -540, svgOrigin: "165 165", duration: 1.5, ease: "power1.in", immediateRender: false }, NO);
      golpe(q(".s05-hor"), HORA + 0.1, -4, 2.6);
      sacudon(HORA + 0.12, 1.2);
"""
sfx = [{"t": 0.05, "sfx": "click-soft", "vol": 0.25}, {"t": 0.12, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 1.1, "sfx": "pop", "vol": 0.3},
       {"t": 1.3, "sfx": "riser", "vol": 0.2, "max": 0.6}, {"t": 1.85, "sfx": "error", "vol": 0.28, "max": 0.7}]
escena("s05-pagina", p, 2.68, css, body, js, sfx)
