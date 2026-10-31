from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-local { left: 200px; top: 600px; width: 620px; height: 620px; }
    [data-composition-id="%ID%"] .s07-luna { left: 820px; top: 560px; width: 180px; height: 180px; }
    [data-composition-id="%ID%"] .s07-ven { top: 1250px; font-size: 150px; }
    [data-composition-id="%ID%"] .s07-preg { position: absolute; left: 60px; top: 600px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 260px; line-height: 1; color: #14c4b8; -webkit-text-stroke: 12px #16191d; paint-order: stroke fill; text-shadow: 9px 9px 0 #16191d; }
"""
luna = f'<svg viewBox="0 0 180 180"><path d="M120 20 A75 75 0 1 0 160 130 A60 60 0 1 1 120 20 Z" fill="{Y}" {S}/></svg>'
body = f"""
        <div class="obj s07-local">{local('s07l', 'REGALOS MÓNICA', persiana=True)}</div>
        <div class="obj s07-luna">{luna}</div>
        <div class="s07-preg">?</div>
        <div class="big n s07-ven">VENTAS: 0</div>
"""
js = """
      const CIERRA = 0.38, BAJA = 1.06, PERS = 1.49, CERO = 2.97;
      gsap.set(q(".s07l-persiana"), { scaleY: 0.03, svgOrigin: "350 250" });
      tl.fromTo(q(".s07-local"), { scale: 0.92, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.5, ease: "power2.out" }, 0);
      pop(q(".s07-preg"), CIERRA, 0.3);
      tl.to(q(".s07-preg"), { rotation: 14, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CIERRA + 0.3);
      tl.to(q(".s07-preg"), { opacity: 0, duration: 0.2 }, BAJA);
      // se hace de noche y baja la persiana
      pop(q(".s07-luna"), BAJA, 0.35);
      tl.to(q(".s07-luna"), { rotation: -10, transformOrigin: "50% 50%", duration: 2.8, ease: "sine.inOut" }, BAJA + 0.3);
      tl.to(q(".s07l-persiana"), { scaleY: 0.4, svgOrigin: "350 250", duration: 0.35, ease: "power1.in" }, BAJA + 0.05);
      tl.to(q(".s07l-persiana"), { scaleY: 1, svgOrigin: "350 250", duration: 0.12, ease: "power4.in" }, PERS - 0.08);
      sacudon(PERS + 0.05, 1.6);
      tl.to(q(".s07-local"), { filter: "brightness(0.65)", duration: 0.4 }, PERS + 0.2);
      // ventas: 0
      golpe(q(".s07-ven"), CERO + 0.05, -3, 2.8);
      sacudon(CERO + 0.08, 1.3);
      tl.fromTo(q(".s07-ven"), { opacity: 1 }, { opacity: 0.35, duration: 0.14, ease: "steps(1)", yoyo: true, repeat: 5, immediateRender: false }, CERO + 0.3);
"""
sfx = [{"t": 0.38, "sfx": "pop", "vol": 0.25}, {"t": 1.06, "sfx": "chime", "vol": 0.2}, {"t": 1.1, "sfx": "whoosh", "vol": 0.25, "max": 0.4},
       {"t": 1.48, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 2.95, "sfx": "error", "vol": 0.3, "max": 0.8}]
escena("s07-persiana", p, 4.36, css, body, js, sfx)
