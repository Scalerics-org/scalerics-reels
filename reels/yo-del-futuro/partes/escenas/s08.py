from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-fut { left: 340px; top: 620px; }
    [data-composition-id="%ID%"] .s08-n { position: absolute; width: 64px; height: 64px; margin: -32px 0 0 -32px; border-radius: 50%; background: #ff2a9d; border: 5px solid #120621; box-shadow: 0 0 16px #ff2a9d;
      font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; line-height: 54px; text-align: center; color: #fdf6ff; }
    [data-composition-id="%ID%"] .s08-sello { left: 50%; top: 1240px; width: 800px; margin-left: -400px; text-align: center; font-size: 76px; color: #ff2a9d; }
"""
nots = [(96, 120, "3"), (304, 120, "9"), (120, 70, "12"), (280, 74, "5"), (200, 40, "+99"), (70, 170, "1"), (330, 170, "7")]
badges = "".join(f'<div class="s08-n" style="left:{x}px;top:{y}px">{t}</div>' for x, y, t in nots)
body = f"""
        <div class="fig s08-fut">{futuro('s08f')}{badges}</div>
        <div class="sello s08-sello">Sin contestar</div>
"""
js = """
      const CANAS = 0.50, SON = 1.64, MENS = 1.98, CONT = 2.85;
      const fut = q(".s08-fut");
      gsap.set(fut, { scale: 1.35, transformOrigin: "50% 0%" });
      tl.to(fut, { scale: 1.75, y: 80, duration: 0.4, ease: "power3.inOut" }, CANAS - 0.2);
      // se señala el pelo
      tl.to(q(".s08f-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, 0.05);
      habla(".s08f-boca", 0, 4.0, "200 244");
      tl.fromTo(q(".s08f-canas"), { scale: 1, svgOrigin: "200 170" }, { scale: 1.12, svgOrigin: "200 170", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, CANAS);
      // de cada mechón, una notificación
      qa(".s08-n").forEach((n, i) => { pop(n, MENS - 0.2 + i * 0.1, 0.25); tl.to(n, { y: -8, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, MENS + 0.6 + i * 0.05); });
      sacudon(MENS + 0.1, 0.8);
      golpe(q(".s08-sello"), CONT, -5, 2.4);
      sacudon(CONT + 0.05, 1.4);
      tl.to(q(".s08-sello"), { opacity: 0.4, duration: 0.07, yoyo: true, repeat: 7, ease: "steps(1)" }, CONT + 0.3);
"""
sfx = [{"t": 0.3, "sfx": "whoosh", "vol": 0.22, "max": 0.4}, {"t": 1.8, "sfx": "notification", "vol": 0.3}, {"t": 2.1, "sfx": "notification", "vol": 0.25},
       {"t": 2.4, "sfx": "notification", "vol": 0.22}, {"t": 2.8, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}]
escena("s08-canas", p, 4.45, css, body, js, sfx)
