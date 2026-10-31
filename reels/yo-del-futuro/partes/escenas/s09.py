from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-reloj { left: 50%; top: 560px; width: 700px; margin-left: -350px; font-size: 190px; padding-top: 24px; }
    [data-composition-id="%ID%"] .s09-cama { left: 100px; top: 1000px; width: 880px; height: 460px; }
"""
cama = f'''<svg viewBox="0 0 880 460" aria-hidden="true">
  <rect x="20" y="120" width="40" height="320" rx="10" fill="{V}" {S}/><rect x="820" y="220" width="40" height="220" rx="10" fill="{V}" {S}/>
  <rect x="40" y="290" width="800" height="90" rx="14" fill="{W}" {S}/>
  <rect x="80" y="210" width="210" height="90" rx="40" fill="{W}" {S}/>
  <g class="s09-cara"><circle cx="190" cy="200" r="64" fill="{W}" {S}/>
    <path d="M128 200 Q124 130 190 128 Q256 130 252 200 Q230 170 190 172 Q150 170 128 200 Z" fill="{K}" {S}/>
    <ellipse cx="216" cy="206" rx="7" ry="9" fill="{K}"/><ellipse cx="176" cy="206" rx="7" ry="9" fill="{K}"/>
    <path d="M166 244 Q190 236 214 244" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M150 230 Q160 234 166 228 M216 228 Q222 234 232 230" stroke="{V}" stroke-width="4" fill="none"/></g>
  <path d="M250 250 Q500 210 840 270 L840 330 L230 330 Z" fill="{M}" {S}/>
  <path d="M300 270 Q520 236 820 286" stroke="{K}" stroke-width="4" fill="none" opacity="0.4"/>
  <g class="s09-luz"><path d="M300 140 L210 200 L250 230 Z" fill="{C}" opacity="0.35"/></g>
  <g class="s09-cel"><rect x="290" y="96" width="70" height="120" rx="14" fill="{K}" stroke="{C}" stroke-width="6"/><rect x="300" y="110" width="50" height="90" rx="6" fill="{C}"/></g>
</svg>'''
body = f"""
        <div class="reloj cy s09-reloj">23:00</div>
        <div class="obj s09-cama">{cama}</div>
"""
js = """
      const ONCE = 0.14, NOCHE = 0.75, CEL = 1.18;
      golpe(q(".s09-reloj"), ONCE, -2, 2.4);
      sacudon(ONCE + 0.05, 1.2);
      tl.to(q(".s09-reloj"), { opacity: 0.55, duration: 0.25, yoyo: true, repeat: 5, ease: "steps(1)" }, NOCHE);
      tl.fromTo(q(".s09-cama"), { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }, 0);
      gsap.set([q(".s09-cel"), q(".s09-luz")], { opacity: 0 });
      tl.fromTo(q(".s09-cel"), { opacity: 1, y: 120 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, CEL - 0.2);
      tl.fromTo(q(".s09-luz"), { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, CEL);
      tl.to(q(".s09-luz"), { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)" }, CEL + 0.12);
"""
sfx = [{"t": 0.1, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 0.12, "sfx": "click", "vol": 0.25}, {"t": 1.15, "sfx": "notification", "vol": 0.3}]
escena("s09-once", p, 1.97, css, body, js, sfx)
