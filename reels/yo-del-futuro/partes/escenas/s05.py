from base import *
p = "s05"
css = """
    [data-composition-id="%ID%"] .s05-fut { left: 340px; top: 790px; }
    [data-composition-id="%ID%"] .s05-reloj { left: 50%; top: 560px; width: 640px; margin-left: -320px; font-size: 120px; }
    [data-composition-id="%ID%"] .s05-luna { left: 880px; top: 620px; width: 160px; height: 160px; }
    [data-composition-id="%ID%"] .s05-cel { left: 520px; top: 740px; }
    [data-composition-id="%ID%"] .s05-m1 { top: 190px; }
    [data-composition-id="%ID%"] .s05-ojala { left: 60px; top: 600px; font-size: 52px; transform: rotate(-4deg); background: #ff8a3d; }
"""
luna = f'<svg viewBox="0 0 180 180"><path d="M100 10 A80 80 0 1 0 170 120 A64 64 0 1 1 100 10 Z" fill="{W}" {S}/><circle cx="70" cy="110" r="10" fill="{V}" opacity="0.4"/></svg>'
pant = '<div class="chat-head"><i></i><b>Clienta</b></div><div class="msg s05-m1">¿Tenés para hoy?<small>SÁB 23:12</small></div>'
body = f"""
        <div class="fig s05-fut">{futuro('s05f')}</div>
        <div class="globo s05-ojala">Ojalá fuera eso...</div>
        <div class="obj s05-luna">{luna}</div>
        <div class="reloj s05-reloj"><small>SÁBADO · NOCHE</small>SÁB 23:12</div>
        {celular('s05', 420, 760).replace('%PANT%', pant)}
"""
js = """
      const OJALA = 0, VINE = 1.65, SAB = 2.17, NOCHE = 2.70, UNA = 3.65, TENES = 5.09;
      const fut = q(".s05-fut");
      gsap.set(fut, { scale: 1.1, transformOrigin: "50% 100%" });
      // ojalá: ojos al cielo, manos juntas
      tl.fromTo(q(".s05f-ojos"), { y: 0 }, { y: -8, duration: 0.2 }, 0.05);
      tl.fromTo(fut, { y: 30 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.to(q(".s05f-bi"), { rotation: 40, svgOrigin: "150 292", duration: 0.25 }, 0.1);
      tl.to(q(".s05f-bd"), { rotation: -40, svgOrigin: "250 292", duration: 0.25 }, 0.1);
      pop(q(".s05-ojala"), 0.1, 0.3, { rotation: -4 });
      habla(".s05f-boca", 0, 3.4, "200 244");
      tl.to(q(".s05-ojala"), { opacity: 0, y: -40, duration: 0.2 }, VINE - 0.2);
      // vine por el sábado a la noche
      tl.to(fut, { x: -290, scale: 0.9, duration: 0.35, ease: "power3.inOut" }, VINE);
      tl.to([q(".s05f-bi"), q(".s05f-bd")], { rotation: 0, duration: 0.2 }, VINE);
      tl.to(q(".s05f-ojos"), { y: 0, duration: 0.2 }, VINE);
      golpe(q(".s05-reloj"), SAB, -2, 2.2);
      sacudon(SAB + 0.05, 1);
      pop(q(".s05-luna"), NOCHE, 0.35);
      tl.to(q(".s05-luna"), { rotation: 10, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, NOCHE + 0.35);
      tl.to(q(".s05-reloj"), { opacity: 0.6, duration: 0.08, yoyo: true, repeat: 5, ease: "steps(1)" }, NOCHE);
      // una clienta te escribe
      tl.to(q(".s05-reloj"), { scale: 0.55, x: -190, y: -20, duration: 0.3, ease: "power3.inOut" }, UNA);
      entra(q(".s05-cel"), UNA + 0.1, { y: 900 }, 0.4);
      tl.to(q(".s05-cel"), { rotation: 3, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, UNA + 0.5);
      gsap.set(q(".s05-m1"), { opacity: 0 });
      tl.fromTo(q(".s05-m1"), { opacity: 0, scale: 0.4, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, TENES - 0.1);
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.22}, {"t": 2.1, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.7, "sfx": "chime", "vol": 0.2},
       {"t": 3.75, "sfx": "whoosh", "vol": 0.22, "max": 0.4}, {"t": 5.0, "sfx": "notification", "vol": 0.35}]
escena("s05-sabado", p, 5.98, css, body, js, sfx)
