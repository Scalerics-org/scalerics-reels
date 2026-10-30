# Piezas compartidas por las escenas (personajes, mapa, nube, paraguas, lluvia de mensajes).
# Los personajes están en coordenadas locales (~360 x 560, cabeza arriba, torso abajo): ponelos
# dentro de un <g transform="translate(x y) scale(s)">. Los nombres de clases llevan el prefijo P.
import random

def METEO(P):
    return f"""
              <path class="y" d="M92 250 C70 130 120 62 180 62 C246 62 296 128 276 250 C292 320 282 372 262 404 L104 404 C80 368 74 314 92 250 Z" />
              <path class="l" d="M98 300 C112 330 104 360 116 392 M262 300 C248 330 256 360 244 392" stroke="#0b2547" stroke-width="5" />
              <path class="b" d="M155 320 V392 H205 V320" />
              <g class="{P}-met-brazo">
                <path class="l" d="M84 430 C30 418 -20 398 -78 372" stroke-width="18" />
                <path class="n" d="M84 430 C30 418 -20 398 -78 372" stroke="none" fill="none" />
                <rect x="-112" y="352" width="44" height="30" rx="8" fill="#0b2547" stroke="#f4f6fb" stroke-width="6" transform="rotate(-24 -90 367)" />
              </g>
              <path class="n" d="M30 560 C30 432 92 382 180 382 C268 382 330 432 330 560 Z" />
              <path class="l" d="M148 386 L180 476 L212 386" />
              <circle cx="180" cy="508" r="7" fill="#f4f6fb" />
              <ellipse class="b" cx="180" cy="248" rx="68" ry="80" />
              <path class="y" d="M110 244 C106 168 256 160 252 236 C220 196 150 200 110 244 Z" />
              <path class="l" d="M140 236 L164 232 M196 232 L220 236" stroke-width="5" />
              <circle cx="154" cy="256" r="7" fill="#f4f6fb" /><circle cx="206" cy="256" r="7" fill="#f4f6fb" />
              <circle cx="112" cy="290" r="9" fill="#ff8a1f" stroke="#f4f6fb" stroke-width="4" /><circle cx="248" cy="290" r="9" fill="#ff8a1f" stroke="#f4f6fb" stroke-width="4" />
              <path class="b {P}-met-boca" d="M156 290 C168 308 192 308 204 290 Z" />
"""

def MOVILERO(P):
    return f"""
              <path class="y" d="M30 560 C30 420 92 368 180 368 C268 368 330 420 330 560 Z" />
              <path class="l" d="M180 380 V560 M150 430 h0 M150 480 h0" stroke-width="10" />
              <path class="y {P}-capucha" d="M92 286 C70 150 126 96 180 96 C234 96 290 150 268 286 C252 318 108 318 92 286 Z" />
              <ellipse class="b" cx="180" cy="236" rx="62" ry="72" />
              <path class="l" d="M140 214 L166 222 M220 214 L194 222" stroke-width="5" />
              <circle cx="156" cy="238" r="7" fill="#f4f6fb" /><circle cx="204" cy="238" r="7" fill="#f4f6fb" />
              <ellipse class="b {P}-mov-boca" cx="180" cy="280" rx="18" ry="10" />
              <path class="{P}-chorro" d="M118 300 v26 M246 300 v30 M98 250 v22" stroke="#5ec8ff" stroke-width="6" stroke-linecap="round" fill="none" />
"""

def MIC(P, x, y, rot):
    return f"""
            <g class="{P}-mic"><g transform="translate({x} {y}) rotate({rot})">
              <rect class="b" x="-18" y="0" width="36" height="300" rx="12"/><rect x="-58" y="-100" width="116" height="100" rx="10" fill="#ffd23f" stroke="#f4f6fb" stroke-width="7"/><text x="0" y="-38" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="#061428" data-layout-ignore>MÓVIL</text><circle cx="0" cy="-140" r="48" fill="#0b2547" stroke="#f4f6fb" stroke-width="7"/>
            </g></g>"""

def WALTER(P):
    return f"""
              <path class="l {P}-brazo-i" d="M70 430 C20 400 0 350 10 300" stroke-width="18" />
              <path class="l {P}-brazo-d" d="M290 430 C340 400 360 350 350 300" stroke-width="18" />
              <path class="b" d="M30 560 C30 420 92 370 180 370 C268 370 330 420 330 560 Z" />
              <path class="w" d="M110 382 H250 V560 H110 Z" />
              <path class="l" d="M118 382 L96 370 M242 382 L264 370" />
              <path class="b" d="M152 310 V380 H208 V310" />
              <ellipse class="b" cx="180" cy="240" rx="78" ry="88" />
              <path class="w" d="M104 222 C98 160 140 146 180 146 C222 146 262 160 256 222 L246 196 L234 212 L222 190 L208 206 L194 186 L180 202 L166 186 L152 206 L138 190 L126 212 L114 196 Z" />
              <path class="l {P}-cejas" d="M136 214 L166 222 M224 214 L194 222" stroke-width="6" />
              <circle cx="154" cy="240" r="7" fill="#f4f6fb" /><circle cx="206" cy="240" r="7" fill="#f4f6fb" />
              <path class="b {P}-boca" d="M156 296 C168 306 192 306 204 296 Z" />
              <path class="{P}-bigote" d="M136 278 C156 260 204 260 224 278 C206 292 192 284 180 280 C168 284 154 292 136 278 Z" fill="#f4f6fb" />
              <g class="{P}-gotas" fill="#5ec8ff" stroke="none">
                <path d="M112 252 c-8 14 -8 22 0 24 c8 -2 8 -10 0 -24 Z" /><path d="M252 248 c-8 14 -8 22 0 24 c8 -2 8 -10 0 -24 Z" /><path d="M150 168 c-7 12 -7 19 0 21 c7 -2 7 -9 0 -21 Z" />
              </g>
"""

def CLIENTA(P):
    return f"""
              <path class="w" d="M228 168 C300 140 330 230 296 300 C300 236 276 206 244 204 Z" />
              <path class="y" d="M40 560 C40 422 96 376 180 376 C264 376 320 422 320 560 Z" />
              <path class="l" d="M180 380 V560" />
              <path class="b" d="M155 314 V384 H205 V314" />
              <ellipse class="b" cx="180" cy="242" rx="70" ry="82" />
              <path class="w" d="M108 236 C104 160 256 156 252 232 C226 194 136 196 108 236 Z" />
              <circle cx="154" cy="250" r="7" fill="#f4f6fb" /><circle cx="206" cy="250" r="7" fill="#f4f6fb" />
              <path class="l {P}-cejas" d="M138 224 L166 218 M222 224 L194 218" stroke-width="5" />
              <path class="b {P}-boca" d="M160 288 C170 304 190 304 200 288 Z" />
"""

def NUBE(cls="b", extra=""):
    # nube centrada en 0 0, ~420 x 200
    return f'<path class="{cls}" {extra} d="M-170 60 C-240 60 -240 -30 -160 -40 C-160 -130 -40 -140 -10 -80 C20 -160 160 -140 150 -40 C230 -40 240 60 160 60 Z" />'

def PARAGUAS(P):
    # centrado en 0 0 (la punta de la tela en y -270, la tela termina en y 0, el mango baja hasta y 280)
    return f"""
              <path class="l" d="M0 -20 V270 C0 320 -64 320 -64 276" stroke-width="12" />
              <path class="g" d="M-300 0 C-300 -170 -166 -272 0 -272 C166 -272 300 -170 300 0 C270 -36 210 -36 180 0 C150 -36 90 -36 60 0 C30 -36 -30 -36 -60 0 C-90 -36 -150 -36 -180 0 C-210 -36 -270 -36 -300 0 Z" />
              <path d="M0 -272 C-40 -200 -70 -80 -60 0 M0 -272 C40 -200 70 -80 60 0 M0 -272 C-110 -200 -180 -90 -180 0 M0 -272 C110 -200 180 -90 180 0" fill="none" stroke="#0b2547" stroke-width="5" opacity="0.55" />
              <path class="l" d="M0 -272 V-312" stroke-width="10" />
              <g class="{P}-ojos">
                <ellipse cx="-62" cy="-130" rx="16" ry="22" fill="#061428" /><ellipse cx="62" cy="-130" rx="16" ry="22" fill="#061428" />
                <circle cx="-56" cy="-138" r="6" fill="#f4f6fb" /><circle cx="68" cy="-138" r="6" fill="#f4f6fb" />
              </g>
"""

def PIN(color="#ff8a1f"):
    # punta en 0 0
    return f'<path d="M0 0 C-46 -56 -46 -112 0 -112 C46 -112 46 -56 0 0 Z" fill="{color}" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" /><circle cx="0" cy="-74" r="16" fill="#061428" stroke="#f4f6fb" stroke-width="5" />'

def MAPA(P):
    # pantalla del mapa: x 40-1040, y 560-1320; tierra abajo, mar arriba, isobaras, A y B
    return f"""
          <defs><clipPath id="{P}-clipmapa"><rect x="40" y="560" width="1000" height="760" rx="26" /></clipPath></defs>
          <g class="{P}-mapa">
            <rect x="40" y="560" width="1000" height="760" rx="26" fill="#0b2547" stroke="#f4f6fb" stroke-width="6" />
            <g clip-path="url(#{P}-clipmapa)">
              <path d="M40 680 H1040 M40 800 H1040 M40 920 H1040 M40 1040 H1040 M40 1160 H1040 M40 1280 H1040 M160 560 V1320 M320 560 V1320 M480 560 V1320 M640 560 V1320 M800 560 V1320 M960 560 V1320" stroke="#5ec8ff" stroke-width="2" opacity="0.18" fill="none" />
              <path class="{P}-tierra" d="M40 760 C120 740 170 690 260 700 C340 710 380 660 470 668 C560 676 600 740 690 730 C780 720 830 650 930 670 C990 682 1020 700 1040 700 L1040 1320 L40 1320 Z" fill="#14457a" stroke="#f4f6fb" stroke-width="5" stroke-linejoin="round" />
              <path d="M360 1320 C380 1240 450 1210 470 1150 C490 1090 560 1080 600 1020" fill="none" stroke="#5ec8ff" stroke-width="5" opacity="0.5" />
              <g class="{P}-isobaras" fill="none" stroke="#f4f6fb" stroke-width="3" opacity="0.35">
                <ellipse cx="250" cy="930" rx="150" ry="100" /><ellipse cx="250" cy="930" rx="250" ry="180" /><ellipse cx="250" cy="930" rx="360" ry="270" />
                <ellipse cx="860" cy="1170" rx="120" ry="80" /><ellipse cx="860" cy="1170" rx="220" ry="150" />
              </g>
              <text x="250" y="955" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="72" fill="#f4f6fb" opacity="0.5">B</text>
              <text x="860" y="1195" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="64" fill="#f4f6fb" opacity="0.5">A</text>
            </g>
          </g>"""

GLOBO = '<path d="M-24 -16 H24 Q30 -16 30 -10 V8 Q30 14 24 14 H-6 L-18 26 L-16 14 H-24 Q-30 14 -30 8 V-10 Q-30 -16 -24 -16 Z" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="4" stroke-linejoin="round" /><circle cx="-12" cy="-1" r="4" fill="#061428" /><circle cx="0" cy="-1" r="4" fill="#061428" /><circle cx="12" cy="-1" r="4" fill="#061428" />'
GOTA = '<path d="M0 -22 C-10 -4 -12 6 0 10 C12 6 10 -4 0 -22 Z" fill="#5ec8ff" />'

def lluvia(cls, n, x0, x1, ytop, h, seed, globos=0.45, vel=(700, 1000), esc=(0.8, 1.3), ang=14, cx=540, cy=960):
    """<g class=cls> girado ang grados con n gotas/globitos que caen; cada .gota cicla en alto h."""
    r = random.Random(seed)
    items = []
    for i in range(n):
        x = r.uniform(x0, x1)
        y = ytop - r.uniform(0, 60)
        o = r.uniform(0, h)
        v = r.uniform(*vel)
        s = r.uniform(*esc)
        forma = GLOBO if r.random() < globos else GOTA
        rot = r.uniform(-14, 14)
        items.append(f'<g class="gota" data-v="{v:.0f}" data-o="{o:.0f}" data-h="{h}"><g transform="translate({x:.0f} {y:.0f}) rotate({rot:.0f}) scale({s:.2f})">{forma}</g></g>')
    return f'<g class="{cls}" transform="rotate({ang} {cx} {cy})">' + "".join(items) + "</g>"
