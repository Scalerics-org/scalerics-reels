from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s02-t1 { top: 590px; font-size: 104px; }
    [data-composition-id="%ID%"] .s02-arb { left: 700px; top: 560px; width: 400px; height: 560px; }
    [data-composition-id="%ID%"] .s02-sello { top: 1040px; font-size: 120px; color: #e63946; background: #f4f1e8; }
"""
arb = f'''<svg viewBox="0 0 400 560" aria-hidden="true">
  <g class="s02-brazo"><path d="M420 560 L250 300 L200 170" stroke="{K}" stroke-width="64" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M420 560 L250 300 L200 170" stroke="#22324f" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M232 260 L270 330" stroke="{B}" stroke-width="10"/>
  <rect x="130" y="20" width="120" height="170" rx="12" fill="{R}" stroke="{K}" stroke-width="7" transform="rotate(-12 190 105)"/>
  <circle cx="200" cy="176" r="30" fill="{B}" {S}/></g>
</svg>'''
body = f"""
        <div class="fig s02-dt">{profe('s02p')}</div>
        <div class="big c s02-t1">El fútbol es así</div>
        <div class="obj s02-arb">{arb}</div>
        <div class="sello centro s02-sello">Nada</div>
"""
js = """
      const FUTBOL = 0.10, ASI = 0.56, MERECIMOS = 0.75, MAS = 1.49, ARBITRO = 2.69, NADA = 3.43;
      brazoSet("s02p", "i", 8); brazoSet("s02p", "d", -8);
      habla(".s02p-boca", 0.0, 3.9, "230 262");
      vaiven(q(".s02-dt"), 0.2, 3.8, { rotation: 1.5 }, 0.45);
      golpe(q(".s02-t1"), FUTBOL + 0.1, -2, 2.2);
      // se encoge de hombros: el fútbol es así
      brazo("s02p", "i", 40, ASI); brazo("s02p", "d", -40, ASI);
      tl.to(q(".s02p-cejas"), { y: -8, duration: 0.2 }, ASI);
      brazo("s02p", "i", 8, MAS); brazo("s02p", "d", -8, MAS);
      tl.to(q(".s02p-cejas"), { y: 4, duration: 0.2 }, MAS);
      tl.to(q(".s02-t1"), { opacity: 0, y: -40, duration: 0.2 }, ARBITRO - 0.4);
      // el árbitro saca la roja
      entra(q(".s02-arb"), ARBITRO - 0.15, { x: 420, y: 200 }, 0.3);
      tl.fromTo(q(".s02-brazo"), { rotation: 0, svgOrigin: "400 560" }, { rotation: -4, svgOrigin: "400 560", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ARBITRO + 0.2);
      brazo("s02p", "d", -120, ARBITRO);
      tl.to(q(".s02-dt"), { x: -140, duration: 0.3, ease: "power2.out" }, ARBITRO);
      tl.to(q(".s02p-cachetes"), { scale: 1.4, svgOrigin: "230 232", duration: 0.2 }, ARBITRO);
      golpe(q(".s02-sello"), NADA, -6, 2.6);
      sacudon(NADA + 0.05, 1.6);
"""
sfx = [{"t": 0.1, "sfx": "whoosh-short", "vol": 0.2}, {"t": 0.15, "sfx": "pop", "vol": 0.25}, {"t": 2.6, "sfx": "whoosh", "vol": 0.25, "max": 0.5},
       {"t": 2.75, "sfx": "click", "vol": 0.25}, {"t": 3.35, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.6}]
escena("s02-arbitro", p, 4.26, css, body, js, sfx)
