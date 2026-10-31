from base import *
p = "s16"
css = """
    [data-composition-id="%ID%"] .s16-tapa { left: 110px; top: 530px; width: 860px; height: 1000px; border: 8px solid #d8b25c; background: rgba(14, 12, 16, 0.85); box-shadow: 16px 16px 0 #ff2e88; }
    [data-composition-id="%ID%"] .s16-mast { position: absolute; left: 40px; top: 20px; font-family: "Cormorant", serif; font-weight: 600; font-size: 70px; line-height: 1; color: #f6f1ea; letter-spacing: 0.04em; }
    [data-composition-id="%ID%"] .s16-mast i { font-style: italic; font-weight: 500; color: #ff2e88; }
    [data-composition-id="%ID%"] .s16-ed { position: absolute; right: 40px; top: 40px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.2em; color: #d8b25c; }
    [data-composition-id="%ID%"] .s16-a { left: 0; right: 0; top: 680px; font-size: 116px; }
    [data-composition-id="%ID%"] .s16-b { left: 0; right: 0; top: 820px; font-size: 64px; color: #d8b25c; }
    [data-composition-id="%ID%"] .s16-c { left: 0; right: 0; top: 900px; font-size: 64px; color: #d8b25c; }
    [data-composition-id="%ID%"] .s16-d { left: 0; right: 0; top: 990px; font-size: 120px; }
    [data-composition-id="%ID%"] .s16-hugo { left: 600px; top: 1050px; }
    [data-composition-id="%ID%"] .s16-avion { left: 150px; top: 1170px; width: 360px; height: 300px; }
"""
avion = f'''<svg viewBox="0 0 360 300" aria-hidden="true"><path class="s16-estela" d="M10 280 Q80 200 150 230 Q220 260 230 170" stroke="{V}" stroke-width="6" stroke-dasharray="14 14" fill="none"/>
  <g class="s16-pl"><path d="M200 140 L350 40 L300 190 L260 150 Z" fill="{W}" {S}/><path d="M200 140 L350 40 L260 150 L250 200 Z" fill="{V}" {S}/></g></svg>'''
body = f"""
        <div class="obj s16-tapa"><div class="s16-mast">LAM<i>É</i></div><div class="s16-ed">EDICIÓN COMPARTIR</div></div>
        <div class="fig s16-hugo">{hugo('s16h')}</div>
        <div class="obj s16-avion">{avion}</div>
        <div class="rev s16-a">Mandáselo</div>
        <div class="rev it s16-b">al que dice que</div>
        <div class="rev it s16-c">su sistema</div>
        <div class="rev it f s16-d">le queda pintado.</div>
"""
js = """
      const MAN = 0.0, DICE = 0.70, SIS = 1.21, QUEDA = 1.73, PINT = 1.90;
      // cuadro 0: la tapa de la revista
      tl.fromTo(q(".s16-tapa"), { scale: 0.9, rotation: -4, opacity: 0.4 }, { scale: 1, rotation: -1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }, 0);
      golpe(q(".s16-a"), 0.12, -2, 2.2);
      pop(q(".s16-b"), DICE - 0.05, 0.3);
      pop(q(".s16-c"), SIS - 0.05, 0.3);
      golpe(q(".s16-d"), PINT, -3, 2.4);
      sacudon(PINT + 0.05, 1);
      // Don Hugo, con su buzo talle único, convencido
      gsap.set(q(".s16-hugo"), { scale: 0.62, transformOrigin: "50% 0%" });
      entra(q(".s16-hugo"), QUEDA - 0.1, { x: 500 }, 0.35);
      tl.to(q(".s16h-bd"), { rotation: -120, svgOrigin: "252 300", duration: 0.3, ease: "back.out(2)" }, QUEDA + 0.3);
      tl.to(q(".s16h-panza"), { scale: 1.08, svgOrigin: "200 440", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, PINT + 0.4);
      // el avioncito de compartir
      gsap.set(q(".s16-avion"), { opacity: 0 });
      tl.to(q(".s16-avion"), { opacity: 1, duration: 0.1 }, 0.4);
      dibujar(q(".s16-estela"), 0.4, 0.7);
      tl.fromTo(q(".s16-pl"), { x: -200, y: 100, scale: 0.6, svgOrigin: "270 130" }, { x: 0, y: 0, scale: 1, svgOrigin: "270 130", duration: 0.7, ease: "power2.out" }, 0.4);
      vaiven(q(".s16-pl"), 1.2, DUR - 1.6, { y: -14 }, 0.5);
      vaiven(q(".s16-d"), 2.4, DUR - 2.8, { scale: 1.04 }, 0.5);
"""
sfx = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.5}, {"t": 0.4, "sfx": "whoosh", "vol": 0.3, "max": 0.6}, {"t": 1.65, "sfx": "whoosh-short", "vol": 0.25},
       {"t": 1.88, "sfx": "pop", "vol": 0.35}, {"t": 2.2, "sfx": "sparkle", "vol": 0.3}]
escena("s16-cta", p, 5.81, css, body, js, sfx)
