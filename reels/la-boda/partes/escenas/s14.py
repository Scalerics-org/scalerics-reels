from base import *
p = "s14"
css = """
    [data-composition-id="%ID%"] .s14-inv { position: absolute; left: 110px; top: 600px; width: 860px; height: 540px; background: #fbf4e6; border: 8px solid #2a1220; border-radius: 26px; box-shadow: 14px 14px 0 #e3b448; text-align: center; }
    [data-composition-id="%ID%"] .s14-inv:before { content: ""; position: absolute; inset: 18px; border: 4px solid #e3b448; border-radius: 16px; }
    [data-composition-id="%ID%"] .s14-inv small { display: block; margin-top: 60px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.3em; color: #9b2445; }
    [data-composition-id="%ID%"] .s14-inv em { display: block; margin-top: 18px; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 84px; line-height: 1; color: #9b2445; }
    [data-composition-id="%ID%"] .s14-inv b { display: block; margin-top: 26px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 62px; line-height: 1.05; color: #2a1220; text-transform: uppercase; }
    [data-composition-id="%ID%"] .s14-inv b span { display: inline-block; margin-top: 10px; padding: 8px 26px 4px; background: #5ce611; border: 6px solid #2a1220; border-radius: 16px; }
    [data-composition-id="%ID%"] .s14-mesa { position: absolute; left: 290px; top: 1190px; width: 500px; height: 260px; background: #fbf4e6; border: 7px solid #2a1220; border-radius: 18px; box-shadow: 10px 10px 0 #2a1220; text-align: center; }
    [data-composition-id="%ID%"] .s14-mesa small { display: block; margin-top: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.2em; color: #9b2445; }
    [data-composition-id="%ID%"] .s14-mesa b { display: block; margin-top: 8px; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 92px; line-height: 1; color: #2a1220; }
    [data-composition-id="%ID%"] .s14-mesa i { display: block; margin-top: 8px; font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: #2a1220; }
    [data-composition-id="%ID%"] .s14-x { left: 270px; top: 1170px; width: 540px; height: 300px; }
"""
equis = f'<svg viewBox="0 0 540 300" aria-hidden="true"><path class="s14-x1" d="M30 30 L510 270" stroke="{V}" stroke-width="30" stroke-linecap="round"/><path class="s14-x2" d="M510 30 L30 270" stroke="{V}" stroke-width="30" stroke-linecap="round"/></svg>'
body = f"""
        <div class="s14-inv"><small>INVITACIÓN</small><em>Tu empleado nuevo</em><b>te lo hacemos en<br><span>Scalerics</span></b></div>
        <div class="s14-mesa"><small>INVITADO</small><b>vos</b><i>mesa 14 · al fondo</i></div>
        <div class="obj s14-x">{equis}</div>
"""
js = """
      const SCAL = 0.08, HACEMOS = 1.00, TUYO = 1.53, ANTES = 2.24, INVITADO = 3.26;
      // cuadro 0: la invitación ya cae
      tl.fromTo(q(".s14-inv"), { y: -200, rotation: -8, scale: 0.9 }, { y: 0, rotation: -2, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".s14-inv span"), { scale: 0.5 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, SCAL + 0.25);
      tl.to(q(".s14-inv span"), { scale: 1.1, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, TUYO);
      vaiven(q(".s14-inv"), 0.5, 3.2, { rotation: 0 }, 0.6);
      // la tarjetita de mesa, y se tacha
      gsap.set(q(".s14-mesa"), { opacity: 0 });
      tl.fromTo(q(".s14-mesa"), { opacity: 1, y: 500, rotation: 8 }, { opacity: 1, y: 0, rotation: 3, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, ANTES - 0.1);
      [".s14-x1", ".s14-x2"].forEach((s, i) => { const L = 540; gsap.set(q(s), { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(q(s), { opacity: 1 }, INVITADO - 0.1 + i * 0.15); tl.to(q(s), { strokeDashoffset: 0, duration: 0.18, ease: "power2.out" }, INVITADO - 0.1 + i * 0.15); });
      sacudon(INVITADO + 0.2, 1.2);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 0.35, "sfx": "chime", "vol": 0.25, "max": 1.0}, {"t": 1.55, "sfx": "pop", "vol": 0.25},
       {"t": 2.15, "sfx": "whoosh", "vol": 0.22, "max": 0.5}, {"t": 3.2, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s14-invitado", p, 3.80, css, body, js, sfx)
