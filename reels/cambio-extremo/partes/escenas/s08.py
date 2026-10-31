from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-mon { left: 40px; top: 760px; }
    [data-composition-id="%ID%"] .s08-vid { left: 500px; top: 700px; width: 520px; height: 560px; }
    [data-composition-id="%ID%"] .s08-rod { left: 420px; top: 1120px; width: 260px; height: 380px; }
"""
dest = "".join([destello("s08-d", 560, 720, 34), destello("s08-d", 990, 760, 28, T), destello("s08-d", 980, 1210, 36), destello("s08-d", 520, 1180, 22, W)])
vid = f'''<svg viewBox="0 0 520 560" aria-hidden="true">
  <rect x="30" y="40" width="460" height="480" rx="14" fill="{T}" fill-opacity="0.35" {S}/>
  <rect x="30" y="40" width="460" height="480" rx="14" fill="none" stroke="{W}" stroke-width="10"/>
  <path d="M80 470 V380 H160 V470 Z M200 470 V330 H270 V470 Z M310 470 Q360 360 410 470 Z" fill="{W}" {S}/>
  <path d="M260 40 V520 M30 230 H490" stroke="{N}" stroke-width="22"/>
  <path d="M260 230 Q190 160 190 210 Q190 260 260 230 Q330 160 330 210 Q330 260 260 230 Z" fill="{N}" {S}/>
  <path d="M260 230 L220 300 M260 230 L300 300" stroke="{N}" stroke-width="20" stroke-linecap="round"/>
  <path d="M90 90 L170 90 M90 120 L140 120" stroke="{W}" stroke-width="10" stroke-linecap="round"/>
</svg>'''
rod = f'''<svg viewBox="0 0 260 380" aria-hidden="true"><rect x="20" y="20" width="220" height="80" rx="18" fill="{W}" {S}/>
  <path d="M240 60 L250 60 L250 150 L130 150 L130 200" fill="none" stroke="{K}" stroke-width="12"/><rect x="108" y="200" width="44" height="160" rx="16" fill="{N}" {S}/></svg>'''
body = f"""
        <svg class="s08-full" viewBox="0 0 1080 1920" aria-hidden="true">{dest}</svg>
        <div class="obj s08-vid">{vid}</div>
        <div class="obj s08-rod">{rod}</div>
        <div class="fig s08-mon">{monica('s08m')}</div>
"""
js = """
      const PERO = 0.27, VID = 0.81, NUEVA = 1.27;
      gsap.set(q(".s08-mon"), { opacity: 1 });
      tl.fromTo(q(".s08-mon"), { x: -200 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.to(q(".s08m-bd"), { rotation: -165, svgOrigin: "248 300", duration: 0.25, ease: "back.out(2)" }, PERO);
      tl.to(q(".s08m-bd"), { rotation: -150, svgOrigin: "248 300", duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, PERO + 0.3);
      tl.fromTo(q(".s08m-boca"), { scaleY: 1, svgOrigin: "200 240" }, { scaleY: 1.8, svgOrigin: "200 240", duration: 0.12, yoyo: true, repeat: 13, ease: "sine.inOut", immediateRender: false }, 0);
      tl.to(q(".s08-mon"), { rotation: 3, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.3);
      pop(q(".s08-vid"), VID - 0.05, 0.35);
      qa(".s08-d").forEach((d, i) => { pop(d, VID + 0.1 + i * 0.08, 0.25); tl.to(d, { rotation: 90, transformOrigin: "50% 50%", duration: 1.2, ease: "none" }, VID + 0.3); });
      gsap.set(q(".s08-rod"), { opacity: 0 });
      tl.fromTo(q(".s08-rod"), { opacity: 1, y: -1300, rotation: -30 }, { opacity: 1, y: 0, rotation: 8, duration: 0.3, ease: "bounce.out", immediateRender: false }, NUEVA - 0.1);
      sacudon(NUEVA + 0.15, 0.9);
"""
sfx = [{"t": 0.8, "sfx": "sparkle", "vol": 0.3}, {"t": 1.2, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.4, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
escena("s08-vidriera", p, 2.32, css, body, js, sfx)
