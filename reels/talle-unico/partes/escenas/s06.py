from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-hugo { left: 140px; top: 660px; }
    [data-composition-id="%ID%"] .s06-caja { left: 520px; top: 1080px; width: 300px; height: 240px; }
    [data-composition-id="%ID%"] .s06-next { top: 520px; font-size: 260px; }
    [data-composition-id="%ID%"] .s06-gancho { left: -1100px; top: 560px; width: 1100px; height: 400px; }
"""
caja = f'''<svg viewBox="0 0 300 240" aria-hidden="true"><path d="M20 70 L150 20 L280 70 L280 210 L150 236 L20 210 Z" fill="{G}" {S}/>
  <path d="M20 70 L150 110 L280 70 M150 110 V236" stroke="{K}" stroke-width="5" fill="none"/>
  <text x="84" y="170" text-anchor="middle" transform="rotate(14 84 170)" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="{K}">SISTEMA</text>
  <text x="216" y="166" text-anchor="middle" transform="rotate(-14 216 166)" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="{K}">1 TALLE</text></svg>'''
gancho = f'''<svg viewBox="0 0 1100 400" aria-hidden="true"><path d="M0 230 L1000 230 Q1080 230 1080 150 Q1080 80 1010 80 Q950 80 950 140" fill="none" stroke="{K}" stroke-width="44" stroke-linecap="round"/>
  <path d="M0 230 L1000 230 Q1080 230 1080 150 Q1080 80 1010 80 Q950 80 950 140" fill="none" stroke="{D}" stroke-width="28" stroke-linecap="round"/></svg>'''
body = f"""
        <div class="obj s06-caja">{caja}</div>
        <div class="fig s06-hugo">{hugo('s06h')}</div>
        <div class="obj s06-gancho">{gancho}</div>
        <div class="rev it f s06-next">Next.</div>
"""
js = """
      const PERO = 0.0, VENIA = 0.46, NEXT = 1.67;
      const h = q(".s06-hugo");
      // cuadro 0: Don Hugo indignado con la caja del sistema
      gsap.set(h, { scale: 1.05, transformOrigin: "50% 100%" });
      tl.fromTo(h, { x: -40 }, { x: 0, duration: 0.25, ease: "power2.out" }, 0);
      tl.to(q(".s06h-bi"), { rotation: 150, svgOrigin: "148 300", duration: 0.25, ease: "back.out(2)" }, 0.05);
      tl.to(q(".s06h-bd"), { rotation: -110, svgOrigin: "252 300", duration: 0.25, ease: "back.out(2)" }, 0.1);
      habla(".s06h-boca", 0.0, 1.0, "200 246");
      tl.to(h, { y: -18, duration: 0.1, yoyo: true, repeat: 5 }, VENIA - 0.2);
      pop(q(".s06-caja"), VENIA - 0.1, 0.3, { rotation: 6 });
      // NEXT: el gancho de vodevil se lo lleva
      golpe(q(".s06-next"), NEXT, -4, 3);
      sacudon(NEXT + 0.04, 1.4);
      tl.to(q(".s06-gancho"), { x: 1100 + 80, duration: 0.22, ease: "power3.out" }, NEXT - 0.25);
      tl.to([q(".s06-gancho"), h, q(".s06-caja")], { x: "-=1300", duration: 0.45, ease: "power3.in" }, NEXT + 0.1);
      tl.to(h, { rotation: -20, duration: 0.3 }, NEXT + 0.1);
"""
sfx = [{"t": 0.05, "sfx": "glitch-1", "vol": 0.2, "max": 0.3}, {"t": 0.4, "sfx": "pop", "vol": 0.3},
       {"t": 1.5, "sfx": "whoosh", "vol": 0.3, "max": 0.6}, {"t": 1.62, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.85, "sfx": "whoosh-cinematic", "vol": 0.25, "max": 0.8}]
escena("s06-next", p, 2.65, css, body, js, sfx)
