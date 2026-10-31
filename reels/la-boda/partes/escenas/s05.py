from base import *
p = "s05"
CHAT = [("s05-m1", "yo", "¿Tenés las botas en 38?", "sáb 22:47", 170)]
css = """
    [data-composition-id="%ID%"] .s05-nov { left: 10px; top: 800px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s05-cel { left: 520px; top: 700px; }
    [data-composition-id="%ID%"] .s05-tuya { top: 560px; font-size: 156px; }
    [data-composition-id="%ID%"] .s05-botas { left: 70px; top: 600px; width: 330px; height: 310px; }
    [data-composition-id="%ID%"] .s05-visto { position: absolute; right: 30px; top: 330px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: #5b8ee0; }
    [data-composition-id="%ID%"] .s05-sello { top: 1190px; font-size: 130px; color: #9b2445; background: #fbf4e6; }
"""
body = f"""
        <div class="fig s05-nov">{novia('s05n')}</div>
        {celular('s05', 480, 780, 'Calzados Ricardo', 'última vez: sáb 22:48', CHAT).replace('</div></div></div>', '<div class="s05-visto">Visto 22:48</div></div></div>', 1) if False else ''}
        <div class="cel s05-cel" style="width:480px;height:780px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Calzados Ricardo</b><small>últ. vez sáb 22:48</small></div>
          <div class="msg yo s05-m1" style="top:170px">¿Tenés las botas en 38?<small>sáb 22:47</small></div>
          <div class="s05-visto">Visto 22:48</div></div></div>
        <div class="obj s05-botas">{botas('s05b')}</div>
        <div class="big r s05-tuya">¿Tuya?</div>
        <div class="sello centro s05-sello">Visto</div>
"""
js = """
      const TUYA = 0.0, SABADO = 1.30, NOCHE = 1.85, PREG = 2.32, BOTAS = 3.43, TREINTA = 3.80, VISTO = 5.31;
      // cuadro 0: Lucía, brazos en jarra
      gsap.set(q(".s05n-bd"), { rotation: 60, svgOrigin: "248 296" });
      gsap.set(q(".s05n-cejas"), { rotation: 8, svgOrigin: "200 180" });
      tl.fromTo(q(".s05-nov"), { x: -60 }, { x: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      habla(".s05n-boca", 0.0, 5.6, "200 238");
      golpe(q(".s05-tuya"), TUYA + 0.14, -5, 2.4);
      sacudon(0.1, 1.2);
      vaiven(q(".s05-nov"), 0.3, 5.2, { rotation: 2 }, 0.3);
      tl.to(q(".s05-tuya"), { opacity: 0, y: -40, duration: 0.2 }, SABADO - 0.15);
      // el celular con el chat
      entra(q(".s05-cel"), SABADO - 0.1, { x: 700 }, 0.35);
      pop(q(".s05-m1"), PREG, 0.3, { transformOrigin: "100% 100%" });
      // las botas en 38
      pop(q(".s05-botas"), BOTAS, 0.35);
      tl.fromTo(q(".s05b-talle"), { scale: 1, svgOrigin: "96 150" }, { scale: 1.35, svgOrigin: "96 150", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, TREINTA + 0.5);
      // Visto
      gsap.set(q(".s05-visto"), { opacity: 0 });
      tl.to(q(".s05-visto"), { opacity: 1, duration: 0.1 }, VISTO - 0.25);
      golpe(q(".s05-sello"), VISTO, -8, 3);
      sacudon(VISTO + 0.05, 1.8);
      tl.to(q(".s05n-bi"), { rotation: -20, svgOrigin: "152 296", duration: 0.2 }, VISTO);
"""
sfx = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 1.2, "sfx": "whoosh-short", "vol": 0.22},
       {"t": 2.32, "sfx": "notification", "vol": 0.25}, {"t": 3.43, "sfx": "pop", "vol": 0.28},
       {"t": 5.15, "sfx": "error", "vol": 0.0, "max": 0.1}, {"t": 5.2, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
escena("s05-visto", p, 5.96, css, body, js, [s for s in sfx if s["vol"] > 0])
