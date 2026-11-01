from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s06-lib { left: 700px; top: 610px; width: 340px; height: 246px; }
    [data-composition-id="%ID%"] .s06-cartel { left: 40px; top: 580px; width: 340px; height: 330px; }
"""
cartel = f'''<svg viewBox="0 0 340 330" aria-hidden="true"><g class="s06-c">
  <path d="M170 10 L60 130 M170 10 L280 130" stroke="{K}" stroke-width="6" fill="none"/><circle cx="170" cy="12" r="10" fill="{Y}" stroke="{K}" stroke-width="4"/>
  <rect x="20" y="120" width="300" height="190" rx="14" fill="{B}" stroke="{K}" stroke-width="7"/>
  <text x="170" y="180" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" letter-spacing="4" fill="{N}">CERRADO</text>
  <text x="170" y="236" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="{R}">PASÁ EL</text>
  <text x="170" y="286" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="{R}">LUNES</text></g></svg>'''
body = f"""
        <div class="fig s06-dt">{profe('s06p')}</div>
        <div class="obj s06-lib">{libreta_dt('s06l')}</div>
        <div class="obj s06-cartel">{cartel}</div>
"""
js = """
      const VUELTA = 0.47, PAGINA = 1.04, DECILE = 1.32, PASE = 2.46, LUNES = 2.74;
      brazoSet("s06p", "i", 8); brazoSet("s06p", "d", -8);
      habla(".s06p-boca", 0.0, 3.2, "230 262");
      vaiven(q(".s06-dt"), 0.1, 3.5, { rotation: 1.2 }, 0.45);
      tl.to(q(".s06p-cejas"), { y: 6, duration: 0.2 }, 0);
      // el cuaderno: se da vuelta la página del 0-1
      tl.fromTo(q(".s06-lib"), { opacity: 0.4, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      brazo("s06p", "d", -60, VUELTA - 0.2);
      tl.fromTo(q(".s06l-hoja"), { scaleX: 1, svgOrigin: "180 130" }, { scaleX: -1, svgOrigin: "180 130", duration: 0.5, ease: "power2.inOut", immediateRender: false }, VUELTA);
      tl.set(q(".s06l-hoja text"), { opacity: 0 }, VUELTA + 0.25);
      tl.to(q(".s06-lib"), { rotation: -6, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, PAGINA);
      brazo("s06p", "d", -8, DECILE);
      // decile que pase el lunes
      brazo("s06p", "i", 80, DECILE + 0.2);
      tl.to(q(".s06p-bi"), { rotation: 60, svgOrigin: "140 330", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, DECILE + 0.5);
      gsap.set(q(".s06-cartel"), { opacity: 0 });
      tl.fromTo(q(".s06-cartel"), { opacity: 1, y: -420 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, PASE - 0.2);
      tl.fromTo(q(".s06-c"), { rotation: -8, svgOrigin: "170 12" }, { rotation: 8, svgOrigin: "170 12", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, PASE + 0.15);
"""
sfx = [{"t": 0.45, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.0, "sfx": "click-soft", "vol": 0.25},
       {"t": 2.3, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 2.75, "sfx": "pop", "vol": 0.25}]
escena("s06-pagina", p, 3.81, css, body, js, sfx)
