from lib import *
p="s10"
def persona(x, y, s, ropa, vamp):
    capa = f'<path class="tinta" fill="#c8102e" d="M-44 -70 L-62 -110 L-20 -86 Z M44 -70 L62 -110 L20 -86 Z" /><path class="tinta" fill="#160a24" d="M-56 0 L-40 -80 L40 -80 L56 0 Z" />' if vamp else ""
    cara = '#dfe8c8' if vamp else '#e8c9a0'
    colm = '<path fill="#fff" stroke="#12061f" stroke-width="2" d="M-8 -118 l3 8 l3 -8 Z M2 -118 l3 8 l3 -8 Z" />' if vamp else '<path class="linea" stroke-width="4" d="M-8 -116 q8 5 16 0" />'
    corb = '' if vamp else '<path class="tinta" fill="#c8102e" d="M0 -80 l-8 10 l8 40 l8 -40 Z" />'
    return f'''<g transform="translate({x} {y}) scale({s})">
      {capa}
      <path class="tinta" fill="{ropa}" d="M-38 0 V-60 q38 -30 76 0 V0 Z" />{corb}
      <circle class="tinta" fill="{cara}" cx="0" cy="-124" r="32" />
      <path class="tinta" fill="#160a24" d="M-32 -128 C-34 -164 34 -164 32 -128 C20 -146 -20 -146 -32 -128 Z" />
      <circle fill="#12061f" cx="-11" cy="-128" r="4" /><circle fill="#12061f" cx="11" cy="-128" r="4" />
      {colm}
    </g>'''
burb_pers = "".join(persona(x, 900, 0.9, "#2a1546", True) for x in (560, 680, 800, 920))
ofi_pers = "".join(persona(x, 1150, 1.0, c, False) for x, c in ((560, "#4a7bd0"), (690, "#7a4e2d"), (820, "#1f7a4a"), (950, "#6d5f86")))
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="{p}-burbuja">
            <circle class="tinta" fill="#f4ead5" cx="380" cy="900" r="16" />
            <circle class="tinta" fill="#f4ead5" cx="420" cy="860" r="24" />
            <path class="tinta" fill="#f4ead5" d="M470 720 C450 640 560 600 620 640 C660 590 780 590 820 640 C880 600 1000 640 980 720 C1030 760 1010 880 960 900 C960 960 860 980 820 950 C780 990 660 990 620 950 C560 980 470 940 480 890 C420 870 420 760 470 720 Z" />
            <g class="{p}-vamps">{burb_pers}</g>
          </g>
          <g class="{p}-oficina">
            <rect class="tinta" fill="#f4ead5" x="470" y="1110" width="540" height="40" rx="6" />
            {ofi_pers}
            <rect class="tinta" fill="#f4ead5" x="470" y="1150" width="540" height="30" rx="6" />
          </g>
          {conde(p, 220, 1240, 0.85)}
        </svg>
        <div class="{p}-hor {p}-h1">TU LOCAL <b>9 a 19</b></div>
        <div class="{p}-hor {p}-h2">TU CLIENTE <b>9 a 19</b></div>
        <div class="sello {p}-sello" style="left: 490px; top: 850px; width: 500px; font-size: 44px; padding: 12px 0 6px;" data-layout-allow-overlap>MISMO HORARIO</div>'''
css = '''
    $S .s10-hor { position: absolute; left: 470px; width: 540px; padding: 12px 0; background: #12061f; border: 5px solid #ffd23f; border-radius: 16px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.12em; color: #f4ead5; }
    $S .s10-hor b { font-family: "Cinzel", serif; font-weight: 900; font-size: 44px; letter-spacing: 0; color: #ffd23f; margin-left: 14px; }
    $S .s10-h1 { top: 640px; }
    $S .s10-h2 { top: 750px; }
'''
js = f'''
      const TODOS = 0.52, VAMP = 0.82, NO = 2.13, TRABAJAN = 3.11, SIETE = 3.89;
      tl.fromTo(q(".{p}-conde"), {{ x: -80, opacity: 0.5 }}, {{ x: 0, opacity: 1, duration: 0.3 }}, 0);
      tl.to(q(".{p}-cabeza"), {{ rotation: 8, svgOrigin: "0 -340", duration: 0.4, ease: "sine.inOut" }}, 0.1);
      // burbuja de pensamiento con vampiros
      gsap.set(q(".{p}-burbuja"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-burbuja"), {{ opacity: 0, scale: 0.6, transformOrigin: "20% 80%" }}, {{ opacity: 1, scale: 1, transformOrigin: "20% 80%", duration: 0.35, ease: "back.out(1.6)", immediateRender: false }}, 0.05);
      qa(".{p}-vamps > g").forEach((g, i) => {{
        gsap.set(g, {{ opacity: 0 }});
        tl.to(g, {{ opacity: 1, duration: 0.15 }}, TODOS + i * 0.1);
      }});
      tl.to(q(".{p}-vamps"), {{ y: -8, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }}, VAMP);
      // "No, amo": se borra la burbuja
      tl.to(q(".{p}-burbuja"), {{ opacity: 0, scale: 0.4, transformOrigin: "20% 80%", duration: 0.25, ease: "power2.in" }}, NO);
      tl.to(q(".{p}-cabeza"), {{ rotation: 0, svgOrigin: "0 -340", duration: 0.2 }}, NO);
      // la gente trabaja hasta las siete
      gsap.set(q(".{p}-oficina"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-oficina"), {{ opacity: 0, y: 80 }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }}, NO + 0.35);
      pop(q(".{p}-h1"), TRABAJAN, 0.7);
      pop(q(".{p}-h2"), SIETE - 0.1, 0.7);
      gsap.set(q(".{p}-sello"), {{ rotation: -6 }});
      slam(q(".{p}-sello"), SIETE + 0.45);
      golpe(SIETE + 0.5, 12);
      muestra(q(".{p}-e1"), TRABAJAN);
'''
sfx=[{"t":0.05,"sfx":"magia","vol":0.25,"max":1.2},{"t":0.55,"sfx":"pop","vol":0.25},{"t":2.13,"sfx":"whoosh-short","vol":0.25},{"t":2.5,"sfx":"typing","vol":0.2,"max":0.6},{"t":3.1,"sfx":"click","vol":0.3},{"t":3.8,"sfx":"click","vol":0.3},{"t":4.3,"sfx":"impact-bass-2","vol":0.4,"max":0.6}]
escena("s10-vampiros", 4.96, css, html, js, sfx, ["trabajan de 9 a 19"])
