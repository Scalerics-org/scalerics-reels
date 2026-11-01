from base import *
p = "s05"
css = """
    [data-composition-id="%ID%"] .s05-vale { left: -70px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s05-cel { left: 520px; top: 610px; }
    [data-composition-id="%ID%"] .s05-cel { box-shadow: 0 0 0 6px #e63946, 12px 12px 0 6px #0d1424; }
    [data-composition-id="%ID%"] .s05-cel .head { background: #e63946; }
    [data-composition-id="%ID%"] .s05-cel .head small { color: #f4f1e8; }
    [data-composition-id="%ID%"] .s05-foto { position: absolute; right: 18px; top: 370px; width: 180px; height: 150px; background: #6cc4ff; border: 4px solid #0d1424; border-radius: 18px; }
    [data-composition-id="%ID%"] .s05-foto svg { width: 100%; height: 100%; }
    [data-composition-id="%ID%"] .s05-tag { position: absolute; left: 520px; top: 560px; padding: 8px 18px 4px; background: #e63946; border: 5px solid #0d1424; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 32px; color: #f4f1e8; white-space: nowrap; }
    [data-composition-id="%ID%"] .s05-gol { top: 860px; font-size: 250px; }
"""
buzo = f'''<svg viewBox="0 0 200 170" aria-hidden="true"><path d="M70 30 Q100 46 130 30 L170 50 L156 86 L140 78 L140 150 L60 150 L60 78 L44 86 L30 50 Z" fill="{Y}" stroke="{K}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M84 34 Q100 60 116 34" stroke="{K}" stroke-width="4" fill="none"/><text x="100" y="128" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="{K}">M</text></svg>'''
body = f"""
        <div class="fig s05-vale">{periodista('s05v')}</div>
        <div class="s05-tag">EL DE ENFRENTE</div>
        <div class="cel s05-cel" style="width:460px;height:630px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Clienta nueva</b><small>en línea</small></div>
          <div class="msg el s05-m1" style="top:150px">¿tenés el buzo<br>en talle M?<small>dom 23:00</small></div>
          <div class="msg yo s05-m2" style="top:285px">¡Sí! Te mando foto<small>23:00</small></div>
          <div class="s05-foto">{buzo}</div>
          <div class="msg el s05-m3" style="top:528px">¡Me lo llevo!<small>23:01</small></div>
        </div></div>
        <div class="big y s05-gol">¡Gol!</div>
"""
js = """
      const ENFRENTE = 0.19, CONTESTO = 0.85, TOQUE = 1.33, MANDO = 2.0, FOTO = 2.47, BUZO = 2.95, CERRO = 3.62;
      brazoSet("s05v", "i", 8); brazoSet("s05v", "d", -10);
      habla(".s05v-boca", 0.0, 4.0, "230 250");
      tl.fromTo(q(".s05-vale"), { x: -80 }, { x: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      vaiven(q(".s05-vale"), 0.4, 3.8, { rotation: 1.5 }, 0.45);
      entra(q(".s05-cel"), 0.0, { x: 500 }, 0.35);
      pop(q(".s05-tag"), ENFRENTE, 0.3);
      pop(q(".s05-m2"), TOQUE - 0.1, 0.3, { transformOrigin: "100% 100%" });
      pop(q(".s05-foto"), FOTO, 0.35, { transformOrigin: "100% 0%" });
      tl.fromTo(q(".s05-foto"), { rotation: 0 }, { rotation: 3, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, BUZO);
      pop(q(".s05-m3"), CERRO - 0.35, 0.3, { transformOrigin: "0% 100%" });
      golpe(q(".s05-gol"), CERRO + 0.05, -6, 3);
      sacudon(CERRO + 0.1, 2);
      brazo("s05v", "i", 60, CERRO);
"""
sfx = [{"t": 0.0, "sfx": "notification", "vol": 0.22}, {"t": 1.25, "sfx": "notification", "vol": 0.28}, {"t": 2.45, "sfx": "pop", "vol": 0.28},
       {"t": 3.3, "sfx": "notification", "vol": 0.22}, {"t": 3.55, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 3.6, "sfx": "sparkle", "vol": 0.25}]
escena("s05-al-toque", p, 4.49, css, body, js, sfx)
