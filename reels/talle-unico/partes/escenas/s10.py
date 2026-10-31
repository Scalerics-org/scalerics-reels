from base import *
from base import _pierna
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-zap { left: 40px; top: 560px; width: 1000px; height: 900px; }
    [data-composition-id="%ID%"] .s10-ta { left: 80px; top: 1260px; }
    [data-composition-id="%ID%"] .s10-tb { left: 600px; top: 1260px; }
    [data-composition-id="%ID%"] .s10-g1 { left: 90px; top: 520px; }
    [data-composition-id="%ID%"] .s10-g2 { left: 640px; top: 520px; box-shadow: 8px 8px 0 #d8b25c; }
"""
zap = f'''<svg viewBox="0 0 1000 900" aria-hidden="true">
  <g class="s10-pi">{_pierna(W, 250, 250, 160, 470, 70)}
    <path d="M110 560 L330 470 Q380 470 380 520 L380 560 Q240 640 130 640 Q90 620 110 560 Z" fill="{F}" {S}/>
    <path d="M330 560 L350 760" stroke="{K}" stroke-width="22" stroke-linecap="round"/><path d="M330 560 L350 760" stroke="{F}" stroke-width="12" stroke-linecap="round"/>
    <path d="M130 600 Q240 590 360 540" stroke="{W}" stroke-width="5" fill="none" opacity="0.6"/></g>
  <g class="s10-pd">{_pierna(W, 740, 740, 160, 380, 70)}
    <path d="M640 360 L840 360 L850 640 L930 650 Q980 680 960 740 L640 740 Z" fill="{G}" {S}/>
    <path d="M640 420 H840 M640 460 H840" stroke="{K}" stroke-width="5"/>
    <path d="M650 740 V770 L960 770 V740" fill="{K}"/></g>
  <path class="s10-corte" d="M500 300 L500 800" stroke="{F}" stroke-width="10" stroke-dasharray="26 22"/>
  <g class="s10-x"><path d="M440 520 L560 640 M560 520 L440 640" stroke="{K}" stroke-width="40" stroke-linecap="round"/><path d="M440 520 L560 640 M560 520 L440 640" stroke="{F}" stroke-width="24" stroke-linecap="round"/></g>
</svg>'''
body = f"""
        <div class="obj s10-zap">{zap}</div>
        {tag('s10-ta', 'Sistema A', 'local 1', color=F, rot=-6)}
        {tag('s10-tb', 'Sistema B', 'local 2', rot=6)}
        <div class="globo s10-g1">¿Stock?</div>
        <div class="globo s10-g2">¿Ventas?</div>
"""
js = """
      const ZAP = 0.17, CADA = 0.95, PAR = 1.10, DOS = 1.80, SIS = 1.95, NO = 2.55, HAB = 2.71;
      // cuadro 0: los pies ya en primer plano
      tl.fromTo(q(".s10-pi"), { y: -60 }, { y: 0, duration: 0.3, ease: "bounce.out" }, 0);
      tl.fromTo(q(".s10-pd"), { y: -60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "bounce.out" }, 0.08);
      tl.to(q(".s10-pi"), { rotation: -6, svgOrigin: "250 160", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, ZAP);
      tl.to(q(".s10-pd"), { rotation: 6, svgOrigin: "740 160", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CADA);
      dibujar(q(".s10-corte"), PAR - 0.1, 0.4);
      // dos sistemas que no se hablan
      gsap.set([q(".s10-ta"), q(".s10-tb")], { transformOrigin: "100% 50%" });
      golpe(q(".s10-ta"), DOS, -6, 2.2);
      golpe(q(".s10-tb"), SIS + 0.1, 6, 2.2);
      pop(q(".s10-g1"), SIS + 0.2, 0.3);
      pop(q(".s10-g2"), NO - 0.1, 0.3);
      gsap.set(q(".s10-x"), { opacity: 0 });
      tl.fromTo(q(".s10-x"), { opacity: 1, scale: 2.5, svgOrigin: "500 580" }, { opacity: 1, scale: 1, svgOrigin: "500 580", duration: 0.18, ease: "power4.in", immediateRender: false }, HAB - 0.1);
      sacudon(HAB + 0.05, 1.3);
      tl.to(q(".s10-g1"), { x: -30, rotation: -6, duration: 0.2 }, HAB + 0.1);
      tl.to(q(".s10-g2"), { x: 30, rotation: 6, duration: 0.2 }, HAB + 0.1);
"""
sfx = [{"t": 0.05, "sfx": "click", "vol": 0.3}, {"t": 0.2, "sfx": "click-soft", "vol": 0.25}, {"t": 1.05, "sfx": "whoosh-short", "vol": 0.25},
       {"t": 1.75, "sfx": "pop", "vol": 0.3}, {"t": 2.0, "sfx": "pop", "vol": 0.3}, {"t": 2.65, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}]
escena("s10-zapatos", p, 3.73, css, body, js, sfx)
