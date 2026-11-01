from base import *
p = "s14"
css = """
    [data-composition-id="%ID%"] .s14-tab { position: absolute; left: 150px; top: 600px; width: 780px; height: 300px; background: #0d1424; border: 10px solid #f4f1e8; border-radius: 26px; box-shadow: 12px 12px 0 #5ce611; }
    [data-composition-id="%ID%"] .s14-tab small { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.3em; color: #f4f1e8; }
    [data-composition-id="%ID%"] .s14-row { position: absolute; left: 36px; right: 36px; height: 100px; font-family: "IBM Plex Mono", monospace; font-weight: 600; white-space: nowrap; }
    [data-composition-id="%ID%"] .s14-row i { position: absolute; left: 0; top: 22px; font-style: normal; font-size: 30px; padding: 6px 12px 2px; border-radius: 8px; color: #0d1424; }
    [data-composition-id="%ID%"] .s14-row b { position: absolute; left: 150px; top: 14px; font-size: 52px; }
    [data-composition-id="%ID%"] .s14-sale { top: 70px; } [data-composition-id="%ID%"] .s14-sale i { background: #e63946; } [data-composition-id="%ID%"] .s14-sale b { color: #e63946; }
    [data-composition-id="%ID%"] .s14-entra { top: 170px; } [data-composition-id="%ID%"] .s14-entra i { background: #5ce611; } [data-composition-id="%ID%"] .s14-entra b { color: #5ce611; }
    [data-composition-id="%ID%"] .s14-cel { left: 290px; top: 620px; box-shadow: 0 0 0 6px #5ce611, 12px 12px 0 6px #0d1424; }
    [data-composition-id="%ID%"] .s14-cel .head { background: #0d1424; }
    [data-composition-id="%ID%"] .s14-cel .head i { background: #5ce611; }
    [data-composition-id="%ID%"] .s14-cel .head small { color: #5ce611; }
    [data-composition-id="%ID%"] .s14-cel .msg.yo { background: #5ce611; }
    [data-composition-id="%ID%"] .s14-chip { position: absolute; padding: 10px 20px 6px; background: #0d1424; border: 5px solid #5ce611; border-radius: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.1em; color: #5ce611; white-space: nowrap; }
    [data-composition-id="%ID%"] .s14-c1 { left: 40px; top: 760px; } [data-composition-id="%ID%"] .s14-c2 { left: 60px; top: 860px; }
    [data-composition-id="%ID%"] .s14-c3 { left: 40px; top: 960px; }
    [data-composition-id="%ID%"] .s14-pase { position: absolute; left: 600px; top: 1330px; padding: 14px 22px 10px; background: #ffd447; border: 5px solid #0d1424; border-radius: 18px; box-shadow: 8px 8px 0 #0d1424; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; color: #0d1424; white-space: nowrap; }
    [data-composition-id="%ID%"] .s14-pase small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; }
"""
body = f"""
        <div class="s14-tab"><small>CAMBIO</small>
          <div class="s14-row s14-sale"><i>SALE</i><b>el visto</b></div>
          <div class="s14-row s14-entra"><i>ENTRA</i><b>tu agente de IA</b></div></div>
        <div class="cel s14-cel" style="width:500px;height:800px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Tienda Néstor</b><small>agente de IA · en línea</small></div>
          <div class="msg el s14-m1" style="top:160px">¿tenés el buzo en M?<small>dom 23:00</small></div>
          <div class="msg yo s14-m2" style="top:290px">¡Sí! En azul y en gris.<br>¿Te lo reservo?<small>23:00</small></div>
          <div class="msg el s14-m3" style="top:460px">Dale, paso mañana<small>23:01</small></div>
          <div class="msg yo s14-m4" style="top:580px">Reservado a tu nombre<small>23:01</small></div>
        </div></div>
        <div class="s14-chip s14-c1">24 HORAS</div>
        <div class="s14-chip s14-c2">PRECIOS</div>
        <div class="s14-chip s14-c3">STOCK</div>
        <div class="s14-pase">Te paso con Néstor<small>para vos · 1 charla</small></div>
"""
js = """
      const JUGADOR = 0.18, ARMAMOS = 0.82, SCALERICS = 1.27, AGENTE = 2.09, ATIENDE = 2.91, WHATSAPP = 3.27, CUALQUIER = 3.73, PRECIOS = 4.91, STOCK = 5.36, PASA = 6.0, CHARLA = 6.36, VOS = 7.18;
      // cuadro 0: el tablero del cambio
      tl.fromTo(q(".s14-tab"), { scale: 0.7, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s14-sale"), { opacity: 1 }, { opacity: 0.3, duration: 0.2, ease: "steps(1)", yoyo: true, repeat: 5, immediateRender: false }, 0.2);
      pop(q(".s14-entra"), ARMAMOS, 0.3, { transformOrigin: "0% 50%" });
      tl.fromTo(q(".s14-entra b"), { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, SCALERICS);
      tl.to(q(".s14-tab"), { y: -80, opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.in" }, AGENTE - 0.25);
      // el celular con el agente
      entra(q(".s14-cel"), AGENTE - 0.05, { y: 700 }, 0.4);
      pop(q(".s14-m1"), ATIENDE, 0.3, { transformOrigin: "0% 100%" });
      pop(q(".s14-m2"), WHATSAPP + 0.1, 0.3, { transformOrigin: "100% 100%" });
      pop(q(".s14-c1"), CUALQUIER, 0.3);
      pop(q(".s14-c2"), PRECIOS, 0.3);
      pop(q(".s14-m3"), PRECIOS + 0.2, 0.3, { transformOrigin: "0% 100%" });
      pop(q(".s14-c3"), STOCK, 0.3);
      pop(q(".s14-m4"), STOCK + 0.3, 0.3, { transformOrigin: "100% 100%" });
      vaiven(q(".s14-cel"), 2.6, 5, { y: -8 }, 0.6);
      // te pasa la charla cuando es para vos
      gsap.set(q(".s14-pase"), { opacity: 0 });
      tl.fromTo(q(".s14-pase"), { opacity: 1, x: 500 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, PASA);
      tl.to(q(".s14-pase"), { rotation: -3, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, VOS - 0.3);
"""
sfx = [{"t": 0.05, "sfx": "chime", "vol": 0.25, "max": 1.0}, {"t": 0.8, "sfx": "ping", "vol": 0.28}, {"t": 2.05, "sfx": "whoosh", "vol": 0.22, "max": 0.6},
       {"t": 2.9, "sfx": "notification", "vol": 0.25}, {"t": 3.4, "sfx": "notification", "vol": 0.25}, {"t": 4.9, "sfx": "pop", "vol": 0.22},
       {"t": 5.4, "sfx": "pop", "vol": 0.22}, {"t": 6.0, "sfx": "whoosh-short", "vol": 0.22}]
escena("s14-scalerics", p, 7.71, css, body, js, sfx)
