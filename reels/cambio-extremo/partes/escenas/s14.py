from base import *
p = "s14"
css = """
    [data-composition-id="%ID%"] .s14-local { left: 20px; top: 820px; width: 600px; height: 600px; }
    [data-composition-id="%ID%"] .s14-cap { left: 680px; top: 790px; }
    [data-composition-id="%ID%"] .s14-rod { left: 430px; top: 1000px; width: 300px; height: 420px; }
    [data-composition-id="%ID%"] .s14-igual { top: 570px; font-size: 170px; }
"""
rod = f'''<svg viewBox="0 0 300 420" aria-hidden="true"><rect x="20" y="20" width="200" height="74" rx="18" fill="{T}" {S}/>
  <path d="M220 56 L240 56 L240 150 L160 150 L160 210" fill="none" stroke="{K}" stroke-width="12"/><rect x="138" y="210" width="44" height="170" rx="16" fill="{N}" {S}/></svg>'''
body = f"""
        <div class="obj s14-local">{local('s14l', 'REGALOS MÓNICA')}</div>
        <svg class="s14-full" viewBox="0 0 1080 1920" aria-hidden="true"><rect class="s14-pint" x="90" y="1020" width="470" height="74" fill="{T}" opacity="0.9"/></svg>
        <div class="fig s14-cap">{capataz('s14c', planilla=False)}</div>
        <div class="obj s14-rod">{rod}</div>
        <div class="big y s14-igual">¡igual!</div>
"""
js = """
      const PINT = 0.61, IGUAL = 0.95, EH = 1.25;
      gsap.set(q(".s14-cap"), { opacity: 1 });
      tl.fromTo(q(".s14-cap"), { x: 300 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      habla(".s14c-boca", 0, 1.9, "200 246");
      gsap.set(q(".s14c-bi"), { rotation: -40, svgOrigin: "148 296" });
      gsap.set(q(".s14-pint"), { scaleX: 0, transformOrigin: "100% 50%" });
      tl.fromTo(q(".s14-rod"), { x: 0, y: 0 }, { x: 0, y: 0, duration: 0.01 }, 0);
      tl.to(q(".s14-rod"), { x: -340, duration: 0.35, ease: "power1.inOut" }, PINT);
      tl.to(q(".s14-pint"), { scaleX: 1, duration: 0.35, ease: "power1.inOut" }, PINT);
      tl.to(q(".s14-rod"), { x: -40, duration: 0.3, ease: "power1.inOut" }, PINT + 0.4);
      golpe(q(".s14-igual"), IGUAL + 0.05, -5, 2.6);
      sacudon(IGUAL + 0.08, 1.1);
      // guiño
      tl.to(q(".s14c-ojos"), { scaleY: 0.15, svgOrigin: "200 192", duration: 0.08, yoyo: true, repeat: 1 }, EH);
      tl.to(q(".s14c-ceja"), { y: -10, duration: 0.12, yoyo: true, repeat: 1 }, EH);
      tl.to(q(".s14-cap"), { rotation: -4, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 3 }, EH);
"""
sfx = [{"t": 0.6, "sfx": "whoosh", "vol": 0.25, "max": 0.4}, {"t": 0.95, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 1.25, "sfx": "click", "vol": 0.3}]
escena("s14-fachada", p, 2.14, css, body, js, sfx)
