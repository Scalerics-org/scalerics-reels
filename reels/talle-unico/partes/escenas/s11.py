from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-lau { left: 340px; top: 700px; }
    [data-composition-id="%ID%"] .s11-molde { left: 300px; top: 600px; width: 480px; height: 860px; }
    [data-composition-id="%ID%"] .s11-et { left: 0; right: 0; text-align: center; top: 470px; font-size: 30px; color: #d8b25c; }
    [data-composition-id="%ID%"] .s11-tag { left: 620px; top: 1150px; }
"""
molde = f'''<svg viewBox="0 0 480 860" aria-hidden="true">
  <rect x="40" y="40" width="400" height="790" fill="none" stroke="{GL}" stroke-width="10" stroke-dasharray="40 20"/>
  <rect x="40" y="0" width="400" height="56" fill="{G}" {S}/>
  <text x="240" y="40" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="{K}">EL SISTEMA</text>
</svg>'''
body = f"""
        <div class="fig s11-lau">{laura('s11l')}</div>
        <div class="obj s11-molde">{molde}</div>
        <div class="mono s11-et">molde del sistema</div>
        {tag('s11-tag', 'Así nomás', 'talle único', color=G, rot=8)}
"""
js = """
      const BUENO = 0, ACOS = 0.62, AHORA = 1.66, VENDO = 1.87, SIS = 2.41, DEJA = 2.95;
      const l = q(".s11-lau");
      gsap.set(l, { transformOrigin: "50% 100%" });
      tl.fromTo(l, { x: -60 }, { x: 0, duration: 0.3, ease: "power2.out" }, 0);
      // se encoge de hombros
      tl.to(q(".s11l-bi"), { rotation: 70, svgOrigin: "152 300", duration: 0.25, ease: "back.out(2)" }, 0.1);
      tl.to(q(".s11l-bd"), { rotation: -70, svgOrigin: "248 300", duration: 0.25, ease: "back.out(2)" }, 0.1);
      tl.to(q(".s11l-cabeza"), { y: 14, duration: 0.2, yoyo: true, repeat: 1 }, ACOS);
      habla(".s11l-boca", 0, 3.3, "200 232");
      // el molde del sistema baja y la aplasta
      gsap.set(q(".s11-molde"), { opacity: 0 });
      tl.fromTo(q(".s11-molde"), { opacity: 1, y: -700 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.in", immediateRender: false }, AHORA - 0.1);
      pop(q(".s11-et"), AHORA, 0.3);
      sacudon(AHORA + 0.25, 1.2);
      tl.to(l, { scaleY: 0.82, scaleX: 0.78, duration: 0.25, ease: "back.out(3)" }, AHORA + 0.25);
      tl.to(q(".s11l-bi"), { rotation: -20, duration: 0.2 }, VENDO);
      tl.to(q(".s11l-bd"), { rotation: 20, duration: 0.2 }, VENDO);
      tl.to(q(".s11l-cabeza"), { rotation: -18, svgOrigin: "200 250", duration: 0.25 }, SIS);
      tl.to(q(".s11-molde"), { scaleX: 0.92, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 3 }, SIS);
      gsap.set(q(".s11-tag"), { transformOrigin: "100% 50%" });
      golpe(q(".s11-tag"), DEJA, 8, 2.2);
"""
sfx = [{"t": 0.1, "sfx": "whoosh-short", "vol": 0.2}, {"t": 1.6, "sfx": "whoosh", "vol": 0.3, "max": 0.5}, {"t": 1.9, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6},
       {"t": 2.45, "sfx": "click", "vol": 0.25}, {"t": 2.9, "sfx": "pop", "vol": 0.3}]
escena("s11-acostumbre", p, 3.67, css, body, js, sfx)
