# Piezas compartidas por las escenas de el-talento (personajes, mesa del jurado, X, botón, haces).
# Los personajes están en coordenadas locales (~360 x 560, cabeza arriba, torso abajo): ponelos
# dentro de un <g transform="translate(x y) scale(s)">. Las clases llevan el prefijo P de la escena.

def MAXI(P, telefono=True):
    tel = f"""
              <g class="{P}-brazo">
                <path class="c" d="M300 470 C350 440 360 380 330 330 L300 340 C318 380 310 420 270 440 Z" />
                <rect class="k" x="296" y="226" width="74" height="128" rx="14" transform="rotate(12 333 290)" />
                <rect x="308" y="242" width="50" height="86" rx="6" fill="#4fc3ff" opacity="0.85" transform="rotate(12 333 290)" />
              </g>""" if telefono else ""
    return f"""
              <path class="c" d="M30 560 C30 420 92 368 180 368 C268 368 330 420 330 560 Z" />
              <path class="l" d="M150 380 C150 420 160 440 168 470 M210 380 C210 420 200 440 192 470" stroke-width="5" />
              <path class="l" d="M110 470 H250" stroke-width="5" opacity="0.6" />
              <path class="b" d="M152 300 V380 H208 V300" />
              <ellipse class="b" cx="180" cy="236" rx="72" ry="82" />
              <path class="c" d="M106 214 C104 150 150 130 186 132 C226 134 258 156 256 212 C220 196 150 194 106 214 Z" />
              <path class="c" d="M104 212 C80 214 56 220 40 232 C56 240 84 236 108 226 Z" />
              <g class="{P}-ojos">
                <path class="l" d="M140 246 H168 M196 246 H224" stroke-width="6" />
                <path d="M146 248 a8 6 0 0 0 16 0 Z M202 248 a8 6 0 0 0 16 0 Z" fill="#fff3d6" />
              </g>
              <path class="w {P}-boca" d="M160 288 C172 296 192 296 204 286" fill="none" stroke-width="6" />
              <path class="l" d="M138 228 L168 234 M226 226 L196 232" stroke-width="5" />{tel}
"""

def PRESENTADOR(P):
    return f"""
              <path class="k" d="M30 560 C30 420 92 368 180 368 C268 368 330 420 330 560 Z" />
              <path class="w" d="M140 372 L180 470 L220 372 Z" stroke-width="5" />
              <path class="y" d="M146 392 L180 408 L214 392 L214 424 L180 410 L146 424 Z" stroke-width="5" />
              <path class="l" d="M120 380 L170 520 M240 380 L190 520" stroke-width="5" opacity="0.7" />
              <path class="b" d="M154 300 V376 H206 V300" />
              <ellipse class="b" cx="180" cy="236" rx="70" ry="82" />
              <path class="k" d="M108 222 C96 150 140 112 196 116 C246 120 270 160 254 222 C246 190 226 172 196 170 C170 168 132 176 108 222 Z" />
              <path class="l" d="M140 160 C170 140 210 140 236 158" stroke-width="5" opacity="0.6" />
              <circle cx="154" cy="240" r="8" fill="#fff3d6" /><circle cx="206" cy="240" r="8" fill="#fff3d6" />
              <path class="l" d="M136 216 L168 210 M224 216 L192 210" stroke-width="6" />
              <path class="w {P}-boca" d="M146 276 C160 312 200 312 214 276 Z" stroke-width="5" />
              <g class="{P}-brazo">
                <path class="k" d="M300 460 C350 420 350 360 320 320 L290 336 C308 370 306 410 270 434 Z" />
                <rect class="k" x="304" y="200" width="26" height="120" rx="10" />
                <circle class="y" cx="317" cy="190" r="34" />
                <path class="l" d="M296 184 H338 M298 198 H336" stroke-width="4" stroke="#0b080b" />
              </g>
"""

def JUEZA(P):
    return f"""
              <path class="r" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" />
              <path class="w" d="M148 384 L180 440 L212 384 Z" stroke-width="5" />
              <path class="b" d="M154 306 V384 H206 V306" />
              <path class="k" d="M92 306 C70 200 104 136 180 134 C256 136 290 200 268 306 C250 316 232 312 226 300 L226 210 C200 196 160 196 134 210 L134 300 C128 312 110 316 92 306 Z" />
              <ellipse class="b" cx="180" cy="244" rx="62" ry="76" />
              <path class="k" d="M118 222 C130 168 230 168 242 222 C210 200 150 200 118 222 Z" />
              <circle cx="152" cy="250" r="22" fill="none" stroke="#f6c544" stroke-width="6" /><circle cx="208" cy="250" r="22" fill="none" stroke="#f6c544" stroke-width="6" />
              <path d="M174 250 H186" stroke="#f6c544" stroke-width="6" />
              <circle cx="152" cy="252" r="6" fill="#fff3d6" /><circle cx="208" cy="252" r="6" fill="#fff3d6" />
              <path class="l {P}-ceja" d="M130 220 L170 228 M230 220 L190 228" stroke-width="6" />
              <path class="w {P}-boca" d="M164 290 H196" fill="none" stroke-width="6" />
              <circle class="y" cx="116" cy="290" r="9" stroke-width="4" /><circle class="y" cx="244" cy="290" r="9" stroke-width="4" />
"""

def SIMPATICO(P):
    return f"""
              <path class="y" d="M24 560 C24 420 92 370 180 370 C268 370 336 420 336 560 Z" />
              <path class="l" d="M60 470 H300 M50 510 H310" stroke="#0b080b" stroke-width="6" opacity="0.5" />
              <path class="b" d="M150 300 V378 H210 V300" />
              <ellipse class="b" cx="180" cy="236" rx="80" ry="84" />
              <path class="w" d="M108 260 C112 330 150 352 180 352 C210 352 248 330 252 260 C236 290 212 300 180 300 C148 300 124 290 108 260 Z" stroke-width="5" />
              <path class="w {P}-boca" d="M156 296 C166 312 194 312 204 296 Z" stroke="#0b080b" stroke-width="4" />
              <path class="l" d="M134 214 C144 204 160 204 170 214 M190 214 C200 204 216 204 226 214" stroke-width="6" />
              <path class="l {P}-ojos" d="M140 240 C148 232 160 232 166 240 M194 240 C200 232 212 232 220 240" stroke-width="6" />
              <path class="l" d="M104 200 C110 170 130 156 150 152" stroke-width="5" opacity="0.5" />
"""

def MALO(P):
    return f"""
              <path class="k" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" />
              <path class="k" d="M136 384 C136 350 224 350 224 384 L224 404 C200 416 160 416 136 404 Z" />
              <path class="b" d="M154 306 V370 H206 V306" />
              <path class="b" d="M112 236 C112 160 150 140 180 140 C210 140 248 160 248 236 C248 300 220 330 180 330 C140 330 112 300 112 236 Z" />
              <path class="k" d="M108 210 C100 140 150 112 190 116 C240 120 262 150 252 210 C240 170 210 156 180 160 C150 162 120 174 108 210 Z" />
              <path class="l" d="M130 164 C160 140 210 136 240 160" stroke-width="5" opacity="0.6" />
              <circle cx="152" cy="246" r="6" fill="#fff3d6" /><circle cx="210" cy="246" r="6" fill="#fff3d6" />
              <g class="{P}-lentes">
              <rect class="k" x="124" y="230" width="52" height="30" rx="10" stroke-width="5" />
              <rect class="k" x="186" y="230" width="52" height="30" rx="10" stroke-width="5" />
              <path class="l" d="M176 240 H186" stroke-width="5" />
              </g>
              <path class="l {P}-ceja" d="M124 214 L170 220 M196 214 L238 204" stroke-width="7" />
              <path class="w {P}-boca" d="M156 296 C176 290 196 290 210 282" fill="none" stroke-width="6" />
"""

def AGENTE(P):
    return f"""
              <path class="gl {P}-ag-pies" d="M140 500 V552 H112 M220 500 V552 H248" stroke-width="9" />
              <path class="gl {P}-ag-bi" d="M64 300 C20 300 10 250 20 210" stroke-width="9" />
              <path class="gl {P}-ag-bd" d="M296 300 C340 300 350 250 340 210" stroke-width="9" />
              <rect class="ag" x="60" y="40" width="240" height="470" rx="40" />
              <rect x="150" y="62" width="60" height="12" rx="6" fill="#5ce611" />
              <g class="{P}-ag-ojos">
                <rect x="112" y="180" width="38" height="66" rx="19" fill="#5ce611" />
                <rect x="210" y="180" width="38" height="66" rx="19" fill="#5ce611" />
              </g>
              <path class="gl {P}-ag-boca" d="M128 300 C150 336 210 336 232 300" stroke-width="9" />
              <path class="y" d="M146 392 L180 410 L214 392 L214 430 L180 412 L146 430 Z" stroke-width="5" />
"""

def MESA(P, x=40, y=1180, w=1000, h=170):
    return f"""
          <g class="{P}-mesa">
            <rect class="v" x="{x}" y="{y}" width="{w}" height="{h}" rx="10" />
            <rect class="y" x="{x - 10}" y="{y - 18}" width="{w + 20}" height="26" rx="8" />
            <path class="yl" d="M{x + 30} {y + 50} H{x + w - 30}" stroke-width="4" opacity="0.5" />
          </g>"""

def BOTON_X(P, cx, cy, clase="", r=46):
    return f"""
          <g class="{P}-bx {clase}">
            <ellipse class="k" cx="{cx}" cy="{cy + 14}" rx="{r + 12}" ry="{r * 0.42 + 8}" />
            <ellipse class="r" cx="{cx}" cy="{cy}" rx="{r}" ry="{r * 0.42}" />
            <path d="M{cx - 14} {cy - 8} L{cx + 14} {cy + 8} M{cx + 14} {cy - 8} L{cx - 14} {cy + 8}" stroke="#fff3d6" stroke-width="6" stroke-linecap="round" />
          </g>"""

def BOTON_DORADO(P, cx, cy, r=70):
    return f"""
          <g class="{P}-bd">
            <ellipse class="k" cx="{cx}" cy="{cy + 30}" rx="{r + 22}" ry="{r * 0.4 + 14}" />
            <path class="y {P}-bd-domo" d="M{cx - r} {cy + 20} C{cx - r} {cy - r * 0.9} {cx + r} {cy - r * 0.9} {cx + r} {cy + 20} C{cx + r * 0.6} {cy + 40} {cx - r * 0.6} {cy + 40} {cx - r} {cy + 20} Z" />
            <path class="l" d="M{cx - r * 0.5} {cy - r * 0.2} C{cx - r * 0.3} {cy - r * 0.55} {cx} {cy - r * 0.6} {cx + r * 0.2} {cy - r * 0.55}" stroke-width="6" opacity="0.8" />
          </g>"""

def XROJA(P, clase, cx, cy, s=1.0):
    a = 170 * s
    return f"""
          <g class="{P}-x {clase}" style="filter: drop-shadow(0 0 22px rgba(255, 45, 61, 0.75))">
            <path d="M{cx - a} {cy - a} L{cx + a} {cy + a} M{cx + a} {cy - a} L{cx - a} {cy + a}" stroke="#ff2d3d" stroke-width="{int(78 * s)}" stroke-linecap="round" fill="none" />
            <path d="M{cx - a} {cy - a} L{cx + a} {cy + a} M{cx + a} {cy - a} L{cx - a} {cy + a}" stroke="#fff3d6" stroke-width="{max(4, int(10 * s))}" stroke-linecap="round" fill="none" opacity="0.55" />
          </g>"""

def HAZ(P, clase, x_top, x_bot, ancho_top=40, ancho_bot=420, y_top=520, y_bot=1500):
    return f"""<path class="haz {P}-haz {clase}" d="M{x_top - ancho_top / 2} {y_top} L{x_top + ancho_top / 2} {y_top} L{x_bot + ancho_bot / 2} {y_bot} L{x_bot - ancho_bot / 2} {y_bot} Z" />"""

def PISO(P, cx=540, cy=1440, rx=380, ry=70):
    return f"""<ellipse class="{P}-piso" cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#fff3d6" opacity="0.10" /><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="#f6c544" stroke-width="5" opacity="0.6" />"""

def TILDES(P, clase, x, y, s=1.0, color="#4fc3ff"):
    return f"""
          <g class="{P}-tildes {clase}"><g transform="translate({x} {y}) scale({s})">
            <path d="M-60 0 L-30 30 L30 -34 M0 30 L60 -34" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          </g></g>"""

def GLOBO(P, clase, x, y, w, texto, lado="izq", fondo="#fff3d6", tinta="#0b080b", fs=40):
    return f"""<div class="{P}-globo {clase}" style="position:absolute;left:{x}px;top:{y}px;width:{w}px;padding:20px 26px 18px;background:{fondo};color:{tinta};border-radius:28px;border-{'bottom-left' if lado == 'izq' else 'bottom-right'}-radius:6px;font-family:'Lexend',sans-serif;font-weight:700;font-size:{fs}px;line-height:1.12;">{texto}</div>"""
