ID = "s13-yogures"; DUR = 2.93
def YOGUR(x, y, k):
    return f'''<g class="s13-y s13-y{k}"><path class="c" d="M{x} {y} H{x + 90} L{x + 80} {y + 110} H{x + 10} Z" stroke-width="6" /><rect class="o" x="{x - 6}" y="{y - 16}" width="102" height="22" rx="8" stroke-width="5" />
      <text x="{x + 45}" y="{y + 66}" text-anchor="middle" font-family="Luckiest Guy" font-size="28" fill="#24122f">DUEÑO</text></g>'''
CSS = """
    $ .s13-nota { position: absolute; left: 560px; top: 560px; padding: 18px 24px 12px; background: #f0b429; border: 6px solid #24122f; box-shadow: 0 8px 0 #24122f; font-family: "Caveat", cursive; font-weight: 700; font-size: 62px; line-height: 0.95; color: #24122f; transform: rotate(6deg); white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-heladera">
            <rect class="c" x="480" y="680" width="520" height="800" rx="40" />
            <rect x="510" y="710" width="460" height="740" rx="24" fill="#1fb5a8" stroke="#24122f" stroke-width="7" />
            <path class="l" d="M510 930 H970 M510 1160 H970" />
            <rect class="s13-luz" x="510" y="710" width="460" height="740" rx="24" fill="#fff4e0" opacity="0.25" />
            """ + YOGUR(560, 810, 1) + YOGUR(700, 810, 2) + YOGUR(840, 810, 3) + """
            <rect class="o" x="580" y="1030" width="140" height="120" rx="16" /><rect class="y" x="760" y="1060" width="160" height="90" rx="40" />
            <rect class="c" x="980" y="690" width="90" height="780" rx="20" transform="skewY(-8) translate(0 140)" />
          </g>
          <g class="s13-ag"><g transform="translate(60 900) scale(1.0)">""" + AGENTE("s13", "guino", brazo="pulgar") + """</g></g>
        </svg>
        <div class="s13-nota">¡NO TOCAR!</div>
"""
JS = """
      const YOG = 0.95, RISAS = 1.47;
      tl.fromTo(q(".s13-heladera"), { x: 40 }, { x: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, 0);
      habla(".s13-ag-boca", 0, 1.3, "180 290");
      tl.fromTo(q(".s13-luz"), { opacity: 0.4 }, { opacity: 0.15, duration: 0.5, immediateRender: false }, 0);
      [1, 2, 3].forEach((k) => tl.fromTo(q(".s13-y" + k), { scale: 1, svgOrigin: (560 + (k - 1) * 140 + 45) + " 920" }, { scale: 1.25, svgOrigin: (560 + (k - 1) * 140 + 45) + " 920", duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, YOG + k * 0.08));
      golpe(".s13-nota", YOG + 0.1, 2.2); sacudon(YOG + 0.14, 0.6);
      tl.fromTo(q(".s13-ag"), { y: 0 }, { y: -16, duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, RISAS);
      tl.fromTo(q(".s13-ag-bd"), { rotation: 0, svgOrigin: "290 310" }, { rotation: -12, svgOrigin: "290 310", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 0.1);
"""
SFX = [{"t": 0.05, "sfx": "click-soft", "vol": 0.3}, {"t": 1.0, "sfx": "pop", "vol": 0.3}]
