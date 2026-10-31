from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-nov { left: 10px; top: 800px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s06-cel { left: 520px; top: 700px; }
    [data-composition-id="%ID%"] .s06-big { top: 570px; font-size: 98px; }
    [data-composition-id="%ID%"] .s06-cnt { position: absolute; left: 70px; top: 1170px; width: 240px; padding: 14px 0 8px; text-align: center; background: #9b2445; border: 6px solid #2a1220; border-radius: 22px; box-shadow: 6px 6px 0 #2a1220; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; line-height: 1.1; color: #fbf4e6; }
"""
body = f"""
        <div class="fig s06-nov">{novia('s06n')}</div>
        <div class="cel s06-cel" style="width:480px;height:780px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Calzados Ricardo</b><small>últ. vez lun 09:15</small></div>
          <div class="msg yo s06-m0" style="top:170px">¿Tenés las botas en 38?<small>sáb 22:47 · visto</small></div>
          <div class="msg yo s06-m1" style="top:300px">¿?<small>dom 11:02</small></div>
          <div class="msg yo s06-m2" style="top:400px">holaaa<small>dom 15:30</small></div>
          <div class="msg yo s06-m3" style="top:500px">¿las tenés?<small>dom 20:14</small></div>
          <div class="msg el s06-m4" style="top:610px">pasá el lunes<small>lun 09:15</small></div>
        </div></div>
        <div class="s06-cnt">3 mensajes<br>sin respuesta</div>
        <div class="big a s06-big">«Pasá el lunes»</div>
"""
js = """
      const INSISTI = 0.06, PUSISTE = 1.17, PASA = 2.03;
      gsap.set(q(".s06n-bd"), { rotation: -95, svgOrigin: "248 296" });
      gsap.set(q(".s06n-cejas"), { rotation: 8, svgOrigin: "200 180" });
      habla(".s06n-boca", 0.0, 2.9, "200 238");
      tl.fromTo(q(".s06-cel"), { rotation: -2 }, { rotation: 1, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s06-m0"), { opacity: 1 }, { opacity: 0.45, duration: 0.3 }, 0);
      [".s06-m1", ".s06-m2", ".s06-m3"].forEach((s, i) => pop(q(s), INSISTI + 0.05 + i * 0.25, 0.25, { transformOrigin: "100% 100%" }));
      tl.to(q(".s06n-bd"), { rotation: -120, svgOrigin: "248 296", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, INSISTI);
      pop(q(".s06-cnt"), INSISTI + 0.8, 0.3);
      tl.to(q(".s06-cnt"), { rotation: -4, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, INSISTI + 1.1);
      pop(q(".s06-m4"), PUSISTE + 0.1, 0.3, { transformOrigin: "0% 100%" });
      golpe(q(".s06-big"), PASA, -3, 2.6);
      sacudon(PASA + 0.05, 1.3);
      tl.to(q(".s06-nov"), { rotation: -6, transformOrigin: "50% 100%", duration: 0.2 }, PASA);
"""
sfx = [{"t": 0.1, "sfx": "key-press", "vol": 0.25}, {"t": 0.35, "sfx": "key-press", "vol": 0.25}, {"t": 0.6, "sfx": "key-press", "vol": 0.25},
       {"t": 1.27, "sfx": "notification", "vol": 0.25}, {"t": 2.0, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s06-lunes", p, 3.23, css, body, js, sfx)
