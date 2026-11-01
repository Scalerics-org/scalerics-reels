from base import *
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-rad { left: -70px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s03-cel { left: 520px; top: 610px; }
    [data-composition-id="%ID%"] .s03-hora { position: absolute; left: 60px; top: 600px; padding: 14px 26px 8px; background: #0d1424; border: 6px solid #ffd447; border-radius: 20px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 60px; color: #ffd447; white-space: nowrap; }
    [data-composition-id="%ID%"] .s03-est { position: absolute; right: 26px; top: 300px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; color: #1b3a6b; }
    [data-composition-id="%ID%"] .s03-cri { position: absolute; left: 40px; top: 330px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; color: #1b3a6b; opacity: 0; }
    [data-composition-id="%ID%"] .s03-cri2 { left: 170px; top: 390px; }
    [data-composition-id="%ID%"] .s03-sello { left: 520px; top: 1060px; font-size: 54px; color: #e63946; background: #f4f1e8; padding: 14px 30px 8px; border-width: 9px; }
"""
body = f"""
        <div class="fig s03-rad">{radio('s03r')}</div>
        <div class="cel s03-cel" style="width:460px;height:620px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Tienda Néstor</b><small>últ. vez: sáb 13:02</small></div>
          <div class="msg el s03-m1" style="top:170px">¿tenés el buzo<br>en talle M?<small>dom 23:00</small></div>
          <div class="s03-est">entregado</div>
          <div class="s03-cri">cri...</div><div class="s03-cri s03-cri2">cri...</div>
        </div></div>
        <div class="s03-hora">DOM 23:00</div>
        <div class="sello s03-sello">Sin respuesta</div>
"""
js = """
      const CLIENTA = 0.83, DOMINGO = 1.76, ONCE = 2.22, TENES = 3.17, BUZO = 3.52, NADIE = 4.90, CONTESTO = 5.18;
      // cuadro 0: el Pocho con el micrófono y el celular ya en mano
      brazoSet("s03r", "i", 8); brazoSet("s03r", "d", -10);
      habla(".s03r-boca", 0.0, 5.9, "230 258");
      tl.fromTo(q(".s03-rad"), { x: -80 }, { x: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      vaiven(q(".s03-rad"), 0.4, 5.6, { rotation: 1.5 }, 0.5);
      tl.fromTo(q(".s03-cel"), { y: 60, rotation: 4 }, { y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      pop(q(".s03-hora"), DOMINGO, 0.3);
      tl.fromTo(q(".s03-hora"), { rotation: 0 }, { rotation: -4, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ONCE);
      pop(q(".s03-m1"), TENES, 0.3, { transformOrigin: "0% 100%" });
      gsap.set(q(".s03-est"), { opacity: 0 });
      tl.to(q(".s03-est"), { opacity: 1, duration: 0.2 }, BUZO + 0.6);
      // y nadie le contestó
      tl.to(q(".s03-cri"), { opacity: 1, duration: 0.15 }, NADIE - 0.3);
      tl.to(q(".s03-cri2"), { opacity: 1, duration: 0.15 }, NADIE + 0.2);
      tl.fromTo(qa(".s03-cri"), { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, NADIE - 0.3);
      golpe(q(".s03-sello"), CONTESTO + 0.1, -8, 2.6);
      sacudon(CONTESTO + 0.15, 1.6);
      tl.to(q(".s03r-cejas"), { y: -10, duration: 0.2 }, CONTESTO);
"""
sfx = [{"t": 1.75, "sfx": "pop", "vol": 0.28}, {"t": 3.1, "sfx": "notification", "vol": 0.28}, {"t": 4.7, "sfx": "click-soft", "vol": 0.2},
       {"t": 5.3, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 5.35, "sfx": "glitch-1", "vol": 0.18, "max": 0.3}]
escena("s03-mensaje", p, 6.22, css, body, js, sfx)
