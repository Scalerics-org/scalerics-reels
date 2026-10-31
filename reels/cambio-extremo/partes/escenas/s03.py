from base import *
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-mon { left: 120px; top: 700px; }
    [data-composition-id="%ID%"] .s03-bur { left: 520px; top: 560px; width: 520px; height: 520px; }
"""
burbuja = f'''<svg viewBox="0 0 520 520" aria-hidden="true">
  <circle cx="40" cy="480" r="18" fill="{W}" {S}/><circle cx="90" cy="420" r="28" fill="{W}" {S}/>
  <path d="M120 300 Q90 200 170 160 Q190 70 290 90 Q380 40 430 130 Q520 160 490 260 Q520 360 420 380 Q370 460 270 410 Q170 450 140 370 Q80 350 120 300 Z" fill="{W}" {S}/>
  <g class="s03-rod"><rect x="170" y="160" width="170" height="64" rx="14" fill="{W}" {S}/><path d="M340 192 L360 192 L360 250 L260 250 L260 290" fill="none" stroke="{K}" stroke-width="10"/><rect x="242" y="290" width="36" height="100" rx="12" fill="{N}" {S}/></g>
  <g class="s03-lata"><path d="M330 280 H430 V370 Q430 384 416 384 H344 Q330 384 330 370 Z" fill="{T}" {S}/><ellipse cx="380" cy="280" rx="50" ry="14" fill="{W}" {S}/><path d="M340 300 Q360 330 352 350" stroke="{W}" stroke-width="10" fill="none"/></g>
  <g class="s03-vid"><rect x="150" y="230" width="140" height="140" fill="{T}" opacity="0.5" {S}/><path d="M220 230 V370 M150 300 H290" {S}/></g>
</svg>'''
dest = "".join([destello("s03-d", 120, 760, 34), destello("s03-d", 480, 820, 26, N), destello("s03-d", 90, 1150, 28, T), destello("s03-d", 500, 1200, 36)])
body = f"""
        <svg class="s03-full" viewBox="0 0 1080 1920" aria-hidden="true">{dest}</svg>
        <div class="fig s03-mon">{monica('s03m')}</div>
        <div class="obj s03-bur">{burbuja}</div>
"""
js = """
      const EMO = 0.57, ME = 2.01, PINTAR = 2.46, VID = 2.91;
      const mon = q(".s03-mon");
      gsap.set(mon, { scale: 1.05, transformOrigin: "50% 0%" });
      tl.fromTo(mon, { y: 30 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      // aplaude
      gsap.set(q(".s03m-bi"), { rotation: -40, svgOrigin: "152 300" });
      gsap.set(q(".s03m-bd"), { rotation: 40, svgOrigin: "248 300" });
      tl.to(q(".s03m-bi"), { rotation: -62, svgOrigin: "152 300", duration: 0.12, yoyo: true, repeat: 11, ease: "power2.in" }, EMO);
      tl.to(q(".s03m-bd"), { rotation: 62, svgOrigin: "248 300", duration: 0.12, yoyo: true, repeat: 11, ease: "power2.in" }, EMO);
      vaiven(mon, EMO, 1.4, { y: -24 }, 0.14);
      qa(".s03-d").forEach((d, i) => { pop(d, EMO + i * 0.1, 0.3); tl.to(d, { rotation: 180, transformOrigin: "50% 50%", scale: 1.2, duration: 2.6, ease: "none" }, EMO + 0.3); });
      tl.fromTo(q(".s03m-boca"), { scaleY: 1, svgOrigin: "200 240" }, { scaleY: 1.8, svgOrigin: "200 240", duration: 0.12, yoyo: true, repeat: 25, ease: "sine.inOut", immediateRender: false }, 0);
      // la burbuja: pintar la vidriera
      pop(q(".s03-bur"), ME, 0.35);
      tl.to(mon, { rotation: -4, transformOrigin: "50% 100%", duration: 0.3 }, ME);
      tl.to(q(".s03m-bd"), { rotation: -150, svgOrigin: "248 300", duration: 0.25, ease: "back.out(2)" }, ME);
      gsap.set([q(".s03-rod"), q(".s03-lata"), q(".s03-vid")], { opacity: 0 });
      tl.fromTo(q(".s03-lata"), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PINTAR - 0.1);
      tl.fromTo(q(".s03-rod"), { opacity: 0, rotation: -40, svgOrigin: "260 290" }, { opacity: 1, rotation: 0, svgOrigin: "260 290", duration: 0.3, ease: "back.out(2)", immediateRender: false }, PINTAR);
      tl.to(q(".s03-rod"), { rotation: 18, svgOrigin: "260 290", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, PINTAR + 0.3);
      tl.fromTo(q(".s03-vid"), { opacity: 0, scale: 0.4, svgOrigin: "220 300" }, { opacity: 1, scale: 1, svgOrigin: "220 300", duration: 0.3, ease: "back.out(2)", immediateRender: false }, VID);
      tl.to(q(".s03-bur"), { y: -14, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, ME + 0.4);
"""
sfx = [{"t": 0.55, "sfx": "click", "vol": 0.25}, {"t": 0.8, "sfx": "click", "vol": 0.22}, {"t": 1.05, "sfx": "click", "vol": 0.22},
       {"t": 2.0, "sfx": "pop", "vol": 0.3}, {"t": 2.45, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.9, "sfx": "sparkle", "vol": 0.3}]
escena("s03-monica", p, 4.10, css, body, js, sfx)
