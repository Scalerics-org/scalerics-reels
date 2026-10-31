from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-due { left: 40px; top: 690px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s08-mos { left: 0px; top: 1130px; width: 640px; height: 400px; }
    [data-composition-id="%ID%"] .s08-nov { left: 640px; top: 800px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s08-solo { top: 560px; font-size: 170px; }
    [data-composition-id="%ID%"] .s08-que { top: 560px; font-size: 104px; }
"""
cajas = "".join(f'<rect x="{x}" y="{y}" width="150" height="70" rx="6" fill="{c}" {S}/><path d="M{x + 20} {y + 35} H{x + 70}" stroke="{K}" stroke-width="5"/>' for x, y, c in [(40, 150, V), (40, 80, R), (40, 10, D), (200, 150, R), (200, 80, V), (360, 150, D)])
mos = f'''<svg viewBox="0 0 640 400" aria-hidden="true">{cajas}
  <rect x="10" y="220" width="620" height="180" fill="{V}" {S}/><rect x="0" y="210" width="640" height="30" rx="6" fill="{D}" {S}/>
  <path d="M60 290 H580 M60 340 H580" stroke="{K}" stroke-width="5" opacity="0.35"/>
  <g class="s08-tel"><rect x="470" y="150" width="70" height="60" rx="10" fill="{K}" stroke="{M}" stroke-width="4"/><rect x="480" y="158" width="50" height="40" rx="5" fill="{A}"/>
    <circle cx="530" cy="150" r="16" fill="{V}" {S}/><text x="530" y="158" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="20" fill="{M}">9</text></g>
</svg>'''
body = f"""
        <div class="fig s08-due">{dueno('s08d')}</div>
        <div class="obj s08-mos">{mos}</div>
        <div class="fig s08-nov">{novio('s08v')}</div>
        <div class="big a s08-solo">¡Solo!</div>
        <div class="big d s08-que">¿Qué tiene él?</div>
"""
js = """
      const SOLO = 0.37, MOSTR = 0.92, TIENE = 2.03, EL = 2.40, YO = 3.14;
      gsap.set(q(".s08d-bi"), { rotation: 110, svgOrigin: "150 292" });
      gsap.set(q(".s08d-bd"), { rotation: -110, svgOrigin: "250 292" });
      tl.fromTo(q(".s08-due"), { y: 30 }, { y: 0, duration: 0.25, ease: "back.out(2)" }, 0);
      habla(".s08d-boca", 0.0, 3.6, "200 250");
      gsap.set(q(".s08d-gotas"), { opacity: 1 });
      tl.fromTo(q(".s08d-gotas"), { y: 0 }, { y: 30, duration: 0.4, repeat: 8, ease: "power1.in", immediateRender: false }, 0);
      tl.to([q(".s08d-bi"), q(".s08d-bd")], { rotation: 0, svgOrigin: "200 292", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.1);
      golpe(q(".s08-solo"), SOLO + 0.1, -4, 2.6);
      sacudon(SOLO + 0.15, 1.3);
      tl.fromTo(q(".s08-tel"), { x: 0 }, { x: 6, duration: 0.05, yoyo: true, repeat: 23, ease: "none", immediateRender: false }, MOSTR);
      // ¿qué tiene él?: señala al novio, que posa
      tl.to(q(".s08-solo"), { opacity: 0, y: -40, duration: 0.15 }, TIENE - 0.2);
      gsap.set(q(".s08-nov"), { opacity: 0 });
      tl.fromTo(q(".s08-nov"), { opacity: 1, x: 400 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.5)", immediateRender: false }, TIENE - 0.2);
      tl.to(q(".s08d-bd"), { rotation: -80, svgOrigin: "250 292", duration: 0.2, ease: "back.out(2)" }, TIENE);
      tl.to(q(".s08d-bi"), { rotation: 20, svgOrigin: "150 292", duration: 0.2 }, TIENE);
      golpe(q(".s08-que"), EL, 3, 2.4);
      tl.to(q(".s08v-ojod"), { opacity: 0, duration: 0.05 }, YO);
      tl.to(q(".s08v-guino"), { opacity: 1, duration: 0.05 }, YO);
      tl.to(q(".s08v-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, EL);
      vaiven(q(".s08-nov"), EL + 0.3, 1.4, { rotation: 3 }, 0.35);
"""
sfx = [{"t": 0.4, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 0.95, "sfx": "notification", "vol": 0.2},
       {"t": 1.85, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.35, "sfx": "pop", "vol": 0.3}, {"t": 3.15, "sfx": "sparkle", "vol": 0.25}]
escena("s08-mostrador", p, 4.12, css, body, js, sfx)
