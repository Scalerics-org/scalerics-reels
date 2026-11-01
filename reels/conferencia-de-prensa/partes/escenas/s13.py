from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s13-t { top: 600px; font-size: 84px; color: #e63946; background: #f4f1e8; }
    [data-composition-id="%ID%"] .s13-h { position: absolute; width: 90px; height: 120px; background: #f4f1e8; border: 5px solid #0d1424; border-radius: 6px; }
"""
hojas = "".join(f'<div class="s13-h s13-h{i}" style="left:{x}px;top:{y}px"></div>' for i, (x, y) in enumerate([(380, 1180), (560, 1200), (470, 1220), (640, 1190)]))
body = f"""
        <div class="fig s13-dt">{profe('s13p')}</div>
        {hojas}
        <div class="sello centro s13-t">Se terminó</div>
"""
js = """
      const TERMINO = 0.20, CONFERENCIA = 0.70;
      brazoSet("s13p", "i", 8); brazoSet("s13p", "d", -8);
      habla(".s13p-boca", 0.0, 1.3, "230 262");
      tl.to(q(".s13p-cejas"), { y: 8, duration: 0.15 }, 0);
      tl.to(q(".s13p-cachetes"), { scale: 1.5, svgOrigin: "230 232", duration: 0.2 }, 0);
      golpe(q(".s13-t"), TERMINO + 0.1, -5, 2.6);
      sacudon(TERMINO + 0.15, 1.6);
      // se para, revolea las hojas y se va
      brazo("s13p", "i", 70, CONFERENCIA); brazo("s13p", "d", -70, CONFERENCIA);
      tl.to(q(".s13-dt"), { y: -70, duration: 0.25, ease: "power2.out" }, CONFERENCIA);
      qa(".s13-h").forEach((h, i) => tl.fromTo(h, { x: 0, y: 0, rotation: 0 }, { x: (i - 1.5) * 260, y: -380 - (i % 2) * 120, rotation: (i % 2 ? 1 : -1) * 200, opacity: 0.9, duration: 0.9, ease: "power2.out", immediateRender: false }, CONFERENCIA + 0.05 * i));
      tl.to(q(".s13-dt"), { x: 820, rotation: 8, duration: 0.7, ease: "power2.in" }, CONFERENCIA + 0.6);
"""
sfx = [{"t": 0.2, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 0.25, "sfx": "click", "vol": 0.28}, {"t": 0.7, "sfx": "whoosh", "vol": 0.25, "max": 0.6},
       {"t": 1.2, "sfx": "click", "vol": 0.25}, {"t": 1.35, "sfx": "whoosh-short", "vol": 0.22}]
escena("s13-se-termino", p, 2.61, css, body, js, sfx)
