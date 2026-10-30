ID = "s08-frente"; DUR = 5.14
import math
def _bz(t, P=((960, 640), (780, 760), (600, 900), (330, 1290))):
    u = 1 - t
    return tuple(u**3*a + 3*u*u*t*b + 3*u*t*t*c + t**3*d for a, b, c, d in zip(*P))
TRIS = ""
for _i in range(9):
    _t = (_i + 0.5) / 9; _x, _y = _bz(_t); _x2, _y2 = _bz(_t + 0.01)
    TRIS += f'<g class="s08-tri"><g transform="translate({_x:.0f} {_y:.0f}) rotate({math.degrees(math.atan2(_y2 - _y, _x2 - _x)):.0f})"><path d="M-26 0 L0 -40 L26 0 Z" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="4" stroke-linejoin="round" /></g></g>\n'
GENTE = [(230, 1150), (300, 1210), (380, 1170), (190, 1230), (360, 1250), (270, 1110)]
PERS = '<circle cx="0" cy="-46" r="16" fill="#f4f6fb" /><path d="M-24 0 C-24 -24 -12 -30 0 -30 C12 -30 24 -24 24 0 Z" fill="#f4f6fb" />'
CSS = """
    $ .s08-aten { left: 0; right: 0; margin: 0 auto; width: 640px; text-align: center; top: 590px; background: #ff8a1f; color: #061428; font-size: 84px; box-shadow: 10px 10px 0 #061428; }
    $ .s08-tu { left: 160px; top: 1260px; background: #ff8a1f; color: #061428; font-size: 32px; }
    $ .s08-en { left: 560px; top: 700px; background: #ffd23f; color: #061428; font-size: 32px; }
    $ .s08-ff { position: absolute; left: 640px; top: 1010px; padding: 6px 14px 4px; background: #061428; border: 4px solid #5ec8ff; color: #5ec8ff; font-size: 30px; letter-spacing: 0.12em; white-space: nowrap; transform: rotate(-38deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
""" + MAPA("s08") + """
          <g clip-path="url(#s08-clipmapa)">
            <g class="s08-frente">
              <path class="s08-linea" d="M960 640 C780 760 600 900 330 1290" fill="none" stroke="#5ec8ff" stroke-width="10" stroke-linecap="round" />
""" + TRIS + """
            </g>
          </g>
          <path class="s08-flecha" d="M380 1120 C440 1000 560 900 640 880 M590 860 L644 878 L610 924" fill="none" stroke="#ffd23f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s08-pin1"><g transform="translate(290 1200)">""" + PIN() + """</g></g>
          <g class="s08-pin2"><g transform="translate(700 860)">""" + PIN("#ffd23f") + """</g></g>
""" + "".join(f'          <g class="s08-p s08-p{i}"><g transform="translate({x} {y}) scale(0.9)">{PERS}</g></g>\n' for i, (x, y) in enumerate(GENTE)) + """
          <g class="s08-met"><g transform="translate(780 1010) scale(0.72)">""" + METEO("s08") + """</g></g>
        </svg>
        <div class="cartela s08-aten">ATENCIÓN</div>
        <div class="cartela s08-tu">TU LOCAL</div>
        <div class="cartela s08-en">EL DE ENFRENTE</div>
        <div class="mono s08-ff">FRENTE FRÍO</div>
"""
JS = """
      const FRENTE = 1.16, ENFRENTE = 2.23, LLEVA = 3.25, CLIENTES = 3.84;
      tl.fromTo(q(".s08-aten"), { scale: 1.15 }, { scale: 1, duration: 0.25, ease: "back.out(2)" }, 0);
      tl.to(q(".s08-aten"), { scale: 1.06, duration: 0.16, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3);
      tl.to(q(".s08-aten"), { y: -200, opacity: 0, duration: 0.25, ease: "power3.in" }, FRENTE - 0.2);
      pop(".s08-tu", 0.15); pop(".s08-en", 0.3);
      entra(".s08-met", 0.2, { x: 400 });
      habla(".s08-met-boca", 0.2, 3.6, "180 296");
      // frente frío
      dibujar(".s08-linea", FRENTE, 0.8);
      qa(".s08-tri").forEach((g, i) => { gsap.set(g, { opacity: 0 }); tl.fromTo(g, { opacity: 1, scale: 0 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(3)", immediateRender: false }, FRENTE + 0.08 * i); });
      tl.fromTo(q(".s08-ff"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, FRENTE + 0.5);
      tl.to(q(".s08-frente"), { x: -70, y: -20, duration: 2.6, ease: "sine.inOut" }, FRENTE + 0.8);
      tl.fromTo(q(".s08-pin2"), { scale: 1, svgOrigin: "700 860" }, { scale: 1.2, svgOrigin: "700 860", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ENFRENTE);
      // se lleva a tus clientes
      dibujar(".s08-flecha", LLEVA - 0.1, 0.4);
      const G = """ + str([list(p) for p in GENTE]) + """;
      G.forEach(([x, y], i) => {
        gsap.set(q(".s08-p" + i), { opacity: 0 });
        tl.to(q(".s08-p" + i), { opacity: 1, duration: 0.15 }, 0.3 + i * 0.05);
        tl.to(q(".s08-p" + i), { x: 620 - x + (i % 3) * 40, y: 910 - y + Math.floor(i / 3) * 50, duration: 0.6, ease: "power2.inOut" }, CLIENTES - 0.4 + i * 0.09);
      });
      tl.to(q(".s08-met-brazo"), { rotation: 50, svgOrigin: "84 430", duration: 0.25, ease: "back.out(2)" }, CLIENTES);
      tl.to(q(".s08-met"), { y: 14, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CLIENTES);
"""
SFX = [{"t": 0.02, "sfx": "glitch-1", "vol": 0.22}, {"t": 0.05, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 1.16, "sfx": "whoosh-cinematic", "vol": 0.2, "max": 1.0}, {"t": 1.3, "sfx": "sparkle", "vol": 0.18}, {"t": 3.4, "sfx": "whoosh", "vol": 0.25}, {"t": 4.0, "sfx": "pop", "vol": 0.25}]
