from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-foto { left: 150px; top: 640px; width: 780px; height: 760px; }
    [data-composition-id="%ID%"] .s08-epoca { left: 0; right: 0; top: 560px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; color: #ff9a3c; -webkit-text-stroke: 10px #0b0f1a; paint-order: stroke fill; position: absolute; text-shadow: 7px 7px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .s08-glo { left: 560px; top: 905px; font-size: 40px; }
"""
foto = f'''<svg viewBox="0 0 780 760" aria-hidden="true">
  <rect x="20" y="20" width="740" height="720" rx="10" fill="{C}" {S}/>
  <rect x="60" y="60" width="660" height="560" fill="#e9b97a" stroke="{K}" stroke-width="5"/>
  <g opacity="0.9">
    <rect x="120" y="230" width="420" height="390" fill="{A}" stroke="{K}" stroke-width="5"/>
    <g class="s08-cartel"><rect x="110" y="150" width="440" height="84" rx="8" fill="{K}"/>
    <text x="330" y="210" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="58" fill="{Y}">ALMACÉN</text></g>
    <rect x="160" y="290" width="160" height="150" fill="{C}" opacity="0.7" stroke="{K}" stroke-width="5"/>
    <rect x="370" y="300" width="120" height="320" fill="{K}" opacity="0.8"/>
    <path d="M170 420 h40 v-40 h-40z M230 420 h40 v-60 h-40z" fill="{R}" opacity="0.7"/>
  </g>
  <g class="s08-vecino"><circle cx="610" cy="430" r="44" fill="{C}" {S}/><path d="M560 620 Q560 500 610 490 Q660 500 660 620 Z" fill="{N}" {S}/>
    <path d="M574 410 Q610 370 646 410" fill="{H}" {S}/><circle cx="596" cy="432" r="5" fill="{K}"/><circle cx="624" cy="432" r="5" fill="{K}"/></g>
  <rect x="60" y="60" width="660" height="560" fill="{A}" opacity="0.18"/>
  <text x="390" y="690" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="{K}" letter-spacing="3">MONTEVIDEO, HACE MUCHO</text>
</svg>'''
body = f"""
        <div class="obj s08-foto">{foto}</div>
        <div class="s08-epoca">EN MI ÉPOCA...</div>
        <div class="globo s08-glo">¿Dónde queda<br>lo de Nélida?</div>
"""
js = """
      const MI = 0.54, PREG = 1.18, ALM = 1.82;
      // cuadro 0: la foto vieja cae girando
      tl.fromTo(q(".s08-foto"), { rotation: -14, scale: 1.25, opacity: 0.3, filter: "sepia(1) blur(4px)" }, { rotation: -4, scale: 1, opacity: 1, filter: "sepia(0.5) blur(0px)", duration: 0.45, ease: "power3.out" }, 0);
      tl.to(q(".s08-foto"), { rotation: -2, duration: 2, ease: "sine.inOut" }, 0.5);
      golpe(q(".s08-epoca"), MI + 0.05, -2, 2);
      pop(q(".s08-glo"), PREG, 0.3);
      tl.to(q(".s08-glo"), { y: -8, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, PREG + 0.35);
      tl.fromTo(q(".s08-cartel"), { scale: 1, svgOrigin: "330 192" }, { scale: 1.2, svgOrigin: "330 192", duration: 0.14, yoyo: true, repeat: 3, immediateRender: false }, ALM);
      sacudon(ALM + 0.05, 0.7);
"""
sfx = [{"t": 0.02, "sfx": "whoosh-cinematic", "vol": 0.25, "max": 0.8}, {"t": 0.55, "sfx": "chime", "vol": 0.25}, {"t": 1.18, "sfx": "pop", "vol": 0.25}, {"t": 1.82, "sfx": "click", "vol": 0.3}]
escena("s08-epoca", p, 2.68, css, body, js, sfx)
