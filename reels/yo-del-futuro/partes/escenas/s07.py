from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-reloj { left: 50%; top: 560px; width: 640px; margin-left: -320px; height: 190px; }
    [data-composition-id="%ID%"] .s07-reloj span { position: absolute; left: 0; right: 0; top: 64px; font-size: 104px; text-align: center; }
    [data-composition-id="%ID%"] .s07-cel { left: 520px; top: 820px; }
    [data-composition-id="%ID%"] .s07-m1 { top: 160px; }
    [data-composition-id="%ID%"] .s07-m2 { top: 330px; padding: 8px 18px; }
    [data-composition-id="%ID%"] .s07-m2 svg { display: block; width: 110px; height: 110px; }
    [data-composition-id="%ID%"] .s07-pul { left: 60px; top: 900px; width: 440px; height: 440px; }
    [data-composition-id="%ID%"] .s07-mar { left: 80px; top: 1360px; font-size: 40px; color: #ff8a3d; text-shadow: 0 0 14px rgba(255, 138, 61, 0.8); }
"""
dias = ["SÁB 23:12", "DOM 09:30", "DOM 18:45", "LUN 08:10", "LUN 21:02", "MAR 10:04"]
reloj = "<small>LO QUE TARDASTE</small>" + "".join(f'<span class="s07-d">{d}</span>' for d in dias)
pant = f'<div class="chat-head"><i></i><b>Clienta</b></div><div class="msg s07-m1">¿Tenés para hoy?<small>SÁB 23:12</small></div><div class="msg yo s07-m2">{pulgar("", W)}<small>MAR 10:04</small></div>'
body = f"""
        <div class="reloj s07-reloj">{reloj}</div>
        {celular('s07', 420, 680).replace('%PANT%', pant)}
        <div class="obj s07-pul">{pulgar()}</div>
        <div class="mono s07-mar">CONTESTADO EL MARTES</div>
"""
js = """
      const CONT = 0.17, MARTES = 0.78, CON = 1.92, PULGAR = 2.17;
      pop(q(".s07-reloj"), 0, 0.25);
      cuenta(qa(".s07-d"), 0.15, 0.13);
      tl.fromTo(q(".s07-reloj"), { scale: 1 }, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, MARTES);
      sacudon(MARTES + 0.02, 0.9);
      gsap.set(qa(".s07-d"), { rotation: 0 });
      entra(q(".s07-cel"), 0.25, { y: 900 }, 0.4);
      gsap.set(q(".s07-m2"), { opacity: 0 });
      tl.fromTo(q(".s07-m2"), { opacity: 0, scale: 0.3, transformOrigin: "100% 100%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)", immediateRender: false }, PULGAR - 0.05);
      // el pulgar gigante
      golpe(q(".s07-pul"), PULGAR, -10, 2.4);
      sacudon(PULGAR + 0.05, 1.5);
      tl.to(q(".s07-pul"), { rotation: 0, y: -14, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, PULGAR + 0.2);
      pop(q(".s07-mar"), PULGAR + 0.35, 0.25);
"""
sfx = [{"t": 0.15, "sfx": "typing", "vol": 0.25, "max": 0.7}, {"t": 0.8, "sfx": "ping", "vol": 0.3}, {"t": 2.1, "sfx": "pop", "vol": 0.35}, {"t": 2.15, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}]
escena("s07-pulgar", p, 3.58, css, body, js, sfx)
