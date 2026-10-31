from base import *
p = "s07"
cols, rows = [100, 340, 580, 820], [660, 870, 1080, 1290]
bl = ""
for r, y in enumerate(rows):
    for c, x in enumerate(cols):
        if (c, r) in ((0, 0), (3, 2)):
            cls = "s07-p1" if (c, r) == (0, 0) else "s07-p2"
            trees = "".join(f'<circle cx="{x + 40 + (k % 3) * 60}" cy="{y + 45 + (k // 3) * 80}" r="26" fill="{C}" stroke="{K}" stroke-width="4"/>' for k in range(6))
            bl += f'<g class="{cls}"><rect x="{x}" y="{y}" width="200" height="170" rx="14" fill="{A}" opacity="0.55" {S}/>{trees}<text x="{x + 100}" y="{y + 102}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="{K}">PLAZA</text></g>'
        else:
            bl += f'<rect x="{x}" y="{y}" width="200" height="170" rx="14" fill="{N}" {S}/>'
            bl += f'<rect x="{x + 24}" y="{y + 24}" width="60" height="44" rx="6" fill="{Y}" opacity="0.25"/><rect x="{x + 116}" y="{y + 96}" width="60" height="44" rx="6" fill="{Y}" opacity="0.2"/>'
TX = taxi_arriba('s07-tx').replace('<svg viewBox="0 0 120 200" aria-hidden="true">', '<g transform="translate(-30 -50) scale(0.5)">').replace('</g>\n</svg>', '</g></g>')
css = """
    [data-composition-id="%ID%"] .s07-yo { top: 540px; font-size: 92px; z-index: 3; }
    [data-composition-id="%ID%"] .s07-g1 { left: 120px; top: 560px; }
    [data-composition-id="%ID%"] .s07-g2 { left: 560px; top: 960px; }
    [data-composition-id="%ID%"] .globo { font-size: 50px; font-weight: 900; }
"""
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-mapa">{bl}</g>
          <g class="s07-taxi">{TX}</g>
        </svg>
        <div class="big c s07-yo">YO LA CONOZCO</div>
        <div class="globo s07-g1">¿ACÁ?</div>
        <div class="globo s07-g2">¿O ERA ACÁ?</div>
"""
js = """
      const CONOZCO = 0.36, FRENTE = 1.55, PLAZA = 1.91, O = 2.97, OTRA = 3.36;
      tl.fromTo(q(".s07-mapa"), { scale: 1.15, svgOrigin: "560 1070", opacity: 0.6 }, { scale: 1, svgOrigin: "560 1070", opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      golpe(q(".s07-yo"), CONOZCO + 0.05, -3, 2.4);
      tl.to(q(".s07-yo"), { opacity: 0, y: -40, duration: 0.2 }, FRENTE - 0.3);
      const T = q(".s07-taxi");
      gsap.set(T, { x: 560, y: 1520, rotation: 0 });
      const ruta = [[560, 850, 0, 0.3, 1.0], [320, 850, -90, 1.05, 0.5], [320, 750, 0, 1.6, 0.3], [320, 850, 180, 2.95, 0.2], [800, 850, 90, 3.1, 0.35], [800, 1165, 180, 3.45, 0.3]];
      ruta.forEach(([x, y, rot, t, d]) => { tl.to(T, { rotation: rot, duration: 0.1 }, t); tl.to(T, { x, y, duration: d, ease: "power1.inOut" }, t + 0.05); });
      pop(q(".s07-g1"), PLAZA, 0.3);
      tl.fromTo(q(".s07-p1"), { opacity: 1 }, { opacity: 0.5, duration: 0.15, yoyo: true, repeat: 5, immediateRender: false }, PLAZA);
      tl.to(q(".s07-g1"), { opacity: 0.3, duration: 0.2 }, O);
      pop(q(".s07-g2"), OTRA + 0.05, 0.3);
      tl.fromTo(q(".s07-p2"), { opacity: 1 }, { opacity: 0.5, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, OTRA + 0.1);
      sacudon(OTRA + 0.1, 0.8);
"""
sfx = [{"t": 0.35, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 0.4, "sfx": "whoosh", "vol": 0.2, "max": 0.7}, {"t": 1.9, "sfx": "pop", "vol": 0.3},
       {"t": 3.0, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.4, "sfx": "pop", "vol": 0.3}]
escena("s07-plaza", p, 4.00, css, body, js, sfx)
