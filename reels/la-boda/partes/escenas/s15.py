from base import *
p = "s15"
css = """
    [data-composition-id="%ID%"] .s15-t1 { top: 540px; font-size: 104px; }
    [data-composition-id="%ID%"] .s15-t2 { top: 676px; font-size: 104px; }
    [data-composition-id="%ID%"] .s15-t3 { top: 812px; font-size: 94px; }
    [data-composition-id="%ID%"] .s15-b { position: absolute; top: 970px; width: 430px; padding: 26px 0 18px; text-align: center; border: 8px solid #2a1220; border-radius: 30px; box-shadow: 10px 10px 0 #2a1220; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 56px; line-height: 1; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="%ID%"] .s15-b1 { left: 70px; background: #9b2445; color: #fbf4e6; }
    [data-composition-id="%ID%"] .s15-b2 { left: 580px; background: #5b8ee0; color: #2a1220; }
    [data-composition-id="%ID%"] .s15-com { position: absolute; left: 70px; top: 1170px; width: 940px; height: 160px; background: #fbf4e6; border: 8px solid #2a1220; border-radius: 30px 30px 30px 6px; box-shadow: 10px 10px 0 #5ce611; }
    [data-composition-id="%ID%"] .s15-av { position: absolute; left: 22px; top: 18px; width: 108px; height: 108px; border-radius: 50%; background: #5ce611; border: 7px solid #2a1220; }
    [data-composition-id="%ID%"] .s15-user { position: absolute; left: 160px; top: 44px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; color: #2a1220; white-space: nowrap; }
    [data-composition-id="%ID%"] .s15-cursor { display: inline-block; width: 6px; height: 56px; margin-left: 4px; background: #2a1220; vertical-align: -8px; }
    [data-composition-id="%ID%"] .s15-an { left: 430px; top: 1370px; width: 220px; height: 160px; }
"""
texto = "¡Me opongo! Contesten..."
letras = "".join(f'<span class="s15-l">{c}</span>' for c in texto)
body = f"""
        <div class="big m s15-t1" data-layout-allow-overlap>¿Te oponés</div>
        <div class="big d s15-t2" data-layout-allow-overlap>o callás</div>
        <div class="big r s15-t3" data-layout-allow-overlap>para siempre?</div>
        <div class="s15-b s15-b1">Me opongo</div>
        <div class="s15-b s15-b2">Callo</div>
        <div class="s15-com"><div class="s15-av"></div><div class="s15-user">{letras}<span class="s15-cursor"></span></div></div>
        <div class="obj s15-an">{anillos('s15n')}</div>
"""
js = """
      const OPONES = 0.65, CALLAS = 1.37, SIEMPRE = 1.64, CONTANOS = 2.74;
      // cuadro 0: ¿TE OPONÉS ya cae
      gsap.set(q(".s15-t1"), { opacity: 1, rotation: -3 });
      tl.fromTo(q(".s15-t1"), { scale: 1.8 }, { scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      sacudon(0.15, 1);
      golpe(q(".s15-t2"), CALLAS, 2, 2.4);
      golpe(q(".s15-t3"), SIEMPRE + 0.1, -2, 2.4);
      sacudon(SIEMPRE + 0.15, 1.2);
      pop(q(".s15-b1"), OPONES, 0.3);
      pop(q(".s15-b2"), CALLAS + 0.1, 0.3);
      vaiven(q(".s15-b1"), 1.2, 5.5, { scale: 1.06 }, 0.4);
      vaiven(q(".s15-b2"), 1.4, 5.3, { scale: 1.06 }, 0.45);
      vaiven(q(".s15-t1"), 1.0, 6, { rotation: -1 }, 0.5);
      // el comentario se escribe
      pop(q(".s15-com"), CONTANOS - 0.1, 0.3);
      gsap.set(qa(".s15-l"), { opacity: 0 });
      qa(".s15-l").forEach((l, i) => tl.set(l, { opacity: 1 }, CONTANOS + 0.3 + i * 0.06));
      tl.fromTo(q(".s15-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 13, immediateRender: false }, CONTANOS);
      tl.to(q(".s15-b1"), { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }, CONTANOS + 0.3);
      pop(q(".s15-an"), CONTANOS + 1.0, 0.4);
      tl.to(q(".s15-an"), { rotation: 10, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, CONTANOS + 1.4);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.65, "sfx": "pop", "vol": 0.28}, {"t": 1.4, "sfx": "pop", "vol": 0.28},
       {"t": 1.75, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 3.0, "sfx": "typing", "vol": 0.25, "max": 1.4}, {"t": 4.0, "sfx": "chime", "vol": 0.25, "max": 1.2}]
escena("s15-cta", p, 7.30, css, body, js, sfx)
