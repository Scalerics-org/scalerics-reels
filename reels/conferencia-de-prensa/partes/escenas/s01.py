from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s01-mic { left: -60px; top: 1010px; width: 420px; height: 160px; }
    [data-composition-id="%ID%"] .s01-t1 { top: 585px; font-size: 150px; }
    [data-composition-id="%ID%"] .s01-t2 { top: 735px; font-size: 118px; }
    [data-composition-id="%ID%"] .s01-cartel { position: absolute; left: 650px; top: 620px; width: 360px; height: 230px; background: #0d1424; border: 8px solid #f4f1e8; border-radius: 22px; box-shadow: 10px 10px 0 #e63946; text-align: center; }
    [data-composition-id="%ID%"] .s01-cartel small { position: absolute; left: 0; right: 0; top: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.2em; color: #6cc4ff; }
    [data-composition-id="%ID%"] .s01-cartel b { position: absolute; left: 0; right: 0; top: 58px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 140px; line-height: 1; color: #ffd447; }
"""
body = f"""
        <div class="fig s01-dt">{profe('s01p')}</div>
        <div class="obj s01-mic">{mic_mano('s01m')}</div>
        <div class="big b s01-t1">Perdiste</div>
        <div class="big y s01-t2">el clásico</div>
        <div class="s01-cartel"><small>MINUTO</small><b>90'</b></div>
"""
js = """
      const PERDISTE = 0.76, CLASICO = 1.24, ENFRENTE = 2.38, QUE = 2.57, MINUTO = 4.29, NOVENTA = 4.57;
      // cuadro 0: el Profe ya sentado, el micrófono asomando
      tl.fromTo(q(".s01-dt"), { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "power2.out" }, 0);
      brazoSet("s01p", "i", 8); brazoSet("s01p", "d", -8);
      tl.fromTo(q(".s01-mic"), { x: -160 }, { x: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      vaiven(q(".s01-mic"), 0.5, 5, { y: -10, rotation: -2 }, 0.5);
      vaiven(q(".s01-dt"), 0.4, 5.2, { rotation: 1.2 }, 0.6);
      golpe(q(".s01-t1"), PERDISTE, -3, 2.6);
      sacudon(PERDISTE + 0.05, 1.2);
      golpe(q(".s01-t2"), CLASICO + 0.1, 2, 2.4);
      sacudon(CLASICO + 0.15, 1.4);
      // el Profe traga saliva
      tl.to(q(".s01p-cejas"), { y: -8, duration: 0.15 }, CLASICO + 0.2);
      tl.to(q(".s01p-gotas"), { opacity: 1, duration: 0.2 }, ENFRENTE);
      tl.fromTo(q(".s01p-gotas"), { y: 0 }, { y: 30, duration: 0.9, repeat: 2, ease: "power1.in", immediateRender: false }, ENFRENTE);
      // ¿qué pasó en el minuto noventa?
      tl.to([q(".s01-t1"), q(".s01-t2")], { y: -40, opacity: 0, duration: 0.25, ease: "power2.in" }, QUE + 0.6);
      tl.to(q(".s01-dt"), { x: -180, duration: 0.4, ease: "power2.inOut" }, QUE + 0.7);
      tl.to(q(".s01-mic"), { x: -40, duration: 0.4, ease: "power2.inOut" }, QUE + 0.7);
      pop(q(".s01-cartel"), MINUTO - 0.1, 0.35);
      tl.fromTo(q(".s01-cartel b"), { scale: 1 }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, NOVENTA);
      tl.to(q(".s01-cartel"), { rotation: -4, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, NOVENTA + 0.1);
      tl.to(q(".s01p-cejas"), { y: 6, rotation: 0, duration: 0.15 }, NOVENTA);
"""
sfx = [{"t": 0.25, "sfx": "click", "vol": 0.3}, {"t": 0.7, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6},
       {"t": 1.3, "sfx": "click", "vol": 0.28}, {"t": 1.3, "sfx": "impact-bass-2", "vol": 0.36, "max": 0.6},
       {"t": 2.45, "sfx": "click", "vol": 0.25}, {"t": 4.2, "sfx": "pop", "vol": 0.3}, {"t": 4.6, "sfx": "click", "vol": 0.25}]
escena("s01-perdiste", p, 5.85, css, body, js, sfx)
