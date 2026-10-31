from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-poq { left: 0; right: 0; top: 1300px; text-align: center; font-size: 40px; color: #f4ecd8; letter-spacing: 0.3em; }
    [data-composition-id="%ID%"] .s04-lejos { top: 1350px; font-size: 170px; }
    [data-composition-id="%ID%"] .s04-web { left: 700px; top: 560px; width: 300px; height: 230px; }
"""
TX = taxi_arriba('s04-tx').replace('<svg viewBox="0 0 120 200" aria-hidden="true">', '<g transform="translate(-30 -50) scale(0.5)">').replace('</g>\n</svg>', '</g></g>')
PTS = [(560, 1170), (540, 1080), (470, 990), (400, 920), (360, 830), (300, 780)]
DOTS = ""
for i in range(len(PTS) - 1):
    for k in range(3):
        x = PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * k / 3; y = PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * k / 3
        DOTS += f'<circle class="s04-dot" cx="{x:.0f}" cy="{y:.0f}" r="7" fill="{Y}"/>'
mapa = f'''<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
  <g class="s04-mapa">
    <path d="M330 640 L450 610 L560 660 L670 720 L770 820 L810 930 L840 1030 L760 1090 L660 1150 L560 1180 L460 1170 L380 1140 L320 1080 L290 980 L280 870 L300 750 Z" fill="{N}" {S}/>
    <path d="M330 640 L450 610 L560 660 L670 720 L770 820 L810 930 L840 1030 L760 1090 L660 1150 L560 1180 L460 1170 L380 1140 L320 1080 L290 980 L280 870 L300 750 Z" fill="none" stroke="{L}" stroke-width="3" opacity="0.5"/>
    {DOTS}
    <circle cx="560" cy="1172" r="16" fill="{C}" {S}/>
    <text x="580" y="1230" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="{C}" letter-spacing="2">MONTEVIDEO</text>
    <g class="s04-salto"><circle cx="300" cy="780" r="20" fill="{R}" {S}/>
    <text x="110" y="736" font-family="Lexend" font-weight="900" font-size="48" fill="{R}" stroke="{K}" stroke-width="8" paint-order="stroke fill">SALTO</text></g>
  </g>
  <g class="s04-taxi">{TX}</g>
</svg>'''
web = f'''<svg viewBox="0 0 300 230"><rect x="10" y="10" width="280" height="210" rx="20" fill="{C}" {S}/><path d="M10 60 H290" {S}/>
  <circle cx="44" cy="36" r="9" fill="{R}"/><circle cx="74" cy="36" r="9" fill="{Y}"/><circle cx="104" cy="36" r="9" fill="{H}"/>
  <text x="150" y="180" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="110" fill="{K}">?</text></svg>'''
body = f"""
        {mapa}
        <div class="mono s04-poq">UN POQUITO</div>
        <div class="big y s04-lejos">LEJOS</div>
        <div class="obj s04-web">{web}</div>
"""
js = """
      const SALTO = 0.27, POQ = 1.36, LEJOS = 1.63, PAG = 2.72;
      tl.fromTo(q(".s04-mapa"), { scale: 0.9, opacity: 0.5, svgOrigin: "560 900" }, { scale: 1, opacity: 1, svgOrigin: "560 900", duration: 0.4, ease: "power2.out" }, 0);
      // los puntitos de la ruta aparecen detrás del taxi
      qa(".s04-dot").forEach((d, i) => { gsap.set(d, { opacity: 0 }); tl.set(d, { opacity: 1 }, SALTO + i * 0.25 / 3); });

      const pts = [[560, 1170], [540, 1080], [470, 990], [400, 920], [360, 830], [300, 780]];
      gsap.set(q(".s04-taxi"), { x: 560, y: 1170, rotation: 0 });

      pts.slice(1).forEach(([x, y], i) => {
        const [x0, y0] = pts[i];
        tl.to(q(".s04-taxi"), { x, y, rotation: Math.atan2(x - x0, -(y - y0)) * 180 / Math.PI, duration: 0.25, ease: "none" }, SALTO + i * 0.25);
      });
      tl.fromTo(q(".s04-salto"), { scale: 1, svgOrigin: "300 780" }, { scale: 1.3, svgOrigin: "300 780", duration: 0.15, yoyo: true, repeat: 5, immediateRender: false }, SALTO);
      pop(q(".s04-poq"), POQ - 0.1, 0.25);
      golpe(q(".s04-lejos"), LEJOS + 0.08, -3, 2.6);
      sacudon(LEJOS + 0.1, 1.1);
      tl.to(q(".s04-lejos"), { scaleX: 1.25, duration: 0.5, ease: "power2.out" }, LEJOS + 0.2);
      pop(q(".s04-web"), PAG - 0.05, 0.3);
      tl.to(q(".s04-web"), { rotation: 8, duration: 0.1, yoyo: true, repeat: 3 }, PAG + 0.3);
"""
sfx = [{"t": 0.27, "sfx": "whoosh", "vol": 0.25, "max": 0.8}, {"t": 1.6, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.7, "sfx": "pop", "vol": 0.3}]
escena("s04-salto", p, 3.40, css, body, js, sfx)
