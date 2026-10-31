from base import *
p = "s15"
css = """
    [data-composition-id="%ID%"] .s15-ag { left: 340px; top: 880px; }
    [data-composition-id="%ID%"] .s15-marca { top: 570px; font-size: 140px; }
    [data-composition-id="%ID%"] .s15-c1 { left: 40px; top: 740px; max-width: none; font-size: 32px; }
    [data-composition-id="%ID%"] .s15-c2 { left: auto; right: 40px; top: 830px; max-width: none; font-size: 32px; background: #5ce611; }
    [data-composition-id="%ID%"] .s15-chip { position: absolute; top: 1460px; padding: 14px 22px 10px 74px; border: 6px solid #120621; border-radius: 16px; background: #120621; box-shadow: 0 0 0 4px #5ce611, 0 0 24px rgba(92, 230, 17, 0.5);
      font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; color: #fdf6ff; white-space: nowrap; }
    [data-composition-id="%ID%"] .s15-chip svg { position: absolute; left: 16px; top: 12px; width: 46px; height: 46px; }
    [data-composition-id="%ID%"] .s15-h1 { left: 70px; }
    [data-composition-id="%ID%"] .s15-h2 { left: 380px; }
"""
tic = f'<svg viewBox="0 0 46 46"><path d="M6 24 L18 36 L40 10" fill="none" stroke="{G}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
body = f"""
        <div class="fig s15-ag">{agente('s15a', G)}</div>
        <div class="big vd s15-marca"><span>Scalerics</span></div>
        <div class="msg s15-c1">¿Tienen turno mañana?</div>
        <div class="msg yo s15-c2">Sí, a las 10. ¿Te agendo?</div>
        <div class="s15-chip s15-h1">{tic}HOY</div>
        <div class="s15-chip s15-h2">{tic}DENTRO DE 5 AÑOS</div>
"""
js = """
      const AGENTE = 0.0, SCAL = 1.88, ATIENDE = 2.74, HOY = 4.0, CINCO = 5.0;
      const ag = q(".s15-ag");
      tl.fromTo(ag, { opacity: 0.4, scaleY: 0.3, scaleX: 0.8, transformOrigin: "50% 0%" }, { opacity: 1, scaleY: 0.8, scaleX: 0.8, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15a-lineas"), { y: -40 }, { y: 40, duration: 0.6, ease: "none", repeat: 9 }, 0);
      tl.to(ag, { y: -14, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.4);
      golpe(q(".s15-marca"), SCAL, -3, 2.4);
      sacudon(SCAL + 0.05, 1.2);
      pop(q(".s15-c1"), ATIENDE - 0.1, 0.25);
      pop(q(".s15-c2"), ATIENDE + 0.35, 0.25);
      tl.to(q(".s15a-bd"), { rotation: -120, svgOrigin: "252 300", duration: 0.2, yoyo: true, repeat: 3 }, ATIENDE + 0.3);
      pop(q(".s15-h1"), HOY, 0.3, { rotation: -2 });
      pop(q(".s15-h2"), CINCO, 0.3, { rotation: 2 });
      tl.to([q(".s15-h1"), q(".s15-h2")], { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.1 }, CINCO + 0.35);
"""
sfx = [{"t": 0.0, "sfx": "sparkle", "vol": 0.3}, {"t": 1.85, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 2.65, "sfx": "notification", "vol": 0.28},
       {"t": 3.1, "sfx": "click-soft", "vol": 0.28}, {"t": 4.0, "sfx": "ping", "vol": 0.28}, {"t": 5.0, "sfx": "ping", "vol": 0.28}]
escena("s15-scalerics", p, 6.06, css, body, js, sfx)
