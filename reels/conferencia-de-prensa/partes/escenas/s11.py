from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s11-t { top: 600px; font-size: 118px; }
"""
body = f"""
        <div class="fig s11-dt">{profe('s11p')}</div>
        <div class="big y s11-t">¿Fenómeno?</div>
"""
js = """
      const QUIEN = 0.0, FENOMENO = 0.70;
      brazoSet("s11p", "i", 8); brazoSet("s11p", "d", -8);
      // cuadro 0: primer plano del Profe, desconcertado
      tl.fromTo(q(".s11-dt"), { scale: 1.15 }, { scale: 1.45, duration: 1.6, ease: "power1.inOut" }, 0);
      habla(".s11p-boca", 0.0, 1.3, "230 262");
      tl.to(q(".s11p-cejas"), { y: -14, duration: 0.2 }, 0.1);
      tl.to(q(".s11p-gotas"), { opacity: 1, duration: 0.2 }, 0.3);
      tl.fromTo(q(".s11p-gotas"), { y: 0 }, { y: 26, duration: 0.6, repeat: 2, ease: "power1.in", immediateRender: false }, 0.3);
      tl.fromTo(q(".s11p-ojos"), { scale: 1, svgOrigin: "230 198" }, { scale: 1.25, svgOrigin: "230 198", duration: 0.15, ease: "back.out(3)", immediateRender: false }, FENOMENO);
      golpe(q(".s11-t"), FENOMENO + 0.1, -3, 2.4);
      sacudon(FENOMENO + 0.15, 1.2);
"""
sfx = [{"t": 0.0, "sfx": "whoosh-short", "vol": 0.2}, {"t": 0.75, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.5}]
escena("s11-fenomeno", p, 1.83, css, body, js, sfx)
